# B-FORMS-CLOSE-SPECIMENS (`bfs`) — audit verdict, round 1

Claims: `bfs-audit-claims.md`. Lanes: `analyst` on GPT-6 Astra (session
`01a0cd6f-830f-7263-879a-bfc5f1a5d637`, `bfs-audit-analyst-verdict.md`), `reviewer` on Opus 5.5
(`bfs-audit-reviewer-verdict.md`), `checker` on Sonnet (`bfs-audit-checker-verdict.md`). Every lane
ran on the one claims file, blind.

## Reconciliation

| Claim | analyst | reviewer | checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | CONFIRMED | CONFIRMED | CONFIRMED | holds |
| 2 | CONFIRMED | CONFIRMED (the position-naming note "The second group" is a `writing` rule, carried) | — | holds; the "second group" wording goes to round 2 |
| 3 | CONFIRMED | CONFIRMED | CONFIRMED | holds |
| 4 | BROKEN (the "Two placement rulings" count, the "both specimens" tally, the bare `spinner.test.ts` token) | BROKEN (a: the hanging-key prose overclaims against the class-list gate; b: the generalized "names the host" sentence is false; c: the count; the date rests on the writer) | CONFIRMED (names no member; no banned term) | BROKEN on every lane item; the date holds (`git log -S '4700 CSS pixels' -- tests/setup.ts` names `eb1cd71`, 2026-09-22) |
| 5 | CONFIRMED | CONFIRMED | — | holds |
| 6 | CONFIRMED | CONFIRMED | — | holds |
| 7 | CONFIRMED | CONFIRMED (a redundancy note, carried as exact text) | — | holds; the wording goes to round 2 |
| 8 | BROKEN (specimen-name tokens without a noun) | BROKEN (number, "each a validated group", circular clause, ambiguous "beneath it", several ideas) | — | BROKEN; the reviewer's three-sentence text is what the Orchestrator lands (it carries "specimen" after each name) |
| 9 | CONFIRMED (`npm run check` exit 0) | UNRESOLVED (runs nothing) | CONFIRMED (reading parts) | holds |

Outside the claims: F1 (the visible Input group paragraph misstates the specimens' shape; the
section test asserts the string) and F2 (`floor` names the frame's bottom edge in the `hung` map
and the frame's bottom-row colour elsewhere in the file) — both carried to round 2. Referrals: the
`'nothing'` sentinel in the `hit` field breaches "Absence is `undefined`" (ruled by the
Orchestrator: the field takes `undefined` when `readHit` returns none) — round 2; the
point-in-rectangle check stays inline (the checker's probe of the browser declaration found no
duplicated export; the fix unit re-reads the declaration for a `within`-style export and reports);
the rationale worded three ways (`integration.test.ts` "one of its role links" and "the Layout
table alone", `tests/setup.ts` `CascadeKey` remarks, `guides/veneer.md` around line 3923) — the
two `bfs`-owned sites align in round 2 and the guide sentence is carried by B-PASSIVE-CLOSE-B (its
guide sweep row); the guide anchor after `bft`'s paragraph lands is checked at `bfs`'s landing.

## Round 2

A fix round on `opus` in the same worktree: `b-forms-close-specimens-brief-2.md`. Its audit runs
`analyst` on Astra and `reviewer` on Opus (blind) with `checker`.

VERDICT: FAIL 4, 8; outside the claims: F1, F2
