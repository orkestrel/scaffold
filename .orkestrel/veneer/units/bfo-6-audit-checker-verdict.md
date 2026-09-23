# B-FORMS-CONTROL, round 6 (the round-5 prose findings) — `checker` on Sonnet, mechanical conformance

Native subagent, clean context, read-only, on the tree of `/home/user/veneer-bfo5` on 2026-09-23. The verdict text is the lane's handback verbatim.

VERDICT for B-FORMS-CONTROL round-6 audit — checker lane (claims 1, 3, 4 reading parts)

**Claim 1 — The delta is the brief.** CONFIRMED.
Diffing `bfo-5.diff` (`/home/user/scaffold/.orkestrel/veneer/units/bfo-5.diff`) against `bfo-6.diff` (`/home/user/scaffold/.orkestrel/veneer/units/bfo-6.diff`), both taken against `f82de43`, the round-5 end state for each of the six sites matches the exact search text `b-forms-control-brief-6.md` § Edits names, and the round-6 end state matches each prescribed replacement, rewrapped:
- Edit 1 (`guides/veneer.md`, "Every child after the first pulls back" paragraph): round-5 text at `bfo-5.diff:13-14` ("a control's own border is the one the `.form-control` rule ships, so the seam paints one line, and the group squares") matches the brief's search string; round-6 result at `bfo-6.diff:18` ("wide, and the group squares") matches the prescribed replacement.
- Edit 2 (`guides/veneer.md`, "The `.dropdown-toggle` corner rules stay withheld" paragraph): unchanged by round 5 (absent from `bfo-5.diff`), so the pre-round-6 text is the original `f82de43` text the brief quotes; round-6 result at `bfo-6.diff:38-40` matches the prescribed replacement verbatim.
- Edit 3 (`tests/app/browser/integration.test.ts`, input-group focus case): round-5 text at `bfo-5.diff:46-47` ("The reading below uses the button's own border width, which is the / width the group's pull-back is written in") matches the search string plus untouched tail; round-6 result at `bfo-6.diff:68-69` ("The following reading uses the button's own border width, which is / the width the group's pull-back is written in") matches.
- Edit 4 (plain-select focus case): round-5 text at `bfo-5.diff:28-31` matches the brief's quoted opening/closing span; round-6 result at `bfo-6.diff:52-53` matches the prescribed replacement.
- Edit 5 (input-group focus case, second comment): round-5 text at `bfo-5.diff:55-56` ("...for the reason the plain-select case states.") matches the brief's quoted span; round-6 result at `bfo-6.diff:78` ("...for the reason the range slider case states.") matches the prescribed replacement.
- Edit 6 (`tests/src/styles/components/input-group.test.ts`): round-5 text at `bfo-5.diff:73-74` matches the search string; round-6 result at `bfo-6.diff:96-98` matches the prescribed replacement, and the pre-existing `toBe(600)` assertion from round 5 (`bfo-5.diff:77-78`) is carried unchanged into round 6 (`bfo-6.diff:100-101`).

No other hunk differs between the two diffs beyond these six sites and their rewraps. `git diff f82de43 --stat` in `b-forms-control-report-6.md:83-87` lists the same three files `bfo-5.diff` touches (`guides/veneer.md`, `tests/app/browser/integration.test.ts`, `tests/src/styles/components/input-group.test.ts`), and the status in `b-forms-control-report-6.md:76-79` is that same three-file set with no addition.

**Claim 3 — The comments.** CONFIRMED.
- No `below`: the one changed comment that carried `below` (`bfo-5.diff:44`, "The reading below uses...") is edited to "The following reading" at `bfo-6.diff:68`. Grep of `/home/user/veneer-bfo5/tests/app/browser/integration.test.ts` for `below` finds one remaining hit at line 1485 ("leave every refusal below asserting..."), a pre-existing comment untouched by round 5 or round 6 and therefore outside "changed comment."
- Preceding-focus reason lives in the range case alone: `/home/user/veneer-bfo5/tests/app/browser/integration.test.ts:913-916` (the `Range` test's own preceding-focus setup, itself using the `Form control readonly` specimen) states the reason ("driveTraversal` walk stops at the first element it reaches twice"). The plain-select case (`tests/app/browser/integration.test.ts:1011-1012`) and the input-group case (`tests/app/browser/integration.test.ts:1433-1434`) each point to "the range slider case" rather than restating the reason.
- Layout comment names the scoped `width: 1%`: `tests/src/styles/components/input-group.test.ts` final text at `bfo-6.diff:96-98` reads "the group's `width: 1%` stays scoped to the group's children."
- Every changed comment (edits 3-6) follows `writing.md`: no banned substitution-table term found in any of the four final texts; each backticked identifier token is followed by a noun (`Range` specimen, `Input group addons` specimen, `.form-control` rule), and `width: 1%` counts as its own noun per `bfo-3-audit-verdict.md` claim 2, consistent with the brief's law section.

**Claim 4 — Law and scope (reading parts only; `npm run check` exit code left to the objective lane).** CONFIRMED.
The added code in `bfo-6.diff` (the two `requireValue(...).focus()` blocks at `bfo-6.diff:54-58` and `bfo-6.diff:79-83`) contains no `any`, no `as` (not even `as const`), no non-null assertion (`!`), and no `@ts-nocheck`/`@ts-ignore`/`@ts-expect-error`/`eslint-disable`. No nested function declaration or assignment is introduced beyond the existing call-and-callback shapes already in the file; the added lines are plain `const` bindings and method calls. `git status --porcelain` in `b-forms-control-report-6.md:76-79` shows exactly the three owned files modified, matching the brief's § Scope owned list, and no off-limits file appears in either the status or the `--stat` output.

**Findings outside claims 1, 3, 4:** none.

VERDICT: PASS
