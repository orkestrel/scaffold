# Aggregate final cell driver offline check

The sealed driver remains unchanged. Its pre- and post-check SHA-256 are both `feef1e8b51e5fa21b46f6be74d11b5f5fb0533e3e4027a6bcc0ea4df8b5f050c`.

Commands ran from `C:/Users/mikes/WebstormProjects/scaffold`:

| Command | Exit | Duration | Output |
| --- | ---: | ---: | --- |
| `node --check tmp/units/aggregate-final-cell-driver.ts` | 0 | 0.085 s | No output. |
| `node node_modules/typescript/bin/tsc --noEmit --strict --target ES2024 --module NodeNext --moduleResolution NodeNext --types node --skipLibCheck tmp/units/aggregate-final-cell-driver.ts` | 1 | 0.109 s | `error TS5112: tsconfig.json is present but will not be loaded if files are specified on commandline. Use '--ignoreConfig' to skip this error.` |

Stopped at the first failure under the deviation contract. The q4-think0 dry invocation and q9-think0 invalid-cell control were not run; therefore their output, prospective plan, and no-write conditions remain unverified by this unit. No `--live` command, model request, source/build write, Git mutation, installation, or cleanup was performed. This check does not pass the acceptance criteria because the prescribed scoped compiler command failed before checking the driver.
