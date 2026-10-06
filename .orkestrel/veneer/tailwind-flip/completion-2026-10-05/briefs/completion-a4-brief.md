# Unit completion-a4: the guide case-title gate

Route: astra (implementation). You are the sole writer in your checkout `/home/user/.wave/veneer-a4` (veneer commit 4d21de7, built `dist/`, own `node_modules`). No other process writes there.

## Objective

Add one case to `/home/user/.wave/veneer-a4/tests/guides.test.ts` that resolves every span `guides/veneer.md` cites as a test case against the titles under `tests/`, so a retitled case can no longer leave a dangling citation. Closes flip FV-X13 (rest) and units guide-titles (rest) of `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/completion-2026-10-05/re-triage.md` § A4 (lines 167-178).

## Governing texts (read first)

- The unit: `re-triage.md` § A4 (path above).
- The file: `/home/user/.wave/veneer-a4/tests/guides.test.ts`. Every package assertion registers inside the anonymous callback passed to the `GuideCommand` `execute` method (`/home/user/scaffold/.claude/rules/documentation.md` § Parity names that shape); read the existing cases there and the `files`, `report`, `root`, and `rows` the callback receives, and register the new case the same way.
- The guide: `/home/user/.wave/veneer-a4/guides/veneer.md`. A citation is a backticked span followed by the word `case` or `cases` (possibly after a closing paren, a comma, or `and`), or a backticked span in a table column headed `Case` or `Cases` (tables near lines 1281, 2452, and 2628 at 4d21de7).
- Titles: every `it(`, `it.each(...)(`, `it.skipIf(...)(`, `test(`, and `describe(` title string under `/home/user/.wave/veneer-a4/tests/**/*.ts`, in single quotes, double quotes, or template literals. In a title, `%s`, `%d`, `$name`-style fields, and `${...}` match any text; everything else matches literally.
- Prior art you may read and must not import: the ignored `/home/user/veneer/tmp/flip-guide/resolve.ts` flagged 48 spans at 4d21de7 that are not titles (CSS values, class names, file paths). Your reader must read only spans in a citation position, so those 48 are never read.
- Rules: `/home/user/scaffold/.claude/rules/tests.md`, `/home/user/scaffold/.claude/rules/typescript.md`, `/home/user/scaffold/.claude/rules/architecture.md` (no nested functions), `/home/user/scaffold/.claude/rules/names.md`, `/home/user/scaffold/.claude/rules/writing.md`, `/home/user/scaffold/.claude/rules/documentation.md` § Parity.

## Scope

- **Owned.** `/home/user/.wave/veneer-a4/tests/guides.test.ts` (the case and its module-scope reader helpers). Where a cited title has drifted from the test tree (the test was retitled and the guide was not), you may correct that one span in `/home/user/.wave/veneer-a4/guides/veneer.md` to the current title and must list every such correction with the old and new text; make no other guide edit. The report folder `/home/user/veneer/tmp/units/completion/a4/`.
- **Off-limits.** Every other file. Never retitle a test to make a citation resolve.
- **Made false by this change.** Nothing, unless a `findDrift` row or another guide case pins a sentence you correct; search before editing.
- **Effect on unit J (report-only).** After this lands, the journey unit's lane 0 retitles the cases cited near `guides/veneer.md:2140` and `:2174-2175`; your case will make `test:guides` fail until that lane updates the guide. Say in the report which spans those are.

## The case

1. Reader one collects the citation spans from the guide text with their line numbers and the rule that admitted each (`word` or `column`).
2. Reader two collects the titles from the test tree with file and line, and turns each into a matcher (literal text with the placeholder fields widened to any text; anchor both ends).
3. The case asserts that every span resolves to at least one title, and reports every unresolved span as `line: span` in one message; it logs the counts (spans, titles, resolved) through `console.info` as one JSON line.
4. Controls, each on in-memory copies (the guide text and the title list as data), never on disk: a planted citation `the \`walks the moon on a Tuesday\` case` fails and the message names it; a planted CSS-value span `\`1280px\`` with no `case` after it is not read (the span count is unchanged); a planted span in a `Case` column cell resolves when its title exists and fails when it does not.
5. Zero unresolved spans on the shipped guide, after at most the drift corrections the Scope admits.

## Host queue

Every command that loads the CPU (check, lint, format, every Vitest run) runs only as:

```text
flock /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/a4-<name> --kind command --cwd /home/user/.wave/veneer-a4 -- <command>
```

Usage is in `/home/user/veneer/tmp/units/journey-cost/README.md`. Fresh `<name>` per run (a reused folder exits 65). Put `/home/user/.wave/npm11/node_modules/.bin` first on `PATH` for npm commands. If the lock cannot be taken within 30 minutes, report the holder and stop.

## Your acceptance before handing back (through the queue unless noted)

1. `npm run test:guides`: the new case passes with the counts logged.
2. Each control fails or holds as stated: run the file with each control's expectation inverted (an uncommitted edit you restore), show the messages, then `git diff --stat` after the restore.
3. `npm run lint:check`, `npm run format:check`, `npm run check`.
4. `git diff --check` (direct).

## Sandbox

You run under `danger-full-access` so the queue lock and child processes work. Treat the following as your only writable roots: `/home/user/.wave/veneer-a4` (the owned files and the worktree's `tmp/` and `node_modules/.vite`), `/home/user/veneer/tmp/units/completion/a4/`, and `/home/user/veneer/tmp/units/journey-cost/runs/`. Never write anywhere else.

## Forbidden

Installs, commits, pushes, credentials, destructive commands (`rm -rf`, `git reset`, `git checkout --`, `git clean`, `git stash`), edits outside the owned files, tree-wide mutating gates, mocks or spies, a second writer, importing anything under `tmp/`, CPU-loading commands outside the queue.

## Deviation contract

Stop and report when: more than ten spans fail to resolve on the shipped guide (list them; the reader's admission rule may be wrong); a span resolves only by weakening the matcher beyond the placeholder fields; a control does not behave as stated; a gate fails outside the change.

## Return shape

Report file `/home/user/veneer/tmp/units/completion/a4/report.md` with: the case title; the two admission rules as implemented; the counts logged; every guide correction (line, old span, new span); the unit J spans; the control outcomes; every queued command with its run folder and exit code; `git status --porcelain` and `git diff --stat` at the end; deviations. Your final message is a short summary naming the report path.

## Appended placement ruling (2026-10-05)

When `.claude/rules/architecture.md` § Kind purity or `tests.md` § Place helpers by environment forces the readers out of the test file, this ruling applies instead of the deviation clause: the pure matcher (title text to matcher; guide text to citation spans with line and admission rule) goes to `tests/setup.ts` with its proof and the three controls in `tests/setup.test.ts`; the disk walk that collects titles from `tests/**/*.ts` goes to `tests/setupServer.ts` with its proof in `tests/setupServer.test.ts`; `tests/guides.test.ts` keeps one case that loads, matches, and asserts zero unresolved spans. Those four files join the owned set; acceptance adds `npm run test:setup` through the queue.

## Second appended ruling at relaunch (2026-10-05, after the first run's stop)

- **A matcher with no literal text is not a title to cite.** A title whose text is entirely placeholder fields (`$name` at `tests/src/browser/Placement.test.ts:430` is one) widens to a catch-all and proves nothing; the title reader excludes every such title from the matching set, counts them, and the case logs the count beside `spans`, `titles`, and `resolved`. The report lists each excluded title with file and line. A citation that resolved only through an excluded title must resolve through another title or is reported unresolved.
- **The column rule admits a cell that is exactly one span.** A `Case` or `Cases` column cell counts as a citation only when the cell's trimmed content is one backticked span and nothing else; a cell that holds prose with spans inside it (the Motion table near `guides/veneer.md:2628-2632`, whose `Cases` column names `CAPTURE=1`, `light-390`, and `dark-1280` inside sentences) is not a citation. Report that table as a misnamed column for unit B5 (which owns § Showcase) and do not edit it.
- **Placement.** The appended placement ruling earlier in this file applies: the pure readers (span admission over guide text; title text to matcher) move to `tests/setup.ts` with their proof and the controls in `tests/setup.test.ts`; the disk walk that collects titles from `tests/**/*.ts` moves to `tests/setupServer.ts` with its proof in `tests/setupServer.test.ts`; `tests/guides.test.ts` keeps one case that loads, matches, and asserts zero unresolved spans with the counts logged. Keep the TypeScript-parser approach for titles. Acceptance adds `npm run test:setup` through the queue.
- **Controls** stay as the brief states, now proven in `tests/setup.test.ts` on in-memory inputs: the planted word citation fails and names `walks the moon on a Tuesday`; the CSS-value span is not read; the single-span column cell resolves with its title present and fails without it; and a new control: a catch-all title in the title list does not make the planted citation resolve.
- **Report path.** Keep the first report as `/home/user/veneer/tmp/units/completion/a4/report-deviation-1.md` and write the resumed run's report over `report.md`.

## Third appended ruling at relaunch (2026-10-05, after the second run's lint stop)

- **No TypeScript compiler API.** `.oxlintrc.json` forbids importing `typescript` from tests ("the in-process compiler API is not a surface the fleet uses"), and that law stands over the earlier "keep the parser" sentence, which is withdrawn. Replace the parser with a text reader in `tests/setup.ts` that reads registration call forms by a bounded grammar: a call head `it`, `test`, or `describe`, optionally followed by `.skip`, `.only`, `.todo`, `.concurrent`, `.each(...)`, `.skipIf(...)`, or `.runIf(...)` (the parenthesized forms may span lines and nest brackets and strings), then `(`, then the first argument as a single-quoted string, a double-quoted string, or a template literal; `${...}` widens as before, escapes resolve, and a title may span lines inside a template. Record file and line of the title's opening quote. Everything inside a comment or a string that is not a title argument is not read: skip `//` and `/* */` comments before matching.
- **Equivalence reading.** The parser run `a4-guides-03` logged `{"spans":218,"titles":1155,"resolved":218,"excluded":1}`. The text reader must reproduce those counts on the unchanged tree and resolve the same 218 spans; report any title the two readings disagree on, with file and line, and rule each (a title the parser saw and the text reader misses is a grammar gap to close; a non-title the text reader admits is a false hit to exclude).
- **Lint.** Fix the diagnostics the second run left: `ReadonlyArray<T>` or `Array<T>` for the complex array types in `tests/setup.ts` and `tests/setupServer.ts`, and a message on the `toThrow` assertion in `tests/setupServer.test.ts`. `npm run lint:check` must exit 0.
- **Keep** the admission rules, the catch-all exclusion, the controls (re-run `a4-controls` after the reader change), and the `runIf` recognition. Acceptance as the brief and the second ruling state, with `test:setup`, `test:guides`, `lint:check`, `format:check`, and `check` through the queue.
- **Report path.** Keep the second report as `/home/user/veneer/tmp/units/completion/a4/report-deviation-2.md` and write the resumed run's report over `report.md`.

## Fourth appended ruling at relaunch (2026-10-05, after the Opus review of the third run)

The review confirmed the admission rules, the controls, the counts, and the placement, and found twelve defects plus two questions. Rulings on the questions first, then the fixes; re-run the acceptance afterwards.

- **The lexer stands.** `AGENTS.md`'s "Add no second parser for TypeScript" governs boundary enforcement by the toolchain; this reader is a bounded scanner over the registration grammar for guide parity, the compiler API is closed to tests by lint, and no installed tool lists titles without launching the browser projects. Record in the reader's TSDoc `@remarks` that it reads the registration grammar only and never evaluates code. A misread must fail closed, never silent: an unterminated quoted string ends at its line break and yields no title; a file that contains a registration head token (`it(`, `test(`, `describe(`, or a head followed by a modifier) and yields zero titles is reported by the inventory as a `lexed` failure with its path, and the proof plants one.
- **A `.todo` title satisfies no citation.** The reader records the modifier chain; a title under `todo` is excluded from the matching set and counted as `todo` in the logged line; `skip`, `skipIf`, `runIf`, `only`, and `concurrent` titles stay in the set. The `.todo` title at `tests/src/styles/index.test.ts:39` is cited nowhere in the guide today (0 hits), so no span changes.
- **Exclusion widens to "no letter or digit".** A title whose literal text (after the placeholder fields are removed) holds no letter and no digit (`/[\p{L}\p{N}]/u` finds nothing) is excluded and counted, so `$plugin-$motion` at `tests/src/browser/Placement.test.ts:969` joins `$name`. Control in `tests/setup.test.ts`: the planted citation `walks-the-moon` stays unresolved against `[{ title: '$plugin-$motion' }]`.

Fixes in the owned files:

1. **Regex versus division.** Read `/` as division only after an identifier that is not a keyword, a number, a string or template token, `)`, or `]`; otherwise read a regular expression literal. Proof cases: `x && /it('ghost')/` yields no title; `ok || /'/` followed by a real registration still reads that registration.
2. **Unterminated strings** end at the line break and yield no title (see the first ruling); proof: a title after the bad line is read.
3. **Membership in the guide case.** Beside the totals, assert that the shipped guide's citations include one `column` citation from the composition table (the `Case` column near line 1283) and one `word` citation (for example the span near line 2448), and that both rule values occur.
4. **Reuse `escapeRegExp`** from `@orkestrel/guide` (its host-independent root export) at both sites instead of the inline escape.
5. **TSDoc `Default:`** on the `previous` parameter of the token reader.
6. **Split resolve from describe**: `filterUnresolvedCases(citations, titles)` returns the unresolved records; `describeUnresolvedCases(unresolved)` returns the `line: span` lines; `resolved` is `citations.length - unresolved.length`.
7. **Rename `readCaseGroup`** to a prefix whose contract admits absence (`scanCaseGroup`), and update its callers and proof.
8. **Hoist the escapes table** to an exported frozen `UPPER_SNAKE_CASE` constant with one-line TSDoc.
9. **Declare the record types** (`CaseCitation`, `CaseTitle`) as exported interfaces in `tests/setup.ts` and use them in every signature, including `readCaseTitles` in `tests/setupServer.ts`.
10. **Use the stored matchers.** The resolver takes the title records with their matchers instead of rebuilding each matcher from the title text.

Acceptance after the fixes, through the queue: `npm run test:setup`, `npm run test:guides` (the counts line now carries `todo` and the widened `excluded`; quote it), the five controls plus the two new ones inverted and restored, `npm run lint:check`, `npm run format:check`, `npm run check`, then `git diff --check`. Report over `/home/user/veneer/tmp/units/completion/a4/report.md`, keeping the third as `report-3.md`.

## Fifth appended ruling at relaunch (2026-10-05, after the fourth run's timeout stop)

- **A 15 s timeout of an untouched case is a load reading, not a stop.** When an untouched case times out at its budget while other lanes share the host, record the run folder and re-run the same selection once through the queue; a second timeout of the same case is the stop; a pass continues. "A gate fails outside the change" means an assertion failure or a repeated timeout.
- **Finish the acceptance on the final bytes** through the queue: re-run the lexed-failure control inversion and restoration, `npm run test:setup`, `npm run test:guides`, `npm run lint:check`, `npm run format:check`, `npm run check`, then `git diff --check`; cite each run folder and quote the counts line.
- **Report path.** Keep the fourth report as `report-4.md` and write the resumed run's report over `report.md`.
