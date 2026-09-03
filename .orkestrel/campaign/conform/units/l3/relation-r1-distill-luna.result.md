## Question
For every `unit conform-relation` row, map the current tree, its diff, old-form sweeps, report readings, and available proofs.

## Evidence

### relation-obj-1

- **Site now:** `src/core/validators.ts:29` exports `isRelationDescriptor`; surrounding lines `28` (`*/`) and `30` (`if (!isRecord(value)) return false`). The guard checks the relationship union at `src/core/validators.ts:31-39` and string members at `src/core/validators.ts:41-44`.
- **Diff at the site:** `conform-relation.diff:750` — `@@ -1,14 +1,45 @@`. The operative repair is present in `+` lines, including `+ if (!isRecord(value)) return false`, the union checks, and `+ if (member in value && !isString(value[member])) return false`.
- **Old form sweep:** Pattern `\bRelationProps\b`, paths `src/**/*.ts`, `tests/**/*.ts`, `guides/relation.md`, `guides/README.md`, `README.md`: no hit. No removed or renamed symbol applies otherwise.
- **Report reading:** The report gives `applied`: “`isRelationDescriptor` checks each declared member's type; the union check sits inside it, no new export” (`conform-relation-report.md:9`). The current guard carries that behavior at `src/core/validators.ts:29-44`: **matches: yes**.
- **Proof reading:** `npm --prefix /home/user/fleet/relation run test:src:core`; red: `5 failed | 58 passed (63)` in `relation-obj-1-red.txt`; green: `65 passed (65)` in `relation-obj-1-obj-2-green.txt`. Both controls exist and report matching `Tests` summaries.

### relation-obj-2

- **Site now:** The former `#index` and `#group` sites at `Model.ts:490` are absent. Calls use `indexRows` at `src/core/Model.ts:378` and `:464`, and `groupRows` at `:403` and `:502`. Each has surrounding loader statements on the preceding and following lines. Definitions are at `src/core/helpers.ts:220` and `:245`, with `// === Row projection` at `:153`.
- **Diff at the site:** Call hunks are `conform-relation.diff:371` — `@@ -344,7 +375,7 @@`, `:380` — `@@ -369,7 +400,7 @@`, `:389` — `@@ -430,7 +461,7 @@`, and `:398` — `@@ -468,7 +499,7 @@`. The deletion hunk is `:407` — `@@ -485,23 +516,4 @@`; the helper bodies appear in `src/core/helpers.ts` under `@@ -198,6 +198,64 @@` at `conform-relation.diff:534`. The operative text is present in those `+` lines.
- **Old form sweep:** Exact patterns `#index|#group` and case-insensitive identifier inflections over `#index`, `#group`; paths `src/**/*.ts`, `tests/**/*.ts`, `guides/relation.md`, `guides/README.md`, `README.md`: no old-form hit. New `indexRows` and `groupRows` occurrences are retained names, not old forms.
- **Report reading:** The report gives `applied`: “`#index` / `#group` extracted as `indexRows` / `groupRows` in `helpers.ts`, with TSDoc, guide rows, and tests” (`conform-relation-report.md:10`). The current calls and exported helpers carry that change: **matches: yes**.
- **Proof reading:** `npm --prefix /home/user/fleet/relation run test:src:core`; red: `5 failed | 50 passed (55)` in `relation-obj-2-red.txt`; green: `65 passed (65)` in `relation-obj-2-green` as named by the report, physically recorded in `relation-obj-1-obj-2-green.txt`. The green control exists and matches the report.

### relation-obj-3

- **Site now:** The former name-resolution-only block at `tests/guides.test.ts:113` is supplemented by `describe('executable guide fences')` at `tests/guides.test.ts:189`, with the surrounding comment at `:187-188` and first test at `:190`.
- **Diff at the site:** `conform-relation.diff:846` — `@@ -168,3 +181,68 @@`. The `+describe('executable guide fences', ...)` block and six executable assertions are present.
- **Old form sweep:** No removed or renamed name applies; no old-form pattern was required.
- **Report reading:** The report gives `applied`: “`describe('executable guide fences')` transcribes every value-claiming fence, after the manifest loop” (`conform-relation-report.md:11`). The block is outside the manifest loop at `tests/guides.test.ts:189`: **matches: yes**.
- **Proof reading:** `npm --prefix /home/user/fleet/relation run test:guides`; red: `6 failed | 23 passed (29)` in `relation-obj-3-red.txt`; green: `29 passed (29)` in `relation-obj-3-green.txt`. Both controls exist and match.

### relation-obj-4

- **Site now:** `README.md:22` reads `- Node.js >= 22.12.0, matching the \`engines\` field in \`package.json\``. Context is `README.md:21` (`## Requirements`) and `:23` (the module-format requirement). The manifest still declares `>=22.12.0` at `package.json:93`.
- **Diff at the site:** `conform-relation.diff:14` — `@@ -19,8 +19,8 @@`. The exact replacement text is present at `conform-relation.diff:20`.
- **Old form sweep:** Pattern `Node.js >= 24`, case-insensitive; paths `src/**/*.ts`, `tests/**/*.ts`, `guides/relation.md`, `guides/README.md`, `README.md`: no hit.
- **Report reading:** The report gives `applied`: “`README.md` states the runtime floor `package.json` declares” (`conform-relation-report.md:12`). The cited README line now matches `package.json:93`: **matches: yes**.
- **Proof reading:** Placement/documentation row. Sweep agrees: no `Node.js >= 24` hit.

### relation-obj-5

- **Site now:** `README.md:23` reads `- ESM (\`import\`) and CommonJS (\`require\`) through the \`exports\` field`. Context is `README.md:22` with the runtime floor and `:24` blank.
- **Diff at the site:** Same hunk, `conform-relation.diff:14` — `@@ -19,8 +19,8 @@`; the exact replacement is at `:21`.
- **Old form sweep:** Case-insensitive patterns `ESM-only|no CommonJS build`; paths `src/**/*.ts`, `tests/**/*.ts`, `guides/relation.md`, `guides/README.md`, `README.md`: no hit.
- **Report reading:** The report gives `applied`: “`README.md` states the ESM and CommonJS faces the `exports` field publishes” (`conform-relation-report.md:13`). The current line states those faces: **matches: yes**.
- **Proof reading:** Placement/documentation row. Sweep agrees: no old ESM-only claim remains in the scoped population.

### relation-obj-6

- **Site now:** `Model` documentation begins at `src/core/Model.ts:31`, with an `@example` at `:53-68` and constructor `@param` documentation at `:85-94`. `RelationManager` has an `@example` at `src/core/RelationManager.ts:28-38`, and constructor documentation at `:49-54`.
- **Diff at the site:** Model documentation hunk `conform-relation.diff:308` — `@@ -49,6 +49,23 @@`; RelationManager documentation hunk `:435` — `@@ -21,17 +21,43 @@`. The examples and parameter documentation are present in `+` lines.
- **Old form sweep:** No removed or renamed symbol applies.
- **Report reading:** The report gives `applied`: “`Model` and `RelationManager` carry an `@example`, and each constructor carries `@param` documentation” (`conform-relation-report.md:14`). Current TSDoc carries both: **matches: yes**.
- **Proof reading:** Placement/documentation row; no old-form sweep applies.

### relation-obj-8

- **Site now:** `isBrowserVuePath` is absent from `tests/setup.ts`; the surrounding exports are `tests/setup.ts:22-29`, where `FaultDriver` follows the fixture maps. Its former test block is absent from `tests/setup.test.ts`; `describe('FaultDriver')` begins at `tests/setup.test.ts:84`.
- **Diff at the site:** Setup deletion hunk `conform-relation.diff:972` — `@@ -22,12 +22,6 @@`; setup-test deletion hunk `:943` — `@@ -89,24 +89,6 @@`. The repair is deletion, so no operative replacement text is expected in `+` lines.
- **Old form sweep:** Case-insensitive pattern `\b(isBrowserVuePath|isBrowserVuePaths|isBrowserVuePathed|isBrowserVuePathing)\b`; paths `src/**/*.ts`, `tests/**/*.ts`, `guides/relation.md`, `guides/README.md`, `README.md`, `vite.config.ts`: no hit.
- **Report reading:** The report gives `applied`: “`isBrowserVuePath` deleted from `tests/setup.ts`, with its cases and its clause in the proof's header” (`conform-relation-report.md:15`). The helper and test block are absent: **matches: yes**.
- **Proof reading:** The report marks the deletion control “not applicable” and records `8 passed (8)` in `relation-obj-8-green.txt`. The control exists and matches.

### relation-subj-2

- **Site now:** `RelationManagerInterface` remarks at `src/core/types.ts:353-355` state that each call constructs a model and each handle owns its emitter. The guide states the same at `guides/relation.md:318`, with context at `:317` and the following example at `:320`.
- **Diff at the site:** Type hunk `conform-relation.diff:736` — `@@ -342,7 +351,8 @@`; guide hunk `:225` — `@@ -305,7 +307,7 @@` plus the fresh-handle paragraph hunk. The lifetime text is present.
- **Old form sweep:** No name or phrase was removed or renamed.
- **Report reading:** The report gives `applied`: “The per-call handle lifetime stated on `RelationManagerInterface` and in the guide's Observing section” (`conform-relation-report.md:16`). Both current locations carry it: **matches: yes**.
- **Proof reading:** Documentation row; no old-form sweep applies.

### relation-subj-3

- **Site now:** `src/core/types.ts:23` says `Enumerates the relationships a relation can declare.` `guides/relation.md:3` names the five members as relationships, `:181` says `The relationships, and where each foreign key lives:`, and `:183` uses the `Relationship` header. `README.md:8` also names the members.
- **Diff at the site:** Type hunk `conform-relation.diff:603` — `@@ -8,19 +8,19 @@`; guide hunk `:47` — `@@ -1,8 +1,8 @@`; table hunk `:174` — `@@ -176,15 +178,15 @@`. The replacement text is present.
- **Old form sweep:** Case-insensitive `\b(relation kind|relation kinds|relation shape|relation shapes)\b`; paths `src/**/*.ts`, `tests/**/*.ts`, `guides/relation.md`, `guides/README.md`, `README.md`: no hit. `\bKind\b` remains only in Surface-table headers at `guides/relation.md:37,45,55,63,72,79`, as required.
- **Report reading:** The report gives `applied`: “`relationship` is the single term for the axis; the Patterns table header is `Relationship`” (`conform-relation-report.md:17`). Current prose and the Patterns header agree: **matches: yes**.
- **Proof reading:** Naming/documentation row; the sweep agrees.

### relation-subj-4

- **Site now:** `src/core/types.ts:209` declares `LoadedMap`; `Loaded<T>` uses it at `:220`, and its documentation links it at `:216`. The guide names `LoadedMap` at `guides/relation.md:95` and `Loaded` at `:94`.
- **Diff at the site:** Type hunk `conform-relation.diff:627` — `@@ -206,18 +206,18 @@`; guide type-table hunk `:76` — `@@ -74,33 +76,33 @@`. `LoadedMap` is present in the `+` lines and `RelationProps` is removed.
- **Old form sweep:** Word-boundary pattern `\bRelationProps\b`; case-insensitive inflection pattern over `RelationProps`, `RelationPropses`, `RelationPropsed`, and `RelationPropsing`; paths `src/**/*.ts`, `tests/**/*.ts`, `guides/relation.md`, `guides/README.md`, `README.md`: no hit.
- **Report reading:** The report gives `applied`: “`RelationProps` renamed `LoadedMap` in types, `Model`, and the guide's Types row — BREAKING” (`conform-relation-report.md:18`). Current source and guide use `LoadedMap`: **matches: yes**.
- **Proof reading:** Naming row; sweep agrees.

### relation-subj-5

- **Site now:** `RelationManagerOptions` documents `model` at `src/core/types.ts:320-328` and declares it at `:342-345`. `RelationManager` stores `options.model` at `src/core/RelationManager.ts:45` and `:60`, then passes `this.#model?.on` and `this.#model?.error` at `:119-120`. The guide names `model?` at `guides/relation.md:100` and explains it at `:318-328` and `:339`.
- **Diff at the site:** Type option hunk `conform-relation.diff:725` — `@@ -334,6 +339,10 @@`; manager hunk `:479` — `@@ -76,13 +102,23 @@`; guide option/observation hunks `:76` and `:225`. The operative option and threading text is present.
- **Old form sweep:** No removed or renamed name applies.
- **Report reading:** The report gives `applied`: “`RelationManagerOptions.model` carries `on` and `error`, threaded into every vended handle” (`conform-relation-report.md:19`). Current declarations, storage, and call arguments carry it: **matches: yes**.
- **Proof reading:** `npm --prefix /home/user/fleet/relation run test:src:core`; red: `2 failed | 63 passed (65)` in `relation-subj-5-subj-14-red.txt`; green: `65 passed (65)` in `relation-subj-5-subj-14-green.txt`. Both controls exist and match.

### relation-subj-6

- **Site now:** `src/core/types.ts:266` declares `ModelEventMap` without a type parameter; `link` uses `Key` at `:277`, and `unlink` uses `Key` at `:282`. The old `@typeParam` text is absent from the block at `:248-264`. The guide names the non-parameterized map at `guides/relation.md:98`.
- **Diff at the site:** Type documentation hunk `conform-relation.diff:649` — `@@ -245,29 +245,25 @@`; member hunk `:683` — `@@ -277,12 +273,12 @@`. The arity change and `Key` tuple types are present in `+` lines.
- **Old form sweep:** Pattern `ModelEventMap<` plus case-insensitive old-name inflections; paths `src/**/*.ts`, `tests/**/*.ts`, `guides/relation.md`, `guides/README.md`, `README.md`: no old parameterized form. Bare `ModelEventMap` remains at its intended consumers.
- **Report reading:** The report gives `applied`: “`ModelEventMap` declares no type parameter; `link` / `unlink` carry `Key` — BREAKING” (`conform-relation-report.md:20`). Current declaration and tuple members agree: **matches: yes**.
- **Proof reading:** Naming/type-contract row; sweep agrees.

### relation-subj-9

- **Site now:** Published TSDoc citations are removed from `src/core/types.ts:248-264` and `src/core/Model.ts:44-50`. Internal prose names owning rules: `src/core/errors.ts:3-5`, `tests/src/core/Model.test.ts:265`, `guides/relation.md:105,133,138,140`, and `guides/README.md:3,53`. The guide's final link is at `guides/relation.md:362`.
- **Diff at the site:** Relevant hunks include `conform-relation.diff:299` (`@@ -41,7 +41,7 @@`), `:508` (`@@ -1,7 +1,8 @@`), `:603`, `:649`, `:698`, `:803`, `:813`, `:989`, and `:1044`. The stale numbered citations are absent from the `+` lines; replacement file-and-heading citations are present.
- **Old form sweep:** Patterns `AGENTS §[0-9]+`, `\(§[0-9]+`, and `§[0-9]+`; paths `src/**/*.ts`, `tests/**/*.ts`, `guides/relation.md`, `guides/README.md`, `README.md`: no hit.
- **Report reading:** The report gives `applied`: “Every `§` citation removed: deleted in published TSDoc, replaced by file and heading in repository-internal prose” (`conform-relation-report.md:21`). The stale numeric citations are gone, but the literal `§` remains in valid named citations such as `guides/relation.md:105` (`.claude/rules/documentation.md § Parity`) and `:138` (`.claude/rules/patterns.md § Stateful emitters`). Therefore the report's blanket `§` sweep table at `conform-relation-report.md:119` does not match the tree literally: **matches: no** for the blanket sweep; **matches: yes** for removal of stale numbered citations.
- **Proof reading:** Documentation row. The scoped old-number sweep agrees; the report's broader `§` claim does not.

### relation-subj-13

- **Site now:** `guides/relation.md:3,20,165,173,181,240,290,310,318,339,345` uses the approved vocabulary. `src/core/types.ts:264` says “Subscribe through”, and `tests/src/core/Model.test.ts:265` contains the named rule citation rather than `via`.
- **Diff at the site:** Guide substitutions appear in hunks `conform-relation.diff:47`, `:58`, `:156`, `:165`, `:174`, `:198`, `:207`, `:216`, `:225`, `:245`, and `:254`; source/test substitutions appear at `:649`, `:698`, `:1044`, and `:1077`. The replacement text is present.
- **Old form sweep:** Case-insensitive patterns `\bvia\b`, `\bjust\b`, `\bnow\b`, `\be\.g\.\b`, `\bsimply\b`, and `\bcurrently\b`, including listed inflections; paths `src/**/*.ts`, `tests/**/*.ts`, `guides/relation.md`, `guides/README.md`, `README.md`: no hit.
- **Report reading:** The report gives `applied`: “`via`, `just`, `now`, and `e.g.` replaced across the package's own prose” (`conform-relation-report.md:22`). The scoped sweep is empty: **matches: yes**.
- **Proof reading:** Documentation row; sweep agrees.

### relation-subj-14

- **Site now:** The guide's Tests entry is `guides/relation.md:356`, naming `on?` wiring through the manager's `model` option. The previously misleading test is now `it('delivers load to a listener subscribed on the handle', ...)` at `tests/src/core/Model.test.ts:314`; manager-option tests are at `:322` and `:329`.
- **Diff at the site:** Guide hunk `conform-relation.diff:254` — `@@ -335,14 +350,14 @@`; test hunk `:1077` — `@@ -300,7 +311,7 @@` and `:1086` — `@@ -308,14 +319,41 @@`. The new assertions are present.
- **Old form sweep:** Patterns `wires initial listeners through the model handle|on\? wiring` in test titles and guide prose; paths `tests/**/*.ts`, `guides/relation.md`: the old title is absent. The intended `on?` claim remains in the updated guide and is not an old form.
- **Report reading:** The report gives `applied`: “Two cases prove the manager's `model.on` and `model.error` reach a vended handle; the misdescribing case renamed” (`conform-relation-report.md:23`). Current tests at `tests/src/core/Model.test.ts:322-347` provide those cases: **matches: yes**.
- **Proof reading:** `npm --prefix /home/user/fleet/relation run test:src:core`; red and green controls are shared with relation-subj-5: `2 failed | 63 passed (65)` and `65 passed (65)`. Both matching files exist.

### fleet-F1

- **Site now:** `isBrowserVuePath` is absent, and the workspace has no `src/browser`, `app/browser`, or `tests/setupBrowser.ts` path. `tests/setup.ts:22-29` retains other shared fixtures, so the export-free rewrite branch does not apply.
- **Diff at the site:** F1 folds into `relation-obj-8`; the deletion hunks are `conform-relation.diff:943` and `:972`. No second edit exists.
- **Old form sweep:** Pattern `\b(isBrowserVuePath|isBrowserVuePaths|isBrowserVuePathed|isBrowserVuePathing)\b`; paths `tests/setup.ts`, `tests/setup.test.ts`, `vite.config.ts`, `src/**`, `guides/**`, `README.md`: no hit.
- **Report reading:** The report gives `applied`: “By `relation-obj-8`. No second edit. The workspace has no browser environment and no `app/` tree” (`conform-relation-report.md:24`). Current tree and diff agree: **matches: yes**.
- **Proof reading:** Same deletion control as relation-obj-8: `relation-obj-8-green.txt` records `8 passed (8)`.

### fleet-F2

- **Site now:** No class in `src/**/*.ts` declares `readonly id: string`; `Model` has only a private local `id` use at `src/core/Model.ts:249`, not a public data field. The only `readonly id: string` hit is the vendored fixture string in `tests/setupPolicy.ts:2882`. No relevant `JSON.stringify` serializes a `Model` or `RelationManager` instance in package-owned tests or guide fences.
- **Diff at the site:** No F2 diff hunk exists.
- **Old form sweep:** Pattern `readonly id: string` over `src/**/*.ts`: no hit. `JSON.stringify` over package-owned tests and guide fences: no relevant class-instance serialization.
- **Report reading:** The report gives `noop`: “No class declares a public `readonly id: string`. See § Sweeps” (`conform-relation-report.md:25`). The current class and serialization checks support the noop: **matches: yes**.
- **Proof reading:** Placement row; the F2 condition is absent.

### Across the unit

- **Scope:** Every status path is `owned`; no status path is `shared` or `off-limits`:
  - `README.md`
  - `guides/README.md`
  - `guides/relation.md`
  - `src/core/Model.ts`
  - `src/core/RelationManager.ts`
  - `src/core/errors.ts`
  - `src/core/helpers.ts`
  - `src/core/types.ts`
  - `src/core/validators.ts`
  - `tests/guides.test.ts`
  - `tests/setup.test.ts`
  - `tests/setup.ts`
  - `tests/src/core/Model.test.ts`
  - `tests/src/core/helpers.test.ts`
  - `tests/src/core/validators.test.ts`

  The status evidence is `/home/user/work/evidence/conform-relation.status:1-15`.

- **Diff hunks with no literal `Where` filename anchor:** `src/core/helpers.ts @@ -11,8 +11,8 @@` first added line `+// an explicit \`relationship\`; hand-written descriptors fall back to field inference.`; `src/core/helpers.ts @@ -198,6 +198,64 @@` first added line `+/**`; `tests/setup.test.ts @@ -2,18 +2,13 @@` first added line `+import { FaultDriver, INTEGRATION_RELATIONS, INTEGRATION_TABLES } from './setup.js'`; `tests/src/core/helpers.test.ts @@ -1,15 +1,20 @@` first added line `+import type { Relation } from '@src/core'`; `tests/src/core/validators.test.ts @@ -1,4 +1,4 @@` first added line `+import { belongsTo, hasMany, hasMorph, hasOne, hasThrough, isRelationDescriptor } from '@src/core'`. Each is named by a row's repair text, so no diff hunk is outside the unit's owned repairs.
- **Residue in diff additions:** Pattern `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger`; paths `/home/user/work/evidence/conform-relation.diff`, added lines only: no hit.
- **Residue in tree:** Same pattern; paths `src/**/*.ts` and `tests/**/*.ts`, excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`: no hit. The unrestricted hits are confined to those excluded files.
- **Writing sweep:** Pattern `\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b`, case-insensitive, over added prose lines:
  - `guides/relation.md:339`: `**The listener-isolation safety guarantee.** ...`
  - `guides/relation.md:356`: `... the emit-safety guarantee ...`
  - `tests/src/core/Model.test.ts:261`: `... the emit-safety guarantee ...`
  - `src/core/Model.ts:59`: `const users = new Model(`, code in a TSDoc example.
  - `src/core/RelationManager.ts:32`: `const manager = new RelationManager(`, code in a TSDoc example.
  
  The `guarantee` hits are prose hits and were not recorded by the report's writing sweep. The `new` hits are code syntax inside examples, not prose claims.
- **Writing count sweep:** Pattern `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b`, added lines only: no hit.
- **Parity:** See the parity table in `Distillate`.
- **Breaking:** The report's breaking section says both breaking rows move the published type surface and require no fleet consumer edit (`conform-relation-report.md:179-188`). Word-boundary sweeps for `RelationProps` and `ModelEventMap` over `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, and `/home/user/scaffold/src`, excluding `node_modules`, `/home/user/fleet/relation`, and guide mirrors: no hit. Toolbox imports only `RelationManagerInterface`, `ModelInterface`, `Include`, `RelationErrorCode`, and `isRelationError` (`/home/user/fleet/toolbox/src/core/types.ts:23`, `/home/user/fleet/toolbox/src/core/helpers.ts:3-8,20`).

### Gates

The report records these gate lines:

| Command | Exit | Evidence |
|---|---:|---|
| `npm --prefix /home/user/fleet/relation run format:check` | 0 | `gate-format-check.txt`: “All matched files use the correct format.” |
| `npm --prefix /home/user/fleet/relation run lint:check` | 0 | `gate-lint-check.txt`: no diagnostics |
| `npm --prefix /home/user/fleet/relation run check` | 0 | `gate-check.txt`: `tsc` and `check:src:core` completed |
| `npm --prefix /home/user/fleet/relation run build` | 0 | `gate-build.txt`: ESM and CJS built; `index.d.cts` copied |
| `npm --prefix /home/user/fleet/relation test` | 0 | `gate-test.txt`: `src:core` 65, policy 111, config 46, setup 8, guides 29 |
| `npx scaffold audit --offline` | 0 | `scaffold-audit.txt`: `0 of 34 planned paths drifted` |
| `node /home/user/scaffold/tmp/work/evidence.mjs relation` | 0 | Reported diff and status evidence regenerated |

The gate files are present under `/home/user/work/evidence/relation-proofs/`.

### Parity

| Entity | Interface members in `src/core/types.ts` | Guide method rows | Readonly data properties and guide row |
|---|---|---|---|
| `ModelInterface` | `load` `types.ts:307-312`; `find` `:313`; `link` `:314`; `unlink` `:315`; `links` `:316` | `guides/relation.md:113-117`: `load`, `find`, `link`, `unlink`, `links` | `emitter`, `name`, `table`, `relations` at `types.ts:303-306`; named in the `ModelInterface` Types row at `guides/relation.md:99` |
| `RelationManagerInterface` | `model` `types.ts:359`; `names` `:360`; `has` `:361` | `guides/relation.md:125-127`: `model`, `names`, `has` | `count` at `types.ts:358`; named with `count / model / names / has` in `guides/relation.md:101` |
| `RelationManagerOptions` | No method table | No method table | `database`, `relations`, `model` at `types.ts:340-344`; named in `guides/relation.md:100` |
| `ModelEventMap` | Event members `load`, `link`, `unlink` at `types.ts:269-282` | Event table at `guides/relation.md:335` | Event surface named by the `ModelEventMap` row at `guides/relation.md:98` |
| `LoadedMap` | Type alias at `types.ts:209` | Not behavioral | Named at `guides/relation.md:95` |
| `RelationDescriptor` | Readonly members at `types.ts:47-55` | Not behavioral | Named at `guides/relation.md:82` |

Backticked identifiers added or rewritten in guide lines resolve through the barrel at `src/core/index.ts:1-7` when they are public API symbols: `Relationship`, `RelationDescriptor`, `Relation`, `RelationMap`, `RelationsShape`, `ResolvedRelation`, `ResolvedBelongs`, `ResolvedMany`, `ResolvedOne`, `ResolvedThrough`, `ResolvedMorph`, `RelationErrorCode`, `Include`, `Loaded`, `LoadedMap`, `RelationContext`, `FindOptions`, `ModelEventMap`, `ModelInterface`, `RelationManagerOptions`, `RelationManagerInterface`, `createRelationManager`, `RelationManager`, `Model`, `belongsTo`, `hasMany`, `hasOne`, `hasThrough`, `hasMorph`, `resolveRelation`, `resolveRelationMap`, `isRelationDescriptor`, `readColumn`, `countAttached`, `indexRows`, `groupRows`, `RelationError`, `isRelationError`, and `link` / `unlink` / `links`. Relationship literals such as `belongs`, `many`, `one`, `through`, and `morph`, option members such as `model`, `on`, and `error`, paths such as `src/core`, and rule names such as `.claude/rules/documentation.md` are not separate barrel exports.

## Distillate

- `relation-obj-1: site now src/core/validators.ts:29-44 | diff present yes | old form hits 0 | report matches yes`
- `relation-obj-2: site now helpers indexRows at src/core/helpers.ts:220 and groupRows at :245; Model calls at :378, :403, :464, :502 | diff present yes | old form hits 0 | report matches yes`
- `relation-obj-3: site now tests/guides.test.ts:189-256 | diff present yes | old form hits 0 | report matches yes`
- `relation-obj-4: site now README.md:22 | diff present yes | old form hits 0 | report matches yes`
- `relation-obj-5: site now README.md:23 | diff present yes | old form hits 0 | report matches yes`
- `relation-obj-6: site now Model TSDoc at src/core/Model.ts:31-68 and RelationManager TSDoc at src/core/RelationManager.ts:15-38 | diff present yes | old form hits 0 | report matches yes`
- `relation-obj-8: site now helper and test block absent; surrounding setup at tests/setup.ts:22-29 and tests/setup.test.ts:84 | diff present yes | old form hits 0 | report matches yes`
- `relation-subj-2: site now src/core/types.ts:353-355 and guides/relation.md:318 | diff present yes | old form hits 0 | report matches yes`
- `relation-subj-3: site now relationship wording at src/core/types.ts:23, guides/relation.md:3,181,183, and README.md:8 | diff present yes | old form hits 0 | report matches yes`
- `relation-subj-4: site now LoadedMap at src/core/types.ts:209,220 and guides/relation.md:95 | diff present yes | old form hits 0 | report matches yes`
- `relation-subj-5: site now model option at src/core/types.ts:342-345 and threading at src/core/RelationManager.ts:119-120 | diff present yes | old form hits 0 | report matches yes`
- `relation-subj-6: site now ModelEventMap at src/core/types.ts:266 with Key tuples at :277,282 | diff present yes | old form hits 0 | report matches yes`
- `relation-subj-9: site now stale numeric citations absent, named § citations retained at guides/relation.md:105,138 | diff present yes | old form hits 0 | report matches no for blanket § sweep; yes for stale-number removal`
- `relation-subj-13: site now approved wording at guides/relation.md:3,20,165,173,240,290,310,318,339 and source/test sites | diff present yes | old form hits 0 | report matches yes`
- `relation-subj-14: site now tests/src/core/Model.test.ts:314,322,329 and guide tests row at guides/relation.md:356 | diff present yes | old form hits 0 | report matches yes`
- `fleet-F1: site now folded into relation-obj-8; helper absent | diff present yes | old form hits 0 | report matches yes`
- `fleet-F2: site now no matching public id field or relevant serialization | diff present no | old form hits 0 | report matches yes`

Scope tags: all status paths are `owned`; no `shared` or `off-limits` status path appears.

Residue: no added-line `.skip`, `.only`, `.todo`, retry, timeout, TODO, FIXME, `console.`, or `debugger` hits; scoped tree sweep is empty.

Writing hits: `guarantee` at `guides/relation.md:339`, `guides/relation.md:356`, and `tests/src/core/Model.test.ts:261`; `new` at code examples `src/core/Model.ts:59` and `src/core/RelationManager.ts:32`. Count-pattern sweep is empty.

Parity: `ModelInterface` methods `load/find/link/unlink/links` match guide rows `guides/relation.md:113-117`; `RelationManagerInterface` methods `model/names/has` match `:125-127`. Readonly data properties are named in the corresponding Types rows at `guides/relation.md:95,98-101`.

## Unknowns

None. All named inputs, evidence files, tree sites, controls, and sweeps were reachable.

## Journal
Leave this line for the driver.

## Deviation

No tree change was observed. No requested file was unreadable. No required sweep was unavailable. The report's blanket `§`-empty reading and its omitted `guarantee` writing hits are recorded above.