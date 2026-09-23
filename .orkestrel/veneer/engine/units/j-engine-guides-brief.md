# Unit J-ENGINE-GUIDES — every `@orkestrel/*` guide swept for the engine's mechanisms

## Role and engine

`grok` on Cursor Grok 4.7 (`grok-4.7-high`), reached as the versioned Cursor CLI entry in `-p --mode=ask` print mode, read-only. The executor that opens this brief is the Grok engine inside that CLI.

## Objective

One distillate that, for each mechanism the J-ENGINE campaign still implements, names every export in every `@orkestrel/*` package guide under `C:/Users/mikes/WebstormProjects/scaffold/guides/` whose stated semantics could serve it, with a `file:line` pointer per fact and the guide's own words on what the export does and does not do, so the Orchestrator can put each candidate to the user as a capability and defect matrix rather than guessing from package names.

## Context

**Evidence.** The guides folder `C:/Users/mikes/WebstormProjects/scaffold/guides/` (one Markdown file per package: `abort.md`, `agent.md`, `brief.md`, `browser.md`, `budget.md`, `codec.md`, `console.md`, `contract.md`, `csv.md`, `database.md`, `emitter.md`, `form.md`, `guide.md`, `html.md`, `indexeddb.md`, `interpret.md`, `lsp.md`, `markdown.md`, `mcp.md`, `middleware.md`, `msg.md`, `ndjson.md`, `ollama.md`, `pool.md`, `probe.md`, `process.md`, `program.md`, `qualifier.md`, `queue.md`, `rater.md`, `reason.md`, `relation.md`, `router.md`, `scaffold.md`, `sea.md`, `server.md`, `sqlite.md`, `sse.md`, `supervisor.md`, and any other `.md` file there; read `README.md` first for the map). The package catalog with each package's layer and runtime dependencies: `C:/Users/mikes/WebstormProjects/scaffold/.claude/agents/orkestrel.md` (its catalog table). The engine's mechanisms and what each needs: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md` § Rulings R4 to R12 and R14 (the earlier `@orkestrel/*` reading, whose grounds you re-check against the guides rather than repeat).

**The mechanisms** (name each in the matrix, in this order): event dispatch and hooks (a bubbling cancelable `CustomEvent` with a typed detail, listener maps bound until destroy); ownership records (a `WeakMap` per class, claim and release, one owner per host); state snapshot and restore (attributes, class tokens, inline properties, first save wins); delegation over a root (`data-bs-*` routing, `MutationObserver` release of removed hosts); transition settling (`getAnimations`, `finished`, abort, reduced motion); focus isolation (`inert` outside a host, focus return); backdrop element lifecycle; scroll lock with scrollbar compensation; placement (CSS anchor positioning, the `popover` attribute, side measurement); swipe detection (pointer events, a threshold); option merging and coercion (`data-bs-config` JSON, declared `data-bs-*` keys, a constructor object, defaults, an invalid value throwing); sanitizing tip markup (an element and attribute allowlist per tag, an `aria-*` pattern, a URL floor refusing `javascript:`, `data:` kept, unlisted elements removed with their content, output written to a live element); template parsing and slot filling (a markup template, slot selectors, text or element content); timers (tooltip delay, toast lifetime, carousel interval, pause and restart); id generation; selector reading with `CSS.escape`; abort-signal lifetime (one controller per entity, `AbortSignal.any`).

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md` § Tedious work goes to Grok; `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/writing.md` for the distillate's prose; skill: none.

**Host.** Windows 11; the Cursor CLI's shell is allowlisted to `ls`, so read files by absolute path and run no other command. Working root: `C:/Users/mikes/WebstormProjects/scaffold`. No network is needed.

**Measurements.** None beyond the evidence row; every reading is yours to take from the guides. The Orchestrator has measured, and you restate neither: `@orkestrel/html` 0.0.10 is installed in Veneer as a development dependency (through `@orkestrel/markdown`), its core entry is 138,896 bytes with no `node:` module reference, and Chromium 153's native `setHTML` with a `SanitizerConfig` dictionary keeps `data:` URLs, drops `javascript:`, removes unlisted elements with their content, and honours per-element attribute entries.

**Control identifiers.** None.

**Standing conditions.** A guide is a mirror of its package's documentation and its relative links resolve to nothing here; read the `## Surface` tables and the sections the table of contents names, and cite the guide's line. `@orkestrel/contract` is the engine's only runtime dependency so far; report every other package as a candidate, never as adopted.

## Unknowns

- Whether any guide describes a browser-side DOM mechanism at all (an observer, a focus trap, a transition wait, a delegate, a placement engine): report each such export, or state which guides carry none after reading their Surface tables.
- Whether `@orkestrel/html`'s `sanitize` can express a per-element attribute allowlist, keep `data:` URLs, or remove an unlisted safe element with its content: report each as expressible with the guide's mechanism named, or not expressible with the guide's sentence that forbids it.
- Whether `@orkestrel/emitter`, `@orkestrel/abort`, `@orkestrel/queue`, and `@orkestrel/pool` describe a cancelable dispatch, a signal combinator, a job queue, or a timer pool whose semantics match a mechanism in the list: report each with the guide's own words on return values, cancellation, and vetoes.

## Scope

**Owned.** Nothing; you write no file and change no file. **Read.** The guides folder, the catalog file, and the design verdict, all by absolute path. **Off-limits.** Everything else; run no command but `ls`.

## Execution

**A bench engine reading this brief inside its own CLI:** perform the assignment directly and spawn nothing.

## Output

The distillate as your final message and nothing else, in this shape: a first table, one row per mechanism in the order given, with the columns Mechanism, Candidate export (package and symbol, or "none found"), Guide pointer (`file:line`), What the guide says it does (a quoted or closely paraphrased sentence), and Where it departs from the mechanism's need (a quoted or closely paraphrased sentence, or "no departure stated"); a second table, one row per package whose guide carries any candidate, with the columns Package, Version and layer (from the catalog), Runtime dependencies (from the catalog), Entry facts the guide states (size, environments, a `node:` import), and Candidates (the symbols from the first table); the answers to the Unknowns, one paragraph each; and a closing list of guides read with the line count of each, so a guide skipped is visible. No recommendation, no ranking, no process diary.
