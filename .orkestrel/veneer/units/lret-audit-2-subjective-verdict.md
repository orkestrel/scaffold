Lane held: **subjective** (`reviewer` on Opus 5.5). I made no ruling on correctness, constraints, timing, or kill mechanics. Where a claim depends on one of those, I rule it UNRESOLVED and refer it to the objective lane. Line numbers refer to the committed worktree `/home/user/veneer-lret` at `23b659b`. Diff lines refer to `/home/user/scaffold/.orkestrel/veneer/units/lret-instruments/r2/lret-2.diff`.

## Numbered verdicts

**1. UNRESOLVED.** The claim is mainly about correctness, which belongs to the objective lane. The parts in my lane hold.
- **Setting names hold.** `base`, `font`, `block`, `color`, `direction`, `root`, and `viewport` are single words, and each names the context it varies (`tests/setupServer.ts:858-915`).
- **The pin holds.** The pin at `tests/setupServer.test.ts:662-682` asserts that each non-base setting changes exactly one context. That makes the names checkable.
- **The parent reading reads plainly.** The guide describes it as "a parent that sets the property itself, so an `inherit` reads a second parent value" (`guides/veneer.md:7556-7558`), which is one idea a consumer can follow.
- **What would settle it.** Executed readings of the candidate pairs in R1.

**2. CONFIRMED.**
- **Scope and mode.** The `mode === undefined` branch pushes both a light site and a dark site, and the dark site's selector is written after `[data-bs-theme=dark]` (diff:1884-1894). The written-text fallback compares the text where both sides resolve empty (diff:1904-1914). A witness now needs `var(<token>)` alone to resolve alike (diff:1962-1979).
- **Ruling 2 landed.** Only the inset declaration moved to px (`src/styles/_tokens.scss:445`), and `--vn-shadow-1` to `-3` keep rem (`guides/veneer.md:7268-7270`). Conformance is green with the `root` setting present (`lret-conformance.log.txt:13,17`), so the inset keeps its witness under every setting.
- **Mutations, and whether the assertions tell them apart:**

| Mutation or plant | What it does | Log evidence | Tells it apart? |
| --- | --- | --- | --- |
| `scoped-once` | Drops the dark push for an unscoped site | `lret-mutation-scoped-once.log.txt:1242-1243`: `expected [] to deeply equal [ Array(1) ]` | Yes |
| (the scoped case's second expectation) | Would also compare a dark-scoped site with the light cell | Not run | Yes: the expected `[]` would gain a `blue`/`red` line |
| `empty-alike` | Disables the text comparison | `lret-mutation-empty-alike.log.txt:1220-1221` | Yes |
| `witness-row` | Resolves the row's own value instead of the token | `lret-mutation-witness-row.log.txt:1220-1221` | Yes: `--vn-radius-pill` drops out |
| `pill` plant | The token and its cell at `40rem`, the alias through arithmetic | `lret-mutation-plant-pill.log.txt:281-282`, naming `--vn-radius-pill` | Yes |

**3. CONFIRMED.**
- The hook pushes each repaint's `undecided` list (diff:232-243).
- The case expects `[[], []]` (diff:258-260).
- **Mutation `rungs-dropped`** fails that case with `expected [ [ …(18) ], [ …(3) ] ] to deeply equal [ [], [] ]` (`lret-mutation-rungs-dropped.log.txt:1146-1147`).
- **Mutation deleting `undecided.push(repaint.undecided)`** (not run) would leave `repainting` as `[]`. `toEqual([[], []])` rejects that, so the assertion tells it apart.

**4. CONFIRMED.**
- **`nested`.** An adjective that reads as an assertion. The TSDoc (`tests/setupServer.ts:~255-258`) defines the first element (true, because it sits inside the body) and the sibling case (false). The `nested-flip` mutation fails "builds one element per compound…" (`lret-mutation-nested-flip.log.txt:1220-1221`). The case's literal `nested` values tell the flip apart.
- **`inferScopeMode`.** Follows `infer*` = derives, and returns the mode or `undefined`. The `mode-siblings` mutation reads `['dark','dark','dark','dark']` against the expected `[undefined, undefined, 'dark', 'dark']`, so it is told apart.
- **`extractMatchedCompound`.** Follows `extract*` = extracts structure. The `pseudo-kept` mutation reads `'.btn:hover::after'` against `'.btn'`.
- **The other new symbols.** `ResolverSetting` follows `{Entity}{Noun}`. `RESOLVER_SETTINGS`, `PARENT_VALUES`, and `UNVARIED_FUNCTIONS` follow `{QUALIFIER}_{NOUN}`. All are exported and pinned (diff:294-355, 363-393).
- **Retirements.** A grep of `/home/user/veneer-lret` finds no `normalizeDeclaration` or `matchesDarkScope`.
- **The resolver case** pins `150ms`/`0.15s` alike, `15%`/`15.0%` alike, and `15%`/`16%` apart (diff:465-487). The `syntax-time` mutation kills it (`lret-mutation-syntax-time.log.txt:1222`).
- **"Setting" and "context" read as one vocabulary.** A setting is one value of the context a term reads: `ResolverSetting` says "one setting of the context", and the case title says "every context their terms read".
- **PARENT_VALUES entries.** Whether each entry beyond `1px` is proved goes to R3.
- **Non-blocking design notes:**
  - The resolver finds the `base` setting by position, not by name. `RESOLVER_SETTINGS` is typed `Readonly<Record<string, ResolverSetting>>` (`tests/setupServer.ts:858`), and three places rely on `base` being the first key of the first pass: `parent: pass === 0` (:4160), `scopes[0]` (:4040), and `hosts[0]`. Reordering the keys would silently move the parent reading and the same-text short circuit onto another setting. The test has to write `expect(base).toBeDefined()` and `base?.host` (`tests/setupServer.test.ts:662-663`). Key the type by its literal names, or hold `base` as its own field, so that the name carries the meaning.
  - `inferScopeMode` inverts the guide's phrase "mode scope", and the result is a mode, not a scope. `inferSelectorMode` or `inferMode` would name the result.

**5. CONFIRMED.**
- **The member drift.** `lret-conformance-drift3.log.txt:66-73` prints exactly the `.col-form-label`, `.display-1` to `.display-6`, and `legend` `font-size` rows as `retuned`. Lines 94-101 print the same rows as stale `tokenized`. The guide applies them (diff:104, 113-133, 142).
- **The whole table.** The final conformance run is green (`lret-conformance.log.txt:13,17`), so every `Departure` cell equals the gate's member.
- **The three named rows.** `.accordion` reads `tokenized` (`guides/veneer.md:7599`), and `theme` `--bs-primary` reads `retuned` (:9939). The `.btn` `--bs-btn-font-size` row is asserted by the same green case.
- **The rows read true to a consumer:**
  - `.col-form-label`: the release's `inherit` follows the label's parent and Veneer's token does not. A consumer whose container sets another font size sees the difference, and the guide sentence at :7559-7561 says so in terms they can act on.
  - `display` and `legend`: Veneer's size works out to `1.625rem + 3.375rem·(100vw/1200px)` against the release's `1.625rem + 4.5vw`. The two are the same at a 16px root and diverge at any other root, at every window width below 1200px. So "agree only at a 16px root font size" (:7561-7563) is true.
  - A consumer who changes only the window sees no difference, and the sentence implies that. "Viewport share" is a coined term, but it reads on the first pass.
- **The legend's `th` sentence and the preamble read as one decision.** The member compares computed values in every setting. The preamble explains why contexts vary, and the legend states the rendered consequence for the one row where computed text differs but pixels agree.

**6. UNRESOLVED.**
- **The kills in my lens hold.** Each syntax-removal log shows the removed syntax's pair turning `undefined` against the expected object: `lret-mutation-syntax-number-list.log.txt:1220-1231`, `-length-percentage-list:1220-1235`, `-time:1251-1266`, `-angle:1221-1236`, and `-color:1221-1236`. The assertions tell each removal apart.
- **`Object.keys(inputs)` equals `Object.keys(PROBE_SYNTAXES)`** (diff:516), which binds any future syntax to an input.
- **The brief's question: is the removal the right shape?** Yes. It is stronger than the brief's literal wording. "An input only that syntax accepts among those tried before it" could be met by `<length>` with `1px`, yet removing `<length>` would still pass, because `<length-percentage>+` computes `1px` the same way. A table entry whose removal cannot change a result is machinery nothing proves, and removing it is the simplification the design laws ask for.
- **This rests on the report's equivalence statement** (the `PROBE_SYNTAXES` TSDoc, diff:1027-1031). That statement needs an executed reading (R2). Until then, the separate ruling it asks for stays open.
- **Kill mechanics and byte-identical restores** belong to the objective lane.
- **The probe-syntax case's name** is finding F2.

**7. UNRESOLVED.** Timing is objective (R4). The only evidence for which runs came after the same-text short circuit is the writer's report.

**8. BROKEN.**
- **Input.** § Reference map (`guides/veneer.md:7060-7061`) says: "A stated value and a declaration that both resolve to nothing, as an `inherit` and an `initial` do, compare as the text they write." The `scanCanonicalValues` TSDoc repeats it (`tests/setupServer.ts:4382-4383`).
- **Why it is false.** An `inherit` resolves to nothing only where its parent carries no value. `#substitute` builds the subject under `body` and reads `getComputedStyle(subject).getPropertyValue(token)` (diff:1797-1829). A component redeclaration such as `.btn { --vn-space-3: inherit }` therefore resolves to the `:root` value, not to nothing, and the scan compares resolved values, not text. A reader who trusts the sentence models the gate wrongly for every non-root `inherit`.
- **Smallest fix.** Write "as an `initial`, or an `inherit` at `:root`, does" in both places.
- **What holds:**
  - The 8-bit color sentence (:7057-7060).
  - § Outside the ledger's order and canonical sentence (:10610-10621).
  - The legend's `retuned` sentence and the `th` example (:7578-7581).
  - The witness sentence (:7589-7593).
  - The `pre` and `kbd` example (:7564-7567).
  - The `<length-percentage>+` example (:7568).
  - § Tests (:11424-11442), which is incomplete but not false (note 5).
- **Other sentences.** A grep for `1000px`, `neutral page`, `at the release value`, `<length>`, and `custom-ident` finds no other sentence that the change made false.

**9. CONFIRMED.**
- `lret-2-status.txt` lists `guides/veneer.md`, `src/styles/_tokens.scss`, `tests/conformance.test.ts`, `tests/setupServer.test.ts`, `tests/setupServer.ts`, `tests/setupStyles.test.ts`, and `tests/setupStyles.ts`. All are owned by `ledger-retune-brief-2.md` or `ledger-retune-brief-3.md`.
- The only `src/**` hunk is the inset declaration (diff:198-209).
- Every named gate log in `lret-instruments/r2/` ends in `exit=0`: check, lint-check, format-check, setup, build-src, build-src-styles, conformance, tokens, guides, policy, and src-styles.

## Findings outside the claims

**F1. The `Resolution` TSDoc omits the parent reading, and a pinned case contradicts it.**
- **Where.** `tests/setupServer.ts:215-220`.
- **What is wrong.** The TSDoc says a `Resolution` carries "the two values of the first setting the sides compute apart in, or the `base` setting's two values". The case at `tests/setupServer.test.ts:3947` (`line-height`, `inherit` against `normal`) pins `{ recorded: '1px', emitted: 'normal' }` (:3974). No `RESOLVER_SETTINGS` setting sets `line-height`. The `1px` is `PARENT_VALUES[0]`, taken in the parent reading that `#compute` appends last (diff:1523-1525).
- **Why it matters.** A reader of the type cannot tell where a value like `1px` came from. It is the one contract every departure member is decided from.
- **What right looks like.** Write "the two values of the first reading the sides compute apart in, each setting in order and then, for a regular property, the parent reading; or the `base` setting's two values where every reading computes alike".

**F2. The probe-syntax case is named for the control that specified it, not for what it proves, and the title is hard to parse on the first read.**
- **Where.** `tests/setupServer.test.ts:3897`: "types a custom property through each probe syntax an input no syntax tried before it parses".
- **What is wrong.** The title restates the brief's input condition. The case proves that each syntax decides a pair no other probe decides, so removing any syntax turns its pair undecided, and that each syntax's two registrations compute apart. The brief requires "a test is named for what it proves rather than for the control that specified it".
- **What right looks like.** For example: "decides through each probe syntax a pair no other probe decides, and tells each syntax's two initial values apart". Update the case pattern in the mutation table (`lret-mutation.py:37-41`) to match.

## Attacked and held

- **`ContextElement.compound` against `selector`.** `compound` holds the reduced selector, such as `'*'` for `:root`. `selector` would collide with the site's `selector`. `compound` pairs with `extractMatchedCompound`'s "matched compound", so it holds.
- **The `nested: true` convention for the first element** is stated in its TSDoc and pinned. It holds.
- **Setting names against their members.** `RESOLVER_SETTINGS.root.root` and `.viewport.viewport` read as "the setting that changes `root` sets `root`". They are consistent, not a collision.
- **The `retuned` rows against the tenet "Let the rendered browser result decide UI correctness"** (`ROADMAP.md`). Each changed row renders differently at some root font size or with some parent, and the guide says under which condition. That holds.

**Non-blocking voice notes:**
1. The § Departures preamble runs from :7546 to :7571 and mixes mechanism, settings, three row rationales, undecided pairs, double writes, and probes. It would read more easily as three paragraphs: mechanism; settings with the row rationales; site and probe rules. The `th` rationale also sits apart from the others, in the legend.
2. "The containing `block`", "the `color`", and "the `viewport`" (:7555-7556) put setting keys into ordinary noun phrases. "The `font`, `block`, `color`, `direction`, `root`, and `viewport` settings, each changing one context" names them as the code does and reads once.
3. The guide gives no reason why `--vn-shadow-inset` is in px while the elevation rungs are in rem (:7271, :7277-7279). One clause would do: "the inset keeps the release's px, so it does not scale with the root size".
4. The "writes the part of a compound…" title says "without its state", but the helper also drops `:not()` and structural pseudo-classes.
5. The § Tests helper sentence (:11435-11442) does not list the notation case or the empty-text canonical case.

## Referrals (to the objective lane)

- **R1 (claim 1).** Two candidate pairs whose difference the construction might hide, neither run:
  - `1cqw` against `1vw` on a length property. No setting creates a query container, so `cqw` falls back to the small viewport.
  - `1ex` against `0.5em`. The x-height depends on the font family, which no setting varies.

  If either reads alike rather than undecided, claim 1 breaks, and so does the guide's "A pair whose value reads a context no setting varies … is undecided" (`guides/veneer.md:7563-7564`).
- **R2 (claim 6, the separate ruling).** Resolve the custom-property pair `SERIF` against `serif`, and `Monospace` against `monospace`. The removed `<custom-ident>` keeps case. `font-family` may write a generic family in lowercase. If they read alike, the TSDoc statement "an identifier [computes] the same under the `font-family` property" is false.
- **R3 (claim 4).** Remove any `PARENT_VALUES` entry other than `1px` and report which case fails. Only the no-parent mutation (which disables the whole reading) and the `1px` expectations bind the list in the setup project.
- **R4 (claim 7).** `lret-instruments/r2/probe/timing.txt` lines 2-4 read 11671, 10570, and 8863 ms at load 13.9-14.3. The report explains only line 1 (before the short circuit) and lines 5-8. If lines 2-4 ran after the short circuit, 11671 ms exceeds the 9950 ms base behind `LEDGER_TIMEOUT = 24_900`.

VERDICT: FAIL 1, 6, 7, 8; outside the claims: F1, F2
