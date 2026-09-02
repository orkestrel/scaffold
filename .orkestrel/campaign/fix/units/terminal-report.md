# Unit breaking-terminal — report (2026-09-02)

Writer: `implementer` on Opus 5 (native; Sol dark, substitution recorded). Returned report:

## Rows

- **s12-48** — applied: KeyEvent.name is now optional (readonly name?: string) and parseKey's unknown branch OMITS the key rather than returning ''. exactOptionalPropertyTypes is on, so the branch returns { sequence, ctrl, meta, shift } with no name. Consumers moved: confirmReduce reads key.name?.toLowerCase(); editLine narrows key.name !== undefined before the code-point/printable test. Guide KeyEvent and parseKey Surface rows and Contract item 9 restate absence. The test that pinned name: '' moved to assert absence with not.toHaveProperty('name') — that assertion fails against the old contract, so it is the regression guard for this row. tests/setup.test.ts's feedReducer fold accumulator widened to admit an absent name.
- **s12-52** — applied: TerminalManagerInterface.terminals() returns readonly PromptInterface[]; TerminalManager returns [...this.#terminals.values()]. No names accessor added. The TARGET message's `known` name list now reads [...this.#terminals.keys()] directly from the private registry instead of through terminals(). types.ts remarks, the guide Methods row, and the guide fence all moved. Three call sites in tests moved from toEqual(name list) to identity assertions against the brokers `add` returned, in insertion order.
- **s12-54** — applied: All eighteen renames applied with every in-package consumer, test, guide row and fence. rawCapable became supportsRawMode per the ruling; isRawCapable was not used. Each renamed function's TSDoc first sentence was rewritten to the third-person -s form (Renders…, Returns…, Checks whether…). The *Reduce widening is reported as an observation, not applied.
- **s12-55** — applied: serializeShutdown became serializeDestroy returning { event: 'destroy', data: '' }; SSE_EVENTS.shutdown became SSE_EVENTS.destroy with value 'destroy'; PromptClient dispatches on SSE_EVENTS.destroy. The wire word every deployed PromptClient dispatches on CHANGES from 'shutdown' to 'destroy' — a consumer whose SSE producer still emits 'shutdown' will no longer disconnect or interrupt its active render. The guide carries the new contract only, with no migration note. One further banned synonym in the row's radius was corrected: guides/terminal.md Contract item 4 said the retry loop ends when 'the client is shut down' and now says 'is destroyed'.
- **s12-58** — applied: TimerCancel became TimerCancelFunction across types.ts (the alias, TimerHandler's return, ParkedForm.cancel), core helpers (defaultTimer), PromptClient (#backoff), tests/setup.ts (createManualTimer), and the guide Surface row plus the callable-types sentence.
- **s12-59** — applied: Parked became ParkedForm in types.ts and its three Prompt.ts uses (#parked map value, the answered record, the expired record), plus the guide Surface row and the data-only sentence. The two remaining 'Parked' hits in src/core/types.ts:703 and guides/terminal.md:472 are the English participle in 'Parked forms are process-bound', classified and left.

## Symbols moved

- KeyEvent.name: string → KeyEvent.name?: string (parseKey omits the key on an undecoded input)
- TerminalManagerInterface.terminals(): readonly string[] → terminals(): readonly PromptInterface[]
- promptHeader → renderPromptHeader
- hintedHeader → renderHintedHeader
- submitHeader → renderSubmitHeader
- errorLine → renderErrorLine
- inputView → renderInputView
- passwordView → renderPasswordView
- confirmView → renderConfirmView
- selectView → renderSelectView
- checkboxView → renderCheckboxView
- editorView → renderEditorView
- rawCapable → supportsRawMode
- enabledChoices → filterEnabled
- disabledChoices → filterDisabled
- groupHeader → renderGroupHeader
- lockedLine → renderLockedLine
- suggestionLine → renderSuggestionLine
- unavailableLine → renderUnavailableLine
- numberedList → renderNumberedList
- serializeShutdown → serializeDestroy
- SSE_EVENTS.shutdown ('shutdown') → SSE_EVENTS.destroy ('destroy')
- TimerCancel → TimerCancelFunction
- Parked → ParkedForm

## Files touched

- /home/user/fleet/terminal/src/core/types.ts
- /home/user/fleet/terminal/src/core/constants.ts
- /home/user/fleet/terminal/src/core/helpers.ts
- /home/user/fleet/terminal/src/core/Prompt.ts
- /home/user/fleet/terminal/src/core/PromptClient.ts
- /home/user/fleet/terminal/src/core/TerminalManager.ts
- /home/user/fleet/terminal/src/server/helpers.ts
- /home/user/fleet/terminal/src/server/Terminal.ts
- /home/user/fleet/terminal/guides/terminal.md
- /home/user/fleet/terminal/tests/setup.ts
- /home/user/fleet/terminal/tests/setup.test.ts
- /home/user/fleet/terminal/tests/src/core/helpers.test.ts
- /home/user/fleet/terminal/tests/src/core/PromptClient.test.ts
- /home/user/fleet/terminal/tests/src/core/TerminalManager.test.ts
- /home/user/fleet/terminal/tests/src/core/factories.test.ts
- /home/user/fleet/terminal/tests/src/server/helpers.test.ts

## Tests changed

- tests/src/core/helpers.test.ts — 'is total for empty and unknown escape sequences' became 'is total for empty and unknown escape sequences, naming neither': parseKey('') now equals { sequence: '', ctrl, meta, shift } and carries no 'name' property, asserted with not.toHaveProperty('name') on both the empty input and the unknown escape. The renamed view helpers and serializeDestroy are exercised under their new names; the serializer case is titled 'serializes pending, expire, and destroy frames exactly' and pins { event: 'destroy', data: '' }.
- tests/src/core/TerminalManager.test.ts — the insertion-order accessor case now captures the brokers `add` returned and asserts terminals() yields those instances by identity in order; the batch-removal case captures the four brokers and asserts the survivor by identity.
- tests/src/core/factories.test.ts — createTerminalManager case asserts terminals() carries the broker `add` returned, by identity.
- tests/src/core/PromptClient.test.ts — 'a destroy frame interrupts the active render, disconnects once, and remains reusable' drives { event: 'destroy', data: '' }.
- tests/setup.test.ts — the SSE fixture frames and the parsed event-name assertion moved to 'destroy'; the feedReducer fold accumulator became ReadonlyArray<string | undefined> so an undecoded key's absent name types honestly.
- tests/setup.ts — createManualTimer's handler returns TimerCancelFunction.
- tests/src/server/helpers.test.ts — the stream, projection, and whole-form line cases drive supportsRawMode, filterEnabled, filterDisabled, renderGroupHeader, renderLockedLine, renderSuggestionLine, renderUnavailableLine, and renderNumberedList.

## Gates

- `npm run format:check` → exit 0 — All matched files use the correct format. / Finished in 2963ms on 67 files using 4 threads.
- `npm run lint:check` → exit 0 — oxlint --config .oxlintrc.json --deny-warnings . — no diagnostics
- `npm run check` → exit 0 — tsc --noEmit --project tsconfig.json, then configs/src/tsconfig.core.json and configs/src/tsconfig.server.json — no diagnostics
- `npm run build` → exit 0 — [unplugin:dts] Declaration files built in 2431ms. / ✓ built in 2.62s
- `npm test` → exit 0 — src 125 passed (125); policy 111 passed (111); config 46 passed (46); setup 24 passed (24); guides 48 passed (48); integration 2 passed (2)
- `grep -rn '\b<old-name>\b' src tests guides README.md for all twenty renamed or removed names` → exit 0 — 0 hits. The only surviving 'Parked' hits are the English participle at src/core/types.ts:703 and guides/terminal.md:472.

## Diff stat

```text
guides/terminal.md 190 +++--; src/core/Prompt.ts 8 +-; src/core/PromptClient.ts 10 +-; src/core/TerminalManager.ts 6 +-; src/core/constants.ts 4 +-; src/core/helpers.ts 180 ++++---; src/core/types.ts 27 +--; src/server/Terminal.ts 69 ++--; src/server/helpers.ts 54 ++--; tests/setup.test.ts 6 +-; tests/setup.ts 4 +-; tests/src/core/PromptClient.test.ts 4 +-; tests/src/core/TerminalManager.test.ts 14 ++-; tests/src/core/factories.test.ts 7 +-; tests/src/core/helpers.test.ts 59 ++---; tests/src/server/helpers.test.ts 38 ++--- — 16 files changed, 366 insertions(+), 314 deletions(-)
```

Status at return (writer's reading): `M guides/terminal.md |  M src/core/Prompt.ts |  M src/core/PromptClient.ts |  M src/core/TerminalManager.ts |  M src/core/constants.ts |  M src/core/helpers.ts |  M src/core/types.ts |  M src/server/Terminal.ts |  M src/server/helpers.ts |  M tests/setup.test.ts |  M tests/setup.ts |  M tests/src/core/PromptClient.test.ts |  M tests/src/core/TerminalManager.test.ts |  M tests/src/core/factories.test.ts |  M tests/src/core/helpers.test.ts |  M tests/src/server/helpers.test.ts | (no untracked files; package.json, package-lock.json, tests/setupPolicy.ts and tests/policy.test.ts untouched)`
Built `dist/` moves: true

## Observations

- dist moved and was verified rather than assumed. After npm run build, renderPromptHeader, supportsRawMode, filterEnabled, filterDisabled, serializeDestroy and renderNumberedList each resolve in the built dist/src files; promptHeader, rawCapable, enabledChoices, serializeShutdown and TimerCancel return zero hits there, and grep -o shutdown dist/src/core/index.js returns 0.
- The *Reduce family (inputReduce, passwordReduce, confirmReduce, selectReduce, checkboxReduce, editorReduce) keeps its {noun}Reduce form. Under {verb}{Noun} these would be reduceInput and siblings. The ruling put the widening outside the row, so it is reported here and not applied.
- No class promotion was made. The core view family and the server line family stay as exported helpers in helpers.ts; the ruling named no promotion, and § Standalone helpers only says a growing family may be promoted.
- filterEnabled and filterDisabled use a filter* prefix that the quoted § Standalone helpers prefix list does not define. The row named those exact targets so they were applied as named; if filter* is to carry a project-wide meaning it needs a row in that table.
- serializePending and serializeExpire keep imperative TSDoc first sentences ('Serialize a parked …') while the renamed serializeDestroy now reads 'Serializes …'. Neither of those two blocks was moved by any row, so their sentences were left for the change that owns them.
- guides/terminal.md:35 retains the comment `// It never resolves { name: '' }`. That is a FORM field literally named 'name' binding an empty string in the blank-line-binds-absence section — a different subject from KeyEvent.name — so it was classified and left.
- The TARGET error still reports endpoint NAMES in its message and its { to, known } context, now read from the private #terminals keys rather than through terminals(). The public accessor and the error's diagnostic deliberately carry different things.
- exactOptionalPropertyTypes is on in tsconfig.json, so parseKey OMITS the name key rather than assigning undefined; { name: undefined } would not be assignable to name?: string.
- guides/terminal.md's Presentation section still reads 'plus the four shared line shapes every view is assembled from'. That is a count in prose, which AGENTS.md § Writing bans, but it is pre-existing and sits outside every row this unit carries.
- Timing on this host was not suspect: the whole npm test chain finished in roughly 8 s wall across its six projects, and no test reported a timeout or a retry.
- No probe was needed and none was built, so nothing was written under the checkout's tmp/ or under the system temporary directory beyond this unit's own scratch edit scripts.
- Import specifier lists were re-sorted only where a rename changed a name's position, and each file keeps its own prior convention: src/server/Terminal.ts uses case-insensitive order, tests/src/core/helpers.test.ts and tests/src/server/helpers.test.ts use ASCII order with the constants first.

## Deviations

- none

Actual diff and status rendered by the Orchestrator: `tmp/units/breaking/terminal.diff`,
`tmp/units/breaking/terminal.status`.
