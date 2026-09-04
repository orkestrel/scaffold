# Unit conform-program fix round 4 — the report brought to the final tree (record only)

## Role and engine

`builder` on Claude Sonnet, a native subagent, writing only `/home/user/scaffold/tmp/units/conform/conform-program-report.md`. Perform the assignment directly and spawn nothing. No file under `/home/user/fleet/program` changes in this round.

## Objective

Close the round-4 objective lane's refutation of claim 9 and its finding O2 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l4/program-objective-r4.md`): the report's tables and pointers describe a tree fix round 3 moved. O1 (the § Gates chain predating the final tree) settles on the landing's deciding run and needs one sentence in the report; R1 and R2 are the Orchestrator's, recorded in the ledger.

## Edits, each verified against the tree at `/home/user/fleet/program` before it is written

- § Files touched: add a row for `/home/user/fleet/program/src/core/factories.ts` (comment-only: the `validate` option's boolean form and the "Default: …" form); regenerate the diffstat fence from `git -C /home/user/fleet/program diff HEAD --stat` on the final tree, and keep the fence's summary line as the command printed it (a measurement beside its command).
- § Rows pointers, each re-derived with `grep -n` on the file: program-subj-4 (`readonly count: number` in `src/core/types.ts`, `get count(): number` in `src/core/programs/ProgramManager.ts`); program-subj-6 (the overload notes in `Program.ts` and `ProgramManager.ts`); program-subj-3 (the renamed calls in `Program.ts`); program-subj-16 (the `tallySubject` call); program-subj-11 (the sentences in `guides/program.md`, naming the lines that carry them).
- § Sweeps: replace the program-subj-6 row with the final-tree reading (every `@throws` row opens "Thrown when"; the pattern `@throws` over `src` and the pattern `@throws \{@link ProgramError\} Thrown when` over `src` name the same lines) written without a count; fix the `.size` row's pointer to the line that carries `Set.prototype.size` in `tests/setup.test.ts`.
- § Gates: after the table, one sentence stating that fix round 3 re-ran `format:check`, `lint:check`, `check`, `test:guides`, and the `setup` and `src:core` projects, and that the landing's deciding run executes the full chain including `build`, `policy`, and `config` on the final tree.
- The status sentence at `:222`: write it without the count ("`git status --short` lists only paths under Owned"), and sweep the report for `\b\d+ (files|rows|tests|members|entries|paths)\b` and number-word tallies over growable sets, deleting each (a count reported beside the command that produced it stays).
- Append `## Fix round 4` naming the objective lane's file and each correction.

## Allowed commands

`git -C /home/user/fleet/program diff HEAD --stat`, `git -C /home/user/fleet/program status --short`, `grep -n <pattern> <file>`, `grep -rnE <pattern> /home/user/fleet/program/src`, `sed -n <range>p <file>`, `cat`. Nothing that writes under `/home/user/fleet/program`.

## Output

Return, as your final message: each corrected pointer with the command that derived it and its reading; the regenerated diffstat fence; the rewritten sweep row; the count sweep's result; and `git -C /home/user/fleet/program status --short` unchanged from the incoming list.

## Acceptance

Every `file:line` in § Rows, § Sweeps, and § Gates resolves to the content it names on the final tree; § Files touched lists every path in `git status --short`; no count over a growable set remains in the report outside a command's own output; `git status --short` in the program checkout is unchanged.
