# Unit T1 — report

Checkout `C:/Users/mikes/WebstormProjects/test`, baseline `abedca2`, clean at start and at return
except the owned files. Every gate exits 0. Three deviations are recorded under § Deviations and
each one changed a name or a file placement rather than a contract's behaviour.

## Exports landed

| Export                | File                       | Line |
| --------------------- | -------------------------- | ---- |
| `TextWaitOptions`     | `src/core/types.ts`        | 160  |
| `JourneyVariant`      | `src/core/types.ts`        | 242  |
| `waitForText`         | `src/core/helpers.ts`      | 220  |
| `CaptureVariant`      | `src/browser/types.ts`     | 73   |
| `StateOptions`        | `src/browser/types.ts`     | 187  |
| `StorageOptions`      | `src/browser/types.ts`     | 201  |
| `WebStorageInterface` | `src/browser/types.ts`     | 221  |
| `CensusReading`       | `src/browser/types.ts`     | 235  |
| `ContrastFixture`     | `src/browser/types.ts`     | 253  |
| `EscapeFixture`       | `src/browser/types.ts`     | 270  |
| `CensusFixture`       | `src/browser/types.ts`     | 289  |
| `pressKeys`           | `src/browser/helpers.ts`   | 517  |
| `readRefusal`         | `src/browser/helpers.ts`   | 720  |
| `waitForState`        | `src/browser/helpers.ts`   | 1083 |
| `waitForAnimations`   | `src/browser/helpers.ts`   | 1155 |
| `readCensus`          | `src/browser/helpers.ts`   | 1892 |
| `buildDenial`         | `src/browser/helpers.ts`   | 2565 |
| `buildContrast`       | `src/browser/helpers.ts`   | 2605 |
| `buildEscapes`        | `src/browser/helpers.ts`   | 2674 |
| `buildCensus`         | `src/browser/helpers.ts`   | 2709 |
| `createStorage`       | `src/browser/factories.ts` | 306  |

`CaptureVariant` is the same name at a new shape: it now extends `JourneyVariant` and declares only
`apply`.

`buildDenial` is an export the brief's contract list did not name. § Deviations states why it exists.

## Controls: red before, green after

Every red run below was produced by mutating the implementation, never the assertion, and every
mutation was reverted from a file copy before the green run. The mutation sets are
`tmp/probe/mutate.py` (pass 1) and `tmp/probe/mutate2.py` (pass 2) in the test checkout; each pair's
exact edit is written out there.

Baseline counts, measured from `git show abedca2:<file> | grep -cE "^\s+it(\.|\()"`:
`tests/src/core/helpers.test.ts` 81 → 89, `tests/src/browser/helpers.test.ts` 220 → 255,
`tests/src/browser/factories.test.ts` 31 → 39, `tests/guides.test.ts` 48 → 49. The `src:core`
project therefore ran 107 cases before and runs 115 now; `src:browser` ran 251 and runs 294.

### Pass 1 — `npm run test:src:core`

Red: `Tests 2 failed | 113 passed (115)`. Green after revert: `Tests 115 passed (115)`.

| Red test                                                           | Mutation                              |
| ------------------------------------------------------------------ | ------------------------------------- |
| `waitForText > waits past a reading that still carries the departing sentence` | `absent` arm dropped from the poll |
| `waitForText > refuses an empty expectation and an empty departure` | empty-expectation refusals dropped    |

### Pass 1 — `npm run test:src:browser`

Red: `Tests 14 failed | 280 passed (294)`. Green after revert: `Tests 294 passed (294)`.

| Control | Red test                                                                                       |
| ------- | ----------------------------------------------------------------------------------------------- |
| T1-C1   | `pressKeys > refuses a sequence sent while nothing but the body holds focus`                    |
| T1-C1   | `pressKeys > reaches the traversed control and refuses the same sequence sent to nothing`       |
| T1-C2   | `waitForState > waits for the state to go away under absent`                                    |
| T1-C2   | `waitForState > names the control, the state, and the last states read when it never arrives`   |
| T1-C2   | `waitForState > settles a pressed control after the act and a folded one after it collapses`    |
| T1-C3   | `waitForAnimations > resolves while an animation declaring infinite iterations is still running` |
| T1-C3   | `waitForAnimations > refuses a subject the document does not hold`                              |
| T1-C4   | `readRefusal > rethrows what the resolver threw when it is not an Error`                        |
| T1-C6   | `readCensus > refuses a walk that reads no element`                                             |
| T1-C7   | `buildContrast > straddles the bar composited while the flat reading disagrees for both foregrounds` |
| T1-C7   | `buildContrast > reads a composited stack, carries both style escapes, and refuses an unreachable bar` |
| T1-C8   | `buildEscapes > carries both escapes and the sheet the caller exempts by id`                    |
| T1-C9   | `isReachable > answers for a shadow subject and stops at the boundary for an ancestor attribute` |
| T1-C9   | `isRendered > answers for a shadow subject and stops at the boundary for an ancestor attribute` |

### Pass 2 — `npm run test:src:core`

Red: `Tests 2 failed | 113 passed (115)`. Green after revert: `Tests 115 passed (115)`.

| Red test                                                          | Mutation                                           |
| ------------------------------------------------------------------ | -------------------------------------------------- |
| `waitForText > resolves on the first reading that contains the sentence` | returns `text` rather than the reading        |
| `waitForText > demands the whole reading under exact`             | `exact` switch dropped                             |

### Pass 2 — `npm run test:src:browser`

Red: `Tests 22 failed | 272 passed (294)`. Green after revert: `Tests 294 passed (294)`.

| Control | Red test                                                                                     |
| ------- | ---------------------------------------------------------------------------------------------- |
| T1-C1   | `pressKeys > sends the sequence to the control that holds focus`                              |
| T1-C1   | `pressKeys > reaches the traversed control and refuses the same sequence sent to nothing`     |
| T1-C2   | `waitForState > resolves after a timer flips the state and returns what the control announced` |
| T1-C2   | `waitForState > resolves the control afresh on every reading, so a replaced node is still the subject` |
| T1-C2   | `waitForState > waits for the state to go away under absent`                                  |
| T1-C2   | `waitForState > names the control, the state, and the last states read when it never arrives` |
| T1-C2   | `waitForState > settles a pressed control after the act and a folded one after it collapses`  |
| T1-C3   | `waitForAnimations > resolves after a transition on a descendant ends`                        |
| T1-C3   | `waitForAnimations > names the subject and the animation still running when the budget runs out` |
| T1-C3   | `waitForAnimations > reads the settled paint rather than the frame a transition was passing through` |
| T1-C4   | `readRefusal > reads the absent, the gated, and the ambiguous voices, and nothing for a target that resolves` |
| T1-C5   | `createStorage > refuses every withheld operation in the voice a denied origin raises`        |
| T1-C5   | `createStorage > replenishes no room when the permission is granted`                          |
| T1-C5   | `createStorage > withholds a read, grants it, and then runs out of room`                      |
| T1-C6   | `readCensus > reports the population, the sorted tokens, and the undeclared ones`             |
| T1-C6   | `readCensus > sorts the tokens rather than reporting them in document order`                  |
| T1-C6   | `readCensus > reports nothing undeclared where the cascade declares every carried class`      |
| T1-C6   | `readCensus > counts the walked elements and reports both undeclared tokens the control carries` |
| T1-C6   | `buildCensus > carries one token on HTML and another on an SVG whose class list is no string` |
| T1-C7   | `buildContrast > follows the bar it was asked for rather than one written into the stack`     |
| T1-C8   | `buildEscapes > leaves the root detached, so an embedded sheet never joins the cascade`       |
| —       | `buildDenial > names the operation and the key in the voice a denied origin raises`           |

### T1-C5, dedicated run

Mutation: `permit()` also resets `room` to the declared quota.
Command: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser
tests/src/browser/factories.test.ts`.
Red: `Tests 1 failed | 38 passed (39)` — `createStorage > replenishes no room when the permission is
granted`. Green after revert: `Tests 39 passed (39)`.

The first form of that test did not discriminate: withholding a write consumes no room, so a
`permit` that replenished still refused the second write. The test now also spends the room on an
accepted write before granting, which is the arm the mutation reddens.

### T1-C10, `npm run check`

Mutation: `JourneyVariant` withdrawn from the root entry as an interface and left as a string alias.
Red: 15 `error TS` lines, including the barrel case itself —
`tests/src/browser/helpers.test.ts(3213,9): error TS2322: Type '{ name: string; width: number;
height: number; }' is not assignable to type 'string'.` and
`tests/src/browser/helpers.test.ts(3214,48): error TS2559: Type 'string' has no properties in common
with type 'CaptureVariant'.`
Green after revert: `npm run check` exits 0 with no output.

### T1-C11, barrel resolution

Mutation: the barrel case additionally reads `buildUnpublished` from the environment entry.
Command: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser
tests/src/browser/helpers.test.ts`.
Red: `Tests 1 failed | 254 passed (255)` — `the browser barrel > resolves every published journey
name from the specifier a consumer imports`. Green after revert: `Tests 255 passed (255)`.

## Probes for the unknowns

Probe file: a temporary `tests/src/browser/probe.test.ts`, run with
`npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:browser
tests/src/browser/probe.test.ts`, then deleted. The tree was clean again before implementation
started (`git status --short` empty).

**Does `getAnimations({ subtree: true })` report a descendant transition before its first frame?**
Yes, provided the starting value has been resolved. Readings, in order:

```text
PROBE before:  | count 0
PROBE right after style write: transition:width play=running iterations=1 duration=400
PROBE after one frame: transition:width play=running iterations=1 duration=400
PROBE after 60ms: transition:width play=running iterations=1 duration=400
PROBE after finished:  | count 0
```

The probe read the list once before writing the style, and that read is what resolved the starting
width. Writing the style with no prior read starts no transition at all: the first version of three
`waitForAnimations` cases failed exactly that way
(`expected [] to have a length of 1`, `Value is required`, `expected 21 to be greater than 21`), and
each passes once the test reads `readStyle(box, 'width')` first. That is a fact about starting
transitions rather than about the wait, and the tests carry it as a comment.

**What a browser keeps in that list.** An infinite animation stays `running` forever
(`iterations=Infinity`), and a finite animation filling its target stays in the list at
`play=finished`:

```text
PROBE anim start: animation:probe-spin play=running iterations=Infinity duration=200 | animation:probe-once play=running iterations=1 duration=60
PROBE anim after 150ms: animation:probe-spin play=running iterations=Infinity duration=200 | animation:probe-once play=finished iterations=1 duration=60
```

The second reading is why the filter is `playState === 'running'` as well as finite iterations: a
filled, finished animation would otherwise park the wait on an already-resolved `finished` promise
and spin the loop until the budget.

**What each predicate returns at a shadow boundary.**

```text
PROBE shadow open(open):     rendered=true  reachable=true  closestHidden=false closestInert=false
PROBE shadow closed(closed): rendered=true  reachable=true  closestHidden=false closestInert=false
PROBE shadow hidden(open):   rendered=true  reachable=true  closestHidden=false closestInert=false
PROBE shadow inert(open):    rendered=true  reachable=true  closestHidden=false closestInert=false
PROBE shadow gone(open):     rendered=false reachable=false closestHidden=false closestInert=false
```

Both predicates answer for the element's own facts in an open root and a closed one alike. The
ancestor-attribute reads stop at the boundary because `closest` never leaves the element's own tree,
so an `aria-hidden` host and an `[inert]` host are invisible to them; a host the flat tree does not
lay out still takes the element off the page. That is the sentence each predicate's `@remarks` now
carries, and the `Bounds a shipped helper carries` bullet in the guide states it once for the pair.

**Does `waitForState` need a real transition?** Yes, and the tests use one: `aria-pressed` flipped by
a 30ms timer, so the poll really goes false-to-true after the act. The probe confirmed the flip
lands (`PROBE pressed: true`).

**Can `buildContrast` find a straddling pair for an arbitrary bar?** A scan over the grey channels,
run against the real `blendColor` and `measureContrast`:

```text
PROBE bar=1     refused=undefined accepted=undefined
PROBE bar=1.5   refused=198 accepted=0  composited(refused)=1.49  composited(accepted)=18.38
PROBE bar=4.5   refused=117 accepted=0  composited(refused)=4.03  composited(accepted)=18.38
PROBE bar=15    refused=218 accepted=0  composited(refused)=1.22  composited(accepted)=18.38
PROBE bar=18    refused=238 accepted=0  composited(refused)=1.02  composited(accepted)=18.38
PROBE bar=18.4  refused=240 accepted=undefined
PROBE bar=21    refused=255 accepted=undefined
PROBE readContrast refused=4.032 accepted=18.378
```

A bar at or under `1` has no refused side, because every contrast ratio reaches `1`; a bar above
roughly `18.38` has no accepted side, because that is the strongest ratio the tinted surface
supports. Both ends are refused with `Contrast control cannot straddle the bar <bar>`, and the tests
drive `1` and `21`.

## Gates

Each command was run in `C:/Users/mikes/WebstormProjects/test` after the last edit.

| Command                    | Exit | Totals                                     |
| -------------------------- | ---- | ------------------------------------------ |
| `npm run format:check`     | 0    | `All matched files use the correct format.` |
| `npm run lint:check`       | 0    | no output                                  |
| `npm run check`            | 0    | no output                                  |
| `npm run build`            | 0    | see the note that follows                  |
| `npm run test:src:core`    | 0    | `Tests 115 passed (115)`                   |
| `npm run test:src:browser` | 0    | `Tests 294 passed (294)`                   |
| `npm run test:guides`      | 0    | `Tests 48 passed | 1 skipped (49)`          |
| `npm run test:policy`      | 0    | `Tests 101 passed | 1 skipped (102)`        |
| `npm run test:setup`       | 0    | `Tests 24 passed (24)`                     |
| `npm run test:config`      | 0    | `Tests 173 passed | 1 skipped (174)`        |

`npm run lint` then `npm run format` were run before the checks to converge, in that order.

Acceptance criterion 7, read off the built file:

```text
$ grep -c "did not hold within" dist/src/browser/index.js
0
$ sed -n '2p' dist/src/browser/index.js
import { captureError, checkBounds, waitForAbort, waitForCondition } from "../core/index.js";
```

The declaration roll-up rewrites the same specifier to the package name:
`dist/src/browser/index.d.ts` lines 26-27 read `import type { JourneyVariant } from '@orkestrel/test'`
and `import type { WaitOptions } from '@orkestrel/test'`.

**Observation, not a criterion.** `npm test` exits 0 in roughly 24 seconds wall time
(`Tests 552 passed | 9 skipped (561)` for `test:src`, then the policy, config, setup, and guides
totals in the preceding table). One earlier `npm test` run reported
`tests/src/server/factories.test.ts > createScratch > remove > removes a final symbolic link without
removing its destination` failing with `Scratch directory is not a removable target: gate`. That
file is outside this unit's scope and untouched by it. Re-running `npm run test:src:server` alone
twice gave `Tests 143 passed | 9 skipped (152)` each time, and the next whole-chain run was green, so
I record it as a flake in an untouched suite rather than as a result. The authoritative reading is
the Orchestrator's.

## Deviations

### `StorageInterface` could not be landed as declared

**Expected.** `export interface StorageInterface extends Storage { permit(): void }` in
`src/browser/types.ts`, per the brief's contract block and ruling D11.

**Found.** `@orkestrel/database` already claims that bare name in its published guide
(`node_modules/@orkestrel/scaffold/dist/host/guides/database.md:285`, a `## Surface` row reading
`Declares the storage operations available only inside a driver's transaction scope.`). The fleet
name-ownership rule the `surface` policy instrument enforces therefore refuses it, and acceptance
criterion 6 fails.

**Evidence.** With the name spelled `StorageInterface`, `npm run test:policy` reported
`Tests 1 failed | 100 passed (102)` and
`AssertionError: expected [ { rule: 'surface', …(3) } ] to deeply equal []` carrying
`"message": "surface name belongs to one package: StorageInterface (database)"` and
`"path": "src/browser/types.ts"`. With the name spelled `WebStorageInterface` the same command
reports `Tests 101 passed | 1 skipped (102)`.

**Done.** Landed as `WebStorageInterface`. `.claude/rules/names.md` § Fleet name ownership rule 2
leaves the name with the package whose domain it describes and refuses a rename that makes the
renamed declaration vaguer: `Web Storage` is the platform API this interface extends, so the name
states its own contract rather than retreating to something broader. `createStorage` and
`StorageOptions` are both collision-free and keep the names the design gave them; the interface's own
doc block and the guide's Methods section state why the interface alone carries `Web`.

**Hypothesis.** None needed — the collision is mechanical and the rule names the resolution.

### The control builders sit in `helpers.ts`, not `factories.ts`

**Expected.** `buildContrast`, `buildEscapes`, and `buildCensus` in `src/browser/factories.ts`, per
the brief's contract block.

**Found.** The vendored policy Oxlint plugin refuses a `factories.ts` function whose name lacks the
`create` prefix (`configs/policy.ts:1004` and `:1273`, message
`Name this factories.ts function with the create prefix, or move it to its own kind file.`), and
`.claude/rules/architecture.md` § Kind purity fixes the placement by what the function is: each
builder assembles a composite detached value and returns no live entity, which is `helpers.ts` beside
`build`. `AGENTS.md` makes the rules outrank a dispatch, so I followed the rule.

**Done.** All three are exported from `src/browser/helpers.ts`. The published surface is identical —
the barrel star-exports both files — and every signature is the one the brief declared.
`createStorage` returns a live store and stays in `factories.ts`.

### `buildDenial` is an export the contract list did not name

`createStorage` raises the same `SecurityError` from `length`, `key`, `getItem`, `clear`,
`removeItem`, and `setItem`. Writing the `DOMException` out six times duplicates a pattern the
centralization rule refuses, and an object literal cannot carry a private method to hold it. The
shape has a precedent in this package: `buildRetryExhausted` is exported for exactly that reason and
is documented as such. `buildDenial(operation, key?)` is therefore a `helpers.ts` export with its own
Surface row, Voices row, guide fence, and test. A consumer implementing `Storage` some other way
reuses the voice rather than respelling it.

## What I could not close

- **The `createStorage` default-path case has no mutant.** `createStorage > reads back its seed and
  accepts every operation by default` did not redden under either pass: the mutations that break the
  withheld and quota arms leave the permissive path answering correctly. It is a positive-path
  assertion whose only failure mode is the store not working at all, which every other case would
  also catch. I did not invent a mutation for it.
- **`buildEscapes > carries both escapes and the sheet the caller exempts by id` reddened in pass 1
  only**, under the mutation that drops the exempt sheet. The pass-2 mount mutation does not change
  what `extractStyles` reports, so it left that case green. Both halves of C8 are covered across the
  two passes; no single pass covers both.
- **No `waitForAnimations` abort case ships.** The signal is threaded and the park races
  `waitForAbort`, but the brief's C3 does not list an abort case and I added none, so that path is
  reachable and unproven. It is the same gap the wait family's other members do not have.
- **`README.md` is untouched.** The guide tagline did not move, and the brief scopes the README to
  that.
- **`tests/setupBrowser.ts` is untouched.** No shared fixture was needed: the control builders ship
  as exports, so the tests reach for them rather than for a setup helper.

## Claims of my own I flag as least certain

1. **`waitForState` recognizes its own timeout by the message `waitForCondition` writes.** The catch
   block appends the last states only when `cause.message` starts with
   `Condition "<description>" did not hold`. The resolver's voices and an abort reason are different
   sentences, so nothing collides today, but this is a string comparison against another helper's
   message rather than a typed discriminator. A change to `waitForCondition`'s wording silently stops
   the augmentation, and only the `names the control, the state, and the last states read` case would
   catch it. If the reviewer prefers, the alternative is a dedicated error type in core, which is a
   wider change than this unit's scope.
2. **The `playState === 'running'` filter excludes a paused animation, and I chose that.** D9 names
   only the infinite-iteration exclusion. The probe showed that a filled, finished animation stays in
   the list, which forces a `playState` filter of some kind; `running` is the narrowest one that does
   not hang on a paused animation. A caller who pauses an animation and then waits gets an immediate
   resolve. The guide and the doc block both state it, but it is my ruling rather than the design
   round's.
3. **`buildContrast`'s search is over greys only.** A bar the grey axis cannot straddle is refused
   even where some non-grey pair could straddle it. The refusal message names the bar rather than the
   axis, so a caller reading it might conclude no stack exists. I kept the message the design named.
4. **`readRefusal`'s non-`Error` rethrow is proven with a fixture element whose own `tabIndex` getter
   throws a string.** No resolver path produces a non-`Error` naturally, so the branch is reachable
   only through a planted hostile property. I read that as planting a hostile input, the way
   `createHostileValues` does, rather than as replacing project-owned behaviour — but it is the one
   case in this unit where that judgement is load-bearing.
5. **`census-authored-token` and `census-authored-mark` are literals inside `buildCensus`.** A
   consumer cascade that declared either name would make the control report nothing undeclared. The
   fixture returns both tokens so no caller writes them down, and the doc block says to assert
   through the returned fields, but nothing prevents the collision.
6. **The `.d.ts` roll-up now imports `@orkestrel/test` from `@orkestrel/test/browser`.** I read that
   as one package resolving its own root entry rather than a second copy of anything, and I rewrote
   Contract rule 9 to say so. I did not run `npm run test:distribution`, which the brief forbids, so
   the claim that a real consumer's TypeScript resolves that self-import is reasoned from the
   `exports` map rather than measured.

## Artifacts

In the test checkout, under `tmp/` (git-ignored, swept at acceptance):

- `tmp/probe/mutate.py`, `tmp/probe/mutate2.py` — the two mutation sets, each with `backup`,
  `apply`, and `restore` commands and every edit written out.
- `tmp/probe/summaries.mjs` — extracts each new doc block's description paragraph, which is what the
  guide `Summary` cells were copied from.
- `tmp/probe/guide-surface.py`, `guide-contract.py`, `guide-limits.py`, `guide-patterns.py`,
  `guide-tests.py`, `guide-rule9.py`, `guides-carrier.py`, `counts.py`, `shadow.py` — the guide and
  carrier edits, each an idempotent exact-match replacement that asserts its anchor is unique.
- `tmp/probe/npm-test-accept3.log.txt`, `tmp/probe/build-accept2.log.txt` — the final chain and build
  logs.

## Review evidence

`git status --short` and `git diff --stat` at return:

```text
 M guides/test.md
 M src/browser/factories.ts
 M src/browser/helpers.ts
 M src/browser/types.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M tests/guides.test.ts
 M tests/setup.ts
 M tests/src/browser/factories.test.ts
 M tests/src/browser/helpers.test.ts
 M tests/src/core/helpers.test.ts

 guides/test.md                      | 600 ++++++++++++++++++++++++++++--------
 src/browser/factories.ts            |  85 ++++-
 src/browser/helpers.ts              | 506 +++++++++++++++++++++++++++++-
 src/browser/types.ts                | 139 ++++++++-
 src/core/helpers.ts                 |  58 ++++
 src/core/types.ts                   |  36 +++
 tests/guides.test.ts                |  32 ++
 tests/setup.ts                      |   7 +
 tests/src/browser/factories.test.ts | 130 +++++++-
 tests/src/browser/helpers.test.ts   | 574 ++++++++++++++++++++++++++++++++++
 tests/src/core/helpers.test.ts      | 120 ++++++++
 11 files changed, 2143 insertions(+), 144 deletions(-)
```

No off-limits file was written: `tests/setupPolicy.ts`, `tests/policy.test.ts`,
`tests/config.test.ts`, `tests/distribution.test.ts`, `package.json`, `package-lock.json`,
`vite.config.ts`, `configs/**`, `tsconfig.json`, `.claude/**`, `.agents/**`, `src/server/**`, and
`src/core/constants.ts` are all absent from the status output. Nothing was committed, pushed, or
installed, and no `git checkout`, `restore`, `stash`, `reset`, or `clean` was run — every mutation
revert went through a file copy the mutation script made first.
