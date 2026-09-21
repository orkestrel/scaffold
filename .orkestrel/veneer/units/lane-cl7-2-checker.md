<!-- workflow wf_7d881a64-594, agent a6a868dc5e22e4638, checker on sonnet, retained 2026-09-21 -->

## Checklist — CL7 audit round 2, mechanical lane

**Probe 1 — status identity.** `tmp/audit/cl7-status-2.txt` and `tmp/audit/cl7-status.txt` are byte-identical: same 17 paths, no addition or removal. CONFIRMED.

**Probe 2 — diff-to-diff delta.** Comparing `cl7-diff-2.patch.txt` against `cl7-diff.patch.txt` hunk-by-hunk, every file's diff text is identical except `tests/setupStyles.test.ts` (index `a00c3f0` vs `c67a434`) and `tests/src/styles/components/container.test.ts` (index `99822aa` vs `ca1c37f`). CONFIRMED — the delta is exactly those two files.

**Probe 3 — plant site and ramp boundaries.** `src/styles/_mixins.scss` is absent from both statuses (checker.py list has no such row). `breakpoints()` in `veneer/src/styles/_mixins.scss:83` still carries `(xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px, xxl: 1400px)` — the same six boundaries round 1 carried, no extra member. CONFIRMED.

**Probe 4 — set assertion.** `tests/setupStyles.test.ts:72-82` (`veneer/tests/setupStyles.test.ts`):
```
const ramp = compileString("@use 'mixins' as *; .ramp { @each $name, $width in breakpoints() { @if $width != 0 { #{$name}: #{$width}; } } }", { loadPaths: ['src/styles'] }).css
const names = new Set<string>()
parse(ramp).walkDecls(({ prop }) => { names.add(prop) })
expect(names).toEqual(new Set(Object.keys(TOKEN_NAMES.container)))
```
It compiles the real `_mixins.scss` ramp (not a restated list), excludes the zero boundary, and compares as `Set` (`toEqual` on `Set` instances is order-independent and symmetric in Vitest, so a member missing on either side reddens). Container token keys `TOKEN_NAMES.container` (`src/core/constants.ts:110-116`) are `sm, md, lg, xl, xxl`, sourced from the registry, matching the ramp's five non-zero names. CONFIRMED.

**Probe 5 — direction removal.** Round 1's `container.test.ts` wrapped every suite in `describe.each(['ltr', 'rtl'])('container classes in %s direction', (direction) => …)` with `dir="${direction}"` attributes on every mounted fixture (`cl7-diff.patch:515-590`). Round 2 replaces it with a plain `describe('container classes', …)` (`cl7-diff-2.patch:526-601`) and drops every `dir="${direction}"` attribute; every assertion, boundary visit, gutter override, navigation reading, and cap-retuning case body is otherwise textually identical between the two patches. This is a duplicated axis removed cleanly, not a dropped reading. CONFIRMED.

**Probe 6 — law sweep on added lines.** Scanned both new/changed hunks in `cl7-diff-2.patch` (`setupStyles.ts`, `setupStyles.test.ts`, `container.test.ts`, `_container.scss`, `LayoutSection.ts`, `LayoutSection.test.ts`, `constants.ts`, `_tokens.scss`, `index.scss`): no `any`, no type assertion outside `as const` (`src/core/constants.ts:116,120` use only `as const`), no non-null assertion, no suppression comment, no `public`/`private`/`protected`, no parameter property, no default export, no skipped case (`.skip`/`.todo` absent), no case named for a control (test titles use `$boundary`/`$name`/`$token`, never `ltr`/`rtl`). CONFIRMED.

## Claim table

| # | Verdict | Evidence |
|---|---------|----------|
| 1 | CONFIRMED | `veneer/tests/setupStyles.test.ts:72-82` — compiles real ramp, excludes zero, `Set`-compares both directions against `TOKEN_NAMES.container` keys. |
| 2 | REPORT-ONLY | The red-then-green proof and the mixins-digest claim rest only on `.orkestrel/veneer/units/cl7-report-2.md`'s self-report; not independently reproducible from static evidence. The assertion shape in claim 1 makes the fix mechanically plausible, but the run itself is the writer's own claim. |
| 3 | CONFIRMED | `cl7-diff.patch:515` vs `cl7-diff-2.patch:526` — `describe.each(['ltr','rtl'])` and every `dir="${direction}"` attribute removed; every other line in the suite bodies is textually unchanged. |
| 4 | REPORT-ONLY | Case-count and duration measurements are the writer's own report; not independently run in this lane. |
| 5 | CONFIRMED | Probe 2 — every file outside the two named is byte-identical between rounds, including `src/styles/_tokens.scss`, `src/core/constants.ts`, `guides/veneer.md`, and the registry/listed-value/section content round 1 accepted. |
| 6 [mechanical] | CONFIRMED for the mechanical sub-facts (status identity, diff delta, plant absence, absent-path list, law sweep) — see probes 1, 2, 3, 6. The gate-exit and independent-verifier-chain sub-claims are **not in this lane's slice**: this checker ran no commands and holds no independent gate evidence; rule those on the verifier lane's own reading, not on this report. |

## Extra findings

None. No implementation defect found beyond round 1's two named findings, both of which this round's evidence closes.

## Referrals

- Claims 2 and 4 rest on the writer's self-reported command output (red-then-green run, case-count/duration measurement) with no independent re-execution available to this read-only lane — per role instructions, these stay UNRESOLVED/report-only rather than CONFIRMED.
- The gate-exit and independent-verifier-chain portion of claim 6 is the verifier lane's subject, not this checker's; do not treat this checker's silence there as confirmation.

Verdict: accept
