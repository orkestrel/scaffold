## Verdict — T4 TEST-CLIP audit round 2, objective lane on GPT-6 Astra

Bench unit: `analyst` route, `codex exec --sandbox read-only` rooted at `/home/user/test`, launched by `codex-queue-25.sh` after `t4-audit-2-analyst.sh`; journal `tmp/codex/t4-audit-2-analyst.jsonl` (swept at acceptance), thread id `01a0d011-cdf7-7042-8178-f7fac1c83ccc`, started 21:00:22 UTC, ended 21:04:31 UTC, exit 0, 34 items. The lane's returned message follows verbatim.

1. **BROKEN.** The arithmetic at [helpers.ts:3046](/home/user/test/src/browser/helpers.ts:3046) matches the stated implementation, but its clipping origin is wrong. With zero document margins/padding, a 400px frame, a 3px bottom border, a 100px clip margin, and a 600px child, the code yields **503**, while the effective content edge is **500**. CSS expands from the selected visual box, defaulting to the padding box; see [CSS Overflow §3.2](https://www.w3.org/TR/css-overflow-3/#overflow-clip-margin). Selecting the content box with 20px bottom padding similarly gives **520** from the code versus **500** from the specified clipping edge.

   These are source/specification counterexamples, with arithmetic checked through a non-writing Node command, not browser measurements. The border subtraction is therefore not generally dead logic. Compute the selected box’s edge before adding the clip margin, retain the frame’s separate border-box contribution, and test borders/padding together with clip margins. The claimed maximum also needs qualification: a frame with a 150px bottom margin contributes **550**, exceeding its **500** expanded clipping edge.

2. **CONFIRMED.** The narrowly stated length-reader contract holds at [helpers.ts:2962](/home/user/test/src/browser/helpers.ts:2962). The keyword-prefix attack fails because the expression finds the pixel length anywhere in the computed value. The overflow guard excludes the specified scrolling values and uncontained visible overflow. Export removal is contradicted by [index.ts:27](/home/user/test/src/browser/index.ts:27); the summary matches [test.md:360](/home/user/test/guides/test.md:360).

   The assertions at [helpers.test.ts:2922](/home/user/test/tests/src/browser/helpers.test.ts:2922) distinguish returning 20 for hidden/auto overflow from the expected 0, and distinguish losing the length in `content-box 20px` from the expected 20. The passing evidence is [t4-2-gates.log.txt:49](/home/user/scaffold/.orkestrel/veneer/units/t4-2-gates.log.txt:49). Extracting the length does not establish the clipping origin; claim 1 fails at its consumer.

3. **BROKEN.** Dropping clipping from the clip-margin fixture produces **600 under either pane**, not the pane’s height: its child has a fixed 600px height at [helpers.test.ts:2998](/home/user/test/tests/src/browser/helpers.test.ts:2998). Correct that claimed mutation result.

   The mutation distinctions are:

   | Mutation | Source-derived result | Assertion distinguishes it |
   |---|---|---|
   | Ignore the clip margin | 400, 400 | Yes, against 500, 500 |
   | Remove the cap | 600, 600 | Yes |
   | Drop clipping | 600, 600 | Yes |
   | Remove the paint cap in the stacked fixture | 844, 2356 | Yes, against 500, 500 |
   | Remove the scroll cap in the stacked fixture | 1144, 2656 | Yes |
   | Restore border subtraction in the bordered fixture | 403, 403 | No; the frame’s contribution masks it |

   The relevant assertions are at [helpers.test.ts:2977](/home/user/test/tests/src/browser/helpers.test.ts:2977), [helpers.test.ts:2991](/home/user/test/tests/src/browser/helpers.test.ts:2991), and [helpers.test.ts:3006](/home/user/test/tests/src/browser/helpers.test.ts:3006). Arithmetic was checked with Node; browser mutations were not executed. The retained passing run is [t4-2-gates.log.txt:49](/home/user/scaffold/.orkestrel/veneer/units/t4-2-gates.log.txt:49).

   The tables are documented and frozen through their object entries at [setupBrowser.ts:12](/home/user/test/tests/setupBrowser.ts:12) and [setupBrowser.ts:33](/home/user/test/tests/setupBrowser.ts:33). The loops use the required fixture helpers. Inverting any listed predicate result fails its equality assertion. Returning a margin for hidden/auto overflow or losing a keyword-prefixed length fails the reader assertion. Ignoring the keyword’s **geometric meaning** remains undetected: the reader test asserts only the length.

4. **CONFIRMED.** The row-order and missing-noun attacks fail at [test.md:360](/home/user/test/guides/test.md:360), [test.md:622](/home/user/test/guides/test.md:622), and [test.md:3427](/home/user/test/guides/test.md:3427). The named tokens carry nouns. The guides run exits 0 at [t4-2-gates.log.txt:64](/home/user/scaffold/.orkestrel/veneer/units/t4-2-gates.log.txt:64).

   Changing the Surface summary without changing its source summary would violate the empty-drift assertion at [guides.test.ts:279](/home/user/test/tests/guides.test.ts:279). That assertion distinguishes summary drift; it does not establish the clipping geometry described in the prose.

5. **BROKEN as written.** Inline case matrices remain: [helpers.test.ts:123](/home/user/test/tests/src/browser/helpers.test.ts:123) declares the implicit-role matrix, and [helpers.test.ts:200](/home/user/test/tests/src/browser/helpers.test.ts:200) declares the field-role matrix. Their test consumers remain at lines 1626 and 1692. These declarations predate this delta at base `936bc4a`; narrow the claim to the clipping matrices moved by this unit.

   The remaining assertions hold. The live diff equals the retained diff, and status lists only the owned paths at [t4-2-status.txt:1](/home/user/scaffold/.orkestrel/veneer/units/t4-2-status.txt:1). Inspection of the additions finds none of the claimed prohibited constructs, banned prose terms, or growable-set counts. The retained log records exit 0 for formatting, lint, typechecking, scoped browser tests, and guides at lines 12, 17, 38, 49, and 64 respectively.

Findings outside the claims: none.

Attacked and held: ordinary clipping with a zero clip margin correctly retains the frame’s own border contribution. Unframed content retains its existing readings. The corrected stacked mutation readings stand. Fixture registration and teardown close the earlier cleanup finding through [setupBrowser.ts:54](/home/user/test/tests/setupBrowser.ts:54), [setupBrowser.ts:86](/home/user/test/tests/setupBrowser.ts:86), and [helpers.test.ts:242](/home/user/test/tests/src/browser/helpers.test.ts:242).

VERDICT: FAIL 1, 3, 5; outside the claims: none