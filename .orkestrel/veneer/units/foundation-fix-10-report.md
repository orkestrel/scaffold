Foundation-fix-10 completed. Every required gate exited 0, and the added assertions read the expected cascade values.

**Files changed**

The unit changed these owned files; this list also defines `<owned files>` in the formatting commands, in argument order:

- `tests/conformance.test.ts`
- `tests/src/styles/themes/index.test.ts`
- `tests/integration.test.ts`
- `src/core/constants.ts`
- `tests/fixtures/bootstrap/published.scss`
- `tests/fixtures/bootstrap/published-default.scss`
- `tests/fixtures/bootstrap/configured.scss`
- `tests/fixtures/integration/bootstrap.scss`
- `tests/fixtures/integration/consumer-normal.scss`
- `tests/fixtures/integration/consumer-theme.scss`
- `tests/fixtures/integration/consumer-reset.scss`
- `tests/fixtures/integration/consumer-elements.scss`
- `tests/fixtures/integration/consumer-layered.scss`
- `tests/fixtures/integration/consumer-lower.scss`
- `tests/fixtures/integration/consumer-higher.scss`
- `tests/fixtures/integration/consumer-bootstrap.scss`

The report is `tmp/units/foundation-fix-10-report.md`.

The Bootstrap integration fixture gained its layered `:root` declaration. The consumer fixtures provide the declarations and controls specified by the brief. Fixtures that introduce a layer load the existing tokens partial first to establish the shared order.

The sole source edit replaces the prescribed `@remarks` sentence. The description paragraph and `@example` remain unchanged. Guide changes: none. Shared-file changes: none. Files created under `tmp/probes/`: none. No commit or installation ran.

**Cases and guide sentences**

The following titles are the registered test templates. Boolean parameters execute with both `false` and `true`. The normal-rule cases execute at consumer positions `0`, `1`, and `2` under both `normal overrides (Tailwind first: %s)` suites, covering every sheet permutation.

| File | Case title | Guide sentence pinned and reading |
| --- | --- | --- |
| `tests/conformance.test.ts` | `configures the drop-in through the published barrel and defaults to the shared order` | Bootstrap sheet: the barrel forwards `$layered`, and one `with` clause configures the face. The published drop-in contains no `@layer` and equals the directly configured face after `roundTrip`. The default-barrel control opens with the complete shared order and differs from the drop-in. |
| `tests/src/styles/themes/index.test.ts` | `requires dark on the pack root inside a dark ancestor (pack first: %s)` | Theme packs: a pack root inside a dark ancestor needs its own `data-bs-theme="dark"` or renders light. The root and span read `light`; the control root carrying the attribute and its span read `dark`. |
| `tests/integration.test.ts` | `lets an unlayered root token beat Bootstrap (consumer first: %s)` | Bootstrap override table: an unlayered `--bs-*` token wins over Bootstrap's declaration. Reads `#123456` in both orders. |
| `tests/integration.test.ts` | `lets a theme root token beat Bootstrap (consumer first: %s)` | Bootstrap override table: a `--bs-*` token in `theme` wins over Bootstrap's declaration. Reads `#123456` in both orders. |
| `tests/integration.test.ts` | `rejects a reset root token over Bootstrap (consumer first: %s)` | Control for the token override row: the same token in `reset` loses. Reads the fixture's `#fff` in both orders. |
| `tests/integration.test.ts` | `lets an unlayered rule beat both faces (consumer position: %s)` | Tailwind and styles override tables: an unlayered normal rule wins over their layered rules. Reads `9px` in every permutation. |
| `tests/integration.test.ts` | `rejects an elements rule over utilities (consumer position: %s)` | Control for the unlayered normal-rule rows: moving the same declaration into `elements` loses to `utilities`. Reads `4px` in every permutation. |
| `tests/integration.test.ts` | `lets layered importance win at lower specificity (consumer first: %s)` | Bootstrap override table: layered `!important` wins at any specificity in either order. Bare `div` in `utilities` beats lifted `.d-flex` and reads `grid`. |
| `tests/integration.test.ts` | `rejects unlayered importance at lower specificity (consumer first: %s)` | Control for the importance rows: unlayered bare `div` loses to lifted `.d-flex` even when loaded later. Reads `flex` in both orders. |
| `tests/integration.test.ts` | `lets unlayered importance win at higher specificity (consumer first: %s)` | Bootstrap override table: higher-specificity unlayered `!important` wins when loaded later. The reverse-order reading also wins: `div.d-flex` reads `block` in both orders. |
| `tests/integration.test.ts` | `resolves source order inside bootstrap (consumer first: %s)` | Bootstrap override table: a later rule inside `bootstrap` wins by source order. Consumer last reads `8px`; consumer first, the control, reads the fixture's `6px`. |
| `tests/integration.test.ts` | `lets an unlayered class beat bootstrap in either order (consumer first: %s)` | Bootstrap override table: an unlayered normal rule wins over a layered Bootstrap declaration. The unlayered `.btn` reads `9px` in both orders, paired with the source-order control. |

**Commands and results**

The required command sequence ran in the listed order. A dash means that the command runs no tests.

| Command | Exit code | Test count |
| --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --write <owned files>` | 0 | —; formatted 16 files |
| `npx tsc --noEmit --project tsconfig.json` | 0 | — |
| `npm run check:src:core` | 0 | — |
| `npx oxlint --config .oxlintrc.json tests/conformance.test.ts tests/src/styles tests/integration.test.ts src/core` | 0 | — |
| `npm run build:src:core` | 0 | — |
| `npm run test:conformance` | 0 | 6 passed, 1 existing todo; 1 file passed |
| `npm run test:src:styles` | 0 | 15 passed, 1 existing todo; 2 files passed |
| `npm run test:integration` | 0 | 34 passed; 1 file passed |
| `npm run test:guides` | 0 | 12 passed; 1 file passed |
| `npx oxfmt --config .oxfmtrc.json --check <owned files>` | 0 | —; 16 files passed |
| `git status --porcelain` before and after edits | 0 each | — |
| `git diff -- src/core/constants.ts` | 0 | — |
| `git diff --no-index -- /dev/null tests/integration.test.ts` | 1 | —; expected difference status for the untracked file |

Read-only `Get-Content` and `rg` inspections exited 0 and ran no tests. The stylesheet test command also completed its styles and themes builds. The unit added no todo or skipped case.

The checkout was dirty at entry. Its existing porcelain entries remained the same at exit; the added fixtures sit beneath the already-untracked `tests/fixtures/` directory. This unit's edits are limited to the owned paths listed here and this report. The constants diff against Git also contains predecessor edits; this unit changed only the stated sentence.

**Readings the brief did not specify**

No behavior contradicted the brief or guide. The brief specifies that the controls lose without giving their exact resolved values: the reset token control read `#fff`, the elements control read `4px`, and the earlier Bootstrap-layer consumer read `6px`, matching their fixture declarations.

The core build reported API Extractor's bundled TypeScript `5.9.3` against project TypeScript `6.0.3` and advised upgrading API Extractor. The build exited 0.

**Deviations**

none. The required formatter expanded the published fixture's single `@use ... with` statement across lines; the fixture contains that statement and nothing else. No guide sentence required a change, no fixture failed to reach its Sass entry, and no edit outside the owned files was needed.
