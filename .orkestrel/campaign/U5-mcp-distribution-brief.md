# Unit U5 — `@orkestrel/mcp` distribution receipts: the campaign's packed artifacts composed in a real Chromium page

## Role and engine

`implementer` on Opus 5, a native Claude subagent (tools: Read, Grep, Glob, Edit, Write, Bash).
Perform the assignment directly and spawn nothing. You are the sole writer in the
`C:/Users/mikes/WebstormProjects/mcp` checkout while this unit runs. This unit runs natively
because a bench exec can neither install a package nor drive a child's pipes (Bench laws rule 5).

## Objective

Extend the distribution proof so that, from an isolated consumer holding the PACKED `tool`,
`agent`, and `mcp` artifacts, a real Chromium page proves: an `Agent` with a page-defined `Tool`
runs the model's call in the page with zero network requests (X5); `createPageServer` completes
`initialize`, `tools/list`, and `tools/call` in the page with zero network requests (X6); an
`Agent` holding the page server's tools calls one, and a caller abort cancels the in-flight call
(X7); and an `Agent` in the page over `createRelayProvider` against a Node `createRelay` fixture
with a scripted upstream executes its page tool in the page while each model turn costs exactly
one relay request (X8, page side).

## Context

**Evidence.**

- `tests/distribution.test.ts` already imports `chromium` from `playwright`, `createServer` from
  `node:http`, `build` from `vite`, packs with `npm pack`, installs into a `mkdtempSync` consumer,
  and resolves the pinned browser through `configs/browsers.ts` (read by the Orchestrator
  2026-09-15, lines 1–60). It runs in the `distribution` project (Node, `prepublishOnly`; script
  `test:distribution`, `--mode release` fails rather than skips on an unreachable registry).
- The tarballs to install come from the Orchestrator's head-start receipts:
  `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/u0-receipt.md` (tool) and the agent receipt
  named beside it; their paths are under `C:/Users/mikes/WebstormProjects/scaffold/tmp/tarballs/`.
  The mcp tarball is packed by the proof itself from this checkout. Read the receipts for the exact
  file names; never rebuild or repack another checkout from this unit.
- Probe P2 (`.orkestrel/campaign/P2-c3-probe.md`, `P2-c3-probe.mjs.txt`) is the Node shape of
  X7 on the published packages: the same composition, ported to a page, is the receipt.
- The agent's relay fixture shape: `ollama/tests/setupServer.ts:139-171` builds `createRelay` +
  `createDispatcher` + `createServer({ host: '127.0.0.1' })` with `@orkestrel/router` and
  `@orkestrel/server` (both are devDependencies of mcp too). The scripted upstream: an object
  implementing `ProviderInterface` (`agent/src/core/types.ts:140-187`) whose `stream` yields
  nothing and returns a scripted `ProviderResult` per turn (as `P2-c3-probe.mjs.txt` does).
- Rulings R5, R6, and exit criteria X5–X8 in `.orkestrel/campaign/plan.md`; `D1b-design-astra.md`
  § Constraints 2 and its unit 5 (network recording starts after fixture and module loading and
  measures the entire operation; a deliberate attempted request proves the recorder can detect
  traffic; missing tools, cancellation, metadata, and cleanup have independent assertions).
- U4's landed browser face (report `.orkestrel/campaign/U4-mcp-browser-report.md`): `createPageServer`,
  `createModelContext`.

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; scaffold's
`.claude/rules/{tests,workspace,typescript,architecture,names,portability,documentation,writing,quality}.md`
(`tests.md` § Expensive proofs and § Cross-cutting proofs govern this file; `portability.md`
governs paths, `pathToFileURL`, and `127.0.0.1`); skill `orkestrel-harden-package` (hardening
lane, `references/hardening.md` § package inspection); guide `guides/mcp.md` `## Tests`.

**Host.** Windows 11, Git Bash. `npm run test:distribution` runs the proof (several minutes: it
builds, packs, installs, launches Chromium). Playwright Chromium is installed. The registry is
reachable from the host (the proof may install the isolated consumer's other dependencies from
it, as it does today).

**Measurements.** Before editing, run `npm run test:distribution` once and record its reading and
duration; the existing cases must stay green.

**Control identifiers.** R5, R6, X5–X8; name tests for what they prove.

**Standing conditions.** `node_modules/@orkestrel/tool` is the U1 tarball installed `--no-save`
in this checkout; the isolated consumer the proof builds installs the tarballs the receipts name.
`tmp/` is git-ignored. Do not bump `version`. Add no package. Do not edit any file `scaffold
repair` restores (see U4's list). Do not edit `src/**` (report a patch if one is needed).

## Unknowns

- Whether the isolated consumer can import the agent's full runtime closure in a page through an
  import map over its `node_modules` (P1 says no static Node import exists; the page load is the
  receipt). The proof's first assertion is that every `@orkestrel/*` root entry the agent imports
  evaluates in the page; report the reading.

## Scope

**Owned.** `tests/distribution.test.ts`, `tests/setupDistribution.ts` (new, if shared setup is
extracted; then also `tests/setupDistribution.test.ts`), `tests/fixtures/**` (new page assets and
the relay fixture), `guides/mcp.md` `## Tests` (the sentences naming these receipts).

**Off-limits.** `src/**`, `package.json`, `package-lock.json`, `vite.config.ts`, the `scaffold
repair` set, `dist/**`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash (`npm run test:distribution`, scoped
oxfmt). No git mutations. No edits outside Owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

Final message: touched files with one-line summaries; `git diff --stat`; `git status
--porcelain`; the baseline reading and duration; the receipt for each of X5, X6, X7, X8 (the
test title, the network counter's reading, the positive control's reading); the Unknown's
reading; deviation state. No process diary.

## Deviation contract

Stop and report on: a tarball the receipts name that is missing; an artifact that fails to
evaluate in the page (report the exact console error — that is a finding for the owning package,
not something to work around with a polyfill or a bundler transform); a `src/**` change you need.
Decide, record, carry on for fixture layout, page markup, and test titles.

## Acceptance criteria

1. `npm run lint:check` and `npm run check` exit 0.
2. `npm run test:distribution` exit 0 with, beside the existing cases, tests named for what they
   prove: (X5) a page importing the installed `@orkestrel/agent` and `@orkestrel/tool` builds an
   agent with a scripted in-page provider and a DOM-mutating tool, the DOM changed, and the
   page's request log (Playwright `page.on('request')` plus a `fetch` counter installed before the
   scenario) reads zero after module loading; (X6) `createPageServer` from the installed
   `@orkestrel/mcp/browser` completes `connect`, `tools()`, and `call` with the same zero reading;
   (X7) an agent whose registry holds `await pair.client.tools()` calls the page server's tool and
   the follow-up turn completes; a second scenario aborts the agent's run while the page server's
   handler is parked and the handler observes its `context.signal` abort; (X8) an agent with
   `createRelayProvider` pointed at a Node `createRelay` fixture on `127.0.0.1` and an ephemeral
   port, with a scripted upstream `ProviderInterface` that first returns a tool call and then an
   answer, executes the page tool in the page and the fixture records exactly one request per
   model turn; (control) one deliberate `fetch` from the page raises the counter, proving the
   instrument sees traffic; (closure) every `@orkestrel/*` root entry the agent's closure names
   evaluates in the page, asserted by an import of each and a read of one export.
3. `guides/mcp.md` `## Tests` names each receipt by test title and states that the distribution
   project runs from `prepublishOnly`.
4. `npm run test:guides` exit 0; `npm run format:check` exit 0.

**Observations, not criteria.** Total `test:distribution` duration before and after.

## Review evidence

The Orchestrator captures `git diff` and `git status --porcelain` after you exit and runs
`npm run test:distribution` itself as the authoritative reading.
