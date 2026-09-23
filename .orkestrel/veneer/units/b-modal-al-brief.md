# Unit ALERT (`al`) — the `alert` key ships with its dismissible combinator

## Role and engine

`opus` on Opus 5.5 (the alias serves `claude-opus-5`), reached as a native Claude subagent in the worktree `/home/user/veneer-al` (branch `unit/al` from `c3ac297`). The executor that opens this brief is that subagent.

## Objective

The `alert` key ships in `src/styles/components/_alert.scss` exactly as the pinned inventory records it, with the `.alert-dismissible .btn-close` combinator written in the partial and its `CLOSE_DEFERRED` entry moved to `CLOSE_SELECTORS`, an `Alert` region rendering the role ramp, the linked alert, and the dismissible alert at rest, the mirrored browser proof, the ledger rows, and the guide section, with every shared-file change returned as an exact patch.

## Context

**Evidence.** The oracle surface for `alert` is terrain § A (its selectors, properties, and conditions; the `.alert-dismissible .btn-close` combinator recorded under `btn-close` too, which the D22 ladder files under `#### btn-close`, M6); the plugin obligation is terrain § B (Alert); the per-role loop pattern is `src/styles/components/_list-group.scss` (iterate `tokens.$aliased`, never `tokens.$roles`, M8's sibling ruling in the verdict's ALERT row: iterating `$roles` emits `.alert-tertiary`, which the additions gate reddens); the close combinators' present home is `CLOSE_DEFERRED` in `tests/setupStyles.ts` with its partition case in `tests/setupStyles.test.ts` and the `Overlays` rows in `guides/veneer.md` § Deferred selectors (M6; the owner word `Overlays` stays until CLOSE-OUT). Read each before you edit and take every line number yourself.

**Law.** `AGENTS.md`; `.claude/rules/{styles,tests,browser,names,documentation,writing,architecture,typescript}.md`; the skill: none (the `enterprise-bootstrap` skill is reference craft, not process); the guide `guides/veneer.md` (§ Styles, § Compatibility, § Deferred selectors, § Departures, § Additions, § Showcase, § Tests); the design verdict `/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md` (its rulings M1 to M20 and § Family record bind this unit); the terrain record `/home/user/scaffold/.orkestrel/veneer/units/b-modal-terrain-report.md` (§ A the oracle surface per key, § B the plugin obligations, § C Elements and Mailbox, § D what the tree carries, § E the rulings already landed, § F sizing, § G the files the family makes false). Where the terrain and the tree disagree, the tree wins and the unit reports the disagreement.

**Installed primitives.** `@orkestrel/test` (`node_modules/@orkestrel/test/dist/src/core/index.d.cts` and `dist/src/browser/index.d.cts`: `readStyle`, `readPixels`, `readHit`, `matchesColor`, `stageMedia`, `visitBreakpoint`, `waitForAnimations`, the recorders) and `@orkestrel/contract` (guards); the tree's own readers in `tests/setupStyles.ts` and `tests/setupBrowser.ts`. A helper, wait, or reader whose job an installed export does is a defect; the audit's checker probes the diff for export names.

**Host.** Linux, `bash`; npm 11 on `PATH` through `export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"` (the host npm is 10.9.7 and the manifest refuses it); Chromium 141 at `/opt/pw-browsers/chromium-1194` for the browser proofs; no sandbox; no network needed. Foreground commands longer than 10 minutes are the Orchestrator's.

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored; never edit them. The shared files stay report-only: the worktree's gates that need a shared file (`check`, the section proof, the built cascade) are read on a validation copy the unit builds under `tmp/probe/base/` (`git archive <BASE> | tar -x -C tmp/probe/base`, `cp -al node_modules tmp/probe/base/node_modules`, the owned files copied over it, the patch applied), and the report records them as the copy's readings; delete `tmp/probe/` before the report. `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, and `git worktree` are forbidden. Sibling units run in their own worktrees; their files are off-limits.

**Measurements.** Taken by the staging script at `c3ac297` (`npm ci --ignore-scripts` and `npm run build:src` exit 0, `tmp/units/al-stage.log.txt`); the unit runs `npm run test:conformance` and the close proof `tests/src/styles/components/close.test.ts` first and records their exits as the baseline.

## Unknowns

- Whether a Tailwind utility shares a name with an alert class: run the shared-name reading over the class names you ship (`grep -o` over the built cascade against the exclusion line in `tests/setup.css`) and report; M17 makes `test:service` an observation unless a shared name appears.

## Scope

**Owned.** `src/styles/components/_alert.scss`, `tests/src/styles/components/alert.test.ts`, `app/browser/sections/AlertSection.ts`, `tests/app/browser/sections/AlertSection.test.ts`.

**Shared (report-only; return an exact patch against `c3ac297`).** `src/styles/index.scss` (`@use 'components/alert'` between `badge` and `progress`, M19; the order case's stem map and expected list in `tests/conformance.test.ts` follow); `tests/setupStyles.ts` (the `CLOSE_DEFERRED` entry moved to `CLOSE_SELECTORS`; the alert case tables) and `tests/setupStyles.test.ts` (the tables bound to the inventory; the partition case unchanged in shape); `tests/setup.ts` (the `CaptureSubject` members and resting `CASCADE_KEYS` rows appended; no driven row); `tests/app/browser/integration.test.ts`, `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`; `tests/conformance.test.ts` (`'alert'` in `listed`, the order case); `tests/setupServer.test.ts` (the component set); `app/browser/constants.ts` (`ALERT_COPY`, `ALERT_SPECIMENS`), `app/browser/Showcase.ts`, `app/browser/index.ts` (the section after the disclosure regions and before the first utility region, M14); `guides/veneer.md` (the `_alert.scss` § Files row; `### Alert classes` in the barrel's position; the `alert` selector and variable rows in § Compatibility; the Alert `plugin` row in the R8 shape ending "Owner: J-ENGINE."; the `.alert-dismissible .btn-close` `Overlays` row deleted from § Deferred selectors; the `### Close classes` sentence rewritten to "Each overlay partial writes the combinator that fits the control into its header or its dismissible box; a combinator whose partial has not landed stays listed under § Deferred selectors."; the `#### alert` departure rows and any addition row exactly as the gate measures them; the § Showcase and § Tests links); `ROADMAP.md` (nothing: the family row closes at the family's exit).

**Off-limits.** Every other unit's owned files (CAROUSEL: `_carousel.scss`, `carousel.test.ts`, `CarouselSection.ts`, `CarouselSection.test.ts`; CONDITIONS: `tests/setupServer.ts`; the disclosure and utilities units' files), `src/browser/**`, `src/core/**`, `tests/src/browser/**`, `tests/src/core/**`, `tests/setupServer.ts`, `tests/fixtures/**` (except the Tailwind fixtures if a shared name appears, reported first), `app/browser/styles/**`, `src/styles/_tokens.scss`, `src/styles/_theme.scss`, `src/styles/_mixins.scss`, every other partial, `configs/**`, `package.json`, `package-lock.json`, `README.md`, the vendored files.

**What asserts the state this change ends.** The partition case over `CLOSE_DEFERRED` and `CLOSE_SELECTORS` in `tests/setupStyles.test.ts` (Shared: the moved entry); the close proof `tests/src/styles/components/close.test.ts` if it asserts the deferred set (read it; Shared patch if so); the `listed` literal and the order case (Shared); the showcase enumerations (Shared); `tests/guides.test.ts` (through the patch at integration). Search bound: grep `'pagination'` across `tests/`, `app/`, and `src/` and re-derive the set at `c3ac297`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, or destructive git command; no tree-wide `format` or lint `--fix`; `npm run build:src` and `npm run build:src:styles` are permitted in the validation copy; scoped runs only; a runtime probe lives under `tmp/probe/` and is deleted before the report.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The report file `/home/user/veneer-al/tmp/units/al-report.md`: the touched files, the ledger rows the gate measured, the resting rows and subjects, the R19 proof matrix (each recorded selector and condition mapped to its case, its distinguishing mutation, its specimen, and its scenario), the failing-first and mutation record with commands, each gate's command and result line on the validation copy, the shared-name reading, the guide text, and the exact shared patch (a unified diff against `c3ac297`, also written to `tmp/units/al-shared.patch`). The report states no count of a growable set and uses no banned term. Delivered as that file plus the same text as the final message.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short hypothesis — per `.agents/orchestration.md` § Deviation protocol when a recorded selector cannot be rendered without an inline style or an unshipped class, when a mutation the criteria name cannot be distinguished by any assertion, or when the ledger gate throws a claim collision. Decide, record, and carry on for the specimen copy, the case names, where the guide section's paragraphs sit, the exact `:has()` qualifiers of capture rows, and the position of new rows at the end of their tables.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0 in the worktree.
2. On the validation copy: `npm run check` exits 0; `npm run build:src` exits 0 and the built cascade carries every `alert` selector the inventory records with its declarations and no other rule naming those classes (the report lists them against the inventory).
3. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/alert.test.ts tests/src/styles/components/close.test.ts` exits 0 on the validation copy, and each alert case distinguishes its named mutation: each role modifier resolves color, background, border colour, and link colour from its own `--bs-{role}-text-emphasis`, `-bg-subtle`, and `-border-subtle` aliases in light and inside a dark island (mutation: one loop entry reading another role's alias, or a literal); `.alert-link` weight 700 and `--bs-alert-link-color` (mutation: the rule dropped); `.alert-heading` `color: inherit` (mutation: the rule dropped); the dismissible end padding and the close control's box at the alert's top-right corner at `z-index: 2`, against a control `.btn-close` inside a plain `.alert` reading `position: static` (mutation: `right: 0` written as `left: 0`, or the rule written as `.alert .btn-close`); a wrapper override of `--bs-alert-padding-x` moving the padding (mutation: a literal padding); iterating `tokens.$roles` reddening the additions gate (recorded as the loop mutation).
4. The section proof exits 0 on the validation copy under the config the sibling section proofs use (`grep -rn "sections/" configs/ vite.config.ts`), asserting the region contract, no `[style]`, the role ramp, the linked alert, and the dismissible alert with its `aria-label` close control; no specimen writes `fade` or `show` (M12).
5. `npm run test:conformance` exits 0 on the validation copy with `alert` in `listed`, the presence, ledger, deferral, and priority gates green, and the `.alert-dismissible .btn-close` `Overlays` row gone; `npm run test:guides` and `npm run test:policy` exit 0 there.
6. The report carries each item of § Output, and the patch passes `git apply --check` on the validation copy at `c3ac297`.

**Observations, not criteria.** The journey, `CAPTURE=1`, `test:service`, and the whole styles project are the Orchestrator's runs at landing.

## Review evidence

`git -C /home/user/veneer-al diff c3ac297` (with the new files rendered through `git diff --no-index /dev/null <file>`) and `git -C /home/user/veneer-al status --porcelain` at hand-back (`al.diff`, `al-status.txt`), the patch `al-shared.patch`, and the report.
