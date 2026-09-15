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
| `mcp` | `b9ff0b9` core adoption | 27 tracked files dirty: the whole browser face U4 → U4c → U4d → U4f → U4g → U4h → U4i → U4j | A4g: checker chain-walk closed; analyst FAIL 2, 3, 4 (two writer-only controls → P16, a prune failure-path pin, a skip sentence); reviewer PASS with F9–F12 precision items | P16 → U4k (prune in `finally` + pins + prose) → gates → A4h (analyst + checker) → commit (`scratchpad/commit-mcp-u4g.txt`, extend for U4h–U4j) → U4e (server `list_changed` producer; brief `tmp/units/U4e-mcp-list-changed-brief.md`, fill CHECKPOINT_LINE) → A4h → U5b distribution → A5 → bump 0.0.31 |
| `ollama` | `295fecb` browser devDependency + tool mirror | 6 tracked + untracked `tests/service/page.test.ts`: U13b → U13c → U13e → U13f → U13g | A13e: checker PASS, reviewer/analyst findings carried; U13h landed (every A13e item; `PAGE_INTERVALS`, `launches`, `SCHEDULE_SLACK`, cause assertions, the narrowed cancellation ruling); gates `after-u13h` green, the authoritative service run 13 files / 69 passed, no headless Edge; A13f (analyst + checker) RUNNING | reconcile A13f (analyst + checker) → refresh `guides/agent.md` from agent `148c237` → commit (`scratchpad/commit-ollama-u13e.txt`, extend) → bump only if agent's runtime edge moves |
| `scaffold` | `95f7f18b` (published 0.0.67) | 40 tracked dirty + `guides/supervisor.md` untracked + `.orkestrel/` | D4 chain landed (D4-1b hosted guides, D4-2b catalog floor, D4-3 `surface` rule, U14/U14b/U16 renames, D4-1c/D4-1e inventory baseline, U15, D4-4/D4-7 prose, D4-5/D4-6 AD4 fixes, the `@orkestrel/guide` ^0.0.19 re-pin, `.prettierignore` `host.json`); V4 GREEN on every gate (distribution included; `audit` reading recorded); AD4b: checker FAIL only on the untracked `guides/supervisor.md` (now staged, reads `A`; landing pathspec recorded as ledger row `K-landing-pathspec`); analyst FAIL 1 (a namespace `default` export accepted) and reviewer FAIL 5 7 (prose, `captureScaffoldMessage`) plus G1–G4 → U17 landed all of them; gates `after-u17` RUNNING | distribution + checker verification of U17 → commit by pathspec (message drafted: `scratchpad/commit-scaffold-d4.txt`) → possible small fix round → commit by pathspec (include `guides/supervisor.md`, `host.json`, `.prettierignore`, `package.json`, `package-lock.json`) → retention commit of `.orkestrel/campaign/` → bump 0.0.68 → publish FIRST |
| `browser` | `1acadb4` | clean | untouched this campaign (D2 later) | — |

Rough distance: the implementation is done on every package; what remains is closing audits,
commits, the scaffold release, the tool → mcp → agent → ollama re-pin and publish wave, and the
fleet-wide setup-helper cleanup the `surface` rule will demand of every target. Estimate: three to
five more audit/fix rounds across mcp and scaffold, one small ollama round, then the landing.

## The remaining path, in order

1. **mcp:** reconcile A4g (analyst, reviewer pending). If PASS or judgment-only: commit the
   browser face on `b9ff0b9`. Then U4e (Astra, sol route; server-side `notifications/tools/
   list_changed` from `tools.emitter`, the built-in producer owns the tools family, discovery
   advertises `tools.listChanged`), A4h (analyst + checker), U5b (distribution proof against the
   packed tool tarball; brief `tmp/units/U5b-mcp-distribution-brief.md`), A5, commit.
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
