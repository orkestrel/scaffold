# Unit CONDITIONS (`cn`) — compound media conditions normalize per feature

## Role and engine

`builder` on Sonnet, reached as a native Claude subagent in the worktree `/home/user/veneer-cn` (branch `unit/cn` from `c3ac297`). The executor that opens this brief is that subagent.

## Objective

`normalizeMediaCondition` in `tests/setupServer.ts` rewrites every `min-width` and `max-width` feature inside an `and` conjunction to its range form, leaving every other feature and the feature order unchanged, with a proof that reddens on the helper as it stands.

## Context

**Evidence.** The helper anchors a single-feature pattern over the whole condition text, so `@media (max-width: 575.98px) and (prefers-reduced-motion: reduce)` never equals a Veneer `(width < 576px) and (prefers-reduced-motion: reduce)` block (the objective design lane's reading of `tests/setupServer.ts`, the `normalizeMediaCondition` helper, and the normalizer case in `tests/setupServer.test.ts` around line 2108); the release's responsive offcanvas panels carry that compound form (terrain § A, `offcanvas`), which OFFCANVAS's ledger will read only through this change. Read the helper and its case before you edit; take the line numbers yourself.

**Law.** `AGENTS.md`; `.claude/rules/{styles,tests,browser,names,documentation,writing,architecture,typescript}.md`; the skill: none (the `enterprise-bootstrap` skill is reference craft, not process); the guide `guides/veneer.md` (§ Styles, § Compatibility, § Deferred selectors, § Departures, § Additions, § Showcase, § Tests); the design verdict `/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md` (its rulings M1 to M20 and § Family record bind this unit); the terrain record `/home/user/scaffold/.orkestrel/veneer/units/b-modal-terrain-report.md` (§ A the oracle surface per key, § B the plugin obligations, § C Elements and Mailbox, § D what the tree carries, § E the rulings already landed, § F sizing, § G the files the family makes false). Where the terrain and the tree disagree, the tree wins and the unit reports the disagreement.

**Installed primitives.** `@orkestrel/test` (`node_modules/@orkestrel/test/dist/src/core/index.d.cts` and `dist/src/browser/index.d.cts`: `readStyle`, `readPixels`, `readHit`, `matchesColor`, `stageMedia`, `visitBreakpoint`, `waitForAnimations`, the recorders) and `@orkestrel/contract` (guards); the tree's own readers in `tests/setupStyles.ts` and `tests/setupBrowser.ts`. A helper, wait, or reader whose job an installed export does is a defect; the audit's checker probes the diff for export names.

**Host.** Linux, `bash`; npm 11 on `PATH` through `export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"` (the host npm is 10.9.7 and the manifest refuses it); Chromium 141 at `/opt/pw-browsers/chromium-1194` for the browser proofs; no sandbox; no network needed. Foreground commands longer than 10 minutes are the Orchestrator's.

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored; never edit them. The shared files stay report-only: the worktree's gates that need a shared file (`check`, the section proof, the built cascade) are read on a validation copy the unit builds under `tmp/probe/base/` (`git archive <BASE> | tar -x -C tmp/probe/base`, `cp -al node_modules tmp/probe/base/node_modules`, the owned files copied over it, the patch applied), and the report records them as the copy's readings; delete `tmp/probe/` before the report. `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, and `git worktree` are forbidden. Sibling units run in their own worktrees; their files are off-limits.

**Measurements.** Taken by the staging script at `c3ac297` (`npm ci --ignore-scripts` and `npm run build:src` exit 0, `tmp/units/cn-stage.log.txt`); the unit runs the existing normalizer case first and records its exit.

## Unknowns

None.

## Scope

**Owned.** `tests/setupServer.ts`, limited to the `normalizeMediaCondition` helper and its TSDoc (an explicit grant against the family record's off-limits row); `tests/setupServer.test.ts`, the normalizer case and the cases this unit adds beside it.

**Shared (report-only).** None.

**Off-limits.** Every other file, every partial, `guides/veneer.md`, `ROADMAP.md`, the vendored files.

**What asserts the state this change ends.** The normalizer cases in `tests/setupServer.test.ts` (Owned); `tests/conformance.test.ts` (unchanged: no ledger row changes, proved by the run).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, or destructive git command; scoped runs only.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The report file `/home/user/veneer-cn/tmp/units/cn-report.md`: the helper's before and after, each case with the mutation it distinguishes, the failing-first run (the new cases red on the helper as it stands, with the command and its failing count), and each gate's command and result line. The report states no count of a growable set and uses no banned term. Delivered as that file plus the same text as the final message.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short hypothesis — per `.agents/orchestration.md` § Deviation protocol when a recorded selector cannot be rendered without an inline style or an unshipped class, when a mutation the criteria name cannot be distinguished by any assertion, or when the ledger gate throws a claim collision. Decide, record, and carry on for the specimen copy, the case names, where the guide section's paragraphs sit, the exact `:has()` qualifiers of capture rows, and the position of new rows at the end of their tables.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0; `npm run check` exits 0.
2. The scoped run `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/setupServer.test.ts` (name the project the sibling setup proofs use if it differs: `grep -n "setupServer.test" configs/ vite.config.ts package.json`) exits 0, with a case asserting `normalizeMediaCondition('@media (max-width: 575.98px) and (prefers-reduced-motion: reduce)')` equals `normalizeMediaCondition('@media (width < 576px) and (prefers-reduced-motion: reduce)')`, a reversed-order twin with the width feature second, the existing single-feature cases unchanged, and the existing `@supports (display: grid)` case as the control; the record shows the new cases red before the edit (the helper returns the conjunction raw) and a rewrite reaching only a leading width feature reddening the reversed twin.
3. `npm run test:conformance` exits 0 with no ledger row changed (the run's output recorded).
4. The report carries each item of § Output.

**Observations, not criteria.** The whole `test:setup` project is the Orchestrator's run at landing.

## Review evidence

`git -C /home/user/veneer-cn diff c3ac297` and `git -C /home/user/veneer-cn status --porcelain` at hand-back (`cn.diff`, `cn-status.txt`), plus the report.
