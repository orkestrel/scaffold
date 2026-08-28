# Fix dossier: emitter

Verified fix-producing findings for the `emitter` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s18-29 — DRIFT

29. package=emitter, sqlite, sse, ollama file=(list follows) rule=`AGENTS.md` § Writing ("NEVER name a list item by its position. Write the item's name, never its ordinal or its number"), `.claude/rules/documentation.md` § Authority and workflow verdict=CONFIRMED
    wrong: Published TSDoc and source comments cite numbered sections of an internal instructions document that has no numbered sections, plus roadmap and design-note identifiers a consumer cannot resolve — `AGENTS §2`, `§5`, `§8`, `§12`, `§13`, `§14`, `§21`, `H4`, `Chunk 3`, `deployment scenario S2`. Exact sites: `emitter/src/core/types.ts:8`, `:21`, `:32`, `:41`; `emitter/src/core/Emitter.ts:14`, `:55`, `:59`, `:170`, `:187`; `emitter/src/core/factories.ts:5`, `:9`; `sqlite/src/server/types.ts:8`, `:11`, `:6-7` ("Chunk 3"), `:95` ("Chunk 3"); `sqlite/src/server/SQLiteStatement.ts:30`; `sqlite/src/server/errors.ts:9`; `sqlite/src/server/constants.ts:1`; `sqlite/src/server/helpers.ts:9`; `sse/src/core/errors.ts:3`; `ollama/src/server/errors.ts:4`; `ollama/src/server/constants.ts:1`, `:25`; `ollama/src/server/OllamaProvider.ts:35`, `:44`, `:95`, `:179`, `:206`, `:339`, `:358`, `:493`; `ollama/src/server/factories.ts:46`.
    repair: Delete each citation. Where the sentence needs the rule it cites, state the rule itself — "a listener throw is routed to the `error` handler, never rethrown", "every wire value arrives as `unknown` and is narrowed through guards" — which is what the surrounding prose already says in every one of these cases.

## s18-37 — DRIFT

37. package=emitter file=`src/core/types.ts:44-53` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `EmitterInterface`'s members carry no TSDoc at all — `destroyed`, `on`, `once`, `off`, `emit`, `count`, `clear`, `destroy` — so no `@param` documents that `count(event?)` and `clear(event?)` apply to all events when the argument is omitted, and nothing documents that `on`/`once`/`emit` become no-ops after `destroy()`. That behavior exists only in the class `@remarks` at `Emitter.ts:30-32`.
    repair: Document each member on the interface, giving `count` and `clear` an explicit `@param event - The event to read or clear. Omit to apply to every event.`

