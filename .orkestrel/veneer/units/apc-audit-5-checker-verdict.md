LANE: apc-5-checker

## Claim verdicts

**1. Scope.** CONFIRMED.
- `apc-5-status.txt` is byte-identical to `apc-4-status.txt` (both list the same 14 files: `guides/veneer.md`, `src/styles/_tokens.scss`, `src/styles/components/_button.scss`, `src/styles/utilities/_color.scss`, `src/styles/utilities/_link.scss`, `tests/setup.ts`, `tests/setupStyles.test.ts`, `tests/setupStyles.ts`, `tests/src/styles/components/button.test.ts`, `tests/src/styles/components/validation.test.ts`, `tests/src/styles/elements/a.test.ts`, `tests/src/styles/theme.test.ts`, `tests/src/styles/utilities/color-bg.test.ts`, `tests/src/styles/utilities/color.test.ts`, `tests/src/styles/utilities/link.test.ts`).
- `apc-5.diff` vs `apc-4.diff`: the only substantive differences are (a) the M2 emphasis assertion and comment at `apc-5.diff:246-251` (absent from `apc-4.diff:216-222` at the same test), (b) the M1 emphasis-twin block at `apc-5.diff:290-296` (absent from `apc-4.diff:271-280`), (c) the neutral-role title narrowed at `apc-5.diff:86` vs `apc-4.diff:86-87`, and (d) the two pair-case retitles at `apc-5.diff:388,397` (unchanged in `apc-4.diff:387,396`). No other hunk differs.
- `apc-instruments-5/apc-5-status-check.txt` reads: "files outside color.test.ts equal to round 3 ... True files: 14" and "control, color.test.ts equal to round 3 (expected False): False" — the control fails as required.

**2. M1 and M2.** CONFIRMED.
- M1 (`apc-5-mutation-emphasis-resting-body-before.log.txt`): `VERDICT: SURVIVED`, restore byte-identical = True. After (`apc-5-mutation-emphasis-resting-body.log.txt`): fails at `color.test.ts:286` (`expected false to be true`) in light and dark, `VERDICT: RED`, restore byte-identical = True. The mutation and assertion both concern the emphasis class mixed with resting body vs. live body-text token, matching the M1 title's element/condition.
- M2 (`apc-5-mutation-emphasis-reads-channel-before.log.txt`): `VERDICT: SURVIVED`, restore byte-identical = True. After (`apc-5-mutation-emphasis-reads-channel.log.txt`): fails at `color.test.ts:241` (`expected 'rgb(20, 80, 140)' to be ...`) in light and dark, `VERDICT: RED`, restore byte-identical = True. Matches the M2 title's channel-retune condition.

**3. The seam invariant.** CONFIRMED.
- Read every case in `tests/src/styles/utilities/color.test.ts:32-411`: each title's named elements and conditions match what its assertions read (verified against `TEXT_TIER_CASES` = `primary, secondary, success, info, warning, danger` and `TEXT_NEUTRAL_ROLES` = `light, dark` in `tests/setupStyles.ts:2817-2830`, confirming "outside the neutral roles" is exact). The two pair cases (`color.test.ts:377`, `color.test.ts:390`) name the pair and exempt only the `.probe` control (line 379-384), consistent with the claim's control exemption.
- The narrowed neutral title (`color.test.ts:79`) removes "rather than their emphasis tiers" from the round-4 title. `src/styles/_tokens.scss:106` sets `'light-emphasis': 'var(--vn-gray-100)'` and `src/styles/_tokens.scss:360` sets `--vn-color-light-base: var(--vn-gray-100)`, so the light role's own channel and its emphasis tier both resolve from `--vn-gray-100`, making the removed clause false for `.text-light` in dark mode, as the report and claim state.

**4. M3.** CONFIRMED.
- `apc-mutate-5.py:31-35` (`PROOFS`): `'density and channel'` and `'fill and body'` regexes match substrings of the current titles at `color.test.ts:217` and `color.test.ts:246`. The third entry, `'stale emphasis opacity'`, deliberately does not match any current title (by design, as the negative control).
- `apc-5-mutation-selection-control-before.log.txt`: `proof "stale emphasis opacity": executed 0, failed 0`, `VERDICT: EMPTY SELECTION`, and the runner's own logic (`apc-mutate-5.py:87-88`) exits 2 on that verdict — nonzero, as claimed.

## Findings outside the claims

None found on the sites read.

## Counts the report states

- Scoped color proof: 23 passed, 1 file.
- `npm run test:src:styles`: 1456 passed, 115 files.

VERDICT: PASS
