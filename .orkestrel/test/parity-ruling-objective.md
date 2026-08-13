Decision — D

## Grounds

1. Put the comparison in `@orkestrel/guide`, not `@orkestrel/test`. `GuideInterface`, `SourceInterface`, and the check catalog belong to `guide`. Publishing them through `test` would either expose a foreign type or duplicate `guide`’s contract structurally. Both conflict with the [package contract](/home/user/scaffold/.orkestrel/test/contract.md) and the dependency-reuse rule.

2. Keep test registration in each consumer. [tests.md](/home/user/scaffold/.claude/rules/tests.md) says setup owns assertion inputs, while `describe`, `it`, and `expect` remain test registration. A pure comparison function follows the functional-core rule. A registrar importing Vitest into published source does not.

3. The candidate clears the membership gate: the stored detector output contains 96 guide-test clusters, with the largest spanning 39 packages and a 43-line region. That is sufficient for consideration, not automatic publication. There is no second reason to reject a pure composition in `guide`; there is a second reason to reject it from `test`: wrong ownership and a forbidden cross-package contract.

## Verification

I ran these checks with TypeScript 6.0.3:

- The existing foreign-type probe produced `TS2345` and `probe_exit=2`. Its same-copy control printed `control_exit=0`. The structural emitter variant printed `structural_exit=0`.
- I compiled the exact `guide` boundary in memory: local-source `GuideInterface` and `SourceInterface` passed to parameters from the installed published copy. It printed `local_to_published_diagnostics=0`. A negative control passing `number` printed `negative_control_diagnostics=1`.

Therefore, the brief’s foreign-type premise is too broad: these particular structural interfaces are compatible today. That does not permit placing the signature in `@orkestrel/test`; its contract expressly forbids foreign `@orkestrel/*` types, and a local copy would violate the structural-shape doctrine’s first clause. Moving the computation to its type owner removes the boundary rather than depending on current structural compatibility.

I also read the existing detector artifacts. They printed:

```text
guide_clusters 96
max_packages 39
```

The recorded membership list contains 39 distinct packages. I did not rerun the mutating detector because this lane is read-only.

## The exports

Add these exports to `@orkestrel/guide`, not `@orkestrel/test`:

```ts
export interface ParityOptions {
	readonly path: string
	readonly specifiers: readonly string[]
}

export interface ParityResult {
	readonly name: string
	readonly failures: readonly string[]
}

export function compareParity(
	guide: GuideInterface,
	source: SourceInterface,
	options: ParityOptions,
): readonly ParityResult[]
```

`ParityOptions` and `ParityResult` belong in `guide/src/core/types.ts`. `compareParity` belongs in `guide/src/core/helpers.ts` and reaches the existing barrel automatically.

It returns a fixed result for each catalog check, plus interface-specific results. A passing result has `failures: []`. Fixed results must still be returned when an extracted population is empty, so the consumer loop cannot pass vacuously.

`@orkestrel/test` exports: none.

No structural surrogate is proposed, so no structural-inference proof is needed. The function uses the owner’s real `GuideInterface` and `SourceInterface`.

## Before and after

The repeated consumer body currently expands the comparisons into registration:

```ts
for (const entry of manifest) {
	const guide = createGuide(readText(entry.spec))
	const source = createSource({ files, module: entry.source })

	describe(`${entry.concept}`, () => {
		it('extracts a non-empty documented surface', () => {
			expect(guide.surface().length).toBeGreaterThan(0)
		})
		it('documents every source export', () => {
			expect(missingSymbols(source.exports(), guide.surface())).toEqual([])
		})
		it('documents only real exports', () => {
			expect(missingSymbols(guide.surface(), source.exports())).toEqual([])
		})

		it('exposes no hidden module-scope declarations', () => {
			expect(source.hidden().map(symbolKey)).toEqual([])
		})

		for (const group of guide.methods()) {
			const members = source.methods(group.interface)
			const entity = group.interface.replace(/Interface$/, '')

			describe(`${group.interface}`, () => {
				it('documents at least one method', () => {
					expect(group.methods.length).toBeGreaterThan(0)
				})
				it('documents every interface method', () => {
					expect(findMissing(members, group.methods)).toEqual([])
				})
				it('documents no phantom method', () => {
					expect(findMissing(group.methods, members)).toEqual([])
				})
				it(`${entity} exposes no undocumented method`, () => {
					const extra =
						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
					expect(extra).toEqual([])
				})
			})
		}

		it('documents an example for every Surface function', () => {
			const fences = guide.patterns()
			const names = guide
				.surface()
				.filter((symbol) => symbol.kind === 'function')
				.map((symbol) => symbol.name)
			expect(findUnexampled(names, fences, source.examples())).toEqual([])
		})

		for (const group of guide.methods()) {
			const entity = group.interface.replace(/Interface$/, '')

			describe(`${group.interface} examples`, () => {
				it('documents an example for every method', () => {
					const examples =
						entity === group.interface
							? source.examples(group.interface)
							: source.examples(group.interface).concat(source.examples(entity))
					expect(findUnexampled(group.methods, guide.patterns(), examples)).toEqual([])
				})
			})
		}

		it('imports only real exports in every ```ts fence', () => {
			const exports = source.surface().map((symbol) => symbol.name)
			for (const fence of guide.patterns()) {
				for (const row of fenceImports(fence)) {
					if (!SELF_SPECIFIERS.includes(row.specifier)) continue
					expect(findMissing(row.names, exports)).toEqual([])
				}
			}
		})

		it('resolves every relative link', () => {
			const broken = guide
				.links()
				.filter((href) => !isExternalLink(href))
				.map((href) => resolveLink(entry.spec, href))
				.filter((path) => !source.exists(path))
			expect(broken).toEqual([])
		})

		it('links only to test files that exist', () => {
			const missing = guide
				.tests()
				.map((href) => resolveLink(entry.spec, href))
				.filter((path) => !source.exists(path))
			expect(missing).toEqual([])
		})
	})
}
```

Afterward, each consumer retains the assertion and registration shell:

```ts
for (const entry of manifest) {
	describe(entry.concept, () => {
		const guide = createGuide(readText(entry.spec))
		const source = createSource({ files, module: entry.source })
		const results = compareParity(guide, source, {
			path: entry.spec,
			specifiers: SELF_SPECIFIERS,
		})

		for (const result of results) {
			it(result.name, () => {
				expect(result.failures).toEqual([])
			})
		}
	})
}
```

Inventory construction and the non-empty manifest assertion remain in the consumer. Packages such as `mcp` retain their package-specific face and import-grammar proofs alongside this shared kernel. `guide` imports `compareParity` from its local `@src/core`; other packages import it from `@orkestrel/guide`.

## Rejected

- A: rejects an independently measured 39-package duplication without a competing constraint.
- B in `@orkestrel/test`: places a `guide`-owned composition behind the wrong package and violates `test`’s foreign-type contract.
- A locally declared structural `Guide` or `Source` shape: silently redeclares another package’s published contract.
- C: makes published source depend on Vitest and removes registration from the test file.
- Re-exporting `compareParity` through `@orkestrel/test`: prohibited dependency re-export and a superfluous wrapper.

## Cost

The fleet pays for one `@orkestrel/guide` feature, its direct behavioral tests and guide parity, one version update, and 39 consumer edits. Each consumer keeps its Vitest imports, inventory, manifest guard, and roughly six lines of registration.

The largest duplicated region removes `39 × 43 = 1,677` lines. Custom package checks remain local. `@orkestrel/test` keeps zero runtime dependencies, and no published package gains a Vitest dependency.

## Strongest argument against me

Option B in `@orkestrel/test` is operationally simpler: that package already centralizes fleet test infrastructure, and the exact `GuideInterface`/`SourceInterface` two-copy probe compiles today. Existing `@orkestrel/guide` helpers also already expose every primitive, so `compareParity` can look like policy composition rather than a new mechanism. That is a real argument. It loses because `guide` already publishes the normative check catalog and owns both input types; placing the same composition in `test` creates a cross-package contract solely to avoid changing the package that owns the behavior.