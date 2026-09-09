Objective lane held.

## Design

Create one pure, core-only `Parity` abstraction in `@orkestrel/guide`. It must compose the existing `Guide`, `Source`, manifest, comparison, and replacement primitives. It must not import filesystem, process, Vitest, or server APIs. Guide already defines consumer-supplied inventories as its host-independent boundary in `guides/guide.md:669`, while `ManifestEntry.source` preserves per-entry source mappings in `src/core/types.ts:115`.

Use this public shape, with final naming checked against the repository naming rules:

```ts
export type ParityCategory = 'summary' | 'example'

export interface Drift {
	readonly category: ParityCategory
	readonly key: string
	readonly guide?: string
	readonly source?: string
}

export interface ParityOptions {
	readonly files: Readonly<Record<string, string>>
	readonly entries: readonly ManifestEntry[]
	readonly modules: Readonly<Record<string, GuideModule>>
	readonly languages: readonly string[]
	readonly language: string
	readonly pitch?: {
		readonly readme: string
		readonly spec: string
	}
}

export interface ParityFinding {
	readonly rule: ParityRule
	readonly spec: string
	readonly text: string
}

export interface ParityReport {
	readonly input: readonly ParityFinding[]
	readonly surface: readonly ParityFinding[]
	readonly methods: readonly ParityFinding[]
	readonly links: readonly ParityFinding[]
	readonly tests: readonly ParityFinding[]
	readonly fences: readonly ParityFinding[]
	readonly examples: readonly ParityFinding[]
	readonly imports: readonly ParityFinding[]
	readonly drift: readonly ParityFinding[]
	readonly pitch: readonly ParityFinding[]
}

export interface ParityChange {
	readonly path: string
	readonly content: string
}

export interface ParityRewrite {
	readonly changes: readonly ParityChange[]
	readonly findings: readonly ParityFinding[]
}

export interface ParitySideInterface {
	rewrite(): ParityRewrite
}

export interface ParityInterface {
	readonly guide: ParitySideInterface
	readonly source: ParitySideInterface
	inspect(): ParityReport
}

export function createParity(options: ParityOptions): ParityInterface
```

`ParityRule` must be a closed union covering the report properties. `ParityFinding.text` owns the current stable report formatting, so callers do not rebuild messages.

Make `Drift.category` required. `findDrift` already knows whether it is traversing a Surface or Methods summary or an example (`Guide/src/core/helpers.ts:2392`). Emitting the category there removes the local suffix reconstruction and prevents key collisions. Keep `'summary'` for Surface and Methods rows because they share replacement behavior; use `'example'` for titled fences.

`Parity.inspect()` must compute the reusable generic assertions now implemented as local loops:

- required, non-vacuous Surface, Methods, Tests, and configured example-language populations;
- direct declarations, barrel surface, and guide surface equality in every required direction;
- documented method membership and class-to-interface contract equality;
- relative-link and test-link existence;
- allowed fence languages;
- mapped self-import export reality;
- summary and example equality through categorized `findDrift`;
- optional README pitch equality when the caller supplies `pitch`.

This moves the computations at `tests/guides.test.ts:516`, `:535`, `:545`, `:555`, `:614`, `:630`, `:645`, `:676`, and `:687` upstream. Package-specific API assertions and executable examples beginning at `tests/guides.test.ts:705` stay downstream.

The thin worker caller gathers files, parses its concept index, derives the package-specific `modules`, `languages`, `language`, and optional `pitch`, then constructs `Parity`. Existing named Vitest cases assert the matching `ParityReport` property is empty. This preserves readable coverage while removing duplicated loops.

The native command caller keeps argument validation, filesystem reads and writes, exit status, stdout, strict `VITEST === 'true'` branching, and Vitest startup. For an explicit direction it:

- constructs `Parity`;
- refuses `report.input` before starting Vitest;
- calls `parity.guide.rewrite()` or `parity.source.rewrite()`;
- writes each returned path once;
- rereads the complete inventory;
- constructs a fresh `Parity`;
- reports fresh drift and rewrite findings;
- starts the existing worker against those fresh bytes.

The rewrite implementation must accumulate text by path before emitting `ParityChange`. It must preserve first-title pairing, repeated-title behavior, absent-language normalization, summary/example category identity, shared-source accumulation, and replacer refusal reasons. `replaceFence` can return `undefined` when provenance is unavailable (`Guide/src/core/helpers.ts:2741`); that remains an explicit unplaceable finding, never a summary fallback.

Use the installed Markdown handle directly. Its public contract supplies deep traversal, filtering, provenance spans, copy-on-write mapping, reduction, folding, and shallow streaming (`Markdown/src/core/types.ts:606`). Keep a `MarkdownInterface` while extracting or rewriting instead of discarding it immediately as `Guide` currently does at `Guide/src/core/Guide.ts:42`. Replace Guide-local generic AST walks with `walk`, `find`, `filter`, or `reduce`. Preserve Guide-specific heading state where it expresses section semantics. For byte-preserving replacements, locate the parsed node, obtain `span(node)`, render only the replacement node with `renderMarkdown`, and splice that region. Do not render the whole document: Markdown’s span contract preserves original syntax and normalized characters (`Markdown/src/core/types.ts:155`).

For scaffold ownership, replace the individual script entries in `HOST_PATHS` with the `scripts` directory. Remove `RETIRED_HOST_PATHS` from constants, imports, derivation, types, guide tables, and tests. Staging already records physical directories as roots and expands their files (`src/server/helpers.ts:1515`). `Materializer.#roots` already treats manifest roots as wholly owned (`src/server/Materializer.ts:662`).

A plan selecting orchestration therefore owns the staged `scripts/` population, including the shell scripts and `scripts/service.sh` according to existing plan filtering. Audit admits ordinary target files under that root as foreign. Overwrite removes tracked foreign scripts through the existing `remove` transaction. An untracked script is reported and skipped. A changed worktree refuses removal. A protected path is skipped. Files outside `scripts/` are unaffected. Files inside `scripts/` are scaffold-owned by the owner’s ruling, so a tracked custom script may be removed. `scripts/` remains in the orchestration group through `ORCHESTRATION_PATH_PREFIXES` (`src/core/constants.ts:251`).

## Alternatives

- Keep the local rewrite engine: rejected by the owner and leaves generic assertion computations duplicated.
- Add standalone forwarding helpers: rejected because it creates an exported helper bag instead of one composition boundary.
- Put `Parity` in Guide server: rejected because its inputs and outputs are pure inventories and text changes. A server layer would add filesystem policy and new dependency consequences without a host requirement.
- Reconstruct categories from the untagged `findDrift` suffix: rejected because summary and example keys can collide.
- Classify by successful replacement: rejected because a compared fence can lack a provenance span and still be genuine example drift.
- Render the complete Markdown document after `map`: rejected because it can alter bytes outside the selected node.
- Retain a retired-path list: rejected by the owner. Directory ownership supplies cleanup through the supported foreign-file mechanism.

## Constraints

- Define public types and shapes before implementation.
- Keep Guide core-only with Contract and Markdown as runtime dependencies and Vitest as development-only.
- Use installed Markdown `0.0.14`; its installed runtime ranges are Contract `^0.0.17` and HTML `^0.0.9`.
- Do not add a dependency, server export, Vitest peer, launcher, or `docs` command.
- Keep `test:guides` pointed directly at `tests/guides.test.ts` (`package.json:80`).
- Default execution remains read-only.
- `--to guide` uses source authority for matched summaries and examples.
- `--to source` uses guide authority for matched summaries and examples.
- Keep README pitch authored and optional through caller-supplied pairing.
- Keep package-specific executable assertions downstream.
- Preserve direct-command fixtures and their falsifiable controls.

## Refusals

- Do not infer a Node engine floor from the observed host.
- Do not broaden extraction into source-language parsing.
- Do not let Guide write files or launch tests.
- Do not weaken replacement refusal when a target, source span, doc block, safe fence, or safe example body is unavailable.
- Do not preserve `RETIRED_HOST_PATHS` under another name.
- Do not protect tracked custom files inside `scripts/`; that conflicts with the approved ownership boundary.

## Measurements

- Guide dependency preparation completed with accepted Contract `0.0.17`, HTML `0.0.9`, Markdown `0.0.14`, and Test `0.0.14` tarballs. The installation exited `0`; Guide manifest, lockfile, and index were preserved.
- The predecessor ordered gate chain passed at `tmp/pass/guides-test-file-gates-accepted`, terminal receipt `d45a07`.
- The current dirty source still contains retired-path remnants at `src/core/constants.ts:157`, `src/server/Materializer.ts:51`, `src/server/Materializer.ts:650`, `guides/scaffold.md:158`, and `guides/scaffold.md:1053`. The extraction is not measured until these are removed and the new Guide package is adopted.
- No extraction gate or package execution was run in this lane.

## Units

### Guide parity core

- Role: implementer.
- Engine: native Guide checkout and repository toolchain.
- Owned paths: Guide core types, constants if needed, `Parity` implementation, factory, validators, shapers, barrel, focused core tests, `tests/guides.test.ts`, package guide, manifest, and lockfile.
- Dependencies: existing Contract and installed Markdown.
- Acceptance evidence: type and shape tests for the public contract; categorized `findDrift` controls; generic-report controls for each migrated assertion family; direction rewrite controls for collisions, repeated titles, absent language, missing spans, unsafe bodies, and shared-file accumulation; Guide’s ordered package gates.

### Scaffold adoption and script ownership

- Role: implementer.
- Engine: native scaffold checkout and repository toolchain.
- Owned paths: `tests/guides.test.ts`, Guide dependency declarations, script host constants, compiler and Materializer ownership paths, related tests, `host.json`, documentation rule, scaffold guide, manifest, and lockfile.
- Dependencies: accepted packed Guide artifact plus existing Test package.
- Acceptance evidence: predecessor command controls remain green; generic assertions call `Parity.inspect()`; fresh-byte command behavior remains green; orchestration audit sees arbitrary files beneath `scripts/`; overwrite removes clean tracked foreign scripts; untracked, dirty, and protected controls preserve transaction behavior; non-orchestration plans do not admit the root; repository gates run in required order.

## Tensions

No unresolved ownership choice remains. The owner declared `scripts/` scaffold-owned. This intentionally changes the treatment of tracked custom scripts inside that directory.

The remaining judgment choice is naming only: `Parity`, `ParitySideInterface`, and report property names should be reconciled with the subjective lane without changing the structural contract, pure boundary, or split authority properties.

## Risks

- Adding `category` to public `Drift` is a breaking shape change. Update validators, shapers, examples, guides, and every consumer in the same change; do not add a compatibility field.
- A broad Markdown refactor could change existing extraction semantics. Limit reuse to matching traversal, span, and renderer capabilities, and retain Guide-specific section state.
- Whole-directory ownership will remove clean tracked custom scripts under `scripts/`. The guide must state that boundary plainly.
- A worker caller that reuses pre-write objects can pass against stale bytes. Require inventory reread and fresh `Parity` construction before reporting and Vitest startup.
- A rewrite that emits changes before accumulating by path can lose an earlier edit. Make the path-keyed text map the sole composition state.
