# Finding F1 — toolbox pins agent ^0.0.21 while the registry holds 0.0.22 (2026-09-15)

Found by the D1 objective lane (GPT-6 Astra, thread `01a0a343-ee12-7df0-8453-93c5e3331ada`),
verified by the Orchestrator:

```text
toolbox/package.json:86:		"@orkestrel/agent": "^0.0.21",
ollama/package.json:75:		"@orkestrel/agent": "^0.0.22",
```

Owner: the `@orkestrel/toolbox` package (L6), outside this campaign's write scope. It is the
re-pin obligation the earlier campaign's publish of agent 0.0.22 left open; toolbox's tree is
clean on `main` at `680efcd`. O1's report covered only the manifests it was given and did not see
this row. This campaign's publish order (O1 (b), (c)) already obliges toolbox to re-pin after a
tool or agent bump, so the re-pin lands with that step rather than as a separate release now.

Carried, not closed here.
