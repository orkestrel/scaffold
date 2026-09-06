# Brief — ts6-m2-instrument (author the mirror-refresh incremental measurement; the Orchestrator runs it alone)

## Role and engine

`builder`, Sonnet, a native Claude Code subagent. Scratch folder: `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6/m2/` (create it). Read `/home/user/scaffold/tmp/units/ts6-common-host.md` first and follow it.

## Objective

Write one script, `<scratch>/mirror-warm.sh`, that measures whether `tsc --incremental` keeps its warm cost when the checked tree is a mirror of the probe workspace that is refreshed between runs, and run it once to prove it works end to end. The timing numbers you observe are pessimistic (this host runs other units beside you); the Orchestrator re-runs the script alone afterwards, so your acceptance is that every step runs and reports, not the numbers.

## What the script does

1. Builds the mirror at `<scratch>/mirror/` by copying `/home/user/fleet/probe/src`, `/home/user/fleet/probe/configs`, `/home/user/fleet/probe/tsconfig.json`, and `/home/user/fleet/probe/package.json` (`cp -r`), and symlinks `<scratch>/mirror/node_modules` to `/home/user/fleet/probe/node_modules`. Nothing is written under `/home/user/fleet/probe`.
2. Writes `<scratch>/mirror/tmp-type.tsconfig.json`: `{ "extends": "./configs/src/tsconfig.core.json", "compilerOptions": { "noEmit": true, "declaration": false, "emitDeclarationOnly": false, "incremental": true, "tsBuildInfoFile": "./core.tsbuildinfo", "rootDir": "./src/core" }, "include": ["./src/core/**/*.ts"], "files": [] }`, and records `tsc --showConfig -p` over it once.
3. Runs `node /home/user/fleet/probe/node_modules/typescript/bin/tsc --noEmit --pretty false -p <scratch>/mirror/tmp-type.tsconfig.json` and times it with `date +%s%N` around the call, for these steps in order, printing `step, ms, exit, diagnostic-count` per step: `cold` (no buildinfo); `warm` (no change); `touch-all` (`find src -type f -exec touch {} +`, contents unchanged); `draft-replace` (append `export const zzDraft = 1` to `src/core/index.ts`); `draft-restore` (copy the original back); `draft-add` (write `src/core/zz-draft.ts` containing `export const n: number = 'x'`, so one diagnostic is expected); `draft-remove` (delete it); `refresh-all` (`cp -r` every mirrored file from the workspace again, so every mtime moves and every content is the same); `warm-after-refresh`.
4. Prints the buildinfo size after the cold step and after the last step, and `git -C /home/user/fleet/probe status --short` at the end (it must print nothing new).

## Output

`report.md` with the script's exact output from your one run, the `--showConfig` output, and any step that failed with why; retain `mirror-warm.sh`. State plainly that the numbers are the unit's own reading under load.
