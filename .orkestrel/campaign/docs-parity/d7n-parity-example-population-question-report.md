## Objective ruling

The current `report.examples` couples distinct policies and changes scaffold’s accepted contract.

`Parity.#inspectExamples` puts exhaustive Surface-function findings and exhaustive method findings into one flat array (`C:/Users/mikes/WebstormProjects/guide/src/core/Parity.ts:251`). `ParityReport.examples` exposes only that flat population (`C:/Users/mikes/WebstormProjects/guide/src/core/types.ts:186`). Guide previously asserted function and method coverage separately (`.orkestrel/campaign/docs-parity/evidence/d7n-guide-parity-core-pack/diff-before.txt:1343`). Scaffold required a configured-language fence per indexed guide, equality for already-matched titles, and a matched top-level title in its own guide; it did not require exhaustive function or method examples (`tmp/units/d7n-scaffold-parity-adopt-report.md`, “Found”).

Use independent report groups, not policy switches:

```ts
export interface ParityExamples {
	readonly functions: readonly ParityFinding[]
	readonly methods: readonly ParityFinding[]
	readonly pairs: readonly ParityFinding[]
}

export interface ParityReport {
	// existing properties
	readonly examples: ParityExamples
}
```

Keep the current Surface-function computation under `examples.functions`. Keep the current documented-member computation under `examples.methods`. Compute `examples.pairs` from the exact prior pin: titled guide fences intersecting titles from `row.source.examples()`. Do not broaden that pair population to member examples or all `collectTitles` results.

Also correct `#inspectFences`: add a finding when an indexed guide has no fence whose language equals `ParityOptions.language`. The current method only reports languages outside `ParityOptions.languages` (`C:/Users/mikes/WebstormProjects/guide/src/core/Parity.ts:242`), so it omits scaffold’s former configured-language presence guard.

Thin callers then preserve their actual contracts:

- Guide asserts `examples.functions`, `examples.methods`, and the applicable `examples.pairs` selection independently.
- Scaffold asserts configured-language presence through `report.fences`, matched equality through `report.drift`, and `examples.pairs` filtered to `guides/scaffold.md`.
- Scaffold does not assert `examples.functions` or `examples.methods`; those were never scaffold policy.
- Native report flattening must flatten the nested example groups when it prints selected findings.

This adds no option, exemption, downstream example recomputation, or new example requirement. Selecting an existing report group is the policy boundary.

Bind the distinction with a permanent Parity control in Guide: a documented member lacking an example must appear only in `examples.methods`; removing the configured-language fence must move only `report.fences`; removing the shared top-level title must move only `examples.pairs`. Retain the real scaffold command as the consumer control: the missing `MaterializerInterface` and `WriteTransaction` method examples must no longer fail scaffold, while deleting its configured-language fence or matched title must still fail.

This is the recommended content for `tmp/units/d7n-parity-example-population-question-report.md`.
