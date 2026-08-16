1. Critical — Audit completeness was not enforced.

   - Lane: Charter-versus-usage drift; roster completeness.
   - Claim: The campaign accepted single-auditor rounds and no checker evidence despite requiring subjective, objective, and mechanical audit lanes.
   - Evidence: `.agents/orchestration.md:57-64` says, “Two lanes run on every design round and every audit round” and “Both lanes always run”; `.agents/orchestration.md:288-290` also requires “`reviewer` … `analyst` … plus `checker`.” The record instead says, “Opus wrote, Sol audited” (`a7-audit-verdict.md:18-19`) and describes each unit as passing through “a non-writing auditor” (`a-acceptance.md:22-25`). Searching all 35 record files for `checker` returns no match.
   - Refinement class: Skill refinement.
   - Smallest concrete fix: Require every audit reconciliation to name three durable artifacts—subjective verdict, objective verdict, and checker report—with role and engine; forbid acceptance when any path is absent.

2. High — Process death is checked at the parent, not the process tree.

   - Lane: Promise-versus-tooling gap.
   - Claim: The cleanup contract cannot establish that a killed bench writer is dead because it never requires descendant enumeration.
   - Evidence: `.agents/orchestration.md:542-549` says, “Prove the previous run is gone” and “Kill by process id,” but the campaign found that “the `codex-code-mode-host` child survives a parent kill” and required walking children with `ps --ppid` (`a-plan.md:82-90`).
   - Refinement class: Orchestration-contract refinement.
   - Smallest concrete fix: Add one law requiring descendant enumeration, individual PID termination, and explicit confirmation that `codex-code-mode-host` is absent before launching a substitute writer.

3. High — The Sol sandbox contract leaves localhost ambiguous.

   - Lane: Promise-versus-tooling gap.
   - Claim: Saying the sandbox “denies network” did not tell brief authors that loopback connects and local bind/listen operations also fail.
   - Evidence: `.claude/agents/codex.md:69-74` says only, “The exec sandbox denies network.” A10 asserted, “denies network beyond localhost; everything here is localhost” (`a10-brief.md:77-85`), then reported “EPERM binds,” an unreachable daemon, and `EAFNOSUPPORT` on `::1` (`a10-report.md:3-10`).
   - Refinement class: Charter refinement.
   - Smallest concrete fix: State in `codex.md` that all socket operations are unavailable, including loopback connect and bind/listen, and prohibit local fixture servers or daemon proofs in a Codex exec brief.

4. High — Integration became unbriefed implementation.

   - Lane: Charter-versus-usage drift.
   - Claim: The orchestration contract’s broad integration authority allowed the Orchestrator to add substantive mechanisms instead of re-dispatching a bounded writing unit.
   - Evidence: `.agents/orchestration.md:282-287` routes nontrivial implementation to an implementer but lets integration “apply shared-file patches serially.” After A10 deviated, “Orchestrator integration” added `APP_AGENT_URL`, `parseApplicationURL`, runtime composition, and a new deadline proof (`a10-report.md:12-20`). A9 likewise records a behavioral “Fix round … (Orchestrator serial integration)” (`a9-audit-verdict.md:9-12`).
   - Refinement class: Orchestration-contract refinement.
   - Smallest concrete fix: Limit integration to exact report-only patches and mechanical conflict resolution; any new type, mechanism, behavior, or acceptance criterion must become a successor brief and routed writer.

5. High — Orchestrator-owned and successor work is not durably rerunnable.

   - Lane: Charter-versus-usage drift.
   - Claim: The artifact contract covers “dispatches” but failed to preserve briefs and executable inputs for Orchestrator-owned fixes and acceptance runs.
   - Evidence: `.agents/orchestration.md:361-368` requires a brief and successor brief for every dispatch, while retention names only “brief,” “distillate,” “audit verdict,” and “acceptance evidence” (`.agents/orchestration.md:585-590`). A9 records two fixes and a re-verification (`a9-audit-verdict.md:9-24`), but the record contains only the original `a9-brief.md` and `a9-audit-brief.md`. A11 records only a prose protocol and “13 frames under the session scratchpad” (`a11-refilm-record.md:3-6`), with no driver script in the record.
   - Refinement class: Orchestration-contract refinement.
   - Smallest concrete fix: Require every unit—including Orchestrator integration, fix, probe, and acceptance units—to retain its brief, successor brief, exact executed script/input, report, and verdict.

6. Medium — The field-testing output contract was skipped without blocking acceptance.

   - Lane: Charter-versus-usage drift.
   - Claim: A11 supplied aggregate prose instead of the required per-model scoreboard and durable journals.
   - Evidence: `field-testing.md:29-30` requires every pass to be “tracked … with its transcript journaled,” and `field-testing.md:69-75` requires “model, harness, calls, failed calls, outcome, and the delta.” `a11-refilm-record.md:3-24` lists four models and combined outcomes but supplies neither scoreboard nor journal paths.
   - Refinement class: Skill refinement.
   - Smallest concrete fix: Give field testing a fixed report schema and terminal line; make debrief acceptance reject a field pass missing any model row, journal path, exact prompt, or driver path.

7. Medium — The declared mirrored roster contradicts the actual provider roles.

   - Lane: Mechanical-equivalence groups; roster completeness.
   - Claim: The contract promises filename-level role symmetry while intentionally using provider-specific transport roles.
   - Evidence: `.agents/orchestration.md:133-156` says, “One role set, mirrored per provider” and “Give every role a file on both sides.” The inventories differ: Claude has `codex` and `sol` (`.claude/agents/codex.md:2`, `.claude/agents/sol.md:2`), while Codex has `opus` (`.codex/agents/opus.toml:1`) and no `codex` or `sol`; the role table also says Codex uses “`implementer` route `opus`” (`.agents/orchestration.md:142-143`) although the callable role is `opus`.
   - Refinement class: Orchestration-contract refinement.
   - Smallest concrete fix: Define symmetry by work class, not identical filenames; list Codex subjective implementation as `opus`, and explicitly mark `codex`/`sol` and `opus` as provider-specific transport roles.

8. Medium — The Grok charter’s fallback contradicts the root routing ladder.

   - Lane: Duplication diff.
   - Claim: The leaf charter can route reading-heavy work to the Orchestrator or expensive design engines despite the root’s opposite rule.
   - Evidence: `.agents/orchestration.md:109-117` fixes the ladder as “Cursor Grok … Luna … Sonnet,” says “Never route absorption to the Orchestrator,” and forbids spending Opus or Sol. `.claude/agents/grok.md:43-44` instead says to “hand the reading to the Orchestrator, `planner`, or `analyst` directly.”
   - Refinement class: Root-reference trim.
   - Smallest concrete fix: Replace the fallback list in `grok.md` with a reference to the root tedious-work ladder and require the role only to report the dark bench.

9. Low — The duplicated Grok model identifier has already drifted.

   - Lane: Duplication diff; mirror discipline.
   - Claim: Claude and Codex bridges claim different current Grok models, proving that the copied identifier has two owners.
   - Evidence: `.claude/agents/grok.md:18-24` pins `cursor-grok-4.6-high`; `.codex/agents/grok.toml:9-12` says the current model is `cursor-grok-4.5-high`; the campaign itself dispatched `cursor-grok-4.5-high` (`a0-absorb-brief.md:3-4`).
   - Refinement class: Charter refinement.
   - Smallest concrete fix: Remove stored “current” model IDs from both charters and resolve the model from one shared environment/config source verified with `agent models` at dispatch.

Retained strengths:

- Keep the mechanically equivalent role groups. Their shared envelopes carry distinct context bundles: application versus general builder, analyst versus Sol transport, and checker versus scout versus ecosystem evidence.
- Keep the falsification claim shape. A6, A9, and A10 produced substantive FAIL findings that fixes closed (`a-acceptance.md:22-25`), while A7 and A8 passed without churn.
- Keep independent exit-code verification. It caught the formatter failure hidden by `tail -1` (`a11-gate-sweep.md:3-7`), matching the verifier’s “TRUE outcome by exit code” rule (`.claude/agents/verifier.md:25`).

INSTRAUDIT OBJECTIVE: 9 findings