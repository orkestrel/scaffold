# B-FORMS-FLOATING, round 2 (the fix round) — `checker` on Sonnet

Subject: claims 4, 7, 8, and 9 of `bff-fix-audit-claims.md`, read on the tree of `/home/user/veneer-bff` on 2026-09-23. Read-only; the verdict text is the lane's handback verbatim.

Checker verdict — claims 4, 7, 8, 9 (bff-fix-audit-checker-brief.md)

**Claim 4 — CONFIRMED.**
`/home/user/veneer-bff/guides/veneer.md:2692-2723` (the `#### form-floating` ledger): every row printed is `tokenized` (no row reads `declared`); the height/min-height rows for `.form-control`, `.form-control-plaintext`, and `.form-select` are present as `tokenized` (lines 2696-2701); each `padding-top` row sits directly before its selector's `padding-bottom` row (2705-2706, 2707-2708, 2709-2710, 2711-2712, 2713-2714, 2715-2716, 2717-2718).
`/home/user/veneer-bff/tests/setupStyles.ts:3763-3817` (`FORM_FLOATING_CASES`): `--vn-space-8` is present in `reads` for the select row (3766), the focus row (3791), the filled row (3796), both plaintext focus/filled rows (3801, 3806), and both autofill rows (3811, 3816).

**Claim 7 — CONFIRMED.**
`### Validation classes` at `/home/user/veneer-bff/guides/veneer.md:484-489` still reads "after the vertical rule in the components layer", matching the report's diff context (`b-forms-floating-report-2.md:120-124`) exactly, so the patch applies cleanly to the tree's current text (unapplied, as the report states it is for the Orchestrator's integration).
Changed sentences checked against `writing.md`: "which Veneer does not ship yet" (`veneer.md:851`); the opening sentence's nested serial list split into three sentences (`veneer.md:782-785`); "the browser's autofill" replacing "an autofill" (`veneer.md:796`); the limits sentence names `tests/src/styles/components/form-floating.test.ts` (`veneer.md:842-843`); the input-group sentence states the input-group partial emits the rules for a floating child and the ledger attributes a selector naming both classes to this key (`veneer.md:789-792`); the barrel sentence states D35's order and consequence (`veneer.md:786-788`). No banned substitution-table term found in these lines (checked case-insensitively). No line in the changed prose exceeds 100 columns (table rows are pre-existing wide format, not prose, and unaffected by this claim's scope). No count of a growable set found in the changed sentences.

**Claim 8 — CONFIRMED.**
`b-forms-floating-report-2.md:138-141`, the ROADMAP patch rows: row 1 names only B-FORMS-SELECT; row 2 names only B-FORMS-CONTROL; row 3 names only B-FORMS-SELECT; row 4 names only B-PASSIVE-CLOSE. Each row names exactly one carrier. This claim concerns the report's patch content, not an applied `ROADMAP.md` (the claims file states the Orchestrator applies it at integration).

**Claim 9 — CONFIRMED.**
`bff-2-status.txt:1-19` lists the same paths as `bff-status.txt` (round 1) with no new path, matching the claims file's "already established" reading. Four new (`A`) owned files: `app/browser/sections/FormFloatingSection.ts`, `src/styles/components/_form-floating.scss`, `tests/app/browser/sections/FormFloatingSection.test.ts`, `tests/src/styles/components/form-floating.test.ts` — matching "the four untracked owned files."
`tmp/probe/` absent: `Glob` over `/home/user/veneer-bff/tmp/probe/**` returned no files.
Off-limits files untouched by round 2 beyond round 1's baseline: diffed the hunks for `app/browser/Showcase.ts`, `app/browser/constants.ts`, `app/browser/index.ts`, `app/browser/sections/FormFloatingSection.ts`, `tests/setup.test.ts`, `tests/setup.ts`, `tests/setupServer.test.ts`, `tests/setupServer.ts`, `tests/setupStyles.test.ts` between `bff.diff` (round 1) and `bff-2.diff` (round 1+2 combined) — every hunk is byte-identical (`bff.diff:1-1105` vs `bff-2.diff:1-1173`), so round 2 added no change to any off-limits or shared file. The round-2-owned files (`src/styles/components/_form-floating.scss`, `src/styles/index.scss`, `tests/src/styles/components/form-floating.test.ts`, `tests/conformance.test.ts`, `tests/setupStyles.ts`, `guides/veneer.md`) are within the brief-2 Owned list at `b-forms-floating-brief-2.md:141-146`.

No findings outside claims 4, 7, 8, 9 arose during this check.

VERDICT: PASS
