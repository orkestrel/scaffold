# Unit G8b — survey of browser test layouts across the Orkestrel packages

Successor to `G8-fleet-browser-tests-brief.md`, which the Cursor provider blocked before any
reading; the question is unchanged and the wording is neutral.

## Role and engine

`grok` on Cursor Grok (`cursor-grok-4.6-high`), reached as the Cursor CLI in print mode. You are the
bench engine reading this brief inside your own CLI: perform the assignment directly and spawn
nothing. This lane is READ-ONLY. No web is needed. Every path is absolute.

## Objective

Describe, with `file:line` pointers, how each Orkestrel package that tests in a browser sets that
up, so a later design can place a page-level test for the agent package's provider integration
using the fleet's existing conventions.

## Where to read

List `C:/Users/mikes/WebstormProjects/`; each directory is one package or the scaffold. For each
package that has any of: `src/browser`, `tests/src/browser`, `tests/setupBrowser.ts`,
`tests/service`, `tests/distribution.test.ts`, a Vitest project with `browser.enabled: true`, or a
`playwright`, `@vitest/browser-playwright`, or `@orkestrel/browser` dependency, read:

1. `vite.config.ts` — every project: `include`, `environment`, the `browser` block (provider,
   instances, headless), `setupFiles`; and `configs/browsers.ts` where present.
2. `package.json` — the `test:*` scripts and browser-related dependencies with versions.
3. `tests/setupBrowser.ts`, `tests/setupServer.ts`, `tests/service/**`, `tests/distribution.test.ts`
   — how a browser is started or attached; how an external local service is reached (host, port,
   readiness check, and the policy when it is absent: skip or fail); how page-side code is loaded
   (a Vite-built bundle, an import map, a packed tarball in an isolated consumer); how page
   requests are recorded.
4. The layout rule: `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/tests.md` (the layout
   table, § Expensive proofs, § Cross-cutting proofs, § Browser tests) and
   `.claude/rules/workspace.md` (projects follow environments).

Then the two packages that must compose:

5. `C:/Users/mikes/WebstormProjects/ollama/` — `vite.config.ts`, `package.json`, `tests/**`
   (the service suite that uses the local model server, its readiness gate, the relay fixture in
   `tests/setupServer.ts`), and whether `src/core` is host-independent (fetch-based) with import
   evidence.
6. `C:/Users/mikes/WebstormProjects/agent/` — `tests/**` layout; `C:/Users/mikes/WebstormProjects/browser/`
   — how its service tests start Chromium through `src/server` (`file:line`) and whether a page
   can be loaded from a local file or a local server.

## Return shape (and nothing else)

```
Question: <one sentence>

Inventory:
| Package | Browser machinery (project, provider, headless) | Local-service gate (absent → skip or fail) | Page-side code loading | Request recording | file:line |

Conventions: <the layout law each browser project follows, file:line; what a package without
src/browser does>

Ollama and agent facts: <host independence of ollama/src/core with imports; the readiness gate;
the relay fixture shape; the agent's placement proofs today>

Candidate placements (evidence only, no ruling):
1. <placement> — what exists (file:line); what would be added (dependency, project, files)
2. …

Unknowns: <what you could not decide and what would settle it>
```
