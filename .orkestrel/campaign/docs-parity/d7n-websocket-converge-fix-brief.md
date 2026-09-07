# Brief — `d7n-websocket-converge-fix` (websocket's fix round on the audit's findings)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/websocket` from the committed tip `f28272b` (clean; the final guide head start installed `--no-save`, `dist/src/core/index.js` sha256 `b6dae38c…`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-websocket-converge-fix/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing and § Design laws (module helpers as `{verb}{Noun}`); `/home/user/scaffold/.claude/rules/names.md`; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 12, § Ruling 13 and its amendment, § Ruling 14, § Ruling 15, § Ruling 18; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-slice5-audit-verdict.md`; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-websocket-prep-report.md:185-203` (the baseline constant cells); `d7n-websocket-converge.diff.txt:410-417` (the deleted `on:` line); the pilot's suite `/home/user/fleet/abort/tests/guides.test.ts` whole and its Types table `/home/user/fleet/abort/guides/abort.md:58-67`; `/home/user/fleet/budget/guides/budget.md:60-68`.

## Items

1. **The drop-in (W1).** `tests/guides.test.ts`: hoist the mapped `examples` out of the `it` body (`:228-234`) to the examples loop's scope beside `documented`, matching the pilot byte for byte; line 2 reads "The constants that follow are this package's own"; the `INTERNAL` sentence reads the pilot's. Show the diff against the pilot from `describe(` on.
2. **The constants' literals (W2, Ruling 18).** Each constant's description paragraph in `src/server/constants.ts` names its literal (`Names the text frame opcode, 0x01.`; `Names the connecting ready state, 0.`; `Names the normal-closure status code, 1000.`; `Names the supported protocol version, '13'.`; `Names the maximum UTF-8 close-reason length after the two-byte status code, 123.`, and every sibling the prep report's baseline cells carried), then `--to guide`; the `### Constants` table heads `Shape` with the declared type under Ruling 12's constants sentence.
3. **The `Shape` column (W3, Ruling 15).** `### Types` (`guides/websocket.md:100-110`) heads `Shape` between `Kind` and `Summary` under Ruling 15's one wording; each interface row's data members as bare names with `?`, `plus` its call-signature members (read `src/server/types.ts`); each alias's own literal with `\|`; a description that is only a member list is rewritten to state what the type represents.
4. **The `frame` helper (W4).** Rename `tests/setupServer.ts`'s exported `frame` to `encodeTestFrame` and update every call site under `tests/src/**`; its description reads "Encodes one RFC 6455 frame for tests, optionally clearing FIN for fragmentation cases." (the package's `message` is the payload reassembled across frames, so the description names the frame). Those files are granted for the rename and that block alone.
5. **The count (W5).** `guides/websocket.md:136` "Two error channels stay distinct" → "The error channels stay distinct" naming the two the sentence already names.
6. **The dependency sentence (W6).** `guides/websocket.md:8`: "its only runtime dependency is `@orkestrel/emitter`, which supplies the typed emitter; `node:crypto` supplies the one handshake hash."
7. **All-caps in the blocks (W7).** `src/server/NodeWebSocket.ts:50-57` (`SERVER`, `CLIENT`, `TEXT`, `PING`, `PONG` as emphasis), `src/server/types.ts:97`, `:121-129` → plain wording (a real token such as an opcode name stays); sweep every owned block once more.
8. **The titled pair (W8, Ruling 14).** Restore the `on: { message: … }` construction hook to the guide fence at `:190-194` (the converge diff shows the deleted line), re-run `npm run docs -- --to source` so `createNodeWebSocket`'s block carries the fuller demonstration; extend any executed case that pins the fence.
9. **Propagation.** `npx oxfmt --write <paths>`; `--to guide` after any description edit; `npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at `written: 0`.

## Scope

Owned: `guides/websocket.md`, the doc blocks under `src/server/**` (no code token moves), `tests/guides.test.ts`, and for item 4 only `tests/setupServer.ts`'s `frame` declaration with its doc block and the call sites under `tests/src/**`. Off-limits: everything else, including `README.md`, every vendored file, `package.json`, `package-lock.json`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. `npx oxfmt --check <owned paths>`, `npx oxlint --config .oxlintrc.json --deny-warnings tests src/server`, `npm run check` exit 0.
3. `npm run docs` at zero; both directions `written: 0`.
4. `grep -nE '0x01|1000|1002|1003|1007|1009|123' guides/websocket.md` reads the literals in their cells; the convention sentence's Ruling 15 wording above `### Types` and above `### Constants` (its constants sentence); `grep -n '| interface *| `{[^`]*:' guides/websocket.md` prints nothing; `grep -n 'Two error channels\|third-party' guides/websocket.md` prints nothing; `grep -rn '\bframe(' tests` prints nothing; the drop-in diff against the pilot is empty or an appended case.
5. `npm run test:guides`, `npm run test:policy`, and `npm run test:src:server` exit 0 (record the summaries; the host is under load — report a timing red with its reading).

## Output

`/home/user/scaffold/tmp/units/d7n-websocket-converge-fix-report.md`: per item the hunk, per criterion the command and its last lines, the wall clock. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on a gate outside the owned files going red, a `Shape` cell Ruling 12 cannot express, or a rename that reaches a file outside the granted set. Decide ancillary matters and record them.
