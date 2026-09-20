# U3 audit round 9 — numbered claims (both lanes and the checker)

Subject: the U3 working tree in `C:/Users/mikes/WebstormProjects/veneer` after brief 12
(`.orkestrel/veneer/units/u3-brief-12.md`, report `units/u3-report-10.md`), on top of the round-8
tree the verdict `u3-audit-verdict-8.md` ruled on. Native Opus 5 wrote the unit, so the `analyst`
on Astra holds the OBJECTIVE lane and the `reviewer` on Opus the SUBJECTIVE lane and is told its
engine wrote the work. This file alone fixes the claim numbers. The Orchestrator rendered the diff
over `b661142` including every added file at `units/u3-diff-9.patch.txt` and the status at
`tmp/audit/u3-status-9.txt`. Rule on every claim with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and
the deciding evidence (`file:line` or exact text); read the rendered diff and the live files,
never the reports alone; execute a reading in memory where a claim names one. Rounds 2 to 8
confirmed everything outside the two files brief 12 touched (`tests/setupStyles.ts`,
`tests/setupStyles.test.ts`); re-read other sites only where a claim names them. Law: scaffold's
`AGENTS.md`, `.claude/rules/tests.md`, `architecture.md`, `names.md`, `typescript.md`,
`writing.md`, read from `C:/Users/mikes/WebstormProjects/scaffold`.

1. **The functional lists are refused.** `scanUnreadForm` names `functional list` for an `:is(` or
   `:where(` pseudo-class at any depth, in any case, decoded, outside quotation, and
   `matchesLooseTagPair` throws naming it. Executed: `:is(h1, p)`, `:where(h1)+p`, `:IS(h1)+p`,
   `:i\73(h1)+p`, `:not(:is(h1))+p`, `:is(.title > h1)+p`, and `:is(h1:has(p)) + p` each throw
   naming `functional list`; `:not(h1)+p` reads false (a compound naming no tag is dropped and
   one compound joins nothing), `h1:not(p) + p` true, `[title=':is(h1)'] + p` false,
   `h1[data-x=":is("] + p` true; each is a case; the shipped cascade carries no `:is()` or
   `:where()`, so the elements-layer assertion reads the same list (`html`, `body`, no pair).
2. **The readers that remain.** `tests/setupStyles.ts` exports none of `extractCompoundAlternatives`,
   `extractSelectorSubject`, `extractBareTag`, `mergeCompoundTags`, `expandCompoundSelector`,
   `expandComplexSelector`, or `dropTaglessCompounds`; `extractCompoundTags` reads a compound's
   leading identifier through `readIdentifier` and nothing else (`h1:not(p)` and
   `h1:nth-child(2n)` are `['h1']`, `h1:is(p)` is `['h1']`, `:not(h1)` is `[]`);
   `extractSelectorCompounds` drops a compound naming no tag and resets the first compound's
   combinator (`h1 .x p` is `h1` joined to `p` by the descendant combinator, `h1 .x > p` by the
   child combinator, `.card h1 ~ p` opens at `h1`); `matchesLooseTagPair` reads
   `extractSelectorCompounds` over each complex selector of the list. Every reading reports 4 to
   9 record that involves no `:is()` or `:where()` holds when executed (report 10's retained
   table), and each is a case.
3. **The reader list and the grammar.** `walkSelector`'s TSDoc names, as a closed list, exactly
   the functions whose bodies call `walkSelector` plus `readIdentifier` (which takes the steps);
   the grammar sentence names strings, escapes, groups, identifiers, combinators, and comma lists
   and nothing else, says every pseudo-class and pseudo-element reads as part of its compound
   naming no tag, and names the fence's forms (namespace separator, `:has()` argument, `of`
   clause, comment, functional list).
4. **Prose.** No TSDoc line in either file exceeds 100 columns; "tagless" appears in neither;
   the sentence that read "so a form the grammar does not carry cannot pass as a permitted
   selector" is positive; the added prose sweeps clean under `writing.md` (the `as soon as` hit
   is not the banned time adverb).
5. **Law over the diff.** In the two touched files: no `any`, non-null assertion, type assertion
   beyond `as const`, `@ts-` directive, `eslint-disable`, default export, nested function, or
   hidden or mutable module-scope declaration; readonly public shapes; every export cased in the
   inventory case and by behaviour; `tests/src/styles/index.test.ts` unchanged; the cascade's
   SHA-256 unchanged (`8dc6e2f5d3dadfaacbd78921c5a7b7f53607eafa37fec4b3ac15e3c06db0d6c1`).
6. **Scope honesty.** `tmp/audit/u3-status-9.txt` equals the round-8 status: the files briefs 4 to
   12 own or grant, the two integrated patch sites, and nothing else.
7. **Gates (ruled by the Orchestrator from the retained verifier report).** The whole chain exits
   0 on managed Chromium; `test:src:styles`, `test:src`, and `test:setup:browser` exit 0 on Edge;
   `test:distribution` green; `scaffold audit` reports no planned path drifted, its non-zero exit
   being the pending `@orkestrel/scaffold` re-pin, with its dependency lines advisory.
