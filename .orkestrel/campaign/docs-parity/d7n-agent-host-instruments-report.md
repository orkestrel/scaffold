# Agent host instruments report

The `node --check tmp/pass/agent-audit-controls.mjs` check exited 0.

The `bash -n` checks for `agent-host-preflight.sh`, `run-agent-host.sh`, and `validate-agent-host.sh` exited 0.

The `npm run docs -- --to guide` and `npm run docs -- --to source` directions write on drift. The read-only validator omits them because `scripts/docs.ts` exposes no dry-run flag. The Orchestrator must run either direction only as an explicit convergence step.

The instrument bodies were not executed.
