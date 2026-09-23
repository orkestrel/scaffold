# bfl audit, checker lane (`checker` on Sonnet) — verdict

Brief: `units/bfl-audit-checker-brief.md`. Claims: `units/bfl-audit-claims.md`. Assigned claims 1, 2, 7, 8, 9.

**Claim 1 — Delta and scope: CONFIRMED**
`bfl.diff` `diff --git` headers (lines 1, 1100, 1147, 1159, 1227, 1416, 1548, 1712, 2053, 2095) list exactly: `guides/veneer.md`, `src/styles/components/_form-label.scss` (new), `src/styles/index.scss`, `tests/conformance.test.ts`, `tests/setupServer.test.ts`, `tests/setupServer.ts`, `tests/setupStyles.test.ts`, `tests/setupStyles.ts`, `tests/src/styles/components/form-floating.test.ts`, `tests/src/styles/components/form-label.test.ts` (new). `bfl-status.txt` lines 1-10 list the identical ten paths. No off-limits path (`app/**`, `tests/app/**`, `tests/setup.ts`, `tests/setup.test.ts`, `src/styles/_mixins.scss`, vendored policy files, `README.md`) appears in either file.

**Claim 2 — The partial and the barrel: CONFIRMED**
`/home/user/veneer-bfl/src/styles/components/_form-label.scss:1109-1146` (mirrored at `bfl.diff:1105-1146`): `@layer components` wraps `.form-label { margin-bottom: var(--vn-space-4) }` (1117), `.form-text { margin-top: var(--vn-space-2); font-size: 0.875em; color: var(--bs-secondary-color) }` (1120-1124), `.col-form-label { padding-top/bottom: calc(var(--vn-space-3) + var(--bs-border-width)); margin-bottom: 0; font-size: inherit; line-height: var(--vn-line-body) }` (1131-1137), and the `@each $size, $space, $font in $sizes` loop (1139-1145) over the file-local `$sizes: (('lg', var(--vn-space-4), var(--vn-size-5)), ('sm', var(--vn-space-2), var(--vn-size-2)))` list declared at 1109 outside the layer — large before small, each padding `calc(<space> + var(--bs-border-width))`. No `@use` line inside the partial; no declaration beyond these five rules. `src/styles/index.scss:1155-1156` (`bfl.diff:1155-1156`) loads `@use 'components/form-label';` directly before `@use 'components/form-control';`. Verified against the actual built artifact: `grep -o` on `/home/user/veneer-bfl/dist/src/styles/index.css` returns one match each for `.form-label{margin-bottom`, `.form-text{margin-top`, `.col-form-label{padding-top`, `.col-form-label-lg`, `.col-form-label-sm` — the five rules ship.

**Claim 7 — The guide: BROKEN (one point), otherwise CONFIRMED**
Confirmed by direct read of `/home/user/veneer-bfl/guides/veneer.md`:
- § Files row `_form-label.scss` (line 210) precedes `_form-control.scss` (line 211).
- `### Form label classes` exists (line 980); forms section order is Placeholder(939) → Form label(980) → Form control(1024) → Form select(1110) → Form check(1190) → Form range(1262) → Form floating(1323) → Input group(1400) → Validation(1477), matching the claim.
- § Deferred selectors (1698-1734) has no `.col-form-label*` row.
- § Compatibility: `form` selector row and `form` variable row (3899-3900), `col` row for `.col-form-label*` (3814).
- § Departures: `#### col` (2556) sits between `#### btn` (2263) and `#### container` (2570); `#### row-gap` (3119) sits after `#### row` (3112); the split per-key tables run `form`(3380) → `form-check`(3387) → `form-control`(3406) → `form-floating`(3455) → `form-select`(3488) → `input-group`(3521) → `invalid-feedback`(3534) → `invalid-tooltip`(3540) → `valid-feedback`(3548) → `valid-tooltip`(3554), sort order as claimed.
- Style-proof link: `[the form label classes](../tests/src/styles/components/form-label.test.ts)` present at guide line 1004 area (linked from § Form label classes).
- § Showcase paragraph (guide lines 4017-4021) is byte-identical to the brief's quoted sentence in `b-forms-label-cascade-brief.md:82-86`.

**BROKEN: "§ Tests unchanged in the diff" is false.** `bfl.diff:1092-1099` contains a hunk `@@ -4017,6 +4134,7 @@` inside the guide's `## Tests` section (the unchanged `## Tests` heading appears as context at `bfl.diff:1089`) that adds one line: `+[the form label classes](../tests/src/styles/components/form-label.test.ts),` (line 1096), between the vertical-rule and form-check proof links. Mutation: deleting that added line reverts § Tests to its prior state and the diff hunk disappears — the hunk's presence is exactly what the claim asserts does not exist, so the claim is falsified by the diff itself, not by a judgment call.

**Claim 8 — Law and prose: CONFIRMED, no defect found**
Case-insensitive sweep of `bfl.diff` for the full `.claude/rules/writing.md` § Substitutions unconditional-ban set (`should`, `simply`/`easy`/`just`, `utilize`/`leverage`, ` via `, `in order to`, `e.g.`/`i.e.`, `etc.`, `performant`/`robust`, `allows you to`, `and/or`, `please`, `sanity check`, `dummy`, `blacklist`/`whitelist`, `master`/`slave`) returned no matches. Sweep for `any`, `as `-casts, `!`-assertions, `@ts-ignore`/`@ts-nocheck`/`@ts-expect-error`, `eslint-disable`, `vi.mock`/`vi.fn`/`jest.mock` in added lines returned only prose uses of "as" (comparative/temporal, e.g. `bfl.diff:1331`, `1433`, `1739`) — none are TypeScript syntax. Spot-checked `tests/setupServer.test.ts` (`bfl.diff:1227-1413`) and `tests/setupServer.ts` diff for nested nonfunction declarations and `@orkestrel/test` duplication turned up none; test titles (e.g. `bfl.diff:1283` "selects the longest key any class of a selector equals or opens with") name what each case proves.

**Claim 9 — Report honesty and the findings: BROKEN on one item**
`b-forms-label-cascade-report.md:131` states `- § Tests is unchanged.` This is the same false claim identified under claim 7 — the report's own record is inaccurate, not merely the audit-claims restatement of it. This is a report-honesty defect: the report records a criterion result that the actual diff contradicts. I did not exhaustively re-verify the mutation table, the failing-first run line, or the two findings' substance (the horizontal-label size limit and the Form select sentence) beyond this point; no evidence surfaced contradicting those parts within the claims and sections read.

Outside the assigned claims: none found.

VERDICT: FAIL 7, 9; outside the claims: none
