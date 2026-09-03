# Unit conform-pool fix round 1 — the round-1 objective lane's findings outside the claims

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/pool`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-1 objective lane's findings F1 to F6 and its referral R1 (`units/l2a/pool-objective-r1.md`) on the uncommitted conform-pool unit: the guide's two method tables each get an introducing sentence, the `## Tests` bullet is rewrapped, the mirror inventory names every mirror the folder carries, the destroy-path detach gets its own red control, and the report states only what its evidence shows.

## Context

**Law.** `/home/user/scaffold/.claude/rules/writing.md` § Structure (a complete sentence naming what follows before every table in a guide) and `/home/user/scaffold/AGENTS.md` § Writing (never state a count); `/home/user/scaffold/.claude/rules/documentation.md` § Parity. The conform-pool brief at `/home/user/scaffold/tmp/units/conform/conform-pool-brief.md` and the report at `/home/user/scaffold/tmp/units/conform/conform-pool-report.md` this round extends.

**Sites, as read at 18:16 UTC.** Line numbers can have moved; read each site before changing it.

- `guides/pool.md:73`: "The public methods of `PoolInterface`; `Pool` implements this list exactly." precedes the `#### \`PoolInterface\`` table and the `#### \`PoolToken\`` table.
- `guides/pool.md:83-87`: `#### \`PoolToken\`` sits directly over its table with no introducing sentence.
- `guides/pool.md:241-247`: the `Pool.test.ts` bullet carries the orphan line "invalid-cleanup waiter ownership," after the inserted "abort-listener detachment" text.
- `guides/README.md:17-31` § Dependency reference names `emitter.md` and `guide.md` as mirrors; the folder also carries `probe.md` and `test.md` (vendored mirrors of `@orkestrel/probe` and `@orkestrel/test`), named nowhere in that section.
- `src/core/Pool.ts`: `#detach` is called on the commit path and inside `destroy()`; the round-1 control (`/home/user/work/evidence/pool-proofs/pool-obj-3-control-detach-removed-red.txt`) deleted the shared `removeEventListener` line, which stops the new case at its commit-site assertion, so the destroy-path assertion in `tests/src/core/Pool.test.ts` (the `getEventListeners` case, formerly at `:374-397`) has not been shown red.
- The report: line 12 (pool-obj-3's "both reachable `#detach` sites"), line 38 ("The package declares two classes"), lines 80-81 (the revert proof stated over `git status --short`, which lists ` M src/core/Pool.ts`), lines 146-154 (the sweep table), line 206 (the `Pool.test.ts:107` citation; the assertion is at `:105-106`).

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit; Bash only for `npm --prefix /home/user/fleet/pool run <script>`, `npm --prefix /home/user/fleet/pool test`, `cd /home/user/fleet/pool && npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/Pool.test.ts > /home/user/work/evidence/pool-proofs/<name>.txt 2>&1`, `cd /home/user/fleet/pool && npx oxfmt --config .oxfmtrc.json <file>` (to converge a format failure), `git -C /home/user/fleet/pool status --short`, `git -C /home/user/fleet/pool diff`, `git -C /home/user/fleet/pool diff -- src/core/Pool.ts`, `node /home/user/scaffold/tmp/work/evidence.mjs pool`, `cd /home/user/fleet/pool && npx scaffold audit --offline`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

**Standing condition.** The tree carries the conform-pool unit's uncommitted edits in the files the report's § Files touched names; leave every edit outside the Sites as it is.

## Scope

**Owned.** `guides/pool.md` (the Sites only), `guides/README.md` (§ Dependency reference only), `/home/user/scaffold/tmp/units/conform/conform-pool-report.md`, `/home/user/work/evidence/pool-proofs/pool-obj-3-control-detach-destroy-red.txt` (new). `src/core/Pool.ts` for the plant in row 4 only, restored byte-for-byte before the gates.

**Off-limits.** Everything else. Never edit a vendored file (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, `guides/probe.md`, `guides/test.md`, `guides/emitter.md`, `guides/guide.md`, `configs/**`, `.claude/**`, `scripts/**`).

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Bash`. Never commit, stage, push, delete a file, or run a discarding git command.

## Rows

1. **F1.** Rewrite `guides/pool.md:73` to name both tables — "The public call-signature members of `PoolInterface` and `PoolToken`; `Pool` implements the `PoolInterface` list exactly." — and insert one sentence between `#### \`PoolToken\`` and its table naming the lease's single operation (for example "The lease returned by `acquire`, with the one operation that returns its record."). Confirm with a grep over `tests/guides.test.ts` that no presence guard quotes the old sentence.
2. **F6.** Rewrap the `Pool.test.ts` bullet at `guides/pool.md:241-247` to the file's existing wrap width, changing no word.
3. **R1.** In `guides/README.md` § Dependency reference, add one paragraph in the form of the existing two naming `probe.md` and `test.md` as byte-identical mirrors of the guides for `@orkestrel/probe` and `@orkestrel/test`, the devDependencies behind this repo's probe project and test helpers, kept here for the same reason; keep the existing paragraphs byte-unchanged.
4. **F3.** Plant a second control: in `src/core/Pool.ts` delete only the `this.#detach(…)` call inside `destroy()` (the commit-path call stays), run `cd /home/user/fleet/pool && npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/Pool.test.ts > /home/user/work/evidence/pool-proofs/pool-obj-3-control-detach-destroy-red.txt 2>&1`, read the transcript red on the `getEventListeners` case's destroy-path assertion, restore the deleted line byte-for-byte, and confirm with `git -C /home/user/fleet/pool diff -- src/core/Pool.ts` that the file's diff again carries only the three `@throws` hunks. Then run the same command to `/home/user/work/evidence/pool-proofs/pool-obj-3-control-detach-destroy-green.txt` and read it green. Where the destroy-path assertion does not fail with the plant, stop and report per the deviation contract.
5. **F2, F4, F5, and the pool-obj-3 sentence.** In the report: replace the revert-proof sentence at lines 80-81 with the true one (`src/core/validators.ts` is absent from the status; `src/core/Pool.ts`'s diff carries only the three `@throws` hunks, with `#detach` unchanged); add the deleted phrases ("without leaking the listener", the two renamed case titles, "growing up to `max`, or parking on", the `tests/guides.test.ts` header clause) to the sweep table with their patterns and the path list `src/**`, `tests/**`, `guides/pool.md`, `guides/README.md`, `README.md`, each re-run and read empty; name the classes at line 38 (`Pool` and `PoolError`) instead of counting them; correct the citation at line 206 to `:105-106`; extend the pool-obj-3 row and the controls table with the second control's transcript and its red count.
6. Append a `## Fix round 1` section to the report: each finding, the edit that closes it, the sweeps, each gate with its exit code, the audit line.

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs pool`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

The appended report section, returned as the final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, one hypothesis at most — when the plant in row 4 does not redden the destroy-path assertion, when a quoted phrase is not found within three lines of the line named, or when a gate reddens on something the rows did not touch. Where a paragraph sits or how a sentence is worded is yours to decide and record.

## Acceptance criteria

1. `guides/pool.md` carries a complete sentence before each of its two method tables, and `test:guides` exits 0.
2. `guides/README.md` § Dependency reference names every mirror in `guides/` beside `pool.md` and `README.md`.
3. `/home/user/work/evidence/pool-proofs/pool-obj-3-control-detach-destroy-red.txt` shows the destroy-path assertion red and the green twin shows the case green, with `src/core/Pool.ts` restored.
4. The report states no count, cites `Pool.test.ts:105-106`, and states the revert proof over the diff.
5. Every gate exits 0; the audit prints its single zero-drift line; `git status --short` lists only the unit's ten paths.
