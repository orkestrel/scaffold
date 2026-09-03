# Audit verdict — unit conform-terminal, round 2 (objective lane, Opus 5 substituting for the dark Sol bench)

## Numbered verdicts

**1. Every row applied / stopped / noop; no silent skip — CONFIRMED.**
The report's table (`/home/user/scaffold/tmp/units/conform/conform-terminal-report.md:10-29`) carries exactly the brief's row ids — `terminal-obj-2,3,4,5,6,7`, `terminal-subj-1,2,3,4,6,7,8,9,10,11,12,14`, plus `fleet-F1`, `fleet-F2`. No row stopped. `fleet-F1` `noop` verified: `isBrowserVuePath` returns no match anywhere in `/home/user/fleet/terminal`, and `tests/setup.ts` carries other exports, so the sole-export branch of the ruling does not fire. `fleet-F2` `noop` verified: no implementation class declares `readonly id: string` (`src/core/PromptClient.ts:62` declares `readonly url: string`, outside the row's trigger; the report records it as an observation).

**2. Each applied row implements the refuter's operative repair — CONFIRMED.**
Attacked each amended row at its site. `terminal-obj-2`: `src/core/constants.ts:2,40,55-69,92` imports `CSI`/`ESC` and builds `KEY_SS3`; `src/server/constants.ts:9,16-32` derives from console's `CSI` only. `terminal-obj-3`: server declares neither byte; `src/server/helpers.ts:136` uses `RETURN`, `src/server/Terminal.ts` uses `NEWLINE` throughout including the `:310` site the refuter added. `terminal-obj-4`: `src/server/types.ts:10,62` takes `StreamTargetInterface`; `src/server/Terminal.ts:46,111,124` narrows through `isStreamTarget`; `InputStreamInterface` stays local with the asymmetry stated at `:5-7`. `terminal-subj-6` recast Surface `Summary` cells only — `guides/terminal.md:424-433` `Behavior` cells stay imperative, as the refuter fixed.

**3. No old name survives — CONFIRMED.**
Re-derived independently. `\b(ESCAPE|KEY_CSI|CARRIAGE_RETURN|LINE_FEED|OutputStreamInterface|isOutputStream|moveUp|createScriptedTTY|createTwelveControlSchema)\b` over the whole tree returns one hit, `guides/database.md:111` (SQL keyword in a vendored mirror). `\b(inputReduce|passwordReduce|confirmReduce|selectReduce|checkboxReduce|editorReduce)\b|\*Reduce|reason: 'terminal'|reason === 'terminal'` returns nothing. Case-insensitive inflection sweep `\b(moveup|moves up|moved up|moving up|scripted ?tty|output ?stream|escaped|escaping|escapes)\b` leaves only English prose in owned paths — `guides/terminal.md:589` "the resolved output stream", `:1075` "scripted TTY". The report's § Sweeps names `src`, `tests`, `guides`, `README.md`, `package.json`.

**4. Failing-first proofs and old-form sweeps — CONFIRMED.**
The four behavioural rows carry captures that exist and read red then green: `terminal-obj-6` (`No test files found` → `2 passed`), `terminal-obj-7` (`1 failed | 7 passed` → `8 passed`), `terminal-subj-12` (`1 failed | 12 passed` → `13 passed`), `terminal-obj-5` (`1 failed | 51 passed` → `52 passed`). The fix round's own control is genuine: `/home/user/work/evidence/terminal-proofs/fix1-manager-red.txt:8-34` shows the new manager case failing on a planted `{ name: 'Grace' }` at `tests/guides.test.ts:533`, and `fix1-manager-green.txt:7` reads `60 passed (60)`. Each defect-naming test is in the diff. Placement, naming, and documentation rows carry the sweeps in § Sweeps.

**5. Guide parity — CONFIRMED.**
`guides/terminal.md` carries no `ESCAPE`, `KEY_CSI`, server `CSI`, `CARRIAGE_RETURN`, `LINE_FEED`, `OutputStreamInterface`, or `isOutputStream` row and no `#### OutputStreamInterface` table; the added export is documented at `:302` (`KEY_SS3`), the renames at `:340` (`renderCursorUp`) and `:252`/`:429` (`reason: 'target'`). `TerminalManagerInterface`'s table (`:422-433`) matches `src/core/types.ts:672-684` member for member, with `emitter`/`count` left in the Surface row. Every fence imports `@orkestrel/terminal`, `@orkestrel/terminal/server`, `@orkestrel/form`, or `@orkestrel/console`. `guides/README.md` names every mirror present under `guides/`. `§` over owned files returns only `src/core/errors.ts:3`, the permitted named-section citation.

**6. Breaking changes named with consumers and exact edits — CONFIRMED.**
`grep '@orkestrel/terminal'` over `/home/user/fleet/*/package.json` returns only `/home/user/fleet/toolbox/package.json:92`. Over toolbox, the only source hit for any removed or renamed name is `/home/user/fleet/toolbox/src/server/terminals/TerminalBridge.ts:136` (`result.error.reason === 'terminal'`), which the report gives verbatim under § Shared-file patches with its replacement. The remaining toolbox hits are all in `guides/terminal.md`, the byte-identical vendored mirror the report correctly routes to toolbox's next re-vendor rather than a hand edit. § Breaking names every removal, every rename, and both contract changes.

**7. Scope and no shims — CONFIRMED.**
`/home/user/work/evidence/conform-terminal.status` lists 30 paths, all under the brief's Owned set; `package-lock.json`, `node_modules`, `configs/**`, `.claude/**`, and the vendored `tests/setupPolicy.ts` / `policy.test.ts` / `config.test.ts` do not appear. No compatibility alias or re-export was added: the removed constants are deleted outright, and `src/core/index.ts` / `src/server/index.ts` are untouched star barrels. Added-line sweep for `as` assertions, `any`, `!`, `@ts-`, and `eslint-disable` returns only English prose false positives.

**8. First conjunct CONFIRMED; the deciding gate run NOT-EVIDENCED.**
Added-line sweep `^\+.*(\.skip\(|\.only\(|\.todo\(|\bretry\b|timeout:|testTimeout|hookTimeout)` over the diff returns only domain data (`{ id: 'agent', timeout: 30_000 }` snapshot fields at `:2165,2319,2320,2329,2330,2406,2408,3148-3150`) and prose ("the fence's retry loop", `:2115`). No test modifier, no inflated timeout. The report's § Gates names `format:check`, `lint:check`, `check`, `build`, `test`, each exit 0 with its capture file, and every named file exists. Per the brief, the independent gate reading is the Orchestrator's deciding run at landing: **NOT-EVIDENCED**, settled by the landing, and excluded from the terminal line.

**9. Nothing hidden; report matches the diff — CONFIRMED.**
No `TODO`, `FIXME`, `debugger`, or `console.*` on any added line; added commented-out-code sweep returns only `@example` import lines (`conform-terminal.diff:888-924,1282-1283,1337`) that `terminal-subj-10` owns. The Files-touched table lists exactly the 30 paths in the status file. I ruled the fix round's population statement myself against `guides/terminal.md`: every fence line whose comment claims a value has a case in `tests/guides.test.ts:258-626` — including the manager fence (`:926,927,933` → test `:533,537,557`), `prompt.pending()`/`pending(id)` (`:661,662` → `:280,284,292`), `result.error.errors` (`:667` → `:275-278`), `renderCursorUp` (`:1017` → `:596-597`), and `delete` on an absent id (`:963` → `:488`). The omitted lines fall inside the categories the header at `tests/guides.test.ts:1-7` names.

## Findings outside the claims

**F1 — banned substitution word introduced on a new line of published TSDoc.**
`/home/user/fleet/terminal/src/core/helpers.ts:786` reads `* @param indices - The currently ticked indices, in tick order`. It is a wholly new line (`/home/user/work/evidence/conform-terminal.diff:1156`) authored under `terminal-subj-9`. `.claude/rules/writing.md` § Substitutions rules `currently` → "Delete, or give the date", and `AGENTS.md` § Writing puts TSDoc under that rule. The word carries no information here: deleting it leaves the same meaning. This ships to consumers in `dist/`.
*Prescription:* change the line to `* @param indices - The ticked indices, in tick order`.

**F2 — document cross-reference by position on a line the unit rewrote.**
`/home/user/fleet/terminal/tests/guides.test.ts:2-3` reads `The constants below are this package's own`. The line is in the diff (`/home/user/work/evidence/conform-terminal.diff:1978`); the unit rewrote it to delete the count. `.claude/rules/writing.md` § Code tokens, references, and links: "Point to other material with `preceding`, `following`, `earlier`, or `later`, never with `above` or `below`." The fix round invoked that same sentence to strip a `below` from the block comment at `tests/guides.test.ts:255-257`, and left this one in the file it was rewriting.
*Prescription:* change the clause to `The constants that follow are this package's own`.

**Bounded:** every other `above` on an added line (`conform-terminal.diff:481,482,518,953,1865,1882`) is spatial — a rendered line's position on screen, or `at or above space` as a code-point comparison — not a document pointer, and is correct as written.

## Attacked and held

- **The header sentence at `tests/guides.test.ts:1-7`, re-derived independently against the guide.** I extracted every fence comment in `guides/terminal.md` and traced each value claim to a case. The attack that failed: looking for a value-claiming line still uncovered. The lines with no case — `:35-36`, `:89`, `:90`, `:612`, `:647`, `:672`, `:692`, `:693`, `:698-700`, `:740`, `:935` — each claim a TTY walk, an emission, a fill, a teardown, an ownership boundary, or a resolved default, which the header's rule excludes. `:935` (`manager.destroy()`) is a teardown and is asserted anyway at `tests/guides.test.ts:563-564`.
- **Transcriptions weaker than the fence they cite.** Checked `:808` (asserted as `'? Token › *'` plus `not.toContain('s')`), `:824` (wrapping proved by a second `reduceSelect`, `:406-410`), `:843` (both the in-progress and the committed line, `:438,442`), `:930` (both the live-broker and the store-restored branch, `:541,576-578`), `:933` (`true` and `false`, `:557-558`). None is weaker than its comment.
- **A live plant.** `grep 'Grace|yes/NO'` over `tests/guides.test.ts` returns nothing; the select expectation reads `'  ○ Admin'` (two spaces), matching the code the writer corrected to.
- **Adjacent behaviour that looks like the defect and is correct:** `src/server/helpers.ts:132` and `src/server/Terminal.ts:97` also carry `currently`, and `tests/guides.test.ts:114` carries `below` — all pre-existing, untouched by this diff, and outside F1 and F2.

## Referrals to the Orchestrator

- **R1 — `fleet-F2` under another field name.** `src/core/PromptClient.ts:62` declares `readonly url: string` ahead of every `#` field, which is the shape `fleet-F2` exists to repair, under a name the row's trigger does not match. The writer recorded it correctly as `noop` plus an observation. A fleet ruling is owed on whether the row's trigger is the field name or the shape.
- **R2 — the fix round's exclusion list is narrower than its own header.** The report's "Lines ruled out of the population" (`conform-terminal-report.md:242-248`) names `guides/terminal.md:612`, `:89`, `:90`, `:647`, `:672`, `:698-700`, `:740`, but not `:35-36` (the bare-return TTY-walk claim) or `:692`/`:693` (the two `// the default` option lines). The header's categorical exclusion covers all three, so I rule no claim broken; the record is incomplete against the fix brief's criterion 1 and the Orchestrator may want those three itemized before landing.

VERDICT: FAIL none; outside the claims: F1, F2
