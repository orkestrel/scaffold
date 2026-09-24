# Unit J-W2-TERRAIN — the W2 components' obligations, contracts, and prior art, distilled for the W2 briefs

## Role and engine

`grok` on Cursor Grok 4.7 (`grok-4.7-high`), reached as the versioned Cursor CLI entry in `-p --mode=ask` print mode, read-only. The executor that opens this brief is the Grok engine inside that CLI.

## Objective

One terrain record for the W2 components — Tab, Alert, Modal, Carousel, ScrollSpy, Dropdown, Toast — that puts beside each component, with a `file:line` pointer per fact: Bootstrap 5.3.8's behaviour as its source states it, the contract Veneer has landed for it in `src/browser/types.ts` and `src/browser/constants.ts`, the design rulings that bind it, the Elements and Mailbox mechanisms the terrain distillate recorded for it, and the cascade tokens the shipped stylesheet gives it, so each W2 brief is written from this record rather than from seven separate readings.

## Context

**Evidence.** Veneer `main` at `217d12b` in `C:/Users/mikes/WebstormProjects/veneer` (read the files there; the collapse worktree is a sibling and is not this unit's subject). Bootstrap 5.3.8's sources sit under `C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/` (`tab.js`, `alert.js`, `modal.js`, `carousel.js`, `scrollspy.js`, `dropdown.js`, `toast.js`, `base-component.js`, `util/index.js`, `util/backdrop.js`, `util/focustrap.js`, `util/scrollbar.js`, `util/swipe.js`, `dom/event-handler.js`, `dom/selector-engine.js`). The landed contracts: `grep -n "^export interface \(Tab\|Alert\|Modal\|Carousel\|ScrollSpy\|Dropdown\|Toast\)" src/browser/types.ts` reads `DropdownDetail` 741, `DropdownEventMap` 747, `DropdownClassMap` 762, `DropdownAttributeMap` 783, `DropdownSelectorMap` 799, `DropdownOptions` 811, `DropdownInterface` 841, `TabDetail` 899, `TabEventMap` 905, `TabClassMap` 920, `TabAttributeMap` 934, `TabSelectorMap` 940, `TabOptions` 958, `TabInterface` 972, `ScrollSpyDetail` 1001, `ScrollSpyEventMap` 1007, `ScrollSpyClassMap` 1016, `ScrollSpyAttributeMap` 1026, `ScrollSpySelectorMap` 1038, `ScrollSpyOptions` 1052, `ScrollSpyInterface` 1077, `ModalDetail` 1113, `ModalEventMap` 1119, `ModalClassMap` 1136, `ModalAttributeMap` 1154, `ModalSelectorMap` 1166, `ModalOptions` 1178, `ModalInterface` 1198, `AlertEventMap` 1755, `AlertClassMap` 1766, `AlertAttributeMap` 1778, `AlertSelectorMap` 1784, `AlertOptions` 1790, `AlertInterface` 1804, `ToastEventMap` 1829, `ToastClassMap` 1844, `ToastAttributeMap` 1858, `ToastSelectorMap` 1870, `ToastOptions` 1876, `ToastInterface` 1896, `CarouselDetail` 1933, `CarouselEventMap` 1945, `CarouselClassMap` 1959, `CarouselAttributeMap` 1977, `CarouselSelectorMap` 1999, `CarouselOptions` 2009, `CarouselInterface` 2035 (line numbers approximate; locate by symbol). `grep -n "^export const \(TAB\|ALERT\|MODAL\|CAROUSEL\|SCROLL_SPY\|SCROLLSPY\|DROPDOWN\|TOAST\)_" src/browser/constants.ts` returns no hit, so no W2 default table exists yet; `COLLAPSE_CLASSES`, `COLLAPSE_ATTRIBUTES`, `COLLAPSE_SELECTORS`, `COLLAPSE_EVENTS`, `BUTTON_*`, and `COLOR_MODE_*` are the pattern. The shipped cascade under `src/styles/components/` carries `_alert.scss`, `_carousel.scss`, `_dropdown.scss`, `_nav.scss`, `_navbar.scss`, `_list-group.scss` and no `_modal.scss`, `_toast.scss`, or `_transition.scss`. The design verdict `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md` (R1 to R19 and § Amendments) and the decisions `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` (E6 to E14) bind every component. The terrain distillate `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-engine-terrain-distillate.md` § B carries the Elements and Mailbox mechanisms per obligation (Dropdown, Tab, ScrollSpy, Modal, Alert, Toast, Carousel, Backdrop, FocusTrap, ScrollBarHelper, Swipe) and § C the lessons; read it first and point into it rather than re-deriving it. The landed engine pattern is `src/browser/Button.ts`, `src/browser/HostSnapshot.ts`, `src/browser/Delegate.ts`, `src/browser/helpers.ts` (`resolveOptions`, `resolveVocabulary`, `readTargets`, `settleAnimations`, `emitEvent`, `bindEventMap`, `readTag`), `src/browser/validators.ts`, and the guide `guides/veneer.md` § Engine (`### Events`, `### Delegation`, `### Ownership and restoration`, `### Motion`, `### Focus`, `### Placement`, `### Content`, `### Vocabulary`, `### Components`).

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md` § Tedious work goes to Grok; `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/writing.md` (the record's prose); skill: none; guide: `C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md` § Engine and § Compatibility (the `engine` and `plugin` rows for each component).

**Installed primitives.** Not this unit's subject.

**Host.** Windows 11; the Cursor CLI's shell is allowlisted to `ls`, so read files by absolute path and run no other command. Working root: `C:/Users/mikes/WebstormProjects/scaffold`. No network is needed and none is granted.

**Measurements.** The line numbers and file lists in the Evidence row, taken 2026-09-24 at Veneer `217d12b`.

**Control identifiers.** None.

**Standing conditions.** The distillate's § E lists inputs the earlier lane could not read; report them again only where this reading closes one.

## Unknowns

- For each component, which `data-bs-*` attributes Bootstrap reads that the landed `{Entity}AttributeMap` does not name, and which option keys `{Entity}Options` carries that Bootstrap's `Default` lacks: report each as a difference, with both pointers.
- For Modal and Toast, whose cascade keys are absent: which class tokens the engine must write for the shipped stylesheet's future selectors, read from Bootstrap's `scss/_modal.scss` and `scss/_toasts.scss` under `node_modules/bootstrap/scss/`, so the unit proves against a test-local stylesheet carrying those tokens.

## Scope

**Owned.** None (read-only).

**Shared (report-only).** None.

**Off-limits.** Every file; `dist/`, lockfiles, and `tmp/` are not read; `node_modules/` is read only under `bootstrap/`.

**What asserts the state this change ends.** None.

**Tools and limits.** Read files by absolute path; `ls` is the only shell command. No edits, no decisions, no design.

## Execution

**A bench engine reading this brief inside its own CLI:** perform the assignment directly and spawn nothing.

## Output

One terrain record as your final message, one section per component in the order Tab, Alert, Dropdown, Carousel, ScrollSpy, Toast, Modal, each with these rows, every fact with `file:line` (absolute path on first mention, then the repository-relative path):

- **Bootstrap's behaviour.** The constructor's reads (options, attributes, the elements it resolves), the show and hide (or close, slide, activate) sequences step by step with the classes and attributes written at each step and the events dispatched with their `relatedTarget` or detail, the keyboard map, the data API selectors and the `data-bs-*` attributes the plugin reads, the timers (interval, autohide delay, transition fallback), the focus behaviour, and `dispose`.
- **The landed contract.** Each member of the component's `*Interface`, `*Options`, `*EventMap`, `*Detail`, and the three maps in `types.ts` with its TSDoc summary quoted, and the `@returns` and `@throws` sentences the methods carry; which `helpers.ts` and `validators.ts` exports the contract's shape reuses (the option resolver, the vocabulary resolver, the target readers, `settleAnimations`, the guards).
- **The rulings.** Every R1 to R19 clause and every E6 to E14 clause that names the component or a mechanism it must use (R7 Escape, R8 Modal in flow and backdrop, R9 Placement for Dropdown, R11 option paths for its compound keys, R12 member names, R6 timers, R17 proofs, R18 guide), quoted by its label.
- **Prior art.** The distillate's § B rows for the component and the § C lessons that bear on it, by their `file:line` pointers, and any Elements or Mailbox mechanism the distillate names that the design verdict refused.
- **The cascade.** Whether `src/styles/components/` ships the component's key; the class tokens and attribute selectors that stylesheet selects on (or, where absent, the tokens Bootstrap's `scss` file selects on); which transitions the cascade declares that `settleAnimations` will wait on.
- **Differences and questions.** The Unknowns' answers for the component, and every question the code alone does not settle, stated as a question the brief must rule.

Close with **Shared across W2**: the mechanisms two or more components share (the backdrop and scroll lock for Modal, the focus trap, the swipe reader for Carousel, the `data-bs-dismiss` route for Alert, Modal, and Toast, the `data-bs-toggle` routes, the keyboard routes for Dropdown and Tab), each with the Bootstrap utility's `file:line` and the R-clause that rules where it lives. No raw file dumps, no design, no recommendation, no edits. Return the record as the final message; the launch journal is the run's record.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short hypothesis — where a file the Evidence row names does not exist at the stated path. Decide, record, and carry on from the order of rows inside a section and the depth of a Bootstrap sequence you quote (every write and dispatch, not every local variable).
