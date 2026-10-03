I ranked five names for the plain-text sibling of `read`. My first choice is `words`, then `text`, `plain`, `quote` and `wording`. I checked each against the prior-art survey, the design record, `names.md` and the tool copy in `constants.ts:509-760`.

**Constraints every candidate faces**
- **Rejected format names:** the design record (section 6) rejected tools named for a format (`markdown`, `text`) because those names describe a format, not a purpose.
- **No exactness claims:** the tool copy must never say "exactly" or "as a person sees it" (section 9). Generated content, `text-transform`, shadow roots and form values are left out of the capture.
- **Reworded copy:** under every candidate, the sibling's descriptions must not say "exactly". The 18% saving was measured on one page, the showcase, so the copy must not claim "shorter" either.
- **Names below are not exports:** tool names are string keys of `BrowserToolName`, not exported identifiers. The fleet name-ownership rule does not apply to them.

## Ranked candidates

### 1. `words`
- **What anyone expects:** the words on the page, without layout or decoration. The design record already gives `reading.text()` the meaning "The page's words" (`reading-design.md:63`).
- **Beside `read`:** `read` reads the page and `words` gives its words. It is a noun tool, like `tabs` and `journeys`, which return listings. The pair says "same page, less dressing".
- **Collisions or misreadings:**
  - The `search` description "Words to find on this page" repeats the word. Reword it on this tool to "Terms to find; matching lines come first."
  - The design record named `words` as the fallback if the `search` argument is renamed again (Tensions). If the user ever takes that fallback, this tool name clashes and must change.
  - The internal helper `collectBrowserWords` is a different layer and is not reached from the tool namespace.
  - No surveyed tool uses `words`, so prior art neither confirms nor contradicts it.
- **Description (21 words):** "Shows the page's words as plain text, without link addresses or formatting. Call it for words to quote into wait or type."

### 2. `text`
- **What anyone expects:** the page's text. The survey lists it as understood without documentation. Jina `text` and Playwright `innerText` return what this capture does, and it is the library's own term, `reading.text()`.
- **Beside `read`:** the pair reads as "the page as a document" against "the page as text". The two overlap in plain English, so the description has to carry the difference.
- **Collisions or misreadings:**
  - It is the same word as the `text` argument of `type`, `wait` and `dialog` (`constants.ts:584`, `:628`, `:648`). That is two concepts under one term.
  - `text` and `type` are adjacent four-letter t-words in the tool list, which risks a slip by a small model.
  - In plain English "text" is also a verb meaning to send a message.
  - Readability uses `textContent`, not `innerText`, so the survey records the word as split.
  - The record's rule against format names applies.
- **Description (19 words):** "Shows the page's text with no formatting or link addresses. Call it for text to quote into wait or type."

### 3. `plain`
- **What anyone expects:** "plain text", which almost everyone knows from email clients and editors.
- **Beside `read`:** it is a bare adjective in a list of verbs and nouns. It reads as a display setting rather than an action, and it carries the noun "text" only by implication.
- **Collisions or misreadings:**
  - It can be taken as a toggle that changes how `read` behaves, the same concept as the `plain` switch the record refused (`names.md:79`).
  - Adjectives in this codebase name booleans (`names.md:115`).
  - It names a format, not a purpose.
- **Description (20 words):** "Reads the page as plain text, without Markdown or link addresses. Call it for words to quote into wait or type."

### 4. `quote`
- **What anyone expects:** the page's wording reproduced so it can be repeated. This matches the stated purpose of feeding strings into `wait` or `type`, and `quote(search: "delivery date")` reads naturally.
- **Beside `read`:** it is a verb like `read`, and it names a purpose rather than a format, which the record prefers.
- **Collisions or misreadings:**
  - On a shop page, the store-proof domain, "quote" also means a price quote.
  - It suggests the output is wrapped in quotation marks, or that it returns one passage rather than the whole page.
  - It hides the second purpose, cheaper reading.
  - No surveyed tool uses it.
- **Description (18 words):** "Shows the page's text as plain words, without formatting or link addresses, ready to quote into wait or type."

### 5. `wording`
- **What anyone expects:** the exact words something uses, which fits text that matches the page's words.
- **Beside `read`:** it is a noun tool, but uncommon as a tool name, and it reads formally next to `look`, `read` and `tabs`.
- **Collisions or misreadings:**
  - It might suggest the wording of one element or message rather than the whole page.
  - It leans toward "exact", which section 9 forbids the copy to promise.
  - No prior art uses it.
- **Description (22 words):** "Shows the page's wording as plain text, without formatting or link addresses. Call it for words to quote into wait or type."

## Rejected names

- **`raw`:** the survey records three meanings (Firecrawl `rawHtml`, the fetch server's `raw`, Crawl4AI's `raw_`). Anyone would expect unprocessed HTML, but this output is processed.
- **`content`:** HTML in Playwright and Puppeteer, article HTML in Readability. It promises markup or the main article.
- **`extract`:** a model-driven extraction in browser-use and Stagehand. It promises a model reading the page, which the record refuses as product policy.
- **`snapshot`:** sounds like a picture, and in agent tools it means the accessibility tree.
- **`skim`, `glance`, `peek`:** they promise a partial or quick look, but the tool returns the whole page.
- **`scan`:** it promises a partial pass and collides with the `scan*` helper prefix (`names.md:99`).
- **`verbatim`, `exact`, `literal`:** they claim exactness the capture does not have (section 9). `literal` is also jargon.
- **`visible`:** the copy must never say "as a person sees it".
- **`strip`, `clean`, `flat`:** they describe the implementation, not the result. Firecrawl's `html` output is the "cleaned" HTML, so `clean` already means cleaned HTML in prior art. `flat` is jargon.
- **`source`, `body`, `dump`:** `source` and `body` suggest HTML source and the `body` element; `dump` is jargon.
- **`copy`:** it promises a clipboard.
- **`prose`:** it suggests lists and tables are dropped, but their text stays.
- **`lines`:** it promises numbered lines, and it repeats the `[OFFSET] LINE` rows that `read` already lists.
- **`transcript`, `recite`, `transcribe`:** they imply speech or audio.
- **`markdown`, `markup`:** wrong format; `read` already returns Markdown.
- **`plaintext`, `textonly`, `innertext`, `unformatted`:** compound words, DOM jargon, or long negatives.
- **`view`, `page`:** they overlap `look` and say nothing about what comes back.