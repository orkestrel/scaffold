# Unit S4 — close the third audit round

## Who you are

You are the implementer for unit S4. You are GPT-5.6 Sol, running inside the Codex CLI with the
`scaffold` checkout at `C:\Users\mikes\WebstormProjects\scaffold` as your working directory,
`workspace-write` sandbox. You are already the executor: do the work yourself, now, and launch no
`codex` command and no nested agent.

You are the sole writer in this checkout. Every earlier unit has exited.

Two of the five items below are your own engine's findings from the third audit round.

## Objective

Close the five remaining findings. **This is the last unit.** When these are closed and the gates
are green, the change is accepted and committed. Do not widen it.

## Authority — read before acting, in this order

1. `AGENTS.md` and `.agents/orchestration.md`.
2. `.claude/rules/quality.md` § Instruments, `.claude/rules/typescript.md`, `.claude/rules/tests.md`,
   `.claude/rules/writing.md`.
3. `.orkestrel/scaffold/s3-audit-verdict.md` — the round's reconciliation, including the two places
   the lanes disagreed and how each was ruled.
4. `.orkestrel/scaffold/s3-audit-objective-report.md` and
   `.orkestrel/scaffold/s3-audit-subjective-report.md` — the findings in the auditors' words.

All four files exist. Read them before editing.

## The state you inherit

The working tree carries the whole uncommitted change across three units, and the gates are green on
it: `format:check`, `lint:check`, `check`, `build`, and `npm test` all exit 0, with `src:core` at
420 and `config` at 172 passed, 1 skipped. `host.json` is unchanged after a build.

The Orchestrator ran all four retained instruments on the host after the lanes exited. Each
re-produced its result and the tree restored to the same eight modified files every time. The log is
`.orkestrel/scaffold/s3-instrument-run.log.txt`.

## The rule on emitted text

Item 2 changes the emitted configuration's bytes. Update every expectation that pins the span you
change, and regenerate this repository's own `vite.config.ts` from the generator — the script
`tmp/units/s3-adopt.mjs` does exactly that — so the byte-identity proof stays green with no
expectation of its own edited. Do not weaken an assertion to avoid an update.

## The work

### 1. The hazard census misdescribes one case

**Both lanes agree.** `tests/src/core/compilers.test.ts` states that the replacement, repeated-name,
and nested cases take their base from `srcServer`. The repeated-name case never calls `srcServer`;
it writes its own base from the vendored boundary helpers.

That paragraph exists because the previous round found the same comment asserting a control regime
its cases did not have. A reader trusting it believes a real emitted factory is under test where
hand-written entries are.

**The property to change.** Make the sentence true per case, and give the reason the repeated-name
case cannot use a factory. The subjective lane wrote the prescription verbatim: "the replacement and
nested cases take their base from `srcServer`; the repeated-name case writes its base from the same
vendored boundary helpers, because no emitted base repeats a plugin name." Use it or better it. No
code change, and no emitted byte moves.

### 2. The predicate's runtime check is weaker than the type it narrows to

**Your engine's finding, and the Orchestrator ruled for it.** `isNamedPlugin` narrows to
`plugin is { name: string }` but tests only `'name' in plugin`, so a value carrying a non-string
`name` satisfies it.

The subjective lane's counter-argument is recorded and is correct as far as it goes: over the
declared `PluginOption` union the only object variants carrying `name` type it `string`, so the
narrowing is sound against the declared domain, and an off-type value stays inert because the
narrowed value is only compared with `===` and pushed. The ruling went the other way anyway.
`AGENTS.md` bars type assertions and requires narrowing with guards, and a predicate that claims
more than it checks is an assertion in a guard's shape.

**The property to change.** Make the runtime check match the type the predicate asserts. Decide
whether the promise exclusion needs the same treatment — the declared union admits a thenable, and
`instanceof Promise` does not reach a structural one — and state your reasoning either way.

**What must not change.** `isNamedPlugin` stays **unexported**, and its target stays
`{ name: string }` rather than `Plugin`. The subjective lane ruled on both and the Orchestrator
accepted: the predicate has no meaning apart from this one algorithm, and widening the target would
drag `Plugin<any>` into every generated workspace's type import for nothing.

**The proof.** A case whose red is the current predicate. Record the command and both counts.

### 3. The red runners can certify an unrelated failure

**Your engine's finding.** `tmp/units/s3-red-1-selection.mjs` and `tmp/units/s3-red-2-pinning.mjs`
return only the child's exit status, and their callers accept any nonzero — or null — status as the
expected red. A startup failure, a collection failure, or a killed process would each be certified
as "the named assertion failed."

The Orchestrator's own run shows the printed counts do discriminate: `1 failed | 419 skipped (420)`
proves the named case ran and failed, where a startup failure reports no tests. The scripts print
that and assert on the exit status instead.

**The property to change.** Assert what the printed counts already show: the run failed with the
named case among the failures, and exactly the expected number of cases ran. A red that a crash
could satisfy is not a red.

### 4. A mutation can survive its own script

**Your engine's finding.** `tmp/units/s3-red-1-selection.mjs`, `tmp/units/s3-red-3-identity.mjs`,
and `tmp/units/s3-effective.mjs` write files before entering the restoring `try`, so a later write
failure leaves an earlier mutation in place.

**The property to change.** Bring every mutation inside the block whose `finally` restores it. Then
state the limit that remains, in the script's own header: a forced termination bypasses `finally`,
so a killed run leaves the tree mutated. The claim that each script leaves the tree clean
unconditionally is false, and the Orchestrator has corrected it in the record; do not restate it.

### 5. The relocation control never asserts what it demonstrates

**Subjective lane R4.** `tmp/units/s3-relocation-control.mjs` prints the baseline and control byte
lengths but never asserts they match. The instrument's whole point is that a length-only comparison
would miss a same-width perturbation.

**The property to change.** Assert the equality rather than printing it.

## Re-run what you harden

After items 3, 4, and 5, run each hardened instrument and report its output. A hardened instrument
that was not re-run is a claim.

## What is settled and must not be reopened

Everything under § What is settled in `.orkestrel/scaffold/s3-brief.md`, plus:

- `isNamedPlugin` stays unexported with the `{ name: string }` target.
- The unexported predicate is not a hidden-helper violation. The verdict records the reasoning.
- The three recommendations the verdict records as not carried — the unshipped showcase comment, the
  local refusal case beside the vendored proof, and the merge text's three homes — stay not carried.
- `const replacement = candidates[index]` stays as it is.

## Host facts

- Windows. POSIX syntax in the shell; `npm` resolves as `npm.cmd`.
- The `npm` shim does not resolve from a spawned child on this host. The retained scripts spawn
  Vitest through `process.execPath` and `node_modules/vitest/vitest.mjs`; keep that mechanism.
- Do not run a whole-suite or timing-sensitive gate as your own acceptance evidence. Run the scoped
  projects your files touch — `src:core` and `config` — and report their counts. The Orchestrator
  takes the authoritative whole-suite run after you exit.

## Scope

**Owned files:**

- `src/core/templates.ts`
- `tests/src/core/compilers.test.ts`
- `tests/src/core/templates.test.ts` — only if item 2 moves a span it pins
- `vite.config.ts` — regenerated from the generator, not hand-edited
- `tmp/units/s3-red-1-selection.mjs`, `s3-red-2-pinning.mjs`, `s3-red-3-identity.mjs`,
  `s3-relocation-control.mjs`, `s3-effective.mjs`
- New scripts under `tmp/units/` if you need them

**Off-limits — do not edit, for any reason:**

- `.orkestrel/` — the campaign record, including the retained instrument copies. The Orchestrator
  re-retains them after you exit.
- `configs/helpers.ts`, `configs/policy.ts` — vendored
- `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts` — vendored
- Everything under `dist/`
- `package.json`, `host.json`, `ROADMAP.md`, `guides/`
- `src/core/compilers.ts` — this unit changes nothing there
- Every other `src/` file

**Do not bump a version, and do not publish.** Do not commit or push. Do not install anything. Run
no `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. You may undo exactly
your own edit.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

Ordered cheap-first.

1. `npm run format:check` and `npm run lint:check` are clean.
2. `npm run check` passes. No `any`, `as`, `!`, or suppression comment in what you add.
3. The hazard census names the mechanism per case truthfully.
4. The predicate's runtime check matches the type it narrows to, with a recorded red.
5. Each red runner asserts the named case failed and the expected number of cases ran.
6. Every mutation sits inside the block whose `finally` restores it, and each script's header states
   the limit that remains.
7. The relocation control asserts equal byte lengths.
8. Every hardened instrument is re-run, with its output reported.
9. `npm run test:src:core` and `npm run test:config` pass, with counts reported.
10. No vendored file changed, and `host.json` is unchanged after a build.

**Observations, not criteria:** the wall-clock durations; the whole-suite result.

## Deviation contract

A conflict with the objective stops you: report expected, found, exact evidence, done or not done,
and at most one hypothesis. Do not edit a vendored file or anything under `.orkestrel/`. Do not
weaken an assertion to make a run green. Do not reopen anything under § What is settled.

Where a detail is ancillary — a variable name among equals, where a header sentence sits — decide
it, record it, and carry on.

## Output

Write your report to `tmp/units/s4-report.md`, and make your final message the same content:

1. **Done / not done** per criterion.
2. **The predicate** — what it checks now, and your ruling on the thenable question.
3. **The reds** — command, both counts, per instrument.
4. **The hardened instruments** — each one's re-run output.
5. **Observations.**
6. **What you did not close**, and why.

No process diary.
