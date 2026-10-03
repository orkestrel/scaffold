**Ruling: name the plain-text sibling of `read` `words`**

**1. Recommended name: `words`**

The tool copy would be:

- **Description (24 words):** "Shows the page's words as plain text, without Markdown, link addresses, or image text. Call it for words to pass to wait or type."
- **`search` (66 characters):** "Words to find on this page; the lines that share them come first." Use the same copy on `read`, so `search` means one thing on both tools.
- **`offset` (68 characters):** "The character to continue from, as the last reply names. Default: 0." This is `read`'s copy unchanged (`constants.ts:558`).

Why `words` wins:

- **Anyone can guess what it returns:** the words on the page and nothing else. It also promises less than `text` does, which is accurate, because the capture leaves out link addresses, image text, and heading levels.
- **The design record already uses it:** it describes `reading.text()` as "The page's words" (`reading-design.md:63`).
- **It is distinct from `read` by name alone.** `read` gives the page with its structure, and `words` gives only its words. It is a noun, like `tabs` and `journeys`.
- **It collides with no tool, argument, or library member.** `collectBrowserWords` uses the word in the same sense, in a layer the agent never sees.
- **It makes no promise of exactness.** Section 9 forbids that promise.
- **Two of the three namers ranked it first.** The third namer ranked it third, and all three ruled it acceptable.

It has these costs:

- A model might read it as a word list or a word count. The description's "as plain text" covers this.
- It uses up the design record's fallback name for the `search` argument (`reading-design.md:301`). If `search` is ever renamed again, that fallback must be something other than `words`.
- The library calls the same capture `text()`. I accept that difference: the tool name says what the agent receives, and the method name says the format it projects.

**2. The two strongest alternatives**

- **`text` lost** for the reasons in point 3.
- **`quote` lost** because:
  - It promises exact, word-for-word text. Section 9 rules that the capture can't deliver this, because of `text-transform`, generated content, and form values.
  - On a store page, the domain the store proof tests, "quote" means a price quote.
  - It suggests one quoted passage, or output wrapped in quotation marks, not the whole page.
  - It hides the tool's second use: cheaper reading.

**3. Should `text` be the name? No.**

`text` has real points in its favour. It is the library's own name (`reading.text()`), it is the most familiar word in prior art (Jina `text`, Playwright `innerText`), and it is a noun. These problems outweigh them:

- **The design record has already ruled against it** (section 6 and D2, `reading-design.md:147-150`, `:196`). The name collides with the `text` argument of `type`, `wait`, and `dialog`. That argument already has two meanings: the page's words on `wait`, and words the agent supplies on `type` and `dialog`. A tool named `text` would be a third use of the same token.
- **A small model can confuse a tool name with an argument key.** If it calls the tool as `text({text: …})`, the refusal reads "The text tool takes no text parameter", which doesn't help it recover.
- **"Text" is also a common verb**, and most names in the tool list are verbs. `type`'s description says "Types into the text control", which points a model toward a tool named `text` for typing.
- **The name gives no reason to pick it over `read`.** Both tools would return "text", so only the description could tell them apart.

**4. Changes to `read`'s description**

Today `read` says "Reads the page's text" (`constants.ts:548`), and `look` says "Shows the page's text" (`:528`). With a third tool returning the page's text, a model can't choose between the three. `read` must name its format:

- **`read` (25 words):** "Reads the page as Markdown, with headings, tables, and link addresses. Call it to learn a fact; continue with the offset a cut result names."

`look` can keep its copy, because it also names "the elements you can act on, each with a reference like e4", which tells it apart.

With these changes the three read as:

- `look` for what you can act on.
- `read` for the page with its structure and links.
- `words` for its plain words, to pass to `wait` or `type`.

No tool's copy says "exactly" or "shorter". The 18% saving was measured on one page, the showcase.

Sources:
- `C:/Users/mikes/WebstormProjects/browser-wt-browse/src/core/constants.ts:524-563`
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/showcase/browse/reading-design.md`