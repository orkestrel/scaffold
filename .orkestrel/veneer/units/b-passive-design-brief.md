# Design brief — B-PASSIVE, the passive component family as a Bootstrap 5.3.8 baseline

## Role and lane

This brief reaches two blind lanes on the same text: `planner` on Opus (subjective: shape, naming,
ergonomics, the feel the family must present) and `analyst` on GPT-6 Astra through
`codex exec --sandbox read-only` rooted at `/home/user/veneer` (objective: correctness, constraints,
what the code and contracts permit). Say which lane you hold. Perform the design directly, spawn
nothing, edit nothing. You are read-only.

## Objective

Propose the unit plan for B-PASSIVE: how the keys `btn-close`, `badge`, `breadcrumb`, `btn-group`,
`btn-toolbar`, `card`, `list-group`, `pagination`, `placeholder`, `progress`, `spinner` land in Veneer
as a Bootstrap 5.3.8 baseline under the accounting gates, split into units that can run in parallel
worktrees with disjoint owned files, each with its acceptance criteria and risks.

## Context

**Terrain (the measurements; this brief restates none).**
`/home/user/scaffold/tmp/units/b-passive-terrain-report.md`: § A the oracle surface per key with
`file:line` into `tests/fixtures/oracle/inventory.json` and `node_modules/bootstrap/scss/`; § B how a
shipped key is wired today (partial, layer, proof, showcase section and constants, guide rows,
conformance list, deferred rows); § C what already ships; § D what Elements and Mailbox render or
prove for the same components; § E per-key selector and declaration counts. Where this brief and
the terrain disagree, the terrain and the tree win.

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/styles.md`, `tests.md`,
`names.md`, `architecture.md`, `documentation.md`, `browser.md`, `application.md`, `writing.md`.
Guide: `/home/user/veneer/guides/veneer.md`. Plan of record: `/home/user/veneer/ROADMAP.md`
(§ Tenets, § Rulings D2 to D13, § Phases and units row B-PASSIVE, § The family queue).

**Rulings that bind the design.** D2 and D6: Bootstrap's set exactly, Bootstrap wins on a
conflict; D5: no right-to-left support (the inventory's `rtl` rows are excluded, and no `/* rtl:ignore */`
comment ships); D7: no aliasing, no compatibility shim; every departure from the oracle is a row in
the guide's ledger, never a second name. Everything the built cascade emits for a shipped key must
match the inventory's selectors, declarations, custom properties, keyframes, and conditions, or carry
a departure or addition row.

**The accounting contract the units land under.** Unit F5b ACCOUNTING-LEDGER (running in a
worktree, `/home/user/scaffold/.orkestrel/veneer/units/f5b-brief.md`) gives the guide `### Departures`
and `### Additions` tables read by `readDepartures` and `readAdditions`, the comparison
`collectDepartures` over the unminified compile, and conformance gates that redden on an unrecorded
difference, an unrecorded extra name, a stale departure row, a stale addition row, and a stale
deferral row. `collectShippedComponents` and `scanCompatibilityPresence` in `tests/setupServer.ts`
require a shipped selector row and variable row in § Compatibility per key and refuse a deferred name
that ships. The conformance shipped list literal in `tests/conformance.test.ts` names each key.

**The capture contract.** Unit F7 CAPTURE (running) fixes the frame grammar
`<scenario>--<theme>-<viewport>[-<step>]`, whole-specimen frames with background, one accessibility
artifact per specimen and variant, and the helper-key subject contract (every registry key names its
subject region). A B unit registers its specimens under that grammar.

**Host.** Linux, bash, Node 22, npm 11 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`);
Chromium 141 at `/opt/pw-browsers`. The analyst's sandbox denies the loopback listener, so it runs no
browser project.

## Questions the lanes answer

1. **The split.** Which units, each with disjoint owned files, and in what dependency order? The
   Orchestrator's working split is: `badge` + `breadcrumb` + `btn-close`; `btn-group` + `btn-toolbar`
   (which absorbs the `.btn-group-sm > .btn` and `.btn-group-lg > .btn` twins already in
   `_button.scss`); `card` + `list-group` (they share combinators); `pagination`; `progress` +
   `spinner` + `placeholder` (keyframes and reduced motion). Attack or confirm it, by mechanism and by
   the shared-file contention the terrain § B shows (`src/styles/index.scss`, `guides/veneer.md`
   tables, `tests/conformance.test.ts`, `app/browser/Showcase.ts`, `app/browser/constants.ts`,
   `app/browser/index.ts`, the capture registry).
2. **Naming.** The partial per key (`_badge.scss`, `_close.scss` or `_btn-close.scss`, `_breadcrumb.scss`,
   `_button-group.scss` or `_btn-group.scss`, `_card.scss`, `_list-group.scss`, `_pagination.scss`,
   `_placeholder.scss`, `_progress.scss` beside the elements-layer `_progress.scss`, `_spinner.scss`),
   the mirrored proof name, the `@use` alias in `index.scss`, and the showcase section names and
   specimen constants, under `names.md` and the mirror rule the policy sweep enforces (one proof at
   the same relative path per partial).
3. **The showcase.** One section per unit or per key; the specimens each key needs so that every
   selector the inventory records is exercised at least once by a proof and captured at least once;
   which specimens are whole-specimen frames.
4. **The elements layer.** `progress` already has an elements-layer rule (`src/styles/elements/_progress.scss`);
   how the class-level `.progress` partial and the bare-element rule coexist under the layer order,
   and whether any other key needs a bare-element rule.
5. **The deferred rows.** Which § Deferred selectors rows each unit retires (owner `Passive`), which
   stay deferred to another family (`.btn-toolbar .input-group` owner `Forms`; the split-toggle
   selectors owner `Disclosure`; the alert, toast, modal, and offcanvas close combinators owner
   `Overlays`), and how a unit records a selector it ships that the deferral table still names.
6. **Departures and additions.** From the terrain § D, which Mailbox behaviours are additions worth
   a row (for example `.btn-close-white` handling, container queries on `.card`) and which are
   refused under D2; the ruling is Bootstrap's set exactly, so name each candidate and rule it.
7. **Proof shape.** What each proof must read through the installed cascade readers (resolved
   geometry, paint, transition and animation under `prefers-reduced-motion`, theme colours per
   `[data-bs-theme]`) so that the proof fails on a wrong value and not only on a missing selector;
   which `@orkestrel/test` exports serve (name them from
   `/home/user/veneer/node_modules/@orkestrel/test/dist/src/browser/index.d.ts`).
8. **Risks.** What a unit is likeliest to get wrong, and the acceptance criterion that would catch it.

## Output

A proposal, not a decision: for each question, the ruling you argue for and the evidence behind it
(`file:line`), then a unit table (unit, keys, owned files, shared files, depends on, acceptance
criteria, risks), and one terminal line `PROPOSAL: <one sentence>`. Cite the terrain by its section
and the tree by `file:line`. No process diary.
