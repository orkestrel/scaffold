Swept all 35 files under `.orkestrel/debrief/record/`. Evidence only; no rulings.

## 1. Deviations

- `a6-brief.md:33` — “If the ripple exceeds the owned list: STOP-REPORT the measured list — do not delete, do not widen scope.” — A6 contract; executed.
- `a6-report.md:44` — “Per the brief: reported, not deleted, scope not widened.” — A6 recovery for the tail-field stop-report: `ApplicationTail.terminal` kept.
- `a6-report.md:89` — “measured, exceeds owned list, stop-reported, field retained.” — Same A6 ruling restated as criterion 3.
- `a6-report.md:123` — “Deviation: criterion 5 cannot close from the owned list” — A6: `app:browser` red in unowned `ContentPane.test.ts`.
- `a6-report.md:133` — “I did not edit it: unowned files are report-only.” — Writer stopped; no recovery in this report.
- `a6-audit-brief.md:16` — “At bdb5d7c: app:browser 452/452” — Later A6 chain shows those two failures gone after serial integration (not named in `a6-report.md`).
- `a9-report.md:28` — “Deviations: none stopping the unit; the ollama-lane surprise reported, not stopped on.” — A9: agent/ollama lane emitted zero transcript frames; unit continued.
- `a11-refilm-record.md:28` — “Recorded against the settlement-card capability: whether the agent executor should emit a settlement observation like the CLI executors do is a design question for a later change” — Recovery for the A9/A11 ollama surprise: scoped assertions; finding retained.
- `a10-report.md:7` — “Honest deviation: the codex sandbox denied localhost (EPERM binds; daemon unreachable), so its dynamic proofs could not run” — A10 Sol dispatch blocked.
- `a10-report.md:12` — “Orchestrator integration (network real):” — A10 recovery: Orchestrator ran the portable tarpit proof and cold measurement outside the sandbox.
- `a-plan.md:88` — “The substitute Opus writer's deviation-stop (wrote nothing, reported the foreign edits with timestamps and the live PID) is the behavior that contained this” — A3: killed `codex exec` still writing; substitute stopped.
- `a-plan.md:89` — “A3's product was verified against its own criteria and adopted at 156c808 with two findings carried.” — A3 recovery.
- `a11-gate-sweep.md:3` — “Sweep 1, supervisor at 182408f (clean tree): GATES: RED 1.” — A11 verifier stop on `format:check`.
- `a11-gate-sweep.md:15` — “Fix: README converged by oxfmt (padding-only, 25 lines re-padded), committed at 6780987” — A11 recovery.
- `a11-refilm-record.md:26` — “the film initially asserted `Completed:` unconditionally and timed out on the qwen lane” — A11 first film attempt; scoped to lanes that emit a settlement record.
- `a7-report.md:30` — “Deviations: none.” — A7: no stop-and-report.
- `a8-report.md:28` — “Deviations: none.” — A8: no stop-and-report.
- `a6-report.md:46` — “Brief item 5, second branch: **not triggered.**” — A6 closure-barrier STOP-REPORT path not taken.

## 2. Audit rounds

- `a6-audit-verdict.md:19` — `AUDIT: FAIL 1, 7` — Claims 1 and 7 REFUTED (clean-end join; guide false). Closed: `a6-fix-review-verdict.md:31` “Sol audit FAIL 1,7 → fix → Opus REVIEW: PASS → micro round → A6 ACCEPTED.”
- `a6-fix-review-verdict.md:3` — `REVIEW: PASS — all five claims CONFIRMED with file:line evidence.` — A6-fix; S1–S6 landed at `8d9c325` (not a zero-finding round).
- `a7-audit-verdict.md:4` — `AUDIT: PASS — all eight claims CONFIRMED with file:line evidence.` — No FAIL claims; no fix round. Nick on claim 1 recorded as not a defect (`a7-audit-verdict.md:8`).
- `a8-audit-verdict.md:4` — `AUDIT: PASS — all eight claims CONFIRMED with file:line evidence.` — No FAIL claims; no fix round; no nicks in the verdict. **Round with zero substantive findings.**
- `a8-probe-verdict.md` — no `AUDIT:` / `REVIEW:` / `REVERIFY:` line. Probe rulings only (core-diagnostics STRUCK).
- `a9-audit-verdict.md:4` — `AUDIT: FAIL 2,3,5 — six confirmed` — Claims 2, 3, 5 REFUTED (byte-equality; regression pin; aria-expanded lag). Nine claims in the brief (`a9-audit-brief.md:33-68`).
- `a9-audit-verdict.md:14` — `REVERIFY: FAIL 3 — 2 and 5 closed` — 2 and 5 closed in round 2; 3 held.
- `a9-audit-verdict.md:19` — “Residual b6737f7: fixture is the captured chunk with its trailing newline, node asserted untrimmed.” — Claim 3 closed after the residual, “no third bench round.”
- `a10-review-verdict.md:3` — `REVIEW: FAIL 3,4 — claims 1, 2, 5 CONFIRMED` — 3 (keep_alive bind) and 4 (README/guide) REFUTED.
- `a10-review-verdict.md:7` — “Refuted and fixed at 182408f, each on the reviewer's own prescription” — Claims 3 and 4 closed at `182408f`.
- `a-acceptance.md:23` — “three FAIL verdicts (A6 Sol 1,7; A9 Sol 2,3,5; A10 Opus 3,4) all closed on the auditor's prescription” — Campaign-level close of the three FAIL rounds.

## 3. Durations and caps

- `a-plan.md:5` — “a fast launch failure lands in `TaskSnapshot.result` within 30ms” — Probe timing used as plan ground.
- `a-plan.md:26` — “the E1 film showed the 120s abort NOT landing as a failed task” — Estimated/filmed contradiction vs later probe.
- `a-plan.md:77` — “caps sized from observed high marks with stated slack.” — Cap law.
- `a-plan.md:92` — “npm login URLs expire unclicked (~10-15 min)” — Observed login-URL lifetime.
- `a-plan.md:98` — “will click within ten minutes.” — Cap on when to launch login.
- `a-design-sol.md:74` — “supervisor currently elects its 120-second default” — Pre-A10 timeout.
- `a-design-sol.md:78` — “the default is derived from an observed cold-load high mark plus full-turn allowance and explicit slack” — Estimate rule for A10.
- `a-design-sol.md:79` — “A cap based only on load time will reproduce the defect during generation.” — Cap risk.
- `a-design-sol.md:141` — “Timeout and verification caps must be based on observed high marks with stated allowances and slack.” — Same law, Sol lane.
- `a-design-planner.md:40` — “`OllamaOptions.timeout` exists and defaults to `120_000`” — Provider default.
- `a-design-planner.md:185` — “`test:service:ollama` shows a first-call cold load completing past the old 120s ceiling” — Planned observed bar.
- `a6-report.md:57` — “TimeoutError: locator.waitFor: Timeout 30000ms exceeded.” — Observed test cap on the red journey.
- `a6-audit-verdict.md:5` — “was cap-killed at the Bash tool's 10-minute foreground ceiling mid-read” — Observed vs 10-minute exec cap; relaunch completed.
- `a8-brief.md:16` — “the task fails in ~30ms” / `a8-brief.md:18` — “the task fails at exactly 120s” — Probe timings copied into the A8 brief.
- `a8-probe-verdict.md:9` — “~120.5s — the @orkestrel/ollama default deadline (timeout: 120_000” — Observed vs configured timeout.
- `a8-probe-verdict.md:13` — “warm daemon answers in <1s” / “daemon-down fails in ~30ms” — Observed controls.
- `a9-brief.md:45` — “qwen3.5:2b answers in under a second” — Environment estimate for capture.
- `a10-brief.md:16` — “defaults `timeout` to 120_000ms” — Pre-change cap.
- `a10-brief.md:47` — “Set the default timeout from the observed cold high mark plus explicit slack (at minimum 3x the cold observation, floor 300_000ms)” — Estimate formula.
- `a10-brief.md:52` — “the task settles failed at ~that deadline, not at 120s” — 2000ms proof vs old 120s.
- `a10-report.md:9` — “Chosen default 360_000ms from the censored >120s loaded-cold bound.” — Observed choice vs the brief’s 3× idle-cold / 300s floor.
- `a10-report.md:19` — “task settles failed at the 2s configured deadline within [1750,5000)ms” — Observed proof window.
- `a10-report.md:22` — “completed in 11,939ms (snapshot timestamps); warm <1s; corroborates Sol's 12,897ms /api/chat observation; E1's >120s stays the loaded censored bound.” — Observed cold/warm vs E1 loaded bound.
- `a10-review-brief.md:26` — “the deadline proof settles at the configured 2s within [1750,5000)ms; idle cold run 11,939ms under defaults.” — Same measurements in the review brief.
- `a10-review-verdict.md:23` — “the proof's cap raised to 20s for loaded suites” — Test cap change.
- `a10-evidence.md:40` — “past the provider's former fixed 120,000ms cutoff” / `a10-evidence.md:45` — `OLLAMA_TIMEOUT = 360_000` — Landed constant vs former cutoff.
- `a10-evidence.md:550` — `expect(elapsed).toBeGreaterThanOrEqual(1_750)` / `toBeLessThan(5_000)` — Committed timing window.
- `a-acceptance.md:12` — “cold run finished on film under the 360s default (A10).” — Accepted observed default.
- `a11-refilm-record.md:13` — “the qwen lane ran against a genuinely cold daemon under the new 360s default and finished on film; the former fixed 120s constant no longer exists.” — Film vs old cap.

## 4. Retained findings

- `a-acceptance.md:25` — “Findings ledger for future rounds: agent lane emits no settlement observation; Failed/Quarantined bounded at the card but surrogate-pair cut nick remains; live-stream-based deadline proof (S7); keep duration grammar unvalidated (S3).” — Campaign roll-up.
- `a7-report.md:27` — “Recorded out of scope, against the settlement-card capability: Failed: ${message} and Quarantined: ${reason} carry provider-controlled strings unbounded through the same door.” — Settlement-card.
- `a7-audit-verdict.md:8` — “RECORDED as a quality nick against the settlement-card capability, to travel with the unbounded Failed:/Quarantined: strings in a later bounded-voices change.” — Settlement-card (surrogate cut).
- `a7-audit-brief.md:34` — “the `settled`/`FINISHED`-style fixture duplication is carried by a later consolidation micro.” — Fixture consolidation (capability not named).
- `a8-report.md:17` — “adding that reading to contrast.test.ts recorded as a later-change candidate.” — Contrast proof; capability unnamed.
- `a10-review-verdict.md:19` — “S3 (keep grammar deferred to the provider) and S7 (live-stream-based proof instead of raised APP_LIMIT) recorded, not acted — S7 travels to the settlement-card/proof capability for a later change.” — S3 keep-grammar; S7 proof.
- `a11-refilm-record.md:28` — “Recorded against the settlement-card capability: whether the agent executor should emit a settlement observation like the CLI executors do is a design question for a later change, not a defect in either surface.” — Settlement-card / agent executor.
- `a-plan.md:35` — “`createScratch` NOT adopted … recorded, not deferred.” — Exclusion, not a future-round finding.
- `a-design-planner.md:108` — “Recorded against the capability, not deferred.” — Same scratch exclusion.

## 5. Instruction friction

- `a10-brief.md:85` — “The codex sandbox denies network beyond localhost; everything here is localhost.” — Dispatch fact that Sol’s run then falsified.
- `a10-report.md:7` — “the codex sandbox denied localhost (EPERM binds; daemon unreachable), so its dynamic proofs could not run” — Failed A10 proofs.
- `a10-report.md:32` — “network-dependent proofs never route into a bench sandbox; the brief's environment claim was the Orchestrator's unverified assumption.” — Lost A10 dynamic proofs attributed to the unit brief’s environment sentence, not to a named rule, role charter, skill, or orchestration-contract clause.
- `a10-review-brief.md:21` — “`.orkestrel/supervisor/a10-report.md` (Sol's sandbox-block deviation, the Orchestrator's integration rulings).” — Same event cited from a path outside `record/`.
- `a6-audit-verdict.md:6` — “a transport mistake, not a dark bench; one relaunch via background task completed cleanly.” — Lost first A6 audit exec attributed to the Bash 10-minute cap, not instruction wording.
- `a11-gate-sweep.md:6` — “the writer's own pre-commit gate read piped format:check through tail -1 and saw only the timing line — the pipeline-masking failure this campaign already recorded once.” — Lost green self-report attributed to piping, not to a rule/charter/skill/contract sentence.
- `a-plan.md:82` — “A killed `codex exec` is not dead until its process TREE is dead” — A3 wrong turn attributed to process-tree kill behavior, not instruction wording.

No sentence in the 35 files names the wording of a rule, role charter, skill, or the orchestration contract as the cause of lost time, a failed dispatch, or a wrong turn.

## 6. Re-runnability

| Unit | Brief | Report | Verdict | Triad under `record/` |
| --- | --- | --- | --- | --- |
| A6 | `a6-brief.md` (+ `a6-fix-brief.md`, `a6-audit-brief.md`, `a6-fix-review-brief.md`) | `a6-report.md` (+ `a6-fix-evidence.md`) | `a6-audit-verdict.md`, `a6-fix-review-verdict.md` | yes |
| A7 | `a7-brief.md` (+ `a7-audit-brief.md`) | `a7-report.md` | `a7-audit-verdict.md` | yes |
| A8 | `a8-brief.md` (+ `a8-audit-brief.md`) | `a8-report.md` | `a8-audit-verdict.md` (+ `a8-probe-verdict.md`, no `AUDIT:`/`REVIEW:`/`REVERIFY:` line) | yes |
| A9 | `a9-brief.md` (+ `a9-audit-brief.md`) | `a9-report.md` | `a9-audit-verdict.md` | yes |
| A10 | `a10-brief.md` (+ `a10-review-brief.md`) | `a10-report.md` (+ `a10-evidence.md`) | `a10-review-verdict.md` | yes |
| A11 | none | none named report (`a11-refilm-record.md`, `a11-gate-sweep.md` exist) | none | no |

Paths cited that are **not** under `.orkestrel/debrief/record/`:

- `a6-brief.md:6` — “`/workspace/supervisor` from **311c9b5**”
- `a6-report.md:9` — “`/workspace/supervisor/app/browser/controllers/Operator.ts`” (and seven sibling `/workspace/supervisor/…` rows)
- `a6-audit-brief.md:72` — “`/workspace/supervisor/tmp/codex/`”
- `a6-audit-verdict.md:3` — “Journal: tmp/codex/a6-audit.log”
- `a6-fix-review-brief.md:13` — “`/home/user/scaffold/tmp/alignment/a6-fix-evidence.md`”
- `a7-audit-verdict.md:3` — “Journal: tmp/codex/a7-audit.log”
- `a7-audit-brief.md:72` — “`/workspace/supervisor/tmp/codex/`”
- `a8-brief.md:23` — “`.orkestrel/supervisor/a8-probe-verdict.md`”
- `a8-audit-brief.md:27` — “`.orkestrel/supervisor/a8-probe-verdict.md`”
- `a8-audit-verdict.md:3` — “Journal: tmp/codex/a8-audit.log”
- `a9-brief.md:47` — “`tmp/a8-probe/probe.mjs`” / “scratch under `tmp/`”
- `a9-brief.md:62` — “a scratch capture script under `tmp/a9/`”
- `a9-report.md:15` — “tmp/a9/frames-claude.jsonl”
- `a9-report.md:21` — “tmp/a9/guide.patch.json”
- `a9-audit-brief.md:17` — “`tmp/a9/frames-{agent,claude,codex,cursor}.jsonl`”
- `a9-audit-brief.md:73` — “`/workspace/supervisor/tmp/codex/`”
- `a10-brief.md:20` — “`.orkestrel/supervisor/a8-probe-verdict.md`”
- `a10-brief.md:43` — “`tmp/a10/ollama.log`”
- `a10-brief.md:45` — “`tmp/a8-probe/probe.mjs`” / “`tmp/a10/`”
- `a10-brief.md:53` — “`tmp/a8-probe/tarpit.mjs`”
- `a10-report.md:3` — “journal tmp/codex/a10.log”
- `a10-review-brief.md:14` — “`/home/user/scaffold/tmp/alignment/a10-evidence.md`”
- `a10-review-brief.md:21` — “`.orkestrel/supervisor/a10-report.md`”
- `a11-refilm-record.md:6` — “13 frames under the session scratchpad (e1r-*)”
- `a-design-planner.md:196` — “the same temporary `~/.codex/config.toml` model pin”
- `a-design-sol.md:16` — “`/workspace/middleware/package.json`”
- `a-design-sol.md:116` — “generated evidence under the git-ignored `tmp/` tree”
- `a0-absorb-brief.md:20` — “`/tmp/claude-0/-home-user/6d2dc0ef-4f55-5fcd-ae2e-97129e7119cf/scratchpad/fleet-target/<name>/`”
- `a-acceptance.md:29` — “Campaign folder pruned in the following commit; this record and every brief, report, and verdict remain recoverable by hash.” — `.orkestrel/supervisor/` cites above are to a pruned tree.

**Unknowns:**

- Whether `a11-refilm-record.md` / `a11-gate-sweep.md` are A11’s report/verdict (no files named `a11-brief`, `a11-report`, or `a11-*-verdict`).
- A6 ContentPane recovery command/diff is not in `a6-report.md`; only the later `452/452` count in `a6-audit-brief.md`.
- A9 round-2 journal path is unnamed (session id only).
- `a8-probe-verdict.md` has no `AUDIT:`/`REVIEW:`/`REVERIFY:` terminal line.
- Contrast later-change (`a8-report.md:17`) has no named capability.
- No Q5 sentence ties lost time or a failed dispatch to a rule, charter, skill, or orchestration-contract wording; the A10 case names a unit brief.
- Cited `.orkestrel/supervisor/*` and `tmp/**` / scratchpad paths were not opened (off-limits). Whether those files still exist is unverified from `record/` alone.
