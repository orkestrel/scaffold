I'll read the scout brief and the governing instructions first, then return a bounded read-only distillate.This is a grok-bridge scout: read-only, no edits. Next I’ll load the grok role and the design inputs, then map the evidence.I’ll map the design diff, Guide’s parity surface, and the docs-parity packets in parallel.I’ll read the product-diff hunks and Guide/Markdown surfaces next, then locate the retained parity packets.I’ll trace host-path discovery, Guide rewrite helpers, and the Markdown types next.## Question

Map scaffold’s uncommitted guides-extraction product diff, Guide’s existing parity/rewrite surface, Markdown reuse candidates, and retained Guide packets needed before changing Guide’s parity mechanism.

## Evidence

### Scaffold product diff (from `tmp/pass/guides-extraction/design.status` and `design.diff`)

Product files in that status: `.claude/rules/documentation.md`, `guides/scaffold.md`, `host.json`, `package-lock.json`, `package.json`, deleted `scripts/docs.ts`, `src/core/compilers.ts`, `src/core/constants.ts`, `src/server/Materializer.ts`, `src/server/types.ts`, `tests/distribution.test.ts`, `tests/guides.test.ts`, `tests/src/bin/CLI.test.ts`, `tests/src/core/Compiler.test.ts`, `tests/src/core/compilers.test.ts`, the three core fixtures, `tests/src/core/helpers.test.ts`, `tests/src/server/Materializer.test.ts`, `tests/src/server/helpers.test.ts`.

**Host ownership.** `HOST_PATHS` is a file list. Script members are `scripts/deps.sh`, `scripts/cursor.sh`, `scripts/codex.sh`, `scripts/ollama.sh` (`src/core/constants.ts:133-154`). `scripts/docs.ts` is gone from that list and from `host.json` (`design.diff:183-189`). `RETIRED_HOST_PATHS` is `['scripts/docs.ts']` (`src/core/constants.ts:156-157`). `GUIDES_TEST_PATH` is `tests/guides.test.ts` and stays outside `HOST_PATHS` (`src/core/constants.ts:308-311`, `tests/src/core/helpers.test.ts:180-188`). Checkout `scripts/` holds only those four `.sh` files.

**Directory expansion.** `#roots` expands a host artifact only when its source is in `host.json` `roots`, or, with no manifest, when that source is a physical directory (`src/server/Materializer.ts:662-676`). `host.json` `roots` are canon/skill directories; `scripts` is not among them (`host.json:730-774`). `#expand` with a manifest hydrates `host.json` entries whose `destination` equals the source or sits under it (`src/server/Materializer.ts:685-687`).

**Foreign discovery.** `#derive` snapshots planned paths, then files under those expanded roots, selected canon copies, and each `RETIRED_HOST_PATHS` member whose `inferGroup` is in `plan.groups` (`src/server/Materializer.ts:637-651`). `scripts/` is an orchestration prefix (`src/core/constants.ts:251-258`), so `inferGroup('scripts/docs.ts')` is `orchestration` (`src/core/helpers.ts:301-303`). The live case writes `scripts/docs.ts` and `scripts/custom.ts` into an empty-artifact raw host: orchestration reports only `scripts/docs.ts`; `scripts/custom.ts` is absent; a tests-only plan reports nothing (`tests/src/server/Materializer.test.ts:800-824`).

**If `RETIRED_HOST_PATHS` is removed:** that loop is the only snapshot admission for `scripts/docs.ts`. File-level `HOST_PATHS` scripts do not expand to siblings. Packaged `host.json` `roots` do not include `scripts`. Nothing else in `#derive` or `listCanonPaths` (`src/server/helpers.ts:864-874`) would then discover a leftover `scripts/docs.ts`.

**If `HOST_PATHS` script members became the `scripts` directory:** hydration against current `host.json` would plan `scripts/codex.sh`, `scripts/cursor.sh`, `scripts/deps.sh`, `scripts/ollama.sh`. A packaged host still would not walk a target’s `scripts/` unless `scripts` also joined `host.json` `roots`. A raw host would treat `scripts` as a physical directory (`src/server/Materializer.ts:672-674`) and `#derive` would `listFiles` every file under the **target’s** `scripts/`, including a leftover `scripts/docs.ts` and a sibling such as `scripts/custom.ts`.

**Overwrite / deletion.** `remove` takes only `drift === 'foreign'`, tracked, and not `matchesProtectedPath` (`src/server/Materializer.ts:467-491`). Protected: git metadata, `src`, `app` (`src/server/helpers.ts:130-135`). Refusals: dirty worktree (`Materializer.ts:473-477`); preview/re-derivation mismatch on membership, group, or observed bytes (`Materializer.ts:882-929`). Untracked leftovers stay (`Materializer.ts:456-457`). `isRetainedPath` is presence-ownership for `.gitignore` and deferred paths, not scripts (`src/core/helpers.ts:246-247`). Birth-owned `scripts/service.sh` is a template artifact when vendors are declared, not a `HOST_PATHS` member (`src/core/compilers.ts:1544-1558`, `src/core/constants.ts:306`).

**Manifest script ownership.** Generated `test:guides` is `node --experimental-strip-types tests/guides.test.ts` when `blueprint.guides` (`src/core/compilers.ts:350-352`). No `docs` script (`tests/src/core/compilers.test.ts:638-644`). Writable `test:guides` accepts the prior Vitest-only command and keeps a customized value (`src/core/compilers.ts:2047-2055` in the diff; live `tests/src/core/compilers.test.ts:621-637`). Scaffold `package.json` has the same `test:guides` and no `docs` (`package.json:80`). Version in the diff is `0.0.64`.

**Package-owned script paths the plan preserves.** Exact-path retirement of `scripts/docs.ts` only; “does not own `scripts/` as a directory or admit unrelated scripts” (`guides/scaffold.md:1053-1056`). Proof sibling: `scripts/custom.ts` (`tests/src/server/Materializer.test.ts:806,821-824`). Birth-owned `scripts/service.sh` stays a vendor template, not a retired or vendored host file. `tests/guides.test.ts` is package-owned and not a script path.

**Docs-command stragglers (active product only).** Intentional retirement mentions: `RETIRED_HOST_PATHS` (`src/core/constants.ts:157`), `guides/scaffold.md:1053-1056`, `tests/src/core/helpers.test.ts:182`, `tests/src/server/Materializer.test.ts:800-824`, negative `npm run docs` / `docs` script assertions (`tests/src/core/compilers.test.ts:638-644`). `.claude/rules/documentation.md:39-46` names `npm run test:guides` and `--to` on the authored test. `tests/guides.test.ts` usage is `npm run test:guides [-- --to guide|--to source]` (`tests/guides.test.ts:44`). No `docs` script in scaffold `package.json`. Excluded: `.orkestrel/campaign/**`, vendored `guides/guide.md` (`guides/guide.md:578,825` still say `npm run docs`). `guides/mcp.md` “docs” is an MCP server name, not this command.

### Guide parity / rewrite / runtime

**Public barrel** re-exports types, constants, helpers, parsers, shapers, validators, `Guide`, `Source`, `SourceManager`, factories (`guide/src/core/index.ts:1-10`). Manifest `@orkestrel/guide@0.0.18`, core-only exports, `docs` still `node --experimental-strip-types scripts/docs.ts` (`guide/package.json:31-43,63,73`). Dependencies: `@orkestrel/contract`, `@orkestrel/markdown` (`guide/package.json:75-77`).

**Parity types.** `Drift` (`guide/src/core/types.ts:60-70`), `GuideInterface` / `SourceInterface` (`169-419`), `SourceExample`, `GuideFence`, `ManifestEntry`. `Guide` parses once via `createMarkdown(source).document` and caches projections; no filesystem (`guide/src/core/Guide.ts:18-55`). `Source` reflects a consumer-supplied `files` record (`guide/src/core/sources/Source.ts:88-91`; `SourceOptions` at `types.ts:428-436`).

**Compare / rewrite helpers.** `findDrift` (`helpers.ts:2392`). Guide-side: `replaceCell` / `replaceFence` locate a table or fence, read `markdown.span(node)`, splice `renderMarkdown(...)` (`helpers.ts:2680-2761`). Source-side: `replaceSummary`, `replaceExample`, `locateComment` (`2802+`, `2872+`, `2951`). Span splice: `spliceSpan` (`2532`). Renderers: `renderSurface`, `renderMethods`, `renderExample`. Manifest: `parseManifest` (`parsers.ts:30-31`). Governing guide: readers vs replacers, I/O in the caller (`guide/guides/guide.md:615-644`); SQ/MQ/EQ share `findDrift` (`603-604`).

**I/O boundary.** Library is I/O-free (`guide.md:619-621`). Guide’s `scripts/docs.ts` is the Node seed: `node:fs` glob/read/write, `--to guide|source`, inventory `src/**/*.ts`, `tests/**/*.ts`, `guides/*.md`, `*.md` (`guide/scripts/docs.ts:1-58`). Scaffold moved that shell into package-owned `tests/guides.test.ts` (`tests/guides.test.ts:44,226-227,269,391-393`).

### Markdown candidates (installed `@orkestrel/markdown@0.0.14` d.ts; canonical `markdown/src/core/types.ts` and `guides/markdown.md`)

Guide already imports: `coalesceText`, `createMarkdown`, `flattenText`, node guards, `renderMarkdown`, `walkNodes` (`guide/src/core/helpers.ts:27-41`).

| Candidate | Semantics | Pointers |
|---|---|---|
| `createMarkdown` | Parse string → handle with document, query, span, map | installed d.ts `238`, `1390-1448`; canonical types `606-665`; guide `markdown.md:210` |
| `MarkdownInterface.span` | Per-node original-string `MarkdownSpan`; absent on adopted AST | d.ts `1418-1436`; types `165-170`, `633-652`; `markdown.md:33,228` |
| `MarkdownSpan` | `{ start, end }` UTF-16 half-open on original source | d.ts `1596-1601`; types `165-170` |
| `walk` / `walkNodes` | Depth-first, pre-order, root-inclusive | d.ts `1392-1402`, `2377`; `markdown.md:136,225`. Guide uses `walkNodes` in `collectFences` (`helpers.ts:2281`) |
| `map` / `MarkdownRewriteHandler` | Bottom-up copy-on-write AST rewrite | d.ts `1437-1438`, `1516`; `markdown.md:229`. Guide rewrite today splices source via span, not `map` |
| `renderMarkdown` | Canonical markdown serializer | d.ts `1944`; `markdown.md:126`. Used by `replaceCell` / `replaceFence` |
| `flattenText` | Concatenate descendant text/code | d.ts `444`; `markdown.md:139`. Used for H2 names and fence titles |
| `HeadingNode` / `TableNode` / `CodeBlockNode` | ATX heading; GFM table `header`/`rows`/`align`; fenced `code`/`lang` | d.ts `496-502`, `2244-2257`, `48-54`; types `317-323`, `361-374`, `382+` |

Installed scaffold declaration is `@orkestrel/markdown` `^0.0.13` (`package.json:99`); resolved package is `0.0.14`. Artifact-stage pins Markdown `^0.0.14`.

### Retained Guide packets (scaffold `.orkestrel/campaign/docs-parity`; Guide has no `.orkestrel`)

Heading correction: `d7n-guide-heading-design-verdict.md`, `d7n-guide-heading-fix-verdict.md` (R1–R6; do not pack that candidate yet), `d7n-guide-heading-close-verdict.md` (accept R1–R6; `VERDICT: PASS`; land source and replacement bootstrap). Close evidence: `d7n-guide-heading-close-fix.{brief,report,diff,status}.md|txt`, `d7n-guide-heading-close-check-{brief,report}.md`, `d7n-guide-heading-close-distribution.log.txt`, `evidence/d7n-guide-heading-close-gates/`.

Artifact-stage acceptance: `d7n-guide-artifact-stage-verdict.md` (accept runtime-aligned Guide `0.0.18` tarball SHA256 `8828ee3dfecc15d72d863f82c938c95a64d4323aa4d674a2f620735e62c61afc`; canonical Guide `ef6ada9975d71ce97ac20239f473c02b77e84cd9`, matching `design.state`; unpublished). Pair with `d7n-guide-artifact-stage-{brief,report,verify-brief,verify-report,fix-brief,fix-report,smoke-fix-brief,smoke-fix-report}.md`. Adjacent bootstrap: `d7n-guide-path-bootstrap-verdict.md`.

## Distillate

Scaffold’s uncommitted change retires the vendored `scripts/docs.ts` seed and `docs` script. Parity rewrite lives in package-owned `tests/guides.test.ts` behind `test:guides`. Leftover `scripts/docs.ts` is an exact-path foreign candidate only while `RETIRED_HOST_PATHS` remains and the plan selects orchestration. Removing that list leaves no discovery path. Replacing the four `HOST_PATHS` script files with directory `scripts` would plan the four `.sh` host.json entries; it would walk a target’s whole `scripts/` only on a raw host (or if `scripts` joined packaged `roots`), which would also admit siblings the current plan preserves. Guide already owns I/O-free `findDrift` plus span-splice replacers over Markdown parse/span/render/walk. Its `scripts/docs.ts` is still the Node seed. Before changing Guide’s parity mechanism, read the heading-close PASS and artifact-stage accepted `0.0.18` artifact; Guide has no local campaign directory.

## Unknowns

- `design.diff` `package-lock.json` hunk not line-read (toolchain/optional-dep noise).
- Full body of `tests/guides.test.ts` rewrite, remaining `compilers.test.ts` / `Compiler.test.ts` / fixture hunks, and `tests/src/server/helpers.test.ts`.
- Guide `tests/`, `Source` reflection internals, and validators beyond types/exports.
- Markdown HTML conversion and `map`/`fold` besides span/walk/render.
- Packets other than heading and artifact-stage (path-bootstrap, policy-observe, final-instruments) not absorbed.
- Whether any installed-Markdown export beyond the table is used only from Guide tests.

## Journal

`tmp/cursor/d7n-guides-extraction-scout.jsonl`  
session `49dd544d-5c7e-4a9e-9c16-c1e9bc2cd617`

## Deviation

None. Read-only; no spawn; no source, git, or install mutation. Canonical Markdown types/guide read from the adjacent `markdown` checkout as the brief allowed, plus installed `node_modules/@orkestrel/markdown`.
