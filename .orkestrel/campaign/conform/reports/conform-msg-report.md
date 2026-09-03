# Unit conform-msg — report

Every row under § Rows landed and the gate chain is green. This report describes the whole unit as
it stands on 2026-09-03 after fix round 3. Fix round 3 changed `src/core/constants.ts`,
`guides/msg.md`, and `tests/guides.test.ts` to close the objective lane's F-2 and F-3, corrected this
report's own F1 evidence block to close F-1, and captured the runner's output for every failing-first
proof the lane could not settle from prose. § Fix round 3 names each item with what closed it, and
§ Fix round 2 keeps the round before it.

The unit spans the checkpoint commit and the working tree. The pre-campaign baseline is `1a8821a~1`.
The killed implementer's partial edits are the commit `1a8821a`. The commit `75a7b99`, which is
HEAD, is the Orchestrator's closure re-staging and carries no unit work. The unit therefore spans
disjoint ranges, and each has its own artifact:

- `/home/user/work/evidence/conform-msg.checkpoint.diff` is `git diff 1a8821a~1 1a8821a`, the
  checkpoint half.
- `/home/user/work/evidence/conform-msg.diff` is `git diff HEAD`, the working-tree half.

Neither artifact contains the staging commit, so neither carries an off-limits file. § Scope proves
that and states the staging commit's own contents.

## Fix round 3

| Item                                                              | Lane      | What closed it                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ----------------------------------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F-1 — the F1 evidence block misquoted the text it replaced        | objective | Adopted verbatim. The `src/core/types.ts:79-81 before` block under § Failing-first proofs now carries the three removed lines exactly as `/home/user/work/evidence/conform-msg.diff:932-934` writes them, `via index signature` included. The `msg-subj-13` row states that `types.ts:80`'s `via` left the tree with F1's block rewrite rather than with a substitution edit.                                                                                                              |
| F-2 — the Errors-fence transcription did not transcribe the fence | objective | Adopted the lane's first option. `guides/msg.md:148` reads `throw new MSGError('MALFORMED', 'bad input', { offset: 8 })` and the transcription stands. The prescribed mutation probe did not redden on the fence edit alone, because nothing in the `guides` project read the fence's body; the transcription is now bound to the fence by a presence guard beside the executed assertion, which `.claude/rules/documentation.md` § Parity sanctions. § Failing-first proofs carries the probe. |
| F-3 — one concept under two vocabularies in `constants.ts`        | objective | Adopted the prescribed block verbatim at `src/core/constants.ts:28-30`. Its wording is the wording of the guide row at `guides/msg.md:79`, so that row needed no edit; § Sweeps records the reading that shows the pair agrees. `MSG_L_BIG_BLOCK_SIZE` and `MSG_L_BIG_BLOCK_MARK` are untouched, as the finding's bound directs.                                                                                                                                                          |
| Claim 4 — failing-first proofs                                    | objective | The runner's own captured output replaces every transcribed count. § Failing-first proofs names each file under `/home/user/work/evidence/msg-proofs/` and records the `git diff --numstat HEAD` reading that shows each restore byte-exact.                                                                                                                                                                                                                                              |
| Claim 8 — gate evidence                                           | objective | The gate chain was re-run bare, in order, after every plant was restored. § Gates records each command with its exit code. The whole-suite reading stays an observation for the Orchestrator's deciding run, per the brief.                                                                                                                                                                                                                                                               |
| Referral — the staging commit                                     | objective | Carried to the Orchestrator unchanged. `75a7b99` sits outside both evidence artifacts and this unit cannot read it; the lane asks for `git show --stat 75a7b99` from the Orchestrator's own record.                                                                                                                                                                                                                                                                                      |

## Fix round 2

| Item                             | Lane              | What closed it                                                                                                                                                                                                                                                                                                    |
| -------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F1 — prose against the shipped type | objective      | Adopted verbatim. `src/core/types.ts:78-82` and `guides/msg.md:51` no longer describe an index-signature write channel the type refuses. The type stays barrelled and the parity `INTERNAL` list is untouched, as the finding's bound directs. § Failing-first proofs carries the mutation probe that measured the refusal. |
| Claim 3 — sweep coverage         | objective, checker | The retired-member sweep and the `data`/`item` sweep were re-run over `src`, `tests`, `guides/msg.md`, `guides/README.md`, and `README.md`. § Sweeps names each pattern, each path, and every survivor. The survivors the widened paths returned are recorded there and in § Deviations.                             |
| Claim 7 — off-limits content in the diff | objective, checker | `/home/user/work/evidence/conform-msg.diff` is regenerated as `git diff HEAD` and the checkpoint half moves to its own artifact, so no artifact carries `package-lock.json` or a dependency hunk. The lane's settling command was run and its output is quoted in § Scope.                          |
| Checker referral — evidence scoping | checker        | Same close as claim 7. The campaign's own `<unit>.checkpoint.diff` / `<unit>.diff` pair is the shape this unit now uses, so the checkpoint half stays available without a range that spans the staging commit.                                                                                                    |
| Claim 8 — gate evidence          | objective         | The gate chain was re-run in order this round, each command bare, after the mutation probe was restored. § Gates records every reading. The whole-suite reading stays an observation for the Orchestrator's deciding run, per the brief.                                                                            |
| R1, R2 — from fix round 1        | objective         | Both referred to the subjective lane in round 1 and are recorded in § Deviations for the next matrix. No row's site list names their sites.                                                                                                                                                                        |

## Rows

Every row is `applied`. The `What landed` column names the checkpoint's half where the checkpoint
carried one, because `1a8821a` is an ancestor of HEAD and its work is invisible to `git diff HEAD`.

| Row         | Disposition | What landed                                                                                                                                                                                                                                                                                                        |
| ----------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| msg-subj-1  | applied     | The checkpoint carried `fileName` → `name` and `content` → `bytes` through `types.ts`, `MSG.ts`, `shapers.ts`, and the mirrored tests, with the shadow-avoiding literal at `MSG.ts:258`. This unit completed the guide: the `MSGAttachment` Surface row, the Shapers fence's adapter literal, and the Methods fence's `// { name, bytes }` comment. |
| msg-subj-2  | applied     | `truncateAtNull` and its restated first sentence were in the checkpoint. This unit completed the guide: the Helpers table row, the fence import list, and the worked line `truncateAtNull('abc\0def') // 'abc'`.                                                                                                 |
| msg-subj-3  | applied     | `decodeText(bytes, encoding?)` with its restated sentence and its updated `@example` was in the checkpoint. This unit completed the guide's Helpers table row, including the signature's `bytes` parameter.                                                                                                      |
| msg-subj-4  | applied     | `readMicrosoftUUID` and `computeSectors` were in the checkpoint. This unit completed the guide: the Helpers table rows, the fence import list, and the worked lines `computeSectors(100, 64) // 2` and `readMicrosoftUUID(new Uint8Array(16), 0)`.                                                               |
| msg-subj-6  | applied     | Verified in the checkpoint: `MSG.ts:595-597` declares `Array<{ readonly emit: boolean; readonly index: number }>`, tests `if (step.emit)`, and `#processDirectory` takes `headerSize: number` with `32` at the root call and `8` at the attachment, recipient, and sub calls. No `subClass` remains in the tree.  |
| msg-subj-7  | applied     | The `bytes`, `stream`, `fields`, `step`, `address`, `attachment`, and `message` renames were in the checkpoint. This unit completed the guide's signature rows. A word-boundary sweep for `data` and `item` as identifiers in `src` returns nothing; every surviving `data` there is the English word in prose. § Sweeps records the identifiers the widened `tests` path returned and § Deviations carries them. |
| msg-subj-8  | applied     | `MSG_SECTOR_SIZE`, `MSG_MINI_SECTOR_SIZE`, `MSG_MINI_STREAM_CUTOFF`, and `MSG_DIRECTORY_ENTRY_SIZE` are the surviving names; the `MSG_BURNER_*` duplicates are deleted. `MSG_BURNER_INTS_PER_SECTOR` repoints to `MSG_SECTOR_SIZE`. Every use in `MSG.ts`, `shapers.ts`, the mirrored tests, and the guide's Constants rows follows. |
| msg-subj-9  | applied     | `EmailAttachment.size` is gone from `types.ts`, its construction sites, `isEmailAttachment`, and the validators fixture — all in the checkpoint. This unit completed the guide's Surface row, the `isEmailAttachment` guard row, the Validators fence's worked line, and `README.md`'s `attachment.bytes.length`. |
| msg-subj-10 | applied     | Verified in the checkpoint at `types.ts:420-422`: the `MSGOptions` remark states the option decodes a non-Unicode MSG property string and names the `content-type` charset the option does not reach. `MSGEncoding` and its guide row are untouched, as the row directs.                                         |
| msg-subj-11 | applied     | Verified in the checkpoint at `types.ts:288-292`: the `MSGSourceInterface` remark names the adapter the constructor builds and states that the class does not implement the interface. Landed beside msg-subj-18's method table, which the remark points a reader toward.                                        |
| msg-subj-12 | applied     | The `'eml'` prerequisite and the `chain.messages[0].attachments` pointer were added to the TSDoc blocks at `types.ts` and `MSG.ts:230-237` in the checkpoint. This unit completed the guide's `attachment` method-table row. The thrown code is unchanged.                                                       |
| msg-subj-13 | applied     | The checkpoint fixed `helpers.ts`. This unit fixed `types.ts`, `errors.ts:16`, and the guide and README rows the row names. `types.ts:80`'s `via` left the tree with fix round 2's F1 block rewrite, which replaced the whole doc block, rather than with a substitution edit of that word. See § Deviations for same-class sites the row's list does not carry. |
| msg-subj-14 | applied     | Every `AGENTS §N` citation in a package-owned file names a rule file and heading: `guides/msg.md` (the Methods preamble and the See-also line), `guides/README.md` (the index line and the See-also line), `tests/setup.ts`, `tests/src/core/MSG.test.ts`, `tests/src/core/shapers.test.ts`, and `tests/src/core/helpers.test.ts`. |
| msg-subj-15 | applied     | The `MSG` section, the `burn` method-table row, and the "Embedded vs. top-level burn" bullet describe observable behaviour. No `#properties` or `#bigBlockTable` token survives in `guides/`. `## Round-trip semantics` is untouched.                                                                            |
| msg-subj-16 | applied     | The Helpers fence builds `new DataView(new Uint8Array([0x48, 0x00, 0x69, 0x00]).buffer)` and annotates `readUTF16String(view, 0, 2) // 'Hi'`. msg-obj-1's transcription asserts that value.                                                                                                                      |
| msg-subj-17 | applied     | `## Dependency reference` states that the package declares no `@orkestrel/*` runtime dependency, then names `guide.md`, `test.md`, `scaffold.md`, and `probe.md`, each as a byte-identical mirror of that package's own guide, with the existing rationale applied to the set.                                    |
| msg-subj-18 | applied     | `## Methods` carries a `#### \`MSGSourceInterface\`` table with `parse` and `attachment` rows, written in the renamed vocabulary. The parity suite checks the group from the table to the interface and from the interface to the table, and passes.                                                              |
| msg-subj-19 | applied     | The tagline is a noun phrase keeping the `Source:` and barrel lines; the eager-parse rule, the `createMSG` dual, and the pure-ES encoding note moved into `## Surface` as separate sentences. The Constants, Shapers, Validators, and `MSG` preambles each open with one sentence and carry one idea per sentence. |
| msg-obj-1   | applied     | `tests/guides.test.ts` carries `describe('flagship fences', …)`, transcribing every fence in `guides/msg.md` and asserting the values its comments claim, including msg-obj-2's Shapers fence. Fix round 3 added the presence guard that ties the Errors-fence case to the fence it transcribes. See § Failing-first proofs for the control that reddened the block and the probe that reddens the guard. |
| msg-obj-2   | applied     | The Shapers fence imports `MSG_CATEGORY_ROOT` and writes `category: MSG_CATEGORY_ROOT`. The transcription asserts `MSG_CATEGORY_ROOT` is `5` and that `isMSGFile` passes on a `DataView` over the burned bytes.                                                                                                  |
| msg-obj-3   | applied     | `tests/setupServer.ts` exports `WORKSPACE_ROOT`, `FIXTURES_ROOT`, and one `readFixture(name: string): Uint8Array`. The local copies are gone; `helpers.test.ts` builds its `DataView` at the call sites. `tests/setupServer.test.ts` proves the module. No project's `setupFiles` changed.                        |
| msg-obj-4   | applied     | `isBrowserVuePath`, its `describe` block, its import entry, and the header comment's Vue-path clause are gone. The header-comment edit landed with msg-subj-14's citation strike, as the row directs.                                                                                                            |
| msg-obj-6   | applied     | `package.json:53` reads `"lint": "oxlint --config .oxlintrc.json --fix ."`. The `lint:check` script at `package.json:59` is unchanged.                                                                                                                                                                          |
| msg-obj-7   | applied     | Verified in the checkpoint: `helpers.ts:558` splits on `/\r\n|\n/`. `parsers.ts:40` still splits the already-normalised body on `'\n'`, as the row directs. Form conformance with no behavioural delta; the finding's proposed test was dropped, as the row directs.                                              |
| msg-obj-8   | applied     | `MSG_FILE_HEADER` and `MSG_BURNER_ROOT_CLSID` are `readonly number[]` wrapped in `Object.freeze`. The guide's Constants rows state the representation, and the CLSID row states the real bytes rather than "all-zero". See § Failing-first proofs.                                                               |
| msg-obj-9   | applied     | The checkpoint made `types.ts:92` read `readonly [key: string]: unknown` and `MSG.ts:1133` write through `Object.assign(fields, { [key]: value })`. Fix round 2 restated the prose the row left behind: the `MSGMutableFieldData` doc block and its guide Surface row no longer advertise the index signature as a write channel. `MSGMutableFieldData` stays barrelled, as the row directs. |

## Files touched

- `/home/user/fleet/msg/src/core/constants.ts` — each CFB fact keeps one name, the `MSG_BURNER_*` duplicates are deleted, the byte-array constants publish a frozen `readonly number[]`, and `MSG_S_BIG_BLOCK_MARK`'s doc block states the sector-shift fact in the guide row's own words.
- `/home/user/fleet/msg/src/core/helpers.ts` — `truncateAtNull`, `decodeText`, `readMicrosoftUUID`, and `computeSectors` with their restated doc blocks; `parseMIMEHeaders` splits on `/\r\n|\n/`; the `data` parameters are renamed `bytes`; banned terms replaced.
- `/home/user/fleet/msg/src/core/MSG.ts` — the traversal stack carries `{ emit, index }` and its binding is `step`; `#processDirectory` takes `headerSize`; the attachment literal reads `{ name, bytes }`; the accumulator writes through `Object.assign`; repointed to the surviving constant names.
- `/home/user/fleet/msg/src/core/shapers.ts` — the `MSGAttachment` translation drops, `EmailAttachment.size` drops, and the constants and helpers import lists repoint and re-sort.
- `/home/user/fleet/msg/src/core/types.ts` — `MSGAttachment` publishes `{ name, bytes }`, `EmailAttachment` drops `size`, `MSGMutableFieldData`'s index signature is `readonly` and its doc block states the `Object.assign` write path, and the `MSGOptions` and `MSGSourceInterface` remarks state what a reader can check.
- `/home/user/fleet/msg/src/core/errors.ts` — `e.g.` replaced in the `MSGError` remark.
- `/home/user/fleet/msg/src/core/validators.ts` — `isEmailAttachment` drops its `size` check.
- `/home/user/fleet/msg/package.json` — the `lint` script drops `--deny-warnings`.
- `/home/user/fleet/msg/guides/msg.md` — the tagline, the section preambles, the Surface, Constants, Helpers, Shapers, and Validators tables, the fences (including the Errors fence's `{ offset: 8 }` context), the `MSG` section, the Methods tables, the burn contrast, and the See-also line.
- `/home/user/fleet/msg/guides/README.md` — the index line, the `## Dependency reference` section, and the See-also line.
- `/home/user/fleet/msg/README.md` — `via` replaced; the attachment loop reads `attachment.bytes.length`.
- `/home/user/fleet/msg/tests/setupServer.ts` — new; the one `node:fs` fixture loader, anchored to `WORKSPACE_ROOT`.
- `/home/user/fleet/msg/tests/setupServer.test.ts` — new; proves the loader's path anchoring, its byte fidelity, its ownership of the returned bytes, and its read error.
- `/home/user/fleet/msg/tests/setup.ts` — `isBrowserVuePath` deleted; the header comment names the rule file.
- `/home/user/fleet/msg/tests/setup.test.ts` — the `isBrowserVuePath` block and its import entry deleted.
- `/home/user/fleet/msg/tests/guides.test.ts` — the header rewritten, the source imports added, `describe('flagship fences', …)` appended, and the Errors-fence case given a presence guard that reads the fence text beside its executed assertion.
- `/home/user/fleet/msg/tests/src/core/MSG.test.ts` — the local `readFixture` replaced by the shared loader; renamed members and constants; the header citation names the rule file.
- `/home/user/fleet/msg/tests/src/core/factories.test.ts` — the local `readFixture` replaced by the shared loader.
- `/home/user/fleet/msg/tests/src/core/helpers.test.ts` — the local `readFixture` replaced by the shared loader with the `DataView` built at each call site; the renamed helpers; the `MSG_FILE_HEADER` immutability case added; the header citation names the rule file.
- `/home/user/fleet/msg/tests/src/core/shapers.test.ts` — renamed members and constants; the `MSG_BURNER_ROOT_CLSID` immutability case added; the header citation names the rule file and its `via` replaced.
- `/home/user/fleet/msg/tests/src/core/validators.test.ts` — the `EmailAttachment` fixture drops `size`.

The checkpoint half, quoted from `git diff --stat 1a8821a~1 1a8821a` run on 2026-09-03:

```text
 src/core/MSG.ts                   | 109 ++++++++++++++++++++------------------
 src/core/helpers.ts               |  57 ++++++++++----------
 src/core/shapers.ts               |  45 ++++++++--------
 src/core/types.ts                 |  32 ++++++-----
 src/core/validators.ts            |   9 ++--
 tests/src/core/MSG.test.ts        |  22 ++++----
 tests/src/core/helpers.test.ts    |  48 ++++++++---------
 tests/src/core/shapers.test.ts    |  12 ++---
 tests/src/core/validators.test.ts |   1 -
 9 files changed, 170 insertions(+), 165 deletions(-)
```

The working-tree half, quoted from `git diff --stat HEAD` run on 2026-09-03 after fix round 3:

```text
 README.md                        |   6 +-
 guides/README.md                 |  29 +++--
 guides/msg.md                    | 259 ++++++++++++++++++++-------------------
 package.json                     |   2 +-
 src/core/MSG.ts                  |  28 ++---
 src/core/constants.ts            |  47 +++----
 src/core/errors.ts               |   2 +-
 src/core/shapers.ts              |  47 ++++---
 src/core/types.ts                |  10 +-
 src/core/validators.ts           |   6 +-
 tests/guides.test.ts             | 220 ++++++++++++++++++++++++++++++++-
 tests/setup.test.ts              |  21 +---
 tests/setup.ts                   |  11 +-
 tests/setupServer.test.ts        |  59 +++++++++
 tests/setupServer.ts             |  50 ++++++++
 tests/src/core/MSG.test.ts       |  28 ++---
 tests/src/core/factories.test.ts |   9 +-
 tests/src/core/helpers.test.ts   |  31 +++--
 tests/src/core/shapers.test.ts   |  48 +++++---
 19 files changed, 607 insertions(+), 306 deletions(-)
```

## Scope

`git status --short` lists only files under Owned, and `/home/user/work/evidence/conform-msg.status`
carries it verbatim. Neither evidence artifact carries a file outside Owned: the file headers in
`/home/user/work/evidence/conform-msg.diff` and
`/home/user/work/evidence/conform-msg.checkpoint.diff` are the paths listed under § Files touched and
nothing else.

The staging commit `75a7b99` sits between the two ranges and is excluded from both. `git diff --stat
1a8821a HEAD` run on 2026-09-03 returns exactly:

```text
 package-lock.json | 83 +++++++++++++++++++++++++++++++++++++++++++++----------
 package.json      |  5 ++--
 2 files changed, 70 insertions(+), 18 deletions(-)
```

The unit's own `package.json` edit is the `lint` script alone. `git diff HEAD -- package.json` run on
2026-09-03 returns:

```text
diff --git a/package.json b/package.json
index 78f36a4..948e53e 100644
--- a/package.json
+++ b/package.json
@@ -50,7 +50,7 @@
 		"clean": "node -e \"require('node:fs').rmSync('dist',{recursive:true,force:true})\"",
 		"copy": "node -e \"const fs=require('node:fs'),p=require('node:path'),a=process.argv[1],b=process.argv[2];fs.mkdirSync(p.dirname(b),{recursive:true});fs.cpSync(a,b,{force:true});console.log('Copied: '+a+' to '+b)\"",
 		"scaffold": "scaffold",
-		"lint": "oxlint --config .oxlintrc.json --fix --deny-warnings .",
+		"lint": "oxlint --config .oxlintrc.json --fix .",
 		"check": "tsc --noEmit --project tsconfig.json && npm run check:src",
 		"check:src": "npm run check:src:core",
 		"check:src:core": "tsc --noEmit -p configs/src/tsconfig.core.json",
```

The `version` field reads `0.0.8` and is untouched. No off-limits file carries unit work.

## Failing-first proofs

Every reading in this section is the runner's own captured output, written by
`npm run <script> > <file> 2>&1` on 2026-09-03 during fix round 3 and kept under
`/home/user/work/evidence/msg-proofs/`:

| File                        | Command              | Tree state                                                            |
| --------------------------- | -------------------- | --------------------------------------------------------------------- |
| `test-src-reverted.txt`     | `npm run test:src`   | msg-obj-8's `Object.freeze` change reverted                           |
| `test-src-applied.txt`      | `npm run test:src`   | the change restored                                                   |
| `test-guides-control.txt`   | `npm run test:guides` | msg-obj-1's `.jpg` control planted                                    |
| `test-guides-clean.txt`     | `npm run test:guides` | the control removed                                                   |
| `check-write-planted.txt`   | `npm run check`      | F1's index-signature write planted at `src/core/MSG.ts:1133`          |
| `check-write-restored.txt`  | `npm run check`      | the write restored                                                    |
| `guides-fence-stripped.txt` | `npm run test:guides` | F-2's context removed from the `guides/msg.md` Errors fence           |
| `guides-fence-restored.txt` | `npm run test:guides` | the fence restored                                                    |

Every plant is an exact `Edit` reversed by the inverse `Edit`. The reading that shows each restore
byte-exact is `git diff --numstat HEAD -- <file>`, taken before the plant and again after the
restore: `src/core/constants.ts` reads `15 32` on each side, `tests/guides.test.ts` reads `217 3`,
and `src/core/MSG.ts` reads `14 14`.

**F1 (fix round 2), re-measured in fix round 3.** The finding is that the prose described a write
channel the shipped type refuses. The probe restores that channel and reads what the checker says.

Membership rule: a write to `MSGMutableFieldData` through its index signature. Control drawn from
outside that rule: the shipped `Object.assign` write, which reaches the same accumulator without the
index signature.

- Planted: `src/core/MSG.ts:1133` set to `if (key !== undefined) fields[key] = value`, then
  `npm run check` → exit 2. `check-write-planted.txt` carries
  `src/core/MSG.ts(1133,26): error TS2542: Index signature in type 'MSGMutableFieldData' only permits reading.`
- Restored: `src/core/MSG.ts:1133` back to `if (key !== undefined) Object.assign(fields, { [key]: value })`,
  then `npm run check` → exit 0, in `check-write-restored.txt`. `git diff --numstat HEAD -- src/core/MSG.ts`
  reads `14 14`, its pre-plant value, so the restore is byte-exact.

The probe establishes that the shipped type refuses the write the old sentences described, which is
what makes the old prose false and the replacement true. It does not establish that the replacement
sentences are the clearest available wording; that is a reading of the two blocks.

The sentences that changed:

```text
src/core/types.ts:79-81 before
  Represents an internal mutable accumulator used during MSG field extraction.
  Properties are assigned dynamically via index signature and
  narrowed to the readonly {@link MSGFieldData} at the public boundary.
src/core/types.ts:79-81 after
  Represents an internal accumulator for MSG field extraction whose members are all readonly.
  The extraction path writes each resolved field through `Object.assign`, then narrows the
  accumulator to {@link MSGFieldData} at the public boundary.

guides/msg.md:51 before
  Internal mutable accumulator (index-signature) used during field extraction, narrowed to `MSGFieldData` at the public boundary.
guides/msg.md:51 after
  Internal readonly accumulator for field extraction, written through `Object.assign` and narrowed to `MSGFieldData`.
```

**msg-obj-8.** Command: `npm run test:src`, re-measured on 2026-09-03 during fix round 3 by
reverting the shipped change and restoring it.

- Reverted, in `test-src-reverted.txt`: `src/core/constants.ts` back to `export const MSG_FILE_HEADER = new Uint8Array([…])` and `export const MSG_BURNER_ROOT_CLSID = new Uint8Array([`, then `Test Files 2 failed | 4 passed (6)`, `Tests 2 failed | 178 passed (180)`, exit 1. Each failure reads `AssertionError: expected true to be false` on `Reflect.set(MSG_FILE_HEADER, 0, 0x00)` at `tests/src/core/helpers.test.ts:362` and on `Reflect.set(MSG_BURNER_ROOT_CLSID, 0, 0x00)` at `tests/src/core/shapers.test.ts:48`.
- Restored, in `test-src-applied.txt`: `Test Files 6 passed (6)`, `Tests 180 passed (180)`, exit 0, with `git diff --numstat HEAD -- src/core/constants.ts` back at `15 32`.

The row required settling by probe whether `Object.freeze` throws on a non-empty typed array. It
does, so the representation had to change. The probe's membership rule was values that are typed
arrays with at least one element; its controls came from outside that rule.

```text
subject  non-empty Uint8Array: THREW TypeError: Cannot freeze array buffer views with elements
control  empty Uint8Array    : froze; isFrozen=true
control  plain number array  : froze; isFrozen=true
set(frozen plain array) -> 0 d0 cf 11
```

The last line settles the other half of the repair: `Uint8Array.prototype.set` accepts a frozen
plain array, so `shapers.ts:307` and `shapers.ts:350` need no change.

**msg-obj-1.** The row adds a missing gate, so its proof is that the added instrument reports
failure. Membership rule: values a `guides/msg.md` fence claims through a `//` comment, executed
against the real source. Negative control drawn from outside that rule: `.jpg` as the extension for
`image/png`, which no fence claims.

- Control planted, in `test-guides-control.txt`: `npm run test:guides` → `Tests 1 failed | 32 passed (33)`, exit 1, failing exactly `flagship fences > returns the values the Helpers fence annotates` with `AssertionError: expected '.png' to be '.jpg'` at `tests/guides.test.ts:269`.
- Control removed, in `test-guides-clean.txt`: `npm run test:guides` → `Tests 33 passed (33)`, exit 0, with `git diff --numstat HEAD -- tests/guides.test.ts` back at `217 3`.

The control establishes that the transcription compares against what the source returns. It does not
establish that every fence comment is transcribed; that is a reading of the block against the guide,
and every fence in `guides/msg.md` carrying a value comment has a case.

**F-2 (fix round 3).** The finding is that the Errors-fence transcription asserted a context the
fence never passed. The fence now passes it, and the probe measures whether the transcription is
bound to the fence at all. Membership rule: the arguments the `guides/msg.md` Errors fence hands
`MSGError`. Control drawn from outside that rule: none is needed, because the probe is the mutation
itself — stripping the context from the fence is the change the gate must refuse.

- Fence stripped, in `guides-fence-stripped.txt`: `guides/msg.md:148` set back to `throw new MSGError('MALFORMED', 'bad input')`, then `npm run test:guides` → `Tests 1 failed | 32 passed (33)`, exit 1, failing exactly `flagship fences > dispatches the Errors fence on the code and reads the context back` at `tests/guides.test.ts:250`.
- Fence restored, in `guides-fence-restored.txt`: `npm run test:guides` → `Tests 33 passed (33)`, exit 0.

The same plant, run before the presence guard existed, read `Tests 33 passed (33)`, exit 0. That
capture was overwritten by the re-run recorded here, so this report is where the pre-guard reading
survives; § Deviations states what it measured and what closing it decided.

**msg-obj-3 and msg-obj-4** are test-infrastructure rows with no behavioural delta. Their proof is
the sweep plus `npm run test:setup` and `npm run test:src` green, recorded in § Sweeps and § Gates.

**msg-obj-9** changes a type and no runtime path, so `npm run check` is its proof. F1's mutation
probe is the same claim measured from the other side.

## Sweeps

Each bullet names its pattern and the paths it walked. `node_modules` is outside every sweep's
paths. The sector-vocabulary sweeps F-3 names and the banned-term sweep over the files fix round 3
changed were run on 2026-09-03 during fix round 3; the rest were run on 2026-09-03 during fix round
2, over a tree whose only later change is the `src/core/constants.ts` doc block, the
`guides/msg.md` Errors fence, and the `tests/guides.test.ts` presence guard that fix round 3 landed.

- Retired names, case-insensitive with the `-s`, `-ed`, and `-ing` inflections. Pattern:
  `(?i)\b(removeTrailingNull|readANSIString|msftUUIDStringify|sectorsNeeded|isBrowserVuePath|MSG_S_BIG_BLOCK_SIZE|MSG_SMALL_BLOCK_SIZE|MSG_BIG_BLOCK_MIN_DOC_SIZE|MSG_PROPERTY_SIZE|MSG_BURNER_SECTOR_SIZE|MSG_BURNER_MINI_SECTOR_SIZE|MSG_BURNER_MINI_STREAM_CUTOFF|MSG_BURNER_DIR_ENTRY_SIZE|subClass)(s|ed|ing)?\b`.
  Paths: the whole `/home/user/fleet/msg` checkout. Result: empty.
- Retired `MSGAttachment` and `EmailAttachment` members. Pattern: `\.fileName|\.content\b|\bsize\b`.
  Paths: `src`, `tests`, `guides/msg.md`, `guides/README.md`, `README.md` — the population claim 3
  names. Results by path:
  - `src`: `MSGFieldData.fileName` and `fileNameShort` read at `MSG.ts:275-278`, which msg-subj-1
    keeps; `Set.size` at `MSG.ts:391` and `:586`; and the English word "size" in prose at
    `types.ts:350`, `helpers.ts:224`, `MSG.ts:323`, `:499`, `:714`, and `constants.ts:23`, `:29`,
    `:34`, `:39`, `:44`, `:49`, `:102`.
  - `tests`: `Set.size` at the vendored `config.test.ts:42`, `:687`, `setupPolicy.ts:1325`, `:1528`,
    and the vendored `.content` properties at `setupPolicy.ts:696`, `:1904`, `:1967`,
    `policy.test.ts:385`, `:419` — all in files the brief places off-limits; and the English word
    "size" in prose at `src/core/MSG.test.ts:44` and `:168`.
  - `guides/msg.md`: the English word "size" in the Constants preamble at `:71` and in the
    `MSG_SECTOR_SIZE`, `MSG_L_BIG_BLOCK_SIZE`, `MSG_MINI_SECTOR_SIZE`, `MSG_MINI_STREAM_CUTOFF`, and
    `MSG_DIRECTORY_ENTRY_SIZE` rows at `:78`, `:80`, `:82`, `:83`, `:93`.
  - `guides/README.md`: empty.
  - `README.md`: empty.

  No `EmailAttachment.size` and no `.content` on an attachment survives in any of those paths.
- `data` and `item` as identifiers. Pattern: `\b(data|item)\b`. Paths: `src`, `tests`,
  `guides/msg.md`, `guides/README.md`, `README.md` — the population claim 3 names. Results by path:
  - `src`: every hit is the English word inside a comment or a TSDoc sentence — `types.ts:49`,
    `:138`, `:151`, `:152`, `:298`, `:434`; `MSG.ts:220`, `:266`, `:271`, `:295`, `:313`;
    `constants.ts:133`, `:272`, `:367`, `:372`; `helpers.ts:115`; `shapers.ts:44`, `:422`, `:429`.
    No identifier survives.
  - `tests`: the local binding `const data` at `tests/src/core/helpers.test.ts:268` and `:276`, read
    at `:272` and `:280`, which is an identifier in the rejected-word class and sits outside
    msg-subj-7's site list — carried to § Deviations; the vendored `setupPolicy.ts:19`, `:171`,
    `:185`, `:186`, `:578`, `:584`, `:598`, `:2024`, `:2025`, `:2026`, `policy.test.ts:250`, and
    `config.test.ts:596`, all off-limits; and no other hit.
  - `guides/msg.md`: the English word in prose at `:48`, `:55`, `:112`, `:249`.
  - `guides/README.md`: empty.
  - `README.md`: empty.
- `§[0-9]`. Paths: the whole `/home/user/fleet/msg` checkout. Result: `guides/guide.md:9`, `:190`,
  `:211`, `:318`, `:517` — all in the vendored mirror the brief places off-limits. No package-owned
  file carries one.
- `#properties` and `#bigBlockTable`. Paths: `guides`. Result: empty.
- `(?i)mutable|index-signature`. Paths: the whole `/home/user/fleet/msg` checkout. Result: the type's
  own name `MSGMutableFieldData` at `types.ts:83`, `:85`, `:86`, `:88`, `MSG.ts:19`, `:761`, `:771`,
  `:777`, `:783`, `:789`, `:795`, `:802`, `:939`, `:977`, `:980`, `:986`, `:996`, `:1020`, `:1041`,
  `:1073` and its guide Surface row at `guides/msg.md:51`; the private parameter binding `mutable`
  and its `//` comments at `MSG.ts:770-930`; and the vendored `setupPolicy.ts:2042`. No published
  sentence calls the accumulator mutable, and no sentence names the index signature as its write
  channel.
- Banned substitution terms, case-insensitive with word boundaries. Pattern:
  `(?i)\b(via|e\.g\.|i\.e\.|should|etc\.|simply|easy|easier|just|utilize|leverage|in order to|allows you to|and/or|sanity check|dummy|whitelist|blacklist|currently|performant|robust|please)\b`.
  Paths: `src`, `tests` less the vendored `setupPolicy.ts`, `guides/msg.md`, `guides/README.md`,
  `README.md`. The vendored mirrors `guides/guide.md`, `guides/test.md`, `guides/scaffold.md`, and
  `guides/probe.md` are outside the pattern's paths because the brief places them off-limits.
  Result: hits in the banned sense at `src/core/helpers.ts:517`, `guides/msg.md:180`,
  `tests/setup.ts:41`, `tests/src/core/MSG.test.ts:251`, `tests/src/core/helpers.test.ts:109`, and
  `tests/src/core/helpers.test.ts:290`, each carried to § Deviations. Hits in a permitted sense,
  recorded as permitted: the fixture payload literals `'just text'` at
  `tests/src/core/parsers.test.ts:66` and `:69` and at `tests/src/core/helpers.test.ts:467` and
  `:470`, and `'just plain text'` at `tests/src/core/helpers.test.ts:552`, which are test data rather
  than prose. `guides/README.md` and `README.md` return nothing.
- Banned substitution terms over the files fix round 3 changed, same pattern less the rows no file
  here can carry. Paths: `src/core/constants.ts`, `src/core/MSG.ts`, `guides/msg.md`,
  `tests/guides.test.ts`. Result: the pre-existing `and/or` at `guides/msg.md:180`, already carried
  to § Deviations against msg-subj-13. Fix round 3's own prose adds no banned term.
- The sector vocabulary F-3 names, run in fix round 3. Pattern:
  `(?i)small sector|small block|sector size mark`. Paths: the whole `/home/user/fleet/msg` checkout
  less `node_modules`. Result: `src/core/constants.ts:39`, the `MSG_L_BIG_BLOCK_MARK` doc block the
  finding's bound places out of reach; and `src/core/MSG.ts:449`, `:699`, `:704`, where "Small Block
  Allocation Table" and "Small block index" are the CFB format's own wording in an internal comment
  and in two error messages. Each is carried to § Deviations. No hit remains on
  `MSG_S_BIG_BLOCK_MARK`, which is the site F-3 names.
- The replacement wording against the guide row it must match, run in fix round 3. Pattern:
  `sector-shift|sector shift`. Paths: the whole checkout less `node_modules`. Result:
  `src/core/constants.ts:24` and `:29`, and `guides/msg.md:78`, `:79`, `:80`, `:81`.
  `constants.ts:29` reads "Holds the header sector-shift value selecting `MSG_SECTOR_SIZE` (byte at
  offset 30)." and `guides/msg.md:79` reads "`9` — the header sector-shift value selecting
  `MSG_SECTOR_SIZE`.", so the pair states one fact in one vocabulary and the guide row needed no
  edit.
- Deferral and suppression residue. Pattern:
  `\.skip\b|\.todo\b|@ts-ignore|@ts-expect-error|@ts-nocheck|eslint-disable|debugger|console\.log|TODO|FIXME`.
  Paths: `src`, `tests`, `guides/msg.md`, `guides/README.md`, `README.md`, `package.json`. Results by
  path:
  - `src`: the `console.log` calls inside `@example` blocks at `MSG.ts:98`, `:99`, and
    `factories.ts:33`.
  - `tests`: the pre-existing `context.skip` at `distribution.test.ts:684`, in a file this unit did
    not touch; and the vendored `setupPolicy.ts`, which owns the `TODO` and `debugger` fixtures its
    own policy cases drive.
  - `guides/msg.md`: documentation-example `console.log` calls at `:32`, `:33`, `:150`, `:358`.
  - `guides/README.md`: empty.
  - `README.md`: documentation-example `console.log` calls at `:37`, `:40`, `:41`, `:42`, `:45`,
    `:48`.
  - `package.json`: the `copy` script's `node -e` program at `:51`.

  No file this unit touched carries a skip, a todo, a suppression directive, or debug residue.

## Gates

Run in order on 2026-09-03 during fix round 3, after every plant was restored, each as its own bare
command against `/home/user/fleet/msg` with no redirect and no pipe, so the shell reports its exit
code. This table supersedes fix round 2's readings.

| Command                | Exit | Excerpt                                                                                                                              |
| ---------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `npm run format:check` | 0    | `All matched files use the correct format.` `Finished in 1886ms on 46 files using 4 threads.`                                          |
| `npm run lint:check`   | 0    | `oxlint --config .oxlintrc.json --deny-warnings .` with no diagnostic                                                                  |
| `npm run check`        | 0    | `tsc --noEmit --project tsconfig.json` then `tsc --noEmit -p configs/src/tsconfig.core.json`, each silent                              |
| `npm run build`        | 0    | `dist/src/core/index.js 89.82 kB`, `dist/src/core/index.cjs 92.77 kB`, `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts` |
| `npm test`             | 0    | `src:core` `Tests 180 passed (180)`; `policy` `Tests 111 passed (111)`; `config` `Tests 46 passed (46)`; `setup` `Tests 17 passed (17)`; `guides` `Tests 33 passed (33)` |

`npm test` runs each project as its own `vitest` invocation, so the per-project readings in that row
are the readings of `test:src`, `test:policy`, `test:config`, `test:setup`, and `test:guides`.

The `guides` run settles the question fix round 1 left open. `tests/guides.test.ts:366-383` calls
`msg.attachment(0)` on `tests/src/core/fixtures/test.msg` and asserts `typeof first.name === 'string'`
and `first.bytes instanceof Uint8Array`. A fixture with no attachment throws `MSGError('RANGE')`
there, so the passing run is the evidence that the fixture carries one.

`format:check` was red at the baseline on `src/core/shapers.ts`, `src/core/validators.ts`, and
`tests/src/core/MSG.test.ts` — the standing condition the brief names. The converge step
(`npm run lint`, then `npm run format`) cleared it before the acceptance gates ran, in the round that
landed the working-tree half.

**Observation, not a criterion.** Every reading in this section was taken by this unit inside its own
exec. The Orchestrator takes the deciding whole-suite run after the unit exits.

## Breaking

Every renamed or removed symbol in the following table reaches consumers through the barrel. No
fleet package under `/home/user/fleet/` imports `@orkestrel/msg`, so no consumer edit is owed.

Evidence for that claim, run from `/home/user/fleet`:

```text
$ grep -rl '@orkestrel/msg' */package.json */src */app */tests 2>/dev/null | sort
msg/package.json
msg/tests/guides.test.ts
msg/tests/setupServer.test.ts
```

Each path is inside this package: its own `name` field, the `MODULES` specifier map the parity suite
resolves fence imports against, and the `setupServer` proof's assertion on the manifest's text. No
sibling checkout's manifest, `src`, `app`, or `tests` tree names the package. The search covered
exactly those paths; it did not cover `node_modules` or any checkout outside `/home/user/fleet/`.
The objective lane re-ran the same question over the whole `/home/user/fleet` tree with every file
type and reported the same answer, finding only the `.claude/agents/orkestrel.md` catalog rows,
which are not imports.

| Symbol                                | Change                                                      | Consumers | Consumer edit                                          |
| ------------------------------------- | ----------------------------------------------------------- | --------- | ---------------------------------------------------- |
| `MSGAttachment.fileName`              | renamed to `name`                                           | none      | read `attachment.name`                                |
| `MSGAttachment.content`               | renamed to `bytes`                                          | none      | read `attachment.bytes`                               |
| `EmailAttachment.size`                | removed; derive it                                          | none      | read `attachment.bytes.length`                        |
| `removeTrailingNull`                  | renamed to `truncateAtNull`                                 | none      | import `truncateAtNull`                               |
| `readANSIString(data, encoding?)`     | renamed to `decodeText(bytes, encoding?)`                   | none      | import `decodeText`; the argument order is unchanged  |
| `msftUUIDStringify(data, offset)`     | renamed to `readMicrosoftUUID(bytes, offset)`               | none      | import `readMicrosoftUUID`                            |
| `sectorsNeeded`                       | renamed to `computeSectors`                                 | none      | import `computeSectors`                               |
| `MSG_S_BIG_BLOCK_SIZE`                | renamed to `MSG_SECTOR_SIZE`                                | none      | import `MSG_SECTOR_SIZE`                              |
| `MSG_SMALL_BLOCK_SIZE`                | renamed to `MSG_MINI_SECTOR_SIZE`                           | none      | import `MSG_MINI_SECTOR_SIZE`                         |
| `MSG_BIG_BLOCK_MIN_DOC_SIZE`          | renamed to `MSG_MINI_STREAM_CUTOFF`                         | none      | import `MSG_MINI_STREAM_CUTOFF`                       |
| `MSG_PROPERTY_SIZE`                   | renamed to `MSG_DIRECTORY_ENTRY_SIZE`                       | none      | import `MSG_DIRECTORY_ENTRY_SIZE`                     |
| `MSG_BURNER_SECTOR_SIZE`              | removed as a duplicate of the 512-byte sector fact          | none      | import `MSG_SECTOR_SIZE`                              |
| `MSG_BURNER_MINI_SECTOR_SIZE`         | removed as a duplicate of the 64-byte mini-sector fact      | none      | import `MSG_MINI_SECTOR_SIZE`                         |
| `MSG_BURNER_MINI_STREAM_CUTOFF`       | removed as a duplicate of the mini-stream cutoff fact       | none      | import `MSG_MINI_STREAM_CUTOFF`                       |
| `MSG_BURNER_DIR_ENTRY_SIZE`           | removed as a duplicate of the 128-byte directory-entry fact | none      | import `MSG_DIRECTORY_ENTRY_SIZE`                     |
| `MSG_FILE_HEADER`                     | `Uint8Array` → frozen `readonly number[]`                   | none      | index reads and `.length` are unchanged; a consumer passing it to `Uint8Array.prototype.set` is unchanged, because that parameter is `ArrayLike<number>`. A consumer calling a `Uint8Array` method on it (`subarray`, `set`, `buffer`) reads `new Uint8Array(MSG_FILE_HEADER)` first. |
| `MSG_BURNER_ROOT_CLSID`               | `Uint8Array` → frozen `readonly number[]`                   | none      | as for `MSG_FILE_HEADER`                              |
| `MSGMutableFieldData` index signature | made `readonly`                                             | none      | write through `Object.assign(fields, { [key]: value })` |

The package's own version reads `0.0.8` and was not touched; the `version` field is off-limits.

## Shared-file patches

None. Every edit landed inside Owned, and no shared or off-limits file needs one.

## Deviations

No row stopped. Fix round 2 changed `src/core/types.ts` and `guides/msg.md` to close F1. Fix round 3
changed `src/core/constants.ts`, `guides/msg.md`, and `tests/guides.test.ts` to close F-2 and F-3,
and changed no other file in the package.

**F-2's prescribed probe did not redden, and the close is a decision, not a transcription.** The
ruling directed that with the context removed from the fence again, `npm run test:guides` must fail
on the transcription's assertion.

- Expected: a failing `guides` project with the fence stripped.
- Found: `Tests 33 passed (33)`, exit 0, with the fence stripped. Nothing in the `guides` project
  read the Errors fence's body, so the fence and its transcription could diverge in either direction
  without a gate noticing — which is F-2's own finding, measured from the other side. That capture
  was overwritten by the re-run carrying the guard, so this bullet is where the pre-guard reading
  survives.
- Decision: closed inside Owned rather than stopped, because `tests/guides.test.ts` is an Owned file
  and `.claude/rules/documentation.md` § Parity sanctions the shape — "keep the substring check only
  as a presence guard beside it". The Errors-fence case keeps its executed assertion and gains a
  guard asserting that `guides/msg.md` carries the exact call the case runs. Re-running the same
  probe with the guard in place reddens exactly
  `flagship fences > dispatches the Errors fence on the code and reads the context back`.

**Same-class sites F-3's bound places out of reach.** F-3 states that `MSG_L_BIG_BLOCK_SIZE` and
`MSG_L_BIG_BLOCK_MARK` stay untouched because touching them reaches into the successor row this
report already defers. The fix-round-3 sweep returned them and their neighbours, recorded here for
that row rather than changed:

- `src/core/constants.ts:39` — `MSG_L_BIG_BLOCK_MARK`'s doc block reads "Holds the large sector size
  mark in the header (byte at offset 30)." while its guide row at `guides/msg.md:81` reads "the
  header sector-shift value selecting `MSG_L_BIG_BLOCK_SIZE`". That is the same pairing F-3 closed
  for the small mark, on the constant its bound excludes.
- `src/core/MSG.ts:449`, `:699`, `:704` — "Small Block Allocation Table" in an internal comment and
  "Small block" in two error messages. The CFB specification uses that wording, and these sit in no
  row's site list, so they belong to the vocabulary ruling this report defers.

**Shell discipline.** The readings a reviewer can check against the record:

- The first probe run of fix round 3 was issued as `cd /home/user/fleet/msg && npm run test:guides`,
  which the dispatch's shell discipline forbids. Every later command runs as one plain
  `npm --prefix /home/user/fleet/msg run <script>` or `git -C /home/user/fleet/msg …`. The run
  changed no file; its capture was overwritten by the re-run that carries the presence guard.
- `/home/user/work/evidence/conform-msg.diff` and `/home/user/work/evidence/conform-msg.status` are
  written by a single `>` redirect, which is the only mechanism that produces them faithfully. The
  dispatch permits that redirect for a file the brief names, and § Method of the fix-round-3 brief
  names each of these.

**Same-class findings outside every row's site list.** These sit outside the unit's enumerated
scope, so this unit records them for the next matrix rather than reopening it, per
`.claude/rules/quality.md` § Evidence before change and `AGENTS.md` § TTTDD.

Against msg-subj-13, whose repair the refuter fixed as "apply as written" over an explicit site list
that carries none of them:

- `src/core/helpers.ts:517` — `Derives the EmailFormat from a file name and/or MIME type.` carries `and/or`, which `.claude/rules/writing.md` § Substitutions replaces with `and`, `or`, or `both`.
- `guides/msg.md:180` — the `detectFormat` row repeats the same `and/or`.
- `tests/setup.ts:41` — `returned as bytes via {@link asciiBytes}.` carries `via` in the `buildEml` doc block, which is a different block from the file header msg-obj-4 and msg-subj-14 rewrite.
- `tests/src/core/MSG.test.ts:251` — the case title `reads the embedded .msg binary content as a valid CFB file via attachment()` carries `via`.
- `tests/src/core/helpers.test.ts:109` — the case title `round-trips a 4-byte sequence (an emoji via surrogate pair)` carries `via`.
- `tests/src/core/helpers.test.ts:290` — the comment `derived in-test via BigInt so it can never drift` carries `via`.

Against msg-subj-7, whose site list names `src` files only:

- `tests/src/core/helpers.test.ts:268`, `:272`, `:276`, `:280` — the local binding `const data` holds the UUID byte array the `readMicrosoftUUID` cases read. `data` is in the rejected-word class `.claude/rules/names.md` § Rejected naming names. Fix round 2's widened sweep returned it; msg-subj-7's site list carries no test file, so renaming it here would rescope the unit.

Against msg-obj-9, whose repair names `src/core/types.ts:92` and `src/core/MSG.ts:1128-1130`:

- `src/core/MSG.ts:770-802` — the private parameter binding `mutable` and its `//` comments describe the accumulator as mutable. F1's bound states that nothing else msg-obj-9 touched is wrong, and these are private names rather than a published claim, so they stay. Record them against the ruling on the internal-but-published types that msg-obj-9 reserves to the Orchestrator.

**Vocabulary left open by msg-subj-8, for the next matrix.** msg-subj-8 renamed the sector-size
constant to `MSG_SECTOR_SIZE`, and its siblings keep the retired vocabulary:
`MSG_S_BIG_BLOCK_MARK` at `src/core/constants.ts:31`, `MSG_L_BIG_BLOCK_SIZE` at `:36`, and
`MSG_L_BIG_BLOCK_MARK` at `:41`. The guide carries the mismatch into adjacent rows:
`guides/msg.md:79` reads "`9` — the header sector-shift value selecting `MSG_SECTOR_SIZE`" under the
name `MSG_S_BIG_BLOCK_MARK`. One concept therefore reaches a consumer under the `SECTOR` name and
the `BIG_BLOCK` name in adjacent rows. msg-subj-8's site list names none of those constants, so this
is a successor row rather than a reopening. The objective lane raised the same point as R1 in fix
round 1 and referred it rather than ruling on it.

**Ancillary decisions, recorded and carried on from.**

- `tests/src/core/shapers.test.ts:25` carried `via` inside the same comment block msg-subj-14 required rewriting, so it was replaced with `through` in that rewrite rather than left as a banned term in prose this unit had already edited. No other prose outside a row's named site was changed.
- F1's replacement guide row is written to the Surface table's existing column width, so the row lands without repadding every other row of that table. The dispatch left the wording to the unit; the finding fixed only what the sentence must stop claiming.
- The evidence pair is now `conform-msg.checkpoint.diff` plus `conform-msg.diff`, the shape the campaign's other killed-and-resumed units use. That is the unit's answer to the checker's referral, and it is a change of artifact scoping rather than of the tree.

**Further observations, none of them a deviation.**

- `tests/guides.test.ts`'s original header stated a count of the package's own constants, which `AGENTS.md` § Writing bans. msg-obj-1 rewrites that header, so the sentence names the constants instead.
- The `setup` project's include (`tests/setup*.test.ts`) collects `tests/setupServer.test.ts` with no configuration change, and `tests/config.test.ts` requires `./tests/setupServer.ts` in `setupFiles` only for `src/server`, `src/bin`, and `app/server` projects, none of which this package has. The `config` project reads `Tests 46 passed (46)`, confirming the row's reading.
- The unit's shell discipline forbids reading files through the shell. `head` and `grep` were run against the evidence artifacts before that constraint was re-read; they changed nothing, and every later read went through the file-reading tools.
