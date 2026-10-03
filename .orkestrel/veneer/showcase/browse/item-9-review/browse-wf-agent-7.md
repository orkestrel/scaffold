{
  "findings": [
    {
      "title": "Guide still states the full tool copy bound as 5 900 after the test raised it to 6050",
      "file": "C:\\Users\\mikes\\WebstormProjects\\browser-wt-browse\\guides\\browser.md",
      "line": 2969,
      "severity": "medium",
      "evidence": "Lane: contract, names, and prose. guides/browser.md:2969 reads 'bounds the copy a model reads ... at 3 100 characters for the journey tools plus `type`'s `secret` property and at 5 900 for the full list.' The test at tests/src/core/BrowserToolset.test.ts:793 asserts `.toBeLessThanOrEqual(6050)`. This is the writer's stated deviation, and it left the guide sentence false.",
      "fix": "Change '5 900' to '6 050' at guides/browser.md:2969, so the guide names the bound the vocabulary case asserts."
    },
    {
      "title": "Error-code table omits `look` as a source of BROWSER_TOOLSET_LIMIT",
      "file": "C:\\Users\\mikes\\WebstormProjects\\browser-wt-browse\\guides\\browser.md",
      "line": 303,
      "severity": "medium",
      "evidence": "src/core/BrowserToolset.ts:789-800 (`#pageSlice`) throws `The ${name} limit of ... cannot hold the next character ...` coded BROWSER_TOOLSET_LIMIT for name 'look' as well as 'read'. guides/browser.md:303 still lists only '`read` and `journeys`' as the sources. The Receipts table also gives no row for the toolset refusal: it has only the journeys message at :2946, so the look/read message the writer changed is undocumented.",
      "fix": "At guides/browser.md:303, list '`look`, `read`, and `journeys`'. Add a Receipts row beside :2946: 'A `look` or `read` call whose `limit` cannot hold the next character, coded `BROWSER_TOOLSET_LIMIT`' with the text `The look limit of LIMIT characters cannot hold the next character at offset START; raise the toolset limit.` (or `read`)."
    },
    {
      "title": "validateBrowserToolArguments @example still quotes the old look refusal",
      "file": "C:\\Users\\mikes\\WebstormProjects\\browser-wt-browse\\src\\core\\helpers.ts",
      "line": 540,
      "severity": "low",
      "evidence": "src/core/helpers.ts:540 reads `// throws 'The look tool takes no ref parameter; call look with what.'`. After `offset` was added to BROWSER_TOOL_COPY.look (src/core/constants.ts:529-539), the refusal reads `call look with what and offset.`, as tests/src/core/BrowserToolset.test.ts:884 and the updated guide fence at guides/browser.md:687 show. The parity gate misses this because the example is untitled.",
      "fix": "Change the comment to `// throws 'The look tool takes no ref parameter; call look with what and offset.'`."
    },
    {
      "title": "boundBrowserText remarks still assign the view footer to every result that carries a view",
      "file": "C:\\Users\\mikes\\WebstormProjects\\browser-wt-browse\\src\\core\\helpers.ts",
      "line": 498,
      "severity": "low",
      "evidence": "src/core/helpers.ts:497-499 says 'the toolset passes `BROWSER_TOOL_VIEW_FOOTER` for a result that carries a view and `BROWSER_TOOL_CUT_FOOTER` for any other.' The `look` result carries the view, yet item 9 registers `look` with BROWSER_TOOL_CUT_FOOTER (src/core/BrowserToolset.ts:270). The constant's TSDoc (src/core/constants.ts:451-454) and the guide (guides/browser.md:2887) were rewritten to say 'action receipt'; this remark was not.",
      "fix": "Reword it to 'the toolset passes `BROWSER_TOOL_VIEW_FOOTER` for a receipt that carries a view and `BROWSER_TOOL_CUT_FOOTER` for any other', using the same scope as the constant's TSDoc."
    },
    {
      "title": "'Action receipt' scope of BROWSER_TOOL_VIEW_FOOTER leaves out the `dialog` receipt, which also uses it",
      "file": "C:\\Users\\mikes\\WebstormProjects\\browser-wt-browse\\src\\core\\constants.ts",
      "line": 452,
      "severity": "low",
      "evidence": "src/core/constants.ts:451-454 and guides/browser.md:226, :2887, and :2927 say the footer ends 'a cut action receipt'. The class TSDoc defines the actions as '`click`, `type`, `press`, `navigate`, and `switch`' (src/core/BrowserToolset.ts:124). Yet `dialog` registers with BROWSER_TOOL_VIEW_FOOTER (src/core/BrowserToolset.ts:291), and its receipt carries a view (`renderBrowserReceipt({ action, view: ... })`). The wording before item 9 ('a cut result that carries a view') covered it.",
      "fix": "Say 'a cut receipt that carries a view: an action's or `dialog`'s' in the constant's TSDoc and in the guide row at :226. In the Receipts paragraph (:2887) and its table row (:2927), name `dialog` beside the actions."
    },
    {
      "title": "Item 9 calls a bounded chunk a 'page', colliding with BrowserPage and with the existing term 'slice'",
      "file": "C:\\Users\\mikes\\WebstormProjects\\browser-wt-browse\\tests\\setup.ts",
      "line": 1796,
      "severity": "medium",
      "evidence": "AGENTS.md § Design laws: 'One concept, one term.' The chunk that `read` returns is already a slice: `extractBrowserSlice`, `BrowserReadResult`, and guides/browser.md:2887 'The slice restarts at 0'. Item 9 names the same thing a page in tests/setup.ts:1796 (`BrowserPageFixture`), :1812 (`extractBrowserPage`), src/core/BrowserToolset.ts:789 (`#pageSlice`), src/core/BrowserToolset.ts:116-118 ('return pages of at most `limit` characters'), guides/browser.md:1901, and guides/browser.md:2887 ('a page holds at most `limit` characters of the outline', 'the first page opens with'). In this package 'page' is `BrowserPage`, the CDP page, and the guide uses it for the browser page in the same paragraph ('each call captures the view afresh, a page holds…'), so `extractBrowserPage` reads as a page factory.",
      "fix": "Use 'slice' throughout. Rename `BrowserPageFixture`/`extractBrowserPage` to a slice name that does not shadow the src helper, such as `BrowserSliceFixture`/`extractToolSlice`, and rename `#pageSlice` to `#slice`. Rewrite the prose at BrowserToolset.ts:116-118, guides/browser.md:1901, and :2887 to 'slices' and 'the first slice'."
    },
    {
      "title": "Guide overclaims that every look page ends after a line break",
      "file": "C:\\Users\\mikes\\WebstormProjects\\browser-wt-browse\\guides\\browser.md",
      "line": 2887,
      "severity": "low",
      "evidence": "guides/browser.md:2887 says a page 'ends after its last line break', and src/core/BrowserToolset.ts:117 says pages 'end at a line break'. `extractBrowserSlice` (src/core/helpers.ts:1989-1995) cuts at `offset + limit` when the window holds no line break past `offset`. A row or text line longer than the room therefore ends mid-line, and the final page ends at the count line with no break after it. The helper's own TSDoc says 'where one fits' (helpers.ts:1953).",
      "fix": "Write 'ends after the last line break in its window where one fits, and at the window's end otherwise' in both places."
    },
    {
      "title": "Code token inflected as a possessive in the added Receipts row",
      "file": "C:\\Users\\mikes\\WebstormProjects\\browser-wt-browse\\guides\\browser.md",
      "line": 2893,
      "severity": "low",
      "evidence": "guides/browser.md:2893 reads 'share the most words with `look`'s `what`'. .claude/rules/writing.md § Tokens: 'Never inflect or pluralize a code token.'",
      "fix": "Write 'share the most words with the `what` parameter of a `look` call, before the view on the first page'."
    },
    {
      "title": "Press-focus receipt row omits the row's states and the order of the clause after a status",
      "file": "C:\\Users\\mikes\\WebstormProjects\\browser-wt-browse\\guides\\browser.md",
      "line": 2905,
      "severity": "low",
      "evidence": "guides/browser.md:2905 gives `Pressed KEY; focus is on REF ROLE \"NAME\".`. The clause carries the whole rendered row (src/core/BrowserToolset.ts `#settle`: `focus is on ${captured.focus}`, where focus is `renderBrowserOutlineRow(...)`), so it can carry suffixes. tests/service/toolset.test.ts:1046 expects `focus is on ${name} textbox \"Name\" value=\"Ada\".`. The clause follows any status (`[status, clause].join('; ')`), as in design ruling 7's `Pressed Enter; no form received the submission; focus is on ...`, which the guide never shows.",
      "fix": "Give the text as `Pressed KEY; focus is on ROW.`, where ROW is the element row in the outline's row format. State that the clause follows any other status, for example `Pressed Enter; no form received the submission; focus is on e3 textbox \"Search\".`"
    },
    {
      "title": "The deduplication in extractOutlineRows hides a duplicated outline row from every caller",
      "file": "C:\\Users\\mikes\\WebstormProjects\\browser-wt-browse\\tests\\setupService.ts",
      "line": 227,
      "severity": "low",
      "evidence": "Writer's deviation: the design put deduplication in `collectOutlinePairs`, but the writer put it in `extractOutlineRows` (tests/setupService.ts:227-237), which also feeds `requireOutlineReference` (:263) and the destructuring at tests/service/toolset.test.ts:340. Test mutation: make the DOM walk emit one referenced row twice, for example by walking a slot's assigned element twice. Before item 9, `collectOutlinePairs(dom)` vs `collectOutlinePairs(cdp)` at tests/service/document.test.ts:103 and the positional destructuring at toolset.test.ts:340 failed on it. They pass now, because the second occurrence is dropped by reference. The only legitimate repeat is the match block, which ends at the first `page \"` line.",
      "fix": "Skip the match block instead of deduplicating by reference: read rows only from the first line that starts with `page \"`, or from the start when there is no block. A duplicated row inside the outline then still fails. Update the setupService.test.ts cases at :208-218 to match."
    },
    {
      "title": "BROWSER_SEARCH_PATTERN is a public global-flag RegExp whose lastIndex any consumer can mutate",
      "file": "C:\\Users\\mikes\\WebstormProjects\\browser-wt-browse\\src\\core\\constants.ts",
      "line": 316,
      "severity": "low",
      "evidence": "src/core/constants.ts:316 exports `/[\\p{L}\\p{N}]{3,}/gu` through the core barrel (src/core/index.ts:2). Every other exported pattern (constants.ts:504, :840, :843; src/server/constants.ts:71) has no `g` flag. A consumer that calls `BROWSER_SEARCH_PATTERN.test(word)` or `.exec()` advances the shared `lastIndex`, so a later call by that consumer starts mid-string and returns false or null. `matchAll` in `matchBrowserOutline` clones the pattern and so stays correct, but the published constant carries state, unlike its siblings.",
      "fix": "Export the pattern without `g` (`/[\\p{L}\\p{N}]{3,}/u`). In `matchBrowserOutline` (src/core/helpers.ts:240, :257), iterate with `new RegExp(BROWSER_SEARCH_PATTERN.source, 'gu')`. Keep the guide row at guides/browser.md:212 as written."
    },
    {
      "title": "BrowserOutline summary no longer describes what the interface carries",
      "file": "C:\\Users\\mikes\\WebstormProjects\\browser-wt-browse\\src\\core\\types.ts",
      "line": 2391,
      "severity": "low",
      "evidence": "The TSDoc summary of `BrowserOutline` and the guide Surface row both still read 'Carries a document-order outline and its included and available element counts.' The interface now also carries `matches` and `focus` (diff at src/core/types.ts:2861-2879). Parity holds only because neither side changed. The `BrowserOutlineOptions` summary beside it was extended for `search`, which leaves the two siblings inconsistent.",
      "fix": "Change the description to 'Carries a document-order outline, its included and available element counts, the rows that best match its search, and the focused row.' Mirror it in the guide's `BrowserOutline` Surface row."
    },
    {
      "title": "REFERRAL to the objective lane, not ruled here: the DOM placement may report a stale focus from an unfocused same-origin frame document",
      "file": "C:\\Users\\mikes\\WebstormProjects\\browser-wt-browse\\src\\browser\\elements\\BrowserDOMElementManager.ts",
      "line": 386,
      "severity": "referral",
      "evidence": "src/browser/elements/BrowserDOMElementManager.ts:386-389 marks an element focused when `root.activeElement === element` for its own Document or ShadowRoot. A same-origin iframe's document keeps its `activeElement` after focus moves to the parent document. Proposed interleaving: focus an input inside a same-origin iframe, then focus a referenced button in the parent that precedes the iframe in document order. Both rows then carry `focused: true`, and `renderBrowserOutline` keeps the last in document order (src/core/helpers.ts:351), the stale iframe input. That contradicts the `BrowserOutline.focus` contract, 'the referenced element that has focus' (src/core/types.ts remarks at the `focus` entry). The DOMElementManager tests cover only the top document and an open shadow root (tests/src/browser/elements/BrowserDOMElementManager.test.ts:1407-1425). This is correctness under an adverse ordering, so it belongs to the objective lane.",
      "fix": "Objective lane: run the iframe interleaving in the `src:browser` project. If the stale row wins, count a document's active element only when the chain of frame elements up to the view's document is each parent's `activeElement`, and add that case to the DOMElementManager test."
    }
  ]
}