# Unit docs-ecosystem — report

Returned by `orkestrel` on Sonnet on 2026-09-05 (brief: `tmp/units/docs-ecosystem-brief.md`). Captured verbatim by the Orchestrator; the two Unknowns on `table` and `program` were settled by the Orchestrator afterwards and are appended under § Settled.

## Map

Per-package documentation inventory read from `/home/user/fleet/<package>/` (each package's own guide, its own `README.md`, its own `tests/guides.test.ts`) plus `/home/user/scaffold` for the `scaffold` row. `@packageDocumentation` column reports whether the package's core entry (`src/core/index.ts`, or the path named where it differs) opens with that block — reconciled by direct grep of the file, not the earlier fleet-wide sweep, which returned a false negative for `contract` and is corrected here. `@orkestrel/guide range` is the declared `devDependencies` range from each `package.json`.

| Package | Guide (path:lines) | `tests/guides.test.ts` (`it(` count) | `README.md` (lines) | `@packageDocumentation` | `@orkestrel/guide` range |
|---|---|---|---|---|---|
| abort | `guides/abort.md`:153 | yes:22 | 63 | not found | `^0.0.17` |
| agent | `guides/agent.md`:1141 | yes:26 | 65 | not found | `^0.0.17` |
| brief | `guides/brief.md`:1245 | yes:21 | 47 | not found | `^0.0.17` |
| browser | `guides/browser.md`:2153 | yes:18 | 76 | not found | `^0.0.17` |
| budget | `guides/budget.md`:191 | yes:26 | 66 | not found | `^0.0.17` |
| codec | `guides/codec.md`:492 | yes:29 | 84 | not found | `^0.0.17` |
| console | `guides/console.md`:710 | yes:42 | 94 | not found | `^0.0.17` |
| contract | `guides/contract.md`:1104 | yes:32 | 58 | not found | `^0.0.17` |
| csv | `guides/csv.md`:497 | yes:31 | 104 | not found | `^0.0.17` |
| database | `guides/database.md`:2461 | yes:40 | 47 | not found | `^0.0.17` |
| emitter | `guides/emitter.md`:218 | yes:20 | 70 | not found | `^0.0.17` |
| form | `guides/form.md`:1738 | yes:59 | 80 | not found | `^0.0.17` |
| guide | `guides/guide.md`:553 | yes:32 | 176 | not found | n/a (is the package) |
| html | `guides/html.md`:679 | yes:32 | 87 | not found | `^0.0.17` |
| indexeddb | `guides/indexeddb.md`:457 | yes:29 | 35 | not found | `^0.0.17` |
| interpret | `guides/interpret.md`:1009 | yes:40 | 86 | not found | `^0.0.17` |
| lsp | `guides/lsp.md`:461 | yes:22 | 60 | not found | `^0.0.17` |
| markdown | `guides/markdown.md`:921 | yes:60 | 88 | not found | `^0.0.17` |
| mcp | `guides/mcp.md`:5452 | yes:56 | 121 | not found | `^0.0.17` |
| middleware | `guides/middleware.md`:887 | yes:18 | 56 | not found | `^0.0.17` |
| msg | `guides/msg.md`:417 | yes:28 | 79 | not found | `^0.0.17` |
| ndjson | `guides/ndjson.md`:95 | yes:28 | 59 | not found | `^0.0.17` |
| ollama | `guides/ollama.md`:261 | yes:20 | 68 | not found | `^0.0.17` |
| pool | `guides/pool.md`:261 | yes:20 | 59 | not found | `^0.0.17` |
| probe | `guides/probe.md`:1062 | yes:18 (does not import `@orkestrel/guide`; see Health) | 81 | not found | `^0.0.17` |
| process | `guides/process.md`:1576 | yes:76 | 81 | not found | `^0.0.17` |
| program | (guide not read directly; not in own-guide sweep — see Unknowns) | yes:21 | 118 | not checked | not read (see Unknowns) |
| qualifier | `guides/qualifier.md`:826 | yes:21 | 71 | not found | `^0.0.17` |
| queue | `guides/queue.md`:342 | yes:21 | 59 | not found | `^0.0.17` |
| rater | `guides/rater.md`:294 | yes:26 | 69 | not found | `^0.0.17` |
| reason | `guides/reason.md`:1107 | yes:29 | 74 | not found | `^0.0.17` |
| relation | `guides/relation.md`:363 | yes:24 | 78 | not found | `^0.0.17` |
| router | `guides/router.md`:733 | yes:25 | 65 | not found | `^0.0.17` |
| sea | `guides/sea.md`:353 | yes:24 | 211 | not found | `^0.0.17` |
| server | `guides/server.md`:726 | yes:24 | 76 | not found | `^0.0.17` |
| sqlite | `guides/sqlite.md`:288 | yes:29 | 39 | not found | `^0.0.17` |
| sse | `guides/sse.md`:173 | yes:36 | 73 | not found | `^0.0.17` |
| table | `guides/table.md`:1537 | yes:52 | 93 | not found | not read (see Unknowns) |
| template | `guides/template.md`:259 | yes:26 | 45 | not found | `^0.0.17` |
| terminal | `guides/terminal.md`:1096 | yes:35 | 91 | not found | `^0.0.17` |
| test | `guides/test.md`:2927 | yes:46 | 220 | **found**, `src/browser/index.ts` (the only fleet-wide hit) | `^0.0.17` |
| timeout | `guides/timeout.md`:236 | yes:26 | 73 | not found | `^0.0.17` |
| tool | `guides/tool.md`:283 | yes:22 | 72 | not found | `^0.0.17` |
| toolbox | `guides/toolbox.md`:972 | yes:23 | 55 | not found | `^0.0.17` |
| websocket | `guides/websocket.md`:264 | yes:22 | 60 | not found | `^0.0.17` |
| worker | `guides/worker.md`:582 | yes:23 | 83 | not found | `^0.0.17` |
| workflow | `guides/workflow.md`:1463 | yes:28 | 49 | not found | `^0.0.17` |
| workspace | `guides/workspace.md`:564 | yes:27 | 54 | not found | `^0.0.17` |
| scaffold | `guides/scaffold.md`:1798 (this repository's own, authoritative) | yes:17 | 151 | not found | n/a (development tooling that vendors `@orkestrel/guide` as a devDependency, per `package.json`) |

## Health

**Row 3 — dependents of `@orkestrel/guide`.** Every fleet package except `table` (unread) declares `"@orkestrel/guide": "^0.0.17"` in `devDependencies` (`/home/user/fleet/<package>/package.json`, evidenced per-package in Map). A representative import check (`/home/user/fleet/contract/tests/guides.test.ts:19`) and a fleet-wide sweep for the import string across `**/tests/guides.test.ts` (46 of 48 matches) show the dependency is consumed only from `tests/guides.test.ts` — never from `src/`. The two non-matching files are `guide` itself (does not import its own package) and `probe`, whose `tests/guides.test.ts` hand-rolls an equivalent parity harness from `@src/core`/`@src/server` rather than importing `@orkestrel/guide` (`/home/user/fleet/probe/tests/guides.test.ts:1-9`). `scaffold`'s own `package.json` also carries `@orkestrel/guide` as a `devDependencies` entry, consumed the same way from `tests/guides.test.ts:1-19`.

**Row 5 — drift already visible.** The vendored `guides/scaffold.md` mirror is inconsistent across the fleet itself, not just against this repository's own copy. This repository's own `/home/user/scaffold/guides/scaffold.md` is 1798 lines (first 5 lines identical across every copy checked). Fleet checkouts split into two stale groups, both older than the 1798-line original:
- 1770 lines: `template`, `queue`, `console`, `guide`, `test`, `timeout`, `tool`, `indexeddb`, `rater`, `interpret`, `mcp`, `qualifier`, `process`, `budget`, `toolbox`, `router`.
- 1795 lines: `pool`, `csv`, `ndjson`, `contract`, `websocket`, `worker`, `workflow`, `form`, `sea`, `middleware`.

Every fleet checkout's own `guides/guide.md` mirror agrees at 553 lines and matches `/home/user/scaffold/guides/guide.md` (also 553 lines), so no drift is visible there. No package's own `guides/<name>.md` was compared against a scaffold mirror of that same package's guide, because scaffold's `guides/` directory mirrors only `guide.md` and `scaffold.md` per `host.json`'s vendored-entry list (`storage: guides/guide.md`, `storage: guides/scaffold.md`) — it does not mirror every fleet package's guide, so row 5's comparison as framed applies only to `guide` and `scaffold` themselves, and both show no drift beyond the `scaffold.md` staleness above.

## Work order

**Row 2 — rendering and parsing primitives**, named from each guide's `## Surface` section:

| Capability | Symbol | Package (layer) | Guide pointer |
|---|---|---|---|
| Parse Markdown into a tree | `parseDocument` | `@orkestrel/markdown` (L2) | `/home/user/fleet/markdown/guides/markdown.md:74` |
| Parse Markdown, keeping source spans | `parseProvenance` | `@orkestrel/markdown` (L2) | `/home/user/fleet/markdown/guides/markdown.md:75` |
| Render a tree to Markdown text | `renderMarkdown` | `@orkestrel/markdown` (L2) | `/home/user/fleet/markdown/guides/markdown.md:119` |
| Render a tree to sanitized HTML | `renderHTML` | `@orkestrel/markdown` (L2) | `/home/user/fleet/markdown/guides/markdown.md:140` |
| Stateful parse-and-hold workspace | `createMarkdown` | `@orkestrel/markdown` (L2) | `/home/user/fleet/markdown/guides/markdown.md:190` |
| Fill a template against values | `fillTemplate` (module function), `Template.fill` / `TemplateManager.fill` (instance methods) | `@orkestrel/template` (L2) | `/home/user/fleet/template/guides/template.md:104,174,214` |
| Create a template / template manager | `createTemplate`, `createTemplateManager` | `@orkestrel/template` (L2) | `/home/user/fleet/template/guides/template.md:138-139` |
| Render a table (open, narrow, order, read rows) | `createTable` | `@orkestrel/table` (L2) | `/home/user/fleet/table/guides/table.md:107` |
| Encode/decode a byte-side text codec (not Markdown-specific) | `encodeBase64`/`decodeBase64`, `encodeHex`/`decodeHex`, and the `Base64URL` pair | `@orkestrel/codec` (L0) | `/home/user/fleet/codec/guides/codec.md:68-76` |

`@orkestrel/html` (L1) underlies `@orkestrel/markdown`'s HTML side (`renderHTML`, `htmlToMarkdown`) but exposes no Markdown-facing parse or render symbol of its own in its guide's `## Surface`.

**Row 4 — blast radius**, by the catalog's `Layer` column and each manifest's declared edges:

*Development edge — a change to `@orkestrel/guide`'s check contract obliges re-pin and gates only, never republish, for every declared consumer:* every fleet package and `scaffold`, because every occurrence is a `devDependencies` edge (`table`'s edge settled under § Settled).

*Runtime edge — a change to `@orkestrel/markdown`'s or `@orkestrel/template`'s runtime surface obliges republish in layer order, per the catalog's runtime `dependencies` rows:*
- Direct runtime dependents of `@orkestrel/markdown`: `@orkestrel/guide` (L3), `@orkestrel/scaffold` (L3).
- Direct runtime dependents of `@orkestrel/template`: `@orkestrel/interpret` (L3), `@orkestrel/scaffold` (L3).
- L4 (next round, through the L3 dependents above): `@orkestrel/brief` (depends on `interpret`).
- No further-layer package in the catalog table declares a runtime `dependencies` or `peerDependencies` edge on `guide`, `interpret`, or `scaffold` themselves, so the cascade stops at L4 (`brief`) on the `template` path and at L3 (`guide`, `scaffold`) on the `markdown` path. `scaffold` itself sits outside the runtime-layer cascade: every package treats it as a development dependency, so a `scaffold` move republishes on its own account rather than propagating as a runtime cascade.

## Unknowns

- Whether `table`'s `package.json` declares `@orkestrel/guide` and at what range. (Settled below.)
- Whether `program`'s `src/core/index.ts` opens with a `@packageDocumentation` block. (Settled below.)
- Whether every fleet package's `tests/guides.test.ts` is scaffold-vendored or package-owned. `/home/user/scaffold/host.json`'s vendored-entry list names only `tests/config.test.ts`, `tests/policy.test.ts`, and `tests/setupPolicy.ts` as vendored test files — `tests/guides.test.ts` is absent from that list, so it reads as package-owned everywhere; this dispatch did not diff each package's file against a common template.
- Whether `probe`'s declared `@orkestrel/guide` devDependency is consumed anywhere outside `tests/guides.test.ts`.
- Whether a package's own `guides/<name>.md` differs from scaffold's mirror for any package other than `guide` and `scaffold`: scaffold's `guides/` directory (per `host.json`) vendors only those two guides as host paths; the other mirrors under `/home/user/scaffold/guides/` are refreshed by `scaffold catalog`, and this dispatch did not compare them.

## Settled

Settled by the Orchestrator on 2026-09-05 after the lane returned:

- `table` declares `"@orkestrel/guide": "^0.0.17"` (`/home/user/fleet/table/package.json:70`), so the development-edge set is every fleet package plus `scaffold`.
- `program`'s `src/core/index.ts` opens with `export * from './types.js'` (line 1) and carries no `@packageDocumentation` block, matching every package except `test`.
