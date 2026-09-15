# Unit G3 — absorb `@orkestrel/browser`, `@orkestrel/html`, and `@orkestrel/markdown` (page reading for agents)

## Role and engine

`grok` on Cursor Grok (`cursor-grok-4.6-high`), reached as the Cursor CLI in print mode. You are the
bench engine reading this brief inside your own CLI: perform the assignment directly and spawn
nothing. This lane is READ-ONLY. Edit nothing, create nothing, run no command that writes.

## Objective

Return the distilled evidence the Orchestrator needs to answer one question:

> Under the contracts published today, how does `@orkestrel/browser` let a consumer read a page
> (snapshot, accessibility tree, HTML, text) and act on it; what does `@orkestrel/html` parse and
> into what structure; and can `@orkestrel/markdown` turn HTML (or an HTML tree) into Markdown?

## Context

- Checkouts (absolute paths):
  - `C:/Users/mikes/WebstormProjects/browser` — `@orkestrel/browser` 0.0.16. Exports `.` (core) and `./server`. Deps: contract, emitter, html, websocket.
  - `C:/Users/mikes/WebstormProjects/html` — `@orkestrel/html` 0.0.9. Deps: contract.
  - `C:/Users/mikes/WebstormProjects/markdown` — `@orkestrel/markdown` 0.0.14. Deps: contract, html.
- Law you may cite: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.

## Scope (read these, in this order)

1. `browser/src/core/types.ts` (first; it is large — read all of it), `browser/src/core/index.ts`, `browser/src/core/CDPClient.ts`, `browser/src/core/BrowserPage.ts`, `browser/src/core/BrowserSnapshot.ts`, `browser/src/core/BrowserAccessibility.ts`, `browser/src/core/BrowserLocator.ts`, `browser/src/core/BrowserFrame.ts`, `browser/src/core/BrowserHandle.ts`, `browser/src/core/BrowserSelectorManager.ts`, `browser/src/core/BrowserContext.ts`, `browser/src/core/compilers.ts`, `browser/src/core/parsers.ts`, `browser/src/core/helpers.ts`, `browser/src/core/factories.ts`.
2. `browser/src/server/types.ts`, `browser/src/server/index.ts`, `browser/src/server/Browser.ts`, `browser/src/server/factories.ts`, `browser/src/server/transports/WebSocketCDPTransport.ts`, `browser/src/server/writers/FileBrowserWriter.ts`.
3. `browser/guides/browser.md` (2200 lines): the full heading tree; in full, every section on snapshots, accessibility, locators, page content, evaluation, and the server environment.
4. `html/src/core/types.ts`, `html/src/core/index.ts`, and `C:/Users/mikes/WebstormProjects/scaffold/guides/html.md` (the mirror; use `browser/guides/html.md` if identical).
5. `markdown/src/core/types.ts`, `markdown/src/core/index.ts`, and `C:/Users/mikes/WebstormProjects/scaffold/guides/markdown.md`.
6. `browser/tests/service/browser.test.ts`, `browser/tests/setupService.ts` — only for Evidence item 7.
7. `browser/package.json`, `browser/vite.config.ts`.

## Evidence sought (number your answers to match)

1. **Barrel and environment map.** Every class in `browser/src/core/index.ts` with a one-line purpose; group them as navigate, read, act, observe, configure. Every row of `browser/src/server/index.ts` with one line. Confirm there is no `src/browser` environment.
2. **How a page is read.** For `BrowserSnapshot`, `BrowserAccessibility`, `BrowserPage`, `BrowserFrame`, and `BrowserLocator`: every method that returns page content or structure (HTML, text, accessibility nodes, DOM nodes, screenshots, a tree), with its signature, its return type spelled out from `types.ts`, and `file:line`. State which CDP domains and methods each one calls (`DOM.getDocument`, `Accessibility.getFullAXTree`, `Runtime.evaluate`, `Page.captureScreenshot`, …) with `file:line`. State whether any method returns a parsed tree (as opposed to a string), and the tree's node type.
3. **Locators.** The selector engines `BrowserLocator`/`BrowserSelectorManager` support (CSS, XPath, text, role, test-id, …) and how a selector is compiled (`compilers.ts`), with `file:line`.
4. **`@orkestrel/html` usage in browser.** Every import of `@orkestrel/html` in `browser/src/**` with the symbols imported and the purpose at each call site, `file:line`.
5. **`@orkestrel/html` surface.** Every export in `html/src/core/index.ts` and every type in `html/src/core/types.ts` with one line: does it parse HTML text into a tree (node kinds, attributes, text, children), serialize a tree, query a tree, sanitize? The guide's tagline and its heading tree to two levels. Host independence (imports).
6. **`@orkestrel/markdown` surface.** Every export in `markdown/src/core/index.ts` and every type in `markdown/src/core/types.ts` with one line. The directions it supports: Markdown → tree, tree → Markdown, Markdown → HTML, HTML → Markdown, HTML tree → Markdown tree. How it uses `@orkestrel/html` (every import site with purpose). The guide's tagline and heading tree to two levels.
7. **Launch and transport.** How a `Browser` is launched or attached in `browser/src/server/Browser.ts` (executable resolution, flags, CDP endpoint discovery), what `WebSocketCDPTransport` wraps, whether `CDPClient` in core accepts any transport implementing a published interface (name it), and what `browser/tests/service/browser.test.ts` drives (which real browser, how launched, what it asserts — titles only).
8. **Guide.** `browser.md` heading tree to two levels; quote (at most three lines each) every passage that mentions agents, models, tokens, Markdown, snapshots for a model, or the accessibility tree as a reading surface. Say `none found` where nothing matches.
9. **Packaging.** `exports`, `files`, `sideEffects`, `engines` of `browser/package.json` verbatim; Vitest projects in `browser/vite.config.ts` (names, environments).
10. **Naming facts a designer needs.** The one-word member names on `BrowserPage` (managers and methods), and every `create*` factory in core and server with its signature.

## Output

Return only, in this order:

- `Question`: one line.
- `Evidence`: the ten numbered items, each a compact list of facts with `file:line` pointers. Quote signatures verbatim; never paste a whole file. Keep the whole section under about 600 lines.
- `Distillate`: at most 25 lines: the smallest set of facts a designer needs to decide how an agent-facing page-reading surface (HTML tree, accessibility tree, Markdown projection) would be built from what exists.
- `Unknowns`: facts the scope did not settle, one per line, naming the evidence item.
- `Journal`: write `journal: (driver fills)`.
- `Deviation`: `none`, or the exact failure.

No decisions, no design, no recommendations, no process diary.
