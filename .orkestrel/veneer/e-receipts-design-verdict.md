# E-RECEIPTS design verdict (2026-09-25)

The Orchestrator's reconciliation of the E-RECEIPTS design round, on one brief (`units/e-receipts-design-brief.md`),
over the Grok terrain (`units/e-receipts-terrain-result.md`, session `dbf8fa99-4359-4441-b98c-5db11b4054cc`): the
subjective lane, `planner` on Opus 5.5 (`units/e-receipts-design-planner-proposal.md`), and the objective lane,
`analyst` on GPT-6 Astra (`units/e-receipts-design-analyst-proposal.md`, journal
`tmp/codex/e-receipts-design-analyst.jsonl`, thread `01a0d656-5a9d-7022-b2c2-e8e225dd99bc`), blind to each other. It
closes exit criterion 11 and the ROADMAP's `Chrome receipt` and `Audit claim 14` rows.

## Readings taken before the ruling

The Orchestrator probed the two facts both lanes asked for, on this host, through the pinned npm
(`$S/npm11/node_modules/.bin`), with the probe under `$S/receipts-probe/`:

- `npm run -s ua` in a scratch package printed `npm/11.19.1 node/v22.22.2 linux x64 workspaces/false`, so
  `npm_config_user_agent` carries the npm and Node versions inside an npm script.
- `npm ping --fetch-retries=0 --fetch-timeout=5000` printed `PONG 320ms` and exited 0, so the release-mode distribution
  proof can reach the registry here.

## Rulings

- **One home for the promise.** Both lanes: the guide carries the browser hosts once, in a `## Hosts` section after
  § Compatibility; `package.json` keeps `engines.node` and `devEngines.packageManager`, which the guide names and never
  restates; the README drops its receipts table for one sentence linking § Hosts; the ROADMAP's platform tenet stays as
  the user wrote it. Tailwind and Vue are not hosts: the `service` project proves the Tailwind line on whichever host a
  receipt records, and E-VUE owns Vue.
- **The supported hosts.** The subjective lane's table is taken, because each row is a checkable pair: `chromium` on
  `linux`, `chromium` on `win32`, `msedge` on `win32`, and `chrome` on a platform the user names. The objective lane's
  operating-system and family scope says the same thing without the pairing. An exact build is a measurement, never a
  minimum.
- **The receipt.** A row in the guide's `### Receipts` table, not a JSON fixture (both lanes; the ROADMAP keeps the guide
  the only machine-read record). Columns: `Date`, `Revision`, `Channel`, `Build`, `Platform`, `Kernel`, `Node`, `npm`,
  `Commands`, `Result`. The subjective lane's columns are taken; `Revision`, the Veneer commit measured, is the objective
  lane's and is added, because a receipt that does not name its tree cannot be re-run. The objective lane's `evidence`,
  `tools`, and `limits` fields are not taken as columns: the retained verifier log in the orchestrator's repository is
  the evidence, per `.agents/orchestration.md` § Dispatch anatomy, and a limit sits in the prose beside the behaviour it
  limits.
- **The mechanism reads and checks, and never writes the guide.** `readRuntime` reads the build from
  `browser.version()` on a browser launched through the same `resolveBrowser` call the browser projects use, and the
  platform, kernel, Node, and npm from the running process and `npm_config_user_agent`. `readReceipts` and
  `readSupportedHosts` parse the guide and throw on a malformed cell, in the `readCompatibility` pattern. Gates in
  `tests/guides.test.ts`, each with a planted control: every receipt names a supported host; a host with no owner has a
  passing receipt; a host with a passing receipt has no owner; each receipt's Node and npm meet the `package.json`
  floors; every command names a `package.json` script; no row repeats. A row is accepted only from an independent
  `verifier` run.
- **Builds in prose.** Both lanes: a sentence that states a behaviour read on one build names the exact build, and the
  receipts gate requires a receipt on it; a sentence that claims a result on every host points at the record and names
  no build. The guide's "managed Chromium and Edge receipts" sentences claim Edge results that do not exist, so each one
  loses Edge and names the proof behind the claim. A gate refuses a browser major with no build, and a gate requires a
  receipt for every exact build the guide or `tests/fixtures/oracle/button.json` names. The ROADMAP row that says "Name
  Chromium 141 in every receipt taken here" contradicts criterion 11 and changes to the exact build.
- **The hosts this machine cannot reach.** `chromium` on `linux` is taken here. `chromium` and `msedge` on `win32` can
  only be taken on the user's Windows host, where the engine session runs; that widens the engine session's scope, so it
  goes to the user (ROADMAP § Protocol). `chrome` waits on the user installing Chrome or ruling it out. Until a passing
  receipt exists, the host's `Owner` cell names the unit that takes it, and every owner cell is empty at campaign exit.
  The Windows row of 2026-09-20 is retaken, because it recorded no Node, npm, or kernel and its build string's source is
  unverified.
- **The release-mode distribution proof.** It runs here: the registry answered. It runs after the build, because the
  proof packs with `--ignore-scripts`. A release-host case in `tests/distribution.test.ts` launches through
  `resolveBrowser`, reads `readRuntime`, and under `--mode release` fails unless a passing receipt matches the channel,
  platform, and build it launched, naming every value the missing row needs; outside release mode it skips with the same
  values. It refuses a remote `PLAYWRIGHT_WS_ENDPOINT` browser. Binding the check to release mode alone keeps a browser
  update from reddening `npm test`. The Linux receipt that lists `test:distribution -- --mode release` closes
  `Audit claim 14`.
- **Routing.** ER-MECH is objective, constraint-heavy work, which belongs to `sol` on Astra, but its proofs launch a
  browser and read a live runtime, which a bench sandbox denies (`.agents/orchestration.md` § Bench laws, rule 5), so it
  runs on `opus` on Opus 5.5, the native writing lane; its audits run `analyst` on Astra. The objective lane's separate
  instrument unit in the orchestrator's repository is not taken: the verifier's retained log is the record.

## Units

- **ER-MECH** (`opus` on Opus 5.5): `Runtime`, `Receipt`, and `SupportedHost` in `tests/setupServer.ts` beside
  `CompatibilityRow`; `readRuntime`, `readReceipts`, and `readSupportedHosts` there, with scratch-guide proofs in
  `tests/setupServer.test.ts` and a live `readRuntime` case; the receipts gates in `tests/guides.test.ts`; the
  release-host case in `tests/distribution.test.ts`; the guide's `## Hosts` section with every supported host owned.
  Independent of the E-IDENTITY units. Brief: `units/er-mech-brief.md`.
- **ER-LINUX** (`verifier` on Sonnet, then `builder` on Sonnet): after ER-MECH is accepted, the verifier runs the gate
  chain, `test:service`, and `test:distribution -- --mode release` on the ER-MECH tree; the builder writes the
  `chromium` on `linux` row from the retained log and clears its owner; the verifier re-runs the guides and release
  commands. Lands with ER-MECH, so `main` never carries an empty receipts table.
- **ER-WIN** (the user's ruling first): the engine session runs the same chain on its Windows host with the default
  channel and with `PLAYWRIGHT_CHANNEL=msedge`, and reports the values through `plan.md`; the styles session writes the
  rows.
- **ER-CHROME** (the user's install or exclusion first): the same shape with `PLAYWRIGHT_CHANNEL=chrome`, or the removal
  of the `chrome` row. It closes the `Chrome receipt` row.
- **ER-PROSE** (`opus` on Opus 5.5): the styles-owned sentences, the README patch, the bare-major and exact-build gates,
  and the ROADMAP row edits, after ER-WIN supplies the Chromium 153 receipt. The engine-owned sentences go to the engine
  session as exact sentences through `plan.md`.

## Exit

Every supported host has a passing receipt naming its exact build, or the user has excluded it; every sentence naming
a build has a receipt on it; the release-mode distribution proof has run green on a recorded host; every owner cell is
empty.
