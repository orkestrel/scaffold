# Unit T2 — report

Checkout `C:/Users/mikes/WebstormProjects/test`, baseline `8f74726`, clean at start
(`git status --short` empty) and at return except the owned files. Every gate exits 0. One
deviation is recorded under § Deviations, and it changed which entity the worked table drives
rather than any declared contract.

Baseline totals measured at `8f74726` before any edit: `npm run test:src:browser` exit 0,
`Tests 294 passed (294)`; `npm run test:src:core` exit 0, `Tests 115 passed (115)`.

## Exports landed

| Export             | File                       | Line |
| ------------------ | -------------------------- | ---- |
| `StatechartStatus` | `src/core/types.ts`        | 266  |
| `HarnessOptions`   | `src/browser/types.ts`     | 317  |
| `HarnessInterface` | `src/browser/types.ts`     | 342  |
| `createHarness`    | `src/browser/factories.ts` | 406  |

Each is declared exactly as the brief's § The contracts block declares it. `createHarness` sits in
`factories.ts` because it returns a live entity, which is the placement
`.claude/rules/architecture.md` § Kind purity fixes and the `create` prefix the vendored policy
plugin requires there. No harness helper needed extracting, so `src/browser/helpers.ts` is
untouched.

## The entity the worked table drives

A native `<details>` disclosure with a second door: the summary toggles it, and a `Dismiss` button
closes it and does nothing when it is already closed.

- States `'closed' | 'open'`, events `'toggle' | 'dismiss'`, four rows — one per event in each
  state. The `closed` plus `dismiss` row is the one whose event leaves the state where it found it.
- The summary is driven with `clickDisclosure('Advanced')` and the button with
  `clickAccessible('Dismiss')`; the state is read with `readStates(summary)`, which reads a native
  disclosure's expansion off the parent `details` element's own `open`.
- Each row's name says which door it drove — `closed opens through the summary`,
  `open closes through the summary`, `open closes through the button`,
  `closed stays closed through the button`.

Why this shape: D5 names a native `<details>` driven with `clickDisclosure`, and the brief's
Unknowns require a row whose event leaves the state unchanged. A lone `<details>` cannot have one,
because `toggle` always flips. Adding a closing control to the same native disclosure satisfies both
— the entity is still the native `<details>` D5 named, and the second door supplies the unchanged
row. The alternative the brief offered, a two-control disclosure with `summon` and `dismiss`, would
have replaced the native element D5 named and dropped `clickDisclosure` from the worked example.

Each row builds its own fixture and the builder removes the one before it. Without that removal the
second row meets two mounted disclosures named "Advanced" and `clickDisclosure` refuses them as
ambiguous. The guide fence carries that fact as a comment, because a reader copying the fence hits
it on row two.

## The `pending` → `idle` observation

**Method.** A `MutationObserver` armed on `document.body` before construction with
`{ subtree: true, childList: true, attributes: true, attributeOldValue: true }` and
`attributeFilter: [STATECHART_ATTRIBUTES.status, STATECHART_ATTRIBUTES.total]`, its queue read back
synchronously with `takeRecords()` the moment `createHarness` returns. `takeRecords()` is the only
reading that survives a value written and replaced inside one call.

The root is built detached carrying `pending` and then mounted, so the initial `pending` write is
never recorded; what is recorded is the change away from it, whose `oldValue` is `pending`. That is
what makes the ordering provable rather than inferred.

**What it recorded**, as the test asserts it, each entry a record in the order the document queued
it:

```text
added div
added p p ol
added li
added li
added li
added li
data-statechart-total left absent
data-statechart-status left pending
added text
```

The root joined the document, every row element joined it, the row count was written, and only then
did `status` leave `pending`. The trailing `added text` is the announcer's sentence, which lands
after the status write — a gate settles on the attribute and a reader hears the prose, so the
contract the gate reads is written before it is narrated.

I predicted this trail without the trailing `added text` and the run corrected me. The expectation
now records what the document actually did, with the reason beside it.

## Controls: red before, green after

Every red run was produced by mutating `src/browser/factories.ts` or `src/core/constants.ts`, never
an assertion, and every mutation was reverted from a file copy the script made first. The mutation
sets are `tmp/probe/mutate.py` in the test checkout, with `backup`, `apply1`, `apply2`, `apply3`,
and `restore` commands and every edit written out.

Command for every browser row:
`npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project src:browser tests/src/browser/factories.test.ts`
(49 cases in that file after this unit, 39 before).

### Browser pass 1

Red: `Tests 6 failed | 42 passed (48)`. Green after revert: `Tests 48 passed (48)`.

| Mutation                                                | Reddened                                                                        |
| ------------------------------------------------------- | -------------------------------------------------------------------------------- |
| M1 `idle` written before the rows are rendered           | T2-C4 `mounts every row while it reads pending and writes idle only after the count` |
| M2 the run breaks at the first failing row               | T2-C3 both cases, T2-C5                                                          |
| M3 the empty-table refusal dropped                       | T2-C1 `refuses a table with no transition in it and mounts nothing`              |
| M4 the declared pause never awaited                      | `waits the declared pause between rows and not after the last one`               |

### Browser pass 2

Red: `Tests 7 failed | 41 passed (48)`. Green after revert: `Tests 48 passed (48)`.

| Mutation                                             | Reddened                                                        |
| ----------------------------------------------------- | ----------------------------------------------------------------- |
| M5 `running` never written                            | T2-C4 `reads running from the call until the parked row is let go` |
| M6 a second run counts on from where the first stopped | T2-C5, and the pause case through the mark count                 |
| M7 the state element never takes the reading          | T2-C2, the pause case                                            |
| M8 `failures` names every row rather than the failing ones | T2-C2, T2-C3 both cases, T2-C4's construction case          |

### Browser pass 3

Red: `Tests 2 failed | 47 passed (49)`. Green after revert: `Tests 49 passed (49)`.

| Mutation                                                      | Reddened                                        |
| -------------------------------------------------------------- | ------------------------------------------------- |
| M9 the state element carries a reading before any row built one | T2-C4's construction case                       |
| M10 a throwing state reader swallowed inside the row           | `rejects the run when the state reader throws`  |

### T2-C6, core

Mutation: `'running'` dropped from `STATECHART_STATUSES`.
Command: `npm run test:src:core`. Red: `Tests 1 failed | 115 passed (116)` —
`STATECHART_STATUSES > lists exactly the statuses the union names, in the order a run passes through`.
Green after revert: `Tests 116 passed (116)`.

The same mutation reddens the typecheck half, which is the direction the runtime assertion cannot
reach. `npm run check` reported:

```text
tests/src/core/helpers.test.ts(1241,50): error TS2344: Type '"pending" | "idle" | "passed" | "failed"' does not satisfy the constraint '"Expected: literal string: pending, Actual: literal string: running" | …'
tests/guides.test.ts(791,40): error TS2345: Argument of type '"running"' is not assignable to parameter of type '"pending" | "idle" | "passed" | "failed"'.
```

So the case pins the two directions through two instruments: `expectTypeOf<StatechartStatus>()
.toEqualTypeOf<(typeof STATECHART_STATUSES)[number]>()` fails the typecheck where the sets disagree
either way, and the comparison against the keys of a `Record<StatechartStatus, true>` and against an
ordered literal fails the run where a member is missing or the run order is rewritten.

### The control that did not discriminate, and what replaced it

The first pause case measured the whole run against a 75ms floor and stayed green under M4. Driving
a real disclosure costs about 300ms, so the total reads the same whether or not the harness waited
at all. The case now has each row mark its own build and its own reading through the `build` and
`state` callbacks: the reading of one row to the build of the next is the pause and nothing else,
because every write between them is synchronous. It asserts each of the three gaps at 40ms or more
and the tail after the last reading under 40ms, and it reddens under M4.

## Gates

Each command was run in `C:/Users/mikes/WebstormProjects/test` after the last edit.

| Command                    | Exit | Totals                                     |
| -------------------------- | ---- | ------------------------------------------ |
| `npm run format:check`     | 0    | `All matched files use the correct format.` |
| `npm run lint:check`       | 0    | no output                                  |
| `npm run check`            | 0    | no output                                  |
| `npm run build`            | 0    | see the reading that follows               |
| `npm run test:src:core`    | 0    | `Tests 116 passed (116)`                   |
| `npm run test:src:browser` | 0    | `Tests 304 passed (304)`                   |
| `npm run test:guides`      | 0    | `Tests 48 passed \| 1 skipped (49)`        |
| `npm run test:policy`      | 0    | `Tests 101 passed \| 1 skipped (102)`      |

`npm run lint` then `npm run format` were run before the checks to converge, in that order.

Acceptance criterion 7, read off the built file:

```text
$ grep -c "data-statechart-status" dist/src/browser/index.js
0
$ sed -n '2p' dist/src/browser/index.js
import { STATECHART_ATTRIBUTES, STATECHART_STATUSES, captureError, checkBounds, executeScenario, requireValue, waitForAbort, waitForCondition, waitForDelay } from "../core/index.js";
```

The map is imported from the core entry beside it rather than inlined.

**Observation, not a criterion.** `npm test` exits 0:
`Tests 563 passed | 9 skipped (572)` for `test:src`, then `101 passed | 1 skipped (102)` policy,
`173 passed | 1 skipped (174)` config, `24 passed (24)` setup, and `48 passed | 1 skipped (49)`
guides. `tests/src/server/factories.test.ts` did not flake in either whole-chain run I took. I did
not run `npm run test:distribution`, which the brief forbids. The authoritative reading is the
Orchestrator's.

## What the design left to me, decided and recorded

- **Markup.** A `div` root carrying `status` and the tally; a `p` with `role="status"`; a `p` for
  the rendered state; an `ol` of `li` rows. An ordered list is what an ordered set of rows is, and
  the attribute is the contract, so nesting costs a gate nothing.
- **Row label.** `<name>: <from> on <event> becomes <to>`, which names all three parts the
  transition declares and reads as a sentence.
- **Announcer sentences.** `Statechart harness is idle, 0 passed and 0 failed of 4.` at
  construction, the same frame with `running` when a run starts, `<name> passed.` or the row's own
  refusal message after each row, and
  `Statechart harness passed, 4 passed and 0 failed of 4.` at the end. The frame never puts a count
  next to a noun that has to agree with it, so it reads correctly for a table of one.
- **Where the state element gets its attribute.** It mounts carrying none and takes `state` from the
  first row that produces a context. A state is read from an entity and no entity exists until a row
  builds one; writing `''` there would be a sentinel. The construction case asserts the element
  carries nothing.
- **The status reading's narrowing.** `status` reads the root's attribute and narrows it through
  `STATECHART_STATUSES.find`, with `requireValue` supplying
  `Statechart harness carries no status` for the reading that never happens. It is a Voices row and
  the guide names it beside the other narrowing refusals.

## The guide

- § Surface: `StatechartStatus` in the core Types table, `HarnessOptions` and `HarnessInterface` in
  the browser Types table, `createHarness` in the browser Factories table. The core Constants prose
  now states each status the way D4 defines it, and the browser Surface intro names `createHarness`
  beside `build`, `mount`, and `render`.
- § Methods: a `HarnessInterface` table over `execute` and `destroy`, with the reset and the
  detached-root readings stated beneath it.
- § Voices: `Statechart harness mounted no transition` against `createHarness`, and
  `Statechart harness carries no status` against `status` in the narrowing paragraph.
- § Contract: rule 19, its own rule rather than a paragraph in rule 13. Rule 13 is about how a
  journey verb finds its target; what makes the harness test-side is a different claim, and putting
  it there would have made one rule carry two.
- § Limits: `A statechart harness — createHarness` ships, `A separate gate reader — readHarness` is
  refused because the object already carries the tally, and `A generated or published harness page`
  is refused as product policy.
- § Patterns → Drive a statechart table: the fictional `Disclosure` fence is replaced by the
  executed table, the mismatched-row fence follows the same entity, and a `createHarness` fence
  shows the construction, the run, and the tally read back off both the object and the markup. The
  `STATECHART_ATTRIBUTES` fence stays and gains the D4 sentences.
- The `STATECHART_STATUSES` and `STATECHART_ATTRIBUTES` doc blocks in `src/core/constants.ts` carry
  the same definitions, so the guide and the source say one thing.

## Where each fence is transcribed

The worked table, the mismatched-row fence, and the harness fence all drive a browser, and the
`guides` project runs with the browser disabled. Their values are pinned in
`tests/src/browser/factories.test.ts`, and the guide's own prose says so. Contract rule 1 already
admitted that split — "A fence naming a browser is left to the browser suite" — so no rule moved for
it.

`tests/guides.test.ts` lost the fictional `Disclosure` class, its two scenario tables, its three
phase helpers, and the case that drove them, because no fence declares that entity now. It gained a
case that transcribes the attribute-and-status fence, which is the part of the section this
environment can run. Its total is unchanged at `48 passed | 1 skipped (49)`.

## Deviations

### The worked table's entity carries a second control D5 did not name

**Expected.** D5: "a real native `<details>` disclosure driven with `clickDisclosure`
(`'closed' | 'open'`, `'toggle'`), including a row whose event leaves the state unchanged where the
entity has one."

**Found.** A native `<details>` has no such row. Its one event is `toggle`, and `toggle` always
flips the state, so `'closed' | 'open'` crossed with `'toggle'` yields two rows and neither leaves
the state where it found it. The brief's Unknowns require the row: "carry an event that leaves the
state unchanged (the reference requires such a row)."

**Evidence.** The state union and the event union give the full matrix. With one event the matrix is
`closed + toggle → open` and `open + toggle → closed`. There is no third row to write.

**Done.** The entity is the native `<details>` D5 named, driven with `clickDisclosure`, plus a
`Dismiss` button that sets `details.open = false` and is a no-op when the disclosure is already
closed. The event union becomes `'toggle' | 'dismiss'` and the matrix becomes four rows, of which
`closed + dismiss → closed` is the unchanged one. D5's named element, its named verb, and its
`'closed' | 'open'` state union are all intact; only the event union widened. The brief's Unknowns
section put this choice in my hands and asked me to record it, and its deviation contract lists
"the entity and its fixture" among the decisions this unit settles.

**Hypothesis.** None needed — the matrix is arithmetic and D5's own clause anticipates it.

## What I could not close

- **`failures` hands out a snapshot has no mutant.** The getter builds a fresh array on every
  reading, so there is no single line to disable that makes a previously-returned list change under
  it; a mutation would have to hoist the array out of the getter, which is a rewrite rather than an
  edit. The claim is asserted (a list read before a re-run still names the failing row while
  `harness.failures` reads empty mid-run), and the assertion would break if the array were shared,
  but I did not manufacture the mutant.
- **`buildDenial`, `createStorage`, and the rest of T1's surface are untouched.** Nothing in this
  unit needed a shared fixture from them, and `tests/setupBrowser.ts` is unchanged for the same
  reason: the worked table's builder belongs to the one file that drives it.
- **`README.md` is untouched.** The guide tagline did not move, and the README pitch equals it
  unchanged.
- **No abort path on `execute`.** `HarnessOptions` declares no signal and the brief's contract names
  none, so a run in flight cannot be called off. A table parked on a row that never settles runs
  until its own budget, which is the caller's. I added nothing for it.
- **The state element's attribute is absent before a run, and a gate looking for it then finds
  nothing.** That is deliberate and documented, but it means a gate that polls for `state` before
  the run starts reads an absent element rather than an empty one. Nothing in the attribute contract
  says which a gate should expect.

## Claims of my own I flag as least certain

1. **`options.state` throwing rejects `execute()` and leaves the status at `running`.** This is my
   ruling, not the design round's. The alternative — catching it and counting the row as failing —
   would have made a reader's defect look like the entity's, and swallowing it would have left the
   rendered state silently stale. The cost of my choice is that a harness can be stranded at
   `running`, which a gate polling for a terminal status reads as a hang rather than as a bad
   reader. A caller whose reader can throw has no way to get a verdict out of the run. The
   `HarnessOptions` doc block, the guide, and a test all state it, but a reviewer may prefer the
   terminal write in a `finally`.
2. **The state element takes its attribute after the row rather than inside the row's try.** The
   reading therefore happens for a failing row too, which is the diagnostic worth having, but it
   sits outside the catch — which is the same line claim 1 rests on. Those two are one decision
   viewed twice.
3. **`failures` is derived from the row markup, so two rows sharing a name are indistinguishable in
   it.** The list carries the `scenario` attribute of each failing row, and nothing refuses a table
   whose rows repeat a name. `executeScenarios` has the same property in its messages, so I did not
   add a refusal the runner does not have — but a table with duplicate names produces a `failures`
   list a reader cannot map back to rows.
4. **`total`, `passed`, and `failed` read the attributes through `Number`.** `Number(null)` is `0`,
   so those getters would answer `0` rather than refusing if the attributes were removed, where
   `status` refuses. The inconsistency is real; I left it because the attributes are written before
   the object exists and a getter that refuses on a tally is noisier than one that reads zero.
5. **The pause case's 40ms floor is a timer assertion.** `setTimeout` guarantees at least the
   delay, and the measured gaps cleared it on every run I took, but a host whose timer alignment
   fires a hair early would redden it. The discriminating margin is large — an unwaited gap is
   sub-millisecond — so the floor could drop to 30 without weakening the control. I kept 40 because
   it is the declared property.
6. **The mutation-record trail asserts an exact sequence, including `added p p ol` as one record.**
   That rests on the DOM queueing one `childList` record per `append` call whatever the node count,
   which the run confirmed. A browser that split it would redden the case without the harness
   changing. It is the strongest available proof of the ordering and it is also the most brittle
   assertion in the unit.

## Artifacts

In the test checkout, under `tmp/` (git-ignored, swept at acceptance):

- `tmp/probe/mutate.py` — the three mutation passes, with `backup`, `apply1`, `apply2`, `apply3`,
  and `restore`, and every edit written out.
- `tmp/probe/guide-pattern.py`, `guide-surface.py`, `guide-contract.py`, `guides-carrier.py` — the
  guide and carrier edits, each an idempotent exact-match replacement asserting its anchor is
  unique.
- `tmp/probe/harness-block.ts` — the test block as it was appended.
- `tmp/probe/npm-test-final.log.txt`, `tmp/probe/build-final.log.txt`, and the per-gate logs.

## Review evidence

`git status --short` and `git diff --stat` at return:

```text
 M guides/test.md
 M src/browser/factories.ts
 M src/browser/types.ts
 M src/core/constants.ts
 M src/core/types.ts
 M tests/guides.test.ts
 M tests/src/browser/factories.test.ts
 M tests/src/core/helpers.test.ts

 guides/test.md                      | 270 +++++++++++++++-----
 src/browser/factories.ts            | 163 +++++++++++-
 src/browser/types.ts                |  69 ++++-
 src/core/constants.ts               |  17 +-
 src/core/types.ts                   |  17 ++
 tests/guides.test.ts                | 100 +-------
 tests/src/browser/factories.test.ts | 488 +++++++++++++++++++++++++++++++++++-
 tests/src/core/helpers.test.ts      |  35 ++-
 8 files changed, 986 insertions(+), 173 deletions(-)
```

No off-limits file was written: `tests/setupPolicy.ts`, `tests/policy.test.ts`,
`tests/config.test.ts`, `tests/distribution.test.ts`, `package.json`, `package-lock.json`,
`vite.config.ts`, `configs/**`, `tsconfig.json`, `.claude/**`, `.agents/**`, `src/server/**`, and
every T1 export's implementation file are all absent from the status output. Two owned files needed
no change and are absent too: `README.md` and `tests/setupBrowser.ts`. Nothing was committed,
pushed, or installed, and no `git checkout`, `restore`, `stash`, `reset`, or `clean` was run — every
mutation revert went through a file copy the mutation script made first.
