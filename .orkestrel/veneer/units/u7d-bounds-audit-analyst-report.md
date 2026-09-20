<!-- Retained from u7d-bounds-audit-analyst-last.md. Objective lane (Opus wrote the unit): analyst on Astra, codex exec read-only -C scaffold, journal u7d-bounds-audit-analyst.jsonl, thread 01a0c123-4c01-77b2-b015-aa3f57d98ea5, exit 0, 2026-09-20. -->

No implementation finding forces another round under the supplied claims. Claim 1 contains wording overstatements. Claim 11 remains undecidable pending the verifier.

This is a source-and-record audit. I read the supplied diff and status, live files, installed declarations and implementation, and retained logs. I ran no writing command and did not rerun gates. Unless stated otherwise, paths below are relative to the Veneer checkout.

The claim rulings follow.

| Claim | Ruling | Deciding evidence |
|---|---|---|
| 1 | **REFUTED — wording bound** | The universal description of conversion “through the CSS Color 4 matrices” at `tests/setupBrowser.ts:205` is too broad. The installed reader sends legacy RGB directly to `convertSRGB` at `node_modules/@orkestrel/test/dist/src/browser/index.js:1689`; that function scales and clips without a matrix at `:1416`. The modern-space support, recorded agreement, byte channels, placement, and unchanged wrapper bodies are supported. See the paint assessment below. |
| 2 | **CONFIRMED** | `tests/setupBrowser.test.ts:137` asserts each comparator returns `true`. The case at `:175` retains the painted-channel assertions and adds reader agreement. The case at `:197` checks an sRGB boundary channel, integer painted channels, and reader agreement for `oklch(0.6 0.3 150)`. The titles describe those properties. |
| 3 | **CONFIRMED** | `tmp/u7d-bounds/probe.log.txt:7` records `[255,0,0,1]` for each out-of-gamut reading and `[99,99,99,1]` against `[99.08607905681528,99.08607905681527,99.08607905681527,1]` for neutral OKLab. That log still lists the original case titles, supporting the pre-edit sequence. `probe2.log.txt:7` records further agreement within tolerance. The brief’s agreement branch applies; live styles consumers still import the wrappers. |
| 4 | **CONFIRMED** | `tests/setupConformance.ts:537` requires a nonempty population for each CSS category and `owned.every(row => row.status === 'shipped')`. Its documentation states that rule at `:529`. The split-category case at `tests/setupConformance.test.ts:492` exercises selector and variable categories. `red-split.log.txt:11` reports `expected [ 'btn' ] to deeply equal []`; `green-split.log.txt:9` passes. `control-every.log.txt:10` independently records the reversal failing that case. |
| 5 | **CONFIRMED** | `tests/setupConformance.test.ts:638` changes directory, hashes the returned stylesheet, compares against `BOOTSTRAP_CSS_DIGEST`, and restores the directory in `finally`. The required pool comment is present. `control-digest.log.txt:14` records the RTL digest as expected and the LTR digest as received. The comment’s explanation needs correction, recorded below. |
| 6 | **CONFIRMED as written** | `tests/setupStyles.test.ts:744` uses the manifest reader; `:745` uses `readBootstrapCascade`; `:749` compares the workspace-rooted path’s digest. The imported setup graph contains no browser entry. `red-pinned.log.txt:11` records the working-directory-relative manifest’s `ENOENT`; `green-pinned-cwd.log.txt:9` records the planted case passing. This does **not** close the original hoisted-install finding; see the carried-bound assessment. |
| 7 | **CONFIRMED** | `tests/setupConformance.ts:495` takes the table position, selects the first nonempty value from name/owner/reason, and produces the specified label. Cases at `tests/setupConformance.test.ts:449`, `:456`, and `:461` cover the named, missing-name, and empty-row forms. `red-deferral.log.txt:11` records the old label failing; `green-deferral.log.txt:9` records green. |
| 8 | **CONFIRMED** | The reach assertion at `tests/setupConformance.test.ts:170` compares component, category, and obligation text. The unreachable named event binding is absent from `tests/setupConformance.ts:92`. Cases at `tests/setupConformance.test.ts:233` assert the exact refusal strings; `:264` directly checks empty, present, absent, and combined event requirements. Selection at `tests/setupConformance.ts:747` explains why another undefined fallback would remain unreachable. |
| 9 | **CONFIRMED** | The supplied status lists only the named setup files. The supplied patch agrees and leaves `tests/setupStyles.ts` and the excluded populations untouched. The additions contain no prohibited assertion, suppression, skip, expected-failure declaration, or nested function form. No module-scope function is added. |
| 10 | **CONFIRMED within its stated scope** | Every removed title has a rewritten successor in the patch. The channel assertions and event-requirement assertions described by the report survive. The exact-binding-precedence assertion does not survive; the report explicitly acknowledges that omission at `.orkestrel/veneer/units/u7d-bounds-report.md:295` in scaffold. That coverage bound is recorded below. |
| 11 | **UNDECIDABLE** | The retained `final-*.log.txt` files support the report’s scoped passing summaries. They do not establish the independent host chain or its `npm test` result. No completed u7d-bounds verifier report was available in the supplied record. This claim expressly assigns the deciding reading to that lane. |

The paint doc blocks support these narrower conclusions:

- **Description, parameters, return scales, and refusal paths:** `tests/setupBrowser.ts:226` checks CSSOM acceptance, handles a missing canvas context, reads a pixel, and divides alpha by 255. The fully substituted input prerequisite matters.
- **Rasterization and byte representation:** the canvas path at `:232` differs from the installed parser’s mathematical conversion. The body supports integer channels and byte-derived alpha.
- **Tolerance:** the installed comparator at `index.js:1776` uses `0.5` for RGB and scales alpha by 255. That establishes its comparison threshold; it does not establish universal agreement between canvas output and parsed colours.
- **Dated agreement:** `probe.log.txt:7` supports every colour named in the measurement sentence. The general clipping sentence at `setupBrowser.ts:220` must remain bounded to the measured engine and inputs.
- **Calibration rationale:** the wrapper samples rasterization; the installed string comparator resolves through `parseCSSColor`. The evidence does not establish that every recording originated from the installed converter’s matrices.
- **`var()` and placement:** the substitution prerequisite is appropriate because the canvas path reads no cascade. `@orkestrel/test/browser` imports `vitest/browser`; `node_modules/vitest/browser/context.js:14` throws outside Browser Mode. The Node setup graph therefore supports the placement remark.
- **Comparator documentation:** `setupBrowser.ts:268` compares the painted tuples with the installed comparator and returns `false` on an absent reading. Its body is unchanged.

Against the original text in scaffold’s `units/lane-u7d-reviewer.md`, the carried findings resolve as follows:

- **15, 16, 19, and 20:** closed by the all-rows shipment check, independent digest expectation, identifiable refusal labels, and binding-to-ledger assertion.
- **17:** working-directory independence is repaired; hoisted-install independence remains open because the added assertion still reads `<workspace>/node_modules/bootstrap`.
- **18:** remains assigned to U7a. The live CSS rows remain accepted and the deferral table remains empty.
- **21, 22, and 23:** remain unchanged and assigned to U7e.
- **24:** the pool dependence is named, but its stated thread-pool failure mechanism is wrong.

The additional findings are bounds, not round-forcers under this dispatch.

12. **Paint wording exceeds the evidence.** Sites: `tests/setupBrowser.ts:205`, `:215`, `:220`, and `:259`. Failure scenario: a reader treats matrix conversion, half-step agreement, or clipping as universal guarantees although the implementation and measurements establish narrower properties.

13. **The pool comment describes the wrong failure.** Site: `tests/setupConformance.test.ts:642`. Installed `node_modules/@types/node/process.d.ts:919` states that `chdir` is unavailable in worker threads. Failure scenario: changing the pool to threads rejects `process.chdir()` rather than making neighbouring files read the scratch directory.

14. **The hoisted-install bound survives.** Sites: `tests/setupStyles.test.ts:749` and `tests/setupStyles.ts:287`. Failure scenario: Bootstrap resolves from a parent installation, but the workspace-local digest read fails `ENOENT`. Claim 6 explicitly requires this local-path assertion, so its literal implementation is confirmed while the broader carried finding remains open.

15. **The added comment names a browser consumer that is absent.** Site: `tests/setupStyles.test.ts:746`. `configs/src/vite.styles.config.ts:48` loads Veneer’s built cascade, not `BOOTSTRAP_CASCADE_PATH`. Failure scenario: a maintainer retains the local Bootstrap path to support the browser loading described by the comment, although that loading does not occur.

16. **Exact-over-fallback precedence loses its regression assertion.** Sites: `tests/setupConformance.ts:747` and `tests/setupConformance.test.ts:264`. Failure scenario: a later table contains a named binding beside a fallback, and an array-order selection regression goes undetected. No live group has that shape, so this remains a future-consumer bound.

17. **The report overstates exact agreement.** Site: scaffold’s `.orkestrel/veneer/units/u7d-bounds-report.md:39`. It says the out-of-gamut pairs agree exactly, but `probe2.log.txt:7` records `[0,170,0,1]` against `[0,169.67489254695974,0,1]`. Failure scenario: a successor replaces tolerance-based agreement with exact equality based on that sentence.

Verdict: accept