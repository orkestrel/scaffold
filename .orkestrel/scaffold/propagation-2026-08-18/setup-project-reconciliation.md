# Reconciliation: the `setup` cross-cutting project

Both lanes ran on one brief (`tmp/setup-project-brief.md`) and returned independently.

Routing ledger: the objective lane ran natively on GPT-5.6 Sol (journal
`tmp/codex/setup-project-sol.jsonl`, thread `01a015ac-a03b-7161-9af2-b7c577a37865`). The subjective
lane was Opus 5's, and Opus was recorded dark after three consecutive 529 failures (15:56, 16:20,
16:47 UTC 2026-08-18), so the surviving engine ran it as a second blind dispatch per the
substitution table (journal `tmp/codex/setup-project-subj.jsonl`). The user directed the
substitution ("Use Sol for now to clean up until Opus 5 is back").

## The ruling

**Fork A — register a conditional `setup` cross-cutting project.** Both lanes chose it
independently. Both rejected Fork B on the same ground: every existing project has a fixed subject
the setup proof would violate. Both rejected Fork C as disproportionate: it severs one target from
the fleet permanently to avoid a matrix row the canon's own export-and-test law already implies.

## Points of agreement, adopted

- The project registers **only when** a root file matches `tests/setup*.test.ts`, exact-case. An
  unconditional empty project is forbidden — Vitest exits non-zero on "no test files found".
- When registered: the project collects every matching root file exactly once, a `test:setup` script
  exists, and `test` invokes it.
- When not registered: no project, no script, and generated output for every existing selection is
  byte-identical to today's.
- Rule rows land in both `.claude/rules/tests.md` (proof subject) and `.claude/rules/workspace.md`
  (project registration), one home per rule.
- A manifest that names `setup` while no matching file exists stays refused — the fail-closed
  behavior `src/bin/CLI.ts:716-725` already produces falls out of conditional registration and gets
  a pinning test.

## Points of difference, resolved

- **The objective lane requires a `Blueprint` structural fact** (`readonly setup: boolean`) consumed
  by both the root-config generator and the scripts generator, so registration, script, and gate
  reachability stay atomic; a runtime-only conditional in the generated `vite.config.ts` would fool
  the project validator. **Adopted** — it is the stronger mechanism and matches how `bin` already
  works (`src/core/types.ts:170`).
- The subjective lane's rule wording is tighter in the mirror rule; the objective lane's is tighter
  in the workspace directives. **Merged texts are fixed in the implementation brief verbatim.**
- The subjective lane's extra directive against duplicating production behavior in setup proofs and
  the objective lane's directive against relocating setup assertions into other cross-cutting
  proofs do not conflict. **Both adopted, one sentence each.**

## Risks accepted, carried from the lanes

- `Blueprint` is public API: the field owes type, guide, parser, guard, compiler, and parity
  updates in the same change.
- Registering the category does not endorse every assertion in ollama's 558-line proof; the
  adequacy audit still rejects any helper proof that reimplements production behavior.
- A future browser-shaped setup proof may need a separate project-shape ruling; this ruling does
  not pre-design it.
