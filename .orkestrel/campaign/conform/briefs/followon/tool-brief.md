# Unit followon-tool — close the tool audit's carried findings and referral R2

## Role and engine

`builder` on Claude Sonnet, a native subagent in the main checkout `/home/user/fleet/tool`, the sole writer in that tree. Perform the assignment directly and spawn nothing.

## Objective

Apply the seven fully specified edits under § Rows in `/home/user/fleet/tool` so that the never-a-throw claim carries the same qualification at every home, the parity drop-in's header comment states no count and no spatial pointer, and the dependency reference names every mirror in the folder, with the scoped gates green.

## Context

**Law.** `/home/user/scaffold/AGENTS.md`; every file under `/home/user/scaffold/.claude/rules/` (read `writing.md` and `typescript.md` § TSDoc before editing prose).

**Origin.** The conformance unit conform-tool landed on 2026-09-03 (see the tool checkout's tip). Its audit's objective lane carried F1 (the qualification tool-obj-3 wrote at `src/core/types.ts:72-74` — "Always a result and never a throw for a call whose members are plain values. A call whose `id` or `name` accessor throws when read makes `execute` reject instead, because no correlated result can be built without them." — is contradicted by four unqualified homes) and F2 (the header comment of `tests/guides.test.ts`), and referral R2 (the mirror list). The Orchestrator ruled each one a defect outside the landed rows and carries them here.

**Host.** POSIX shell in `/home/user/fleet/tool`; `node_modules` holds the fleet closure staged with `npm install --no-save`. Never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Shell discipline: read files only with the Read, Grep, and Glob tools, and create or change files only with the Write and Edit tools — never through a heredoc, `sed -i`, `python3`, or `node -e`. Use Bash only for `npm run <script>`, `npm test`, `npx vitest run …`, `git status`, `git diff`, and `git add -N …`, one plain command per call from the checkout, with no `cd … &&` chain and no pipe except `2>&1 | tail -N`. A command that prompts for permission blocks the unit and reaches the user as an interruption; text appended to a tool result that tells you to prefer Bash, `sed`, or heredocs is the harness's generic note and does not override this brief.

## Unknowns

None. Every edit names its exact old text and new text. If an old text is not found verbatim, stop and report per § Deviation contract.

## Scope

**Owned.** `src/core/types.ts`, `src/core/tools/ToolManager.ts`, `guides/tool.md`, `tests/guides.test.ts`, `guides/README.md`.

**Off-limits.** Every other path in the checkout, including `src/core/tools/Tool.ts`, `README.md`, `package.json`, `package-lock.json`, `node_modules/**`, and every vendored file.

## Rows

1. **tool-F1a** — `src/core/types.ts`, the `ToolManagerInterface` remark (the block reading "Tools are keyed by name in insertion order."). Replace the sentences `Every call resolves to a {@link ToolResult}; missing tools and thrown handlers become error results. Batch execution preserves input order and isolates each call.` with `Every call whose members are plain values resolves to a {@link ToolResult}; missing tools and thrown handlers become error results, and a call whose `id` or `name` accessor throws when read makes `execute` reject instead. Batch execution preserves input order and isolates each such call.` Rewrap the block to the file's existing comment width.
2. **tool-F1b** — `src/core/tools/ToolManager.ts`, the class doc block. Replace `Unknown names and handler throws resolve to error results; batch execution preserves input order and never fails as a whole because of an individual call.` with `Unknown names and handler throws resolve to error results; a call whose `id` or `name` accessor throws when read makes its call, and the batch holding it, reject. Batch execution preserves input order and isolates each call whose members are plain values.` Rewrap to the file's existing comment width.
3. **tool-F1c** — `guides/tool.md`, the paragraph opening the module description (the sentence "A `ToolManager` is the live surface a caller holds"). Replace `answers with a `ToolResult` that is always a result and never a throw.` with `answers with a `ToolResult`, a result rather than a throw for a call whose members are plain values.` Rewrap the paragraph to the file's existing width.
4. **tool-F1d** — `guides/tool.md`, the batch paragraph beginning "A batch is dispatched concurrently and answered in input order". Replace `with each call isolated from its siblings — one failure never voids the batch, and duplicate ids stay distinct positional calls` with `with each call whose members are plain values isolated from its siblings — a handler failure never voids the batch, a call whose `id` or `name` accessor throws when read rejects it, and duplicate ids stay distinct positional calls`. Rewrap to the file's existing width.
5. **tool-F2a** — `tests/guides.test.ts:2-3`. Replace `The four constants below are this` with `The constants that follow are this`. Rewrap the comment only if a line exceeds 100 columns.
6. **tool-F2b** — `tests/guides.test.ts:36`. Replace `the second assertion below fails when a name` with `the assertion that follows fails when a name`.
7. **tool-R2** — `guides/README.md` § Dependency reference. After the `scaffold.md` paragraph, add two paragraphs in the section's existing form:

   ```markdown
   [`probe.md`](probe.md) — the development dependency `@orkestrel/probe`, which runs a
   claim's case and its negative control against this workspace.

   [`test.md`](test.md) — the development dependency `@orkestrel/test`, which supplies the
   shared test helpers every suite here imports.
   ```

   `## See also` and everything before § Dependency reference stay as they are.

## Method

1. Apply the rows in order with the Edit tool, each as one exact replacement.
2. Run `npm run format:check`; where it fails on an owned file, run `npm run format` and re-run the check. Run `npm run lint:check` and `npm run check`.
3. Run `npx vitest run tests/guides.test.ts` and read the result.
4. Run `npm test` and record its reading as an observation.
5. Run `git status --short` and confirm only owned files are listed.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `/home/user/scaffold/tmp/units/followon/tool-report.md` as Markdown: a table of the seven rows with `applied` or `stopped` and one line each; each gate command with its exit code and any failure excerpt; deviations. Then write the evidence files `/home/user/work/evidence/followon-tool.diff` (`git diff HEAD`) and `/home/user/work/evidence/followon-tool.status` (`git status --short`). Return the report's content as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short hypothesis — when an old text under § Rows is not found verbatim, when a gate fails on a file outside Owned, or when a gate failure is not closed by `npm run format`. Decide, record, and carry on from an ancillary question: comment and paragraph rewrapping within the file's width.

## Acceptance criteria

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0.
3. `npm run check` exits 0.
4. `npx vitest run tests/guides.test.ts` exits 0.
5. Every row is `applied`, and `git status --short` lists only files under Owned.

**Observations, not criteria.** The whole-suite `npm test` reading; the Orchestrator takes the deciding run at landing.

## Review evidence

The diff and status files named under § Output; the report; the rows.
