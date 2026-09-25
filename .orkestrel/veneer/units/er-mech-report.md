# ER-MECH report — `opus` on Opus 5.5, native, worktree `/home/user/veneer-erm` (branch `unit/erm`, base `873f715`)

## Deviation state: stopped on one criterion, everything else done

The release-mode binding cannot be reached from the owned files. Under `npm run test:distribution -- --mode release`, the
test file reads `import.meta.env.MODE` as `test`, not `release`, so the file's `RELEASE` constant is false and the
release-host case skips instead of failing. The acceptance criterion "the release-mode run reads red naming the values"
is therefore not met by the release-host case.

- **Expected:** `--mode release` sets `import.meta.env.MODE` to `release` inside `tests/distribution.test.ts`, as the
  file's `RELEASE` comment and `prepublishOnly` assume.
- **Found:** a runtime probe in the `probe` project, run with `--mode release`, asserting `MODE === 'release'` fails
  with `expected 'test' to be 'release'` (`.orkestrel/veneer/units/erm-instruments/logs/erm-mode-probe.log.txt`, probe source retained as
  `.orkestrel/veneer/units/erm-instruments/erm-mode-probe.test.ts.txt`). The distribution project behaves the same: in
  `.orkestrel/veneer/units/erm-instruments/logs/erm-distribution-release-verbose.log.txt` the release-host case is marked skipped (`↓`) with its skip note.
- **Consequence beyond this unit:** every existing `if (RELEASE) throw …` branch in `tests/distribution.test.ts`
  (registry, browser launch) is inert too, so `prepublishOnly` passes on missing evidence. This is pre-existing at
  `873f715`, not introduced here.
- **Done:** the case's release branch is correct when `RELEASE` is true. A plant that sets `const RELEASE = true`
  reddens it with the values (see the planted-control table, `release`).
- **Not done:** making `--mode release` reach the test. The fix sits in `vite.config.ts` (off-limits) or a
  `package.json` script (report-only, and a stop condition in the brief).
- **Hypothesis:** Vitest resolves each project factory under its own mode (`test`), and the `distribution` factory
  in `vite.config.ts` drops the invocation record `mergeOverride` receives, so the CLI mode reaches only the root
  config.

## Changes

- `tests/setupServer.ts`: adds the `Runtime`, `Receipt`, and `SupportedHost` types beside `CompatibilityRow`, the
  `BUILD_PATTERN` constant, and the `readRuntime`, `readSupportedHosts`, and `readReceipts` readers after
  `readCompatibility`. Imports `VERSION_PATTERN` from `@orkestrel/scaffold`, because the policy `surface` rule
  reported a local `VERSION_PATTERN` as scaffold's name and the contracts match (reuse before rename).
- `tests/setupServer.test.ts`: adds the new exports to the export-set case; adds scratch-guide cases for
  `readSupportedHosts` and `readReceipts` (every refusal); adds a `readRuntime` describe with a live case and a
  refusal case.
- `tests/guides.test.ts`: adds the receipts gates inside the `execute` callback: every receipt names a supported host;
  an unowned host has a passing receipt; a host with a passing receipt names no owner; Node and npm meet the
  `package.json` floors (a floor outside `>=x.y.z` is refused); every command names a `package.json` script; no host
  or receipt row repeats. `compareVersions` and `VERSION_PATTERN` come from `@orkestrel/scaffold`.
- `tests/distribution.test.ts`: adds the `release host` describe. It launches through `resolveBrowser`, refuses a
  remote browser, reads `readRuntime`, and needs a passing receipt with a matching channel, platform, and build.
  Under `RELEASE` it fails with an assertion naming every value the row needs, and otherwise it skips with those
  values. It does not depend on the registry stage.
- `guides/veneer.md`: adds `## Hosts` after `## Compatibility` (before `## Showcase`, so before `## Tests`), with its
  explanatory paragraphs, `### Supported hosts` (`chromium`/`linux` ER-LINUX, `chromium`/`win32` ER-WIN,
  `msedge`/`win32` ER-WIN, `chrome`/`—` ER-CHROME), and `### Receipts` (header only). In § Tests, the helper-proofs
  sentence adds the host tables and the running host, and a sentence links
  [the host record gates](../tests/guides.test.ts) and [the release-host case](../tests/distribution.test.ts).

Diffstat (`git diff --stat 873f715`):

```text
 guides/veneer.md           |  52 ++++++++-
 tests/distribution.test.ts |  37 ++++++-
 tests/guides.test.ts       |  95 +++++++++++++++-
 tests/setupServer.test.ts  | 170 ++++++++++++++++++++++++++++-
 tests/setupServer.ts       | 263 ++++++++++++++++++++++++++++++++++++++++++++-
```

Full diff: `.orkestrel/veneer/units/erm.diff`. Status: `.orkestrel/veneer/units/erm-status.txt` (the five files, all ` M`; `tmp/` is ignored).

## Settled choices

- **Reader signatures.** The signatures are `readRuntime(browser, options, environment = process.env)`,
  `readSupportedHosts(path?)`, and `readReceipts(path?)`. The `environment` parameter lets the refusal cases drive an
  absent or malformed `npm_config_user_agent` without a stub.
- **Channel.** The channel comes from `options.launchOptions.channel`, otherwise `chromium`. On this host the resolver
  returns `{ launchOptions: { executablePath: '/opt/pw-browsers/chromium' } }`, so the channel reads `chromium`. An
  operator's `PLAYWRIGHT_EXECUTABLE_PATH` also reads as `chromium`, and the TSDoc says so.
- **Platform `—`.** A `—` Platform cell reads as undefined, so `SupportedHost.platform` is `string | undefined`. The
  `chrome` row carries `—` until its owner records the user's platform choice.
- **Cell form.** Channel, Platform, and each command are code spans. Commands is one code span per script, separated
  by commas, read from the cell's `codeSpan` nodes. Any other text in the cell is refused.
- **Refusal checks.** Date must survive a UTC round trip, so `2026-02-30` and `2026-13-01` are refused. Revision must
  be `^[0-9a-f]{7,40}$`. Build uses `BUILD_PATTERN`. Node and npm use scaffold's `VERSION_PATTERN`. Result must be
  `Pass` or `Fail`.
- **Guide wording.** The second paragraph calls a receipt "the record a sentence naming a browser build rests on".
  That is a definition, not a claim that every build sentence has a receipt, because ER-PROSE owns those sentences and
  their gates. The release sentence reads "When the distribution project runs in release mode…", which is true of the
  code, rather than naming the `--mode release` command, which does not reach release mode (see Deviation state).

## Unknowns answered

- **Backticked cells in § Hosts.** `GuideCommand` does not read them as API names. `npm run test:guides` is green with
  backticked `chromium`, `linux`, `win32`, `msedge`, and `chrome` cells and backticked prose names. A control shows the
  gate does read the same token in § Surface: a planted `` `chromium` `` Surface row reddens `documents only barrel
  exports` with `'const chromium'` (`.orkestrel/veneer/units/erm-instruments/logs/erm-plant-surface.log.txt`).
- **Skip note under `--reporter=dot`.** The note does not print. The dot run shows only `-` for the case
  (`.orkestrel/veneer/units/erm-instruments/logs/erm-distribution.log.txt`). The same run with `--reporter=verbose` prints the note and its values
  (`.orkestrel/veneer/units/erm-instruments/logs/erm-distribution-verbose.log.txt`).

## Planted controls

The instrument is `.orkestrel/veneer/units/erm-instruments/erm-plants.py`. Each plant edits one owned file, runs the gate through its npm script,
restores the file from a byte copy, and appends the SHA-256 digests from before and after the plant to the log. Every
log ends `equal=True`. After the whole run, `sha256sum -c` over `guides/veneer.md` and `tests/*.ts` reported every file
OK. The logs are the final-state run.

| Plant | Case reddened | Failing message (quoted) | Log |
| --- | --- | --- | --- |
| Reader: three-part build | every receipts gate in `tests/guides.test.ts` | `Error: Receipt row 1: invalid Build 141.0.7390` | `.orkestrel/veneer/units/erm-instruments/logs/erm-plant-build.log.txt` |
| Reader: malformed date | every receipts gate | `Error: Receipt row 1: invalid Date 2026-02-30` | `.orkestrel/veneer/units/erm-instruments/logs/erm-plant-date.log.txt` |
| Reader: Result outside Pass/Fail | every receipts gate | `Error: Receipt row 1: invalid Result Passed` | `.orkestrel/veneer/units/erm-instruments/logs/erm-plant-result.log.txt` |
| Reader: missing cell (Kernel) | every receipts gate | `Error: Receipt row 1 (Date: 2026-09-25): missing required cell` | `.orkestrel/veneer/units/erm-instruments/logs/erm-plant-cell.log.txt` |
| Gate: stale owner (Pass row on `chromium`/`linux`) | names no owner on a supported host that holds a passing receipt | `AssertionError: expected [ 'chromium on linux: ER-LINUX' ] to deeply equal []` | `.orkestrel/veneer/units/erm-instruments/logs/erm-plant-stale.log.txt` |
| Gate: unsupported channel (`firefox`) | names a supported host in every receipt | `AssertionError` listing `"2026-09-25 873f715: firefox on linux"` | `.orkestrel/veneer/units/erm-instruments/logs/erm-plant-channel.log.txt` |
| Gate: Node under floor (`20.0.0`) | holds every receipt at or above the package.json Node and npm floors | `AssertionError` listing `"2026-09-25 873f715: Node 20.0.0 under 22.18.0"` | `.orkestrel/veneer/units/erm-instruments/logs/erm-plant-floor.log.txt` |
| Gate: unknown script (`test:nothing`) | names a package.json script in every receipt command | `AssertionError: expected [ 'test:nothing' ] to deeply equal []` | `.orkestrel/veneer/units/erm-instruments/logs/erm-plant-script.log.txt` |
| Gate: repeated receipt row | holds each supported host and each receipt once | `AssertionError` listing the repeated receipt's JSON | `.orkestrel/veneer/units/erm-instruments/logs/erm-plant-repeat.log.txt` |
| Gate: unowned host with no receipt (`chrome` owner to `—`) | holds a passing receipt for every supported host that names no owner | `AssertionError: expected [ 'chrome on —' ] to deeply equal []` | `.orkestrel/veneer/units/erm-instruments/logs/erm-plant-unowned.log.txt` |
| Gate: repeated host (`chromium`/`win32` with another owner) | holds each supported host and each receipt once | `AssertionError: expected [ '["chromium","win32"]' ] to deeply equal []` | `.orkestrel/veneer/units/erm-instruments/logs/erm-plant-host.log.txt` |
| Control: `` `chromium` `` in § Surface | Veneer > documents only barrel exports | `AssertionError: expected [ 'const chromium' ] to deeply equal []` | `.orkestrel/veneer/units/erm-instruments/logs/erm-plant-surface.log.txt` |
| Live reader: `node: process.version` | readRuntime > reads the build … | `AssertionError: expected 'v22.22.2' to be '22.22.2'` | `.orkestrel/veneer/units/erm-instruments/logs/erm-plant-runtime-node.log.txt` |
| Live reader: build's last part forced to `0` | readRuntime > reads the build … | `AssertionError: expected '141.0.7390.0' to be '141.0.7390.37'` | `.orkestrel/veneer/units/erm-instruments/logs/erm-plant-runtime-build.log.txt` |
| Release branch: `const RELEASE = true` | release host > holds a passing receipt … | `AssertionError: The release gate requires a passing receipt in guides/veneer.md § Hosts naming this run: Channel chromium, Build 141.0.7390.37, Platform linux, Kernel 6.18.44-fc-v37, Node 22.22.2, npm 11.19.1: expected false to be true` | `.orkestrel/veneer/units/erm-instruments/logs/erm-plant-release.log.txt` |

A reader plant reddens every receipts gate, because each gate calls `readReceipts`. Each gate plant reddens its own
case alone. The per-message refusals are also pinned in `tests/setupServer.test.ts`, by the case "reads receipts only
within their Hosts subsection and refuses each malformed cell", against scratch guides.

## Live `readRuntime` reading

The reading was taken under `npm run test:setup` on this host:

- **Node and platform.** The case compares `readRuntime` against the `npm_config_user_agent` fields npm wrote
  (`npm/11.19.1 node/v22.22.2 linux x64 workspaces/false`): `node` `22.22.2` and `platform` `linux` agree.
- **Build.** The case compares the build against the DevTools `Browser.getVersion` product of the browser it launched
  (`Chrome/141.0.7390.37`), and against the page's `navigator.userAgent` major
  (`HeadlessChrome/141.0.0.0`). `141.0.7390.37` agrees with both.
- **Values.** The case reads channel `chromium`, npm `11.19.1`, and kernel `6.18.44-fc-v37`. The release-host skip note
  carries the same values.
- **Controls.** The runtime-node and runtime-build plants redden the case.

## Distribution runs

Both runs follow `npm run build` (`.orkestrel/veneer/units/erm-instruments/logs/erm-build.log.txt`, `exit=0`).

- **Ordinary mode:** `npm run test:distribution` (`.orkestrel/veneer/units/erm-instruments/logs/erm-distribution.log.txt`) reports
  `1 failed | 12 passed | 5 skipped (18)`, `exit=1`. The release-host case skips. The dot reporter prints no note. The
  verbose run (`.orkestrel/veneer/units/erm-instruments/logs/erm-distribution-verbose.log.txt`) shows the skip note: `No receipt matched. The row needs a
  passing receipt in guides/veneer.md § Hosts naming this run: Channel chromium, Build 141.0.7390.37, Platform linux,
  Kernel 6.18.44-fc-v37, Node 22.22.2, npm 11.19.1`.
- **Release mode:** `npm run test:distribution -- --mode release` (`.orkestrel/veneer/units/erm-instruments/logs/erm-distribution-release.log.txt`)
  reports `1 failed | 12 passed | 5 skipped (18)`, `exit=1`. The release-host case skips instead of failing (see
  Deviation state). The verbose release run is `.orkestrel/veneer/units/erm-instruments/logs/erm-distribution-release-verbose.log.txt`.
- **The failure in both runs is pre-existing.** It is `installed package consumer > resolves the container, row,
  table, and link keys on a packed-CSS page`:
  `expected 'color(srgb 0.0510206 0.212902 0.67272…' to be 'rgb(8, 65, 234)'`. The same case fails the same way on the
  `873f715` tree (`git archive 873f715` in the scratchpad, `node_modules` symlinked, `dist/src` built), which reports
  `1 failed | 12 passed | 4 skipped (17)` (`.orkestrel/veneer/units/erm-instruments/logs/erm-base-distribution.log.txt`). That tree's app build failed on
  the symlinked `node_modules` (`.orkestrel/veneer/units/erm-instruments/logs/erm-base-build.log.txt`), but the distribution proof packs `dist/src`, which
  built. This unit does not own that failure. It has no carrier yet.
- **No failing-first proof.** The red release run that was to be this unit's failing-first proof does not exist. What
  stands in for it is the release-branch plant (`.orkestrel/veneer/units/erm-instruments/logs/erm-plant-release.log.txt`), which proves the case reddens
  once release mode reaches the file.

## Gates

Each gate ran through its npm script via `.orkestrel/veneer/units/erm-instruments/erm-gates.sh`, with `exit=` appended to its log:

| Gate | Exit | Log |
| --- | --- | --- |
| `npm run format:check` | 0 | `.orkestrel/veneer/units/erm-instruments/logs/erm-format-check.log.txt` |
| `npm run lint:check` | 0 | `.orkestrel/veneer/units/erm-instruments/logs/erm-lint-check.log.txt` |
| `npm run check` | 0 | `.orkestrel/veneer/units/erm-instruments/logs/erm-check.log.txt` |
| `npm run test:setup` | 0 | `.orkestrel/veneer/units/erm-instruments/logs/erm-test-setup.log.txt` |
| `npm run test:guides` | 0 | `.orkestrel/veneer/units/erm-instruments/logs/erm-test-guides.log.txt` |
| `npm run test:policy` | 0 | `.orkestrel/veneer/units/erm-instruments/logs/erm-test-policy.log.txt` |
| `npm run test:conformance` | 0 | `.orkestrel/veneer/units/erm-instruments/logs/erm-test-conformance.log.txt` |

The first gate pass reported `test:policy` red: the `surface` rule named `VERSION_PATTERN (scaffold)` at
`tests/setupServer.ts`. That was fixed by importing scaffold's export, and every gate listed here is the second pass.

## Report-only hunks

No hunk is needed in `package.json`, `tests/setup.ts`, `tests/setupBrowser.ts`, or `README.md` for the owned work. The
README receipts table and its replacement sentence belong to ER-PROSE. The fix for the release-mode defect needs a
change in `vite.config.ts` (off-limits) or in a `package.json` script. That fix is a successor decision for the
Orchestrator, so no hunk is proposed.

## Retained instruments

- `.orkestrel/veneer/units/erm-instruments/erm-plants.py`, the planted-control harness.
- `.orkestrel/veneer/units/erm-instruments/erm-gates.sh`, the gate chain.
- `.orkestrel/veneer/units/erm-instruments/erm-final.sh`, the plant, distribution, and release-run sequence.
- `.orkestrel/veneer/units/erm-instruments/erm-mode-probe.test.ts.txt`, the mode probe's source. The copy under `tmp/probe/` was deleted.

The throwaway probes (the user-agent probe, the DevTools protocol probe, and the resolver probe) were deleted.
