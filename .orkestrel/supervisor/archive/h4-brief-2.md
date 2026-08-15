# H4 fix round — the fresh-database start path

Successor to `h4-brief.md`. Your implementation's own listener proof failed on the
Orchestrator's native run, and the Orchestrator reproduced the cause independently of the test:

- Failing proof: `tests/app/server/ApplicationServer.test.ts` >
  `discovers and inspects completed SQLite history after an application restart` — the FIRST
  `POST /workflows` returns 500, expected 202 (assertion at :470).
- Independent reproduction: a fresh `APP_STORE=database` application (new workspace, empty
  database) answers the very first bearer `POST /workflows` with
  `500 {"code":"STORE","message":"Workflow retained-state read failed"}`. The server boots
  clean; the failure is the start path's retained-state read against a virgin database.

## The assignment

1. Root-cause it in your own diff's terms: what does the start path's retained-state read now
   touch that a fresh app-composed database does not have (or answers differently than the
   src-test composition your green matrix used)? The composition difference between the app's
   database bootstrap and the store factories your suites exercised is the first suspect.
2. Bind the defect with a LISTENER-FREE failing proof you can run red in your sandbox — at the
   store or `SupervisorApplication` seam if the cause sits below HTTP — record red, fix, record
   green. The listener-level restart proof stays as written; the Orchestrator re-runs it as
   acceptance.
3. Fix within your owned files (the H4 owned list stands). If the cause lives in an off-limits
   file, stop and report with the exact evidence.

## Scope, laws, output

Unchanged from `h4-brief.md`. Baseline is your uncommitted working tree (the Orchestrator has
NOT committed; `git status` shows your 22 modified files). Report: the root cause in two
sentences, the failing-first evidence, the diff delta, every listener-free suite green, which
suites await the Orchestrator. No diary.
