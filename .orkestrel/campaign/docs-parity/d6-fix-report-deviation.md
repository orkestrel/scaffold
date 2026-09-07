# Unit report — D6-fix, deviation

`builder`, Sonnet. Stopped after N1 on a deviation in acceptance criterion 3 (`npm run test:src:bin`
exits 0). N1's own edit is applied and correct; the gate does not reach exit 0 for a reason the
brief did not name and that sits outside the owned files.

## N1 — applied

`tests/setupServer.ts:22` imports `DOCS_SEED_PATH` beside the existing `@src/core` imports.
`tests/setupServer.ts:1518-1523`:

```ts
// `HOST_PATHS` carries the documentation-parity seed, which `blueprintToHostArtifacts`
// plans only for a blueprint declaring `guides`, so the fleet total counts the paths a
// guideless workspace actually receives.
export const FLEET_ARTIFACT_COUNT =
	buildFleetManifest().entries.filter(({ destination }) => destination !== DOCS_SEED_PATH).length +
	CORE_GENERATED_COUNT
```

`grep -n "DOCS_SEED_PATH" tests/setupServer.ts`:

```text
22:	DOCS_SEED_PATH,
1518:// `HOST_PATHS` carries the documentation-parity seed, which `blueprintToHostArtifacts`
1523:	buildFleetManifest().entries.filter(({ destination }) => destination !== DOCS_SEED_PATH).length +
```

## Deviation

**Expected.** The brief's N1 item: "After N1, `npm run test:src:bin` is green," and it names the
red-first baseline as `instruments/d6/src-bin-before.log.txt` — actually
`.orkestrel/campaign/docs-parity/instruments/d6/src-bin-before.log.txt` — "8 cases in
`tests/src/bin/CLI.test.ts`, each `expected 35, got 34`."

**Found.** `npm run test:src:bin` after the N1 edit above:

```text
FAIL  |src:bin| tests/src/bin/CLI.test.ts > CLI upstream baselines > takes the host live when
every declared digest matches and takes the floor when the repository is dark
AssertionError: expected [ …(2) ] to strictly equal [ Array(1) ]

- Expected
+ Received

  [
    "/orkestrel/scaffold/refs/heads/main/host.json",
+   "/orkestrel/scaffold/refs/heads/main/scripts/docs.ts",
  ]

 ❯ tests/src/bin/CLI.test.ts:729:6

 Test Files  1 failed | 2 passed (3)
      Tests  1 failed | 244 passed (245)
```

Seven of the eight named `expected 35, got 34`-shaped failures went green. This eighth failure is
not that shape: it asserts on `live.paths`, the set of paths a `repair --groups docs` call fetched
from the upstream server, and it is unrelated to `FLEET_ARTIFACT_COUNT`.

**Evidence this is pre-existing, not caused by N1.** The same test, at the same assertion, with the
identical expected/received values, already fails in the brief's own red-first baseline:

```text
$ grep -n "takes the host live\|Test Files\|Tests " \
    ".orkestrel/campaign/docs-parity/instruments/d6/src-bin-before.log.txt"
42:⎯⎯⎯⎯⎯⎯⎯ Failed Tests 8 ⎯⎯⎯⎯⎯⎯⎯
83: FAIL  |src:bin| tests/src/bin/CLI.test.ts > CLI upstream baselines > takes the host live when
    every declared digest matches and takes the floor when the repository is dark
194: Test Files  1 failed | 2 passed (3)
195:      Tests  8 failed | 237 passed (245)
```

The baseline's failure block at position `[3/8]` (lines 83-99 of that log) is byte-identical in
shape to the failure above: the same `expect.soft(...).toStrictEqual(['.../host.json'])` at
`CLI.test.ts:729`, the same extra `scripts/docs.ts` path. My `tests/setupServer.ts` edit touches
only `FLEET_ARTIFACT_COUNT`'s definition and its new import; it does not touch `repair`, the `docs`
group, or upstream-path selection (`src/core/compilers.ts`, `src/core/constants.ts`, and every
`CLI.test.ts` line are outside this unit's owned files, and none of them changed under this unit).
So this eighth case was already red before N1 and for a different cause: D5 wired
`scripts/docs.ts` into the `docs` repair group (`src/core/constants.ts:29`, `docs` group name;
`DOCS_SEED_PATH` at `src/core/constants.ts:112`), and `repair --groups docs` against a workspace
`new`-scaffolded without `guides` now fetches that path from the live upstream, which the test's
`live.paths` assertion does not expect.

**Done / not done.** N1's own edit (the import and the filtered count) is done, matches the brief's
patch exactly, and resolved the seven `expected 35, got 34` cases. Acceptance criterion 3
(`npm run test:src:bin` exits 0) is not met: one unrelated pre-existing failure remains. N2 through
N5 are not started, because N1's own acceptance gate does not close and the brief's later items
build on a green `test:src:bin`.

**Hypothesis.** D5's `docs`-group wiring of `scripts/docs.ts` changed which paths `repair
--groups docs` requests from upstream, and no read-first file or D6-report finding names a second
patch for that path, so this case needs its own fix authored by whoever owns
`src/core/compilers.ts`'s repair-group selection or `tests/src/bin/CLI.test.ts`'s expectation,
neither of which is in this unit's scope.

## Tree state

```text
$ git status --short
 M tests/setupServer.ts
(plus the pre-existing uncommitted D4/D5/D6 tree the brief's standing conditions describe)

$ git diff --stat tests/setupServer.ts
 tests/setupServer.ts | 6 ++++--
 1 file changed, 4 insertions(+), 2 deletions(-)
```

No other owned file was touched. N2 through N5 did not run. No permitted command beyond
`npm run test:src:bin` ran. No `npm install`, `lint --fix`, discard-class git command, or commit
ran.
