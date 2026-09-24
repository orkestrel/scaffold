<!-- Checker: checker on Sonnet, workflow wf_328bc737-8e5, brief ct-audit-2-checker-brief.md. -->

## Verdict — THEME round 2 checker (claims 1, 5, 6)

### Claim 1 — Scope: CONFIRMED

- `ct2-status.txt` (`/home/user/scaffold/.orkestrel/veneer/units/ct2-status.txt:1-5`) lists exactly `tests/app/browser/sections/ColorModeSection.test.ts`, `tests/setupServer.test.ts`, `tests/src/styles/components/alert.test.ts`, `tests/src/styles/theme.test.ts`, `tests/src/styles/tokens.test.ts` — all in brief 3's owned set (`b-cross-ct-brief-3.md:75-77`). No file outside that set appears.
- `ct2-shared.patch` (`ct2-shared.patch:1-197`) touches only `guides/veneer.md`, `tests/conformance.test.ts`, `tests/setup.ts`, `tests/setup.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts` — exactly the brief's shared list (`b-cross-ct-brief-3.md:79-81`).
- No path under `src/**` or `app/**` appears in either file (`ct2-status.txt`, `ct2-shared.patch`), and no LABEL-owned file (`_tokens.scss`, `_mixins.scss`, `_theme.scss`, or the button/color-bg/link/tooltip partials) appears.

### Claim 5 — The round-1 accounts: CONFIRMED

- Report `b-cross-ct-report-2.md:89-113` states S4 as the export proof and S1–S3 as the section mutations, matching the round-1 verdict's correction (`ct-audit-verdict.md:24-27`, "S4 is the export proof, and S1 to S3 are the section mutations").
- It separates cases run red against the unfixed tree (`ct-red-theme.log.txt`, `ct-v13-red-theme.log.txt`, `ct-red-x3.log.txt`) from cases bound by a named mutation (M5, M7, S1–S4), each with its own log, at `b-cross-ct-report-2.md:99-113`.
- Every cited log exists: `ct-red-theme.log.txt`, `ct-v13-red-theme.log.txt`, `ct-red-x3.log.txt` (round-1 `ct-instruments/`), and `ct-mutation-M5-dark-redeclares.log.txt`, `ct-mutation-M7-theme-withheld.log.txt`, `ct-mutation-S1-dark-attribute.log.txt` through `ct-mutation-S4-section-unexported.log.txt` all confirmed present by directory listing.

### Claim 6 — Law and report: CONFIRMED

- `ct2.diff` and `ct2-shared.patch` add no `any`, no `as` beyond `as const` (three hits, all `as const` — `ct2-shared.patch:46,150-152`), no `!` non-null assertion, no `@ts-*`/`eslint-disable` suppression, and no mock/spy/fake clock. New callbacks (`.filter`, `.flatMap` in `conformance.test.ts` and `alert.test.ts`) are anonymous callbacks passed directly as arguments, the permitted exception to the no-nested-function rule.
- The report's gate table (`b-cross-ct-report-2.md:158-168`) quotes each command and result line matching the individual gate logs read directly (`ct2-gate-10.log.txt:11` reads "Tests 20 passed (20)", matching report line 167). One discrepancy found, outside this claim's scope: the summary file `ct2-instruments/ct2-gates.log.txt:10` itself records "none" for gate 10 where the actual log shows a real result line — a defect in the summary instrument, not in the report the claim is about.
- For the record — counts and temporal words the report states: none found (`grep -i` for `now|new|latest|currently|soon` over `b-cross-ct-report-2.md` returned no matches; no stated tally of a growable population).
- For the record — code tokens left without a noun: the "Touched files" and mutation-table entries that pair a file-path token with a colon-introduced description rather than a following noun, e.g. `b-cross-ct-report-2.md:191` (`` `guides/veneer.md`: the breakpoint limit... ``), `:192` (`` `tests/conformance.test.ts`: the derived dark sites... ``), `:140` (`` `app/browser/constants.ts`: the nested island's... ``). These are list-label path tokens rather than inline nouns; named here per the brief's "for the record" instruction, not ruled BROKEN.

### Outside the claims (BROKEN standard)

- `ct2-instruments/ct2-gates.log.txt:10` records "none" for the `test:guides` gate's result line where the underlying `ct2-gate-10.log.txt` shows `Tests 20 passed (20)`. The report itself (the audited artifact) states the correct line, so this is a defect in the summary instrument alone. Carrier: whichever unit next touches `ct2-gates.sh`'s summary-writing step.

VERDICT: PASS
