# Unit U7e — the guide after U7 (Button): correct what the landed mechanisms made false

## Role and engine

`opus` on native Opus 5, the sole writer in the Veneer checkout
(`C:/Users/mikes/WebstormProjects/veneer`), HEAD `92aad70` (the U7c landing), tracked
tree clean. Perform the assignment directly and spawn nothing.

## Objective

`guides/veneer.md` claims only what the landed U7 proofs show. Every sentence, row, or cell that
U7a, U7b, U7c, or the tidy unit made false is corrected to the landed truth; nothing is added for
its own sake. The user has ruled that guides are the parity minimum: this unit corrects
falsities and parity drift and stops. It rewrites no prose for register, contraction, or
length, and adds no example, section, or explanation the parity gate does not require.

## Context

Read, in order: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`,
`.claude/rules/documentation.md`, `.claude/rules/writing.md`, `.claude/rules/styles.md`,
`.claude/rules/tests.md` (the sections on guides and parity), then the live guide and the
landed tree. The bounds below were recorded by the units that landed the mechanisms; each names
the section it touches. Verify each against the tree before editing, and correct only where the
guide is false or the parity gate reads the row.

Bounds carried (from `scaffold/.orkestrel/veneer/units/u7c-guide-bounds.md` and
`units/prose-bounds-carry.md`):

1. § Showcase (line 728 at launch): "The private application renders the Veneer heading, the
   Dark mode button, and a Showcase region." is false. The shell also renders a `Buttons` region
   carrying every `BUTTON_SPECIMENS` row through `ButtonSection`, and `app/browser/main.ts`
   constructs a `Delegate` beside the `Showcase`. The shell stylesheet declares one layout
   class, `.specimens`, in its own `shell` layer and paints nothing; correct the paragraph only
   as far as those facts require.
2. § Tests (line 744 at launch): the application proofs sentence names the shell and the
   journeys; the section proof `tests/app/browser/sections/ButtonSection.test.ts` now exists.
   Add its link to that sentence in the sentence's own form, and nothing else; the setup-proof
   coverage needs no sentence unless the guide already lists setup proofs.
3. § Compatibility: where a Button row's Proof cell says only the recording is compared, the
   landed truth is that every recorded step has a live Veneer counterpart driven from the
   journey on both motion axes; the forced-colors row stays open (the installed `MediaOptions`
   stages `print` and `motion` only).
4. § Tokens `### Button states and bindings` (line 525 at launch) binds `--bs-btn-focus-shadow-rgb`
   to `var(--vn-color-primary-rgb)`, and Veneer's `--bs-btn-focus-box-shadow` reads
   `--vn-focus-color` instead, so the cascade declares the variable for consumers and never reads
   it, where Bootstrap reads it in its own focus shadow. Read `src/styles/components/_button.scss`
   and `src/styles/elements/_button.scss` first; then add the one row § Departures from Bootstrap
   (line 604 at launch) owes for it, in that table's own column shape, and nothing else.
5. § Styles, the proof-subject sentence after the scripts table (line 166 at launch): narrow
   "the cases that read the shipped cascade" to the cases that read that file, because
   `tests/src/styles/tokens.test.ts` also reads a second built stylesheet through a raw import.
   § Departures from the workspace rows, the opening sentence (line 242 at launch): "in each of
   its tables" overclaims, because the workspace-proof and script tables of
   `.claude/rules/workspace.md` carry no styles row; limit it to the tables that carry one, named.

Inert at launch, verified by the Orchestrator: the guide claims no contrast level, no focus-ring
level, and no capture-state list, so the paint readings U7c recorded (the ring near 2.28:1 light
and 2.36:1 dark, dark `btn-primary` text at 2.59:1, light `btn-outline-light` at 1.05:1, the
disabled `opacity: 0.65`) and the capture registry add nothing here. Add no sentence for them.

Not this unit's: the two deferral grammars (`### Deferred names` under § Tokens and
`### Deferred selectors` under § Styles) are a design question recorded for the user; an example
fence for a consumer constructing a `Delegate`; contractions, register, and line wrapping; every
guide sentence that is true.

## Unknowns

Whether § Compatibility's Button rows carry a Proof cell that bound 3 makes false: read the rows
(line 662 onward at launch); where every cell is true as written, record that under Output and
edit nothing.

## Scope

Owned: `guides/veneer.md`, `u7e-report.md`. Off-limits: every other file. A change
the parity gates would require outside the guide (a doc block whose description a Summary cell
must equal, a README pitch) is a stop under the deviation contract, reported with the diagnostic.

## Execution

1. Read the guide against the tree, bound by bound; edit only the sentence, row, or cell each
   bound names, where it is false.
2. Run and record: `npm run format:check`, `npm run test:guides`, `npm run test:policy`,
   `npm run test:conformance`, then `npm test`.

## Output

Write `u7e-report.md` and return its content: per bound, the sentence before and after
(or "true as written, no edit" with the line), each gate's exit code and final lines, the actual
`git diff --stat` and `git status --porcelain --untracked-files=all`.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself: the wording of a corrected
sentence within the writing rules; whether a row cell or a sentence carries a correction. Stop
on: a parity gate red that needs a file outside the guide; a bound whose truth you cannot settle
from the tree.

## Acceptance criteria

1. Every bound 1 to 5 is either corrected at its site or recorded as true as written, with the
   line; the § Compatibility unknown is recorded either way.
2. `npm run test:guides`, `npm run test:policy`, `npm run test:conformance`, and `npm test` exit 0.
3. `git status --porcelain --untracked-files=all` shows `guides/veneer.md` and the report only.

## Review evidence

The actual `git diff` and `git status` at return; this report.
