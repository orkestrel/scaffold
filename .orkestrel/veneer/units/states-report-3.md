# Unit STATES round 3 report

## Item 1 — guide sentence

**Before** (`guides/veneer.md`, § Form range classes):
> The frames read the fill alone, so the gated rule is read as well: it declares
> `transition-property: none` and a `0s` duration and nothing else, which refuses a transition
> surviving on another thumb property.

**After**:
> The frames read the fill alone, so the gated rule is read as well: it declares `transition: none`
> and no other property, and its `transition-property: none` refuses a transition surviving on
> another thumb property.

oxfmt left the paragraph's wrapping unchanged; no rewrap was needed.

## Item 2 — producer's returned object literal

**Before** (`tests/src/styles/components/form-range.test.ts`, case `runs the thumb fill transition
with motion allowed and lands each fill at once under reduced motion`):
```ts
return {
	frame,
	started: await measureDifference(frame, started, centre),
	held: await measureDifference(frame, held, centre),
}
```

**After**:
```ts
return {
	started: await measureDifference(frame, started, centre),
	held: await measureDifference(frame, held, centre),
	frame,
}
```

Nothing else in the case changed. oxfmt left the file unchanged.

## Gate table

| Gate | Command | Exit |
| --- | --- | --- |
| Typecheck | `npm run check` | 0 |
| Lint | `npm run lint:check` | 0 |
| Format check | `./node_modules/.bin/oxfmt --config .oxfmtrc.json --check guides/veneer.md tests/src/styles/components/form-range.test.ts` | 0 |
| Styles build | `npm run build:src:styles` | 0 |
| Form-range test | `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/form-range.test.ts` | 0 (10 passed) |
| Guides parity | `npm run test:guides` | 0 (20 passed) |
| Policy | `npm run test:policy` | 0 (109 passed, 1 skipped) |

Logs: `tmp/units/sts-3-check.log.txt`, `tmp/units/sts-3-lint.log.txt`,
`tmp/units/sts-3-oxfmt-check.log.txt`, `tmp/units/sts-3-build.log.txt`, `tmp/units/sts-3-vitest.log.txt`,
`tmp/units/sts-3-guides.log.txt`, `tmp/units/sts-3-policy.log.txt`.

## Diff and status

`tmp/units/sts-3.diff` holds `git diff 2376710`, spanning both this round's two owned files and
the prior rounds' files (`tests/setupBrowser.test.ts`, `tests/setupBrowser.ts`,
`tests/src/styles/components/button.test.ts`) already present in the worktree.

`tmp/units/sts-3-status.txt` holds the working-tree status: five modified files, none staged.

## Review evidence

The diff (`tmp/units/sts-3.diff`) and status (`tmp/units/sts-3-status.txt`) are attached above.
Both Items are applied exactly as specified: the guide sentence's replacement text matches Item 1
verbatim, and the object literal's key order matches Item 2 verbatim
(`{ started: await measureDifference(frame, started, centre), held: await measureDifference(frame, held, centre), frame }`)
in the file's own tab formatting. Nothing else in either owned file changed.
