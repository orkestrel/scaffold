# F8c-A READERS round 3 — audit claims

Subject: the fix round `opus` wrote in `/home/user/veneer-f8b` from
`/home/user/veneer-f8b/tmp/units/f8c-a-brief-3.md` over the round-1 verdicts
(`tmp/units/f8c-a-audit-analyst-verdict.md`, `FAIL 1, 3, 4, 5, 7, 10`;
`tmp/units/f8c-a-audit-reviewer-verdict.md`, `FAIL 2, 3, 4, 9, 10; outside the claims: F1 to F4`,
referrals R1 to R7) under D23 (the brief's § D23). Evidence:
`/home/user/scaffold/tmp/audit/f8c-a-fix-3.diff` (the whole diff against the checkpoint `5099318`,
which holds F8c-A as returned plus the regenerated root configuration), `f8c-a-fix-3-status.txt`,
and the report `/home/user/scaffold/tmp/audit/f8c-a-report-3.md`; the mutation instrument and its
log sit at `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/f8c3/`. Rule
each claim CONFIRMED, BROKEN, or UNRESOLVED with `file:line`; rule a claim about a proof on the
mutation named and whether the assertions distinguish it from the passing case.

1. **The reader walks declarations in source order** (round-1 analyst 1, R4). `SheetReader`'s
   `#collect` walks with `walkDecls`; each declaration takes its selector from the nearest
   style-rule ancestor and its layer from the nearest layer block; a declaration no style rule
   encloses (an `@font-face` descriptor) is left out; `declarations` and `layers` both read through
   `#collect`; `#framed` matches `/^(?:-[a-z]+-)?keyframes$/u`. Cases: a declaration a conditional
   block wraps inside a rule reads under that rule's selector with its layer and importance; a
   `@-webkit-keyframes` step is excluded from `selectors`; a `@keyframes` block sits in the
   declarations, layers, and `collectImportantNames` cases; `.panel { @media … { color: red
   !important } }` reaches `collectImportantNames`. Mutations: the pre-fix direct-children walk
   (`2 failed | 7 passed (9)`: the conditional case and the `collectImportantNames` case); the
   prefixed exclusion dropped (`1 failed | 8 passed`: the selectors case); the `#framed` guard
   removed from `declarations` (`2 failed`: declarations and layers, which share `#collect`) and
   from `layers` (`1 failed`).
2. **The markup case derives its tags independently** (round-1 analyst 5). `renders each tag the
   preflight pairing reaches once, inside a parent its content model mandates` derives the
   required tags from the installed `tailwindcss/preflight.css` (`SheetReader.selectors` through
   `collectTypeSelectors`) and from `ELEMENT_TAGS`, requires the markup's tag set to equal that set
   when sorted, and checks that every tag `MANDATED_TAG_PAIRS` names a parent for sits inside one;
   `MANDATED_TAG_PAIRS` gains `datalist`/`option`, `menu`/`li`, `select`/`optgroup`, `table`/`tr`,
   `tbody`/`tr`, `tfoot`/`tr`, `thead`/`tr`; the `optgroup` row of `ELEMENT_TAGS` gains `select` and
   the `tr` row gains `table` with the distinct tag set unchanged. Mutations: `hr` removed from
   `NEUTRAL_MARKUP` and `optgroup` unwrapped from `select` each redden the case alone.
3. **The fixture is exported** (round-1 analyst 7). `PASSING_READINESS` is exported frozen from
   `tests/setupService.ts` with TSDoc, inventoried, its frozen state asserted; no local copy remains
   in `tests/setupService.test.ts`.
4. **D23's names.** `StageManager.expand(css)` and `SheetReader.variables` replace the former
   members in code, TSDoc, cases, titles, and inventories; `StageRule.properties` and the
   `read(selector, properties?)` parameter keep their names; no consumer of `.properties(` on the
   stage or `.properties` on a reader remains in `tests/`.
5. **The proof structure** (round-1 reviewer F2). `describe('StageManager') › describe('an open
   stage')` owns one instance opened in `beforeAll` (with `STAGE_TIMEOUT`), cleared in
   `afterEach`, destroyed in `afterAll`, with one case per behaviour (a loaded sheet, the default
   snapshot without custom properties, `expand`, `clear`, the second-open refusal); the failed-open
   and never-opened cases use their own instances; `scanReadiness` is a pass case and an order
   case; the floor case sits under `describe('CANDIDATE_FLOOR')`. Mutation: `expand` no longer
   descending into grouping rules reddens the `expand` case alone (`1 failed | 22 passed (23)`).
6. **The prose** (round-1 reviewer F3). The module header names the gate conditions without a
   count; the `scanReadiness` remarks state that the leaf fixes the refusal order; the floor
   refusal names its cause and no command; no temporal `once`, no possessive code token, no
   `should`, `currently`, `simply` in the owned files' comments and TSDoc; the `stage` TSDoc reads
   as a convention; the `collectFencedBlocks` TSDoc line in `tests/setupStyles.ts` is within the
   width. Rule against `/home/user/scaffold/.claude/rules/writing.md`.
7. **One home for the cascade path** (round-1 reviewer F4). `CASCADE_PATH` is declared in
   `tests/setupServer.ts`; `readBuiltCascade` defaults to `resolve(WORKSPACE_ROOT, CASCADE_PATH)`;
   `tests/setupService.ts` and its proof import it; the inventory row moved to the server
   inventory; the built-cascade case asserts the default equals the explicit path.
8. **The browser gate passes what the stage launches** (round-1 reviewer R1).
   `resolveBrowserTarget(options, pinned)` returns the channel, the `wsEndpoint`, or an executable
   path that passes `isBrowserExecutable` (the pinned revision for empty options), and `undefined`
   when the path has no executable, which produces the refusal naming
   `npx playwright install chromium`; each branch has a case with literal provider options; the
   mutation "the channel branch refusing" reddens the channel case. Observation to rule: under
   `PLAYWRIGHT_WS_ENDPOINT` readiness passes (ruling 2: resolve, never launch) while
   `StageManager.open` and `recordButtonOracle` refuse a remote connection; rule whether that gap
   is acceptable under ruling 2 or a defect this round had to close.
9. **The compiler loads inside the gate** (round-1 reviewer R2). The module-scope static import is
   gone; `importCompiler()` is one exported leaf doing a literal `await import('@tailwindcss/postcss')`
   shared by `compileProfile` and the gate; `verifyReadiness(options: ReadinessOptions = {})`
   takes `root` and `compiler` (default `importCompiler`); the gather catches the loader or
   compile error and throws the refusal naming `npm ci` with that error as `cause`; cases:
   `importCompiler › resolves the installed plugin, which compiles the readiness input` and
   `verifyReadiness › refuses a compiler that does not load, naming the restoring command and
   keeping the load error as its cause` (driven by a rejecting loader through the seam); the
   mutation "the gather swallowing the loader error" reddens the cause case. Rule whether the
   rejecting loader is an inert boundary stub of the module loader (permitted) or a behavioral fake
   of project-owned behaviour (`AGENTS.md` non-negotiables); the loader is an external boundary and
   nothing project-owned runs inside it.
10. **Nested layers read by their written name** (round-1 reviewer R3): the class TSDoc, the
    `order` TSDoc, `SheetDeclaration.layer`, and the case comment state it; no code change.
11. **The stage composes `createTeardown`** (D23, round-1 R6). `open` refuses while the list holds
    anything, registers the scratch removal, launches the browser, registers `browser.close()`;
    `destroy` drops the page and the sheets, then runs the list; `connected` stays derived from the
    browser; the failed-open case proves `connected` true and a second `open` refused after a failed
    open, `connected` false after `destroy`, a second `destroy` a no-op, and the same instance
    opening again after its root gains a cascade; the never-opened case proves `destroy`, `clear`,
    and the `read` refusal; the mutation "`destroy` skipping the teardown list" reddens the
    failed-open case.
12. **Timing** (R7, observation). `test:setup` reads `200 passed` in 12.0 s at load 4.2 after the
    restructure, against `1 failed | 188 passed` in 23.6 s at load 5.3 at the checkpoint (the oracle
    case at its budget); the Orchestrator's deciding re-run settles it.
13. **The conformance scan is the one standing red, and nothing is hidden from it** (D24). The
    conformance case `runtime boundaries › imports no forbidden runtime package from source,
    application, or tests` reports `@tailwindcss/postcss` at `tests/setupService.ts`; it was red at
    `5099318` (the checkpoint's static import) and the literal dynamic import keeps it exactly as
    red; lint's `import/no-dynamic-require` refuses a variable specifier. D24: the scan's population
    excludes the service setup module, its proof, and `tests/service/**`, because they drive the
    installed compiler as their subject under D19, while the bundle and manifest cases keep proving
    that the published entries and the manifest carry no Tailwind requirement; F8c-B carries the
    exemption (it owns `tests/conformance.test.ts` for that). Rule that no other file under `src/`,
    `app/`, or `tests/` imports a forbidden runtime and that the unit obscured nothing.
14. **Scope is honest.** The status lists `tests/setupServer.test.ts`, `tests/setupServer.ts`,
    `tests/setupService.test.ts`, `tests/setupService.ts`, `tests/setupStyles.test.ts`,
    `tests/setupStyles.ts` and nothing else; `tmp/probe/` is removed; the six SHA-256 readings in
    the report match the tree.
15. **Gates.** `format:check`, `lint:check`, `check` exit 0; `test:policy` `109 passed | 1
    skipped`; `test:config` `173 passed | 1 skipped`; `test:setup` `200 passed`;
    `test:src:tailwind` `17 passed`; observations `test:setup:browser` `68 passed`,
    `test:src:styles` `417 passed`, conformance `1 failed | 16 passed` (claim 13). UNRESOLVED
    until the Orchestrator's independent chain; rule `npm run check` yourself where the sandbox
    allows it.
