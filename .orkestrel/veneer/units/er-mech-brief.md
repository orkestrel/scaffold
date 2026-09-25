# Unit ER-MECH — the receipt record and the readers that check it

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, the sole writer in `/home/user/veneer-erm` (branch `unit/erm`, cut from
the session branch at `873f715`, the E-ID-FLOW-2 landing). The work is objective, which belongs to `sol` on GPT-6 Astra,
but its proofs launch a browser and read a live runtime, which a bench sandbox denies (`.agents/orchestration.md` § Bench
laws, rule 5), so it runs on the native writing lane. Read, in order: `/home/user/scaffold/AGENTS.md`; the rules
`/home/user/scaffold/.claude/rules/{typescript,names,architecture,patterns,tests,documentation,writing,quality,portability}.md`;
the design verdict `/home/user/scaffold/.orkestrel/veneer/e-receipts-design-verdict.md`, which binds; both proposals it
names, for their detail (`/home/user/scaffold/.orkestrel/veneer/units/e-receipts-design-planner-proposal.md` carries the
types and the gate list); and the terrain `/home/user/scaffold/.orkestrel/veneer/units/e-receipts-terrain-result.md`.
Its line numbers were read at `4cd56a8`; locate each site by its symbol. No skill applies.

## Objective

Veneer's guide carries its supported hosts and its receipts in one `## Hosts` section, and the tests read that section,
refuse a malformed or inconsistent record, and bind a release-mode run to a receipt on the build it launched.

## Context

- **The pattern to follow.** `readCompatibility` and `CompatibilityRow` in `tests/setupServer.ts` parse a guide table
  and throw on a malformed cell; `tests/guides.test.ts` imports `readCompatibility` inside the anonymous callback passed
  to `GuideCommand`'s `execute` method and asserts over it. The new readers and gates take the same shape.
- **The launch to reuse.** `recordButtonOracle` in `tests/setupServer.ts` launches Chromium through
  `resolveBrowser(resolvePinnedBrowser(), process.platform, process.env)` and records `browser.version()`; it refuses a
  remote browser. `readRuntime` launches, or takes, a browser the same way, so the build it reads is the build the
  browser projects run on.
- **The runtime values.** On this host, inside an npm script, `npm_config_user_agent` reads
  `npm/11.19.1 node/v22.22.2 linux x64 workspaces/false` (the Orchestrator's probe, recorded in the verdict). It is absent
  when a test runs outside an npm script; `readRuntime` throws there rather than guessing.
- **The version floor.** `compareVersions` is exported by `@orkestrel/scaffold` (its installed
  `dist/src/core/index.d.ts` declares it). Reuse it; the floors come from `engines.node` and
  `devEngines.packageManager.version` in `package.json`, in the `>=x.y.z` form, and any other form is refused.
- **The distribution proof.** `tests/distribution.test.ts` sets `RELEASE` from `import.meta.env.MODE === 'release'`,
  opens its registry stage at module scope through `openStage`, and launches browsers through `launchBrowser`. The
  release-host case does not depend on the registry stage.
- **The guide.** `## Hosts` goes after `## Compatibility` and before `## Tests`. Its two paragraphs and two tables follow
  the verdict and the planner's grammar. The `### Supported hosts` rows are `chromium`/`linux`, `chromium`/`win32`,
  `msedge`/`win32`, and `chrome` with its platform cell holding the owner's pending choice; every row starts owned
  (`ER-LINUX`, `ER-WIN`, `ER-WIN`, `ER-CHROME`). `### Receipts` starts with a header and no row. How the guide gate reads
  a backticked cell in this section is unknown; settle it by running `npm run test:guides`.
- **Host.** Linux, bash; put `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin`
  first on `PATH` (the system npm is 10.9.7 and fails `devEngines`), set `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, and
  run every suite through its npm script so `npm_config_user_agent` is set. The harness environment block may name
  another worktree as the primary working directory; work in `/home/user/veneer-erm` with absolute paths. Format only
  with `./node_modules/.bin/oxfmt --config .oxfmtrc.json <file>`. Other worktrees run suites at the same time; a timing
  failure under load is an observation with its reading.

## Unknowns

- Whether `GuideCommand` reads a backticked channel or platform cell as an API name. Run `npm run test:guides` after the
  guide edit and report what it does; write the cells in the form that keeps the gate honest.
- Whether a skip note prints under `--reporter=dot`. Report what the ordinary-mode distribution run shows.

## Scope

**Owned.** `tests/setupServer.ts` (the types and readers beside `CompatibilityRow`), `tests/setupServer.test.ts`,
`tests/guides.test.ts`, `tests/distribution.test.ts`, and the `## Hosts` section of `guides/veneer.md`, with the guide's
§ Tests links for the new proofs. **Report-only** (return exact hunks): `package.json`, `tests/setup.ts`,
`tests/setupBrowser.ts`, `README.md`, and any other guide section. **Off-limits:** `src/**`, `app/**`, `configs/**`,
`vite.config.ts`, `tests/src/**`, `tests/app/**`, and the vendored files (`tests/setupPolicy.ts`, `tests/policy.test.ts`,
`tests/config.test.ts`). No git command that writes, no install, no `npm run format`; `npm run build` is allowed.

## Execution

Perform the assignment directly and spawn nothing.

1. Write the types and readers, then the guide section, then the gates, then the release-host case. Each gate and each
   reader's refusal lands with a planted control that reddens it, run and retained: for the readers, a three-part build,
   a malformed date, a `Result` outside `Pass` and `Fail`, and a missing cell; for the gates, a stale owner, an
   unsupported channel, a Node version under the floor, an unknown script, and a repeated row. A kill counts only when
   the failing case's message names an assertion failure or the reader's own refusal message.
2. Prove the live `readRuntime` case against an independent reading: the user agent's `node/` field against
   `process.versions.node`, and the build against the browser the case launched.
3. Run `npm run build`, then the ordinary-mode `npm run test:distribution` (the release-host case skips and names the
   values a receipt needs), then `npm run test:distribution -- --mode release` (it reads red, because no receipt exists
   yet, and names the values). Retain both logs; the red release run is this unit's failing-first proof, and ER-LINUX
   turns it green.
4. Run `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:setup`, `npm run test:guides`,
   `npm run test:policy`, and `npm run test:conformance`, each logged to `tmp/units/erm-<gate>.log.txt` with
   `echo "exit=$?"` appended.

## Output

Write `tmp/units/erm-report.md` and return the same text: the changes; the planted-control table (plant, case, the
failing message quoted, log path, restore check); the live `readRuntime` reading; both distribution runs with their
logs; the gate table with log paths; the report-only hunks; `tmp/units/erm.diff` (`git diff 873f715`) and
`tmp/units/erm-status.txt`. State no count.

## Deviation contract

§ Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. This unit settles the reader signatures, the
error messages, the guide wording, the cell form, and the case names. Stop and report if a gate needs a `package.json`
script or a vendored file to change, or if `resolveBrowser` cannot be reached from the owned files without editing
`configs/**`.

## Acceptance criteria

The types, readers, gates, guide section, and release-host case exist as the verdict states; every planted control
reddens its case with an assertion failure or the reader's refusal; the live `readRuntime` case agrees with its
independent reading; the ordinary-mode distribution run skips the release-host case naming the values and the
release-mode run reads red naming them; every gate in Execution step 4 exits 0.
