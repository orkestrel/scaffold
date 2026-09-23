# Landing check — `checker` on Sonnet, B-FORMS-LABEL-SHOW (`bfw`) integration edit

`checker` on Sonnet (native subagent, clean context, read-only). The bfw audit (`units/bfw-audit-verdict.md`) broke claim 8 on the noun each code token takes, and the Orchestrator applied the lanes' exact text as an integration edit in `/home/user/veneer-bfw` through `units/bfw-probe-bfw-integration.py`. Rule on these claims by reading alone:

1. `units/bfw-integration.diff` (the difference between `units/bfw.diff`, the audited diff, and `units/bfw-2.diff`, the diff after the edit) changes only the `FORM_LABEL_SPECIMENS` doc block in `app/browser/constants.ts`, the `for` comment in `tests/app/browser/sections/FormLabelSection.test.ts`, and the selector comment in `tests/setup.test.ts`; `units/bfw-2-status.txt` names the same files `units/bfw-status.txt` names and no other.
2. In `/home/user/veneer-bfw/app/browser/constants.ts` the doc block reads: "Each label names its control through its `for` attribute, so each labelled control announces its label's text as its name, and each `id` attribute is unique to the showcase so a label names one control. The stacked control names its help text through its `aria-describedby` attribute, which is the pairing the help text exists to hold." (wrapped at 100 columns in the ` * ` frame).
3. In `/home/user/veneer-bfw/tests/app/browser/sections/FormLabelSection.test.ts` the comment reads: "Each label is tied to its control by its `for` attribute, so the control announces the label's own text, and no two controls share a name the journey could resolve to either of."
4. In `/home/user/veneer-bfw/tests/setup.test.ts` the comment reads: "A selector leads with the class whose rule the key reads, alone or qualified by the element that carries it, as the `legend.col-form-label` selector is. A bare element selector such as the `legend` selector names no class, so the check refuses it."
5. Each code token in the three edited passages is followed by a noun; the passages state no count and use no term `/home/user/scaffold/.claude/rules/writing.md` § Substitutions bans unconditionally; no line exceeds 100 columns.

Law: `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md`. Edit nothing, run nothing, spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts with `file:line`, findings outside the claims to the BROKEN standard, and one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
