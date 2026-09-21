# U7c audit round 3 claims (the second fix round)

Subject: the second fix round of unit U7c in the Veneer checkout
(`C:/Users/mikes/WebstormProjects/veneer`), written by `opus` on native Opus 5 under
`units/u7c-brief-3.md` (retained under `.orkestrel/veneer/units/`; carrying briefs 2 and 1
and the dispatch message), report `units/u7c-report-3.md` with `units/u7c-report-2.md` and
`units/u7c-report.md`, over the U7b landing `0cbb563`. Evidence rendered by the Orchestrator:
`units/u7c-diff-3.patch.txt` (`git diff 0cbb563` plus `--no-index` renderings of the untracked
files) beside round 2's `units/u7c-diff-2.patch.txt` over the same base, and
`tmp/audit/u7c-status-3.txt`. Rule on the diff and the live files, never on the reports' word
alone. Scope: implementation only, by the user's ruling. Opus wrote the unit and both fixes, so
the Astra analyst holds the objective lane and the Opus reviewer the subjective lane. Claims
marked `[mechanical]` are the checker's; every other lane rules on every claim. An extra finding
is an implementation defect this round introduced or left open, with a site and a one-line
failure scenario, numbered from 6.

1. Finding 1 closed: the calibrated focus-ring ratios are one exported frozen table in
   `tests/setup.ts` keyed by mode, its shape proven in `tests/setup.test.ts`, and each sweep in
   `tests/app/browser/integration.test.ts` asserts its shared ring value against its mode's
   entry with a fixed tolerance, so a uniform regression of the ring token reddens; the
   equality across specimens and the traversal assertions stay.
2. Finding 2 closed: a teardown failure in the journey's `afterEach` sets a module-scope marker,
   and `beforeEach` refuses to mount while the marker is set, throwing an error that names the
   earlier failure, so no later case runs under stale media emulation or a leftover mount.
3. Finding 3 closed: every case in `tests/setupBrowser.test.ts` that mounts and releases runs
   its mount cleanup in an unconditional `finally`, so a rejected release leaves nothing mounted
   for the next case.
4. Finding 4 closed: `tests/app/browser/Showcase.test.ts` imports `BUTTON_SELECTOR`, derives
   `owned` with `!element.matches(BUTTON_SELECTOR)`, asserts `owned` non-empty, and closes its
   release proof on the reclaimed-host name list rather than a length that holds by construction.
5. `[mechanical]` Scope and law: `units/u7c-diff-3.patch.txt` differs from
   `units/u7c-diff-2.patch.txt` only in `tests/setup.ts`, `tests/setup.test.ts`,
   `tests/setupBrowser.test.ts`, `tests/app/browser/integration.test.ts`, and
   `tests/app/browser/Showcase.test.ts` (plus an enumerating assertion the round records, if
   any); the status shows brief 1's owned set alone; in the diff no `any`, no assertion outside
   `as const`, no non-null assertion, no suppression comment, no `public`/`private`/`protected`,
   no parameter property, no skipped case other than `it.runIf`, no case named for a control, no
   probe residue; the round-2 confirmations (the section, the table, the projection, the moved
   matrices and driver, the consumer case, the sub-barrel's absence, the renamed helpers) are
   not disturbed. The gates report 3 records exit 0 on managed Chromium and Edge; the verifier
   lane re-runs the chain on the host and its reading rules the gate half of this claim.
