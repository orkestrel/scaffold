# Falsification verdict

## Claim 1

`CONFIRMED` — The loop uses only the declared `packages` population and creates output only after
`validate` accepts an absent path (`tmp/pass/layer-inventory.mjs:7-14`, `251-271`). The source has
no package, git-history, credential, install-tree, fetch, or checkout-writing operation; its only
write targets are the validated output directory and its evidence files (`tmp/pass/layer-inventory.mjs:221-248`).
The attack on an undeclared sibling package did not reproduce because no such package is enumerated.

## Claim 2

`BROKEN` — `record.complete` checks npm exit, signal, parse, registry `failure`, byte failures,
and snapshot inequality, but it does not inspect git command results or attestation failures
(`tmp/pass/layer-inventory.mjs:227-240`). A valid JSON primitive produces
`{ failure: 'npm tree node was not an object' }` from `projectTree`, yet `npm.parse` remains
undefined and completeness can remain true (`tmp/pass/layer-inventory.mjs:48-60`, `182-194`).
A packument with no `dist-tags.latest` also returns without `failure` (`tmp/pass/layer-inventory.mjs:206-213`).
These are required readings that can be missing while the completeness expression remains true.

## Claim 3

`BROKEN` — Manifest selection contains the requested declaration fields, and lock selection
contains the requested lock metadata (`tmp/pass/layer-inventory.mjs:16-20`, `30-45`). However,
installed attestation requires `node.name` and recurses only through child values; it never uses
the dependency property name when npm carries identity only in that parent key
(`tmp/pass/layer-inventory.mjs:155-179`). Such a node is silently omitted. The attestation also
records a package projection without checking that its name and version match the resolved node.

## Claim 4

`CONFIRMED` — `snapshot` reads manifest and lockfile SHA-256 values and all named git readings
before and after collection (`tmp/pass/layer-inventory.mjs:114-142`, `221-235`). The summary labels
`origin/main` as cached and the git helper performs no fetch (`tmp/pass/layer-inventory.mjs:123-133`,
`221-223`). The failed attack of relying on a refreshed remote reading does not reproduce because
the implementation calls only `rev-parse` and `merge-base`.

## Claim 5

`BROKEN` — The child and fetch paths have timers and bounded output capture
(`tmp/pass/layer-inventory.mjs:74-106`, `197-218`). The process timeout kills only the direct child;
the portability rule requires Windows process-tree termination, and no platform-gated tree
termination exists. The output existence check also treats every `access` error as absence before
`mkdir` (`tmp/pass/layer-inventory.mjs:251-261`), so it does not itself fail closed on an
unexpected output-path access error.

## Claim 6

`BROKEN` — The created-file diff contains only the instrument, and the supplied status shows
unrelated campaign paths rather than instrument edits (`tmp/pass/d7n-layer-inventory-instrument.diff.txt:1-7`,
`tmp/pass/d7n-layer-inventory-instrument.status.txt:1-30`). The source exports reusable helpers and
uses native path and URL APIs (`tmp/pass/layer-inventory.mjs:1-5`, `22-219`). It nevertheless
assigns the nested `capture` arrow inside `sleepResult`, violating the no-nested-functions rule
(`tmp/pass/layer-inventory.mjs:74-97`). The scope finding is held: unrelated root status is
campaign state, not a created-file diff change.

## Attacked and held

- Claim 4: an attack requiring a remote refresh failed; the implementation has no fetch or merge
  operation in its git helper (`tmp/pass/layer-inventory.mjs:123-133`).
- Claim 6 scope: the attack attributing unrelated root status to the instrument failed because the
  actual created-file diff names only `tmp/pass/layer-inventory.mjs` (`tmp/pass/d7n-layer-inventory-instrument.diff.txt:1-7`).
- Claim 3 declaration capture: the attack against manifest field coverage failed for the listed
  fields, which `selectManifest` copies when present (`tmp/pass/layer-inventory.mjs:30-36`).
- Claim 1 population: the attack looking for an unrelated sibling checkout failed because the
  collection loop is driven only by the exported literal list (`tmp/pass/layer-inventory.mjs:7-14`,
  `223-224`).

The audit did not execute collection, network calls, npm, or a full test suite. Those runtime
behaviours remain limits; the source-level failures above are independently visible in the supplied
diff.

VERDICT: FAIL 2, 3, 5, 6; outside the claims: none
