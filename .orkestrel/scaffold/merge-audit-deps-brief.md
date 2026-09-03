# Unit M1 — reconcile the audit-deps branch into main

## Role and engine

`implementer` on Opus 5, native Claude Code subagent. Sole writer in
`C:\Users\mikes\WebstormProjects\test`. Perform the assignment directly and spawn nothing.

## Objective

Resolve the in-progress merge of `origin/claude/orkestrel-npm-audit-deps-14ibta` into `main` so
that both sides survive: the branch's source audit (renames, TSDoc voice, breaking rows, canon
adoption, dependency updates) and main's campaign (the statechart runner, the markup and frame
readers, the resolver, build-refusal, viewport, and capture fixes, the 0.0.12 bump).

## Context

The Orchestrator ran `git merge --no-commit --no-ff origin/claude/orkestrel-npm-audit-deps-14ibta`
on `main` at `7ef64b8`. The merge base is `95fcf3a`. Conflicted (`UU`): `guides/test.md`,
`package-lock.json`, `package.json`, `src/browser/constants.ts`, `src/browser/types.ts`,
`src/core/helpers.ts`, `tests/src/browser/helpers.test.ts`, `tests/src/core/helpers.test.ts`.
Auto-merged and staged: `configs/browsers.ts`, `src/browser/factories.ts`,
`src/browser/helpers.ts`, `src/core/factories.ts`, `src/core/types.ts`, `src/server/*`,
`tests/guides.test.ts`, `tests/src/browser/factories.test.ts`, `tests/src/server/helpers.test.ts`.
Read the branch's nine commits (`git log --oneline main..origin/claude/orkestrel-npm-audit-deps-14ibta`)
and main's ten (`git log --oneline origin/main..main`) before touching a file, so each side's
intent is known.

Law: `AGENTS.md`, `.claude/rules/typescript.md`, `.claude/rules/tests.md`,
`.claude/rules/documentation.md`, `.claude/rules/names.md`. Host: Windows 11, Git Bash;
Playwright Chromium installed.

## Rules for the resolution

- Keep every rename the branch made (`resolveColor` to `parseCSSColor` and any other) and apply
  it to main's additions where they call the renamed symbol. Keep every addition main made and
  every fix's proof.
- Where both sides edited one TSDoc or guide passage, take the branch's voice and main's facts.
- `package.json`: the union, at the newer range where both moved a pin, with `version` `0.0.12`.
  Leave `package-lock.json` conflicted; the Orchestrator regenerates it with `npm install` after
  your report. Do not run `npm install`.
- `guides/test.md`: every export the merged tree publishes has its row; every fence transcribed
  in `tests/guides.test.ts` or routed through `ROUTED_FENCES` still prints what the merged code
  returns.
- Auto-merged files are not exempt: read each for a silent semantic clash (a helper the branch
  removed that main's code calls, a type the branch narrowed that main's addition widens).
- Never run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, `git merge
  --abort`, or `git commit`. Edit the files in place; leave the index to the Orchestrator.

## Output

Write `tmp/units/merge-audit-deps-report.md` and return it: per conflicted file, what each side
wanted and what the resolution keeps; every renamed, removed, or added export in the merged
surface (the skills' references and terrain's suite cite these names and must follow); scoped
gates after the resolution with the lockfile still conflicted (`npm run format:check`,
`npm run lint:check`, `npm run check`; the test projects only if the runner tolerates the
conflicted lockfile, else say so); `git status --porcelain`; claims not closed.

## Deviation contract

Stop and report when the two sides cannot both survive in one file (a contract the branch
removed that a campaign proof depends on), naming both intents. Decide and record wording and
ordering.

## Acceptance criteria

1. No conflict marker remains in any file but `package-lock.json`.
2. `npm run check` and `npm run lint:check` green on the merged sources; `format:check` green.
3. The report lists every surface change so the Orchestrator can carry it to the skills and to
   terrain.
