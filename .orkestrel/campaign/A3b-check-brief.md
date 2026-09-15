# Check A3b — mechanical close of the U3d finish round (`@orkestrel/mcp` core)

## Role and lane

`checker` on Sonnet (native; Read, Grep, Glob). One lane: U3d adopted audit A3's prescriptions
(reviewer 6, 7, F1–F8, claim-8 tests; analyst 5, 6) verbatim or on the reviewer's own named
alternative (F1: keep `MCPExecutionContext` and state the omitting spread; F3: keep the wire type
complete and narrow the guard), so the round closes on the Orchestrator's gate run plus this
check. Perform the check directly; spawn nothing.

## Subject

The `mcp` working tree after U3 → U3c → U3d. Evidence:
`C:/Users/mikes/WebstormProjects/scaffold/tmp/units/A3b-diff.patch` (`git diff` against `main`,
`git status --porcelain`). Brief `tmp/units/U3d-mcp-finish-brief.md`; report
`.orkestrel/campaign/U3d-mcp-finish-report.md` (writer's). Prescriptions:
`.orkestrel/campaign/A3-audit-reviewer.md`, `A3-audit-analyst.md` claims 5 and 6.

## Checklist (met / not met, with `file:line`)

1. Reviewer 6: the declared gap "Not every guide fence is executed" and the `guides.test.ts` Tests
   bullet in `guides/mcp.md` name the refresh fence and its transcription.
2. Reviewer 7 / analyst 7: `guides/tool.md` byte-identical to the tool checkout's tip (the
   Orchestrator's `cmp` says identical; confirm by reading a distinguishing passage: the
   `### ToolError` table with `isToolError`, the `errors.test.ts` Tests bullet).
3. Analyst 6: the invariant formerly at `guides/mcp.md:4964` describes `tools.execute(call,
   context)` with the caller on the context and no envelope spread.
4. Analyst 5: the guide states beside the refresh example that the refresh owns the names it
   installed and that a consumer must not register a local tool under such a name.
5. F1: `#execute` takes `options: MCPMethodOptions` (no positional `caller?: unknown`);
   `MCPExecutionContext` keeps `signal` and `caller?`; the guide's delegation sentence shows the
   omitting spread and the package's test uses it.
6. F2: `tools/list` emits `annotations` only when the projection produced a member; the wrapped
   tool gets `annotations` only when the inverse produced one; the two pinning tests exist
   (`omits annotations on tools/list when a tool only declares untrusted`; `omits wrapped
   annotations when the wire descriptor has empty annotations`).
7. F3: `MCPToolAnnotations` still declares the specification's members; `isMCPToolAnnotations`
   checks only `readOnlyHint` and `destructiveHint` as optional booleans; the pinning tests exist.
8. F4: `AbortToolsInterface` and `ToolRefreshInterface` declared in `tests/setup.ts` and both
   factories annotated.
9. F5: the published refresh fence returns `{ installed, collisions, failures }` with the snapshot
   annotated; the transcription is byte-equal to the fence.
10. F6: the round-trip paragraph names the `inputSchema: { type: 'object' }` default; the
    `MCPTaskHandler` remark reads `options.caller`.
11. F7: the refresh proof lives only in `tests/guides.test.ts`; `MCPClient.test.ts` carries no
    refresh case; the projections have their own `describe`.
12. F8: the new Surface rows and imports sit in their files' existing order.
13. Claim-8 tests: `builds call envelopes without caller identity…` pins the arity; the initial
    collision case exists beside the add case.
14. Scope and rules: only owned files (plus `guides/tool.md`); `src/browser/**`,
    `tests/src/browser/**`, `tests/fixtures/**` untouched; no manifest, lockfile, vendored file;
    no `any`/bare `as`/`!`/suppression/nested function; every touched file LF-only (no `\r`).

## Output

The Checklist shape: Verdict PASS or FAIL; item → met / not met → evidence; not-met items as
re-dispatchable instructions; referrals.
