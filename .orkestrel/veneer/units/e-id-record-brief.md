# Unit E-ID-RECORD — the border-width hook, the toggle input, and the stripe row

## Role and engine

`builder` on Sonnet, a native Claude subagent, in `/home/user/veneer-eir` (branch `unit/eir`, cut from Veneer `main`
`ca83afb`). Read `/home/user/scaffold/.orkestrel/veneer/units/e-id-common.md` first; it binds. Each step is specified;
the unit is taste-free.

## Objective

Every border width reads Bootstrap's `--bs-border-width` hook, `.btn-check` hides its input as Bootstrap does, and the
guide's stripe token row states the ruling.

## Unknowns

None.

## Scope

**Owned.** `src/styles/elements/_hr.scss` and `_tr.scss`; the `.btn-check` rule and the `--bs-btn-border-width` declaration in `src/styles/components/_button.scss`;
`tests/src/styles/elements/hr.test.ts`, `tr.test.ts`; `tests/src/styles/components/button.test.ts` (the `.btn-check`
case and a new toggle case); new files under `tmp/units/`. **Shared** per the common terms. E-ID-CODE owns `_kbd.scss` and `_pre.scss`,
including their border widths.

## Execution

Perform the assignment directly and spawn nothing.

1. Replace each `var(--vn-border-width)` read in `_hr.scss` and `_tr.scss`, and the `--bs-btn-border-width`
   declaration with `var(--bs-border-width)`; the alias declaration in `_tokens.scss` stays.
   Proof in `hr.test.ts`: a scope setting `--bs-border-width: 3px` moves the bare `hr`'s top border to 3px; red before
   the change.
2. Replace the `.btn-check` hiding declarations with `position: absolute`, `clip: rect(0, 0, 0, 0)`, and
   `pointer-events: none`, as `node_modules/bootstrap/dist/css/bootstrap.css` writes them. Update the case that reads
   `clip-path` to read `clip` as `rect(0px, 0px, 0px, 0px)`. Add a toggle case: Tab to the checkbox, press Space, and
   read it checked and its label's focus paint present; red when `pointer-events: none` is replaced by
   `display: none`.
3. In `guides/veneer.md`, the `--vn-state-stripe` token row's Source cell reads "Bootstrap's 5%, kept by the
   E-IDENTITY ruling; the stripe stays under the hover and active overlays", and the `.btn-check` departure bullet and
   row are deleted or restated to match the shipped declarations.

## Deviation contract

Common terms. Stop and report if a named site is absent.

## Acceptance criteria

The common criteria, and: the `hr` retune proof and the toggle case pass and were red first.

## Review evidence

The Orchestrator supplies the diff, the status, the report, and the logs to the audit.
