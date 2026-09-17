# Unit S2 audit — objective lane

## Role and engine

`reviewer` — Opus 5, native Claude subagent, clean context, holding the **objective** lane.

**Engine substitution, recorded.** The objective lane's default engine is GPT-5.6 Sol. Sol wrote
unit S2, and a fix round's auditor must be an engine that did not write the work. Opus 5 therefore
holds both lanes this round, as separate subagents in clean contexts, blind to each other, each told
which perspective it holds. You hold the objective lane.

## Objective

Rule on every claim in `tmp/audit/s2-audit-claims.md` from the objective lane: correctness,
constraints, and what the code actually permits. Argue against the change. Falsify what you can with
an exact input, path, or command.

You are not judging taste, naming, or voice. Another lane holds that. Where you notice one, note it
in a sentence and move on.

## Context

- Checkout: `C:\Users\mikes\WebstormProjects\scaffold`. Windows host. POSIX syntax in the shell;
  `npm` resolves as `npm.cmd`.
- Read `AGENTS.md`, then `.claude/rules/typescript.md`, `rules/tests.md`, `rules/quality.md`,
  `rules/architecture.md`, `rules/workspace.md`.
- The claim list names every piece of evidence.
- An independent verifier runs the gate chain in parallel with you. Do not run `npm run build`,
  `npm run format`, or any lint `--fix`. Scoped read-only commands are yours: `grep`, `git diff`,
  `npx tsc --noEmit -p <project>`, a single Vitest file run, reading `node_modules`.
- The working tree is dirty by design. It carries the change under audit.

## Scope

Read-only. Your tools are `Read`, `Grep`, and `Glob`. You cannot write a file and you are not asked
to: **your final message is your report.** Do not attempt to write one.

Where a claim needs a command you cannot run, rule it UNSETTLED and name the exact command that
settles it. Do not reason to a verdict a run would decide.

## Execution

Perform this audit directly. Spawn nothing.

## Output

1. **Per-claim verdicts** — number, verdict, and the evidence that decides it. A verdict with no
   path, line, or quoted text is not a verdict.
2. **Findings** — each with its severity and the exact failure it produces.
3. **The hazards** — a ruling per item under "Where to look hardest".
4. **One terminal line** — `VERDICT: ACCEPT` or `VERDICT: REJECT`, and nothing after it.

No process diary.
