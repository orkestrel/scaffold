# Unit V-supervisor — report

**Outcome: stopped.** Every step of the visit is complete except the step 4 install, which the
registry refuses. `npx scaffold audit` exits `0`, the whole gate chain is green, and every
`@orkestrel/*` range in the manifest equals the registry head with a caret — but `npm install`
cannot resolve that range set, so `node_modules` still holds the pre-visit resolution and the green
gates prove the source against the old packages rather than against the catalog.

Baseline `8ac9712` on `main`, unchanged. Nothing committed, staged, stashed, restored, or reset.

## Deviation: the catalog's own range set does not install

**Expected.** Step 4: re-pin every `@orkestrel/*` range to the catalog with a caret, then
`npm install`.

**Found.** `npm install` exits `1` with `ERESOLVE`.

```text
npm error code ERESOLVE
npm error While resolving: @orkestrel/supervisor@0.0.2
npm error Found: @orkestrel/server@0.0.17
npm error Could not resolve dependency:
npm error peer @orkestrel/server@"^0.0.16" from @orkestrel/middleware@0.0.18
```

**Evidence.** Two declared devDependencies disagree about `@orkestrel/server`, and `^0.0.N` pins one
exact release:

| Package                        | Peer requirement on `@orkestrel/server` |
| ------------------------------ | --------------------------------------- |
| `@orkestrel/mcp@0.0.27`        | `^0.0.17`                               |
| `@orkestrel/middleware@0.0.18` | `^0.0.16`                               |

`npm view @orkestrel/server versions` ends at `0.0.17`, so no published `server` satisfies both. I
probed each single relaxation in a scratch manifest outside this checkout, `npm install --dry-run`
each time:

- `@orkestrel/server` at `^0.0.16` → `ERESOLVE`, `peer @orkestrel/server@"^0.0.17" from
  @orkestrel/mcp@0.0.27`.
- `@orkestrel/middleware` at `^0.0.17` → `ERESOLVE`, `peer @orkestrel/server@"^0.0.14" from
  @orkestrel/middleware@0.0.17`.

Both `@orkestrel/mcp` and `@orkestrel/middleware` are used throughout `app/server` — 10 files import
middleware, 6 import mcp — so neither is droppable. The full peer sweep over the declared set found
no other conflict: `probe@0.0.11` wants `oxlint ^1.77.0`, `typescript ^6.0.0`, `vitest ^4.1.0`, and
`test@0.0.12` wants `vitest ^4.1.11`, all satisfied.

Every range the overwrite's own `declare` step wrote is at the registry head. The refusing pair was
written by that step, not by hand.

**Done.** Steps 1, 2, 3, and 5, plus the pre-overwrite rulings. The manifest carries the catalog
range set. The gate chain is green.

**Not done.** The install, and therefore every gate reading against the catalog set. `npm ls
@orkestrel/test` reads `0.0.10`, not `0.0.12`.

**Hypothesis.** `@orkestrel/middleware@0.0.18` published before `@orkestrel/server@0.0.17` and its
`server` peer range was never re-pinned, so the fleet's published set has been uninstallable since
that release. The fix is a `@orkestrel/middleware` release declaring `@orkestrel/server ^0.0.17`;
nothing in supervisor can close it.

I did not run `--legacy-peer-deps` or `--force`, and added no `overrides`. Each would rewrite the
committed lockfile with a tree npm reports as invalid, and would make the gates prove a resolution
nobody chose.

## What is installed, against what is declared

`node_modules` is the pre-visit resolution plus `@orkestrel/scaffold@0.0.60`, which the step 1
install placed before the overwrite ran. Read every gate result below against this table.

| Package                 | Declared  | Installed |
| ----------------------- | --------- | --------- |
| `@orkestrel/scaffold`   | `^0.0.60` | `0.0.60`  |
| `@orkestrel/sse`        | `^0.0.5`  | `0.0.5`   |
| `@orkestrel/agent`      | `^0.0.19` | `0.0.16`  |
| `@orkestrel/budget`     | `^0.0.8`  | `0.0.7`   |
| `@orkestrel/contract`   | `^0.0.15` | `0.0.12`  |
| `@orkestrel/database`   | `^0.0.12` | `0.0.11`  |
| `@orkestrel/emitter`    | `^0.0.8`  | `0.0.7`   |
| `@orkestrel/form`       | `^0.0.3`  | `0.0.2`   |
| `@orkestrel/guide`      | `^0.0.15` | `0.0.12`  |
| `@orkestrel/html`       | `^0.0.7`  | `0.0.4`   |
| `@orkestrel/mcp`        | `^0.0.27` | `0.0.20`  |
| `@orkestrel/middleware` | `^0.0.18` | `0.0.16`  |
| `@orkestrel/ndjson`     | `^0.0.8`  | `0.0.7`   |
| `@orkestrel/ollama`     | `^0.0.13` | `0.0.10`  |
| `@orkestrel/probe`      | `^0.0.11` | `0.0.2`   |
| `@orkestrel/process`    | `^0.0.9`  | `0.0.4`   |
| `@orkestrel/router`     | `^0.0.12` | `0.0.10`  |
| `@orkestrel/sea`        | `^0.0.13` | `0.0.9`   |
| `@orkestrel/server`     | `^0.0.17` | `0.0.14`  |
| `@orkestrel/terminal`   | `^0.0.13` | `0.0.11`  |
| `@orkestrel/test`       | `^0.0.12` | `0.0.10`  |
| `@orkestrel/tool`       | `^0.0.12` | `0.0.11`  |
| `@orkestrel/workflow`   | `^0.0.16` | `0.0.13`  |

`npm ls @orkestrel/test`:

```text
@orkestrel/supervisor@0.0.2 C:\Users\mikes\WebstormProjects\supervisor
`-- @orkestrel/test@0.0.10 invalid: "^0.0.12" from the root project
```

**The duplicate-contract typecheck.** `npm ls @orkestrel/contract` reports 43 rows carrying three
distinct versions: `0.0.12` at the root, plus nested `0.0.13` and `0.0.15` copies. `npm run check`
exits `0` across all six TypeScript projects with that graph installed, so the leading and trailing
contract copies do not read as distinct types here. The reading is from the stale tree; it is not
the catalog set's answer, and nothing proves the catalog set until the install resolves.

## Ranges before and after

Runtime `dependencies` — moved published surface, so this package bumps and publishes on its own
account:

| Package               | Before    | After     | Registry |
| --------------------- | --------- | --------- | -------- |
| `@orkestrel/contract` | `^0.0.12` | `^0.0.15` | `0.0.15` |
| `@orkestrel/database` | `^0.0.11` | `^0.0.12` | `0.0.12` |
| `@orkestrel/emitter`  | `^0.0.7`  | `^0.0.8`  | `0.0.8`  |
| `@orkestrel/process`  | `^0.0.4`  | `^0.0.9`  | `0.0.9`  |
| `@orkestrel/workflow` | `^0.0.13` | `^0.0.16` | `0.0.16` |

Development `devDependencies`:

| Package                 | Before    | After     | Registry |
| ----------------------- | --------- | --------- | -------- |
| `@orkestrel/agent`      | `^0.0.16` | `^0.0.19` | `0.0.19` |
| `@orkestrel/budget`     | `^0.0.7`  | `^0.0.8`  | `0.0.8`  |
| `@orkestrel/form`       | `^0.0.2`  | `^0.0.3`  | `0.0.3`  |
| `@orkestrel/guide`      | `^0.0.12` | `^0.0.15` | `0.0.15` |
| `@orkestrel/html`       | `^0.0.4`  | `^0.0.7`  | `0.0.7`  |
| `@orkestrel/mcp`        | `^0.0.20` | `^0.0.27` | `0.0.27` |
| `@orkestrel/middleware` | `^0.0.16` | `^0.0.18` | `0.0.18` |
| `@orkestrel/ndjson`     | `^0.0.7`  | `^0.0.8`  | `0.0.8`  |
| `@orkestrel/ollama`     | `^0.0.10` | `^0.0.13` | `0.0.13` |
| `@orkestrel/probe`      | `^0.0.2`  | `^0.0.11` | `0.0.11` |
| `@orkestrel/router`     | `^0.0.10` | `^0.0.12` | `0.0.12` |
| `@orkestrel/scaffold`   | `^0.0.50` | `^0.0.60` | `0.0.60` |
| `@orkestrel/sea`        | `^0.0.9`  | `^0.0.13` | `0.0.13` |
| `@orkestrel/server`     | `^0.0.14` | `^0.0.17` | `0.0.17` |
| `@orkestrel/sse`        | `^0.0.5`  | `^0.0.5`  | `0.0.5`  |
| `@orkestrel/terminal`   | `^0.0.11` | `^0.0.13` | `0.0.13` |
| `@orkestrel/test`       | `^0.0.10` | `^0.0.12` | `0.0.12` |
| `@orkestrel/tool`       | `^0.0.11` | `^0.0.12` | `0.0.12` |

I re-read every one of these against `npm view <name> version` after the overwrite rather than
against the catalog table, which still prints `@orkestrel/scaffold 0.0.59`. Every declared range
equals the registry head with a caret. Only the `@orkestrel/scaffold` row was written by hand, in
step 1; the overwrite's `declare` step wrote the rest.

The overwrite also raised foreign toolchain floors on its own account: `@types/node` `^26.2.0` →
`^26.4.1`, `oxfmt` `^0.64.0` → `^0.66.0`, `oxlint` `^1.79.0` → `^1.81.0`, `vite-plugin-dts`
`^5.0.3` → `^5.1.0`, `vue` `^3.5.41` → `^3.5.42`, `vue-tsc` `^3.3.10` → `^3.3.11`. Those raised
floors are also uninstalled, for the same reason.

**Registry head for this package: `0.0.1`.** `npm view @orkestrel/supervisor version` → `0.0.1`,
`dist-tags.latest` → `0.0.1`, and the published version list ends there. The local manifest already
declares `0.0.2`, so this checkout is one unpublished version ahead of the registry. I moved no
version.

## The pre-overwrite rulings

### `app:browser:integration` — moved to `tests/integration/app/**` with its own config

The floor's `app:browser` include is `tests/app/browser/**/*.test.ts` with no exclude, so after the
overwrite it would have collected the Node and Playwright suites as in-page browser tests. They
moved out of the `tests/app` axis entirely:

| From                                                        | To                                          |
| ----------------------------------------------------------- | ------------------------------------------- |
| `tests/app/browser/integration/setup.ts`                    | `tests/integration/app/setup.ts`            |
| `tests/app/browser/integration/integration.test.ts`         | `tests/integration/app/application.test.ts` |
| `tests/app/browser/integration/clients/integration.test.ts` | `tests/integration/app/clients.test.ts`     |
| `tests/app/browser/integration/journey/integration.test.ts` | `tests/integration/app/journey.test.ts`     |
| `tests/app/browser/integration/roster/integration.test.ts`  | `tests/integration/app/roster.test.ts`      |
| `tests/app/browser/integration/users/integration.test.ts`   | `tests/integration/app/users.test.ts`       |

Their new home is `configs/vite.integration.config.ts`, one project outside the planned set, built
from the planned `appServer` factory's own alias table so the workspace keeps a single
`tsconfig.json` `paths` derivation. Its script is `test:app:integration`, and `test:app` calls it
after the three planned app projects, so the suites stay inside `npm test` exactly as they were.

The script declares no `--project`, deliberately. `scaffold audit` reads every manifest script that
mentions `vitest` and refuses the `configs` group for any `--project` name the planned
`vite.config.ts` does not register. It never reads `--config`, so a `--project` naming this config's
project would have re-raised the refusal this ruling exists to clear.

The script is named `test:app:integration` rather than `test:integration` because the vendored
`tests/config.test.ts` owns the latter name: it asserts `test:integration` is `undefined` unless
`tests/integration.test.ts` exists. I found that by running the suite — `test:integration` failed
`tests/config.test.ts:536` with `expected 'npm run build:app && vitest run --con…' to be
undefined`, and the rename took it green.

### `tests/app/browser/integration.test.ts` — moved to `tests/app/browser/contrast/integration.test.ts`

This file is the in-page contrast portfolio proof, not one of the Node suites: it drives
`vitest/browser` and `mountShell`, and it belongs in the `app:browser` project. The brief asks for
the canonical path to be free for a later unit's browser-project journey suite, so it moved — but it
could not simply be renamed. The floor `tests/setupPolicy.ts` enforces a module mirror over
`tests/{app,src}/**/*.test.ts` and exempts exactly one basename, `integration.test.ts`. A
`contrast.test.ts` under `tests/app/browser` would have required an `app/browser/contrast.*` module
that does not exist. Moving the file into its own directory under the reserved basename keeps it in
the browser project, keeps it mirror-exempt, and frees the canonical path.

### `guides` — merged into the defining path `tests/guides.test.ts`

The floor `guides` project includes exactly `tests/guides.test.ts`, and that file's presence is what
selects the project at all. `tests/guides/src/parity.test.ts` and `tests/guides/src/readme.test.ts`
merged into it, with one deduplicated import block reaching `./setupGuides.js`, and `tests/guides/`
was removed. The merged suite runs 412 tests.

Every reference to the moved paths moved with them: `guides/README.md`, the tests section of
`guides/src/supervisor.md` (which also named the moved `integration/integration.test.ts`), and the
localized dependency guides under `guides/src/` that linked the old parity path.

### `service:*` — one project, and each suite names its own service

The floor declares one `service` project over `tests/service/**/*.test.ts` with `tests/setup.ts` and
`tests/setupService.ts` as its setup files, and the eight per-provider factories leave with the
replaced config.

**I did not carry the selection on `SUPERVISOR_SERVICE_PROVIDER`, and this is a deliberate departure
from the brief's named mechanism.** The brief asks for the variable to be read in the one project's
setup and set by the scripts. A script cannot set it portably: `.claude/rules/portability.md`
§ Scripts and packaging requires every `package.json` script to be a portable command, and an
environment-prefixed command is not one. I ran it rather than assuming — a throwaway package with
`"probe": "SUPERVISOR_SERVICE_PROVIDER=claude node read.cjs"` on this Windows host reports:

```text
'SUPERVISOR_SERVICE_PROVIDER' is not recognized as an internal or external command,
operable program or batch file.
```

Vitest exposes no environment flag either; `--mode` is the only portable selector, and it would keep
the same second label.

So the selection moved to where the fact already lives. Each suite already names its provider in the
adapter it constructs and in its `reportServiceModel` call, so it now names it once more:

```ts
const model = await prepareService('claude')
reportServiceModel('claude', model)
```

`tests/setupService.ts` gains the `ServiceProvider` union and `prepareService`, which routes
`ollama` to the daemon warmup and every CLI provider to `prepareServiceProvider`, now taking the
provider as a parameter rather than reading the environment. The module-scope `SERVICE_MODEL`
constant and its top-level await are gone, which is what lets `tests/service/sea/**` share the one
project at all: under the old shape that suite would have loaded a setup file that throws, because
its service is a built executable and it carries no provider.

The script mapping, each row proved by `vitest list` to select exactly its own suite:

| Script                          | Selection                                              |
| ------------------------------- | ------------------------------------------------------ |
| `test:service`                  | `--project service` — every live-service suite         |
| `test:service:claude`           | `--project service tests/service/claude`               |
| `test:service:codex`            | `--project service tests/service/codex`                |
| `test:service:cursor`           | `--project service tests/service/cursor`               |
| `test:service:claude-inference` | `--project service tests/service/inference/claude`     |
| `test:service:codex-inference`  | `--project service tests/service/inference/codex`      |
| `test:service:cursor-inference` | `--project service tests/service/inference/cursor`     |
| `test:service:ollama`           | `--project service tests/service/ollama`               |
| `test:service:sea`              | `npm run sea &&` `--project service tests/service/sea` |

`test:services` is gone: with one project it named exactly what `test:service` now runs. The
per-provider `environmentBoundary` plugins left with the factories — that fence is a source-graph
check the `check:src:*` and `check:app:*` projects already carry.

### The showcase — carried in `configs/app/vite.demo.config.ts`

The planned `appShowcase` factory keeps the single-file plugins and the showcase build options but
inputs `app/browser/index.html`, and drops `base: './'` and `server.open`. This workspace ships a
separate `app/browser/showcase.html` entry with its own script and its own content-security policy,
so building the planned wrapper would have replaced the showcase with the application and published
that to `demo/showcase.html`.

The three lost options moved to `configs/app/vite.demo.config.ts`, which merges them over
`appShowcase()`, and the maintainer-owned `showcase` and `build:showcase` scripts point at it.
`configs/app/vite.showcase.config.ts` stays exactly as the plan writes it: its presence is what makes
this a showcase workspace, and the vendored `tests/config.test.ts` requires and validates it. An
extra `configs/app/vite.*.config.ts` stays in that proof's found population and is ignored before its
content is read, and the closing audit reports the new file as neither drift nor foreign.

`npm run build:showcase` exits `0` and writes `dist/showcase/showcase.html`, 1,171.30 kB.

**A finding this visit did not create.** `npm run show` copies `dist/showcase/index.html`, which this
build does not produce and the pre-overwrite config did not produce either — both configs set `root`
to `app/browser` and input `showcase.html`, so the emitted page has always been `showcase.html`.
**Owner: supervisor**, as a one-token correction to a maintainer-owned script.

## The read-only audit

`npx scaffold audit` before any write, exit `1`. Its questions:

```text
scripts: The manifest at . does not declare planned scripts: test:probe, test:bench, test:distribution.
scripts: The manifest at . declares a planned script with a differing value: test:app:server.
projects: The manifest at . names Vitest projects the planned configuration does not register:
  app:browser:integration, guides, service:claude, service:claude-inference, service:codex,
  service:codex-inference, service:cursor, service:cursor-inference, service:ollama, service:sea.
setup: The target at . carries test setup modules that no proof covers: tests/setup.ts,
  tests/setupApplicationServer.ts, tests/setupBrowser.ts, tests/setupBrowserServer.ts,
  tests/setupGuides.ts, tests/setupService.ts.
dependencies: @types/node declares the floor ^26.2.0, while the registry serves 26.4.1 within major 26.
dependencies: oxfmt declares the floor ^0.64.0, while the registry serves 0.66.0 within major 0.
dependencies: oxlint declares the floor ^1.79.0, while the registry serves 1.81.0 within major 1.
dependencies: typescript declares major 6, while the registry serves major 7.
dependencies: vite-plugin-dts declares the floor ^5.0.3, while the registry serves 5.1.0 within major 5.
dependencies: vue declares the floor ^3.5.41, while the registry serves 3.5.42 within major 3.
dependencies: vue-tsc declares the floor ^3.3.10, while the registry serves 3.3.11 within major 3.
```

Drift: `13 of 57 planned paths drifted from the plan. Audit compared bytes at 32, existence at 5, and
nothing at 20. The plan does not own 85 further paths beneath its groups.`

- `stale`: `vite.config.ts`, `configs/src/vite.core.config.ts`, `configs/src/vite.server.config.ts`,
  `configs/policy.ts`, `.oxlintrc.json`, `.prettierignore`, `tests/setupPolicy.ts`,
  `tests/policy.test.ts`, `tests/config.test.ts`, `AGENTS.md`, `CLAUDE.md`
- `missing`: `tests/distribution.test.ts`, `.claude/agents/orkestrel.md`
- `foreign`: 85 paths — `.mcp.json`, `.agents/orchestration.md`, every `.agents/skills/**` file,
  every `.claude/agents/*.md` (the prepare commit had already removed `orkestrel.md`), every
  `.claude/rules/*.md`, every `.claude/skills/*/SKILL.md`, every `.codex/agents/*.toml`,
  `.codex/config.toml`, `.cursor/mcp.json`, `.cursor/rules/orchestration.mdc`

Plus 21 `differs from` range lines matching the preceding range tables.

After the rulings, a second read-only audit still exits `1` on the same drift, and the `projects`
question is gone — the refusal that would have blocked the write was cleared before the write.

## The overwrite

`npx scaffold overwrite --dirty`, exit `0`.

```text
0 of 57 planned paths drifted from the plan. Audit compared bytes at 32, existence at 5, and nothing at 20.
vite.config.ts replaced (141 lines removed).
configs/src/vite.core.config.ts replaced (0-line delta).
configs/src/vite.server.config.ts replaced (0-line delta).
configs/policy.ts replaced (160 lines added).
.oxlintrc.json replaced (10 lines added).
.prettierignore replaced (3 lines added).
tests/setupPolicy.ts replaced (750 lines added).
tests/policy.test.ts replaced (158 lines added).
tests/config.test.ts replaced (318 lines added).
AGENTS.md replaced (150 lines removed).
CLAUDE.md replaced (42 lines removed).
29 written, 53 unchanged, 85 removed in ..
50 published, 23 guides fetched, 0 no longer listed.
```

**Why `--dirty`.** The brief says no `--dirty`, and the brief also has step 2 apply the
pre-overwrite rulings before the write, in a unit forbidden to commit. Those rulings are uncommitted
work, and `overwrite` refuses a dirty tree before it writes anything, so the two instructions cannot
both hold. I proved the waiver destroys nothing rather than trusting it:

- `git ls-files --error-unmatch` matched all 85 deletion candidates. Every one is tracked.
- The sorted `git status --porcelain --untracked-files=all` path set and the sorted foreign set share
  no member — `comm -12` returned nothing. No file the deletion could reach carried an uncommitted
  change.

`Materializer.remove` deletes only a path that is both a `foreign` finding and a member of git's
tracked set, and `--dirty` empties the observed dirty list without widening that eligibility, so the
waiver could not have reached an untracked or ignored file in any case.

**Files written.** `vite.config.ts`, `configs/src/vite.core.config.ts`,
`configs/src/vite.server.config.ts`, `configs/policy.ts`, `.oxlintrc.json`, `.prettierignore`,
`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `AGENTS.md`, `CLAUDE.md`,
`package.json`, and 14 refreshed guide mirrors — `guides/contract.md`, `guides/form.md`,
`guides/html.md`, `guides/mcp.md`, `guides/middleware.md`, `guides/probe.md`, `guides/process.md`,
`guides/scaffold.md`, `guides/sea.md`, `guides/server.md`, `guides/terminal.md`, `guides/test.md`,
`guides/tool.md`, `guides/workflow.md`. New: `tests/distribution.test.ts` and
`.claude/agents/orkestrel.md`, the latter restored with a live-refreshed catalog table that already
prints `@orkestrel/scaffold 0.0.60`.

**Files deleted: exactly the 85 foreign paths.** `git status` reports 94 deletions; `comm -3` against
the foreign set leaves only the 9 suite files this unit moved, and nothing on the foreign side. No
path outside the audited foreign set was removed.

## The closing audit

`npx scaffold audit`, exit `0`, taken again as the final action after every later edit.

```text
scripts: The manifest at . declares a planned script with a differing value: test:app:server.
  Keep the declared value unchanged or replace it with the planned value: "test:app:server"
  declares "npm run build:app:server && vitest run --config vite.config.ts --no-cache
  --reporter=dot --project app:server"; planned "vitest run --config vite.config.ts --no-cache
  --reporter=dot --project app:server".
setup: The target at . carries test setup modules that no proof covers: tests/setup.ts,
  tests/setupApplicationServer.ts, tests/setupBrowser.ts, tests/setupBrowserServer.ts,
  tests/setupGuides.ts, tests/setupService.ts. Add tests/setup.test.ts,
  tests/setupApplicationServer.test.ts, tests/setupBrowser.test.ts,
  tests/setupBrowserServer.test.ts, tests/setupGuides.test.ts, tests/setupService.test.ts, each
  covering the module of the same name. The proof's subject is behavior only this workspace can
  assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
0 of 57 planned paths drifted from the plan. Audit compared bytes at 32, existence at 5, and nothing at 20.
```

Every remaining line is non-blocking and every one is supervisor's own:

- **`test:app:server`** keeps its `npm run build:app:server &&` prefix, so the project has its server
  built when the script is run alone. Scaffold retains the declared value and reports the difference.
  **Owner: supervisor**, as a standing choice.
- **The `setup` proofs.** Scaffold refuses to write them because their subject is behaviour only this
  workspace can assert. Writing them is new test coverage, outside a visit. **Owner: supervisor.**
- **TypeScript major 6 against a registry serving major 7.** A toolchain migration. **Owner:
  supervisor, on a decision.**

I aligned `test:guides` to the planned value, which closed the other half of the `scripts` question
the read-only audit raised.

## The gate chain

Each gate run bare, in order, on the final tree. `npm run format` ran as the mutating converge step
before the chain. **Every reading below is against the pre-visit `node_modules` described earlier,
not against the catalog range set.**

| Gate                   | Exit | Summary                                                                                           |
| ---------------------- | ---- | ------------------------------------------------------------------------------------------------- |
| `npm run format:check` | `0`  | `All matched files use the correct format.` — 357 files                                           |
| `npm run lint:check`   | `0`  | no diagnostics                                                                                    |
| `npm run check`        | `0`  | `tsc` root, `src:core`, `src:server`, `app:core`, `app:server`, `vue-tsc` `app:browser` all clean |
| `npm run build`        | `0`  | four builds, `✓ built in 2.57s` / `2.37s` / `1.38s` / `961ms`                                     |
| `npm test`             | `0`  | see the segment table                                                                             |

`npm test` by segment:

| Script                 | Files | Tests                  |
| ---------------------- | ----- | ---------------------- |
| `test:src`             | 21    | 253 passed             |
| `test:app`             | 77    | 1190 passed, 3 skipped |
| `test:app:integration` | 5     | 19 passed              |
| `test:policy`          | 1     | 111 passed             |
| `test:config`          | 1     | 46 passed              |
| `test:setup`           | 1     | 1 passed               |
| `test:guides`          | 1     | 412 passed             |

The five integration files and the 412 guide tests are the moved suites running in their new homes.

## The repair: `policy/no-nested-functions`

The overwrite installed the new Oxlint policy plugin — `configs/policy.ts` gained `reportNested`, and
`.oxlintrc.json` gained the override enabling `policy/no-nested-functions` over `src/**` and
`app/**`. It reddened one site, in this workspace's own application code, never a vendored file.

**Failing count before the fix.** Command: `npm run lint:check`.

```text
npm run lint:check 2>&1 | grep -c 'policy(no-nested-functions)'   → 1
LINTCHECK_EXIT=1
```

The diagnostic:

```text
app/browser/controllers/Operator.ts:582:9: error policy(no-nested-functions): Extract the function
to module scope or make instance-bound work a method; only direct anonymous callbacks and returned
anonymous functions may stay in a function body.
```

**Passing count after the fix.** Same command:

```text
npm run lint:check 2>&1 | grep -c 'policy(no-nested-functions)'   → 0
LINTCHECK_EXIT=0
```

**The repair.** `Operator.#decorate` built its `Proxy` handler inline, and the `get` trap sat in a
`Property` position — not a direct call argument, so not exempt under `isPolicyCallback`, and an
arrow rather than method syntax, so not exempt under `isPolicyMethod`. Method shorthand was not
available: the trap reads `this.#generation`, `this.#sessionGeneration`, and `this.#answer`, and a
shorthand method would rebind `this` to the handler object.

The trap moved to a new private method `#observe`, which **returns** it. `isPolicyResult` exempts an
anonymous function whose parent is a `ReturnStatement`, the arrow keeps the instance binding it
inherits from its enclosing method, and the two functions already nested inside it — the forwarding
call wrapper and the `then` callback — keep the exemptions they already had. `#decorate` now reads:

```ts
return new Proxy(target, { get: this.#observe<T>(units, history, roster, users) })
```

Nothing about the observed behaviour changed: the trap body, the generation capture, and the answer
routing are identical, and `#observe` is the only new symbol. The name `#read` was taken by an
existing store-read method on the same class, which the linter reported as a duplicate private name
before I renamed it. The 1190 application tests that pass on this tree are the evidence that the
repair preserved behaviour: every one of them existed before it.

The repair sits in `app/browser`, so `dist/src` did not move because of it. `git diff --stat -- src/`
is empty.

## `dist/src` against the published tarball

`npm pack @orkestrel/supervisor@0.0.1` into `tmp/pack`, then a file-by-file comparison of
`package/dist/src` against the rebuilt `dist/src`, sourcemaps excluded and whitespace ignored:

| Artifact                      | Result            |
| ----------------------------- | ----------------- |
| `dist/src/core/**`            | identical         |
| `dist/src/server/index.js`    | 246 changed lines |
| `dist/src/server/index.cjs`   | 246 changed lines |
| `dist/src/server/index.d.ts`  | 100 changed lines |
| `dist/src/server/index.d.cts` | 100 changed lines |

The file set matches exactly; only content differs. **This visit did not move it.** The local
manifest declares `0.0.2` while the registry serves `0.0.1`, and this unit changed no file under
`src/`, so the `dist/src/server` difference is the unpublished `0.0.2` work that was already in the
tree at `8ac9712`.

The bump obligation stands on the other trigger regardless: the runtime `dependencies` set moved from
the published packument's, so this package bumps and publishes on its own account and its downstream
consumers follow in layer order. That decision is the Orchestrator's; I moved no version.

## MCP registrations for the user

The overwrite deleted the tracked `.mcp.json` and `.cursor/mcp.json`, as it must: a file at a canon
path is drift whoever wrote it, and a git-ignored copy at the same path would be a permanent
`foreign` finding that stops this target reaching exit `0` again. The registrations belong in the
harness's own local scope instead. Run these outside the repository's tracked files, from the
supervisor checkout:

```sh
claude mcp add --scope local codex -- codex mcp-server
claude mcp add --scope local probe -- node node_modules/@orkestrel/probe/dist/bin/main.js
```

`AGENTS.md` at `8ac9712` told agents to reach the `prove` tool through the probe MCP server; the
floor pointer that replaced it names no server, so this registration is what keeps that tool
reachable. The Cursor bench additionally carried a `claude` server, `claude mcp serve`; register it
in Cursor's own local scope if that bench is used from this target.

## State on exit

`git rev-parse --short HEAD` → `8ac9712`, unchanged. Nothing committed, staged, stashed, restored, or
reset. `git status --porcelain` reports 149 rows: 94 deletions, 48 modifications, 7 untracked.

Untracked additions: `.claude/agents/orkestrel.md` and `tests/distribution.test.ts` (the
overwrite's), `configs/vite.integration.config.ts`, `configs/app/vite.demo.config.ts`,
`tests/guides.test.ts`, `tests/app/browser/contrast/`, and `tests/integration/` (this unit's).

`git diff --stat` → `142 files changed, 7475 insertions(+), 13635 deletions(-)`.

`.claude/settings.local.json` is untouched and still git-ignored, at 36,974 bytes.

## Claims I could not close

- **The install.** Recorded in full under the deviation. **Owner: `@orkestrel/middleware`**, as a
  release declaring `@orkestrel/server ^0.0.17`.
- **Every gate reading is against the pre-visit `node_modules`.** The source is proved against the
  old packages. Nothing here proves the catalog range set builds, typechecks, or passes, and the
  gates must be re-run after the install resolves.
- **`npm run show` copies a page the build does not emit.** Pre-existing, recorded earlier. **Owner:
  supervisor.**
- **The three remaining audit lines**, each recorded with its owner under the closing audit.

## Acceptance

1. **`npx scaffold audit` exits `0` after the overwrite** — met. Every remaining line is recorded
   with its owner.
2. **Every `@orkestrel/*` range equals the catalog with a caret; `npm ls @orkestrel/test` reads
   0.0.12; the duplicate-contract typecheck is recorded** — the manifest half is met and verified
   against a fresh registry sweep. The installed half is **not met**: `npm ls @orkestrel/test` reads
   `0.0.10` because the install is refused. The typecheck is recorded against the stale tree.
3. **The integration, guides, and service suites have recorded homes and scripts that run** — met.
   The integration and guides suites run inside `npm test`; every service script is proved by
   `vitest list` to select exactly its own suite, including `sea`, which the previous shape could not
   have collected at all.
4. **The gate chain is green, read bare** — met on this tree, with the installed-versus-declared
   caveat attached to every reading.
