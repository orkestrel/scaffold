# Unit conform-scaffold fix round 2 — the vendored set is selected per target, and the policy files are three kinds

## Role and engine

`implementer` on GPT-5.6 Sol through the Cursor bench (`tmp/work/sol5.sh`, model `gpt-5.6-sol-high`), the sole writer in `/home/user/scaffold`, the orchestrator's own checkout. Perform the assignment directly and spawn nothing.

## Objective

Close the round-2 objective lane's refutation of claim 2 and its finding O1 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l3/scaffold-objective-r2-sol.md`); R2 is ruled: this round owns the source TSDoc twin. The round-2 checker passed.

## Context

Read first: `/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md`; `/home/user/scaffold/.claude/rules/documentation.md` § Parity (TypeScript and Markdown agree). The facts: `HOST_PATHS` (`src/core/constants.ts:131-152`) is a candidate list; a target receives a copy of each path it selects, and the selection excludes a workspace's own guide (`src/core/helpers.ts:486-501`, proved at `tests/src/core/helpers.test.ts:367-377`); the list holds three policy files of distinct kinds — the policy register `tests/setupPolicy.ts`, the policy proof `tests/policy.test.ts`, and the policy plugin `configs/policy.ts` — beside the configuration leaf `configs/helpers.ts` and its proof `tests/config.test.ts`, the licence, the harness permission file `.claude/settings.json`, the session-start hooks under `scripts/`, the root dotfiles, and the guide mirrors `guides/guide.md` and `guides/scaffold.md`. `guides/scaffold.md:1195-1199` already states the selection correctly.

Standing conditions: the checkout carries the conform-scaffold unit's uncommitted edits and the campaign's records under `.orkestrel/`; edit only the Sites. `node_modules` holds the closure; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Never run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, `git add`, or `git commit`; undo an edit by editing. Allowed commands, one per call: `npx oxfmt --config .oxfmtrc.json --check <file>`, `npm run check`, `npm run lint:check`, `git status --short`, `git diff -- <file>`, `grep -rnE <pattern> <paths>`, `cat`, `ls`, `awk 'length > 100' <file>`.

## Sites and edits

- `README.md:10-13` — the sentence "Every target carries its own copy of the vendored set — …" becomes a sentence stating that each target carries its own copy of the paths it selects from the vendored set, and the member list names, separately, the licence, the harness permission file, the session-start hooks, the policy register, the policy proof, the policy plugin, the configuration leaf and its proof, the root dotfiles, and the guide mirrors it starts from, never its own guide. Reflow the paragraph at the file's wrap: no line over 100 characters (`awk 'length > 100' README.md` counts bytes, so read a hit that carries an em dash by characters). Keep the rest of the paragraph's words.
- `guides/scaffold.md:16-19` — the same correction in that sentence's own shape: `HOST_PATHS` names the vendored set (the members listed as in the README, in the guide's wording), and each target carries its own copy of the paths it selects, which the verbs write and compare. Reflow at the file's wrap.
- `guides/scaffold.md:1195-1199` — keep the selection sentence; name the policy register, the policy proof, and the policy plugin separately in the member list. Reflow at the file's wrap.
- `src/core/constants.ts:114-123` — the `HOST_PATHS` TSDoc: replace the universal sentence (every target holds the vendored files) with the selected-subset statement the plan already carries in the same block, so the block does not contradict itself; keep the block's other sentences.
- The report `/home/user/scaffold/tmp/units/conform/conform-scaffold-report.md` — append `## Fix round 2` naming the objective lane's file, each site, and the new sentences.

## Scope

Owned: `README.md` (the one paragraph), `guides/scaffold.md` (the two passages), `src/core/constants.ts` (the one TSDoc block), the report. Off-limits: everything else, including `.orkestrel/**`, `host.json` (the landing's `build` regenerates it), and every other edit the unit made.

## Execution

Perform every step yourself; spawn nothing.

## Output

Return, as your final message: each new passage verbatim with `file:line`; the `awk` reading over `README.md` and `guides/scaffold.md` with each hit ruled (an em-dash line at or under 100 characters is permitted); `npx oxfmt --check` exit codes over the three files; `npm run check` exit code; `git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when the selection fact you read in `src/core/helpers.ts:486-501` differs from the Context, or when a gate reddens on a file outside Owned. Decide, record, and carry on for an ancillary question: where a clause sits, the exact member order.

## Acceptance criteria

1. `grep -rnE "Every target carries its own copy of the vendored set|every target carries its own copy" README.md guides/scaffold.md src/core/constants.ts` returns no hit.
2. `grep -rnE "policy register" README.md guides/scaffold.md` returns a hit at each of the three passages, each beside "policy proof" and "policy plugin".
3. No line over 100 characters in `README.md` or `guides/scaffold.md`; `npx oxfmt --check` exits 0 over the three files; `npm run check` exits 0.
4. `git status --short` lists the unit's paths and nothing new.
