I held the **subjective** lane. Coverage: role-job singularity; charter voice against dispatched usage; lane-swap residue; bridge minimalism; vocabulary drift across mirrored files; skill-family seams; the contract-versus-skill boundary. I read the whole of `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.agents/orchestration.md`, every `/home/user/scaffold/.claude/agents/*.md`, every `/home/user/scaffold/.codex/agents/*.toml`, the canonical skills' frontmatter plus `orkestrel-debrief`, `orkestrel-falsify` and their references, and the record files under `/tmp/claude-0/-home-user-scaffold/44b44986-60fe-5808-9e54-b88ca82b9390/scratchpad/debrief-record/`.

---

## 1. The audit step names `checker` and never `reviewer`, so the subjective audit lane has no dispatch name — and the record shows it was not used

`/home/user/scaffold/.agents/orchestration.md:323-327`:

> 5. **Audit adversarially.** Audit every nontrivial implementation with at least one lane whose engine did not write it. Run another lane when the first returns FAIL... Dispatch `checker` when the acceptance criteria are mechanical — counts, paths, parity rows, scope honesty.

`checker` is the only role the audit step names. `reviewer` and `analyst` appear nowhere in it. The design step names its lanes explicitly (`:304-305` "`planner` for the subjective lane and `analyst` for the objective lane"); the audit step does not, and the one name it does supply is the cheapest, most mechanical lane in the roster.

The record follows the wording, not the plan. `d2d-reconciliation.md:83` planned "Audits: Sol-written units by reviewer (Opus); Opus-written units by analyst (Sol)." Every audit the record names by role names `analyst` or `checker`: `plan.md:198` "Checker audit dispatched with both reconciliations named"; `plan.md:207-208` "SD2-FIX-2 closed: checker PASS on every claim"; `plan.md:161` "landed and checkpointed a4ebf3c after a checker PASS"; `plan.md:133-134` "W2 closed (checker PASS…)"; `plan.md:241-243` "Checker audit: FAIL on one finding". No entry in the record names `reviewer`. SD2-FIX-2 is a Sol-written unit the d2d plan assigned to `reviewer` and the campaign sent to `checker`.

Why it matters as design: the contract's own § The engines says "Opus 5 | Subjective design, design-fit review, implementation" (`:29`). The loop then routes design-fit review of judgment-bearing work — API shape, prose, guide voice — to a sonnet-low conformance lane, because that is the only name the step offers. The subjective half of the audit pass has a charter, a file, and no door.

**Refinement class: process.** In step 5, name the lanes the way step 2 does: `reviewer` for the subjective lane, `analyst` for the objective lane, and `checker` *in addition* when the criteria are mechanical — never in place of a lane.

---

## 2. `checker`'s charter fixes an output contract the audit round forbids, and forbids the judgment the record shows it exercising

`/home/user/scaffold/.claude/agents/checker.md:40-46`:

> ## Output contract — the Checklist
>
> - **Verdict** — PASS or FAIL.
> - **Checklist** — item → met / not met → evidence (file:line or grep output).

and `:38`: "No judgment calls: anything that needs one gets flagged 'needs the reviewer' rather than guessed at."

`/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md:129-130`: "Every auditor in every round returns exactly this, and nothing else. One shape makes rounds comparable; a round that invents its own cannot be read against the last one." That shape carries `UNRESOLVED` and `NOT-EVIDENCED` and one terminal line `VERDICT: PASS — <m> of <m> confirmed`. `checker.md` names neither the skill, the shape, nor the escape clause `reviewer.md:51-52` and `analyst.md:38-42` both carry.

The record shows the charter losing: `plan.md:207-208` "checker PASS on **every claim**" — per-claim verdicts the charter's shape has no slot for. And the judgment ban failed in the same rounds: `plan.md:162-165` "The checker's extraction question on the reachability walk was ruled against extraction: a recursive spine belongs to a private method per the leaf test"; `plan.md:244-245` "The checker's red-first reservation closed against the primary record". Those are design and evidence judgments, correctly raised, that the charter tells the role to refuse.

Compare `.codex/agents/checker.toml:14-16`, which carries the same stale shape: "Return only PASS/FAIL, the evidence checklist, re-dispatchable failures, and reviewer questions." The drift is mirrored, so both sides are wrong together.

**Refinement class: charter (mirrored).** Give `checker` the same clause `reviewer` and `analyst` carry: when the dispatch states numbered claims, return the `orkestrel-falsify` verdict shape and its terminal line; the Checklist stays the shape for a criteria-only dispatch. Keep the judgment ban but change its address — a judgment question is a **referral**, the term `reviewer.md:76-78` already owns, not a second vocabulary ("needs the reviewer").

---

## 3. Two owners for the prune, with different gates, different names for one folder, and only one of them naming the path

`/home/user/scaffold/.agents/orchestration.md:450-451`:

> Prune the campaign folder in a commit at acceptance. The tree ends clean and the record stays recoverable by hash.

`:455-456`: "Pruning is deletion, so it needs the same evidence as any other destructive step. Run these checks, and prune only when every one closes." — then Carry, Promotion, Measurement, Orientation checks.

`/home/user/scaffold/.agents/skills/orkestrel-debrief/SKILL.md:46-47`:

> - **The ledger is ephemeral.** Fold every surviving truth into its destination, then delete the folder on the owner's explicit go-ahead — never silently, never as residue.

`:87-89`: "9. **Dispose.** Present the disposition map … and delete the ledger only on the owner's explicit go-ahead."

Three divergences, all live. The gate differs: the contract prunes when four mechanical checks close; the skill prunes on the owner's consent, and names no checks. The noun differs: "campaign folder" against "ledger" — and "ledger" is already the contract's word for three other things (`:99` routing ledger, `:307` routing ledger, `:462` carry ledger), plus the record's flip ledger (`plan.md:102`) and propagation ledger (`d2d-reconciliation.md:84`). The path differs by absence: `orkestrel-debrief/SKILL.md` never writes `.orkestrel/` anywhere, so an executor running the skill has no directory. `AGENTS.md` § Instruction files states the law being broken: "Give a rule one home. Restating it elsewhere creates a duplicate that drifts, and an agent reading the stale copy is following this file."

**Answer to the brief's question — one skill or a debrief reference: a reference, not a sibling skill.** A prune has no trigger of its own. It fires when a campaign closes, and every honest `Use when…` sentence a `orkestrel-prune` skill could carry is the debrief's sentence. The cost of putting it only in the debrief is that most campaigns accept without a debrief, and that path must still reach the procedure. Resolve it as one home with two doors: create `.agents/skills/orkestrel-debrief/references/retention.md` holding the whole procedure — the four checks, the artifact locations, the `tmp/` sweep, the promotion record commit message, the consent gate — named from `SKILL.md` step 9; shrink `.agents/orchestration.md` §§ Where campaign artifacts live and Before you prune to the trigger, the `.orkestrel/<package>/` path, and one pointer at that reference. Settle the gate in the reference: the four checks close it and the owner's go-ahead authorizes it, in that order.

**Refinement class: skill-refine + process.**

---

## 4. A fifth of the always-loaded contract is a procedure with one reader at one moment

`## Publishing the fleet` runs `/home/user/scaffold/.agents/orchestration.md:797` to `:1017`, ending where `## Acceptance laws` begins at `:1018`, in a 1039-line file. `/home/user/scaffold/CLAUDE.md` imports it with `@.agents/orchestration.md`, and four charters instruct their executor to read it first. So `builder`, `verifier`, `scout`, and every bridge driver load the npm approval-window doctrine — `:938-979` "Reaching the approval", `:980-1017` "Spending the window" — on every dispatch, including dispatches in repositories that publish nothing.

The right test for the boundary is the **reader**, not "procedure versus law":

> A line stays in the contract when an executor who is *not* doing that thing is worse off without it. A line becomes a skill when it fires on a named trigger and its reader is one agent at one moment.

Ruling on the parts the brief names:

- **Release wave, preparing, reaching the approval, spending the window (`:797-1017`) → `orkestrel-publish` skill**, with `references/wave.md` and `references/window.md`. The contract keeps only what binds someone who is not publishing: publishing is the user's decision and the user's credential, never a substituted token; a publish chain is a long-running command; the layer order derives from the catalog table rather than from a written order. Everything from `--browser=false` to the fifo stdin law to the `403 GET /-/v1/done` reading is one agent's checklist at one moment.
- **Prune → the debrief reference in finding 3.** Not a skill.
- **Bench recovery (`:785-796`) → stays contract, trimmed.** It binds every bridge, it is short, and the exact commands already live in `grok.md:28-45` and `codex.md:144-156`. Keep the ladder and the "never substitute an API key" law; the recovery mechanics are already role-owned.
- **Execution loop and campaign close (`:278-354`) → stays contract.** Acceptance is the one thing the contract says can never be delegated (`:1030` "Final acceptance belongs only to the Orchestrator"), and a skill is by definition loaded on a trigger the Orchestrator chooses — which is the wrong shape for the rule that constrains the Orchestrator.
- **Check the brief before you send it → stays contract, and needs a different fix.** See finding 5.

**Refinement class: skill-create + process.**

---

## 5. The brief preflight is an essay, and its recurring failure is non-execution, not non-loading — so more prose cannot fix it

`## Check the brief before you send it` runs `/home/user/scaffold/.agents/orchestration.md:519-605`: bare bullets, no order, no artifact, most of them a paragraph in which the rule sits in the middle. `:594-600` opens with its rule and then spends six lines on rationale. `AGENTS.md` § Instruction files — which names `.agents/*` as its subject — states the form being broken: "Write every line as a directive… Cut any clause written to persuade, reassure, or explain the rule to a person. An agent needs the rule and its trigger, not agreement with it."

The decisive evidence is that the laws for the campaign's failures were already there, verbatim, for those exact cases:

- `:585-593` "Scope a change by the files its result makes **false**… Grant a behaviour and the tests that pin it together" — and `plan.md:101-102`: "SD1 (scaffold classifiers): landed f9deb6e after a deviation stop granted `templates.test.ts` (the file pinned the reversed behavior)".
- `:566-570` "Grant both halves of a template change where the package generates the configuration it runs on" — and `plan.md:126-127`: "SD7 closed (the writer stopped on the brief's withheld materialized half…)"; `plan.md:218-219`: "my brief withheld the materialized half the byte-identity pin couples".
- `:601-604` "Scope a unit that changes a mechanism to own the prose describing that mechanism… name the carrier that takes it" — and `plan.md:165-167`: "the guides parity gate reds on the undocumented `guardStage` export — the PD2-FIX brief scoped the guide out without naming a carrier, the Orchestrator's recorded miss".
- `:559-562` the regeneration-before-parity exception — and `plan.md:104-106`: "host.json regenerated after the guide edit (stale digests briefly broke the CLI suite — brief omission recorded)".
- **Context** § "State every standing condition the same way" (`:493-497`) — and `plan.md:69-71`: "the exec sandbox denied loopback listeners so the writer could not run the suite… the brief's failure to name that documented bench limit is the Orchestrator's recorded miss", against `codex.md:76-78` which documents that limit.
- `:563-565` "Ask what the change will do to the facts you just measured" — and `plan.md:127-129`: "The scaffold whole-tree verifier sweep caught one pin the scoped runs never reached — the Materializer-level twin of the flipped CLI test still expecting whole-manifest byte identity".

Every one of those laws was in context when the brief that broke it was written. The section is not under-specified; it is unexecutable, because a judgment stated as prose leaves no place where its omission is visible.

**Refinement class: process.** Replace the essay with an artifact: a brief template file the Orchestrator fills, whose scope block has named rows the writer cannot leave blank — `Owned`, `Shared (report-only)`, `Off-limits`, `What asserts the state this change ends`, `Standing conditions the executor will hit`, `Criteria in cheap-first order`. Keep in the contract a short imperative preflight naming each check and its trigger; move the rationale to the debrief record or delete it. The omission then shows as an empty row rather than as an unread paragraph.

---

## 6. `planner`'s charter says "Return only" with no escape clause, so the instruction audit's own dispatch conflicts with the lane's charter

`/home/user/scaffold/.claude/agents/planner.md:21-29`:

> Return only:
>
> - `Design`: … `Alternatives`: … `Units`: … `Tensions`: … `Risks`: …

`/home/user/scaffold/.claude/agents/reviewer.md:51-52` carries the clause that makes a charter survive a differently-shaped round:

> return the `orkestrel-falsify` verdict shape and its single terminal line unless the dispatch names a different skill that fixes one.

`.claude/agents/analyst.md:38-42` and `.codex/agents/analyst.toml:21-24` carry it too. `planner.md` does not. And `/home/user/scaffold/.agents/skills/orkestrel-debrief/references/instruction-audit.md:20-22` fixes a third shape for the subjective lane:

> Each lane returns numbered findings, most severe first, and exactly one terminal line: `INSTRAUDIT <LANE>: <n> findings`.

This dispatch is the demonstration: my charter is `planner`'s body verbatim, and it forbids the shape the brief requires. I obeyed the dispatch, per `.agents/orchestration.md:9` "The user's current instruction. It wins over every later item." A lane obeying its charter would have returned a Design section instead, and the round would have produced nothing readable.

**Refinement class: charter (mirrored to `.codex/agents/planner.toml`).** Give `planner` the same clause. Separately, `instruction-audit.md` should state which role holds each lane; `reviewer` is the charter that already accepts a named alternative shape, and the subjective instruction-audit lane belongs there rather than at `planner`.

---

## 7. The authority pointer is inverted across the roster: cheap drivers must read the contract, high-effort lanes get a parenthetical, and `planner` gets nothing

Read the contract first — the four bridge drivers, all `model: sonnet, effort: low`:

- `.claude/agents/codex.md:10` "Read `.agents/orchestration.md` first."
- `.claude/agents/grok.md:10` "Read `.agents/orchestration.md`, `AGENTS.md`, the applicable rules…"
- `.claude/agents/sol.md:14` "Read `.agents/orchestration.md` first."
- `.claude/agents/analyst.md:14` "Read `.agents/orchestration.md` first."

A parenthetical, not an instruction — every native lane: `implementer.md:11`, `builder.md:11`, `checker.md:11`, `reviewer.md:11`, `verifier.md:11`, `scout.md:11`, `researcher.md:11`, `application.md:11`, each of the form "in this project's role set (see .agents/orchestration.md)".

No mention at all — `planner.md`. A grep of `.claude/agents/` for `orchestration.md` returns every role file except `planner.md` and `orkestrel.md`.

`planner` is the case that bites. Its charter asks for "`Units`: bounded work, each naming its role AND engine so the routing ledger is derivable" (`planner.md:25-26`). Role names, engine assignments, and the routing ledger are defined in exactly one place — `.agents/orchestration.md` §§ The engines, Roles, Engine assignment — which its charter never names. The lane that produces the routing ledger is the one lane not told where the vocabulary lives.

**Refinement class: charter (mirrored).** Use one form. Either every charter reads the contract first, or none does and the dispatch supplies the slice; the current split reads as an accident rather than a decision. At minimum, `planner` gains the pointer, because its output is written in the contract's vocabulary.

---

## 8. Bridge minimalism is stated as law in one pair of bridges and broken in the others

`/home/user/scaffold/.claude/agents/sol.md:18-21` states it plainly:

> `.claude/agents/codex.md` owns the Sol transport contract in full… **Read it and follow it.** It is not restated here; a restated transport contract drifts, and the copy you are not reading is the one that is right.

`analyst.md:20-23` says the same. Then the roster restates anyway:

- `grok.md:70-72`: "Logs and briefs under `tmp/cursor/` are ephemeral unit evidence owned by the Orchestrator. Never commit them and never delete them yourself; the Orchestrator sweeps them at campaign acceptance." — owned by `.agents/orchestration.md:781-784` (Bench laws, "Ephemeral streams, durable records").
- `codex.md:158-162`: the same law again, for `tmp/codex/`.
- `scout.md:20-23`, `researcher.md:29-33`, `checker.md:14-16`: each restates the tedious-work ladder that `.agents/orchestration.md:104-123` owns, in three different wordings of one rule ("Reconnaissance belongs to Grok first", "research belongs to Grok first", "Conformance review belongs to Grok first"), each adding "a dispatch reaching you should already record why the benches above it were unavailable" — a fact about the dispatch, which the executor cannot check and the Orchestrator already owes.

I am not proposing retirement; `instruction-audit.md:52-58` warns against exactly that, and each of these roles carries a real context bundle. The defect is the restatement, not the role.

**Refinement class: charter (root-reference trim).** Each charter keeps only what is distinct to it and points at the owning section for the rest. The ladder position is a routing fact and belongs in the contract's ladder; the `tmp/` retention law belongs in Bench laws alone.

---

## 9. The bridge descriptions promise the engine's work while the bodies forbid the driver from doing it

`/home/user/scaffold/.claude/agents/analyst.md:3`:

> description: 'GPT-5.6 Sol objective analysis and correctness audit, reached by name rather than by a remembered route. Read-only: the adversarial objective design argument, diagnosis, correctness and constraint audit. Never implements, reconciles, or accepts.'

`:10-12`: "You are the named Claude-side bridge to the Sol `analyst`. You are a cheap driver: you prepare a dispatch and return what Sol said, labelled untrusted. You never analyse, judge, implement, or endorse the result yourself."

`sol.md:3` and `:10-12` have the identical split. The description is what the Orchestrator reads when choosing a route, and it describes a `gpt-5.6-sol` analyst; the frontmatter beneath it says `model: sonnet, effort: low`.

This is the exact failure the contract writes two separate laws to catch — `.agents/orchestration.md:503-511` ("a driver told to work directly answers from its own engine instead. That answer reads normal and its only tell is the missing journal") and Bench laws rule "Journal first" (`:757-765`, "a bench unit with no journal ran on its driver's engine, however normal its answer reads"). The charter's own first line is what makes that mistake attractive.

**Refinement class: charter.** Write the description as the driver's job — "Claude-side driver for the Sol `analyst` route: drafts the brief, resolves the exec command, returns the journal path and session id. Performs no analysis." Keep the engine name where it belongs, in the route it names.

---

## 10. The Roles table's Codex cell does not match the file on disk, and `implementer` names a different engine on each side

`.agents/orchestration.md` § Roles, the subjective-implementation row, gives the Codex role as "`implementer` route `opus`". The file is `/home/user/scaffold/.codex/agents/opus.toml:1-2`:

```
name = "opus"
description = "Claude Opus 5 implementation bridge — the subjective mirror of the Sol implementer."
```

It is a standalone role named `opus`, the exact mirror of `.claude/agents/sol.md`, and `.codex/agents/implementer.toml` carries no route field. The table describes a mechanism that does not exist, in the one section whose job is to let an agent "Reach every role by its own name. Do not rely on a remembered route."

Beneath it sits a deeper vocabulary problem: `implementer` denotes Opus on the Claude side (`.claude/agents/implementer.md:3` "Claude Opus 5 implementation…") and Sol on the Codex side (`.codex/agents/implementer.toml:2` "GPT-5.6 Sol implementation…"). The contract patches this with "Name the role and state its engine in every dispatch, even when the role file already pins it" — a rule that exists only because the name is ambiguous.

**Refinement class: process (+ role, mirrored).** Correct the cell to `opus`. Then rule on the ambiguity: either `implementer` always means "the harness's native implementation lane" and both bridges are engine-named (`sol`, `opus`) — which is the shape already on disk and worth stating as the rule — or the roles are renamed so one token never denotes two engines.

---

## 11. `.claude/agents/codex.md` is a transport contract wearing a role's frontmatter

`/home/user/scaffold/.claude/agents/codex.md:1-8` carries `name: codex`, a tool allowlist, `model: sonnet`, `effort: low`, and `permissionMode: default` — everything that makes a file dispatchable. Its own description ends "Never dispatched directly for work." `.agents/orchestration.md:170-172` agrees: "`codex` is the shared Sol transport contract, not a route."

So the roster contains an entry that is registered as a role, appears wherever roles are listed, and must never be called. `.agents/orchestration.md:159-161` justifies the placement — "Give every role a file on both sides. The role file is where engine, effort, tools, permissions, and charter are pinned" — but `codex` pins none of those for itself; it pins them for `analyst` and `sol`, which have their own files.

The vocabulary now covers three different things under one word: task lanes (`builder`, `verifier`), engine bridges (`sol`, `analyst`, `grok`), and a transport contract (`codex`, and `.codex/agents/claude.toml` on the other side).

**Refinement class: role.** Move the transport contracts out of the agents directory to `.agents/transports/codex.md` and `.agents/transports/claude.md`, referenced by name from the bridges that bind them, and keep `.claude/agents/` for things that can be dispatched. Where the harness requires the file to sit in the agents directory, say so in the file and strip the frontmatter to the minimum the harness demands.

---

## 12. Native units have no declared home for their brief and report, and the loop names an artifact no section defines

`.agents/orchestration.md:398` requires "Write the brief to a file under `tmp/`, named for its unit, before launching the unit, **whatever engine executes it**" and `:405-406` "Capture the unit's returned report to a file beside its brief under the same unit name". The bench bridges pin their directories — `codex.md:50` `tmp/codex/<unit>-brief.md`, `grok.md:47-49` `tmp/cursor/<unit>-brief.md`. For a native `implementer`, `builder`, `reviewer`, or `verifier` unit, no directory is named anywhere in the instruction layer.

The campaign invented them. `plan.md:113-114` "SD2-FIX brief staged (`tmp/units/sd2-fix-brief.md`)"; `plan.md:119-121` "Staged briefs (2026-08-24): sd2-fix, sd3-prepack-assertion… all under `tmp/units/`"; `d1-reconciliation.md:3` "the same brief (`tmp/design/d1-small-units-brief.md`)". A grep of the tree for `tmp/units` or `tmp/design` outside the record returns nothing; the only `tmp/` subdirectories the instruction layer declares are `tmp/codex/`, `tmp/cursor/`, `tmp/<bench>/`, and `tmp/probe/` (`.claude/rules/tests.md:109`, `.claude/rules/workspace.md:152`).

The same gap appears one level up: `.agents/orchestration.md:327` requires "Record in the round's verdict file when a lane or the checker did not run" — and no section defines what "the round's verdict file" is, where it lives, or what shape it takes.

**Refinement class: process.** Declare the convention beside the law at `:396-432`: `tmp/units/<unit>-brief.md` and `tmp/units/<unit>-report.md` for a native unit, the bench directories for a bench unit, and the round's verdict at `.orkestrel/<package>/<unit>-audit-verdict.md` — which is the name the record already used at `plan.md:159-160` ("Retained: `sd4-factories-brief.md`, `sd4-report.md`, `sd4-audit-brief.md`, `sd4-audit-verdict.md`").

---

## 13. The contract states the adversarial pass as absolute in one section and as optional in another

`.agents/orchestration.md:35`:

> - Design and audit always run the adversarial pass.

`:58-59`:

> The subjective lane and the objective lane run on every design round; an audit round runs the lanes the execution loop's audit step names, on the same clean-context terms.

`:323-324`: "Audit every nontrivial implementation with **at least one lane** whose engine did not write it."

`:66-67` then reads "**A required lane always runs.** Never collapse required lanes into one" — which is true under `:35` and vacuous under `:323`, because a single-lane audit has one required lane. A reader hitting `:35` first carries away a rule the loop does not enforce, and the record's audits are single-lane throughout.

**Refinement class: process.** Correct `:35` to match: "Design runs the adversarial pass. An audit runs the lanes its round names, with at least one whose engine did not write the work."

---

## 14. The skill family mixes two naming axes and holds one member outside its namespace

Subject skills take verb-noun: `orkestrel-harden-package`, `orkestrel-build-application`, `orkestrel-align-packages`, `orkestrel-polish-surface`, `orkestrel-human-journey`. Process skills take a bare verb: `orkestrel-falsify`, `orkestrel-debrief`. Nothing states the distinction, so the next skill's name is a coin flip — and this round proposes one (`orkestrel-publish`, finding 4).

`enterprise-bootstrap` sits outside the prefix entirely, and its description (`.agents/skills/enterprise-bootstrap/SKILL.md:3-12`) claims "ANY UI work", which reads as a broader trigger than `orkestrel-polish-surface`'s. From the names alone a reader cannot tell whether it is part of this system.

**Refinement class: skill-refine.** State the rule in `.claude/rules/documentation.md` § Workflow skills: a skill naming a subject takes `orkestrel-<verb>-<noun>`; a skill naming a process the Orchestrator runs takes `orkestrel-<verb>`. Rule on `enterprise-bootstrap` explicitly — rename it into the namespace, or record in the file why it stays outside — and bound its trigger against `orkestrel-polish-surface`.

---

## 15. `instruction-audit.md` states its own lanes asymmetrically, and this round's brief inherited the gap

`/home/user/scaffold/.agents/skills/orkestrel-debrief/references/instruction-audit.md:12-18`:

> - **Subjective** (design-fit engine): coherence of the role model, charter voice, whether each role's job is one job, whether the skill family reads as one system.
> - The subjective lenses, so the lane can state its coverage: role-job singularity; charter voice against dispatched usage; lane-swap residue; bridge minimalism; vocabulary drift across mirrored files; skill-family seams.
> - **Objective** (correctness engine): evidence-only sweeps of the actual files and the campaign record — the lanes below.

The subjective lane's lenses ride as a sibling bullet inside the lane list, breaking the list's parallelism, while the objective lane gets a full section of its own (`:27-47`) with each lane defined and bounded. The reference also fixes a verdict shape (`:20-22`) that no charter accepts — finding 6.

The consequence showed up immediately: the brief I received lists my lenses as "role-job singularity; charter voice against dispatched usage; bridge minimalism; vocabulary drift across mirrored files; skill-family seams" — **lane-swap residue is missing**, though the reference names it and says the list exists "so the lane can state its coverage". I ran it anyway (findings 6, 2, and the `.codex/agents/analyst.toml:11-14` lane-swap paragraph, which is correct and mirrored on `planner.md:15-19` and `reviewer.md:16-19`), but a lane holding only its brief would have dropped it silently.

**Refinement class: skill-refine.** Give the subjective lane its own section with each lens defined and bounded, matching § The objective lanes; name the role that holds each lane; and keep the lens list in one place so a brief that copies it copies all of it.

---

INSTRAUDIT SUBJECTIVE: 15 findings