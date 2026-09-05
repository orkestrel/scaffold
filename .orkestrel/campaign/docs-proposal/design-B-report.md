# Unit docs-design — Lens B report (planner on Opus 5)

Returned by Workflow wf_50dace1e-3ab node design:B on 2026-09-05; captured verbatim by the Orchestrator.

## Option B1 — Derived regions: marker-bounded reference tables the `guide` verb writes from TSDoc

### 1. Mechanism

**Source of truth by fact.**

| Fact | Source of truth | Reader |
|---|---|---|
| One-line summary of a public export | The TSDoc summary sentence in `src/**` (`.claude/rules/typescript.md:77-79`) | TypeScript compiler API |
| Export membership and kind | The environment barrel (`src/core/index.ts`, `src/server/index.ts`) | TypeScript compiler API |
| Method membership of an interface | The interface's call-signature members | TypeScript compiler API |
| Everything else in the guide | `guides/scaffold.md`, authored | A human, and `tests/guides.test.ts` |

The authored sections stay authored: `## Command line` (`guides/scaffold.md:475`), `## Blueprint` (`:758`), `## Compile` (`:868`), `## Ownership and drift` (`:956`), `## Fleet catalog` (`:1075`), `## Dependency floors` (`:1120`), `## Vendored data root` (`:1194`), `## Generated workspace` (`:1318`), `## Library` (`:1379`), `## Limits` (`:1522`), `## Tests` (`:1756`), `## See also` (`:1794`). The generated regions cover the `## Surface` subtables (`:45`, kind subtables from `:52`) and the `## Methods` interface tables (`:426-473`).

**Generation.** Each generated table sits between an HTML comment pair modelled exactly on the catalog precedent — `CATALOG_OPENING_MARKER = '<!-- orkestrel:catalog -->'` and `CATALOG_CLOSING_MARKER = '<!-- /orkestrel:catalog -->'` (`src/core/constants.ts:290`, `:299`), spliced into the authored `.claude/agents/orkestrel.md` by `Materializer.catalog` (`src/server/Materializer.ts:369-395`) through `#recatalog` (`:1112-1117`). B1 adds `SURFACE_OPENING_MARKER` / `SURFACE_CLOSING_MARKER` and `METHODS_OPENING_MARKER` / `METHODS_CLOSING_MARKER` to `src/core/constants.ts` beside them, each region qualified by its environment and kind in the opening marker's text.

**The verb.** `scaffold guide` writes the regions, joining `new`, `audit`, `repair`, `catalog`, and `overwrite` (`guides/scaffold.md:480-486`) as a one-word verb, implemented as `Materializer.guide` beside `catalog`, `mirror`, and `declare` (`guides/scaffold.md:445-452`). Trigger: a developer runs it after changing a barrel or a TSDoc summary; `prepack` runs it before a release so the vendored seed ships current bytes; `scaffold audit` reports a stale region as a `Finding` (`guides/scaffold.md:64`); `tests/guides.test.ts` recomputes each region and fails on any difference.

**The projection.** The guide's Surface cell and the TSDoc summary are the same fact in two voices, and `.claude/rules/documentation.md:35` fixes the difference: "The TSDoc voice rule governs a doc block; a guide tagline and a Surface-row description are noun phrases." Today those two voices already agree by one mechanical rule — drop the opening third-person verb:

| TSDoc summary | Guide Surface cell |
|---|---|
| `Names how an artifact's content is produced.` (`src/core/types.ts:10`) | `How an artifact's content is produced.` (`guides/scaffold.md:68`) |
| `Represents the mutation spine: read the vendored host, re-derive the target, stage, swap.` (`src/server/Materializer.ts:85`) | `The mutation spine: read the vendored host, re-derive the target, stage, swap.` (`guides/scaffold.md:422`) |
| `Lists the paths a target receives from the vendored data root, frozen.` (`src/core/constants.ts:112`) | `The paths a target receives from the vendored data root, frozen.` (`guides/scaffold.md:136`) |

A function's cell takes the imperative instead: `Encodes text as the exact lowercase hexadecimal form of its UTF-8 bytes.` (`src/core/helpers.ts:61`) against `Encode text as the exact lowercase hexadecimal form of its UTF-8 bytes.` (`guides/scaffold.md:221`).

B1 does not infer that transform with an English stemmer, which `AGENTS.md` § Project model forbids as a second source-language analyzer. It declares it as frozen data: `SUMMARY_VERBS` in `src/core/constants.ts` maps each sanctioned opener to its noun-phrase and imperative forms, and the compile stage raises a `Question` (`guides/scaffold.md:97`) for an unmapped opener rather than guessing. The opener set is already small and named by law: `.claude/rules/typescript.md:78-79` fixes `Creates`, `Returns`, and `Checks whether` as the form. The projection table therefore doubles as the first mechanical enforcement of that voice rule.

**Line primitives.**

| Need | Primitive | Pointer |
|---|---|---|
| Read a doc comment's text | `Symbol.getDocumentationComment`, `ts.displayPartsToString` | `node_modules/typescript/lib/typescript.d.ts:6548`, `:11426` (research distillate row 4) |
| Read `@example`, `@remarks` presence | `ts.getJSDocTags` | `typescript.d.ts:8750` (research row 4) |
| Read an existing table region | `collectTable`, `splitTableRow`, `delimiterToAlignments` | `/home/user/fleet/markdown/guides/markdown.md:98`, `:103-105`, `:116` |
| Locate a region's byte span | `parseProvenance` | `/home/user/fleet/markdown/guides/markdown.md:75` |
| Emit the table | `renderMarkdown` | `/home/user/fleet/markdown/guides/markdown.md:119` |
| Splice a marker-bounded region | The existing `#recatalog` path | `src/server/Materializer.ts:1112-1117` |

`@orkestrel/markdown` is already a runtime dependency of `@orkestrel/scaffold` (`docs-ecosystem-report.md` Work order, Row 4), and `typescript` 6.0.3 is already declared (research row 4).

**New npm dependency: none.** B1 explicitly refuses TypeDoc (`typedoc` `0.28.20` adds `lunr`, `yaml`, `minimatch`, `markdown-it`, `@gerrit0/mini-shiki`; `docs-research-web-report.md` row 3) and `@microsoft/api-documenter` (`7.30.13`, `5` dependencies, and its Markdown is "a starting point for people who want to implement their own adapter"; web report row 2b). It also refuses the api-extractor doc model, whose `docModel.enabled` key exists (`node_modules/@microsoft/api-extractor/lib-dts/api/IConfigFile.d.ts:177-181`) and is not configured here (absorb distillate §8): reading it needs a build first, which would put `npm run build:src:core` inside the documentation loop and make `scaffold audit` unusable in a clean checkout. The compiler API reads source with no build.

Reading the published rollup was considered and rejected for the same reason, though it would work: `grep -c '^\s*/\*\*' dist/src/core/index.d.ts → 202 ; '@remarks' → 129 ; '@example' → 87 ; '{@link' → 77` (`docs-orchestrator-measurements.md` § TSDoc survives the declaration rollup).

### 2. Worked example

`Origin`, a `CatalogEntry`-class type in `src/core/types.ts`. Its TSDoc is unchanged by B1 — that is the option's point:

```ts
/**
 * Names how an artifact's content is produced.
 *
 * @remarks
 * `host` is byte-copied from this package's vendored data root. `template` is
 * filled from a frozen template definition. `computed` is derived by this
 * package's own combination logic. Origin says nothing about what scaffold
 * claims at the path; {@link Ownership} says that.
 */
export type Origin = 'host' | 'template' | 'computed'
```

The guide passage `scaffold guide` produces:

```md
## Surface

### Core

Exported from `@orkestrel/scaffold`, and reachable from
[`src/core/index.ts`](../src/core/index.ts).

#### Types

<!-- orkestrel:surface core types -->

| Name                | Kind | Summary                                                                                          |
| ------------------- | ---- | ------------------------------------------------------------------------------------------------ |
| `Artifact`          | type | One file in a plan, discriminated by how its content is produced and what scaffold claims of it. |
| `Origin`            | type | How an artifact's content is produced.                                                           |
| `Ownership`         | type | What scaffold claims at an artifact's path.                                                      |

<!-- /orkestrel:surface -->
```

The guide passage B1 **keeps authored** for the same symbol, unchanged, is the `## Ownership and drift` narrative and its per-member table (`guides/scaffold.md:956-1002`):

```md
| `Origin`   | Content comes from                          |
| ---------- | ------------------------------------------- |
| `host`     | Byte-copied from the vendored data root     |
| `template` | Filled from a frozen template definition    |
| `computed` | Derived by this package's combination logic |
```

That table restates the `@remarks` block at `src/core/types.ts:13-16` as rows. B1 derives nothing from `@remarks`, because `@remarks` is free prose and a per-member table over it is a transformation no projection rule can check. This is where B1's deduplication stops, and it is the honest boundary of the option.

**Voice consequences.**

- The TSDoc block answers to `.claude/rules/typescript.md:76-88`: third-person `-s` opener that never repeats the symbol name (`:78-79`), `Default: …` and `Thrown when …` forms (`:82`), options object as one `@param` with short fields under `@remarks` (`:85`). Above that sit `AGENTS.md` § Writing and `.claude/rules/writing.md` for every sentence.
- The Surface-row description answers to `.claude/rules/documentation.md:35`, which fixes it as a noun phrase. Under B1 that cell is **derived**, and `SUMMARY_VERBS` is what makes the noun phrase true rather than a convention an author remembers.
- The `## Methods` cell is derived the same way, from the method's own TSDoc summary, into the imperative form the tables already use (`compile` → `Compile a blueprint into a plan through the draft, gate, and pin stages.`, `guides/scaffold.md:437`).
- The H1 blockquote pitch (`guides/scaffold.md:1-7`) stays **authored separately**. The absorb distillate records under Unknowns that no named law file defines "tagline" as that blockquote, so B1 derives nothing from a site no rule fixes.

### 3. Edit cost

| Change kind | Files edited before | Files edited after B1 | Check that catches a forgotten site |
|---|---|---|---|
| Rename an export | The declaring file; every call site; the `## Surface` row; every authored prose mention; `README.md` where it names the symbol; `tests/**` | The declaring file; every call site; `scaffold guide` regenerates the row; authored prose mentions | Before: SB, barrel↔guide only (`tests/guides.test.ts:99-116`). After: SB plus the region-freshness check, which fails on an unregenerated region. Neither catches a prose mention. |
| Add an options field | `src/core/types.ts`; the implementation; the TSDoc `@remarks` describing short keys; the authored guide paragraph; `tests/**` | Unchanged | Before and after: nothing. B1 generates no options table, so the option-key site stays uncovered. |
| Change a behaviour claim | The implementation; the TSDoc summary or `@remarks`; the `## Surface` cell; the authored narrative paragraph; `README.md` where duplicated | The implementation; the TSDoc summary; `scaffold guide`; the authored narrative paragraph | Before: nothing — `.claude/rules/documentation.md:37-38` states the parity test proves a name exists, never that a sentence about behaviour is true. After: the region-freshness check catches the Surface cell; the executed fence (`tests/guides.test.ts:201-245`) still carries the narrative claim. |
| Add a documented limit | `guides/scaffold.md` § Limits (`:1522`); the TSDoc `@remarks`; `README.md` where duplicated | Unchanged | Before and after: nothing. |
| Add a CLI flag | `src/bin/CLI.ts`; `guides/scaffold.md` § Command line (`:475`); `README.md` (`:42-43`); `tests/**` | Unchanged, unless the README verb region is adopted (§ 4) | Before and after: nothing. `src/bin` publishes no barrel and sits outside the surface bijection (`guides/README.md:16-17`). |

B1 removes the Surface and Methods sites, and no others. Stated against the owner's ask — "all the work we did simply updating prose, especially at more than one site" — B1 closes the mechanically derivable half and leaves the narrative half where a human still owns it.

### 4. Checks

| Check | Under B1 | Where it lives |
|---|---|---|
| **SB** surface bijection (`guides/guide.md:381-384`; scaffold runs barrel↔guide at `tests/guides.test.ts:99-116`) | **Becomes tautological** over generated rows — the generator writes them from the same barrel SB reads, so it can only fail when regeneration was skipped. Keep it: that is exactly the regeneration guard. Its direct↔barrel half, which scaffold does not run today (absorb §2), keeps full force. | Unchanged: `tests/guides.test.ts` |
| **MB** methods bijection and class-no-extra (`guides/guide.md:385-389`; `tests/guides.test.ts:119`) | Bijection half becomes tautological and is retained as the regeneration guard. Class-no-extra keeps full force: it compares the class against the interface, not against the guide. | Unchanged |
| **LI** link integrity (`guides/guide.md:390-393`; `tests/guides.test.ts:171`) | **Survives unchanged.** Generated rows carry backticked names, never links; every link stays in authored prose. | Unchanged |
| **TE** tests-link existence (`guides/guide.md:394-396`) | **Survives unchanged**, and stays unrun in scaffold — absorb §2 records scaffold's suite calling NV, FL, SB, MB, LI, and FI, with TE run by emitter. `## Tests` (`guides/scaffold.md:1756-1792`) stays authored, so adopting TE here remains available and independent of B1. | Unchanged |
| **NV** non-vacuousness (`guides/guide.md:397-398`; `tests/guides.test.ts:80`) | **Survives and gains force.** A region that regenerates empty — a barrel the compiler resolved to nothing — fails NV rather than shipping an empty table. | Unchanged |
| **FL** fence-language listing (`guides/guide.md:399-402`; `tests/guides.test.ts:92`) | **Survives unchanged.** Regions hold tables, never fences. | Unchanged |
| **EX** examples presence (`guides/guide.md:403-410`, `findUnexampled`, content never checked) | **Moves and strengthens.** Scaffold does not call it today (absorb §2). The generator already holds the compiler's view of each export, so it can require `@example` on the export's own TSDoc through `ts.getJSDocTags` (`typescript.d.ts:8750`) instead of scanning text for the name in a fence. Fleet consequence: `@orkestrel/guide`'s `Source` uses "text-only line scanners rather than the TypeScript compiler API or the filesystem" (`/home/user/fleet/guide/src/core/sources/Source.ts:24-28`), so this strengthening is scaffold-local until that package adopts a compiler-backed source. | Moves to the `scaffold guide` compile stage |
| **FI** fence-import reality (`guides/guide.md:411-415`; `tests/guides.test.ts:182`) | **Survives unchanged.** | Unchanged |
| **Executed fences** (`tests/guides.test.ts:201-245`) | **Survive unchanged**, and remain the only proof a prose claim is true, per `.claude/rules/documentation.md:37-38`. B1 adds no fence and removes none. | Unchanged |

**Checks B1 adds.**

| Added check | What it proves | Where it lives |
|---|---|---|
| Region freshness | Recomputing each region from source reproduces the file's bytes exactly. | `tests/guides.test.ts`, and `scaffold audit` as a `Finding` |
| Region containment | No authored byte sits inside a region, and no Surface or Methods table sits outside one. | The same recompute |
| Opener coverage | Every barrelled export's TSDoc summary opens with a verb `SUMMARY_VERBS` maps. | The `scaffold guide` compile stage, raised as a `Question` |
| `policy/tsdoc-voice` | The same opener rule, at lint time, on the source file. | `configs/policy.ts`, beside `no-mocking`, `no-keyword-privacy`, and `no-nested-functions` (`configs/policy.ts:337-345`; registered at `.oxlintrc.json:5-6`) |

**What can and cannot move to oxlint and oxfmt**, since the owner asked directly:

- **Can move to oxlint.** A JS plugin rule reads comment text: `getAllComments` returns `CommentType[]` carrying `value: string` (`node_modules/oxlint/dist/plugins-dev.d.ts:2697`, `:1315-1318`). So `policy/tsdoc-voice` is buildable in the plugin that already exists, and it is the cheapest of the added checks.
- **Cannot move to oxlint.** Any guide-side check. The JS plugin `Language` union is `"js" | "jsx" | "ts" | "tsx" | "dts"` (`plugins-dev.d.ts:4129`), and oxc's own documentation states custom file formats are "explicitly not supported yet" (`docs-research-web-report.md` row 5b). Markdown is unreachable.
- **Already moved to oxfmt.** Markdown formatting is not a proposal — it runs today. `npx oxfmt --config .oxfmtrc.json --check .` covered `221 files` and reported one red, `ROADMAP.md` (`docs-orchestrator-measurements.md` § oxfmt already checks Markdown in this tree). So a generated region must emit formatter-stable bytes or `npm run format:check` reports churn on every regeneration. The vocabulary for that obligation already exists: `ARTIFACT_TEMPLATES` is "Formatter-stable template text" (`guides/scaffold.md:110`).
- **Available in oxfmt, disabled.** The `jsdoc` option normalizes doc comments — "tag aliases are canonicalized, descriptions are capitalized, long lines are wrapped, and short comments are collapsed to single-line" (`docs-research-web-report.md` row 6b; default disabled per research row 6, `configuration_schema.json:75-76`). Enabling it makes the doc block formatter-stable, which is what makes a derived cell stable. B1 recommends enabling it, and names its cost: `.oxfmtrc.json` is vendored (`src/core/constants.ts:147`), so the flip rewrites every doc block in scaffold and in every target that runs `repair`.

**A second carrier for the same mechanism.** `README.md` restates the verb list (`README.md:45-100`) against the guide's command reference (`guides/scaffold.md:480-486`), with no bijection test over it (absorb §10). The same marker pair works there, so B1 can close that duplication pair with no additional machinery. Scope it as a successor unit rather than folding it into the first change.

### 5. Humans and LLMs

- **IDE hover.** Unchanged and complete. The TSDoc stays attached to its declaration, which every fetched precedent also does — Rust, Go, Python, Elixir, Deno/JSR, and Java all "keep the documentation comment attached to the declaration it describes, in the same source file" (`docs-research-web-report.md` § Distillate). It survives the published rollup (`grep -c '^\s*/\*\*' dist/src/core/index.d.ts → 202`, measurements) and plain declaration emit, which "copies the whole doc block into the emitted declaration without any flag" (`docs-orchestrator-measurements.md` § tsc declaration emit keeps TSDoc; corroborated by `removeComments` not affecting `.d.ts`, web report row 4b). A consumer hovering an installed symbol reads the same sentence the guide's Surface cell was derived from.
- **A human on GitHub.** `guides/scaffold.md` still reads as one narrative document, opening with the pitch and running through Surface, Methods, and the authored sections. The markers are HTML comments and render as nothing. The reader who wants the summary without the source still gets it, which is the value the owner named.
- **An LLM agent.** Loads `guides/scaffold.md` exactly as today. B1 adds no agent-facing file. It specifically declines `llms.txt`: that convention is an authored, curated link list for a website, not something generated from TSDoc (`docs-research-web-report.md` row 7 and its Distillate row), and this repository's agent entry point is already `AGENTS.md`, the `.claude/rules/*` files its rule map names, and `guides/README.md`. Adding a second index would create the competing instruction copy `.claude/rules/documentation.md:23` forbids.
- **Where the voice conventions live, stated once.** They already are, and B1 moves none of them: `AGENTS.md` § Writing governs prose everywhere; `.claude/rules/writing.md` adds what a developer audience decides; `AGENTS.md` § Instruction files adds what an executed file decides; `.claude/rules/typescript.md:76-88` owns the doc block; `.claude/rules/documentation.md:35` owns the Surface-row voice. B1 adds one *enforcement* site, `policy/tsdoc-voice`, and no second *statement* site. The generator's own source carries no restatement of the voice rule — `AGENTS.md` § Instruction files fixes that a rule gets one home, and a comment in `helpers.ts` repeating it would be the drifting duplicate.

### 6. Migration

**Edge classes first.** `@orkestrel/guide` is a `devDependencies` edge for every fleet package and for scaffold (`docs-ecosystem-report.md` Health row 3), so a change to its check contract obliges a re-pin and a green gate run, never a republish cascade. `@orkestrel/markdown` and `@orkestrel/template` are runtime edges (ecosystem Row 4); B1 adds no surface to either, so no cascade starts there.

**Order.**

1. **scaffold alone, one unit.** Add `SUMMARY_VERBS` and the marker constants to `src/core/constants.ts`; the projection helper to `src/core/helpers.ts`; the opener `Question` to the compile stage; `Materializer.guide` to `src/server/Materializer.ts`; the `guide` verb to `src/bin/CLI.ts`; the regions to `guides/scaffold.md`; the recompute check to `tests/guides.test.ts`.
2. **The vendored files, second.** `configs/policy.ts` is in `HOST_PATHS` (`src/core/constants.ts:143`), as is `.oxfmtrc.json` (`:147`). Adding `policy/tsdoc-voice` or enabling `oxfmt`'s `jsdoc` option therefore moves the published `dist/host` surface, which obliges a `scaffold` bump, a publish, a re-pin of `@orkestrel/scaffold` in every target, a `repair` there, and a green gate run there — the fleet-wide cost, and the reason this stage is separable from stage 1.
3. **`@orkestrel/guide`, optional and third.** It gains a region check so each package's own `tests/guides.test.ts` can prove its regions. Development edge: re-pin and gates, no cascade. Its `Source` would need a compiler-backed variant to carry the compiler-based EX; that is a separate decision this option does not require.
4. **Each fleet package adopts by running `scaffold guide` once** against its own `guides/<name>.md` and committing the result. A package that does not adopt keeps a fully authored guide, and the region check is inert where no marker exists. `tests/guides.test.ts` is package-owned — `host.json` names no destination for it (absorb §6; corroborated by `docs-ecosystem-report.md` Unknowns) — so each package adopts the check on its own schedule.

**What stays byte-identical for mirrors.** Everything. A `guides/<name>.md` mirror is fetched bytes from that package's own `main` at one path (`guides/README.md:33-37`; `Upstream.#mirror` at `src/server/Upstream.ts:427-452`, `#guideURL` at `:737-740`), and `.claude/rules/documentation.md:36` forbids rewriting one: "Refresh a mirror rather than rewriting it: a rewritten copy is a translation." A mirror carries whatever the upstream committed, regions included, and the local `mirror` verb is untouched. Because oxfmt already formats every Markdown file in this tree and each upstream runs the same formatter, a region generated formatter-stable upstream arrives formatter-stable here — the reading the Orchestrator recorded for why fetched bytes and formatted bytes agree today (`docs-orchestrator-measurements.md` § oxfmt already checks Markdown in this tree).

One byte-identity obligation is new: `guides/scaffold.md` and `guides/guide.md` are themselves `HOST_PATHS` seeds (`src/core/constants.ts:151-152`), so scaffold's own guide must be regenerated before a release or every target receives a stale seed. That belongs in `prepack` (`.claude/rules/workspace.md` § Script intent).

### 7. Risks and open questions

**Ruling.** B1 is the recommended endpoint and B2 is its first stage: ship B2's machinery, measure the projection over the real corpus, then flip the Summary column to derived. B3 loses on the mirror ground stated in its own block.

| Risk or question | Evidence that settles it |
|---|---|
| The projection set is unproven over the real corpus. The terrain block records `grep -c '^\s*/\*\*' src/core/*.ts (summed) → 215 doc blocks over 212 top-level exports; src/server 141 over 101; src/bin 73 over 69`, and nobody has run an opener tally over them. | Run the projection over every barrelled export and list the unmapped openers. |
| The first regeneration rewrites real cells, because the tree already disagrees: `Encodes text as …` (`src/core/helpers.ts:61`) against `Encode text as …` (`guides/scaffold.md:221`). | A dry-run diff of the regenerated regions against the committed `guides/scaffold.md`. |
| Sub-path ownership. `Ownership` is per-path (`src/core/types.ts:20-31`), and a marker region gives one path two owners. The precedent resolves it as verb-owned presence (`guides/scaffold.md:975-980`), but for one region in one file, not many regions in a guide. | Read `Materializer.catalog` (`src/server/Materializer.ts:369-395`) and `#recatalog` (`:1112-1117`) and rule whether the splice generalizes to several regions per file. |
| oxfmt reflows a generated table. | Generate a region, run `npx oxfmt --config .oxfmtrc.json --check guides/scaffold.md`, read the exit. |
| The verb name `guide` sits near the package name `@orkestrel/guide`. It matches the `guides` member of `Group` (`src/core/types.ts:33-40`) that it writes, and follows `catalog` and `mirror` as nouns-as-verbs. | The owner's ruling; no measurement settles a naming choice. |
| Would the api-extractor doc model be a cheaper reader than the compiler API? `docModel.enabled` exists (`IConfigFile.d.ts:177-181`) and is unconfigured here (absorb §8). | Enable it, read the emitted `.api.json`, and compare its summary text against `displayPartsToString` output on the same symbol. |

**Labelled assumptions carried from the brief's Unknowns.** Both are answered, and B1 depends on both answers holding.

- *oxfmt formats Markdown at the installed version* — **answered**, and B1 depends on it for the formatter-stable region obligation. `npx oxfmt --config .oxfmtrc.json --check guides/scaffold.md README.md .claude/rules/writing.md` returned `All matched files use the correct format.` (`docs-orchestrator-measurements.md`).
- *An oxlint JS plugin rule can read comment text* — **answered**, and B1 depends on it only for `policy/tsdoc-voice`, which is severable. `getAllComments(): CommentType[]` with `value: string` (`node_modules/oxlint/dist/plugins-dev.d.ts:2697`, `:1315-1318`). Note the stability caveat: "JS plugins are in alpha and not subject to semver" (`node_modules/oxlint/configuration_schema.json:59-60`).

### 8. Claims

1. Every barrelled export's `## Surface` cell in `guides/scaffold.md` is reproducible from that export's TSDoc first sentence by dropping or de-inflecting the opening verb alone. **Refuted by** one barrelled export whose Surface cell differs from its TSDoc first sentence anywhere past the opening word.
2. The sanctioned opener set is finite and small enough to freeze in `src/core/constants.ts`, so the projection needs no English stemmer. **Refuted by** a barrelled export whose TSDoc is correct under `.claude/rules/typescript.md:78-79` and whose opener the frozen set does not contain.
3. `scaffold guide` needs no build, because the compiler API resolves the barrel's export set and each symbol's doc comment from source. **Refuted by** an export reachable through `export *` in `src/core/index.ts` whose kind or summary the compiler API cannot resolve without an emitted declaration.
4. A region emitted formatter-stable leaves `npm run format:check` green. **Refuted by** `npx oxfmt --config .oxfmtrc.json --check guides/scaffold.md` reporting the file red after a regeneration that changed no summary text.
5. B1 needs no npm dependency. **Refuted by** a required capability — Markdown table read, region splice, doc-comment read, or export enumeration — absent from `typescript` 6.0.3, `@orkestrel/markdown`, and the existing `Materializer` splice.

---

## Option B2 — Carried regions: the generator owns the rows, the author owns every sentence

### 1. Mechanism

Identical plumbing to B1 — same marker constants, same `scaffold guide` verb, same `Materializer.guide` splice modelled on `#recatalog` (`src/server/Materializer.ts:1112-1117`), same `@orkestrel/markdown` table primitives, same compiler-API reader (`typescript.d.ts:6548`, `:8750`, `:11426`). One difference, and it is the whole option: **the generator owns row membership, row order, and the `Name` and `Kind` columns; the `Summary` cell stays authored.**

Regeneration merges rather than overwrites. `collectTable` and `splitTableRow` (`/home/user/fleet/markdown/guides/markdown.md:98`, `:103-105`) read the existing region; the generator keys each row by its backticked name, carries that row's `Summary` cell forward verbatim, drops a row whose export no longer exists, and inserts a row with an **empty** `Summary` for an export the guide does not yet cover. An empty cell fails the region check, so the author must write the sentence before the gate goes green.

No `SUMMARY_VERBS` table. No opener `Question`. No `policy/tsdoc-voice` rule. No projection at all — the generator never authors prose, and `.claude/rules/documentation.md:35` keeps its exact present meaning, with the noun phrase written by a human.

**New npm dependency: none**, for the same reasons B1 states, and with a smaller surface: B2 reads only the export set and the interface members, never the doc comment text.

### 2. Worked example

The `Origin` TSDoc is unchanged and unread by the generator:

```ts
/**
 * Names how an artifact's content is produced.
 *
 * @remarks
 * `host` is byte-copied from this package's vendored data root. `template` is
 * filled from a frozen template definition. `computed` is derived by this
 * package's own combination logic. Origin says nothing about what scaffold
 * claims at the path; {@link Ownership} says that.
 */
export type Origin = 'host' | 'template' | 'computed'
```

The guide region after a regeneration that added `Snapshot` and removed a deleted type:

```md
<!-- orkestrel:surface core types -->

| Name       | Kind | Summary                                                                    |
| ---------- | ---- | -------------------------------------------------------------------------- |
| `Origin`   | type | How an artifact's content is produced.                                     |
| `Ownership`| type | What scaffold claims at an artifact's path.                                |
| `Snapshot` | type |                                                                            |

<!-- /orkestrel:surface -->
```

The `Origin` and `Ownership` cells were carried forward byte for byte from `guides/scaffold.md:68` and `:69`. The `Snapshot` cell is empty, and the region check fails until an author writes `Exact lowercase hexadecimal target bytes keyed by artifact-relative path.` (`guides/scaffold.md:72`).

**Voice consequences.** `.claude/rules/typescript.md:77-83` governs the TSDoc; `.claude/rules/documentation.md:35` governs the Surface cell; the two remain **authored separately** and the option asserts no relation between them. That is B2's cost and its safety: the duplication pair at `src/core/types.ts:10` and `guides/scaffold.md:68` survives intact, and no projection can be wrong about it. The tagline stays authored, exactly as in B1.

### 3. Edit cost

| Change kind | Files edited before | Files edited after B2 | Check that catches a forgotten site |
|---|---|---|---|
| Rename an export | The declaring file; every call site; the `## Surface` row; authored prose mentions; `README.md`; `tests/**` | The declaring file; every call site; `scaffold guide` moves the row and carries the cell; authored prose mentions | The region check fails on an unregenerated region, and on a carried-forward cell whose name no longer resolves. |
| Add an options field | `src/core/types.ts`; the implementation; the TSDoc `@remarks`; the authored guide paragraph; `tests/**` | Unchanged | Nothing, before and after. |
| Change a behaviour claim | The implementation; the TSDoc; the `## Surface` cell; the authored narrative; `README.md` where duplicated | **Unchanged** — the TSDoc and the Surface cell are still two sites | Nothing new. The executed fence (`tests/guides.test.ts:201-245`) remains the only behaviour proof. |
| Add a documented limit | `guides/scaffold.md:1522`; the TSDoc `@remarks`; `README.md` | Unchanged | Nothing. |
| Add a CLI flag | `src/bin/CLI.ts`; `guides/scaffold.md:475`; `README.md:42-43`; `tests/**` | Unchanged | Nothing. |
| **Add an export** | The declaring file; the `## Surface` row, in the right kind subtable, in the right order | The declaring file; `scaffold guide` inserts the placed row; the author fills one cell | Before: SB (`tests/guides.test.ts:99-116`). After: SB plus the empty-cell rejection, which names the row rather than the file. |

B2 removes the row-membership and row-ordering site. It removes no prose site. Measured against the owner's stated pain, that is a partial answer, and it is why B2 reads best as B1's first stage rather than as the destination.

### 4. Checks

Every row of B1's check table holds unchanged, with these differences:

| Check | Under B2 |
|---|---|
| **SB** | Becomes tautological over row membership only, and stays the regeneration guard. Its direct↔barrel half, unrun in scaffold today, keeps full force. |
| **MB** | Same as SB. Class-no-extra unaffected. |
| **EX** | **Does not move.** B2's reader never opens a doc comment, so the compiler-backed EX B1 offers is unavailable here. EX stays where it is — presence-only, text-scanned, and uncalled in scaffold (absorb §2). |
| **LI, TE, NV, FL, FI, executed fences** | Survive unchanged, exactly as under B1. |

**Checks B2 adds.** Region freshness over membership and order; region containment; a non-empty `Summary` on every generated row. All live in `tests/guides.test.ts` and in `scaffold audit` as a `Finding`. B2 adds no lint rule and no formatter change, so it touches no vendored file and no `dist/host` byte.

### 5. Humans and LLMs

Identical to B1 for the IDE hover, the GitHub reader, and the agent: the TSDoc stays attached to its declaration and survives the rollup (`docs-orchestrator-measurements.md`), the guide renders as one narrative document, and no agent-facing file is added. The one difference: because B2 asserts no relation between the doc block and the Surface cell, a reader who compares them can still find them disagreeing, and nothing reports it. The voice conventions keep their single homes as B1 states, and B2 adds no enforcement site at all.

### 6. Migration

Stages 1 and 4 of B1's order, and neither of the others. Stage 2 disappears entirely — B2 changes no file in `HOST_PATHS` (`src/core/constants.ts:132-153`) beyond `guides/scaffold.md` itself, so it obliges no `dist/host` move, no fleet-wide `repair`, and no re-pin. Stage 3 remains optional and unchanged. Mirror behaviour is exactly as B1 states: fetched bytes, one path, refreshed rather than rewritten (`.claude/rules/documentation.md:36`; `src/server/Upstream.ts:737-740`).

This is the migration argument for B2 as the first stage: it lands the region machinery, the verb, and the check inside scaffold's own tree, with the fleet blast radius held at zero until the projection is proven.

### 7. Risks and open questions

**Ruling.** Ship B2 first. It is the shortest change that closes a real multi-site cost, it carries no voice risk, and it is a strict prefix of B1 rather than a rival to it.

| Risk or question | Evidence that settles it |
|---|---|
| B2 buys less than the owner asked for: a behaviour-claim change still edits the TSDoc and the Surface cell. | The owner's ruling on whether row membership alone justifies the verb. |
| A carried-forward cell can go stale silently — the export keeps its name, the behaviour changes, the sentence does not. This is the defect `.claude/rules/documentation.md:39` names: "prose rulings survive because nothing tries." | Whether the executed-fence set (`tests/guides.test.ts:201-245`) covers the claims the Surface cells make. |
| Sub-path ownership, exactly as B1 carries it (`src/core/types.ts:20-31` against `guides/scaffold.md:975-980`). | The same read of `Materializer.catalog` (`src/server/Materializer.ts:369-395`). |
| Row order must be deterministic or every regeneration churns. The present tables are name-ordered within kind subtables (`guides/scaffold.md:54-72`, `:104-124`). | Regenerate twice and diff. |

**Labelled assumptions.** B2 depends on the oxfmt Markdown answer (`docs-orchestrator-measurements.md` § oxfmt already checks Markdown in this tree) for formatter-stable emission. It depends on the oxlint comment-reading answer not at all, because it adds no lint rule.

### 8. Claims

1. Every `## Surface` and `## Methods` table in `guides/scaffold.md` is name-ordered within its kind subtable, so a generated order is stable across regenerations. **Refuted by** one committed table whose rows are not in name order.
2. Carrying a `Summary` cell forward by backticked name is unambiguous, because no name appears twice across the guide's kind subtables. **Refuted by** one name occupying rows in two subtables.
3. B2 changes no `HOST_PATHS` file other than `guides/scaffold.md`, so it obliges no fleet-wide `repair`. **Refuted by** the implementation requiring an edit to any path listed at `src/core/constants.ts:132-153`.
4. B2 is a strict prefix of B1: adding `SUMMARY_VERBS` later seeds the empty cell without changing the marker format, the verb, or the check. **Refuted by** a B1 requirement that changes the region's marker text or the merge algorithm.
5. B2 needs no npm dependency. **Refuted by** a required capability absent from `typescript` 6.0.3, `@orkestrel/markdown`, and the existing splice.

---

## Option B3 — Split reference: a wholly generated `guides/reference.md` beside the authored guide

### 1. Mechanism

Same reader and same verb as B1. The difference is the carrier: `scaffold guide` writes no region into an authored file. It emits `guides/reference.md` whole — the `## Surface` subtables and the `## Methods` interface tables, with summaries derived by B1's projection — and `guides/scaffold.md` keeps only its narrative sections and a link to it. `guides/README.md` gains the file in its concept and directory indexes (`guides/README.md:8-10`, `:25-29`).

**Why the shape is attractive.** `Ownership` is a per-path claim (`src/core/types.ts:20-31`), and B3 matches it exactly: `guides/reference.md` is `content`-owned, planned like any other computed artifact, and `guides/scaffold.md` is untouched by any verb. No file has two owners. `scaffold audit` compares the whole file's bytes rather than a span inside one, and `repair` restores it the way it restores every other content-owned path (`guides/scaffold.md:967-971`). No marker constants, no splice, no containment check.

**New npm dependency: none**, for B1's reasons.

### 2. Worked example

`guides/reference.md`, generated whole:

```md
# Scaffold reference

Generated from `src/core` and `src/server` by `scaffold guide`. Edit the TSDoc, not this file.

## Surface

### Core

#### Types

| Name       | Kind | Summary                                                                    |
| ---------- | ---- | -------------------------------------------------------------------------- |
| `Origin`   | type | How an artifact's content is produced.                                     |
| `Ownership`| type | What scaffold claims at an artifact's path.                                |
```

`guides/scaffold.md` keeps its narrative and replaces the tables with one sentence:

```md
## Surface

See the [Scaffold reference](reference.md) for every export of `@orkestrel/scaffold` and
`@orkestrel/scaffold/server`, its kind, and its summary.
```

**Voice consequences.** Identical to B1 — the projection derives the noun phrase and the imperative, `.claude/rules/typescript.md:77-83` governs the doc block, and the tagline stays authored. One addition: the generated file needs its own opening line, and `.claude/rules/documentation.md:35` says nothing about a generated file's tagline, so B3 must rule on that voice or leave a site no law covers.

### 3. Edit cost

| Change kind | Files edited before | Files edited after B3 | Check that catches a forgotten site |
|---|---|---|---|
| Rename an export | The declaring file; every call site; the `## Surface` row; authored prose mentions; `README.md`; `tests/**` | The declaring file; every call site; `scaffold guide` rewrites `guides/reference.md`; authored prose mentions | Content-ownership drift, reported by `scaffold audit` as a `Finding`, plus the recompute in `tests/guides.test.ts`. |
| Add an options field | As B1 | Unchanged | Nothing. |
| Change a behaviour claim | As B1 | The implementation; the TSDoc summary; `scaffold guide`; the authored narrative | The drift check catches the reference cell; nothing catches the narrative. |
| Add a documented limit | As B1 | Unchanged | Nothing. |
| Add a CLI flag | As B1 | Unchanged | Nothing. |

Identical to B1 in what it removes. The costs differ elsewhere.

### 4. Checks

| Check | Under B3 |
|---|---|
| **SB** | **Changes carrier.** `guide.surface()` currently reads one guide file; B3 splits the population across two files, so the check's `Source`/`Guide` pairing must read both or SB reports every export missing. That is a change to how `tests/guides.test.ts:99-116` composes its inputs, and a change every adopting fleet package repeats. |
| **MB** | Same carrier change (`tests/guides.test.ts:119`). |
| **LI** | **Changes.** `guides/scaffold.md` gains a relative link to `guides/reference.md`, and `guides/README.md` gains rows. Both resolve locally, so LI (`guides/guide.md:390-393`) survives and covers the added links. |
| **TE** | Survives unchanged; `## Tests` stays in the authored guide. |
| **NV** | **Changes.** `parseManifest` non-empty plus non-empty `surface()` and every `MethodGroup` (`guides/guide.md:397-398`) must now be satisfied across the split, and the authored guide alone would read vacuous. |
| **FL, FI, executed fences** | Survive unchanged. The generated file carries no fence. |
| **EX** | Moves and strengthens exactly as under B1. |

**Checks B3 adds.** Whole-file recompute in `tests/guides.test.ts`; content-ownership drift in `scaffold audit`; a rule that `guides/reference.md` is never hand-edited, which content ownership already gives — `repair` replaces a stale one (`guides/scaffold.md:969`). B3 adds no containment check, because no authored byte shares the file.

### 5. Humans and LLMs

- **IDE hover.** Identical to B1.
- **A human on GitHub.** **Degraded.** The reader who opens `guides/scaffold.md` to learn what the package exports now has to follow a link. The owner named this reader directly: guides are "important documentation that summarizes without having to go deep into the source code." A split puts the summary one hop further away.
- **An LLM agent.** **Degraded in the same direction, and more sharply.** An agent loading one guide file gets the narrative and no export list, so the split doubles the loads or halves the context. Nothing in the repository directs an agent to load both.
- **Voice conventions.** Unchanged homes, plus one open site: the generated file's own opening line, which no rule covers.

### 6. Migration

**This is where B3 loses.** The mirror mechanism carries one path per package: `#guideURL` resolves `{repositoryBase}/{ORKESTREL_SCOPE}/{bare}/refs/heads/{branch}/{nameToGuide(name)}` (`src/server/Upstream.ts:737-740`), and `Materializer.mirror` writes exactly the fetched guides (`src/server/Materializer.ts:323-366`). Every consumer's vendored `guides/<name>.md` would therefore arrive **without** its reference half, silently, for every fleet package that adopted B3. The fleet's vendored guide set is not small — `docs-ecosystem-report.md` § Map lists a guide and a `tests/guides.test.ts` file for every package — and `guides/README.md:33-37` states this repository mirrors every published package, not only its dependencies.

Closing that gap means teaching `Upstream` and `Materializer` a second guide path per package, changing `HOST_PATHS` (`src/core/constants.ts:132-153`), changing `nameToGuide`, and re-mirroring the fleet. That is a runtime-surface change to `@orkestrel/scaffold` with a full re-fetch behind it, against a marker splice that reuses the catalog path already in the class.

The order, were it taken: scaffold emits and links; `guides/README.md` gains its rows; `@orkestrel/guide` learns a two-file `Source`; `Upstream` and `Materializer` learn the second mirror path; the fleet re-mirrors. Development-edge packages re-pin and run gates; the `Upstream` change is a runtime move on `@orkestrel/scaffold`, which every package holds as a development dependency (`docs-ecosystem-report.md` Health row 3), so it propagates as files through `repair` rather than as a runtime cascade — but it propagates to every target.

### 7. Risks and open questions

**Ruling: refuse B3.** The per-path ownership fit is real and it is the option's only advantage. It is outweighed by the mirror gap, which removes the exact value the owner named — the summary a reader gets without going into the source — from every vendored copy in the fleet, and by the split-population changes it forces on SB, MB, and NV in every adopting package.

| Risk or question | Evidence that settles it |
|---|---|
| The mirror gap. | Read `#guideURL` (`src/server/Upstream.ts:737-740`) and `HOST_PATHS` (`src/core/constants.ts:132-153`) and confirm one guide path per package. |
| Split-population parity. Whether `@orkestrel/guide`'s `createSource` and `Guide` can pair one source against two guide files at all (`/home/user/fleet/guide/src/core/factories.ts:38-50`). | Read that factory and its `Guide` counterpart. |
| The generated file's tagline has no governing rule. | The owner's ruling, landed in `.claude/rules/documentation.md`. |
| Whether an agent instructed to read one guide would find the reference. | Nothing settles this by measurement; it is a design judgment, and it is why the option is refused rather than deferred. |

**Labelled assumptions.** Identical to B1: the oxfmt Markdown answer and the oxlint comment-reading answer, both recorded as answered.

### 8. Claims

1. The mirror mechanism fetches exactly one guide path per package, so a sibling reference file never reaches a consumer's vendored copy. **Refuted by** `Upstream` fetching more than the path `nameToGuide` produces (`src/server/Upstream.ts:737-740`).
2. Splitting the guide changes SB, MB, and NV in every adopting package, because each check reads one `Guide` over one file. **Refuted by** `createSource` and `Guide` already accepting a multi-file guide population (`/home/user/fleet/guide/src/core/factories.ts:38-50`).
3. B3's per-path ownership needs no marker constants and no splice, so `Materializer` gains a plain content-owned artifact rather than a second region writer. **Refuted by** the plan compiler refusing an artifact whose content the pure core face cannot produce, since a core-compiled plan cannot read source (`guides/scaffold.md:982-991`).
4. B3 degrades the single-file read the owner asked for, and no check can report that degradation. **Refuted by** an existing check that fails when a guide's narrative and its reference are separated.

DESIGN B: 3 option(s)
