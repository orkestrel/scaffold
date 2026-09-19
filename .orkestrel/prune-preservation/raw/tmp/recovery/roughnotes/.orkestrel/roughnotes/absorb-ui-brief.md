# Unit: absorb-ui — Rough Notes UI terrain distillate

## Role and engine
`grok` — Cursor Grok (`cursor-grok-4.6-high`). Read-only scout and distiller.

## Objective
Return one distilled map of the Rough Notes Vue application's rendered surface, its design system,
and its authored CSS, so an orchestrator can plan a redesign without reading the tree itself.

## Context
- Repository root: `C:\Users\mikes\WebstormProjects\roughnotes` (this checkout).
- Stack: Vue 3 SFCs, Bootstrap 5.3 via SCSS, `@orkestrel/router` hash routing, Vitest browser tests.
- The application spec is `guides/README.md`. Read it first; it names every concept.
- Coding law is `../scaffold/AGENTS.md` and `../scaffold/.claude/rules/`. You are not judging
  compliance; you are mapping terrain.
- `docs/redesign.html` is a standalone marketing mockup already partially realized in `HomeView.vue`.

## Unknowns
- Which authored SCSS rules exist only because a Bootstrap utility was not found. Report what you
  see; do not rule on whether each is earned.
- Whether any view lacks empty / loading / error states. Report presence or absence per view.

## Scope
Read-only. Owned files: none. You edit nothing and create nothing outside your own journal.
Read: `app/**`, `tests/app/browser/**`, `guides/README.md`, `docs/redesign.html`.
Off-limits: `node_modules/`, `dist/`, `.git/`.
Capture `git status --porcelain` before and after; any change is a deviation you report.

## Execution
Perform this assignment directly inside your own CLI session. Spawn nothing.

## Output
A distillate under 900 lines. No raw file dumps. Every claim carries a `file:line` pointer.
Sections, in this order:

1. **Shell** — what `App.vue` renders, region by region, with the Bootstrap components used at each
   (`file:line`). Name the landmarks, the heading order, the skip link, the offcanvas, the theme
   toggle, and the footer.
2. **View inventory** — one row per file in `app/browser/components/`: route, page heading, the
   Bootstrap components used, and which of ideal / empty / loading / error states it paints.
   Mark a state absent rather than guessing.
3. **Design system** — every token declared in `app/browser/styles/_tokens.scss`, every rule in
   `_signature.scss`, `_theme.scss`, and `_mixins.scss`, grouped by what the rule paints, with the
   Bootstrap variable or utility it overrides where one exists.
4. **Authored-CSS census** — every authored selector across the SCSS files and every `<style>` block
   inside an SFC, with `file:line` and one line naming what it paints. Report the total per file.
5. **Copy register** — the headings, eyebrows, and calls to action the views ship, quoted exactly,
   grouped by view. This is the vocabulary a redesign must keep or deliberately change.
6. **Test coverage over the surface** — what the families in `tests/app/browser/integration.test.ts`
   assert, and which accessible names those assertions bind to. Name each binding, because a
   redesign that renames a control breaks them.
7. **Mockup delta** — what `docs/redesign.html` contains that the shipped `HomeView.vue` does not,
   and the reverse. Structure and copy only; do not judge which is better.

## Deviation contract
A conflict with the objective stops you: report expected, found, evidence, and one hypothesis.
Where a section's population is empty, say so explicitly rather than omitting the section.

## Acceptance criteria
- Every section present, in order.
- Every factual claim carries a `file:line` pointer.
- No file dumped verbatim; no decision, design proposal, judgement, or edit offered.
- `git status --porcelain` identical before and after.
