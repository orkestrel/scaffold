LANE: eic-audit-4-reviewer

I held the subjective lane. Opus 5.5 wrote the unit under audit, which is my own engine, so I attacked it harder. I edited nothing and ran nothing. The mutation readings come from the unit's retained logs under `/home/user/scaffold/.orkestrel/veneer/units/eic-instruments/r4/`, and I read those logs; I did not re-run them.

## Numbered verdicts

1. **CONFIRMED** — `var` wears the chip.
   - **Source:** `/home/user/veneer-eic/src/styles/elements/_var.scss:1,11` loads the mixins and includes `code-surface(var(--vn-surface-raised))`. The compiled cascade `/home/user/veneer-eic/dist/src/styles/index.css` carries `var{…color:var(--vn-text-code);background-color:var(--vn-surface-raised);border-radius:var(--vn-radius-small);padding-left:.25em;padding-right:.25em;font-size:95%;font-style:italic}`. The padding, the font, the color, and the italics are intact.
   - **Record:** `/home/user/veneer-eic/tests/setupStyles.ts:1563` sets `radius: 4` in both modes.
   - **Proof:** `/home/user/veneer-eic/tests/src/styles/elements/var.test.ts:32` asserts the radius. It ran green in both modes (`r4-var-green.log.txt:29`).
   - **Mutation m21** replaces the include with a bare `background-color: var(--vn-surface-raised)`. `r4-mutation-m21-var-drop-corner.log.txt:27-43` reports `expected +0 to be 4` at `var.test.ts:32` in both modes, and the restore is byte-identical.
   - **Distinguishes:** yes. The mutation keeps the surface, so the background assertion at line 31 still passes and only the corner assertion fails. A rival mutation that kept the corner but used the default code surface would fail line 31 instead.

2. **CONFIRMED** — the chip sentences.
   - **Mixin comment:** `/home/user/veneer-eic/src/styles/_mixins.scss:106-107` names `code`, `kbd`, `samp`, and `var`. Those are the only callers of the mixin (a search for `code-surface` finds `_code.scss:6`, `_kbd.scss:6`, `_samp.scss:6`, and `_var.scss:11`). The compiled rules match its surface split: `code` and `kbd` use `--vn-surface-code`, `samp` and `var` use `--vn-surface-raised`, and all four use `--vn-radius-small`.
   - **Guide row:** `/home/user/veneer-eic/guides/veneer.md:9924` is true of Elements, the visual reference. `/home/user/elements/src/styles/elements/_{code,kbd,var,samp}.scss` each set a `0.25em` radius. It is also true of the Veneer cascade.
   - **Test comments:** `samp.test.ts:12-13` and `var.test.ts:12-13` are true of the compiled cascade.
   - **No count:** "the one corner the family shares" is gone, and no sentence states a count.
   - **Adjacent sentence:** `guides/veneer.md:6872-6873` still holds, because `pre`, `samp`, and `var` read `--vn-surface-raised`.
   - **Wider search:** a search for "chip" across the guides, `src`, `app`, and `tests` finds no other chip sentence.

3. **CONFIRMED** — the rendered specimens.
   - **The case:** `/home/user/veneer-eic/tests/app/browser/sections/ContentSection.test.ts:239` loads the published cascade in `beforeAll` (lines 15-18, the same pattern as every sibling section test). It reads the rendered `Linked code`, `Code block`, and `Key combination` specimens.
   - **m22** (`a > code { color: inherit }`) fails at line 253 with `expected true to be false` (`r4-mutation-m22-readd-a-code.log.txt:17,25`). It distinguishes: the passing case reads a code color that differs from the anchor's, and the mutation makes the two match.
   - **m23** (`pre code { padding: 0; background-color: transparent }`) fails at line 263 with `expected false to be true` (`m23` log `:17,25`). The surface assertion distinguishes: a transparent background against `--vn-surface-code`.
   - **m24** (`kbd kbd { border: 0 }`) fails at line 281 with `expected 'none' to be 'solid'` (`m24` log `:17,22`). It distinguishes, because the inner key's style drops while the outer key's is untouched.
   - **Restores:** every restore is byte-identical (`r4-mutation-summary.log.txt`).
   - **Unproved corner:** no named mutation exercises the corner assertion. It would take a `pre code { border-radius: 0 }` mutation, which is what Elements does (`/home/user/elements/src/styles/elements/_code.scss:49`). The claim does not require it.

4. **CONFIRMED** — one citation.
   - **The lead sentence:** `/home/user/veneer-eic/guides/veneer.md:6616-6617` quotes the title at `/home/user/veneer-eic/ROADMAP.md:35` word for word.
   - **Cited once:** a search for "Give semantic tags useful defaults" or "tenet" across the guides, `src`, `tests`, and the README finds only this line in the guide.
   - **Cells unchanged:** `eic-4.diff` carries no hunk over lines 6621-6628, so the `pre code`, `a > code`, and `kbd kbd` Reason cells read as at `ca83afb`.
   - **Rows covered:** the rows whose reason names tag composition or adjacency are exactly the four nested-list rows, `pre code`, `a > code`, `kbd kbd` ("tag composition"), and `legend + *` ("adjacency"). The Gecko row and the prefixed-alias rows name neither. Each covered row applies the tenet's "beside or inside another semantic tag" clause.

5. **CONFIRMED** — scope and law.
   - **Scope:** every path in `eic-4-status.txt` is granted.
     - `e-id-code-brief.md:20-23` grants `_code`, `_pre`, `_kbd`, and `_samp`, their tests, `_mixins.scss`, and the constants specimens.
     - `e-id-code-brief-2.md:19` grants `ContentSection.test.ts`.
     - `e-id-code-brief-4.md:38-39` grants `_var.scss`, `var.test.ts`, and `TEXT_VAR_CASES`.
     - `e-id-common.md:31` shares `guides/veneer.md`, `tests/setupStyles.ts`, and `app/browser/constants.ts`.
   - **Law:** the diff adds no `any`, no `as`, no `!`, no suppression, no nested function declaration, and no module helper. The only function literals are callbacks passed directly as arguments.
   - **Test names:** each added title states what it proves:
     - "keeps each tag its own treatment inside a link, a code block, and a key";
     - "reads its border width from the release hook a scope retunes", in `kbd.test.ts:35` and `pre.test.ts:35`.
   - **Unchanged titles:** the `samp` and `var` titles are unchanged and still accurate, because "values" now includes the corner.

## Findings outside the claims

**F1 — the added test comments name elements without backticks.**
- **Input:**
  - `/home/user/veneer-eic/tests/src/styles/elements/samp.test.ts:12-13` reads "The samp element wears the chip the code, kbd, and var elements wear."
  - `/home/user/veneer-eic/tests/src/styles/elements/var.test.ts:13` reads "The var element wears the chip the code, kbd, and samp elements wear."
- **Why it matters:** `.claude/rules/writing.md` § Code tokens says "Put a code token in backticks and follow it with a noun". The same change backticks these four names in `_mixins.scss:106-107` and in `guides/veneer.md:9924`, and the repository does the same elsewhere ("the `mark` element" at `tests/src/styles/components/type.test.ts:119`, "the `main` element" at `tests/setupBrowser.test.ts:726`). So one chip sentence appears in two typographic forms across the change. No lint rule or policy sweep checks this.
- **Smallest fix (comment text only):**
  - `samp.test.ts`: "The `samp` element wears the chip the `code`, `kbd`, and `var` elements wear."
  - `var.test.ts`: "The `var` element wears the chip the `code`, `kbd`, and `samp` elements wear."

## Attacked and held

- **Vocabulary, "release hook":** I tested the kbd and pre title "release hook" against the repository's term "alias" for `--bs-*` variables (`tests/src/styles/utilities/border.test.ts:23`). It holds. The repository already uses "hook" for a custom property a rule reads (`tests/src/styles/components/form-select.test.ts:235`). The unit's own round-1 brief (`e-id-code-brief.md:35`) uses the term, and round 3 held the title.
- **The term "chip" in the guide:** "chip" appears in the guide only at line 9924. The sibling row `code { border-radius }` (line 9911) states the same fact under "Elements paints inline code on its own surface with its own inset." The phrase "chip corner" reads plainly on a first read and the row is true, so it is not a defect.
- **The mixin's name:** `code-surface` now takes the surface as a parameter, so its fixed content is the corner. The comment's "a surface and the small corner" still describes what the mixin emits, and the round-1 brief put the parameter under the unit's ruling. It is not a defect.
- **"the code one":** in `_mixins.scss:107`, "keep the code one" reads as "the default code surface". It is understandable on a first read.
- **Declaration order in `_var.scss`:** the include comes last, while `code`, `kbd`, and `samp` put their includes first. No rule orders them.
- **"has to be" in the `ContentSection.test.ts` comment (lines 13-14):** this is the house idiom used by every section test.
- **The new test title's grammar:** "keeps each tag its own treatment" is an awkward double object, but it states what the case proves.

VERDICT: FAIL none; outside the claims: F1
