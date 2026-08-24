# Audit PD5 — issue party for inferred projects + message hygiene (probe)

Role: analyst. Engine: GPT-5.6 Sol. Read-only: audit, never edit. Attempt REFUTATION of each
claim; CONFIRMED needs the evidence that convinced you, BROKEN needs the exact failing input
and the smallest correct fix. Terminal line: `PASS` or `FAIL: <numbers>`.

Subject: the uncommitted working tree of `/home/user/orkestrel/probe` (baseline a281141,
writer Claude Opus 5). Diff at `/home/user/scaffold/tmp/units/pd5.diff`; the writer's report
at `/home/user/scaffold/.orkestrel/campaign/pd5-report.md`; the ruling is
`/home/user/scaffold/.orkestrel/campaign/d2c-reconciliation.md` ruling 6. Supplied host
evidence: the Orchestrator's uncontended `test:src:server` reading (reported to you in the
launch prompt's addendum if present; otherwise the writer's own complete run) and the known
EXPECTED red: `test:guides` fails on the undocumented `relativeWorkspaceMessage` and the
now-false guide sentence — both carried by the PD6 unit, not defects here.

## Claims

1. The party flip is exactly the ruling's: a FILE-LESS diagnostic on an INFERRED project
   becomes `origin: 'workspace'` (`TypeStage.#issue`, the `diagnostic.file === undefined`
   branch), the caller-selected door stays `claimant`/`refused` thrown, and the writer's trace
   that no OTHER file-less door exists (lint publishes only URI-carrying diagnostics; runtime
   classifies stack frames) holds — verify the trace yourself.
2. `relativeWorkspaceMessage(workspace, message)` removes each spelling of the workspace root
   (file URL, forward-slash, native) and the revision marker, and ONLY those — the
   escaped-text boundary is real: a message carrying a literal `\n` rendering survives
   unrewritten (the writer's probe showed whole-message normalization corrupts claimant
   evidence). Attack the helper with adversarial messages from its unit tests and beyond.
3. The runtime `#issue` rewrites revision filenames out of messages (the `.probe-` suffix
   leak closed), while the cleanup issue's `path` correctly keeps the generated name (it names
   the file that could not be deleted).
4. The red-first records bind: each red names the mechanism whose absence produced it, taken
   against the actual baseline sources.
5. The `#translate` parameter removal is a genuine fold (root removal makes the parameter
   redundant) with both call sites updated — no behavior lost.
6. Scope honesty and law conformance: only the six named files moved; no `any`, no
   assertions, `#` privacy, the helper exported and directly tested, TSDoc forms correct,
   the stated Windows separator limit present in the remarks.

## Output

Per-claim verdicts with evidence (file:line), then the terminal line.
