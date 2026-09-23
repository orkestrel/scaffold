# Unit DROPDOWN (`dd`) — round 2 (successor brief 3): the fix round

This brief succeeds `dd-brief-2.md` (round 1, complete in the worktree) and carries every ruling in `dd-audit-verdict.md` § Rulings: claims 3, 4, 6, 7, and 8, the objective lane's F1, and the subjective lane's F1, F2, and F3. It also carries the patch-base ruling there: the guide hunks of `dd-shared.patch` are stale against the head after CLOSE-GUIDE and B-PASSIVE-ORDER-GUIDE moved the sections, so this round regenerates one patch against `c3ac297` in the post-BPO form (the `dd-shared-post-bpo.patch` barrel and conformance hunks fold into it). Every owned file round 1 wrote stays; this round edits them in place.

## Role and engine

`opus` on Opus 5.5 (the `opus` alias), a native Claude subagent, the sole writer in `/home/user/veneer-dd` (branch `unit/dd`, uncommitted round-1 writes over `87ff1d0`, its own `node_modules`).

## Objective

The DROPDOWN unit with every round-1 finding closed: the executed mutation table, a containment case that measures at 390 and 1280, the extended partition predicate, the `raised` polarity, the ruled prose, and one shared-file patch `tmp/units/dd-shared-2.patch` that applies to `c3ac297`.

## Context

**Evidence.** `/home/user/scaffold/.orkestrel/veneer/units/dd-audit-verdict.md` § Rulings and the three lane verdicts beside it (`dd-audit-objective-verdict.md`, `dd-audit-subjective-verdict.md`, `dd-audit-checker-verdict.md`) name every site and the exact right text; where a lane and the reconciled verdict differ, the reconciled verdict wins. Round 1's patches are `dd-shared.patch` (against `87ff1d0`) and `dd-shared-post-bpo.patch`, its report `b-collapse-dd-report.md`, all retained under `/home/user/scaffold/.orkestrel/veneer/units/`; round 1's instrument and logs sit under `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/dd/` (`mutate.py`, `mutations.log.txt`, `g2-*.log.txt`, `journey-light-1280.log.txt`), read-only for this round. NAV's R8 sentence, which this patch carries verbatim, is "A `plugin` row records a behavior J-ENGINE owns, while the classes that behavior sets ship in the cascade and render in markup.". The landing base is the commit `c3ac297` on the session branch of the same repository (`git -C /home/user/veneer-dd log -1 c3ac297` confirms it exists; `git -C /home/user/veneer-dd show c3ac297:guides/veneer.md` reads its guide).

**Law.** `AGENTS.md`; `.claude/rules/{tests,styles,documentation,writing,typescript,browser,names}.md`; the design verdict `/home/user/scaffold/.orkestrel/veneer/b-collapse-design-verdict.md` (R6, R7, R8, R9, R13, R17, R18); the family record `/home/user/scaffold/.orkestrel/veneer/units/b-collapse-family.md`. Skill: none. Guide: `guides/veneer.md` (report-only: the patch).

**Installed primitives.** `@orkestrel/test` browser readers as round 1 used them; `visitBreakpoint` is the project-owned helper `tests/setupBrowser.ts` exports (`dropdown.test.ts` imports it from `../../../setupBrowser.js`; the section proofs under `tests/app/browser/sections/` import from `../../../setupBrowser.js` too); this round adds no helper.

**Host.** Linux, `bash`; the worktree `/home/user/veneer-dd`; npm 11 on `PATH` through `export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`; Chromium 141 at `/opt/pw-browsers` for the browser proofs; no network needed.

**Measurements.** The objective lane read the containment case with no viewport call and the `app:browser` project with no declared viewport, so the case measured the runner's default width only; it read the `it.each(TEXT_MODES)` light instance mounting `data-bs-theme="light"` for the island and the reference alike, so no mutation reddens it; it read the partition predicate as `selector.startsWith('.input-group') || selector.startsWith('.btn-group')`. Re-take each against the worktree.

**Control identifiers.** None. A test is named for what it proves, never for the finding that specified it.

**Standing conditions.** The worktree's owned files are dirty by design (round 1); do not revert anything. `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored. `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, and `git worktree` are forbidden, `git add -N` followed by `git reset` included; produce the diff of an untracked file with `git diff --no-index /dev/null <path>`. The shared files stay report-only in the worktree. Build a validation copy under `tmp/probe/base/`: `git -C /home/user/veneer-dd archive c3ac297 | tar -x -C tmp/probe/base`, then `cp -al node_modules tmp/probe/base/node_modules`, then `git -C tmp/probe/base init -q && git -C tmp/probe/base add -A && git -C tmp/probe/base commit -qm base` so `git apply --check` runs there; copy the owned files over it after each edit; run the mutations, the gates, and the journey there; delete `tmp/probe/` before the report. The `Nav` deferral row (`.nav-tabs .dropdown-menu`, owner `Nav`) stays in the patch: NAV's landing drops it.

## Unknowns

None.

## Scope

**Owned.** `src/styles/components/_dropdown.scss`, `tests/src/styles/components/dropdown.test.ts`, `app/browser/sections/DropdownSection.ts`, `tests/app/browser/sections/DropdownSection.test.ts`, `tmp/units/dd-shared-2.patch`, `tmp/units/dd-report-2.md`, `tmp/units/dd-instruments-2/` (this round's instruments and logs: the mutation script, the journey script, each mutation's log, each gate's log).

**Shared (report-only, inside the regenerated patch).** `src/styles/index.scss`, `tests/conformance.test.ts`, `tests/setupServer.test.ts`, `tests/setup.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/app/browser/integration.test.ts`, `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, `app/browser/constants.ts`, `app/browser/Showcase.ts`, `app/browser/index.ts`, `guides/veneer.md`.

**Off-limits.** Everything else, the vendored files, `ROADMAP.md`, `README.md`, `package.json`, `tests/fixtures/**`, `tests/setupServer.ts`, `src/browser/**`, `src/core/**`, and the sibling units' files (`_nav.scss`, `_collapse.scss`, their proofs and sections).

**What asserts the state this change ends.** `tests/setupStyles.test.ts` `dropdown case tables` (the partition and the `raised` column), `tests/app/browser/sections/DropdownSection.test.ts` (the containment at each width), `tests/src/styles/components/dropdown.test.ts` (the dark-mode case), `tests/guides.test.ts` and `tests/policy.test.ts` on the validation copy (the guide and the § Tests links), `tests/conformance.test.ts` (the ledger).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, or destructive git command; no tree-wide `format` or lint `--fix` outside the validation copy.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

`tmp/units/dd-shared-2.patch` (one unified diff against `c3ac297` covering every shared file, the guide included, in the post-BPO form) and the report `tmp/units/dd-report-2.md`: each finding's site with its before and after; the mutation table with every row naming an executed mutation, its log, and the case that went red; each gate's command and result line on the validation copy; the four journey variants' result lines as observations; and the `git apply --check` line. The report states no count and uses no banned term.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis — when a guide site the ruling names cannot be located on `c3ac297`, when a named mutation does not redden any case, or when `visitBreakpoint` is not reachable from the section proof's project. Decide, record, and carry on for paragraph wrapping, the order of the added mutations, the exact case title for the dark-mode case, and where inside the instrument directory each log sits.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0 in the validation copy with the owned files and the patch applied.
2. `git -C tmp/probe/base apply --check tmp/units/dd-shared-2.patch` exits 0, and the patch's file list equals the Shared row.
3. `tmp/units/dd-instruments-2/` holds the mutation script and one log per mutation; the table in the report names, for `centering-added` (appending `.dropdown-center .dropdown-menu[data-bs-popper]{left:50%;transform:translateX(-50%)}`), `active-rule-dropped`, `disabled-rule-dropped`, `header-rule-dropped`, `divider-rule-dropped`, `item-text-rule-dropped`, `position-swapped` (start and end exchanged), and `sm-end-boundary` (`.dropdown-menu-sm-end` alone moved to the wrong boundary), the case that went red; the unmutated control is green in the same copy.
4. The containment case in `DropdownSection.test.ts` measures inside `await visitBreakpoint(390, …)` and `await visitBreakpoint(1280, …)`, and the `room-dropped` mutation's log is red at both widths.
5. In `dropdown.test.ts`, the former `it.each(TEXT_MODES)` case runs over the dark mode alone under a title naming what it proves; the case list carries no instance that mounts identical markup in identical scopes for the island and the reference.
6. `_dropdown.scss` and the `DROPDOWN_DIRECTION_CASES` table both use `raised`, `true` meaning the caret sits above the baseline (`vertical-align: 0.255em`), with the partial's header comment "whether the caret sits above the baseline rather than on it"; the partition predicate in `tests/setupStyles.test.ts` reads `selector.startsWith('.input-group') || selector.startsWith('.btn-group') || selector.startsWith('.nav-tabs')` and `npm run test:setup` is green with the `Nav` row still present.
7. In the patched guide: the Dropdown `plugin` cell ends "Owner: J-ENGINE."; the R8 sentence after the table is NAV's wording verbatim; § Tests carries `[the dropdown classes](../tests/src/styles/components/dropdown.test.ts)` in the style-proof list and `[dropdown specimens](../tests/app/browser/sections/DropdownSection.test.ts)` in the application-proof list, each in alphabetical position; the `.dropdown-menu-end` sentence states that the class aligns the menu to its wrapper's end when the menu carries the `data-bs-popper` attribute and publishes `--bs-position` alone without it; the `### Dropdown classes` section sits at its post-BPO position (directly before `### Button group classes`, after `### Collapse classes` where that section exists, else after the section that precedes it in the barrel's order); "the `raised` flag", "the `source` field", and "through its `aria-label` attribute" replace the three bare tokens; `DROPDOWN_COPY.paragraph` reads "a menu shown below, above, and beside its toggle, and from each centered wrapper" and ends with "Hover or focus an item to compare its states."
8. The scoped runs `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/dropdown.test.ts` and `npx vitest run --config configs/app/vite.browser.config.ts --no-cache --reporter=dot tests/app/browser/sections/DropdownSection.test.ts` exit 0 in the validation copy after `npm run build:src`.
9. On the validation copy: `npm run test:guides`, `npm run test:policy`, `npm run test:setup`, and `npm run test:conformance` exit 0, recorded with their result lines.
10. The report carries each item of § Output.

**Observations, not criteria.** The four journey variants (`light-390`, `light-1280`, `dark-390`, `dark-1280`) run in the validation copy after the final sync; record each result line. The authoritative journey and `CAPTURE=1` are the Orchestrator's at landing.

## Review evidence

`tmp/units/dd-shared-2.patch`; `git -C /home/user/veneer-dd diff 87ff1d0` plus `git diff --no-index /dev/null <path>` per untracked owned file, concatenated as `tmp/units/dd-2.diff`; `git -C /home/user/veneer-dd status --porcelain` as `tmp/units/dd-2-status.txt`; the report; the instrument directory.
