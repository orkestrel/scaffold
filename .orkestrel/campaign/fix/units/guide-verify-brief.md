# Verify breaking-guide

## Role and engine

`verifier` on Claude Sonnet. Run the exact commands below in `/home/user/fleet/guide`, in order, stopping at the
first non-zero exit, and report each command with its exit code and the first failing excerpt
(at most 40 lines). Fix nothing; edit nothing; run no install and no discarding git command.

```text
npm run format:check
npm run lint:check
npm run check
npm run build
npm test
```

Observations, not criteria: a timing-suspect failure in a whole-suite run is reported with the
failing test's name; the Orchestrator takes the deciding re-run.
