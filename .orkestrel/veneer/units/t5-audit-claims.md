# T5 TEST-FRAME audit, round 1 — claims

Subject: the `@orkestrel/test` unit in `/home/user/test-tf` (branch `unit/tf`, uncommitted over `80c419e`), briefed by
`t5-test-frame-brief.md` and reported in `t5-test-frame-report.md`. The diff is `t5.diff` and the status `t5-status.txt`,
both beside this file. Each claim is falsifiable; rule every one.

1. **Scope and gates.** The status lists exactly `guides/test.md`, `src/browser/helpers.ts`, and
   `tests/src/browser/helpers.test.ts`; no off-limits file moved. The gates in the report's table ran as stated. The
   Orchestrator ran `npm run build` (exit 0) and then `npm run test:guides` in the worktree after the unit exited:
   exit 0, `Tests  51 passed (51)`.
2. **Staging.** An element frame stages the pane to `ceil(element.getBoundingClientRect().bottom + scrollY)`, floored
   at the declared height, through the same growth-carrying loop and the same `CAPTURE_STAGINGS` bound and refusal
   text. For a page frame the restructured loop takes the same readings, stages the same panes, and refuses at the same
   staging as the base loop in `git show 80c419e:src/browser/helpers.ts`.
3. **The lift.** The lift rule moves only the calling tester's frame in the runner page, is removed on every path out of
   `captureFrame` (the passing path, a refusal from the staging loop, a screenshot rejection, and the two path and byte
   refusals), and is skipped when the tester has no `frameElement`. The `iframe[data-vitest]` selector matches the
   frame the installed Vitest renders the tester in (`node_modules/@vitest/browser/dist/`).
4. **Hand-back.** `captureFrame` hands the tester back as it found it: the pane through `releasePane`, the runner page
   through the lift's removal, and the tester's scroll position.
5. **The sized refusal.** `readFrame` names `<width>x<height> device pixels` read as big-endian 32-bit integers at bytes
   16 and 20 when the bytes open with the PNG signature and an `IHDR` chunk type, keeps the bare refusal text
   otherwise, and cannot throw any other error from the header read (short files and non-PNG bytes included).
6. **The proofs.** Each new proof ran red on the base `helpers.ts` (3 failed, 12 passed, 334 skipped) and green after
   the change (15 passed, 334 skipped). Each mutation in the report's table reddens the proof it names, and each
   proof's assertions distinguish its mutation from the passing case. The element-below-pane proof places its element
   past both the runner's window and the declared pane on any host window size.
7. **Page frames are untouched.** A page frame's shot path in the changed `captureFrame` is the base path: no scroll,
   no lift, no compositing, the same `page.screenshot` call. The compositing hint applies only while an element
   frame's shot is taken.
8. **Prose.** Every changed TSDoc sentence and every changed guide sentence in `guides/test.md` states what ships. None
   states a count, uses a row the substitution table in `/home/user/scaffold/.claude/rules/writing.md` bans, or uses a
   code token without its noun. The Surface rows are unchanged because each changed function's first TSDoc sentence is
   unchanged.
