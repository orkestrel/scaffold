# Unit S2 audit — subjective lane

## Role and engine

`reviewer` — Opus 5, native Claude subagent, clean context, holding the **subjective** lane.

Another subagent holds the objective lane in its own clean context, blind to you. Do not rule on
correctness questions it owns; where you notice one, note it in a sentence and refer it.

## Objective

Rule on every claim in `tmp/audit/s2-audit-claims.md` from the subjective lane: shape, naming,
ergonomics, design fit, and the prose a developer reads.

The generated `vite.config.ts` is a product surface. Every workspace this generator creates ships
it, and its reader is a developer changing their own package's configuration. Judge it as that
reader.

## What this lane owns beyond the claims

- **The merge a developer must predict.** The selection now compares base and override lists
  separately. Rule on whether a developer can predict the result from the emitted comment alone,
  without reading the body. Name what the comment still does not say.
- **The body itself.** The selection's inline guard chain repeats a long predicate for the base
  entry and the candidate. Rule on whether that reads as one idea, and whether it belongs in a named
  helper under this repository's own rules.
- **The comment that replaced the seal, and the showcase comment.** Rule on whether each teaches the
  reason or merely asserts it.
- **Vocabulary.** `replacements`, `used`, `selected`, `candidate`, `base`, `override`. One concept,
  one term. Rule on drift, and on whether any name states a judgment rather than what it holds.
- **The relocation.** The showcase literal moved from the compiler into the template file. Rule on
  whether the template file now reads as one coherent document, and on where its explanatory comment
  landed.
- **What a fix round did to the test files.** Rule on whether the added cases read as proofs of the
  rule or as transcriptions of the implementation.

## Context

- Checkout: `C:\Users\mikes\WebstormProjects\scaffold`. Windows host.
- Read `AGENTS.md` — § Design laws, § Non-negotiable rules, § Writing — then
  `.claude/rules/names.md`, `rules/architecture.md`, `rules/tests.md`, `rules/writing.md`,
  `rules/documentation.md`.
- The claim list names every piece of evidence.
- An independent verifier runs the gate chain in parallel. Do not run `npm run build`,
  `npm run format`, or any lint `--fix`.
- The working tree is dirty by design.

## Scope

Read-only. Your tools are `Read`, `Grep`, and `Glob`. You cannot write a file and you are not asked
to: **your final message is your report.** Do not attempt to write one.

## Execution

Perform this audit directly. Spawn nothing.

## Output

1. **Per-claim verdicts** — number, verdict, and the evidence that decides it.
2. **Findings** — each with its severity and what it costs the reader of a generated workspace.
3. **What this lane owns beyond the claims** — a ruling per item.
4. **One terminal line** — `VERDICT: ACCEPT` or `VERDICT: REJECT`, and nothing after it.

No process diary.
