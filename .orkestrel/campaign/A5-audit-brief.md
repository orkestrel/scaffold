# Audit A5 — the distribution receipts (`@orkestrel/mcp` U5c)

## Role and lane

One brief, three blind lanes; state which you hold in your first line.

- `analyst` on GPT-6 Astra (read-only `codex exec` rooted at `C:/Users/mikes/WebstormProjects/mcp`):
  the OBJECTIVE and cross-engine lane (Opus 5 wrote the unit). Do not attempt the distribution
  proof (it builds, packs, installs, and launches Chromium; the sandbox denies the network and a
  child's child); name each unexecuted vector as `UNRESOLVED` with its exact command and read the
  Orchestrator's own run under Review evidence — every file is staged beside this brief in
  `tmp/codex/`.
- `reviewer` on Opus 5 (native; Read, Grep, Glob): the SUBJECTIVE lane — the receipts' shape,
  the test names, the fixture pages, the guide's `## Tests` prose.
- `checker` on Sonnet (native; Read, Grep, Glob): the MECHANICAL lane — every X receipt present
  with its counter reading and its positive control; scope; the guide sentences; the gates.

Read the evidence under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/` and the
mcp tree at `C:/Users/mikes/WebstormProjects/mcp`. Perform the audit directly and spawn nothing.

## Subject

The `mcp` checkout at `8d97dd0` (the visit against scaffold 0.0.68 and registry tool 0.0.15, over
the U14e rename and the server chain) plus the working tree after U5c. Briefs: `U5-mcp-distribution-brief.md`
(the brief), `U5b-mcp-distribution-brief.md` and `U5c-mcp-distribution-brief.md` (its amendments,
the later one winning); report: `U5c-mcp-distribution-report.md`. The rulings: `plan.md` R5, R6,
exit-criterion rows X5–X8; `D1b-design-astra.md` § Constraints 2 and unit 5.

## Review evidence

- `A5-diff.patch` — U5c's delta against `8d97dd0`; the status output in the report.
- `A5-distribution-orchestrator.log.txt` — the Orchestrator's own `npm run test:distribution`
  after the unit (the authoritative reading, with its duration); `U5c-mcp-gates-orchestrator.log.txt`
  and `U5c-mcp-gates-test-full.log.txt` — the gates after U5c (the policy project carries one
  standing red the scaffold 0.0.69 reader fix closes; every other project must be green).

## Numbered falsifiable claims

1. **X5** — from the isolated consumer holding the packed artifacts (registry tool 0.0.15, the
   registry agent 0.0.23 — the unit departed from the brief's tarball instruction after the agent published at 2026-09-15T17:18:51Z with the pack's shasum — the mcp tarball packed by the proof, and `@orkestrel/ndjson` 0.0.10 for the relay parser), a real Chromium page imports the
   installed `@orkestrel/agent` and `@orkestrel/tool`, builds an agent with a scripted in-page
   provider and a DOM-mutating tool, the DOM changes, and the page's request log (Playwright
   `page.on('request')` plus a `fetch` counter installed before the scenario) reads zero after
   module loading.
2. **X6** — `createPageServer` from the installed `@orkestrel/mcp/browser` completes `connect`,
   `tools()`, and `call` in the page with the same zero reading.
3. **X7** — an agent whose registry holds `await pair.client.tools()` calls the page server's tool
   and the follow-up turn completes; a second scenario aborts the agent's run while the page
   server's handler is parked and the handler observes its `context.signal` abort.
4. **X8 (page side)** — an agent with `createRelayProvider` pointed at a Node `createRelay` fixture
   on `127.0.0.1` and an ephemeral port, with a scripted upstream `ProviderInterface` that first
   returns a tool call and then an answer, executes the page tool in the page and the fixture
   records exactly one request per model turn.
5. **The instrument sees traffic** — one deliberate `fetch` from the page raises the counter (the
   positive control), and the recorder starts after fixture and module loading and measures the
   whole operation (D1b § Constraints 2).
6. **The closure** — every `@orkestrel/*` root entry the agent's closure names evaluates in the
   page, asserted by an import of each and a read of one export; the Unknown's reading is
   recorded.
7. **Cancellation, metadata, and cleanup have independent assertions** (D1b unit 5), and the
   existing distribution cases stay green.
8. **The guide** — `guides/mcp.md` `## Tests` names each receipt by test title and states that
   the distribution project runs from `prepublishOnly`; `npm run test:guides` exit 0.
9. **Scope** — only the owned files (`tests/distribution.test.ts`, `tests/setupDistribution.ts`
   and its test if extracted, `tests/fixtures/**`, the guide's `## Tests`); no `src/**`,
   `package.json`, `package-lock.json`, or `vite.config.ts` hunk; no package added; no `any`,
   assertion, nested function, or default export; the Orchestrator's distribution run green with
   its duration beside the baseline's.
10. **Ship it as mcp 0.0.31** once the scaffold 0.0.69 re-pin clears the policy sweep? Name what
    must change first if not, with the vector.

11. **The registry agent departure** — the unit installed `@orkestrel/agent@0.0.23` from the registry
    instead of the tip tarball the brief named, on the measured facts (published during the unit; the
    tarball manifest pins tool `^0.0.14` and nests a second tool copy): rule whether the departure was
    the right call and whether the interim `ORKESTREL_AGENT_ARCHIVE` override was rightly removed.
12. **The parser package** — the composition consumer installs `@orkestrel/ndjson@^0.0.10` for
    `RelayProviderOptions.parser`; `mcp/package.json` is untouched: rule whether that is an added
    package under `AGENTS.md` (a throwaway consumer's install list versus the published manifest) and
    whether a primitive already in the consumer could have served.
13. **The observations** — the hosted handler reads `signal is aborted without reason` while
    `notifications/cancelled` carries an optional `reason` (the server's request-closure abort does not
    forward it); a string tool value re-enters the conversation JSON-quoted: rule each as a defect in
    `MCPServer` or the agent, a deliberate choice, or a carry-forward, with the vector.

## Output

The `orkestrel-falsify` verdict shape: one line per claim with the evidence; findings outside the
claims under `outside:` (each tagged required, recommended, or carry-forward; or `outside:
none`); ONE terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. Nothing else.
