# Unit R-A — checker brief

## Role and engine

`checker` on Claude Sonnet, a native Claude subagent with `Read`, `Grep`, and `Glob` and no
shell, in the checkout `C:/Users/mikes/WebstormProjects/roughnotes` at the tip the dispatch
message names, after unit R-A returned (the tree carries its uncommitted edits). You read the unit's
report at `tmp/units/r-a-report.md`, the brief at `tmp/units/r-a-brief.md`, and the tree, and you
report mechanical facts; you rule on nothing subjective and edit nothing.

## Criteria — report each as MET or UNMET with the lines it rests on (file:line)

1. The report carries the Bootstrap `aria-expanded` measurement with the command that took it and
   the reading before and after the open.
2. The report carries the collision list the resolver reported, each member with its repair, and
   a browser test that reports every `ambiguous` refusal across the routes the product guide's
   table names exists in the tree (name its file and case).
3. `app/browser/App.vue` carries `aria-expanded` on the offcanvas trigger bound to the menu's
   state, or the report's measurement shows Bootstrap writes it and a test asserts it through
   `readStates` or `waitForState` (quote the assertion).
4. Every control the unit renamed has its new name in the product guide's vocabulary
   (`guides/README.md`), and the report carries a guide patch wherever the guide states the old
   name; no invented copy (quote each renamed name and the guide line that carries it).
5. The diff touches only owned files: `app/browser/**`, `app/core/**` (name constants alone),
   `tests/app/browser/integration.test.ts`, `tests/app/browser/setup.ts` (name constants alone),
   `tests/app/browser/App.test.ts`, `tests/app/browser/components/**`; no vendored file, no
   `vite.config.ts`, `configs/**`, `package.json`, `tests/setupBrowser.ts`, or `.orkestrel/**`
   (compare `git status --short` in the report against this list).
6. Each control `R-A-C1` through `R-A-C4` has a command and a red-then-green reading in the
   report; no test is named for a control label.
7. No `// TODO`, skipped test, or `.only` was added (grep the diff's added lines in the report).

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing. Edit
nothing.

## Output

Return, as your final message and nothing else, one line per criterion, `MET` or `UNMET`, with
the quoted lines it rests on, and the terminal line `CHECK: PASS` or `CHECK: FAIL <criteria>`.
