# E-RECEIPTS design proposal — `planner` on Opus 5.5, subjective lane

Returned to the Orchestrator as the subagent's hand-back message; the text follows as delivered.

I held the subjective lane only. I read every law file the brief names, the terrain distillate, and each Veneer file whose citation the design relies on, first-hand in `/home/user/veneer-read`. I ran no command, because I am read-only. The evidence for each correction is the Read or Grep I performed. `Constraints`, `Refusals`, and `Measurements` belong to the objective lane and are empty.

## Design

### Ruling 1: the promised hosts, and where the list lives

- **The list:** Node, npm, and a set of supported browser hosts. A supported host is a Playwright channel on a platform. The set is the one F4 pinned (`af673cb`):
  - `chromium` on `linux`
  - `chromium` on `win32`
  - `msedge` on `win32`
  - `chrome` on `win32`
- **Node and npm keep their one home in `/home/user/veneer-read/package.json`** (`engines.node`, `devEngines.packageManager`), because npm itself reads those fields. The guide names the fields and does not restate the ranges. A gate reads the fields and compares every receipt against them.
- **The browser set lives once, in `guides/veneer.md`**, in a `## Hosts` section placed after § Compatibility. `ROADMAP.md` makes the guide "the only machine-read record" (§ Rulings; exit criterion 12). No `package.json` field names a browser family without changing some tool's behaviour.
- **The README drops its receipts table.** It keeps one sentence that links to the guide's § Hosts.
- **The ROADMAP platform tenet stays as it is.** It is the user's tenet text, not a record.
- **Tailwind and Vue are not hosts.** "Veneer supports Tailwind 4.3" is a toolchain-support claim; the `service` project proves it and the lockfile pins it. Vue belongs to E-VUE. A receipt lists `test:service` among its commands, so the Tailwind proof runs on a recorded host, without adding a Tailwind column.

### Ruling 2: the receipt's shape and home

**Home.** A receipt is a row in the guide's `### Receipts` table. It is not a JSON fixture and not a README row.

**Mechanism.** The mechanism reads and checks. It never writes the guide, because a gate that rewrote the guide would make `npm test` a mutating command.

- **Reading:**
  - `readRuntime` reads every value a row needs except the date and the result from the browser and the process the proof actually launched.
  - `browser.version()` supplies the build.
  - The `npm_config_user_agent` variable supplies the npm version. It is absent outside an npm script, and the reader throws there.
  - The launch goes through the same `resolveBrowser` call that `vite.config.ts` uses around line 14, so the build read is the build the browser projects ran on.
- **Checking:**
  - `readReceipts` and `readSupportedHosts` throw on a malformed cell. They follow the `readCompatibility` pattern in `tests/setupServer.ts`.
  - Cases in `tests/guides.test.ts` check the relationships between the tables.
  - A release-mode case in `tests/distribution.test.ts` binds the run to the record.
- **Authority:** a row is accepted only from the independent `verifier` run. A writer's own gate run never produces a receipt.

**Types.** They go in `/home/user/veneer-read/tests/setupServer.ts`, beside `CompatibilityRow`:

```ts
/** Describes the host one run executes on, as the launched browser and the running process report it. */
export interface Runtime {
	readonly channel: string // Playwright channel; `chromium` for Playwright's own or a bundled build
	readonly build: string // `Browser.version()`, four numeric parts, e.g. `141.0.7390.37`
	readonly platform: string // `process.platform`
	readonly kernel: string // `os.release()`
	readonly node: string // `process.versions.node`
	readonly npm: string // read from `npm_config_user_agent`
}

/** Describes one recorded run of package scripts on one host. */
export interface Receipt extends Runtime {
	readonly date: string // YYYY-MM-DD
	readonly commands: readonly string[] // package scripts with their arguments
	readonly passed: boolean // the Result cell: `Pass` or `Fail`
}

/** Describes one host Veneer supports, and the unit that takes its receipt while none passes. */
export interface SupportedHost {
	readonly channel: string
	readonly platform: string
	readonly owner: string | undefined
}
```

The helpers are `readRuntime(browser, options)`, `readReceipts(path?)`, and `readSupportedHosts(path?)`. Each name is free in the fleet guides; my Grep of `node_modules/@orkestrel/scaffold/dist/host/guides` found no claim. `Host` is refused, because `scaffold.md` claims it. Version comparison reuses `compareVersions` from `@orkestrel/scaffold`, which the installed `dist/src/core/index.d.ts` declares around line 1000.

**Guide grammar.** The `## Hosts` section opens with two paragraphs:

- The first names the `package.json` fields and the browser families. It states that Veneer ships no host check and selects no browser: the gates launch what `PLAYWRIGHT_EXECUTABLE_PATH`, `PLAYWRIGHT_WS_ENDPOINT`, or `PLAYWRIGHT_CHANNEL` names, and otherwise Playwright's own Chromium.
- The second defines the term: "every supported host" means every host with a passing receipt here. It also states that a build any sentence names has a receipt here.

The section holds two tables:

| Table | Columns |
| --- | --- |
| `### Supported hosts` | `Channel`, `Platform`, `Owner` |
| `### Receipts` | `Date`, `Channel`, `Build`, `Platform`, `Kernel`, `Node`, `npm`, `Commands`, `Result` (`Pass` or `Fail`, with no prose) |

**Where behaviour notes go.** A receipt carries no note column. A behaviour observed on one build sits beside the behaviour and names that build. The README's detached-host `event.target` note, for example, moves to the recorder prose.

**Gates in `tests/guides.test.ts`.** Each gate lands with a planted control that reddens it.

- Every receipt names a supported host.
- A supported host with no owner has a passing receipt.
- A supported host that has a passing receipt has no owner. This is the stale-owner check, which mirrors the stale-deferral gate.
- Each receipt's Node and npm versions are at or above the `package.json` floors. The gate refuses a range that is not in the `>=x.y.z` form.
- Every command names a `package.json` script.
- Every row appears once.

### Ruling 3: the builds in guide prose (both, by kind of sentence)

- **A sentence that states a behaviour read on one build names the exact build.** The receipts gate then requires a receipt on that build. This covers:
  - the tooltip and sanitizer sentences around lines 2780, 2793, 2826, and 2986, which the engine session owns;
  - the Tailwind preflight paragraph around lines 3535–3546, which the styles session owns.

  "Chromium 141" becomes "Chromium `141.0.7390.37`", and "Chromium 153" becomes "Chromium `153.0.8010.12`". The engine session must confirm that 153 is the build it measured.
- **A sentence that claims a result on all hosts points at the record and names no build.** A list of builds there would be a second copy that drifts as receipts are added.
  - "the managed Chromium and Edge receipts this cascade is proved on resolve it" becomes "every supported host resolves it", around lines 5492, 5842, 5909, 6020, 6178, 6364, and 6666.
  - Line 6791 becomes "unreachable on every supported host".
  - Line 6792 becomes "every supported host resolves it".
- **Line 7215 ("run-6 … in managed Chromium and Edge")** names the receipt that the reading was taken on, or drops the host clause. No Edge receipt exists, so the sentence must not keep Edge.
- **ER-PROSE adds two gates:**
  - No guide line may name a browser major without its build. The pattern is roughly `\b(?:Chromium|Chrome|Edge) \d+\b(?![.\d])`.
  - Every exact build the guide names, and the `browser` field of `tests/fixtures/oracle/button.json`, must match a passing receipt.
- **ROADMAP rows are not receipts.**
  - Line 228 must change: its consequence "Name Chromium 141 in every receipt taken here" contradicts criterion 11. It becomes "Name the exact build, `141.0.7390.37`, in every receipt, through the guide's § Hosts".
  - Lines 230 and 545 stay. Line 230 is a sandbox condition and line 545 is a closed defect record.
  - Line 440 closes at the landing of the Chrome unit, ER-CHROME, or at the user's exclusion of Chrome, citing that commit.
  - Line 493 closes at the landing of the first release-mode receipt, citing that commit.

### Ruling 4: the hosts this machine cannot reach

| Host | Who takes the receipt |
| --- | --- |
| `chromium` on `linux` | This host, through the ER-LINUX unit. |
| `chromium` on `win32` | The user's Windows host, where the engine session runs, through ER-WIN. |
| `msedge` on `win32` | Same host and unit as `chromium` on `win32`, with `PLAYWRIGHT_CHANNEL=msedge`. |
| `chrome` on `win32` | ER-CHROME, after the user installs Chrome ("the install is the user's"). If the user instead rules Chrome out, the supported-host row goes, because the promise then excludes it. |

- **Until a passing receipt exists,** the host's `Owner` cell names its unit. The gate keeps `npm test` green while that holds.
- **The Windows receipt of 2026-09-20 is retaken.** It recorded no Node, npm, or kernel, and its build came from an instrument whose provenance is unverified; see terrain correction 3.
- **ER-WIN widens the engine session's scope,** so it is a question for the user, per `ROADMAP.md` § Protocol › The engine session: "A decision that moves the other session's scope or exit criterion is a question for the user".

### Ruling 5: the release-mode distribution proof

- **It runs here only if `npm ping`, through the pinned npm 11 binary, answers from this host.** The Orchestrator must probe that before it dispatches ER-LINUX. If it answers, the Linux receipt lists `test:distribution -- --mode release`, and that row closes Audit claim 14. If not, the release run moves to ER-WIN.
- **The proof must name the build it ran on.** A release-host case in `tests/distribution.test.ts` does not depend on the registry stage:
  - It launches through `resolveBrowser` and reads `readRuntime`.
  - Under `--mode release`, it fails unless a passing receipt matches the channel, platform, and build it launched. The failure message lists every value the missing row needs.
  - Outside release mode, it skips with the same values when no receipt matches.
  - It refuses a remote `PLAYWRIGHT_WS_ENDPOINT` browser, because a remote browser has no local platform to record. The same refusal already exists in `recordButtonOracle`.
  - Node, npm, and kernel are outside the match key, so a Node patch update does not demand a new receipt.
- **Where the receipt comes from.** The receipt of a release run records a gate chain that ran before the release on the same build, so the check involves no circular dependency.

### Terrain corrections

1. **The guide claims Edge results that do not exist, not only unbuilt ones.** Lines 5492, 5842, 5909, 6020, 6178, 6364, 6666, 6791, 6792, and 7215 claim results on an Edge receipt. `README.md` line 21 says "The host verification receipt remains assigned … No Edge result is inferred from Chromium." Evidence: a Grep for `managed Chromium|Edge receipt` in `guides/veneer.md` returned those lines, and a Read of `README.md` lines 17–22. The terrain lists these lines only as naming no build.
2. **Terrain § 2 marks `README.md:21` "Build named: Yes".** That row records no run. `153.0.4234.48` names an installed Edge, not a receipt.
3. **The Windows build string in `README.md:19` has unverified provenance.** The row reports `HeadlessChrome/153.0.8010.12`. `ROADMAP.md:228` records that the user agent on this host reads `HeadlessChrome/141.0.0.0`, in the reduced form that carries no build. So the instrument behind the 153 string did not read the user agent. Its provenance is unverified, and the receipt must be retaken with `browser.version()`.
4. **`ROADMAP.md:228` contradicts criterion 11.** It instructs "Name Chromium 141 in every receipt taken here". The terrain cites the row but does not flag the contradiction.
5. **A release-mode run cannot produce readings on a host without the registry.** `openStage()` runs at module scope, around line 936 of `tests/distribution.test.ts`. Under release it throws while the file loads when `npm ping` fails, so no case in the file runs. `npm pack --ignore-scripts` (around line 834) skips `prepack`, so `dist/` must be built first.
6. **Outside E-RECEIPTS scope:** `guides/veneer.md` lines 10248–10251 say "until it lands" of B-PASSIVE-CLOSE-B. `ROADMAP.md:292` records that unit landed as `c9567b6`, so the sentence may be stale. Its carrier is not yet known, and it is not this unit.

## Alternatives

- **A JSON receipts fixture that a recorder writes, like `tests/fixtures/oracle/button.json`.** Gain: a mechanism writes every byte. Cost: it creates a second machine-read record, which the ROADMAP design ruling "Keep the guide as the only machine-read record" and exit criterion 12 refuse. The guide table plus the reading gates keeps one record, and every value except the date and result still comes from a reader.
- **Complete the README table by hand.** This is the status quo. Cost: nothing checks it, it ships in the npm tarball, and it has already drifted. The guide claims Edge results the README says do not exist. The proposed design makes that drift a red gate.

## Units

Routing: implementation goes to `opus` on Opus 5.5, natively. The reasons are the ROADMAP § Routing ruling of 2026-09-22 and the brief's rule that a unit driving a browser runs natively. Each writing unit is audited by `analyst` on Astra and `reviewer` on Opus 5.5, with `checker` where a criterion is mechanical. Off-limits: `configs/**`, `vite.config.ts`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts`. Report-only: `package.json`, `tests/setup.ts`, `tests/setupBrowser.ts`, and `README.md`.

- **ER-MECH (`opus` on Opus 5.5, native).** Owns the preceding types, `readRuntime`, `readReceipts`, and `readSupportedHosts` in `tests/setupServer.ts`; scratch-guide proofs of each reader in `tests/setupServer.test.ts`, plus a live-host `readRuntime` case comparing the npm user agent's `node/` field with `process.versions.node`; the receipt-ledger cases in `tests/guides.test.ts`; the release-host case in `tests/distribution.test.ts`; and the guide's `## Hosts` section, every supported host starting with an `Owner` cell. Depends on E-IDENTITY. Acceptance, cheapest first: `npm run check`; scoped `lint:check`; `npm run test:policy`; `npm run test:setup` with planted rows throwing (a three-part build, a malformed date, a `Result` outside Pass/Fail, a missing cell); `npm run test:guides` with plants for a stale owner, an unsupported channel, a Node version under the floor, and an unknown script each reddening it; ordinary-mode `npm run test:distribution` skipping the release-host case with the values when no receipt matches. Lands in the same landing as ER-LINUX, so `main` never carries an empty receipts table.
- **ER-LINUX (`verifier` on Sonnet, then `builder` on Sonnet).** The Orchestrator probes `npm ping` through the pinned npm first. `verifier` runs `format:check`, `lint:check`, `check`, `build`, `test`, and `test:service` on the ER-MECH tree, plus `test:distribution -- --mode release` if the ping answered. `builder` writes the `chromium`/`linux` receipt from `verifier`'s output and clears that host's owner. `verifier` re-runs the recorded release and guides commands. Owns the guide's § Hosts rows only. Acceptance: the re-run is green, and the row's values equal those in `verifier`'s retained log.
- **ER-WIN (needs the user's ruling).** The engine session on the Windows host runs the same chain with the default channel and with `PLAYWRIGHT_CHANNEL=msedge`, plus the release-mode distribution run if ER-LINUX could not take it, and reports the values under § Pending shared changes. The baseline's `builder` writes the `chromium`/`win32` and `msedge`/`win32` receipts. Depends on ER-MECH on `origin/main`. Acceptance: `test:guides` is green, and those two owners are clear.
- **ER-CHROME.** The user installs Chrome, then the same shape as ER-WIN with `PLAYWRIGHT_CHANNEL=chrome`. If the user rules Chrome out instead, `builder` removes that supported-host row. This unit closes criterion 11 and `ROADMAP.md:440`.
- **ER-PROSE (`opus` on Opus 5.5).** Owns the styles-owned guide sentences named in Ruling 3, the README patch (report-only, applied at the landing), and the ER-PROSE gates in `tests/guides.test.ts`. The engine-owned sentences around lines 2780, 2793, 2826, and 2986 go to the engine session as an exact-sentence pending shared change. The Orchestrator applies the `ROADMAP.md` row 228 edit and the closures of rows 440 and 493, audited by `analyst` on Astra. Depends on ER-WIN (the 153 receipt) and the engine session's sentence edit on `origin/main`. Acceptance: a planted "Chromium 141", a planted `999.0.0.1` build, and a `button.json` build with no receipt each redden the relevant gate; the README holds no receipts table and links § Hosts; `test:policy` and `test:guides` are green.

## Tensions

- **Release-only binding.** The release-host check gates `prepublishOnly` only, not `npm test`. Gating `npm test` would redden every engine-session run after each Chrome auto-update or Playwright bump.
- **Home and term.** The guide, not the README, carries the browser promise; the guide does not ship in the tarball, so npm readers get a link only. "Supported host" matches the guide's "Veneer supports Tailwind 4.3"; the ROADMAP's word is "promised". The guide names `engines.node` rather than restating `>=22.18.0`.
- **Owners and platforms.** The `Owner` cells put campaign unit names into the product guide, which mirrors § Deferred selectors; at campaign exit every cell must be empty. Chrome's platform is set to `win32` on judgment.
- **Routing.** The brief says objective work goes to `sol`; ER-MECH routes to `opus` under the ROADMAP user ruling and the native-browser rule.
- **Cross-session.** ER-WIN needs a user ruling before it widens the engine session's scope.
- **Readings needed before ER-LINUX:** whether `npm ping` answers here; whether `npm_config_user_agent` reports `11.19.1` under the pinned binary; whether a `context.skip` note prints under `--reporter=dot` in Vitest 4.1.11; whether `browser.version()` on the `msedge` channel returns the Edge build.

## Risks

- `browser.version()` on `msedge` may not report Edge's own build; an ER-WIN reading against the installed Edge version settles it.
- GuideCommand might read backticked `chromium` or `linux` cells in `## Hosts` as API names; ER-MECH's `test:guides` run settles it.
- Some rewritten "every supported host resolves it" claims may have no executed assertion, which `documentation.md` requires; ER-PROSE names the proof behind each claim or records the gap.
- The provenance of "run-6" at line 7215 is unknown; ER-PROSE sources it or drops the clause.
- `guides/veneer.md` merges between the sessions can detach table rows; run the landing's row scan after each merge.
- The retaken Windows receipt removes the dated 2026-09-20 reading from the working tree; git keeps it.
