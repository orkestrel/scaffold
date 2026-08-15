# H4 — the history wire: GET /history over the run catalog

## Role and engine

`implementer` route, engine **GPT-5.6 Sol**, sandbox `workspace-write`, fresh thread. Sole
serial writer in `/workspace/supervisor` from clean committed baseline **de27a61** (H3 closed:
the catalog contract with the honest watermark law). Perform directly, spawn nothing, no
commits/pushes/installs.

## Authority

The reconciled History design: `/home/user/scaffold/tmp/redesign/history-analyst.md` §2 (the
endpoint's fixed design — read it completely before types) and the History section plus "H3
CLOSED" block of `/home/user/scaffold/.orkestrel/supervisor/REDESIGN.md` (the honest watermark
ruling binds every sentence you write about traversal; the H4 carriers below are named there).
`AGENTS.md`; applicable `.claude/rules/*` per the files you touch. `app/core/types.ts` and
`src/core/types.ts` are authoritative; TTTDD order binds.

## The unit

Per design §2, fixed: `GET /history` serves completed runs only (`released: true`) from the
supervisor store's `list`, session-authenticated like the roster routes, with the session's
grants applied through `RunListOptions.runs` for named-grant sessions (a `*` grant passes no
candidate restriction); query parameters carry `limit`, `cursor`, and `prefix`; the response is
the page's JSON shape; invalid queries refuse with the request-fault pattern the routes already
use; no polling, no retention policy in v1. Wire constants/parsers/types live in their
`app/core` centralized homes; the handler joins the existing handler family; the route joins
`ApplicationRoutes`; server tests drive the real HTTP surface per the existing route-test
conventions (listener tests are yours to run natively? NO — your sandbox denies loopback
listeners, the recorded standing condition: write the listener-driven proofs and run every
listener-free project yourself; the Orchestrator runs the listener suites as acceptance. State
in your report exactly which suites await the Orchestrator's run.)

## H3's named carriers (all yours; each closes in this unit)

1. Bind the top-of-fresh-page property: an unfiltered `limit: 1` fresh-page assertion in the
   catalog mutation proofs (both currently filter the candidate set so ordering is unobserved).
2. Answer the sibling-instance duplicate question with a real probe: can a second store
   instance's low stamp cause a record to be returned TWICE within one traversal? If yes, the
   `RunPage` instance-scope sentence gains that clause; if no, record why the exclusive
   boundary prevents it.
3. Extend the `computeRunUpdated` leaf tests to the `instant` branch, the `record.updated + 1`
   branch, and the first-acquire (`record === undefined`) path.
4. Rename `createRunListError` to the subject form `createRunOptionsError`, updating both
   stores and the tests.
5. Document both `release` methods' `@throws`.
6. Add the `list` recovery boundary to `RecordingSupervisorStore` WITH the proof that observes
   it (the boundary died in H3's fix round precisely because no proof read it — the proof
   justifies the member).

## Scope

**Owned:** `app/core/types.ts`, `app/core/constants.ts`, `app/core/parsers.ts` and the other
`app/core` centralized homes as the rules place them; `app/server/ApplicationHandlers.ts` (or
the handler home design §2 names), `app/server/ApplicationRoutes.ts`, `app/server/types.ts` as
needed; `src/core/**` ONLY for carriers 2-5; `tests/setupServer.ts` (carrier 6);
`tests/src/core/**` and `tests/src/server/**` for the carrier proofs; `tests/app/server/**` and
`tests/app/core/**` mirrored tests for the endpoint.

**Off-limits:** `app/browser/**` (H5's), `guides/**` (report the parity delta exactly),
vendored files, `configs/**`, `package.json`, the integration browser files.

Forbidden: the standing list (no `any`/`as`/`!`/suppressions/mocks/fake clocks/new deps/
polling); real stores and real HTTP in tests per the house laws.

## Acceptance criteria

1. The endpoint serves pages per design §2: released-only, grant-filtered, the three query
   parameters honored, cursor round-trips, invalid queries refused with the established fault
   shape — proved through the real route table (listener suites enumerated for the
   Orchestrator where your sandbox blocks them).
2. All six carriers closed with their proofs; the sibling-duplicate answer recorded either way.
3. Every listener-free project you can run is green (`test:src`, `test:app:core` equivalents,
   static gates); the parity delta reported exactly.

## Deviation contract

Stop and report if design §2 conflicts with the shipped catalog contract anywhere (the honest
law supersedes §2's wording if they disagree — name the disagreement), or if grant filtering
cannot reach the handler without touching an off-limits file. Ancillary naming/placement within
the rules is yours, recorded.

## Output

Touched files + diffstat; the full `app/core/types.ts` and route/handler diffs; per-criterion
proofs with commands and tails; the carrier table (each carrier → its closure evidence); which
suites await the Orchestrator; the exact parity delta; `git status --porcelain`; deviations or
none. No diary.
