LANE: jf-audit-2-reviewer

Lane held: subjective (`reviewer` on Opus 5.5). This lane read the files and ran nothing. Every ruling on a run comes from the retained logs and the retained scripts. The engine that wrote the work, `opus`, is this lane's engine, so this lane attacked the prose and the proof titles harder.

1. **CONFIRMED.** The claim covers the duplicate mutation, the foreign mutation, and the restores.
   - **Duplicate mutation:** removing `if (matched.length > 1) throw …` from `/home/user/veneer-jf/tests/setupBrowser.ts:470` turns two `requireMatch` cases red, at test lines 1777 and 1794 (`jf-2-mutation-duplicate.log.txt:36-37`, `:84-113`). The assertions tell this mutation apart from the passing code. The count case expects the literal text `2 …` and `3 …` (`setupBrowser.test.ts:1778-1783`) and received no throw. So a helper that returns the first match reads red, and so does a helper that hard-codes the count.
   - **Foreign mutation:** removing line 472 turns the lone-SVG case red, and only that case (`jf-2-mutation-foreign.log.txt:31-44`). The case asserted a throw and received none, so it tells this mutation apart.
   - **Restore:** each log records digest `5ad6fa32…` before and after the run, and `cmp exit=0`. The logs are at `:1`, `:125-126`, and `:56-57`. The `cmp` compares against a baseline copy made in the same run (`jf-2-mutate.sh:10,17,20`).

2. **CONFIRMED.** The case is at `setupBrowser.test.ts:1794-1801` and passes `[graphic, build('div')]`, where `graphic` is an SVG element. It expects `2 samples in the root are named "Placeholder"`.
   - **Order mutation:** `jf-2-mutate.py:13` inserts a foreign check on `matched[0]` before the duplicate check. Only this case turns red, and it received the foreign message where it expected the duplicate one (`jf-2-mutation-order.log.txt:31-45`). The assertion is an exact message match, so it tells the mutation apart.
   - **Title:** "refuses several candidates as a duplicate before it checks the first as an HTML element" names the ordering the case proves. It does not name the control that specified it.
   - **Comment attacked, and it held:** the comment at `:1795-1796` concludes "the order runs several matches, then none, then non-HTML". The case pins only several-before-non-HTML. The other orderings can't be observed, because "none" and "several" can't both hold, and "non-HTML" needs exactly one match. So the sentence isn't false.

3. **CONFIRMED.** The constant is `SAMPLE_MESSAGES`, exported at `/home/user/veneer-jf/tests/setupBrowser.ts:484-488`, with TSDoc at `:476-483`.
   - **Export list and import:** the export-list case holds it at `setupBrowser.test.ts:880`, in sorted order between `PROBE_CASCADE` and `SANITIZER_CASES`. The test file imports it at `:78`.
   - **No local table:** the `describe('requireMatch')` callback at `:1765-1802` holds registrations and assertions only. This satisfies `.claude/rules/tests.md:187`.
   - **Name:** `{QUALIFIER}_{NOUN}` is the form `names.md:179` requires. `SAMPLE` matches the entity word inside every message ("sample"), and `MESSAGES` matches the `MatchMessages` type the constant satisfies.
   - **Style:** the `Object.freeze` form matches the file's other data constants (`BUTTON_RESTORATIONS` `:1656`, `SANITIZER_CASES` `:2348`).
   - **TSDoc remark attacked, and it held:** the remark says a helper that "drops, reorders, or rewords a message disagrees with them". That is true, because every case asserts `new Error('<literal>')` rather than reading the text back from `SAMPLE_MESSAGES`, so this is not a self-referential assertion. Swapping `absent` with `foreign` would turn the `[]` case red, and so would rewording any message.

4. **CONFIRMED.** The claim covers the touched files, the messages, and the banned constructs.
   - **Files:** `jf-2-status.txt:1-2` lists only `tests/setupBrowser.test.ts` and `tests/setupBrowser.ts`. The diff headers in `jf-2.diff:1,76` agree.
   - **Messages:** each removed literal at `jf-2.diff:165-176`, `:201-207`, and `:221-227` equals its `requireMatch` argument at `:178-182`, `:209-213`, and `:229-233`, with the count joined by one space at `setupBrowser.ts:470`.
   - **Banned constructs:** the diff adds no `any`, no `as` assertion, and no `!`. The word "as" appears only in prose. `SAMPLE_MESSAGES` is typed by an annotation, not an assertion. The diff adds no suppression. Its only functions are arrow callbacks passed directly to `expect` or `filter`, which the rule allows.

**Findings outside the claims:** none that meet the BROKEN standard.

**Attacked and held:**
- **Constant TSDoc:** `setupBrowser.ts:477` says "a placeholder lookup named 'Placeholder'". I read "named lookup" as a lookup by name, which is the file's own term (`:430`, `:452`). Read that way, the sentence is accurate, not false.
- **Foreign-case comment:** `setupBrowser.test.ts:1787` says "a typed query would hand over as an HTML element unchecked". This is true of the generic `querySelector<E>` signature.
- **Relocated doc lines:** the duplicate-refusal sentence in `readSpecimen`'s doc (`setupBrowser.ts:546-547`) points to `requireMatch`, and that reason is stated at `:452`. The count sentence dropped from `readButton` now sits at `:457-458`. No reason was lost in the move.
- **Tenets:** in `/home/user/veneer-jf/ROADMAP.md` § Tenets, this test-infrastructure change leaves the product surface unchanged, and no tenet is touched.

**Referral to the Orchestrator (retention, not ruled here):** `/home/user/scaffold/.orkestrel/veneer/units/jf-instruments/jf-2-mutate.sh:9,12` still names `tmp/units/…` and the scratchpad path `$SP/jf2-mutate.py`. The retained copy is `jf-2-mutate.py`. `.agents/orchestration.md` § Every dispatch is a file requires tmp paths in retained copies to be rewritten to the retained paths. It also requires the retained script to be the exact one that ran. Settle which requirement governs this script.

VERDICT: PASS
