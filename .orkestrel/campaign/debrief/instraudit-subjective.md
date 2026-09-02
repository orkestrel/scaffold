# Instruction-set audit — subjective lane (verbatim, 2026-09-02)

Lane: **SUBJECTIVE**. Engine substitution: the GPT-5.6 Sol bench is dark (`codex` absent from `PATH`, probed 2026-09-02), so Opus 5 held this lane and the objective lane ran as a separate blind `reviewer` on the same engine — the substitution the engine-assignment table requires.

## Coverage against `instruction-audit.md` § The subjective lens list

- **Role-job singularity** — covered. Read every charter in `/home/user/scaffold/.claude/agents/` and every mirror in `/home/user/scaffold/.codex/agents/`. No charter bundles jobs no dispatch sends whole; `orkestrel`'s charter-plus-catalog bundle is authorized by `.agents/orchestration.md` § Roles and is not a finding.
- **Charter voice against dispatched usage** — covered. Read each charter as an executor reads it, then against the fix-round, breaking-phase, and voice-wave dispatches and verdicts. Findings 1, 3, 5.
- **Lane-swap residue** — covered. Sol was dark for the whole campaign, so every round is a swap round. Findings 1, 2, 4, 5, 9, 11.
- **Bridge minimalism** — covered. All nine `.claude/skills/*/SKILL.md` bridges carry only the frontmatter, the `# Load the canonical workflow` heading, the canonical path, and the no-independent-process sentence. `CLAUDE.md` adds only Claude-Code mechanics. No finding on this lens; finding 3 is a gap in `CLAUDE.md`, not an excess.
- **Vocabulary drift across mirrored files** — covered, including the brief's § Unknowns targets (`names.md` vocabulary text, the inflected-sweep rule, the renamed browser style helpers in `tests.md`). Findings 7, 8, 9, 10, 11.
- **Skill-family seams** — covered. Naming axis, load-authority order, reference depth, and contract boundary across all nine canonical skills. Findings 2, 4, 6.

## Findings

### 1. `.claude/agents/reviewer.md:31` and `:57-60` forbid the lane the charter's own swap clause assigns

The charter carries a swap clause at `.claude/agents/reviewer.md:17-21`: "When the Sol bench is dark the dispatch may assign you the **objective** lane instead — correctness, constraints, and what the code and contracts actually permit. Hold whichever perspective the dispatch names, **in full**."

Two later clauses revoke it. `.claude/agents/reviewer.md:31`: "Audit the changed work **only** through Opus 5's subjective and creative lens". `.claude/agents/reviewer.md:57-60`: "Correctness, security, dependency constraints, test sufficiency, and mechanical conformance belong to the independent Sol analyst and checker. If you notice a possible objective defect, report it as a specifically evidenced **referral** rather than adjudicating it." Neither is conditioned on the swap.

The record shows the campaign ran against these clauses continuously, not occasionally. `/home/user/scaffold/.orkestrel/campaign/fix/units/contract-audit-verdict.md:3` reads "Bench: Sol dark; **both reviewer lanes** on the writer's engine (Opus 5) in clean contexts, told so", and that objective `reviewer` adjudicated correctness outright at `:31-33`: "F3 the `#unavailable()` guards are the only legal narrowing of `Map | undefined` fields → not dead; F4 the cycles sit above the leaf pair with hoisted bindings → no hazard". That is precisely the adjudication `:57-60` forbids, performed by the role the charter forbids it to.

The second half of `:58` is separately false under the standing condition. The referral is addressed to "the independent Sol analyst" — a role that did not exist for this campaign's entire duration (`npm-audit-deps-findings.md:10`: "GPT-5.6 Sol | Dark | The `codex` binary does not resolve").

**Refinement class:** Charter refinements. Condition `:31` and `:57-60` on the default lane — "when you hold the subjective lane" — and replace the "Sol analyst and checker" addressee at `:58` with the lane names (`the objective lane when it is running, the Orchestrator when you hold every lane`) so the referral has an addressee under a dark bench.

### 2. `.agents/orchestration.md:339` makes a one-lane audit round the default, while `:70` and `orkestrel-falsify/SKILL.md:80` make it a deviation

`.agents/orchestration.md:339` reads: "Run the second lane when the first returns FAIL, when the subject is a rendered or externally driven surface, or when the unit's claims span both correctness and shape."

`.agents/orchestration.md:70` reads: "**A required lane always runs.** Never collapse required lanes into one. Never let an engine's absence stand in for a required lane." `.agents/skills/orkestrel-falsify/SKILL.md:80` reads: "A round run with one lane is a deviation. Record it rather than glossing it."

An executor cannot satisfy both. The campaign resolved it toward `:339` and the objective lane ran in **none** of the voice wave's units: a search for `objective lane did not run` over `/home/user/scaffold/.orkestrel/campaign/voice/units/` matches all 48 verdict files. Worse, the trigger `:339` names fired and was not honoured. `/home/user/scaffold/.orkestrel/campaign/voice/units/voice-agent-audit-verdict.md:10` reads "1. BROKEN — two rewritten first sentences change meaning rather than voice", while `:4` of the same file reads "the objective lane did not run (the subjective lane **held meaning** and the checker found no code token moved)". The recorded reason is contradicted by the verdict it sits on, and the sentence is boilerplate: `/home/user/scaffold/.orkestrel/campaign/voice/units/voice-sse-audit-verdict.md:4` carries it verbatim.

The plan wrote a narrower trigger than the contract's — `/home/user/scaffold/.orkestrel/campaign/voice/plan.md:37`: "The objective lane (`analyst` → Opus `reviewer` holding it) runs when the subjective lane returns FAIL on meaning (claim 1)" — which no instruction authorizes a plan to do.

**Refinement class:** Orchestration-contract refinements. Rewrite `:339` so the single law is one sentence: the second lane runs by default, a round that runs one lane records the deviation `orkestrel-falsify/SKILL.md:80` names, and the recorded reason states the round's own outcome rather than a template.

### 3. `CLAUDE.md:21` leaves the Workflow model pin unstated, and the rule that fixed it lives only in the campaign file about to be pruned

`CLAUDE.md:21` reads: "Use the aliases `opus` and `sonnet`. Never use a fixed Claude model ID and never use `inherit`." `CLAUDE.md:12` reads: "Use a Workflow for a deterministic fan-out, staged pipeline, or loop. Serialize writing nodes." Between them a reader concludes the role file's `model:` pin carries into a Workflow node. It does not.

`/home/user/scaffold/.orkestrel/campaign/npm-audit-deps-findings.md:263-266`: "The audit round's `checker` lane launched with `agentType: 'checker'` and no explicit model. The role file pins `model: sonnet`, but the Workflow tool's custom-agent path does not apply the frontmatter pin and the lane inherited the session model instead — a Fable subagent, which the routing rules forbid (`CLAUDE.md` § Models: never `inherit`)."

The correction was stated as binding: `:269-270` reads "Standing rule for every later workflow **in this campaign**: every `agent()` call names its model alias explicitly, whatever the role file says." A grep of `CLAUDE.md` for `agent(`, `frontmatter`, or `model alias` returns only `CLAUDE.md:30`, an unrelated line, and `.agents/orchestration.md` names no Workflow model rule at all. `.agents/orchestration.md` § Dispatch anatomy requires the opposite: "Land a process rule stated as binding mid-campaign in the owning rule or contract file in the same commit that states it. A campaign artifact is evidence, never a rule's home."

This is the most dangerous open item in the set. The failure is silent — a lane on the wrong engine returns a normal-reading verdict — it already produced a same-engine audit lane once, and the only written cure is scoped "in this campaign" inside a file the debrief's retention step deletes.

**Refinement class:** Orchestration-contract refinements, in the `CLAUDE.md` harness bridge that owns Claude-Code dispatch mechanics. Add to `CLAUDE.md` § Models: every Workflow `agent()` node names its model alias explicitly, because the Workflow custom-agent path does not apply a role file's `model:` pin, and a node that omits it runs on the session model.

### 4. `instruction-audit.md:10-11`, `:27`, and `:50` bind the lens lists to roles that cannot hold them under a dark bench

`.agents/skills/orkestrel-debrief/references/instruction-audit.md:10-11` reads: "`reviewer` holds the subjective lane and `analyst` holds the objective lane." `:27` reads "Held by `reviewer`" and `:50` reads "Held by `analyst`", each declared "the lens list's only normative home".

In Claude Code `analyst` is a bridge driver — `.claude/agents/analyst.md:3` describes it as "Claude-side driver for the GPT-5.6 Sol `analyst` route ... Analyses nothing itself and endorses nothing", with `model: sonnet` and `effort: low`. When the Sol bench is dark it cannot hold a lens list at all. Every sibling document in the audit family carries a swap clause — `.claude/agents/reviewer.md:17-21`, `.claude/agents/planner.md:21-25`, `.agents/skills/orkestrel-falsify/SKILL.md:78-81`, `.agents/orchestration.md` § Engine assignment — and this reference is the one that does not.

This bit the present round. The dispatch had to invent the substitution itself: `/home/user/scaffold/tmp/units/instraudit-brief.md:8` reads "the **objective** lane, held by `reviewer` holding the objective perspective, because the GPT-5.6 Sol bench is dark". A debrief is by construction the last act of a campaign, so it meets whatever bench state the campaign ran under — the case this reference does not cover is the common one.

**Refinement class:** Skill refinements. Replace the role names at `:10-11`, `:27`, and `:50` with the lane names, and add one sentence routing engine assignment to `.agents/orchestration.md` § Engine assignment rather than restating it.

### 5. `.claude/agents/planner.md:31-38` gives the objective lane no return shape, and the campaign's objective design lane filed its work under the subjective lane's heading

`.claude/agents/planner.md:21-25` assigns the objective lane under a dark bench. The return shape at `:31-38` names only subjective artifacts: "`Design`: the coherent API, vocabulary, architecture, and user experience", "`Alternatives`: at most two real alternatives and why the design wins", "`Tensions`: the choices your lane made on judgment".

The breaking-phase design round ran both lanes as `planner` (`npm-audit-deps-findings.md:350-352`: "a subjective lane and an objective lane, each a `planner` role on Claude Opus 5 with a clean context"). The residue is legible in the artifact. `/home/user/scaffold/.orkestrel/campaign/fix/design-objective.md:3-5` reads:

> ## Design
>
> I held the OBJECTIVE lane (correctness, constraints, and what the code and contracts actually permit). The Sol bench is dark, so Opus holds every lane; this is the objective one and I did not drift to shape or taste except where a rule fixes the answer.

The lane's actual product — measured facts that overturned the plan's premise, at `design-objective.md:13-19` — sits under a heading named for the other lane's deliverable, and the lane spent its opening sentence saying so. This is exactly the residue `instruction-audit.md:39-40` describes.

**Refinement class:** Charter refinements. Give `.claude/agents/planner.md:31-38` the objective lane's sections beside the subjective ones — constraints and what the code and contracts permit, refusals with their rule text, and the measurements that bound the design — so a swapped lane files its work under a heading that names it.

### 6. `orkestrel-falsify/SKILL.md:127-149` fixes a shape with no slot for what the round attacked and could not break, so every round invented one

`.agents/skills/orkestrel-falsify/SKILL.md:129-130` states the purpose: "Every auditor in every round returns exactly this, and nothing else. One shape makes rounds comparable; a round that invents its own cannot be read against the last one." The shape admits numbered per-claim verdicts, findings fitting no claim, and one terminal line.

`.claude/rules/quality.md` § Rounds and verdicts obliges the auditor to return something the shape has no slot for: "Name the claims you could not break either way, so the next round knows what has already been attacked." `orkestrel-falsify/SKILL.md:184-185` adds a second: "**Bound every finding**: state what is _not_ broken, and why the adjacent behaviour that looks the same is correct."

Every lane obeying both invented its own vocabulary, and the vocabularies differ. `/home/user/scaffold/.orkestrel/campaign/voice/units/voice-sse-audit-verdict.md:22-34` uses four coined labels — `REQUIRED (tied to claim 2)`, `RETAINED, no change`, `OBSERVATION`, `COVERAGE`. `/home/user/scaffold/.orkestrel/campaign/voice/units/voice-agent-audit-verdict.md:22` uses "Required changes:" and `:38` "Referrals to the Orchestrator". `/home/user/scaffold/.orkestrel/campaign/fix/audit-1-verdict.md:12` uses a fifth, "**reviewer, claim misapplied s08-16:**". Three rounds against one instruction set, three shapes, and the stated reason for fixing the shape is defeated.

**Refinement class:** Skill refinements. Add one named section to `orkestrel-falsify/SKILL.md` § Verdict shape between the numbered verdicts and the terminal line — the bounded set: what the round attacked and could not break, and what looked adjacent and is correct — so the obligation `quality.md` states has a slot the shape names.

### 7. `.claude/rules/names.md:119-120` bans a wire member's own name and supplies no mechanism, so the executor that hit it could only stop

`.claude/rules/names.md:119` licenses the external wording: "An option key, constant, or member that transliterates an external protocol field, format field, or engine pragma keeps the external wording in this project's casing". `.claude/rules/names.md:120` withdraws it for two words: "Mirror no banned word: a mirrored name never uses `kind` or `type` as a member name" — and offers as its only worked case a byte that can be renamed freely, "A Compound File Binary (CFB) directory entry's object-type byte takes a named discriminant."

A declared wire body cannot take that path without a projection, and the rule names none. The ollama unit hit exactly this and had nowhere to go. `/home/user/scaffold/.orkestrel/campaign/fix/units/ollama-audit-verdict.md:27-28` reads: "the wire member `type: 'function'` on `WireChatRequest` against the vocabulary's \"never `type` as a member name\" clause (objective F2) is a `names.md` question for scaffold, recorded in the findings file rather than changed here". The campaign register carries the same open question at `npm-audit-deps-findings.md:686-689`, naming the two mechanisms the rule would have to choose between: "as an exception for declared wire bodies or as a serialization projection the package owes".

**Refinement class:** Rule additions, one law each. Extend `.claude/rules/names.md:120` with the wire case: a declared outbound or inbound wire body keeps the external field name including `type`, and the package's own domain type takes the named discriminant with a projection between them — or state the opposite and name the projection helper. Either ruling closes it; the absence is what stopped the unit.

### 8. The inflected-sweep rule the campaign declared binding on `.agents/templates/brief.md` never landed there

`/home/user/scaffold/.orkestrel/campaign/npm-audit-deps-findings.md:483-484` records it as landed: "**Process rule landed:** an old name's inflected forms hide from a bare word-boundary sweep (`execs` against `\bexec\b`), so **the brief template and the audit claim generator require** a second, case-insensitive sweep over `-s`, `-ed`, `-ing`."

`.agents/templates/brief.md` carries no such row. A grep for `inflect`, `-ing`, and `case-insensitive` over `/home/user/scaffold/.agents/` returns nothing. The only landing anywhere in the set is `.claude/rules/writing.md:110` — "Sweep case-insensitively and across inflections when checking prose against the preceding table" — which governs a different subject: prose against the substitution table, not a symbol rename against a consumer tree. The template's nearest row, § Scope "What asserts the state this change ends" at `.agents/templates/brief.md:89-95`, tells the writer to derive the set by running the suite and says nothing about the sweep that misses an inflected old name.

The scanner defect from the voice wave has the same shape and the same non-landing: `npm-audit-deps-findings.md:780-781` — "The first classifier read a hyphenated verb (`Re-arms`, `Re-enqueues`) as imperative".

**Refinement class:** Root-reference trims plus one rule addition. Add one line to `.agents/templates/brief.md` § Scope: a rename's search bound names the case-insensitive inflected sweep over `-s`, `-ed`, and `-ing` beside the word-boundary sweep — and leave `.claude/rules/writing.md:110` owning the prose case alone, so the two subjects do not read as one rule with two homes.

### 9. The set has no term for a lane that was runnable and not dispatched, so a lane reached for `dark` and made the record say the bench failed

`/home/user/scaffold/.orkestrel/campaign/voice/units/voice-agent-audit-verdict.md:38` reads: "Referrals to the Orchestrator (**the objective lane is dark**)".

The objective lane was not dark. Opus was live, `reviewer` could hold it under `.claude/agents/reviewer.md:17-21`, and `voice/plan.md:37` had already named the substitute. The lane simply was not dispatched. `dark` is reserved vocabulary in this set: `.agents/orchestration.md` § Execution loop fixes it to a bench that cannot round-trip — "Record a bench live only on a bounded round-tripped model call that came back". Using it for an undispatched lane tells the next reader the bench failed, which routes them into the recovery ladder for a condition that never existed.

The set supplies no correct word, which is why the lane coined one. `AGENTS.md` § Design laws requires one concept, one term; this is a concept with no term.

**Refinement class:** Orchestration-contract refinements. Fix the term in `.agents/orchestration.md` § The adversarial pass — a lane the round did not dispatch is **not run**, `dark` names a bench alone — and require the verdict file's recorded reason to use it, so `:339`'s record obligation cannot be discharged in bench vocabulary.

### 10. `orkestrel-falsify/SKILL.md:144` cites a requirement the Claude `analyst` charter does not carry

`.agents/skills/orkestrel-falsify/SKILL.md:144` reads: "`NOT-EVIDENCED` is the token the `analyst` and `reviewer` charters already require; it is kept, not re-invented."

Half of that is true. `.claude/agents/reviewer.md:52` requires it: "mark what the portfolio cannot show as NOT-EVIDENCED instead of inferring it". `.claude/agents/analyst.md` contains the token nowhere — a grep for `NOT-EVIDENCED` across the repository's Markdown returns no hit in that file — and it structurally cannot, because `.claude/agents/analyst.md:3` charters a driver that "Analyses nothing itself and endorses nothing" and returns only "the brief path, the resolved command, and the journal path" (`:57`). The sentence is true only of the Codex mirror, `.codex/agents/analyst.toml:29-30`, where `analyst` is the native Sol lane. The skill names neither harness, so a Claude-Code reader checking the citation finds nothing and cannot tell whether the token or the charter is wrong.

**Refinement class:** Root-reference trims. Cut the provenance clause at `:144` to the harness-neutral fact — the token is the auditing lanes' — or name the Codex-side native charter it actually describes.

### 11. `.codex/agents/reviewer.toml:13-18` drops the swap clause and the lane declaration its Claude twin requires

`.claude/agents/reviewer.md:17-21` obliges the role to hold whichever lane the dispatch names and to "say which one you held", and the campaign's verdicts rest on that line — `/home/user/scaffold/.orkestrel/campaign/voice/units/voice-sse-audit-verdict.md:10` reads "Lane held: SUBJECTIVE (voice, wording, meaning kept, guide voice), Claude Opus 5, Sol bench dark", which is how a reader of that file knows the substitution was honoured.

The Codex-side driver enumerates the brief's requirements at `.codex/agents/reviewer.toml:13-18` — the verdict shape, `file:line` evidence, referrals, the capture portfolio — and names neither the lane assignment nor the lane declaration. A round driven from Codex therefore produces a verdict with no recorded lane, and `instruction-audit.md` § Mirror discipline names that gap directly: "An unmirrored refinement is a new drift seeded on purpose." `.codex/agents/planner.toml:16-17` carries a partial echo ("or for the Orchestrator to rule when one engine holds every lane"); `reviewer.toml` carries none.

**Refinement class:** Charter refinements, mirrored. Add to `.codex/agents/reviewer.toml`'s brief requirements the two clauses its twin fixes: the dispatch names the lane, and the returned verdict states which lane it held.

INSTRAUDIT SUBJECTIVE: 11 findings
