<!-- Retained from u7a-audit-analyst-last.md. Subjective lane (lane swap: Astra wrote the unit): analyst on Astra, codex exec read-only -C scaffold, journal u7a-audit-analyst.jsonl, thread 01a0c164-90a2-73c2-9aad-bd1075e1d83b, exit 0, 2026-09-20. -->

Claim 9 requires a fix round for missing outline-state proofs. This is a read-only review of source and retained evidence; I ran no gates.

Paths below are relative to `C:/Users/mikes/WebstormProjects/veneer`, unless marked `scaffold`.

1. **CONFIRMED.** `src/styles/elements/_button.scss:3` uses the elements layer and single-tag selectors. Its base declarations, state mixes, focus-ring call, disabled treatment, and transition call match the claim. The mounted readings are asserted in `tests/src/styles/elements/button.test.ts:24`.

2. **CONFIRMED**, within the authorized close-family partition. `src/styles/components/_button.scss:5` supplies the compatible bindings; `:129` generates filled and outline variants from the shared roles. Label states, disabled hosts, sizes, link treatment, and token-based forced-colors fallbacks are present. No partial declares a literal color.

3. **CONFIRMED.** The deferrals at `guides/veneer.md:140` match the excluded inventory families, retain the size-group selectors as shipped, and exclude `--bs-btn-close-filter`. `tests/conformance.test.ts:55` lists `btn`. The actual `tmp/u7a/conformance-final-6.log` records a passing run of the partition reader at `tests/setupConformance.ts:564`. The live cascade digest matches report 6.

4. **CONFIRMED.** `src/core/constants.ts:226` declares the frozen state and button groups. Root declarations are at `src/styles/_tokens.scss:264`; explicit mode closures are at `src/styles/_theme.scss:12` and `:20`. `src/core/types.ts:8` derives the token types from the registry. The bidirectional equality assertion at `tests/src/styles/tokens.test.ts:35` is included in the recorded passing styles runs.

5. **CONFIRMED.** The endpoints and percentages at `src/styles/_tokens.scss:18` and `:57` match the calibration. `tests/setupStyles.ts:8` and `:31` carry the expected readings; the Button proofs compare resolved paint through installed `matchesColor`. Its implementation at `node_modules/@orkestrel/test/dist/src/browser/index.js:1776` uses a half-channel-step tolerance. The actual Chromium and Edge logs record passing readings. No additional calibration departure is concealed.

6. **CONFIRMED.** `src/styles/_mixins.scss:22` declares the parameterized mixin without top-level CSS. Its default shadow uses the existing focus width and color; its component caller accepts the compatible shadow override. `tests/src/styles/mixins.test.ts:24` mounts a button, asserts `:focus-visible`, suppressed outline, spread, and color. The supplied diff leaves `theme-tokens` unchanged.

7. **CONFIRMED.** `tests/setupStyles.ts:441` filters within each rule, compares twin values through `normalizeValueToken`, and delegates the remaining families to `matchesDirectionSensitive`. Cases start at `tests/setupStyles.test.ts:180`; the cascade guard calls it at `tests/src/styles/index.test.ts:33`. The actual `guard-red-4.log` and `guard-green-4.log` record the required failure and subsequent pass.

8. **CONFIRMED.** The live Button partials contain no `:is()`, `:where()`, physical inline-axis declarations, or direction-specific rules. The recorded styles runs pass the shipped-cascade guard. Symmetric shorthand expansion follows the explicit brief-4 ruling.

9. **REFUTED — forces a fix round.** The outline proof at [components/button.test.ts:80](/C:/Users/mikes/WebstormProjects/veneer/tests/src/styles/components/button.test.ts:80) checks rest, hover, and disabled paint only. It never drives `:active` or `:focus-visible`. The outline-specific active mix at [components/_button.scss:159](/C:/Users/mikes/WebstormProjects/veneer/src/styles/components/_button.scss:159) therefore lacks the claimed state proof. Add active-paint and focus-visible-ring assertions for each outline role and mode, with expectations in the exported setup tables. The existing matrices are correctly frozen and centralized; registration remains in the test files.

10. **CONFIRMED from retained control evidence.** The actual selector, physical, asymmetric, and token red logs contain the failures reported. `tmp/u7a/control-5.mjs:17` restores and compares bytes. Each retained pre-plant backup hashes to `5a022ec296a9f1b772ab2ad81ee4e705dad8a2c26026ed604f79a2c2409e1769`, matching the restoration record. The supplied diff and live sources contain no control residue or control-named case.

11. **CONFIRMED.** `tmp/u7a/guides-final-6.log` records passing parity. The consumed rows are present: deferrals at `guides/veneer.md:140`, bindings at `:479`, and shipped compatibility rows at `:644` and `:654`. Each property declared on the base `.btn` has its binding row.

12. **CONFIRMED.** The supplied `scaffold/tmp/audit/u7a-status.txt` contains only the effective owned set. The rendered diff keeps conformance changes to `listed`, introduces no prohibited assertion, suppression, or skipped case, and exports and tests the added helper.

13. **CONFIRMED.** `tests/setupStyles.test.ts:70` includes the moved tables and `:97` includes the helper. `tests/conformance.test.ts:55` adds `btn`. The diff preserves existing cases; the physical-axis assertion changes according to the explicit symmetry ruling. Reports 5 and 6 identify these enumeration updates.

14. **CONFIRMED within the recorded work.** The diff adds no RTL artifact or direction-specific implementation. The existing emitted-twin parity case at `tests/src/styles/tokens.test.ts:39` remains unchanged. The control run exercised that existing case without adding RTL variation.

15. **UNDECIDABLE pending the verifier.** The retained reports and actual logs support the recorded passing runs. This lane has no independent host-chain result. Claim 15 explicitly assigns that deciding evidence to the verifier.

The forced-colors browser reading remains an accepted **bound**, not a fix-round finding: `scaffold/.orkestrel/veneer/units/u7a-brief-4.md:32` authorizes it, and the installed `MediaOptions` exposes only print and motion. No extra implementation findings.

Verdict: fix round with claim 9.