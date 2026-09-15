# Check A1c — mechanical close of the U1d fix round (`@orkestrel/tool`)

## Role and lane

`checker` on Sonnet (native; Read, Grep, Glob). One lane: U1d adopted audit A1b's prescriptions
verbatim (F5–F11), so the round closes on the Orchestrator's gate run plus this mechanical check
rather than a fresh adversarial pass (`quality.md` § Rounds and verdicts). Perform the check
directly; spawn nothing.

## Subject

The `tool` working tree after U1b → U1c → U1d. Evidence:
`C:/Users/mikes/WebstormProjects/scaffold/tmp/units/A1c-diff.patch` (`git diff` against `main`,
the untracked `src/core/errors.ts` and `tests/src/core/errors.test.ts`, `git status --porcelain`).
Briefs: `tmp/units/U1d-tool-fix-brief.md`; report `.orkestrel/campaign/U1d-tool-fix-report.md`
(writer's; establishes nothing). Prescriptions: `.orkestrel/campaign/A1b-audit-reviewer.md` F5–F11.

## Checklist (met / not met, with `file:line`)

1. F5: `isToolError` and its doc block live in `src/core/errors.ts`; `src/core/validators.ts`
   imports no `ToolError` and holds only `isToolCall`; `guides/tool.md` lists `isToolError` under
   the `### ToolError` heading and the Validators lead sentence names the call-envelope guard alone;
   `tests/src/core/errors.test.ts` holds the guard tests and `validators.test.ts` no longer does;
   the Tests rows name the right files; the barrel still star-exports both files.
2. F6: `tests/guides.test.ts` `documents the exported error context with its faults member` reads
   the guide's Shape cell and asserts it carries `faults`.
3. F7: the `@remarks` on `ToolInterface.execute` and `ToolOptions.execute` are present-tense (no
   "moved"); the guide's migration paragraph names the version it applies from.
4. F8: `Tool.ts` throws `Arguments did not parse` (no leading `: `) with no `context`; the guide
   states the condition as a non-record parse result after a clean explanation.
5. F9: the message builder appends `; variants <n>` for the `variant` arm and `; matched <n>` for
   `oneOf`; the fault-arm test pins both exact strings; the `type`, `missing`, `constraint`
   messages are unchanged from `A1b-diff.patch.txt`.
6. F10: no prose line in `guides/tool.md` exceeds the guide's column (report the longest line's
   length and number); the paragraph formerly at `:349-354` is reflowed.
7. F11: `toolToDefinition`'s doc description names both `parameters` and `annotations` as carried
   by reference, and the guide Summary cell equals it.
8. Scope: `git status --porcelain` shows only the owned files; no manifest, lockfile, or vendored
   file; no suppression directive; no `any`/`as` (other than `as const`)/`!`.

## Output

The Checklist shape: Verdict PASS or FAIL; item → met / not met → evidence; not-met items phrased
as re-dispatchable instructions; referrals for anything needing judgment.
