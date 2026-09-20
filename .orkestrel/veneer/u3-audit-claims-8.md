# U3 audit round 8 — numbered claims (both lanes and the checker)

Subject: the U3 working tree in `C:/Users/mikes/WebstormProjects/veneer` after brief 11
(`.orkestrel/veneer/units/u3-brief-11.md`, report `units/u3-report-9.md`), on top of the round-7
tree the verdict `u3-audit-verdict-7.md` ruled on. Native Opus 5 wrote the unit, so the `analyst`
on Astra holds the OBJECTIVE lane and the `reviewer` on Opus the SUBJECTIVE lane and is told its
engine wrote the work. This file alone fixes the claim numbers. The Orchestrator rendered the diff
over `b661142` including every added file at `units/u3-diff-8.patch.txt` and the status at
`tmp/audit/u3-status-8.txt`. Rule on every claim with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and
the deciding evidence (`file:line` or exact text); read the rendered diff and the live files,
never the reports alone; execute a reading in memory where a claim names one. Rounds 2 to 7
confirmed everything outside the two files brief 11 touched (`tests/setupStyles.ts`,
`tests/setupStyles.test.ts`); re-read other sites only where a claim names them. Law: scaffold's
`AGENTS.md`, `.claude/rules/tests.md`, `architecture.md`, `names.md`, `typescript.md`,
`writing.md`, read from `C:/Users/mikes/WebstormProjects/scaffold`.

1. **Alternatives by expansion.** `expandComplexSelector` returns one compound sequence per
   selector an input stands for (`X:is(A, B) Y` as `X·A Y` and `X·B Y`, the alternative's
   rightmost compound merged into the host through `mergeCompoundTags`, which returns the shared
   tags or `undefined` for a compound selecting nothing); `dropTaglessCompounds` drops a compound
   naming no tag so its neighbours read as joined by the combinator reaching the later one;
   `matchesLooseTagPair` judges every expansion. Executed: `:is(h1 .x) p` true and `h1 .x p` true,
   `extractSelectorCompounds('h1 .x p')` is `h1` then `p` by the descendant combinator, `:is(h1 p)`
   true, `:is(.title > h1)+p` true, `:where(.title > h1)+p` true, `:is(details p) summary` true,
   `:is(details) summary` false, `:is(details .x) summary` false, `:is(h1,p)` false,
   `p:is(p, .lead)` false, `h1:is(p) + p` false, `h1:is(p) + p + span` false, `:is(h1 .x p)` true,
   `h1 :is(.x p)` true, `:is(h1)>:where(p)` true, `extractCompoundTags('h1:is(p)')` `[]`, and every
   reading reports 4 to 9 record still holds; each new reading is a case; the TSDoc of
   `expandComplexSelector`, `mergeCompoundTags`, `dropTaglessCompounds`, `extractCompoundTags`,
   and `matchesLooseTagPair` states the expansion rule as report 9 quotes it, and
   `expandCompoundSelector`'s TSDoc states the once-per-alternative limit for a compound writing
   more than one list.
2. **The `of` keyword.** `extractSelectorIdentifiers` lists a text's identifiers decoded through
   `readIdentifier` and none a quotation opens (`2n of .x` lists `2n`, `of`, `x`; `2n\ of .x` lists
   `2n of`, `x`; `2n \6f f .x` lists `2n`, `of`, `x`; `[a="of"]` lists `a`); `scanUnreadForm`
   names `of clause` when an `nth-*` argument's identifiers case-fold to `of`. Executed: each of
   `li:nth-child(2n \6f f .x) + p`, `li:nth-child(2n o\66 .x) + p`, `li:nth-child(2n \6f\66 .x)+p`,
   `li:nth-child(2n of.x) + p`, `li:nth-child(2n of[x])+p`, `li:nth-child(2n of:is(.x))+p`,
   `:is(li:nth-child(2n OF.x)) + p`, `:not(li:nth-child(2n of.x))` throws naming `of clause`;
   `li:nth-child(2n\ of .x)+p` true with no refusal, `li:nth-child(2n) + p` true,
   `li:nth-child(2n+1) + p` true, `li:nth-of-type(2n) + p` true; each is a case.
3. **The literal trim.** `trimCSSWhitespace` trims only whitespace the walk reads as syntax:
   `splitTopLevelList('h1\ ,p')` is `['h1\ ', 'p']`, `extractCompoundAlternatives(':is(h1\ ,p)')`
   is `['h1\ ', 'p']`, `extractCompoundTags(':is(h1\ ,p)')` is `['h1 ', 'p']`,
   `matchesLooseTagPair('details summary\ ')` true, `('details summary\<TAB>')` true,
   `('details :is(summary\ )')` true, `('details :is(summary)')` false, `trimCSSWhitespace('h1\ ')`
   unchanged, `('\f\t h1 \r\n')` `h1`, `('\u00A0h1\u00A0')` unchanged; each is a case.
4. **The sentences.** `walkSelector`'s TSDoc names every selector reader that reads through it,
   says a reader obtains an identifier from `readIdentifier`, carries no double negative, and
   names `normalizeSelectorText` as what collapses the scope selector before the
   `BOOTSTRAP_SCOPE_PATTERNS` match; no sentence in the two files gives software a faculty.
5. **Law over the diff.** In the two touched files: no `any`, non-null assertion, type assertion
   beyond `as const`, `@ts-` directive, `eslint-disable`, default export, nested function, or
   hidden or mutable module-scope declaration; readonly public shapes; every new export
   (`extractBareTag`, `mergeCompoundTags`, `dropTaglessCompounds`, `expandCompoundSelector`,
   `expandComplexSelector`, `extractSelectorIdentifiers`) named by the helper-prefix table and
   cased in `tests/setupStyles.test.ts`; the added prose sweeps clean under `writing.md` (no
   possessivized code token, no bare demonstrative, no tally over a growable set, no banned row,
   no time word); `tests/src/styles/index.test.ts` is unchanged and its elements-layer assertion
   reads the same list; the cascade's SHA-256 is unchanged
   (`8dc6e2f5d3dadfaacbd78921c5a7b7f53607eafa37fec4b3ac15e3c06db0d6c1`).
6. **Scope honesty.** `tmp/audit/u3-status-8.txt` lists exactly the files briefs 4 to 11 own or
   grant, the two integrated patch sites (`configs/src/vite.styles.config.ts`,
   `tests/distribution.test.ts`), and nothing else; the twelve `A` rows are U3's own new files,
   staged by the brief-10 writer and committed at landing by pathspec either way.
7. **Gates (ruled by the Orchestrator from the retained verifier report).** The whole chain exits
   0 on managed Chromium; `test:src:styles`, `test:src`, and `test:setup:browser` exit 0 on Edge;
   `test:distribution` green; `scaffold audit` reports no drift beyond the pending
   `@orkestrel/scaffold` re-pin.
