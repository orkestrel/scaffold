# Ollama host instruments check

1. O1 — CONFIRMED

Evidence: `tmp/pass/ollama-audit-controls.mjs:25-42` requires the bounded `## Surface` section, its padded table header, and each required convention sentence. `tmp/pass/ollama-audit-controls.mjs:44-48` rejects a keyed function, const, or class row with a blank Shape cell. The checks operate on bounded text and do not inspect authored signatures or capitalization globally.

2. O2 — CONFIRMED

Evidence: `tmp/pass/ollama-host-preflight.sh:7-23` refuses an existing log, redirects to a fresh log, installs an EXIT status trap, and performs top-level exact-HEAD, clean-tree, guide-hash, and audit checks under `set -eu`. A failed guard exits before the audit, while the trap records its status.

3. O3 — CONFIRMED

Evidence: `tmp/pass/run-ollama-host.sh:8-21` rejects missing brief, stale report/journal/stderr paths, and dirty state before invoking the established route. Its prompt limits the writer to Read, Grep, Glob, Edit, and Write, forbids Bash and alternate execution, and forbids installation, delegation, commits, and permission changes. The invocation has no `allowedTools` or `disableSandbox` override.

4. O4 — CONFIRMED

Evidence: `tmp/pass/validate-ollama-host.sh:8-37` creates a fresh temporary log directory, records each command and actual exit, stops on failure, and invokes audit, `npx --no-install` format/lint, type, docs report, guide, and policy checks from Ollama. It contains no mutating docs direction or write-format/lint command. The source-server observation and fixed-point docs directions remain root duties per `tmp/units/d7n-ollama-host-instruments-brief.md`.

5. J1 — CONFIRMED

Evidence: `tmp/pass/journal-milestones.mjs:3-27` reads only the supplied journal, splits CRLF, skips empty lines, parses JSON events, and breaks only on an incomplete final line while throwing for malformed earlier lines. It emits selected tool name, path, timestamp, and result state fields; it does not print tool argument bodies, source snapshots, or model identifiers. `node --check tmp/pass/journal-milestones.mjs` exited 0.

Syntax evidence: `bash -n tmp/pass/ollama-host-preflight.sh`, `run-ollama-host.sh`, and `validate-ollama-host.sh`, plus `node --check tmp/pass/ollama-audit-controls.mjs`, each exited 0. No instrument body was executed.

VERDICT: PASS
