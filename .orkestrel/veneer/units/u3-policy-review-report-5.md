# U3-policy review round 5 — objective lane (reviewer, native Opus 5, 2026-09-20, 499 s)

| Claim | Verdict | Evidence |
| --- | --- | --- |
| 1 | CONFIRMED | every remaining assertion in `tests/policy.test.ts:668-688` is derived at runtime or names `guides/absent.md`; none reads a package name, a guide name, or a directory tally. |
| 2 | CONFIRMED | `tests/setupPolicy.ts:383` accepts the bare, `./`, three title forms, angle-bracketed, and fragment forms and rejects the nested, absolute, parent, and unbalanced forms; `u` alone; fresh global matcher per call; bounded backtracking. |
| 3 | REFUTED | the duplicate named capture group is a `SyntaxError` on the Node floor `package.json:118-120` declares (`>=22.18.0`; `@babel/compat-data` records the construct as `node: "23"`), so the whole `policy` project fails to collect in a target on Node 22; no gate here catches it (`tsc` at `ESNext` applies no target gate). The `groups?.name` read and the order-and-dedupe case are otherwise right. |
| 4 | CONFIRMED | `POLICY_INDEX_FILE` derives from `POLICY_GUIDE_MAP` (`:407`); the span-pairing limit is in the remarks (`:1990-1995`). |
| 5 | CONFIRMED | mechanism, ruling in both homes, `isPolicyMirror` unchanged, every row still discriminates (each named), no forbidden syntax, one-sentence descriptions, no banned term; the one count phrase names its closed members and is permitted. |

## Findings

6. No gate proves a vendored module parses on the declared Node floor; the real proof is a Node
   22.18 run of `test:policy`, which is the Orchestrator's. Smallest fix for claim 3: distinct
   group names (`angled`, `bare`) read as `groups?.angled ?? groups?.bare`.
7. `tests/policy.test.ts:683` (`new Set(index).size === index.length`) asserts the dedupe against
   itself and passes on an empty index. A bound; delete it.
8. `tests/policy.test.ts:684` requires every sibling link in a target's index to resolve, which no
   rule states, and passes vacuously on an empty index. A bound; close if the round opens.
9. The remark at `:373-376` reads as if angle brackets, fragment, and title compose freely; the
   angle branch refuses `](<sample.md#blueprint>)`. A bound.
10. The class `[^/)\n<>"]+` admits a space and an apostrophe in a bare target. A bound.

Verdict: fix round — claim 3.
