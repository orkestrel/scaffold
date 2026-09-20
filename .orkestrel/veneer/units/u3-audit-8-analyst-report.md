**1. REFUTED — expansion loses constraints.** The named readings pass, but the general expansion claim fails.

Separate alternative lists are flattened together at [setupStyles.ts:1090](/C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:1090). The tag reader unions their results at [setupStyles.ts:1176](/C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:1176). That contradicts the sentence “The subject’s own tag still meets every list’s” at [setupStyles.ts:1284](/C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:1284).

These executed inputs expose the disagreement.

| Reader and input | Required | Actual |
|---|---|---|
| Pair: `h1:is(p):is(h1) + p` | `false` | `true` |
| Pair: `h1:is(p):where(.x) + p` | `false` | `true` |
| Pair: `:is(h1):where(p) + span` | `false` | `true` |
| Pair: `:is(details):is(h1) summary` | `false` | `true` |
| Pair: `:is(details, h1):where(details) summary` | `false` | `true` |
| Tags: `h1:is(p):is(h1)` | `[]` | `['h1']` |
| Tags: `:is(h1):where(p)` | `[]` | `['h1','p']` |
| Tags: `:is(h1, p):is(p)` | `['p']` | `['h1','p']` |

Here, “Pair” means `matchesLooseTagPair`; “Tags” means `extractCompoundTags`.

Expansion also attaches the incoming combinator to the alternative’s earliest compound, rather than its subject, at [setupStyles.ts:1332](/C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:1332).

| Pair input | Required | Actual |
|---|---|---|
| `details + :is(.x summary)` | `true` | `false` |
| `details ~ :where(.x > summary)` | `true` | `false` |
| `details > :is(details summary)` | `false` | `true` |
| `details + summary` | `true` | `true` |
| `details :is(.x summary)` | `false` | `false` |

For the sibling input, the actual expansion is `details + .x summary`. Dropping `.x` then leaves the permitted `details summary` pair. The written-compound reader correctly retains `+` between `details` and `summary`.

Preserve the incoming relationship to the subject and intersect subject constraints across separate lists. The documented limitation on combining ancestor contexts doesn’t exempt subject-tag intersection.

The claim’s named pair readings held as follows.

| Input | Required | Actual |
|---|---|---|
| `:is(h1 .x) p` | `true` | `true` |
| `h1 .x p` | `true` | `true` |
| `:is(h1 p)` | `true` | `true` |
| `:is(.title > h1)+p` | `true` | `true` |
| `:where(.title > h1)+p` | `true` | `true` |
| `:is(details p) summary` | `true` | `true` |
| `:is(details) summary` | `false` | `false` |
| `:is(details .x) summary` | `false` | `false` |
| `:is(h1,p)` | `false` | `false` |
| `p:is(p, .lead)` | `false` | `false` |
| `h1:is(p) + p` | `false` | `false` |
| `h1:is(p) + p + span` | `false` | `false` |
| `:is(h1 .x p)` | `true` | `true` |
| `h1 :is(.x p)` | `true` | `true` |
| `:is(h1)>:where(p)` | `true` | `true` |

`extractSelectorCompounds('h1 .x p')` returns the required `h1` followed by `p` with the descendant combinator. `extractCompoundTags('h1:is(p)')` returns the required `[]`.

However, that exact tag reading has no assertion in [setupStyles.test.ts:510](/C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.test.ts:510). An in-memory mutation returning `['h1']` for that input leaves every extracted selector assertion passing. The claim that each reading became a case is therefore false.

**2. CONFIRMED — the identifier-based `of` fence held.** The scanner decodes identifiers and compares their lowercase text at [setupStyles.ts:1383](/C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:1383).

These identifier readings matched.

| Input | Required | Actual |
|---|---|---|
| `2n of .x` | `['2n','of','x']` | Same |
| `2n\ of .x` | `['2n of','x']` | Same |
| `2n \6f f .x` | `['2n','of','x']` | Same |
| `[a="of"]` | `['a']` | Same |

These pair readings matched. “Refuse `of clause`” means the thrown message names that form.

| Input | Required | Actual |
|---|---|---|
| `li:nth-child(2n \6f f .x) + p` | Refuse `of clause` | Same |
| `li:nth-child(2n o\66 .x) + p` | Refuse `of clause` | Same |
| `li:nth-child(2n \6f\66 .x)+p` | Refuse `of clause` | Same |
| `li:nth-child(2n of.x) + p` | Refuse `of clause` | Same |
| `li:nth-child(2n of[x])+p` | Refuse `of clause` | Same |
| `li:nth-child(2n of:is(.x))+p` | Refuse `of clause` | Same |
| `:is(li:nth-child(2n OF.x)) + p` | Refuse `of clause` | Same |
| `:not(li:nth-child(2n of.x))` | Refuse `of clause` | Same |
| `li:nth-child(2n\ of .x)+p` | `true`, no refusal | Same |
| `li:nth-child(2n) + p` | `true`, no refusal | Same |
| `li:nth-child(2n+1) + p` | `true`, no refusal | Same |
| `li:nth-of-type(2n) + p` | `true`, no refusal | Same |

The corresponding assertions are present at [setupStyles.test.ts:730](/C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.test.ts:730).

**3. REFUTED — the trim readings hold, but the promotion claim doesn’t.** The exact escaped-space alternative reading has no assertion among the calls at [setupStyles.test.ts:599](/C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.test.ts:599).

These executed readings matched. Quoted inputs preserve their trailing spaces; `<TAB>` denotes a tab.

| Reader and input | Required | Actual |
|---|---|---|
| `splitTopLevelList('h1\ ,p')` | `['h1\ ','p']` | Same |
| `extractCompoundAlternatives(':is(h1\ ,p)')` | `['h1\ ','p']` | Same |
| `extractCompoundTags(':is(h1\ ,p)')` | `['h1 ','p']` | Same |
| Pair: `'details summary\ '` | `true` | `true` |
| Pair: `'details summary\<TAB>'` | `true` | `true` |
| Pair: `'details :is(summary\ )'` | `true` | `true` |
| Pair: `'details :is(summary)'` | `false` | `false` |
| `trimCSSWhitespace('h1\ ')` | Unchanged | Unchanged |
| `trimCSSWhitespace('\f\t h1 \r\n')` | `h1` | `h1` |
| `trimCSSWhitespace('\u00A0h1\u00A0')` | Unchanged | Unchanged |

An in-memory mutation changed the alternatives result to `['h1\20','p']`. That violates the required raw-text result while preserving the decoded tags. Every extracted selector assertion still passed. Add the exact alternatives assertion.

**4. REFUTED — the reader inventory is incomplete.** The inventory at [setupStyles.ts:824](/C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:824) omits `extractBareTag`, which directly calls `walkSelector` at [setupStyles.ts:1119](/C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:1119).

The requested identifier sentence, removal of the double negative, and `normalizeSelectorText` exception are present. I found no software-faculty wording in the inspected TSDoc and test descriptions.

**5. REFUTED as worded — the prefix claim overstates the rule.** The prefix list at [names.md:91](/C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/names.md:91) names `extract*`, but doesn’t name `merge*`, `drop*`, or `expand*`. Therefore it doesn’t name every export listed in the claim.

That omission doesn’t itself prohibit those names: [names.md:85](/C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/names.md:85) permits descriptive `{verb}{Noun}` helpers. Correct the claim without inventing an exhaustive-prefix prohibition.

The remaining checks held:

- TypeScript AST inspection found none of the prohibited declarations, assertions, nested-function forms, or mutable interface properties named by the claim.
- The added exports have behavioral calls beyond their inventory entries.
- The prose sweep over changed TSDoc and test descriptions found no unconditional banned-term hit. The inspected `once`, `both`, and binary-arity wording uses the permitted senses.
- `tests/src/styles/index.test.ts` is byte-identical to its retained pre-brief-11 snapshot.
- The cascade’s elements selectors are `html` and `body`; the loose-pair result is `[]`; the whole cascade yields no grammar refusal.
- The measured SHA-256 is `8dc6e2f5d3dadfaacbd78921c5a7b7f53607eafa37fec4b3ac15e3c06db0d6c1`.

**6. CONFIRMED — the supplied status stays within the retained ownership.** The [status snapshot](/C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/u3-status-8.txt) equals the retained round-7 snapshot. Its paths match the rendered patch, including the staged additions. The ownership grants in the original brief and successor briefs cover those paths and the integrated configuration/distribution sites.

An in-memory comparison found no mismatch between the rendered patch’s resulting hunks and the live files. Committing by pathspec remains the stated landing action, rather than an action performed by this audit.

**7. REFUTED as worded — the gate results hold, but “no drift beyond” omits advisory output.** The retained [verifier report](/C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-gate-report-8.md:6) records exit `0` for the build/test chain, distribution, and the named Edge projects.

Its audit excerpt also reports:

> `@vitest/browser-playwright declares major 4, while the registry serves major 5.`

The excerpt contains corresponding notices for TypeScript and Vitest, alongside the scaffold re-pin; see [audit output](/C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-gate-report-8.md:20). Scaffold classifies these as non-blocking questions in [helpers.ts:389](/C:/Users/mikes/WebstormProjects/scaffold/src/bin/helpers.ts:389). Correct the claim to distinguish clean planned-file comparison, the blocking scaffold re-pin, and advisory dependency drift. This finding doesn’t require dependency upgrades in U3.

The additional grammar attacks produced the following readings. All inputs use `matchesLooseTagPair`; control characters are displayed symbolically.

| Input | Required | Actual |
|---|---|---|
| `svg\|a + p` | Refuse namespace separator | Same |
| `*\|a + p` | Refuse namespace separator | Same |
| `\|a + p` | Refuse namespace separator | Same |
| `[svg\|href] + p` | Refuse namespace separator | Same |
| `:is(.x, svg\|a)+p` | Refuse namespace separator | Same |
| `h1:has(>p)+p` | Refuse `:has()` argument | Same |
| `h1:h\61 s(p)+p` | Refuse `:has()` argument | Same |
| `:not(:where(h1:HAS(p)))` | Refuse `:has()` argument | Same |
| `li:nth-child(2n of .x)+p` | Refuse `of clause` | Same |
| `li:n\74h-child(2n \00006f\000066.x)+p` | Refuse `of clause` | Same |
| `li:nth-last-child(2n<FF>OF<CR>.x)+p` | Refuse `of clause` | Same |
| `h1/**/+p` | Refuse comment | Same |
| `:where(h1/*)*/ p)` | Refuse comment | Same |
| `h1/* ":has(p)" */+p` | Refuse comment | Same |
| `[lang\|=en] + p` | `false`, no refusal | Same |
| `h1\|a+p`¹ | `true`, no refusal | Same |
| `h1[data-x="\| /* :has(p) of"] + p` | `true`, no refusal | Same |
| `[data-x=":has(p) /* \| of"] + p` | `false`, no refusal | Same |
| `li:nth-child(2n [a="of"])+p` | `true`, no refusal | Same |
| `h1\/\*p` | `false` | `false` |
| `:is(:where(h1 .x)) p` | `true` | `true` |
| `:is(h1:is(p)) + p` | `false` | `false` |
| `:is(h1:is(p), .x) + p` | `false` | `false` |
| `:where(h1:is(p), details) summary` | `false` | `false` |
| `details<TAB>summary` | `false` | `false` |
| `details<LF>summary` | `false` | `false` |
| `details<CR>summary` | `false` | `false` |
| `details<FF>summary` | `false` | `false` |
| `details<NBSP>summary` | `false` | `false` |
| `'details summary\<FF>'` | `true` | `true` |
| `'details :where(summary\ )'` | `true` | `true` |
| `h1[title="\"),\|/*:has(p)"] + p` | `true` | `true` |
| `[title="a\" b"] p` | `false` | `false` |
| `h1[title=":is(p),x"]` | `false` | `false` |
| `\000064etails \000073ummary` | `false` | `false` |
| `h1\2b p` | `false` | `false` |
| `h1\2b  p` | `true` | `true` |
| `:i\73(h1 .x) p` | `true` | `true` |

¹ This input contains a literal backslash escaping the pipe. The namespace rows contain unescaped pipes; Markdown escapes their table delimiters.

I executed the retained selector readings against the live functions in memory. Their output exactly matched the retained [input/result transcript](/C:/Users/mikes/WebstormProjects/veneer/tmp/u3/after-11.txt). The additional retained group reading `findGroupEnd(':is(.title[title="("], h1)', 3)` required and returned `25`. The extracted live selector assertions passed; an in-memory control forcing the pair reader to return `false` made them fail. These runs establish reader behavior, not browser-gate execution. No command wrote files.

No substantiated finding falls outside the numbered claims.

Verdict: fix round with claims 1, 3, 4, 5, and 7.