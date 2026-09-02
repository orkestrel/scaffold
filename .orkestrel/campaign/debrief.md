# Debrief — fleet dependency update, conformance, breaking, and voice campaign (2026-09-02)

Scope: the campaign recorded in `npm-audit-deps-findings.md` from the 2026-08-28 baseline through
the voice wave's closure (`eb64ee2`), plus the two earlier folders this repository still carried
(`.orkestrel/scaffold/`, the 0.0.56–0.0.59 scaffold campaign; `.orkestrel/contract/`, the
contract adoption trial). Evidence: the campaign folder as retained at `d657840`; the blind
instruction-set audit lanes (`debrief/instraudit-subjective.md`, `debrief/instraudit-objective.md`,
both on Claude Opus 5 with the Sol substitution recorded); the Cursor Grok distillates
(`carry.md`, `debrief/retrospective.md`). Field evidence: the campaign built no new consumable
surface; the published packages are driven by their own gate chains and the fleet closure, recorded
under `voice/fleet-gates-final.txt`.

Bench at dispatch: Cursor Grok live (`READY`); GPT-5.6 Sol dark (`codex` absent). Opus held the
subjective lane and the objective lane as separate blind subagents.

## Findings

Every finding ends in one bucket. `S<n>` is the subjective lane's numbering, `O<n>` the objective
lane's, `R<n>` an item the carry register raised against a canon file, `P<n>` an item the
retrospective raised. Convergent findings are ruled once under the first id.

| Id | Evidence | Ruling | Bucket | Carrier |
| --- | --- | --- | --- | --- |
| S1 | `reviewer.md:31`, `:57-60` revoke the swap clause at `:17-21`; `fix/units/contract-audit-verdict.md:3` | Adopt: condition the subjective-only clauses on the default lane; address referrals to the lane names | agent refinement | canon unit, `reviewer.md` |
| S2 | `orchestration.md:339` versus `:70` and `orkestrel-falsify/SKILL.md:80`; the voice verdicts' boilerplate | Adopt: the objective lane and the subjective lane both run on every audit round by default; a round that runs fewer lanes than its brief names records the deviation with the round's own reason | process refinement | canon unit, `orchestration.md` § Execution loop step 5 |
| S3, O9 | `npm-audit-deps-findings.md:263-270`; `CLAUDE.md` § Models silent on Workflow nodes | Adopt: every Workflow `agent()` node names its model alias, because the custom-agent path does not apply the role file's `model` pin | process refinement | canon unit, `CLAUDE.md` § Dispatch mechanism and § Models |
| S4 | `instruction-audit.md:10-11`, `:27`, `:50` bind lens lists to roles | Adopt: name the lanes, route engine assignment to `orchestration.md` § Engine assignment | skill refinement | canon unit, `orkestrel-debrief/references/instruction-audit.md` |
| S5 | `planner.md:31-38`; `fix/design-objective.md:3-5` | Adopt: give the return shape the objective lane's sections | agent refinement | canon unit, `planner.md` and `.codex/agents/planner.toml` |
| S6 | `orkestrel-falsify/SKILL.md:127-149`; `quality.md` § Rounds and verdicts | Adopt: add the section `Attacked and held` between the numbered verdicts and the terminal line | skill refinement | canon unit, `orkestrel-falsify/SKILL.md` |
| S7, O18, R2 | `names.md:119-120`; `fix/units/ollama-audit-verdict.md:27-28` | Adopt the ruling: a declared wire body — a type whose members transliterate an external wire format field for field — keeps the external field names, `type` and `kind` included, with the source named in its TSDoc; the package's own domain types never carry them; the projection between the two is the package's | rule refinement | canon unit, `names.md` § General vocabulary |
| S8, O7 | `npm-audit-deps-findings.md:482-484`; no row in `brief.md` | Adopt: the rename search bound is a word-boundary sweep and a case-insensitive sweep over `-s`, `-ed`, `-ing` | process refinement | canon unit, `.agents/templates/brief.md` § Scope |
| S9 | `voice-agent-audit-verdict.md:38` "the objective lane is dark" | Adopt: a lane the round did not dispatch is `not run`; `dark` names a bench alone | process refinement | canon unit, `orchestration.md` § The adversarial pass |
| S10 | `orkestrel-falsify/SKILL.md:144` cites the Claude `analyst` charter | Adopt: harness-neutral clause | skill refinement | canon unit |
| S11 | `.codex/agents/reviewer.toml:13-18` lacks the lane clauses | Adopt, mirrored | agent refinement | canon unit |
| O1 | `codex.md:146-158`, `orchestration.md:304-305`, `:748-758`; `fix/breaking-plan.md:62-64` | Adopt: an absent bench binary is named to the user in the same turn with the install command and the bench it unblocks; re-probe when the user answers | process refinement | canon unit, `orchestration.md` § Recovering a dark bench, both transports |
| O2 | `orchestration.md:199-200`, `:252`; `voice/plan.md:42` | Adopt: one writer per checkout, checkouts disjoint; the main-checkout serialization is the single-checkout case | process refinement | canon unit, `orchestration.md` § Permission floor and § Writing concurrency |
| O3 | routing ledgers' Orchestrator-owned rows; the instrument defects | Refuse the `integrator` role: the permission floor reserves commit and push, and widening it to a role removes the one boundary that keeps a writer's self-report from becoming the record. Adopt instead: staging, packing, gate invocation, and instrument authorship are dispatchable units (`builder` for a fully specified script, `verifier` for its evidence) with briefs and audits; only the commit and the push stay with the Orchestrator | process refinement, role create refused | canon unit, `orchestration.md` § Orchestrator and executor |
| O4 | `orkestrel-falsify/SKILL.md:149-159` counts; `AGENTS.md` § Writing | Adopt: the terminal line names the members — `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids>`; strike "say how many" | skill refinement | canon unit |
| O5 | `references/brief.md:6-37`; the generated audit briefs | Adopt: state the read-only audit lane's brief shape in `references/brief.md` and point the template at it | skill refinement | canon unit |
| O6 | `voice-scaffold-audit-verdict.md:52` confirmed a gate from the writer's report | Adopt: a claim whose only evidence is the writer's report is `UNRESOLVED` | agent refinement | canon unit, `reviewer.md`, `checker.md`, and the Codex mirrors |
| O8 | `grok.md:54` journals plain stdout; `npm-audit-deps-findings.md:337-339` | Adopt if the CLI's structured output form round-trips (probe `tmp/cursor/probe-json.sh`, this round); otherwise pin `2>&1` capture of stderr and record the limit | agent refinement | canon unit, `grok.md` and `.codex/agents/grok.toml` |
| O10 | `voice-scaffold-audit-verdict.md:40`; the scanner's three corrections | Adopt: a criterion that closes on an instrument's reading names the instrument's negative control and the class it proves visible | process refinement | canon unit, `.agents/templates/brief.md` § Acceptance criteria |
| O11 | `fix/breaking-plan.md:25-27`; the bridge charters' absolute | Adopt: the stale-authority branch — quote the landed text with its canonical path and mark it as superseding the vendored copy | skill refinement | canon unit, `orkestrel-falsify/references/brief.md`, `analyst.md`, `sol.md` |
| O12 | `npm-audit-deps-findings.md:875-878` | Adopt: when the orchestrator's repository is a subject package, the landing chain stages by path, never `git add -A` | process refinement | canon unit, `orchestration.md` § Where campaign artifacts live |
| O13 | the `should` and `robust` hits across rules, contract, and skills | Adopt as exact-text repairs; the `just` hits stand as ruled | rule refinement | canon unit |
| O14 | `verifier.md:43-49` duplicates the git-discard law | Adopt: trim to a reference, keep `:49` | agent refinement | canon unit |
| O15 | `builder.md:22-23` claims the app-layer unit | Adopt: the refusal | agent refinement | canon unit |
| O16, R1 | `names.md` § Standalone helpers has no `filter*` row | Adopt: `filter*` returns the members of a collection that satisfy a predicate, in order, without mutating its input | rule refinement | canon unit |
| O17, R0 | `architecture.md:76` uses `entity` undefined | Adopt: an entity is a class instance whose methods drive its own state; a plain value carries data and no behaviour; a function returning an entity is an entity factory | rule refinement | canon unit |
| O19, R3 | `patterns.md` § Batch operations beside `names.md` `clear` | Ruled by rule authority, the user's 2026-08-28 ruling standing: a manager that owns `clear` and a batch verb keeps both, because they are different observable operations — `clear` resets the entity's state and emits one `clear`; the no-argument batch verb applies the verb to every item and emits per item | rule refinement (the clause naming the interaction) | canon unit, `patterns.md` § Batch operations |
| O20 | `npm-audit-deps-findings.md:729-732` writes the order down | Adopt: a wave over unpublished tips derives its order per run and records only the round each package landed in | process refinement | canon unit, `orchestration.md` § Publishing the fleet |
| R4 | guide taglines and Surface rows keep the noun-phrase genre | Adopt as one sentence: the TSDoc voice rule governs doc blocks; a guide tagline and a Surface-row description are noun phrases | rule refinement | canon unit, `documentation.md` § Parity |
| R5 | the `Configures`/`Describes` type-doc split; `Holds` on a derived getter | Stays as-is: the voice rule fixes the form (a third-person verb stating what the symbol does); a vocabulary table per symbol kind would be a second rule with no trigger. A derived getter's sentence states what it returns | stays as-is | this file |
| R6 | comment overflow past the print width where a package tolerates it | Stays as-is: the formatter owns line width and does not reflow comments; a package's tolerance is its `.oxfmtrc.json`, vendored | stays as-is | this file |
| P1 | `fix/breaking-plan.md:171`: fetch a dependency's `origin/main` before a wave boundary packs it | Adopt: before packing a dependency whose default branch another session may move, fetch and merge it | process refinement | canon unit, `orchestration.md` § Fixing a dependency before it publishes |
| P2 | `fix/breaking-plan.md:15`: one unit per checkout at its catalog layer; adopt units only when red | Adopt as the wave shape in the same section | process refinement | canon unit |
| P3 | `fix/units/template-audit-verdict.md:29`: a brief made the checkout `tmp/` off-limits while `tests.md` places runtime probes under `tmp/probe/` | Adopt: the template's off-limits reminder names `tmp/probe/` as the unit's probe home, never off-limits | process refinement | canon unit, `.agents/templates/brief.md` |
| P4 | `fix/units/guide-audit-verdict.md:16`: every later brief owns the package `README.md` | Adopt in the template's Owned reminder: a unit that moves a published symbol owns the README | process refinement | canon unit |
| P5 | `npm-audit-deps-findings.md:310`: the Grok chunk omitted rows the Orchestrator filled | Adopt: the grok charter's return names every input row the distillate did not reach | agent refinement | canon unit, `grok.md` |
| P6 | `fix/units/toolbox-audit-verdict.md:34`, `mcp-audit-verdict.md:54`: `git mv` and `git add -N` inside no-stage briefs | Adopt: a rename moves the file with the shell's `mv`, never `git mv`; `git add -N` is permitted only to render the diff evidence | process refinement | canon unit, `.agents/templates/brief.md` § Tools and limits |
| P7 | the truncated judge ruling in the agent dossier | Dropped: a record artifact with no instruction behind it | dropped | this file |
| P8 | the process refactor freeze; the usage-limit and container-restart recoveries | Stays as-is: `resumeFromRunId` recovery is in `CLAUDE.md`; a freeze is a campaign fact | stays as-is | this file |

## Artifact audits

- Layer and boundary: the src-audit slices, the fix round, and the breaking phase closed every
  placement and boundary row they raised; the conformance round that follows this debrief attacks
  every package's final tree again on the refined canon, with the carry register's package rows as
  claim C. Carrier: task #31.
- Package promotion: no package grew a mechanism that belongs a layer down; the one candidate
  (`pruneEmptiedDirectories`, contract trial) landed in scaffold's own `src/server/helpers.ts`.
- Test infrastructure both ways: claim O6 and O7 of the conformance round sweep every package's
  local helpers against the installed `@orkestrel/test` declarations.

## Process retrospective

The retrospective distillate (`debrief/retrospective.md`) groups the record into engine-split
collapse, launch loss recovered by re-probe or resume or successor brief, instrument defects that
presented as unit failures, Orchestrator absorption, audit catch against churn, rule text
outranking a brief, and binding mid-campaign rules with and without a home. Each class is carried by
a finding above: S3/O9 and O1 (engine split), O8 and P5 (launch loss and distillate coverage), O10
(instrument controls), O3 and O12 (absorption), S2, S6, O4, O5, O6 (audit rounds), O19 (rule
authority), S8/O7, P1–P4, P6 (homeless rules).

Successes codified: the re-probe before ruling on an empty bench lane (already law); the successor
brief carrying a killed unit's partial state (already law); the deciding re-run on an idle host
(already law); rule text reversing a design ruling (already law, now with O19's clause).

## Canon delta

Landed by the canon unit (`tmp/units/canon-brief.md`, Opus `implementer`, audited by a blind
`reviewer` lane and the `checker`, gated by `verifier`): agents (`reviewer`, `planner`, `checker`,
`verifier`, `builder`, `grok`, `analyst`, `sol`, and their Codex mirrors), rules (`names.md`,
`architecture.md`, `patterns.md`, `documentation.md`, plus the `should`/`robust` repairs in
`names.md`, `tests.md`, `architecture.md`, `quality.md`), skills (`orkestrel-falsify` and its
`references/brief.md`, `orkestrel-debrief/references/instruction-audit.md`, `orkestrel-debrief/SKILL.md`,
`orkestrel-harden-package` and its references), process (`.agents/orchestration.md`, `CLAUDE.md`,
`.agents/templates/brief.md`, both transports), guide (`guides/scaffold.md` where the host surface
description moves), roadmap (`ROADMAP.md` forward rows). The commit that lands them is named in the
prune commit's successor and in this file's closing line.

## Re-proof

- Process refinements re-prove when the conformance round runs the corrected process: two lanes
  per package by default, explicit model aliases on every node, the audit-lane brief shape, the
  member-naming terminal line, the `not run` vocabulary, staging by path.
- Rule refinements re-prove on the conformance round's rulings that cite them (`filter*`, `entity`,
  the wire body, the batch clause).
- The Grok journal form re-proves on the next Grok lane's journal carrying its session id.

Terminal line: `DEBRIEF: OPEN` until the canon unit lands and propagates; the closing report
replaces it.
