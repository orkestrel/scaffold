# Fix dossier: console

Verified fix-producing findings for the `console` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s09-07 — DRIFT

7. package=console file=src/core/helpers.ts:33, :751 rule=`.claude/rules/architecture.md` § Kind purity ("Keep the leaf pair class-free") verdict=CONFIRMED
   wrong: `helpers.ts` imports the implementation class `Capture` and constructs it in `withCapture`, so the module at the bottom of core's graph depends on a class that sits above it. The file's own comment at :41-42 justifies the placement only against the `create*` name form and never addresses the dependency direction, so it is not a documented exemption for this rule.
   repair: Move `withCapture` into `src/core/factories.ts`, which already constructs `Capture` at :312, and give it the `create*` name that file requires for the value it returns (`createCaptureResult`, returning `CaptureResult<T>`); update `guides/console.md` and the barrel-facing examples. Alternative, if the name must stay: keep it in `helpers.ts` and take a `CaptureInterface` parameter, so the leaf imports only the type.

## s09-09 — DRIFT-RESHAPE

9. package=console file=src/core/index.ts:5-11 and src/core/factories.ts:49, :209, :238, :275, :311, :342, :373 rule=`.claude/rules/architecture.md` § Wrapper test ("Delete one-line delegates, pass-through factories") verdict=CONFIRMED
   wrong: The package publishes two construction doors for one entity. `ANSIRenderer`, `Logger`, `LoggerManager`, `Reporter`, `Capture`, `Spinner`, and `Progress` are barrelled, and each also has a factory whose whole body is `return new X(options)`. Those factories add no boundary, invariant, composition, translation, lifecycle, or narrower contract — the declared interface return is reachable as `const logger: LoggerInterface = new Logger(options)`. `createStyler` (:82, projects `.surface`), `createTheme`, and `createConsoleSink` are genuine and are not part of this finding.
   repair: Keep one door. Recommended: intern the seven classes — drop those rows from `src/core/index.ts`, add each to the `INTERNAL` list at `tests/guides.test.ts:50` beside `class Styler`, and drop their class rows from `guides/console.md` — leaving `create*` as the sole documented path, matching `Styler` and the sibling packages. That also frees finding 8's repair to give the constructors required collaborators.

### Verification

**Judge (DRIFT-RESHAPE/high):** The seven bodies are pass-through factories, which the wrapper test names for deletion by that exact term, and AGENTS.md ranks the rules above the sibling packages the subjective lane cites, so EXCEPTION is not earned. But the finding picks the wrong door to close: the barrel rule mandates barrellin

**Lane DRIFT-RESHAPE/high:** amend: delete the seven pass-through factories and their guide rows, keep the seven classes barrelled with their runnable examples, keep createStyler, createTheme, and createConsoleSink, and leave the INTERNAL list at tests/guides.test.ts:50 unchanged; no fleet consumer imports the deleted factories

**Lane EXCEPTION/high:** drop

## s09-10 — DRIFT

10. package=console file=src/core/constants.ts:407 and src/server/constants.ts:19 rule=`.claude/rules/architecture.md` § Wrapper test ("compatibility aliases"); AGENTS.md § Design laws ("One concept, one term") verdict=CONFIRMED
    wrong: `DEFAULT_CAPTURE_LEVELS = CAPTURE_LEVELS` and `DEFAULT_CAPTURE_LEVELS = STREAM_LEVELS` are rename-only aliases of the constants declared immediately above them, so one concept carries two published names in each environment.
    repair: Delete both aliases; read `CAPTURE_LEVELS` at `src/core/Capture.ts:69` and `STREAM_LEVELS` at `src/server/ProcessCapture.ts:93`, and delete their guide rows.

## s09-11 — DRIFT

11. package=console file=src/server/constants.ts:19, :27 rule=`.claude/rules/architecture.md` § Barrel exports ("A star-export collision is a design failure: rename the conflicting concept at its owner"); `.claude/rules/names.md` § Value-level identifiers verdict=CONFIRMED
    wrong: `DEFAULT_CAPTURE_LEVELS` and `DEFAULT_CAPTURE_LIMIT` are declared in both `src/core/constants.ts` (:407, :416) and `src/server/constants.ts` (:19, :27) with different types and different meanings, and both pairs are star-exported from their environment barrels. A consumer importing `DEFAULT_CAPTURE_LEVELS` from `@orkestrel/console` and from `@orkestrel/console/server` gets two different values under one name, and any module importing both barrels collides.
    repair: Qualify the server pair at its owner: `DEFAULT_STREAM_LEVELS` and `DEFAULT_STREAM_LIMIT` (or, after finding 10, `STREAM_LEVELS` and `DEFAULT_STREAM_LIMIT`); update `src/server/ProcessCapture.ts:14, :93, :96` and the guide rows.

## s09-12 — DRIFT

12. package=console file=src/core/constants.ts:239 rule=`.claude/rules/names.md` § Value-level identifiers (`{QUALIFIER}_{NOUN}`) verdict=CONFIRMED
    wrong: The log-level axis is published as the unqualified `LEVELS` while its three sibling axes are qualified — `STATUS_LEVELS` (:342), `CAPTURE_LEVELS` (:394), and `STREAM_LEVELS` (`src/server/constants.ts:12`) — so the one name that says nothing about which axis it names is the one a reader meets first.
    repair: Rename to `LOG_LEVELS`; update `src/core/factories.ts:24, :118` and the guide row.

## s09-13 — DRIFT

13. package=console file=src/server/helpers.ts:31, :145 rule=`.claude/rules/architecture.md` § Centralized-file pattern (Guards → `*/validators.ts`) verdict=CONFIRMED
    wrong: `isStreamTarget` and `isBufferEncoding` are total `(value: unknown) => value is T` guards living in `helpers.ts`. They are guards rather than plain predicates, so the one-directional name-form allowance for a predicate such as `isVacant` does not cover them.
    repair: Create `src/server/validators.ts`, move both functions there unchanged, add `export * from './validators.js'` to `src/server/index.ts` (the published surface is unchanged), and update the importers at `src/server/factories.ts:10`, `src/server/ProcessCapture.ts:15`, and `src/server/helpers.ts:123`.

### Verification

**Judge (DRIFT/high):** Both functions are `Guard<T>` and sit in `helpers.ts`, which the placement table and the kind-purity sentence both forbid. The exemption clause on offer is written for a predicate that is not a `Guard<T>` and does not reach these. The subjective lane's hunt returned sibling code and a descriptive fi

**Lane DRIFT/high:** stands

**Lane EXCEPTION/medium:** drop

## s09-14 — DRIFT

14. package=console file=src/server/helpers.ts:53 rule=`.claude/rules/names.md` § Fixed derivation/construction forms (`*Of` is a builder combining constituent parts) verdict=CONFIRMED
    wrong: `columnsOf(target)` takes the `*Of` builder form reserved for `arrayOf(guard)` / `boundsOf(min, max)`, but it reads one stream's live width and falls back to a default — a derivation, which this same file names correctly in `inferStyled`.
    repair: Rename in place to `inferColumns`; update `src/server/factories.ts:10, :81` and the guide row.

### Verification

**Judge (DRIFT/medium):** The rule fixes `*Of` to a builder combining parts, and its examples belong to the combinator family patterns.md names. `columnsOf` reads one property off one subject with a fallback, which is the derivation shape the same file already names `inferStyled`. The subjective lane's fleet population is re

**Lane DRIFT/medium:** amend: keep the rename to `inferColumns` in place, and extend the update list to guides/console.md:655 and :657 (the runnable fence) and :677 (the test inventory) beside the :264 surface row

**Lane EXCEPTION/high:** drop

## s09-16 — DRIFT

16. package=console file=src/server/ProcessCapture.ts:76-81, :148-153, :155, :276, :283 against src/core/Capture.ts:56-58, :115-120, :122, :168, :175 rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice"; one shared engine over backends) verdict=CONFIRMED
    wrong: The level-keyed bounded-buffer engine is implemented twice, member for member: the `#messages` / `#buckets` / `#limit` fields, the `messages()` overload pair, `clear()`, `#retain`, and `#push` differ between the two captures only in the record type they carry. The two are already described as analogues in their own TSDoc, and nothing keeps their retention semantics aligned.
    repair: Extract one level-keyed bounded buffer into its own file in `src/core` (generic over the record type), compose it in both `Capture` and `ProcessCapture`, and delete the duplicated fields and methods from both. `src/server` may import `src/core`, so the direction holds.

## s09-17 — DRIFT-RESHAPE

17. package=console file=src/core/Capture.ts:60, :62, :80 and src/server/ProcessCapture.ts:80, :86, :104 rule=AGENTS.md § Design laws ("Derive state … Do not store a second flag or label that can drift") verdict=CONFIRMED
    wrong: Both files carry the comment "The presence of an entry is what `active` reads" over `#originals`, while `active` returns a separate stored `#active` flag. The stated derivation is not the implemented one, so a reader is told the flag cannot drift when it is exactly the second flag the rule forbids.
    repair: Derive `active` from `this.#originals.size > 0` and delete `#active`, or, if `start()` with an empty `levels` list must still report `active`, delete the misleading comments and state on `#active` why the fact cannot be derived. Pick one and apply it in both files.

### Verification

**Lane DRIFT-RESHAPE/high:** amend: take only the second branch — delete the "presence of an entry is what `active` reads" sentence in both files and state on `#active` why the fact cannot be derived (an empty `levels` list leaves `#originals` empty while the capture is active); do not derive `active`

**Lane DRIFT-RESHAPE/high:** amend: take the second direction only — delete the false sentence in both files and state on `#active` why the fact is not derived, namely that an empty `levels` list patches nothing yet must still report the capture as started. Do not derive `active` from `#originals`.

## s09-18 — DRIFT

18. package=console file=src/core/types.ts:7, src/core/errors.ts:3, src/core/constants.ts:227, :438, src/core/Logger.ts:35, src/core/helpers.ts:657, src/core/types.ts:92 rule=`.claude/rules/writing.md` § Code tokens, references, and links; `.claude/rules/documentation.md` § Authority and workflow verdict=CONFIRMED
    wrong: Published API documentation cites material a reader cannot resolve. The pattern `§|scsr|C-[a-g]\b` over `/home/user/fleet/console/src/**/*.ts` matches in every source file of all three environments except the three barrels: numbered section references (`AGENTS §12`, `§13`, `§14`, `§4.5`) into a document that has no numbered sections, design-phase chunk labels (`the C-f browser branch`, `the C-g TTY sink`, `the C-c render* renderers`), and a predecessor project named only as `scsr` ("scsr's leak", "scsr shipped THREE spinners"). These ship in the emitted `.d.ts`.
    repair: Delete every `§n`, `C-x`, and `scsr` reference from `src/**/*.ts`. Where the clause carried a real constraint, state the constraint itself — "retention is bounded at `limit`" rather than "never the unbounded buffer scsr leaked".

## s09-19 — DRIFT

19. package=console file=src/core/types.ts:8, src/server/types.ts:97, :102 rule=`.claude/rules/typescript.md` § Comments and API documentation ("Every public export has complete TSDoc") verdict=CONFIRMED
    wrong: `ConsoleMethod`, `StreamWriteFunction`, and `StreamWriteCallback` are barrelled public exports with guide rows (`guides/console.md:120, :254, :255`), and each carries a `//` comment block instead of TSDoc, so the published declarations arrive undocumented.
    repair: Convert each comment to a TSDoc block whose first sentence is third person with an `-s` verb, keeping the boundary rationale under `@remarks`.

## s09-20 — DRIFT

20. package=console file=src/core/types.ts:1082 rule=`.claude/rules/typescript.md` § Types ("Put every reusable or public interface/type alias in the nearest authoritative `*/types.ts`") verdict=CONFIRMED
    wrong: The `ProgressEventMap.update` payload is an anonymous inline `{ readonly current: number; readonly total: number }`, so a consumer typing a listener parameter has to respell the shape, and the same record built at `src/core/Progress.ts:130` has no name to be checked against.
    repair: Name it in `src/core/types.ts` beside `StepPosition` — `export interface ProgressReport { readonly current: number; readonly total: number }` — use it in `ProgressEventMap`, and add its guide row.

## s09-21 — DRIFT-RESHAPE

21. package=console file=src/core/types.ts:1055, :1057, :1153, :1155 rule=`.claude/rules/names.md` § General vocabulary ("Properties are nouns; methods are verbs") and § Value-level identifiers; AGENTS.md § Design laws ("One concept, one term") verdict=CONFIRMED
    wrong: `SpinnerInterface.success()` / `failure()` and `ProgressInterface.failure()` are nouns in method position, and the successful terminal outcome for one concept — finish this activity well — is `success` on the spinner and `complete` on the progress bar.
    repair: Use one verb pair on both entities: `succeed()` and `fail()`, leaving `stop` and `destroy` as the fixed lifecycle table sets them. Update `src/core/Spinner.ts:114-120`, `src/core/Progress.ts:101-118`, the guide rows, and the examples.

### Verification

**Lane DRIFT-RESHAPE/medium:** amend: unify on `complete()` and `fail()` across both entities — rename Spinner's `success` to `complete` and both `failure` methods to `fail`, leaving ProgressEventMap's `complete` event and ProgressInterface's `completed` property in place; if `succeed()` is chosen instead, the rename must also carry the `complete` event and the `completed` property

**Lane DRIFT-RESHAPE/medium:** amend: rename the nouns only — `success()` to `succeed()` and `failure()` to `fail()` on `SpinnerInterface`, and `failure()` to `fail()` on `ProgressInterface` — updating src/core/Spinner.ts:114-120, src/core/Progress.ts:101-118, the guide rows, and the examples. Rule on the progress bar's successful-terminal term as one decision covering the method, the `complete` event, and the `completed` property, or leave all three as they are.

## s09-22 — DRIFT-RESHAPE

22. package=console file=src/core/factories.ts:166-176, src/browser/factories.ts:62-70, src/server/factories.ts:67-69 rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice"; implement shared behaviour in one engine over the primitives) verdict=CONFIRMED
    wrong: The level-to-stream routing decision is hand-rolled in each of the three sink backends, and the TSDoc of the browser and server sinks asserts it is "the SAME routing as core's `createConsoleSink`" — a claim nothing enforces, and one the server sink already departs from by folding `warn` into the error stream.
    repair: Export one core leaf that owns the decision — `matchesErrorStream(level?: LogLevel): boolean` plus, where three targets exist, a `selectWriter` leaf over the supplied writers — test it, and call it from all three sinks. State the server sink's `warn` routing as a deliberate difference where it remains one.

### Verification

**Judge (DRIFT-RESHAPE/high):** The duplication is real in core and browser and the rule fires. Two parts of the proposed repair are wrong. `matchesErrorStream(level?): boolean` serves only the server sink, making it a trivial single-use extraction the would-be-helper rule tells you to fold, and it leaves the core and browser dupl

**Lane DRIFT/medium:** amend: keep the extraction of one core leaf owning the level-to-writer decision, called from all three sinks, but drop the clause about the server sink already departing from core's routing and the instruction to document that difference — console.warn writes to stderr, so warn-to-err is core's routing

**Lane DRIFT-RESHAPE/high:** amend: export one core leaf that selects among three supplied writers by level — `selectWriter(level, { log, warn, error })` — unit-test it, and call it from all three sinks, the server passing `{ log: out, warn: err, error: err }`. Drop the instruction to record the server sink's `warn` routing as a deliberate difference; it is not one. Keep the `SAME routing` sentences, which the leaf then enforces.

## s09-23 — DRIFT

23. package=console file=src/core/types.ts:18, :81, :137, src/core/helpers.ts:45, :89, src/core/factories.ts:34 rule=`.claude/rules/typescript.md` § Comments and API documentation ("The first sentence states what the symbol does in the third person with an `-s` verb") verdict=CONFIRMED
    wrong: Console's public TSDoc opens in noun phrases ("A machine-readable error code…", "Text style as DATA…", "The fluent, composable styling surface…", "The visible width of `text`…") or in the imperative ("Remove every ANSI escape…", "Create the cross-environment default…"), never in the third person; a dedicated convention lane measured the package as imperative-or-noun throughout with no third-person site. The same prose shouts emphasis in capitals (`DATA`, `ALWAYS`, `THIRD-PARTY`, `NEVER`), which `AGENTS.md` § Writing's plain-prose requirement does not admit.
    repair: Rewrite each first sentence in the third person with an `-s` verb — "Names a machine-readable error code…", "Removes every ANSI escape sequence…", "Creates the cross-environment default renderer…" — and replace capitalised emphasis with the plain sentence that states the fact.

