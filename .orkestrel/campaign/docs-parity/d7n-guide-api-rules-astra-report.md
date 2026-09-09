1. BROKEN — Public API naming and shape

   This is a source/design compliance review, not an executed behavioral audit. The reported TypeScript success does not establish rule compliance.

   The outcome types `ParityReport` and `ParityRewrite` violate the required `{Entity}Result` form in `.claude/rules/names.md:143`. They are the direct results of `inspect()` and `rewrite()` in `guide/src/core/types.ts:263` and `:274`. Rename them by their outcome roles and update their consumers atomically.

   The `rewrite(direction)` method selects different algorithms in `guide/src/core/Parity.ts:133`: Markdown table/fence replacement through `#rewriteGuide`, or source-comment replacement through `#rewriteSource`. This contradicts `.claude/rules/names.md:65`, which requires splitting behavior-selecting variants. Expose distinct operations while retaining shared accumulation and reporting. The required `--to guide` and `--to source` command syntax can remain at the argument boundary.

   The private `#run` method at `guide/src/server/GuideCommand.ts:195` introduces the lifecycle synonym explicitly prohibited by `.claude/rules/names.md:217`. Rename it `#executeRunner`.

   The `GuideRunnerInterface.close()` declaration at `guide/src/server/types.ts:74` names resource teardown, for which `.claude/rules/names.md:214` requires `destroy`. Vitest does publish `close()` at `node_modules/vitest/dist/chunks/reporters.d.DtoKVV2s.d.ts:1486`, but the external-field exception names protocol fields, format fields, and engine pragmas. It provides no explicit lifecycle-method exception. The successor brief must resolve this conflict between direct Vitest assignability and the required Guide-owned lifecycle vocabulary. Adding explanatory TSDoc alone cannot amend the rule.

2. BROKEN — Centralization and wrapper compliance

   The fixed index, manifest, README, and usage values at `guide/src/server/GuideCommand.ts:48` are stored as private static fields. They represent shared workflow constants, not instance state. `AGENTS.md` requires constants to live in their designated centralized file; `.claude/rules/architecture.md:14` assigns that file as `constants.ts`. Move the reusable values there with qualified constant names. Inline a genuinely trivial single-use value where appropriate.

   The `createParity` factory at `guide/src/core/factories.ts:117` only returns `new Parity(options)`. The class already exposes exactly the behavior declared by its return interface. This factory adds no boundary, invariant, translation, lifecycle, or materially narrower contract. It fails the explicit pass-through-factory prohibition in `.claude/rules/architecture.md:159`. Use the constructor directly and update consumers, or identify a substantive factory responsibility before retaining it.

   These findings concern source structure. They do not allege a compiler or lint diagnostic.

3. BROKEN — Foreign-result ownership

   The selected dependency functions are reused directly, but the command does not implement the foreign ownership boundary required by `.claude/rules/patterns.md:135`.

   At `guide/src/server/GuideCommand.ts:205`, the command passes the result of `runner.start()` directly into `matchesGuideResult`. At `guide/src/server/helpers.ts:25`, that helper dereferences `testModules` for its length and then reads the property again for iteration. It neither owns the result at arrival nor validates the members it dereferences. The `runner` option at `guide/src/server/types.ts:124` states no ownership or validation obligations.

   Own the result before inspection, validate the members actually consumed, and preserve legitimate foreign class instances and unknown members. Do not use an exact-record or JSON-only transform that narrows Vitest’s contract. The unhandled-error payloads need no invented error schema when the command only checks their collection.

   An unexecuted control for root is a typed result whose `testModules` getter initially returns a failed module and subsequently returns an empty array. Require inspection to use an owned reading and report failure. This report does not claim that control ran.

4. BROKEN — The writer brief must yield to coding authority

   The original command-fix brief requires the existing `Parity` orchestration to remain unchanged and explicitly carries runner creation/start/close into the public boundary. Those constraints conflict with the API findings in this review. The prior design verdict cannot authorize exceptions to the coding contract.

   Amend the brief before implementation resumes. Carry the outcome naming, operation shape, lifecycle boundary, constants, wrapper removal, and foreign ownership findings explicitly. Preserve the direct `tests/guides.test.ts` entry, explicit rewrite authority, reusable Guide implementation, and thin Scaffold consumer.

   The missing server guide contract, package export/script wiring, and unfinished behavioral coverage are acknowledged draft work. They are not independent evidence of a wrong design, and this review does not demand completion gates from the frozen checkpoint. The supplied evidence establishes the intended types-first sequence, but does not independently establish its complete editing chronology.

Attacked and held: The command options use single-word keys without prefixed grouping. The server barrel exposes its intentional declarations through star exports. The command composes real inventory, rewrite, reporting, and runner work, so the command class itself survives the wrapper test. Node imports remain in server source.

The compound `testModules` and `unhandledErrors` fields withstand the external-format attack. Their TSDoc names Vitest’s `TestRunResult`, and the installed declaration at `reporters.d.DtoKVV2s.d.ts:929` contains those exact fields. This finding does not extend that exception to lifecycle methods.

The dependency-reuse direction also holds. The installed `readInventory` declaration supplies the inventory operation, and `parsePackageName` composes the installed Contract `parseJSON` and `isRecord` primitives with package-name extraction. No replacement JSON parser or additional dependency is justified.

VERDICT: FAIL 1, 2, 3, 4; outside the claims: none
