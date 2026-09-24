# UTIL-FLOW (`ufl`) round 3 report

This round was run by the `opus` role on Opus 5.5, as a native subagent in the
`/home/user/veneer-ufl` worktree (the `unit/ufl` branch from the `2a3f223` commit). It executes the
`b-utilities-ufl-brief-3.md` brief, which carries fix U6 from the `ufl-audit-2-verdict.md` verdict.

## Outcome

U6 is present at each site the brief names. The sweep found further sites in the owned files and in
the shared patch's `app/browser/constants.ts` file, and each is fixed. Every change is a comment or
TSDoc line; no code, test assertion, or guide sentence changed. Every criterion gate exits 0. The
`ufl-shared-3.patch` file and the `ufl-routeb-3.patch` file apply cleanly, and the
`ufl-routeb-3.patch` file is byte-identical to the `ufl-routeb-2.patch` file. No deviation is open.

## U6

The sites the brief names are all in the `tests/setupStyles.ts` file (shared patch):

- The `@param` tag of the `computeCornerPoints` helper.
  - Before: "such as a live `DOMRect` a proof reads."
  - After: "such as a live `DOMRect` instance a proof reads."
- The summary of the `computeCornerPoints` helper.
  - Before: "in the order {@link HIT_CORNERS} names the corners."
  - After: "in the order the {@link HIT_CORNERS} table names the corners."
- The summary of the `STRETCHED_LINK_HOSTS` table.
  - Before: "the element each corner of {@link HIT_CORNERS} reaches, in that table's order."
  - After: "the element each corner of the {@link HIT_CORNERS} table reaches, in that table's order."

The sweep found these further sites:

- The summary of the `OBJECT_FIT_PAINT_CASES` table in the `tests/setupStyles.ts` file.
  - Before: "which regions of {@link OBJECT_FIT_FIXTURE} each picture paints."
  - After: "which regions of the {@link OBJECT_FIT_FIXTURE} fixture each picture paints."
- The remarks of the `OBJECT_FIT_FIXTURE` table in the `tests/setupStyles.ts` file.
  - Before: "at a ratio the square box of `box` CSS pixels does not share."
  - After: "at a ratio the square box does not share, whose side the `box` field gives in CSS pixels."
- The remarks of the `OVERFLOW_SPECIMENS` constant in the `app/browser/constants.ts` file (shared patch).
  - Before: "the frame clips what a `visible` card spills"
  - After: "the frame clips what a card under the `visible` value spills"
- The escape-case comment in the owned `tests/src/styles/utilities/float.test.ts`,
  `tests/src/styles/utilities/object-fit.test.ts`, and `tests/src/styles/utilities/overflow.test.ts`
  files.
  - Before: "An unlayered `!important` sorts after every layered one"
  - After: "An unlayered `!important` declaration sorts after every layered one"

Each touched paragraph was reflowed to the 100-column limit. The comment-line interdiff against
round 2 is `.orkestrel/veneer/units/ufl-instruments/ufl-3-shared-interdiff.txt`.

## Sweep

- **Instrument:** the `.orkestrel/veneer/units/ufl-instruments/ufl-sweep-3.py` script.
- **Lines read:**
  - every line of the owned files that `git status --porcelain` lists;
  - every added line of the `.orkestrel/veneer/units/ufl-shared-2.patch` and `.orkestrel/veneer/units/ufl-routeb-2.patch` files.
- **Lines kept:** comment and TSDoc lines, and Markdown prose lines outside tables and fences.
- **Pattern:** ``(`[^`]+`|\{@link [^}]+\})`` followed by the line's end, by punctuation from
  `[,.;:)!?]`, or by a function word such as "and", "or", "to", "of", "the", "which", or "reaches".
- **By hand:** every comment or TSDoc line in those patches that carries a code token or a `{@link}`
  tag was also read directly.
- **Output:** the hits before the fix are in `.orkestrel/veneer/units/ufl-instruments/ufl-sweep-3.txt`, and the same sweep over the
  round-3 patches is in `.orkestrel/veneer/units/ufl-instruments/ufl-sweep-3-after.txt`.
- **Hits ruled as fixes:** the sites under § U6.
- **Hits ruled as no defect:**
  - Coordinated series whose shared noun follows the series, such as "the `overflow`, `overflow-x`,
    and `overflow-y` entries" and "the `auto` or `scroll` value".
  - Tokens at a line's end whose noun opens the next line.
  - The ledger heading `` #### `object-fit` ``, which follows the guide's heading form for every
    ledger table.
  - Matches that the pattern read across a pair of backticks, such as a match between a token's
    closing backtick and the opening backtick of the next token.

## Gates

The worktree readings cover owned files only:

| Command | Exit | Log |
| --- | --- | --- |
| `npm run format:check` | 0 | `.orkestrel/veneer/units/ufl-instruments/ufl-3-worktree-format.log.txt` |
| `npm run lint:check` | 0 | `.orkestrel/veneer/units/ufl-instruments/ufl-3-worktree-lint.log.txt` |

The rebuilt validation copy at `tmp/probe/base` was built from `2a3f223`, the owned files, the
`ufl-shared-3.patch` edits, and the `ufl-routeb-2.patch` file. The copy was deleted after the
readings.

| Command | Exit | Log |
| --- | --- | --- |
| `npm run check` | 0 | `.orkestrel/veneer/units/ufl-instruments/ufl-3-gate-check.log.txt` |
| `npm run build:src` | 0 | `.orkestrel/veneer/units/ufl-instruments/ufl-3-gate-build.log.txt` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts` | 0 | `.orkestrel/veneer/units/ufl-instruments/ufl-3-gate-setupstyles.log.txt` |
| `npm run test:guides` | 0 | `.orkestrel/veneer/units/ufl-instruments/ufl-3-gate-guides.log.txt` |
| `npm run test:policy` | 0 | `.orkestrel/veneer/units/ufl-instruments/ufl-3-gate-policy.log.txt` |
| `npx oxfmt --config .oxfmtrc.json --check --ignore-path=/dev/null tests/setupStyles.ts app/browser/constants.ts` | 0 | `.orkestrel/veneer/units/ufl-instruments/ufl-3-copyfmt.log.txt` |
| `npx oxlint --config .oxlintrc.json --deny-warnings --no-ignore tests/setupStyles.ts app/browser/constants.ts` | 0 | `.orkestrel/veneer/units/ufl-instruments/ufl-3-copylint.log.txt` |

One run of the `tests/setupStyles.test.ts` command preceded `npm run build:src` and exited 1,
because the file reads the built cascade and no cascade was built yet. After the build, the same
command exited 0, as the table records.

## Patches and captures

- **The `.orkestrel/veneer/units/ufl-shared-3.patch` file** supersedes the `ufl-shared-2.patch` file whole.
  - `git apply --check` exited 0 on a fresh `git archive 2a3f223` extract under `tmp/probe/`.
  - Against round 2, it changes only comment and TSDoc lines, in the `tests/setupStyles.ts` file and
    the `app/browser/constants.ts` file.
- **The `.orkestrel/veneer/units/ufl-routeb-3.patch` file** is byte-identical to the `ufl-routeb-2.patch` file,
  because the revised shared patch touches none of its files.
  - `git apply --check` exited 0 over the applied shared patch and the owned files.
  - The applied tree matched the validation copy.
- **Captures:** the `.orkestrel/veneer/units/ufl-3.diff` file and the `.orkestrel/veneer/units/ufl-3-status.txt` file, taken as
  in rounds 1 and 2. The diff is the `git diff 2a3f223` output, followed by a `/dev/null` diff for
  each untracked owned file.

## Deviations

None. Choices recorded:

- The sweep's fixes in the `app/browser/constants.ts` file and in the owned proofs lie outside the
  `tests/setupStyles.ts` file that the brief lists as this round's shared file. The brief asks for a
  sweep of every line rounds 1 and 2 added to the owned files and both patches, so each fix stays a
  comment or TSDoc sentence in a file those rounds added lines to.
- The noun chosen for each token: "instance" for the `DOMRect` interface, "table" for the
  `HIT_CORNERS` table, "fixture" for the `OBJECT_FIT_FIXTURE` table, "field" for the `box` member,
  "value" for the `visible` keyword, and "declaration" for the `!important` flag.
