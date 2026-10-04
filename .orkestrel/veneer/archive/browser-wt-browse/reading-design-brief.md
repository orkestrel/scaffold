# Reading-method design round, 2026-10-03

## The user's request

The user wants the ways `@orkestrel/browser` reads a page analyzed thoroughly before any switch is added: consider different methods and names that anyone understands by name alone (what each does and provides), consider the different angles and vectors of what a reader wants, decide the methods first, and only then the options that fine-tune them. Their example: reading just the text, the way the package can already distill to Markdown. A toggle on the existing `read` would be easy; they want the methods considered first.

## Scope

Both surfaces, together:
- the library: `BrowserReadingInterface` (`html`, `markdown()`, `text()`, `distill`, slicing), the `read` methods on the view, page, frame, and element, the outline and accessibility readings, `wait`, and the DOM placement's equivalents;
- the agent toolset: `look`, `read`, `wait`, the action receipts, and the tool copy (`src/core/constants.ts`, `src/core/BrowserToolset.ts`).

## Evidence (read all of it; cite `path:line`)

- `tmp/codex/reading-surface-map.md`: every reading path today, what it returns and drops, the gaps by reader need, and the recorded agent runs. Note its finding that the `read` tool ignores `what` and refuses `ref`.
- `tmp/codex/reading-prior-art.md`: how Playwright, Playwright MCP, Chrome DevTools MCP, Puppeteer, WebDriver BiDi, browser-use, Stagehand, Firecrawl, Jina Reader, Readability, Crawl4AI, and the MCP fetch server name and split page reading, the axes they split on, and the names that mislead or collide.
- `tmp/codex/browse-11-design.md`: item 11's capture design (prune what is not rendered, lower the HTML floor's text-bearing elements into inert markup before projection, redact password and hidden inputs, the per-element readings of what a person sees, and the cases no reader can render exactly yet). Treat its capture as the substrate the methods sit on; it is not under review here except where a method needs something it cannot give.
- `tmp/browse-item-12-design.md`: `wait` with `absent`, and the rulings in `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\showcase\browse.md` § Item 12 rulings.
- The law: this checkout's `AGENTS.md` and `.claude/rules/names.md`, `patterns.md`, and `architecture.md`. Single-word entity APIs (change the shape when one word cannot carry it), one concept one term, a binary behavioral switch is a boolean, absence is `undefined`, minimal public API, no compatibility shims (update every consumer in the same change), mechanism not product policy.
- Constraints already ruled: the floor in `@orkestrel/html` and `@orkestrel/markdown` stays unchanged; the tool copy's serialized definitions are bounded at 6,050 characters (`tests/src/core/BrowserToolset.test.ts`), and a raise needs the smallest multiple of 50 that holds the measured length with both lengths recorded.

## Deliverable

1. **The axes** a reader of a web page can want, each named, with the reader need behind it and whether your design covers it, defers it, or refuses it (and why).
2. **The method set.** For each method: its name; one sentence a newcomer understands without documentation; what it returns; what it leaves out; which surfaces carry it (library, tool, or both) and which placements (CDP, DOM); its options, each with name, type, default, and effect. Say why each method is a method rather than an option of another, and why each option is an option rather than a method.
3. **The tool surface.** Which agent tools exist after the change, their one-line copy, their arguments, and the measured or estimated change against the 6,050-character bound. Rule what `read`'s `what` does.
4. **Naming defense.** For every name: what a reader expects from the word, which prior-art meanings it matches or collides with, and why it wins over the two strongest alternatives.
5. **Migration.** Every current method, option, tool, argument, test, journey, and guide row that changes, with no shim.
6. **Risks and open questions for the user,** each with your recommendation.

No process diary.
