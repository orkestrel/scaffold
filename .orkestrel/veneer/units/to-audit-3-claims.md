# Audit claims — TOAST (`to`), round 3

Subject: round 3's record — `to-3.diff` and `to-3-status.txt` (the worktree `/home/user/veneer-to`
against `2a3f223`), `to-shared-3.patch` (byte-identical to `to-shared-2.patch`), the report
`b-modal-to-report-3.md`, and the round-3 instruments and logs under `to-instruments/`
(`to-mutations-3.log.txt`, `to-mutate-3.py`, `to-sync-3.sh`, `to-gates-3.sh`, `to-patch-3.sh`,
`to-logs-3/`) — against the successor brief `b-modal-to-brief-3.md`, the round-2 verdict
`to-audit-2-verdict.md` and its lane verdicts, and round 2's record (`to-2.diff`, `to-shared-2.patch`,
`b-modal-to-report-2.md`). The unit was written by `opus` on Opus 5.5. Each claim is falsifiable; a
lane rules CONFIRMED or BROKEN with `file:line` evidence, and before confirming a claim about a proof
names the mutation that would make the proof fail and whether its assertions distinguish that mutation
from the passing case.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the round-1
and round-2 verdicts' rulings stand, and every claim they confirmed stays confirmed unless round 3
changed its subject; the validation copy was deleted before the report, so a lane rules the gate and
mutation claims from the code's assertions and the retained logs, and names which it read.

1. **Scope and delta.** `to-3-status.txt` lists round 1's four owned paths and nothing else; against
   `to-2.diff`, `to-3.diff` changes only the slot case in `tests/src/styles/components/toast.test.ts`;
   `to-shared-3.patch` is byte-identical to `to-shared-2.patch` and applies with `git apply --check` to a
   fresh extract of `2a3f223`.
2. **T7: the token-identity proof.** The slot case mounts, beside the resting toast, a toast inside a
   wrapper that declares a distinct length for the row's token alone, and asserts the slot follows it;
   the guard keeps the retuned length distinct from every row's resting length; the wrapper is part of
   the mounted fixture, so the scene's clear removes it; with the spacing row edited to the
   `--vn-size-6` token or the `--vn-gap-4` token, and with the padding-x row edited to the
   `--vn-space-8` token, the case reddens on the retune assertion (`to-mutations-3.log.txt`), and its
   assertions distinguish each edit from the passing case, including where the edited token declares
   the same length; no other row's edit escapes it.
3. **Law and report.** The changed case adds no `any`, no `as` beyond a const assertion, no `!`, no
   suppression, no mock, spy, or fake, no nested function beyond a callback passed directly, and no
   inline case population; its added comment and the report follow the writing rule; the report
   records each gate's command as it ran with its result line; a lane lists every count the report
   states as a finding outside the claims for the record.
