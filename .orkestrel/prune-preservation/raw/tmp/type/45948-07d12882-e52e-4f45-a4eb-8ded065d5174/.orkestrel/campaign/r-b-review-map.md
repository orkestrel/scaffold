I'll read the brief first, then gather the evidence it asks for.I'll load the required rules, skill, briefs, and the frozen evidence slice next.The first glob missed the evidence slice. I'll locate those files and the remaining briefs.Evidence lives under `tmp/recovery/roughnotes`. Next I’ll read the briefs, report, status files, and frozen source.I’ll verify the frozen source, installed 0.0.18 signatures, config ownership, and whether status drifted after the freeze.Frozen R-B source is paused in `tmp/recovery/roughnotes` at baseline `86a9ef6`. Freeze hashes: `App.vue` `13C8D59F…`, `tests/setupBrowser.ts` `E6B0CFE2…`, `tests/setupBrowser.test.ts` `FEB12DF9…`, `tests/app/browser/integration.test.ts` `A13EE987…` (`tmp/recovery/roughnotes/tmp/units/r-b-frozen-hashes.txt`). Installed `@orkestrel/test` is `0.0.18`. Candidate Scaffold install, parent mutation controls, cold caches, published-artifact restoration, broad gates, and final audit remain open. Diagnostic greens below are not those gates.

## Status before and after

**Before (writer start):** empty `git status --short` at `86a9ef6` (`tmp/recovery/roughnotes/tmp/units/r-b-report.md:5`). Inherited replay `git apply …/tmp/audit/r-a-2-recovered.patch`.

**After (freeze):** `tmp/recovery/roughnotes/tmp/units/r-b-status.txt` / report `:124–170`.

Tracked R-B/test/config:
- `package.json`, `tests/setupBrowser.ts`, `tests/conformance.test.ts`, `tests/app/browser/integration.test.ts`, `tests/app/browser/App.test.ts`, `tests/app/browser/helpers.test.ts`, `tests/app/browser/controllers/ApplicationController.test.ts`, component/composable/style tests (import retarget `../setup.js` → `../../../setupBrowser.js`), deleted `tests/app/browser/setup.ts` and `setup.test.ts`
- Untracked: `tests/setupBrowser.test.ts` (`r-b-new-setup-proof.diff`)

Inherited R-A-2 product files in the same freeze (report `:5`, `:114`): `app/browser/components/HomeView.vue`, `MagazineView.vue`, `MediaView.vue`, `ProductsView.vue`, `app/browser/constants.ts`, plus App runtime/navigation in `app/browser/App.vue`

R-B product/guide: menu label/comments in `App.vue`, `guides/README.md`

Empty diffs named by the report: `configs/app/vite.browser.config.ts`, `app/browser/main.ts`, lockfile. `configs/app/vite.journey.config.ts` is absent from freeze status.

**Generated repair (inside this freeze, not a later concurrent write):** `vite.config.ts` gained `setupBrowser()` and added that project to `projects` (`r-b-actual.diff` around the `vite.config.ts` hunk; live `vite.config.ts:263–269`, `:321`). Trigger: successor repair `node node_modules/@orkestrel/scaffold/dist/bin/main.js repair --groups configs,manifest` after the plural `manifests` refusal (report `:93`). I did not re-run `git status` after freeze.

## Changed capabilities and owned paths

Effective briefs `tmp/units/r-b-brief-2.md`–`r-b-brief-8.md` keep original R-B capabilities and add: PowerShell/`npm.cmd`, test range `^0.0.18`, owned guide parity, brief-3 `hideMenu` comment, brief-4 `manifest` spelling, brief-5/8 diagnostic Vue/reduced hosts (not generated-host acceptance), brief-6 measured menu composition, brief-7 retire historical `optimizeDeps` override.

Delivered surfaces:
- Relocate app browser test infrastructure to `tests/setupBrowser.ts` (seed file expanded; `r-b-actual.diff` `tests/setupBrowser.ts` hunk)
- New proof `tests/setupBrowser.test.ts`
- Journey suite `tests/app/browser/integration.test.ts`
- Census `tests/app/browser/App.test.ts:256–289`
- Chain `package.json:24`, `:35`; range `package.json:54`
- Conformance `tests/conformance.test.ts:99–113` (plain factory has no forced `vue` include)
- Menu name `app/browser/App.vue:55`, `:242`; hide comment `:65–67`

## Published-to-local replacement map

Declarations checked under recovery `node_modules/@orkestrel/test/dist/src/` `0.0.18`:

| Local | Fate | Installed signature |
| --- | --- | --- |
| `QuotaStorage` / `PermissionStorage` | `createStorage` | `browser/index.d.ts:739`; `StorageOptions:2376`; `WebStorageInterface:2562` |
| name-only `readRefusal` | published overloads | `:1880`, `:1908` |
| `readAnnounced` | `readStates` after resolve | `:2057` |
| `readMenuSettled` | `readStates` on pre-click handle + `waitForState` + `waitForAnimations` | `waitForState` role form `:2547`; name form `:2512`; `waitForAnimations:2482` |
| `buildMarkControl` / local census | `buildCensus:101`, `readCensus:1589` | `integration.test.ts:8–9`, `:278–280` |
| composite stack | `buildContrast:136`, `readContrast:1652` | `integration.test.ts:333–336` |
| escape fixtures | `buildEscapes:186` | `integration.test.ts:303` |
| `isPainted` | `checkVisibility` + nonzero box | `setupBrowser.ts:376–384` |
| settle budgets | published `WaitOptions` at 4000ms | `setupBrowser.ts:469–481` |
| `readSettled` | `waitForAnimations` then `readContrast` | `integration.test.ts:249–250` |
| `readSurface` | keep `readGradientContrast` | `setupBrowser.ts:351–366` |
| `elementFromPoint` in journeys | `readHit:1750` | `integration.test.ts:184` |
| `waitForText` | `core/index.d.ts:847` | `integration.test.ts:5` |
| `VITE_CAPTURE` / split viewport | `inject('variant'|'variants'|'capture')`; `JourneyVariant` `core/index.d.ts:393` | `integration.test.ts:125–127`; `setupBrowser.ts:1044–1049` |
| `PermissionStorage` in helpers | `createStorage({ reads: false, writes: true })` | `helpers.test.ts:1`, `:83` |

Banned-name grep still hits `document.elementFromPoint` in `App.test.ts:88` (`readCentre`) and Contact/Payment/Subscribe form tests, plus `classList` in component tests. Original R-B-C1 pattern is not clean on the freeze tree. Journeys import published verbs at `integration.test.ts:1–36` and `setupBrowser.ts:13–33`.

## Remaining application-specific helpers and proofs

Kept/moved in `tests/setupBrowser.ts`: `mountView:1005`, `openSurface:430`, `clearSurface:417`, `startSubscription:457`, `followSite:466`, `openSite:494`, `closeSite:528`, `toggleThemeControl:555`, `applyTheme:1057`, `resizeViewport:1078` (`page.viewport`), `readCompact:88`, `readThemeControl:316`, `readIsland:393`, `readGradient:326`, `readGradientContrast:351`, `selectRole:376`, `THEME_PROBE:1026`, `DETAIL_SLUGS:561`, `SHELL_NAMES:577`, `CENSUS_ROUTES:615`, `DATA_CASES:839`, `ARRIVAL_CASES:880`, `EMPTY_CASES:922`, `MISSING_CASES:975`, request/filter acts `723–818`, `followRoute:656` (hash write), `readNames:676`, `readShared:695`, `waitForOrigin:1094`, `readFileName:1103`.

**Proofs:** `tests/setupBrowser.test.ts:83–228` (mount/clear, compact menu + `Get started, Site`, variants, gradient vs `readContrast`, census/`DATA_CASES`, empty/request acts).

**Consumers:** `integration.test.ts:51–87`; `App.test.ts` census; `ApplicationController.test.ts` (`openSurface`); style tests (`openSite`/`closeSite`); every component test (`clearSurface`/`mountView`); `useTheme.test.ts` (`THEME_PROBE`).

`followRoute` is used in `App.test.ts:257,285,327,329` and `setupBrowser.test.ts:214`, not in empty/missing journeys (`openSurface({ path })` then `clickAccessible` at `integration.test.ts:444–450`, `:468–474`).

Diagnostic host only: `tmp/recovery/roughnotes/tmp/probe/r-b-setup/vite.config.ts` composes `setupBrowser({ plugins: [vue()] })`. Report also names `vite.reduced.config.ts`. Those greens do not close `npm.cmd run test:setup:browser` on generated Scaffold `0.0.74`.

## Discovery / config ownership

- Journey axis: `configs/app/vite.journey.config.ts:7–12` variants `light-1280`, `dark-1280`, `light-390`, `dark-390`; wrapper `appJourney`.
- Browser wrapper stays generated `appBrowser()` with no `optimizeDeps` override (`configs/app/vite.browser.config.ts:1–4`). Brief-7 retired the original R-B handwritten override.
- Conformance asserts override composition and that plain `optimizeDeps.include` does not contain `bootstrap-icons` (`tests/conformance.test.ts:99–113`); historical `vue` include assertion removed (`r-b-actual.diff` conformance hunk).
- Generated `setup:browser` project: `vite.config.ts:263–269`, `:321`; script `package.json:24`, `:35`.
- `ProvidedContext` in `tests/setupBrowser.ts:1044–1049`.

## Families, intents, statechart, gradient

**Declaration:** `integration.test.ts:128–134` always `journey`, `refusal`, `matrix`, `transport`; `capture` only when `inject('capture')`. Pin `integration.test.ts:1206–1207`. Placement pin `:1210–1211`.

**Journey intents:**
- Arrival: `ARRIVAL_CASES` `setupBrowser.ts:880–908`; loop `integration.test.ts:402–421`. Guide routes `guides/README.md:116–121`.
- Unknown route: `integration.test.ts:423–434` mounts `/no-such-route`, perceives Introduction, no `COPY.missing`. Guide fallback `guides/README.md:116`.
- Empty/missing: `EMPTY_CASES` / `MISSING_CASES` `setupBrowser.ts:922–996`; journeys `integration.test.ts:438–483`. Guide data-state table `guides/README.md:369` onward (report cites Products/Magazine/Marketplace/Shop/Media).
- Document title: `integration.test.ts:418` records `Browser Mode host title ${document.title}`. Shared title `app/browser/index.html:6` `Rough Notes`.
- Render failure: no journey; report `:70`.

**Refusal:** `integration.test.ts:919–923` pins `SIGN_IN_ABSENT`; compact menu uses `MENU_UNREACHABLE` (`setupBrowser.ts:72`, `:496–500`).

**Matrix:** `integration.test.ts:939–1111` — `buildCensus`/`readCensus`, `buildEscapes`, `buildContrast`/`readContrast`, `readGradientContrast`, per-variant `resizeViewport` + `applyTheme`. Gradient selectors `GRADIENT_SURFACES` `setupBrowser.ts:132–144`.

**Transport:** `integration.test.ts:1113–1183` — second session over same store; `createStorage({ quota: 1 })`. Entity/storage reads corroborate (`:1128`, `:1136`).

**Statechart:** none declared. Core unions `Category:10`, `Department:25`, `Channel:30`, `View:39`, `SubscriptionField:59`, `InquiryField:67`, `InvoiceField:72` in `app/core/types.ts`. Browser `ApplicationEventMap:43`, `dark:113` boolean, `issues` derived `:75–85`, `NoticeCategory:253` `'empty' \| 'miss' \| 'partial'`. Guide `:258–261`.

**Gradient measurements (report `:45–58`, retained in `setupBrowser.ts:343–347`):** production hero/invite/issue-head `readContrast` 13.302707 vs stops 9.927318; footer monogram 15.537530 vs 4.634055; masthead monogram light 1.000000 vs 4.634055, dark 15.537533 vs 4.634055. `.card[data-bs-theme='dark']` not on mounted home; fixture-only. Matrix control refused 4.032234 / accepted 18.377988 vs bar 4.5.

## Capture artifacts and identity

Registry `STATES` `integration.test.ts:91–121`: named journey states plus `EMPTY_CASES`/`MISSING_CASES` state fields (`products-unpopulated`, `magazine-unpopulated`, `marketplace-unpopulated`, `shop-unpopulated`, `media-unpopulated`, `product-missing`, `article-missing`, `shop-missing`).

Filename identity: `{state}--{variant}.png` (`integration.test.ts:177`; portfolio `directory: '../../../tmp/capture/states'` at `:154–159`). Variants carry theme and viewport in the name (`vite.journey.config.ts:8–11`). Disk TSV `tmp/units/capture-inventory.tsv` columns `file`, `width`, `height`, `bytes`; decoded width matches variant width (1280 or 390); height is full-page (home rows exceed viewport height). Disk-membership proof `integration.test.ts:1193–1203`.

Journey artifacts `tmp/journeys/{variant}.txt` sections: `variant`, `viewport`, `capturing`, `## accessible tree`, `## focus order`, `## resolved styles`, `## journal steps`, `## page output`, `## capture frames` (`light-1280.txt:1–5`, `:145`, `:192`, `:298`, `:315`, `:317`). Frozen copies read `capturing: false` (`light-1280.txt:3`, `dark-390.txt:3`). Report `:89` says an ordinary run rewrites that header; PNG inventory is the capture-run disk evidence.

## Guide changes and product findings

Owned guide edits in `r-b-shared.diff` / `guides/README.md`: setup path `tests/setupBrowser.ts` (`:90–93`, `:410`); `Get started, Site` for every copy (`:141–143`); `aria-expanded` vs screen-reader speech (`:131–139`); `readGradientContrast` vs `readContrast` (`:220–232`); menu observation vs acting (`:235–239`); `CAPTURE=1` + journey wrapper (`:248–257`); no statechart (`:258–261`); missing title/render-failure contracts (`:267–269`); content-owned `appBrowser()` (`:272–274`); census/`DATA_CASES` (`:192–197`).

**Product findings (report `:65–70`):**
- Unknown route: home fallback, no miss notice (`guides/README.md:116`; `integration.test.ts:423–431`)
- No per-screen title (`app/browser/index.html:6`)
- No render-failure outcome in the guide; none invented

R-A-2 naming still in freeze: HomeView Introduction `aria-label` (`r-b-actual.diff` HomeView hunk), `COPY.join` moved (`constants.ts` hunk).

## Remaining proof commands

From freeze report `:99–118`. These have not been run by the paused writer:

Journey mutation: replace `startSubscription` click with `await waitForAnimations(document.body)`;  
`npx.cmd vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:light-390 -t 'lands on home and reaches subscribe through the content Get started control'`

Refusal mutation (parent-owned `App.vue`): add a visible native `Sign In` button; same wrapper/project with `-t 'leaves Sign In absent and keeps live logins as external links'`

Opening observation: omit `menu.value?.addEventListener('shown.bs.offcanvas', onMenuShown)` in `onMounted`;  
`npx.cmd vitest run --config tmp/probe/r-b-setup/vite.config.ts --no-cache --reporter=dot -t 'opens and closes compact navigation and resolves only the modal action'`  
(and reduced config). After candidate install: `npm.cmd run test:setup:browser` with no local Vue plugin.

Closing observation: omit `hidden.bs.offcanvas` / `onMenuHidden` registration; same setup target.

After candidate: `npm.cmd run test:setup:browser`; provider-only reduced diagnostic; `npm.cmd run test:app:browser`; `npm.cmd run test:journey`; `$env:CAPTURE='1'` then restore; nonmutating `test:policy`, `test:config`, `check`, `lint:check`, `format:check`, browser build; cold isolated Vite dependency caches. Report `:118` states Vitest `--no-cache` is not a cold Vite dep-cache claim.

`npm.cmd run test:setup:browser` on generated `0.0.74` failed before collection (`setup-first.log.txt`; report `:95`).

Recorded diagnostic (not acceptance): journey-final `172 passed | 4 skipped (176)` exit 0; capture `176 passed (176)` exit 0; `test:app:browser` `164 passed (164)` exit 0; `test:conformance` `12 passed (12)` exit 0; diagnostic setup override `6 passed (6)` exit 0.

## Source / report contradictions

- `integration.test.ts:123–124` says `vite.config.ts` declares variants; they are declared in `configs/app/vite.journey.config.ts:7–12`. Guide `:248–257` names the wrapper.
- Frozen journey headers are `capturing: false` while the report records a CAPTURE=1 green run; report `:89` says ordinary runs overwrite the artifact.
- Report cites `waitForState:2547`; that line is the role overload. Name-only overload is `:2512`. Call sites use the role form (`setupBrowser.ts:479`, `:544`; `App.test.ts:317`).
- Original R-B-C1 still matches `elementFromPoint` / `classList` under `tests/`. Report does not record that grep.
- Original brief made `guides/README.md` report-only; brief-2 owns guide passages; freeze includes `guides/README.md`.
- Original brief owned a handwritten `vite.browser.config.ts` override; brief-7 forbids it; freeze leaves `appBrowser()` with empty diff.
- Original brief limited App product edits to the menu `aria-label`; freeze also carries R-A-2 Home/Magazine/Media/Products/`constants.ts` plus App hide/location runtime (report attributes those to the inherited replay).
- `readPerception` is used for the Menu dialog (`setupBrowser.ts:514`); report `:43` notes published `readPerception` does not serve `main` and page content uses `readPage`.