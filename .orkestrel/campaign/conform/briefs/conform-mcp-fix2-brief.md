# Unit conform-mcp fix round 2 — a control that fails by assertion, the shared fixture reused

## Role and engine

`implementer` on GPT-5.6 Sol through the Cursor bench (`tmp/work/sol5.sh`, model `gpt-5.6-sol-high`), the sole writer in `/home/user/fleet/mcp`, also owning the unit's report file under `/home/user/scaffold/tmp/units/conform/`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-2 objective lane's refutation of claim 4 and its finding O1 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l3/mcp-objective-r2-sol.md`). The round-2 checker passed.

## Context

`/home/user/scaffold/.claude/rules/tests.md` § Test contract (the revert that proves a repair reddens exactly the test that names the defect; a control that hangs establishes no count) and § Shared test infrastructure (test files import shared infrastructure rather than declaring local fixture factories; a duplicate helper is a defect); `/home/user/scaffold/AGENTS.md` § Writing (no count over a growable set). The report `/home/user/scaffold/tmp/units/conform/conform-mcp-report.md` § mcp-subj-1 and mcp-subj-2 and § Fix round 1.

Standing conditions: the checkout carries the conform-mcp unit's uncommitted edits (31 paths); leave every edit outside the Sites as it is. The vendored set (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, `configs/**`, `scripts/**`, `.claude/settings.json`, every `guides/<dependency>.md` mirror) is off-limits. `node_modules` holds the fleet closure; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo a plant by editing the line back. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/middlewares.test.ts`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff`, `grep -rnE <pattern> <paths>`, `ls`, `cat`. Capture a runner with `> /home/user/work/evidence/mcp-proofs/<name>.txt 2>&1`.

## Sites and edits

- **Claim 4, the mcp-subj-2 control** — `tests/src/server/middlewares.test.ts:674-678`: the case that proves the injected clock reaches the minted session's log sweep currently hangs in teardown when the forwarding is reverted. Reshape it so the reverted forwarding fails by assertion: after opening the resumed stream, trigger a fresh push and assert the received event's id against `seen[1]?.id` (the lane's prescription), so a session left on `Date.now` yields a different or absent event rather than an open stream. Then re-plant the revert (`new MCPSession(crypto.randomUUID(), { ...sessionOptions })` without the clock), run the scoped command, capture `mcp-subj-2-control-red2.txt` reading exactly one failed case and no timeout, restore by editing, and capture `mcp-subj-2-green2.txt` with the same command. Replace the report's subj-2 row with the new captures.
- **O1** — `tests/guides.test.ts:1432-1460`: delete the local interface and fixture factory; import `createMemoryTransport` from `../tests/setup.js` (the path the file already uses for its other setup imports) and use it at the former call sites (`:1464-1465`); delete the "two members" phrase with the local block. Run `npm run test:guides` green.
- **Report** — append `## Fix round 2` naming the objective lane's file, both items, the sites, and the captures.

## Scope

Owned: `tests/src/server/middlewares.test.ts` (the one case), `tests/guides.test.ts` (the local fixture block and its call sites), `src/server/middlewares.ts` (only the forwarding line, planted and restored), the report. Off-limits: every other line and every other edit the unit made.

## Execution

Perform every step yourself; spawn nothing.

## Output

Return, as your final message: the reshaped case with `file:line`; the red and green counts with capture paths, quoting the red's failing test name and its absence of a timeout; the O1 call sites with `file:line`; `git status --short`; the exit codes of `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:guides`, and the scoped middlewares run.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when the reshaped case cannot be made to fail by assertion under the reverted forwarding, or when a gate reddens. Decide, record, and carry on for an ancillary question: the exact assertion wording.

## Acceptance criteria

1. `mcp-subj-2-control-red2.txt` names one failing case with no `timeout` or `hook timed out` line; `mcp-subj-2-green2.txt` passes the same command.
2. `grep -n "createMemoryTransport" tests/guides.test.ts` shows the import and its uses; no local transport factory remains in the file.
3. The gates and scoped runs exit 0; `git status --short` lists the unit's paths and nothing new.
