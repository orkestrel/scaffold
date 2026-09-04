# Lane brief — check the ROADMAP.md forward-work section against the campaign registers

Role and engine: `checker` held by `grok` (Cursor Grok 4.6), read-only mechanical conformance evidence. Never create, edit, or delete a file; never run a command that changes a tree. Perform the reading directly and spawn nothing.

Subject: `/home/user/scaffold/ROADMAP.md` § 4 "Forward work from the conformance campaign" (from the heading to the end of the file), the Orchestrator-owned integration described in `/home/user/scaffold/.orkestrel/campaign/conform/briefs/followon/roadmap-carry-brief.md`.

Claims to attempt to refute, each with `file:line` evidence:
1. Every bullet cites at least one register line (`followons.md:N`, `HANDOFF.md:N`, or a `units/*-audit-verdict.md:N`) under `/home/user/scaffold/.orkestrel/campaign/conform/`, and the cited line exists and concerns the bullet's item.
2. Every item the carry check listed as uncarried (`/home/user/scaffold/.orkestrel/campaign/conform/units/carry-check-grok.result.md` § Uncarried) appears as a bullet, or is closed on the record by `briefs/followon/roadmap-carry-brief.md` § Rulings on the draft's unknowns, or by the guide-keyword follow-on (`briefs/followon/guide-keyword-brief.md`) for the `symbol.kind` drop-in item.
3. Every bullet states an observable closing condition (a file reads X, a command exits 0, a mirror matches the released guide), never a history of how the item was found.
4. The section carries no `should`, `via`, `e.g.`, `i.e.`, `currently`, `above`, `below`, and no count of a growable set stated as a number (rule each numeral by sense: a line number, a version, and a date are values).

Output shape, exactly: per-claim `CONFIRMED` or `REFUTED` with the failing input and the smallest correct fix; then `## Referrals` for anything outside the claims; then `VERDICT: PASS` or `VERDICT: FAIL <claims>`. Nothing else.
