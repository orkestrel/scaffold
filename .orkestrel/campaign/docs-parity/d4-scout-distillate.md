# D4 scout distillate — Cursor Grok

Journal `tmp/cursor/docs-d4-scout.jsonl` (swept at acceptance), session id `9a9f4062-aa18-4b5e-8340-e3c674d7b899`, model Cursor Grok 4.6 High, 220,475 ms, `.err` empty. Brief: `d4-scout-brief.md`. The distillate follows unaltered.

---

# D4 terrain distillate

## 1. Scaffold’s own parity test

**Inventory and constructors.** `tests/guides.test.ts` builds one file map with `globSync(['src/**/*.ts', 'tests/**/*.ts', 'guides/*.md', '*.md'], { cwd: root })` (`:50-54`), then `parseManifest(files['guides/README.md'], 'guides')` (`:61-73`). Each row becomes `{ entry, guide: createGuide(markdown), source: createSource({ files, module: entry.source }) }`. The guide path is `entry.spec` from the concept index, not a hardcoded `guides/scaffold.md` except in later example its.

**How existing checks assert.** All catalog-style checks collect into an array and `expect(…).toEqual([])`. Check ids `SB`, `MB`, `EX`, `NV`, `FL`, `FI`, `LI`, `TE` do not appear in this file (search `\b(SB|MB|EX|NV|FL|FI|LI|TE|SQ|MQ|EQ|RQ|RN)\b` over `tests/guides.test.ts`: not found). Names are `it(...)` titles only.

| Title | Mechanism |
| --- | --- |
| extracts a non-vacuous… | `guide.sections()` vs `SURFACE`/`METHODS`/`TESTS`; empty `surface()`/`methods()`/`tests()`; `findUnlisted(guide.fences(), FENCE_LANGUAGES)` (`:80-97`) |
| documents every barrel-reachable export | `findMissingSymbols(source.surface(), guide.surface())` (`:99-107`) |
| documents nothing the barrels do not export | `findMissingSymbols(guide.surface(), source.surface())` (`:109-117`) |
| documents the members of every behavioural declaration | string-join of `group.methods` vs `source.methods(group.interface)`, plus class/`XInterface` extra (`:119-151`). Does **not** call `findMissing` |
| resolves every relative link… | `guide.links()` → skip `isExternalLink` → `source.exists(resolveLink(entry.spec, href))` (`:171-180`) |
| imports only real exports… | `extractFenceImports` + `findMissing(statement.names, names)` for `@orkestrel/scaffold` (`:182-197`) |

Fence **execution** is not a helper over `guide.fences()`. It is a second `describe('guide examples')` of transcribed `it(...)` cases (`:200-387`). `findUnexampled` is not imported.

**Where `expect(findDrift(guide, source)).toEqual([])` would sit.** `findDrift` is not imported (`:3-16`). Each `inspected` record already holds `guide` and `source` (`:63-73`). An empty-array assertion would loop that same collection inside `describe('guides')` beside the other collector its (`:75-198`).

**`it(...)` titles in order**

`describe('guides')`: `indexes at least one guide`; `extracts a non-vacuous surface, methods, and tests section`; `documents every barrel-reachable export`; `documents nothing the barrels do not export`; `documents the members of every behavioural declaration`; `publishes HostFile without the former Copy row type`; `publishes Worktree without the former Repository contract`; `publishes read without the former files reader method`; `resolves every relative link to a real file`; `imports only real exports in its code fences`.

`describe('guide examples')`: `keeps the command reference aligned with rendered usage`; `executes the blueprint defaults example`; `executes the compile refusal example`; `executes the error-code narrowing example`; `reports a retained setup seed when the planned release seed differs`; `skips rejected package targets only while traversing fallback lists`; `documents declaration substitution and each runtime condition set`.

---

## 2. Fleet parity-test shapes

**Shared with scaffold (not byte-for-byte).** `createGuide` / `createSource` / `parseManifest` / `findMissingSymbols` / `findUnlisted` / `extractFenceImports` / `findMissing` / `isExternalLink` / `resolveLink` from `@orkestrel/guide`. Empty-array expects. A `guides/README.md` manifest. Fence languages as a local `FENCE_LANGUAGES` constant.

**Not shared with scaffold.** `readInventory` from `@orkestrel/test/server` instead of `globSync`. `createSourceManager`. `findUnexampled`. `computeSymbolKey`. `INTERNAL` / `ROOT_FILES` / `MODULES`. Per-entry `for (const entry of manifest) { describe(...) }`. Methods bijection via `findMissing` both ways, plus `source.hidden()`. Separate `it('links only to test files that exist')` on `guide.tests()`. Opening comment: “consumer-side guides-parity drop-in”.

**database vs lsp.** database copies that drop-in loop (`:591-735`) and adds `deriveEntrySurfaces` / `checkGuideFences` from `./setupServer.js` (`:66`, `:137-289`, `:664-675`). Published-export SB compares the **compiler** surface, not `source.surface()` (`:611-616`). lsp SB compares `source.surface()` (`:134-139`) and adds `it('re-exports only direct declarations')` (`:131-133`). database `FENCE_LANGUAGES` is `['ts']` (`:69`); lsp the same (`:33`). Each package then appends its own executed-fence `describe` blocks.

**Shared runner.** None of scaffold, database, or lsp imports a function from `@orkestrel/guide` or `@orkestrel/test` that runs several catalog checks at once. They import leaf helpers. database’s `checkGuideFences` is local (`tests/setupServer.js`). `@orkestrel/test/server` supplies `readInventory` only.

**`findDrift` in fleet consumer suites.** Present in `/home/user/fleet/guide/tests/guides.test.ts` as a **transcribed fence** that expects a planted disagreement (`:358`), not as `toEqual([])`. Absent from database and lsp.

**Every `tests/guides.test.ts` under `/home/user/fleet`**

- **lsp drop-in** (constants + per-entry loop + `findUnexampled`): `abort`, `agent`, `browser`, `budget`, `console`, `contract`, `csv`, `emitter`, `indexeddb`, `lsp`, `middleware`, `ndjson`, `ollama`, `pool`, `qualifier`, `queue`, `rater`, `relation`, `router`, `sea`, `sqlite`, `sse`, `timeout`, `tool`, `toolbox`, `websocket`, `workflow`, `workspace`, `program`, `server`, `worker`.
- **lsp drop-in plus extra transcribed fences / extra `@src` imports:** `codec`, `form`, `html`, `interpret`, `markdown`, `mcp`, `msg`, `process`, `reason`, `table`, `template`, `terminal`, `brief` (brief also imports `extractDeclaration`).
- **database shape** (drop-in + compiler surfaces): `database/tests/guides.test.ts`.
- **guide self-dogfood** (imports from `@src/core`, including `findDrift`; Tests section says SQ/MQ/EQ are unwired): `guide/tests/guides.test.ts`.
- **test package** (`readInventory` + `createGuide`/`createSource`/`findMissingSymbols`; no `createSourceManager` / `findUnexampled` / `findUnlisted`): `test/tests/guides.test.ts`.
- **probe hand-roll** (no `@orkestrel/guide` import; local `extractExports` / `extractRows` over barrel text): `probe/tests/guides.test.ts`.

---

## 3. Whether anything generates `tests/guides.test.ts`

**`src/core/artifacts.ts`:** not found (path covered: `/home/user/scaffold/src/core/artifacts.ts`).

**`GUIDES_TEST_PATH`.** `src/core/constants.ts:308`: `export const GUIDES_TEST_PATH = 'tests/guides.test.ts'` — “Names the guide-parity proof whose presence selects the planned `guides` project.”

**`src/core/templates.ts`.** The constant is interpolated only into the Vitest factory include (`:337-347`): `include: ['${GUIDES_TEST_PATH}']`. `ARTIFACT_TEMPLATES.guides` holds only a `readme` seed (`:2151-2167`), not a test file.

**`src/core/compilers.ts`.** `GUIDES_TEST_PATH` / `guides.test.ts` as a planned artifact: not found. `blueprintToTestArtifacts` emits setup modules, entry tests, distribution, integration (`:1186+`). `blueprintToGuideArtifacts` emits `guides/README.md` only (`:1368-1407`). `blueprint.guides` adds the `guides` Vite project and `npm run test:guides` (`:321`, `:349`, `:822-824`).

**Detection, not writing.** `src/bin/CLI.ts:910-930`: `guides = resolveContainedPath(target, GUIDES_TEST_PATH)` then `guides: guides !== undefined && isExactCaseFile(guides)`.

**`guides/scaffold.md` § Ownership and drift (`:1003-1011`):**

> You own `tests/setup.ts`, the selected `tests/setupBrowser.ts`, `tests/setupServer.ts`, `tests/setupService.ts`, and `tests/setupGlobal.ts` modules, each root `tests/setup*.test.ts` proof, the selected environment entry tests under `tests/src` and `tests/app`, the `tests/src/bin/main.test.ts` file, and the `tests/integration.test.ts` seed. Scaffold writes those planned files only during materialize and leaves later edits or deletions alone. You also own the `tests/guides.test.ts`, `tests/conformance.test.ts`, and `tests/service/**/*.test.ts` proof files, each of which selects its project by being written.

A target that lacks the file gets no test-file seed from `new` / `repair` / `overwrite`. Presence of the file is what turns `guides` on.

---

## 4. How a `scripts/*` seed reaches a target

**Declared in `HOST_PATHS`** (`src/core/constants.ts:132-137`): `'scripts/deps.sh'`, `'scripts/cursor.sh'`, `'scripts/codex.sh'`, `'scripts/ollama.sh'`. Not in `CANON_PATHS` (`:186-201`; no `scripts/` member).

**Executable bit** (`EXECUTABLE_PATHS`, `:230-235`): the same four paths.

**`host.json`** is the staged inventory of those destinations (`:687-709`): `scripts/codex.sh`, `scripts/cursor.sh`, `scripts/deps.sh`, `scripts/ollama.sh`.

**Plan path.** `nameToHostArtifacts` maps `selectHostPaths(HOST_PATHS, name)` into presence/host artifacts (`src/core/compilers.ts:1550-1556`). `Compiler` spreads that list (`src/core/Compiler.ts:297`). Hydration copies bytes from the vendored root.

**Other script, not `HOST_PATHS`.** `SERVICE_SCRIPT_PATH = 'scripts/service.sh'` (`constants.ts:302`). `blueprintToOrchestrationArtifacts` emits it as a **template** when `blueprint.vendors.length > 0` (`compilers.ts:1495-1509`).

**Manifest `scripts` block.** `blueprintToWritableScripts` (`compilers.ts:280+`) emits `clean`/`copy`/`format`/`lint`/`check`/`test`/`build` and, when `blueprint.guides`, `'test:guides': \`${vitest} --project guides\``. No row names a TypeScript file under `scripts/`.

**`.ts` run by `npm run <name>`.** not found. Patterns `"docs"`, `tsx `, `ts-node`, `scripts/.*\.ts` over `/home/user/scaffold/package.json` and every `/home/user/fleet/**/package.json`. Scaffold scripts (`package.json:61-93`) are `node -e`, `oxlint`, `tsc`, `vitest`, `vite`, `npm run …`. Fleet `database` and `emitter` match that shape (`database/package.json:60-80`, `emitter/package.json:45-70`).

---

## 5. Rule sentences D4 amends

**`AGENTS.md`**

- `:82` — “**Documentation:** update the matching guide or spec and parity coverage.”
- `:101` — “**Document:** update the guide, examples, and parity contract.”
- `:123` — rule-map row: “TypeScript syntax, imports, immutability, errors, TSDoc”
- `:132` — rule-map row: “Guides, parity, roadmap, showcase, examples”
- `:139` — “Keep public exports and behavioral methods in guide parity. TypeScript, SCSS, Markdown, tests, and showcase must agree.”
- `:140` — “Never suppress a parity failure. Correct the drift.”
- `:150` — “This governs prose everywhere: chat replies, instruction files, guides, TSDoc, commit messages, and briefs.”

`Summary` cell, tagline, H1 blockquote, README pitch, `@example` title, “noun phrase”: not found in `AGENTS.md`.

**`.claude/rules/documentation.md`**

- `:30-34` — Parity: every backticked API resolves; every public export is documented; TypeScript/SCSS/Markdown/tests/showcase aligned; “A parity failure identifies drift; never suppress or weaken the test.”
- `:35` — “The TSDoc voice rule governs a doc block; a guide tagline and a Surface-row description are noun phrases.”
- `:37` — “The parity test proves a name exists, never that a sentence about behavior is true… `tests/guides.test.ts` executes the flagship fences”
- `:41-47` — Methods tables, Surface row for readonly properties, class-no-extra.

`Summary` cell, README pitch, `@example` title: not found in this file.

**`.claude/rules/tests.md`**

- `:55` — `` `tests/guides.test.ts` | Every documented API exists, every public API is documented, and every executable fence returns what the guide says it returns ``
- `:66-72` — guides project: name resolution plus transcribed flagship fences; “Name resolution is not a behavioural proof”.

**`.claude/rules/typescript.md`**

- `:77` — “Every public export has complete TSDoc: description, `@param`, `@returns`, and `@example` where applicable.”
- `:78-79` — “The first sentence states what the symbol does in the third person with an `-s` verb — `Creates`, `Returns`, `Checks whether` — and never repeats the symbol's name.”
- `:90` — “Private methods and overload-specific notes use single-line `//` comments, not public TSDoc.”

**`.claude/rules/writing.md`**

- `:3` — governs “guides, README files”
- `:66` — “Write a heading in sentence case, verb first for a task and a noun phrase for a concept.”

---

## 6. `guides/guide.md` check catalog (guide checkout tip)

**Catalog rows** (`:479-540`): SB (surface bijection); MB (methods bijection + class-no-extra); RN (row naming); LI (link integrity); TE (tests-link existence); NV (non-vacuousness); FL (fence-language listing); EX (examples presence, `findUnexampled`); **SQ — Surface summary equality**; **MQ — Methods summary equality**; **EQ — Example equality**; FI (fence-import reality).

**SQ** (`:522-528`): “For every symbol both `guide.surface()` and `source.surface()` carry, the guide row's `Summary` cell equals the declaration's description paragraph.” “`findDrift` is the comparison.”

**MQ** (`:529-530`): same comparison per `MethodGroup`, keyed `Owner.member`.

**EQ** (`:531-535`): “Every titled guide fence against the `@example` block of the same title, body and fence language together.” First fence per title; untitled `@example` stays EX.

**TQ:** not found (pattern `TQ —` / `TQ -` over `/home/user/fleet/guide/guides/guide.md`).

**How a consumer asserts equality** (`:542-543`):

> SQ, MQ, and EQ share one function: `findDrift(guide, source)` returns every disagreement with both sites, so a package's whole equality gate is `expect(findDrift(guide, source)).toEqual([])`.

**Tagline / RQ are outside `findDrift`** (`:367-369`):

> `@param`, `@returns` and the `Returns` column, `@remarks` and narrative, and the H1 tagline are outside the comparison — `tagline()` reads the tagline for a package that compares it against its own README, and it gains a partner to compare against when a source declares `@packageDocumentation`.

**§ Patterns** (`:691-708`): fence `### Compare a guide against the source it documents` imports `findDrift` and shows the planted disagreement, not `toEqual([])`.

**§ Tests** (`:759-764`):

> This repository runs the catalog against itself. Its `tests/guides.test.ts` wires RN, SB, MB, LI, TE, NV, FL, EX, and FI. It does not wire SQ, MQ, or EQ: this guide's Surface and Methods tables head their compared column `Shape`, `Signature`, `Behavior`, `Builds`, and `Returns` rather than `Summary`

---

## 7. README pitch vs H1 blockquote

**Scaffold README** first paragraph after H1 (`README.md:3-4`):

> Compile a workspace specification into an ordered list of files, compare that list to a real directory, and write the difference.

**Scaffold guide H1 blockquote** (`guides/scaffold.md:3-6`):

> Scaffold compiles a workspace specification into an ordered list of files, compares that list to a real directory, and writes the difference. It ships one executable, `scaffold`, and library entry points: `@orkestrel/scaffold` is the pure compiler and its data contracts, and `@orkestrel/scaffold/server` is the filesystem writer and the network reader. Source: [`src/core/index.ts`](../src/core/index.ts) and [`src/server/index.ts`](../src/server/index.ts).

**Database README** first paragraph after H1 (`/home/user/fleet/database/README.md:3-8`):

> A typed database abstraction for the `@orkestrel` line — one public `Database` over internal table/query engines and pluggable storage drivers at the seams. Consumers use `TableInterface` and `QueryInterface`. Built to sit beside `@orkestrel/contract` (validation) and `@orkestrel/emitter` (observable lifecycle), reusing both directly. `TableInterface.cursor()` exposes the `CursorInterface` contract for serial bulk mutation.

**Database guide H1 blockquote** (`guides/database.md:3-28`): opens “One typed database API that runs unchanged on top of an in-memory map or a persistent JSON file…” and continues through the “table is a contract” / “one engine, thin drivers” stance and the published entry points (quoted in full at those lines).

---

## Paths covered

`/home/user/scaffold/tests/guides.test.ts`; `/home/user/scaffold/src/core/constants.ts`; `/home/user/scaffold/src/core/templates.ts`; `/home/user/scaffold/src/core/compilers.ts`; `/home/user/scaffold/src/core/Compiler.ts`; `/home/user/scaffold/src/bin/CLI.ts`; `/home/user/scaffold/src/core/artifacts.ts` (absent); `/home/user/scaffold/guides/scaffold.md`; `/home/user/scaffold/README.md`; `/home/user/scaffold/package.json`; `/home/user/scaffold/host.json`; `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/documentation.md`; `/home/user/scaffold/.claude/rules/tests.md`; `/home/user/scaffold/.claude/rules/typescript.md`; `/home/user/scaffold/.claude/rules/writing.md`; `/home/user/fleet/**/tests/guides.test.ts` (glob); `/home/user/fleet/database/tests/guides.test.ts`; `/home/user/fleet/lsp/tests/guides.test.ts`; `/home/user/fleet/guide/tests/guides.test.ts`; `/home/user/fleet/guide/guides/guide.md`; `/home/user/fleet/guide/src/core/helpers.ts` (`findDrift`); `/home/user/fleet/database/README.md`; `/home/user/fleet/database/guides/database.md`; `/home/user/fleet/database/package.json`; `/home/user/fleet/emitter/package.json`; `/home/user/fleet/**/package.json` (script-runner patterns); `/home/user/fleet/probe/tests/guides.test.ts`; `/home/user/fleet/test/tests/guides.test.ts`; `/home/user/fleet/test/src/**/index.ts` (no guide runner).
