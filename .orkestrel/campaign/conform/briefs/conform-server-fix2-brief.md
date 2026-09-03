# Unit conform-server fix round 2 — the unreachable branch ruled, a nested function, one permitted hit

## Role and engine

`implementer` on GPT-5.6 Sol through the Cursor bench (`tmp/work/sol5.sh`, model `gpt-5.6-sol-high`), the sole writer in `/home/user/fleet/server`, also owning the unit's report file under `/home/user/scaffold/tmp/units/conform/`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-2 objective lane's refutations of claims 4 and 9 and its finding O1 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l3/server-objective-r2-sol.md`); R1 is ruled here. The round-2 checker passed.

## Context

Read first: `/home/user/scaffold/AGENTS.md` § Design laws (no nested functions); `/home/user/scaffold/.claude/rules/architecture.md` § Functions and orchestration; `/home/user/scaffold/.claude/rules/tests.md` § Untestable usually means missing seam (record a genuinely irreducible gap where a reader meets it); `/home/user/scaffold/.claude/rules/quality.md` § Rounds and verdicts (a ruling that ends a seam states the invariant, the constraint, and the interface); the report `/home/user/scaffold/tmp/units/conform/conform-server-report.md` § Failing-first controls (the server-obj-10 paragraph) and § Sweeps.

The ruling on R1 (server-obj-10). Invariant: a listener bound to a numeric port yields an `AddressInfo`, so the `isAddressInfo` guards in `Server.#listen` and `probePort` narrow Node's `address()` union (`string | AddressInfo | null`) and throw a `TypeError` for the members this path cannot produce, in place of the removed `0` sentinel. Constraint: no listener-injection seam is added to fake Node's return; the rule against coordination machinery for a requirement nobody wrote binds. Interface: a one-sentence comment at each guard states that the branch is unreachable through `listen(port)` and exists for the union's other members, and the `@throws` rows already on the members stay. The row's evidence is the reachability argument and the live-path control, and claim 4 reads the branch as an exempt, documented gap.

Standing conditions: the checkout carries the conform-server unit's uncommitted edits (18 files); leave every edit outside the Sites as it is. `node_modules` holds the fleet closure; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo an edit by editing. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server <file>`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff`, `grep -rnE <pattern> <paths>`, `ls`, `cat`.

## Sites and edits

- **R1, the guard comments** — at the `isAddressInfo` guard in `src/server/Server.ts` (`#listen`) and in `src/server/helpers.ts` (`probePort`), add the one-sentence `//` comment the ruling names. No code change.
- **Claim 4, the report** — in § Failing-first controls, the server-obj-10 paragraph states the ruling in the three parts (invariant, constraint, interface) and that claim 4 reads the branch as an exempt, documented gap; in § Sweeps, the row for `Node\.js >= 24|ESM-only` records the hit at `tests/distribution.test.ts:60` as permitted (the declaration-file sense of `ESM-only`, a vendored file outside the unit) in place of "Empty".
- **O1** — `tests/guides.test.ts:235`: `logRequestId` is a function assigned inside the test body; pass the anonymous middleware directly to `server.use(...)` and keep every lifecycle assertion. Sweep `^\s+(const|let|function)\s+\w+\s*=?\s*(async\s*)?\(` over `tests/guides.test.ts` for any other nested function and rule each hit (an anonymous callback passed directly as an argument is permitted).
- **Claim 9** — no edit: the Orchestrator regenerated the evidence at 21:33 UTC; the round-3 lanes read the current diff.
- **Report** — append `## Fix round 2` naming the objective lane's file, each item, and the sites.

## Scope

Owned: `src/server/Server.ts` and `src/server/helpers.ts` (one comment each), `tests/guides.test.ts` (the one case), the report. Off-limits: every other file and every other edit the unit made.

## Execution

Perform every step yourself; spawn nothing.

## Output

Return, as your final message: each comment with `file:line`; the O1 case's new shape with `file:line` and the nested-function sweep's hits with rulings; the two report passages; `git status --short`; the exit codes of `npm run format:check`, `npm run lint:check`, `npm run check`, and `npm run test:guides`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when the guides case cannot pass the middleware inline without losing an assertion, or when a gate reddens on a file outside Owned. Decide, record, and carry on for an ancillary question: the comment's exact wording.

## Acceptance criteria

1. `grep -n "isAddressInfo" src/server/Server.ts src/server/helpers.ts` shows each guard preceded by the comment.
2. `tests/guides.test.ts` declares no function inside a test body; `npm run test:guides` exits 0.
3. The report's obj-10 paragraph carries the three-part ruling and the `ESM-only` row records the permitted hit.
4. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0; `git status --short` lists the unit's paths and nothing new.
