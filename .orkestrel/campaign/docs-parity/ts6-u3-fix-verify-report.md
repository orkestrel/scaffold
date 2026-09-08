# Verify report — U3-fix (scaffold), the whole U3 change

## 1. `node node_modules/typescript/bin/tsc --version`

Exit 0.

```
Version 6.0.3
```

## 2. `npm run format:check`

Exit 0.

```
Checking formatting...

All matched files use the correct format.
Finished in 6419ms on 222 files using 4 threads.
```

## 3. `npm run lint:check`

Exit 0.

```
> @orkestrel/scaffold@0.0.63 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
```
(no violations reported)

## 4. `npm run check`

Exit 0.

```
> @orkestrel/scaffold@0.0.63 check
> tsc --noEmit --project tsconfig.json && npm run check:src
> @orkestrel/scaffold@0.0.63 check:src
> npm run check:src:core && npm run check:src:server && npm run check:src:bin
> @orkestrel/scaffold@0.0.63 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
> @orkestrel/scaffold@0.0.63 check:src:server
> tsc --noEmit -p configs/src/tsconfig.server.json
> @orkestrel/scaffold@0.0.63 check:src:bin
> tsc --noEmit -p configs/src/tsconfig.bin.json
```
(all four `tsc` invocations completed with no diagnostics)

## 5. `npm run build`

Exit 0. `build:inventory` regenerated `host.json` (121 files staged), as expected.

```
✓ built in 495ms
...
> @orkestrel/scaffold@0.0.63 build:src:bin
> vite build --config configs/src/vite.bin.config.ts
vite v8.2.2 building client environment for production...
transforming...
✓ 6 modules transformed.
rendering chunks...
computing gzip size...
dist/bin/main.js  82.83 kB │ gzip: 21.39 kB │ map: 151.05 kB

✓ built in 39ms

> @orkestrel/scaffold@0.0.63 build:host
build-host: staged 121 file(s) into dist/host

> @orkestrel/scaffold@0.0.63 build:inventory
build-inventory: staged 121 file(s) into host.json
```

## 6. `npm test`

Exit 0. All seven `vitest`/mocha-style sub-suites passed; no red row, so no re-run was triggered.

```
> test:src:core   — Test Files 9 passed (9)   Tests 385 passed (385)
> test:src:server — Test Files 5 passed (5)   Tests 432 passed (432)
> test:src:bin    — Test Files 3 passed (3)   Tests 245 passed (245)
> test:policy     — Test Files 1 passed (1)   Tests 77 passed (77)
> test:config     — Test Files 1 passed (1)   Tests 111 passed | 1 skipped (112)
> test:setup      — Test Files 2 passed (2)   Tests 70 passed (70)
> test:guides     — Test Files 1 passed (1)   Tests 17 passed (17)
```

## 7. `cmp dist/src/server/index.d.ts .../scaffold-server/rollup.d.ts`

Exit 0 — byte-identical.

## 8. `diff dist/src/core/index.d.ts .../scaffold-core/rollup.d.ts`

Exit 1 (expected, not a red gate). Hunks:

```
1246,1248c1246,1248
<                   core: "import { defineConfig, mergeConfig } from 'vite'\nimport { declarationRollup, environmentBoundary, outputBoundary } from '../helpers.js'\nimport { peers, srcCore, resolveWorkspacePath } from '../../vite.config.ts'\n\nexport default defineConfig(\n\tmergeConfig(srcCore(), {\n\t\tpublicDir: false,\n\t\tplugins: [\n\t\t\toutputBoundary('dist/src/core'),\n\t\t\tenvironmentBoundary('src/core'),\n\t\t\tdeclarationRollup({\n\t\t\t\tproject: resolveWorkspacePath('configs/src/tsconfig.core.json'),\n\t\t\t\ttypes: ['node'],\n\t\t\t}),\n\t\t],\n\t\tbuild: {\n\t\t\tlib: {\n\t\t\t\tentry: resolveWorkspacePath('src/core/index.ts'),\n\t\t\t\tformats: ['es', 'cjs'],\n\t\t\t\tfileName: (format: string) => (format === 'es' ? 'index.js' : 'index.cjs'),\n\t\t\t},\n\t\t\toutDir: 'dist/src/core',\n\t\t\trolldownOptions: {\n\t\t\t\texternal: (id: string) =>\n\t\t\t\t\tid.startsWith('node:') ||\n\t\t\t\t\tid.startsWith('@orkestrel/') ||\n\t\t\t\t\tpeers.some((peer) => id === peer || id.startsWith(peer + '/')),\n\t\t\t},\n\t\t},\n\t}),\n)\n";
<                   browser: "import { defineConfig, mergeConfig } from 'vite'\nimport { declarationRollup, rewriteCoreSpecifier } from '../helpers.js'\nimport { srcBrowser, resolveWorkspacePath } from '../../vite.config.ts'\n\n// The roll-up reaches src/core through a source path the tarball does not carry, so the rewrite\n// externalizes core through the package's own root export, on the final roll-up alone.\nexport default defineConfig(\n\tmergeConfig(srcBrowser(), {\n\t\tplugins: [\n\t\t\tdeclarationRollup({\n\t\t\t\tproject: resolveWorkspacePath('configs/src/tsconfig.browser.json'),\n\t\t\t\trewrite: rewriteCoreSpecifier,\n\t\t\t}),\n\t\t],\n\t}),\n)\n";
<                   server: "import { defineConfig, mergeConfig } from 'vite'\nimport { declarationRollup, rewriteCoreSpecifier } from '../helpers.js'\nimport { srcServer, resolveWorkspacePath } from '../../vite.config.ts'\n\n// The roll-up reaches src/core through a specifier the tarball does not carry, so the rewrite\n// externalizes core through the package's own published root export, on the final roll-up alone.\nexport default defineConfig(\n\tmergeConfig(srcServer(), {\n\t\tplugins: [\n\t\t\tdeclarationRollup({\n\t\t\t\tproject: resolveWorkspacePath('configs/src/tsconfig.server.json'),\n\t\t\t\trewrite: rewriteCoreSpecifier,\n\t\t\t}),\n\t\t],\n\t}),\n)\n";
---
>                   core: "import { defineConfig, mergeConfig } from 'vite'\nimport dts from 'vite-plugin-dts'\nimport { environmentBoundary, outputBoundary } from '../helpers.js'\nimport { peers, srcCore, resolveWorkspacePath } from '../../vite.config.ts'\n\nexport default defineConfig(\n\tmergeConfig(srcCore(), {\n\t\tpublicDir: false,\n\t\tplugins: [\n\t\t\toutputBoundary('dist/src/core'),\n\t\t\tenvironmentBoundary('src/core'),\n\t\t\tdts({\n\t\t\t\ttsconfigPath: resolveWorkspacePath('configs/src/tsconfig.core.json'),\n\t\t\t\tbundleTypes: {\n\t\t\t\t\textractorConfig: {\n\t\t\t\t\t\tcompiler: {\n\t\t\t\t\t\t\toverrideTsconfig: {\n\t\t\t\t\t\t\t\tcompilerOptions: { types: ['node'] },\n\t\t\t\t\t\t\t},\n\t\t\t\t\t\t},\n\t\t\t\t\t},\n\t\t\t\t},\n\t\t\t}),\n\t\t],\n\t\tbuild: {\n\t\t\tlib: {\n\t\t\t\tentry: resolveWorkspacePath('src/core/index.ts'),\n\t\t\t\tformats: ['es', 'cjs'],\n\t\t\t\tfileName: (format: string) => (format === 'es' ? 'index.js' : 'index.cjs'),\n\t\t\t},\n\t\t\toutDir: 'dist/src/core',\n\t\t\trolldownOptions: {\n\t\t\t\texternal: (id: string) =>\n\t\t\t\t\tid.startsWith('node:') ||\n\t\t\t\t\tid.startsWith('@orkestrel/') ||\n\t\t\t\t\tpeers.some((peer) => id === peer || id.startsWith(peer + '/')),\n\t\t\t},\n\t\t},\n\t}),\n)\n";
>                   browser: "import { defineConfig, mergeConfig } from 'vite'\nimport dts from 'vite-plugin-dts'\nimport { srcBrowser, resolveWorkspacePath } from '../../vite.config.ts'\n\n// vite-plugin-dts rolls this face into one declaration, and the roll-up reaches\n// src/core through a relative source path the tarball does not carry. The path\n// keeps each source module's own depth, so a module in a browser subfolder emits\n// one that leaves dist/src entirely. The following rewrite externalizes core\n// through the package's own published root export, on the final roll-up only.\nexport default defineConfig(\n\tmergeConfig(srcBrowser(), {\n\t\tplugins: [\n\t\t\tdts({\n\t\t\t\ttsconfigPath: resolveWorkspacePath('configs/src/tsconfig.browser.json'),\n\t\t\t\tbundleTypes: true,\n\t\t\t\tbeforeWriteFile: (path, content) => ({\n\t\t\t\t\tcontent: /[\\\\/]dist[\\\\/]src[\\\\/]browser[\\\\/]index\\.d\\.ts$/.test(path)\n{{replacement}}\n\t\t\t\t\t\t: content,\n\t\t\t\t}),\n\t\t\t}),\n\t\t],\n\t}),\n)\n";
>                   server: "import { defineConfig, mergeConfig } from 'vite'\nimport dts from 'vite-plugin-dts'\nimport { srcServer, resolveWorkspacePath } from '../../vite.config.ts'\n\n// vite-plugin-dts rolls this face into one declaration, and the roll-up reaches\n// src/core through a relative source path the tarball does not carry. The\n// following rewrite externalizes core through the package's own published root\n// export, on the final roll-up only.\nexport default defineConfig(\n\tmergeConfig(srcServer(), {\n\t\tplugins: [\n\t\t\tdts({\n\t\t\t\ttsconfigPath: resolveWorkspacePath('configs/src/tsconfig.server.json'),\n\t\t\t\tbundleTypes: true,\n\t\t\t\tbeforeWriteFile: (path, content) => ({\n\t\t\t\t\tcontent: /[\\\\/]dist[\\\\/]src[\\\\/]server[\\\\/]index\\.d\\.ts$/.test(path)\n{{replacement}}\n\t\t\t\t\t\t: content,\n\t\t\t\t}),\n\t\t\t}),\n\t\t],\n\t}),\n)\n";
2632a2633,2662
> 
>        /**
>         * Derives the declaration rewrite a published face's `beforeWriteFile` applies.
>         *
>         * @param name - The workspace's own bare package name.
>         * @returns The ternary consequent an emitted `vite.{browser,server}.config.ts`
>         * fills its `{{replacement}}` span with, indented for that span.
>         *
>         * @remarks
>         * `vite-plugin-dts` rolls a face into one declaration and keeps each source
>         * module's own relative depth, so a nested module emits a path that escapes
>         * `dist/src` and a flat one resolves only by luck. Both faces rewrite the same
>         * relative core path to the package's published root export, so the branch is
>         * derived once here. The extension alternation is what the permitted import
>         * spellings produce: an `@src/core` alias resolves to the core source module and
>         * prints `.ts`, while a relative import prints the `.js` specifier it was
>         * written with. The formatter keeps the call on one line only while the line it
>         * prints measures inside the vendored width, and the workspace name is what
>         * varies, so the shape is chosen by measuring the candidate: a tab prints as the
>         * vendored two columns, and the gate admits a name long enough to push the
>         * joined call past 100.
>         *
>         * @example
>         * ```ts
>         * import { nameToRewrite } from '@orkestrel/scaffold'
>         *
>         * nameToRewrite('router').includes("'@orkestrel/router'") // true
>         * ```
>         */
>        export declare function nameToRewrite(name: string): string;
```

## 9. `git status --short`

```
 M .claude/rules/workspace.md
 M .orkestrel/campaign/ts6-api/ledger.md
 M .orkestrel/campaign/ts6-api/orchestrator-measurements.md
 M configs/helpers.ts
 M configs/src/vite.core.config.ts
 M configs/src/vite.server.config.ts
 M guides/scaffold.md
 M host.json
 M src/core/compilers.ts
 M src/core/helpers.ts
 M src/core/templates.ts
 M tests/config.test.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/helpers.test.ts
?? .orkestrel/campaign/ts6-api/instruments/commit-u2.sh
?? .orkestrel/campaign/ts6-api/instruments/commit-u3.sh
?? .orkestrel/campaign/ts6-api/instruments/u7-integration.sh
?? .orkestrel/campaign/ts6-api/u3-audit-brief.md
?? .orkestrel/campaign/ts6-api/u3-audit-checker.md
?? .orkestrel/campaign/ts6-api/u3-audit-objective.md
?? .orkestrel/campaign/ts6-api/u3-audit-subjective.md
?? .orkestrel/campaign/ts6-api/u3-audit-verdict.md
?? .orkestrel/campaign/ts6-api/u3-declaration-rollup-report.md
?? .orkestrel/campaign/ts6-api/u3-declaration-rollup.diff.txt
?? .orkestrel/campaign/ts6-api/u3-declaration-rollup.status.txt
?? .orkestrel/campaign/ts6-api/u3-fix-audit-brief.md
?? .orkestrel/campaign/ts6-api/u3-fix-brief.md
?? .orkestrel/campaign/ts6-api/u3-fix-report.md
?? .orkestrel/campaign/ts6-api/u3-fix-verify-brief.md
?? .orkestrel/campaign/ts6-api/u3-fix.diff.txt
?? .orkestrel/campaign/ts6-api/u3-fix.status.txt
?? .orkestrel/campaign/ts6-api/u3-verify-brief.md
?? .orkestrel/campaign/ts6-api/u3-verify-report.md
?? .orkestrel/campaign/ts6-api/u7-audit-brief.md
?? .orkestrel/campaign/ts6-api/u7-audit-checker.md
?? .orkestrel/campaign/ts6-api/u7-audit-objective.md
?? .orkestrel/campaign/ts6-api/u7-audit-subjective.md
?? .orkestrel/campaign/ts6-api/u7-audit-verdict.md
?? .orkestrel/campaign/ts6-api/u7-fix-a-brief.md
?? .orkestrel/campaign/ts6-api/u7-fix-b-brief.md
?? .orkestrel/campaign/ts6-api/u7-integration-brief.md
?? .orkestrel/campaign/ts6-api/u7-integration-report.md
?? .orkestrel/campaign/ts6-api/u7-probe-rest.log.txt
?? .orkestrel/campaign/ts6-api/u7-probe-solo.log.txt
?? .orkestrel/campaign/ts6-api/u7-probe-typestage-report.md
?? .orkestrel/campaign/ts6-api/u7-probe-typestage.diff.txt
?? .orkestrel/campaign/ts6-api/u7-probe-typestage.status.txt
?? .orkestrel/campaign/ts6-api/u7-verify-brief.md
?? .orkestrel/campaign/ts6-api/u7-verify-report.md
```

GATES: GREEN
