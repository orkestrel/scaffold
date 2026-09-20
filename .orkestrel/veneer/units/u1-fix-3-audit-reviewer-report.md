# U1 round-3 audit report, objective lane (reviewer, native Opus 5, 2026-09-20, 326 s), Veneer `690bbb4..a0447d2`

**1. `readPhysicalDeclaration` flags exactly the named set — REFUTED.** `tests/setupStyles.ts:25` splits the captured value on whitespace, so `!important` and a space-bearing `calc()` change the value count: `margin:0 1px 0 2px !important` → `undefined` (missed); `margin:0 calc(1px + 2px)` → flagged (false); `margin:0 calc(1px + 2px) 0 3px` → `undefined` (missed); `.a{margin:0 1px 0 1px!important}` → flagged (false). The named fixtures pass; longhand, `text-align`, four-value, and logical discriminations are correct.

**2. Proof binds each fixture and the built cascade — PARTLY CONFIRMED.** Fixtures bind (`tests/setupStyles.test.ts:15-17`, `:20-24`); the cascade case (`:26-31`) does not — see N6; no fixture sits inside a rule block — see N5.

**3. Digest case asserts shape and distinctness only — CONFIRMED.** `tests/setupConformance.test.ts:60-68`; equalities only at `tests/conformance.test.ts:27-36`.

**4. Listener control — CONFIRMED.** `tests/setupBrowser.test.ts:22-25`; `recordListeners` records the target before delegating, so `abort()` cannot retract the record.

**5. N1, N2, N3 — closed.**

## Findings

**N4 (required).** Value tokenization (`tests/setupStyles.ts:25-30`): strip `!important`, split into top-level values keeping parenthesized groups whole; add each edge form as a fixture.

**N5 (required).** The return carries the consumed delimiter (`.a{padding-left:1px}` → `{padding-left:1px`); build the return from the property and value; add `.a{color:red;padding-left:1px}` → `padding-left:1px`.

**N6 (required).** The cascade case passes on an empty population: the built cascade is the layer statement alone, so both assertions pass if the build emits nothing (`tests.md` § Discovery and adequacy). Assert content before scanning, or record the gap. Traces to brief 3 (the Orchestrator's).

**N7 (required, low).** Hidden module-scope constants at `tests/setupStyles.ts:3-9`, a `/g` pattern with hand-reset `lastIndex`; export or fold them.

## Observations

`readPhysicalDeclaration` duplicates no installed capability (`findRule`, `readStyle` read the live CSSOM in a browser project). Brief 3's fixture list is met literally; N4 refutes the category the brief stated. The gate list omitted `test:policy` and the whole-suite `test`; the verifier covers them.

Verdict: fix round — N4 forces it, with N5, N6, and N7 carried into the same successor.
