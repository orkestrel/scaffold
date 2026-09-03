# Unit conform-mcp fix round 1 — the `capacity` residue, the proof commands, the predicate placement, the busy-wait

## Role and engine

`implementer` on GPT-5.6 Sol through the Cursor bench (`tmp/work/sol5.sh`, model `gpt-5.6-sol-high`), the sole writer in `/home/user/fleet/mcp`, also owning the unit's report file under `/home/user/scaffold/tmp/units/conform/`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-1 objective lane's refutations of claims 3, 4, and 7 and its findings O1 and O2 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l3/mcp-objective-r1-sol.md`), and the round-1 checker's refutation of claim 3 and its findings F-1 and F-2 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l3/mcp-r1-checker-luna.result.md`).

## Context

Read first: `/home/user/scaffold/AGENTS.md` (no compatibility shims; one concept, one term); `/home/user/scaffold/.claude/rules/tests.md` § Test contract (mirror module structure; the same command red then green; `waitForDelay` for a yield, never a busy-wait) and § Shared test infrastructure; `/home/user/scaffold/.claude/rules/writing.md` § Substitutions; the unit's report `/home/user/scaffold/tmp/units/conform/conform-mcp-report.md` § mcp-obj-5 and § mcp-subj-1 and mcp-subj-2.

Standing conditions: the checkout carries the conform-mcp unit's uncommitted edits (30 modified files and one untracked test file, all inside Owned); leave every edit outside the Sites as it is. `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile (an npm shim on `PATH` refuses install-class subcommands). Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo a plant by editing the line back. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project <project> <file>` with `<project>` one of `src:core`, `src:server`, `src:browser`, `npm run test:src:browser`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff`, `grep -rnE <pattern> <paths>`, `ls`, `cat`. Capture a runner with `> /home/user/work/evidence/mcp-proofs/<name>.txt 2>&1`.

## Sites and edits

- **Claim 3 and 7, the `capacity` residue** — `src/server/constants.ts:37-40`: "Override per `createMCPSession`'s `capacity`" → "Override through the `session` group of `createMCPSession`'s options (`session.capacity`)"; `src/server/middlewares.ts:43-46`: the parenthetical "(`crypto.randomUUID()`, `capacity`)" names the old shape → name the `session` group. `tests/src/server/middlewares.test.ts:93-116`: `startSession`'s `capacity` parameter and its mapping into `session: { capacity }` are a compatibility shim; delete the parameter and the mapping, and pass `session: { capacity }` at every call site that used it (sweep `capacity:` in that file and rewrite each). Then sweep `\bcapacity\b` over `src`, `tests`, `guides/mcp.md`, `README.md` and rule every hit: a `session.capacity` read, the `MCPSessionOptions.capacity` leaf, and the constant are the surviving shape; anything else is residue to rewrite.
- **Claim 3, the checker's sweep record** — in the report, record the case-insensitive `-s`, `-ed`, `-ing` inflection sweep for `isFormElicitationSupported`, `isTaskSupported`, `MCPCompletionManagerInterface`, `defer`, and `listen` (the last two as option keys: `\bdefer\??:|\blisten\??:`) over `src`, `tests`, `guides/mcp.md`, `guides/README.md`, and `README.md`, with the concrete pattern in place of `…`, and every surviving `listen` hit ruled (`MCPClientInterface.listen`, `MCPTransportInterface.listen`, local bindings).
- **Claim 4, the proof commands** — mcp-obj-5: run the red's exact command (`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/transports/MessagePortTransport.test.ts`) against the repaired tree, capture `mcp-obj-5-green.txt`, and cite it as the green. mcp-subj-2: run the red's exact command (`… --project src:server tests/src/server/middlewares.test.ts`) green, capture `mcp-subj-2-green.txt`, cite it. mcp-subj-1: add a control that removes the `sessionOptions` forwarding in `createMCPSession` (mint with `{ clock: … }` alone) and shows a middleware case failing — the case must read a `session.capacity` (or another `session` leaf) through the minted session; write that case if none binds the group, capture `mcp-subj-1-control-red.txt`, restore, capture `mcp-subj-1-green.txt` with the same command. Rewrite the report's rows so each red and green cite the same command.
- **O1 and F-2, the predicate placement** — move the `supportsFormElicitation` and `supportsTask` cases and the `PUBLISHED_PREDICATES` population from `tests/src/core/validators.test.ts` (`:764-769`, `:1179`, `:1906-1925`, `:2284-2285`) to `tests/src/core/helpers.test.ts`, the mirror of `src/core/helpers.ts`; keep the hostile-battery coverage; run both files green.
- **O2, the busy-wait** — `tests/src/server/MCPSession.test.ts:215-227`: replace the `performance.now()` spin that advances `Date.now()` with an `async` case that awaits `waitForDelay(<short ms>)` from `@orkestrel/test`, asserting the relationship the case depends on rather than a fixed reading.
- **F-1, two `should` sites** — `tests/setup.ts:1217` "how often a client should ask again" → "how often a client must ask again", and the `simply` on the next line deleted; `tests/src/core/MCPServer.test.ts:5239` "the paragraph should be deleted" → "the paragraph must be deleted". Both files are inside Owned; the sites were recorded by the unit as outside its rows and this round folds them.
- **Report** — append `## Fix round 1` naming both lanes' files, each item, the sites, the sweeps, and the captures.

## Scope

Owned: `src/server/constants.ts`, `src/server/middlewares.ts`, `tests/src/server/middlewares.test.ts`, `tests/src/core/validators.test.ts`, `tests/src/core/helpers.test.ts`, `tests/src/server/MCPSession.test.ts`, `tests/setup.ts`, `tests/src/core/MCPServer.test.ts`, the report. Off-limits: every other file and every other edit the unit made; `src/server/middlewares.ts` is touched only at the parenthetical and, for the subj-1 control, the forwarding line restored afterwards.

## Execution

Perform every step yourself; spawn nothing. Take the controls before the edits to their files.

## Output

Return, as your final message: each rewritten sentence with `file:line`; the `capacity` sweep with rulings; the inflection sweep's pattern, paths, and hits with rulings; the four commands with red and green counts and capture paths; the moved cases' new `file:line`; the O2 case's shape; `git status --short`; exit codes of `npm run format:check`, `npm run lint:check`, `npm run check`, and the scoped runs over every file you touched.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when the subj-1 control cannot redden any case without a new seam, when a moved case fails in its new file, or when a gate reddens on a file outside Owned. Decide, record, and carry on for an ancillary question: where a moved case sits, the delay length.

## Acceptance criteria

1. `grep -rnE "capacity" src tests guides/mcp.md README.md` shows only the `session` group's leaf, its reads, and the constant.
2. Each red and green in the report's obj-5, subj-1, and subj-2 rows cite the same command; `mcp-subj-1-control-red.txt` names one failing case.
3. `grep -n "supports" tests/src/core/validators.test.ts` returns no predicate case; the cases sit in `tests/src/core/helpers.test.ts`.
4. `grep -n "performance.now" tests/src/server/MCPSession.test.ts` returns nothing.
5. `npm run format:check`, `npm run lint:check`, `npm run check`, and the scoped runs exit 0; `git status --short` lists the unit's paths and nothing new.
