# Unit browse-11-7 — repair the confirming review of item 11

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\browser-wt-fix`, branch `browse-11-repair` at `cfc3ad4`. Another writer works on `cfc3ad4`'s descendants in `C:\Users\mikes\WebstormProjects\browser-wt-browse`; touch nothing there. Make one commit; never push, publish, or install outside this worktree. Perform the assignment yourself and spawn nothing.

## Assignment

Repair every required finding in `tmp/codex/browse-11-review-2.md`: claims 2, 3, and 6, and N1. Keep claims 1, 4, and 5 as they pass. Rulings on the advisories:

- N2: remove the DOM row's indexed control from the benchmark at `tests/src/core/compilers.test.ts`, keeping the compiled pair as the like-for-like revert; the keep decision stands.
- N3: in the `switch` and `foreignObject` repair, read a `text` element only when it has no `text` ancestor inside the same `svg`, so nested `text` reads once; add the input as a `CAPTURE_CASES` row.

Both placements (`src/browser/helpers.ts` and `src/core/compilers.ts`) carry each repair; every added case runs in both.

## Evidence

- For claims 2 and 3 and for N1, record a red run of the added case on `cfc3ad4`'s code and the same command green after the repair, with the counts.
- For the `switch` rule, add one case where the first branch's conditions fail (`requiredExtensions` naming an extension the browser lacks) and the `text` branch renders.
- Measure nothing new for speed: the repairs change which nodes are read, not how the walk scales. When a repair adds a query per `svg` or per `switch`, state its cost class in the report.

## Gates

After the last edit, each exit code read bare: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src:core`, `npm run test:src:browser`, `npm run test:src:server`, `npm run test:src:bin`, `npm run test:guides`, `npm run test:policy`, `npm run test:setup`, `npm run test:setup:browser`, then `npm run build` and `npm run test:service`; then `git diff --check`. One commit. The final `git status --porcelain` is empty.

When a service test times out on `Runtime.callFunctionOn` while the host carries another writer's test run, rerun that file alone and report both runs; never relax a timeout.

## Output

Write `tmp/codex/browse-11-7-report.md` and return it as your final message: per finding the repair and its red and green evidence, the gate table, the commit hash, and any deviation. No process diary.

## Deviation contract

Stop only for a finding you cannot repair without changing a public contract the design does not name, and report: expected, found, evidence, and one hypothesis.
