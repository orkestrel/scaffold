# Conformance round — handoff to the next session

Written 2026-09-03 06:55 UTC by the Orchestrator of the fleet campaign. This folder holds everything the
next session needs to finish the strict conformance round and close the campaign. Read this file first,
then `AGENTS.md`, every file under `.claude/rules/`, `.agents/orchestration.md`, and the skills named in
§ Skills. The user's standing instruction for this round: *"Do not defer anything, make sure that we have
all implemented, even breaking changes, go through the processes we went through along with following the
improvements we find from the debrief."* Publishing stays held: nothing publishes without the user.

## Which engine and role to use for each step

The harness is Claude Code, so Opus 5 is the Orchestrator engine and holds the subjective lane
(`CLAUDE.md` § Models, `.agents/orchestration.md` § Orchestration by harness). The GPT-5.6 Sol bench is
dark in this environment (`codex` absent from PATH), so Opus 5 also holds the objective lane as the
recorded substitution; every verdict file names that substitution. The Fable 5.1 interlude of 2026-09-03
(`ledgers/interruptions.txt`) is history: the user reverted it, and every instrument in this folder
names `opus` again.

| Step | Role file (`.claude/agents/`) | Workflow `model` alias | Notes |
| --- | --- | --- | --- |
| Orchestrator (the main session) | — | run the session on `opus` at high effort (`/model opus`) | Commits, pushes, decides, lands. Never dispatched as a subagent role. |
| Finder lanes (objective, subjective) | `reviewer` | `opus` | Blind, clean context, read-only. The objective lane is the recorded substitution for the dark Sol bench. |
| Refuter lane | `reviewer` | `opus` | Objective perspective over the union of both finders' findings. |
| Reconciliation lane | `general-purpose` | `opus` | Applies only the fixed folding rules in `instruments/layer.workflow.js`; never re-judges substance. |
| Implementer, fix rounds | `implementer` | `opus` | Sole writer in its checkout. |
| Objective audit lane | `reviewer` | `opus` | "Your own engine wrote the subject; attack it harder." |
| Checker | `checker` | `sonnet` | Mechanical claims only. |
| Verifier (gate evidence) | `verifier` | `sonnet` | Or run `instruments/land-conform.mjs` yourself: it is the Orchestrator's own deciding gate run. |
| Absorption, scouting | `grok` | Cursor Grok bench (`agent` CLI, live on 2026-09-02) | Only for a reading-heavy question; none is pending. Fallback ladder: Grok → Luna → Sonnet, each step recorded. |
| Objective design or audit on Sol | `analyst`, `sol` | dark: `codex` absent from PATH | Probe once at session start (`codex --version`); if it resolves and authenticates, the objective lane moves back to Sol and the verdicts stop recording the substitution. |

Never use a fixed Claude model ID or `inherit` in a workflow node; the aliases are `opus` and `sonnet`,
and every `agent()` node names its alias explicitly. Never set `CLAUDE_CODE_SUBAGENT_MODEL`.

## Where things are

| What | Path | Notes |
| --- | --- | --- |
| Fleet checkouts | `/home/user/fleet/<package>` | Branch `claude/orkestrel-npm-audit-deps-14ibta` in every checkout and in scaffold. A fresh session must clone the fleet again if `/home/user/fleet` is gone: every `orkestrel/<package>` repository at that branch. |
| Scaffold checkout | `/home/user/scaffold` | Same branch. Canon lives at `AGENTS.md` and `.claude/rules/`; targets read the vendored copy from `node_modules/@orkestrel/scaffold/dist/host/`. |
| Staged closures | `node_modules` in every fleet checkout | Installed with `npm install --no-save` from packed tips; the register is `.orkestrel/campaign/fix/tarballs.json`. **Never run `npm install`, `npm ci`, or anything that rewrites `node_modules` or a lockfile in a fleet checkout**: it reverts the staged closure to registry copies. |
| Tarballs | `/home/user/scaffold/tmp/tarballs/<pkg>-<commit>.tgz` | Swept at acceptance; `instruments/pack-dep.sh` rebuilds any from a clean committed tip. |
| Finder and refuter rulings | `rulings/conform-<pkg>.json` | Copy of `/home/user/work/reports/`. The refuter's `rulings[]` with `verdict` CONFIRMED / REFUTED / FOLDED / ORCHESTRATOR are the implementation rows. `rulings/reconciled.txt` names the packages whose briefs are already generated. |
| Briefs | `briefs/` | `brief.md` is the shared conformance brief; `<pkg>-brief.md` the per-package finder brief; `conform-<pkg>-brief.md` the implementation brief and `conform-<pkg>-audit-brief.md` its audit brief (present only for reconciled packages); `conform-<pkg>-brief-1.md` is a superseded original beside its successor. `implement-template.md` is what `mkimplement.mjs` fills. |
| Writer reports | `reports/` | `conform-budget-report.md`, `conform-sse-report.md`. |
| Evidence | `evidence/` | `conform-<pkg>.checkpoint.diff` / `.status` are the diffs committed at the checkpoints below; `*.partial.*` the state the killed msg and sse writers left. |
| Instruments | `instruments/` | Every script named in this file. Copy them to a scratch directory outside the checkouts before running; they assume `/home/user/work` and the scratchpad paths written at their heads. |
| Ledgers | `ledgers/` | `reconcile.md` (Orchestrator and reconcile-lane rulings per package), `followons.md` (fleet-wide follow-ons), `interruptions.txt` (limits and restarts), `runs.json` and `remaining.json` (last run ids and the unruled set), the checkpoint commit messages. |
| Earlier campaign records | `../last/`, `../carry.md`, `../debrief.md`, `../debrief/`, `../fix/`, `../voice/` | The last-change records per package, the carry register, the debrief (terminal line still `DEBRIEF: OPEN`), the canon unit's verdicts, the tarball register. |

Working paths the instruments expect: `/home/user/work/reports/` (rulings), `/home/user/work/evidence/`,
`/home/user/scaffold/tmp/units/conform/` (briefs the agents read), a scratchpad for the workflow scripts.
Recreate them from this folder in a fresh session (§ Bootstrap).

## State per package

Layers derive from runtime `dependencies` (`instruments/layers.mjs`): L0 codec contract msg sse test;
L1 abort budget csv emitter html indexeddb ndjson sqlite timeout tool; L2 console database form markdown
middleware pool process reason router table template websocket; L3 browser guide interpret lsp mcp
qualifier queue rater relation scaffold sea server terminal workspace; L4 brief probe program worker
workflow; L5 agent; L6 ollama toolbox.

State as of 2026-09-03 10:58 UTC (`ledgers/session-2026-09-03.md` carries the narrative; `ledgers/runs.json` the run ids). Every package is ruled and its rulings retained under `rulings/`.

| Package | Brief generated | Implementation | Audit | Landed |
| --- | --- | --- | --- | --- |
| sse | yes | complete | three rounds, ACCEPT (`units/conform-sse-audit-verdict.md`) | `0586994`, follow-on `f80b232` |
| budget | yes | complete | three rounds, ACCEPT at landing (`units/conform-budget-audit-verdict.md`) | `e35e994`, follow-on `b8c0029` |
| test | yes (successor) | complete | round 1 PASS/PASS, ACCEPT (`units/conform-test-audit-verdict.md`) | `ed73b78` |
| msg | yes | complete (resumed on `1a8821a`) | three driver rounds, a targeted fix round, a checker pass; ACCEPT (`units/conform-msg-audit-verdict.md`) | `9298a32` |
| abort | yes (successor) | complete | round 1 FAIL 8 / PASS, briefed fix, round 2 PASS/PASS; ACCEPT (`units/conform-abort-audit-verdict.md`) | `7aee9fd`, setup-axis follow-on 674b77c |
| ndjson | yes (successor) | complete | round 1 FAIL 8 / FAIL 3 9, briefed fix, round 2 PASS/PASS; ACCEPT (`units/conform-ndjson-audit-verdict.md`) | `bc96a3c` |
| contract | yes (successor; checkpoint `01f3390`) | complete (resumed) | rounds FAIL 2 9 / FAIL 3 7, FAIL 3 4 / PASS, FAIL 6 / PASS; record prescriptions applied at landing; ACCEPT (`units/conform-contract-audit-verdict.md`) | `b3892f4` |
| indexeddb | yes (successor) | complete | round 1 FAIL 8 / PASS, briefed fix, round 2 PASS/PASS; ACCEPT (`units/conform-indexeddb-audit-verdict.md`) | `729ccf5` |
| csv | yes (successor) | complete | rounds FAIL 4 8 / PASS, FAIL 4 / PASS, FAIL 4 / PASS; one header sentence applied at landing; ACCEPT (`units/conform-csv-audit-verdict.md`) | `24861c3` |
| tool | yes | complete | round 1 PASS/PASS; ACCEPT (`units/conform-tool-audit-verdict.md`) | `1f36348`, follow-on `b2111d1` |
| timeout | yes | complete | round 1 PASS/PASS with record prescriptions applied at landing; ACCEPT (`units/conform-timeout-audit-verdict.md`) | `426420b` |
| emitter | yes | complete, two fix rounds in `layer2.L1b` (`wf_f5789004-34f`) | objective PASS and checker PASS (round 3); `units/conform-emitter-audit-verdict.md` | 67433a5, setup-axis follow-on 22d5f4d |
| sqlite | yes (sqlite-obj-1 is an Orchestrator manifest row, `briefs/followon/sqlite-engines-brief.md`, with the audit's R1, O1, and O2 as its added rows) | complete, one fix round in `layer2.L1b` (`wf_f5789004-34f`) | objective PASS and checker PASS (round 2); `units/conform-sqlite-audit-verdict.md` | 225bb1c, engines follow-on 87ab520 |
| html | yes | complete after three fix rounds (`layer2.L1b`, then `briefs/conform-html-fix3-brief.md` in `fixaudit.html3`) | round 4: checker PASS (Sonnet), objective PASS (Opus, from the Luna distillate); `units/conform-html-audit-verdict.md` | b3de1fa (deciding run with `test:distribution`) |
| table | yes | complete in `layer2.L2b` (`wf_075a2bf5-dad`, stopped 14:41 UTC); table-subj-2 transformed by ruling after round 1 and landed by `builder` (`briefs/conform-table-fix1-brief.md` and its successor `conform-table-fix1b-brief.md` after the closure re-stage: the accessor test green in `table-subj-2a-accessor.txt`, the scoped guide sentence, the two record findings; `units/l2b/table-fix1b-result.md`, gates green, audit clean) | round 1 (Grok-first): Luna distillate, objective PASS with F1, F2 and R1, R2 (`units/l2b/table-objective-r1.md`), Luna checker PASS (`units/l2b/table-r1-checker-luna.md`); round 2: Luna checker FAIL 1, 9 and objective FAIL 2, 4, 9 on the two guide sites the transformation dropped, with F1, F2, R1, R2 (`units/l2b/table-objective-r2.md`); fix round 2 on `builder` (`conform-table-fix2-brief.md`); round 3 objective FAIL 4 on the record alone with F3, F4 (`units/l2b/table-objective-r3.md`); fix round 3 on `builder` (`conform-table-fix3-brief.md`: the sweep record, the anchored assertion, the citations); round 3 checker queued on Luna, then a narrow round-4 reading and landing | — |
| template | yes (successor note) | complete: the successor implementer found every row carried by the tree; template-obj-5 and fleet-F1 landed under the setup-proof ruling by `builder` (`briefs/followon/template-setup-brief.md`); fix round 1 on `builder` (`briefs/conform-template-fix1-brief.md`: the report brought to the landed tree, the setup row's control, the landed-tree gates, the ruling's rationale, the supersession sentence) from 15:55 UTC | round 1 (Grok-first): Luna distillate, objective FAIL 1, 3, 4 on the report's pre-landing state with F1–F3, R1, R2 (`units/l2b/template-objective-r1.md`), Luna checker PASS (`units/l2b/template-r1-checker-luna.md`); fix round 1 completed by the successor builder (`conform-template-fix1b-brief.md`, `units/l2b/template-fix1b-result.md`) with the landed-tree gates green; round 2 objective (Opus, record only) FAIL 1, 3 with R1 (the ruling's falsified clause, ruled 16:50 UTC: both shapes are audit-clean and the fleet keeps the one that runs the guard) and R2 (the plant exception → scaffold L3); fix round 2 on `builder` (`conform-template-fix2-brief.md`) closed the record; ACCEPT (`units/conform-template-audit-verdict.md`) | `7ba281d` |
| websocket | yes | complete by a direct `implementer` on Opus at 15:14 UTC (`units/l2b/websocket-implement-direct.md`); four published renames, no fleet source consumer; the closure was replaced by a bench lane at 16:22 UTC and re-staged at 16:50 | round 1 (Grok-first): Luna distillate (`units/l2b/websocket-r1-distillate-luna.md`), Luna checker PASS with F1–F4 (prose sites: `should`, `currently`, `now`, `new`) and two referrals (`units/l2b/websocket-r1-checker-luna.md`); objective (Opus, from the distillate) FAIL 4 on the record with F1 (`units/l2b/websocket-objective-r1.md`); fix round 1 on `builder` (`conform-websocket-fix1-brief.md`: the count, the header comments, the checker's four prose sites); round 2 objective PASS with F1, F2 on the record (`units/l2b/websocket-objective-r2.md`), closed by `conform-websocket-fix2-brief.md`; round 2 checker PASS (`units/l2b/websocket-r2-checker-luna.md`); ACCEPT (`units/conform-websocket-audit-verdict.md`) | `472381f` |
| form | yes | complete by a direct `implementer` on Opus at 15:17 UTC (`units/l2b/form-implement-direct.md`) | round 1 (Grok-first): Luna distillate, Luna checker PASS with F-SET-REFERENCES and F-DIRECTIONAL-REFERENCES, objective FAIL 4 on the record with F1–F3, R1, R2 (`units/l2b/form-objective-r1.md`); fix round 1 on `builder` (report only, `conform-form-fix1-brief.md`); round 2 objective (Opus) PASS with F4, F5 on the record, closed by `conform-form-fix2-brief.md`; successor rows in `briefs/followon/form-prose-brief.md`; ACCEPT (`units/conform-form-audit-verdict.md`) | `23c6fe0` |
| process | yes | complete in `layer2.L2a` (`wf_4b849c0d-459`, stopped 14:36 UTC); fix round 1 (`briefs/conform-process-fix1-brief.md`: the `processes/` move with `git mv` granted plus the objective lane's two readings) as a direct `implementer` on Opus from 14:38 UTC | round 1: checker PASS (twice); objective FAIL 2, 5 (two readings, `units/l2a/process-objective-r1a.md` and `-r1b.md`); round 2 (Grok-first): Luna distillate, objective PASS with F1–F4 outside the claims (`units/l2a/process-objective-r2.md`; F1 and F4 applied to the report, F2 and F3 carried), Luna checker FAIL none with F-SUP-CLEANUP (`units/l2a/process-r2-checker-luna.md`, carried by `briefs/followon/process-tests-brief.md`); ACCEPT (`units/conform-process-audit-verdict.md`) | `7fe522e` |
| reason | yes | complete in `layer2.L2a` (`wf_4b849c0d-459`, stopped); fix round 1 on `builder` (`briefs/conform-reason-fix1-brief.md`: the two missing failing-first proofs and four record findings) from 15:12 UTC; fix round 2 on `builder` (`briefs/conform-reason-fix2-brief.md`: the report and `sweeps.txt`) | round 1 (Grok-first): Luna distillate `units/l2a/reason-r1-distillate-luna.md`, Luna checker PASS, objective (Opus, from the distillate) FAIL 4 with F-1 to F-5 (`units/l2a/reason-objective-r1.md`); round 2: Luna distillate, objective FAIL none with F-6 to F-9 on the report (`units/l2a/reason-objective-r2.md`), Luna checker PASS with F-1, F-3, F-5, R-1 to R-4; ACCEPT (`units/conform-reason-audit-verdict.md`) | `803e4f6` |
| console | yes | complete in `layer2.L2a` (`wf_4b849c0d-459`, stopped); fix round 1 complete on `implementer` at 15:40 UTC (`briefs/conform-console-fix1-brief.md`; `units/l2a/console-fix1-result.md`); fix round 2 on `builder` (`conform-console-fix2-brief.md`: the old target words at five prose sites, the `selectWriter` sample strings, the word-boundary sweep) from 16:46 UTC | round 1 (Grok-first): Luna distillate `units/l2a/console-r1-distillate-luna.md`, Sonnet checker PASS, objective (Opus, from the distillate) FAIL 2, 3, 4, 5 with F1, F2 (`units/l2a/console-objective-r1.md`); round 2: Luna distillate (`units/l2a/console-r2-distillate-luna.md`), Luna checker PASS (`units/l2a/console-r2-checker-luna.md`), objective FAIL 3 with the sites and the sweep prescribed (`units/l2a/console-objective-r2.md`); round 3: checker PASS, objective FAIL 3 at one title with R3-B and F3-1 to F3-3 (`units/l2a/console-objective-r3.md`), fix round 3 on `builder`; round 4: checker PASS, objective FAIL 3 at `tests/setupServer.ts:38` with F4-1, F4-2 (`units/l2a/console-objective-r4.md`); the Orchestrator ruled the full hit list itself, fix round 4 on `builder` (`conform-console-fix4-brief.md`), round 5 is the Grok checker alone, then landing | — |
| middleware | yes (successor note) | complete by the successor implementer at 14:35 UTC; fix round 1 complete on `builder` in two parts (`briefs/conform-middleware-fix1-brief.md`, `-fix1b-brief.md`: every helper row's red reading, the EXDEV guard disclosure, `because`, the duplicate proof); `check` and `test` red on the standing condition (contract's landed discriminant beside database's unlanded tip) until database lands and the closure is re-staged | round 1 (Grok-first): Luna distillate, Luna checker FAIL 3 (ruled a pattern over-match on fixture literals), objective (Opus, from the distillate) FAIL 4, 9 with F1, F2 (`units/l2a/middleware-objective-r1.md`); round 2 through the same pipeline; closure re-staged 15:22 | — |
| database | yes (successor note with the contract, indexeddb, and sqlite consumer edits; `briefs/conform-database-brief-addendum.md`) | complete by a direct `implementer` on Opus, 15:42–16:19 UTC (every row applied or noop; consumer edits from contract, indexeddb, and sqlite taken first; the staged `@orkestrel/guide`'s member regex made database-subj-10 the carrier of a parity red the tip already had); `configs/browsers.ts` stale in the offline audit, repaired by the Orchestrator at 16:24 (manifest floors restored); middleware's round 2 and landing wait on it | round 1 (Grok-first): Luna distillate (its lane replaced the closure at 16:44, re-staged 17:09), Luna checker PASS (`units/l2a/database-r1-checker-luna.md`), objective FAIL 2, 9 on database-obj-6's three untranscribed fences with F1, R1 to R3 (`units/l2a/database-objective-r1.md`); fix round 1 on `builder` (`conform-database-fix1-brief.md`) from 17:14 UTC; round 2 after it | — |
| markdown | yes (Grok-first reconcile: Luna distillate `units/l2a/markdown-reconcile-luna.md`, marks applied by `instruments/apply-reconcile.mjs` from `briefs/marks-markdown.json`: no fold, no Orchestrator row, `MarkdownHandlers` → `MarkdownHandlerMap` breaking with no source consumer) | direct `implementer` on Opus from 17:42 UTC after the closure re-stage at 17:40 | round 1 through the Grok-first pipeline after the unit returns | — |
| pool | yes (Grok-first reconcile: Luna distillate `units/l2a/pool-reconcile-luna.md`, marks from `briefs/marks-pool.json`: no fold, no Orchestrator row, no breaking row) | direct `implementer` on Opus after the closure re-stage (17:36 UTC) | round 1 through the Grok-first pipeline after the unit returns | — |
| browser, guide, interpret, mcp, qualifier, rater, sea, server, terminal, workspace, lsp, queue, relation, scaffold | no | not started (guide carries the regex unit at `264a87f`) | — | L3 |
| brief, probe, program, worker, workflow | no | not started | — | L4 (`ALLOW_RED_TEST=probe`) |
| agent | no | not started | — | L5 |
| ollama, toolbox | no | not started | — | L6 |

Every other checkout is clean at its last accepted tip (see `../last/<pkg>.md`). The scaffold checkout
carries this folder only.

Breaking rows the refuters confirmed, with the real consumers the reconcile lanes found (a consumer edit is
owed only where a real consumer exists; vendored `guides/<dep>.md` mirrors refresh at re-pin, not by hand):

- contract-subj-1 (`ContractShape.type` → `category`): database (`src/core/helpers.ts:605`, `src/core/types.ts:464`), workflow (`tests/src/core/shapers.test.ts`), brief (`guides/brief.md:337-347`, `tests/src/core/shapers.test.ts:304`). Land contract first, pack it, re-stage those three, then carry the edit into each consumer's unit.
- indexeddb-subj-1 (`context.stores.open` rename): database at `src/browser/drivers/IndexedDBDriver.ts:748, :773`.
- msg (eight breaking rows), csv-subj-5 (`BlankPolicy` deleted, `blanks` boolean), test-obj-1 (`pressKeys` deleted): no source consumer in the fleet.
- Packages whose refuter marked breaking rows but whose reconcile lane has not yet swept consumers: database, sqlite, reason, console, terminal, program, qualifier, router, sea, brief, interpret, rater, server, websocket, guide, mcp, browser, middleware, workflow, agent, toolbox. The reconcile lane sweeps them when its layer workflow runs; respect layer order so a producer lands and re-stages before a consumer's unit starts.

## Bootstrap in a fresh session

1. Confirm every checkout is on the branch and clean: `for d in /home/user/fleet/*/ /home/user/scaffold; do git -C $d status --short | grep -v '^?? tmp/'; done` prints nothing. Confirm the closures are still staged: `node instruments/verify-stage.mjs <consumer>` exits 0 for a few consumers; if `node_modules` is gone, run `instruments/stage-closure.sh <consumer>` per checkout (it packs from committed tips and installs with `--no-save`).
2. Recreate the working paths: copy `rulings/*.json` to `/home/user/work/reports/`, `briefs/*` to `/home/user/scaffold/tmp/units/conform/`, `evidence/*` to `/home/user/work/evidence/`, `instruments/*` to a scratch directory, `ledgers/*` beside them. Recreate the `.reconciled` markers for the packages in `rulings/reconciled.txt` (`date -u > /home/user/work/reports/conform-<pkg>.reconciled`). Edit the constant paths at the head of `layer.workflow.js`, `refute.workflow.js`, `mkimplement.mjs`, `assemble-conform.mjs`, and `land-conform.mjs` if the scratch directory differs from the one they name.
3. Probe the benches: `agent --version` and a bounded `agent -p` round trip for Grok; `codex --version` (expected absent). Record both in the round's verdict file.
4. Keep the session awake: arm a `Monitor` over the workflow journals (results, boots, the string `session limit`) and a `send_later` check-in every 20 minutes. The container restarted whenever the session sat idle with background workflows running; a wake every few minutes kept it up. Every workflow resumes with `resumeFromRunId`; completed nodes replay from the journal, so a restart costs only the in-flight agents.
5. Expect the usage limit: at 8 to 12 concurrent agents it tripped after roughly two to three hours and reset about two hours later. Failed nodes re-run from cache on resume. Checkpoint-commit any checkout with implementer work before a long wait (`instruments/checkpoint.sh <pkg>` with a message file), so a killed writer never loses a tree.

## Procedure

Run each step with the Workflow tool (ultracode is on); the scripts are in `instruments/`.

### 1. Finish the rulings

`refute.workflow.js` with `args: {"packages": <ledgers/remaining.json>}` (eleven packages; the `missing`
field names the finder lanes still to run before the refuter). Split into two or three slices for
parallelism. Then `node assemble-conform.mjs <runId>` for each run writes `rulings/conform-<pkg>.json`.

### 2. Implement per layer

`layer.workflow.js` with `args: {"packages": [...]}` runs, per package: reconcile (skips when the
`.reconciled` marker exists), implement, blind objective lane plus checker, and up to two fix rounds with
a fresh audit after each. It returns a compact verdict per package (`ok`, `rounds`, `gates`, `breaking`,
`deviations`, `stopped`). Launch order and slices:

1. L0: `["contract","msg","test"]` (msg resumes on its committed partial tree under the successor brief; budget and sse skip straight to step 3).
2. L1: `["abort","csv","indexeddb","ndjson"]`, `["emitter","html","sqlite","tool","timeout"]`.
3. L2: `["database","process","reason","console"]`, `["middleware","table","template","websocket"]`, `["form","markdown","pool"]`.
4. L3: `["browser","guide","interpret","mcp"]`, `["qualifier","rater","sea","server"]`, `["terminal","workspace","lsp","queue","relation"]`, `["scaffold"]` (scaffold's own unit runs in `/home/user/scaffold`; its off-limits list is the vendored host inventory it publishes, and `host.json` regenerates on build).
5. L4: `["brief","probe","program","worker","workflow"]` (probe's `npm test` is red at the baseline on the standing Oxlint language-server arming failure ruled 2026-08-28; `land-conform.mjs` takes `ALLOW_RED_TEST=probe`).
6. L5: `["agent"]`. L6: `["ollama","toolbox"]`.

Two layer workflows at a time is the measured concurrency; the per-workflow cap is two agents. A producer
with a breaking row that has a real consumer lands and is packed (`pack-dep.sh <pkg>`) and re-staged into
that consumer (`stage-closure.sh <consumer>`) before the consumer's unit launches; the consumer's brief
then carries the producer's consumer edit as a standing row. Where no real consumer exists, layers can
overlap.

A reconcile lane marks a ruling FOLDED (duplicate carrier) or ORCHESTRATOR (dependency field, lockfile,
off-limits file, or another checkout) and appends its reasons to `ledgers/reconcile.md`; the Orchestrator
carries ORCHESTRATOR rows in step 4. A writer that stops on a row (name collision, off-limits file, a
consumer edit its own gates need) reports the deviation in the workflow result; rule it, amend the brief
as a successor file (`conform-<pkg>-brief-1.md` keeps the original), and re-run that package.

Audit verdicts: the objective lane and checker return per-claim verdicts and one terminal line. A round
passes on `PASS` from both. Reconcile findings the lanes disagree on yourself; a fix that adopts a lane's
prescription verbatim closes on your own verification without a fresh lane (`.claude/rules/quality.md`
§ Rounds and verdicts), and a seam stops at three rounds.

### 3. Land

`node land-conform.mjs <pkg>:<message-file> ...` runs the gate chain (`format:check`, `lint:check`,
`check`, `build`, `test`) in the checkout as the deciding run, renders the diff and status evidence into
`.orkestrel/campaign/conform/units/`, stages by path (never `git add -A`), commits with the message file,
and pushes with retry. Use it for budget and sse after their audit lanes return, and for every unit whose
layer verdict is `ok`. Commit author `git -c user.name=Claude -c user.email=noreply@anthropic.com`;
every message ends with the `Co-Authored-By` and `Claude-Session` trailers used in this branch's history
and carries no model identifier. Retain each unit's brief, report, verdict, and evidence under
`.orkestrel/campaign/conform/` as it lands (Dispatch anatomy § retention).

### 4. Orchestrator-owned units

- Fleet dependency pass: remove the unused `@vitest/browser-playwright` devDependency from every non-browser package (msg-obj-5 and the fleet pattern the refuter named), regenerate each lockfile with `npm install --package-lock-only` **after restoring that checkout's registry copy** (`instruments/restore-dep.sh`), then re-stage its closure. Networked; run it yourself, one checkout at a time, gates green before commit.
- Every ORCHESTRATOR row in `ledgers/reconcile.md` (database-subj-10 carries an `@orkestrel/guide` regex fix that gates a database follow-on on re-pin).
- The fleet-wide follow-ons in `ledgers/followons.md`: the `isBrowserVuePath` residue sweep, the `id` getter shape, and the per-package observations the writers recorded outside their rows.
- Rows that edit `package.json` `description` (contract-subj-6, abort-subj-4): grant the field in a successor brief or apply the edit yourself with the unit's landing.

### 5. Close the campaign

1. `instruments/wend-repack-restage.sh`: repack every tip, re-stage every consumer's closure, verify.
2. `instruments/fleet-gates.sh`: the authoritative serial gate sweep; read every row of `/home/user/work/fleet-gates.log`.
3. `node instruments/inventory2.mjs` for the fourth distributable inventory, and `scaffold audit --offline` in every target (expect zero drifted vendored files).
4. Set `../debrief.md`'s terminal line to `DEBRIEF: FOLDED` once every finding has a landed carrier, and write the round's verdict file `.orkestrel/campaign/conform/verdict.md` (the engine substitutions, the interruption ledger, the per-package terminal lines).
5. Run the retention prune from `.agents/skills/orkestrel-debrief/references/retention.md`: promotion record in the commit message, sweep `tmp/`, keep only what the procedure keeps.
6. Push every checkout. Report to the user with the publish wave still held (`ROADMAP.md` § 1 names the release decision).

## Skills

`orkestrel-falsify` (audit brief anatomy, verdict shape, the single terminal line, reconciliation
discipline); `orkestrel-debrief` (`references/retention.md` for the prune, `references/instruction-audit.md`);
`orkestrel-publish` only when the user asks for the release. `workflow-authoring` before editing a workflow
script.

## Constraints that bind every step

- One writer per checkout; read-only lanes carry no edit tools; no role commits, pushes, installs, or runs a discarding git command; the Orchestrator commits by path.
- Never edit a vendored file inside a target (`.claude/**`, `AGENTS.md`, `.agents/**`, `configs/**`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, the dependency guide mirrors `guides/<other-package>.md`); `scaffold repair` restores them.
- Never publish, never substitute a token or auth file, never read or copy a secret.
- The permission system denies discard-class git commands; undo an edit by editing.
- Instruments run from a scratch directory, never from a checkout's `tmp/` while a writer is live there.
- Never state a count in prose you write for the user or for a guide; name the members.

## Before anything: `main` moved

Read `../HANDOFF.md` § Divergence from `main` that must be resolved first. Scaffold, test, and form have
`origin/main` ahead of the branch (scaffold 0.0.60 and test 0.0.12 were published from `main` on
2026-09-02); merge `main` into those branches, re-pack, re-stage, and re-pin before any unit in this
round is packed into a consumer or landed on top of a stale tip.
