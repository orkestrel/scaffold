# Unit CL12 brief 2 — the fix round round 1 forced

Effective over `cl12-brief.md`, which stays in place unedited. Follow that brief for every section
this one does not change — in particular its implementation-over-prose ruling, which still binds.

## Role and engine

`sol` on Astra, the sole writer in the Veneer checkout at `C:/Users/mikes/WebstormProjects/veneer`.
Round 1 was written by Opus 5, so this round goes to an engine that did not write it.

You are the bench engine reading this brief inside your own CLI: perform the assignment directly and
spawn nothing. Do not commit, push, install a dependency, or run a destructive command. Do not run
`git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. The working tree carries round
1's authored work; that is the subject, not drift. The Orchestrator lands it.

## What round 1 settled

Round 1's guide edits are **accepted** but for two sentences. Both audit lanes confirmed the nine added
token rows against the built cascade, the corrected compatibility row, the Files rows, the tests links,
the raised-surface replacement, and the deferral subsections' shipped prose.

**Reopen none of that.** Add no row, and run no style pass.

## Where the facts are

**This brief states rulings and obligations. It restates no measurement.** Every measured fact lives in
`./tmp/units/cl12-fix-terrain.md`. Read it first. If this brief and that record disagree, the record and
the tree win, and you stop and report the disagreement rather than resolving it.

Its section "What is NOT wrong" exists so you do not repair what is already right.

## Obligation 1 — the sentence the cascade falsifies, forcing

The terrain record names the paragraph, shows what the cascade actually does, and carries a corrected
sentence an audit lane supplied.

Take that sentence or write one whose facts match the cascade reading. **Check yours against the five
media rules in the record, not against the sentence you are replacing.**

The record flags one clause it did not measure. **Measure it before shipping it.**

## Obligation 2 — the half-true justification, forcing

The terrain record names the sentence and names the stronger fact that is actually true. Correct it so
a maintainer testing the reason against the table's first row finds it holds.

## Obligation 3 — four report corrections

The guide is right on all four; round 1's **report** overstates. The terrain record states each
correction. **Carry them in your own report** so a successor reading the campaign record is not
misled. Change no guide text for them.

One has forward consequence and must be stated plainly: the completeness gate round 1 recommended
cannot fail for the thing it exists to catch, and the terrain names the correction.

## Unknowns

- **Whether the fluid clause in the supplied sentence is true.** Named in Obligation 1. Measure it.
- **Whether correcting the justification sentence changes what any reader parses.** Search before
  editing; the record establishes only one reader exists and which table it reads.

**Settled: the `prove` tool is not reachable from a bench unit here.** Settle any claim with executed
readings, say no receipt was issued, and do not represent a test reading as one.

## Scope

**Owned:** `guides/veneer.md` and `guides/README.md`. No new file is granted.

**Off-limits:** everything else. Six files open this guide — the conformance setup module, the parity
gate, the styles setup module, and three proofs that call the readers with no argument and so default
to the guide's path. Every one is off-limits. **Round 1's brief named three of the six; this is the
corrected population.**

If a correction would require changing code, stop and report. Leave every compatibility row's
granularity alone.

## Execution

The gate chain, in order: `npm run format:check`, `npm run lint:check`, `npm run check`,
`npm run build`, `npm test`. Then `npm run test:guides`, `npm run test:conformance`, and
`npm run test:policy` as separately reported readings — the last because this unit writes authored
Markdown and that project sweeps it for banned terms.

**Run the chain after your final edit and say so.** An audit lane raised a freshness question about
round 1's gate logs, which all timestamp inside two minutes while two instruments carry later
modification times. Your report must make the order unambiguous.

On this host, heredocs, `node -e`, `node -p`, `&&` chaining, and any argument carrying `${...}` trip
the approval classifier: write a program to a file and invoke the file, one plain command per call.
PowerShell turns npm's stderr notices into error records, so read the native exit code.

`tmp/` is expected to be dirty and is not in your scope.

## Output

1. Each corrected sentence, with the cascade reading behind it.
2. The fluid clause: what you measured.
3. The four report corrections, stated in full.
4. Each Unknown, with what you found.
5. The gate chain's exit codes and final result lines, with the order relative to your last edit stated
   explicitly.
6. `git diff --stat` and `git status --porcelain --untracked-files=all`, actual output.
7. Anything you could not close.

No process diary.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle within your own scope: the exact wording of each
corrected sentence and where it sits. Stop and report if this brief and the terrain record disagree, if
a correction would require a code change, if the fluid clause measures false, or if correcting either
sentence would reach a reader.

## Acceptance criteria

Cheap first.

1. `npm run format:check` and `npm run lint:check` exit 0.
2. `npm run check` exits 0.
3. `npm run build` exits 0.
4. `npm run test:guides` exits 0.
5. `npm run test:conformance` exits 0.
6. `npm run test:policy` exits 0.
7. The container paragraph's every factual clause matches the built cascade, including the fluid clause.
8. The status lists only the two files this brief owns.

**Observations, not criteria.** `npm test` whole, reported with your own reading; the authoritative run
is the Orchestrator's after you exit.
