# Visit corrections — scaffold 0.0.49 wave

Two defects in the release-wave visit, both found on live targets on 2026-08-22, both repaired in
the visit procedure. Each carries a rule for `.agents/orchestration.md` § The release wave, to land
after the wave's last target is pushed.

## The declare step leaves the browser development group below plan

`scaffold overwrite` raises the `@orkestrel` ranges and the toolchain floors the audit advises on,
and leaves `@vitest/browser-playwright` where it found it. On `msg` the step raised `vitest` to
`^4.1.11` and left `@vitest/browser-playwright` at `^4.1.10`, whose peer range demands the `vitest`
the step had just moved past. The install then failed `ERESOLVE`, naming
`peer vitest@"^4.1.11" from @orkestrel/test@0.0.10` as the conflict.

The audit does not report it. The questions on `msg` name `@microsoft/api-extractor`, `@types/node`,
`oxfmt`, `oxlint`, `typescript`, `vite`, and `vitest`, and name no browser package at all.

**Rule.** Raise every planned development dependency the target already declares to its planned
range before running `overwrite`. Read the planned range from the installed scaffold's own manifest,
which is where `BASE_DEV_DEPENDENCIES` and its sibling groups read it. Raise only what the target
already declares: the browser and declaration groups belong to the environments that have them, so
adding one to a core-only workspace declares a dependency it must not carry. A missing planned
dependency comes from the audit, which reports it per target.

Targets this reaches, measured across the fleet before the wave: `abort`, `budget`, `csv`, `guide`,
`markdown`, `msg`, `ndjson`, `sqlite`, `sse`, `template`, `timeout`, `tool`, and `websocket`.

## A stale lockfile refuses the raised toolchain

npm will not move a lockfile whose pinned peer contradicts a raised range, and it reports the
refusal against the tree rather than against the lockfile: `Found: @orkestrel/test@0.0.6` while the
root declares `^0.0.10`. Removing `node_modules` alone does not clear it. Removing the lockfile with
it resolves the same declared ranges cleanly — on `msg`, `added 161 packages` in 20s.

**Rule.** On an `ERESOLVE` failure during a toolchain step, discard `node_modules` and
`package-lock.json` and install again. Regenerating the lockfile moves nothing a consumer installs:
a packed tarball carries `LICENSE`, `README.md`, `dist`, and `package.json`, and no lockfile.
