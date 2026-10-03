# Browse items 9 and 10: the design of record

Written 2026-10-03 by the design lane over browser `f11f821`; item 9 landed on the browser branch as `655906b` with the deviations its commit and `browse.md` name. Item 10 follows the item 10 part of this design.

I edited no repository file. The probes I ran against the real Chromium build are scratch scripts in `/tmp/claude-0/-home-user/4338f304-4fe6-5169-89e8-36562d885cad/scratchpad/ax.mjs`, `ax2.mjs`, `ax3.mjs` and `ax4.mjs`. They call `Accessibility.getFullAXTree` through `playwright-core` on `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`, which reports `Chromium 141.0.7390.37`.

# Probe findings that the rulings depend on (Chromium 141.0.7390.37)

- **`pressed`:**
  - Only role `button` gets it: `<button>`, `<input type=button>` and `role=button`.
  - Its value is a tristate string: `"true"`, `"false"` or `"mixed"`.
  - The `aria-pressed` token is matched case-insensitively and is not trimmed. `"TRUE"` gives `"true"`, while `" false "` and `"foo"` give `"true"`.
  - An empty value or the value `"undefined"` gives no property.
  - A link, tab, switch or checkbox carrying `aria-pressed` gets no property.
- **`expanded`:**
  - Its value is a boolean, and it uses the same token rules as `pressed`.
  - These roles report it: `button`, `link`, `checkbox` (native or ARIA), `switch`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `tab`, `treeitem` and `combobox`.
  - These roles never report it: `option`, `radio`, `textbox`, `searchbox`, `spinbutton`, `slider` and `listbox`.
  - A native single `<select>` always reports `expanded=false`, even when it carries `aria-expanded="true"`.
  - An `<input list>` combobox, or a `role=combobox` element without `aria-expanded`, reports nothing.
  - A `<summary>` element reports `DisclosureTriangle` with `expanded`.
- **`selected`:**
  - Its value is a boolean.
  - These roles report it: `option`, `tab`, `treeitem` (plus `gridcell` and `row`, which get no reference).
  - It is reported even when the attribute is absent; for example, `tab` and `option` with no `aria-selected` give `false`.
  - When a native `<option>` carries a valid `aria-selected`, that value overrides its selectedness: a selected option with `aria-selected="false"` reports `false`. Without the attribute it reports `option.selected`.
  - A `button`, `link`, `radio` or `checkbox` carrying `aria-selected` reports nothing. The value `"mixed"` or `"foo"` gives `true`.
- **`focused`:**
  - Its value is `true` on the focused node.
  - Inside an iframe it appears in the child frame's tree, which the CDP outline already walks (`src/core/elements/BrowserElementManager.ts:318-336`).
  - It also appears on the child frame's `RootWebArea`, which has no reference.

# Item 9: let `look` reach what its cut view leaves out (commit first)

## Rulings

1. **How `what` matches rows.** `what` is lowercased and split into whole words of at least 3 letters or digits (`/[\p{L}\p{N}]{3,}/gu`). Each referenced row's role and accessible name are split the same way. A row's score is the number of distinct `what` words equal to one of its words. Every referenced row with the highest score above 0 is a match, listed in document order, past the 150-row cap included.
   - Reason: models write phrases such as "archive dialog button" (T37) and "the Tracking number textbox" (T276). Requiring every word fails T37 ("dialog" is not in `button "Archive"`).
   - Counting any one shared word lists every button for "button". Keeping only the top score puts the Archive button (2) and the Tracking number textbox (3) alone at the head.
   - The 3-character floor drops "a", "to" and "of", which would otherwise lift "Go to top" over "Cart".
   - Words are compared whole, with no substring or prefix match, so "the" does not match "other".
   - Lowercasing makes the comparison case-insensitive. Text rows are not searched because they carry no reference.
   - I rejected stemming and stop-word lists as surplus.

2. **When nothing matches** (or `what` is not a string, or has no word of 3 characters), `look` returns the outline as it does today, with no extra line.
   - Reason: a "no match" sentence in front of a full outline can read to a small model as an empty page. The outline that follows is the answer.
   - `look` is the recovery call every refusal names, so a non-string `what` must not create a refusal path.

3. **How matches are shown.** On the first page only, before the page line, `look` prints this block:
   - the line `COUNT elements match "WHAT":` (`1 element matches` for one);
   - each match in the outline's row format;
   - then a blank line.

   The block takes at most half of the page's room, rows whole, and is omitted when its header alone does not fit. When fewer rows fit than COUNT, the gap shows it; the outline still lists every row.
   - Reason: the target's reference appears in the first lines whatever the page size.
   - Keeping the block outside the paged text makes offsets independent of `what`. A continuation then lines up even when the caller's `what` differs, such as a journey receipt's internal look versus the model's look.

4. **How paging is addressed.**
   - **Argument:** `look` gains `offset` (integer, default 0) with the same description as `read`'s: `The character to continue from, as the last reply names. Default: 0.`
   - **What it counts:** the offset counts characters of the outline text only.
   - **Cap:** `look` asks the manager for every referenced row (`limit: Number.MAX_SAFE_INTEGER` in `#look`), so the 150-row cap no longer hides rows from `look`. Receipts keep the default cap.
   - **Page ends:** each page ends after the last line break in its window, using the existing `extractBrowserSlice` (`src/core/helpers.ts:1813`).
   - **Footer:** `\n\n[characters START–END of TOTAL; call look with offset END for more]`. The last page carries `[characters START–END of TOTAL]`. A result that fits whole at offset 0 has no footer, as `read` behaves.
   - **Count line:** the closing `(COUNT of AVAILABLE elements)` line is the outline's last line, so the last page always carries it.
   - **Past the end:** an offset at or past the end restarts at 0, as `read` does.
   - **Invalid offset:** refused before capture with `BROWSER_TOOLSET_ARGUMENT`, `{ key: 'offset' }`, message `The offset parameter must be a non-negative integer.`
   - **Fresh capture each call:** each call captures afresh, with no retained text. `look` exists to give current references and state, and an unchanged page renders identical text, so line-ended pages continue exactly.
   - **Server option:** I rejected a `browse` server `limit` option. Paging restores reach, and a limit knob would only move the cut.

5. **The 4,000-character cut still applies per page.** The page body (move note, block and slice) is at most `limit` characters, with the footer after it, as `read` does at `src/core/BrowserToolset.ts:725-751`. The room is `limit - note.length`. A limit that cannot hold the next character refuses with `BROWSER_TOOLSET_LIMIT`, matching `read`'s message.

6. **The receipt footer names `look`.** `BROWSER_TOOL_VIEW_FOOTER` becomes `the rest was cut; call look with what you want to find`. `look` registers with `BROWSER_TOOL_CUT_FOOTER`, as `read` does.
   - Reason: an action receipt is still cut, and pointing to `read` sends the model to Markdown with no reference, which is the dead end in T37 and T276.

7. **Focused element in a `press` receipt.**
   - `BrowserOutline` gains a `focus` field: the row of the referenced element that has focus, rendered as `text` renders rows. It is computed over every node, so it is set past the cap, and is `undefined` when focus is on no referenced element. When several rows are focused (a shadow host and its inner element), the last one in document order wins.
   - The `press` receipt appends the clause `focus is on ROW` to its status, after any other status: `Pressed Tab; focus is on e57 button "Archive".` and `Pressed Enter; no form received the submission; focus is on e3 textbox "Search".`
   - With no focused referenced element, the receipt line is unchanged.
   - Reason: Tab and arrow presses are the only actions whose target the model cannot predict. The focused row is often past the cut (T38 to T41). Omitting the clause when nothing referenced has focus leaves navigating Enter receipts, and every existing exact receipt test, as they are; no AX fixture in `tests/` carries `focused`.
   - Only `press` gets the clause. A click focuses its own target, and `type` writes into its own control.
   - **Placements:** `press` exists only with `page` (`src/core/BrowserToolset.ts:272-281`). Both placements still fill `BrowserOutline.focus`, so the shared contract holds:
     - CDP: from the AX `focused` property.
     - DOM: an element is focused when it is the `activeElement` of its root, read from `getRootNode()` narrowed to `view.Document` or `view.ShadowRoot`, with no `as`.

8. **Replay and journeys.**
   - `look` stays a non-step tool (`src/core/constants.ts:428-432`, `src/core/constants.ts:868-871`), so `offset` is never recorded.
   - A recorded `press` step keeps its arguments (`{ key }`), and the recorder does not read receipts (`src/core/recorders/BrowserRecorder.ts:134-163`).
   - The added clause reaches only `BrowserAction.receipt` and a run step's `result` (`src/core/BrowserReplay.ts:304`), which nothing compares.
   - The journey toolset's view look (`src/core/BrowserJourneyToolset.ts:558-563`) changes `what: 'the page'` to `what: ''`. Its receipts show the view, not a search, and they gain `look`'s paging footer, which a model's `look` continues correctly because offsets ignore `what`.

## Public surface
- **`src/core/types.ts:2378-2382` (`BrowserOutlineOptions`):** add `readonly search?: string`. Rewrite the summary to "Configures an outline's element limit, optional subtree, and search", with a remarks entry for `search` stating the matching rule from ruling 1.
- **`src/core/types.ts:2384-2391` (`BrowserOutline`):** add `readonly matches: readonly string[]` and `readonly focus: string | undefined`, with remarks.
  - `matches`: the best-matching rows in document order, past `limit` included; empty without `search` or a match.
  - `focus`: as in ruling 7.
- **`src/core/types.ts:2557-2561`:** extend the `outline` TSDoc with one sentence on `search` and `focus`.
- **`src/core/constants.ts`:** add `BROWSER_SEARCH_PATTERN = /[\p{L}\p{N}]{3,}/gu`, with TSDoc that names the 3-character floor and its reason.
- **`src/core/helpers.ts`:**
  - Add the exported `renderBrowserOutlineRow(node): string`, extracted from lines 185-199.
  - Add the exported `matchBrowserOutline(nodes, search): readonly BrowserOutlineNode[]`, implementing ruling 1.
  - `renderBrowserOutline(url, title, nodes, limit, search?)` gains an optional 5th parameter and returns `matches` and `focus`. Each helper gets full TSDoc and an `@example`.
- **`src/core/constants.ts:515-526` (`BROWSER_TOOL_COPY.look`):**
  - Add `offset` with `read`'s description.
  - The `what` description becomes `What you want to find or act on; the elements that match are listed first.` (at most 100 characters).
  - The tool description stays unchanged, within its 25-word bound.
- **`src/core/constants.ts:499-513` (remarks):** replace "`look` takes `what` alone and `read` takes `what` and `offset`" with "`look` and `read` take `what` and `offset`".
- **`src/core/constants.ts:440-445`:** set the new footer text from ruling 6 and rewrite its TSDoc to say it ends a cut action receipt and names `look`.
- **No change** to `BrowserMCPServerOptions` or `src/bin/main.ts`. The server mirrors `BROWSER_TOOL_COPY` (`src/server/BrowserMCPServer.ts:36`).

## File edits (path:line)
- **`src/core/helpers.ts:150-201`:**
  - Use `renderBrowserOutlineRow` for each referenced row.
  - When `search` is given, compute `matches` with `matchBrowserOutline` over every non-ignored referenced node, independent of `limit`.
  - Compute `focus` as the last referenced node with `properties.focused === true`.
- **`src/core/elements/BrowserElementManager.ts:94-99`:** pass `options?.search` to `renderBrowserOutline`. CDP already carries `focused` (`src/core/helpers.ts:1218-1223`).
- **`src/browser/elements/BrowserDOMElementManager.ts:108`:** pass `options?.search`.
- **`src/browser/elements/BrowserDOMElementManager.ts:404`:** add `focused` to `properties`, per ruling 7.
- **`src/core/BrowserToolset.ts:683-691` (`#look`):**
  - Read `offset` and refuse an invalid one.
  - Read `what` only when it is a string.
  - Call `outline({ signal, search, limit: Number.MAX_SAFE_INTEGER })`.
  - Build the page-0 block within half the room, slice with `extractBrowserSlice`, and return `[body, footer]`.
- **`src/core/BrowserToolset.ts:693-751` (`#read`):** move the offset check and the shared range-footer code into private methods used by both `#read` and `#look`, so the refusal and the footer have one home.
- **`src/core/BrowserToolset.ts:265`:** create `look` with `BROWSER_TOOL_CUT_FOOTER`.
- **`src/core/BrowserToolset.ts:1720-1764` (`#capture`):** return `{ view: string; focus: string | undefined }` instead of a string, and update its callers at `src/core/BrowserToolset.ts:1007`, `src/core/BrowserToolset.ts:1090`, `src/core/BrowserToolset.ts:1140` and `src/core/BrowserToolset.ts:1368`.
- **`src/core/BrowserToolset.ts:1282-1371` (`#settle`):** add a trailing `focus = false` parameter. When it is `true` and the capture has a focus, append `focus is on ROW` to the status parts.
- **`src/core/BrowserToolset.ts:945-955`:** `#press` passes `true`.
- **`src/core/BrowserToolset.ts:108-117` (class TSDoc):** state that `look` and `read` return pages that end at a line break and name the next offset; that a `look` whose `what` matches lists those rows first; and that a `press` receipt names the focused referenced element.
- **`src/core/BrowserJourneyToolset.ts:560`:** `what: ''`, and update the comment at `src/core/BrowserJourneyToolset.ts:556-557`.
- **`tests/setup.ts:2576-2593`:** the manager double returns `matches: []` and `focus: undefined`.
- **`tests/setupService.ts:245-249`:** `collectOutlinePairs` counts each reference once, because a match row repeats an outline row.

## Tests that fail if the feature is removed
- **`tests/src/core/helpers.test.ts`:**
  - `matchBrowserOutline` ranks "archive dialog button" to `button "Archive"` alone over `button "Close"`.
  - "the Tracking number textbox" returns the textbox; ties stay in document order.
  - Words under 3 characters are ignored, and "the" does not match "Other".
  - Empty and wordless `search` return `[]`.
  - Control: an ignored node and a text row never match.
  - `renderBrowserOutline` with limit 1 still returns a match and a `focus` from row 3.
  - `focus` is `undefined` when only an unreferenced `RootWebArea` is focused.
  - Update the expected objects at `tests/src/core/helpers.test.ts:155-161` and `tests/src/core/helpers.test.ts:204`.
- **`tests/src/core/BrowserToolset.test.ts` (scripted CDP fixture):**
  - Line 866-869: `look` properties equal `['what', 'offset']`, and the refusal reads `call look with what and offset.`
  - Line 4463: `look` at limit 64 ends with `call look with offset N for more]`, and a click receipt cut at limit 64 ends with the new view footer. Line 4767 is updated the same way.
  - Paging:
    - Pages joined by their footers' offsets equal `outline({ limit: Number.MAX_SAFE_INTEGER }).text`.
    - Every body is at most the limit, and the last page ends `(N of N elements)` with no "for more".
    - A fixture with 160 buttons lists `e160` on a later page, while `page.elements.outline()` still caps at 150 (control).
    - An offset past the end restarts at 0.
    - An offset of `-1`, `1.5` or `'3'` refuses `BROWSER_TOOLSET_ARGUMENT` `{ key: 'offset' }`, and the transport records no capture.
  - Block:
    - It appears on offset 0 only.
    - Page 1 is byte-equal for two different `what` values.
    - The block is at most half the room.
    - A non-string `what` returns the plain outline.
  - Press focus, with an AX fixture node carrying `focused` on row 180 of 200: the receipt line is `Pressed Tab; focus is on e180 button "…".`. Controls: no focused node gives `Pressed Tab.`; only `RootWebArea` focused gives `Pressed Tab.`
- **`tests/src/browser/elements/BrowserDOMElementManager.test.ts` (real Chromium, `src:browser`):**
  - `outline({ search })` returns `matches` past `limit: 1`.
  - `focus` names the button after `button.focus()` and is `undefined` after `blur()`.
  - An inner element focused in an open shadow root is named.
- **`tests/service/toolset.test.ts` (real Chromium, CDP placement):**
  - On a fixture page with more than 4,000 characters of text before a `Tracking number` textbox, `look { what: 'the Tracking number textbox' }` opens with `1 element matches` and the row. Its reference types into the field, and `page.evaluate` reads the value back. Control: a `what` with no shared word returns text starting `page "`.
  - The same page pages through to its count line.
  - Two Tab presses name the second focusable element with the reference `requireOutlineReference` resolves, and `document.activeElement` read through `page.evaluate` agrees.
  - The existing `toolset.test.ts:360`, which asserts `look === outline().text`, still holds and guards against an unrequested block.
- **`tests/service/document.test.ts` (DOM against CDP on one page):**
  - The DOM look with `what: 'Gift wrap checkbox'` lists the same match pairs as `page.elements.outline({ search })`.
  - The existing case at `tests/service/document.test.ts:93-104` keeps passing through the deduplicating `collectOutlinePairs`.
- **`tests/guides.test.ts:70`:** `UNADVERTISED_RECEIPT` becomes `The look tool takes no ref parameter; call look with what and offset.`
- **Journeys:** run `tests/src/core/BrowserJourneyToolset.test.ts`, `tests/src/core/BrowserReplay.test.ts`, `tests/src/core/recorders/*` and `tests/service/journey.test.ts` unchanged as the replay and journey regression check.

## Guide edits (`guides/browser.md`)
- **Constants table (line 211 onward):** add a `BROWSER_SEARCH_PATTERN` row, and rewrite the `BROWSER_TOOL_VIEW_FOOTER` row at line 225.
- **Helpers table (lines 381-389):** add `matchBrowserOutline` and `renderBrowserOutlineRow` rows, and update the `renderBrowserOutline` row.
- **Line 687:** the `validateBrowserToolArguments` comment becomes `call look with what and offset.`
- **Line 690:** the return comment becomes `{ url, title, text, count, total, matches, focus }`.
- **Lines 1092-1093 and 1738:** the `BrowserOutlineOptions`, `BrowserOutline` and `outline` rows mirror the TSDoc summaries.
- **Line 1898:** the toolset paragraph says `look` and `read` page by offset rather than being cut.
- **Line 2862:** the `look` Parameters cell becomes `` `what` (string, required), `offset` (integer, default 0) ``.
- **Lines 2880 and 2919:** the receipt becomes `call look with what and offset.`
- **Line 2884:** add one sentence on `look` paging, ruling 4.
- **Line 2890:** the first-line row notes that the matches block precedes it.
- **Receipts table:** add rows for:
  - `COUNT elements match "WHAT":`, followed by rows;
  - `[characters START–END of TOTAL; call look with offset END for more]`;
  - `Pressed KEY; focus is on REF ROLE "NAME".`, next to line 2900.
- **Line 2921:** becomes "An action receipt cut at the limit" with the new footer text.

## ROADMAP.md (same commit)
- Delete line 6 (item 9).
- In item 11 (line 8), delete the clause "but is cut at 4,000 characters with no offset, and its footer names `read` as the call for the page's text (`src/core/constants.ts:384`, `src/core/constants.ts:445`)", which item 9 makes false.
- Re-verify and correct every path:line in items 11 and 12 that this edit shifts:
  - `src/core/helpers.ts:168`, `src/core/helpers.ts:2619-2620`;
  - `src/core/constants.ts:605-619` (moves when `offset` is added to `look`);
  - `src/core/BrowserToolset.ts:1017-1056`, `src/core/BrowserToolset.ts:1043-1052`;
  - `guides/browser.md:1671`, `guides/browser.md:2057`, `guides/browser.md:2088`.

## Consequences to carry
- The ollama store proof seeds `look { what: 'the page' }`. Its view gains a block if a store row's role or name has the whole word "the" or "page", so its next re-pin must read that result.
- Every `look` on a page with more than 150 referenced rows lists all of them across its pages.

# Item 10: pressed, expanded, and selected on the outline row (commit second, after item 9)

## Rulings
1. **Row format and order:** `REF ROLE "NAME" value="V" pressed=P expanded=E selected=S [checked] [disabled] [tool=NAME]`.
   - `pressed` is `true`, `false` or `mixed`; `expanded` and `selected` are `true` or `false`. All are bare tokens, each present only when the node carries the property, `false` included.
   - Reason: the `key=value` states sit together after `value=`, and the bracket flags stay last in their order today, so existing rows and their assertions keep their suffixes.
   - The renderer writes `String(value)` for a string or boolean property, so it is the same for both placements.
   - The change lives in `renderBrowserOutlineRow`, item 9's helper, so the outline, the `look` matches and the `press` focus clause all carry the states.
2. **CDP placement:** no capture change. `readBrowserAccessibility` already keeps `pressed` as a tristate string and `expanded` and `selected` as booleans (`src/core/helpers.ts:1218-1223`), and only referenced rows render.
3. **DOM placement:** follow the probed Chromium mapping, so that both placements agree on the same markup.
   - **Token reading:** an ARIA token is read lowercased and not trimmed. An empty value or `undefined` counts as absent.
   - **`pressed`:** only for role `button`. `false` gives `'false'`, `mixed` gives `'mixed'`, any other value gives `'true'`.
   - **`expanded`:** a native single `<select>` (combobox role) is always `false`. For the roles in `BROWSER_EXPANDED_ROLES`, the value is the token not equal to `false`. Those roles are `button`, `link`, `checkbox`, `switch`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `tab`, `treeitem` and `combobox`.
   - **`selected`:** for the roles in `BROWSER_SELECTED_ROLES` (`option`, `tab` and `treeitem`): a valid `aria-selected` token gives the token not equal to `false`; otherwise an `HTMLOptionElement` gives `option.selected`; otherwise `false`.
   - **`<details>`/`<summary>`: not read.** The DOM placement gives `summary` no role and so no row (`src/browser/constants.ts:21-81` has no `summary`), while CDP lists a `DisclosureTriangle` row. That role gap predates this item and is outside it.
   - **`option.selected`: read**, because CDP reports native options' selectedness, including the `aria-selected` override.
4. **Which roles get which state:** these come out of rulings 2 and 3. `pressed` goes on `button` only; `expanded` and `selected` go on the role sets that rule 3 names, matching what Chromium reports.

## Public surface
- **`src/browser/constants.ts`** (after line 136): add `BROWSER_EXPANDED_ROLES` and `BROWSER_SELECTED_ROLES`, as `ReadonlySet<string>` frozen like their siblings. TSDoc names Chromium 141.0.7390.37 as the reading behind each set.
- **`src/browser/helpers.ts`** (after line 656, so the `src/browser/helpers.ts:46` citation in item 11 does not move):
  - Add the exported `readBrowserToken(element, attribute): string | undefined`, which returns the lowercased token or `undefined` for null, empty or `undefined`.
  - Add the exported `readBrowserStates(element, role): Readonly<Record<string, string | boolean>>`, which returns `pressed`, `expanded` and `selected` per ruling 3.
  - Each gets full TSDoc with an `@example`.
- No core type changes. `BrowserAXNode.properties` already holds unknown values (`src/core/types.ts:600`).

## File edits (path:line)
- **`src/core/helpers.ts`** (`renderBrowserOutlineRow`, which was lines 185-199 before item 9): after `value=`, append ` pressed=…`, ` expanded=…` and ` selected=…` in that order when the property is a string or boolean.
- **`src/browser/elements/BrowserDOMElementManager.ts:404`:** `properties: { checked, disabled: …, focused, ...readBrowserStates(element, role) }`.
- **`src/browser/elements/BrowserDOMElementManager.ts:44-66`:** class TSDoc gets one sentence that the manager reads the three states the way Chromium's tree reports them.

## Tests that fail if the feature is removed
- **`tests/src/core/helpers.test.ts`:**
  - `renderBrowserOutline` over nodes with `{ pressed: 'false' }`, `{ pressed: 'mixed', expanded: false }`, `{ selected: true }` and `{ checked: 'true', disabled: true }` renders `pressed=false`, `pressed=mixed expanded=false`, `selected=true` and `[checked] [disabled]`, in the order of ruling 1.
  - Control: a node with no properties renders no suffix.
- **`tests/src/browser/helpers.test.ts` (real Chromium DOM):** `readBrowserStates` and `readBrowserToken` over the probe matrix:
  - `aria-pressed` set to `true`, `false`, `mixed`, `TRUE`, `""`, `undefined` and `foo`;
  - `aria-pressed` on a link (none);
  - `aria-expanded` on button, link, tab and combobox input, and on radio and textbox (none);
  - a native `<select aria-expanded="true">`, which gives `false`;
  - a tab without `aria-selected`, which gives `false`;
  - a native option with an `aria-selected` override;
  - a radio with `aria-selected` (none).
- **`tests/src/browser/elements/BrowserDOMElementManager.test.ts`:**
  - Update lines 105-110 and 127-133: the combobox row gains `expanded=false`; the option rows gain `selected=false`, `selected=true` and `selected=false [disabled]`.
  - Add a case with buttons for veneer-style `aria-pressed="true"` and `"false"`: the rows carry `pressed=true` and `pressed=false`, and a plain button carries none.
- **`tests/service/toolset.test.ts:343-357` (real CDP):** the expected `form` rows gain `expanded=false` on `combobox "Speed"`, `selected=true` on `option "Standard"` and `selected=false` on `option "Express"`. Add an `aria-pressed` and `aria-expanded` CDP case with a plain-button control.
- **`tests/service/document.test.ts` (both placements on one page):**
  - Add a "with toggle states appended to the document page" block. It appends pressed true/false/mixed buttons, an `aria-expanded` button and link, a tablist with and without `aria-selected`, and a native select with an `aria-selected` override.
  - It asserts that the DOM look's element rows, with references stripped and sorted, equal the CDP outline's. This uses an added `collectOutlineEntries` helper in `tests/setupService.ts` next to `collectOutlinePairs` at line 245.
  - The block first establishes, as a precondition, that the CDP rows carry each state.

## Guide edits
- **`guides/browser.md:2891`:** ``` `REF ROLE "NAME"` with `value="…"`, `pressed=true|false|mixed`, `expanded=true|false`, `selected=true|false`, `[checked]`, `[disabled]`, or `[tool=NAME]` after it, in that order ```.
- **Browser constants table (`guides/browser.md:1426-1429`):** add `BROWSER_EXPANDED_ROLES` and `BROWSER_SELECTED_ROLES` rows.
- **Browser helpers table (`guides/browser.md:1444-1458`):** add `readBrowserStates` and `readBrowserToken` rows.

## ROADMAP.md (same commit)
- Delete item 10 (`ROADMAP.md:7` before item 9's commit).
- Re-verify the path:line citations in items 11 and 12 that this commit shifts, which are `src/core/helpers.ts` and `guides/browser.md`.

## Consequence to carry
Every option row of a native select gains `selected=false` or `selected=true`, as the item asks. A long select spends more of a receipt's 4,000 characters, which item 9's paging makes reachable.
