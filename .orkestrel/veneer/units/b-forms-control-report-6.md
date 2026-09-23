# Unit B-FORMS-CONTROL, round 6 — report

## Edits applied

1. `guides/veneer.md`, "Every child after the first pulls back" paragraph, final text:

   > Every child after the first pulls back by `--bs-border-width`, so two neighbours paint one line,
   > where each neighbour's border is one `--bs-border-width` wide, and the group squares each corner a
   > neighbour touches while the group's outer corners keep the child's own radius. Feedback and tooltip
   > elements are the children left in place, so neither pulls back nor loses a corner: feedback wraps
   > onto a line of its own under the row, and a tooltip is positioned absolutely below the group
   > (`position: absolute; top: 100%`), so it takes no part in the wrap. A group carrying the
   > `has-validation` class ends with its feedback, so the squaring counts one child further from the end
   > and the last child on the row keeps its trailing corners. A control inside a floating wrapper is
   > squared through the wrapper, because the control carries the border.

2. `guides/veneer.md`, "The `.dropdown-toggle` corner rules stay withheld" paragraph, final text:

   > The `.dropdown-toggle` corner rules stay withheld, because the dropdown toggle Disclosure owns is
   > the element they shape; § Deferred selectors carries their rows. The `.form-control`,
   > `.form-select`, and `.form-floating` rules ship, so a grouped control carries its own
   > `--bs-border-width` border and focus ring under the group's rules.

3. `tests/app/browser/integration.test.ts`, input-group focus case comment, final text:

   > // is lifted past it. The following reading uses the button's own border width, which is
   > // the width the group's pull-back is written in.

4. `tests/app/browser/integration.test.ts`, plain-select focus case comment, final text:

   > // The traversal starts from the `Range` specimen's control rather than from the document's
   > // own start, for the reason the range slider case states.

5. `tests/app/browser/integration.test.ts`, input-group focus case comment, final text:

   > // The traversal starts from the `Input group addons` specimen's control rather than from
   > // the document's own start, for the reason the range slider case states.

6. `tests/src/styles/components/input-group.test.ts`, comment, final text:

   > // The same control outside a group is no flex item, and the group's `width: 1%` stays
   > // scoped to the group's children, so the bare control takes the full width the
   > // `.form-control` rule gives it.

Each paragraph or comment touched by an edit was rewrapped so no line passes 100 columns and no
short line is left inside it (both `guides/veneer.md` paragraphs were rewrapped in full per the
brief's instruction).

## Gate table

| Command | Exit | Reading |
| --- | --- | --- |
| `node_modules/.bin/oxfmt --config .oxfmtrc.json --check <owned files>` | 0 | "All matched files use the correct format." (3 files) |
| `node_modules/.bin/oxlint --config .oxlintrc.json --deny-warnings <owned TypeScript files>` | 0 | no output, no diagnostics |
| `npm run check` | 0 | `tsc` (core/browser/styles) and `vue-tsc` (app browser) all clean |
| `npm run test:guides` | 0 | 1 test file, 18 tests passed |
| `npm run test:policy` | 0 | 1 test file, 109 passed, 1 skipped |

Deviation on invocation mechanism (not scope): the project's `package.json` `devEngines.packageManager`
pins `npm >=11.6.0`, and the only npm binaries on `PATH` (`/opt/node20`, `/opt/node21`, `/opt/node22`)
are `10.8.2`, `10.5.0`, and `10.9.7`, so a bare `npm run <script>` fails immediately with
`EBADDEVENGINES` before running anything, for every script including `check`, `test:guides`, and
`test:policy`. `corepack use npm@11` (read-only cache fetch, no package install, no `package.json`
edit — confirmed by `git status --porcelain` showing no `package.json` change) populated
`/root/.cache/node/corepack/v1/npm/11.20.0`. A shim `npm` script in the session scratchpad
(`/tmp/.../scratchpad/npm11bin/npm`) that execs
`node /root/.cache/node/corepack/v1/npm/11.20.0/bin/npm-cli.js "$@"`, prepended to `PATH` for the
gate commands only, let nested `npm run` calls (`check:src`, `check:app:browser`, and so on) resolve
to npm 11.20.0 too. `oxfmt` and `oxlint` were run directly from `node_modules/.bin/` for the same
reason (`npx` also invokes the pinned-npm check). No file under the unit's scope changed as part of
this; the shim lives outside the repository entirely.

## Status and stat output

```
$ git status --porcelain
 M guides/veneer.md
 M tests/app/browser/integration.test.ts
 M tests/src/styles/components/input-group.test.ts
```

```
$ git diff f82de43 --stat
 guides/veneer.md                                | 25 +++++++++++--------------
 tests/app/browser/integration.test.ts           | 18 ++++++++++++++++--
 tests/src/styles/components/input-group.test.ts |  6 ++++--
 3 files changed, 31 insertions(+), 18 deletions(-)
```

The status lists exactly the round-5 set (the same three files the round-5 report named); this
round changed no new file.

## Deviations

- Expected: `npm run check`, `npm run test:guides`, `npm run test:policy` runnable directly per
  § Execution. Found: `EBADDEVENGINES` from the tree's pinned `npm >=11.6.0` against the installed
  `10.9.7`. Evidence: exact npm error text above. Done: worked around by using `node_modules/.bin`
  binaries directly and a scratchpad-only npm 11 shim (see gate table); did not touch any owned or
  off-limits file to do so. Hypothesis: an environment-level npm version mismatch unrelated to the
  round-5 or round-6 edits, since the same mismatch would have blocked round 5 too.

No edit's search text was found anywhere other than once and exactly once. No other conflict arose.

## Claims flagged as unverified

None. Every gate in the gate table was run and its exit code and reading recorded directly above.
