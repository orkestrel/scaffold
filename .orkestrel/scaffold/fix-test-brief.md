# Unit FX2 — fix round on `@orkestrel/test`

## Role and engine

`implementer` on Opus 5, native Claude Code subagent, standing in for the Sol implementer (Codex
bench dark). Sole writer in `C:\Users\mikes\WebstormProjects\test`. Perform the assignment
directly and spawn nothing.

## Objective

Close the audit round's findings against the package: the unprefixed build rejection, the stale
skill name, the untranscribed flagship fence, and the recorded reason for the reading's name.

## Context

Law: `AGENTS.md`, `.claude/rules/typescript.md`, `.claude/rules/tests.md`,
`.claude/rules/documentation.md`. TTTDD with a failing proof first. Host: Windows 11, Git Bash;
Playwright Chromium installed.

## Findings carried

- **F6.** `executeScenarios` (`src/core/helpers.ts`) awaits `build(scenario)` outside
  `executeScenario`'s try, so a rejected builder propagates with no transition name and no `cause`.
  Prefix it the way a phase failure is prefixed (`${transition.name}: build refused: ${message}`,
  or the shape the existing phase voices use), with the original as `cause`; correct the `@throws`
  clause; correct `guides/test.md` 1752–1755. Failing proof: a builder that throws for one named
  row; record the command red then green.
- **F1.** `guides/test.md` 1205 names `orkestrel-human-journey`; the skill is
  `orkestrel-prove-journey`. Rename; sweep the checkout for the stale name.
- **Flagship fence.** The `readClasses` / `extractStyles` fence at `guides/test.md` 2335–2351
  prints values that `tests/guides.test.ts` does not transcribe. Transcribe it and assert every
  printed value, in the file's existing pattern.
- **F5.** Record in the guide, beside the `extractStyles` row or in § Limits, that the reading is
  named for what it returns rather than `extractEscapes` because `escape` carries the encoding
  sense in `@orkestrel/html` and `@orkestrel/console`. One sentence.

## Scope

**Owned.** `src/core/helpers.ts`, `tests/src/core/helpers.test.ts` (or the file that covers the
runner), `guides/test.md`, `tests/guides.test.ts`, `README.md` only if the guide transcription
requires it. **Off-limits.** Every other file; `package.json`; version; commits; no
`git checkout`/`restore`/`stash`/`reset`/`clean`.

## Output

Write `tmp/units/fix-test-report.md` and return it: each finding's edit, the red-then-green
command and counts, `git diff --stat`, `git status --porcelain`, scoped gates (`format:check`,
`lint:check`, `check`, `test:src:core`, `test:guides`, `test:policy`), claims not closed.

## Acceptance criteria

1. The build-rejection case is red before and green after, with the row name in the message and
   the original as `cause`.
2. The flagship fence is transcribed and green; the stale name is gone from the checkout.
3. Scoped gates green.
