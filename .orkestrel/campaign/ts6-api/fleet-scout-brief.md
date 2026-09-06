Read-only scouting task. Do not edit any file. Do not run any command that writes to the filesystem.

Scope: every checkout directory under `/home/user/fleet/` (one row per package, name taken from its `package.json`). No package is excluded.

For each checkout under `/home/user/fleet/`, report:

1. `package.json`: the `typescript` range, the presence and range of `vite-plugin-dts`, `@microsoft/api-extractor`, `@orkestrel/scaffold`, `@orkestrel/probe`, and `@typescript/typescript6`; the `version` field; whether `src` publishes (a `files` or `exports` entry naming `dist/src`) and which faces (`core`, `server`, `browser`, `styles`, `bin`) the `exports` map names.
2. `package-lock.json`: whether `node_modules/vite-plugin-dts` or `node_modules/@typescript/typescript6` appears (line of the first hit).
3. The package-owned `configs/src/vite.*.config.ts` files: which exist, and for each whether it imports `vite-plugin-dts`, calls `dts(`, or calls `declarationRollup(` (`file:line`).
4. `tests/distribution.test.ts`: whether it exists and whether its head (first 40 lines) imports from the `typescript` specifier or from `node:module` `createRequire`, quoting the import line with its number.
5. Every file under `src/`, `tests/`, `configs/`, `app/`, and `scripts/` whose text contains `from 'typescript'`, `from "typescript"`, `require('typescript')`, `import ts `, or `node:vm` — path and line for each hit, or the word none.
6. Whether `tests/setupServer.ts` or `tests/setupConformance.ts` exists and, if so, whether it names `typescript` (`file:line`).
7. The git state: current branch, whether the tree is clean (`git status --short` line count), and the last commit's subject.

Then produce one closing table with one row per package: name, version, `vite-plugin-dts` present (yes/no), compiler importers count outside the generated proof (a number is permitted in this evidence table), `configs/src/vite.*.config.ts` shape (dts / declarationRollup / neither), proof head (compiler / createRequire / absent), tree clean (yes/no).

End with a coverage statement naming every directory walked and every pattern used, so the population searched is explicit.

Return distilled evidence with exact `file:line` pointers. Never paste raw file dumps. Do not state decisions, design opinions, or recommendations — evidence only.
