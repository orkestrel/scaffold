# Report — U4 `d7-guide-links` (the compared form of a `{@link}` drops the module part of its target)

Done. `normalizeSummary` drops a target's module part, so a cross-file `{@link}` in a doc block
and the bare code token in the guide cell documenting it reach the same compared text.

Wall clock: 2026-09-07T15:45:49Z to 2026-09-07T15:49:20Z, on `/home/user/fleet/guide`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, baseline tip `c86f7fd`. Version left at `0.0.18`;
`package.json` and `package-lock.json` untouched.

## Hunks

`src/core/helpers.ts` — the expansion, an optional module-part prefix outside the capture:

```diff
 			normalized += part
 				.replace(/\{@link\s+[^}|]*\|\s*([^}]*?)\s*\}/g, '`$1`')
-				.replace(/\{@link\s+([^}|]*?)\s*\}/g, '`$1`')
+				.replace(/\{@link\s+(?:import\([^)]*\)\.|[^}|#\s]*#)?([^}|]*?)\s*\}/g, '`$1`')
```

The prefix alternation is tried before the capture, and the capture excludes `|`, so the labelled
form still matches only the earlier replace and renders its label whole.

`src/core/helpers.ts` — the description paragraph:

```diff
  * Returns the canonical compared form of a description paragraph — `{@link Target}` and
- * `{@link Target | label}` become the code token of the label or the target text, every run of
- * whitespace, including a collapsed continuation marker and a line break, becomes one space,
- * the ends trim, and a code span keeps its delimiters while its own boundary whitespace goes.
- * The guide's side and the source's side read through this one form.
+ * `{@link Target | label}` become the code token of the label or the target text with the
+ * target's `import('./module.js').` or `module#` module part dropped, every run of whitespace,
+ * including a collapsed continuation marker and a line break, becomes one space, the ends trim,
+ * and a code span keeps its delimiters while its own boundary whitespace goes. The guide's side
+ * and the source's side read through this one form.
```

`src/core/helpers.ts` — a `@remarks` paragraph naming the two module-part forms and what travels,
inserted before the multi-backtick paragraph:

```diff
+ * A target's module part is the inline import form `import('<specifier>').` or the declaration
+ * reference form `<module>#`, and the expansion drops it, so a cross-file link and the code
+ * token a guide cell documents it with reach the same text. Everything after that part travels:
+ * `Owner.member` keeps its owner, and a dotted target no module part precedes is untouched. A
+ * label is text rather than a target, so `{@link Target | label}` renders its label whole.
+ *
```

`src/core/helpers.ts` — the `@example`:

```diff
  * normalizeSummary('Creates a\n{@link Widget}.') // 'Creates a `Widget`.'
+ * normalizeSummary("Reads {@link import('./widgets.js').Widget}.") // 'Reads `Widget`.'
  * normalizeSummary('cells joined by ` | `.') // 'cells joined by `|`.'
```

`guides/guide.md` — the `## Surface` cell, converged by `npm run docs -- --to guide` and re-padded
by `oxfmt --write` on that file alone:

```diff
-| `normalizeSummary`      | function | `(text: string) => string` | Returns the canonical compared form of a description paragraph — `{@link Target}` and `{@link Target \| label}` become the code token of the label or the target text, every run of whitespace, …
+| `normalizeSummary`      | function | `(text: string) => string` | Returns the canonical compared form of a description paragraph — `{@link Target}` and `{@link Target \| label}` become the code token of the label or the target text with the target's `import('./module.js').` or `module#` module part dropped, every run of whitespace, …
```

`guides/guide.md` — the compared-form clause list, one bullet added between the target-text bullet
and the label bullet:

```diff
 - `{@link X}` and `{@link A.b}` become the code token of the target text, outside a located span.
+- A target's module part — the inline import form `import('./module.js').` and the declaration reference form `module#` — drops, so `{@link import('./module.js').X}` and `{@link module#X}` become the code token of `X` while `{@link import('./module.js').A.b}` becomes the code token of `A.b`.
 - `{@link X | text}` becomes the code token of `text`, outside a located span.
```

`tests/src/core/helpers.test.ts` — cases added inside `describe('normalizeSummary')`, behind a
comment naming the clause and its control:

```ts
	it('drops the module part of an inline import target', () => {
		expect(normalizeSummary("Reads {@link import('./widgets.js').Widget}.")).toBe('Reads `Widget`.')
		expect(normalizeSummary("Reads {@link import('@scope/widgets').Widget}.")).toBe(
			'Reads `Widget`.',
		)
	})

	it('keeps the member of an inline import target', () => {
		expect(normalizeSummary("Reads {@link import('./widgets.js').Widget.render}.")).toBe(
			'Reads `Widget.render`.',
		)
	})

	it('drops the package part of a declaration reference target', () => {
		expect(normalizeSummary('Reads {@link @scope/widgets#Widget}.')).toBe('Reads `Widget`.')
		expect(normalizeSummary('Reads {@link @scope/widgets#Widget.render}.')).toBe(
			'Reads `Widget.render`.',
		)
	})

	it('renders the label of a labelled link whose target names a module', () => {
		expect(normalizeSummary("Creates {@link import('./widgets.js').Widget | a widget}.")).toBe(
			'Creates `a widget`.',
		)
	})
```

`tests/src/core/helpers.test.ts` — the round trip inside `describe('findDrift')`, over the real
`createSource` and `createGuide` factories with no part of the comparison replaced:

```ts
	it('reads a module-qualified link against the bare token documenting it', () => {
		const linked = AGREEING_GUIDE.replace(
			'| `createWidget` | function | Creates a widget. |',
			'| `createWidget` | function | Creates a `Widget`. |',
		)
		const cross = createSource({
			files: {
				...FILES,
				'module/factories.ts': [
					'/**',
					" * Creates a {@link import('./widgets.js').Widget}.",
					' */',
					'export function createWidget(): void {}',
					'',
				].join('\n'),
			},
			module: 'module',
		})
		expect(findDrift(createGuide(linked), cross)).toEqual([])
	})
```

Diffstat:

```text
 guides/guide.md                |  3 ++-
 src/core/helpers.ts            | 18 ++++++++++----
 tests/src/core/helpers.test.ts | 53 ++++++++++++++++++++++++++++++++++++++++++
 3 files changed, 68 insertions(+), 6 deletions(-)
```

## Criterion 1 — the cases red before the change, green after

Command, run at 2026-09-07T15:45:49Z with the tests added and `src/core/helpers.ts` untouched:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/helpers.test.ts
```

Last lines:

```text
 Test Files  1 failed (1)
      Tests  4 failed | 416 passed (420)
   Duration  3.83s
```

The failing test names, each with its reading:

- `normalizeSummary > drops the module part of an inline import target` — received
  `` Reads `import('./widgets.js').Widget`. ``
- `normalizeSummary > keeps the member of an inline import target` — received
  `` Reads `import('./widgets.js').Widget.render`. ``
- `normalizeSummary > drops the package part of a declaration reference target` — received
  `` Reads `@scope/widgets#Widget`. ``
- `findDrift > reads a module-qualified link against the bare token documenting it` — received
  `` [{ key: 'function createWidget', guide: 'Creates a `Widget`.', source: 'Creates a `import(\'./widgets.js\').Widget`.' }] ``

`normalizeSummary > renders the label of a labelled link whose target names a module` passed red-run
too, and is recorded here as a guard rather than as a proof of the defect: a label is text, so the
labelled replace already rendered it whole and the change must not move it.

The same command after the change:

```text
 Test Files  1 passed (1)
      Tests  420 passed (420)
   Duration  3.27s
```

The control for over-stripping is the existing case
`normalizeSummary > renders a qualified link target as a code token`
(`` Reads {@link Widget.render}. `` → `` Reads `Widget.render`. ``): a dot that no module part
precedes must not split. It is green on both runs, so no new duplicate of the plain form was added.

## Criterion 2 — format, lint, typecheck

```text
npx oxfmt --config .oxfmtrc.json --check src/core/helpers.ts tests/src/core/helpers.test.ts guides/guide.md
```

```text
Checking formatting...

All matched files use the correct format.
Finished in 866ms on 3 files using 4 threads.
```

Exit 0.

```text
npx oxlint --config .oxlintrc.json --deny-warnings src/core/helpers.ts tests/src/core/helpers.test.ts
```

No diagnostic printed. Exit 0.

```text
npm run check
```

```text
> @orkestrel/guide@0.0.18 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
```

Exit 0.

## Criterion 3 — build, then docs at zero disagreements

```text
npm run build
```

Exit 0; last lines `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts`. The API
Extractor line `*** The target project appears to use TypeScript 6.0.3 which is newer than the
bundled compiler engine` is present on the baseline too and is not a failure.

```text
npm run docs
```

```text
rows read: 1, disagreements found: 0
```

Exit 0. Convergence was reached by `npm run docs -- --to guide`, which reported
`rows read: 1, disagreements found: 1, written: 1, reported: 0`; that write emits a minimal-width
table, so `npx oxfmt --config .oxfmtrc.json --write guides/guide.md` restored the padding. Only the
owned file was formatted; no tree-wide `format` was run.

## Criterion 4 — the suites

```text
npm run test:src:core
```

```text
 Test Files  8 passed (8)
      Tests  605 passed (605)
   Duration  3.01s
```

```text
npm run test:guides
```

```text
 Test Files  1 passed (1)
      Tests  54 passed (54)
   Duration  2.44s
```

```text
npm run test:policy
```

```text
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  1.31s
```

The skipped policy test is on the baseline as well; the change added no skip.

Each exited 0.

## Criterion 5 — owned files only

```text
git status --short
```

```text
 M guides/guide.md
 M src/core/helpers.ts
 M tests/src/core/helpers.test.ts
```

`dist/**` is not tracked, confirmed twice: `git ls-files dist` prints nothing, and
`git check-ignore -v dist/src/core/index.js` reports `.gitignore:12:dist`.

## Shared-file patches

None. Every edit landed in an owned file. `README.md` was left untouched: a grep for `code token`,
`{@link`, and `compared form` over `README.md` matched nothing, so it states no compared form, which
is the condition the brief set for editing it.

## Deviation state

No deviation. Each stop condition was checked and none fired:

- **A target form the rule does not cover that the guide's own doc blocks use.** A sweep of every
  `{@link}` target in `src/`
  (`grep -rhno "{@link [^}]*}" src/ | sed 's/.*{@link //;s/}$//;s/ |.*//' | sort -u`) returns bare
  names, `Owner.member` names, and nothing else. No target in this repository carries a module part
  today, so the rule covers every form in use.
- **A `findDrift` round trip still reporting drift.** The added round-trip case is green.
- **A gate outside the owned files going red.** Every gate run exited 0.

Two ancillary decisions, recorded rather than escalated:

- The brief's "unchanged plain form" case is not added as a new test. It could not be recorded red,
  because it passes on the baseline, and
  `normalizeSummary > renders a qualified link target as a code token` already asserts exactly it.
  Duplicating it would have added a near-duplicate to the suite; the existing case is named in the
  report as the control instead.
- The `@remarks` paragraph was added beyond the description paragraph and `@example` the brief
  names. The description now names the two module-part forms in one clause, and the remarks section
  is where this doc block already explains what each clause sees; the paragraph states what travels
  after the dropped part and that a label is not a target. It is inside the owned file and outside
  the compared paragraph, so it moves no guide cell.
