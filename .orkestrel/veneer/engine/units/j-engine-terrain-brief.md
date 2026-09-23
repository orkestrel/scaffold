# Unit J-ENGINE-TERRAIN — the Elements and Mailbox engine mechanisms, distilled for the J-ENGINE design round

## Role and engine

`grok` on Cursor Grok 4.7 (`grok-4.7-high`), reached as the versioned Cursor CLI entry in `-p --mode=ask` print mode, read-only. The executor that opens this brief is the Grok engine inside that CLI.

## Objective

One distillate of how the Elements and Mailbox browser engines carry each J-ENGINE plugin obligation and utility — their lifecycle, cancellation, focus, motion, placement, dismissal, scroll-locking, and cleanup mechanics, the shared helpers they route through, and the lessons their comments and guides record — with a `file:line` pointer per fact, so the design round rules on evidence rather than on the research report's index alone.

## Context

**Evidence.** The research distillate already indexes the factories and the platform features (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/j-engine-research-report.md`, § C). The disclosure and overlay terrains map the Bootstrap plugin obligations (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/b-collapse-terrain-report.md` § B and § D; `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/b-modal-terrain-report.md` § B and § C). Read those three files first; this unit goes deeper than they did and re-reports nothing they already settle except where the deeper reading corrects them. `ls C:/Users/mikes/WebstormProjects/elements/src/browser/factories` lists `createAlert.ts createAside.ts createButton.ts createCarousel.ts createDetails.ts createDialog.ts createDrag.ts createDrop.ts createFocus.ts createForm.ts createMenu.ts createNav.ts createPointer.ts createPopover.ts createSelect.ts createTable.ts createTabs.ts createTheme.ts createToast.ts createTooltip.ts index.ts`. `ls C:/Users/mikes/WebstormProjects/mailbox/src/browser/factories` lists `createAlert.ts createButton.ts createCarousel.ts createCollapse.ts createDetails.ts createDialog.ts createDrag.ts createDrop.ts createDropdown.ts createFocus.ts createForm.ts createModal.ts createOffcanvas.ts createPointer.ts createPopover.ts createScrollSpy.ts createSelect.ts createTab.ts createTable.ts createTheme.ts createToast.ts createTooltip.ts index.ts`. `wc -l` reads `elements/src/browser/helpers.ts` at 2277 lines and `mailbox/src/browser/helpers.ts` at 907 lines.

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md` § Tedious work goes to Grok and § Roles; the rule files `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/writing.md` (the distillate's prose); skill: none; guide: `C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md` § Surface and § Compatibility (the shipped engine seed and the `engine` rows).

**Installed primitives.** Not this unit's subject; a sibling unit reads the `@orkestrel/*` declarations.

**Host.** Windows 11; the Cursor CLI's shell is allowlisted to `ls`, so read files by absolute path and run no other command. Working root: `C:/Users/mikes/WebstormProjects/scaffold`. Sibling checkouts: `C:/Users/mikes/WebstormProjects/elements` (tip `3b41900`), `C:/Users/mikes/WebstormProjects/mailbox` (tip `8b54542`), `C:/Users/mikes/WebstormProjects/veneer` (tip `746d3e9`). No network is needed and none is granted.

**Measurements.** None beyond the evidence row; every reading here is yours to take from the files.

**Control identifiers.** None.

**Standing conditions.** Every Elements and Mailbox factory imports `@vue/reactivity`, and the construction ruling refuses that import, the factory idiom, and the fixed transition fallback (`C:/Users/mikes/WebstormProjects/veneer/ROADMAP.md` § Rulings, the paragraph opening "Build every entity on explicit construction"). Report those mechanisms as they are; the design round decides what is taken and what is refused.

## Unknowns

- Whether a helper the two repositories share by name (`runTransition`, `lockBodyScroll`, `createFocus`, the dispatch helper) has the same semantics in both: report each pair as same, differs (with the difference), or present in one only.
- Whether any factory reads completion from the transition itself (`getAnimations`, `transitionend` without a timer, `transitioncancel`) rather than through a timer fallback: report every wait site with its mechanism.

## Scope

**Owned.** None (read-only).

**Shared (report-only).** None.

**Off-limits.** Every file; `dist/`, `node_modules/`, `tmp/`, and lockfiles are not read.

**What asserts the state this change ends.** None.

**Tools and limits.** Read files by absolute path; `ls` is the only shell command. No edits, no decisions, no design.

## Execution

**A bench engine reading this brief inside its own CLI:** perform the assignment directly and spawn nothing.

## Output

One distillate as your final message, in these sections, each fact with `file:line` (absolute path on first mention, then the repository-relative path):

- **A. Shared mechanisms.** For each of Elements and Mailbox: the event dispatch helper (event naming, `bubbles`/`cancelable`, how a cancelled pre-change event stops the change, how `detail` is typed), the transition-completion helper (what it listens for, the timer, what cancels it, what happens on `destroy` mid-transition), the focus trap (how focusables are found, Tab wrap, restore on deactivate, what an empty host does), the body scroll lock (what it writes, the counter, restore), the anchoring and placement helper (which CSS properties and attributes it writes, fallbacks, what it does on scroll or resize), the ownership and restore-on-destroy pattern (what a factory snapshots at construction and restores at destroy), delegation (whether any factory installs a document or root listener, and how it releases a host removed from the tree), and reduced-motion reads. One row per helper: name, path:line, what it does step by step, and its lesson comments.
- **B. Per obligation.** For Collapse, Dropdown, Tab, ScrollSpy, Modal, Offcanvas, Tooltip, Popover, Alert, Toast, Carousel, and the Backdrop, FocusTrap, ScrollBarHelper, Swipe, Sanitizer, and TemplateFactory utilities: the Elements factory and the Mailbox factory that carry it (or "none"), and for each the show sequence, the hide sequence, the cancel path, the focus path, the motion path (what is animated by CSS, what the script waits on), the classes and ARIA attributes written and restored, the keyboard map, the platform APIs called (`showModal`, `showPopover`, `popover` values, `position-area`, `IntersectionObserver` options, `matchMedia`), and the option surface (names, defaults). Where the two repositories differ, say how.
- **C. Lessons.** Every comment or guide sentence in `src/browser/factories/*.ts`, `src/browser/helpers.ts`, `src/browser/constants.ts`, and `guides/*.md` of each repository that records a lesson: grep for `because`, `never`, `refuse`, `lesson`, `fallback`, `workaround`, `bug`, `Chromium`, `Chrome`, `Safari`, `Firefox`, `unreliable`, `instead`. Quote each verbatim with its `file:line`, grouped by the obligation it bears on.
- **D. Contradictions.** Between the two repositories, between a comment and the code beside it, and between either and the research report's § C.
- **E. Unresolved inputs.** Every file or question the bound stopped you from reading, and every mechanism whose behaviour the code alone does not settle.

No raw file dumps, no design, no recommendation, no edits. Return the distillate as the final message; the launch journal is the run's record.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short hypothesis — when a named checkout or file cannot be read. Decide, record, and carry on from how to group a helper that serves two obligations.

## Acceptance criteria

1. Every section A to E is present, and every fact in A to C carries a `file:line`.
2. Every one of the eleven plugins and six utilities has a row in B, with "none" where a repository carries no factory.
3. Section A answers both Unknowns explicitly.

**Observations, not criteria.** None.

## Review evidence

The distillate; the Orchestrator verifies a sample of pointers against the files.
