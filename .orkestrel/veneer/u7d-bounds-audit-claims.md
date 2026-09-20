# u7d-bounds audit claims

Subject: unit u7d-bounds in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`),
written by `opus` on Opus 5 under `units/u7d-bounds-brief.md` (retained as
`.orkestrel/veneer/units/u7d-bounds-brief.md`; report `units/u7d-bounds-report.md`). Evidence
rendered by the Orchestrator: `units/u7d-bounds-diff.patch.txt` (`git diff 7da6bb1 -- .
':(exclude)tmp'`) and `tmp/audit/u7d-bounds-status.txt` (`git status --porcelain`). Rule on the
diff and the live files, never on the report's word alone. A test is named for what it proves,
never for a control that specified it. Claims marked `[mechanical]` are the checker's; every
other lane rules on every claim.

Every lane rules with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (file:line or
exact text). A wording finding is a bound (the user's ruling: rounds focus on implementation),
recorded after the claims and numbered from 12, with its site; a finding that forces a fix round
says so and names the claim it breaks.

1. Every sentence of the `readPaintedColor` and `matchesPaintedColor` doc blocks in
   `tests/setupBrowser.ts` is true of the installed `@orkestrel/test` 0.0.18 Test-paint build
   (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts`): no sentence claims a modern
   colour function comes back unread; the reading the wrapper adds is named (the engine's own
   rasterization, one byte per channel) with the measured agreement and its date; the `var()`
   caveat and the placement remark stay; no body changed.
2. The two cases that asserted the reader's old limits are rewritten as agreement: the mix case
   asserts `matchesPaintedColor` and the installed `matchesColor` both `true`; the channels case
   keeps its painted-channel assertions and asserts the reader's channels match the painted ones;
   a third case proves the out-of-gamut colour `oklch(0.6 0.3 150)` paints on the sRGB edge with
   integer channels the reader's clipped channels match. The titles name what each proves.
3. The unknown was run before editing and both readings are reported verbatim: the canvas and
   the reader agree on every measured colour (`[255,0,0,1]` for `oklch(0.7 0.4 30)` on both
   sides; `[99,99,99,1]` against `[99.086…,…]` for `oklab(0.5 0 0)`), so the brief's second
   branch governs and the wrappers stay for their styles-proof consumers.
4. `collectShippedComponents` returns a component only when, for each of `selector` and
   `variable`, it carries at least one row of that category and every such row is `shipped`; the
   doc block states the rule; the split-category case (`withholds a component carrying an
   accepted row beside a shipped one in the same category`) ran red on the `some` form and green
   on the `every` form.
5. The chdir case asserts the SHA-256 of `readBootstrapCascade()` against `BOOTSTRAP_CSS_DIGEST`
   instead of re-deriving the implementation's path, carries a comment naming the
   working-directory mutation and the `setup` project's `forks` pool, and reddens against a
   different real artifact (the unit's digest discrimination control swapped in
   `BOOTSTRAP_RTL_CSS_DIGEST` and read the failure).
6. The pinned-release case in `tests/setupStyles.test.ts` reads the manifest through
   `readManifestMember(BOOTSTRAP_MANIFEST_PATH, 'version')` and the cascade through
   `readBootstrapCascade()`, asserts `computeArtifactDigest(resolve(WORKSPACE_ROOT,
   BOOTSTRAP_CASCADE_PATH))` equals the same digest, pulls no browser module into the Node
   `setup` project, and ran red under a `process.chdir('..')` plant (`ENOENT` on the
   working-directory-relative manifest) and green with the plant after the change.
7. `readDeferrals` labels an incomplete row by its one-based position and its first non-empty
   cell (`Deferral row 2 (Passive): missing required cell`; `Deferral row 1: missing required
   cell` when every cell is empty), and the deferral case covers a missing name, a named cell, and
   an all-empty row; red then green.
8. The binding-table case asserts every `ORACLE_BINDINGS` entry with a defined `obligation`
   matches a `readCompatibility()` row by component, category, and obligation text; the
   `Dispatches click` entry no ledger row reached is deleted rather than kept as a second
   undefined-obligation fallback (which the `?? bindings.find(undefined)` selection could never
   reach behind the existing `events: []` entry); the two cases that consumed it are rewritten so
   each proves something the table carries (the exact refusal strings for an unbound event
   obligation and for an accessibility obligation with no predicate; `matchesOracleEvents` reads
   the binding's `events`, refuses an absent event and an empty requirement).
9. `[mechanical]` Scope: `git status --porcelain` shows exactly `tests/setupBrowser.test.ts`,
   `tests/setupBrowser.ts`, `tests/setupConformance.test.ts`, `tests/setupConformance.ts`, and
   `tests/setupStyles.test.ts`; `tests/setupStyles.ts` is unchanged; `src/**`, `app/**`,
   `guides/**`, `package.json`, `vite.config.ts`, `configs/**`, `tests/src/**`, `tests/app/**`,
   `tests/conformance.test.ts`, and `tests/fixtures/**` are absent from the diff; the diff adds
   no `any`, no assertion outside `as const`, no non-null assertion, no suppression comment, no
   skip or expected-failure declaration; every module-scope function it adds is exported and
   cased; no nested function declaration outside the permitted callback forms; no case title
   names a control.
10. `[mechanical]` No `it(` present at `7da6bb1` in the three test files is dropped without a
    successor: each removed title in the diff has a rewritten case beside it that keeps the
    assertions the report lists, and the added titles are the split-category, out-of-gamut, and
    rewritten cases only.
11. The gates the report records exit 0 (`format:check`, `lint:check`, `check`, `test:setup`
    104 passed, `test:setup:browser` 20 passed on Chromium and Edge, `test:src:styles` 40
    passed, `test:conformance` 8 passed); the verifier lane re-runs the chain on the host,
    including `npm test`, and its reading rules this claim.
