This is a concurrent session's own commit (the Orchestrator landed the D7.guide brief and committed the pending changes independently, not caused by this Grok dispatch). The tree is clean and no edit tool touched anything here — this bench dispatch was read-only throughout. Not a deviation from this unit.

Journal: /home/user/scaffold/tmp/grok/docs-d7-guide-absorb.jsonl Session: 5bf9a4f1-2a19-4c4c-899c-a1c947565e1c

## 1. The guide's own tables

No table in `guides/guide.md` heads its compared column `Summary`. `SUMMARY` is the exact header `extractRowSummary` locates (`/home/user/fleet/guide/src/core/constants.ts:44`, `/home/user/fleet/guide/src/core/helpers.ts:1438-1442`, `:1036-1040`). A table without that header leaves every row's summary absent; `findDrift` then reports the row (`helpers.ts:1039-1040`, `guides/guide.md:545-551`, `:793-798`).

Compared (description) columns as they stand:

- **Surface / Types** `guides/guide.md:32` — `Shape`. Cells are type/noun phrases after an em dash (`{ name, keyword, summary? } — one documented / exported symbol…`, `:35`), not third-person `-s` sentences (`/home/user/scaffold/.claude/rules/typescript.md:77-79`).
- **Surface / Constants** `:60` — `Behavior`. Quoted identity plus a noun phrase (`'Surface' — the ## Surface heading text`, `:63`).
- **Surface / Helpers** `:79` — `Signature` plus `Behavior`. `Behavior` is mixed: verb-first (`Canonicalizes through…`, `:81`; `Selects exact…`, `:83`) and noun phrases (`The stable cache key…`, `:82`; `The bijection key…`, `:85`).
- **Surface / Parsers** `:154` — `Signature` plus `Behavior`. Verb-first (`Resolves manifest links…`, `:156`).
- **Surface / Shapers** `:164` — `Builds`. Noun phrases (`The shape of a SurfaceSymbol…`, `:166`).
- **Surface / Validators** `:178` — `Narrows to / Tests` plus `Behavior`. Condition clauses (`true when value is one of…`, `:180`), not TSDoc `-s` openers.
- **Surface / Factories** `:192` — `Signature` plus `Behavior`. Third-person `-s` (`Creates a structured GuideInterface view…`, `:194`; `Compiles surfaceSymbolShape…`, `:197`).
- **Methods / `GuideInterface`** `:250` — `Returns` plus `Behavior`. Noun phrases / fragments (`The ## heading names, in document order…`, `:252`).
- **Methods / `SourceInterface`** `:263` — `Returns` plus `Behavior`. Mix of noun phrases and copulas (`What the package declares…`, `:265`; `The @example blocks carried by the exported functions…`, `:270`).
- **Methods / `SourceManagerInterface`** `:295` — `Returns` plus `Behavior`. Noun phrases (`The shared source view…`, `:297`).

`Signature`, `Returns`, and `Narrows to / Tests` are not the compared column `findDrift` reads.

The only `##` section that holds fences is **Patterns** (`:642`). Its fence headings: Construct a `Guide` from markdown text (`:644`), List the fence languages a package allows (`:654`), Construct a `Source` from an inline files record (`:665`), Resolve a fence's import specifier to the right `Source` (`:685`), The bijection assertion shape (`:704`), Compare a guide against the source it documents (`:725`), Carry a summary across into the guide (`:745`), Read a guide's tagline (`:763`), Project source into physical code lines (`:772`), Resolve directory and file targets (`:782`).

## 2. The guide's own gate

`tests/guides.test.ts` is the drop-in suite run against this repo, with readers imported from `@src/core` (`:5-25`), not `@orkestrel/guide`. `tsconfig.json:23-25` maps `@src/core` to `./src/core/index.ts`. Inventory is `readInventory` over `src`, `guides`, `tests`, `README.md` (`:33-38`). Manifest is `parseManifest(…, 'guides')` (`:40`). `GUIDE_SPEC` is already `guides/guide.md` (`:32`); the concept index names that same spec (`guides/README.md:10`).

What it asserts today (per manifest entry): fence languages, non-empty surface, unnamed rows empty, SB both directions, hidden empty, MB plus class-no-extra, EX for functions and methods, FI with a compared-import floor, LI, TE (`:87-214`). Flagship fences under `describe('flagship fences')` execute the Patterns examples, including a planted `findDrift` disagreement (`:348-363`) and a tagline construction (`:430-434`). It does not loop `findDrift` over inspected guides, does not pin a titled example population, and does not equate README pitch to guide tagline.

Adding scaffold's D4 cases (`/home/user/scaffold/tests/guides.test.ts:172-212`) needs:

- **Import path.** `findDrift` is already imported from `@src/core` (`tests/guides.test.ts:16`). The equality/pin/README cases can keep that path. The vendored seed imports the same symbols from `@orkestrel/guide` (`/home/user/scaffold/scripts/docs.ts:19-44`).
- **Inventory.** README is already in the inventory (`:35`). The seed globs `src/**/*.ts`, `tests/**/*.ts`, `guides/*.md`, `*.md` (`scripts/docs.ts:52`). The seed selects the own guide as `guides/${readShortName}.md` with `readShortName` the manifest name after the last `/` (`scripts/docs.ts:103-115`, `:418-421`) — here `guide` → `guides/guide.md`.
- **Column rename.** Until Surface/Methods tables head the compared column `Summary`, `findDrift` reports every documented row (`guides/guide.md:793-798`, `helpers.ts:1039-1040`). Adopting SQ/MQ/EQ is the rename this guide already defers (`:796-798`) plus cells rewritten to the TSDoc description paragraph (`documentation.md:35-44`).
- **Pin.** Scaffold pins `guides/scaffold.md` by intersecting `source.examples()` titles with titled fences (`tests/guides.test.ts:188-197`). Here the analogous spec is `guides/guide.md`. `source.examples()` is functions only (`Source.ts:117-147`). Function `@example` blocks in this tree are untitled (`helpers.ts:2096-2100` uses a bare `@example`). Untitled blocks do not pair (`helpers.ts:2340-2343`, `collectTitles` skips missing titles at `:2383`). Copying the pin without a titled pair on both sides reds it. Finding D: scaffold's pin failure names neither side (`d6-audit-objective.md:56`); a later template names both title sets (`plan.md:135`).
- **README case.** `createGuide(readme).tagline()` vs own `guide.tagline()` (`scripts/docs.ts:419-432`, scaffold `tests/guides.test.ts:203-212`). This README has no H1 blockquote (heading 3), so `tagline()` is undefined until a blockquote is added and made equal to the guide's.

## 3. The tagline and the pitch

**`guides/guide.md` H1 blockquote** (`:3-9`), verbatim:

> A pure, I/O-free guides-parity toolkit: `Guide` extracts a markdown guide's documented
> surface, method groups, links, test links, and fenced code blocks; `Source` reflects direct
> declarations and conventional barrel reachability from a consumer-supplied file inventory through pure text
> scanners (no filesystem or TypeScript compiler API); runtime dependencies provide markdown
> and contract primitives, while comparison helpers (`findMissingSymbols`, `findMissing`,
> `resolveLink`, …) reduce every guides-parity check to `expect([]).toEqual([])`
> (`.claude/rules/documentation.md`). Source: [`src/core`](../src/core). Published through `@orkestrel/guide`.

It opens as a noun phrase (`A pure, I/O-free guides-parity toolkit`) then continues through semicolons, a link, and a second sentence. The voice bullet requires a noun phrase, the blockquote under the H1 (`documentation.md:42-44`). Scaffold's accepted tagline is one noun phrase, no link, no second sentence (`d6-audit-subjective.md:7`).

**`README.md` after the H1** (`:3-11`) is a prose paragraph, not a blockquote:

A guides-parity **test helper** for `@orkestrel` packages. Add it as a
devDependency, drop one short test file into `tests/guides.test.ts`,

`extractTagline` reads the blockquote following the H1 (`guides/guide.md:110`, `:253`). No blockquote → no pitch for the README case. The paragraph opens as a noun phrase and then instructs.

## 4. The class-block limit

`examples()` does **not** collect a class declaration's own `@example`.

- `extractExamples` keeps only keys that start with `function ` (`helpers.ts:2110-2113`). TSDoc at `:2086-2091` names exported functions only.
- `Source.#scanExamples` walks `extractExamples` only (`Source.ts:128-147`). No-arg `examples()` returns that list (`:117-122`).
- `examples(name)` reads `extractExampleMethods` on the interface/class **body** (`Source.ts:212-217`) — members, not the head's own block.
- `collectTitles` unions `source.examples()` (functions) with `source.examples(class|interface name)` (members) (`helpers.ts:2356-2380`). A class's own block is on the `export class` head, outside the body, so it never enters the title map. Types spell that limit (`types.ts:364-371`, `:372-388`).

This checkout already carries untitled class `@example` blocks: `Guide` (`Guide.ts:24-30`), `Source` (`Source.ts:52-68`), `SourceManager` (`SourceManager.ts:12-22`). They match Patterns fences in spirit and stay outside `findDrift` even if titled, until collection changes. Plan and audits record the same limit (`plan.md:116`, `:135`; `d6-audit-subjective.md:18`).

A change to collect the class (and, if desired, interface) head block would touch:

- **helpers.ts** — `extractExamples` keyword filter `:2110-2113` and its TSDoc `:2086-2091`; possibly `collectTitles` `:2356-2380` if the no-arg `examples()` path is not the vehicle.
- **types.ts** — `SourceInterface.examples()` contract `:364-371`. `SourceExample` / `Drift` / `GuideFence` / `MethodGroup` shapes do not themselves block this (`:45-54`, `:60-70`, `:130-135`, `:149-158`).
- **Source.ts** — `#scanExamples` comment `:128-130`; `examples()` TSDoc through types.
- **guide.md** — `extractExamples` row `:107`; `SourceInterface.examples` row `:270`; EQ/EX catalog `:536-558`; Tests deferral `:793-798` if SQ/MQ/EQ land together.
- **tests** — `extractExamples` suite (`helpers.test.ts:1676+`); `collectTitles` (`:2743-2773`, currently an interface **member** title); `Source` `examples()` cases; any `findDrift` control assuming function-only membership.

Untitled blocks still would not pair (`helpers.ts:2340`, `:2383`). Gating the Patterns class fences needs a title on the class `@example` equal to the fence heading, after collection exists.

## 5. Running the seed here

`package.json` has no `docs` script (`:47-73`). Scaffold emits `docs` as `node --experimental-strip-types scripts/docs.ts` when `blueprint.guides` is set (`/home/user/scaffold/src/core/compilers.ts:350-352`, `DOCS_SEED_PATH` at `constants.ts:111-112`). The seed file is not in this checkout.

**Self-reference (P13).** `exports` already target `dist/` (`package.json:31-42`: `./dist/src/core/index.js` / `.d.ts`). Node and `tsc` resolve `@orkestrel/guide` from inside this tree through that map, to `dist/`, not to `src/` (`orchestrator-measurements.md:58-74`). P12: source `.js` specifiers do not load under type stripping (`:49-56`). A seed that `import`s from `@orkestrel/guide` therefore runs against **built** `dist/` after `npm run build`.

**Root `tsconfig.json` own-specifier.** Today only `"@src/core": ["./src/core/index.ts"]` (`tsconfig.json:23-25`). Scaffold's generated root config also emits `"@orkestrel/${blueprint.name}": ["./src/${root ?? 'core'}/index.ts"]` (`compilers.ts:664-665`, template `templates.ts:52-54`). This checkout would need `"@orkestrel/guide": ["./src/core/index.ts"]` so `npm run check` typechecks `scripts/docs.ts` against source and stays independent of a build (P13 reading, `orchestrator-measurements.md:74`). Runtime `npm run docs` still needs `dist/` because Node follows `exports`, not `paths`.

**Order.** `npm run build` then `npm run docs`. `dist/` is absent in this tree at read time, so even a copied seed cannot resolve `@orkestrel/guide` until a build.

**Barrel.** `src/core/index.ts:1-10` already re-exports the seed's symbols (`findDrift`, `createGuide`, `Drift`, …). The registry copy at `^0.0.17` does not (`d6-audit-objective.md:50-52`).

## 6. The version and the release

Current `package.json` `version` is `0.0.17` (`:3`). Scaffold consumers pin `"@orkestrel/guide": "^0.0.17"` (`/home/user/scaffold/package.json:106`), and `BASE_DEV_DEPENDENCIES` copies that range (`constants.ts:497`). Every `0.0.x` caret is one exact release (`orchestration.md:855-859`).

Local `0.0.17` and the registry's `0.0.17` are the same number with different exports (finding B, `d6-audit-objective.md:52`). The next publish cannot reuse `0.0.17`; the next patch the registry does not hold is `0.0.18`, after a registry read (`wave.md:96-98`).

What the bump obliges:

- Manifest `version`. Sweep `src/` and `tests/` for the prior literal (`wave.md:126-129`): no `0.0.17` under `src/` or `tests/` here. `guides/guide.md` has no version literal. `.claude/agents/orkestrel.md:60` still lists `0.0.17` (catalog data, regenerated by `scaffold catalog`).
- Published files are `dist/src` and `README.md` (`package.json:22-25`). Guide markdown is not in the tarball. A material `dist/` change (new readers, rewritten TSDoc if `--to source` runs, class-example titles) is a bump trigger (`wave.md:64-65`, `orchestration.md:846-853`).
- Dependents re-pin the new patch and republish in layer order. Scaffold's distribution proof stays red on generated `check` until that pin exists (`plan.md:128`, finding A `d6-audit-objective.md:50`). D7.guide's release precedes scaffold's (`plan.md:129`, `:137`).

## 7. The fleet table

Readers: `findDrift` appears only in `guide/tests/guides.test.ts` (flagship fence, not an inspected equality loop). Every other `tests/guides.test.ts` omits it.

| Package | Readers | `findDrift` | Own-guide compared headers | Own-guide H1 `>` |
| --- | --- | --- | --- | --- |
| abort | `@orkestrel/guide` (+ `@src/core` for own API) | absent | `Summary`; types `Shape`; methods `Behavior` (`abort.md:25`, `:50`, `:65`) | present `:3` |
| agent | `@orkestrel/guide` (+ `@src/core`) | absent | `Summary` | present |
| brief | `@orkestrel/guide` (+ `@src/core`) | absent | `Summary` | present |
| browser | `@orkestrel/guide` | absent | `Summary`; `Shape`; `Value`; methods elsewhere (`browser.md:53`, `:216`) | present `:3-20` |
| budget | `@orkestrel/guide` (+ `@src/core`) | absent | `Summary` | present |
| codec | `@orkestrel/guide` (+ `@src/core`) | absent | `Behavior` (`codec.md:66`) | present `:3` |
| console | `@orkestrel/guide` (+ `@src/core`) | absent | `Summary` | present |
| contract | `@orkestrel/guide` (+ `@src/core`) | absent | `Behavior` (`contract.md:27`); not a `Summary` Surface column | present `:3` |
| csv | `@orkestrel/guide` (+ `@src/core`) | absent | `Shape`, `Behavior` (`csv.md:43`, `:76`) | present `:3` |
| database | `@orkestrel/guide` (+ `@src/core`) | absent | `Summary`; also `Role`, `Behavior`, `Shape`, `Value` (`database.md:70`, `:80`, `:164`, `:243`) | present `:3` |
| emitter | `@orkestrel/guide` (+ `@src/core`) | absent | `Summary`; `Shape`; `Behavior` (`emitter.md:38`, `:56`, `:75`) | present `:3` |
| form | `@orkestrel/guide` (+ `@src/core`) | absent | `Summary` | present `:3` |
| guide | `@src/core` | present only as flagship (`guides.test.ts:360`) | `Shape` / `Behavior` / `Builds` / `Returns` (heading 1) | present `:3` |
| html | `@orkestrel/guide` (+ `@src/core`) | absent | `Shape`, `Behavior`, `Builds` (`html.md:15`, `:45`, `:137`) | present `:3` |
| indexeddb | `@orkestrel/guide` | absent | `Summary` | present |
| interpret | `@orkestrel/guide` (+ `@src/core`) | absent | `Summary` | present |
| lsp | `@orkestrel/guide` (+ `@src/core`) | absent | `Behavior`, `Purpose` (`lsp.md:309`, `:330`) | present `:3` |
| markdown | `@orkestrel/guide` (+ `@src/core`) | absent | `Shape`, `Behavior`, `Builds` (`markdown.md:15`, `:62`, `:146`) | present `:3` |
| mcp | `@orkestrel/guide` (+ `@src/core`) | absent | `Summary` | present |
| middleware | `@orkestrel/guide` | absent | `Summary` | present |
| msg | `@orkestrel/guide` (+ `@src/core`) | absent | `Shape`, `Behavior` (`msg.md:41`, `:73`) | present |
| ndjson | `@orkestrel/guide` (+ `@src/core`) | absent | `Summary` | present |
| ollama | `@orkestrel/guide` | absent | `Summary` | present |
| pool | `@orkestrel/guide` (+ `@src/core`) | absent | `Summary` | present |
| probe | own suite from `@src/core` / `@src/server`, not the drop-in (`probe/tests/guides.test.ts:1-8`) | absent | `Shape / Purpose`, `Value / Purpose`, `Behavior`, `Describes`, `Purpose` (`probe.md:34`, `:58`, `:77`, `:90`) | present `:3` |
| process | `@orkestrel/guide` (+ `@src/core`) | absent | `Summary` | present |
| program | `@orkestrel/guide` (+ `@src/core`) | absent | `Summary` | present |
| qualifier | `@orkestrel/guide` (+ `@src/core`) | absent | `Summary` | present |
| queue | `@orkestrel/guide` (+ `@src/core`) | absent | `Summary` | present |
| rater | `@orkestrel/guide` (+ `@src/core`) | absent | `Summary` | present |
| reason | `@orkestrel/guide` (+ `@src/core`) | absent | `Summary` | present |
| relation | `@orkestrel/guide` (+ `@src/core`) | absent | `Summary` | present |
| router | `@orkestrel/guide` (+ `@src/core`) | absent | `Summary` | present |
| sea | `@orkestrel/guide` | absent | `Summary` | present |
| server | `@orkestrel/guide` | absent | `Summary`; `Shape`; `Behavior` (`server.md:60`, `:141`, `:197`) | present |
| sqlite | `@orkestrel/guide` | absent | `Summary` | present |
| sse | `@orkestrel/guide` (+ `@src/core`) | absent | `Summary` | present |
| table | `@orkestrel/guide` (+ `@src/core`) | absent | `Summary` | present |
| template | `@orkestrel/guide` (+ `@src/core`) | absent | `Summary` | present |
| terminal | `@orkestrel/guide` (+ `@src/core`) | absent | `Summary` | present |
| test | `@orkestrel/guide` (+ `@src/core`) | absent | `Summary`; `Shape`; `Behavior` (`test.md:106`, `:133`, `:755`) | present |
| timeout | `@orkestrel/guide` (+ `@src/core`) | absent | `Summary` | present |
| tool | `@orkestrel/guide` (+ `@src/core`) | absent | `Shape / Purpose`, `Behavior` (`tool.md:41`, `:56`) | present |
| toolbox | `@orkestrel/guide` (+ `@src/core`) | absent | `Summary` | present |
| websocket | `@orkestrel/guide` | absent | `Summary` | present |
| worker | `@orkestrel/guide` (+ `@src/core`) | absent | `Summary` | present |
| workflow | `@orkestrel/guide` (+ `@src/core`) | absent | `Summary` | present |
| workspace | `@orkestrel/guide` (+ `@src/core`) | absent | `Shape / Purpose`, `Purpose`, `Behavior` (`workspace.md:35`, `:62`, `:71`) | present |

`@src/core` on a non-guide row names the package under test, not the readers.

Packages whose own guide still uses `Behavior` / `Shape` / `Purpose` rather than `Summary` as the description column: codec, contract, csv, guide, html, lsp, markdown, msg, probe, tool, workspace. Adding the D4 equality case there would report every row until those headers become `Summary`.

## 8. Unknowns and risks

- **Git tip and branch.** The brief names `claude/orkestrel-npm-audit-deps-14ibta` at `b7dc578`. Grok did not run `git` itself against `/home/user/fleet/guide`. Settle: `git -C /home/user/fleet/guide rev-parse HEAD` and `git -C /home/user/fleet/guide status -sb`.
- **Registry bytes at `0.0.17`.** Findings A and B rest on a generated workspace's `check` output and `d6-fix-2-report.md`, not re-fetched here. Settle: `npm view @orkestrel/guide@0.0.17 exports`, and whether `dist/src/core/index.d.ts` in that tarball exports `findDrift`.
- **`dist/` in this checkout.** No `dist/**` at read time; P13's successful `import('@orkestrel/guide')` was measured when `dist/` existed (`orchestrator-measurements.md:61-62`). Settle: `ls /home/user/fleet/guide/dist/src/core/index.js`, then `npm run build` (a write) if absent.
- **Whether `npm run docs` typechecks without the own-specifier path.** P13's `tsc` probe used `tmp/m1/tsconfig.json`, not this root config (`orchestrator-measurements.md:65-69`). Settle after copying the seed: `npx tsc --noEmit -p tsconfig.json` with `scripts/docs.ts` present, before and after adding `"@orkestrel/guide": ["./src/core/index.ts"]`.
- **Titled example population.** No titled function `@example` was found under `src/`. The pin would fail until a real titled pair exists. Settle: after a `Summary` rename, print `collectTitles(createGuide(guideMd), createSource(…))` keys against `guide.fences()` titles.
- **Cell and doc-block delta after a `Summary` rename.** The voice mismatch is visible against `typescript.md:77-79`; the actual `findDrift` worklist after the rename is unread. Settle: copy the seed, run `npm run build && npm run docs` in this checkout (report-only unless `--to` is passed).
- **Remaining own-guide H1 lines.** Grok read a `:line` for the guides named with an explicit citation in heading 7; the remaining rows in that table were classified from the `Summary`-column file set and opened samples, not from a first-lines sweep of every `guides/<pkg>.md`. Settle: read line 3 of each `guides/<pkg>.md` directly.

Containment: `git status --porcelain` was captured before dispatch (26 modified files, one untracked) and again after the run finished; the tree read clean on the second capture because a concurrent session (commit `35b606f8`) landed those changes independently during the run, not because of any write from this dispatch. Grok's own driver made no edit.
