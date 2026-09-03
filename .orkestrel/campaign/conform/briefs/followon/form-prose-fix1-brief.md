# Unit form-prose fix round 1 — the directional references in `tests/guides.test.ts`

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/form`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-1 checker's finding outside the claims (`O-TESTS-GUIDE-DIRECTIONAL`, `units/followon/form-prose-checker-luna.md`): the comments at `tests/guides.test.ts:2`, `:91`, `:244`, and `:246` use `above` or `below` as document references, and line 2 and line 91 also carry a count or an ordinal. Every one reads as `.claude/rules/writing.md` § Code tokens, references, and links and `AGENTS.md` § Writing fix. Claim 5's refutation is ruled in the verdict file: the changed `FormInterface` Surface row at `guides/form.md:91` is the unit's own row 2, so the claim's wording was wrong and the unit is not.

## Context

**Law.** `/home/user/scaffold/.claude/rules/writing.md` (`preceding`, `following`, `earlier`, `later`; never `above` or `below`) and `/home/user/scaffold/AGENTS.md` § Writing (never state a count; never name a list item by its position). The form-prose brief (`/home/user/scaffold/.orkestrel/campaign/conform/briefs/followon/form-prose-brief.md`) this round extends.

**Sites, as read at 18:01 UTC.** Line numbers are from the tree the unit left and can have moved; read each sentence whole before changing it.

- `tests/guides.test.ts:2`: "The five constants below are this" — drop the count and the direction ("The following constants are this …").
- `tests/guides.test.ts:91`: "and the second assertion below fails when a name" — name the assertion by what it checks, never by its position, and replace the direction with `later`.
- `tests/guides.test.ts:244`: "Each block below transcribes one flagship fence" — "Each following block transcribes …".
- `tests/guides.test.ts:246`: "name resolution above would pass it" — "the earlier name resolution would pass it".

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit; Bash only for `npm --prefix /home/user/fleet/form run <script>`, `npm --prefix /home/user/fleet/form test`, `cd /home/user/fleet/form && npx oxfmt --config .oxfmtrc.json tests/guides.test.ts` (to converge a format failure), `git -C /home/user/fleet/form status --short`, `git -C /home/user/fleet/form diff`, `node /home/user/scaffold/tmp/work/evidence.mjs form`, `cd /home/user/fleet/form && npx scaffold audit --offline`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

**Standing condition.** The tree carries the form-prose unit's uncommitted edits in `guides/form.md`, `src/core/types.ts`, `tests/setup.test.ts`, and `tests/src/core/helpers.test.ts`; leave them as they are.

## Scope

**Owned.** `tests/guides.test.ts` (the four comment sites only), `/home/user/scaffold/tmp/units/followon/form-prose-report.md` (append only).

**Off-limits.** Everything else. Never edit a vendored file (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`); the `above` at `tests/policy.test.ts:544` is the host inventory's and is carried by the scaffold row.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Bash`. Never commit, stage, push, delete a file, or run a discarding git command.

## Rows

1. Rewrite the four comment sites as the Context names, fitting each replacement to its sentence and keeping the comment's line width under the formatter's limit.
2. Re-run the case-insensitive sweep `\b(above|below)\b` over `tests/guides.test.ts` and record it empty of document-reference senses; re-run the number-word sweep over the same file and rule every hit.
3. Append a `## Fix round 1` section to the report: each site's old and new text, the sweeps with their rulings, each gate with its exit code, the audit line.

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs form`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

The appended report section, returned as the final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence — when a quoted phrase is not found within three lines of the line named, or when a gate reddens on something the rows did not touch.

## Acceptance criteria

1. The sweep over `tests/guides.test.ts` reads empty of `above` and `below` as document references, and the file states no count and no ordinal in a comment.
2. `test:guides` exits 0.
3. Every gate exits 0; the audit prints its single zero-drift line; `git status --short` lists only the form-prose unit's files plus `tests/guides.test.ts`.
