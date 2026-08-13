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

| # | Item | State |
| --- | --- | --- |
| T1 | Surface for `0.0.1` | **Ruled: ship as-is.** No new export is warranted. |
| T2 | Additions and issues ledger | Open for the campaign's life. Section below. |
| T3 | Publish `0.0.1` | Blocked on the user's credential and decision. |

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
`node:fs`. Borrow the *shape* only — `@orkestrel/test` keeps zero runtime dependencies, so nothing is
imported from `workspace`.

Measured gap. `WorkspaceInterface` (`workspace/src/core/types.ts:142-167`) against
`ScratchInterface` (`test/src/server/types.ts`):

| Operation | `workspace` | `ScratchInterface` today |
| --- | --- | --- |
| read one | `read(path)` | `read(target)` — matches |
| read a range | `read(path, range)` | none |
| read many | `read(paths)` | none |
| write one | `write(path, content)` | `write(target, text)` — matches |
| write into a range | `write(path, content, range)` | none |
| write many | `write(files)` | seeding only, at construction |
| existence | **`has(path)` / `has(paths)`** | **`exists(target)`** — wrong word |
| enumerate | `file(path)` / `files()` | none |
| append / prepend | `append`, `prepend` | none |
| move | `move(from, to)` / `move(mapping)` | none |
| remove | `remove(path)` / `remove(paths)` | none |
| reset contents | `clear()` | none |
| capture state | `snapshot()` | none |
| tear down | `destroy()` | `destroy()` — matches |
| size | `count` | none |

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
`WorkspaceInterface` wholesale as a filesystem contract is contradictory: it is a *larger*
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

| # | Claim, as the comment states it | Verdict |
| --- | --- | --- |
| V1 | `worker`: "Source exports have no file/barrel attribution, so exclude the exact internal class names" | **FALSE.** Measured: `source.surface()` already excludes exactly the internal classes and nothing else — `worker` `exports()` 13 / `surface()` 10 with `Dispatch`, `NodeWorker`, `Thread` present in the first and absent from the second; `middleware` 50 / 49 with `MultipartParser` the only difference. Barrel attribution exists and is named `surface()`. The denylist works around a shipped capability. |
| V2 | The remembered reason for `worker`'s locals: a file run in a new thread cannot import the rest of the package, especially core | **Does not apply to these three classes.** `src/server/NodeWorker.ts:5` is `import { createWorker } from '@src/core'` — the class imports core directly. `Thread` holds `readonly #script: string \| URL`, so the file that runs in the new thread is the **consumer's** script, not these classes, which run on the main thread. The constraint is real for a consumer's worker entry and irrelevant here. |
| V3 | `toolbox` and 16 others: one `Source` cannot answer a fence importing another face, so a specifier→module map plus an `exportsFor` cache is needed | **TRUE.** Measured on `toolbox`: core surface 141 names, server surface 10, **overlap 0**. No server name — `TerminalRoutes`, `TerminalConnection`, `Method` — appears in the core surface, so a core `Source` cannot answer a fence importing the server face. G5 is real work. |
| V4 | `database`: lexical `Source` cannot express its public surface, so a TypeScript compiler surface is required | **FALSE.** Re-probed at the scope `database`'s own manifest declares — `["src/core","src/browser","src/server"]`, not the single module the first probe used. `source.surface()` is an **exact bijection** with the documented surface: documented 129, `surface()` 129, **nothing documented missing from `surface()` and nothing in `surface()` undocumented**. `exports()` returns 138, the 9 extra being exactly the internal classes. Lexical `Source` expresses this package's public surface precisely; the compiler surface is not needed for parity. The first probe's "missing drivers" reading was its own scope artifact, now corrected. |
| V5 | `mcp`: `fenceImports` misses mixed `import Default, { named }`, and a slash after a bare `}` swallows the rest of a fence | **Mixed import TRUE**, measured: `fenceImports("import D, { a } from '@x/y'")` returns `[]` while the brace and `import type` forms both resolve. **Slash-after-brace did not reproduce** on the Orchestrator's vector, which returned the import normally — so that half is open, and `mcp`'s exact vector is owed before ruling either way. A failed reproduction is evidence about the vector first. |
| V6 | `html`: the walker must skip `app/browser/main.ts` and `app/server/main.ts` | Untested. Probe whether gates stay green without the skip. |

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

| Package | Workaround | Needed? |
| --- | --- | --- |
| `worker` | `INTERNAL_EXPORTS` denylist over `exports()` | No — `surface()` excludes exactly those |
| `database` | a TypeScript compiler surface via `deriveEntrySurfaces` | No — `surface()` is an exact bijection with its documented surface |
| `middleware` | silence; `MultipartParser` simply sits in `exports()` | No — same |

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

| Shape | Packages |
| --- | --- |
| Direct assignment to `console.*` or `process.std*.write` | **1** — `console` itself |
| Injected fakes instead of touching the process (`createFakeTTY`, `PassThrough`) | 2 — `terminal`, `mcp` |
| Collecting a **child** process's stdout, which is product I/O rather than capture | 2 — `sea`, `mcp` |
| No stream or console capture at all | **36** |
| `vi.spyOn(console\|process)` | **0** |

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

| # | Item | Size | Evidence |
| --- | --- | --- | --- |
| G1 | `extractPatterns` silently drops every fence that is not ```` ```ts ````. Fail loudly on an unrecognized fence language instead. | small | `guide/src/core/helpers.ts:1455`. Latent, not live: across all 41 guides there are 3581 ```` ```ts ````, 102 ```` ```text ````, 82 ```` ```sh ````, and zero ```` ```typescript ````. The first person to write ```` ```typescript ```` loses their fence checks while parity stays green. |
| G2 | `firstCode`'s guide text omits `image`. | one line | `guide/guides/guide.md:88` says it descends `emphasis` and `link`; `helpers.ts:850` also descends `isImageNode`. A parity defect in the parity package. |
| G3 | `fenceImports`' guide table does not name the import forms it excludes. | one line | `guide.md:93`. `mcp` works around the mixed `import Default, { named }` case at `mcp/tests/guides.test.ts:148-162`. |
| G4 | `exports()` carries no barrel attribution, so a package cannot express "declared but not public". | bounded design | `worker` maintains `INTERNAL_EXPORTS` for exactly this — `worker/tests/guides.test.ts:27-31, 99`. Coding law requires `export` on classes deliberately absent from the barrel. |
| G5 | No specifier-to-face resolution. One `Source` cannot answer a fence importing another face of the same package. | bounded design | 38 packages carry a `SELF_SPECIFIERS` allowlist; 17 carry a `SPECIFIER_MODULES` map plus a hand-rolled `exportsFor` cache. `fenceImports` parses imports and has no concept of "self". |
| G6 | **CLOSED — retained on evidence.** `Source` stays lexical. Both cited reasons for exceeding it are falsified: V1 shows `worker`'s denylist works around `surface()`, and V4 shows `surface()` is an exact bijection with `database`'s documented surface at its real manifest scope. No reachable parity defect motivates a parser. Reopen only on a measured case where `surface()` cannot express a package's public surface — a named re-export or `export type {}` form that a package actually ships and that parity therefore misses. Until such a case exists, this is a documented limit rather than a defect, and `.claude/rules/quality.md` says to document the obligation rather than build machinery against a requirement nobody wrote down. | ruled | `Source` sees only column-zero `export …` and `export * from './x.js'` barrels. Named re-exports, `export type {…}` and collisions fall outside the grammar. Root cause of both G4's workaround and `database`'s compiler surface at `database/tests/setupServer.ts:274`. Documented as deliberate at `guide/src/core/types.ts:128-154`. May legitimately end as "retained on evidence". |

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

**S2 — every published README links into `guides/`, which never ships. Ruled: UNVERIFIED, do not act.**

All 41 READMEs carry a relative link into `guides/`, and `files` ships `dist/src` and `README.md`
only. But **npm rewrites relative README links against the `repository` field**, which every package
sets — `emitter` declares `git+https://github.com/orkestrel/emitter.git` and a `homepage`. If that
rewrite happens, the link resolves on the package page and there is no defect at all.

I could not verify it here: `npmjs.com` returns `403` to both the fetcher and `curl` from this
container. Asserting it either way would be a guess, and 41 edits against a guess is the wrong trade.

**This is a five-second browser check for the user:** open
`https://www.npmjs.com/package/@orkestrel/test`, click the `guides/test.md` link in the rendered
README, and see whether it lands on GitHub or 404s. If it 404s, the fix is one absolute URL per
README and it joins the fleet pass. If it resolves, strike the finding.

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

**P2 — `pool`'s README-against-manifest check. Ruled: stays in `pool`.**

The check is sound: it proves the README's stated Node version matches `engines.node` and that its
"ESM and CommonJS builds" claim matches a root export carrying both `import` and `require`. Every
package has both fields, so it would apply anywhere.

It is still **one member**. Copying ~30 lines of hand-rolled narrowing into 41 test files is the
duplication this campaign exists to remove, and promoting it to a shared helper now would add API
with no second consumer, which the creation gate forbids. One member is one member however good the
idea is.

Recorded for the moment a second package wants it. At two the argument changes; at three it ships.

## Track F — the fleet pass, last and once

Gated on `@orkestrel/test` and `@orkestrel/guide` both published.

| # | Item | Evidence |
| --- | --- | --- |
| F1 | Adopt `@orkestrel/test` in all 41: replace the corpus walk, `readText`, and every extracted helper it now ships. | 384 setup-file clusters, topping out at 32 packages for `createRecorder`. |
| F2 | Extract per-package case matrices into each package's own setup file. **1,574 repeated five-line blocks across 36 packages**, counting only blocks repeated three or more times inside one package: `mcp` 208, `database` 200, `scaffold` 121, `workflow` 121, `contract` 111, `middleware` 99, `agent` 93. Worst single blocks are a 42× query-builder condition table in `database`, a 24× intrinsic-probe matrix in `contract`, an 18× `duplexPair` fixture in `websocket`. `tests.md` already rules: data tables and case matrices belong in a setup file at any size. | token-window clone detector over 483 files, 81,102 windows |
| F3 | Republish cascade in catalog layer order for whatever the pass moves. | Read the order from the catalog table `scaffold catalog` regenerates. Never from a second written copy. |

Visit each repository **once**, doing F1 and F2 together. Serialize writers per repository.

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

| Unit | Owns | Engine |
| --- | --- | --- |
| U1 | `src/core/types.ts`, `src/core/helpers.ts`, `src/core/Guide.ts` | Opus `implementer` |
| U2 | `tests/src/core/*.test.ts`, `tests/guides.test.ts` | Sol `implementer` |
| U3 | `guides/guide.md` | Opus `implementer` |
| U4 | each consumer's `tests/guides.test.ts` and pin | folded into Track F, gated on `guide` publishing |

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
