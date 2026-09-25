# IMPORTANT-LAYER design round — brief

One brief for both lanes of the design round, run blind to each other: the subjective lane on `planner` (Opus 5.5)
and the objective lane on `analyst` (GPT-6 Astra). Each lane performs the assignment directly, spawns nothing, edits
nothing, and returns a proposal. The Orchestrator reconciles and takes the result to the user.

## Law

Read, in order: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,documentation,quality}.md`;
Veneer's `ROADMAP.md` § Tenets and § Rulings at `/home/user/veneer-probe/ROADMAP.md`. No skill applies.

## The conflict, measured

The X-TENETS-STYLES audit (`tenets-styles/tenets-styles-audit-verdict.md` claims 3 and 4, and the structure lens's and
objective lane's verdicts beside it) found, on Veneer `main` at `0865c67` (read in `/home/user/veneer-probe`):

- Every `!important` declaration Veneer ships has a Bootstrap 5.3.8 twin, and every one sits inside a cascade layer
  (`reset`, `elements`, `components`, or `utilities`; the layer order is declared once in `src/styles/_tokens.scss`).
- For important declarations the cascade reverses layer order and places unlayered important declarations below every
  layered one. So an unlayered consumer `!important` at equal specificity loses to Veneer's, where it wins in Bootstrap
  (which ships unlayered). The tree pins the Veneer behaviour: the important-utility escape case in
  `tests/src/styles/tokens.test.ts` (search `row-gap: 2rem !important`), the responsive offcanvas case in
  `tests/src/styles/components/offcanvas.test.ts` (search `!important` in a `data-utility` rule), and the `[hidden]`
  case in `tests/src/styles/reset.test.ts`. `<div hidden class="d-flex">` is hidden in Veneer and shown in Bootstrap.
- The guide (`guides/veneer.md` § Styles, the paragraph beginning `Override an important utility from inside that
  utility's own layer`) documents the Veneer escape: reopen the utility's layer by name.
- `ROADMAP.md` § Rulings states the opposite twice: "the important-utility contract is Bootstrap's: state the escape in
  the guide, a consumer's own `!important`", and "a consumer overrides one with its own `!important`".
- The B-UTILITIES design verdict's `R5 Layer by importance`
  (`/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md`, the `R5` bullet) placed important helpers in
  `utilities` because of the layer inversion.
- The Tailwind profiles (`guides/veneer.md` § Styles › § Tailwind, and `tests/service/tailwind/`) layer Veneer beside
  Tailwind's `theme, base, components, utilities` and keep Bootstrap's declaration on a shared class name through an
  exclusion line.

## Question

Propose how Veneer's important declarations meet the tenets "Preserve Bootstrap compatibility while owning the
implementation", "Preserve direct control through classes", and "Remain compatible with Tailwind CSS without
requiring it". Rule on at least these two options, and on any other you find:

- **(a) Unlayered importance.** Emit every important declaration outside the layers, in the release's source order,
  and keep each rule's normal declarations (its `--bs-*` locals, the offcanvas resets) in their layers. A consumer's
  later `!important` then wins at equal or higher specificity, as in Bootstrap.
- **(b) Layered importance, recorded.** Keep the current layering, record the priority difference as an explicit
  incompatibility in § Departures (or a new record the gate reads), and take the ruling to the user to amend the two
  roadmap sentences.

For each option, measure or derive with citations what it does to: the Tailwind profiles and their exclusion line (does
an unlayered important Veneer utility beat Tailwind's layered utility of the same name, or lose, in each supported
combination?); the conformance priority case and the ledger; the `[hidden]` rule against a display utility; the
responsive offcanvas panel against a consumer override; the build (how the SCSS emits an unlayered rule from inside a
partial that wraps its rules in a layer); and every proof that pins the current behaviour. Say which consumer each
option serves and which it breaks.

## Output

A proposal under 1200 words: the recommended option with its reason, the rejected ones with theirs; the measured or
derived consequences with citations; the units (name, role and engine, owned files, acceptance criteria); what the user
must rule; the risks. State no count.
