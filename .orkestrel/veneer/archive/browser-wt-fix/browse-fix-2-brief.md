# Unit browse-fix-2 — the review's two follow-ups on `b1c66e3`

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\browser-wt-fix`, branch `browse-fix` at `b1c66e3` (your previous commit). Make one commit; never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## Context

An independent review passed every item of `b1c66e3` and raised two findings outside its claims.

1. **O1.** `guides/browser.md:2891` states two behaviors with no executed assertion: the CDP placement renders a `<summary>` as a `DisclosureTriangle` row with `expanded=` while the DOM placement gives it no row, and a lone `role="treeitem"` outside a tree reads as role `generic` with no states in CDP while the DOM placement keeps a `treeitem` row. `.claude/rules/documentation.md` § Parity requires an executed assertion behind a prose claim about behavior; it overrides the earlier ruling that only declared them. Add live service cases beside the lone-tab case (`tests/service/document.test.ts:305-321`) for a `<details><summary>` and a lone `role="treeitem"`, asserting each placement's row as the guide states it, and make each fail when its claim is false (state the mutation you use and record red and green counts).
2. **O2, unverified.** In `src/server/stores/FileBrowserStore.ts:396-410`, when another writer removes the empty lock, Windows can hold the directory in a delete-pending state, so this writer's `lstat` or `rmdir` might fail with `EPERM` rather than `ENOENT`, and the release would throw `BROWSER_JOURNEY_ACCESS` from `finally` over a committed result. Probe it first, in `tmp/probes/`, on this Windows host: race a real `rmdir` of an empty directory against `lstat` and `rmdir` from another call path, many times, and record every error code observed, with a control that shows the probe reaches the race. If `EPERM` (or another code) appears, extend the release's absent-or-directory return to that case with a regression test that drives it and fails before the fix; if no such code appears across a bounded run, change nothing in the store and record the reading and its bound in the report.

## Gates

After the last edit, each exit code read bare: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src:server`, `npm run test:guides`, `npm run test:policy`, then `npm run build` and `npm run test:service`. Then `git diff --check`. One commit. The final `git status --porcelain` is empty.

## Output

Write `tmp/codex/browse-fix-2-report.md` and return it as your final message: each finding's repair or reading with its commands and counts, the gate table, the commit hash, and any deviation. No process diary.

## Deviation contract

Stop only if a claim in `guides/browser.md:2891` is false on this host's Edge, and report: expected, found, evidence, and one hypothesis.
