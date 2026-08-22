# Design reconciliation: the 0.0.50 rows

Lanes: `design-v50-subjective-report.md` and `design-v50-objective-report.md`, both GPT-5.6
Sol under `routing-amendment-cost.md`, run blind on `design-v50-brief.md`. Reconciled by the
Orchestrator 2026-08-22. The lanes agreed on every ruling; where one is sharper, this file
takes the sharper form and says which.

## The brief was wrong twice, and both lanes caught it

- **"Caller peers pass through unchanged" is false.** The guide says so at
  `guides/scaffold.md:939-944`, but `manifestToDependencies` (`src/core/helpers.ts:833`)
  erases the declaration section, `#pin` (`src/bin/CLI.ts:811`) produces `^<served-version>`
  keyed by name alone, and `replaceManifestRanges` (`src/core/compilers.ts:1481`) applies that
  name across `dependencies`, `devDependencies`, and `peerDependencies`. The section is lost
  before the rewrite, which is the mechanical root cause.
- **"Refuses before it selects a group" is literally wrong.** `repair` parses the selection at
  `src/bin/CLI.ts:323` and `overwrite` at `:429`. The real defect is that `#assertTarget`
  never receives the selection, so every target question applies to the whole run.

Recorded also: an earlier campaign ruling scoped `replaceManifestRanges` to the
`dependencies`, `devDependencies`, and `peerDependencies` sections. Including peers there was
that ruling's error, and this round reverses it.

## Ruling 1 — a peer range is caller-owned

Scaffold never rewrites, inserts, or removes an existing `peerDependencies` entry, and never
touches `peerDependenciesMeta`. A peer states which versions a consumer may already hold and
still satisfy this package; a registry version cannot prove that. Both lanes rejected deriving
a major-line peer, on the same ground: a different derivation does not fix the ownership
error, and below `1.0.0` it is badly wrong — `^0.0.3` admits no later release while `^0`
admits the whole pre-`1.0.0` line.

Runtime `dependencies` and `devDependencies` keep their full-triple floors. The objective
lane's distinction is adopted: a runtime range states what a consumer's production install
must resolve, a development range states the toolchain this workspace builds and tests with,
and neither is a claim about a consumer's own tree.

A `Blueprint.peers` row is written exactly once, at creation, into a vacant target. CLI
derivation from an existing target never invents a peer. `repair`, `catalog`, and `overwrite`
leave an absent peer absent.

## Ruling 2 — a precondition carries the scope of what it blocks

Target questions gain the groups they speak for, and the writing path filters them against the
selection before refusing. The custom-project question carries `configs`. The
planned-dependency question (`src/bin/CLI.ts:1173`) carries `configs` and `tests`. A selection
that includes a blocked group still refuses atomically before any write; a selection that
excludes it proceeds. `audit` reports a question only when its selection includes that
question's groups, and the question stays non-blocking.

Rejected, both lanes agreeing: importing a target's own Vitest projects into the plan. A
project label is not a project definition, and parsing arbitrary Vite source would duplicate
the analyzer boundary this repository forbids.

Held back deliberately: `overwrite`'s dirty-tree refusal has the same over-broad shape, and it
guards a destructive path. It stays whole-run in this release and gets its own ruling.

## Ruling 3 — the gate that would have caught this

Unit assertions prove scaffold's rewrite policy, never npm installability. The distribution
proof builds a local tarball carrying a preserved peer beside a co-peer witness that pins an
exact version, runs the real resolver, and proves the install resolves; its negative control
substitutes the narrowed peer and observes `ERESOLVE`. The objective lane's warning is adopted
verbatim: a generic pack-and-install with no co-peer witness can miss this defect entirely,
because npm may happily install a version satisfying the narrowed range.

The landed tests at `tests/src/core/compilers.test.ts:71-79` and
`tests/src/server/Materializer.test.ts:1132` currently require the defective behaviour. They
are reversed as part of the fix; a test that pins a defect is why no gate caught it.

## Exit criterion

0.0.50 closes when: no writing verb alters a peer, proven by a test whose control shows the
old behaviour failing; target questions carry and honour group scope, proven per verb on both
sides of the selection; the distribution proof installs a preserved peer beside a co-peer
witness and its narrowed-peer control observes `ERESOLVE`; the guide states the ownership rule
and the scoped refusal; and the gates run green.
