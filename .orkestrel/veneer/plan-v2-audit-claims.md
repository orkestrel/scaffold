# Claims — plan-v2 (the refined Veneer execution plan)

Both lanes attack this one file. Attempt refutation of every claim. `CONFIRMED` requires naming the
attack you tried that failed. A claim you cannot decide is `UNRESOLVED`, not `CONFIRMED` — say what
would settle it. Do not hedge toward an imagined consensus. Assume the plan carries at least one
ruling that a defect will surface through in the first unit.

Paths: read the subject and its evidence through the path table in the brief. `plan` below means
`scaffold/.orkestrel/veneer/plan.md`; `tenets` means `scaffold/tenets.txt`; `old plan` means
`scaffold/.orkestrel/veneer/superseded/plan-2026-09-19.md`.

1. **Every tenet has a carrier and every unit has a tenet.** Each product tenet and execution
   constraint in `tenets` maps to at least one decision row or unit line in `plan`, and every unit
   in `plan` (U1 through U7, the Tailwind unit, the component queue) serves at least one named
   tenet. Break it by naming a tenet with no carrier or a unit with no tenet.
2. **Dissolving the old "Journey pilot" loses nothing the tenets require before Button.** Every
   proof the old plan's Journey pilot listed — valid customization, invalid or cyclic consumer
   behavior, nested-theme isolation, focus, covered-action refusal, restored activation, portfolio
   membership with capture disabled, preserved failure diagnostics, separate Chrome and Edge
   receipts, recorded token and theme syntax capabilities — is owned by a named line of U3, U5,
   or U7 in `plan`, and no tenet requires it earlier. Break it by naming an orphaned proof.
3. **Live CSSOM parity replaces the generated inspection data without losing a drift class.** The
   U3 `tokens.test.ts` design — read the `:root` custom-property names from `document.styleSheets`
   in the browser and compare bidirectionally with the frozen name map — catches every drift the
   old plan's PostCSS-derived, explicitly refreshed inspection data would have caught (a name added
   in SCSS and missing from the map, a name in the map and missing from SCSS, a name moved out of
   `:root` into a scoped rule), and Chromium's `CSSStyleDeclaration` enumerates custom properties
   declared in a `:root` rule. Break it by naming a drift class the live test cannot see, or by
   evidence that the enumeration is unreliable.
4. **The styles wrapper is repair-safe.** `configs/src/vite.styles.config.ts`,
   `configs/src/tsconfig.styles.json`, `src/styles/**`, `tests/setupStyles.ts`, and author-written
   `build:src:styles`, `check:src:styles`, and `test:src:styles` scripts invoking the wrapper through
   `--config` alone survive `scaffold repair` unchanged and cause `scaffold audit` to report no
   drift, no `foreign` finding, no `projects` question, no `scripts` question, and no `dependencies`
   question. Read `scaffold/src/core/compilers.ts`, `scaffold/src/core/constants.ts` (`CANON_PATHS`,
   `HOST_PATHS`), `scaffold/guides/scaffold.md` § Ownership and drift and § Reading a target, and
   `scaffold/src/server/*.ts` for the audit questions. Break it by naming the verb, the path, and the
   line that reverts or reports one of them.
5. **Deleting the legacy tree at U1 loses no evidence the campaign needs.** Every fact the campaign
   needs from Veneer's tree at `fc36cec` — the itemized Bootstrap CSS, the `--bs-*` to `--vn-*`
   binding table in `base/_variables.css`, the regularization decisions in `guides/tokens.md`, the
   derived shade and table-accent formulas in `src/styles/helpers.ts`, the statechart suites — is
   either reproducible from the official `bootstrap@5.3.8` package, recorded under
   `scaffold/.orkestrel/veneer/research/`, or reachable at `fc36cec` without a plan step that
   depends on it being in the working tree. Break it by naming a plan step that needs a deleted
   file in the working tree.
6. **The U1 runtime-boundary controls bind against every listed vector.** The manifest-section
   check, the `src/**` import sweep (foreign specifier and escaping relative import), the
   externalize-every-bare-specifier build with the `dist/src/**/*.js` and rolled-up `*.d.ts`
   specifier sweep, and the isolated installed-consumer stage together fail on each of: a `vue`
   peer dependency, a runtime `import 'vue'`, a `Ref` type leaked into the rolled-up declarations,
   a bundled copy of `@vue/reactivity`, and a test or source that resolves a sibling checkout by
   relative path. Break it by naming a vector one of them passes.
7. **The oracle design is independent, isolated, and placeable.** A separate browser project whose
   setup loads only official Bootstrap CSS and `bootstrap.bundle.js`, drives official markup
   through the published journey verbs, writes `tests/oracle/__fixtures__/<component>.json` only
   under `ORACLE_REFRESH=1`, and otherwise compares and fails on a missing file, gives expected
   outcomes derived independently of Veneer, runs official JavaScript nowhere else, and sits at a
   location `.claude/rules/tests.md` and `.claude/rules/workspace.md` admit. Break it by naming the
   rule its placement or mechanism violates, or an outcome class it cannot record.
8. **The routing ledger is consistent with orchestration and the user's 2026-09-20 instruction.**
   Every unit's role and engine in `plan` follows `.agents/orchestration.md` (reading to Grok,
   objective implementation and audit to the Codex bench, subjective design and review to native
   Opus, fully specified instruments to `builder`, gates to `verifier`), the Codex bench runs
   `gpt-6-astra` only, Cursor carries Grok only, and every network or `scaffold`-verb step is
   Orchestrator-owned. Break it by naming a misrouted line.
9. **Button's scope is complete and does not block on U6.** U7 closes every row the official
   `bootstrap.css` `.btn` family and `js/src/button.js` impose plus Veneer's additions, with nothing
   deferred; and where U5 answers negatively for hover, active, pseudo-elements, or media emulation,
   `plan` leaves the affected rows open on the record rather than passing them or blocking Button.
   Break it by naming an official Button obligation `plan` omits, or a row that would pass without
   its instrument.
10. **Parallel units do not collide, and U3 cannot start early.** U2 runs beside U1 and U4 beside
    U3 with no shared file, no shared checkout writer, and no shared `node_modules` mutation; and
    U3 has a stated dependency on `research/calibration.md` that stops it from starting before U2
    closes. Break it by naming the collision or the missing dependency.
11. **The name-map placement satisfies the rules and the fleet name check.** A frozen grouped
    name map as `TOKENS` in `src/core/constants.ts` with its type in `src/core/types.ts` satisfies
    `.claude/rules/architecture.md` § Kind purity and `.claude/rules/names.md`, and the bare names
    `TOKENS` and the type name the plan implies collide with no `## Surface` claim in
    `scaffold/dist/host/guides/*.md`. Break it by naming the rule or the colliding guide.
12. **The plan is coherent as a whole.** An executor holding only `plan`, `tenets`, `research/`,
    and the repositories can begin U1 without a question `plan` should have answered, and the
    plan carries no instruction that contradicts `AGENTS.md`, a rule file, or `orchestration.md`.
    Break it by naming the question or the contradiction.
