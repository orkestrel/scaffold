# Unit M2 report — the lint sites the 0.0.72 policy widening exposed

Done. `npm run lint:check` exits 0, and every site was closed by rewriting the sentence rather than
by changing configuration or silencing a rule.

## Touched files

- `tests/app/browser/setup.ts` — rewrote the summary of every documented export the
  `policy(no-malformed-summary)` rule flagged.
- `tests/app/browser/App.test.ts` — deleted the banned `just` from the `readCentre` doc block's
  `@param` line.

Diffstat:

```text
 tests/app/browser/App.test.ts |  2 +-
 tests/app/browser/setup.ts    | 91 ++++++++++++++++++++++++++-----------------
 2 files changed, 56 insertions(+), 37 deletions(-)
```

## Criteria

| # | Criterion | Result |
| - | --------- | ------ |
| 1 | `npm run format:check` exits 0 | Done. `All matched files use the correct format.` on 129 files. |
| 2 | `npm run lint:check` exits 0 | Done. Output quoted in the following section. |
| 3 | `npm run check` exits 0 | Done. `tsc` root, `tsc` app:core, and `vue-tsc` app:browser all clean. |
| 4 | `npx vitest run --project app:browser` passes | Done. Test Files 38 passed (38); Tests 159 passed (159); 29.99s. |
| 5 | `npm run test:journey` collects four journey projects and passes | Done. `journey:light-1280`, `journey:dark-1280`, `journey:light-390`, `journey:dark-390`, each chromium. Test Files 4 passed (4); Tests 76 passed, 4 skipped (80); 38.63s. |
| 6 | No summary opens with a plural noun; none repeats its symbol's name | Done. The list follows. |
| 7 | `git status --short` shows no path outside the owned list that I modified | Done. Evidence follows. |

### Criterion 2 output

```text
$ npm run lint:check
exit=0
npm notice run roughnotes@0.0.1 lint:check
npm notice run oxlint --config .oxlintrc.json --deny-warnings .
```

Oxlint prints nothing on a clean run in this workspace, so I armed a positive control before
trusting the silence. A scratch file at `.orkestrel/roughnotes/m2-control.ts` carrying
`/** A plural noun opening, which the summary rule must refuse. */` above an export linted as:

```text
exit=1
.orkestrel/roughnotes/m2-control.ts:1:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
```

The rule is live and reaches new files, so the zero on the tree is a real zero. I deleted the
control file; `git check-ignore` confirms `tmp` is ignored, so nothing of it entered the tree.

Failing-first counts: the retained M1 reading at
`.orkestrel/roughnotes/m1-instruments/m1-offlimits-lint.txt` records 36
`policy(no-malformed-summary)` errors in `tests/app/browser/setup.ts` and one
`policy(no-banned-term)` error in `tests/app/browser/App.test.ts`. The same command now reports
none.

### Criterion 5 note on the 4 skipped cases

Those are `it.runIf(CAPTURING)('writes every frame this run owes', …)` at
`tests/app/browser/integration.test.ts:1109`, one per journey project. The capture gate is off in
an ordinary run. Pre-existing and untouched.

### Criterion 7 evidence

`git status --short` lists the target visit's and M1's inherited modifications unchanged. The
modification times separate mine from theirs: `tests/app/browser/setup.ts` and
`tests/app/browser/App.test.ts` both read `2026-09-17T09:24:01`, while `.oxlintrc.json`,
`configs/policy.ts`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`,
`vite.config.ts`, `package.json`, and `.claude/agents/orkestrel.md` all read 08:59 to 09:09. I ran
no git command that touches the working tree.

## Every summary I changed

The verb is chosen per symbol, not applied uniformly: a budget gets `Caps`, a threshold `Sets`, a
stored value `Holds`, a breakpoint `Marks`, a named control `Names`, a type `Describes` or `Pairs`,
a collection `Lists`, and an options shape `Declares`.

| Symbol | Old opening | New opening |
| ------ | ----------- | ----------- |
| `SETTLE_BUDGET` | How long a surface may take… | Caps how long a surface may take… |
| `SETTLE_INTERVAL` | How often a settle poll… | Sets how often a settle poll… |
| `PAINT_BUDGET` | How long a control's paint… | Caps how long a control's paint… |
| `HOME_HEADING` | The heading the home view paints. | Holds the heading the home view paints. |
| `SIGN_IN_ABSENT` | The voice the layer uses when… | Holds the voice the layer uses when… |
| `MENU_UNREACHABLE` | The voice the layer uses for the compact trigger… | Holds the voice the layer uses for the compact trigger… |
| `CLOSE_UNREACHABLE` | The voice the layer uses for the compact dismissal… | Holds the voice the layer uses for the compact dismissal… |
| `COMPACT_WIDTH` | The width, in CSS px, below which… | Marks the width, in CSS px, below which… |
| `TEXT_CONTRAST` | The ratio information-bearing text… | Sets the ratio information-bearing text… |
| `MARK_CONTRAST` | The ratio a meaningful textless mark… | Sets the ratio a meaningful textless mark… |
| `MatrixRole` | One resolved-style role the matrix reads… | Describes one resolved-style role the matrix reads… |
| `MatrixControl` | One control the matrix focuses… | Describes one control the matrix focuses… |
| `GradientSurface` | One painted gradient surface and the primitive tokens… | Pairs one painted gradient surface with the primitive tokens… |
| `SHELL_ROLES` | The roles the shell paints… | Lists the roles the shell paints… |
| `HOME_ROLES` | The roles home paints… | Lists the roles home paints… |
| `LISTING_ROLES` | The roles a listing paints once… | Lists the roles a listing paints after… |
| `REFUSED_ROLES` | The roles a refused request paints. | Lists the roles a refused request paints. |
| `NOTICE_ROLES` | The roles a quiet notice paints… | Lists the roles a quiet notice paints… |
| `UNINDEXED_SKU` | A fixture book the live listing identifies… | Holds a fixture book the live listing identifies… |
| `COMMIT_CONTROL` | The primary commit the subscribe desk ends on. | Names the primary commit the subscribe desk ends on. |
| `CONTENT_CONTROL` | The quiet destination the footer carries… | Names the quiet destination the footer carries… |
| `SELECTED_CONTROL` | The magazine filter row's selected control. | Names the magazine filter row's selected control. |
| `UNSELECTED_CONTROL` | The magazine filter row's unselected control. | Names the magazine filter row's unselected control. |
| `SUMMARY_CONTROL` | The plain link a refused inquiry's summary offers. | Names the plain link a refused inquiry's summary offers. |
| `JourneySurface` | The host one journey mounted… | Describes the host one journey mounted… |
| `SurfaceOptions` | How one journey opens the shipped shell. | Describes how one journey opens the shipped shell. |
| `QuotaOptions` | How many writes a `QuotaStorage` accepts… | Declares how many writes a `QuotaStorage` accepts… |
| `PermissionOptions` | Which operations the host's storage permission covers. | Declares which operations the host's storage permission covers. |
| `STACK_BASE` | The opaque fill a composited stack ends on… | Holds the opaque fill a composited stack ends on… |
| `STACK_TINT` | The translucent layer a composited stack paints… | Holds the translucent layer a composited stack paints… |
| `STACK_REFUSED` | A foreground the flat reading clears… | Holds a foreground the flat reading clears… |
| `STACK_ACCEPTED` | A foreground the composited reading clears… | Holds a foreground the composited reading clears… |
| `CompositeStack` | One translucent stack and the two foregrounds… | Pairs one translucent stack with the refused and accepted foregrounds… |
| `CENSUS_RULE` | The membership rule every census row names. | Holds the membership rule every census row names. |
| `CensusReading` | One authored-class census: the population it walked… | Describes one authored-class census: the population it walked… |
| `EscapeFixtures` | The fixtures one style-escape reading carries… | Describes the fixtures one style-escape reading carries… |

Each new opening word — `Caps`, `Sets`, `Holds`, `Marks`, `Describes`, `Pairs`, `Lists`, `Names`,
`Declares` — is a third-person verb, not a plural noun. No first sentence carries its own symbol's
identifier; `STACK_TINT` names `STACK_BASE`, which is a different symbol, and `QuotaOptions` names
`QuotaStorage`, likewise.

## Choices I settled under the deviation contract

- **`LISTING_ROLES`: `once` became `after`.** The sense is temporal, which
  `.claude/rules/writing.md` § Substitutions rules `after`. The linter leaves that row unmatched
  because `once` carries a permitted sense, so I ruled the hit myself while rewriting the sentence.
  Substance unchanged.
- **`CompositeStack`: the count `two` became the members' names.** `AGENTS.md` § Writing bans a
  count over a set anyone can add to and offers naming the members instead, so "the two foregrounds"
  became "the refused and accepted foregrounds". That names the interface's own `refused` and
  `accepted` fields, so the reader gains what the number gave and more.
- **Seven blocks became multi-line to stay inside 100 columns.** `COMPACT_WIDTH`, `MatrixRole`,
  `MatrixControl`, `SHELL_ROLES`, `NOTICE_ROLES`, `CompositeStack`, and `CensusReading` each carried
  a one-line block already near the width, and the added verb pushed it past. Each became a
  `/**` … `*/` block with the same sentence wrapped, which is the shape the file already uses.
  Nothing else in either file moved.
- **`App.test.ts`: `just` deleted rather than replaced.** The substitution row says delete, and "the
  control a reader has scrolled to" loses nothing.

## Where the rule's letter and the sentence's truth could have pulled apart

One place, and I did not take the shortcut: several of these constants are collections, and a
summary opening `Roles…`, `Fixtures…`, or `Writes…` would satisfy the linter's stop-set check while
failing the rule the check serves. Every opener in the preceding table is a verb the constant
actually performs for the reader. `Marks` for `COMPACT_WIDTH` and `Caps` for the two budgets are the
two I weighed longest; each names what the value does at its site rather than restating the value's
type.

## Nothing left open

No site required an off-limits edit. No rule was silenced. No suppression comment, no configuration
change.

Standing conditions confirmed unchanged and not acted on: `npm test` still exits 1 on the vendored
`tests/config.test.ts` case, and `scaffold audit` still reports `vite.config.ts` stale. I edited
neither file.

## Instruments

- `.orkestrel/roughnotes/m2-instruments/m2-summaries.mjs` — the replacement script, asserting exactly one hit per pair and
  reporting any line past 100 columns.
- `.orkestrel/roughnotes/m2-lint.log.txt`, `.orkestrel/roughnotes/m2-check.log.txt`, `.orkestrel/roughnotes/m2-appbrowser.log.txt`,
  `.orkestrel/roughnotes/m2-journey.log.txt`, `.orkestrel/roughnotes/m2-policy.log.txt`, `.orkestrel/roughnotes/m2-control.log.txt` —
  the captured runs.

Additional observation, outside the criteria: `npm run test:policy` exits 0 (Test Files 1 passed;
Tests 101 passed, 1 skipped), so the prose sweep reads the rewritten files clean too.
