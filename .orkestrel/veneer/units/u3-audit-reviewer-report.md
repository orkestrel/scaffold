# U3 audit — subjective lane (reviewer, native Opus 5, 2026-09-20, 663 s)

Ruled against the live checkout, `veneer/tmp/audit/u3-diff.patch`, `u3-design-verdict.md`, and the
research sources.

## Per-claim verdicts

| Claim | Verdict | Evidence |
| --- | --- | --- |
| 1 | CONFIRMED | `constants.ts:16-254` frozen `as const` at every level; every leaf equals its joined path; `types.ts:8-16`; `index.ts` two star-exports. |
| 2 | CONFIRMED | `tests/src/core/index.test.ts:27-72`: recorder before the import, deliberate-listener control, derived paths, uniqueness. |
| 3 | REFUTED | `_tokens.scss:185` `--vn-space-1` (2 px) has no calibration reading (`calibration.md:39-52` records 0, 4, 6, 8, 10, 12, 14, 16 px) and no Bootstrap root variable, yet `guides/tokens.md:130` sources the row `elements`. Every other spot-check traces (`calibration.md:60-66`, `:102`, `:156-158`, `:52`; `paint-probe.output.txt:3`). |
| 4 | CONFIRMED | `@layer theme` wrapping; `@property` factors `:84-106`; tiers `_mixins.scss:28-46` at 12/15 % tint, 70 % emphasis, 35/50 % edge; literal triplets; `theme-tokens` included at `_tokens.scss:248`, `_theme.scss:11,16`; names per the verdict; no body transition; deferred names `guides/tokens.md:233-234`; `index.scss:1-4`. |
| 5 | REFUTED | `tests/setupStyles.test.ts:216-246` asserts lengths, uniqueness, prefix, disjointness, version, digest — never a member against `bootstrap.css` or the inventory. Membership hand-checked correct. |
| 6 | CONFIRMED | `tests/src/styles/index.test.ts:42-58`; `tests/setupStyles.test.ts:184-186`. |
| 7 | CONFIRMED | every named file and coverage present; `matchesPaintedColor` for calibration colours; `tokens.test.ts:158-160` pins the whole `box-shadow` string (brittle). |
| 8 | REFUTED | `tests/setupStyles.test.ts:119` and `:135` name "the objective lane edge forms" (pre-existing at `b661142`, inside an owned file). Plants recorded and removed. |
| 9 | CONFIRMED | `tests/setupStyles.ts:213`, `:196-198`, `:229-230`, `:139-147`; proven at `setupStyles.test.ts:188-197`. |
| 10 | CONFIRMED | report `:77-88`; `_tokens.scss:204-218`; `html.test.ts:9`. |
| 11 | CONFIRMED | `guides/tokens.md:32-35`; `tokens.test.ts:162-186`; no island promise survives. |
| 12 | CONFIRMED | `guides/tokens.md:18-152`, `:178-183`, `:191-215`, `:224-235`; `guides/veneer.md:13-16`, `:88-89`, `:81-84`; `guides/README.md:17-22,31`; `README.md:26-28`. |
| 13 | CONFIRMED | no hit under the hosted guides for any new name; helper prefixes per `names.md`. |
| 14 | CONFIRMED | scope exact; only `as const`; no nested declaration; no unexported setup-module helper. |
| 15 | CONFIRMED | D5, D7, D8, D9, D10, D11, D12 recorded where stated; finding 20 names one contradicting row. |
| 16 | UNDECIDABLE | read-only lane; referred to the verifier. |

## Findings outside the claims

17. `_tokens.scss:204-219` shadow tokens use literal `rgba(0, 0, 0, α)`; `styles.md` bans literal
    colour and `--vn-palette-black-rgb` exists for this.
18. `guides/tokens.md:6-7` says the retunes live in `_theme.scss`; the `$dark` map is in
    `_tokens.scss:51-82`.
19. `guides/tokens.md` names no published specifier (`@orkestrel/veneer`,
    `@orkestrel/veneer/styles`).
20. `guides/tokens.md:235` defers the popover and drawer surfaces while `:98,104` ship
    `--vn-surface-raised-base` as that surface.
21. Counts at `guides/tokens.md:10,160,167` and `_theme.scss:18`.
22. `guides/tokens.md:192-212` Departures table carries "recorded as agreement" rows.
23. `guides/tokens.md:186-188` names the dark-island limit and gives no remedy line.
24. `tokens.test.ts:41-57`, `theme.test.ts:19-24`, `integration.test.ts:27-32`: three local DOM
    builders under two names, each with its own cleanup; `tests.md` § Shared test infrastructure
    forbids local fixture factories.
25. `tests/setupStyles.test.ts:119,135` case names carry a lane identifier (claim 8).
26. `guides/tokens.md:146` and `:112` `derived` cells name no expression or reading
    (`--vn-focus-color`, `--vn-link-base`).
27. `_tokens.scss:227` `--vn-focus-width: 3px` is the only absolute length in a `rem` scheme;
    Elements declares `0.1875rem`.
28. `--vn-palette-*` beside `--vn-gray-*`: two prefixes for one ramp (design-level).
29. `palette-each` emits role tiers and touches no palette token (design-level; `role-each`).
30. `normalizeSelectorText` and `collectTokenNames` have no behavioural proof.
31. `integration.test.ts:6-15` claims a byte-for-byte transcription nothing compares.
32. The registry's member-shape rule (a member is a group where the cascade declares more than one
    property) is unwritten.

## Referrals

Compatibility oracle (hand-copied lists guarded by a digest alone; carrier U4b); gates (claim 16);
empty-value alias (`_tokens.scss:43,46` set `''` where Bootstrap declares a space).

Verdict: fix round — 3, 5, 8.
