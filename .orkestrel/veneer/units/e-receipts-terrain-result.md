# E-RECEIPTS terrain — Grok result

Cursor Grok (`grok-4.7-high`), read-only ask mode, rooted at `/home/user/veneer-read` (Veneer `main` `4cd56a8`); brief
`e-receipts-terrain-brief.md`; session `dbf8fa99-4359-4441-b98c-5db11b4054cc`; journal `tmp/cursor/e-receipts-terrain.jsonl`
(swept at acceptance). The distillate follows as returned, from its first section.

## 1. The promise

**`package.json` host fields**

- `engines.node` is `">=22.18.0"` (`package.json:128-129`).
- `devEngines.packageManager` is npm `"version": ">=11.6.0"` with `"onFail": "error"` (`package.json:121-126`).
- There is no `browserslist` field in `package.json`.
- No `os`, `cpu`, or `browser` field. Nearby version ranges in `devDependencies`: `"tailwindcss": "^4.3.3"` (`package.json:113`), `"@tailwindcss/postcss": "^4.3.3"` (`package.json:103`), `"vue": "^3.5.43"` (`package.json:118`), `"playwright": "^1.63.0"` (`package.json:110`).

**`README.md`**

- "On Windows PowerShell, invoke npm through `npm.cmd`." (`README.md:15`).
- Browser column: "Managed Chromium, Playwright revision `1243`, Windows; the retained instrument record of the same date reports the provider as `HeadlessChrome/153.0.8010.12`" (`README.md:19`).
- "Chromium `141.0.7390.37` (Playwright revision `1194`, Linux)" (`README.md:20`). The same cell also names "Chromium `153.0.8010.12`".
- "Edge `153.0.4234.48`" (`README.md:21`).
- "Chrome" (`README.md:22`), with no version.

**`guides/veneer.md`**

- "Veneer supports Tailwind 4.3." (`guides/veneer.md:3313`).
- "Scaffold mandates the Vue toolchain for an `app/browser` environment, and this shell declares no component in it" (`guides/veneer.md:10609-10611`). No Vue version.
- Chromium 141 and Chromium 153 are named as the builds a behavior was read on (`guides/veneer.md:2780-2781`, `guides/veneer.md:2793`, `guides/veneer.md:2826`, `guides/veneer.md:2986`, `guides/veneer.md:3537-3546`), not as a supported-range sentence.

**`ROADMAP.md`**

- "Remain compatible with Tailwind CSS without requiring it." (`ROADMAP.md:41`). No Tailwind version.
- "Use browser APIs available in Chromium and Chromium-based browsers such as Chrome and Edge where they satisfy the required behavior." (`ROADMAP.md:54`). No versions.
- "Provide Vue compatibility through an adapter over the owned engine, without making Vue a Veneer runtime dependency." (`ROADMAP.md:30`). "Deliver Vue later as a `src/vue` environment with its own package export and no declared dependency of any kind" (`ROADMAP.md:154-155`). No Vue version.
- Standing-condition cell: "The host runs npm `10.9.7`; `package.json` pins `devEngines.packageManager` to npm `>=11.6.0` with `onFail` set to `error`." (`ROADMAP.md:227`).
- Standing-condition cell: "Playwright `1.63.0` expects `chromium-1243`; this host carries `/opt/pw-browsers/chromium-1194`, Chromium `141.0.7390.37` (`HeadlessChrome/141.0.0.0`), and browser downloads are disabled." (`ROADMAP.md:228`).
- "Receipts: each recorded receipt names its browser build; the promised hosts are recorded." (`ROADMAP.md:260`).
- "E-RECEIPTS records the promised hosts (F4 HOST-OBSERVATIONS pinned them, `af673cb`); the install is the user's" (`ROADMAP.md:440`).

## 2. The receipts

**`README.md` browser table** (`README.md:15-22`). Intro: "The browser receipts are recorded separately".

| Where | Build named | Words |
| --- | --- | --- |
| `README.md:19` | Yes. `HeadlessChrome/153.0.8010.12`. Also Playwright revision `1243`, Windows. | "The source, application, setup, styles, and journey projects pass on 2026-09-20. The journey variants are `light-1280`, `dark-1280`, `light-390`, and `dark-390`." |
| `README.md:20` | Yes. Chromium `141.0.7390.37`, Playwright revision `1194`, Linux. The result cell also names Chromium `153.0.8010.12` as the other build. | "The gate chain passes on 2026-09-22: `format:check`, `lint:check`, `check`, `build`, and every test project `npm test` invokes, with the oracle fixture `tests/fixtures/oracle/button.json` re-recorded on this build; the registry-gated `distribution` project is outside that chain." The detached-host `event.target` cases "read `null` on this build, where Chromium `153.0.8010.12` returns the host". |
| `README.md:21` | Yes. Edge `153.0.4234.48`. | "The host verification receipt remains assigned to the Orchestrator: run `npm test` with `PLAYWRIGHT_CHANNEL=msedge`. No Edge result is inferred from Chromium." |
| `README.md:22` | No version string. The name is Chrome. | "Open: Chrome is not installed on this host. Install Chrome and run the browser gates with `PLAYWRIGHT_CHANNEL=chrome` to obtain its receipt." |

**`guides/veneer.md` § Compatibility** (`guides/veneer.md:10235`).

- Ledger of "what Veneer accepts from Bootstrap 5.3.8" (`guides/veneer.md:10237`). Columns: Component, Kind, Obligation, Proof, Status (`guides/veneer.md:10253-10254`). Rows run through the engine plugin rows (`guides/veneer.md:10506-10516`).
- "The installed Test `MediaOptions` contract stages forced colors through its `forced` axis, and the forms proofs read under it the outline's style and width on each focused text control, select, check, and range. Button's own forced-colors browser reading is B-PASSIVE-CLOSE-B's; until it lands, the cascade's system-color fallbacks for the button have no browser reading." (`guides/veneer.md:10248-10251`). No browser build.
- Proof cells name test paths such as `tests/src/browser/Collapse.test.ts` (`guides/veneer.md:10506`) or a dash. A search of `guides/veneer.md` for `141.0`, `153.0`, `HeadlessChrome`, `Playwright revision`, `Windows`, and `Linux` matched nothing. The Compatibility table names no browser build.

**Other guide sentences that state a result on a host.** None of these carry an exact version string (`141.0.7390.37`, `153.0.8010.12`, `153.0.4234.48`, or `HeadlessChrome/…`).

- "Where the element has none, as on Chromium 141, it parses the markup inert" (`guides/veneer.md:2780-2781`). "On Chromium 153 the walk and the `setHTML` method build the same tree for every input measured" (`guides/veneer.md:2793-2794`).
- "Chromium 153 dispatches the closing `beforetoggle` event with `cancelable` set to `false`" (`guides/veneer.md:2826`, again `guides/veneer.md:2986-2987`).
- Preflight columns "each read on Chromium 141." Chromium 153 "gives a `select` element another background". "The proof runs the pairing under the host's own defaults and under a staged stand-in for the Chromium 153 `select` and `table` defaults … and passes under both." (`guides/veneer.md:3535-3546`). The table header is Tag, Property, Standalone, Preflight (`guides/veneer.md:3548`).
- "the managed Chromium and Edge receipts this cascade is proved on resolve it" (`guides/veneer.md:5492`, `guides/veneer.md:5909-5910`, `guides/veneer.md:6020-6021`, `guides/veneer.md:6178-6179`, `guides/veneer.md:6364-6365`, `guides/veneer.md:6666-6667`). "resolve them" at `guides/veneer.md:5842-5843`.
- Deferred-selector rows: "`::-moz-focus-inner`" is "unreachable on the managed Chromium and Edge receipts" (`guides/veneer.md:6791`). "`::-webkit-file-upload-button`": "the managed Chromium and Edge receipts resolve it" (`guides/veneer.md:6792`).
- "The hover and active percentages reproduce the run-6 filled-role readings in managed Chromium and Edge" (`guides/veneer.md:7215-7216`).

**`ROADMAP.md`**

- Chrome receipt row (`ROADMAP.md:440`): "E-RECEIPTS records the promised hosts (F4 HOST-OBSERVATIONS pinned them, `af673cb`); the install is the user's". No browser build in the row.
- Audit claim 14 (`ROADMAP.md:493`): "Retired as mis-stated; E-RECEIPTS runs the distribution proof in release mode". No browser build.
- npm host row (`ROADMAP.md:227`): the host "runs npm `10.9.7`". Consequence: "A bare `npm run` and an `npx` invocation exit `EBADDEVENGINES`". No browser build.
- Playwright host row (`ROADMAP.md:228`): names Playwright `1.63.0`, `chromium-1243`, `/opt/pw-browsers/chromium-1194`, Chromium `141.0.7390.37`, and `HeadlessChrome/141.0.0.0`. Consequence includes "the rows the engine session's Chromium 153 host read red under E5 read green there" and "Chromium 141 clears an event's `target` after `dispatchEvent` returns on a detached host." Chromium 153 is a major, not an exact version string. `HeadlessChrome/141.0.0.0` is not the same string as `141.0.7390.37`.
- Sandbox row (`ROADMAP.md:230`): "With `-c sandbox_workspace_write.network_access=true` the listener binds, Chromium launches, and the browser projects run." No version string.
- Preflight carrier (`ROADMAP.md:545`): "the proof reads red on the engine session's Chromium 153 host (D45)". Closure: "the proof runs under the host defaults and a staged Chromium 153 stand-in". No exact version string.

## 3. F4 HOST-OBSERVATIONS

`git show --stat af673cb` is commit `af673cb4938f96392797f4a1ecb71160a2b0db70`, message "Read host observations at delivery and restore class-attribute presence (F4)", 66 files. The ROADMAP unit row says it landed at that commit (`ROADMAP.md:277`). The Chrome-receipt carrier points at the same commit (`ROADMAP.md:440`).

Hosts that commit recorded:

- README receipt row for managed Chromium, Playwright revision `1243`, Windows, provider `HeadlessChrome/153.0.8010.12`, projects pass on 2026-09-20. That row is still `README.md:19`.
- README receipt row for Chromium `141.0.7390.37` (Playwright revision `1194`, Linux), gate chain passes on 2026-09-22. That row is still `README.md:20`. The same cell names Chromium `153.0.8010.12` as the build that returns the detached-host target.
- Edge `153.0.4234.48` left as an assigned receipt with no inferred result (`README.md:21`). Chrome left open with no build (`README.md:22`).
- Oracle fixture field `"browser": "141.0.7390.37"` (`tests/fixtures/oracle/button.json:4`). The commit message says the fixture was re-recorded on Chromium `141.0.7390.37`.

Where that record lives now: the README rows above; `tests/fixtures/oracle/button.json:4`; `OracleFixture.browser` (`tests/setupServer.ts:188`); `recordButtonOracle` writes `browser: browser.version()` (`tests/setupServer.ts:3445-3448`). `scanOracleFixture` requires `saved.browser` to be a string and drops both browser fields before comparison (`tests/setupServer.ts:3271-3276`, `tests/setupServer.ts:3305-3306`). The remark: "The browser build is required provenance and is excluded from comparison across builds." (`tests/setupServer.ts:3262`).

The commit's `guides/veneer.md` hunk did not name a browser. It added the class-attribute restoration and delegated-release sentences. Those sentences now sit at `guides/veneer.md:327-333`.

In that commit, `browser.version()` was written in `tests/setupConformance.ts`. The function now lives in `tests/setupServer.ts`.

## 4. The distribution proof

Script: `"test:distribution": "vitest run --config vite.config.ts --no-cache --reporter=dot --project distribution"` (`package.json:72`). `prepublishOnly` runs it as `npm run test:distribution -- --mode release` (`package.json:90`).

Vitest project `distribution` (`vite.config.ts:381-394`): `include: ['tests/distribution.test.ts']`, `setupFiles: ['./tests/setup.ts']`, `environment: 'node'`. It is registered on the default config (`vite.config.ts:433`). The test file that include selects is `tests/distribution.test.ts`. `tests/setup.ts` is the setup file.

Release mode is `const RELEASE = import.meta.env.MODE === 'release'` (`tests/distribution.test.ts:48-51`). The comment says `prepublishOnly` invokes `--mode release`, and "Release is the publish gate, so evidence it cannot obtain fails there and skips everywhere else."

What it packs and installs (`tests/distribution.test.ts:826-904`): `npm pack --ignore-scripts` into a temp `packed` directory; it requires one `.tgz`; it writes a private `distribution-consumer` manifest and ESM/CJS drivers; `npm install --ignore-scripts --no-audit --no-fund` of that archive into the consumer. `runNpm` sets `npm_config_cache` to a scratch cache (`tests/distribution.test.ts:244-250`). On Windows the npm binary is `npm.cmd` (`tests/distribution.test.ts:36`).

Registry and network (`tests/distribution.test.ts:65`, `tests/distribution.test.ts:915-934`): `openStage` runs `npm ping` with `--fetch-retries=0`, `--fetch-timeout=5000`, `--loglevel=silent`. If ping fails and mode is not release, the stage is absent and `requireStage` skips with "`npm ping` did not answer, so nothing was packed or installed" (`tests/distribution.test.ts:1009-1012`). If ping fails in release mode, it throws "The release gate requires a reachable npm registry, and npm ping did not answer". The comment says installing the archive resolves the package's runtime dependencies, so an unreachable registry leaves nothing to measure. Browser cases that fail to launch skip outside release and throw "The release gate requires a browser" in release mode (`tests/distribution.test.ts:1022-1025`, and the same pattern at `1054-1057`, `1258-1261`, `1288-1291`). `describeBrowser` names an endpoint, an executable path, a channel, or "the Chromium Playwright installed for itself" (`tests/distribution.test.ts:625-632`). It does not read a version string.

Assertions, all in `tests/distribution.test.ts`:

- Classifiers, no registry stage (`tests/distribution.test.ts:939-1004`).
- Installed consumer, registry required: cascade layer order `theme`, `reset`, `base`, `elements`, `components`, `utilities` (`tests/distribution.test.ts:1017-1042`); packed-CSS readings for row, table, cell, container, gutter, and link (`tests/distribution.test.ts:1049-1098`); one archive and an installed `package.json` (`tests/distribution.test.ts:1101-1105`); every relative export target exists (`tests/distribution.test.ts:1108-1114`); types for every published module (`tests/distribution.test.ts:1121-1139`); only relative or `@orkestrel/` specifiers (`tests/distribution.test.ts:1146-1161`); an unnamed subpath fails with `ERR_PACKAGE_PATH_NOT_EXPORTED` (`tests/distribution.test.ts:1164-1170`); a consumer compiles under every module resolution (`tests/distribution.test.ts:1177-1201`).
- Per installed entry (`tests/distribution.test.ts:1205-1311`): Node import surface, Node require surface, the published button engine in a browser (`rest=null`, `pressed=true`, `active=true`, `engine=true`, `released=null`, `restored=false`), and the browser declaration surface.

`README.md:24-26` states the same skip and release-mode failure: "Registry-dependent cases skip when `npm ping` cannot reach the registry; `npm run test:distribution -- --mode release` requires that evidence and fails when it cannot obtain it."

## 5. The machinery that names a build

Search under `tests/` for `browserVersion`, `userAgent`, and `HeadlessChrome`: no matches.

The recorder is `recordButtonOracle` in `tests/setupServer.ts`. It launches Playwright `chromium` through `resolveBrowser(resolvePinnedBrowser(), process.platform, process.env)` (`tests/setupServer.ts:3327-3334`) and returns `browser: browser.version()` (`tests/setupServer.ts:3448`). Callers:

- `tests/conformance.test.ts:271`, which compares that recording with `tests/fixtures/oracle/button.json` through `scanOracleFixture` (`tests/conformance.test.ts:276-277`).
- `tests/setupServer.test.ts:675` and `tests/setupServer.test.ts:724`.

`scanOracleFixture` (`tests/setupServer.ts:3264`) does not read a live browser. It requires the saved `browser` string and then excludes it. The proof of that exclusion is `tests/setupServer.test.ts:987-998`, including a stand-in browser `'different-build'`. A fixture literal `browser: '141.0.7390.37'` is passed to `scanOracleObligation` at `tests/setupServer.test.ts:1670`.

`tests/distribution.test.ts` `launchBrowser` (`tests/distribution.test.ts:635-638`) and `describeBrowser` (`tests/distribution.test.ts:625-632`) launch or name an executable, endpoint, or channel. They do not call `version()`.

`tests/setupService.ts` checks that a Chromium executable path is present (`tests/setupService.ts:120`, `tests/setupService.ts:160`). It does not read a version string. Executable resolution used by the tests lives in `configs/browsers.ts` (`resolvePinnedBrowser` at `configs/browsers.ts:130`, `resolveBrowser` at `configs/browsers.ts:289`), outside `tests/`.

## 6. Gaps

Promised host with no receipt of a run on that host:

- Chrome, no version (`README.md:22`, `ROADMAP.md:440`). The README cell says the receipt is open.
- Edge `153.0.4234.48` (`README.md:21`). The version is named. The cell says the receipt remains assigned and that no Edge result is inferred.
- Node `>=22.18.0` (`package.json:129`). No run result in the README, the guide, or the roadmap names a Node version.
- npm `>=11.6.0` (`package.json:124`, `ROADMAP.md:227`). The standing-condition row records the host running npm `10.9.7` and `EBADDEVENGINES` from a bare `npm run`. It does not record a run on npm `>=11.6.0`.
- Tailwind 4.3 (`guides/veneer.md:3313`) and `tailwindcss` `^4.3.3` (`package.json:113`). The guide's Tailwind proofs are named. No receipt states a run result on a Tailwind version string.
- Vue `^3.5.43` (`package.json:118`) and the Vue adapter with no version (`ROADMAP.md:30`, `ROADMAP.md:154-155`, `ROADMAP.md:259`). The guide says the shell declares no Vue component (`guides/veneer.md:10609-10611`). No Vue run result.
- Chromium and Chrome and Edge as the platform tenet (`ROADMAP.md:54`), with no versions and no run result in that sentence.
- Playwright `1.63.0` expecting `chromium-1243` (`ROADMAP.md:228`, `package.json:110`). The recorded browser on that row is Chromium `141.0.7390.37` at revision `1194`, not revision `1243`.

Receipt that names no exact browser version string:

- `README.md:22` Chrome.
- `guides/veneer.md:10235-10516` § Compatibility, including `guides/veneer.md:10248-10251`.
- Chromium 141 and Chromium 153 sentences (`guides/veneer.md:2780-2781`, `guides/veneer.md:2793`, `guides/veneer.md:2826`, `guides/veneer.md:2986`, `guides/veneer.md:3537-3546`).
- "managed Chromium and Edge receipts" (`guides/veneer.md:5492`, `guides/veneer.md:5842`, `guides/veneer.md:5909`, `guides/veneer.md:6020`, `guides/veneer.md:6178`, `guides/veneer.md:6364`, `guides/veneer.md:6666`, `guides/veneer.md:6791`, `guides/veneer.md:6792`, `guides/veneer.md:7215`).
- `ROADMAP.md:230` (Chromium launches).
- `ROADMAP.md:440` Chrome receipt.
- `ROADMAP.md:493` Audit claim 14.
- `ROADMAP.md:545` Chromium 153.
- `ROADMAP.md:228` names `141.0.7390.37` and `HeadlessChrome/141.0.0.0`, and also "Chromium 153" and "Chromium 141" without an exact 153 string.

## 7. Unread

- The body of the § Compatibility table (`guides/veneer.md:10255-10516`) was not read row by row. Many rows are single lines past the read limit. A file search for exact version strings and for Windows, Linux, HeadlessChrome, and Playwright revision in `guides/veneer.md` matched nothing.
- `ROADMAP.md:277` (F4 HOST-OBSERVATIONS) was truncated by search after the commit id. The Chrome-receipt cell that cites that commit was read (`ROADMAP.md:440`).
- Of the 66 paths in `git show --stat af673cb`, the diffs opened were `README.md`, `guides/veneer.md`, `tests/fixtures/oracle/button.json`, and `tests/setupConformance.ts`. The other paths in that stat were not opened.