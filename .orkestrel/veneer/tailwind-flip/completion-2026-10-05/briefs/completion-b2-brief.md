# Unit completion-b2 — Nested-aware reader and two TSDoc fixes

## Role and engine

`astra` (implementation) on GPT-6 Astra (`gpt-6-astra`, effort high), reached as the Codex CLI through `.agents/skills/orkestrel-dispatch/scripts/launch.ts` per `.agents/transports/codex.md`. Executor: BENCH_ENGINE. You are the sole writer in your checkout `/home/user/.wave/veneer-containment` (veneer, at `2ba68b9`, after the containment unit and unit B1 landed).

## Objective

Prove with a setup proof whether `scanSheetRules` returns the declarations nested inside a style rule (`CSSNestedDeclarations` under a nested `@media`) with their `@media` context and layer, take the branch the reading names (stopping first if that branch changes `SheetEntry`), and fix two TSDoc blocks: `@param coupled` on `resolveDepartureAnchor` and a `@remarks` sentence on `mapReading`.

## Context

- **Paths.** A path written under `/home/user/veneer/` names the reference checkout at `7e2792b`, which you read but never write. Edit the same relative path under `/home/user/.wave/veneer-containment`.

- **Definition.** `/home/user/scaffold/.orkestrel/veneer/tailwind-flip/completion-2026-10-05/re-triage.md:249-263` (unit B2), restated as checklist item 8 at `/home/user/scaffold/.orkestrel/veneer/tailwind-flip/completion-2026-10-05/checklist.md:150-167`. The checklist confirms the B2 line refs: the `mapReading` TSDoc was at `/home/user/veneer/tests/setupBrowser.ts:284-298`, and the reader `readPartitionRules` was at `:1769`. B2's line numbers were read at `4d21de7`. Locate each symbol again by name. The lines below are as of `7e2792b`.
- **Items this unit closes, and each one's closing condition** (quoted from `/home/user/scaffold/.orkestrel/veneer/tailwind-flip/completion-2026-10-05/open-items.json`, `proposed_disposition` unless marked):
  - flip FV-X14: "move the nested-aware traversal into `/home/user/veneer/tests/setupStyles.ts`, read it from both callers, and add a nested `.container` media control." The checklist refuses its "before the journey tuning unit" timing (checklist.md:165).
  - lanes TW-16 (sweep `lanes-plan`): "1. Add a setup proof in tests/setupStyles.test.ts that runs `scanSheetRules` on `.container { @media (…) { max-width: … } }` and pins whether the `CSSNestedDeclarations` comes back with the `@media` context and the layer. 2. If it does not come back, make `scanSheetRules` descend into `CSSStyleRule`, re-read the counts that other proofs pin (brief-6.md:17), and build `readPartitionRules` on it. 3. If it does come back, record why `readPartitionRules` keeps its own walk (it carries the enclosing selector), or retire that walk." (from its `verify_reason`)
  - units nested-reader: "Add a `scanSheetRules` and `attributeDeparture` case on a fixture such as `.a { @media (min-width: 1px) { color: red } }`, with a flat-rule control, and route the partition's collector through the shared reader." The record also notes that preflight's `::placeholder` rule with a nested `@supports` "is a real witness". The "later item" alternative is refused (checklist.md:166).
  - tree TW-19: "Schedule a one-sentence TSDoc fix before the landing: name the visible-to-auto half and the fail-closed reading. Behavior does not change."
  - tree TW-20 (remark half only): "Add a `@remarks` sentence in the same TSDoc fix as TW-19: the helper maps record rows, not band states, at a 16 px root." Band keying is a later item that this unit does not do (re-triage.md:646-649).
- **Evidence (as of `7e2792b`, read with `git -C /home/user/veneer show 7e2792b:<file> | grep -n <symbol>` and `sed -n`).** Re-locate each line in `/home/user/.wave/veneer-containment` by symbol, because B1 and containment land first.
  - `/home/user/veneer/tests/setupStyles.ts`:
    - `SheetEntry` interface at `:1031-1035` (`rule`, `context`, `layer`; it has no selector field).
    - `scanSheetRules` at `:1288-1322`, with TSDoc at `:1279`. It descends only `if (rule instanceof CSSGroupingRule)` (`:1299`).
    - `collectLayerClasses` at `:1854`. It descends `CSSGroupingRule || CSSStyleRule` (`:1869`).
    - `resolveDepartureAnchor` has its `@param coupled` TSDoc at `:748`. It currently reads "follow CSS Overflow 3 coupling", but the code follows only the visible-to-auto half. A coupled clip-to-hidden departure reads `unattributed` and fails closed (TW-19).
  - `/home/user/veneer/tests/setupBrowser.ts`:
    - The `mapReading` TSDoc is at `:304-320`, and its only `@remarks` covers the dark context. The function is at `:321`, and its `* 16` factor is at `:334`.
    - `readPartitionRules` is at `:1815-1900`, with TSDoc at `:1806`. It keeps its own `PartitionEntry` walk with a `selector`, descends `CSSGroupingRule || CSSStyleRule` (`:1831`), and keeps `CSSNestedDeclarations` (`:1858`, `:1885`). Line 24 imports `SheetEntry` from `setupStyles.js`, and `:2030-2037` reads `SheetEntry` too.
  - Existing proofs:
    - `scanSheetRules` proofs in `/home/user/veneer/tests/setupStyles.test.ts` (`:553`, `:577`, `:759`, `:857-863`, `:951`). The `:861-863` proof pins layer counts (`['foundation','foundation','foundation']`). None of them runs a CSS-nested sheet.
    - `readPartitionRules` nested proofs in `/home/user/veneer/tests/setupBrowser.test.ts` (`:2149-2155` filters `CSSNestedDeclarations`).
  - `vite.config.ts:513-515`: the `setup:browser` project includes exactly `/home/user/veneer/tests/setupBrowser.test.ts` and `/home/user/veneer/tests/setupStyles.test.ts`.
- **Law.** `/home/user/scaffold/AGENTS.md` non-negotiables:
  - no `any`, no `!` or `as`, no ts/lint/format ignore directives;
  - no new package, no mocks, spies, or fake clocks for project-owned behavior;
  - readonly interface properties;
  - finish the work with no stubs;
  - scripts only as Node `.ts`;
  - never claim a gate without reading its bare output.

  Read these with `/home/user/.wave/veneer-containment` as the root, or the scaffold copies: `.claude/rules/tests.md` (owned paths are `tests/**`), `.claude/rules/typescript.md` (TSDoc shape: summary, `@param`, `@returns`, `@remarks`, `@example`), `.claude/rules/names.md`, `.claude/rules/writing.md`. Guide: none is owned. Read `ROADMAP.md` in /home/user/.wave/veneer-containment for context only.
- **Installed primitives.** `@orkestrel/test` ^0.0.24, `@orkestrel/browser` ^0.0.24, and `@orkestrel/contract` ^0.0.19 (veneer `package.json`). Read `@orkestrel/test`'s exports before you add a helper. `requireValue` is already the narrowing helper in both setup files.
- **Host.**
  - Linux. Chromium 141 is at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`. Node (v22.22.2 when verified) runs with type stripping. The working path is `/home/user/.wave/veneer-containment`. Never `cd`; pass `--cwd` or absolute paths.
  - Sandbox: the Codex sandbox per the transport. The network is denied. A nested `git` may report `not a git repository` while your own `git status` works; do not diagnose the checkout. If a sandbox rejects a write, stop and report it. Never try another write mechanism.
- **Host queue.**
  - Run every Chromium or CPU-loading command through the host queue: `flock -w 1800 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/completion-b2-NAME --kind command --cwd /home/user/.wave/veneer-containment -- COMMAND`. Put npm 11 first on PATH inside the command (`env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH ...`).
  - A reused folder exits 65, so give each run a fresh NAME.
  - If `readPartitionRules` changes, run the journey suite as `env CAPTURE=0 ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --configLoader runner --no-cache --reporter=dot --reporter=json --outputFile=FOLDER/report.json` with `--kind journey`. The Orchestrator compares its rows against the J-B1 baselines (`/home/user/veneer/tmp/units/journey-cost/runs/jb1-1`, `/home/user/veneer/tmp/units/journey-cost/runs/jb1-2`; 94 registered, 0 skipped, taken on `96065a7`).
  - No shell, PowerShell, or Python scripts. Write any tooling in Node `.ts`.
  - A suite whose test file fails to import on a Vite dependency optimization reload before any test body runs (`Cannot read properties of undefined (reading 'config')`) gets exactly one re-run. Record both folders.
  - A gate may carry only the failures whose titles are in `/home/user/veneer/tmp/units/journey-cost/host-bound.md` (`setup:browser`: none; `integration`: none).
- **Standing conditions.** The unit runs after the containment unit and unit B1 land, so your base is `2ba68b9`, not `7e2792b`. If a symbol named above is absent or reshaped at `2ba68b9`, stop and report it. Known failing commands: only the host-bound titles. Blocked: network, installs.

## Unknowns

- Whether Chromium 141 returns a `CSSNestedDeclarations` from `scanSheetRules`, and with which context and layer. This decides the branch. The CSSOM `CSSStyleRule` is a `CSSGroupingRule` subclass in recent specs, so `:1299` may already descend. Records disagree on this, and nobody has taken a reading (open-items TW-16, point 6). Report the reading verbatim.
- What `2ba68b9` and the paths of B1 and containment did to the owned regions. Report every symbol's line at `2ba68b9`.
- Whether `attributeDeparture` (named by units nested-reader) attributes a nested declaration. Report what the proof shows. Change it only if it falls inside the branch you take.

## Scope

- **Owned.**
  - `/home/user/veneer/tests/setupStyles.ts`: `SheetEntry`, `scanSheetRules`, the `@param coupled` TSDoc on `resolveDepartureAnchor`, and any shared-walk helper the branch requires.
  - `/home/user/veneer/tests/setupStyles.test.ts`.
  - `/home/user/veneer/tests/setupBrowser.ts`, only in two regions: the `mapReading` TSDoc (formerly `:284-298`, `:304-320` at `7e2792b`) and `readPartitionRules` with its `PartitionEntry` walk (formerly `:1769`, `:1806-1900` at `7e2792b`).
  - `/home/user/veneer/tests/setupBrowser.test.ts`, only for the `readPartitionRules` proofs, and only if the branch rebuilds that reader on the shared walk.
- **Shared (report-only).** Every other region of `/home/user/veneer/tests/setupBrowser.ts`, including the other `SheetEntry` readers at `:2030-2037` (as of `7e2792b`). Return an exact patch if they need to change.
- **Off-limits.** `src/**`, `app/**`, `tests/app/**`, `tests/src/**`, `guides/**`, `ROADMAP.md`, fixtures, `package.json`, the lockfile, configs, and every record under scaffold.
- **Made false by this change.** If `SheetEntry` gains a selector field or `scanSheetRules` returns more entries: every proof that pins `scanSheetRules` counts or layers (bounded by `grep -n "scanSheetRules\|SheetEntry" tests/**/*.ts`), and the `readPartitionRules` proofs. Otherwise: none.
- **Tools and limits.**
  - Read, the exec patch tool, and `git status`/`git diff`.
  - Scoped validation only, through the queue.
  - Forbidden: installs, commits, pushes, credentials, destructive commands (`git reset`, `git checkout --`, `rm -rf`), edits to shared files, and tree-wide mutating gates (`npm run format`, `npm run lint`).

## Execution

Perform the assignment yourself and spawn nothing.
1. Re-locate every symbol at `2ba68b9`.
2. **Nesting proof.** In `/home/user/veneer/tests/setupStyles.test.ts`, add a proof that runs `scanSheetRules` on a constructed sheet: `@layer x { .container { @media (min-width: 40rem) { max-width: 40rem } } }`, plus a flat-rule control (`.container { max-width: 40rem }`). It pins whether the `CSSNestedDeclarations` comes back with context `@media (min-width: 40rem)` and the layer. Add preflight's `::placeholder` rule with its nested `@supports` as the real witness. Read the served recipe sheet as the existing proofs do; do not add a fixture.
3. **Branch point.** Run the proof and record the reading.
   - **Declarations do NOT come back.** The follow-on is: descend into `CSSStyleRule` (as `collectLayerClasses` does), give `SheetEntry` a selector field, re-read the counts that other proofs pin, and build `readPartitionRules` on the shared walk. This branch changes `SheetEntry` and re-reads counts that other proofs pin. Before you take it, STOP and report the reading: the proof and its output, plus the list of proofs and counts it would re-read. Leave the proof in place. Do the TSDoc fixes (step 4) first, so the stop report includes them.
   - **Declarations DO come back.** Pin the reading in the proof. Then either retire `readPartitionRules`' private walk by building it on `scanSheetRules`, or record in the `readPartitionRules` TSDoc `@remarks` why it keeps its own walk (it carries the enclosing selector, which `SheetEntry` lacks). If you retire the walk, `readPartitionRules` changes and the journey suite runs.
4. **TSDoc.**
   - `@param coupled`: name the visible-to-auto half it follows, and state that a clip-to-hidden coupling reads `unattributed` and fails closed. Behavior is unchanged.
   - `mapReading`: add one `@remarks` sentence: it maps record rows, not breakpoint-band states, at a 16 px root.

## Output

Your final message, written to the `--output-last-message` file, contains:
- the branch reading (proof title, sheet, the returned entries' `rule` type, `context`, and `layer`);
- the branch taken, or "stopped at branch point";
- every symbol's line at `2ba68b9`;
- the files changed;
- each gate's command, run folder, and bare result line;
- every deviation and every ancillary choice.

No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) in any of these cases:
- the branch reading says the declarations do not come back (before you change `SheetEntry`);
- a symbol is missing or reshaped at `2ba68b9`;
- a change is needed outside the owned regions;
- a gate fails outside the host-bound titles;
- a sandbox rejects a write;
- a rule conflicts with the definition.

Settle these yourself and record them: proof titles, fixture text, and the wording of the TSDoc sentences inside `.claude/rules/typescript.md` and `writing.md`.

## Acceptance criteria

1. Format over the owned files, through the queue: `./node_modules/.bin/oxfmt --config .oxfmtrc.json --check tests/setupStyles.ts tests/setupStyles.test.ts tests/setupBrowser.ts tests/setupBrowser.test.ts`. If it fails, run it with `--write` on those files only.
2. Lint over the owned files: `./node_modules/.bin/oxlint --config .oxlintrc.json --deny-warnings tests/setupStyles.ts tests/setupStyles.test.ts tests/setupBrowser.ts tests/setupBrowser.test.ts`.
3. Check: `env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm run check`, through the queue.
4. `env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm run test:setup:browser -- tests/setupStyles.test.ts tests/setupBrowser.test.ts` through the queue, all passing, with the new nesting proof among them.
5. `env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm run test:src:tailwindcss` through the queue, passing.
6. `env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm run test:integration` through the queue, passing.
7. The `@param coupled` and `mapReading` TSDoc read as the Objective states. `git diff` shows no behavior change in either function.

**Observations, not criteria.** If `readPartitionRules` changed, run the journey suite in the `--kind journey` form above. Report its folder; the Orchestrator compares its rows against J-B0.

**Measurement.** none. This unit makes no cost claim. If the journey suite runs, the Orchestrator reads the cost.

## Review evidence

Return the actual `git diff`, `git status --porcelain`, and the run folders under `/home/user/veneer/tmp/units/journey-cost/runs/completion-b2-*`.
