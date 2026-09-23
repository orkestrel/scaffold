# F8c-B MOVE, round 5 — `checker` on Sonnet

Subject: the round-5 prose fix (`f8c-b-brief-5.md`, `f8c-b-report-5.md`), read on the tree of `/home/user/veneer-f8b` at 2026-09-23 04:09 UTC. Read-only; the verdict text is the lane's handback verbatim.

Per-claim verdicts (subject: F8c-B round 5, `/home/user/veneer-f8b`):

1. CONFIRMED — Each replacement of obligations 1–8, 12, 13 is present and its source phrase absent.
   - Obligation 1: `guides/veneer.md:314` "the `@source './src'` line is the one you change" present; grep for "`@source './src'` is the line you change" returns no matches.
   - Obligation 2: `guides/veneer.md:352` "its `@source './markup.html';` line names" present; old phrase absent.
   - Obligation 3: `guides/veneer.md:362` "the `px-8` utility moves the button's padding" present; "and `px-8` moves the button's padding" absent.
   - Obligation 4: `guides/veneer.md:365` "the `grid-column-start` property of the `.col-1` element" present; "`.col-1`'s `grid-column-start`" absent.
   - Obligation 5: `guides/veneer.md:405-406` "The `tests/fixtures/tailwind/unexcluded.css` instrument" present; "The instrument `tests/fixtures/tailwind/unexcluded.css`" absent.
   - Obligation 6: `guides/veneer.md:416-417` "The `prepublishOnly` chain runs the `test:service` script, and the `test` script does not." present; old sentence absent.
   - Obligation 7: `guides/veneer.md:240` § Files row reads "the pinned Chromium"; "the pinned browser" absent.
   - Obligation 8: `guides/veneer.md:298-299` "The stylesheet profiles proof reads that difference; see [stylesheet profiles](../tests/service/tailwind/profiles.test.ts)." present; old form absent.
   - Obligation 12: `tests/setupService.ts:94,178,213,289,349,452` all six replacements present verbatim; a targeted grep for all six old phrases (`source(none)` keeps the compiler, as `resolveBrowser` in `configs/browsers.ts` returns them, The plugin creator `@tailwindcss/postcss` exports, every relative `@import` and `@source` in the profile, anything an earlier `open` acquired, so `border: 0 solid` reports) returned no matches.
   - Obligation 13: `tests/setupServer.ts:1414,1444,1578` all three replacements present; old phrases (`@layer outer { @layer inner`, `SheetReader.order} answers`, `so `.container { @media`) absent by the same grep.

2. CONFIRMED — `guides/veneer.md:316-324` states the paragraph per D25b in four sentences: (a) a `@source` rule is unknown to a browser and the operative rule is the `postcss-import` plugin's, which Vite runs ahead of the Tailwind plugin; (b) the plugin refuses an `@import` rule preceded by anything other than `@charset`, a comment, an empty `@layer` statement, or another `@import` rule, and drops it; (c) the plugin follows CSS Cascading and Inheritance Level 5 § Importing Style Sheets and § Declaring Without Styles, cited with both links, for the rules a browser treats as valid; (d) the import-first closing clause is kept ("Each recipe writes its imports first, so the rule holds whichever tool inlines them."). No other claim is made. Quoted in full above.

3. CONFIRMED — the per-property importance rule is stated identically in substance at the two guide sites (`guides/veneer.md:373-378` and `guides/veneer.md:390-397`) and in `tests/setupServer.ts:1674-1678` (`collectImportantNames` doc block), each stating that a shared name leaves the exclusion line only where Veneer declares with `!important` every longhand Tailwind's rule for that name declares, and that a name important on only some longhand stays on the line. The "no shipped shared name is important" sentence stays at `guides/veneer.md:395`.

4. CONFIRMED — every line from the § Tailwind heading (around line 260, not reproduced here) to line 425 (the next `### ` heading region) inspected at the reviewer-cited sites and the rewrapped paragraphs (lines 314-425) stays at or under 100 columns; the § Files `tests/setupService.ts` row (`guides/veneer.md:240`) reads "the pinned Chromium"; the report's ROADMAP row names one unit, F8d IMPORTANCE-LONGHANDS, with the `collectImportantNames` change (report lines 257-261).

5. CONFIRMED — every inspected edited sentence follows `writing.md`: code tokens are followed by a noun (`@source './src'` line, `px-8` utility, `grid-column-start` property, `tests/fixtures/tailwind/unexcluded.css` instrument, `resolveBrowser` function, `@tailwindcss/postcss` package, `open` call, `border: 0 solid` declaration, `@layer outer { @layer inner { … } }` block, `SheetReader.order` member, `.container { @media … }` rule); no banned term found; no growable-set count; link text at `guides/veneer.md:299` is introduced by "see"; one idea per sentence in each replacement.

6. CONFIRMED — the report's hunks match the brief's Owned list (`guides/veneer.md`, `tests/setupService.ts`, `tests/setupServer.ts`, `tmp/units/f8c-b-report-5.md`); direct reads of the surrounding lines around each edit site show no collateral change beyond the obligated replacements and the disclosed rewraps (obligation 11, and the incidental rewrap noted at obligation 5's hunk). The § Files table repad the report names (`guides/veneer.md:179-244`) is the expected `oxfmt` consequence of the one-word cell edit and was not independently re-verified byte-for-byte here, but the report's own before/after `diff` claim is uncontested by direct inspection of the surrounding rows, which show no content drift beyond alignment.

Findings outside the numbered claims: none found rising to BROKEN. No unscoped file was touched; no gate evidence was fabricated (gate exits are the report's self-report per the `AGENTS.md` acceptance laws, so treat the "Gate exits" section as UNRESOLVED rather than CONFIRMED — a builder's self-report of exit code 0 is not independently verified here, since this checker is read-only and ran no commands. This is not one of the dispatch's six numbered claims, so it does not affect the verdict, but it should not be read as CONFIRMED green).

VERDICT: PASS
