# Unit W6 report — test guide node fences, totality guard, directional word

## Deviation: the "Read a source inventory" fence's claims are false as written

`guides/test.md:1636` "Read a source inventory" states four key lists that this workspace no longer
produces. The fence's own preamble fixes the root as this checkout ("From tests/guides.test.ts, one
directory up is the workspace root"), so the lists are claims about this package's real files, and
`src/core/validators.ts` and the whole `src/browser` directory are missing from them.

I did not correct the guide. The brief scopes my `guides/test.md` edits to the directional word and
the token-fence preamble, and the deviation contract names a false fence claim as a defect to
surface rather than to fix. The transcription therefore asserts what the fence says, and
`npm run test:guides` is red at exactly one assertion. Everything else in the unit is green. The
exact patch that closes it is later in this report.

**Expected** — every Node-runnable fence's claims hold when executed.

**Found** — `tests/guides.test.ts:582`, test
`guide fences > keys a walk root-relative, takes a named file whatever the filter says, and excludes below a directory`:

```text
AssertionError: expected [ 'src/core/factories.ts', …(4) ] to strictly equal [ 'src/core/factories.ts', …(3) ]
+   "src/core/validators.ts",
```

The exact readings for all five calls in that fence, taken on this host through the real
`readInventory` with `root = resolveRoot(import.meta)`:

| Fence line | Call                                                          | Actual reading                                                                                                                                                                                     | Holds |
| ---------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| 1649       | `['src/core']`, `.ts`                                         | `src/core/factories.ts`, `src/core/helpers.ts`, `src/core/index.ts`, `src/core/types.ts`, `src/core/validators.ts`                                                                                  | no    |
| 1654       | `['package.json', 'src/core']`, `.ts`                         | `package.json`, `src/core/factories.ts`, `src/core/helpers.ts`, `src/core/index.ts`, `src/core/types.ts`, `src/core/validators.ts`                                                                  | no    |
| 1658       | `['src/core']`, `.ts`, exclude `src/core/index.ts`            | `src/core/factories.ts`, `src/core/helpers.ts`, `src/core/types.ts`, `src/core/validators.ts`                                                                                                       | no    |
| 1667       | `['src']`, `.ts`, exclude `src/server`                        | `src/browser/constants.ts`, `src/browser/factories.ts`, `src/browser/helpers.ts`, `src/browser/index.ts`, `src/browser/types.ts`, `src/core/factories.ts`, `src/core/helpers.ts`, `src/core/index.ts`, `src/core/types.ts`, `src/core/validators.ts` | no    |
| 1672       | `['src/core/index.ts']`, `.ts`, exclude `src/core`            | `{}`                                                                                                                                                                                               | yes   |

Nothing about `readInventory`'s semantics moved. The fence went stale against the source tree:
`src/core/validators.ts` and `src/browser` landed after it was written. The fence's stated
mechanisms — root-relative sorted keys, a named file taken whatever the extension filter says, an
exclusion covering every key below a directory, an exclusion applying to a named target — all hold.

**Done** — every other named fence transcribed and executing; the totality guard landed with its
mutation controls; the directional word and the token-fence preamble corrected.

**Not done** — `npm run test:guides` green. It is red at the one assertion named earlier.

**Hypothesis** — the fence predates `src/core/validators.ts` and the `src/browser` environment, and
no executing transcription existed to redden when they landed. That is the gap this unit closes.

### Report-only patch for `guides/test.md` (off my owned scope)

Applying this makes `npm run test:guides` green with the transcription unchanged. I proved that by
staging these same four lists as the test's expectations: `Test Files 1 passed (1) | Tests 38 passed
(38)`. I then restored the fence-faithful transcription, so the tree you receive carries the red.

```diff
@@ guides/test.md:1649
 Object.keys(readInventory(root, ['src/core'], { extensions: ['.ts'] }))
-// ['src/core/factories.ts', 'src/core/helpers.ts', 'src/core/index.ts', 'src/core/types.ts']
+// ['src/core/factories.ts', 'src/core/helpers.ts', 'src/core/index.ts', 'src/core/types.ts',
+//  'src/core/validators.ts']

 // A named file is included whatever `extensions` says, so one call takes the root files a suite
 // needs and the source tree it walks.
 Object.keys(readInventory(root, ['package.json', 'src/core'], { extensions: ['.ts'] }))
-// ['package.json', 'src/core/factories.ts', 'src/core/helpers.ts', 'src/core/index.ts',
-//  'src/core/types.ts']
+// ['package.json', 'src/core/factories.ts', 'src/core/helpers.ts', 'src/core/index.ts',
+//  'src/core/types.ts', 'src/core/validators.ts']

 Object.keys(
 	readInventory(root, ['src/core'], {
 		extensions: ['.ts'],
 		exclude: ['src/core/index.ts'],
 	}),
 )
-// ['src/core/factories.ts', 'src/core/helpers.ts', 'src/core/types.ts']
+// ['src/core/factories.ts', 'src/core/helpers.ts', 'src/core/types.ts', 'src/core/validators.ts']

 // A directory key takes every key below it.
 Object.keys(readInventory(root, ['src'], { extensions: ['.ts'], exclude: ['src/server'] }))
-// ['src/core/factories.ts', 'src/core/helpers.ts', 'src/core/index.ts', 'src/core/types.ts']
+// ['src/browser/constants.ts', 'src/browser/factories.ts', 'src/browser/helpers.ts',
+//  'src/browser/index.ts', 'src/browser/types.ts', 'src/core/factories.ts',
+//  'src/core/helpers.ts', 'src/core/index.ts', 'src/core/types.ts', 'src/core/validators.ts']
```

The last claim, `{}`, stands.

## Discovered heading population against the brief's residue list

The guard derives the population as every `###` heading in `guides/test.md` with at least one fence
between it and the next heading of any level. The unknown the brief raised — whether fenceless
headings need excluding — is answered by that derivation, and the answer is that they exclude
themselves. Every `###` heading outside `## Patterns` carries no fence of any language: `Core`,
`Browser`, `Server`, `Traversal`, `Hosts that create no symbolic link`,
`Refusals outside the journey layer`, `Threat model`, `Bounds a shipped helper carries`, and
`Practices` are all prose. No language filter is needed either: every fence under a discovered
heading is a `ts` fence.

The discovered population is every `###` heading under `## Patterns`, from
`Record calls without a spy` through `Place a capture portfolio`.

The brief's residue list named these Node-runnable headings, and each is now transcribed:
`Capture a throw, then assert on it`, `Wait for a named condition`, `Copy a JSON value`,
`Prove a guard is total`, `Prove a wire fixpoint`, `Read a source inventory`,
`Own a temporary directory`, `Give everything back in one hook`,
`Answer a real request on a loopback port`, `Probe what the host supports`, and
`Refuse an escaping path in your own fixture`.

Discovery found two Node-runnable headings the residue list did not name, both untranscribed and
routed nowhere: **`Narrow without `!` or `as`` (`guides/test.md:1383`)** and **`Drain an async
source` (`guides/test.md:1446`)**. The totality guard admits no third bucket, so both are
transcribed here. That is the guard earning its place on the round it landed.

One note on `Wait for a named condition`. The residue line cites its fences at `:1490` and `:1526`.
The `:1526` half — the `retryUntil` exhaustion arm and the `waitForCondition` throw arm beside it —
was already transcribed at HEAD as `propagates a condition throw and keeps a producer throw as the
exhaustion cause`. What was unexecuted in that heading was the first fence's `waitForCondition`
reading arm and its `retryUntil` health-endpoint arm. Both now execute, each against a real
resource: a real scratch directory the artifact appears in, and a real loopback origin whose health
route answers `starting` once and `ok` after.

## Transcribed versus routed, as landed

Every discovered heading resolves to exactly one carrier. The guard proves the partition rather than
this table doing it.

**Transcribed and executing in `tests/guides.test.ts`.** `Record calls without a spy`,
`Record an emitter's events`, `Count the listeners on a signal`,
`Number the resources a fixture allocates`, `Capture a throw, then assert on it`,
`Narrow without `!` or `as``, `Cross an unchecked boundary`, `Flatten headers into one record`,
`Drain an async source`, `Wait for a named condition`, `Copy a JSON value`, `Prove a guard is total`,
`Prove a wire fixpoint`, `Read a source inventory`, `Own a temporary directory`,
`Give everything back in one hook`, `Answer a real request on a loopback port`,
`Request an HTTP upgrade`, `Probe what the host supports`, `Replay response cookies`, and
`Refuse an escaping path in your own fixture`.

**Routed away in `ROUTED_FENCES` (`tests/setup.ts`).** To
`tests/src/browser/helpers.test.ts`: `Build and mount a fixture`,
`Drive an interface the way a person does`, `Drive a field the component listens to`,
`Measure what a reader sees`, `Read the tokens and colors a theme declares`,
`Find a rule in the cascade`, `Remove an IndexedDB database`. To
`tests/src/browser/factories.test.ts`: `Record a browser journal`, `Place a capture portfolio`.

Every routed heading's carrier already carries its marker line from W5. The guard reads all of them,
where the guard it replaces read only the two `Measure what a reader sees` markers and the
`Record a browser journal` one.

Fences needing a real peer use one. The loopback fences bind `127.0.0.1` on a host-picked ephemeral
port through `createLoopback`, and the retry arm drives a real `fetch` at that port. The link half of
`Own a temporary directory` and the `Probe what the host supports` fence gate on
`supportsDirectoryLinks()` and `supportsFileLinks()`, which read this host as it stands rather than
naming a platform. Neither skipped on this host.

## The guard

`tests/guides.test.ts:233`, `carries every fence-bearing guide heading in exactly one place`. It
reads `guides/test.md` from the inventory, walks it fence-aware, and records for each fence-bearing
`###` heading the marker line `// guides/test.md → <section> → "<heading>"` that its carrier must
open with. The transcribed set is the discovered headings whose marker appears in
`tests/guides.test.ts` itself; the routed set is `ROUTED_FENCES`. It then asserts that no routed
entry names a heading outside the discovered population, that no heading is in both sets, that the
two sets together equal the discovered population in each direction, and that every routed carrier
file contains its marker line.

Using the marker as the membership token in both directions is what makes a transcription and a
routed carrier the same kind of evidence. Neither can be deleted, renamed, or moved without the
guard naming the heading it belonged to.

## Mutation controls

Each control was applied to `tests/setup.ts` alone, run, and reverted. The command was
`npm run test:guides -- -t "carries every fence-bearing guide heading"`, and each reported
`Tests 1 failed | 37 skipped (38)`.

1. **A routed heading removed from the table.** Deleted the `Find a rule in the cascade` row. Red at
   **`tests/guides.test.ts:264`**:

   ```text
   AssertionError: expected [ 'Find a rule in the cascade' ] to deeply equal []
   ```

   Restored; green.

2. **A routed heading whose carrier lacks its marker line.** Repointed `Find a rule in the cascade`
   at `tests/src/core/helpers.test.ts`, a real file with no such marker. Red at
   **`tests/guides.test.ts:273`**:

   ```text
   AssertionError: expected [ [ …(2) ] ] to deeply equal []
   +   [
   +     "Find a rule in the cascade",
   +     "tests/src/core/helpers.test.ts",
   +   ]
   ```

   Restored; green.

3. **A table entry naming a heading the guide carries no fence under.** Added
   `'Hosts that create no symbolic link'`, a real `###` heading whose section is prose. Red at
   **`tests/guides.test.ts:262`**:

   ```text
   AssertionError: expected [ Array(1) ] to deeply equal []
   +   "Hosts that create no symbolic link",
   ```

   Restored; green.

The remaining arm — a fence-bearing heading added to the guide with no carrier at all — is the same
assertion as control 1 approached from the guide side, and control 1 reddens it by name.

## Touched files

- `/home/user/orkestrel/test/tests/guides.test.ts` — replaced the three-marker browser presence
  check with the totality guard; transcribed and executed every remaining Node-runnable fence;
  added the `Snapshot` and `Schema` fixtures, the wire codecs, and `buildMarker` at module scope.
- `/home/user/orkestrel/test/tests/setup.ts` — added `ROUTED_FENCES`, the routed-heading table
  mapping each browser-carried guide heading to its carrier file.
- `/home/user/orkestrel/test/guides/test.md` — `below` reads `later` at line 1089; the token fence's
  preamble names `card` as a mounted inline element and states that its `width` resolves to `auto`,
  which is the condition the fence's zero-width claim rests on.

```text
 guides/test.md       |   5 +-
 tests/guides.test.ts | 460 ++++++++++++++++++++++++++++++++++++++++++++++++---
 tests/setup.ts       |  22 +++
 3 files changed, 465 insertions(+), 22 deletions(-)
```

## Validation

| Command                                                            | Result                              |
| ------------------------------------------------------------------ | ----------------------------------- |
| `npm run test:guides` (HEAD, before)                               | `Tests 22 passed (22)`              |
| `npm run test:guides` (after)                                      | `Tests 1 failed \| 37 passed (38)`  |
| `npx oxfmt --config .oxfmtrc.json --check` on the three owned files | `All matched files use the correct format.` |
| `npx oxlint --config .oxlintrc.json --deny-warnings` on both owned test files | exit 0, no diagnostics |
| `npx tsc --noEmit --project tsconfig.json`                         | exit 0                              |

The typecheck is tree-wide and read-only; I ran it because Vite does not typecheck the transcription
and a type error would otherwise be invisible to `test:guides`. It reported nothing anywhere.

The one failure is the guide defect reported at the top. Every other new case and the guard pass.

I ran no git command that changes state and committed nothing.

## Acceptance criteria

1. **`npm run test:guides` green with every named fence executing** — not met. Every named fence
   executes; one is red because the fence's own claims are false. See the deviation.
2. **The guard's mutation control reported red at a named line and restored** — met, at
   `tests/guides.test.ts:264` for a removed row, `:273` for a carrier missing its marker, and `:262`
   for a row naming a fenceless heading.
3. **`guides/test.md:1089` reads `later`; the token-fence preamble names the inline element** — met.

## Observations, not criteria

- The whole `npm test` is yours after I exit. I ran only `test:guides` plus the read-only typecheck.
- `tests/setup.ts` now exports `ROUTED_FENCES`, and this repository has no `tests/setup.test.ts` and
  no `setup` Vitest project. `.claude/rules/tests.md` puts a setup-module proof in a
  `tests/setup*.test.ts` file in the `setup` project. `ROUTED_FENCES` is a data table with no
  behavior, and the guard in `tests/guides.test.ts` is the only thing that reads it and fails on
  every way it can be wrong. I did not create that file or project; both are outside this unit.
