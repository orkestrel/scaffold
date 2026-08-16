# Debrief ledger — A-campaign (supervisor alignment + E1 fixes)

Working ledger for the `/orkestrel-debrief` round over the campaign accepted at scaffold
`278f3e0` and pruned at `21f3232`. Record recovered by hash into `record/` (35 files).
Ephemeral: every surviving truth folds into its destination; the folder is deleted only on
the owner's explicit go-ahead.

## Step 1 — scope and gather

- Campaign under debrief: A-campaign — ten exit items, units A6-A11, acceptance
  `record/a-acceptance.md`; middleware 0.0.12 and @orkestrel/supervisor 0.0.1 published.
- Record: 35 files recovered via `git show 278f3e0:<path>` into `record/`. Verified by
  listing; all A6-A11 briefs, reports, and verdicts present.
- Produced fresh: field pass of the published artifacts (step 2); bench probes; the two
  instruction-audit lanes (step 5); the record sweep (Grok absorption).

## Step 2 — field evidence (published-artifact pass)

Consumer: fresh npm project in session scratchpad; `npm install @orkestrel/supervisor@0.0.1
@orkestrel/middleware@0.0.12` → "found 0 vulnerabilities". Module-cycle law: import each
published entry point and read an export from it. All eight probes PASS, verbatim:

```text
CJS @orkestrel/supervisor: 71 exports; typeof createSupervisor = function; first keys: DatabaseBriefStore, DatabaseSupervisorStore, ExecutorManager, FunctionExecutor, JOURNAL_AGE, JOURNAL_BYTES
CJS @orkestrel/supervisor/server: 15 exports; typeof createClaudeProvider = function; first keys: CODEX_CLIENT_VERSION, ClaudeProvider, CodexProvider, CursorProvider, PROVIDER_EVIDENCE, PROVIDER_GRACE
CJS @orkestrel/middleware: 73 exports; typeof createMemorySessionStore = function; first keys: DEFAULT_BEARER_HEADER, DEFAULT_BEARER_SCHEME, DEFAULT_CLUSTER, DEFAULT_COEP, DEFAULT_COMPRESSION_ENCODINGS, DEFAULT_COMPRESSION_THRESHOLD
CJS @orkestrel/middleware/server: 40 exports; first keys: DEFAULT_CONTENT_TYPE, DEFAULT_MULTIPART_FIELD, DEFAULT_MULTIPART_FIELDS, DEFAULT_MULTIPART_FILE, DEFAULT_MULTIPART_FILES, DEFAULT_MULTIPART_TOTAL
CJS field probe: PASS
ESM @orkestrel/supervisor: 71 exports; typeof createSupervisor = function; first keys: DatabaseBriefStore, DatabaseSupervisorStore, ExecutorManager, FunctionExecutor, JOURNAL_AGE, JOURNAL_BYTES
ESM @orkestrel/supervisor/server: 15 exports; typeof createClaudeProvider = function; first keys: CODEX_CLIENT_VERSION, ClaudeProvider, CodexProvider, CursorProvider, PROVIDER_EVIDENCE, PROVIDER_GRACE
ESM @orkestrel/middleware: 73 exports; typeof createMemorySessionStore = function; first keys: DEFAULT_BEARER_HEADER, DEFAULT_BEARER_SCHEME, DEFAULT_CLUSTER, DEFAULT_COEP, DEFAULT_COMPRESSION_ENCODINGS, DEFAULT_COMPRESSION_THRESHOLD
ESM @orkestrel/middleware/server: 40 exports; first keys: DEFAULT_CONTENT_TYPE, DEFAULT_MULTIPART_FIELD, DEFAULT_MULTIPART_FIELDS, DEFAULT_MULTIPART_FILE, DEFAULT_MULTIPART_FILES, DEFAULT_MULTIPART_TOTAL
ESM field probe: PASS
```

No new field pass of the running app this round: the A11 four-lane re-film (13 frames,
real browser, cheapest live models) is the campaign's own live-use evidence and closed
every E1 finding on film (`record/a11-refilm-record.md`).

## Bench liveness at dispatch (this round)

- `codex-cli 0.147.0`; `codex login status` → "Logged in using ChatGPT"; round-trip
  `codex exec … "Reply with the single word ALIVE."` → exit 0, answer `ALIVE`
  (`tmp/codex/probe-last.md`). Codex Sol bench LIVE.
- `agent --version` → `2026.08.11-e8db854`; round-trip same prompt → exit 0, answer
  `ALIVE` (`tmp/cursor/probe.log`). Cursor Grok bench LIVE.
- Routing: record sweep → Grok (ladder step 1, no substitution); objective audit lane →
  Sol `analyst` via journaled `codex exec`; subjective lane → native Opus `planner`.

## Candidate findings (pre-reconciliation; buckets provisional)

Numbered F-rows. Evidence quotes verified against `record/` where cited. The two blind
instruction-audit lanes and the Grok sweep run without seeing this list; reconciliation in
step 6 merges their findings into this sequence.

- **F1 — orphaned bench process tree.** A killed `codex exec` is not dead until its
  process tree is dead. Evidence: `record/a-plan.md:82` "A killed `codex exec` is not dead
  until its process TREE is dead: the `codex-code-mode-host`"; the containment that
  worked: `record/a-plan.md:88` "The substitute Opus writer's deviation-stop (wrote
  nothing, reported the foreign edits with timestamps and the live PID) is the behavior
  that contained this". Canon today: orchestration.md "Confirm dead before relaunching"
  names processes and kill-by-PID but not the surviving child tree of a killed exec.
  Provisional bucket: process refinement (orchestration contract, one sentence in
  "Confirm dead before relaunching").
- **F2 — login launched before the approver is present.** The supervisor publish's first
  login/authorization chain sat unclicked overnight; the authorization 404'd and the
  session credential expired (`npm whoami` → E401); a fresh two-click flow succeeded next
  day. The campaign itself recorded the lifetime: `record/a-plan.md:92` "npm login URLs
  expire unclicked (~10-15 min)" and `record/a-plan.md:98` "will click within ten
  minutes." Canon today covers credential re-probe ("Re-probe `whoami` immediately before
  opening the window") and last-URL-in-log-order, but no law says to launch the login only
  on the user's stated readiness to click within the URL's lifetime. Provisional bucket:
  process refinement (orchestration contract, "Reaching the approval").
- **F3 — bench sandbox denies loopback binds; test address family.** Evidence:
  `record/a10-brief.md:85` "The codex sandbox denies network beyond localhost; everything
  here is localhost." versus `record/a10-report.md:7-9` "the codex sandbox denied
  localhost (EPERM binds; daemon unreachable), so its dynamic proofs could not run; its
  ::1:11434 tarpit design also failed here on EAFNOSUPPORT (no IPv6)". Two carriers:
  (a) `codex.md` sandbox section gains the loopback-bind denial so dynamic listener proofs
  route to the Orchestrator or a network-capable native agent; (b) tests rule gains the
  address-family law — bind test fixtures to `127.0.0.1` on an ephemeral port, never `::1`
  and never a fixed port. Provisional buckets: charter refinement + rule addition.
- **F4 — pipeline masking of gate output.** `cmd | tail` reports the pipeline's last exit
  and hides the failure lines; bit twice in one campaign. Evidence:
  `record/a11-gate-sweep.md:6` "the writer's own pre-commit gate read piped format:check
  through tail -1 and saw only the timing line — the pipeline-masking failure this
  campaign already recorded once." Caught by the independent verifier as
  `record/a11-gate-sweep.md:3` "GATES: RED 1." Provisional bucket: rule addition
  (quality.md, one law: read a gate from its own exit code and complete output, never
  through a truncating pipe).
- **F5 — harness foreground cap.** Foreground Bash in this harness is hard-capped at 10
  minutes regardless of the timeout parameter; long commands must be background-launched.
  Evidence: `record/a6-audit-verdict.md:5` — the first A6 audit exec "was cap-killed at
  the Bash tool's 10-minute foreground ceiling mid-read"; ruled there "a transport
  mistake, not a dark bench; one relaunch via background task completed cleanly"
  (`record/a6-audit-verdict.md:6`). Provisional bucket: harness bridge (CLAUDE.md), since
  the cap is Claude-Code-specific.
- **F6 — mutation probe binds a prescription-verbatim fix.** Used three times (A6
  re-check, A9 trim pin, A10 keepAlive): when a fix follows the auditor's prescription
  verbatim, a mutation probe (revert the load-bearing line, watch the pin fail, restore)
  bound the fix without a further bench round, and the fix rounds closed cleanly.
  Provisional bucket: rule addition (quality.md Falsification), codifying the success.
- **F7 — `npm pkg set` writes the wrong section.** `npm pkg set` created a spurious
  runtime `dependencies` entry when the real pin was `devDependencies`; caught and
  reverted same turn. Provisional bucket: dropped or one-line note — the blast-radius law
  already forces the check that caught it. Rule on the record at reconciliation.
- **F8 — falsifiable-claims briefs produced zero churn.** Every audit round in the record
  either passed with evidence or failed on defects the fix round confirmed real; no
  manufactured findings, no churned rounds. Provisional bucket: stays as-is with reason
  (the Falsification law and `orkestrel-falsify` shapes are doing their job); record the
  success.
- **F9 — capture instruments are session-ephemeral; A11 has no brief.** Evidence:
  `record/a11-refilm-record.md:6` "13 frames under the session scratchpad (e1r-*)"; the
  sweep's re-runnability table: A6-A10 each have their brief/report/verdict triad under
  `record/`, A11 has "none" — no `a11-brief`, no named report, no verdict
  (`sweep-distillate.md` §6). The re-film script and frames live only in the session
  scratchpad and tmp; the unit cannot be re-run from the record alone. The same class
  covers `tmp/a9/frames-*.jsonl` cited by `record/a9-audit-brief.md:17`. Provisional
  bucket: process refinement — a capture unit's instrument (the script that produced the
  portfolio) is acceptance evidence and is committed with the record; frames may stay
  ephemeral once the record transcribes them, because the committed instrument re-produces
  the film. Route per the third question in instruction-audit.md.
- **F10 — unverified brief claim inverted by the unit.** A10's brief asserted loopback was
  permitted (quote under F3) — an Orchestrator assumption stated as fact; the existing
  "take every measurement under the conditions the unit will run in" check was violated,
  not missing. Provisional bucket: stays as-is (law exists; F3 lands the fact so no future
  brief needs to re-measure it); the violation is recorded here.
- **F11 — retained product findings from the campaign.** Evidence:
  `record/a-acceptance.md:25` "Findings ledger for future rounds: agent lane emits no
  settlement observation; Failed/Quarantined bounded at the card but surrogate-pair cut
  nick remains; live-stream-based deadline proof (S7); keep duration grammar unvalidated
  (S3)." Plus two rows the sweep found with no named capability:
  `record/a7-audit-brief.md:34` (settled/FINISHED fixture consolidation micro) and
  `record/a8-report.md:17` (contrast reading "recorded as a later-change candidate").
  Carrier: supervisor keeps `ROADMAP.md` — these rows land there, each named to the
  capability that owns it (settlement-card capability for the first three; the two
  unnamed rows get their capability named as they land). Provisional bucket: roadmap.

## Step 3 — artifact audits (layer/boundary/promotion)

Rows over what the A-campaign touched. Each ends implement, repair, retain, or exclude.

- **L1 — agent policy knobs sit in the app layer.** `APP_AGENT_URL/TIMEOUT/KEEP` are
  parsed in `app/core` policy and translated at composition
  (`app/server/ApplicationRuntime.ts:161-171` spreads `url` and maps `keep` → `keepAlive`
  onto `@orkestrel/ollama`'s `createOllama`). Policy above, mechanism below; no src edit
  was needed. **Retain.**
- **L2 — campaign UI fixes stayed in `app/browser`.** A6's drain fix lives in
  `app/browser/controllers/Operator.ts`; nothing product-shaped leaked into published
  `src`. Field pass confirms the published entry points expose only `src/core` and
  `src/server` (71 + 15 exports). **Retain.**
- **L3 — no ecosystem duplication introduced.** The runtime composes
  `@orkestrel/database`, `@orkestrel/middleware`, `@orkestrel/workflow`,
  `@orkestrel/ollama` primitives directly (`ApplicationRuntime.ts:16-22` imports); the
  keep→keepAlive rename is a boundary translation, not a wrapper. **Retain.**
- **P1 — loopback-port helper promotion candidate.** Supervisor exports
  `reserveLoopbackPort` (`tests/setupApplicationServer.ts:65`, reserve-then-release for a
  child process); middleware binds-and-keeps inline (`tests/setupServer.ts:390`,
  `server.listen(0, '127.0.0.1', …)` inside its fixture server). Two consumers, two
  different semantics — a shared helper would either rename one shape or force both
  through the wrong one. **Retain locally; re-open only if a third package needs the
  reserve-then-release shape.**

## Step 4 — process retrospective

Source: `sweep-distillate.md` (Grok absorption over all 35 record files, dispatched on a
live-probed bench; brief at `sweep-brief.md`). Rulings are the Orchestrator's.

- **Deviation protocol worked every time it fired.** A6's writer stop-reported an unowned
  red instead of widening scope ("I did not edit it: unowned files are report-only",
  `record/a6-report.md:133`); A3's substitute writer stopped on foreign edits from the
  orphaned exec (`record/a-plan.md:88`); A10's Sol stop-reported the sandbox block
  honestly and the Orchestrator ran the network proofs (`record/a10-report.md:12`).
  Success: the protocol as written contained every divergence. No canon change.
- **Audit rounds were all substantive.** Three FAIL verdicts (A6 1,7; A9 2,3,5; A10 3,4)
  each named real defects the fix rounds confirmed and closed; the two PASS rounds
  (A7, A8) carried per-claim evidence; the one all-confirmed round (A8) had falsifiable
  behavioral claims backed by an earlier probe verdict. Zero churned rounds, zero
  manufactured findings (carries F8).
- **Cap and estimate law held.** A10's 360_000ms default came from the censored >120s
  loaded-cold bound, above the brief's 300_000ms floor (`record/a10-report.md:9`,
  `record/a10-brief.md:47`); the deadline proof asserted its committed window
  (`record/a10-evidence.md:550`). No estimate-only cap in the record. No canon change.
- **Instruction friction at the wording level: none.** The sweep's negative result,
  verbatim: "No sentence in the 35 files names the wording of a rule, role charter,
  skill, or the orchestration contract as the cause of lost time, a failed dispatch, or a
  wrong turn." Every loss traced to environment facts and mechanics — the sandbox bind
  denial (F3), the pipeline mask (F4), the 10-minute foreground cap (F5), the orphaned
  process tree (F1) — not to instruction text. The blind lanes rule on the instruction
  set independently.
- **Absorbed versus dispatched.** The Orchestrator absorbed A10's dynamic proofs after
  the sandbox block — correct under the network-work law; the error was upstream, the
  brief's unverified environment claim (F10). Nothing dispatched should have been owned,
  and nothing owned should have been dispatched, on this record.

## Step 6 — reconciliation

Inputs: candidate rows F1-F11 (above), Sol objective lane 9 findings
(`instr-audit-objective-verdict.md`), Opus subjective lane 12 findings
(`instr-audit-subjective-verdict.md`), sweep evidence (`sweep-distillate.md`). Both lanes
ran blind on one brief; every load-bearing quote was re-verified against sources before
these rulings. R-rows are final; each names its carrier.

- **R1 (Opus-1 + Sol-1) — audit lanes collapsed; checker never dispatched.** Convergent
  finding; divergent fixes (Sol: enforce three artifacts; Opus: triggered second lane).
  RULED for the triggered shape: five consecutive units ran one non-writing lane plus
  cross-engine fix rounds, caught three real FAIL verdicts, and lost nothing — the
  record falsifies the universal mandate's fit, not the units. Carrier: orchestration.md
  step 5 rewrite + adversarial-pass scope sentences + checker.md trigger. Land.
- **R2 (Sol-2 + Opus-7 + F1) — process-tree death.** Convergent. Carrier: orchestration.md
  "Confirm dead before relaunching" gains the `ps --ppid` walk, the
  `codex-code-mode-host` check, and the owned-file-mtime check before a substitute
  writer. Land.
- **R3 (Opus-4 + Sol-3 + F3a) — codex sandbox loopback ambiguity.** Convergent. Carrier:
  codex.md sandbox section, Opus's two-sentence fix (own loopback, EPERM binds, no IPv6).
  Land.
- **R4 (F3b) — test address family.** Carrier: tests.md one law — fixtures bind
  `127.0.0.1` ephemeral, never `::1`, never a fixed port. Land.
- **R5 (Opus-5 + Sol-4) — integration became unbriefed implementation.** Convergent,
  complementary fixes merged: integration limited to exact patches and mechanical
  conflict resolution; network-work sentence names the native `implementer`/`builder`;
  acceptance law — an Orchestrator-written part is briefed, owned, and audited by the
  engine it does not share. Carrier: orchestration.md steps 3-4 + Launching + Acceptance
  laws. Land.
- **R6 (Opus-6 + Sol-5 + F9) — retention has no owner for non-bench units.** Convergent.
  Carrier: orchestration.md Dispatch anatomy owns uniform retention (brief, report,
  verdict, executed instrument, acceptance evidence, every unit, every engine); Bench
  laws rule 4 keeps journals and points here. Re-proof this round: A11's film script
  promoted into the record as `record/a11-refilm-script.mjs`. Land.
- **R7 (Opus-7 + F2) — mid-campaign rules never reached canon.** Carrier: orchestration.md
  "Reaching the approval" gains the at-the-keyboard launch law and the
  spinner-then-`Username:` expiry law; Dispatch anatomy gains the meta-law (a binding
  mid-campaign rule lands in the owning file in the same commit). Land.
- **R8 (Opus-8) — lane-swap residue in planner/reviewer.** Carrier: planner.md Tensions
  line, reviewer.md referral wording, mirrored in the slimmed tomls. Land.
- **R9 (Opus-9 + Sol-9) — Grok model id, two homes, drifted.** RULED for Opus's smaller
  fix over Sol's derive-at-dispatch: grok.md owns the pin (4.6-high — today's live probe
  answered on it), grok.toml references the owner. Land.
- **R10 (Opus-3 + Sol-7) — no Codex transport contract; roster-mirror wording.**
  Convergent-adjacent, merged: create `.codex/agents/claude.toml` as the Claude transport
  contract; slim planner/reviewer/opus tomls to route + binding reference; orchestration
  Roles gains the symmetry-by-work-class sentence naming the two transport contracts.
  Land.
- **R11 (Opus-2) — verdict shape optional and fragmented.** Carrier: analyst.md,
  reviewer.md, codex.md analyst-route paragraph, analyst.toml, reviewer.toml default the
  `orkestrel-falsify` shape unconditionally; reviewer.md's rival output contract replaced.
  The campaign's AUDIT:/REVIEW:/REVERIFY: vocabulary dies. Land.
- **R12 (Sol-6) — A11 field pass without scoreboard.** One-lane finding, adopted reduced:
  field-testing.md states a re-film is a field pass and carries the scoreboard and
  journal paths. Land.
- **R13 (Opus-11) — subjective lane unarmed; round shape unfixed.** Self-demonstrated by
  this round. Carrier: instruction-audit.md gains the subjective lens list and the
  `INSTRAUDIT <LANE>: <n> findings` terminal line. Land.
- **R14 (Opus-12) — brief-check trigger too narrow for A6's state narrowing.** Carrier:
  orchestration.md check widened to states/fixture shapes made unreachable + unscoped-file
  clause. Land.
- **R15 (F4) — pipeline masking.** Carrier: quality.md diagnose-from-the-artifact law
  gains the truncating-pipe sentence. Land.
- **R16 (F5) — 10-minute foreground cap.** Carrier: CLAUDE.md bridge, one line
  (harness-specific). Land.
- **R17 (F6) — mutation probe binds prescription-verbatim fixes.** Used three times,
  zero regressions. Carrier: quality.md Falsification rounds section, one law. Land.
- **R18 (F7) — npm pkg set wrote the wrong section.** DROPPED on the record: single
  occurrence, caught in the same turn by the existing blast-radius check; neither lane
  raised it; no instruction gap identified.
- **R19 (F8 + both lanes' vindications) — successes.** Stays as-is, recorded:
  falsifiable-claims briefs (zero churn), probe-before-brief (a8 probe struck a planned
  unit), conditional rulings inside briefs (A6), cross-engine fix rounds, two-lane
  design with named reconciliation rulings.
- **R20 (F10) — unverified brief claim.** Stays as-is: the measure-under-unit-conditions
  check existed and was violated; R3 lands the fact so no future brief re-measures it.
- **R21 (F11) — retained product findings.** Carrier: supervisor `ROADMAP.md` "Open,
  recorded" rows (settlement observation design question; surrogate-pair cut;
  S7 live-stream proof; S3 keep grammar; fixture consolidation micro; contrast reading),
  plus striking the now-satisfied Sol-implementer-route row there (canon closed it:
  `.claude/agents/sol.md` exists and binds `codex.md` by reference). Land (unit D2).
- **R22 (Opus-10) — Sol driver return contract spans two turns.** Carrier: analyst.md and
  sol.md return sections — driver returns brief path, resolved command, journal path,
  nothing else; the Orchestrator launches and reads the answer. Land.
- **R23 (Sol-8) — grok.md fallback contradicts the root ladder.** Carrier: grok.md dark-
  bench sentence replaced with the root ladder (Luna, then Sonnet; never Orchestrator,
  planner, or analyst). Land.

Carrier walk: F1→R2/R7, F2→R7, F3→R3/R4, F4→R15, F5→R16, F6→R17, F7→R18 (dropped,
reason recorded), F8→R19, F9→R6, F10→R20, F11→R21; Sol 1-9 → R1, R2, R3, R5, R6, R12,
R10, R23, R9; Opus 1-12 → R1, R11, R10, R3, R5, R6, R7, R8, R9, R22, R13, R14. No
finding without a carrier.

Routing ledger for the landing: D1 (canon edits, all Land rows except R21) → Opus 5
`implementer`, sole writer in the scaffold checkout; conformance check on the diff →
`checker` (its own refined trigger: acceptance criteria are mechanical); gates →
`verifier`; D2 (supervisor ROADMAP rows) → `builder`, disjoint repository, parallel.

## Step 7 — landing record

- **D1** (Opus `implementer`, sole writer): all 28 prescribed canon edits landed at
  `8566281`; no deviations; scoped format check green; one Unknowns ruling (analyst.toml
  kept its beyond-CONFIRMED/BROKEN substance under the new default — accepted); three
  integration observations returned instead of being edited inline, per the newly landed
  integration law.
- **D1b** (builder, successor brief `d1b-harmonize-brief.md`): the three observations
  landed as four sentence replacements at the D1b commit; one recorded ancillary fix
  (oxfmt re-quoted reviewer.md's YAML description to hold an apostrophe).
- **D2** (builder, disjoint supervisor checkout): six retained-finding rows added and the
  satisfied Sol-implementer-route row struck; supervisor `18121d6`, pushed to branch and
  main. Carries R21.
- **Audit round for D1+D1b, routed per the refined step 5 and recorded here per its
  record-when-not-run clause:** the mechanical lane ran — `checker` on 30 numbered
  claims over the supplied diff (`d1-check-brief.md`, `d1-diff.patch`) — and the
  independent `verifier` ran the five-gate chain. The second judgment lane did not run:
  the landed substance is the two blind lanes' own reconciled prescriptions from this
  round, so a judgment lane would re-audit its own authorship; transcription risk is the
  checker's class.
- **R6 re-proof:** `record/a11-refilm-script.mjs` committed — the A11 capture unit's
  instrument is now in the record, so the film is re-producible from the record alone.

## Disposition map

Pending: checker verdict, gate evidence, then the map and terminal line.
