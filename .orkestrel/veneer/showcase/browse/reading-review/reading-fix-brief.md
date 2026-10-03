# Unit reading-fix — repair the reading change's review

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\browser-wt-browse`, branch `ccr-d15a48b1-yyyll6` at `fcefa2a` (pushed). Make one commit; never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## The reviews

Two Opus lanes over `cfc3ad4..fcefa2a`: `tmp/codex/review-reading/objective.md` (FAIL 3, 8) and `tmp/codex/review-reading/subjective.md` (FAIL 3, 4). Repair every required change in both, with these rulings on the referrals and advisories.

## Rulings

- **Names.** `.claude/rules/names.md` § helper prefixes defines `scan*` as walking a structure and returning its findings, and reserves `matches*` for predicates; `match*` is not defined. Neither helper is released (browser `main` at `f11f821` has no `matchBrowserOutline`). Rename `matchBrowserOutline` to `scanBrowserOutline` and `matchBrowserText` to `scanBrowserText` everywhere (source, tests, TSDoc, guide rows, Summary cells), with no shim.
- **The first-row reservation.** Never cut the first row below its leading token (the text up to its first space, which carries `[OFFSET]` or `eN`) plus one character; when the reservation for a later row would, cut the first row without reserving, and the later row is skipped as today. A block whose only row would be `…` is not emitted. Add the cases both reviews give (a later row that nearly fills the space; a space of 1 to 2), and update the TSDoc and `guides/browser.md:2933`.
- **The surrogate guard.** Make the test reach it, as the objective review states (room 28), so deleting `src/core/helpers.ts:351-352` fails it.
- **The bound comment.** `tests/src/core/BrowserToolset.test.ts:884` narrates history ("Reading change: …"), which `.claude/rules/writing.md` § Code comments forbids. State the bound's derivation in the present: the measured 6,559 characters and 6,600 as the smallest multiple of 50 that holds them. Do the same for the guide's figure. The earlier length belongs in this commit's message.
- **The synthetic placeholder.** The mechanical rename left no test that calls a parameterless page tool with `purpose`. Add one in `tests/src/core/BrowserToolset.test.ts` (and assert `what` is refused there), so deleting the placeholder fails it.
- **The `tabs` move note.** State in the guide's `tabs` row that a pending move note precedes the tab list.
- **Advisories taken:** `README.md:57` uses a search word that matches what it seeks; `guides/browser.md:3443` quotes the prompt's wording ("the site's search box").
- **Advisories left:** the double `html.map` in `BrowserReading.#source(false)` (no realistic load shows harm); a match heading counting more matches than the block shows; a page tool declaring an optional `purpose` beside a required parameter (pre-existing, and nothing is stripped from it).
- **The `@orkestrel/ollama` store proof** refuses `what` after the re-pin; that migration belongs to the ollama re-pin unit, not here. Fix only this guide's sentence at `:36`, as the objective review states.

## Gates

After the last edit, each exit code read bare: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src:core`, `npm run test:src:browser`, `npm run test:src:server`, `npm run test:src:bin`, `npm run test:guides`, `npm run test:policy`, `npm run test:setup`, `npm run test:setup:browser`, then `npm run build` and `npm run test:service`; then `git diff --check`. One commit; the final `git status --porcelain` is empty. When a test times out while another writer loads the host, rerun that file alone and report both runs; never raise a budget.

## Output

Write `tmp/codex/reading-fix-report.md` and return it as your final message: per required change and ruling the repair and its red and green evidence (each added or changed test failing without its repair), the gate table, the commit hash, and any deviation. No process diary.

## Deviation contract

Stop only when a repair cannot hold without changing a contract the reading design does not name, and report: expected, found, evidence, and one hypothesis.
