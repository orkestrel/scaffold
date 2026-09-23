## Verdict — T4 TEST-CLIP audit round 4, objective lane on GPT-6 Astra

Bench unit: `analyst` route, `codex exec --sandbox read-only` rooted at `/home/user/test`, launched by `codex-queue-27.sh` after `t4-audit-4-analyst.sh`; journal `tmp/codex/t4-audit-4-analyst.jsonl` (swept at acceptance), thread id `01a0d034-ea35-70d3-8a24-307c3be37256`, started 21:38:43 UTC, ended 21:41:27 UTC, exit 0, 25 items. The lane's returned message follows verbatim.

1. **BROKEN.** The edited passages match the branches in [helpers.ts:2968](/home/user/test/src/browser/helpers.ts:2968), but the claim that no other guide sentence contradicts them fails. The Surface summary at [test.md:362](/home/user/test/guides/test.md:362) says the `clipsOverflow` predicate reports clipping “at its own padding box.”

   Counterexample: a frame with 400px content height, 20px bottom padding, a 3px bottom border, clip overflow, and a 100px clip margin. The predicate returns true, but the clip edge is 520px from the frame’s top, beyond its 420px padding edge. The fixture and assertion explicitly distinguish these values at [setupBrowser.ts:58](/home/user/test/tests/setupBrowser.ts:58) and [helpers.test.ts:2928](/home/user/test/tests/src/browser/helpers.test.ts:2928).

   Remove the padding-box restriction from that summary and its matching [source summary](/home/user/test/src/browser/helpers.ts:3009). Preserve summary parity. The repaired Capture and pattern passages need no behavioral correction.

2. **BROKEN.** The literal requirement that every code token is followed by a noun fails at [test.md:625](/home/user/test/guides/test.md:625) and [test.md:3432](/home/user/test/guides/test.md:3432). In “A `hidden`, `auto`, or `scroll` overflow,” the hidden and auto tokens are followed by punctuation and another alternative, rather than a noun. The [writing rule](/home/user/scaffold/.claude/rules/writing.md:48) states no exception for a shared noun. Write “Hidden overflow, automatic overflow, and scrolling overflow,” or give each token its noun.

   The scope and gate portions hold. The committed delta exactly equals the retained diff, changes only the guide, and leaves the checkout clean. I read [t4-r4-gates.log.txt:38](/home/user/scaffold/.orkestrel/veneer/units/t4-r4-gates.log.txt:38): the scoped formatter, full formatting check, and guide tests record exit 0, including the results after rewrapping.

   Those exits don't prove the prose’s behavioral accuracy. Changing only a Surface summary would trigger the drift assertion at [guides.test.ts:279](/home/user/test/tests/guides.test.ts:279); matching incorrect source and guide summaries remain indistinguishable to that assertion.

3. **CONFIRMED.** The missing-evidence attack from the preceding audit no longer holds. I read [t4-audit-3-gates.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/t4-audit-3-gates.log.txt:1), which identifies commit `7104241` and a clean starting tree. The formatting, lint, typecheck, build, and test commands each record exit 0.

   I read [t4-audit-3-mutations.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/t4-audit-3-mutations.log.txt:1) against the [mutation definitions](/home/user/scaffold/.orkestrel/veneer/units/t4-r3-instruments/mutate.py:6). Each mutation records exit 1 and names an assertion-bearing case that distinguishes it:
   
   - **Border origin:** the edge assertion distinguishes 420 from 423 and 520 from 523. The bordered content assertion distinguishes 500 from 503.
   - **Ignored content-box keyword:** the edge assertion distinguishes 500 from 520.
   - **Removed ancestor cap:** the bordered content assertion distinguishes 500 from 600. The viewport-height cases also lose their fixed expectations.

   These distinctions follow from [helpers.test.ts:2928](/home/user/test/tests/src/browser/helpers.test.ts:2928) and [helpers.test.ts:3028](/home/user/test/tests/src/browser/helpers.test.ts:3028). The mutation log records successful script completion and a pristine checkout afterward. This rules on the retained execution evidence and source assertions; it isn't a fresh browser run.

   The measurement-change attack also fails. The [report diff](/home/user/scaffold/.orkestrel/veneer/units/t4-r4-report.diff:1) removes the flagged temporal and counting language. Its changed lines preserve every numeric measurement; inspection finds no altered measured result.

Findings outside the claims: none.

Attacked and held: the edited passages correctly retain the padding edge for hidden, automatic, and scrolling overflow regardless of box selection or paint containment. Clip overflow and paint-contained visible overflow select the content, border, or padding box and add the parsed margin. Uncontained visible overflow remains uncapped. A frame’s own border contribution can legitimately extend the document measurement beyond its descendant’s cap.

VERDICT: FAIL 1, 2; outside the claims: none