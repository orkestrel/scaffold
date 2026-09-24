# J-SCROLLSPY audit — the Orchestrator's reconciled verdict (round 1, 2026-09-24)

Subject: the J-SCROLLSPY unit in `veneer/tmp/worktrees/scrollspy` (branch `unit/scrollspy` from `e24e2c3`, uncommitted), claims `j-scrollspy-audit-claims.md`. Lanes: objective `analyst` on GPT-6 Astra (`j-scrollspy-audit-objective-verdict.md`, thread `01a0d1c0-cd4b-72d3-9cba-e233737f8e64`, journal `scaffold/tmp/codex/j-scrollspy-audit.jsonl`), subjective `reviewer` on Opus 5.5 (`j-scrollspy-audit-subjective-verdict.md`), `checker` on Sonnet (`j-scrollspy-audit-checker-verdict.md`). Every lane ran on the same claims file, blind. Opus 5.5 wrote the unit; the objective lane is the engine that did not write it. The Orchestrator's replay runs before the fix round writes, and the round-2 verdict reads it.

## Rulings per claim

1. **Construction, options, and lifetime — FAIL on the `link` contract.** The mechanism held under every attack of both lanes. The objective lane: after an activation, removing the selected section and calling `refresh()` leaves `#link` set while the link carries its token, so the getter contradicts "undefined when no section is in view" (`types.ts`). The subjective lane's 7(a) is the same sentence from the other side (the getter is `undefined` while a section is in view). Ruling: the getter's contract is the guide's sentence (the link the last activation selected while it carries the `active` token), and `refresh` clears `#link` when the link is no longer in the map it builds. The subjective lane's R1 (the caller's threshold array is retained by reference, so a later push makes `refresh` throw) is a real hole; the constructor copies and freezes the list. Item A.
2. **Refresh and the observer — CONFIRMED on the mechanism; two doors unpinned.** The objective lane's attacks failed; the subjective lane found no row for the observer-identity conjunct of `#holds` or for the `overflow-y` re-read. Item E adds the rows.
3. **The delivery rule and its doors — FAIL.** The objective lane: (i) after the `activate` dispatch, `#activate` returns `#holds(observer, [])`, so a listener that removes the selected link's token does not stop the delivery, and the next entry activates and dispatches again; (ii) the removal doors pass `[]`, so a custom-element reaction that restores a leaving link's token is accepted and a later entry removes the consumer's token again. Ruling: the door after the dispatch requires the link to carry its token, and every removal door requires the removed token absent (an `absent` set beside `present`, the shape `Collapse.#holds` has). The `#activate` early return is unpinned (subjective lane), and the cascade case "writes the token the shipped nav cascade paints as the active pill" has no red row (objective lane). Items B and E.
4. **Smooth scroll — CONFIRMED** by both lanes against `scrollspy.js`.
5. **The delegate's construction scan — CONFIRMED** by both lanes.
6. **The guard, the tables, the parsers, and the barrel — FAIL on one binding.** The mechanism held; `boundsOf` is inclusive (both lanes, from the installed declaration). The valid-margin case of `parseRootMargin` has no red row. Item E.
7. **The guide and the returned patch — FAIL.** The `link` summary (both lanes); the zero-scroll sentence under `#### ScrollSpy` is false when the root scrolls up to zero (subjective 7(b)); the class `@remarks` say "a `disabled` attribute" where the code keeps `disabled="false"` (subjective F3) and promise the token check after the link's write without the dispatch exception (objective); the `Delegate` summary and its § Surface row omit the scan, and § Delegation's reinsertion sentence is false for a scanned host (subjective F2). The § Engine layer-rule sentence (subjective F1) and the additive § Delegation `scrollspy` sentence are W5's. Item C.
8. **Scope, gates, and the added lines — FAIL on one line.** `tests/src/browser/ScrollSpy.test.ts` adds `event.target instanceof Element`, which J-ISINSTANCE's rule makes `isInstance(event.target, Element)` (objective). The `as const` at line 605: the objective lane reads `.claude/rules/typescript.md` as permitting it, and the checker referred it; the Orchestrator's reading of that rule file settles it in the round-2 brief. The Compatibility re-padding changes whitespace alone outside the ScrollSpy rows (the Orchestrator's `git diff -w`). The replay is pending. Item D.

## Findings outside the claims

- Subjective F1 (§ Engine's layer rule): carried to W5 Integration (the § Engine paragraph is shared).
- Subjective F2 (the `Delegate` summary, § Delegation): the false sentences land with this unit (item C); the additive `scrollspy` option sentence waits for W5.
- Subjective F3 (the class `@remarks`): item C.
- Subjective bounds B1 to B6 and the objective lane's referrals are carried where item C or E reaches them cheaply (B4's unreachable fallback, B3's duplicated throw), and otherwise not.

## Lanes and checker

Objective lane: ran (Astra; 29 commands, 470 s). Subjective lane: ran (Opus 5.5). Checker: ran (Sonnet); its `FAIL` list named the behavioural clauses it refers, not refutations. Nothing was substituted.

VERDICT: FAIL 1, 3, 6, 7, 8; outside the claims: F1, F2, F3 (subjective) — round 2 opened by `j-scrollspy-brief-2.md`
