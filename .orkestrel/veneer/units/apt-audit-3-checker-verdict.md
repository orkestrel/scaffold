# Audit round 3 — AP-TYPE, claims 1, 4, 5, 6 (checker)

## Per-claim verdicts

**Claim 1 — Scope and gates.** CONFIRMED.
- Status list vs. owned/shared scope: `apt-3-status.txt:1-14` names only files in the owned set (`ap-type-brief.md:77-81`) and the shared set (`ap-type-brief.md:83-84`: `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `guides/veneer.md`). No extraneous file.
- `test:src:styles`: `apt-instruments-3/apt-3-gate-test-src-styles.log.txt:8197-8202` — "1439 passed (1439)", exit 0. Matches report.
- `test:setup`: `apt-instruments-3/apt-3-gate-test-setup.log.txt:32-36` — 320 passed, exit 0.
- `test:conformance`: `apt-instruments-3/apt-3-gate-test-conformance.log.txt:10-15` — 26 passed, exit 0.
- `test:guides`: `apt-instruments-3/apt-3-gate-test-guides.log.txt:10-15` — 20 passed, exit 0.
- `format:check`, `lint:check`, `check`: `apt-instruments-3/apt-3-gate-format-check.log.txt:9`, `apt-3-gate-lint-check.log.txt:5`, `apt-3-gate-check.log.txt:29` — each exit 0.
- No `fluid(`: `apt-instruments-3/apt-3-grep-fluid.log.txt:1-2` — grep exit 1, no match.
- `src/` hunks equal round 2's: read directly (not the self-report log) — `apt-3.diff:1-120` and `apt-2.diff:1-120` (the five owned `src/` files) are byte-identical.

**Claim 4 — J4 font proof paragraph.** CONFIRMED.
- `guides/veneer.md:6195-6202` states the widths 390, 1199, 1200, and 1280. `tests/setupStyles.ts:2199` (`FLUID_WIDTHS = [390, 1199]`) and `:2208` (`CAPPED_WIDTHS = [1200, 1280]`) confirm exactly that set.
- The three named cases (size class vs. heading class, retuned token, size class on a heading tag) correspond to `tests/src/styles/utilities/font.test.ts:28-120`, each looping `CAPPED_WIDTHS`/`FLUID_WIDTHS`.
- Every item in the paragraph's "It also reads …" list (`guides/veneer.md:6197-6202`) maps one-to-one onto a remaining test in `font.test.ts:122-368` (line height, monospace, weight ×2, style, infix, dark/density, later-value, override, priority, escape). No listed case is absent from the file and no test in the file is left unnamed.

**Claim 5 — J1 failing-first/mutation match.** CONFIRMED.
- `.fs-6 fs-1` later-value case added under guard: `ap-type-report-3.md:55` ("18.358px, not 16px") matches `apt-instruments-2/apt-2-mutation-guard.log.txt:113-114` (`font.test.ts:300` case, `expected '18.358px' to be '16px'`), and the runner's default viewport (414px, not stated per-line in that log line but corroborated by `apt-instruments/apt-viewport-probe.log.txt:34,43`).
- `xxl` given its own readings: `ap-type-report-3.md:74` (".h1 reads 33.9429px, not 36px, at 1200; h1 25.6114, not 26.28, at 390") matches `apt-instruments-2/apt-2-mutation-xxl.log.txt:123,220`.
- `xxl-cap` given its own readings: `ap-type-report-3.md:75` (".h1 reads 36.96px, not 36px, at 1280; .display-1 83.6px, not 80px") matches `apt-instruments-2/apt-2-mutation-xxl-cap.log.txt:123,178`.
- Spot-checked `cap` mutation row (`ap-type-report-3.md:73`, 38 failed, `.display-1` 83.6px, legend 24.24px) against `apt-instruments-2/apt-2-mutation-cap.log.txt:137,187,194` — matches exactly.
- Not independently re-verified against every remaining mutation row (`literal`, `literal-cap`, `important`): these carried over unchanged from round 2's already-CONFIRMED reading (`apt-audit-2-verdict.md:13`, claim 1 held) and were not among the J1 findings this round fixes.

**Claim 6 — Law and prose.** CONFIRMED.
- No `any`, type-assertion `as`, non-null `!`, or suppression comment added: `apt-3.diff` added lines containing `as` are all prose ("as the release's… does", "as its exact token") — `apt-3.diff:21,151-152,242-243,442,493,684-685` — none is a TypeScript type assertion; no `@ts-`, `eslint-disable`, or `!.` found.
- No nested function declaration/hidden helper: the sole `+function`-pattern hits (`apt-3.diff:16,20,98`) are the pre-existing Sass `@function fluid-size` (top-level in `_mixins.scss`, identical to round 2, per claim 1's src-hunk check) and prose referencing it — not a round-3 addition, not nested, not hidden.
- Banned terms: swept `apt-3.diff` and `apt-shared-3.patch` added lines against the substitution table; the only hits are `as`/`below` used in the technical/spatial sense ("below the 1200px boundary"), not the banned causal/cross-reference senses — no violation.
- No new count stated in prose (checked `apt-3.diff` and `apt-shared-3.patch` added prose).
- Retitled test named for what it proves: `mixins.test.ts` case (`apt-3.diff:570`) — "applies the responsive rule to a $size rem size against a $root px root below the 1200px boundary and caps it at the size from the boundary" — holds for the 1rem/16px row too, since the rule's `max()` term evaluates to 0 there and the formula still "applies" (fixed result), and the boundary cap clause holds unconditionally. `describe('font size mixin')` (`apt-3.diff:564`) names the mixin correctly. This is the only test retitled in the round-3 diff (confirmed by the `apt-3.diff`/`apt-2.diff` comparison under claim 1).

## Counts the report states

`test:src:styles` 1439; `test:setup` 320; `test:conformance` 26; `test:guides` 20; mutation table: `literal` 3, `literal-cap` 2, `cap` 38, `xxl` 40, `xxl-cap` 40, `guard` 10, `important` 11; baseline run 34 failed and 39 passed of 73 collected.

## Findings outside the claims

None.

VERDICT: PASS
