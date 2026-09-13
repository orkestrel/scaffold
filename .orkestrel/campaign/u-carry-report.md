# Unit report — U-carry (`builder`, Sonnet, native, returned 2026-09-13)

All checks pass. The two "since" matches (lines 15 and 576) are pre-existing, outside the two inserted rows.

**Changes**

- `ROADMAP.md` — inserted the two prescribed rows into § The next conformance matrix, directly after the row ending "Ruled on 2026-09-13." (the 0.0.65 fix audit row) and before the `- **abort**:` row, with the `since` → `because` substitution applied.

**Scoped validation**

1. `npm run format:check` → exit 0: "All matched files use the correct format." (225 files)
2. `npm run test:policy` → exit 0: 91 passed (1 file)
3. `grep -c 'bridge driver in the `.claude/agents/analyst.md` file' ROADMAP.md` → `1`; `grep -c 'begins with the `scripts/deps.sh` script' ROADMAP.md` → `1`
4. `grep -n -w 'since' ROADMAP.md` → two hits, both pre-existing (line 15, line 576), neither inside the two inserted rows
5. `git diff --stat` → `ROADMAP.md | 14 ++++++++++++++`, 1 file changed

**Rows as inserted (verbatim, in the file)**

```
- **scaffold**: the `analyst` bridge driver in the `.claude/agents/analyst.md` file backgrounded
  its `codex exec` on every audit round of the 0.0.65 campaign, against
  `.agents/orchestration.md` § Launching, and returned before the terminal event; one exec was
  cap-killed at 1500 s with the engine live and was resumed by thread id. Land the correction in
  the role file: the driver runs the exec in the foreground under the `timeout` command, waits
  for exit, and returns only with the journal path, the session id, and the last message; size
  the cap from the observed high mark, because a brief the size of the U-fix-4 audit's ran past
  1500 s. The role file is vendored, so the correction rides the next scaffold release. Ruled on
  2026-09-13.
- **scaffold**: the scaffold row in this section that begins with the `scripts/deps.sh` script
  predates the 0.0.65 campaign and carries backticked tokens with no following noun and the word
  "newer" for a version; the campaign swept its own rows to the token rule and left this one.
  Sweep it, and the rest of this file, under `.claude/rules/writing.md` § Code tokens,
  references, and links. Ruled on 2026-09-13.
```

**Deviation state**: none. The anchor rows were found exactly as the brief described, and no `git status`/`checkout`/`restore` command was run.