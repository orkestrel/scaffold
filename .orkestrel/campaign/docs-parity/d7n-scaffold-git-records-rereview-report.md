# Focused Git stream source re-review

Review only the corrections to the preceding failed source review. Preserve that review as the record of the earlier state. Root independently ran the owned helper file at `09:35:05` and reports exit `0`; this reviewer ran no suite and changed no package file.

1. **Framing — CONFIRMED.** `src/bin/helpers.ts:1031` constructs `TextDecoder('utf-8', { ignoreBOM: true })`. This retains default replacement decoding while preserving the leading filename character. The real indexed U+FEFF filename case at `tests/src/bin/helpers.test.ts:935` asserts exact spelling. The writer's recorded pre-fix failure names the lost character, and root independently reran the corrected case with the owned file. The direct framing case also splits a multibyte character, completes a pending record, supplies a later NUL delimiter, ignores empty records, and checks order. The earlier large real-index regression remains present.

2. **Refusal — UNRESOLVED only for the post-refusal-input proof.** The inventory/path boundaries, initial refusal identity, and real successful Git query lacking a NUL terminator have direct assertions. The source's terminal checks and awaited cleanup remain unchanged. However, `tests/src/bin/helpers.test.ts:1035` supplies `ignored\0` after the record array is full. Even without the early aborted return at `src/bin/helpers.ts:960`, the inventory check would refuse that complete record, retain the same initial reason, and leave every asserted value unchanged. The test therefore does not distinguish ignored input from processed input. This is a source-derived adequacy finding; no mutation run is claimed. Supply an unterminated fragment after refusal and assert that `pending` remains unchanged. That is the smallest correction to the previously requested proof.

3. **Integration — CONFIRMED, carried forward.** The CLI await chain, porcelain prefix treatment, and authoritative worktree validation are unchanged. No further integration review is opened.

4. **Contract — CONFIRMED for the requested corrections.** The exported helpers have direct mirrored cases and parameter/return TSDoc. The remaining inadequacy is confined to the post-refusal assertion named under Refusal; no helper, wrapper, public contract, or configuration change is requested.

5. **Scope — CONFIRMED, carried forward.** The continuation changes the helper implementation and mirrored test. The prior guide and CLI changes remain intact. Generated release convergence is outside this source review.

Source closure awaits the focused post-refusal assertion correction and its recorded run. The decoder defect and the other preceding findings are closed. Final prepublish, pack, and main acceptance remain separate root work.

VERDICT: FAIL — claims: 2; outside the claims: none
