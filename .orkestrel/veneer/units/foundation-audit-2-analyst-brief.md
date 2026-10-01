# Unit foundation-audit-2 (objective lane) — falsify the integrated foundation of `@orkestrel/veneer`

Fill every section. Write `none` in an empty one.

## Role and engine

`analyst` on GPT-6 Astra (`gpt-6-astra`, effort high), reached as `codex exec` from this file brief. Executor: BENCH_ENGINE. Objective lane: correctness, constraints, cascade semantics, toolchain behaviour, and test sufficiency. A second, subjective lane runs blind on the same claims file; you never see its answer. Perform the whole audit yourself and spawn nothing. Edit no tracked file: the Orchestrator reads `git status --porcelain` before and after your run, and a lane that changed a tracked file is discarded. Astra wrote units `foundation-fix-3`, `-5`, `-6`, `-7`, `-8`, and `-10`; Claude Opus wrote `-4` and `-9`; the Orchestrator wrote the roadmap and small repairs. Attack Astra's own units as hard as the others.

## Objective

Return a verdict on the 14 numbered claims in `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/foundation-audit-2-claims.md`, each `CONFIRMED` (attacked and held, with the attack), `BROKEN` (the failing input, state, or interleaving plus the smallest correct fix), `UNRESOLVED` (what would settle it), or `NOT-EVIDENCED` (the capture that is missing), with every outside finding substantiated to the `BROKEN` standard, so the Orchestrator can rule whether the foundation is the base for the Bootstrap cascade chunk.

## Context

- **Evidence.** The claims file names the subject and the stakes. Read the design verdict `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/foundation-design-verdict.md` (the rulings the tree must satisfy, the user's three rulings, and § Findings carried), the unit reports under `C:/Users/mikes/WebstormProjects/veneer/tmp/units/foundation-fix-*-report.md`, the gate log `C:/Users/mikes/WebstormProjects/veneer/tmp/gates-final.log` (the Orchestrator's tree-wide run: format, lint, check, build, test), and the tree itself: `ROADMAP.md`, `guides/veneer.md`, `package.json`, `vite.config.ts`, `configs/**`, `src/**`, `tests/**`, `showcase/*.html`. The diff against `ec25f9e` is the change under audit: `git diff ec25f9e --stat` and `git diff ec25f9e -- <path>`.
- **Law.** The veneer checkout's own `AGENTS.md` and `.claude/rules/` (vendored from scaffold). Note that scaffold's `styles.md` was amended on 2026-09-30 to the design verdict's ruling 7 text; the vendored copy in veneer predates that amendment, and claims 1, 2, and 5 are judged against the verdict, not the stale copy.
- **Host.** Windows 11, Node 24; `node_modules` installed; Playwright Chromium installed; `dist/` built. `codex exec -C` points at the veneer checkout with a full shell.

## Unknowns

- none.

## Scope

- **Owned.** none (read-only lane).
- **Shared (report-only).** everything.
- **Off-limits.** every tracked file for writing; everything under `C:/Users/mikes/WebstormProjects/scaffold` for writing.
- **Made false by this change.** none.
- **Tools and limits.** Read, `git status --porcelain`, `git diff`, `node`, `npx tsc --noEmit --project tsconfig.json`, and the test scripts `npm run test:src:bootstrap`, `test:src:tailwindcss`, `test:src:styles`, `test:conformance`, `test:integration`, `test:setup`, `test:setup:browser`, `test:config`, `test:policy`, `test:guides`, `test:journey`, `test:journey:vue`, `test:probe` (they build ignored `dist/` output; that is not a tracked change). A probe lives under `tmp/probes/` (`npm run test:probe` collects `tmp/probes/**/*.test.ts` in Node with the workspace aliases; a browser reading goes through a temporary `include` on a face wrapper that you restore before returning, or through a `tmp/probes/` Vite config you delete) and is deleted before you return. A mutation you make to test a proof's sensitivity is made on a scratch copy or reverted before you return, with `git status --porcelain` clean of it. Never install; never commit; never run `npm run lint`, `npm run format`, or any `--fix`.

## Execution

1. Read the claims file, the design verdict, the reports, the gate log, and the diff summary.
2. For each claim, name the mutation that would make its proof fail, run it where a run is cheap (a scratch copy, a temporary edit reverted in the same step, or a probe), and record whether the assertions distinguish it.
3. Attack the cascade claims (1, 2, 5, 6) in Chromium with your own witnesses where the shipped fixtures might be too kind: a same-selector block mixing normal and important declarations; a pack root with no `data-bs-theme` under a dark ancestor; the `properties` layer of a Tailwind-shaped sheet; a consumer `@layer bootstrap` rule.
4. Attack the collection and gate claims (7, 12, 13) by reading the scripts and the project rows rather than the reports: run each project once directly and compare the list against what `test` invokes; list every vendored file that differs from `ec25f9e` and check it against `ROADMAP.md` § Scaffold propagation.
5. Attack the prose claims (10, 11) by executing a fence or a sentence where it makes a checkable statement, and by resolving every path and script the roadmap names.

## Output

Return exactly, as your final message and written to `C:/Users/mikes/WebstormProjects/veneer/tmp/units/foundation-audit-2-analyst-verdict.md`: (1) numbered verdicts in claim order, one value each, with the attack or the failing input and the smallest fix; (2) findings outside the claims, each substantiated to the `BROKEN` standard; (3) attacked and held: attacks no verdict line carries, and adjacent behaviour that looks like a defect and is correct; (4) one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids or none>`. Cite `path:line` for every fact you take from the tree. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when a test script cannot run on the host, when a probe cannot reach Chromium, or when a claim cannot be judged without an edit to a tracked file.

## Acceptance criteria

1. Every claim carries one verdict value and its evidence.
2. `git status --porcelain` after the run equals the status before it; `tmp/probes/` holds nothing of yours.

**Observations, not criteria.** none.

## Review evidence

The verdict file; `git status --porcelain` before and after.
