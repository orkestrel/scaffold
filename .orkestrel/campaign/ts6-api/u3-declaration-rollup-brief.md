# Brief — U3 declaration-rollup (scaffold)

## Role and engine

`implementer`, Claude Opus 5, a native Claude Code subagent. Sol's unit by work class, on the Opus `implementer` while the Codex bench is dark (recorded). Sole writer in `/home/user/scaffold`. Perform the assignment directly and spawn nothing.

## Objective

Scaffold's published faces roll their declarations into one `.d.ts` per face through a vendored Vite plugin, `declarationRollup`, in `configs/helpers.ts`, which emits with the workspace's `tsc` as a process and rolls up with `@microsoft/api-extractor`'s own engine, so that `vite-plugin-dts` appears in no `configs/` file and no in-process compiler API is used. The owner keeps one declaration file per face; U1 proved the recipe reproduces every face's shipped rollup on 6.0.3.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md` and `.claude/rules/` (`names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, `workspace.md` § Configuration authority, `portability.md` § Processes and executables, `documentation.md`, `writing.md`).
2. `/home/user/scaffold/.orkestrel/campaign/ts6-api/plan.md` § Decision 5 and § Re-baseline (U3's recipe, fixed by U1); `orchestrator-measurements.md` § U1; `dts-absorb-distillate.md` in full (how the plugin builds the extractor configuration, the post-processing order, the `import type` rule); `instruments/u1/api-extractor-invoke.cjs` and `instruments/u1/baseline.sh` (the working invocation, the exact override), `u1-declaration-baseline.log.txt`.
3. The code: `/home/user/scaffold/configs/helpers.ts` (the vendored leaf: `outputBoundary`, `environmentBoundary`, `environmentAssetSources`; it imports from `vite` and Node built-ins only), `configs/src/vite.core.config.ts`, `configs/src/vite.server.config.ts`, `vite.config.ts` (`srcCore`, `srcServer`, `peers`, `resolveWorkspacePath`), `configs/src/tsconfig.core.json`, `configs/src/tsconfig.server.json`, `package.json` (`build:src:core`, `build:src:server`, the `copy` script), `tests/config.test.ts` (the existing plugin tests), `src/core/helpers.ts` or wherever `nameToRewrite` lives (`grep -rn nameToRewrite src/`), `guides/scaffold.md` § the `nameToRewrite` row.

## What is fixed

- **The plugin.** `declarationRollup(options)` in `configs/helpers.ts`, beside `outputBoundary` and `environmentBoundary`, with single-word options: `project` (the absolute tsconfig path of the face), `types` (the `types` override for the extractor program; core passes `['node']`), `rewrite` (`(content: string) => string`, applied to the final rollup alone). At `closeBundle` it: (1) resolves the workspace's `typescript/bin/tsc` and runs `process.execPath tsc -p <project> --declaration --emitDeclarationOnly --noEmit false --outDir <scratch>` where `<scratch>` is a folder under the face's `dist` output (and is deleted after the rollup); (2) reads the face's resolved `lib` and `types` through `tsc --showConfig -p <project>` (core's `types` is the option); (3) invokes api-extractor through a deferred `await import('@microsoft/api-extractor')` inside the hook, never at module scope (the leaf must resolve in an app-only workspace that declares no api-extractor), with `projectFolder` = the workspace root, `packageJsonFullPath` = the workspace `package.json`, `mainEntryPointFilePath` = the emitted entry, `overrideTsconfig` = `{ compilerOptions: { types, lib, target: 'ESNext', module: 'ESNext', moduleResolution: 'bundler', skipLibCheck: true, strict: true }, files: [entry] }` (no `paths`, no `rootDir`, no `typescriptCompilerFolder`), `bundledPackages: []`, `dtsRollup.untrimmedFilePath` = `dist/src/<face>/index.d.ts`, every report and message off, `localBuild: true`; (4) applies `rewrite`; (5) removes the scratch emit. The recipe is the one U1 ran; its two failed attempts are in `orchestrator-measurements.md` § U1 and are not repeated.
- **The rewrite.** On a server or browser face `tsc` emits the core import as the literal `@src/core` (or a relative `../core/index.js` where authored so) and api-extractor keeps it external; the rewrite replaces both forms with the package name. Keep or reuse `nameToRewrite` where its contract fits; the vendored leaf itself imports nothing from `src/`, so the config file passes the function, or the plugin reads `name` from the workspace `package.json` as its default. Rule and record which.
- **Consumers.** `configs/src/vite.core.config.ts` and `vite.server.config.ts` call `declarationRollup` and import nothing from `vite-plugin-dts`; the `.d.cts` copy stays in the npm scripts.
- **Proof.** `tests/config.test.ts` drives the plugin over a fixture workspace the file already knows how to build (or over scaffold's own core face) and asserts the rollup exists, is one file, carries the rewritten package specifier on a server face, and that no other `.d.ts` remains under the face's `dist`; plus a diff of the rollup against the copy U1 produced at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6/u1/scaffold-core/rollup.d.ts` and `.../scaffold-server/rollup.d.ts` (read-only), which is the expected material output.
- **Portability.** Spawn with `process.execPath` and a JavaScript entry; no `.sh`; no shell string.

## Scope

- Owned: `/home/user/scaffold/configs/helpers.ts`, `configs/src/vite.core.config.ts`, `configs/src/vite.server.config.ts`, `tests/config.test.ts`.
- Off-limits: every other file, including `src/core/templates.ts` (the seeds are U6's), `src/core/constants.ts`, `package.json`, `host.json`, `guides/**`.
- Permitted commands: `npm run build:src:core`, `npm run build:src:server` (they write `dist/`, ignored by git), scoped `oxfmt --write` on owned files, `npm run test:config`, `npm run lint:check`, `npm run check`. Never `npm run build`, `npm install`, a tree-wide `format` or `lint --fix`, any discard-class git command, or a commit.

## Host facts

Linux, bash, Node v22.22.2, npm 10; typescript 6.0.3, vite 8.2.2, `@microsoft/api-extractor` 7.59.0 (bundled engine 5.9.3; it prints a version-newer warning that is not an error), `vite-plugin-dts` 5.0.3 still installed until U6 removes it. The tree is committed and clean apart from `tmp/`; U2 landed before you. Another writer works in `/home/user/fleet/probe`.

## Unknowns

Whether `closeBundle` runs after Vite has written the face's JavaScript so the scratch folder under `dist` is safe, or `writeBundle` is the right hook; measure with one build and report.

## Acceptance criteria, cheapest first

1. `grep -rn 'vite-plugin-dts' configs/` prints nothing; `grep -n "api-extractor" configs/helpers.ts` shows only the deferred `import(` inside the hook.
2. `npx oxfmt --config .oxfmtrc.json --check` over the owned files exits 0; `npm run lint:check` exits 0; `npm run check` exits 0.
3. `npm run build:src:core` and `npm run build:src:server` exit 0, `dist/src/core/index.d.ts` and `dist/src/server/index.d.ts` exist, no other `.d.ts` remains under those folders, and `diff -w` of each against U1's copy (comments and blank lines dropped) prints nothing; paste the commands.
4. `npm run test:config` exits 0 with the new proof present.

## Output

Write `/home/user/scaffold/tmp/units/ts6-u3-declaration-rollup-report.md`: the plugin's shape as landed (options, hook, the exact override), the rewrite ruling, each criterion's command with exit code and last lines, `git status --short` and `git diff --stat`, and which claims you flag. Return the same as your final message. No process diary.

## Deviation contract

Stop and report when a criterion needs an off-limits file, when the extractor cannot follow a symbol under the fixed override (paste the message), or when a gate fails outside the owned files. Ancillary choices (hook name, scratch folder name, helper names inside the file) are yours to make and record.
