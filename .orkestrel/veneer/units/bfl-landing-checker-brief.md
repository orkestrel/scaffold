# Landing check — `checker` on Sonnet, B-FORMS-LABEL-CASCADE (`bfl`) integration edit

`checker` on Sonnet (native subagent, clean context, read-only). The bfl round-2 audit (`units/bfl-2-audit-verdict.md`) broke claim 6 on one site and carried the reviewer's `legend-antecedent` and two referrals to an integration edit the Orchestrator applied in `/home/user/veneer-bfl` through `units/bfl-probe-bfl-integration.py`. Rule on these claims by reading alone:

1. `units/bfl-integration.diff` (the difference between `units/bfl-2.diff`, the audited diff, and `units/bfl-3.diff`, the diff after the edit) changes only two paragraphs of `guides/veneer.md` inside `### Form label classes`; `units/bfl-3-status.txt` names the same files `units/bfl-2-status.txt` names and no other.
2. In `/home/user/veneer-bfl/guides/veneer.md` the behaviour paragraph carries, wrapped at 100 columns: "The unsized horizontal label reads `--vn-size-3`, the control's type step, so its text sits level with the control's, and the stacked `.form-label` class keeps inheriting the surrounding type. On a `legend` element the horizontal label also clears the element's own trailing margin and type size, so the legend reads at its control's type step." and the rest of the paragraph is unchanged.
3. The proof paragraph reads "each horizontal label's type step and the sized labels' insets" in place of "the sized labels' type steps and insets", with the rest unchanged.
4. Each code token in the two edited paragraphs is followed by a noun (a CSS property, value, function, or `!important` token is its own noun); the paragraphs state no count and use no term `/home/user/scaffold/.claude/rules/writing.md` § Substitutions bans unconditionally; "§ Additions" sits on one line; no line exceeds 100 columns.

Law: `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md`. Edit nothing, run nothing, spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts with `file:line`, findings outside the claims to the BROKEN standard, and one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
