# Audit lane — `analyst` on GPT-6 Astra, objective lane, F7 CAPTURE brief 3 (the Orchestrator's assertion fix)

## Role and lane

`analyst` route on GPT-6 Astra (`gpt-6-astra`), `codex exec --sandbox read-only` rooted at
`/home/user/veneer-f7`. You hold the objective lane over a two-line change the Orchestrator wrote
under `.orkestrel/veneer/units/f7-brief-3.md`, closing your own claim 4 from
`/home/user/scaffold/.orkestrel/veneer/units/f7-fix-audit-analyst-verdict.md`. Perform the audit
directly and spawn nothing. Bound: rule within 8 minutes.

## Subject and evidence

The worktree is the fix round's tree plus the two lines. The whole diff against `07fc3c3` for the two
files is `git diff 07fc3c3 -- tests/app/browser/integration.test.ts tests/setupBrowser.test.ts`; the
two changed lines are the ones containing `indexOf('focus:'))).toContain(`. The host control is
recorded at `.orkestrel/veneer/units/f7-claim4-control.log.txt`:
with `describeSubject`'s tree half forced to its fallback, `npm run test:setup:browser` failed
`describes a control-rooted subject through a scope that encloses it` alone and `npm run test:journey`
failed `writes each subject its own accessibility artifact for the variant that rendered it` in every
variant alone; the restored file matched its digest and both projects passed.

## Claims

1. The journey assertion now reads the section before `focus:` for `button "Primary"` and the setup
   assertion reads the section before `focus:` for `button "Toggle"`, and each still reads the focus
   section for the same control in its neighbouring assertion, so a tree half reduced to its fallback
   fails each proof while a focus half reduced to its fallback also fails it.
2. Nothing else changed: the diff of the two files against the fix round's state
   (`.orkestrel/veneer/units/f7-fix-3.diff`, taken from the uncommitted tree, is empty because
   the fix round's writes are also uncommitted; rule instead from the two lines named and from
   `git diff 07fc3c3 --stat`, which must list the fix round's six files and no other).
3. The control's readings in the log are the readings claim 1 predicts.

## Output

The `orkestrel-falsify` verdict shape: numbered verdicts with `file:line`, findings outside the claims
to the `BROKEN` standard, and one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
