The local category is achievable with the installed API. `Drift.key` alone cannot recover it, but the documented result order plus `collectTitles` and `replaceFence` can define the boundary without reimplementing pairing.

```ts
interface Comparison {
	readonly category: 'summary' | 'example'
	readonly drift: Drift
}

function collectComparisons(
	markdown: string,
	guide: GuideInterface,
	source: SourceInterface,
): readonly Comparison[] {
	const drifts = findDrift(guide, source)
	const changed = [...collectTitles(guide, source)].filter(([title, example]) => {
		const replaced = replaceFence(markdown, title, example)
		return replaced !== undefined && replaced !== markdown
	})
	const boundary = drifts.length - changed.length

	return drifts.map((drift, index) => ({
		category: index < boundary ? 'summary' : 'example',
		drift,
	}))
}
```

This composition holds because:

- `collectTitles` owns source-example selection and shared-title pairing.
- `replaceFence` owns first-matching guide-fence selection and compares the same language/code fields.
- `undefined` means the guide supplies no paired fence, so `findDrift` emits no example disagreement.
- Identity means the pair agrees.
- Changed text corresponds to an example disagreement.
- `findDrift` places all example disagreements after surface and method disagreements.

`Row` can retain `readonly comparisons: readonly Comparison[]`. The writers branch on `comparison.category`, not `row.summaries.has(drift.key)`. Reason keys also include the category:

```ts
`${spec}\n${comparison.category}\n${comparison.drift.key}`
```

Fresh rows rebuild the same categories before unresolved reporting. This keeps `findDrift` authoritative, adds no parser or Guide API, and handles a title identical to `function shape` or `Owner.member`.

The API limit is narrow: category cannot be inferred safely from an untagged `Drift` in isolation. The composition must retain the documented ordering and use `replaceFence` as the installed example-disagreement oracle.
