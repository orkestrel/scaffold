# Agent host instruments successor check

1. H1 — CONFIRMED

Evidence: The prior immutable report records H1 as `CONFIRMED`; `tmp/pass/agent-audit-controls.mjs:30-46` still bounds the section checks and requires the padded Shape headers and exact convention sentences. The successor brief directs retention of this prior confirmation, and no instrument edit changed that logic.

2. H2 — CONFIRMED

Evidence: The prior immutable report records H2 as `CONFIRMED`; `tmp/pass/agent-audit-controls.mjs:21-26,49-59` still uses exact keyed rows, requires `{}` plus, and handles CRLF in the line and ending checks. The successor brief directs retention of this prior confirmation, and no instrument edit changed that logic.

3. H3 — CONFIRMED

Evidence: `tmp/pass/agent-host-preflight.sh:7-23` rejects an existing log before redirecting output, then runs the expected-HEAD, clean-status, and guide-hash guards as top-level commands under `set -eu`. The `EXIT` trap at line 10 records the actual status after the redirected checks, and a failed guard therefore exits before the audit command at line 23. The Orchestrator's supplied control receipt records the corrected pattern stopping after a failed guard. `bash -n tmp/pass/agent-host-preflight.sh` exited 0.

4. H4 — CONFIRMED

Evidence: The prior immutable report records H4 as `CONFIRMED`; `tmp/pass/run-agent-host.sh:8-21` still rejects stale report, journal, stderr, brief, and dirty-checkout state, then invokes the established route with the required target, acceptance mode, model, effort, stream, verbosity, timeout, and Git Bash path without `allowedTools` or `disableSandbox`. The successor brief does not change this claim.

5. H5 — CONFIRMED

Evidence: `tmp/pass/validate-agent-host.sh:8-37` creates a fresh temporary log directory, records each command and its actual exit, stops on a nonzero result, and invokes audit, scoped format, scoped lint, types, the docs report, guide tests, and policy tests with read-only tooling where applicable. `tmp/units/d7n-agent-host-instruments-brief.md:54-60` explicitly scopes the validator to read-only checks and separates the docs direction writers. `scripts/docs.ts:5-7,44,284,319,439` shows that `--to guide` and `--to source` call write operations and expose no dry-run flag, so their omission is required for this validator; the Orchestrator runs those directions separately. `bash -n tmp/pass/validate-agent-host.sh` exited 0.

Syntax evidence: `node --check tmp/pass/agent-audit-controls.mjs` and `bash -n tmp/pass/agent-host-preflight.sh`, `tmp/pass/run-agent-host.sh`, `tmp/pass/validate-agent-host.sh`, and `tmp/pass/agent-preflight-errexit-control.sh` each exited 0. Instrument bodies were not executed.

VERDICT: PASS
