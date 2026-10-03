**Ranked tool names for the plain-text sibling of `read`**

I picked `words` as the name. The plain-text tool adds a tool name, not an exported identifier, so the fleet name-ownership rule does not apply. One-word naming and one concept, one term do apply. Whichever name is picked, `read`'s copy must change to say Markdown. Without that change, two tools claim "the page's text".

**Ruling on `text`: it is allowed, but I rank it second.**

These points favour `text`:
- It is the same word as the library's `reading.text()`. One concept, one term favours it.
- The prior-art survey lists `text` among names that need no explanation (Jina `text`, Playwright innerText).
- It is short, common English, and a noun, like `tabs` and `journeys`.
- It does not clash outright with the `text` argument. Tool names and argument keys sit in different places in a call. `wait`'s `text` argument is the same idea (page words), so text taken from a `text` tool and passed to `wait` reads consistently.

These points count against it:
- "Text" is a common verb ("text me"). Most names in the tool list are verbs (`read`, `click`, `type`, `press`, `wait`), so a model can read `text` as "send text" or "enter text".
- `type`'s description says "Types into the text control", which points a model toward a tool named `text` for typing.
- The argument word already has two meanings: page words on `wait`, and words the agent supplies on `type` and `dialog`. A tool named `text` would add a third use of the same token.
- `read`'s description says "Reads the page's text". If a sibling is named `text`, the names alone don't tell the two apart; the difference only shows once `read`'s copy says Markdown.
- A model that mixes it up with `wait` will send `text({text: …})`. The refusal would then read "The text tool takes no text parameter", which is confusing.
- The design record rejected `text` (section 6 and D2) because of this argument collision and because the name states a format, not what the tool gives you.

**1. `words`**
- **What anyone expects:** the words on the page, without formatting. It also promises less than `text`, which fits: `text()` drops link addresses, image text, and heading levels.
- **Beside `read`:** `read` gives the page with its structure, and `words` gives only the words. As a noun it sits with `tabs` and `journeys`, and the difference from `read` is clear from the name.
- **Collisions:**
  - It matches no tool, argument, or library member.
  - The planned helper `collectBrowserWords` uses "words" for the searchable words of a text. That is a related idea, not a different one.
  - `search`'s description, "Words to find on this page", repeats the word, but the meaning is the same.
  - The design rejected `words` as the name for the argument, because it would be a second term for `search`. That reason does not apply to a tool name.
  - Possible misreadings: a list of words, a word count, or definitions.
- **Description:** `Shows the page's words as plain text, without Markdown or link addresses. Call it to copy words into wait or type.` (21 words)

**2. `text`**
- **What anyone expects:** the page's text, as with Jina `text` or Playwright innerText.
- **Beside `read`:** the difference is only clear once `read`'s copy says Markdown.
- **Collisions:** the verb reading, `type`'s "text control" wording, and the `text` argument on `type`, `wait`, and `dialog`, as set out in the ruling.
- **Description:** `Shows the page's text without Markdown, link addresses, or heading marks. Call it for words to quote into wait or type.` (21 words)

**3. `lines`**
- **What anyone expects:** the page's text, one line at a time.
- **Beside `read`:** it is distinct from `read`, but it doesn't say that the formatting is gone.
- **Collisions:**
  - `read`'s search block is described as "matching lines come first" and prints `[OFFSET] LINE`. A model might expect `lines` to return only the matching lines, or numbered lines.
  - It can also be read as drawn lines.
- **Description:** `Shows the page's text as plain lines, without Markdown or link addresses. Call it for words to copy into wait or type.` (21 words)

**4. `wording`**
- **What anyone expects:** the words the page uses, which fits the quoting use.
- **Beside `read`:** it sits clearly apart from `read`, but tool lists rarely use the word.
- **Collisions:**
  - It matches nothing in the package.
  - It is less common English than the names ranked higher.
  - It suggests copywriting, and a model might expect the phrasing of one message rather than the whole page.
- **Description:** `Shows the page's wording as plain text, without Markdown or link addresses. Call it for words to copy into wait or type.` (22 words)

**5. `quote`**
- **What anyone expects:** text you can quote word for word. It names the purpose.
- **Beside `read`:** it is a verb, so it fits the action names.
- **Collisions:**
  - It matches nothing in the package.
  - On a store page it reads as a price quote.
  - It implies a selected passage, not the whole page.
  - It promises exactness that the capture can't keep (text-transform, generated content, date inputs; design section 9). The copy must never say "exactly".
- **Description:** `Shows the page's words without Markdown or link addresses, ready to quote into wait or type.` (16 words)

**Rejected names**

| Name | Reason |
|---|---|
| `plain` | An adjective with no noun; "plain what?" is unclear |
| `raw` | Means three things in prior art, and the output is processed, not raw |
| `content` | Prior art uses it for HTML (Playwright, Puppeteer, Readability) |
| `extract` | Prior art uses it for model extraction; it promises an answer engine |
| `scan` | `scan*` already has a fixed helper meaning in `names.md`; it also suggests skimming or barcodes |
| `skim` | Suggests a partial read, but the tool returns the whole page |
| `verbatim`, `exact`, `literal` | Promise an exactness the capture can't keep (design section 9); they are also adjectives |
| `copy` | Reads as the clipboard or as duplicating something |
| `strings` | Programmer jargon |
| `prose` | Wrong for tables, buttons, and labels |
| `transcript` | Means a record of speech |
| `body` | Confused with the HTTP body or the `<body>` element |
| `page` | The page entity (`page.read()`) |
| `view` | `BrowserViewInterface` and `view` members |
| `snapshot` | Prior art uses it for the accessibility tree; it also sounds like a picture |
| `see` | Overlaps `look` |
| `find`, `search`, `match` | Taken: the element manager's `find`, the `search` argument and outline option, and `matches` |
| `markdown` (renaming `read`) | Drops `read`, which the store proof uses; the design rejected it in section 6 |
| `read_text`, `plaintext`, `readtext` | Two words in one name, against the one-word rule |
| A `plain` boolean or format argument on `read` | Refused: a value that switches algorithms must be a separate tool (`names.md:75`, `:79`) |

Sources:
- C:/Users/mikes/WebstormProjects/browser-wt-browse/src/core/constants.ts:524-721
- C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/showcase/browse/reading-design.md
- C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/showcase/browse/reading-design/reading-prior-art.md
- C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/names.md