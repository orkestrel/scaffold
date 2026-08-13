# Fleet plan — test package, guide debt, fleet cleanup

The campaign of record. Read this first if a session went dark.

## Exit criterion

Every item below ends **implemented**, **repaired**, **retained on evidence**, or **intentionally
excluded on evidence**. The campaign closes when no item is open, not when the last engine runs out
of appetite.

## Order, and why

1. **`@orkestrel/test` publishes first.** It is finished and independent, and the fleet pass needs it
   installed. Publishing it early costs nothing and unblocks everything downstream.
2. **`@orkestrel/guide` is repaired and published second.** The fleet pass wants both packages, and
   doing the pass twice — once per package — is the waste this order exists to avoid.
3. **The fleet pass runs last, once**, adopting both packages and extracting per-package case
   matrices in the same visit to each repository.

## Track T — `@orkestrel/test`

| #   | Item                        | State                                              |
| --- | --------------------------- | -------------------------------------------------- |
| T1  | Surface for `0.0.1`         | **Ruled: ship as-is.** No new export is warranted. |
| T2  | Additions and issues ledger | Open for the campaign's life. Section below.       |
| T3  | Publish `0.0.1`             | Blocked on the user's credential and decision.     |

**T1 ruling, on evidence.** The 41-package guide-parity duplication needs nothing new from this
package. Measured:

- The inline corpus walk carried by 36–37 packages is exactly
  `readInventory(root, dirs, { extensions: ['.ts', '.md'] })`. Proved by equivalence, not inspection:
  identical keys and identical values across `abort` (20 files), `emitter` (18), `timeout` (21),
  `contract` (41), `workflow` (76) and `csv` (26). Zero mismatches.
- `readText`/`requireText`, carried by 38 packages, is exactly
  `requireValue(files[key], \`Missing file: ${key}\`)`. Composition of a shipped export.
- The `AGENTS.md` stitch stays in the consumer. Which extra files join the corpus is a package
  decision, and absorbing it into a primitive would remove customization rather than add it.

Everything else the guide tests repeat — `SELF_SPECIFIERS`, `SPECIFIER_MODULES`, the
`Interface`-suffix pairing — is guide-parity policy and belongs to Track G, not here.

Adding capability now with no consumer would violate the creation gate in `AGENTS.md`. The real
consumers arrive in Track F, and what they need is recorded in T2 as it appears.

### T4 — align `ScratchInterface` with the `workspace` surface

**Owner instruction, binding:** `createScratch` and anything built beside it follow the
`@orkestrel/workspace` surface vocabulary for files and operations, because it is simpler than
`node:fs`. Borrow the _shape_ only — `@orkestrel/test` keeps zero runtime dependencies, so nothing is
imported from `workspace`.

Measured gap. `WorkspaceInterface` (`workspace/src/core/types.ts:142-167`) against
`ScratchInterface` (`test/src/server/types.ts`):

| Operation          | `workspace`                        | `ScratchInterface` today          |
| ------------------ | ---------------------------------- | --------------------------------- |
| read one           | `read(path)`                       | `read(target)` — matches          |
| read a range       | `read(path, range)`                | none                              |
| read many          | `read(paths)`                      | none                              |
| write one          | `write(path, content)`             | `write(target, text)` — matches   |
| write into a range | `write(path, content, range)`      | none                              |
| write many         | `write(files)`                     | seeding only, at construction     |
| existence          | **`has(path)` / `has(paths)`**     | **`exists(target)`** — wrong word |
| enumerate          | `file(path)` / `files()`           | none                              |
| append / prepend   | `append`, `prepend`                | none                              |
| move               | `move(from, to)` / `move(mapping)` | none                              |
| remove             | `remove(path)` / `remove(paths)`   | none                              |
| reset contents     | `clear()`                          | none                              |
| capture state      | `snapshot()`                       | none                              |
| tear down          | `destroy()`                        | `destroy()` — matches             |
| size               | `count`                            | none                              |

Two findings fall out immediately:

1. **`exists` violates one-concept-one-term.** The fleet's word for this is `has`. That is a rename
   in a published package and therefore a version bump, and it is correct.
2. **The batch overloads are the fleet's `patterns.md` manager shape** — one single-word verb
   carrying the one-item and many-item forms. `ScratchInterface` has none of them.

Not every row belongs on disk. `snapshot()` returns an immutable in-memory record, `read(path, range)`
and `search`/`replace` assume parsed text, and `count` assumes a closed set — a real directory is
open and mutable underneath. The design round rules row by row rather than adopting the interface
wholesale, and says for each row why it is on disk or why it is not.

#### What the reference sandbox actually teaches

Distilled from `/tmp/sandbox-ref/scsr-main/`, journal `tmp/cursor/sandbox-salvage.log`.

**Its containment is weaker than what `@orkestrel/test` already ships.** Lexical prefix check only —
no realpath, no handle registry, and `lstat`/`realpath`/`isSymbolicLink` appear nowhere in
`src/server/sandbox/`. Its default `symlinkNodeModules` behaviour **plants a link pointing out of the
sandbox**, and `execute` is not path-jailed at all: the child process inherits the full filesystem
access of the user. `readInventory` already refuses symlinked roots and requested directories and
skips a symlink met while walking, so there is nothing to salvage on the containment side.

**Two things the owner remembered are not in that code.** There is no on/off switch — `contained` is
hardcoded `true` at construction and `#destroyed` is one-way. And `Sandbox` does not capture the
parent process's console; it captures the **child's** stdout and stderr from `spawn` pipes, which is
a different capability.

**Its own guide diverges from its implementation** in at least four places — a documented directory
that is not where the code lives, a `createWorkspace` factory that does not exist there, a declared
`error` event never emitted, and snapshot/restore documented as execute-rollback. Read the code, not
that guide.

**The scout disagrees with the framing, and the disagreement is load-bearing.** Borrowing
`WorkspaceInterface` wholesale as a filesystem contract is contradictory: it is a _larger_
editor/registry surface that simultaneously **lacks the disk words a test needs** — no directory
creation, no copy, no directory listing, no recursive teardown — while carrying words with no disk
meaning: `Range`, `FileState`, the `FileContent` tagged union, `id`, an emitter, and a `snapshot()`
that returns a new object rather than a tree checkpoint.

**One concrete trap.** `has(paths)` means **ANY** in `@orkestrel/workspace` and **ALL** in the
reference. Same name, opposite batch semantics. Whatever `ScratchInterface` adopts must state which
it is and test it, or a reader who knows one package will be wrong about the other.

**So T4's ruling is a row-by-row adoption, not an interface copy.** Take the verbs and the batch
shape where they have disk meaning — `has`, `read`, `write`, `remove`, `move`, `files` — and add the
disk words `workspace` has no reason to carry. Reject the editor vocabulary outright. The design
round states, per row, why it is on disk or why it is not.

Sequenced after `@orkestrel/guide` publishes. It is a `@orkestrel/test` `0.0.2`, and the fleet pass
adopts whatever it lands.

### T2 — running ledger

Append here the moment something is found; do not carry it in context.

**Ideas to add** — each needs a real consumer before it ships.

- _(none yet)_

**Issues to fix**

- _(none yet)_

**Closed without action, with the reason**

- A shared corpus-walk helper — `readInventory` already is it, proved by equivalence.
- A `readText` helper — `requireValue` composes it in one line.

## Track V — verify every claim before designing against it

**No comment in a consumer's `tests/guides.test.ts` is evidence.** Each one states a reason for a
workaround, and each reason is a claim to probe. `.claude/rules/quality.md` already says a code
comment is not evidence; this track makes that a gate rather than a habit.

Nothing in Track G designs against a claim this track has not tested.

| #   | Claim, as the comment states it                                                                                                                    | Verdict                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| V1  | `worker`: "Source exports have no file/barrel attribution, so exclude the exact internal class names"                                              | **FALSE.** Measured: `source.surface()` already excludes exactly the internal classes and nothing else — `worker` `exports()` 13 / `surface()` 10 with `Dispatch`, `NodeWorker`, `Thread` present in the first and absent from the second; `middleware` 50 / 49 with `MultipartParser` the only difference. Barrel attribution exists and is named `surface()`. The denylist works around a shipped capability.                                                                                                                                                                                                                                      |
| V2  | The remembered reason for `worker`'s locals: a file run in a new thread cannot import the rest of the package, especially core                     | **Does not apply to these three classes.** `src/server/NodeWorker.ts:5` is `import { createWorker } from '@src/core'` — the class imports core directly. `Thread` holds `readonly #script: string \| URL`, so the file that runs in the new thread is the **consumer's** script, not these classes, which run on the main thread. The constraint is real for a consumer's worker entry and irrelevant here.                                                                                                                                                                                                                                          |
| V3  | `toolbox` and 16 others: one `Source` cannot answer a fence importing another face, so a specifier→module map plus an `exportsFor` cache is needed | **TRUE.** Measured on `toolbox`: core surface 141 names, server surface 10, **overlap 0**. No server name — `TerminalRoutes`, `TerminalConnection`, `Method` — appears in the core surface, so a core `Source` cannot answer a fence importing the server face. G5 is real work.                                                                                                                                                                                                                                                                                                                                                                     |
| V4  | `database`: lexical `Source` cannot express its public surface, so a TypeScript compiler surface is required                                       | **FALSE.** Re-probed at the scope `database`'s own manifest declares — `["src/core","src/browser","src/server"]`, not the single module the first probe used. `source.surface()` is an **exact bijection** with the documented surface: documented 129, `surface()` 129, **nothing documented missing from `surface()` and nothing in `surface()` undocumented**. `exports()` returns 138, the 9 extra being exactly the internal classes. Lexical `Source` expresses this package's public surface precisely; the compiler surface is not needed for parity. The first probe's "missing drivers" reading was its own scope artifact, now corrected. |
| V5  | `mcp`: `fenceImports` misses mixed `import Default, { named }`, and a slash after a bare `}` swallows the rest of a fence                          | **Mixed import TRUE**, measured: `fenceImports("import D, { a } from '@x/y'")` returns `[]` while the brace and `import type` forms both resolve. **Slash-after-brace did not reproduce** on the Orchestrator's vector, which returned the import normally — so that half is open, and `mcp`'s exact vector is owed before ruling either way. A failed reproduction is evidence about the vector first.                                                                                                                                                                                                                                              |
| V6  | `html`: the walker must skip `app/browser/main.ts` and `app/server/main.ts`                                                                        | Untested. Probe whether gates stay green without the skip.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

**V1 changes Track G.** G4 asked for a capability that already exists, so it is struck as a guide
change and becomes a per-package correction: `worker`, `middleware` and any package in the same shape
either adopt `surface()` as their documented-surface population or record why `surface()` does not
fit. That correction belongs to Track F, in the same single visit.

There is a second, separate question V1 exposes and does not answer: 13 implementation classes across
`database` (9), `worker` (3) and `middleware` (1) carry `export` for the policy sweep while being
deliberately absent from their barrel. `.claude/rules/architecture.md` says an intentional reusable
export belongs in the barrel and a non-public declaration should be a true private detail. Three
packages sitting between those two rules is a design question for `scaffold`'s rule set, not a defect
in any one package. Recorded, not fixed here.

## G7 — the finding the probes actually produced

Three packages built three different workarounds and two were unnecessary:

| Package      | Workaround                                              | Needed?                                                            |
| ------------ | ------------------------------------------------------- | ------------------------------------------------------------------ |
| `worker`     | `INTERNAL_EXPORTS` denylist over `exports()`            | No — `surface()` excludes exactly those                            |
| `database`   | a TypeScript compiler surface via `deriveEntrySurfaces` | No — `surface()` is an exact bijection with its documented surface |
| `middleware` | silence; `MultipartParser` simply sits in `exports()`   | No — same                                                          |

The common cause is not a missing capability. It is that **neither `exports()` nor `surface()` says
in its name or its row which question it answers**, so each package guessed and built machinery
around the guess.

- `exports()` — every direct declaration under the selected modules. Includes a class that carries
  `export` only because the policy sweep requires it.
- `surface()` — every declaration reachable through the barrels. This is what a consumer can import,
  and therefore what a documented surface should be checked against.

**The repair is documentation, not API.** `guides/guide.md` must state which projector a parity test
should use for its documented-surface population, and why: a guide documents what a consumer can
import, so `surface()` is the default and `exports()` answers a different question — what the package
declares. Both rows exist; neither says this today.

That repair is cheaper than either API addition it replaces, and it prevents the fourth package from
inventing a fourth workaround. It ships with the G5 change in the same `guide` release.

## G5 ruling — ship `SourceManager`, and switch the fleet to `surface()`

Both lanes ran one brief, blind, and **converged on shape B**: a resolver whose specifier→module map
stays in the consumer. They differed on the return type and the name. Both, unprompted, also reached
G7 — the objective lane wrote "the resolver must use `Source.surface()`, not `Source.exports()`", and
the subjective lane wrote that the divergence "is the real finding, and one could close that with
forty one-word edits and ship nothing at all."

**The decisive measurement, taken before ruling.** The subjective lane named its own load-bearing
risk: switching consumers to `surface()` could redden any package whose fence imports a symbol
declared but not barrel-exported. Measured across all 41 packages:

```text
ts fences: 552    import rows: 718
imports that would newly fail under surface(): 0
```

The switch is free. That kills the risk, and it makes G7 sufficient on its own to close the
divergence.

**Ruled: ship it, in the subjective lane's shape and name, with the objective lane's population rule
moved into documentation rather than into the return type.**

- `createSourceManager({ files, modules })` → `SourceManagerInterface` with `source(specifier)`
  returning `SourceInterface | undefined`.
- **Entity, not names.** A manager returns entities; returning `readonly string[]` would make it not
  a manager, and it would foreclose consumers that legitimately need more than names — `mcp` uses
  `surface()` inside its own import check and `database` uses `methods(...)`. Those are present
  consumers, not hypotheticals.
- **`SourceManager`, not `Faces`.** `face` appears nowhere in the package; `module` is the existing
  word, and `Source` + `SourceManager` falls straight out of the entity-plus-manager naming rule.
- `undefined` absorbs `SELF_SPECIFIERS`: a mapped specifier is local, absence is the skip signal.
  That removes one fact written twice in every multi-face package.

**Preserve every map verbatim in the rollout.** `ollama` deliberately omits its own published
specifier from its filter. A rollout that normalizes the maps would break the very seam this design
claims to protect.

Already verified so no unit re-derives it: `@orkestrel/guide` is a devDependency in **40** packages
and a runtime dependency in **0**, so this is 40 re-pins and zero republishes — no cascade, no layer
ordering, no publish window beyond `guide`'s own.

## Track W ruling — the sandbox halves

Scouted `@orkestrel/workspace`, `@orkestrel/console` and `@orkestrel/terminal` before designing.
Journal: `tmp/cursor/sandbox-scout.log`, `cursor-grok-4.6-high`.

**The premise needs correcting first. `@orkestrel/workspace` is not a filesystem sandbox.** It is an
in-memory immutable file map — no disk, no lexical or realpath jail, no open-handle registry. It
tracks files in a `Map` (`workspace/src/core/Workspace.ts:47`) and its `destroy()` tears down only its
emitter without clearing that map (`:246-248`). It shares vocabulary with `createScratch` — `write`,
`read`, `destroy`, `path` — and almost no behaviour. So `createScratch` is **not** duplicating it, and
the filesystem half is already shipped and correctly placed.

**The capture half fails the membership rule outright.** Counted across all 41 packages' tests:

| Shape                                                                             | Packages                 |
| --------------------------------------------------------------------------------- | ------------------------ |
| Direct assignment to `console.*` or `process.std*.write`                          | **1** — `console` itself |
| Injected fakes instead of touching the process (`createFakeTTY`, `PassThrough`)   | 2 — `terminal`, `mcp`    |
| Collecting a **child** process's stdout, which is product I/O rather than capture | 2 — `sea`, `mcp`         |
| No stream or console capture at all                                               | **36**                   |
| `vi.spyOn(console\|process)`                                                      | **0**                    |

One package captures streams in its own tests. The rule requires three independent members or five
regardless. **Ship nothing.**

**Depending on the existing packages was never available either.** Transitive `@orkestrel` closures:
`console` 3, `workspace` 6, `terminal` 8. Any of them ends zero-dependency for all 41.

**What the capture half would cost if built anyway.** `console` already implements it correctly —
`Capture` for `console.*` and `ProcessCapture` for `process.stdout/stderr.write`, exact-reference
restore, start/stop switchable. Rebuilding that in `@orkestrel/test` is the reimplementation
`AGENTS.md` forbids, and three properties are documented but unproven even there:

- **Non-reentrancy** is stated (`console/src/core/types.ts:753-756`) and no test constructs two
  overlapping captures.
- **Restore-on-abandon** is a test-harness `afterEach` guarantee, not a product one.
- **Vitest's own output interception** is untested against; the suites avoid a real TTY with write
  probes rather than proving compatibility.
- Neither API touches `process.stdin` at all, so the "control stdin" half of the original sandbox
  exists nowhere in the fleet.

**Ruling: `@orkestrel/test` ships nothing for capture, and `createScratch` stands as the filesystem
half.** Reopen when a third package independently needs stream capture in its own tests, or when the
user decides the capability is worth building on product grounds rather than duplication grounds — in
which case its home is `@orkestrel/console`, which already owns the mechanism, and the open questions
above are what that work would have to close first.

## Track G — `@orkestrel/guide`

Three defects, then two bounded gaps, then one deep limit. `guide` is at `0.0.10` and depends on
`@orkestrel/contract@^0.0.11` and `@orkestrel/markdown@^0.0.8`.

| #   | Item                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Size           | Evidence                                                                                                                                                                                                                                                                                                                                                                                 |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| G1  | `extractPatterns` silently drops every fence that is not ` ```ts `. Fail loudly on an unrecognized fence language instead.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | small          | `guide/src/core/helpers.ts:1455`. Latent, not live: across all 41 guides there are 3581 ` ```ts `, 102 ` ```text `, 82 ` ```sh `, and zero ` ```typescript `. The first person to write ` ```typescript ` loses their fence checks while parity stays green.                                                                                                                             |
| G2  | `firstCode`'s guide text omits `image`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | one line       | `guide/guides/guide.md:88` says it descends `emphasis` and `link`; `helpers.ts:850` also descends `isImageNode`. A parity defect in the parity package.                                                                                                                                                                                                                                  |
| G3  | `fenceImports`' guide table does not name the import forms it excludes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | one line       | `guide.md:93`. `mcp` works around the mixed `import Default, { named }` case at `mcp/tests/guides.test.ts:148-162`.                                                                                                                                                                                                                                                                      |
| G4  | `exports()` carries no barrel attribution, so a package cannot express "declared but not public".                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | bounded design | `worker` maintains `INTERNAL_EXPORTS` for exactly this — `worker/tests/guides.test.ts:27-31, 99`. Coding law requires `export` on classes deliberately absent from the barrel.                                                                                                                                                                                                           |
| G5  | No specifier-to-face resolution. One `Source` cannot answer a fence importing another face of the same package.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | bounded design | 38 packages carry a `SELF_SPECIFIERS` allowlist; 17 carry a `SPECIFIER_MODULES` map plus a hand-rolled `exportsFor` cache. `fenceImports` parses imports and has no concept of "self".                                                                                                                                                                                                   |
| G6  | **CLOSED — retained on evidence.** `Source` stays lexical. Both cited reasons for exceeding it are falsified: V1 shows `worker`'s denylist works around `surface()`, and V4 shows `surface()` is an exact bijection with `database`'s documented surface at its real manifest scope. No reachable parity defect motivates a parser. Reopen only on a measured case where `surface()` cannot express a package's public surface — a named re-export or `export type {}` form that a package actually ships and that parity therefore misses. Until such a case exists, this is a documented limit rather than a defect, and `.claude/rules/quality.md` says to document the obligation rather than build machinery against a requirement nobody wrote down. | ruled          | `Source` sees only column-zero `export …` and `export * from './x.js'` barrels. Named re-exports, `export type {…}` and collisions fall outside the grammar. Root cause of both G4's workaround and `database`'s compiler surface at `database/tests/setupServer.ts:274`. Documented as deliberate at `guide/src/core/types.ts:128-154`. May legitimately end as "retained on evidence". |

G6 gets its own adversarial design pass and may close with no code change. Do not patch it.

## Track S ruling — the three fleet-wide findings

**S1 — `npm pack` ships stale `dist`. Ruled: fix the process, not 41 manifests.**

0 of 41 packages have `prepack` or `prepare`, so `npm pack` ships whatever `dist/` is on disk. That
cost one audit round: an auditor packed a stale build and reported the package shipping a deleted
export.

Adding `prepack` would not change how this fleet publishes at all — `npm publish --ignore-scripts` is
the documented flow here and skips every script, so the artifact is built beforehand either way. The
only thing `prepack` buys is an honest `npm pack` for someone inspecting, at the cost of 41 manifest
edits plus a scaffold generator change.

The failure was an auditor drawing a conclusion from an artifact nobody had rebuilt. That is an
evidence-discipline defect, and it is fixed where evidence discipline lives — one line in
`orkestrel-falsify` — rather than by 41 edits. The manifest option is recorded as the user's call, not
taken silently.

**S2 — every published README links into `guides/`, which never ships. Ruled: NOT A DEFECT, struck.**

All 41 READMEs carry a relative link into `guides/`, and `files` ships `dist/src` and `README.md`
only. npm rewrites those relative links against the `repository` field, which every package sets, so
they resolve on GitHub rather than inside the tarball.

Verified in a browser against the published `@orkestrel/test`: the `guides/test.md` link renders the
guide at `orkestrel/test` blob `07796f1`, the commit `main` points at and the commit `0.0.1` was
published from. Keep the links relative. The rewrite pins each reader to the release they installed,
which an absolute `main` URL would break by showing documentation for code they do not have.

**S3 — CI is `ubuntu-latest` only across all 41. Ruled: intentional, retained, with its consequence
recorded.**

The consequence is not nothing: every host-varying assertion in the fleet — permission bits, path
separators, filesystem case folding, rename semantics — is proven on POSIX and nowhere else. That is
a legitimate scope for a fleet whose consumers are Node services, and adding a Windows runner would
redden assertions that were never written for it.

What it obliges is honesty in prose, which `@orkestrel/test` now demonstrates: its mode and separator
claims are qualified to POSIX and say what the suite therefore proves. Any package asserting a
host-varying property states its scope the same way.

## Track P ruling

**P1 — `html`'s test title says "API Surface function" while its guide heading is `## Surface`.**
A one-word edit in a file the fleet pass already opens. Folded into Track F rather than given its own
visit.

**P2 — `pool`'s README-against-manifest check. Ruled: removed from `pool`.**

The check proved the README's stated Node version matched `engines.node` and that its "ESM and
CommonJS builds" claim matched a root export carrying both `import` and `require`. It was the only
one in the fleet, and the user directed its removal.

Nothing is promoted and nothing is copied. The fleet pass carries no item from this finding, and
`@orkestrel/test` gains no helper for it. `pool`'s `guides` project drops from 10 tests to 9.

## `@orkestrel/test@0.0.2` — defects the fleet pass surfaced

Two API defects, both found by real adoption rather than by review, both reproduced here. They join
T4's `ScratchInterface` alignment in the next release.

**`roundTripJSON` cannot accept an interface-typed value.** Its `JSONValue` constraint has an object
arm of `{ readonly [key: string]: JSONValue }`, and TypeScript gives an implicit index signature to a
type alias but never to an interface. Reproduced with `tsc --strict`:

```text
error TS2345: Argument of type 'SnapshotInterface' is not assignable to parameter of type 'JSONValue'.
  Index signature for type 'string' is missing in type 'SnapshotInterface'.
```

The identical shape written as a type alias compiles clean.

**Ruled during the pass: `roundTripJSON` is adopted nowhere.** Three packages hit this
independently — `workspace` refused it under its deviation contract, `agent` stopped on it, and
`workflow` adopted it and went red on `WorkflowSnapshot`. Three appearances of one defect class is
the escalation budget, so the ruling is on the design rather than on a third repair. All five
packages that hand-rolled it keep their local `roundTripJSON<T>(value: T): T`, each carrying a
comment naming the constraint and the condition that retires it. Neither unit reached for `as` or
reshaped a source type to force the adoption, which is the outcome the deviation contract exists to
produce. `AGENTS.md` requires every reusable and
public type to be an interface in `*/types.ts`, so the constraint contradicts the fleet's own type
conventions and the helper is unusable for exactly the values it exists to round-trip. `workspace`
hit this on `WorkspaceSnapshot`, correctly refused the adoption under its deviation contract, and
kept its local copy. Fix the constraint; do not ask consumers to reshape their types.

**`readInventory` cannot reach a root-level file.** It walks directories, so a guide linking to
`../AGENTS.md` needs a separate `node:fs` read. Every adopting package now carries a `ROOT_FILES`
constant and one `readFileSync` loop to cover it. That is a workaround in 41 places for a missing
option.

## Template ruling — check A stays, and the canon hole gets a mechanism

Two lanes on one brief. Subjective: `reviewer`, Opus 5. Objective: `analyst` → re-run on GPT-5.6 Sol
after the first driver returned an analysis without reaching the bench; the bench probed **live**
(`SOL-PROBE-OK GPT-5.6-SOL`), so that was a driver fault, not a dark bench, and the lane was re-run
journaled rather than substituted.

Both lanes broke claims 4 and 5. Both confirmed claim 1. They split on claim 3 because they answered
different questions, and the split is the ruling.

**Check A — `missingSymbols(exports, surface)` must be empty — stays in the fleet template.** It is
the only check that reads declarations → barrel. B reads barrel → declarations; C and D both read
guide ↔ barrel. Drop A and a new capability whose barrel row was forgotten is invisible to every
remaining check while `check`, `build`, and `test` all pass, because internal consumers import
relatively. Guide and barrel then agree perfectly on a surface that omits the capability, and the
suite reports that agreement as health. Dropping A also strands the `hidden()` check beside it,
which compels the `export` keyword and would then require the symbol to arrive nowhere.

**Canon under-determines exactly one case.** A declaration in a centralized file must be exported and
must be barrelled, so A is canon for helpers, validators, factories, constants, errors, and types.
For a class, `architecture.md` offers three terminal states — barrel it, make it a true local or
runtime-private detail, or remove the capability. The middle state is structurally unavailable to a
class that one-class-per-file evicted from its single consumer, and the prohibition that would force
the first is conditioned on "intentional **reusable**". That is the hole. It is a hole in
`architecture.md`, not a defect in the three packages.

**The fleet has already ruled it twice, opposite ways, and wrote neither ruling down.**
`agent/src/core/index.ts:7` barrels `Channel` — `export class Channel<T>` with no interface and no
`types.ts` entry, pure plumbing — and documents it. `middleware/guides/middleware.md:228` declares
its mirror-image class internal in prose. A prose exemption is enforced by nothing, which is why this
question was still open.

**Mechanism, applied per package in its own `tests/guides.test.ts`:** a frozen `INTERNAL` list of
symbol keys, carrying two assertions — A minus `INTERNAL` is empty, and every name in `INTERNAL` is
genuinely stranded. The second half is what keeps the list honest; a stale entry turns the suite red.
`INTERNAL` is `[]` in 38 packages, 9 in `database`, 3 in `worker`, 1 in `middleware`. This preserves
A's protection, keeps placement-forced machinery out of the published vocabulary, and puts the
exemption where a test enforces it instead of where prose asserts it.

**`middleware` repairs by deletion, not by barrelling.** Its `MultipartParser` Surface row breaks D
and breaks "every backticked API in a guide resolves to a real public export". The row leaves the
`## Surface` table; the internal description stays as prose outside it; the symbol joins `INTERNAL`.
Guide and test only — **no `src` change, so F3 is struck entirely and the fleet publishes nothing.**

**Recorded for the next matrix, not this one:** `agent`'s `Channel` and `middleware`'s
`MultipartParser` are the same species with opposite rulings. Reconciling them is a canon decision
outside this campaign's exit criterion.

## Track F — the fleet pass, last and once

Gated on `@orkestrel/test` and `@orkestrel/guide` both published.

| #   | Item                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Evidence                                                                  |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| F1  | Adopt `@orkestrel/test` in all 41: replace the corpus walk, `readText`, and every extracted helper it now ships.                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 384 setup-file clusters, topping out at 32 packages for `createRecorder`. |
| F2  | Extract per-package case matrices into each package's own setup file. **1,574 repeated five-line blocks across 36 packages**, counting only blocks repeated three or more times inside one package: `mcp` 208, `database` 200, `scaffold` 121, `workflow` 121, `contract` 111, `middleware` 99, `agent` 93. Worst single blocks are a 42× query-builder condition table in `database`, a 24× intrinsic-probe matrix in `contract`, an 18× `duplexPair` fixture in `websocket`. `tests.md` already rules: data tables and case matrices belong in a setup file at any size. | token-window clone detector over 483 files, 81,102 windows                |
| F3  | Republish only the packages whose pass moves `src`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Measured below: that set is `middleware` alone.                           |

Visit each repository **once**, doing F1 and F2 together. Serialize writers per repository.

### F3 re-baseline — the cascade is one package, not a fleet

`@orkestrel/guide` is a **devDependency in all 40** packages that use it, never a runtime dependency,
and `@orkestrel/test` joins them as one. The pass writes `tests/`, `devDependencies`, and `guides/`,
and `files` ships `dist/src` and `README.md`. A development bump reaches nobody, so each package
re-pins, proves its gates, and commits to `main` with no version bump and no publish.

The exception is the rule's own: a development bump that forces a `src` change is not a development
bump. Exactly one package hits it.

Measured across all 41 manifests with `@orkestrel/guide@0.0.11`, comparing each documented surface
against `exports()` and against `surface()`:

| Package      | Under `exports()` | Under `surface()`          | Ruling                                         |
| ------------ | ----------------- | -------------------------- | ---------------------------------------------- |
| `database`   | 9 undocumented    | clean                      | switch repairs it; delete the compiler surface |
| `worker`     | 3 undocumented    | clean                      | switch repairs it; delete `INTERNAL_EXPORTS`   |
| `middleware` | clean (155 = 155) | 1 documented symbol absent | add the missing barrel row                     |
| other 38     | clean             | clean                      | switch is inert                                |

`database` and `worker` built their workarounds against a failure the switch removes, which is the
G7 ruling landing exactly where it was predicted to.

`middleware` is the only `src` change. `src/server/MultipartParser.ts` declares `export class
MultipartParser`, `guides/middleware.md` documents it, and `src/server/index.ts` carries no row for
it. The barrel rule is not optional here — a documented, intentional, reusable export is never left
stranded — so the repair is the barrel row, not a guide deletion. That moves the published surface,
so `middleware` bumps and publishes. It has **zero runtime dependents in the fleet**, so it publishes
alone and starts no cascade.

Its file placement is a separate finding recorded against the row that owns it: `MultipartParser.ts`
sits at the environment root rather than in a domain folder. Not this pass.

## G1 ruling — `patterns()` becomes `fences()`

Both lanes ran one brief, blind. The objective lane chose **B**: keep `patterns()` and add a
reporting window, `extractFenceLanguages` plus `GuideInterface.languages()`. The subjective lane
chose **D**: make the projection total — `fences(): readonly GuideFence[]` carrying
`{ language, code }` — delete `extractPatterns`, and ship one comparison leaf `findUnlisted`.

**Ruled: D.** Three grounds, in order.

1. **The filter is the defect, not the literal.** Five of six `GuideInterface` members are total over
   a stated scope. `patterns()` is the only one that discards document content by a criterion its own
   name does not state, and its TSDoc at `guide/src/core/types.ts:99` says "whole document" while the
   population is filtered. B leaves that in place and adds a second member to narrate what the first
   threw away.
2. **D widens the seam; B only reports on it.** Under B a package documenting `sql` or `sh` examples
   still cannot make those fences feed the example or import checks, because `guide` already decided
   `ts`. Under D the package writes that predicate in its own file. That is what the per-package copy
   exists for.
3. **The objective lane costed D against a fleet visit that is already scheduled.** It rejected D as
   breaking 40 consumers. Measured: 40 of 41 call `.patterns()`, and `@orkestrel/guide` is a
   **devDependency in 40 packages and a runtime dependency in 0**. A development bump reaches nobody,
   so consumers re-pin, prove gates and commit with no version bump and no cascade — and Track F is
   already visiting every repository once. The marginal cost of D is near zero.

Verified before ruling rather than taken on trust: `CodeBlockNode.lang` is `readonly lang?: string`
at `markdown/src/core/types.ts:183-189`, and `markdown` is at `0.0.8` matching guide's `^0.0.8` pin.
So `string | undefined` needs no sentinel, which is what lets an untagged fence be reported honestly.

**The risk D carries, and its settling check.** D's language assertion is opt-in, so a batched fleet
edit could emit 41 identical `.filter(f => f.language === 'ts')` lines, add no assertion, and report
green from exactly where we started. The subjective lane raised this against its own decision. It is
a hard acceptance criterion on Track F, not a note:

```text
grep -l findUnlisted /home/user/packages/*/tests/guides.test.ts | wc -l   # must equal 41
```

Each Track F slice measures its own package's fence languages first and lists second. It never
inherits `['ts', 'text', 'sh']` from this ruling — that set was measured across shipped top-level
`guides/` only, in column-zero lowercase form, and an uppercase tag or a fixture fence is outside it.

### G1 units

| Unit | Owns                                                            | Engine                                           |
| ---- | --------------------------------------------------------------- | ------------------------------------------------ |
| U1   | `src/core/types.ts`, `src/core/helpers.ts`, `src/core/Guide.ts` | Opus `implementer`                               |
| U2   | `tests/src/core/*.test.ts`, `tests/guides.test.ts`              | Sol `implementer`                                |
| U3   | `guides/guide.md`                                               | Opus `implementer`                               |
| U4   | each consumer's `tests/guides.test.ts` and pin                  | folded into Track F, gated on `guide` publishing |

U2 needs a negative control: a fixture guide carrying a `typescript` fence that `findUnlisted` must
report. Without it the check passes everywhere on day one and has never been red.

## Rulings already taken, so they are not relitigated

- **`guides.test.ts` stays per-package.** The copy is the customization seam: it lets a package make
  its parity proof specific to itself and carry its own exceptions without republishing
  `@orkestrel/guide`. Every divergence checked across 41 packages was deliberate and commented. Four
  projectors exist — 36 on `source.exports()`, `worker` on a filtered `exports()`, `guide`/`mcp`/
  `scaffold` on `source.surface()` with the claim renamed to "barrel", and `database` on a TypeScript
  compiler surface. That is the seam working, not drift.
- **`@orkestrel/test` ships no guide-parity export.** Its contract forbids naming a foreign
  `@orkestrel/*` type, and a structural restatement would redeclare another package's published
  contract.
- **No Windows CI runner.** The package documents no drive-relative or UNC claim; a word-bounded
  search of all 41 guides and READMEs returns zero occurrences of UNC, drive, win32 or Windows.

## Corrections this campaign already had to make

Recorded so the next reader does not trust the superseded numbers.

- The `37 vs 3` split between `source.exports()` and `source.surface()` was an artifact of a
  token-window clone detector reporting which line fell inside a matched window. The real shape is
  four projectors, above.
- "4 packages build the corpus in a setup file" was wrong. It is **3** — `html`, `guide`, `mcp`.
  `database` walks inline; its setup file holds the compiler surface, not the corpus.

## Placement-forced classes — ruled and shipped

`architecture.md` under-determined where a class belongs when one-class-per-file evicts it from its
only caller. Twelve classes across the fleet had been decided package by package, seven barrelled and
five interned, with no rule to appeal to.

Measured 216 implementation classes. An earlier cut of the instrument tested for a same-named
`XInterface` and reported 55 in the population; it was wrong, because `MemorySessionStore` implements
`SessionStoreInterface`. Testing the `implements` clause gives 12, and a third category the first
framing missed: five classes implementing a documented interface while deliberately staying out of
the barrel, which is coherent and untouched.

Two lanes on one brief broke five of six claims, including both that favoured the cheap answer. They
split on three classes and the split was the ruling: Sol asked whether a class is necessary given its
factory, the reviewer asked whether it is usable given its constructor. Usability wins, because the
canon says exposure is never gated on current consumer need. `createStyler` returning
`new Styler(...).surface` decided `Styler` against the reviewer's inclination — the public value is a
projection, not the instance.

The rule is in **Barrel exports**, vendored to all 41. It reproduces thirteen of fifteen existing
decisions, so it describes the fleet's judgment rather than reversing it.

Two packages moved, both breaking, both published with their cascade:

| Package    | Change                                         | Version  |
| ---------- | ---------------------------------------------- | -------- |
| `console`  | intern `Styler`                                | `0.0.6`  |
| `terminal` | re-pin `console`                               | `0.0.7`  |
| `scaffold` | re-pin `console`, move the self-pin            | `0.0.31` |
| `toolbox`  | intern `TerminalConnection`, re-pin `terminal` | `0.0.6`  |

`TerminalConnection`'s `@example` and its guide fence both constructed it from `accepts` and
`stream`, which only `TerminalRoutes` can build; both typechecked without being runnable. A barrel row
obliges a runnable example, and that obligation is what the row could not meet.

Proved against a real consumer install of `toolbox@0.0.6`: one `console@0.0.6`, one
`terminal@0.0.7`, no duplicates. That is what the cascade bought.

**Open, publish-free:** every package still pins `@orkestrel/scaffold@^0.0.30` as a devDependency,
and `BASE_DEV_DEPENDENCIES` pins `@orkestrel/guide@^0.0.10` and omits `@orkestrel/test`, so a newly
generated workspace starts inconsistent with all 41. A devDependency bump reaches nobody: re-pin,
prove the gates, commit to `main`, do not publish.

## T4 ruled — `@orkestrel/test@0.0.2`

Two lanes on one brief, blind. Subjective `planner` Opus 5, objective Sol via journaled CLI. Six of
seven claims broken between them. Three facts settled by probe rather than argument, and each
overturned part of what a lane concluded.

**`createScratch` has zero consumers.** All 46 `@orkestrel/test/server` imports across the fleet are
`readInventory`. Sol found this; the subjective lane cited fleet call sites that are hand-rolled
temp-directory fixtures, not `createScratch` calls. Under the creation gate, every proposed
expansion is therefore speculative **as stated** — but the consumers exist unmigrated, in
`browser`, `worker`, `database`, `sqlite`, `scaffold` and `sea`. The work is a migration that adds
exactly the rows it proves necessary, never an expansion taken on faith.

**`roundTripJSON`'s repair is neither lane's.** Sol ruled the bound should drop to plain `<T>`; that
compiles and lies, returning a `string` typed as `Date`. The subjective lane kept a bound and
proposed `<T extends JSONSafe<T>>`, which does not compile — `TS2313`, circular constraint — and it
flagged itself unverified. The working form, probed with controls that fail for the right reason:

```ts
declare function roundTripJSON<T>(value: T & JSONSafe<T>): T
```

Accepts an interface-typed snapshot and a nested alias; rejects `Date`, `Map`, and a method-bearing
interface with `TS2345`.

**`has(paths)` is ALL if it ships, and it should not ship.** `@orkestrel/workspace` measured ANY;
`patterns.md` says ALL. Both lanes ruled ALL. The subjective lane then showed the row should not
exist: the two measured multi-path checks in the fleet deliberately keep results in named records,
because a failure has to name which path was missing, and a collapsed boolean destroys exactly that.
`read(paths)`, which omits absent keys, carries the diagnostic a batch `has` throws away.

**`readInventory` widens its existing parameter rather than gaining an option.** Sol proposed an
`InventoryOptions.files`; that collides with `ScratchOptions.files`, which already means paths mapped
to contents to **write**, in the same barrel. `directories` becomes `targets` — a target is a file or
a directory — matching `resolveContained`'s established use of the word. An explicitly named target
is included regardless of `extensions`, and that sentence is tested.

**Rejected on the creation gate, recorded as scope rather than correctness so a later consumer can
reopen them:** `read(paths)`, `remove(paths)`, `write(files)` post-construction, `prepend`, `append`,
`move`, `files()`, `clear()`, `count`. **Rejected on correctness:** `snapshot()`, `id`, `emitter`,
`search`, `replace`, `range` — each names a foreign type or an entity the scratch does not have.

**Carried to the implementation brief, or it ships as drift:** the `exists` → `has` rename touches
four places in `guides/test.md`, and the `readInventory` widening invalidates three more. Parity
proves a name resolves; it never proves the sentence beside it is true.

**Routed out of this campaign:** the fleet holds three contradictory readings of the plural-boolean
batch shape — ALL in `template` and `program`, ANY in `workflow` and `workspace`, per-item results in
a `database` guide. `patterns.md` says ALL and two published packages contradict it. That is a
fleet-canon question and this package is not the vehicle for settling it.

## T5 — the demand survey

**The creation gate was applied to the wrong population.** T4 read "no package imports
`createScratch`" as "the proposed rows are speculative." Those are different claims. `createScratch`
is a new capability, so nothing imports it by construction; the demand for it is the hand-rolled
temp-directory code it exists to replace. That code is an indirect consumer until it adopts the
package. The instrument is not "who imports it" but "what do the fixtures being replaced actually
do" — the same instrument that justified the package in the first place, when 32 packages
hand-rolled `createRecorder`.

**Codex bench DARK.** `codex --version` resolves (`codex-cli 0.147.0`) and `codex login status`
reports `Logged in using ChatGPT`, but two bounded round-trip probes returned nothing within 180s
and 300s. Not an auth failure, so the login ladder does not apply. Lane substitution for this
round: Opus 5 runs both adversarial lanes, in separate clean contexts, blind to each other. Cursor
Grok probed live (`GROK-OK cursor-grok-4.6-high`) and carries the reading.

**The population is measured, not assumed.** Grouping every package by which of its test files match
`mkdtemp|tmpdir\(|mkdirSync|rmSync|renameSync|symlinkSync|cpSync|copyFileSync`:

```
34  tests/config.test.ts + tests/setupPolicy.ts, and nothing else
 2  + setupServer.ts                                   (database, worker)
 1  + src/server/{SQLiteDatabase,helpers}.test.ts      (sqlite)
 1  + setupServer.ts, src/server/middlewares.test.ts   (middleware)
 1  + setupServer.ts, src/server/{helpers,seals/SEA}.test.ts        (sea)
 1  + setupServer.ts, src/server/{factories,helpers}.test.ts        (browser)
 1  + setupServer.ts, integration.test.ts, src/core/templates.test.ts,
      src/server/{Materializer,WriteTransaction,helpers}.test.ts    (scaffold)
```

`md5sum */tests/setupPolicy.ts` returns one hash for all 41; `md5sum */tests/config.test.ts` returns
one hash for 40 and a second for `ollama`. So the fleet's temp-fixture population is one shared
template plus eight packages, not 41 independent fixtures. That search covers nine tokens and proves
nothing about a temp path built some other way; the slices are told to report one if they find it.

**Bench liveness corrected.** Codex round-tripped on a third probe at a 240s cap (`SOL-OK`). The
first two probes were slow, not dead. Both engines therefore take their default lanes for T5: Opus 5
subjective via native subagent, Sol objective via journaled `codex exec`. Record the reversal so the
earlier dark reading is not read as standing.

### What the fixtures actually do

Three read-only Grok slices covered `scaffold`; `sea`/`browser`/`sqlite`;
`middleware`/`database`/`worker`/`ollama` plus the shared template. The demand overturns three T4
rejections, each on evidence T4 did not have:

- **Empty-directory creation.** Seven sites across four packages create a directory with no file
  beneath it, and `scaffold` promoted it to a named fixture method (`tests/setupServer.ts:353`).
  `write` cannot express it.
- **Removing a selected entry.** Twelve-plus sites across five packages, and again a named
  `scaffold` fixture method (`tests/setupServer.ts:363`). `destroy` does not cover it.
- **Listing.** Fifteen-plus sites, including ten `readdirSync(workspace.path)` calls in one file and
  a `globSync` in the ×41 template. Two operations wear one heading: a one-level name list and a
  recursive pattern match.

Confirmed rather than overturned: `prefix`, `files` seeding, the absolute `path`, parent creation on
`write`, and the ruling that no batch overload ships — the survey found no site that collapses
several existence checks, and `integration.test.ts:417-419` deliberately keeps three apart.

Rejected on the creation gate, each confined to one package testing an SUT that owns that exact
behavior: `rename`, `chmod`, hard link, file-descriptor access. No `copyFileSync` or `cpSync` exists
anywhere in the slices read.

### `createScratch` cannot allocate outside `tmpdir()`

`src/server/factories.ts:23-26` resolves the prefix against `tmpdir()` and throws when its parent is
anything else. Probed against the real code with a control that fires: a bare prefix lands under
`tmpdir()`, `resolve('tmp','probe-parent-')` throws, `'nested/probe-'` throws.

Seven sites allocate outside `tmpdir()` — five in `scaffold/tests/src/core/templates.test.ts`, one in
`database/tests/setupServer.ts:117-119`, and one in the forty-copy `config.test.ts:578`. Each does so
because a real `tsc --project`, a real oxfmt run, or a real Vite `build` with `entry` inside the
fixture needs it inside the package tree to resolve. Those sites are structurally unable to migrate,
not merely inconvenienced. That probe becomes a test in the implementation unit; a verification that
runs once is a rehearsal.
