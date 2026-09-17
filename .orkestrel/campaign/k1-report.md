# Unit K1 report

## Done / not done per change

1. **Statechart family trigger** — done. `SKILL.md` family table, Statechart row, Declared cell.
   - Before: `Where a journey drives a control that carries state`
   - After: `Where a journey drives a transition of an entity carrying its own state and event vocabulary`

2. **Entity-requirement exclusion** — done. `references/statechart.md` § Declare the table, first bullet.
   - Before ended: `...entity does not have fails to typecheck.`
   - After appends: `A view-local reactive ref inside a component is not such an entity. Never declare a state union or an event union solely to type a table; \`AGENTS.md\` § Design laws bars a literal union that names no real domain state.`

3. **Positive redirect bullet** — done. `SKILL.md` § Derive journeys from intents, immediately after the "Assert the negative beside the positive..." bullet.
   - Added: `Assert the state a control announces beside every drive that sets it, and on an unselected sibling. A control announcing state owes this assertion whether or not the surface carries the statechart family.`

4. **Journey law 8** — done. `SKILL.md` § Apply the journey laws, after law 7.
   - Added law 8, "Perform every interaction step unconditionally," verbatim as supplied, using `failure voice`.

5. **`pressKeys` restoration** — done, all sites. See sweep below.

6. **Variant channel constraint** — done. `references/styles.md` § Run per variant, appended as its own paragraph before `## Contrast and focus chrome`:
   `Vitest \`provide\` carries serializable values only. Where a workspace fans one project out per variant, the project's provided variant carries \`name\`, \`width\`, and \`height\`; \`apply\` does not cross that channel. Run \`apply\` inside the test from the variant the project provides.`

## The `pressKeys` sweep

- `references/layer.md` § What it drives, third bullet — replaced closing clause with the supplied text naming `userEvent.keyboard` from `vitest/browser` and listing the five click/type/traverse verbs.
- `references/layer.md` § Which helpers take an element — dropped `pressKeys` from the "No" population row; no substitute added.
- `references/layer.md` § Input and traversal — replaced the `pressKeys(keys)` row with the `userEvent.keyboard(keys)` row as supplied.
- `references/statechart.md` § Drive the act the way the transition happens — replaced the line with the supplied text.
- `references/styles.md` § Contrast and focus chrome — replaced the `readRing` line with the supplied text.

Final sweep: `grep -rn pressKeys .agents/ .claude/` returns nothing (exit 1, no matches).

## The link check

Ran a script walking each of the four owned files' Markdown links (`[text](target)`), resolving
relative file targets against the file's directory and checking existence, and resolving `#anchor`
targets (in-file and cross-file) against the target file's heading slugs (GitHub-style: lowercase,
strip non-word characters, spaces to hyphens). Every relative-file link resolved and every heading
anchor matched a heading in its target file. No broken link or anchor reported.

## Gates

- `npx oxfmt --config .oxfmtrc.json --check <the four files>` — oxfmt covers Markdown in this
  repository. The first `--check` run flagged `SKILL.md` and `layer.md` for table-column alignment
  (the edited text widened some table cells beyond the existing pipe alignment). Ran oxfmt without
  `--check` on the four owned files to converge formatting (whitespace-only realignment; content
  unchanged — confirmed by diffing the reformatted files against the pre-format edits). Re-ran
  `--check`: "All matched files use the correct format." Exit 0.
- `npm run test:policy` — 102 tests passed, 1 file, 0 failures.
- `npm run build` — succeeded (`build:src` core/server/bin, `build:host` staged 172 files,
  `build:inventory` staged 172 entries into `host.json`).
  `git diff --stat host.json` shows `host.json | 10 +++++-----` (5 changed lines). All five changed
  entries are the per-file digests for `agents/skills/orkestrel-prove-journey/SKILL.md`,
  `references/layer.md`, `references/statechart.md`, `references/styles.md`, and the manifest's
  top-level `digest` field — every one traces to a file this unit edited.
- `git status --short` shows exactly:
  ```
  M .agents/skills/orkestrel-prove-journey/SKILL.md
  M .agents/skills/orkestrel-prove-journey/references/layer.md
  M .agents/skills/orkestrel-prove-journey/references/statechart.md
  M .agents/skills/orkestrel-prove-journey/references/styles.md
  M host.json
  ?? .orkestrel/campaign/k1-brief.md
  ?? .orkestrel/campaign/k2-brief.md
  ?? .orkestrel/campaign/skill-survey-verified-plan.md
  ?? .orkestrel/scaffold/post-landing-audit.log.txt
  ```
  The four skill files and `host.json` are the only modified files. The `.orkestrel/` untracked
  files predate this dispatch (present at session start per the initial git status) and this unit
  did not create or edit them.

## What I did not close, and why

Nothing in scope. All six changes landed exactly as specified, the `pressKeys` sweep is clean, the
link check passed, and every required gate is green.
