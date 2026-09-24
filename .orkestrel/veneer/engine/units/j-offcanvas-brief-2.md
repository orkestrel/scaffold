# Unit J-OFFCANVAS round 2 — the backdrop's removal as a step, the interactive backdrop, and the contract sentences

Successor to `j-offcanvas-brief.md`. What changed and why: round 1's audit (`j-offcanvas-audit-verdict.md`) confirmed construction, the show, the responsive hide, destruction, and the routes, and failed the hide on a write after a stopped change, the press on a heuristic that diverges from Bootstrap in both directions, and three source-policy and documentation clauses; two contract findings and the departures list ride along. The Orchestrator's ruling on the press is E19.

## Role and engine

`opus` on Opus 5.5, the unit's writer (agent a502a18f5baae1a22), a native Claude subagent (Read, Grep, Glob, Edit, Write, Bash), the sole writer in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/offcanvas` (branch `unit/offcanvas`, base `afae42c`, round 1 uncommitted). Perform the assignment directly and spawn nothing.

## Objective

A stopped hide writes nothing more, the backdrop's removal included; the backdrop receives the press itself because the isolation leaves it interactive; the test file holds no nested function; the contract sentences for the selectors, the trigger, the target, the event trigger, and the hide sequence state what the code does; the departures list carries the class-token timeline; the scoped gates are green.

## Context

**The verdicts are the authority.** `j-offcanvas-audit-verdict.md` (per-claim rulings and carriers; E19), `j-offcanvas-audit-objective-verdict.md` (claim 3's interleaving and its smallest repair; claim 4's SVG attack; claim 8's three clauses; the binding tables), `j-offcanvas-audit-subjective-verdict.md` (F1 with the Toast-shape sentences, F2 with the timeline bullet, OR1's two press paths, the Bounds B1 to B7), `j-offcanvas-audit-checker-verdict.md` (the `hook` referral). Read all four before editing.

**The mechanisms you now own in part.**
- `src/browser/Backdrop.ts`: `hide()` removes the `shown` token, awaits `settleAnimations` when animated, reads its lifetime and change identity, then `element.remove()` (around line 82); `destroy()` removes the element (around line 89). `Modal.ts` calls `await backdrop.hide()` then `backdrop.destroy()` (around lines 322 to 327), so a `hide()` that fades and resolves without removing leaves Modal's observed behaviour unchanged.
- `src/browser/Isolation.ts`: claims every HTML element beside the host's ancestor chain as inert at construction (around lines 85 to 100) and, through its `MutationObserver`, every HTML element inserted beside the chain at the next delivery (around lines 46 to 51); `IsolationOptions` in `types.ts` (around line 386) carries `trigger` and `signal`. The backdrop is appended to `host.parentElement`, a chain level, so both paths claim it today.
- `src/browser/Offcanvas.ts`: `#press` on the owner document counts a target that is or contains the backdrop element (around line 381); the hide starts `backdrop.hide()` before the `shown` removal step (around line 296) and calls `backdrop.destroy()` after the attribute removals (around line 306).

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` (§ Design laws; § Non-negotiable rules: no nested functions outside an anonymous callback passed directly or returned directly; § Writing); `.claude/rules/architecture.md`, `patterns.md`, `names.md` (one-word option keys), `typescript.md`, `tests.md`, `documentation.md` (Summary equals the description paragraph), `writing.md`. Skill: none. Standing decisions: E6, E12, E15, E16 as amended, E19 (this round; `decisions.md`).

**Host and scoped tests.** As round 1. The `prove` MCP server is not reachable to a native subagent; record that you made no call.

## Unknowns

- Whether Chromium 153 delivers a trusted press that lands on an inert element painted above an interactive backdrop to the backdrop (the inert subtree behaves as `pointer-events: none`). Settle it in the O2 proof with a fixture element at `z-index` 1090 beside the panel; record the target the press reached. If the press does not reach the backdrop, report the reading and keep the case asserting what the platform does.

## Obligations

- **O1 The backdrop's removal is a step.** `Backdrop.hide()` fades (removes the `shown` token, awaits the settle when animated, reads its lifetime and change identity) and resolves without removing the element; `Backdrop.destroy()` removes it, as now. In `Offcanvas.hide`, the backdrop's fade still starts beside the slide, and its removal runs as the `#apply(false, …)` step after the post-settle door (the `backdrop.destroy()` call that follows the attribute removals), so a hide a reaction stops removes no backdrop. `BackdropInterface.hide`'s remarks and the `#### Backdrop` guide sentences state the split; `Modal.ts` is unchanged and its suite stays green; `Backdrop.test.ts` asserts the split. Red first in `Offcanvas.test.ts`: a custom-element host whose reaction to the `shown` removal adds the token back, with a document child-list observer through the backdrop's settlement, asserts the backdrop element is still connected after the settle and that no `hidden` dispatched; record the red reading against round 1's source. The guide's hide sequence sentence (around line 2314 of the round-1 guide) names the removal where it now runs.
- **O2 The interactive backdrop (E19).** `IsolationOptions` gains `spare?: ReadonlyArray<HTMLElement>`: elements the isolation leaves as they are, at construction and at every observer delivery (a spared element inserted beside the chain is not claimed). The panel passes `spare: [backdrop.element]` when it constructs the isolation with a backdrop. The press: the panel counts a `mousedown` whose target is the backdrop element (the listener on the backdrop element itself, or the document listener comparing `event.target === element`; your choice, one of them), with no containment reading; `dismiss.backdrop` true hides, otherwise `#prevent`. Red first: trusted presses (through `sendProtocol` as round 1's case) beside the panel on the backdrop (hides), inside the panel (nothing), on an inert element painted above the backdrop at `z-index` 1090 (reaches the backdrop and hides, per Unknowns), and with an SVG sibling painted under the backdrop beside the panel (the backdrop receives it and hides); the case records `event.target` for each press. The guide's departure bullet for the press is rewritten: everything outside the panel is inert, so a press on an element painted above the backdrop falls through to it where Bootstrap's toast container or menu would swallow it. `Isolation.test.ts` asserts a spared sibling is left interactive and an inserted spared element is not claimed.
- **O3 The policy clauses.** `Offcanvas.test.ts`: the local arrow `hook` (around line 406) is replaced by direct anonymous callbacks or an exported shared test helper; `types.ts`: the event detail sentence names `show` and `shown` as the events carrying the trigger (around line 1377); the hide sequence documentation matches O1.
- **O4 The contract and the departures.** F1's four sentences in the Toast shape (`OffcanvasSelectorMap`, its `trigger`, `OffcanvasOptions.selectors`, `OffcanvasAttributeMap.target`) with the § Surface row equal to the new summary; F2's timeline bullet; the `parseBackdrop` remarks name the offcanvas panel (`parsers.ts`, around line 207); the bounds: the agreement bullet ("Neither Bootstrap's … nor the engine hides a shown modal") moves to a sentence before the departures list; one term for the route (`toggle route`) across `#### Offcanvas` and § Delegation; the `#conflicts` locals named by entity; "removes" for the backdrop in the destruction bullet and `OffcanvasInterface.destroy`; the `Delegate` class TSDoc wrap around line 185 repaired; the fence lead-in distinguishes the engine from its host.
- **O5 The missing control.** An instrument row that drops `#reach`'s lifetime check so "hides nothing through the dismiss route after the delegate is destroyed" (the destroyed dismiss route case) reddens.
- **The instrument.** `tmp/j-offcanvas/mutations-2.py` carries round 1's rows that still name a live line, plus: "the backdrop removes itself at the end of its fade" (restore the removal in `Backdrop.hide`: the O1 case reddens), "the hide removes the backdrop before the settle door", "the isolation claims a spared element", "the observer claims a spared insertion", "the press counts any target containing the backdrop" (the containment reading restored: the inert-above case or the SVG case reddens), "the press counts a target inside the panel", and O5's row. Each row records the first failure line; the log ends with the digest receipt.
- **The report.** As round 1: obligations with cases, red and green readings verbatim, the `types.ts` diff, the guide sentences, the instrument table verbatim, the Unknowns' reading, the scoped chain's exit lines, `git status --short`, `git diff --stat`, the deviation state.

## Scope

**Owned.** `src/browser/Offcanvas.ts`, `src/browser/Backdrop.ts`, `src/browser/Isolation.ts`, `src/browser/Delegate.ts` (the offcanvas routes, `#conflicts`, and the class TSDoc only), `src/browser/parsers.ts` (the `parseBackdrop` remarks only), the `Offcanvas*`, `Backdrop*`, and `Isolation*` declarations in `src/browser/types.ts`, in `guides/veneer.md` the `#### Offcanvas`, `#### Backdrop`, and `#### Isolation` sections and the offcanvas sentences of § Delegation and § Surface, `tests/src/browser/Offcanvas.test.ts`, `Backdrop.test.ts`, `Isolation.test.ts`, `Delegate.test.ts` (the offcanvas cases), `tmp/j-offcanvas/**`.

**Off-limits.** `src/browser/Modal.ts` and every other engine, `helpers.ts`, `HostSnapshot.ts`, `tests/setupBrowser.ts`, the vendored files, `ROADMAP.md`, and every file not owned. A change one of them needs is a report-only patch.

**Tools and limits.** No install, commit, push, or discarding git command; no tree-wide `format` or lint `--fix`. Scoped checks: `npm run check:src:browser`, `npm run check`, `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser`, `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md`, one test file per obligation (`Offcanvas.test.ts`, `Backdrop.test.ts`, `Isolation.test.ts`, `Modal.test.ts` for O1's regression reading, `Delegate.test.ts`), then once: `npm run test:src:browser`, `npm run test:guides`, `npm run test:policy`. Write the chain to `tmp/j-offcanvas/acceptance-2.sh` and run the file.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report as your final message.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself: the press listener's placement (element or document), the fixture for the inert-above and SVG presses, the row names, the guide sentences' words within O4. Stop and report when a Modal case reddens under O1 and the repair sits outside `Backdrop.ts` and `Offcanvas.ts`, when the platform delivers the inert-above press elsewhere than the backdrop (report the reading and keep the case), or when a red-first case cannot be made red against round 1's source.

## Acceptance criteria

1. `npm run check:src:browser`, `npm run check`, oxlint, and oxfmt exit 0.
2. `Offcanvas.test.ts`, `Backdrop.test.ts`, and `Isolation.test.ts` green with the O1 and O2 cases present and their red readings recorded; `Modal.test.ts` green.
3. The instrument log: every row `EXACT` or `JOINED` with its first failure line, `GREEN?` rows at 0 failed, the digest receipt.
4. `npm run test:src:browser`, `npm run test:guides`, and `npm run test:policy` exit 0 once at the end.
5. No nested function outside the exceptions in the owned test files; the status lists the owned files only; `Backdrop.ts`, `Isolation.ts`, and `Offcanvas.ts` each hold one class plus imports.

## Review evidence

The Orchestrator takes `git diff HEAD` and `git status --short` after the report, runs the scoped gates, and names both in the round-2 audit brief.
