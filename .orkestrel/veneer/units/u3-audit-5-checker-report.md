## Claims table

| Claim | Check | PASS/FAIL | Site |
|---|---|---|---|
| 1 | `walkSelector` exported with `SelectorStep` shape (`char`,`index`,`depth`,`literal`) and a TSDoc stating the grammar | PASS | `tests/setupStyles.ts:712-774` |
| 1 | `findGroupEnd`, `splitTopLevelList`, `splitTopLevelCompounds`, `normalizeComplexSelector`, `extractCompoundTags` each loop `for (const step of walkSelector(...))` and each TSDoc refers to `{@link walkSelector}` | PASS | `tests/setupStyles.ts:788` (`splitTopLevelList`), `:814` (`normalizeComplexSelector`), `:852` (`splitTopLevelCompounds`), `:874-883` (`findGroupEnd`), `:907-919` (`extractCompoundTags`) |
| 1 | No other character loop or regex scans selector text beyond the named "anchored leading-identifier match" exception | REFERRAL | `tests/setupStyles.ts:913` has a second regex, `/:(?:is|where)$/u.test(compound.slice(0, step.index))`, scanning compound text for a pseudo-class prefix; the claim names only the leading-identifier match (`:909`) as the permitted exception. Whether this second regex also falls inside the claim's exception is a judgment call the checker will not guess at — send to whichever lane is running. |
| 1 | The four listed in-memory readings (`matchesLooseTagPair` on the four inputs, `normalizeComplexSelector` on `h1\+p`/`h1\ p`) and "every earlier reading holds" | UNDECIDABLE | Checker holds no execution tool; this requires a lane that can run the code. |
| 2 | Every table under `guides/veneer.md` § Tokens follows a sentence naming what it lists, in the `#### Factors` form | PASS | `guides/veneer.md:103-110` (Factors), `:123-126` (Palette and gray ramp), `:137-139` and `:155-156` (Semantic roles, two tables), `:172-176` (Text and surface), `:198-201` (Links), `:209-212` (Type), `:222-227` (Space, border, radius, and elevation), `:240-244` (Motion, focus, validation, breakpoints, and stacking), `:315-318` (Departures from Bootstrap) |
| 3 | `role-each`'s declaration in `_mixins.scss` carries one comment stating the one-caller retention reason and naming `theme-tokens` as the shipped include | PASS | `src/styles/_mixins.scss:29-37` |
| 4 | `tests/setupConformance.ts`'s header names the `conformance` and `setup` projects and the files that load it, and this is true of the importers | PASS | Header at `tests/setupConformance.ts:1-5`; import confirmed at `tests/setupStyles.test.ts:6` (`import { readBootstrapCascade } from './setupConformance.js'`), and `tests/setupConformance.test.ts:18,37,63` |
| 5 | The `interpolate-size: allow-keywords` paragraph sits in § Showcase's baseline paragraph, not in § Reference map's motion subsection | PASS | Occurrence at `guides/veneer.md:376`, inside `## Showcase` (`:367-380`); `### Reference map` spans `:101-264` and contains no occurrence |
| 6 | `_theme.scss`'s `@each` over `tokens.$assets` raises `@error` naming the key when `tokens.$dark` lacks it | PASS | `src/styles/_theme.scss:21-24` |
| 6 | "Emits nothing else new" and built `dist/src/styles/index.css` is byte-identical to the pre-brief-8 build | UNDECIDABLE | Requires a build run and a byte comparison; checker holds no build tool. |
| 7 | No `any`, non-null assertion, `as` beyond `as const`, `@ts-` directive, `eslint-disable`, default export outside a config file, in the diff | PASS | `u3-diff-5.patch.txt`: 10 hits for the sweep pattern, all prose uses of "any" or the pre-existing `export default defineConfig({` context line in `configs/src/vite.styles.config.ts:17` (a config file, exempt under `AGENTS.md` § Non-negotiable rules) |
| 7 | The tally sweep at the two named prior sites is clear (`both`, `two`, `three`, `four`, `several`, `multiple`) | PASS | No match in `tests/setupStyles.ts` or `tests/src/styles/fixtures/mixins.scss` for the pattern (case-insensitive) |
| 7 | Stale name `role-each`'s predecessor `palette-each` and the stale case name "the objective lane edge forms" are gone workspace-wide | PASS | No match for `palette-each` or `the objective lane edge forms` anywhere under `C:/Users/mikes/WebstormProjects/veneer` |
| 8 | `tmp/audit/u3-status-5.txt` lists exactly the files briefs 4-8 own or grant, the two integrated patch sites, and nothing else | PASS | All 29 status lines resolve to an owned/granted file or `configs/src/vite.styles.config.ts` / `tests/distribution.test.ts`; no off-limits path (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `.claude/**`, `scripts/**`, `AGENTS.md`, `CLAUDE.md`, `tests/config.test.ts`, `src/browser/**`, `app/**`) appears in the status or in the diff's file headers |
| 9 | Gate chain and browser suites exit 0; `scaffold audit` clean | OUT OF SCOPE FOR CHECKER | Claim itself states "ruled by the Orchestrator from the retained verifier report" — this is not a mechanical-evidence claim the checker rules on. |

## Placement table

| Owned file | Placing rule |
|---|---|
| `src/core/constants.ts` | `.claude/rules/architecture.md` § Centralized-file pattern, "Constants/data → `*/constants.ts`" (`architecture.md:19`) |
| `src/core/types.ts` | `.claude/rules/architecture.md` § Centralized-file pattern, "Interfaces/types → `*/types.ts`" (`architecture.md:18`) |
| `src/core/index.ts` | module barrel (architecture.md source-barrel convention) |
| `src/styles/_tokens.scss`, `_theme.scss`, `_mixins.scss`, `index.scss`, `elements/_html.scss`, `elements/_body.scss` | `.claude/rules/styles.md` SCSS centralization/partial placement |
| `tests/setup.ts` | `.claude/rules/tests.md:195`, "`tests/setup.ts`: host-independent; no `node:*`, DOM, `window`, or Vue" |
| `tests/setup.test.ts` | `.claude/rules/tests.md:21-22`, root `tests/setup*.test.ts` proves its sibling `tests/setup*.ts` module |
| `tests/setupBrowser.ts` | `.claude/rules/tests.md:197`, "`tests/setupBrowser.ts`: DOM/Vue/browser helpers and setup CSS" |
| `tests/setupBrowser.test.ts` | `.claude/rules/tests.md:62`, put in the browser-enabled `setup:browser` project |
| `tests/setupStyles.ts` | `.claude/rules/tests.md:198`, "`tests/setupStyles.ts`: CSS/style helpers and compiled cascade" |
| `tests/setupStyles.test.ts` | `.claude/rules/tests.md:59`, `tests/setup*.test.ts` proves its sibling setup module |
| `tests/setupConformance.ts` | Own header, `tests/setupConformance.ts:1-5` (Node-only reader loaded by `conformance` and `setup` projects) |
| `tests/setupConformance.test.ts` | `.claude/rules/tests.md:59`, `tests/setup*.test.ts` proves its sibling setup module |
| `tests/src/styles/index.test.ts`, `elements/*.test.ts`, `fixtures/mixins.scss`, `integration.test.ts`, `mixins.test.ts`, `theme.test.ts`, `tokens.test.ts` | `.claude/rules/tests.md:15`, `tests/src` mirrors `src` |
| `tests/src/core/index.test.ts` | `.claude/rules/tests.md:15`, `tests/src` mirrors `src` |
| `guides/veneer.md` | `.claude/rules/documentation.md` — one guide per package |
| `guides/README.md` (lines 17, 31) | `.claude/rules/documentation.md` — `guides/README.md` is the concept/directory index |
| `README.md` (line 27) | `.claude/rules/documentation.md` — README pitch points to the package guide |
| `configs/src/vite.styles.config.ts` (`setupFiles` line) | `.claude/rules/workspace.md` — `configs/` thin target wrapper |

No path in `tmp/audit/u3-status-5.txt` is owned by no brief: every one of the 29 listed paths resolves to a file briefs 4-8 own or grant, or to one of the two integrated patch sites (`configs/src/vite.styles.config.ts`, `tests/distribution.test.ts`).
