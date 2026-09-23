# Unit F8c-B MOVE, round 5 — the prose the fix rounds' subjective lane named

Successor to `tmp/units/f8c-b-brief-4.md`. What changed and why: the subjective lane over rounds 2 to
4 (`/home/user/scaffold/.orkestrel/veneer/units/f8c-b-fix-audit-reviewer-verdict.md`, FAIL 4, 9, 11;
F1 to F4; R-a to R-d) found bare code tokens still standing as sentence subjects in the swept
scope, a banned possessive, an importance rule stated per name where the proof reads per property, a
readiness paragraph that drifted from § Scripts and § Files, a lowercase link-text sentence, and one
line past 100 columns; the Orchestrator ruled D25b (the import-placement paragraph names the
`postcss-import` plugin's rule as the cause and cites the spec as the rule it follows). This round
closes those with the wording fixed here. The earlier briefs stay in place unedited and bind where
this one is silent.

## Role and engine

`builder` on Sonnet (native Claude subagent), sole writer in `/home/user/veneer-f8b` (branch
`unit/f8b`, rounds 1 to 4 uncommitted in the tree). Perform the assignment directly and spawn
nothing. Use absolute paths under `/home/user/veneer-f8b` for every command and file, and run every
npm and npx command from `/home/user/veneer-f8b`. Do not commit, push, install, or run `git
checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

Every replacement under § Obligations is applied once, nothing else changes, and `npx oxfmt --check`
over the owned files, `npm run check`, `npm run test:guides`, and `npm run test:setup` exit 0.

## Context

**Evidence.** The reviewer's sites, read on 2026-09-23 (line numbers approximate; locate each by its
sentence): `guides/veneer.md` around 299 ("[stylesheet profiles](…) reads that difference."), 314
("`@source './src'` is the line you change"), 316 to 321 (the import-placement paragraph), 350
("— `@source './markup.html';` names the markup fixture"), 360 ("and `px-8` moves the button's
padding"), 363 ("`.col-1`'s `grid-column-start`"), 370 to 374 and 387 to 389 (the importance rule
stated per name), 399 ("The instrument `tests/fixtures/tailwind/unexcluded.css`"), 407 to 411 (the
readiness paragraph: "The `prepublishOnly` script runs it, and `npm test` does not."; "the pinned
Chromium"), 419 (a line past 100 columns), and the § Files `tests/setupService.ts` row ("the pinned
browser"); `tests/setupService.ts`: the `READINESS_INPUT` remarks ("`source(none)` keeps the compiler
from scanning"), the `resolveBrowserTarget` `@param options` ("as `resolveBrowser` in
`configs/browsers.ts` returns them"), the `importCompiler` `@returns` ("The plugin creator
`@tailwindcss/postcss` exports"), the `compileProfile` remarks ("every relative `@import` and
`@source` in the profile resolves"), the `StageManager.open` `@throws` ("anything an earlier `open`
acquired"), the `StageManager.expand` remarks ("so `border: 0 solid` reports the width");
`tests/setupServer.ts`: the `collectImportantNames` doc block (the per-name rule), the `SheetReader`
remarks ("so `@layer outer { @layer inner { … } }` reads as…"), the `SheetReader.statement` remarks
("{@link SheetReader.order} answers…"), the `SheetReader.declarations` remarks ("so `.container {
@media … }` reports `max-width`").

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{writing,documentation,typescript}.md`;
D25, D25a, D25b in `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`.

**Installed primitives.** none touched; this unit adds no code.

**Host.** bash; `/home/user/veneer-f8b`; npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`);
`prettier` must never run, `oxfmt` is the formatter.

**Measurements.** The round-4 gates exited 0 per `tmp/units/f8c-b-report-4.md`.

**Control identifiers.** none.

**Standing conditions.** Rounds 1 to 4 are present and uncommitted; touch nothing outside the named
passages. The guide's tables are `oxfmt`-padded; every guide edit but the § Files cell is inside
prose; the § Files cell edit changes one word and no column width. Rewrap only a paragraph a changed
line lengthens past 100 columns, and the paragraph at line 419.

## Unknowns

none.

## Obligations

Apply each replacement once (the source is the reviewer's quoted text; locate it by sentence):

1. Guide, around 314: "`@source './src'` is the line you change" → "the `@source './src'` line is
   the one you change".
2. Guide, around 350: "— `@source './markup.html';` names the markup fixture" → "— its
   `@source './markup.html';` line names the markup fixture".
3. Guide, around 360: "and `px-8` moves the button's padding" → "and the `px-8` utility moves the
   button's padding".
4. Guide, around 363: "`.col-1`'s `grid-column-start`" → "the `grid-column-start` property of the
   `.col-1` element".
5. Guide, around 399: "The instrument `tests/fixtures/tailwind/unexcluded.css`" → "The
   `tests/fixtures/tailwind/unexcluded.css` instrument".
6. Guide, around 407 to 411: "The `prepublishOnly` script runs it, and `npm test` does not." → "The
   `prepublishOnly` chain runs the `test:service` script, and the `test` script does not."
7. Guide, § Files, the `tests/setupService.ts` row: "the pinned browser" → "the pinned Chromium".
8. Guide, around 299: "[stylesheet profiles](../tests/service/tailwind/profiles.test.ts) reads that
   difference." → "The stylesheet profiles proof reads that difference; see
   [stylesheet profiles](../tests/service/tailwind/profiles.test.ts)."
9. Guide, the import-placement paragraph (316 to 321), per D25b: state that the `postcss-import`
   plugin Vite runs ahead of the Tailwind plugin refuses an `@import` rule preceded by anything other
   than `@charset`, a comment, an empty `@layer` statement, or another `@import` rule, and drops it;
   that the plugin follows CSS Cascading and Inheritance Level 5 § Importing Style Sheets and
   § Declaring Without Styles (keep the two links) for the rules a browser treats as valid, while a
   `@source` rule is unknown to a browser; and keep the closing clause that each recipe writes its
   imports first so the rule holds whichever tool inlines them. Three or four sentences; no other
   claim.
10. Guide, 370 to 374 and 387 to 389, and the `collectImportantNames` doc block in
    `tests/setupServer.ts`: state the importance rule per property: a shared name leaves the
    exclusion line only where Veneer declares with `!important` every longhand that Tailwind's rule
    for that name declares; a name Veneer declares important on some other longhand stays on the
    line. Keep the sentence at 390 that no shipped shared name is important.
11. Guide, around 419: rewrap the paragraph so no line passes 100 columns.
12. `tests/setupService.ts`: "`source(none)` keeps the compiler from scanning" → "The `source(none)`
    argument keeps the compiler from scanning"; "as `resolveBrowser` in `configs/browsers.ts` returns
    them" → "as the `resolveBrowser` function in the `configs/browsers.ts` file returns them"; "The
    plugin creator `@tailwindcss/postcss` exports" → "The plugin creator the `@tailwindcss/postcss`
    package exports"; "every relative `@import` and `@source` in the profile resolves" → "every
    relative `@import` rule and `@source` rule in the profile resolves"; "anything an earlier `open`
    acquired" → "anything an earlier `open` call acquired"; "so `border: 0 solid` reports the width"
    → "so an authored `border: 0 solid` declaration reports the width".
13. `tests/setupServer.ts`: "so `@layer outer { @layer inner { … } }` reads as" → "so an authored
    `@layer outer { @layer inner { … } }` block reads as"; "{@link SheetReader.order} answers" → "the
    {@link SheetReader.order} member answers"; "so `.container { @media … }` reports `max-width`" →
    "so an authored `.container { @media … }` rule reports `max-width`".
14. Read each edited passage once more against `writing.md` § Code tokens and fix any further bare
    token inside the same sentence; list each such extra edit in the report.

## Scope

**Owned.** `guides/veneer.md` (the named passages), `tests/setupService.ts` (the named doc
comments), `tests/setupServer.ts` (the named doc comments), `tmp/units/f8c-b-report-5.md`.

**Shared (report-only).** `ROADMAP.md`: add to the report a carrier row for the importance rule's
code half (R-b): "F8d IMPORTANCE-LONGHANDS: `collectImportantNames` and the equality in `derives the
shared class names…` compute importance over the longhands Tailwind's rule declares, so the equality
and the branch case enforce one rule".

**Off-limits.** every other file and every other passage.

**What asserts the state this change ends.** `npm run test:guides` reads the guide and the TSDoc
summaries the parity gate compares; `npm run test:setup` runs the setup proofs whose TSDoc changed;
nothing asserts the comment text beyond parity.

**Tools and limits.** Read, Grep, Edit, Bash; scoped `npx oxfmt --check` only; no `npm install`; no
git command that discards a working-tree change.

## Execution

**A native subagent, or a bench engine reading this brief inside its own CLI:** perform the
assignment directly and spawn nothing.

## Output

Write `tmp/units/f8c-b-report-5.md`: the exact diff (this round's hunks), the extra edits obligation
14 made, the ROADMAP row, and the gate exits. Return as your final message the report path, the `git
status --short` output, and the gate exits. No process diary.

## Deviation contract

Stop and report on any replacement whose source text is not found once, or on a parity failure
(`npm run test:guides`) a TSDoc summary edit causes. Decide, record, and carry on from the exact
sentences of obligations 9 and 10 and from the rewrap.

## Acceptance criteria

1. `grep -n` for each source phrase of obligations 1 to 8, 12, and 13 returns nothing (paste the
   results in the report).
2. `npx oxfmt --check guides/veneer.md tests/setupService.ts tests/setupServer.ts` exits 0.
3. `npm run check` exits 0.
4. `npm run test:guides` and `npm run test:setup` exit 0.

**Observations, not criteria.** none.

## Review evidence

A code change: the actual diff and the actual `git status --short`.
