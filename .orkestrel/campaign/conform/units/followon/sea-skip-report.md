# Unit sea-skip — report

The applicability limit is now its own code, `ROOM`, raised where the injector measures the host
binary's layout and nowhere else. The stage-hooks proof skips only on `ROOM`; a defect the injector
reports as `INJECT` now fails it. Every gate exits 0 and the audit prints zero drift.

## The code chosen

`ROOM`, added beside `INJECT` in `SEAErrorCode`.

The doc list in `src/server/types.ts` is single uppercase words naming what failed — `PLATFORM`,
`ENTRY`, `FORMAT`, `INJECT`, `FUSE`. `ROOM` names what the host binary lacks, which is the fact a
caller branches on, and it is the word the PE message already uses ("No room in PE header for a new
section entry"). `SPACE` reads against `address space` in a binary-format domain. `LAYOUT` names the
cause rather than the limit, so it would not tell a caller what to do about it. The refused option
from the brief stands refused: keying the skip on `context` fields leaves a consumer deciding whether
to retry on another host with no contract to read.

The doc line reads `` `ROOM`     — host binary layout with no room for the injection. ``, matching
the noun-phrase form of its siblings.

## Rows

### Types

`src/server/types.ts:353` carries the doc line and `:370` the union member, each placed after
`INJECT` so the doc list's order and the union's order still agree.

`npm --prefix /home/user/fleet/sea run check` exited 0 with the union widened and the raise sites
untouched, confirming a string-literal union widens without breaking its existing raise sites:
`/home/user/work/evidence/sea-skip-proofs/row1-check-after-union.txt`.

### Raise sites

`src/server/injectors/Injector.ts:282` — the PE header-room site, message and `context`
(`executable`, `availableHeaderSpace`, `requiredHeaderSpace`) unchanged.

`src/server/injectors/Injector.ts:1376` — the Mach-O load-command site, message and `context`
(`executable`, `firstSectionOffset`, `requiredOffset`) unchanged.

No other site changed. The remaining `'INJECT'` raises in `Injector.ts` — `:847`, `:1026`, `:1229`,
`:1325`, `:1332`, `:1402`, `:1465`, `:1636` — are injector defect reports and keep their code.

### Proof of the raise

`tests/src/server/injectors/Injector.test.ts:296` proves the Mach-O site. It reads the expected
`firstSectionOffset` back out of the fixture with `findMachoSection`, rather than restating the
fixture's literal, and asserts `requiredOffset` exceeds it.

`tests/src/server/injectors/Injector.test.ts:465` proves the PE site. It asserts
`requiredHeaderSpace` equals `PE_SECTION_HEADER_SIZE` and `availableHeaderSpace` falls short of it.

The PE fixture needed a tight layout, which `buildPeFixture` did not offer. `tests/setupServer.ts`
gains a `tight` option (`:115`) that pads the section table with `.pad*` uninitialized-data headers
carrying `PointerToRawData` 0 (`:296`), so the first section's file offset stays put while the gap
before it shrinks below one entry. The filler count is derived from the layout (`:200`), never
hardcoded, so the fixture stays tight if the header geometry moves.

Command, run in `/home/user/fleet/sea`:

```
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/injectors/Injector.test.ts
```

- Red, before the raise sites changed: exit 1, `Tests 2 failed | 15 passed (17)`, each failure
  `AssertionError: expected 'INJECT' to be 'ROOM'`.
  `/home/user/work/evidence/sea-skip-proofs/row3-red-applicability.txt`
- Green, after: exit 0, `Tests 17 passed (17)`.
  `/home/user/work/evidence/sea-skip-proofs/row3-green-applicability.txt`

The red reading also proves the PE fixture reaches the applicability site rather than failing
earlier: it failed on the code comparison, not on parsing.

### The skip

`tests/integration.test.ts:204` reads `error.code === 'ROOM'`. The comment at `:167` names the code,
names the layouts that produce it, and states that every other injector failure — `INJECT`
included — fails the test.

The planted control was a copy of `#verifyELFNoteMapping`'s own `INJECT` throw, placed at the head
of that method so it fired on every ELF injection. Command, run in `/home/user/fleet/sea`:

```
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project integration tests/integration.test.ts
```

- Before planting: exit 0, `Tests 4 passed (4)` — the host binary has room, so the proof runs rather
  than skips. `/home/user/work/evidence/sea-skip-proofs/row4-integration-unplanted.txt`
- Planted: exit 1, `Tests 2 failed | 2 passed (4)`, with
  `FAIL |integration| tests/integration.test.ts > sea integration > supports stage hooks through the on option`
  and `SEAError: Injected ELF note is not reachable via a mapped PT_LOAD segment at runtime`. The
  proof reads red, not skipped. `/home/user/work/evidence/sea-skip-proofs/row4-integration-planted.txt`
- Restored by editing the planted throw out: exit 0, `Tests 4 passed (4)`.
  `/home/user/work/evidence/sea-skip-proofs/row4-integration-restored.txt`

The source diff confirms the plant left nothing behind: `src/server/injectors/Injector.ts` differs
from the baseline at `:282` and `:1376` only.

### Guide

`guides/sea.md:36` adds a paragraph after the error-surface sentence. It states what `ROOM` names,
which layouts raise it, that the measurements ride in `context`, and that every other injection
failure keeps the `INJECT` code, so you can retry a `ROOM` build on another host and read an
`INJECT` code as a defect.

The guide's tables list APIs rather than union members, and `SEAErrorCode` already has its Types
row, so no table row was owed. The behavioural claim in the added paragraph is the claim the PE
proof and the Mach-O proof execute, which is what `.claude/rules/documentation.md` § Parity requires
of a prose claim under no fence. No fence changed, so `tests/guides.test.ts` needed no transcription
change and was not edited.

`npm --prefix /home/user/fleet/sea run test:guides` exited 0, `Tests 34 passed (34)`:
`/home/user/work/evidence/sea-skip-proofs/row5-guides.txt`.

### Breaking

`SEAErrorCode` widens. Widening a published union breaks an exhaustive switch over it in a consumer.

Consumer sweep, run over the fleet:

- `grep -rn "SEAErrorCode" /home/user/fleet --include=*.ts --exclude-dir=node_modules` — hits in
  `sea/src/server/{types,errors,helpers}.ts` and in `sea/dist/src/server/index.d.ts`, which is build
  output. No hit outside `sea`.
- `grep -rn "isSEAError\|SEAError\|@orkestrel/sea" /home/user/fleet --include=*.ts --exclude-dir=node_modules --exclude-dir=dist -l`
  — every file listed is inside `/home/user/fleet/sea`.
- `grep -rn "INJECT" /home/user/fleet --include=*.ts --exclude-dir=node_modules --exclude-dir=dist`
  — outside `sea`, every hit is prose using the words `INJECTED`, `INJECTION`, or `INJECTIVE` in
  `contract`, `reason`, `rater`, `workflow`, and `mcp`. None is a `SEAErrorCode` value.

No fleet checkout narrows `SEAErrorCode`, so no exhaustive switch breaks and no consumer needed
updating. The widening reaches a published consumer only outside this fleet.

### Sweeps

- `grep -rn "'INJECT'" /home/user/fleet/sea/tests/integration.test.ts` — empty. The file's only
  remaining `INJECT` is at `:172`, in the comment naming what does not skip.
- `grep -rn "ROOM" /home/user/fleet/sea/src /home/user/fleet/sea/tests /home/user/fleet/sea/guides`
  — `Injector.ts:282`, `Injector.ts:1376`, `types.ts:353`, `types.ts:370`,
  `Injector.test.ts:296`, `:315`, `:465`, `:480`, `integration.test.ts:171`, `:204`, `sea.md:36`.
  The raise sites, the proofs, the skip and its comment, the type and its doc line, and the guide
  paragraph — nothing else.
- Writing sweep, `.claude/rules/writing.md` § Substitutions run case-insensitively over the added
  lines. Pattern:
  `should|simply|easy|easier|just|currently|now|latest|utilize|leverage|via|in order to|e.g.|i.e.|etc.|performant|robust|allows you to|and/or|since|once|please|sanity|dummy|blacklist|whitelist|master|slave|above|below`
  over `git -C /home/user/fleet/sea diff -U0` — no hit.
  A separate `new` sweep over the same diff returned the `new` operator in
  `new Injector(...)`, exempt as a code identifier, and "the new load command" in the Mach-O proof's
  name, which names the load command being added rather than dating anything, so it is a permitted
  sense. Paths swept: the diff over `guides/sea.md`, `src/server/injectors/Injector.ts`,
  `src/server/types.ts`, `tests/integration.test.ts`, `tests/setupServer.ts`, and
  `tests/src/server/injectors/Injector.test.ts`.

## Gates

Each ran as one plain command; each exited 0. Captures under
`/home/user/work/evidence/sea-skip-proofs/`.

| Gate                                              | Exit | Reading                                                    | Capture                    |
| ------------------------------------------------- | ---- | ---------------------------------------------------------- | -------------------------- |
| `npm --prefix /home/user/fleet/sea run format:check` | 0 | `All matched files use the correct format.` on 52 files    | `gate1-format-check.txt`   |
| `npm --prefix /home/user/fleet/sea run lint:check`   | 0 | no diagnostic output                                        | `gate2-lint-check.txt`     |
| `npm --prefix /home/user/fleet/sea run check`        | 0 | root project and `configs/src/tsconfig.server.json` clean   | `gate3-check.txt`          |
| `npm --prefix /home/user/fleet/sea run build`        | 0 | `built in 2.97s`, declaration copied to `index.d.cts`       | `gate4-build.txt`          |
| `npm --prefix /home/user/fleet/sea test`             | 0 | `src:server` 188 passed, `policy` 111, `config` 46, `setup` 21, `guides` 34, `integration` 4; no `FAIL` line | `gate5-test.txt` |

Audit, `cd /home/user/fleet/sea && npx scaffold audit --offline`, exit 0, final line:

```
0 of 36 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 8.
```

Capture: `gate6-audit.txt`.

`node /home/user/scaffold/tmp/work/evidence.mjs sea` exited 0 and wrote
`/home/user/work/evidence/conform-sea.diff` (249 lines) and
`/home/user/work/evidence/conform-sea.status` (6 entries). Capture: `gate7-evidence.txt`.

`git -C /home/user/fleet/sea status --short` lists only Owned paths:

```
 M guides/sea.md
 M src/server/injectors/Injector.ts
 M src/server/types.ts
 M tests/integration.test.ts
 M tests/setupServer.ts
 M tests/src/server/injectors/Injector.test.ts
```

## Touched files

| File                                         | Change                                                                             |
| -------------------------------------------- | ---------------------------------------------------------------------------------- |
| `src/server/types.ts`                        | `ROOM` added to `SEAErrorCode` and to its doc list, beside `INJECT`.               |
| `src/server/injectors/Injector.ts`           | The PE header-room raise and the Mach-O load-command raise carry `ROOM`.           |
| `tests/setupServer.ts`                       | `buildPeFixture` gains the `tight` option that pads the section table flush.       |
| `tests/src/server/injectors/Injector.test.ts` | The Mach-O applicability proof asserts `ROOM` and its context; a PE proof is added. |
| `tests/integration.test.ts`                  | The stage-hooks skip keys on `ROOM`; its comment names the code and what fails.    |
| `guides/sea.md`                              | A paragraph documenting `ROOM` against `INJECT`.                                    |

```
 guides/sea.md                               |  2 ++
 src/server/injectors/Injector.ts            |  4 +--
 src/server/types.ts                         |  2 ++
 tests/integration.test.ts                   | 11 +++----
 tests/setupServer.ts                        | 36 ++++++++++++++++++++--
 tests/src/server/injectors/Injector.test.ts | 46 ++++++++++++++++++++++++++---
 6 files changed, 88 insertions(+), 13 deletions(-)
```

## Finding outside this unit's scope

`MachoFixtureOptions.tightHeaders` in `tests/setupServer.ts:713` is a compound options key, which
`.claude/rules/patterns.md` § Options refuses. The PE option this unit adds is named `tight` because
the law binds the code being written. Renaming the Mach-O key to `tight` would make the fixture
vocabulary uniform, and it cannot land here: `tests/setupServer.test.ts:354` reads that key and is
off-limits to this unit, so a rename confined to Owned files would leave the `setup` project red.

The successor unit owns `tests/setupServer.ts`, `tests/src/server/injectors/Injector.test.ts`, and
`tests/setupServer.test.ts`, and the edit is mechanical:

- `tests/setupServer.ts:713` — `readonly tightHeaders?: boolean` becomes `readonly tight?: boolean`,
  keeping the doc comment.
- `tests/setupServer.ts:723` — `options?.tightHeaders` becomes `options?.tight`.
- `tests/src/server/injectors/Injector.test.ts:301` — `const fixture = buildMachoFixture({ tightHeaders: true })`
  becomes `const fixture = buildMachoFixture({ tight: true })`.
- `tests/setupServer.test.ts:354` — `buildMachoFixture({ tightHeaders: true })` becomes
  `buildMachoFixture({ tight: true })`.

## Deviation state

No deviation. Every row closed as written. The existing fixtures reached the Mach-O site unchanged,
the PE site needed only an option on `buildPeFixture` inside Owned, no fleet consumer switches on
`SEAErrorCode`, and no gate reddened on anything the rows did not touch.

## Fix round 1

Every host layout the injector cannot write into now reports `ROOM`. The Mach-O with no
`__LINKEDIT` segment and the `__LINKEDIT` segment carrying sections join the PE header-slack site
and the Mach-O load-command site under that code, each with a proof that read red against `INJECT`
before the raise sites changed and green after. `INJECT` keeps the `overwrite` refusals, the
malformed resource directory, and the injector's reports against its own completed write. The
Mach-O fixture's options are single words naming the fact.

### F1 — the guide's trailing clause was false

Closed by the raise sites and the rewritten paragraph together.

`src/server/injectors/Injector.ts:1332` (`'Mach-O binary has no __LINKEDIT segment'`) and `:1402`
(`'__LINKEDIT segment with sections is not supported'`) raise `ROOM`. Only the code string changed;
each message and each `context` record is the one that stood before. Every Mach-O output write
happens at `:1484` and later, so all four `ROOM` sites refuse before a byte reaches the output.

`src/server/types.ts:353` widens to name the limit rather than the room alone, wrapped at the
formatter's 100-column width with the continuation indented to the text column, so the em-dash
column its siblings use is unchanged:

```
 * `ROOM`     — host binary layout the injector cannot write into: no room for the
 *             entry, or a `__LINKEDIT` layout it does not support.
```

`guides/sea.md:36` replaces the paragraph. It names each layout `ROOM` covers — the PE header
slack, the Mach-O load-command room, the missing `__LINKEDIT`, and the sectioned `__LINKEDIT` —
states that `availableHeaderSpace` against `requiredHeaderSpace` and `firstSectionOffset` against
`requiredOffset` ride in `context` where the injector takes a measurement, states that the
`__LINKEDIT` cases carry the executable path alone, and states what `INJECT` keeps: an `overwrite`
refusal, a malformed resource directory, and a defect the injector reports against a write it
already made. The reader's action closes it: retry a `ROOM` build on another host, and read an
`INJECT` code against the options passed, the host binary's resource tree, or the injector.

`tests/integration.test.ts:166` names the same layouts in the skip's comment, because the widened
coverage changed what that comment stated.

### Proofs

`tests/setupServer.ts` gives `buildMachoFixture` a `linkedit` group holding `present` (boolean,
default `true`) and `sections` (number, default `0`). The naming decision was this unit's to settle:
`.claude/rules/names.md` § Entity-scoped names fixes a grouped key as the configured entity noun
with one-word leaves, and a top-level `sections` would not say which segment's sections it means,
while `present` reads as an assertion about the fixture the builder returns. `tight` stays
top-level, because it shapes the whole header layout rather than the `__LINKEDIT` command.

`sections` writes real entries rather than a bare count: the command grows by an 80-byte entry per
section, `nsects` declares them, and each entry's file offset sits inside `__LINKEDIT`'s own file
range, clear of the first section the ceiling check measures against. `present: false` drops the
command and keeps the file length, so `LC_SYMTAB` still points at real bytes and the only missing
thing is the command.

`tests/setupServer.test.ts` proves each option against raw header offsets: `drops the __LINKEDIT
segment command when the linkedit option omits it` reads `ncmds` and `sizeofcmds` back out of the
buffer and checks the table still sums to what the header declares, and `gives the __LINKEDIT
segment command the section entries the linkedit option asks for` checks the declared count, the
72-plus-80-byte command size the Mach-O format fixes, and that the entry resolves through
`findMachoSection` at the segment's own file offset.

`tests/src/server/injectors/Injector.test.ts:325` and `:347` are the raise-site proofs. Each asserts
the code, the message that pins which site refused it, and `executable` in `context`.

Commands and readings, captured under `/home/user/work/evidence/sea-skip-proofs/`:

- Fixture options, run before the raise sites changed, because they do not depend on them:
  `cd /home/user/fleet/sea && npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupServer.test.ts`
  — exit 0, `Tests 21 passed (21)`. `fix1-setup-fixture.txt`
- Red, before the raise sites changed:
  `cd /home/user/fleet/sea && npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/injectors/Injector.test.ts`
  — exit 1, `Tests 2 failed | 17 passed (19)`, both failures `AssertionError: expected 'INJECT' to be 'ROOM'`, on
  `throws ROOM, not INJECT, when the host Mach-O carries no __LINKEDIT segment` and
  `throws ROOM, not INJECT, when the host __LINKEDIT segment carries sections`. Each failed on the
  code comparison rather than on parsing, so each fixture reached its raise site.
  `fix1-red-linkedit.txt`
- Green, after: the same command — exit 0, `Tests 19 passed (19)`. The message assertion runs in
  this reading, so each case is bound to its own site. `fix1-green-linkedit.txt`
- Guide: `npm --prefix /home/user/fleet/sea run test:guides` — exit 0, `Tests 34 passed (34)`.
  `fix1-guides.txt`

### Parity of the guide's `INJECT` sentence

The paragraph's `ROOM` claims are the claims the proofs execute: `Injector.test.ts:296`, `:325`,
`:347`, and `:508` assert the code and the `context` keys the sentence names.

The `INJECT` sentence carries no executed assertion, and closing it is recorded for a successor
rather than done here. The `overwrite` refusal at `Injector.ts:1026` and `:1325` is drivable through
the public API, but a case for it reads green before the raise-site change and green after, which
this round's proof condition refuses. `Injector.ts:847`, `:1228`, `:1465`, and `:1636` report
against the injector's own completed work, and no fixture reaches them through the public API.

Successor prescription, owning `tests/src/server/injectors/Injector.test.ts`: inject
`buildMachoFixture()` with the default options, inject the result again with `overwrite: false`, and
assert `error.code` is `'INJECT'` with `context` matching `{ executable, segmentName: 'NODE_SEA' }`
(`Injector.ts:1325`). That is the executed assertion the guide's `INJECT` sentence needs.

### F2 — the compound fixture key

`MachoFixtureOptions.tightHeaders` is `tight`, matching the PE fixture's key. The declaration, its
read in `buildMachoFixture`, and the call sites in `tests/src/server/injectors/Injector.test.ts` and
`tests/setupServer.test.ts` moved together.

`grep -rn "tightHeaders" /home/user/fleet/sea/src /home/user/fleet/sea/tests /home/user/fleet/sea/guides`
— empty.

### Sweeps

- `grep -n "'INJECT'" /home/user/fleet/sea/src/server/injectors/Injector.ts` — `:847`, `:1026`,
  `:1229` (the code argument of the raise opening at `:1228`), `:1325`, `:1465`, `:1636`. Every one
  is a defect report, an `overwrite` refusal, or the malformed resource directory.
- `grep -rn "\bROOM\b" /home/user/fleet/sea/src /home/user/fleet/sea/tests /home/user/fleet/sea/guides`
  — `Injector.ts:282`, `:1332`, `:1376`, `:1402`; `types.ts:353`, `:371`; `Injector.test.ts:296`,
  `:315`, `:325`, `:341`, `:347`, `:362`, `:508`, `:523`; `integration.test.ts:173`, `:206`;
  `sea.md:36`. The raise sites, the type and its doc line, the proofs, the skip and its comment, and
  the guide paragraph — nothing else.
- Writing sweep, `.claude/rules/writing.md` § Substitutions run case-insensitively over the added
  lines of `/home/user/work/evidence/conform-sea.diff`, which covers this unit's whole diff over
  `guides/sea.md`, `src/server/injectors/Injector.ts`, `src/server/types.ts`,
  `tests/integration.test.ts`, `tests/setupServer.test.ts`, `tests/setupServer.ts`, and
  `tests/src/server/injectors/Injector.test.ts`. Pattern:
  `^\+.*(should|simply|easy|easier|just|currently|now|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|performant|robust|allows you to|and/or|since|once|please|sanity|dummy|blacklist|whitelist|master|slave|above|below)`
  — no hit. A separate `^\+.*\bnew\b` sweep over the same file returned the `new` operator in
  `new SEAError(...)` and `new Injector(...)`, exempt as a code identifier, and "the new load
  command" in the PE-era test name, which names the load command being added rather than dating
  anything.

### Gates

Each ran as one plain command; each exited 0. Captures under
`/home/user/work/evidence/sea-skip-proofs/`.

| Gate                                                 | Exit | Reading                                                                                                     | Capture                       |
| ---------------------------------------------------- | ---- | ----------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `npm --prefix /home/user/fleet/sea run format:check` | 0    | `All matched files use the correct format.` on 52 files                                                     | `fix1-gate1-format-check.txt` |
| `npm --prefix /home/user/fleet/sea run lint:check`   | 0    | no diagnostic output                                                                                        | `fix1-gate2-lint-check.txt`   |
| `npm --prefix /home/user/fleet/sea run check`        | 0    | root project and `configs/src/tsconfig.server.json` clean                                                   | `fix1-gate3-check.txt`        |
| `npm --prefix /home/user/fleet/sea run build`        | 0    | declaration copied to `index.d.cts`                                                                         | `fix1-gate4-build.txt`        |
| `npm --prefix /home/user/fleet/sea test`             | 0    | `src:server` 190 passed, `policy` 111, `config` 46, `setup` 23, `guides` 34, `integration` 4; no `FAIL` line | `fix1-gate5-test.txt`         |

Audit, `cd /home/user/fleet/sea && npx scaffold audit --offline`, exit 0, final line:

```
0 of 36 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 8.
```

Capture: `fix1-gate6-audit.txt`. Its first line is the pre-existing `integration` seed note, which
this round did not touch.

`node /home/user/scaffold/tmp/work/evidence.mjs sea` exited 0 and rewrote
`/home/user/work/evidence/conform-sea.diff` (485 lines) and
`/home/user/work/evidence/conform-sea.status` (7 entries). Capture: `fix1-gate7-evidence.txt`.

`git -C /home/user/fleet/sea status --short` lists only Owned paths:

```
 M guides/sea.md
 M src/server/injectors/Injector.ts
 M src/server/types.ts
 M tests/integration.test.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/src/server/injectors/Injector.test.ts
```

### Touched files

| File                                          | Fix-round-1 change                                                                                  |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `src/server/types.ts`                         | The `ROOM` doc line names the layout limit rather than the room alone.                              |
| `src/server/injectors/Injector.ts`            | `:1332` and `:1402` raise `ROOM`; messages and `context` unchanged.                                 |
| `guides/sea.md`                               | The `ROOM` paragraph names each covered layout, the `context` measurements, and what `INJECT` keeps. |
| `tests/setupServer.ts`                        | `MachoFixtureOptions.tightHeaders` becomes `tight`; a `linkedit` group adds `present` and `sections`. |
| `tests/setupServer.test.ts`                   | Proofs for the `linkedit` options; the renamed key at its call site.                                |
| `tests/src/server/injectors/Injector.test.ts` | The missing-`__LINKEDIT` and sectioned-`__LINKEDIT` `ROOM` proofs; the renamed key at its call site. |
| `tests/integration.test.ts`                   | The skip's comment names the layouts `ROOM` covers.                                                  |

Cumulative diffstat against the landed tip `0c4a239`, covering this unit's original rows and this
fix round:

```
 guides/sea.md                               |   2 +
 src/server/injectors/Injector.ts            |   8 +-
 src/server/types.ts                         |   3 +
 tests/integration.test.ts                   |  13 ++--
 tests/setupServer.test.ts                   |  43 ++++++++++-
 tests/setupServer.ts                        | 114 +++++++++++++++++++++++-----
 tests/src/server/injectors/Injector.test.ts |  89 +++++++++++++++++++++-
 7 files changed, 237 insertions(+), 35 deletions(-)
```

### Deviation state

No deviation. The fixture reached `:1332` and `:1402` with option changes confined to Owned files,
no gate reddened on anything the rows did not touch, and every row closed as written. One item is
recorded for a successor rather than closed here: the executed assertion behind the guide's
`INJECT` sentence, prescribed in § Parity of the guide's `INJECT` sentence.
