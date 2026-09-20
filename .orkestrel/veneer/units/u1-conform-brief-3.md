# Unit U1-conform — successor brief 3: the cascade readers name the sheets they walk

## What changed and why

This brief supersedes `u1-conform-brief-2.md` for the remainder of the unit; briefs 1 and
2 stand except where this one says otherwise, and `u1-conform-report-2.md` is the
baseline. Brief 2 closed every item, and its item 1 (the showcase mount loads the published
cascade) reddens three cases in `tests/setupBrowser.test.ts` (report 2 deviation 1): a browser
test file shares one page, `mountShowcase` loads the published cascade into it and the sheet stays,
and `readCascadeSheet` selects the first sheet in `document.styleSheets` declaring a `theme` layer
block, so the cases that fixture a probe cascade and the case that asserts an unloaded document
read the real cascade instead. The Orchestrator rules for the durable shape the report names over
the reordering it patches: a reader names the sheets it walks, and the document is the default.

## Role and engine

`opus` on native Opus 5. Perform the assignment directly and spawn nothing. Sole writer in
`C:/Users/mikes/WebstormProjects/veneer`; commit nothing; install nothing; no `scaffold repair`;
no tree-wide `format` or lint `--fix`; no `git checkout`, `git restore`, `git stash`, `git reset`,
`git clean`, or `git add`. Law from `C:/Users/mikes/WebstormProjects/scaffold`: `AGENTS.md`
(§ Design laws: functional core, absence is `undefined`, minimal public API), `.claude/rules/tests.md`,
`typescript.md`, `names.md`, `writing.md`.

## Context

`HEAD` is `d8b0e65`; the working tree carries U1-conform, the manifest step, and brief 2, all
uncommitted and all staying. `tests/setupBrowser.ts:281` declares
`readCascadeSheet(): CSSStyleSheet | undefined`, walking `document.styleSheets`; `:369` declares
`collectLayer(name: string): readonly CSSRule[]`, which reads `readCascadeSheet()` and throws
`The document loaded no Veneer cascade` where it returns nothing. Production callers:
`tests/src/styles/index.test.ts:8,24,29` and `tests/src/styles/tokens.test.ts:31,51`, each on the
document the styles project loads the built cascade into; they must keep working unchanged. The
three red cases: `tests/setupBrowser.test.ts:191` (selects the probe sheet), `:204` (reports no
sheet, refuses a layer read), `:243` (reads the named layer block of the probe). The two cases
that call `mountShowcase` (`:69`, `:85`) stay where they are. `readRules()` walks every sheet and
is not part of the failure.

## Scope

**Owned.** `tests/setupBrowser.ts` (`readCascadeSheet`, `collectLayer`, their doc blocks, and
nothing else), `tests/setupBrowser.test.ts`, the report. **Off-limits.** Everything else,
including `tests/src/**`, `tests/setup.ts`, `tests/setupStyles*.ts`, `app/**`, `src/**`,
`guides/**`.

## Execution

Perform the assignment directly and spawn nothing. Run `npm run test:setup:browser` after each item.

1. **The readers take their sheets.** `readCascadeSheet(sheets: Iterable<CSSStyleSheet> =
   document.styleSheets)` selects the first sheet in `sheets` declaring a `theme` layer block;
   `collectLayer(name: string, sheets: Iterable<CSSStyleSheet> = document.styleSheets)` reads
   `readCascadeSheet(sheets)` and throws as before where it returns nothing. Keep the names, the
   return shapes, the error text, and the doc blocks' meaning; state in each doc block that the
   document's sheets are the default and a caller fixturing a sheet passes it. Export nothing
   new. (If a `readonly CSSStyleSheet[]` parameter reads better than `Iterable` against the
   callers and `typescript.md`, take it; `document.styleSheets` is a `StyleSheetList`, so the
   default then reads `Array.from(document.styleSheets)`.)
2. **The three cases name their sheets.** `:191` passes `[element.sheet]` (and the plain sheet
   where it proves the plain sheet is not selected) so it selects the probe sheet whatever the
   page carries; `:204` passes the plain sheet alone so it reports no sheet and refuses the layer
   read; `:243` passes the probe sheet. Keep every assertion's meaning; keep the `readRules()`
   assertions as they are. Add one case, or extend `:191`, proving the default: with no argument
   the readers walk `document.styleSheets` (after `mountShowcase` has loaded the cascade in this
   file, the default selects a sheet carrying the published `theme` layer; assert that, and that
   it is not the probe sheet).
3. **Gates.** `npm run format:check`, `lint:check`, `check`, `build`, then `test:setup:browser`,
   `test:src:styles`, `test:src`, `test:app`, `test:journey`, `test:setup`, `test:policy`; then
   `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser` and
   `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles`. Record each command's final lines.

## Output

Write `u1-conform-report-3.md` and return its content: the diff per file; the two
signatures as declared; each gate's final lines on both engines; `git status --porcelain`
(tracked rows only); deviations in the usual shape.

## Deviation contract

Stop and report on: a production caller in `tests/src/styles/**` that stops compiling or passing;
a gate red after your own fix inside owned files; a need to edit an off-limits file. Decide,
record, and carry on from: the parameter's type, the parameter's name, doc-block wording, where
the default-proving assertion sits.

## Acceptance criteria

1. `readCascadeSheet` and `collectLayer` accept the sheets they walk, defaulting to the document's;
   every production caller is unchanged.
2. `npm run test:setup:browser` exits 0 on managed Chromium and Edge with the two `mountShowcase`
   cases where they are; the three cases pass whatever the page carries; the default is asserted.
3. Every gate in item 3 exits 0.
4. `git status --porcelain` lists report 2's tracked rows exactly.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report.
