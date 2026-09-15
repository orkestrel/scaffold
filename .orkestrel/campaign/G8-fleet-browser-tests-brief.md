# Unit G8 — survey how the Orkestrel fleet runs browser-environment tests, so a real-model page receipt can be placed correctly

## Role and engine

`grok` on Cursor Grok (`cursor-grok-4.6-high`), reached as the Cursor CLI in print mode. You are the
bench engine reading this brief inside your own CLI: perform the assignment directly and spawn
nothing. This lane is READ-ONLY. No web is needed. Every path is absolute.

## Objective

Return the distilled evidence the Orchestrator needs to design one proof:

> An `Agent` running in a real Chromium page, holding a page-defined tool, driven by a real
> Ollama model through `@orkestrel/ollama`'s provider or its relay, with the page's own
> requests observed — placed in whichever package and test layer the fleet's own conventions
> say, using the fleet's existing browser-test machinery rather than a new arrangement.

The user's instruction (verbatim): "see how we do with other packages that have browser
environment tests, research the other orkestrel packages and their tests folders for inspiration
on how to do it correctly, they are in neighboring folders for you to look in."

## Where to read

Every checkout under `C:/Users/mikes/WebstormProjects/` (list the directory; each is one
`@orkestrel/*` package or the scaffold). For each package that has any of: a `src/browser`
directory, a `tests/src/browser` directory, a `tests/setupBrowser.ts`, a `tests/service`
directory, a `tests/distribution.test.ts`, a Vitest project whose `browser.enabled` is true, or a
`playwright` / `@vitest/browser-playwright` / `@orkestrel/browser` dependency, record it. Read
these files in each such package:

1. `vite.config.ts` — every project, its `include`, `environment`, `browser` block (provider,
   instances, headless), `setupFiles`, and the pinned-browser resolution (`configs/browsers.ts`
   where present).
2. `package.json` — the `test:*` scripts and the browser-related dependencies with versions.
3. `tests/setupBrowser.ts`, `tests/setupServer.ts`, and any `tests/service/**` or
   `tests/distribution.test.ts` — how a real browser is launched or attached, how a real
   daemon or server is reached (host, port, readiness check, skip-versus-fail policy when the
   service is absent), how page-side code is loaded (Vite-built bundle, import map, packed
   tarball in an isolated consumer), and how network requests are observed.
4. The rule the layout obeys: `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md`
   (the layout table, § Expensive proofs, § Cross-cutting proofs, § Browser tests) and
   `.claude/rules/workspace.md` (projects follow environments).

Then read the two packages that must compose:

5. `C:/Users/mikes/WebstormProjects/ollama/` — `vite.config.ts`, `package.json`, `tests/**`
   (especially the service suite that drives the real daemon, its readiness gate, and the relay
   fixture in `tests/setupServer.ts`), and `src/**` entries: is `src/core` host-independent
   (fetch-based) so the provider can run in a page? Cite the imports.
6. `C:/Users/mikes/WebstormProjects/agent/` — `tests/**` layout and any browser-related project;
   `C:/Users/mikes/WebstormProjects/browser/` — how its service tests launch Chromium through
   `src/server` (the launch and connect factories, `file:line`), and whether it can load a page
   from a local file or a local server.

## Return shape (and nothing else)

```
Question: <one sentence>

Inventory:
| Package | Browser machinery (project name, provider, headless) | Real-service gate (how absent is handled) | Page-side code loading | Network observation | file:line |

Conventions: <the layout law each package follows for its browser project, with file:line — where the
project lives, what it mirrors, what a package without src/browser does>

Ollama and agent facts: <host independence of ollama/src/core with import evidence; the service
readiness gate; the relay fixture shape; the agent's placement proofs today>

Candidate placements (evidence only, no ruling):
1. <placement> — what exists to support it (file:line), what would have to be added (dependency,
   project, files)
2. …

Unknowns: <what you could not decide and what would settle it>
```
