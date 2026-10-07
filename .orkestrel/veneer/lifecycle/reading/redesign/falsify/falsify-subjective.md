1. **BROKEN** (O lane leads). The literal position rule fails in two places. I attacked refusals and hints, the surfaces the claim lists.
   - **Refusals:** `describeBrowserRefusal` prints `Element [ref=eN]` after the word "Element", not after a name or role (`C:/Users/mikes/WebstormProjects/browser/src/core/helpers.ts:156`). It does this even when the element knows its role and name. For example, `C:/Users/mikes/WebstormProjects/browser/src/browser/elements/BrowserDOMElement.ts:120` yields `Element [ref=e2] is not editable.`
   - **Hint:** the click hint prints `call type with [ref=eN]` after "with" (`C:/Users/mikes/WebstormProjects/browser/src/core/BrowserToolset.ts:866`).
   - **Fix:** the Orchestrator amends claim 1 so the refusal subject form `Element [ref=eN]` is accepted where no name survives (GONE, not in view) and argument positions are excluded. The hint goes back to the measured bytes; see verdict 7.

2. **CONFIRMED.**
   - **Attack:** I searched `ref` and `e12345` against a row `link "Shipping" [ref=e12345] /delivery`. The token is a `reference` span (`helpers.ts:473`), and `scanBrowserLines` scores only `text` spans (`helpers.ts:614-616`).
   - **Mutation:** if the span category becomes `text`, `C:/Users/mikes/WebstormProjects/browser/tests/guides.test.ts:751` (`scanBrowserLines(lines, 'e12345')` → `[]`) fails. The assertion distinguishes it.

3. **CONFIRMED** (by reading; not executed).
   - **Attack 1:** a tight limit where the partial line's digit count changes between candidate ends. Each candidate row recomputes the line before fitting (`helpers.ts:847-855`), so the accepted body carries the line for its actual end.
   - **Attack 2:** a receipt prefix. The minimum window is computed first, so the inner limit is at least that minimum (`helpers.ts:808-816`).
   - The footer comes from `renderBrowserFooter`, which `redesign-audit.ts:33` shows is unchanged.

4. **BROKEN.**
   - **Failing input:** on the catalogue at the 4,000-character limit, call `read {from: 47, search: "Cedar Tea Tray " + "zzzz ".repeat(700)}`.
   - **Why it fails:** the best-match note quotes the raw query, `JSON.stringify(passage.search)` (`helpers.ts:787`). The miss text abbreviates the same query to 120 units (`helpers.ts:721`). The note passes the room (about 3,600 characters), so `boundBrowserText` cuts it at an arbitrary character (`helpers.ts:1023`). Line 11, including `[ref=e7]`, is cut or dropped. That breaks "never cuts a reference or a numbered row".
   - **Second failure:** when `room < 1`, the note and the miss line both vanish (`helpers.ts:784-785`).
   - **Fix:** build the note from the 120-unit `query` that `renderBrowserSearch` already computes. When the note still cannot fit whole, drop the quoted row and keep the miss sentence.

5. **CONFIRMED.**
   - **Code:** the note condition is `previous !== undefined && previous !== projection` with no `from` term (`BrowserToolset.ts:814`).
   - **Attacks:** a first read has no previous projection, so no note. An unchanged re-read compares equal, so no note. The first read after `switch` uses a new view key, so no note.
   - **Mutation:** restoring a `from > 1` guard fails `C:/Users/mikes/WebstormProjects/browser/tests/service/toolset.test.ts:565`. The pair at :565-566 distinguishes it.

6. **CONFIRMED.**
   - **Code:** the footer names `to + 1` (`helpers.ts:702`). A read from that line opens there, because without `search` it opens at `from`.
   - **Attack:** a window that ends early under the limit with a partial line. The footer comes from the accepted `end` (`helpers.ts:860`), so no line is skipped or repeated.

7. **BROKEN.**
   - **What holds:** the `type` description equals the approved bytes (`C:/Users/mikes/WebstormProjects/browser/src/core/constants.ts:490`). The advertised read, click, type, press, navigate, and wait definitions equal those in `C:/Users/mikes/WebstormProjects/ollama/tmp/codex/store-campaign5/validate-2/2b/C2/inputs/49171-cart.json`, apart from the approved type copy. The longest parameter description is 99 characters (`constants.ts:645`).
   - **What fails:** the click handler changed outside the approved set.
     - At `b6dda22` the hint read `call type with ${element.reference}`. The writer's own audit has to rewrite it back to match the base (`C:/Users/mikes/WebstormProjects/browser/tmp/codex/redesign-audit.ts:22`).
     - It now reads `call type with [ref=…]` (`BrowserToolset.ts:866`).
     - The measured transform kept the bare form: `Clicked searchbox "Search products" [ref=e4]; call type with e4 to enter text` (`C:/Users/mikes/WebstormProjects/ollama/tmp/codex/store-campaign5/validate-3/2b/P1+X6/attempts/inputs/49187-search-calls.jsonl:2`).
     - The plan requires the package to reproduce the measured bytes.
     - The `ref` parameter description still teaches `e4` as the value (`constants.ts:494`).
   - **Fix:** restore `call type with ${element.reference}` at `BrowserToolset.ts:866`, update the "click receipt on a textbox" expectation, and remove the audit's whitelist rewrite.

8. **CONFIRMED** (mutations named by reading; I could not execute them).
   - **The fixture renders equal the measured records:** the seed `transformed` field in `validate-4/2b/T1+P1/attempts/inputs/49171-cart.json` matches the rendered header, partial line, and first row byte for byte.
   - **Approved string:** a changed partial-line or best-match word fails the exact `toBe` in `toolset.test.ts:541` and :545-548, and in `guides.test.ts:773` and :789.
   - **Reference position:** swapping name and reference in `renderBrowserSpans` fails `guides.test.ts:748` and the seed equality.
   - **Partial condition:** `index < lines.length` → `true` fails `guides.test.ts:789`, where the final window must carry no partial line.
   - **Best-match condition:** dropping the in-range check fails `guides.test.ts:773`, where an in-range hit must carry no note.

9. **BROKEN.** The guide's receipts table contradicts what ships (`C:/Users/mikes/WebstormProjects/browser/guides/browser.md`).
   - **:2842** gives the element row as `REF ROLE "NAME"` with states after it. The code renders `ROLE "NAME" [ref=REF]` (`helpers.ts:228`).
   - **:2853** gives `Typed "TEXT" into REF ROLE "NAME".` The code renders `into ROLE "NAME" [ref=REF]` (`BrowserToolset.ts:939`).
   - **:2858** gives `focus is on REF ROLE "NAME"`. The focus string is `renderBrowserOutlineRow`, which renders `ROLE "NAME" [ref=REF]` (`helpers.ts:297`, `BrowserToolset.ts:1486`).
   - **:2851** says `call type with e35`, but the code says `[ref=e35]`. This row becomes true once verdict 7's fix lands.
   - **:2820** says "the existing text-bounding rule applies to the note". That names no rule, and it is false when `room < 1`, where the note is dropped (`helpers.ts:784`).
   - Nothing asserts these table rows, which is why they drifted.
   - **Fix:**
     - Rewrite :2842 as `ROLE "NAME" [ref=REF]` followed by the value and state tokens.
     - Rewrite :2853 as `Typed "TEXT" into ROLE "NAME" [ref=REF].`
     - Rewrite :2858 as `Pressed KEY; focus is on ROLE "NAME" [ref=REF].`
     - At :2820, name `boundBrowserText` and the cut form, and state the omission case.
     - Add executed assertions for the row, type, and focus receipts in `tests/guides.test.ts`.
   - The fences at :607-672 are true; `guides.test.ts:747-790` asserts each value.

10. **BROKEN.** I would not ship it at `d921838`.
    - **What holds:** the rulings themselves. There are 8 page tools, numbered lines with inline references, `from` and `to`, a footer naming the next line, and a line-numbered search.
    - **Why not ship:** the package ships an unmeasured copy change (verdict 7) and a guide table that contradicts its receipts (verdict 9). The best-match bound breaks on a long query (verdict 4). The partial-line behaviour is switched by sniffing header text (F1).
    - **Fix:** verdicts 7, 9, and 4, and F1.

11. **UNRESOLVED.**
    - **Interleavings that hold:** navigating to a page whose header matches by accident clears the set, because `navigate` is an action. A reference first seen in a quoted line is cleared by the page change. A reference from another tab is cleared by `switch`. Reuse after an action that returned no view fails (`C:/Users/mikes/WebstormProjects/ollama/tests/setupStore.ts:1166-1176`).
    - **Where the harness is stricter than the user's words:**
      - It clears the set on `wait` and `dialog`, through `BROWSER_JOURNEY_ACTIONS` (`constants.ts:784-785`). The browser's contract names only click, type, press, navigate, and switch as actions (`BrowserToolset.ts:134`).
      - It also clears on a refused action, because the clear runs before `if (!call.success) continue` (`setupStore.ts:1167-1174`).
      - Either way, a reference listed by a read and then outside a later `wait` window fails, even on an unchanged page.
    - **Why clearing on `wait` may still be right:** receipt windows never carry the change note (`BrowserToolset.ts:1960`), so a change during `wait` cannot be seen otherwise.
    - **What settles it:** the Orchestrator rules whether `wait`, `dialog`, and a refused action reset the set, and a setup case pins each ruling.

12. **CONFIRMED.**
    - **Attack 1:** the best-match quote. It is skipped (`setupStore.ts:1474-1477`).
    - **Attack 2:** a note cut mid-quote. The skip lands on the `[characters …]` line, and the cut row is not counted.
    - **Attack 3:** the partial line and header lines. Neither matches `^[1-9]\d*: `.
    - `first === from` together with `lines.has(from)` keeps the footer chain exact (`setupStore.ts:1513-1520`).

13. **UNRESOLVED.**
    - **What holds now:**
      - The shipping fact is absent from the seed (:1552).
      - The cart holds exactly the tray (:1568-1569).
      - Checkout records exactly one order, with the buyer and the code (:1581-1583).
      - Search records a matching query and names exactly the matching products (:1616-1617).
      - Paging continues at the line a footer names (:1540).
    - **What settles it:** `git show b3083aa:tests/setupStore.ts` and `b3083aa:tests/service/browser.test.ts`, compared predicate by predicate.

14. **CONFIRMED.**
    - **Attack:** I compared the shipped bytes with both measured records.
      - `STORE_SYSTEM_PROMPT` (`setupStore.ts:136-143`) matches the T1+P1 record's system prompt exactly.
      - The C2 record's prompt matches the shipped one with only the old type sentence swapped in.
      - The framing at `setupStore.ts:883` appears verbatim in `validate-2/2b/C2/inputs/49171-paging.json`.
    - **Mutation:** one changed byte in either string fails `C:/Users/mikes/WebstormProjects/ollama/tests/setupStore.test.ts:859` or :1054.

15. **BROKEN.**
    - **Framing gap:** the bytes probe compares seeds only and never builds the prompt. A changed framing byte passes it (`C:/Users/mikes/WebstormProjects/ollama/tmp/probes/redesign-harness-bytes.test.ts:52-71`); only the hard-coded setup test catches it.
    - **Vacuous control:** `expect(actual).not.toBe(masked + '\nnegative control')` (:72) cannot fail. It adds no proof.
    - **What does bind:** in the position probe, a moved fact fails `expect(seed).not.toContain(fact)` (`redesign-harness-positions.test.ts:52`).
    - **Fix:** compare `buildStorePrompt(task.prompt, actual)` with the record's measured user-turn content. Replace :72 with a real control, for example the `b3083aa` framing asserted unequal.

16. **UNRESOLVED.**
    - **What holds now:**
      - References are parsed in either form (`C:/Users/mikes/WebstormProjects/ollama/tmp/probes/store-helpers.ts:73`).
      - The checkout rule mirrors cart's reveal rule (:107-114 against :88-97).
      - Paging reads the footer of the seed the model received (:119).
    - **What settles it:** `git show b3083aa:tmp/probes/store-helpers.ts`, compared clause by clause, especially the paging search clause at :121-123.

**Findings outside the claims**

- **F1.** `renderBrowserWindow` decides whether to add the partial-view line by testing whether the header starts with `page ` (`helpers.ts:848`). That encodes a yes/no behaviour in string content, against the Boolean behavior law.
  - **Failing input:** `renderBrowserWindow(lines, 1, 1, 'page one', 4000)` injects `This read shows lines 1–1 of 3; …` under a caller's own header.
  - **Fix:** pass the switch as an explicit boolean parameter, which `renderBrowserPassage` sets.

- **F2.** `extractReferences` keeps the old row parser `^(?:\d+: …)?(e[1-9]\d*) ` (`setupStore.ts:1132`), and the default fixture seed stays in the old form `'e1 link "Catalogue"'` (`setupStore.ts:1397`). That is a compatibility shim; the "No compatibility shims" law requires migrating the consumers instead.
  - **Failing input:** a page text row `12: e5 is …` would count `e5` as listed, so an invented reference could pass.
  - **Fix:** drop the old-form branch and migrate the fixture seed to `1: link "Catalogue" [ref=e1]`.

- **ADVISORY A1.** Reference vocabulary differs across surfaces:
  - The `read` description says "references like e4" (`constants.ts:454`).
  - The `ref` parameter says "such as e4" (`constants.ts:482` and :494).
  - The system prompt says "references such as e4" (`setupStore.ts:137`).
  - Rows render `[ref=e4]`.

  The measurements ran with this split. Change it only through a new measurement.
- **ADVISORY A2.** The guide's quick start and the `factories.ts` example still frame the seed as `The browser shows this page:` (`guides/browser.md:84` and :3382, `src/core/factories.ts:173`). That is the framing the plan replaced. Adopt `The browser's first read of the page:`.
- **ADVISORY A3.** A committed service test writes the writer's evidence files into `tmp/codex/` (`tests/service/toolset.test.ts:543` and :557). Move the evidence capture into a probe.
- **ADVISORY A4.** The system prompt tells the model to click "from the latest result" (`setupStore.ts:141`), which is stricter than the accumulating rule R. It was measured this way; leave it unless re-measured.

**Attacked and held**

- The `type` description's word count (17 of 25) and its exact bytes in the T1+P1 record.
- The rendered seed matches the measured record's `transformed` field.
- The guide fence for the in-range hit, partial line, and change-note order (`guides/browser.md:650-655`) holds against the code, including singular `line 3 is`.
- The best-match quoted row counts as a listing in `extractReferences` (`setupStore.test.ts:868-871`).
- A cut best-match note cannot give continuation credit in `findContinuedRead`.
- The partial line and the best-match note fit inside a receipt window without a `TOOLSET_LIMIT` throw at the first row.

VERDICT: FAIL 1, 4, 7, 9, 10, 15; outside the claims: F1, F2
