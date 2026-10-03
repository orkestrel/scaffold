# Prior art: how tools name and split page reading (researched 2026-10-03, Opus researcher)

## Sources and facts

- Playwright: `page.content()` returns the full HTML with doctype; locator `allInnerTexts()` (innerText) and `allTextContents()` (textContent); `ariaSnapshot()` returns the role and name tree as YAML (options: depth, boxes, an AI mode). https://playwright.dev/docs/api/class-page, https://playwright.dev/docs/api/class-locator
- Playwright MCP: `browser_snapshot` (accessibility snapshot with refs; target, depth, boxes, filename), `browser_find` (text or regex search of the snapshot), `browser_take_screenshot` (element, fullPage); no text or markdown tool. https://github.com/microsoft/playwright-mcp
- Chrome DevTools MCP: `take_snapshot` (accessibility-tree text with uids; `verbose` for the full tree), `take_screenshot`; no text or markdown tool. https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/tool-reference.md
- Puppeteer: `content()`, `title()`, `url()`, `accessibility.snapshot()`, `$eval`, `evaluate`, `screenshot()`, `pdf()`. https://pptr.dev/api/puppeteer.page
- WebDriver BiDi: `browsingContext.locateNodes` (css, xpath, innerText, accessibility, context locators), `script.evaluate`, `captureScreenshot`. https://w3c.github.io/webdriver-bidi/
- browser-use: `extract` (LLM over page markdown; `extract_links`, `extract_images`, `start_from_char`), `search_page` (grep, no LLM), `find_elements` (CSS), `get_dropdown_options`, `screenshot`. https://github.com/browser-use/browser-use (tools/service.py)
- Stagehand: `extract()` (schema plus instruction; `selector`, `ignoreSelectors`; with no arguments returns `pageText` from the accessibility tree), `observe()` returns candidate actions. https://docs.stagehand.dev/v3/basics/extract, https://docs.stagehand.dev/v3/basics/observe
- Firecrawl scrape formats: `markdown`, `html` (cleaned), `rawHtml`, `links`, `images`, `summary` (LLM), `json` (schema), `screenshot`, `changeTracking`; options `onlyMainContent` (default true), `includeTags`, `excludeTags`, `waitFor`. https://docs.firecrawl.dev/advanced-scraping-guide
- Jina Reader: `markdown` (unfiltered), `html` (outerHTML), `text` (body innerText), `screenshot`, `pageshot`, `frontmatter`; headers for target, remove, and wait selectors, retain-links and retain-images modes, links and images summaries, max tokens. https://github.com/jina-ai/reader
- Mozilla Readability: `parse()` returns title, content (HTML), textContent, length, excerpt, byline, dir, siteName, lang, publishedTime. https://github.com/mozilla/readability
- Crawl4AI: `raw_markdown` (no filter), `fit_markdown` and `fit_html` (after a pruning or BM25 filter), `markdown_with_citations`, `references_markdown`. https://docs.crawl4ai.com/core/markdown-generation/
- MCP fetch server: `url`, `max_length` (default 5000), `start_index`, `raw` (no markdown conversion). https://github.com/modelcontextprotocol/servers/tree/main/src/fetch

## Axes the field splits on

1. Whole page versus main content: Firecrawl `onlyMainContent` (default on); Crawl4AI `raw_` versus `fit_`; Readability main only; Jina and fetch unfiltered. Inconsistent names; nobody else says "distill".
2. Markup versus text versus markdown versus structure: html/rawHtml/content; text/innerText/textContent; markdown; snapshot/ariaSnapshot (always the accessibility tree in agent tools).
3. Raw versus processed: Firecrawl `rawHtml` (as served) versus cleaned `html`; fetch `raw` (no markdown conversion); Crawl4AI `raw_` (no filter). "Raw" means three things.
4. Region: include by selector (Stagehand `selector`, Firecrawl `includeTags`, Jina target selector) and exclude (`ignoreSelectors`, `excludeTags`, remove selector).
5. Visible versus all: innerText versus textContent; viewport versus full-page screenshots.
6. Links and media: a separate format (Firecrawl), a flag (browser-use), a summary footer (Jina), citations (Crawl4AI).
7. Interactive state: snapshot refs, `observe`, `get_dropdown_options`; form values only through snapshots.
8. Changes since the last read: only Firecrawl `changeTracking`.
9. Paging and length: `start_index`/`max_length`, `start_from_char`, `x-max-tokens`.
10. LLM-shaped output: extract, json, summary (schema plus instruction).

## Naming lessons

- Understood without docs: html, markdown, text, links, images, screenshot, title, find, search.
- Misleading: "snapshot" (sounds like a picture, means the accessibility tree); "extract" (LLM in some tools, raw text in another); "observe" (returns actions); "fit" (jargon); "content" (HTML in Playwright and Puppeteer, article HTML in Readability).
- Collisions: `text` is innerText in Jina and Playwright but textContent in Readability; `raw` (three meanings); `html` cleaned in Firecrawl, outerHTML in Jina; main-content filtering defaults on in Firecrawl, off in Jina, Crawl4AI, and fetch.

## Unknowns

Playwright's exact page-level `innerText`/`innerHTML`/`inputValue` doc text; BiDi's page-source absence (from a fetch summary); Jina's format header name and whether its markdown runs readability; how browser-use builds its markdown; Firecrawl `changeTracking` and `json` defaults; no tool with a dedicated forms or tables read was found.
