# U3 — reload and re-login restore

## Role and engine

`implementer` route, engine **GPT-5.6 Sol**, sandbox `workspace-write`, sole serial writer in
`/workspace/supervisor` from the committed U2 checkpoint (the launcher names the hash). Perform
directly, spawn nothing, no commits/pushes/installs.

## The ruling (REDESIGN.md, fixed)

Reload lands the operator back in their last-open run when it is live or retained; otherwise land
on the rail with the reason stated in the UI ("that run is gone" copy is yours within the writing
rules). The pointer is cleared on logout — a fresh login after logout lands on the rail. Session
expiry (AUTH) preserves the open-run memory so re-login resumes; U2 already landed that half:
`Operator.#expire` retains `#workflow`/`#snapshot`/`#selection` and `login()` re-opens
`#workflow`. Your unit makes the RELOAD path true and durable, and draws the logout/expiry line
exactly.

## First step — read the landed state

Read `app/browser/controllers/Operator.ts`, `app/browser/stores/StorageOperatorStore.ts`,
`MemoryOperatorStore.ts`, and their types before designing the persistence shape. What the store
persists today, and where `identify()` decides the first authenticated view, are facts you verify
first and state in the report. The roster manager starts on identify success and its facts are
not yours to change.

## What this unit owns

Persist the open-run pointer through the operator store on open, clear it on logout (not on
expiry), and on identify success restore: attempt the pointed run through the ordinary open path;
on refusal or absence, clear the pointer and surface the stated reason as a fact the shell can
render (a typed transient the UI reads once — its shape is yours under the naming rules; no new
global state store). No polling, no timers. The server's inspect path serves live and retained
runs — a gone run refuses; that refusal is your fallback signal, do not pre-check.

## Scope

**Owned:** `app/browser/controllers/Operator.ts`, `app/browser/stores/StorageOperatorStore.ts`,
`app/browser/stores/MemoryOperatorStore.ts`, `app/browser/types.ts` (extend, do not disturb
U1/U2 types), and the mirrored tests (`tests/app/browser/controllers/Operator.test.ts`,
`tests/app/browser/stores/*.test.ts`, plus a real-server integration proof in
`tests/app/browser/integration/` following the harness conventions U2 left — module-file imports,
no `networkidle`, concrete waits).

**Off-limits:** everything else; all `.vue` files (U4/U5/U6 own the rendering of your facts);
`app/server/**`; `src/**`; vendored files; `package.json`; `configs/**`; `guides/**`.

Forbidden: `any`, `as`, `!`, `@ts-` comments, `eslint-disable`, mocks/fakes/spies/fake clocks,
new dependencies, polling or timers.

## Acceptance criteria

1. Open a run, reload (real browser, real server): the operator lands back in the run with feed
   and selection re-established through the ordinary open path — integration-proved.
2. Reload after the run is gone (server restarted without retention or run released beyond
   retention): operator lands on the authenticated shell with the stated-reason fact set exactly
   once — proved.
3. Logout clears the pointer; the next login lands on the rail even if a run was open — proved.
4. Session expiry does NOT clear the pointer; re-login resumes the run — proved (extends U2's
   existing proof to the pointer).
5. Store round-trip: the pointer survives a storage-backed store cycle; the memory store mirrors
   the contract — both proved.
6. No polling/timers; converge lint then format; static gates green in your sandbox; the
   Orchestrator runs the full chain (browser + integration) as acceptance.

## Deviation contract

Stop and report if the landed Operator seams cannot support a criterion (that is a U2 fix round,
not yours to patch around), or if the store contract cannot carry the pointer without breaking a
U1/U2 type. Ancillary naming/placement within the rules is yours.

## Output

Touched files + diffstat; full diff of `app/browser/types.ts` changes; `git status --porcelain`;
per-criterion proof pointers; the persistence shape you chose in one line; deviations or none.
