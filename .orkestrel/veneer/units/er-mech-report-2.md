# ER-MECH round 2 report — `opus` on Opus 5.5, native, worktree `/home/user/veneer-erm` (base `873f715`)

## Deviation state

None. Every item is in place, every planted control reads as briefed, the link case reads red before and green after,
and every gate in the brief's Execution exits 0. No file outside the owned set changed.

## Items

1. **Readers refuse malformed cells.**
   - `readReceipts` requires the Commands cell to alternate a code span and a comma, starting and ending on a code
     span. A space-only gap (`` `test:guides` `test:distribution` ``), a doubled comma, and a trailing comma are
     refused with `Receipt row N: invalid Commands <cell>`. A throwaway parser probe fixed the shape first: the
     Markdown parser trims the cell's edges and yields `codeSpan, text(", "), codeSpan` for a well-formed cell.
   - `readSupportedHosts` refuses a Platform cell that is neither `—` nor a member of the `NODE_PLATFORMS` constant
     (the `@types/node` `Platform` union, annotated `readonly NodeJS.Platform[]`), with
     `Supported host row N: invalid Platform X`. Channel is not validated; the TSDoc says why.
   - Scratch-guide cases: the receipts case gains the space-only, doubled-comma, and trailing-comma refusals. The
     supported-hosts case, retitled "reads supported hosts only within their Hosts subsection and refuses a missing
     column, a missing cell, and a platform Node never reports", refuses `Linux`, `macos`, and `windows` on row 2.
     A case "lists the platform this process runs on among the platforms Node reports" holds the constant against
     `process.platform`.
   - Failing-first: restoring round 1's Commands check (`reader-commands`) and deleting the Platform check
     (`reader-platform`) each fail their scratch-guide case with `expected [Function] to throw an error`.
2. **Floors.** Planted controls: an npm version under its floor (`floor-npm`) and an `engines.node` floor read as
   `^22.18.0` (`floor-form`). Each fails the floor case with an assertion. The `floor-form` plant edits the
   `tests/guides.test.ts` file's read of `manifest.engines`, not `package.json`, because `package.json` is off-limits.
3. **Live runtime.** The case is retitled "reads this run's channel, build, platform, kernel, Node, and npm, agreeing
   with npm's user agent on Node and platform and with the launched browser on its build". Its comment states that
   the DevTools comparison repeats Playwright's own `Browser.getVersion` read, so it catches a `readRuntime` defect
   and not a Playwright misreport, and that the user-agent major is the check independent of Playwright.
4. **Release-host case.**
   - The message names this run's host values and where the rest come from:
     `The release gate requires a passing receipt in guides/veneer.md § Hosts naming this run's host values: Channel
     chromium, Build 141.0.7390.37, Platform linux, Kernel 6.18.44-fc-v37, Node 22.22.2, npm 11.19.1. The Date,
     Revision, and Commands cells come from the run that writes the row` (`erm-2-plant-release.log.txt`).
   - The match moved into the exported `matchesReceipt(receipt, runtime)` predicate in `tests/setupServer.ts`, proved
     in `tests/setupServer.test.ts` by a matching case (one that ignores kernel, Node, and npm) and a refusing case
     (Fail, other channel, other platform, other build). The `matcher-false` plant fails the matching case.
   - Pass control: `release-match` (`RELEASE = true` plus a matching passing receipt in the guide) passes the case,
     exit 0. `release-match-false` (the same plus `.some(() => false)`) fails it with the gate's message.
   - R3: a case "refuses a browser that reports a build other than four numeric parts" drives `readRuntime`'s refusal
     with `141.0.7390`, `141.0.7390.37.1`, `141.0.7390.x`, and an empty build, and accepts `141.0.7390.37`. To reach
     the refusal without a real browser that misreports, the `browser` parameter narrows to
     `Pick<Browser, 'version'>`, the only member the reader reads; the case passes an inert `{ version }` stub. The
     `runtime-build-refusal` plant (the check deleted) fails that case.
5. **Titles.** `BUILD_PATTERN`'s assertions moved out of the refusal case into a `BUILD_PATTERN` describe with the
   case "matches a four-part numeric build and refuses a three-part, five-part, or lettered one"; the `build-pattern`
   plant (fourth part optional) fails it. The floor case is retitled "holds every receipt at or above the package.json
   Node and npm floors and refuses a floor not in the >=x.y.z form".
6. **The guide.**
   - § Hosts, paragraph on floors: states the `engines.node` reading (following section) instead of "which npm reads
     before it runs a script".
   - The resolver sentence names every channel `configs/browsers.ts` can pick: the Chromium Playwright manages, a
     Chromium the host bundles, the installed `chrome` channel, the installed `msedge` channel, and, where it finds
     none, the unverified platform default (`msedge` on Windows, `chrome` elsewhere).
   - A receipt: "A sentence naming a browser build must rest on a receipt; the ER-PROSE unit owns the gate that holds
     each such sentence to one."
   - "the platform the maintainer chooses".
   - A sentence names the readers' malformed-cell refusals (Platform and Commands).
   - Release-host: "In any other mode the case passes when a passing receipt matches and skips when none does. When
     no passing receipt matches, its message names every host value the missing row needs (channel, build, platform,
     kernel, Node, and npm) and says the Date, Revision, and Commands cells come from the run that writes the row."
   - § Tests: "and when the distribution project runs in release mode, fail a run that no passing receipt names".
   - `tests/setupServer.ts`: the `SupportedHost` TSDoc's temporal `once` reads `after`.
7. **The packed link case.** The cascade markup adds a swatch styled inline with the shipped rule's own expression,
   `color: rgb(from var(--vn-color-primary-emphasis) r g b / var(--bs-link-opacity, 1))`. The drive reads the
   swatch's color and the `--vn-color-primary-emphasis` token in place of `--vn-color-primary-rgb`. The case asserts
   the token is non-empty, the link equals the swatch, and the link differs from the danger link. The
   `link-swatch-rgb` plant (swatch written with the `-rgb` token) fails it with
   `expected 'color(srgb 0.0510206 0.212902 0.67272…' to be 'rgb(8, 65, 234)'`. No shipped CSS changed.

## Planted controls

The instrument is `tmp/units/erm-2-plants.py`. Each plant applies exact edits to owned files, runs one gate through
its npm script, restores each file from a byte copy, and appends the per-file SHA-256 before and after. Every log
ends `equal=True`. After the whole run, `sha256sum -c` over the owned files reported every file OK.

| Plant | Edit | Gate | Expected exit | Result (quoted) | Log |
| --- | --- | --- | --- | --- | --- |
| `guide-commands` | receipt Commands `` `test:guides` `test:distribution` `` | `test:guides` | 1 | `Error: Receipt row 1: invalid Commands test:guides test:distribution` in every receipts gate | `tmp/units/erm-2-plant-guide-commands.log.txt` |
| `guide-platform` | Supported host Platform `` `Linux` `` | `test:guides` | 1 | `Error: Supported host row 1: invalid Platform Linux` in every host-reading gate | `tmp/units/erm-2-plant-guide-platform.log.txt` |
| `reader-commands` | round 1's Commands check restored | `test:setup` (readers) | 1 | receipts case: `AssertionError: expected [Function] to throw an error` | `tmp/units/erm-2-plant-reader-commands.log.txt` |
| `reader-platform` | Platform check deleted | `test:setup` (readers) | 1 | supported-hosts case: `AssertionError: expected [Function] to throw an error` | `tmp/units/erm-2-plant-reader-platform.log.txt` |
| `floor-npm` | receipt npm `11.5.0` | `test:guides` | 1 | floor case: `AssertionError` listing `"2026-09-25 873f715: npm 11.5.0 under 11.6.0"` | `tmp/units/erm-2-plant-floor-npm.log.txt` |
| `floor-form` | `engines.node` read as `^22.18.0` | `test:guides` | 1 | `AssertionError: engines.node ^22.18.0 states no >=x.y.z floor: expected undefined to be defined` | `tmp/units/erm-2-plant-floor-form.log.txt` |
| `runtime-build-refusal` | `readRuntime` build check deleted | `test:setup` (readRuntime) | 1 | build-refusal case: `AssertionError: expected [Function] to throw an error` | `tmp/units/erm-2-plant-runtime-build-refusal.log.txt` |
| `build-pattern` | fourth part made optional | `test:setup` (BUILD_PATTERN) | 1 | `AssertionError: expected true to be false` | `tmp/units/erm-2-plant-build-pattern.log.txt` |
| `matcher-false` | `matchesReceipt` returns `false` | `test:setup` (matchesReceipt) | 1 | matching case: `AssertionError: expected false to be true` | `tmp/units/erm-2-plant-matcher-false.log.txt` |
| `release` | `RELEASE = true` | `test:distribution -t 'release host'` | 1 | `AssertionError: The release gate requires … npm 11.19.1. The Date, Revision, and Commands cells come from the run that writes the row: expected false to be true` | `tmp/units/erm-2-plant-release.log.txt` |
| `release-match` | `RELEASE = true`, matching Pass receipt | `test:distribution -t 'release host'` | 0 | `✓ … release host > holds a passing receipt …`, exit 0 | `tmp/units/erm-2-plant-release-match.log.txt` |
| `release-match-false` | as `release-match`, matcher `.some(() => false)` | `test:distribution -t 'release host'` | 1 | the release gate's `AssertionError`, as in `release` | `tmp/units/erm-2-plant-release-match-false.log.txt` |
| `link-swatch-rgb` | swatch written with `--vn-color-primary-rgb` | `test:distribution -t 'packed-CSS page'` | 1 | `AssertionError: expected 'color(srgb 0.0510206 0.212902 0.67272…' to be 'rgb(8, 65, 234)'` | `tmp/units/erm-2-plant-link-swatch-rgb.log.txt` |

A guide plant reddens every gate that reads the malformed table, because each gate calls the reader. The refusal
message is the reader's own.

## The `engines.node` reading

`tmp/units/erm-2-engines.sh`, log `tmp/units/erm-2-engines.log.txt`. The pinned npm is 11.19.1 on Node v22.22.2, with
`engine-strict=false`. The scratch packages sit under the scratchpad.

- `engines.node` `>=99`: `npm run hello` printed `script ran`, `exit=0`, and no warning. npm does not refuse.
- `devEngines.packageManager` npm `>=99.0.0`, `onFail: error`: `npm run hello` failed `EBADDEVENGINES`
  (`Invalid semver version ">=99.0.0" does not match "11.19.1"`), `exit=1`.

The § Hosts sentence reads: "npm 11.19.1 refuses to run a script under an npm version the `devEngines.packageManager`
field excludes, and runs one under a Node version the `engines.node` field excludes, so the guides proof holds each
receipt's Node version against that floor."

## Packed link case, red and green

Both runs follow `npm run build` (`tmp/units/erm-2-build.log.txt`, `exit=0`), in ordinary mode with the registry
reachable.

- Red, before the fix: `npm run test:distribution` (`tmp/units/erm-2-link-red.log.txt`) reports
  `Tests 1 failed | 12 passed | 5 skipped (18)`, `exit=1`. The failure is the packed-CSS page case:
  `expected 'color(srgb 0.0510206 0.212902 0.67272…' to be 'rgb(8, 65, 234)'`.
- Green, after the fix: the same command (`tmp/units/erm-2-link-green.log.txt`) reports
  `Tests 13 passed | 5 skipped (18)`, `exit=0`.

## Gates

`tmp/units/erm-2-gates.sh` ran each gate through its npm script:

| Gate | Exit | Reading | Log |
| --- | --- | --- | --- |
| `npm run format:check` | 0 | All matched files use the correct format | `tmp/units/erm-2-format-check.log.txt` |
| `npm run lint:check` | 0 | `oxlint --deny-warnings .` clean | `tmp/units/erm-2-lint-check.log.txt` |
| `npm run check` | 0 | every project typechecks | `tmp/units/erm-2-check.log.txt` |
| `npm run test:setup` | 0 | `330 passed (330)` | `tmp/units/erm-2-test-setup.log.txt` |
| `npm run test:guides` | 0 | `26 passed (26)` | `tmp/units/erm-2-test-guides.log.txt` |
| `npm run test:policy` | 0 | `109 passed \| 1 skipped (110)` | `tmp/units/erm-2-test-policy.log.txt` |
| `npm run test:conformance` | 0 | `26 passed (26)` | `tmp/units/erm-2-test-conformance.log.txt` |
| `npm run test:distribution` | 0 | `13 passed \| 5 skipped (18)` | `tmp/units/erm-2-test-distribution.log.txt` |

## Diff and status

`tmp/units/erm-2.diff` (`git diff 873f715`) and `tmp/units/erm-2-status.txt` (the five owned files, all ` M`).

```text
 guides/veneer.md           |  63 ++++++++-
 tests/distribution.test.ts |  57 ++++++--
 tests/guides.test.ts       |  95 +++++++++++++-
 tests/setupServer.test.ts  | 256 +++++++++++++++++++++++++++++++++++-
 tests/setupServer.ts       | 317 ++++++++++++++++++++++++++++++++++++++++++++-
```

## Choices settled in this round

- `NODE_PLATFORMS` and `matchesReceipt` are exports in `tests/setupServer.ts`, listed in the export inventory. The
  `release host` case is `matchesReceipt`'s first consumer. The guides gates keep their own channel-and-platform
  predicate, because a host match ignores the build.
- `readRuntime`'s `browser` parameter is `Pick<Browser, 'version'>`, the seam the invalid-build case needs. Every
  existing caller passes a real `Browser`.
- The swatch sits in the links' paragraph of the cascade markup. The markup comment states that the links have no
  twin and that the swatch is the second resolution of their token.
- The throwaway parser probe (`erm-2-cells.mjs`) and the `engines` scratch packages are in the scratchpad, not the
  tree.
