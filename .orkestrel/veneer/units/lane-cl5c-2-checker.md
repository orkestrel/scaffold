<!-- workflow wf_e27f9c09-47d, agent a3c915d66d1570047, checker on sonnet, retained 2026-09-21 -->

## Checker verdict — CL5c audit round 2 (mechanical lane)

### Claim 6 `[mechanical]` — Scope, law, and gates

| Sub-assertion | Verdict | Evidence |
|---|---|---|
| Status differs from round 1's by exactly one added path, `app/browser/constants.ts` | CONFIRMED | `tmp/audit/cl5c-status-2.txt:1` adds ` M app/browser/constants.ts`; every other line of `tmp/audit/cl5c-status-2.txt` matches `tmp/audit/cl5c-status.txt` verbatim |
| That file's whole diff is the type import plus the three specimen-table annotations, nothing else | CONFIRMED | `cl5c-diff-2.patch.txt:1-37` — only the `import type` line and `CONTENT_SPECIMENS`/`TYPE_SPECIMENS`/`MEDIA_SPECIMENS` annotation lines change |
| Diff-to-diff delta is exactly: `app/browser/constants.ts`, `app/browser/types.ts`, `SpecimenSection.ts`, `tests/app/browser/index.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/src/styles/components/type.test.ts` — no other file's blob differs | CONFIRMED | Blob-hash comparison of `cl5c-diff.patch.txt` vs `cl5c-diff-2.patch.txt`: `app/browser/index.ts` (9705bf5..15fe707 both), `ContentSection.ts`/`MediaSection.ts`/`TypeSection.ts` (unchanged pairs), `src/core/constants.ts` (c6a34b7..55735f8 both), `_mixins.scss`/`_tokens.scss`/`components/_type.scss`/`elements/_mark.scss` (unchanged pairs), `tests/src/styles/components/image.test.ts` (0e1f11a..09a6b5b both), and `tests/app/browser/sections/SpecimenSection.test.ts` (0000000..45ee907 both) are byte-identical between rounds. The seven named files carry new hashes on both sides |
| The rename reaches every consumer; the old name appears nowhere | CONFIRMED | `Grep "ContentSpecimen"` over `C:/Users/mikes/WebstormProjects/veneer` (excluding nothing manually, but tree has no `node_modules`/`tmp` hits) returns no matches; `MarkupSpecimen` is declared once at `app/browser/types.ts:26` and imported at `app/browser/constants.ts:1`, `app/browser/sections/SpecimenSection.ts:1`, and referenced in `tests/app/browser/index.test.ts:5` |
| Scope: `guides/veneer.md`, `tests/setupConformance.ts`, `tests/fixtures/**`, `package.json`, `configs/**`, vendored files, and partials outside `_mark.scss`/`_type.scss` are absent from the diff | CONFIRMED | None of those paths appear in `tmp/audit/cl5c-status-2.txt` |
| No `any`, no assertion outside `as const`, no non-null assertion, no suppression comment, no `public`/`private`/`protected`, no parameter property, no default export, no skipped case, no control-named case, no plant residue | CONFIRMED | Reviewed full text of `cl5c-diff-2.patch.txt` for the seven changed files plus `Grep` sweep of `app/browser/constants.ts` for `any`/assertion/suppression/access-modifier tokens returned no matches; no `.skip`/control-named test names present in the diff; `_mixins.scss` mark mixin reads tokens (`var(--vn-text-mark)`, `var(--vn-surface-mark)`), no inlined system-color plant residue |
| Element partial gained the mixin load the way its siblings carry it | CONFIRMED | `_mark.scss:1` reads `@use '../mixins' as *;`, matching all 20 sibling `elements/*.scss` partials (`_code.scss`, `_button.scss`, etc., each line 1) |
| Built cascade emits the same declaration set for the bare tag and the class | CONFIRMED | `dist/src/styles/index.css`: `mark{color:var(--vn-text-mark);background-color:var(--vn-surface-mark);padding:0 .1875em}` and `.mark{color:var(--vn-text-mark);background-color:var(--vn-surface-mark);padding:0 .1875em}` — identical |
| Tag's own case table (`TEXT_MARK_CASES`) and its proof are byte-identical to `4f817db` | CONFIRMED | `TEXT_MARK_CASES` sits at `tests/setupStyles.ts:172`, outside every hunk in both `cl5c-diff.patch` and `cl5c-diff-2.patch`; neither diff touches it |
| "Every gate exits 0 ... independent verifier's chain is green" | **Not in this lane's slice** — no gate-run evidence was supplied to the checker. Per brief instruction, this sub-claim is left to the verifier lane and does not force a fix round on that account alone. |

### Extra findings

None beyond claim 6's own sub-assertions. No additional implementation defect found within the mechanical scope (no `any`, no wrapper-necessity violation, no naming/placement violation, no export-barrel drift) in the seven files comprising the diff-to-diff delta.

### Referrals

None — every sub-assertion under claim 6 resolved to CONFIRMED against direct evidence, except the gate-chain sub-claim, which is explicitly out of this lane's evidence per the brief and is not ruled either way.

**Verdict: accept** — Claim 6 (the only `[mechanical]` claim) is CONFIRMED in full on all evidence available to this lane; the gate-chain portion is deferred to the verifier lane per the brief's own instruction and does not by itself force a fix round.
