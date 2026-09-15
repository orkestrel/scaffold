# Unit U5d — the composition receipts' door, metadata, prose, and fixture shape (`@orkestrel/mcp`)

Successor of `U5c-mcp-distribution-brief.md` (which amended `U5-mcp-distribution-brief.md` and
`U5b-mcp-distribution-brief.md`). U5c landed on the tree uncommitted; this unit carries the A5
findings the Orchestrator adopted (`A5-audit-verdict.md`: the analyst's 6, 7, 9; the reviewer's
F1, F2, F4–F8, F10, F11). Amended before launch with the reviewer's findings. Everything in U5 not
restated here is unchanged: the receipts X5–X8, the recorders, the positive control, the closure
receipt, the consumer's install list (registry agent 0.0.23, tool 0.0.15, `@orkestrel/ndjson`
0.0.10, the packed workspace — the Orchestrator ruled the parser install stays), the guide's
`## Tests`.

## Role and engine

`implementer` on Claude Opus 5 (native; Read, Grep, Glob, Edit, Write, Bash). Perform the
assignment directly and spawn nothing. You are the only writer in this checkout.

## Objective

Make the composition receipts load the page through an import map over the installed built
entries (no bundler), assert the tool metadata projection through the installed pair and the
agent's registry, make the file's prose and names say what the instruments read, and remove every
nested function from the fixtures — with the receipts still green in release mode.

## Context

- Read first: `AGENTS.md`, `.claude/rules/tests.md`, `.claude/rules/architecture.md` § Functions and
  orchestration (the nested-function rule and its two exceptions), `.claude/rules/typescript.md`,
  `.claude/rules/writing.md`, `guides/mcp.md` §§ on `createPageServer`, the client `tools()`
  listing, and the agent wrapper (R11: the wrapped tool carries `title` and `annotations`), and
  the installed `node_modules/@orkestrel/tool/dist/src/core/index.d.ts` (`ToolAnnotations { pure?,
  untrusted?, consequential? }`, `ToolOptions.title`). Skill: none.
- Checkout: `C:/Users/mikes/WebstormProjects/mcp`, `main`, HEAD `8d97dd0`. The working tree carries
  U5c uncommitted: `tests/distribution.test.ts` (M), `guides/mcp.md` (M), `tests/fixtures/distributionPage.mjs`
  and `tests/fixtures/distributionServer.mjs` (untracked). `tmp/` holds the unit logs and bench
  journals; leave it. `git status` names nothing else.
- The composition today: `startReceipts` (`tests/distribution.test.ts:1175`) runs a Vite `build`
  of the page into `bundle/` (duplicating `bundleEntry`'s options at `:676-682`), copies
  `distributionServer.mjs` into the consumer, and starts it as a child (`createProcess` from
  `@orkestrel/process/server`) with the bundle directory and the relay credential as arguments;
  the server answers files under the bundle directory, `/control`, `POST /relay`, `/receipts`
  (cumulative for the process lifetime). The consumer tree is `mkdtempSync(join(tmpdir(),
  'distribution-'))` plus its own `node_modules` after one `npm install --ignore-scripts
  --no-audit --no-fund` of the listed artifacts (`tests/distribution.test.ts:80-82`, `:740`,
  `:1184`). The stage's teardown at `:1239-1244` and the scratch removal at `:805-807` rely on
  Vitest's default hook order, which `vite.config.ts` does not set.
- The U5 Unknown (`U5-mcp-distribution-brief.md:72-75`) asks whether the isolated consumer can
  import the agent's full runtime closure in a page THROUGH AN IMPORT MAP over its `node_modules`;
  a Vite bundle proves the bundler, not the published closure (the ollama page proof's ruling,
  `plan.md` § D1b Placement rows: "Not a Vite bundle: the claim is about the published closure").
- The closure instrument (`readClosure`, `:1120-1135`) reads the installed agent's own built module
  for its top-level specifiers; the words at `:84-85`, `:1118-1119`, and `guides/mcp.md:4804-4805`
  claim the whole runtime graph. The file header (`:1-6`) states that nothing in the file names
  this package or its exports, which the composition section necessarily breaks.
- The A5 objective lane found nested function assignments at `distributionPage.mjs:62` (the fetch
  wrapper assigned inside `arm`), `:165-166` (the parked resolvers assigned inside promise
  callbacks); the checker found `createLedger` (`:134-150`) returning an object literal whose
  `hooks.turn` and `hooks.tool` are arrow functions. `AGENTS.md` permits a function literal inside a
  body only as an anonymous callback passed directly as an argument or an anonymous function
  returned directly as a result. (The lint rule `policy/no-nested-functions` is scoped to `src/**`
  and `app/**`; the law still binds the files you write.)
- The page tool `ADD` (`distributionPage.mjs:32-40`) carries `name`, `description`, `parameters`
  only; the receipts assert none of `title` or `annotations`, so their loss over the wire would
  leave every assertion unchanged.
- Names and prose the reviewer found: the page export `install` (`distributionPage.mjs:367`, imported
  at `tests/distribution.test.ts:1152`) beside the npm `install` at `:1180`; `SERVED_PATH` for the
  `/receipts` route beside `RELAY_PATH` and `CONTROL_PATH`; the page's `counted()` stored as
  `Reading.fetches`; `both` in the control's title (`:1415`), the guide bullet (`guides/mcp.md:4819`),
  and comments (`:1246`, `distributionPage.mjs:162`); the guide sentence at `guides/mcp.md:4794-4795`
  making evidence the actor, and the line at `:4799` running past the block's wrap; `buildDeltas` and
  the scripted-provider shape twinned across the two fixtures.
- Host facts: Windows; `npm.cmd`; Chromium through the `playwright` the package declares;
  `npm run test:distribution -- --mode release` is the gate `prepublishOnly` runs (18 passed /
  4 skipped after U5c in 21.55 s); `npm run test:guides` (202); `npm run test:policy` carries ONE
  standing red (`surface population incomplete … src/core/helpers.ts:837: TSDeclareFunction`) the
  scaffold 0.0.69 re-pin closes — it is not yours. `Promise.withResolvers` exists in the Chromium
  Playwright ships and in Node 24.

## Unknowns

- Whether every bare specifier the agent's closure imports is an `@orkestrel/*` root or subpath
  entry the import map can cover from `node_modules`. Derive the map from each installed package's
  `exports` (the `.` and subpath keys; the `import` then `default` condition), report any specifier
  outside it, and stop if one cannot be served (that is a finding for the owning package, not a
  bundler fallback).

## Scope

- Owned: `tests/distribution.test.ts`, `tests/fixtures/distributionPage.mjs`,
  `tests/fixtures/distributionServer.mjs`, a new `tests/fixtures/distributionScript.mjs` if you
  consolidate the twins, `guides/mcp.md` `## Tests` only, and `tests/setupDistribution.ts` with its
  test if you extract helpers.
- Off-limits: `src/**`, `package.json`, `package-lock.json`, `vite.config.ts`, `.oxlintrc.json`,
  every other guide section, `tmp/**`. No npm package added to any manifest; the consumer's
  install list is fixed.
- Tools: Read, Grep, Glob, Edit, Write, Bash for the named commands. No install into this
  checkout, no commit, no `git stash`, `git checkout`, `git restore`, `git reset`, or `git clean`.

## Carriers

1. **The import map.** Replace the Vite bundle for the composition: the test writes `index.html`
   carrying an import map derived from the consumer's installed `@orkestrel/*` packages (every
   `exports` entry the closure needs: `@orkestrel/agent`, `@orkestrel/tool`, `@orkestrel/mcp/browser`,
   `@orkestrel/ndjson`, and every root entry the agent's built module names) mapped to
   `/modules/<package>/<path>`, and a `<script type="module">` that imports the page driver
   natively; `distributionServer.mjs` serves `/modules/<package>/<path>` from the consumer's
   `node_modules/@orkestrel/<package>/<path>` with the right media type and the page files from
   the page directory. The closure receipt then imports each entry through the map and reads one
   export — the Unknown's reading is the list of entries served and the console being clean.
   Remove the composition's Vite `build` call and its `bundle/` directory (this dissolves the
   duplicated build options; `bundleEntry` for the surface drives stays as it is).
2. **Metadata.** Give `ADD` a `title` and `annotations` (`{ pure: true }`) and assert their
   projection: in X6 the pair's `tools()` listing carries the `title` and the domain `annotations`
   as the guide documents the round trip (`toolAnnotationsToMCP` then `mcpAnnotationsToTool`, no
   invented defaults); in X7 the agent registry's wrapped tool carries the same `title` and
   `annotations` (R11). Assert the exact values; a lost field must redden the receipt.
3. **No nested functions.** In both fixtures: the fetch wrapper becomes a module-scope function
   (`countedFetch`) delegating to a module-scope `carry` that `arm` captures; the parked resolvers
   use `Promise.withResolvers()`; the ledger becomes a class or module-scope functions so that no
   function literal sits inside a body except the two sanctioned forms (the agent's hooks contract
   decides whether the ledger instance itself is the hooks object or `bind` supplies the
   callbacks). Sweep both fixtures and the test for any other occurrence.
4. **Coverage words (F2).** Say what the closure instrument reads — each root entry the installed
   agent's own module names — at `tests/distribution.test.ts:84-85`, `:1118-1119`, and the guide
   bullet; never "runtime closure … whole" or "runtime graph" unless you walk the graph.
5. **The header (F1).** Bound the file's opening invariant to the surface drives and state the
   composition section's opposite rule beside it: the surface drives name neither this package
   nor any export; the composition receipts name both deliberately, because a composition is of
   named things.
6. **Names (F4, F5).** Rename the page export `install` to `publish` (and its import); rename
   `SERVED_PATH` to `RECEIPTS_PATH`; use one term for the transport count on both sides of the
   boundary (the page's reader and `Reading`'s field).
7. **`both` (F6).** Retitle the control `reports one deliberate request on the request log and the
   counter`, change the guide bullet with it, and name the members in the two comments.
8. **The guide sentence and the long line (F7).** Rewrite `guides/mcp.md:4794-4795` with the proof
   as the actor ("Under `--mode release` the proof fails when it cannot reach the registry or a
   browser; anywhere else it skips and names what it could not reach") and wrap the line at
   `:4799` like its neighbours.
9. **The twins (F8).** Either consolidate `buildDeltas` and the scripted-provider shape into one
   `distributionScript.mjs` copied beside each fixture, or keep the twins and state in each header
   that the twin is deliberate because each file is copied whole into the consumer and resolves its
   own specifiers. Record the choice.
10. **Teardown and accounting (F10, F11).** Destroy the composition stage (the child, the browser)
    from the same hook that removes the scratch tree, or assert after the stage's teardown that no
    `distribution-*` tree survives; make the fixture's `/receipts` accounting report and reset on
    read (or key it per scenario) so a second relay receipt cannot misread the first's total.

## Execution

Perform the assignment directly; spawn nothing. Take the release-mode distribution run before
editing (the baseline for this unit), after carrier 1, and at the end.

## Acceptance criteria (cheap first)

1. `npm run format:check` exit 0; `npm run lint:check` exit 0.
2. `npm run check` exit 0.
3. `npm run test:distribution -- --mode release` exit 0 with the receipts X5–X8, the closure, the
   control, and the pre-existing cases green; the page loaded through the import map (no Vite
   `build` remains in the composition path); record the duration.
4. `npm run test:guides` exit 0 (the retitled control and any changed sentence in parity).
5. `git status --short` names only the owned files; no `src/**`, manifest, or config hunk.
6. No `any`, assertion, nested function, or default export in the hunks; no `both` tallying an
   unnamed set, no `above`/`below`, no count in prose you add; every test is named for what it
   proves.

## Output

Return, as your final message, a report with these sections and nothing else: **Carriers** (what
changed per carrier, `file:line`); **The Unknown's reading** (the import-map entries served and any
specifier outside the map); **Metadata projection** (the exact values asserted in X6 and X7 and
where the guide documents them); **Distribution runs** (the three release-mode readings with
durations); **Acceptance readings**; **Deviation state**. The Orchestrator captures it to
`tmp/units/U5d-mcp-distribution-report.md`.

## Deviation contract

Stop and report (expected, found, exact evidence, done or not done, one hypothesis at most) when a
closure entry cannot be served through the map, when a metadata field does not survive the wire
as the guide documents (that is a finding for `src/**`, off-limits), or when a criterion outside
your owned files reddens. Decide and record an ancillary matter yourself (a helper's name, where a
comment sits, which of carrier 9's forms you take).
