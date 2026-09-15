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
| `tool` | `7c67d08` `chore: visit scaffold 0.0.68` on `0017c6c` (the preparation re-pin) on `fa88364` registry emitter (`ToolManagerEventMap`, `emitter`, `destroy`) | clean | accepted (A8b + K7 + U8d); VISITED against scaffold 0.0.68 (overwrite + audit exit 0, gates green; `@types/node` held at `^26.5.1` until the 26.6.0 tarball propagates); dist compare vs 0.0.14: material differences (the emitter) — bump owed; tarball `tmp/tarballs/orkestrel-tool-0.0.14.tgz` installed into agent, mcp, ollama | bump 0.0.15 (`npm version 0.0.15 --no-git-tag-version`), self-pin sweep, `prepublishOnly`, release commit, the user's push and `npm publish --ignore-scripts --otp=<code>`; then agent/ollama/mcp re-pin `^0.0.15` |
| `agent` | `148c237` guide sentence (contract adoption, U7 tests, tool mirror) | clean; holds the unpublished tool tip as a `--no-save` tarball | accepted (V2); tarball `orkestrel-agent-0.0.22.tgz` installed into ollama; no setup collision (P7) | WAIT for tool 0.0.15 on the registry, then the visit (`tmp/units/visit.sh agent v68`: the install restores tool from the registry, so it must serve 0.0.15 first), dist compare vs 0.0.22, bump 0.0.23, `release-chain.sh agent v23`, release commit, the user's upload |
| `mcp` | `7959f08` the browser face (U4 → U4m) on `b9ff0b9` | clean | LANDED 2026-09-15: `createPageServer`, the WebMCP bridge with the live-state sync (U4i–U4k), the failure-path pins (U4k, U4l), the host records as relationships (U4l), the prose round (U4m); A4i PASS on every lane (Astra: chain closed, approve 0.0.31), A4j checker + gates `after-u4m` green (src projects 1478 passed / 2 skipped); message `commit-mcp-u4.txt`; scratch worktree removed | U4e RETURNED (Astra; the tools-family producer on `tools.emitter`, one `ReadableStream` queue with the consumer producer, the construction refusal, `tools.listChanged` in discovery, the executed guide refresh proof; format/lint/check green) with one deviation: four `tests/src/core/MCPClient.test.ts` scenarios inject consumer-produced tools frames the server now refuses → U4e-b landed (builder: the four moved to the prompts family; core 949) → gates `after-u4e-b` red on eight host-only tests (two HTTP handler fixtures claiming the tools family; six discover literals lacking `tools.listChanged`) → U4e-c landed (Opus: server 374, browser 165/2; it named the guide's `server/discover` reply comment as false) → U4e-d landed (builder, that one comment) → gates `after-u4e-d` GREEN (src projects 1488 passed / 2 skipped; every step exit 0; collide none) → A4k DONE: checker PASS; Astra `FAIL 2, 7, 8` (no backpressure on the consumer producer, a producer failure discards the queue; nested generators in the pins); reviewer `FAIL 8` on prose/structure (R1–R4 required, R5–R14 recommended; referrals: the unbounded registry-side queue, `emitter.on` on a destroyed registry) → U4e-e RETURNED (Astra: the pull-driven consumer, the failure delivered after the queued frames, the registry side coalesced through a per-subscription `unread` mark, the destroyed-registry case, `createSubscriptionScript` replacing the nested producers, `MCPConsumerFilter`, the voice/shape/prose/placement items; core 955, setup 89, guides 202) → P20 replay GREEN (`1 of 32` writes resolved parked; the queued frame before the terminal; observation: the release rejects pending producer writes with an `undefined` reason) → gates `after-u4e-e` GREEN (src projects 1494 passed / 2 skipped; every step exit 0; collide none) → A4l DONE: checker PASS; reviewer `FAIL 12` (claims 1–11 confirmed; F1 the setup-test block placement, F2 the refusal message covering both guard causes, F3 the Shape cell as a type shape; recommended: one state record, guide dedup/rewrap/precision, `createProducerScript`, two comments, import order; the release reason carried) → U4e-f RETURNED (Opus: F1–F3, `MCPSubscriptionState` as one record, the release reason with its pin, `createProducerScript`, the guide precision/dedup/rewraps, the comments, sorted imports; core 956, setup 89, guides 202; flagged: the state record is a published mutable type under the policy rules; a producer throwing literal `undefined` closes gracefully) → interdiff `A4m-u4e-f-only.patch.txt` (9 files) cut, collide none, gates `after-u4e-f` GREEN (src projects 1495 passed / 2 skipped; every step exit 0) → A4m DONE: checker PASS (chain walk closed); Astra `FAIL 4, 7, 9, 10` (a caught `undefined` loses its identity and the stream closes gracefully; a registry `clear` after that close throws `Controller is already closed`; the published mutable `MCPSubscriptionState` against the readonly rule — publication not forced, inline private annotations admitted; two multi-line comments) → U4e-g (Astra sol route, brief `tmp/units/U4e-g-mcp-failure-brief.md`, launcher `tmp/codex/U4e-g-run.sh`) → P21 replay + gates `after-u4e-g` → A4n (reviewer + checker) → land with `tmp/units/land-mcp-u4e-2.sh` (fifteen paths; message `scratchpad/commit-mcp-u4e.txt`) → land with `tmp/units/land-mcp-u4e-2.sh` (fifteen paths; message `scratchpad/commit-mcp-u4e.txt`) → U14e (`CONFORMANCE_SCHEMA` → `CONFORMANCE_INPUT_SCHEMA`, brief ready) → U5b distribution → A5 → commit → bump 0.0.31 |
| `ollama` | `5c218cd` U14c (`isAbortError` → `isFetchAbort`) on `058e86a` the page proof; published 0.0.16 | clean | LANDED: the real-page agent tool loop proof (Edge 153, live daemon), the attempt bound, `guides/agent.md` mirror at agent `148c237`; A13f/A13g closed; the setup export cleared for the scaffold re-pin (A14cd, gates `after-u14c`) | WAIT for tool 0.0.15 and agent 0.0.23 on the registry (ollama holds both tips as `--no-save` tarballs), then the visit (`tmp/units/visit.sh ollama v68`), dist compare vs 0.0.16 (bump only if its runtime edge moved), release commit if bumped, the user's upload |
| `scaffold` | `7a90fa88` `chore: release scaffold 0.0.68` on the retention checkpoint `b8093353` (the D4 chain `94089e35` beneath); PUBLISHED 0.0.68 and PUSHED by the user on 2026-09-15 (registry shasum `c9ba79ee…` equals the pack dry run) | clean (records under `.orkestrel/campaign/` grow again after `b8093353`) | RELEASED (the supervisor repository is out of scope by the user ruling): hosted guides, catalog floor, `surface` rule, inventory baseline (shrink-only, `establish`), the renames, prose, the AD4/AD4b fixes; release preparation per `orkestrel-publish` § Prepare a layer: registry pins equal the declared ranges, no self-version literal, catalog reports no floor drift; the first release chain refused at `build:host` (three cross-guide collisions the seed inventory never held: `ProviderOptions`, `RelayOptions` agent × supervisor; `readText` agent × test — the seed was measured against a stale agent mirror), so `host.json` was re-established against the refreshed floor (127 → 129: those three admitted as pre-existing published-state collisions for their owners to close; `joinThinking` agent × ollama dropped); the chain `prerelease-2` built green and reddened only on the self-pin sweep (three generated-manifest fixtures under `tests/src/core/fixtures/` carrying `@orkestrel/scaffold ^0.0.67`, updated to `^0.0.68`); the chain `prerelease-3` GREEN (prepublishOnly exit 0 in release mode; pack dry run 190 files, shasum `c9ba79ee…`); landed by `land-scaffold-release.sh` | WITH THE USER AT THE KEYBOARD, in this order: (1) `git -C C:/Users/mikes/WebstormProjects/scaffold push origin main` (the retention and release commits); (2) in a real terminal in the scaffold checkout, with a fresh npm one-time code read at that moment: `npm publish --ignore-scripts --otp=<code>` (the `dist/` was built after the bump by the chain; compare the registry's shasum with `c9ba79ee…`); (3) confirm `npm view @orkestrel/scaffold version` serves 0.0.68; then every target re-pins `^0.0.68`, runs `repair`, and proves its gates (ollama, browser, mcp after U14e, tool, agent). A SECOND scaffold release follows the wave to refresh the hosted floor after tool/mcp/agent/ollama publish (vendored bytes move). Before the publish the user decides the supervisor repository: its guide relocation (`guides/src/*.md` → `guides/`) is uncommitted and unpushed there, and the hosted `guides/supervisor.md` mirrors the relocated copy |
| `browser` | `401b1fb` `chore: visit scaffold 0.0.68` on `f34fc51` (the preparation re-pin) on `f932493` U14d | clean | VISITED against scaffold 0.0.68 (overwrite + audit exit 0, gates green; `@types/node` held at `^26.5.1`); dist compare vs 0.0.16: no material difference — no bump owed; D2 out of scope (`HANDOFF-D2.md`) | push at the landing; nothing else this campaign |

Rough distance (2026-09-15 evening): scaffold 0.0.68 is published; the mcp server chain is in its
closing audit; what remains is the mcp landing and its distribution proof, each target's release
visit against 0.0.68, and the tool → mcp → agent → ollama publish wave with the user's one-time
codes. Estimate: one mcp audit round, one distribution unit and its audit, four visits, four
uploads, one scaffold floor refresh, then the landing.

## The remaining path, in order

1. **mcp:** gates `after-u4e-g` → A4n (reviewer on Opus + checker; brief
   `tmp/units/A4n-audit-brief.md`; P21 green). If PASS or judgment-only: land with
   `tmp/units/land-mcp-u4e-2.sh` (fifteen paths; message `scratchpad/commit-mcp-u4e.txt`) →
   U14e (builder; brief `tmp/units/U14e-mcp-setup-rename-brief.md`; commit) → U5c distribution
   receipts (Opus implementer; brief `tmp/units/U5c-mcp-distribution-brief.md`, fill
   `LANDING_LINE` with the landing commit; the tool and agent tarballs under `tmp/tarballs/`) →
   A5 (analyst + reviewer + checker) → commit → the mcp visit against scaffold 0.0.68
   (`tmp/units/visit.sh mcp v68`) → bump 0.0.31 → prepublishOnly → release commit.
2. **Visits against scaffold 0.0.68** (`tmp/units/visit.sh <checkout> v68`, Orchestrator-run:
   re-pin every `@orkestrel` range to the registry caret, install, the preparation commit,
   `scaffold overwrite`, `scaffold audit` exit 0, the full install, the self-pin sweep report,
   format, gates; then the dist-versus-published-tarball comparison as its own reading):
   browser and tool run first (their setup collisions are cleared; they hold no unpublished
   tarball); mcp after step 1; agent and ollama only after tool 0.0.15 is on the registry,
   because they hold the unpublished tool tip as a `--no-save` tarball and a visit's install
   restores the registry copy.
3. **Publish wave** (layer order from `scaffold catalog`): tool 0.0.15 → mcp 0.0.31 → agent 0.0.23
   → ollama (re-pin; bump only if its runtime edge moved). Each upload is the user's
   `npm publish --ignore-scripts --otp=<code>` in a real terminal after the layer's release
   commit is pushed; U9/U10 (probe and toolbox re-pins) follow as units.
4. **Scaffold floor refresh:** after the wave, refresh the hosted `guides/*.md` mirrors from the
   pushed mains (tool, mcp, agent, ollama), re-establish `host.json` if a mirror moves a
   collision (record what it admits and drops), bump 0.0.69, prepublishOnly, release commit, the
   user's upload.
5. **Landing:** push every checkout at landing (user's ruling); prune the campaign folder per
   `orkestrel-debrief/references/retention.md` after a final retention commit.
6. **Out of scope by the user's ruling (2026-09-15):** the supervisor repository (its guide
   relocation and its `npm ci` ERESOLVE) and D2, the browser reading arm — see `HANDOFF-D2.md`.
7. **D2** (browser reading arm) is OUT OF SCOPE for this session by the user's ruling
   (2026-09-15) and fully specified for the next one in `HANDOFF-D2.md` beside this file: the
   goal in the user's words, both design sketches, the draft brief
   (`D2-design-brief.draft.md`, retained here) with its two `TO FILL` markers and how to fill
   them, the rulings that bind it, the browser checkout's state, what the campaign learned that
   bears on it, and the resume steps. The supervisor repository is likewise out of scope.

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
