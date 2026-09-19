# Unit M2 — close the lint sites the 0.0.72 policy widening exposed

## Role and engine

`opus` — Opus 5, native Claude subagent, the **roughnotes** checkout at
`C:\Users\mikes\WebstormProjects\roughnotes`, sole serial writer. No other unit is live.

## The state you inherit

The tree carries uncommitted work across a target visit and unit M1. **Do not revert any of it, and
run no `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.**

Unit M1 migrated this workspace onto the scaffold 0.0.72 configs group. The regenerated
`.oxlintrc.json` promotes `policy/no-malformed-summary` and `policy/no-banned-term` to top-level
rules. The 0.0.63-era configuration carried neither, so both reach `tests/**` for the first time and
`npm run lint:check` exits 1 with 37 errors.

These are real defects in this workspace's own prose that the stale configuration was hiding. They
are not regressions introduced by M1.

## Objective

Make `npm run lint:check` exit 0, by correcting the prose at each site rather than by changing any
configuration.

## The rule you are conforming to

`.claude/rules/typescript.md` § Comments and API documentation states it:

> The first sentence states what the symbol does in the third person with an `-s` verb — `Creates`,
> `Returns`, `Checks whether` — and never repeats the symbol's name.

That same rule names the trap you must not fall into:

> A word ending in `s` that the rule's stop set does not name passes whether or not it is a verb — a
> plural noun such as `Files` included — so read the sentence in review as well.

**Satisfying the linter is not the objective. Writing the correct sentence is.** A summary opening
with a plural noun passes the gate and fails the rule. Do not reach for one.

Most sites are constants rather than functions. A constant still takes a third-person verb that says
what it does for the reader: `Names the…`, `Holds the…`, `Lists the…`, `Matches the…`, `Fixes the…`.
Choose the verb that is true of that constant, not one verb applied everywhere.

`.claude/rules/writing.md` and `AGENTS.md` § Writing govern the prose you write. Keep every
sentence's existing substance — you are changing its opening and its shape, never deleting what it
tells the reader.

## The sites

Retained in full, with line numbers, at
`.orkestrel/roughnotes/m1-instruments/m1-offlimits-lint.txt`. Read that file first.

- `tests/app/browser/setup.ts` — 36 `policy(no-malformed-summary)` errors.
- `tests/app/browser/App.test.ts:33` — one `policy(no-banned-term)` error: the word `just` inside the
  doc block that starts at that line. `.claude/rules/writing.md` substitutions rule it `Delete`.

Line numbers shift as you edit. Re-run the linter to re-derive them rather than working down the
retained list positionally.

## Standing conditions — do not chase these

- **`npm test` exits 1 and will still exit 1 when you are done.** One case in the vendored
  `tests/config.test.ts` file fails: `configuration helpers > reads the compiler scope and fixed
  extractor override a declaration roll-up requires`. It throws `The workspace declares no face
  project` because it resolves `configs/src/tsconfig.*.json` and this workspace has no `src` axis.
  That is a defect in the scaffold package's vendored test, it predates this release, and it is
  outside your scope. Do not edit that file and do not work around it.
- `scaffold audit` reports `vite.config.ts` stale. That is by design — the file carries this
  workspace's journey fan-out, which the plan does not know about.

## Scope

**Owned files:** `tests/app/browser/setup.ts` and `tests/app/browser/App.test.ts`.

**Off-limits — every other path.** Named explicitly because `scaffold repair` restores them and an
edit there is reverted without warning: `tests/config.test.ts`, `tests/policy.test.ts`,
`tests/setupPolicy.ts`, `configs/helpers.ts`, `configs/policy.ts`, `.oxlintrc.json`,
`.prettierignore`, `guides/`, `.claude/`, and `.orkestrel/`. Also off-limits: `vite.config.ts`,
`package.json`, `app/`, and every other file under `tests/`.

Never silence a rule. No `eslint-disable`, no `oxlint-disable`, no suppression comment, and no
configuration edit. `AGENTS.md` bars all of them.

Do not commit, push, install a dependency, or bump a version.

## Host facts

- Windows. POSIX syntax in the Bash tool; `npm` resolves as `npm.cmd`.
- Write any multi-step command to a script file and run the file. A heredoc, a `node -e`, or an
  `&&` chain trips the shell's approval classifier and stalls an unattended run.
- The built CSS asset is 323.24 kB and must stay there.
- A `deprecat` line in a build or test run is a regression.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

Ordered cheap-first.

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0. Report the exact output.
3. `npm run check` exits 0.
4. `npx vitest run --project app:browser` passes, with its counts reported.
5. `npm run test:journey` collects four journey projects and passes, with its counts reported.
6. No summary you wrote opens with a plural noun, and none repeats its symbol's name. List every
   summary you changed, as its old opening and its new one, so this is checkable without the diff.
7. `git status --short` shows no path outside your owned list that you modified.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol. Stop and report where a site cannot be
corrected without editing an off-limits file, or where the rule and the sentence's meaning conflict.

Settle these yourself and record the choice: which verb each summary takes, how a sentence is
reshaped around its new opening, and where a clause moves inside the block.

## Output

Write your report to `tmp/units/m2-report.md`, and make your final message the same content: done or
not done per criterion, the old-opening-to-new-opening list, anything you could not close, and any
site where you judged the rule's letter and the sentence's truth to pull apart.

No process diary.
