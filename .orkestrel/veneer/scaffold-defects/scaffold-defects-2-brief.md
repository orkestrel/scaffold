# Unit scaffold-defects-2 — repair the review's findings on scaffold-defects

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\scaffold-wt-defects`, branch `scaffold-defects`, at `060f390b9`. Commit once more on the branch at the end; never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## Objective

An independent review ruled the first commit `FAIL 1 2 3 5 6`. Repair each finding below, with a regression that fails before the repair and passes after where the finding is behavioral. The first brief (`tmp/codex/scaffold-defects-brief.md`) and its report (`tmp/codex/scaffold-defects-report.md`) give the context.

## Findings

1. **S1, a `--projects` name that matches nothing.** `discovery.ts` now exits 2 ("vitest list failed") where the base exited 3 for a named project that collects nothing, as `SKILL.md` documents: Vitest refuses the whole listing with `No projects matched the filter "…"` when no named project matches (`node_modules/vitest/dist/chunks/cli-api.CnMVyzaz.js:13230-13232`). Keep the documented exit 3: learn the configured project names first (for example `vitest list --filesOnly --json=FILE`, which runs no module) and pass only names that exist, reporting each unmatched name through the documented rule; or treat that one refusal as an empty listing. Add a case for a script naming a project the config lacks. Also remove the empty `tmp/` folder the script leaves in the target's root (`discovery.ts:98`), or write the listing under the operating system's temporary directory.
2. **S2, the linked-worktree proof and two gaps.**
   - The proof asserts `toContain(join(scratch.path, 'primary'))` (`window.test.ts:98`), which a wrong path (`…\primary\.git` or `…\primary\.git\worktrees\linked`) also satisfies, and its fixture writes no `commondir`, so the branch every real worktree takes (`window.ts:216`) never runs. Write `primary/.git/worktrees/linked/commondir` containing `../..` (or create the worktree with a real `git worktree add`) and assert the exact phrase naming the primary clone.
   - npm searches upward from the package directory for the nearest `.git` file or directory (`@npmcli/git/lib/find.js:4-14`, `is.js:3-4`) and reads `<root>/.git/HEAD` (`@npmcli/package-json/lib/normalize.js:495-499`), so `--publish packages/NAME` inside a linked worktree passes the check today and still publishes without `gitHead`. Walk up from each directory the way npm does and refuse when the first `.git` found is a file. Add the case.
   - A submodule's `.git` file has no `commondir`; name it as a submodule rather than a linked worktree with the superproject as its primary clone (`window.ts:213-217`).
3. **S4, reverse the scoped tsconfig change.** Loading `@vitest/browser-playwright`'s types opens Node globals to the scope: its entry imports `vitest/node`, whose Vite types reference `@types/node`. Measured in veneer on 2026-10-03: with the provider's types reachable from `configs/app/tsconfig.browser.json`, `export const probeMode = process.env.MODE` in `app/browser` compiled; without them, the same line fails TS2591. Remove the provider types from every generated scoped browser and Vue tsconfig (`templates.ts:802`, `:821`, `:863`, `:922`, and `workspace.md`'s rows), restoring the scope isolation `.claude/rules/workspace.md` states (`DOM; no Node`). Instead, state the rule in `.claude/rules/tests.md` § Browser tests as one directive line: a file a browser or Vue scope compiles never loads `@vitest/browser-playwright`'s types; it reads `cdp()` as `unknown` and narrows `send` and each reply with guards (veneer's `isCDPSender`, `readCDPField`, and `countCDPListeners` in `tests/setupBrowser.ts` are the shape). Prove the isolation in the generated-workspace tests: a `process` reference in browser source fails under the scoped browser check, as the base did.
4. **S5, the directive line.** `wave.md:96` explains ("to preserve the executable modes tracked by git"); write "Pack release archives on Linux; compare archive paths, sizes, and content hashes between hosts, and report executable-mode differences separately." Rule whether `window.ts --publish` may run on `win32` at all against that line, and make the skill and the script agree. Also cut the explanatory clause in `window.md:12` ("so npm records `gitHead`") and add the missing backticks in `workspace.md:245`.
5. **Item 6, the moved distribution expectations.**
   - The release-mode proof still expects `statuses: []` (`tests/distribution.test.ts:1043`, comment at `:1029`), but with staging in `beforeAll` the cases are collected and marked skipped (`statuses: ['skipped']`); `npm test` does not run `test:distribution`, so acceptance never reached it. Confirm with `npx vitest run --config vite.config.ts --project distribution tests/distribution.test.ts -t "fails the release run"`, then repair the expectation and the comment, and check that the "collection" and "assertion" rival runs still differ from the release expectation.
   - Rewrite the stale comment at `compilers.test.ts:1997`, which still describes `it.runIf` predicates the template no longer has.
   - The generated proof now passes vacuously when no entry matches a filter (`templates.ts:2697-2729`, `:2836-2866`); call `context.skip` with the reason when the filtered list is empty.

## Acceptance

After the last edit, in order, each exit code read bare: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm test`, `npm run build`, and `npm run test:distribution -- --mode release` run through the vitest entry (`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project distribution --mode release`). Then `git diff --check`, one commit on `scaffold-defects`, and an empty `git status --porcelain`.

## Output

Write the report to `tmp/codex/scaffold-defects-2-report.md` and return it as your final message: each finding's repair with its red-before and green-after commands and counts, the acceptance table, the commit hash, and any deviation. No process diary.

## Deviation contract

On any conflict with this brief, the law, or the tree, stop and report: expected, found, evidence, done or not done, and one hypothesis.
