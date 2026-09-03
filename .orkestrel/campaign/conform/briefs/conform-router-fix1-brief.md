# Unit conform-router fix round 1 — the dangling citations, the pointer, the test substitutions, the sweep records

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/router`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-1 lanes' refutations and findings (`units/l2b/router-objective-r1.md`, `units/l2b/router-r1-checker-luna.result.md`): every dangling `AGENTS §N` citation leaves the package's own files; the `below` pointer at `src/browser/types.ts:65` reads in the rule's form; `via` and `e.g.` leave the tests; the report records the two sweeps it omitted. The Orchestrator ruled the citation removal in scope: the campaign's exit criterion is conformance to `AGENTS.md`, which carries no numbered sections, and every other package removed the same citations under a row of its own.

## Context

**Law.** `/home/user/scaffold/AGENTS.md` § Writing and § Instruction files; `/home/user/scaffold/.claude/rules/writing.md` § Code tokens, references, and links and § Substitutions. The conform-router brief at `/home/user/scaffold/tmp/units/conform/conform-router-brief.md` and the report at `/home/user/scaffold/tmp/units/conform/conform-router-report.md` this round extends.

**Sites, as the lanes read them at 19:2x UTC.** Line numbers can have moved; read each site before changing it.

- `AGENTS §` citations: `guides/router.md:3,12,144,148,170,247,253`; `guides/README.md:51`; `src/browser/Navigator.ts:15,25,243`; `src/browser/types.ts:70,71,96,103,116`; `src/core/types.ts:12,27,282,493,516,529,530,554,569`; further sites in `src/core/helpers.ts`, `src/core/constants.ts`, `src/core/parsers.ts`, `src/core/Group.ts`, and `src/server/helpers.ts` — sweep `AGENTS\s*§|§\s*[0-9]` case-insensitive over `src/**`, `tests/**` (excluding the vendored files), `guides/router.md`, `guides/README.md`, and `README.md` to find every one.
- `src/browser/types.ts:64-65`: "routes to the `error` handler below and vetoes the navigation" → "routes to the `error` handler described later in this list and vetoes the navigation".
- `via` at `tests/src/core/Dispatcher.test.ts:36,145`, `tests/src/core/Router.test.ts:9,239`, `tests/src/browser/Navigator.test.ts:776`, `tests/setupBrowser.ts:45,114`, `tests/setupServer.ts:41`; `e.g.` at `tests/src/core/Dispatcher.test.ts:347` and `tests/setupBrowser.ts:37,62`.
- The report's § Sweeps (lines 128-136) records no sweep for router-subj-7 (`#popListener`, `#hashListener`) or router-subj-12 (`types.js').Dispatcher}`).

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit; Bash only for `npm --prefix /home/user/fleet/router run <script>`, `npm --prefix /home/user/fleet/router test`, `cd /home/user/fleet/router && npx oxfmt --config .oxfmtrc.json <file>` (to converge a format failure), `git -C /home/user/fleet/router status --short`, `git -C /home/user/fleet/router diff`, `node /home/user/scaffold/tmp/work/evidence.mjs router`, `cd /home/user/fleet/router && npx scaffold audit --offline`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

**Standing condition.** The tree carries the conform-router unit's uncommitted edits; leave every edit outside the Sites as it is. The offline audit reports `configs/browsers.ts` stale at the baseline; that vendored file is off-limits and the landing repairs it, so record the line and do not act on it.

## Scope

**Owned.** `src/**` and the non-vendored `tests/**` (the citation, pointer, and substitution sites only), `guides/router.md`, `guides/README.md`, `README.md` (the citation sites only), `/home/user/scaffold/tmp/units/conform/conform-router-report.md`.

**Off-limits.** Everything else. Never edit a vendored file (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, the vendored guide mirrors under `guides/`, `configs/**`, `.claude/**`, `scripts/**`) or `package.json`.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Bash`. Never commit, stage, push, delete a file, or run a discarding git command.

## Rows

1. **The citations.** At every `AGENTS §N` site, replace the parenthetical with the fact it cites (the rule's own words, in one clause) or delete it where the sentence stands without it; rewrite `guides/README.md:51` so the `AGENTS.md` link text carries no section number. Re-run the sweep and record it empty; where a presence guard in `tests/guides.test.ts` quotes a changed sentence, change the guard's string.
2. **The pointer.** Rewrite `src/browser/types.ts:64-65` as the Context names.
3. **The tests.** Replace `via` with `through` (or `by using`, by sense) and `e.g.` with `for example` at the listed sites; re-run `\bvia\b|e\.g\.|i\.e\.` (case-insensitive) over the non-vendored `tests/**` and record it empty.
4. **The sweep records.** Add to the report's § Sweeps the rows for router-subj-7 (`#(pop|hash)Listener`, plus the case-insensitive inflection form) and router-subj-12 (`types.js').Dispatcher}`), each over `src`, `tests`, `guides/router.md`, `guides/README.md`, `README.md`, read empty.
5. Append a `## Fix round 1` section to the report: each finding, the sites changed, the sweeps, each gate with its exit code, the audit line.

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs router`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

The appended report section, returned as the final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence — when a citation's sentence cannot stand without an invented fact, or when a gate reddens on something the rows did not touch. How a sentence is worded is yours to decide and record.

## Acceptance criteria

1. The `AGENTS\s*§|§\s*[0-9]` sweep over the package's own files reads empty; the pointer reads `described later`; the test substitution sweep reads empty.
2. The report's § Sweeps carries the two rows.
3. Every gate exits 0; the audit prints its one `configs/browsers.ts` drift row and no other; `git status --short` lists only the unit's paths.
