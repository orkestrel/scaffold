# Unit conform-qualifier fix round 1 — the report's sweeps, the program prose patches, one citation

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer of `/home/user/scaffold/tmp/units/conform/conform-qualifier-report.md`. Perform the assignment directly and spawn nothing. Change no file under `/home/user/fleet/qualifier` or `/home/user/fleet/program`.

## Objective

Close the round-1 objective lane's refutations of claims 4 and 6 and its F3 (`units/l3/qualifier-objective-r1.md`), all on the record: the report's § Sweeps carries one row per placement, naming, and documentation row it omitted; § Shared-file patches carries program's own README and guide sites for the renamed symbols; the qualifier-subj-14 note cites the line the arm now sits on.

## Context

**Law.** `/home/user/scaffold/AGENTS.md` § Writing; the conform-qualifier brief at `/home/user/scaffold/tmp/units/conform/conform-qualifier-brief.md` § Method (a documentation or naming row records the sweep proving its old form gone).

**The lane's readings.**

- § Sweeps (report lines 132-142) has no row for qualifier-obj-3, qualifier-obj-4, qualifier-subj-4, qualifier-subj-5, qualifier-subj-7, qualifier-subj-10, and qualifier-subj-11. The lane re-derived each and read empty: `from '\.\./\.\./setup'` (obj-3); a type-import-after-value-import read of `tests/src/core/helpers.test.ts:1-41` (obj-4); `\b(item|data|info|obj|thing|cfg|msg)\b` over `src` (subj-4); `@param failed - Whether` (subj-5); `Validation is on by default` (subj-7); the removed renderer sentence (subj-10); `### Gates|### Terminal eligibility proof` (subj-11).
- § Shared-file patches derives its consumer set from a sweep over program's `src` and `tests` only. Program's own authored prose imports and calls the renamed symbols: `/home/user/fleet/program/README.md:31` (import), `:50`, `:56`; `/home/user/fleet/program/guides/program.md:38` (import), `:57`, `:63`, `:770`, `:786`, `:792`, `:821`, `:832`, `:876`, `:890`; and `/home/user/fleet/program/guides/program.md:279` names `logicalPremises` as a public qualifier export. These are program's own files, not the vendored mirror `program/guides/qualifier.md`.
- The qualifier-subj-14 note at report line 31 cites `helpers.ts:329`; the `false` arm sits at `src/core/helpers.ts:326` after the unit's edits.

**Host.** Read with Read, Grep, Glob; change with Edit; Bash only for `grep -rn <pattern> /home/user/fleet/qualifier/src /home/user/fleet/qualifier/tests /home/user/fleet/qualifier/README.md /home/user/fleet/qualifier/guides/qualifier.md /home/user/fleet/qualifier/guides/README.md` and `grep -rn <pattern> /home/user/fleet/program/README.md /home/user/fleet/program/guides/program.md`, one plain command per call, no other command.

## Scope

**Owned.** `/home/user/scaffold/tmp/units/conform/conform-qualifier-report.md`.

**Off-limits.** Everything else.

## Rows

1. Re-run each of the seven sweeps the lane named (read the files with Grep; the Bash grants cover the same reads) and add one § Sweeps row per named row with its pattern, its population, and its result.
2. Extend § Shared-file patches with a block for program's own prose: rewrite `program/README.md:31` and `program/guides/program.md:38` as `import { createQualificationDefinition, createRuling } from '@orkestrel/qualifier'`; the whole-word renames `qualificationDefinition` → `createQualificationDefinition` at `README.md:50` and `guides/program.md:57,770,786,876`, and `rulingDefinition` → `createRuling` at `README.md:56` and `guides/program.md:63,792,821,832,890`; `guides/program.md:279` naming `ruleToPremises`. Verify each line with Grep before recording it, and record the sweep bound as `**/*.{ts,md}` excluding vendored mirrors.
3. Correct the qualifier-subj-14 citation to `src/core/helpers.ts:326`.
4. Append a `## Fix round 1` section naming the lines added or rewritten.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

The appended section, returned as the final message. No process diary.

## Acceptance criteria

1. § Sweeps carries a row for every row the lane named, each read empty.
2. § Shared-file patches carries program's README and guide sites for both renames and the `ruleToPremises` mention.
3. The subj-14 citation is `src/core/helpers.ts:326`; the report's authored prose states no count; no file under `/home/user/fleet` changed.
