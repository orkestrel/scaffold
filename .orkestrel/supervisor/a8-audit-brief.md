# A8 audit — failed-launch voice (writer was Opus, auditor is Sol)

## Role and engine

`analyst`, engine **GPT-5.6 Sol** via the journaled codex CLI, read-only sandbox. Correctness
audit; you never implement, reconcile, or accept.

## Subject

Commit `2d68a77` in `/workspace/supervisor` (range `adc8d11..2d68a77`, 8 files, +399/-6):
a failed task is named where the run's own verdict omits it. New exported leaf
`describeFailures`; `describeOutcome` bounds the failure message and quarantine reason and
answers in words for empty records; `WorkflowView.vue` renders the qualification; two new
portfolio states; three guide additions.

Read the diff first: `git -C /workspace/supervisor diff adc8d11..2d68a77`.
Gate evidence (Orchestrator-run): app:browser 480/480; parity 374/374; check green; scoped
format/lint clean. Do not run browser suites; read-only scoped commands only.

## Context

- `AGENTS.md` non-negotiables bind. The writer's baseline findings, verified by rendering:
  the task tier already states the failure message unbounded; the phase tier already voices
  failed in words; `TaskView.vue`/`ContentPane.vue` deliberately unchanged.
- Ground truth: `@orkestrel/workflow` folds a failed `bail:false` phase into workflow
  `completed` (dist index.js:385,421); probe evidence in
  `.orkestrel/supervisor/a8-probe-verdict.md` (deadline failure message "This operation was
  aborted", fast failure "fetch failed").
- Deliberate rulings, not findings: bounding at the feed card but not the task tier; the
  qualification's single home in WorkflowView; unbounded Intl.ListFormat name list;
  test-local fixtures.

## Claims to falsify (verdict each, with file:line evidence)

1. `describeFailures` is exact over the status space: the sentence appears for every
   workflow status except `failed` when at least one task's derived row status is failed,
   and never otherwise — including a running run with a graceful failure behind it, a
   pending run, and a run whose failures live in different phases (verify the plural join).
2. The qualification cannot state a failure the run does not have: quarantined units,
   settled failures on a task whose CURRENT durable row succeeded on a later attempt, and
   retries that recovered (task row completed after a failed attempt) do not produce it —
   or if any does, rule whether that reading is true or false against the snapshot's own
   facts, with evidence.
3. `describeOutcome`'s bounding change is complete and regression-free: message and reason
   pass `describeValue` exactly as the value does; an empty/whitespace message or reason
   yields the stated words, never a sentence ending at its colon; the A7 sentences are
   byte-identical where the record is substantive and within bound.
4. The red/green pairs bind: round A's WorkflowView red could not pass at adc8d11 and round
   B's two bounding reds could not pass before the describeOutcome change; nothing else in
   the diff turns them green.
5. The workflow tier renders the qualification from the snapshot alone — no new client
   call, no controller change, no polling; and `WorkflowView.vue`'s change stays inside the
   status row (no unrelated template churn).
6. The two portfolio scenarios drive real interactions (mount, press, select) and their
   registry audit still proves one-frame-per-state-and-variant; the new states are reachable
   through the registered journey drives, not seeded by reaching into component internals.
7. The three guide additions state only what the code does; every backticked name resolves;
   the verdict-omission paragraph's claims about phase/task tiers (already voiced, message
   in full) are true at 2d68a77.
8. The diff introduces no `any`, `as`, non-null `!`, suppression, mock, fake clock, new
   dependency (`Intl.ListFormat` is platform), or unrelated change; `describeFailures` is
   barrel-exported and tested; no hidden helper.

## Execution

Perform the audit directly and spawn nothing. Journal under
`/workspace/supervisor/tmp/codex/` and return the journal path and session id with the
result.

## Output

Numbered verdicts 1-8, each `CONFIRMED` or `REFUTED` with `file:line` evidence and one line
of reasoning; findings outside the claims as `F<n>` with evidence and a proposed carrier;
then exactly one terminal line: `AUDIT: PASS` or `AUDIT: FAIL <claim numbers>`. No process
diary.

## Deviation contract

If the diff cannot be read or a claim cannot be evaluated read-only, stop and report which
claim and why. Grep depth is yours.
