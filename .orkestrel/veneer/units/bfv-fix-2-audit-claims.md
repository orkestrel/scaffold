# B-FORMS-VALIDATION round 2 — audit claims

Subject: the fix round `opus` wrote in `/home/user/veneer-bfv` from
`/home/user/veneer-bfv/tmp/units/b-forms-validation-brief-2.md` over the round-1 verdicts
(`/home/user/veneer-bfv/tmp/units/bfv-audit-analyst-verdict.md`, `FAIL 4, 8`, and
`/home/user/veneer-bfv/tmp/units/bfv-audit-reviewer-verdict.md`, `FAIL 8` with findings R1, R2,
F2 to F6). Evidence: `/home/user/scaffold/tmp/audit/bfv-fix-2.diff` (the whole diff against
`3a9202a`, untracked files as additions; the round-1 writes are inside it), `bfv-fix-2-status.txt`,
and the round's report `/home/user/scaffold/tmp/audit/bfv-report-2.md`. The design is
`/home/user/veneer-bfv/tmp/units/b-forms-design-verdict.md`. Rule each claim CONFIRMED, BROKEN, or
UNRESOLVED with `file:line`; rule a claim about a proof on the mutation named and whether the
assertions distinguish it from the passing case.

1. **The focus ring reads the token** (round-1 analyst 4). In
   `tests/src/styles/components/validation.test.ts`, the case `paints the $state focus ring at the
   width the focus token resolves to, over the role triplet` and the case `reaches every host
   through the $state scope as well as through the state class` read `--vn-focus-width` through a
   mounted gauge (`<div id="focus-gauge" style="width: var(--vn-focus-width)">`) and compare the
   painted ring's spread against that reading; the focus case then retunes `--vn-focus-width` to
   `0.5rem` on the document element, asserts the gauge moved, and reads every ring again, and the
   scoped case takes its whole reading under that retune. The mutation "`var(--vn-focus-width)`
   replaced by `3px` at each of its declarations in `src/styles/components/_validation.scss`"
   reddens the four readings the report records (`4 failed | 13 passed (17)`, `expected 8,
   received 3`); no literal `[0, 0, 0, 3]` remains in the file.
2. **The tooltip radius reads its alias** (round-1 reviewer R1). The tooltip case mounts
   `<div id="radius-gauge" style="border-radius: var(--bs-border-radius)">`, asserts the gauge's
   resolved radius is greater than zero, and compares the tooltip's top-left and top-right radius
   against it; the mutation "`border-radius: var(--bs-border-radius);` deleted from the
   `.#{$state}-tooltip` rule" reddens it (`3 failed | 14 passed (17)`, `expected 6, received 0`).
3. **Every `$icons` value is bound to the release** (round-1 reviewer R2). The case in
   `tests/setupStyles.test.ts` titled `binds each form mark in the token map to the release
   declaration that bakes it` compiles the `$icons` map through Sass (`@each $key, $image in
   tokens.$icons`), walks the release's compiled `bootstrap.css` for every declaration whose value
   is a `data:image/svg+xml` URL, and compares the whole binding in one assertion (each map key
   against the release property and selector that bake its value); the `FORM_ICON_CASES`
   assertions against the oracle stay beside it; `tests/setupStyles.ts` is unchanged this round
   (the map is read from its own source rather than transcribed); the mutation "`switch-focus`
   retinted from `%2386b7fe` to `%2386b7ff` in `src/styles/_tokens.scss`" reddens exactly that case
   (`1 failed | 161 passed (162)` under `npm run test:setup`), which is also the measurement that
   no other proof read those values.
4. **The guide** (round-1 analyst 8, reviewer 8). In `guides/veneer.md`: the § Files row for
   `src/styles/components/_validation.scss` names its proof (`read by
   tests/src/styles/components/validation.test.ts`), with no separate proof row added; the density
   sentence in § Validation classes states that the feedback gap and the tooltip padding read
   `--vn-space-2` and `--vn-space-4` and rescale with `--vn-factor-density` while the tooltip's type
   reads `--vn-size-2`, which the size scale holds fixed; the temporal `once` reads `after`; the
   numerals are gone ("in their own partial after the vertical rule", "from a shared mixin as
   well"); the test comment beside the density case in `validation.test.ts` states the same
   corrected generalization (doubling the factors doubles the tokenized spacing and radius, holds
   the type fixed, leaves the em-based icon geometry alone), and the proof pins `14px` before and
   after the factor is doubled.
5. **Copy, titles, and doc blocks** (round-1 reviewer F2, F3, F6). `VALIDATION_COPY.paragraph` in
   `app/browser/constants.ts` reads `Compare the marks, borders, and feedback a passing and a
   failing control carry.` (stacking dropped, to return with the B-FORMS-GROUP specimen that shows
   it); the `VALIDATION_COPY` doc block reads `Holds the Validation section's visible copy and
   accessible name.`; `tests/app/browser/sections/ValidationSection.test.ts` reads the constant by
   reference and needed no edit; the journey case in `tests/app/browser/integration.test.ts` is
   titled `paints a validation focus ring on the passing and the failing text control, in the
   variant this run renders`.
6. **Banned-sense prose and the recomputation** (round-1 reviewer F4, F5). In
   `validation.test.ts` the case title reads "clears it after it is filled", "read in the cases
   above" reads "read in the preceding cases", and "in the check case above" reads "in the earlier
   check case"; in `integration.test.ts` "the assertion below" reads "the following assertion"; in
   `tests/setup.ts` the `VALIDATION_KEYS` remark reads "Only the text controls are driven";
   `attributeSelector` in `tests/setupServer.ts` reuses the `classes` binding for the class-prefix
   fallback and filters `members` without a `[...members]` copy, with behaviour unchanged and
   `tests/setupServer.test.ts` untouched this round; a case-insensitive sweep of the touched prose
   for `once|above|below|should|simply|just|easy|easier` returns only the two permitted hits the
   report names (frequency "once … and once", spatial "stacks … above").
7. **Scope is honest.** The status lists the seventeen tracked files and four untracked paths of
   the VALIDATION unit and nothing else; `src/styles/components/_validation.scss` and
   `src/styles/_tokens.scss` are byte-identical to their pre-plant content (SHA-256
   `1334133a653b783617de39731755bfd2b9977535c7cfb8d22d0f66d5b91948cf` and
   `8142ccd27c7a96119eda8554cc5f0255a6e6a6f5a1d595e53d0fd1d1165eb81e`), so each mutation was
   planted and removed by the exact reverse edit; `tests/setupStyles.ts` carries no change from
   this round; `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/fixtures/**`, `configs/**`,
   and the vendored files are untouched; no `tmp/probe/` path exists.
8. **Gates.** `format:check`, `lint:check`, `check`, `build:src` exit 0; `test:setup` `162 passed`;
   `test:src:styles` `433 passed`; `test:app` `28 passed`; `test:guides` `18 passed`;
   `test:policy` `109 passed | 1 skipped`; observations `test:journey` `104 passed` in 47.27 s and
   `test:conformance` `17 passed`. UNRESOLVED until the Orchestrator's independent chain; rule
   `npm run check` yourself where the sandbox allows it.
