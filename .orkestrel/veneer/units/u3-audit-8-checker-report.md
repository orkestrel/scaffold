## Claim | Check | PASS/FAIL | Site

| Claim | Check | PASS/FAIL | Site |
|---|---|---|---|
| 4 | `walkSelector` TSDoc reads "A reader obtains an identifier from `readIdentifier`" | PASS | `veneer/tests/setupStyles.ts:829` |
| 4 | No double negative in `walkSelector` TSDoc (brief-11 item 4's rewrite of "so a form one reader must not misread cannot be misread by one reader alone") | PASS | `veneer/tests/setupStyles.ts:828` reads "so every reader answers that form the same way" |
| 4 | `walkSelector` TSDoc names `normalizeSelectorText` as what collapses the scope selector before the `BOOTSTRAP_SCOPE_PATTERNS` match | PASS | `veneer/tests/setupStyles.ts:831-835` |
| 4 | No sentence in the two files gives software a faculty (knows/thinks/wants/sees/understands/believes) | PASS | Grep for faculty verbs in `tests/setupStyles.ts` and `tests/setupStyles.test.ts`: no matches |
| 5 | No `any`, `@ts-` directive, `eslint-disable`, default export in the two touched files | PASS | Grep `: any\b\|@ts-\|eslint-disable\|export default` in both files: no matches |
| 5 | No type assertion beyond `as const` | PASS | Grep `` as [A-Za-z]`` in both files: every hit is `as const` (`tests/setupStyles.ts:65-82,597-627,648-656,1489-1559`) or the word "as" inside prose/TSDoc, not a type assertion |
| 5 | Every new export (`extractBareTag`, `mergeCompoundTags`, `dropTaglessCompounds`, `expandCompoundSelector`, `expandComplexSelector`, `extractSelectorIdentifiers`) exists | PASS | `veneer/tests/setupStyles.ts:1118,1135,1219,1287,1323,944` |
| 5 | No stale `palette-each` name survives | PASS | Grep `palette-each` in Veneer tree: no matches |
| 6 | Scope honesty — `tmp/audit/u3-status-8.txt` lists only files briefs 4-11 own/grant plus the two integrated patch sites | PASS | See status-vs-scope reconciliation below; every path in the status resolves to an owning/granting brief section or `configs/src/vite.styles.config.ts` / `tests/distribution.test.ts` |
| — | Guide table sentences — every table under `guides/veneer.md` § Tokens follows an introductory sentence naming what it lists | PASS | `guides/veneer.md:90-96` (legend), `:106-112`(Factors), `:126-128`(Palette), `:140-144`(Semantic roles), `:156-159`(Tiers), `:175-179`(Text/surface), `:201-204`(Links), `:212-215`(Type), `:225-229`(Space/border/radius/elevation), `:243-247`(Motion), `:318-321`(Departures), `:361-364`(Deferred names) |
| — | Sweep: no `rgb(var(` slash form in the owned/touched Veneer prose or code | PASS | Grep `rgb\(var\(` across `**/*.{ts,scss,md}`: only hits are `tests/src/styles/integration.test.ts:19,79` (comma-form `rgb(var(--bs-primary-rgb))`, a fixture literal, not slash syntax, and not one of the two brief-11 owned files) |
| — | Sweep: no tally word (`both`, `two`, `three`, `four`, `several`, `multiple`) in a banned sense in `tests/setupStyles.ts` / `tests/setupStyles.test.ts` | PASS | Every hit describes fixed CSS shorthand grammar (two/three/four-token sides) or names its members per `writing.md`'s `both` exception (`tests/setupStyles.ts:820,1160,1458`); none tallies a growable set |

## Placement table

| Owned file | Placing rule |
|---|---|
| `src/core/constants.ts` | `architecture.md` § Centralized-file pattern — Constants/data → `*/constants.ts` |
| `src/core/types.ts` | `architecture.md` § Centralized-file pattern — Interfaces/types → `*/types.ts` |
| `src/core/index.ts` | `architecture.md` § Centralized-file pattern — Public exports → `*/index.ts` |
| `src/styles/_tokens.scss`, `_theme.scss`, `_mixins.scss`, `index.scss` | `styles.md` centralized SCSS partials |
| `src/styles/elements/_body.scss`, `_html.scss` | `styles.md` elements partials |
| `tests/setup.ts` | `tests.md:195` — "`tests/setup.ts`: host-independent; no `node:*`, DOM, `window`, or Vue" |
| `tests/setup.test.ts` | `tests.md:21-22,59` — root `tests/setup*.test.ts` proves sibling `tests/setup*.ts` |
| `tests/setupBrowser.ts` | `tests.md:197` — "`tests/setupBrowser.ts`: DOM/Vue/browser helpers and setup CSS" |
| `tests/setupBrowser.test.ts` | `tests.md:62` — placed in the browser-enabled `setup:browser` project |
| `tests/setupStyles.ts` | `tests.md:198` — "`tests/setupStyles.ts`: CSS/style helpers and compiled cascade" |
| `tests/setupStyles.test.ts` | `tests.md:59` — proves sibling `tests/setupStyles.ts` |
| `tests/setupConformance.ts`, `tests/setupConformance.test.ts` | `tests.md:59` root setup module/proof pair, granted for brief-7 item 8 alone |
| `tests/src/core/index.test.ts` | `tests.md` — mirrors `src/core` |
| `tests/src/styles/**/*.test.ts` | `tests.md` — mirrors `src/styles` |
| `tests/src/styles/fixtures/mixins.scss` | `u3-brief-5.md:83` — "`tests/src/styles/fixtures/` holds data files alone" |
| `configs/src/vite.styles.config.ts` (granted `setupFiles` line) | `workspace.md` thin target config wrapper; also an integrated patch site |
| `guides/veneer.md`, `guides/README.md`, `README.md` | `documentation.md` |
| `tests/distribution.test.ts` | integrated patch site (Orchestrator-applied, not unit-owned) |

## Scope line

No path in `tmp/audit/u3-status-8.txt` is unowned: `README.md`, `configs/src/vite.styles.config.ts`, `guides/README.md`, `guides/veneer.md`, `src/core/{constants,index,types}.ts`, `src/styles/**`, `tests/distribution.test.ts`, `tests/setup{,.test}.ts`, `tests/setupBrowser{,.test}.ts`, `tests/setupConformance{,.test}.ts`, `tests/setupStyles{,.test}.ts`, `tests/src/core/index.test.ts`, and `tests/src/styles/**` each resolve to an owning or granting clause in `u3-brief-4.md` through `u3-brief-11.md` or to the original `u3-brief.md`, or are one of the two Orchestrator-integrated patch sites (`configs/src/vite.styles.config.ts`, `tests/distribution.test.ts`). `guides/tokens.md` is correctly absent (deleted per `u3-brief-4.md` item 1).
