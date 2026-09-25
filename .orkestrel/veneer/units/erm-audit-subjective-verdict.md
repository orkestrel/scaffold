**Lane: subjective** (`reviewer`, Opus 5.5). Subject: the uncommitted ER-MECH changes in `/home/user/veneer-erm`, audited against `/home/user/scaffold/.orkestrel/veneer/units/erm-audit-claims.md`.

## Per-claim verdicts

**1. Types and readers: BROKEN.**
- **What holds:**
  - `Runtime`, `Receipt extends Runtime` (with `revision`) and `SupportedHost` carry the verdict's fields. Every property is readonly, and absence is `undefined` (diff lines 517–553).
  - `readRuntime` reads `browser.version()` and `npm_config_user_agent`. It throws when that variable is absent (`/home/user/veneer-erm/tests/setupServer.ts`, around line 1184 and the lines after it).
  - `readReceipts` refuses a malformed Date, Revision, Build, Node, npm, Result or Commands cell, and names the row.
- **What breaks:** `readSupportedHosts` (`/home/user/veneer-erm/tests/setupServer.ts:1212`–1245) refuses only a missing subsection, column or cell. It has no rule for a malformed value.
  - **Failing input:** the row `` | `chromium` | `Linux` | ER-LINUX | ``. It reads back as `{ platform: 'Linux' }` with no refusal.
  - **Consequence:** `readRuntime` always records `process.platform`, so no receipt can ever match that host. The only signal comes later, from the unowned-host gate, as "no passing receipt", which names the wrong cause.
  - **Context:** the design verdict requires both readers to "throw on a malformed cell". The function's own TSDoc is honest that it refuses only missing parts, so the gap is against the verdict, not against its docs.
- **Smallest fix:** refuse a Platform cell that is neither `—` nor a Node platform identifier, with the message `Supported host row N: invalid Platform X`.
  - Do not also validate Channel against a Playwright list. Channels are an open set, so that would over-correct.
  - If the Orchestrator rules that value checks on hosts are out of scope, restate the claim and the verdict instead.

**2. Reader proofs: CONFIRMED.**
- **Evidence:**
  - Each plant log (`erm-plant-{build,date,result,cell}.log.txt`) fails with the reader's own refusal message, for example "Receipt row 1: invalid Build 141.0.7390".
  - Each restore line records identical before and after digests.
- **Mutation named:** delete the matching check in `readReceipts` (the Build pattern, the UTC round-trip, the Pass/Fail rule, or the missing-cell rule).
- **Distinguished:** yes.
  - The planted row (`erm-plants.py:20`) is valid in every other way: a `Fail` result, a supported `chromium`/`linux` host, a known script, and Node and npm above their floors.
  - So with the check deleted, every gate goes green. The refusal is the only thing that can fail these cases.

**3. Gates: CONFIRMED.**
- **Evidence:**
  - `/home/user/veneer-erm/tests/guides.test.ts` asserts all six gates, and refuses a floor not written as `>=x.y.z`.
  - Each gate plant fails only its own case, with an `AssertionError` and "1 failed | 25 passed": `stale`, `channel`, `floor`, `script`, `repeat`, `unowned` and `host`.
- **Mutation named:** flip or delete each gate's comparison.
- **Distinguished:** yes, for every gate half that has a plant.
- **Not distinguished:** deleting the npm-floor comparison, and deleting the `>=` form refusal. No plant exists for either (see Referral R1).

**4. Live runtime: CONFIRMED.**
- **Evidence:**
  - Node and platform are compared against npm's user agent, which is a reading taken by another process.
  - The `runtime-node` plant fails the case with `expected 'v22.22.2' to be '22.22.2'`.
  - The `runtime-build` plant fails it with `expected '141.0.7390.0' to be '141.0.7390.37'`.
- **Mutation named:** change where `readRuntime` sources the build or Node version, or how it transforms it.
- **Distinguished:** yes.
- **Limit:** the build comparison is not independent of Playwright.
  - Playwright computes `browser.version()` with the same `Browser.getVersion` call and the same slice after the `/` (`node_modules/playwright-core/lib/coreBundle.js:38356`–38358). The case repeats both at `/home/user/veneer-erm/tests/setupServer.test.ts:3330`.
  - So it catches a `readRuntime` defect, but not a Playwright misreport. Only the user-agent major check is independent of Playwright.
  - No plant covers platform. A hard-coded `'linux'` would pass on this host, and that limit is inherent to a single host.

**5. Release-host case: BROKEN.**
- **What holds:**
  - The case launches through `resolveBrowser`, refuses a remote browser, and reads `readRuntime`.
  - The `release` plant fails it with an assertion (`erm-plant-release.log.txt:23`).
  - Outside release mode it skips with the same values (`erm-distribution-release-verbose.log.txt:21`).
- **What breaks:** "naming every value a receipt row needs".
  - The message names Channel, Build, Platform, Kernel, Node and npm (`/home/user/veneer-erm/tests/distribution.test.ts`, the `missing` constant in the `release host` describe).
  - A row also needs Date, Revision, Commands and Result.
  - Revision is the column the verdict added "because a receipt that does not name its tree cannot be re-run", and the message omits it.
- **Smallest fix:** word the message and the guide as "every host value the row needs". Adding a git read would be new capability.
- **Mutation named:** set `recorded` to always `false`.
- **Distinguished:** no. The release plant fails identically under that mutation, because no control proves that a matching receipt makes the case pass (see Referral R2).

**6. The guide: BROKEN.**
- **What holds:**
  - Placement is correct: Compatibility at line 10236, Hosts at 10542, Tests at 10722.
  - Supported hosts carries the verdict's four hosts, each with an owner.
  - Receipts holds a header and no row.
- **What breaks:** these sentences in `/home/user/veneer-erm/guides/veneer.md`.
  - **Line 10567, "in any other mode it skips":** outside release mode, the case passes when a matching receipt exists (the `!recorded && !RELEASE` guard in the case).
    - ER-LINUX lands that receipt together with ER-MECH, so on the Linux host this sentence is false as soon as it reaches `main`.
    - Replace it with: "in any other mode a missing receipt skips the case instead of failing it."
  - **Lines 10567–10568, "Either way the case's message names every value the missing row needs":** false for the same reason as claim 5. Revision, Date and Commands are absent.
  - **Lines 10554–10555, a receipt "is the record a sentence naming a browser build rests on":**
    - This is stated as present fact, but no receipt exists.
    - Build-naming sentences such as "Chromium 141" at line 2786 and 3542, and "Chromium 153" at line 2798, rest on none.
    - No gate reads this relation; ER-PROSE owns that gate.
    - Rewrite it as a requirement ("must rest on"), or drop it until ER-PROSE lands its gate.

**7. Reuse and law: BROKEN.**
- **What holds:**
  - `compareVersions` and `VERSION_PATTERN` are imported from `@orkestrel/scaffold`.
  - The inventory adds `BUILD_PATTERN`, `readReceipts`, `readRuntime` and `readSupportedHosts`.
  - The change adds no `any`, no `!`, no suppression, no nested declaration and no hidden helper. Its one `as const` (diff line 387) fixes a tuple's arity, which `typescript.md` permits.
- **What breaks:** case titles.
  - **`/home/user/veneer-erm/tests/setupServer.test.ts:3315`**, "reads … the Node and platform npm reports":
    - The title says `readRuntime` reads npm's values, but it reads `process.versions.node` and `process.platform`. npm's user agent is only the reading it is compared against.
    - The case also proves the channel, npm and kernel values, which the title leaves out.
    - Retitle it as, for example, "reads the build the launched browser reports, and a Node version and platform that agree with npm's user agent".
  - **`/home/user/veneer-erm/tests/setupServer.test.ts:3342`:**
    - The title names three `readRuntime` refusals. The case also proves the four-part rule of `BUILD_PATTERN` (lines 3357–3358).
    - Move those two assertions into their own case, titled for the pattern.
  - **`/home/user/veneer-erm/tests/guides.test.ts:122` (lesser):** the case also refuses a floor not written as `>=x.y.z`, and its title does not say so.

**8. Scope: CONFIRMED.**
- The status and the diff name the same files: `guides/veneer.md`, `tests/distribution.test.ts`, `tests/guides.test.ts`, `tests/setupServer.test.ts` and `tests/setupServer.ts`.
- Each is owned in `er-mech-brief.md` § Scope. The guide edits stay inside § Hosts and the § Tests links.

## Findings outside the claims

**F1. The § Tests sentence claims a binding that no release run reaches.**
- **Where:** `/home/user/veneer-erm/guides/veneer.md:10005`–10006, "…and bind a release run to a receipt on the build it launched".
- **Evidence:** the only release invocation, `npm run test:distribution -- --mode release`, the command `prepublishOnly` runs, skips the case (`erm-distribution-release-verbose.log.txt:21`). No release run is bound.
- **Contrast:** the § Hosts sentence is correctly conditioned ("When the distribution project runs in release mode"), but this one states the binding as a fact.
- **Fix:** reword it to "and fail a release-mode run that no passing receipt names", or carry it in the release-mode design unit so that it becomes true there.

**F2. Two sentences break the writing rules.**
- **Guide line 10559, "the platform the user chooses":** `.claude/rules/writing.md` § Voice and actor reserves `user` for someone using software the developer builds. Here it means the repository owner. Write "the maintainer chooses", or name the owner.
- **`/home/user/veneer-erm/tests/setupServer.ts:98`, "is undefined once that receipt is recorded":** this is a temporal `once`, which the substitution table replaces with `after`.

## Attacked and held

- **Readers kept to their subsection:** the scratch guides plant tables of the same name under `## Other`, and a Receipts table carrying Supported-host columns. Both readers ignore them (setupServer test, diff lines 311 and 348).
- **Owner cleared on the `chrome` row with no platform:** the unowned gate catches it (`'chrome on —'`), because `undefined` never equals a receipt's platform.
- **Repeated host with a different owner:** the host gate keys on channel and platform only, so the copy is caught.
- **Command with arguments:** only the first word must name a script, so `test:distribution -- --mode release` passes, which is correct.
- **§ Hosts sentence "When the distribution project runs in release mode…":** true of the code. The fact that `--mode release` never reaches release mode is the reach defect, which is excluded from these claims.
- **Browser the release-host case launches:** the same `resolveBrowser` call as the browser projects (`vite.config.ts:14`), so "the browser the browser projects launch" holds.
- **Design fit:** `Receipt extends Runtime` composes well (a receipt is a runtime reading plus a record). `passed` is a correct boolean. Unit ids in the Owner column follow the existing J-ENGINE precedent in the guide.

## Referrals to the objective lane

- **R1:** no plant covers the npm-floor half, or the `>=x.y.z` refusal of `package.json` floors, in `/home/user/veneer-erm/tests/guides.test.ts:122`–149. Deleting either passes every retained control.
- **R2:** the release-host case has no control where a matching receipt makes it pass. Replacing the `.some(...)` matcher with `false` is not distinguished by the `release` plant.
- **R3:** no case drives the `Runtime: invalid build` refusal (`/home/user/veneer-erm/tests/setupServer.ts:1184`).
- **R4:** does `npm run` enforce `engines.node`, as guide line 10545 implies ("which npm reads before it runs a script")? It is known to fail on `devEngines` (the brief's npm 10.9.7 note). No reading covers `engines.node`.
- **R5:** readRuntime's resolver description at guide line 10549–10550 leaves out the unverified platform-default channel (`configs/browsers.ts:313`–314). Rule whether that omission makes the sentence false.

VERDICT: FAIL 1, 5, 6, 7; outside the claims: F1, F2