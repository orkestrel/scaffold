# Unit S1 audit — subjective lane

## Role and engine

`reviewer` — Opus 5, native Claude subagent, clean context. Read-only.

## Objective

Rule on every claim in `tmp/audit/s1-audit-claims.md` from the subjective lane: shape, naming,
ergonomics, design fit, and the feel the generated configuration presents to a developer who opens
a scaffolded workspace's `vite.config.ts` for the first time.

The generated file is a product surface. Every workspace this generator creates ships it, and its
reader is a developer changing their own package's configuration. Judge it as that reader.

## Context

- Checkout: `C:\Users\mikes\WebstormProjects\scaffold`. Windows host. POSIX syntax in the shell;
  `npm` resolves as `npm.cmd`.
- Read `AGENTS.md` — particularly § Design laws, § Non-negotiable rules, and § Writing — then
  `.claude/rules/names.md`, `rules/architecture.md`, `rules/workspace.md`, `rules/tests.md`,
  `rules/writing.md`, `rules/documentation.md`.
- The claim list, the diff, and the status output are named in `tmp/audit/s1-audit-claims.md`.
- An independent verifier is running the gate chain in parallel with you. Do not run `build`,
  `format`, or any lint `--fix`. Scoped read-only commands are yours to use.
- Standing condition: the working tree is dirty by design. It carries the change under audit.

## What this lane owns beyond the claims

- **The generated shape a developer reads.** `mergeOverride` is exported into every generated
  workspace. Rule on whether it earns its place there, whether its name says what it does, and
  whether a developer writing an override can predict its behaviour without reading its body.
- **The comment that replaced the seal.** The two inverted cases carry the reason the parameter is
  safe. Rule on whether a reader arriving cold learns why, or only that someone decided it.
- **Vocabulary.** `override`, `base`, `project`, `showcase`, `merged`, `selected`. One concept, one
  term. Rule on drift.
- **The wrapper's new voice.** `srcCore({ … })` replaced `mergeConfig(srcCore(), { … })`. Rule on
  whether the call now reads as what it does.
- **The test renames.** `config as configProject` and its siblings were taken to avoid a shadow
  warning. Rule on whether that is the right resolution or a symptom of a name that should change.

## Unknowns

- Whether any `guides/` prose describes the factory signatures or the wrapper merge shape. The unit
  reports none. Check it yourself; a generated surface that moved with no guide row is a parity
  question and it is yours to raise.

## Scope

Read-only. Write nothing in the checkout except your report at
`tmp/audit/s1-audit-subjective-report.md`. Run no `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`. Do not commit, push, install, or edit any file under `src/`, `tests/`,
`configs/`, or `dist/`.

## Execution

Perform this assignment directly. Spawn nothing.

## Output

1. **Per-claim verdicts** — the claim number, `CONFIRMED` / `REFUTED` / `UNSETTLED`, and the
   evidence that decides it.
2. **Findings** — each with its severity and what it costs the reader of a generated workspace.
3. **What this lane owns beyond the claims** — a ruling per item.
4. **One terminal line** — `VERDICT: ACCEPT` or `VERDICT: REJECT`, and nothing after it.

No process diary.
