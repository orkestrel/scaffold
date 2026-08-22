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

## The raised oxlint rejects a byte the previous one accepted

Moving `oxlint` from `^1.76.0` to `^1.79.0` turned `sse` red on `no-irregular-whitespace`, at
`tests/src/core/SSEParser.test.ts:302:45` and `:312:7`. The flagged bytes are `ef bb bf` — a literal
`U+FEFF` sitting inside comment prose that describes BOM stripping.

The repair rewrote the comment prose to name the BOM instead of embedding one, and touched no
assertion. The code point under test comes from `BOM`, which `src/core/constants.ts:13` declares as
`String.fromCharCode(0xfeff)` and the barrel exports, so the cases still drive a real BOM. Deleting
the literal from an assertion would have deleted the case the test exists for, which is what
`.claude/rules/workspace.md` § Text integrity refuses.

A sweep for `U+FEFF`, `U+00A0`, `U+2000` through `U+200B`, `U+2028`, `U+2029`, and `U+3000` across
`src/`, `tests/`, and `app/` of every `@orkestrel` repository under `/home/user` reports `sse` as
the only target that carried one, and reports clean after the repair.

**Rule.** Before a wave raises the linter, sweep the fleet for the bytes the raised version rejects.
Repair prose that merely illustrates a code point; never delete a code point an assertion drives.

## A shared fixture that grows breaks a proof that tabulates it by position

Raising `@orkestrel/test` from `^0.0.6` to `^0.0.10` grew `createHostileValues`, and `table` failed
at `tests/src/core/validators.test.ts` on `expected 6 to be 11` — an assertion comparing a local
answer list against the corpus length, before any guard ran. The neighbouring proof in the same file
survived, because it asserts one property across every member and tabulates nothing.

A probe against `table/dist/src/core/index.js` and the installed corpus records what `isTableRow`
answers for each member: it throws on none, and accepts only the get-throwing proxy over an empty
target and the null-prototype record, which expose no own key. Controls in the same run: a record of
string cells is accepted, and a record holding a non-cell is refused.

The repair names the accepted positions and drops the tabulation, so a corpus that grows by a
refused member leaves the proof intact and one that grows by an accepted member still breaks it. A
mutation probe narrowing that set reddened exactly the null-prototype record before the set was
restored.

**Rule.** Assert a property across a shared fixture's members. Never assert a total over it, and
never tabulate one answer per position: the fixture's owner grows it, and every consumer that
tabulated it goes red on an edit that changed no behaviour.

## A host-shaped proof reads one host's spelling of the property

Two targets went red on host facts rather than on anything the wave changed. In each, the visit
touched only vendored files and the lockfile: neither `src/` nor the failing test moved.

`mcp` asserted that a spawned child's stderr is a FIFO, at
`tests/guides.test.ts § stdio transport`. A measurement of the real spawn on this host reports
`{fifo: false, sock: true, file: false}` — Node hands the child a socketpair, which the
`S_IFIFO` comparison rejects. The reading now accepts `S_IFIFO` or `S_IFSOCK`, which is the property
the assertion needs: a channel the supervisor made rather than a descriptor handed down. A mutation
forcing the field true reddened exactly the inherit control, whose scratch-file descriptor is
neither.

`server` binds `::1` in a proof whose subject is IPv6 host exposure, and this host rejects that
family with `EAFNOSUPPORT` at `listen`. `probeLoopback` in `tests/setupServer.ts` now asks the host,
and the proof skips on the answer. The probe discriminates in both directions here: `127.0.0.1`
binds true, `::1` binds false.

**Rule.** Probe a host-varying property on the host the suite is running on, and assert against what
the probe returned. Where the property is the subject rather than the setup, gate the proof on the
probe and cite the mechanism — the API and the error it returns — never the platform name.
