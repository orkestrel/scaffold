# Transport envelope

- Session: `1b693f8c-051c-4fb9-ae2f-be5a0d0290ca`
- Exit: `0`
- Status receipts: `tmp/cursor/d7n-agent-probe-scout.agent-before.txt` equals `tmp/cursor/d7n-agent-probe-scout.agent-after.txt`; `tmp/cursor/d7n-agent-probe-scout.probe-before.txt` equals `tmp/cursor/d7n-agent-probe-scout.probe-after.txt`.

## Untrusted engine result

I'll read the scout brief and the orchestration contract first, then scout the repo against that brief.The brief is a read-only scout of Agent and Probe after the dependent upload layer. Next Iâ€™ll load the align-packages skill, campaign records, and both checkouts.Campaign records show Agent/Probe still open after the dependent layer. Iâ€™ll snapshot git state first, then read the retained artifacts and both package trees.Shell git status was refused. Iâ€™ll read git refs directly and retry a narrower read-only status command.Campaign branches match the landing tips. Next Iâ€™ll read pins, verdicts, guide-entry files, and the MCPâ€“Probe transport seam.**Agent and Probe remain unclosed after the dependent upload layer.** Their campaign branches carry accepted docs-parity landings; neither has a closure verdict, a verify brief, a native `GuideCommand` entry, or a pin graph on the confirmed dependent/runtime artifacts. MCP 0.0.29 is on canonical main; Probe still resolves MCP 0.0.28. Registry publication is out of this scout.

`git -C <checkout> status --short --branch` was refused at the start of the scout and again at the end (Ask-mode shell). No index.lock or MERGE_HEAD was present in Agent or Probe. This scout wrote nothing.

---

## Distillate

Accepted and still open:

- **Agent** source landing `305af91` on `claude/orkestrel-npm-audit-deps-14ibta` is campaign-pushed. That is a fix landing, not package closure. Remaining retained work: install the accepted final Guide artifact, write/run the audit-item checker and whole-chain verifier, write a closure verdict, refresh origin/main ancestry, push main only when that chain is green. Native `test:guides` / retired `scripts/docs.ts` have not landed.
- **Probe** test-draft landing `93fc01d` on the same campaign branch is campaign-pushed. The type-load fixture `createHeavyDraft` is retained by ruling, not corrected. Remaining retained work: audit-item check brief, verification against the final Guide artifact, full closure, main push. Native `test:guides` / retired `scripts/docs.ts` have not landed. Declared `@orkestrel/mcp` is still `^0.0.28`.
- **MCP-to-Probe** packed real-transport proof is still open. Canonical MCP 0.0.29 on main contains the owner `MCPLegacy.#forward` progress-token path. Probeâ€™s lock and install still resolve MCP 0.0.28. The registered client path recorded `-32000: Legacy protocol 2025-11-25 cannot represent a stream result`. Direct Probe API and MCP package tests are separate from that registered round trip.

---

## Evidence

### Refused commands

- `git -C C:/Users/mikes/WebstormProjects/agent status --short --branch` â€” refused at start and after the scout.
- Same command for `probe` and `scaffold` â€” refused at start and after.
- No `git merge-base`, fetch, install, gate, build, or sha256 command ran.

### Canonical branch, HEAD, recorded origin (no fetch)

**Agent** `C:/Users/mikes/WebstormProjects/agent`

- `HEAD` â†’ `refs/heads/claude/orkestrel-npm-audit-deps-14ibta` â†’ `305af91a51625667220a5bbced9035af0a8e0570`
- Loose `refs/remotes/origin/claude/orkestrel-npm-audit-deps-14ibta` matches that tip (overrides packed `54e7199`).
- Packed `refs/remotes/origin/main` `a65878c921d668ae050d2877766afd55c05dadd6`
- No local `refs/heads/main`
- `logs/HEAD`: clone at `54e7199`, then commit â€œConverge agent documentation after its auditâ€
- `FETCH_HEAD` records origin campaign `305af91` and origin/main `a65878c` as `not-for-merge`
- `d7n-agent-fix-landing-verdict.md:3-4,26`: main unchanged; refresh origin/main ancestry remains
- `d7n-owner-main-reconciliation.md` roster does not name Agent

**Probe** `C:/Users/mikes/WebstormProjects/probe`

- `HEAD` â†’ `refs/heads/claude/orkestrel-npm-audit-deps-14ibta` â†’ `93fc01d9931b876c4ae86dabbe13168112c48847`
- Loose origin campaign ref matches that tip (overrides packed `135aab7`)
- Packed `refs/remotes/origin/main` `b816749747572b15cd351488283415bf49716dbd`
- No local `refs/heads/main`
- `logs/HEAD`: clone at `135aab7`, then commit â€œReplace the suite's candidate drafts with lint-clean functionsâ€
- `FETCH_HEAD` records origin campaign `93fc01d` and origin/main `b816749` as `not-for-merge`
- `d7n-owner-main-reconciliation.md:11,21`: at campaign `135aab7`, origin/main `b816749` was recorded as an ancestor (that reading included fetch; this scout did not repeat it)
- `d7n-probe-tests-landing-verdict.md:3-4,31`: campaign progress, not closure; main unchanged

**MCP seam** `C:/Users/mikes/WebstormProjects/mcp`

- `HEAD` â†’ `refs/heads/main` â†’ `45ba0a4b5741a79f32500479de9549c0e6a17839`
- Loose `refs/remotes/origin/main` matches
- `FETCH_HEAD` records origin main and origin campaign at that same tip
- `d7n-dependent-registry-closure.md:12` and `d7n-mcp-dependent-registry-release-landing.md:3-9`: MCP 0.0.29 registry-confirmed at that tip; MCP-to-Probe verification remains later-layer

**Scaffold** `HEAD` `refs/heads/main` `ddaf0e5de2152e89e25138edfa5a78303f242639` (read only as campaign-record host)

### Declared vs lock vs installed Orkestrel pins

**Agent** `package.json:73-90` declared:

- runtime: abort `^0.0.9`, budget `^0.0.9`, contract `^0.0.16`, database `^0.0.13`, emitter `^0.0.9`, queue `^0.0.12`, timeout `^0.0.9`, tool `^0.0.13`, workflow `^0.0.17`, workspace `^0.0.7`
- dev: guide `^0.0.17`, probe `^0.0.12`, scaffold `^0.0.63`, test `^0.0.13`

Lock `package-lock.json` resolves those to abort/budget/emitter/timeout `0.0.9`, contract `0.0.16`, database `0.0.13`, queue `0.0.12`, tool `0.0.13`, workflow `0.0.17`, workspace `0.0.7`, guide `0.0.17`, probe `0.0.12` (nested mcp `0.0.28`), scaffold `0.0.63`, test `0.0.13`.

Installed `node_modules/@orkestrel/*/package.json` matches the lock for abort `0.0.9`, contract `0.0.16`, workflow `0.0.17`, probe `0.0.12`, scaffold `0.0.63`, test `0.0.13`. Installed **guide is `0.0.18`**, not the lockâ€™s `0.0.17` (head-start overlay; `d7n-agent-fix-landing-verdict.md:24` keeps hash prefix `2b76b363` until replacement).

Confirmed lower/dependent registry versions from `handoff.md` / `d7n-dependent-registry-closure.md` sit ahead of those Agent ranges (abort `0.0.10`, contract `0.0.17`, workflow `0.0.18`, and the rest of that confirmed set). This scout did not reconfirm the registry.

**Probe** `package.json:95-108` declared:

- runtime: contract `^0.0.16`, emitter `^0.0.9`, lsp `^0.0.6`, mcp `^0.0.28`, queue `^0.0.12`, timeout `^0.0.9`, tool `^0.0.13`
- dev: guide `^0.0.17`, scaffold `^0.0.63`, test `^0.0.13`

Lock resolves mcp `0.0.28`, contract `0.0.16`, lsp `0.0.6`, guide `0.0.17`, scaffold `0.0.63`, test `0.0.13`.

Installed mcp `0.0.28`, contract `0.0.16`, lsp `0.0.6`, scaffold `0.0.63`; installed **guide `0.0.18`**. `d7n-probe-registered-closure-diagnosis.md:28-29`: Probeâ€™s fleet-installed MCP was `0.0.28`; rebuilding Probe alone would keep that older dependency.

### Native guide-entry shape and package-owned migration sites

Dependent-layer native entry (MCP, already landed):

- `mcp/package.json:85` â€” `"test:guides": "node --experimental-strip-types tests/guides.test.ts"`
- `mcp/tests/guides.test.ts:26,1534-1542` â€” `GuideCommand` from `@orkestrel/guide/server`, `.execute(...)`
- `mcp/tests/guides.test.ts:58-68` â€” `LEGACY_OWNERS` / `LEGACY_OWNER_PATTERN` (MCP-owned removable ingress inventory)
- No `mcp/scripts/docs.ts`
- `mcp/vite.config.ts:177-181` still exports a `guides` Vitest project; the npm script does not use it
- `d7n-dependent-layer-prepared.md:19-20`: native `test:guides` owns parity; retired docs/guides scripts absent on that layer

Agent/Probe still on the seed drop-in:

- `agent/package.json:56,71` â€” `test:guides` is Vitest `--project guides`; `docs` is `node --experimental-strip-types scripts/docs.ts`
- `probe/package.json:74,82,93` â€” same pair
- `agent/tests/guides.test.ts:1-20,48,184` and `probe/tests/guides.test.ts:1-23,58,194` â€” Vitest `findDrift` drop-in, no `GuideCommand`
- `agent/scripts/docs.ts:1-12` and `probe/scripts/docs.ts:1-12` still present
- `agent/vite.config.ts:87-97,134` and `probe/vite.config.ts:171,218` â€” Vitest `guides` project still selected by `npm test`

`d7n-agent-close-brief.md:54-58` and `d7n-probe-close-brief.md:44-48` already recorded the drop-in region as matching the abort pilot except package-specific cases. Those close units were not run as standalone writers; their items were carried into the fix rounds (`d7n-agent-audit-verdict.md:21` A9, `d7n-probe-audit-verdict.md:20` P8).

### Retained audit / fix / check / verify / closure artifacts and last accepted outcomes

**Agent** under `.orkestrel/campaign/docs-parity/`

| Stage | Path | Recorded outcome |
| --- | --- | --- |
| prep | `d7n-agent-prep-brief.md`, `d7n-agent-prep-report.md`, `.diff.txt`, `.status.txt` | landed (ledger) |
| converge | `d7n-agent-converge-brief.md`, report/diff/status | landed |
| audit | `d7n-agent-audit-brief.md`, `d7n-agent-audit-subjective.md`, `d7n-agent-audit-objective.md`, `d7n-agent-audit-checker-agent.md`, `d7n-agent-audit-verdict.md` | FAIL on named claims; findings A1â€“A9 into the fix brief |
| fix | `d7n-agent-converge-fix-brief.md`, `d7n-agent-converge-fix-host-brief.md`, `d7n-agent-converge-fix-report.md`, `d7n-agent-converge-fix-shell-denied-report.md` | shell-denied predecessor; host successor returned |
| host instruments | `d7n-agent-host-instruments-*.md`, `d7n-agent-final-host-instruments-*.md`, `evidence/d7n-agent-host-readonly`, `evidence/d7n-agent-final-host` | read-only validator and final host readings passed |
| landing | `d7n-agent-fix-landing-verdict.md` | `305af91` pushed; **not closure** |
| close brief (historical) | `d7n-agent-close-brief.md` | written against tip `54e7199`; no close report |

Absent: `d7n-agent-verify-brief.md`, `d7n-agent-closure-verdict.md`, `d7n-agent-closure-checker-*`, `d7n-agent-closure-verifier-*`.

**Probe**

| Stage | Path | Recorded outcome |
| --- | --- | --- |
| prep / converge | `d7n-probe-prep-*`, `d7n-probe-converge-*` | landed `d06b186` |
| audit | `d7n-probe-audit-brief.md`, subjective/objective/`d7n-probe-audit-checker-probe.md`, `d7n-probe-audit-verdict.md` | FAIL on named claims; P1â€“P8 into the fix brief |
| fix | `d7n-probe-converge-fix-brief.md`, report/diff/status; `d7n-probe-converge-predecessor.md` | green with draft-lint deviation; owner main merged as `135aab7` |
| tests | `d7n-probe-tests-brief.md`, Windows ported brief, `d7n-probe-tests-report.md`, `d7n-probe-tests-landing-verdict.md`, `d7n-probe-tests-scope-check-*` | `93fc01d` pushed; format/lint on `Probe.test.ts` exit 0 |
| fixture ruling | `d7n-probe-heavy-ruling-verdict.md`, `d7n-probe-heavy-host.log.txt` | keep `createHeavyDraft`; named cases passed; **not package closure** |
| close brief (historical) | `d7n-probe-close-brief.md` | written against tip `d06b186`; no close report |

Absent: `d7n-probe-verify-brief.md`, `d7n-probe-closure-verdict.md`, `d7n-probe-closure-checker-*`, `d7n-probe-closure-verifier-*`.

Handoff remaining next steps (`handoff.md:455-456`) still match those landings: Agent checker/verifier/closure/main; Probe audit-item check brief, final-artifact verification, closure, main.

Dependent-layer closure for MCP is accepted (`d7n-dependent-registry-closure.md`; `d7n-mcp-dependent-registry-release-landing.md:9` still defers MCP-to-Probe).

### MCP-to-Probe legacy-stream proof and foreign-client pathway

**Canonical MCP source (0.0.29 on main)**

- `mcp/src/core/MCPLegacy.ts:179-212` â€” `#forward`: without a string/integer `tools/call` `_meta.progressToken`, an async-iterator answer is stopped, disposed, and replaced with `#unsupported(..., 'stream')`
- `mcp/src/core/MCPLegacy.ts:264-270` â€” error text `Legacy protocol ${MCP_HANDSHAKE_VERSION} cannot represent a ${result} result`
- Package proof command recorded in `d7n-mcp-legacy-source.log.txt:2-13`:

  `npm run test:src:core -- tests/src/core/MCPLegacy.test.ts`  
  working directory `C:/Users/mikes/WebstormProjects/mcp`, exit 0

- Cases: `mcp/tests/src/core/MCPLegacy.test.ts:346` tokened progress stream; `:620-650` mismatched progress frame â†’ that stream-result error; `:652-687` tools/call without a legitimate token disposes the stream and returns server error

**Probe consumption (source 0.0.13, installed MCP 0.0.28)**

- `probe/src/server/ProbeServer.ts:7,82` â€” `createStdioServer(createMCPLegacy(this.#server), { input: this.#stream })`
- `probe/tests/src/server/ProbeServer.test.ts:5,71,335` â€” in-process `createMCPLegacy` / stdio wrapping
- Foreign-client pathway `probe/tests/src/bin/main.test.ts:800-909`:
  - modern: `createMCPClient` + `createStdioClientTransport({ command: process.execPath, args: [BUILT_ENTRY] })` where `BUILT_ENTRY` is `dist/bin/main.js` (`:27`)
  - legacy: same spawn through `createMCPLegacyClientTransport(..., { version: MCP_FALLBACK_VERSION })`
- Guide claim `probe/guides/probe.md:605-611`: one third-party client, the `@orkestrel/mcp` stdio client, against `dist/bin/main.js` in `main.test.ts`; no other third-party client driven
- Windows skip: `probe/tests/src/bin/main.test.ts:36,279,911` â€” `TERMINAL = '/usr/bin/script'`; `it.skipIf(!existsSync(TERMINAL))`

**Registered-client record (not a Probe package gate)**

- `d7n-heading-mcp-error.txt:1-9` â€” `probe/prove` â†’ `Mcp error: -32000: Legacy protocol 2025-11-25 cannot represent a stream result`
- `d7n-probe-registered-closure-diagnosis.md:5-37` â€” `.codex/config.toml` and `.mcp.json` point at `node_modules/@orkestrel/probe/dist/bin/main.js`; installed Probe `0.0.12` / MCP `0.0.28`; fleet MCP 0.0.29 has the tokened `#forward`; packed real-transport proof still required (`d7n-layer-alignment-plan.md:39-41`)

### Package gates and live-service prerequisites

**Agent** `package.json:49-71`

- Development: `format:check`, `lint:check`, `check` / `check:src:core`, `test` (`test:src` / `test:src:core`, `test:policy`, `test:config`, `test:setup`, `test:guides`), `build`, `test:distribution -- --mode release` via `prepublishOnly`
- Workbench only: `test:probe`, `test:bench`
- Host landing used audit/format/lint/types/`docs`/`test:guides`/`test:policy` plus core tests (`d7n-agent-fix-landing-verdict.md:7-11`)
- Live model: `tests/src/ollama` is referenced in comments (`agent/tests/src/core/Agent.test.ts:47`, `Conversation.test.ts:23`, `factories.test.ts:37-38`) and **is absent** from this checkout. `vite.config.ts` has no `src:ollama` project. `scripts/ollama.sh` is a Claude-session loopback probe (`http://127.0.0.1:11434/api/tags`) and exits 0 when not remote. Core suite is Ollama-free (`integration.test.ts:9-11`). Live Ollama lives in the sibling `@orkestrel/ollama` package per comments/`guides/scaffold.md`.

**Probe** `package.json:65-93`

- Same ordered `prepublishOnly` chain, plus `check:src:server` / `check:src:bin` and `test:src` covering core/server/bin
- Foreign-client cases require a built `dist/bin/main.js` (`main.test.ts:27,226,815`)
- Pseudo-terminal stderr cases require `/usr/bin/script` on disk; Git Bash on Windows does not ship it (`main.test.ts:28-36`)
- `test:probe` / `test:bench` are workbench, not the gate chain

### Git status before vs after

The status command was refused at both ends. Refs, `COMMIT_EDITMSG`, reflogs, and the absence of `index.lock` / `MERGE_HEAD` were unchanged by this scout. Campaign landings last recorded Agent and Probe as clean at `305af91` and `93fc01d`; this session did not re-read a working-tree status.

---

## Unknowns

- Current working-tree dirtiness for Agent, Probe, MCP, and Scaffold (`git status` refused).
- Whether Agent `origin/main` `a65878c` is an ancestor of `305af91` (`merge-base` not run; Agent is missing from `d7n-owner-main-reconciliation.md`).
- Whether Probe `origin/main` `b816749` is still an ancestor of `93fc01d` after the later test commit (recorded true at `135aab7` on 2026-09-08 with fetch; not re-measured here).
- Installed Guide dist sha256 in Agent/Probe (landing claimed prefix `2b76b363`; this scout did not hash).
- Whether MCPâ€™s unused Vitest `guides` project is still invoked by any script other than the native `test:guides` line.
- Whether `dist/bin/main.js` currently exists in Probe (foreign-client tests need it; build was not run).
- Whether `/usr/bin/script` exists on this host (skip condition unread by execution).
- Live Ollama daemon reachability (forbidden; Agent in-tree live suite is absent).
- Registry publication of Agent/Probe (root confirms separately; not read).
- Cursor/Grok journal session id for this inline Ask-mode run (no `tmp/cursor` journal was written).
- `ledger.md` after the Agent/Probe landing rows continues the later fleet campaign; those later rows were not fully re-read beyond Agent/Probe/MCP/Probe-transport hits.

Scoped rows reached through files/refs: branch/HEAD/recorded origin, declared/lock/installed pins, native-entry shape and migration sites, retained audit/fix/check/landing/close-brief paths, MCP-to-Probe proof code/commands and foreign-client tests, package gate scripts and live-service prerequisites, refused-command record. Scoped row not reached as a command result: live `git status`.
