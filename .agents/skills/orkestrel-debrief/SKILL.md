---
name: orkestrel-debrief
description: Convert a closed campaign's residue into portable truth through field evidence, a findings ledger, fix loops with live re-proof, canon refinement, and disciplined disposal. Use after a campaign or milestone closes to audit what was built and how it was built, when live field testing must precede judgment, when learnings must propagate into skills/rules/guides/scaffold, or when working ledgers must fold into canon and retire.
---

# Debrief a closed campaign

## Load authority

Read the current files in this order:

1. `AGENTS.md`.
2. Every applicable `.claude/rules/*.md`; the documentation and quality laws bind every
   ledger entry and every canon refinement this skill produces.
3. [field-testing.md](references/field-testing.md) before running or judging any live
   field pass.
4. `guides/README.md`, the governing guide for what the campaign built, and `ROADMAP.md`.

The user's current instruction wins. The debrief judges both the artifact and the process
that produced it; neither is exempt.

## The debrief laws

- **Use it before you judge it.** A debrief of a surface nobody drove is a review of
  intentions. Field evidence — real clients, real harnesses, goal-only prompts — precedes
  every finding about usability, and the field transcript is the evidence of record.
- **Evidence is verbatim or it is not evidence.** The ledger quotes exact commands, exact
  refusals, exact reasoning-trace lines. A paraphrase cannot be re-verified after the
  session that produced it is gone.
- **Every finding ends in exactly one bucket**: fix now; canon refinement (skill, rule,
  guide); promotion (package/library boundary move); stays as-is with the reason; or
  dropped on the record with the refuting evidence. A finding with no bucket is an
  unfinished debrief.
- **Fixes are re-proven by the class of evidence that found them.** A defect found by a
  live field pass is closed by a live field pass, never by the fix's own tests alone.
- **Portable versus resident.** Anything reusable beyond this repository — process
  doctrine, teaching-surface laws, harness knowledge — lands in the portable skill/rule
  set and propagates through the scaffold. Repository-specific truth lands in the guide.
  Forward-looking work lands in `ROADMAP.md`. Nothing load-bearing stays only in the
  ledger.
- **The ledger is ephemeral.** The debrief folder is a working file: fold every surviving
  truth into its destination, then delete the folder on the owner's explicit go-ahead —
  never silently, and never leave it as residue after its campaign.

## Run the round

1. **Scope.** Name the campaign(s) under debrief, the artifact surfaces involved, and the
   audiences that matter (human operators, frontier models, small models, external
   clients). State what evidence already exists and what must be produced live.
2. **Field passes.** Drive the artifact with representative real consumers per
   [field-testing.md](references/field-testing.md): goal-only prompts, no coaching, the
   tier ladder from frontier to the smallest model that matters, reasoning traces
   captured wherever the runtime exposes them. Record every pass verbatim in the ledger.
3. **Layer audits.** In parallel with the field passes, audit each layer the campaign
   touched: implementation boundaries (what belongs a layer down or in a published
   package), the process record (which dispatches failed, which laws were missing, where
   executors deviated), and the instruction set itself (agents, rules, skills — what
   confused an executor is a defect in the instruction, not the executor).
4. **Reconcile into the ledger.** Number the findings, attach verbatim evidence to each,
   and bucket every one. Confusion signatures from reasoning traces are findings about
   the artifact's teaching surface, not anecdotes — see the signature catalog in
   [field-testing.md](references/field-testing.md).
5. **Fix loops.** Dispatch fix-now findings as bounded units under the repository's
   engine contract, serialized, failing-first. After each round, re-run the field passes
   that found the class and record the delta. Iterate until the field tier that matters
   walks the surface unaided or the residual is proven to be consumer-floor, not
   artifact darkness — state which, with evidence.
6. **Canon refinement.** Write or revise the portable skills/rules the findings justify;
   update the guide for resident truth; update `ROADMAP.md` for forward work. Every
   retained finding names the artifact that now carries it.
7. **Propagate.** Land the portable set in the scaffold repository so every future
   project inherits it; run the scaffold's own gates before pushing.
8. **Dispose.** Present the ledger's disposition map to the owner: what folded where,
   what remains open. Delete the ledger only on their explicit go-ahead.

## Verdict shape

Each debrief round ends with one fixed report: the finding table (id, evidence pointer,
bucket, carrier), the field-pass scoreboard before and after, the canon delta (files
created or changed), and exactly one terminal line — `DEBRIEF: FOLDED` when every finding
has a carrier and the propagation is pushed, or `DEBRIEF: OPEN` with the blocking items.
