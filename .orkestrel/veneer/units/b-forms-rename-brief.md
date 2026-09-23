# Unit B-FORMS-RENAME — the D40a rename and the input-group remark's voice

## Role and engine

`builder` on Sonnet (native Claude subagent), sole writer in `/home/user/veneer-bfr` (a worktree
detached at `53628aa`, the session branch tip after CONTROL's landing, its consequence rounds, and
fold 32, with `node_modules` installed by the Orchestrator). Perform the assignment directly and spawn nothing. Use absolute
paths under `/home/user/veneer-bfr` for every command and file, and run every npm and npx command
from `/home/user/veneer-bfr`. Do not commit, push, install, or run `git checkout`, `git restore`,
`git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

The D40 mixins carry the names D40a rules, every include names them, the compiled cascade is
byte-identical before and after, the `INPUT_GROUP_CASES` remark states the `reads` map in the
`FORM_CONTROL_CASES` remark's voice, and the gates in § Acceptance criteria are green.

## Context

**Evidence.** The rename sites, from `grep -rn "control-type\|control-border" src tests guides`
run at `53628aa` (the `ROADMAP.md` mentions are the Orchestrator's):

```text
src/styles/_mixins.scss:49:@mixin control-type {
src/styles/_mixins.scss:59:@mixin control-border {
src/styles/components/_form-control.scss:30:		@include control-type;
src/styles/components/_form-control.scss:34:		@include control-border;
src/styles/components/_form-select.scss:35:		@include control-type;
src/styles/components/_form-select.scss:42:		@include control-border;
src/styles/components/_input-group.scss:56:		@include control-type;
src/styles/components/_input-group.scss:60:		@include control-border;
```

The `guides/veneer.md` file names neither mixin (the same grep returned no guide line). The
`INPUT_GROUP_CASES` remark in `tests/setupStyles.ts` around line 4210 reads:

```text
 * `reads` is keyed by property, across every rule the selector heads: a sized select heads its size
 * rule and the rule that restores its indicator room, and the two write different properties. A
 * property the row leaves out is the claim that its declaration writes no `var()`, so an empty row
 * separates a rule holding Bootstrap's own values from one this package routed onto tokens, and a
 * token moved from the property that consumes it onto another reads as a different row.
```

The `FORM_CONTROL_CASES` remark in the same file (around line 4855) carries the settled voice:
"The `reads` map is keyed by property. A property the map leaves out is the claim that its
declaration writes no `var()`, so an empty map states that the rule reads no custom property and
leaves its literals to the value assertions. A token moved from the property that consumes it onto
another declaration of the same rule reads as a different row."

**Decisions.** D40 and D40a in `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`
(read the `## D40a` section: `control-type` becomes `input-text` and `control-border` becomes
`input-border`; the declarations, their order, and the compiled bytes are unchanged; the comments
name `.form-control`, `.form-select`, and `.input-group-text` as the readers).

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,names,writing,tests}.md`.
Skill: none. Guide: none owned.

**Installed primitives.** None needed.

**Host.** Linux, bash, npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`;
`npx --no-install sass` resolves the installed compiler.

**Standing conditions.** None.

## Unknowns

None the unit needs.

## Edits

Apply each exactly, once.

1. Before any edit, compile the cascade to a file outside the tree:
   `npx --no-install sass --no-source-map src/styles/index.scss > /tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/bfr-before.css`
   and record the exit code.
2. `src/styles/_mixins.scss`: rename `@mixin control-type` to `@mixin input-text` and
   `@mixin control-border` to `@mixin input-border`. Replace the comment above the first with
   "// Emits the type run every form input shares: the release derives it from its `$input-*`
   // variables, so `.form-control`, `.form-select`, and `.input-group-text` read the same four
   // declarations here." and the comment above the second with "// Emits the border run every form
   input shares: the release derives it from its `$input-*` // variables, so `.form-control`,
   `.form-select`, and `.input-group-text` read the same two // declarations here." (each `//`
   marks a line; wrap so no line passes 100 columns). Change no declaration.
3. `src/styles/components/_form-control.scss`, `_form-select.scss`, and `_input-group.scss`:
   replace `@include control-type;` with `@include input-text;` and `@include control-border;`
   with `@include input-border;` at each site listed under § Context. Change nothing else.
4. Compile again to `…/scratchpad/bfr-after.css` with the same command, then run
   `cmp …/bfr-before.css …/bfr-after.css` and record the exit code; the two files must be
   byte-identical.
5. `tests/setupStyles.ts`, the `INPUT_GROUP_CASES` remark: replace the paragraph quoted under
   § Context with "The `reads` map is keyed by property, across every rule the selector heads: a
   sized select heads its size rule and the rule that restores its indicator room, and the two
   write different properties. A property the map leaves out is the claim that its declaration
   writes no `var()`, so an empty map states that the rule reads no custom property and leaves its
   literals to the value assertions. A token moved from the property that consumes it onto another
   declaration of the same rule reads as a different row." Rewrap so no line passes 100 columns.

## Scope

**Owned.** `src/styles/_mixins.scss` (the two mixins and their comments); `src/styles/components/_form-control.scss`,
`_form-select.scss`, and `_input-group.scss` (the include lines); `tests/setupStyles.ts` (the
`INPUT_GROUP_CASES` remark's `reads` paragraph).

**Shared (report-only).** `ROADMAP.md` (the D40a carrier row closes at the Orchestrator's fold).

**Off-limits.** Every other line of the owned files, every other file under `src/**`, `tests/**`,
`app/**`, and `guides/**`, `package.json`, `package-lock.json`, and the vendored files.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
`build` beyond the `sass` compiles named under § Edits and `npm run build:src`; no `npm install`;
no git command that discards a change.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

Run `export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
in every shell before any npm or npx command: the manifest's `devEngines` pin refuses the host's
npm 10 with `EBADDEVENGINES`, and that path carries npm 11. Never run `corepack use`, which
writes a `packageManager` field into the nearest manifest. Apply § Edits in order, then run and
record each exit code:

1. `grep -rn "control-type\|control-border" src tests guides` (must return nothing).
2. `npx oxfmt --config .oxfmtrc.json --check` over the owned files.
3. `npx oxlint --config .oxlintrc.json --deny-warnings tests/setupStyles.ts`.
4. `npm run check`.
5. `npm run build:src`.
6. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts`.
7. `npm run test:policy`.
8. `git status --porcelain` and `git diff 53628aa --stat`.

## Output

Write `/home/user/veneer-bfr/tmp/units/b-forms-rename-report.md` with: the edits applied (the
final mixin names and comments, the include lines, the remark's final text); the compile
comparison (both commands, both exit codes, the `cmp` exit code); a gate table (command, exit,
reading); the status and stat outputs verbatim; deviations (expected, found, exact evidence, done or
not done, at most one hypothesis); and claims flagged as unverified. Return the same report as
your final message.

## Deviation contract

§ Deviation protocol in `/home/user/scaffold/.agents/orchestration.md`. This unit settles nothing
by itself beyond where a rewrap breaks a line. Stop and report on any other conflict, including a
`cmp` that reports a difference or a search text not found once and exactly once.

## Acceptance criteria

1. The grep for the old names returns nothing, and the two mixins and the six include lines carry
   the new names.
2. `cmp` over the before and after compiles exits 0.
3. `oxfmt --check`, `oxlint`, `npm run check`, and `npm run build:src` exit 0.
4. The scoped `tests/setupStyles.test.ts` run and `npm run test:policy` exit 0.
5. The status lists the owned files and nothing else.

## Review evidence

The diff against `53628aa` and the status output, rendered by the Orchestrator at the unit's
return; the report `b-forms-rename-report.md`; the compile comparison's exit codes.
