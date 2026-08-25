# Fleet visit findings matrix

Distilled by the `grok` lane from the 44 retained visit reports under
`.orkestrel/campaign/fleet/`. Bench evidence: journal `tmp/grok/fleet-findings.log`, containment
clean before and after. Pointer accuracy rests on the lane's read; the reports beside this file
are the primary source.

| finding | reports | class |
|---|---|---|
| Blocked-`configs` `repair` message's `test:setup is already declared` clause is false at print time (declared manifest has no `test:setup`; the block/recovery is still correct). | `visit-browser-report.md:168,237`; `visit-terminal-report.md:171`; `visit-server-report.md:103`; `visit-indexeddb-report.md:130`; `visit-mcp-report.md:259`; `visit-qualifier-report.md:190`; `visit-budget-report.md:130`; `visit-rater-report.md:169`; `visit-markdown-report.md:98,154`; `visit-sse-report.md:100`; `visit-contract-report.md:217` | Scaffold-defect |
| `test:setup` appended after `prepack` rather than beside other `test:*` keys; `scaffold audit` compares values not order. | `visit-indexeddb-report.md:145`; `visit-budget-report.md:136`; `visit-table-report.md:157` | Scaffold-defect |
| `scaffold repair --groups manifest` rewrote `@orkestrel/scaffold` range `^0.0.51`→`^0.0.52` while writing `test:setup`, leaving installed tree at `0.0.51` until a later install. | `visit-test-report.md:32,148,177` | Scaffold-defect |
| `buildElement` in mcp `tests/setupBrowser.ts` has no consumer; needs `src:browser` proof or removal by owning unit. | `visit-mcp-report.md:251` | Consumerless export |
| `createIntegrationDatabase` imported by no suite; opened half unproven. | `visit-database-report.md:73` | Consumerless export |
| `createRecordingNext`, `JPEG_MAGIC`, `TEST_BODY_LIMIT` exported by middleware setup with no consuming suite; visit proved anyway. | `visit-middleware-report.md:173` | Consumerless export |
| `isBrowserVuePath` has no consumer (no `app/` tree). | `visit-qualifier-report.md:175`; `visit-markdown-report.md:70,155`; `visit-interpret-report.md:171` | Consumerless export |
| `describe`/`it`/`expect` from `vitest` used inside `tests/setup.ts` — forbidden by `.claude/rules/tests.md` § Shared test infrastructure. Database: `conformDriver`. Agent: battery registration (successor: move into store twins). | `visit-database-report.md:204`; `visit-agent-report.md:200` | Off-limits rule-violation |
| `TRICKY_KEYS` TSDoc misdescribes stored bytes (claims combining sequence and NFC-labile `Å`; actual is NFC-stable precomposed). | `visit-interpret-report.md:154`; `visit-reason-report.md:138` | Deferred to successor |
| `INTEGER_KEY_SUBJECT` comment states wrong `Object.keys` order. | `visit-reason-report.md:134` | Deferred to successor |
| `buildHostileRecord`'s `__proto__` literal is inert; doc comment overstates hostility. | `visit-qualifier-report.md:179` | Deferred to successor |
| `patchBytes` mutates its `Buffer` source through a `.slice()` view, contradicting its documented copy-only contract (latent, not yet triggered). | `visit-msg-report.md:182` | Deferred to successor |
| Proving ollama `setupService.ts` required a daemon-gated fixture; drove a loopback fixture instead of a live server. | `visit-ollama-report.md:162` | Deferred to successor |
| `tests/setupService.test.ts` declares its daemon fixture locally instead of in a shared `setup*.ts` (off-limits); serves one file. | `visit-ollama-report.md:175,207` | Deferred to successor |
| `Process.test.ts` "reaches terminal moment on stop alone" times out at 5000 ms in an unowned file. Orchestrator's isolated re-run passed; contention. | `visit-process-report.md:173` | Deferred to successor |
| `Probe.test.ts` deadline-fixture arm race fails intermittently in an off-limits file. Orchestrator's isolated re-runs passed twice; contention signature. | `visit-probe-report.md:125` | Deferred to successor |
| `@orkestrel/test` browser `helpers.ts` imports `vitest/browser` at module scope, making the barrel unimportable outside Browser Mode; worked around by a DOM-guarded dynamic import in `setupBrowser.ts`. | `visit-test-report.md:139,204` | Deferred to successor |
| `readTableError` reports a non-thrown case as `undefined`, identical to success; recorded not changed. | `visit-table-report.md:161` | Deferred to successor |
| `npm run format` rewrote off-limits `guides/mcp.md` table padding; accepted at commit (dash-count-only difference, no prose change). | `visit-mcp-report.md:244` | Other |
| Reserved-device assertion in `buildStaticFixture` reuses the same `process.platform` expression the fixture uses to seed the file, rather than a separate route. | `visit-middleware-report.md:177` | Other |
| Middleware visit's gate readings are self-taken inside its own exec; authoritative sweep belongs to independent `verifier`. | `visit-middleware-report.md:181` | Other |
| `test:setup` placement inconsistent across fleet chains (probe/process/ollama differ). | `visit-msg-report.md:126` | Other |
| Successor test `setupBrowser.ts` kept `buildFixture` synchronous by module-scoping the dynamic import, to avoid desyncing off-limits call sites. | `visit-test-report.md:220` | Other |
| Successor indexeddb `dropDatabase` deliberately kept reject-on-block rather than database's absorb-on-`blocked` variant, to avoid cross-test leakage. | `visit-indexeddb-report.md:215` | Other |
| Probe's opening `scaffold audit` emitted no `setup:` advisory; unit reduced to repair/format/gates/closing audit. | `visit-probe-report.md:73,100` | Other |
| Repair-written vendored orchestration paths (`.agents/**`, `.claude/**`, `.codex/**`, `CLAUDE.md`) sit outside visit ownership; the Orchestrator's diff capture is authoritative. | `visit-websocket-report.md:115`; `visit-toolbox-report.md:117` | Other |
| Retired skill and agent files remained across many targets until the Orchestrator's commit-time removal (`git rm` of the `orkestrel-human-journey` paths, `.claude/agents/codex.md`, `.codex/agents/claude.toml`), which every visit commit performed. | 26 reports; see the grok journal for per-report line numbers | Other |
