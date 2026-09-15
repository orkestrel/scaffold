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

## Where each checkout stands (2026-09-15, ~17:30 UTC)

| Checkout | HEAD (local) | Working tree | State | Next |
| --- | --- | --- | --- | --- |
| `tool` | `0f8fb24` `chore: release tool 0.0.15` — PUSHED and PUBLISHED by the user (registry shasum `07c17603…`) | clean | released; visited against scaffold 0.0.68 (audit exit 0, gates green; `@types/node` held at `^26.5.1`) | after scaffold 0.0.69 is on the registry: re-pin `@orkestrel/scaffold` `^0.0.69`, `repair` (or `tmp/units/visit.sh tool v69`), gates, dist compare (must read no material difference: a development-only move, no bump), commit by pathspec, push |
| `agent` | `d509108` `chore: release agent 0.0.23` — PUSHED and PUBLISHED by the user (registry shasum `028a324b…`) | clean | released; visited against scaffold 0.0.68 and tool 0.0.15; the hosted `guides/agent.md` in scaffold 0.0.69 mirrors this pushed main | the same development-only re-pin to `^0.0.69` + `repair`; push |
| `mcp` | `8d97dd0` `chore: visit scaffold 0.0.68` on `cc34f01` (the preparation re-pin) on `18c3d33` U14e on `406b5c9` the server chain on `7959f08` the browser face — UNPUSHED | U5c RETURNED, uncommitted: `tests/distribution.test.ts` (+387: the composition receipts X5–X8, the closure, the control), new `tests/fixtures/distributionPage.mjs` and `distributionServer.mjs`, `guides/mcp.md` `## Tests` (+30); `tmp/u5/` holds the unit's own logs | LANDED: the browser face and the server chain; U14e; visited against 0.0.68 and tool 0.0.15 with ONE standing policy red (the 0.0.68 reader refuses the `buildModernResult` overload) that the scaffold 0.0.69 re-pin closes; U5c green on its owned gates (distribution 18 passed / 4 skipped in release mode; guides 202) with two recorded departures (registry agent 0.0.23 instead of the tip tarball; `@orkestrel/ndjson` in the throwaway consumer's install) and two observations (the request-closure abort drops the `notifications/cancelled` reason; a string tool value re-enters JSON-quoted) — all in `U5c-mcp-distribution-report.md` and claims 11–13 of the A5 brief | the A5 evidence RUNNING (scratchpad `a5-evidence.sh`: `npm run test:distribution -- --mode release` → `A5-distribution-orchestrator.log.txt`, then `gates3.sh mcp after-u5c`) → retain the gates as `U5c-mcp-gates-orchestrator.log.txt` / `-test-full.log.txt` → A5 (Astra through `tmp/codex/A5-run.sh` + `reviewer` + `checker`; brief `tmp/units/A5-audit-brief.md`, amended with claims 11–13) → commit U5c by pathspec (the four paths) → after scaffold 0.0.69 publishes: re-pin `^0.0.69` + `repair` (clears the policy red; commit) → bump 0.0.31 → `release-chain.sh mcp v31` → release commit → THE USER pushes and uploads |
| `ollama` | `50d869e` `chore: release ollama 0.0.17` on `76d9caf` the visit on `b70e066` the preparation re-pin on `5c218cd` — UNPUSHED (7 commits ahead of `origin/main`) | clean | visited against scaffold 0.0.68, tool 0.0.15, and agent 0.0.23 (audit exit 0, gates green; a `guides/browser.md` mirror added; `@types/node` re-declared `^26.6.0`); dist compare vs 0.0.16: one `@remarks` paragraph material, and the runtime ranges on tool and agent moved → bumped 0.0.17; release chain GREEN (prepublishOnly exit 0; pack dry run 9 files, shasum `2fcb2c96…`) | THE USER: `git push origin main` in the ollama checkout, then `npm publish --ignore-scripts --otp=<code>` there with a fresh one-time code; confirm `npm view @orkestrel/ollama version` serves 0.0.17 (compare the registry shasum with `2fcb2c96…`); later the development-only re-pin to scaffold `^0.0.69` + `repair` |
| `scaffold` | records checkpoint 4 on `bf7d33a2` (checkpoint 3) on `7a90fa88` `chore: release scaffold 0.0.68` — 0.0.68 PUBLISHED and PUSHED by the user | the 0.0.69 release files, uncommitted until the release commit that follows checkpoint 4: D4-9 + D4-9b (`tests/setupPolicy.ts`, `tests/setupPolicy.test.ts`), the hosted `guides/tool.md` and `guides/agent.md` refreshed from the pushed mains, `host.json` regenerated (entry digests and the manifest digest only; the surface unchanged at 129 entries), the bump to 0.0.69 (`package.json`, `package-lock.json`), three fixtures under `tests/src/core/fixtures/` re-pinned `^0.0.69` | ACCEPTED for release: D4-9 (the reader accepts `TSDeclareFunction`) audited FAIL 3 → D4-9b (the pin renamed with the declaration- and statement-refusal controls, the `function overload` matrix row, the collision key without `line` — one violation per name per file per owner) → gates `after-d49b` GREEN → AD4-9b RECONCILED PASS (`AD49b-audit-verdict.md`: checker PASS; Astra 1–6 with the merging vector closed by P24 and the release-mode vector by the chain log; the reviewer SHIP; the report-prose findings recorded, not adopted; carry-forwards: the collision pin's describe block, `export declare global`) → release chain v69b GREEN (prepublishOnly exit 0; pack dry run 190 files, shasum `f5c2f8d869ac3d772f8e46b5c14072bfa0743052`) | the release commit (`scratchpad/commit-scaffold-release-69.txt`, retained as `commit-scaffold-release-69.draft.txt`; the files in the working-tree column) → THE USER: `git push origin main` in the scaffold checkout, then `npm publish --ignore-scripts --otp=<code>` there with a fresh one-time code; confirm `npm view @orkestrel/scaffold version` serves 0.0.69 with shasum `f5c2f8d8…`; then every target re-pins `^0.0.69` + `repair` (mcp first: it clears the standing policy red) |
| `browser` | `401b1fb` `chore: visit scaffold 0.0.68` on `f34fc51` (the preparation re-pin) on `f932493` U14d — UNPUSHED | clean | visited against 0.0.68 (audit exit 0, gates green; `@types/node` held at `^26.5.1`); dist compare vs 0.0.16: no material difference — no bump owed; D2 out of scope (`HANDOFF-D2.md`) | the development-only re-pin to scaffold `^0.0.69` + `repair` (re-declare `@types/node` `^26.6.0`); push at the landing |

Rough distance (2026-09-15, ~18:00 UTC): ollama 0.0.17 is release-committed and waits for the
user's push and upload; scaffold 0.0.69 is accepted and release-commits after records checkpoint
4, then the same wait. mcp's distribution receipts (U5c) returned green and are in their audit
round (A5), then the re-pin to 0.0.69 and the release 0.0.31. After the wave: the development-only
re-pins of tool, agent, browser, and ollama to 0.0.69; U9/U10; a scaffold 0.0.70 that refreshes
the hosted mcp and ollama mirrors; the landing. Estimate: one audit round (A5), three uploads
(scaffold, ollama, mcp) plus one floor-refresh upload, four development re-pins, then the landing.

## The remaining path, in order


1. **scaffold 0.0.69:** ACCEPTED (AD4-9b reconciled PASS; release chain v69b green): the release
   commit follows records checkpoint 4 → the user's push and upload →
   `npm view @orkestrel/scaffold version` reads 0.0.69 (shasum `f5c2f8d8…`).
2. **ollama 0.0.17:** the user's push and upload (independent of step 1: its runtime ranges sit on
   the published tool 0.0.15 and agent 0.0.23, and its scaffold edge is development-only).
3. **mcp:** the row's Next column: U5c → A5 → commit → re-pin `^0.0.69` + `repair` → bump 0.0.31 →
   `release-chain.sh mcp v31` → release commit → the user's push and upload. The re-pin needs
   0.0.69 on the registry (poll `npm view @orkestrel/scaffold versions --json`; packuments lag
   uploads by minutes).
4. **Fleet re-pin to 0.0.69** (tool, agent, browser, ollama; mcp inside step 3): re-pin the range,
   `repair` (or `tmp/units/visit.sh <checkout> v69`, which also re-pins every other `@orkestrel`
   range to the registry caret and re-declares `@types/node`), gates, dist compare against the
   published version — a development-only move reads no material difference and obliges no bump
   (`.agents/orchestration.md` § What a bump obliges); commit by pathspec; push.
5. **U9/U10** (probe and toolbox re-pins to the published tool, agent, and mcp) as units after the
   wave; their briefs are not yet written.
6. **scaffold 0.0.70 (the floor refresh):** after the mcp and ollama pushes, refresh the hosted
   `guides/mcp.md` and `guides/ollama.md` from their pushed mains (`git show origin/main:guides/<name>.md`
   in each checkout; the published tarballs ship no guides), `npm run build` (the inventory must
   admit the refresh — re-establish `host.json` with `reestablish-inventory.mjs` only where a
   refreshed mirror moves a collision, and record what it admits and drops), bump, the release
   chain, the release commit, the user's upload; the targets' following re-pin is development-only.
7. **Landing:** push every checkout (the user's ruling: push at landing; the release pushes happen
   at each upload); a final retention commit of `.orkestrel/campaign/`; prune the campaign folder
   per `orkestrel-debrief/references/retention.md`.
8. **Out of scope by the user's ruling (2026-09-15):** the supervisor repository (its guide
   relocation and its `npm ci` ERESOLVE) and D2, the browser reading arm — fully specified for the
   next session in `HANDOFF-D2.md` beside this file (the goal in the user's words, both design
   sketches, the draft brief `D2-design-brief.draft.md` with its two `TO FILL` markers and how to
   fill them, the rulings that bind it, the browser checkout's state, the resume steps).

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

- The npm one-time codes at each remaining publish: scaffold 0.0.69 and ollama 0.0.17 (both
  release-committed and unpushed on 2026-09-15 ~17:30 UTC), mcp 0.0.31 (after U5c and A5), and
  scaffold 0.0.70 (the floor refresh after the mcp and ollama pushes).
- The pushes: scaffold and ollama at their uploads; mcp at its upload; browser at the landing
  (tool and agent are pushed).
- The supervisor checkout's `npm ci` ERESOLVE (a middleware peer range) — outside this campaign.

## Added 2026-09-15 after AD4b

- Wave order (AD4b reviewer 10): each target's U14-* cleanup runs BEFORE its re-pin and `repair`, as `names.md` § Fleet name ownership states; never re-pin first.
- Supervisor mirror provenance (AD4b reviewer 10): `guides/supervisor.md` in scaffold is a byte copy of the local supervisor checkout, which has not pushed; push supervisor's `main` (the guide relocation) before the scaffold publish, or record the divergence against the row that owns it. The supervisor checkout also carries the `npm ci` ERESOLVE finding.
- `describeWebMCPTool` in mcp: the `describe*` prefix contract (A4g reviewer R8) is a design-round item after the mcp chain lands — a public export rename.
