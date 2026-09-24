# Unit J-ROADMAP — the Veneer roadmap's engine-session sentences match how the engine session works

## Role and engine

`builder` on Sonnet, a native Claude subagent (Read, Grep, Glob, Edit, Write, Bash), the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/roadmap` (branch `unit/roadmap`, cut from Veneer `main` at `b1d314d`; `npm ci` already run).

## Objective

Make the Veneer `ROADMAP.md` J-ENGINE row and `### The engine session` state the engine session's working branch, its audit lanes, and its carrier units as they are on 2026-09-24, with the exact replacements this brief gives and no other change.

## Context

**Evidence.** `git show origin/main:ROADMAP.md` at `b1d314d` (read 2026-09-24):
- The J-ENGINE row of § Phases and units (the line beginning `| J-ENGINE `, around line 300) has a "Role and engine" cell that says `audited by \`analyst\` on Astra and \`checker\` on Sonnet;` and `J-INTEGRATION, J-ROWS) follow the design verdict's § Units and routing;`.
- `### The engine session` (around line 368), the first bullet: `- The engine session works on its harness-designated branch in Veneer and in scaffold, records that` / `  name in \`/home/user/scaffold/.orkestrel/veneer/engine/plan.md\`, and never pushes the baseline` / `  session's branch. Neither session force-pushes.`
- The same section, the landing bullet contains `(a merge commit), re-runs its gate chain on the merge result, pushes its branch, then fast-forwards`.
- The engine session's ruling E4 (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E4, and E14 for the worktree path): the session works on `main` in both repositories, with no session branch; each unit writes in `tmp/worktrees/<unit>` on `unit/<unit>` cut from `main`.
- The table's column widths: the "Role and engine" column is padded to the widest cell of that column (the B-COLLAPSE … B-SCROLLSPY row's cell). The J-ENGINE cell is narrower, so text added to it stays inside the column and oxfmt re-pads that row alone. oxfmt counts `…` as two columns.

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` § Writing; `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/writing.md` and `documentation.md`; skill: none; guide: none (the roadmap is the plan of record).

**Installed primitives.** None apply; the unit edits one Markdown file.

**Host.** Windows 11, Git Bash; `npm` and `npx` resolve to the `.cmd` shims. Write any multi-step program to a file and run the file; no heredoc, no `node -e`.

**Measurements.** None beyond the evidence above; read the file in the worktree before editing.

**Control identifiers.** R1, R2, R3 name the replacements in this brief only.

**Standing conditions.** The worktree is clean at `b1d314d`. The styles session owns every other section and row of `ROADMAP.md`; any change there is out of scope.

## Unknowns

None. If an old string is not found verbatim, stop and report it.

## Scope

**Owned.** `ROADMAP.md`: the J-ENGINE row's "Role and engine" cell and `### The engine session` bullets named below, nothing else.

**Shared (report-only).** None.

**Off-limits.** Every other file, and every other row and section of `ROADMAP.md` (§ Rulings included: its sentence "on its own branch (D43)" is the styles session's, and the Orchestrator asks that session to align it).

**What asserts the state this change ends.** `tests/policy.test.ts` reads authored Markdown for banned terms; `format:check` reads the table padding. Both are gates below.

**Tools and limits.** No install, commit, push, or discarding git command. Run only the checks named in § Acceptance criteria.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Return, as your final message: `git diff` of `ROADMAP.md`, `git status --short`, and each acceptance command with its exit code and last lines.

## Deviation contract

Stop and report (expected, found, evidence) if an old string is not found verbatim, or if `format:check` re-pads a row other than J-ENGINE. Decide and record: the line breaks of the rewrapped bullet (keep each line at or under 100 characters, matching the section).

## Acceptance criteria

1. R1: in the J-ENGINE row's "Role and engine" cell, replace `audited by \`analyst\` on Astra and \`checker\` on Sonnet;` with `audited by \`analyst\` on Astra and \`checker\` on Sonnet, with \`reviewer\` on Opus 5.5 where a unit changes a public shape;` and replace `J-INTEGRATION, J-ROWS) follow the design verdict's § Units and routing;` with `J-INTEGRATION, J-ROWS) follow the design verdict's § Units and routing, and J-GUARDS, J-HELD, and J-SAMEWAY carry the findings the landing audits left open;`.
2. R2: replace the first bullet of `### The engine session` with:
   `- The engine session works on \`main\` in Veneer and in scaffold (E4). Each unit writes in a` / `  worktree under Veneer's \`tmp/worktrees/<unit>\` on a \`unit/<unit>\` branch cut from \`main\`` / `  (E14), one writer per checkout. The engine session never pushes the baseline session's branch.` / `  Neither session force-pushes.` (the `/` marks a line break).
3. R3: in the landing bullet, replace `pushes its branch, then fast-forwards` with `pushes its branch (an engine unit's branch stays local), then fast-forwards`, rewrapping only that bullet's lines to 100 characters or fewer.
4. `npx oxfmt --check ROADMAP.md` exits 0 (run `npx oxfmt ROADMAP.md` once first if the padding moved, then check), and `git diff --stat` shows `ROADMAP.md` alone.
5. `npm run test:policy` exits 0.

**Observations, not criteria.** None.

## Review evidence

The Orchestrator captures the diff and status, and a `checker` on Sonnet reads them against R1 to R3.
