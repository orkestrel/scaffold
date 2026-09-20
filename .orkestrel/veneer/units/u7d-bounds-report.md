<!-- Retained from the Veneer checkout's u7d-bounds-report.md (the unit's own report file). Native lane: opus on Opus 5 (Agent tool, subagent_type opus), sole writer in Veneer at HEAD 7da6bb1, 2026-09-20. Paths under tmp/u7d-bounds/ name the unit's instruments in the Veneer checkout. -->

# Unit u7d-bounds — report

The Veneer chain is green after the Test-paint tarball landed, and the carried code bounds are
closed. Every gate the brief names exits 0. The unknown resolved to agreement: Chromium's canvas
clips an out-of-gamut colour exactly as the installed reader does.

## The unknown's probe readings

Run in the `setup:browser` project (Chromium, `@orkestrel/test` 0.0.18) through a throwaway case in
`tests/setupBrowser.test.ts`, removed byte-for-byte afterwards (`git diff --stat` reported no change
after removal). Command:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup:browser -t "PROBE readings"
```

First probe, verbatim:

```text
PROBE-JSON {"paintedOutOfGamut":[255,0,0,1],"readerOutOfGamut":[255,0,0,1],"paintedMix":[255,0,0,1],"readerMix":[255,0,0,1],"paintedOklab":[99,99,99,1],"readerOklab":[99.08607905681528,99.08607905681527,99.08607905681527,1],"paintedMixOklab":[99,99,99,1],"readerMixOklab":[99.10000740919462,99.08041457803047,99.07857553610171,1],"matchOutOfGamut":true}
```

Reading it: `paintedOutOfGamut` is `readPaintedColor('oklch(0.7 0.4 30)')` and `readerOutOfGamut` is
`parseCSSColor('oklch(0.7 0.4 30)')`; `paintedMix` and `readerMix` are the same pair over
`color-mix(in srgb, oklch(0.7 0.4 30) 90%, white)`, the expression the Test-paint report measured;
`paintedOklab`/`readerOklab` cover `oklab(0.5 0 0)`; `paintedMixOklab`/`readerMixOklab` cover
`color-mix(in oklab, #000 50%, #fff)`.

Second probe, searching for an out-of-gamut colour whose in-range channel is fractional, verbatim:

```text
PROBE-JSON {"oklch(0.6 0.3 150)":{"painted":[0,170,0,1],"read":[0,169.67489254695974,0,1]},"oklch(0.7 0.4 30)":{"painted":[255,0,0,1],"read":[255,0,0,1]},"oklch(0.85 0.35 200)":{"painted":[0,255,255,1],"read":[0,255,255,1]},"color(display-p3 0 1 0)":{"painted":[0,255,0,1],"read":[0,255,0,1]}}
```

**Outcome: they agree.** The canvas clips an out-of-gamut colour to the sRGB cube rather than
gamut-mapping it, which is what the installed reader does, so every measured pair agrees within
`matchesColor`'s half-step tolerance and the out-of-gamut pairs agree exactly. The unknown's second
branch therefore governs: the wrappers stay (their consumers are the styles proofs), the cases are
written as agreement with the installed reader, and the doc block records the agreement with its
date.

The one reading the paint still adds is the engine's own rasterization: `parseCSSColor` converts
through the CSS Color 4 matrices, `readPaintedColor` reads the pixel the renderer produced, so a
calibration comparison over painted pixels can disagree with the matrices where a comparison run
through them cannot. The canvas holds each channel in one byte, which is the measurable difference
the cases pin (`[99,99,99,1]` against `[99.08607905681528, 99.08607905681527, 99.08607905681527, 1]`).

## Diff per owned file

`git diff --stat`:

```text
 tests/setupBrowser.test.ts     |  34 +++++++++++--
 tests/setupBrowser.ts          |  38 ++++++++------
 tests/setupConformance.test.ts | 111 ++++++++++++++++++++++++++++++-----------
 tests/setupConformance.ts      |  45 +++++++++--------
 tests/setupStyles.test.ts      |  24 +++++----
 5 files changed, 174 insertions(+), 78 deletions(-)
```

`git status --porcelain`:

```text
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupConformance.test.ts
 M tests/setupConformance.ts
 M tests/setupStyles.test.ts
```

The report sits at `u7d-bounds-report.md`, which `tmp/` keeps untracked.

### `tests/setupBrowser.ts`

Rewrote the `readPaintedColor` and `matchesPaintedColor` `@remarks` blocks. Deleted the claim that a
modern colour function comes back unread from each. `readPaintedColor` now states what the installed
reader does after Test-paint, names the engine's rasterization as the reading the wrapper adds, names
the byte quantization, records the 2026-09-20 measurement with its package version and engine, and
keeps the `var()` caveat. `matchesPaintedColor` now states that each side is compared as the engine
rendered it, keeps the placement remark about `@orkestrel/test/browser` refusing to load outside
browser mode, and carries the `var()` caveat in place of the deleted claim. No body changed.

### `tests/setupBrowser.test.ts`

- `'matches a mix against the modern color function it paints, where a computed read cannot'` →
  `'agrees with the installed reader that a mix and the modern color function it paints are one color'`;
  the `matchesColor(mix, recorded)` expectation moves from `false` to `true`.
- `'reads the channels a modern color function paints, where the installed reader reads none'` →
  `'reads a modern color function as whole-byte channels the installed reader agrees with'`; the
  painted-channel assertions stay and `expect(parseCSSColor('oklab(0.5 0 0)')).toBeUndefined()` is
  replaced by `expect(matchesColor(read, painted)).toBe(true)` over the reader's channels.
- Added `'paints an out-of-gamut color on the sRGB edge the installed reader clips it to'` on
  `oklch(0.6 0.3 150)`: a painted channel sits at an edge of the 0-255 range, every painted channel
  is an integer, and the reader's channels match the painted ones through `matchesColor`.

### `tests/setupConformance.ts`

- `collectShippedComponents`: for each of `selector` and `variable`, the component must carry at
  least one row of that category and every such row must read `shipped`. The doc block gains a
  `@remarks` paragraph stating that rule and its first sentence now reads
  `Collects component keys whose every selector and variable obligation is shipped.`
- `readDeferrals`: the incomplete-row refusal is labelled by the row's one-based position in the
  table plus its first non-empty cell — `Deferral row 2 (Passive): missing required cell`, or
  `Deferral row 1: missing required cell` when every cell is empty. The loop reads
  `block.rows.entries()` and the inner `columns.map` parameter is renamed `column` to stop the
  shadow.
- `ORACLE_BINDINGS`: the `Dispatches click` entry is deleted (see the item 6 decision). The table's
  doc block now states that a named obligation carries the exact wording of a compatibility row, and
  that an undefined-obligation entry answers for every row of its component and category that no
  named entry claims first.

### `tests/setupConformance.test.ts`

- `'binds every table entry to a saved fixture step and omits keyboard obligations'` →
  `'binds every table entry to a saved fixture step and a ledger row, and omits keyboard obligations'`;
  adds the reach assertion that every entry with a defined obligation matches a `readCompatibility()`
  row by component, category, and obligation text, reported as the list of unmatched entries.
- `'proves a native click event from a live activation'` →
  `'refuses an event obligation the table names no events for, and one it binds no predicate for'`;
  asserts the exact refusal string for an unbound `btn | event` obligation and for a `btn |
  accessibility` obligation no entry carries.
- `'selects an exact event obligation after the wildcard and reads required events from its binding'`
  → `'reads the required events from the binding rather than from the obligation wording'`; every
  assertion the old case made about `events` is kept, now against the exported `matchesOracleEvents`
  helper directly, and the empty-event-set refusal is added.
- Added `'withholds a component carrying an accepted row beside a shipped one in the same category'`.
- The deferral case gains the position-labelled, named-cell, and all-empty-row refusals.
- The chdir case asserts `createHash('sha256').update(readBootstrapCascade()).digest('hex')` against
  `BOOTSTRAP_CSS_DIGEST` instead of re-deriving the implementation's path expression, and carries a
  comment naming the working-directory mutation and the `setup` project's `forks` pool.
- Imports: `createHash` from `node:crypto` added, `dirname` dropped from `node:path`,
  `matchesOracleEvents` added.

### `tests/setupStyles.test.ts`

The pinned-release case reads the manifest through `readManifestMember(BOOTSTRAP_MANIFEST_PATH,
'version')` and the cascade through `readBootstrapCascade()`, and adds one assertion that
`computeArtifactDigest(resolve(WORKSPACE_ROOT, BOOTSTRAP_CASCADE_PATH))` carries the same digest, so
the browser-visible relative constant keeps a consumer and the case proves the two paths name one
artifact. Imports: `resolve` from `node:path`, and `BOOTSTRAP_MANIFEST_PATH`, `WORKSPACE_ROOT`,
`computeArtifactDigest`, `readManifestMember` from `./setupConformance.js`.

**Item 4's import question, answered:** `tests/setupStyles.test.ts` already imported
`readBootstrapCascade` from `./setupConformance.js`, and the Node `setup` project admits the rest of
that module's Node-only surface. No browser module is pulled in: `npm run check` and
`npm run test:src:styles` both exit 0, and the styles project loads `tests/setupStyles.ts` rather
than this test file. I imported the constants and the readers rather than duplicating the paths.

## Red-then-green pairs

Each pair names the command, the failing count, and the same command's passing count.

### Item 1 — the paint readers

Command: `npm run test:setup:browser`

Before (`tmp/u7d-bounds/pre-setup-browser.log.txt`):

```text
 FAIL  |setup:browser (chromium)| tests/setupBrowser.test.ts:137:2 > browser setup > matches a mix against the modern color function it paints, where a computed read cannot
 FAIL  |setup:browser (chromium)| tests/setupBrowser.test.ts:175:2 > browser setup > reads the channels a modern color function paints, where the installed reader reads none
AssertionError: expected [ 99.08607905681528, …(3) ] to be undefined
 Tests  2 failed | 17 passed (19)
```

After (`tmp/u7d-bounds/final-setup-browser.log.txt`):

```text
 Test Files  1 passed (1)
      Tests  20 passed (20)
```

### Item 2 — `collectShippedComponents`

Command: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup -t "withholds a component carrying an accepted row"`

Before (`tmp/u7d-bounds/red-split.log.txt`):

```text
 FAIL  |setup| tests/setupConformance.test.ts > setupConformance > withholds a component carrying an accepted row beside a shipped one in the same category
AssertionError: expected [ 'btn' ] to deeply equal []
      Tests  1 failed | 103 skipped (104)
```

After (`tmp/u7d-bounds/green-split.log.txt`, widened to `-t "shipped"`):

```text
      Tests  3 passed | 101 skipped (104)
```

### Item 3 — the chdir case

Command: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup -t "outside the workspace working directory"`

The case passed before the change and after it, because the old assertion re-derived the
implementation's own expression and therefore passed for every value `readBootstrapCascade` could
return. The red that binds the new assertion is the discrimination control under § Controls: the
digest pin reddens against a different real artifact, which the re-derivation could never do.

After (`tmp/u7d-bounds/green-chdir.log.txt`):

```text
      Tests  1 passed | 103 skipped (104)
```

### Item 4 — the pinned-release case

Command: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup -t "reads the pinned Bootstrap release"`, with a working-directory plant (`process.chdir('..')`) wrapped
around the case body so the same command measures the defect and its repair.

Before, with the plant and the old body (`tmp/u7d-bounds/red-pinned.log.txt`):

```text
 FAIL  |setup| tests/setupStyles.test.ts > styles setup > reads the pinned Bootstrap release the oracle was copied from
Error: ENOENT: no such file or directory, open 'C:\Users\mikes\WebstormProjects\node_modules\bootstrap\package.json'
      Tests  1 failed | 103 skipped (104)
```

After, with the plant still in place and the new body (`tmp/u7d-bounds/green-pinned-cwd.log.txt`):

```text
      Tests  1 passed | 103 skipped (104)
```

The plant was then removed; the case as it stands runs in the workspace root and `npm run test:setup`
exits 0.

### Item 5 — the refusal label

Command: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup -t "reads deferred selectors"`

Before (`tmp/u7d-bounds/red-deferral.log.txt`):

```text
 FAIL  |setup| tests/setupConformance.test.ts > setupConformance > reads deferred selectors and properties only within their Styles subsection
AssertionError: expected [Function] to throw error including 'Deferral row 1 (.btn-close): missing …' but got 'Deferral row .btn-close: missing requ…'
      Tests  1 failed | 103 skipped (104)
```

After (`tmp/u7d-bounds/green-deferral.log.txt`):

```text
      Tests  1 passed | 103 skipped (104)
```

### Item 6 — the binding reach

Command: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup -t "binds every table entry"`

Before (`tmp/u7d-bounds/red-reach.log.txt`), naming the phantom exactly:

```text
 FAIL  |setup| tests/setupConformance.test.ts > setupConformance > oracle action bindings and exclusions > binds every table entry to a saved fixture step and a ledger row, and omits keyboard obligations
AssertionError: expected [ 'btn | event | Dispatches click' ] to deeply equal []
      Tests  1 failed | 103 skipped (104)
```

After (`tmp/u7d-bounds/green-setup.log.txt`, the whole project):

```text
 Test Files  3 passed (3)
      Tests  104 passed (104)
```

## The item 6 decision

**Deleted the `Dispatches click` entry.** `grep -rn "Dispatches click" guides/ tests/ app/ src/` finds
it only in `tests/setupConformance.ts` and in the two cases that consumed it; `guides/veneer.md`
carries no `btn | event` row at all, so the entry's obligation reached no ledger row and it existed to
serve its own tests.

The alternative the brief offered — keeping it as a fallback with `obligation: undefined` and
`events: ['click']` — is refused, and here is why it does not work. `scanOracleObligation` selects
`bindings.find(obligation === row.obligation) ?? bindings.find(obligation === undefined)`. A second
undefined-obligation entry in the `btn | event` group is unreachable, because the existing
`events: []` entry is found first. Replacing that existing entry instead would pass any future
`btn | event` obligation whose proof step happened to dispatch a click, which is a false green for an
obligation nobody bound. The `events: []` entry is the documented refusal — the table's doc block
already says an empty event set proves no event obligation — so it stays and every event obligation
is refused until an entry names its events.

Both cases that used the deleted entry are green and each now proves something the table actually
carries:

- `'refuses an event obligation the table names no events for, and one it binds no predicate for'`
  asserts the exact refusal string for the unbound `btn | event` obligation, and adds a `btn |
  accessibility` obligation no entry carries, which reaches the `obligation has no oracle predicate`
  branch that had no case before.
- `'reads the required events from the binding rather than from the obligation wording'` keeps every
  `events` assertion the old case made, moved onto the exported `matchesOracleEvents` helper, and adds
  the empty-set refusal.

**Observation, not a deferral.** The old case's index assertion — that an exact obligation is selected
before an undefined-obligation fallback in the same category — has no live pair left: no
`(component, category)` group in `ORACLE_BINDINGS` holds both a named entry and an undefined one, and
building one back would reintroduce a fixture in production data. The selection rule stays stated in
the table's doc block, where it governs whoever adds the next binding. Re-proving it needs a second
real event obligation in the ledger, which belongs to whichever unit ships one.

## Controls

### PLANT-GAMUT

Planted: `readPaintedColor`'s body replaced with `return parseCSSColor(value)`, with `parseCSSColor`
added to the `@orkestrel/test/browser` import. Command: `npm run test:setup:browser`.

Red reading (`tmp/u7d-bounds/control-gamut.log.txt`):

```text
 FAIL  |setup:browser (chromium)| tests/setupBrowser.test.ts:175:2 > browser setup > reads a modern color function as whole-byte channels the installed reader agrees with
 FAIL  |setup:browser (chromium)| tests/setupBrowser.test.ts:197:2 > browser setup > paints an out-of-gamut color on the sRGB edge the installed reader clips it to
AssertionError: expected [ Array(2) ] to deeply equal [ Array(2) ]
AssertionError: expected false to be true // Object.is equality
 Test Files  1 failed (1)
```

The brief's parenthetical applies: the engine clips as the reader does, so the out-of-gamut case reds
on the reversal it names — its byte-quantization assertion — rather than on a gamut difference. The
whole-byte case reds on the same reversal through its channel-equality assertion.

Restore proof:

```text
fb0b711f2239ee22fd2bed4a672a25bd2ad0d868048dd72fe9c98a7fe4358092 *tmp/u7d-bounds/setupBrowser.ts.bak
fb0b711f2239ee22fd2bed4a672a25bd2ad0d868048dd72fe9c98a7fe4358092 *tests/setupBrowser.ts
```

`cmp` reported no difference.

### PLANT-EVERY

Planted: `collectShippedComponents` reverted to the `some` form. Command:
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup -t "shipped"`.

Red reading (`tmp/u7d-bounds/control-every.log.txt`):

```text
 FAIL  |setup| tests/setupConformance.test.ts > setupConformance > withholds a component carrying an accepted row beside a shipped one in the same category
AssertionError: expected [ 'btn' ] to deeply equal []
      Tests  1 failed | 2 passed | 101 skipped (104)
```

Restore proof:

```text
3c5bbe035e7081bb192d7a5a6ebd707dcfe3f6a9d0d5592b94a3e26902f0cb2b *tmp/u7d-bounds/setupConformance.ts.bak
3c5bbe035e7081bb192d7a5a6ebd707dcfe3f6a9d0d5592b94a3e26902f0cb2b *tests/setupConformance.ts
```

`cmp` reported no difference. A later comment rewording inside the same refusal block is a deliberate
edit made after the restore, recorded under § Deviations.

### Two controls I added

**Digest discrimination (item 3).** Swapped the chdir case's expectation from `BOOTSTRAP_CSS_DIGEST`
to `BOOTSTRAP_RTL_CSS_DIGEST` and ran the case (`tmp/u7d-bounds/control-digest.log.txt`):

```text
 FAIL  |setup| tests/setupConformance.test.ts > setupConformance > reads the manifest-rooted Bootstrap cascade outside the workspace working directory
AssertionError: expected '4a50207b956a4ab943640ee993118b554a34e…' to be '39911412c957c60512a4b23a0ea1903ed5f3a…' // Object.is equality
```

Restored byte-for-byte; `cmp` reported no difference.

**Edge channel reach.** Ran `PLAYWRIGHT_CHANNEL=not-a-channel npm run test:setup:browser`
(`tmp/u7d-bounds/control-channel.log.txt`):

```text
Error: browserType.launch: Unsupported chromium channel "not-a-channel"
```

So the `msedge` run named in § Gates launched Edge rather than silently falling back to the managed
Chromium.

## Gates

Every command was run from the Veneer checkout with no unit live beside it.

| Command | Exit | Final lines |
| ------- | ---- | ----------- |
| `npm run format:check` | 0 | `All matched files use the correct format.` / `Finished in 750ms on 82 files using 16 threads.` |
| `npm run lint:check` | 0 | `npm notice run oxlint --config .oxlintrc.json --deny-warnings .` (no diagnostic output) |
| `npm run check` | 0 | `npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json` (no diagnostic output) |
| `npm run test:setup` | 0 | `Test Files  3 passed (3)` / `Tests  104 passed (104)` |
| `npm run test:setup:browser` | 0 | `Test Files  1 passed (1)` / `Tests  20 passed (20)` |
| `npm run test:src:styles` | 0 | `Test Files  7 passed (7)` / `Tests  40 passed (40)` |
| `npm run test:conformance` | 0 | `Test Files  1 passed (1)` / `Tests  8 passed (8)` |
| `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser` | 0 | `Test Files  1 passed (1)` / `Tests  20 passed (20)` |

Baselines taken before editing, for comparison: `npm run test:setup:browser` reported
`2 failed | 17 passed (19)`; `npm run test:setup` reported `103 passed (103)`;
`npm run test:src:styles` reported `40 passed (40)`.

Logs are under `tmp/u7d-bounds/`.

## The `what asserts the state this change ends` sweep

Word-boundary sweep over `readPaintedColor`, `matchesPaintedColor`, `collectShippedComponents`,
`BOOTSTRAP_CASCADE_PATH`, and `BOOTSTRAP_MANIFEST_PATH` across `tests/**`:

```text
grep -rnw "readPaintedColor\|matchesPaintedColor\|collectShippedComponents\|BOOTSTRAP_CASCADE_PATH\|BOOTSTRAP_MANIFEST_PATH" tests/ --include=*.ts | cut -d: -f1 | sort | uniq -c
      5 tests/conformance.test.ts
     12 tests/setupBrowser.test.ts
      5 tests/setupBrowser.ts
     18 tests/setupConformance.test.ts
      6 tests/setupConformance.ts
      5 tests/setupStyles.test.ts
      4 tests/setupStyles.ts
      3 tests/src/styles/elements/body.test.ts
     13 tests/src/styles/integration.test.ts
     11 tests/src/styles/theme.test.ts
      6 tests/src/styles/mixins.test.ts
     11 tests/src/styles/tokens.test.ts
```

The `tests/src/styles/**` consumers are the styles proofs; `npm run test:src:styles` exits 0 with
them unchanged, and `tests/conformance.test.ts` is covered by `npm run test:conformance` at 0.

A sweep for the stale claim the brief asked me to delete —
`grep -rn "unread\|computes to itself\|reads none\|cannot be read as channels" tests/ --include=*.ts` —
returns only unrelated senses in `tests/setupPolicy.ts` (barrel statements) and
`tests/setupStyles.ts:1104` (selector forms). No colour-reader claim survives.

## Deviations

Reported in the shape § Deviation contract names. None of these stopped the unit.

**1. The `tests/setupConformance.ts` scope line and Execution item 6 disagree.**

- Expected: the Scope section grants `tests/setupConformance.ts` for `collectShippedComponents`, the
  deferral-row refusal label, and "the binding table's doc block only".
- Found: Execution item 6 directs me to make the `Dispatches click` entry a fallback or delete it,
  which edits a table entry rather than its doc block; the Context section's Sites list names
  `tests/setupConformance.ts:170-177` — that entry — as a site of the carried bound.
- Evidence: brief § Scope, Owned, line 110; brief § Execution item 6, lines 165-168; brief § Context
  Sites, line 59.
- Done. I read the Sites list and item 6 together as the grant, deleted that one entry, and touched
  no other entry. Every other edit in the file stays inside the three named regions.
- Hypothesis: the Scope line was written before item 6 settled that the entry itself had to move.

**2. Import lists in files whose Scope line names a case range.**

- Expected: `tests/setupStyles.test.ts` owned for "the manifest and cascade reads at `:736-747` only";
  `tests/setupConformance.test.ts` owned for "the cases the items name".
- Found: both fixes change the files' import lists — `resolve` and the `setupConformance` symbols in
  one, `createHash` in and `dirname` out of the other.
- Evidence: the diffs in this report.
- Done. The import edits are the mechanical consequence of the case edits; leaving `dirname` imported
  and unused would fail `npm run lint:check`.

**3. A scoped formatter run.**

- Expected: no tree-wide `format`.
- Found: `npm run format:check` failed on `tests/setupConformance.test.ts` after my edits.
- Evidence: `tmp/u7d-bounds/gate1-format.log.txt`, `Format issues found in above 1 files.`
- Done. I ran `npx oxfmt --config .oxfmtrc.json --write tests/setupConformance.test.ts`, scoped to one
  owned file, and confirmed from `git diff` that it reflowed only my own additions. No tree-wide
  mutating command ran.

**4. A comment reworded after the PLANT-EVERY restore.**

- Expected: the file restored byte-for-byte after the control, then left alone.
- Found: I reworded the deferral refusal's comment afterwards, because the first wording claimed "the
  name cell is the one a row most often omits", which no run measures.
- Evidence: the current comment reads "The name cell can be the missing one, …"; `npm run
  format:check`, `npm run lint:check`, `npm run check`, `npm run test:setup`, and
  `npm run test:setup:browser` were all re-run after it and exit 0.
- Done. The restore proof's digest predates that edit and is recorded as such.

**5. `tests/setupStyles.ts:683` left unchanged.**

- Expected: update the sentence only if it repeats the claim that a modern colour function comes back
  unread.
- Found: the sentence names `{@link matchesPaintedColor}` and makes no claim about an unread colour
  function.
- Evidence: `tests/setupStyles.ts:680-684`, "comparing the parts is what lets a proof assert the
  lengths as numbers and the color through {@link matchesPaintedColor} rather than against one
  engine's serialization of the whole value."
- Done, as no edit. `tests/setupStyles.ts` is unmodified.

Ancillary choices I settled and carried on from, as the contract scopes: every case title, the
doc-block wording inside the truth the brief fixes, the `Deferral row N (Cell)` label form, and the
item 6 choice.

## Observations

- `BOOTSTRAP_DIGEST` in `tests/setupStyles.ts` and `BOOTSTRAP_CSS_DIGEST` in
  `tests/setupConformance.ts` hold the same value,
  `4a50207b956a4ab943640ee993118b554a34e96a23261cfe58b9aa1807a7849b`. That duplicate is outside this
  unit's carried bounds and outside its owned regions, so I left it; the new assertion in the
  pinned-release case now reads both constants against one artifact, which makes a future divergence
  fail rather than drift.
- `tests/setupStyles.ts:1104` and `:683` carry `{@link}` tags naming symbols declared in other
  modules (`matchesPaintedColor` lives in `tests/setupBrowser.ts`). Outside this unit's bounds.
- No whole-suite run was taken here: `npm test` is timing-sensitive and runs inside this unit's own
  exec, so the authoritative sweep belongs to an independent `verifier` after this unit exits.
