# H5 audit — browser history mechanics

One brief, two blind lanes: `analyst` (engine **GPT-5.6 Sol**, journaled bench CLI, read-only
sandbox) and `reviewer` (engine **Opus 5**, native, read-only). Each lane rules on every claim
from its own perspective — objective correctness for the analyst, design fit for the reviewer —
per `orkestrel-falsify`: per-claim verdicts CONFIRMED / BROKEN / UNRESOLVED / NOT-EVIDENCED with
evidence, one terminal line. Attack the claims; do not summarize them.

## Subject

Range `42652bf..01b4fa7` on `claude/orkestrel-test-package-0m1m8u` in `/workspace/supervisor` —
two commits. `b66edc0` (Sol implementer): 14 files, +761/−31: `app/browser/types.ts`,
`app/browser/services/{Client,ClientHistory}.ts`, `app/browser/controllers/{HistoryManager,Operator}.ts`,
`app/browser/{index,seeders}.ts`, `app/server/ApplicationHandlers.ts` (granted one-line tail-wire
change), mirrored tests, `tests/setupBrowser.ts` (additive fixtures). `01b4fa7` (Orchestrator,
direct): two listener-blind test corrections — the tail-wire proof's start body and harness body
middleware (`tests/app/server/ApplicationHandlers.test.ts`), and the showcase seeder tail
assertion (`tests/app/browser/seeders.test.ts`). The second commit is part of the subject: attack
it with the same rigor, especially whether the scoped `only(APP_WORKFLOW_PATH, createBody())`
harness change weakens what the backpressure tests prove.

Authority: `AGENTS.md` + rules (`names`, `typescript`, `architecture`, `patterns`, `tests`,
`browser`); `app/browser/types.ts` authoritative; the History sections of
`.orkestrel/supervisor/REDESIGN.md` (the honest watermark law; cursor presence, never page
fullness); `tmp/redesign/history-analyst.md` §3-4 (the five states, prefix reset, refresh
affordance fact). H6 renders; H5 owns everything beneath rendering and NOTHING rendered.

## Standing conditions

The Sol sandbox denies loopback listeners: the browser and app:server suites cannot run there —
rule from source, tests-as-written, and the Orchestrator-supplied acceptance evidence below.
Vue components are H6's; guides are U7's (the parity delta is recorded, not a finding).

## Claims

1. **The transport is exact.** `client.history.read` sends `limit`/`cursor`/`prefix` under the
   wire's own names against `GET /history`, round-trips the cursor opaquely (the browser never
   constructs or inspects one), guards the response shape strictly, and surfaces refusals through
   the established client fault path (`BrowserApplicationError`), all proved by mirrored tests.
2. **The manager derives, never stores.** All five `HistoryState` conditions
   (ideal/empty/loading/partial/error) are computed from retained facts alone; `partial` requires
   retained rows plus a fault, `error` is the rowless first-page failure; no second flag can
   drift. Continuation reads cursor presence, never page fullness — a short page with a cursor
   continues, a full page without one ends — and `older()` exists only while a cursor is present.
3. **Prefix and lifecycle law.** Submitting or clearing the prefix resets rows and cursor;
   `retry()` re-runs the failed read without changing its query; `clear()` resets every
   session-lived fact and invalidates outstanding reads (stale responses by generation cannot
   land); operator lifecycle (login/logout/adoption) clears history with the roster's semantics.
4. **The roster-change fact is honest.** A roster transition never mutates loaded rows; `changed`
   derives from a captured first-page baseline against the live roster, is false before a first
   page and after a reload, and no polling exists anywhere in the unit.
5. **The terminal carrier arrives.** The wire renders `{ tail, terminal }` (the granted
   `ApplicationHandlers.ts` change is exactly that); `ClientTail` carries both; the boolean
   reaches `operator.terminal`; a terminal run replays frames and never attaches a live
   subscription; the pre-H5 tail consumers are all updated (no compatibility shim).
6. **Placement, naming, and scope honesty.** Types first in `app/browser/types.ts`; single-word
   members; `HistoryManager` follows the `RosterManager` precedent (facts in, reactive readonly
   out, states derived, commands as methods); declarations centralized; the barrel updated; no
   nested functions; no forbidden constructs; only owned+granted files touched and no sibling
   residue anywhere in the tree.

## Evidence (Orchestrator-supplied)

The full diff is at `/home/user/scaffold/tmp/redesign/h5-evidence.diff` (1304 lines,
`git diff 42652bf..01b4fa7`); the working tree is clean (`git status --porcelain` empty).
Native acceptance: format:check, lint:check, check, build all exit 0; after `01b4fa7`,
`test:app:server` 215/215 and `test:app:browser` 372/372; `test:app:browser:integration` 10/10;
`test:src` 251/251; `test:app:core` 100/100 (log: `tmp/redesign/h5-acceptance.log`, reds repaired
by `01b4fa7` and re-run green). The analyst may run read-only commands; the reviewer rules on the
supplied evidence and source.

## Output

Per-claim numbered verdicts with `file:line` evidence, findings outside the claims if any, then
exactly one terminal line:
`VERDICT: PASS|FAIL — N broken, N unresolved, N not-evidenced, N findings outside the claims`
