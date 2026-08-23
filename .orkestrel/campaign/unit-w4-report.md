# Unit W4 report — write the manifest script region

Role `implementer`, Opus 5, clean context, sole serial writer.
Brief: `.orkestrel/campaign/unit-w4-brief.md`.

## What landed

`replaceManifestScripts` in `src/core/compilers.ts`, a sibling of `replaceManifestRanges` with the
same `string | undefined` convention, plus `blueprintToWritableScripts` deriving the region and its
accepted predecessors. `MaterializerInterface.declare` now takes a grouped `ManifestRegionSet`, and
all four call sites pass it. The release row moved into `RELEASE_PROOF_COMMAND` so the compiler and
the region deriver read one spelling and cannot drift.

## Failing-first evidence

Taken at the pre-edit HEAD against a scratch workspace downgraded to the pre-proof chain, `repair`
refused outright and wrote nothing, demanding a hand edit to `package.json`. That refusal is the
state this unit reverses, and it was recorded red before the fix rather than reconstructed after.

## The two properties that had to hold

A recognized chain is rewritten with **every byte outside the replaced ranges identical** — asserted
directly by building the expectation as the input string with only the replaced ranges edited, both
at the compiler and against the on-disk file. An unrecognized chain returns `undefined` with the
file unchanged — asserted as both the return value and a byte comparison of the file.

Each byte-level pin was shown able to fail and then restored: disabling the accepted-value check
reddened two tests, and flattening the append separator reddened the two byte-identity tests.

## Executed evidence

A workspace scaffolded outside this repository and downgraded to the pre-proof chain gained both
rows under `repair`, with the whole-file diff showing only the `prepublishOnly` row extended and
`test:distribution` added. A second `repair` wrote nothing. The same workspace with `prepublishOnly`
customized was refused: exit 1, the advisory naming the exact line to paste, and `diff -u` reporting
no change to the manifest. Driving the write path directly with the advisory filtered out reported
`0 written` and left the manifest byte-identical.

## Three errors in the brief, ruled

**The brief named the type against a rule.** It fixed `ManifestRegions`; `.claude/rules/names.md:135`
states "Never pluralize type names", `AGENTS.md` makes the rules authoritative over a dispatch, and
every sibling uses the `*Set` form. The unit implemented the grouping exactly as specified and named
it `ManifestRegionSet`. **Ruled: the unit is right.** The brief was wrong.

**The brief's seam list missed `#assertTarget`.** It turns the `projects` advisory into a hard
`TARGET` throw for a writing verb before `declare` is reached, so the accepted path was unreachable
and the criterion could not close. The unit projected the disk text through
`replaceManifestScripts` inside `#projectQuestion` and falls back to the disk text when the region
is refused, so a region scaffold writes itself raises no advisory while a customized chain raises
exactly the advisory it always did. **Ruled: correct and necessary.**

**The brief's owned list omitted the mandated homes.** `src/core/constants.ts`,
`src/core/validators.ts`, `src/server/validators.ts`, `tests/setup.ts`, and `tests/setupServer.ts`
appeared in neither list. `.claude/rules/architecture.md` forbids declaring a constant or a guard
anywhere else, and the guard-totality matrix in the setup files is this repository's only mechanism
for proving a new guard total. Every edit there is a pure addition. **Ruled: granted.**

All three are the same fault as W2's: the brief scoped and named from what the Orchestrator
remembered rather than from what the rules and the code require.

## The parity patch, integrated

`npm test` exited 1 on `tests/guides.test.ts > documents every barrel-reachable export`, naming the
new symbols. `guides/` was off-limits to the unit, so it returned an exact formatter-clean patch and
verified it with a probe replicating the test's own extraction, carrying its own control: unpatched
the probe reproduced the suite's list, patched it reported empty.

The Orchestrator applied that patch as a shared-file integration. `npm run test:guides` now passes
14 of 14 and `format:check` exits 0.

## Carried to the guide unit

The guide's prose describes the `projects` advisory as the maintainer's paste instruction and
`declare` as a range writer. Both are now half true. That is prose the parity gate cannot see, and it
joins the rewrite the audit already carried there.

## The unknowns, answered

The pre-change `prepublishOnly` **is** reconstructible from `blueprintToScripts`, settled by reading
the function rather than assuming: the chain joins the gates, the release row, and the optional
service row, so the predecessor is the same list without the release row. `test:distribution` needs
no predecessor entry, because it was either absent or identical and the writer always accepts the
value it is about to write.

No focused test pinned `declare`'s arity beyond a mechanical update: three call sites in the
materializer suite, each a positional-to-grouped rewrite with no assertion changed.
