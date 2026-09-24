# UTIL-FONT (`uf`) round-3 report

F-d is fixed at the sites it names, and the count sweep fixed every other added line that tallied a
set. The `uf-shared-3.patch` file replaces the `uf-shared-2.patch` file whole. It applies to a fresh
`2a3f223` extract, and it differs from the round-2 patch only at the F-d site in the setup module
and the sweep fixes this report names. Every gate the brief names exits 0. No stop condition fired.

The unit is `opus` on Opus 5.5, a native subagent in the `/home/user/veneer-uf` worktree (branch
`unit/uf`, base `2a3f223`). It committed nothing, spawned nothing, and wrote nothing into the session
scratchpad. The validation copy under the `tmp/probe/` directory was rebuilt for this round from
`2a3f223`, the owned files, and the revised patch, and was deleted before this report.

## Review evidence

Every file is in `/home/user/veneer-uf/tmp/units/`:

- The `uf-report-3.md` file: this report.
- The `uf-shared-3.patch` file: the revised shared patch against `2a3f223`.
- The `uf-3-shared-interdiff.txt` file: the output of the `diff uf-shared-2.patch uf-shared-3.patch` command.
- The `uf-3.diff` file: the output of the `git diff 2a3f223` command, plus each untracked file through the `git diff --no-index /dev/null` command.
- The `uf-3-status.txt` file: the output of the `git status --porcelain` command.
- The `uf-fd.py` instrument: the edits this round applied.
- The `uf-gates-3.sh` instrument and its `uf-gates-3.log.txt` log: the gate runs.

The `uf-3-status.txt` file reads as follows:

```text
 M app/browser/sections/TypeSection.ts
 M tests/app/browser/sections/TypeSection.test.ts
?? src/styles/utilities/_font.scss
?? tests/src/styles/utilities/font.test.ts
```

## F-d

- **The `FONT_STEP_TABLES` table comment** (the `tests/setupStyles.ts` file, shared).
  - Before: "the `font` key's single step is the `FONT_ENTRY_CASES` table's row."
  - After: "the `font` key's `monospace` step is the `FONT_ENTRY_CASES` table's row."
  - The comment was re-flowed to hold the sentence.
- **The case title** (the `tests/src/styles/utilities/font.test.ts` file, owned).
  - Before: "resolves the later value of an entry where an element carries two of its classes"
  - After: "resolves the later value of an entry where an element carries conflicting classes of it"

## The count sweep

**Pattern.** A case-insensitive, whole-word match for number words, tally words, ordinals, and numerals:

```text
\b(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|single|both|pair|couple|several|dozen|first|second|third|fourth|fifth|last|once|twice|\d+)\b
```

**What the sweep read.** Every added line in these sources, before this round's edits:

- the `git diff 2a3f223` output for the `app/browser/sections/TypeSection.ts` and `tests/app/browser/sections/TypeSection.test.ts` files;
- the whole `src/styles/utilities/_font.scss` and `tests/src/styles/utilities/font.test.ts` files, through the `git diff --no-index /dev/null` command;
- every added line of the `uf-shared-2.patch` file, which covers these files:
  - the `src/styles/index.scss` file;
  - the `tests/conformance.test.ts` file;
  - the `tests/setupStyles.ts` file;
  - the `tests/setupStyles.test.ts` file;
  - the `tests/setupServer.test.ts` file;
  - the `tests/setup.ts` file;
  - the `app/browser/constants.ts` file;
  - the `guides/veneer.md` file.

**Hits fixed by naming the members, or by dropping the tally.** The `uf-fd.py` instrument applied each fix.

| File | Before | After |
| --- | --- | --- |
| `tests/setupStyles.ts` (shared), `FONT_STEP_TABLES` table comment | "the `font` key's single step" | "the `font` key's `monospace` step" (F-d) |
| `tests/setupStyles.ts` (shared), `FONT_STEP_TABLES` table comment | "whose steps a proof reads one by one" | "whose steps a proof reads step by step" |
| `tests/setupStyles.ts` (shared), `FONT_WEIGHT_CASES` table remark | "the number one parent weight resolves it to" | "the number a parent weight resolves it to" |
| `tests/setupStyles.ts` (shared), `FONT_ENTRY_CASES` table summary | "and one class it writes" | "and a class it writes" |
| `tests/setupStyles.test.ts` (shared), binding-case comment | "a single `.KEY-*` class setting one longhand" | "a `.KEY-*` class alone setting a longhand" |
| `app/browser/constants.ts` (shared), `TYPE_SPECIMENS` table remark | "The weight steps share one paragraph" | "The weight steps share a paragraph" |
| `app/browser/constants.ts` (shared), `TYPE_SPECIMENS` table remark | "because a single line shows no spacing between lines" | "because a paragraph that never wraps shows no spacing between its lines" (remark re-flowed) |
| `guides/veneer.md` (shared), `### Font utilities` section | "a size class holds one size at every viewport" | "a size class holds its size at every viewport" |
| `font.test.ts` (owned), token-retune comment | "retunes the one token that level names" | "retunes the token that level names" |
| `font.test.ts` (owned), weight-case comment | "the number one parent resolves it to" | "the number a parent resolves it to" |
| `font.test.ts` (owned), weight-case comment | "under at least one of them" | "that differs from its twin's under the 400 parent, the 600 parent, or both" |
| `font.test.ts` (owned), relative-weight control comment | "were the parents in one band" | "were the parents in a shared band" (comment re-flowed) |
| `font.test.ts` (owned), case title | "carries two of its classes" | "carries conflicting classes of it" (F-d) |

**Hits ruled permitted, with the reason for each.**

- *Numerals inside a code token, class name, token name, or CSS value.* These name a member or state a value, and none tallies a set:
  - class names such as `.fs-1` to `.fs-6`, `.lh-1`, `row-cols-2`, `g-3`, `.h1`, and `.display-1`;
  - token names such as `--vn-size-3` to `--vn-size-8`;
  - the weight values `100` to `900`;
  - the line-height factors `1`, `1.25`, `1.5`, and `2`;
  - the pixel and rem readings, and the `1200px` media condition;
  - the `9 - $level` expression and the `@for $level from 1 through 6` loop bounds;
  - the ledger table cells and the `Bootstrap 5.3.8` version;
  - code literals such as `twin.slice(1)`, `selectors.length > 0`, `declarations[0]`, `weight % 100 === 0`, and `'2'` for the density factor.
- *Viewports and parent weights named as values.* The "390 and 1280 viewports", the "1401 viewport", and "a 400 and a 600 parent weight" name each value.
- *"More than one step"*, in the `FONT_STEP_TABLES` table comment and the binding-case comment. This is the threshold of the selection rule the case asserts (`selectors.length > 1`), a boundary value rather than a tally.
- *"Both"*, where the sentence names the members:
  - "a retuned size token moves both" in the `_font.scss` partial, which names the size class and the heading class;
  - "would pass under both" in the `font.test.ts` file, which names the 400 and the 600 parent;
  - "the 400 parent, the 600 parent, or both".
- *"One" as a pronoun or an article*, not a tally:
  - "and one carrying the release's capped literal";
  - "to no unlayered one".
- *Specimen copy in the `TYPE_SPECIMENS` table and its proof.* The copy "one phrase", "one font size apart", "one and a quarter font sizes apart", and "two font sizes apart" either means "a phrase" or states a line-height measurement. This copy is shipped showcase markup that the section proof pins. No tally.

## Gates

The `uf-gates-3.log.txt` log records each command exactly as it ran, with every argument.

**On the validation copy** (`/home/user/veneer-uf/tmp/probe/base`):

| Command | Result line |
| --- | --- |
| `npm run check` | exit 0 |
| `npm run build:src` | exit 0 |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/font.test.ts` | exit 0, `Tests  28 passed (28)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts` | exit 0, `Tests  122 passed (122)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/TypeSection.test.ts` | exit 0, `Tests  2 passed (2)` |
| `npm run test:guides` | exit 0, `Tests  19 passed (19)` |
| `npm run test:policy` | exit 0, `Tests  109 passed \| 1 skipped (110)` |
| `npx oxlint --config .oxlintrc.json --deny-warnings --no-ignore tests/setupStyles.ts tests/setupStyles.test.ts app/browser/constants.ts tests/src/styles/utilities/font.test.ts` | exit 0 |
| `npx oxfmt --config .oxfmtrc.json --check --ignore-path=.prettierignore tests/setupStyles.ts tests/setupStyles.test.ts app/browser/constants.ts guides/veneer.md tests/src/styles/utilities/font.test.ts` | exit 0, `All matched files use the correct format.` |

**In the worktree** (`/home/user/veneer-uf`):

| Command | Result line |
| --- | --- |
| `npm run format:check` | exit 0, `All matched files use the correct format.` |
| `npm run lint:check` | exit 0 |

**On a fresh `git archive 2a3f223` extract** (`/home/user/veneer-uf/tmp/probe/fresh`):

| Command | Result line |
| --- | --- |
| `git apply --check .orkestrel/veneer/units/uf-shared-3.patch` | exit 0 |

## Patch interdiff

The `uf-3-shared-interdiff.txt` file shows that the `uf-shared-3.patch` file differs from the
`uf-shared-2.patch` file only at these sites:

- the F-d sentence;
- the sweep rows in the preceding table for the `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `app/browser/constants.ts`, and `guides/veneer.md` files;
- the re-flow of the comments that hold those sentences.

No hunk header moved. For the owned files, the `uf-3.diff` file differs from the `uf-2.diff` file only
at the `font.test.ts` rows of that table.

## Decisions

- Each hit where "one" means "a" became "a", and each hit that tallied became the named member. For example, the `font` key's step became the `monospace` step.
- The specimen copy stays unchanged. It is shipped showcase markup that the section proof and the capture frames pin, and its words either state a measurement or mean "a", so no tally is present.
- The threshold "more than one step" stays unchanged, because it states the selection rule's boundary that the binding case asserts.

## What the unit could not close

Nothing inside this round's scope. The landing observations stay with the Orchestrator, as the round-1 and round-2 briefs state.
