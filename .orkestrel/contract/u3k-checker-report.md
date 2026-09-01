# U3k checker report (checker / Sonnet; immutable; brief `u3k-checker-brief.md`)

1. Verbatim landing — met: `tests/src/core/helpers.test.ts:3288` carries the title with "when the shape declares one"; `src/core/helpers.ts:1954-1955` reads "Default: rebuilt from" / "`shape.pattern` on every call, when the shape declares one".
2. Only differences from `u3j-diff.patch` — met: the two content lines and their blob indices (`80f40fe..f0031db` → `..2e1262b`; `e74f942..d138262` → `..9579bbc`); no other hunk, file, or line differs.
3. Vocabulary — met. `grep -n "twice per call\|on every call"` hits: `guides/contract.md:333` (`cloneJSONValue` per-call construction) and `:503` (compilation cost) permitted; `src/core/helpers.ts:1955` carries the condition; `:1994` describes the bounds reads, permitted; `tests/src/core/helpers.test.ts:3263` describes the rebuild's answer stability, permitted; `:3288` carries the condition. The two edited lines carry no `above`/`below` and no substitution-table hit.
4. TSDoc width at `src/core/helpers.ts:1955` — met: same 18-space continuation indent and comparable length to lines 1949 to 1954.

Verdict: PASS

Referrals: none
