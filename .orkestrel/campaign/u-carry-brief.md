# Implementation brief — U-carry

## Role and engine

`builder`, native Claude subagent on Sonnet, sole serial writer in `/home/user/scaffold` from the
clean committed baseline you read with `git log --oneline -1`. Fully specified: the two rows are
prescribed; your judgment load is the wrap and the gates.

## Objective

Give the campaign's two open items without a carrier their carrier in `ROADMAP.md`, the plan of
record, before the campaign folder is pruned (`.agents/skills/orkestrel-debrief/references/retention.md`
§ The carry check). Nothing else.

## Item

In `ROADMAP.md` § The next conformance matrix's rows, directly after the scaffold row that begins
"the 0.0.65 fix audit ruled these test-side findings" and ends "Ruled on 2026-09-13.", and before
the row beginning `- **abort**:`, insert exactly these two rows, re-wrapped to the file's width
with every code span on one line:

```
- **scaffold**: the `analyst` bridge driver in the `.claude/agents/analyst.md` file backgrounded
  its `codex exec` on every audit round of the 0.0.65 campaign, against
  `.agents/orchestration.md` § Launching, and returned before the terminal event; one exec was
  cap-killed at 1500 s with the engine live and was resumed by thread id. Land the correction in
  the role file: the driver runs the exec in the foreground under the `timeout` command, waits
  for exit, and returns only with the journal path, the session id, and the last message; size
  the cap from the observed high mark, since a brief the size of the U-fix-4 audit's ran past
  1500 s. The role file is vendored, so the correction rides the next scaffold release. Ruled on
  2026-09-13.
- **scaffold**: the scaffold row in this section that begins with the `scripts/deps.sh` script
  predates the 0.0.65 campaign and carries backticked tokens with no following noun and the word
  "newer" for a version; the campaign swept its own rows to the token rule and left this one.
  Sweep it, and the rest of this file, under `.claude/rules/writing.md` § Code tokens,
  references, and links. Ruled on 2026-09-13.
```

Write "because" rather than "since" wherever the text above says "since" (the substitution table
bans causal `since`). Change nothing else in the file.

## Owned files

`ROADMAP.md`.

## Off-limits

Every other file.

## Execution and deviation contract

Perform this assignment directly and spawn no agent. Write only the owned file. Run no `git`
command that discards a working-tree change; run no tree-wide `format` or `lint --fix`. Stop and
report if the anchor rows are not found.

## Acceptance criteria, cheap-first

1. `npm run format:check` exits 0.
2. `npm run test:policy` exits 0.
3. `grep -c 'bridge driver in the `.claude/agents/analyst.md` file' ROADMAP.md` reads 1, and
   `grep -c 'begins with the `scripts/deps.sh` script' ROADMAP.md` reads 1.
4. `grep -n -w 'since' ROADMAP.md` prints no line inside the two rows.
5. `git diff --stat` names only `ROADMAP.md`.

## Output

Each criterion with its exact reading; the two rows verbatim as they sit in the file; the
deviation state.
