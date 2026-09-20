# U4b audit round 2 — numbered claims (both lanes and the checker)

Subject: the U4b working tree in `C:/Users/mikes/WebstormProjects/veneer` on `ef1a563` after
briefs 2 and 3 (`.orkestrel/veneer/units/u4b-brief-2.md`, report `units/u4b-report-2.md`;
`units/u4b-brief-3.md`, report `units/u4b-report-3.md`; instruments under
`units/u4b-instruments-2/` and `-3/`), on top of the round-1 tree that `u4b-audit-verdict.md`
ruled on, plus the Orchestrator's declaration of `@orkestrel/markdown` in `devDependencies`.
Astra (`sol`) wrote both briefs, so the lanes are swapped: the `reviewer` on Opus holds the
OBJECTIVE lane and the `analyst` on Astra the SUBJECTIVE lane and is told its engine wrote the
work. This file alone fixes the claim numbers. The Orchestrator rendered the diff over
`ef1a563` including the untracked fixtures at `units/u4b-diff-2.patch.txt` and the status at
`tmp/audit/u4b-status-2.txt`. Rule on every claim with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE`
and the deciding evidence (`file:line` or exact text); read the rendered diff and the live files,
never the reports alone; execute a reading in memory where a claim names one. Round 1 confirmed
everything briefs 2 and 3 do not touch. The user has ruled that rounds focus on implementation:
a wording finding is a bound, never a round-forcer. Law: scaffold's `AGENTS.md`,
`.claude/rules/tests.md`, `architecture.md`, `typescript.md`.

1. **The binding table.** `tests/setupConformance.ts` exports the readonly `OracleBinding` shape
   and the frozen `ORACLE_BINDINGS` table (component, category, obligation or `undefined`, the
   accepted step patterns, the predicate); `scanOracleObligation` selects by component and
   category and then the exact obligation, returns `missing recording step` for a proof naming
   no step and `proof step does not prove this obligation` for a step outside the accepted
   patterns; executed: the data-api row handed `button.hover` returns the `does not prove` text,
   handed `button.keyboard.space` and `button.click.toggle` returns `undefined`; the disabled row
   handed `button.click.toggle` returns the `does not prove` text; every entry's patterns match
   at least one step of the committed fixture (the table-completeness case); no entry carries a
   keyboard obligation, and the data-api and `toggle()` entries accept the keyboard steps.
2. **The pressed attribute.** `matchesOracleToggle` and the accessibility predicate require
   `after.attributes['aria-pressed']` to be exactly `'true'` or `'false'`; executed: the
   accessibility row over a reading with the attribute deleted returns the `contradicts` text and
   over the fixture's own step returns `undefined`; report 2's red run records these cases
   failing before the change (`units/u4b-instruments-2/red-setup.log.txt`).
3. **The keyboard rows.** `guides/veneer.md` § Compatibility carries no `Space activates` or
   `Enter activates` row; every remaining row passes the bound scanner on the ordinary run; the
   keyboard steps stay in the fixture.
4. **The pinned cascade and the listener.** The recorder writes the stylesheet read from
   `resolve(dirname(BOOTSTRAP_MANIFEST_PATH), 'dist/css/bootstrap.css')`; the listener set
   records the native `click` beside `toggle.bs.button` and `toggled.bs.button` and no longer
   names `click.bs.button.data-api`; the refreshed `tests/fixtures/oracle/button.json` carries
   `["click"]` in `after.events` for `click.toggle`, `click.release`, `keyboard.space`,
   `keyboard.enter`, `pointer.release`, and `pressed.click` under both media and `[]` elsewhere;
   the `event`-category predicate has a positive case.
5. **The exclusion and the JSON form.** `scanOracleFixture` normalizes the supplied fixture and
   the live recording through the same JSON round-trip, skips a step named in `excluded` in
   both the per-step and the whole-recording comparison, and refuses an exclusion naming no
   recorded step; the two controls at `tests/setupConformance.test.ts` (the skipped differing
   hover reading; the malformed exclusion) pass; report 3 records the red run (2 failed, 94
   passed) and the green run (96 passed); `excluded` is empty in the committed fixture.
6. **The refresh and the comparisons.** The fixture was re-recorded under `ORACLE_REFRESH=1` on
   managed Chromium, and ordinary runs matched it twice on Chromium and once on Edge
   (`units/u4b-instruments-3/`); an ordinary run writes no fixture.
7. **Law and scope.** No `any`, non-null assertion, type assertion, `@ts-` directive,
   `eslint-disable`, default export, nested function, or class in a setup module; readonly
   shapes; `tmp/audit/u4b-status-2.txt` lists `guides/veneer.md`, `package-lock.json`,
   `package.json`, `tests/conformance.test.ts`, `tests/setupConformance.test.ts`,
   `tests/setupConformance.ts`, `tests/fixtures/oracle/button.json`, and
   `tests/fixtures/oracle/inventory.json` and nothing else; `package.json`'s only change is the
   `@orkestrel/markdown` devDependency (`^0.0.15`); the inventory copy is unchanged from round 1.
8. **Gates (ruled by the Orchestrator from the retained verifier report).** format, lint, check,
   build; `test:conformance` 8 green on Chromium and on Edge; `test:setup` 96; `test:guides`,
   `test:policy`; the whole `npm test` chain; `test:distribution`; `scaffold audit` exit 0 with
   the `setup` question and the three advisory lines; status identical before and after.
