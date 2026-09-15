# Handoff — D2, the browser reading arm (`@orkestrel/browser`)

Out of scope for the 2026-09-15 session by the user's ruling. This file carries everything a fresh
session needs to run D2 without re-deriving it: the goal in the user's words, the two design
sketches that are its inputs, the draft design brief and what it still needs filled, the browser
checkout's state, the phase-one outcomes the design must build on, the rulings already taken,
the constraints, and the resume steps. `HANDOFF.md` is the campaign map; this file is the D2 leaf.

## Goal, in the user's words (authoritative)

> I even have the browser package which is like a focused cdp only version of playwright that I
> want to improve for agents to use, i feel like it needs to be the right arm for an agent, it
> needs to hold the html ast, parsing it for use within itself and making it manageable for the
> agent, even going as far as bringing in the markdown package and making it optional to have the
> html filtered and converted to markdown to save on token and making it easier for the agent to
> read. I feel like the browser might be a separate idea, but I need to make sure of the tool and
> mcp package first and if we can ground those first and solidify what I am looking for them let's
> use our experience from that to improve browser as described.

The user authorized one new dependency edge and nothing else: `@orkestrel/markdown` into
`@orkestrel/browser`. Every other `NEVER add an npm package` rule stands.

## What D2 is

A design round (not an implementation unit): `planner` (Opus 5, subjective) and `analyst` (GPT-6
Astra, objective) run blind on one brief, and the Orchestrator reconciles them into units, an
exit criterion, and a routing ledger. Implementation, its audits, the browser bump, and the
consumers' re-pins follow as their own units. The plan records it as row `D2` in
`.orkestrel/campaign/plan.md` (after `L`, the landing), with rulings `R13` (both sketches are the
inputs; markdown enters browser then) and exit-criterion row `X15` (carried to phase two).

## The draft brief

`.orkestrel/campaign/D2-design-brief.draft.md` is a complete design brief in the D1 shape: role
and engine for both lanes, the objective (four outcomes), the user's instruction verbatim, the
evidence list with absolute paths and line ranges, the law, the host, the measurements, the
unknowns, eight numbered design questions, and the output shape. It carries two `TO FILL`
markers, both fillable from this campaign's records:

- **Phase-one outcomes.** The landed tool contract (`ToolContext { signal, caller? }`,
  `ToolCall`, `ToolOptions.contract`, `ToolAnnotations { pure?, untrusted?, consequential? }`,
  `ToolError`; the registry emitter `ToolManagerEventMap` with `add`, `remove`, `clear` and
  `ToolManagerInterface.emitter`/`destroy`) — tool checkout `fa88364`, guide `tool/guides/tool.md`.
  The agent's authorize → guard → dispatch order — agent `148c237`. mcp's browser face as landed
  at `7959f08`: `createPageServer({ tools, name?, version?, client? })` returning `{ client, stop }`
  over a `MessageChannel`; `createModelContext` (the WebMCP bridge with the live-state sync; the
  guide's `## WebMCP parity` matrix records that no shipping browser exposes
  `document.modelContext`). mcp's server face after the U4e chain: every `subscriptions/listen`
  stream whose filter carries `toolsListChanged` yields `notifications/tools/list_changed` from
  the registry, the consumer producer is pulled on demand, a producer failure delivers the queued
  frames first, registry changes coalesce while a frame is unread, a released subscription
  returns the consumer's iterator with the abort reason. The distribution receipts (U5c) were not
  yet run when this file was written — read `U5c-mcp-distribution-report.md` if it exists.
- **Versions at launch.** Read them from each checkout's `package.json` and the registry at that
  moment (`npm view @orkestrel/<name> version`). At this writing: browser 0.0.16 at `f932493`,
  html 0.0.9, markdown 0.0.14, scaffold 0.0.68 (published), tool 0.0.14 registry / 0.0.15 pending,
  mcp 0.0.30 registry / 0.0.31 pending, agent 0.0.22 registry / 0.0.23 pending, ollama 0.0.16.

Finalize the brief by replacing the two markers, re-checking every `file:line` it cites against
the trees at launch (browser's `src/core/types.ts` and `BrowserFrame.ts`, html's and markdown's
`types.ts`, tool's `types.ts`, mcp's `src/browser/{types,factories}.ts` and
`src/server/factories.ts`), and staging the copy the Astra lane opens under the checkout the
`codex exec` is rooted at (the draft roots it at `C:/Users/mikes/WebstormProjects`; a read-only
lane there can read every checkout).

## The two sketches (the inputs the brief names)

**Planner (Opus), `D1-design-planner.md` § 5.** Add nothing that re-wraps `@orkestrel/html`.
Give `BrowserFrameInterface` two siblings beside `content()` and `article()`:
`tree(): Promise<HTMLInterface>` (the frame's current HTML parsed into html's own handle, so the
querying vocabulary — `walk`, `find`, `filter`, `reduce`, `fold`, `stream`, `span`, `sanitize`,
`distill` — is the one a reader already knows) and `markdown(options?: BrowserMarkdownOptions):
Promise<string>` (`createHTML(html)`, optional `distill()`, `htmlToMarkdown`, `renderMarkdown`),
with `BrowserMarkdownOptions { distill?: boolean; limit?: number }` where `limit` counts
characters — the package counts no tokens and adds no tokenizer. Three things phase one had to
settle first, and did: `ToolContext.signal` exists (a page read cancels), `ToolAnnotations` exists
(a read is `pure`, a click is `consequential`), and `createPageServer`'s shape is landed (phase
two reuses it rather than inventing a second registry).

**Analyst (Astra), `D1b-design-astra.md` § 5 (sketch only, not an approved API).** A
`page.reading` manager with `capture()` retaining an `HTMLInterface` from a bounded page capture,
a readonly `document`, separate `text()` and `markdown()` projections, `clear()` releasing the
capture, and a grouped `limit: { bytes, nodes, depth, tokens }` where a token ceiling must name
its measurement function (a character length is not a token count). Filtering uses html's
existing immutable transformations. Keep `BrowserSnapshot` separate: its CDP nodes are not HTML
nodes. Open decisions it names: navigation invalidation, frame ownership, capture consistency,
truncation reporting, and whether `article()` shares the implementation. Its risk note: html's
parser is not an HTML5 DOM constructor, its hidden-content filtering does not inspect computed
style, and Markdown projection loses information — phase two needs measured bounds and explicit
freshness semantics.

The Grok distillate `G3-browser-html-markdown-distillate.md` records the browser reading surface
today: `content()` returns `{ url, title, html, text }` strings; `article()` is
`renderText(createHTML(html).distill().document)` and the only html use; `page.snapshot()` is a
`DOMSnapshot` tree of `BrowserNode`; `BrowserAccessibility.snapshot()`; locators; browser has no
`src/browser` environment; its service tests launch a real Chromium through `src/server`.

## The eight design questions the brief asks (answer each by number)

1. Ownership and shape — frame methods, a `reading` manager, or a third; the wrapper test.
2. The tree — how the HTML is captured (`outerHTML` through `Runtime.evaluate` as `content()`
   does today, or another CDP path), retained or parsed per call, invalidated on navigation
   without polling, released by `clear` or `destroy`.
3. Manageability — the bound shape, truncation reported on the result, `distill` as a switch or a
   projection, `sanitize` by default or not.
4. Markdown — the projection path, the option shape, whether `article()` becomes a projection of
   the same capture.
5. Agent tools — which tools the arm ships and where they live, their `contract` shapes and
   annotations, how each observes `context.signal`, and whether browser exposes an MCP server
   over a session (composing mcp's server factories) or leaves that to a consumer.
6. Snapshot versus tree — separate, or bridged with a locator-to-node mapping.
7. Tests — where the real-Chromium proofs live and what each proves.
8. Blast radius — the markdown edge, the browser bump, the guide sections, the consumers that
   re-pin (ollama is the one known consumer: its page proof drives Edge through
   `@orkestrel/browser` as a devDependency).

## Rulings already taken that bind D2

- **No polling** (`AGENTS.md` § Design laws): a retained tree is invalidated by navigation
  events (`BrowserTransition` exists in browser) or by an explicit `clear`, never by a poll.
- **Absence is `undefined`**; single-word members; `#` fields; readonly interface properties
  (the mcp U4e-f/U4e-g rounds learned this the hard way: a shared mutable record must stay a
  private inline structural type, never a published interface).
- **Reuse before wrapping**: a member that forwards 1:1 to `@orkestrel/html` fails the wrapper
  test; `HTMLInterface` is handed out as itself.
- **A host fact is never an unconditional test assertion** (mcp U4l ruling): assert the
  relationship that holds on any host; real-Chromium proofs read the host at run time.
- **Fleet name ownership** (`names.md` § Fleet name ownership, scaffold 0.0.68's `surface` rule):
  a new bare export in browser must not collide with any other package's guide; check every
  candidate name against `scaffold/guides/*.md` before writing it (this session's `collide3.sh`
  probe in the scratchpad checked test/contract names only; the `surface` policy rule in a
  re-pinned target checks every hosted guide). Browser's own `tests/setup.ts` helper was already
  renamed `createCDPTestTransport` (U14d) so the rule passes at re-pin.
- **Bench limits**: a Codex bench cannot launch Chromium or install a package, so the
  real-Chromium implementation and its proofs route to the native Opus `implementer`; Astra takes
  the objective design lane and read-only audits.
- **Versions**: html and markdown do not bump for D2's design; browser bumps when it implements
  (a runtime dependency edge on markdown moves its published surface); ollama re-pins browser
  afterwards.

## Browser checkout state at this writing

- `C:/Users/mikes/WebstormProjects/browser` at `f932493` (`test: rename the fake CDP transport
  helper for what it is`) on `1acadb4`, clean, unpushed. Published 0.0.16.
- Pending before D2, independent of it: re-pin `@orkestrel/scaffold` to `^0.0.68`, `npm install`,
  the preparation commit, `scaffold overwrite`, `scaffold audit` exit 0, format, gates, the
  dist-versus-tarball comparison (no bump owed unless dist moved) — the release visit in
  `.agents/skills/orkestrel-publish/references/wave.md` § Visit a repository. `HANDOFF.md`
  names the visit instrument if one landed before the session ended.

## What the campaign learned that D2 should use

- The ollama page proof (`ollama/tests/service/page.test.ts`, landed at `058e86a`) drives a real
  Edge 153 through `@orkestrel/browser`'s CDP client against a live daemon, with a bounded attempt
  (`boundPageAttempt`, `PAGE_BOUNDS`) and `BrowserOptions.signal` cancelling discovery, the port
  check, the launch, and `client.connect()`. It is the working example of an agent tool loop
  running in a page, and the shape a "read this page" tool's proof can follow.
- mcp's `createPageServer` is the delivery shape for browser-side tools: an MCP server bound to a
  page over a `MessageChannel`, with the client bound but not connected at return, and `stop`
  refusing every session-bound request with `-32600` afterwards.
- The `tool` contract's `ToolContext.signal` reaches a handler; a page read that ignores it is the
  leak the planner's sketch warned about.
- The mcp subscription-stream rounds (U4e … U4e-g, audits A4k … A4n) are the reference for
  demand-driven streaming, failure ordering, and coalescing if the reading arm ever streams page
  content: pull on demand, deliver what was queued before a terminal, coalesce payload-free
  notifications, release with a reason.

## Resume steps

1. Read `HANDOFF.md` for the campaign state, then this file, then
   `D2-design-brief.draft.md`, `D1-design-planner.md` § 5, `D1b-design-astra.md` § 5, and
   `G3-browser-html-markdown-distillate.md`.
2. Confirm phase one is landed and published (tool 0.0.15, mcp 0.0.31, agent 0.0.23; the
   consumers re-pinned), and that browser's release visit against scaffold 0.0.68 is green.
3. Probe bench liveness (`codex --version`, a bounded `gpt-6-astra` round trip) and record it.
4. Fill the draft's two `TO FILL` markers, re-check every cited `file:line`, stage the brief for
   the Astra lane, and launch both lanes blind (`planner` native on Opus; `analyst` through a
   read-only `codex exec`).
5. Reconcile into `plan.md` (a `D2` section: rulings, units, routing ledger, exit criterion),
   then implement per the routing: the reading arm and its Chromium proofs on the native Opus
   `implementer`; objective constraint units on Astra; audits with both lanes and a checker.
6. Bump browser, refresh its guide, re-pin ollama, publish in layer order with the user's
   one-time code, and refresh the scaffold-hosted floor afterwards (a scaffold release).
