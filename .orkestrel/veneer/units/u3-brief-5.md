# Unit U3 — successor brief 5: the installed surface, the Node-safe boundary, and the setup proofs

## What changed and why

This brief supersedes `u3-brief-4.md` for the remainder of the unit; every section of
brief 4 stands except where this brief says otherwise, and your report for brief 4
(`u3-report-2.md`) is the baseline. Brief 4's § Context promised `@orkestrel/test`
`0.0.18` from the U6 tarball, with `hoverAccessible`, `holdAccessible`, `releasePointer`,
`stageMedia`, `releaseMedia`, `sendProtocol`, and the `pseudo` argument. Your D1 found none of
them: the Orchestrator's scaffold land script had run a second `npm install --no-save` in this
checkout, which re-resolved the tree and put the registry `0.0.18` back. That was the
Orchestrator's error, not yours. The Orchestrator has since installed both tarballs in one
command; the readings before you start:

```text
grep -c "hoverAccessible\|stageMedia\|holdAccessible\|sendProtocol" node_modules/@orkestrel/test/dist/src/browser/index.d.ts
12
readPixels(element: Element, property: string, pseudo?: string): number   (index.d.ts:1962)
readStyle(element: Element, property: string, pseudo?: string): string    (index.d.ts:2175)
git status --porcelain -- package.json package-lock.json                    (empty)
```

Read `node_modules/@orkestrel/test/dist/src/browser/index.d.ts` again before editing: the
installed surface now carries `stageMedia(options: MediaOptions)` with `MediaOptions { print?,
motion? }`, `releaseMedia()`, `sendProtocol(method, params)`, `render(markup)`, `readContrast`,
`matchesColor`, `parseCSSColor`, `blendColor`, `build`, `extractStyles`, and the rest. This brief
closes what D1, D5, and D6 left open and settles the overlaps the audit will otherwise refuse.
`.claude/rules/tests.md` (read it from
`C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md`) rules that a setup-module
export whose name or job matches an installed export is a defect, whichever file declared it first.

## Role and engine

Unchanged: `opus` on native Opus 5. Perform the assignment directly and spawn nothing. Sole writer
in `C:/Users/mikes/WebstormProjects/veneer`; commit nothing; install nothing; no `scaffold
repair`; no tree-wide `format` or lint `--fix`; no `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`.

## Scope

**Owned.** Everything brief 4 owns, plus `tests/setup.test.ts` (new). **Off-limits.** Everything
else, as brief 4 lists it.

## Execution

Perform the assignment directly and spawn nothing. Run the narrowest project after each step.

1. **The installed media helpers.** Delete the local `stageMedia(name, value)` and
   `releaseMedia()` from `tests/setupBrowser.ts`, their case in `tests/setupBrowser.test.ts`, and
   the `CDPSession` type import with them (D9's cause leaves with the `cdp()` call). In
   `tests/src/styles/mixins.test.ts`, drive reduced motion through the installed
   `stageMedia({ motion: false })` and `releaseMedia()`; drive `forced-colors: active` through
   `sendProtocol('Emulation.setEmulatedMedia', { features: [{ name: 'forced-colors', value:
   'active' }] })`, because `MediaOptions` carries no forced-colors axis, and reset it in the same
   case's cleanup with `sendProtocol('Emulation.setEmulatedMedia', { media: '', features: [] })`
   before `releaseMedia()`. Record the forced-colors gap as an observation for the Test package.
2. **The overlaps.** For each of `mountSpecimen`, `loadStylesheet`, `clearSpecimens`,
   `readPaintedColor`, and `matchesPaintedColor`, read the installed export whose job is nearest
   (`render`, `build`, `extractStyles`, `readContrast`, `matchesColor`, `parseCSSColor`,
   `blendColor`) in the `.d.ts`, including whether `render` records what it mounts for removal.
   Then either delete the local helper and import the installed one at every call site, or keep
   it with a TSDoc whose first paragraph names the installed export it overlaps and the one thing
   it does that the export cannot, and a case in `tests/setupBrowser.test.ts` that fails when the
   installed export is substituted (the existing rival-reading case for `matchesColor` is the
   pattern). A helper that survives on wording alone is a defect; the audit substitutes the
   installed export and runs the case.
3. **The Node-safe boundary (D6).** Move `readCascadeSheet`, `collectNestedRules`,
   `collectScopeProperties`, and `collectLayer` — every helper that needs `document`, `CSSRule`, or
   a loaded stylesheet — from `tests/setupStyles.ts` to `tests/setupBrowser.ts`, with a case for
   each in `tests/setupBrowser.test.ts` (the `setup:browser` project loads the built cascade
   through `loadStylesheet` or the installed `build`; a reader must have a real sheet to read).
   `tests/setupStyles.ts` keeps only what the Node `setup` project can run, and every export it
   keeps has its case in `tests/setupStyles.test.ts`. Update every style proof's imports.
4. **The setup proof (D5).** Create `tests/setup.test.ts` and move the registry walk's
   behavioural cases (`describe('token registry walk')`) there from `tests/src/core/index.test.ts`,
   which keeps its consuming cases. The `setup` project selects `tests/setup*.test.ts`, so the new
   file runs under `npm run test:setup`.
5. **The pseudo reads.** Where any proof reads a pseudo-element by a local `getComputedStyle(el,
   '::x')` call, use the installed `readStyle(el, property, '::x')` or `readPixels`.
6. **Placement self-check.** List every file this unit owns and, for each, the row of
   `.claude/rules/architecture.md` § Centralized-file pattern or `.claude/rules/tests.md` that
   places it; report any file no row places. `tests/src/styles/fixtures/` holds data files alone
   (`mixins.scss`); it holds no TypeScript.
7. **Gates.** `npm run format:check`, `lint:check`, `check`, `build`, then `test:src`,
   `test:src:styles`, `test:app`, `test:journey`, `test:policy`, `test:config`, `test:setup`,
   `test:setup:browser`, `test:conformance`, `test:guides`; then
   `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles`, `PLAYWRIGHT_CHANNEL=msedge npm run test:src`,
   and `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser`. Record each command's final lines.

## Output

Write `u3-report-3.md` and return its content: the diff summary per file over the
brief-4 baseline; for each overlap the decision (deleted or kept) with the installed export named
and the substitution case's red reading where kept; the placement table; each gate's final lines
on both engines; deviations in the usual shape. Do not restate report 2.

## Deviation contract

Stop and report on: a gate red after your own fix inside owned files; a need to edit an off-limits
file; an installed export whose declared signature contradicts this brief. Decide, record, and
carry on from: case order, TSDoc wording within the meaning fixed here, the forced-colors cleanup
order.

## Acceptance criteria

1. `tests/setupBrowser.ts` exports no `stageMedia`, `releaseMedia`, or any other name the
   installed `@orkestrel/test/browser` declares, and imports no `CDPSession`.
2. Every surviving local helper names its installed neighbour in TSDoc and has a substitution
   case that reddens.
3. `tests/setupStyles.ts` imports nothing from `vitest/browser` or `@orkestrel/test/browser` and
   references no `document`; every export it keeps has a case in `tests/setupStyles.test.ts`.
4. `tests/setup.test.ts` exists and `npm run test:setup` runs it.
5. Every gate in item 7 exits 0 on managed Chromium, and the three named ones on Edge.
6. `git status --porcelain` shows only owned files, the granted files, the integrated patch sites,
   and the reports.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report; the built
`dist/src/styles/index.css`.
