# Audit brief — U3-fix (round 2 over unit U3 declaration-rollup)

## Lanes

Three lanes over this one brief, blind to each other, each a fresh context: the subjective lane (`reviewer`, Opus 5: design fit, vocabulary, guide and template voice), the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench: correctness, constraints, what the code and the rules permit, false greens), and `checker` (Sonnet: mechanical conformance, each prescribed edit against its prescription, scope honesty). The fix was written by `builder` on Sonnet, so each reviewer lane audits work an engine other than its own wrote. Each lane reads only this brief and the evidence it names, runs no command, edits nothing, and returns per-claim verdicts. Perform the assignment directly and spawn nothing.

## Subject

Round 1 (`/home/user/scaffold/.orkestrel/campaign/ts6-api/u3-audit-verdict.md`) failed claims 7 and 11 and the seed-parity gate row, and carried the findings the fix brief `/home/user/scaffold/.orkestrel/campaign/ts6-api/u3-fix-brief.md` prescribes as edits 1 to 11; the fix report is `/home/user/scaffold/.orkestrel/campaign/ts6-api/u3-fix-report.md`. The round-1 lanes are `u3-audit-subjective.md` and `u3-audit-objective.md` in the same folder. Governing files: `/home/user/scaffold/AGENTS.md`, `.claude/rules/tests.md`, `.claude/rules/workspace.md` § Configuration authority, `.claude/rules/writing.md`, `.claude/rules/names.md`, `.claude/rules/documentation.md`.

## Review evidence

The whole U3 change including the fix, as the actual diff and status: `/home/user/scaffold/.orkestrel/campaign/ts6-api/u3-fix.diff.txt` and `u3-fix.status.txt`. Read the diff in full; read the changed files at their new state where the diff is not enough. U1's rollups sit at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6/u1/scaffold-{core,server}/rollup.d.ts`. `host.json` is stale until the verifier's `build`; do not count it.

## Claims to falsify (verdict per claim: PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing)

1. The seeded `vites.src.core` and `vites.src.server` templates are byte-identical to `configs/src/vite.core.config.ts` and `vite.server.config.ts` after the template's own escaping, the browser seed takes the same shape with the browser project and the rewrite, no seed names `vite-plugin-dts`, `dts(`, `beforeWriteFile`, or a `{{replacement}}` span, and the renderer assigns the browser and server seeds directly.
2. `nameToRewrite` is gone from `src/core/helpers.ts`, its tests, its import sites, and the guide, and no exported symbol lost its documentation or its test in the process; `serializeTypeScriptString` and `matchesPrintWidth` keep their exports, tests, and guide rows.
3. The compilers test's face expectations read the `declarationRollup` call and `rewrite: rewriteCoreSpecifier` and are named for what they prove; the byte-identity parity case is green under the verifier.
4. The scratch emit is a per-run temporary directory under `os.tmpdir()`, removed in the `finally`, and nothing under a face's `dist` but the rollup is written or removed; the TSDoc describes that location.
5. `createRequire(import.meta.url)` is bound once in `closeBundle` and serves both the compiler resolution and the extractor load; the comment above the load states the `tsc`-versus-lint reason for the literal `createRequire` form.
6. The `isExtractorModule` prose names `Extractor.invoke` and `ExtractorConfig.prepare` in place of `both`, and the guard's true branch has a case over a hand-built module beside its false cases.
7. The skip control asserts the existence of the resolved path rather than a fixed `node_modules` directory, so a hoisted install passes.
8. The roll-up proof drives the fixture face through Vite's real `build()` with `declarationRollup` in `plugins`, once with the rewrite and once without as the control, keeping the single-declaration, no-scratch, rewritten-specifier, and `@src/core` assertions, and the `serve` control still proves the hook writes nothing outside a build.
9. The workspace rule's waiver sentence names `configs/helpers.ts` beside `configs/policy.ts`, wrapped at 100 columns, and states the reason (no `configs/types.ts` may exist).
10. Round 1's passing claims still hold (the load inside the hook only, the spawn shape, the exact override, the single-word options, no `any` or assertion or suppression, scope honesty), and nothing outside the fix brief's owned files and regions changed beyond `host.json` and the campaign folder. The server rollup is byte-identical to U1's under the verifier's build; the core rollup differs from U1's only inside the `CONFIG_TEMPLATES.vites.src.*` literal types, because those seeds are what this unit changed and core's declaration embeds them (the fix report § What I could not close). The verifier's `diff` hunks are the evidence for that clause; rule CANNOT RULE on it if they are absent from your evidence.
11. The fix report's flagged deviations are right: deleting the test `joins the declaration rewrite only while the line it prints fits the width` is correct because no code path can produce the behaviour it asserted once `nameToRewrite` is gone and no other test covered that path; the `MAX_NAME_LENGTH` and `isNumber` import removals in `tests/src/core/helpers.test.ts` follow from the deleted block and nothing else used them; and the split of the skip control into `finds the resolved extractor on disk` and `rejects resolving the unavailable extractor` keeps both assertions' substance and their applicability conditions while satisfying `vitest/no-conditional-expect`.
12. Every test name in the fix names what the test proves rather than the control that specified it, and every new or renamed case runs under the project the vendored `vite.config.ts` gives its path.

## Output

Per claim, the verdict and its evidence (`file:line`). Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
