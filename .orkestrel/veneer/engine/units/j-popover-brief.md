# Unit J-POPOVER — the Popover engine over the Tooltip, its template, and its proofs

## Role and engine

`opus` on Opus 5.5, reached as a native Claude subagent (Read, Grep, Glob, Edit, Write, Bash); the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/popover` (branch `unit/popover`, cut from Veneer `main` at POPOVER_BASE, the J-TOOLTIP landing; E14). The Orchestrator fills POPOVER_BASE at dispatch.

## Objective

`Popover` (`src/browser/Popover.ts`) conforms to `PopoverInterface` by extending `Tooltip`, selecting its profile through `new.target` (R12): its name, its event table, its behavioural defaults (`trigger.click` true and the others false, `placement.position` `right`, `placement.offset` `[0, 8]`, the popover template), and its two slots (`title` and `content`), so that the shared engine needs no protected member; with its default tables, its guard, its proofs on Chromium 153, and its guide subsection, so the `Popover` `plugin` row reads `shipped`.

## Context

**Evidence.** The J-TOOLTIP terrain distillate `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-tooltip-terrain-distillate.md` item 2 (the popover delta: defaults, the content getter, `_isWithContent`, the template, the factory fill) and Bootstrap 5.3.8's `node_modules/bootstrap/js/src/popover.js` (read for the behaviour, never for the names). The landed contract in `src/browser/types.ts`: `PopoverEventMap`, `PopoverHooks`, `PopoverClassMap`, `PopoverAttributeMap`, `PopoverSelectorMap`, `PopoverOptions`, `PopoverInterface` (around lines 1706 to 1850), every TSDoc sentence a requirement, and the `Tooltip*` declarations they extend. The landed `Tooltip.ts` (the engine you extend: its constructor's option resolution, `#build`, `#content`, `fill`, the door reads, the `descendants` shape, the arrow), `NativeSanitizer.ts`, the tip helpers in `helpers.ts`, and `constants.ts` (`TOOLTIP_*`, `SANITIZER_ALLOWLIST`). The guide `guides/veneer.md`: the `plugin` row whose text starts with `Popover:` (its Status, Proof, and Obligation cells are yours), `#### Tooltip` (the section you mirror and point at). The design verdict `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md` (R9, R10, R11, R12, R17, R19; the J-POPOVER row of § Units and routing: `Popover.ts`, `POPOVER_TEMPLATE`), `decisions.md` (E6, E11, E17), and the carried `Popover*` TSDoc mirror in `../plan.md` § Carried findings (the `show` refusal order and in-flight remark, the `fill` `@returns`, and `PopoverSelectorMap.arrow` with the `.popover-arrow` default), quoted in `j-tooltip-report-2.md`.

**Law.** As `j-tooltip-brief.md` § Law.

**Installed primitives.** As `j-tooltip-brief.md`, plus the landed `Tooltip` engine.

**Host.** As `j-tooltip-brief.md`.

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** As `j-tooltip-brief.md`, plus: `Popover extends Tooltip` and the base class reads its profile through `new.target` (R12), so `Tooltip.ts` changes only where the profile seam needs it (the profile record: the entity name for the `.vn.` wire and the registry, the default tables, the template, the slot selectors and their content keys, the `hint` or `manual` popover value); every such change is a `Tooltip.ts` edit this unit owns, and every Tooltip case stays green without other edits. `types.ts` is owned for the `Popover*` declarations and the profile seam's declarations only. The popover's tip is promoted with `popover="manual"` (R9), so its dismissal is the tooltip's click and focus interactions and Escape through the platform's manual behaviour is absent; state it.

**The obligations (each an edit and a proof; red first where the behaviour is new).**

- **POP1 The profile.** `Popover` selects its profile through `new.target`: the `popover` entity name (`show.vn.popover` and its siblings), `POPOVER_EVENTS`, `POPOVER_CLASSES` (`auto` default `bs-popover-auto`), `POPOVER_ATTRIBUTES` (`content` default `data-bs-content`), `POPOVER_SELECTORS` (`title` default `.popover-header`, `content` default `.popover-body`, `arrow` default `.popover-arrow`), `POPOVER_DEFAULTS` (`trigger.click` true, `hover` and `focus` false, `placement.position` `right`, `placement.offset` `[0, 8]`, the template `POPOVER_TEMPLATE`), and the `manual` popover value; a `Tooltip` constructed directly keeps its own profile.
- **POP2 Content.** The `content` option fills the `content` slot (`data-bs-content` as its attribute) and the `title` option the `title` slot; a popover has content when either slot has content (`_isWithContent`); `fill` merges by selector as the tooltip's does; an empty slot is removed (`.popover-header` or `.popover-body`), as Bootstrap's template factory removes it.
- **POP3 The carried TSDoc.** Apply the `Popover*` mirror patch from `j-tooltip-report-2.md` to `types.ts` (the `show` `@returns` order and in-flight remark, the `fill` `@returns`, `PopoverSelectorMap.arrow`), with its guide rows.
- **POP4 Declarations and guide.** The frozen tables, `isPopoverEvent`, the barrel and the export list; `#### Popover` after `#### Tooltip` pointing at the tooltip's sequences and stating only the profile's differences, the tables, the departures; the Popover fence; the `plugin` row's Status `shipped`, Proof `tests/src/browser/Popover.test.ts`, and the catalog's Obligation wording.
- **POP5 The instrument.** A whole-file mutation instrument (`tmp/j-popover/mutations.py`, the W2 shape) with one row per pinned behaviour: each profile field, the two-slot content rule, the empty-slot removal, the manual promotion, the click default, the offset default.

**Departures the guide lists.** The `.vn.` names; `content` as an option and attribute; the profile through `new.target` rather than a subclass override set; every other departure you find against `popover.js`.

## Unknowns

1. The profile seam's exact shape in `Tooltip.ts` (a static profile record per constructor, read through `new.target`): rule, implement with the smallest change to `Tooltip.ts`, and record.

## Scope

**Owned.** `src/browser/Popover.ts` (new), `tests/src/browser/Popover.test.ts` (new); `src/browser/Tooltip.ts` for the profile seam only, with `tests/src/browser/Tooltip.test.ts` for a profile case; in `constants.ts` the `POPOVER_*` rows; in `validators.ts` `isPopoverEvent` with its rows; `index.ts` and `index.test.ts`; `types.ts` for the `Popover*` declarations and the seam; `guides/veneer.md` in `#### Popover`, the § Surface rows, the fence, and the Popover `plugin` row; `tmp/j-popover/**`.

**Shared (report-only).** `tests/setupBrowser.ts`; `ROADMAP.md`.

**Off-limits.** Every other engine file; `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/src/styles/**`, `tests/service/**`, `src/styles/**`, `app/**`, `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `configs/**`.

**What asserts the state this change ends.** `tests/src/browser/index.test.ts` (owned); `tests/guides.test.ts` read-only, closed through the guide; `tests/conformance.test.ts` read-only; `tests/policy.test.ts` read-only. Search bound: `grep -rn "popover\|Popover\|POPOVER" src tests/src/browser guides/veneer.md` at dispatch (the `popover` attribute and the `PlacementInput.popover` member are the platform's word and stay).

**Tools and limits.** As `j-offcanvas-brief.md`, with `tmp/j-popover/` as the log home and `npm run check` a criterion.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

As `j-tooltip-brief.md`.

## Deviation contract

As `j-tooltip-brief.md`, plus: stop on a profile seam that needs a protected member or a second copy of a tooltip sequence.

## Acceptance criteria

As `j-offcanvas-brief.md` with `Popover` in place of `Offcanvas`, and the Tooltip suite green without other edits.

## Review evidence

As `j-tooltip-brief.md`.
