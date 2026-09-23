# `checker` verdict — the bfs landing's integration edits (Sonnet, agent aa5e4910f180889a3)

Retained verbatim from the lane's returned message. The FAIL on item 2 is the brief's own count ("seven"); the six defined edits landed and no old text remains, so the landing holds; the retained script's message is corrected to state no count.

---

**Item 1 — guide sentences.** CONFIRMED.
`/home/user/veneer/guides/veneer.md:1359-1365` carries the three sentences from `/home/user/scaffold/.orkestrel/veneer/units/bfs-guide-sentences.txt` verbatim (apart from line wrapping), directly after "the capture journey writes shows the `Input group button` specimen's control under keyboard focus" (line 1359). The range-section paragraph at `guides/veneer.md:1276-1288` (holding "the ring paints on a part with no resolved reading," line 1286) does not carry them. A grep for `z-index: 5` in the file returns only the two occurrences inside this one passage (lines 1360, 1364), so the sentences appear once.

**Item 2 — the seven/six replacements.** BROKEN as stated; the six edits present are CONFIRMED.
`/home/user/scaffold/.orkestrel/veneer/units/bfs-integration-2.py` defines six `edit()` calls (grep count: `.orkestrel/veneer/units/bfs-integration-2.py:6`), not seven — the script's own `print('seven edits applied')` at line 59 overstates its own edit count, and the brief's claim of "seven replacements" repeats that overstatement.

All six defined `new` strings are present and no `old` string remains:
- `tests/app/browser/integration.test.ts:610` — "the Layout table alone renders several containers." present; old "one table can render several containers" absent (no matches).
- `tests/app/browser/integration.test.ts:655-659` — rewritten paragraph present ("a point inside the key's box and / the button's box," line 659); old "a point inside both boxes" absent.
- `tests/app/browser/integration.test.ts:714` — "leaves the `hit` field undefined" present; old "leaves `hit` undefined" absent.
- `tests/setup.ts:346-348` — "the Layout table alone renders several containers." present.
- `tests/setup.ts:376-382` — rewritten paragraph present, ending "registered for none of these keys," line 382; old "registered for none of them" absent.
- `app/browser/constants.ts:1520` — "one passing and one failing specimen" present; old "one passing and one failing group" absent.

**Item 3 — writing.md conformance.** CONFIRMED for all six replaced sentences.
None uses a count, a position name, or a substitution-table banned term (`should`, `simply`/`easy`/`just`, `currently`/`now`, `new`/`latest`, `utilize`/`leverage`, `via`, `in order to`, `e.g.`/`i.e.`, `etc.`, `performant`/`robust`, `allows you to`, `and/or`, causal `since`, temporal `once`, cross-reference `above`/`below`, `please`, `sanity check`, `dummy`, `blacklist`/`whitelist`, `master`/`slave`). The `` `hit` `` token at `integration.test.ts:714` is followed by the noun "field," matching the code-token-plus-noun rule. Each rewritten paragraph splits the prior run-on into sentences carrying one idea each (`integration.test.ts:655-659`, `tests/setup.ts:376-382`).

Referrals: none — every check resolved on direct evidence.

VERDICT: FAIL 2; outside the claims: none

The sole defect is the brief's own miscount of the source script (six `edit()` calls, not seven); all six defined edits landed correctly with no stray old text remaining.
