Gates and mutation logs confirm claims. Now finalize verdict.

**Verdict shape (orkestrel-falsify), claims 4 and 5 only:**

**Claim 4 — Titles, placement, and the search: CONFIRMED**
- Floor-case title now names the states it reads, replacing "every filled and outline state": `/home/user/scaffold/.orkestrel/veneer/units/lc-3.diff:488-489` (`tests/src/styles/components/button.test.ts`), matching the G1 finding from `lc-audit-2-verdict.md:22,29`.
- Transition-proof title states what its assertions check ("distinct" states, no `from === to`): `lc-3.diff:362-366`, `tests/setupStyles.test.ts` — the added `it` at `lc-3.diff:363` (`pairs each direction transition with a distinct state it moves to`) asserts exactly that in `lc-3.diff:363-366`.
- Island-proof title/assertion for uniqueness ("the island uniqueness now asserted"): `lc-3.diff:341-350` (`tests/setupStyles.test.ts`, `names each island button once, and each scheme rule on its own class`) asserts `new Set(...).size` equals the case count.
- Temporal "once" removed and replaced with "after": `lc-3.diff:570` (`reads the black primary label on a root-level button after the root takes the dark attribute`); confirmed no remaining temporal "once" in `tests/src/styles/components/button.test.ts` (grep on `/home/user/veneer-lc2/tests/src/styles/components/button.test.ts` returns no match).
- `LINK_SHIFT` and its TSDoc sit above `LINK_OFFSET_CASES`'s TSDoc: `lc-3.diff:386-395` (`tests/setupStyles.ts`).
- `lc3-pin-search.log.txt` retains the search's commands and output over the paths round 2 named (`tests/fixtures/oracle tests/app app/browser/constants.ts src guides`), with patterns for the pre-change state fills, a button/tooltip label, a `text-bg` foreground, and a link hover/focus color: `/home/user/scaffold/.orkestrel/veneer/units/lc-instruments/lc3-pin-search.log.txt:1-207`.

Mutation named in the brief for claim 6 (fixture) also proves S1 distinguishes the mutation from the passing case: `lc-mutations-3.log.txt:1-11` (S1 reddens the added `mixins.test.ts` case; before S1 the case passes per gate 9/gate 6 green runs).

**Claim 5 — Law and gates: CONFIRMED**
- No added line introduces `any`, a non-const-assertion `as`, `!` non-null assertion, a suppression comment, a nested named function, or a mock: verified by scoped greps over `lc-3.diff` for `any`/`as`/`@ts-ignore`/`@ts-expect-error`/`eslint-disable`/`mock` (no code hits, only prose "as" in comments) and for `!` (only `!=`, `!==`, SCSS `!important`) and for inline function literals (only anonymous callbacks passed directly to `it`/`it.each`, permitted under `AGENTS.md` § Design laws "No nested functions").
- Gates the report names exit 0 as their logs print: `/home/user/scaffold/.orkestrel/veneer/units/lc-instruments/lc3-gates.log.txt:1-9` (gates 1–9, each printing `exit 0`); spot-checked gate 6 (`lc3-gate-6.log.txt:7-8`, `Tests 149 passed (149)`) and gate 9 (`lc3-gate-9.log.txt:8199-8204`, `Tests 1431 passed (1431)` / `exit 0`) against the summary table, both matching.

**Findings outside the claims:** none.

**Counts the report states, listed:** gates 1, 2, 3, 4, 5, 6, 7, 8, 9 (nine); mutations S1, S2 (two); `BUTTON_TRANSITION_CASES` entries: filled rest→filled hover, filled hover→filled active, outline hover→outline active; `BUTTON_ISLAND_CASES` entries: Root primary, Dark primary, Nested primary, Own primary, Scheme primary; `BUTTON_SCHEME_CASES` entries: declared, lowered.

VERDICT: PASS
