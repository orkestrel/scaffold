# Unit D2 — design: the browser reading arm (`@orkestrel/browser` holds, manages, and projects the page's HTML tree for an agent)

DRAFT — finalize after phase one accepts: fill the "Phase-one outcomes" list from the U4/U5
reports and the A4/A5 verdicts, and name the mcp/tool versions the checkouts pin at that moment.

## Role and engine

This one brief goes, unchanged, to two blind lanes:

- **Subjective lane:** `planner` on Opus 5, a native Claude subagent (read-only tools: Read, Grep,
  Glob). Fill `Design`, `Alternatives`, `Units`, `Tensions`, `Risks`.
- **Objective lane:** `analyst` on GPT-6 Astra (`gpt-6-astra`, the objective engine for this
  campaign, in the Sol seat), reached as a read-only `codex exec` rooted at
  `C:/Users/mikes/WebstormProjects`. Fill `Constraints`, `Refusals`, `Measurements`, `Units`,
  `Tensions`, `Risks`.

Whichever lane you are: perform the assignment directly and spawn nothing. Do not see, guess at,
or reconcile the other lane's answer. Do not hedge toward an imagined consensus. State which lane
you hold in your first line.

## Objective

Return a design — API shape, vocabulary, placement, units, acceptance criteria — that makes the
following true with the smallest coherent change to `@orkestrel/browser`, reusing
`@orkestrel/html` and `@orkestrel/markdown` as they are:

1. A frame's current HTML is available to an agent as a parsed tree it can walk, find in, filter,
   and reduce — `@orkestrel/html`'s own handle, never a re-wrapped copy.
2. The tree is manageable for a model: bounded by a caller-stated limit, distilled to the
   reader-facing content on request, and reported honestly when truncated.
3. The same content is available as Markdown through `@orkestrel/markdown`, optional, so a
   consumer that wants fewer tokens gets prose and one that wants structure gets the tree.
4. The reading arm's first real consumers are tools an agent calls (`read this page`, `read this
   element`), so they carry the landed `ToolContext.signal` (a page read cancels) and the landed
   `ToolAnnotations` (`pure` for a read, `consequential` for a click), and they are exposable
   through the landed `createPageServer` shape or a Node MCP server without a second registry.

## What this round decides

The units, their order, ownership, and the phase's exit criterion for the browser reading arm.
What you do not name is not built.

## The user's instruction (verbatim, authoritative over every later item)

> I even have the browser package which is like a focused cdp only version of playwright that I
> want to improve for agents to use, i feel like it needs to be the right arm for an agent, it
> needs to hold the html ast, parsing it for use within itself and making it manageable for the
> agent, even going as far as bringing in the markdown package and making it optional to have the
> html filtered and converted to markdown to save on token and making it easier for the agent to
> read. I feel like the browser might be a separate idea, but I need to make sure of the tool and
> mcp package first and if we can ground those first and solidify what I am looking for them let's
> use our experience from that to improve browser as described.

The user authorized adding `@orkestrel/markdown` as a dependency of `@orkestrel/browser`, and
nothing else new.

## Context

**Phase-one outcomes (the experience this design must build on).** TO FILL: the landed
`ToolContext { signal, caller? }`, `ToolCall`, `ToolOptions.contract`, `ToolAnnotations { pure?,
untrusted?, consequential? }`, `ToolError`; the agent's authorize → guard → dispatch order; mcp's
`createPageServer` and `createModelContext` shapes as landed (U4 report), the distribution
receipts (U5 report), and the audits' rulings that bear on browser (A4, A5). Versions the
checkouts pin at launch.

**Evidence (read every file).** Under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/`:

- `D1-design-planner.md` § 5 — the planner's sketch: `frame.tree(): Promise<HTMLInterface>` and
  `frame.markdown(options?: BrowserMarkdownOptions)` beside `content()` and `article()`;
  `distill?: boolean`, `limit?: number` (characters; no tokenizer).
- `D1b-design-astra.md` § 5 — the analyst's sketch: a `page.reading` manager with `capture()`,
  readonly `document`, `text()`, `markdown()`, `clear()`, grouped `limit: { bytes, nodes, depth,
  tokens }` with a caller-supplied `measure` when a token ceiling is requested; keep
  `BrowserSnapshot` separate (CDP nodes are not HTML nodes); navigation invalidation, frame
  ownership, capture consistency, truncation reporting, and whether `article()` shares the
  implementation are the open decisions.
- `G3-browser-html-markdown-distillate.md` — the browser reading surface today (`content()`
  returns `{ url, title, html, text }` strings; `article()` is `renderText(createHTML(html).distill().document)`
  and the only html use; `page.snapshot()` is a `DOMSnapshot` tree of `BrowserNode`;
  `BrowserAccessibility.snapshot()`; locators; no `src/browser` environment; service tests launch
  a real Chromium through `src/server`), `@orkestrel/html`'s `HTMLInterface` (`walk`, `find`,
  `filter`, `reduce`, `fold`, `stream`, `span`, `sanitize`, `distill`) and `@orkestrel/markdown`'s
  `htmlToMarkdown(HTMLNode): MarkdownDocument` and `renderMarkdown`.
- `plan.md` R13, X15; `goal.md` outcome 4.

Then read first-hand:

- `C:/Users/mikes/WebstormProjects/browser/src/core/types.ts` — `BrowserContentResult` and the
  frame read methods (around lines 380–420 and 1770–1810), `BrowserSnapshot` types (around
  1850–1900); `browser/src/core/BrowserFrame.ts` lines 100–145 and 230–270 (`content`, `article`,
  `#captureHTML`, `#evaluate`, the isolated world).
- `C:/Users/mikes/WebstormProjects/html/src/core/types.ts` lines 400–480 (`HTMLInterface`) and the
  `HTMLNode` declaration; `C:/Users/mikes/WebstormProjects/markdown/src/core/types.ts` for
  `MarkdownDocument`, and the `htmlToMarkdown` and `renderMarkdown` declarations.
- `C:/Users/mikes/WebstormProjects/tool/src/core/types.ts` (whole file) — the landed contract.
- `C:/Users/mikes/WebstormProjects/mcp/src/browser/types.ts` and `factories.ts` — `createPageServer`
  as landed; `mcp/src/server/factories.ts` — the Node server factories a browser MCP server would
  compose.
- The guides: `browser/guides/browser.md` (the reading sections), `scaffold/guides/html.md`,
  `scaffold/guides/markdown.md`, `tool/guides/tool.md`, `mcp/guides/mcp.md` `### Browser transport`.

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; the rule files under
`C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/` — `names.md`, `typescript.md`,
`architecture.md`, `patterns.md`, `tests.md`, `workspace.md`, `documentation.md`, `quality.md`,
`writing.md`; the skill `.agents/skills/orkestrel-align-packages/SKILL.md` and its
`references/integration.md`; the skill `.agents/skills/orkestrel-harden-package/SKILL.md`. The
`.agents/orchestration.md` vocabulary for `Units`.

**Host.** Windows 11. You are read-only. Every path above is absolute. Chromium is launchable on
this host through browser's `src/server` (its service tests do so today).

**Measurements (taken by the Orchestrator).** browser 0.0.16 at `1acadb4`, html 0.0.9 at
`20ed05d`, markdown 0.0.14 at `af27846`, every tree clean; browser depends on html `^0.0.9` and
not on markdown; markdown depends on html `^0.0.9`. TO FILL at launch: the tool, mcp, agent
versions the checkouts hold.

## Unknowns

- The cost of parsing a large page's HTML through `createHTML` in the Node process that drives
  CDP (a lane may name the measurement unit; do not assume it is cheap or expensive).
- Whether the parsed tree can be kept coherent across navigation without a polling architecture
  (`AGENTS.md` forbids polling; the browser package already has navigation events and
  `BrowserTransition`).

## The design questions (answer each by number)

1. **Ownership and shape.** Rule between the two sketches or a third: methods on
   `BrowserFrameInterface` (`tree()`, `markdown()`) versus a `reading` manager on the page or frame
   with a retained capture, versus something else. Apply the wrapper test from `AGENTS.md`: a
   member that forwards 1:1 to `@orkestrel/html` fails it. Name every one-word member.
2. **The tree.** The handle is `@orkestrel/html`'s `HTMLInterface` over the frame's current HTML
   (captured how: `outerHTML` through `Runtime.evaluate` as `content()` does today, or another
   CDP path — rule with evidence). Rule on retention: does the package hold the tree between calls
   (then how it is invalidated on navigation without polling, and how `clear` or `destroy`
   releases it) or parse per call.
3. **Manageability.** Rule on bounds: a single character `limit`, a grouped
   `limit: { bytes, nodes, depth }`, a token ceiling with a caller-supplied `measure`, or a
   combination; how truncation is reported (a field on the result, never silently); whether
   `distill` is a boolean switch or a separate projection; whether `sanitize` is applied by default.
4. **Markdown.** Rule on the projection path (`htmlToMarkdown` then `renderMarkdown`), the option
   shape, and whether `article()` becomes a projection of the same capture or stays as it is.
5. **Agent tools.** Name the tools the reading arm ships (or refuse to ship tools from the browser
   package and say where they live): their names, `contract` shapes, annotations, and how each
   observes `context.signal`. Rule on whether the browser package exposes an MCP server over a
   browser session (composing mcp's server factories) or leaves that to a consumer.
6. **Snapshot versus tree.** Rule on the relation between `BrowserSnapshot` (CDP `DOMSnapshot`,
   `BrowserNode`) and the HTML tree (`HTMLNode`): separate as Astra says, or bridged — and if
   bridged, how a locator's element maps to a tree node.
7. **Tests.** Where the real-Chromium proofs live (browser's service tests launch Chromium through
   `src/server`), what each proves, and the fixture pages.
8. **Blast radius and order.** The dependency edge (markdown into browser), the version bump, the
   guide sections, and the consumers that re-pin.

## Output

Return the same section shape as D1: the sections your lane owns, numbered answers to the design
questions, a `Units` table (unit, role, engine, owned files, acceptance criteria, dependencies), and
an exit criterion listing the capabilities whose closure ends the phase. Cite `file:line` for every
factual claim. No process diary.
