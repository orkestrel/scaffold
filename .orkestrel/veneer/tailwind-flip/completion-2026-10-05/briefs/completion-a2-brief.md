# Unit completion-a2: cross-face load case in the conformance suite

Route: astra (implementation). You are the sole writer in your checkout `/home/user/.wave/veneer-a2` (veneer commit 4d21de7, built `dist/`, own `node_modules`). No other process writes there.

## Objective

Add one Node case to `/home/user/.wave/veneer-a2/tests/conformance.test.ts` that pins the cross-face load policy of the three styles faces: `src/tailwindcss` may `@use` `src/bootstrap` Sass partials and nothing else crosses a face boundary. The case closes items flip FV-X1, tree TW-18, lanes TW-14, units cross-face-policy, and flip FV-R4 (pin half) of `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/completion-2026-10-05/re-triage.md` § A2 (lines 121-134).

## Governing texts (read first)

- The unit: `re-triage.md` § A2 (path above).
- The law the case pins: `/home/user/.wave/veneer-a2/AGENTS.md` line 28 ("No extension face imports server code or another extension's face, with one exception: a styles extension that builds another styles extension's recreation for a utility library (`src/tailwindcss` building Bootstrap for Tailwind) may `@use` that extension's Sass partials, configured through their `_tokens.scss` switches, and imports none of its TypeScript."). Quote the sentence you read in the report; the line may have moved.
- Rules: `/home/user/scaffold/.claude/rules/tests.md` (never mocks or spies for project-owned behavior; a case title is a lowercase verb-first sentence; a control is a planted input that fails), `/home/user/scaffold/.claude/rules/typescript.md`, `/home/user/scaffold/.claude/rules/architecture.md` (no nested functions; a helper is a module-scope function), `/home/user/scaffold/.claude/rules/names.md`, `/home/user/scaffold/.claude/rules/writing.md` (comments say why, never what).
- The file's existing shape: read the module-scope helpers and the describe blocks of `tests/conformance.test.ts` before adding; follow their import style (`node:` modules, `@src/*` aliases where the file uses them) and their reader style.

## Scope

- **Owned.** `/home/user/.wave/veneer-a2/tests/conformance.test.ts`: one new case plus the module-scope helper(s) it needs, placed in the describe that fits (a describe about the Tailwind compatibility recipe or the sheets' structure; name your choice in the report). The report folder `/home/user/veneer/tmp/units/completion/a2/`.
- **Off-limits.** Every other file: `src/**`, every other test, `package.json`, the lockfile, configs, guides. The case reads `src/**` and never writes under it.
- **Made false by this change.** Nothing outside the file. Check that no test pins the count of cases in the conformance file.

## The case

1. The reader walks `src/bootstrap/**/*.scss`, `src/tailwindcss/**/*.scss`, and `src/styles/**/*.scss` and reads every `@use`, `@forward`, `@import`, and `meta.load-css()` target; it walks `src/bootstrap/**/*.ts`, `src/tailwindcss/**/*.ts`, and `src/styles/**/*.ts` and reads every `import` and `export ... from` specifier (static and dynamic `import()`); it resolves each relative target to a face (`bootstrap`, `tailwindcss`, `styles`) and classifies a load as cross-face when the source face differs from the target face. Targets that are Sass built-ins (`sass:*`), bare package specifiers, and same-face relative paths are not cross-face.
2. Admission: a cross-face load is admitted only when the source is under `src/tailwindcss`, the statement is `@use`, and the target is under `src/bootstrap`. Every other cross-face load fails the case with a message naming file, line, statement, and target.
3. Pin: the admitted set, as `file:line -> target` strings sorted, equals the five loads the shipped tree makes: `src/tailwindcss/index.scss` lines 2 to 5 (`../bootstrap/reset`, `../bootstrap/elements`, `../bootstrap/components`, `../bootstrap/utilities`) and `src/tailwindcss/_tokens.scss` line 422 (`../bootstrap/tokens`). Re-resolve the line numbers against the worktree and pin what you read. The shipped tree passes.
4. Controls, each on an in-memory copy of the tree's file list and contents (a map from path to text), never on disk, each asserted to fail with the message that names it:
   - `@use '../tailwindcss/tokens'` added to a `src/styles` partial;
   - `@forward '../bootstrap/mixins'` added to a `src/styles` partial;
   - `import '../bootstrap/sheet.js'` added to `src/tailwindcss/index.ts`;
   - `@use '../../tailwindcss/mixins'` added to a `src/bootstrap` partial.
   The reader therefore takes its inputs as data (the map), and a thin caller reads the disk; the case runs the reader once over the disk reading and four times over mutated copies.
5. Log the admitted set through `console.info` as one JSON line so a reader of the run sees it.

## Host queue

Every command that loads the CPU (check, lint, format, every Vitest run) runs only as:

```text
flock /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/a2-<name> --kind command --cwd /home/user/.wave/veneer-a2 -- <command>
```

Usage is in `/home/user/veneer/tmp/units/journey-cost/README.md`. Use a fresh `<name>` per run (the tool refuses a reused folder, exit 65). Put `/home/user/.wave/npm11/node_modules/.bin` first on `PATH` for every npm command. If the lock cannot be taken within 30 minutes, report the holder (`fuser` or `ls -l /proc/*/fd` over the lock) and stop.

## Your acceptance before handing back (all through the queue)

1. A scoped Vitest run of the conformance file: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project conformance tests/conformance.test.ts` (confirm the project name from `vite.config.ts` first).
2. `npm run test:conformance`, `npm run lint:check`, `npm run format:check`, `npm run check`.
3. `git diff --check` (direct, no queue).
4. Each control fails: show the four failure messages from a run of the file with one control's assertion inverted or by running the reader on each copy and printing the outcome; restore the file afterwards and show `git diff --stat`.

## Sandbox

You run under `danger-full-access` so the queue lock and child processes work. Treat the following as your only writable roots: `/home/user/.wave/veneer-a2` (the owned file, the worktree's own `tmp/` and `node_modules/.vite`), `/home/user/veneer/tmp/units/completion/a2/`, and `/home/user/veneer/tmp/units/journey-cost/runs/`. Never write anywhere else.

## Forbidden

Installs, commits, pushes, credentials, destructive commands (`rm -rf`, `git reset`, `git checkout --`, `git clean`, `git stash`), edits outside the owned file, tree-wide mutating gates (`npm run format`, `lint --fix`, any fixer), mocks or spies, a second writer, running any command that loads the CPU outside the queue.

## Deviation contract

Stop and report when: the admitted set you read differs from the five loads named here; a control does not fail; a gate fails on a title outside the change; a rule forces the helper into another file (say which rule and where it would go); the queue lock is unavailable for 30 minutes.

## Return shape

Report file `/home/user/veneer/tmp/units/completion/a2/report.md` with: the case title and its describe; the reader's contract in three sentences; the admitted set as read; the four control messages; every queued command with its run folder and exit code; `git status --porcelain` and `git diff --stat` at the end; deviations. Your final message is a short summary naming the report path.

## Appended ruling at relaunch (2026-10-05, after the first run's deviation report)

Your reading of `.claude/rules/architecture.md` § Kind purity and `tests.md` § Place helpers by environment is correct, and the ownership widens to match:

- **`tests/setup.ts`** (host-independent; no `node:*`) gains the exported pure reader: it takes the map from path to text and returns the admitted loads and the violations, each with file, line, statement, and target; export its result type and a face-resolution helper only if the reader needs them; TSDoc on each export in the file's existing shape.
- **`tests/setup.test.ts`** gains the reader's proof: the four controls from § The case run there as in-memory maps and each fails the reader (the proof asserts the violation the reader reports), plus one passing map that mirrors the five admitted loads. `tests/setup.test.ts` runs in the Node `setup` project.
- **`tests/setupServer.ts`** gains the exported disk loader that walks `src/bootstrap`, `src/tailwindcss`, and `src/styles` under `WORKSPACE_ROOT` and returns the map; **`tests/setupServer.test.ts`** gains its proof (it returns every `.scss` and `.ts` file under the three faces and nothing else; name the count you read).
- **`tests/conformance.test.ts`** keeps one case: it loads the disk map, runs the reader, asserts no violation, and pins the sorted admitted set to the five loads. The controls stay in the setup proof, so the case runs the reader once.
- Acceptance adds `npm run test:setup` through the queue. Everything else in the brief stands. Write the resumed run's report over `/home/user/veneer/tmp/units/completion/a2/report.md`, keeping the first as `report-deviation-1.md` beside it.

## Second appended ruling at relaunch (2026-10-05, after the Opus review of the second run)

The review confirmed the Sass reading, the admitted set, the controls, and the placement, and referred one law question. Ruling first, then the fixes; re-run the acceptance afterwards.

- **The TypeScript half leaves the reader; the toolchain enforces it.** `AGENTS.md` § Project model says "Enforce boundaries with the toolchain (Oxlint import restrictions, …). Add no second parser for TypeScript", and `.oxlintrc.json` already carries one `no-restricted-imports` override block per face (`src/core`, `src/browser`, `src/vue`, `src/server`, `app/*`) and none for `src/bootstrap`, `src/tailwindcss`, or `src/styles`. So: `scanStyleLoads` reads Sass loads only (`@use`, `@forward`, `@import` lists, `meta.load-css()`), and `.oxlintrc.json` (now in your owned set) gains three override blocks in the shape of the `src/browser` block, for `src/bootstrap/**`, `src/tailwindcss/**`, and `src/styles/**`: each carries the common patterns the browser block carries (absolute paths, URL schemes, dot segments, traversal, backslashes, `typescript`, `@app`, Node and server modules) plus one pattern per other face forbidding `@src/<face>(?:[/?#]|$)`, `@orkestrel/[^/]+/<face>(?:[/?#]|$)`, and `(?:\.\./)+(?:<face>|src/<face>)(?:[/?#]|$)`, with the message `src/<this face> must not import another styles face's TypeScript`. The reader's admission rule stays for Sass (source face `tailwindcss`, statement `@use`, destination `bootstrap`).
- **Prove the Oxlint half.** Through the queue, run `./node_modules/.bin/oxlint --config .oxlintrc.json` over two planted files you write under `tmp/` and copy into place for the run only (`src/tailwindcss/planted.ts` holding `import '../bootstrap/sheet.js'` and a second holding `import '@src/bootstrap'`): each run must report the new rule and exit non-zero; delete the planted files afterwards and show `git status --porcelain` clean of them. Then `npm run lint:check` on the shipped tree exits 0. Run `npm run test:config` as well: the vendored `tests/config.test.ts` may pin the generated lint configuration; if it refuses the added blocks, stop and report the refusing assertion (the change then moves to scaffold's generator), reverting `.oxlintrc.json` to its committed bytes.
- **Every admission conjunct gets a planted edge** (review defect 1): a data table beside `STYLE_LOAD_CONTROLS` with a `src/styles` `@use` of `../bootstrap/tokens`, a `src/tailwindcss` `@forward`, `@import`, and `meta.load-css()` of a `../bootstrap/*` partial, and a `src/tailwindcss` `@use` of `../styles/tokens`, each with its expected violation; one proof case asserts every row is a violation and none is admitted.
- **Smaller fixes:** rename `resolveStyleFace` to `inferStyleFace` (`names.md`: `infer*` derives); give `readStyleSources` a root parameter documented as `Default: WORKSPACE_ROOT` and prove the extension exclusion on a `createScratch` tree holding a `.css` and a `.md` file under a face (or drop "and nothing else" from the proof's title and say so); delete the fresh-disk-read assertion that cannot fail (`expect([...readStyleSources()]).toEqual(before)`); replace the hand-written `toBeDefined` plus `throw` with `requireValue`. Control 3 (`import '../bootstrap/sheet.js'`) leaves the reader's controls and lives in the Oxlint proof.
- **Acceptance** through the queue: `npm run test:setup`, `npm run test:conformance`, the Oxlint planted runs, `npm run lint:check`, `npm run test:config`, `npm run format:check`, `npm run check`, then `git diff --check`. Report over `/home/user/veneer/tmp/units/completion/a2/report.md`, keeping the second as `report-2.md`; the report quotes the three new override blocks' face patterns.

## Third appended ruling at relaunch (2026-10-05, after the Opus re-review of the third run)

The re-review confirmed the Sass-only reader, the planted edges, the loader, and the names, and found four defects. Fix them, then run every gate on the final bytes.

1. **Admission is exactly three conjuncts.** Delete `!target.endsWith('.ts') && !target.endsWith('.js')` from the admission; Oxlint owns the TypeScript boundary (unit S46 on scaffold) and Sass cannot load a `.ts` target. Delete the `@use '../bootstrap/sheet.ts'` row and its expected violation from the proof and assert `violations` is `[]` there.
2. **The non-mutation check reads the map the reader received.** Inside the control loop, take `const snapshot = [...changed]` before `scanStyleLoads(changed)` and assert `[...changed]` equals it afterwards; keep the original-map assertion only as the copy-isolation guard.
3. **`//` inside an unquoted `url()` is not a comment.** Add an unquoted `url\(\s*[^'"\s)]*\)` alternative ahead of the `//` alternative in the comment-blanking regex and return it unchanged; add `@import url(//cdn.example/reset.css), '../bootstrap/reset';` in a `src/styles` partial to the proof with its expected `@import -> ../bootstrap/reset` violation.
4. **Gates on the final bytes, with fresh folders**, through the queue: `npm run test:setup`, `npm run test:conformance`, `npm run lint:check`, `npm run format:check`, `npm run check`; then directly `git diff --check`, `git diff --quiet HEAD -- .oxlintrc.json` (must exit 0), and `git status --porcelain` (the five test files only). Record each exit.

Also note for the report (no change): `readStyleSources` still loads `.ts` files that the Sass-only reader ignores; keep that population, because unit S46's Oxlint proof and a later TypeScript reader may read it, and say so in the loader's TSDoc in one sentence. Report over `/home/user/veneer/tmp/units/completion/a2/report.md`, keeping the third as `report-3.md`.
