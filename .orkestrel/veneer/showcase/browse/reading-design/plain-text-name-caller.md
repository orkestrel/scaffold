**Five ranked candidates for the plain-text sibling of `read`**

**Before any of these names will work, `read`'s description has to change.** Today it says "Reads the page's text". The new tool also returns the page's text, so beside it that copy gives a small model nothing to choose between them. Proposed copy for `read` (22 words): "Reads the page as Markdown, with headings, lists, tables, and link addresses. Call it to learn a fact or find a link."

**1. `quote`**
- **What anyone would expect:** the page's exact words, repeated word for word. The verb's ordinary meaning ("repeat someone's exact words") is the tool's promise. That promise is strings that match the page for `wait` and `type`.
- **Beside `read`:** you read to learn and you quote to copy. The choice follows from the name alone, and it divides on purpose rather than format. The list keeps one verb per action. With `search`, the tool reads as "quote the lines about X", which is what the match block returns.
- **Collisions and misreadings:**
  - On a store or services site, "quote" can mean a price estimate ("Request a quote").
  - A model might expect quotation marks or escaping in the output.
  - A model wanting the whole page might not think to use it. That's acceptable, because `read` serves the whole page.
  - No collision with any tool, argument, or library member.
- **Description (22 words):** "Quotes the page's words exactly as plain text, without Markdown or link addresses. Call it for exact text to pass to wait or type."

**2. `text`**
- **What anyone would expect:** the page's text and nothing else. The prior-art survey lists `text` among the names understood without documentation (Jina `text`, Playwright `innerText`). It is also the library projection's own name, `reading.text()`.
- **Beside `read`:** readable only once `read` says "Markdown". Without that, the two names overlap.
- **Collisions and misreadings:**
  - It shares its name with the `text` argument of `type`, `wait`, and `dialog`. Small models sometimes confuse a tool name with an argument key, for example calling `text` with `text`, and the design record rejects the name for this reason.
  - The collision also works as a hint: what `text` returns goes into the `text` argument of `wait` and `type`.
  - It is a noun, as are `dialog`, `tabs`, and `journeys`.
- **Description (25 words):** "Returns the page's text as plain words, without Markdown, link addresses, or image text. Call it for exact strings to pass to wait or type."

**3. `words`**
- **What anyone would expect:** the words on the page, without formatting. It is short and plain English.
- **Beside `read`:** the pair reads as "read the page" against "just the words", so the contrast in format comes through.
- **Collisions and misreadings:**
  - Next to the noun tools `tabs` and `journeys`, which list collections, `words` reads as a word list, a vocabulary, or a word count.
  - The `search` argument's copy is "Words to find on this page", so a model might take `words` to be the finding tool.
- **Description (23 words):** "Shows the page's words as plain text, without Markdown or link addresses. Call it for exact text to pass to wait or type."

**4. `verbatim`**
- **What anyone would expect:** the text exactly as written. The name states the exactness promise more directly than any other candidate.
- **Beside `read`:** the contrast is clear, but it is the only adjective or adverb among verb and noun tools.
- **Collisions and misreadings:**
  - It might suggest the HTML source "verbatim".
  - Smaller models know it less well than the common words above.
  - At eight letters, it is the longest candidate in a list of short names.
- **Description (24 words):** "Shows the page's text verbatim as plain words, without Markdown or link addresses. Call it for exact text to pass to wait or type."

**5. `plain`**
- **What anyone would expect:** plain text, to anyone who has seen "plain text" against "rich text". On its own, though, the word leaves "plain what?" open.
- **Beside `read`:** it states the difference in format and nothing else. The pair reads as "read" and "plain read", and the name does not say that it reads.
- **Collisions and misreadings:**
  - It is an adjective in a list of verbs and nouns, against the rule that methods are verbs.
  - The design record refuses a `plain` boolean, so the word already carries a ruling.
- **Description (21 words):** "Reads the page as plain text, without Markdown or link addresses. Call it for exact text to pass to wait or type."

**Rejected names**

The following names were rejected:
- **`read_text`, `readtext`, `plaintext`:** the clearest pick for a small model, and the tool-name pattern allows the underscore. They are two words, so they break the single-word law.
- **`markdown` (renaming `read`):** `read` stays. It is the user's decision and the store proof uses it.
- **`raw`:** it has three meanings across tools: as-served HTML, no Markdown conversion, and no filter.
- **`content`:** it means HTML in Playwright and Puppeteer, and article HTML in Readability.
- **`extract`:** it is a model-driven extraction in browser-use and Stagehand, and the design refuses model extraction.
- **`snapshot`, `source`, `html`, `dump`:** these suggest a picture, the markup, or debugging output.
- **`copy`:** it suggests the clipboard.
- **`skim`, `scan`, `glance`, `peek`:** these suggest a partial or quick look, but the tool returns the whole capture.
- **`lines`:** it suggests line numbers, a line count, or code.
- **`strings`, `literal`, `echo`:** programmer jargon.
- **`exact`:** an adjective with no noun.
- **`recite`, `transcribe`, `transcript`:** uncommon, and they suggest speech or audio.
- **`prose`:** it suggests paragraphs only, but the tool keeps list and table text.
- **`body`, `page`:** `body` is an HTML element, and `page` sounds like it works with `navigate` or `tabs`.
- **`see`, `view`:** they overlap with `look`.
- **`find`, `search`:** `search` is the argument and `find` is the element manager's method.
- **`distill`, `strip`:** these name how the text is produced, not what it is, and `distill` is a library option.