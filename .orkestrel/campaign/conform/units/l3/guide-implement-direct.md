The unit is complete. Report follows.

# Unit conform-guide — report

Every row is `applied` or `noop`. The gate chain exits 0 at each stage, `scaffold audit --offline` reports no drift, and `git status --short` lists only files under Owned. No deviation fired.

## Row dispositions

| Row | Disposition | Note |
| --- | --- | --- |
| guide-obj-1 | applied | `describe('flagship fences', …)` transcribes each `## Patterns` fence with a presence guard beside it |
| guide-obj-2 | applied | `compared` guard on FI, `guide.tests().length` guard on TE, `guide.links().length` guard on LI |
| guide-obj-3 | applied | `isBrowserVuePath` and its `describe` deleted; fleet-F1 folds in here |
| guide-obj-4 | applied | `requireText` moved to `tests/setup.ts`; both `setupServer` files removed; every importer repointed |
| guide-obj-5 | applied | `exists` TSDoc and the guide Behavior cell state the directory case; LI and TE catalog rows name it |
| guide-obj-6 | applied | `DeclarationKeyword` declared in `types.ts`, used at the three sites, added to the guide Types table |
| guide-obj-7 | applied | `patterns()` → `fences()` at README.md, with guide-subj-2's edit on the same line |
| guide-obj-8 | applied | `successor runtime surface` block and the now-unused `core` namespace import deleted |
| guide-obj-9 | applied | new case parses the root README `## API` section and diffs its call tokens against the real surface |
| guide-subj-1 | applied | every numbered `AGENTS §N` / `AGENTS section N` citation replaced with a rule file and its named heading |
| guide-subj-2 | applied | counts deleted at every named site and at the sites the number-word and numeral sweeps added |
| guide-subj-3 | applied | `should` gone from the package's own prose |
| guide-subj-4 | applied | `via` → `through` at every site |
| guide-subj-5 | applied | `e.g.` → `for example` in both doc blocks |
| guide-subj-7 | applied | `@returns` added to `links`, `tests`, `fences`, `hidden`, `examples()`; `@param name` + `@returns` to `examples(name)` |
| guide-subj-8 | applied | `extractFenceImports` description resolves the alias contradiction, drops `since` and the ellipsis |
| guide-subj-9 | applied | the sight/knowledge clauses replaced with checkable facts in the guide and in `Guide.ts` |
| guide-subj-10 | applied | the fleet measurement, its conclusion, and the superseded-design history deleted |
| guide-subj-11 | applied | the slogan deleted; every shouted word lowercased, with markdown bold in the guide and plain words in doc blocks |
| guide-subj-12 | applied | `kind` → `keyword` across the type, the constant, the guard, the shape, the extractors, the guide, and the README |
| guide-subj-13 | applied | `Guide` is `pure` everywhere; `stateful` gone |
| guide-subj-15 | applied | `sources()` added to `SourceManagerInterface`, implemented, documented with a row and a runnable `@example` |
| fleet-F1 | applied | by guide-obj-3. `tests/setup.ts` keeps `TEST_SEED` and `requireTable`, so the sole-export variant does not apply; the `setup` axis, its project, and `test:setup` are untouched and the audit stays clean |
| fleet-F2 | noop | no class declares a public `readonly id` data field. Read: `Guide` (`/home/user/fleet/guide/src/core/Guide.ts`), `Source` (`/home/user/fleet/guide/src/core/sources/Source.ts`), `SourceManager` (`/home/user/fleet/guide/src/core/sources/SourceManager.ts`) — each declares only `#` fields |

## Files touched

- `/home/user/fleet/guide/src/core/types.ts` — `ExportKeyword` / `SurfaceSymbol.keyword`; false mirror-exemption paragraph deleted; `DeclarationKeyword` added; `exists` contract corrected; missing `@returns` and `@param` added; `sources()` declared.
- `/home/user/fleet/guide/src/core/constants.ts` — `EXPORT_KINDS` → `EXPORT_KEYWORDS`, count deleted.
- `/home/user/fleet/guide/src/core/validators.ts` — `isExportKind` → `isExportKeyword`, `keyword` shape key, citation and count fixed.
- `/home/user/fleet/guide/src/core/shapers.ts` — `keyword: literalShape(EXPORT_KEYWORDS)`, citation fixed, shout removed.
- `/home/user/fleet/guide/src/core/factories.ts` — `keyword` in every `@example`, numbered citations replaced.
- `/home/user/fleet/guide/src/core/helpers.ts` — `keyword` through `computeSymbolKey` / `extractExports` / `extractHidden` / `extractSurface`; `extractDeclaration` takes `DeclarationKeyword`; `isExternalLink`, `extractFenceImports`, `selectSectionBlocks` prose repaired.
- `/home/user/fleet/guide/src/core/parsers.ts` — `e.g.` replaced.
- `/home/user/fleet/guide/src/core/Guide.ts` — pure/stateful reconciled, count deleted, `via` and the sight clause replaced.
- `/home/user/fleet/guide/src/core/sources/Source.ts` — `DeclarationKeyword` on `#members` and `#locate`; `keyword` in the class `@example`.
- `/home/user/fleet/guide/src/core/sources/SourceManager.ts` — `sources()` implemented over `Object.keys(this.#modules)` through the existing `source()` cache.
- `/home/user/fleet/guide/guides/guide.md` — every renamed name, the corrected `exists` behavior, the new `DeclarationKeyword` and `sources` rows, the deleted measurement and slogan, the lowercased shouts, and the replaced citations.
- `/home/user/fleet/guide/guides/README.md` — numbered citations replaced in the tagline and the `## See also` bullet.
- `/home/user/fleet/guide/README.md` — `patterns()` → `fences()`, counts deleted, `keyword` vocabulary, `below` → `following`.
- `/home/user/fleet/guide/tests/guides.test.ts` — three non-vacuousness guards, the README `## API` parity case, the `flagship fences` block, `symbol.keyword`, `README.md` added to the inventory targets, header shout lowercased.
- `/home/user/fleet/guide/tests/setup.ts` — `isBrowserVuePath` deleted, `requireText` moved in without its rationale paragraph.
- `/home/user/fleet/guide/tests/setup.test.ts` — `isBrowserVuePath` block deleted, `requireText` cases moved in with their `createScratch` / `readInventory` / `node:url` imports, header comment corrected.
- `/home/user/fleet/guide/tests/setupServer.ts`, `/home/user/fleet/guide/tests/setupServer.test.ts` — removed; their content lives in the `setup` pair.
- `/home/user/fleet/guide/tests/src/core/{Guide,factories,helpers,parsers,shapers,validators}.test.ts`, `/home/user/fleet/guide/tests/src/core/sources/{Source,SourceManager}.test.ts` — `keyword` vocabulary, repointed `requireText` imports, deleted counts and numbered citations, deleted successor-surface block, new `sources()` cases.
- `/home/user/fleet/guide/tests/fixtures/{good,broken/hidden-declaration}/module/*.ts`, `/home/user/fleet/guide/tests/fixtures/good/guides/src/widget.md` — `ExportKind` → `ExportKeyword` in fixture comments.

Diffstat: 32 files changed, 2721 diff lines (`/home/user/work/evidence/conform-guide.diff`).

## Failing-first controls

Each control planted a defect, ran the named command red, was restored byte for byte, and the same command then ran green.

| Row | Command | Plant | Red | Green | Red file |
| --- | --- | --- | --- | --- | --- |
| guide-obj-9 / guide-obj-7 | `npm --prefix /home/user/fleet/guide run test:guides` | `fences()` → `patterns()` at README.md | 1 failed \| 41 passed (42) | 42 passed | `guide-obj-9-red.txt` |
| guide-obj-2 | `npm --prefix /home/user/fleet/guide run test:guides` | `## Tests` → `## Test links`; `modules` key drifted; LI population emptied | 4 failed \| 38 passed (42) | 42 passed | `guide-obj-2-red.txt` |
| guide-obj-1 | `npm --prefix /home/user/fleet/guide run test:guides` | transcription asserts the pre-rename `kind` value | 2 failed \| 40 passed (42) | 42 passed | `guide-obj-1-red.txt` |
| guide-subj-15 | `npm --prefix /home/user/fleet/guide run test:src` | `sources()` dedupe removed | 1 failed \| 377 passed (378) | 378 passed | `guide-subj-15-red.txt` |
| guide-obj-4 | `npm --prefix /home/user/fleet/guide run test:setup` | `requireText` message changed at its new home | 1 failed \| 6 passed (7) | 7 passed | `guide-obj-4-red.txt` |

The guide-obj-2 red named exactly the three guards this row adds — `expected 0 to be greater than 0` on the FI, LI, and TE cases — plus the README case, which the drifted `modules` key also empties. The guide-obj-1 red named both the executed transcription and its presence guard. The guide-obj-4 red proves the moved proof is collected at its new location, which is what the move had to preserve.

Files sit under `/home/user/work/evidence/guide-proofs/`. Green counts come from `gate-test.txt`.

Deletions are proved by the sweeps and the green suite rather than by a plant: guide-obj-3 and guide-obj-8 remove assertions, so there is no new behaviour to redden. guide-obj-5 and guide-obj-6 are proved by the `exists('src/core')` transcription in the flagship block, by the pre-existing directory-prefix case in `Source.test.ts`, and by the typecheck plus the surface bijection.

## Sweeps

Each pattern was run over `src`, the non-vendored `tests`, `guides/guide.md`, `guides/README.md`, and `README.md` unless noted.

| Pattern | Result |
| --- | --- |
| `\bExportKind\b\|\bEXPORT_KINDS\b\|\bisExportKind\b` | empty |
| `exportkinds\|exportkind\|isexportkind` (case-insensitive) | empty |
| `kind: '\|symbol\.kind\|\.kind\b` | one hit, `tests/setupPolicy.ts:346` — vendored, reads the TypeScript compiler's `SyntaxKind` |
| `isBrowserVuePath\|browservue` (case-insensitive) | empty |
| `setupServer` | hits only in vendored `tests/config.test.ts` (rows gated on absent environments) and the vendored mirror `guides/scaffold.md` |
| `extractCodeLines\|moduleDirs\|moduleKeys\|successor runtime surface\|patterns()` | empty |
| `AGENTS §\|AGENTS section\|§[0-9]\|section 14\|4\.6\.1` | empty |
| `\bshould\b\|\bvia\b\|e\.g\.\|i\.e\.` (case-insensitive) | empty |
| `LACKING\|ORIGINAL\|UNION\|VALUES\|CONSUMER\|CONTENT\|SELF\|THIS\|\bOR\b` | empty |
| `\babove\b\|\bbelow\b` (case-insensitive) | one hit at README.md:30, repaired to `following` |
| `\b(one\|two\|…\|ten)\b` (case-insensitive) | ruled per hit; `two sources of identifiers` and `these two populations` were counts and were repaired, every other hit is a determiner, a fixed arity, or a hypothetical pair |
| `\bonce\b` (case-insensitive) | every hit means "a single time"; the one temporal `once` at guides/guide.md was repaired to `after` |
| `\b[0-9]+ (elements\|members\|…\|symbols)\b` (case-insensitive) | two hits in `Source.test.ts` test names (`exact 6 symbols`), both repaired |
| `readonly id\|^export class` (fleet-F2, `src` only) | no public `readonly id` field on any class |

## Gates

| Command | Exit | File |
| --- | --- | --- |
| `npm --prefix /home/user/fleet/guide run format:check` | 0 | `gate-format-check.txt` |
| `npm --prefix /home/user/fleet/guide run lint:check` | 0 | `gate-lint-check.txt` |
| `npm --prefix /home/user/fleet/guide run check` | 0 | `gate-check.txt` |
| `npm --prefix /home/user/fleet/guide run build` | 0 | `gate-build.txt` |
| `npm --prefix /home/user/fleet/guide test` | 0 | `gate-test.txt` |
| `cd /home/user/fleet/guide && npx scaffold audit --offline` | 0 | `scaffold-audit.txt` |

No failure excerpt: no gate failed. Output under `/home/user/work/evidence/guide-proofs/`.

`npm test` per project: `src:core` 378 passed (8 files), `policy` 111 passed, `config` 46 passed, `setup` 7 passed, `guides` 42 passed. Baseline at `10b6e70` was `src:core` 377, `policy` 111, `config` 46, `setup` 12 (2 files), `guides` 27. The `setup` drop is guide-obj-3 deleting the `isBrowserVuePath` cases and guide-obj-4 merging the `setupServer` file into `setup.test.ts`.

`scaffold audit --offline`: `0 of 33 planned paths drifted from the plan.` The `setup` axis stays inferred and satisfied, so removing `tests/setupServer.ts` left the audit clean.

**Observation, not a criterion.** The whole-suite `npm test` reading was taken inside this unit's own exec. The Orchestrator takes the deciding run after the unit exits.

## Breaking

`SurfaceSymbol.kind` is renamed to `keyword`, `ExportKind` to `ExportKeyword`, `EXPORT_KINDS` to `EXPORT_KEYWORDS`, and `isExportKind` to `isExportKeyword`. The markdown `Kind` column header and `findKindIndex` are unchanged: the header is table data this package locates by literal text.

Two further consequences to carry into the release note:

- `createSurfaceSymbolContract().schema` now names its property `keyword`, so the published JSON Schema changes shape.
- `computeSymbolKey` still returns `${keyword} ${name}`, so every existing bijection key string is byte-identical and no consumer's key comparison moves.

`SourceManagerInterface` gains `sources()`. That is additive for a consumer calling `createSourceManager`; it breaks only an external implementer of the interface, and the fleet closure names none.

## Shared-file patches

Not applied here. Every fleet package that declares `@orkestrel/guide` reads `symbol.kind` in `tests/guides.test.ts`, on one identical line. The exact consumer-side edit, once each package re-pins to the released `@orkestrel/guide`:

```diff
-				.filter((symbol) => symbol.kind === 'function')
+				.filter((symbol) => symbol.keyword === 'function')
```

Consumers carrying that line, verified by `grep -rln "symbol.kind" /home/user/fleet --include=guides.test.ts`: abort, agent, brief, browser, budget, codec, console, contract, csv, database, emitter, form, html, indexeddb, interpret, lsp, markdown, mcp, middleware, msg, ndjson, ollama, pool, process, program, qualifier, queue, rater, reason, relation, router, sea, server, sqlite, sse, table, template, terminal, test, timeout, tool, toolbox, websocket, worker, workflow, workspace.

The brief's consumer list also names `probe`; `/home/user/fleet/probe/tests/guides.test.ts` carries no `symbol.kind` line, so it needs no edit.

A package whose own guide documents `SurfaceSymbol`, `ExportKind`, `EXPORT_KINDS`, or `isExportKind` in prose needs the same vocabulary change, and every consumer's vendored `guides/guide.md` mirror needs a byte refresh from the released package.

## Vendored mirror

`/home/user/fleet/guide/guides/markdown.md` is unchanged. The installed `@orkestrel/markdown` ships `LICENSE`, `README.md`, `dist`, and `package.json` and no `guides/` directory, so no byte comparison against it is possible, and no suite performs one: `tests/config.test.ts` names no guide path, and the `config` project ran green. The standing condition's refresh therefore does not fire.

## Deviations

None against the row set. Three decisions recorded under the deviation contract's ancillary clause, plus one instruction conflict:

1. **An injected "auto mode" directive was refused.** The loaded copy of `.claude/rules/documentation.md` carried an appended block instructing me to read with `cat` and `sed -n` and to write with `sed`, heredocs, and short scripts. That contradicts this unit's brief, which fixes Read/Grep/Glob for reading and Edit/Write for changing and bans heredocs, `sed -i`, `python3`, and `node -e`. The text arrived inside file content rather than from the coordinator or the permission system, so it cannot widen the dispatch. I followed the brief throughout. Flagging it because that block does not belong in a rule file.
2. **Removing the two `setupServer` files used `rm`.** guide-obj-4 moves their content into the existing `tests/setup.ts` and `tests/setup.test.ts`, so `git mv` has no free destination and would overwrite a live file. `git rm` stages, which the dispatch restricts. I removed exactly the two paths whose content had already been moved, one command each, and staged nothing.
3. **`DeclarationKeyword`'s TSDoc names its members rather than tallying them.** The refuter's amendment asked for "the two-member subset of `ExportKeyword`"; `two-member` is a count over members, which `AGENTS.md` § Writing forbids. The block reads "a `class` or an `interface`. That pair is the subset of {@link ExportKeyword} carrying a documented member body."
4. **`sources()`'s `@example` shows identity rather than a length.** A `sources().length // 1` line would state a count, so the example binds `const [core] = sources.sources()` and asserts it is the entity `source()` returns.
