# Unit report — U7-fix-b

## Files touched

- `guides/probe.md`
- `src/server/Probe.ts` (TSDoc only)
- `src/server/types.ts` (`OverlayInterface` and `StageInterface` TSDoc only)
- `src/server/helpers.ts` (one TSDoc sentence on `guardStage`, a shared file the brief's Off-limits
  clause names as not off-limits — see Deviations)
- `src/core/constants.ts` (digest only)
- `src/core/helpers.ts` (digest only)
- `tests/src/core/helpers.test.ts` (digest only)
- `tests/src/core/validators.test.ts` (digest only)
- `tests/src/server/ProbeServer.test.ts` (digest only)

## Per edit

1. **The resident sentences.**
   - `guides/probe.md` tagline (line 4-6). Before: "It holds resident TypeScript, Oxlint, and
     Vitest engines, runs a claim's case and its negative control through all of them". After:
     "The type stage runs the workspace's own compiler over a mirror of the tree, and the lint and
     runtime stages hold resident Oxlint and Vitest engines. probe runs a claim's case and its
     negative control through all of them".
   - `src/server/Probe.ts` line 44. Before: "Answers claims through resident TypeScript, Oxlint,
     and Vitest stages." After: "Answers claims through its type, lint, and runtime stages."
   - `src/server/types.ts` `OverlayInterface` remarks (around line 132). Before: "each stage adapts
     one overlay to the host its own tool expects, so a language service, a document protocol, and
     a module resolver read one candidate set through their own adapters rather than through one
     shared filesystem." After: "the lint stage's document protocol and the runtime stage's module
     resolver each read one candidate set through their own adapters rather than through one shared
     filesystem, and the type stage holds no overlay because it writes each draft into its mirror
     as a real file."
   - `src/server/types.ts` `StageInterface` first sentence and remarks (around line 192-201).
     Before: "Inspects one case with a resident workspace tool. ... The `inspect` method awaits
     that one warm operation and reuses the resulting tool across calls. ... a second concurrent
     call reaches the same resident tool and the same overlay, document, mirror, and specification
     state the first is still using." After: "Inspects one case with the workspace's own tool. ...
     The `inspect` method awaits that one warm operation, which builds the resident tool or the
     mirror it reuses across calls. ... a second concurrent call reaches the same resident tool or
     mirror and the same overlay, document, and specification state the first is still using."
   - `guides/probe.md` `StageInterface` Surface row (line 139). Before: "The resident-stage
     contract". After: "The stage contract".
   - `guides/probe.md` `guardStage` helper row (line 221). Before: "Guards one resident-stage
     operation". After: "Guards one stage operation".
   - `guides/probe.md` (lines 846-849). Before: "The type stage lowers nothing either, because the
     compiler answers in that basis too, and the runtime stage lowers a Vitest frame by one because
     that frame numbers from one." After: "The type stage lowers the compiler's one-based line and
     one-based UTF-16 column by one each, and the runtime stage lowers a Vitest frame's line by one
     because that frame numbers from one."
   - `guides/probe.md` (line 1090). Before: "the resident stages against their real tools." After:
     "the stages against their real tools."
   - `guides/probe.md` (line 335). Before: "a test path no project collects, a project the caller
     named and the compiler cannot parse — would arrive as a `claimant` issue". After: "a test path
     no project collects, a `Claim.project` path that escapes the workspace — would arrive as a
     `claimant` issue".
2. **The `Issue` Surface row** (line 42). Before ended: "absent when the tool reported no
   location." After, appended: "The type and runtime stages report a zero-width range at the
   reported point; the lint stage reports the span the language server published." Verified against
   `src/server/helpers.ts:393` (`range: { start: point, end: point }`) and
   `src/server/stages/RuntimeStage.ts:893` (`range: { start: position, end: position }`).
3. **§ Prerequisites** (after the root `tsconfig.json` bullet, before the toolchain bullet). Added:
   "**Every project the warm builds must resolve.** The type stage's warm builds incremental state
   for the root `tsconfig.json` and each `configs/src/tsconfig.<name>.json` and
   `configs/app/tsconfig.<name>.json` present, because every inspection awaits that warm. A project
   the compiler refuses raises `origin: 'workspace'`, `code: 'malformed'` naming the project, for
   every claim whichever project it names." No neighbouring row in this section cites a test file
   by name, so the citation is left out per the brief's fallback.
4. **§ Cost.** Before: "Type stage: the four declared projects warmed together, cold" / "Type
   stage: the same four warmed together again". After: "Type stage: the declared projects warmed
   together, cold" / "Type stage: the declared projects warmed together again". The measurements
   (4.6 s, 2.5 s) are unchanged.
5. **The sweep.** Pattern: `resident|language service|synchronous|program|overlay` (case-sensitive,
   read manually against each hit). Paths: `guides/probe.md`, `src/server/Probe.ts`,
   `src/server/types.ts`, `src/core/types.ts`.
   - `guides/probe.md:6` "resident Oxlint and Vitest engines" — my own edit-1 tagline text, lint and
     runtime only. Permitted.
   - `guides/probe.md:68` `PROBE_SPECIFICATIONS` "resident Vitest service" — runtime stage.
     Permitted.
   - `guides/probe.md:69` `RUNTIME_PLUGIN` value `'orkestrel-runtime-overlay'` — a literal constant
     name, not descriptive prose. Permitted.
   - `guides/probe.md:173-174` `LintStage`/`RuntimeStage` engine-table rows, "A resident Oxlint
     language server" / "A resident Vitest service" — lint and runtime only. Permitted.
   - `guides/probe.md:182-183, 190` the `Overlay`/`RuntimeStage`/`TypeStage` paragraph — already
     states "`TypeStage` holds no overlay: it writes each draft into its mirror as a real file".
     Permitted, no change needed.
   - `guides/probe.md:248` `ProbeInterface.destroy` — "Tears down the resident engines". Rewritten
     to "Tears down every stage" (edit 1 sweep fix, recorded here since not named in edit 1's list).
   - `guides/probe.md:254-255` `StageInterface` method table — "Throws when the resident tool
     cannot start" and "Tears down the resident tool, abandoning...". Rewritten to "Throws when the
     workspace's own tool cannot start" and "Tears down the resident tool or the mirror,
     abandoning...".
   - `guides/probe.md:277` `Overlay.clear` — "Releases every candidate, so the paths this overlay
     held read from disk again." Overlay-specific (lint/runtime). Permitted.
   - `guides/probe.md:340-341` the `Issue.origin` "workspace" paragraph, "the runtime stage can
     install no overlay ... served before the runtime overlay" — runtime-specific. Permitted.
   - `guides/probe.md:453-458` § Prerequisites runtime overlay plugin bullet — runtime-specific.
     Permitted.
   - `guides/probe.md:726-904` "What the runtime overlay serves" section, every `overlay` and
     `resident runner` hit — runtime-specific throughout. Permitted.
   - `guides/probe.md:912-913` Lifecycle intro — "a second process with its own resident engines"
     and "not when the engines warm". Rewritten to "a second process with its own stages" and "not
     when the stages warm".
   - `guides/probe.md:930` Configuration bullet — "cover the configuration a resident tool was
     built around" (generic across all three stages, including the type stage's cached
     `--showConfig` reading). Rewritten to "a stage's own tool".
   - `guides/probe.md:936` same bullet — "Oxlint's language server and the resident Vitest hold
     their own configuration the same way." Lint/runtime-specific. Permitted.
   - `guides/probe.md:939-965` Freshness/Revisions bullets — "resident Vitest", "resident runner" —
     runtime-specific. Permitted.
   - `guides/probe.md:953` "cannot fire while a synchronous loop blocks that worker" — describes a
     blocking loop generally, not the type stage's tool nature. Permitted.
   - `guides/probe.md:970` Teardown bullet — "`destroy()` releases every resident process" — reads
     as the OS processes the coordinator holds (including the compiler child the type stage
     spawns), not an in-process resident engine claim. Left as is; recorded as a judgment call.
   - `guides/probe.md:992` Stage-teardown bullet — "Every resident stage abandons the inspections it
     holds" — this generalizes over all three stages including the type stage, which the same
     bullet later says "holds no bound and needs none for its own tools". Rewritten to "Every stage
     abandons the inspections it holds".
   - `guides/probe.md:1074, 1087` § Cost and § Tests — "resident Vitest runner", "without a resident
     tool" — runtime-specific and a negative claim (no tool needed) respectively. Permitted.
   - `src/server/Probe.ts:84` constructor TSDoc — "starts warming the resident stages". Rewritten to
     "starts warming every stage" (within the TSDoc-only scope this unit owns for this file).
   - `src/server/Probe.ts:300` — `Control.reason` string "the imported type changed after the
     resident type host cached it" inside `#arm`'s method body. Not TSDoc, so outside this unit's
     `src/server/Probe.ts (TSDoc only)` scope. Left unchanged; recorded under Deviations.
   - `src/server/Probe.ts:310` — sibling reason string "the imported dependency changed after the
     resident runtime cached it" — runtime-specific and accurate regardless. Permitted, and also
     outside TSDoc scope.
   - `src/server/Probe.ts:498` — a `//` line comment, "A resident server whose type, lint, or
     runtime stage stays destroyed". Not TSDoc, outside scope. Left unchanged; recorded under
     Deviations.
   - `src/server/types.ts:43` `InspectionOptions.signal` — "Aborts the inspection's wait for the
     resident tool's answer." `InspectionOptions` is read only by the lint stage per this page's own
     Surface table, so "resident tool" names the lint stage's language server here. Permitted, and
     also outside the `OverlayInterface`/`StageInterface`-only scope for this file regardless.
   - `src/server/types.ts:135-149, 154-170` `OverlayInterface` body — every `overlay`/`resident`
     hit here is either my edit-1 rewrite or the existing accurate "resident tool that caches by
     version" sentence describing the general overlay-consuming tool. Permitted.
   - `src/server/types.ts:213-248` `StageInterface` body — "Names the inspection this resident
     stage performs" and the `inspect`/`destroy` throws/returns lines generalized "resident tool"
     across all three stages. Rewritten: "Names the inspection this stage performs.";
     "@throws When the workspace's own tool cannot start..."; "Tears down the resident tool or the
     mirror and releases its resources."; "Teardown is bounded whatever the stage's own tool
     does..."; "@returns A promise that settles after the resident tool or the mirror releases its
     resources".
   - `src/server/types.ts:315` `LintStageInterface.inspect` — "when the resident language server
     cannot start" — lint-specific. Permitted, and also outside the owned-interface scope for this
     file.
   - `src/server/types.ts:346-347, 383` `ProbeServerInterface` — "leaves the resident engines
     running... holds its resident tools for nobody" and "releases its resident engines". These
     generalize across all three stages including the type stage. I drafted a fix (`the stages`)
     and reverted it: `ProbeServerInterface` is outside this unit's `types.ts` scope, which names
     only `OverlayInterface` and `StageInterface`. Left unchanged; recorded under Deviations.
   - `src/core/types.ts:377` "the only way a synchronous infinite loop is ever reported" — describes
     a runtime hang, unrelated to the type/lint/runtime stage distinction. Permitted.
   - `src/core/types.ts:408` "One runtime inspection in every 64 also pays the resident runner's
     replacement" — runtime-specific. Permitted.
   - `src/core/types.ts:460` `ProbeInterface.prove` remarks — "the refusal answers before the
     resident stages are awaited" — generalizes across all three stages. Would need rewriting to
     "before the stages are awaited", but `src/core/types.ts` is not named in this unit's Owned
     list at all. Left unchanged; recorded under Deviations.
   - `src/core/types.ts:476, 478` `ProbeInterface.destroy` — "Tears down the resident engines...
     after every engine has released". Same file-ownership gap as the preceding item. Left
     unchanged; recorded under Deviations.
6. **One digest per project.** Replaced every `3b674fdf121c85efb9ed1bab25ceeec8` with
   `d61f11b52460b1c6707cfac2c6078d59` in `src/core/constants.ts` (2 occurrences),
   `src/core/helpers.ts` (2 occurrences), `tests/src/core/helpers.test.ts` (8 occurrences),
   `tests/src/core/validators.test.ts` (3 occurrences), and `tests/src/server/ProbeServer.test.ts`
   (1 occurrence), through a scoped `sed` substitution touching only that literal. Confirmed
   `guides/probe.md`'s flagship-claim receipt already carried `d61f11b52460b1c6707cfac2c6078d59`
   before this unit ran (`u7-fix-a` or an earlier pass had already updated the guide), so the guide
   needed no change here.

## The unknown answered

Ran `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides` after every
edit: `Test Files 1 passed (1)`, `Tests 13 passed (13)`, duration 15.14 s. No fence reddened.

## Acceptance criteria

1. PASS — `npx oxfmt --config .oxfmtrc.json --check <each owned file>` exits 0. `guides/probe.md`
   required one in-place `oxfmt` run first (it realigned pipe padding across every affected table,
   the same class of change `u7-fix-a`'s report describes); diffed against the pre-edit copy and
   confirmed only `|`-delimited table lines and one method-table row moved, no prose changed
   (`diff /tmp/probe-before.md guides/probe.md | grep -v '^[<>] |' | grep -v '^---$' | grep -v
   '^[0-9]'` printed nothing).
2. PASS — `npx oxlint --config .oxlintrc.json --deny-warnings <each owned source or test file>`
   exits 0.
3. PASS — `grep -rn "resident TypeScript\|resident-stage\|3b674fdf121c85efb9ed1bab25ceeec8" src
   tests guides` prints nothing.
4. PASS — `grep -n "the four declared\|the same four" guides/probe.md` prints nothing.
5. PASS — `npx tsc --noEmit --project tsconfig.json` exits 0.
6. PASS — `helpers.test.ts` + `validators.test.ts` (`--project src:core`): `Tests 26 passed (26)`;
   `ProbeServer.test.ts` (`--project src:server`): `Tests 10 passed (10)`, 91.48 s; `guides` project:
   `Tests 13 passed (13)`, 15.14 s.

## Deviations

Four sentences the sweep found sit outside this unit's file or region scope and were left
unrewritten rather than edited:

- `src/server/Probe.ts:300` (`Control.reason` string) and `:498` (a `//` comment) — both name
  "resident" in a way that could be tightened, but `src/server/Probe.ts` is scoped "TSDoc only" and
  neither is a TSDoc comment.
- `src/server/types.ts:346-347, 383` (`ProbeServerInterface`) — generalizes "resident engines"
  across all three stages, but this file is scoped to `OverlayInterface` and `StageInterface` TSDoc
  only; `ProbeServerInterface` is neither.
- `src/core/types.ts:460, 476, 478` (`ProbeInterface.prove`/`destroy` remarks) — same class of
  generalization, but `src/core/types.ts` is not in this unit's Owned list at all.

One shared file outside the Owned list was edited: `src/server/helpers.ts`'s `guardStage` TSDoc
carried the same "resident-stage" text acceptance criterion 3 forbids repository-wide, and the
brief's Off-limits clause names `src/server/helpers.ts` as one of "the shared ones" excepted from
`u7-fix-a`'s off-limits set rather than as owned-and-editable by name. Reading that exception as
license to make this one-sentence fix — the same fix already applied to the guide's `guardStage`
row under edit 1 — was necessary to satisfy criterion 3; without it the sweep left a hit no in-scope
file could close.
