# Unit sea-visit: the release-wave visit plus the process surface migration

## Role and engine

Role `implementer` route `sol`, engine **GPT-5.6 Sol**, sandbox `workspace-write`, rooted at
`C:/Users/mikes/WebstormProjects/sea`. You perform the assignment directly and spawn nothing
beyond probes under `tmp/` that you delete after reading.

## Why this target is not a mechanical visit

`sea` pins `@orkestrel/process` at `^0.0.3` and imports `runSync` from
`@orkestrel/process/server` (`src/server/helpers.ts:33`, called at `:175`). The published
`@orkestrel/process` 0.0.5 exports no `runSync`; the synchronous runner is now
`executeSync`, exported from `src/server/execution/executeSync.ts` through the server
barrel. Raising the pin without migrating the import fails the typecheck.

The shapes appear to line up — `executeSync(command: ProcessCommand, options?:
ExecuteSyncOptions): ExecuteResult`, with the call passing `{ file, arguments, environment }`
and `{ workspace, timeout, strict }` and reading `.expired`, `.failed`, `.stdout`,
`.stderr`. **Verify that rather than assuming it.** Read the installed declarations after
the install and confirm every member the call site passes and reads. Report any mismatch as
a finding before changing behaviour.

## The work

1. **The visit**, exactly as the other targets took it:
   - Confirm `git status --porcelain` is empty; record the version.
   - Set `devDependencies["@orkestrel/scaffold"]` to `^0.0.47`; if neither section declares
     `@orkestrel/probe`, add `devDependencies["@orkestrel/probe"] = "^0.0.2"` (scaffold
     plans it for every workspace). Install.
   - Commit the checkpoint `Declare the planned probe dependency and take scaffold 0.0.47`
     — `overwrite` refuses a dirty tree by design.
   - Run `node node_modules/@orkestrel/scaffold/dist/bin/main.js overwrite`.
   - Lockstep check: if the manifest declares `@vitest/browser-playwright` or another
     `@vitest/browser-*` provider, set its range equal to the declared `vitest` range. They
     ship as one release train with a strict peer on the exact version.
   - Install. On `ERESOLVE`, delete `package-lock.json` and `node_modules` and install
     again — never `--force`, never `--legacy-peer-deps`.
   - Run the mutating `npm.cmd run format`.
2. **The migration.** Replace the `runSync` import and call with `executeSync`. Keep the
   call's arguments and the result reads identical unless your declaration check proves a
   member moved; if one did, stop and report before adapting it. Update the comment above
   the call so it names `executeSync` and states only what that function's own contract
   states about Windows `.cmd` resolution — read `executeSync`'s TSDoc and do not carry
   forward a claim it no longer makes.
3. **The bump.** The runtime dependency set moves (`@orkestrel/contract` to `^0.0.13`,
   `@orkestrel/process` to `^0.0.5`), so bump the PATCH version and install so the lockfile
   carries it.

## Scope

- Owned: `package.json`, `package-lock.json`, `src/server/helpers.ts` (the import, the call,
  and its comment), plus whatever `overwrite` writes, plus any test that names `runSync`.
- Off-limits: behaviour changes beyond the rename. A different timeout, retry, or error
  mapping is not this unit's work.
- The `npm` PowerShell shim is BLOCKED — use `npm.cmd` and `npx.cmd`. No commits beyond the
  step-1 checkpoint; leave the final tree dirty for the verifier. No
  `git checkout`/`restore`/`stash`/`reset`/`clean`.

## Acceptance criteria, in this order

1. `git status --porcelain` before and after; nothing beyond the visit's own files.
2. The declaration check: quote the installed `executeSync` signature and the members the
   call site passes and reads, naming any that differ from `runSync`'s.
3. Scoped format and lint on the owned files exit 0.
4. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0 — this is the gate the migration
   exists to pass.
5. Each project green under `npx.cmd vitest run --config vite.config.ts --no-cache
   --reporter=dot --project <name>`; totals reported.

## Output

The complete unelided diff; raw output and exit code per criterion; the declaration check in
full; any deviation. No process diary.

## Deviation contract

Stop on: a member of the call site's command, options, or result that `executeSync` does not
carry; the vendored lint plugin reding real source; an install that fails after the lockfile
regeneration; a criterion unreachable. Comment wording is yours: decide, record, carry on.
