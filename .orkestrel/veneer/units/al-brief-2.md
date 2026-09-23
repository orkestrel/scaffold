# Unit ALERT (`al`) — round 2 (successor brief 2): the fix round

This brief succeeds `b-modal-al-brief.md` (round 1, complete in the worktree) and carries every ruling in `al-audit-verdict.md` § Rulings: claim 3 (the mutation reruns against the shipped proof), 7a with the `CLOSE_COPY` correction, 7b (physical direction and the `right` key), 8a (the nouns), 8b (the inset comment), and R2 (the hit reading). Every owned file round 1 wrote stays; this round edits them in place and returns a revised shared patch.

## Role and engine

`opus` on Opus 5.5 (the `opus` alias), a native Claude subagent, the sole writer in `/home/user/veneer-al` (branch `unit/al`, uncommitted round-1 writes over `c3ac297`, its own `node_modules`).

## Objective

The ALERT unit with every round-1 finding closed: retained mutation logs that bind to the shipped proof, the R17-clean showcase copy in the guide and in `CLOSE_COPY`, physical-direction wording with the `right` key, the ruled nouns and comment, a hit reading in the dismissible case, and one shared-file patch `tmp/units/al-shared-2.patch` against `c3ac297`.

## Context

**Evidence.** `/home/user/scaffold/.orkestrel/veneer/units/al-audit-verdict.md` § Rulings and the three lane verdicts beside it (`al-audit-objective-verdict.md`, `al-audit-subjective-verdict.md`, `al-audit-checker-verdict.md`) name every site and the exact right text; where a lane and the reconciled verdict differ, the reconciled verdict wins. Round 1's patch is `al-shared.patch` and its report `b-modal-al-report.md`, both retained there; round 1's instruments and logs are under `/home/user/scaffold/.orkestrel/veneer/units/al-instruments/` (read-only for this round; the worktree's own copy under `tmp/units/al-instruments/` is yours to extend). The landing base is `c3ac297` (`git -C /home/user/veneer-al log -1 c3ac297`).

**Law.** `AGENTS.md`; `.claude/rules/{styles,tests,browser,names,documentation,writing,typescript}.md`; the design verdict `/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md` (M6, M8, M12, M14, M15, R17); the terrain `/home/user/scaffold/.orkestrel/veneer/units/b-modal-terrain-report.md`. Skill: none. Guide: `guides/veneer.md` (report-only: the patch).

**Installed primitives.** `@orkestrel/test` browser readers, `readHit` included (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts`; a sibling proof that already calls `readHit`, found by `grep -rln readHit tests/src/styles/components`, is the call-site pattern); this round adds no helper.

**Host.** Linux, `bash`; the worktree `/home/user/veneer-al`; npm 11 on `PATH` through `export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`; Chromium 141 at `/opt/pw-browsers` for the browser proofs; no network needed.

**Measurements.** The objective lane read eight mutation logs whose case locations (64, 108, 122, 144, 192, 207, 230) do not match the shipped `alert.test.ts` (67, 111, 125, 146, 185, 200, 224) and whose `RUN` line names `tmp/probe/base`, while the retained `run.sh` names `tmp/probe/fresh`; the shipped-revision control is green (`45 passed (45)` with `close.test.ts`). Re-take the line numbers against the worktree before editing.

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** The worktree's owned files are dirty by design (round 1); do not revert anything. `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored. `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, and `git worktree` are forbidden, `git add -N` followed by `git reset` included; produce the diff of an untracked file with `git diff --no-index /dev/null <path>`. The shared files stay report-only in the worktree. Build a fresh validation copy under `tmp/probe/base/`: `git -C /home/user/veneer-al archive c3ac297 | tar -x -C tmp/probe/base`, then `cp -al node_modules tmp/probe/base/node_modules`, then `git -C tmp/probe/base init -q && git -C tmp/probe/base add -A && git -C tmp/probe/base commit -qm base`; copy the owned files over it after each edit and apply the patch; run every mutation and gate there; delete `tmp/probe/` before the report, after the logs are copied into `tmp/units/al-instruments-2/`.

## Unknowns

None.

## Scope

**Owned.** `src/styles/components/_alert.scss`, `tests/src/styles/components/alert.test.ts`, `app/browser/sections/AlertSection.ts`, `tests/app/browser/sections/AlertSection.test.ts`, `tmp/units/al-shared-2.patch`, `tmp/units/al-report-2.md`, `tmp/units/al-instruments-2/` (this round's script, one log per mutation, the control log, each gate's log).

**Shared (report-only, inside the revised patch, which supersedes `al-shared.patch` whole).** The files round 1's patch touched: `src/styles/index.scss`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/setup.ts`, `tests/app/browser/integration.test.ts`, `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, `tests/conformance.test.ts`, `tests/setupServer.test.ts`, `app/browser/constants.ts` (now also the `CLOSE_COPY` sentence), `app/browser/Showcase.ts`, `app/browser/index.ts`, `guides/veneer.md`.

**Off-limits.** Everything else, the vendored files, `ROADMAP.md`, `README.md`, `package.json`, `tests/fixtures/**`, `tests/setupServer.ts`, `src/browser/**`, `src/core/**`, and the sibling units' files (`_carousel.scss`, `_collapse.scss`, `_dropdown.scss`, `_nav.scss`, their proofs and sections).

**What asserts the state this change ends.** `tests/setupStyles.test.ts` (the geometry table's `right` key), `tests/src/styles/components/alert.test.ts` (the key's readers and the hit reading), `tests/app/browser/sections/AlertSection.test.ts` and the Close section proof (the copy), `tests/guides.test.ts` and `tests/policy.test.ts` on the validation copy (the guide).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, or destructive git command; no tree-wide `format` or lint `--fix` outside the validation copy.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

`tmp/units/al-shared-2.patch` (one unified diff against `c3ac297` covering every shared file) and the report `tmp/units/al-report-2.md`: each finding's site with its before and after; the mutation table with every row naming the executed mutation, its log under `al-instruments-2/`, the `RUN` line's copy, and the case that went red; each gate's command and result line on the validation copy; the `git apply --check` line. The report states no count and uses no banned term.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis — when a rerun mutation does not redden its named case against the shipped proof, when `readHit` is not reachable from the styles project, or when a guide site the ruling names cannot be located on `c3ac297`. Decide, record, and carry on for paragraph wrapping, the hit reading's exact assertion shape, and where inside the instrument directory each log sits.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0 in the validation copy with the owned files and the patch applied.
2. `git -C tmp/probe/base apply --check tmp/units/al-shared-2.patch` exits 0 after the copy is returned to `c3ac297`, and the patch's file list equals the Shared row.
3. `tmp/units/al-instruments-2/` holds the script, one log per mutation for every row of the R19 matrix (the eight named ones included), and one unmutated control log, each `RUN` line naming the same copy and each named case's location matching the shipped `alert.test.ts`; every mutation is red on its named case and the control green; the report's matrix names them.
4. The dismissible case reads a hit at the close control's box center through `readHit` and asserts the control is what the hit returns, beside its `z-index` reading, under a title naming what it proves; a mutation stacking the control under the content (`z-index: -1`, or the rule dropped) reddens it, recorded in the matrix.
5. `ALERT_DISMISSIBLE_GEOMETRY` names its key `right` with the readers in `alert.test.ts` and `tests/setupStyles.test.ts` following; the partial's comments, the table's remarks, and the guide write "right" at every site the subjective lane's 7b names, and the dismissible paragraph carries "The room and the control's placement are physical, so they sit at the right whatever the document's writing direction."
6. In the patched guide and `app/browser/constants.ts`: the showcase sentence in `### Alert classes` ends "…and a dismissible alert whose close control is named through its `aria-label` attribute."; `CLOSE_COPY`'s "announces the dismissal it performs" takes the same correction, in the Close copy's own sentence shape, with the Close section proof still green; "the `close` method removes the `show` class" and "carries the `fade` class" in the plugin row; "The `right` field…", "The `block` and `inline` fields…", and "the `lift` field…" in the table remarks; "one `light` scenario and one `dark` scenario" and "No specimen carries the `fade` class or the `show` class" in the TSDoc; the two compatibility cells ending on the proof's path unchanged.
7. `_alert.scss` carries "The control's block inset is the release's `1.25` multiple of its inline inset, and each is written over the density token the alert's own inset reads." for the inset comment.
8. The scoped runs `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/alert.test.ts tests/src/styles/components/close.test.ts` and `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/AlertSection.test.ts tests/app/browser/sections/CloseSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts` exit 0 in the validation copy after `npm run build:src`.
9. On the validation copy: `npm run test:guides`, `npm run test:policy`, `npm run test:setup`, and `npm run test:conformance` exit 0, recorded with their result lines.
10. The report carries each item of § Output.

**Observations, not criteria.** The journey and `CAPTURE=1` are the Orchestrator's at landing.

## Review evidence

`tmp/units/al-shared-2.patch`; `git diff --no-index /dev/null <path>` per owned file, concatenated as `tmp/units/al-2.diff`; `git -C /home/user/veneer-al status --porcelain` as `tmp/units/al-2-status.txt`; the report; the instrument directory.
