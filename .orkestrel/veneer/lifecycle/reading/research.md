# Research: line-addressed reading in agent harnesses (2026-10-06)

An Opus `researcher` lane produced this research on 2026-10-06, read-only, with web sources. It extends `lifecycle/store-design/map-research.md`. Every result was measured on large models or described in documentation. **None was measured on a model of 8B or smaller**, so the campaign's own 2B trials must settle the design rows.

## Measured

- **SWE-agent's agent-computer interface** (https://arxiv.org/html/2405.15793):
  - **The viewer:** it shows at most 100 lines, with line numbers, the file path, the total line count, and how many lines are hidden above and below. The model moves with `goto`, `scroll_up`, and `scroll_down`.
  - **Window size:** a 100-line window resolved 18.0% of tasks, against 14.3% for 30 lines and 12.7% for the whole file.
  - **Search:** a summarized search capped at 50 results, which asks for a narrower query when over the cap, scored 18.0%. Iterative paging through results scored 12.0%, and no search tools scored 15.7%.
  - **History:** keeping the last 5 observations scored 18.0%, against 15.0% with the full history.
- **WebArena** (https://arxiv.org/html/2307.13854): the observation is an accessibility tree with unique ids, the action is `click [id]`, and the observation can be limited to the viewport. The GPT-4 baseline reached 14.41%, against 78.24% for humans.

## Documented practice

- **Anthropic's text editor tool** (https://platform.claude.com/docs/en/agents-and-tools/tool-use/text-editor-tool):
  - `view_range` takes 1-indexed lines, with -1 meaning the end.
  - Output prefixes each line with its number.
  - The documentation calls line numbers "essential" for `view_range`.
  - An optional `max_characters` cap truncates the view.
- **Claude Code:**
  - The Read tool takes `offset` and `limit` in lines, prints `cat -n` numbering, and defaults to 2000 lines. This comes from the session's own tool schema, not a public page.
  - Bash output past about 30,000 characters is saved to a file, and the model gets a 2,000-character preview (https://code.claude.com/docs/en/tools-reference).
- **Playwright MCP** (https://github.com/microsoft/playwright-mcp): the accessibility snapshot carries `ref=e7`. Its `target` option limits the output to one subtree, and `depth` bounds it.
- **browser-use** (its system prompt on GitHub):
  - Elements appear as `[index]`, and the prompt says "only use indexes explicitly provided".
  - By default only elements in the viewport are listed.
  - It offers a cheap text search, `search_page`.
- **BrowserGym** (https://arxiv.org/html/2412.05467): it shrinks the prompt to a target length rather than cutting it off blindly.
- **Continuation:** every harness surveyed continues by line. Character limits only cap output, and none continues from a character position.

## Applicable findings

1. **Window:** default to a bounded window of lines. 100 lines beat both 30 lines and the whole file, measured on code with large models.
2. **Numbering:** prefix every line with its number, and take 1-indexed integer `from` and `to` with an end sentinel.
3. **Position:** state the total lines and how many are hidden above and below.
4. **Search:** return one summarized, capped list. Over the cap, return nothing and ask for a narrower query.
5. **Search-then-read:** it beat having no search (18.0 against 15.7).
6. **References:** element references are short opaque tokens taken only from the latest output.
7. **Overflow:** continue from a line, never from a character position.
8. **Unmeasured at 8B and under:** window size, footers, reference format, and line against character coordinates.

## Unverified

- **EffGen** (https://arxiv.org/pdf/2602.00887) claims that small models confuse integers and strings. The fetch gave no numbers, so the claim is unverified.
- **The filtering paper:** the arXiv id 2609.27770 looks inconsistent with its LLaMA-2 subject.
