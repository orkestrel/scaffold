# Unit conform-server fix round 4 — the address guard checks every member it narrows to; the sweep records

## Role and engine

`implementer` on GPT-5.6 Sol through the Cursor bench (`tmp/work/sol5.sh`, model `gpt-5.6-sol-high`), the sole writer in `/home/user/fleet/server`, also owning the unit's report file under `/home/user/scaffold/tmp/units/conform/`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-3 objective lane's refutations of claims 3 and 4 (record) and its referral R1 (`/home/user/scaffold/.orkestrel/campaign/conform/units/l3/server-objective-r3-sol.md`), ruled here: a total guard that narrows to `AddressInfo` checks every member the type requires. R2 is ruled without a code change: moving `id` to a getter is non-breaking for the fleet under the precondition the fleet-F2 row checked (no `Server` instance is serialized or spread); the bump ruling carries the published-shape change for outside consumers.

## Context

`/home/user/scaffold/.claude/rules/patterns.md` § Validation and contracts (a guard is total; guard-valid input is never rejected by its parser; every parsed result satisfies its guard) and § Foreign contracts (check each member as its published type declares it — `AddressInfo` from `node:net` declares `address: string`, `family: string`, `port: number`); `/home/user/scaffold/.claude/rules/tests.md` § Test contract; the report `/home/user/scaffold/tmp/units/conform/conform-server-report.md` § Sweeps (`:100-119`).

Standing conditions: the checkout carries the conform-server unit's uncommitted edits; leave every edit outside the Sites as it is. `node_modules` holds the fleet closure; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo a plant by editing the line back. Allowed commands, one per call: `npm run format:check`, `npm run lint:check`, `npm run check`, `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server <file>`, `npx oxfmt --config .oxfmtrc.json <file>`, `git status --short`, `git diff`, `grep -rnE <pattern> <paths>`, `ls`, `cat`. Capture a runner with `> /home/user/work/evidence/server-proofs/<name>.txt 2>&1`.

## Sites and edits

- **R1, the guard** — `src/server/validators.ts` `isAddressInfo`: check `address` is a string, `family` is a string, and `port` is a number, through the installed `@orkestrel/contract` guards the file already imports (`isRecord`, `isNumber`, and the string guard it exports — read `node_modules/@orkestrel/contract/dist/src/core/index.d.ts` for the exact name). Keep the TSDoc's first sentence; state in `@remarks` that the guard checks the three members `node:net` declares. `tests/src/server/validators.test.ts`: add cases refusing `{ port: 4000 }`, `{ address: '127.0.0.1', family: 'IPv4' }`, and a non-string `family`, and keep the accepting case. Capture the file red with the guard planted to check `port` alone (`fix4-red.txt`, the new cases failing), restore, capture green (`fix4-green.txt`), same command.
- **Claim 3, the sweep records** — replace the report's `requestEncoding` and `resolvePort` sweep rows with the word-boundary and inflection form `\brequestEncoding(s|ed|ing)?\b`, case-insensitive, over `src`, `tests`, `guides/server.md`, `guides/README.md`, and `README.md`, and the same for `resolvePort`; re-run the server-subj-6 generic-word sweep (`\b(item|items|info|thing|obj|cfg|msg|doc)\b`) over the same full population and record the permitted hits at `tests/src/server/helpers.test.ts:747`, `tests/config.test.ts:2` (vendored, outside the unit), and `guides/server.md:327` with their senses.
- **Claim 4, the documentation rows** — for server-obj-8, server-obj-11, server-obj-12, server-subj-8, and server-subj-10, record in § Sweeps the old-form pattern each row's repair removed (the pre-repair wording the report's row sections name) over the full population, with its result.
- **Report** — append `## Fix round 4` naming the objective lane's file, the R1 and R2 rulings, the guard change with its captures, and the sweep rows.

## Scope

Owned: `src/server/validators.ts`, `tests/src/server/validators.test.ts`, the report. Off-limits: every other line and every other edit the unit made.

## Execution

Perform every step yourself; spawn nothing.

## Output

Return, as your final message: the guard's new body with `file:line`; the new cases with `file:line`; the red and green counts with capture paths; each sweep row as recorded; `git status --short`; the exit codes of `npm run format:check`, `npm run lint:check`, `npm run check`, and the scoped run over `tests/src/server/validators.test.ts`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one hypothesis — when tightening the guard reddens a case elsewhere in the suite (run `tests/src/server/helpers.test.ts` and `tests/src/server/Server.test.ts` after the change), or when a gate reddens. Decide, record, and carry on for an ancillary question: the exact wording of the `@remarks`.

## Acceptance criteria

1. `isAddressInfo({ port: 4000 })` returns `false`; the accepting case still passes; `fix4-red.txt` names the new cases failing and `fix4-green.txt` the file passing under the same command.
2. The report's § Sweeps carries the word-boundary and inflection rows and one row per documentation row named.
3. `npm run format:check`, `npm run lint:check`, `npm run check`, and the scoped runs exit 0; `git status --short` lists the unit's paths and nothing new.
