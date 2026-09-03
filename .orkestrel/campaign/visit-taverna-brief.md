# Unit V-taverna — bring taverna to scaffold 0.0.60 and the catalog

## Role and engine

`implementer` on Opus 5, native Claude Code subagent, standing in for the Sol implementer (Codex
bench dark). Sole writer in `C:\Users\mikes\WebstormProjects\taverna`. Perform the assignment
directly and spawn nothing.

## Objective

Run the fleet visit from step 2 (`wave.md` § Visit a repository) so that `npx scaffold audit`
exits 0, every `@orkestrel/*` range equals the catalog with a caret, the suites the overwrite
removes from the planned config keep a home the plan does not own, and the gate chain is green
with the new lint rule repaired in taverna's own code.

## Context

Read first: `C:\Users\mikes\WebstormProjects\scaffold\.agents\skills\orkestrel-publish\references\wave.md`
§ Visit a repository; `C:\Users\mikes\WebstormProjects\scaffold\guides\scaffold.md` § Ownership
(lines 935–1052), § Generated workspace and the scripts and projects rules (600–639 and
1005–1009: an optional project is selected by a defining path the plan birth-owns, never by
editing the content-owned `vite.config.ts`), § Vendored root (1170–1291, the local settings
overlay). Evidence: `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\scaffold\probe-drift-report.md`
§ Taverna (what the overwrite replaces and removes, with `file:line`),
`absorb-consumers-report.md` § taverna, and terrain's precedent `visit-terrain-report.md`
(deletion audit by `comm`, the `no-nested-functions` repair shapes, the catalog digest proof).

Prepared and committed at `441ca4e`: `@orkestrel/probe ^0.0.11`, `@orkestrel/scaffold ^0.0.60`,
`@orkestrel/test ^0.0.12` declared; the stale catalog agent removed; the SessionStart hooks in
the ignored `.claude/settings.local.json`. The registry serves scaffold 0.0.60 and test 0.0.12
when this unit launches (the Orchestrator confirms with `npm view` in the launch message).

Standing conditions: `git status --porcelain` shows `D  package-lock.json` and
`?? package-lock.json` by the user's hand; never stage, restore, or rewrite that pair; the
untracked file is the lockfile `npm install` reads and rewrites. Commit nothing. Host: Windows
11, Git Bash; Playwright Chromium installed.

## Known refusal and what settles it

`scaffold overwrite` refuses before writing when a retained script names a `--project` the planned
`vite.config.ts` does not declare. Taverna's `test` script names `guides`, and `test:app:e2e`,
`test:app:e2e:live`, and `test:guides` name projects the floor does not carry. Rule on each,
before the overwrite, and record the ruling:

- `guides`: the tree `tests/guides/` is empty. Either add `tests/guides.test.ts` (the defining
  path that selects the planned `guides` project) with the parity proof the guide describes, or
  drop the `guides` name from `test` and delete `test:guides`. Prefer the proof where the
  repository publishes guides worth proving; record which.
- `app:e2e` and `app:e2e:live`: the HTTP journeys under `tests/app/e2e/**` and the live Ollama
  suite stay on disk and match no floor include. Give them a home the plan does not own: a
  config file outside the planned set (for example `configs/app/vite.e2e.config.ts` built from
  the floor helpers) and scripts that select it with `--config`, never with `--project` on the
  planned config. Record the file and the scripts.

Also owed before the overwrite: the `/api` dev proxy in `configs/app/vite.browser.config.ts`
(the floor wrapper replaces that file) moves to a file the plan does not own and the `dev` script
selects it; record where. The `.prettierignore` rows for `dev/demo.html` and `dev/docs.html`
leave with the replacement; rule on whether those files are formatted or moved.

## The visit, in order

1. `npm install` (the declared ranges now resolve). Read-only `npx scaffold audit`; record every
   line and the foreign set.
2. Apply the pre-overwrite rulings above; run the audit again; then `npx scaffold overwrite`
   (no `--dirty`: the tree is clean apart from the user's lockfile pair — where the overwrite
   refuses on that pair alone, run it with `--dirty` after confirming no path in the deletion
   set is uncommitted, and record it). Record its summary and every file written or deleted;
   prove the deletion set equals the foreign set with `comm`.
3. `npx scaffold audit`; record its exit and every remaining line with its owner.
4. Re-pin every remaining `@orkestrel/*` range to the catalog with a caret (the catalog table
   the overwrite refreshed in `.claude/agents/orkestrel.md`); `npm install`; `npm ls
   @orkestrel/test @orkestrel/contract` recorded.
5. `npm run format` once. Then, each read bare: `npm run format:check`, `npm run lint:check`,
   `npm run check`, `npm run build`, `npm test`. Repair a red the new `policy/no-nested-functions`
   rule raises in `app/**` with terrain's shapes (field initializer, abort-signal listener,
   method shorthand, bound method, extraction to an exported tested leaf), recording the count
   by rule before and after; stop on a red inside a vendored file or one that would change
   product behaviour.

## Scope

**Owned.** `package.json` (ranges and scripts), the untracked lockfile as `npm install` rewrites
it, every file the overwrite writes or deletes, the new e2e and dev config files, `app/**`
only where the new rule reddens it, new tests only for leaves the repair exports. **Off-limits.**
Product chrome and behaviour; version; publish; the vendored files after the overwrite writes
them (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `configs/**` beyond
the new unplanned files); `.claude/settings.local.json`.

## Output

Write `tmp/units/visit-taverna-report.md` and return it: the rulings and where each suite now
lives; the read-only audit; the overwrite summary, file list, and deletion proof; the closing
audit; the range table before and after; the `npm ls` readings; each gate's exit and summary;
each repair with its red-then-green counts; `git diff --stat`; `git status --porcelain`; claims
not closed.

## Deviation contract

Stop and report — expected, found, evidence, done or not done, one hypothesis — when the
overwrite refuses for a reason not named here, when a red sits inside a vendored file, when a
registry range is refused, or when a repair would change product behaviour. Decide and record
file names, script names, and comment wording.

## Acceptance criteria

1. `npx scaffold audit` exits 0 after the overwrite, or every remaining line is recorded with its
   owner.
2. Every `@orkestrel/*` range equals the catalog with a caret; `npm ls @orkestrel/test` reads
   0.0.12.
3. The e2e suites and the dev proxy have a recorded home outside the planned files, and the
   scripts that select them run.
4. The gate chain is green, read bare, or every red is reported with its excerpt and owner.
