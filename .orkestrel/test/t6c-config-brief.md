# Unit T6c — vendored config.test.ts: temp dirs through createScratch

Role: `builder`. Engine: native cheap tier. Sole writer in `/home/user/scaffold` from the
committed baseline. Perform the assignment directly and spawn nothing. Commit nothing.

## Context

`tests/config.test.ts` is a vendored host artifact (`HOST_PATHS`,
`src/core/constants.ts:144`): this repository's copy is the source every target receives
through `repair`, so this one edit propagates fleet-wide on the next scaffold release.
`@orkestrel/test` is a base devDependency of every target
(`src/core/constants.ts:361-371`), so the import below resolves everywhere.

## The edit

In `/home/user/scaffold/tests/config.test.ts`, convert the three tmpdir allocations to
`createScratch` from `@orkestrel/test/server`:

- `:493` `mkdtempSync(join(tmpdir(), 'orkestrel-config-outside-'))`
- `:515` `mkdtempSync(join(tmpdir(), 'orkestrel-config-package-'))`
- `:552` `mkdtempSync(join(tmpdir(), 'orkestrel-config-assets-'))`

For each: allocate with `createScratch({ prefix: '<same prefix>' })`, use
`scratch.path` where the string path was used, and replace that site's manual removal
(`rmSync`/equivalent in its finally/cleanup) with `await scratch.destroy()`. Preserve
each test's assertions and structure exactly.

Leave `:606` untouched: it deliberately allocates inside the workspace tree
(`mkdtempSync(join(resolve(root, owner), 'config-build-'))`), which is not a tmpdir
scratch. Record it in your report as retained.

Adjust imports: add the `createScratch` import in the file's existing import style;
remove `mkdtempSync`/`tmpdir` imports only if no remaining site uses them.

## Scope

Owned: `tests/config.test.ts` only. Off-limits: everything else. No installs, no commits.

## Deviation contract

A site whose cleanup shape does not match the description (no removal call, shared
cleanup across sites) stops the unit with expected/found. Import placement is yours.

## Validation

`npx vitest run tests/config.test.ts --project config` if such a scoped invocation
exists per `vite.config.ts` projects — otherwise `npm run check` only, and say which you
ran. Report the actual output.

## Output

The exact diff, the validation output, the retained-site note, deviations or "none".
