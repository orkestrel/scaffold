<!-- workflow wf_45a3007b-190, agent a85c072a50af9da11, captured from journal.jsonl, 2026-09-06 -->

Script authored and run once successfully. Retained at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6/m2/mirror-warm.sh`, with the full run log at `<scratch>/run.log`. Report content follows (the report-file write was blocked by tooling policy, so this text is the report).

# Report — ts6-m2-instrument

Script: `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6/m2/mirror-warm.sh` (retained). Full run log at `<scratch>/run.log`.

The numbers below are this unit's own reading, taken on a host running other units beside it, and are pessimistic. The Orchestrator's own re-run alone is the number that matters; this run's job is to prove every step executes and reports.

## Mirror build and `--showConfig`

The mirror was built at `<scratch>/mirror/` by copying `src`, `configs`, `tsconfig.json`, and `package.json` from `/home/user/fleet/probe`, with `node_modules` symlinked to the probe's own. `tmp-type.tsconfig.json` was written as specified, and `tsc --showConfig -p` over it, run once, resolved `rootDir` to `./src/core`, `tsBuildInfoFile` to `./core.tsbuildinfo`, `incremental: true`, `noEmit: true`, and the `files` list to the files under `src/core`, confirming the extended `configs/src/tsconfig.core.json` chain resolved correctly inside the mirror.

```
{
    "compilerOptions": {
        "target": "esnext",
        "module": "esnext",
        "moduleResolution": "bundler",
        "allowImportingTsExtensions": true,
        "lib": ["esnext", "webworker"],
        "types": [],
        "moduleDetection": "force",
        "resolveJsonModule": true,
        "strict": true,
        "verbatimModuleSyntax": true,
        "noUncheckedIndexedAccess": true,
        "noUncheckedSideEffectImports": true,
        "exactOptionalPropertyTypes": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noImplicitOverride": true,
        "noFallthroughCasesInSwitch": true,
        "forceConsistentCasingInFileNames": true,
        "skipLibCheck": true,
        "noEmit": true,
        "paths": {
            "@src/core": ["./src/core/index.ts"],
            "@src/server": ["./src/server/index.ts"]
        },
        "declaration": false,
        "emitDeclarationOnly": false,
        "rootDir": "./src/core",
        "outDir": "./dist/src/core",
        "incremental": true,
        "tsBuildInfoFile": "./core.tsbuildinfo",
        "isolatedModules": true,
        "preserveConstEnums": true
    },
    "files": [
        "./src/core/constants.ts",
        "./src/core/errors.ts",
        "./src/core/helpers.ts",
        "./src/core/index.ts",
        "./src/core/shapers.ts",
        "./src/core/types.ts",
        "./src/core/validators.ts"
    ],
    "include": ["./src/core/**/*.ts"],
    "exclude": [
        "configs/src/../../node_modules",
        "configs/src/../../dist",
        "configs/src/../../tmp"
    ]
}
exit=0
```

## Timed step output (one run, this host under load)

```
step=cold ms=3182 exit=0 diagnostics=0
buildinfo-size-after-cold=21226
step=warm ms=475 exit=0 diagnostics=0
step=touch-all ms=489 exit=0 diagnostics=0
step=draft-replace ms=602 exit=0 diagnostics=0
step=draft-restore ms=551 exit=0 diagnostics=0
step=draft-add ms=565 exit=2 diagnostics=1
--- output for draft-add ---
src/core/zz-draft.ts(1,14): error TS2322: Type 'string' is not assignable to type 'number'.
--- end output for draft-add ---
step=draft-remove ms=522 exit=0 diagnostics=0
step=refresh-all ms=464 exit=0 diagnostics=0
step=warm-after-refresh ms=457 exit=0 diagnostics=0
buildinfo-size-after-last=21317
```

Every step ran and printed `step, ms, exit, diagnostic-count`. The `draft-add` step reported one diagnostic, `TS2322`, matching the deliberately wrong type in `zz-draft.ts`. Every other step reported an exit code of `0` and no diagnostics.

## Final probe status

`git -C /home/user/fleet/probe status --short` printed nothing, confirming the probe workspace received no writes from this run.

```
-- git -C /home/user/fleet/probe status --short --
exit=0
```

## Steps that failed

None. The script completed with `SCRIPT_EXIT=0`.
