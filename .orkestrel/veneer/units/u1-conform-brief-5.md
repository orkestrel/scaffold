# Unit U1-conform — successor brief 5: four prose edits

## What changed and why

This brief supersedes `u1-conform-brief-4.md` for the remainder of the unit; briefs 1 to
4 stand except where this one says otherwise, and `u1-conform-report-4.md` is the
baseline. The third audit round (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u1-conform-audit-verdict-3.md`)
confirmed brief 4's behaviour on every lane and carried four prose findings: the doc block of
`extractSpecifiers` in `tests/setupConformance.ts` writes `preserveParens` with no kind word
after it and puts that sentence inside `@returns`; `collectLayer`'s thrown text names "the named
sheets" where its default-argument callers name none; and the case title in
`tests/setupConformance.test.ts` that now pins four parenthesized forms says nothing about them.

## Role and engine

`builder` on native Sonnet. You are a native subagent: perform the assignment directly and spawn
nothing. Sole writer in `C:/Users/mikes/WebstormProjects/veneer`; commit nothing; install nothing;
no `scaffold repair`; no tree-wide `format` or lint `--fix`; no `git checkout`, `git restore`,
`git stash`, `git reset`, `git clean`, or `git add`. Law from
`C:/Users/mikes/WebstormProjects/scaffold`: `.claude/rules/writing.md` § Code tokens,
`.claude/rules/typescript.md` § TSDoc.

## Scope

**Owned.** `tests/setupConformance.ts` (the `extractSpecifiers` doc block alone),
`tests/setupConformance.test.ts` (one `it` title alone), `tests/setupBrowser.ts` (`collectLayer`'s
thrown text and its `@throws` line alone), `tests/setupBrowser.test.ts` (the one `toThrow` on that
text alone), the report. **Off-limits.** Everything else, including every `requireValue` message
in `tests/src/**` and in `tests/setupBrowser.test.ts`.

## Execution

Perform the assignment directly and spawn nothing.

1. **The parse-option sentence.** In the doc block of `extractSpecifiers` (around line 117 of
   `tests/setupConformance.ts`), remove the sentence "Parses with `preserveParens` disabled, so a
   parenthesized argument or callee reaches the visitor as the expression it wraps." from the
   `@returns` tag and add, as the second sentence of the description paragraph (after "Extracts
   literal import and re-export specifiers through Vite's parser."), the sentence "Parses with the
   `preserveParens` option disabled, so a parenthesized argument or callee reaches the visitor as
   the expression it wraps." Wrap at 100 columns.
2. **The thrown text.** In `tests/setupBrowser.ts`, `collectLayer` throws
   `The sheets carry no Veneer cascade` (the `requireValue` message), and its `@throws` line reads
   "An `Error` when `sheets` carries no Veneer cascade, so an empty reading is never mistaken for
   an empty layer." (unchanged if it already reads so). In `tests/setupBrowser.test.ts`, the one
   `toThrow` on `The named sheets carry no Veneer cascade` asserts `The sheets carry no Veneer
   cascade`. Grep `tests/` for `named sheets`: no hit remains outside prose that describes a caller
   naming its sheets.
3. **The case title.** In `tests/setupConformance.test.ts`, the `it` titled `extracts imports and
   re-exports while rejecting comments and strings as module edges` becomes `extracts imports and
   re-exports, parenthesized or not, while rejecting comments and strings as module edges`.
4. **Gates.** `npm run format:check`, `npm run lint:check`, `npm run test:setup`,
   `npm run test:setup:browser`; record each command's final lines.

## Output

Write `u1-conform-report-5.md` and return its content: the diff per file; the grep of
item 2; each command's final lines; `git status --porcelain` (tracked rows only); deviations in
the usual shape.

## Deviation contract

Stop and report on: a gate red; a need to edit any other line. Nothing is left to decide.

## Acceptance criteria

1. The four texts read as items 1 to 3 state and nothing else in the four files changed.
2. `format:check`, `lint:check`, `test:setup`, and `test:setup:browser` exit 0.
3. `git status --porcelain` lists report 4's tracked rows exactly.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report.
