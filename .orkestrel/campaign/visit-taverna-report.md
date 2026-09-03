# Unit V-taverna — report

**Outcome: stopped.** The visit reached the closing audit at exit `0` with every `@orkestrel/*`
range equal to the catalog with a caret, and then stopped at step 4's install. `npm install`
refuses the catalog's own rows: `@orkestrel/middleware@0.0.18` declares a required peer
`@orkestrel/server` `^0.0.16`, and the catalog serves `@orkestrel/server` `0.0.17`. At `0.0.x` a
caret pins one exact release, so no published `middleware` accepts the `server` the catalog names.
That is the brief's "a registry range is refused" stop condition, and the repair is a `middleware`
release, not a taverna edit.

Steps 1 through 3 are done. Step 4 is blocked at the install. Step 5's gates are not run, because
`node_modules` still holds the pre-visit `@orkestrel` graph and every runtime row reads `invalid`
against the manifest. Two gate readings that do not depend on that graph were taken anyway and are
recorded as observations.

Baseline `441ca4e` on `main`, unchanged. Nothing committed, staged, stashed, restored, or reset.
The user's lockfile pair is exactly as I found it.

## The deviation

**Expected.** Step 4: re-pin every remaining `@orkestrel/*` range to the catalog with a caret, then
`npm install`.

**Found.** The re-pin was already complete — the overwrite's own `declare` step wrote every runtime
row, and no range needed a manual edit. The install then failed.

```text
npm error code ERESOLVE
npm error ERESOLVE unable to resolve dependency tree
npm error While resolving: taverna@0.0.1
npm error Found: @orkestrel/server@0.0.17
npm error node_modules/@orkestrel/server
npm error   @orkestrel/server@"^0.0.17" from the root project
npm error Could not resolve dependency:
npm error peer @orkestrel/server@"^0.0.16" from @orkestrel/middleware@0.0.18
npm error node_modules/@orkestrel/middleware
npm error   @orkestrel/middleware@"^0.0.18" from the root project
INSTALL_EXIT=1
```

**Evidence.** Read from the registry, not from the tree:

| Reading | Command | Result |
| --- | --- | --- |
| Every peer edge among taverna's declared `@orkestrel` packages at their catalog versions | `npm view <name>@<version> peerDependencies --json` | Only `middleware`, `probe`, and `test` declare peers |
| `@orkestrel/middleware@0.0.18` | same | `{"@orkestrel/database":"^0.0.12","@orkestrel/server":"^0.0.16"}`, `database` optional, `server` required |
| `@orkestrel/middleware@0.0.17` and `@0.0.16` | same | `{"@orkestrel/server":"^0.0.14","@orkestrel/database":"^0.0.11"}` |
| `@orkestrel/server` published versions | `npm view @orkestrel/server versions --json` | latest `0.0.17` |
| `@orkestrel/probe@0.0.11` peers | same | `oxlint ^1.77.0`, `typescript ^6.0.0`, `vitest ^4.1.0` — all satisfied |
| `@orkestrel/test@0.0.12` peers | same | `vitest ^4.1.11` — satisfied by the floor's `^4.1.11` |

No published `@orkestrel/middleware` accepts `@orkestrel/server` `0.0.17`. Downgrading `middleware`
makes it worse: `0.0.17` and `0.0.16` pin `server` to `^0.0.14`.

The publish times name how it happened:

```text
@orkestrel/server     0.0.16  2026-08-27T16:24:14Z
@orkestrel/middleware 0.0.18  2026-08-27T16:42:13Z   <- correct against server 0.0.16
@orkestrel/server     0.0.17  2026-08-28T05:40:25Z   <- middleware never followed
```

**Rest of the graph.** `npm install --dry-run --legacy-peer-deps` exits `0` and writes nothing, so
`middleware` to `server` is the only refused edge. The dry run reports `added 6 packages, removed 22
packages, and changed 44 packages`. It left the lockfile pair untouched, confirmed by
`git status --porcelain -- package-lock.json`.

**Done vs not done.** Steps 1, 2, and 3 done. The pre-overwrite rulings done. The re-pin done. The
install, the toolchain convergence, the gate chain, and the `policy/no-nested-functions` repair not
done.

**Hypothesis.** The fleet's publish order derives from runtime `dependencies` alone, so a
`peerDependencies` edge is invisible to it. `middleware` sits at `L2` and `server` at `L3`, and
nothing scheduled `middleware` after `server` published `0.0.17`.

**What settles it.** Republish `@orkestrel/middleware` with `"@orkestrel/server": "^0.0.17"`, then
re-run this unit from step 4. The two alternatives were priced and refused here: pinning taverna's
`@orkestrel/server` to `^0.0.16` breaks acceptance criterion 2 and leaves taverna a release behind,
and `--legacy-peer-deps` accepts a resolution the package itself declares wrong and hides the fleet
defect. Owner: the Orchestrator, as a `middleware` release.

## The pre-overwrite rulings

`scaffold overwrite` refuses before writing while a retained script names a `--project` the planned
`vite.config.ts` does not declare. The refusal reads every manifest script whose text contains
`vitest` and collects every `--project` token regardless of which `--config` sits beside it
(`src/bin/CLI.ts:1104-1123`), so an e2e suite cannot be rehomed by pointing `--project` at a second
config. It has to stop using `--project` at all.

### `guides` — dropped

`tests/guides/` does not exist, so nothing selects the project. Taverna's own
`guides/README.md:8-12` states that the tree under `guides/src/` mirrors each dependency's
canonical guide and that taverna runs no guide-to-source parity suite, because that mechanism
belongs to the packages where the guide sits beside the source it documents. Taverna is `private`
and ships no `src/`, so there is no local public surface a parity proof could compare against.
Writing `tests/guides.test.ts` would author a proof with no subject.

- `test` no longer names `--project guides`.
- `test:guides` deleted.

### `app:e2e` and `app:e2e:live` — rehomed to configs outside the plan

`configs/` is not a vendored directory the plan expands. The audit's foreign population is exactly
the files beneath the host directory roots the plan expands plus the instruction-canon paths the
target holds (`src/server/Materializer.ts:641-653`), and `HOST_PATHS` names only
`configs/helpers.ts` and `configs/policy.ts` as files. A wrapper the plan does not name is
therefore never planned and never foreign. The vendored `tests/config.test.ts` agrees: it globs
`configs/app/vite.*.config.ts`, derives the required set from the `src` and `app` directories that
exist, and ignores every extra before reading its content
(`node_modules/@orkestrel/scaffold/dist/host/tests/config.test.ts:357-392`).

New files, each built from the planned `appServer` factory so it runs the same composition,
aliases, and setup modules the `app:server` project runs:

| File | Suite | Script |
| --- | --- | --- |
| `configs/app/vite.e2e.config.ts` | `tests/app/e2e/**/*.test.ts`, excluding `live/**`, 30s timeouts, serial | `test:app:e2e` = `vitest run --config configs/app/vite.e2e.config.ts --no-cache --reporter=dot` |
| `configs/app/vite.e2e.live.config.ts` | `tests/app/e2e/live/**/*.test.ts`, `setupOllama.ts`, 60s timeouts, serial | `test:app:e2e:live` = `vitest run --config configs/app/vite.e2e.live.config.ts --no-cache --reporter=dot` |

Neither script carries a `--project` token, which is what clears the refusal. Each config header
records why it sits outside the planned set.

### The `/api` dev proxy — rehomed

The floor replaces `configs/app/vite.browser.config.ts` with the bare `defineConfig(appBrowser())`
wrapper, so the proxy moved to `configs/app/vite.dev.config.ts` and `dev` selects it:
`vite --config configs/app/vite.dev.config.ts`. The planned value of `dev` names the browser
wrapper, so this script now reads as a maintainer difference the manifest region retains. `build`
and `build:app:browser` still select the planned wrapper, so nothing shipped changes.

### `.prettierignore` rows for `dev/demo.html` and `dev/docs.html` — left to leave

Neither file exists. `ls dev` reports no such directory and `git ls-files dev` returns nothing;
`git log -- dev` shows commit `90ac150` "Remove styles, dev/demo, dev/docs, harness, inspector,
theme" deleted them. The rows protected nothing, so they left with the floor replacement and no
file was formatted or moved. The floor file now ignores `dist/`, `demo/showcase.html`,
`.orkestrel/`, and `tests/mirrors/`.

### Also owed before the overwrite

The read-only audit named two further write blockers the brief did not anticipate, each quoting its
own remedy:

- **Planned dependencies absent.** `@orkestrel/guide` and `@orkestrel/html`. The audit quoted
  `^0.0.15` and `^0.0.7`; `npm view` confirms the registry serves exactly `0.0.15` and `0.0.7`, and
  the catalog rows agree. Declared in `devDependencies`, following terrain.
- **A planned project no gate chain reaches.** `#chainQuestion` blocks a write when a planned
  project has a `test:<project>` script that no chain from `test` invokes
  (`src/bin/CLI.ts:1228-1253`), and the projection supplies `test:policy` and `test:config` before
  that check runs. `test` therefore took its planned value,
  `npm run test:app && npm run test:policy && npm run test:config`.

I also declared the two planned gate scripts the audit reported absent, at their exact planned
values: `format:check` = `oxfmt --config .oxfmtrc.json --check .` and `lint:check` =
`oxlint --config .oxlintrc.json --deny-warnings .`. Taverna carried neither, and the brief's step 5
runs both.

`check` was left at `npm run check:app`. The planned value prepends
`tsc --noEmit --project tsconfig.json`, and adopting it is a decision I cannot prove without the
install. Owner: a successor unit, after the install clears.

## The read-only audit

`npx scaffold audit` before any write, exit `1`. Every finding:

```text
scripts: The manifest at . does not declare planned scripts: test:policy, test:config, test:probe, test:bench.
projects: The manifest at . names Vitest projects the planned configuration does not register: app:e2e, app:e2e:live, guides.
dependencies: The manifest at . does not declare planned dependencies: @orkestrel/guide, @orkestrel/html.
setup: The target at . carries test setup modules that no proof covers: tests/setup.ts, tests/setupBrowser.ts, tests/setupOllama.ts, tests/setupServer.ts.
dependencies: @types/node declares the floor ^26.1.1, while the registry serves 26.4.1 within major 26.
dependencies: @vitest/browser-playwright declares the floor ^4.1.10, while the registry serves 4.1.11 within major 4.
dependencies: oxfmt declares the floor ^0.60.0, while the registry serves 0.66.0 within major 0.
dependencies: oxlint declares the floor ^1.75.0, while the registry serves 1.81.0 within major 1.
dependencies: playwright declares the floor ^1.61.1, while the registry serves 1.62.1 within major 1.
dependencies: typescript declares major 6, while the registry serves major 7.
dependencies: vite declares the floor ^8.1.5, while the registry serves 8.2.2 within major 8.
dependencies: vitest declares the floor ^4.1.10, while the registry serves 4.1.11 within major 4.
dependencies: vue declares the floor ^3.5.40, while the registry serves 3.5.42 within major 3.
dependencies: vue-tsc declares the floor ^3.3.7, while the registry serves 3.3.11 within major 3.
```

Drift table: `28 of 47 planned paths drifted from the plan. Audit compared bytes at 20, existence at
12, and nothing at 15. The plan does not own 14 further paths beneath its groups.`

- `stale`: `tsconfig.json`, `vite.config.ts`, `configs/app/tsconfig.core.json`,
  `configs/app/vite.browser.config.ts`, `configs/app/tsconfig.browser.json`,
  `configs/app/vite.server.config.ts`, `configs/app/tsconfig.server.json`,
  `configs/app/vite.showcase.config.ts`, `.oxlintrc.json`, `.oxlintignore`, `.prettierignore`,
  `AGENTS.md`, `CLAUDE.md`, `.claude/settings.json`, `scripts/deps.sh`, `scripts/cursor.sh`,
  `scripts/ollama.sh`
- `missing`: `configs/browsers.ts`, `configs/helpers.ts`, `configs/policy.ts`,
  `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `guides/guide.md`,
  `guides/scaffold.md`, `LICENSE`, `scripts/codex.sh`, `.claude/agents/orkestrel.md`
- `foreign`: the 14-path set in the deletion proof

Range findings: the 20 `differs from` lines matching the range table.

A second audit after the rulings, exit `1`, no longer carried the `projects` line or the planned
`dependencies` line. The `scripts` line, the `setup` line, and the foreign toolchain floors stood.

## The overwrite

`npx scaffold overwrite` refused first: `TARGET: The target at . carries 6 uncommitted changes.
Commit them, or pass --dirty to waive the refusal.` (`OVERWRITE_EXIT=1`). The 6 are `M
package.json` and the three new configs from the rulings, plus the user's `D  package-lock.json`
and `?? package-lock.json` pair. None of them is in the deletion set — proved before the waiver by
`git ls-files --error-unmatch` matching all 14 foreign paths and `git status --porcelain` over that
exact path set returning nothing. So `--dirty` destroyed no uncommitted work.

`npx scaffold overwrite --dirty`, exit `0`:

```text
setup: The target at . carries test setup modules that no proof covers: tests/setup.ts, tests/setupBrowser.ts, tests/setupOllama.ts, tests/setupServer.ts.
0 of 47 planned paths drifted from the plan. Audit compared bytes at 28, existence at 4, and nothing at 15.
tsconfig.json replaced (7 lines added).
vite.config.ts replaced (71 lines removed).
configs/app/tsconfig.core.json replaced (10 lines added).
configs/app/vite.browser.config.ts replaced (17 lines removed).
configs/app/tsconfig.browser.json replaced (17 lines added).
configs/app/vite.server.config.ts replaced (0-line delta).
configs/app/tsconfig.server.json replaced (15 lines added).
configs/app/vite.showcase.config.ts replaced (0-line delta).
.oxlintrc.json replaced (339 lines added).
.oxlintignore replaced (3 lines removed).
.prettierignore replaced (4 lines added).
AGENTS.md replaced (904 lines removed).
CLAUDE.md replaced (488 lines removed).
.claude/settings.json replaced (982 lines added).
scripts/deps.sh replaced (17 lines added).
scripts/cursor.sh replaced (15 lines removed).
scripts/ollama.sh replaced (139 lines removed).
53 written, 21 unchanged, 14 removed in ..
50 published, 25 guides fetched, 0 no longer listed.
```

**Files written.** Replaced: the 17 named in the summary, plus `package.json` (the range and script
regions). New: `configs/browsers.ts`, `configs/helpers.ts`, `configs/policy.ts`,
`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `scripts/codex.sh`,
`LICENSE`, `.claude/agents/orkestrel.md`, and 26 guide mirrors at `guides/*.md`.

**Files deleted: exactly the foreign set.** The sorted deletion rows from
`git status --porcelain`, with the user's staged `package-lock.json` deletion excluded, compared
against the sorted `foreign` rows from the read-only audit:

```text
deleted rows: 14
foreign rows: 14
comm -3 tmp/deleted.txt tmp/foreign.txt   ->   (no output)
```

The sets are identical. Nothing outside the audited plan was removed. The set:
`.claude/agents/{builder,checker,composer,grok,planner,researcher,reviewer,scout,verifier}.md` and
`.claude/skills/enterprise-bootstrap/{COMPONENTS,FRONTEND-DESIGN,SKILL,UTILITIES,bootstrap-reference}.md`.

`.claude/launch.json` and `.claude/settings.local.json` survived, as the guide's vendored-root
section says they must: neither sits under a `CANON_PATHS` entry, so neither enters the foreign
population.

## The closing audit

`npx scaffold audit` after the overwrite, exit `0`. Every remaining line:

```text
setup: The target at . carries test setup modules that no proof covers: tests/setup.ts, tests/setupBrowser.ts, tests/setupOllama.ts, tests/setupServer.ts. Add tests/setup.test.ts, tests/setupBrowser.test.ts, tests/setupOllama.test.ts, tests/setupServer.test.ts, each covering the module of the same name. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
0 of 47 planned paths drifted from the plan. Audit compared bytes at 28, existence at 4, and nothing at 15.
```

Both are non-blocking questions and both are taverna's own, not the visit's:

- The `setup` line asks for four setup proofs. Scaffold refuses to write them because their subject
  is behaviour only this workspace can assert. Writing them authors new product-level coverage,
  outside a visit's scope. **Owner: taverna.**
- The `typescript` major line is the "a newer major is never crossed for you" question. Crossing
  TypeScript 6 to 7 is a toolchain migration. **Owner: taverna, on a decision.**

## Ranges before and after

Runtime `dependencies`:

| Package | Before | After | Catalog |
| --- | --- | --- | --- |
| `@orkestrel/abort` | `^0.0.3` | `^0.0.8` | `0.0.8` |
| `@orkestrel/agent` | `^0.0.8` | `^0.0.19` | `0.0.19` |
| `@orkestrel/budget` | `^0.0.3` | `^0.0.8` | `0.0.8` |
| `@orkestrel/console` | `^0.0.3` | `^0.0.11` | `0.0.11` |
| `@orkestrel/contract` | `^0.0.7` | `^0.0.15` | `0.0.15` |
| `@orkestrel/database` | `^0.0.5` | `^0.0.12` | `0.0.12` |
| `@orkestrel/emitter` | `^0.0.3` | `^0.0.8` | `0.0.8` |
| `@orkestrel/indexeddb` | `^0.0.4` | `^0.0.9` | `0.0.9` |
| `@orkestrel/markdown` | `^0.0.5` | `^0.0.12` | `0.0.12` |
| `@orkestrel/middleware` | `^0.0.5` | `^0.0.18` | `0.0.18` |
| `@orkestrel/ollama` | `^0.0.6` | `^0.0.13` | `0.0.13` |
| `@orkestrel/reason` | `^0.0.3` | `^0.0.8` | `0.0.8` |
| `@orkestrel/relation` | `^0.0.3` | `^0.0.10` | `0.0.10` |
| `@orkestrel/router` | `^0.0.4` | `^0.0.12` | `0.0.12` |
| `@orkestrel/server` | `^0.0.6` | `^0.0.17` | `0.0.17` |
| `@orkestrel/sqlite` | `^0.0.4` | `^0.0.9` | `0.0.9` |
| `@orkestrel/sse` | `^0.0.3` | `^0.0.5` | `0.0.5` |
| `@orkestrel/terminal` | `^0.0.4` | `^0.0.13` | `0.0.13` |
| `@orkestrel/timeout` | `^0.0.3` | `^0.0.8` | `0.0.8` |
| `@orkestrel/workflow` | `^0.0.6` | `^0.0.16` | `0.0.16` |

Development `devDependencies`:

| Package | Before | After | Catalog |
| --- | --- | --- | --- |
| `@orkestrel/guide` | absent | `^0.0.15` | `0.0.15` |
| `@orkestrel/html` | absent | `^0.0.7` | `0.0.7` |
| `@orkestrel/probe` | `^0.0.11` | `^0.0.11` | `0.0.11` |
| `@orkestrel/scaffold` | `^0.0.60` | `^0.0.60` | `0.0.60` |
| `@orkestrel/test` | `^0.0.12` | `^0.0.12` | `0.0.12` |

Every `@orkestrel/*` range equals the catalog's version with a caret, checked by parsing the
marker-bounded table the overwrite refreshed in `.claude/agents/orkestrel.md` and comparing each
declared range against `^<version>`: `MISMATCHED=0`. The overwrite's `declare` step wrote every
runtime row, so step 4 needed no manual edit.

The overwrite also raised the foreign toolchain floors: `@types/node` `^26.1.1` to `^26.4.1`,
`@vitest/browser-playwright` `^4.1.10` to `^4.1.11`, `oxfmt` `^0.60.0` to `^0.66.0`, `oxlint`
`^1.75.0` to `^1.81.0`, `playwright` `^1.61.1` to `^1.62.1`, `vite` `^8.1.5` to `^8.2.2`, `vitest`
`^4.1.10` to `^4.1.11`, `vue` `^3.5.40` to `^3.5.42`, `vue-tsc` `^3.3.7` to `^3.3.11`. It left
`typescript` on major 6. It added `test:policy`, `test:config`, `test:probe`, and `test:bench` to
the script region and retained every ruling I made, byte-for-byte.

## Installed state

The install that would have realized these ranges is the step that stopped, so `node_modules` holds
the pre-visit `@orkestrel` graph. `npm ls @orkestrel/test @orkestrel/contract` exits `0` and reports
the graph as invalid against the manifest:

```text
+-- @orkestrel/abort@0.0.3 invalid: "^0.0.8" from the root project
+-- @orkestrel/agent@0.0.8 invalid: "^0.0.19" from the root project
+-- @orkestrel/contract@0.0.7 invalid: "^0.0.15" from the root project
+-- @orkestrel/database@0.0.5 invalid: "^0.0.12" from the root project
`-- @orkestrel/test@0.0.12
```

`@orkestrel/test` reads `0.0.12` and `@orkestrel/scaffold` reads `0.0.60`, from the step 1 install
that ran against the ranges committed at `441ca4e`. Every runtime row is a release behind the
manifest.

The toolchain is closer than that, because a caret on a `1.x` or `8.x` range is permissive. Read
from each installed `package.json`: `oxlint 1.81.0`, `vitest 4.1.11`, `vite 8.2.2`,
`vue-tsc 3.3.11`, `typescript 6.0.3`, `@vitest/browser-playwright 4.1.11`, `playwright 1.62.1`,
`@types/node 26.4.1`, `vue 3.5.42` — each equal to what the manifest now declares. The one exception
is `oxfmt`, installed `0.60.0` against the declared `^0.66.0`.

## Gate readings

The chain was not run. `check`, `build`, and `test` all resolve taverna's application code against
the `@orkestrel` runtime graph, and that graph is a release behind the manifest at every row, so a
red would report the stale install rather than the tree. Two gates do not read that graph, so I took
them and record them as observations rather than as gate evidence.

| Gate | Exit | Summary | Authoritative |
| --- | --- | --- | --- |
| `npm run format:check` | `1` | `Format issues found in above 7 files.` over 297 files | No — `oxfmt` installed `0.60.0`, declared `^0.66.0` |
| `npm run lint:check` | `1` | 179 errors | Yes — `oxlint` installed `1.81.0` equals the declared `^1.81.0`, and oxlint is not type-aware, so the runtime graph does not move the reading |
| `npm run check` | not run | — | — |
| `npm run build` | not run | — | — |
| `npm test` | not run | — | — |

`npm run format` was not run. Converging the tree with a formatter a release behind what the
manifest declares writes churn that the declared formatter would rewrite again, and I cannot prove
the result. The 7 files it flags: `app/browser/components/CommandBar.vue`,
`app/browser/components/ContentHeader.vue`, `app/browser/components/NavMenu.vue`,
`app/browser/components/content/EntityContent.vue`,
`tests/app/browser/components/{AppShell,AuthView,CreateMenu}.test.ts`.

### The lint surface is wider than the brief scopes

This is the reading a successor unit needs most, so it is measured rather than estimated. Command:
`npm run lint:check`, `LINTCHECK_EXIT=1`.

By rule:

```text
     76 typescript(array-type)
     57 policy(no-nested-functions)
     20 typescript(consistent-type-imports)
     15 eslint(no-unused-vars)
      7 typescript(consistent-type-assertions)
      1 vitest(expect-expect)
      1 typescript(no-this-alias)
      1 import(no-unassigned-import)
      1 eslint(require-yield)
```

By tree: 118 under `app/`, 61 under `tests/`. All 57 `policy(no-nested-functions)` diagnostics are
under `app/`, none in a vendored file.

The brief scopes the repair to `app/**` where the new `policy/no-nested-functions` rule reddens it,
plus new tests for leaves the repair exports. That is 57 of 179. The other 122 come from the floor
`.oxlintrc.json` replacing taverna's old config, which registered only the `import` and `vitest`
plugins. They are real contract violations — `typescript(consistent-type-assertions)` is
`AGENTS.md`'s ban on `as` — and 61 of them sit in `tests/**`, which the brief's owned-file list does
not carry. Terrain's comparable repair was 28 diagnostics of one class.

I wrote no repair. A `no-nested-functions` repair moves closures into class field initializers,
abort-signal listeners, method shorthand, bound methods, and exported leaves, and each shape needs
`npm run check` and `npm test` to prove it preserved behaviour. Neither gate can run until the
install clears, so writing 57 unverifiable edits into the tree is worse than leaving them. **Owner:
a successor unit, after the `middleware` release.**

## Claims I could not close

**The install.** Recorded in full under the deviation. **Owner: the Orchestrator**, as a
`@orkestrel/middleware` release naming `@orkestrel/server` `^0.0.17`.

**The gate chain and the lint repair.** Blocked behind the install. The measured size is 179 lint
errors, 57 of them the brief's named rule, and 7 format-flagged files under a formatter a release
behind. **Owner: a successor unit.**

**The guide mirrors landed beside an index that does not know them.** The catalog step fetched 26
mirrors to `guides/*.md`. Taverna already carried 37 hand-adapted mirrors under `guides/src/`, and
`guides/README.md` indexes only that tree. The root mirrors are the canonical fetched bytes and the
`src/` copies are adapted prose, so the two now disagree about which is authoritative for the
packages both cover. Nothing fails on it — taverna runs no parity proof — and reconciling two
documentation trees is product documentation work, not a visit's. **Owner: taverna.**

**`check` was not aligned to its planned value.** Recorded under the pre-overwrite rulings.
**Owner: a successor unit.**

**The two closing audit lines.** Recorded with their owners under the closing audit.

## State on exit

`git rev-parse --short HEAD` is `441ca4e`, unchanged. Nothing committed, staged, stashed, restored,
or reset.

`git diff --stat` tail: `32 files changed, 1710 insertions(+), 4515 deletions(-)`.

`git status --porcelain` carries the tracked replacements and deletions listed under the overwrite,
plus these untracked additions: `configs/app/vite.dev.config.ts`, `configs/app/vite.e2e.config.ts`,
`configs/app/vite.e2e.live.config.ts` (mine); `.claude/agents/orkestrel.md`, `LICENSE`,
`configs/browsers.ts`, `configs/helpers.ts`, `configs/policy.ts`, `scripts/codex.sh`,
`tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, and the 26 `guides/*.md`
mirrors (the overwrite's); `package-lock.json` (the user's standing condition).

The lockfile pair is exactly as I found it: `D  package-lock.json` staged and `?? package-lock.json`
untracked. The untracked file was rewritten in place by the step 1 `npm install`, as the brief
directed; the step 4 install failed at resolution and wrote nothing. I never staged, restored, or
rewrote that state.

## Acceptance criteria

1. **`npx scaffold audit` exits `0` after the overwrite** — met. Both remaining lines are recorded
   with their owner.
2. **Every `@orkestrel/*` range equals the catalog with a caret; `npm ls @orkestrel/test` reads
   0.0.12** — the manifest half is met (`MISMATCHED=0`) and `npm ls @orkestrel/test` reads `0.0.12`.
   The installed graph does not match the manifest, because the install is the blocked step.
3. **The e2e suites and the dev proxy have a recorded home outside the planned files, and the
   scripts that select them run** — the homes are recorded and the scripts are written. Whether they
   run is unproven: the suites drive a real composed server over the `@orkestrel` runtime graph.
4. **The gate chain is green, read bare** — not met. The chain was not run, and the reason and the
   two readings that do not depend on the graph are recorded.
