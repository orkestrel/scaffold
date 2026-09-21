# U7c audit round 2 claims (the fix round)

Subject: the fix round of unit U7c in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`),
written by `opus` on native Opus 5 under `units/u7c-brief-2.md` (retained under
`.orkestrel/veneer/units/`; carrying brief 1 and its dispatch message), report
`units/u7c-report-2.md` with `units/u7c-report.md`, over the U7b landing `0cbb563`. Evidence
rendered by the Orchestrator: `units/u7c-diff-2.patch.txt` (`git diff 0cbb563` plus `--no-index`
renderings of the untracked files) beside round 1's `units/u7c-diff.patch.txt` over the same
base, and `tmp/audit/u7c-status-2.txt`. Rule on the diff and the live files, never on the
reports' word alone. Scope: implementation only, by the user's ruling. Opus wrote the unit and
the fix, so the Astra analyst holds the objective lane and the Opus reviewer the subjective lane.
Claims marked `[mechanical]` are the checker's; every other lane rules on every claim. An extra
finding is an implementation defect the fix round introduced or left open, with a site and a
one-line failure scenario, numbered from 8.

1. Finding 1 closed (`tests/app/browser/sections/ButtonSection.test.ts`): the ownership partition
   is asserted while the section is live over populations derived from `BUTTON_SPECIMENS` and
   `BUTTON_SELECTOR`, never a hand list; every plain host refuses a second `Button` with
   `BUTTON_HOST_OWNED` and every delegated host accepts one whose probe engine is destroyed in a
   `finally`; the rendered partition equals the rows declaring `data-bs-toggle`; the release
   proof after destruction covers every plain host; and the deleted reclaim-after-destruction
   shape passes over a section that owns nothing while the replacement reddens (report 2 § 1).
2. Findings 2 and 3 closed (`tests/app/browser/integration.test.ts`): the self-comparison is
   gone; each oracle case opens with `expect(ORACLE_EXCLUDED).toStrictEqual([])` and closes with
   `comparison.compared` equal to the driven action names, so a recording that gains an
   exclusion reddens; the dark focus-ring sweep mirrors the light one over `collectPainted`
   with `traversed` equal to the painted population, every specimen ringed, and the dark value
   pinned once.
3. Finding 4 closed: no module-scope function and no case matrix remains in
   `tests/app/browser/integration.test.ts` (what remains at module scope is the project's
   injections, values derived from them, per-run accumulators, and run-bound instruments);
   `BUTTON_STATES`, `PORTFOLIO_STATES`, `CONTRAST_BAR`, `DISABLED_OPACITY`, and `UNDER_BAR` are
   exported from the host-independent `tests/setup.ts` and proven in `tests/setup.test.ts`;
   `ORACLE_ACTIONS`, `ORACLE_EXCLUDED`, `driveOracle(root, prefix)`, `buildOracleComparison`
   with its `OracleComparison` interface, `collectPainted`, `BUTTON_CLASS`, and `resolveButton`
   are exported from `tests/setupBrowser.ts` and proven in `tests/setupBrowser.test.ts`; no
   `setup*.ts` carries an `expect` call; the export-set assertions in both setup proofs name
   the new exports; and deviation D1 is a true reading of the tree — the `src:browser` projects
   load `tests/setupBrowser.ts` under `environmentBoundary('src/browser')`, which refuses a
   static `@app/browser` import, so a `PAINTED` table cannot live there and `collectPainted(root)`
   over the rendered surface is the sound placement.
4. Finding 5 closed: the journey's `afterEach` teardown runs each release whatever the step
   before it did, always removes the theme attribute, and raises the collected refusals together
   as an `AggregateError`, so a rejected pointer or media release leaves nothing mounted or
   staged for the next case.
5. Findings 6, 7, and 8 closed: `app/browser/sections/` holds `ButtonSection.ts` alone and
   `app/browser/index.ts` exports `./sections/ButtonSection.js`, the app barrel's export set
   unchanged; `resolveButton(root, name)` reads the exported `BUTTON_CLASS`, every call site and
   every remaining `'.btn'` literal in the owned test files reads the constant, and the setup
   proof pins that the search is bounded by the class (the reachable mode control refused, a
   `BUTTON_CLASS` host returned); `readBundleSubject`, its `subject` field, and `isStringList`
   in `tests/distribution.test.ts` name what they carry, the export case still passes the
   `exports` drive's reading into `checkSurface` as `published`, and both cases through the
   renamed reader ran green from the packed archive.
6. `[mechanical]` Scope and law: `units/u7c-diff-2.patch.txt` differs from
   `units/u7c-diff.patch.txt` only in files the brief owns; `app/browser/sections/index.ts` is
   absent from the tree; the status shows the owned set alone; in the diff no `any`, no
   assertion outside `as const`, no non-null assertion, no suppression comment, no
   `public`/`private`/`protected`, no parameter property, no skipped case other than
   `it.runIf`, no case named for a control, and no probe residue (`OwnershipProbe.test.ts`,
   `tmp/probe/`, `test:probe`) in the tracked tree or `package.json`; `package.json`, `src/**`,
   `guides/**`, `configs/**`, the vendored files, and the off-limits setup files untouched; the
   round-1 confirmations on the section, the table, the projection, and the consumer case are
   not disturbed.
7. The gates report 2 records exit 0 on managed Chromium and Edge (`format:check`,
   `lint:check`, `check`, `build`, `test:setup`, `test:setup:browser`, `test:app:browser`,
   `test:journey`, `CAPTURE=1 test:journey`, `test:distribution`, `test:guides`, `npm test`,
   the three Edge runs); the verifier lane re-runs the chain on the host and its reading rules
   this claim.
