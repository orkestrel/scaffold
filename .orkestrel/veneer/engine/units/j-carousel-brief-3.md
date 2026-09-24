# J-CAROUSEL — round 3 brief (successor to `j-carousel-brief-2.md`, which stays in place unedited)

What changed and why: round 2 was audited by the analyst on GPT-6 Astra and the checker; the reconciled verdict `j-carousel-audit-2-verdict.md` fails claims 3, 7, and 9 and carries one checker note. This round closes them in the same worktree, before the merge of `main` (the landing round is round 4, after Dropdown lands). Items A and B are mechanism fixes with red-first proofs; item C is two sentences; item D is one fixture; item E is the instrument and the gates.

## Role and engine

`opus` on Opus 5.5 (native subagent, effort high), the writer of rounds 1 and 2, resumed in the same worktree.

## Objective

A carousel whose interaction restart honours a pause made inside the `slide` dispatch and whose tap exemption ends at the first genuine mouse activity inside the host, with the guide saying so.

## Context

- Tree: `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/carousel`, branch `unit/carousel` from `e24e2c3`, uncommitted, `main` not merged. Do not merge, commit, install, or run a discarding git command. Veneer `main` is at `7dd4e17` (Alert, Tab, ScrollSpy landed; Dropdown landing); the round-4 landing brief carries that merge and the fold of `#closest`, `#construct`, `#conflictsCarousel`, and E16's `isDisabled`. Do none of that here.
- Sources under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`: `j-carousel-audit-2-verdict.md` (the rulings), `j-carousel-audit-2-objective-verdict.md` (claim 3's two interleavings with the sites they name, claim 7's two sentences), `j-carousel-audit-2-checker-verdict.md`, `j-carousel-audit-claims-2.md`, your `j-carousel-report-2.md`, `../decisions.md` (E12, E13, E15, E16). Bootstrap's `node_modules/bootstrap/js/src/carousel.js` and `util/swipe.js` in the worktree; the Pointer Events compatibility mapping for the legacy mouse position (a mouse moving within one target need not produce a boundary event).
- Host facts as in round 2: Chromium 153.0.8010.12; `npm ci` fails `EPERM` in the worktree, so run no install; the trusted-tap case already drives CDP, so a trusted mouse move is available the same way. The `prove` MCP server is not reachable from a subagent; record that no call was made.

## Items

**A. The pause tally is read before the `slide` dispatch (claim 3 (i)).** `#move` captures `#pauses` after the dispatch, so a `pause()` a `slide` listener makes is already inside the captured value and the completion's equality restarts the interaction ride. Capture the tally before the pre-change dispatch and keep the completion comparison as it is. Red first: a case with an interaction ride, `pause: false`, a short interval, and a `slide` (not `slid`) listener calling `pause()`; after `next()` completes on non-animated markup, no timer is armed and no further slide occurs within the interval. Instrument row: "the pause tally is read after the dispatch", reddening that case by name; keep the `slid` row and case.

**B. The tap exemption ends at genuine mouse activity (claim 3 (ii)).** `#touched` is set by a touch or pen release and cleared only by the pointer leaving the host, so after a tap the real mouse moving or pressing inside the host (no boundary transition) keeps the exemption and `#arm` bypasses hover pausing. Keep the flag and the touch-delay behaviour; clear the exemption on genuine mouse-pointer activity inside the host, read from a pointer event whose `pointerType` is `mouse` (`pointermove`, `pointerdown`, or `pointerup`; the compatibility `mouseenter` and `mouseover` a tap fires must not clear it, and the trusted-tap case guards that); when the exemption ends while `pause` holds and the host matches `:hover`, disarm the timer as `mouseenter` does, so hover pausing applies from that moment. Red first: the trusted-tap fixture followed by a trusted mouse move (CDP `Input.dispatchMouseEvent`, `mouseMoved`) to a point inside the host, without leaving it: the timer stays clear while the mouse rests inside, and leaving arms it; a second case or assertion shows the compatibility `mouseenter` after the tap alone still lets cycling continue after the touch delay (the existing tap case may serve). Instrument row: "mouse activity does not end the tap exemption", reddening the new case by name.

**C. The two sentences (claim 7).** Under `#### Carousel`, the timer paragraph's pause sentence states item A's rule (a `pause` call made during the slide, a `slide` or `slid` listener's included, holds through the interaction restart) and the hover sentence states item B's rule (the hover a tap leaves behind holds nothing until the pointer leaves the host or the mouse moves or presses inside it); in the delegate paragraph, qualify "a listener destroying the delegate during a click leaves the carousel unmarked" to a destruction in an earlier route, before the carousel is marked, and state that a destruction from the carousel's own `slide` listener leaves the mark, so an outer delegate refuses that host for the click. Rewrite the `Carousel` class remarks where they state the pause or tap rule.

**D. One fixture (the checker's note).** Replace the `as const` in the test fixture at the site `j-carousel-2.diff:3749` names with a typed declaration, so no `as const` remains under `tests/src/browser` (the Dropdown round's ruling).

**E. The instrument and the gates.** `tmp/j-carousel/mutations-3.py` writes `tmp/j-carousel/mutations-3.log.txt`; it keeps every round-2 row (re-anchored where the round-3 text moves; name each re-anchored row in the report) and adds items A and B's rows; the full run reads every row `EXACT` or `JOINED`, the `GREEN?` rows at 0 failed, and `receipt: restored byte for byte`. Then the chain in the worktree, each exit 0: `npm run check:src:browser`; `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser`; `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md`; `npm run test:src:browser`; `npm run test:guides`; `npm run test:policy`; the three builds; `npm run test:conformance`; `npm run test:setup`. Log to `tmp/j-carousel/acceptance-3/` through `acceptance-3.sh`.

## Scope

Owned: `src/browser/Carousel.ts`, `tests/src/browser/Carousel.test.ts`, `guides/veneer.md` (the `#### Carousel` sentences item C names), the test file item D's site sits in, `tmp/j-carousel/**`. Off-limits: everything else, `Swipe.ts` and `Delegate.ts` included (state in the report if item B needs a `Swipe` change, with the exact write, and stop), every vendored file, `ROADMAP.md`. No install, no commit, no merge, no discarding git command.

## Execution

Perform the assignment directly and spawn nothing. Record that no `prove` call was made.

## Output

Your final message: per item, the red run's failing case titles and the mechanism as landed (where the tally is read; which events end the exemption and what happens at that moment); the two sentences before and after; the fixture change; the instrument summary (rows, re-anchored rows named, `GREEN?` counts, the receipt line); the gate table; `git status --short` and the diffstat; the deviation state.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol. You settle yourself: which mouse pointer events end the exemption among the three named, the fixture of the new cases, and the wording within item C's rules. Stop and report if item B cannot be closed inside `Carousel.ts` or if a gate outside your items reddens.
