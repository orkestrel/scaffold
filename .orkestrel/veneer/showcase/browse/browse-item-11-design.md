Lane: objective. It covers correctness, what Chromium and the contracts permit, whether each proof can fail, and the letter of the rules. Worktree `C:\Users\mikes\WebstormProjects\browser-wt-browse` at `655906b`; every `path:line` below is relative to it. Scaffold rules are read from `C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\`.

## Verdicts

1. **Ruling 1 (the rule lives in the capture, in both placements): CONFIRMED.**
   - Attack: the change could reach caller HTML. It can't: `createBrowserReading` and `BrowserReading` (`src/core/BrowserReading.ts:40-46`) parse whatever input they get.
   - All four capture paths feed `readBrowserCapture` (`src/browser/BrowserDOMView.ts:103`, `src/browser/elements/BrowserDOMElement.ts:140`) or `compileReadFunction` (`src/core/BrowserFrame.ts:108-109`, `src/core/elements/BrowserPageElement.ts:107`).

2. **Ruling 2 (inert copy, live DOM never written): BROKEN as a contract.** The logic holds.
   - Copy mechanics hold:
     - `importNode` copies light children one for one.
     - The descending loop removes only indices it has already visited.
     - `getComputedStyle` runs no page script.
     - The copy belongs to another document, so a page `MutationObserver` on `document` records nothing.
   - What breaks: the TSDoc promises "nothing in the copy loads or runs", but nothing gates that promise.
     - P2 is never promoted into a test (`tests.md` "Promote or delete").
     - The CDP placement has no network recorder at all.
     - `documentation.md` § Parity requires an executed assertion behind a prose claim about behavior.
   - P2 also never names the isolated world, which is where the CDP copy runs (`src/core/BrowserFrame.ts:101-104`).
   - P2's fixture lacks `<picture><source srcset>` and `<video poster>`. Both start a fetch from an attribute while detached.

3. **Ruling 3 (what gets removed): BROKEN.**
   - **Shadow-host text.** The P3 bullet removes element children only. An unassigned text child of a host (`<x-card>Unslotted note</x-card>` with a named-slot-only shadow root) renders nothing and stays. `Text.assignedSlot` exists, so the rule can name "child node".
   - **Slotted content under a hidden shadow part.** A slotted child whose slot sits under a `display:none` element in the shadow tree keeps its own computed `display` (`display` does not inherit), so it stays. `innerText` drops it. P3 does not probe this case and no rule covers it.
   - **Fallback content.** "Nothing else removes content" has no probe for replaced-element fallback. `<canvas>Chart of monthly orders</canvas>` is not rendered while scripting runs, yet its computed `display` is not `none`, so `read` keeps text that `wait` cannot match. The same question applies to `video`, `audio`, `iframe`, and `object` children.
   - **Moot justification.** "A disconnected element reads `''`" cannot happen in the walk. Ruling 4 copies a disconnected root before any style read, and every node the walk visits is connected. The `hidden`/`collapse` pair is equal to "not `visible`" there.

4. **Ruling 4 (roots with no layout are copied whole): CONFIRMED.**
   - `tests/src/browser/helpers.test.ts:386-406` builds disconnected paragraphs in `createHTMLDocument('t')`, a document with no window.
   - Mutation: delete the whole-copy branch. Those cases then hit `getComputedStyle` on `null` and fail, so the tests can tell the difference.

5. **Ruling 5 (content not laid out depends on P1): UNRESOLVED, and partly unruled.**
   - No ruling covers P1 showing that `innerText` omits offscreen `content-visibility: auto` content. That outcome would contradict ruling 3's "removes nothing" against the item's goal that `read` and `wait` agree.
   - P1 has no control for `content-visibility: hidden`.
   - P1 never probes the claim in the Alternatives section that `innerText` includes `option` text. Only the comment at `src/browser/helpers.ts:383-389` backs it.
   - No rule that P1 adds is promoted into a test.

6. **Ruling 6 (each placement implements the rule once; parity guards drift): BROKEN.**
   - **Ancestor walk untested in CDP.** The parity block compares document-root reads of one fixture. The CDP ancestor walk (a hidden ancestor, a shadow-host step) has no CDP test. Mutation: drop the `.host` step from the compiled loop. Every listed test still passes.
   - **Duplication.** The DOM walk duplicates `readBrowserParent` (`src/browser/helpers.ts:437-444`). That function already follows the assigned slot, then the parent element, then the shadow host. It adds `frameElement`, which a document-boundary stop cuts off. `AGENTS.md` requires reuse, and reuse is not ruled.
   - **Incomplete rejection reason.** Hosting the walk in core is also barred because core's lib is `ESNext` plus `WebWorker`, with no DOM types (`configs/src/tsconfig.core.json:4`).

7. **Ruling 7 (no new export): CONFIRMED.** This is a one-use fold with no public type added.

8. **Ruling 8 (the rule's single home is `BrowserReadingInput`): CONFIRMED.** `src/core/types.ts:2287-2298` is the input contract every capture produces.

9. **Ruling 9 (no tool-copy change): CONFIRMED.**
   - `src/core/constants.ts:548` stays true.
   - `src/core/constants.ts:563` is `pure: true`.
   - `BrowserToolset.ts` is untouched.

10. **Ruling 10 (the limit is measured on the pruned capture): CONFIRMED in the code path; the proof is missing.**
    - The guard measures `capture` after the walk (`src/core/compilers.ts:405`), and the DOM placement measures after building it (`src/browser/helpers.ts:47`).
    - No test reads a page whose raw markup exceeds `BROWSER_RESULT_LIMIT` but whose rendered markup fits. Mutation: measure `root.outerHTML` before pruning. Nothing notices.

11. **The `tests/src/core/compilers.test.ts:155-168` replacement: BROKEN.**
    - The replacement passes an explicit disconnected root.
    - The default-parameter path, which the frame read uses (`src/core/BrowserFrame.ts:109`, which calls `()`), then has no unit case.
    - Mutation: change the default to `null`. Only service tests notice.
    - Keep a default-root case with `documentElement: { isConnected: true, outerHTML, ownerDocument: { defaultView: null } }`.

12. **The element `read` test ("omits the child's text"): BROKEN, because it can pass vacuously.**
    - Mutation: call `(${compileReadFunction()})()` without `this`. The function then reads the whole document, whose pruned markup also omits the hidden child, so the test passes.
    - Assert that text outside the region (`Order summary shown`) is absent.

13. **ROADMAP re-verification: BROKEN.**
    - Deleting `src/core/elements/BrowserPageElement.ts:108` moves `#pointer`, which `ROADMAP.md:5` (item 8) cites as `src/core/elements/BrowserPageElement.ts:361-381` (verified at 361), up one line to 360-380.
    - The design re-verifies only item 12.

14. **"Regression runs unchanged" for `tests/src/core/elements/BrowserPageElement.test.ts:56-76`: holds only by an unstated coupling.** See F1.

15. **The guide edits: CONFIRMED in place.** The rows at :379, :1445, :1638, :1673, :1708, :1773, :1808, and :2821 mirror the TSDoc.
    - The handoff of the `wait` rows (:1674, :1694, :2822) to item 12 is unowned. `ROADMAP.md:8` gives item 12 no wording scope.

16. **Tensions: BROKEN by the letter.**
    - They use `should`, which `writing.md` § Substitutions bans.
    - They leave options unruled, against "Rule on every option you list".

17. **Measurements: UNRESOLVED.** The `read` latency measurement is listed as missing but belongs to no unit. Nothing in the design orders it to run.

18. **Probe placement: BROKEN against `tests.md:38`.**
    - The probes run in the `probe` project, which launches the system Chromium (`vite.config.ts:430-438`).
    - The DOM placement's tests run on Playwright's Chromium (`vite.config.ts:183-186`).
    - Expected values that the helpers tests hard-code from one build's probe results describe that build only. Assert against `innerText` read at runtime instead.

## Findings outside the claims

- **F1.** `tests/setup.ts:2147` recognizes the element read by `declaration.includes('capture.html')`.
  - After line 108 is deleted, the match survives only because the compiled read body contains the token `capture.html`.
  - The design tells the writer to "adapt" that body, and a rename breaks the scripted fixture.
  - Fix: match `declaration.includes(compileReadFunction())`, and add `test:setup` to U2's runs.
- **F2.** Consequences the design leaves out:
  - **Public `html` handle.** Every body-level `script`, `style`, `template`, and `noscript` drops out of `reading.html` (`src/core/types.ts:2325`) and out of `distill: false`. Their computed `display` is `none`.
  - **Pages that hide until hydration.** A page with `visibility: hidden` on `html` reads with no text until it reveals itself.
  - **XML documents.** An XML document's root now serializes as HTML, because the copy belongs to an HTML document.
- **F3.** U2's runs omit `test:setup`, which F1 needs, and the bench that measurement 17 needs.

## Attacked and held

- **Index alignment.** `importNode` cannot reorder light children. A cloneable shadow root is not in `childNodes`, and `template` content is not either. The walk is synchronous.
- **Retained readings.** A continuation reuses the retained reading (`src/core/BrowserToolset.ts:745-754`), so pruning cannot desynchronize offsets.
- **Fixture matches.** `includes(compileReadFunction())` still matches in `tests/src/core/BrowserFrame.test.ts` and `tests/src/core/BrowserPage.test.ts`. `includes('outerHTML')` still matches in `tests/src/core/BrowserToolset.test.ts` and `tests/setup.test.ts:292`.
- **Oversized read.** `tests/service/browser.test.ts:308-341` keeps refusing, because its oversized `div` is visible.
- **`head` exception.** `head` computes `display: none`, and keeping it whole leaves `title` and `meta` intact.
- **Narrowing without `as`.** `view.Element` and `view.ShadowRoot` narrow, and `importNode<T>` returns `T`.
- **Item 12 citations.** `src/core/compilers.ts:66` and `src/core/constants.ts:622-636` do not move. The guide edits are in place.
- **Existing probe page.** The `Footer chrome` assertions in `tests/src/browser/BrowserDOMView.test.ts:22-24` survive. The footer at `tests/setupBrowser.ts:27` is visible, and the probe iframe is not hidden.
- **Alt text precondition.** An `img` `alt` does reach the Markdown (`node_modules/@orkestrel/markdown/dist/src/core/index.js:2935-2946`), so the hidden-`alt` case can fail. It still needs a visible twin as a precondition.

---

## Corrected design

### Design

Lane: objective. The design builds on the tree at `655906b`. It lands after item 10, as `browse.md:38-39` orders.

### Item 11: let `read` return the rendered text only (one commit, after item 10)

#### Probes the writer runs first

All probes go in one file, `tmp/probes/read-rendered.test.ts`, under the `probe` project (`npm run test:probe`). Each probe launches the system Chromium the way `tests/service/browser.test.ts:322-333` does, and records `browser.version` first. Each probe evaluates in the main world, then again in an isolated world created with `Page.createIsolatedWorld`, which is where the CDP capture runs (`src/core/BrowserFrame.ts:101-116`).

- **P1: does `innerText` include content that is not laid out?**
  - Fixture, one phrase per case:
    - a closed `<details>` with `Summary label` and `Closed details body`;
    - a `content-visibility:hidden` block, `Skipped contents`;
    - a `content-visibility:auto` block 5,000 px below the fold, `Auto offscreen`;
    - a `hidden="until-found"` block;
    - a drop-down `<select>` with `<option>Option label kept</option>`;
    - `<canvas>Canvas fallback</canvas>`;
    - `<video>Video fallback</video>`;
    - `<iframe>Iframe fallback</iframe>`;
    - a `textarea` holding `Draft area`.
  - For each case, read `document.body.innerText` and `getComputedStyle(element).display`.
  - Controls:
    - an open `<details>` shows its body;
    - a `content-visibility:visible` twin shows `Skipped contents twin`.
  - Ruling 5 takes the result.
- **P2: does importing the root into a document without a window cause side effects?**
  - Fixture: a fresh-URL `<img>`, `<img srcset>`, `<picture><source srcset>`, `<video src poster>`, `<audio src>`, `<input type=image>`, `<object data>`, a body `<link rel=preload>`, and a custom element whose constructor increments `window.count`.
  - Record `Network.requestWillBeSent`, then evaluate `document.implementation.createHTMLDocument('').importNode(document.documentElement, true)` in both worlds.
  - Expected: no request, and `count` unchanged.
  - Control: `document.documentElement.cloneNode(true)` with fresh URLs records requests and increments `count`.
  - Stop condition: any request or constructor run stops the item and gets reported. No fallback is ruled.
- **P3: shadow trees.**
  - Fixture: an open shadow root with one named slot inside a `display:none` wrapper and one named slot outside it. The host's light children are:
    - a child assigned to the outer slot, `Slotted shown`;
    - a child assigned to the hidden slot, `Slotted hidden`;
    - an unassigned element, `Unslotted element`;
    - an unassigned text node, `Unslotted text`.
  - Read `innerText`, and `getComputedStyle(child).display` for each element.
  - Control: `Slotted shown` appears in `innerText`.
  - Also record whether `innerText` includes the shadow tree's own text, for the consequence in F-shadow.
- **Bench B0 (before):** median and spread of 5 `page.read()` runs on veneer's showcase, through a guarded `bench` block (`npm run test:bench`).

Record each result with its Chromium version in `browse.md`. Also record the version of the Playwright Chromium that `test:src:browser` runs. Delete the probe file after promotion, per `tests.md` "Promote or delete".

#### Rulings

1. **Where the rule lives: in the capture, in both placements.**
   - It applies to `compileReadFunction` (CDP) and `readBrowserCapture` (DOM).
   - `BrowserReading` and `createBrowserReading` over caller HTML stay as they are.
   - Rejected: a projection-time option, because the layout is gone by then.
   - Rejected: a `rendered` capture flag, because it would split what a reading means.
2. **How the markup is built: an inert copy, pruned.**
   - Import the root into `root.ownerDocument.implementation.createHTMLDocument('')`.
   - Walk the live tree and the copy in step by child index, highest index first, and remove from the copy only.
   - Serialize `copy.outerHTML`.
   - The live DOM is never written (`src/core/constants.ts:563`).
3. **What gets removed, checked against the live document.**
   - **Hidden root.** The HTML is empty when the root, or a flat-tree ancestor in its own document, computes `display: none`. The ancestor walk follows the assigned slot, then the parent element, then the shadow host, and never crosses a frame boundary.
   - **Hidden descendant.** A descendant element that computes `display: none` is removed with its subtree. The exception is the `head` of a document root, which is kept whole.
   - **Invisible text.** A text node whose parent computes `visibility` `hidden` or `collapse` is removed. The pair equals "not `visible`" for every connected node.
   - **Invisible empty element.** An element with that `visibility` and no child nodes is removed. An element with children is kept, because a descendant can be visible.
   - **Shadow hosts (P3).** For a live element with an open `shadowRoot`:
     - a child node (element or text) whose `assignedSlot` is `null` is removed;
     - a child whose assigned slot has a flat-tree ancestor below the host that computes `display: none` is removed.
     - If P3 shows that `innerText` keeps either case, drop that clause.
   - **Nothing else removes content.** Opacity, clipping, size, and position remove nothing.
4. **Roots with no layout are copied whole.** That covers a root whose document has no window and a root that is not connected.
5. **P1 outcomes, each ruled both ways.**
   - **Closed `details`.** If `innerText` omits the body, a `details` without `open` keeps only its first `summary` child. Otherwise, add nothing.
   - **`content-visibility: hidden`.** If `innerText` omits it, an element with that computed value keeps itself and drops its child nodes. Otherwise, add nothing.
   - **`content-visibility: auto`.** Kept in either outcome, because the content renders when scrolled to. If `innerText` omits it, record the divergence under Consequences.
   - **`canvas`, `video`, `audio`, and `iframe` children.** For each element type whose fallback `innerText` omits, drop that element's child nodes.
   - **`option`.** If its computed `display` is `none` while `innerText` includes it, keep the children of a `select` regardless. Otherwise, add nothing.
   - **`textarea`.** Data only. Its child is its default value, and the rule does not change it.
   - **`hidden="until-found"`.** Distill drops it whatever P1 shows (`node_modules/@orkestrel/html/dist/src/core/index.js:5257`).
6. **Each placement implements the rule once.**
   - CDP holds the rule in the compiled string. The function takes an optional root (default `document.documentElement`), and `BrowserPageElement.read` passes `this`.
   - DOM holds the rule in TypeScript inside `readBrowserCapture`, with an explicit stack.
   - The DOM ancestor walk reuses `readBrowserParent` (`src/browser/helpers.ts:437`) and stops when the parent's `ownerDocument` differs from the root's.
   - Rejected: `matchesBrowserHidden` (`src/browser/helpers.ts:346-351`), because it counts the `hidden` attribute and `aria-hidden`, which `innerText` ignores.
   - Rejected: hosting the walk in core and stringifying it, because core has no DOM lib (`configs/src/tsconfig.core.json:4`).
   - Rejected: CDP running browser code, because core imports no browser code (`AGENTS.md` § Project model).
   - Drift between the placements is guarded by the parity block and by the mirrored CDP and DOM cases listed later.
7. **No new export.**
8. **The rule's single home is `BrowserReadingInput`'s TSDoc.**
9. **No change to the tool copy, the toolset, `wait`, or the receipts code.**
10. **The result limit is measured on the pruned capture,** in both placements, and a test proves it.

#### Public surface (TSDoc as it would land)

The `BrowserReadingInput` (`src/core/types.ts:2287-2298`), view `read` (:2631-2634), frame `read` (:3049-3055), `compileReadFunction` (`src/core/compilers.ts:408-418`), and `readBrowserCapture` (`src/browser/helpers.ts:29-43`) blocks stay as in the original design, with these changes:

- **Shadow-host bullet.** It reads: "A child node of an element with an open shadow root is removed when no slot takes it or when its slot sits under an element whose computed `display` is `none`."
  - Keep it only if P3 calls for it.
- **P1 bullets.** Add each P1 bullet that ruling 5 adds.
- **Drop the disconnected justification.**
- **Inert-copy sentence.** Keep "so that nothing in the copy loads or runs", gated by the promoted P2 tests.
- **Element `read` (:2536-2539).** It reads: `Captures the element's rendered markup with its document's URL and title as a reading whose stale flag tracks later navigations of that document; BrowserReadingInput defines the rendered markup.`

#### File edits (path:line)

- **`src/core/compilers.ts:419-424`:** the following body. It reads each element's style once. The writer adds the ruled P1 and P3 clauses inside the loop.

```js
function(root = document.documentElement) {
	const capture = { url: location.href, title: document.title, html: '' }
	if (!root) return capture
	const view = root.ownerDocument.defaultView
	if (view === null || !root.isConnected) { capture.html = root.outerHTML; return capture }
	for (let node = root; node; node = node.assignedSlot ?? node.parentElement ?? (node.parentNode instanceof view.ShadowRoot ? node.parentNode.host : null))
		if (view.getComputedStyle(node).display === 'none') return capture
	const head = root === root.ownerDocument.documentElement ? root.ownerDocument.head : null
	const copy = root.ownerDocument.implementation.createHTMLDocument('').importNode(root, true)
	const top = view.getComputedStyle(root).visibility
	const pending = [[root, copy, top === 'hidden' || top === 'collapse']]
	while (pending.length > 0) {
		const [live, twin, invisible] = pending.pop()
		for (let index = live.childNodes.length - 1; index >= 0; index -= 1) {
			const child = live.childNodes[index]
			const mirror = twin.childNodes[index]
			if (child.nodeType === 3) { if (invisible) mirror.remove(); continue }
			if (child.nodeType !== 1 || child === head) continue
			const style = view.getComputedStyle(child)
			const hidden = style.visibility === 'hidden' || style.visibility === 'collapse'
			if (style.display === 'none' || (hidden && !child.hasChildNodes())) { mirror.remove(); continue }
			pending.push([child, mirror, hidden])
		}
	}
	capture.html = copy.outerHTML
	return capture
}
```

- **`src/core/elements/BrowserPageElement.ts:106-109`:** call `(${compileReadFunction()})(this)` and delete line 108.
- **`src/browser/helpers.ts:44-55`:** apply the same rule in TypeScript.
  - Walk ancestors with `readBrowserParent`, stopping at the document boundary.
  - Narrow with `view.Element`, `view.Node.TEXT_NODE`, and `view.ShadowRoot`.
  - Guard `childNodes[index]` against `undefined`.
  - Measure `JSON.stringify({ url, title, html })` after the walk.
- **`tests/setup.ts:2147`:** match `declaration.includes(compileReadFunction())` in place of `'capture.html'`.
- **`tests/src/core/compilers.test.ts:155-168`:** two cases.
  - Default root: a `documentElement` stub with `{ isConnected: true, outerHTML: '<html><body>Notes</body></html>', ownerDocument: { defaultView: null } }` copies whole, called with no argument.
  - Explicit root: a stub with `{ isConnected: false, outerHTML: '<p>Notes</p>', ownerDocument: { defaultView: {} } }` is passed as the argument.
  - Keep the null-root case at 170-179.
  - These are wiring cases. The real-Chromium tests carry the rule.
- **No change:** `src/core/BrowserFrame.ts:105-111`, `src/browser/BrowserDOMView.ts:99-106`, and `src/browser/elements/BrowserDOMElement.ts:138-141`.

#### Tests that fail if the feature is removed

The shared fixture `RENDERED_PAGE` is styled by a stylesheet. It holds:

- `Order summary shown`;
- a toast hidden by `.toast:not(.show){display:none}`, `Toast body dismissed`;
- a `display:none` tab pane, `Notes pane inactive`;
- an offcanvas with `visibility:hidden`, `Offcanvas title closed`, containing:
  - a `visibility:visible` span, `Visible inside hidden`;
  - `<img src="/pixel.png" alt="Hidden image alt">`;
- a visible `<img src="/pixel.png" alt="Shown image alt">`;
- a `display:none` carousel item, `Slide caption inactive`;
- a closed `<dialog>`, `Closed dialog text`;
- an `opacity:0` paragraph, `Transparent text kept`;
- a `display:contents` wrapper, `Contents wrapper kept`;
- `<select><option>Option label kept</option></select>`;
- one case for each rule that P1 and P3 add;
- no `text-transform`.

- **`tests/service/browser.test.ts` (CDP):**
  - Preconditions:
    - the raw `document.documentElement.outerHTML` holds every phrase;
    - the Markdown holds `Shown image alt`.
  - Oracle: for each phrase other than the two `alt` phrases, `markdown.includes(p) === innerText.includes(p)`.
  - `Hidden image alt` is absent from the Markdown.
  - The live DOM is unchanged:
    - `outerHTML` is byte-equal before and after;
    - a `MutationObserver` installed beforehand returns 0 records from `takeRecords()` after the read.
  - With `Network.requestWillBeSent` recorded during `page.read()` on a page whose hidden subtree holds a fresh-URL `img`, `video poster`, and `picture source`, no request is recorded for those URLs. This is P2 promoted.
  - An element `read` of a `region` found through `page.elements.find({ css })`, whose subtree holds a `display:none` child:
    - omits the child's text;
    - omits `Order summary shown`, which sits outside the region;
    - holds the region's visible text.
  - An element `read` of an element inside the hidden tab pane gives `html: ''`.
  - An element `read` of an element in an open shadow root under a `display:none` host gives `html: ''`.
  - A page with a `display:none` block of `BROWSER_RESULT_LIMIT` characters and a visible paragraph reads without refusal.
- **`tests/service/toolset.test.ts` (CDP):**
  - `read` lacks `Toast body dismissed`.
  - `wait { text: 'Toast body dismissed', timeout: 1 }` returns `did not appear`.
  - After adding `show`, `read` at offset 0 holds the phrase and `wait` returns done.
- **`tests/src/browser/helpers.test.ts` (`readBrowserCapture`, probe documents from `createProbeDocument`):**
  - Each case compares against the probe window's `document.body.innerText`, read at runtime (`tests.md:38`):
    - a `display:none` subtree is removed;
    - hidden text is removed while the visible descendant stays;
    - the hidden leaf `img` is removed;
    - `<style>` in `head` is kept;
    - a root under a `display:none` ancestor gives `''`;
    - a root in an open shadow root under a `display:none` host gives `''`;
    - the P3 cases, when ruled.
  - A custom-element constructor counter stays 0, and `takeRecords()` returns 0 records.
  - Raw markup over the limit with rendered markup under it returns the capture.
  - The cases at 385-412 stay as the whole-copy control.
- **`tests/src/browser/BrowserDOMView.test.ts`:** `view.read().markdown().text` excludes `Notes pane inactive` and includes `Order summary shown`.
- **`tests/service/document.test.ts`:** a block "with hidden panels appended to the document page", next to `:247`.
  - The DOM `read` text, through `documentToolset.tools.execute({ id: 'read', name: 'read', arguments: { what: 'the page' } })`, equals the `read` text of a `createBrowserToolset(page, { tools })` (`:142`) on the same page.
  - Precondition: the CDP text lacks `Toast body dismissed` while the raw `outerHTML` holds it.
- **Regression:** `tests/src/core/BrowserFrame.test.ts`, `tests/src/core/BrowserPage.test.ts`, `tests/src/core/elements/BrowserPageElement.test.ts:56-76` (through the `tests/setup.ts:2147` edit), `tests/src/core/BrowserToolset.test.ts`, `tests/setup.test.ts:292`, and `tests/service/browser.test.ts:308-341`.

#### Guide edits (`guides/browser.md`; the lines are as of `655906b`, and item 10 shifts them)

- These lines mirror the TSDoc, as in the original design: `:379`, `:703`, `:1445`, `:1638`, `:1673`, `:1708`, `:1773`, `:1785`, `:1808`, `:1824`, and `:2821`.
- `:1835` gains: `A reading a view, frame, or element captures holds the rendered markup BrowserReadingInput defines, so a subtree the page hides with display: none, or text under visibility: hidden, is in no projection.`
- `:2887` gains: `read reads the rendered markup, so text the page hides with display: none or visibility: hidden is absent from its pages, as it is from the text wait matches.`
- Edit in place and add no lines.
- The `wait` rows (:1674, :1694, :2822) are outside item 11. Record their "visible" wording as an open observation in `browse.md`, with no roadmap edit.

#### ROADMAP.md (same commit)

- Delete item 11. It is line 6 after item 10's commit.
- Re-verify the citations that move:
  - Item 8's `src/core/elements/BrowserPageElement.ts:361-381` becomes 360-380 after line 108 is deleted. Read the tip.
- Re-verify the citations that stay:
  - item 12's `src/core/compilers.ts:66`;
  - `src/core/constants.ts:622-636`;
  - `src/core/BrowserToolset.ts:1076-1115` and `:1102-1111`;
  - `src/core/BrowserPage.ts:438`;
  - `guides/browser.md:2060` and `:2091`;
  - `src/core/helpers.ts:2790-2791` (item 10 owns any shift there).

#### Consequences to carry

- Every capture path returns rendered markup. The ollama `read` seed (`guides/browser.md:3392`) must be re-read at its next re-pin.
- A `body` or `html` with `display: none` reads empty while `wait` matches it through `innerText`'s `textContent` fallback. Accepted: `read` reports what renders.
- A page that sets `visibility: hidden` on `html` until it hydrates reads with no text until it reveals itself. Call `wait` first.
- The public `reading.html` handle and `distill: false` no longer carry body-level `script`, `style`, `template`, or `noscript`.
- An XML document's root serializes as HTML.
- **F-shadow.** Text inside a shadow root stays absent from `read`, because `outerHTML` never serializes it. P3 records whether `innerText` includes it.
- `wait` matches the `text-transform` output, while `read` shows the source text.
- `::before` and `::after` content reaches `wait` and not `read`. This predates item 11.
- **Item 10 interaction.** There is no shared code. The guide tables at `:1426-1458` and `tests/service/document.test.ts` take blocks from both items. Re-read those lines after item 10 lands.

### Alternatives

- **Return `innerText` itself.** Rejected. It loses links, headings, tables (`src/core/BrowserReading.ts:64-72`), and the `html` handle (`src/core/types.ts:2325`).
- **Reuse `matchesBrowserInvisible` or `checkVisibility`.** Rejected. Both drop `content-visibility: auto` content and option text (`src/browser/helpers.ts:379-393`).
- **Reuse `matchesBrowserHidden`.** Rejected. It counts `hidden` and `aria-hidden` (`src/browser/helpers.ts:346-351`).
- **Reuse `readBrowserParent`.** Adopted, with a document-boundary stop.

### Constraints

These are unchanged from the original design. Add:

- core has no DOM lib: `configs/src/tsconfig.core.json:4`;
- the scripted element-read fixture: `tests/setup.ts:2147`;
- the probe project's browser: `vite.config.ts:430-438` against `:183-186`.

### Refusals

These are unchanged from the original design.

### Measurements

- **Supplied:**
  - veneer's showcase run, 2026-10-02 (T254, T257, T270, T272-T275), cited in `ROADMAP.md:7`;
  - the Chromium 141.0.7390.37 readings, which item 11 does not depend on.
- **Missing:**
  - P1, P2, and P3, with the system Chromium version and the Playwright Chromium version;
  - B0, owned by U1, and B1 (the same bench after the change), owned by U2;
  - a browse recheck of T254, T257, and T270 after release.

### Units

1. **U1: probe and baseline.**
   - Role `writer`; engine `opus`, high effort.
   - Owns `tmp/probes/read-rendered.test.ts` and B0.
   - Has no dependency on item 10.
   - Done when each probe's control behaves and the results, with both Chromium versions, are in `browse.md`.
   - A P2 side effect stops the item.
2. **U2: implement.**
   - Role `writer`; engine `opus`, high effort.
   - Owns `src/core/compilers.ts`, `src/core/elements/BrowserPageElement.ts`, `src/browser/helpers.ts`, `src/core/types.ts`, `tests/setup.ts:2147`, the listed tests, `guides/browser.md`, `ROADMAP.md`, and B1.
   - Depends on U1 and on item 10 having landed.
   - Done when the listed tests fail with the feature removed and pass with it, and these exit 0, read bare: `test:src:core`, `test:src:browser`, `test:setup`, `test:guides`, `npm run build`, then `test:service`. One commit.
3. **U3: review.**
   - Role `reviewer`, not the writer.
   - Covers the contract, the inert import, the index alignment, the shadow-host clauses, and placement parity.
   - Fixes go in a separate commit.
4. **U4: gates.** Role `verifier`; tree-wide gates with npm 11.6.0 or later.

### Tensions (each ruled)

- **Scope.** Element, frame, and DOM-view reads all change. A capture flag would split what a reading means.
- **Hidden leaf elements.** They are removed. Their `alt` text is text the page does not show.
- **P1 additions.** They are adopted where `innerText` omits the content, because the item's goal is that `read` and `wait` agree.
- **`body` or `html` with `display: none`.** It reads empty, as ruled under Consequences.
- **The rule's home.** It is `BrowserReadingInput`, because it is the input contract every capture produces.
- **Two implementations.** They are kept, guarded by the parity block and the mirrored CDP and DOM cases.
- **The `wait` rows' "visible" wording.** It is recorded in `browse.md` and is not item 11's edit.

### Risks

- P2 might show a fetch or a constructor run. That stops the item.
- `getComputedStyle` can start pending CSS transitions. The actionability pass already calls it (`src/core/compilers.ts:632`).
- The copy holds a second tree in memory. B0 and B1 measure the time cost.
- Closed shadow roots stay opaque to the shadow-host clauses.

### What changed and why

- **P2 promoted.** It runs in both worlds, with media fixtures added, and becomes CDP and DOM tests. The TSDoc's "nothing loads or runs" needs an executed assertion.
- **P3 extended.** It covers unassigned text and slots under a hidden shadow part. The original bullet missed both cases.
- **P1 extended.** It adds the controls, `option`, and replaced-element fallback, and every outcome is ruled. The original left the `auto` and fallback cases open.
- **DOM ancestor walk.** It reuses `readBrowserParent` (the `AGENTS.md` reuse law).
- **Single-implementation rejection.** It now cites core's lib.
- **CDP body.** It reads each element's style once instead of twice.
- **Vacuous tests closed.**
  - The element read now asserts outside text is absent.
  - CDP gains hidden-ancestor and shadow-host cases.
  - Ruling 10 gains a limit test.
  - The `compilers.test.ts` edit keeps a default-root case.
  - A visible `alt` twin is the precondition for the hidden-`alt` case.
- **Coupling made explicit.** `tests/setup.ts:2147` is named and edited, and `test:setup` joins U2's runs.
- **Runtime oracle.** The helpers tests compare against `innerText` at runtime, because the probe and DOM test browsers differ.
- **Roadmap.** Item 8's citation shift is added.
- **Tensions.** Each is ruled, with `should` removed. The `wait` wording moves to the lane record.
- **Bench.** It is owned by U1 and U2.
- **Consequences.** The `html` handle, hydration, and XML serialization are added.

VERDICT: FAIL 2, 3, 6, 11, 12, 13, 16, 18; outside the claims: F1, F2, F3