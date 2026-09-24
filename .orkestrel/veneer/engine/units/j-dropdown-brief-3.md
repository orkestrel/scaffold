# J-DROPDOWN — round 3 brief (successor to `j-dropdown-brief-2.md`, which stays in place unedited)

What changed and why: round 2 was audited by the analyst on GPT-6 Astra and the checker; the reconciled verdict `j-dropdown-audit-2-verdict.md` fails claims 2, 3, and 7 and carries one finding outside the claims. This round closes them in the same worktree, before the merge of `main` (the landing round is round 4, after ScrollSpy lands). Items A and B are mechanism fixes with red-first proofs; item C retargets one instrument row; item D is the instrument and the gates.

## Role and engine

`opus` on Opus 5.5 (native subagent, effort high), the writer of rounds 1 and 2, resumed in the same worktree.

## Objective

A dropdown whose `destroy()` returns only after every write its placement owns is restored, whatever call is in flight; a delegate arrow route that writes nothing after a listener destroys the delegate; an instrument whose entry-selector row binds entry navigation.

## Context

- Tree: `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/dropdown`, branch `unit/dropdown` from `e24e2c3`, uncommitted, `main` not merged. Do not merge, commit, install, or run a discarding git command. Veneer `main` moved to `f377579` (the Alert and Tab landings); the round-4 landing brief carries that merge, the fold of `computeNeighbor`, and E16's `isDisabled` (which the Tab landing placed in `helpers.ts`). Do none of that here.
- Sources under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`: `j-dropdown-audit-2-verdict.md` (the rulings), `j-dropdown-audit-2-objective-verdict.md` (claims 2 and 3, F1, with the sites they name), `j-dropdown-audit-claims-2.md`, your `j-dropdown-report-2.md`, `../decisions.md` (E12, E15, E16). Bootstrap's `node_modules/bootstrap/js/src/dropdown.js` and `util/index.js` in the worktree.
- Host facts as in round 2: Chromium 153.0.8010.12; `npm ci` fails `EPERM` in the worktree, so run no install; the packages are installed from `e24e2c3`'s lockfile. The `prove` MCP server is not reachable from a subagent; record that no call was made.

## Items

**A. Destruction during the placement's restoration completes it before returning (claim 2).** Today `#conceal` clears `#placement` and then calls `placement.destroy()`; `Placement.destroy` aborts its controller (removing its listener on the dropdown's signal), then `hidePopover()` dispatches the menu's closing `beforetoggle` synchronously, and a listener there that calls `dropdown.destroy()` returns after restoring only the dropdown's snapshot, so the placement's `#snapshot.restore()` writes the menu's `popover` and side attributes after the dropdown's `destroy()` returned. Requirement: when `Dropdown.destroy()` returns, the placement's restoration is complete and nothing the placement owns is written afterwards, on every path: a destroy from a `beforetoggle` or `toggle` listener during `hide()`, during `show()`'s promotion, and during `destroy()` itself. Suppressing the restoration is not a fix (owned state would be left behind). The shape is yours; the constraints are that `Placement.destroy` is idempotent and safe to re-enter (a nested call completes the pending restoration, and the outer call, resuming, writes nothing more), and that the dropdown keeps responsibility for the placement until its restoration has finished (clear `#placement` after `destroy()` returns, or have `Dropdown.destroy` drive the pending restoration). Red first: a case in `Dropdown.test.ts` that shows a dropdown, installs a menu `beforetoggle` listener for the closing transition (`event.newState === 'closed'`) that calls `dropdown.destroy()` and then observes the menu's attributes (a `MutationObserver` on the menu, or a read of the `popover` and side attributes and the observed positioning styles immediately after `destroy()` returns), calls `hide()`, and asserts that the attributes and styles are restored when `destroy()` returns and that no mutation record arrives afterwards (flush with `await` of a microtask and a frame). Run it red before the fix and record the failing output. Add a `Placement.test.ts` case for the nested destroy alone. Instrument rows: restore the old order (clear `#placement` before the destroy) and remove the nested-completion step, each reddening its named case.

**B. The arrow route reads the delegate's lifetime after `show()` (F1).** In `Delegate.#routeDropdownKey`'s vertical branch, after `void engine.show()`, return when `this.#controller.signal.aborted`, before the entries are read; keep navigation when `show()` resolves `false` because the menu is already open (a `false` alone is not a reason to stop). Red first: a case in `Delegate.test.ts` that constructs a dropdown directly on a toggle inside the root, constructs a delegate over the root, adds a `shown.vn.dropdown` listener that destroys the delegate and focuses another connected button, dispatches a trusted-shaped ArrowDown from the toggle, and asserts `document.activeElement` is that other button and the dropdown (which the delegate never owned) is still alive and shown. Run it red before the fix. Instrument row: drop the lifetime read, reddening that case by name.

**C. The entry-selector row binds entry navigation (claim 3).** Retarget the row "the delegate navigates by the default entry selector" to mutate only the entry selector at the navigation site in `Delegate.ts` (replace the supplied `entry` read with the default entry selector, keeping `trigger` and `menu` as supplied), so its named case "routes dropdown clicks by a replaced trigger selector" fails at the focus assertion and not at the acquisition assertion. Record the failing assertion's line in the report.

**D. The instrument and the gates.** `tmp/j-dropdown/mutations-3.py` writes `tmp/j-dropdown/mutations-3.log.txt`; it keeps every round-2 row (re-anchored where the round-3 text moves; name each re-anchored row in the report), retargets item C's row, and adds the rows of items A and B; the full run reads every row `EXACT` or `JOINED`, the `GREEN?` rows at 0 failed, and `receipt: restored byte for byte`. Then the chain in the worktree, each exit 0: `npm run check:src:browser`; `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser`; `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md`; `npm run test:src:browser`; `npm run test:guides`; `npm run test:policy`; the three builds; `npm run test:conformance`; `npm run test:setup`. Log to `tmp/j-dropdown/acceptance-3/` through `acceptance-3.sh`. Where a guide sentence under `#### Dropdown` describes the destruction or the key route in a way item A or B makes false, correct it in the same voice; add no sentence otherwise.

## Scope

Owned: `src/browser/Dropdown.ts`, `src/browser/Placement.ts`, `src/browser/Delegate.ts` (the dropdown key route and the class remarks only), `src/browser/types.ts` (TSDoc of `destroy` on the placement and the dropdown, only where item A changes what it states), `tests/src/browser/Dropdown.test.ts`, `tests/src/browser/Placement.test.ts`, `tests/src/browser/Delegate.test.ts`, `guides/veneer.md` (the `#### Dropdown` sentences item D names), `tmp/j-dropdown/**`. Off-limits: everything else, every vendored file, `ROADMAP.md`. No install, no commit, no merge, no discarding git command.

## Execution

Perform the assignment directly and spawn nothing. Record that no `prove` call was made.

## Output

Your final message: per item, the red run's failing case titles and the mechanism as landed (the order of the destroy path in one sentence each for `#conceal`, `Dropdown.destroy`, and `Placement.destroy`); the retargeted row and the assertion its case now fails at; the instrument summary (rows, re-anchored rows named, `GREEN?` counts, the receipt line); the gate table; `git status --short` and the diffstat; the deviation state.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol. You settle yourself: the shape of the re-entrant destroy (a completion flag, a pending-restoration method, or the order of the snapshot restore and `hidePopover()`), the fixture of the new cases, and where the `Placement.test.ts` case sits. Stop and report if closing item A requires a change in `HostSnapshot.ts` or in any off-limits file, with the exact write you would need.
