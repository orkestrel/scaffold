<!-- U14-scaffold — builder (Sonnet, native), rename of the setup helper the `surface` rule fired on. Retained from the completion notification, 2026-09-15 (139 s, 28 tool uses). -->

## Changes

- `tests/setupServer.ts` — imported `captureError` from `@orkestrel/test`; renamed `readErrorCode` (:1083) to `captureScaffoldCode`, rebuilt on `captureError`; updated the `{@link readErrorCode}` reference in `readRejectionCode`'s TSDoc (:2698) to `{@link captureScaffoldCode}`.
- `tests/setupServer.test.ts` — renamed every caller (`readErrorCode` → `captureScaffoldCode`) at the import and at :412, :424, :433.
- `tests/src/server/helpers.test.ts` — renamed the import and every call site (46 occurrences); reformatted with `oxfmt` to resort the import block after the rename.

Old declaration (`tests/setupServer.ts:1083`, before):

```ts
export function readErrorCode(call: () => unknown): ScaffoldErrorCode | undefined {
	try {
		call()
		return undefined
	} catch (error) {
		return isScaffoldError(error) ? error.code : undefined
	}
}
```

New declaration (`tests/setupServer.ts:1083`):

```ts
export function captureScaffoldCode(call: () => unknown): ScaffoldErrorCode | undefined {
	const error = captureError(call)
	return isScaffoldError(error) ? error.code : undefined
}
```

Callers edited: `tests/setupServer.test.ts:68,412,424,433`; `tests/src/server/helpers.test.ts:92` (import) and every call site through :2342 (46 occurrences).

## Scoped validation

- `git diff --stat -- tests/setupServer.ts tests/setupServer.test.ts tests/src/server/helpers.test.ts`: `3 files changed, 207 insertions(+), 94 deletions(-)` — the bulk of `tests/setupServer.ts`'s diff is pre-existing dirty-tree content from prior accepted units (D4-1b/D4-2b/D4-3); my edits there are the import line, the function body, and one `{@link}` line.
- `npm run test:policy`: `Test Files 1 passed (1)`, `Tests 102 passed (102)` — the D4-3 `surface` violation is gone; 101 passed/1 failed at launch, now 102/0.
- `npm run test:setup -- tests/setupServer.test.ts --testNamePattern 'code'`: `4 passed | 60 skipped (64)` — the four renamed-caller tests pass.
- `npm run test:setup -- tests/setupServer.test.ts` (full file): `1 failed | 61 passed | 2 skipped (64)` — the one failure (`readHostFloor ... guides/scaffold.md`) is pre-existing dirty-tree state from other in-flight units (`guides/scaffold.md`, `src/server/helpers.ts`, etc. all show `M` in `git status` before this unit touched anything), unrelated to the rename.
- `npm run test:src:server -- tests/src/server/helpers.test.ts`: `1 failed | 199 passed | 3 skipped (203)` — same pre-existing failure (`readHostFloor` / `guides/scaffold.md`), not one of the renamed-call tests; all 46 `captureScaffoldCode` call sites are inside the 199 passing.
- `npx oxlint --config .oxlintrc.json --deny-warnings tests/setupServer.ts tests/setupServer.test.ts tests/src/server/helpers.test.ts`: exit 0.
- `npx oxfmt --config .oxfmtrc.json --check tests/setupServer.ts tests/setupServer.test.ts tests/src/server/helpers.test.ts`: `All matched files use the correct format.`
- Collision check: `grep -n "captureScaffoldCode" node_modules/@orkestrel/*/dist/src/*/index.d.ts` — empty, exit 1.
- `grep -n "readErrorCode" tests/setupServer.test.ts tests/src/server/helpers.test.ts` — no matches remain.

## Deviation state

`npm run test:policy`, `lint:check`, and `format:check` on the owned files are green per acceptance criteria. The one Vitest failure surfacing in both broader scoped runs (`readHostFloor` against `guides/scaffold.md`) predates this unit — it is caused by other accepted units' uncommitted changes to `guides/scaffold.md` and `src/server/helpers.ts` already present in the checkout at launch, not by this rename. No deviation on the owned scope.

Orchestrator note: the `readHostFloor` failure the unit reports is read against the built `dist/host` (the unit ran no build); the authoritative reading is the `gates3.sh scaffold after-u14` run, which builds first.
