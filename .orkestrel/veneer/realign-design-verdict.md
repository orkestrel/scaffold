# Realignment design verdict (2026-09-22)

The Orchestrator's reconciliation of the realignment design round. Brief:
`units/realign-design-brief.md`. Lanes, blind to each other on that one brief: `planner` on Opus 5
(native, subjective; `units/realign-design-planner-report.md`) and `analyst` on GPT-6 Astra
(`codex exec` read-only rooted at scaffold, objective, thread `01a0c93f-b663-78e3-8eec-271d2b9a35f1`;
`units/realign-design-analyst-report.md`). Evidence the lanes read: the G1, G2, and G3 Grok 4.7
distillates, the Orchestrator's baseline readings and probes under `units/`, and the tree.

## Rulings the user gave during the round

- Codex bench lanes run on `gpt-6-astra`, never Sol; Cursor lanes on Grok 4.7 (`grok-4.7-high`).
- Veneer is first a Bootstrap baseline: pin what Bootstrap has, track every addition, change, and
  removal so everything stays accounted for, and account for every token, element, component, and
  utility in `src` and `tests`; the Elements and Mailbox lessons build on that baseline afterwards.

That second ruling settles the round's largest tension (value accounting as a blocking foundation
unit) and orders the phases: foundation, then the Bootstrap baseline over the whole recorded
surface, then the build-on work.

## Rulings on the fourteen questions

1. **Plan shape: replace.** Both lanes: replace the diary-shaped plan. The executable plan becomes
   `ROADMAP.md` in the Veneer checkout (the analyst's location: the retention procedure keeps a
   `ROADMAP.md` and dissolves orientation documents; the plan then survives the campaign prune
   beside the implementation). It carries the tenets verbatim, the standing rulings, the exit
   criterion, the phase and family queue with each family's keys, the carrier register, and the
   open decisions, under about 400 lines. `.orkestrel/veneer/plan.md` becomes a short bridge to it
   and `handoff.md` is deleted; the diary lives in git history. No status a run recomputes is
   written into the plan.
2. **Self-containment first.** Both lanes: Test `0.0.19` publishes, Veneer re-pins, and a clean
   `npm ci` reproduces every proof before any family opens. The tolerance repair, the lockfile
   repair, and the bump are landed on the Test session branch (`774ba14`); the publish is the
   user's one-time code. The forced-colours axis is not in this release: it is a feature unit and
   the release exists to make Veneer installable; it carries to the next Test release.
3. **Host-varying assertions: one rule, one recorder.** Both lanes: observe an event's `target`
   and its siblings inside the listener through one recorder in `tests/setupBrowser.ts`, prove it
   on an attached and a detached host, never weaken an assertion to accept either, and name the
   browser build in every receipt.
4. **The selector grammar: retire it.** Both design lanes retire the hand-written grammar; the
   audit's reviewer argued to keep it because neither the CSSOM nor `postcss` decomposes a
   selector. The design lanes win, because the only judgment the grammar serves (no tag-pair rule
   in the elements layer) is answered by a rendered proof that mounts each styled tag alone and
   inside each other styled tag, which reaches forms the grammar refuses. The accounting keeps
   `postcss` for source-side rule, declaration, and condition reading with selector text opaque,
   the CSSOM for what the browser parsed, and the retained normalizer only where a recorded name is
   compared with an emitted one. The reviewer's module finding stands: the styles setup module mixes
   case tables, oracle values, and the grammar, and the accounting unit splits it.
5. **Value accounting: the first cross-cutting unit, before any family.** Both lanes, and the
   user's ruling. The shape is the analyst's, with the planner's table: a `### Departures` table in
   the guide keyed by component, selector, property, and enclosing condition, with the recorded and
   emitted values and a `departure` union naming the axis (`tokenized`, `aliased`, `declared`,
   `fallback`, `dropped`), plus an additions table for every emitted selector, declaration, custom
   property, and keyframe Bootstrap does not carry; a gate that reddens on an unrecorded value
   difference, an unrecorded extra name, a stale departure, and a stale deferral, each proved by a
   plant; comparison over the unminified compile.
6. **The ledger's home: the guide alone.** Both lanes: `guides/veneer.md` § Compatibility,
   § Deferred selectors, § Departures, and § Additions are the definition of done and the only
   machine-read record; `tests/fixtures/oracle/inventory.json` is the pinned upstream input;
   `research/ledger.md` and the duplicate research inventory retire after the fixture's provenance is
   verified.
7. **Elements and layout.** Measured: Elements carries no Bootstrap-style grid
   (`units/elements-grid-search.md`), so the grid stays judged against Bootstrap's page and the
   record says so with the search pattern. Elements owes layout its spacing scale, container
   widths, and motion tokens, measured from rendered specimens when the identity phase opens. The
   appearance questions close on side-by-side captures of the same specimen (Veneer, Elements,
   Bootstrap) with the measured value beside each frame, after the capture grammar is repaired and
   after the baseline phase, per the user's ordering.
8. **Vue: refuse the optional peer; the delivery is the user's.** Both lanes refuse the optional
   peer and the undeclared external; both prefer an adapter that takes the consumer's reactivity
   and lifecycle primitives by injection and imports nothing, proved by a real Vue component in
   `tests/`; a separate package stays available. Deferral does not satisfy the tenet, so the
   adapter is a unit of the build-on phase.
9. **Tailwind: after the accounting, not after Card.** Both lanes. A real Tailwind build needs a
   development dependency the user has not yet authorized; the unit waits on that ruling and on
   the baseline's layer contract being proved.
10. **Semantic tags and class control.** The published cascade infers no component from tag
    position; the shell's `header button` becomes an explicit class. Every `!important` in the
    cascade has a Bootstrap twin (`units/important-census.log.txt`, differences: 0), so the
    important-utility contract is Bootstrap's and the guide states the escape (a consumer's own
    `!important`); a rendered proof adds the component-class-over-tag-default case.
11. **Engine shape.** Both lanes: explicit construction and opt-in delegation, typed contracts,
    ownership and restore-on-destroy, abort-driven cleanup, a side-effect-free import; adopt from
    the references the cancelable pre-change event beside the completed one, a shared focus
    primitive, native-first disclosure and placement proved on captures, reduced-motion gating in
    script, `IntersectionObserver` for Scrollspy, and completion read from the actual transition;
    refuse `@vue/reactivity`, the factory idiom, the fixed transition fallback, position-based
    bare-tag rules, the Tailwind `!important` workaround, and post-`destroy` mutation. Each
    mechanism lands with its first consumer; the audit's reviewer showed `emitEvent`,
    `bindEventMap`, and `Delegate` are Button-shaped, and the guide records that until the first
    cancelable-event component moves them.
12. **Process cost.** Per family: one terrain distillate, one design round on one brief with both
    lanes, one verifier run at the family's close and at any landing that moves the manifest or a
    config. Per unit: a file brief pointing at the terrain record, one writer, one audit round with
    both lanes on one claims file, a checker only for mechanical criteria, a verbatim-fix closure by
    mutation probe, one parameterized landing script. No scope-read lane per unit, no fix round on
    prose, no re-review of unchanged clean claims. Size the utilities family by mechanism.
13. **Carriers.** Every open item in the G1 distillate § D has a unit in the register below or a
    recorded drop: the four CL11 items and the CL12 guide bounds are dropped as satisfied on the
    plan's own closure citations, the `::-moz-focus-inner` exclusion stays recorded, the legacy
    tree stays in history, and the gap keys stay with the utilities family.
14. **Exit criterion.** Enumerated below.

## Decisions for the user

- **D1 Push and publish Test.** The release commit `774ba14` is on `claude/inspiring-allen-t4qzv1`
  in `orkestrel/test`; say whether to push it to `main` (or merge the branch) before the window,
  then say when you are at the keyboard so the login URL is minted while you can click it.
- **D2 Tailwind tooling.** Approve `tailwindcss` (and its PostCSS plugin) as a development
  dependency for the profile proofs, or supply a built reference fixture. Recommended: approve.
- **D3 Vue delivery.** Injected adapter in `src/browser` importing nothing (recommended), or a
  separate package. The optional peer and the undeclared external are refused.
- **D4 Delegate refusals.** Veneer's delegation refuses `disabled`, `.disabled`, and
  `aria-disabled="true"` hosts where Bootstrap's data API toggles them (reviewer finding F1).
  Recommended: keep the refusal and record it as a departure.
- **D5 The `index.rtl.css` twin.** It ships as an unreachable byte-identical duplicate of the
  cascade (reviewer finding F2). Recommended: stop emitting it; the direction proof over the
  cascade stays.
- **D6 Important utilities.** Keep Bootstrap's `!important` set exactly (recommended) and
  document the escape, or remove it and record every changed utility.
- **D7 The older highlight token pair.** Keep as a Bootstrap alias with a recorded non-consuming
  status (recommended), or remove.
- **D8 Toolchain majors and the `pool` pin.** Leave outside this campaign (recommended).
- **D9 The prune.** After the roadmap lands and the carry checks close, approve the deletion set
  the prune record presents.

## Units and routing ledger

Writers serialize per checkout. Bench lanes are launched by the Orchestrator from file briefs per
`.agents/transports/codex.md`; the Sonnet driver hop is omitted because the Orchestrator launches
the resolved command itself, and every Codex lane's thread id is recorded beside its report.

| Unit | Role and engine | Checkout | Depends on | Closes |
| --- | --- | --- | --- | --- |
| F0 ROADMAP | `opus` on Opus 5 | Veneer (`ROADMAP.md`), scaffold bridge by `builder` on Sonnet | this verdict | question 1; carrier register; phase queue |
| F1 TEST-RELEASE | landed: `builder` on Sonnet for the tolerance, Orchestrator for lockfile and bump, `verifier` on Sonnet for gates | Test | — | question 2 (Test half) |
| F2 TEST-PUBLISH | user, one-time code | Test | F1, D1 | registry serves `0.0.19` |
| F3 VENEER-PIN | `builder` on Sonnet; Orchestrator runs `npm ci`; `verifier` on Sonnet | Veneer | F2 | self-containment proof from the lockfile alone |
| F4 HOST-OBSERVATIONS | `sol` on Astra | Veneer | F3 | question 3; the two red cases; receipts name the build |
| F5 ACCOUNTING | `sol` on Astra | Veneer | F4 | questions 4, 5, 6; reviewer claims 12, 13, 16, 18, 21a (guide value gate), 22 (built-closure sweep); F3 additions table; F1 departure row; module split |
| F6 FOUNDATION | `opus` on Opus 5 | Veneer | F5 | reviewer claim 5 (`ColorMode` islands), claim 9 (factor proofs), claim 21b (layer-order sentence), F2 per D5, Contract guard reuse, `header button` class, caption opt-out, shell `main` id, description-list case name |
| F7 CAPTURE | `opus` on Opus 5 | Veneer | F5 | frame grammar, stems, accessibility comparability, palette and link coverage, pixel guard, sampler; Button frames re-shot |
| F8 TAILWIND | `sol` on Astra | Veneer | F5, D2 | question 9 |
| B-PASSIVE | `opus` on Opus 5 | Veneer | F7 | Close button, Badge, Breadcrumb, Button group, Card, List group, Pagination, Placeholders, Progress, Spinners as Bootstrap baseline under the accounting gates |
| B-FORMS | `sol` on Astra | Veneer | B-PASSIVE | Form control, Select, Checks and radios, Switches, Range, Input group, Floating labels, Form layout, Validation |
| B-COLLAPSE … B-SCROLLSPY | `sol` on Astra, one unit per component | Veneer | B-FORMS | Collapse, Accordion, Navs and Tabs, Dropdown, Navbar, Scrollspy; the cancelable event, the entity-neutral binder, and the generalized delegation land with Collapse |
| B-MODAL … B-CAROUSEL | `sol` on Astra, one unit per component | Veneer | B-SCROLLSPY | Modal, Offcanvas, Tooltip, Popover, Alert, Toast, Carousel; focus primitive with Modal |
| B-UTILITIES | `sol` on Astra, one unit per mechanism | Veneer | B-CAROUSEL | every remaining helper and utility root, gap keys included |
| B-CROSS | `sol` on Astra | Veneer | B-UTILITIES | breakpoints, print, transition, colour-mode mechanisms; no RTL |
| E-ELEMENTS | Orchestrator capture harness with `opus` for instruments | Veneer, Elements | B-CROSS, F7 | the side-by-side appearance packet; APPEARANCE-RULING by the user |
| E-IDENTITY | `opus` on Opus 5 | Veneer | APPEARANCE-RULING | the ruled Elements identity and motion, each recorded as a departure |
| E-VUE | `opus` on Opus 5 | Veneer | D3, B-COLLAPSE | the injected adapter and its real Vue proof |
| E-RECEIPTS | `sol` on Astra | Veneer | E-IDENTITY | receipts on the promised hosts |
| X-EXIT | `verifier` on Sonnet, audit lanes | Veneer | all | the exit criterion on the landed tree and the packed artifact |
| X-RETENTION | `builder` on Sonnet prepares; user approves; Orchestrator commits | scaffold | X-EXIT | the prune with its promotion record |

Every unit: brief file, one writer, an audit round with the objective lane on the engine that did
not write it, a checker where the criteria are mechanical, a landing by allowlist.

## Exit criterion

The campaign ends when each of these ends implemented, repaired, retained, or excluded by a user
ruling on evidence:

1. Self-containment: `npm ci` from the committed lockfile, then the whole gate chain, exits 0.
2. Accounting closure: every emitted selector, declaration, custom property, and keyframe maps to a
   recorded Bootstrap value, a departure row, or an addition row; every recorded name ships or holds
   a deferral row with an owner; each gate reddens on its planted mutation.
3. Baseline coverage: every key the pinned record carries ends `shipped`, deferred with an owner, or
   excluded with a reason the user has seen, engine obligations included, under the same gates.
4. Owned engine: every interactive contract works without Bootstrap JavaScript or another
   forbidden runtime, with lifecycle, cancellation, focus, motion, and cleanup proved per component.
5. Semantic independence and class control: proved by rendered runs, with the important-utility
   contract documented.
6. Tokens: every documented token's declared value is read from the built cascade, and overriding
   each token group moves a resolved consumer property.
7. Rendered acceptance: every shipped key carries captures at its states and variants under one
   frame grammar, ruled through the polish skill.
8. Elements identity: the appearance and motion rulings land as recorded departures.
9. Tailwind: the standalone profile and each supported combination proved in the browser.
10. Vue: the ruled adapter proved by a real Vue consumer with the manifest unchanged.
11. Receipts: each recorded receipt names its browser build; the promised hosts are recorded.
12. One ledger and a pruned record: the guide is the only machine-read record, the roadmap states
    no recomputed status, and the campaign folder is pruned with its promotion record.

Publication of Veneer stays a separate user-directed task.
