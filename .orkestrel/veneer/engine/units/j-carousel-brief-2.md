# J-CAROUSEL — round 2 brief (successor to `j-carousel-brief.md`, which stays in place unedited)

What changed and why: round 1 (`j-carousel-report.md`) returned green and was audited by the analyst on GPT-6 Astra, the reviewer on Opus 5.5, and the checker; the Orchestrator's reconciled verdict `j-carousel-audit-verdict.md` reads `FAIL 1, 2, 3, 4, 5, 7`. This brief carries each finding to one item and names its source beside it. Everything else in the round-1 brief binds here as written.

## Role and engine

`opus` on Opus 5.5 (native subagent, effort high), the round-1 writer, resumed in the same worktree.

## Objective

Close the audit findings in the carousel worktree so that every gate is green again and the round-2 instrument reddens every named case, including the new proofs red first.

## Context

- Tree: `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/carousel`, branch `unit/carousel` from Veneer `main` `e24e2c3`, your round-1 work uncommitted. Do not merge `main` and do not commit. The Orchestrator's replay of your round-1 instrument ran in this tree before you resume and restored every byte (`j-carousel-mutations-orchestrator.log.txt`).
- Sources, all under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`: `j-carousel-audit-verdict.md` (the rulings), `j-carousel-audit-objective-verdict.md` (claims 1 to 5 and 7: the vectors items A to E rest on, and the binding gaps under claim 8), `j-carousel-audit-subjective-verdict.md` (claim 7, F1 to F3, R1 to R3, the bounds), `j-carousel-audit-checker-verdict.md`, and `j-tab-2.diff` (the Tab unit's round 2: `#closest`, the lifetime read before the route marks, and `#construct`, the shape item E copies). Read the three verdicts before editing.
- Rulings you implement rather than re-decide: D1 (the swipe token at construction), D2 (the engine-owned interaction start), and D5 (the exports) stand; D3 (the `pointer` key) and D4 (`CarouselVocabulary`) are yours now (`types.ts` is granted for items F and G); the timer pair is `#arm`/`#disarm` engine-wide (the Toast round adopts the same).
- E16 (`../decisions.md`): the shared `disabled` helper lands in the landing rounds; not yours.

## Unknowns

- Whether the first-run rows the objective lane names (25, 28, 54, 69 of `j-carousel-mutations-first-run.log.txt`) carried the same mutation text as the accepted run: state it in the report from your own record, and retain the first run's instrument beside the log if you still have it (item H).

## Items

**A. Destruction inside the swipe's construction (claim 1).** After `new Swipe(host, …)` returns, the constructor reads its own lifetime; when the carousel was destroyed inside that construction (a reaction to the `pointer` token write), it destroys the swipe it constructed and keeps `#swipe` undefined. Red-first proof: a custom-element host whose `class` reaction destroys the carousel when the token arrives; after construction the host carries no `pointer` token and no pointer listener reports. Instrument row: "a swipe constructed while the carousel was destroyed is kept".

**B. The slide doors (claim 2).** (i) Read a slide count before the `slide` dispatch and refuse the call after it when the count moved (a guarded listener that runs `slide(2)` then `slide(0)` synchronously inside the dispatch leaves the outer call refused); red-first proof with that listener; row "the dispatch reads no slide count". (ii) Each indicator write's door also reads the indicator it wrote (the `active` token and `aria-current` as written); red-first proof with an indicator reaction that rewrites `aria-current`; row "the indicator doors read no indicator". (iii) Every door from the order-token write on also reads the outgoing item's order token absent and that both items are still items of the host (`#items()` includes them); red-first proofs with a reaction adding the outgoing order token and with a reaction removing the incoming item from the host; rows "the outgoing order token is not read" and "the doors read no membership". The completion's absent set includes the outgoing item's order token. E15 does not apply; keep the queued `slide` and the re-entry case as they are.

**C. The timer under standing conditions (claim 3; F2; R2).** Rename `#suspend` to `#disarm` and delete `#resume`; `#arm` returns when `#started` is false, when `pause` holds and the host matches `:hover`, or when a touch deferral is pending, so the `mouseleave` listener and the touch timer call `#arm` directly; a `pause()` made during a slide (its `#started` cleared) holds through the interaction restart and the `finally` re-arm. Red-first proofs: a `slid` listener that calls `pause()` under an interaction ride (no timer after); `mouseenter` during an animated slide under `pause` (no timer after the slide completes); a touch release during an animated slide (the deferral, not the completion, re-arms); `ArrowRight` with the pointer inside under `pause` and an interaction ride (no timer while the pointer stays). Rows for each read.

**D. The restoration order and its bound (claim 4).** `destroy` runs the carousel's own snapshot restoration before the swipe's, so `HostSnapshot`'s handoff covers the items for a replacement carousel a reaction constructs during the restoration; state under `#### Carousel` the bound that the swipe's token is a second snapshot, closed by J-SNAPSHOT-SHARED. Red-first proof: a custom-element host whose reaction to the `active` restoration constructs a replacement with `touch: false` and moves it; after both destructions the items read the original markup. Row: "the swipe restores before the items".

**E. The delegate's lifetime in the carousel route (claim 5).** `#routeCarousel` resolves through `#closest`, reads the delegate's lifetime before it marks, prevents, acquires, or drives, and uses `#construct` (a carousel built while the delegate was destroyed is destroyed, not acquired), the `j-tab-2.diff` shape. Red-first proofs: a consumer-owned `Button` on a slide control naming a different carousel whose `toggle.vn.button` listener destroys the delegate (nothing marked, an outer live delegate drives it); a construction-time reaction destroying the delegate (the engine is destroyed). Rows for both reads.

**F. The `pointer` key and `CarouselVocabulary` (claim 7; D3; D4).** Add `pointer` to `CarouselClassMap` (default `pointer-event`, TSDoc) and `CAROUSEL_CLASSES.pointer`, pass `{ pointer: this.#classes.pointer }` to the swipe's `classes`, extend the frozen-table and vocabulary cases so a replaced `classes` group writes the replacing pointer token, add the class-table row, and delete the sentence that says the groups name no `pointer` token. Add `CarouselVocabulary` to `types.ts` (mirroring `CollapseVocabulary`, with its § Surface row) and type `Delegate.#carousel` with it. Apply the round-1 `types.ts` and Methods-row patches in the tree with the `ride` sentence no longer saying it mirrors Bootstrap's option.

**G. Sentences the source makes false (claim 7; F1; F3; the bounds).** Under `#### Carousel`: the pause, takeover, and restoration sentences to what items B, C, and D make true; the departure that a slide control's click restarts no `load` ride a `pause` call stopped, where Bootstrap's click restarts any carousel with a ride; the wait-target departure contrasting the incoming item with Bootstrap's outgoing one; the `CarouselRide` summary agreeing with the `ride` sentence (in `types.ts` and its § Surface row). In § Delegation: the delegate routes the carousel by its resolved `step` and `index` attributes, and one sentence on the construction scan and its rethrow (the two sentences the carousel makes false; nothing additive beyond them). In the `DelegateOptions` `@remarks`: the same attribute-routing fact.

**H. Instrument controls (claim 8; R1; R3).** Add rows that redden, by name: the shipped-declarations case (drop the `pan-y` or transform reading); the key arm and the swipe arm of the interaction ride (flip `interactive` in `#navigate` and in `#swiped`); and retain the first-run instrument beside its log where you have it, stating whether its mutation text matched the accepted run's.

Not yours: `HostSnapshot.ts`, `Button.ts`, `Collapse.ts`, `tests/setupBrowser.ts`, `ROADMAP.md`, every vendored file, the shared `disabled` helper (E16), the shared per-target record (J-SNAPSHOT-SHARED), the fold of `#conflictsCarousel` into the landed `#conflicts` `Set` (the landing round).

## Scope

Owned: `src/browser/Carousel.ts`, `src/browser/Swipe.ts`, `src/browser/Delegate.ts`, `src/browser/constants.ts`, `src/browser/parsers.ts`, `src/browser/validators.ts`, `src/browser/helpers.ts` (`matchesReducedMotion` alone), `src/browser/index.ts`, `src/browser/types.ts` (items F and G only), `tests/src/browser/Carousel.test.ts`, `tests/src/browser/Swipe.test.ts`, `tests/src/browser/Delegate.test.ts`, `tests/src/browser/parsers.test.ts`, `tests/src/browser/validators.test.ts`, `tests/src/browser/helpers.test.ts`, `tests/src/browser/index.test.ts`, `guides/veneer.md` (the Carousel and Swipe § Surface rows, the `CarouselInterface` Methods rows, the Carousel fence, `#### Carousel`, the two § Delegation sentences item G names, and the `plugin` row), `tmp/j-carousel/**`. Off-limits: everything else. Tools: read, edit, write, the scoped commands under Acceptance. No install, no commit, no `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`, no merge.

## Execution

Perform the assignment directly in the worktree and spawn nothing. The `prove` MCP server is not reachable from a subagent; record that no call was made.

## Output

Your final message is the report, in the round-1 shape: files touched, per item the red reading and the green reading with the exact command, the instrument (`tmp/j-carousel/mutations-2.py`, `tmp/j-carousel/mutations-2.log.txt`, every round-1 row kept and the new rows added, one full run, receipt), the acceptance commands with exit codes and summary lines, `git status --short` and `git diff --stat`, and the deviation state. No process diary.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol. You settle yourself: the fixtures of the new proofs, the instrument row titles, where each new case sits, and the exact wording within the forms item G names. Stop and report if an item cannot be closed inside the owned files or if a gate outside your items reddens.

## Acceptance criteria

In this order, each exit 0 from the worktree: `npm run check:src:browser`; `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser`; `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md`; `npm run test:src:browser`; `npm run test:guides`; `npm run test:policy`; `npm run build:src:core`, `npm run build:src:styles`, `npm run build:src:browser`; `npm run test:conformance`; `npm run test:setup`. The instrument's full run reddens every row's named case and ends `receipt: restored byte for byte`.

## Review evidence

The Orchestrator captures the diff and status with its own gate run after you return; your report carries the status and diffstat.
