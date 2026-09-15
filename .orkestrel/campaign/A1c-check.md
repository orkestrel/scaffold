<!-- A1c-C — checker (Sonnet, native), mechanical close of U1d. Retained from the completion notification, 2026-09-15 (107 s, 26 tool uses). -->

Verdict: PASS

1. F5 met — `isToolError` and its doc block at `src/core/errors.ts:27-43`; `validators.ts:1-28` imports no `ToolError` and holds only `isToolCall`; `guides/tool.md:136-138` lists `isToolError` under `### ToolError`; Validators lead sentence at `:70` names the call-envelope guard alone; `tests/src/core/errors.test.ts:1-38` holds the guard tests; the Tests rows at `:443, 448` are correct; the barrel star-exports both files.
2. F6 met — `tests/guides.test.ts:824-831` finds the `ToolErrorContext` row and asserts the Shape cell equals `{ faults? }`.
3. F7 met — `types.ts:116-134` and `:163-172` carry no past-tense "moved"; `guides/tool.md:305-309` names "For versions from 0.0.15…".
4. F8 met — `Tool.ts:79` throws `Arguments did not parse` with no context; `guides/tool.md:357-359` states the non-record condition.
5. F9 met — `Tool.ts:73-74` appends `; variants ${n}` and `; matched ${n}`; `Tool.test.ts:1360, 1369` pin `amount: variant; variants 2` and `: oneOf; matched 2`; `type`, `missing`, `constraint` messages unchanged.
6. F10 met — no prose line exceeds 100 columns (`.oxfmtrc.json` `printWidth`); the paragraph is reflowed at `:346-359`.
7. F11 met — `helpers.ts:4-6` names `parameters` and `annotations` by reference; the guide Summary cell at `:83` reads identically.
8. Scope met — status shows the 13 modified files plus the two untracked `errors.ts`/`errors.test.ts`; no manifest, lockfile, vendored file, suppression, `any`, or bare `as`/`!`.

Referrals: none.
