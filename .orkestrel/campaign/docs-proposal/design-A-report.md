# Unit docs-design — Lens A report (planner on Opus 5)

Returned by Workflow wf_50dace1e-3ab node design:A on 2026-09-05; captured verbatim by the Orchestrator.

Recommended path: Option A2, with Option A3's second render target added; Option A1 only if the owner authorizes a manifest dependency change.

## Option A1 — `scaffold document`: the guide is a render of a compiler-API model

### 1. Mechanism

The source of truth for every documentary fact about a symbol is the TSDoc block attached to its declaration. The guide holds no authored sentence.

| Fact | Source of truth | Reader |
|---|---|---|
| Package tagline and opening pitch | `@packageDocumentation` on each barrel | the generator |
| Surface row summary | the doc block's first sentence | the generator |
| Methods table row | the interface member's doc block first sentence | the generator |
| Concept chapter (Ownership, Blueprint, Compile) | `@remarks` on the type or class that owns the concept | the generator |
| Example fence | `@example` | the generator and `tests/guides.test.ts` |
| Cross-reference | `{@link}` and `@see` | the generator |
| Test index | the `tests/**` inventory | the generator |

A new `Documenter` class in `src/server` builds a `Documentation` model with the TypeScript compiler API — `ts.createProgram` over `src/core/index.ts`, `src/server/index.ts`, and `src/bin/main.ts`, then `checker.getExportsOfModule`, `Symbol.getDocumentationComment` (`node_modules/typescript/lib/typescript.d.ts:6548`), `Symbol.getJsDocTags` (`:6549`), and `ts.displayPartsToString` (`:11426`). Pure projections named in the `{noun}To{Noun}` form fixed by `.claude/rules/names.md` § Fixed derivation/construction forms — `documentationToGuide`, `referenceToRow` — live in `src/core/compilers.ts`, so the render half stays host-independent and unit-testable. Markdown text comes from `renderMarkdown` in `@orkestrel/markdown` (`/home/user/fleet/markdown/guides/markdown.md:119`), which scaffold already declares as a runtime dependency (`tmp/units/docs-ecosystem-report.md` Work order, runtime dependents of `@orkestrel/markdown` name `@orkestrel/scaffold` at L3). Fixed section scaffolding — headings, blockquote, order — fills through `fillTemplate` in `@orkestrel/template` (`/home/user/fleet/template/guides/template.md:104`), also already declared.

The verb is `scaffold document`. It writes `guides/<name>.md`. `scaffold document --check` renders to memory and refuses when the bytes on disk differ. The trigger is the `guides` Vitest project: `tests/guides.test.ts` calls the render and asserts byte equality against the committed file, so a forgotten regeneration reddens `npm test` with no new gate step and no change to the chain `AGENTS.md` § Work process fixes.

New npm dependency: none added, but `typescript` moves from `devDependencies` to `dependencies` in `package.json`, because `src/server` would import it at runtime. That enlarges the installed closure of every consumer of `@orkestrel/scaffold/server`, so it needs the owner's explicit request under `AGENTS.md` § Non-negotiable rules ("NEVER add an npm package unless the user explicitly requests it").

Labelled assumption (open in the distillates): whether `@orkestrel/markdown`'s document model can be constructed programmatically for `renderMarkdown`, or only parsed from text. The absorb distillate names `parseDocument`, `parseProvenance`, and `renderMarkdown` (`tmp/cursor/docs-absorb.result.md` evidence row 9) without stating the render input's constructability. Settled by reading `@orkestrel/markdown`'s `src/core/types.ts` node types. If it parses only, the generator emits Markdown text through `fillTemplate` alone and uses `parseDocument` as a self-check.

### 2. Worked example

The TSDoc as A1 would have it, at `src/core/factories.ts`, absorbing the chapter paragraph the guide states separately today:

```ts
/**
 * Constructs a {@link Blueprint} from a name and the fields that differ from the defaults.
 *
 * @param name - The bare workspace name.
 * @param input - The fields to set; every omitted field takes its default.
 * @returns The filled blueprint, owned by the caller and sharing nothing with `input`.
 * @throws {@link ScaffoldError} coded `INVALID` when the filled record is not a
 * blueprint.
 *
 * @remarks
 * A blueprint is a closed record, and most of its fields have one sensible
 * starting value: an empty list, a cleared flag, `DEFAULT_VERSION`, and
 * `DEFAULT_ENGINES`. Filling them here is what lets a caller state only what its
 * workspace actually declares.
 *
 * This is the construction door, and {@link parseBlueprint} is the coercing one.
 * They differ in every part: this fills the defaults and takes a partial
 * specification, where the parser fills nothing and takes an untrusted value; and
 * this refuses by throwing, where the parser refuses by answering `undefined`.
 * What they share is the law — both accept exactly what `isBlueprint` accepts.
 *
 * That law is structural only. Whether the name is a name, the version a version,
 * and the axis combination one this package can generate are the gate's laws, and
 * the gate answers them with {@link Question}s carrying their accepted candidates.
 * A blueprint the gate will refuse is still constructible, so one law lives in one
 * place.
 *
 * @example
 * ```ts
 * import { createBlueprint } from '@orkestrel/scaffold'
 *
 * createBlueprint('router', { src: ['core'] }).version // '0.0.1'
 * createBlueprint('Router').name // 'Router' — the gate refuses it, this does not
 * ```
 */
```

Every sentence there is already written. The summary and the first two remark paragraphs are today's block verbatim (`src/core/factories.ts:8-42`). The last paragraph is today's guide sentence at `guides/scaffold.md:864-866`, moved rather than rewritten.

The guide passage A1 produces:

```markdown
| `createBlueprint` | function | Constructs a `Blueprint` from a name and the fields that differ from the defaults. |
```

```markdown
### `createBlueprint`

Constructs a [`Blueprint`](#blueprint) from a name and the fields that differ from the defaults.

A blueprint is a closed record, and most of its fields have one sensible starting value: an empty
list, a cleared flag, `DEFAULT_VERSION`, and `DEFAULT_ENGINES`. Filling them here is what lets a
caller state only what its workspace actually declares.

This is the construction door, and [`parseBlueprint`](#parseblueprint) is the coercing one. They
differ in every part: this fills the defaults and takes a partial specification, where the parser
fills nothing and takes an untrusted value; and this refuses by throwing, where the parser refuses
by answering `undefined`. What they share is the law — both accept exactly what `isBlueprint`
accepts.

That law is structural only. Whether the name is a name, the version a version, and the axis
combination one this package can generate are the gate's laws, and the gate answers them with
[`Question`](#question)s carrying their accepted candidates. A blueprint the gate will refuse is
still constructible, so one law lives in one place.

```ts
import { createBlueprint } from '@orkestrel/scaffold'

createBlueprint('router', { src: ['core'] }).version // '0.0.1'
createBlueprint('Router').name // 'Router' — the gate refuses it, this does not
```
```

Voice consequences. The writing rules that govern the TSDoc are `AGENTS.md` § Writing, `.claude/rules/writing.md` in full, and `.claude/rules/typescript.md:76-88` — the third-person `-s` summary that never repeats the symbol's name (`:78-79`), the options-object `@remarks` rule (`:85`), and "Thrown when …" (`:82`). Under A1 those rules reach the generated guide unchanged, because the guide's sentences are those sentences.

The Surface-row description changes form. `.claude/rules/documentation.md:35` says "a guide tagline and a Surface-row description are noun phrases", which is why the same fact reads "Constructs a `Blueprint` from …" in source (`src/core/factories.ts:8`) and "Construct a `Blueprint` from …" in the guide (`guides/scaffold.md:281`), and why `Origin` reads "Names how an artifact's content is produced." (`src/core/types.ts:10`) against "How an artifact's content is produced." (`guides/scaffold.md:68`). A1 makes the row the TSDoc sentence verbatim and amends `.claude/rules/documentation.md:35` in the same commit, scoping the noun-phrase form to the H1 blockquote tagline alone. Deriving the noun phrase by stripping the verb is refused: it is a text transform over authored prose, and it produces a second wording nothing checks — the defect the option exists to remove.

### 3. Edit cost

| Change kind | Files edited today | Files edited under A1 | Check that catches a forgotten site |
|---|---|---|---|
| Rename an export | the declaration, `guides/scaffold.md` Surface row, its Methods row where behavioural, every prose mention, `README.md` where named, the executed-fence transcription in `tests/guides.test.ts` | the declaration and its TSDoc | SB today; the byte-equality assertion under A1 |
| Add an options field | `src/core/types.ts`, the implementation, the options `@remarks`, the guide's Surface row and its prose passage | `src/core/types.ts` and its `@remarks` | none today for the prose passage; the byte-equality assertion under A1 |
| Change a behaviour claim | the `@remarks` and the guide paragraph, in different words each time | the `@remarks` alone | none today — `Ownership`'s `birth` claim reads one way at `src/core/types.ts:27-29` and another at `guides/scaffold.md:999-1002`; the byte-equality assertion under A1 |
| Add a documented limit | the guide's `## Limits` section at `guides/scaffold.md:1522`, with no source anchor | the owning symbol's `@remarks`, or the barrel's `@packageDocumentation` for a cross-cutting limit | none today; the byte-equality assertion under A1 |
| Add a CLI flag | `src/bin/CLI.ts`, `guides/scaffold.md` § Command line (`:475`), `README.md` (`:42-43`) | `src/bin/CLI.ts` and its TSDoc | none today — `src/bin` publishes no barrel and sits outside the bijection (`guides/README.md:16-17`); the byte-equality assertion under A1 |

### 4. Checks

| Check | Fate under A1 |
|---|---|
| SB — surface bijection | Becomes tautological: the guide's surface is projected from the barrel's. Replaced by the byte-equality assertion, which is strictly stronger because it also covers the summary text SB never read. |
| MB — methods bijection and class-no-extra | Same fate for the documented half. The class-no-extra half survives unchanged, because it compares the implementing class against the interface rather than against the guide (`guides/guide.md:385-389`). |
| LI — link integrity | Moves into the generator: an unresolvable `{@link}` or `@see` target is a refusal at render, not a red test after the fact. Keep the guide-side check for the hand-written links in `guides/README.md`, which stays authored. |
| TE — tests-link existence | Becomes tautological and honest: the generator emits `## Tests` from the real `tests/**` inventory, so it can only name files that exist. |
| NV — non-vacuousness | Becomes a generator invariant: an empty Surface or Methods population is a refusal. Keep the assertion in `tests/guides.test.ts` as the guard that the render itself did not go vacuous. |
| FL — fence-language listing | Moves to source: the generator refuses an `@example` fence whose language the package did not list. |
| EX — examples presence | Moves to source and stops being tautological. Presence in the guide is guaranteed by generation, so the check becomes "every `function`-keyword export carries an `@example` tag", enforced by the native `jsdoc` rules oxlint already ships (`node_modules/oxlint/configuration_schema.json:3532-3751`) or by a generator refusal. |
| FI — fence-import reality | Moves into the generator, which resolves each fence import against the model it just built. |
| Executed fences | Survives and grows. The transcription in `tests/guides.test.ts:201-245` now reads the `@example` block as the single fence site, which is what `.claude/rules/documentation.md:37-38` demands of a prose claim. |

New checks A1 needs: the byte-equality assertion between the committed `guides/<name>.md` and the render; an oxfmt stability assertion, so the emitted Markdown passes `format:check` without a rewrite (the tree already formats Markdown — `npx oxfmt --config .oxfmtrc.json --check guides/scaffold.md README.md .claude/rules/writing.md → All matched files use the correct format.`, `tmp/units/docs-orchestrator-measurements.md:8-10`); and a prose rule in the `policy` oxlint plugin, described in the next block.

### 5. Humans and LLMs

An IDE hover shows the whole block, including the chapter paragraphs that used to live only in the guide. That holds for a consumer too, not only for this repository: `grep -c '^\s*/\*\*' dist/src/core/index.d.ts → 202 ; '@remarks' → 129 ; '@example' → 87 ; '{@link' → 77` (`tmp/units/docs-orchestrator-measurements.md:27`), and plain `tsc` behaves the same way (`npx tsc --declaration --emitDeclarationOnly --outDir out sample.ts`, `:45-55`), because `removeComments` does not affect declaration files (`tmp/units/docs-research-web-report.md:33`).

A human reading GitHub sees `guides/scaffold.md` exactly as today — same headings, same tables, same fences. The file is committed, which is not optional: `Upstream.#guideURL` fetches each mirror from `{repositoryBase}/{scope}/{bare}/refs/heads/{branch}/guides/<name>.md` (`src/server/Upstream.ts:737-740`) against `https://raw.githubusercontent.com` (`src/server/constants.ts:118`), so a git-ignored guide is a `404` for every mirror in the fleet.

An LLM agent loads the same guide, or the declaration rollup, and gets the identical sentences from either.

The voice conventions stay stated once, in `AGENTS.md` § Writing and `.claude/rules/writing.md`. A1 makes them enforceable for the first time: prose moves into `.ts` comment text, and an oxlint JS plugin reaches comment text through `sourceCode.getAllComments()` (`node_modules/oxlint/dist/plugins-dev.d.ts:2697`) and `CommentType.value` (`:1315-1318`), reporting through `context.report` (`:3835`). A JS plugin cannot reach Markdown — its language union is `"js" | "jsx" | "ts" | "tsx" | "dts"` (`:4129`) — so the substitutions table at `.claude/rules/writing.md` § Substitutions, unswept today (`tmp/cursor/docs-absorb.result.md` evidence row 7), becomes checkable precisely because the prose moved to the declaration. The rule lands in `configs/policy.ts` beside `no-mocking`, `no-keyword-privacy`, and `no-nested-functions` (`configs/policy.ts:337-345`), registered in `.oxlintrc.json:5-6`. That file imports nothing and is vendored byte-identical to every workspace (`.claude/rules/workspace.md` § Configuration authority), so the word table sits inline in it and reaches the fleet through `repair`.

### 6. Migration

Order: scaffold, then `@orkestrel/guide`, then the fleet. Scaffold propagates as files rather than as a runtime cascade — every package declares it as a development dependency (`tmp/units/docs-ecosystem-report.md` Work order, Row 4 closing bullet) — so `document` ships in a scaffold release, each target re-pins `@orkestrel/scaffold` and runs `repair`, and each target's gates prove green before it adopts.

What a package edits to adopt: move each guide chapter into the `@remarks` of the symbol that owns it, move the tagline into `@packageDocumentation` on the barrel, delete the authored `guides/<name>.md`, run `scaffold document`, and commit the render. A package that adopts nothing keeps its authored guide and its existing parity suite, because `tests/guides.test.ts` is package-owned rather than vendored — `host.json` names no `tests/guides.test.ts` destination (`tmp/cursor/docs-absorb.result.md` evidence row 6).

What stays byte-identical: every mirror. `HOST_PATHS` vendors `guides/guide.md` and `guides/scaffold.md` as starting mirrors (`src/core/constants.ts:111-152`), and `Materializer.mirror` writes fetched bytes as content-owned computed artifacts (`src/server/Materializer.ts:323-366`). A generated guide committed on `main` is the same fetched bytes to every consumer. The existing fleet mirror drift — checkouts split into a 1770-line and a 1795-line group against this repository's 1798-line original (`tmp/units/docs-ecosystem-report.md` Health, Row 5) — is unaffected by generation and closes only when each target re-runs `catalog`.

### 7. Risks and open questions

- **Narrative with no symbol to attach to.** `guides/scaffold.md` carries `## Command line` (`:475`), `## Blueprint` (`:758`), `## Compile` (`:868`), `## Ownership and drift` (`:956`), `## Fleet catalog` (`:1075`), `## Dependency floors` (`:1120`), `## Vendored data root` (`:1194`), `## Generated workspace` (`:1318`), and `## Limits` (`:1522`). Each needs an owning declaration. Some already have one — the whole Origin table sits in `src/core/types.ts:12-16` and the whole Ownership table in `:23-29`. Settle by walking each H2 and naming its owning export; a section with no owner falls to `@packageDocumentation`, and a section that still has no home falsifies A1's central claim.
- **Source files become prose-heavy.** `Materializer`'s block already runs `src/server/Materializer.ts:84-128` before the class starts. Absorbing chapters lengthens that further. Settle by measuring the ratio of comment lines to code lines after one real migration of `src/core/types.ts`.
- **`typescript` in `dependencies`.** Needs the owner's explicit request. If refused, A1 is dead and A2 is the path.
- **oxfmt stability of the render.** Settle by running `npx oxfmt --config .oxfmtrc.json --check` on a generated file; the tree already proves the formatter reads Markdown by default (`tmp/units/docs-orchestrator-measurements.md:8-16`).
- **Enabling `jsdoc` in `.oxfmtrc.json`.** It rewrites comments — "tag aliases are canonicalized, descriptions are capitalized, long lines are wrapped, and short comments are collapsed to single-line" (`tmp/units/docs-research-web-report.md:42`) — and it is disabled by default (`node_modules/oxfmt/configuration_schema.json:75-76`). Under A1 the comment is the product, so enabling it is attractive and dangerous. Settle by enabling it on a branch and reading the diff over `src/core/`.

### 8. Claims

1. Every H2 section of `guides/scaffold.md` has an exported declaration that owns its subject, or belongs to `@packageDocumentation`. Refuted by naming one section whose subject no export owns.
2. The generated guide passes `npm run format:check` without a formatter rewrite. Refuted by an `oxfmt --check` run that reports the generated file.
3. Replacing SB and MB with byte equality against the render loses no defect class those checks catch. Refuted by a drift case SB or MB reports that byte equality does not.
4. The TypeScript compiler API alone supplies the model — no `@microsoft/tsdoc` and no api-extractor doc model. Refuted by a documentary fact the guide needs that `Symbol.getDocumentationComment` and `Symbol.getJsDocTags` do not return.
5. Committing the render keeps every fleet mirror byte-identical to what `Upstream` fetches. Refuted by a mirror comparison that differs after a target adopts.

## Option A2 — `guide render`: the package that already extracts the surface learns to emit it

### 1. Mechanism

The same single source as A1 — TSDoc on the declaration — with a different owner and a different extractor. `@orkestrel/guide` already builds every population the guide's checked sections need, reading text rather than parsing TypeScript:

| Population | Existing guide API | Pointer |
|---|---|---|
| Barrel and direct surface symbols, with kind | `source.surface()`, `source.exports()`, `computeSymbolKey` | `guides/guide.md:381-384` |
| Interface members | `source.methods(interface)` | `guides/guide.md:385-389` |
| Leading JSDoc `@example` spans | `source.examples()`, `source.examples(name)` | `guides/guide.md:403-410` |
| Fence languages and fence bodies | `guide.fences()` | `guides/guide.md:399-402` |

What is missing is the render direction, not the extraction. A2 adds a `Documenter` to `@orkestrel/guide` with a `render` method that reads the doc-comment text `Source` already locates, and emits `guides/<name>.md` from a model. `Source` is text-only by design — "using text-only line scanners rather than the TypeScript compiler API or the filesystem" (`/home/user/fleet/guide/src/core/sources/Source.ts:24-28`) — and A2 keeps it that way: extraction gains a summary and tag reader beside the `@example` reader it already has.

Markdown text comes from `renderMarkdown` (`/home/user/fleet/markdown/guides/markdown.md:119`), which `@orkestrel/guide` already declares as a runtime dependency (`tmp/units/docs-ecosystem-report.md` Work order: direct runtime dependents of `@orkestrel/markdown` are `@orkestrel/guide` at L3 and `@orkestrel/scaffold` at L3).

The verb is a script, `npm run docs`, calling the renderer, plus the byte-equality assertion inside each package's own `tests/guides.test.ts`. No build is required, because nothing reads `dist/`.

New npm dependency: none. Nothing moves between `dependencies` and `devDependencies`, in `@orkestrel/guide` or anywhere else.

`{@link Blueprint}` renders as a link to the guide's own anchor for `Blueprint`, computed from the surface population the scanner already holds. That is a text operation and needs no type checker.

Labelled assumption, same as A1: whether `@orkestrel/markdown`'s node model is constructable for render or parse-only.

### 2. Worked example

The TSDoc is identical to A1's block at `src/core/factories.ts`, and so is the guide passage it produces, with one difference: A2 resolves `{@link ScaffoldError}` and `{@link Question}` by looking the name up in the surface population rather than by asking a type checker, so a `{@link}` to a name outside the barrel renders as inline code rather than as a link, and the renderer reports it.

```markdown
| `createBlueprint` | function | Constructs a `Blueprint` from a name and the fields that differ from the defaults. |
```

```markdown
### `createBlueprint`

Constructs a [`Blueprint`](#blueprint) from a name and the fields that differ from the defaults.

A blueprint is a closed record, and most of its fields have one sensible starting value: an empty
list, a cleared flag, `DEFAULT_VERSION`, and `DEFAULT_ENGINES`. Filling them here is what lets a
caller state only what its workspace actually declares.

This is the construction door, and [`parseBlueprint`](#parseblueprint) is the coercing one.

```ts
import { createBlueprint } from '@orkestrel/scaffold'

createBlueprint('router', { src: ['core'] }).version // '0.0.1'
createBlueprint('Router').name // 'Router' — the gate refuses it, this does not
```
```

Voice consequences are A1's, unchanged: `.claude/rules/typescript.md:76-88` governs the doc block, and the Surface row carries the TSDoc summary sentence verbatim, which amends `.claude/rules/documentation.md:35` the same way.

### 3. Edit cost

Identical to A1's table for every change kind, with one difference in the last row. A2's scanner reads files it is handed rather than a compiled program, so documenting `src/bin/CLI.ts` — which publishes no barrel (`guides/README.md:16-17`) — costs a second `Source` over the bin file rather than a second entry point in a program. The developer still edits `src/bin/CLI.ts` alone and regenerates.

The check that catches a forgotten site is the byte-equality assertion in each package's own `tests/guides.test.ts`, which every fleet package already carries (`tmp/units/docs-ecosystem-report.md` Map, `tests/guides.test.ts` column).

### 4. Checks

Every fate in A1's table holds, computed by the same owner that computes them today rather than by a new one, with these differences:

| Check | Difference from A1 |
|---|---|
| LI — link integrity | Stays in `@orkestrel/guide` as a check rather than becoming a generator refusal, because the text-only scanner resolves a relative link against the inventory (`guides/guide.md:390-393`) exactly as it does today. Cheaper and unchanged. |
| EX — examples presence | Becomes "every `function`-keyword Surface symbol carries an `@example` tag", which `findUnexampled` already computes from `source.examples()` (`/home/user/fleet/guide/src/core/helpers.ts:749-759`). No new instrument. Scaffold's own suite must start calling it: `tests/guides.test.ts` does not today (`tmp/cursor/docs-absorb.result.md` evidence row 2). |
| FI — fence-import reality | Stays a check rather than a refusal, because `extractFenceImports` already exists (`guides/guide.md:411-415`). |

New checks A2 needs: the byte-equality assertion; the oxfmt stability assertion; and the same `policy` prose rule described under A1 § Humans and LLMs, which is independent of who owns the renderer.

### 5. Humans and LLMs

Identical to A1 for the IDE hover, the GitHub reader, and the agent, because the artifact and the source are the same. The difference is upstream: an agent or a developer can regenerate without building, so `npm run docs` answers "what does the guide say now" from a clean checkout.

Voice conventions stay in `AGENTS.md` § Writing and `.claude/rules/writing.md`, enforced in `configs/policy.ts` exactly as under A1.

### 6. Migration

Order: `@orkestrel/guide` first, then every package including scaffold, in any order.

`@orkestrel/guide` bumps and publishes on its own account, because its own published surface moved. Every consumer's edge is a development edge — every fleet package and scaffold declares `"@orkestrel/guide": "^0.0.17"` in `devDependencies` and consumes it only from `tests/guides.test.ts` (`tmp/units/docs-ecosystem-report.md` Health, Row 3) — so each consumer re-pins, proves its gates green, and commits to `main` without bumping or republishing, which is what `.agents/orchestration.md` § What a bump obliges fixes for a development bump.

What a package edits to adopt: the same moves as A1, plus the `npm run docs` script. `probe` needs more, because its `tests/guides.test.ts` hand-rolls an equivalent harness from `@src/core` and `@src/server` rather than importing `@orkestrel/guide` (`/home/user/fleet/probe/tests/guides.test.ts:1-9`); it either adopts the package or keeps an authored guide.

What stays byte-identical: every mirror, on A1's reasoning and the same pointers.

### 7. Risks and open questions

- **The text-only scanner meets a construct it cannot read.** It does not parse TypeScript, and comment and template payload sit outside its populations already (`guides/guide.md:281-314`). A doc block on an overload set, on a re-exported symbol, or inside a template literal is the risk. Settle by running the scanner over `src/core/types.ts`, `src/core/helpers.ts`, `src/server/Materializer.ts`, and `src/bin/CLI.ts` and diffing its extracted summaries against `grep -c '^\s*/\*\*'` on the same files (`src/core` reports 215 doc blocks over 212 top-level exports, `src/server` 141 over 101, `src/bin` 73 over 69 — `tmp/units/docs-design-brief.md:35`).
- **`@orkestrel/guide` grows a second job.** It checks today; it would check and emit. Settle by asking whether the emit path can share `Source` without widening `Source`'s contract; if it cannot, the renderer is a sibling package and A2's zero-dependency claim survives but its migration lengthens.
- **A guide-owned renderer cannot fold re-exports.** Scaffold's `src/core/index.ts` is re-exports only (`src/core/index.ts:1-11`), so the scanner must follow each row to its declaring file. It already does this for SB's direct-to-barrel direction (`guides/guide.md:381-384`), so the seam exists; confirm it exposes the doc comment and not only the name.
- **The narrative-ownership risk is A1's, unchanged**, and it is the risk that decides this lens.

### 8. Claims

1. `@orkestrel/guide`'s existing `Source` populations supply every field the generated Surface and Methods sections need, so only the render direction is new. Refuted by a needed field no existing `Source` method returns.
2. A2 adds no npm dependency and moves no dependency between manifest sections. Refuted by a manifest diff that shows either.
3. Adopting A2 obliges no fleet package to bump or republish, only to re-pin and prove its gates. Refuted by a package whose own published surface moves as a result.
4. The text-only scanner extracts a summary for every export in `src/core`, `src/server`, and `src/bin`. Refuted by an export it cannot read.
5. The render is stable under `oxfmt --check` with the repository's `.oxfmtrc.json`. Refuted by a reported file.

## Option A3 — one model, several renders: guide, README, and an agent digest

### 1. Mechanism

A3 composes with A1's or A2's extractor and changes what is rendered. One `Documentation` model feeds these targets:

| Target | Content | Regenerated by |
|---|---|---|
| `guides/<name>.md` | The whole guide, as under A1 or A2 | the renderer, whole file |
| `README.md` | The install line, the verb table, and the library pitch, inside a marker-bounded region | the renderer, region only |
| `guides/llms.txt` | An H1 title, a blockquote summary, and H2 sections of curated links, per the `/llms.txt` convention (`tmp/units/docs-research-web-report.md:45`) | the renderer, whole file |

`README.md` keeps authored bytes outside the region, because it carries badges and repository prose the doc model does not own. The region mechanism already exists in this package: `CATALOG_OPENING_MARKER` and `CATALOG_CLOSING_MARKER` bound the package table inside `.claude/agents/orkestrel.md` (`src/core/constants.ts:290-299`; `.claude/agents/orkestrel.md:44-99`), and `Materializer.catalog` rewrites exactly that span (`src/server/Materializer.ts:369-395`, `#recatalog` at `:1112-1117`). A3 reuses that mechanism rather than inventing one, which is what `AGENTS.md` § Design laws requires of a repeated pattern.

This target set attacks a duplication the guide-only options leave standing. `README.md` and `guides/scaffold.md` state the same compile-compare-write pitch (`README.md:1-8`; `guides/scaffold.md:1-13`), the same vendored-set paragraph (`README.md:10-23`; `guides/scaffold.md:15-27`), the same install line (`README.md:27-28`; `guides/scaffold.md:35-36`), the same authority sentence (`README.md:39-40`; `guides/scaffold.md:477-478`), the same exit codes (`README.md:40`; `guides/scaffold.md:547-549`), and the same verb list (`README.md:45-100`; `guides/scaffold.md:480-486`) — with no bijection test over any of it, and one already-visible disagreement: the README's examples read `npx scaffold …` (`README.md:48`) where the guide's command reference reads `scaffold <verb>` (`guides/scaffold.md:518-530`).

New npm dependency: none beyond whatever the chosen extractor needs — none under A2, and `typescript` in `dependencies` under A1.

### 2. Worked example

The TSDoc is A1's block, unchanged. The guide passage is A1's, unchanged. A3 adds these renders of the same model.

The README region:

```markdown
<!-- orkestrel:surface -->

| Export | Kind | Summary |
| --- | --- | --- |
| `createBlueprint` | function | Constructs a `Blueprint` from a name and the fields that differ from the defaults. |

<!-- /orkestrel:surface -->
```

The agent digest:

```markdown
# @orkestrel/scaffold

> Compiles a workspace blueprint into a plan, compares it against a target, and writes it.

## Reference

- [Surface](scaffold.md#surface): every published export, its kind, and its summary
- [Methods](scaffold.md#methods): every behavioural interface and its members
- [Blueprint](scaffold.md#blueprint): the closed workspace specification
- [Limits](scaffold.md#limits): what this package refuses and why
```

Voice consequences: one sentence, three appearances, checked in all of them. The README row and the guide row are the same string from the same model, so the `npx scaffold` against `scaffold <verb>` disagreement cannot recur. `.claude/rules/documentation.md:35` is amended once, as under A1, and covers every render.

### 3. Edit cost

| Change kind | Files edited today | Files edited under A3 | Check that catches a forgotten site |
|---|---|---|---|
| Rename an export | A1's list, plus `README.md` where the name appears | the declaration and its TSDoc | byte equality on the guide, region equality on `README.md`, byte equality on the digest |
| Add an options field | A1's list | `src/core/types.ts` and its `@remarks` | the same set |
| Change a behaviour claim | the `@remarks`, the guide paragraph, and the README paragraph where it is restated | the `@remarks` alone | the same set — today nothing checks the README restatement at all |
| Add a documented limit | `guides/scaffold.md:1522` | the owning symbol's `@remarks` | the same set |
| Add a CLI flag | `src/bin/CLI.ts`, `guides/scaffold.md:475`, `README.md:42-43` | `src/bin/CLI.ts` and its TSDoc | the same set |

### 4. Checks

Every fate in A1's table holds. A3 adds these:

| Check | Fate |
|---|---|
| README region equality | New. Compares the marker-bounded span against the render, and asserts the markers are present and ordered. Failing it names the region, not the file. |
| Digest link resolution | New. Every link in `guides/llms.txt` resolves to a heading the guide render actually emitted. |
| Marker integrity | New. A file that lost a marker fails loudly rather than silently stopping regeneration — the failure mode `Materializer.catalog` already guards for the catalog table. |

The catalog checks are otherwise untouched: SB, MB, NV, FL, EX, FI, TE, and the executed fences take exactly the fates A1's table gives them.

### 5. Humans and LLMs

The IDE hover is A1's. The GitHub reader gets a `README.md` whose surface table cannot drift from the package and whose prose is authored where authorship earns its place. The LLM agent gets `guides/llms.txt`: an H1 title, a blockquote summary, and H2 sections of curated links, which is the whole of the `/llms.txt` convention as published (`tmp/units/docs-research-web-report.md:45`). That file is generated, so it cannot go stale, which is the failure mode of every hand-maintained agent index.

The voice conventions stay in `AGENTS.md` § Writing and `.claude/rules/writing.md`, enforced in `configs/policy.ts` as under A1. A3 strengthens the case for that rule: one sentence now reaches three artifacts, so a banned word in it is a three-site defect and the only site worth checking is the declaration.

### 6. Migration

A3 lands after its extractor, never beside it. Order: the extractor ships and the guide render is proven in scaffold; then the README region is added, marker-first, with the region initially rendering the bytes already there; then the digest.

Fleet adoption follows the extractor's edge — a scaffold release propagating as files under A1, a development-dependency re-pin under A2. Each package adopts the README region on its own schedule, because the region is inert until its markers exist.

What stays byte-identical: every guide mirror, on A1's reasoning. `README.md` is not mirrored — `HOST_PATHS` vendors `guides/guide.md` and `guides/scaffold.md` and no README (`src/core/constants.ts:111-152`) — so a README region change reaches no other package's tree.

### 7. Risks and open questions

- **Marker loss.** A vendored or reformatted README that loses a marker stops regenerating silently. Settle by asserting marker presence before comparing the span, which is the check the catalog table does not have today.
- **`llms.txt` at a package path.** The convention places the file at a site's root (`tmp/units/docs-research-web-report.md:45`); a repository file at `guides/llms.txt` is an adaptation, not the convention. Settle by deciding whether the consumer is a crawler or an agent reading the checkout — if the latter, the path is this repository's choice and the convention supplies only the shape.
- **Scope.** A3 is the largest option and its README and digest halves buy less than its guide half. Settle by landing the guide render alone and measuring the remaining multi-site edits over one release cycle against the baseline in `tmp/cursor/docs-absorb.result.md` evidence row 5, which lists the commits touching a `src/**` path, `guides/scaffold.md`, and a `tests/**` path together.
- **The narrative-ownership risk is A1's, unchanged.**

### 8. Claims

1. Every documentary fact `README.md` shares with `guides/scaffold.md` is derivable from the same model, so the region needs no fact the guide render does not already hold. Refuted by a shared fact with no source in the model.
2. The marker mechanism at `src/core/constants.ts:290-299` needs no change to bound a second region in a second file. Refuted by a required change to the marker constants or to `Materializer.catalog`.
3. A generated digest keeps every link resolvable to a heading the guide render emitted. Refuted by a link resolution failure after a render.
4. `README.md` is not a vendored path, so a region change reaches no other package's tree. Refuted by a `host.json` entry naming it.
5. Rendering the README region removes the `npx scaffold` against `scaffold <verb>` class of disagreement rather than relocating it. Refuted by a wording disagreement surviving inside the generated region.

I held the subjective lane, Lens A.

DESIGN A: 3 option(s)
