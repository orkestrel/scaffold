# Audit SD5 — seed byte-pins + release-skew limit sentence (scaffold)

Role: analyst. Engine: GPT-5.6 Sol. Read-only: audit, never edit. Attempt REFUTATION of each
claim; CONFIRMED needs the evidence that convinced you, BROKEN needs the exact failing input
and the smallest correct fix. Terminal line: `PASS` or `FAIL: <numbers>`.

Subject: the uncommitted working tree of `/home/user/scaffold` (baseline fa3a33b, writer
Claude Opus 5). Diff at `tmp/units/sd5.diff`; the ruling is
`.orkestrel/campaign/d2d-reconciliation.md` ruling 5 (seed history REFUSED; the row closes as
documented; pin the planned seeds byte-exact with a mutation control). Supplied host evidence:
the templates suite complete and green, `test:config` complete and green, `build:inventory`
regenerated with two digest rows moved.

## Claims

1. The new test pins `ARTIFACT_TEMPLATES.tests.setup` (the empty seed) and
   `ARTIFACT_TEMPLATES.tests.global` byte-exact against transcribed literals taken from a run
   (the writer's report records the code-point transcription), and those members are the seeds
   the compiler actually plans for `tests/setup.ts`, `tests/setupBrowser.ts`,
   `tests/setupServer.ts`, the service setup, and the global setup (verify against
   `src/core/compilers.ts` ~1224-1266).
2. The mutation control (`mutateSeed`) proves each pin can fail: a one-byte mutation reports
   the difference, and the writer's two-plant record shows each control assertion executes
   wired to the real seed (a drifted transcription would have passed `not.toBe` under the
   plant). Verify the control draws from outside what the pin already accepts.
3. The empty setup seed's pin is not vacuous: an empty-string pin plus its control still
   detects a seed that becomes nonempty (state how).
4. The guide sentence ("`audit` compares each setup module only with the seed the installed
   release plans, and it retains no earlier seed bytes") is true against
   `src/bin/CLI.ts` ~1335-1353 (the seed map built from `blueprintToTestArtifacts` alone), and
   its placement left the line `tests/guides.test.ts` pins byte-identical.
5. The diff obeys the repository laws in its reach; only `tests/src/core/templates.test.ts`,
   `guides/scaffold.md`, and `host.json` moved; the helpers `PLANNED_SETUP_SEED`,
   `PLANNED_GLOBAL_SEED`, and `mutateSeed` follow the test file's module-scope conventions.

## Method

Read the diff and sources; scoped read-only commands and non-spawning scoped test runs are
fine; if denied, judge from source and say so per claim.

## Output

Per-claim verdicts with evidence (file:line), then the terminal line.
