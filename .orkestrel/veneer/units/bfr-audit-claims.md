# B-FORMS-RANGE — audit claims

Subject: the B-FORMS-RANGE unit's uncommitted writes in `/home/user/veneer-bfr` over `3a9202a`
(`form-range`), written by `opus` from `/home/user/veneer-bfr/tmp/units/b-forms-range-brief.md`
with the fix round `b-forms-range-brief-2.md` on `builder` and one Orchestrator integration edit
(the `range-focus` placement unguarded; `b-forms-range-report-2.md` § Orchestrator correction),
under the design `/home/user/veneer-bfr/tmp/units/b-forms-design-verdict.md` and the family record
`b-passive-family.md`. Evidence: `/home/user/scaffold/tmp/audit/bfr.diff` (the whole diff,
untracked files as additions), `bfr-status.txt`, the reports `bfr-report.md` and `bfr-report-2.md`,
the frames under `/home/user/veneer-bfr/tmp/capture/states/`, the inventory
`/home/user/veneer-bfr/tests/fixtures/oracle/inventory.json`, and the release stylesheet
`/home/user/veneer-bfr/node_modules/bootstrap/dist/css/bootstrap.css`. Every lane rules each claim
CONFIRMED, BROKEN, or UNRESOLVED with `file:line` evidence; a claim about a proof is ruled on the
mutation named and whether the assertions distinguish it.

1. **The partial.** `src/styles/components/_form-range.scss` opens `@layer components` after
   `@use '../mixins' as *` and emits every selector the inventory records under `form-range` (the
   host, `:focus` with both engines' thumb shadows, `::-moz-focus-outer`, the WebKit and Gecko
   thumbs and tracks each in its own rule, the held fills, `:disabled` with its twins, the
   reduced-motion twins through the `transition` mixin) from one `@each` over a partial-local engine
   list; the host rule takes `@include flush-box` (width and padding, the fix round's D2 mixin shared
   with `legend` in `_fieldset.scss`) and the compiled `.form-range` and `legend` rules carry
   `width: 100%` and `padding: 0`; no bare `[type=range]` rule ships.
2. **Token rulings.** Each value in the report's per-value table is a token the shipped partials
   bind or a permitted literal: the space and radius steps, the primary role fill
   `var(--vn-color-primary-base)`, the held tint as `color-mix` over the role and white, the focus
   shadow bound the way `_button.scss` binds it with the `1px` hairline literal and
   `var(--vn-surface-body-base)`, the transition through the mixin, `transparent` and the structural
   values as the release writes them, the `--bs-*` globals byte for byte; no token was added.
3. **The proof.** `tests/src/styles/components/form-range.test.ts` reads the host's resolved
   geometry, the cleared outline under keyboard focus, the WebKit part declarations through
   `findRule` (Chromium exposes no computed style for the parts), the reduced-motion gate, and the
   mode and override readings; the Gecko rules are read in the compiled cascade by the setup case
   `binds every range selector to the inventory, to its engine, and to the tokens it reads`; the five
   mutations the report names each redden the suite as recorded (the Gecko-row drop reddening the
   setup case is the one that covers the Gecko half).
4. **The showcase and the registry.** `FormRangeSection` renders `Range` and `Range disabled` named
   through `aria-label`; `range` and `range-disabled` join `CASCADE_KEYS`; `FORM_RANGE_KEYS` carries
   `range-focus`, spread last into `CAPTURE_KEYS`, placed by the journey case `reaches the range
   slider through the keyboard and leaves its ring to the thumb` in every variant (unguarded after
   the Orchestrator's correction); `tests/setup.test.ts` carries the four-spread assertion; the rest
   frames were written and `range-focus--light-1280.png` was written by the fix round's run.
5. **The accounting.** `form-range` is in `listed` and in the shipped-key Set literal; § Compatibility
   gains one selector row and no variable row (the inventory records no property for the key);
   `guides/ledger/departures.md` gains the 29 rows the report lists (`tokenized` and `dropped`,
   the prefixed appearance and transition aliases dropped); no addition row; no deferral row struck;
   the conformance gate (`17 passed`) is UNRESOLVED until the Orchestrator's own run.
6. **The guide.** `### Form range classes` sits after `### Helper classes` in the `### Table classes`
   voice, states the per-engine emission, the departures, and the two evidence limits (no computed
   style for a part; no drive for a held thumb); the § Files row follows `_vr.scss`; the prose
   follows `writing.md`; no `guides/ledger/` path.
7. **The fix round.** The three patches landed as written (`'form-range',` after `'figure',`; the
   `flush-box` mixin before `border-reset` with both callers; `FORM_RANGE_KEYS` and the placement)
   and `npm run test:setup` moved from `2 failed | 160 passed` to `162 passed`; the `flush-box`
   mixin's fate under the family design round is not this audit's question.
8. **Scope is honest.** The status lists the RANGE unit's owned and shared files plus the fix
   round's owned files and nothing else; `tests/setupServer.ts`'s `attributeSelector` region is
   untouched; the vendored files are untouched; no `tmp/probe/` residue.
9. **Gates.** `format:check`, `lint:check`, `check`, `build:src`, `test:setup` (162),
   `test:src:styles` (422), `test:app` (28), `test:conformance`, `test:guides`, `test:policy` green
   per the fix round's report; `test:journey` red in the fix round only on the portfolio case
   reading the guarded `range-focus` frame, which the Orchestrator's correction addresses and the
   deciding run settles; `npm test` not run.
