# NAVBAR landing (`nb` on the session branch over the UTIL-PLACEMENT landing `5fb8b41`) — landing check

## Role and engine

`checker` on Sonnet, a native Claude subagent, read-only (Read, Grep, Glob). It writes nothing and runs nothing.

## Objective

Rule, claim by claim, whether the NAVBAR commit on the Veneer session branch carries the unit's owned files, its shared, off-limits, and retirement patches, the Orchestrator's rulings on the collisions with the TOGGLES and ACCORDION landings, and nothing else.

## Context

**Subject.** The Veneer checkout `/home/user/veneer` at the commit `nb-landing.commits` names (read the live source, tests, and guide; never `tmp/`, `dist/`, or `node_modules/`; a gate run is in flight there).

**Evidence, all under `/home/user/scaffold/.orkestrel/veneer/units/`.** `nb-landing.diff` (`git diff <base> HEAD`, the base named in `nb-landing.commits`), `nb-landing.stat`, `nb-landing-message.txt`; the unit's return `nb-4.diff` (the owned files against the base `a658879`), `nb-4-status.txt`, `nb-shared-4.patch`, `nb-offlimits-4.patch`, `nb-retirement-4.patch`; the resolution instruments `nb-resolve.py` (the rulings, each keyed by the first line of the block it rules), `table-merge3.py` (the deferral table keyed by its Name cell), `land-seams.py`, `land-conflict-map.py`, and the probe records `nb-landing-probe-3.sh` and `nb-landing-probe-3.txt` (the procedure at the UTIL-PLACEMENT tip) with the landing script `nb-land.sh` and its output `nb-land.txt`; the reconciliation `nb-audit-4-verdict.md` and the round verdicts before it; the design verdict `/home/user/scaffold/.orkestrel/veneer/b-collapse-design-verdict.md`.

**Law.** `AGENTS.md` § Writing; `.claude/rules/writing.md`. Skill: none.

**Standing conditions.** The unit's owned files are new files plus one edit of `tests/src/styles/theme.test.ts`; their cherry-pick onto the tip is recorded in `nb-landing.commits`. The three-way apply of the round-4 shared and off-limits patches met the conflicts `nb-land.txt` maps. `nb-resolve.py` ruled the collisions: the guide's § Dropdown classes sentence says the split toggle ships from its partials and the tab and navbar menus from the nav and navbar partials, and § Input group classes and § Button group classes describe the split-toggle partials; the dropdown ledger cell loses its "less the … names recorded under § Styles" clause; the asset paragraph keeps the tip's carousel paragraph, drops the "Bootstrap also retunes" paragraph, and lists `--bs-form-select-bg-img`, `--bs-form-switch-bg`, `--bs-accordion-btn-icon`, `--bs-accordion-btn-active-icon`, and `--bs-navbar-toggler-icon-bg` as declared on their own dark rules; the token map's comments name the forms glyphs, the accordion chevrons, and the navbar toggler icon, and the caret, knob, chevrons, and toggler icon as `$dark` entries; the `$assets` map's entries empty; the conformance comment names the nav and navbar partials then the accordion partial; the glyph-map comment names the form controls, the accordion button, and the navbar toggler's light icon. Every other table block is the landed rows then the patch's rows; the guide's file table and deferral table were rebuilt three-way from `a658879` (`nb-land.txt`: the file table gains the `_navbar.scss` row after its predecessor with no row deleted, and the deferral table loses the patch's navbar rows with no row added). The retirement patch applied plain after the resolution (its base is the simulated post-ACCORDION state), deleting `@use 'sass:map'` and the `$assets` walk from `src/styles/_theme.scss`, the `$assets` block from `src/styles/_tokens.scss`, the undeclared-key case from `tests/setupStyles.test.ts`, and rewriting the theme proof's asset case. `land-seams.py` and `sort-inventories.py` ran after; the formatter re-padded the tables. `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored and must be absent from the diff.

## Unknowns

None.

## Scope

Read-only over the evidence files and the Veneer source, tests, and guide. No edit, no command.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Claims

1. **Delta and scope.** The set of files `nb-landing.diff` touches equals the union of the owned files in `nb-4-status.txt` and the files the shared, off-limits, and retirement patches touch; neither vendored file appears; no file outside that union changes.
2. **The owned files.** Each owned file's content at HEAD equals the base `a658879` content with `nb-4.diff` applied, except `tests/src/styles/theme.test.ts`, whose asset case reads as `nb-retirement-4.patch` rewrites it.
3. **The rulings.** Each ruled site reads as the standing conditions state it: the guide's § Dropdown classes sentence, the dropdown ledger cell, the asset paragraphs (no "Bootstrap also retunes" paragraph remains), the two token-map comments, the conformance comment, and the glyph-map comment; `src/styles/_tokens.scss` carries no `$assets` map and `src/styles/_theme.scss` no `$assets` walk and no `sass:map` use; `tests/setupStyles.test.ts` carries no undeclared-key case; the `$icons` map carries the accordion chevrons and the toggler icon.
4. **The tables and the registry.** The deferral table carries none of the navbar names the patch deletes (the `.navbar-nav .dropdown-menu`, `.navbar-expand-* .navbar-nav .dropdown-menu`, `.navbar-nav .nav-link.active`, `.navbar-nav .nav-link.show`, and `.navbar-expand-* .navbar-nav .nav-link` rows), carries every other row the tip carried in the tip's order, and its header appears once; the obligation ledger carries the navbar rows after the tip's last landed rows; in `tests/setup.ts` the `CaptureSubject` union carries every navbar subject after the landed members, the navbar resting rows follow the last landed resting row with each `Object.freeze({` opener present, and the driven rows follow the last landed driven row; the sorted inventories in `tests/conformance.test.ts` and `tests/setupServer.test.ts` carry `navbar` in sorted order.
5. **Every other shared hunk.** `app/browser/Showcase.ts` constructs `NavbarSection` and `app/browser/index.ts` exports it after the last landed section; `app/browser/constants.ts`, `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, `tests/app/browser/integration.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/setupServer.test.ts`, `src/styles/index.scss`, `src/styles/_mixins.scss`, `src/styles/components/_nav.scss`, and `ROADMAP.md` carry the patches' hunks byte for byte apart from the formatter's re-padding and the ruled sites.
6. **Prose law.** The landing message carries no term the substitution table in `.claude/rules/writing.md` bans unconditionally and no count of a growable set; list every hit with its ruling and name the pattern and paths you swept.

## Output

Return, as the final message, one verdict per claim (`CONFIRMED`, `BROKEN`, `UNRESOLVED`, or `NOT-EVIDENCED`) with `file:line` evidence, findings outside the claims, and the single terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. No process diary; rule every population whole rather than sampling it; state no count of a growable set.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Where an evidence file is missing or a claim's site cannot be located, rule the claim `NOT-EVIDENCED` and name what is missing rather than stopping.

## Acceptance criteria

A verdict on every claim with evidence and the terminal line.

## Review evidence

The diff and status evidence named under Context.
