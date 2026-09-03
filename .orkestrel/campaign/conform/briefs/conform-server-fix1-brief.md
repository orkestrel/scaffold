# Unit conform-server fix round 1 — the objective lane's record refutations, two prose sites, one comment

## Role and engine

`implementer` on GPT-5.6 Sol through the Cursor bench (`tmp/work/sol5.sh`, model `gpt-5.6-sol-high`), the sole writer in `/home/user/fleet/server`, also owning the unit's report file under `/home/user/scaffold/tmp/units/conform/`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-1 objective lane's refutations of claims 3 and 4 and its findings O1 and O2 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l3/server-objective-r1-sol.md`). The round-1 checker passed (`/home/user/scaffold/.orkestrel/campaign/conform/units/l3/server-r1-checker-luna.result.md`).

## Context

Read first: `/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md` § Substitutions (`via` → `through`, `by using`) and § Claims and time; `/home/user/scaffold/.claude/rules/tests.md` § Test contract (a regression test records the exact command and its failing count before the fix, and the same command's passing count after; the revert that proves a repair reddens exactly the test that names the defect); the unit's report `/home/user/scaffold/tmp/units/conform/conform-server-report.md` § Failing-first controls (`:70-84`) and § Sweeps (`:100-112`).

Standing conditions: the checkout carries the conform-server unit's uncommitted edits (18 files, all inside the unit's Owned scope); leave every edit outside the Sites as it is. `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile (an npm shim on `PATH` refuses install-class subcommands). Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server <file>`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff`, `grep -rnE <pattern> <paths>`, `ls`, `cat`. Capture a runner with `> /home/user/work/evidence/server-proofs/<name>.txt 2>&1`.

## Sites and edits

- **O1** — `guides/server.md:93` "Clear a cookie via an immediately-expiring `Set-Cookie`." → "Clear a cookie by setting an immediately-expiring `Set-Cookie`."; `:105` "over a fully-buffered response body via WebCrypto" → "over a fully-buffered response body by using WebCrypto"; `:122` "recognized across package copies via a structural brand fallback" → "recognized across package copies through a structural brand fallback". Then sweep `\bvia\b`, case-insensitive, over `src`, `tests`, `guides/server.md`, `guides/README.md`, and `README.md`, excluding the vendored `guides/<dependency>.md` mirrors, and rule every hit by sense; record the sweep.
- **O2** — `src/server/validators.ts:7-9`: the header comment states the file imports "types, constants, errors, and that file", which `:1-2` contradict. Replace the sentence with the checkable fact: the file sits at the bottom of the module's graph beside `helpers.ts`, imports the `node:net` address type and the `@orkestrel/contract` guards, and never an implementation class.
- **Claim 3** — the report's § Sweeps row "server-obj-10 sentinel removed" covers `src`, `tests/src`, and `tests/guides.test.ts` only. Re-run `grep -rnE "resolvePort" src tests guides/server.md guides/README.md README.md` and record the row over that population with its result.
- **Claim 4** — in § Failing-first controls: (a) replace every `…` with the full command, `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server <file>`, and drop the sentence "Every command below ran with `--no-cache`" once each command carries the flag; (b) server-subj-4's green cell cites the broader project run: run the same command as its red (`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/helpers.test.ts`), capture it as `subj-4-green.txt`, and record its count in that cell; (c) server-obj-10's control reddened 55 cases rather than the one naming the defect, and the report's paragraph states why no narrow red exists. Record the row as it is — the branch a non-`AddressInfo` address reaches is unreachable through the published API, so no test names the defect and the inverted-guard control proves only that the replacement sits on the live path — and add the sentence "The branch stays unproved by a narrow control; the row's evidence is the reachability argument and the live-path control." to the paragraph that begins "**server-obj-10 has no natural red**". Do not widen the package's API to reach it.
- **Report** — append `## Fix round 1` naming the objective lane's file, each item, the sites, the sweep, and the captures. Keep every other section as it is.

## Scope

Owned: `guides/server.md` (the three cells named), `src/server/validators.ts` (the header comment), `/home/user/scaffold/tmp/units/conform/conform-server-report.md`. Off-limits: every other file, including every other edit the unit made.

## Execution

Perform every step yourself; spawn nothing.

## Output

Return, as your final message: the three replaced cells with `file:line`; the new comment text; the claim-3 sweep row; the subj-4 green command and count with its capture path; the sentence added for obj-10; the `via` sweep's pattern, paths, and hits with rulings; `git status --short`; and the exit codes of `npm run format:check`, `npm run lint:check`, `npm run check`, and `npm run test:guides`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when a gate reddens on a file outside Owned or when the subj-4 command does not pass green. Decide, record, and carry on for an ancillary question: the exact wording of a replaced cell where the prescription reads badly in place.

## Acceptance criteria

1. `grep -rniE "\bvia\b" guides/server.md guides/README.md README.md src tests/src tests/setup.ts tests/setup.test.ts tests/guides.test.ts` returns no banned-sense hit.
2. `src/server/validators.ts:7-9` states what `:1-2` import.
3. The report's controls table carries no `…`, server-subj-4's green cell cites `subj-4-green.txt` with the same command as its red, and the obj-10 paragraph carries the added sentence.
4. `npm run format:check`, `npm run lint:check`, `npm run check`, and `npm run test:guides` exit 0.
5. `git status --short` lists the unit's 18 paths and nothing new.
