Lane held: subjective (`reviewer`, Opus 5.5). The writer was `opus` on Opus 5.5, which is my own engine, so I attacked the naming and prose harder. Read-only: I ran nothing, and every reading of a proof rests on the retained logs under `/home/user/scaffold/.orkestrel/veneer/units/ebcl-instruments/r2/`.

## Verdicts

1. **The release maps: CONFIRMED.** `ebcl-2-btn-release.log.txt` lines 3–41 give every form and state as `appearance`, plus `outline-offset` under focus. That equals the fixed list the extraction script `ebcl-2-btn-release.py` (line 4) holds. Every form reads `veneer equals release: True`, and the raw log carries all the `EBCL2-BTN` rows. The `141.0.7390.37` version comes from the brief, not from the raw log.

2. **The reader: CONFIRMED.** `readFormDifferences` is at `/home/user/veneer-ebcl/tests/setupBrowser.ts:1897-1993`. Line 1920 selects the entry per form, line 1949 checks each entry, and a single `Error` carries every miss. Motion staging is at line 1931, the `finally` release at 1961-1964, and the custom-property filter at 1953. Each proof case in `tests/setupBrowser.test.ts` catches a different mutation:
   - **Plant versus control:** a reader returning `{}` breaks the planted expectation. Dropping the `--` filter adds `--vn-form-probe` to every state and fails.
   - **Motion:** staging rest reduced puts `outline-offset: 3px` into `rest`. Never staging empties `hovered` and `focused`. Skipping `releaseMedia` fails the `matchMedia` assertion. Each of these fails.
   - **Paired versus unpaired:** ignoring `paired` makes `paired` equal `alone`, and classing an unpaired counterpart puts the offset into `alone`. Each fails.
   - **Missed entry:** removing the check means no rejection. Throwing on the first miss names only one element, which the exact-message `toThrow` refuses.
   - **Cascade separation:** this is not visible here, because both cascades expect the same map. Claim 5's document-alone run D separates them.

3. **The `.btn` proof: CONFIRMED.** The guard is at `/home/user/veneer-ebcl/tests/src/styles/elements/button.test.ts:210-212` and the equality at 213-216. A grep for `BUTTON_FORM_DIFFERENCES` outside `node_modules`, `tmp`, and `dist` returns nothing. In `ebcl-2-plant-btn-leak.log.txt` every enabled form fails with an `AssertionError` showing `+ "opacity": "0.65"` (lines 45-56 and 66-283). The `disabled` form stays green because `.btn:disabled` and `.btn.disabled` already write `0.65` on both elements, which is a property of the chosen longhand, not a hole in the proof. A reader returning empty maps breaks the `appearance` guard.

4. **The reboot proofs: CONFIRMED.** Each partial's `@include button-reboot` (grep over `src/styles/components`) maps to its mirrored test file's closing `describe`, and `carousel.test.ts` holds the controls and the indicator (around line 632). `button.test.ts` keeps only the `.btn` `it.each` (line 197) and the nav-link case (line 216). `ebcl-2-plant-include.log.txt:76` shows `btn-close button reboot` failing with an `AssertionError` (a `rest` map of 30 longhands against 6). Only the close include was re-planted this round. The other seven kills hold by construction, because each case has the same body and calls the same reader.

5. **The default-moving plant: CONFIRMED.**
   - **Runs A and B:** in `ebcl-2-plant-both-default.log.txt`, both read green, and B prints `"width":"0px"` (line 100). The brief's rule was inert.
   - **Runs C and D:** C, with both cascades moved, reads `7 passed` (line 195). D, with the document alone, fails every enabled form with `AssertionError` at `button.test.ts:213`, the `+ outline-style/outline-width` diff (lines 273-426).
   - **Restore:** the restore is `IDENTICAL` (line 431).
   - **Mutation:** withholding the shadow-root copy of the rule is exactly D, and it reddens, so the assertion separates a default that moves one cascade from one that moves both.
   - **Shape against the Chromium 153 row:** the stand-in moves two longhands where the Chromium 153 row moves `outline-width` alone. A rule such as `.btn:active { outline-style: solid } a.btn:active { outline-width: 3px }` would match the row exactly. The oracle compares whole maps, so the count of moved longhands does not change what the proof shows.
   - **Cascade position:** an unlayered author rule outranks both cascades, as a user-agent default that neither cascade overrides would.

6. **R3: CONFIRMED.** The case is at `/home/user/veneer-ebcl/tests/setupStyles.test.ts` › `button reboot case table`. In `ebcl-2-plant-r3.log.txt:178-189`, deleting `dropdown-item` fails the case with an `AssertionError` (`- "dropdown-item"`). The sorted equality also catches the opposite direction, a case with no reset. The title says what the case proves.

7. **F1, F2, and claim 10: BROKEN.**
   - **What holds:** there are no `BUTTON_RETUNED_HOLDER_STYLE` sites left. The readings are named `buttonReading` and `counterpartReading` (lines 1970 and 1974). The holder TSDoc says "outside forced colors" (`tests/setupStyles.ts`, `BUTTON_REBOOT_HOLDER_STYLE`, around line 3251). Every sentence of the guide paragraph (`guides/veneer.md:10262-10282`) matches the code, including "no `:disabled` rule", the per-partial placement, and the reader.
   - **Failing input:** `/home/user/veneer-ebcl/tests/setupBrowser.ts:1883-1884` says, with no condition, that "The rest reading is taken with motion allowed". The code only skips staging for `rest` (line 1931), and the staging persists until the `finally` block. So `readFormDifferences(pair, ['hovered', 'rest'], holder)` reads `rest` with motion reduced, and nothing reports it. The `@param states` text (1862-1863) states the `disabled`-last obligation and omits this one.
   - **Why it matters:** this is an exported shared reader, and the sentence is false for an order its signature accepts.
   - **Reachability:** no current caller uses such an order, so the obligation is documented rather than enforced.
   - **Right looks like:** change `@param states` to "The states to read, in order. List `rest` first, because motion stays reduced from the first later state onward, and `disabled` last, because a disabled element takes no later drive."

8. **Shape and law: BROKEN.**
   - **What holds:** there is no nested function beyond anonymous callbacks passed directly. Members are readonly, and `FORM_ENTRIES` is frozen. There is no `as` beyond `as const`. `FORM_ENTRIES` and `readFormDifferences` are in the export list. The diff touches nothing else in either setup-browser file.
   - **Two terms for one concept:** the element of `BUTTON_REBOOT_CASES` and `BUTTON_FORM_CASES` is a "case" in the table name and in the refusal string. It is a "pair" in the type (`FormPair`, line 1793), the parameter (line 1898), and every binding. At `/home/user/veneer-ebcl/tests/src/styles/components/close.test.ts:226-228` one statement names the value `pair` and its absence `'No btn-close case'`. The carousel file does the same around lines 636-637.
   - **One term for two concepts:** "pair" also names the release's pairing of a `:disabled` rule with a `.disabled` rule, through the `paired` field and the `FORM_ENTRIES` keys. As a result, line 1920 reads `pair.paired ? 'paired' : 'unpaired'`, and every unpaired class is a `FormPair` whose `paired` is false. The reader proof's fixtures carry this too (`tests/setupBrowser.test.ts:1868-1877`, `const unpaired = {... paired: false}`).
   - **Why it matters:** this reader is the shared vocabulary every later button-form proof codes against.
   - **Right looks like:** rename `FormPair` to `FormCase`, following the `SanitizerCase` type at `setupBrowser.ts:2541` that types a `*_CASES` table. Name the parameter and the test bindings for the case rather than `pair`. `paired` then stays the only meaning of "pair" in the code: the release pairs a `:disabled` rule with a `.disabled` rule.

9. **Scope and gates: CONFIRMED.** `ebcl-2-status.txt` lists only `guides/` and `tests/` files, and `mixins.test.ts` is round 1's. `ebcl-2.diff` has no `src` hunk, and every plant log records an empty `git diff --stat -- src`. The format, check, lint-check, build-styles, styles-owned, setup-browser, setup-styles, test-guides, and test-policy gates each end in `exit=0`. Conformance ended `exit=1` with the timeout (`ebcl-2-test-conformance.log.txt:27-31`) and `exit=0` on the rerun (`ebcl-2-test-conformance-rerun.log.txt:13-17`), exactly as the claim states.

## Findings outside the claims

None.

## Attacked and held

- **Fit with the tenets:** the release map is read from `bootstrap.css` in the same browser under real input. That meets the "Derive compatibility expectations independently" and "rendered browser result decides" tenets. Values a class writes drop out on both forms, so Veneer's own look for each class stays free, and the "Elements visual reference" tenet holds.
- **Repeated reboot case bodies:** the same case body in seven files plus the carousel `it.each` is test registration plus assertions. `.claude/rules/tests.md` keeps both out of setup modules. The shared part that remains, the lookup by name, is one expression.
- **The nav-link case in `button.test.ts`:** it predates this unit and the brief keeps it there. The guide's closing sentence describes it truthfully.
- **Case titles:** each is named for what it proves. The `.btn` title's clause "where the form is enabled" covers the `disabled` form's rest-only reading.

## Observations (not findings)

- **The `veneer` key:** `FormComparison.veneer` (`setupBrowser.ts:1818`) names the package for a field that holds the document's cascade. In the reader's own proof that cascade carries no Veneer rules, and the proof's refusal still says "veneer counterpart focused". `document` would describe what the field holds. I rule this taste, not a defect.
- **Guide wording:** the guide says "A counterpart cannot be disabled, so it takes the release's `disabled` class". The TSDoc's "cannot be `:disabled`" is more precise.
- **The Chromium 153 row stays open:** this container runs only Chromium 141. The row closes only on a Chromium 153 run of the `.btn` proof.

## Referrals to the objective lane

- **`as const` on declared contracts:** `.claude/rules/typescript.md` § Types forbids `as const` on a value whose contract is already declared. It appears on `const states` (`tests/setupBrowser.test.ts:1835`), `BUTTON_FORM_STATES` (`tests/setupStyles.ts:3149`), and `BUTTON_REBOOT_STATES` (line 3257), and each value's contract is `readonly FormState[]`. Rule whether each value should carry that type annotation instead.
- **No negative control for the release-map extraction:** `ebcl-2-btn-release.py` compares longhand names only and never ran against a planted mismatch. Rule whether claim 1 needs one.

VERDICT: FAIL 7, 8; outside the claims: none
