Distillate only. No decisions. Floor is scaffold **0.0.60** (`package.json:2`). Overwrite hydrates `HOST_PATHS` + claimed canon pointers + computed `vite.config.ts` / wrappers, then deletes **foreign** paths only (files under expanded host roots **or** at `CANON_PATHS` the plan does not claim). `Materializer.ts:227–232`. Terrain precedent: 85 foreign deletions, `vite.config.ts` replaced (`visit-terrain-report.md:103–156`).

**Default overwrite refuses first** (`CLI.ts:452` → `#assertTarget` `1458–1463`) when retained `vitest --project` names are absent from the planned `vite.config.ts` (`CLI.ts:1163–1180`; guide `611–613`). That is the terrain-shaped refusal, scripts edition.

---

## Taverna

Derived blueprint (`CLI.ts:976–1012`): `app/{core,browser,server}` present; no `src/`; `configs/app/vite.showcase.config.ts` present → `showcase`; no `tests/guides.test.ts` / `tests/setupService.ts` / `tests/setup*.test.ts`. Floor Vitest set: `app:core`, `app:browser`, `app:server`, `policy`, `config`, `probe` (`compilers.ts:763–875`).

### 1. Replaced files (repo bytes the floor does not carry)

**`vite.config.ts`** (content-owned template). Repo vs floor (`templates.ts:103–408`, `252–256`):

| Repo carries | Lines | Floor |
| --- | --- | --- |
| Inline `createBrowserProvider()` (env / `/opt/pw-browsers` / `msedge`) | `31–50` | `configs/browsers.ts` + `playwright(browserOptions)` |
| `guides` include `tests/guides/**/*.test.ts`, setup `setup.ts`+`setupServer.ts`, color cyan | `61–74` | only if `tests/guides.test.ts` exists; include is that **file** (`constants.ts:286`) |
| `app:core` / `app:server` / `app:browser` as `mergeConfig` factories; server `target: 'node24'`; browser `plugins: [vue()]` only, `optimizeDeps.include: ['vue']`, **no** `outputBoundary` / `environmentBoundary` | `77–163` | `appCore`/`appServer`/`appBrowser` with helpers + `playwright(browserOptions)`; server `node22` |
| `buildStamp`, `appShowcase` as merge of `appBrowser` | `177–210` | `applicationBrowser(true)` + `viteSingleFile` |
| **`app:e2e`** — node, `tests/app/e2e/**`, exclude live + `tests/app/server/**`, timeouts 30s | `218–234` | **absent** |
| **`app:e2e:live`** — `setupOllama.ts`, timeouts 60s | `240–256` | **absent** |
| Root `maxWorkers: '50%'`; `projects: [guides, appCore, appServer, appBrowser, appE2E, appE2ELive]` | `258–272` | `appCore, appBrowser, appServer, policy, config, probe` |

**`configs/app/vite.browser.config.ts:8–21`** — `server.proxy` `/api` → `127.0.0.1:8787` (same-origin cookie/CSRF/SSE for `npm run dev`). Floor wrapper is only `defineConfig(appBrowser())` (`templates.ts:659–662`).

**`package.json` scripts** (birth-owned file; planned `test:<project>` region is rewritten, extras kept `guides/scaffold.md:617–639`):

- Surviving extra names: `tmp:txt:14`, `test:app:e2e:27`, `test:app:e2e:live:28`, `test:guides:29` (if `guides` is not planned).
- `test:22` names `--project guides` (empty tree today).
- Floor **appends** `test:policy`, `test:config`, `test:probe`, `test:bench` (`compilers.ts:374–381`). Gate chains `test`/`check`/`build` stay maintainer-owned (`guides/scaffold.md:620–621`).

**`.claude/settings.json:1–26`** — SessionStart only: `deps.sh`, `ollama.sh`, `cursor.sh`; **no** `permissions`, **no** `codex.sh`, **no** Stop. Floor (`dist/host/claude/settings.json:3–1007`) is `$schema` + `enableAllProjectMcpServers` + `bypassPermissions` allow-list + SessionStart **four** hooks including `codex.sh:989–992` + Stop `git diff --check:996–1005`.

**`AGENTS.md:1–931`** — in-repo coding contract (orientation `14–31`, non-negotiables `35–50`, TTTDD). Floor pointer (`templates.ts:2022–2048`) states no law and points at sibling/installed scaffold.

**`CLAUDE.md:1–496`** — Orchestrator operating mode, model triad. Floor pointer (`templates.ts:2050–2056`) is seven lines and **imports nothing**.

**`.oxlintrc.json:1–40`** — `ignorePatterns: [".claude"]`, plugins `import`+`vitest` only, **no** `jsPlugins` / `policy/no-nested-functions`. Floor registers `./configs/policy.ts` and enables `policy/no-nested-functions` on `src/**` and `app/**` (`oxlintrc.json:4–5,83–90`).

**`.prettierignore:6–7`** — `dev/demo.html`, `dev/docs.html`. Floor instead lists `demo/showcase.html`, `.orkestrel/`, `tests/mirrors/` (`prettierignore:8–14`). Those two `dev/` ignores **leave**.

**`tsconfig.json:1–23`** — missing floor strict flags (`allowImportingTsExtensions`, `verbatimModuleSyntax`, `noUncheckedIndexedAccess`, …) and `exclude` lacks `tmp` (`templates.ts:30–57`).

Absent planned files (restore, not a replace-drop): `configs/helpers.ts`, `configs/policy.ts`, `configs/browsers.ts`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `scripts/codex.sh`, `LICENSE`.

### 2. Removed paths (foreign)

Canon copies under groups `orchestration` (`inferGroup` / `ORCHESTRATION_PATH_PREFIXES`). Plan claims only `.claude/agents/orkestrel.md` (presence) and `.claude/settings.json` (content). **No `orkestrel.md` here.**

| Directory | Count | Paths |
| --- | --- | --- |
| `.claude/agents/` | 9 | `builder.md`, `checker.md`, `composer.md`, `grok.md`, `planner.md`, `researcher.md`, `reviewer.md`, `scout.md`, `verifier.md` |
| `.claude/skills/enterprise-bootstrap/` | 5 | `SKILL.md`, `COMPONENTS.md`, `FRONTEND-DESIGN.md`, `UTILITIES.md`, `bootstrap-reference.md` |
| **Total** | **14** | |

`.gitignore` does not name these. Tracking vs untracked: **not** read with `git ls-files` (no tree-changing command). `settings.local.json` / `launch.json` are **not** in this set (see §4).

### 3. Kept paths outside the plan

Outside both foreign populations (`Materializer.ts:230–232`):

- `app/**` (source group, not a deletion root)
- `tests/app/**` including `tests/app/e2e/**` (`journeys.test.ts`, `live/*`)
- `tests/setup.ts`, `tests/setupBrowser.ts`, `tests/setupServer.ts`, `tests/setupOllama.ts` (birth-owned / unplanned setup; terrain left `tests/setup.ts` + `tests/setupBrowser.ts`)
- `guides/src/**`, `guides/README.md` (guide **mirrors** at `guides/<pkg>.md` may still be catalog-owned; `guides/src/**` is not `HOST_PATHS`)
- `scripts/deps.sh`, `cursor.sh`, `ollama.sh` are **planned** HOST files (replaced if stale), not extras
- `configs/app/tsconfig.*.json` are planned templates (replaced)

### 4. Operator overlays

| Path | Status | Guide / law |
| --- | --- | --- |
| `.claude/settings.local.json` | **Outside the plan** (present; same three SessionStart hooks as current `settings.json:1–26`) | `guides/scaffold.md:1237–1242` — outside `HOST_PATHS`, `matchesSensitivePath`; `1290–1291` — scaffold does not read or write it. `isCanonPath('.claude/settings.json')` is false (`helpers.ts:211–216`). |
| `.claude/launch.json` | **Outside the plan** (`version` / `npm run dev` port 5173, `1–10`) | Not in `HOST_PATHS` or `CANON_PATHS`. Terrain’s 85 did not include it (`visit-terrain-report.md:110–113`). Same “outside both populations” rule. |

Not gitignored in taverna `.gitignore` (`*.local` does not match `settings.local.json`).

### 5. Test selection after overwrite

**Survive because the floor declares them:** `app:core` (`include tests/app/core/**/*.test.ts`), `app:browser` (`tests/app/browser/**/*.test.ts` + `setup.ts`+`setupBrowser.ts`), `app:server` (`tests/app/server/**/*.test.ts` + `setupServer.ts`), plus new `policy` / `config` / `probe`. Scripts `test:app:core|browser|server` match planned names.

**Vanish as Vitest projects:** `guides` (`61–74`, `271`), `app:e2e` (`218–234`), `app:e2e:live` (`240–256`). Files `tests/app/e2e/**` stay on disk (§3) but **no** floor include hits `tests/app/e2e/`.

**Re-declare (guide `1005–1009`):** optional projects are selected by defining paths the plan **birth-owns**, not by editing `vite.config.ts` (content-owned; `repair` restores the canonical set). `guides` → `tests/guides.test.ts`. There is **no** defining path for `app:e2e` / `app:e2e:live`. Extra scripts can remain in `package.json` but `--project app:e2e` will not resolve.

**Overwrite refuse (before any replace):** projected manifest still names `--project guides`, `app:e2e`, `app:e2e:live` (`package.json:22,27–29`; extras retained). `#assertTarget` throws (`CLI.ts:1176–1180`). Same shape as terrain’s probe-dependency refuse (`visit-terrain-report.md:14–24`).

### 6. Deviation contract

- **Unregistered projects block `configs`** — §5.
- **Vendored skill at a canon path holds product UI craft:** `.claude/skills/enterprise-bootstrap/` is a full local package (`SKILL.md:15–27` links `FRONTEND-DESIGN.md` / `COMPONENTS.md` / `UTILITIES.md`), not the floor bridge (`dist/host/claude/skills/enterprise-bootstrap/SKILL.md:19–25`).
- **Custom agent** `composer.md` (Cursor Composer dispatcher, `1–30`) — not in floor agent set.
- **Nested-function policy** lands via new `configs/policy.ts` + `.oxlintrc.json` (terrain: 28 app diagnostics, `visit-terrain-report.md:229–234`).
- No directory/file type clash observed. `app/` holds product code; it is **not** a canon path.

---

## Lloyds

Derived blueprint: `app/{core,browser}` only (no `src/` directory; unused `srcCore`/`srcBrowser` factories). Showcase file present. No `tests/guides.test.ts` / setup proofs / `setupService.ts`. Floor projects: `app:core`, `app:browser`, `policy`, `config`, `probe`.

### 1. Replaced files

**`vite.config.ts`:**

| Repo carries | Lines | Floor |
| --- | --- | --- |
| Async `createBrowserProvider()` + `VITEST_BROWSER_ARGS` | `29–56` | `configs/browsers.ts` |
| **`srcCore` / `srcBrowser` factories** (not in `projects`) — include `tests/setup.test.ts` / `tests/setupBrowser.test.ts`, `pool: 'forks'`, `maxWorkers: 3` | `66–119` | omitted (`src` axis empty) |
| `app:core` forks/timeouts 15s | `122–144` | node, no forks block |
| `app:browser` extends `srcBrowser`; `optimizeDeps` vue/bootstrap/popper; **SCSS** `quietDeps` / `silenceDeprecations: ['import']`; excludes src tests | `150–188` | `applicationBrowser(false)` + vue + boundaries |
| Root `fileParallelism: false`, timeouts 15s/15s/10s; `projects: [appCore, appBrowser]` only | `232–256` | adds `policy`, `config`, `probe`; no root serialize/timeout block |

**`package.json:28`** — `test:app:browser` is three serial `vitest` invocations with path filters. Planned value is one `--project app:browser` (`compilers.ts:371`). Author-written differing strings are **retained** (`guides/scaffold.md:638–639`); audit reports them. `test:app:core:27` uses `--config configs/app/vite.core.config.ts` (no `--project`).

**`AGENTS.md:1–934`** — full contract including unused `src/` layout (`12–26`). Floor: pointer.

**`CLAUDE.md:1–381`** — same Orchestrator body class as taverna. Floor: pointer.

**No `.claude/settings.json`** — missing; overwrite **writes** the floor (permissions + four SessionStart + Stop). Nothing local to drop at that path.

**`.oxlintrc.json`** — same generation as taverna (no policy plugin). Floor adds `no-nested-functions` over `app/**`.

**`.prettierignore`** — `dist/` only (`1–5`). Floor adds showcase / `.orkestrel/` / `tests/mirrors/` (additive, not a product-ignore drop).

No `configs/helpers.ts` / `policy.ts` / `browsers.ts` / vendored tests / `scripts/*.sh`.

### 2. Removed paths (foreign)

| Directory | Count | Paths |
| --- | --- | --- |
| `.claude/agents/` | 7 | `builder.md`, `checker.md`, `planner.md`, `researcher.md`, `reviewer.md`, `scout.md`, `verifier.md` |

No `.mcp.json`, `.agents/`, `.claude/rules|skills`, `.codex/`, `.cursor/`. `.gitignore` does not name these. Tracking not `git ls-files`’d.

### 3. Kept paths outside the plan

- `app/core/**`, `app/browser/**` (product Vue/SCSS)
- `tests/app/**` (including `tests/app/browser/setup.ts` ~harness)
- `tests/setup.ts`, `tests/setupBrowser.ts`
- `guides/*.md` at repo root (mirror-shaped names; catalog may refresh claimed mirrors; extras stay if not under a vendored directory expansion)
- `app/browser/components/guides/**` is **`app/`**, not `guides/` group

### 4. Operator overlays

Both **absent**. If created later: same law as taverna — `settings.local.json` `guides/scaffold.md:1239–1242, 1290–1291`; `launch.json` not in `HOST_PATHS`/`CANON_PATHS`. Lloyds `.gitignore` does not ignore `settings.local.json`.

### 5. Test selection after overwrite

**Survive:** `app:core`, `app:browser` (floor include `tests/app/browser/**/*.test.ts` covers the split-path suite without the three invocations). Scripts `test:app:core` / `test:app:browser` may **keep** custom commands (§1).

**Vanish:** unused `src:core` / `src:browser` factories (`66–119`). No extra **registered** projects.

**Floor adds:** `policy`, `config`, `probe` (+ `test:policy` / `test:config` / `test:probe` / `test:bench`).

**Re-declare:** same defining-path rule (`guides/scaffold.md:1005–1009`). No custom project needs a second file unless they want `guides`/`service`/`integration`.

**Overwrite refuse:** `#projectQuestion` only sees `--project app:browser` (`package.json:28`). Floor registers `app:browser`. **No** unregistered-project refuse from current scripts. Missing planned deps could still block `configs`+`tests` (`CLI.ts:1319–1331`) if a floor row is absent; `probe` is already declared (`devDependencies:53`).

### 6. Deviation contract

- `src:*` factories in a tree with **no** `src/` — overwrite rewrites them away (absorb already flagged this).
- Nested-function rule on `app/**` after oxlintrc replace (terrain repair case).
- No settings overlay to preserve operator grants; floor `settings.json` is a **new** file.
- No directory/file clash. No canon path holding `app/` product code.

---

## Supervisor

Derived blueprint: `src/{core,server}`, `app/{core,browser,server}`, showcase present, `tests/setupServer.test.ts` → `setup: true`, `tests/setupService.ts` → `service: true`, **no** `tests/guides.test.ts` → `guides: false`, `src` non-empty → `distribution`. Floor projects: `src:core`, `src:server`, `app:core`, `app:browser`, `app:server`, `policy`, `config`, `setup`, `service`, `distribution`, `probe`.

### 1. Replaced files

**`vite.config.ts`** — already near-floor (helpers + `browsers.ts` + `peers`), but extra projects and deltas:

| Repo carries | Lines | Floor |
| --- | --- | --- |
| `app:browser` **`exclude: ['tests/app/browser/integration/**/*.test.ts']`** | `187–188` | include `tests/app/browser/**/*.test.ts` **with no exclude** (`templates.ts:256`) |
| Showcase `base: './'`, `server.open: '/showcase.html'`, input `showcase.html` | `152–180` | floor showcase uses `index.html` (`templates.ts:249`) |
| **`appBrowserIntegration`** — Node, `tests/app/browser/integration/**`, `globalSetup: setupBrowserServer.ts` | `329–347` | **absent** (optional `integration` is `tests/integration.test.ts` only) |
| `service` plus **`serviceProject` / `service:claude|codex|cursor|*-inference|ollama|sea`** with `SUPERVISOR_SERVICE_PROVIDER` and per-owner `environmentBoundary` | `275–430` | one `service` factory, include `tests/service/**/*.test.ts`, setup `setup.ts`+`setupService.ts` (`constants.ts:314`) |
| `guides` include `tests/guides/**/*.test.ts` | `308–321` | only if `tests/guides.test.ts` exists |
| `setup` color cyan vs floor white | `293–305` vs `templates.ts:325–333` | |
| `probe` color gray, no `benchmark`/`pool: threads` | `432–446` vs `templates.ts:396–408` | floor color `black`, `fileParallelism: false`, `pool: 'threads'`, `benchmark.include` |

**`tests/setupPolicy.ts:15–28`** — `PolicyRule` lacks floor `'portability' | 'rules'` (`dist/host/tests/setupPolicy.ts:27–28`). Shorter instrument than 0.0.60.

**`configs/policy.ts`** — no `reportNested` / `no-nested-functions` (grep empty). Floor `policy.ts:184–343` defines that rule.

**`.oxlintrc.json`** — has `jsPlugins` policy (`4`) and `no-mocking` / `no-keyword-privacy` (`58–59`); **no** `policy/no-nested-functions` override. Floor `83–90` enables it on `src/**` and `app/**`.

**`.prettierignore`** — has `demo/showcase.html` and `.orkestrel/`; **missing** floor `tests/mirrors/` (`prettierignore:14`).

**`AGENTS.md:1–178`** — full contract; rule map points at **this** repo’s `.claude/rules/*` (`116–133`); `prove` via probe MCP (`87`). Floor pointer sends readers to scaffold’s rules, not these copies.

**`CLAUDE.md:1–2`** — `@AGENTS.md` and `@.agents/orchestration.md` imports. Floor pointer: “This file imports nothing” (`templates.ts:2055–2056`) because `@path` inlines.

**`.claude/settings.json`** — opening `1–80` matches floor permissions; hooks at `968+` match floor SessionStart+Stop. If any later byte differs, content-owned replace reverts it (`guides/scaffold.md:1237–1239`).

**`package.json:80–82`** extra service scripts retained as author strings; `test:guides:78` retained while `guides` project leaves vite.

### 2. Removed paths (foreign)

Filesystem count **85** (same tally as terrain, different members):

| Directory | Count |
| --- | --- |
| `.mcp.json` | 1 — `codex` + **`probe`** servers (`1–11`) |
| `.agents/orchestration.md` | 1 |
| `.agents/skills/**` | 33 (includes extra **`orkestrel-human-journey/`** ×4; omits floor `prove-journey` / `publish` because those copies are not held) |
| `.claude/agents/*.md` | 13 — **no** `orkestrel.md` on disk now; includes extra **`codex.md`** |
| `.claude/rules/*.md` | 12 — no `portability.md` |
| `.claude/skills/*/SKILL.md` | 8 — includes **`orkestrel-human-journey`**; no `prove-journey` / `publish` |
| `.codex/config.toml` | 1 |
| `.codex/agents/*.toml` | 14 — extra **`claude.toml`** |
| `.cursor/mcp.json` | 1 — `codex` + `claude` + `probe` (`1–14`) |
| `.cursor/rules/orchestration.mdc` | 1 |
| **Total** | **85** |

`.gitignore:42` ignores **`.claude/settings.local.json` only** (not in this 85). A git-ignored **canon** copy would be a permanent `foreign` finding (`guides/scaffold.md:1515–1520`; terrain `.mcp.json` was tracked, `visit-terrain-report.md:120–122`). These 85 are not in that ignore list. Tracked vs untracked: not verified with `git ls-files`.

### 3. Kept paths outside the plan

- `src/**`, `app/**` (product)
- `tests/src/**`, `tests/app/**` including `tests/app/browser/integration/**` (6 files)
- `tests/guides/src/*.test.ts` (parity) — **not** `tests/guides.test.ts`
- `tests/service/**` (live CLI proofs)
- `tests/setup.ts`, `setupBrowser.ts`, `setupServer.ts`, `setupService.ts`, `setupGuides.ts`, `setupBrowserServer.ts`, `setupApplicationServer.ts`
- `scripts/service.sh`, `scripts/seed.ts`, `scripts/sea.ts` (extras under `scripts/`; HOST lists four `.sh` **files**, not the directory)
- `guides/**` product/spec trees (`guides/src/supervisor.md`, etc.)
- `configs/src/**`, `configs/app/**` planned wrappers (replaced if stale), not deleted

### 4. Operator overlays

| Path | Status |
| --- | --- |
| `.claude/settings.local.json` | **Absent.** Outside the plan (`guides/scaffold.md:1239–1242, 1290–1291`). **Gitignored** (`supervisor/.gitignore:42`) — if later created untracked/ignored, it is **not** foreign (not a `CANON_PATHS` member). |
| `.claude/launch.json` | **Absent.** Outside the plan (not HOST, not CANON; terrain 85 omitted it). |

### 5. Test selection after overwrite

**Survive (floor declares):** `src:core`, `src:server`, `app:core`, `app:browser`, `app:server`, `policy`, `config`, `setup` (`tests/setup*.test.ts` includes `setupServer.test.ts`), `service` (**one** project over `tests/service/**/*.test.ts`), `probe`, **`distribution`** (new; publishing `src`).

**Vanish as separate projects:** `app:browser:integration` (`329–347`), `guides` (`308–321`), `service:claude|codex|cursor|claude-inference|codex-inference|cursor-inference|ollama|sea` (`383–430`). Per-provider `SUPERVISOR_SERVICE_PROVIDER` (`375`) and `service:sea`’s distinct setup (`416–424`) leave with the factories.

**File fate:**

- `tests/app/browser/integration/**/*.test.ts` become **`app:browser`** browser-Playwright tests (floor include, no exclude) — not the Node `setupBrowserServer.ts` globalSetup (`337–339`).
- `tests/service/**` still match floor `service`.
- `tests/guides/src/*.test.ts` match **no** floor project (`GUIDES_TEST_PATH` is `tests/guides.test.ts`).

**Re-declare:** `guides` → keep/add `tests/guides.test.ts`. `service` isolation is **not** a defining-path project; only `tests/setupService.ts` selects the single `service` project (`CLI.ts:1009`, `constants.ts:311`). Custom names cannot be restored in `vite.config.ts` (`guides/scaffold.md:1005–1009`).

**Overwrite refuse:** retained scripts name `app:browser:integration`, `guides`, `service:claude`, `service:codex`, `service:cursor`, `service:claude-inference`, `service:codex-inference`, `service:cursor-inference`, `service:ollama`, `service:sea` (`package.json:70,74,78,80–82`). Floor vite labels do not include those strings (`CLI.ts:1164`). `#assertTarget` throws before write.

### 6. Deviation contract

- **Unregistered projects block `configs`** — §5 (visit-actionable, same class as terrain `OVERWRITE_EXIT=1`).
- **`.mcp.json` deletion** drops the **probe** MCP (`supervisor/.mcp.json:7–10`) that `AGENTS.md:87` tells agents to call. File is foreign (`CANON_PATHS` `.mcp.json`, unclaimed). Limits: keep MCP in harness local/user scope, not `.mcp.json` (`guides/scaffold.md:1522–1524`).
- **`orkestrel-human-journey`** under `.agents/skills/` and `.claude/skills/` — canon copies of a skill **not** in 0.0.60 `host.json`; product journey workflow deleted as foreign.
- **`codex.md` / `claude.toml`** — extra canon roles, not in floor host agent lists.
- **Missing `orkestrel.md`** — planned **presence**; overwrite **restores** floor bytes (not a replace of edited presence-owned body). Terrain’s stale-body case does not apply until the file exists (`visit-terrain-report.md:340–354`).
- **`no-nested-functions`** on `src/**` and `app/**` after policy+oxlintrc replace (terrain 28-site repair).
- **`CLAUDE.md` `@path` imports** of files overwrite then deletes (`.agents/orchestration.md` is foreign).
- No directory-vs-file clash found. Product code in `src/` / `app/` is outside canon.

---

## Search scope

| Search | Coverage |
| --- | --- |
| Floor inventory | `scaffold/host.json` (every planned host destination); `scaffold/src/core/constants.ts` `HOST_PATHS` `130–151`, `CANON_PATHS` `184–199`, defining test paths `277–317`; `dist/host/**` including `vite` **not** stored (generated); `configs/helpers.ts`, `configs/policy.ts`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `claude/settings.json`, `AGENTS.md`/`CLAUDE.md` **contracts** vs pointer **templates** `templates.ts:2022–2056`; `dotfiles/oxlintrc.json`, `prettierignore`, `gitignore`, `mcp.json`, `cursor/mcp.json` |
| Ownership / foreign / overlays | `guides/scaffold.md` Groups `911–933`, Ownership `935–1052`, Fleet catalog `1054+`, Vendored root `1170–1291` especially `1237–1242` and `1290–1291`, Limits `1515–1533`, Generated workspace `1293–1338`, scripts/projects `600–639` and `1005–1009`; `Materializer.ts:227–232`; `helpers.ts` `isCanonPath` / `inferGroup` / `matchesSensitivePath` `161–167`, `listCanonPaths` `865–876`; `CLI.ts` `#derive` `976–1012`, `#projectQuestion` `1141–1180`, `#assertTarget` `1458–1463`, `#replace` `448–454` |
| Precedent | `scaffold/.orkestrel/scaffold/visit-terrain-report.md` §§ The read-only audit, The overwrite (`84–156`) |
| Per repo | `vite.config.ts` entire file; `package.json` scripts; `.claude/settings.json` if present; `.claude/launch.json` / `settings.local.json` if present; `.mcp.json`; `configs/**/*.ts` json; `tests/setup*.ts` and `tests/setup*.test.ts`; `AGENTS.md` / `CLAUDE.md` heads + supervisor rule map; globs over `.agents`, `.claude/{agents,rules,skills}`, `.codex`, `.cursor`, `tests/app/e2e`, `tests/app/browser/integration`, `tests/guides`, `tests/service`, `scripts`, `guides`, `{src,app}` tops; `.gitignore` / `.oxlintrc.json` / `.prettierignore` / `tsconfig.json` |
| Not run | `npx scaffold audit`; `git ls-files` / `git check-ignore` / `git status` (no command that mutates; tracking/untracked is **inferred from `.gitignore` only**); byte hashes of `configs/helpers.ts` vs floor (headers match; full digest not taken) |
