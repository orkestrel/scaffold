## Verdict — T4 TEST-CLIP audit round 6 and the TEST-MATRICES fixes, objective lane on GPT-6 Astra

Bench unit: `analyst` route, `codex exec --sandbox read-only` rooted at `/home/user/test`, launched by `codex-queue-30.sh` after `t4-audit-6-analyst.sh`; journal `tmp/codex/t4-audit-6-analyst.jsonl` (swept at acceptance), thread id `01a0d046-4d96-72f2-9ec1-1bb392478f73`, started 21:57:43 UTC, ended 22:02:26 UTC, exit 0, 41 items. The lane's returned message follows verbatim.

1. **BROKEN.** The code-token requirement still fails in these sentences:

   - [src/browser/helpers.ts:2947](/home/user/test/src/browser/helpers.ts:2947): the return description ends with `({@link clipsOverflow})`, without a noun after the linked identifier.
   - [src/browser/helpers.ts:2953](/home/user/test/src/browser/helpers.ts:2953): the sentence beginning “A `clip` overflow…” ends with “the length {@link readClipMargin} reads.” The linked identifier needs “helper” before “reads.”
   - [src/browser/helpers.ts:3019](/home/user/test/src/browser/helpers.ts:3019): the sentence beginning “A scroll container…” contains `({@link readClipEdge})`, without a following noun.
   - [src/browser/helpers.ts:3056](/home/user/test/src/browser/helpers.ts:3056): the sentence beginning “An ancestor that clips its overflow…” contains the same nounless link.

   Add “helper” after each linked identifier, adjusting the surrounding grammar. The backticked keyword lists were repaired; linked identifiers remain part of the code-token population.

   The overflow and visual-box descriptions otherwise match the source branches: hidden, automatic, and scrolling overflow return the padding edge before box selection; clip overflow and paint-contained visible overflow reach box selection and margin expansion. This is source review supported by retained execution, not a fresh browser run.

   I read [tm-fix-3-gates.log.txt:86](/home/user/scaffold/.orkestrel/veneer/units/tm-fix-3-gates.log.txt:86) and [t4-r6-full-gates.log.txt:121](/home/user/scaffold/.orkestrel/veneer/units/t4-r6-full-gates.log.txt:121). For the behavioral proofs, substituting the border origin for the default padding origin distinguishes 523 from 520 in the [clip-edge assertion](/home/user/test/tests/src/browser/helpers.test.ts:2831), and 503 from 500 in the [bordered content assertion](/home/user/test/tests/src/browser/helpers.test.ts:2943). Removing ancestor clipping distinguishes 600 from 500 in the [clip-margin assertion](/home/user/test/tests/src/browser/helpers.test.ts:2927). Those assertions detect those mutations. They do not detect missing nouns.

2. **CONFIRMED.** Attempted to find an executable or out-of-scope change in the round-6 commit. Its changed paths are exactly [src/browser/helpers.ts](/home/user/test/src/browser/helpers.ts:2947) and [tests/setupBrowser.ts](/home/user/test/tests/setupBrowser.ts:46). The retained diff matches the commit diff exactly. TypeScript printing with comments removed produces identical syntax before and after the commit. An in-memory control adding an executable declaration makes that comparison fail. Inspection of the actual diff confirms that its edits are comment lines.

3. **CONFIRMED.** Attempted to find a duplicate refusal object, an unfrozen export, or a consumer retaining the old declaration. The documented [setup export](/home/user/test/tests/setup.ts:228) freezes the record, and the [core test import](/home/user/test/tests/src/core/helpers.test.ts:36) supplies its throw and comparison sites. The retained fix diff matches the commit.

   Replacing a thrown record with a separate, equal-looking object fails the identity assertions at [helpers.test.ts:1199](/home/user/test/tests/src/core/helpers.test.ts:1199) and [helpers.test.ts:1276](/home/user/test/tests/src/core/helpers.test.ts:1276). Those assertions distinguish the mutation. Removing the freeze alone would not be detected by those identity assertions; freezing is established here by source inspection. I read [tm-fix-2-gates.log.txt:52](/home/user/scaffold/.orkestrel/veneer/units/tm-fix-2-gates.log.txt:52), which records the core suite exiting 0.

4. **CONFIRMED.** Attempted to find a surviving empty table, another module-level pure-data table, or incorrect replacement documentation. The [empty input](/home/user/test/tests/src/browser/factories.test.ts:904) is inline. The [registry-check summary](/home/user/test/tests/setup.ts:113) matches its [consumer](/home/user/test/tests/distribution.test.ts:725). The [internal-declaration summary](/home/user/test/tests/setup.ts:219) opens with “Lists” and carries no consumer count.

   A TypeScript-parser enumeration of module-level variable declarations across the non-vendored test files found only the excluded scenario declarations among the literal tables remaining. Their rows carry fixture callbacks, directly or through scenario references. The enumeration also discovered in-memory controls using a lowercase name, a typed array, and a frozen object.

   Mutating the harness to accept the empty input would fail the [expected-error assertion](/home/user/test/tests/src/browser/factories.test.ts:909); mounting residue would fail the adjacent DOM assertions. I read [tm-fix-3-gates.log.txt:86](/home/user/scaffold/.orkestrel/veneer/units/tm-fix-3-gates.log.txt:86), which records the browser suite exiting 0.

5. **CONFIRMED.** Attempted to find a missing gate, nonzero exit, omitted guides run, or mismatched commit. I read the complete [round-6 log](/home/user/scaffold/.orkestrel/veneer/units/t4-r6-gates.log.txt:11), [fix-2 log](/home/user/scaffold/.orkestrel/veneer/units/tm-fix-2-gates.log.txt:11), [fix-3 log](/home/user/scaffold/.orkestrel/veneer/units/tm-fix-3-gates.log.txt:11), and [full-chain log](/home/user/scaffold/.orkestrel/veneer/units/t4-r6-full-gates.log.txt:1). They record the claimed exits. The full-chain header identifies the stated clean commit; its guides run precedes the final test exit of 0.

   The [parity assertion](/home/user/test/tests/guides.test.ts:264) distinguishes a mutation changing only a guide summary. Matching incorrect prose in source and guide remains indistinguishable to that assertion. Passing gates therefore establish the recorded gate result, not universal prose accuracy.

Findings outside the claims:

- **BOOLEAN-RETURN — BROKEN.** [src/browser/helpers.ts:3014](/home/user/test/src/browser/helpers.ts:3014) uses “Whether…” for the boolean return description. The [TypeScript contract](/home/user/scaffold/.claude/rules/typescript.md:85) requires “True if …; false otherwise.” Use that form while preserving the condition. The predicate’s behavior is unaffected.
- **FRAME-COUNT — BROKEN.** [tests/src/browser/helpers.test.ts:2911](/home/user/test/tests/src/browser/helpers.test.ts:2911) says “The two frames stack.” That fixture count violates [AGENTS.md:172](/home/user/scaffold/AGENTS.md:172). Replace it with “The frames stack.” Preserve the measured heights and the assertion.

Attacked and held: the Orchestrator’s bundler-table ruling is correct. Its direct consumers are the [declaration-condition table](/home/user/test/tests/setup.ts:173) and the [resolution table](/home/user/test/tests/setup.ts:198), which moved with it. An unused direct import in the distribution suite would add nothing. A frame’s own border contribution can also correctly extend beyond its descendant’s clipping limit.

VERDICT: FAIL 1; outside the claims: BOOLEAN-RETURN, FRAME-COUNT