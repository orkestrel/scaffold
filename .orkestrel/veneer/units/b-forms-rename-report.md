# Unit B-FORMS-RENAME — report

## Edits applied

`src/styles/_mixins.scss`:

```scss
// Emits the type run every form input shares: the release derives it from its `$input-*`
// variables, so `.form-control`, `.form-select`, and `.input-group-text` read the same four
// declarations here.
@mixin input-text {
	font-size: var(--vn-size-3);
	font-weight: var(--vn-weight-body);
	line-height: var(--vn-line-body);
	color: var(--bs-body-color);
}

// Emits the border run every form input shares: the release derives it from its `$input-*`
// variables, so `.form-control`, `.form-select`, and `.input-group-text` read the same two
// declarations here.
@mixin input-border {
	border: var(--bs-border-width) solid var(--bs-border-color);
	border-radius: var(--bs-border-radius);
}
```

Declarations inside each mixin are unchanged from before the rename.

`src/styles/components/_form-control.scss`, `_form-select.scss`, `_input-group.scss`: each of the
six include sites now reads `@include input-text;` and `@include input-border;`, in place of
`@include control-type;` and `@include control-border;` respectively. Nothing else in these files
changed.

`tests/setupStyles.ts`, the `INPUT_GROUP_CASES` remark's `reads` paragraph now reads:

> The `reads` map is keyed by property, across every rule the selector heads: a sized select
> heads its size rule and the rule that restores its indicator room, and the two write different
> properties. A property the map leaves out is the claim that its declaration writes no
> `var()`, so an empty map states that the rule reads no custom property and leaves its literals
> to the value assertions. A token moved from the property that consumes it onto another
> declaration of the same rule reads as a different row.

## Compile comparison

1. `npx --no-install sass --no-source-map src/styles/index.scss > …/bfr-before.css` (before edits) — exit `0`.
2. `npx --no-install sass --no-source-map src/styles/index.scss > …/bfr-after.css` (after edits) — exit `0`.
3. `cmp …/bfr-before.css …/bfr-after.css` — exit `0` (byte-identical).

## Gate table

| Command | Exit | Reading |
| --- | --- | --- |
| `grep -rn "control-type\|control-border" src tests guides` | 1 | No match: the old names appear nowhere. |
| `npx oxfmt --config .oxfmtrc.json --check` (owned files) | 0 | All five files use the correct format. |
| `npx oxlint --config .oxlintrc.json --deny-warnings tests/setupStyles.ts` | 0 | No lint findings. |
| `npm run check` | 0 | `tsc` for `core`, `browser`, `styles`, and `check:app:browser` (`vue-tsc`) all clean. |
| `npm run build:src` | 0 | `core`, `browser`, and `styles` builds succeed; the `styles` bundle compiles the renamed mixins. |
| `npx vitest run … tests/setupStyles.test.ts` | 0 | 105 passed. |
| `npm run test:policy` | 0 | 109 passed, 1 skipped (pre-existing skip, unrelated to this unit). |

## Status and stat output

```text
$ git status --porcelain
 M src/styles/_mixins.scss
 M src/styles/components/_form-control.scss
 M src/styles/components/_form-select.scss
 M src/styles/components/_input-group.scss
 M tests/setupStyles.ts

$ git diff 53628aa --stat
 src/styles/_mixins.scss                  |  8 ++++----
 src/styles/components/_form-control.scss |  4 ++--
 src/styles/components/_form-select.scss  |  4 ++--
 src/styles/components/_input-group.scss  |  4 ++--
 tests/setupStyles.ts                     | 11 ++++++-----
 5 files changed, 16 insertions(+), 15 deletions(-)
```

The status lists exactly the owned files and nothing else.

## Deviations

None. Every edit applied as specified; every acceptance criterion holds on the evidence above.

## Unverified claims

None. Every claim in this report rests on a command run in this session and its recorded exit code.
