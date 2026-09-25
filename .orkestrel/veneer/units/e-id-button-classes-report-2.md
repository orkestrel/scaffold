# E-ID-BUTTON-CLASSES round 2 report

Unit `opus` on Opus 5.5, native Claude subagent, sole writer in `/home/user/veneer-ebcl` over Veneer `2376710` with
round 1 uncommitted. Brief: `/home/user/scaffold/.orkestrel/veneer/units/e-id-button-classes-brief-2.md`.

**Deviation state: complete, no stop.** One plant needed a recorded adjustment: the `both-default` rule as the brief
words it is inert on Chromium 141, so the plant also runs with `outline-style: solid` (see the plant table). No class's
Veneer map differs from its release map, the `both-default` plant leaves the `.btn` proof green, and every change sits in
an owned file.

## Release `.btn` maps (Execution step 1)

The release's button-versus-anchor map equals the removed `BUTTON_FORM_DIFFERENCES` list in every form and state on
Chromium 141.0.7390.37, and the Veneer map equals the release map in each. The maps came from `readFormDifferences`,
driven by the rewritten `.btn` proof with a temporary console line that was removed afterwards. The log is
`ebcl-instruments/r2/ebcl-2-btn-release.log.txt`, the raw run is `ebcl-instruments/r2/ebcl-2-btn-release-raw.log.txt`, and the extraction
script is `ebcl-instruments/r2/ebcl-2-btn-release.py`.

| Form | rest | hovered | pressed | focused |
| --- | --- | --- | --- | --- |
| `filled`, `outline`, `link`, `large`, `small`, `checked` | `appearance: button` | `appearance: button` | `appearance: button` | `appearance: button`, `outline-offset: 0px` |
| `disabled` | `appearance: button` | not read | not read | not read |

## The reader

`readFormDifferences` in `tests/setupBrowser.ts`, with its types beside it, because that module keeps its own types:

```ts
export type FormState = 'rest' | 'hovered' | 'pressed' | 'focused' | 'disabled'
export interface FormPair {
	readonly name: string
	readonly selector: string
	readonly button: string
	readonly counterpart: string
	readonly paired: boolean
}
export type FormDifference = Readonly<Partial<Record<FormState, Readonly<Record<string, string>>>>>
export interface FormComparison {
	readonly veneer: FormDifference
	readonly release: FormDifference
}
export const FORM_ENTRIES // button, paired, and unpaired entry selectors per state (R1)
export async function readFormDifferences(
	pair: FormPair,
	states: readonly FormState[],
	holder: string,
): Promise<FormComparison>
```

- **Mounting.** The reader mounts both forms under the holder in the document and in a shadow root that holds the text
  of `node_modules/bootstrap/dist/css/bootstrap.css`, read through `commands.readFile`, inside `data-bs-theme="light"`.
- **Driving.** It drives each element alone: `userEvent.hover`, `driveHold`, and `focus()` followed by `{ArrowRight}`.
  For the disabled state it sets `disabled` on the button form. A paired counterpart takes the `disabled` class and
  `aria-disabled="true"`, and an unpaired one stays at rest.
- **Entry check.** After each drive, the element must match its `FORM_ENTRIES` selector: `:hover`, `:active`, or
  `:focus-visible`; `:disabled` for the button form; `.disabled` for a paired counterpart; and `*` for the rest state
  and for an unpaired counterpart. The reader collects every miss and throws one `Error` that names each element and
  state it missed.
- **Motion and cleanup.** The rest reading is taken with motion allowed. Every later state is read with reduced motion,
  staged through `stageMedia`. The pointer is released after each reading. The reader releases the pointer and the
  media staging in a `finally` block.
- **Result.** For each cascade and state, the reader returns every longhand where the button form resolves apart from
  its counterpart, with the button form's value. Custom properties are left out.
- **Naming.** The name follows the `read*` prefix rule in `.claude/rules/names.md`: the helper obtains values from live
  host objects and throws rather than coercing. The state lists the reader takes are `BUTTON_FORM_STATES`,
  `BUTTON_REBOOT_STATES`, and the per-form `states` field of `BUTTON_FORM_CASES`. Each sits in
  `tests/setupStyles.ts`.

The reader's own proof is in `tests/setupBrowser.test.ts` › `readFormDifferences`, in the `setup:browser` project, where
the document carries no Veneer cascade:

- "reads no difference between two alike forms, and exactly a planted longhand in the state it is planted in". The
  control fixture uses identical buttons, and every state map is `{}` in both cascades. The plant fixture adds
  `.vn-form-plant:active { outline-offset: 3px }` and a custom property on the button form. Only
  `pressed: { 'outline-offset': '3px' }` differs, in both cascades, and the custom property is left out.
- "reads the rest state with motion allowed and every later state with motion reduced, and releases the staging"
- "enters the disabled state through the disabled class on a paired counterpart, and leaves an unpaired counterpart at
  rest"
- "refuses a form that does not enter a state, naming each element and state it missed". The counterpart is a `div`
  with no tab index, and the case asserts the exact refusal message.

## Where each case sits

| Case | File |
| --- | --- |
| `.btn` form proof, `it.each(BUTTON_FORM_CASES)`: "resolves the $name .btn form on a button apart from the same form on an anchor on the same longhands, at the same button values, as the release does, at rest, and under hover, press, and keyboard focus where the form is enabled" | `tests/src/styles/elements/button.test.ts` |
| nav-link reboot case (unchanged) | `tests/src/styles/elements/button.test.ts` |
| `btn-close` reboot case | `tests/src/styles/components/close.test.ts` › `btn-close button reboot` |
| `navbar-toggler` | `tests/src/styles/components/navbar.test.ts` › `navbar-toggler button reboot` |
| `accordion-button` | `tests/src/styles/components/accordion.test.ts` › `accordion-button button reboot` |
| `dropdown-item` | `tests/src/styles/components/dropdown.test.ts` › `dropdown-item button reboot` |
| `nav-link` | `tests/src/styles/components/nav.test.ts` › `nav-link button reboot` |
| `list-group-item` | `tests/src/styles/components/list-group.test.ts` › `list-group-item button reboot` |
| `page-link` | `tests/src/styles/components/pagination.test.ts` › `page-link button reboot` |
| `carousel-control-prev`, `carousel-control-next`, `carousel indicator` | `tests/src/styles/components/carousel.test.ts` › `carousel button reboot` (`it.each`) |
| R3 membership: "names in its cases exactly the classes the button reboot selectors reset" | `tests/setupStyles.test.ts` › `button reboot case table` |

- **Reboot case body.** Each reboot case finds its `BUTTON_REBOOT_CASES` entry by name through `requireValue`, so a
  renamed entry throws instead of silently registering nothing. The case then calls
  `readFormDifferences(pair, BUTTON_REBOOT_STATES, BUTTON_REBOOT_HOLDER_STYLE)`, asserts that `appearance` is in every
  release state, and asserts `expect(veneer).toEqual(release)`.
- **The `.btn` proof.** It calls the same reader with `pair.states` under `BUTTON_HOLDER_STYLE`, with the same
  `appearance` guard and the same equality.
- **R3.** The case unwraps each `:where()` selector. It reads the last class of every complex selector through
  `collectSelectorClasses` and `splitTopLevelList`, and compares the sorted lists with the last class of each case's
  `selector`.

**F1, F2, and claim 10.**

- **F1.** `BUTTON_RETUNED_HOLDER_STYLE` is renamed `BUTTON_REBOOT_HOLDER_STYLE` at every site. The readings are
  named `buttonReading` and `counterpartReading` inside the reader.
- **F2, the holder sentence.** The holder doc says the holder retunes every token the button surface reads outside
  forced colors.
- **F2, the remaining comments.** The remaining comments no longer exist as case comments. The reader's TSDoc says the
  rest reading is taken with motion allowed and every later state with motion reduced. `FORM_ENTRIES` names the
  universal selector as the rest entry and the unpaired counterpart's disabled entry. The reader's TSDoc names every
  disabled drive.
- **Claim 10.** The guide says "outside forced colors" and "no `:disabled` rule". The § Outside the ledger paragraph now
  names the per-partial placement and the `readFormDifferences` function. § Tests names none of the changed titles, so
  it is unchanged.

## Plants (Execution step 8)

The driver is `ebcl-instruments/r2/ebcl-2-plant.sh <name>`. Each log records the applied diff, the run, and a restore that the
driver checks by SHA-256 digest and by `cmp` against a backup inside `tmp/units/`. Each log also records
`git diff --stat -- src`, which is empty after every restore.

| Plant | Command | Change | Reading | Restore |
| --- | --- | --- | --- | --- |
| `include` | `ebcl-instruments/r2/ebcl-2-plant.sh include` | removes `_close.scss`'s `@include button-reboot;`, rebuilds, and runs `close.test.ts` | `btn-close button reboot` fails: `AssertionError: expected { rest: { …(30) }, …(4) } to deeply equal { rest: { …(6) }, …(4) }`. The existing case "declares no transition, as the release declares none" also fails. | IDENTICAL, cmp equal, rebuild exit 0 |
| `btn-leak` | `ebcl-instruments/r2/ebcl-2-plant.sh btn-leak` | adds `button.btn { opacity: var(--vn-button-opacity); }` at the head of `_button.scss`'s `components` layer, rebuilds, and runs the `.btn` proof | Every enabled form fails, for example `AssertionError: expected { name: 'filled', …(1) } to deeply equal { name: 'filled', …(1) }` with `+ "opacity": "0.65"` in each state. The `disabled` form stays green, because `.btn:disabled` already writes `0.65` on both elements. | IDENTICAL, cmp equal, rebuild exit 0 |
| `both-default` A | same driver | test file only: `<style>a.btn:active { outline-width: 3px }</style>` in the counterpart markup, so the rule lands in the document and in the release shadow root | `.btn` proof green (`Tests 7 passed \| 11 skipped (18)`) | see row D |
| `both-default` B | same driver | the same rule loaded into the document head alone | green. The rule is inert on Chromium 141: an anchor carrying `outline-width: 3px` reads `EBCL2-OUTLINE {"rule":"outline-width: 3px","width":"0px"}`, because its outline style is `none` | see row D |
| `both-default` C | same driver | `a.btn:active { outline-width: 3px; outline-style: solid }` in both cascades | `.btn` proof green (`Tests 7 passed \| 11 skipped (18)`) | see row D |
| `both-default` D | same driver | the row C rule in the document alone | Every enabled form fails with an `AssertionError` whose diff lists `"outline-style": "none"` and `"outline-width": "0px"` on the Veneer side; `EBCL2-OUTLINE` reads `3px`. The `disabled` form is read at rest only and stays green. | IDENTICAL, cmp equal (`button.test.ts`) |
| `entry` | `ebcl-instruments/r2/ebcl-2-plant.sh entry` | replaces the disabled drive's body in `tests/setupBrowser.ts` with `element.blur()` alone | The reader's entry check throws. In the reader proof, `Error: The unpaired forms did not enter every state: veneer button disabled, release button disabled`. In `close.test.ts`, `Error: The btn-close forms did not enter every state: veneer button disabled, veneer counterpart disabled, release button disabled, release counterpart disabled` | IDENTICAL, cmp equal |
| `r3` (added) | `ebcl-instruments/r2/ebcl-2-plant.sh r3` | deletes the `dropdown-item` entry from `BUTTON_REBOOT_CASES` | the R3 case fails: `AssertionError: expected [ 'accordion-button', …(8) ] to deeply equal [ 'accordion-button', …(9) ]`, `- "dropdown-item"` | IDENTICAL, cmp equal |

- **The `entry` log.** The log is from the final run, taken after the last doc-only edit to `tests/setupBrowser.ts`. An
  earlier run read the same failures.
- **The `both-default` adjustment.** On Chromium 141 an outline whose style is `none` computes its width to `0px`, so
  the rule as the brief words it moves neither cascade. Rows A and B apply the rule exactly as the brief words it and
  read green, because it is inert. Rows C and D add `outline-style: solid`, so the rule moves the computed value. The
  shape the brief asks for then reads as stated: green when both cascades move, and an `AssertionError` when only the
  Veneer document moves.
- **Chromium 153.** The Chromium 153 row reports `outline-width` alone in the pressed state. That suggests the zeroing
  differs on that build. The reader compares both cascades in the same browser, so the row's longhand appears in both
  maps there. Only the engine session's host can confirm this, because this container runs only Chromium 141.

## Gates (Execution step 9)

The driver is `ebcl-instruments/r2/ebcl-2-gates.sh`. Each log ends with `exit=<code>` and `/proc/loadavg`.

| Gate | Exit | Reading | Log |
| --- | --- | --- | --- |
| `oxfmt --check` over the owned `.ts` files and `guides/veneer.md` | 0 | all formatted | `ebcl-instruments/r2/ebcl-2-format.log.txt` |
| `npm run check` | 0 | clean | `ebcl-instruments/r2/ebcl-2-check.log.txt` |
| `npm run lint:check` | 0 | clean | `ebcl-instruments/r2/ebcl-2-lint-check.log.txt` |
| `npm run build:src:styles` | 0 | built | `ebcl-instruments/r2/ebcl-2-build-styles.log.txt` |
| owned styles files: `button.test.ts` and the component files this round touches | 0 | `Tests 268 passed (268)` | `ebcl-instruments/r2/ebcl-2-styles-owned.log.txt` |
| `npx vitest run --config vite.config.ts --no-cache --project setup:browser tests/setupBrowser.test.ts` | 0 | `Tests 92 passed (92)` | `ebcl-instruments/r2/ebcl-2-setup-browser.log.txt` |
| `setup` project, `tests/setupStyles.test.ts` | 0 | `Tests 155 passed (155)` | `ebcl-instruments/r2/ebcl-2-setup-styles.log.txt` |
| `npm run test:guides` | 0 | `Tests 20 passed (20)` | `ebcl-instruments/r2/ebcl-2-test-guides.log.txt` |
| `npm run test:policy` | 0 | `Tests 109 passed \| 1 skipped (110)` | `ebcl-instruments/r2/ebcl-2-test-policy.log.txt` |
| `npm run test:conformance` | **1**, then 0 on rerun | Sweep run: `Tests 1 failed \| 25 passed (26)`. The failure is `Bootstrap component oracle › records official Button behavior and matches each named fixture step` with `Test timed out in 10100ms`, at load `16.00 16.41 11.77`. The rerun alone in this unit read `Tests 26 passed (26)`, starting at load `15.46 18.63 14.66`. | `ebcl-instruments/r2/ebcl-2-test-conformance.log.txt`, `ebcl-instruments/r2/ebcl-2-test-conformance-rerun.log.txt` |
| Observation: `npm run test:src:styles` | 0 | `Tests 1522 passed (1522)` | `ebcl-instruments/r2/ebcl-2-test-src-styles-tail.log.txt` |

- **The conformance timeout.** It is a browser-launching oracle case, the same class of timeout round 1 met in
  `test:setup`. This unit changes no input to it. The deciding rerun is the Orchestrator's.

## Touched files

The following files carry this round's changes:

- `tests/setupBrowser.ts`: adds `FormState`, `FormPair`, `FormDifference`, `FormComparison`, `FORM_ENTRIES`, and
  `readFormDifferences`.
- `tests/setupBrowser.test.ts`: adds the `readFormDifferences` describe block and the export-list entries
  `FORM_ENTRIES` and `readFormDifferences`.
- `tests/setupStyles.ts`: reshapes `BUTTON_FORM_CASES` into reader pairs with `selector`, `counterpart`, `paired`, and
  `states`. It adds `BUTTON_FORM_STATES` and `BUTTON_REBOOT_STATES`, removes `BUTTON_FORM_DIFFERENCES`, and renames the
  holder to `BUTTON_REBOOT_HOLDER_STYLE` with its forced-colors sentence.
- `tests/setupStyles.test.ts`: updates the export list and adds the R3 membership case.
- `tests/src/styles/elements/button.test.ts`: rewrites the `.btn` proof as an `it.each` over the reader. It removes the
  reboot `it.each`, the fixed-list comparison, and the unused imports.
- `tests/src/styles/components/{close,navbar,accordion,dropdown,nav,list-group,pagination}.test.ts`: adds one reboot
  case each, with its imports.
- `tests/src/styles/components/carousel.test.ts`: adds the controls and indicator reboot cases.
- `guides/veneer.md`: rewrites the § Outside the ledger paragraph. It covers per-partial placement, the reader, "outside
  forced colors", and "no `:disabled` rule".
- `tests/src/styles/mixins.test.ts`: round 1's change, untouched this round.

Diffstat against `2376710`: 15 files changed, 759 insertions(+), 147 deletions(-). `git diff 2376710 --stat -- src` is
empty.

## Artifacts

- **Diff and status.** The diff is `ebcl-2.diff` (`git diff 2376710`). The status is
  `ebcl-2-status.txt`.
- **Instruments.**
  - `ebcl-instruments/r2/ebcl-2-plant.sh`: the plant driver.
  - `ebcl-instruments/r2/ebcl-2-gates.sh`: the gate driver.
  - `ebcl-instruments/r2/ebcl-2-place-reboot.py`: placed the reboot cases.
  - `ebcl-instruments/r2/ebcl-2-btn-release.py`: extracted the step 1 maps.
- **First-run logs.** `ebcl-instruments/r2/ebcl-2-reader-first.log.txt`, `ebcl-instruments/r2/ebcl-2-styles-first.log.txt`,
  `ebcl-instruments/r2/ebcl-2-setup-styles-first.log.txt`, and `ebcl-instruments/r2/ebcl-2-guides-first.log.txt`.
- **Failing-first evidence.** These are coverage proofs, not defect proofs, and they pass on the tree. The plants are
  their failing evidence: `include` for the reboot cases, `btn-leak` and `both-default` D for the `.btn` proof, `entry`
  for the reader's entry check, and `r3` for the membership case. The reader's own proof separates its plant fixture
  from its control fixture in one run.
