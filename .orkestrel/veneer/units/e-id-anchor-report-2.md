# E-ID-ANCHOR round 2 report

`opus` on Opus 5.5, native, sole writer in `/home/user/veneer-anchor` (branch `unit/anchor`, over `c9c6907`). Nothing is committed. Every Item is applied, and every gate in the final run exits 0. No emitted declaration or selector changed. The round-2 diff touches only these:
- comments;
- the mixins test's population predicate and the shape of its record;
- the guide prose and the Reason cells.

The report file is `/home/user/veneer-anchor/tmp/units/r2/anchor-report-2.md`. It holds the full before and after quotes, of which this reply shortens some.

## Touched files

- `src/styles/_mixins.scss`: the `anchor-visibility` mixin comment states the computed value, the painting bounded to the probe table, and the override by layer order.
- `src/styles/components/_dropdown.scss`, `_tooltip.scss`, `_popover.scss`: the comment above each `@include anchor-visibility(…)` does the same for its overlay.
- `tests/src/styles/components/dropdown.test.ts`: the enumeration comment says an extra selector passes unreported. The anatomy comment names what the case reads and scopes each catch by build.
- `tests/src/styles/components/tooltip.test.ts`, `popover.test.ts`: the anatomy comment names what the case reads and scopes each catch by build.
- `tests/src/styles/mixins.test.ts`: one `WHOLE_GROUP` predicate serves the reboot case and the revert case. A declaration outside a style rule records an `undefined` selector, and the sort stays total.
- `guides/veneer.md`: the Dropdown, Tooltip, and Popover classes paragraphs, and the anchored-visibility Reason cells.

The diffstat from `git diff --stat c9c6907` is:

```text
 guides/veneer.md                             | 65 +++++++++++++++-------------
 src/styles/_mixins.scss                      | 14 +++---
 src/styles/components/_dropdown.scss         |  7 ++-
 src/styles/components/_popover.scss          |  7 ++-
 src/styles/components/_tooltip.scss          |  7 ++-
 tests/src/styles/components/dropdown.test.ts | 22 ++++++----
 tests/src/styles/components/popover.test.ts  | 14 +++---
 tests/src/styles/components/tooltip.test.ts  | 14 +++---
 tests/src/styles/mixins.test.ts              | 33 +++++++++-----
 9 files changed, 112 insertions(+), 71 deletions(-)
```

## Item 1: the source comments (claim 2 and F1)

The mixin comment read, before:

> Emits the rule that shows an overlay the engine promotes to the top layer only while its anchor is visible, on the open popover state of the `$class` class. The value is Chromium 153's initial value and Chromium 141 starts from `always`, so the rule gives both builds the same overlay. The class sits inside `:where()`, so the rule's specificity is the open state's alone, and a consumer class that declares the property overrides it without `!important`.

After:

> Emits `position-visibility: anchors-visible` on the open popover state of the `$class` class, so an overlay the engine promotes to the top layer computes that value while it is open and the initial value while it is closed. The initial value is `anchors-visible` on Chromium 153 and `always` on Chromium 141, so the open overlay computes the same value on both builds. Under that value neither build paints a tooltip or a popover whose trigger a scroll container clips entirely. Chromium 153 does not paint a dropdown menu whose toggle a scroll container clips entirely, and Chromium 141 paints it, because the engine does not anchor the menu there. Each caller writes the rule in the `components` layer and declares nothing important, so a class of your own in a later layer, or in none, overrides it without a specificity contest.

The dropdown include comment read, before:

> A menu the engine promotes to the top layer shows only while its toggle is visible, so a menu whose toggle scrolls out of a scroller's clip is not painted.

After:

> A menu the engine promotes to the top layer computes `position-visibility: anchors-visible` while it is open, on both builds. Chromium 153 then does not paint a menu whose toggle a scroll container clips entirely, and Chromium 141 paints it, because the engine does not anchor the menu there. The rule sits in the `components` layer and declares nothing important, so a class of your own in a later layer, or in none, overrides it without a specificity contest.

The tooltip include comment read, before: "A tip the engine promotes to the top layer shows only while its trigger is visible, so a tip whose trigger scrolls out of a scroller's clip is not painted." After:

> A tip the engine promotes to the top layer computes `position-visibility: anchors-visible` while it is open, on both builds, and neither build then paints a tip whose trigger a scroll container clips entirely. The rule sits in the `components` layer and declares nothing important, so a class of your own in a later layer, or in none, overrides it without a specificity contest.

The popover include comment changed the same way as the tooltip's, with "popover" in place of "tip".

## Item 2: the dropdown enumeration comment (claim 4)

Before:

> … so a missing selector reports here, while an extra selector and a second rule on a recorded selector leave the reading unchanged. …

After:

> … so a missing selector reports here, and an extra selector or a second rule on a recorded selector passes unreported. …

I re-read the title against the seam ruling and kept it: "hides the menu at rest, shows it through the class, and reaches the components layer with every recorded selector and the anchored visibility selector on the open popover state".
- It says "selector".
- It names the admitted selector by its origin and its state, in the same form as the tooltip and popover titles.
- It claims presence only. The assertion filters the recorded list for absence and rejects nothing, so the title needs no "no other components-layer selector" clause.

## Item 3: the proofs on the record (claim 6, F2, and MID-LOG)

**The anatomy comments.** Each anatomy comment read, before (the dropdown's is shown; the tooltip's and popover's name the tip and the popover):

> The mutation this catches is the open-state rule dropped, written on the closed menu, or written important. The initial value differs by build, Chromium 141 starting at `always` and Chromium 153 at `anchors-visible`, so it is read off a bare element on the same page. The consumer's sheet is unlayered and declares nothing important, so an important rule in the components layer would outrank it.

After:

> The reading is the computed `position-visibility` value of the menu before, during, and after its open popover state, of a bare element beside it, and of an open twin that carries an unlayered consumer class. The initial value is `always` on Chromium 141 and `anchors-visible` on Chromium 153, so the case reads it off the bare element. On a build whose initial value is `always`, such as Chromium 141, the case catches the open-state rule dropped or written on the closed menu; on a build whose initial value is `anchors-visible`, those two mutations pass it. On every build it catches the rule written important, which would outrank the consumer class. The `position-visibility` case in the `mixins.test.ts` file holds the rule's text on every build.

The mixins case comment gained: "It reads text rather than a computed value, so it holds on every build, whatever the build's initial value. A declaration outside a style rule has no selector, and it sorts after every selector."

**The old-predicate reading.** The script `tmp/units/r2/old-predicate.sh` set the reboot case's predicate back to `rule.selectorText.startsWith(':where(')`, ran that case alone over the built cascade, and restored the file from a backup. The log `tmp/units/r2/anchor-old-predicate.log.txt` opens with the planted diff:

```text
218c218
< 			rule instanceof CSSStyleRule && WHOLE_GROUP.test(rule.selectorText) ? [rule] : [],
---
> 			rule instanceof CSSStyleRule && rule.selectorText.startsWith(':where(') ? [rule] : [],
```

- **Command:** `npm run test:src:styles -- tests/src/styles/mixins.test.ts -t 'writes the button reboot back on every longhand'`
- **Result:** exit 1, `Tests  1 failed | 48 skipped (49)`, `AssertionError: expected [ …(12) ] to deeply equal [ …(9) ]` at log line 350.
- **What the old predicate adds:** the received list gains `:where(.dropdown-menu):popover-open`, `:where(.popover):popover-open`, and `:where(.tooltip):popover-open`.
- **Restore:** the SHA-256 digest is `b2adcdfb…4b3fc6fb1` before and after (`tmp/units/r2/anchor-old-predicate-sha.txt`).

This log is the citation for the old predicate failing. The report no longer cites `anchor-mid.log.txt`.

**The mixins case's red.** The mixins case has no base run on the record, and the report claims none. Its red comes from the declaration-deletion mutation:
- round 1's `tmp/units/anchor-mutation-styles.log.txt`, line 541;
- this round's `tmp/units/r2/anchor-mutation-styles.log.txt`, line 546.

Both read `AssertionError: expected [] to deeply equal [ { …(3) }, { …(3) }, { …(3) } ]`. For this property, the mutation leaves the cascade as the base leaves it:
- `grep -c position-visibility dist/src/styles/index.css` printed `0` in the mutation log;
- `git grep -c position-visibility 0a0a252 -- src` found nothing (exit 1).

**The mutation over the round-2 tree.** The script `tmp/units/r2/mutation.sh` deletes the mixin's `position-visibility: anchors-visible;` line, which removes the declaration from each partial. It then rebuilds, runs the owned styles files and the conformance project, and restores the mixin from a backup. The SHA-256 digest is `b343d046…48eba21e` before and after (`tmp/units/r2/anchor-mutation-sha.txt`).

The styles command was `npm run test:src:styles -- tests/src/styles/mixins.test.ts tests/src/styles/components/dropdown.test.ts tests/src/styles/components/tooltip.test.ts tests/src/styles/components/popover.test.ts`. The following table gives each mutated reading.

| Case | Log (line) | Mutated reading |
| --- | --- | --- |
| mixins `writes anchored visibility on the open popover state …` | `tmp/units/r2/anchor-mutation-styles.log.txt` (546) | `AssertionError: expected [] to deeply equal [ { …(3) }, { …(3) }, { …(3) } ]` |
| dropdown enumeration | same (581) | `AssertionError: expected [ Array(1) ] to deeply equal []` |
| dropdown anchored visibility | same (602) | `AssertionError: expected 'always' to be 'anchors-visible'` |
| popover enumeration | same (618) | `AssertionError: expected [ …(33) ] to deeply equal [ …(34) ]` |
| popover anchored visibility | same (643) | `AssertionError: expected 'always' to be 'anchors-visible'` |
| tooltip enumeration | same (659) | `AssertionError: expected [ …(21) ] to deeply equal [ …(22) ]` |
| tooltip anchored visibility | same (684) | `AssertionError: expected 'always' to be 'anchors-visible'` |
| Styles run | same | exit 1; `Tests  7 failed \| 113 passed (120)` |
| Conformance `cascade ledger > names no addition the compiled cascade no longer emits` | `tmp/units/r2/anchor-mutation-conformance.log.txt` (14) | exit 1; `AssertionError: expected [ …(6) ] to deeply equal []`, listing each component's stale `selector` and `declaration` rows; `Tests  1 failed \| 44 passed (45)` |

The revert case reads the `WHOLE_GROUP` population and passes under the mutation, because the mutation removes no `revert` declaration. The anchored rules carry no `revert` declaration, so the population change leaves that case's result unchanged on this cascade. No plant in this round shows the revert case failing on a rule that only the old predicate admits.

## Item 4: the guide (claim 7)

The Dropdown classes paragraph read, before:

> A menu the engine promotes to the top layer shows only while its toggle is visible. The `:where(.dropdown-menu):popover-open` rule declares the `position-visibility: anchors-visible` value, under which the browser does not paint a promoted menu whose toggle is clipped out of view, such as a toggle scrolled out of its scroller. Chromium 153 starts the property at that value and Chromium 141 starts it at `always`, so the rule gives both builds the same menu. The `anchor-visibility` mixin … The class sits inside `:where()`, so a consumer class that declares the `position-visibility` property overrides the rule without `!important`. § Additions records the rule and its declaration.

After:

> A menu the engine promotes to the top layer computes the `position-visibility: anchors-visible` value while it is open, through the `:where(.dropdown-menu):popover-open` rule, and the initial value while it is closed. The initial value is `anchors-visible` on Chromium 153 and `always` on Chromium 141, so the open menu computes the same value on both builds. Under that value Chromium 153 does not paint an open menu whose toggle a scroll container clips entirely. Chromium 141 still paints that menu, because the engine does not anchor the menu there. The `anchor-visibility` mixin in the `src/styles/_mixins.scss` file writes the rule, and the tooltip and popover partials include the same mixin. The rule sits in the `components` layer and declares nothing important, so a class of your own in a later layer, or in none, that names the `position-visibility` property overrides the rule without a specificity contest. § Additions records the rule and its declaration.

The Tooltip classes paragraph changed the same way, from "shows only while its trigger is visible … clipped out of view … The class sits inside `:where()` …" to:

> A tip the engine promotes to the top layer computes the `position-visibility: anchors-visible` value while it is open, through the `:where(.tooltip):popover-open` rule, and the initial value while it is closed. The initial value is `anchors-visible` on Chromium 153 and `always` on Chromium 141, so the open tip computes the same value on both builds. Under that value neither build paints an open tip whose trigger a scroll container clips entirely. The `anchor-visibility` mixin writes the rule, as it writes the menu's and the popover's. The rule sits in the `components` layer and declares nothing important, so a class of your own in a later layer, or in none, that names the `position-visibility` property overrides the rule without a specificity contest. § Additions records the rule and its declaration.

The Popover classes paragraph matches the tooltip paragraph, with "popover" in place of "tip", its own selector, and "the menu's and the tip's".

The Reason cells read, before: "Chromium 141 starts the property at `always`, so the open menu restates the `anchors-visible` value Chromium 153 starts at, and a promoted menu whose toggle is clipped out of view is not painted on either build." The tooltip and popover cells had the same shape. After, each selector row and its declaration row share one cell:
- **`dropdown`:** "The open menu computes `anchors-visible` on both builds. Chromium 153 then does not paint a menu whose toggle a scroll container clips entirely, and Chromium 141 paints it, because the engine does not anchor the menu there."
- **`tooltip`:** "The open tip computes `anchors-visible` on both builds, and neither build then paints a tip whose trigger a scroll container clips entirely."
- **`popover`:** "The open popover computes `anchors-visible` on both builds, and neither build then paints a popover whose trigger a scroll container clips entirely."

I settled these choices:
- The dropdown cell fills the column's 223-character width exactly. I dropped the Chromium 141 initial-value clause from the dropdown, tooltip, and popover cells so that the dropdown cell fits and still states the Chromium 141 limit, and so that the cells stay parallel. The paragraphs keep the initial values.
- The cells never stated an override, so (c) changed only the paragraphs and the source comments.
- No sentence claims a partial clip or a viewport scroll.
- Each paragraph states the clipping condition once.

## Item 5: `mixins.test.ts` (R1)

- **One population:** a module-scope `WHOLE_GROUP` constant (`/^:where\((?:[^()]|\([^()]*\))*\)$/u`), with a comment naming the population, replaces the reboot case's inline pattern and the revert case's `startsWith(':where(')` test.
- **Absent selector:** the `position-visibility` case records `selector: string | undefined`. A declaration whose parent is not a `Rule` records `undefined` instead of `''`.
- **Total sort:** when either selector is `undefined`, the comparator returns `Number(left.selector === undefined) - Number(right.selector === undefined)`, so an undefined selector sorts last and two undefined selectors compare equal. Otherwise it uses `localeCompare`.

## Gates

The final run is `tmp/units/r2/gates.sh` over the final tree. Each log starts with the command it ran and ends with `exit=`.

| Gate | Log | Result |
| --- | --- | --- |
| `npm run format:check` | `tmp/units/r2/anchor-format-check.log.txt` | exit=0, "All matched files use the correct format." |
| `npm run lint:check` | `tmp/units/r2/anchor-lint-check.log.txt` | exit=0 |
| `npm run check` | `tmp/units/r2/anchor-check.log.txt` | exit=0 |
| `npm run test:src:styles` | `tmp/units/r2/anchor-test-src-styles.log.txt` | exit=0, `Tests  1533 passed (1533)` |
| `npm run test:conformance` | `tmp/units/r2/anchor-test-conformance.log.txt` | exit=0, `Tests  45 passed (45)` |
| `npm run test:guides` | `tmp/units/r2/anchor-test-guides.log.txt` | exit=0, `Tests  26 passed (26)` |
| `npm run test:policy` | `tmp/units/r2/anchor-test-policy.log.txt` | exit=0, `Tests  109 passed \| 1 skipped (110)` |

These are my own readings. The authoritative run belongs to `verifier`.

## Diff and status

- `/home/user/veneer-anchor/tmp/units/r2/anchor-2.diff` holds `git diff c9c6907`.
- `/home/user/veneer-anchor/tmp/units/r2/anchor-2-full.diff` holds `git diff 0a0a252`.
- `/home/user/veneer-anchor/tmp/units/r2/anchor-2-status.txt` holds `git status --short`: the owned files listed under Touched files, each ` M`, and nothing else.

## Failing-first test names

This round adds no test. It reran these proofs red:
- `declaration mixins > writes the button reboot back on every longhand the button surface writes, on each class the release builds on a button, and the surface writes none of them important`, under the old predicate.
- Every case in the mutation table, including `cascade ledger > names no addition the compiled cascade no longer emits`, under the deletion.

## Shared-file patches

None.

## Deviation state

No stop is outstanding. These events and findings are on the record:
- **A first gate run read red.** Its `format:check` exited 1 on `guides/veneer.md`, because my script padded the edited table rows to a different width than the formatter uses. I ran `./node_modules/.bin/oxfmt --config .oxfmtrc.json guides/veneer.md`, which repadded only those rows, and then reran every gate. The first run's summary and log are in `tmp/units/r2/first/`.
- **The instruments ran twice.** After their first runs, I rewrapped the mixin comment to keep every line within 100 columns. Both instruments then reran over the final tree, with the same readings. The first logs are in `tmp/units/r2/first/`.
- **The brief cites the wrong section.** The sentence "a class of your own in a later layer, or in none" is in § Styles, around line 3407 in the button-reboot paragraph, not in § Tokens. The search finds no other match. I adapted that sentence's words.
- **One branch has no run.** No run exercises the `undefined` branch of the R1 comparator, because the shipped cascade has no `position-visibility` declaration outside a style rule. `npm run check` accepts the narrowing.
