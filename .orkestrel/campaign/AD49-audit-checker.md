# AD4-9 — checker lane (Sonnet, native; Read, Grep, Glob) — returned 2026-09-15

Subject: D4-9 (the scaffold surface reader accepts an exported function overload, `TSDeclareFunction`), diff `D49-diff.patch.txt`, report `D49-scaffold-overload-reader-report.md`, gates `D49-scaffold-gates-orchestrator.log.txt`. Brief: `AD49-audit-brief.md`.

Checker lane: MECHANICAL.

Claim 1 — CONFIRMED. `tests/setupPolicy.ts:1755-1769` accepts `declaration.type === 'TSDeclareFunction'` alongside `FunctionDeclaration` (added at line 1757), both fed into the same `declaration.id` identity check and `{ name, path, line }` push (lines 1764-1766). The refusal `export declaration is unsupported at ${path}:${line}: ${declaration.type}` at line 1769 is unchanged and untouched by the diff (`D49-diff.patch.txt`, hunk in `tests/setupPolicy.ts` only adds one line).

Claim 2 — CONFIRMED. `inspectPolicySurface` (`tests/setupPolicy.ts:1901-1989`) builds `owners` only from other guides' `## Surface` tables (lines 1946-1954: `if (owner === own) { grandfather.add(...); continue }`), and the collision loop at lines 1976-1989 reports a violation only `for (const owner of owners.get(declaration.name) ?? [])` — a name never checked against other declarations from the same file. No dedupe exists or was added; the report's reasoning matches the code exactly.

Claim 3 — CONFIRMED. The pin `reads an exported function overload as one name` exists at `tests/setupPolicy.test.ts:129-147`, asserting three declarations from two overloads plus the implementation with no throw, and a control asserting `export default 1` still throws `export statement is unsupported at tests/setupServer.ts:1: ExportDefaultDeclaration` (line 144-146), matching the unchanged `TSExportAssignment`/default-refusal branch at `tests/setupPolicy.ts:1771-1777`. The report states the red reading (`1 failed, 30 passed`, error `TSDeclareFunction`) before the fix and green (`31 passed`) after; this is the writer's own report, so the red/green sequence itself is `UNRESOLVED` as independent evidence — no lane other than the writer ran that command — but the pin's presence, assertions, and current green state are directly confirmed from `D49-scaffold-gates-orchestrator.log.txt` (`test:setup` exits 0, part of the 172/114 passing counts) and from reading the live test file.

Claim 4 — CONFIRMED for the diff cut at D4-9 time. `D49-diff.patch.txt`'s `host.json` hunk touches exactly two lines: the `tests/setupPolicy.ts` entry's `digest` (line 1033 in the live file, matching `9f3ab06e49c4f3f0914dc996456d992ed0ebfe484317d195b078cba40086920a`) and the top-level manifest `digest`. The brief correctly scopes claim 4 to that diff, not to the live tree, which has since moved again for unrelated `guides/tool.md`/`guides/agent.md` mirror refreshes — that later drift is outside this diff and outside this claim.

Claim 5 — CONFIRMED. `D49-diff.patch.txt` names exactly three files (`host.json`, `tests/setupPolicy.test.ts`, `tests/setupPolicy.ts`); no other path appears in the patch. `D49-scaffold-gates-orchestrator.log.txt` shows every gate step (`format:check`, `lint:check`, `check`, `build`, `test`) exiting `0` (lines 9, 13, 25, 67, 109). The diff hunks contain no `any`, no assertion (`as`/`!`), no nested function declaration, and no default export — the only additions are one `declaration.type === 'TSDeclareFunction' ||` line and one `it(...)` test block using arrow-callback form passed directly to `it`, which is the sanctioned exception.

outside: none

VERDICT: PASS
