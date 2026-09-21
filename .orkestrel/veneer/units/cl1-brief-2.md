# Unit CL1 — fix round brief 2: the audit's implementation findings

## What changed and why

This brief supersedes `cl1-brief.md`; that brief stands, and `cl1-report.md`
is the baseline. The audit round on the brief-1 tree (claims `../cl1-audit-claims.md`)
confirmed the exclusion contract, the property-free admission, the root-scoped oracle drive,
and the breakpoint helper, and found the implementation defects below. Audits cover
implementation only by the user's ruling: make no wording, comment, or guide-prose change
beyond what a code change requires.

## Findings carried

1. (analyst 5) `tests/setupBrowser.ts` (about line 282): `resolveOracleButton` reads a live DOM
   target under a root and throws when it is absent or unreachable, which is the `read*`
   contract in `.claude/rules/names.md` § Fixed helper prefixes (`resolve*` picks the effective
   value from options and defaults). Rename it `readOracleButton`; update its two callers in the
   same file (the key press and the pointer hold helpers), the import and the export-set
   assertion in `tests/setupBrowser.test.ts`, and its cases.
2. (reviewer 8) `tests/setupStyles.ts` (about line 26): `visitBreakpoint` drives `page.viewport`
   and reads the window, the only browser-dependent code in the host-independent styles module,
   kept loadable in Node only through a dynamic `import('vitest/browser')`; its behaviour cases
   sit in `tests/setupBrowser.test.ts` against `.claude/rules/tests.md` (each root setup proof
   resolves against its sibling module; helpers placed by environment). Move `visitBreakpoint`
   to `tests/setupBrowser.ts`, take `page` from the static `vitest/browser` import already there,
   drop the dynamic import; keep `BREAKPOINT_CASES` in `tests/setupStyles.ts` (a data table
   belongs in a setup file at any size) and import it from `./setupStyles.js` where the browser
   proof already does; remove `'visitBreakpoint'` from the styles export inventory and add it to
   the browser one; keep the browser proof's cases where they are (they now sit beside their
   module); the styles proof's case that the module exports nothing the document has to answer
   is true again.
3. (reviewer 9) `tests/setupBrowser.ts` (about lines 338 to 341): the hold's cleanup path
   `catch (error) { await releasePointer(); throw error }` drops the pressed-state error when the
   release itself rejects. Wrap the release in its own `try`/`catch` and throw the original error
   with the release rejection as `cause`, as the installed verb does.
4. (reviewer 10) The unit identifier sits in permanent test data: the message
   `'CL1 breakpoint reading failure'` in `tests/setupBrowser.test.ts` and the fixture selector
   `.cl1-outside` in `tests/setupConformance.test.ts`. Name each for what it is (a reading-failure
   message naming the reading; an unreachable-selector fixture name).

Recorded, not carried: the root-bounded resolver takes the first reachable match inside a root
and never refuses a second (reviewer 11), the residual limit the duplicate-name control does not
reach, recorded as a bound; the earlier `resolveButton(root, name)` helper from U7c has the same
shape; it is used by the journey and the section proof, which this unit does not own, so its
rename is a bound for CL11 (the journey unit), recorded in the report.

## Role, engine, law, context, host, deviation contract

As in `cl1-brief.md`, verbatim. `HEAD` is `060ce02`; the working tree carries the
complete brief-1 result, uncommitted. Continue from it; do not restore or reset anything.
Perform the assignment directly and spawn nothing.

## Scope

Owned: `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/setupStyles.ts`,
`tests/setupStyles.test.ts`, `tests/setupConformance.test.ts` (only the fixture name),
`cl1-report-2.md`. Every other file is off-limits this round.

## Execution

1. Items 1, 4, 3, then 2; no behaviour change beyond item 3's error shape.
2. Run and record: `npm.cmd run format:check`, `npm.cmd run lint:check`, `npm.cmd run check`,
   `npm.cmd run test:setup`, `npm.cmd run test:setup:browser`, `npm.cmd run test:conformance`,
   `npm.cmd run test:src:styles`, `npm.cmd run test:app:browser`, `npm.cmd run test:journey`,
   then `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:setup:browser` and
   `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles`.

## Output

Write `cl1-report-2.md` in the Veneer checkout and return it: per item the change as
landed with every site, each gate's exit code and final lines on both engines, the actual
`git diff --stat` and `git status --porcelain --untracked-files=all`. Do not repeat report 1.

## Acceptance criteria

1. `grep -c resolveOracleButton tests/setupBrowser.ts tests/setupBrowser.test.ts` reads 0 in
   both; `readOracleButton` is exported, cased, and in the browser export inventory.
2. `tests/setupStyles.ts` imports nothing from `vitest/browser` and reads no window;
   `visitBreakpoint` is exported from `tests/setupBrowser.ts` and listed in its inventory only.
3. The hold's cleanup rethrows the original error with the release rejection as `cause`; no
   test datum names the unit.
4. Every gate in item 2 exits 0 on managed Chromium and Edge.
5. The status shows brief 1's owned files and the reports.
