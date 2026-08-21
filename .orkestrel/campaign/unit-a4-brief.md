# Unit A4: dissolve scaffold's local junction workaround

## Role and engine

Role `implementer`, engine **Opus 5**, native subagent, sole writer in
`C:/Users/mikes/WebstormProjects/scaffold`. You perform the assignment directly and spawn
nothing.

## Objective

Route `createWorkspace().link` in scaffold's test setup through the scratch's own `link`, now
that the tarball-installed `@orkestrel/test` carries the junction fallback, and delete the local
mechanism.

## Context

Authority: `AGENTS.md`; `.claude/rules/tests.md`, `.claude/rules/typescript.md`,
`.claude/rules/writing.md`. Skill: none.

`tests/setupServer.ts:332-362` wraps `createScratch`; its `link` member (`:347-354`) bypasses
`scratch.link` with `mkdirSync` + `symlinkSync(target, destination, 'junction')` and a comment
saying the scratch API lacks the junction option. The installed `@orkestrel/test` (a `file:`
tarball of the fixed 0.0.7 work-tree — leave the manifest and lockfile as they are) now
resolves a relative source against the link's own directory and falls back to a junction on
`EPERM`, so the workaround's reason is gone.

The design, fixed by the reconciled round: `link(relative, target)` becomes
`scratch.link(relative, target)` followed by `return join(path, relative)` — the same
return-the-destination shape `write` and `ensure` already take, so the member survives the
wrapper test. Remove imports the change orphans (`symlinkSync`, and `mkdirSync`/`dirname` only
if nothing else in the file uses them). The TSDoc `@remarks` (`:316-321`) stops restating the
junction mechanism and instead states that the scratch's own `link` carries the host mechanism.

Known watch-point: `tests/src/server/helpers.test.ts:499` calls
`workspace.link('gate', 'hop/../secret')` (a RELATIVE source). Under the old local mechanism a
relative source was junction-resolved by the host; under `scratch.link` it resolves against the
link's own directory. Verify that proof still passes and report its result INDIVIDUALLY.

## Scope

- Owned: `tests/setupServer.ts` only.
- Off-limits: everything else. `package.json`/`package-lock.json` carry the tarball reference —
  leave them. `ROADMAP.md`, `tests/src/server/WriteTransaction.test.ts`, and `.orkestrel/**`
  are modified campaign state — leave them.
- No commits, installs, or git checkout/restore/stash/reset/clean.

## Execution

You perform the assignment directly and spawn nothing.

## Acceptance criteria, in this order

1. `git diff --stat` shows only `tests/setupServer.ts` changed beyond the standing entries.
2. `npx oxfmt --config .oxfmtrc.json --check tests/setupServer.ts` exits 0.
3. `npx oxlint --config .oxlintrc.json --deny-warnings tests/setupServer.ts` exits 0.
4. `npx tsc --noEmit --project tsconfig.json` exits 0.
5. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server`
   passes with no new failure against the standing baseline (`350 passed | 4 skipped` measured
   2026-08-21 before the tarball swap); report totals, and report the
   `helpers.test.ts:499` proof's individual result by running it with `--reporter=verbose -t`
   on its name.
6. Report as an observation: every remaining raw `symlinkSync` use in `tests/**`, if any.

## Output

Return: the diff; raw output and exit code per criterion; the watch-point's individual result;
any deviation decisions. No process diary.

## Deviation contract

Stop if any proof fails in a way the watch-point does not explain — particularly a containment
refusal (`Path outside scratch directory`) from a call site whose target the local mechanism
accepted. Report it with the site; do not widen scope to fix it. Ancillary wording choices are
yours.
