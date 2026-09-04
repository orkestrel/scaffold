Each corrected pointer with the command that derived it and its reading:

- `grep -n "readonly count: number" src/core/types.ts` → `:403` (was `:404`)
- `grep -n "get count(): number" src/core/programs/ProgramManager.ts` → `:118` (was `:111`)
- `grep -n "Array overload first" src/core/programs/Program.ts src/core/programs/ProgramManager.ts` → `Program.ts:179`, `ProgramManager.ts:242` (were `:166`, `:235`)
- `grep -n "buildNoticeDeterminations\|buildLimitDeterminations" src/core/programs/Program.ts` → calls at `:342,360,433` (were `:329,347,420`)
- `grep -n "tallySubject" src/core/programs/Program.ts` → call at `:397` (was `:384`)
- `grep -n "writes every \`Status\` member" guides/program.md` → `:174`; `sed -n '533p'` confirms "listed later"; `grep -n "as the preceding example shows" guides/program.md` → `:932`. Corrected pointer set for program-subj-11: `guides/program.md:174,533,932`, member-naming sentence at `:174` (were `:171,533,553` with member sentence at `:176`)
- `grep -n "Set.prototype.size" tests/setup.test.ts` (via `expect(new Set(...).size)`) → `:479` (was `:477`)
- `grep -rnE "@throws" src | wc -l` → 44; `grep -rnE "@throws \{@link ProgramError\} Thrown when" src | wc -l` → 44; the two patterns match the same lines, so the row's stale finder claim is replaced

Regenerated diffstat fence (from `git -C /home/user/fleet/program diff HEAD --stat`, 19 files listed, `src/core/factories.ts` now included):

```text
 README.md                                      |  16 +-
 guides/README.md                               |   4 +-
 guides/program.md                              |  96 ++++---
 src/core/constants.ts                          |  11 +-
 src/core/errors.ts                             |   2 +-
 src/core/factories.ts                          |   5 +-
 src/core/helpers.ts                            |  93 ++++---
 src/core/programs/Program.ts                   | 164 +++++++++++-
 src/core/programs/ProgramManager.ts            | 203 ++++++++++++++-
 src/core/types.ts                              | 319 +++++++++++++++++++++--
 src/core/validators.ts                         |  16 +-
 tests/guides.test.ts                           | 102 +++++++-
 tests/setup.test.ts                            | 137 ++++++++--
 tests/setup.ts                                 | 340 +++++++++++++++++--------
 tests/src/core/factories.test.ts               |  90 +++----
 tests/src/core/helpers.test.ts                 | 334 ++++++++++--------------
 tests/src/core/programs/Program.test.ts        | 155 +++++------
 tests/src/core/programs/ProgramManager.test.ts | 174 +++++--------
 tests/src/core/validators.test.ts              |  10 +-
 19 files changed, 1529 insertions(+), 742 deletions(-)
```

Rewritten sweep row (program-subj-6, § Sweeps): "Every `@throws` row opens 'Thrown when': the two patterns match the same lines on the final tree."

Count sweep's result: `grep -noE '\b[0-9]+ (files|rows|tests|members|entries|paths)\b'` over the report returns three hits — the diffstat fence's own `19 files changed` summary line (stays, inside the command's own output) and, in the Fix round 2 section, "38 rows" and "40 rows", each stated beside the `grep` command that produced it (stays). The number-word sweep over `(one|two|…|ten|dozens|hundreds) (files|rows|tests|members|entries|paths|hits)` returns one hit, "two hits" in the `.size` § Sweeps row, stated beside its pattern in the adjacent column (stays). The status sentence at § Gates now reads "`git status --short` lists only paths under Owned" with no count, and § Files touched gained the `src/core/factories.ts` row.

`git -C /home/user/fleet/program status --short` unchanged from the incoming list:

```
 M README.md
 M guides/README.md
 M guides/program.md
 M src/core/constants.ts
 M src/core/errors.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/programs/Program.ts
 M src/core/programs/ProgramManager.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/src/core/factories.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/programs/Program.test.ts
 M tests/src/core/programs/ProgramManager.test.ts
 M tests/src/core/validators.test.ts
```
