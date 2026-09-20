# Unit U1-conform — successor brief 4: parentheses and the type import

## What changed and why

This brief supersedes `u1-conform-brief-3.md` for the remainder of the unit; briefs 1 to
3 stand except where this one says otherwise, and `u1-conform-report-3.md` is the
baseline. The second audit round (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u1-conform-audit-verdict-2.md`,
lane reports beside it under `units/u1-conform-audit-2-*`) confirmed briefs 2 and 3 and found two
things in `tests/setupConformance.ts`: the parser keeps parentheses by default (`preserveParens`
is `true` in the installed `rolldown` declaration), so a parenthesized `require` or `import()`
argument, or a parenthesized `require` callee, reaches the scanner as a `ParenthesizedExpression`
and extracts nothing, and the distribution predicate then accepts it; and the
`import type { ESTree } from 'vite'` line sits after the value imports where
`.claude/rules/typescript.md` places type imports first. The subjective lane added two bounds this
brief carries: `collectLayer` in `tests/setupBrowser.ts` throws text naming the document
(`The document loaded no Veneer cascade`) in exactly the case brief 3 created, a caller that named
its own sheets, and the only assertion on that text is in `tests/setupBrowser.test.ts`; and
`behaviour` at `app/browser/Showcase.ts:45` is the one British spelling in the package's authored
prose against `behavior` everywhere else.

## Role and engine

`builder` on native Sonnet. You are a native subagent: perform the assignment directly and spawn
nothing. Sole writer in `C:/Users/mikes/WebstormProjects/veneer`; commit nothing; install nothing;
no `scaffold repair`; no tree-wide `format` or lint `--fix`; no `git checkout`, `git restore`,
`git stash`, `git reset`, `git clean`, or `git add`. Law from
`C:/Users/mikes/WebstormProjects/scaffold`: `AGENTS.md`, `.claude/rules/typescript.md`,
`.claude/rules/tests.md`. The host is Windows with Git Bash; run every command from the Veneer
checkout with `npm run <name>`.

## Context

`HEAD` is `d8b0e65`; the working tree carries U1-conform, the manifest step, and briefs 2 and 3,
all uncommitted and all staying. In `tests/setupConformance.ts`: line 16 is
`import type { ESTree } from 'vite'`, after the value imports that open at line 10;
`extractSpecifiers` calls `parseSync('module.ts', text)` at line 122 with no options;
`extractStringArgument` at line 106 reads a `Literal` or a substitution-free `TemplateLiteral`
and answers `undefined` for every other node. `parseSync` is Vite's re-export of
`rolldown/utils`, whose `ParserOptions` carries `preserveParens?: boolean` (default `true`).
The existing `require` cases sit in `tests/setupConformance.test.ts` around line 140, in the `it`
titled `extracts imports and re-exports while rejecting comments and strings as module edges`.

## Scope

**Owned.** `tests/setupConformance.ts` (the import block and `extractSpecifiers` alone),
`tests/setupConformance.test.ts` (the cases named here alone), `tests/setupBrowser.ts`
(`collectLayer`'s thrown text and its `@throws` line alone), `tests/setupBrowser.test.ts` (the
one assertion on that text alone), `app/browser/Showcase.ts` (the one word alone), the report.
**Off-limits.** Everything else, including `tests/src/**` (its `requireValue` messages are its
own and stay).

## Execution

Perform the assignment directly and spawn nothing.

1. **The type import first.** Move `import type { ESTree } from 'vite'` ahead of every value
   import in `tests/setupConformance.ts`, per `typescript.md` ("Place `import type` declarations
   before value imports"; no blank line between consecutive imports of the same kind). Run
   `npm run format:check` and `npm run lint:check`; both must stay green with the moved line.
2. **Red first.** In the `it` named in Context, after the line asserting
   ``extractSpecifiers('require(`bootstrap`)')``, add four assertions, each expecting
   `['bootstrap']`: ``require((`bootstrap`))``, `require(("bootstrap"))`,
   ``import((`bootstrap`))``, and ``(require)(`bootstrap`)``. Run `npm run test:setup` and record
   the failing count and the first assertion's message.
3. **The fix.** Pass `{ preserveParens: false }` as the third argument of `parseSync` in
   `extractSpecifiers`, so a parenthesized argument or callee reaches the visitor as the
   expression it wraps. Add one sentence to the `extractSpecifiers` doc block stating that. Run
   `npm run test:setup` again and record the green count. Confirm the existing controls
   (``require(`${name}`)`` and `require(name)` extract nothing; the comment and string cases
   extract nothing; `import {` still throws) stay green in the same run.
4. **The thrown text names the sheets.** In `tests/setupBrowser.ts`, `collectLayer` throws
   `The named sheets carry no Veneer cascade` (the `requireValue` message), and its `@throws` line
   says the same thing in the same words; in `tests/setupBrowser.test.ts`, the one `toThrow`
   assertion on the old text asserts the new text. Grep `tests/` for the old text: the remaining
   hits are `requireValue` messages in `tests/src/styles/**` and `tests/setupBrowser.test.ts`'s
   own `requireValue` calls, which are those files' own messages and stay.
5. **One spelling.** At `app/browser/Showcase.ts:45`, `behaviour` becomes `behavior`; nothing
   else in the file changes.
6. **Gates.** `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:setup`,
   `npm run test:conformance`, `npm run test:setup:browser`, `npm run test:src:styles`,
   `npm run test:app`. Record each command's final lines.

## Output

Write `u1-conform-report-4.md` and return its content: the diff per file; the red run
(command, failing count, message) and the green run; the grep of item 4; each gate's final lines;
`git status --porcelain` (tracked rows only); deviations in the usual shape (expected, found,
evidence, done or not done, one hypothesis at most).

## Deviation contract

Stop and report on: an assertion that does not go red in item 2 or does not go green in item 3;
a gate red after your own fix inside the owned files; a need to edit an off-limits file. Decide,
record, and carry on from: the doc-block sentence's wording.

## Acceptance criteria

1. The type import precedes the value imports; `format:check` and `lint:check` exit 0.
2. The four parenthesized forms extract `['bootstrap']`, ran red before item 3 and green after,
   both recorded; the controls still extract nothing.
3. `collectLayer` throws `The named sheets carry no Veneer cascade`, its `@throws` line agrees,
   and the one assertion asserts it; `app/browser/Showcase.ts` carries no `behaviour`.
4. Every gate in item 6 exits 0.
5. `git status --porcelain` lists report 3's tracked rows exactly.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report.
