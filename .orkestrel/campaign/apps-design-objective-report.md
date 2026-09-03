**Hold this shape:** prepare and visit are separate files with an Orchestrator commit between them; the online overwrite is a hard predecessor of every skill unit; surface work (Bootstrap + harness page) is Opus and precedes journeys (Sol); supervisor publishes from the visit’s runtime-range move, not from the journey suite. Do not copy terrain’s measured diagnostic counts into acceptance criteria. Do not make a writer’s whole-suite `npm test` a criterion.

The committed catalog table is not live for this campaign: it still prints `@orkestrel/scaffold` `0.0.59`, `@orkestrel/test` `0.0.11`, and `@orkestrel/supervisor` `0.0.1`. The brief names scaffold `0.0.60` and test `0.0.12` publishing beside this design. Every pin is the post-release catalog the Orchestrator regenerates, or a tarball restage the dispatch names, never that table as it sits today.

---

## Units

### `visit-taverna-prepare` — `sol` on GPT-5.6 Sol

**Objective.** Make taverna overwriteable: declare the missing planned packages, delete the stale catalog agent, and move or drop SessionStart hooks.

**Owned.** `package.json`; `.claude/agents/orkestrel.md` (delete); `.claude/settings.local.json` (create or append SessionStart from the current `.claude/settings.json`); report-only read of `.claude/settings.json`.

**Off-limits.** App source, tests, overwrite, install of the full graph except what adding the three packages requires.

**Depends on.** Nothing in this checkout. May run while lloyds and supervisor prepare.

**Unknowns the unit reports.** `git status --porcelain` and whether a staged/untracked lockfile pair exists (absorb did not read porcelain; the absorb brief’s lockfile claim is a kept-user fact). Whether `.claude/settings.local.json` is gitignored. Whether `0.0.60` / `0.0.12` are on the registry (`npm view`).

**Acceptance.**

- `devDependencies` declare `@orkestrel/scaffold` `^0.0.60`, `@orkestrel/test` `^0.0.12`, `@orkestrel/probe` at the live catalog caret. No other ranges move yet.
- `git ls-files .claude/agents/orkestrel.md` is empty (deletion is in the index or the working tree ready to commit).
- The report quotes the SessionStart hook bodies and states **moved** to `.claude/settings.local.json` or **dropped on the record**.
- The unit commits nothing.

**Attack.** An AC of “hooks still work after overwrite” is not checkable here: overwrite has not run, and `.claude/settings.local.json` may be untracked.

---

### `visit-lloyds-prepare` — `sol` on GPT-5.6 Sol

**Objective.** Same declaration hole as taverna. No catalog-agent deletion (absorb: no `orkestrel.md`).

**Owned.** `package.json` only.

**Acceptance.** The three packages declared at the same carets as taverna. Porcelain recorded. No `orkestrel.md` present, or if an untracked copy appears, the unit stops (wave: untracked copy refuses overwrite).

---

### `visit-supervisor-prepare` — `sol` on GPT-5.6 Sol

**Objective.** Delete the stale catalog agent (body and table both differ from the 0.0.60 floor). Record MCP and settings so overwrite cannot silently destroy operator state.

**Owned.** `.claude/agents/orkestrel.md` (delete); `.claude/settings.local.json` (permissions and hooks copied from `.claude/settings.json`, or dropped on the record). Report-only: `.mcp.json`, `.claude/settings.json`.

**Off-limits.** Re-pin of runtime ranges (that is the visit). Gitignoring `.mcp.json` (wave: a gitignored copy is a permanent `foreign` finding).

**Acceptance.**

- Catalog agent path is untracked/deleted, ready to commit.
- Report quotes `.mcp.json` server names and states they must live outside the repository after overwrite.
- Settings hooks/allow matrix: **moved** or **dropped on the record**.
- Scaffold is already declared (`^0.0.50`); this unit does not have to add it. Probe and test are present and stale; leave movement to the visit.

---

### Orchestrator commit (not a writer unit)

Commit each prepare in its own checkout: catalog-agent deletion, package.json declarations, and any **tracked** `settings.local.json`. Wave and `visit-overwrite-brief.md`: presence ownership never replaces present bytes; the re-pin/deletion must be committed before overwrite, or overwrite refuses uncommitted work. `--dirty` is only for a **user** dirty tree (terrain lockfile), and only after a deletion-candidate audit.

---

### `visit-taverna` / `visit-lloyds` / `visit-supervisor` — `sol` on GPT-5.6 Sol

**Objective.** Fleet visit: overwrite to the 0.0.60 host, latest `@orkestrel/*` carets including contract, install, format, gates, repair only `policy/no-nested-functions` (and sibling new-rule) diagnostics in **target-owned** `app/**` and `src/**`.

**Owned.** `package.json`, lockfile **except** a user-owned staged/untracked pair the prepare reported; every path overwrite writes or deletes; target `app/**` and `src/**` (supervisor) only where a new vendored rule reddens them; new tests only for exports the lint repair creates (terrain visit pattern).

**Off-limits.** Product chrome (`navbar-dark`, button families, confirmation, accessible names, Halfmoon route). Version bump and publish. Vendored files (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `configs/**` after overwrite writes them). Crossing TypeScript major 6 → 7.

**Depends on.** Matching `visit-*-prepare` committed. If `0.0.60` is unpublished: `scaffold overwrite --offline` then `scaffold audit --offline` (wave). If published: online overwrite. After every full install, restage the test `0.0.12` tarball with `npm install --no-save` so the manifest keeps a registry range.

**Do not treat terrain’s 28 nested-function sites as an AC.** That number is a measurement from terrain’s `lint:check` grep. These trees are unknown. The checkable criterion is: `lint:check` exit 0, and `policy(no-nested-functions)` matches none in that output.

**Acceptance (writer).**

- Closing `npx scaffold audit` (or `--offline`) exits 0. Every remaining audit line has an owner (setup proofs, TypeScript major: the app, as in terrain).
- Every `@orkestrel/*` range equals the **live** catalog version with a caret. `npm ls @orkestrel/test` is `0.0.12`. Digest of `node_modules/@orkestrel/test/dist` matches the campaign tarball (terrain visit proved this; copy that probe).
- Overwrite summary recorded; deletion set equals the pre-overwrite `foreign` set (`comm` as terrain did), or the unit stops.
- `npm run format:check`, `lint:check`, `check`, `build` exit 0 after repair. `npm test` is an **observation** with its summary line, not a criterion (orchestration: timing-sensitive whole-suite is not a unit AC).
- Nested-function repair: red-then-green of `lint:check` on the same command. Stop if a vendored file is red or a repair would change product behaviour.
- Supervisor only: `npm ls @orkestrel/contract` and whether `npm run check` treats nested copies as distinct types. Do **not** restore `^0.0.13` against the user’s latest-contract ruling; report the reading. `npm view @orkestrel/supervisor version` vs local `package.json` version (catalog `0.0.1`, repo `0.0.2` — which the registry serves is unknown). Rebuilt `dist/` vs published tarball: material or not. Runtime dependency set vs packument: **will differ** after declare; that is the bump trigger (`wave.md` § Rule on the bump).
- Lloyds: report that unused `src:*` factories are gone because overwrite replaced `vite.config.ts`, not because the unit hand-edited them.
- Taverna: report whether `tests/guides` is still empty and whether the `guides` Vitest project still includes it.
- Supervisor: list Vitest project names in `vite.config.ts` **after** overwrite. Whether `app:browser:integration`, `service:*`, and `probe` survived is unknown. Do not restore them in this unit (that would stale a planned `vite.config.ts` and fail audit 0).

**Attack.** “Playwright journeys still run” is not a visit AC: overwrite replaces `vite.config.ts` to the plan, and supervisor’s integration project is not in the terrain floor. Requiring a green audit and a custom project is a contradiction the evidence cannot satisfy.

**Attack.** “Install modern Halfmoon core on supervisor” is forbidden: the brief retains `halfmoon.min.css`.

---

### `visit-taverna-online` / `visit-lloyds-online` / `visit-supervisor-online` — `sol` on GPT-5.6 Sol

**Launch only if** the visit used `--offline`. Wave: `--offline` skips catalog and exits 1 with that note; a full overwrite must run after scaffold publishes, or the registry floor is what later audits compare.

**Depends on.** Matching visit; scaffold `0.0.60` on the registry; catalog regenerated.

**Hard predecessor of every skill unit in that checkout.** An online overwrite after journeys rewrites `AGENTS.md`, `vite.config.ts`, and vendored tests and can invalidate the suite. Do not start bootstrap or journeys on an `--offline` host.

**Acceptance.** Online `scaffold overwrite` then `scaffold audit` exit 0; catalog table inside `.claude/agents/orkestrel.md` matches the regenerated floor outside the markers (body restored because prepare deleted the stale file).

If the visit already ran online, **strike these units**.

---

### `surface-taverna` / `surface-lloyds` / `surface-supervisor` — `opus` on Opus 5

**Objective.** Application changes `enterprise-bootstrap` and the journey skill’s **page** require. This is the live `terrain-compliance-brief.md` work, scoped to chrome, names, confirmation, and the harness page — not the test families.

**Depends on.** Online visit in that checkout (or visit that was online from the start).

**Owned.** `app/**`. Transition **table** (from/event/to, typed on the entity unions) in an `app/` module the harness imports — `statechart.md` puts scenarios in test setup, but a page cannot import `tests/` (`AGENTS.md` environment boundary). `guides/**` for the harness route and changed chrome. `vite.config.ts` / app entry **only** if a harness route must be registered, recorded in the report.

**Off-limits.** `tests/**` except nothing: journeys own tests. `src/**`. `package.json`. Vendored configs. Supervisor `halfmoon.min.css` import path.

**Per checkout, what the evidence requires (user ruling).**

| Checkout | Required surface work the absorb can name |
| --- | --- |
| lloyds | Remove `navbar-dark`. Solid fills for Import/Export/Template/Delete/theme on the `bg-dark` rail (`btn-outline-light` fails 4.5:1 in dark). Destructive Delete: `btn-danger` plus confirmation ladder (absorb: no confirm today). Replace `BuildingTable.vue` inline `width` styles with utilities or a table column class. Per-row checkbox names that include the row’s identity (absorb warns the name may repeat). |
| taverna | Confirm ladder already exists; accept is already solid `btn-danger`. Apply the solid-vs-outline rule to remaining information-bearing actions (sign-out, retry). Per-row names on repeating entity/context rows if they share one accessible name. No inline `style` found — matrix still asserts `extractStyles` with named exemptions. |
| supervisor | Same destructive/outline/name rules on Stop (already arms to `btn-danger`), user remove, Retry. **Retain** `halfmoon.min.css` and no `data-bs-core="modern"`. Authored CSS (tokens, focus, pane, status): keep only what `inspection.md` § When an authored rule is already earned supports; focus ring width 0 is a bar failure to repair with a token rule that cites a reading, or exclude with that reading. Theme persistence is **not** in the user ruling — record retain or implement, do not silently expand. |

**Harness (all three).** One primary stateful control per surface, same table the journeys will import:

- lloyds: Delete idle/armed (and confirm, once the ladder exists).
- taverna: parked confirm open/closed (absorb’s strongest person-driven table).
- supervisor: Stop idle/armed.

Play per transition, play-all, state badge, event log, `role="status"`, every `STATECHART_ATTRIBUTES` value written from the published map, route deep link, demo step (`statechart.md`). Other statechart candidates (chat streaming, desk tabs, drawer) are **exclusions recorded in the report**, not silent omissions.

**Acceptance.**

- Grep over `app/**` for `navbar-dark`, `dropdown-menu-dark`, `btn-close-white`, `carousel-dark`: no match.
- Lloyds: no `style=` on `BuildingTable.vue` column markup.
- Destructive controls the surface renders idle as available: solid `btn-danger`. Disabled destructive: not full danger saturation, reason on `aria-describedby`. Confirm or undo exists for lloyds Delete (user named the ladder).
- Two rows on a list the journeys will drive resolve two different accessible names (prove in the journey unit; this unit’s check is source: each name interpolates row identity).
- Harness route loads; root carries `STATECHART_ATTRIBUTES.status`. Do **not** require the harness **gate** here — that gate presses play-all through `@orkestrel/test/browser` and belongs to journeys.
- Supervisor `app/browser/main.ts` still imports `halfmoon.min.css`.
- Scoped `format:check` / `lint:check` / `check` on owned files.

**Attack.** “Redesign the visual identity” from `frontend-design.md` is not this campaign. The user pinned specific chrome defects. A unit whose AC is “signature in the chrome” has no instrument in the evidence.

**Attack.** “Withhold Delete until selected, as terrain does” is not a bootstrap mandate. The skill requires neutralization of a disabled destructive and a confirmation ladder. Lloyds currently disables. The surface unit **records** withhold vs disable. Journeys assert the voice the surface actually throws.

---

### `journeys-taverna` / `journeys-lloyds` / `journeys-supervisor` — `sol` on GPT-5.6 Sol

**Objective.** Primary-surface suite on `@orkestrel/test/browser` `0.0.12`, the shape terrain’s `integration.test.ts` + `setup.ts` now hold after U6, U6s, FX3, FX3b — families declared, layer imported, matrix instruments with root-entered negative controls, transport through real stores, capture proofs, artifact, harness **gate**.

**Depends on.** Matching surface unit (names, confirm, harness route, transition table in `app/`).

**Owned.** `tests/app/browser/integration.test.ts` (create); `tests/app/browser/setup.ts` (or the existing app-local setup: lloyds `tests/app/browser/setup.ts`, supervisor `tests/setupBrowser.ts` / `setupPortfolio.ts`); `tests/setupBrowser.ts` only to **delete** duplicated verbs and re-point importers; `tests/setup.test.ts` and `tests/setupBrowser.test.ts` if the post-visit audit still asks. Supervisor: retire or re-point local `findControl` / `resolveJourneyTarget` / portfolio helpers; zero imports of a second resolver.

**Off-limits.** `app/**` (stop if the harness cannot mount on the declared table). `package.json`. Using `stagePane`+`releasePane` as a resize (FX3b: rebuilt `releasePane` hands the old viewport back). Raising a 390 pane to 1900 to hide a layer clip (FX3 then FX3b reversed it). Routing rendered claims to `prove` (`decide.md`: probe `0.0.11` cannot serve a browser project; unknown whether `0.0.12` probe moved — do not route until a unit measures it).

**Families.** Declare every family whose trigger the surface meets. Skill: refuse a declaration that omits one. Absorb already names the triggers:

- Always: journey, refusal.
- Matrix: each ships light/dark and an `lg` split.
- Statechart: the primary armed control.
- Transport: taverna (cookie + CSRF + IndexedDB conversations + localStorage); lloyds (IndexedDB schedule/settings — `failBootDriver` already in comments); supervisor (session cookie + `localStorage` reload + SSE). Supervisor’s old Playwright HTTP file is **not** this family unless `app:browser` still has a server. If overwrite removed the Node integration project, transport is the in-page family only; HTTP e2e is **excluded on evidence** and named.
- Capture: under the flag.

**In-scope intents (bound).** Not every capability-gated verb. Named in each brief from absorb:

- lloyds: add, select, delete (through confirm), import, export, ZIP retry.
- taverna: login/register, search/open, create, edit/save, soft-delete+confirm, archive restore, prompt, approve/deny parked confirm, retry turn, sign-out, theme.
- supervisor: login (including refusal voice already quoted), open run from rail, completion, reply, users add/remove, stop arm, theme, logout.

Keyboard Tab on the primary command in at least one journey. Accessible names are **this** surface’s (`Add building`, not terrain’s `Add new building`).

**Variants.** Declare `CaptureVariant` from the CSS `lg` breakpoint the surface reads and a phone width. Default to terrain’s names (`light-1280`, `dark-1280`, `light-390`, `dark-390`) **after** reading the actual `LG_MEDIA` / Halfmoon breakpoint. Supervisor’s old `1440×900` is a custom portfolio, not a skill requirement. `apply` sets `data-bs-theme`. After mount, not before, if a controller writes a stored theme (terrain decision). `page.viewport` to size; do not wrap `stagePane`.

**Artifact.** One gitignored `tmp/` file per variant: `describeTree`, `describeFocus`, matrix rows, journal steps/output, capture filenames (`decide.md`). That is an AC: files exist after a capture run and are named for the variant.

**Capture clip.** Import `readFrame` from the layer. Assert width and floor against the surface background. If a 390 capture run is red on runner-white floor, **stop and report** as a layer defect. Do not make “every 390 frame complete” a criterion until the unit reads `0.0.12` `captureFrame` and films once. FX3b left that red on `0.0.11`.

**Acceptance (writer).**

- `FAMILIES` asserted: every listed family has a proof; no proof outside the list.
- `grep` `@orkestrel/test/browser` in the journey file; `grep` of local `findControl` / `waitForCondition` / `querySelector` on journey paths is empty (pre-campaign `querySelector` in lloyds component helpers: retain only if no journey calls them, as FX3 ruled).
- Ordinary run green for the integration file at each declared variant; capture-membership skipped without the flag. Capture run per variant: disk membership green **or** the 390 floor failure quoted as layer defect.
- Harness gate: play-all through `clickAccessible`; poll `STATECHART_ATTRIBUTES.status` to `passed`; failed tally 0.
- Artifact files exist under `tmp/` named by variant after a run.
- Matrix: contrast on primary command and armed destructive; `COMPONENT_CONTRAST` vs text bar recorded; authored-class census population reported and > 0; both negative controls appended to the **read root**; `extractStyles` on undriven tree with named exemptions (Bootstrap modal `display:none`, `v-show`).
- Transport: second session over the same real driver; storage-failure visible sentence + retry. No new fixture if one already exists (`failBootDriver`).
- Scoped format/lint/check on owned files.
- `npm run test:app:browser` (or the post-overwrite equivalent) is an observation.

**Attack.** “All Playwright supervisor integration tests still pass” is uncheckable if overwrite deleted that project. Replace with the in-page family the skill names.

**Attack.** A writer AC that `npm test` exits 0 is forbidden. Supervisor’s `prepublishOnly` including `test:service` is a **publish** observation for the Orchestrator after the unit exits.

---

### `publish-supervisor` — Orchestrator (user credential), not a bench writer

**Depends on.** `visit-supervisor` gates (runtime `dependencies` moved). Not on journeys: `files` is `dist/src` and `README.md`; app UI is unpublished. If visit repaired `src/**`, that surface is in the same bump.

**Order from wave § Prepare a layer.** Read registry version first (do not bump from local `0.0.2` if the registry still serves `0.0.1`). Re-pin already done. Sweep prior version literals in `src/` and `tests/`. `prepublishOnly` green on the host. Commit and push. User publishes. Independent `verifier` reads the packument after.

**Acceptance.** Registry version is the bump from the packument head; runtime ranges match the live catalog; `npm view` after publish equals the bumped version. Taverna and lloyds: **no** bump (unpublished apps; lloyds `publishConfig.access: public` on `0.0.0` is recorded, not acted on).

---

## Parallel and serial order

**Across checkouts:** taverna, lloyds, and supervisor run in parallel. One writer per checkout.

**Inside each checkout:**

```text
visit-*-prepare
  → Orchestrator commit
  → visit-*
  → visit-*-online   (only if overwrite was --offline; else strike)
  → surface-*
  → journeys-*
```

`publish-supervisor` after `visit-supervisor` (and `visit-supervisor-online` if it ran), and may overlap `surface-taverna` / `journeys-taverna` / lloyds work. It must not overlap any **supervisor** writer.

**Campaign-level gate before skill units:** scaffold `0.0.60` and test `0.0.12` on the registry, catalog regenerated. If the beside-release has not landed, visits may still `--offline` + tarball, but surfaces and journeys wait.

**Verifier** (native cheap tier) after each visit and after each journeys unit: authoritative `format:check` → `lint:check` → `check` → `build` → `test`. Those full-suite results are the campaign’s, not the writer’s.

---

## Risks and settling probes

| Risk | Why the evidence says so | Settling probe (named in the unit) |
| --- | --- | --- |
| Overwrite refuses on dirty work | Terrain first refusal was missing `probe`, not dirty; second class is uncommitted re-pin | Prepare + Orchestrator commit; unit records porcelain before overwrite; `--dirty` only if prepare reported a **user** dirty path and the deletion set is clean |
| `--offline` floor vs later online audit | Wave: online verbs read published host; unpublished scaffold writes the older floor | `npm view @orkestrel/scaffold version`; if not `0.0.60`, `--offline` and keep `visit-*-online` |
| Probe floor string behind catalog | Terrain overwrite quoted `^0.0.10` while catalog was `0.0.11` | On refusal, declare the **catalog** caret, not the message’s floor |
| `no-nested-functions` reds app/src | Terrain: new `configs/policy.ts`, 28 diagnostics, all target code | `lint:check` excerpt; repair in owned source; stop if vendored |
| Duplicate `@orkestrel/contract` types | Overwrite-brief: published dependents still `^0.0.13`; user wants latest; terrain `check` stayed 0 | `npm ls @orkestrel/contract`; `npm run check`; report, do not restore `0.0.13` |
| Taverna/supervisor settings wiped | Overwrite replaced terrain’s `.claude/settings.json`; absorb names SessionStart and a large allow matrix | Prepare move-or-drop; after overwrite, `git diff .claude/settings.json` is the vendored floor |
| Tracked `.mcp.json` deleted | Terrain deleted it; wave: gitignoring it is permanent foreign | Prepare records servers; after visit, path is gone and not gitignored |
| Supervisor custom Vitest projects vanish | Overwrite replaced terrain `vite.config.ts`; supervisor’s file carries extra projects | Diff project names before/after; journeys adapt; do not restore inside visit |
| Capture clip at phone height | FX3b: `0.0.11` `captureFrame` still clips; campaign is `0.0.12` | One `VITE_CAPTURE=true VITE_VARIANT=light-390` run; `readFrame` floor vs `style(body, background-color)` |
| `includeHidden` glyph names | U6 blocked; U6s closed on a rebuilt `0.0.11` | Resolve an icon-bearing name (`CSV`, `Quick reference`); if exact match fails, stop as layer defect |
| `releasePane` used as resize | FX3b baseline 8-red | Journeys use `page.viewport` only |
| User lockfile pair | Absorb unread; terrain brief forbade touching it | Prepare porcelain; visit never `git add` that pair |
| TypeScript 7 audit line | Non-blocking question; terrain left it | Retain major 6; remaining audit line owned by the app |
| Supervisor publish from wrong head | Catalog `0.0.1`, repo `0.0.2` | `npm view @orkestrel/supervisor version` before bump |
| Empty taverna `guides` project | Absorb: include with no files | After overwrite, list `tests/guides`; empty tree is retain, not a fake test |
| Lloyds `test:app:browser` split invocations | Absorb: three serial vitest calls; overwrite rewrites scripts | After visit, record the new `test` / `test:app:browser` scripts; journeys use `--project app:browser` |

---

## Exit criterion

Each capability ends in one of the four states. Unknowns stay unknown until the named unit reports.

1. **Canon host** — taverna, lloyds, and supervisor on scaffold `0.0.60` files; `scaffold audit` exit 0. **Implemented.**
2. **Ranges** — every `@orkestrel/*` caret equals the regenerated catalog after the beside-release; `node_modules/@orkestrel/test` is `0.0.12` by digest. **Implemented.**
3. **Foreign instruction-canon paths** — removed; deletion set equals the pre-overwrite foreign set. **Implemented.**
4. **Operator overlays** — SessionStart/hooks/MCP not in vendored `.claude/settings.json` or tracked `.mcp.json`; moved to `.claude/settings.local.json` / outside the tree, or **excluded on the record**. **Repaired** or **excluded**.
5. **`policy/no-nested-functions`** — green on target `app/**` and `src/**`. **Repaired.**
6. **TypeScript major 6** — not crossed. **Retained.**
7. **Latest contract on supervisor runtime** — declared, gates recorded (including nested copies). **Implemented.** Supervisor version bumped from **registry** head and published. **Implemented.** Taverna/lloyds versions unmoved. **Retained.**
8. **Lloyds `src:*` factories** — gone via overwrite, not hand-kept. **Implemented** (as a visit observation).
9. **Taverna empty `guides` include** — still empty unless overwrite added mirrors. **Retained** or **implemented** per that report.
10. **Bootstrap chrome** — no `*-dark` component classes; no authored column `style=` on lloyds; information-bearing actions solid; destructive solid + ladder; disabled destructive neutralized; unique per-row names on lists the journeys drive. **Implemented.**
11. **Supervisor Halfmoon** — `halfmoon.min.css`, not modern core. **Retained.**
12. **Supervisor authored CSS** — rung 4 only where an inspection reading earns it; focus-width 0 closed or **excluded** with the reading. **Repaired** or **excluded.**
13. **Journey families** — declared and proved on `@orkestrel/test/browser`; local duplicate verbs gone. **Implemented.**
14. **Statechart harness + gate** — page on the `app/` table; gate through the interface. **Implemented.** Extra candidates (chat, drawer, desk) **excluded** in the surface report.
15. **Per-variant artifact** under `tmp/`. **Implemented.**
16. **Capture portfolio** — filename and placement proofs always on; disk membership under the flag. Phone-height complete frames: **implemented** if `0.0.12` films a surface floor, else **excluded** as a layer defect with the FX3b-shaped reading.
17. **HTTP Playwright supervisor integration** — **excluded** if overwrite removed the project; **retained** only if the floor still contains it and audit stays 0.
18. **Setup proofs** the audit asks for (`tests/setup.test.ts`, `tests/setupBrowser.test.ts`). **Implemented** if the line remains; **retained** as an app-owned non-blocking question if the visit left it that way (terrain).

Accept when this list is closed and the independent verifier’s gate chain is green on each checkout. Reopening a retained or excluded row is the user’s instruction.

---

## Why this shape, and what to refuse

**Prepare ≠ visit.** Wave step “delete and commit before overwrite” and `visit-overwrite-brief.md` make the commit the Orchestrator’s. A single visit unit that cannot commit will either stop (terrain’s stale `orkestrel.md` stayed open) or pass `--dirty` and leave a stale body. Taverna and supervisor need that deletion; lloyds does not, but still needs the missing packages **before** overwrite (terrain’s first refusal: probe undeclared, configs/tests blocked).

**Online overwrite before skills.** `--offline` then journeys then online overwrite is how you delete your own suite’s assumptions. Terrain’s visit rewrote `AGENTS.md`, `vite.config.ts`, `.claude/settings.json`, and installed the nested-function rule. Skill units must read **that** law.

**Surface before journeys, split engines.** Terrain U6 kept `app/**` off-limits and then could not close the harness, unique row names, or solid Delete. `terrain-compliance-brief.md` is still the live carrier of those rows. Combining them again into one T1-shaped unit mixes Opus chrome with Sol proofs and contends on `app/**`. Split so the harness and transition map live in `app/` (Opus), scenarios and FAMILIES in `tests/` (Sol), no shared writes.

**Do not merge journeys into visit.** Visit’s deviation contract forbids product-behaviour repair. Confirmation, names, and `navbar-dark` are product behaviour. Nested-function extraction is not.

**Refuse these ACs if the other lane proposes them.**

- Any numeric nested-function quota (terrain’s 28 is not these trees).
- Writer `npm test` / `test:service` / `test:app:browser` wall-clock green.
- Supervisor modern core / `data-bs-core="modern"`.
- Survival of supervisor’s extra Vitest projects **and** audit 0.
- Pins taken from the committed catalog table without regeneration.
- Terrain copy strings (`Add new building`) as lloyds criteria.
- Capture-complete-at-844 as a criterion before `0.0.12` is filmed.
- Restoring contract `^0.0.13` on supervisor against the user ruling.
- Gitignoring `.mcp.json` to “keep” MCP.
- A `prove` receipt for a browser-rendered claim without a fresh probe measurement.

**Unknown until a unit runs:** porcelain and lockfile pair; registry presence of `0.0.60`/`0.0.12`; registry head of supervisor; nested-function sites; whether `check` fails on duplicate contract in supervisor; whether `0.0.12` capture still clips; whether overwrite keeps supervisor service/integration projects; `LG_MEDIA` pixel widths; whether `settings.local.json` is ignored; whether probe `0.0.12` (if it exists) still cannot serve browser `prove`. Each is a report line, not a guess in a brief.
