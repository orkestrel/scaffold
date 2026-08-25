# Unit VISIT-sea — report

Every acceptance criterion closed. The setup advisory is gone, the planned `test:guides` and `test`
values are adopted, `repair` runs clean, and each gate closed green.

## The advisory as taken

`npx --no-install scaffold audit`, run at `/home/user/orkestrel/sea` before any edit:

```text
integration: integration drives features across environments, and this workspace declares fewer than two, so its seed composes nothing.
scripts: The manifest at . declares a planned script with a differing value: test:guides. Keep the declared value unchanged or replace it with the planned value: "test:guides" declares "vitest run --config vite.config.ts --reporter=dot --project guides"; planned "vitest run --config vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries test setup modules that no proof covers: tests/setup.ts, tests/setupServer.ts. Add tests/setup.test.ts, tests/setupServer.test.ts, each covering the module of the same name. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
```

The drift table reported `48 of 128 planned paths drifted from the plan`, foreign paths under the
retired `orkestrel-human-journey` name plus `.claude/agents/codex.md` and
`.codex/agents/claude.toml` among them. The `dependencies` advisory is the fleet-wide one the brief
places out of scope.

## Touched files

| File                         | Change                                                                     |
| ---------------------------- | -------------------------------------------------------------------------- |
| `tests/setup.test.ts`        | New proof of the `encodeContent` contract the asset suites consume         |
| `tests/setupServer.test.ts`  | New proof of the scratch wrapper, option builders, and binary fixtures     |
| `package.json`               | `test:guides` and `test` adopted; `test:setup` written by `repair`         |
| `vite.config.ts`             | `setup` project written by `repair` and registered in the project list     |
| `package-lock.json`          | Arrived dirty from the scaffold ^0.0.52 re-pin; untouched by this unit     |

`repair` also rewrote the vendored orchestration, agent, and skill files it owns. Those are its
output, not this unit's edits.

```text
 package.json      |  9 +++++----
 vite.config.ts    | 13 ++++++++++++-
 tests/setup.test.ts       | 27 +++++++++++ (new)
 tests/setupServer.test.ts | 340 +++++++++++++++ (new)
```

## What each proof asserts

`tests/setup.ts` exports `encodeContent` alone, so the proof carries the contracts the asset suites
rely on and nothing else. Expected bytes are literals, and the round trip decodes with
`TextDecoder`, so no assertion travels the module's own `TextEncoder` route.

- `encodes text as its UTF-8 bytes` — the multi-byte input `'né€'` yields the literal byte sequence,
  and `TextDecoder` returns the input.
- `returns an owned ArrayBuffer sized exactly to the encoded bytes` — the result is a real
  `ArrayBuffer` whose `byteLength` matches the encoded byte count, with the empty string as the
  boundary. This is the contract the doc comment names: `TextEncoder` hands back a view over an
  `ArrayBufferLike`, and `Asset` and `AssetManager` need an owned buffer sized to its content.

`tests/setupServer.ts` is large, so the proof takes one case per behavioral contract the consuming
suites depend on — `tests/src/server/injectors/Injector.test.ts`,
`tests/src/server/helpers.test.ts`, `tests/src/server/seals/SEA.test.ts`,
`tests/src/server/factories.test.ts`, and `tests/integration.test.ts` — never one case per export.
Expectations are derived by routes the module cannot share: real `node:fs` reads instead of
`ScratchInterface`, and raw header offsets with literal format magics instead of the `@src/server`
constants the builders write from.

- `WORKSPACE_ROOT` — `anchors an absolute path at the directory holding this package manifest`,
  checked by reading `package.json` at that path and comparing its `name`.
- `withTestDir` — `seeds the allocation, hands it to the callback, and removes it afterwards`, with
  a nested seed key read back through `node:fs`, the callback's own return value carried out, and
  the directory gone at exit.
- `withTestDir` — `removes the allocation and rethrows when the callback throws`, which is what the
  `finally` teardown through `destroyScratch` exists for.
- `createSEAOptions` — `builds a complete option set an override replaces one field of`.
- `createInjectorOptions` — `defaults the resource name and omits every option left unset`. An unset
  option is absent rather than a key holding `undefined`, which is the state
  `exactOptionalPropertyTypes` reads apart.
- `createInjectorOptions` — `carries every supplied option through`.
- `buildPeFixture` — `builds a PE32 image whose headers agree with each other`: the DOS pointer at
  `0x3c` lands on the PE signature, the section count matches the written table, and the section's
  raw range closes the file with header slack left for the entry the injector appends.
- `buildPeFixture` — `widens the optional header for the PE32+ variant`, so the section table sits
  past the wider header.
- `buildPeFixture` and `parsePeResourceLeaves` — `carries a pre-existing resource leaf that reads
  back through parsePeResourceLeaves`: the resource data directory points at the `.rsrc` virtual
  address, the leaf reads back with its name, type, language, and data, and an absent section name
  returns nothing.
- `buildPeFixture` — `appends a certificate overlay the security data directory points at`, the
  fixture `tests/src/server/helpers.test.ts` drives `stripPESignature` with.
- `buildElfFixture` and `parseElfProgramHeaders` — `builds an ELF64 image whose program header table
  matches its ELF header`: the parsed entries match `e_phnum`, the `PT_PHDR` entry describes the
  table the header points at, and each `PT_LOAD` lies inside the file.
- `findElfNotes` — `reports only the notes whose name carries the lookup prefix`. The fixture writes
  no note, so the case writes one by hand over a program header entry and asserts the name, the
  4-byte-aligned descriptor, and that a different prefix matches nothing.
- `buildMachoFixture`, `parseMachoLoadCommands`, and `parseMachoSegments` — `builds a thin Mach-O 64
  whose load commands fill the declared table`: the parsed commands total `sizeofcmds` and end at the
  table's end, and `__TEXT`, `__DATA`, `__LINKEDIT` sit in order with `__LINKEDIT` closing the file.
- `buildMachoFixture` — `leaves the tight variant no header room for another segment command`,
  measured as the gap between the end of the load commands and the first section's data against the
  segment command and section entry the injector appends.
- `findMachoSection` — `finds a section within its segment and refuses a name no segment carries`.
- `buildFatMachoFixture` — `builds a fat header that carries neither thin magic`, the input the
  injector's `FORMAT` rejection needs.

## Mutation controls

One control per proof file. Each broke a copy of the assertion's input or expectation inside the
test file, never the setup module, and each was restored and re-verified byte-identical against a
pre-mutation copy (`diff` reported no difference).

- `tests/setup.test.ts` — expectation mutated (`0xc3` to `0xc4`). Failing line:
  `FAIL |setup| tests/setup.test.ts > setup > encodeContent > encodes text as its UTF-8 bytes`
  (`AssertionError: expected [ 110, 195, 169, 226, 130, 172 ] to deeply equal [ 110, 196, 169, 226, 130, 172 ]`),
  with `Tests 1 failed | 17 passed (18)`.
- `tests/setupServer.test.ts` — input mutated (the hand-written note name `NODE_SEA` to `NODE_SEB`).
  Failing line:
  `FAIL |setup| tests/setupServer.test.ts > setupServer > findElfNotes > reports only the notes whose name carries the lookup prefix`
  (`AssertionError: expected [] to deeply equal [ 'NODE_SEA' ]`), with
  `Tests 1 failed | 17 passed (18)`.

After restoring: `npm run test:setup` reported `Test Files 2 passed (2)`, `Tests 18 passed (18)`.

## The visit

Order run: proofs written → `test:guides` adopted through `npm pkg set` → `scaffold repair --groups
manifest` → `test` chain adopted through `npm pkg set` → full `scaffold repair` → `npm run format` →
gates.

The first full `repair` would have blocked its `configs` group while the declared `test` chain did
not invoke the `setup` project, so `repair --groups manifest` wrote `test:setup` first:
`vitest run --config vite.config.ts --no-cache --reporter=dot --project setup`. The `test` chain was
then set to the planned order, `test:setup` between `test:config` and `test:guides`, read from the
installed scaffold compiler at
`node_modules/@orkestrel/scaffold/dist/src/core/index.js:4290`. The full `repair` then ran and wrote
`vite.config.ts`, which gained the `setup` project (`include: ['tests/setup*.test.ts']`,
`setupFiles: ['./tests/setup.ts']`) and registered it between `config` and `guides`.

`repair` named no retained differing script value. Its closing line was
`49 written, 80 unchanged, 0 removed in ..`, and a second run closed
`0 written, 129 unchanged, 0 removed in ..` with only the foreign paths the brief leaves to the
Orchestrator listed.

## Gates

Each run bare at `/home/user/orkestrel/sea`, in order, and read.

| Gate                   | Closing line                                                          |
| ---------------------- | --------------------------------------------------------------------- |
| `npm run format:check` | `All matched files use the correct format.` (148 files, 2716ms)       |
| `npm run lint:check`   | no diagnostics, exit code 0                                           |
| `npm run check`        | `tsc --noEmit -p configs/src/tsconfig.server.json`, exit code 0       |
| `npm run build`        | `Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts`   |
| `npm test`             | every project passed, exit code 0                                     |

`npm test` per project: `test:src` `Tests 153 passed (153)`; `test:policy` `Tests 93 passed (93)`;
`test:config` `Tests 46 passed (46)`; `test:setup` `Tests 18 passed (18)`; `test:guides`
`Tests 28 passed (28)`; `test:integration` `Tests 4 passed (4)`.

## Audit at exit

`npx --no-install scaffold audit` reports no `setup:` advisory and no `scripts:` advisory. What
remains:

```text
integration: integration drives features across environments, and this workspace declares fewer than two, so its seed composes nothing.
dependencies: typescript declares major 6, while the registry serves major 7.
0 of 128 planned paths drifted from the plan. Audit compared bytes at 115, existence at 5, and nothing at 8. The plan does not own 7 further paths beneath its groups.
```

The remaining drift rows are the foreign paths the brief leaves to the Orchestrator: the retired
`orkestrel-human-journey` skill files, `.claude/agents/codex.md`, and `.codex/agents/claude.toml`.

## Deviation state

No deviation. Nothing committed. No off-limits file edited: `src/**`, `guides/**`, the
`tests/setup*.ts` modules, and every other test file are untouched.
