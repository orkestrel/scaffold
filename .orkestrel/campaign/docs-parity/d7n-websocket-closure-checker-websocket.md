Lane held: checker websocket

## Claim 1 — scope honesty (fix round + successor)

**PASS.**

- `d7n-websocket-converge-fix.status.txt` lists exactly 9 files (`guides/websocket.md`, `src/server/{NodeWebSocket,constants,errors,factories,helpers,parsers,types}.ts`, `tests/guides.test.ts`), all inside the brief's owned scope (`guides/websocket.md`, doc blocks under `src/server/**`, `tests/guides.test.ts`). The diff (`d7n-websocket-converge-fix.diff.txt`) contains hunks accounting for every one of these files and nothing outside them; each hunk maps one-for-one to an item the brief names (W1 hoist, W2 constant literals, W3 `Shape` column, W5 count sentence, W6 dependency sentence, W7 all-caps sweep, W8 titled-pair hook, W9 re-padding). No code token moved (verified against the doc-block-only diffs in `NodeWebSocket.ts`, `constants.ts`, `types.ts`, `errors.ts`, `helpers.ts`, `parsers.ts`, `factories.ts`).
- W4 did not land in the fix diff (`tests/setupServer.ts` absent from the fix `git status --short` and diff); the report's own § W4 documents the block (rename reaches `tests/setupServer.test.ts`, outside the fix brief's grant) with evidence (`oxlint` error at `tests/setupServer.ts:102:1`).
- `d7n-websocket-frame.status.txt` lists exactly `tests/setupServer.test.ts`, `tests/setupServer.ts`, `tests/src/server/NodeWebSocket.test.ts`, `tests/src/server/parsers.test.ts` — matching the successor brief's grant ("`tests/setupServer.ts`, `tests/setupServer.test.ts`, and the call sites under `tests/src/**`") exactly, and the successor diff (`d7n-websocket-frame.diff.txt`) shows only the `frame` → `encodeTestFrame` rename at the declaration and every call site, nothing else.

## Claim 2 — report citations, no count in prose, pin description

**FAIL.** Evidence: `d7n-websocket-converge-fix-report.md` § W2 states "The siblings follow the same idiom, including the GUID, the remaining opcodes, ready states, and close codes, the payload cap, the control-frame cap, and the two timeouts." `the two timeouts` states a count of a growable set (`WEBSOCKET_CLOSE_TIMEOUT_MS`, `WEBSOCKET_FAIL_TIMEOUT_MS`) without naming its members, which `AGENTS.md` § Writing bans unconditionally ("**NEVER** state a count... Name the members, or write the sentence without the number"). The rest of the report's citations do match the tree the unit left (every quoted hunk in the report — W1 through W9 — matches `d7n-websocket-converge-fix.diff.txt` byte for byte, verified line by line), so this claim fails on the count sub-clause alone.

## Claim 3 — named corrections present

**PASS**, with evidence per sub-item:

- Hoisted `examples` binding: `d7n-websocket-converge-fix.diff.txt:628-652` (moved from inside `it` to the loop scope).
- The drop-in's two sentences (Ruling 13 amended): header line "The constants that follow are this package's own" (unchanged, already correct) and `INTERNAL` sentence "the assertion that follows it fails when a name here stops being stranded" (diff lines 619-624).
- Every constant's literal named in its description and `Shape` column headed (Ruling 18): `guides/websocket.md` diff lines 42-67 — each row carries `Shape` (`number`/`string`/`WebSocketReadyState`) plus its literal in the `Summary` cell (`0x01`, `1000`, `'13'`, `123`, etc.), and `src/server/constants.ts` diff lines 213-434 carries the same literals in every description paragraph.
- `Shape` column on `### Types` under Ruling 15's exact wording: `guides/websocket.md` diff line 80, verbatim match to Ruling 15's fixed sentence in `rulings.md:62`.
- `encodeTestFrame` renamed with the frame-naming description and no remaining `frame(` call: `d7n-websocket-frame.diff.txt` declaration hunk (`tests/setupServer.ts`) plus the successor report's `grep -rn '\bframe(' tests --include=*.ts` printing nothing.
- `"The error channels stay distinct"`: `guides/websocket.md` diff line 99, verbatim.
- The dependency sentence: `guides/websocket.md` diff line 10, verbatim match to the brief's W6 text.
- All-caps gone from `NodeWebSocket.ts` and `types.ts`: every emphasis instance the report lists (`SERVER`, `CLIENT`, `TEXT`, `PING`, `PONG`, `CLOSE`, `GRACEFULLY`, `CLOSED`, `OPEN`, `AFTER`, `EACH` in `NodeWebSocket.ts`; `ONLY`, `NO`, `MUST`, `NOT`, `DOMAIN`, `SERVER`, `UNMASKED`, `CLIENT`, `MASKED`, `AND` in `types.ts`) is present as a lowercased change in the diff, with every real token (`FIN`, opcode-code strings, `RFC`, `UTF-8`, `GUID`, `MCP`, `JSON-RPC`, `DOM`) left untouched.
- `on:` hook restored on both sides of the titled pair (Ruling 14): `guides/websocket.md` diff lines 104-111 (guide fence) and `src/server/factories.ts` diff lines 452-461 (regenerated `@example`), plus the executed transcription in `tests/guides.test.ts` diff lines 668-697 pinning the new fence shape.

## Findings outside the claims

- `d7n-websocket-converge-fix-report.md` § W2 also opens "Two decisions, recorded:" immediately followed by two named bullets — this states the number of a growable set (decisions) alongside naming its members, which is a narrower reading of the same count ban but not the clean violation cited above; recorded for completeness, not made a separate FAIL claim.
- `d7n-websocket-frame-report.md` carries no header stating engine, checkout, or committed tip (unlike the fix report's opening line), leaving the pin undescribed in that report; this is an observation about report completeness, not itself a scope or correctness defect, and outside the numbered claims.

VERDICT: FAIL 2
