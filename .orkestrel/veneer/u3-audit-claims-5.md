# U3 audit round 5 — numbered claims (both lanes and the checker)

Subject: the U3 working tree in `C:/Users/mikes/WebstormProjects/veneer` after brief 8
(`.orkestrel/veneer/units/u3-brief-8.md`, report `units/u3-report-6.md`), on top of the round-4
tree the verdict `u3-audit-verdict-4.md` ruled on. Native Opus 5 wrote the unit, so the `analyst`
on Astra holds the OBJECTIVE lane and the `reviewer` on Opus the SUBJECTIVE lane and is told its
engine wrote the work. This file alone fixes the claim numbers. The Orchestrator rendered the diff
over `b661142` including every untracked file at `units/u3-diff-5.patch.txt` and the status at
`tmp/audit/u3-status-5.txt`. Rule on every claim with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and
the deciding evidence (`file:line` or exact text); read the rendered diff and the live files,
never the reports alone; execute a reading in memory where a claim names one. Rounds 2 to 4
confirmed everything outside the sites brief 8 touched; re-read those sites only where an item
touched them. Law: scaffold's `AGENTS.md`, `.claude/rules/styles.md`, `tests.md`,
`architecture.md`, `names.md`, `typescript.md`, `writing.md`, `documentation.md`, read from
`C:/Users/mikes/WebstormProjects/scaffold`.

1. **One tokenizer.** `tests/setupStyles.ts` exports `walkSelector(text)` returning one
   `SelectorStep` (`char`, `index`, `depth`, `literal`) per UTF-16 unit under the grammar its TSDoc
   states (strings with either quote and backslash escapes inside; backslash escapes outside
   strings; nested parenthesis and bracket groups; an unterminated string or unclosed group walked
   to the end rather than refused); `findGroupEnd`, `splitTopLevelList`, `splitTopLevelCompounds`,
   `normalizeComplexSelector`, and `extractCompoundTags` read selector text only through it (no
   other character loop or regular expression scans selector text, the anchored leading-identifier
   match aside), and each TSDoc refers to that grammar. Executed in memory over the live readers:
   `matchesLooseTagPair` reads `:is(.title[title="("], h1)+p` true, `h1[title="("], p` false,
   `h1\+p` false, `h1\ p` as one compound, and every earlier reading (report 6's tables) holds;
   `normalizeComplexSelector` keeps `h1\+p` and `h1\ p` unchanged and keeps quoted and grouped
   whitespace; every new reading and its `x` control is a case.
2. **The tables.** Every table under `guides/veneer.md` § Tokens follows a complete sentence naming
   what it lists, in the form `#### Factors` uses; no table in the guide sits bare under a heading.
3. **The `role-each` ruling.** The mixin's declaration in `src/styles/_mixins.scss` carries one
   comment stating why it is retained against the one-caller rule (the fixture's isolated paint
   proof of the tier math, which `theme-assets` never had) and naming `theme-tokens` as its
   shipped include.
4. **The header.** `tests/setupConformance.ts`'s header names the `conformance` and `setup`
   projects and the file each loads it from, and the reading is true of `vite.config.ts` and the
   importers.
5. **The paragraph.** The `interpolate-size: allow-keywords` paragraph sits in § Showcase's baseline
   paragraph, not in § Reference map, and § Reference map's motion subsection holds tokens alone.
6. **The map join.** `src/styles/_theme.scss`'s `@each` over `tokens.$assets` raises an `@error`
   naming the key when `tokens.$dark` lacks it (report 6's planted reading) and emits nothing
   else new; the built `dist/src/styles/index.css` is byte-identical to the pre-brief-8 build.
7. **Law over the diff.** No `any`, non-null assertion, type assertion beyond `as const`, `@ts-`
   directive, `eslint-disable`, default export outside a config file, nested function, or hidden
   or mutable module-scope declaration; readonly public shapes; the added prose sweeps clean under
   `writing.md` (no tally over a growable set, no banned row, no time word); every file U3 owns
   sits where the placement rows put it.
8. **Scope honesty.** `tmp/audit/u3-status-5.txt` lists exactly the files briefs 4 to 8 own or
   grant, the two integrated patch sites (`configs/src/vite.styles.config.ts`,
   `tests/distribution.test.ts`), and nothing else.
9. **Gates (ruled by the Orchestrator from the retained verifier report).** The whole chain exits
   0 on managed Chromium; `test:src:styles`, `test:src`, and `test:setup:browser` exit 0 on Edge;
   `test:distribution` green; `scaffold audit` reports no drift beyond the pending
   `@orkestrel/scaffold` re-pin.
