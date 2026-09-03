# Unit conform-guide fix round 1 — the surviving `kind` sentence, the sweep record, the database consumer

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/guide`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-1 objective lane's refutations of claims 3, 4, and 6 (`units/l3/guide-objective-r1.md`) on the uncommitted conform-guide unit: the `GuideInterface.surface` doc block names the renamed axis `keyword`; the report records the old-form sweeps for guide-obj-6 and guide-subj-13 and the word-boundary `kind` sweep; § Shared-file patches names database's `tests/setupServer.ts` and `tests/setupServer.test.ts` sites and the verification sweep that reaches them.

## Context

**Law.** `/home/user/scaffold/AGENTS.md` § Writing; the conform-guide brief at `/home/user/scaffold/tmp/units/conform/conform-guide-brief.md` § Method (a word-boundary search over the old name, then case-insensitively over its inflections; a documentation or naming row records the sweep proving its old form gone).

**Sites, as the lane read them at 19:3x UTC.** Line numbers can have moved; read each site before changing it.

- `src/core/types.ts:104`: "Lists every `## Surface` identifier + kind" for `GuideInterface.surface`, while `guides/guide.md:203` documents the same method as "identifier + keyword"; rewrite the sentence as "Lists every `## Surface` identifier + keyword — table rows union backticked entity headings" (keep the rest of the block).
- The report's § Sweeps (lines 90-105) records the `kind` sweep as `kind: '|symbol\.kind|\.kind\b`, which cannot reach prose; it records no sweep for guide-obj-6's old inline `'class' | 'interface'` union at its three former sites, nor for guide-subj-13's `\bstateful\b`.
- § Shared-file patches (lines 150-172) names only the one `symbol.kind` line in each package's `tests/guides.test.ts`, verified with a grep bound to `--include=guides.test.ts`; `/home/user/fleet/database/tests/setupServer.ts:8` imports `ExportKind` and uses it at `:210` and `:258`, and `/home/user/fleet/database/tests/setupServer.test.ts:376,420` read `symbol.kind`.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit; Bash only for `npm --prefix /home/user/fleet/guide run <script>`, `npm --prefix /home/user/fleet/guide test`, `cd /home/user/fleet/guide && npx oxfmt --config .oxfmtrc.json <file>` (to converge a format failure), `git -C /home/user/fleet/guide status --short`, `git -C /home/user/fleet/guide diff`, `node /home/user/scaffold/tmp/work/evidence.mjs guide`, `cd /home/user/fleet/guide && npx scaffold audit --offline`, and `grep -rn <pattern> /home/user/fleet` with `--include` filters for the fleet-wide consumer sweep, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

**Standing condition.** The tree carries the conform-guide unit's uncommitted edits, with `tests/setupServer.ts` and `tests/setupServer.test.ts` deleted and unstaged; leave every edit outside the Sites as it is.

## Scope

**Owned.** `src/core/types.ts` (the one sentence), `/home/user/scaffold/tmp/units/conform/conform-guide-report.md`.

**Off-limits.** Everything else, every other fleet checkout included. Never edit a vendored file or `package.json`.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Bash`. Never commit, stage, push, delete a file, or run a discarding git command.

## Rows

1. **Claim 3.** Rewrite the `GuideInterface.surface` sentence as the Context names; confirm with a grep over `tests/guides.test.ts` and `guides/guide.md` that no presence guard or guide sentence quotes the old text; re-run `\bkind\b` at a word boundary and case-insensitively over the inflections over `src`, the non-vendored `tests`, `guides/guide.md`, `guides/README.md`, and `README.md`, and record the sweep with every hit ruled (the markdown `Kind` table header, the `wrong-kind` fixture, and the vendored file are permitted).
2. **Claim 4.** Add § Sweeps rows for guide-obj-6 (the old inline `'class' | 'interface'` union at its three former sites) and guide-subj-13 (`\bstateful\b`), each with pattern, population, and result.
3. **Claim 6.** Add to § Shared-file patches a `database` entry naming `tests/setupServer.ts:8,210,258` (`ExportKind` → `ExportKeyword`) and `tests/setupServer.test.ts:376,420` (`symbol.kind` → `symbol.keyword`), verified by reading those files; restate the verification sweep as `ExportKind|EXPORT_KINDS|isExportKind|symbol\.kind` over `/home/user/fleet/*/tests/**/*.ts` and `/home/user/fleet/*/src/**/*.ts` (excluding `node_modules` and `/home/user/fleet/guide` itself), run it, and record every consumer it returns.
4. Append a `## Fix round 1` section to the report: each finding, the edit that closes it, the sweeps, each gate with its exit code, the audit line.

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs guide`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

The appended report section, returned as the final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence — when the quoted sentence is not found within three lines of the line named, or when a gate reddens on something the rows did not touch.

## Acceptance criteria

1. `src/core/types.ts` carries no prose `kind` for the renamed axis, and `test:guides` exits 0.
2. § Sweeps carries the `kind`, `stateful`, and inline-union rows; § Shared-file patches names database's sites and the fleet-wide sweep.
3. Every gate exits 0; the audit prints its single zero-drift line; `git status --short` lists only the unit's paths.
