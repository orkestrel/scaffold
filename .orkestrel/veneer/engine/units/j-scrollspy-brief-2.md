# J-SCROLLSPY — round 2 brief (successor to `j-scrollspy-brief.md`, which stays in place unedited)

What changed and why: round 1 (`j-scrollspy-report.md`) returned green and was audited by the analyst on GPT-6 Astra, the reviewer on Opus 5.5, and the checker; the Orchestrator's reconciled verdict `j-scrollspy-audit-verdict.md` reads `FAIL 1, 3, 6, 7, 8`. This brief carries each finding to one item and names its source beside it. Everything else in the round-1 brief binds here as written.

## Role and engine

`opus` on Opus 5.5 (native subagent, effort high), the round-1 writer, resumed in the same worktree.

## Objective

Close the audit findings in the scrollspy worktree so that every gate is green again and the round-2 instrument reddens every named case, including the new proofs red first.

## Context

- Tree: `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/scrollspy`, branch `unit/scrollspy` from Veneer `main` `e24e2c3`, your round-1 work uncommitted. Do not merge `main` and do not commit. The Orchestrator's replay of your round-1 instrument ran in this tree before you resume and restored every byte (`j-scrollspy-mutations-orchestrator.log.txt`).
- Sources, all under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`: `j-scrollspy-audit-verdict.md` (the rulings), `j-scrollspy-audit-objective-verdict.md` (claims 1, 3, 6, 7, 8: the vectors items A, B, D, and E rest on), `j-scrollspy-audit-subjective-verdict.md` (claim 7, F1 to F3, R1 to R3, B1 to B6), `j-scrollspy-audit-checker-verdict.md`. Read the three verdicts before editing.
- `.claude/rules/typescript.md` permits `as const` on a literal whose contract is not already declared (to fix a tuple's arity and element types); the `as const` at `tests/src/browser/ScrollSpy.test.ts` line 605 stays unless the value's contract is declared, in which case annotate the declaration instead.

## Unknowns

- Whether the "restores every link it wrote on destruction…" case distinguishes `destroy` clearing `#link` (the subjective lane read that the restored token already makes the getter `undefined`). Item E has you add the row and report which case it reddens; strengthen a case if none does, or record the row as equivalent with the reason.

## Items

**A. The `link` contract and the retained list (claim 1; the subjective lane's R1).** `refresh` clears `#link` when the link it names is not in the map the refresh builds. The `link` summary in `src/browser/types.ts` reads the guide's sentence: "Reads the link the last activation selected while it carries the `active` token, or undefined otherwise." The constructor stores a frozen copy of the resolved threshold list, so a caller's later push to its own array cannot make `refresh` throw and the observer keeps the ratios read at construction. Red-first proofs: (i) after an activation, remove the selected section and call `refresh()`: `link` reads `undefined`; (ii) `const ratios = [0.5]; new ScrollSpy(host, { intersection: { threshold: ratios } }); ratios.push(2); spy.refresh()` does not throw and the observer's `thresholds` reads `[0.5]`. Instrument rows for both.

**B. The delivery doors (claim 3).** Give `#holds` and `#apply` an `absent` set beside `present`, as `Collapse.#holds` has: after the `activate.vn.scrollspy` dispatch the door requires the selected link to carry its token; each removal door (the leaving link's token, the target's token, each cleared link's token) requires the removed token absent. A delivery that finds otherwise stops, writing and dispatching nothing more, and reads no further entry. Red-first proofs, each red on the round-1 source: (i) a two-entry delivery (the shape of "processes no further entry of a delivery after a listener to its activate event destroys it") whose `activate` listener for the first link removes that link's token without destroying or refreshing: the second link is not activated, no second event fires, and the first link stays without its token; (ii) a custom anchor element whose `class` reaction adds `active` back when its section leaves: the delivery stops at that door, the consumer's token stays, and a later entering entry in the same delivery activates nothing. Instrument rows: "the dispatch door reads no token" and "a removal door admits a restored token", each reddening its case.

**C. Sentences the source makes false (claim 7; the subjective lane's F2, F3, B2, B3, B4, B6).** Apply the round-1 `destroy` patch in the tree (`types.ts` is granted for this item and item A) with its Methods row. Under `#### ScrollSpy`: "Scrolling down while the root's scroll position is zero, the first activation ends the delivery." (and the same in the `#deliver` comment); add the departure that a fragment with a malformed percent escape is skipped where Bootstrap's `decodeURI` throws; reword "and refuses a blank one" so it reads of `parseRootMargin`, not of the platform. In the class `@remarks`: "or a `disabled` attribute whose value is not `false`", and state the dispatch door as item B makes it. The `Delegate` class summary and its § Surface row: "Activates data-attribute hosts through a root's delegated click listener and a scan at construction." (the landing merges this with the Tab unit's "click and key listeners"). In § Delegation, scope the reinsertion sentence ("its next delegated click acquires it again with a fresh engine") to hosts a click route serves and state that a scanned host stays released; the additive `scrollspy` option sentence stays out (W5 carries it). In `ScrollSpy.ts`, fold the two identical throw blocks into one and replace the unreachable `: 0` fallback in `#deliver` with a `continue` on a target that is not an `HTMLElement`.

**D. One added line (claim 8).** `tests/src/browser/ScrollSpy.test.ts` around line 357: `event.target instanceof Element` becomes `isInstance(event.target, Element)`.

**E. Instrument rows (claims 2, 3, 6; the subjective lane's R2 and R3).** Add rows, each reddening a named case (strengthen the case where none does, and report it): the observer-identity conjunct dropped from `#holds` (a case that calls `refresh()` from inside an `activate` listener and asserts the old delivery writes nothing more); the `overflow-y` read cached at construction (a case that changes the host's `overflow-y` between refreshes and asserts the observer's root changes); `#activate`'s early return dropped (assert no second `activate` event and no rewrite when the same link is delivered again while active); `parseRootMargin` returning `undefined` for a valid margin (must redden the valid-margin case); the default `active` token swapped for one the shipped nav cascade does not paint (must redden "writes the token the shipped nav cascade paints as the active pill"); `destroy` not clearing `#link` (see Unknowns).

Not yours: `helpers.ts`, `HostSnapshot.ts`, `Button.ts`, `Collapse.ts`, `tests/setupBrowser.ts`, `ROADMAP.md`, every vendored file, § Engine's layer-rule sentence (W5), the additive § Delegation `scrollspy` sentence (W5), the fence's shape (B1), moving the scan into a private method (the landing round).

## Scope

Owned: `src/browser/ScrollSpy.ts`, `src/browser/Delegate.ts`, `src/browser/constants.ts`, `src/browser/parsers.ts`, `src/browser/validators.ts`, `src/browser/index.ts`, `src/browser/types.ts` (items A and C only), `tests/src/browser/ScrollSpy.test.ts`, `tests/src/browser/Delegate.test.ts`, `tests/src/browser/parsers.test.ts`, `tests/src/browser/validators.test.ts`, `tests/src/browser/index.test.ts`, `guides/veneer.md` (the ScrollSpy § Surface rows, the `Delegate` § Surface row, the `ScrollSpyInterface` Methods rows, the ScrollSpy fence, `#### ScrollSpy`, the § Delegation reinsertion sentence, and the `plugin` row), `tmp/j-scrollspy/**`. Off-limits: everything else. Tools: read, edit, write, the scoped commands under Acceptance. No install, no commit, no `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`, no merge.

## Execution

Perform the assignment directly in the worktree and spawn nothing. The `prove` MCP server is not reachable from a subagent; record that no call was made.

## Output

Your final message is the report, in the round-1 shape: files touched, per item the red reading and the green reading with the exact command, the instrument (`tmp/j-scrollspy/mutations-2.py`, `tmp/j-scrollspy/mutations-2.log.txt`, every round-1 row kept and the new rows added, one full run, receipt), the acceptance commands with exit codes and summary lines, `git status --short` and `git diff --stat`, and the deviation state. No process diary.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol. You settle yourself: the fixtures of the new proofs, the instrument row titles, where each new case sits, and the exact wording within the forms item C names. Stop and report if an item cannot be closed inside the owned files or if a gate outside your items reddens.

## Acceptance criteria

In this order, each exit 0 from the worktree: `npm run check:src:browser`; `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser`; `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md`; `npm run test:src:browser`; `npm run test:guides`; `npm run test:policy`; `npm run build:src:core`, `npm run build:src:styles`, `npm run build:src:browser`; `npm run test:conformance`; `npm run test:setup`. The instrument's full run reddens every row's named case and ends `receipt: restored byte for byte`.

## Review evidence

The Orchestrator captures the diff and status with its own gate run after you return; your report carries the status and diffstat.
