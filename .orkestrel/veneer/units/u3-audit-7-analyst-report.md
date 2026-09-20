1. **CONFIRMED — The promoted readings.** The cases exist at [tests/setupStyles.test.ts:425](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.test.ts:425), `:515`, and `:574`. Executing the live functions in memory produced these results.

   | Reader and input | Required | Actual |
   |---|---|---|
   | `matchesLooseTagPair('h1\64 p')` | `false` | `false` |
   | `matchesLooseTagPair('h1\64x p')` | `true` | `true` |
   | `extractCompoundTags('h1\+p')` | `['h1+p']` | `['h1+p']` |
   | `readEscape('\D800', 0)` | U+FFFD, span 5 | U+FFFD, span 5 |
   | `readEscape('\110000', 0)` | U+FFFD, span 7 | U+FFFD, span 7 |
   | `readEscape('\10FFFF', 0)` | U+10FFFF, span 7 | U+10FFFF, span 7 |

2. **CONFIRMED — The quoted-text boundary.** `SelectorStep.quoted` is readonly at [tests/setupStyles.ts:792](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:792). The guard at `:896` precedes escape decoding. The cases at `tests/setupStyles.test.ts:396`, `:405`, and `:444` execute successfully.

   | Input | Required | Actual |
   |---|---|---|
   | `readIdentifier(walkSelector('[a="\64"]'), 4)` | `undefined` | `undefined` |
   | `readIdentifier(walkSelector('[a="d"]'), 4)` | `undefined` | `undefined` |
   | `readIdentifier(walkSelector('a"b"'), 0)` | `{text:'a', end:1}` | `{text:'a', end:1}` |
   | `walkSelector('h1\"p').map(step => step.quoted)` | All `false` | All `false` |

3. **CONFIRMED — CSS whitespace.** The predicate at [tests/setupStyles.ts:704](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:704) recognizes exactly the named characters. The selector-function source contains neither a `\s` expression nor a `.trim()` call. Escape termination, normalization, compound splitting, and list trimming call the CSS-whitespace helpers.

   In this table, `<NBSP>` denotes U+00A0.

   | Reader and input | Required | Actual |
   |---|---|---|
   | `matchesCSSWhitespace` on space, tab, LF, CR, FF individually | `true` | `true` |
   | Same predicate on U+00A0, U+2028, `x` individually | `false` | `false` |
   | `trimCSSWhitespace('\f\t h1 \r\n')` | `h1` | `h1` |
   | `trimCSSWhitespace('<NBSP>h1<NBSP>')` | Unchanged | Unchanged |
   | Pair reader: `det\61<NBSP>ils summary` | `true` | `true` |
   | Pair reader: `h1<NBSP>p` | `false` | `false` |
   | Pair reader: `h1 p` | `true` | `true` |
   | Normalizer: `h1<NBSP>p` | Unchanged | Unchanged |
   | Compound splitter: `h1<NBSP>p` | `['h1<NBSP>p']` | Same |
   | List splitter: `h1<NBSP>, p` | `['h1<NBSP>', 'p']` | Same |
   | Tag reader: `det\61<NBSP>ils` | `['deta<NBSP>ils']` | Same |
   | Escape reader: `det\61<NBSP>ils` at 3 | `{text:'a', length:3}` | Same |
   | Identifier reader: that input at 0 | `{text:'deta<NBSP>ils', end:10}` | Same |

   Finding 10 concerns trimming escaped whitespace, which this claim’s character-class readings do not cover.

4. **REFUTED — Complex alternatives.** The parenthetical claiming `h1 .x p` returns `false` is wrong. It returns `true`. [tests/setupStyles.ts:1128](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:1128) drops the tagless `.x` compound; the pair reader then compares `h1` with `p`. The TSDoc at `:1111` explicitly documents that behavior.

   | Pair-reader input | Required by claim | Actual |
   |---|---|---|
   | `:is(h1 p)` | `true` | `true` |
   | `:is(.title > h1)+p` | `true` | `true` |
   | `:where(.title > h1)+p` | `true` | `true` |
   | `:is(details p) summary` | `true` | `true` |
   | `:is(details) summary` | `false` | `false` |
   | `:is(h1,p)` | `false` | `false` |
   | `:is(h1 .x) p` | `false` | `false` |
   | `h1 .x p` | `false` | **`true`** |

   The other named structure readings hold:

   | Reader and input | Required | Actual |
   |---|---|---|
   | Alternatives: `:is(h1, p):where(.title > h1)` | `['h1','p','.title > h1']` | Same |
   | Alternatives: `:not(h1)` | `[]` | `[]` |
   | Alternatives: `[title=':is(h1)']` | `[]` | `[]` |
   | Subject: `.title > h1` | `['h1']` | `['h1']` |
   | Subject: `details p` | `['p']` | `['p']` |
   | Subject: `h1 .x` | `[]` | `[]` |
   | Subject: `h1 >` | `[]` | `[]` |

   The retained readings hold. `tests/src/styles/index.test.ts` matches the pre-brief-10 snapshot byte-for-byte. Parsing the built elements layer gives `['html','body']`; filtering through the pair reader gives `[]`.

   **Smallest correction:** correct the claim’s parenthetical. Changing the implementation to require adjacent tag-naming compounds would contradict its documented behavior.

5. **CONFIRMED — The sentence.** [tests/setupStyles.ts:821](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:821) states the closed grammar. Lines `:817–819` name the `BOOTSTRAP_SCOPE_PATTERNS` exception. The identifier, list, normalizer, compound, group, alternative, and fence documentation refer to the shared grammar. This confirms the documentation’s presence; claim 6 separately tests its enforcement.

6. **REFUTED — The fence.** [tests/setupStyles.ts:1171](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:1171) compares raw whitespace-separated strings against `'of'`. It neither decodes the keyword nor recognizes its boundary before selector punctuation.

   Every input in this table requires an exception naming `of clause`. Every scanner call instead returns `undefined`.

   | Input | Required pair-reader result | Actual |
   |---|---|---|
   | `li:nth-child(2n \6f f .x) + p` | Throw `of clause` | `true` |
   | `li:nth-child(2n o\66 .x) + p` | Throw `of clause` | `true` |
   | `li:nth-child(2n \6f\66 .x)+p` | Throw `of clause` | `true` |
   | `li:nth-child(2n of.x) + p` | Throw `of clause` | `true` |
   | `li:nth-child(2n of[x])+p` | Throw `of clause` | `true` |
   | `li:nth-child(2n of:is(.x))+p` | Throw `of clause` | `true` |
   | `:is(li:nth-child(2n OF.x)) + p` | Throw `of clause` | `true` |
   | `:not(li:nth-child(2n of.x))` | Throw `of clause` | `false` |

   The installed Sass compiler accepts the escaped keyword and punctuation-boundary forms. For example, `li:nth-child(2n \6f f .x)+p` compiles in memory to `li:nth-child(2n of .x) + p`. These are valid forms, consistent with the [Selectors grammar](https://www.w3.org/TR/selectors-4/#nth-child-pseudo) and [CSS identifier escape rules](https://www.w3.org/TR/css-syntax-3/#consume-an-ident-sequence).

   The following refusal attacks held. Each actual exception has the form `matchesLooseTagPair reads no FORM: INPUT`.

   | Input | Required form | Actual form |
   |---|---|---|
   | `svg|a + p` | Namespace separator | Namespace separator |
   | `:is(svg|a)+p` | Namespace separator | Namespace separator |
   | `[svg|title=x]+p` | Namespace separator | Namespace separator |
   | `*|h1+p` | Namespace separator | Namespace separator |
   | `|h1+p` | Namespace separator | Namespace separator |
   | `h1:has(p) + p` | `:has()` argument | `:has()` argument |
   | `h1:HAS(p) + p` | `:has()` argument | `:has()` argument |
   | `:is(h1:has(p)) + p` | `:has()` argument | `:has()` argument |
   | `:not(:HAS(p))+h1` | `:has()` argument | `:has()` argument |
   | `h1:h\61 s(p)+p` | `:has()` argument | `:has()` argument |
   | `:where(:is(h1:HaS(p)))` | `:has()` argument | `:has()` argument |
   | `li:nth-child(2n of .x) + p` | `of clause` | `of clause` |
   | `li:nth-last-child(2n OF .x)` | `of clause` | `of clause` |
   | `li:nth-last-child(2n<TAB>OF<LF>.x)+p` | `of clause` | `of clause` |
   | `h1 /* c */ + p` | Comment | Comment |
   | `:is(h1/*x*/)+p` | Comment | Comment |

   The neighboring controls also held:

   | Input | Required | Actual |
   |---|---|---|
   | `[title|="x"] + p` | `false`, no exception | Same |
   | `[title='a|b'] + p` | `false`, no exception | Same |
   | `[title="/*|:has(2n of .x)"]+p` | `false`, no exception | Same |
   | `[title='a|b /* c */ :has('] + p` | `false`, no exception | Same |
   | `h1\|a+p` | `true`, no exception | Same |
   | `li:nth-child(2n) + p` | `true`, no exception | Same |
   | `li:nth-child(2n+1) + p` | `true`, no exception | Same |
   | `h1:not(p) + p` | `true`, no exception | Same |
   | `li:nth-child(2n\ of .x)+p` | No `of`-clause refusal | No refusal; `true` |

   **Smallest correction:** recognize the decoded `of` identifier and its token boundary in the argument. Preserve the quoted, escaped-punctuation, and attribute-operator controls.

7. **REFUTED — Law over the diff.** The prose arm fails at [tests/setupStyles.ts:816](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:816): “A reader wanting an identifier”. [writing.md:17](C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/writing.md:17) explicitly prohibits giving software human faculties, including wanting. Replace that phrase with a statement that the reader obtains an identifier through `readIdentifier`.

   The structural arms held under TypeScript AST inspection: no prohibited assertions, `any`, nested function declarations or assignments, hidden declarations, mutable module bindings, suppressions, or default exports. The public shapes are readonly. The added helpers have the required names and behavioral cases.

   The measured cascade SHA-256 is exactly:

   ```text
   8dc6e2f5d3dadfaacbd78921c5a7b7f53607eafa37fec4b3ac15e3c06db0d6c1
   ```

8. **CONFIRMED — Scope honesty.** Every path in [u3-status-7.txt](C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/u3-status-7.txt) falls within the original scope inherited by brief 4, the grants in briefs 4, 5, and 7, or the named integration sites. Reconstructing the supplied patch over `b661142` entirely in memory matched every listed live file, including the added files. No patch path falls outside that status population.

9. **UNDECIDABLE — Gates.** No `u3-gate-report-7.md` is retained. The available verifier record ends at [u3-gate-report-6.md](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-gate-report-6.md), which predates brief 10. Report 8 is the writer’s evidence and explicitly leaves distribution verification to the Orchestrator. A retained verifier report over the audited tree must settle this claim. No write-producing gate was run in this audit.

10. **Additional finding — List trimming removes escaped identifier text.** At [tests/setupStyles.ts:932](C:/Users/mikes/WebstormProjects/veneer/tests/setupStyles.ts:932), `splitTopLevelList` passes each item to `trimCSSWhitespace`, which removes trailing whitespace without consulting the walk’s `literal` state. This changes the decoded identifier and can incorrectly admit a mandated pair.

    Here, `␠` marks a literal space and `<TAB>` marks a tab.

    | Reader and input | Required | Actual |
    |---|---|---|
    | List splitter: `h1\␠,p` | `['h1\␠','p']` | `['h1\','p']` |
    | Tag reader: `:is(h1\␠,p)` | `['h1␠','p']` | `['h1','p']` |
    | Pair reader: `details summary\␠` | `true` | `false` |
    | Pair reader: `details summary\<TAB>` | `true` | `false` |
    | Pair reader: `details :is(summary\␠)` | `true` | `false` |
    | Control: `details :is(summary)` | `false` | `false` |
    | Direct tag-reader control: `h1\␠` | `['h1␠']` | `['h1␠']` |

    The nested form survives an in-memory Sass compile and PostCSS read unchanged, then still returns `false`. The direct tag-reader control localizes the defect to list trimming.

    **Smallest correction:** trim only syntactic boundary whitespace in the list reader. Preserve whitespace belonging to an escape. The general character-class predicate need not change.

The remaining attacks and retained selector readings held. The following tables group inputs only when each independently has the same required and actual result.

| Pair-reader inputs | Required | Actual |
|---|---|---|
| `h1+p`; `h1 + p`; `details + summary`; `:is(h1)+:is(p)` | `true` | `true` |
| `:is(.title,h1)+p`; `:is(h1,:where(.title))+p`; `:is(h1:not(.x), p) + p` | `true` | `true` |
| `:is(.title[title="("], h1)+p`; `:is(.title[title="x"], h1)+p` | `true` | `true` |
| `details-card summary`; `details_card summary`; `details\-card summary`; `det\ails summary` | `true` | `true` |
| `:IS(h1)+p`; `:is(h1)+p`; `:i\73(h1)+p`; `:W\48 ERE(:IS(h1),:where(p))+p` | `true` | `true` |
| `:is([title="),>+~"],:where(h1))+p`; `:is(h1 .x p)`; `h1 :is(.x p)`; `:is(h1)>:where(p)` | `true` | `true` |
| `details summary`; `details > summary`; `detai\ls summary`; `\64 etails s\75 mmary`; `DETAILS SUMMARY` | `false` | `false` |
| `h1, p`; `:is(h1, p)`; `:where(h1, p)`; `body`; `:root` | `false` | `false` |
| `[title=':is(h1)'] + p`; `h1[title="("], p`; `h1[title="x"], p` | `false` | `false` |
| `h1\+p`; `h1\␠,p`; `h1[title="+ ~ > , :IS(p)"]`; `:not(:IS(h1))+p` | `false` | `false` |
| `:is(h1\␠,p)+p` | `true` | `true` |

The retained structure-reader results were also reproduced:

| Reader | Inputs | Required = actual |
|---|---|---|
| Tag reader | `h1`; `:is(h1)`; `:is(.title,h1)`; `:is(h1,:where(.title))`; `:IS(h1)` | `['h1']` |
| Tag reader | `P.lead`; `:where( p )`; `p:is(p, .lead)`; `:is(details p)` | `['p']` |
| Tag reader | `:is(h1, p)`; `:where(h1, p)`; `:is(h1, :where(p, .title))`; `:is(h1:not(.x), p)`; `:WHERE(h1, p)` | `['h1','p']` |
| Tag reader | `:not(h1)`; `:not(:is(h1))`; `:NOT(h1)`; `:root`; `.card:hover::after`; `[data-bs-theme='dark']`; `[title=':is(h1)']`; `:is(h1 .x)` | `[]` |
| Tag reader | `:is(.title[title="("], h1)`; `:is(.title[title="x"], h1)`; `:is(.title > h1)` | `['h1']` |
| Tag reader | `details-card` | `['details-card']` |
| Tag reader | `details`; `detai\ls`; `\000064etails` | `['details']` |
| Tag reader | `det\ails` | `['det\nils']` |
| Tag reader | `h1\64 p` | `['h1dp']` |
| Normalizer | `h1+p` | `h1 + p` |
| Normalizer | `details   >   summary` | `details > summary` |
| Normalizer | ` details summary ` | `details summary` |
| Normalizer | `:is(h1, h2)+p`; `:is(h1,  p)+p` | Corresponding input with ` + p`; interior spacing preserved |
| Normalizer | `[title="a  b"] + p`; `[title="a b"] + p`; `h1\+p`; `h1\ p`; `h1<U+2028>p` | Unchanged |
| Compound splitter | `:is(h1, p) + p` | `[':is(h1, p)','+','p']` |
| Compound splitter | `.card h1 ~ p` | `['.card','h1','~','p']` |
| Compound splitter | `[title='a b'] p` | `["[title='a b']", 'p']` |
| Compound splitter | `[title="a\" b"] p` | `['[title="a\" b"]','p']` |
| Compound splitter | `h1`; `h1\ p`; `h1\+p`; `h1<U+2028>p` | Each input remains a whole compound |
| Compound splitter | Spaces only | `[]` |
| List splitter | `h1[title="("], p`; `h1[title="x"], p`; `.title[title="("], h1` | Split at the comma outside quotation |
| List splitter | `h1[title="a,b"] p`; `:is(h1, h2) + p` | Each input remains whole |
| List splitter | `a, , b` | `['a','b']` |
| List splitter | `rgba(0, 0, 0, 0.5) 0 1px, #fff 0 2px` | `['rgba(0, 0, 0, 0.5) 0 1px','#fff 0 2px']` |
| Group end | `:is(h1)` at 3 | `6` |
| Group end | `:is(h1,:where(.title))` at 3 | `21` |
| Group end | `[title=')']` at 0 | `10` |
| Group end | `[title="a\"]"]` at 0 | `13` |
| Group end | `:is(h1` at 3 | `6` |
| Group end | `:is(.title[title="("], h1)` at 3 | `25` |

The remaining escape and identifier boundaries held:

| Reader and input | Required = actual |
|---|---|
| Escape: `h1\+p` at 2 | `{text:'+', length:2}` |
| Escape: `detai\ls` at 5 | `{text:'l', length:2}` |
| Escape: `det\ails` at 3 | `{text:'\n', length:2}` |
| Escape: `h1\64 p` at 2 | `{text:'d', length:4}` |
| Escape: `h1\64x` at 2 | `{text:'d', length:3}` |
| Escape: `\0` at 0 | U+FFFD, span 2 |
| Escape: trailing backslash in `h1\` at 2 | Empty text, span 1 |
| Escape: `\1F600␠` at 0 | U+1F600, span 7 |
| Escape: backslash followed by U+1F600 | U+1F600, span 3 |
| Identifier: `details-card` at 0 | `{text:'details-card', end:12}` |
| Identifier: `detai\ls` at 0 | `{text:'details', end:8}` |
| Identifier: `det\ails` at 0 | `{text:'det\nils', end:8}` |
| Identifier: `h1\64 p` at 0 | `{text:'h1dp', end:7}` |
| Identifier: `:is(h1)` at 1 | `{text:'is', end:3}` |
| Identifier: `:IS(h1)` at 1 | `{text:'IS', end:3}` |
| Identifier: `.title` at 0; `[a="x"]` at 4 | `undefined` |
| Identifier: `h1\"p` at 0 | `{text:'h1"p', end:5}` |

For space, tab, LF, CR, and FF individually, `h1<character>p` normalizes to `h1 p`; `readEscape('\64<character>p', 0)` returns `{text:'d', length:4}`. U+2028 remains identifier text in the normalizer, compound splitter, and tag reader.

The walker’s retained depth, literal, and quoted arrays matched their assertions, including unterminated strings, unclosed groups, quoted delimiters, escaped quotation marks, and hexadecimal escape terminators. The in-memory comparison control deliberately expected `false` for `h1 p`; it reported the mismatch against actual `true`. These executions establish runtime readings, not gate results.

Verdict: fix round — claims 4, 6, 7 and finding 10; claim 9 remains UNDECIDABLE.