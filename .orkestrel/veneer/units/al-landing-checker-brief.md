# ALERT landing (`al` on the session branch over `a658879`) — landing check

## Role and engine

`checker` on Sonnet, a native Claude subagent, read-only (Read, Grep, Glob). It writes nothing and runs nothing.

## Objective

Rule, claim by claim, whether the ALERT commit on the Veneer session branch carries the unit's owned files and its shared patch with the conflict resolutions the audit accepted, and nothing else.

## Context

**Subject.** The Veneer checkout `/home/user/veneer` at the commit `al-landing-commits.txt` names (read the live source, tests, and guide; never `tmp/`, `dist/`, or `node_modules/`; a gate run may be in flight there).

**Evidence, all under `/home/user/scaffold/.orkestrel/veneer/units/`.** `al-landing.diff` (`git diff a658879 HEAD`), `al-landing-stat.txt`, `al-landing-message.txt`; the unit's return `al-2.diff`, `al-2-status.txt`, `al-shared-2.patch`; the resolution instruments `al-resolve.py` and `al-seams.py` (anchor-refusing); the reconciliation `al-audit-2-verdict.md` and its rulings; the design verdict `/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md` (M14).

**Law.** `AGENTS.md` § Writing; `.claude/rules/writing.md`. Skill: none.

**Standing conditions.** Every conflict the patch met was an append conflict at the disclosure keys' insertion points, resolved as the disclosure keys first and the alert lines after them, which places the Alert region after Nav (the M14 placement the audit accepted for integration). The plugin block keeps the Collapse, Dropdown, Tab, and ScrollSpy rows, adds the Alert row after them, and keeps the sentence "A `plugin` row records a behavior J-ENGINE owns, while the classes that behavior sets ship in the cascade and render in markup." once (ALERT's variant dropped). `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored and must be absent from the diff.

## Unknowns

None.

## Scope

Read-only over the evidence files and the Veneer source, tests, and guide. No edit, no command.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Claims

1. **Delta and scope.** The set of files `al-landing.diff` touches equals the union of the owned files in `al-2-status.txt` and the files `al-shared-2.patch` touches; every removed line in `al-landing.diff` is one `al-shared-2.patch` removes (the M6 sentence, the `Overlays` row, the `btn-close` rows realigned, the `CLOSE_COPY` sentence, the `CLOSE_DEFERRED` entry); neither vendored file appears.
2. **The placement.** `app/browser/Showcase.ts` constructs `AlertSection` directly after `NavSection`; `app/browser/index.ts` exports it directly after `NavSection`; `tests/app/browser/Showcase.test.ts` lists `'Alert'` directly after `'Nav'` and spreads `ALERT_SPECIMENS` directly after `NAV_SPECIMENS`; `tests/app/browser/index.test.ts` lists `ALERT_COPY`, `ALERT_SPECIMENS`, and `AlertSection` in sorted order.
3. **The registry.** In `tests/setup.ts` the `CaptureSubject` union carries `Dismissible alert`, `Linked alert`, and `Role alerts`; the `role-alerts`, `linked-alert`, and `dismissible-alert` rows follow the last collapse row, each opening with `Object.freeze({` after the preceding row's `}),` (cite the seam), and every row's selector and property equal the patch's.
4. **The guide.** The `alert | selector` and `alert | variable` rows follow the `nav | variable` row; the plugin rows run Collapse, Dropdown, Tab, ScrollSpy, Alert, and the R8 sentence appears exactly once in NAV's wording with no "no shipped Veneer module performs" variant; `### Alert classes`, `#### alert`, the `_alert.scss` Files row, the § Tests links, the rewritten `### Close classes` sentence, and the corrected showcase sentence ("…is named through its `aria-label` attribute.") are present as the patch writes them; no `Overlays` row for `.alert-dismissible .btn-close` remains.
5. **Every other shared hunk.** `src/styles/index.scss`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/app/browser/integration.test.ts`, `tests/conformance.test.ts`, `tests/setupServer.test.ts`, and `app/browser/constants.ts` carry the patch's hunks byte for byte (the `CLOSE_COPY` correction included), and the formatter changed nothing the patch did not write.
6. **Prose law.** The landing message and the resolved plugin block carry no term the substitution table in `.claude/rules/writing.md` bans unconditionally and no count of a growable set; list every hit with its ruling and name the pattern and paths you swept.
7. **The stack.** `al-landing-commits.txt` shows exactly one commit over `a658879`, and its subject line equals the first line of `al-landing-message.txt`.

## Output

Return, as the final message, one verdict per claim (`CONFIRMED`, `BROKEN`, `UNRESOLVED`, or `NOT-EVIDENCED`) with `file:line` evidence, findings outside the claims, and the single terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. No process diary; rule every population whole rather than sampling it; state no count of a growable set.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Where an evidence file is missing or a claim's site cannot be located, rule the claim `NOT-EVIDENCED` and name what is missing rather than stopping.

## Acceptance criteria

A verdict on every claim with evidence and the terminal line.

## Review evidence

The diff and status evidence named under Context.
