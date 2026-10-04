# Unit browse-9-10-6 — finish item 10 on the amended selection rule

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\browser-wt-browse`, branch `ccr-d15a48b1-yyyll6` at `0a80b99` (Windows portability `327a67e` and item 9 `0a80b99` are committed). Never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## Objective

Finish item 10 (commit 2) from its uncommitted candidate in the worktree. Read `tmp/codex/browse-9-10-5-report.md` and the item 10 part of the design of record, `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\showcase\browse\items-9-10-design.md`, which the Orchestrator amended at its lines 25 and 216 on your fifth run's probe.

## The ruling

The DOM placement's rows must equal the CDP placement's. On this Chromium (Edge 154.0.4258.53), an unannotated `tab` inside a `tablist` and an unannotated `treeitem` inside a `tree` carry no `selected` property, so the DOM placement renders `selected` only from an explicit valid `aria-selected` token or a native `HTMLOptionElement`'s selectedness, and otherwise omits it. The `false` default is withdrawn. An unannotated `tab` outside a `tablist`, which CDP reports as `false`, is invalid ARIA structure that the DOM placement does not emulate; name that difference in the guide's row format. Probe an unannotated `role="option"` inside a `listbox` the same way and follow what CDP reports. Keep every other item 10 ruling.

## Then

Make the parity comparison pass with the tablist, tree, and listbox rows that carry and lack `aria-selected`, show the removed default reddens it (record the mutation and counts), run the full gate list of the first brief plus `npm run test:src:server` and `npm run test:service`, and commit item 10 as commit 2. The final `git status --porcelain` is empty. Do not run the scaffold discovery script.

## Output

Write the report to `tmp/codex/browse-9-10-6-report.md` and return it as your final message: item 10's rulings with their red-before and green-after, the probes, the gate table, the commit hash, and any deviation. No process diary.

## Deviation contract

Stop only for a product defect you cannot repair without changing a public type or another documented behavior, and report: expected, found, evidence, done or not done, and one hypothesis.
