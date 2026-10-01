Veneer completed the registry phase for scaffold `0.0.82` on 2026-10-01. Every prescribed gate exited 0. Repair restored nothing, and the final offline audit matches the pack-phase final audit: no stale selected artifact and no blocking question. The accepted pack adoption is preserved.

**Phase and installation.** Phase: `registry`. Checkout: `C:/Users/mikes/WebstormProjects/veneer`. Installed package version: `0.0.82`. The manifest retains `^0.0.82`. The lockfile integrity equals the supplied published integrity. Publication time `2026-10-01T11:11:48Z` and shasum `e03f77b8fb1ae7af9b257b940e793944394a3d71` are the Orchestrator's supplied release evidence; neither was independently fetched. The guard-change reproduction was skipped as instructed.

Removed the installed scaffold directory through `rmSync` in a one-off TypeScript file under `tmp/units/`, after checking its resolved absolute path. Ran `npm install --ignore-scripts --prefer-online`; exit 0. The initial install retained the tarball resolution. Replaced that resolution with the registry URL, removed the installed directory through another checked TypeScript operation, and repeated the same install; exit 0, 1 package added, 178 packages audited, 0 vulnerabilities.

The final lockfile block is:

```json
		"node_modules/@orkestrel/scaffold": {
			"version": "0.0.82",
			"resolved": "https://registry.npmjs.org/@orkestrel/scaffold/-/scaffold-0.0.82.tgz",
			"integrity": "sha512-YOImdod9SjGo5Vwdq1FifP4ZKo74/gSsu8F2HgAnA50rXPDwXK3uRb5uTMtzk6a1fcqdXJLou/+X5dOxUh4uuw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@orkestrel/console": "^0.0.15",
				"@orkestrel/contract": "^0.0.18",
				"@orkestrel/emitter": "^0.0.11",
				"@orkestrel/markdown": "^0.0.16",
				"@orkestrel/process": "^0.0.14",
				"@orkestrel/template": "^0.0.9"
			},
			"bin": {
				"scaffold": "dist/bin/main.js"
			},
			"engines": {
				"node": ">=22.18.0"
			}
		},
```

Compared with the saved pack-phase lockfile, only the resolution line inside this block changed. Both a complete text comparison outside the block and a parsed comparison of every other entry passed. The baseline diff is:

```diff
- "resolved": "file:../scaffold/tmp/orkestrel-scaffold-0.0.82.tgz",
+ "resolved": "https://registry.npmjs.org/@orkestrel/scaffold/-/scaffold-0.0.82.tgz",
```

The ordinary `git diff -- package-lock.json` was also read. It includes the accepted pack changes against HEAD; `tmp/units/propagation-9-registry-lock.patch` isolates this phase against the saved pack lockfile.

**Audit readings.** Both `audit --offline --json` invocations exited 0: the reading after the initial install and the final reading after the registry install, repair, and catalog. Both report stale paths `[]` and identical questions. The following quotes their shared questions and provenance; aligned findings and hexadecimal payloads are omitted:

```json
{
  "stale": [],
  "questions": [
    {
      "field": "guides",
      "message": "The mirror at guides/guide.md differs from the hosted guide. Run catalog to refresh it.",
      "blocking": false
    },
    {
      "field": "scripts",
      "message": "The manifest at . declares planned scripts with differing values: test:src:vue, test:src:styles, test:src:bootstrap, test:src:tailwindcss, test:app:vue. Keep each declared value unchanged or replace them with the planned values: \"test:src:vue\" declares \"npm run build:src:browser && npm run build:src:vue && vitest run --config configs/src/vite.vue.config.ts --no-cache --reporter=dot\"; planned \"vitest run --config vite.config.ts --no-cache --reporter=dot --project src:vue\". \"test:src:styles\" declares \"npm run build:src:styles && vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot\"; planned \"npm run build:src:styles && vitest run --config vite.config.ts --no-cache --reporter=dot --project src:styles\". \"test:src:bootstrap\" declares \"npm run build:src:bootstrap && vitest run --config configs/src/vite.bootstrap.config.ts --no-cache --reporter=dot\"; planned \"npm run build:src:bootstrap && vitest run --config vite.config.ts --no-cache --reporter=dot --project src:bootstrap\". \"test:src:tailwindcss\" declares \"npm run build:src:tailwindcss && vitest run --config configs/src/vite.tailwindcss.config.ts --no-cache --reporter=dot\"; planned \"npm run build:src:tailwindcss && vitest run --config vite.config.ts --no-cache --reporter=dot --project src:tailwindcss\". \"test:app:vue\" declares \"vitest run --config configs/app/vite.vue.config.ts --no-cache --reporter=dot\"; planned \"vitest run --config vite.config.ts --no-cache --reporter=dot --project app:vue\".",
      "blocking": false
    }
  ],
  "provenance": {
    "versions": "floor",
    "host": "floor"
  }
}
```

The guide advisory and authored-script advisory are the same non-blocking questions recorded by the accepted pack report. The scaffold guide mirror has no question. Complete readings are `tmp/units/propagation-9-registry-audit-before.json` and `propagation-9-registry-audit-final.json`.

**Repair and preserved behaviour.** The final `repair --offline --json` exited 0. Its write/removal reading is:

```json
{"target":".","written":[],"removed":[],"provenance":{"versions":"floor","host":"floor"}}
```

Restored files: none. Required behaviour missing: none observed. No restored-file diff required review. The audited roadmap artifacts remain aligned:

| File | Preserved release behaviour |
| --- | --- |
| `tsconfig.json` | Sheet and Vue aliases on the selected axes. |
| `vite.config.ts` | Sheet projects, browser setup, conformance, dependency optimization, and mode-aware showcase/journey factories. |
| `configs/src/vite.core.config.ts` | Core external resolution through `resolveExternal`. |
| `configs/app/vite.showcase.config.ts` | Generated `appShowcase(mode)` wrapper. |
| `configs/helpers.ts` | External resolution, declaration rewriting, application selection, and page digests/stamps. |
| `.oxlintrc.json` | Anchored root rules and repaired framework/environment boundaries. |
| `.prettierignore` | Showcase exclusion. |
| `tests/config.test.ts` | Source-derived face enumeration and configuration/mutation controls. |

The authored stylesheet entry migration, mode-aware journey wrapper, and Node Vue assertions in conformance remain byte-identical to the accepted pack state. `tests/src/vue/index.test.ts` remains present; repair skipped it, and its Chromium proof passed. Deleted divergences: none. No file was deleted, no content-owned artifact was hand-edited, and `overwrite` was not run.

**Catalog reading.** `catalog --json` exited 0. The following JSON omits membership rows and guide bodies:

```json
{
  "target": ".",
  "written": [
    ".claude/agents/orkestrel.md"
  ],
  "skipped": [
    "guides/contract.md",
    "guides/guide.md",
    "guides/html.md",
    "guides/probe.md",
    "guides/scaffold.md",
    "guides/test.md",
    "package.json"
  ],
  "removed": [],
  "mirrors": [
    {
      "name": "@orkestrel/contract",
      "path": "guides/contract.md",
      "lookup": "found"
    },
    {
      "name": "@orkestrel/guide",
      "path": "guides/guide.md",
      "lookup": "found"
    },
    {
      "name": "@orkestrel/html",
      "path": "guides/html.md",
      "lookup": "found"
    },
    {
      "name": "@orkestrel/probe",
      "path": "guides/probe.md",
      "lookup": "found"
    },
    {
      "name": "@orkestrel/scaffold",
      "path": "guides/scaffold.md",
      "lookup": "found"
    },
    {
      "name": "@orkestrel/test",
      "path": "guides/test.md",
      "lookup": "found"
    }
  ],
  "provenance": {
    "versions": "live",
    "guides": "live"
  }
}
```

Each mirror came from the live guide lookup for its named package: contract, guide, html, probe, scaffold, and test. All mirror bytes already matched, so all were skipped. Catalog refreshed the generated scaffold version row in `.claude/agents/orkestrel.md` to `0.0.82`. The manifest was skipped. No hosted-floor fallback was reported.

**Gate readings.** The complete chain ran in the prescribed order, with output read unfiltered. No mutating lint or format convergence was needed. Gate failures: none.

| Command | Exit | Test reading |
| --- | --- | --- |
| `npm run format:check` | 0 | none |
| `npm run lint:check` | 0 | none; no boundary hits |
| `npm run check` | 0 | none |
| `npm run build` | 0 | none |
| `npm run build:showcase` | 0 | none |
| `npm run build:showcase:vue` | 0 | none |
| `npm test` | 0 | 425 passed, 2 skipped, 3 todo |
| `npm run test:distribution -- --mode release` | 0 | 10 passed, 5 skipped |

The full test chain took 50140 ms; release distribution took 12966 ms. Both journaled commands stayed within their 180-second caps. Their complete output is under `tmp/units/propagation-9-registry-{test,distribution}.{log,err}`. `git diff --check` also exited 0. Builds emitted the API Extractor compiler-version warning; distribution emitted Node's `DEP0190` warning. Neither command failed.

**Showcase stamps.** Each rebuilt page contains one stamp line equal to the SHA-256 digest of the page with that line removed. Appending a byte to the unstamped page rejected the equality control. Both pages remain byte-identical to the starting tree.

| Page | Verified stamp |
| --- | --- |
| `showcase/browser.html` | `7a536b96ba990eb17ca8bce010a4ed5ebae5ef136f488afb362a7e589c382e1f` |
| `showcase/vue.html` | `b67b3e01d1a645c9343ea71676e1598d285b0ffe9f58dfaef3c7eb1dbeef9cee` |

**Deviations and limits.** The install alone did not replace the tarball URL. The bounded resolution replacement and repeated clean install were necessary to install through the registry entry. npm also changed the root lockfile's scaffold declaration from its accepted pack value, `file:../scaffold/tmp/orkestrel-scaffold-0.0.82.tgz`, to `^0.0.82`. To satisfy the instruction that no entry outside the scaffold package block change, the root metadata was restored to the saved pack bytes after installation. Consequently, that root lock metadata retains its pack-phase `file:` declaration; `package.json` declares `^0.0.82`, and the installed package entry resolves to the registry. A subsequent npm install may normalize that root metadata again.

The initial verification script assumed space indentation, although the lockfile uses tabs. After correcting that probe, it exposed npm's root metadata change. The initial audit and repair ran before this lockfile discrepancy was settled; repair wrote nothing. After settling the discrepancy, repair, catalog, audit, and the gate chain ran in their required order. The final lock comparison passed.

Catalog's first terminal projection included guide payloads and was truncated; the saved JSON was read through a bounded projection for this report. A read of a guessed pack stamp-script path failed; a registry-specific stamp instrument supplied the evidence instead. These evidence-collection errors changed no adopted source file.

`ROADMAP.md` was not edited. Its propagation section already names `0.0.82` and `2026-10-01`, and its closure statements remain intact. Its historical sentence that the registry phase still replaces the lockfile was retained under the instruction to edit only a misstated release or date. No guard reproduction, subagent, commit, or publication occurred.

**Working-tree evidence.** Starting and ending status both contain the accepted 30 modified files and 5 untracked files. Both diff-stat readings measure 30 tracked files, 2449 insertions, and 1166 deletions. The untracked files remain `guides/contract.md`, `guides/html.md`, `guides/probe.md`, `guides/test.md`, and `src/styles/sheet.ts`.

A byte comparison against the starting baseline found changes only in `package-lock.json` and the catalog-generated `.claude/agents/orkestrel.md` row. Every other tracked and untracked file in the baseline is unchanged. Status, stats, and complete diffs are recorded under `tmp/units/propagation-9-registry-start*` and `propagation-9-registry-final*`.

The only write in the scaffold checkout is this report, `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/propagation-9-registry-report.md`. The pack-phase report is untouched. Working files remain under veneer's `tmp/units/propagation-9-registry-*` for the Orchestrator's sweep. Acceptance remains with the Orchestrator.
