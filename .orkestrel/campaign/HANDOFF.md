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
| `tool` | `0974d9e` `chore: visit scaffold 0.0.69` on `8789aa9` (the preparation re-pin) on `0f8fb24` `chore: release tool 0.0.15` (PUBLISHED) — 2 commits UNPUSHED | clean | released 0.0.15; VISITED against 0.0.69 (audit exit 0, gates green, `@types/node` `^26.6.0`; dist compare vs 0.0.15: no material difference — no bump) | push at the landing (`git push origin main`); nothing else this campaign |
| `agent` | `cc8a5b2` `chore: visit scaffold 0.0.69` on `43f944a` (the preparation re-pin) on `d509108` `chore: release agent 0.0.23` (PUBLISHED) — 2 commits UNPUSHED | clean | released 0.0.23; VISITED against 0.0.69 (audit exit 0, gates green, `@types/node` `^26.6.0`; dist compare vs 0.0.23: no material difference — no bump) | push at the landing; nothing else this campaign |
| `mcp` | `7111d57` `chore: release mcp 0.0.31` on `13715cb` the 0.0.69 visit on `b36cdc2` the preparation re-pin on `f9a15f4` the composition receipts on `8d97dd0` the 0.0.68 visit — UNPUSHED, 10 commits ahead of `origin/main` | clean | RELEASE-COMMITTED 0.0.31. What it publishes: the browser face (`createPageServer`, `createModelContext`), the server's registry-driven `notifications/tools/list_changed` producer with its demand-driven, failure-ordered, coalescing subscription, and the conformance rename. What landed beside it unpublished: the composition receipts (units U5c through U5g), which drive the packed artifact in a real Chromium page beside the installed agent, tool, and parser artifacts over an import map answered from the consumer's own `node_modules`. Audited across THREE rounds — A5, A5b (three contract lanes plus one blind lens per seam over six seams), A5c — which found and closed a scratch-tree leak the delta introduced, an assertion whose field name read backwards, formatter residue `oxfmt` cannot see, a header false of its own file, prose counts, a dead field, surviving duplication, an authorization no receipt could redden, an unchecked flat-install assumption, and a reached-file assertion that did not pin what it advertised. Five Orchestrator probes settled what the bench sandbox cannot run: P25, P26, P27, P28, and the landing readings. The 0.0.69 visit CLEARED the standing policy red (`101 passed / 1 skipped` where every earlier run read `1 failed`). The release chain ran green end to end: every project passing and the release-mode distribution at 19 passed / 4 skipped; pack dry run 18 files, 834.0 kB, shasum `9c4d7f4ca478b5dcce290bbee5618c2e9c733eb4` | THE USER: `git push origin main` in the mcp checkout, then `npm publish --ignore-scripts --otp=<code>` there with a fresh one-time code; confirm `npm view @orkestrel/mcp version` serves 0.0.31 and its `dist.shasum` equals `9c4d7f4c…`. Then U9/U10 re-pin probe and toolbox, and scaffold 0.0.70 refreshes the hosted `guides/mcp.md` from this pushed main |
| `ollama` | `034f2e1` `chore: visit scaffold 0.0.69` on `581a06a` (the preparation re-pin) on `50d869e` `chore: release ollama 0.0.17` (PUSHED and PUBLISHED by the user on 2026-09-15, registry shasum `2fcb2c96…`) — 2 commits UNPUSHED | clean | RELEASED 0.0.17 on tool 0.0.15 and agent 0.0.23; VISITED against 0.0.69 (audit exit 0, gates green; dist compare vs 0.0.17: no material difference — no bump) | push at the landing; nothing else this campaign |
| `scaffold` | `774f3cff` `chore: release scaffold 0.0.69` on `709235e1` records checkpoint 4 — PUSHED and PUBLISHED by the user on 2026-09-15 (registry shasum `f5c2f8d8…` equals the pack dry run) | clean but for the untracked `dist/` and the campaign folder's growth since checkpoint 4 | RELEASED 0.0.69: the surface reader accepts `TSDeclareFunction`, the collision consumer reports one name once per file per owner, the hosted tool and agent mirrors refreshed (D4-9, D4-9b, AD4-9, AD4-9b, P22–P24) | the targets re-pin `^0.0.69` + `repair` (`visit.sh <checkout> v69`; browser and tool running, then agent and ollama, mcp after U5d); scaffold 0.0.70 after the mcp and ollama pushes (the hosted mirrors); the final retention commit and the prune at the landing |
| `browser` | `15c0a9b` `chore: visit scaffold 0.0.69` on `70514bf` (the preparation re-pin) on `401b1fb` (the 0.0.68 visit) on `f932493` U14d — UNPUSHED | clean | VISITED against 0.0.69 (audit exit 0, gates green, `@types/node` `^26.6.0`; dist compare vs 0.0.16: no material difference — no bump); D2 out of scope (`HANDOFF-D2.md`) | push at the landing; nothing else this campaign |

Rough distance (2026-09-15, ~19:35 UTC): scaffold 0.0.69, ollama 0.0.17, tool 0.0.15, and agent
0.0.23 are published; tool, agent, browser, and ollama are re-pinned to 0.0.69 with no bump owed,
their visit commits unpushed until the landing. mcp has landed its composition receipts and is in
its 0.0.69 visit, then the bump to 0.0.31, the release chain, the release commit, and the upload.
After that the campaign closes: U9/U10, a scaffold 0.0.70 refreshing the hosted mcp and ollama
mirrors, and the landing push with the retention prune. Estimate: one mcp upload, one
floor-refresh upload, then the landing.

## The remaining path, in order

1. **mcp 0.0.31:** RELEASE-COMMITTED `7111d57`, the chain green end to end (pack shasum
   `9c4d7f4c…`). The user pushes and uploads; confirm the registry serves 0.0.31.
2. **U9/U10:** re-pin `probe` and `toolbox`, which still hold mcp `^0.0.30`, tool `^0.0.14`,
   agent `^0.0.21`, and scaffold `^0.0.67`. Each is a clean tree on `chore: align published
   development tooling`; their briefs are not yet written.
3. **scaffold 0.0.70, the floor refresh:** after the mcp and ollama pushes, refresh the hosted
   `guides/mcp.md` and `guides/ollama.md` from their pushed mains (`git show origin/main:guides/<name>.md`
   in each checkout; the published tarballs ship no guides — the ollama mirror is already stale by
   about 30 lines), `npm run build` (re-establish `host.json` with `reestablish-inventory.mjs` only
   if a refreshed mirror moves a collision, recording what it admits and drops), bump, the release
   chain, the release commit, the user's upload; the targets' following re-pin is development-only.
4. **Landing:** push every checkout — tool `0974d9e`, browser `15c0a9b`, agent `cc8a5b2`, ollama
   `034f2e1`, mcp `7111d57` — then a final retention commit of `.orkestrel/campaign/` and the
   prune per `orkestrel-debrief/references/retention.md`.
5. **Out of scope by the user's ruling (2026-09-15):** the supervisor repository, and D2, the
   browser reading arm, fully specified for the next session in `HANDOFF-D2.md`.

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

- The npm one-time codes at the remaining publishes: mcp 0.0.31 (`7111d57`, release-committed and
  unpushed on 2026-09-15) and scaffold 0.0.70 (the floor refresh after the mcp push).
- The pushes: mcp at its upload; tool, browser, agent, and ollama at the landing, each carrying
  only its development-only re-pin to scaffold 0.0.69.
- A ruling to confirm or overturn: the mcp distribution proof installs `@orkestrel/ndjson` into its
  throwaway consumer for the agent relay parser, and changes no manifest. The objective lane read
  that as an added package under R5; the subjective lane and the Orchestrator read it as the
  consumer modelling a real application, which the agent guide itself describes
  (`A5c-audit-verdict.md`). Overturning it means writing a parser inside the fixture, which
  `.claude/rules/tests.md` bars.
- The supervisor checkout's `npm ci` ERESOLVE (a middleware peer range) — outside this campaign.

## Added 2026-09-15 after AD4b

- Wave order (AD4b reviewer 10): each target's U14-* cleanup runs BEFORE its re-pin and `repair`, as `names.md` § Fleet name ownership states; never re-pin first.
- Supervisor mirror provenance (AD4b reviewer 10): `guides/supervisor.md` in scaffold is a byte copy of the local supervisor checkout, which has not pushed; push supervisor's `main` (the guide relocation) before the scaffold publish, or record the divergence against the row that owns it. The supervisor checkout also carries the `npm ci` ERESOLVE finding.
- `describeWebMCPTool` in mcp: the `describe*` prefix contract (A4g reviewer R8) is a design-round item after the mcp chain lands — a public export rename.
