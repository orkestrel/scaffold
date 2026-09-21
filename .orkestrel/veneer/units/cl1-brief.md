# Unit CL1 — the Content/layout proof contract

## Role and engine

`sol` on Astra (GPT-6 Astra through `codex exec`, `workspace-write`), the sole writer in the
Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`), HEAD `060ce02` (the U7f-fix
landing), tracked tree clean. You are the bench engine reading the brief inside your own CLI:
perform the assignment directly and spawn nothing.

## Objective

The test infrastructure the Content/layout family needs before any mechanism lands, in the
files that own it: the conformance scanner learns a permanent exclusion; a property-free
inventory key ships on its selector row alone; the oracle driver scopes its actions to its
root; and the styles suite gains a breakpoint helper over `page.viewport` with a proven restore.
Each with the red-then-green proof that pins it. No SCSS changes, no guide rows beyond the one
header sentence named under Scope.

## Context

Law: read `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` and `.claude/rules/tests.md`,
`typescript.md`, `architecture.md`, `names.md`, `styles.md` (§ on layers and the conformance
readers), `writing.md` (for the one guide sentence) before editing. The design record:
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/content-layout-design-verdict.md`
(the rulings that bind this unit: one deferral table with `Excluded` as a terminal owner; the
`driveOracle` bound; `page.viewport` as the breakpoint axis) and the two lane reports it
reconciles (`units/content-layout-design-planner-report.md` § 1, § 6, CL1's criteria;
`units/content-layout-design-analyst-report.md` unit 1 and § Breakpoint and capture proof).

Readings taken by the Orchestrator at launch (verify each before relying on it; a stale line
number is a re-read, never a stop):

- `tests/setupConformance.ts`: `readDeferrals` (about line 527) reads the guide's
  `### Deferred selectors` table (`Name | Owner | Reason`, every cell non-empty, an incomplete
  row refused by position); `collectShippedComponents` (about line 596) admits a key only when
  every `selector` and `variable` row reads `shipped`; `scanCompatibilityPresence` (about line
  623) requires every official selector string of a shipped key, less the deferrals, in the
  built cascade and names the first missing selector and its component; `readOracleInventory`
  (about line 728) projects the pinned fixture `tests/fixtures/oracle/inventory.json` to
  selector strings.
- `tests/conformance.test.ts` (about line 55) holds the explicit `listed` array, `['btn']`.
- `tests/setupBrowser.ts`: `ORACLE_ACTIONS` (about line 221) drives by accessible name over the
  whole document (`clickAccessible('button', 'Toggle')`, `pressKeys`, `hoverAccessible`) while
  `driveOracle(root, prefix)` (about line 285) resolves only the host reading under `root`; the
  U7c audit recorded that a second section sharing a name would make the drive act on whichever
  host the document-wide resolver reaches first.
- The installed Test declaration (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts`
  about line 2715) rules that a suite resizing the tester for a breakpoint calls
  `page.viewport` from `vitest/browser` and leaves the tester there; `stagePane` is capture
  staging only. `page.viewport(width, height)` exists on the installed context
  (`node_modules/@vitest/browser/context.d.ts` about line 814).
- The `src:styles` project loads `tests/setupBrowser.ts` under the `src/browser` environment
  boundary, which refuses a static `@app/browser` import there (U7c report 2, D1).
- `tests/app/browser/integration.test.ts` is an existing consumer this unit does not own: it calls
  `driveOracle(mounted.section, '')` and `driveOracle(mounted.section, 'reduced.')` (about lines
  557 and 569) and, in its capture-membership case, `page.viewport(variant.width, variant.height)`
  (about line 595) with no restore. Keep `driveOracle`'s signature so those calls compile and stay
  green; the root scoping lives inside the driver and its actions. The journey's own viewport
  call is the journey unit's (CL11), not this unit's: read it, change nothing there.
- Host: Windows, Git Bash; run scripts as `npm.cmd run <name>`; managed Chromium is the
  default and Edge runs through `PLAYWRIGHT_CHANNEL=msedge`; the `prove` tool is blocked in
  this sandbox, so a red-then-green pair is recorded from real runs; a nested `git` or `npm
  install` is denied; `vite.config.ts`, `tests/config.test.ts`, `tests/policy.test.ts`, and
  `tests/setupPolicy.ts` are vendored and never edited.

Standing clauses: audits cover implementation only, so make no wording, comment, or guide-prose
change beyond what a code change requires; an existing assertion in an owned file that
enumerates a population your change grows or shrinks (the setup export inventories in
`tests/setupConformance.test.ts`, `tests/setupStyles.test.ts`, `tests/setupBrowser.test.ts`;
the `listed` array) is yours to update in the same step, recorded, never a stop; the scoped
formatter (`npx.cmd oxfmt --config .oxfmtrc.json --write <file>`) and a lint diagnostic's
canonical rewrite are granted, never a stop; a plant proves an instrument and is removed before
you return, its removal recorded.

## Unknowns

Whether a `page.viewport` call in one styles file leaks its size into the next file of the same
project (item 4 measures it before the helper's contract is written). Whether `readDeferrals`'s
row shape needs a fourth cell for an exclusion (ruled no: `Owner` carries `Excluded`).

## Scope

Owned: `tests/setupConformance.ts`, `tests/setupConformance.test.ts`, `tests/conformance.test.ts`,
`tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/setupBrowser.ts`,
`tests/setupBrowser.test.ts`, one new proof file under `tests/src/styles/` if the breakpoint
helper's browser proof belongs there rather than in `tests/setupBrowser.test.ts` (decide from
`.claude/rules/tests.md` and record), the one sentence in `guides/veneer.md` that introduces
the `### Deferred selectors` table (it gains the `Excluded` owner's meaning: a name no unit
will ship, required absent from the cascade), `cl1-report.md`. Off-limits: `src/**`,
`app/**`, `tests/app/browser/integration.test.ts` (read-only, its calls preserved), every other test, `tests/fixtures/**`, `package.json`, `configs/**`, the vendored
files, the rest of the guide.

## Execution

1. Exclusions. `readDeferrals` accepts `Excluded` as an owner; `scanCompatibilityPresence`
   (or a sibling scanner the same case calls) validates that every deferral and exclusion name
   is a member of the pinned inventory, subtracts deferrals as today, and requires every
   `Excluded` name absent from every selector of the built cascade, naming the first offender.
   Red first with a plant (an `Excluded` row whose name is present in the cascade; a row naming
   a selector outside the inventory), green restored; the existing refusal of an incomplete row
   stays.
2. Property-free keys. `collectShippedComponents` admits a key whose official property set is
   empty on its selector row alone. Red first with a planted key that has selectors and no
   properties and one `shipped` selector row; green after; `listed` stays `['btn']` (a unit
   that flips a key owns that line; this unit flips none).
3. Oracle root scoping. `driveOracle(root, prefix)` acts within `root`: each `ORACLE_ACTIONS`
   verb resolves its host under the root it was given (an installed verb that admits no root is
   wrapped by a helper that resolves the element under the root first and drives that element).
   Prove isolation with a duplicate-name control: two mounted sections each carrying a
   `Toggle` host; driving one root leaves the other host's state unchanged. Red first on the
   current document-wide drive, green after.
4. Breakpoints. Measure first: two styles proof files in the `src:styles` project, the first
   setting `page.viewport(1400, 800)` without restoring, the second reading `window.innerWidth`;
   record what the second reads (the probe files are removed afterwards and the reading goes in
   the report). Then export from `tests/setupStyles.ts` a frozen breakpoint case table (`375`,
   `576`, `768`, `992`, `1200`, `1400`, each with the readings a case takes below, at, and above
   the boundary) and a helper that drives `page.viewport` and restores the starting viewport on
   every path, proven by a following case reading the original width (the browser half of that
   proof lives where the rules place it).
5. Gates, in order: `npm.cmd run format:check`, `npm.cmd run lint:check`, `npm.cmd run check`,
   `npm.cmd run test:setup`, `npm.cmd run test:setup:browser`, `npm.cmd run test:conformance`,
   `npm.cmd run test:src:styles`, `npm.cmd run test:guides`, `npm.cmd run test:app:browser`,
   `npm.cmd run test:journey`, then `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:setup:browser`
   and `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles` (the Edge launcher pattern
   report 3 of U7b recorded works: a `.cmd` under `tmp/` that sets the variable).

## Output

Write `cl1-report.md` in the Veneer checkout and return its full content as your
final message, nothing else: per item, the change as landed with its site, the red-then-green
pair (command and counts), the viewport leakage reading, each gate's exit code and final lines
on both engines, the actual `git diff --stat` and `git status --porcelain --untracked-files=all`,
and every plant's removal.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself: helper names within
`{verb}{Noun}`, where the breakpoint proof file sits, the shape of the root-scoped wrapper.
Stop and report on: a gate red after your own fix inside owned files; an assertion outside the
owned set the change makes false and no standing clause covers; the viewport leaking with no
restore mechanism that closes it.

## Acceptance criteria

1. Each of items 1 to 4 has its red-then-green pair recorded, every plant removed.
2. `npm.cmd run test:conformance` is green with `listed` unchanged.
3. Every gate in item 5 exits 0 on managed Chromium and Edge.
4. `git status --porcelain --untracked-files=all` shows only the owned files and the report.

## Review evidence

The actual `git diff` and `git status` at return; this report.
