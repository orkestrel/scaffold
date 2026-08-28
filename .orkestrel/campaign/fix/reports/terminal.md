# Fix report: terminal

## Dispositions

- **s12-48** deferred_breaking: Deferred whole. Making `KeyEvent.name` optional is a non-additive change to the published return type of `parseKey`, and the `name: ''` sentinel is the documented intended behaviour, pinned by tests/src/core/helpers.test.ts:113-114 and stated in guides/terminal.md:35,155,589 — so it is not a behaviour correction the package's own documents already require.
- **s12-49** applied (src/core/types.ts, src/core/helpers.ts, guides/terminal.md): Declared `InputState`, `PasswordState`, `ConfirmState`, `SelectState`, `CheckboxState`, and `EditorState` in a new `// === Reducer state` section of types.ts with readonly members and `readonly FieldChoice[]` collections, annotated each `create*State` return type, and replaced every `ReturnType<typeof …>` in helpers.ts. Additive exports plus readonly tightening. Added a Surface row per interface to the field-reducers table and extended the data-only sentence to `*State`; the table was re-aligned for the wider Kind column.
- **s12-50** applied (src/core/stores/MemoryTerminalStore.ts, src/core/stores/DatabaseTerminalStore.ts, src/core/index.ts, src/core/factories.ts, tests/src/core/stores/MemoryTerminalStore.test.ts, tests/src/core/stores/DatabaseTerminalStore.test.ts, guides/terminal.md): Moved both concrete stores to src/core/stores/ with `git mv`, repointed their `../types.js` / `../validators.js` imports and TSDoc links, and updated the barrel and factories rows. The barrel still star-exports both classes under their existing names. The tests rule mirrors src, so the two store suites moved to tests/src/core/stores/ (their setup import and the guide's test links follow); the src:core project glob already collects the nested path.
- **s12-51** applied (src/core/TerminalManager.ts, src/core/types.ts, tests/src/core/TerminalManager.test.ts, guides/terminal.md): Applied per the 2026-08-28 all-succeed ruling. `remove(names)` now starts `removed` at true and clears it when `#removeOne` returns false, so every listed name is still attempted and the result reports all-succeeded. Corrected the types.ts remark and the guide's `remove` method row and fence comment. Failing proof: with the source reverted, `vitest --project src:core tests/src/core/TerminalManager.test.ts` reported `1 failed | 12 passed` with `AssertionError: expected true to be false`; with the fix it reports `13 passed`.
- **s12-52** deferred_breaking: Deferred whole. Changing `terminals()` from `readonly string[]` to `readonly PromptInterface[]` is a non-additive change to a published call signature's return type, and every current caller (including TerminalManager.ts's own TARGET message) reads names from it. The additive half, a new `names()` accessor, cannot stand alone: adding it without moving `terminals` leaves two accessors returning the same names.
- **s12-53** applied (src/core/types.ts): Rewrote the `ask` remark on `TerminalManagerInterface` to state that an unmounted `to` rejects with a `TerminalError` coded `TARGET` and the caller must `add` it first, matching TerminalManager.ts:141-151 and the class TSDoc. The guide's `ask` method row already said `Rejects TARGET or DEADLOCK` and needed no change.
- **s12-54** deferred_breaking: Deferred whole. Every flagged helper is an `export function` reachable through src/core/index.ts or src/server/index.ts and documented as a Surface row in guides/terminal.md, so each rename removes a published symbol. The two lane corrections also conflict on the load-bearing detail — one names `isRawCapable`, the other refuses that form and names `supportsRawMode` — and the reshape lane widens the unit to the `*Reduce` half or a class promotion, which is a larger published-surface change still.
- **s12-55** deferred_breaking: Deferred whole. `serializeShutdown` is an exported function with its own guide Surface row, so renaming it removes a published symbol, and changing `SSE_EVENTS.shutdown` from `'shutdown'` to `'destroy'` changes the wire vocabulary every already-deployed PromptClient dispatches on — an observable runtime change no package document or test pins as intended.
- **s12-56** applied (src/core/helpers.ts): Merged the character-identical branches in `sanitizeSchema` into three case lists: `text` / `editor` / `number`, `date` / `time` / `datetime` / `color` / `confirm`, and `select` / `checkbox`. The narrowed unions carry the members each merged body reads, so both scoped typechecks and the src:core suite stay green with no behaviour change.
- **s12-58** deferred_breaking: Deferred whole. `TimerCancel` is an exported type with its own guide Surface row and is named in the guide's callable-types sentence, so renaming it to `TimerCancelFunction` removes a published symbol.
- **s12-59** deferred_breaking: Deferred whole. `Parked` is an exported interface with its own guide Surface row and is named in the guide's data-only sentence, so renaming it to `ParkedForm` removes a published symbol.
- **s12-60** applied (src/core/helpers.ts, src/core/constants.ts): Deleted the `(T-b)` control identifier from both section comments. No occurrence of it remains anywhere in src, tests, or guides.
- **s12-61** applied (src/core/errors.ts, src/core/TerminalManager.ts, src/core/factories.ts, src/core/helpers.ts, src/core/stores/MemoryTerminalStore.ts, src/core/stores/DatabaseTerminalStore.ts, src/server/helpers.ts): Replaced each numbered citation with the section's name where the name carries the rule (`.claude/rules/typescript.md § Errors and outcomes` in errors.ts) and deleted it where the sentence already states the rule — the §14 guard notes, the §5 export note, the §21 encoding note, the §22 bijection notes, and the §9.1 / §9.2 section comments, whose accessor and array-overload-first wording already says what the number pointed at. No `§` reference remains in src.
- **s12-62** applied (src/server/Terminal.ts): Renamed the flagged `#` privates to verb forms: `#writeGroup`, `#writeLocked`, `#collectEditable`, `#askText`, `#askPassword`, `#askEditor`, `#writeUnavailable`, `#writeList`, `#formatHint`, `#startReader`, `#openReadline`. All are `#` private members with no reference outside the class, in guides, or in tests.

## Gates

- npm run format:check: pass — All matched files use the correct format. Finished in 2433ms on 67 files using 4 threads. (One convergence pass was needed first: format:check flagged src/core/helpers.ts after the sanitizeSchema merge, so `npm run lint` then `npm run format` ran before this non-mutating result.)
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . — no output, exit 0
- npm run check: pass — tsc --noEmit --project tsconfig.json, then check:src:core and check:src:server — no diagnostics
- npm run build: pass — ✓ 7 modules transformed. ✓ built in 2.36s; Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts
- npm test: pass — src: 10 files / 125 tests passed; policy: 1 / 111 passed; config: 1 / 46 passed; setup: 2 / 24 passed; guides: 1 / 48 passed; integration: 1 / 2 passed. Full chain (format:check && lint:check && check && build && test) exited 0.

## Diffstat

```text
 guides/terminal.md                                 |  92 ++++++++-------
 src/core/TerminalManager.ts                        |  12 +-
 src/core/constants.ts                              |   2 +-
 src/core/errors.ts                                 |   3 +-
 src/core/factories.ts                              |   6 +-
 src/core/helpers.ts                                |  93 ++++++---------
 src/core/index.ts                                  |   4 +-
 src/core/{ => stores}/DatabaseTerminalStore.ts     |  16 +--
 src/core/{ => stores}/MemoryTerminalStore.ts       |  12 +-
 src/core/types.ts                                  | 127 ++++++++++++++++++++-
 src/server/Terminal.ts                             |  56 ++++-----
 src/server/helpers.ts                              |   6 +-
 tests/src/core/TerminalManager.test.ts             |   9 +-
 .../{ => stores}/DatabaseTerminalStore.test.ts     |   4 +-
 .../core/{ => stores}/MemoryTerminalStore.test.ts  |   4 +-
 15 files changed, 272 insertions(+), 174 deletions(-)
```

- dist moves: true

## Deviations

Two decisions worth recording, neither of which stopped the unit.

1. s12-50 scope beyond the repair's letter. The repair named only the two source moves plus index.ts and factories.ts. `.claude/rules/tests.md` § Test contract requires tests to mirror `src`, and a test the mirror rule flags is a misplaced test, so the two store suites moved to tests/src/core/stores/ with their setup import and the guide's test links updated. The vite `src:core` project glob is `tests/src/core/**/*.test.ts`, so the nested path is still collected exactly once; policy and guides suites both pass.

2. s12-54 lane conflict, recorded rather than resolved. The two lane corrections disagree on the `rawCapable` replacement name (`isRawCapable` against `supportsRawMode`, with the second lane explicitly refusing the first) and on whether the unit covers the `*Reduce` half or promotes the family to a class. That conflict is moot here because the finding defers whole on the breaking test, but it stands unresolved for the work order.

One process note: the `remove` all-succeed change carries a real failing proof, taken by temporarily restoring the any-succeeds body and re-running the narrow suite (`1 failed | 12 passed`, `AssertionError: expected true to be false`), then restoring my own edit and re-running green (`13 passed`). No `git stash`, `checkout`, or `restore` was used anywhere.

No off-limits file appears in `git status`: the tree carries only src/, tests/, and guides/terminal.md changes. The tree is uncommitted.
