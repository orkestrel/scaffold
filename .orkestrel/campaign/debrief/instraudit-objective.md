# Instruction-set audit — objective lane (verbatim, 2026-09-02)

Held the **OBJECTIVE** lane, on Claude Opus 5 as the recorded substitution: the GPT-5.6 Sol bench is dark (`codex` absent from `PATH`, probed 2026-09-02), so the engine that normally holds this lane could not run it.

## Coverage against `instruction-audit.md` § The objective lens list

- **Duplication diff** — covered. Whole-line and obligation-level comparison across `.claude/agents/*.md`, `.claude/rules/*.md`, `.agents/orchestration.md`, `.agents/transports/*.md`, `.agents/templates/brief.md`, and every `.agents/skills/*/SKILL.md` with its `references/`. Findings 13, 14.
- **Mechanical-equivalence groups** — covered. Clustered all thirteen Claude charters by `tools`, `model`, `effort`, `permissionMode`. Identical groups: `{analyst, sol}`, `{checker, scout, orkestrel}`, `{builder, application}`; `{reviewer, planner}` differ only in `permissionMode`. Each is distinct by context binding and none warrants retirement, per the refinement class's own caution. The one overlap that reaches the charter text is finding 15.
- **Charter-versus-usage drift** — covered. Compared each charter's promises against the routing ledgers in `fix/breaking-plan.md:200-222` and `voice/plan.md:28-35` and against what the units actually did. Findings 2, 3, 6, 8, 15.
- **Promise-versus-tooling gaps** — covered. Findings 6, 8, 10.
- **Roster completeness on both axes** — covered. Model agents: Claude `.claude/agents/` and the Codex mirror `.codex/agents/*.toml` are complete and correspond by work class (`sol` ↔ `opus`, `implementer` ↔ `implementer`); no hole. Task agents: finding 3 names the hole. Bound of the usage search: `\b(researcher|scout|application|orkestrel)\b` over `.orkestrel/campaign/fix/breaking-plan.md` and `` `role` `` over `.orkestrel/campaign/**` returns no routing row for `researcher`, `scout`, `application`, or the `orkestrel` role, so those lanes carry no usage evidence from this campaign and are judged on text alone.

## Findings

**1. `.agents/transports/codex.md:146-158` and `.agents/orchestration.md:304-305, 748-758` — an absent bench binary has no recovery owner and no user-escalation duty.**

`.agents/transports/codex.md:150` covers only "Binary present but authentication unavailable" and `:154` only "Recovery impossible — device login unavailable, declined, or expired". `.agents/orchestration.md:750` opens the recovery ladder at "A probe that finds a bench binary present but authentication unavailable starts recovery in the same turn." `.agents/orchestration.md:304-305` disposes of the other case in a subordinate clause: "an unresolved CLI is an install problem" — naming no owner, no action, and no obligation to surface it. `.agents/orchestration.md:206` forbids every role from installing.

The record: `.orkestrel/campaign/npm-audit-deps-findings.md:10` "The `codex` binary does not resolve, and the `codex` MCP server reports `ENOENT`". `.orkestrel/campaign/fix/breaking-plan.md:62-64` "**Recovery of the Codex bench cannot start from here.** The binary is absent, so there is no login to background; the user brings the bench live by installing the CLI and running `codex login --device-auth` in a live session." The Orchestrator had to invent that ruling because no instruction file states it. The cost is recorded twice: `.orkestrel/campaign/fix/design-subjective.md:141` "With the bench dark, no auditor has an engine the writer did not have, and that is the phase's sharpest process problem rather than a detail", and `.orkestrel/campaign/fix/breaking-plan.md:60-61` "A `PASS` from this round is weaker evidence than a cross-engine `PASS`, and the round's verdict files say so." Every adversarial lane of the whole campaign ran single-engine on that basis.

**Class: Orchestration-contract refinement.** Add to `.agents/orchestration.md` § Recovering a dark bench one law binding the absent-binary case — the Orchestrator names the install command and the bench it unblocks to the user in the same turn it records the bench dark, and re-probes when the user answers — and mirror the case into the § Availability list of both transport contracts.

**2. `.agents/orchestration.md:199-200` and `:252` — the contract forbids the concurrency model the entire campaign ran on.**

`.agents/orchestration.md:199-200`: "Run writing roles in the main checkout, strictly serialized: one writer at a time, dispatched from a clean committed baseline, each owning disjoint files." `:252`: "Serialize writing executors in the main checkout." The only multi-tree law, `:264-265`, grants worktree isolation to *audit* lanes alone.

The record: `.orkestrel/campaign/npm-audit-deps-findings.md:186-187` "Workflow `wf_a88c02f6-538` dispatches one Claude Opus 5 writer per package with fix-producing verdicts, in disjoint repository checkouts". `.orkestrel/campaign/voice/plan.md:42` "Two writers at a time on disjoint checkouts (4 CPUs); lanes read-only." `.orkestrel/campaign/voice/plan.md:66-67` "up to six agents run at once across disjoint checkouts; one writer per checkout still holds." `.orkestrel/campaign/fix/breaking-plan.md:196-197` "Every writer is the sole writer in its checkout; a wave's units run as disjoint checkouts, at most two concurrent writers on this host". The invariant the campaign actually enforced — one writer per checkout, checkouts disjoint — is a different law from the one written, and it exists only in campaign plans that the retention prune deletes.

**Class: Orchestration-contract refinement.** Restate the § Writing concurrency serialization law as one writer per checkout with disjoint checkouts, so the fleet case is governed rather than silently excepted.

**3. `.agents/orchestration.md:200-222` role table and `:562-566` — the Orchestrator absorbed a whole work class that has no role, and its own instruments were never audited.**

The routing ledgers name the class explicitly. `.orkestrel/campaign/fix/breaking-plan.md:202` "Orchestrator-owned command (`scaffold catalog`)"; `:204` "Orchestrator-owned instrument and measurements"; `:208` "Orchestrator tracked run"; `:221` "Orchestrator tracked re-stage from committed tips"; `:222` "Orchestrator: closure table, register consolidation, tarball sweep". `.orkestrel/campaign/voice/plan.md:33` "`voice-<package>` landing | Orchestrator | — | `instruments/land-fixup.mjs` ... the authoritative gate run; commit and push". No role in the table may commit or push (`.agents/orchestration.md:202`), so staging, packing, landing, and instrument authorship have no dispatchable owner.

The consequence is recorded as instrument defects that corrupted lane evidence and were caught only downstream: `npm-audit-deps-findings.md:316-318` (radius counted vendored mirrors and "reported every package as a consumer of every contract symbol"), `:427-428` ("concurrent packs of one package raced on its `dist/`"), `:607-611` ("`stage-set.mjs` built a consumer's closure over runtime and development dependencies only, so a package reached through a peer resolved to the registry copy"), `:692-693` ("Every claim-8 failure was the report renderer printing the writer's grouped fields as placeholders, not the writer"), `:780-781` ("The first classifier read a hyphenated verb (`Re-arms`, `Re-enqueues`) as imperative"). `.agents/orchestration.md:562-563` requires that "When the Orchestrator writes any part of a unit, that part is briefed, owned, and audited like any other part, and its auditor is an engine the Orchestrator does not share" — unsatisfiable for this campaign under finding 1, and no verdict file records an instrument audit.

**Class: Role create.** Add an `integrator` role — landing chain, staging, packing, gate-chain invocation, commit and push of an accepted unit under the Orchestrator's explicit instruction — so instrument authorship and landing become dispatchable, briefable, and auditable rather than orchestrator residue.

**4. `.agents/skills/orkestrel-falsify/SKILL.md:149-159` — the mandated terminal line was overridden by every audit brief in the campaign, and the mandated form violates `AGENTS.md` § Writing.**

The skill fixes the shape absolutely: `:129-130` "Every auditor in every round returns exactly this, and nothing else. One shape makes rounds comparable; a round that invents its own cannot be read against the last one", and `:152-153` gives `VERDICT: FAIL — <n> broken, <u> unresolved, <e> not-evidenced, <x> findings outside the claims`.

`.orkestrel/campaign/fix/breaking-plan.md:224` names the skill: "Audit per unit, per `orkestrel-falsify`". Every brief then fixed a different line. `.orkestrel/campaign/fix/units/agent-audit-subjective-brief.md:37-38`: "then one terminal line: `PASS` when every claim you hold is CONFIRMED, `FAIL` otherwise with the failing claim numbers." `.orkestrel/campaign/voice/units/voice-agent-audit-subjective-brief.md:37-38`: "then exactly one terminal line: `PASS` or `FAIL <claim numbers>`." The returned lanes carry that form: `.orkestrel/campaign/voice/units/voice-agent-audit-subjective.md:1` "subjective lane (FAIL 1, 2)".

The override was the correct reading of the root law and the skill is the defect: `AGENTS.md` § Writing states "**NEVER state a count.** ... rules, rows, members, exports, files, options, steps, cases, stages, findings, and tests are such sets. Name the members, or write the sentence without the number." The skill's line counts broken claims and findings outside the claims; the campaign's line names the members. `.agents/skills/orkestrel-falsify/references/brief.md:74` carries the same defect: "Require the auditor to pick the ones it considers most likely wrong and actually attack them, and say how many."

**Class: Skill refinement.** Replace the skill's terminal line with the member-naming form the campaign proved (`PASS`, or `FAIL <claim numbers>` with the findings outside the claims named), and strike "say how many" from `references/brief.md:74`.

**5. `.agents/skills/orkestrel-falsify/references/brief.md:6-37` and `.agents/orchestration.md:471-524` — the required brief anatomy was used by no audit lane brief in either wave.**

`references/brief.md` requires **Subject** (the whole chain of rounds), **What the round decides**, **Already established — do not re-run**, **Review evidence**, **Numbered falsifiable claims**, **Unknowns**, and **The threshold**. `.agents/orchestration.md` § Required sections additionally requires Objective, Context with the law and the skill name, Scope, Execution, Deviation contract, and Acceptance criteria, and `.agents/templates/brief.md:3` says "Copy this file for each dispatch and fill every row."

The actual audit briefs carry Role and engine, Subject, Claims, and Output, and nothing else: `.orkestrel/campaign/fix/units/agent-audit-subjective-brief.md` (headings at `:3`, `:9`, `:21`, `:35`) and `.orkestrel/campaign/voice/units/voice-agent-audit-subjective-brief.md` (headings at `:3`, `:10`, `:20`, `:34`). Neither names a skill, an Execution line, a Deviation contract, or Unknowns. This shape was generated for every package of both waves, so the omission is systematic rather than incidental.

**Class: Skill refinement.** State in `references/brief.md` the read-only audit lane's own brief shape — the rows a lane that writes nothing and runs nothing must have, and the rows it does not — and point `.agents/templates/brief.md` at it, so the compression the campaign proved is the instruction rather than a deviation.

**6. `.claude/agents/checker.md:24-38` and `.claude/agents/reviewer.md:10-12` — a lane confirmed a gate claim from the writer's own report, and the charters that forbid it were overridden by the brief.**

`.claude/agents/reviewer.md:11-12`: "You are independent of the builder: their self-assessment carries no weight with you." `.agents/orchestration.md:556`: "No writer's and no external engine's self-assessment is authoritative."

The briefs instructed the opposite. `.orkestrel/campaign/fix/units/agent-audit-subjective-brief.md:32`: "The gate commands the report claims exit as reported (the `verifier` lane re-runs the chain and quotes the exit codes; a reviewer or checker lane rules this NOT-EVIDENCED unless the report quotes the exact command and exit code)." The lane then ruled on the writer's quotation: `.orkestrel/campaign/voice/units/voice-scaffold-audit-verdict.md:52` "Claim 5: CONFIRMED. voice-scaffold-report.md:53-66 quotes the exact command and exit code for each gate ... Per the brief, this is CONFIRMED on the quoted evidence". The earlier round had the honest reading: `.orkestrel/campaign/fix/units/vocabulary-audit-verdict.md:15` "| 5 gates as reported | not held | UNRESOLVED (no shell) |". `.agents/skills/orkestrel-falsify/SKILL.md:121-123` already owns the correct remedy ("Where the lane cannot execute, run the probe yourself, record its control and its output, and supply that record as the lane's evidence"), and no charter states the refusal.

**Class: Charter refinement.** Add one line to `.claude/agents/checker.md` and `.claude/agents/reviewer.md`: a claim whose only evidence is the writer's report is `UNRESOLVED`, never `CONFIRMED`, whatever the brief says.

**7. `.agents/templates/brief.md` — the inflected-sweep rule the campaign recorded as landed never landed in a durable file.**

`.orkestrel/campaign/npm-audit-deps-findings.md:482-484`: "**Process rule landed:** an old name's inflected forms hide from a bare word-boundary sweep (`execs` against `\bexec\b`), so the brief template and the audit claim generator require a second, case-insensitive sweep over `-s`, `-ed`, `-ing`."

The rule is not in `.agents/templates/brief.md` (read in full; no such row), and a search for `inflect|word-boundary` over `.claude/**/*.md` and `.agents/**/*.md` returns only `.claude/rules/writing.md:110`, which governs the substitution-table sweep and not a rename sweep. Every actual carrier is a campaign artifact the prune deletes, for example `.orkestrel/campaign/fix/units/agent-audit-subjective-brief.md:27` "grep with word boundaries, then again case-insensitively for the inflected forms `-s`, `-ed`, `-ing`". This breaks `.agents/orchestration.md:453-454`: "Land a process rule stated as binding mid-campaign in the owning rule or contract file in the same commit that states it. A campaign artifact is evidence, never a rule's home."

**Class: Rule additions, one law each.** Add the inflected-sweep row to `.agents/templates/brief.md` § "What asserts the state this change ends", stating that a rename's search bound is a word-boundary sweep followed by a case-insensitive sweep over `-s`, `-ed`, and `-ing`.

**8. `.claude/agents/grok.md:54` — the pinned journal form cannot satisfy Bench law "Journal first", and the record shows the cost.**

`.agents/orchestration.md:685-693`: "Every bench invocation leaves a tailable on-disk record beside its brief under `tmp/<bench>/`: the event stream or output log, and the final answer. ... The journal's mtime is the liveness signal; the session id in its head is the recovery handle. ... a bench unit returns its journal path and session id with its result, and the Orchestrator confirms both before using that result."

`.claude/agents/grok.md:54` pins `<resolved-entry> -p --trust --mode=ask --model "$CURSOR_GROK_MODEL" "<brief or pointer>" | tee tmp/cursor/<unit>.log` — a `tee` of plain stdout, with no structured output flag, so no session id and no event stream ever reach the file. `/home/user/scaffold/tmp/cursor/breaking-ledger-L4L6.log:1` opens "**Question**", not a session header. `.agents/transports/codex.md:55` and `:68` get this right for the other bench (`--json ... > tmp/codex/<unit>.jsonl`, "records the session id (`thread_id` in the journal's opening events)"), so the asymmetry is a Grok-side defect rather than an unmet law.

The consequence: `.orkestrel/campaign/npm-audit-deps-findings.md:337-339` "the two empty lanes before it left no stderr once captured, so the failure mode stays unattributed beyond 'the CLI exited 1 with no output'". Two lanes died with no recovery handle and no diagnosis.

**Class: Charter refinement.** Pin a structured-output journal form in `.claude/agents/grok.md` that captures the session id and stderr, so a Cursor lane can be resumed and a dead lane can be diagnosed.

**9. `CLAUDE.md` § Dispatch mechanism and § Models — the Workflow model-pin defect was declared a standing rule and never landed.**

`.orkestrel/campaign/npm-audit-deps-findings.md:263-270`: "The audit round's `checker` lane launched with `agentType: 'checker'` and no explicit model. The role file pins `model: sonnet`, but the Workflow tool's custom-agent path does not apply the frontmatter pin and the lane inherited the session model instead ... Standing rule for every later workflow in this campaign: every `agent()` call names its model alias explicitly, whatever the role file says."

A search for `agent\(\)|model alias|frontmatter pin|names its model` over every `*.md` in the repository returns hits only in that campaign file. `CLAUDE.md` § Models states "Use the aliases `opus` and `sonnet`. Never use a fixed Claude model ID and never use `inherit`" and says nothing about the Workflow path silently ignoring the pin. The round it broke was an audit round, so the failure class is an adversarial lane running on the wrong engine while reading normal.

**Class: Orchestration-contract refinement.** Add to `CLAUDE.md` § Dispatch mechanism: a Workflow `agent()` node names its model alias explicitly, because the custom-agent path does not apply the role file's `model` frontmatter.

**10. `.agents/templates/brief.md:130-147` — an acceptance criterion resting on an instrument carries no control requirement, and a criterion closed green over the defect it existed to catch.**

`.claude/rules/quality.md` § Instruments owns the law ("An instrument is not evidence until it has failed. Pair every probe, comparison, or matrix with a negative control that must report failure"), and the template's § Acceptance criteria never routes a criterion to it.

The record: `.orkestrel/campaign/voice/units/voice-scaffold-audit-verdict.md:40` "The acceptance instrument cannot see the defect claim 1 names. voice-scan.mjs reports imperative:0 for a tree still holding six imperative second clauses, because it reads the opening token only; the unit's criterion 2 closed green over the defect. The instrument needs a control that a stranded second-clause imperative breaks before its imperative:0 is worth quoting in the next package's brief." The same instrument was corrected twice more mid-wave: `npm-audit-deps-findings.md:780-781` (hyphenated verbs read as imperative) and `:793-794` (an all-caps initialism opener and the boolean-parameter form read as verbless).

**Class: Orchestration-contract refinement.** Add a row to `.agents/templates/brief.md` § Acceptance criteria: a criterion that closes on an instrument's reading names that instrument's negative control and the class the control proves it can see.

**11. `.agents/skills/orkestrel-falsify/SKILL.md:71-75`, `.claude/agents/analyst.md:33-37`, `.claude/agents/sol.md:36-38` — "propagate, never restate" has no branch for an authority that exists but is stale.**

All three state the same absolute: "Every authority the brief references must exist in the tree the exec is rooted in. ... Propagate the missing file; do not restate its contents in the brief."

The campaign could not obey it and said so. `.orkestrel/campaign/fix/breaking-plan.md:25-27`: "**The vocabulary lands in `.claude/rules/names.md` now** (both lanes) ... Scaffold's canon surface moves, so a scaffold bump is owed at the next release and every brief in this phase quotes the added text because targets carry the older vendored copy." `.orkestrel/campaign/fix/units/agent-audit-subjective-brief.md:17-18`: "`/home/user/fleet/agent/.claude/rules/names.md` (the vendored copy predates the vocabulary; the brief quotes the landed text)". Propagation required a `scaffold` publish and a `repair` pass across the fleet, which `.agents/orchestration.md:846-852` and the user's publish hold both blocked, so every breaking-unit brief restated.

**Class: Skill refinements.** State the stale-authority branch once in `.agents/skills/orkestrel-falsify/references/brief.md` and reference it from the bridge charters: where the executor's tree carries a superseded vendored authority, quote the landed text with its canonical path and mark the quotation as superseding the vendored copy.

**12. `.agents/orchestration.md:458-463` — campaign-artifact placement collides with product-tree purity when the orchestrator's repository is itself the published package.**

`:458-459` "Put every campaign artifact in the **orchestrator's** repository under `.orkestrel/<package>/`" and `:463` "Never put them in the package they are about. A published package's tree is its product." The campaign's orchestrator repository is `scaffold`, and `scaffold` was also a subject package, so both laws applied to one tree and neither names the collision.

The record: `.orkestrel/campaign/npm-audit-deps-findings.md:875-878` "Scaffold's voice commit `ee872f3` carried `voice-agent.diff`, `voice-agent.status`, `voice-mcp.diff`, and `voice-mcp.status` under `voice/units/` through the landing chain's `git add -A`; they are campaign records that belong there, noted so the commit's scope reads correctly."

**Class: Orchestration-contract refinement.** State the precedence in § Where campaign artifacts live: when the orchestrator's repository is a subject package, `.orkestrel/` stays the artifact home and the landing chain stages by path rather than with `git add -A`, so a product commit never carries campaign records unannounced.

**13. `.claude/rules/names.md:8`, `.claude/rules/names.md:181`, `.claude/rules/tests.md:34`, `.claude/rules/architecture.md:260`, `.agents/orchestration.md:67`, `.agents/orchestration.md:275`, `.agents/skills/orkestrel-debrief/SKILL.md:74-75`, `.agents/skills/orkestrel-harden-package/references/research.md:38`, `.agents/skills/orkestrel-harden-package/references/hardening.md:53`, `.claude/rules/quality.md:108`, `.agents/skills/orkestrel-harden-package/SKILL.md:50` — the instruction set breaks the writing rule it enforces.**

`.claude/rules/writing.md:13` "Never write `should`, and never soften a recommendation into `We recommend`", and the substitution table at `:90` (`should`) and `:99` (`performant`, `robust` → the measured property).

Verbatim hits, from a case-insensitive sweep of `\b(should|robust|performant|utilize|leverage)\b` over `.claude/**/*.md` and `.agents/**/*.md`, excluding the `writing.md` table rows that define them: `.claude/rules/names.md:8` "A consumer should be able to predict them without documentation."; `.claude/rules/names.md:181` "remove `_` and wire the value if it should be consumed."; `.claude/rules/tests.md:34` "Assert the membership a discovered or globbed set should have"; `.claude/rules/architecture.md:260` "If a declaration should not be public"; `.agents/orchestration.md:67` "what the API should feel like"; `.agents/orchestration.md:275` "the work it should have stopped"; `.agents/skills/orkestrel-debrief/SKILL.md:74-75` "anything the orchestrator absorbed that should have been dispatched or dispatched that it should have owned"; `research.md:38` "architectural limitations that cannot or should not be copied"; `hardening.md:53` "one request should prove one primary claim"; `.claude/rules/quality.md:108` "tune each request to the smallest robust proof"; `.agents/skills/orkestrel-harden-package/SKILL.md:50` "minimally sufficient, robust, and behaviorally meaningful". I ruled the `just` hits at `.agents/orchestration.md:299`, `:360`, and `.claude/rules/quality.md:70` permitted: each carries a temporal or contrastive sense, not the minimizing sense the row bans.

This matters because the wave that just closed rewrote 7120 doc blocks across the fleet to this rule (`npm-audit-deps-findings.md:862-864`) while the files mandating it did not conform.

**Class: Rule additions, one law each** (applied as exact-text repairs). Replace each `should` with `must`, `can`, or the imperative, and each `robust` with the measured property.

**14. `.claude/agents/verifier.md:43-49` — a verbatim second home for the git-discard law, already drifted.**

`.agents/orchestration.md:203-205`: "No role runs `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. Each discards a working-tree change silently. A role that must undo its own edit undoes exactly that edit. A dispatch that has a unit plant a line to prove an instrument can fail names a file the unit under verification did not touch, and names how the plant is removed."

`.claude/agents/verifier.md:45-47`: "Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. Each discards a working-tree change silently. ... Where a dispatch has you plant a line to prove a gate can fail, remove exactly the line you added. Never revert the file it sits in."

The drift the one-home law predicts is already present: the root places the plant obligation on the dispatch and requires an untouched file; the charter places it on the executor and states a different removal rule. `.agents/orchestration.md:180` gives the root as the single owner, and `.claude/agents/verifier.md:14-15` already points there.

**Class: Root-reference trims.** Shrink `.claude/agents/verifier.md:43-49` to a reference to `.agents/orchestration.md` § Permission floor, keeping only `:49` ("Read a dirty `git status` as the expected state"), which the root does not own.

**15. `.claude/agents/builder.md:22-23` — the builder charter claims the unit the roster routes to `application`.**

`.agents/orchestration.md` role table routes "Fully specified app-layer unit" to `application`. `.claude/agents/application.md:20-23` makes that binding its distinguishing content: "read **AGENTS.md**, `.claude/rules/application.md`, `.claude/rules/workspace.md`". `.claude/agents/builder.md:22-23` restates it: "An app-layer unit additionally binds `.claude/rules/application.md` and `.claude/rules/workspace.md`." The two charters carry identical frontmatter (`Read, Grep, Glob, Edit, Write, Bash` / `sonnet` / `low` / `acceptEdits`), so nothing but that sentence separates them, and the sentence tells a `builder` it may take the unit. Neither role was dispatched in this campaign, so there is no usage evidence either way; the defect is in the text.

**Class: Charter refinement.** Strike `.claude/agents/builder.md:22-23`'s app-layer clause and replace it with the refusal: an app-layer unit belongs to `application`, so stop and say so.

**16. `.claude/rules/names.md:91-104` — § Standalone helpers has no `filter*` row and the fleet ships the prefix.**

`.orkestrel/campaign/npm-audit-deps-findings.md:572-573`: "**`filter*` prefix.** `.claude/rules/names.md` § Standalone helpers has no row for `filter*`; terminal ships `filterEnabled` and `filterDisabled`. Carrier: scaffold `names.md`, next change." A search for `filter\*|filterEnabled` over `.claude/rules/` returns nothing, so the carrier is still open. The prefix list at `:91` opens "A helper prefix has one project-wide meaning", which makes an unlisted shipped prefix an unruled name.

**Class: Rule additions, one law each.** Add the `filter*` row to `.claude/rules/names.md` § Standalone helpers.

**17. `.claude/rules/architecture.md:76` — `entity` is load-bearing in § Kind purity and defined nowhere.**

`.claude/rules/architecture.md:76-77`: "A function returning a live entity is an entity factory and belongs in `factories.ts` whatever it is called". `.claude/rules/names.md:172` routes the whole `create*` decision there: "`create*`: the factory form; `.claude/rules/architecture.md` § Kind purity states what a factory is and where it lives."

The gap cost the campaign a full audit round. `.orkestrel/campaign/fix/units/vocabulary-audit-verdict.md:70`: "BROKEN: `build*` and `*Of` are not disjoint after 'named for its constituents' left line 172; `entity` is defined nowhere, so line 171 does not reach `createCaptureResult` on its own", and `:98` "Finding for the next change, against `architecture.md` § Kind purity: define `entity` where 'a function returning a live entity' is stated."

**Class: Rule additions, one law each.** Define `entity` in `.claude/rules/architecture.md` § Kind purity at the sentence that uses it.

**18. `.claude/rules/names.md:120` — the mirrored-name ban on `type` has no branch for a declared wire body, and the campaign could not settle a real case.**

`.claude/rules/names.md:120`: "Mirror no banned word: a mirrored name never uses `kind` or `type` as a member name, and never uses a word § Rejected naming lists." `:119` grants the mirroring itself ("An option key, constant, or member that transliterates an external protocol field ... keeps the external wording in this project's casing").

`.orkestrel/campaign/npm-audit-deps-findings.md:686-689`: "the wire member `type: 'function'` on `WireChatRequest` against the vocabulary's 'never `type` as a member name' clause is a `names.md` question for scaffold (a declared wire body mirrors the field it serializes; the ruling belongs in the rule file, as an exception for declared wire bodies or as a serialization projection the package owes)." The rule as written forbids the mirror it also mandates, and the unit had no text to rule from.

**Class: Rule additions, one law each.** Rule the case in `.claude/rules/names.md` § General vocabulary — either a declared wire body keeps the external field name, or the package owes a serialization projection — and name which.

**19. `.claude/rules/patterns.md:52-65` and `.claude/rules/names.md:211` — two rules jointly mandate two remove-all paths on one manager, and neither names the interaction.**

`.claude/rules/patterns.md:57` and `:62` require the no-argument overload: "`method(): void`" and "No argument applies to all." `.claude/rules/names.md:211` fixes `clear` as "Reset state without destroying the entity". A manager owning both therefore publishes two ways to empty itself, and no rule text decides.

The campaign hit it, reversed a design ruling on it, and escalated. `.orkestrel/campaign/npm-audit-deps-findings.md:503-504`: "The rule wins: template restores the overload and s17-18 closes refused." `:504-509`: "**Question for the user:** a manager that owns `clear` ... and the batch family's no-argument `remove()` ... carries two remove-all paths. ... The fleet keeps the pair until you rule."

**Class: Rule additions, one law each.** The ruling is the user's; the instruction defect is that neither file names the interaction. Land the user's answer as one clause in `.claude/rules/patterns.md` § Batch operations, so the next unit rules from text rather than escalating.

**20. `.agents/orchestration.md:830-833` — the publish order was written down a second time, which the law forbids.**

`.agents/orchestration.md:832-833`: "Regenerate it before sequencing a cascade rather than trusting the copy in the tree, and never write a second order down somewhere else."

`.orkestrel/campaign/npm-audit-deps-findings.md:729-732` writes one: "The republish order is the layer order from `layers.mjs`: L0 codec contract msg sse test; L1 abort budget csv emitter html indexeddb ndjson sqlite timeout tool; L2 console database form markdown middleware pool process reason router table template websocket; L3 browser guide interpret lsp mcp qualifier queue rater relation scaffold sea server terminal workspace; L4 brief probe program worker workflow; L5 agent; L6 ollama toolbox." `.orkestrel/campaign/fix/handoff.md` records a per-package publish layer as well (`npm-audit-deps-findings.md:714-715`). The campaign used a derivation instrument rather than the named `scaffold catalog` mechanism, which is consistent with the law's spirit; recording its output is not.

**Class: Orchestration-contract refinement.** State in § Publishing the fleet that a wave over unpublished tips derives its order per run from the graph and records only which round each package landed in, never the order itself.

INSTRAUDIT OBJECTIVE: 20 findings
