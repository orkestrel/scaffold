# Unit round 3 — verify

Returned by Workflow wf_a36bf00c-f17 node verify on 2026-09-05; captured verbatim by the Orchestrator.

1. `npm run format:check` — exit 0
```
Checking formatting...
All matched files use the correct format.
Finished in 8407ms on 222 files using 4 threads.
```

2. `npm run lint:check` — exit 0
```
> @orkestrel/scaffold@0.0.63 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
```

3. `git diff --check` (after `git add -N PROPOSAL.md`) — exit 0
```
(no output)
```

4. `npx oxfmt --config .oxfmtrc.json --check PROPOSAL.md` — exit 0
```
Checking formatting...
All matched files use the correct format.
Finished in 686ms on 1 files using 4 threads.
```

GATES: GREEN
