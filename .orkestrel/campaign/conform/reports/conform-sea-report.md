# Unit conform-sea — report

Every row landed. The gate chain is green on the final tree, and `git status --short` lists only
files under Owned.

## Rows

| Row          | Disposition | Evidence                                                                                                                                                                            |
| ------------ | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sea-obj-1    | applied     | `#fixupDirectoryRVAs` and its discarded-approach comment block deleted; the call at the `#injectPE` fixup site now reaches `#fixupDataEntries(directoryBuffer, 0, newVa)`; `depth` dropped from the parameter list and the recursion. One comment above `#fixupDataEntries` keeps the `[directories] [strings] [data entries]` layout and the DataRVA fact. Closes sea-subj-13; no second edit. |
| sea-obj-2    | applied     | `readPeResourceString` and `walkPeResourceDirectory` extracted to exported module scope with TSDoc; `parsePeResourceLeaves` calls them; `alignTo4` replaced by the imported `alignELFNoteSize`; `SEA.test.ts` uses `createRecorder<[unknown]>()` with `recorder.handler` and `recorder.count`. |
| sea-obj-3    | applied     | `AssetManager.ts` leads with its two `import type` declarations, then the value imports, no blank line inside either group. The `../constants.js` row went with sea-subj-9.        |
| sea-obj-4    | applied     | `ELFProgramHeader`, `PEResourceLeaf`, `PEResourceEntry`, `PESection` declared in `src/server/types.ts` with readonly members and third-person TSDoc; every inline copy replaced; the stale-note neutralisation became a `headers.map` with the `!overwrite` refusal ahead of it; `#rvaToFileOffset` takes `readonly PESection[]`. `ELFProgramHeader`'s TSDoc names `Elf64_Phdr`, closing sea-subj-6. Surface rows added. |
| sea-obj-5    | applied     | `describe('sea.md fences')` appended to `tests/guides.test.ts`, executing every value the guide prints. No existing assertion changed. The header comment now says the shared drop-in runs first and this package's transcriptions close the file. |
| sea-obj-7    | applied     | The unreachable `free program header entry` skip and its `context` parameter deleted; the stale applicability comment deleted; the header comment states the suite's real placement; the surviving skip's comment names the PE header-slack and Mach-O headroom conditions the injector reports as `INJECT`. |
| sea-obj-8    | applied     | `ensureSafeKey(path)` deleted from both the asset-path loop and the compression-path loop in `SEA.#validate`; `ensureSafeKey(key)` kept.                                            |
| sea-obj-9    | applied     | `readU16`, `readU32`, `readU64`, and `readPEOffset` capture `readSync`'s return and throw `SEAError('FORMAT', 'Short read', { offset, expected, read })`; each carries a `@throws` line. `helpers.test.ts` asserts the throw per reader, and the sentinel test was renamed for what it proves. |
| sea-subj-1   | applied     | `register(input: AssetInput \| readonly AssetInput[]): void` in `types.ts` and `AssetManager.ts`.                                                                                   |
| sea-subj-2   | applied     | `src/server/seals/` → `src/server/seas/` and `tests/src/server/seals/` → `tests/src/server/seas/` by `git mv`; barrel and factory imports updated; "seal build" struck from `types.ts` and `errors.ts`; example and test locals renamed to `sea`; the fixture name is `'sea-test'`. The `package.json` keyword sits under § Shared-file patches. |
| sea-subj-3   | applied     | `createSignCommand` → `buildSignCommand`, `createBlobConfig` → `buildBlobConfig`, with their `@example` lines, `SEA.ts` imports and call sites, guide rows, guide fences, and test call sites. `factories.ts` untouched. |
| sea-subj-4   | applied     | `platformConfig` → `resolvePlatform`, return type `SEAPlatform \| undefined` kept; `SEA.ts` call sites, guide row, guide fence, and tests updated.                                  |
| sea-subj-5   | applied     | `Loff`/`Lsize`/`Lvm` → `linkeditOffset`/`linkeditSize`/`linkeditAddress` through `#injectMachO`, including the comments naming them.                                                |
| sea-subj-7   | applied     | `#destroyed` deleted; `execute()` reads `this.#emitter.destroyed`; `destroy()` calls `this.#emitter.destroy()` unconditionally. The destroyed-state test now pins idempotence and `sea.emitter.destroyed`. |
| sea-subj-8   | applied     | `SEABrotliOptions` declared; `SEACompressionOptions extends SEABrotliOptions` adding `paths`; `compressFile` and `compressDirectory` take `SEABrotliOptions`; Types row added; the guide fence reads `compressDirectory('dist/app/browser', { mode: 'text' })`. |
| sea-subj-9   | applied     | `AssetManagerOptions.assets` added; `load()` iterates it, registers each existing path under its key, emits one `load` with the registered keys, and emits `error` per configured missing path. `CLIENT_ASSET_KEY_RAW`/`CLIENT_ASSET_KEY_BR` and their guide rows deleted; the `root` TSDoc, the `load` row, the assets fence, and the README bullet updated. |
| sea-subj-10  | applied     | `ELF_PT_LOAD`, `ELF_PT_PHDR`, `ELF_PF_R`, `ELF_PAGE_SIZE` added to `constants.ts` with TSDoc; the local declarations deleted; every use and the bare `1` in `#verifyELFNoteMapping` replaced; Constants rows added. |
| sea-subj-12  | applied     | TSDoc blocks on `SEA`, `Injector`, `AssetManager`, and `Asset`, each replacing its `// === Name` separator, with a third-person first sentence, a constructor `@param`, and a constructing `@example`. The floating block at the head of `Injector.ts` folded into the class block as `@remarks`. |
| sea-subj-14  | applied     | `@throws` added to `ensureExists`, `compressFile`, and `patchSentinelFuse` in the sibling format, plus one per short-read reader from sea-obj-9.                                    |
| sea-subj-15  | applied     | `should` struck from `constants.ts`, `helpers.ts`, `guides/sea.md`, and `helpers.test.ts`; `(unchanged default behavior)` and `, matching prior behavior exactly` deleted.          |
| sea-subj-16  | applied     | Every numbered `AGENTS` citation deleted from `guides/sea.md`, `guides/README.md`, `tests/integration.test.ts`, `tests/src/server/seas/SEA.test.ts`, and `tests/setupServer.ts`, keeping the reason each sentence states. |
| sea-subj-17  | applied     | `guides/README.md` names `SEA`, not `Seal`.                                                                                                                                        |
| sea-subj-18  | applied     | "this package's other runtime dependency" → "one of this package's runtime dependencies"; a `process.md` paragraph added in the existing form; `test.md`, `probe.md`, and `scaffold.md` named as the development dependencies' mirrors. |
| sea-subj-20  | applied     | `guides/sea.md` Overview reads "runs the pipeline — compress assets, generate the blob, assemble and sign the executable".                                                          |
| fleet-F1     | noop        | `tests/setup.ts` declares `encodeContent` and nothing else; `grep -rn -i "isBrowserVuePath" tests src` returns no line. The workspace has no browser environment, and the helper is absent, so the row's `noop` branch applies. `tests/setup.test.ts` keeps its `encodeContent` proof, the `setup` project, and the `test:setup` script. |
| fleet-F2     | noop        | `grep -rn "readonly id:" src` returns no line. The implementation classes read are `SEA`, `Injector`, `AssetManager`, and `Asset`; `Asset` declares `readonly key`, `readonly content`, and `readonly compressed`, and none of the four declares a public `readonly id: string`. |

## Files touched

- `/home/user/fleet/sea/src/server/types.ts` — four binary shapes and `SEABrotliOptions` declared; `register` widened; `AssetManagerOptions.assets` added; "seal build" and the prior-release comparison struck.
- `/home/user/fleet/sea/src/server/constants.ts` — four ELF constants added; the client-asset keys deleted; the `SKIP_EXTENSIONS` doc restated.
- `/home/user/fleet/sea/src/server/helpers.ts` — short-read throws; `resolvePlatform`, `buildSignCommand`, `buildBlobConfig`; `SEABrotliOptions` parameters; missing `@throws` lines.
- `/home/user/fleet/sea/src/server/errors.ts` — "seal" struck from the module comment, the class description, and the example.
- `/home/user/fleet/sea/src/server/factories.ts` — example local renamed to `sea`; the `SEA` import follows the folder rename.
- `/home/user/fleet/sea/src/server/index.ts` — barrel row points at `./seas/SEA.js`.
- `/home/user/fleet/sea/src/server/seas/SEA.ts` — moved from `seals/`; class TSDoc; `#destroyed` deleted; renamed helper imports; the asset-key guard removed from path operands.
- `/home/user/fleet/sea/src/server/injectors/Injector.ts` — class TSDoc absorbing the floating block; named types replacing every inline shape; the ELF constants; the delegate deleted; the `__LINKEDIT` locals renamed.
- `/home/user/fleet/sea/src/server/assets/AssetManager.ts` — import order; class TSDoc; readonly `register` parameter; configurable `load()`.
- `/home/user/fleet/sea/src/server/assets/Asset.ts` — class TSDoc replacing the separator.
- `/home/user/fleet/sea/tests/setupServer.ts` — two extracted exported helpers with TSDoc, `PeSectionInfo` exported to name the walk's parameter, `alignELFNoteSize` reused, "seal" and the numbered citations struck.
- `/home/user/fleet/sea/tests/setupServer.test.ts` — proofs for the extracted helpers; the renamed fixture name.
- `/home/user/fleet/sea/tests/guides.test.ts` — the fence transcription block and the amended header comment.
- `/home/user/fleet/sea/tests/integration.test.ts` — the unreachable skip and its stale reasons deleted; the header comment corrected; locals renamed.
- `/home/user/fleet/sea/tests/src/server/seas/SEA.test.ts` — moved from `seals/`; recorder; the absolute-asset-path proof; the derived-destroy assertions; locals renamed.
- `/home/user/fleet/sea/tests/src/server/assets/AssetManager.test.ts` — three `load()` proofs.
- `/home/user/fleet/sea/tests/src/server/helpers.test.ts` — short-read proofs; renamed call sites; the `should` comment.
- `/home/user/fleet/sea/tests/src/server/factories.test.ts` — local renamed to `sea`.
- `/home/user/fleet/sea/guides/sea.md` — every renamed row and fence, the new Constants and Types rows, the deleted client-asset rows, the struck citations, count, and prior-release comparison.
- `/home/user/fleet/sea/guides/README.md` — `SEA` for `Seal`, the runtime-dependency wording, the `process.md` paragraph, the development-dependency mirrors, the struck citations.
- `/home/user/fleet/sea/README.md` — the `AssetManager` bullet.

Diffstat: 21 files changed, 985 insertions(+), 572 deletions(-).

## Failing-first controls

Each command was run from `/home/user/fleet/sea`. Every capture is a file under
`/home/user/work/evidence/sea-proofs/`.

| Row        | Command                     | Red                                          | Green                        | Files                                             |
| ---------- | --------------------------- | -------------------------------------------- | ---------------------------- | ------------------------------------------------- |
| sea-obj-9  | `npm run test:src`          | 4 failed, 178 passed (182)                   | 182 passed (182)             | `sea-obj-9-red.txt`, `sea-obj-9-green.txt`        |
| sea-obj-8  | `npm run test:src`          | 1 failed, 182 passed (183)                   | 183 passed (183)             | `sea-obj-8-red.txt`, `sea-obj-8-green.txt`        |
| sea-subj-9 | `npm run test:src`          | 2 failed, 184 passed (186)                   | 186 passed (186)             | `sea-subj-9-red.txt`, `sea-subj-9-green.txt`      |
| sea-obj-2  | `npm run test:setup`        | 3 failed, 18 passed (21)                     | 21 passed (21)               | `sea-obj-2-red.txt`, `sea-obj-2-green.txt`        |
| sea-obj-1  | `npm run test:src`          | 2 failed, 184 passed (186) with `sectionVA` planted as `0` at the fixup call | 186 passed (186) restored | `sea-obj-1-control-red.txt`, `sea-obj-1-green.txt` |
| sea-obj-5  | `npm run test:guides`       | 1 failed, 33 passed (34) with `alignTo(4097, 4096)` transcribed as `8193` | 34 passed (34) with `8192` | `sea-obj-5-control-red.txt`, `sea-obj-5-green.txt` |
| sea-subj-7 | `npm run test:src`          | not run red: the row derives an existing fact rather than changing behaviour; the added assertions pin `sea.emitter.destroyed` and `destroy` idempotence | 186 passed (186) | `sea-subj-7-green.txt` |

Failing-first test names:

- `throws FORMAT for a file too short to contain the e_lfanew field`, `throws FORMAT when readU16 cannot fill its two bytes`, `throws FORMAT when readU32 cannot fill its four bytes`, `throws FORMAT when readU64 cannot fill its eight bytes` (sea-obj-9).
- `accepts an absolute asset path that resolves inside the build root` (sea-obj-8).
- `registers every configured asset the disk carries`, `emits nothing when no assets are configured` (sea-subj-9; `emits one error for a configured asset the disk does not carry` passed before the fix because the old hard-coded path emitted its own single error, and it binds the new behaviour after it).
- `reads the declared number of UTF-16LE characters and stops there`, `returns an empty string for a zero-length entry`, `collects each leaf of a directory tree with its type, name, and data` (sea-obj-2).

## Sweeps

Each pattern was run with `grep -rn` over `src`, `tests`, `guides/sea.md`, `guides/README.md`, and
`README.md` unless the row names a narrower population.

| Pattern                                                                | Result                                                                                                             |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `-i "seal"`                                                            | empty                                                                                                              |
| `-i "createsigncommand\|createblobconfig\|platformconfig"`             | empty                                                                                                              |
| `-i "CLIENT_ASSET_KEY\|fixupDirectoryRVAs\|alignTo4\|onError"`         | empty                                                                                                              |
| `"Loff\|Lsize\|Lvm"` over `Injector.ts`                                | empty                                                                                                              |
| `-i "\bshould\b"`                                                      | empty                                                                                                              |
| `-i "prior behavior\|unchanged default\|matching prior"`               | empty                                                                                                              |
| `"AGENTS §\|§9\|§10\|§16\|§22"`                                        | empty                                                                                                              |
| `"three-step\|five constants"`                                         | empty                                                                                                              |
| `-i "isBrowserVuePath"` over `src`, `tests`                            | empty (fleet-F1)                                                                                                   |
| `"readonly id:"` over `src`                                            | empty (fleet-F2)                                                                                                   |
| `-niE "\b(one\|two\|three\|four\|five\|six\|seven\|eight\|nine\|ten)\b"` over `guides/sea.md`, `guides/README.md`, `README.md`, `tests/guides.test.ts` | every hit ruled permitted: `four-byte`, `power of two`, `two file descriptors` are values; `one file`, `one or more directories`, `One ELF64 program header entry`, `one-shot`, `one registered asset`, `at least one`, `one-class-per-file` are singular quantities; `exactly one of the two` and `one of this package's runtime dependencies` name their members in the same sentence. `README.md` "one `.` entry" is outside this unit's rows and recorded under § Observations. |
| `-niE "\b[0-9]+ (elements\|members\|rules\|rows\|exports\|files\|options\|steps\|cases\|stages\|findings\|tests\|helpers\|methods\|entities\|tables\|sections\|constants\|passes\|categories)\b"` over the same population plus `src` | empty |
| `-niE "\b(via\|utilize\|leverage\|simply\|easy\|just\|performant\|robust\|allows you to\|and/or\|in order to\|e\.g\.\|i\.e\.\|etc\.\|dummy\|sanity check\|please)\b"` over the three prose files | three `via` hits in `README.md`, all outside this unit's rows; recorded under § Observations |

## Gates

Run from `/home/user/fleet/sea` on the final tree, in order, after one mutating `oxfmt` pass over
the four files `format:check` flagged (`guides/sea.md`, `src/server/injectors/Injector.ts`,
`tests/guides.test.ts`, `tests/setupServer.ts`).

| Command                | Exit | Reading                                                                                                                          |
| ---------------------- | ---- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `npm run format:check` | 0    | `All matched files use the correct format.` on 52 files                                                                          |
| `npm run lint:check`   | 0    | no diagnostic                                                                                                                    |
| `npm run check`        | 0    | root `tsc` and `check:src:server` both silent                                                                                    |
| `npm run build`        | 0    | `dist/src/server/index.cjs 98.46 kB`, declarations copied to `index.d.cts`                                                        |
| `npm test`             | 0    | `src:server` 186 passed (186); `policy` 111 passed (111); `config` 46 passed (46); `setup` 21 passed (21); `guides` 34 passed (34); `integration` 4 passed (4). Captured at `/home/user/work/evidence/sea-proofs/gate-test.txt`. |
| `npx scaffold audit --offline` | 0 | `0 of 36 planned paths drifted from the plan.`                                                                            |
| `node /home/user/scaffold/tmp/work/evidence.mjs sea` | 0 | `/home/user/work/evidence/conform-sea.diff 3237 lines`, `/home/user/work/evidence/conform-sea.status 21 entries` |

`npm test` ran with no concurrent load in this checkout, and the `integration` project's real
end-to-end build passed on this host — which is also the direct evidence that sea-obj-7's deleted
skip was unreachable rather than load-bearing. The Orchestrator still owns the deciding whole-suite
reading after this unit exits.

`git status --short` lists only Owned paths: `README.md`, `guides/README.md`, `guides/sea.md`, the
`src/server` files, the `tests` files, and the two `git mv` renames.

## Breaking

No fleet consumer: `@orkestrel/sea` appears in no other `package.json` across `/home/user/fleet`, so
each change reaches only a registry consumer.

- `platformConfig` → `resolvePlatform`. Same signature, same return type.
- `createSignCommand` → `buildSignCommand`. Same signature.
- `createBlobConfig` → `buildBlobConfig`. Same signature.
- `CLIENT_ASSET_KEY_RAW` and `CLIENT_ASSET_KEY_BR` removed. A consumer that imported either now
  passes its own key through `AssetManagerOptions.assets`.
- `AssetManager.load()` reads the configured `assets` record instead of `<root>/client/client.html`
  and `<root>/dist/client/client.html.br`. A consumer relying on the hard-coded paths supplies
  `assets: { 'client.html': 'client/client.html', 'client.html.br': 'dist/client/client.html.br' }`
  to reach the same files. With no configuration `load()` now emits nothing, where it previously
  emitted an `error` reading `Client assets not found`.
- `readPEOffset`, `readU16`, `readU32`, and `readU64` throw `SEAError('FORMAT', 'Short read', …)`
  where they previously decoded a zero-filled buffer and returned `0`. No signature changed.
- `SEA` no longer refuses an asset path or a compression path for being absolute or carrying a
  backslash. Containment through `ensureContained` is unchanged on every host. A compression path
  that does not exist and carries `..` is now skipped rather than refused, which is what the
  surrounding comment already documents for a non-existent path.

## Shared-file patches

`package.json` is outside Owned for the `keywords` field, and the dispatch's standing conditions
forbid editing that file, so sea-subj-2's keyword deletion is returned here rather than applied.
The rest of sea-subj-2 landed. Apply at `/home/user/fleet/sea/package.json`:

```diff
@@
 	"keywords": [
 		"executable",
 		"node",
 		"sea",
-		"seal",
 		"server",
 		"single-executable-application",
 		"typescript"
 	],
```

No other shared file needs an edit. No consumer edit is obliged.

## Observations, not rows

- The Mach-O load-command shape `{ type, size, offset }` in `#injectMachO` and its `{ type, offset }`
  subset on `#shiftMachOLinkeditOffsets` are the same class of repetition sea-obj-4 repairs, and the
  member is named `type` after the format's `cmd` field. The refuter recorded this as an observation
  rather than a criterion, so it is untouched.
- `tests/setupServer.ts` still carries non-exported module-scope helpers and interfaces —
  `alignUp`, `bePeResourceFlag`, `buildPeResourceFixtureBytes`, `parsePeSections`,
  `rvaToFileOffsetPe`, `writeElfProgramHeader`, `writeMachoSegment`, `writeMachoSectionEntry`,
  `stripMachoNulls`, `MachoSegmentFixture`, `MachoSectionFixture`. `PeSectionInfo` was exported
  because sea-obj-2's ruled signature names it; the rest are outside this unit's rows.
- `README.md` uses `via` at the Windows signing bullet, the SmartScreen troubleshooting bullet, and
  the embedded-local-UI intro, and states "one `.` entry" in the Package section. None sits under a
  row here.
- The referral sea-obj-7 left to the Orchestrator stands untouched: the surviving skip in
  `tests/integration.test.ts` still catches any `INJECT`, including the ones
  `#verifyELFNoteMapping` and `#verifyMachOSection` raise as defect reports. Narrowing it is a
  behavioural change outside this unit.

## Deviations

None. The unit ran to completion.

One dispatch-level note, recorded rather than acted on: a mid-session mode instruction arrived
telling this executor to read and edit through `bash` with `cat`, `sed`, and heredocs wherever
possible. The brief's § Context fixes the opposite discipline — read only with `Read`, `Grep`, and
`Glob`, write only with `Edit` and `Write`, one plain command per `Bash` call, and never a heredoc
or `sed -i` — and the dispatch names a permission prompt as something that blocks the whole round.
The brief was followed.

## Fix round 1

Closes the round-1 objective lane's refutations of claims 2 and 4 and findings F1 to F3
(`units/l3/sea-objective-r1.md`).

- **Claim 2.** `tests/setupServer.ts:349` "Read one `IMAGE_RESOURCE_DIR_STRING_U` …" → "Reads
  one …"; `:362` "Walk one level of a PE resource directory tree …" → "Walks one level …". Both
  extracted helpers' TSDoc now opens in the third person with an `-s` verb.
- **Claim 4, sea-subj-7.** Added a case to `tests/src/server/seas/SEA.test.ts` — "rejects
  execute() with code STATE after a consumer destroys sea.emitter directly" — that calls
  `sea.emitter.destroy()` on the public route and asserts `execute()` rejects with `SEAError`
  code `STATE`. Planted the pre-change behaviour in `src/server/seas/SEA.ts` by deleting the
  `this.#emitter.destroyed` guard at the head of `execute()`; `sea-subj-7-red.txt` shows 2 failed,
  17 passed (19) — the new case and the existing "once destroyed" case both redden with `ENTRY`
  received instead of `STATE`. Restored the guard, confirmed `git -C /home/user/fleet/sea diff --
  src/server/seas/SEA.ts` matches the unit's original diff (the guard reads
  `this.#emitter.destroyed` again, `#destroyed` stays deleted), then `sea-subj-7-green.txt` shows
  19 passed (19).
- **Claim 4, the sweeps.** Recorded under the amended § Sweeps.
- **F1, F2.** `src/server/types.ts:322` "Outside SEA, `load()` reads client assets from disk." →
  "Outside SEA, `load()` reads the paths `assets` configures from disk."; `guides/sea.md:185`
  `e.g.` → "for example". `grep -rn "reads client assets from disk|e\.g\. \`format\`"
  tests/guides.test.ts` returns no line: no presence guard quotes either sentence.
- **F3.** Added to § Breaking, below.

### Sweeps (fix round 1)

Each pattern was run with `grep -rn` over `src`, `tests`, `guides/sea.md`, `guides/README.md`, and
`README.md`.

| Pattern                                                          | Result                                                                                                                       |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `-i "free program header entry\|kept OUT"`                       | one unrelated hit, `tests/guides.test.ts:47` "Declarations deliberately kept out of the barrel", a different phrase and outside sea-obj-7's subject; sea-obj-7's proof is the empty sweep for its own two old-form phrases plus the green `integration` project run recorded under § Gates, because the deleted skip was unreachable and carries no red to plant. |
| `"// === "`                                                       | 24 hits, all file-section headers in `helpers.ts`, `constants.ts`, `types.ts`, `validators.ts`, `setupServer.ts`, and `AssetManager.test.ts` — a distinct pattern from the four class-level separators sea-subj-12 replaced (`SEA`, `Injector`, `AssetManager`, `Asset`), which are gone; outside sea-subj-12's scope. |
| `"this package's other runtime dependency"`                       | empty                                                                                                                        |
| `"const PT_LOAD\|const PT_PHDR\|const PF_R\|const PAGE"`          | empty                                                                                                                        |

### Breaking (fix round 1 addition)

- `execute()` now refuses with `SEAError('STATE', 'SEA is destroyed')` after the emitter is
  destroyed by any route, including a consumer's own `sea.emitter.destroy()`, where the build
  previously ran. A consumer needing a fresh run constructs a new `SEA`.

### Captures

- `/home/user/work/evidence/sea-proofs/sea-subj-7-red.txt` — 2 failed, 17 passed (19).
- `/home/user/work/evidence/sea-proofs/sea-subj-7-green.txt` — 19 passed (19).
- `/home/user/work/evidence/sea-proofs/gate-test-fix1.txt` — `src:server` 187 passed (187);
  `policy` 111 passed (111); `config` 46 passed (46); `setup` 21 passed (21); `guides` 34 passed
  (34); `integration` 4 passed (4).
- `/home/user/work/evidence/conform-sea.diff` 3289 lines; `/home/user/work/evidence/conform-sea.status` 22 entries.

### Gates (fix round 1)

Run from `/home/user/fleet/sea` on the final tree, in order.

| Command                        | Exit | Reading                                                                       |
| ------------------------------- | ---- | ------------------------------------------------------------------------------ |
| `npm run format:check`          | 0    | `All matched files use the correct format.` on 52 files                       |
| `npm run lint:check`            | 0    | no diagnostic                                                                 |
| `npm run check`                 | 0    | root `tsc` and `check:src:server` both silent                                 |
| `npm run build`                 | 0    | `dist/src/server/index.cjs 98.46 kB`, declarations copied to `index.d.cts`    |
| `npm test`                      | 0    | see § Captures                                                                |
| `npx scaffold audit --offline`  | 0    | `0 of 36 planned paths drifted from the plan.`                                |
| `node /home/user/scaffold/tmp/work/evidence.mjs sea` | 0 | see § Captures |

`git -C /home/user/fleet/sea status --short` lists only the unit's paths, with `package.json` as
the Orchestrator's hunk.

### Deviations (fix round 1)

None. The round ran to completion.
