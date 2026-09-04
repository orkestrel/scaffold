# Unit conform-codec — report

## Rows

1. **codec-obj-1** — `applied`. Created `/home/user/fleet/codec/tests/src/core/validators.test.ts`
   with the four moved blocks (`describe` at helpers.test.ts:195-204, :206-215, :812-851, :853-899)
   under the refuter's amended import list. Deleted `createHostileValues` from the `@orkestrel/test`
   import and `FOREIGN`, `FOREIGN_BYTES`, `HEX_MEMBERSHIP`, `MEMBERSHIP` from the `../../setup.js`
   import in `helpers.test.ts`, keeping `requireValue` and every surviving `is*`/`ILL_FORMED`/
   `OCTETS`/`TEXTS` use. Added a `tests/src/core/validators.test.ts` row to `guides/codec.md` § Tests
   beside the `helpers.test.ts` row.
2. **codec-subj-2** — `applied`. Replaced the vector `'AQ ID'` with `'AQ D'` in
   `guides/codec.md:305`, `README.md:76`, `tests/guides.test.ts:276`, and `tests/setup.ts` (the
   `MEMBERSHIP` row at the position of the old `'AQ ID'` row). Reworded the `'AAAA\n'` reason at
   `tests/setup.ts` to `'a trailing newline, refused at the length residue'`.
3. **codec-subj-3** — `applied`. Recast the thirteen verb-led Behavior cells in
   `guides/codec.md` (`encodeBase64`, `decodeBase64`, `encodeBase64URL`, `decodeBase64URL`,
   `encodeHex`, `decodeHex`, `encodeUTF8`, `decodeUTF8`, `encodeLatin1`, `decodeLatin1`,
   `encodeWindows1252`, `encodeUTF16LE`, `decodeUTF16LE`) as noun phrases, taking the Measures rows
   as the model; left every `is*`, `measure*`, and `decodeWindows1252` cell unchanged. In
   `README.md`, recast the file's own abridged wording in place at the same thirteen rows
   (`encodeBase64`, `decodeBase64`, `encodeBase64URL`, `decodeBase64URL`, `encodeHex`, `decodeHex`,
   `encodeUTF8`, `decodeUTF8`, `encodeLatin1`, `decodeLatin1`, `encodeWindows1252`, `encodeUTF16LE`,
   `decodeUTF16LE`) rather than copying the guide's cells verbatim, per the refuter's amendment.
   **Ancillary decision:** the brief's README recast list also names `:37` (`decodeWindows1252`),
   but that cell already reads "Identity for 0x00-0x7F and 0xA0-0xFF, the written-out high table
   between them; bytes 0x81, 0x8D, 0x8F, 0x90, and 0x9D are `undefined`" — a noun phrase, not
   verb-led, matching the guide's own untouched `:118` cell for the same function. Left it unchanged
   as already compliant with `.claude/rules/documentation.md` § Parity's TSDoc-voice rule; carrying
   on from this ancillary wording question per the deviation contract rather than stopping the unit.
4. **codec-subj-4** — `applied`. Renamed `kind` to `mutation` at `tests/setup.ts:275` (now
   `const mutation = (MUTANT_DRAWS[mutantCursor] ?? 0) % 3`) and its two readers (`mutation === 0`,
   `mutation === 1`), and reworded the comment at `tests/setup.ts:257` to "The draws per mutant are
   the mutation, the position, and the character, over every base."

## Fleet rows

- **fleet-F1** — `noop`. `tests/setup.ts` declares no `isBrowserVuePath`; grep for the identifier
  across `/home/user/fleet/codec` returns no matches. The workspace has no `src/browser`,
  `app/browser`, or `tests/setupBrowser.ts` either, consistent with the pattern's premise, but the
  helper itself is absent, so there is nothing to delete.
- **fleet-F2** — `noop`. Grep for `readonly id: string` across the package returns one hit, at the
  off-limits vendored `tests/setupPolicy.ts:2882` (a string literal inside a planted fixture, not a
  class field). `grep 'class '` under `src/` returns no files: the package ships no class. No
  implementation class in `/home/user/fleet/codec` carries the shape fleet-F2 targets.

## Files touched

- `tests/src/core/validators.test.ts` (created) — the four moved guard-family blocks under the
  refuter's amended import list.
- `tests/src/core/helpers.test.ts` — removed the four moved blocks and their now-unused imports
  (`createHostileValues`, `FOREIGN`, `FOREIGN_BYTES`, `HEX_MEMBERSHIP`, `MEMBERSHIP`).
- `guides/codec.md` — added the `validators.test.ts` Tests row; recast thirteen Behavior cells as
  noun phrases; changed the `decodeBase64('AQ ID')` fence to `'AQ D'`.
- `README.md` — recast the same thirteen Behavior cells in the file's own wording; changed the
  `decodeBase64('AQ ID')` fence to `'AQ D'`.
- `tests/guides.test.ts` — updated the transcribed assertion to `decodeBase64('AQ D')`.
- `tests/setup.ts` — updated the `MEMBERSHIP` whitespace row to `'AQ D'`, reworded the `'AAAA\n'`
  reason, and renamed `kind` to `mutation` with its comment and readers.

## Failing-first commands and counts

- **codec-obj-1**: planted a failing control at `tests/src/core/validators.test.ts` (a bare
  `expect(true).toBe(false)`), ran `npm run test:src`, captured
  `/home/user/work/evidence/codec-proofs/codec-obj-1-red.txt` — `1 failed | 157 passed (158)`. Then
  replaced the planted control with the real moved content and reran `npm run test:src`, captured
  `/home/user/work/evidence/codec-proofs/codec-obj-1-green.txt` — `2 passed (2)` files,
  `157 passed (157)` tests (same total as the pre-move baseline captured in
  `codec-obj-1-baseline.txt`).

## Sweeps

- `kind` inflection sweep, `grep -rniE '\bkind(s|ed|ing)?\b'` over `src`, `tests` (minus the
  vendored set), `guides/codec.md`, `guides/README.md`, and `README.md`: every hit is a permitted
  sense. `src/core/validators.ts:93,136,162` and `guides/codec.md:113` — the TSDoc phrase "a
  sibling view kind" and its mirrored guide cell. `README.md:9,28` and `guides/codec.md:66,93,109`
  — the `Kind` table-column header the parity suite locates by header text. `tests/guides.test.ts:171`
  — the foreign `symbol.kind` member of `@orkestrel/guide`'s `SurfaceSymbol`. `tests/setup.ts:636`
  — the prose "sibling view kinds". `guides/README.md` carries no hit.
- Old-vector sweep for `AQ ID` across the checkout (`*.ts`, `*.md`, excluding `node_modules`): no
  matches.
- Old-form sweep for the verb-led Behavior cells (`| Spells`, `| Reads back`, `| Writes each`,
  `| Inverts`) across `guides/codec.md` and `README.md`: no matches.
- Import-hygiene sweep for `createHostileValues`, `FOREIGN`, `MEMBERSHIP`, `HEX_MEMBERSHIP` in
  `tests/src/core/helpers.test.ts`: no matches (confirms the deletion list applied cleanly).
- `fleet-F1` sweep: `grep -rn isBrowserVuePath /home/user/fleet/codec` — no matches.
- `fleet-F2` sweep: `grep -rn "readonly id: string" /home/user/fleet/codec` — one hit, the off-limits
  vendored `tests/setupPolicy.ts:2882` (a fixture string, not a class field); `grep -rl "class " src/`
  — no files.

## Gates

1. `npm run format:check` — exit 0 (after formatting only the five touched files with
   `npx oxfmt --write` scoped to their paths, never tree-wide).
2. `npm run lint:check` — exit 0, no diagnostics.
3. `npm run check` — exit 0.
4. `npm run build` — exit 0.
5. `npm test` — exit 0. `test:src` 157/157, `test:policy` 111/111, `test:config` 46/46,
   `test:guides` 25/25 (all under this unit's own exec; the Orchestrator's deciding run is the
   authoritative reading per § Standing conditions).

Evidence files: `/home/user/work/evidence/codec-proofs/gate-format.txt`,
`codec-proofs/gate-lint.txt`, `codec-proofs/gate-check.txt`, `codec-proofs/gate-build.txt`,
`codec-proofs/gate-test.txt`, plus the per-row proofs named above.

## Breaking

None. Every row is non-breaking per its own heading, touches no published symbol's name or
signature, and the diff carries no `src/**` edit.

## Shared-file patches

None. No row required an edit outside `/home/user/fleet/codec`.

## Deviations

None that stopped the unit. One ancillary wording decision is recorded under codec-subj-3: the
brief's README recast list names `:37` (`decodeWindows1252`), but that cell already reads as a noun
phrase, so it was left unchanged rather than reworded, and the unit carried on per the deviation
contract's allowance for an ancillary wording question.

## Review evidence

- `/home/user/work/evidence/conform-codec.diff` — 521 lines, produced by
  `node /home/user/scaffold/tmp/work/evidence.mjs codec`.
- `/home/user/work/evidence/conform-codec.status` — 6 entries, same command; matches
  `git status --short`: `M README.md`, `M guides/codec.md`, `M tests/guides.test.ts`,
  `M tests/setup.ts`, `M tests/src/core/helpers.test.ts`, `?? tests/src/core/validators.test.ts` —
  every path under Owned, none under Off-limits.

## Fix round 1

Lanes: `/home/user/scaffold/.orkestrel/campaign/conform/units/l0-codec-objective-r1.md` (objective
lane, findings O-1 to O-3) and
`/home/user/scaffold/.orkestrel/campaign/conform/units/l0-codec-r1-checker-grok.result.md`
(checker's two referrals on the `kind` sweep's population).

- **Claim 5** — `guides/codec.md` `helpers.test.ts` Tests row. Before: "Beside the sweeps sit the
  written-out membership rows that bind each guard to its decoder, the hex rows that pin `isHex`
  and `decodeHex` to the same answer, the named vectors, the named measures on each face, the
  canonical refusals, the Base64 alphabets read against the specification in both directions, the
  hex alphabet read against the language's own radix conversion in both directions, and guard
  totality against hostile values." After: "Beside the sweeps sit the named vectors, the named
  measures on each face, the canonical refusals, the Base64 alphabets read against the
  specification in both directions, and the hex alphabet read against the language's own radix
  conversion in both directions." Ran `npx oxfmt --config .oxfmtrc.json guides/codec.md`; the
  paragraph held its rewrap unchanged. The validators row already carries the struck families and
  was left untouched.
- **O-1** — `guides/codec.md` `validators.test.ts` Tests row. Before: "the totality of both
  guardless directions". After: "the totality of the total Latin-1 decoder and of the guardless
  UTF-8 text side" (names the members the sentence tallies: `isLatin1`'s total decoder side and
  `encodeUTF8`'s guardless text side).
- **O-2** — report row **codec-subj-4**. Before: cited `tests/setup.ts:270` and `:252`. After:
  cited `tests/setup.ts:275` (`const mutation = (MUTANT_DRAWS[mutantCursor] ?? 0) % 3`, confirmed
  by direct read) and `:257` (`// The draws per mutant are the mutation, the position, and the
  character, over every base.`, confirmed by direct read).
- **O-3 and the checker's referrals** — report § Sweeps `kind` row replaced with the
  case-insensitive inflection sweep `\bkind(s|ed|ing)?\b` over `src`, `tests` (minus the vendored
  set), `guides/codec.md`, `guides/README.md`, and `README.md`, re-run directly: hits at
  `src/core/validators.ts:93,136,162` and `guides/codec.md:113` (TSDoc phrase "a sibling view
  kind" and its mirrored guide cell), `README.md:9,28` and `guides/codec.md:66,93,109` (`Kind`
  table-column header the parity suite locates by header text), `tests/guides.test.ts:171`
  (foreign `symbol.kind` member of `@orkestrel/guide`'s `SurfaceSymbol`), `tests/setup.ts:636`
  (prose "sibling view kinds"). `guides/README.md` carries no hit. Every hit is a permitted sense.

**Rulings**: R-1 stands — the writer's departure at `README.md:37` stands as already compliant;
the refuter's enumeration was over-inclusive. R-2 — the ungated `reason` field is a next-matrix
row the Orchestrator records; not carried by this unit.
