# J-CAROUSEL — round 5 brief, the landing round's second pass (successor to `j-carousel-brief-4.md`, which stays in place unedited)

What changed and why: round 4 was audited by the analyst on GPT-6 Astra and the checker; the reconciled verdict `j-carousel-audit-4-verdict.md` confirms the mouse-release invalidation, the titles, the merge, and the fold, and carries one shared-delegate predicate and one guide sentence. This pass closes both in the same open merge. You do not commit; the Orchestrator commits the merge after its replay and one objective lane.

## Role and engine

`opus` on Opus 5.5 (native subagent, effort high), the writer of rounds 1 to 4, resumed in the same worktree.

## Objective

A shared `#conflicts` that refuses only where both routes would construct (E12), and a § Delegation sentence that names the routes reading the disabled state.

## Context

- Tree: `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/carousel`, branch `unit/carousel`, the merge of `e75608b` open with every file staged (`MERGE_HEAD` is `e75608b`; `git diff --diff-filter=U` reads empty). Edit the files and `git add` them; do not commit, do not run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or `git merge --abort`. No install.
- Sources under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`: `j-carousel-audit-4-verdict.md` (the rulings), `j-carousel-audit-4-objective-verdict.md` (claim 4's counterexample markup and claim 3's sentence), `../decisions.md` (E12, E16). The dropdown entry in `#conflicts` already reads `!isDisabled(toggle, this.#dropdown.classes.disabled)`; the tab route's own read is `isDisabled(control, this.#tab.classes.disabled)` (confirm the token the tab route uses and use the same).
- Host facts as in round 4. The `prove` MCP server is not reachable from a subagent; record that no call was made.

## Items

**A. The tab entry of `#conflicts` reads the disabled state (round-4 claim 4).** In `Delegate.#conflicts`, collect the tab control only when it is not disabled by the tab route's `isDisabled` read (the same predicate `#routeTab` returns on), beside the existing `Tab.find(control) === undefined` condition, so an unowned host that is both a disabled tab control and an unowned carousel host constructs the carousel alone, while the enabled control still conflicts. Red first: a case in `Delegate.test.ts` with the lane's markup (a `carousel disabled` host carrying `data-bs-toggle="tab"`, `data-bs-target` naming itself, and `data-bs-slide="next"`, inside the root, unowned): a click constructs and slides the carousel and constructs no tab; the adjacent case (the same host without `disabled`) is refused: no engine, no event, no prevention. Instrument row: "the disabled tab control joins the conflict set", dropping the predicate and reddening the new case by name. Alert's entry resolves through `#locate`, which already reads the disabled state; Button's and Collapse's routes read none, so their entries stay as they are.

**B. The § Delegation sentence (round-4 claim 3).** Replace the sentence that every route except Carousel reads the disabled state through `isDisabled` with one naming the Alert, Tab, and Dropdown routes as the ones that read it (the Button, Collapse, and Carousel routes read none, as Bootstrap's data API for those reads none); keep the carousel qualification's fact inside it. Change no route.

**C. Gates and the instrument.** The full chain in the worktree as in round 4 (`check:src:browser`, oxlint, oxfmt write then check, `test:src:browser`, `test:guides`, `test:policy`, the three builds, `test:conformance`, `test:setup`), each exit 0; then `tmp/j-carousel/mutations-5.py`, keeping every round-4 row (re-anchored where the `#conflicts` text moves) and adding item A's row, writing `tmp/j-carousel/mutations-5.log.txt` in one full run: every row `EXACT` or `JOINED`, the `GREEN?` rows at 0 failed, `receipt: restored byte for byte`. The Orchestrator replays this instrument after you return.

## Scope

Owned: `src/browser/Delegate.ts` (the `#conflicts` tab entry and the class remarks if they state the predicate), `tests/src/browser/Delegate.test.ts`, `guides/veneer.md` (the § Delegation sentence), `tmp/j-carousel/**`. Off-limits: everything else. No install, no commit, no discarding git command.

## Execution

Perform the assignment directly and spawn nothing. Record that no `prove` call was made.

## Output

Your final message: item A's red run and the predicate as landed; the sentence before and after; the gate table; the instrument summary (rows, re-anchored rows named, `GREEN?` counts, the receipt); `git status --short` over `src/browser`, `tests/src/browser`, and the guide; the deviation state.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol. You settle yourself: the fixture of the two cases and the sentence's wording within item B's rule. Stop and report if item A needs a change outside `Delegate.ts` or if a gate outside your items reddens.
