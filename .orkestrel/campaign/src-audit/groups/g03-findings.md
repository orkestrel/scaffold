# Findings for group g03

Packages: terminal. Each finding keeps its original id. The verdict= inside each finding text is the ORIGINAL auditor lane ruling (CONFIRMED or EXEMPT) - re-rule it yourself from primary evidence; never inherit it.

## s12-48

48. package=terminal file=src/core/types.ts:27 and src/core/helpers.ts:97 rule=`AGENTS.md` § Design laws ("Absence is `undefined`. Never invent sentinels such as … `''`") verdict=CONFIRMED
    wrong: `parseKey` returns `name: ''` for an unrecognized sequence, and `KeyEvent.name` is a required `string`, so every consumer tests the sentinel rather than absence. `editLine` (helpers.ts:815) then has to defend against it by counting code points.
    repair: Declare `readonly name?: string` on `KeyEvent`, return the record without `name` at helpers.ts:97, and read absence at the reducer branches.

## s12-49

49. package=terminal file=src/core/helpers.ts:356,416,475,535,619,730 rule=`AGENTS.md` § Non-negotiable rules ("ALWAYS define reusable and public types in `*/types.ts`", "ALWAYS make interface properties and public return collections readonly"); `.claude/rules/typescript.md` § Types verdict=CONFIRMED
    wrong: The six `create*State` factories declare no return type, so their state shape exists only by inference and every consumer must write `ReturnType<typeof createInputState>` — the form used at helpers.ts:371,383,386,431,445,447,491,505,507,552,580,582,640,673,675,749,767,769. The inferred members are all mutable, and `choices` is a mutable array (helpers.ts:540,624), so a public return type leaks mutable collections.
    repair: Declare `InputState`, `PasswordState`, `ConfirmState`, `SelectState`, `CheckboxState`, and `EditorState` in `src/core/types.ts` with `readonly` members and `readonly FieldChoice[]` collections, annotate each factory's return type, and replace every `ReturnType<typeof …>` with the named type.

## s12-50

50. package=terminal file=src/core/MemoryTerminalStore.ts, src/core/DatabaseTerminalStore.ts rule=`.claude/rules/architecture.md` § Stores, § Extension categories verdict=CONFIRMED
    wrong: "Concrete stores live in `stores/`" — both concrete `TerminalStoreInterface` implementations sit flat in `src/core/`, though the store is exactly the designed pluggable seam the category-folder rule names.
    repair: Move both files to `src/core/stores/`, update `index.ts:10-11` and `factories.ts:15-16`. `TerminalStoreInterface` stays in `types.ts` and the `create*Store` factories stay in `factories.ts`, both already correct.

## s12-51

51. package=terminal file=src/core/TerminalManager.ts:233-239 and src/core/types.ts:546-548 rule=`.claude/rules/patterns.md` § Batch operations ("returns true only when all succeed") verdict=CONFIRMED
    wrong: `remove(names)` returns true when ANY listed endpoint was removed (`let removed = false; … if (this.#removeOne(name)) removed = true`), and `types.ts:547` documents that behaviour. `Prompt.stop(ids)` in the same package (Prompt.ts:123-129) correctly reports all-succeeded, so one package answers the same question two ways.
    repair: Start `removed` at `true` and clear it when `#removeOne` returns false, so every listed name is still attempted and the result reports all-succeeded; correct the `types.ts` remark to match.

## s12-52

52. package=terminal file=src/core/types.ts:555 and src/core/TerminalManager.ts:103 rule=`.claude/rules/patterns.md` § Managers ("Accessors") verdict=CONFIRMED
    wrong: `terminal(name)` returns `PromptInterface | undefined` but `terminals()` returns `readonly string[]`, so the plural accessor does not return what the singular returns; a caller wanting every broker must map the names back through `terminal`.
    repair: Declare `terminals(): readonly PromptInterface[]` returning `[...this.#terminals.values()]`, and expose the names as a separate `names(): readonly string[]` accessor for the `TARGET` message at TerminalManager.ts:143. `sea`'s `AssetManagerInterface` already uses that split.

## s12-53

53. package=terminal file=src/core/types.ts:539-540 rule=`.claude/rules/documentation.md` § Parity ("Re-read the prose last, against what actually shipped") verdict=CONFIRMED
    wrong: `TerminalManagerInterface`'s remark says `ask` "parks `form` from `from` to `to`, adding `to` if it is absent". The implementation rejects an unmounted target with a `TARGET` error (TerminalManager.ts:141-151), and the class TSDoc at TerminalManager.ts:32 states the opposite of `types.ts`. `types.ts` is authoritative for the contract, so the published contract and the shipped code disagree.
    repair: Correct `types.ts:539-540` to state that `ask` rejects with a `TerminalError` coded `TARGET` when `to` is not mounted, and that the caller must `add` it first.

## s12-54

54. package=terminal file=src/core/helpers.ts:312,326,337,342,371,431,491,552,640,749 and src/server/helpers.ts:100,210,222,227,242,253,263,282 rule=`.claude/rules/names.md` § Standalone helpers ("default to `{verb}{Noun}`") verdict=CONFIRMED
    wrong: A family of module helpers carries bare noun-phrase names for functions that render or compute — `promptHeader`, `hintedHeader`, `submitHeader`, `errorLine`, `inputView`, `passwordView`, `confirmView`, `selectView`, `checkboxView`, `editorView`, `groupHeader`, `lockedLine`, `suggestionLine`, `unavailableLine`, `numberedList`, `enabledChoices`, `disabledChoices` — while their file-mates `sanitizeSchema`, `serializePending`, `toggleIndex`, `editLine`, `fieldToText`, and `moveUp` follow the rule. `rawCapable` (server/helpers.ts:100) is a predicate named as an adjective, sitting directly beneath `isInputStream`, `isOutputStream`, and `isReadable`.
    repair: Rename to the `{verb}{Noun}` form — `renderPromptHeader`, `renderHintedHeader`, `renderSubmitHeader`, `renderErrorLine`, `renderInputView` (and siblings), `renderGroupHeader`, `renderLockedLine`, `renderSuggestionLine`, `renderUnavailableLine`, `renderNumberedList`, `filterEnabled`, `filterDisabled` — and `rawCapable` to `isRawCapable`.

## s12-55

55. package=terminal file=src/core/helpers.ts:894, src/core/constants.ts:214 rule=`.claude/rules/names.md` § Fixed lifecycle vocabulary ("Never introduce synonyms") verdict=CONFIRMED
    wrong: `serializeShutdown` and the `SSE_EVENTS.shutdown` wire name use `shutdown` for "the broker is going away", which the table fixes as `destroy`. The vocabulary is this package's own, not an external spec's.
    repair: Rename the helper to `serializeDestroy` and the wire event value to `'destroy'`, updating the `PromptClient` dispatch and the constants remark.

## s12-56

56. package=terminal file=src/core/helpers.ts:204-232 rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
    wrong: In `sanitizeSchema`'s switch, the `number` branch (lines 223-232) is character-identical to the `text`/`editor` branch (204-214), the `confirm` branch (243-246) to the `date`/`time`/`datetime`/`color` branch (233-242), and the `checkbox` branch (260-272) to the `select` branch (247-259).
    repair: Merge each identical pair into one case list — `case 'text': case 'editor': case 'number':`, `case 'date': … case 'confirm':`, `case 'select': case 'checkbox':`.

## s12-57

57. package=terminal file=src/core/types.ts:343,527 rule=`AGENTS.md` § Design laws ("Never invent sentinels such as … `'unknown'`"); `.claude/rules/names.md` § General vocabulary ("Name the axis a discriminant varies") verdict=CONFIRMED
    wrong: `AnswerError`'s `reason: 'unknown'` uses a banned label for a condition that is precisely known — no form is parked under that id — and `TerminalAnswerError`'s `reason: 'terminal'` names an entity rather than the condition (no endpoint is mounted under that name).
    repair: Rename the literals to `'unparked'` and `'unmounted'`, updating `Prompt.ts:144`, `TerminalManager.ts:192`, the remarks, and the guide.

## s12-58

58. package=terminal file=src/core/types.ts:262 rule=`.claude/rules/names.md` § Type-level identifiers ("Function type → `{Entity}Handler` or `{Entity}Function`") verdict=CONFIRMED
    wrong: `TimerCancel` is a function type matching neither required form, beside the correctly formed `TimerHandler` and `FetchHandler`.
    repair: Rename to `TimerCancelFunction`, updating `types.ts:259,261`, `helpers.ts:10,830`, `Prompt.ts` and `PromptClient.ts` field types.

## s12-59

59. package=terminal file=src/core/types.ts:274 rule=`.claude/rules/names.md` § Type-level identifiers ("Plain non-behavioral data → `{Entity}`") verdict=CONFIRMED
    wrong: `Parked` is an adjective, not an entity noun, for the broker's per-form runtime record, and it sits beside `PendingForm`, the wire record it contains.
    repair: Rename to `ParkedForm`, updating `Prompt.ts:3,44,162,209`.

## s12-60

60. package=terminal file=src/core/helpers.ts:821, src/core/constants.ts:194 rule=`.agents/orchestration.md` § Check the brief before you send it ("Keep the brief's control identifiers inside the brief") verdict=CONFIRMED
    wrong: Both section comments end with the campaign control identifier `(T-b)`, which names a work unit no reader of this package can resolve.
    repair: Delete `(T-b)` from both comments.

## s12-61

61. package=terminal file=src/core/errors.ts:3, src/core/TerminalManager.ts:40,97,174,223, src/core/factories.ts:60, src/core/MemoryTerminalStore.ts:10,21, src/core/DatabaseTerminalStore.ts:28,33,65, src/core/helpers.ts:34, src/server/helpers.ts:26,52,69 rule=`AGENTS.md` § Writing ("NEVER name a list item by its position") verdict=CONFIRMED
    wrong: Comments and public TSDoc cite the coding contract by section number (`AGENTS §12`, `§9.1`, `§9.2`, `§14`, `§21`, `§22`), which resolves to nothing — `AGENTS.md` has named sections only.
    repair: Replace each with the section's name (`.claude/rules/patterns.md § Managers`, `.claude/rules/typescript.md § Errors and outcomes`, and so on), or delete it where the sentence already states the rule.

## s12-62

62. package=terminal file=src/server/Terminal.ts:182,190,226,252,259,283,352,359,366,546,596 rule=`.claude/rules/names.md` § General vocabulary ("methods are verbs") verdict=CONFIRMED
    wrong: A run of private methods are nouns or adjectives that perform work: `#group`, `#locked`, `#editable`, `#text`, `#password`, `#editor`, `#unavailable`, `#list`, `#hint`, `#reader`, `#readline`. Their file-mates `#read`, `#bind`, `#report`, `#render`, `#accept`, `#finish`, `#close` are verbs.
    repair: Rename to verb forms — `#writeGroup`, `#writeLocked`, `#editableFields` → `#collectEditable`, `#askText`, `#askPassword`, `#askEditor`, `#writeUnavailable`, `#writeList`, `#formatHint`, `#startReader`, `#openReadline`.

## s12-63

63. package=terminal file=src/server/constants.ts:50,53,56,59,68,78,81,84,87,95 rule=`AGENTS.md` § Design laws ("Mechanism, not product policy") verdict=CONFIRMED
    wrong: `PromptTheme` is published as the presentation seam ("the theme decides what that meaning looks like, so a consumer re-maps styled output by naming roles", `types.ts:66-69`), but it covers only glyphs and styles. Every word the driver shows — `FALLBACK_SELECT_HINT`, `FALLBACK_CHECKBOX_HINT`, `FALLBACK_EDITOR_HINT`, `FALLBACK_CONFIRM_HINT`, `CONTROL_HINTS`, `FILE_HINT`, `SUGGESTION_LEAD`, `UNAVAILABLE_LEAD`, `LOCKED_MARK`, `REFUSAL_MESSAGE` — is a fixed English literal a consumer cannot re-map.
    repair: Add a `copy` axis to `PromptTheme` and `PromptThemeOptions` covering those slots, merged leaf by leaf like `icons` and `roles`; or state plainly in the `PromptTheme` TSDoc that copy is fixed and is not a consumer seam.

## s12-64

64. package=terminal file=src/core/PromptClient.ts:63 rule=`AGENTS.md` § Design laws ("One concept, one term") verdict=CONFIRMED
    wrong: The field is typed `PromptClientOptions['terminal']` when the named type `TerminalInterface` is declared at `types.ts:209` and already imported by this module's own options type.
    repair: Type the field `TerminalInterface`.

## Referrals

These are specifically evidenced questions outside the design-fit lane, addressed to the Orchestrator:

- `terminal/src/core/TerminalManager.ts:214-218` — `save(name)` reads `this.#config.get(name)?.timeout`, which holds only the per-call options. An endpoint added with no options under a manager-level `timeout` (constructor option, applied at line 113) persists a snapshot with no `timeout`, so `open` restores a broker with the default rather than the configured value. Whether that is intended is a correctness question.
- `terminal/src/core/Prompt.ts:103-111` — `answer` wraps `#answer` in a second `attempt`, though `#answer` already wraps every call that can throw. A fault in the broker itself therefore returns `{ reason: 'rejected', errors: [{ field: 'form', message: 'The form rejected the answer' }] }`, attributing a broker defect to the caller's form.
- `interpret/src/core/Interpret.ts:356` — see finding 35; whether any consumer currently shares one context across orchestrators decides how the ownership fix must land.