# A8 — failed-launch voice: a failed attempt is named where the reader looks

## Role and engine

`implementer`, engine **Opus 5**, native, high effort. Sole serial writer in
`/workspace/supervisor` from clean committed baseline **adc8d11**. Perform directly, spawn
nothing, no commits/pushes/installs. Read `AGENTS.md`, `.claude/rules/browser.md`,
`.claude/rules/tests.md`, and `guides/src/supervisor.md` before editing. An audit follows;
your self-report is not acceptance.

## The defect (E1 finding 2, re-scoped by probe evidence)

A launch that fails leaves the reader to discover it by opening the attempt and reading raw
provider text. The server side is proven sound — do not touch it:

- Fast failure (daemon down): the task fails in ~30ms with
  `result: {"success":false,"error":{"origin":"handler","message":"fetch failed"}}`.
- Deadline failure (hanging inference): the task fails at exactly 120s with
  `{"origin":"handler","message":"This operation was aborted"}`, and with `bail: false` the
  WORKFLOW still reads `completed` — a finished run whose only task failed.

Both messages are ground truth from probes against the real built server (records in
`.orkestrel/supervisor/a8-probe-verdict.md`). The core-diagnostics unit is struck; `src/**`
stays untouched.

## The unit (from the reconciled design round, U7 shape)

1. A failed task is visible at every tier the reader passes through: the workflow tier's
   phase listing, the phase tier's task listing, and the task tier itself name the failure
   — status voiced, not colored alone. The task tier states the failure message.
2. The failure message renders through the existing browser vocabulary: reuse
   `describeOutcome`/`deriveUnitRowStatus` and the tone/badge constants where they already
   answer; add a leaf to `app/browser/helpers.ts` only if a genuinely new translation is
   needed, exported and tested.
3. A run that completed with a failed task must not read as an unqualified success at the
   workflow tier: where the header or summary states completion, the presence of a failed
   task is stated beside it (shape yours; one sentence or badge, not a redesign).
4. No polling, no refresh path changes, no new public API on `Operator`. `src/**` and
   `app/server/**` are off-limits; the snapshot already carries every fact you render.
5. Voice: match the app's established register (the A7 sentences, the ended/finished
   paragraphs). Provider-controlled message text is stated as itself; you may bound it with
   the existing `MAX_VALUE_LENGTH`/`describeValue` machinery if a wall is possible —
   record the choice either way.

## Proof discipline

Failing proof first: component tests asserting the failed-task voices, red at adc8d11,
then green. Register a portfolio state (or extend one) whose frame shows a failed attempt
named at the task tier, generated in the capture run. Name tests for what they prove.

## Scope

**Owned:** `app/browser/components/ContentPane.vue`, `app/browser/components/PhaseView.vue`,
`app/browser/components/TaskView.vue`, `app/browser/components/WorkflowView.vue` (if the
workflow tier needs the statement), `app/browser/helpers.ts`, their test files under
`tests/app/browser/`, `tests/app/browser/portfolio.ts`, `tests/app/browser/portfolio.test.ts`.
**Off-limits:** `src/**`, `app/server/**`, `app/core/**`, `app/browser/controllers/**`,
`tests/setupBrowser.ts`, configs, manifests, `guides/**` (return guide edits as a
report-only patch with measured parity evidence, as A7 did).

## Unknowns

Which tier components already voice failure partially (FeedItem's `Failed:` card landed in
A7; the tier views may already color status). Read the current bytes first and state in
your report what existed before you edited.

## Acceptance criteria

1. Red/green pairs for the tier voices; commands and counts pasted.
2. A failed attempt's message is readable at the task tier without opening raw JSON.
3. The workflow tier states completion-with-failure per rule 3.
4. Registered portfolio frame showing the failed attempt named.
5. `npx vitest run --config vite.config.ts --project app:browser` green; `npm run check`
   green; scoped `npx oxfmt --check` + `npx oxlint --deny-warnings` on owned files clean.
6. No `as`, no suppressions, no new public API beyond exported tested helpers.

## Output

Touched files + diffstat; what pre-existed per the Unknowns; per-criterion proofs with
commands and tails (red first); `git status --porcelain`; report-only guide patch with
measured parity evidence if any; deviations or none. No diary.

## Deviation contract

If a fact you must render is not in the snapshot the browser already receives, stop and
report with the evidence — do not reach for a new endpoint or a server change. Ancillary
calls (badge vs sentence at a tier, exact wording within the register) are yours to decide
and record.
