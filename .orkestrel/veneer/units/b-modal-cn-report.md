# Unit CONDITIONS (`cn`) — report

## Before

```ts
export function normalizeMediaCondition(condition: string | undefined): string | undefined {
	if (condition === undefined) return undefined
	const text = normalizeDeclarationValue(condition.replace(/^@[a-z-]+\s*/u, ''))
	const lower = /^\(min-width:\s*([\d.]+)px\)$/u.exec(text)
	if (lower !== null) return `(width >= ${lower[1] ?? ''}px)`
	const upper = /^\(max-width:\s*([\d.]+)px\)$/u.exec(text)
	if (upper === null) return text
	const bound = Number(upper[1])
	return Number.isInteger(bound)
		? `(width <= ${String(bound)}px)`
		: `(width < ${String(Math.ceil(bound))}px)`
}
```

The single-feature pattern anchors `^...$` over the whole condition text, so a compound `and`
conjunction never matches either branch and returns raw, unrewritten text.

## After

The width-rewrite logic moves to a module-scope `normalizeMediaFeature` helper. The exported
function splits the condition on `and`, maps every feature through the helper, and rejoins in
written order:

```ts
function normalizeMediaFeature(feature: string): string {
	const lower = /^\(min-width:\s*([\d.]+)px\)$/u.exec(feature)
	if (lower !== null) return `(width >= ${lower[1] ?? ''}px)`
	const upper = /^\(max-width:\s*([\d.]+)px\)$/u.exec(feature)
	if (upper === null) return feature
	const bound = Number(upper[1])
	return Number.isInteger(bound)
		? `(width <= ${String(bound)}px)`
		: `(width < ${String(Math.ceil(bound))}px)`
}

export function normalizeMediaCondition(condition: string | undefined): string | undefined {
	if (condition === undefined) return undefined
	const text = normalizeDeclarationValue(condition.replace(/^@[a-z-]+\s*/u, ''))
	return text
		.split(/\s+and\s+/u)
		.map(normalizeMediaFeature)
		.join(' and ')
}
```

A feature that names no width bound (`prefers-reduced-motion`, `display`) passes through the
helper's fall-through branch unchanged, and the `and` split-and-join preserves feature order.

## Cases added (`tests/setupServer.test.ts`, the existing `reads the release width notation and
the range notation as one condition` case)

- `'@media (max-width: 575.98px) and (prefers-reduced-motion: reduce)'` equals
  `'@media (width < 576px) and (prefers-reduced-motion: reduce)'`: distinguishes a rewrite that
  handles only a single-feature condition from one that rewrites a `max-width` feature inside a
  conjunction.
- The reversed-order twin, `'@media (prefers-reduced-motion: reduce) and (max-width: 575.98px)'`
  equals `'@media (prefers-reduced-motion: reduce) and (width < 576px)'`: distinguishes a rewrite
  that only reaches a leading width feature from one that reaches every feature regardless of
  position. Proved live: patching the helper to rewrite only `parts[0]` (leaving the remaining
  features untouched) reddens exactly this case (`Expected: "(prefers-reduced-motion: reduce) and
  (width < 576px)"`, `Received: "(prefers-reduced-motion: reduce) and (max-width: 575.98px)"`) and
  leaves every other case green.
- The existing single-feature cases (`min-width`, `width >= `, `max-width: 575.98px` alone,
  `width < 576px` alone, `max-width: 576px`) and the `@supports (display: grid)` control are
  unchanged and continue to pass, proving the split-on-`and` path is a no-op for a condition with
  one feature.

## Failing-first run

Command: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup
tests/setupServer.test.ts`, run with the new cases in place against the helper as it stood at
`c3ac297` (the export temporarily reverted to its original body, no other file touched):

```
FAIL  |setup| tests/setupServer.test.ts > server setup > reads the release width notation and the
range notation as one condition
AssertionError: expected '(max-width: 575.98px) and (prefers-re…' to be '(width < 576px) and
(prefers-reduced-…'

 Test Files  1 failed (1)
      Tests  1 failed | 96 passed (97)
```

The compound-condition case reddened. Isolated separately (helper as-was, only the reversed-twin
assertion present): the reversed twin reddens too, with the identical shape (`Expected:
"(prefers-reduced-motion: reduce) and (width < 576px)"`, `Received: "(prefers-reduced-motion:
reduce) and (max-width: 575.98px)"`). The single-feature cases and the `@supports` control stayed
green throughout, since the helper's original body is unchanged for a single-feature condition.

After restoring the fixed helper, the same command exits with `Tests 97 passed (97)`.

## Gate results

| Gate | Command | Result |
| --- | --- | --- |
| Format | `npm run format:check` | Exit 0 (`oxfmt` rewrote the new declarations' line-wrapping in place before the check; the check then passed clean; the rewritten form is what the committed diff carries) |
| Lint | `npm run lint:check` | Exit 0 (no output) |
| Typecheck | `npm run check` | Exit 0 (`tsc --noEmit` project, `check:src:core`, `check:src:browser`, `check:src:styles`, `check:app:browser` all exit 0) |
| Scoped run | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupServer.test.ts` (the project is named `setup`, not `src:core`; `configs/`, `vite.config.ts`, and `package.json` name no project matching `setupServer.test`, and `vite.config.ts`'s `setup()` factory declares `include: ['tests/setup*.test.ts']`) | Exit 0, `Tests 97 passed (97)` |
| Conformance | `npm run test:conformance` | Exit 0, `Tests 22 passed (22)`, no ledger row's count changed from the file's own recorded state |

## Deviation

The brief's acceptance criterion 2 names the project `src:core`, hedged with "name the project the
sibling setup proofs use if it differs." It differs: `vite.config.ts` names the project carrying
`tests/setup*.test.ts` (excluding `setupBrowser.test.ts`) `setup`, and no project in `configs/`,
`vite.config.ts`, or `package.json` matches `setupServer.test` under the name `src:core`. Ran the
scoped command against `--project setup` per the criterion's own fallback clause; this is not a
stop-and-report deviation, since the criterion names the correction it authorizes.

## Scope carried

Owned files only: `tests/setupServer.ts` (the `normalizeMediaCondition` helper and its TSDoc, plus
the new `normalizeMediaFeature` helper it now delegates to) and `tests/setupServer.test.ts` (the
normalizer case, extended in place). No other file changed (`git status --porcelain` at hand-back
lists only these two paths).

## Review evidence

`git -C /home/user/veneer-cn diff c3ac297` and `git -C /home/user/veneer-cn status --porcelain`
captured to `tmp/units/cn.diff` and `tmp/units/cn-status.txt`.
