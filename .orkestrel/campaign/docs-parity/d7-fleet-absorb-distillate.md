# Absorption brief — D7.n terrain: every fleet package under the equality gate

Reference shape: `/home/user/fleet/guide/tests/guides.test.ts:94-113` (pin), `:120-127` (README), `:196-204` (equality inside the manifest loop).

## Scaffold template

`/home/user/scaffold/src/core/templates.ts` does **not** carry a `tests/guides.test.ts` template.

| Site | What it is |
| --- | --- |
| `templates.ts:5`, `:341` | `GUIDES_TEST_PATH` is only the Vitest `include` for the `guides` project |
| `constants.ts:313` | `GUIDES_TEST_PATH = 'tests/guides.test.ts'` |
| `templates.ts:987-1024` `ARTIFACT_TEMPLATES.tests` | `setup`, `global`, `entry`, `bin`, `distribution` — no guides-test body |
| `constants.ts:136-158` `HOST_PATHS` | seeds `scripts/docs.ts` (`DOCS_SEED_PATH` at `:112`); does **not** seed `tests/guides.test.ts` |

`grep -n "findDrift\|pairs at least one\|tagline" src/core/templates.ts` → no matches. The drop-in is package-owned. The seed is host-copied `scripts/docs.ts`. Neither exists in any fleet checkout except `guide`.

## Catalog layer

From `/home/user/scaffold/.claude/agents/orkestrel.md:46-97`. Fleet has no `supervisor` checkout. `scaffold` is this repo, not under `/home/user/fleet/`.

| Layer | Packages |
| --- | --- |
| L0 | codec, contract, msg, sse, test |
| L1 | abort, budget, csv, emitter, html, indexeddb, ndjson, sqlite, timeout, tool |
| L2 | console, database, form, markdown, pool, process, reason, router, table, template, websocket |
| L3 | browser, interpret, lsp, qualifier, queue, rater, relation, sea, server, terminal, workspace |
| L4 | brief, mcp, middleware, program, worker, workflow |
| L5 | agent, probe |
| L6 | ollama, toolbox |

## 1. Manifest (`guides/README.md` `## By concept`)

Every package except **probe** has one concept row pointing at `guides/<pkg>.md`. Mirrors (`contract.md`, `guide.md`, `test.md`, …) live under Dependency reference, not in the concept index, so `findDrift` will not inspect them until someone adds a row.

| Package | Concept row | Spec | Source | Tests |
| --- | --- | --- | --- | --- |
| abort | `abort/guides/README.md:9` | `abort.md` | `src/core` | `tests/src/core` |
| agent | `:9` | `agent.md` | `src/core` | `tests/src/core` |
| brief | `:7` | `brief.md` | `src/core` | `tests/src/core` |
| browser | `:9` | `browser.md` | `src/core`, `src/server` | matching tests |
| budget | `:9` | `budget.md` | `src/core` | `tests/src/core` |
| codec | `:9` | `codec.md` | `src/core` | `tests/src/core` |
| console | `:10` | `console.md` | core/browser/server | matching tests |
| contract | `:9` | `contract.md` | `src/core` | `tests/src/core` |
| csv | `:9` | `csv.md` | `src/core` | `tests/src/core` |
| database | `:10` | `database.md` | core/browser/server | matching tests |
| emitter | `:9` | `emitter.md` | `src/core` | `tests/src/core` |
| form | `:9` | `form.md` | `src/core` | `tests/src/core` |
| html | `:9` | `html.md` | `src/core` | `tests/src/core` |
| indexeddb | `:10` | `indexeddb.md` | `src/browser` | `tests/src/browser` |
| interpret | `:9` | `interpret.md` | `src/core` | `tests/src/core` |
| lsp | `:10` | `lsp.md` | `src/core`, `src/server` | `tests/src` |
| markdown | `:9` | `markdown.md` | `src/core` | `tests/src/core` |
| mcp | `:9` | `mcp.md` | core/server/browser | matching tests |
| middleware | `:10` | `middleware.md` | `src/core`, `src/server` | matching tests |
| msg | `:9` | `msg.md` | `src/core` | `tests/src/core` |
| ndjson | `:9` | `ndjson.md` | `src/core` | `tests/src/core` |
| ollama | `:10` | `ollama.md` | `src/server` | hermetic + `tests/service` |
| pool | `:9` | `pool.md` | `src/core` | `tests/src/core` |
| **probe** | `probe/guides/README.md:5-14` | `probe.md` | core/server/bin | matching tests — **list, not a table**; `parseManifest` will not see this |
| process | `:9` | `process.md` | core · server | matching tests |
| program | `:9` | `program.md` | `src/core` | `tests/src/core` |
| qualifier | `:9` | `qualifier.md` | `src/core` | `tests/src/core` |
| queue | `:10` | `queue.md` | `src/core` | `tests/src/core` |
| rater | `:9` | `rater.md` | `src/core` | `tests/src/core` |
| reason | `:9` | `reason.md` | `src/core` | `tests/src/core` |
| relation | `:9` | `relation.md` | `src/core` | `tests/src/core` |
| router | `:10` | `router.md` | core/browser/server | matching tests |
| sea | `:10` | `sea.md` | `src/server` | `tests/src/server` |
| server | `:10` | `server.md` | `src/server` | `tests/src/server` |
| sqlite | `:10` | `sqlite.md` | `src/server` | `tests/src/server` |
| sse | `:9` | `sse.md` | `src/core` | `tests/src/core` |
| table | `:9` | `table.md` | `src/core` | `tests/src/core` |
| template | `:9` | `template.md` | `src/core` | `tests/src/core` |
| terminal | `:10` | `terminal.md` | core/server | matching tests |
| test | `:9` | `test.md` | core/browser/server | matching tests |
| timeout | `:9` | `timeout.md` | `src/core` | `tests/src/core` |
| tool | `:11` | `tool.md` | `src/core` | `tests/src/core` |
| toolbox | `:9` | `toolbox.md` | core/server | matching tests |
| websocket | `:10` | `websocket.md` | `src/server` | `tests/src/server` |
| worker | `:11` | `worker.md` | core/server | matching tests |
| workflow | `:9` | `workflow.md` | core/browser/server | matching tests |
| workspace | `:13` | `workspace.md` | `src/core` | `tests/src/core` |

**probe** needs a `| Concept | Spec | Source | Tests |` table before the drop-in can parse it. **lsp** names the concept `Package` rather than `Lsp`.

## 2. Own-spec table headers (`## Surface` / `## Methods`)

No in-scope own spec heads `Summary` on every Surface and Methods table. Function/entity Surface tables often head `Summary`. Types tables head `Shape`. Methods tables head `Behavior`.

**Surface compared column is not `Summary`:**

| Package | Headers (verbatim first cells + compared column) |
| --- | --- |
| codec | `codec.md:66,:93,:109` `Name \| Kind \| Signature \| Behavior` — no Methods H2 |
| contract | mix: `Summary` at `:189,:489,:548,:599`; `Shape` at `:286,:454`; `Behavior` at `:334,:350,:365`; Methods `Behavior` `:672+` |
| csv | `:43` `Type \| Kind \| Shape`; Methods `:215` `Behavior` |
| html | `:15` Shape; `:45,:71,:86,:95,:148` Behavior; `:137` `Builds`; Methods `:162` Behavior |
| lsp | `:309,:320` `Method \| Signature \| Behavior`; `:330+` `Export \| Kind \| Purpose` |
| markdown | `:15` Shape; Methods `:203` Behavior |
| msg | `:41` Shape; Methods `:368,:375` Behavior |
| probe | `:34` Shape/Purpose; `:58` Value/Purpose; `:77,:102,:120,:198,:234` Behavior; `:90` Describes; `:168` Purpose; Methods `:245+` Behavior |
| tool | `:41` Shape/Purpose; `:56,:64,:73` Behavior; Methods `:103,:109` Behavior |
| workspace | `:35` Shape/Purpose; `:62` Purpose; `:71,:81,:103,:113` Behavior; Methods `:165+` Behavior |
| database | mostly Summary; Surface Behavior `:185,:195,:204,:214`; Types Shape `:243`; Methods Behavior |
| brief | Summary plus `Narrows to` `:221`, `Builds…` `:296,:363,:584`; Types Shape `:87`; Methods Behavior |
| interpret | Summary plus Narrows to `:227`, Builds… `:436`; Types Shape `:75`; Methods Behavior |
| program | Summary plus Narrows to `:222`, Builds… `:372`; Types Shape `:127`; Methods Behavior |
| qualifier | Summary plus Checks/Leaves-unchecked `:153`, Builds `:339`; Types Shape `:70`; Methods Behavior |
| rater | Summary plus Checks `:111`, Builds… `:240`; Types Shape `:64`; Methods Behavior |
| reason | Summary plus `Creates…` `:100`, Narrows to `:216`; Types Shape `:296`; Methods Behavior |
| relation | Summary plus `Builds a relation where…` `:45`; Types Shape `:79`; Methods Behavior |
| ndjson | Types Shape `:44`; `Builds…` `:58`; Summary `:71`; Methods Behavior `:82` |
| sse | Types Shape `:39`; Summary; `Builds…` `:88`; Methods Behavior `:116` |
| template | Types Shape `:35`; Summary; Builds… `:136`; Methods Behavior |
| toolbox | Summary plus Surface Behavior `:65,:77,:103`; Types Shape `:184`; Methods Behavior |
| workflow | Summary plus Surface Behavior `:220`; Types Shape `:173,:363`; Methods Behavior |

**Surface function tables already head `Summary`; Types still `Shape` and/or Methods still `Behavior`:** abort (`abort.md:25,:31,:38,:44` Summary; `:50` Shape; `:65` Behavior), agent, budget, browser, console, emitter, form, indexeddb, mcp, middleware, ollama, pool, process (`:162` also has `Value \| Summary`), queue, router, sea, server, sqlite, table, terminal, timeout, websocket, worker.

## 3. H3 backticked entity headings with no table row

| Package | Heading | Line |
| --- | --- | --- |
| html | `HTML` | `html.md:152` (table has `createHTML` at `:150`, not `HTML`) |
| workspace | `Workspace`, `WorkspaceManager`, `MemoryWorkspaceStore`, `DatabaseWorkspaceStore` | `workspace.md:123,:134,:143,:150` |
| tool | `Tool`, `ToolManager` | `tool.md:78,:88` |
| csv | `CSV` | `csv.md:190` |
| msg | `MSG` | `msg.md:331` |
| markdown | `Markdown` | `markdown.md:180` |
| contract | `ContractError` | `contract.md:316` |

Mirrors of `contract.md` / `workspace.md` / `tool.md` / `html.md` repeat those H3s in dependents; they are not concept-index specs. `ollama.md:121` `### \`createOllama\` + \`generate\`` sits under Patterns (`:119`), not a class row.

## 4. H1 blockquotes vs README pitch

`grep ^>` on `/home/user/fleet/*/README.md` hits **codec only** (plus `guide`, out of scope). Own specs almost all open with `>`.

| Package | Spec tagline first line | README H1 blockquote | Equal? |
| --- | --- | --- | --- |
| codec | `codec.md:3` "The fleet's byte-to-text codings…" | `README.md:3` same sentence | **No** — spec link `[src/core](../src/core)` vs README `[src/core](src/core)` (`codec.md:6-7` vs `README.md:6-7`) |
| abort | `abort.md:3` "The cancellation primitive…" | absent (`README.md:3` is prose) | No |
| probe | `probe.md:3` "**The claim prover…**" (multi-paragraph) | absent | No |
| every other in-scope package | spec `> ` present at line 3 of `guides/<pkg>.md` | **absent** | No |

`guides/README.md` files are `# Guides` with no blockquote; the gate reads package `README.md`, not the index.

## 5. Titled `@example` and Patterns H3s

`grep -rn "^\s*\*\s*@example[ \t]\+[^ \t]" src/` under fleet: **hits only `guide/`** (out of scope). Every in-scope `@example` is untitled.

Own specs **with no `## Patterns` H2**: form, interpret, lsp, msg, ndjson, probe, rater, sea, sse, table, template, tool, workspace.

Own specs **with `## Patterns`** — `### ` headings after that H2:

| Spec | `## Patterns` | Pattern `### ` headings |
| --- | --- | --- |
| abort.md | `:83` | `:85,:96,:110,:134` |
| codec.md | `:272` | `:274,:285,:297,:312,:324,:341,:355,:392` |
| contract.md | `:734` | `:736` through `:1069` |
| html.md | `:336` | `:340` through `:642` |
| csv.md | `:326` | `:330` through `:440` |
| agent.md | `:799` | `:801` through `:1097` |
| browser.md | `:2042` | `:2044,:2061,:2075,:2123,:2138` |
| markdown.md | `:609` | present |
| also | — | budget `:101`, console `:415`, database `:862`, emitter `:99`, indexeddb `:237`, mcp `:3747`, middleware `:513`, ollama `:119`, pool `:210`, process `:1235`, program `:731`, qualifier `:522`, queue `:243`, reason `:585`, relation `:144`, router `:384`, server `:421`, sqlite `:112`, terminal `:603`, test `:1409`, timeout `:141`, toolbox `:336`, websocket `:172`, worker `:388`, workflow `:701` |

## 6. `tests/guides.test.ts`

`findDrift` appears **only** in `guide/tests/guides.test.ts` (out of scope). No in-scope file has the pin, the example-title case, or the README tagline case.

Readers: every package except **probe** imports `createGuide`, `createSource`, `createSourceManager`, `extractFenceImports`, `findMissing`, `findMissingSymbols`, `findUnexampled`, `findUnlisted`, `isExternalLink`, `parseManifest`, `resolveLink` (usually `computeSymbolKey`) **from `@orkestrel/guide`**.

| Package | Readers from | `findDrift` | Reads `README.md` | Last line |
| --- | --- | --- | --- | --- |
| abort | `@orkestrel/guide` `:19` | absent | index only (`:50`) | 237 |
| agent | `@orkestrel/guide` | absent | index | 262 |
| brief | `@orkestrel/guide` `:21` | absent | inventory `MARKDOWN_TARGETS` includes `README.md` `:89` — not tagline equality | 496 |
| browser | `@orkestrel/guide` | absent | index | 182 |
| budget | `@orkestrel/guide` | absent | index | 312 |
| codec | `@orkestrel/guide` | absent | index | 363 |
| console | `@orkestrel/guide` | absent | index | 572 |
| contract | `@orkestrel/guide` | absent | index | 360 |
| csv | `@orkestrel/guide` | absent | `ROOT_FILES` / `PACKAGE_README` | 332 |
| database | `@orkestrel/guide` `:6,:63` (+ `SurfaceSymbol` type) | absent | index `:108` | 736 |
| emitter | `@orkestrel/guide` | absent | index | 222 |
| form | `@orkestrel/guide` | absent | `createGuide(README.md)` Usage fence `:112,:809` — not tagline equality | 845 |
| html | `@orkestrel/guide` `:69` | absent | README claims `:229` — not tagline | 654 |
| indexeddb | `@orkestrel/guide` | absent | index | 297 |
| interpret | `@orkestrel/guide` | absent | index | 732 |
| lsp | `@orkestrel/guide` | absent | index | 224 |
| markdown | `@orkestrel/guide` | absent | index | 720 |
| mcp | `@orkestrel/guide` `:48` | absent | `describe('README.md')` links `:120` — not tagline | 1464 |
| middleware | `@orkestrel/guide` | absent | index | 177 |
| msg | `@orkestrel/guide` | absent | index | 385 |
| ndjson | `@orkestrel/guide` | absent | README text `:197` | 266 |
| ollama | `@orkestrel/guide` | absent | index | 203 |
| pool | `@orkestrel/guide` | absent | index | 204 |
| **probe** | `@src/core` / `@src/server` only (`:3-8`); not the drop-in | absent | `readWorkspaceText('README.md')` `:307` | 416 |
| process | `@orkestrel/guide` | absent | README assertions `:1082,:1383` | 1432 |
| program | `@orkestrel/guide` | absent | index | 267 |
| qualifier | `@orkestrel/guide` | absent | index | 298 |
| queue | `@orkestrel/guide` | absent | index | 226 |
| rater | `@orkestrel/guide` | absent | index | 309 |
| reason | `@orkestrel/guide` | absent | index | 510 |
| relation | `@orkestrel/guide` | absent | index | 249 |
| router | `@orkestrel/guide` | absent | index | 315 |
| sea | `@orkestrel/guide` | absent | index | 241 |
| server | `@orkestrel/guide` | absent | index | 254 |
| sqlite | `@orkestrel/guide` | absent | index | 340 |
| sse | `@orkestrel/guide` | absent | README text | 340 |
| table | `@orkestrel/guide` | absent | `createGuide(README)` Usage `:93,:751` | 793 |
| template | `@orkestrel/guide` | absent | index | 302 |
| terminal | `@orkestrel/guide` | absent | index | 627 |
| test | `@orkestrel/guide` `:13` | absent | inventory + README `:64,:1029` | 1074 |
| timeout | `@orkestrel/guide` | absent | README text `:187` | 270 |
| tool | `@orkestrel/guide` | absent | index | 269 |
| toolbox | `@orkestrel/guide` | absent | index | 254 |
| websocket | `@orkestrel/guide` | absent | index | 264 |
| worker | `@orkestrel/guide` | absent | index | 256 |
| workflow | `@orkestrel/guide` | absent | index | 339 |
| workspace | `@orkestrel/guide` `:36` | absent | flagship `README.md` as workspace file content `:225` — not tagline | 386 |

Insert the three cases in the guide's landed shape: pin at file scope naming both title sets; README case with both `not.toBeUndefined()` guards; equality inside `describe(\`${entry.concept}\`)` collecting `findDrift` lines. **probe** needs its own unit (hand-rolled harness). All pins are `@orkestrel/guide` `^0.0.17`; the landed readers/renderers are `0.0.18` on the guide branch — the drop-in cannot import `findDrift` from the registry `0.0.17` barrel until each package re-pins.

## 7. `package.json` / seed

| Field | Every in-scope package |
| --- | --- |
| `@orkestrel/guide` | `^0.0.17` |
| `@orkestrel/scaffold` | `^0.0.63` |
| `docs` script | absent (only `guide/package.json:73` has it) |
| `scripts/docs.ts` | absent (only `guide/scripts/docs.ts`) |

Versions (catalog-aligned): abort 0.0.9, agent 0.0.20, brief 0.0.7, browser 0.0.15, budget 0.0.9, codec 0.0.2, console 0.0.12, contract 0.0.16, csv 0.0.6, database 0.0.13, emitter 0.0.9, form 0.0.5, html 0.0.8, indexeddb 0.0.10, interpret 0.0.12, lsp 0.0.6, markdown 0.0.13, mcp 0.0.28, middleware 0.0.19, msg 0.0.9, ndjson 0.0.9, ollama 0.0.14, pool 0.0.10, probe 0.0.12, process 0.0.10, program 0.0.12, qualifier 0.0.13, queue 0.0.12, rater 0.0.13, reason 0.0.9, relation 0.0.11, router 0.0.13, sea 0.0.14, server 0.0.18, sqlite 0.0.10, sse 0.0.6, table 0.0.4, template 0.0.6, terminal 0.0.14, test 0.0.13, timeout 0.0.9, tool 0.0.13, toolbox 0.0.12, websocket 0.0.11, worker 0.0.11, workflow 0.0.17, workspace 0.0.7.

Each checkout needs: copy seed → `docs` script → re-pin guide to the release that exports `findDrift` → `npm run build && npm run docs` (seed loads `dist/` through `exports`).

## 8. Doc-block openers (first exports sampled)

Surface-table Summary cells: mostly `Creates` / `Checks` / `Names` (imperative-style, per-package). `types.ts` description paragraphs across the fleet: mostly `Represents` / `Names` / `Carries` / `Holds` / `Lists` / `Returns` — noun or copula openers, not third-person `-s` action verbs. Factory files use `Creates` / `Validates` / `Links`. The equality gate's compared-summary check will disagree wherever a `Summary` cell was written as an imperative (for example "Create an `AbortInterface`…" at `abort.md:27`) against a `Represents`/`Creates`-opening description paragraph.

## Closing sets

- **Tables already head `Summary` throughout:** none. Methods still head `Behavior` wherever a Methods table exists; Types still head `Shape` wherever a Types table exists.
- **Non-`Summary` compared column on Surface (not only Types/Methods):** brief, codec, contract, csv, database, html, interpret, lsp, markdown, msg, ndjson, probe, program, qualifier, rater, reason, relation, sse, template, tool, toolbox, workflow, workspace.
- **README carries no H1 blockquote:** every in-scope package except codec (and codec's pitch is still not byte-equal to the spec tagline, because of `src/core` vs `../src/core`).
- **H3-documented classes lacking rows:** contract (`ContractError`), csv (`CSV`), html (`HTML`), markdown (`Markdown`), msg (`MSG`), tool (`Tool`, `ToolManager`), workspace (`Workspace`, `WorkspaceManager`, `MemoryWorkspaceStore`, `DatabaseWorkspaceStore`).
- **Any titled `@example`:** none in scope.
- **Also blocking, not in those lists:** probe's concept index is not a table; probe's suite is not the drop-in; `scripts/docs.ts` / `docs` script absent everywhere in scope; `@orkestrel/guide` still `^0.0.17`; no `tests/guides.test.ts` template in scaffold to propagate the three cases.

---

**Journal:** `/home/user/scaffold/tmp/grok/docs-d7-fleet-absorb.jsonl`
**Session id:** `ed4897c8-bd95-4c39-bf9a-2cda7310c5ca`