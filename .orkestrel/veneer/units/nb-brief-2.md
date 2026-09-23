# Unit NAVBAR (`nb`) — round 2, the fix round

Supersedes `b-collapse-nb-brief.md` for this round; that brief stays in place unedited. This brief carries every finding `nb-audit-verdict.md` § Reconciliation names, each from the lane verdicts beside it (`nb-audit-objective-verdict.md`, `nb-audit-subjective-verdict.md`, `nb-audit-checker-verdict.md`).

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, the sole writer in the worktree `/home/user/veneer-nb` (branch `unit/nb`, the round-1 writes uncommitted over `a658879`). The executor that opens this brief is that subagent.

## Objective

Every finding of round 1 is closed in the owned files and in revised patches `tmp/units/nb-shared-2.patch`, `tmp/units/nb-offlimits-2.patch`, and `tmp/units/nb-retirement-2.patch` (each a unified diff with an `index` line per file, the shared and off-limits patches against `a658879`, the retirement patch against the simulated post-ACCORDION state as round 1 wrote it, each superseding its round-1 patch whole), with every proof still distinguishing its mutation and every gate green on the stage.

## Context

Everything in `b-collapse-nb-brief.md` § Context binds unchanged. The round-1 report is `/home/user/scaffold/.orkestrel/veneer/units/b-collapse-nb-report.md`; the round-1 instruments are under `/home/user/scaffold/.orkestrel/veneer/units/nb-instruments/` and the worktree's `tmp/units/`. The stage is rebuilt the way the round-1 report describes (the worktree with the shared and off-limits patches applied, at `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/nb/stage`, or a copy under the worktree's `tmp/probe/`), and the retirement copy the same way. Run `export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"` first in every shell. Write this round's report file; if a write under `tmp/units/` is refused, write it under `tmp/probe/` and name the path in the final message.

## Findings to close

1. **The retained readings (claims 2, 3, 5).** Retain under `tmp/units/nb-instruments-2/logs/`: the built-output reading (`grep -c navbar-light dist/src/styles/index.css` reading 0 and a grep listing each `@media (width>=Npx){.navbar-expand-*` block) as `built-cascade.log.txt`; the theme case run against the `a658879` case on the stage cascade (red) and the rewritten case (green) as `theme-red-green.log.txt`; the retirement asset case red with an accordion icon declared in the retirement copy's dark scope and green without, as `retirement-asset.log.txt`; the journey runs on `journey:light-390` and `journey:dark-1280` on the stage (the census case red until ACCORDION lands, recorded as such) and the stage-only probe partial run that turns the census green, as `journey-<variant>.log.txt` and `census-probe.log.txt`, the probe deleted and `index.scss` restored by digest afterwards.
2. **The class specimen's surface (claim 4).** In `NAVBAR_SPECIMENS`, the `Navbar inverted class` bar carries `data-bs-theme="light"` (`<nav class="navbar navbar-dark" data-bs-theme="light" …>`) inside its dark card, so the class paints the white text over the card's dark surface; the `Navbar inverted` bar keeps its own dark attribute and its card. `NavbarSection.test.ts` asserts the light attribute on the class bar. The `NAVBAR_SPECIMENS` doc block and the guide's region sentence (`### Navbar classes`) state why: the card's dark scope alone paints a plain bar's brand white, so the class bar sets its own scheme to light to show the class's paint. Record the settling run: the class specimen with the `.navbar-dark,` selector line removed from the partial reads the brand near-black; with it, white (`class-surface.log.txt`).
3. **The copy (claim 4).** `NAVBAR_COPY.paragraph`: "each state set as a class in markup" becomes "each state set in markup".
4. **The guide nouns and sentences (claim 7).** In `### Navbar classes`: "answer to the `--vn-factor-density` factor", "read the `--vn-size-5` token", "mixes over the `--vn-palette-white-base` token"; the literal-inset sentence becomes two: "The brand's `0.3125rem` block inset keeps the release's literal, because no scale token resolves to it. The toggler's `0.25rem` focus width keeps the release's literal too, because the published focus width is a narrower ring." In the retained-variables pair: "retunes the `--bs-accordion-btn-icon` and `--bs-accordion-btn-active-icon` properties under" and "The `--bs-form-select-bg-img`, `--bs-form-switch-bg`, and `--bs-navbar-toggler-icon-bg` properties are declared". The § Dropdown classes sentence: "the tab and navbar menu names ship from the nav and navbar partials" (the `.nav-tabs .dropdown-menu` name ships from the nav partial). Sweep every sentence the patch adds for a bare token.
5. **The comments (claim 8).** `_navbar.scss` around line 71: "A link carrying the `show` class paints as the current link." The `NAVBAR_SPECIMENS` doc block and the `tests/setupStyles.ts` comment: "carry the `show` class". The `nav-list` mixin comment in `nb-offlimits.patch`: "its own inline inset, link colors, and flex flow". The `tests/setupStyles.ts` doc comments' "once each" and "twice": name the unconditional and reduced-motion occurrences.
6. **The dark-spelling matrix (INLINE-CASE-TABLES).** The case matrix declared inline in `navbar.test.ts` around line 399 (the `.navbar-dark` class row and the `.navbar[data-bs-theme=dark]` attribute row) moves to `tests/setupStyles.ts` as `NAVBAR_DARK_SPELLING_CASES`, frozen at every level and documented, added to the import list, the export-list case, and the freeze assertions in `tests/setupStyles.test.ts`, and imported by the proof.
7. **The report (claim 8, REPORT-COUNTS).** This round's report states no count of a growable set (no "two changes", "one exception", "both lists", "both variants", "both dark spellings", file lengths, or "once"; name the members), names no list item by its position, drops the "disjoint" claim about the expand classes (the identical declarations justify the order), states the `build:src` row's reading with its retained log, records every deviation with expected, found, evidence, and done or not done (D6, D7, and D8 included), and bounds the card choice (the cost claim 4 names) and the dropdown cell change (the correction that makes the cell true, not housekeeping).

## Unknowns

None.

## Scope

As `b-collapse-nb-brief.md` § Scope: the same owned files; the same shared files, report-only, returned as `tmp/units/nb-shared-2.patch` with index lines; `src/styles/_mixins.scss` and `src/styles/components/_nav.scss` report-only, returned as `tmp/units/nb-offlimits-2.patch`; the retirement returned as `tmp/units/nb-retirement-2.patch`; the same off-limits files otherwise. No commit, push, install, `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint --fix`; scoped runs only; the stage and the retirement copy are deleted before the report.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

A report at `/home/user/veneer-nb/tmp/units/nb-report-2.md` with: each finding's site, before, and after; the retained readings with their logs; the proof matrix unchanged where the assertions did not move and re-executed for the moved dark-spelling rows and the class specimen; the scoped gate exits with their commands on the stage (`format:check`, `lint:check`, `check`, `build:src`, the styles proofs over `navbar.test.ts`, `theme.test.ts`, and `container.test.ts`, the section proof under `--project app:browser`, the setup-project run over `tests/setupStyles.test.ts`, `test:conformance`, `test:guides`, `test:policy`, `test:app`) and on the retirement copy; the exact patches; every deviation; and a closing list of what the unit could not close. Delivered as that file plus the same text as the final message.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Decide, record, and carry on from a log's name, a TSDoc sentence, and a case title; stop on a proof whose reading changes when its rows move, on the class specimen reading white without the rule after the attribute change, and on a disagreement between this brief, the round-1 brief, and the tree.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0 on the stage.
2. The styles proofs over `navbar.test.ts`, `theme.test.ts`, and `container.test.ts` exit 0 with the round-1 case titles, and every mutation the round-1 table names still reddens its case (the dark-class mutation against the moved rows re-run and logged).
3. The section proof exits 0 under `--project app:browser`, asserts the class bar's light attribute, and reddens when the class bar drops `navbar-dark`; `class-surface.log.txt` reads the brand near-black without the `.navbar-dark` rule and white with it.
4. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts` exits 0 on the stage and on the retirement copy, and unfreezing or reordering the moved table reddens its case (logged).
5. `test:conformance`, `test:guides`, `test:policy`, and `test:app` exit 0 on the stage; `test:conformance` exits 0 on the retirement copy.
6. The report carries every item of § Findings to close with its site, before, and after, and each patch applies with `git apply --check` to its base.

## Review evidence

`git -C /home/user/veneer-nb status --porcelain` and the owned files' diffs, captured by the Orchestrator at hand-back as `nb-2.diff` and `nb-2-status.txt`, plus the report and the patches.
