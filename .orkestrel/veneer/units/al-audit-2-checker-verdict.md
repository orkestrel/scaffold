# ALERT (`al`) audit round 2 — `checker` on Sonnet verdict (claims 1, 2, 7, 8)

Orchestrator reading appended after the lane returned: the lane left claim 7's digest sub-part UNRESOLVED because no retained log records it; `sha256sum /home/user/scaffold/.orkestrel/veneer/units/al-shared-2.patch` run by the Orchestrator at 16:08 UTC reads `6c32eb15eac2b64e3148c06b7fcd982dbd4f6d4abf808c278fe66408c2fec3a0`, equal to the report's digest, so that sub-part is CONFIRMED on that measurement.

VERDICT scope: claims 1, 2, 7, 8 of `/home/user/scaffold/.orkestrel/veneer/units/al-audit-2-claims.md`.

## Claim 1 — Delta and scope: CONFIRMED

- `al-2-status.txt:1-4` lists exactly `app/browser/sections/AlertSection.ts`, `src/styles/components/_alert.scss`, `tests/app/browser/sections/AlertSection.test.ts`, `tests/src/styles/components/alert.test.ts` as untracked, nothing else.
- `al-2.diff` contains exactly those four files as `/dev/null → file` additions (lines 1, 76, 334, 360 headers), no other path.
- `al-shared-2.patch` file list (`apply-check.log.txt:26-38`, and the diff's own `diff --git` headers) is exactly the thirteen files the claim names: `app/browser/Showcase.ts`, `app/browser/constants.ts`, `app/browser/index.ts`, `guides/veneer.md`, `src/styles/index.scss`, `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, `tests/app/browser/integration.test.ts`, `tests/conformance.test.ts`, `tests/setup.ts`, `tests/setupServer.test.ts`, `tests/setupStyles.test.ts`, `tests/setupStyles.ts` — matches the Shared row verbatim (no vendored file, no sibling-unit file, no `src/browser/**`, `src/core/**`, `tests/fixtures/**`, `package.json`, `README.md`, or `ROADMAP.md`).
- Removed-line claims confirmed in the patch: `.alert-dismissible .btn-close` moved from the Overlays deferral table to the `btn-close` compatibility table and out of `CLOSE_DEFERRED` (`al-shared-2.patch` lines 179, 211-219, 586); the `CLOSE_COPY` sentence corrected (line 73-74); the `end` key and its readers removed in favor of `right` (setupStyles.ts / setupStyles.test.ts hunks, lines 511-582, 424-507).

## Claim 2 — The mutation logs (round-1 claim 3): CONFIRMED

- Every `RUN` line sampled (`control.log.txt:2`, `lift-sunk.log.txt:2`, `lift-dropped.log.txt:2`, `loop-roles.log.txt:2`) reads ` RUN  v4.1.11 /home/user/veneer-al/tmp/probe/base`, matching the claim.
- Red-case locations match the shipped `alert.test.ts` in `al-2.diff`: `lift-sunk` and `lift-dropped` both fail at `alert.test.ts:223:27` (`lift-sunk.log.txt:120`, `lift-dropped.log.txt:120`), and counting `al-2.diff`'s added lines (file line = diff line − 81) places `expect(readHit(control)).toBe(control)` at file line 223 (diff line 304) — exact match.
- `control.log.txt:102-103` reads `Tests  28 passed (28)` with no failures, matching "the unmutated `control` log reads `28 passed (28)`".
- The eight named mutations (`role-alias`, `role-literal`, `loop-roles`, `close-left`, `close-plain-alert`, `link-dropped`, `heading-dropped`, `literal-padding`) each have a corresponding `logs/<name>.log.txt`, confirmed by directory listing.
- `loop-roles` also reddens the two conformance additions cases: `loop-roles.conformance.log.txt:12-52` shows both `records every emitted name the official inventory lacks` and `reports an unrecorded literal declaration on a shipped rule as a declaration addition` failing, each naming `alert | .alert-tertiary | — | selector`.
- Mutation to redden-case distinction: the `lift-sunk`/`lift-dropped` assertion at line 223 (`readHit(control)`) fails only under those two mutations and passes in `control`, so the assertion distinguishes the mutation from the passing case as the claim requires.
- Derivation via `derive.py` from the shipped partial into `mutations/<name>.scss` is asserted by the report and not independently re-run by this read-only lane; treated as UNRESOLVED (writer's own account, no log proves the derivation step itself), but immaterial to the log-vs-shipped-test match this claim turns on.

## Claim 7 — The gates and the patch check: CONFIRMED, with one UNRESOLVED sub-part

- `gates.log.txt:1-10` on the validation copy: `format exit=0`, `lint exit=0`, `check exit=0`, `build exit=0`, `styles exit=0 :: Tests 45 passed (45)`, `section exit=0 :: Tests 9 passed (9)`, `guides exit=0 :: Tests 19 passed (19)`, `policy exit=0 :: Tests 109 passed | 1 skipped (110)`, `setup exit=0 :: Tests 251 passed (251)`, `conformance exit=0 :: Tests 22 passed (22)` — matches every gate result line the claim states.
- `apply-check.log.txt:16-24`: patch reverses cleanly (`apply -R … exit=0`), `git status --porcelain` empty, tree hash `3e87fe08292705b63b060135c874e2f69e7171ea` on both sides, `apply --check … exit=0` — matches the claim's tree-hash and check-exit assertions.
- `apply-check.log.txt:26-38` file list equals the Shared row (see claim 1).
- `worktree-scoped.log.txt:1-8`: `oxfmt --check` and `oxlint --deny-warnings` over the four owned files both exit 0.
- The patch's SHA-256 (`6c32eb15eac2b64e3148c06b7fcd982dbd4f6d4abf808c278fe66408c2fec3a0`) appears only in the claims file and the report itself (`grep` for the hash found no log recording it) — **UNRESOLVED**: this is the writer's self-reported digest with no independently-run `sha256sum` in any retained log, so it cannot be CONFIRMED by a read-only lane and must not be taken as verified.

## Claim 8 — Law and report: CONFIRMED

- No `any`, no bare `as` assertion (`al-2.diff` line 245 `] as const` is the only `as` occurrence, a permitted const assertion), no `!`, no suppression comment, no mock, no nested function declaration beyond a callback passed directly (all `.map`/`.filter` callbacks in `al-2.diff` are inline arrow callbacks passed as arguments) — confirmed by reading `al-2.diff` in full.
- `_alert.scss` (`al-2.diff:1-75`) declares only token/mixin/`var()`-driven values; the one literal (`font-weight: 700`) is documented as an accepted departure, not a hand-repeated block.
- A grep for the banned-term table (`should`, `simply`, `easy`, `currently`, `utilize`, `leverage`, `and/or`, `please`, `sanity check`, `dummy`, `blacklist`, `whitelist`, `master`, `slave`) across `/home/user/veneer-al` returned hits only in pre-existing, untouched policy-config and policy-test fixture files (`configs/policy.ts`, `tests/config.test.ts`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `LICENSE`) — none inside the four owned files or any shared-patch hunk, so the delta itself carries no banned term.
- The report (`b-modal-al-report-2.md`) states no bare count outside quoted command/test-runner output (e.g. "28 passed (28)", "13 files changed…") and each such number is a measurement from the run that produced it, not a stated count of a growable set.
- The report records each gate's command and result line (§ Gates) and names the one brief fact it disagrees with (§ Choices and disagreements: the `grep -rln readHit` fact).

## Findings outside the claims

None found within the scope this checker read.

## Counts the report states (listed per instruction, not tallied)

- Diffstat lines: `_alert.scss` 69 lines, `alert.test.ts` 252, `AlertSection.ts` 20, `AlertSection.test.ts` 92; shared patch "13 files changed, 280 insertions(+), 13 deletions(-)".
- Gate result lines: `45 passed (45)`, `9 passed (9)`, `19 passed (19)`, `109 passed | 1 skipped (110)`, `251 passed (251)`, `22 passed (22)`, `28 passed (28)` (control mutation).
- `rename-first.tsc.log.txt` cites three error sites (`tests/setupStyles.test.ts(2367,11)`, `alert.test.ts(101,77)`, `alert.test.ts(206,11)`).

VERDICT: FAIL 7; outside the claims: none
