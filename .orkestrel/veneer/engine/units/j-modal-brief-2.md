# J-MODAL — round 2 brief (successor to `j-modal-brief.md`, which stays in place unedited)

What changed and why: round 1 (`j-modal-report.md`) returned green and was audited by the analyst on GPT-6 Astra, the reviewer on Opus 5.5, and the checker; the Orchestrator's reconciled verdict `j-modal-audit-verdict.md` reads `FAIL 2, 3, 4, 5, 7`. This brief carries each finding to one item and names its source beside it. Everything else in the round-1 brief binds here as written.

## Role and engine

`opus` on Opus 5.5 (native subagent, effort high), the round-1 writer, resumed in the same worktree.

## Objective

Close the audit findings in the modal worktree so that every gate is green again and the round-2 instrument reddens every named case, including the new proofs red first.

## Context

- Tree: `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/modal`, branch `unit/modal` from Veneer `main` `e24e2c3`, your round-1 work uncommitted. Do not merge `main` and do not commit. The Orchestrator's replay of your round-1 instrument ran in this tree before you resume and restored every byte (`j-modal-mutations-orchestrator.log.txt`).
- Sources, all under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`: `j-modal-audit-verdict.md` (the rulings), `j-modal-audit-objective-verdict.md` (claims 2, 3, 4, 5, 7, and the binding gaps: the vectors items A to F rest on), `j-modal-audit-subjective-verdict.md` (claim 7, F1 to F5, R1 to R6, B1 to B5), `j-modal-audit-checker-verdict.md`. Read the three verdicts before editing.
- The `modal` cascade key landed on Veneer `main` after this worktree was cut; the landing round, not this one, adds the shipped-cascade reading beside the test-local sheet.
- E16 (`../decisions.md`): one `disabled` reading for every route lands as one helper in the landing rounds; your `#readDismissed` already reads Bootstrap's semantics and stays as it is.

## Unknowns

- Whether the identity conjunct in `Modal.#holds` (`this.#change === change`) is reachable (the subjective lane's R1). Item F has you mutate it; report which case reddens, or remove the conjunct and the guide clause "or a later call of the same modal started" when none does (E6).

## Items

**A. Isolation construction under the modal's signal (claim 2).** Add `signal?: AbortSignal` to `IsolationOptions` in `types.ts`. `Isolation` reads the signal after every reaction-capable write (each `inert` claim and release) and, when aborted, releases the claims it took and stops constructing (no further claims, no observers). `Modal` passes its controller's signal and, when `#holds` fails after the construction returns, destroys the isolation it constructed. Red-first proof: a custom element beside the modal whose `inert` attribute reaction destroys the modal; after `show()` resolves `false`, no sibling carries an `inert` the modal wrote, no observer delivers, and `Isolation` holds no claim for the modal. Instrument rows: "the isolation ignores its signal" and "a constructed isolation is kept after the door fails".

**B. The bounce (claim 3).** `#bounce` re-reads, after the `prevent.vn.modal` dispatch and after the focus, that the host is still shown and no change is in flight, and writes `static` only then; it focuses the host only when `focus` holds. Red-first proofs: (i) a `prevent` hook that calls `hide()` on a non-fading modal with `backdrop: false` and `dismiss.escape: false`: the hide completes and the host takes no `static`; (ii) under `focus: false`, a focused child and Escape with escape dismissal off: focus stays on the child. Instrument rows for both reads.

**C. Every isolation claims its chain (claim 4).** `Isolation` takes a `false` claim on every element of the chain whatever its attribute reads, so a sibling isolation's release cannot restore an ancestor's `inert` while another isolation needs it clear. Red-first proof: an inert section holding hosts A and B; isolations A then B; destroying A leaves the section clear while B lives, and destroying B restores it. Instrument row: "a clear ancestor takes no claim".

**D. The delegate's lifetime and the focus return (claim 5).** `#routeModal` and `#routeDismiss` read the delegate's lifetime before they prevent or mark, and `#routeModal` reads it again after the open modal's `hide` before it marks and acquires (the Tab unit's round 2 gives `#routeTab` and `#construct` this shape; copy it). The focus return arms its once `hidden` listener before `show()` runs and cancels it when the show resolves `false`, so a hide a preconstructed modal's `shown` hook runs synchronously still returns focus. Red-first proofs: a `toggle.vn.button` listener on a consumer-owned `Button` (a different host, so E12 permits both routes) that destroys the delegate: the modal route marks and hides nothing, and an outer live delegate drives the modal; a dismiss trigger after the same destruction acquires nothing; a preconstructed modal whose `shown` hook hides it synchronously returns focus to the trigger. Instrument rows for each read and for the early arming.

**E. Sentences the source makes false (claim 7; F2, F3, F5; the bounds).** Apply the round-1 shared patch in the tree (`types.ts` is granted for items A, E, and G) with these corrections: `hidden` `@returns` reads "after the host's fade and the backdrop's fade settle"; `DismissOptions.backdrop` names a press on the backdrop, or beside a modal's dialog; the `IsolationInterface.destroy` summary as patched. In `parsers.ts` and its § Surface row, `parseBackdrop` no longer calls itself Bootstrap's coercion; under `#### Modal`, say Bootstrap throws a `TypeError` for an empty, `null`, or numeric `data-bs-backdrop` and reads any other string as a backdrop that hides on a press, and that Veneer accepts `0` and `1`; rewrite the takeover paragraph to name the real exits (a later `show` then `hide`, destruction, or a `hide` after the host carries `shown` again) and retitle the case that re-adds the token so it names that; restrict "dispatches `prevent` and bounces" to a disabled dismissal option; rewrite the restoration and isolation-handoff sentences to what items A and C make true; remove "the headless Chromium the proofs run on" from the `update` paragraph. Extend the `Delegate` class doc block with the modal routes in the siblings' shape (the `trigger` and `dismiss` routes, the prevented default for an anchor or area, the shown modal hidden first, the focus return, the modal conflict). Rename `#open` and `#close` to a pair naming the act with matching parameters (for example `#holdOpen(document)` and `#releaseOpen(document)`). Reword the patched `@returns` so no token is given a faculty.

**F. Instrument controls (claim 8; R1).** Add rows that redden, by name: completion without running animations under reduced motion (the reduced-motion case); the `Backdrop` validation control with `isSelector` imported (the round-1 row failed on an unimported identifier); an invalid host for `Isolation`; the nested-root marks for the modal routes (a prevented hide makes them observable); the identity conjunct of `Modal.#holds` (see Unknowns).

**G. The lock's selectors through the modal (F1).** Add `fixed` and `sticky` to `ModalSelectorMap` (defaults from `SCROLL_LOCK_SELECTORS`) with TSDoc and the § Surface row text, and pass them to `ScrollLock` at construction; state under `#### Modal` that the first holder's selectors are the lock's. Red-first proof: a modal whose `selectors.fixed` is replaced pads the replacing element and not `.fixed-top`.

Not yours: `HostSnapshot.ts`, `Button.ts`, `Collapse.ts`, `helpers.ts`, `tests/setupBrowser.ts`, `ROADMAP.md`, every vendored file, the `#routeDismiss` name (the landing fold names it by the modal), the shared `disabled` helper (E16), the three shared-record shapes (J-SNAPSHOT-SHARED), the shipped-cascade reading (the landing round), the § Delegation paragraph (W5).

## Scope

Owned: `src/browser/Modal.ts`, `src/browser/Backdrop.ts`, `src/browser/ScrollLock.ts`, `src/browser/Isolation.ts`, `src/browser/Delegate.ts`, `src/browser/constants.ts`, `src/browser/parsers.ts`, `src/browser/validators.ts`, `src/browser/index.ts`, `src/browser/types.ts` (items A, E, G only), the four new test files, `tests/src/browser/Delegate.test.ts`, `tests/src/browser/parsers.test.ts`, `tests/src/browser/validators.test.ts`, `tests/src/browser/index.test.ts`, `guides/veneer.md` (the Modal, Backdrop, ScrollLock, and Isolation § Surface rows, their Methods rows, the Modal fence, `#### Modal`, and the `plugin` row), `tmp/j-modal/**`. Off-limits: everything else. Tools: read, edit, write, the scoped commands under Acceptance. No install, no commit, no `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`, no merge.

## Execution

Perform the assignment directly in the worktree and spawn nothing. The `prove` MCP server is not reachable from a subagent; record that no call was made.

## Output

Your final message is the report, in the round-1 shape: files touched, per item the red reading and the green reading with the exact command, the instrument (`tmp/j-modal/mutations-3.py`, `tmp/j-modal/mutations-3.log.txt`, every accepted round-1 row kept and the new rows added, one full run, receipt), the acceptance commands with exit codes and summary lines, `git status --short` and `git diff --stat`, and the deviation state. No process diary.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol. You settle yourself: the names item E asks for within its constraints, the fixtures of the new proofs, the instrument row titles, and where each new case sits. Stop and report if an item cannot be closed inside the owned files or if a gate outside your items reddens.

## Acceptance criteria

In this order, each exit 0 from the worktree: `npm run check:src:browser`; `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser`; `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md`; `npm run test:src:browser`; `npm run test:guides`; `npm run test:policy`; `npm run build:src:core`, `npm run build:src:styles`, `npm run build:src:browser`; `npm run test:conformance`; `npm run test:setup`. The instrument's full run reddens every row's named case and ends `receipt: restored byte for byte`.

## Review evidence

The Orchestrator captures the diff and status with its own gate run after you return; your report carries the status and diffstat.
