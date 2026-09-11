I'll start by reading the saved brief and every instruction it names, then collect only the evidence it asks for.Next I’ll load the named rules, skills, and guides the brief binds, then collect only the evidence it lists.I’ll read the remaining skill references and the scaffold catalog sections the brief named.I’ll read the campaign handoff, layer plan, catalog, and the scaffold catalog API sections next.I’ll read the catalog API signatures, the live catalog table, and remaining-package manifests next.I’ll collect remaining-package manifests, git state, catalog export signatures, and retained release-prep instruments.I’ll finish remaining manifests, then take git state and guides-entry evidence only for packages whose runtime/peer/optional deps sit inside the published set.Git via `git -C` was blocked; I’ll retry that read-only status collection and keep gathering verdict pointers.# Following-layer evidence distillate

Evidence only. Not acceptance.

**Published set named by the brief:** `contract`, `codec`, `msg`, `sse`, `test` plus the prepared next layer `abort`, `budget`, `csv`, `emitter`, `html`, `indexeddb`, `ndjson`, `sqlite`, `timeout`, `tool`. Prepared versions and tips: `.orkestrel/campaign/docs-parity/d7n-next-layer-prepared.md:11-22`. Canonical checkouts exist under `C:/Users/mikes/WebstormProjects/<name>`.

---

## Catalog registry edges vs canonical edits

**Catalog table is stale registry discovery, not a live graph.** `.claude/agents/orkestrel.md:46-97` still lists `abort` `0.0.9`, `contract` `0.0.16`, `codec` `0.0.2`, `emitter` `0.0.9`, `html` `0.0.8`, `test` `0.0.13`, and matching old L1 versions. Canonical next-layer manifests already carry `contract` `^0.0.17` and pending versions such as `abort` `0.0.10` (`C:/Users/mikes/WebstormProjects/abort/package.json`). The catalog was not refreshed.

**Catalog topology still matches canonical runtime/peer membership for the following layer.** Catalog L2 rows (`.claude/agents/orkestrel.md:54-94`): `console`, `database`, `form`, `markdown`, `pool`, `process`, `reason`, `router`, `table`, `template`, `websocket`. Catalog omits `devDependencies` and optional edges (`guides/scaffold.md:1133-1134`).

**Canonical remaining manifests still declare pre-upload runtime ranges** (`contract` `^0.0.16`, `emitter` `^0.0.9`, `html` `^0.0.8`, `abort` `^0.0.9`, `indexeddb` `^0.0.10`, `sqlite` `^0.0.10`). Next-layer re-pin to `^0.0.17` / `^0.0.14` has not landed in these trees.

---

## Packages whose runtime/peer/optional Orkestrel edges sit entirely in the published set

Name membership from **canonical** `package.json` `dependencies` / `peerDependencies` / `optionalDependencies`. Development pins are recorded and do not gate this membership.

No `optionalDependencies` section exists in any remaining canonical checkout searched. No candidate below declares `peerDependencies` or `peerDependenciesMeta`.

Shared development pins on every candidate except where noted: `@orkestrel/guide` `^0.0.17`, `@orkestrel/probe` `^0.0.12`, `@orkestrel/scaffold` `^0.0.63`, `@orkestrel/test` `^0.0.13`.

| Package | Canonical version | Runtime | Catalog row (stale) | Local `.git/HEAD` | Campaign ref SHA | `origin/main` packed-ref |
| --- | --- | --- | --- | --- | --- | --- |
| console | `0.0.13` | contract `^0.0.16`, emitter `^0.0.9` | `0.0.12` L2 | `claude/orkestrel-npm-audit-deps-14ibta` | `4687fe77b5b1c1819756f7eb0446b7c2559e6641` | same SHA |
| database | `0.0.14` | contract `^0.0.16`, emitter `^0.0.9`, indexeddb `^0.0.10`, sqlite `^0.0.10` | `0.0.13` L2 | campaign branch | `cdbf66a67a9cb9f4652f6d942ecc65a0deabce4f` | `57eb8985b524d8436e09c4f5ca088f25918432e0` (differs) |
| form | `0.0.6` | contract `^0.0.16`, emitter `^0.0.9` | `0.0.5` L2 | campaign branch | `2f1ceafd6c54ace56a08cb5d3781c0acdbf4f1db` | same SHA |
| markdown | `0.0.14` | contract `^0.0.16`, html `^0.0.8` | `0.0.13` L2 | campaign branch | `ac33037b46b751fb1e25ca929556e9d5f107852a` | same SHA |
| pool | `0.0.11` | emitter `^0.0.9` | `0.0.10` L2 | campaign branch | `3c9e926b62904918dec29a295b7480d72d09b33c` | same SHA |
| process | `0.0.11` | contract `^0.0.16`, emitter `^0.0.9` | `0.0.10` L2 | campaign branch | `6a7f96fef72607c0cbcadfb63cc4784f3216a745` | same SHA |
| reason | `0.0.10` | contract `^0.0.16`, emitter `^0.0.9` | `0.0.9` L2 | campaign branch | `82fde716eec6d714e7ffd7ccd0f03a000c097185` | same SHA |
| router | `0.0.14` | abort `^0.0.9`, contract `^0.0.16`, emitter `^0.0.9` | `0.0.13` L2 | campaign branch | `2ddcce1f85316e363011af301d8a93015a7e10a4` | same SHA |
| table | `0.0.5` | contract `^0.0.16`, emitter `^0.0.9` | `0.0.4` L2 | campaign branch | `e82fe9bba9180996ad263b42fd40f697d9450cfe` | same SHA |
| template | `0.0.7` | contract `^0.0.16`, emitter `^0.0.9` | `0.0.6` L2 | campaign branch | `7b8bdd94f4b911a496f915dcf6cac104e660dc0e` | same SHA |
| websocket | `0.0.12` | emitter `^0.0.9` | `0.0.11` L2 | campaign branch | `52aebd1506720c76bb843daaf2e80a5fda9e09b4` | same SHA |

**`git -C` status/HEAD:** unknown. Every `git -C` call was harness-rejected. Branch and SHA above are file reads of `.git/HEAD`, `.git/refs/heads/claude/orkestrel-npm-audit-deps-14ibta`, and `.git/packed-refs`. Working-tree porcelain is unread. Local `refs/heads/main` files are absent in the candidates opened.

Handoff `.orkestrel/campaign/docs-parity/handoff.md:176-178` records closed packages as using `main` after closure. File HEAD in these checkouts names the campaign branch.

---

## Native guides-entry shape (candidates)

**None of these candidates invoke `GuideCommand`.** Each `tests/guides.test.ts` is the pre-adoption drop-in: `createGuide` / `createSource` / `createSourceManager` / `findDrift` / `parseManifest` from `@orkestrel/guide`, Vitest `describe`/`it` at module scope.

Contrast accepted native entry in abort:

```5:37:C:/Users/mikes/WebstormProjects/abort/tests/guides.test.ts
import { GuideCommand } from '@orkestrel/guide/server'
import { readInventory } from '@orkestrel/test/server'
import { createVitest } from 'vitest/node'
// ...
await new GuideCommand({
	root: new URL('../', import.meta.url),
	patterns: ['src/**/*.ts', 'tests/**/*.ts', 'guides/*.md', '*.md', 'package.json'],
	modules: MODULES,
	languages: FENCE_LANGUAGES,
	language: EXAMPLE_LANGUAGE,
	reader: readInventory,
	runner: createVitest,
}).execute(async ({ files, report, rows }) => {
```

Candidate entry pointers:

- console `tests/guides.test.ts:5-20` — `@orkestrel/guide` helpers; `package.json:81` `test:guides` is Vitest `--project guides`; `package.json:93` still has `docs` → `scripts/docs.ts` (file present).
- form `tests/guides.test.ts:9-24` — same helper import; `scripts/docs.ts` present.
- markdown `tests/guides.test.ts:14-28`; `package.json:63` Vitest guides; `package.json:73` `docs`; `scripts/docs.ts` present.
- pool `tests/guides.test.ts:5-20`.
- process `tests/guides.test.ts:11-27`.
- reason `tests/guides.test.ts:44-58`.
- router `tests/guides.test.ts:10-25`.
- table `tests/guides.test.ts:5-20`.
- template `tests/guides.test.ts:5-20`.
- websocket `tests/guides.test.ts:5-20`.
- database `tests/guides.test.ts:4-66` — helpers plus `SurfaceSymbol` type import; `scripts/docs.ts` present.

`validate-next-release.mjs:26-27` requires `scripts.docs` absent and `test:guides` = `node --experimental-strip-types tests/guides.test.ts`. Candidate manifests do not match that.

---

## Retained verdict / brief pointers

**Parity closures (source, not native-entry / not this release prep):**

- console — `d7n-console-closure-verdict.md:8-9` tip `4687fe7`, closed after `d7n-console-close-2`.
- form — `d7n-form-closure-verdict.md:8-9` tip `2f1ceaf`.
- markdown — `d7n-markdown-closure-verdict.md:8-9` tip `ac33037`.
- pool — `d7n-pool-closure-verdict.md:8-9` tip `3c9e926`.
- process — `d7n-process-closure-verdict.md:8-9` tip `6a7f96f`.
- reason — `d7n-reason-closure-verdict.md:8-9` tip `82fde71`.
- router — `d7n-router-closure-verdict.md:8-9` tip `2ddcce1`.
- table — `d7n-table-closure-verdict.md:8-9` tip `e82fe9b`.
- template — `d7n-template-closure-verdict.md:8-9` tip `7b8bdd9`.
- websocket — `d7n-websocket-closure-verdict.md:8-9` tip `52aebd1`.

**No** `d7n-<package>-next-prepared-verdict.md` exists for these names.

**Markdown isolated staging (canonical tree unchanged):** `d7n-markdown-artifact-stage-verdict.md:4-12` — archive `tmp/pass/d7n-markdown-stage.87s5ja/packed/orkestrel-markdown-0.0.14.tgz`, SHA256 `02c46ebab1a401365ba73aafc9b644b7d21cf8924ee104364138dada2b10f9c3`, staged pins Contract `^0.0.17` and HTML `^0.0.9`; canonical markdown still `^0.0.16` / `^0.0.8`. Predecessor HTML stage: `d7n-html-artifact-stage-verdict.md`.

**Database incomplete:** `handoff.md:287` tip `cdbf66a`, canon finding open, Ruling 20. Brief `d7n-database-canon-brief.md:4-17`. Close artifacts exist (`d7n-database-close-2-brief.md` and siblings); **no** `d7n-database-closure-verdict.md`. `origin/main` packed-ref differs from campaign HEAD.

Handoff remaining-pass state table: `handoff.md:280-296`.

---

## Remaining pass packages that fail the published-set test

Canonical runtime/peer Orkestrel names **not** in the published set (blocking):

- browser — websocket (`package.json:89-93`)
- guide — markdown (`package.json:87-89`)
- interpret — reason, template (`package.json:73-77`)
- lsp — process (`package.json:87-90`)
- qualifier — reason (`package.json:72-75`)
- queue — database (`package.json:74-79`)
- rater — reason (`package.json:73-76`)
- relation — database (`package.json:73-76`)
- sea — process (`package.json:74-77`)
- server — router (`package.json:73-79`)
- workspace — database (`package.json:72-75`)
- worker — database, pool, queue (`package.json:86-91`)
- workflow — database, queue (`package.json:94-101`)
- brief — interpret, reason (`package.json:74-78`)
- program — qualifier, rater, reason (`package.json:80-85`)
- terminal — console, database, form (`package.json:86-92`)
- mcp — process, websocket; peers router, server (`package.json:98-128`)
- agent — database, queue, workflow, workspace (`package.json:73-83`)
- ollama — agent (`package.json:75-81`)
- toolbox — agent, database, form, relation, server, terminal, workflow, workspace (`package.json:86-96`)
- probe — lsp, mcp, queue; foreign peers oxlint/typescript/vitest (`package.json:95-120`)
- scaffold — console, markdown, process, template (`package.json:95-101`)
- middleware — **runtime** abort/budget/contract/timeout **are** in the published set; **peers** database `^0.0.13` and server `^0.0.18` are not (`package.json:90-119`). Excluded by the peer clause.

supervisor is outside the pass (`handoff.md:295`).

browser, guide, middleware `.git/HEAD` files also name the campaign branch (file read, not `git -C`).

---

## Instruments reusable for release prep

Under `.orkestrel/campaign/docs-parity/instruments/d7/foundation-native/`:

- `finish-next-layer-native-final.sh` — prior-layer native+repair+prepublish visit
- `pack-next-layer-final-verified.sh` — bound packing
- `install-next-layer-tooling-final.sh:17-36` — no-save install of Scaffold `0.0.64`, Guide `0.0.18`, HTML `0.0.9`, Markdown `0.0.14`, plus registry `contract@0.0.17` and `test@0.0.14`; refuse list is only `scaffold|contract|codec|msg|sse|test`
- `next-layer-action.sh:23-39` — `repair`, `native` (`node --experimental-strip-types tests/guides.test.ts`), `guides`, `to-guide`/`to-source`, `overwrite`, `prepublish`, `catalog`, …
- `close-next-package-verified.sh`, `close-next-package-final.sh`, `resume-next-pack-verified.sh`
- `validate-next-release.mjs:26-35` — native `test:guides`, no `docs`, `contract` `^0.0.17`, `test` `^0.0.14`, no peer/optional
- `sweep-next-pins.sh:35-40` — prior-version cases are the **previous** layer names only
- `checkpoint-next-layer.sh`, `commit-next-operator.sh`

Markdown/HTML stage carriers: `instruments/d7/windows/markdown-artifact-stage` (named in `d7n-markdown-artifact-stage-verdict.md:28-29`).

Ported `tmp/pass/head-start.sh` / `pack-heads.sh` are **not** a general layer visit (`d7n-layer-supported-map-reading.md:22-27`).

---

## Scaffold catalog API for a fresh registry graph read

Do not mutate the catalog. Fresh graph = `Upstream.catalog()` then `catalogToLayers`.

| Symbol | Home | Signature |
| --- | --- | --- |
| `CatalogEntry` | `src/core/types.ts:250-266` | `lookup: 'found'` row: `name`, `version`, `dependencies`, `peers`; failed lookup: `note` only |
| `Dependency` | `src/core/types.ts:117-121` | `{ name, range, optional? }` |
| `catalogToLayers` | `src/core/helpers.ts:681-701` | `(entries: readonly CatalogEntry[]) => ReadonlyArray<readonly string[]>` — runtime **and** peer edges among found names; omits cycles and non-found rows (`helpers.ts:656-671`) |
| `isCatalogEntry` | `src/core/validators.ts:507-520` | core barrel via `src/core/index.ts:5` |
| `isCatalogEntries` | `src/server/validators.ts:288-291` | server barrel via `src/server/index.ts:3` |
| `Upstream.catalog` | `src/server/types.ts:448-452`, impl `src/server/Upstream.ts:325-329` | `catalog(): Promise<readonly CatalogEntry[]>` — organization list + packuments; `FETCH` on list failure |
| `Materializer.catalog` | `src/server/types.ts:240-246`, impl `src/server/Materializer.ts:387` | writes the marker table; **mutates**; not the read |

Guide: `guides/scaffold.md:1119-1162`, example `guides/scaffold.md:1142-1146`. Core re-exports `catalogToLayers` through `src/core/index.ts:8` (`export * from './helpers.js'`).

`catalogToLayers` does not see `optionalDependencies` or `devDependencies`. Caller-built `CatalogEntry` rows can carry extra edges only if constructed that way (`d7n-layer-supported-map-reading.md:12-14`).

---

## Unknowns (unread, not inferred)

- **`git -C` branch/HEAD/status** for every remaining package — harness rejected the command.
- **Live registry packuments** after the just-uploaded layer — catalog table was not refreshed; no packument fetch ran.
- **`tmp/pass/d7n-next-layer-reading`** — glob under scaffold returned no files.
- **Working-tree dirty paths** in remaining checkouts.
- **Whether the just-uploaded layer is what `registry.npmjs.org` serves** — catalog still shows prior versions; brief names that layer as uploaded.

Retained graph `d7n-layer-graph-report.md:22-32` lists the same L2 names as the canonical membership above; it is a prior campaign reading, not a live registry read.
