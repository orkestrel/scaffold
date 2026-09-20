<!-- workflow wf_f019d333-b20, agent ae8a33f8ff5be5092, retained 2026-09-20 -->

## Checker verdict — U3 audit round 9

| Claim | Check | PASS/FAIL | Site |
|---|---|---|---|
| 2 | Export list: none of `extractCompoundAlternatives`, `extractSelectorSubject`, `extractBareTag`, `mergeCompoundTags`, `expandCompoundSelector`, `expandComplexSelector`, `dropTaglessCompounds` declared, exported, or named in comment in `tests/setupStyles.ts`; none imported or named in a case title in `tests/setupStyles.test.ts` | PASS | Grep for all seven names returned no matches in either file |
| 4 | No line >100 characters in `tests/setupStyles.ts` | PASS | `^.{101,}$` sweep of `tests/setupStyles.ts`: no matches |
| 4 | No TSDoc line >100 characters in `tests/setupStyles.test.ts` | PASS | `^.{101,}$` sweep found 40 hits, all `it('...', () => {` test-description lines (for example `setupStyles.test.ts:56`, `:105`, `:600`); none is a `/**`/`*` comment line |
| 4 | `tagless` (case-insensitive) absent from both files | PASS | No matches in either file |
| 4 | Substring `cannot pass as a permitted selector` absent from both files | PASS | No matches in either file (nor in `tests/` for `permitted selector` generally); the current text at `setupStyles.ts:868-869` reads "A construct the grammar does not carry is a different matter, because a reader would answer from a misreading of it rather than from the text" — a different sentence than the one claim 3's brief quotes as removed prose |
| 5 | No `: any`, `<any>`, `as any`, ` as ` outside `as const`, non-null `!`, `@ts-`, `eslint-disable`, `export default` in either file | PASS | ` as [a-zA-Z]` sweep: every hit is `] as const)` or prose inside a comment/string; `[a-zA-Z0-9_\)]!` sweep: the one hit is `1px!important` inside a CSS string literal at `setupStyles.test.ts:280`, not a non-null assertion |
| 5 | No `function` keyword or `=>` nested inside another function body, other than an anonymous callback argument | PASS | Every `function` hit in `setupStyles.ts` is a top-level `export function` declaration; nested `=>` usages found (`.some(...)`, `.flatMap(...)`) are anonymous callbacks passed as arguments |
| 5 | `tests/src/styles/index.test.ts` appears nowhere in the rendered diff and `tmp/audit/u3-status-9.txt` carries no row for it | FAIL | `tmp/audit/u3-status-9.txt:27` lists ` M tests/src/styles/index.test.ts`; `u3-diff-9.patch.txt:4176-4179` carries a full diff hunk (`diff --git a/tests/src/styles/index.test.ts b/tests/src/styles/index.test.ts`) for that file |
| 6 | Every path in `tmp/audit/u3-status-9.txt` is owned or granted by a brief in `u3-brief-4.md` through `u3-brief-12.md`, or is one of the two integrated patch sites | PASS | Traced every status row: `src/styles/**`, `src/core/{types,constants,index}.ts`, `tests/src/styles/**`, `tests/src/core/index.test.ts`, `tests/setupStyles*.ts`, `guides/{README,veneer}.md`, `README.md` owned by `u3-brief.md` §Scope; `tests/setup.ts`, `tests/setupBrowser*.ts`, `configs/src/vite.styles.config.ts`, `guides/README.md`/`README.md` sentence lines owned by `u3-brief-4.md` §Scope; `tests/setup.test.ts` owned by `u3-brief-5.md` §Scope ("plus `tests/setup.test.ts` (new)"); `tests/setupConformance.ts`/`tests/setupConformance.test.ts` owned by `u3-brief-7.md` §Scope ("plus … for item 8's addition alone"); `tests/distribution.test.ts` and `configs/src/vite.styles.config.ts` are the two named integrated patch sites |

## Claim 3 reader-list comparison

**Functions in `tests/setupStyles.ts` whose body calls `walkSelector`:** `trimCSSWhitespace` (`setupStyles.ts:722`), `extractSelectorIdentifiers` (`:957`), `splitTopLevelList` (`:985`), `normalizeComplexSelector` (`:1012`), `splitTopLevelCompounds` (`:1052`), `findGroupEnd` (`:1075`), `extractCompoundTags` (`:1108`), `scanUnreadForm` (`:1183`)

**Names the `walkSelector` TSDoc lists (`setupStyles.ts:830-841`), excluding `readIdentifier`:** `findGroupEnd`, `trimCSSWhitespace`, `splitTopLevelList`, `splitTopLevelCompounds`, `normalizeComplexSelector`, `extractSelectorIdentifiers`, `extractCompoundTags`, `scanUnreadForm`

The two sets are identical. Claim 3's reader-list check: **PASS**.

## Unowned path

None.
