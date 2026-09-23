# ACCORDION landing (`ac` on the session branch over `55ca0cd`) — landing check

## Role and engine

`checker` on Sonnet, a native Claude subagent, read-only (Read, Grep, Glob). It writes nothing and runs nothing.

## Objective

Rule, claim by claim, whether the ACCORDION commit on the Veneer session branch carries the unit's owned files and its shared patch with the conflict resolutions the audit accepted, and nothing else.

## Context

**Subject.** The Veneer checkout `/home/user/veneer` at the commit `ac-landing.commits` names (read the live source, tests, and guide; never `tmp/`, `dist/`, or `node_modules/`; a gate run may be in flight there).

**Evidence, all under `/home/user/scaffold/.orkestrel/veneer/units/`.** `ac-landing.diff` (`git diff 55ca0cd HEAD`), `ac-landing.stat`, `ac-landing-message.txt`; the unit's return `ac-2.diff`, `ac-2-status.txt`, `ac-shared-2.patch`; the resolution instruments `ac-resolve.py` and `land-seams.py` (the seam joiner) and `land-conflict-map.py`; the reconciliation `ac-audit-2-verdict.md` and its rulings; the design verdict `/home/user/scaffold/.orkestrel/veneer/b-collapse-design-verdict.md`.

**Law.** `AGENTS.md` § Writing; `.claude/rules/writing.md`. Skill: none.

**Standing conditions.** Every conflict the patch met was an append conflict at the alert and carousel insertion points, resolved as the landed lines first and the accordion lines after them, which places the Accordion region after Carousel (the last constructed region). The guide's ledger rows append in landing order (`alert`, `carousel`, then `accordion`). The three-way merge dropped the joiner at the constants seam (the last carousel specimen before the Accordion copy constant) and at the registry seam (the last landed resting row before the first accordion row); `land-seams.py` restored each and reported `constants: joined 1`, `setup: joined 1`. `sort-inventories.py` re-sorted the conformance and shipped-key lists. `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored and must be absent from the diff.

## Unknowns

None.

## Scope

Read-only over the evidence files and the Veneer source, tests, and guide. No edit, no command.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Claims

1. **Delta and scope.** The set of files `ac-landing.diff` touches equals the union of the owned files in `ac-2-status.txt` and the files `ac-shared-2.patch` touches; every removed line in `ac-landing.diff` is one `ac-shared-2.patch` removes; neither vendored file appears.
2. **The placement.** `app/browser/Showcase.ts` constructs `AccordionSection` directly after `CarouselSection`; `app/browser/index.ts` exports it directly after `CarouselSection`; `tests/app/browser/Showcase.test.ts` lists `'Accordion'` directly after `'Carousel'` and spreads `ACCORDION_SPECIMENS` directly after `CAROUSEL_SPECIMENS`; `tests/app/browser/index.test.ts` lists `ACCORDION_COPY`, `ACCORDION_SPECIMENS`, and `AccordionSection` in sorted order.
3. **The registry.** In `tests/setup.ts` the `CaptureSubject` union carries every accordion subject the patch adds; the accordion resting rows follow the last carousel resting row, each opening with `Object.freeze({` after the preceding row's `}),` (cite the seam) and the list closing with `}),\n])`; the accordion driven rows follow the last carousel driven row; every row's selector and property equal the patch's.
4. **The guide.** The `accordion | selector` and `accordion | variable` rows follow the `carousel | variable` row; the plugin block is unchanged by this landing; the `### Accordion classes` section, the `#### accordion` departure rows, the `_accordion.scss` Files row, the § Tests links, and the compatibility rows are present as the patch writes them, each in the position the patch's context lines place it.
5. **Every other shared hunk.** `src/styles/_tokens.scss`, `src/styles/index.scss`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/app/browser/integration.test.ts`, `tests/conformance.test.ts`, `tests/setupServer.test.ts`, and `app/browser/constants.ts` carry the patch's hunks byte for byte, the Accordion constants following the closing `])` of the last carousel specimen list, the sorted lists in order, and the formatter changed nothing the patch did not write.
6. **Prose law.** The landing message carries no term the substitution table in `.claude/rules/writing.md` bans unconditionally and no count of a growable set; list every hit with its ruling and name the pattern and paths you swept.

## Output

Return, as the final message, one verdict per claim (`CONFIRMED`, `BROKEN`, `UNRESOLVED`, or `NOT-EVIDENCED`) with `file:line` evidence, findings outside the claims, and the single terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. No process diary; rule every population whole rather than sampling it; state no count of a growable set.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Where an evidence file is missing or a claim's site cannot be located, rule the claim `NOT-EVIDENCED` and name what is missing rather than stopping.

## Acceptance criteria

A verdict on every claim with evidence and the terminal line.

## Review evidence

The diff and status evidence named under Context.
