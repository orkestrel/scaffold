# Unit flip-fix-a — close the falsify round's findings on proofs, titles, names, and the overrides table

## Role and engine

astra on GPT-6 Astra (effort high), reached as `codex exec` at `danger-full-access` (Chromium runs the browser and integration projects), in `/home/user/veneer`. You are the sole writer in this checkout; no other unit writes while you run. Paths are absolute or name a file under `/home/user/veneer` in prose.

## Objective

Close the twelve items in § Scope, which the falsify round's two verdicts raised against the Tailwind flip, with a proof for each change and a planted or removed control that fails each new or amended case. Commit nothing.

Read both verdicts in full before editing:

- `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/units/flip-falsify/reviewer-verdict.md`: the Orchestrator's rulings at its end bind.
- `/home/user/scaffold/tmp/codex/flip-falsify-analyst-last.md`: the analyst's report. Its F3 (delete `/home/user/veneer/src/tailwindcss/_mixins.scss`) is overruled; see § Rulings.

## State at launch

- HEAD is the commit that accepted unit `flip-header` (which edited `app/browser/**`, `tests/app/browser/**`, the showcase section of `/home/user/veneer/tests/setupBrowser.ts`, and `/home/user/veneer/tests/app/browser/integration.test.ts`). Read HEAD with `git log -1` first. Every line number in this brief was read at `473edd6`, before that commit: treat each as "(re-read at launch)" and locate the code by its text, not its number.
- The tree is clean apart from the ignored `tmp/`; dependencies are installed and `npm run build` is done.
- Digests at HEAD: `/home/user/veneer/dist/src/bootstrap/index.css` is `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f`; `/home/user/veneer/dist/src/tailwindcss/index.css` begins `22f33114` (read the full digest with `sha256sum` before your first edit and record it).
- **Host.** Linux POSIX. Run from `/home/user/veneer` with `/home/user/.wave/npm11/node_modules/.bin` first on `PATH` (npm 11). Chromium is Playwright's pinned path, which the repository configures. Network denied. A nested `git` may report "not a git repository": do not diagnose that; your own `git status --porcelain` is the authority.
- **Law.** `/home/user/scaffold/AGENTS.md` (non-negotiables: no `any`, no `as`, no `!` assertion, no `@ts-*` or lint-disable or formatter-ignore directive, no new npm package, no mocks, scripts as TypeScript run by Node, readonly interface properties, types before implementation in `types.ts`, no nested functions, `{verb}{Noun}` helpers; a structural kind file stays even when empty). Rules in `/home/user/scaffold/.claude/rules/`: `tests.md` (every case has a planted or removed control that fails), `styles.md`, `typescript.md`, `names.md`, `writing.md` (guide prose and comments: plain, present tense, `must`/`can`, no banned terms), `documentation.md`.

## Rulings

1. `/home/user/veneer/src/tailwindcss/_mixins.scss` stays (the Orchestrator's ruling under the reviewer verdict). Do not delete or edit it.
2. The claims list in the falsify briefs is the Orchestrator's to update; do not edit any brief or claims file.
3. The renames in item 8 are names only: both built sheets stay byte-identical and no record changes.
4. Where an item offers a choice (item 1's `SHEET_LAYERS` case: pin or delete; item 3's `%s` citation form), settle it and state which and why in the report.
5. `npm run test:journey` is not run by this unit (U8 reruns it).

## Scope

### Items

1. **Controls that cannot fail** (analyst F1, reviewer F4).
   - `/home/user/veneer/tests/src/tailwindcss/index.test.ts:37-63` (the order and ownership case): plant a `@layer base` rule and, separately, a layered `!important` declaration in the sheet text; run each through the case's own predicate and assert each is refused.
   - `/home/user/veneer/tests/conformance.test.ts:1234` (`pins the exclusion to the registry minus shared utilities after the Bootstrap tokens`): a mutated statement order and a dropped name, each refused.
   - `tests/setup.test.ts:131-134` (the `SHEET_LAYERS` case): pin the constant to the cascade table in `ROADMAP.md` with a planted-layer control, or delete the case if the derivation proof already covers it. Rule and say which.
   - The precedence controls at `/home/user/veneer/tests/src/tailwindcss/index.test.ts:328-353`: rerun the case's own pairing loop on sheet text mutated to emit a `.table tr` copy and on text with one copy moved after the first component rule; each must fail the invariant.
2. **Hazard witnesses for `thead` and `tfoot`** (claim 25). `/home/user/veneer/guides/veneer.md:1457` and `:1459` gain a hazard element beside the plain one (`<thead class="table-light">` and `<tfoot class="table-group-divider">`); the witness case `pins every curation witness against the lifted sheet and rejects each removed repair` in `/home/user/veneer/tests/src/tailwindcss/index.test.ts` reads both. The curation table rows change only in their Witness cell.
3. **Retired vocabulary and false titles** (reviewer F5, analyst F4, F5).
   - Retitle `tests/setup.test.ts:131` (no `mirror`) and the describe at `tests/setup.test.ts:1183` (no `exemptions`).
   - Delete the dead `'Tailwind exemption table'` branch at `tests/setup.ts:527`.
   - Rewrite the TSDoc at `tests/setupServer.ts:990`: say what the helper compiles, not where a consumer places it (the showcase puts the compile before the sheet; the integration readings use `[built, unexcluded]`).
   - Retitle `/home/user/veneer/tests/integration.test.ts:867` (`refuses a separate Bootstrap sheet beside the recipe because its important utility wins`) from "refuses" to what it reads.
   - Retitle `/home/user/veneer/tests/app/browser/integration.test.ts:944` (`reads the resolved values under its declared variant and partitions every departure of the tailwindcss face` at `473edd6`) to what the case reads (resolved values, the Tailwind readings, the census, contrast; re-read after the header unit) and update its seven guide citations (`/home/user/veneer/guides/veneer.md:1295, 1854, 1915, 2004, 2050, 2173, 2195`).
   - `/home/user/veneer/guides/veneer.md:14`: "compatibility sheet" per copy 7.5.
   - `/home/user/veneer/src/bootstrap/_mixins.scss:6`: "this switch" sits above six switches; make the comment plural.
   - `/home/user/veneer/guides/veneer.md:1869` cites `keeps every fixed text color readable in the %s color mode`, which no test carries. Find the case that measures the claim (at `473edd6`, `/home/user/veneer/tests/app/browser/factories.test.ts:256` carries `keeps the licensed light, white, dark, and black text frames readable in the %s color mode`) and cite the literal title shape the test file carries, as the guide does for other `%s` titles, or a resolved form the title-resolution script accepts. Read `/home/user/veneer/tmp/flip-guide/resolve.ts` and `/home/user/veneer/tmp/flip-guide/all-titles.txt` for the accepted forms; regenerate the title list with `/home/user/veneer/tmp/flip-guide/titles.ts` if it is stale.
   - The four other pre-existing unresolved titles: `exports only the Bootstrap registries with names keyed by their segments` (guide 548 and 1721; no test carries it at `473edd6`); `settles retained, configured, replaced, and destroyed lifetimes in the registry` (584; `/home/user/veneer/tests/src/browser/Registry.test.ts:95` carries the form without `in the registry`); `drives the $family table through its controls` (2174 and 2235; the real title ends `with motion=$motion`); `drives the modal table through its controls` (2178, and the `-t` filter at 2398). Find each case's current title in `tests/**` and cite it; where the case no longer exists, replace the sentence with the case that covers the claim. Finish with `node tmp/flip-guide/resolve.ts <titles> guides/veneer.md` exiting 0, and quote its result.
4. **The overrides table** (reviewer F3; claims 38, 39). `/home/user/veneer/guides/veneer.md:1484-1489` gains three rows, each with one integration case in `/home/user/veneer/tests/integration.test.ts` (inside the Tailwind describes) and a planted or removed control:
   - a consumer's unlayered `!important` rule after the recipe: `.mt-3 { margin-top: 2rem !important }` reads 32px under the recipe (the analyst measured it);
   - `mt-3!`: 12px under both Tailwind faces (measured);
   - the `dark:` limit: read how Tailwind 4.3.3 defines `dark` in `/home/user/veneer/node_modules/tailwindcss` (the `@custom-variant dark` default or `prefers-color-scheme`), then pin what the recipe reads for a `dark:bg-black` utility under `prefers-color-scheme: dark` emulation and under `data-bs-theme="dark"` alone. The guide's § Color mode limit (`/home/user/veneer/guides/veneer.md:2057-2065`) is the source; the row and the case agree with it.
5. **Misplaced proofs** (reviewer F6). Move `tests/setup.test.ts:11-61` (the Sass-literal pin) and `:63-73` (the barrel round trip, `recreates the tuned built sheet from its Sass barrel after one round trip`) into `/home/user/veneer/tests/conformance.test.ts` § `Tailwind compatibility recipe` (Node project; the Sass compile is available there as the existing round-trip case shows), keeping titles and controls, and list them at `ROADMAP.md:82`. The curation reader case stays in the setup proof.
6. **The census title** (reviewer F8). `/home/user/veneer/tests/app/browser/sections/integration.test.ts:123-143` checks `rounded`, `border`, and card-body `w-100` beside `h-100` and `gap-3`, each with a planted control (re-read after the header unit).
7. **Positional coupling** (reviewer F9). `/home/user/veneer/tests/setupBrowser.ts:1621` (`TAILWIND_READINGS.slice(0, 2)`) and `/home/user/veneer/tests/setupBrowser.test.ts:871` (`TAILWIND_READINGS[22]`) select by specimen and subject, not by index (re-read after the header unit). In `/home/user/veneer/tests/setupBrowser.ts` touch only these readings; the engine section is off-limits.
8. **Names across the `with` boundary** (reviewer F10). `/home/user/veneer/src/tailwindcss/_tokens.scss:253-259` passes `$shared`, `$curation`, `$defaults`, `$scoped` as `$withhold`, `$curated`, `$restored`, `$scoped`. Rename the Tailwind tokens to the switch names (`$withhold`, `$curated`, `$restored`, `$scoped`); the setup pin regexes (`tests/setup.test.ts`, or `/home/user/veneer/tests/conformance.test.ts` once item 5 moves them), `ROADMAP.md:99`, and `/home/user/veneer/guides/veneer.md:1465-1467` follow. Rebuild with `npm run build:src:tailwindcss` and `npm run build:src:bootstrap`; both digests stay equal to the values recorded at launch.
9. **Composition order** (reviewer F11; analyst claim 37). Add one integration case in `/home/user/veneer/tests/integration.test.ts` that reads `[built, unexcluded]` and `[unexcluded, built]` equal on the witness longhands, with a planted-difference control (a planted unlayered rule in one order must make the readings differ). The showcase's order stays the documented one.
10. **R11 and writer drift** (reviewer F12). `ROADMAP.md:171` lists the full R11 token list from `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/brief.md` § R11 (theme colors, grays, derived tints, shades and color-mode variants, body and border colors, border radii, font stacks, type scale, shadows, focus ring, breakpoints and container widths). The preflight writer `/home/user/veneer/tmp/units/flip-integration/preflight-record.test.ts` drops the `expect(chromium).toBe(141)` assertion (line 12); report the edit so the Orchestrator copies it to the writer's durable copy. Do not run the writer.
11. **Guide voice** (reviewer F13). `/home/user/veneer/guides/veneer.md:1478-1482` keeps one path (the Bootstrap class, or your own unlayered rule: choose one and say which); `:1220-1221` names the heading sizes as literal declarations rather than listing the "type scale" among the `--bs-*` declarations.
12. **`/home/user/veneer/src/tailwindcss/_mixins.scss` stays.** No action; listed so the report confirms it is untouched.

### Owned

Exactly the files the twelve items name: `/home/user/veneer/tests/src/tailwindcss/index.test.ts`; `/home/user/veneer/tests/conformance.test.ts` (inside the `Tailwind compatibility recipe` describe and its import block); `tests/setup.test.ts`; `tests/setup.ts` (the one branch); `tests/setupServer.ts` (the one TSDoc); `/home/user/veneer/tests/integration.test.ts`; `/home/user/veneer/tests/app/browser/integration.test.ts` (the one title); `/home/user/veneer/tests/app/browser/sections/integration.test.ts`; `/home/user/veneer/tests/setupBrowser.ts` (the `TAILWIND_READINGS` selection only); `/home/user/veneer/tests/setupBrowser.test.ts`; `/home/user/veneer/src/tailwindcss/_tokens.scss` (names only); `/home/user/veneer/src/bootstrap/_mixins.scss` (the one comment); `/home/user/veneer/guides/veneer.md`; `ROADMAP.md`; `/home/user/veneer/tmp/units/flip-integration/preflight-record.test.ts` (the one assertion); `/home/user/veneer/tmp/units/flip-fix-a/**` (free for scratch).

### Off-limits

`src/bootstrap/**` beyond the one comment; `src/tailwindcss/**` beyond `_tokens.scss`'s names (including `/home/user/veneer/src/tailwindcss/_mixins.scss`); `app/**`; the records (`recipe.json`, `preflight.json`, `incompatible.json`, wherever they sit); `package.json` and the lockfile; the engine section of `/home/user/veneer/tests/setupBrowser.ts`; every file not listed as owned. No install, commit, push, credential, `git stash`, `git add`, `git reset`, or `git checkout`; no destructive command; no tree-wide mutating gate (`npm run lint`, `npm run format`): if `format:check` fails, format only the owned files with `npx oxfmt <file>` and say so.

### Tools

`node`, the `npm run` scripts in § Acceptance, `npx vitest run --config vite.config.ts --project <project> <file> -t "<title>"`, Chromium through Vitest, `sass`, `sha256sum`, `git status`, `git diff`. Spawn nothing.

## Acceptance

Run each bare, in order, and report each exit:

1. `npm run check`
2. `npm run lint:check`
3. `npm run format:check`
4. `npm run test:setup`
5. `npm run test:src:tailwindcss`
6. `npm run test:conformance`
7. `npm run test:guides`
8. `npm run test:policy`
9. `npm run test:setup:browser`
10. `npm run test:integration`
11. `npm run test:app:browser`
12. `git diff --check`
13. `sha256sum dist/src/bootstrap/index.css dist/src/tailwindcss/index.css` after rebuilding: `7932f7a5…` and the `22f33114…` digest recorded at launch, unchanged.
14. `git diff --stat` shows no `recipe.json`, `preflight.json`, or `incompatible.json`.
15. `node tmp/flip-guide/resolve.ts <titles file> guides/veneer.md` exits 0.

Observation: `npm run test:journey` is not run.

## Return shape

Final message through the last-message file, no process diary:

1. Per item 1 to 12: done, with the evidence (each control's failing run quoted in one line: the assertion message or the expected/received pair), or not done, with the reason. Item 1 states the `SHEET_LAYERS` ruling; item 3 lists each old title and its new cited form; item 4 states Tailwind 4.3.3's `dark` definition as read and the measured values; item 11 states the path kept.
2. Each acceptance gate's exit, with the bare output of any failure.
3. The two digests before and after.
4. The edit to the preflight writer, as a one-line diff, for the Orchestrator to copy to the durable writer.
5. Final `git status --porcelain`. Nothing committed.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when: a sandbox write is rejected (never try another write mechanism); an item needs a file outside Owned; a title the guide must cite does not exist in any form and no case covers the claim; a digest changes and you cannot restore it with a names-only edit; a record would change; a verdict reading contradicts a measurement you take. Settle ancillary choices yourself and record them: test titles (plain, present tense, saying what the case reads), helper names in the `{verb}{Noun}` form, the layout of the new table rows.
