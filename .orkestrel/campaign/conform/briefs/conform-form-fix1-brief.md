# Unit conform-form fix round 1 — the report's sweep record, pointers, and rulings

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer of the unit's report. Perform the assignment directly and spawn nothing.

## Objective

Close the first audit round's refutation of claim 4 and its findings F1 to F3, the checker's F-SET-REFERENCES and F-DIRECTIONAL-REFERENCES, and referrals R1 and R2, in `/home/user/scaffold/tmp/units/conform/conform-form-report.md`: the report gains the four sweep rows the objective lane found missing, its six off-by-one guide pointers are corrected against the tree, the Orchestrator's rulings are recorded, and every prose finding outside the rows is listed under a § Successor rows section with its carrier. No file under `/home/user/fleet/form` changes.

## Context

**Law.** `AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md`; `.claude/rules/quality.md` (a finding outside the enumerated scope is recorded against the capability that owns it).

**The unit so far.** `conform-form-brief.md` is the unit's brief and `conform-form-report.md` its report; the tree at `/home/user/fleet/form` carries the unit's uncommitted changes (eleven modified files, all Owned). Round 1 (Grok-first): the objective lane (Opus, from the Luna distillate) held claims 1, 2, 3, 5, 6, 7, 9 and refuted claim 4 on the record alone — the tree is right and four rows have no recorded sweep; its full text is at `/home/user/scaffold/.orkestrel/campaign/conform/units/l2b/form-objective-r1.md`. The Luna checker held claims 1, 3, 5, 7, 9 (`/home/user/scaffold/tmp/cursor/form-r1-checker-luna.result.md`) with two prose findings outside the claims. Read both in full before editing.

**The Orchestrator's rulings.** R1: the `guides/form.md` mirrors in `/home/user/fleet/terminal` and `/home/user/fleet/toolbox` are refreshed byte-for-byte at those consumers' landings, never by this unit. R2: applying the corrected text and recording each correction under § Deviations satisfied the deviation contract, because each correction fixed a false literal in the refuter's text without changing the repair. F2, F3, F-SET-REFERENCES, and F-DIRECTIONAL-REFERENCES are successor rows carried by `briefs/followon/form-prose-brief.md` (a `builder` unit after landing), not this unit's to reopen.

**Host.** POSIX shell. Read with the Read, Grep, and Glob tools; change the report with the Edit and Write tools only. Bash is not needed; run no npm, npx, or git command. Never edit a file under `/home/user/fleet/form`.

## Scope

**Owned.** `/home/user/scaffold/tmp/units/conform/conform-form-report.md`.

**Off-limits.** Every other file, including every file under `/home/user/fleet/form` and `/home/user/work/evidence/`.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`. Never commit, stage, push, install, or run a git command.

## Rows

1. **Claim 4, the four sweep rows.** Add four rows to the report's § Sweeps table (around `conform-form-report.md:111-118`), each with the row id, the pattern, the paths, and the result you read by running the pattern with the Grep tool over `/home/user/fleet/form` restricted to `README.md`, `guides/README.md`, `guides/form.md`, `src/**/*.ts`, and `tests/**/*.ts` (never `node_modules`, never the vendored mirrors). The objective lane named the rows and patterns in this order; confirm each row-to-pattern pairing against the row text in `conform-form-brief.md` and correct the pairing where the brief's row says otherwise:
   - form-obj-1: `\b(createMatrixField|createMinimumCase|createMaximumCase|createMatrixCase)\b`, expecting hits only in `tests/setup.ts`, `tests/setup.test.ts`, and `tests/src/core/helpers.test.ts`; record the files hit.
   - form-subj-2: the removed unlabelled mirror paragraphs of `guides/README.md` (read the removed lines of that file's hunk in `/home/user/work/evidence/conform-form.diff`, take one distinctive phrase per removed paragraph as the pattern), expecting no hit.
   - form-subj-3: `\b(Open a form against|Write one own enumerable entry|Resolve one rule's|Build one frozen|Project a schema into|Audit a structurally|Own one field|Own a field's|Own a whole schema|Parse unknown wire|Parse one answer|Parse a strict answer)\b`, expecting no hit.
   - form-subj-4: `@param options - The (evaluation's|form's) settings\.`, expecting no hit.
2. **F1, the six pointers.** Correct the guide line pointers the lane found one line high: at report line 123, `guides/form.md:513` becomes `:512` and `:959` becomes `:958`; at lines 130-131, `:1257` becomes `:1256` and `:1298` becomes `:1297`; at lines 251 and 253, `:972` becomes `:971` and `:1696` becomes `:1695`. Read each site in `/home/user/fleet/form/guides/form.md` first and write the line number you read, and add one sentence beside the table stating that every guide pointer was re-read against the tree as it stands.
3. **R2, the ruling.** Under § Deviations, add: `Orchestrator's ruling (audit round 1): applying the corrected text and recording each correction here satisfied the deviation contract, because each correction fixed a false literal in the refuter's text without changing the repair.`
4. **Successor rows.** Add a `## Successor rows` section carrying, with the carrier `briefs/followon/form-prose-brief.md` named once at its head: F2 — `src/core/types.ts:109` opens its `@throws` outside the `Thrown when …` form that `.claude/rules/typescript.md` fixes; rewrite the opening to `@throws Thrown when a {@link FieldValidator} …` keeping the remaining sentences. F3 and F-SET-REFERENCES — `guides/form.md:971` "none of the three switches" becomes "none of `hidden`, `locked`, and `disabled`"; `guides/form.md:1695` "those two" becomes "`values` and `parseValues`"; `tests/setup.test.ts:104` "The two routes" becomes "The measurement and the budget builders". F-DIRECTIONAL-REFERENCES — `guides/form.md:41, 91, 449, 824, 1275, 1513, 1710` use `above` or `below` as document references; the replacements in order are "in this guide", "in the `## Surface` rows", "following budgets", "named budget", "preceding section", "preceding `## Surface` rows", and "preceding flagship fences". The `should` string literal at `tests/src/core/helpers.test.ts:242` the report already discloses. R1 — the terminal and toolbox `guides/form.md` mirrors, refreshed byte-for-byte at those consumers' landings.

## Method

Rows in order. Re-read the edited sections once against the tree before returning.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Add a `## Fix round 1` section to the report naming each row and what closed it. Return the same content as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence — when a pointer's site does not carry the text the report describes at either line, or when a pattern's population cannot be read. Decide and record where a section sits.

## Acceptance criteria

1. § Sweeps carries a row for form-obj-1, form-subj-2, form-subj-3, and form-subj-4, each with pattern, paths, and the result read.
2. The six pointers name the lines the tree carries.
3. § Deviations carries the R2 ruling; § Successor rows carries every item under row 4 with its carrier.
4. No file outside Owned changed.

## Review evidence

The report; `/home/user/work/evidence/conform-form.diff` and `conform-form.status` unchanged.
