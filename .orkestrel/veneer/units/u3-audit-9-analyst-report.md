<!-- codex exec, gpt-6-astra, read-only; journal u3-audit-9-analyst.jsonl (retained as units/u3-audit-9-analyst.jsonl is not kept: journals are ephemeral); thread 01a0c009-13ba-7a00-87c8-c15379389291; exit 0; retained 2026-09-20 -->

1. **REFUTED — functional-list behavior holds; the claimed cases are missing.** Every named input produced its required result. However, the refusal case at [setupStyles.test.ts:600](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.test.ts:600) contains neither `:is(.title > h1)+p` nor `:is(h1:has(p)) + p`. Searching the live `tests` tree also found neither input. Add their assertions; the implementation already returns the required errors.

2. **REFUTED — retained readings hold; “each is a case” is false.** The in-memory replay matched every row of the [retained reading record](C:/Users/mikes/WebstormProjects/veneer/tmp/u3/after-12.txt). The deleted exports are absent, and the leading-tag and compound readings hold. However, [report 10:150](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-report-10.md:150) claims case coverage that the live suite lacks. Concrete examples are:
   - `matchesLooseTagPair('h1\2b p')`: required `false`, actual `false`, no assertion.
   - `matchesLooseTagPair('h1\2b  p')`: required `true`, actual `true`, no assertion.
   - `matchesLooseTagPair(':not(h1) + p + span')`: required `true`, actual `true`, no assertion.
   - `matchesLooseTagPair('details summary\<FF>')`: required `true`, actual `true`, no assertion.

   The corresponding existing cases are at [setupStyles.test.ts:469](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.test.ts:469) and [setupStyles.test.ts:568](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.test.ts:568). Promote the retained readings without changing their behavior.

3. **CONFIRMED — reader list and grammar agree with the code.** An AST inspection found these direct callers: `trimCSSWhitespace`, `extractSelectorIdentifiers`, `splitTopLevelList`, `normalizeComplexSelector`, `splitTopLevelCompounds`, `findGroupEnd`, `extractCompoundTags`, and `scanUnreadForm`. The closed list at [setupStyles.ts:829](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:829) names those readers plus `readIdentifier`, which accepts the steps. The grammar paragraph names the required constructs and fence.

4. **CONFIRMED — prose requirements hold.** The TSDoc scan found no line exceeding 100 columns and no `tagless` occurrence in either file. The replacement at [setupStyles.ts:1180](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:1180) reads: “so every selector it judges is one this grammar reads whole.” The writing sweep’s hits were permitted senses: numerical `below`, frequency `once`, named pairs using `both`, and conditional `as soon as`.

5. **CONFIRMED — the enumerated code constraints hold.** AST inspection of the touched files found no prohibited assertion, `any`, nested declaration, assigned nested function, hidden module declaration, mutable module binding, or non-readonly interface member. The export inventory assertion executed successfully; behavioral cases exercise the surviving exports. `tests/src/styles/index.test.ts` is byte-identical to its pre-brief-12 snapshot. The measured cascade SHA-256 is:
   `8dc6e2f5d3dadfaacbd78921c5a7b7f53607eafa37fec4b3ac15e3c06db0d6c1`.

6. **CONFIRMED — scope matches the retained baseline.** [Round-9 status](C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/u3-status-9.txt) equals [round-8 status](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-status-8.txt) byte-for-byte. Comparing the rendered patch sections found changes only in `tests/setupStyles.ts` and `tests/setupStyles.test.ts`. The retained ownership grants cover the status population and integrated patch sites.

7. **UNDECIDABLE — independent gate evidence for this tree is missing.** The retained verifier reports end at [u3-gate-report-8.md](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-gate-report-8.md). That report supports the preceding tree’s gate results and audit explanation. Report 10 supplies the writer’s results for this tree, which cannot establish independent verification. Retain the round-9 verifier report to settle this claim.

The readings ran against live TypeScript compiled only in memory. The existing selector assertions also executed in memory. A deliberately incorrect `h1+p → false` assertion failed, confirming that the comparison instrument rejects a wrong answer.

The claim-named pair readings returned the following results. `functional list` means an exception naming that form.

| Input | Required | Actual |
|---|---|---|
| `:is(h1, p)` | functional list | functional list |
| `:where(h1)+p` | functional list | functional list |
| `:IS(h1)+p` | functional list | functional list |
| `:i\73(h1)+p` | functional list | functional list |
| `:not(:is(h1))+p` | functional list | functional list |
| `:is(.title > h1)+p` | functional list | functional list |
| `:is(h1:has(p)) + p` | functional list | functional list |
| `:not(h1)+p` | `false` | `false` |
| `h1:not(p) + p` | `true` | `true` |
| `[title=':is(h1)'] + p` | `false` | `false` |
| `h1[data-x=":is("] + p` | `true` | `true` |

The remaining claim-named readers returned these results.

| Reader and input | Required | Actual |
|---|---|---|
| `extractCompoundTags('h1:not(p)')` | `['h1']` | `['h1']` |
| `extractCompoundTags('h1:nth-child(2n)')` | `['h1']` | `['h1']` |
| `extractCompoundTags('h1:is(p)')` | `['h1']` | `['h1']` |
| `extractCompoundTags(':not(h1)')` | `[]` | `[]` |
| `extractSelectorCompounds('h1 .x p')` | `h1`, then `p` through descendant | Same |
| `extractSelectorCompounds('h1 .x > p')` | `h1`, then `p` through child | Same |
| `extractSelectorCompounds('.card h1 ~ p')` | `h1` starts; `p` through sibling | Same |

The cascade reading returned `['html', 'body']` for the elements-layer selectors, `[]` for loose pairs, and `[]` for grammar refusals across the whole cascade.

The additional pair-reader attacks returned the following results. `<TAB>`, `<LF>`, `<CR>`, `<FF>`, and `<NBSP>` denote the corresponding characters; backslashes are literal CSS escapes.

| Input | Required | Actual |
|---|---|---|
| `*\|a+p` | Throw namespace separator | Same |
| `\|a+p` | Throw namespace separator | Same |
| `h1 [svg\|href]+p` | Throw namespace separator | Same |
| `h1:not(:h\61 s(> p))+p` | Throw `:has()` argument | Same |
| `li:n\74 h-child(2n \6f\66.x)+p` | Throw `of clause` | Same |
| `h1/**/+p` | Throw comment | Same |
| `h1/* ":is(h1)" */+p` | Throw comment | Same |
| `h1:where(.x > p, .y + h2)+p` | Throw functional list | Same |
| `h1:not(:W\48 ERE(.x > p))+p` | Throw functional list | Same |
| `h1[title=":is(h1), :has(p), svg\|a, /*"]+p` | `true` | `true` |
| `h1\:is\(p\)+span` | `true` | `true` |
| `details<TAB><LF><CR><FF> ><TAB> summary` | `false` | `false` |
| `h1<NBSP>p` | `false` | `false` |
| `h1[title="a\"], :is(p)"]+p` | `true` | `true` |
| `details summary\ ` | `true` | `true` |
| `\000064etails \000073ummary` | `false` | `false` |
| `h1, p > span` | `true` | `true` |
| `details > summary, ul > li` | `false` | `false` |
| `:not(h1 .x > p)+span` | `false` | `false` |
| `details_card summary` | `true` | `true` |
| `details\-card summary` | `true` | `true` |
| `det\61<CR><LF>ils summary` | `true` | `true` |

The additional lower-reader attacks also held.

| Reader and input | Required | Actual |
|---|---|---|
| `scanUnreadForm(':is(.title > h1) + p')` | `functional list` | Same |
| `scanUnreadForm(':is(h1:has(p)) + p')` | `functional list` | Same |
| `scanUnreadForm(':not(:W\48 ERE(.title > h1))')` | `functional list` | Same |
| `extractCompoundTags('\000064etails')` | `['details']` | Same |
| `readIdentifier(walkSelector('det\61<NBSP>ils'), 0)` | `{text:'deta<NBSP>ils', end:10}` | Same |
| `readIdentifier(walkSelector('[title="\000064"]'), 8)` | `undefined` | Same |
| `extractSelectorIdentifiers('[title="of :is(h1)"]')` | `['title']` | Same |
| `splitTopLevelCompounds('h1<TAB>><LF>p')` | `['h1','>','p']` | Same |
| `splitTopLevelList('.title[title="("], h1')` | `['.title[title="("]','h1']` | Same |
| `splitTopLevelList('h1[title="a,b"], p:not(.a, .b), details > summary')` | The written complex selectors, with internal commas retained | Same |
| `normalizeComplexSelector(' h1[title="a  b"]<TAB>+<LF> p:not(.a,  .b) ')` | `h1[title="a  b"] + p:not(.a,  .b)` | Same |
| `findGroupEnd('[title="\"]"]', 0)` | `12` | `12` |

Raw CRLF escape inputs reproduce the previously excluded preprocessing discrepancy. CSS preprocessing collapses CRLF before escape consumption. See [CSS Syntax preprocessing](https://www.w3.org/TR/css-syntax-3/#input-preprocessing).

| Raw input | CSS reading requires | Raw reader returns | Installed Sass path |
|---|---|---|---|
| `:i\73<CR><LF>(h1)+p` | Throw functional list | `false` | Refuses: `expected selector.` |
| `:h\61<CR><LF>s(p)+p` | Throw `:has()` argument | `true` | Refuses: `expected selector.` |
| `h1\2b<CR><LF>p` | `false` | `true` | Emits `h1\+ p`; reader returns `true` |
| `li:nth-child(2n o\66<CR><LF>.x)+p` | Throw `of clause` | Throws `of clause` | Emits `li:nth-child(2n of .x) + p`; reader throws |

The [round-6 ruling](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u3-audit-verdict-6.md) already excludes that raw-input boundary. These readings do not reopen it.

No additional substantiated in-scope findings.

Verdict: fix round with claims 1, 2, 7.