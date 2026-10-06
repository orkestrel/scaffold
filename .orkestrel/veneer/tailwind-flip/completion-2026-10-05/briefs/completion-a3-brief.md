# Unit completion-a3: packed `./tailwindcss/scss` cases and the ping's skip reason

Route: astra (implementation). You are the sole writer in your checkout `/home/user/.wave/veneer-a3` (veneer commit 4d21de7, built `dist/`, own `node_modules`). No other process writes there.

## Objective

Give the distribution suite two cases that prove the packed `@orkestrel/veneer/tailwindcss/scss` export the way the packed Bootstrap pair does, and make the suite's skip line name the cause the ping reports. Closes flip FV-X3 and units packed-scss-distribution (case half) of `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/completion-2026-10-05/re-triage.md` § A3 (lines 136-152).

## Governing texts (read first)

- The unit: `re-triage.md` § A3 (path above).
- The file: `/home/user/.wave/veneer-a3/tests/distribution.test.ts`. Read the `packed Bootstrap Sass` describe (near line 831: the Vite build of the bare drop-in export from a packed consumer, and the `compileString` form through `NodePackageImporter`), the `packed Tailwind recipe` describe (near 875), the `PING` constant (near 65), `runNpm`, the staging code that calls `runNpm(PING, ROOT)` (near 815), and `requireStage` (near 988-996).
- The source-side twin the cases mirror: `/home/user/.wave/veneer-a3/tests/conformance.test.ts` near lines 1655-1658 (the round trip that strips `/*$vite$:1*/` and compares with `dist/src/tailwindcss/index.css`).
- The guide fence the first case builds: `/home/user/.wave/veneer-a3/guides/veneer.md` near line 1244 (`@use '@orkestrel/veneer/tailwindcss/scss';`).
- The npm floor: `/home/user/.wave/veneer-a3/package.json` `devEngines` (npm `>=11.6.0`, `onFail: error`).
- Rules: `/home/user/scaffold/.claude/rules/tests.md`, `/home/user/scaffold/.claude/rules/typescript.md`, `/home/user/scaffold/.claude/rules/architecture.md` (no nested functions), `/home/user/scaffold/.claude/rules/names.md`, `/home/user/scaffold/.claude/rules/writing.md`.

## Scope

- **Owned.** `/home/user/.wave/veneer-a3/tests/distribution.test.ts` only: two cases in the `packed Tailwind recipe` describe, the `PING` constant, and the skip message in `requireStage` (plus the staging code that must carry the ping's exit code and first stderr line to it). The report folder `/home/user/veneer/tmp/units/completion/a3/`.
- **Off-limits.** Everything else: `src/**`, other tests, `package.json`, the lockfile, configs, guides.
- **Made false by this change.** Any test or record that pins the distribution suite's case count or its skip message text; search `tests/` and `guides/` for the old skip sentence.

## The cases

1. **Bare fence through Vite.** From the packed consumer the suite stages, a Vite build of a stylesheet holding exactly the guide fence `@use '@orkestrel/veneer/tailwindcss/scss';`. The output, after the same round trip the conformance file uses (strip `/*$vite$:1*/`, then normalize the way the Bootstrap case does), equals the packed `dist/src/tailwindcss/index.css`. Control: the same build over a fence with one planted rule appended fails the equality, and the assertion message names the planted selector.
2. **`pkg:` form through `NodePackageImporter`.** A `compileString` of `@use 'pkg:@orkestrel/veneer/tailwindcss/scss';` with `new NodePackageImporter()` rooted at the staged consumer, equal to the packed sheet after the same round trip. Control: a planted rule, as in case 1.
3. Both cases carry the `[requires the registry]` suffix the Bootstrap pair carries and take the stage through `requireStage`.
4. **Skip reason.** Drop `--loglevel=silent` from `PING`. Carry the ping's exit code and the first non-empty stderr line into the skip message, in the shape `\`npm ping\` exited CODE: LINE, so nothing was packed or installed`. When stderr is empty, say so in the message. Under npm 10.9 or later first on `PATH`, the line names `EBADDEVENGINES`.

## Host queue

Every command that loads the CPU (check, lint, format, every Vitest run, `npm pack`) runs only as:

```text
flock /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/a3-<name> --kind command --cwd /home/user/.wave/veneer-a3 -- <command>
```

Usage is in `/home/user/veneer/tmp/units/journey-cost/README.md`. Fresh `<name>` per run (a reused folder exits 65). Network: the registry is reachable through the preconfigured proxy; `HTTPS_PROXY` stays set. If the lock cannot be taken within 30 minutes, report the holder and stop.

## Your acceptance before handing back (through the queue unless noted)

1. With `/home/user/.wave/npm11/node_modules/.bin` first on `PATH`: `npm run test:distribution`. Both new cases pass and neither is skipped; show the two titles in the output.
2. Each control fails: run the file once per control with the planted rule present (an uncommitted edit you restore), show the failure message, then `git diff --stat` after the restore.
3. With the default `PATH` (npm 10 first; read `npm --version` and report it): one reading of the suite that shows the skip line naming `EBADDEVENGINES`. If `npm run` itself refuses under npm 10, start Vitest directly (`./node_modules/.bin/vitest run --config vite.config.ts --no-cache --reporter=dot --project distribution`, confirming the project name from `vite.config.ts`) so the test's own `npm ping` runs under npm 10, and say so.
4. `npm run lint:check`, `npm run format:check`, `npm run check` (npm 11 first).
5. `git diff --check` (direct).

## Sandbox

You run under `danger-full-access` so the queue lock, the registry, and child processes work. Treat the following as your only writable roots: `/home/user/.wave/veneer-a3` (the owned file, the worktree's `tmp/`, and whatever scratch the suite itself stages), `/home/user/veneer/tmp/units/completion/a3/`, and `/home/user/veneer/tmp/units/journey-cost/runs/`. Never write anywhere else; never install into the worktree's `node_modules`.

## Forbidden

Installs into the checkout, commits, pushes, credentials, destructive commands (`rm -rf`, `git reset`, `git checkout --`, `git clean`, `git stash`), edits outside the owned file, tree-wide mutating gates, mocks or spies, a second writer, CPU-loading commands outside the queue.

## Deviation contract

Stop and report when: the packed consumer cannot resolve `@orkestrel/veneer/tailwindcss/scss` (report the exports map you read from the packed `package.json`); a built or compiled sheet differs from `dist/src/tailwindcss/index.css` after the round trip (report the first differing line); a control does not fail; the registry is unreachable (report the ping's exit and stderr); a gate fails outside the change.

## Return shape

Report file `/home/user/veneer/tmp/units/completion/a3/report.md` with: the two case titles; the exact fence and `pkg:` string compiled; the two control messages; the npm 10 skip line as read; every queued command with its run folder and exit code; `git status --porcelain` and `git diff --stat` at the end; deviations. Your final message is a short summary naming the report path.

## Appended fix ruling (2026-10-05, after the Opus review of the first run)

The review confirmed the cases and the readings and found six defects. Fix each in `tests/distribution.test.ts`, re-run the acceptance, and report.

1. **The skip reason under npm 11 with an unreachable registry.** Without `--loglevel=silent`, npm 11's ping logs `npm notice PING <registry>` and the update notifier writes `npm notice` lines before any error, so the first non-empty stderr line would be a notice. Pass `--loglevel=error` in `PING` (errors still print, notices do not), and in the reason reader take the first stderr line matching `/^npm (error|ERR!)/u`, falling back to the first non-empty line, then to `stderr was empty`.
2. **Equality messages.** The permanent bare-equality assertions (near 901 and 915) must state the equality they assert, for example `the bare Tailwind Sass Vite build equals the packed dist/src/tailwindcss/index.css` and `the pkg: Tailwind Sass compile equals the packed dist/src/tailwindcss/index.css`; the planted selector names stay only on the in-case control assertions.
3. **Header comment** (lines 4-6): it says every export case derives its name from the installed manifest except the Bootstrap Sass case; name the Tailwind Sass cases in that exception, or build the importer case's specifier from `readManifestName(join(stage.installed, 'package.json'))` as the Bootstrap importer case does and keep only the Vite fence as the exception. Prefer the second.
4. **Export-resolution blind spot.** Both cases would still pass if `./tailwindcss/scss` were remapped to the built CSS, because Sass loads a plain-CSS `@use`. In the importer case keep the `compileString` result and assert that `result.loadedUrls.map(String)` contains `pathToFileURL(join(stage.installed, 'src/tailwindcss/index.scss')).href`. Add the remap as a reported reasoning control (no mutation run needed; say why the assertion fails under it).
5. **A null exit status.** When `PING_RESULT.status` is null (spawn failure or signal), report `PING_RESULT.error?.message ?? PING_RESULT.signal` in place of the exit code and line.
6. **One reason reader for both paths.** Build the reason once in a module-scope helper (`readPingReason(result)` or a name `names.md` admits) and use it in the release-gate throw near 819 and in `requireStage`, so the release failure names the real cause too.

Acceptance after the fixes: `npm run test:distribution -- --reporter=verbose` under npm 11 (both cases pass, the `loadedUrls` assertion included); the two planted-rule controls once more; the npm 10 reading once more (the skip line still names `EBADDEVENGINES`); `lint:check`, `format:check`, `check`; `git diff --check`. Report over `/home/user/veneer/tmp/units/completion/a3/report.md`, keeping the first as `report-1.md`.
