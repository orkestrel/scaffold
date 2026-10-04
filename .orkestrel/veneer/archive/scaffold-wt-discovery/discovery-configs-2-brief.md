# Unit discovery-configs-2 — gate a project only by the listing that names it, and name browser instances in the generated configs

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\scaffold-wt-discovery`, branch `discovery-configs` at `81ac20857` (your previous commit). Make two commits, in order; never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## The review

An independent review of `81ac20857` returned `FAIL 2, 3, 4, 5` and outside findings O1 to O3. Its full text is `tmp/codex/discovery-configs-review.md`. The Orchestrator's rulings follow.

## Commit 1: the census

1. **Item 2.** Gate a project only by a gate in a unit whose own listing names that project (after folding a browser instance inside that same unit). Restore the file gate to the files a root script runs directly (`gates.files`); delete the file-overlap bridge (`reachedFiles`) and the clause that carries another listing's unfiltered gate. Build the folding set per listing, from that listing's own gates, so an instance never folds into a project another unit gates, and a test both units collect is never counted twice in one row.
2. **Item 3.** Rewrite the wrapper proof so a wrapper config's project that no gate's listing names is reported `ungated`, and add a proof with two projects in one config sharing a file where only one is gated: the other must report `ungated` (red on `81ac20857`, green after). Keep the four proofs of `81ac20857` that remain true, and the control.
3. **Item 5.** Make the opening comment and `SKILL.md` state the rule as it is after item 2, including the `npm run X -- args` forward.
4. **O1.** The unions proof asserts each row's `gate`.
5. **O2.** Recognize a Vitest invocation by the command token's basename (`vitest`, `vitest.mjs`, `vitest.js`), so `node node_modules/vitest/vitest.mjs run --project x` is read as a gate again (red on `81ac20857`, green after).
6. **O3.** Treat `--mode test` as Vitest's default mode, so it lists once.
7. Run veneer's census from veneer's root with your script by absolute path and report it. Veneer's five wrapper rows and the `[object Object] (chromium)` row will flag `ungated` until veneer adopts commit 2's configs; that is the correct reading, and step 4 of your first brief is withdrawn.

## Commit 2: the generated configs name their browser instances

Item 4 found the cause: Vitest builds a browser instance's name from the raw `test.name`, and the generated factories set `name: { label, color }`, so a wrapper config that uses a factory as its root reports `[object Object] (chromium)` (`C:\Users\mikes\WebstormProjects\veneer\vite.config.ts:149`, `:253`, `:426`; `veneer/node_modules/vitest/dist/chunks/cli-api.CnMVyzaz.js:14251-14253`, `:10356`). In scaffold's templates (`src/core/templates.ts` and the factories it emits), give every browser instance an explicit name built from the project's label, `${label} (${browser})`, so the same project reports one name as a root config and as a project of `vite.config.ts`. Verify Vitest's instance `name` option against the installed Vitest first. Prove it with a generated workspace or a scratch fixture: the wrapper config and the root config report the same instance name, and discovery gates it (red before, green after). Update `tests/config.test.ts` and any snapshot or inventory the change moves (run `npm run build` before `npm test` where `host.json` regenerates).

## Gates

After each commit's last edit, each exit code read bare: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:skills`, `npm run test:policy`, `npm run test:guides`, `npm run test:config`; after commit 2 also `npm run build` then `npm test`. Then `git diff --check`. The final `git status --porcelain` is empty.

## Output

Write `tmp/codex/discovery-configs-2-report.md` and return it as your final message: per item the change and its red and green commands with counts, veneer's census, the gate tables, both commit hashes, and any deviation. No process diary.

## Deviation contract

Stop only if Vitest offers no way to name a browser instance consistently, and report: expected, found, evidence, and one hypothesis.
