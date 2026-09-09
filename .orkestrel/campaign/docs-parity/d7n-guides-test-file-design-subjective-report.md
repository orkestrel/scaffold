I read the brief at `tmp/claude/d7n-guides-test-file-design-brief.md`, `AGENTS.md`, `.agents/orchestration.md`, the names, TypeScript, architecture, patterns, tests, workspace, portability, documentation, writing and quality rules, and the evidence it named: `tests/guides.test.ts`, the rejected `scripts/guides.ts`, the measured entry probe and its fixture, `src/core/constants.ts`, `src/core/compilers.ts`, `vite.config.ts`, `package.json`, `configs/policy.ts`, the installed `@orkestrel/guide` declarations, `guides/scaffold.md`, and the existing driven-command controls in `tests/src/core/compilers.test.ts`.

**Lane held: subjective (planner, Opus).** `Constraints`, `Refusals`, and `Measurements` belong to the objective lane and are left empty.

# Design

## The shape

`tests/guides.test.ts` becomes one file with one role per host process, selected by the host it is running in, not by an option:

```
imports            node builtins and @orkestrel/guide only
constants          USAGE, INVENTORY, INDEX_FILE, README_FILE, FENCE_LANGUAGES, EXAMPLE_LANGUAGE
Row                one indexed guide with the readers over it
module functions   the readers, the writers, the formatters, runEntry
if (process.env.VITEST !== 'true') await runEntry(process.argv.slice(2))
else { dynamic imports; every describe and it }
```

`package.json` carries `"test:guides": "node --experimental-strip-types tests/guides.test.ts"`. No second file names the mechanism, and nothing forwards to anything.

The measured probe (`tmp/pass/test-entry-probe`) is the proof this boundary exists: exit 0, chunk 173f72, worker branch reached, alias resolved inside the worker. My design keeps its structure and drops its `provide` plumbing, for the reason under Direction.

## Why the branch is the guard

`process.env.VITEST === 'true'` is not a flag the design invented; it is the fact that separates the host that owns the repository from the host that owns a test run. The write path lives on the branch a Vitest worker can never take. That makes "an ordinary Vitest invocation never writes" a structural property of the file rather than a value check somebody has to keep correct — no inherited CLI argument, no ambient direction state, and no injected value can reach a write, because the writing code is on the other side of a branch the runner does not enter.

## Direction, and what each host does

`runEntry` takes the argument list and rules on it before it reads anything:

| Command | Entry does | Worker does |
| --- | --- | --- |
| `npm run test:guides` | launches the parity project | reads the tree, asserts every case |
| `npm run test:guides -- --to guide` | rewrites the guide side, prints what it wrote and what it could not, launches | asserts against the bytes the entry left |
| `npm run test:guides -- --to source` | rewrites the source side, same reporting, launches | asserts against the bytes the entry left |
| anything else | prints one usage line, exits 2, reads and writes nothing | never starts |
| `vitest run --project guides` | never runs | asserts every case |

The default command reads nothing and reports nothing of its own. The report a developer sees is the gate's own failure output, which already carries the exact line shape the rejected entry printed: `${spec} ${key}: guide ${left} source ${right}`. That is the design's central simplification. The entry stops duplicating a report the assertion already produces, and speaks only about what it changed.

The worker is direction-blind. It runs the same assertions whatever the entry did, because the entry finished writing before the worker started, so "the assertions evaluate fresh post-write bytes" needs no mechanism at all — it is what a new process reading the disk does. `provide`, `inject`, and the `ProvidedContext` declaration all leave the design.

## What the entry says when it writes

Under a direction, the entry prints in this order: `wrote <path>` per changed file in sorted order; one line per disagreement the write left standing, carrying the drift line plus the reason; then `next: npm run format`. Exit rises to 1 when the launched project does not pass, to 2 for an invalid option or a missing index or indexed spec. `raiseExit` keeps a failure from being lowered.

The reasons are the entry's, because the entry attempted the rewrite. The failure is the gate's, because the gate owns the equality claim. A reader gets the explanation and the failure in one terminal output without either host guessing at the other's state.

## The example rewrite

`--to guide` now rewrites a matched titled fence, through `replaceFence(guide, title, example)`, which the installed package already exports for exactly this. `splitExample` turns the compared text back into the block shape the replacer takes. The two directions become symmetric: each carries summaries and titled examples to its own side, and each reports what it could not reach.

`writeGuide` rules per disagreement: a compared cell key takes `replaceCell`; a titled example key takes `replaceFence`; an authority side carrying no text is reported; a replacer returning `undefined` is reported with what refused it. `writeSource` keeps its existing ladder unchanged.

The README pitch stays outside every write. It is not a compared key, so `findDrift` never emits it and no writer can reach it. The worker's existing pitch case keeps it honest. This preserves the manual boundary the brief protects without a special case anywhere in the writers.

## Root resolution

Both hosts resolve the workspace root from `import.meta.url`, the way the current test file already does and explains. The rejected entry read `process.cwd()`. Anchoring to the module removes a dependency on where the command was started, and it makes the driven-command control's working directory irrelevant to what the entry reads.

## Declaration placement

Module-scope constants, the `Row` interface, and the module functions stay in the file, unexported. `POLICY_PLACEMENT_GLOBS` covers `app/**` and `src/**`, so the plugin does not read this file, and `.claude/rules/architecture.md` § Declaration placement permits non-exported module-scope declarations in a runtime entry that cannot import siblings. This file cannot: under plain Node, `./setupServer.js`, `@src/core`, and `@orkestrel/test` do not resolve. The header comment carries that reason, retargeted from the rejected entry's header, which already stated it correctly for the wrong file.

`Row` is `{ entry, guide, source }` — the concept index row and the readers over it. One shape serves both hosts, and the worker's existing destructuring of `{ entry, guide, source }` survives the rename of `inspected` to `rows` untouched. The writers derive drift, titles, cells, and the file index per row rather than carrying them as fields, which drops four fields from the rejected `Row` and keeps the interface a statement about the index rather than about the write.

## Naming rulings

- `direction` names the axis the option varies; its values are the owner's `guide` and `source`; absence is `undefined`.
- `matchesPassed(result)` replaces `passedGuides`. It is a predicate over a foreign Vitest value, and `matches*` is the predicate prefix `.claude/rules/names.md` fixes. The old name also read as though the file were checking a sibling, which it no longer is.
- `readInventory`, `buildRows`, `buildIndex`, `collectCells`, `collectMissing`, `splitExample`, `findExample`, `writeGuide`, `writeSource`, `flushTexts`, `formatDrift`, `formatSide`, `formatReported`, `recordReason`, `buildReasonKey`, `raiseExit`, `formatError`, `runGuides` carry over unchanged. Each already follows `{verb}{Noun}` with one project-wide meaning.
- `readShortName`, `formatPitch`, `reportPitch`, `reportRows`, `MANIFEST_FILE`, and `PITCH_KEY` leave. Their subject was the entry's own report, and the gate owns that report now.

## Per-claim rulings

**G1.** The npm commands belong to the test file. `test:guides` names `tests/guides.test.ts`. The boundary is `process.env.VITEST`: the entry is the branch a Vitest worker cannot take, and the worker is the branch a bare `node` run cannot take. `runGuides` launches `createVitest('test', { root, config, project: ['guides'], cache: false, watch: false, reporters: ['dot'] })`, reads the result through `matchesPassed`, and closes the runner in a `finally` whatever the start threw. The file's outermost `try` prints an unknown thrown value through `formatError` to stderr and raises exit 1, so a throw before the runner exists still reports. `npm test` and a bare `vitest run --project guides` are non-mutating by construction.

**G2.** A direction selects only the target side of a matched pair. Matched means the authority side carries text and the target location exists — a compared `Summary` cell, or a fence under the heading of the shared title. Everything else is reported with the reason: the authority side carries no text, no compared cell or fence carries the key, no doc block carries the key, or the replacer refused the rewrite. The worker then asserts on the bytes on disk, which the entry wrote before the worker existed. The pitch is unreachable by any write and stays a reported failure.

**G3.** The installed `@orkestrel/guide` surface suffices. Value imports at module scope: `collectExamples`, `collectKeys`, `collectTitles`, `computeSymbolKey`, `createGuide`, `createSource`, `extractFenceImports`, `extractSourceLines`, `findDrift`, `findMissing`, `findMissingSymbols`, `findUnlisted`, `isExternalLink`, `locateComment`, `METHODS`, `normalizeComment`, `parseManifest`, `replaceCell`, `replaceExample`, `replaceFence`, `replaceSummary`, `resolveLink`, `selectModuleKeys`, `spliceSpan`, `SURFACE`, `TESTS`; plus `globSync`, `readFileSync`, `writeFileSync` from `node:fs`, `dirname`, `join`, `resolve` from `node:path`, `process` from `node:process`, `fileURLToPath` from `node:url`. Deferred into the worker branch: `vitest`, `@src/core`, `@orkestrel/contract`, `@orkestrel/test`, `@orkestrel/test/server`, `vite`, `../src/bin/helpers.js`, `../src/bin/CLI.js`, `./setupServer.js`. No parser is added, no Guide API is proposed, no dependency is added, and `src/core` gains no filesystem import.

**G4.** `GUIDES_ENTRY_PATH` and its `HOST_PATHS` row go, `scripts/guides.ts` is deleted, and `blueprintToScripts` emits the command from `GUIDES_TEST_PATH`. `RETIRED_HOST_PATHS` stays exactly `['scripts/docs.ts']` and the `Materializer` retirement walk is untouched. `HOST_PATHS` keeps the session-start hooks, so scaffold still claims named files under `scripts/` and never the directory. `tests/guides.test.ts` is package-owned and joins no vendored list, so host repair cannot overwrite a package's own cases. The `accepted` predecessor list for `test:guides` keeps the plain Vitest command it already accepts and gains the retired `node --experimental-strip-types scripts/guides.ts` command, so a target that already received the vendored entry accepts the replacement without reporting a customized script.

**G5.** The change is bounded and its seams are enumerable: the test file, the deleted entry, the constant and its `HOST_PATHS` row, the script compiler and its `@example`, the guide prose at the Surface row and the parity section, the regenerated `host.json`, and the tests that read each of those. The driven-command controls in `tests/src/core/compilers.test.ts` are re-pointed rather than rewritten; the smallest new controls are named under Units.

## What the driven-command control becomes

`buildSeedWorkspace` writes the real file's bytes into the scratch tree today, and that is what makes the control a proof rather than a rehearsal. It keeps doing so, at `tests/guides.test.ts`, with one correction: the seeded `vite.config.ts` points its `guides` project at a seeded stand-in module, so the launched run collects the stand-in rather than re-entering the real file's worker branch, whose package-owned imports a widget workspace cannot resolve. Every existing stand-in — passing, failing, fresh-read, startup marker, unhandled error — survives verbatim, and the seam they cover is unchanged: the entry launches the project and carries its result.

The self-launch that the stand-in cannot cover is covered where it actually happens. The measured probe promotes into the same control block as a seeded workspace whose project includes its own two-branch file, asserting the worker branch ran and wrote nothing. Its negative control is the same seed driven by a bare `vitest run`, which must reach the worker branch and leave the tree untouched.

Two existing cases lose their subject when `readShortName` leaves: the nameless manifest and the unowned index. Their coverage moves to the worker's pitch case, which already reads this package's own guide by name. That is recorded under Tensions rather than absorbed.

# Alternatives

**Direction reaches the worker through `provide` and `inject`, and the worker writes in a `beforeAll`.** This is what the probe measured, so it carries the least new risk. It loses on three counts. The write moves inside the runner, so a test file mutates the repository it is asserting on. The "no ordinary invocation writes" property becomes a value check — `inject` returning `undefined` — rather than an unreachable branch, and a value check is one refactor away from being wrong. And the fresh-bytes requirement forces the module-scope inventory read into a hook, reordering state every case reads. The recommended design gets fresh bytes from process ordering and needs no hook. Keep `provide` in reserve only if the entry must hand the worker something it cannot recompute; nothing in this scope does.

**`test:guides` stays a plain `vitest run --project guides`, and the direction arrives as an environment variable.** This is the smallest diff and it keeps one host. It is refuted by measurement rather than by taste: the brief records that a raw `--to` is rejected by the normal Vitest CLI before collection, so `npm run test:guides -- --to guide` cannot reach the runner at all. Working around that with `GUIDES_TO=guide npm run test:guides` fails the owner's stated commands and puts writes back inside the runner, which is the objection to the preceding alternative in a worse form — ambient environment state, reachable by any invocation that happens to inherit it.

# Constraints

*Objective lane. Not filled by this lane.*

# Refusals

*Objective lane. Not filled by this lane.*

# Measurements

*Objective lane. Not filled by this lane. The readings this design needs and the dispatch did not supply are named under Tensions.*

# Units

Routing ledger. One writer per checkout, serialized in the stated order.

**U1 — Settle type-only erasure.** Orchestrator-owned probe, no engine dispatched.
Owns `tmp/pass/test-entry-probe/` only. Adds `import type { Missing } from '@no/such/package'` to the probe fixture and re-runs the measured command. Acceptance: exit 0 with the worker assertion still passing, or a resolution error naming the specifier. Retention: the command and its output beside the existing chunk record. Blocks U2, because a failure moves every non-resolvable type import into the worker branch and changes the file's head.

**U2 — The test file and the entry.** Role `implementer`, engine Opus. Judgment-bearing: API shape, branch structure, naming, and the file's own explanatory comments.
Owns `tests/guides.test.ts`, deletes `scripts/guides.ts`, owns the `describe('the guides entry')` block and its seed constants in `tests/src/core/compilers.test.ts`, and owns `package.json`'s `test:guides` row.
Off-limits: `src/**`, `guides/**`, `host.json`, and every path `scaffold repair` restores — `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `configs/helpers.ts`, `configs/policy.ts`.
Depends on U1.
Acceptance, cheap-first:
1. `npx oxfmt --config .oxfmtrc.json --check tests/guides.test.ts tests/src/core/compilers.test.ts` reports clean.
2. `npm run lint:check` reports no new diagnostic over the owned files.
3. `npm run check` passes.
4. `node --experimental-strip-types tests/guides.test.ts --to sideways` prints one usage line and exits 2, and `git status --porcelain` reports no change from that run.
5. `npm run test:guides` exits 0 and writes nothing, proven by `git status --porcelain` before and after.
6. `npm run test:src:core` passes, including the re-pointed driven-command controls and the promoted self-launch control with its bare-`vitest` negative control.
Observations the unit reports rather than gates on: whole-suite timing, and the elapsed time of `npm run test:guides` against its current reading.

**U3 — Constant, compiler, propagation, and prose.** Role `sol`, engine Sol; on a recorded dark bench, role `implementer`, engine Opus, with the substitution named in the plan. Constraint-heavy and mechanical-precision work.
Owns `src/core/constants.ts`, `src/core/compilers.ts`, `guides/scaffold.md`, `host.json`, `tests/src/core/helpers.test.ts`, `tests/src/server/helpers.test.ts`, `tests/distribution.test.ts`, and the script-row cases in `tests/src/core/compilers.test.ts`.
Shared with U2: `tests/src/core/compilers.test.ts`, report-only for U2's block. U3 runs second.
Off-limits: `tests/guides.test.ts`, and the `scaffold repair` paths named in U2.
Depends on U2.
Acceptance, cheap-first:
1. `rg -n "GUIDES_ENTRY_PATH|scripts/guides.ts" --glob '!node_modules'` returns nothing outside the campaign folder.
2. `npm run check` passes.
3. `npm run build` then `npm run build:inventory` regenerates `host.json`, and the regenerated file names no `scripts/guides.ts` storage or destination.
4. `npm run test:src:core` and `npm run test:src:server` pass.
5. `npm run test:guides` passes, which is where the removed `GUIDES_ENTRY_PATH` Surface row and the rewritten `blueprintToHostArtifacts` example prove their parity.
6. `RETIRED_HOST_PATHS` still equals `['scripts/docs.ts']` and the `Materializer` retirement walk is byte-unchanged.

**U4 — Mechanical conformance evidence.** Role `grok`, engine Cursor Grok; step past to `checker` only on a recorded dark bench.
Reads only. Reports: every `HOST_PATHS` membership row against its tests, every `guides/scaffold.md` claim about the entry against the file that landed, the regenerated `host.json` against `HOST_PATHS`, and every path the change made false that neither U2's nor U3's scope named.
Depends on U3. Runs beside U5.

**U5 — Adversarial audit.** Roles `analyst` on Sol and `reviewer` on Opus, blind, clean contexts, on one brief stating G1 through G5 as numbered falsifiable claims with per-claim verdicts. At least one lane runs on an engine that did not write the unit; where U3 ran on Opus by substitution, `analyst` is the lane that did not write it, and a dark Sol bench means the substitution is recorded and both lanes run on Opus in separate clean contexts.
Depends on U3.

**U6 — Gate evidence.** Role `verifier`, engine Sonnet. Runs `format:check`, `lint:check`, `check`, `build`, `test` in order and reports exit codes and counts. The owner's allowance to reuse recorded root gates is the Orchestrator's to apply; this unit exists because U2 and U3 move what those gates read.

Exit criterion: the entry lives in the test file with the owner's commands behaving as tabled; the guide side and the source side each rewrite matched summaries and titled examples; the launcher's ownership is gone from the constant, the compiler, the vendored list, the inventory, and the prose; the retirement safeguards are unchanged; the driven-command controls cover the entry and the self-launch; the gates are green.

# Tensions

These are my lane's judgment calls. Each is named for the other lane to challenge.

1. **The entry stops reporting drift on the default path.** I ruled that the gate's own failure output is the report, so `npm run test:guides` with no option reads nothing in the parent and prints nothing of its own. This deletes `reportRows` from the default path and changes what a developer sees: a Vitest failure listing the disagreements rather than plain stdout lines followed by a Vitest run. The objective lane must rule on whether any consumer — a control, a guide sentence, a fleet script — depends on those lines arriving on stdout before the runner starts.
2. **`readShortName` and the pitch reporting leave the design.** The pitch is asserted by the worker against this package's own guide by name, so the entry never computes it. This removes the nameless-manifest and unowned-index controls, whose subject was `readShortName`. I claim the coverage moves rather than disappears; the objective lane must confirm no other behaviour reads that function.
3. **The worker is direction-blind, so `provide` and `inject` leave.** The measured probe used them. I am dropping measured machinery on a design argument, which is the kind of trade the objective lane exists to refuse.
4. **The seeded control's project points at a stand-in module rather than at the seeded file itself.** This keeps every existing entry-behaviour control alive but means the scratch control does not exercise self-launch; the promoted probe control covers that seam separately. The objective lane must rule on whether that split leaves a gap between them.
5. **No retirement metadata for `scripts/guides.ts`.** The brief forecloses it, and I follow it. The reading that would settle it is named under Risks.
6. **`matchesPassed` over `passedGuides`.** A naming call with no behavioural consequence, recorded so it is not mistaken for an accident.

Readings this design needs that the dispatch did not supply, each with the command that settles it:

- Whether `--experimental-strip-types` erases an `import type` whose specifier Node cannot resolve. `node --experimental-strip-types tmp/pass/test-entry-probe/tests/guides.test.ts --to guide` after adding that import to the fixture. U1 owns it, and it gates the file's head.
- Whether `createVitest` sets `process.env.VITEST` in the launching process. Read it in the entry after the call in the same probe. Low consequence in this design, because nothing re-reads the variable after the branch; it matters if the objective lane prefers a value-checked guard.
- The elapsed time of `npm run test:guides` before and after, measured in this checkout. The default path drops an inventory read and a second post-write read, so the reading is expected to fall; nothing in the design depends on that.
- Whether the published `0.0.64` tarball ships `dist/host/scripts/guides.ts`. `npm view @orkestrel/scaffold@0.0.64 dist.tarball` and an inspection of the packed file list.

# Risks

- **The worker branch's package-owned imports make the real file unloadable in a scratch workspace.** This is the design's largest fit risk: it is why the seeded control points its project at a stand-in. Evidence that settles it: run `buildSeedWorkspace` with the real bytes and a seeded project including that same path, and read the resolution error the launched run reports. If that error is clean and containable, the stand-in split can be revisited in a successor scope; do not revisit it inside this one.
- **Nested Vitest under `npm test`.** `test` already invokes `test:guides`, which already launched a Vitest instance from a Node process. The nesting depth is unchanged, but the launching process is now a test file rather than a script, and a runner that treats a file under a project's include as reentrant could behave differently. Evidence: `npm test` green with the guides count matching the direct `npm run test:guides` count.
- **The `--to guide` fence rewrite reaches a fence the author owns.** `replaceFence` pairs only on a title present on both sides and rewrites the first fence of that title, which the installed declaration states. A guide carrying an untitled illustrative fence beside a titled one is untouched. Evidence: the re-pointed `--to guide` control compares the whole seeded guide, so a disturbed heading, a dropped row, or a second fence of the same title reports there.
- **The retired command is not in the `accepted` list, so a target that received the vendored entry reports a customized script.** Evidence: the manifest-region case in `tests/src/bin/CLI.test.ts` driven with the retired command as the declared value; it must report writable rather than customized. U3 owns the row.
- **A stale `host.json`.** The inventory is generated from a build, so a unit that edits `HOST_PATHS` without rebuilding leaves the digest describing a file set the package no longer ships. U3's acceptance orders the regeneration before every gate that reads it; the risk is that a later fix unit skips that order.
