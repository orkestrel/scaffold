# bfw landing check (`checker` on Sonnet) — verdict

Brief: `units/bfw-landing-checker-brief.md`. Instrument: `units/bfw-probe-bfw-integration.py`. Diff: `units/bfw-integration.diff`.

Claim 1 — met. `/home/user/scaffold/.orkestrel/veneer/units/bfw-integration.diff` contains exactly three hunks: `app/browser/constants.ts` (bfw-integration.diff:6-14), `tests/app/browser/sections/FormLabelSection.test.ts` (bfw-integration.diff:20-24), and `tests/setup.test.ts` (bfw-integration.diff:30-34). `bfw-status.txt:1-10` and `bfw-2-status.txt:1-10` list the identical file set: `app/browser/Showcase.ts`, `app/browser/constants.ts`, `app/browser/index.ts`, `app/browser/sections/FormLabelSection.ts`, `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, `tests/app/browser/integration.test.ts`, `tests/app/browser/sections/FormLabelSection.test.ts`, `tests/setup.test.ts`, `tests/setup.ts`.

Claim 2 — met. `/home/user/veneer-bfw/app/browser/constants.ts:1650-1653` reads exactly: "Each label names its control through its `for` attribute, so each labelled control announces its label's text as its name, and each `id` attribute is unique to the showcase so a label names one control. The stacked control names its help text through its `aria-describedby` attribute, which is the pairing the help text exists to hold." — verbatim match, wrapped in the ` * ` frame.

Claim 3 — met. `/home/user/veneer-bfw/tests/app/browser/sections/FormLabelSection.test.ts:37-38` reads exactly: "Each label is tied to its control by its `for` attribute, so the control announces the label's own text, and no two controls share a name the journey could resolve to either of." — verbatim match.

Claim 4 — met. `/home/user/veneer-bfw/tests/setup.test.ts:149-151` reads exactly: "A selector leads with the class whose rule the key reads, alone or qualified by the element that carries it, as the `legend.col-form-label` selector is. A bare element selector such as the `legend` selector names no class, so the check refuses it." — verbatim match.

Claim 5 — met. Each code token in the three passages is followed by a noun: `for` → "attribute" (constants.ts:1650, FormLabelSection.test.ts:37), `id` → "attribute" (constants.ts:1651), `aria-describedby` → "attribute" (constants.ts:1652), `legend.col-form-label` → "selector" (setup.test.ts:150), `legend` → "selector" (setup.test.ts:151). No banned term from `.claude/rules/writing.md` § Substitutions appears in any of the three passages. No count statement appears in any passage. Column counts (tabs counted as one column each, matching the indentation style at each site): constants.ts:1650 = 99, :1651 = 99, :1652 = 99, :1653 well under 100; FormLabelSection.test.ts:37 = 92, :38 = 95; setup.test.ts:149 = 96, :150 = 97, :151 well under 100. No line exceeds 100 columns.

Findings outside the claims: none. Spot-checked `bfw-2.diff:1-30` (the full feature diff, distinct from the integration diff) to confirm `bfw-integration.diff` correctly isolates only the prose edit and not the broader feature change; no drift found in the reviewed slice.

VERDICT: PASS
