# UTIL-DISPLAY landing (`ud` on the session branch over `7d9d415`) — landing check

## Role and engine

`checker` on Sonnet, a native Claude subagent, read-only (Read, Grep, Glob). It writes nothing and runs nothing.

## Objective

Rule, claim by claim, whether the UTIL-DISPLAY commit on the Veneer session branch carries the unit's owned files and its shared patch with the conflict resolutions the audit accepted, and nothing else.

## Context

**Subject.** The Veneer checkout `/home/user/veneer` at the commit `ud-landing.commits` names (read the live source, tests, and guide; never `tmp/`, `dist/`, or `node_modules/`; a gate run may be in flight there).

**Evidence, all under `/home/user/scaffold/.orkestrel/veneer/units/`.** `ud-landing.diff` (`git diff 7d9d415 HEAD`), `ud-landing.stat`, `ud-landing-message.txt`; the unit's return `ud-3.diff`, `ud-3-status.txt`, `ud-shared-3.patch`; the resolution instruments `ud-resolve.py` and `land-seams.py` (the seam joiner) and `land-conflict-map.py`; the reconciliation `ud-audit-3-verdict.md` and its rulings; the design verdict `/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md`.

**Law.** `AGENTS.md` § Writing; `.claude/rules/writing.md`. Skill: none.

**Standing conditions.** Every conflict the patch met was an append conflict at the collapse, alert, carousel, and accordion insertion points, resolved as the landed lines first and the display and flex lines after them, which places the Display and Flex regions after Accordion (the last constructed region). The three-way merge dropped the joiner at the constants seam (the last accordion specimen before the Display copy constant) and at the registry seam (the last landed resting row before the first display row); `land-seams.py` restored each and reported `constants: joined 1`, `setup: joined 1`, `journey: joined 0`. `sort-inventories.py` re-sorted the conformance and shipped-key lists where a sorted list needed it. The `CaptureStem` type change in `tests/setup.ts` is the pending shared change the plan records. `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored and must be absent from the diff.

## Unknowns

None.

## Scope

Read-only over the evidence files and the Veneer source, tests, and guide. No edit, no command.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Claims

1. **Delta and scope.** The set of files `ud-landing.diff` touches equals the union of the owned files in `ud-3-status.txt` and the files `ud-shared-3.patch` touches; every removed line in `ud-landing.diff` is one `ud-shared-3.patch` removes; neither vendored file appears.
2. **The placement.** `app/browser/Showcase.ts` constructs `DisplaySection` and `FlexSection` directly after `AccordionSection`; `app/browser/index.ts` exports them directly after `AccordionSection`; `tests/app/browser/Showcase.test.ts` lists `'Display'` and `'Flex'` directly after `'Accordion'` and spreads `DISPLAY_SPECIMENS` and `FLEX_SPECIMENS` directly after `ACCORDION_SPECIMENS`; `tests/app/browser/index.test.ts` lists the display and flex copy, specimen, and section names in sorted order.
3. **The registry.** In `tests/setup.ts` the `CaptureSubject` union carries every display and flex subject the patch adds; the display and flex resting rows follow the last accordion resting row, each opening with `Object.freeze({` after the preceding row's `}),` (cite the seam) and the list closing with `}),\n])`; the driven rows the patch adds follow the last landed driven row; every row's selector and property equal the patch's; the `CaptureStem` type reads as the patch writes it.
4. **The guide.** The display, flex, vertical-alignment, and stacks ledger rows follow the `accordion | variable` row in the patch's order; the sections, the departure tables, the Files rows, the § Tests links, the compatibility rows, and the § Tailwind sentence are present as the patch writes them, each in the position the patch's context lines place it.
5. **Every other shared hunk.** `src/styles/index.scss`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/setup.test.ts`, `tests/app/browser/integration.test.ts`, `tests/conformance.test.ts`, `tests/setupServer.test.ts`, `tests/fixtures/tailwind/markup.html`, and `app/browser/constants.ts` carry the patch's hunks byte for byte, the Display constants following the closing `])` of the last accordion specimen list, the sorted lists in order, and the formatter changed nothing the patch did not write.
6. **Prose law.** The landing message carries no term the substitution table in `.claude/rules/writing.md` bans unconditionally and no count of a growable set; list every hit with its ruling and name the pattern and paths you swept.

## Output

Return, as the final message, one verdict per claim (`CONFIRMED`, `BROKEN`, `UNRESOLVED`, or `NOT-EVIDENCED`) with `file:line` evidence, findings outside the claims, and the single terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. No process diary; rule every population whole rather than sampling it; state no count of a growable set.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Where an evidence file is missing or a claim's site cannot be located, rule the claim `NOT-EVIDENCED` and name what is missing rather than stopping.

## Acceptance criteria

A verdict on every claim with evidence and the terminal line.

## Review evidence

The diff and status evidence named under Context.
