# Roughnotes unit R-A — audit claims

## Subject

Unit R-A (`opus`, Opus 5) in the roughnotes checkout `C:/Users/mikes/WebstormProjects/roughnotes`,
branch `main`, baseline `85d1baa` (the scaffold 0.0.74 visit), checkpoint `86a9ef6`. One round; the
unit ran inside a workflow with a `checker` (`CHECK: PASS`) and a `verifier` (`GATES: RED` on the
standing `format:check` condition alone) over its uncommitted tree; their readings are in
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/r-a-workflow-results.md`.

What it claimed to close: the two repairs the scaffold campaign's design verdict (D26) assigned to
the application — the compact menu trigger announces `aria-expanded`, and a listing entry, the
footer, and a screen's own action each answer to a name no other reachable control on that screen
shares (scaffold `ROADMAP.md` rows 34 and 37). The diff is at `.orkestrel/campaign/r-a-diff.patch`; the
report at `.orkestrel/campaign/r-a-report.md`; the brief at `.orkestrel/campaign/r-a-brief.md`.

## What the round decides

Whether unit R-B (the test-layer adoption) builds on this tree: R-B replaces the hand-rolled menu
settle with `waitForState` on the state R-A authored and resolves every journey target by the names
R-A settled. A wrong state or a wrong name here is inherited by every journey.

## Already established — verified by the Orchestrator directly, not taken from the writer

- The Orchestrator's gate reading over the visit baseline (`.orkestrel/campaign/visit/visit-gates-summary.txt`
  in the scaffold checkout): app:browser 159, journey 76 | 4 skipped, policy 109 | 1 skipped,
  config 171 | 3 skipped, setup 3, conformance red on the base `optimizeDeps` list (R-B's),
  `format:check` red on `vite.config.ts` alone (scaffold finding V1, fixed in scaffold at
  `178c7cbb` for 0.0.75).
- The verifier's reading over R-A's tree: app:browser 162, journey 76 | 4 skipped, lint, check,
  policy, config green; the same single `format:check` red.
- The checker's seven criteria MET, including that every announced name resolves to an existing
  `COPY` value and that the diff touches only owned files.
- The three guide patches the unit returned were applied verbatim by the Orchestrator to
  `guides/README.md` before the checkpoint.

## Review evidence

- The diff `85d1baa..86a9ef6`: `.orkestrel/campaign/r-a-diff.patch`; `git status --short` at the tip:
  the tip is clean.
- The report, the brief, the workflow results (paths under Subject and Already established).
- The product guide `guides/README.md`; the installed layer under `node_modules/@orkestrel/test/dist/`;
  the skill at `C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-prove-journey/`.

## Numbered claims — attempt to refute each

1. **The announced state is true at every frame a settle can read.** `App.vue` binds
   `:aria-expanded="opened"` on the trigger and flips `opened` on `shown.bs.offcanvas` and
   `hidden.bs.offcanvas`. Attack: the frames between the click and `shown` (the attribute still
   reads `false` while the menu is animating open — does a `waitForState('Menu', 'expanded')`
   settle after the open, and does a journey that reads the menu's contents before the state
   flips race?); the `hide` path when `location` changes (the shell hides the dialog on
   navigation — is `hidden.bs.offcanvas` fired and the ref reset?); a second open after a
   navigation-triggered hide; the wide viewport where the trigger is not rendered.
2. **The measurement is the one the brief asked for.** Bootstrap 5.3.8 writes no `aria-expanded`
   on an offcanvas trigger: the source grep and the runtime reading (`before states [] attribute
   null | after states [] attribute null`, taken with the binding removed and `#site-menu`
   carrying `show`). Attack: the runtime reading's `after` frame — was the menu open by
   Bootstrap's own account (`shown.bs.offcanvas` fired), or only class-painted?
3. **The naming rule is one rule and the product's vocabulary.** "The shell announces the region
   carrying each of its destinations; the screen's own control keeps the bare label", composed by
   `buildName(label, region)` with the visible label leading. Attack: a name whose region word is
   not in the product guide's vocabulary; a composed name that a screen reader reads as one
   phrase in a way the guide's stated form (`Label, Region`) contradicts; Label in Name — every
   composed name begins with the visible text; a control whose visible label is an icon (the
   theme toggle, the menu trigger) — unchanged and unambiguous?
4. **The exception is measured, not assumed.** The compact menu's `Get started` announces `Menu`
   (not `Site`) because at 390 the compact masthead keeps its own action visible beside the open
   menu, so both are reachable; the menu's destinations replace the masthead's and keep `Site`.
   Attack: is the covered masthead control reachable to a person, or only to `isReachable`
   (which does not model `aria-modal`)? If a screen reader honouring `aria-modal` never reaches
   the covered control, the two-name split may be the wrong product repair and the right one is
   `inert` on the shell while the dialog is open. Rule on it, and name the consequence for R-B
   either way.
5. **The census covers what it claims.** The collision test walks every route the product guide's
   data-state table names, at 1280×800 and 390×844, and the compact width with the menu open,
   over `FOCUSABLE_SELECTOR` filtered by `isReachable`, and reports every `ambiguous` refusal.
   Attack: a data state a bare landing does not reach (a refused form, a filtered listing, an
   accepted subscription) where two controls share a name; a control outside `FOCUSABLE_SELECTOR`
   that a journey targets by role and name (a `region`, a `heading` with a name); a route the
   guide names that `ROUTES` omits.
6. **No journey lost coverage.** The four `clickAccessibleWithin` sites were replaced by bare-name
   resolution, and the assertion that pinned `RoughNotes-Pro` as ambiguous now asserts
   `readRefusal` returns `undefined`. Attack: a journey that now resolves a different element
   than before (the bare name resolving the shell's control rather than the screen's, or the
   reverse), read from the diff; a refusal assertion that lost its exact voice.
7. **The guide is true and one home.** The three applied patches state the announced names, the
   trigger's `aria-expanded`, and the `ShellGroup` title from `COPY`, and each sentence names
   behaviour the markup has. Attack: a sentence claiming more than the diff does ("every link in
   the cluster announces it" — does every link?); a name the guide states that the markup spells
   differently.
8. **The controls bind.** R-A-C1's red (the binding removed → `expected [] to include
   'collapsed'`) and R-A-C2's red (154 rows) each name the defect and turn green on the repair
   alone. Attack: a mutation that leaves both green — the binding present but never flipped
   (`opened` never set true), a `buildName` that returns the label alone for one region.
9. **Least-certain claims, ruled.** The report flags `isReachable` not modelling `aria-modal`, the
   two-width census, `followRoute` landing by writing `window.location.hash`, `buildName` proven
   through the surface rather than in `helpers.test.ts`, and the host-bound 154. Rule on each:
   which is a defect R-B or a successor must carry, and which is a bound to record.
10. **Would you ship the interface?** A person using a screen reader at 390 opens the menu, hears
    the trigger's state, and reaches `Get started, Menu`; a person at 1280 reaches
    `Products, Site` in the masthead and `RoughNotes-Pro` in the listing. Name the first announced
    name or state that misleads either person.

## Unknowns

- The audit lanes hold no write tool and a read-only sandbox; a browser run is UNRESOLVED with the
  exact command and the Orchestrator takes it.
- Whether `aria-modal` on the open offcanvas makes the covered masthead unreachable to assistive
  technology on this host is a reading only a screen reader or an accessibility-tree dump can
  settle; name the command that would (Playwright's `page.accessibility.snapshot()` through a probe
  test, or Chromium's accessibility tree) and the Orchestrator runs it.

## The threshold

A finding is worth more than a clean pass: R-B builds every journey on these names and this state.
CONFIRMED requires naming the attack you tried that failed. A claim you cannot decide is
UNRESOLVED, not CONFIRMED — say what would settle it. Do not hedge toward an imagined consensus.
