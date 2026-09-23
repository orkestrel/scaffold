# Audit lane — `checker` on Sonnet, mechanical conformance, CLOSE-ID (`ci`)

`checker` on Sonnet (native subagent, clean context, read-only). CLOSE-ID ran on `builder` from a fully specified brief (`units/close-id-brief.md`), so you are the round's only lane. Rule on these claims by reading alone, citing `file:line`:

1. **Delta and scope.** `units/ci.diff` (the worktree `/home/user/veneer-ci` against `7398772`) changes only the `FORM_CHECK_SPECIMENS` doc block in `app/browser/constants.ts`; `units/ci-status.txt` lists that file and no other.
2. **The text (criterion 1).** The paragraph reads "each `id` attribute is unique to the showcase so a label names one control" and every other word of the paragraph is unchanged from `7398772` (compare the diff's removed and added lines word by word); the paragraph is wrapped at 100 columns inside its ` * ` frame.
3. **Law and report.** The delta adds no other prose; the report `units/ci-report.md` records each criterion's command and result line and states no count.

Law: `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md`. Edit nothing, run nothing, spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts with `file:line`, findings outside the claims to the BROKEN standard, and one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
