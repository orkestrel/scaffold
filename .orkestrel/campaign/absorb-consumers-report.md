Catalog floor used below is `scaffold/.claude/agents/orkestrel.md` (table still prints `@orkestrel/scaffold` `0.0.59`). The local scaffold checkout is already `0.0.60` (`scaffold/package.json:3`). Visit before that publish is `--offline` (`wave.md:47–51`). `@orkestrel/supervisor` in the catalog is `0.0.1`; the supervisor repo is `0.0.2`. Terrain’s visit is the deletion shape: 85 foreign instruction-canon paths removed, `.claude/agents/orkestrel.md` kept then repaired (`visit-terrain-report.md:110–156`).

Git porcelain and gate colour were not run. Settle with `git status --porcelain` and the repo’s own `npm test` in each tree. The brief’s “staged lockfile in both” is a kept-user fact, not a reading from this pass.

---

## taverna

Private Vue 3 CRM/workbench (`package.json:2–3`, `AGENTS.md:16`). **Halfmoon** drop-in Bootstrap 5 skin (`app/browser/styles/main.css:1–6`, `app/browser/main.ts:1–6`). `files`: `dist`, `README.md` (`package.json:5–8`).

### 1. Identity

Auth-gated SPA. Boot: `index.html:2` sets `data-bs-theme="light"` + `data-bs-core="modern"`; `main.ts:12–16` applies stored theme then `createApp(App).mount(#app)`.

- Shell: `app/browser/App.vue:28–47` (loading / `AppShell` / `AuthView`).
- Workbench: `app/browser/components/AppShell.vue:128–222` (`vh-100` column; skip link `134`; hidden `h1` `139`).
- Primary toolbar: `AppShell.vue:143–185` (`aria-label="Workbench"`) with `CommandBar.vue:402–595` in the middle (`AppShell.vue:154–156`). Theme toggle `AppShell.vue:161–174`; sign-out `175–182`.

### 2. Pins

No `@orkestrel/scaffold`, `@orkestrel/test`, or `@orkestrel/probe`. Runtime vs catalog:

| Package | Declared | Catalog |
| --- | --- | --- |
| abort | `^0.0.3` | `0.0.8` |
| agent | `^0.0.8` | `0.0.19` |
| budget | `^0.0.3` | `0.0.8` |
| console | `^0.0.3` | `0.0.11` |
| contract | `^0.0.7` | `0.0.15` |
| database | `^0.0.5` | `0.0.12` |
| emitter | `^0.0.3` | `0.0.8` |
| indexeddb | `^0.0.4` | `0.0.9` |
| markdown | `^0.0.5` | `0.0.12` |
| middleware | `^0.0.5` | `0.0.18` |
| ollama | `^0.0.6` | `0.0.13` |
| reason | `^0.0.3` | `0.0.8` |
| relation | `^0.0.3` | `0.0.10` |
| router | `^0.0.4` | `0.0.12` |
| server | `^0.0.6` | `0.0.17` |
| sqlite | `^0.0.4` | `0.0.9` |
| sse | `^0.0.3` | `0.0.5` |
| terminal | `^0.0.4` | `0.0.13` |
| timeout | `^0.0.3` | `0.0.8` |
| workflow | `^0.0.6` | `0.0.16` |

`typescript` `^6.0.3` (`package.json:75`) — same major-6 / registry-7 question as terrain (`visit-terrain-report.md:96`). Lockfile present, not gitignored. Git porcelain: **unread**.

Visit step 1 has no scaffold pin to re-pin. Overwrite will refuse configs/tests without `@orkestrel/probe` (terrain: `visit-terrain-report.md:20–24`); `@orkestrel/test` is also absent for the journey skill.

### 3. Test infrastructure

Vitest projects in `vite.config.ts:271`: `guides`, `app:core`, `app:server`, `app:browser`, `app:e2e`, `app:e2e:live`. Default `test` script: guides + app:core/server/browser (`package.json:22`). **`app:browser` exists** (`vite.config.ts:128–163`). No `src:*`, `policy`, `config`, `setup`. `guides` include is `tests/guides/**/*.test.ts` (`vite.config.ts:67`); that tree is empty.

Browser setup: `tests/setup.ts` + `tests/setupBrowser.ts` (`vite.config.ts:145`). Extra: `tests/setupServer.ts`, `tests/setupOllama.ts`.

No `tests/app/browser/integration.test.ts`. HTTP e2e lives in `tests/app/e2e/journeys.test.ts` (auth/CSRF over `startAppFace`, not the journey layer). Component tests query the DOM (`tests/app/browser/components/*.test.ts`). Local helper: `waitForCondition` in `tests/app/browser/harness.ts:1055–1060` (200×10ms poll) — duplicates `@orkestrel/test`’s named-budget verb. Harness also resolves buttons/inputs by `querySelector` (`harness.ts:997–1030`).

### 4. Structure drift

Present at canon paths current scaffold treats as foreign (terrain 85-path set):

- `.claude/agents/*`: builder, checker, composer, grok, orkestrel, planner, researcher, reviewer, scout, verifier. Extra vs floor: `composer.md`. Missing vs floor: analyst, application, implementer, sol.
- `.claude/skills/enterprise-bootstrap/` old full copies (`COMPONENTS.md`, `FRONTEND-DESIGN.md`, `UTILITIES.md`, `bootstrap-reference.md`, `SKILL.md`) — current plan vendors only `SKILL.md` stubs under `.claude/skills/`.
- `.claude/settings.json` — planned path; terrain visit **replaced** it (`visit-terrain-report.md:141`). This copy has SessionStart hooks to `scripts/deps.sh` / `ollama.sh` / `cursor.sh` (`settings.json:3–24`).
- `.claude/launch.json` — not in the terrain 85; not in current `host.json`.
- `orkestrel.md` body is the old specialist (Bash, 36-package prose, no `<!-- orkestrel:catalog -->` markers) (`orkestrel.md:1–27`). Wave: delete + commit before overwrite (`wave.md:18–24`).

Absent: `.agents/skills/**`, `.claude/rules/**`, `.codex/**`, `.cursor/**`, `.mcp.json`. `CLAUDE.md` is the old long Orchestrator file, not the 0.0.60 pointer (`CLAUDE.md:1–20`). `AGENTS.md` is the pre-split long law file (`AGENTS.md:1–28`).

`configs/`: only `configs/app/` (7 files). No `configs/src`, `configs/helpers.ts`, `configs/policy.ts`, `configs/browsers.ts`. No `src/`. `app/`: `core`, `browser`, `server`. `tests/`: `app/{core,browser,server,e2e}`, setup files; no `tests/src`, `policy`, `config`.

### 5. Against `enterprise-bootstrap`

- Inline `style`: **0** in `app/` (`**/*.{vue,css,scss}`).
- `<style>` blocks: **0**.
- Authored CSS: `main.css` is two Halfmoon `@import`s only (`main.css:5–6`). `tests/app/browser/styles/main.test.ts:7–8` asserts no custom overrides.
- Custom class names: none authored. `min-w-0` at `AppShell.vue:154`, `CommandBar.vue:408` is Bootstrap’s utility.
- Colour literals in Vue/CSS: **0** (hex/rgb grep hits were `#private` fields).
- Icons: Bootstrap Icons, ~20 component files (`bi bi-*`).
- Theme: `useTheme` → `data-bs-theme` + `localStorage` (`useTheme.ts:6–22`, `AppShell.vue:161–174`). Toggle is `btn-outline-secondary`.
- Destructive: Delete `btn-sm btn-outline-danger` (`EntityContent.vue:627`); junction remove outline-danger (`JunctionTable.vue:121,168`); member Remove outline-danger (`IdentityContent.vue:305`); chat Retry outline-danger (`ChatContent.vue:189`). Confirm accept maps `danger` → **solid** `btn-danger` (`constants.ts:739–742`, `ConfirmDialog.vue:130`). Cancel is `btn-outline-secondary` (`ConfirmDialog.vue:127`).

### 6. Against `orkestrel-prove-journey`

Surface intents: login/register (`AuthView.vue`); search/browse/open (`CommandBar.vue`); create (`CreateMenu`); select context row; edit/save; **soft-delete** + confirm; archive browse + restore (`CommandBar.vue:48–53,293–322`); prompt agent; **approve/deny** parked confirm (`ConfirmHost.vue`); **Retry** failed turn (`ChatContent.vue:187–193`); sign-out; theme. No CSV import/export on this surface.

Refusals: capability-gated verbs (`hasCapability`); unauthenticated shell withheld; archived hits not opened; Delete withheld unless `deletable`; confirm modal.

Statechart candidates: command-bar search/prompt + archived/live; confirm dialog open; selection; chat streaming/failed.

Transport: entity data is **server** (session cookie + CSRF); browser IndexedDB only for conversations + UI stack (`factories.ts:37–58`); theme/thinking in `localStorage`.

Variants declared: light/dark via `data-bs-theme`; responsive `lg` shell (`AppShell.vue:74–87`). No `CaptureVariant` list.

Families present in tests: none of journey/refusal/matrix/statechart/transport/capture.

### 7. Risks

- No scaffold → visit step 1 cannot re-pin; must add `@orkestrel/scaffold` `^0.0.60` (and `test`/`probe`) first.
- `orkestrel.md` body ≠ floor; uncommitted copy refuses overwrite (`wave.md:18–30`).
- `.claude/settings.json` replacement wipes SessionStart hooks.
- `composer.md` and extra skill markdown will go in the foreign sweep.
- TypeScript major 6 vs registry 7.
- `guides` project include with no files.
- Gate colour **unread**.
- Overwrite of `AGENTS.md`/`CLAUDE.md`/`vite.config.ts` is the terrain-scale rewrite, not a tidy.

**Scope:** `package.json`; `AGENTS.md` (first 80); `guides/README.md`; `vite.config.ts`; `configs/app/**`; `app/{core,browser,server}` tops; `app/browser/{main.ts,App.vue,index.html,styles/main.css,factories.ts,composables/useTheme.ts,components/{AppShell,CommandBar,AuthView,ConfirmDialog,ConfirmHost,EntityContent,ChatContent,IdentityContent}.vue}`; `tests/{setup*.ts,app/browser/**,app/e2e/journeys.test.ts}`; `.claude/{agents,skills,settings.json,launch.json}`; `.gitignore`; glob for `.agents`/`.codex`/`.cursor`/`.mcp.json` (absent); greps `style=`, `<style`, `#hex`/`rgb()`, `btn-danger`, `bi bi-`, `@orkestrel/test/browser`.

---

## lloyds

Private Vue 3 Florida property-schedule rater (`package.json:2`, `Toolbar.vue:80–82` “LloydsRater”). **Halfmoon** (`app/browser/styles/main.scss:1–5`, `main.ts:1–3`). Closest consumer to terrain’s reference suite. `files`: `dist`, `README.md`. `publishConfig.access: public` (`package.json:9–11`) on a `0.0.0` app. No `guides/README.md`; `guides/*.md` are package mirrors.

### 1. Identity

Boot: `index.html:2` Halfmoon attrs; `main.ts:1–8` `createApp(App).mount(#app)` (no pre-mount theme). Composition root `App.vue:21–51` builds `createApplication()`, `start()` on mount.

- Shell: `App.vue:54–178` (skip link; blotter + desk).
- Primary toolbar: `app/browser/components/Toolbar.vue:57–266` (`aria-label="Schedule actions"`; sticky top / `lg` rail). Add `Toolbar.vue:152–163` (`btn-primary`, name **“Add building”** — terrain’s journeys use **“Add new building”**).

### 2. Pins

No scaffold, test, or probe. Runtime vs catalog:

| Package | Declared | Catalog |
| --- | --- | --- |
| contract | `^0.0.6` | `0.0.15` |
| csv | `^0.0.1` | `0.0.5` |
| database | `^0.0.5` | `0.0.12` |
| emitter | `^0.0.3` | `0.0.8` |
| indexeddb | `^0.0.4` | `0.0.9` |
| interpret | `^0.0.5` | `0.0.11` |
| program | `^0.0.3` | `0.0.11` |
| qualifier | `^0.0.4` | `0.0.12` |
| rater | `^0.0.5` | `0.0.12` |
| reason | `^0.0.3` | `0.0.8` |
| relation | `^0.0.3` | `0.0.10` |

Bootstrap/Halfmoon sit in **devDependencies** (`package.json:48–56`). `typescript` `^6.0.3`. Lockfile present. Git porcelain: **unread**.

Same visit-precondition hole as taverna: add scaffold + probe (+ test for journeys).

### 3. Test infrastructure

Root projects: `app:core`, `app:browser` only (`vite.config.ts:254`). `srcCore`/`srcBrowser` are defined (`vite.config.ts:66–119`) but **not in `projects`**, and **there is no `src/`**. `test:app:browser` is three serial vitest invocations over components / composables / remaining files (`package.json:28`) — not one `app:browser` run.

**`app:browser` exists** (`vite.config.ts:150–188`). Setup: `tests/setup.ts` + `tests/setupBrowser.ts` (via `srcBrowser` merge). App-local: `tests/app/browser/setup.ts` (~1094 lines) — same Phase-1–4 harness as terrain’s `setup.ts` **without** the journey surface (`mountSurface`, `DELETE_*`, `createPortfolio` greps: 0).

No `integration.test.ts`. No capture/journey/refusal families. Component tests use `querySelector` helpers in `setup.ts:261+`.

No policy/config/setup/guides Vitest projects. No `tests/guides`.

### 4. Structure drift

- `.claude/agents/`: builder, checker, planner, researcher, reviewer, scout, verifier. **No `orkestrel.md`.** Missing floor agents: analyst, application, grok, implementer, orkestrel, sol.
- No `.agents/`, `.claude/rules/`, `.claude/skills/`, `.codex/`, `.cursor/`, `.mcp.json`.
- `AGENTS.md` still describes a `src/` + `app/` workspace (`AGENTS.md:14–26`) the tree does not have.
- `CLAUDE.md` old Orchestrator body.
- `configs/`: `configs/app/` only (5 files). No `configs/src`.
- `app/`: `core` + `browser` only (no `server`).
- `vite.config.ts` still carries unused `src:*` project factories.

### 5. Against `enterprise-bootstrap`

- Inline `style`: **3** — `BuildingTable.vue:431,443,457` (`style="width: 3.25rem"` / `4.75rem`).
- `<style>`: **0**.
- Custom CSS: `.form-check-input-danger` and variants (`main.scss:8–30`) — tokens `var(--bs-danger*)`.
- Deprecated `navbar-dark` on the blotter (`Toolbar.vue:58`) — skill forbids `*-dark` component classes.
- Outline-on-dark rail: Import/Export/Template/`btn-outline-light` (`Toolbar.vue:104–140`); idle Delete `btn-outline-light`, armed `btn-danger` (`Toolbar.vue:164–178`). Skill: outline family fails 4.5:1 in dark; destructive wants solid `btn-danger` + confirmation ladder (this Delete has **no confirm**).
- Per-row ZIP retry: `btn-outline-danger btn-sm` (`BuildingTable.vue:599`).
- Icons: Bootstrap Icons, 15 component files (Toolbar 11, BuildingTable 10, CarrierResults 29, TipsTricks 34, …).
- Theme: settings-store flag → `data-bs-theme` (`useTheme.ts:21–28`, `ApplicationController.ts:333`); toggle `btn-outline-light` (`Toolbar.vue:250–261`).
- Colour literals in Vue/CSS: **0**.

### 6. Against `orkestrel-prove-journey`

Intents (terrain’s list, this surface): **add** (`Toolbar.vue:152`); **select** (row checkbox, `aria-label` “Select building for deletion” in terrain — verify name here before writing journeys); **delete** (`Toolbar.vue:164`); **import** (`Toolbar.vue:104`, `CSVDropZone`, drag-drop `App.vue:128`); **export** (`Toolbar.vue:116`); template download (`Toolbar.vue:128`); **retry** ZIP (`BuildingTable.vue:596–605`). Also Smart Default, Tips/Guides/Quick Ref modals, desk tabs Buildings/Results (`App.vue:80–123`).

Refusals: Delete disabled at `selection.size === 0` (`Toolbar.vue:173`) — **present but disabled**, not withheld (terrain withholds until selected). Import disabled while `processing`. Results tab disabled at `rated === 0`. File picker rejects non-CSV (`Toolbar.vue:47`).

Statechart candidate: Delete idle/armed (same table as terrain `DELETE_TRANSITIONS`); desk `schedule`/`results`; processing; first-run empty vs populated.

Transport: IndexedDB schedule + settings (`ApplicationController.ts` / `createDriver`); theme in settings store; ZIP locate via `fetch`. Terrain’s `failBootDriver` / second-session pattern is the template; lloyds `setup.ts` already has `installSettings` / `failBootDriver`-class drivers in the Phase-1 comments but **not** the journey `mountSurface`.

Variants: light/dark; `lg` rail vs top bar (`Toolbar.vue:15–16`, `useMedia(LG_MEDIA)`). No `CaptureVariant` array.

Accessible-name drift vs terrain journeys: primary is `"Add building"` here, `"Add new building"` there.

### 7. Risks

- Same scaffold/probe/test absence as taverna.
- No `orkestrel.md` — overwrite restores the floor; no pre-delete needed unless an untracked copy appears.
- `navbar-dark` + outline-on-`bg-dark` rail will fail bootstrap contrast instruments.
- Delete has no confirmation ladder.
- `src:*` factories in `vite.config.ts` vs no `src/` — overwrite rewrites this file (terrain: `vite.config.ts replaced`).
- TypeScript major 6 vs 7.
- Gate colour **unread**.
- `test:app:browser` split invocations vs a single project include — visit’s `vite.config.ts` rewrite will change how the suite is selected.

**Scope:** `package.json`; `AGENTS.md` (first 80); glob `guides/` (no README); `vite.config.ts`; `configs/app/**`; `app/{core,browser}`; `app/browser/{main.ts,App.vue,index.html,styles/main.scss,Toolbar.vue,BuildingTable.vue,useTheme.ts,ApplicationController.ts}`; `tests/{setup.ts,setupBrowser.ts,app/browser/setup.ts}`; `.claude/agents/**`; greps for journey verbs, `style=`, `btn-danger`, `navbar-dark`, `@orkestrel/test`; glob `src` (empty).

---

## supervisor

Published `@orkestrel/supervisor` `0.0.2` (`package.json:2–3`) plus a private Vue operator UI. Catalog still lists the package at `0.0.1` with stale runtime pins. **Halfmoon loaded as `halfmoon.min.css`** (`app/browser/main.ts:1–3`) — not the modern core import taverna/lloyds/terrain use. `files`: `dist/src`, `README.md`.

### 1. Identity

Boot: `createBrowserApplication().mount('#app')` (`main.ts:5`, `factories.ts:66–74`) — Vue app with `ApplicationView` + provided `Operator`. `index.html` has CSP, no `data-bs-theme` / `data-bs-core` (`index.html:1–16`). Theme applied in `useTheme.ts:25–39` from `data-bs-theme` or `prefers-color-scheme`.

- Shell: `ApplicationView.vue:443–790` (`vh-100`; skip link `444`; login `758–785`).
- Banner toolbar: `ApplicationView.vue:449–540` (`navbar`; `h1` wordmark; fleet marks; users chip; `ThemeToggle.vue:17–24`; Logout).
- Run commands (not the page banner): `CommandBar.vue:185–347` (`aria-label="Run commands"` / `"Attempt commands"`).

### 2. Pins

Has scaffold/test/probe, all stale:

| Package | Where | Declared | Catalog |
| --- | --- | --- | --- |
| contract | dep | `^0.0.12` | `0.0.15` |
| database | dep | `^0.0.11` | `0.0.12` |
| emitter | dep | `^0.0.7` | `0.0.8` |
| process | dep | `^0.0.4` | `0.0.9` |
| workflow | dep | `^0.0.13` | `0.0.16` |
| agent | dev | `^0.0.16` | `0.0.19` |
| budget | dev | `^0.0.7` | `0.0.8` |
| form | dev | `^0.0.2` | `0.0.3` |
| guide | dev | `^0.0.12` | `0.0.15` |
| html | dev | `^0.0.4` | `0.0.7` |
| mcp | dev | `^0.0.20` | `0.0.27` |
| middleware | dev | `^0.0.16` | `0.0.18` |
| ndjson | dev | `^0.0.7` | `0.0.8` |
| ollama | dev | `^0.0.10` | `0.0.13` |
| probe | dev | `^0.0.2` | `0.0.11` |
| router | dev | `^0.0.10` | `0.0.12` |
| **scaffold** | dev | **`^0.0.50`** | **`0.0.59` table / `0.0.60` checkout** |
| sea | dev | `^0.0.9` | `0.0.13` |
| server | dev | `^0.0.14` | `0.0.17` |
| sse | dev | `^0.0.5` | `0.0.5` (match) |
| terminal | dev | `^0.0.11` | `0.0.13` |
| test | dev | `^0.0.10` | `0.0.11` |
| tool | dev | `^0.0.11` | `0.0.12` |

`typescript` `^6.0.3`. Lockfile present, not gitignored. Git porcelain: **unread**.

`.claude/agents/orkestrel.md` has catalog markers but a **stale table** (contract `0.0.12`, agent `0.0.16`, …) and a body that is not the 0.0.60 floor (`orkestrel.md:1–50`). Wave: delete + commit before overwrite.

### 3. Test infrastructure

Projects (`vite.config.ts:451–472`): `src:core`, `src:server`, `app:core`, `app:browser`, **`app:browser:integration`**, `app:server`, `policy`, `config`, `setup`, `guides`, plus service:* and `probe`. **`app:browser` exists** (`vite.config.ts:183–196`); integration is a **separate Node/Playwright project** (`vite.config.ts:329–347`) including `tests/app/browser/integration/**/*.test.ts`.

Browser unit setup: `tests/setup.ts` + `tests/setupBrowser.ts`. Integration: `tests/setupBrowserServer.ts` global + `tests/app/browser/integration/setup.ts`.

Journey/capture **exist but not on `@orkestrel/test/browser`**:

- `tests/app/browser/integration/journey/integration.test.ts` — login, refusal probe, rail, completion, reply; local `resolveJourneyTarget` (`integration/setup.ts:253`).
- `tests/app/browser/integration.test.ts` — session/first-run/transport (Playwright against built server).
- `tests/app/browser/setupPortfolio.ts` — `PORTFOLIO_SIZES` narrow 390×844 / wide 1440×900 (`:24–28`); themes light/dark; `SHELL_STATES` + `JOURNEY_STATES` (`confirm|choice|feed|finished`) (`:61–119`).
- Unit shell proofs in `tests/app/browser/integration.test.ts` (in-page, `findControl` / `pressControl` / `readContrast`).

Local verbs that duplicate the published layer: `findControl`/`findLabelled`/`pressControl` (`tests/setupBrowser.ts:1139–1238`); `resolveJourneyTarget` (`integration/setup.ts:253`); `waitForCondition` is **not** local — they import `waitForDelay` from `@orkestrel/test`. **Zero** imports of `@orkestrel/test/browser`.

### 4. Structure drift

Full old vendor tree (matches terrain’s 85 foreign set):

- `.agents/skills/`: enterprise-bootstrap, orkestrel-align-packages, orkestrel-build-application, orkestrel-debrief, orkestrel-falsify, orkestrel-harden-package, orkestrel-polish-surface, **`orkestrel-human-journey`** (old name; current is `orkestrel-prove-journey`). No `orkestrel-prove-journey`, no `orkestrel-publish`.
- `.claude/rules/**` (full set).
- `.claude/agents/*` including extra **`codex.md`** (transport now lives at `.agents/transports/codex.md` in `host.json:298`). Floor set otherwise present (analyst, application, builder, checker, grok, implementer, orkestrel, planner, researcher, reviewer, scout, sol, verifier).
- `.codex/**`, `.cursor/mcp.json`, `.cursor/rules/orchestration.mdc`.
- **`.mcp.json` tracked, not gitignored** — probe + codex servers (`/.mcp.json:1–12`). Visit **deletes** a tracked `.mcp.json` (terrain: `visit-terrain-report.md:120–122`). A later gitignore of the same path becomes a permanent `foreign` finding (`wave.md:32`).
- `.claude/settings.json` — large custom permissions + SessionStart/Stop hooks (`settings.json:1–1007`). Planned path: overwrite **replaces** it.

`AGENTS.md` is already the split/pointer form (`AGENTS.md:14–18`). `CLAUDE.md` is already the short bridge (`CLAUDE.md:1–7`). `configs/`: `src/` + `app/` + `helpers.ts`, `policy.ts`, `browsers.ts`. `src/`: `core` + `server` (no `src/browser`). `app/`: `core` + `browser` + `server`. Tests mirror all of that plus policy/config/setup/guides/service.

### 5. Against `enterprise-bootstrap`

- Inline `style`: **0** in `app/`.
- `<style>`: **0**.
- Authored CSS (rung 4): `styles/{tokens,focus,pane,status}.css` imported from `index.css:8–11`. Custom classes: `.feed`, `.rail-pane` (`pane.css:8–26`); `.status`, `.idle`, `.live`, `.held`, `.done`, `.failed` (`status.css:25–47`). Tokens are `var(--bs-*)` (`tokens.css:15–68`). Focus ring currently **width 0** (`tokens.css:25`, `focus.css:3–6`).
- Colour literals: none in rules; comments cite measured `hsl(214.3, 12.3%, 35%)` / `rgb(0, 102, 255)` (`ThemeToggle.vue:12`, `constants.ts:123`).
- Icons: Bootstrap Icons across 15 Vue files; status marks also `bi-circle-fill` / `bi-pause-fill` / `bi-exclamation-triangle-fill` (`ApplicationView.vue:133–156`).
- Theme: `ThemeToggle.vue:17–24` `btn-sm btn-outline-primary`; OS-follow on first paint (`useTheme.ts:27–34`). **No persistence** (unlike taverna/lloyds).
- Destructive: Stop arms `btn-outline-danger` → `btn-danger` (`CommandBar.vue:90–93,213–228`); disabled Stop is `btn-outline-secondary`. User remove: `UsersView.vue:104` outline-danger; `UserPanel.vue:361` solid `btn-danger`, `408` outline-danger arm. History/RunList/SetupPanel also `btn-sm btn-outline-danger` Retry (`HistoryView.vue:254`, `RunList.vue:107`, `SetupPanel.vue:248`). Logout is outline-secondary, not danger (`ApplicationView.vue:528–537`).

Missing Halfmoon **modern core** (`data-bs-core="modern"`) that taverna/lloyds/terrain load.

### 6. Against `orkestrel-prove-journey`

Intents already exercised in Playwright journeys: login + password retry (`journey/integration.test.ts:21–66`); open run from rail (click + Tab) (`:95+`); completion; reply Yes (`:250+`); users add/remove (`users/integration.test.ts:31+`). Also on the surface: pause/resume/stop (two-press arm), steer, history, theme, logout, Retry on roster/history/users (`RunList.vue:107`, `HistoryView.vue:254`, `UsersView.vue:104`). No CSV import/export.

Refusals: login alert “The supervisor refused that login.”; Close hidden at `lg` (`journey/integration.test.ts:73–84`); commands disabled with `aria-describedby` reasons (`CommandBar.vue:47–84`); non-manager users chip has no door (`ApplicationView.vue:515–522`); Add withheld on environment roster (`ApplicationView.vue:101,678`).

Statechart candidates: Stop idle/armed; drawer open/closed; destination `history`/`users`/run; provisional setup dialog; command bar steer/reply disclosure.

Transport: httpOnly session cookie + same-origin client (`factories.ts:31–34`); reload view in `localStorage` (`StorageOperatorStore.ts:8–43`); SSE roster (`LiveStream`). Integration already proves restart/pointer (`integration/integration.test.ts:386`).

Variants: 2 viewports × 2 themes (`setupPortfolio.ts:24–47`) — **wide is 1440×900**, terrain is 1280×800. Matrix is custom, not `@orkestrel/test/browser` `CaptureVariant`.

Gap vs the skill: families are not declared as `FAMILIES` in an `app:browser` `integration.test.ts`; journeys do not import the published layer; capture directory is `__screenshots__/portfolio` (`setupPortfolio.ts:51`) not `tmp/capture/states`.

### 7. Risks

- `orkestrel.md` body+table differ from floor → delete-and-commit first or overwrite refuses.
- Tracked `.mcp.json` will be deleted; operator MCP registration must move outside the tree (`wave.md:32`).
- `.claude/settings.json` replacement drops the allow/deny matrix and hooks.
- Extra `codex.md` + `orkestrel-human-journey/` deleted as foreign.
- Scaffold `^0.0.50` → `0.0.60`; if 0.0.60 is unpublished, visit is `--offline` then a second online overwrite after publish (`wave.md:47–51`).
- Package version `0.0.2` vs catalog `0.0.1` — publish/catalog sequencing question, not a consumer re-pin.
- Probe `^0.0.2` vs catalog `0.0.11` — terrain’s overwrite refused until probe was declared at catalog.
- TypeScript major 6 vs 7.
- Custom CSS + missing modern core will show up in authored-class census and cascade readings.
- Journey helpers will collide with “import, never implement” once `@orkestrel/test` `0.0.11` lands.
- Gate colour **unread** (this repo’s `prepublishOnly` includes `test:service`).

**Scope:** `package.json`; `AGENTS.md`; `guides/README.md`; `vite.config.ts` (projects + `appBrowser`/`appBrowserIntegration`); `configs/{src,app,helpers,policy,browsers}`; `src/{core,server}` tops; `app/{core,browser,server}` tops; `app/browser/{main.ts,index.html,index.ts,factories.ts,ApplicationView.vue,CommandBar.vue,ThemeToggle.vue,useTheme.ts,styles/**,StorageOperatorStore.ts}`; `tests/{setup*.ts,app/browser/{integration/**,setupPortfolio.ts,integration.test.ts},setupBrowser.ts}`; `.agents/skills/*/SKILL.md`; `.claude/{agents,rules,settings.json}`; `.codex/**`; `.cursor/**`; `.mcp.json`; greps `@orkestrel/test`, `@orkestrel/test/browser`, `style=`, `btn-danger`, `data-bs-theme`.

---

## Cross-cutting (for the visit planner, not a decision)

- Taverna and lloyds are pre-scaffold consumers: add `@orkestrel/scaffold` (0.0.60), `@orkestrel/probe` (catalog `0.0.11`), `@orkestrel/test` (catalog `0.0.11`) before step 2.
- Supervisor is a post-scaffold target on `^0.0.50` with a stale catalog agent — same delete-`orkestrel.md`-first rule as `wave.md:18–24`.
- Terrain already holds the journey-suite shape lloyds lacks (`terrain/tests/app/browser/integration.test.ts` + `setup.ts` journey block). Lloyds `setup.ts` is the pre-journey half of that file.
- Taverna’s browser tests are component/DOM, not role/name journeys; its `tests/app/e2e` is HTTP.
- Supervisor already proves login/rail/reply/users through Playwright locals, not `@orkestrel/test/browser`.
- All three: `typescript` `^6.0.3`; audit will question major 7 and not cross it.
- Git status and whether any suite is already red: **unread** — `git status --porcelain` and the default `npm test` (supervisor: also whether `test:service` is in the visit’s “quality gates” step).
