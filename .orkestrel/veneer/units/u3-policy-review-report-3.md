# U3-policy review round 3 — objective lane (reviewer, native Opus 5, 2026-09-20, 315 s)

| Claim | Verdict | Evidence |
| --- | --- | --- |
| 1 | CONFIRMED | `tests/policy.test.ts:694-695` and `tests/setupPolicy.ts:2022-2024`; every surviving `catalog row` hit enumerates all four accountings; `catalog registers` survives only where the mirror predicate genuinely reads the catalog alone. |
| 2 | CONFIRMED | `tests/policy.test.ts:664-667` carries no numeral and names the noun after `neither`. |
| 3 | CONFIRMED | mirror remarks catalog-only `:2022-2024`; `isPolicyStray` remarks `:2039-2043`; `readPolicyIndex` remarks `:1976-1980` name the stripping and both limits, matching `POLICY_FENCE_PATTERN`. |
| 4 | CONFIRMED | the ruling sentence at `tests/setupPolicy.ts:2041-2043` and `guides/scaffold.md:1155-1157`; one hunk in the guide. |
| 5 | CONFIRMED | the row at `:3461-3472` traced through `inspectPolicyControl` and `inspectPolicyProse`; removing `stripPolicyCode` makes `toHaveLength(1)` fail. |
| 6 | CONFIRMED | `isPolicyStray` is strictly weaker than before; `u` flag alone with a local iterating matcher; `isPolicyMirror` body unchanged; all four rows discriminate; no forbidden syntax; one-sentence descriptions; no banned term in a banned sense. |

## Findings

7. `tests/policy.test.ts:684-693` asserts a literal index census against `process.cwd()` inside a
   file `host.json` vendors byte-identical to every target, so `scaffold repair` turns
   `test:policy` red in Veneer and every other target for no policy defect. Assert the portable
   property instead and prove order and dedup in a scratch root.
8. `POLICY_INDEX_LINK` is documented as matching a sibling `<name>.md` target but rejects a titled
   target (`](tokens.md "Tokens")`) and an angle-bracketed one.
9. The fenced-link row's membership claims fenced blocks and code spans while its fixture writes
   only a fence.

Referral: finding 7 changes what the vendored surface asserts in every target, so the fix and the
scaffold bump that follows are the Orchestrator's.

Verdict: fix round — no claim forces it; finding 7 does.
