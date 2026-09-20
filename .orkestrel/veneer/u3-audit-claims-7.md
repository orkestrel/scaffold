# U3 audit round 7 — numbered claims (both lanes and the checker)

Subject: the U3 working tree in `C:/Users/mikes/WebstormProjects/veneer` after brief 10
(`.orkestrel/veneer/units/u3-brief-10.md`, report `units/u3-report-8.md`), on top of the round-6
tree the verdict `u3-audit-verdict-6.md` ruled on. Native Opus 5 wrote the unit, so the `analyst`
on Astra holds the OBJECTIVE lane and the `reviewer` on Opus the SUBJECTIVE lane and is told its
engine wrote the work. This file alone fixes the claim numbers. The Orchestrator rendered the diff
over `b661142` including every untracked file at `units/u3-diff-7.patch.txt` and the status at
`tmp/audit/u3-status-7.txt`. Rule on every claim with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and
the deciding evidence (`file:line` or exact text); read the rendered diff and the live files,
never the reports alone; execute a reading in memory where a claim names one. Rounds 2 to 6
confirmed everything outside the two files brief 10 touched (`tests/setupStyles.ts`,
`tests/setupStyles.test.ts`); re-read other sites only where a claim names them. Law: scaffold's
`AGENTS.md`, `.claude/rules/tests.md`, `architecture.md`, `names.md`, `typescript.md`,
`writing.md`, read from `C:/Users/mikes/WebstormProjects/scaffold`.

1. **The promoted readings.** `tests/setupStyles.test.ts` carries, as cases, `matchesLooseTagPair`
   over `h1\64 p` (false) and `h1\64x p` (true), `extractCompoundTags('h1\+p')` (`['h1+p']`), and
   `readEscape` over `\D800` and `\110000` (U+FFFD, spans 5 and 7) and `\10FFFF` (U+10FFFF, span
   7); each holds when executed.
2. **The quoted-text boundary.** `SelectorStep` carries `quoted` (the walk's primitive) beside
   `literal`; `readIdentifier` returns `undefined` for a start on a quoted step and ends an
   identifier where the quotation opens: `readIdentifier(walkSelector('[a="\64"]'), 4)` is
   `undefined`, `('[a="d"]', 4)` is `undefined`, `('a"b"', 0)` is `{ text: 'a', end: 1 }`;
   `walkSelector('h1\"p')` marks no step quoted; each is a case.
3. **CSS whitespace.** `matchesCSSWhitespace` names space, tab, line feed, carriage return, and
   form feed and refuses U+00A0 and U+2028; `trimCSSWhitespace` trims those alone; the escape
   terminator, the normalizer's collapsing, the compound splitter's separators, and the list
   splitter's trim read CSS whitespace, and no selector reader in `tests/setupStyles.ts` uses
   `\s` or `trim()` (the declaration-value readers `splitTopLevelValues` and
   `normalizeValueToken` are outside the selector grammar and may). Executed:
   `matchesLooseTagPair('det\61\u00A0ils summary')` true, `('h1\u00A0p')` false, `('h1 p')` true;
   `normalizeComplexSelector('h1\u00A0p')` unchanged; `splitTopLevelCompounds('h1\u00A0p')` one
   compound; `splitTopLevelList('h1\u00A0, p')` is `['h1\u00A0', 'p']`;
   `extractCompoundTags('det\61\u00A0ils')` is `['deta\u00A0ils']`; each is a case.
4. **Complex alternatives.** `extractCompoundAlternatives` lists the complex selectors an
   `:is()`/`:where()` argument carries (and none for `:not()` or a quoted `:is`);
   `extractSelectorSubject` reads a complex selector's rightmost compound's tags (`.title > h1`
   is `['h1']`, `details p` is `['p']`, `h1 .x` is `[]`); `matchesLooseTagPair` counts a pair
   inside an alternative and pairs an alternative's subject with the enclosing compound's
   neighbours. Executed: `:is(h1 p)` true, `:is(.title > h1)+p` true, `:where(.title > h1)+p`
   true, `:is(details p) summary` true, `:is(details) summary` false, `:is(h1,p)` false,
   `:is(h1 .x) p` false (the tags are not adjacent, as `h1 .x p` is false), and every reading
   reports 4 to 7 record still holds; `tests/src/styles/index.test.ts` is unchanged and its
   elements-layer assertion reads the same list (`html`, `body`, no pair).
5. **The sentence.** `walkSelector`'s TSDoc states the grammar as a closed list and names the
   one selector test outside the walk (`BOOTSTRAP_SCOPE_PATTERNS` matching a whole scope
   selector, reading no compound, combinator, or group); `readIdentifier` and the other readers'
   TSDoc refer to it.
6. **The fence.** `scanUnreadForm` names, at any depth and in any case, a namespace separator
   `|` outside quotation and outside an attribute operator, a `:has(` argument, an `of` clause in
   an `nth-*` argument, and a `/*` comment; `matchesLooseTagPair` throws naming the form on each
   (`svg|a + p`, `h1:has(p) + p`, `li:nth-child(2n of .x) + p`, `h1 /* c */ + p`) and reads the
   controls (`[title|="x"] + p` false, `[title='a|b'] + p` false, `li:nth-child(2n) + p` true,
   `h1:not(p) + p` true); each is a case.
7. **Law over the diff.** In the two touched files: no `any`, non-null assertion, type assertion
   beyond `as const`, `@ts-` directive, `eslint-disable`, default export, nested function, or
   hidden or mutable module-scope declaration; readonly public shapes; every new export named
   by the helper-prefix table (`matches*` predicates, `extract*` structure readers, `scan*`
   findings, `read*` for a live read, `trim*`) and cased in `tests/setupStyles.test.ts`; the
   added prose sweeps clean under `writing.md`; the cascade's SHA-256 is unchanged
   (`8dc6e2f5d3dadfaacbd78921c5a7b7f53607eafa37fec4b3ac15e3c06db0d6c1`).
8. **Scope honesty.** `tmp/audit/u3-status-7.txt` lists exactly the files briefs 4 to 10 own or
   grant, the two integrated patch sites (`configs/src/vite.styles.config.ts`,
   `tests/distribution.test.ts`), and nothing else.
9. **Gates (ruled by the Orchestrator from the retained verifier report).** The whole chain exits
   0 on managed Chromium; `test:src:styles`, `test:src`, and `test:setup:browser` exit 0 on Edge;
   `test:distribution` green; `scaffold audit` reports no drift beyond the pending
   `@orkestrel/scaffold` re-pin.
