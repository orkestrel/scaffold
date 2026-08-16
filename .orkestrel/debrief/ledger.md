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
  until its process TREE is dead: the `codex-code-mode-host`" (continues: check it is gone
  before dispatching a substitute writer). Canon today: orchestration.md "Confirm dead
  before relaunching" names processes and kill-by-PID but not the surviving child tree of
  a killed exec. Provisional bucket: process refinement (orchestration contract, one
  sentence in "Confirm dead before relaunching").
- **F2 — login launched before the approver is present.** The supervisor publish's first
  login/authorization chain sat unclicked overnight; the authorization 404'd and the
  session credential expired (`npm whoami` → E401); a fresh two-click flow succeeded next
  day. Canon today covers credential re-probe ("Re-probe `whoami` immediately before
  opening the window") and last-URL-in-log-order, but no law says to launch the login only
  when the user has said they are ready to click. Provisional bucket: process refinement
  (orchestration contract, "Reaching the approval").
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
  and hides the failure lines; bit twice in one campaign (a node|grep probe
  pre-compaction; `format:check | tail -1` at the A10 fix, caught by the independent
  verifier as GATES: RED 1). Provisional bucket: rule addition (quality.md, one law: read
  a gate from its own exit code and complete output, never through a truncating pipe).
- **F5 — harness foreground cap.** Foreground Bash in this harness is hard-capped at 10
  minutes regardless of the timeout parameter; bench execs and other long commands must be
  background-launched. Provisional bucket: harness bridge (CLAUDE.md), since the cap is
  Claude-Code-specific.
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
- **F9 — capture instruments are session-ephemeral.** Evidence:
  `record/a11-refilm-record.md:6` "13 frames under the session scratchpad (e1r-*)." The
  re-film script and frames live outside the record; the unit cannot be re-run from its
  recorded brief alone. Provisional bucket: process refinement (the record keeps, or
  names the durable home of, the instrument a capture claim rests on) — route per the
  third question in instruction-audit.md.
- **F10 — unverified brief claim inverted by the unit.** A10's brief asserted loopback was
  permitted (quote under F3) — an Orchestrator assumption stated as fact; the existing
  "take every measurement under the conditions the unit will run in" check was violated,
  not missing. Provisional bucket: stays as-is (law exists; F3 lands the fact so no future
  brief needs to re-measure it); the violation is recorded here.
- **F11 — retained product findings from the campaign.** The acceptance record carries
  findings deferred to future design rounds (ollama agent lane emits no settlement
  observation and no transcript frames; surrogate-pair cut nick; S7 live-stream deadline
  proof; S3 keep grammar unvalidated). Provisional bucket: roadmap/guide truth in the
  supervisor repository. Exact rows and quotes from the Grok sweep at reconciliation.

## Step 3 — artifact audits (layer/boundary/promotion)

Pending: rows land after the sweep and lanes return.

## Step 6 — reconciliation

Pending.

## Disposition map

Pending.
