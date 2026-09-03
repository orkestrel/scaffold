# Unit conform-markdown fix round 1 — the round-1 lanes' findings outside the claims

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/markdown`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-1 objective lane's claim-4 refutation and its findings F1 to F3 (`units/l2a/markdown-objective-r1.md`) and the round-1 checker's F-setup-agents and F-readme-count (`units/l2a/markdown-r1-checker-luna.md`) on the uncommitted conform-markdown unit: the report records every sweep and states its own work truly, and the three package-owned prose sites both lanes referred are repaired.

## Context

**Law.** `/home/user/scaffold/AGENTS.md` § Writing (never state a count; no `AGENTS §` citation in a package file) and `/home/user/scaffold/.claude/rules/writing.md`; `/home/user/scaffold/.claude/rules/documentation.md` § Parity (a mirror is refreshed from the published bytes, never rewritten). The conform-markdown brief at `/home/user/scaffold/tmp/units/conform/conform-markdown-brief.md` and the report at `/home/user/scaffold/tmp/units/conform/conform-markdown-report.md` this round extends.

**Sites, as read at 18:33 UTC.** Line numbers can have moved; read each site before changing it.

- `tests/setup.ts:3`: the header names `setupBrowser.ts`, which does not exist in this workspace ("DOM/Vue helpers live in `setupBrowser.ts`").
- `tests/setup.ts:54`: the comment carries `AGENTS-forbidden; §1 / §16)`.
- `guides/README.md:20`: "one of this package's two runtime dependencies" states a count.
- The report: § Sweeps (lines 216-232) has no row for the deleted `guides/src` By-directory row and the `Dependency mirrors` paragraph (claim 4); § Breaking (lines 276-288) does not name the vendored mirror `/home/user/fleet/guide/guides/markdown.md`, which still carries `MarkdownHandlers` and is refreshed from the published bytes after `@orkestrel/markdown` releases (F1); lines 86-91 say each module-scope fence helper keeps "the fence's own name and body", which is false for the house-rule fence, whose `projectHTMLNode` became `projectKbdNode` (the `@src/core` import at `tests/guides.test.ts:52` would collide) and whose `project` body is inlined into the case at `tests/guides.test.ts:363-372` (F2); line 253's Command cell reads "five projects" (F3); the § Gates Command cells drop the `--config .oxfmtrc.json` and `--config .oxlintrc.json` flags the captures show; line 42 calls the tightened By-directory table "byte-for-byte the shape the html sibling carries" where the structure matches and the Guide cell text differs.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit; Bash only for `npm --prefix /home/user/fleet/markdown run <script>`, `npm --prefix /home/user/fleet/markdown test`, `cd /home/user/fleet/markdown && npx oxfmt --config .oxfmtrc.json <file>` (to converge a format failure), `git -C /home/user/fleet/markdown status --short`, `git -C /home/user/fleet/markdown diff`, `node /home/user/scaffold/tmp/work/evidence.mjs markdown`, `cd /home/user/fleet/markdown && npx scaffold audit --offline`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

**Standing condition.** The tree carries the conform-markdown unit's uncommitted edits in the nine files the report's status names; leave every edit outside the Sites as it is.

## Scope

**Owned.** `tests/setup.ts` (lines 3 and 54 only), `guides/README.md` (line 20 only), `/home/user/scaffold/tmp/units/conform/conform-markdown-report.md`.

**Off-limits.** Everything else. Never edit a vendored file (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, the vendored guide mirrors under `guides/`, `configs/**`, `.claude/**`, `scripts/**`); the `@param … Whether` block at `tests/setupPolicy.ts:583` is the host inventory's and is carried by the scaffold row; the sanitizer prose at `guides/markdown.md:428-438` is carried by a successor unit after landing.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Bash`. Never commit, stage, push, delete a file, or run a discarding git command.

## Rows

1. Rewrite `tests/setup.ts:3` so the header names no `setupBrowser.ts` (the workspace has no browser environment; end the sentence at `Vue.`), and rewrite `tests/setup.ts:54` without the `AGENTS-forbidden; §1 / §16` clause, keeping the sentence's meaning (the wrappers narrow rather than assert with a non-null assertion). Re-run the case-insensitive sweep `AGENTS\s*§|§\d` over `src/**`, `tests/**` (excluding the vendored files), `guides/markdown.md`, `guides/README.md`, and `README.md`, and record it empty.
2. Rewrite `guides/README.md:20` as "a runtime dependency of this package" (no count), keeping the rest of the sentence.
3. In the report: add the § Sweeps row for `guides/src|Dependency mirrors` over the package (re-run it, 0 hits); add to § Breaking a line naming `/home/user/fleet/guide/guides/markdown.md` as a vendored mirror still carrying `MarkdownHandlers`, refreshed from the published bytes after `@orkestrel/markdown` releases the renamed guide, never rewritten; replace the clause at lines 86-91 with one naming the `projectKbdNode` rename, its cause, and the inlined `project` body; replace "five projects" at line 253 with the members `src:core`, `policy`, `config`, `setup`, and `guides`; restore the `--config` flags to the § Gates Command cells as the captures show them; reword line 42 to say the table matches the html sibling's structure.
4. Append a `## Fix round 1` section to the report: each finding, the edit that closes it, the sweeps, each gate with its exit code, the audit line.

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs markdown`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

The appended report section, returned as the final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence — when a quoted phrase is not found within three lines of the line named, or when a gate reddens on something the rows did not touch. Where a paragraph sits or how a sentence is worded is yours to decide and record.

## Acceptance criteria

1. The `AGENTS\s*§|§\d` sweep over the package-owned files reads empty; `tests/setup.ts` names no `setupBrowser.ts`; `guides/README.md:20` states no count.
2. The report's § Sweeps carries the `guides/src|Dependency mirrors` row, § Breaking names the guide package's mirror, and no report line states a count.
3. Every gate exits 0; the audit prints its single zero-drift line; `git status --short` lists only the unit's nine paths.
