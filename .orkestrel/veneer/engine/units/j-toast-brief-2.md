# J-TOAST — round 2 brief (successor to `j-toast-brief.md`, which stays in place unedited)

What changed and why: round 1 (`j-toast-report.md`) returned green and was audited by the analyst on GPT-6 Astra, the reviewer on Opus 5.5, and the checker; the Orchestrator's reconciled verdict `j-toast-audit-verdict.md` reads `FAIL 2, 4, 6`. This brief carries each finding to one item and names its source beside it. Everything else in the round-1 brief binds here as written.

## Role and engine

`opus` on Opus 5.5 (native subagent, effort high), the round-1 writer, resumed in the same worktree.

## Objective

Close the audit findings in the toast worktree so that every gate is green again and the round-2 instrument reddens every named case, including the new proofs red first.

## Context

- Tree: `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/toast`, branch `unit/toast` from Veneer `main` `e24e2c3`, your round-1 work uncommitted. Do not merge `main` and do not commit. The Orchestrator's replay of your round-1 instrument ran in this tree before you resume and restored every byte (`j-toast-mutations-orchestrator.log.txt`).
- Sources, all under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`: `j-toast-audit-verdict.md` (the rulings), `j-toast-audit-objective-verdict.md` (claims 2, 4, 6: the vectors items A, B, and D rest on), `j-toast-audit-subjective-verdict.md` (claim 6, F1 to F3, R1 to R4, B1 to B7), `j-toast-audit-checker-verdict.md`, `j-tab-2.diff` (the Tab unit's round 2: `#closest`, the lifetime read before the route marks, `#construct`; the shape item B copies), and `j-alert-2.diff` (the `Button`-form vocabulary summaries item D copies). Read the three verdicts before editing.
- Rulings you implement rather than re-decide: a `show` on a shown toast runs the sequence again (held); the newest call wins (E15's one-direction refusal does not apply); the one `MISSED` row's equivalence holds; the timer pair is `#arm`/`#disarm` engine-wide (the Carousel round adopts the same); E16's shared `disabled` helper lands in the landing rounds, not here.

## Unknowns

- Whether a case can distinguish `destroy`'s release-before-restore order (the subjective lane's R1). Item E has you add the row and a case that constructs a `Toast` from a reaction during restoration; report which case reddens.

## Items

**A. The identity across the dispatch and the fade door (claim 2).** Take the call identity before the pre-change dispatch and read it after the dispatch, so a nested call that completed inside the dispatch leaves the outer call refused with no second sequence and no second completed event; keep `#refused()` as it is (a shown toast shows again). The fade door carries the expected `shown` membership (present when the host was shown at the call's start, absent otherwise), so a reaction to the `fade` write that removes a pre-existing `show` stops the call. Red-first proofs: (i) `{ animated: false, autohide: false }` with a guarded `show.vn.toast` listener calling `show()`: one `shown`, the inner call `true`, the outer `false`; (ii) a shown toast whose `hide.vn.toast` listener synchronously calls `show()`: the hide resolves `false` and the show completes once; (iii) a custom-element host whose one-shot reaction to the `fade` write removes `show`: the call resolves `false` and `show` stays absent. Instrument rows: "the identity is taken after the dispatch" and "the fade door reads no shown membership".

**B. The delegate's lifetime in the toast route (claim 4).** `#routeToast` resolves through `#closest`, reads the delegate's lifetime before it prevents or marks, and uses `#construct` (a toast built while the delegate was destroyed is destroyed, not acquired), the `j-tab-2.diff` shape. Red-first proof: a button trigger carrying `data-bs-toggle="button"` and `data-bs-dismiss="toast"` naming a separate shown toast, under an outer live delegate, whose `toggle.vn.button` listener destroys the inner delegate: the inner marks and hides nothing, the outer acquires the toast and hides it, and the outer's destruction restores it. Instrument rows: "the toast route reads no lifetime before it prevents or marks" and "a toast constructed while the delegate was destroyed is kept".

**C. The timer pair (F2).** Rename `#schedule` to `#arm` and `#clear` to `#disarm`; comments and the guide keep "starts the delay" for the observable act.

**D. Sentences the source makes false (claim 6; F1; F3; B2; B3).** Apply the round-1 `@returns` patch in the tree (`types.ts` is granted for this item) adding "a later call took over" as its own reason beside the token reads; reword the `ToastSelectorMap`, `ToastOptions.selectors`, `ToastAttributeMap`, `ToastOptions.attributes`, and `ToastClassMap` summaries in the `Button` form `j-alert-2.diff` gives `AlertSelectorMap` (the delegate's dismiss route reads or matches by it; a toast constructed directly reads or matches with none; the toast writes and tests `shown`, `transition`, and `fade`, the route tests `host` and `disabled`), with their § Surface rows and the class-table lead under `#### Toast`; rewrite the re-entry sentence to item A's rule; make the fence await `hidden.vn.toast` before `destroy` or reword its lead to the immediate cleanup; write "Bootstrap's `show` and `hide` methods have no such guard"; correct the `#activate` comment (one refusal, the routes it runs); replace the temporal `once` in the test comment, the case title, and the recorder label with `after`.

**E. Instrument rows (R1).** Add the row that swaps `Toast.#registry.release` and `#snapshot.restore()` in `destroy`, with a case that constructs a `Toast` on the host from a reaction during restoration and asserts the new toast's snapshot took the values still to be written back (see Unknowns).

Not yours: `helpers.ts`, `HostSnapshot.ts`, `Button.ts`, `Collapse.ts`, `tests/setupBrowser.ts`, `ROADMAP.md`, every vendored file, the § Delegation paragraph (W5), the fold of `#contests` and the resolver into the landed `#conflicts`, `#reach`, and `#locate` (the landing round), the shared `disabled` helper (E16).

## Scope

Owned: `src/browser/Toast.ts`, `src/browser/Delegate.ts`, `src/browser/constants.ts`, `src/browser/validators.ts`, `src/browser/index.ts`, `src/browser/types.ts` (item D only), `tests/src/browser/Toast.test.ts`, `tests/src/browser/Delegate.test.ts`, `tests/src/browser/validators.test.ts`, `tests/src/browser/index.test.ts`, `guides/veneer.md` (the Toast § Surface rows, the `ToastInterface` Methods rows, the Toast fence, `#### Toast`, and the `plugin` row), `tmp/j-toast/**`. Off-limits: everything else. Tools: read, edit, write, the scoped commands under Acceptance. No install, no commit, no `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`, no merge.

## Execution

Perform the assignment directly in the worktree and spawn nothing. The `prove` MCP server is not reachable from a subagent; record that no call was made.

## Output

Your final message is the report, in the round-1 shape: files touched, per item the red reading and the green reading with the exact command, the instrument (`tmp/j-toast/mutations-2.py`, `tmp/j-toast/mutations-2.log.txt`, every round-1 row kept and the new rows added, one full run, receipt), the acceptance commands with exit codes and summary lines, `git status --short` and `git diff --stat`, and the deviation state. No process diary.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol. You settle yourself: the fixtures of the new proofs, the instrument row titles, where each new case sits, and the exact wording within the forms item D names. Stop and report if an item cannot be closed inside the owned files or if a gate outside your items reddens.

## Acceptance criteria

In this order, each exit 0 from the worktree: `npm run check:src:browser`; `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser`; `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md`; `npm run test:src:browser`; `npm run test:guides`; `npm run test:policy`; `npm run build:src:core`, `npm run build:src:styles`, `npm run build:src:browser`; `npm run test:conformance`; `npm run test:setup`. The instrument's full run reddens every row's named case and ends `receipt: restored byte for byte`.

## Review evidence

The Orchestrator captures the diff and status with its own gate run after you return; your report carries the status and diffstat.
