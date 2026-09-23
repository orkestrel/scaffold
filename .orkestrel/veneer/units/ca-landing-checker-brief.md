# CAROUSEL landing (`ca` on the session branch over `4977d09`) — landing check

## Role and engine

`checker` on Sonnet, a native Claude subagent, read-only (Read, Grep, Glob). It writes nothing and runs nothing.

## Objective

Rule, claim by claim, whether the CAROUSEL commit on the Veneer session branch carries the unit's owned files and its shared patch with the conflict resolutions the audit accepted, and nothing else.

## Context

**Subject.** The Veneer checkout `/home/user/veneer` at the commit `ca-landing-commits.txt` names (read the live source, tests, and guide; never `tmp/`, `dist/`, or `node_modules/`; a gate run may be in flight there).

**Evidence, all under `/home/user/scaffold/.orkestrel/veneer/units/`.** `ca-landing.diff` (`git diff 4977d09 HEAD`), `ca-landing-stat.txt`, `ca-landing-message.txt`; the unit's return `ca-3.diff`, `ca-3-status.txt`, `ca-shared-2.patch`; the resolution instruments `ca-resolve.py` and `ca-seams.py` (anchor-refusing); the reconciliations `ca-audit-2-verdict.md` and `ca-audit-3-verdict.md` and their rulings; the design verdict `/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md`.

**Law.** `AGENTS.md` § Writing; `.claude/rules/writing.md`. Skill: none.

**Standing conditions.** Every conflict the patch met was an append conflict at the disclosure and alert insertion points, resolved as the disclosure and alert lines first and the carousel lines after them, which places the Carousel region after Alert (the last constructed region, the placement the audit accepted for integration). The plugin block keeps the Collapse, Dropdown, Tab, ScrollSpy, and Alert rows, adds the Carousel row after them, and keeps the sentence "A `plugin` row records a behavior J-ENGINE owns, while the classes that behavior sets ship in the cascade and render in markup." once (CAROUSEL's variant dropped). The registry's declined-frame remark keeps the collapse paragraph and adds the carousel paragraph after a blank comment line. The three-way merge dropped the joiner at the registry seam (the last alert row before the first carousel row) and at the constants seam (the last collapse specimen before the Carousel copy constant); `ca-seams.py` restored each. `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored and must be absent from the diff.

## Unknowns

None.

## Scope

Read-only over the evidence files and the Veneer source, tests, and guide. No edit, no command.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Claims

1. **Delta and scope.** The set of files `ca-landing.diff` touches equals the union of the owned files in `ca-3-status.txt` and the files `ca-shared-2.patch` touches; every removed line in `ca-landing.diff` is one `ca-shared-2.patch` removes (the `### Bootstrap variables Veneer retains` block and the `### Outside the ledger` paragraph it rewrites); neither vendored file appears.
2. **The placement.** `app/browser/Showcase.ts` constructs `CarouselSection` directly after `AlertSection`; `app/browser/index.ts` exports it directly after `AlertSection`; `tests/app/browser/Showcase.test.ts` lists `'Carousel'` directly after `'Alert'` and spreads `CAROUSEL_SPECIMENS` directly after `ALERT_SPECIMENS`; `tests/app/browser/index.test.ts` lists `CAROUSEL_COPY`, `CAROUSEL_SPECIMENS`, and `CarouselSection` in sorted order.
3. **The registry.** In `tests/setup.ts` the `CaptureSubject` union carries `Captioned carousel`, `Fading carousel`, `Inverted carousel`, and `Advancing carousel`; the `captioned-carousel`, `fading-carousel`, `inverted-carousel`, and `advancing-carousel` rows follow the last alert row (`dismissible-alert`), each opening with `Object.freeze({` after the preceding row's `}),` (cite the seam) and the list closing with `}),\n])`; the driven rows `captioned-carousel-hover` and `captioned-carousel-focus` follow the last nav driven row; the declined-frame remark carries the collapse paragraph, a blank ` *` line, then the carousel paragraph; every row's selector and property equal the patch's.
4. **The guide.** The `carousel | selector` and `carousel | variable` rows follow the `alert | variable` row; the plugin rows run Collapse, Dropdown, Tab, ScrollSpy, Alert, Carousel, and the R8 sentence appears exactly once in NAV's wording with no "no shipped Veneer module performs" variant; `### Carousel classes` sits between `### Close classes` and `### Spinner classes` (the barrel's order), `#### carousel` follows `#### btn-close`, the `_carousel.scss` Files row, the § Tests links, the § Showcase declined-frames sentence, and the two M8 rewrites are present as the patch writes them.
5. **Every other shared hunk.** `src/styles/index.scss`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/app/browser/integration.test.ts`, `tests/conformance.test.ts`, `tests/setupServer.test.ts`, and `app/browser/constants.ts` carry the patch's hunks byte for byte, the Carousel constants following the closing `])` of the last collapse specimen list, and the formatter changed nothing the patch did not write.
6. **Prose law.** The landing message and the resolved plugin block carry no term the substitution table in `.claude/rules/writing.md` bans unconditionally and no count of a growable set; list every hit with its ruling and name the pattern and paths you swept.

## Output

Return, as the final message, one verdict per claim (`CONFIRMED`, `BROKEN`, `UNRESOLVED`, or `NOT-EVIDENCED`) with `file:line` evidence, findings outside the claims, and the single terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. No process diary; rule every population whole rather than sampling it; state no count of a growable set.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Where an evidence file is missing or a claim's site cannot be located, rule the claim `NOT-EVIDENCED` and name what is missing rather than stopping.

## Acceptance criteria

A verdict on every claim with evidence and the terminal line.

## Review evidence

The diff and status evidence named under Context.
