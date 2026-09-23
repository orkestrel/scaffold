# `checker` verdict — B-FORMS-CLOSE-TABLES (`bft`), claims 1, 2, 7, 9, and the helper-duplication probe (Sonnet, agent ae3a380f8ed00ee47)

Retained verbatim from the lane's returned message.

---

**Claim 1 — CONFIRMED.** `bft-status.txt:1-7` lists exactly the seven files the brief owns:
`tests/conformance.test.ts`, `tests/setupServer.test.ts`, `tests/setupServer.ts`,
`tests/setupStyles.test.ts`, `tests/setupStyles.ts`,
`tests/src/styles/components/form-range.test.ts`,
`tests/src/styles/components/input-group.test.ts` — and nothing else. `bft.diff` contains hunks
for only those seven paths. `grep -rn INPUT_GROUP_ROUNDING` over `src`, `tests`, `guides`, `app` in
`/home/user/veneer-bft` returns nothing (the only tree hit is `ROADMAP.md`, outside those four
roots, so it does not falsify the claim as scoped).

**Claim 2 (mechanical parts) — CONFIRMED.**
- `bft.diff:604-614` — `INPUT_GROUP_ROUNDING` export and its doc block deleted.
- `bft.diff:174,182` — its import and exports-case entry deleted from `setupStyles.test.ts`.
- `bft.diff:368-372` — the freeze case's `@layer elements` / `.form-control, .form-select` expectations deleted.
- `bft.diff:359-360` — the freeze case's title drops "and the rounding rule" (now "…carries the grouped children the proofs mount").
- `grep -n 'scene\.load\(INPUT_GROUP_ROUNDING\)' bft.diff` returns three `-` lines (680, 715, 731) — all three calls removed, none survive (confirmed absent from `/home/user/veneer-bft/tests`).
- `grep -rn 'until the control family lands' /home/user/veneer-bft` returns nothing — the sentence is gone.

**Claim 7 — CONFIRMED for presence, count, and banned-term conformance; UNRESOLVED on the code-token clause.**
- Both required sentences are present: the `FORM_CONTROL_CASES` remark gains the "declaration the row neither values nor reads falls outside both maps…reports it as a `declaration` addition" sentence (`bft.diff:624-626`), and the range remark states the property-keyed claim in the `FORM_CONTROL_CASES` remark's words with its own "table holding no values" clause (`bft.diff:413-420`).
- No count and no substitution-table banned term appears in any `+` line of the diff (checked against the full `writing.md` table, case-insensitively; no hits).
- Unresolved: two new/changed comments use the bare code token `` `var()` `` with no following noun — `bft.diff:41` ("read a `var()`") and `bft.diff:417` ("writes no `var()`, so an empty map states…"). Whether a CSS function token like `var()` needs a trailing noun under the `.claude/rules/writing.md` "code token followed by a noun" rule, or is exempt as a syntax reference rather than a named symbol, is a judgment call — the identical bare phrasing already existed unchanged in the pre-diff baseline text at the same site (visible as unmodified context around the diff's remark rewrite), so this may be an inherited house style rather than a new defect. **Referral to the subjective lane (or the Orchestrator) rather than a ruling of my own.**

**Claim 9 (reading parts) — CONFIRMED.**
- No `any`, no type-assertion `as X` (only prose "as a…"/"as written"/"as bound" and no `as const` either), no non-null `!` (only `!==`/`!declared` boolean negation), no `@ts-ignore`/`@ts-nocheck`/`@ts-expect-error`/`eslint-disable` in any `+` line.
- No nested function declarations beyond an anonymous callback passed directly as an argument (`filter`, `map`, `some` callbacks only).
- `FormRangeCase` (`bft.diff:384-396`) declares every property `readonly`.
- Off-limits files untouched: `bft-status.txt` shows only the seven owned files; none of `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `configs/**`, `package*.json`, `vite.config.ts`, `tsconfig.json`, `src/**`, `tests/setup.ts`, `tests/setup.test.ts`, `tests/app/**`, or the sibling-owned component test files appear.
- `npm run check`'s exit code is the objective lane's reading, not ruled here.

**Helper-duplication probe — no defect found.** Read
`/home/user/veneer-bft/node_modules/@orkestrel/test/dist/src/server/index.d.ts` and
`/home/user/veneer-bft/node_modules/@orkestrel/contract/dist/src/core/index.d.ts` (the actual
installed path; `dist/index.d.ts` named in the brief does not exist there). Neither package
exports a cascade-block, declaration-reads, or custom-property-collection helper by any name; a
grep for `cascade|Cascade|declarationRead|DeclarationRead` in the contract entry returns nothing.
`collectDeclarationReads` does not duplicate an installed export.

**Findings outside claims 1, 2, 7, 9:** none to the BROKEN standard.

VERDICT: FAIL 7; outside the claims: none
