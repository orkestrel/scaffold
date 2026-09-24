# UTIL-PAINT round 3 report

**Outcome.** P-f is in place, and the tally sweep is recorded. The owned diff differs from round 2's
only in comment lines. Every criterion closes, except that the round-1 style proof command cannot run
in the worktree itself; it passes on the validation copy (see § Deviation).

Round 3 of the UTIL-PAINT unit ran on the `opus` role (Opus 5.5, the native subagent that wrote the
earlier rounds) in the `/home/user/veneer-up` worktree, on the `unit/up` branch from the `2a3f223`
commit. It carries fix P-f from the `up-audit-2-verdict.md` verdict. This unit ran no commit, push,
install, or destructive git command, and wrote nothing into the session scratchpad.

The sweep found tallies in comment lines of the shared patches as well. So this round returns the
`up-shared-3.patch` file, which supersedes the `up-shared-2.patch` file whole, as the brief directs.
It also returns the `up-unscoped-profiles-3.patch` file, which applies after it and supersedes the
`up-unscoped-profiles-2.patch` file for the same reason.

## P-f

The fix is in the `src/styles/utilities/_border.scss` partial. It names the rounded entries and keeps
the statement that they share the radius map.

Before:

```scss
	// Stands in for the release's radius map, which the five rounded entries share.
```

After:

```scss
	// Stands in for the release's radius map, which the `rounded`, `rounded-top`, `rounded-end`,
	// `rounded-bottom`, and `rounded-start` entries share.
```

## Sweep

**Pattern.** The `up-3-sweep.py` script, retained in the `tmp/units/` directory, lists every comment
or TSDoc line that carries a number word, a numeral, or a tally word. It matches this expression,
case-insensitively:

```text
\b(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|both|single|pair|couple|several|dozen|once|twice|\d+)\b
```

A line counts as a comment when it matches the `^\s*(//|\*|/\*\*)` expression.

**Paths read.** The script read these sources:
- every untracked owned file, as the `git ls-files --others --exclude-standard` command lists them
- the added lines of the `up-shared-2.patch` file, outside the guide
- the added lines of the `up-unscoped-profiles-2.patch` file

The `up-3-sweep.log.txt` log lists every hit. Each hit takes a ruling:

| Hit | Ruling |
| --- | --- |
| `_border.scss`: "the five rounded entries share" | Tally. Fixed by P-f. |
| `_background.scss`: "the two body tiers read the secondary and tertiary…" | Tally. It becomes "the `body-secondary` and `body-tertiary` fills read the secondary and tertiary…", and the comment block is re-flowed. |
| `BorderSection.test.ts`: "leaves the other two square" | Tally. It becomes "leaves every other corner square". |
| `background.test.ts`: "wrongly in one of the two islands" | Tally. It becomes "wrongly in the light island or the dark island". |
| `app/browser/constants.ts`, in the shared patch: "a fill it stands against in both modes" | Tally of modes the sentence does not name. It becomes "in the light and dark modes", and the remark is re-flowed. Returned in the `up-shared-3.patch` file. |
| `profiles.test.ts`, in the profiles patch: "Both profiles also fill the generated `properties` layer" | Tally of profiles the sentence does not name. It becomes "The `tailwind` and `preflight` profiles also fill…". Returned in the `up-unscoped-profiles-3.patch` file. |
| `helpers.ts`: "one ratio box per class string" and "one per swatch"; `_background.scss` and `_border.scss`: "one subtle tier per aliased role" | Distributive wording. Each states a ratio, not the size of a set. Kept. |
| `helpers.ts`: "a row of three columns that widens to five from the md boundary", "4:3 ratio box", and the `@example` values | Values the markup writes: the `row-cols-3`, `row-cols-md-5`, and `ratio-4x3` classes. Kept. |
| `_border.scss`: "beat it at one specificity" | "One" names equal specificity, not a count. Kept. |
| `BackgroundSection.test.ts` and `BorderSection.test.ts`: "so both stylesheets have to be in the document" | "Both" follows its named members, the published cascade and the shell. Kept. |
| `BackgroundSection.test.ts` and `BorderSection.test.ts`: "reads at least 1.2:1" | A contrast value. Kept. |
| `background.test.ts`: "a tier written as one mode's value" | "One" picks an unnamed member, not a count. Kept. |
| `background.test.ts`: "Each class is written once" | A frequency the case asserts. Kept. |
| `setupStyles.test.ts`, in the shared patch: "over one channel alias" and "draws one physical side" | "One" names a lone member, not the size of a set. Kept. |
| `setupStyles.test.ts` and `setupStyles.ts`, in the shared patch: "the `2` step" | A step value. Kept. |
| `constants.ts`, in the shared patch: "the `3` step" | A step value. Kept. |
| `profiles.test.ts`, in the profiles patch: "the `border` and `border-0` names every executed profile emits" | The members are named, and neither word is a tally. Kept. |

The profiles case also carries the lines "Both scan the one candidate list…" and "so both generate".
Those lines are in `2a3f223` itself, not lines this unit added, so they sit outside the sweep.

## Gates

The `up-3-gates.log.txt` log records each command exactly as it ran, with its result line:

| Where | Command | Result |
| --- | --- | --- |
| worktree | `npm run format:check` | `All matched files use the correct format.`, exit 0 |
| worktree | `npm run lint:check` | exit 0, no diagnostic |
| worktree | `npm run build:src` | exit 0 |
| worktree | `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/background.test.ts tests/src/styles/utilities/border.test.ts` | exit 1: `The requested module '/tests/setupStyles.ts' does not provide an export named 'BACKGROUND_FILL_CASES'` |
| validation copy | `npm run build:src` | exit 0 |
| validation copy | the same style proof command | `Tests  22 passed (22)`, exit 0 |
| validation copy | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/BackgroundSection.test.ts tests/app/browser/sections/BorderSection.test.ts tests/app/browser/helpers.test.ts` | `Tests  11 passed (11)`, exit 0 |
| validation copy | `npm run test:guides` | `Tests  19 passed (19)`, exit 0 |
| validation copy | `npm run test:policy` | `Tests  109 passed \| 1 skipped (110)`, exit 0 |

The validation copy was built from the `git archive 2a3f223` output. It had the round-3 patches
applied, the owned files copied in, and the `node_modules` directory linked through the `cp -al`
command, and it was deleted before this report.

The `up-3-apply-check.log.txt` log records the patch checks on a fresh `2a3f223` extract:
- `git apply --check up-shared-3.patch` exits 0.
- `git apply --check up-unscoped-profiles-3.patch`, run after the shared patch is applied, exits 0.

The `up-3-interdiff.txt` record compares the trees that round 2's patches and round 3's patches
produce. The trees differ in the `BORDER_SPECIMENS` remark in the `app/browser/constants.ts` file and
in the comment in the `profiles.test.ts` proof, nowhere else.

## Records

These records are under the `tmp/units/` directory:
- the `up-3.diff` file: the `git diff 2a3f223` output, followed by each untracked file through the
  `git diff --no-index /dev/null` command
- the `up-3-status.txt` file: the `git status --porcelain` output, every entry an untracked owned path
- the `up-shared-3.patch` and `up-unscoped-profiles-3.patch` patches
- the `up-3-sweep.py` script and its `up-3-sweep.log.txt` log
- the `up-3-gates.log.txt`, `up-3-apply-check.log.txt`, and `up-3-interdiff.txt` records

The owned diff differs from round 2's `up-2.diff` file only in the comment lines the preceding
rulings name.

## Deviation

Criterion 2 names the round-1 style proof command in the worktree. That command cannot pass there,
because its tables and the barrel's `@use` lines live in the shared files the worktree does not
carry. That is the round-1 standing condition, which says to read a gate that needs a shared file on
a validation copy. So the worktree reading is recorded red, and the copy reading is recorded green.
No other deviation.
