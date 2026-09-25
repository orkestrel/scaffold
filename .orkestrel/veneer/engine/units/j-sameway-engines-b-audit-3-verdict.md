# J-SAMEWAY-ENGINES-B round 3 — audit verdict (2026-09-25)

**Subject.** Veneer `87dc147` on `unit/engines-b` over the merge `45aebaa`. The claims are `units/j-sameway-engines-b-audit-claims-3.md`.

**Lanes.**
- **Objective:** `analyst` on GPT-6 Astra, thread `01a0d724-63c3-7973-bea9-93c04fee757f` (`units/j-sameway-engines-b-audit-3-objective-verdict.md`): `VERDICT: FAIL 2, 7`.
- **Checker job:** Grok, session `ad328cba-4e97-4eb0-950a-f147551e2b72`, on claims 6 and 8 (`units/j-sameway-engines-b-audit-3-checker-verdict.md`): `VERDICT: PASS`.
- **Subjective:** not run. The round adds no public shape. The two test tables follow the module's existing pattern, and the Tooltip `#link` parameter is private.

**Rulings.**
- **Claims 1, 3, 4, 5, 6, and 8: CONFIRMED.** The replay supports them: seven cases read red on `45aebaa`, and the 54 rows miss none (`units/j-sameway-engines-b-red-3-orchestrator.log.txt`, `-mutations-3-orchestrator.log.txt`). The lane's exit table lists every change exit with its record and its return.
- **Claim 2: FAIL, upheld.**
  - Treating `aria-describedby` as a token list is E24 applied at token granularity, as the lane confirms. That application needs the linked id and its prior membership recorded, and the call records the attribute's presence alone. It then reads the mutable `tip.id` again at the return.
  - The lane's witnesses:
    - a pre-existing `vn-tooltip-0` token the call never added is removed;
    - a tip whose `id` changed while the show awaited leaves the id the call wrote in place.
  - The fix records the id the call linked and whether the list held it before the call. The return removes that id only when the call added it.
- **Claim 7: FAIL, upheld as the consequence of claim 2.** The guide's promise that a stopped show writes back its own writes is false for those witnesses. It becomes true with the fix.
- **Outside the claims: Dropdown supersession strands the earlier placement, upheld.**
  - A show a reaction starts inside a stopped show's return replaces `#placement` without destroying the placement it replaces.
  - The superseded return exits before its placement destruction, as E24 requires, so the earlier placement keeps its snapshot holdings until the dropdown is destroyed.
  - A later hide destroys only the replacement, and shared `popover`, positioning, and anchor targets are not written back.
  - The fix: a show that finds a placement it did not create destroys it before it places the menu. The existing supersession fixture, followed by a hide, is the red-first case.

**Carried.** Claims 2 and 7 and the supersession finding go to `units/j-sameway-engines-b-brief-4.md`, their one carrier.

VERDICT: FAIL 2, 7 — round 4 (`units/j-sameway-engines-b-brief-4.md`)
