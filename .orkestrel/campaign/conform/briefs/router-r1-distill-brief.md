# Grok distillate — unit conform-router, audit round 1

Read-only. You are the Cursor Grok absorption lane: return evidence with `file:line` pointers, never a decision, a verdict, a design, or an edit. Never create, change, or delete a file; never run a command that changes the tree. Do not dump whole files; quote the smallest excerpt that carries the fact.

## Question

For every row of unit conform-router, what does the tree at `/home/user/fleet/router` carry now, what did the unit's diff change there, and do the report's readings match the tree — so that the objective auditor reads a map instead of the whole tree?

## Inputs

- The unit's brief: `/home/user/scaffold/tmp/units/conform/conform-router-brief.md` — its § Rows and § Fleet rows are the population. Read every row's Where, Rule, Wrong, and Repair (the refuter's operative form).
- The audit brief: `/home/user/scaffold/tmp/units/conform/conform-router-audit-brief.md` — its § Claims names what the auditors will test.
- The writer's report: `/home/user/scaffold/tmp/units/conform/conform-router-report.md`.
- The evidence: `/home/user/work/evidence/conform-router.diff` (the unit's `git diff HEAD`) and `/home/user/work/evidence/conform-router.status` (`git status --short`).
- The tree: `/home/user/fleet/router`. Exclude `node_modules/**` from every sweep.
- The law the rows cite: the file and section named on each row, under `/home/user/scaffold/.claude/rules/` and `/home/user/scaffold/AGENTS.md`; quote only the sentence a row cites.

## Evidence sought, per row

Produce one entry per row id, in the brief's order, with these fields:

1. **Site now.** For each `file:line` the row's Where names, the line as it stands in the tree now with its current line number (lines move; report the current number beside the brief's), plus one line of context before and after. Where the site no longer exists (moved, deleted, renamed), say so and point at where the symbol went.
2. **Diff at the site.** The hunk header(s) in the evidence diff that touch that file and region, quoted as `@@` lines, and whether the operative repair's text is present in the `+` lines. Where the row's repair names exact replacement text, state whether that text appears verbatim, and quote the `+` line where it does.
3. **Old form sweep.** For every name, phrase, or path the row removes or renames: a word-boundary sweep and a case-insensitive sweep over its `-s`, `-ed`, and `-ing` inflections across `src`, `tests`, `guides/router.md`, `guides/README.md`, and `README.md`, excluding `node_modules`. Report the pattern, the paths covered, and every hit with `file:line`, or `no hit`.
4. **Report reading.** The disposition the report's table gives the row, and the sentence the report writes for it, quoted. Where the report cites a `file:line`, say whether that line now carries what the report says.
5. **Proof reading.** For a behavioural row: the failing-first command and counts the report records, and whether the named control file exists under `/home/user/work/evidence/router-proofs/` with a matching reading (quote its `Tests` summary lines). For a placement, naming, or documentation row: the sweep the report records for it, and whether your sweep in field 3 agrees.

## Evidence sought, across the unit

- **Scope.** Every path in the status file, each tagged `owned`, `shared`, or `off-limits` against the brief's § Scope rows, and every diff hunk whose file no row's Where names, listed as `file @@ hunk` with the first `+` line.
- **Residue.** A sweep of the diff's `+` lines for `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger`, every hit quoted with its line; and the same sweep over the tree's `src` and `tests` excluding the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`, hits listed as `file:line`.
- **Parity.** For every entity the diff touches in `src/**/types.ts` or a class file: the interface's call-signature member names from `types.ts` (`file:line` each) and the `## Methods` table rows for that entity in `guides/router.md` (`file:line` each), side by side; the readonly data properties the interface declares and the guide's Surface or Entities row that names them; every backticked identifier in a guide sentence the diff added, and whether the barrel `src/*/index.ts` exports it.
- **Gates.** The report's § Gates lines quoted verbatim (command and exit).
- **Breaking.** The report's § Breaking entries; for each renamed or removed published symbol, a word-boundary sweep for the old name across `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, and `/home/user/scaffold/src`, excluding `node_modules`, `/home/user/fleet/router` itself, and the vendored `guides/router.md` mirrors, with every hit as `file:line`.
- **Writing sweep** over the diff's `+` lines in prose files (`guides/**`, `README.md`, doc comments in `src/**`, test titles and comments in `tests/**`): case-insensitive hits for `\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b` and for a count over a growable set (`\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b`), each hit quoted with `file:line`; rule nothing, list every hit.

## Output

Return these sections and nothing else, in Markdown:

- `Question` — one line.
- `Evidence` — the per-row entries, then the across-the-unit blocks, each fact with its `file:line` or the command-shaped sweep that produced it (pattern and paths).
- `Distillate` — the smallest map the auditor needs: for each row one line `row-id: site now | diff present yes/no | old form hits N | report matches yes/no`, then the scope tags, then the residue and writing hits, then the parity table.
- `Unknowns` — every row or field you could not reach, named, with why.
- `Journal` — leave this line for the driver.
- `Deviation` — any tree change your containment check shows, any file you could not read, any sweep you could not run.
