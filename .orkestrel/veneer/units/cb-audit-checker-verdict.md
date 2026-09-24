# Verdict — cb round 1, checker lane (workflow wf_19d09be7-986)

# Checker Verdict — BARE-BUTTON (`cb`) audit round 1, claims 1, 5, 8

**Claim 1 (Scope) — CONFIRMED**
`cb-status.txt:1-8` lists exactly the eight files the brief's Owned set names (`app/browser/styles/_shell.scss`; `src/styles/elements/_button.scss`; `tests/src/styles/components/{carousel,close,dropdown,list-group,nav}.test.ts`; `tests/src/styles/elements/button.test.ts` — brief `b-cross-cb-brief.md:47-49`) and nothing else. `cb-shared.patch:1-276` touches exactly six files (`guides/veneer.md`, `tests/conformance.test.ts`, `app/browser/Showcase.ts`, `app/browser/constants.ts`, `tests/app/browser/Showcase.test.ts`, `tests/app/browser/integration.test.ts`), each named in the brief's Shared list (`b-cross-cb-brief.md:51-55`); no other Shared entry (`index.test.ts`, `setupStyles.ts`, `setupStyles.test.ts`) was touched, consistent with their conditional wording.

**Claim 5 (B4: the showcase hook) — CONFIRMED, with one sub-clause referred**
- Attribute and constant: `cb-shared.patch:126-127` (`this.#button.setAttribute(SHOWCASE_CONTROL, '')`) and `cb-shared.patch:139-141` (`export const SHOWCASE_CONTROL = 'data-control'`) — Showcase sets the attribute, the constant holds the name.
- No class on the control: confirmed by the same `setAttribute` call replacing the prior `className` assignment (`cb-shared.patch:126`).
- Shell rule selects it: `cb.diff:17` (`[data-control] {`), replacing `.control` (`cb.diff:11`).
- Retained unpatched run shows the class hook fails: `cb-instruments/cb-app-unpatched.log.txt:910-939` — `Showcase.test.ts:286` fails with the light/dark background mismatch (`rgb(239, 239, 239)` vs `rgb(107, 107, 107)`), 1 failed of 149 tests, because the unpatched `[data-control]` selector does not match the unpatched `className` hook.
- Out of the `data-bs-*` namespace: mechanically true — `data-control` is not `data-bs-*`.
- **Referred**: whether "the name follows `.claude/rules/names.md`" is a judgment call this lane declines to guess. `.claude/rules/names.md` frontmatter scopes the file to `**/*.{ts,tsx,mts,cts,vue}` and contains no rule addressing HTML/CSS attribute-name form; the file's naming rules that do apply to the TS surface (the `SHOWCASE_CONTROL` UPPER_SNAKE_CASE constant, `names.md:179`) are met. Whether an attribute string like `data-control` is itself bound by that file, and if so whether it complies, is a design-fit judgment for the subjective lane / Orchestrator, not a mechanical reading.

**Claim 8 (Law and report) — mixed**
- No `any`, `as` beyond a const assertion, `!`, suppression, or nested function: CONFIRMED. `cb.diff` and `cb-shared.patch` contain no TypeScript logic beyond the one-line `setAttribute` call (`cb-shared.patch:127`) and the constant/doc-comment edit (`cb-shared.patch:139-141`); neither introduces any of the banned forms. Every other changed line is SCSS, Markdown, or test assertions with no such tokens.
- No temporal word, no tally, in the report: CONFIRMED as read. `b-cross-cb-report.md` uses no "currently/now/new/latest/once/since" in a banned sense; every numeral present is a measurement reported with the run that produced it (a test-run count, a `git diff --stat` line, or a mutation's exit/summary), which `AGENTS.md` § Writing permits ("a measurement reported with the run that produced it").
- Each gate's command with its result line: CONFIRMED — `b-cross-cb-report.md:176-202` tabulates command, exit, result line for every gate.
- Follows every code token with its noun: **BROKEN**. Counterexamples in `b-cross-cb-report.md`:
  - Line 130: `` `cmp` confirmed `dist/src/styles/index.css` equal to the baseline copy`` — `cmp` names a command but is not followed by a noun identifying it as one.
  - Line 157: `` The restored build's cascade equals ... (`cmp` reported no difference).`` — same token, same defect.
  - Line 249: `` `LAYER_COMPONENTS` needed no change`` — no noun follows the token.
  - Line 253: `` `git apply --check` accepts it in the worktree`` — the command token is not followed by a noun (for example "command").

**Findings outside the three claims (BROKEN standard, evidence required):** none found in the material read for these three claims.

**Counts the report states, listed** (`b-cross-cb-report.md`): `8 files changed, 267 insertions(+), 41 deletions(-)` (line 29); `Tests 159 passed (159)` (lines 134, 182); `Tests 6 failed | 153 passed (159)` (lines 133, 162); mutation-table test counts `3 failed | 156 passed (159)` (163, 167), `2 failed | 157 passed (159)` (164), `1 failed | 158 passed (159)` (165), `4 failed | 155 passed (159)` (168), `1 failed | 148 passed (149)` (169); `Tests 1233 passed (1233)` and baseline `Tests 1228 passed (1228)` (line 183); `Tests 22 passed (22)` (195); `Tests 19 passed (19)` (196); `Tests 4 passed (4)` (197); `Tests 149 passed (149)` (198); `Tests 109 passed | 1 skipped (110)` (199).

VERDICT: FAIL 8; outside the claims: none
