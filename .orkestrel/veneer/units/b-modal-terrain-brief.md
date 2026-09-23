# Terrain brief — B-MODAL … B-CAROUSEL (Cursor Grok, read-only)

Route `grok` on Cursor Grok (`grok-4.7-high`), `--mode=ask`, read-only, rooted at `/home/user/veneer`
(the session branch tip `87ff1d0`; CLOSE-GUIDE has not landed, so `guides/veneer.md`,
`tests/guides.test.ts`, and `tests/src/styles/integration.test.ts` will move after this reading;
cite every site by symbol or heading and give a line only as approximate). Perform the reading
directly and spawn nothing. Capture `git status --porcelain` before and after; any change is a
deviation. Return evidence with `file:line` pointers and no raw file dumps, no decisions, no design,
no edits. Never read `dist/`, `node_modules/bootstrap/dist/`, `tmp/`, or a lockfile. Quote at most
twelve lines per site. Your shell allows `ls` and `git status`; do not run `git show`.

## Question

What does the overlays and feedback family B-MODAL … B-CAROUSEL require, and what does each site say
today? Under ruling D41 (`ROADMAP.md` § Rulings, the last bullet; § Phases and units, the
B-MODAL … B-CAROUSEL row) the family ships the cascade keys `modal`, `offcanvas`, `tooltip`,
`popover`, `alert`, `toast`, and `carousel` with every state class rendered statically, and the
plugin obligations and the `Backdrop`, `FocusTrap`, `ScrollBarHelper`, `Swipe`, `Sanitizer`, and
`TemplateFactory` utilities are J-ENGINE's. The pinned inventory (`tests/fixtures/oracle/inventory.json`,
per-key `selectors` objects) records `modal` with 56 selectors, `offcanvas` 112, `tooltip` 21,
`popover` 49, `alert` 13, `toast` 8, and `carousel` 41 (the Orchestrator's count on 2026-09-23).
The disclosure family's terrain at
`/home/user/scaffold/.orkestrel/veneer/units/b-collapse-terrain-report.md` already covers the
shipped engine (§ C), the four disclosure plugins (§ B), and the shipped styles pattern (§ E): read
it first and do not repeat what it settles; report what this family adds.

## Evidence sought

A. **The oracle surface per key.** From `node_modules/bootstrap/scss/` `_modal.scss`,
   `_offcanvas.scss`, `_tooltip.scss`, `_popover.scss`, `_alert.scss`, `_toast.scss`, and
   `_carousel.scss` (there is no `_toast.scss`; find where the toast rules live, `_toasts.scss`
   or another file): per key the selector list, the custom-property list, every keyframe, every
   `[data-bs-theme="dark"]` retune, every `prefers-reduced-motion` branch, every
   `@include media-breakpoint-*` loop (the responsive offcanvas and modal sizes), every
   `/* rtl:` comment, the `.fade` and `.show` and `.showing` and `.hiding` state classes each
   key reads, the `.modal-backdrop` and `.offcanvas-backdrop` surfaces, the tooltip and popover
   arrow rules (`.tooltip-arrow`, `.popover-arrow`, the `[data-popper-placement]` attribute
   selectors), the carousel's `.carousel-item-next`, `-prev`, `-start`, `-end`, `.carousel-fade`,
   and the control and indicator SVG data URIs. Name every rule that exists only for the engine
   (a class the plugin adds mid-transition) so the static design can rule it.
B. **The plugin obligations, for J-ENGINE.** From `node_modules/bootstrap/js/src/` `modal.js`,
   `offcanvas.js`, `tooltip.js`, `popover.js`, `alert.js`, `toast.js`, `carousel.js`, and
   `util/backdrop.js`, `focustrap.js`, `scrollbar.js`, `swipe.js`, `sanitizer.js`,
   `template-factory.js`: per plugin, a table of obligation → `file:line` covering the data
   attributes read, the config defaults and their types, the public methods, the events fired
   (mark the cancelable pre-change one), the keyboard keys, every ARIA attribute written, the focus
   moves (the focus trap), how transition completion is read, what tooltip and popover take from
   Popper, the backdrop and scrollbar mechanisms (what `scrollbar.js` measures and writes on
   `body` and fixed elements), the swipe thresholds, the sanitizer allowlist shape, and what each
   plugin does on `dispose`.
C. **Elements and Mailbox.** In `/home/user/elements/src/browser/factories/` (`createDialog`,
   `createAside`, `createTooltip`, `createPopover`, `createAlert`, `createToast`, `createCarousel`,
   `createDrag`, `createFocus`) and `/home/user/mailbox/src/browser/factories/` (`createModal`,
   `createOffcanvas`, `createDialog`, `createTooltip`, `createPopover`, `createAlert`,
   `createToast`, `createCarousel`, `createDrag`, `createFocus`): each as `file:line` with two lines
   on what it does and which of lifecycle, cancellation, focus, motion, placement, and cleanup it
   covers; whether it uses `<dialog>`, `showModal`, the `popover` attribute, `inert`, CSS anchor
   positioning, `scroll-snap`, `IntersectionObserver`, `ResizeObserver`, or `matchMedia`; and the
   Elements guide sections ruling on the appearance or motion of these components
   (`/home/user/elements/guides/`: grep `dialog`, `aside`, `tooltip`, `popover`, `alert`, `toast`,
   `carousel`).
D. **What the tree already carries.** Grep `modal`, `offcanvas`, `tooltip`, `popover`, `alert`,
   `toast`, `carousel`, `backdrop`, `fade` under `src/`, `app/`, `tests/`, and `guides/veneer.md`:
   every shipped rule, token (`--vn-stack-*`, `--vn-hint-*`, `--vn-dialog-*`, `--vn-drawer-*`,
   `--vn-toast-*` and the like in `src/styles/_tokens.scss`), departure or addition row, deferred
   selector row, compatibility row, and § Carriers row (quote each row whole), and the guide's
   § Tokens rows for the stack ladder.
E. **Rulings.** `ROADMAP.md` § Tenets and § Rulings paragraphs naming an overlay, a backdrop,
   focus, motion, `z-index`, or stacking (quote); the exit criterion items 2, 3, 4, and 7; every
   decision in `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md` naming one of
   these components, an overlay, or the stack ladder (quote its number and text).
F. **Sizing.** Line counts of each source in A and B; the inventory's selector count per key as
   given, plus each key's keyframe and media counts read from the inventory.
G. **Files the family makes false.** The same enumerating assertions the disclosure terrain § H
   lists (name them again briefly), plus any that name an overlay: the journey's hanging-element
   branch in `tests/app/browser/integration.test.ts` (the tooltip-keyed branch around the comment
   "hanging key"), `tests/setup.ts` frame grammar for a subject that overflows or covers the page,
   and the capture variants under `configs/app/`.

## Output

One distillate with a section per lettered item, each fact with a `file:line` pointer (line
approximate, symbol or heading named), contradictions between the guide, the roadmap, and the code
called out, and a closing list of unresolved inputs. No design, no recommendation, no edits.
