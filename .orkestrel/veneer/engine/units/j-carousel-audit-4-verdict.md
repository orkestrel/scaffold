# J-CAROUSEL audit — the Orchestrator's reconciled verdict (round 4, the landing round, 2026-09-24)

Subject: the J-CAROUSEL unit's landing round in `veneer/tmp/worktrees/carousel` (`60ea4a0` plus the open merge of `e75608b`), claims `j-carousel-audit-claims-4.md`. Lanes: objective `analyst` on GPT-6 Astra (`j-carousel-audit-4-objective-verdict.md`, thread `01a0d26c-8833-7172-a06d-e7fe71c15066`, journal `scaffold/tmp/codex/j-carousel-audit-4.jsonl`, 31 commands, 505 s) and `checker` on Sonnet (`j-carousel-audit-4-checker-verdict.md`, `UNRESOLVED` on the evidence clauses alone). The subjective lane was not run: the round is a merge, a fold, one call site, and two titles; the deviation is recorded here. Opus 5.5 wrote the round; the objective lane is the engine that did not.

Orchestrator evidence: the worktree's status and unmerged list were read before the lanes launched (every entry staged, none unmerged) and the reflog shows no commit after `60ea4a0`; the replay runs after this round's successor returns.

## Rulings per claim

1. **A mouse release ends the tap exemption — CONFIRMED.**
2. **The two titles — CONFIRMED.**
3. **The merge keeps both units — CONFIRMED on the merge, BROKEN on one sentence.** The § Delegation sentence the writer qualified now says every route except Carousel reads the disabled state through `isDisabled`; the Button and Collapse routes read none (the suite expects a dispatched click to acquire a disabled Button host). Ruling: name Alert, Tab, and Dropdown as the routes that read it, and change no route. Item B of `j-carousel-brief-5.md`.
4. **One delegate — CONFIRMED on the fold, BROKEN on the shared conflict predicate under E12.** The `#conflicts` tab entry collects an unowned tab control whatever its disabled state, while the tab route returns at its `isDisabled` read, so a disabled tab control that is also an unowned carousel host is refused where only the carousel would construct, against E12's "both would construct" condition. This is a landed predicate (the Tab landing's) that the carousel's combination exposes. Ruling: apply the tab route's `isDisabled` predicate when collecting the tab entry (the dropdown entry already does), pin the disabled-tab-and-carousel host as constructing the carousel alone and the enabled one as refused, and add the row; every other route's entry stays. Item A of `j-carousel-brief-5.md`. Source-derived; the red-first case is the reproduction.
5. **Gates and the instrument — CONFIRMED except the replay clause**, which the Orchestrator runs after the round-5 writer returns, before the fast-forward.
6. **Scope and the added lines — CONFIRMED on scope, BROKEN on the claim's population.** The landing diff carries `main`'s content, so its added lines include `main`'s `as const` in `ScrollSpy.test.ts` and an `instanceof Element` narrowing in `Delegate.test.ts`; both are inherited, neither is this unit's edit, and the `as const` is a permitted literal narrowing under the TypeScript rule. The claim's population was the Orchestrator's error; corrected here, not charged to the unit. The `ScrollSpy.test.ts` `as const` is carried to the Toast landing round as a fixture cleanup matching the Dropdown round's ruling for `tests/src/browser`.

## Findings outside the claims

None.

## Carried

- Items A and B to `j-carousel-brief-5.md` (the landing round's successor pass in the same open merge), followed by the Orchestrator's replay of the round-5 instrument, one objective lane over items A and B, and the landing gates.
- The `ScrollSpy.test.ts` `as const` to the Toast landing brief.

## Lanes and checker

Objective lane: ran (Astra). Checker: ran (Sonnet). Subjective lane: not run, for the reason in the head. Nothing was substituted.

VERDICT: FAIL 3, 4, 5, 6 — items A and B carried to `j-carousel-brief-5.md`; the replay and one objective lane follow it before the fast-forward
