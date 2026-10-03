# Item 9: confirmed review findings

## F1. The boundBrowserText TSDoc still says the toolset passes BROWSER_TOOL_VIEW_FOOTER for every result that carries a view, but look uses the cut footer

- Lens: behavior; severity: low; at C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\helpers.ts:497
- Evidence: Lane: objective (behavior). Design ruling 6 registers `look` with `BROWSER_TOOL_CUT_FOOTER`, and the code does this at src/core/BrowserToolset.ts:270. `look` still returns a view, though, so the remark at src/core/helpers.ts:497-499 is now false: "the toolset passes `BROWSER_TOOL_VIEW_FOOTER` for a result that carries a view and `BROWSER_TOOL_CUT_FOOTER` for any other". The diff rewrote the matching sentences at src/core/constants.ts:452-453, src/core/BrowserToolset.ts:115, and guides/browser.md:226, but missed this one. That leaves two homes for the footer rule that disagree.
- Fix: Rewrite src/core/helpers.ts:497-499 to match constants.ts:452-453: the toolset passes `BROWSER_TOOL_VIEW_FOOTER` for a cut action receipt and `BROWSER_TOOL_CUT_FOOTER` for any other result, `look` and `read` included.
- Verifier: Confirmed. The defect is real at 655906b, and the design makes it one. I checked it in the objective (behavior) lane.

1. **The stale remark.** `C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\helpers.ts:497-499` still says "the toolset passes `BROWSER_TOOL_VIEW_FOOTER` for a result that carries a view and `BROWSER_TOOL_CUT_FOOTER` for any other".

2. **The code contradicts it.** `C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\BrowserToolset.ts:270` creates `look` with `BROWSER_TOOL_CUT_FOOTER`. Design ruling 6 (`items-9-10-design.md:72`) requires that change, and the diff makes it at item-9.diff:268-269. `look` still returns a view, so a reader who follows the remark would expect the view footer on `look`'s cut result and would be wrong.

3. **The other homes were rewritten.** The diff updated the matching text in three places:
   - `src/core/constants.ts:451-455`, where `BROWSER_TOOL_VIEW_FOOTER` "ends the footer of a cut action receipt".
   - The `BROWSER_TOOL_VIEW_FOOTER` row in the guide's constants table (item-9.diff:32-33).
   - The footer text itself (item-9.diff:560-561).
   
   The diff's only hunks in `helpers.ts` add an import and `renderBrowserOutlineRow` (item-9.diff:604 onward). The `boundBrowserText` TSDoc was never revised, so the footer rule has two homes that disagree.

**Attacked and held:**
- I checked whether `look` carries no view and so falls under the remark's "any other" branch. It doesn't: ruling 6 frames the change as moving `look` off the view footer, as `read` already is.
- I checked whether the remark was meant only as an example. It doesn't read that way: it states what the toolset passes for each kind of result, and line 270 makes that statement false.

**Required change:** at `src/core/helpers.ts:497-499`, rewrite the remark to say that the toolset passes `BROWSER_TOOL_VIEW_FOOTER` for a cut action receipt and `BROWSER_TOOL_CUT_FOOTER` for every other result, `look` and `read` included.

**Finding outside the claim:** `src/core/constants.ts:446-447` describes `BROWSER_TOOL_CUT_FOOTER` as ending "a cut result that carries no view" and lists the read note, a tab list, a wait, a page tool's output, and an error message. `look` now uses that footer and carries a view, so the list leaves out a result that uses it. Add `look`'s result, or recast the description as "any result other than an action receipt".

Terminal: CONFIRMED (low).

## F2. No test covers the rule that drops the match block when its header alone does not fit. Removing that check turns a long `what` into a refusal.

- Lens: tests; severity: medium; at C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\BrowserToolset.ts:718
- Evidence: Lane: objective, test sufficiency.

The code: `if (text.length + 1 <= half)` at BrowserToolset.ts:718 adds the block only when the header line fits in half the room. The design (items-9-10-design.md:54, ruling 3) says the block is omitted when its header alone does not fit. Ruling 2 (items-9-10-design.md:47) says `look` must not create a refusal path.

Why no test fails: every `look` that gets a match block uses a short `what` whose header fits.
- The 160-button block test (tests/src/core/BrowserToolset.test.ts:4458) uses limit 500, so `half` is 250, with `what` values 'the button 155' and 'button'.
- The limit-64 bounds case (BrowserToolset.test.ts:4617-4623) uses `what: 'cart'`, which matches no row in that fixture.

Mutation: delete the check at line 718, so `block = header + '\n'` always. For a `what` whose header is longer than the room, `space` at line 726 drops below 1, the slice is empty, and `#pageSlice` throws `BROWSER_TOOLSET_LIMIT` ('The look limit of N characters cannot hold the next character…'). That turns the recovery call into a refusal. No test fails under this mutation.
- Fix: Add a case to the 'look pages and matches' describe block in tests/src/core/BrowserToolset.test.ts. Use the 160-button fixture with limit 500 and a `what` of about 300 characters that contains 'button', for example `'button ' + 'x'.repeat(300)`. Assert that the result starts with `page "Cart" `, contains no 'match', and equals `look.execute({ what: 'tracking' })`. Add a second case with a header that fits but no row that fits, and assert the block is the header line plus a blank line.
- Verifier: Confirmed. I checked this in the objective lane (test sufficiency) at 655906b.

1. **The defect is real.** At C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\BrowserToolset.ts:718, `look` adds the match block only when `text.length + 1 <= half`. Without that check, `block` always holds the header line plus a blank line, because the row loop at :720 stops at the first row. Take a header that is at least as long as `room`, for example `what` = 'button ' + 'x'.repeat(N) with N large enough. Then `space` at :726 is below 1, the slice is `{ text: '', offset: 0, total }`, and `#pageSlice` (:796-799) throws `BROWSER_TOOLSET_LIMIT` when no move note is pending. That turns `look` into a refusal. A header longer than `half` but shorter than `room` gives no refusal, but the block then takes more than half the room.

2. **The design makes it a defect.** Ruling 3 (items-9-10-design.md:54) says the block takes at most half the room and is left out when its header alone does not fit. Ruling 2 (:47) says `look`, the recovery call that every refusal names, must not create a refusal path. AGENTS.md Work loop step 4 asks for tests that cover edge cases and boundaries.

3. **No test catches the mutation.** I searched every `look` call that gets a match block:
   - BrowserToolset.test.ts:4458-4495 uses limit 500, so `half` is 250, and the `what` values 'the button 155' and 'button' give headers of about 30 characters.
   - The limit-64 bounds case at :4617-4623 uses `what: 'cart'`. Even if 'cart' matched a row, the header `1 element matches "cart":\n` is 26 characters, and 26 + 1 is within `half` (32), so the check passes.
   - tests/service/toolset.test.ts:429-440 and tests/setupService.test.ts:212-253 use the default limit of 4,000 or fixed strings with short headers.
   - tests/service/document.test.ts:106-121 tests the DOM look, not `BrowserToolset.ts`.
   - No other toolset test with a small limit (48, 120, 200, 40) calls `look` with a matching `what`.

   The test title at :4458 claims to catch a block that "outgrows half the room", but it never reaches the branch that leaves the block out. Two mutations pass every test: deleting the :718 check, and widening it to compare against `room`.

4. **The proposed fix would catch it, with one condition.** Use the 160-button fixture at limit 500 and a long `what` containing 'button'. Assert that no 'match' text appears and that the result equals the plain `look` result. Both mutations fail that test. The header must be at least 500 characters for the deleted check to show as a refusal. A header of about 330 characters still catches the deletion, through the 'match' assertion. The second case the finding proposes covers the separate rule that a block shows its header even when no row fits.

## F3. No test covers the move note sharing the page's room in `look`. Ignoring the note's length passes every test.

- Lens: tests; severity: medium; at C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\BrowserToolset.ts:711
- Evidence: Lane: objective, test sufficiency.

The code: `const room = this.#limit - note.length` at BrowserToolset.ts:711 makes the drained note share the limit with the paged outline. The design (items-9-10-design.md:70, ruling 5) says 'The room is `limit - note.length`'.

Why no test fails: the only `look` that carries a move note is at tests/src/core/BrowserToolset.test.ts:4136-4143. It uses limit 200 on the default fixture, whose whole outline fits after the note, so it never pages. It also checks only `startsWith`. `read` has its own note-and-offset case (BrowserToolset.test.ts:5472-5526), but `look` does not.

Mutation: change line 711 to `const room = this.#limit`. A `look` with a note would then produce a body longer than the limit. The boundary at BrowserToolset.ts:659 then cuts it with a second footer inside the page, and the next page's offset no longer lines up. No test checks a paged `look` result that carries a note.
- Fix: Add a `look` copy of the read case at BrowserToolset.test.ts:5472. Move the view to a popup whose accessibility tree is `buildBrowserButtonTree(160)`, with limit 500. Then call `look { what: '' }` and assert four things:
- the result starts with the note;
- note plus body is at most 500 characters;
- the footer's END equals the body length after the note;
- the body joined with the page at that offset is a prefix of `outline({ limit: Number.MAX_SAFE_INTEGER }).text`.
- Verifier: Lane: objective, test sufficiency. The finding holds at 655906b, with one small inaccuracy about which tests exist that does not change the result.

1. The code behaves as the finding says. C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\BrowserToolset.ts:710-711 drains the note and sets `room = this.#limit - note.length`. Line 716 halves that room for the match block, line 726 subtracts the block, and line 730 slices the outline into the space left. `#pageSlice` (lines 789-810) returns the body as note, block and slice, and puts the offset footer after it. The boundary at line 659 cuts the body with `clause` and then appends that footer. The design requires this sharing: ruling 5 at C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\showcase\browse\items-9-10-design.md:70 says "The room is `limit - note.length`", and the design's test list at line 148 requires "Every body is at most the limit". The law makes the test gap a defect. AGENTS.md Work loop step 4 says to cover edge cases and boundaries. scaffold `.claude/rules/tests.md:345` says to confirm that each assertion would fail for the defect it claims to catch.

2. I tested the mutation the finding proposes: line 711 becomes `const room = this.#limit`. When a note is present, the body can then reach `limit + note.length`. Line 659 cuts it and adds its own cut footer, the range footer follows, and the next page's offset no longer matches what was shown. Every test where `look` carries a move note still passes under that mutation:
   - C:\Users\mikes\WebstormProjects\browser-wt-browse\tests\src\core\BrowserToolset.test.ts:4136-4143 runs at limit 200 and asserts only `startsWith` on a short prefix of the note and the page header.
   - BrowserToolset.test.ts:4165-4172 (the tab-closed note) also runs at limit 200 and asserts only `startsWith`, on a prefix of about 130 characters. This is the inaccuracy: the finding calls 4136 the only `look` that carries a note, but this test carries one too. It still cannot catch the mutation.
   - C:\Users\mikes\WebstormProjects\browser-wt-browse\tests\service\toolset.test.ts:1003-1009 asserts the exact text, but at the default limit of 4,000 characters, where the small catalog fits whether or not the note's length is subtracted.
   - The paging tests at the design's lines 146-151 carry no note, so the mutation doesn't affect them. The note-and-offset case at BrowserToolset.test.ts:5472-5526 covers only `read` (lines 759-765).
   - The diff C:\Users\mikes\WebstormProjects\browser-wt-browse\tmp\item-9.diff adds no test where `look` carries a note.

3. Required change, at C:\Users\mikes\WebstormProjects\browser-wt-browse\tests\src\core\BrowserToolset.test.ts:5472. What is wrong: no assertion checks that a paged `look` with a move note shares the limit with that note. What right looks like: a `look` copy of the `read` case. Move the view to a popup whose outline is longer than the limit minus the note, for example the 160-button tree. Call `look` with `what: ''` and assert four things:
   - the result starts with the note;
   - the note plus the body is at most the limit;
   - the footer's end offset equals the length of the body after the note;
   - the body joined with the page at that offset is a prefix of `outline({ limit: Number.MAX_SAFE_INTEGER }).text`.

   With the mutation, the second and third assertions fail.

Attacked and held: whether line 659 would hide the mutation. It doesn't: the cut there adds a second footer inside the body, and the offset assertion detects that. Whether `#drainNote` (line 784) is enough on its own: it caps the note at `limit - 1` but doesn't reduce the room, so the mutation still overruns the limit.

## F4. No test covers a `press` receipt that carries both a status and the focus clause, so the clause's order and separator are unproven.

- Lens: tests; severity: low; at C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\BrowserToolset.ts:1428
- Evidence: Lane: objective, test sufficiency.

The code: `const parts = [status, clause].filter(...)` joined with '; ' at BrowserToolset.ts:1426-1429. The design (items-9-10-design.md:77, ruling 7) requires the clause after any other status, as in `Pressed Enter; no form received the submission; focus is on e3 textbox "Search".`

Why no test fails: every focus assertion has no other status.
- The unit cases at tests/src/core/BrowserToolset.test.ts:4525-4549 cover `Pressed Tab; focus is on …` and `Pressed Tab.`.
- The service cases at tests/service/toolset.test.ts:504 and 511 are Tab presses.
- The no-form steps in `BROWSER_SUBMIT_FOCUS_STEPS` (tests/setup.ts:354-361, 394-409) use accessibility (AX) fixtures with no `focused` property, so no clause is added.

Mutation: change `[status, clause]` to `[clause, status]`, or `join('; ')` to `join(', ')`. With one part the join has no effect, so every test still passes.
- Fix: Add a case in which the observer records no submission and the AX tree marks the input as `focused`. You can extend the 'an Enter in an input a form owns' arrangement, or use the service form page with an input inside a POST form whose handler prevents nothing. Assert the exact line `Pressed Enter; no form received the submission; focus is on eN textbox "NAME".`
- Verifier: Lane: objective (test sufficiency). The finding holds at 655906b.

Code: C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\BrowserToolset.ts:1426-1432 builds `parts = [status, clause]`, drops the undefined entries, and joins what is left with '; '. Order and separator only matter when both parts are present. Design ruling 7 (C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\showcase\browse\items-9-10-design.md:77) requires the clause to come after any other status and gives this exact line: `Pressed Enter; no form received the submission; focus is on e3 textbox "Search".` So the combined form is specified behaviour.

How I tried to refute it, and why that failed:
- The only test fixture that puts the `focused` property on an AX node is `buildBrowserButtonTree` (tests/setup.ts:1767-1789). The only test that passes it a focused node is BrowserToolset.test.ts:4525-4549, and that test presses Tab, so `status` is undefined.
- Calls at BrowserToolset.test.ts:4420 and 4461 pass no focused node.
- No other AX fixture in tests/ carries `focused`. The grep across tests/ found only setup.test.ts and helpers.test.ts, and those test the fixture and the outline helper, not the receipt.
- The steps that produce a status, `BROWSER_SUBMIT_FOCUS_STEPS` (tests/setup.ts:346-417), are run by BrowserToolset.test.ts:3078-3097 against the default `createBrowserElementFixture` tree, which has no `focused` node. Their receipts therefore end at the status alone (setup.ts:360, 400, 408).
- The service tests make no Enter press. The only focus receipts there are the Tab presses at tests/service/toolset.test.ts:504 and 511. Grep for `Pressed`, the handled status, the requested status, and the loading status in tests/service found nothing else.
- No guide proof asserts the clause. guides/browser.md:2905 is prose.

Mutation check: with only one part ever present in a test, swapping to `[clause, status]` or changing `join('; ')` to `join(', ')` gives the same output for every input the suite feeds in. Both mutations survive.

Law: scaffold .claude/rules/tests.md:34 and AGENTS.md § Work loop step 4 require coverage of the specified paths. The design's own test plan (items-9-10-design.md:157) lists only Tab cases. That explains the gap, but ruling 7 still states the combined line as required behaviour.

Required change, low severity: at C:\Users\mikes\WebstormProjects\browser-wt-browse\tests\src\core\BrowserToolset.test.ts (near 3078 or 4525), add a press-Enter case with these parts:
- the 'an Enter in an input a form owns' focus arrangement;
- an `accessibility` override on `createBrowserElementFixture` that replies with a tree whose textbox node carries `focused`;
- the observer recording no submission.

Assert the exact first line `Pressed Enter; no form received the submission; focus is on eN textbox "NAME".`. Both mutations above then fail that test.

## F5. Some `matchBrowserOutline` exclusions and the distinct-word rule pass vacuously or have no test.

- Lens: tests; severity: low; at C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\helpers.ts:249
- Evidence: Lane: objective, test sufficiency.

The code: `matchBrowserOutline` skips a node that is ignored, has no reference, has an omitted role, or is a heading or `StaticText` (helpers.ts:246-253). It also counts distinct search words through `new Set` (helpers.ts:239).

The control at tests/src/core/helpers.test.ts:258 (`matchBrowserOutline(dialog, 'dialog')` returns []) proves only two of these exclusions: the ignored node and the heading. The `StaticText` fixture row (helpers.test.ts:223) has no reference, so `node.reference === undefined` skips it before the `StaticText` check is reached. Deleting `role === 'StaticText'` at helpers.ts:252 therefore keeps the test green. No fixture gives an omitted role (`generic`, `none`) a reference either.

Mutation on distinct words: replace the `Set` at helpers.ts:239 with an array. For 'cart cart checkout' over rows `link "Cart"` and `link "Checkout"`, the result changes from a tie ([Cart, Checkout]) to Cart alone. No case in helpers.test.ts:230-260 repeats a search word.

No case uses a non-ASCII word either, so replacing `\p{L}` in `BROWSER_SEARCH_PATTERN` with `[a-z]` goes undetected. Separately, the hard-coded `heading` and `StaticText` literals duplicate the `BROWSER_TEXT_ROLES` constant (constants.ts:380-382). That point is for the subjective lane or the Orchestrator, not this verdict.
- Fix: In tests/src/core/helpers.test.ts:
- give the `StaticText` row a reference (for example `e8`), so the text-row exclusion is what keeps it out;
- add a referenced `generic` row named 'Archive dialog' to cover the omitted roles;
- add `matchBrowserOutline(nodes, 'cart cart checkout')`, expecting both rows in document order;
- add a non-ASCII case such as a button named 'Zurück', matched by 'zurück'.
- Verifier: I'm confirming this finding. It is low severity and belongs to the objective lane (whether the tests are sufficient). I checked it against 655906b.

1. Text-row exclusion: the assertion can't fail. At C:\Users\mikes\WebstormProjects\browser-wt-browse\tests\src\core\helpers.test.ts:223 the fixture row `{ role: 'StaticText', name: 'Archive dialog button' }` has no reference. `createBrowserOutlineNodes` (tests/setup.ts:1755) passes `row.reference` through unchanged, so that row is `undefined`. In C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\helpers.ts:249, `node.reference === undefined` therefore skips the row before line 252 runs. If you delete `role === 'StaticText'` at helpers.ts:252, the test at helpers.test.ts:258-259 still passes. That test is titled "never matches ... a text row", so it breaks C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\tests.md:345: each assertion must fail for the defect it claims to catch. The guard isn't dead code. `#bind` at src/core/elements/BrowserElementManager.ts:369-389 gives a reference to any node with a backend when `css` is true, or when a registered tool targets it, whatever its role. renderBrowserOutline (helpers.ts:343) still renders a referenced StaticText row as text. So the role check is what keeps a match row consistent with what the outline renders.

2. Omitted roles: no test covers them. Every fixture row with a reference in helpers.test.ts:219-229 is a heading, button, textbox, or link. If you delete `BROWSER_OUTLINE_OMITTED_ROLES.has(role)` at helpers.ts:250, nothing fails. A grep for every other `search:` caller found BrowserElementManager.test.ts:327, BrowserDOMElementManager.test.ts:285, and service/document.test.ts:108. None of them gives a `generic` or `none` row a reference.

3. Distinct words: no test covers them. The design ruling at C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\showcase\browse\items-9-10-design.md:37 says the score counts "distinct `what` words". Every search in the tests uses each word once: 'archive dialog button', 'the Tracking number textbox', 'BUTTON', 'go to cart', 'the', 'arch', '', 'a to - !', 'dialog', 'the save button', and 'the Email textbox'. If you replace the `Set` at helpers.ts:239 with an array, repeated words count twice and nothing fails. Under that mutation, 'cart cart checkout' over `link "Cart"` and `link "Checkout"` returns Cart alone where the ruling gives a tie.

4. Non-ASCII words: no test covers them. `BROWSER_SEARCH_PATTERN` is at constants.ts:316. No case uses a letter outside ASCII, so narrowing `\p{L}` to `[a-z]` goes undetected.

What held: the control at helpers.test.ts:259 does catch two exclusions. Without the heading check, `heading "Archive dialog"` e9 would match. Without the ignored check, the ignored button e3 would match.

Required change at C:\Users\mikes\WebstormProjects\browser-wt-browse\tests\src\core\helpers.test.ts:219-260:
- Give the StaticText row a reference such as e8.
- Add a `generic` row with a reference.
- Add a search that repeats a word, such as 'cart cart checkout', and expect the tie in document order.
- Add a non-ASCII case such as a button named 'Zurück' matched by 'zurück'.
If the referenced rows go into the shared `dialog` fixture, they change what the first ranking case returns only under the mutations, which is the point.

Referred elsewhere: the `heading` and `StaticText` literals at helpers.ts:251-252 duplicate `BROWSER_TEXT_ROLES` (constants.ts:380-382). That belongs to the subjective lane or the Orchestrator, and I made no ruling on it. The design also has a premise mismatch: it says text rows "carry no reference" (items-9-10-design.md:42), but the CSS branch of `#bind` can give them one. That one is for the Orchestrator.

Verdict: CONFIRMED.

## F6. Guide still states the full tool copy bound as 5 900 after the test raised it to 6050

- Lens: contract; severity: medium; at C:\Users\mikes\WebstormProjects\browser-wt-browse\guides\browser.md:2969
- Evidence: Lane: contract, names, and prose. guides/browser.md:2969 reads 'bounds the copy a model reads ... at 3 100 characters for the journey tools plus `type`'s `secret` property and at 5 900 for the full list.' The test at tests/src/core/BrowserToolset.test.ts:793 asserts `.toBeLessThanOrEqual(6050)`. This is the writer's stated deviation, and it left the guide sentence false.
- Fix: Change '5 900' to '6 050' at guides/browser.md:2969, so the guide names the bound the vocabulary case asserts.
- Verifier: Confirmed. I reviewed this in the contract and prose lane, and the defect is real at 655906b.

1. The test moved the bound and the guide did not follow. C:\Users\mikes\WebstormProjects\browser-wt-browse\tmp\item-9.diff:1447-1448 replaces `toBeLessThanOrEqual(5900)` with `toBeLessThanOrEqual(6050)` for the 'full tool copy' soft assertion. In the worktree, tests/src/core/BrowserToolset.test.ts:793 asserts `.toBeLessThanOrEqual(6050)`. The diff has no matching change to guides/browser.md. guides/browser.md:2969 still says the vocabulary case bounds the copy "at 5 900 for the full list".

2. The journey bound still matches. guides/browser.md:2969 says 3 100 and BrowserToolset.test.ts:792 asserts 3100, so only the full-list number is stale.

3. The design gives no reason to keep 5 900. I searched C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\showcase\browse\ for 5 900, 5900, 6050, 6 050, "full list", and "full tool copy" and got no match. Nothing in the design sets 5 900 as the bound the guide must keep.

4. The law makes this a defect. AGENTS.md § Work loop step 6 requires you to update the matching guide when the code changes. .claude/rules/writing.md § Claims and time allows a guide to claim only what the reader can check. A reader who checks line 2969 against BrowserToolset.test.ts:793 gets a different number, so the sentence is false.

Required change: at guides/browser.md:2969, change "at 5 900 for the full list" to "at 6 050 for the full list". Keep the space digit separator the line already uses ("3 100"), so the guide names the bound that BrowserToolset.test.ts:793 asserts.

Attacked and held:
- I checked whether 6050 might be a temporary soft bound that the guide was meant to leave alone. Neither the design nor the diff says so, and the assertion stands at HEAD.
- I checked whether the guide sentence might describe a different measure. It names the same compact JSON copy of name, description, and input schema that `JSON.stringify(definitions).length` measures at line 793.

The only route to refuting this would be a decision to put the bound back to 5900 in the test. That is the Orchestrator's call on the writer's stated deviation, not a question for this lane.

CONFIRMED

## F7. Error-code table omits `look` as a source of BROWSER_TOOLSET_LIMIT

- Lens: contract; severity: medium; at C:\Users\mikes\WebstormProjects\browser-wt-browse\guides\browser.md:303
- Evidence: src/core/BrowserToolset.ts:789-800 (`#pageSlice`) throws `The ${name} limit of ... cannot hold the next character ...` coded BROWSER_TOOLSET_LIMIT for name 'look' as well as 'read'. guides/browser.md:303 still lists only '`read` and `journeys`' as the sources. The Receipts table also gives no row for the toolset refusal: it has only the journeys message at :2946, so the look/read message the writer changed is undocumented.
- Fix: At guides/browser.md:303, list '`look`, `read`, and `journeys`'. Add a Receipts row beside :2946: 'A `look` or `read` call whose `limit` cannot hold the next character, coded `BROWSER_TOOLSET_LIMIT`' with the text `The look limit of LIMIT characters cannot hold the next character at offset START; raise the toolset limit.` (or `read`).
- Verifier: I confirm this finding. I worked in the objective lane: guide-to-code truth at 655906b.

1. **The finding holds.** In C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\BrowserToolset.ts, `#look` calls `this.#pageSlice('look', note, slice, block)` at line 731. `#pageSlice` (lines 789-802) throws a `BrowserError` coded `BROWSER_TOOLSET_LIMIT` whenever the note and the slice are both empty and the offset is short of the total. Its message is `The ${name} limit of ... cannot hold the next character at offset ...; raise the toolset limit.`, so `look` produces this error as well as `read`.

2. **`look` can actually reach the throw.** I traced it with `limit: 1` and an outline that opens with an astral character:
   - The note is empty.
   - `room` is 1, so `half` is 0 and the match block stays empty (lines 715-724).
   - `space` is 1, so `extractBrowserSlice` returns '' because it cannot split a surrogate pair.
   - The throw then fires.

   This is the same input that tests/src/core/BrowserToolset.test.ts:5665-5682 uses for `read`. No test covers the `look` case.

3. **Item 9 introduced the gap.** C:\Users\mikes\WebstormProjects\browser-wt-browse\tmp\item-9.diff:383-394 moves the refusal out of `#read` into the shared `#pageSlice`. It also changes the text from `The read limit ... at offset ${start}` to `The ${name} limit ... at offset ${slice.offset}`.

4. **The guide was not updated.** guides/browser.md:303 still names only `read` and `journeys` as sources of `BROWSER_TOOLSET_LIMIT`. Line 303 is therefore false at 655906b, and the law requires the guide to match the code (AGENTS.md Work loop step 6, Document).

5. **The Receipts table is only half a defect.** It has a row for the `journeys` refusal at :2946 but none for `look` or `read`, and the `read` row was already missing before item 9. The section intro at :2887 does not promise to list every error message, so the missing row is a parity weakness rather than a contradiction. Line 303 is the defect.

Required changes:
- **guides/browser.md:303.** Name `look`, `read`, and `journeys` as the sources.
- **Receipts table, beside guides/browser.md:2946.** Add a row for a `look` or `read` call whose `limit` cannot hold the next character, coded `BROWSER_TOOLSET_LIMIT`, with the text `The NAME limit of LIMIT characters cannot hold the next character at offset START; raise the toolset limit.`
- **Recommended, beyond the finding:** add a `look` case beside tests/src/core/BrowserToolset.test.ts:5681.

## F8. validateBrowserToolArguments @example still quotes the old look refusal

- Lens: contract; severity: low; at C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\helpers.ts:540
- Evidence: src/core/helpers.ts:540 reads `// throws 'The look tool takes no ref parameter; call look with what.'`. After `offset` was added to BROWSER_TOOL_COPY.look (src/core/constants.ts:529-539), the refusal reads `call look with what and offset.`, as tests/src/core/BrowserToolset.test.ts:884 and the updated guide fence at guides/browser.md:687 show. The parity gate misses this because the example is untitled.
- Fix: Change the comment to `// throws 'The look tool takes no ref parameter; call look with what and offset.'`.
- Verifier: I reviewed this in the objective (contract) lane. I tried to refute the finding and could not.

The defect:
- At C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\helpers.ts:540, the `@example` on `validateBrowserToolArguments` says the call throws 'The look tool takes no ref parameter; call look with what.'
- The function builds its message at helpers.ts:551-553. It joins every key in `definition.parameters.properties` with an English list formatter (`Intl.ListFormat`, conjunction type).
- `BROWSER_TOOL_COPY.look` lists both `what` and `offset` at C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\constants.ts:531-540.
- So the example call `{ what: 'cart', ref: 'e1' }` actually throws '... call look with what and offset.'

Other sources agree with the code, not the example:
- tests/src/core/BrowserToolset.test.ts:884
- tests/guides.test.ts:70 (`UNADVERTISED_RECEIPT`)
- guides/browser.md:690 (the finding cites :687; the fence's throw line is at :690, which changes nothing)
- guides/browser.md:2883

A search for 'takes no ref parameter' (excluding tmp/) shows helpers.ts:540 is the only place still using the old wording.

Why it is a defect: the TSDoc example claims an exact output that the code no longer produces. That breaks the rule in .claude/rules/writing.md (Claims and time) to claim only what the reader can check. Item 9 also broke it: adding `offset` to look's parameters made the comment wrong, and the change did not update it. Item 9 updated the test and the guide fence, but the parity check misses this example because it is untitled, as the finding says.

To falsify the finding, `look` would need `what` as its only listed parameter, or the message would need to come from somewhere other than the parameter keys. Neither is true at the worktree's HEAD.

Required change: at src/core/helpers.ts:540, change the comment to `// throws 'The look tool takes no ref parameter; call look with what and offset.'`. Severity is low: this is comment text only, with no runtime effect.

Terminal: CONFIRMED.

## F9. boundBrowserText remarks still assign the view footer to every result that carries a view

- Lens: contract; severity: low; at C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\helpers.ts:498
- Evidence: src/core/helpers.ts:497-499 says 'the toolset passes `BROWSER_TOOL_VIEW_FOOTER` for a result that carries a view and `BROWSER_TOOL_CUT_FOOTER` for any other.' The `look` result carries the view, yet item 9 registers `look` with BROWSER_TOOL_CUT_FOOTER (src/core/BrowserToolset.ts:270). The constant's TSDoc (src/core/constants.ts:451-454) and the guide (guides/browser.md:2887) were rewritten to say 'action receipt'; this remark was not.
- Fix: Reword it to 'the toolset passes `BROWSER_TOOL_VIEW_FOOTER` for a receipt that carries a view and `BROWSER_TOOL_CUT_FOOTER` for any other', using the same scope as the constant's TSDoc.
- Verifier: Lane: objective (contract and doc truth). Ruling: CONFIRMED, low severity.

1. The remark is false at 655906b. src/core/helpers.ts:497-499 says the toolset passes `BROWSER_TOOL_VIEW_FOOTER` for a result that carries a view. src/core/BrowserToolset.ts:270 registers `look` with `BROWSER_TOOL_CUT_FOOTER`.

2. The project's own vocabulary counts `look`'s result as carrying a view:
- Before item 9, the constant's TSDoc read "a cut result that carries a view, the result of `look` and of every action" (tmp/item-9.diff:555, and the guide row at diff:32).
- guides/browser.md:2887 says `look` "captures the view afresh" and pages the outline.

3. The design makes this a defect. Ruling 6 of items-9-10-design.md:72 moves `look` to `BROWSER_TOOL_CUT_FOOTER`. Line 107 has the constant's TSDoc rescoped to "a cut action receipt". Item 9 did that rescoping in constants.ts:451-454, the BrowserToolset class TSDoc at :114-116, and guides/browser.md:226 and :2887. It left the third description of the same mapping, helpers.ts:497-499, at the old scope. That disagrees with the registration and with the other homes.

Attacked and held:
- Attack: `look` pages itself to `limit`, so `boundBrowserText` might never cut a `look` body, which would make the remark true in effect. It still fails. The remark describes what the toolset passes for each kind of result, and the toolset passes the cut footer for `look` (BrowserToolset.ts:270, :523-529). It is not an observation about which cuts happen to fire.
- Attack: "view" might mean only the receipt's appended capture. It still fails. The pre-item-9 TSDoc and the guide name `look`'s output as the view.

Required change: src/core/helpers.ts:497-499. Wrong: "`BROWSER_TOOL_VIEW_FOOTER` for a result that carries a view". Right: "the toolset passes `BROWSER_TOOL_VIEW_FOOTER` for an action receipt and `BROWSER_TOOL_CUT_FOOTER` for any other", using the scope of constants.ts:451-454.

Finding outside the claim, same kind:
- src/core/constants.ts:446-447 and guides/browser.md:225 still describe `BROWSER_TOOL_CUT_FOOTER` as ending "a cut result that carries no view". Their list (a read note, a tab list, a wait, a page tool's output, an error message) leaves out `look`, which takes that footer since item 9.
- By the reasoning in point 2, `look`'s result carries a view, so this text is now inaccurate too.
- Right looks like: "the footer of any cut result other than an action receipt", with `look`'s result added to the list or the list bounded to match the registrations at BrowserToolset.ts:270-297.

Terminal: CONFIRMED, 1 required change (helpers.ts:497-499), and 1 related finding outside the claim (constants.ts:446-447, guides/browser.md:225).

## F10. 'Action receipt' scope of BROWSER_TOOL_VIEW_FOOTER leaves out the `dialog` receipt, which also uses it

- Lens: contract; severity: low; at C:\Users\mikes\WebstormProjects\browser-wt-browse\src\core\constants.ts:452
- Evidence: src/core/constants.ts:451-454 and guides/browser.md:226, :2887, and :2927 say the footer ends 'a cut action receipt'. The class TSDoc defines the actions as '`click`, `type`, `press`, `navigate`, and `switch`' (src/core/BrowserToolset.ts:124). Yet `dialog` registers with BROWSER_TOOL_VIEW_FOOTER (src/core/BrowserToolset.ts:291), and its receipt carries a view (`renderBrowserReceipt({ action, view: ... })`). The wording before item 9 ('a cut result that carries a view') covered it.
- Fix: Say 'a cut receipt that carries a view: an action's or `dialog`'s' in the constant's TSDoc and in the guide row at :226. In the Receipts paragraph (:2887) and its table row (:2927), name `dialog` beside the actions.
- Verifier: Lane: objective (contract and guide parity). CONFIRMED, low severity. The defect is real at 655906b.

1. The code: `dialog` is registered with BROWSER_TOOL_VIEW_FOOTER (src/core/BrowserToolset.ts:291), and its receipt carries a fresh view: `renderBrowserReceipt({ action, view: (await this.#capture(...)).view })` (src/core/BrowserToolset.ts:1149). So when a `dialog` receipt is cut, it gets the view footer that names `look`.

2. The definitions: the toolset TSDoc lists the actions as `click`, `type`, `press`, `navigate`, and `switch`, which leaves out `dialog` (src/core/BrowserToolset.ts:124). Item 9 narrowed the footer's scope to 'a cut action receipt' in four places: src/core/constants.ts:452, src/core/BrowserToolset.ts:115, and guides/browser.md:226 and :2927. Before item 9, the wording was 'a cut result that carries a view', which covered `dialog` (tmp/item-9.diff:32, :248, :555).

3. Why this is a defect and not loose wording: guides/browser.md:2887 says the footer closes with BROWSER_TOOL_VIEW_FOOTER 'for an action receipt and with BROWSER_TOOL_CUT_FOOTER for any other'. The table row at guides/browser.md:2928 says 'Any other result' ends with `[... the rest was cut]`. Both statements tell the reader that a cut `dialog` receipt ends with the cut footer, but the code gives it the view footer. The guide no longer matches the code, which breaks documentation parity.

4. Attacked and held: could 'action' cover `dialog` in the journey sense? BROWSER_JOURNEY_ACTIONS (src/core/constants.ts:848-863) does list `dialog`, but it lists `wait` too, and `wait` uses the cut footer (src/core/constants.ts:446-447 names 'a wait'). So 'action receipt' is wrong under either reading.

5. On the design: items-9-10-design.md:73, :107, and :188 used the phrase 'action receipt' but never ruled on moving `dialog` off the view footer. The writer followed the design's words, and the code kept `dialog` on the view footer. The fix belongs in the prose.

Required changes:
- src/core/constants.ts:451-454 and guides/browser.md:226: name the scope as a cut receipt that carries a view, from an action or from `dialog`.
- src/core/BrowserToolset.ts:115: the same correction. The finding's fix leaves this site out.
- guides/browser.md:2887 and :2927: name `dialog` beside the actions, so that 'any other' and row :2928 no longer cover it.

## F11. Guide overclaims that every look page ends after a line break

- Lens: contract; severity: low; at C:\Users\mikes\WebstormProjects\browser-wt-browse\guides\browser.md:2887
- Evidence: guides/browser.md:2887 says a page 'ends after its last line break', and src/core/BrowserToolset.ts:117 says pages 'end at a line break'. `extractBrowserSlice` (src/core/helpers.ts:1989-1995) cuts at `offset + limit` when the window holds no line break past `offset`. A row or text line longer than the room therefore ends mid-line, and the final page ends at the count line with no break after it. The helper's own TSDoc says 'where one fits' (helpers.ts:1953).
- Fix: Write 'ends after the last line break in its window where one fits, and at the window's end otherwise' in both places.
- Verifier: Confirmed in the objective lane (contract and docs-versus-code truth) at 655906b. Item 9 adds both claims, at tmp/item-9.diff:125 for the guide and tmp/item-9.diff:255 for the class TSDoc.

The code:
- `#look` pages the outline with `extractBrowserSlice(outline.text, start, space)` (src/core/BrowserToolset.ts:730).
- `extractBrowserSlice` returns the rest of the text when the window reaches the end (src/core/helpers.ts:1986-1987).
- Otherwise it ends after a line break only when one sits at window index 1 or later, because the test is `line > 0` (helpers.ts:1991).
- When no such break exists, it hard-cuts at `offset + limit`, or one unit earlier when a surrogate pair would split (helpers.ts:1992-1995).

The claim breaks in two ways:
1. Last page: `renderBrowserOutline` builds the outline with `rows.join('\n')` and ends it with `(COUNT of TOTAL elements)` (helpers.ts:356 and 360). No line break follows that line, so the final page of every look ends without one.
2. Long rows: the toolset accepts any positive `limit` (BrowserToolset.ts:243-246), and `room` and `space` shrink further for the note and the match block (BrowserToolset.ts:711 and 726). The `page "TITLE" URL` row or a long StaticText row (helpers.ts:323 and 346) can therefore exceed `space` and end the page mid-line.

The guide therefore overclaims at guides/browser.md:2887 ("ends after its last line break"), and so does the TSDoc at src/core/BrowserToolset.ts:117 ("end at a line break"). The design at items-9-10-design.md:62 and :128 uses the same shorthand, but it says pages are cut "using the existing `extractBrowserSlice`", which has the hard-cut fallback. The law decides it: writing.md § Claims requires a claim the reader can check, and the guide must match the code. The helper's own TSDoc (helpers.ts:1953-1958) and the `markdown` TSDoc (src/core/types.ts:2328-2329) both state the fallback correctly.

Required change at guides/browser.md:2887 and src/core/BrowserToolset.ts:117: a page ends after the last line break in its window that lies past the page's start, at the window's end when no such break exists, and the last page ends at the end of the outline (for read, the end of the reading). The finding's suggested wording, "where one fits", misses the last page. Also state the past-start condition, because a break at the window's first character does not count (helpers.ts:1991).

Attacked and held:
- Whether look might use a different, row-aligned paginator: it does not. Its only slicer is at BrowserToolset.ts:730.
- Whether a minimum `limit` keeps rows from overflowing: there is none, only `limit >= 1`.
- Whether the outline text might end with a line break: it does not, because the rows are joined with no trailing break.

## F12. Code token inflected as a possessive in the added Receipts row

- Lens: contract; severity: low; at C:\Users\mikes\WebstormProjects\browser-wt-browse\guides\browser.md:2893
- Evidence: guides/browser.md:2893 reads 'share the most words with `look`'s `what`'. .claude/rules/writing.md § Tokens: 'Never inflect or pluralize a code token.'
- Fix: Write 'share the most words with the `what` parameter of a `look` call, before the view on the first page'.
- Verifier: Lane: objective (the letter of the rules). Verdict: CONFIRMED.

1. The defect is in the file. C:\Users\mikes\WebstormProjects\browser-wt-browse\guides\browser.md:2893 reads "The elements whose role and name share the most words with `look`'s `what`, before the view on the first page".
2. Item 9 added the line. C:\Users\mikes\WebstormProjects\browser-wt-browse\tmp\item-9.diff:133 shows it as a `+` row in the Receipts table, so the defect belongs to this change and did not exist before it.
3. The law applies to this file. C:\Users\mikes\WebstormProjects\browser-wt-browse\AGENTS.md:3-20 makes scaffold's `.claude/rules/` the authority. The scaffold writing rule covers guide prose. Its text at node_modules\@orkestrel\scaffold\dist\host\claude\rules\writing.md:27 (the same text as ../scaffold/.claude/rules/writing.md § Tokens, references, links) says: "Put a code token in backticks and follow it with a noun. Never inflect or pluralize a code token or use it as a verb."
4. The possessive breaks that rule. In English grammar the `'s` possessive is an inflection, so "`look`'s" inflects a code token. The construction also leaves `look` without the noun the same rule requires after a code token.

Refutation attempts:
- Does a code-identifier exemption apply? No. The exemption in the Substitutions section covers identifiers and strings inside a fence or fixture. This is prose in a table cell, outside any fence.
- Is the possessive on a plain noun rather than a token? No. Compare "the toolset's `limit`" at item-9.diff:128, which is allowed because "toolset" is not in backticks. In "`look`'s" the `'s` is attached to the backticked token itself.

The proposed fix is sound: "share the most words with the `what` parameter of a `look` call, before the view on the first page". Each token is then followed by a noun and none is inflected.

Finding outside the claim (low severity, same rule): C:\Users\mikes\WebstormProjects\browser-wt-browse\guides\browser.md, the legend sentence item 9 added (item-9.diff:128), reads "`WHAT` the `what` a `look` carried". Neither `what` nor `look` is followed by a noun. It should read "`WHAT` the `what` parameter a `look` call carried".

Terminal: CONFIRMED. The defect is real at 655906b, and scaffold writing.md:27 makes it a defect.

## F13. REFERRAL to the objective lane, not ruled here: the DOM placement may report a stale focus from an unfocused same-origin frame document

- Lens: contract; severity: referral; at C:\Users\mikes\WebstormProjects\browser-wt-browse\src\browser\elements\BrowserDOMElementManager.ts:386
- Evidence: src/browser/elements/BrowserDOMElementManager.ts:386-389 marks an element focused when `root.activeElement === element` for its own Document or ShadowRoot. A same-origin iframe's document keeps its `activeElement` after focus moves to the parent document. Proposed interleaving: focus an input inside a same-origin iframe, then focus a referenced button in the parent that precedes the iframe in document order. Both rows then carry `focused: true`, and `renderBrowserOutline` keeps the last in document order (src/core/helpers.ts:351), the stale iframe input. That contradicts the `BrowserOutline.focus` contract, 'the referenced element that has focus' (src/core/types.ts remarks at the `focus` entry). The DOMElementManager tests cover only the top document and an open shadow root (tests/src/browser/elements/BrowserDOMElementManager.test.ts:1407-1425). This is correctness under an adverse ordering, so it belongs to the objective lane.
- Fix: Objective lane: run the iframe interleaving in the `src:browser` project. If the stale row wins, count a document's active element only when the chain of frame elements up to the view's document is each parent's `activeElement`, and add that case to the DOMElementManager test.
- Verifier: Lane: objective. The finding is a referral from the contract lane, and I took it here as an adverse-ordering correctness question. I confirm it from the code and Chromium's focus behaviour. No run captures it, so the runtime half is NOT-EVIDENCED until the src:browser test below exists.

1. The defect is real at 655906b. CONFIRMED.
   - C:\Users\mikes\WebstormProjects\browser-wt-browse\src\browser\elements\BrowserDOMElementManager.ts:262-276 walks a same-origin iframe's `contentDocument.documentElement` with the same `#walk`. Each interactive element in that frame then goes through `#row`.
   - In `#row`, lines 386-389 set `focused` from `root.activeElement === element` for the element's own Document or ShadowRoot. Nothing checks that this document is the one holding focus.
   - Chromium, like Gecko, keeps a frame document's focused element when focus leaves the frame. FocusController dispatches blur and focusout and clears `:focus`, but leaves `Document::FocusedElement`, so `contentDocument.activeElement` still returns the old input.
   - Interleaving 1: focus an input in a same-origin iframe, then focus a referenced button that comes before the iframe. Both rows carry `focused: true`. src/core/helpers.ts:351 keeps the last one, so `focus` names the stale iframe input.
   - Interleaving 2 is simpler: focus the iframe input, then click the parent body. `focus` should be `undefined`, but it names the iframe input.

2. The law makes this a defect. CONFIRMED.
   - The `BrowserOutline.focus` contract at src/core/types.ts:2400-2402 says "the rendered row of the referenced element that has focus", and "`undefined` when focus is on no referenced element". Under AGENTS.md, `*/types.ts` is authoritative.
   - The design's ruling 7 names the activeElement-of-its-root mechanism (items-9-10-design.md:83) and also states "both placements still fill `BrowserOutline.focus`, so the shared contract holds" (line 81).
   - The CDP placement reads the accessibility `focused` property, which Chromium sets only on the truly focused node (design lines 28-31). So in this case the DOM placement disagrees with both the contract and its CDP sibling.
   - The design's mechanism is a proxy that breaks across frames. Matching it does not excuse breaking the type contract.

3. The tests cannot catch it. Only the top document (C:\Users\mikes\WebstormProjects\browser-wt-browse\tests\src\browser\elements\BrowserDOMElementManager.test.ts:292-299) and an open shadow root (lines 301-309) are tested. The finding cites lines 1407-1425; that range is wrong, but the substance holds. Nothing in the suite puts focus in an iframe and then moves it out, so these assertions would pass with or without the frame check.

Required change: C:\Users\mikes\WebstormProjects\browser-wt-browse\src\browser\elements\BrowserDOMElementManager.ts:386-389.
- Wrong: the element counts as focused whenever its own root's activeElement is the element.
- Right: also require that every frame between the element's document and the walked top document holds focus. Starting from `element.ownerDocument.defaultView.frameElement` and going up to `this.#input.document()`, each frame element must be the `activeElement` of its own `getRootNode()`. Use the root rather than the owner document, because a frame inside a shadow root leaves the host as the document's activeElement.
- Avoid `document.hasFocus()`. It goes false when the whole window is unfocused, and the browser test runner itself sits in an iframe.
- Add a src:browser test with these steps:
  1. Focus an input inside a same-origin iframe and expect it named.
  2. Focus a referenced button that comes before the iframe and expect the button named.
  3. Blur the button and expect `undefined`.

Attacked and held:
- The iframe element itself is never a focused row, because it has no interactive role, so it adds no row of its own.
- A focused shadow host next to its inner element is the case the design accepted, where the last row wins. It is unaffected.
- A cross-origin frame is never walked (line 269), so it cannot add a stale row.
