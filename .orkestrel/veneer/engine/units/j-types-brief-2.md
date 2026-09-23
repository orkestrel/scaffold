# Unit J-TYPES — successor brief 2: the fix round after audit round 1

This brief supersedes `j-types-brief.md` for the unit's second round. What changed and why: audit round 1 (`j-types-audit-verdict.md`, terminal line `FAIL 3, 4, 6, 7, 9; outside the claims: F1`) broke five claims and carried one finding, three referral rulings, and five wording bounds; every one of them is a contract edit in the files this unit owns, so the same unit repairs them in the same worktree, on top of its round-1 change, which stays uncommitted there. The round-1 brief's objective, law, host, measurements, scope, and tools stand unless a section here restates them.

## Role and engine

`opus` on Opus 5.5, reached as a native Claude subagent with `Read`, `Grep`, `Glob`, `Edit`, `Write`, and `Bash`. The executor that opens this brief is that subagent, the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer-types` (branch `unit/types`, base `376d84a` of Veneer `main`), whose tree already carries round 1's edits to `src/browser/types.ts` and `guides/veneer.md`, uncommitted.

## Objective

Apply the edits E1 to E10 that follow, each closing the round-1 item it names, so that every contract in `src/browser/types.ts` states its entity's own Bootstrap options and defaults, every state-changing verb returns `Promise<boolean>` with a refusal list the Bootstrap source supports, and the guide's § Surface rows and § Methods tables agree with the doc blocks.

## Context

**Evidence.** Round 1's report `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-report.md` (its "Rulings taken" list); the reconciled verdict `j-types-audit-verdict.md` beside it, with the two lane verdicts `j-types-audit-objective-verdict.md` and `j-types-audit-subjective-verdict.md`; the design verdict `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md` (R6, R9, R11, R12). Bootstrap 5.3.8's source at `C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/`; the lines this brief cites were opened by the Orchestrator on 2026-09-23 and locate by the construct named, so read the construct, not the number alone. The Orchestrator's round-1 scoped runs: `j-types-gates.log.txt` (every check green on the round-1 tree).

**Law.** As in `j-types-brief.md` § Context: `AGENTS.md`; `.claude/rules/names.md` (§ General vocabulary: external-spec literals remain unions; a boolean is an adjective or past participle; properties are nouns), `typescript.md` (§ TSDoc: the `-s` verb opening on every top-level export; a boolean member described as "If `true`, …; if `false`, …"; "Default: …"; "Thrown when …"), `patterns.md` § Options (an inline group with one use stays inline), `architecture.md`, `documentation.md` § Parity, `writing.md`; skill: none.

**Rulings this round applies.** From `j-types-audit-verdict.md`: `static` stays on the mechanism's `PlacementOptions` and R9 is unchanged (R1); Offcanvas listens on `backdrop.element`, so `BackdropInterface` gains no member (R2); `dismiss.backdrop` applies only while `backdrop` is `true` (R3); `ButtonHooks` migrates here rather than in J-BINDER (R4); Tooltip's and Popover's `show` on a settled shown tip rebuilds it as Bootstrap's does, and the `display: none` case resolves `false` where Bootstrap throws, recorded as a departure in the `@remarks`.

**Host.** As in `j-types-brief.md`: Windows 11, Git Bash, the worktree root, npm `12.0.2`, no network; `npm run test:guides` takes about a minute; `oxfmt` re-pads a Markdown table when a column widens, so produce a reformatted guide on a scratch copy and read the diff before copying it in, as round 1 did.

**Standing conditions.** The worktree is dirty with round 1's two modified files and must stay so; commit nothing. `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored and off-limits. The cascade keys `collapse`, `dropdown`, and `nav` have landed on Veneer `main` since round 1; nothing in this unit reads them.

## The edits

Each edit names the round-1 item it closes. Where an edit fixes a sentence's substance, the exact wording is yours inside the TSDoc rules; where it fixes a shape, the shape is fixed here.

- **E1 (claims 3 and 4). Per-entity placement groups.** Replace `TooltipOptions.placement?: PlacementOptions` with an inline group `{ position?: PlacementPosition; offset?: readonly [number, number]; fallbacks?: readonly PlacementPosition[] }`, each leaf's TSDoc naming the Bootstrap option it mirrors (`placement`, `offset`, `fallbackPlacements`; `tooltip.js` `Default`, around lines 58 to 79) and stating Tooltip's default (`top`; `[0, 6]`; `top`, `right`, `bottom`, `left`), and the group's TSDoc positioning the tip against its trigger; `PopoverOptions` keeps its `@remarks` on the differing defaults (`right`, `[0, 8]`). Replace `DropdownOptions.placement?: PlacementOptions` with an inline group `{ offset?: readonly [number, number]; static?: boolean }`, `offset` mirroring Bootstrap's `offset` (default `[0, 2]`, `dropdown.js` `Default`, around lines 71 to 78) and `static` mirroring `display: 'static'` (default `false`), the group's TSDoc stating that the side comes from the direction classes and `--bs-position` (R9). `PlacementOptions` stays the mechanism's construction options with `position`, `offset`, `fallbacks`, and `static`, its summary stating that the owning component passes the values it resolved, and its leaf defaults staying the mechanism's own.
- **E2 (claim 9).** Replace `PlacementInput.hint?: boolean` with `readonly popover?: 'manual' | 'hint'`, its TSDoc naming the HTML `popover` attribute the element is promoted with (`manual` for a menu or a popover tip, `hint` for a tooltip tip; R9), "Default: `manual`". The `auto` value stays out.
- **E3 (claim 6).** `TooltipInterface.fill` and `PopoverInterface.fill` return `Promise<boolean>`. The `@returns` sentence: resolves `true` after the content is written and, when the tip is shown, after the rebuilt tip's `shown` event; `false` when the tip is shown and the rebuild's `show` is refused (the tooltip is disabled or has no content, the trigger is not connected to its document, or a listener prevented `show`), or the tooltip is destroyed. Source: `setContent` in `tooltip.js` (around lines 326 to 331) and the early returns of `show()` (around lines 184 to 199).
- **E4 (claim 7a, 7b).** `TooltipInterface.show` and `PopoverInterface.show` `@returns`: drop "the tip was shown"; the list is: the tooltip is disabled or has no content, the trigger is not connected to its document, a listener prevented `show`, a transition was in flight, or the tooltip is destroyed. Add a `@remarks` paragraph: a settled shown tip is rebuilt, as Bootstrap's `show` does; Bootstrap throws for a trigger whose inline `display` is `none`, and this contract resolves `false` instead. Keep `toggle`'s sentence.
- **E5 (claim 7d).** `CollapseInterface.show` `@returns`: "a transition was in flight on the panel or on an open accordion sibling" (`collapse.js`, the `activeChildren[0]._isTransitioning` check, around line 125).
- **E6 (claim 7c).** `CarouselInterface.next` and `previous` `@returns`: replace "the last item is active without wrapping" (and the mirror on `previous`) with a refusal that names the computed following (preceding) item being the active item, which is the end without wrapping or a single item (`carousel.js` `_slide`, the `nextElement === activeElement` return, around line 309).
- **E7 (F1).** Rename `ScrollSpyInterface.active` to `link`; its summary stays "Reads the active link, or undefined when no section is in view." Grep the guide and the types file for `spy.active` and `.active` on a scrollspy and update any fence or sentence that names it.
- **E8 (R4).** Replace the `ButtonHooks` interface with `export type ButtonHooks = EventHooks<ButtonEventMap>`, its doc block unchanged in text, and change its § Surface row's `Kind` cell from `interface` to `type`, as the `CollapseHooks` row reads. `ButtonOptions.on` keeps its type.
- **E9 (bounds).** `CarouselDetail.from` and `to` open with "Carries the position …" (they are readonly event fields). The `SanitizeTargetInterface` summary becomes a sentence without the toolchain clause, such as "Describes a node whose `setHTML` method parses markup through a sanitizer.", and its `@remarks` names TypeScript 6.0.3 as the version whose DOM library declares `Sanitizer` and `setHTMLUnsafe` and omits `setHTML`. `BackdropInterface.destroy` opens "Removes the backdrop element at once and abandons a fade in flight." `DismissOptions.backdrop` states that it applies while the `backdrop` option is `true` (`modal.js`, the click-dismiss listener around lines 228 to 241; `offcanvas.js` `_initializeBackDrop`, around lines 168 to 185).
- **E10 (parity).** For every doc block E1 to E9 change, update the matching § Surface `Summary` cell and § Methods row so `npm run test:guides` stays green; the `PlacementOptions` row, the `ButtonHooks` row, and the `SanitizeTargetInterface` and `BackdropInterface` rows are the ones round 1's edits reach at the Surface, and the `TooltipInterface`, `PopoverInterface`, `CollapseInterface`, and `CarouselInterface` tables are the ones a changed first paragraph would reach (a changed `@returns` alone changes no row).

## Unknowns

1. Whether any guide fence or § Examples sentence names `PlacementOptions` through a component's `placement` option, `hint`, or a scrollspy's `active` getter: grep before editing and report each hit and its resolution.
2. Whether the widened or narrowed Summary column re-pads the § Surface table again: produce the formatted guide on a scratch copy as round 1 did and report the hunks.

## Scope

**Owned.** `src/browser/types.ts`; in `guides/veneer.md`, the § Surface rows and § Methods tables of the contracts this unit declares (round 1's and this round's), and the `ButtonHooks` row's `Kind` cell.

**Shared (report-only).** None. `tests/src/browser/index.test.ts` stays unmoved (a type-only change); confirm with `npm run test:src:browser -- tests/src/browser/index.test.ts` and report the reading.

**Off-limits.** Every other file, as in `j-types-brief.md` § Scope: `src/core/**`, every other `src/browser/*.ts` file, `tests/**` (the vendored `tests/setupPolicy.ts` and `tests/policy.test.ts`, `tests/setup.ts`, `tests/setupBrowser.ts` included), `src/styles/**`, `app/**`, `configs/**`, `vite.config.ts`, `tsconfig.json`, `package.json`, the lockfile, `ROADMAP.md`, `README.md`, and every guide section outside the rows and tables named under Owned.

**Tools and limits.** As in `j-types-brief.md`: no install, no commit, no push, no `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`, no tree-wide `format`, `lint --fix`, or `build`; validate read-only and scoped with `npm run check:src:browser`, `npx oxlint --config .oxlintrc.json --deny-warnings src/browser/types.ts`, `npx oxfmt --config .oxfmtrc.json --check src/browser/types.ts guides/veneer.md` (`--write` on your own `src/browser/types.ts` only, never on the guide in place), `npm run test:guides`, `npm run test:policy`.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Write the report to `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/j-types-report-2.md` and return its path with a five-line summary. The report carries: per edit E1 to E10, the round-1 item it closes and the exact declaration or sentence after the edit; the rulings you took inside the owned scope, one line each with the rule that bounds it; the output of every acceptance command verbatim; the type-level probe under § Acceptance criteria with its exact diagnostics; the answers to the Unknowns; `git status --short` and `git diff --stat` in the worktree; and the full diff of this round against round 1's tree (`git diff` shows both rounds together, so also state which hunks are this round's). No process diary.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol. Ancillary choices you settle yourself: the exact wording of every sentence E1 to E9 leave to you, the order of the inline group leaves, and whether a `@remarks` paragraph or a second sentence carries a departure. Stop and report when an edit would move a shape this brief fixes, when an off-limits file must change to keep `npm run test:guides` green, or when a fence outside the owned rows names a renamed member.

## Acceptance criteria

1. `npm run check:src:browser` exits 0 in the worktree.
2. `npx oxlint --config .oxlintrc.json --deny-warnings src/browser/types.ts` exits 0, and `npx oxfmt --config .oxfmtrc.json --check src/browser/types.ts guides/veneer.md` exits 0.
3. A type-level probe compiled with `npx tsc --noEmit --strict --exactOptionalPropertyTypes --lib ESNext,DOM` against the worktree's `types.ts` reports exactly these refusals and compiles every control line: a `TooltipOptions` value with `placement: { static: true }` fails (`TS2353`); a `DropdownOptions` value with `placement: { position: 'top' }` fails (`TS2353`); a `PlacementInput` value with `popover: 'auto'` fails (`TS2322`); a `TooltipInterface` value whose `fill` returns `void` fails; a `ButtonHooks` value is assignable to and from `EventHooks<ButtonEventMap>`; a `ScrollSpyInterface` value with an `active` member fails and one with `link: undefined` compiles; a `DropdownOptions` value with `placement: { offset: [0, 2], static: true }` and a `TooltipOptions` value with `placement: { position: 'top', offset: [0, 6], fallbacks: ['top'] }` compile.
4. `grep -n "hint" src/browser/types.ts` returns only the `'manual' | 'hint'` union and its TSDoc; `grep -n "readonly active" src/browser/types.ts` returns only `TabInterface.active`; `grep -n "placement?: PlacementOptions" src/browser/types.ts` returns nothing; `grep -n "fill(content" src/browser/types.ts` returns two `Promise<boolean>` signatures.
5. `npm run test:guides` passes and `npm run test:policy` passes, each reported verbatim.

**Observations, not criteria.** `npm run test:src:browser -- tests/src/browser/index.test.ts` (the Orchestrator takes the authoritative run).

## Review evidence

The actual diff and the actual `git status --short` of the worktree, which the Orchestrator captures beside this brief as `j-types-2.diff` and `j-types-2-status.txt`, and the report named under Output.
