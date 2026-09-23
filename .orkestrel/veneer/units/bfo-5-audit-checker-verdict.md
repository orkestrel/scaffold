# B-FORMS-CONTROL, round 5 (the landing's consequences) — `checker` on Sonnet, mechanical conformance

Native subagent, clean context, read-only, on the tree of `/home/user/veneer-bfo5` on 2026-09-23. The verdict text is the lane's handback verbatim.

## Verdict — B-FORMS-CONTROL round 5 audit, checker lane (claims 1, 4, 5)

**Claim 1 — The delta is the brief.** CONFIRMED.
`/home/user/scaffold/.orkestrel/veneer/units/bfo-5.diff:1-79` contains exactly four hunks: `guides/veneer.md:1-16` (edit 4's sentence, verbatim match to brief `b-forms-control-brief-5.md:125-129`), `tests/app/browser/integration.test.ts:24-39` (edit 1, verbatim match to brief lines 87-99) and `:40-64` (edit 2, verbatim match to brief lines 102-117), and `tests/src/styles/components/input-group.test.ts:65-79` (edit 3, verbatim match to brief lines 120-124). No other hunk appears in the diff. `bfo-5-status.txt:1-3` lists exactly `guides/veneer.md`, `tests/app/browser/integration.test.ts`, `tests/src/styles/components/input-group.test.ts` — precisely the three owned files named in the brief's § Scope "Owned" (`/home/user/veneer-bfo5/tmp/units/b-forms-control-brief-5.md:133-134`), nothing else.

**Claim 4 — The prose.** CONFIRMED, for the two comments (edit 2's border-width comment and edit 3's bare-control comment) and the guide sentence (edit 4).

- `bfo-5.diff:46-47` (edit 2 comment): "The reading below uses the button's own border width, which is the width the group's pull-back is written in." — contains no backticked identifier token, so the identifier-noun rule is inert here; no banned term from `.claude/rules/writing.md` § Substitutions matches (checked `should`, `simply`/`easy`/`just`, `currently`/`now`, `new`/`latest`, `utilize`/`leverage`, `via`, `in order to`, `since`, `once`, `above`/`below`, none present); no count of a growable set.
- `bfo-5.diff:73-75` (edit 3 comment): "The same control outside a group is no flex item; it takes the full width the `.form-control` rule gives it." — the identifier token `` `.form-control` `` is followed by the noun "rule," satisfying the family scope stated in `.orkestrel/veneer/units/bfo-3-audit-verdict.md:16-20` (a CSS class/selector identifier "takes one" noun, as opposed to a bare property/value/function/`!important` token, which is exempt). No banned term, no growable-set count.
- `bfo-5.diff:9-16` (guide sentence, edit 4): "a control's own border is the one the `.form-control` rule ships, so the seam paints one line, and the group squares each corner a neighbour touches while the group's outer corners keep the child's own radius." — `` `.form-control` `` is again followed by the noun "rule." No banned term. No count of a growable set (the prior "two columns" language is removed; "one line" describes a rendering fact, not a set members can be added to). The sentence states what the seam paints now that the control ships its border ("so the seam paints one line"), satisfying claim 4's second requirement.

**Claim 5 — Law and scope** (remaining parts; the `npm run check` instruction is addressed to the objective lane per the brief and is not ruled on here). CONFIRMED.

- No `any`: `bfo-5.diff` contains no occurrence of the literal token `any` outside prose.
- No `as` other than `as const`: no `as` token appears anywhere in `bfo-5.diff`.
- No `!` (non-null assertion): no bare `!` operator appears; the only `!` characters in the diff are inside prose sentences (none present) — confirmed by inspection of `bfo-5.diff:1-79`.
- No suppression (`@ts-nocheck`, `@ts-ignore`, `@ts-expect-error`, `eslint-disable`): none appear in `bfo-5.diff`.
- No nested function beyond a callback passed or returned directly: the added statements (`bfo-5.diff:28-37`, `55-61`) are three top-level statements (`const preceding = requireValue(...)`, `preceding.focus()`, and the pre-existing `traverseAccessible` call) inside the existing `it(...)` callback body; no new function declaration or expression is introduced.
- Off-limits files untouched: `bfo-5-status.txt:1-3` lists only the three owned files; none of `src/**`, `app/**`, `tests/setup*.ts`, `package.json`, `package-lock.json`, `ROADMAP.md`, or vendored files appear, matching the off-limits list at `b-forms-control-brief-5.md:138-140`.

**Referrals.** None — claims 1, 4, and 5's remaining parts resolve by reading alone. Claim 5's `npm run check` reading and claims 2 and 3 (the walk-reachability and layout-proof mutation rulings) are outside this lane's assignment per the brief and are not ruled on here.

VERDICT: PASS
