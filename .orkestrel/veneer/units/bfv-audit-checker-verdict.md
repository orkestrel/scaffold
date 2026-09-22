# B-FORMS-VALIDATION — checker verdict (`checker` on Sonnet)

Claim 1 CONFIRMED: `_validation.scss` opens `@use '../tokens'` then `@layer components`; the
structure mirrors `form-validation-state` selector for selector (feedback 499-505, tooltip 507-519,
reveal 521-526, `.form-control` 528-548, `.form-select` 550-573, `.form-control-color` 575-578,
`.form-check-input` 580-597, `.form-check-inline` 600-602, `.input-group` 604-611); the two
declarations the release nulls (`font-style` on feedback, `line-height` on tooltip) are correctly
absent; `_tokens.scss:451-476` adds only `$icons`; every departure is a token substitution or a
Sass flattening of an equal value.
Claim 7 CONFIRMED for every file-checkable fact (`listed` insertions at sorted positions, six
compatibility rows each obliged by `--bs-form-select-bg-icon`, sixteen departure rows counted from
the diff hunks, no deferral struck, no addition row); UNRESOLVED for the conformance gate reading,
attested only by the writer's report — an independent run settles it.
Claim 8 CONFIRMED: `### Validation classes` at `guides/veneer.md:376` after `### Helper classes`
and before `### Deferred selectors`, matching the barrel order; the § Files row present; the added
prose sweep for `should`, `simply`, `just`, `easy`, `currently`, `via`, `e.g.`, `etc.` returns no
hit; no `guides/ledger/` path; no stated count.
Claim 9 CONFIRMED: the status lists only owned and shared files; `_theme.scss`, `theme.test.ts`,
`tokens.test.ts`, `_mixins.scss`, and the vendored files are untouched; the two `tmp/probe` hits
are pre-existing doc comments outside the diff; the `tests/setupStyles.ts` diff is a single
addition hunk with no removed line (D5 discarded nothing).
Export-name probe CONFIRMED: `FORM_ICON_CASES`, `VALIDATION_KEYS`, `VALIDATION_COPY`,
`VALIDATION_SPECIMENS`, `ValidationSection`, `attributeSelector`, `indexRecordingKeys` collide with
no `@orkestrel/test` browser or server export.
Outside the claims: none.

VERDICT: FAIL 7; outside the claims: none
