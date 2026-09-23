## Verdict — T4 TEST-CLIP audit round 5, objective lane on GPT-6 Astra

Bench unit: `analyst` route, `codex exec --sandbox read-only` rooted at `/home/user/test`, launched by `codex-queue-28.sh` after `t4-audit-5-analyst.sh`; journal `tmp/codex/t4-audit-5-analyst.jsonl` (swept at acceptance), thread id `01a0d039-d658-7973-bb3d-5d798ed16714`, ended 21:48:06 UTC, exit 0, 25 items. The lane's returned message follows verbatim.

1. **CONFIRMED.** The summaries at [guides/test.md:362](/home/user/test/guides/test.md:362) and [src/browser/helpers.ts:3011](/home/user/test/src/browser/helpers.ts:3011) read “Reports whether an element clips its descendants' overflow.” verbatim. The exact-text check passed for each. Substituting the former padding-box summary in memory failed that check. Neither summary specifies a clip box.

2. **BROKEN.** The full T4 delta still adds token lists without individual nouns at [src/browser/helpers.ts:3019](/home/user/test/src/browser/helpers.ts:3019), including the automatic and scrolling overflow keywords, the hidden and clip overflow keywords, and the horizontal and vertical overflow property names.

   The executed search over added lines from `936bc4a..0c2c626` under the source, guide, and test directories matched:
   
   - `` `auto` or `scroll` ``
   - `` `hidden` or `clip` ``
   - `` `overflow-x` and `overflow-y` ``

   The search normalized comment line breaks and detected a deliberately wrapped missing-noun control. These lists violate [writing.md:48](/home/user/scaffold/.claude/rules/writing.md:48). Give each keyword and property token its own noun. The repaired comma-separated lists don't close this claim.

3. **BROKEN.** The source-matching requirement fails in the [readClipEdge remarks at helpers.ts:2957](/home/user/test/src/browser/helpers.ts:2957). They say a bordered or padded frame ends “not at its border box plus the margin.” The [implementation at helpers.ts:2976](/home/user/test/src/browser/helpers.ts:2976) explicitly returns that edge when the selected box is the border box.

   Counterexample: a frame with 400px content height, 20px bottom padding, a 3px bottom border, clip overflow, and a border-box clip margin of 100px. Its selected edge is 523px from its top: exactly its border-box bottom plus the margin. The committed clip-edge fixture expects 523, and its equality assertion distinguishes that result from the padding-origin result of 520.

   Qualify the disputed sentence to describe the default box. Preserve the explicit border-box branch. The guide’s Capture and content-edge passages correctly describe selection and expansion; they need no corresponding correction.

4. **CONFIRMED.** The retained diff exactly matches `11054f2..0c2c626`. It changes guide prose and source comments only. A comment-free TypeScript emit comparison found executable code unchanged; replacing the default padding origin with the border origin in memory made that comparison fail.

   Inspection of the added prose in the owned files, supported by case-insensitive substitution-term and inflection searches plus numeral, number-word, and ordinal searches, found no banned term or count.

   I read [t4-r5-gates.log.txt:14](/home/user/scaffold/.orkestrel/veneer/units/t4-r5-gates.log.txt:14). It records formatting, lint, typechecking, and guide-test exits of 0. For the parity proof, changing only the guide summary produces drift that the assertion in the committed `tests/guides.test.ts:279` rejects. Giving the guide and source the same incorrect summary remains indistinguishable to that assertion. These recorded exits therefore don't establish behavioral accuracy.

**Finding outside the claims — padding-edge-remarks: BROKEN.** The [clipsOverflow remarks at helpers.ts:3021](/home/user/test/src/browser/helpers.ts:3021) still say descendant rows beyond the padding edge never contribute to the document’s content edge.

A 400px frame with clip overflow, a 100px clip margin, and a 600px child contradicts that sentence. The committed `tests/src/browser/helpers.test.ts:3013` case expects a document edge of 500px. Its equality assertion distinguishes that result from a padding-only cap of 400px and an uncapped result of 600px.

I read the retained [gate log](/home/user/scaffold/.orkestrel/veneer/units/t4-audit-3-gates.log.txt:163) and [mutation log](/home/user/scaffold/.orkestrel/veneer/units/t4-audit-3-mutations.log.txt:11). Removing the ancestor cap fails the named clip-margin case. This is retained execution evidence and assertion review, not a fresh browser run. Replace “padding edge” with “clip edge” in the disputed statement.

Attacked and held: hidden, automatic, and scrolling overflow retain the padding edge regardless of clip-margin selection. Uncontained visible overflow remains uncapped. A frame’s own border contribution may legitimately extend beyond its descendant’s clipping limit.

VERDICT: FAIL 2, 3; outside the claims: padding-edge-remarks