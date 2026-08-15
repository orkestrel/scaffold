# U2 — browser RosterManager and stream lifecycle

## Role and engine

`implementer` route, engine **GPT-5.6 Sol**, sandbox `workspace-write`, sole serial writer in
`/workspace/supervisor` from the committed U1 checkpoint (the launcher names the baseline hash).
Perform this directly and spawn nothing. Do not commit, push, or npm install.

## Authority

Primary spec: your own lane's design `/home/user/scaffold/tmp/codex/design-last.md` — "Browser
composition" (RosterManager independent of the operator's per-workflow generation) and unit 2's
acceptance row. Reconciliation overrides recorded in
`/home/user/scaffold/.orkestrel/supervisor/REDESIGN.md` apply (rich entries; restore-on-reload is
U3, not yours — but your manager must not preclude it). U1's landed contract is authoritative over
the design text where they differ — read `app/core/types.ts` and `app/browser/services/Client.ts`
as U1 left them before writing anything.

## What this unit owns

A browser-side manager that: owns the roster stream via `client.roster.watch(signal)`; starts on
successful `identify`/login; aborts on logout, session invalidation, and operator destruction;
holds the last good snapshot, the live fact, and the fault; exposes independent facts from which
the UI derives loading/partial/error rather than storing a second state label; survives a workflow
open/close without its stream being touched; maps an `AUTH` stream refusal to the session-expired
transition (shell to login, open-run memory preserved for U3).

Placement per the repo's architecture rules: types in `app/browser/types.ts`, the manager beside
`FeedManager`/`StackManager` in `app/browser/controllers/`, factory in `app/browser/factories.ts`,
wiring through `Operator` (it owns login/logout/identify seams — smallest coherent change there).

## Scope

**Owned:** `app/browser/types.ts`, `app/browser/controllers/RosterManager.ts` (new),
`app/browser/factories.ts`, `app/browser/controllers/Operator.ts`, `app/browser/index.ts` barrel
row, and the mirrored tests (`tests/app/browser/controllers/RosterManager.test.ts` new,
`tests/app/browser/...Operator` additions).

**Off-limits:** everything else, including `ApplicationView.vue` (U5), any `.vue` (U4/U5/U6),
`app/server/**` (landed), `src/**`, vendored test files, `package.json`, `configs/**`, `guides/**`.

Forbidden: `any`, `as`, `!`, `@ts-` comments, `eslint-disable`, mocks/fakes/spies/fake clocks, new
dependencies, polling or timers (reconnect is explicit-Retry-only: expose a `retry()`-shaped seam
for the UI; the fixed lifecycle vocabulary governs its name).

## Acceptance criteria

1. With a live session and no run open, the manager holds the current roster and updates on a
   published change — proved against the real composed server (the integration-test harness
   pattern), not a stub.
2. Opening and closing a workflow does not abort or restart the roster stream — proved by test.
3. Logout aborts the stream; a subsequent login restarts it — proved.
4. Killing the server mid-stream drives the manager's facts to fault-with-last-good (the UI's
   partial state) without losing the snapshot; invoking the retry seam after server return
   restores liveness — proved.
5. An `AUTH` refusal on the stream produces the session-expired fact exactly once, and the manager
   is idempotent to a second refusal — proved.
6. No timer, no polling, no `Date.now()` interval anywhere in the diff.
7. Converge lint→format; `format:check`, `lint:check`, `check`, `build` and the relevant test
   projects exit 0; full `npm test` deviations reported with cause if any (guides parity belongs
   to U7).

## Deviation contract

Stop and report if U1's landed surface cannot support any criterion, naming the exact gap — that
is a U1 fix round, not yours to patch around. Ancillary naming/placement choices within the rules
are yours.

## Output

Touched files + diffstat; full diff of `app/browser/types.ts` changes; `git status --porcelain`;
gates with real output; per-criterion proof pointers; deviations or none. No process diary.
