# Audit verdict — unit voice-websocket

Bench: Sol dark; subjective lane on the writer's engine (Opus 5) in a clean context, told so;
`checker` on Sonnet; the objective lane did not run (the subjective lane held meaning and the checker found no code token moved). Subject: the uncommitted tree audited in place, then landed at `4f59e55`
(`units/voice-websocket.diff`, `units/voice-websocket.status`, `units/voice-websocket-report.md`).
Rewritten per the writer: imperative 4, verbless 36, name 0, returns 4. Writer's gates: format:check 0, lint:check 0, check 0, build 0, npm test 0.

## Subjective lane (PASS)

Lane held: SUBJECTIVE (voice, wording, meaning kept, guide voice). Objective lane did not run (Sol bench dark); objective questions returned as referrals, not verdicts.

1. Meaning preserved in every rewritten first sentence — CONFIRMED. Read every hunk in /home/user/scaffold/tmp/units/voice/voice-websocket.diff, not a sample. Every rewrite is a prefix insertion (Names the, Represents, Represents the, Holds, Checks whether) or a verb conjugation, with the original clause intact. /home/user/fleet/websocket/src/server/parsers.ts:112 conjugates both verbs of the coordinated clause ("Decodes ... or signals it is malformed"), so the sentence stays grammatical. /home/user/fleet/websocket/src/server/types.ts:140 keeps the possessive on the noun it modified ("the emitter's listener-error handler"). Only addition anywhere is the definite article the inserted verb requires (constants.ts:22, "Text frame opcode" -> "Names the text frame opcode"); no quantifier introduced, no referent dropped — NodeWebSocket.ts:38 leaves its continuation line attached to the same subject. Every qualifier, RFC reference, parenthetical, and backticked token survives.

2. Verb fits the symbol and never repeats its name — CONFIRMED. Creates/Computes/Decodes/Reads on functions (helpers.ts:15, :32; parsers.ts:9); Checks whether on every guard (validators.ts:6, :28, :48; errors.ts:60); Represents on classes, interfaces, type aliases (types.ts:21, :33, :56, :72, :89, :113, :150; errors.ts:15); Holds on the one option property (types.ts:140); Names on constants (constants.ts:10 through :79). No sentence spells its own identifier. Domain-term overlaps ("the text frame opcode" for WEBSOCKET_OPCODE_TEXT, "the WebSocket protocol version" for WEBSOCKET_VERSION) are the value's own wire name, preserved by the brief's pilot lesson and pre-existing. No verb misdescribes its symbol.

3. Boolean @returns in the rule's form with the condition kept — CONFIRMED. errors.ts:63, validators.ts:14, :36, :61 all read "True if <original condition>; false otherwise" with the condition verbatim. Dropping the backticks on true/false is the form .claude/rules/typescript.md:77-78 states and the brief rules by design. The tri-state return at parsers.ts:88 correctly keeps its boolean | undefined wording.

4. Nothing already conforming rewritten; no other tag or later sentence touched — CONFIRMED. The already-third-person blocks are untouched: factories.ts:5, errors.ts:41, helpers.ts:72, parsers.ts:80. Every +/- pair in the diff is a description's first line or a @returns line; @example, @param, @remarks, @throws appear only as context. Doc-block population fully accounted for across errors.ts, types.ts, parsers.ts, constants.ts, helpers.ts, factories.ts, validators.ts, NodeWebSocket.ts. git status --short lists only src/server files.

Findings outside the claims:

F1 — Guide surface tables now speak the voice the TSDoc just left. /home/user/fleet/websocket/guides/websocket.md:54 and :55 still read "Whether a value is ...", :69 through :74 read "Text frame opcode (0x01).", :99 reads "Options for createNodeWebSocket ..." — the exact wordings replaced in validators.ts, constants.ts, types.ts. Why it matters: a developer reading the guide beside the editor tooltip sees two voices for one symbol, the drift the wave exists to remove. What right looks like: a successor unit migrating the guide's Surface and Methods cells to the same third-person form, ruled once across the fleet's guides. Not a defect of this unit — guides/** is off-limits in its brief.

F2 — "Names the ..." reads templated on limit and default constants. /home/user/fleet/websocket/src/server/constants.ts:67, :70, :73, :76, :79 describe caps and defaults rather than spec-named wire values, and "Names the default close-handshake timeout in milliseconds" carries less than "Caps" or "Holds" would. A named constant does name its value, so the sentence is true, and the wave brief prescribes "Names ..." for a constant while leaving wording to the writer. No change required; recorded for a later decision on a limit variant of the constant opener.

F3 — Two rewritten first sentences still carry "e.g.": /home/user/fleet/websocket/src/server/constants.ts:58 and :61. .claude/rules/writing.md § Substitutions replaces it with "for example", and these are lines the writer edited. What right looks like: fold the substitution table into the next prose wave, scoped to whole TSDoc bodies. Not a defect here — the brief fixed the edit to the opener, and changing the rest would have breached claim 4.

F4 — Several first-sentence lines now overrun the surrounding comment wrap: /home/user/fleet/websocket/src/server/types.ts:33, :56, :150 and /home/user/fleet/websocket/src/server/errors.ts:15 run wider than the @remarks lines beneath them. The writer was right not to rewrap: re-flowing would have modified a continuation line and broken the byte-identical constraint. Recorded so a formatting pass owns it.

Referrals to the Orchestrator (objective lane dark, no verdict from me):
R1 — Gate evidence. The report claims the chain exits 0 with the lengthened single-line comments (constants.ts:58 and :73 are the longest). Prettier does not reflow comments, so I expect no format:check movement, but confirming it is the verifier's authoritative landing run.
R2 — Undocumented interface members. /home/user/fleet/websocket/src/server/types.ts:168-173 gives emitter, readyState, send, ping, close, destroy no TSDoc, while .claude/rules/typescript.md:74 requires complete TSDoc on every public export and /home/user/fleet/websocket/guides/websocket.md:112-115 documents the methods instead. Whether the guide table discharges that rule is outside this wave and outside the subjective lane.

## Checker lane (PASS)

Claim 1 — CONFIRMED. Every hunk in /home/user/scaffold/tmp/units/voice/voice-websocket.diff sits inside a `/** … */` block (e.g. lines 8-11, 121-123, 219-220) or a single-line `/** … */` doc comment (e.g. constants.ts lines 22-113). No `-`/`+` pair touches a non-comment code token; every changed line is a leading doc-comment sentence or an `@returns` line.

Claim 2 — CONFIRMED. Every backtick token, `{@link …}`, and URL in each rewritten line is byte-identical to the removed line, checked hunk by hunk:
- NodeWebSocket.ts:10 `node:stream` unchanged.
- errors.ts:132 `{@link WebSocketError}` unchanged; errors.ts:136 `` `value` `` and `` `WebSocketError` `` unchanged, only the mandated `true`/`false` rewording applied (matches the stated exception).
- helpers.ts:149,158 `` `Sec-WebSocket-Accept` `` unchanged; no other tokens present.
- parsers.ts:171,180 no tokens present, unchanged.
- types.ts:211,220,238,247,256 `{@link encodeWebSocketFrame}`, `{@link import('./errors.js').WebSocketError}`, `` `createNodeWebSocket` `` all unchanged.
- validators.ts:269,278,287,296,305,314 `` `Sec-WebSocket-Key` ``, `` `key` ``, `` `protocol` ``, `` `code` `` all unchanged; only the three `@returns` lines take the mandated `True if …; false otherwise` rewording with the backticked `true`/`false` dropped, per the stated exception.
No case of a dropped code token repeating the symbol's own identifier was found (no such rewrite occurs in this diff), so no observation is owed under that clause.

Claim 3 — CONFIRMED. /home/user/scaffold/tmp/units/voice/voice-websocket.status lists exactly 7 files, all `M src/server/*.ts` (NodeWebSocket.ts, constants.ts, errors.ts, helpers.ts, parsers.ts, types.ts, validators.ts). Nothing under `tests/`, `guides/`, `README.md`, `package.json`, `package-lock.json`, `.claude/`, or `configs/`.

Claim 4 — CONFIRMED. A case-insensitive grep of the listed imperative verbs followed by a space or backtick over `/home/user/fleet/websocket/src` returns one hit: `src/server/validators.ts:56 * Close Code Number Registry and accepted by the \`ws\` ecosystem...`. Reading context (validators.ts:48-58) shows this is mid-`@remarks` prose ("the WebSocket Close Code Number Registry"), not the first line of a doc block, so it is not a true hit under the claim's scope (first-line opener only). The `@returns Whether|`true`|true ` sweep returns no matches. `/home/user/fleet/websocket/app` does not exist (Glob found no files), so the `app/` portion of the sweep is vacuous and adds no hits.

Claim 5 — CONFIRMED on quoted evidence. The report (/home/user/scaffold/tmp/units/voice/voice-websocket-report.md:44-53) quotes the exact command and exit code for each gate: `npm run format:check` (0), `npm run lint:check` (0), `npm run check` (0), `npm run build` (0), `npm test` (0), each with a result excerpt. Per the claim's own rule this resolves CONFIRMED on the quoted evidence, with the Orchestrator's landing chain remaining the authoritative run (report line 52 states this itself).

Findings outside the claims:

No findings outside the numbered claims. The diff, status, and tree are consistent with the writer's report: all seven touched files sit under `src/server/`, no `app/` tree exists in this checkout, and no code token, `@example`, `@param`, or later sentence differs from the pre-change text in any inspected hunk.

## Orchestrator

Both lanes PASS. Landed by the Orchestrator's chain, every gate 0. **Verdict: PASS.**
