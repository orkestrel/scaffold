# U4b audit — numbered claims (both lanes and the checker)

Subject: the U4b working tree in `C:/Users/mikes/WebstormProjects/veneer` on `ef1a563` (brief
`.orkestrel/veneer/units/u4b-brief.md`, report `units/u4b-report.md`, instruments under
`units/u4b-instruments/`). Astra (`sol`) wrote the unit, so the lanes are swapped: the `reviewer`
on Opus holds the OBJECTIVE lane and the `analyst` on Astra the SUBJECTIVE lane and is told its
engine wrote the work. This file alone fixes the claim numbers. The Orchestrator rendered the
diff over `ef1a563` including the two untracked fixtures at `units/u4b-diff.patch.txt` (the
inventory copy makes it long; read the TypeScript and guide hunks first) and the status at
`tmp/audit/u4b-status.txt`. Rule on every claim with `CONFIRMED`, `REFUTED`, or `UNDECIDABLE` and
the deciding evidence (`file:line` or exact text); read the rendered diff and the live files,
never the report alone; execute a reading in memory where a claim names one. The user has ruled
that rounds focus on implementation: a wording or comment finding is a bound, never a
round-forcer. Law: scaffold's `AGENTS.md`, `.claude/rules/tests.md`, `architecture.md`,
`names.md`, `typescript.md`, `documentation.md`, `portability.md`, read from
`C:/Users/mikes/WebstormProjects/scaffold`.

1. **The contracts and readers.** `tests/setupConformance.ts` declares readonly interfaces
   `CompatibilityRow`, `OracleReading`, `OracleStep`, `OracleFixture`, `OracleVocabulary`, and
   `OracleInventory`, the constant `ORACLE_TIMEOUT = 10_100`, and exports `readCompatibility`
   (the guide's `## Compatibility` rows through `@orkestrel/guide`'s section, column, and cell
   helpers, refusing a missing column or a status outside the union with an `Error` naming the
   row), `readBuiltCascade`, `readOracleControl`, `readOracleInventory` (pinning `version` and the
   CSS and RTL digests), `scanOracleObligation`, and `recordButtonOracle`; every earlier export
   stays; `tests/setupConformance.test.ts` asserts the export set and cases each new export over
   a written document, a missing column, an invalid status, a built cascade, a missing artifact,
   a malformed inventory, a live control reading, and a contradicted and an absent proof step
   (88 setup tests green).
2. **The presence check.** In `tests/conformance.test.ts`, for every component key whose rows
   are all `shipped`, every selector in the inventory copy's `components.<key>.selectors[].selector`
   and every key of `components.<key>.properties` appears in the built `dist/src/styles/index.css`
   read through `readBuiltCascade`; the set of `shipped` keys equals the test's explicit list in
   both directions; today both sets are empty; `PLANT-ACCEPTED` (`alert` shipped) reds with
   `Shipped component alert is missing selector .alert` (`units/u4b-instruments/plant-accepted.log.txt`).
3. **The recorder.** `recordButtonOracle` launches Playwright `chromium` from the Node worker with
   the executable `configs/browsers.ts` resolves (headless), writes a page into a scratch
   directory from `createScratch` that loads copies of the official `bootstrap.css` and
   `bootstrap.bundle.js` through relative references, sets the Toggle, Pressed, and disabled
   anchor markup, and records per step the ordered event names, classes, attributes, mutation
   attribute names, click cancellation, the focused control's accessible name, the accessible
   snapshot, any refusal, and the public Bootstrap identity values; the steps are
   `button.initial`, `button.click.toggle`, `button.click.release`, `button.keyboard.space`,
   `button.keyboard.enter`, `button.hover`, `button.pointer.hold`, `button.pointer.release`,
   `button.pressed.initial`, `button.pressed.click`, `button.disabled.click`, each repeated
   under `button.reduced.` with reduced-motion emulation; the fixture
   `tests/fixtures/oracle/button.json` is written only under `ORACLE_REFRESH=1`; an ordinary run
   records live and compares, failing on a missing file (`Missing oracle fixture: …; record with
   ORACLE_REFRESH=1`) or naming the first differing step (`Oracle differs at step
   button.click.toggle`); consecutive runs match on managed Chromium and on Edge; `excluded` is
   empty; the recorder case passes `ORACLE_TIMEOUT` as `it`'s third argument, measured as twice
   the contended 2550 ms plus 5 s; Node reads the bundle's bytes and never imports or evaluates
   it, so official JavaScript executes nowhere outside the recorder's page.
4. **The cross-check.** For every `## Compatibility` row whose `Proof` names a step,
   `scanOracleObligation` checks the recording against the row (the toggle flips `active` and
   `aria-pressed`; the data-api click is prevented; the accessibility rows read the role and the
   pressed state); a contradicting row reds naming the row (`PLANT-ROW`: `Compatibility row btn
   | event | Dispatches invented.bs.button | button.click.toggle: recording contradicts
   obligation`), and a row whose step the recording lacks reds.
5. **The guide.** `guides/veneer.md` carries `## Compatibility` between `## Tokens` and
   `## Showcase` with the table `Component | Kind | Obligation | Proof | Status`, Button's rows
   from `research/obligations.md` § Button and the engine rows the ledger assigns to `U7 Button`,
   every `Status` `accepted`, every `Proof` a step the fixture carries or `—` (the jQuery
   interface, the plugin registration, and the shared engine obligations the recording cannot
   drive), the exclusions paragraph, and the sentence on the two statuses; `## Tests` links the
   conformance proof and the setup proof; `test:guides` green; `guides/README.md` unchanged
   because its rows are parity targets, not sections.
6. **Law, placement, and dependencies.** No `any`, non-null assertion, type assertion, `@ts-`
   directive, `eslint-disable`, default export, nested function, or class in a setup module;
   readonly shapes; helper names by the prefix table (`read*`, `scan*`, `record*`);
   `tests/fixtures/oracle/` holds data files only. **The dependency question, for the objective
   lane:** `tests/setupConformance.ts` line 16 imports `createMarkdown` from `@orkestrel/markdown`,
   which `package.json` does not declare (it is installed as `@orkestrel/guide`'s own
   dependency), because `@orkestrel/guide`'s section helpers take a `MarkdownDocument` and its
   `Guide` exposes projections without the document. Rule whether the installed `@orkestrel/guide`
   (core or server entry) exposes any way to obtain the parsed document or a section's tables
   without importing the parser directly; if it does, name it; if it does not, say so, because
   the Orchestrator then puts the declaration of `@orkestrel/markdown` as a devDependency to the
   user (a package is never added without the user's request) and the undeclared import is a
   defect either way.
7. **Scope honesty.** `tmp/audit/u4b-status.txt` lists exactly `guides/veneer.md`,
   `tests/conformance.test.ts`, `tests/setupConformance.test.ts`, `tests/setupConformance.ts`,
   `tests/fixtures/oracle/button.json`, and `tests/fixtures/oracle/inventory.json`; the report
   and instruments sit under the ignored `tmp/`; the inventory copy's parsed content equals
   `research/inventory.json` (the unit's `INVENTORY_CONTENT_EQUAL=true`).
8. **Gates (ruled by the Orchestrator from the retained verifier report).** format, lint, check,
   build; `test:conformance` 8 cases green on managed Chromium and on Edge; `test:setup` 88;
   `test:guides`, `test:policy`; the whole `npm test` chain; `test:distribution`; `scaffold audit`
   exits 0 with the `setup` question and the three advisory lines; an ordinary run writes no
   fixture (status equal before and after).
