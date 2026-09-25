Now producing the final verdict.

VERDICT (claims 5, 6, 8 of `/home/user/scaffold/.orkestrel/veneer/units/erm-audit-2-claims.md`)

**5. Titles.**
- `BUILD_PATTERN`'s assertions sit in their own case, titled for the pattern: `/home/user/scaffold/.orkestrel/veneer/units/erm-2-delta.diff:323-332` (`describe('BUILD_PATTERN', ...) it('matches a four-part numeric build and refuses a three-part, five-part, or lettered one', ...)`).
- The `build-pattern` plant fails it with an assertion failure: `/home/user/scaffold/.orkestrel/veneer/units/erm-instruments/r2/logs/erm-2-plant-build-pattern.log.txt:12-22` (`AssertionError: expected true to be false`, `exit=1`), with the restore line confirming the file was returned to its pre-plant state.
- Every case round 2 adds or retitles states what it proves: retitled reader case `erm-2-delta.diff:230-231` ("...refuses a missing column, a missing cell, and a platform Node never reports"); retitled `readRuntime` case `erm-2-delta.diff:282-284` ("reads this run's channel, build, platform, kernel, Node, and npm, agreeing with npm's user agent..."); new cases `erm-2-delta.diff:253-256` (NODE_PLATFORMS membership), `erm-2-delta.diff:308-320` (build refusal), `erm-2-delta.diff:334-363` (`matchesReceipt`); retitled floor case `erm-2-delta.diff:185-186` ("...and refuses a floor not in the >=x.y.z form"). Each title names the property its body asserts.

CONFIRMED — `/home/user/scaffold/.orkestrel/veneer/units/erm-2-delta.diff:230-231,253-256,282-284,308-332,334-363`; `/home/user/scaffold/.orkestrel/veneer/units/erm-instruments/r2/logs/erm-2-plant-build-pattern.log.txt:1-40`; `/home/user/scaffold/.orkestrel/veneer/units/erm-2-delta.diff:185-186`.

**6. The guide.**
- Non-release run passes-on-match / skips-on-none: `/home/user/veneer-erm/guides/veneer.md` diff at `erm-2-delta.diff:59-62` ("In any other mode the case passes when a passing receipt matches and skips when none does.") — verbatim to the claim.
- Message names every host value: `erm-2-delta.diff:62-63` ("its message names every host value the missing row needs (channel, build, platform, kernel, Node, and npm)").
- Build-needs-a-receipt stated as a coming requirement, not a present fact: `erm-2-delta.diff:44-45` ("A sentence naming a browser build must rest on a receipt; the ER-PROSE unit owns the gate that holds each such sentence to one.") — conditioned, not asserted as already enforced.
- Maintainer chooses the platform: `erm-2-delta.diff:50` ("the platform the maintainer chooses").
- `engines.node` sentence matches the log: guide (`erm-2-delta.diff:15-17`, "npm 11.19.1 refuses to run a script under an npm version the `devEngines.packageManager` field excludes, and runs one under a Node version the `engines.node` field excludes") against `/home/user/scaffold/.orkestrel/veneer/units/erm-instruments/r2/logs/erm-2-engines.log.txt:1-8` (engines-probe with `engines.node: >=99`, current Node `v22.22.2`, `exit=0`, script ran) and `:9-19` (devengines probe, `EBADDEVENGINES`, `exit=1`). Both readings match the sentence exactly.
- Every channel `configs/browsers.ts` can pick: guide (`erm-2-delta.diff:19-25`, "the Chromium Playwright manages, a Chromium the host bundles, the installed `chrome` channel, and the installed `msedge` channel. Where it finds none, it names the platform's default channel... `msedge` on Windows and `chrome` on every other platform") against `/home/user/veneer-erm/configs/browsers.ts:289-315` (`resolveBrowser`: managed → bundled → `resolveSystemBrowser` (chrome, then msedge) → `fallback = platform === 'win32' ? 'msedge' : 'chrome'`). Every branch the guide names has a corresponding code path; none omitted.
- § Tests states the release binding in the same conditioned form: `erm-2-delta.diff:74-77` ("...when the distribution project runs in release mode, fail a run that no passing receipt names"), matching § Hosts's conditioned framing at `erm-2-delta.diff:59-62`.
- `tests/setupServer.ts` writes no temporal `once`: confirmed removed at `erm-2-delta.diff:373-374` (`once` → `after`); the remaining `once` occurrences in `/home/user/veneer-erm/tests/setupServer.ts` (lines 1885, 2197, 2249, 2299, 2342, 2454, 2495, 2544, 2657, 2789, 3089) are all frequency/count senses ("each name once," "parses the text once"), not temporal.

CONFIRMED — file:line citations above.

**8. Scope and law.**
- Round 2 changes only paths `er-mech-brief-2.md` owns: owned set = `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/guides.test.ts`, `tests/distribution.test.ts`, `guides/veneer.md` (`er-mech-brief-2.md:53-54`). `erm-2-status.txt:1-5` lists exactly those five files, none other.
- `erm-2-status.txt` and `erm-2.diff` name the same files: `erm-2-status.txt:1-5` vs `erm-2.diff` diff headers at lines 1, 80, 187, 301, 644 — same five files, no extra, no missing.
- Every new export appears in the export inventory: only two new value exports in the delta, `NODE_PLATFORMS` (`erm-2-delta.diff:386`) and `matchesReceipt` (`erm-2-delta.diff:506`); both added to the inventory arrays in `tests/setupServer.test.ts` (`erm-2-delta.diff:198,206,214,222`). Confirmed via `grep '^export' /home/user/veneer-erm/tests/setupServer.ts` and `grep '^\+export (const|function|interface|type)' erm-2-delta.diff` returning exactly these two.
- The delta adds no `any`, prohibited assertion, non-null assertion, suppression, nested function declaration, or hidden helper: swept the delta for `: any`, `<any>`, `as <Type>`, `@ts-`, `eslint-disable`, and trailing `!` forms — no genuine hits (the only "as" matches were prose, e.g. "as the {@link readReceipts} function returns it"); swept for new `function` declarations — none nested, only the top-level `export function matchesReceipt`; corroborated by `npm run lint:check` (`erm-2-check.log.txt` exit=0, `erm-2-lint-check.log.txt` exit=0), which would reject `any`/assertions/suppressions under this repository's Oxlint config.

CONFIRMED — `/home/user/scaffold/.orkestrel/veneer/units/erm-2-status.txt:1-5`; `/home/user/scaffold/.orkestrel/veneer/units/erm-2.diff` (diff headers at lines 1,80,187,301,644); `/home/user/scaffold/.orkestrel/veneer/units/erm-2-delta.diff:198,206,214,222,386,506`; `/home/user/scaffold/.orkestrel/veneer/units/erm-instruments/r2/logs/erm-2-check.log.txt:29`; `/home/user/scaffold/.orkestrel/veneer/units/erm-instruments/r2/logs/erm-2-lint-check.log.txt:5`.

**Findings outside the claims:** none.

**Attacked and held:** claim 6's channel list was attacked by checking whether the guide's four named channels each map to a real branch in `resolveBrowser` — every branch (managed, bundled, verified `chrome`/`msedge`, unverified fallback) is present; no channel is claimed that the code cannot pick, and no code branch is left unnamed. Claim 8's "no hidden helper" was attacked by searching for any new module-scope function outside `matchesReceipt`'s export — none found.

VERDICT: PASS
