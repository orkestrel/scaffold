# Unit A2-fix report

## Touched files

Stopped before source or test edits because F10 requires changing an assertion excluded by the brief's ownership restriction. Wrote this report to `tmp/units/a2-fix-report.md`.

The `git diff --stat` command returned no output. The `git status --porcelain` command returned no entries. Git warned that it could not access `C:\Users\mikes/.config/git/ignore` because permission was denied.

## Red then green

No repair ran. The required evidence remains uncollected:

| Finding | Exact repair command | Failing count | Passing count |
| --- | --- | --- | --- |
| F10 | Not run; scope conflict | Not measured | Not measured |
| F11 | Not run | Not measured | Not measured |
| F12 | Not run | Not measured | Not measured |
| F13 | Not run | Not measured | Not measured |
| F14 | Not run | Not measured | Not measured |
| F15 | Not run | Not measured | Not measured |
| F16 | Not run | Not measured | Not measured |
| F18 | Not run | Not measured | Not measured |

## Prose

F17 and F19: no doc blocks changed.

## Scoped validation

The conflicting baseline test passed with this exact command:

```powershell
npm.cmd run test:src:core -- tests/src/core/AgentProvider.test.ts -t "bounds the error-body read and cancels its remainder"
```

Result: exit 0; 1 file passed; 1 test passed, 0 failed, and 47 skipped by the name filter. This run confirms the existing assertion; it does not prove a repair. The required full gates were not run.

## Observations

The `git log -1 --oneline` command confirmed the starting commit:

```text
0fa4090 refactor: name the base's test blocks, carry a raced failure as the abort cause
```

The targeted Vitest worker ran successfully. No install, build, mutating lint or format command, commit, credential read, or delegation occurred.

## Deviation

**Expected:** F10 removes the extra read after exhausting the byte budget, and the full core suite stays green within Owned.

**Found:** the existing assertion at `tests/src/core/AgentProvider.test.ts:280` requires that extra read:

```ts
expect(body.bytes).toBe(MAX_ERROR_BODY_LENGTH + 512)
```

The fixture supplies 512-byte chunks. Its real readable stream uses a zero high-water mark in `tests/setup.ts`, so each additional delivered chunk requires another read. F10 stops after 2048 bytes; this assertion requires 2560 bytes. The baseline command confirms that the assertion passes before repair.

The brief restricts edits to that test file to “the exact-bound stall case, the F16 empty-excerpt case, and any existing assertion F16's template makes false, only.” F10, rather than F16, makes this byte assertion false. Changing it therefore exceeds the stated ownership boundary. Retaining the extra read would violate F10.

**Done or not done:** stopped before implementation under the brief's deviation contract. The unit is not complete.

**Hypothesis:** the ownership list omitted the existing F9 byte-count assertion in the base-provider test. Permit changing that assertion to `expect(body.bytes).toBe(MAX_ERROR_BODY_LENGTH)` so F10 and the full-suite acceptance criterion can hold together.

## Status

Stopped on an ownership conflict. Resume after the brief permits the F10 byte-count assertion change.
