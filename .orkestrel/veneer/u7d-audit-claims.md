# U7d audit claims

Subject: unit U7d in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`), written by
`sol` on Astra under `units/u7d-brief.md` (retained as
`.orkestrel/veneer/units/u7d-brief.md`; report `units/u7d-report.md`). Evidence rendered by the
Orchestrator: `units/u7d-diff.patch.txt` (`git diff 1b80ccb -- . ':(exclude)tmp'`) and
`tmp/audit/u7d-status.txt` (`git status --porcelain`). Rule on the diff and the live files, never
on the report's word alone. A test is named for what it proves, never for a control that
specified it. Claims marked `[mechanical]` are the checker's; every lane rules on every claim.

Every lane rules with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (file:line or
exact text). A wording finding is a bound (the user's ruling: rounds focus on implementation),
recorded after the claims and numbered from 15, with its site; a finding that forces a fix round
says so and names the claim it breaks.

1. `readDeferrals` in `tests/setupConformance.ts` reads the `### Deferred selectors` table under
   `## Styles` (`Name | Owner | Reason`) through the same `@orkestrel/markdown` parser and
   `@orkestrel/guide` section and column helpers the compatibility reader uses, returns readonly
   `DeferralRow` rows with a code-span name flattened to its text, and refuses by name a missing
   subsection, a missing table, a missing column, and an empty cell; proven in
   `tests/setupConformance.test.ts` over a written document with rows and over the empty
   subsection.
2. `collectShippedComponents` returns exactly the component keys whose `selector` row and
   `variable` row both carry `shipped`, and `tests/conformance.test.ts` compares its sorted
   result with the explicit `listed` array in both directions so a missing key and an extra key
   each fail with a named message; proven.
3. `scanCompatibilityPresence` requires, for each shipped `selector` row, every official selector
   of that component not named in the deferral table to be present in the built cascade (compared
   through `normalizeComplexSelector`), and for each shipped `variable` row every official custom
   property not deferred to be declared (a declaration, never a `var()` reference); refuses by
   name a deferred name outside the official inventory of a component with a CSS row; refuses by
   name a deferred name present in the cascade even while the rows are `accepted`; proven over a
   written cascade fixture with a shipped key, a missing selector, a deferred-and-present name,
   and an unknown deferred name.
4. `[mechanical]` `guides/veneer.md` § Compatibility carries Button's `selector` row ("Every
   official `.btn` selector the ledger assigns to Button is present in the built cascade; the
   deferred selectors are listed under § Styles") and `variable` row ("Every official `--bs-btn-*`
   custom property less the deferred ones is declared"), each with Proof `—` and Status
   `accepted`; every cross-cutting engine row's `Component` cell reads `engine`; the section's
   prose states that `engine` names the shared official engine and is never shipped as CSS;
   § Styles gains `### Deferred selectors` with one sentence stating what a row means and which
   unit deletes it and an empty `Name | Owner | Reason` table; `readCompatibility`'s shape and
   `CompatibilityRow.category` (a `string`) are unchanged.
5. The obligation scan skips every `engine` row and every row whose Proof is `—`, and the
   ordinary conformance run passes every remaining row (the report's `test:conformance`
   `8 passed (8)`); the skipping is proven in `tests/setupConformance.test.ts`.
6. Binding selection in `tests/setupConformance.ts` reads an exact-obligation entry before an
   entry whose `obligation` is `undefined`, the `ORACLE_BINDINGS` doc block states that order,
   and a case proves it (the report's `selects an exact event obligation`, red then green).
7. `OracleBinding` carries an explicit `events` member naming the events an `event` row requires;
   `matchesOracleEvents` reads that member and never the obligation sentence; an empty requirement
   proves no event claim; each proven.
8. `scanOracleFixture` returns its documented `Invalid Button oracle fixture` finding for a
   fixture `JSON.stringify` cannot serialize (a cyclic value) instead of throwing; proven red then
   green.
9. The Node cascade reader (`readBootstrapCascade`, whose live home is `tests/setupConformance.ts`,
   not `tests/setupStyles.ts` as the brief's item 7 stated) resolves the installed stylesheet
   from the manifest-rooted path the recorder and the digest proof use, so a hoisted install
   cannot split the readings; a changed-working-directory case proves it red then green;
   `BOOTSTRAP_CASCADE_PATH` in `tests/setupStyles.ts` is untouched (the file is absent from the
   diff).
10. `[mechanical]` The four controls reddened with the messages the report records
    (`Shipped component btn is missing selector .btn-check`; `Deferred name .u7d-unknown is
    outside the official inventory for btn`; `Deferred name .btn is present in the built
    cascade`; the shipped-list mismatch) and were restored byte-for-byte; no test in the diff is
    named for a control.
11. `[mechanical]` Scope and letter of the law: `git status --porcelain` shows exactly
    `guides/veneer.md`, `tests/conformance.test.ts`, `tests/setupConformance.test.ts`, and
    `tests/setupConformance.ts` as tracked changes; `src/**`, `tests/fixtures/oracle/**`,
    `package.json`, and `tests/setupStyles.ts` are absent from the diff; the diff adds no `any`,
    no assertion, no non-null assertion, no suppression comment, no skip or expected-failure
    declaration; every module-scope function it adds is exported and cased; helper names take the
    `{verb}{Noun}` form with the prefix meanings `.claude/rules/names.md` fixes (`read*` obtains
    from a live object and throws, `collect*` gathers members, `scan*` walks and returns findings,
    `matches*` is a predicate); returns are readonly; no sentinel stands in for `undefined`.
12. `[mechanical]` Every case present at `1b80ccb` in `tests/setupConformance.test.ts` and
    `tests/conformance.test.ts` is kept or transformed with its assertion intact: the diff removes
    no `it(` line except one the brief's item 2 rewrites (the presence check keyed off the two
    rows), and the removed line's assertion survives in the rewritten case.
13. The gates the report records exit 0 (`format:check`, `lint:check`, `check`, `test:setup`,
    `test:conformance`, `test:guides`, and `test:conformance` on Edge); the verifier lane re-runs
    the chain on the host with the Test-paint tarball vendored into `node_modules`, and its
    reading rules this claim.
14. `[mechanical]` Placement: the readers and `DeferralRow` live in `tests/setupConformance.ts`
    (shared test infrastructure per `.claude/rules/tests.md` § Shared test infrastructure), the
    tests-only type is declared there rather than in a `types.ts`, no class is added, and no file
    is created.
