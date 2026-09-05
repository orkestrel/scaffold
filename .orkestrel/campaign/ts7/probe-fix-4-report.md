# Unit ts7-probe-fix-4 — report

## Edits

1. `src/core/types.ts:231` — `Toolchain` doc block summary line reads "Names the version each tool's own installed manifest publishes in the target workspace."
2. `src/core/types.ts:248`, `:250`, `:252` — the `typescript`, `oxlint`, and `vitest` member TSDoc lines each read "Names the `<tool>` version that tool's own installed manifest publishes in the target workspace."
3. `src/core/validators.ts:198` — `isToolchain` TSDoc summary reads "Checks whether a value names every tool version the target workspace's installed manifests publish."
4. `guides/probe.md:110` (post-format), the `isToolchain` row — reads "Admits a record carrying every tool version the target workspace's installed manifests publish."; ran `npm run format` after the edit, which realigned every column in that table.
5. `guides/probe.md:454-458` (post-format) — the bullet now reads "probe resolves each of them from the target workspace, never from its own dependencies, and reports the version each tool's own installed manifest publishes on `Verdict.toolchain`.", rewrapped at word boundaries with every line at or under 100 columns.
6. `guides/probe.md:663-666` (post-format) — the bullet now reads "Each version is the one that tool's own installed manifest publishes in the target workspace,", rewrapped with every line at or under 100 columns.
7. `tests/setupServer.ts:193` — the `bridged` TSDoc line reads "A row passing `bridged` is gated with `it.runIf(DIRECTORY_LINKS)`, because the link is a directory link."
8. `tests/setupServer.test.ts:49-96` — split the gated row into two: an ungated `it('writes a version-only TypeScript 7 workspace and nothing beside it by default', ...)` carrying its own scratch, the `bare` fixture call, and the assertions through `expect(published).toStrictEqual({ version: '7.0.2' })`, with its own `finally { scratch.destroy() }`; and a gated `it.runIf(DIRECTORY_LINKS)('links the bridge and writes the tools beside the compiler a caller selects', ...)` carrying its own scratch, the `equipped` fixture call, and the assertions from `equipped).toBe(...)` through the `vitest` manifest check, with its own `finally`. Both rows keep their original inline comments beside the code they annotate.
9. Ran `npm run format` to converge before the gates.

## Gates

| Command | Exit code |
| --- | --- |
| `npm run format:check` | 0 |
| `npm run lint:check` | 0 |
| `npm run check` | 0 |
| `npm run build` | 0 |
| `npm run test:setup` | 0 (2 files, 11 tests passed) |
| `npm run test:guides` | 1 — the single failing test is `tests/guides.test.ts > guides fences > earns the receipt the guide documents`, red on `LSPError: The LSP request 'initialize' exceeded its deadline` (the named Oxlint `initialize`-deadline timing row); 12 of 13 tests passed |
| `npm run test:guides -- -t "earns the receipt the guide documents"` (re-run alone) | 1 — same test, same failure: `The LSP request 'initialize' exceeded its deadline`, on this host and at this run |
| `npm run test:policy` | 0 (111 tests passed) |

Per the brief's instruction for this named row, both readings are recorded above with no diagnosis attempted.

## `git status --short`

```
 M guides/probe.md
 M package-lock.json
 M package.json
 M src/core/types.ts
 M src/core/validators.ts
 M src/server/Probe.ts
 M src/server/helpers.ts
 M src/server/stages/TypeStage.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/src/core/errors.test.ts
 M tests/src/server/Probe.test.ts
 M tests/src/server/helpers.test.ts
 M tests/src/server/stages/TypeStage.test.ts
```

`package-lock.json`, `package.json`, `src/server/Probe.ts`, `src/server/helpers.ts`,
`src/server/stages/TypeStage.ts`, `tests/src/core/errors.test.ts`, `tests/src/server/Probe.test.ts`,
`tests/src/server/helpers.test.ts`, and `tests/src/server/stages/TypeStage.test.ts` are the earlier
units' uncommitted edits, kept as the brief requires. `src/core/validators.ts` is this unit's edit.
Every other file this unit touched (`guides/probe.md`, `src/core/types.ts`,
`tests/setupServer.test.ts`, `tests/setupServer.ts`) was already listed as modified by an earlier
unit.

## Deviations

None against the primary objective. `npm run test:guides` reds on the named timing row on both the
full run and the alone re-run, which the brief anticipated and instructed be recorded rather than
diagnosed.
