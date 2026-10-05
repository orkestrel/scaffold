---
paths:
  - '**/*.{scss,css}'
  - 'src/styles/**/*'
  - 'src/*/sheet.ts'
  - 'tests/setupStyles.ts'
  - 'tests/setupStyles.test.ts'
  - 'tests/setupBrowser.ts'
---

# SCSS and CSS rules

SCSS mirrors TypeScript centralization. Concrete token prefixes are project-specific; these structural rules are universal.

## Centralized files

| File                | Sole responsibility                                                                                                                                                                               |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_mixins.scss`      | `@function` values, `@mixin` declaration emitters, and the `!default` switch an emitter reads, which `_tokens.scss` configures through `@use … with`                                              |
| `_tokens.scss`      | `:root` public custom-property tokens and cascade-layer order                                                                                                                                     |
| `_theme.scss`       | Token overrides under theme selectors                                                                                                                                                             |
| `_reset.scss`       | The face's reset declarations, when that face owns a reset                                                                                                                                        |
| `_utilities.scss`   | The utility map and its emission schedule, on a face that generates its utilities from data; that face has no `utilities/` folder, and the one emitter the schedule calls lives in `_mixins.scss` |
| `themes/index.scss` | Barrel of named theme packs, compiled into its own sheet                                                                                                                                          |
| `index.scss`        | Sole compilation barrel                                                                                                                                                                           |

- Apply this table and the folder barrels in § Folders to every sheet face: `src/styles` and each
  `src/<name>` styles extension. `.claude/rules/workspace.md` § Environments fixes the `sheet.ts`
  entry.
- `_mixins.scss` emits no top-level CSS.
- Consumers load it with `@use '../mixins' as *`.
- Never load `mixins` from `index.scss`.
- `index.scss` is the sole compilation barrel of its sheet; it loads `tokens`, `theme` where `_theme.scss` exists, and the output partials with `@use`. Never load `themes/` from `index.scss`.
- `_tokens.scss` is the token source of truth. Adding a token is allowed; rename/removal is breaking.
- `_theme.scss` and each `themes/` pack only retune tokens under theme selectors such as `[data-theme='…']`.
- Component partials never override global tokens.

## Sass mechanisms

- `@function`: pure calculation returning one CSS value.
- `@mixin`: emits declarations and may take `@content`; owns repeated boilerplate.
- `%placeholder`: sharing inside one partial only. It is not reachable across `@use`; cross-file reuse uses mixins.

## Prohibitions

- Verify every treatment against the shipped resolved cascade before accepting it: the compiled output plus the stylesheet of every dependency the consumer loads. A dependency's own default rules decide what a bare element renders as — not documentation, and not memory.
- Check `_tokens.scss` before inventing a token.
- Put global tokens in `_tokens.scss`; put truly component-scoped custom properties on the component selector.
- Never bury tokens in unrelated partials.
- Never use literal colors outside a pinned recreation. Use `var(--token)` or `color-mix()` over
  tokens. The one file a literal color may appear in is `_tokens.scss`, where the token itself is
  declared. A face whose contract is the exact recreation of a pinned external artifact keeps
  the literals, declarations, and order the pin declares, and records tokenization and
  accessibility additions in its separate authored face.
- Format a pinned recreation face like every other file: never a `prettier-ignore` directive and
  never a `.prettierignore` entry for a source file. Sass re-emits every value and selector it
  parses in its own form, so the formatter's canonicalisation of those vanishes at compile; a
  custom-property value is the one text Sass emits verbatim, so write every custom-property
  declaration in a literal partial as a Sass string interpolation (`--name: #{'VALUE'};`), which the
  formatter reads as a string and Sass emits byte for byte. Keep a pinned expected output in a JSON
  fixture, never in a CSS file the formatter would canonicalise. The face's byte proofs (link 1, the
  per-module region cases, the sample cases) hold under `npm run format`.
- Never repeat per-color/per-variant blocks; drive shared structure with one `@each` over a shared list.
- If a pattern appears in at least two partials, move it to `_mixins.scss`.
- Treat a declaration block two partials share because each records an external value as a
  coincidence, never a pattern: keep both copies inline, and move a block only where its callers
  share one decision whose divergence is a defect.
- A one-partial pattern stays inline; do not create a mixin for one caller.
- Never `@extend` across partials; share through tokens/mixins.
- Never declare a `transition:` without `prefers-reduced-motion: reduce`. Use the project transition mixin, which emits both.
- Animations include `@include reduced-motion { animation: none }`.
- Never wrap rules in a foreign cascade layer. Each partial uses its folder's own layer. A sheet
  that recreates an external framework instead writes every normal declaration into one layer named
  for that framework and every `!important` declaration outside every layer. A derived build of that
  recreation for a utility library may place the framework's reset rules in `reset` under a switch
  the guide records, keeping every `!important` declaration outside every layer.
- A derived build of a recreation for a utility library may substitute the framework's token
  literals (colors and scale values) with the utility library's theme values under a switch the guide
  records, when a committed record maps every substituted literal to its source token and resolved
  value and a proof reads the derived sheet against the framework's own compile from the mapped
  bases; the substitution changes no selector, declaration order, or declaration count.
- Declare cascade-layer order once in the consumer entry before `@import 'tailwindcss'`, so utilities win predictably. When a package publishes several sheets, open every published sheet with the same full order statement, so the order holds whichever sheet loads first.
- Open `themes/index.scss` with `@use '../tokens'`, whose first emitted rule is the order statement, then `@use 'default'`; Sass refuses a `@use` after another rule, so never write the statement there literally.

## Folders

- Give each folder an `_index.scss` barrel that loads its partials with `@use`; keep the barrel when the folder is empty.
- Put a rule that styles one element in `elements/`, a class skin that applies with no script running in `components/`, and a class that sets one property in `utilities/`. A face that generates its utilities from a map keeps that map and its emission schedule in `_utilities.scss` instead of a `utilities/` folder; never keep both, because `@use 'utilities'` resolves to either.
- Add another folder only for a job `elements/`, `components/`, and `utilities/` do not hold, and give it its own barrel and its own layer.

## Proofs

- Declare every CSSOM instrument a sheet proof reads in `tests/setupStyles.ts`, never in a test file. `tests/setupStyles.test.ts` proves each instrument under the root setup mirror in `.claude/rules/tests.md`.

## Naming

| Kind            | Form                                                                |
| --------------- | ------------------------------------------------------------------- |
| Function        | lowercase kebab-case verb/noun: `tint`, `clamp`                     |
| Mixin           | lowercase kebab-case verb/verb-noun: `transition`, `reduced-motion` |
| Sass variable   | lowercase kebab-case; `!default` when overridable                   |
| Custom property | project token scheme: `--{scope}-{property}[-modifier]`             |
| Modifier class  | bare adjective/noun: `.surface`, `.muted`, `.accent`                |
| State class     | bare adjective using the shared lifecycle vocabulary                |

State classes are bare adjectives such as `.active` and `.disabled`, chosen consistently with the shared lifecycle vocabulary.

The composable owns interaction state, class application, `aria-*`, and timing. The partial owns visual presentation. Their contracts are stable class names and transition tokens.
