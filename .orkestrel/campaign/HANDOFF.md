# Handoff — the browser-native campaign (tool, agent, mcp, ollama, scaffold)

Last updated 2026-09-15 (session `bab586ba`). This file is the map for a fresh session. The row-level
truth is `ledger.md` (every unit, its engine, brief, evidence, and outcome); the design record is
`plan.md` (rulings, Re-baseline 2 and 3, the D4-1d addendum). Update this file at every phase
boundary; never let it record a fact the ledger contradicts.

## The goal and its exit

Make the agent environment-agnostic; let a web page host a browser-native agent plus tool with no
server call; make the page a native MCP server that follows its tool registry live (better than
WebMCP's static registration); ground `@orkestrel/tool` and `@orkestrel/mcp` first; later improve
`@orkestrel/browser` as the agent's reading arm (D2, deferred until this wave lands). Exit
criterion: the five packages below are audited green, committed, bumped where their published
surface moved, published in layer order with the user's one-time codes, and the campaign records
are retained in a commit.

## Where each checkout stands (2026-09-15, ~13:00 UTC)

| Checkout | HEAD (local, unpushed) | Working tree | State | Next |
| --- | --- | --- | --- | --- |
| `tool` | `fa88364` registry emitter (`ToolManagerEventMap`, `emitter`, `destroy`) | clean | accepted (A8b + K7 + U8d); tarball `tmp/tarballs/orkestrel-tool-0.0.14.tgz` installed into agent, mcp, ollama | bump 0.0.15, publish after scaffold |
| `agent` | `148c237` guide sentence (contract adoption, U7 tests, tool mirror) | clean | accepted (V2); tarball `orkestrel-agent-0.0.22.tgz` installed into ollama | bump 0.0.23 after tool; re-pin tool |
| `mcp` | `7959f08` the browser face (U4 → U4m) on `b9ff0b9` | clean | LANDED 2026-09-15: `createPageServer`, the WebMCP bridge with the live-state sync (U4i–U4k), the failure-path pins (U4k, U4l), the host records as relationships (U4l), the prose round (U4m); A4i PASS on every lane (Astra: chain closed, approve 0.0.31), A4j checker + gates `after-u4m` green (src projects 1478 passed / 2 skipped); message `commit-mcp-u4.txt`; scratch worktree removed | U4e RETURNED (Astra; the tools-family producer on `tools.emitter`, one `ReadableStream` queue with the consumer producer, the construction refusal, `tools.listChanged` in discovery, the executed guide refresh proof; format/lint/check green) with one deviation: four `tests/src/core/MCPClient.test.ts` scenarios inject consumer-produced tools frames the server now refuses → U4e-b (builder: migrate them to the prompts family) → gates `after-u4e-b` → A4k (analyst + reviewer + checker over U4e + U4e-b; `tmp/units/A4k-diff.patch` holds U4e alone) → U14e (`CONFORMANCE_SCHEMA` → `CONFORMANCE_INPUT_SCHEMA`, brief ready) → U5b distribution → A5 → commit → bump 0.0.31 |
| `ollama` | `5c218cd` U14c (`isAbortError` → `isFetchAbort`) on `058e86a` the page proof; published 0.0.16 | clean | LANDED: the real-page agent tool loop proof (Edge 153, live daemon), the attempt bound, `guides/agent.md` mirror at agent `148c237`; A13f/A13g closed; the setup export cleared for the scaffold re-pin (A14cd, gates `after-u14c`) | no bump on this diff; re-pin scaffold 0.0.68 + `repair` after it publishes; re-pin agent when it publishes 0.0.23 and republish then |
| `scaffold` | `94089e35` the D4 chain (on `f37663f1`, the retention checkpoint; published 0.0.67) | bump to 0.0.68 in `package.json` + `package-lock.json` (uncommitted); `guides/agent.md` and `guides/ollama.md` refreshed from their pushed main (uncommitted); `.orkestrel/campaign/` growth | LANDED: hosted guides, catalog floor, `surface` rule, inventory baseline (shrink-only, `establish`), the renames, prose, the AD4/AD4b fixes; release preparation per `orkestrel-publish` § Prepare a layer: registry pins equal the declared ranges, no self-version literal, catalog reports no floor drift; the first release chain refused at `build:host` (three cross-guide collisions the seed inventory never held: `ProviderOptions`, `RelayOptions` agent × supervisor; `readText` agent × test — the seed was measured against a stale agent mirror), so `host.json` was re-established against the refreshed floor (127 → 129: those three admitted as pre-existing published-state collisions for their owners to close; `joinThinking` agent × ollama dropped); the chain `prerelease-2` built green and reddened only on the self-pin sweep (three generated-manifest fixtures under `tests/src/core/fixtures/` carrying `@orkestrel/scaffold ^0.0.67`, updated to `^0.0.68`); the chain `prerelease-3` GREEN (prepublishOnly exit 0 in release mode; pack dry run 190 files, shasum `c9ba79ee…`) | `tmp/units/land-scaffold-release.sh` = retention commit of `.orkestrel/campaign/` → release commit `chore: release scaffold 0.0.68` (package.json, package-lock.json, host.json, guides/agent.md, guides/ollama.md, the three fixtures; message `scratchpad/commit-scaffold-release.txt`) → with the user at the keyboard: push, then `npm publish --ignore-scripts --otp=<code>` (Windows: operator-run in a real terminal) → targets re-pin + `repair`. A SECOND scaffold release follows the wave to refresh the hosted floor after tool/mcp/agent/ollama publish (vendored bytes move). Before the publish the user decides the supervisor repository: its guide relocation (`guides/src/*.md` → `guides/`) is uncommitted and unpushed there, and the hosted `guides/supervisor.md` mirrors the relocated copy |
| `browser` | `f932493` U14d (the fake `createCDPTransport` helper → `createCDPTestTransport`) on `1acadb4` | clean | the setup export cleared for the scaffold re-pin (A14cd, gates `after-u14d`); otherwise untouched (D2 later) | re-pin scaffold 0.0.68 + `repair` after it publishes |

Rough distance: the implementation is done on every package; what remains is closing audits,
commits, the scaffold release, the tool → mcp → agent → ollama re-pin and publish wave, and the
fleet-wide setup-helper cleanup the `surface` rule will demand of every target. Estimate: three to
five more audit/fix rounds across mcp and scaffold, one small ollama round, then the landing.

## The remaining path, in order

1. **mcp:** reconcile U4l (running), run gates `after-u4l`, then A4i (analyst on Astra, reviewer
   on Opus, checker). If PASS or judgment-only: commit the browser face on `b9ff0b9` by explicit
   pathspec with `scratchpad/commit-mcp-u4k.txt` (add one line for U4l). Then U4e (Astra, sol
   route; server-side `notifications/tools/list_changed` from `tools.emitter`, the built-in
   producer owns the tools family, discovery advertises `tools.listChanged`), A4j (analyst +
   checker), U5b (distribution proof against the packed tool tarball; brief
   `tmp/units/U5b-mcp-distribution-brief.md`), A5, commit.
2. **ollama:** U13h → gates3 + service verbose → A13f → mirror refresh (`cp agent/guides/agent.md
   ollama/guides/agent.md`, verify with `npm run test:guides`) → commit.
3. **scaffold:** V4 → capture `git diff HEAD > tmp/units/AD4b-diff.patch` → AD4b → fix round if
   needed (a `D4-8` brief) → V5 → commit by pathspec → retention commit → bump → publish (user
   supplies a fresh npm one-time code at the upload; never a password/token).
4. **Fleet setup cleanups (U14-\*)**: every target's own `tests/setup*.ts` helper that collides
   with an installed `@orkestrel/test`/`@orkestrel/contract` export (P7 list:
   `P7-setup-collisions.txt`) must be renamed or reused BEFORE that target re-pins the releasing
   scaffold, because the vendored `surface` rule fires on them. The order is fixed by `.claude/rules/names.md` § Fleet name ownership: clear the collision first, then re-pin and `repair` in the same visit. One builder unit per package
   (brief, browser, console, database, indexeddb, lsp, mcp `setupConformance.ts` `CONFORMANCE_SCHEMA`,
   middleware, ndjson, ollama `isAbortError`, sse, supervisor, test); then re-pin scaffold, `repair`,
   gates. Cross-package name conflicts (`createChannel` in test vs agent, `isRecord` in msg vs
   contract, …) resolve per R1–R4 in `.claude/rules/names.md` § Fleet name ownership.
5. **Publish wave** (layer order from `scaffold catalog`): scaffold → tool 0.0.15 → mcp 0.0.31 →
   agent 0.0.23 → ollama (re-pin; bump only if its runtime edge moved). Restore registry copies
   before distribution proofs; then U9/U10 (probe and toolbox re-pins) as units after publish.
6. **Landing:** push every checkout at landing (user's ruling 6); prune the campaign folder per
   `orkestrel-debrief/references/retention.md`; report the supervisor `npm ci` ERESOLVE
   (middleware peer `server ^0.0.16` vs root `^0.0.17`) to the user.
7. **D2** (browser reading arm) afterwards; brief draft in the session scratchpad
   (`D2-design-brief.draft.md`) — re-create if the scratchpad is gone.

## File map

Everything durable is under `scaffold/.orkestrel/campaign/` (untracked until the retention commit):

- `ledger.md` — the routing ledger, one row per unit/probe/gate (~300 rows). Read its tail first.
- `plan.md` — rulings R1–R15, exit criteria, Re-baseline 2 (the user's six rulings) and 3 (D3/D4),
  the D4-1d addendum (the inventory baseline).
- `HANDOFF.md` — this file.
- Unit pairs: `<unit>-…-brief.md` and `<unit>-…-report.md` (U4c…U4j, U13b…U13h, D4-1b…D4-7,
  U14/U14b/U15/U16). Diffs: `<unit>-diff.patch.txt`; per-round interdiffs for mcp
  (`A4c-u4f-only`, `A4d-u4g-only`, `A4e-u4h-only`, `A4f-u4i-only`, `A4g-u4j-only`, each `.patch.txt`)
  built from a scratch worktree of mcp at the A4b baseline (`scratchpad/a4b-base`, registered in
  mcp's `.git/worktrees` — remove with `git -C mcp worktree remove` at landing).
- Verdicts: `<audit>-audit-{analyst,reviewer,checker}.md` (A4…A4g, A8/A8b, A13…A13e, AD4). Every
  bench verdict carries its journal path and thread id in a trailing HTML comment.
- Probes: `P<n>-…-probe.md` with instruments `.test.ts.txt`/`.mjs.txt` and logs (P6–P15).
- Gate evidence: `<unit>-<checkout>-gates-orchestrator.log.txt` and `-test-full.log.txt`; the
  authoritative ollama service runs `U13x-ollama-service-verbose.log.txt`; collision probes
  `collide3-<checkout>-after-<unit>.txt`; V3/V4 verifier reports and `V<n>-*.out.txt`.
- Launchers (bench): `<unit>-run.sh.txt` copies of `scaffold/tmp/codex/<unit>-run.sh`.
- Orchestrator readings: `K-*` files (catalog live/canon, residue, re-pin log, fixtures).

Working files (swept at acceptance, not durable):

- `scaffold/tmp/units/` — briefs, gate logs (`gates-<checkout>-<label>*.txt`, produced by
  `gates3.sh <checkout> <label>` — labels are locked; pick a new one per run), diffs.
- `scaffold/tmp/codex/` — bench launchers, journals (`<unit>.jsonl`), `-last.md` final messages,
  `.launch.txt` records, staged evidence copies. `mcp/tmp/codex/`, `ollama/tmp/codex/` hold the
  staged copies for read-only lanes rooted there.
- `scaffold/tmp/tarballs/` — the installed tool and agent tarballs (install BOTH in one
  `npm install --no-save`).
- Session scratchpad (`C:\Users\mikes\AppData\Local\Temp\claude\C--Users-mikes-WebstormProjects-scaffold\bab586ba-…\scratchpad`):
  `collide3.sh` (the collision probe — also retained as text under P-records), commit message
  drafts (`commit-mcp-u4g.txt`, `commit-ollama-u13e.txt`), the `a4b-base` worktree, probe sources.
  If the scratchpad is gone, `collide3.sh` can be rebuilt from `.orkestrel/campaign/collide3-*.txt`
  headers (pattern and paths are printed in every reading).

## How to resume in a fresh session

1. Read `AGENTS.md`, `.agents/orchestration.md`, then this file, then the last forty rows of
   `ledger.md`. Rows marked `running` were killed with the session: re-read each checkout's
   `git status` and the unit's brief, and re-dispatch (a successor brief) rather than assuming
   partial work is acceptable.
2. Probe the benches: `codex exec` with `gpt-6-astra` round-trips (gpt-5.6-sol is refused on
   this account); Cursor Grok print mode works one lane at a time and has no web.
3. Run `gates3.sh <checkout> <new-label>` on any checkout you are about to write; the label must be
   unused (`tmp/units/gates-<checkout>-<label>.lock`).
4. Keep one writer per checkout; the Orchestrator's own probes go in the scratchpad while a unit
   is live; every dispatch is a brief file first; retain the report from the completion
   notification (subagent output files are empty on this harness).
5. Commit only by explicit pathspec (a staged lockfile deletion can sit in terrain); never push
   before landing; publishing needs the user's one-time code at the upload.

## Bench and host facts

Windows 11, Git Bash; PowerShell is the exec shell inside a bench (`npm.cmd`); the `prove` MCP
is unreachable from a bench; a bench denies the network, grandchild processes, Chromium, and paths
outside its root; read-only lanes name vectors as UNRESOLVED and the Orchestrator reproduces them
in real Chromium (P9, P11–P14). Ollama daemon at `http://localhost:11434` with `qwen3.5:2b-q4_K_M`;
Edge 153 is the system browser the page proof finds. Heredocs and `node -e` trip the approval
classifier: write a script file and run it.

## Rulings already taken

By the user (plan.md § Re-baseline 2): emitter in tool; real-model page receipt in ollama with
`@orkestrel/browser`; probe/toolbox re-pins as units after publish; a fleet duplicate-export gate
in scaffold with every guide hosted (cross-package name conflicts included); scaffold publishes
first; push at landing. By the Orchestrator (recorded in plan.md and the ledger): the growth
baseline is the committed `host.json` (`HostManifest.surface`, shrink-only, `establish` for a fresh
checkout); followed registry changes reconcile against the manager's live state and coalesce by
manager with publication order respected; `@orkestrel/guide` stays a development dependency of
scaffold with the prerequisite documented; a target's `guides/*.md` mirrors refresh from local
checkouts during the campaign and from pushed `main` afterwards; the ollama page attempt ends within
`attempt + release`.

## Open items for the user

- The npm one-time codes at each publish (scaffold, tool, mcp, agent, ollama if bumped).
- The supervisor checkout's `npm ci` ERESOLVE (a middleware peer range) — outside this campaign.
- Whether the fleet U14-* cleanups run before the scaffold release (they must land before each
  target re-pins it; they do not block the release itself).

## Added 2026-09-15 after AD4b

- Wave order (AD4b reviewer 10): each target's U14-* cleanup runs BEFORE its re-pin and `repair`, as `names.md` § Fleet name ownership states; never re-pin first.
- Supervisor mirror provenance (AD4b reviewer 10): `guides/supervisor.md` in scaffold is a byte copy of the local supervisor checkout, which has not pushed; push supervisor's `main` (the guide relocation) before the scaffold publish, or record the divergence against the row that owns it. The supervisor checkout also carries the `npm ci` ERESOLVE finding.
- `describeWebMCPTool` in mcp: the `describe*` prefix contract (A4g reviewer R8) is a design-round item after the mcp chain lands — a public export rename.
