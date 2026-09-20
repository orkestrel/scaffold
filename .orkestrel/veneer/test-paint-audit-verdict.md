# Test-paint — audit verdict, 2026-09-20

Subject: the Test-paint unit in the Test checkout, written by `sol` on Astra under
`units/test-paint-brief-2.md` (carrying `units/test-paint-brief.md` except item 3's ring
reading), report `units/test-paint-report-2.md` (thread `01a0c0e0-703a-7813-af36-724868193281`,
exit 0). Claims: `test-paint-audit-claims.md`. Evidence rendered for the read-only lanes:
`units/test-paint-diff.patch.txt` (`git diff ed9b102 -- . ':(exclude)tmp'`) and
`units/test-paint-status.txt`.

## Lanes

Astra wrote the unit, so the lanes are swapped: Opus holds the objective lane and Astra the
subjective lane. All four ran, blind to each other, on one claims file.

| Lane | Role | Engine | Record | Terminal line |
| --- | --- | --- | --- | --- |
| objective | `reviewer` | native Opus 5, Workflow `wf_3e416c9c-1ef` | `units/lane-test-paint-reviewer.md` | accept |
| subjective | `analyst` | Astra, `codex exec` read-only, thread `01a0c0f1-a9b2-70f3-a532-4ab832ee9839`, exit 0 | `units/test-paint-audit-analyst.sh`, `units/test-paint-audit-analyst-report.md` | accept |
| mechanical | `checker` | native Sonnet, the same Workflow | `units/test-paint-audit-checker-brief.md`, `units/lane-test-paint-checker.md` | accept |
| gates | `verifier` | native Sonnet, the same Workflow | `units/test-paint-gate-brief.md`, `units/lane-test-paint-verifier.md` | every step exit 0 |

## Claims

| Claim | Reviewer | Analyst | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 parser reach | CONFIRMED, with six adversarial inputs traced to `undefined` | CONFIRMED | — | CONFIRMED |
| 2 conversions exported and cased | CONFIRMED, non-vacuity checked per block | CONFIRMED | CONFIRMED | CONFIRMED |
| 3 CSS Color 4 matrices and clipping | CONFIRMED, every matrix re-derived, row sums checked | CONFIRMED | — | CONFIRMED |
| 4 refusal propagates | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 5 zero-alpha skip and opaque stop | CONFIRMED with a gap (`/ none` unproven) | CONFIRMED (same gap noted) | — | CONFIRMED; the gap is bound 17 |
| 6 calibrated contrast | CONFIRMED, first pair hand-checked at 17.85 | CONFIRMED | — | CONFIRMED |
| 7 ring ratio | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 8 out-of-gamut tint | CONFIRMED, re-derived | CONFIRMED | — | CONFIRMED |
| 9 doc blocks and guide rows | CONFIRMED (textual) | CONFIRMED | CONFIRMED (twelve pairs identical) | CONFIRMED; `test:guides` exit 0 in the verifier's step 7 |
| 10 scope honesty | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 11 letter of the law | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 12 red-then-green and gates | UNDECIDABLE (logs off-limits) | UNDECIDABLE (host verifier owed) | — | CONFIRMED from the verifier: steps 2 to 9 exit 0 on managed Chromium and Edge, `npm test` exit 0, `scaffold audit` 0 of 45 paths drifted |

## Bounds carried

No finding forces a round. Each is carried to the next Test unit that edits
`src/browser/helpers.ts` or `guides/test.md` (the release visit for Test 0.0.19 names that unit):

- 13 (reviewer) `readRing` drops an unreadable outline or box-shadow colour silently and returns
  `undefined`, while `readLayers` refuses one; the brief scoped the refusal to painted background
  layers. Carry: the ring reader refuses an unreadable chrome colour the same way.
- 14 (reviewer) the box-shadow colour match `/(?:rgba?|color|oklab|oklch|lab|lch)\([^)]*\)/u`
  cannot span nested parentheses, so `color(srgb calc(infinity) 0 0)` in a shadow truncates and
  falls into bound 13. Carry with 13.
- 15 (reviewer) `convertSRGB` propagates `NaN` through the direct exports (`parseColor` refuses
  non-finite input before reaching it). Carry: refuse or clip `NaN` in `convertSRGB`, with a case.
- 16 (reviewer) the ProPhoto case `convertProPhotoRGB(-0.01, 0.02, 1.2)` clips every channel and
  cannot discriminate a matrix error; the in-gamut case beside it carries the check. Carry: a
  second unclipped case.
- 17 (reviewer, analyst) the `/ none` zero-alpha spelling is accepted but unproven. Carry: a case.
- 13 (analyst) `guides/test.md` § Voices claims to list every browser exception message and omits
  `Computed background color is unreadable on <element>: <value>`. Carry: the row.
- 18, 19, 20 (reviewer) wording: one typographic apostrophe at `guides/test.md:532`; the Rec. 2020
  decoder is attributed to Chromium while the code is CSS Color 4's `lin_2020` verbatim (the
  attribution names the control that decided, not the source of the coefficients — restate); the
  ten `convert*` imports sit unsorted in the test's import list.
- 13 (checker) the checker brief named `@orkestrel/contract/dist/src/index.d.ts`; the installed
  entry is `dist/src/core/index.d.ts`. The Orchestrator's error; the checker read the real entry.

## Rulings

- `convert*` is a helper prefix with one project-wide meaning (converts a colour from the named
  space to encoded sRGB). `.claude/rules/names.md` § helper prefixes lists no `convert` row; the
  brief's phrase "per the helper-prefix table" was the Orchestrator's error. The prefix is
  admissible under the rule's form (`{verb}{Noun}`, one meaning); no rule edit is made for it
  (scaffold's rules are not amended to fit a package idea). Recorded for a scaffold rule pass the
  user directs.
- Claim 12's two UNDECIDABLE readings are evidence limits by design (the logs sit under the Test
  `tmp/` the read-only lanes were told not to open); the verifier's table closes the claim.

## Terminal

Verdict: accept. Land in Test by pathspec (`guides/test.md`, `src/browser/helpers.ts`,
`tests/src/browser/helpers.test.ts`), push, build, pack; vendor the tarball into Veneer between
U7d's exit and U7a's launch. Test 0.0.18 stays the manifest version; the release is the user's.
