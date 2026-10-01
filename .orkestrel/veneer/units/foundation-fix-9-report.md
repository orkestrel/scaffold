# foundation-fix-9 report

## Files changed

- `guides/veneer.md`: per-surface sections, the Composition section, the `## Tests` links for the composition and conformance proofs; the stale `### Stylesheets` list under `## Surface` removed (it named a `@layer bootstrap;` statement and six-layer orders that the landed `_tokens.scss` files replaced). The Surface table, the flagship fence, and the tagline are unchanged.
- `guides/README.md`: a per-surface index under `## By concept` (spec, source, tests, showcase for each of the seven surfaces), kept as a list; the parsed table keeps its one row.
- `tests/guides.test.ts`: unchanged (the flagship fence is unchanged).
- `README.md`: unchanged (the tagline is unchanged).
- `tmp/units/foundation-fix-9-report.md`: this report.

Diffstat: run by the Orchestrator (`git diff --stat -- guides`); this lane has no shell.

## Sections added to `guides/veneer.md`

- `## Core entry` (`.`), `## Browser entry` (`./browser`), `## Vue entry` (`./vue`): what the entry ships; no sheet, no layer, no override path.
- `## Bootstrap sheet` (`./bootstrap`, `./bootstrap/scss`): the lifted and drop-in forms, the CSS import line, the `with ($layered: false)` drop-in fence with the lifted form named as the built sheet, the order statement, the layers written (`bootstrap` plus unlayered `!important`), and a five-row override table.
- `## Tailwind compatibility sheet` (`./tailwindcss`, `./tailwindcss/scss`): import lines, order statement, layers written (`theme`, `reset`, `elements`, `components`, `utilities`), the shared-class rule, a two-row override table.
- `## Styles sheet` (`./styles`, `./styles/scss`): import lines, order statement, layers written (those plus `surfaces`, `composables`, `modifiers`), the addition-by-layer rule, no theme pack in the built sheet, a two-row override table.
- `## Theme packs` (`./styles/themes`, `./styles/themes/scss`): import lines, order statement, the `theme` layer alone, the `data-vn-theme` opt-in, the island behaviour, the inheritance limit, the dark-ancestor rule, a three-row override table.
- `## Composition` with `### Load real Tailwind` and `### Tailwind-first limit`: the first-statement rule, the reason for each placement, `@layer` before `@import`, the real-Tailwind recipe with the `SHARED_NAMES` exclusion placeholder and the `properties` rule, and the Tailwind-first limit.

## Proof behind each behaviour sentence

| Sentence | Proof |
| --- | --- |
| `.` exports only the registry | `tests/src/core/index.test.ts` › `exports only the Bootstrap token registry with names keyed by their segments` |
| Registry pinned to `bootstrap.css` | `tests/src/bootstrap/index.test.ts` › `pins every Bootstrap registry leaf to every official root declaration` |
| `./browser` exports nothing | `tests/src/browser/index.test.ts` › `has no starter exports` |
| `./vue` empty, no Vue import | `tests/src/vue/index.test.ts` › `does not re-export the browser entry public surface`, `ships no vue package import` |
| Bootstrap order first, blocks only in `bootstrap` | `tests/src/bootstrap/index.test.ts` › `opens with the shared order and confines layer blocks to Bootstrap` |
| Every `!important` outside every layer | `tests/src/bootstrap/index.test.ts` › `enforces placement on the built sheet and real mixins and refuses layered importance` |
| Lift keeps source position and media conditions | `tests/src/bootstrap/index.test.ts` › `lifts important declarations at source position without losing media conditions` |
| Drop-in: no `@layer`, importance in place | `tests/conformance.test.ts` › `compiles the drop-in fixture without layers and keeps importance in place` |
| Lifted form: order first, importance lifted | `tests/conformance.test.ts` › `compiles the layered fixture with the shared order first and importance lifted in place` |
| Override rows: later unlayered `!important`, layered `!important`, unlayered normal rule | `tests/integration.test.ts` › `resolves consumer overrides (consumer first: %s)` |
| Override row: `--bs-*` token in `theme` | `tests/src/styles/themes/index.test.ts` › `beats Bootstrap on a dark pack root by layer (pack first: %s)` |
| Tailwind order, owned layers, no `.btn` rule or `--bs-*` declaration | `tests/src/tailwindcss/index.test.ts` › `ships its declared order and writes no foreign layer or Bootstrap declarations` |
| Styles order and owned layers | `tests/src/styles/index.test.ts` › `ships its declared order and writes no foreign layer or Bootstrap declarations` |
| `./styles` carries no `data-vn-theme` selector; themes sheet: order, `theme` only, empty default pack | `tests/src/styles/themes/index.test.ts` › `ships the shared order with only theme blocks and no fabricated defaults` |
| Later layer wins; `surfaces` over `bootstrap`; first statement fixes the order | `tests/integration.test.ts` › `resolves the same cascade in all 24 sheet permutations` |
| Pack wins over Bootstrap by layer; `reset` control loses | `tests/src/styles/themes/index.test.ts` › `beats Bootstrap on a dark pack root by layer (pack first: %s)`, `loses to Bootstrap when the pack uses reset (pack first: %s)` |
| Dark and light islands | `tests/src/styles/themes/index.test.ts` › `resolves light, dark, and nested light islands (pack first: %s)` |
| Nested pack stops selectors, not inheritance | `tests/src/styles/themes/index.test.ts` › `stops selectors at a nested pack but keeps inheritance (pack first: %s)` |
| Opt-in: `data-bs-theme` alone reads Bootstrap and no pack value | `tests/src/styles/themes/index.test.ts` › `requires a pack opt-in (pack first: %s)` |
| Tailwind-first limit | `tests/integration.test.ts` › `reads 3px when a Tailwind order statement precedes every Veneer sheet` |
| Tailwind prepends `@layer properties;`; a Veneer sheet linked ahead places it last | `scaffold/tmp/units/absorb-tailwind-distillate.md` rows T8 and C3 (predecessor measurement); the guide assigns the in-repo proof to the Tailwind chunk |
| `@layer` statement may precede `@import` | CSS Cascading and Inheritance Level 5, linked from the guide |

## Commands for the Orchestrator, in order

1. `npx oxfmt --config .oxfmtrc.json --check guides tests/guides.test.ts README.md`
2. `npm run test:guides`
3. `npm run test:policy`
4. `git status --porcelain`
5. `git diff --stat -- guides`

Self-checks run without a shell: every override-table row matches its column widths (Grep `^\| .{69} \| .{39} \| .{81} \|$` and the two sibling patterns over `guides/veneer.md`: 7, 8, and 5 rows, each column with a full-width cell); a case-insensitive sweep of `guides/veneer.md` and `guides/README.md` for the substitution-table terms plus `now`, `new`, `once`, `since`, `above`, `below`, and `master` returns no hit.

## Prove

No `prove` claim: the unit changes no TypeScript. No failing-first test: the unit fixes no defect.

## Shared-file patch (report-only, not applied)

`src/core/constants.ts` names the population more loosely than `ROADMAP.md` § Published faces:

```diff
- * The `bootstrap` group holds the `--bs-*` names Bootstrap 5.3.8's `:root` block declares.
+ * The `bootstrap` group holds the `--bs-*` names of Bootstrap 5.3.8's combined `:root, [data-bs-theme=light]` block.
```

## Deviations

1. Step 5 in table form breaks the gate. Expected: one `## By concept` table row per surface. Found: `parseManifest` (`node_modules/@orkestrel/guide/dist/src/core/index.js:2999`) turns every row under that heading into a guide row, and `Parity#inspect` (`:3513`) inspects each row, so a second `guides/veneer.md` row adds a second `has no documented method groups.` finding against the one `tests/guides.test.ts` pins, and a row whose source is `src/bootstrap` (no exports) reports `documents no barrel TOKEN_NAMES`. Done in list form under the heading; the table keeps its one parsed row. Hypothesis: `@orkestrel/guide` needs a manifest row form for a CSS face with no TypeScript surface before the index can carry one row per surface.
2. Behaviour sentences the roadmap and the brief require that no in-repo case pins (written, not stopped on, because each is the roadmap's wording; each names the case that would pin it, all in files outside this unit):
   - `with ($layered: false)` through the published barrel: `tests/fixtures/bootstrap/dropin.scss` configures `tokens` directly, not `index.scss` through `@forward 'tokens' show $layered`. Pin: a fixture `@use '../../../src/bootstrap/index' with ($layered: false)` compiled in `tests/conformance.test.ts`, asserting no `@layer`.
   - A pack root inside a dark ancestor without its own `data-bs-theme` renders light. Pin: `<div data-bs-theme="dark"><div data-vn-theme="fixture"></div></div>` reading `--vn-probe` as `light` in `tests/src/styles/themes/index.test.ts`.
   - The unlayered token rows (Bootstrap and theme packs) and the unlayered rows of the Tailwind and styles tables rest on the unlayered `button` row against the `bootstrap` layer; the guide says so. Pin: an unlayered `--bs-body-bg` declaration and a rule over a `tailwindcss` or `styles` fixture layer in `tests/integration.test.ts`.
   - The `higher specificity` and `any specificity` halves of the two `!important` rows: the consumer case uses one class on each side. Pin: a layered `!important` element selector over the lifted `.d-flex` rule.
   - Source order inside `bootstrap`: the cited lift case pins source position, not a later consumer rule in `@layer bootstrap`. Pin: a consumer `@layer bootstrap { .btn { … } }` loaded after the fixture.
   - The real-Tailwind recipe, the exclusion line, and the `properties` placement: pinned only by the distillate rows T8 and C3; `ROADMAP.md` § Sequence assigns the in-repo proof to the Tailwind chunk, and the guide states that.
3. Observation, no guide sentence depends on it: `ROADMAP.md` § Style centralization says the Bootstrap `elements/` folder keeps an empty barrel, while `src/bootstrap/elements/` holds one empty partial per element.
