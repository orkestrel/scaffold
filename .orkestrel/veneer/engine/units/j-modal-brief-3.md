# J-MODAL — round 3 brief (successor to `j-modal-brief-2.md`, which stays in place unedited)

What changed and why: round 2 was audited by the analyst on GPT-6 Astra and the checker; the reconciled verdict `j-modal-audit-2-verdict.md` fails claims 2, 5, and 8 and carries one finding outside the claims (O1). This round closes them in the same worktree, before the merge of `main` (the landing round is round 4, after Carousel lands). Item A is a mechanism fix with a red-first proof; item B is three sentences and one contract; item C is a report correction; item D is the instrument and the gates.

## Role and engine

`opus` on Opus 5.5 (native subagent, effort high), the writer of rounds 1 and 2, resumed in the same worktree.

## Objective

A modal whose scroll lock cannot outlive it when a reaction to the lock's own compensation destroys the modal, with the guide and the return contracts saying what the code does.

## Context

- Tree: `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/modal`, branch `unit/modal` from `e24e2c3`, uncommitted, `main` not merged. Do not merge, commit, install, or run a discarding git command. Veneer `main` is at `7dd4e17` (Alert, Tab, ScrollSpy landed; Dropdown landing, Carousel next); the round-4 landing brief carries that merge and the fold of `#closest`, `#construct`, the `#driven`-aware modal route into the landed delegate, and E16's `isDisabled`. Do none of that here.
- Sources under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`: `j-modal-audit-2-verdict.md` (the rulings), `j-modal-audit-2-objective-verdict.md` (claims 2 and 5 with the sites they name, O1 with its interleaving), `j-modal-audit-2-checker-verdict.md`, `j-modal-audit-claims-2.md`, your `j-modal-report-2.md`, `../decisions.md` (E12, E13, E15, E16), and the Placement signal shape in the Dropdown unit's `j-dropdown-2.diff` (`PlacementOptions.signal`, the lifetime read after each promotion write) beside your own `IsolationOptions.signal`. Bootstrap's `node_modules/bootstrap/js/src/modal.js`, `util/scrollbar.js`, `util/config.js`, and `dom/manipulator.js` (`normalizeData`) in the worktree.
- Host facts as in round 2: Chromium 153.0.8010.12; `npm ci` fails `EPERM` in the worktree, so run no install. The `prove` MCP server is not reachable from a subagent; record that no call was made.

## Items

**A. The lock under the modal's lifetime (O1).** `Modal.show` constructs the `ScrollLock` before assigning `#lock`; the lock registers its holder, hides the body's overflow, and writes each compensated element's `padding-right` through `setProperty`, which runs custom-element reactions before it returns; a reaction that calls `modal.destroy()` finds `#lock` undefined and releases nothing, and the construction resumes, compensates further elements, and returns the lock into a destroyed modal. Requirement: when `destroy()` returns, no lock the modal took remains registered and no compensation the modal caused stays written, on every path including a destroy from a reaction to the lock's own first write. Shape: add `signal?: AbortSignal` to `ScrollLockOptions` (`types.ts` is granted for this), read in the lock after each reaction-capable write (the body's overflow, each element's padding) so an aborted signal releases what this holder took and stops compensating, and bind `abort` to the release as `Isolation` does; the modal passes its controller's signal and, when `#holds(true)` fails after the construction returns, releases the lock it constructed; keep the first holder's selectors and the shared reference count. Red first: a full-width custom element the `fixed` selector names whose reaction to its `style` attribute (armed after the fixture is set) calls `modal.destroy()`; construct the modal with `backdrop: false` and `focus: false`, call `show()`; assert it resolves `false`, the body's overflow and padding are restored, the element carries no padding the lock wrote, and `ScrollLock` holds no holder for the document (a second modal on the same document takes a fresh lock and restores at its release). Instrument rows: "the lock ignores its signal" and "a constructed lock is kept after the door fails", each reddening its named case; add a `ScrollLock.test.ts` case for the signal alone with its row.

**B. Sentences and the contract (claim 5).** (i) Under `#### Modal`, the Bootstrap departure describes normalization then validation: Bootstrap normalizes `data-bs-backdrop` first (`normalizeData`: `true`, `false`, numbers, JSON such as `[]`) and then requires a boolean or a string, throwing a `TypeError` otherwise, so an empty value, `null`, a number, or JSON that parses to an object fails, and only a value that stays a string after normalization reads as a backdrop that hides on a press (`static` excepted); Veneer accepts `0` and `1`. (ii) The `static` sentence: cancellation of `prevent.vn.modal` does not veto the bounce, while the lifetime and state guards still apply (a hide inside the hook stops it). (iii) The `@returns` of `show` and `hide` in `types.ts` and their guide rows: `false` when another write changed the host's `shown` token at a door the call read before it dispatched its completed event; a hide a `shown` hook completes synchronously does not turn the show's `true` into `false` (completed-event re-entry starts a new change); the door paragraph under `#### Modal` says the same. `test:guides` green.

**C. The attribution (claim 2).** In your round-3 report, correct round 2's attribution: the original red of "bounces without moving focus when focus is false" failed in the harness's `pressKeys` because nothing was focused, so it did not bind the bounce's focus behaviour; the case is bound by its `EXACT` mutation row ("the bounce focuses under focus false"), and the round-3 red-first table lists it as mutation-bound, not red-first. No code change.

**D. The instrument and the gates.** `tmp/j-modal/mutations-4.py` writes `tmp/j-modal/mutations-4.log.txt`; it keeps every row of `tmp/j-modal/mutations-3.py` (re-anchored where the round-3 text moves; name each re-anchored row in the report) and adds item A's rows; the full run reads every row `EXACT` or `JOINED`, the `GREEN?` rows at 0 failed, and `receipt: restored byte for byte`. Then the chain in the worktree, each exit 0: `npm run check:src:browser`; `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser`; `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md`; `npm run test:src:browser`; `npm run test:guides`; `npm run test:policy`; the three builds; `npm run test:conformance`; `npm run test:setup`. Log to `tmp/j-modal/gates-3.log.txt` through `gates.sh`.

## Scope

Owned: `src/browser/Modal.ts`, `src/browser/ScrollLock.ts`, `src/browser/types.ts` (items A and B only), `tests/src/browser/Modal.test.ts`, `tests/src/browser/ScrollLock.test.ts`, `guides/veneer.md` (the `#### Modal` sentences item B names and the `ScrollLockOptions` § Surface row), `tmp/j-modal/**`. Off-limits: everything else (`Delegate.ts`, `Isolation.ts`, `Backdrop.ts`, `HostSnapshot.ts`, every vendored file, `ROADMAP.md`). No install, no commit, no merge, no discarding git command.

## Execution

Perform the assignment directly and spawn nothing. Record that no `prove` call was made.

## Output

Your final message: item A's red run (the failing case titles) and the mechanism as landed (where the lock reads the signal, what the release restores, the modal's door after the construction); the three sentences and the contract before and after; the attribution correction; the instrument summary (rows, re-anchored rows named, `GREEN?` counts, the receipt line); the gate table; `git status --short` and the diffstat; the deviation state.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol. You settle yourself: whether the lock's signal read sits after every element's write or after each batch, the fixture of the new cases, and the wording within item B's rules. Stop and report if item A needs a change outside `Modal.ts`, `ScrollLock.ts`, and `types.ts`, or if a gate outside your items reddens.
