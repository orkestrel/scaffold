# Campaign registry — fleet OS-agnosticism audit

Started 2026-08-26. Authoritative session: Claude Code on the Windows host
(`C:\Users\mikes\WebstormProjects\scaffold`), Opus-class Orchestrator.

## Goal

Audit every target repository for operating-system coupling, repair every confirmed defect so the
fleet runs on Windows and Linux, gate genuinely OS-specific behavior on the OS it needs, land the
instruction-set updates the campaign reveals, and deliver a republish inventory ordered by
dependency layer from material `dist/` movement.

## Exit criterion

The campaign ends when every capability in this list is closed on evidence:

1. **Sweep coverage.** Every target repository swept by a Grok absorption lane and by the
   deterministic pattern scan, with the two reconciled into a per-repository defect matrix. Every
   matrix row ends implement, repair, retain, or intentionally exclude, with evidence.
2. **Runtime portability.** Every confirmed runtime defect in published `src/` is repaired, with a
   test that passes on Windows and Linux, or is OS-gated where the behavior is genuinely
   OS-specific.
3. **Test portability.** Tests are OS-agnostic, or conditioned on the OS they require. No test
   assumes a specific shell or terminal unless that shell is the subject under test.
4. **Instruction set.** Portability rules land in the canonical host inventory in `scaffold` and
   propagate through `repair`; harness bridges and skills updated where process changed.
5. **Gates.** Every touched repository's gate chain is green on this Windows host. Linux-side gate
   evidence recorded through WSL where available; recorded as an honest limit where not.
6. **Republish inventory.** Per touched package: a material-diff ruling of rebuilt `dist/` against
   the published tarball, and a publish order derived from the regenerated catalog layers.
   Publishing itself is the user's decision.

Findings outside OS coupling are recorded for a successor campaign, never fixed here.

## Target repositories

All verified 2026-08-26 by `tmp/fleet-state.sh` (all on `main`, all clean):

| Repo      | Package               | Version  | Head                                             |
| --------- | --------------------- | -------- | ------------------------------------------------ |
| scaffold  | `@orkestrel/scaffold` | `0.0.54` | `9e65e2f` 0.0.54                                 |
| lsp       | `@orkestrel/lsp`      | `0.0.2`  | `30f6cf6` 0.0.2                                  |
| mcp       | `@orkestrel/mcp`      | `0.0.25` | `9459a32` 0.0.25                                 |
| probe     | `@orkestrel/probe`    | `0.0.8`  | `88c2fa6` 0.0.8                                  |
| process   | `@orkestrel/process`  | `0.0.6`  | `2a47ed1` Guard the late fixture holder …        |
| server    | `@orkestrel/server`   | `0.0.15` | `062bdce` Adopt the published scaffold 0.0.53    |
| sea       | `@orkestrel/sea`      | `0.0.11` | `c630dc5` Adopt the published scaffold 0.0.53    |
| worker    | `@orkestrel/worker`   | `0.0.9`  | `a85520b` Adopt the published scaffold 0.0.53    |
| websocket | `@orkestrel/websocket`| `0.0.10` | `4afe8c6` Adopt the published scaffold 0.0.53    |
| console   | `@orkestrel/console`  | `0.0.10` | `6ffdfd8` Adopt the published scaffold 0.0.53    |
| test      | `@orkestrel/test`     | `0.0.11` | `96e8343` Adopt the published scaffold 0.0.53    |
| browser   | `@orkestrel/browser`  | `0.0.13` | `37a5d89` Adopt the published scaffold 0.0.53    |
| terminal  | `@orkestrel/terminal` | `0.0.12` | `cf47cd0` Adopt the published scaffold 0.0.53    |
| agent     | `@orkestrel/agent`    | `0.0.18` | `29eaaf2` Adopt the published scaffold 0.0.53    |
| guide     | `@orkestrel/guide`    | `0.0.14` | `23c824d` Adopt the published scaffold 0.0.53    |

## Bench liveness (probed 2026-08-26)

- **Cursor Grok: live.** Round trip returned `OK` through the versioned entry
  `$LOCALAPPDATA/cursor-agent/versions/2026.08.11-e8db854`. Journal `tmp/cursor/probe.log`.
- **Codex Sol: dark.** CLI resolves (`codex-cli 0.149.1`), auth reaches the server, and the pinned
  model is refused: HTTP 400 `The 'gpt-5.6-sol' model is not supported when using Codex with a
  ChatGPT account`. Journal `tmp/codex/probe.jsonl`, thread `01a03fe0-791a-77e3-8fea-9dbe67edee5c`.
  The user confirmed mid-session: ignore Codex for this campaign.

## Routing ledger

User authorization 2026-08-26: ignore Codex; Grok may stand in for Sol; hold Opus in higher
confidence than Grok when their verdicts conflict.

| Work                         | Route                                                            |
| ---------------------------- | ---------------------------------------------------------------- |
| Absorption, sweep, scouting  | Grok (Cursor bench, versioned entry), one lane at a time         |
| Subjective design lane       | `planner` (Opus 5, clean-context native subagent)                |
| Objective design lane        | Opus 5 clean-context substitute, told it holds the objective lane; Grok corroborates where the cost is reading |
| Implementation (nontrivial)  | `implementer` (Opus 5), sole serial writer per repository        |
| Implementation (mechanical)  | `builder` (Sonnet)                                               |
| Subjective audit lane        | `reviewer` (Opus 5)                                              |
| Objective audit lane         | Grok (user-authorized Sol replacement) and/or Opus substitute; cross-engine rule: a unit written on Opus gets its objective audit from Grok where feasible |
| Gate evidence                | `verifier` (Sonnet), per repository                              |

Deviation recorded: Grok lane launches are composed and launched by the Orchestrator directly with
the invocation form the `grok` role file pins (versioned entry, `--trust --mode=ask`,
`cursor-grok-4.6-high`, journaled under `tmp/cursor/`), because the file-first dispatch law already
puts the brief on disk and the probe validated the command form. Briefs and journals follow the
bench laws unchanged.

## Write scope

- One writer at a time per repository, from a clean committed baseline.
- Vendored host files inside targets are off-limits everywhere: `repair` restores them, and they
  are `scaffold`'s published `dist/host` surface. Instruction-set changes land in `scaffold`'s host
  inventory only.
- Campaign artifacts live here (`.orkestrel/campaign/`), never in the packages.

## Unit ledger

| Unit | Repo | Status |
| ---- | ---- | ------ |
| S1 rules file | scaffold | returned green; report retained; host inventory regen owed at integration |
| S2 policy sweep | scaffold | dispatched |
| C1 renderBox CRLF | console | returned green; report retained |
| C2 CI axis | console | dispatched |
| T1 parseKey CRLF | terminal | returned green; report retained |
| T2 CI axis | terminal | dispatched |
| L1 guide URIs | lsp | returned green; report retained |
| L1b TSDoc URIs | lsp | returned green |
| L2 CI create | lsp | dispatched |
| TE1 Windows proofs | test | returned green; report retained |
| TE2 guide claims | test | dispatched |
| P1 overlay drive-case probe | probe | clean probe; finding carried to P4; report retained |
| P4 overlay name-case fix | probe | dispatched |
| B1 where CRLF | browser | returned green; report retained |
| B2 SIGTERM test gating | browser | dispatched |
| PR0 grandchild diagnosis | process | dispatched |
| SE1 CI axis | sea | dispatched |
| M1 CI axis | mcp | dispatched |
| S2 policy sweep | scaffold | returned green; architecture.md patch applied serially; inventory regenerated (config 46, policy 110 green) |
| S3 CI axis | scaffold | returned green; dead Playwright step removed with reason |
| TE2 guide claims | test | returned green; falsified a brief premise by measurement, corrected |
| TE3 CI axis | test | returned green |
| P2 probe guide | probe | struck at re-baseline: canonical guide already correct |
| P3 CI create | probe | returned green |
| P4 overlay name-case fix | probe | returned green; RuntimeStage overlay residual recorded for audit |
| B2 SIGTERM test gating | browser | returned green |
| B3 launch diagnosis | browser | diagnosis complete, correctly stopped for ruling; ruling accepted → B5 |
| B5 CDP-owner adoption | browser | dispatched |
| B4 CI axis | browser | queued after B5 |
| PR0 grandchild diagnosis | process | returned green; hypothesis refuted by measurement; test-side repair |
| PR1 CI create | process | returned green |
| L2 CI create | lsp | returned green |
| T2/C2/SE1/M1/TE3 CI axes | terminal/console/sea/mcp/test | returned green |
| mcp solo re-run | mcp | all green solo — baseline reds were load flakes |
| Fleet sweep probe | all | zero violations, control reds — no target reds at re-pin |
| B4 CI axis | browser | returned green |
| Audit round 1 | fleet | checker PASS (mechanical); Grok FAIL (4 broken, reproduced); reviewer FAIL (3 broken + F1-F11); reconciled in `audit-1-verdict.md` |
| Verifier V1-V3 | fleet | every repo's full gate chain green on this host; mcp one load-race, solo green |
| Fix round FA/FB/FT/FC/FL/FP/F9 | fleet | all returned green; `fix-round-report.md` |
| Final sweep | scaffold/browser/probe/terminal | full `npm test` exit 0 after the fix round |
| Integration commits | fleet | landed 2026-08-26; every tree clean (`commit-campaign.sh` output) |
| Republish inventory | fleet | `republish-inventory.md` — console, lsp, browser, terminal, probe, scaffold material; rounds derived |

## Exit criterion closure

1. **Sweep coverage** — closed: four Grok lanes plus the controlled deterministic scan, reconciled
   through the design round's per-repo matrix; every row ruled repair/retain/protocol/guide/test
   with evidence.
2. **Runtime portability** — closed: browser `where` parse and endpoint-owner adoption, console
   CRLF framing, terminal CRLF Enter, probe overlay case matching — each red-then-green with the
   regression adopted; deliberate platform forks retained on evidence.
3. **Test portability** — closed: browser SIGTERM gating on the shared mechanism reading, test-repo
   host-reading gates, process termination measurement; capability-probe idiom confirmed as the
   fleet convention.
4. **Instruction set** — closed: `.claude/rules/portability.md` plus rule-map row, architecture
   sweep bullets, and the `portability`/`rules` policy-sweep members with controls — all vendored
   and propagating at re-pin; harness bridges and skills assessed as needing no change.
5. **Gates** — closed on this Windows host (verifier V1-V3 plus the final sweep); Linux proof is
   the ubuntu CI axis, now present in every fleet workflow, with the Windows floor limit recorded
   on each exclude row.
6. **Republish inventory** — closed: `republish-inventory.md`, instrument-controlled, rounds
   derived from runtime edges. Publishing awaits the user.

## Successor rows (recorded, not reopened)

- process `executeSync.test.ts:71` splits child output on `'\n'` alone (legal before the rule;
  first conformance sweep owns it) and its stale bootstrap-latency comment; readiness budgets thin
  under contention (307-2455 ms descendant creation measured).
- probe `RuntimeStage` mints an exact-match overlay; settling probe named in the audit (one
  inspection with a divergent-case candidate imported under the disk spelling — reviewer corrected
  severity: a miss surfaces as a candidate-miss issue, not a silent wrong answer).
- mcp `MCPLegacyClientTransport.test.ts:397` 20 ms race loses under full-suite load (solo green).
- worker thread-spawn deadlines pass on this host; contended-runner risk stands.
- Browser dependency question: `@orkestrel/process` adoption for finder resolution (rejected this
  campaign as an unrequested dependency and layer edge).
- guide `EXTERNAL_SCHEMES` omits `file:` (scheme handling, not OS coupling).

## Status log

- 2026-08-26: registry created; benches probed; fleet state recorded; absorption lanes launching.
- 2026-08-26: deterministic scan complete with passing controls; hits partitioned owned/vendored
  (`scan/summary-owned.txt`); every non-scaffold repo shares an identical vendored hit block.
- 2026-08-26: lane A (process, lsp, sea) returned; retained as `os-sweep-a-{brief,report}.md`.
  Reading: process and sea are deliberately platform-forked and gated; residue candidates are the
  vendored bash scripts, guide claims assuming POSIX, POSIX-shaped `file://` fixtures in lsp, and
  timing budgets sized on Linux.
- 2026-08-26: CI survey: every repo with CI runs `ubuntu-latest` only; lsp, probe, and process
  have no workflows at all. Windows proof exists only on the user's machine.
- 2026-08-26: sweeps B, C, D returned and retained. Measured probes recorded in `probes.md`:
  win32 `X_OK` existence-degrade, `O_NOFOLLOW` undefined, `where` trailing-`\r` defect in
  browser, SIGTERM uncatchable on win32. Design round dispatched: planner (Opus, subjective),
  Opus objective substitute, Grok corroboration — blind, one identical brief
  (`tmp/units/design-brief.md`).
- 2026-08-26: design round reconciled (three lanes retained as `design-*-report.md` and the two
  Opus lane reports in the session transcript). Rulings: repair browser `where` parse, console
  `renderBox` CRLF, terminal `parseKey` CRLF row, lsp guide URIs, test-repo proofs and guide
  prose, browser SIGTERM test gating; probe-first for probe Overlay drive case; retain scaffold/sea
  containment, template `X_OK`, protocol CRLF, platform forks, `scripts/*.sh`, `.gitattributes`;
  instruction set gains `.claude/rules/portability.md` plus a narrow policy-sweep extension; CI
  gains workflows for lsp/probe/process and a restricted `windows-latest` include. Deterministic
  Windows reds found by baseline (browser real-launch exit-0 plus profile `EPERM`; process
  grandchild surviving the sync tree kill) become units B3 and PR0.
- 2026-08-26: lockfile syncs committed in server, sea, worker, websocket, console, test, browser,
  terminal, agent. Wave 1 dispatched: S1 (scaffold rules), C1 (console), T1 (terminal), L1 (lsp),
  TE1 (test), P1 (probe), B1 (browser), PR0 (process) — one writer per repository.
- 2026-08-26: Windows baseline: probe suite passes clean. Finding — most repos' lockfiles trail
  their manifests (`npm ci` EUSAGE: lock names guide 0.0.13/probe 0.0.5 against manifest
  guide 0.0.14/probe 0.0.6), so `npm ci` fails everywhere it is out of sync, on any OS. Lockfile
  sync via `npm install` run in server, sea, worker, websocket, console, test, browser, terminal,
  agent; the resulting `package-lock.json` diffs are baseline repairs to commit per repo before
  any fix unit dispatches. process and guide lockfiles were already in sync.
