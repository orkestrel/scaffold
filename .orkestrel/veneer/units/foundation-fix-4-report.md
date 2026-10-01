# Unit foundation-fix-4 report

## Deviation: stopped before any command ran

- **Expected.** A shell (Bash or PowerShell) to run the brief's commands: `npm run build:showcase`, `npm run build:showcase:vue`, `git diff --stat -- showcase`, `npx tsc --noEmit --project tsconfig.json`, `npx oxlint`, `npx oxfmt`, `npm run test:config`, `npm run test:showcase`, and `node` for a timing probe.
- **Found.** This lane had Read, Grep, Glob, Edit, and Write only. No shell tool was offered, and the `prove` tool from the `probe` MCP server was not offered either.
- **Evidence.** The tool list this lane received on 2026-09-30 names no Bash, PowerShell, or MCP tool.
- **Done.** The source edits in steps 1 through 5 of the brief (listed under "Files changed").
- **Not done.** Step 6 (rebuilding both pages, the second-build byte check, `npm run test:showcase`) and step 7 (format, typecheck, lint, `test:config`, `test:showcase`). The committed pages still carry the old stamps, so `npm run test:showcase` is expected to fail on "rebuilds to the committed page byte for byte" and "carries the digest of the page without its stamp line" until a lane with a shell runs both `build:showcase` scripts. No acceptance criterion has been checked by a run.
- **Hypothesis.** The lane was dispatched with a tool set that omits the shell. Re-dispatching with Bash, or having a `verifier` run the step 6 and step 7 commands against this tree, closes the unit without further source edits unless a gate refuses one.

## Files changed

- `configs/helpers.ts`: adds `stampPage(html)`, which inserts `\t\t<meta name="build-id" content="STAMP" />\n` at the start of the first line holding `</head>` after nothing but indentation. `STAMP` is `computeStamp(html)`, so removing that line returns the input. It throws `[orkestrel-showcase] A stamped page must close its head on its own line` when no such line exists. `computeStamp` is unchanged.
- `configs/app/vite.showcase.config.ts`: replaces the `transformIndexHtml` hook with a `generateBundle` hook. The plugin keeps the name `orkestrel-showcase-html`, is `enforce: 'post'`, sits after `viteSingleFile` in the array, and calls `stampPage` on every string `.html` asset. Registers the `showcase` project as an inline `test.projects` entry that replaces the surface's own test block (Node, `tests/setup.ts`, include `tests/showcase.test.ts` alone, `env: { NODE_ENV: 'production' }`). `orkestrel-showcase-name` and `outputBoundary` are unchanged. The opening comment gains the stamp order and the project's placement.
- `tests/showcase.test.ts` (new): for `production` → `showcase/browser.html` and `vue` → `showcase/vue.html`, runs two in-memory `build()` calls (`write: false`, `logLevel: 'silent'`) in `beforeAll` and asserts five cases. The first build equals the committed page. The committed page carries exactly one stamp line, and that stamp equals `computeStamp` of the page without the line. The second build equals the first. A scratch copy with one byte changed after `<title>` compares unequal to the build. A page with a forged stamp fails the stamp check.
- `tests/config.test.ts`: adds `stampPage` to the exported-helper list and the case "inserts the stamp of the page before the line that closes its head". The case covers the exact insertion, one `build-id` meta, removal returning the input, a changed input changing the output, and both refusals: a single-line head and no head.
- `package.json`: adds `test:showcase` (`vitest run --config configs/app/vite.showcase.config.ts --no-cache --reporter=dot --project showcase`) and runs it in `prepublishOnly` after `npm test` and before `test:distribution`. `test` is unchanged.
- `showcase/browser.html`, `showcase/vue.html`: not rebuilt (see "Deviation").

## Diffstat

Not produced, because `git diff --stat` needs a shell. `configs/helpers.ts` gains 29 lines and loses none (counted from the edit).

## Stamps

| Page                    | Before                                                             | After       |
| ----------------------- | ------------------------------------------------------------------ | ----------- |
| `showcase/browser.html` | `89c77c3d566b8c19976652ffa6d6619d1ece9d1ad92d9d25bae7d17e45ce85e3` | not rebuilt |
| `showcase/vue.html`     | `c336f336fa8ef6f3d7b1a98d945eab67b0e1e733ed64a89a443a9784dcbf3d71` | not rebuilt |

The old stamp line has three leading tabs because the old hook replaced `</head>` inside `\t</head>`. `stampPage` writes two tabs, as the brief specifies.

## Commands

None ran: no command, exit code, or test count exists for this unit.

## In-memory build duration per mode

Not measured. `BUILD_BUDGET` in `tests/showcase.test.ts` is set to `120_000` ms for the two-build hook and is not sized from a contended run as `tests.md` § Expensive proofs requires. Replace it with a value sized from the first contended `npm run test:showcase` run.

## Line endings

Read, not measured. `.gitattributes` sets `* text=auto eol=lf`, so a checkout on this host writes LF, and the gate compares bytes without normalizing. The step 6 check (`git diff --stat -- showcase` empty after a second build) must still confirm this.

## Findings from source reading that shaped the change

- Vitest starts each worker with `NODE_ENV` set to `process.env.NODE_ENV || 'test'` (`node_modules/vitest/dist/chunks/cli-api.CnMVyzaz.js:3808`). Vite resolves `isProduction` from `process.env.NODE_ENV === 'production'` and sets the build default only when `NODE_ENV` is unset (`node_modules/vite/dist/node/chunks/node.js:37260-37262`, `:37401`). An in-process build under Vitest would therefore emit a development bundle that differs from the CLI page. The project's `env: { NODE_ENV: 'production' }` overrides it, because Vitest spreads `project.config.env` last into the worker environment (`cli-api.CnMVyzaz.js:3717-3722`). Unverified by a run.
- `vite:singlefile` declares `enforce: 'post'` and assigns `htmlChunk.source` in `generateBundle` (`node_modules/vite-plugin-singlefile/dist/esm/index.js:67`, `:117`). `mergeOverride` appends override plugins in their written order, so the stamp hook runs after the inlining. Unverified by a run.
- Rolldown's `OutputAsset.source` is a writable property (`node_modules/rolldown/dist/shared/define-config-kIZKjX8Q.d.mts:134`).
- A module-scope helper in a test file trips the `policy` function rule. The test therefore builds inside the `beforeAll` callback, with no local helper.

## Prove closing lines

None. The `prove` tool was not available to this lane.

## Failing-first tests

None recorded, because no test could run. The step 6 run is the first reading. Before the pages are rebuilt, `tests/showcase.test.ts` is expected to fail "rebuilds to the committed page byte for byte" and "carries the digest of the page without its stamp line" for both modes, which gives the failing-first count for the old stamps.

## Probes

None written. `tmp/probes/` holds nothing from this unit.

## Shared-file patches

None. `configs/app/vite.journey.config.ts` needed no change.

## Observation: default-run placement

`workspace.md` § Test project matrix removes a project that drives a real build from the default run, so the gate stays out of `test` whatever its duration. Moving it into `test` needs a rule change.
