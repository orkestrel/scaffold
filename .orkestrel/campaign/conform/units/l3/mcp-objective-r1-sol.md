## Per-claim verdicts

1. **CONFIRMED** — Every row has a disposition at `/home/user/scaffold/tmp/units/conform/conform-mcp-report.md:20-37`. Sweeps for `\bisBrowserVuePath\b` over `tests` and `vite.config.ts`, and `readonly id: string` over `src`, support the fleet-row `noop` dispositions.

2. **CONFIRMED** — Direct inspection found the operative repairs at `package.json:93`, `src/core/MCPServer.ts:225-324`, `src/core/transports/HTTPClientTransport.ts:157-218`, `src/server/types.ts:171-210`, `src/server/middlewares.ts:96-186`, `src/core/helpers.ts:101-203`, and `src/core/types.ts:1189-1703`.

3. **REFUTED** — The exact and inflected old-symbol sweep `(?i)\b(?:isFormElicitationSupport(?:s|ed|ing)|isTaskSupport(?:s|ed|ing)|MCPCompletionManagerInterface(?:s|d|ing)?)\b` reads empty across `src`, `tests`, `guides/mcp.md`, `guides/README.md`, and `README.md`. The old `capacity` shape survives, however: `src/server/constants.ts:39` still documents ``createMCPSession`'s `capacity``, `src/server/middlewares.ts:45` still describes construction with ``capacity``, and `tests/src/server/middlewares.test.ts:95-114` retains a top-level adapter. Replace the documentation with `session.capacity` or the `session` options group, and remove the test adapter.

4. **REFUTED** — The proof commands do not match from red to green. The `mcp-obj-5` red command is the exact-path Vitest run at `/home/user/scaffold/tmp/units/conform/conform-mcp-report.md:72`, while its green command is the wider project script at line 75. The `mcp-subj-2` pair differs similarly at lines 86-88. The case at `tests/src/server/middlewares.test.ts:636-656` proves inherited-clock forwarding, but it remains green if the `session` group itself is dropped, leaving `mcp-subj-1` without a failing-first proof. Run each red command unchanged against the repaired tree and add a control that removes `sessionOptions` forwarding.

5. **CONFIRMED** — Guide surfaces reflect the contract at `guides/mcp.md:2189`, `guides/mcp.md:2394-2453`, `guides/mcp.md:2733-2738`, and `guides/mcp.md:3433-3440`. The method table matches `src/core/types.ts:1465-1477`; the loopback claim is executed at `tests/guides.test.ts:1487`. Sweeps for `from '@src/`, stale API names, stale option shapes, and `AGENTS\s*§` over the guide and its transcription read empty.

6. **CONFIRMED** — The manifest sweep for `"@orkestrel/mcp"` across `/home/user/fleet/**/package.json` names `mcp` and `probe`. The old-symbol and old-call sweep over `/home/user/fleet/probe/src` and `/home/user/fleet/probe/tests` found no affected consumer. The report names each migration at `/home/user/scaffold/tmp/units/conform/conform-mcp-report.md:245-252`.

7. **REFUTED** — `git status --short` and `git diff --name-only HEAD` return only Owned paths, with no lockfile or off-limits path. The diff nevertheless adds a compatibility shim at `/home/user/work/evidence/conform-mcp.diff:2707`, mapping the retained test-only top-level `capacity` option into `session.capacity`. Remove `tests/src/server/middlewares.test.ts:95` and its mapping at line 114.

8. **CONFIRMED** — The added-line sweep `^\+.*(?:\.skip\b|\.only\b|\.todo\b|\bretr(?:y|ies)\b|(?:test|hook)Timeout|timeout\s*:)` over `/home/user/work/evidence/conform-mcp.diff` reads empty. The report names the required commands and exit values at `/home/user/scaffold/tmp/units/conform/conform-mcp-report.md:224-229`. The independent gate reading is **NOT-EVIDENCED** and remains for the landing run.

9. **CONFIRMED** — Added-line sweeps for `TODO|FIXME`, `console\.|debugger`, suppression directives, and commented-out placeholders over `/home/user/work/evidence/conform-mcp.diff` read empty. The compatibility residue is ruled under claims 3 and 7 rather than concealed by the disposition table.

## Findings outside the claims

O1. `supportsFormElicitation` and `supportsTask` are declared in `src/core/helpers.ts:101-203`, but their behavior and added publication checks remain in `tests/src/core/validators.test.ts:764-769`, `tests/src/core/validators.test.ts:1906-1925`, and `tests/src/core/validators.test.ts:2284-2285`. This violates the mirrored-module rule. Move these cases and their predicate population to `tests/src/core/helpers.test.ts`.

O2. `tests/src/server/MCPSession.test.ts:215-227` adds a `performance.now()` busy-wait to advance `Date.now()`. This burns the runner thread and conflicts with the test-delay contract. Make the case asynchronous and use the shared `waitForDelay` helper with a short real timer.

## Referrals to the Orchestrator

None.

FAIL 3, 4, 7