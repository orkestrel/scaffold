## Objective amendment

Preserve caller policy through independently selectable report populations. Do not add `ParityOptions` switches and do not return to downstream recomputation.

Use singular public type names:

```ts
export interface ParityPopulationReport {
	readonly headings: readonly ParityFinding[]
	readonly surface: readonly ParityFinding[]
	readonly methods: readonly ParityFinding[]
	readonly tests: readonly ParityFinding[]
	readonly fences: readonly ParityFinding[]
}

export interface ParityMethodReport {
	readonly documented: readonly ParityFinding[]
	readonly declared: readonly ParityFinding[]
}

export interface ParityFenceReport {
	readonly languages: readonly ParityFinding[]
}

export interface ParityExampleReport {
	readonly functions: readonly ParityFinding[]
	readonly methods: readonly ParityFinding[]
	readonly pairs: readonly ParityFinding[]
}

export interface ParityReport {
	readonly input: readonly ParityFinding[]
	readonly population: ParityPopulationReport
	readonly surface: readonly ParityFinding[]
	readonly methods: ParityMethodReport
	readonly links: readonly ParityFinding[]
	readonly tests: readonly ParityFinding[]
	readonly fences: ParityFenceReport
	readonly examples: ParityExampleReport
	readonly imports: readonly ParityFinding[]
	readonly drift: readonly ParityFinding[]
	readonly pitch: readonly ParityFinding[]
}
```

Move existing non-vacuous findings into `population` instead of duplicating them in relation groups. `population.headings` checks the required Surface, Methods, and Tests headings. The remaining population fields check a documented surface, a documented method group, a test link, and a fence in `ParityOptions.language`. `fences.languages` remains only the admitted-language check. This lets scaffold preserve its earlier section guard without strengthening Guide’s admitted-language contract. Scaffold’s prior combined guard is visible at `evidence/d7n-scripts-ownership/product.diff.txt:2873`.

Split method findings by traversal authority:

- `methods.documented` walks `guide.methods()`. It retains nonempty documented groups, exact guide-to-interface membership, phantom-member rejection, and class extras. This is Guide’s prior contract at `evidence/d7n-guide-parity-core-pack/diff-before.txt:1300`.
- `methods.declared` walks behavioral declarations from `source.surface()`. It reports a source declaration with methods but no guide group. For a class with a named companion interface, it reports interface methods the class omits. Class extras remain in `methods.documented`, avoiding duplicate findings while the selected groups together preserve scaffold’s exact class/interface contract.

The current implementation only walks documented groups (`C:/Users/mikes/WebstormProjects/guide/src/core/Parity.ts:186`). Root’s executed omitted-group reading shows that removing the Methods section leaves `Source.methods('WidgetInterface')` populated while the shared methods report stays empty (`.orkestrel/campaign/docs-parity/d7n-parity-method-population-root-reading.md:9`). The class-population control likewise shows interface methods `open` and `render`, class method `render`, and no shared finding. These are defects in source-driven coverage, not new policy.

Retain the earlier example split:

- `examples.functions` owns exhaustive Surface-function coverage.
- `examples.methods` owns exhaustive documented-method coverage.
- `examples.pairs` owns the prior top-level title intersection using `row.source.examples()` and titled guide fences.

Do not use `collectTitles` for `examples.pairs`. `report.drift` remains the broader equality check for pairs that `findDrift` reaches, including member examples. Pair presence and pair equality remain distinct.

## Caller deltas

Guide asserts only the populations it previously owned:

- its prior non-vacuous population fields;
- `methods.documented`;
- `fences.languages`;
- `examples.functions`;
- `examples.methods`;
- `examples.pairs`;
- the unchanged surface, link, test, import, drift, and pitch groups.

Scaffold asserts:

- every `population` field;
- `methods.documented` and `methods.declared`;
- `fences.languages`;
- `examples.pairs` filtered to `guides/scaffold.md`;
- the unchanged surface, link, test, import, drift, and pitch groups.

Scaffold must not assert `examples.functions` or `examples.methods`. Its accepted contract required a configured-language fence per indexed guide, matched-pair equality, and a matched top-level title in its own guide. It did not require exhaustive behavior examples.

Native reporting must flatten the nested report groups in a fixed order. No result should be hidden merely because a package does not assert that policy group.

## Permanent controls

- Remove an interface’s guide group while its source methods remain. Only `methods.declared` and the applicable method population finding may fail.
- Keep a documented interface with `open` and `render`, but give its implementing class only `render`. Only `methods.declared` must report the missing class member.
- Add a class method outside its documented interface. `methods.documented` must report the extra, preserving Guide’s earlier group-driven assertion.
- Leave an admitted nonconfigured fence while removing the configured-language fence. `population.fences` must fail while `fences.languages` stays empty.
- Remove a Surface-function example. Only `examples.functions` must gain the coverage finding.
- Remove a documented-method example. Only `examples.methods` must gain the coverage finding.
- Remove the shared top-level title without creating text inequality. Only `examples.pairs` must gain the population finding.
- Change the content of a retained matched title. `report.drift` must fail while `examples.pairs` stays empty.
- Remove a required heading while retaining unrelated parsed content. Only `population.headings` must gain that structural finding.

## Review limit

This is a source-backed contract recommendation. Root’s executed readings establish the omitted-group and incomplete-class failures, but this lane did not execute the revised source or accept its diff. Rewrite behavior, script ownership, command behavior, and CLI design remain outside this amendment. Final acceptance still requires root execution and the independent actual-diff review.
