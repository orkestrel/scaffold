# Check the native diagnostic observation

Act as checker on the native mechanical route. Perform directly and spawn nothing.
Read AGENTS.md, .agents/orchestration.md, portability, tests, workspace, quality, and
orkestrel-falsify with its required references. Read the observation instrument brief
and author report. Review the complete current guide-policy-observe.mjs and .sh.

O1. Fixture paths and exact inert text match the named real config case. Copied config
bytes and policy bytes are unchanged. Only fresh scratch roots and the fresh output
directory are written; no package, credential, or unrelated file is touched. The real
binary invocation matches the case and never executes fixture behavior.

O2. The observer reads the real output envelope used at guide/tests/config.test.ts:1847-1863,
not an assumed array at the JSON root. Raw stdout, stderr, status, error, and signal are
retained even when spawning or parsing fails. Each reached diagnostic retains code,
filename, and message. A collection failure is nonzero; an ordinary lint-violation exit
is recorded as data. The observer never labels collected data as a green config gate.

O3. The wrapper captures and compares guide state, preserves failed collection and final
capture exits, retains logs in a fresh directory, and caps the native command. Output
paths identify every scratch resource without exposing secrets. Missing inputs or stale
output cannot silently overwrite evidence. No deletion, installation, or source repair.

Run syntax checks only. Return tmp/units/d7n-guide-policy-observe-instruments-check-report.md
with per-claim evidence and the terminal verdict. No prose counts or engine identifiers.
