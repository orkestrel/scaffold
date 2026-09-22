# Design brief — B-FORMS, the forms family as a Bootstrap 5.3.8 baseline

## Role and lane

This brief reaches two blind lanes on the same text: `planner` on Opus (subjective: shape, naming,
ergonomics, the feel the family must present) and `analyst` on GPT-6 Astra through
`codex exec --sandbox read-only` rooted at `/home/user/veneer` (objective: correctness, constraints,
what the code and contracts permit). Say which lane you hold. Perform the design directly, spawn
nothing, edit nothing. You are read-only.

## Objective

Propose the unit plan for B-FORMS: how the keys `form`, `form-control`, `form-select`, `form-check`,
`form-range`, `form-floating`, `input-group`, `was-validated`, `valid-feedback`, `invalid-feedback`,
`valid-tooltip`, `invalid-tooltip`, `is-valid`, `is-invalid` land in Veneer as a Bootstrap 5.3.8
baseline under the accounting gates, split into units that can run in parallel worktrees with
disjoint owned files, each with its acceptance criteria and risks.

## Context

**Terrain (the measurements; this brief restates none).**
`/home/user/scaffold/tmp/units/b-forms-terrain-report.md`: § A the oracle surface per key with
`file:line` into `tests/fixtures/oracle/inventory.json` and `node_modules/bootstrap/scss/forms/`,
including every embedded SVG data URI and every pseudo the release styles; § B how a shipped key is
wired today (partial, layer, proof, showcase section and constants, guide rows, ledger rows,
conformance list); § C what already ships (no forms class; the tokens the theme mixin already
emits, the dark caret and switch images already on `[data-bs-theme='dark']`, and the element rules
the `elements` layer already carries that a component partial must not restate); § D what Elements
and Mailbox render or prove for the same controls and how they handle the icons; § E per-key
selector and declaration counts and the release's own file split. Where this brief and the terrain
disagree, the terrain and the tree win.

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/styles.md`, `tests.md`,
`names.md`, `architecture.md`, `documentation.md`, `browser.md`, `application.md`, `writing.md`.
Guide: `/home/user/veneer/guides/veneer.md`. Plan of record: `/home/user/veneer/ROADMAP.md`
(§ Tenets, § Rulings D2 to D13, § Phases and units row B-FORMS, § The family queue). The B-PASSIVE
family's settled rulings apply here where the mechanism is the same:
`/home/user/scaffold/.orkestrel/veneer/units/b-passive-family.md` (rulings 1 to 14) with the
baseline addendum `/home/user/scaffold/.orkestrel/veneer/units/b-passive-baseline.md` (the ledger's
home and shapes, the reference-map rule, the capture grammar); argue only where forms differ.

**Rulings that bind the design.** D2 and D6: Bootstrap's set exactly, Bootstrap wins on a
conflict; D5: no right-to-left support; D7: no aliasing, no compatibility shim; every departure from
the oracle is a row in the ledger, never a second name; the tokenizing ceiling (family ruling 4):
route a value onto a `--vn-*` token only where that token already exists.

**The accounting and capture contracts** are the landed ones the addendum names:
`collectLedger`, `readDepartures` and `readAdditions` over `guides/ledger/`, the conformance gates,
the capture grammar types in `tests/setup.ts`, `FrameManager.place` and `page`, and
`describeSubject`.

**Host.** Linux, bash, Node 22, npm 11 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`);
Chromium 141 at `/opt/pw-browsers`. The analyst's sandbox denies the loopback listener, so it runs no
browser project.

## Questions the lanes answer

1. **The split.** Which units, each with disjoint owned files, and in what dependency order? The
   Orchestrator's working split follows the release's own files: text controls (`form-control`,
   the labels and form-text rows of `form`, plaintext, sizes, the color and file inputs); selects
   (`form-select`); checks and switches (`form-check`, inline, reverse, the switch, the `btn-check`
   rows already shipped with buttons); range (`form-range`); floating labels (`form-floating`);
   input groups (`input-group`); validation (`was-validated`, `is-valid`, `is-invalid`, the
   feedback and tooltip keys), which reaches into every other key's selectors and therefore either
   runs last over the integrated tree or owns the validation rows of every control from the start.
   Attack or confirm it, by mechanism and by the shared-file contention § B shows, and rule where the
   195-selector `form` key's rows go (they are the labels, form-text, plaintext, and size rows the
   release spreads over its files).
2. **Naming.** The partial per key (`_form-control.scss`, `_form-select.scss`, `_form-check.scss`,
   `_form-range.scss`, `_form-floating.scss`, `_input-group.scss`, `_validation.scss`, and where the
   labels and form-text rows sit), the mirrored proof names, the `@use` aliases, the showcase section
   names and specimen constants, under `names.md` and the mirror rule.
3. **The icons.** The check, radio, switch, select caret, and validation SVG data URIs: which are
   already tokens (§ C), how a partial reads each, where a URI's colour comes from, how dark mode
   changes it, and whether an escaped-SVG idiom exists in `_mixins.scss` or is refused under the
   tokenizing ceiling.
4. **The elements layer.** What the component partials must not restate (§ C), what `[type=range]`
   needs that no elements rule gives, and how `::placeholder`, `::file-selector-button`, and the
   `-webkit-`/`-moz-` pseudos are proved.
5. **The showcase.** One section per unit or per key; the specimens each key needs so that every
   selector the inventory records is exercised by a proof and rendered by a specimen at least once,
   including `:focus`, `:disabled`, `[readonly]`, `:checked`, `:indeterminate`, and each validation
   state; which are driven-state capture scenarios under the grammar (`focus`, `checked`, and the
   states the `CaptureState` union must gain).
6. **The deferred rows.** Which § Deferred selectors rows each unit retires (owner `Forms`), which
   stay deferred to another family (the `input-group` dropdown and button combinators owned by
   `Disclosure`, any owner `Overlays` rows), and how a unit records a selector it ships that the
   deferral table still names.
7. **Departures and additions.** From § D, which Elements and Mailbox behaviours are additions worth
   a row and which are refused under D2; rule each candidate.
8. **Proof shape.** What each proof reads through the installed cascade readers (background-image
   equality for a data URI, `appearance`, the focus ring's `--bs-focus-ring-*` shadow, validation
   colours per `[data-bs-theme]`, transitions under `prefers-reduced-motion`) so that it fails on a
   wrong value and not only on a missing selector; which `@orkestrel/test` exports serve (name them
   from `/home/user/veneer/node_modules/@orkestrel/test/dist/src/browser/index.d.ts`).
9. **Risks.** What a unit is likeliest to get wrong, and the acceptance criterion that would catch it.

## Output

A proposal, not a decision: for each question, the ruling you argue for and the evidence behind it
(`file:line`), then a unit table (unit, keys, owned files, shared files, depends on, acceptance
criteria, risks), and one terminal line `PROPOSAL: <one sentence>`. Cite the terrain by its section
and the tree by `file:line`. No process diary.
