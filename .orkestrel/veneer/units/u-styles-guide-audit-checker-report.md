<!-- workflow wf_550b90dc-9f6, agent a63c971905804ec31, retained 2026-09-20 -->

# Checker report — U-styles-guide guide audit (mechanical)

| Claim | Check | PASS/FAIL | Site |
|---|---|---|---|
| 1 | Heading order `## Examples` → `## Styles` → `### Files` → `### Scripts` → `### Departures from the workspace rows` → `## Tokens`, nothing else at that level between them | PASS | `guides/veneer.md:41,73,90,117,133,174` |
| 1 | Opening paragraph: `build:src:styles` compiles `src/styles/index.scss` to `dist/src/styles/index.css` | PASS | `guides/veneer.md:75-76`; corroborated by `configs/src/vite.styles.config.ts:34,36-41` (`outDir: 'dist/src/styles'`, `entry: src/styles/index.ts`, `cssFileName: 'index'`) |
| 1 | Opening paragraph: manifest `exports` names that file under `./styles` | PASS | `package.json:40` `"./styles": "./dist/src/styles/index.css"` |
| 1 | Opening paragraph: `sideEffects` lists `**/*.css` | PASS | `package.json:18-20` |
| 1 | `ts` fence body is exactly `import '@orkestrel/veneer/styles'` | PASS | `guides/veneer.md:82-84` |
| 1 | Following sentences state the specifier resolves to standalone CSS and a `<link>` consumer serves the resolved file | PASS | `guides/veneer.md:86-88` |
| 2 | Files table order: `src/styles/index.scss`, `src/styles/index.ts`, `configs/src/vite.styles.config.ts`, `configs/src/tsconfig.styles.json`, `tests/setupStyles.ts`, `tests/src/styles/` | PASS | `guides/veneer.md:94-101` |
| 2 | Each row's path exists in the tree | PASS | Glob confirmed `src/styles/index.scss`, `configs/src/vite.styles.config.ts`; `Read` confirmed `src/styles/index.ts`, `configs/src/tsconfig.styles.json`, `tests/setupStyles.ts`; `tests/src/styles/` contains 7 files including `tests/src/styles/index.test.ts` |
| 2 | `src/styles/index.ts` contains one `import './index.scss'` line and nothing else non-blank | PASS | `src/styles/index.ts:1` — file is exactly one line |
| 2 | `configs/src/tsconfig.styles.json`: `lib ["ESNext"]`, `types ["vite/client"]`, `include` over `src/styles/**/*.ts`, `noEmit: true` | PASS | `configs/src/tsconfig.styles.json:4-8` |
| 2 | `tests/setupStyles.ts` contains no `import '` line ending in `.css'` | PASS | Grep `^import .*\.css'` over `tests/setupStyles.ts` — no matches |
| 3 | `build:src` and `check:src` name the styles script last | PASS | `package.json:53-57,78` (`check:src` line 54 ends `check:src:styles`; `build:src` line 78 ends `build:src:styles`) |
| 3 | `test:src` ends with `&& npm run test:src:styles` | PASS | `package.json:61` |
| 3 | `test:src:styles` begins with `npm run build:src:styles &&` | PASS | `package.json:64` |
| 4 | `tsconfig.json` `compilerOptions.paths` has no `@src/styles` key | PASS | `tsconfig.json:23-29` (only `@src/core`, `@src/browser`, `@app/browser`, `@orkestrel/veneer/browser`, `@orkestrel/veneer`) |
| 4 | `.oxlintrc.json` `import/no-unassigned-import` allowlist entries all end in a stylesheet suffix | PASS | `.oxlintrc.json:43-48` — single entry `**/*.{css,less,sass,scss,styl,stylus,pcss,postcss,sss}` |
| 4 | `app/browser/main.ts` line 1 is `import '../../src/styles/index.scss'` | PASS | `app/browser/main.ts:1` |
| 4 | `vite.config.ts` calls `environmentBoundary(` with `'src/core'`, `'src/browser'`, `'app/browser'` and no other argument (including the `configs/src/vite.core.config.ts` wrapper) | PASS | `vite.config.ts:129` (`'src/browser'`), `vite.config.ts:170` (`'app/browser'`), `configs/src/vite.core.config.ts:10` (`'src/core'`) — no other `environmentBoundary(` call in either file |
| 4 | No `.oxlintrc.json` `overrides[].files` glob names `src/styles` | PASS | `.oxlintrc.json:72-458` — no `overrides[].files` entry contains `src/styles` |
| 4 | Root `projects` list in `vite.config.ts` names no `src:styles` | PASS | `vite.config.ts:402-414` — projects list is `srcCore, srcBrowser, appBrowser, policy, config, setup, setupBrowser, guides, conformance, distribution, probe` |
| 4 | `tests/setup.css` does not exist | PASS | Glob `tests/setup.css` — no files found |
| 4 | `package.json` names no `tailwindcss` or `@tailwindcss/vite` | PASS | `package.json:91-114` `devDependencies` — neither present |
| 4 | `node_modules/@orkestrel/scaffold/dist/host/tests/config.test.ts` exists | PASS | Glob confirmed the file exists |
| 4 | The departures section contains `mergeOverride` followed by the word `helper`, and contains neither `cannot remove` nor `output boundary` | PASS | `guides/veneer.md:146` "The root's `mergeOverride` helper is not that mechanism"; no `cannot remove` or `output boundary` string anywhere in `guides/veneer.md:133-172` |
| 6 | `rtl` (case-insensitive), section lines 73-173 and README paragraph | PASS (no hit) | Grep `rtl` over `guides/veneer.md` — no matches anywhere in the file |
| 6 | `](` — no relative link, section lines 73-173 of `guides/veneer.md` | PASS (no hit) | Grep `\](` over `guides/veneer.md` — matches only at lines 493-507 (the pre-existing `## Tests` section), none in lines 73-173 |
| 6 | `](` — no relative link, README paragraph | FAIL (hit) | `guides/README.md:17-18,23-24` — `[src/styles](../src/styles)`, `[tests/guides.test.ts](../tests/guides.test.ts)`, `[tests/src/styles](../tests/src/styles)`; all three are relative links, none is an absolute URL. Per `u-styles-guide-diff.patch.txt` lines 9-14/15-22, all three links were already present in the paragraph before this change and are unmodified by it |
| 6 | Substitution-table rows (`should`, `simply`, `easy`, `just`, `currently`, `utilize`, `leverage`, `via`, `in order to`, `e.g.`, `i.e.`, `etc.`, `performant`, `robust`, `allows you to`, `and/or`, `please`) | PASS (no hit) | Grep of the combined pattern over `guides/veneer.md` and `guides/README.md` — no matches |
| 6 | Digit counting a growable set (`two`, `three`, `six`, etc.) | PASS (no hit) | Grep of number words over `guides/veneer.md` — no matches |
| 7 | `tmp/audit/u-styles-guide-status.txt` lists exactly the two guide files | PASS | `tmp/audit/u-styles-guide-status.txt:1-2` — ` M guides/README.md`, ` M guides/veneer.md`, no other lines |
