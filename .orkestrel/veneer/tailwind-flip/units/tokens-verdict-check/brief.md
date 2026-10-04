# tokens-verdict-check (analyst, read-only): the token design verdict's objective check

Route: `analyst`. Engine: GPT-6 Astra through `codex exec --sandbox read-only` in `/home/user/veneer`. Round: `tokens/design-verdict.md` § 8, "an Astra objective check reads this verdict against `measurements/*.md`, `rulings.md`, and T0's report before T1 launches". You verify; you decide nothing and recommend no design.

## Launch state

Brief written at veneer `ca2c90e` on `ccr-d15a48b1-yyyll6` (the tree carries fix unit A's uncommitted edits in `tests/**`, `src/bootstrap/_mixins.scss`, `src/tailwindcss/_tokens.scss`, `guides/veneer.md`, and `ROADMAP.md`; read them as they stand). Scaffold `main` at `fad79830`. The T0 probe's outputs sit under `/home/user/veneer/tmp/probes/tokens2/` (`report.md`, `out/m1.json` to `out/m9.json`, `map.json`, `reads.json`).

## Lens

Objective correctness: does each claim hold as stated, measured against the probe's JSON, the installed packages, and the source? Recount every number from the artifacts, never from a report's prose. Read `out/m6.json` (14 MB) through a Node one-liner over its top-level keys and counts, never whole. The sandbox is read-only: Node reads, `grep`, `sha256sum`, and `sass --no-source-map` to stdout are allowed; write nothing, not even under `tmp/`.

## Sources

**V** = `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/tokens/design-verdict.md`. **R** = `.../tokens/rulings.md`. **C** = `.../tokens/design/critic.md`. **JC** = `.../tokens/design/judge-consumer.md`. **JM** = `.../tokens/design/judge-mechanism.md`. **MM** = `.../tokens/measurements/mechanism.md`. **MC** = `.../tokens/measurements/contrast.md`. **P** = `/home/user/veneer/tmp/probes/tokens2/`. **TW** = `/home/user/veneer/node_modules/tailwindcss/theme.css`. **BS** = `/home/user/veneer/src/bootstrap/`.

## Claims

### M1 and the map (V § 3, § 3.1, § 10 row M1)

1. `P/out/m1.json` holds 223 rows; 37 are below the lesser of Bootstrap's ratio and 4.5; of those, 34 carry `group: "separation"`, 1 carries `group: "judge"` (`tertiary-color-dark`, Bootstrap 4.067, tuned 3.940, split 4.492), and 2 carry `group: "prior"` (`focus-ring-dark@blue` 1.295 to 1.233; `btn-outline-light@gray` 1.054 to 1.045); `nodeChromiumDisagreements` is empty.
2. Under a distinctness floor of 1.05, 33 of the 34 separation rows pass on their `tuned` value and the one miss is `light-bg-subtle-page-light` (tuned 1.019, Bootstrap 1.025); every passing separation row reads 1.07 or more; the largest drop from Bootstrap's ratio among the 34 is 0.62 or less (compute max(baseline − tuned)).
3. `splitBelow` holds 36 rows, equal to `below` minus `tertiary-color-dark`, so the context split moves no other pairing under its floor.
4. `controls.secondaryFill` reads Bootstrap 1.163, synthesis 1.000, ruled 1.1345 (gray-900 `#101828` on gray-950 `#030712`); recompute the ruled ratio from the two hexes with the WCAG formula and state the figure to 3 decimals.
5. Every text pairing (rows with `group` other than `separation`) other than the 2 prior rows and `tertiary-color-dark` reads `tuned` at or over its `floor`; list any that does not.

### M2 to M4 (V § 2, § 3.1, § 4, § 10)

6. `P/out/m2.json` records three recipe forms with equal flattened declaration sequences, 409 emitted static theme variables, a consumer radius reading of 12px against 6px, and the primary button at `rgb(21, 93, 252)` under the consumer theme; the `prefix(tw)` form resolves every scale reference to Tailwind's default literal.
7. `BS/components/_floating-labels.scss` line 68 (or the nearest line) carries an unqualified `scale(0.85)` inside a `transform` value, and no file under `BS` or `/home/user/veneer/src/tailwindcss/` calls an unqualified `measure(` or `swatch(` function, so the names V § 3.1 and § 4 adopt collide with no CSS function Bootstrap writes; also state whether CSS defines a `measure()` or `swatch()` function (it does not, to your knowledge; say so as a knowledge claim, not a measurement).
8. `P/out/m4.json` records both empty-map digests `ef7b5845a7dd3de2a1d8f94a5486a2cbf10175dd3136839292324d534fc1a109` and `4142d6d4bf5f4c02d74c80f90e9c55bfc3f6daa560d17d8d2983bb821465fc88`, 571 sites and 571 tracer hits, 0 missing keys, and a refused missing-key control; the 571 equals MM's count (616 occurrences of the probe minus 69 `transparent` plus 24 uppercase `RGBA(`; recompute from MM's own figures and say whether the arithmetic closes).

### M5 to M9 (V § 10)

9. `P/out/m5.json` records 54 readings over 18 widths, 0 of 50 fractional readings unmatched at 125 % and 150 %, `.modal-xl` at 1140px and the tuned `.container` at 1280px at the 1280 width, and 5661 departing (name, width, longhand) rows over the 17 shared names at the 19 `RELATION_WIDTHS`; `RELATION_WIDTHS` in `/home/user/veneer/tests/setup.ts` (or where it is declared) holds 19 entries.
10. `P/out/m6.json` records 1666 signatures at 1280 and at 390, 5346 scale-bearing Bootstrap-winner longhands, 0 colliding value groups, 0 unexplained mappings, and focused durations of 33.2 and 34.8 s; the flip's `design-verdict.md` § 12 records 1665 at veneer `600f8a1`, and the header commit `ca2c90e` is the only showcase change since (read `git log --oneline 600f8a1..ca2c90e -- app/browser` in `/home/user/veneer`).
11. `P/out/m7.json` records 6 pairs with a per-channel difference of `[0, 0, 0]` under `--force-color-profile=srgb`.
12. `P/out/m8.json` records 105 amount rows, 97 joined, a maximum difference of 1 channel unit, 0 over 1, and 8 unjoined rows all carrying the property `-webkit-text-decoration-color` on `.link-*:hover, .link-*:focus` selectors; `/home/user/veneer/dist/src/bootstrap/index.css` declares `text-decoration-color` beside `-webkit-text-decoration-color` for each of those 8 selectors (so a join through the unprefixed property is possible), or it does not (say which).
13. `P/out/m9.json` records 288 palette rows and 10 disagreements, among them `--color-blue-950` (`#162456` to `#162556`) and `--color-green-100` (`#dcfce7` to `#dbfce7`); V § 3's map table carries `#162556` in the `--bs-primary-bg-subtle` row and `#dbfce7` in the success roles row and carries neither `#162456` nor `#dcfce7` anywhere; `.../tokens/tailwind-theme.json` still carries the two old hexes.
14. Every Tailwind token V § 3 names (`blue-600`, `indigo-600`, `purple-800`, `pink-600`, `pink-300`, `red-600`, `red-300`, `orange-400`, `yellow-500`, `green-700`, `green-300`, `teal-400`, `cyan-500`, every gray step named, `blue-800`, `blue-300`, `blue-100`, `blue-950`, `blue-200`, the 100/200/800/300/950 steps of green, cyan, yellow, and red, `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-2xl`, `--radius-4xl`, `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--inset-shadow-xs`, `--font-sans`, `--font-mono`, `--breakpoint-sm` to `--breakpoint-2xl`) exists as a variable in TW; list any that does not.
15. Every resolved hex V § 3 gives for a bare palette step (not a mix) equals the Chromium `hex` in `P/out/m9.json` for that step; list every cell that differs.
16. V § 2, § 4, and § 5 name the scale function `measure` wherever they name it and never `scale(` as a Sass function (grep V for "`scale(`" and "`scale`" and classify each hit).
17. Each of R's six default rulings appears in V (§ 2 or § 9) with the same decision; list any that is missing or altered.

## Evidence

For each claim: holds or refuted, the command or file and line you read, the number you recomputed. A claim you cannot measure in the sandbox is `unmeasured` with the reason, never `holds`.

## Return shape

1. A table over claims 1 to 17: claim, verdict (holds, refuted, unmeasured), evidence.
2. Every sentence of V that a refuted claim contradicts, quoted, with the corrected figure.
3. Anything V states as measured that no probe output supports (an unsupported number is a finding).
4. Nothing else: no design opinion, no recommendation beyond the corrected figure.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when a file V names does not exist, when a JSON output lacks the key a claim names, or when the sandbox refuses a read. Write nothing.

## Command (the Orchestrator launches; cap 3600 s)

```text
node .agents/skills/orkestrel-dispatch/scripts/launch.ts --journal tmp/codex/tokens-verdict-check.jsonl --errors tmp/codex/tokens-verdict-check.err --cap 3600 --status -- codex exec --json --skip-git-repo-check -C /home/user/veneer --sandbox read-only --model gpt-6-astra -c model_reasoning_effort="high" --output-last-message /home/user/scaffold/tmp/codex/tokens-verdict-check-last.md "Read /home/user/scaffold/tmp/codex/tokens-verdict-check-brief.md completely, then every source it names, then verify the 17 claims exactly as written and return the report in the brief's return shape. Write nothing."
```
