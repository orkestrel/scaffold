# Brief — `d7n-browser-converge-fix` (browser's fix round on the audit's findings)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/browser` from the committed tip `b41f54c` (clean; the guide head start `0.0.18` installed `--no-save`, `dist/src/core/index.js` sha256 `b6dae38c…`; the closure re-installs the final pack and re-verifies after this round). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-browser-converge-fix/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md` § Code tokens, references, and links; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 7, § Ruling 9, § Ruling 16, § Ruling 18, § Ruling 21, § Ruling 22; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-browser-audit-verdict.md` (items B1 to B12); `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-browser-converge-report.md`; `/home/user/fleet/abort/guides/abort.md:1-30`.

## Items

1. **Hyphens at line ends (B1, Ruling 22).** Rewrap `src/core/errors.ts:58-59` and `src/core/helpers.ts:476-477`, `:1417-1418`, `:1585-1586` so `mid-request` and `off-shape` sit on one line; `npm run docs -- --to guide`; `guides/browser.md:98`, `:149`, `:555`, `:558` then read the compounds whole. Sweep every doc block under `src/**` for a line ending in `[a-z]-` (`grep -rnE '[a-z]-$' src --include=*.ts`) and rewrap each hit that is a compound.
2. **The core quickstart's heading (B2, Ruling 22).** `guides/browser.md:41`'s fence takes its own heading at the level of `### Connect to a browser and drive a page` — `### Drive the core client over an injected transport`, the § Patterns wording at `:2154` — with one lead-in sentence between the heading and the fence; the titled heading keeps only its own fence. Check the titled pair still reads at zero.
3. **Code tokens in cells (B3, Ruling 22).** In the source blocks behind `guides/browser.md:226` (`src/core/types.ts:21`), `:227` (`:63`), `:236` (`:206`), `:246` (`:1659`), `:449` (`src/server/types.ts:143`), `:451` (`:308`): each code token takes backticks and a following noun ("Describes the options for creating a `CDPClient`"), and the transport is "the text pipe a `CDPClient` sends and receives JSON-RPC frames over" wherever it is named (`:226` and `:958` agree); then `--to guide`.
4. **Surfaces by position (B4).** `guides/browser.md:16-17` reads "Import the environment-agnostic core from `@orkestrel/browser` and the Node runtime from `@orkestrel/browser/server`."
5. **The retired term (B5, Ruling 22).** `guides/browser.md:460` `#### Extended constants and entities` splits into `#### Extended constants` and `#### Extended classes` with the rows sorted by kind (each table keeps its columns and every cell); `README.md:59` drops `entities` for the classes' names or "classes". Re-run the guide's own drop-in case that reads headings if any (`npm run test:guides`).
6. **The README's front door (B6).** `README.md:47-51` uses `createCDPClient({ transport })` the way the guide's core fence does; the README's `ts` fences still import real exports (the README-fence case, where the suite carries one).
7. **`BROWSER_RESULT_LIMIT_PATTERN` (B7, Rulings 7 and 18).** `src/core/constants.ts:122-130`: the description reads "Matches the in-page result-limit sentinel error message, anchored immediately after the `Error:` (optionally `Uncaught Error:`) prefix Chromium prepends to a thrown error's description." and ends with the pattern in a code span; the anchoring rationale moves to a new `@remarks`; then `--to guide`.
8. **Dropped facts and a repeated remark (B8).** `BROWSER_WAIT_POLL_INTERVAL_MS` (`src/core/constants.ts:132`) regains in `@remarks` the slack a wait adds to its own CDP call timeout and the delay between host-side CDP readiness probes (the baseline cell in `d7n-browser-converge.diff.txt:129`); `CDPError`'s `@remarks` at `src/core/errors.ts:40-47` stops restating the description's field list and keeps the branching guidance.
9. **The link and the emphasis (B9).** `src/core/errors.ts:80` reads `{@link BROWSER_RESULT_LIMIT}` again; `src/core/constants.ts:94` reads "This counts UTF-16 string length (`String#length`), not transport bytes"; `src/server/types.ts:210-212` lowers `LOCAL DETACH ONLY` and `REMOTE` keeping the contrast; then `--to guide`. Close with `grep -rnE '\b[A-Z]{3,}\b' src --include=*.ts guides/browser.md` ruled hit by hit (`CDP`, `DOM`, `HAR`, `URL`, `JSON`, `UTF`, `HTML`, `CSS`, `ARIA`, error codes, and other data tokens stay); state the pattern, the paths, and the permitted hits.
10. **`BROWSER_CODEGEN_SOURCE`'s remark (B10).** `src/core/constants.ts:229-232` reflows to the block's width.
11. **Pointers (B11).** `guides/browser.md:217`, `:1082`, `:1137`: `below` and `above` become `later`, `preceding`, `that follows` per `.claude/rules/writing.md`.
12. **Propagation.** `npx oxfmt --write <paths>`; `npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at `written: 0`.

## Scope

Owned: `guides/browser.md`, `README.md`, the doc blocks under `src/**` (no code token moves). Off-limits: everything else, including `tests/**`, every vendored file, `package.json`, `package-lock.json`, `guides/README.md`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. `npx oxfmt --check guides/browser.md README.md src/core/errors.ts src/core/helpers.ts src/core/constants.ts src/core/types.ts src/server/types.ts`, `npx oxlint --config .oxlintrc.json --deny-warnings src`, `npm run check` exit 0.
3. `npm run docs` at zero; both directions `written: 0`.
4. `grep -n 'mid- \|off- ' guides/browser.md` prints nothing; `grep -rnE '[a-z]-$' src --include=*.ts` prints no compound break; `grep -c '^### Drive the core client over an injected transport' guides/browser.md` reads 1; `grep -n 'entities\|the first surface\|the second from' guides/browser.md README.md` prints nothing; `grep -c 'createCDPClient' README.md` reads at least 1 and `grep -c 'new CDPClient' README.md` reads 0; `grep -c '{@link BROWSER_RESULT_LIMIT}' src/core/errors.ts` reads at least 1; `grep -nE '\b(STRING LENGTH|BYTES|LOCAL DETACH ONLY|REMOTE)\b' src/core/constants.ts src/server/types.ts` prints nothing; `grep -nw 'below\|above' guides/browser.md` prints nothing.
5. `PATH=/opt/npm11/bin:$PATH npm run test:guides` and `npm run test:policy` exit 0 (record the summaries); `test:src:core` as an observation (the host is under load; report a timing red with its reading, do not diagnose it).

## Output

`/home/user/scaffold/tmp/units/d7n-browser-converge-fix-report.md`: per item the hunk, per criterion the exact command with its argument list and its last lines, the all-caps sweep's pattern, paths, and permitted hits, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on a gate outside the owned files going red, a cell Ruling 12 cannot express, or a heading split that a test outside the owned files reads. Decide ancillary matters (the lead-in sentence, the exact reflow) and record them.
