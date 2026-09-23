# Landing check — `checker` on Sonnet, CLOSE-GUIDE (`cg`) integration edit

`checker` on Sonnet (native subagent, clean context, read-only). The CLOSE-GUIDE audit round
(`/home/user/scaffold/.orkestrel/veneer/units/cg-audit-verdict.md`) broke claim 8 on two code tokens
with no noun and returned two findings and three referrals with exact replacement text; the
Orchestrator applied all of them as one integration edit in `/home/user/veneer-cg` through
`/home/user/scaffold/.orkestrel/veneer/units/cg-integration.py` before the landing. Rule on these
claims by reading alone:

1. `/home/user/scaffold/.orkestrel/veneer/units/cg-integration.diff` changes only these sites, and
   nothing else: in `guides/veneer.md`, the § Files paragraph that names the `MANDATED_TAG_PAIRS`
   constant (one sentence changed, the paragraph rewrapped), the § Button group classes sentence on
   `--bs-border-radius` and `--bs-border-width`, the § Form label classes paragraph inserted before
   "The form label proof reads", the § Customization sentence listing the palette paints, the
   § Departures sentence explaining the `Departure` cell, and the two § Showcase sites (the order
   rule sentence and the removed "The Form label region carries" paragraph); in
   `tests/src/styles/integration.test.ts`, one case title.
2. Each changed sentence in `/home/user/veneer-cg/guides/veneer.md` reads exactly as the verdict's
   § Integration rulings state it (quote each with its line), and the case title in
   `/home/user/veneer-cg/tests/src/styles/integration.test.ts` reads `holds the palette paints it
   reads through the brand retune and moves each with the palette entry` with the case body
   unchanged.
3. Every code token in the changed lines is followed by a noun; the changed lines state no count and
   use no term `/home/user/scaffold/.claude/rules/writing.md` § Substitutions bans unconditionally;
   the sentence "The showcase's Form label region carries" appears once in the guide and "The Form
   label region carries" appears nowhere in it; the old title `every paint on the release blue`
   appears nowhere under `/home/user/veneer-cg/tests/` or `/home/user/veneer-cg/guides/`.
4. `/home/user/scaffold/.orkestrel/veneer/units/cg-2-status.txt` names the same three files as
   `cg-status.txt` (`guides/veneer.md`, `tests/guides.test.ts`,
   `tests/src/styles/integration.test.ts`) and no other.

Law: `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md`. Edit
nothing, run nothing, spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts with
`file:line`, findings outside the claims to the BROKEN standard, and one terminal line
`VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
