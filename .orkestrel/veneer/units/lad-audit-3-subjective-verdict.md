# LEDGER-ADDITIONS audit round 3: subjective-lane verdict

**Lane:** I held the subjective lane, as `reviewer` on Opus 5.5 in a clean context. I edited nothing and ran nothing. Claims 3 and 4 test wording that my own engine prescribed in round 2: the summary text in finding N1 came from the round-2 subjective lane, and so did the reason in claim 7. Because of that, I attacked those two claims hardest. Every `file:line` citation is to `/home/user/veneer-lad` or to `/home/user/scaffold/.orkestrel/veneer/units/`.

**Dispatch note:** the brief points at `lad-audit-3-claims.md` for the law and the Tenets. I read the Tenets in `/home/user/veneer-lad/ROADMAP.md` at line 10. No tenet applies to a test-infrastructure reader beyond verification discipline.

## Numbered verdicts

1. **CONFIRMED.** The code matches the claim.
   - **The code:** `tests/setupServer.ts:1886` records the latest non-literal colon. Line 1888 decodes the name through `readIdentifier`. Line 1892 requires `name.end === step.index`, and line 1893 compares `name.text.toLowerCase()` with `is` and `where`.
   - **The escaped spelling decodes correctly.** `readIdentifier` (`tests/setupStyles.ts:436-457`) decodes `\77 ` to `w`, which lets the identifier end at the `(`. The case asserts the escaped spelling at `tests/setupServer.test.ts:2922`.
   - **Red before the fix:** `lad-3-red.log.txt:11,24,33` shows `AssertionError: expected [] to deeply equal [ 'nav-link' ]` on that assertion, with 1 test failed.
   - **Mutation (planted):** restore `/:(?:is|where)$/iu`. `lad-3-plant-escaped.log.txt:17,30,39` shows the escaped assertion failing alone with an `AssertionError`. The `:WHERE(.upper)` assertion still passes under the `iu` flags, so only the escaped assertion tells this mutation apart. It does. The file was restored (`:44` shows `cmp=identical`).
   - **Mutation (derived):** drop `.toLowerCase()`. The `:WHERE(.upper)` assertion at line 2921 fails, so the case tells it apart.
   - **Mutation (derived):** add `not` to the list. The `:not(.disabled)` assertion at line 2915 fails, so the case tells it apart.
   - **Mutation (derived):** replace `name?.end === step.index` with `name !== undefined`. No assertion in the case tells this apart; see Referral A. This does not break the claim, because the claim states what the code requires, and it does.

2. **CONFIRMED.** Nothing else moved.
   - **Conformance pass line:** the conformance line is `Tests  29 passed (29)` in both `r2/lad-2-test-conformance.log.txt:12` and `r3/lad-3-test-conformance.log.txt:12`.
   - **The gate can fail:** `lad-2-plant-where-dropped.log.txt:84` shows it going red (`1 failed | 28 passed`) when an `:is()` or `:where()` attribution changes. A matching pass line therefore rules out that class of change.
   - **The reading case:** it passes with every other assertion unchanged (`lad-3-setup.log.txt:7`).
   - **The round diff:** each hunk in `lad-3-round.diff` falls within an Item's lines:
     - Item 4: `@param` at diff line 8.
     - Items 1 and 2: the reader's TSDoc and body at lines 16-66.
     - Item 2: `attributeSelector`'s TSDoc and call at lines 73-83.
     - Item 2: the test import and export list at lines 93-115.
     - Items 1 and 2: the reading case at lines 121-148.
     - Item 3: the guide at lines 157-169.
   - **Formatter wrap:** the four-line wrap of the `:is(.alpha, .beta)` assertion comes from oxfmt after the longer name. It sits inside the owned reading case.

3. **BROKEN.** The name `collectMatchingClasses` does not tell a consumer what the reader returns, and it is less true for `':is(.alpha, .beta) > .gamma'` than for `':where(button.nav-link)'`.
   - **Plain reading fails:** "matching classes" most naturally means the classes an element matching the selector carries.
     - For `:where(button.nav-link)` that holds: the matched element carries `nav-link`.
     - For `:is(.alpha, .beta) > .gamma` it fails. The reader returns `alpha` and `beta` (`tests/setupServer.test.ts:2916-2920`), which sit on the parent, and no element needs both.
   - **The writer's own reading also fails:** the report (`ledger-additions-report-3.md:13`) defines the word as "the classes of the selector the rule matches through". That makes the parent classes true, but it also covers `.row` in `.item:nth-child(2 of .row)`, because an element matching `:nth-child(An+B of S)` must itself match `S`. The reader returns only `['item']` (`tests/setupServer.test.ts:2927`).
   - **The only reading true for all pinned inputs is a pun.** It relies on `:is()` having been drafted as `:matches()` (report line 14-15). That is jargon. `.claude/rules/names.md:8` says a consumer can predict a name without documentation, and line 113 says to avoid jargon.
   - **The pair does not tell the readers apart.** Neither `collectMatchingClasses` nor `collectSelectorClasses` tells a consumer which one reads through `:is()`.
   - **What held:** the name avoids `subject`. `collectSubjectClasses` appears at no site outside `node_modules` (a Grep of the worktree finds only `collectMatchingClasses`). The report's case against round 2's `collectRequiredClasses` also holds: `:is(.alpha, .beta)` requires neither class.
   - **Smallest correct fix:** rename the reader for what it is, the classes that attribution reads a selector by.
     - **Recommended:** `collectAttributionClasses`. It is true for every input by definition, and the TSDoc carries the detail.
     - **Sites to change:** `tests/setupServer.ts` at lines 1812, 1876, 1879, 2452, and 2472, and `tests/setupServer.test.ts` at lines 59, 531, and 2915-2930.
     - **Gate:** `npm run test:policy`, whose `surface` rule checks the name against the fleet.
     - **Rejected alternative:** keep the name and define "matching" in the TSDoc. The name would still need documentation to predict, which fails `names.md:8`.
   - **Seam status:** this is the seam's third round, so the Orchestrator rules on it.

4. **BROKEN.** The summary sentence contradicts the function's own `@example` and `@returns`.
   - **What holds:** `@param classes` at `tests/setupServer.ts:1812` links the renamed reader. The first remark (lines 1862-1868) gives the ruled reason, states the any-compound reading, and is true (line 2916). The second remark (lines 1870-1871) is true (lines 2921-2922).
   - **What fails:** the summary at `tests/setupServer.ts:1854` says "Collects every class a selector writes, reading through `:is()` and `:where()` arguments."
     - In this module's own words, a `:not()` argument writes classes. The remark at line 1864 says "none a `:not()` or a `:has()` argument writes".
     - So `':where(button.nav-link):not(.disabled)'` writes `.nav-link` and `.disabled`.
     - The reader returns `['nav-link']`, as the `@example` at line 1876 and the case at `tests/setupServer.test.ts:2915` both state.
     - The `@returns` block at lines 1858-1859 says a `:not()` class "is not returned". The summary and the `@returns` block disagree.
   - **Rule broken:** `.claude/rules/typescript.md:78` says the first sentence states what the symbol does.
   - **Origin:** the brief prescribed this summary verbatim (`ledger-additions-brief-3.md:66`), taking it from round 2's subjective N1. The writer followed the instruction; the defect is in the prescription.
   - **Smallest correct fix:** at line 1854, write "Collects every class a selector writes at its own level or inside an `:is()` or a `:where()` argument." It opens with a third-person `-s` verb and does not name the symbol.

5. **CONFIRMED.** The guide carries the ruled reason verbatim.
   - **Verbatim:** `guides/veneer.md:10070-10072` matches `ledger-additions-brief-3.md:69-70` word for word.
   - **Rewrap:** comparing the old text (`lad-3-round.diff:157-162`) with the new (`guides/veneer.md:10072-10077`) shows every other word kept, from "It reads no class" through "no key opens its name. The".
   - **Attack that failed:** I checked whether the reason is false for any shipped `:where()` rule, including the complex `:where(.carousel-indicators [data-bs-target])`. It is not, because that argument is part of the selector the rule matches through.
   - **Voice note, not a defect:** the `while` clause explains `:not()` and `:has()` one sentence before "It reads no class inside a `:not()` or a `:has()` argument", which then partly repeats it.

6. **CONFIRMED.** Every gate exited 0 in `r3/`. The commands are the ones `lad-3-gates.sh:12-18` names.

   | Gate | Log | Result |
   | --- | --- | --- |
   | Scoped oxfmt check | `lad-3-oxfmt-owned.log.txt` | "All matched files use the correct format", exit 0 at `:4-6` |
   | `npm run check` | `lad-3-check.log.txt` | exit 0 at `:30` |
   | `npm run lint:check` | `lad-3-lint-check.log.txt` | exit 0 at `:6` |
   | Setup file | `lad-3-setup.log.txt` | 118 passed, exit 0 at `:7,11` |
   | `npm run test:conformance` | `lad-3-test-conformance.log.txt` | 29 passed, exit 0 at `:12,16` |
   | `npm run test:guides` | `lad-3-test-guides.log.txt` | exit 0 at `:16` |
   | `npm run test:policy` | `lad-3-test-policy.log.txt` | `109 passed \| 1 skipped`, exit 0 at `:12,16`; round 2 shows the same skip at `r2/lad-2-test-policy.log.txt:12` |

   The authoritative run still belongs to the `verifier`.

7. **CONFIRMED.** Scope and law hold.
   - **Status:** `lad-3-status.txt:1-4` names the four files from rounds 1 and 2.
   - **Round confined:** `lad-3-round.diff` touches only `tests/setupServer.ts`, `tests/setupServer.test.ts`, and `guides/veneer.md`.
   - **Conformance file unchanged:** its section has the same extent in both cumulative diffs (lines 629-874 of `lad-2.diff` and 630-875 of `lad-3.diff`).
   - **`src/**` unchanged:** `lad-3-plant-escaped.log.txt:45` shows an empty `src diffstat:` line.
   - **Prohibited constructs:** a Grep of `lad-3-round.diff` for `as `, `any`, a non-null `!`, `@ts-`, `eslint-disable`, `vi.fn`, `vi.mock`, `vi.spyOn`, and fake timers finds nothing. The added code has one `let` binding, one `const` binding, and no nested declaration.

## Findings outside the claims

None.

## Attacked and held

- **The stale colon:** I tried a later `(` that no function name opens, such as `a:hover\:where(`. The escaped colon is literal, so `colon` stays at `:hover`. `readIdentifier` then decodes `hover:where`, which is not `is` or `where`. This is correct.
- **Log line numbers:** the plant and red logs place the escaped assertion at line 2918, but the file has it at line 2922. Both ran before oxfmt wrapped the `:is` assertion into four lines. The assertion text and the planted source did not change, so the evidence holds for the landed assertion.
- **The guide and the TSDoc do not explain why `:nth-child(… of S)` is excluded.** Neither is false. The guide claims nothing about that argument, and `@returns` at `tests/setupServer.ts:1858` covers it with "any other functional argument". This matters only for the name, under claim 3.

## Referrals to the objective lane

- **Referral A:** no assertion in the reading case pins the `name?.end === step.index` requirement at `tests/setupServer.ts:1892`. Replacing it with `name !== undefined` would pass every assertion at `tests/setupServer.test.ts:2915-2933`.
  - The only input I found that tells the two apart is `:is/**/(.x)`, which is invalid CSS: with the check it returns `[]`, and without it `['x']`.
  - Rule whether claim 1 needs a pin for this.
- **Referral B:** claim 1 says "ASCII-lower-cased", but line 1893 calls `String.prototype.toLowerCase`, which applies full Unicode case mapping. I know of no non-ASCII code point that lower-cases to `is` or `where`: `U+0130` becomes `i` plus `U+0307`, and `U+212A` becomes `k`.
  - Confirm that the two forms give the same result for this comparison.

VERDICT: FAIL 3, 4; outside the claims: none
