All rows closed, gates green, audit clean, git status matches owned paths. Returning the appended section.

## Fix round 1

Closes the round-1 objective lane's refutations of claims 3, 4, and 6.

**Claim 3.** `src/core/types.ts:104`'s `GuideInterface.surface` doc block read "Lists every `## Surface` identifier + kind", quoting the pre-rename axis while `guides/guide.md:203` already read "identifier + keyword". Rewritten to "Lists every `## Surface` identifier + keyword — table rows union backticked entity headings."

A grep for `identifier + kind` over the tree returns no hit: no other guide sentence or `tests/guides.test.ts` presence guard quotes the old text. `\bkind\b`, case-insensitive, re-run over `src`, the non-vendored `tests`, `guides/guide.md`, `guides/README.md`, and `README.md`:

- `src`: four files hit — `validators.ts:13`, `Guide.ts:26`, `factories.ts:30` (the `@example` Markdown fence `| Name | Kind |`), and `helpers.ts:941-1243` (`findKindIndex`'s doc block and body, which locates a Surface table's `Kind` column by its literal header text). Every hit is the markdown `Kind` table header, permitted.
- `tests`: hits across `guides.test.ts`, `setup.test.ts`, `helpers.test.ts`, `Source.test.ts`, and the `tests/fixtures/**/widget.md` and `guide.md` fixtures are the same `Kind` table header in fixture markdown and in `@example` fences; `tests/fixtures/broken/wrong-kind/` is the permitted `wrong-kind` fixture directory and file name; `tests/src/core/Guide.test.ts:131-132` names the `wrong-kind` fixture in a test title and path; `tests/src/core/helpers.test.ts:471,478,488` uses `kind` as a local variable name whose value is a `SurfaceSymbol` with a `keyword` property — the identifier names the variable, not the renamed axis; `tests/setupPolicy.ts` is the vendored file, permitted, and reads the TypeScript compiler's `SyntaxKind` (`node.kind`) and its own `function-kind` / `data-kind` file-classification prose, unrelated to `SurfaceSymbol`.
- `guides/guide.md`: seven table-header hits (`| Name | Kind |` column headers across the Types, Functions, Classes, and other entity tables) plus `findKindIndex`'s row describing the same `Kind`-column lookup, plus two `@example` fences repeating the `| Name | Kind |` header. Every hit is the markdown `Kind` table header, permitted.
- `guides/README.md`, `README.md`: no hit.

**Claim 4.** Added two rows to § Sweeps for guide-obj-6 and guide-subj-13, covering the inline `'class' | 'interface'` union's former sites (now `DeclarationKeyword`) and `\bstateful\b`, which returns empty in the guide package's own prose.

**Claim 6.** Added a `database` entry to § Shared-file patches naming the sites read directly from `/home/user/fleet/database/tests/setupServer.ts` (lines 8, 205, 210, 240, 258, 260, 261, 264, 266, 329) and `/home/user/fleet/database/tests/setupServer.test.ts` (lines 337, 361, 376, 420, 427, 465) — a fuller set than the brief's shorter line list, each of the brief's named lines inside it — with the exact `ExportKind`/`symbol.kind` → `ExportKeyword`/`symbol.keyword` diff, and restated the fleet-wide verification sweep `ExportKind|EXPORT_KINDS|isExportKind|symbol\.kind` over `/home/user/fleet/*/tests/**/*.ts` and `/home/user/fleet/*/src/**/*.ts`, excluding `node_modules` and `/home/user/fleet/guide`. It returns the same forty-six `tests/guides.test.ts` consumers plus `database`'s two `setupServer` files.

### Gates

All exit 0: `format:check`, `lint:check`, `check`, `build`, `test` (`src:core` 378 passed, `policy` 111 passed, `config` 46 passed, `setup` 7 passed, `guides` 42 passed). `npx scaffold audit --offline` reports `0 of 33 planned paths drifted from the plan.` `git -C /home/user/fleet/guide status --short` lists only paths already under the unit's Files touched section, with `tests/setupServer.test.ts` and `tests/setupServer.ts` still deleted and unstaged.

No deviation fired.

Files touched: `/home/user/fleet/guide/src/core/types.ts` (the one sentence), `/home/user/scaffold/tmp/units/conform/conform-guide-report.md` (appended `## Fix round 1`).
