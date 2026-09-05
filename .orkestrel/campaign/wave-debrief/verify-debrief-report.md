# Gate Report

1. `npm run format:check` — exit 0 (PASS)
2. `npm run lint:check` — exit 0 (PASS)
3. `npm run check` — exit 0 (PASS)
4. `npm run build` — exit 0 (PASS)
5. `npm test` — exit 0 (PASS)
6. `npm run test:distribution -- --mode release` (observation, not a criterion) — exit 1 (FAIL)

Failure excerpt for command 6:

```
FAIL  |distribution| tests/distribution.test.ts > installed package consumer > installs the packed scaffold and passes one generated core/server workspace through prepublish [requires a reachable npm registry]
AssertionError: expected 1 to be +0 // Object.is equality
- Expected
+ 0
+ Received
+ 1
 ❯ tests/distribution.test.ts:905:33
    905|     expect(dependencies.status).toBe(0)
```

The test's own title tag reads `[requires a reachable npm registry]`; `dependencies.status` of `1` at `/home/user/scaffold/tests/distribution.test.ts:905` indicates the packed-consumer `npm install` step failed in this sandbox network path.

`git status --short` after the run:

```
 M .agents/orchestration.md
 M .agents/skills/orkestrel-publish/SKILL.md
 M .agents/skills/orkestrel-publish/references/wave.md
 M .agents/skills/orkestrel-publish/references/window.md
 M .claude/agents/orkestrel.md
 M .claude/agents/reviewer.md
 M .codex/agents/orkestrel.toml
 M .codex/agents/reviewer.toml
 M ROADMAP.md
 M guides/console.md
 M guides/contract.md
 M guides/emitter.md
 M guides/guide.md
 M guides/html.md
 M guides/markdown.md
 M guides/probe.md
 M guides/process.md
 M guides/scaffold.md
 M guides/template.md
 M guides/test.md
 M host.json
 M src/core/helpers.ts
 M src/core/types.ts
 M src/core/validators.ts
 M src/server/Materializer.ts
 M src/server/Upstream.ts
 M tests/setup.ts
 M tests/setupServer.ts
 M tests/src/bin/CLI.test.ts
 M tests/src/bin/helpers.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/validators.test.ts
 M tests/src/server/Materializer.test.ts
 M tests/src/server/Upstream.test.ts
```

Anomaly: `host.json` shows modified in `git status`, consistent with the brief's note that `npm run build` rewrites it; no other anomaly observed.

GATES: GREEN
