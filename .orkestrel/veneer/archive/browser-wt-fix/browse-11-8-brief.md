# Unit browse-11-8 — scope the SVG `switch` rule and prune its unselected branches in direct reads

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\browser-wt-fix`, branch `browse-11-repair` at `52cc34f`. Make one commit; never push, publish, or install outside this worktree. Perform the assignment yourself and spawn nothing.

## Assignment

Repair `tmp/codex/browse-11-review-3.md`: both required changes, in both placements, with their rows, and the parity finding (name the `switch` branch rule in the pruning lists at `guides/browser.md:1839` and `src/core/types.ts:2302-2309`). Rulings on the rest:

- The `symbol` and `defs` advisory: when no child of an SVG `switch` has rects (the `switch` is not laid out where it is defined), keep its first child element, so text a page draws through `use` reads once. Add a `use` row for it, and state the rule in the pruning lists.
- The two mutation-survivor advisories: add a row that fails when the `HTMLInputElement` clause is deleted, and one that fails when the `select`/`optgroup` clause is deleted for a non-`option` descendant. Leave the `closest('svg, foreignObject')` line as it is.
- The `content-visibility: auto` question: add a row with the `switch` inside an offscreen `content-visibility: auto` subtree and report what Chromium returns; if the rects are empty there, make the rule hold anyway.

## Evidence

Record each added row red at `52cc34f` and green after, with the command and counts; for the mutation rows, show the mutated source red and the restored source green.

## Gates

After the last edit, each exit code read bare: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src:core`, `npm run test:src:browser`, `npm run test:src:server`, `npm run test:guides`, `npm run test:policy`, `npm run test:setup`, `npm run test:setup:browser`, then `npm run build` and `npm run test:service`; then `git diff --check`. One commit; the final `git status --porcelain` is empty. When a test times out while another writer loads the host, rerun that file alone and report both runs; never raise a budget.

## Output

Write `tmp/codex/browse-11-8-report.md` and return it as your final message: per finding the repair and its red and green evidence, the gate table, the commit hash, and any deviation. No process diary.

## Deviation contract

Stop only for a finding you cannot repair without changing a public contract the design does not name, and report: expected, found, evidence, and one hypothesis.
