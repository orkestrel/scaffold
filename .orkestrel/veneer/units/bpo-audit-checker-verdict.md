## Checker verdict — B-PASSIVE-ORDER (`bpo`), claims 1, 2, 5, 6

**Claim 1 — Delta and scope.** CONFIRMED.
`/home/user/scaffold/.orkestrel/veneer/units/bpo.diff:1-105` touches only `src/styles/index.scss` (lines 1-37) and `tests/conformance.test.ts` (lines 38-105); `bpo-status.txt:1-2` lists the same two files (` M src/styles/index.scss`, ` M tests/conformance.test.ts`), and no other path appears in either artifact.

**Claim 2 — The order (criterion 4).** CONFIRMED.
`/home/user/veneer-bpo/src/styles/index.scss:52-73` reads: `form-label` through `validation` unchanged (lines 52-59), then `button-group`(60), `card`(61), `breadcrumb`(62), `pagination`(63), `badge`(64), `progress` as `progress-component`(65), `list-group`(66), `close`(67), `spinner`(68), `placeholder`(69), `icon-link`(70), `ratio`(71), `vr`(72), `utilities/gap`(73) — matching the claim exactly, and lines 43-51 (`button` through `table`) are unmoved.

**Claim 5 — The guide move list.** BROKEN.
The section list is confirmed: `guides/veneer.md` at `87ff1d0` has `### Helper classes`(726), `### Pagination classes`(778), `### Button group classes`(828), `### Progress classes`(885), `### Spinner classes`(919), `### Placeholder classes`(941), `### Card classes`(1523), `### List group classes`(1575), `### Breadcrumb classes`(1621), `### Badge classes`(1649), `### Close classes`(1673) — all named in the report's section move list (`b-passive-order-report.md:138-153`) exist and are correctly enumerated. `### Button toolbar classes`(876) is correctly omitted because it names no barrel `@use` entry (not part of the passive block the brief scopes).

But the report's `#### <key>` table move list (`b-passive-order-report.md:155-159`) names `button-group`, `close`, `spinner`, `ratio`, and `vr` as existing `#### <key>` tables to reorder. None of these headings exist in the guide:

```
grep -n "#### \`(ratio|vr|button-group|close|spinner)\`" /home/user/veneer-bpo/guides/veneer.md
→ no matches
```

The full `####` heading list at `87ff1d0` (`/home/user/veneer-bpo/guides/veneer.md:2259-3561`) contains only `pagination`(3272), `placeholder`(3290), `progress`(3298), `form-range`(3308), `card`(3341), `list-group`(3353), `badge`(3363), `breadcrumb`(3369), `btn-close`(3376), and `icon-link`(2868) — no `button-group`, `close` (only `btn-close`), `spinner`, `ratio`, or `vr` table. The report's move list misplaces the guide's real content by asserting reorder targets for headings the guide does not have, and conflates `close` with `btn-close` in its primary ordering sentence (later partially clarified in a footnote, but the primary list at lines 155-159 is uncorrected). This is exactly the omission/misplacement class claim 5 requires the checker to name.

**Claim 6 — Law, gates, and report.** CONFIRMED.
The added case in `bpo.diff:42-104` uses no `any`, `as` (SCSS `as progress-component` is a Sass module alias, not a TypeScript type assertion), `!`, suppression comment, mock, or nested function beyond callbacks passed directly to `.flatMap`/`.matchAll` (lines 72-73, 91-93, 99, 103). No module-level helper or export is added (report confirms at `b-passive-order-report.md:109-111`, and the diff shows `stems`, `passiveNames`, `helperNames`, `passive`, `helpers` all declared inside the `it` body). The added comment (`bpo.diff:46-49`) states no count and uses no term barred by `.claude/rules/writing.md` § Substitutions. The report's `## Scoped gate exits` section (`b-passive-order-report.md:219-241`) records a command and result/exit line for each criterion: `format:check`, `lint:check`, `check`, `build:src:styles`, `test:conformance` (with the added case green), the negative control (red, exit 1), the scoped styles run, and `test:guides`.

**Findings outside claims 1, 2, 5, and 6.** None identified within this lane's assigned scope.

VERDICT: FAIL 5; outside the claims: none
