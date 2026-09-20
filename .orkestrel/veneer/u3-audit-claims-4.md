# U3 audit round 4 — numbered claims (both lanes and the checker)

Subject: the U3 working tree in `C:/Users/mikes/WebstormProjects/veneer` after brief 7
(`.orkestrel/veneer/units/u3-brief-7.md`, report `units/u3-report-5.md`), on top of the round-3
tree the verdict `u3-audit-verdict-3.md` ruled on. Native Opus 5 wrote the unit, so the `analyst`
on Astra holds the OBJECTIVE lane and the `reviewer` on Opus the SUBJECTIVE lane and is told its
engine wrote the work. The Orchestrator rendered the evidence a read-only lane needs: the diff over
`b661142` including every untracked file, `units/u3-diff-4.patch.txt`, and the status,
`tmp/audit/u3-status-4.txt`. Rule on every claim with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and
the deciding evidence (`file:line` or exact text); read the rendered diff and the live files,
never the reports alone; execute a reading in memory where a claim names one. Rounds 2 and 3
confirmed the fold, the oracle, the proofs, the shared infrastructure, the installed-surface
boundary, the names, the flattening, and the value maps; re-read those sites only where a brief-7
item touched them. Law: scaffold's `AGENTS.md`, `.claude/rules/styles.md`, `tests.md`,
`architecture.md`, `names.md`, `typescript.md`, `writing.md`, `documentation.md`, read from
`C:/Users/mikes/WebstormProjects/scaffold`.

1. **The scanner.** Executed in memory over the live readers: `matchesLooseTagPair` reads
   `:is(h1,:where(.title))+p` true, `:is(h1:not(.x), p) + p` true, `[title=':is(h1)'] + p` false,
   `:is(h1, p)` false, `:where(h1, p)` false, `:is(.title,h1)+p` true, `h1, p` false,
   `details + summary` true, `:is(h1)+:is(p)` true; `splitTopLevelCompounds` splits
   `[title="a\" b"] p` into two compounds; `extractCompoundTags` descends into `:is()` and
   `:where()` alone (a `:not()` argument and an attribute string contribute no tag) and reads
   nested lists through `findGroupEnd`, which is exported and cased; every input above is a case;
   each reader's TSDoc describes it as it is.
2. **The normalizer.** `normalizeComplexSelector` copies parenthesized, bracketed, and quoted text
   through byte for byte and collapses whitespace and spaces combinators only at depth zero
   outside quotation: `[title="a  b"] + p` keeps its two spaces; `:is(h1,  p)+p` keeps the two
   spaces inside the list; the TSDoc promises exactly that and a case distinguishes the values.
3. **Tallies.** No `both`, `two`, `three`, `four`, `several`, or `multiple` tally over a growable
   set survives in an owned file; every remaining hit is a fixed arity, a CSS grammar count, a
   sentence naming its members, or a literal identifier; the changed prose sweeps clean against
   the substitution table.
4. **The assets inline.** `src/styles/_mixins.scss` declares no `theme-assets`; the dark scope of
   `_theme.scss` emits the image-valued dark variables through one `@each` over `tokens.$assets`
   reading `tokens.$dark`; `_theme.scss` holds scopes, includes, and that loop, with no literal
   colour; the emitted `url()` declarations are byte-identical to before (the report's snapshot
   pair); no mixin in `_mixins.scss` has exactly one include from a partial under `src/styles/**`
   except `transition` and `forced-colors`, whose only include is the test fixture, which the
   plan's U3 design placed there for the component partials to consume (a recorded observation,
   ruled by the Orchestrator as kept, not a defect of this unit).
5. **The recipe coupling.** A Node case in `tests/setupStyles.test.ts` requires
   `CUSTOMIZATION_RECIPE` inside the text of `guides/veneer.md` read through `VENEER_GUIDE_PATH`,
   so editing the fence alone reddens (the report's control); the guide's negative claim (a fill
   override without the triplet leaves a triplet-reading rule on the old brand) is read by
   `tests/src/styles/integration.test.ts` through `FILL_ONLY_RECIPE`, with the report's control;
   the constant's remarks state that the case exists.
6. **One word.** The member-shape rule reads "A group's own value takes the `base` member".
7. **The factor table.** The factor table carries `Token`, `Value`, `Alias` and no `Source`
   column; its introduction names each factor's scale; the `Source` sentence names the factor
   table among the tables without that column; the legend's "or the value it targets" clause stays
   because `--vn-text-code`, `--vn-surface-tertiary-base`, and `--vn-focus-color` rows target a
   value.
8. **The cascade reader.** `tests/setupConformance.ts` exports `readBootstrapCascade()` reading
   `BOOTSTRAP_CASCADE_PATH` imported from `./setupStyles.js`, with a case in
   `tests/setupConformance.test.ts`; the three oracle cases call it; those two files carry that
   addition and nothing else.
9. **Law over the diff.** No `any`, non-null assertion, type assertion beyond `as const`, `@ts-`
   directive, `eslint-disable`, default export outside a config file, nested function, or hidden
   or mutable module-scope declaration; readonly public shapes; TSDoc and guide prose under
   `writing.md`; parity under `documentation.md`; every file U3 owns sits where the placement
   rows put it (`tests/src/styles/fixtures/` holds `mixins.scss` alone).
10. **Scope honesty.** `tmp/audit/u3-status-4.txt` lists exactly the files briefs 4 to 7 own or
    grant, the two integrated patch sites (`configs/src/vite.styles.config.ts`,
    `tests/distribution.test.ts`), and nothing else.
11. **Gates (ruled by the Orchestrator from the retained verifier report).** The whole chain exits
    0 on managed Chromium; `test:src:styles`, `test:src`, and `test:setup:browser` exit 0 on Edge;
    `test:distribution` green; `scaffold audit` reports no drift.
