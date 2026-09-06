I'll read the brief and the orchestration files it depends on before answering.The brief is a read-only absorption pass. I'll locate the named sections, then read the files they point at.PROPOSAL.md is in. Next I’ll read the `@orkestrel/guide` surface and the parity/tooling files the brief names.**Question:** What terrain does a design round need so a package’s guide and its TSDoc can enforce each other as equals — neither the source, a gate red while they disagree, tables and examples carrying the comparison, the projection in `@orkestrel/guide`, `vite` never on a runtime edge?

**Evidence**

### A. Proposal (`PROPOSAL.md`)

**Summary (`PROPOSAL.md:18-53`).** Order stated there: Option 3 first, then Option 1 in stages, then re-measure the multi-site edit rate before ruling on Option 2. Option 3 removes no edit site and turns silent voice/summary drift into a red gate. Option 1 keeps authored narrative and renders marker-bounded reference tables from TSDoc. Option 2 moves narrative into `@remarks` and fences into `@example`. Constraints named there: no added npm package; no second source-language analyzer; `typescript` `6.0.3` stays development-edge; mirrors stay fetched bytes; executed fences at `tests/guides.test.ts:212-361` survive; Methods under `## Methods`, one table per interface, readonly data properties in Surface.

**Edit-site inventory (`PROPOSAL.md:68-119`).** Duplicated facts: `Materializer` summary (`src/server/Materializer.ts:85-86` vs `guides/scaffold.md:422`); `Origin` summary (`src/core/types.ts:9-10` vs `guides/scaffold.md:68`); `HOST_PATHS` summary; `Origin` members (`src/core/types.ts:13-16` vs `guides/scaffold.md:961-965`); `Compiler` `@example` (`src/core/Compiler.ts:74-77`) vs Compile fence (`guides/scaffold.md:878-886`). Drift classes named there: voice (`src/core/helpers.ts:61` “Encodes…” vs `guides/scaffold.md:221` “Encode…”; `src/core/factories.ts:8` “Constructs…” vs `guides/scaffold.md:281` “Construct…”); substance (`src/core/types.ts:27-29` `birth` vs `guides/scaffold.md:999-1002`); example (`Compiler.ts:78` `plan?.hash?.length` vs guide `plan?.artifacts` / `stages`). `README.md` restates the guide with no check; one named disagreement is `npx scaffold new router --src core,server` (`README.md:48`) vs `scaffold <verb> [options]` (`guides/scaffold.md:518-530`).

**Multi-site edit cost (`PROPOSAL.md:121-180`).** Commit set from `git log --since=2026-08-20` over `src` `guides` `tests` `README.md`, filtered to commits spanning `src/**`, `guides/scaffold.md`, and `tests/**`. Lens O: dominated by prose corrections, not symbol renames. Option 1 closes the derivable-table half and leaves narrative authored.

**Current checks and misses (`PROPOSAL.md:182-239`).** Run here: NV/FL (`tests/guides.test.ts:80-97`); SB barrel→guide (`:99-107`) and guide→barrel (`:109-117`); MB plus class-no-extra (`:119-151`); LI (`:171-180`); FI (`:182-197`); usage alignment (`:201-210`); executed fences (`:212-361`); pinned removals (`:153-169`); TE non-vacuity inside NV (`:89`). Missed or unrun: EX/`findUnexampled` (declared, not imported in scaffold; emitter runs it); SB direct↔barrel (`source.hidden()` / `source.exports()` unused here); EX content never checked (`guides/guide.md:409`); TSDoc text unread; `.oxfmtrc.json` has no `jsdoc` key; `README.md` has no bijection partner. Gates are strong on symbol identity, near-absent on sentence truth.

**Constraints (`PROPOSAL.md:282-377`).** C1 no added package (transitive `@microsoft/tsdoc` / `api-extractor-model` are a manifest change). C2 oxfmt formats Markdown, cannot carry a prose rule. C3 oxlint JS plugin cannot read Markdown; can read comment text via `getAllComments`. C4 JS plugin surface is alpha. C5 TSDoc already ships in the rollup; doc model is `enabled: false`. C6 mirrors are fetched bytes. C7 `@orkestrel/guide` is development-only. C8 a runtime-primitive change republishes. C9 TSDoc first sentence is third-person `-s`; Surface-row description is a noun phrase — a copy is a specified transform. C10 guide structure is a checked contract. C11 executed fences survive. C12 no second analyzer; `Source` is text-only; `vite`’s `parseSync` is the control, not a shipped import. C13 reuse `renderMarkdown` / `parseProvenance` / `fillTemplate`. C14 catalog markers exist; none in `guides/scaffold.md`. C15 `src/bin` sits outside the bijection while carrying doc blocks.

**Option 1 (`PROPOSAL.md:379-702`) — TSDoc is the write-source for tables.** Mechanism: authored guide; marker-bounded regions modelled on `CATALOG_OPENING_MARKER` / `CATALOG_CLOSING_MARKER` (`src/core/constants.ts:290-299`). Surface-row and Methods-row summaries come from the TSDoc first sentence via an extension of `Source.examples()` / `extractExampleLines` (`Source.ts:115-120`, `helpers.ts:1398`, `:1492`). Export membership from barrels. README head regions from named guide passages (guide is source for README). Narrative and H1 tagline stay authored. Render proposed as a `render` direction in `@orkestrel/guide` (no such export today), invoked by `npm run docs` and region-currency in `tests/guides.test.ts`. `parseSync` stays the control; importing it from `src/server` would put `vite` on scaffold’s runtime edge. Frozen `SUMMARY_VERBS` refused. Stages: Surface markers, then Methods, then README-head regions. Rule amendment: `.claude/rules/documentation.md:35` so a Surface/Methods summary is the TSDoc first sentence with `{@link X}` as `` `X` ``; noun-phrase scoped to the H1 tagline. Checks: SB/MB bijection halves become tautological and are replaced by region currency; class-no-extra, LI, executed fences stay. Does not close `birth` or `Compiler` example drift.

**To make Option 1 symmetric:** generation still writes the guide from TSDoc. Equality as a gate (Option 3’s pairing) over the rendered row is the check that the projection matches; it does not make the guide a write-source. A symmetric write path would regenerate TSDoc from the guide, which this option does not specify.

**Option 2 (`PROPOSAL.md:704-963`) — TSDoc is the single source; the guide is a projection.** Tagline from `@packageDocumentation`; Surface/Methods summaries from first sentences; concept chapters from `@remarks`; every fence from `@example`; cross-refs from `{@link}` / `@see`; Tests from `tests/**`. Whole-file byte equality. Scanner path: delta none. Parser path: `parseSync` from `vite` on a shipped verb moves `vite` onto the runtime edge. Narrative ownership: every documentary sentence moves onto the owning symbol; authored prose is deleted. Central claim unproven: H2s such as Command line, Blueprint, Compile, Ownership, Fleet catalog, Limits have no owning symbol yet. Closes `birth` and `Compiler` example by collapsing sites. Executed fences still need a transcription that reads `@example`.

**To make Option 2 symmetric:** keeping an authored second site would undo “guide generated whole.” Byte equality of a TSDoc→guide render is still one-way.

**Option 3 (`PROPOSAL.md:965-1196`) — neither side generates the other.** `policy/tsdoc-voice` and `policy/prose` on `configs/policy.ts` via `getAllComments` / `CommentType.value` / `context.report`. Markdown term sweep in `tests/setupPolicy.ts` (plugin cannot read Markdown). Summary-equality pairing: each TSDoc first sentence equals its Surface row under the amended `{@link}`→backtick rule. oxfmt `jsdoc` flip only after a measured diff. Removes no edit site. Under Option 1/2 the same pairing is the proof the generator’s output matches its source.

**This is the mechanism that already treats the sides as equals** once the row form is the same sentence. Voice still splits until the documentation-rule amendment: TSDoc `-s` vs guide noun phrase (`documentation.md:35`, `typescript.md:78-79`).

**Refused (`PROPOSAL.md:1247-1259`).** TypeDoc + `typedoc-plugin-markdown`; `@microsoft/api-documenter`; api-extractor doc model as reader (`configs/helpers.ts:704`); split `guides/reference.md`; frozen `SUMMARY_VERBS`; authored `llms.txt`; Vale / textlint / markdownlint.

**Probes (`PROPOSAL.md:1261-1279`).** Scanner miss rate vs parser comment reader on `types.ts`, `helpers.ts`, `Materializer.ts`, `CLI.ts`. First Surface regeneration diff vs committed guide. `oxfmt --check` after regeneration. `oxfmt --write` with `jsdoc: true` over a copy of `src/core/`. Throwaway oxlint rule reporting on a comment.

### B. `@orkestrel/guide` at `/home/user/fleet/guide`

**No `src/server/**`.** Barrel is `src/core/index.ts:1-10` (`export *` of types, constants, helpers, parsers, shapers, validators, `Guide`, `Source`, `SourceManager`, factories).

**Public types (`src/core/types.ts`):** `ExportKeyword` (`:10`); `SurfaceSymbol` (`:15`, `{ name, keyword }`); `GuideModule` (`:29`); `SourceLine` (`:37`, `{ source, code, jsdoc }`); `ManifestEntry` (`:50`); `MethodGroup` (`:65`); `FenceImport` (`:76`); `GuideFence` (`:84`); `GuideInterface` (`:95`); `SourceInterface` (`:155`); `SourceOptions` (`:307`); `SourceManagerOptions` (`:321`); `SourceManagerInterface` (`:332`); `DeclarationHead` (`:365`); `Declaration` (`:378`); `DeclarationKeyword` (`:390`).

**`GuideInterface` methods (`types.ts:95-148`, implemented `Guide.ts:52-74`):** `sections`, `surface`, `methods`, `links`, `tests`, `fences`.

**`SourceInterface` methods (`types.ts:155-297`, implemented `Source.ts:83-124`):** `exports`, `surface`, `methods`, `exists`, `hidden`, `examples` (overload: file-level function names, or members of a named declaration).

**`SourceManagerInterface` (`types.ts:332-357`, `SourceManager.ts:34-48`):** `source`, `sources`.

**Factories (`factories.ts`):** `createGuide` (`:34`); `createSource` (`:56`); `createSourceManager` (`:78`); `createSurfaceSymbolContract` (`:97`); `createMethodGroupContract` (`:116`); `createManifestEntryContract` (`:135`).

**Constants (`constants.ts`):** `EXPORT_KEYWORDS` (`:12`); `SURFACE` (`:23`); `METHODS` (`:28`); `TESTS` (`:33`); `MANIFEST` (`:38`); `EXTERNAL_SCHEMES` (`:45`).

**Parsers:** `parseManifest` (`parsers.ts:30`).

**Shapers:** `surfaceSymbolShape` (`shapers.ts:22`); `methodGroupShape` (`:40`); `manifestEntryShape` (`:58`).

**Validators:** `isExportKeyword` (`validators.ts:25`); `isSurfaceSymbol` (`:40`); `isMethodGroup` (`:58`); `isManifestEntry` (`:77`).

**How a guide is parsed.** `Guide` constructor (`Guide.ts:38-49`) runs `createMarkdown(source).document` from `@orkestrel/markdown`. H2 names via `isHeadingNode` + `heading.level === 2` (`:41-44`). H1 tagline is not extracted. `extractSurface` (`helpers.ts:1253-1294`) scopes `## Surface`: table column 0 code span + `Kind` column via `findKindIndex` (`:953-964`); H3 backticked heading keyword-fixed to `'class'`. Summary/Shape/Role/Behavior cells are unread. `extractMethods` (`:1310-1334`): H4 first code span is the interface; next table’s column 0 code spans are method names. Fences: `extractFences` (`:1551-1556`), language + verbatim body, no language filter.

**`Guide.surface()` returns** `readonly SurfaceSymbol[]` — `{ name, keyword }` only (`Guide.ts:56-57`, `types.ts:15-20`). No summary field.

**How `Source` scans TypeScript.** Text-only; refuses compiler API and filesystem (`Source.ts:24-28`, `guides/guide.md:175-177`). `extractSourceLines` (`helpers.ts:56`) is the character engine: `code` masks comments/templates; `jsdoc` keeps genuine `/**` spans at physical columns. `extractExports` / `extractHidden`: column-zero `export (async )?(function*?|class|const|interface|type) Name` over `code` (`types.ts:157-167`, `guide.md:309-314`). Barrel `surface()`: `export * from './target.js'` rows only (`Source.ts:178-202`). **`@example` chain:** `extractExampleLines` (`helpers.ts:1398-1473`) — leading whitespace-separated JSDoc chain, last span authoritative, exact block-position `@example` with optional title; intervening source severs. `extractExamples` (`:1492`) matches `^export (?:async )?function\*? (\w+)` on the next `code` line. `extractExampleMethods` (`:1523`) matches callable members. Presence of the tag, not fence body, not first sentence. **No first-sentence reader** in `src/core` (search over `/home/user/fleet/guide` for `firstSentence` / `extractSummary` is empty).

**Bijection shape (`guides/guide.md:497-515`, catalog `:381-384`):** `findMissingSymbols` on `computeSymbolKey` (`${keyword} ${name}`, `helpers.ts:665`) in the directions direct↔barrel and barrel↔guide. Guard: `guide.surface().length > 0`.

**Check catalog directions (`guides/guide.md:376-415`):** SB (those four directions); MB (methods vs `source.methods`, plus `XInterface → X` class-no-extra); LI; TE; NV; FL; EX (fence word-boundary **or** `@example`, presence-only, content never checked, `:403-409`); FI (brace imports vs `source.surface()` names).

**Explicit refusal of the compiler API:** `Source.ts:24-28`; `guides/guide.md:5-8`, `:175-177`, `:281-297`. Reason stated there: keep the package I/O-free and environment-agnostic; reflection is a bounded lexical grammar over a consumer-supplied inventory, not TypeScript resolution.

### C. Guide table conventions

**H1 tagline** is a blockquote after `#` (scaffold `guides/scaffold.md:3-7`; guide `guides/guide.md:3-9`; database `:3-28`; abort `:3-5`). Not a `Guide` projection.

**scaffold Surface:** `| Name | Kind | Summary |`. Sample: `` | `createBlueprint` | function | Construct a `Blueprint` from a name and the fields that differ from the defaults. | `` (`guides/scaffold.md:280`). **scaffold Methods:** `| Method | Summary |` (no Returns). Sample: `` | `compile` | Compile a blueprint into a plan through the draft, gate, and pin stages. | `` (`:436`). `WriteTransaction` uses the same Method/Summary form (`:465`).

**guide Surface Types:** `| Name | Kind | Shape |`. Sample: `` | `SurfaceSymbol` | interface | `{ name, keyword }` — one documented / exported symbol. | `` (`guides/guide.md:35`). Helpers: `| Name | Kind | Signature | Behavior |`. Methods: `| Method | Returns | Behavior |`. Sample: `` | `surface` | `readonly SurfaceSymbol[]` | Every `## Surface` identifier + keyword — table rows union backticked entity headings. | `` (`:203`).

**database Surface:** header names vary — `| API | Kind | Summary |` (Factories `:70-72`); `| Class | Kind | Role |` (Entities `:80-82`); `| Type | Kind | Shape |` (Types `:243-245`); `| Constant | Kind | Value |` (`:233-235`). Sample: `` | `createDatabase` | function | Create a `DatabaseInterface` over a driver and a `tables` shape map. | `` (`:72`). Methods: `| Method | Returns | Behavior |`. Sample: `` | `read` | `Promise<Row \| undefined>` | Read one row by key inside the transaction. | `` (`:303`).

**abort Surface:** `| API | Kind | Summary |` (Factories `:25-27`); Types `| Type | Kind | Shape |` (`:50-52`). Sample: `` | `createAbort` | function | Create an `AbortInterface`, optionally with a trace `id` and a parent `signal`. | `` (`:27`). Methods: `| Method | Returns | Behavior |`. Sample: `` | `abort` | `void` | Cancel — abort the controller, flip `aborted`, and fire `signal` … | `` (`:67`).

**Example naming.** Guide fences use info-string languages. Scaffold lists `sh`, `text`, `ts` (`tests/guides.test.ts:46-47`); database lists `ts` only (`database/tests/guides.test.ts:69-71`). EX presence (`guides/guide.md:403-409`): bare name in a fence body of the example language, **or** a leading JSDoc chain ending in `@example`. Content unchecked.

**scaffold `tests/guides.test.ts` today:** NV/FL (`:80-97`); SB barrel→guide and guide→barrel (`:99-117`); MB + class-no-extra (`:119-151`); pinned removals (`:153-169`); LI (`:171-180`); FI (`:182-197`). Does not import `findUnexampled`, `hidden()`, or `exports()`. Executed: usage vs `renderUsage()` (`:201-210`); blueprint defaults (`:212-221`, transcribes `guides/scaffold.md:762-773`); compile refusal (`:223-234`, transcribes `:901-908`); error-code narrowing (`:236-245`); presence `toContain` (`:249`, `:304-306`); classifier drive (`:302-377`). Compile fence at `:878-886` is not transcribed.

**database `tests/guides.test.ts`:** FL (`:603-605`); NV surface (`:607-609`); SB entry-compiler-surface↔guide (`:611-616`); SB direct→barrel minus `INTERNAL` plus internal-list currency (`:618-625`); `hidden()` empty (`:627-629`); MB both directions + class-no-extra (`:631-649`); EX via `findUnexampled` on Surface functions (`:652-661`) and on methods (`:677-690`); `checkGuideFences` typecheck (`:664-675`); FI via `SourceManager` (`:694-699`).

### D. TSDoc conventions

**Rules.** `.claude/rules/typescript.md:74-88`: complete TSDoc; first sentence third person `-s`, never repeats the symbol name; boolean param/return wording; `@param` / `@returns`; options as one `@param`, short fields under `@remarks`. `.claude/rules/documentation.md:29-47`: every backticked API is a real export; every public export is documented; “The TSDoc voice rule governs a doc block; a guide tagline and a Surface-row description are noun phrases” (`:35`); parity proves a name exists, never that a sentence is true; execute flagship fences.

**Quoted blocks.**

`src/core/types.ts:9-18`:

```ts
/**
 * Names how an artifact's content is produced.
 *
 * @remarks
 * `host` is byte-copied … {@link Ownership} says that.
 */
export type Origin = 'host' | 'template' | 'computed'
```

`src/core/helpers.ts:60-78`:

```ts
/**
 * Encodes text as the exact lowercase hexadecimal form of its UTF-8 bytes.
 *
 * @param content - The text to encode.
 * @returns The hexadecimal form of the text's exact UTF-8 bytes.
 * …
 * @example
 * ```ts
 * import { contentToHex } from '@orkestrel/scaffold'
 * contentToHex('hi\n') // '68690a'
 * ```
 */
```

**Same-code check, `createBlueprint`.** TSDoc `@example` (`src/core/factories.ts:36-42`) is `createBlueprint('router', { src: ['core'] }).version` and `createBlueprint('Router').name`. Guide Blueprint fence (`guides/scaffold.md:762-773`) is a different body: `createBlueprint('router', { src: ['core', 'server'], dependencies: […], bin: true })` then `.version` / `.engines`. **Not the same code.** Surface row (`:280`) also differs in voice (“Construct” vs “Constructs”) and `{@link Blueprint}` vs `` `Blueprint` ``. `Materializer` `@example` (`src/server/Materializer.ts:117-127`) vs guide Library fence (`guides/scaffold.md:1415-1426`): same import/`declare const plan`/`new Materializer`/`destroy`; guide adds `const result =` and `result.written`. **Not byte-identical.** `Compiler` `@example` (`src/core/Compiler.ts:72-80`) vs Compile fence (`guides/scaffold.md:877-886`): **diverged**, as the proposal records.

### E. Tooling seams

**oxlint plugin comments.** Installed `plugins-dev.d.ts`: `CommentType` `{ type: "Line"|"Block"|"Shebang"; value: string }` plus `Span` (`:1315-1318`); oxlint’s own `Program` includes `comments: CommentType[]` (`:1321-1328`); `getAllComments()` (`:2697`); `getCommentsBefore` (`:2715`); `getJSDocComment` `@deprecated` (`:2749-2756`); `context.report` (`:3835`); `Language` is `"js"|"jsx"|"ts"|"tsx"|"dts"` (`:4129`). Campaign record (`ts6-api/plan.md` Decision 3 `:44-48`; Re-baseline `:161`): CLI context gives `context.filename` (absolute), `sourceCode.text`, `getAllComments()`, `getCommentsBefore(node)`; `getJSDocComment` throws. **This checkout’s `PolicyContext` (`configs/policy.ts:49-54`) is `{ filename, cwd, report }` only** — no `sourceCode`, no comment getters. Plugin rules (`:1005-1021`) are placement/mocking/privacy/nested/endings; no TSDoc-voice rule.

**oxfmt `jsdoc`.** `.oxfmtrc.json` has no `jsdoc` key (file is endOfLine/semi/singleQuote/trailingComma/printWidth/tabs plus JSON overrides). Proposal states the option defaults to disabled.

**`parseSync`.** `tests/setupServer.ts:18` imports `parseSync` from `vite`; `readStatements` (`:888-889`) calls `parseSync(name, source)` and walks `parsed.program.body` / `parsed.errors`. Vite re-exports rolldown `parseSync` → `ParseResult`. **`Program` in `node_modules/@oxc-project/types/types.d.ts:4-10` has no `comments` member** (`type`, `body`, `sourceType`, `hashbang`, `parent` only). Comments sit on **`ParseResult.comments`**: `rolldown/dist/shared/binding-Og__jmUi.d.mts:261-266` (`Comment`: `type: 'Line'|'Block'`, `value`, `start`, `end`) and `:280-284` (`get program()`, `get comments(): Array<Comment>`, `get errors()`). `parseSync` signature: `transform-DR4CXeQm.d.mts:63`.

---

**Distillate**

The owner’s equals-enforcement ruling collides with Option 1/2’s source-of-truth tables and matches Option 3’s summary-equality pairing, once `.claude/rules/documentation.md:35` makes a Surface/Methods cell the TSDoc first sentence with `{@link X}` as `` `X` ``. Today the sides cannot be equal as written: TSDoc is third-person `-s`, Surface rows are (required to be) noun phrases, and `Guide.surface()` / `extractSurface` never read the summary cell.

Nearest seams for a design that keeps the projection in `@orkestrel/guide` and `vite` off the runtime edge:

- Guide tables: `extractSurface` / `extractMethods` / `findKindIndex` — names and keywords only.
- TSDoc text: `SourceLine.jsdoc` plus the `@example` chain (`extractExampleLines` → `extractExamples` / `extractExampleMethods`). No first-sentence split. Extend that chain, do not add a compiler.
- Example pairing: EX is presence-only (`guides/guide.md:403-409`). Content equality of `@example` vs guide fence does not exist; scaffold’s `createBlueprint` and `Compiler` pairs prove the gap.
- Projection: no `render` (or other emit) export; `Guide` / `Source` extract only. Markdown emit primitives live in `@orkestrel/markdown` / `@orkestrel/template` (C13). Marker splice precedent is catalog-only in scaffold, not in `@orkestrel/guide`.
- Equality gate: SB/MB compare `{ name, keyword }` / method-name sets. Sentence equality and region-byte equality are absent. Database already runs EX and hidden/direct-barrel; scaffold does not.
- Voice gate: oxlint can read comment `value`; this plugin does not. Markdown prose cannot live in the plugin (C3). `PolicyContext` still lacks `sourceCode`.
- Propagation: proposed `docs` script + region currency in package-owned `tests/guides.test.ts`; `@orkestrel/guide` development bump; scaffold seeds markers. `parseSync` comments are on `ParseResult`, not on `@oxc-project/types` `Program`; `readStatements` already calls `parseSync` and ignores `comments`. Keep that as the scanner’s control, never a `src/server` import.

Option 1 still treats TSDoc as the table write-source; symmetry is the equality check over the render, not dual write. Option 2 treats TSDoc as the only write-source. Option 3 writes neither from the other. The probes in `PROPOSAL.md:1261-1279` still gate whether the text scanner can attach a first sentence as reliably as `ParseResult.comments` by range.

**Closing table**

| Mechanism | Nearest seam | Exists | Missing |
| --- | --- | --- | --- |
| Guide table reader | `helpers.ts:1253` `extractSurface`; `:1310` `extractMethods`; `Guide.ts:56` | Name + `Kind` / method names from column 0; H2 `Surface`/`Methods` | Summary/Returns/Behavior cells; H1 tagline; column-header variants (`API`/`Class`/`Type`) are tolerated only because name is column 0 |
| TSDoc reader | `helpers.ts:56` `extractSourceLines`; `:1398` `extractExampleLines`; `Source.ts:24-28` | Aligned `jsdoc` spans; `@example` adjacency; export/member grammars on `code` | First-sentence split; `@param`/`@returns`/`@remarks`/`{@link}` structure; attachment by range |
| Example pair reader | `findUnexampled` `helpers.ts:749`; EX spec `guides/guide.md:403-409`; scaffold fences `tests/guides.test.ts:212-361` | Presence (fence name or `@example` tag); scaffold executes some guide fences, not `@example` bodies | Byte/content equality of `@example` vs guide fence; `createBlueprint` / `Compiler` already disagree |
| Projection | Proposed `render` beside `Guide`/`Source` (`PROPOSAL.md:418-425`); catalog markers `src/core/constants.ts:290-299` | Catalog splice in scaffold `Materializer` only | Any emit in `@orkestrel/guide`; qualified multi-region splice; `{@link}` → backtick |
| Equality gate | SB/MB `tests/guides.test.ts:99-151`; `findMissingSymbols`; database also EX/hidden | Symbol-identity bijection | Summary-equality; region-byte currency; README check |
| Voice gate | `typescript.md:78-79`; `documentation.md:35`; oxlint `getAllComments` `plugins-dev.d.ts:2697`; `configs/policy.ts:49-54` | Laws; comment API on oxlint context (campaign `:161`) | `policy/tsdoc-voice` / `policy/prose`; `PolicyContext.sourceCode`; Markdown term sweep; `jsdoc` key in `.oxfmtrc.json` |
| Propagation tool | C7 `tests/guides.test.ts` per package; `npm run docs` proposed | Package-owned suite; `guide` on a development edge | `docs` script; markers in `new` templates; `prepack` regenerate of `guides/scaffold.md` as a `HOST_PATHS` seed |

**Unknowns**

- Live miss rate of a first-sentence scan vs `ParseResult.comments` by range (probe 1, not run in this absorb).
- Whether `context.report` on a comment node succeeds on oxlint `1.80.0` (probe 5).
- oxfmt `0.65.0` default and rewrite shape for `jsdoc: true` (stated in the proposal; `.oxfmtrc.json` unset; schema not read here).
- Whether `ParseResult.comments[].value` includes the `/**` wrapper or the inner text (typed as `string` with `start`/`end` only).
- `src/bin` doc-block handling under a TSDoc-sourced generator (C15); no `src/bin` reader was built.
- Database Surface tables beyond the sampled Factories/Entities/Types/Constants/Methods forms (Query engine, Browser, Helpers, and the rest of Methods groups unread as tables).
- `helpers.ts` leaves not named in § B (path/comparison helpers exist; their bodies were not absorbed beyond the example-chain and surface extractors).
- `SourceManager.ts` after `:48`; `extractExports` regex body at `helpers.ts:987`.
- Fleet `guides/guide.md` in scaffold vs `/home/user/fleet/guide/guides/guide.md` — this absorb used the fleet checkout named in the brief.

**Coverage**

Read: `tmp/cursor/docs-parity-absorb-brief.md`; `.agents/orchestration.md` (head); `PROPOSAL.md`; `/home/user/fleet/guide/guides/guide.md`; `/home/user/fleet/guide/src/core/types.ts`; `Guide.ts`; `sources/Source.ts`; `sources/SourceManager.ts`; `helpers.ts` (exports list plus `extractSurface`/`extractMethods`/`extractExampleLines`/`extractExamples`/`extractExampleMethods`/`findUnexampled`/`findKindIndex`/`extractSourceLines` head); `parsers.ts`; `shapers.ts`; `validators.ts`; `factories.ts`; `constants.ts`; `index.ts`; glob of `/home/user/fleet/guide/src/server/**` (absent); `guides/scaffold.md` (H1, Surface, Methods, Blueprint/Compile/Library fences, birth paragraph); `/home/user/fleet/database/guides/database.md` (H1, Surface samples, Methods); `/home/user/fleet/abort/guides/abort.md`; `tests/guides.test.ts`; `/home/user/fleet/database/tests/guides.test.ts`; `.claude/rules/typescript.md` § Comments; `.claude/rules/documentation.md`; `src/core/types.ts`; `src/core/helpers.ts`; `src/core/factories.ts`; `src/core/Compiler.ts`; `src/server/Materializer.ts`; `configs/policy.ts`; `.orkestrel/campaign/ts6-api/plan.md` Decision 3 and Re-baseline; `.oxfmtrc.json`; `tests/setupServer.ts` `readStatements`; `node_modules/@oxc-project/types/types.d.ts` `Program`; `node_modules/rolldown/dist/shared/binding-Og__jmUi.d.mts` `Comment`/`ParseResult`; `node_modules/rolldown/dist/shared/transform-DR4CXeQm.d.mts` `parseSync`; `node_modules/oxlint/dist/plugins-dev.d.ts` comment surface; `node_modules/vite/dist/node/index.d.ts` re-export line.