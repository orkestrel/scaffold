**Lane: subjective.** `reviewer` on Opus 5.5, clean context. Subject: ER-MECH round 2 in `/home/user/veneer-erm`, judged against `/home/user/scaffold/.orkestrel/veneer/units/erm-audit-2-claims.md`. Opus 5.5 wrote the unit, so I attacked the work harder. This lane can only read, so every run cited here is the writer's own retained log.

## Per-claim verdicts

**1. Readers refuse malformed cells: CONFIRMED.**
- **Commands check:** `/home/user/veneer-erm/tests/setupServer.ts` `readReceipts`, around lines 1349–1361, requires a code span, then a comma, alternating, and an odd span count. The scratch-guide rows are in `tests/setupServer.test.ts` around lines 1334–1344: a space-only gap, a doubled comma, and a trailing comma. Each expects `Receipt row 1: invalid Commands …`.
- **Platform check:** `readSupportedHosts`, around lines 1258–1261, refuses a Platform cell that is neither `—` nor in `NODE_PLATFORMS`, with `Supported host row N: invalid Platform X`. Its TSDoc states that Channel is not checked, and no Channel check exists.
- **`NODE_PLATFORMS`:** it lists the same members as the `Platform` union in `node_modules/@types/node/process.d.ts:282`–293.
- **Mutation (Commands):** restore round 1's check. `erm-2-plant-reader-commands.log.txt:15` shows `AssertionError: expected [Function] to throw`. Distinguished: yes.
  - The loop stops at its first failure, so the plant shows only the space-only row failing.
  - By reading, the doubled-comma assertion distinguishes a "text contains a comma" mutation. The trailing-comma assertion distinguishes deleting the `% 2` parity check.
- **Mutation (Platform):** delete the check. `erm-2-plant-reader-platform.log.txt:15` shows an assertion failure on the `Linux` row. Distinguished: yes.

**2. Floors: CONFIRMED.**
- The case title at `tests/guides.test.ts:122` names both refusals.
- **`floor-npm`:** `erm-2-plant-floor-npm.log.txt:15`–22 shows an `AssertionError` listing `npm 11.5.0 under 11.6.0`.
  - Mutation: delete the npm comparison. Then `below` stays empty and the case passes, so the plant distinguishes it.
- **`floor-form`:** `erm-2-plant-floor-form.log.txt:15` shows `engines.node ^22.18.0 states no >=x.y.z floor`.
  - Mutation: delete the `nodeFloor` `toBeDefined` assertion. With a caret floor the Node comparison is skipped and the case passes, so the plant distinguishes it.
- Only the Node half of the form refusal has a plant. The claim names one plant, so this does not break it.

**3. Live runtime: CONFIRMED.**
- **Title and comment:** `tests/setupServer.test.ts:3344`. The title names what the case reads and what it compares each reading against. The comment at lines 3356–3359 is true.
- **DevTools comparison:** Playwright sets `_version` from the same `Browser.getVersion` read and slices after the `/` (`playwright-core/lib/coreBundle.js:38356`–38358).
- **User agent:** Playwright's page user-agent override sends `options.userAgent || ""` (`coreBundle.js:38047`–38048). With no option set, `navigator.userAgent` is the browser's own value. Playwright stores the browser-level user agent at `:38363`, but it never reads the page's `navigator.userAgent`, so "a reading Playwright does not take" holds for the page reading.
- **Mutation:** hard-code the build in `readRuntime`. The DevTools equality catches it (round 1's `runtime-build` plant). A Playwright misreport is caught only by the user-agent major, which the comment states.

**4. Release-host case: CONFIRMED.**
- **Message:** `tests/distribution.test.ts:1229` names Channel, Build, Platform, Kernel, Node, and npm. It adds "The Date, Revision, and Commands cells come from the run that writes the row". `matchesReceipt` decides the match at line 1228.
- **`release-match` control:** exit 0 with the case passing (`erm-2-plant-release-match.log.txt:22`, `:44`).
- **Mutation: a matcher that always returns `false`.**
  - `release-match-false` puts `.some(() => false)` at the call site. It fails with the gate's `AssertionError` (`erm-2-plant-release-match-false.log.txt:37`).
  - `matcher-false` makes `matchesReceipt` return `false`. It fails the matching case (`erm-2-plant-matcher-false.log.txt:14`–15).
  - Distinguished: yes. The pass control is what separates the two runs.
- **Invalid-build case:** `readRuntime` takes `browser: Pick<Browser, 'version'>` (`setupServer.ts:1195`), and the TSDoc at `:1172` says only `version` is read.
  - The case at `setupServer.test.ts:3390`–3402 passes an inert data stub, and a four-part build is accepted as its control.
  - `runtime-build-refusal` fails it with an assertion (`erm-2-plant-runtime-build-refusal.log.txt:14`–15).

**5. Titles: BROKEN.**
- **What holds:**
  - `BUILD_PATTERN` has its own describe and case (`setupServer.test.ts:3405`–3414). `build-pattern` fails it at the three-part assertion (`erm-2-plant-build-pattern.log.txt:15`–26).
  - The retitled supported-hosts case, the floor case, the live case, both `matchesReceipt` cases, and the invalid-build case each state what they assert.
- **What breaks:** `/home/user/veneer-erm/tests/setupServer.test.ts:1281`, `'lists the platform this process runs on among the platforms Node reports'`.
  - The case also asserts `new Set(NODE_PLATFORMS).size === NODE_PLATFORMS.length`, and the title does not say so.
  - **Failing state:** add a second `'linux'` to `NODE_PLATFORMS`. The case goes red under a title that names only membership.
  - This is the same defect class that round 1 ruled BROKEN for the `BUILD_PATTERN` assertions.
  - The case also sits in `describe('server setup')` without naming its subject, while round 2 gave `BUILD_PATTERN` and `matchesReceipt` their own describes.
- **Smallest fix:** move the case into `describe('NODE_PLATFORMS', …)` and title it, for example, "holds the platform this process runs on, and each platform once".

**6. The guide: CONFIRMED.**
- **Non-release run:** `guides/veneer.md:10575`–10576 says a non-release run passes on a match and skips otherwise. This matches `distribution.test.ts:1230`.
- **Message:** lines 10576–10578 name every host value and the source of the Date, Revision, and Commands cells.
- **Build sentences:** line 10559–10560 states "must rest on a receipt" as a requirement. "the ER-PROSE unit owns the gate" follows the guide's standing convention for future work, "the behavior J-ENGINE owns" (for example line 4566). It does not claim that a gate exists today.
- **Maintainer:** line 10565 reads "the maintainer chooses".
- **`engines.node`:** lines 10545–10548 match `erm-2-engines.log.txt`. `engines.node >=99` printed `script ran` and exited 0. `devEngines` with `onFail: error` failed `EBADDEVENGINES` and exited 1. Veneer's `package.json:122`–126 sets `onFail: "error"`.
- **Channels:** lines 10551–10555 list the managed Chromium, a bundled Chromium, `chrome`, `msedge`, and the unverified default (`msedge` on Windows, `chrome` elsewhere). This matches `configs/browsers.ts:307`–314.
- **§ Tests:** it takes the conditioned release-mode form.
- **Temporal `once`:** `tests/setupServer.ts` has none. Every remaining `once` means "a single time".

**7. The packed link case: CONFIRMED.**
- **Swatch:** the swatch at `distribution.test.ts` line 106 of the delta uses the expression the shipped rule uses, `rgb(from var(--vn-color-primary-emphasis) r g b / var(--bs-link-opacity, 1))` (`src/styles/utilities/_link.scss:48`–50).
- **Comparisons:** the danger comparison is kept.
- **Red and green:** `erm-2-link-red.log.txt:30`–34 shows 1 failed and exit 1. `erm-2-link-green.log.txt:11`–15 shows 13 passed and exit 0.
- **Mutations:**
  - Rewrite the swatch with the `-rgb` token. The `link-swatch-rgb` plant then fails with `AssertionError … to be 'rgb(8, 65, 234)'` (`erm-2-plant-link-swatch-rgb.log.txt:37`).
  - A page with no stylesheet fails the non-empty token assertion.
  - Distinguished: yes.

**8. Scope and law: CONFIRMED.**
- **Files:** `erm-2-status.txt` and the diff name the same files: `guides/veneer.md`, `tests/distribution.test.ts`, `tests/guides.test.ts`, `tests/setupServer.test.ts`, and `tests/setupServer.ts`. `er-mech-brief-2.md` owns all of them.
- **Inventory:** `NODE_PLATFORMS` and `matchesReceipt` are added to the export inventory.
- **Law:** the delta adds no `any`, no `as` assertion, no `!`, no suppression, no nested function declaration, and no unexported helper. See referral R1 for the stub's arrow property.

## Findings outside the claims

**F1. The guide says both readers refuse a bad Platform cell, but the Receipts reader does not.**
- **Sentence:** `/home/user/veneer-erm/guides/veneer.md:10567`–10569, "The readers of both tables refuse a malformed cell and name its row, including a Platform cell that is neither `—` nor a value Node reports as its platform…".
- **Code:** `readReceipts` (`tests/setupServer.ts`, around lines 1311–1348) checks only that the Platform cell is non-empty.
- **Failing input:** a Receipts row with Platform `` `Linux` `` (or `—`).
  - `readReceipts` returns it without refusing.
  - The gate `names a supported host in every receipt` (`tests/guides.test.ts:81`–90) then reports `chromium on Linux` as an unsupported host.
  - That is the wrong-cause diagnosis round 1 ruled against for Supported hosts. It has moved to the other table.
  - The design verdict requires both readers to "throw on a malformed cell".
- **Fix (recommended):**
  - Apply the `NODE_PLATFORMS` check to the Receipts Platform cell as `Receipt row N: invalid Platform X`. Refuse `—` there too, because `readRuntime` always records a platform.
  - Add a row to the receipts scratch-guide case, and a plant that deletes the check.
- **Alternative:** narrow the sentence to name only the Supported hosts reader. This fixes the prose but leaves the code short of the design verdict.

## Attacked and held

- **Voice, not broken:**
  - "npm 11.19.1 refuses to run a script under an npm version the … field excludes" (`guides/veneer.md:10545`–10546) is hard to read the first time. "when that field excludes its own version" reads more plainly.
  - Line 10577 runs past the section's wrap width.
  - The skip prefix "No receipt matched. The row needs …" (`distribution.test.ts:1230`) is older than round 2. "The row" has no referent.
- **Owner ids in prose:** `ER-PROSE` is not in ROADMAP.md, but the Owner cells use the same unit ids, the design verdict set that pattern, and round 1 accepted it.
- **`matchesReceipt` design:** it fits. The name uses the `matches…` form of its siblings, it ignores kernel, Node, and npm, and its remarks say why. The guides gates keep their own host predicate on purpose, because a host has no build.
- **`Pick<Browser, 'version'>`:** this narrowing is the smallest contract that lets an inert stub drive the refusal. Every caller that launches a browser still passes a real `Browser`.

## Referrals to the objective lane

- **R1:** `readRuntime({ version: () => build }, …)` (`tests/setupServer.test.ts:3395`, `:3399`) passes an arrow as an object-literal property, not directly as an argument. Rule it against the no-nested-functions law. Also rule the inline `Pick<Browser, 'version'>` in an exported signature against the types-first placement rule.
- **R2:** nothing fails if a member is dropped from `NODE_PLATFORMS`, apart from `linux` and `win32`, which the real guide exercises. Consider a `satisfies Record<NodeJS.Platform, …>` exhaustiveness check. Also rule whether the `@types/node` union equals what Node 22.22.2 can report at runtime.
- **R3:** the `engines.node` reading ran under `engine-strict=false` (`erm-2-engines.log.txt:1`). The guide states the behaviour without that condition. Rule whether `npm run` behaves the same under `engine-strict=true`.
- **R4:** in the `reader-commands` plant, only the space-only row was shown to fail. Confirm by a run that the doubled-comma and trailing-comma rows each go red under their own mutation.

VERDICT: FAIL 5; outside the claims: F1
