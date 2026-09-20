# U3-policy review round 2 — objective lane (reviewer, native Opus 5, 2026-09-20, 357 s)

| Claim | Verdict | Evidence |
| --- | --- | --- |
| 1 | REFUTED | the two named sites are fixed; `tests/policy.test.ts:694` still says a name no catalog row registers is a stray. |
| 2 | CONFIRMED | `guides/scaffold.md:1153-1155` matches `isPolicyStray` term for term; one hunk. |
| 3 | CONFIRMED | `stripPolicyCode` before the match; `[^/)\n]+`; a closed fence or a span accounts for nothing; inherited limits: an unclosed fence, a fence indented four or more spaces. |
| 4 | CONFIRMED | `u` alone; local `new RegExp(POLICY_INDEX_LINK.source, 'gu')`; the `.match()[0]` assertion holds (and is not a control for the `g` removal). |
| 5 | CONFIRMED | the row's files, line, message match the brief; traced through `inspectPolicyProse`; it discriminates. |
| 6 | CONFIRMED | the two names sit beside `POLICY_MIRROR_PATTERN`; older rows outside the diff are not alphabetical. |
| 7 | CONFIRMED | order and empty index; `isPolicyMirror` body unchanged; both rows discriminate; no forbidden syntax; one-sentence descriptions; no banned term. |

Extra findings: 8 a count in the comment at `tests/policy.test.ts:665`; 9 the index sentence sits
on `isPolicyMirror`, which never reads the index; 10 an index link suppresses the stray report for
a mirror the catalog stops registering (design ruling requested); 11 no control row for a link
inside a fence; 12 `readPolicyIndex` doc block names neither the stripping nor its limits; 13
"A guide neither accounts for reports" lost its noun.

Referral: gate evidence not in the inputs; finding 10 is the Orchestrator's ruling.

Verdict: fix round — forced by claim 1.
