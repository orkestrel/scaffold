# U3 audit round 1 — verdict

Round of 2026-09-20 on `u3-audit-claims.md` (16 claims) over the Veneer working tree at
`b661142` plus the U3 diff and the Orchestrator's serial integration of the report's D3, D4, and
D6 patches (`units/u3-report.md`). Opus wrote the unit, so the lanes held their defaults: objective
lane `analyst` on Astra through `codex exec --sandbox read-only` rooted at the Veneer checkout
(`units/u3-audit-analyst-report.md`, journal `units/u3-audit-analyst.sh`, thread
`01a0be53-35ec-74a1-be2b-458fe4ea776b`); subjective lane `reviewer` on native Opus 5
(`units/u3-audit-reviewer-report.md`); `checker` on native Sonnet
(`units/u3-audit-checker-report.md`). The `verifier` did not run this round: `test:policy` was red
on the vendored stray-guide rule until the U3-policy unit landed and was re-vendored, so the
authoritative gates belong to round 2. Every lane that ran was blind, on the one claims file.

## Reconciliation

| Claim | Analyst | Reviewer | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1, 2, 6, 9, 10, 11, 13 | CONFIRMED | CONFIRMED | PASS (1, 6, 13) | confirmed |
| 3 | REFUTED (stacking ladder from Bootstrap component declarations; `--vn-link-decoration` missing from the report's retained table) | REFUTED (`--vn-space-1` traces to no reading and is sourced `elements`) | — | refuted, both findings carried; the ladder's source is re-ruled: Bootstrap's `$zindex-*` scale is a retained Bootstrap value with that reason |
| 4 | REFUTED as worded (`-rgb` through `var()` of a literal triplet) | CONFIRMED | — | confirmed; the claim's wording is corrected in round 2 (a literal triplet or a reference to one) |
| 5 | REFUTED (length-only proof; the additions are permitted, never required) | REFUTED (no membership assertion) | PASS on membership by hand | refuted; carried |
| 7 | REFUTED (invalid-factor case cannot prove registration; string colour comparisons in the shadow and forced-colors cases) | CONFIRMED with the same brittleness noted | — | refuted; carried |
| 8 | CONFIRMED | REFUTED (two case names carry a lane identifier) | PASS on residue | refuted on the names; carried |
| 12 | UNDECIDABLE (`test:guides`) | CONFIRMED | PASS | confirmed on content; the gate is round 2's |
| 14 | REFUTED (local test helpers) | CONFIRMED | PASS on scope and syntax | refuted on the helpers (the reviewer's finding 24 names the same defect); carried |
| 15 | REFUTED (D9, D10 do not exempt the consolidation rule) | CONFIRMED | — | refuted with 14; carried |
| 16 | UNDECIDABLE | UNDECIDABLE | — | round 2's verifier |

## Rulings

- **Literal colours in the value authority (analyst 21).** `styles.md` bans literal colours in
  treatments so that every colour flows from a token; `_tokens.scss` is where those tokens are
  declared and is the one file a literal colour may appear in. The rule file gains that clause
  in the scaffold checkout in the same vendored release that carries the stray-guide fix. Within
  Veneer, every colour outside the value maps flows through a token, which is why the shadow
  tokens (reviewer 17) move to `rgba(var(--vn-palette-black-rgb), α)`.
- **The stacking ladder (analyst 3).** Bootstrap declares its z-index scale as Sass variables on
  component rules, never at root scope, so the inventory's `root` and `dark` buckets cannot carry
  it. The value-source law's second arm is read as "Bootstrap's own value recorded as retained
  with its reason", which the `$zindex-*` scale satisfies; the guide names the Sass variable each
  rung retains.
- **`--vn-space-1` (reviewer 3).** Not measured and not Bootstrap's; declared as `derived` from
  the scale expression `calc(0.125rem * N * factor)` whose other rungs the paddings measure.
- **`--vn-gray-*` beside `--vn-palette-*` (reviewer 28).** Kept: the gray ramp aliases Bootstrap's
  `--bs-gray-*` names one to one, and the hue ramp aliases `--bs-blue` and its siblings; the two
  prefixes mirror the two Bootstrap families. Dropped on the record.
- **`palette-each` (reviewer 29).** Renamed `role-each`; it emits role tiers.
- **`--vn-focus-width` (reviewer 27).** Authored `0.1875rem`, which is the calibration's 3 px at
  the default base size and Elements' own declaration.

## Findings carried into the fix brief (`units/u3-brief-2.md`)

| Finding | Source | Carrier |
| --- | --- | --- |
| `--vn-space-1` source; stacking ladder source; `--vn-link-decoration` reason; `derived` cells name their expression or reading | reviewer 3, 26; analyst 3 | brief-2 § 1 |
| shadow tokens through the black triplet | reviewer 17 | brief-2 § 2 |
| `--vn-focus-width` in `rem` | reviewer 27 | brief-2 § 2 |
| guide: specifiers, value homes, member-shape rule, alpha example, recipe with the `-rgb` triplet and the dark-island line, departures table, deferred row, counts | reviewer 18, 19, 20, 21, 22, 23, 32; analyst 17, 18; checker H | brief-2 § 3 |
| alias membership proof against the installed Bootstrap stylesheet; the dark partition requires the additions | analyst 5; reviewer 5 and referral | brief-2 § 4 |
| invalid-factor registration proof; parsed-colour comparison in the shadow and forced-colors cases | analyst 7; reviewer 7 | brief-2 § 5 |
| local test helpers and DOM builders into the setup modules; behavioural proofs for `normalizeSelectorText` and the registry walk | analyst 14, 15; reviewer 24, 30 | brief-2 § 6 |
| scanner gaps (`scroll-margin-*`, `scroll-padding-*`, `text-align-last`); tag-pair combinator | analyst 19, 20 | brief-2 § 7 |
| case names; mixin rename | reviewer 8, 25, 29 | brief-2 § 8 |
| byte-for-byte transcription claim | reviewer 31 | brief-2 § 9 |

## Dropped, on the record

Reviewer 28 (see § Rulings). The analyst's "empty-value alias" referral is answered by the built
artifact the checker counted (127 root aliases present) and by the partition proof.

Ruling (round 1): fix round.
