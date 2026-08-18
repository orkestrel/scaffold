# PROBE.md

> How an agent proves a thought in this repository, and the mechanism that makes proving cheaper
> than reasoning about it.

## Ruling

Replace `tmp/probe/` and `test:probe` with a resident `prove` service that accepts a claim as text
and returns type, lint, and runtime evidence in one synchronous call. Hold a TypeScript
`LanguageService` instance, an Oxlint Language Server Protocol (LSP) process, and a Vitest instance
warm across calls. Keep the type and lint stages fully virtual, because both accept in-memory
documents that never reach a filesystem. Give the runtime stage a real file, because three separate
measurements prove Vitest cannot execute a specification that does not exist on disk. Derive the
process exit code from the result, so the harness records the verdict without the agent composing
prose about it.

Build the type and lint stages first as one diskless unit, and the runtime stage second. That order
is the opposite of the intuition that runtime matters most, and the measurements later in this
document are why.

## What is wrong today

Three facts describe the current probe path, each measured on 2026-08-18 in this checkout.

| Property      | Measurement                | Command                                                                               |
| ------------- | -------------------------- | ------------------------------------------------------------------------------------- |
| Latency       | 3874 ms cold, 2751 ms warm | `npm run test:probe`                                                                  |
| Type checking | absent                     | a probe containing `const wrong: number = 'not a number'` runs and exits 0            |
| Linting       | impossible                 | `oxlint --config .oxlintrc.json tmp/probe/x.test.ts` reports `No files found to lint` |

The type gap is the serious one. A probe is the instrument an agent uses to settle a question about
behavior, and the current instrument accepts code that does not compile. The lint gap follows from
`.gitignore:11`, which ignores `tmp`; Oxlint honors version-control ignore files, and `--no-ignore`
does not change the result.

So today's probe delivers one of the three signals a developer gets from the gates, at a cost of
roughly 4 seconds per question.

## What the optimal design is, and what physics permits

The most aggressive design answers a claim with all three signals in single-digit milliseconds,
holds nothing on disk, isolates every probe from every other, and denies the agent any path that
skips it. Measurement moves three of those four from aspiration to fact, and bounds the fourth.

The following table records what each stage costs warm, and whether it needs a file to exist.

| Stage   | Cold              | Warm       | Needs a real file | Evidence                                           |
| ------- | ----------------- | ---------- | ----------------- | -------------------------------------------------- |
| Type    | 1198 ms           | 11–90 ms   | no                | `ts.createLanguageService` over a virtual snapshot |
| Lint    | 269 ms initialize | 1–5 ms     | no                | `oxlint --lsp` with `textDocument/didOpen`         |
| Runtime | 771 ms            | 243–290 ms | yes               | `createVitest` plus `runTestSpecifications`        |

Two stages are therefore diskless in the strict sense. The TypeScript `LanguageService` instance
reads a snapshot the host supplies from memory, and the Oxlint LSP process lints a document whose
Uniform Resource Identifier (URI) names a path that does not exist. Five virtual documents linted
correctly against `.oxlintrc.json` while `existsSync` reported `false` for every one of them.

The runtime stage is not diskless, and three independent attempts establish that rather than
assume it:

- A Vite virtual module resolved through a plugin fails with `Cannot find module '/@probe/v1.test.ts'`.
- A path-shaped identifier inside the project root, served entirely by a plugin and never written,
  fails with `Cannot find module '/home/user/scaffold/tmp/probe/__ghost__.test.ts'`.
- A file written to `/dev/shm` executes and resolves `@src/core`, because Vitest resolves through
  Vite while the worker still requires a real path.

A fourth measurement fixes where that file must live. A `/dev/shm` path fails type checking with
`Cannot find module 'vitest'`, because Node resolution walks upward from the file and tmpfs has no
`node_modules` ancestor. A project-rooted virtual path reports 0 diagnostics for the same source.

The consequence is the architecture: one claim, three resolvers, each given the path shape it
needs. The type stage receives a project-rooted virtual path that is never written. The lint stage
receives a virtual document URI. The runtime stage receives the one real file, and that file is the
only thing the mechanism writes.

## The certified prototype

A prototype holding all three stages warm answers a claim in a median of 337 ms, against 3874 ms
for the current path that checks one third as much. That is 11.5 times faster while returning three
signals rather than one.

The figures below come from 12 warm calls against one resident service holding a TypeScript
`LanguageService` instance, an Oxlint LSP process, and a Vitest instance. Every control behaved.

| Measure       | Warm                      |
| ------------- | ------------------------- |
| Type stage    | 57–83 ms                  |
| Lint stage    | 15–22 ms                  |
| Runtime stage | 259–346 ms                |
| Combined      | 315–440 ms, median 337 ms |

The runtime stage dominates, and it is the only stage that touches a filesystem. An earlier
prototype that spawned the Oxlint binary per call instead of holding the LSP process measured
614–651 ms, so the resident lint process accounts for roughly 280 ms of the improvement.

Ten controls certify the prototype, five run serially and the same five run concurrently. Each
control names the verdict it must produce, and a run where a control produces any other verdict is
a failed instrument rather than a passing mechanism.

| Control     | Types | Lint | Runtime |
| ----------- | ----- | ---- | ------- |
| `clean`     | 0     | 0    | pass    |
| `typeerr`   | >0    | 0    | pass    |
| `linterr`   | 0     | >0   | pass    |
| `testfail`  | 0     | 0    | fail    |
| `ALL-THREE` | >0    | >0   | fail    |

The `ALL-THREE` control is the one that matters most. A mechanism that stops at the first failing
stage hides the other two, and an agent reading such a result fixes one defect and believes it is
finished. All three stages must run and all three must report.

Sustained load shows no degradation. Twenty sequential probes on one warm process averaged 637 ms
across the first five and 644 ms across the last five, a drift of 7 ms, with a resident set size of
456 MB.

## Warm residency forces three laws

Residency is the entire performance argument, and residency is also what creates every correctness
hazard in this design. Each hazard below was reproduced, not predicted.

### Address every revision, and never reuse a path

A first measurement reused one file path and called `rerunFiles`. It reported 2–4 ms and reported
`pass` for a test asserting `expect(2).toBe(3)`. The same failing assertion at a fresh path through
`runTestSpecifications` reported `fail` in 270 ms.

Use `runTestSpecifications` with a fresh identity per revision. Never use `rerunFiles`.

### Invalidate imported modules, because a fresh test path is not enough

A fresh test path protects the test file and nothing it imports. The following sequence used a
fresh test path every time and mutated one imported helper between runs.

| Run | Helper content                 | Assertion          | Result | Reading             |
| --- | ------------------------------ | ------------------ | ------ | ------------------- |
| 1   | `ORIGINAL`                     | expects `ORIGINAL` | pass   | correct             |
| 2   | `CHANGED`                      | expects `CHANGED`  | fail   | stale graph         |
| 3   | `CHANGED`                      | expects `ORIGINAL` | pass   | serves stale source |
| 4   | `THIRD` after `invalidateFile` | expects `THIRD`    | pass   | corrected           |

Run 3 is the defect that matters. The source on disk said `CHANGED`, the probe asserted `ORIGINAL`,
and the warm service returned green. A probe daemon that certifies a claim which is false against
current source is worse than no probe at all, because the agent then carries a proven-wrong belief
into everything downstream.

Call `invalidateFile` for every workspace module a revision touches. Treat run 3 as a permanent
regression test of the engine.

### Own the deadline outside the worker

An infinite loop is not contained. A probe running `while (true) {}` under `testTimeout: 2000`
never returned; the process reached the launch stage, never reached the result stage, and the
wrapper killed it at 100 seconds with exit code 124.

The cause is structural rather than a configuration error. Vitest enforces a test timeout inside
the worker, and a tight synchronous loop blocks the event loop that timer needs. A timeout
expressed in worker configuration cannot fire while the worker spins.

Give the coordinator an out-of-process deadline that kills and recycles a worker.

### Typecheck against the scoped project, never the root

The root `tsconfig.json` file is the wrong project for a probe, and using it makes the type stage
report green where the real gate reports red. One probe using `process.cwd` and `setTimeout`,
checked against both projects, produced this split.

| Project                          | Diagnostics | Message                      |
| -------------------------------- | ----------- | ---------------------------- |
| `tsconfig.json`                  | 0           | none                         |
| `configs/src/tsconfig.core.json` | 1           | `Cannot find name 'process'` |

The root project admits Node, DOM, and Vitest globals that the scoped projects remove, and `core`
is host-independent by the boundary rule in `AGENTS.md`. A core probe checked against the root
project therefore passes while the same code fails `npm run check:src:core`.

A probe carries two kinds of file, and they belong to different projects. The projects differ
exactly where it matters, which the following table records.

| Project                            | Includes        | `types`                                 |
| ---------------------------------- | --------------- | --------------------------------------- |
| `tsconfig.json`                    | everything      | `node`, `vite/client`, `vitest/globals` |
| `configs/src/tsconfig.core.json`   | `src/core/**`   | none                                    |
| `configs/src/tsconfig.server.json` | `src/server/**` | `node`                                  |

Check the probe's test file against the root project, because a test needs the Vitest and Node
globals the root project supplies. Check any candidate source file the probe carries against the
scoped project for its environment, because that is the project the real gate runs. A candidate
`core` file checked against the root project accepts `process` and then fails
`npm run check:src:core`.

## What isolation the runtime already provides, and what it does not

Vitest's per-file worker isolation covers more than expected and less than the wanted design. The
table records what a hostile probe achieved against a warm service.

| Hostile probe               | Outcome                                         |
| --------------------------- | ----------------------------------------------- |
| Module-level `throw`        | contained, reports `fail`, service survives     |
| Unhandled promise rejection | contained, service survives                     |
| Poisoning `globalThis`      | does not leak; the next probe reads `undefined` |
| Poisoning `process.env`     | does not leak; the next probe reads `undefined` |
| Infinite loop               | **not contained** — hangs the service           |
| Writing into the checkout   | **not contained** — the file appeared           |
| Binding a loopback port     | **not contained** — the listener bound          |
| Reaching the public network | **not contained** — DNS and HTTPS both answered |

Read that table as a boundary between two different kinds of isolation. Vitest's per-file worker
isolation covers module state, globals, and environment, and those need no new mechanism. It does
not cover capabilities. Central processing unit (CPU) exhaustion needs the out-of-process deadline.
Filesystem and network access have no in-process answer in Node, so either an operating-system
boundary supplies one or the limit is documented honestly rather than claimed away.

The wanted phrase "its own environment and isolated" therefore splits in two. State isolation
arrives with the runtime already. Capability isolation does not arrive at all, and no design in
this document delivers it.

Concurrency works and is bounded by hardware. Five concurrent probes completed in 1636 ms against
roughly 3100 ms serially, and each returned its own correct verdict with no cross-talk. That is
about 1.9 times faster rather than 5 times, because this container reports 4 processors.

## Transport: the watcher is fast and cannot answer

A watcher that picks up a file the agent writes is an appealing design, and its notice latency is
not the problem. Measurement puts `fs.watch` notice at 0–1 ms and a Unix socket round trip at
1.26 ms. Neither is a bottleneck beside a runtime stage that costs two orders of magnitude more.

The difference is the return channel. A watcher notices the write and has nowhere to put the
verdict, so the agent either polls for a result, which `AGENTS.md` forbids outright, or races a
result file. The agent's own tool call is already a synchronous request and response: it writes the
claim and reads the verdict on standard output in one action, and it pays 38–43 ms of Node startup
to do so.

Keep the warm service, which is the load-bearing half of the watcher intuition, and reach it with a
thin synchronous client rather than a watcher.

## Enforcement, stated honestly

The want is to remove the agent's option to skip proving. Three tiers exist, and only the first two
are real.

**Make proving cheaper than reasoning.** A 337 ms answer against a 3874 ms one changes behavior
more than any instruction does. This tier is fully achievable and is most of the value.

**Make the verdict independent of the agent's prose.** Derive the exit code from the result: 0 when
a receipt exists, 1 when the claim or its control failed, and 2 when the request was invalid. The
harness records that exit code whether or not the agent describes it accurately. Issue a receipt
only when the claim passes all three stages and its negative control fails at the stage it names.
That mechanizes the existing law in `.claude/rules/quality.md:61` that an instrument is not
evidence until it has failed, and it is the strongest available answer to a reader who cannot see
the agent's thoughts.

**Deny the skip.** This tier is not reachable. No repository mechanism observes a thought the agent
never expressed, and the three target harnesses expose no common mandatory interception point.
`.claude/settings.json:189-228` gives Claude Code a `SessionStart` hook, which is where the service
warms, and a `Stop` hook, which is where a session's probe activity can be surfaced. Codex and
Cursor expose no equivalent. Any claim to have closed this tier is false, and stating it plainly is
better than shipping a mechanism that appears to close it.

## The surface

The agent invokes one command, writes a claim to standard input, and reads a result from standard
output.

```sh
node .agents/probe/client.mjs prove
```

The result carries every stage, so no stage can mask another, and it carries a receipt only when
the claim passed and its control failed. Promotion is a separate explicit action that accepts a
receipt and writes the proven test into its mirrored path.

Define these contracts in a `types.ts` file before implementing them, per the Types Then Tests
Driven Development order in `AGENTS.md`. Every entity member takes one word, every collection is
readonly, and the result stores no pass flag because pass derives from the stage outcomes.

```ts
export type Stage = 'type' | 'lint' | 'runtime'

export interface Source {
	readonly path: string
	readonly text: string
}

export interface Case {
	readonly files: readonly Source[]
	readonly test: Source
}

export interface Control extends Case {
	readonly stage: Stage
	readonly reason: string
}

export interface Claim {
	readonly project: string
	readonly case: Case
	readonly control: Control
}

export interface Finding {
	readonly stage: Stage
	readonly path: string
	readonly message: string
	readonly line?: number
}

export interface Check {
	readonly stage: Stage
	readonly elapsed: number
	readonly findings: readonly Finding[]
}

export interface Verdict {
	readonly id: string
	readonly checks: readonly Check[]
	readonly control: readonly Check[]
	readonly elapsed: number
	readonly receipt?: string
}
```

The `control` field is what makes this surface different from a test runner, and it is not
optional. A claim arrives with the negative control that must break, and the `stage` field names
where it must break. The service issues a `receipt` only when every check on the claim is clean and
the control fails at its declared stage, which makes the law in `.claude/rules/quality.md:61`
mechanical rather than advisory. A probe that cannot state what would falsify it cannot be proven.

## Build the diskless pair first

The recommendation is to build the type and lint stages first, together, and the runtime stage
second. The intuition that runtime comes first is reasonable and the measurements contradict it.

Four facts decide the order.

- The runtime stage is the only one that already works. Its gap is latency. The type and lint
  stages do not exist at all, so their gap is capability, and capability outranks latency.
- The type and lint stages cost 12–95 ms combined against 243–290 ms for runtime.
- The type and lint stages need no file, no tmpfs, no cleanup, and no worker pool. They are a pure
  function of a code string.
- Every hard defect in this document belongs to the runtime stage alone. The stale module graph,
  the uncontained infinite loop, the filesystem escape, and the cache phantom are all runtime
  hazards. The diskless pair carries none of them.

That last point is decisive. Building runtime first means solving the two most dangerous
correctness problems before delivering anything that does not already exist, while the two cheapest
and entirely absent signals wait behind them.

Order of construction is not order of delivery. Ship all three stages in one release, and build the
part that cannot be silently wrong first.

If a single stage must go first, choose type checking. It catches the contract errors that dominate
in a types-first repository, and a probe whose types are wrong fails at runtime with a message
worse than the diagnostic it should have received.

## Rejected

Each design below was considered and killed for the stated reason.

- **Keep `test:probe`.** It costs 2751 ms warm, does not typecheck, cannot be linted, and no gate
  reaches it.
- **A pure virtual module for the runtime stage.** Measured twice: the worker cannot resolve a
  specification that does not exist.
- **Writing the runtime file under `tmp/probe/`.** `.gitignore:11` makes it unlintable, and the
  directory then needs sweeping.
- **`npx oxlint` per probe.** 636–672 ms against 257–258 ms for the direct binary, and 1–5 ms for
  the LSP process that replaces both.
- **`rerunFiles` against a stable path.** It returned a false pass for a failing assertion.
- **A watcher that runs probes the agent writes.** Fast to notice and structurally unable to
  return a verdict without polling.
- **Vitest `isolate: false` for speed.** It buys 7 ms of the 228 ms runtime stage and gives up the
  module, global, and environment isolation that the same runtime already provides for free. The
  one measured hazard it introduces is the class this document spends the most effort closing.
- **A git worktree or container per probe.** Both discard residency, which is the entire
  performance argument.
- **An MCP tool.** No Model Context Protocol software development kit is installed, and adding a
  dependency requires an explicit request from the user.
- **A `scaffold` bin verb.** `src/bin/constants.ts:22-28` plus the type, options, parse, and
  dispatch sites make a new verb a five-file change for a mechanism that is not a workspace
  operation.

## Risks

Four hazards were reproduced during this design pass, and three of them carry a prescribed fix
stated as a law earlier in this document: the cache phantom, the stale module graph, the
uncontained infinite loop, and the wrong TypeScript project. Treat those as closed by the laws
rather than as open risks, and treat each reproduction as a regression test the engine owes.

The risks below stay open, ranked, and each names the cheapest probe that settles it.

1. **A probe holds full filesystem and network capability, and no fix is identified.** Reproduced:
   a probe wrote a file into the checkout, bound a loopback port, resolved DNS, and completed an
   HTTPS request. This is the one reproduced defect with no remedy inside Node. Determine whether
   an operating-system boundary available in every target environment bounds those capabilities
   without discarding residency.
2. **Vitest retains one result record per probe, without bound.** Reproduced over 150 probes: the
   count returned by `state.getFiles` was 50, then 100, then 150, tracking probes exactly. Resident
   memory itself is not the problem, because it plateaued rather than climbed — 259 MB, 264 MB, and
   236 MB at those three points, against 159 MB at start — and latency stayed flat at 228 ms,
   231 ms, and 228 ms with no wrong verdict in 150 runs. Evict each probe's result after returning
   it, and re-run this measurement over several thousand probes.
3. **The runtime stage's floor resists configuration, and the reason is not fully attributed.**
   Five pool configurations, six calls each, moved it very little.

   | Configuration               | Warm median |
   | --------------------------- | ----------- |
   | `forks` (default)           | 260 ms      |
   | `threads`                   | 228 ms      |
   | `threads`, `isolate: false` | 221 ms      |
   | `forks`, `isolate: false`   | 256 ms      |
   | `threads`, single thread    | 230 ms      |

   Disabling isolation saves 7 ms, which establishes that the floor is transform and module-graph
   work rather than worker startup. Take the `threads` pool for its 32 ms, and attribute the
   remaining 220 ms before assuming it is fixed.

## Open questions

- Whether an operating-system sandbox available in every target environment can bound filesystem
  and network effects without discarding residency.
- Whether the mechanism belongs in the vendored `dist/host` surface, which `src/core/constants.ts:123-156`
  propagates to 44 target repositories, or stays in this repository until it has run for a while
  here.
- What replaces the probe law in `.claude/rules/tests.md:92-117` and the probe project paragraph in
  `.claude/rules/workspace.md:152-155`, both of which describe a mechanism this ruling deletes.
