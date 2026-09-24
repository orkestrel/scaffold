# Unit AP-TYPE round 5 — the partial sentences, the infix term, and the report

Successor to `ap-type-brief-4.md`; `ap-type-brief-3.md` stays in force for every section neither restates. What
changed: the round-4 audit (`apt-audit-4-verdict.md`) held every claim and found N1 to N4 outside them. The verdict's
§ The seam ruling is binding here.

## Role and engine

`builder` on Sonnet, a native Claude subagent, resumed with its context in `/home/user/veneer-apt`.

## Objective

The guide's partial sentences, the font context's infix term, and the round's report satisfy the seam ruling's
invariant.

## Context

`/home/user/veneer-apt` holds AP-TYPE round 4 uncommitted over Veneer `712ae72`. Read
`/home/user/scaffold/.orkestrel/veneer/units/apt-audit-4-verdict.md` and its subjective lane verdict beside it. Host
as round 4. The round-3 compiled cascade is `tmp/units/apt-3-index.css`.

## Unknowns

Which "The partial" and "This partial" sentences break the invariant beyond § Text utilities. Record each sentence's
reading in the report.

## Scope

**Owned.** `guides/veneer.md` (the "The partial" and "This partial" sentences only), `src/styles/utilities/_font.scss`
(comments only), `tests/setupStyles.ts` (the `FONT_ENTRY_CASES` TSDoc only), and new files under `tmp/units/`.
Everything else is off-limits. No git command that writes, no install, no `npm run build`, no `npm run format`.

## Execution

Perform the assignment directly and spawn nothing.

1. **N1.** Read every guide sentence that opens "The partial" or "This partial" against the nearest preceding partial
   path. Where that path names another partial, name the described partial in the sentence, as round 4 did in § Font
   utilities; § Text utilities is known to break the invariant. Rewrap each edited paragraph by hand to 100 columns.
2. **N2.** In `_font.scss`, reword the cap-block comment's "after its responsive utilities" so it names the utilities
   the release writes at each breakpoint infix. In the `FONT_ENTRY_CASES` TSDoc, reword "No font entry is responsive"
   to "No font entry takes a breakpoint infix".
3. **N3 and N4.** Write the report with no count anywhere, the title included. Restate round 4's failing-first erratum
   with the cases' titles, their `font.test.ts` locations, and the mutation logs under
   `/home/user/scaffold/.orkestrel/veneer/units/apt-instruments-2/` it rests on, without quotation marks.
4. Run the gates, and log `cmp dist/src/styles/index.css tmp/units/apt-3-index.css` after `npm run build:src:styles`.

## Output

Write `tmp/units/apt-report-5.md` and return the same text: each edit; a table with one row per partial sentence (its
section, its nearest preceding partial path, and "holds" or the edit); the restated erratum; the gate table with log
paths; `tmp/units/apt-5.diff` (`git diff 712ae72` over the owned files); and `tmp/units/apt-5-status.txt`.

## Deviation contract

§ Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. You settle line breaks and each partial's
path form yourself.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0, each logged.
2. `npm run test:guides` exits 0, logged.
3. `npm run build:src:styles` exits 0, and the `cmp` against the round-3 cascade exits 0, both logged.
4. The diff against round 4 touches only the owned sites.

## Review evidence

The Orchestrator supplies `apt-5.diff`, `apt-5-status.txt`, the report, and the logs to the round-5 lanes.
