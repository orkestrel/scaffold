# Unit conform-reason-fix2 — bring reason's report and its sweep capture to the tree

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer of the two files under § Scope. Perform the assignment directly and spawn nothing.

## Objective

Make `/home/user/scaffold/tmp/units/conform/conform-reason-report.md` and `/home/user/work/evidence/reason-proofs/sweeps.txt` state what the reason tree at `/home/user/fleet/reason` contains, closing the four report findings both round-2 audit lanes raised (objective F-6, F-7, F-8, F-9; checker F-1, F-3).

## Context

**Law.** `/home/user/scaffold/AGENTS.md` § Writing (never state a count over a growable set); `/home/user/scaffold/.claude/rules/writing.md`.

**Evidence.** The round-2 objective verdict and the round-2 checker verdict, quoted per row. The tree is the ground truth: `src/core/builders/managers/Collection.ts:64-69` returns whether the id existed and has no no-argument clear-all path; `src/core/helpers.ts:650-653` declares `subjectToFacts` returning `{ readonly facts: readonly Fact[]; readonly trace: readonly string[] }`.

**Host.** POSIX shell. Read with the Read and Grep tools; change files with the Edit and Write tools only. Bash is not needed; do not run npm, npx, or git. Never touch `/home/user/fleet/reason` itself.

**Standing conditions.** `tmp/` in the scaffold checkout is ignored by git, so `git status` shows nothing for the report; the acceptance criteria read the file contents instead.

## Unknowns

None. Every replacement is quoted.

## Scope

**Owned.** `/home/user/scaffold/tmp/units/conform/conform-reason-report.md`; `/home/user/work/evidence/reason-proofs/sweeps.txt`.

**Off-limits.** Everything else, including every file under `/home/user/fleet/reason`.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`. Never commit, stage, push, install, or run a git command.

## Rows

- **R2-1** (objective F-6, checker F-1). In the report at lines 247-249 (the paragraph beginning "Four rows call for re-propagation"), replace the whole paragraph with: `Every row that names \`guides/reason.md\` moved it. Copy the file verbatim into \`/home/user/fleet/{program,interpret,rater,qualifier,brief}/guides/reason.md\`.` Then read lines 326-328, which state that the sentence "now reads" that replacement; leave them once the replacement makes them true, and correct any line number they cite that the edit moved.
- **R2-2** (objective F-7, checker F-3). The report's § Sweeps (around line 344) states four fix-round patterns were "Appended to `sweeps.txt`", and the capture at `/home/user/work/evidence/reason-proofs/sweeps.txt` ends at its `\(default ` block (line 128) without them. Read the four patterns from the report's own § Sweeps and fix-round entries (the old manager `remove`/`clear` signatures, the old `subjectToFacts(subject: Subject, trace` signature, `factToArityKey(` call sites passing `source`, and `RuleResult` literals carrying `conclusion:`). Run each pattern with the Grep tool over the population the report names (`src/**`, `tests/**`, `guides/reason.md`, `guides/README.md`, `README.md` under `/home/user/fleet/reason`) and append one block per pattern to `sweeps.txt` in the file's existing format (`### pattern:` line, `### population:` line, then the hits or `no hits`), recording the real hits you read, including the two non-empty results the report rules as intentional. Do not paraphrase a pattern; copy it from the report.
- **R2-3** (objective F-8). Under the report's § Deviations (lines 255-300), add an entry: `reason-subj-11's operative form required \`Collection.remove\` to return whether the id existed and to add the no-argument clear-all path. \`src/core/builders/managers/Collection.ts:64-69\` implements the first only. The manager owns the per-item emit, so a \`Collection\`-level clear-all would be an uncalled internal path against \`AGENTS.md\` § Minimal public API; the alternative left open is to snapshot ids, delegate to a \`Collection.remove()\` clear-all, and emit per snapshotted id.`
- **R2-4** (objective F-9). At the report's line 29, the reason-obj-3 disposition note reads that `subjectToFacts` returns `readonly Fact[]`. Rewrite the note as: `\`subjectToFacts\` returns \`{ facts, trace }\` with both members readonly, landed with reason-obj-5 as one signature change.`

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `/home/user/scaffold/tmp/units/conform/conform-reason-fix2-report.md` with, per row, `applied` and the exact lines now at each edited site, plus the four appended sweep blocks verbatim; return the same content as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence — when a quoted line is not where the row says and no unambiguous equivalent exists, or when a pattern cannot be found in the report. Decide and record where a block sits within a section.

## Acceptance criteria

1. Grep `Four rows call for re-propagation` over the report returns no hit, and the replacement sentence appears once.
2. `sweeps.txt` ends with four new `### pattern:` blocks whose patterns match the report's § Sweeps verbatim.
3. The report's § Deviations names the dropped Collection clause with the quoted text.
4. Line 29's note carries the quoted replacement.
5. No file outside Owned changed.

## Review evidence

The report file and `sweeps.txt` after the edit; the unit's report.
