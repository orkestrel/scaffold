# U8-range audit reconciliation — Orchestrator ruling, 2026-08-15

Two blind lanes on one brief (`u8-audit-brief.md`): Sol analyst (journal
`tmp/codex/u8-audit.jsonl`, thread 01a0056d-cd98-7c40-b173-66e1c85adb44, swept at acceptance)
and Opus reviewer. Both returned FAIL. Per-claim ruling:

| Claim | Sol | Reviewer | Ruling |
| --- | --- | --- | --- |
| 1 membership | BROKEN | BROKEN | RETAINED → fix item 1 (directory never enumerated; orphan/stale frames stay green) |
| 2 instrument | UNRESOLVED | UNRESOLVED | CONFIRMED post-audit on Orchestrator-executed evidence: `u8b-red-proof.log` (isolated worktree at d184856, stylesheet withheld, exit 1, drawer 2.2958/1.5892, filter 2.2398 — the writer's recorded values to the digit) + isolated diff `30f6ed1..d184856 -- tests/setupBrowser.ts` = +5 lines (one import, four comment lines), readers byte-identical |
| 3 bars paid | CONFIRMED | CONFIRMED | CONFIRMED |
| 4 cascade | CONFIRMED | CONFIRMED | CONFIRMED |
| 5 reply/feed | CONFIRMED | CONFIRMED | CONFIRMED |
| 6 H7 carriers | CONFIRMED | CONFIRMED | CONFIRMED |
| 7 guide parity | CONFIRMED | BROKEN | RETAINED → fix item 2. Reviewer's mechanism verified at source: halfmoon's `.btn-check:focus-visible+.btn{…outline:0…}` at (0,3,0) beats the app rule's (0,2,0), so the feed register filters keep the halo and "every control now wears the same opaque ring" is false. Fix closes the gap rather than scoping the sentence |
| 8 scope honesty | BROKEN | CONFIRMED | CONFIRMED. The guides edit was the Orchestrator's serial application of the unit's report-only patches — the documented integration protocol (executors return exact patches; the Orchestrator applies them serially). Attribution recorded in d184856's message and here. Sol's re-land instruction dropped on the record: a second landing would produce an identical diff through a second door |
| 9 ancillary | CONFIRMED | CONFIRMED | CONFIRMED |

Outside-claim findings, each with its carrier:

- Sol: capture run retains no accessibility snapshot / interaction log / console log — verified
  at `orkestrel-polish-surface` `references/capture-harness.md` "Capture the full portfolio" →
  fix item 5.
- Reviewer F1: `focus.css` comment presents `[tabindex]` as coverage when it is the
  load-bearing specificity term → fix item 3.
- Reviewer F2: register filters keep the halo; a naive reading would measure the clipped input
  and certify invisible chrome → merged into fix item 2 (rule + label-measuring reading).
- Reviewer F3: `deriveAddress` names two concepts (app string-lineage renderer vs core
  ExecutionContext derivation) and the file-wide parity gate cannot see the missing row →
  fix item 4 (rename to `deriveLineage`, consumers updated, guide rows report-only).
- Reviewer F4: a test named for the property its assertion disproves → fix item 6.

Every retained finding names its carrier in `u8-fix-brief.md`; no finding dropped. Fix writer:
native Opus implementer (the capture-harness work needs listeners Sol's sandbox denies); the fix
round's audit therefore goes to Sol, an engine that did not write it.

## Fix-round audit (Sol, thread 01a005a1-2c09-7213-9229-ad4dcfd4cbae) and its settlement

Sol returned FAIL: claims 4/6/7/8 CONFIRMED, 1/2 UNRESOLVED (writer-only red runs), 3/5 BROKEN,
one outside finding. Settled:

- Claim 1 CONFIRMED by Orchestrator probes: orphan file → exit 1
  (`expected [ 'orphan-narrow-dark.png' ] to deeply equal []`), zero-byte frame → exit 1
  (`expected [ 'login-narrow-dark.png' ] …`), restored → 21/21. Logs:
  `u8-fix-red1-orphan.log`, `u8-fix-red2-empty.log`, `u8-fix-green-restored.log` (tmp, swept at
  acceptance).
- Claim 2 CONFIRMED by Orchestrator probe: worktree at 6b89ba7 with focus.css reverted to
  d184856 fails the register-filter readings at 2.2470/1.9315 (writer claimed 2.25/1.93). Log:
  `u8-fix-red3-ring.log`.
- Claim 3 closed by Orchestrator direct fix (one TSDoc sentence), commit 4a78ccd.
- Claim 5 (TH scope → rowheader; a bypassed drive in the open journal) and the outside finding
  (function assignments inside Journal.watch/release) verified at source and carried to the micro
  round: `u8-micro-brief.md`. Sol's file citation `open-wide-light-steps.txt` does not exist —
  the journal is per-scenario `open-steps.txt` — recorded as a citation defect; the substance
  held at the real file.
