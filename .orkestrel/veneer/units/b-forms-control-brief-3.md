# Unit B-FORMS-CONTROL, round 3 — the prose micro-round

Successor to `/home/user/veneer-bfo/tmp/units/b-forms-control-brief-2.md`. What changed and why:
the fix-round audit (`/home/user/scaffold/.orkestrel/veneer/units/bfo-fix-audit-verdict.md`:
analyst FAIL 3, 5, 6, 7, 9; reviewer FAIL 6, 9 with MIXIN-READERS; checker FAIL 6) closed every
code claim and left prose: two guide paragraphs rewritten without a rewrap, a table remark whose
rung and map tokens stand without nouns and whose last sentence overstates what an empty map
proves, a token without a noun in a scenario remark, a temporal `once`, and a journey comment whose
pronoun has two referents. This round applies the exact text the lanes prescribed. The earlier
briefs stay in place unedited; the round-1 brief's Context, Execution, Output, and Deviation
contract bind here except where this brief states otherwise.

## Role and engine

`builder` on Sonnet (native Claude subagent), sole writer in `/home/user/veneer-bfo` (detached at
`2c10329`, the round-1 and round-2 writes uncommitted in the tree, the state the fix-round audit
ruled on). Perform the assignment directly and spawn nothing. Use absolute paths under
`/home/user/veneer-bfo` for every command and file, and run every npm and npx command from
`/home/user/veneer-bfo`. Do not commit, push, install, or run `git checkout`, `git restore`,
`git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

Every edit under § Edits is applied as written and the gates in § Acceptance criteria are green.

## Context

**Evidence.** Locate every site by its text; the line numbers are approximate at the round-2 tree.
`guides/veneer.md` around lines 152 to 156 (the paragraph opening "Every Bootstrap utility Veneer
ships carries the `!important` Bootstrap writes for it"; its line "`components` layer carry one as
well, …" runs past 100 columns) and around 733 to 738 (the paragraph opening "The file button ships
on the standard `::file-selector-button` part."; its line ending "The button's inline-end" is 101
columns); `tests/setupStyles.ts` around lines 3792 to 3821 (the `FORM_CONTROL_CASES` doc block);
`tests/setup.ts` around line 963 (the `form-control-text-focus` scenario remark, "`form-control-text`
already names the `Form control text` subject inside"); `tests/src/styles/components/form-control.test.ts`
around line 56 ("A driven case is read only once the control is in the state its selector names");
`tests/app/browser/integration.test.ts` around lines 907 to 909 (the comment "The traversal starts
from the last text-control specimen rather than from the document's own start. The date control
ahead of it keeps focus on one element while Tab steps through its own date fields, and the
installed walk stops at the first element it reaches twice.").

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{writing,documentation,tests}.md`
(`writing.md` § Code tokens: a noun after each code token; § Substitutions: a temporal `once` is
`after`; § Sentence and paragraph order: name the noun where a pronoun has another referent).
Skill: none. Guide: `guides/veneer.md` (owned paragraphs only).

**Installed primitives.** None needed; add no helper.

**Host.** Linux, bash, npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`;
Chromium installed; `dist/` is built from the round-2 tree.

**Standing conditions.** `npm run test:setup` is red only on the shipped-key Set literal in
`tests/setupServer.test.ts` and `npm run test:conformance` only on the presence reading
`.form-floating > .form-control`; both are the Orchestrator's integration edits. Do not touch them.

## Unknowns

None the unit needs.

## Edits

Apply each exactly. A rewrap changes line breaks only and keeps every word.

1. `guides/veneer.md`, the paragraph opening "Every Bootstrap utility Veneer ships carries the
   `!important` Bootstrap writes for it": rewrap the whole paragraph so no line passes 100 columns.
2. `guides/veneer.md`, the paragraph opening "The file button ships on the standard
   `::file-selector-button` part.": rewrap the whole paragraph so no line passes 100 columns.
3. `tests/setupStyles.ts`, the `FORM_CONTROL_CASES` doc block's `@remarks` text: make these
   replacements, each once.
   - "`resolved` is a reading of the computed style" → "The `resolved` rung is a reading of the
     computed style".
   - "`declared` is the rule's declaration read out of the CSSOM" → "The `declared` rung is the
     rule's declaration read out of the CSSOM".
   - "`compiled` is the declaration read out of the compiled cascade in Node" → "The `compiled`
     rung is the declaration read out of the compiled cascade in Node".
   - "`excluded` is the prefixed file-button alias" → "The `excluded` rung is the prefixed
     file-button alias".
   - "`values` holds each recorded declaration as the release writes it" → "The `values` map holds
     each recorded declaration as the release writes it".
   - "`reads` is keyed by property. A property the row leaves out is the claim that its
     declaration writes no `var()`, so an empty row holds its rule to the release's own values, and
     a token moved from the property that consumes it onto another declaration of the same rule
     reads as a different row." → "The `reads` map is keyed by property. A property the map leaves
     out is the claim that its declaration writes no `var()`, so an empty map separates a rule
     holding Bootstrap's own values from one this package routed onto tokens, and a token moved
     from the property that consumes it onto another declaration of the same rule reads as a
     different row."
   Rewrap the changed paragraphs so no line passes 100 columns.
4. `tests/setup.ts`, the scenario remark: replace "`form-control-text` already names the
   `Form control text` subject inside" with "The `form-control-text` scenario already names the
   `Form control text` subject inside", and rewrap that paragraph so no line passes 100 columns.
5. `tests/src/styles/components/form-control.test.ts`: replace "A driven case is read only once the
   control is in the state its selector names" with "A driven case is read only after the control
   is in the state its selector names".
6. `tests/app/browser/integration.test.ts`: replace the whole three-line comment quoted under
   § Context with this text, wrapped so no line passes 100 columns:

   ```text
   The traversal starts from the `Form control readonly` specimen's control rather than from the
   document's own start. A walk from the start crosses the `Form control date` specimen, whose
   control keeps focus on itself while Tab steps through its date fields, and the installed
   `driveTraversal` walk stops at the first element it reaches twice.
   ```

## Scope

**Owned.** `guides/veneer.md` (the two paragraphs of edits 1 and 2); `tests/setupStyles.ts` (the
`FORM_CONTROL_CASES` doc block); `tests/setup.ts` (the scenario remark);
`tests/src/styles/components/form-control.test.ts` (the comment of edit 5);
`tests/app/browser/integration.test.ts` (the comment of edit 6).

**Shared (report-only).** `ROADMAP.md` (the report restates the landing records with the D39 row
dropped, because fold 29 closed D39 at L2's landing).

**Off-limits.** Every other line of the owned files and every other file, including
`src/**`, `tests/setupServer.test.ts`, `tests/conformance.test.ts`, `package.json`,
`package-lock.json`, and the vendored files.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
`build`; no `npm install`; no git command that discards a change.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

Apply § Edits, then run in this order and record each exit code:

1. `npx oxfmt --config .oxfmtrc.json --check` over the owned files.
2. `npx oxlint --config .oxlintrc.json --deny-warnings` over the owned TypeScript files.
3. `npm run check`.
4. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/form-control.test.ts`.
5. `npm run test:guides`.
6. `npm run test:app`.
7. `awk 'length > 100' guides/veneer.md tests/setupStyles.ts tests/setup.ts tests/app/browser/integration.test.ts | wc -l`
   over the changed paragraphs' files, and read whether any changed line remains past 100 columns
   (an unchanged line past 100 columns is outside this round).
8. `git status --porcelain` and `git diff 2c10329 --stat`.

## Output

Write `/home/user/veneer-bfo/tmp/units/b-forms-control-report-3.md` with: the edits applied (each
by its number, with the final text of every changed sentence); a gate table (command, exit,
reading); the landing records restated from the round-2 report with the D39 row dropped (the D31
carrier cell, the color-width row, the `FORM_RANGE_CASES` row, the FLOATING text-control half
bounded to "every floating text-control frame", and the shipped-key Set literal); the corrected
evidence statement for the range journey deviation (the trail continues past the select's embedded
newline and ends at the date control, so the walk stops at the date control); the status and stat
outputs verbatim; deviations (expected, found, exact evidence, done or not done, at most one
hypothesis); and claims flagged as unverified. Return the same report as your final message.

## Deviation contract

§ Deviation protocol in `/home/user/scaffold/.agents/orchestration.md`. This unit settles nothing
by itself beyond where each rewrap breaks a line. Stop and report on any other conflict, including
an edit whose search text is not found once and exactly once.

## Acceptance criteria

1. Every edit under § Edits is applied as written (the diff against the round-2 tree shows the
   replacement text and the rewraps and no other change).
2. `oxfmt --check`, `oxlint`, and `npm run check` exit 0.
3. The scoped `form-control.test.ts` run, `npm run test:guides`, and `npm run test:app` exit 0.
4. No changed line passes 100 columns.
5. The status lists the round-2 set and nothing else.

## Review evidence

The diff against `2c10329` and the status output, rendered by the Orchestrator at the unit's
return; the report `b-forms-control-report-3.md`.
