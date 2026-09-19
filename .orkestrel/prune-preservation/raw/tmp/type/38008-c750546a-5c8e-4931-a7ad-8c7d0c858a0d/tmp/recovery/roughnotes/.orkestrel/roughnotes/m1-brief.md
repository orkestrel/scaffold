# Unit M1 — migrate this workspace onto the scaffold 0.0.72 configs group

## Role and engine

`opus` — Opus 5, native Claude subagent, the **roughnotes** checkout at
`C:\Users\mikes\WebstormProjects\roughnotes`, sole serial writer.

## The state you inherit

The tree carries an uncommitted target visit, and it is **red**. Do not revert any of it.

The visit re-pinned every `@orkestrel` range to the registry, repaired the `tests` and
`orchestration` groups from scaffold 0.0.72, and restored two vendored `configs` files. Four cases
in the restored vendored `tests/config.test.ts` now fail.

## The cause, already diagnosed

`scaffold overwrite` refused the whole `configs` group with this message:

```text
TARGET: The configs group is blocked because the manifest at . names a Vitest project the planned
vite.config.ts does not register: journey:*. Remove the script that names it before selecting
configs, or exclude configs from --groups.
```

That guard is correct. Regenerating `vite.config.ts` from the plan would delete this workspace's
four-variant journey fan-out, and the gates would stay green while the variant matrix silently
stopped existing.

But the `tests` group and the `configs` group are coupled. The vendored `tests/config.test.ts` at
0.0.72 asserts against the `.oxlintrc.json` that 0.0.72 **generates**, and this workspace still
carries the 0.0.63-era one, because that file sits in the blocked group. The four failures name
`src/` paths and policy rules a stale lint configuration never enables:

- `root configuration > keeps policy rules active across every linted workspace path`
- `policy plugin > enables every plugin rule over the population its law names`
- `policy plugin > loads every configured policy rule through the real binary`
- `configuration helpers > reads the compiler scope and fixed extractor override a declaration
  roll-up requires`

## Objective

Take the configs group, and keep the journey fan-out. The guard's own message names the route:
remove the script that blocks it, run the group, then restore what the regeneration drops.

## The journey surface that must survive

Capture it from the current `vite.config.ts` **before** you regenerate anything, because the
regeneration overwrites that file. It is:

- the `JourneyVariant` interface;
- `VARIANTS`, the frozen four-variant declaration, and `JOURNEY_INCLUDE`;
- the `journey(variant)` factory and its doc block — including the paragraph explaining that a
  journey **replaces** the browser test block rather than passing it as an override, because
  `mergeOverride` would concatenate the suites rather than swap them;
- the `exclude: [JOURNEY_INCLUDE]` line on the shared browser project, so that project does not run
  the journey suite a fifth time;
- the `...VARIANTS.map((variant) => () => journey(variant))` spread in the `projects` array;
- the `conformance` and `setup` factories and their registrations, which are this workspace's own
  and are not in the plan either.

`package.json` carries `test:journey` with `--project 'journey:*'` and names it in the `test` chain.

## The work

1. **Capture** every span named above, verbatim, into a scratch file under `tmp/units/`.
2. **Remove** the `test:journey` script from `package.json` — and only that script — so the guard
   releases. Leave the `test` chain's reference for now if removing it separately is cleaner; rule
   on that and say which you did.
3. **Run `scaffold overwrite --groups configs`.** Report what it wrote and what it removed.
4. **Restore** every captured span into the regenerated `vite.config.ts`, and restore the script.
   The regenerated file's factories now take overrides and its wrappers pass configuration through
   the parameter; the journey factory must compose on whatever the regenerated `appBrowser` is
   rather than on the shape it composed on before. Read the regenerated file before restoring
   rather than pasting the old spans blind.
5. **Prove the fan-out survives**: `npm run test:journey` collects four projects and runs the suite
   once per variant, and the shared browser project still excludes the journey suite.
6. **Prove the coupling closed**: the four named cases pass, and `scaffold audit` reports less drift
   than the 3 paths it reports now. Say which paths remain and why.

## Unknowns

- Whether `overwrite --groups configs` deletes anything this workspace owns. It deletes what the
  plan does not own within the selected group. Check before running, and if it would delete a file
  this workspace owns beyond `vite.config.ts`, stop and report rather than losing it.
- Whether the regenerated `vite.config.ts` still needs the `conformance` and `setup` factories added
  back, or whether 0.0.72 plans them. Establish it from the regenerated file.

## Host facts

- Windows. POSIX syntax in the Bash tool; `npm` resolves as `npm.cmd`.
- The gate chain is `npm run format:check`, `lint:check`, `check`, `build`, `test`.
- The built CSS asset is 323.24 kB and must stay there.
- A `deprecat` line in a build or test run is a regression.
- After any command that changes `package-lock.json`, write its SHA-256 digest to
  `node_modules/.orkestrel-lock.sha256` in the same step.

## Scope

**Owned files:** `vite.config.ts`, `package.json`, `.oxlintrc.json`, `.prettierignore`, anything
else `overwrite --groups configs` writes, and scratch files under `tmp/units/`.

**Off-limits:** `app/`, `tests/app/`, `tests/conformance.test.ts`, `tests/setup.ts`,
`tests/setup.test.ts`, `guides/`, `.orkestrel/`; the vendored `tests/config.test.ts`,
`tests/policy.test.ts`, `tests/setupPolicy.ts`, `configs/helpers.ts`, and `configs/policy.ts` — the
visit just restored those from the published package and they are correct.

Do not commit, push, install a new dependency, or bump a version. Run no `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean` — the tree carries uncommitted work you must
not discard.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

1. `npm run test:journey` collects four journey projects and passes.
2. The four named `tests/config.test.ts` cases pass.
3. `npm test` exits 0. Report every project's counts.
4. `npm run build` succeeds, no `deprecat` line appears, and the CSS asset is 323.24 kB.
5. `npx scaffold audit` reports its drift, and you name each remaining path with the reason.
6. `npm run format:check` and `npm run lint:check` are clean.
7. Nothing off-limits is modified. Report `git status --short`.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol. Stop rather than losing the journey fan-out:
if the regenerated file cannot carry it, report with the exact text that conflicts.

## Output

Write your report to `tmp/units/m1-report.md`, and make your final message the same content: done or
not done per criterion; what the overwrite wrote and removed; every span you restored; the journey
proof; the audit's remaining drift with reasons; and what you did not close.

No process diary.
