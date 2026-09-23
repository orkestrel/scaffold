# Unit NAV (`nv`) — round 2 (successor brief 3): the fix round

This brief succeeds `nv-brief-2.md` (round 1, complete in the worktree) and carries every ruling in `nv-audit-verdict.md` § Rulings: claims 3, 4, 6, 7, and 8, the objective lane's F1, the subjective lane's F1 and F2, and R-2. It also carries the patch-base finding COLLAPSE's round 2 carried: the guide hunks of `nv-shared.patch` are stale against the head after CLOSE-GUIDE and B-PASSIVE-ORDER-GUIDE moved the sections, so this round regenerates one patch against `c3ac297`. Every owned file round 1 wrote stays; this round edits them in place.

## Role and engine

`opus` on Opus 5.5 (the `opus` alias), a native Claude subagent, the sole writer in `/home/user/veneer-nv` (branch `unit/nv`, uncommitted round-1 writes over `87ff1d0`, its own `node_modules`).

## Objective

The NAV unit with every round-1 finding closed: the executed mutation matrix, the release's open-menu markup in the `Nav tabs` specimen, a partition predicate that survives DROPDOWN's landing, the ruled prose, and one shared-file patch `tmp/units/nv-shared-2.patch` that applies to `c3ac297`.

## Context

**Evidence.** `/home/user/scaffold/.orkestrel/veneer/units/nv-audit-verdict.md` § Rulings and the three lane verdicts beside it (`nv-audit-objective-verdict.md`, `nv-audit-subjective-verdict.md`, `nv-audit-checker-verdict.md`) name every site and the exact right text; where a lane and the reconciled verdict differ, the reconciled verdict wins. Round 1's patch is `nv-shared.patch` (against `87ff1d0`) and its report `b-collapse-nv-report.md`, both retained under `/home/user/scaffold/.orkestrel/veneer/units/`; round 1's instruments and logs are retained under `/home/user/scaffold/.orkestrel/veneer/units/nv-instruments/` (`mutate.py`, `journey.sh`, `nv-sync.sh`, `gates.sh`, the `mutate-final-*.log.txt` and `journey-*.log.txt` logs). DROPDOWN's seven `Navbar` deferral rows sit at `/home/user/scaffold/.orkestrel/veneer/units/dd-shared.patch` around lines 913-919 (locate them by the `.navbar-nav .dropdown-menu` name). The landing base is the commit `c3ac297` on the session branch of the same repository (`git -C /home/user/veneer-nv log -1 c3ac297` confirms it exists; `git -C /home/user/veneer-nv show c3ac297:guides/veneer.md` reads its guide).

**Law.** `AGENTS.md`; `.claude/rules/{tests,styles,documentation,writing,typescript,browser}.md`; the design verdict `/home/user/scaffold/.orkestrel/veneer/b-collapse-design-verdict.md` (R3, R8, R11, R12, R15, R17, R18, R19); the family record `/home/user/scaffold/.orkestrel/veneer/units/b-collapse-family.md`. Skill: none. Guide: `guides/veneer.md` (report-only: the patch).

**Installed primitives.** `@orkestrel/test` browser readers as round 1 used them; `bootstrap/js/src/tab.js` and `bootstrap/js/src/dropdown.js` under `node_modules` are the release's script, read for R-2 and claim 4; this round adds no helper.

**Host.** Linux, `bash`; the worktree `/home/user/veneer-nv`; npm 11 on `PATH` through `export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`; Chromium 141 at `/opt/pw-browsers` for the browser proofs; no network needed.

**Measurements.** The objective lane read the stage's `test:setup` green only because the stage lacked DROPDOWN's rows, and read the partition assertion as `new Set([...NAV_SELECTORS, ...withheld])` against the nav inventory's selector set with `withheld` built from every `Navbar`-owner deferral row. The subjective lane read `dropdown.js` writing `show` on the toggle and the menu and never on the item, and `tab.js` writing `active` on a dropdown toggle and `show` on the menu. Re-take each against the installed files.

**Control identifiers.** None. A test is named for what it proves, never for the finding that specified it.

**Standing conditions.** The worktree's owned files are dirty by design (round 1); do not revert anything. `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored. `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, and `git worktree` are forbidden, `git add -N` followed by `git reset` included; produce the diff of an untracked file with `git diff --no-index /dev/null <path>`. The shared files stay report-only in the worktree. The round-1 stage under the Orchestrator's scratchpad (`scratchpad/nv-stage`) holds `87ff1d0` plus round 1's patch and is off-limits; build a fresh validation copy under `tmp/probe/base/`: `git -C /home/user/veneer-nv archive c3ac297 | tar -x -C tmp/probe/base`, then `cp -al node_modules tmp/probe/base/node_modules`, then `git -C tmp/probe/base init -q && git -C tmp/probe/base add -A && git -C tmp/probe/base commit -qm base` so `git apply --check` runs there; copy the owned files over it after each edit; run the mutations, the gates, and the journey there; delete `tmp/probe/` before the report. The DROPDOWN partial is absent from `c3ac297`, so the seam and menu cases keep the consumer-rule technique round 1 used.

## Unknowns

None.

## Scope

**Owned.** `src/styles/components/_nav.scss`, `tests/src/styles/components/nav.test.ts`, `app/browser/sections/NavSection.ts`, `tests/app/browser/sections/NavSection.test.ts`, `tests/app/browser/sections/CardSection.test.ts`, `tmp/units/nv-shared-2.patch`, `tmp/units/nv-report-2.md`, `tmp/units/nv-instruments-2/` (this round's instruments and logs: the mutation script, the journey script, each mutation's log, each gate's log).

**Shared (report-only, inside the regenerated patch).** `src/styles/index.scss`, `tests/setup.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/app/browser/integration.test.ts`, `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, `tests/conformance.test.ts`, `tests/setupServer.test.ts`, `app/browser/constants.ts`, `app/browser/Showcase.ts`, `app/browser/index.ts`, `guides/veneer.md`.

**Off-limits.** Everything else, the vendored files, `ROADMAP.md`, `README.md`, `package.json`, `tests/fixtures/**`, `tests/setupServer.ts`, `src/browser/**`, `src/core/**`, and the sibling units' files (`_dropdown.scss`, `_collapse.scss`, their proofs and sections).

**What asserts the state this change ends.** `tests/setupStyles.test.ts` `nav case tables` (the partition), `tests/app/browser/sections/NavSection.test.ts` (the specimen markup), `tests/src/styles/components/nav.test.ts` (the proof titles and the matrix), `tests/guides.test.ts` and `tests/policy.test.ts` on the validation copy (the guide), `tests/conformance.test.ts` (the ledger).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, or destructive git command; no tree-wide `format` or lint `--fix` outside the validation copy.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

`tmp/units/nv-shared-2.patch` (one unified diff against `c3ac297` covering every shared file, the guide included, in the post-BPO form) and the report `tmp/units/nv-report-2.md`: each finding's site with its before and after; the mutation matrix with every row naming an executed mutation, its log, and the case that went red; the partition proof's red and green readings; each gate's command and result line on the validation copy; the four journey variants' result lines as observations; and the `git apply --check` line. The report states no count and uses no banned term.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis — when a guide site the ruling names cannot be located on `c3ac297`, when a named mutation does not redden any case, or when the partition proof is not red before the predicate change. Decide, record, and carry on for paragraph wrapping, the exact wording of the plain `.nav-item.show` tab item's label, the order of the added mutations, and where inside the instrument directory each log sits.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0 in the validation copy with the owned files and the patch applied.
2. `git -C tmp/probe/base apply --check tmp/units/nv-shared-2.patch` exits 0, and the patch's file list equals the Shared row.
3. The `Nav tabs` specimen renders the open-menu tab as `<li class="nav-item dropdown"><a class="nav-link dropdown-toggle show" href="#main" role="button" aria-expanded="true">…</a><ul class="dropdown-menu show" data-bs-popper="static">…</ul></li>` and carries a further plain `<li class="nav-item show"><a class="nav-link" href="#main">…</a></li>` item; `NavSection.test.ts` asserts that shape, the docblock and `NAV_COPY` describe it, and `[style]` stays null on every specimen.
4. In `tests/setupStyles.test.ts`, `withheld` reads `readDeferrals().filter((row) => row.owner === 'Navbar' && row.name.includes('.nav-link'))`; the report records `npm run test:setup` red in the validation copy with DROPDOWN's seven `Navbar` rows appended to the guide's deferral table and the round-1 predicate, and green with the same rows and the changed predicate.
5. `tmp/units/nv-instruments-2/` holds the mutation script and one log per mutation; the matrix in the report names, for `.nav-underline .nav-link.active`, `.nav-fill .nav-item`, `.nav-pills .nav-link`, `.nav-pills .nav-link.active`, and `.nav-tabs`, the executed mutation (the selector or declaration dropped) and the case that went red; the unmutated control is green in the same copy.
6. In the patched guide: `### Nav classes` ends the item-`show` sentence at "…in the tabs, pills, and underline forms."; the tab geometry sentence reads "Each tab overlaps the strip's bottom border by one border width, so the active tab's bottom border covers the strip line where the two meet."; the `--bs-nav-link-font-size` sentence reads "The `.nav-link` rule reads `--bs-nav-link-font-size`, and no rule declares it; `--bs-nav-link-font-weight` is declared empty, as the release leaves them" followed by round 1's continuation; the Tab `plugin` cell names the `show` class and the `active` class written on a dropdown toggle beside its `role`, `aria-selected`, `tabindex`, and `active` writes, as `tab.js` writes them; the Tab and ScrollSpy sentence naming engine obligations stands; the `### Nav classes` section sits between `### Button group classes` and `### Card classes`; the R8 sentence is absent (DROPDOWN's landing carries it).
7. In `_nav.scss`, the item-`show` comment reads "A link whose item carries the `show` class paints as the active one." and the tab geometry comment uses the ruled sentence; in `nav.test.ts`, the geometry proof's title says the tab overlaps the strip's bottom border by one border width; in the `tests/conformance.test.ts` hunk, the order-case comment reads "and the nav partial joins the block at the release's position between the button group and the card".
8. The scoped runs `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/nav.test.ts` and `npx vitest run --config configs/app/vite.browser.config.ts --no-cache --reporter=dot tests/app/browser/sections/NavSection.test.ts tests/app/browser/sections/CardSection.test.ts` exit 0 in the validation copy after `npm run build:src`.
9. On the validation copy: `npm run test:guides`, `npm run test:policy`, `npm run test:setup`, and `npm run test:conformance` exit 0, recorded with their result lines.
10. The report carries each item of § Output.

**Observations, not criteria.** The four journey variants (`light-390`, `light-1280`, `dark-390`, `dark-1280`) run in the validation copy after the final sync with round 1's `journey.sh` adapted to it; record each result line. The authoritative journey and `CAPTURE=1` are the Orchestrator's at landing.

## Review evidence

`tmp/units/nv-shared-2.patch`; `git -C /home/user/veneer-nv diff 87ff1d0` plus `git diff --no-index /dev/null <path>` per untracked owned file, concatenated as `tmp/units/nv-2.diff`; `git -C /home/user/veneer-nv status --porcelain` as `tmp/units/nv-2-status.txt`; the report; the instrument directory.
