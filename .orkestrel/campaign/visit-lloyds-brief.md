# Unit V-lloyds — bring lloyds to scaffold 0.0.60 and the catalog

## Role and engine

`implementer` on Opus 5, native Claude Code subagent, standing in for the Sol implementer (Codex
bench dark). Sole writer in `C:\Users\mikes\WebstormProjects\lloyds`. Perform the assignment
directly and spawn nothing.

## Objective

Run the fleet visit from step 2 (`wave.md` § Visit a repository) so that `npx scaffold audit`
exits 0, every `@orkestrel/*` range equals the catalog with a caret, and the gate chain is
green with the new lint rule repaired in lloyds' own code.

## Context

Read first: `C:\Users\mikes\WebstormProjects\scaffold\.agents\skills\orkestrel-publish\references\wave.md`
§ Visit a repository; `C:\Users\mikes\WebstormProjects\scaffold\guides\scaffold.md` § Ownership
(935–1052) and the scripts and projects rules (600–639, 1005–1009). Evidence:
`C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\scaffold\probe-drift-report.md` § Lloyds,
`absorb-consumers-report.md` § lloyds, and terrain's precedent `visit-terrain-report.md`.

Prepared and committed at `315ba62`: `@orkestrel/probe ^0.0.11`, `@orkestrel/scaffold ^0.0.60`,
`@orkestrel/test ^0.0.12` declared. No catalog agent file exists (the overwrite stages the floor
copy). No `.claude/settings.json` exists (the overwrite writes the floor's). The registry serves
scaffold 0.0.60 and test 0.0.12 when this unit launches.

Facts the probe read: no retained script names a vanishing project (`test:app:browser` is three
serial invocations the plan retains as an author string and the audit reports; the planned value
is one `--project app:browser` run, and you may take the planned value since the floor include
covers the split paths — record which); the unused `src:core` and `src:browser` factories leave
with the replaced `vite.config.ts`; SCSS options (`quietDeps`, `silenceDeprecations`) and the
root `fileParallelism: false` and timeouts leave too — where a suite reddens without them,
report it as the visit's finding and repair only in files the plan does not own.

Standing conditions: `git status --porcelain` shows `D  package-lock.json` and
`?? package-lock.json` by the user's hand; never stage, restore, or rewrite that pair. Commit
nothing. Host: Windows 11, Git Bash; Playwright Chromium installed.

## The visit, in order

1. `npm install`. Read-only `npx scaffold audit`; record every line and the foreign set (the
   seven old agent files).
2. `npx scaffold overwrite` (no `--dirty` unless it refuses on the user's lockfile pair alone,
   after confirming no deletion candidate is uncommitted; record it). Record its summary and
   every file written or deleted; prove the deletion set equals the foreign set with `comm`.
3. `npx scaffold audit`; record its exit and every remaining line with its owner.
4. Re-pin every remaining `@orkestrel/*` range to the catalog with a caret; `npm install`;
   `npm ls @orkestrel/test @orkestrel/contract` recorded.
5. `npm run format` once. Then, each read bare: `npm run format:check`, `npm run lint:check`,
   `npm run check`, `npm run build`, `npm test`. Repair a red the new
   `policy/no-nested-functions` rule raises in `app/**` with terrain's shapes, recording the
   count by rule before and after; stop on a red inside a vendored file or one that would change
   product behaviour.

## Scope

**Owned.** `package.json`, the untracked lockfile as `npm install` rewrites it, every file the
overwrite writes or deletes, `app/**` only where the new rule reddens it, new tests only for
leaves the repair exports, `tests/**` only where a replaced config option reddens a suite and
the repair lives in a file the plan does not own. **Off-limits.** Product chrome and behaviour;
version; publish; the vendored files after the overwrite writes them.

## Output

Write `tmp/units/visit-lloyds-report.md` and return it: the read-only audit; the overwrite
summary, file list, and deletion proof; the closing audit; the range table before and after; the
`npm ls` readings; each gate's exit and summary; each repair with its red-then-green counts;
`git diff --stat`; `git status --porcelain`; claims not closed.

## Deviation contract

Stop and report — expected, found, evidence, done or not done, one hypothesis — when the
overwrite refuses for a reason not named here, when a red sits inside a vendored file, when a
registry range is refused, or when a repair would change product behaviour.

## Acceptance criteria

1. `npx scaffold audit` exits 0 after the overwrite, or every remaining line is recorded with its
   owner.
2. Every `@orkestrel/*` range equals the catalog with a caret; `npm ls @orkestrel/test` reads
   0.0.12.
3. The gate chain is green, read bare, or every red is reported with its excerpt and owner.
