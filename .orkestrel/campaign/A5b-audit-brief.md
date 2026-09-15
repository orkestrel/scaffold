# Audit A5b — the composition receipts after U5d (`@orkestrel/mcp`)

Successor of `A5-audit-brief.md`. U5d carried the A5 findings the Orchestrator adopted
(`A5-audit-verdict.md`); this round audits U5d's delta and re-reads the receipts as they now stand.

## Role and lane

One brief, three blind lanes; state which you hold in your first line.

- `analyst` on GPT-6 Astra (read-only `codex exec` rooted at `C:/Users/mikes/WebstormProjects/mcp`):
  the OBJECTIVE and cross-engine lane (Opus 5 wrote U5c and U5d). The sandbox cannot run Chromium
  or an install; name each unexecuted vector `UNRESOLVED` with its exact command and read the
  Orchestrator's own runs under Review evidence — every file is staged beside this brief in
  `tmp/codex/`.
- `reviewer` on Opus 5 (native; Read, Grep, Glob): the SUBJECTIVE lane — the receipts' shape and
  names, the fixtures' shape after the nested-function removal, the header and coverage prose, the
  guide's `## Tests` voice.
- `checker` on Sonnet (native; Read, Grep, Glob): the MECHANICAL lane — every carrier present,
  scope, the gates' exit codes, the tail projects, the title changes mirrored in the guide.

Perform the audit directly and spawn nothing. Do not write any file.

## Subject

The mcp checkout at `8d97dd0` plus U5c and U5d (uncommitted). Briefs: `U5c-mcp-distribution-brief.md`
and `U5d-mcp-distribution-brief.md` (the later one winning; its carriers 1–10 are the subject);
reports: `U5c-mcp-distribution-report.md`, `U5d-mcp-distribution-report.md`. The prior round:
`A5-audit-verdict.md` with its lanes' files.

## Review evidence

- `A5b-diff.patch.txt` — U5c plus U5d against `8d97dd0`, the new fixtures appended in full; the
  status output at its head.
- `A5b-distribution-orchestrator.log.txt` — the Orchestrator's own `npm run test:distribution --
  --mode release` after U5d, with its duration beside U5c's (21.55 s) and the baseline (17.99 s).
- `U5d-mcp-gates-orchestrator.log.txt`, `U5d-mcp-gates-test-full.log.txt` — the gates after U5d
  (the policy project's standing red is expected and is not U5d's; every other project green);
  `A5b-tail-gates.log.txt` — the projects the chain never reaches after the policy red (config,
  setup, conformance, integration, guides) run directly, plus the `distribution-*` teardown
  reading.
- `P25-u5d-receipt-probe.md` — the Orchestrator's own replay of U5d's two mutation vectors: a gap
  planted in the emitted import map, and the page tool's `title` dropped. Read it for claims 1
  and 2 rather than the unit's own report.

## Numbered falsifiable claims

1. **The import map (U5d carrier 1).** The composition page loads with no bundler: the test
   writes an `index.html` whose import map is derived from the consumer's installed `@orkestrel/*`
   `exports` and maps each specifier to `/modules/<package>/<path>`; `distributionServer.mjs`
   serves those paths from `node_modules` with the right media type; no Vite `build` remains on
   the composition path (the surface drives' `bundleEntry` may stay). The closure receipt imports
   every entry the installed agent's own module names through the map and reads one export; the
   report's Unknown reading lists the entries served and names no specifier outside the map.
2. **The metadata projection (carrier 2).** `ADD` carries a `title` and `annotations`; X6 asserts
   the pair's `tools()` listing carries them as the guide documents the round trip
   (`toolAnnotationsToMCP` then `mcpAnnotationsToTool`, no invented defaults); X7 asserts the agent
   registry's wrapped tool carries the same; the exact values are pinned so a lost field reddens.
3. **No nested functions (carrier 3).** Neither fixture nor the test carries a function literal
   inside a body except an anonymous callback passed directly as an argument or an anonymous
   function returned directly as a result: the fetch wrapper is module-scope, the parked resolvers
   use `Promise.withResolvers()`, the ledger is a class or module-scope functions.
4. **The words (carriers 4, 5, 7, 8).** The closure's coverage is stated as what the instrument
   reads (the installed agent's own module's entries) in the test comments and the guide bullet;
   the file header bounds its invariant to the surface drives and states the composition's rule;
   the control is titled `reports one deliberate request on the request log and the counter` in
   the test and the guide; the guide's release-mode sentence has the proof as its actor and no
   line in the block runs past its neighbours' wrap.
5. **The names (carrier 6).** The page export is `publish`; the `/receipts` constant is
   `RECEIPTS_PATH`; one term names the transport count on the page and in `Reading`.
6. **The twins (carrier 9).** Either one `distributionScript.mjs` carries the shared helpers, or
   each fixture's header states the twin is deliberate; the report records the choice.
7. **Teardown and accounting (carrier 10).** The composition stage is destroyed from the hook that
   removes the scratch tree, or an assertion reads no surviving `distribution-*` tree; the
   fixture's `/receipts` accounting reports and resets on read (or is keyed per scenario).
8. **Green.** The Orchestrator's release-mode run exits 0 with every receipt and every
   pre-existing case green; `test:guides` exit 0 after the title change; format, lint, check, build
   exit 0; the tail projects exit 0; the only red anywhere is the policy project's standing one.
9. **Scope.** Only the owned files moved (`tests/distribution.test.ts`, the two or three fixtures,
   `guides/mcp.md` `## Tests`, optionally `tests/setupDistribution.ts` and its test); no `src/**`,
   `package.json`, `package-lock.json`, `vite.config.ts`, or `.oxlintrc.json` hunk; no package added
   to any manifest; no `any`, assertion, nested function, default export, `both` over an unnamed
   set, `above`/`below`, or count in added prose.
10. **Ship it as mcp 0.0.31** once the scaffold 0.0.69 re-pin clears the policy sweep and the
    release chain (`prepublishOnly`) runs green? Name what must change first if not, with the vector.

## Output

The `orkestrel-falsify` verdict shape: one line per claim with the evidence (`file:line`);
findings outside the claims under `outside:` (each tagged required, recommended, or
carry-forward; or `outside: none`); ONE terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim
numbers>`. Nothing else.
