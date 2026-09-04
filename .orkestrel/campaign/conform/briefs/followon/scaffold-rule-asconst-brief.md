# Unit scaffold-rule-asconst — the single-literal field exemption in the `as const` rule

## Role and engine

`builder` on Claude Sonnet (native Claude Code subagent; a fully specified one-sentence rule edit with its regenerated inventory), the sole writer in `/home/user/scaffold` for the files this brief owns. Perform the assignment directly and spawn nothing. The Orchestrator commits campaign records under `.orkestrel/**` by path while this unit runs; never touch `.orkestrel/**` or `tmp/**` other than the report, never stage, never commit, never push.

## Objective

`.claude/rules/typescript.md` § Types states that a class field holding one literal keeps `as const`, because the vendored lint gate's `typescript/prefer-as-const` rule refuses the annotated form, and the vendored host inventory reflects the changed file.

## Context

The ruling this carries (`/home/user/scaffold/.orkestrel/campaign/conform/ledgers/followons.md`, the agent-obj-9 row): the ruled form `readonly code: 'ABORT' = 'ABORT'` for a single-literal error field is refused by `oxlint --config .oxlintrc.json --deny-warnings` with `typescript(prefer-as-const): Expected a `const` assertion instead of a literal type annotation`, while every sibling package's `code` is a union of two or more literals where the rule never fires; `npm run lint` (the mutating converge step) rewrites the annotated form back to `as const` on its own. The rule sentence at `/home/user/scaffold/.claude/rules/typescript.md:28-31` reads: "`as const` annotates a literal with its own type and never overrides the checker, so the assertion ban does not reach it. Use it to derive a literal union from a value and to fix a tuple's arity and element types. Do not write it on a value whose contract is already declared; annotate the declaration instead." `AGENTS.md` § Instruction files: write every line as a directive; state the finding as the rule, never how it was found.

Standing conditions: `.claude/rules/typescript.md` is a vendored host file, so its bytes ride `dist/host` and `host.json` (the generated inventory `npm run build` regenerates through `build:inventory`); the canon audit rows (`AGENTS.md`, `CLAUDE.md` stale; `.codex/**`, `.cursor/**` foreign) are the canon repository's own shape and not this unit's subject. `node_modules` is installed and current; never run `npm install`, `npm ci`, or any command that rewrites it or the lockfile; never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Two sibling units run in `/home/user/fleet/ollama` and `/home/user/fleet/toolbox` beside you, so report a timing failure with its reading rather than diagnosing it. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm test`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff --stat`, `grep -rnE <pattern> <paths>`, `ls`, `cat`, `sed -n`.

## Sites and edits

- `.claude/rules/typescript.md:28-31`: after "annotate the declaration instead.", add one sentence in the rule's own voice: "A class field that holds one literal keeps `as const` (`readonly code = 'ABORT' as const`): the vendored lint gate's `prefer-as-const` rule refuses the annotated form, and a field whose type is a union of literals is annotated as the preceding sentence states." Keep the bullet's wrapping at the file's line width; run the formatter on the file.
- `npm run build`, so `dist/host` and `host.json` carry the changed file; read `git diff --stat` and confirm `host.json` changed for that one storage entry (`claude/rules/typescript.md`) and nothing else.
- Report: write `/home/user/scaffold/tmp/units/followon/scaffold-rule-asconst-report.md` with the sentence as written, the `host.json` delta, and each gate's exit code.

## Scope

Owned: `.claude/rules/typescript.md` (the one sentence), `host.json` (regenerated, never hand-edited), the report. Off-limits: every other file, `dist/**` included (it is untracked build output).

## Execution

Perform every step yourself; spawn nothing.

## Output

Return, as your final message: the sentence before and after with `file:line`; `git diff --stat`; the exit codes of `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, and `npm test`. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when `host.json` changes for more than the one entry, when a gate reddens on anything but a timing failure you report with its reading, or when the rule sentence does not read as this brief quotes it.

## Acceptance criteria

1. `grep -n 'prefer-as-const' .claude/rules/typescript.md` returns one line inside the `as const` bullet.
2. `git diff --stat` lists `.claude/rules/typescript.md` and `host.json` alone.
3. The gates exit 0.
