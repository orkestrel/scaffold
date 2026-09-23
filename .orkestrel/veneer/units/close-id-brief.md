# Unit CLOSE-ID (`ci`) — the noun after the `id` token in the check specimens' doc block

## Role and engine

`builder` on Sonnet (native Claude subagent), sole writer in `/home/user/veneer-ci` (a worktree
detached at `7398772`, the session branch tip after F7b CAPTION-SPECIMEN landed and folded, with
`node_modules` installed and `dist/` built by the Orchestrator). Perform the assignment directly
and spawn nothing. Use absolute paths under `/home/user/veneer-ci` for every command and file, and
run every npm and npx command from `/home/user/veneer-ci`. Run
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
first in every shell. Do not commit, push, install, run `corepack use`, or run `git checkout`,
`git restore`, `git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

The `FORM_CHECK_SPECIMENS` doc block in `app/browser/constants.ts` gives the `id` token its noun, and
the gates in § Acceptance criteria are green.

## Context

**Evidence.** `grep -n 'is unique to the showcase' app/browser/constants.ts` at `7398772`:

```text
1042: * by, and each `id` is unique to the showcase so a label names one control. The checked, disabled,
1652: * label's text as its name, and each `id` attribute is unique to the showcase so a label names one
```

The first hit is the `@remarks` paragraph of `FORM_CHECK_SPECIMENS` (around line 1041); the second
is the corrected `FORM_LABEL_SPECIMENS` block B-FORMS-LABEL-SHOW landed, which is the form to match.
The paragraph today (around lines 1041-1044):

```text
 * Each control carries a label of its own, so every one announces a name the journey can reach it
 * by, and each `id` is unique to the showcase so a label names one control. The checked, disabled,
 * and switch states are declared in the markup, so each renders at rest and needs no drive; the
 * mixed state has no attribute, so the resting checkbox is the one a journey marks mixed.
```

The roadmap row (`ROADMAP.md` § Carriers, opening "The `FORM_CHECK_SPECIMENS` doc block") carries
this edit under B-PASSIVE-CLOSE's token-noun sweep; `.claude/rules/writing.md` § Code tokens rules
that a code token is followed by a noun.

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{writing,typescript}.md`.
Skill: none. Guide: none (report-only).

**Installed primitives.** None touched. **Host.** Linux, bash, `/home/user/veneer-ci`.
**Measurements.** Read the paragraph before editing. **Control identifiers.** CLOSE-ID is this
brief's label. **Standing conditions.** The tree is clean at `7398772`.

## Unknowns

none.

## Scope

**Owned.** `app/browser/constants.ts` (the `FORM_CHECK_SPECIMENS` doc block only),
`tmp/units/ci-report.md`. **Shared (report-only).** `guides/veneer.md`, `ROADMAP.md`.
**Off-limits.** Every other file and every other line of `app/browser/constants.ts`.

**What asserts the state this change ends.** Nothing behavioural; the format check and the type
check read the file.

**Tools and limits.** Read, Grep, Glob, Edit, Bash under the host limits.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Write `tmp/units/ci-report.md`: `git diff` and `git status --short`, each criterion with its
command and result line. Return the same content as your final message.

## Deviation contract

§ Deviation protocol in `/home/user/scaffold/.agents/orchestration.md`. Stop and report on the
quoted paragraph not found. Decide, record, and carry on for the rewrap at 100 columns.

## Acceptance criteria

1. The paragraph reads "each `id` attribute is unique to the showcase so a label names one
   control" in place of "each `id` is unique to the showcase so a label names one control", with
   every other word unchanged and the paragraph rewrapped at 100 columns inside its ` * ` frame;
   `git diff --stat` shows this file alone.
2. `npx oxfmt --check app/browser/constants.ts`, `npm run format:check`, `npm run lint:check`, and
   `npm run check` exit 0.

## Review evidence

The diff against `7398772`, the status, and this report.
