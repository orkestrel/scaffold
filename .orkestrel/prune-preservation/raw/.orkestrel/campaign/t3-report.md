# Unit T3 report — fix round for the journey layer and the statechart harness

Every item closed. Every prescription adopted as written, with the precisions recorded under
§ Departures and precisions. Baseline `17d8b61`, clean; the tree now carries the twelve modified
files below and nothing else.

Instruments retained in the test checkout under `tmp/probe/`: `mutate3.py` (the mutation passes),
`verify3.py` (match-count check before each run), `run3.sh` (the full run), `run3census.sh` (the
census pass re-run after `buildCensus` changed), and `mutations3.log.txt` (every reading).

## Touched files

| File | Change |
| ---- | ------ |
| `C:/Users/mikes/WebstormProjects/test/src/core/helpers.ts` | Adds `buildRefusal`; `executeScenarios` raises it; `waitForText` refuses a departure the expectation carries |
| `C:/Users/mikes/WebstormProjects/test/src/core/types.ts` | `StatechartStatus` states that an exceptional exit is terminal |
| `C:/Users/mikes/WebstormProjects/test/src/core/constants.ts` | Same sentence on `STATECHART_STATUSES`; its example reaches the terminal pair by name |
| `C:/Users/mikes/WebstormProjects/test/src/browser/factories.ts` | Harness: builder success decides the phases, a terminal status on every exit, a re-run clears the rendered state, `buildRefusal` names a refused build; `createStorage` refuses an unsafe quota and documents its named-property bound |
| `C:/Users/mikes/WebstormProjects/test/src/browser/helpers.ts` | `readRefusal` catches locally; `waitForState` augments on the recorded throw; `buildCensus` derives its tokens per call |
| `C:/Users/mikes/WebstormProjects/test/src/browser/types.ts` | `HarnessOptions.state`, `HarnessInterface.execute`, `StorageOptions.quota`, and `WebStorageInterface` restated |
| `C:/Users/mikes/WebstormProjects/test/tests/src/core/helpers.test.ts` | `T3-C7`, `T3-C12` core half, `T3-C16` |
| `C:/Users/mikes/WebstormProjects/test/tests/src/browser/factories.test.ts` | `T3-C1`, `T3-C2`, `T3-C3`, `T3-C4`, `T3-C5`, `T3-C8`, `T3-C12`, `T3-C13` |
| `C:/Users/mikes/WebstormProjects/test/tests/src/browser/helpers.test.ts` | `T3-C6`, `T3-C11`, `T3-C14`, `T3-C15` |
| `C:/Users/mikes/WebstormProjects/test/tests/guides.test.ts` | `T3-C9` README presence guard; the refusal fence transcribed |
| `C:/Users/mikes/WebstormProjects/test/guides/test.md` | Surface row, Methods paragraphs, Contract rules 14 and 19, the Limits row, the bounds bullet, the statechart fences |
| `C:/Users/mikes/WebstormProjects/test/README.md` | The post-T1 dependency shape in the pitch paragraph and the browser sentence |

```text
 README.md                           |  12 +-
 guides/test.md                      | 160 ++++++++++++++----
 src/browser/factories.ts            | 103 +++++++-----
 src/browser/helpers.ts              |  62 ++++---
 src/browser/types.ts                |  17 +-
 src/core/constants.ts               |   7 +-
 src/core/helpers.ts                 |  50 +++++-
 src/core/types.ts                   |   4 +-
 tests/guides.test.ts                |  34 ++++
 tests/src/browser/factories.test.ts | 324 +++++++++++++++++++++++++++++++-----
 tests/src/browser/helpers.test.ts   | 137 +++++++++++++++
 tests/src/core/helpers.test.ts      |  89 ++++++++++
 12 files changed, 847 insertions(+), 152 deletions(-)
```

## The items

Each row's mutation reading is from `tmp/probe/mutations3.log.txt`. Every pass asserted its match
count before editing, restored the tree afterwards, and left `git status --short` naming exactly the
twelve files above.

### 1 — A builder's success, not its value, decides whether the phases run

**Change.** `src/browser/factories.ts`: the row loop holds `let built: { readonly context: TContext }
| undefined` and assigns `built = { context: await options.build(row.scenario) }` inside the `try`.
The box's presence is what "the builder returned" means, so the `context !== undefined` guard is
gone and `undefined` is a context like any other. This is the mechanism for the brief's first named
unknown: a box rather than a boolean, because the box narrows `TContext` for `executeScenario` and
`options.state` without a second read.

**Control.** `T3-C1`, `drives every phase of a row whose context is undefined` — the reproduction's
fixture: `createHarness<'closed', 'toggle', undefined>` with `build: () => undefined` and a throwing
`assert`. It pins the phase trail, `failed` 1, the row in `failures`, the announcer's summary, and
the state the row's reader rendered.

**Red then green.** `npm run test:src:browser` with the guard restored: `1 failed | 313 passed`,
`AssertionError: expected [] to strictly equal [ 'arrange', 'act', 'assert' ]`. Restored:
`314 passed`.

### 2 — A terminal status on every exit

**Change.** The row loop sits inside a `try` whose `catch` writes
`STATECHART_ATTRIBUTES.status = 'failed'`, narrates the tally as it stands, and rethrows the value by
identity. The subjective lane's exact shape, including its bounds: the row is not counted as failed,
and a completed run never reaches the `catch`, so no `finally` touches it. Restated in
`src/browser/types.ts` (`HarnessOptions.state` and `HarnessInterface.execute`), `src/core/types.ts`,
`src/core/constants.ts`, the guide's Constants prose, the `HarnessInterface` Methods paragraph,
Contract rule 19, and the statechart Patterns prose.

**Controls.** `T3-C2` is three cases. `writes failed and rejects by identity when the state reader
throws` is the existing reader-throw case retargeted: the rejection is the reader's error by
identity, the root reads `failed`, the announcer carries the summary, and no row carries a result.
`writes failed and rethrows a non-Error reader throw by identity` drives the same exit with a thrown
string. `counts a phase that throws a string as its row failing` pins the other reading: through
`executeScenario` a non-`Error` phase throw is named by its type and is the row failing, so the
harness finishes the table.

**Red then green.** With the two writes dropped from the `catch`: `2 failed | 312 passed`,
`AssertionError: expected 'running' to be 'failed'` on each reader case. Restored: `314 passed`.

### 3 — A re-run clears the rendered state

**Change.** `state.removeAttribute(STATECHART_ATTRIBUTES.state)` and `state.textContent = ''` beside
the line that clears the row results.

**Control.** `T3-C3`, `clears the rendered state at the start of a re-run` — construct, `execute`,
`execute` again, with the reading taken inside the second run's own `build`, which is the one moment
in that run before any row has produced a context. It pins the attribute absent, the text empty, the
reading actually taken, and the state put back by the end of the run.

**Red then green.** With the two lines removed: `1 failed | 313 passed`, `AssertionError: expected
'open' to be null`. Restored: `314 passed`.

### 4 — Bound the `createStorage` claim; no `Proxy`

**Change.** The `Bounds a shipped helper carries` bullet and the `@remarks` sentence the subjective
lane wrote: the store answers through its methods and intercepts no named-property access, so drive
a consumer through `getItem` and `setItem`. The guide's "goes wherever a real one goes" sentence is
replaced by the bounded one with a link to that bullet, and "rather than a shaped object" is struck
from the Limits row. The same sentence sits on `WebStorageInterface`, because that type's extension
of `Storage` is what makes the property form typecheck. No `Proxy` in the fix.

**Control.** `T3-C4`, `answers through its methods and intercepts no named-property access` — reads
`store.theme` as `undefined` while `getItem('theme')` answers `'dark'`, shows a property write
landing on the object rather than in the store (no quota consumed, no withheld permission met), and
shows the method-form write still refused.

**Red then green.** A throwaway mutation wrapped the returned store in a `Proxy` whose `get` trap
falls back to the map — the shape the fix refuses: `1 failed | 313 passed`, `AssertionError:
expected 'dark' to be undefined`. Restored: `314 passed`. The `Proxy` exists only in the mutation
instrument; the shipped store has none.

### 5 — A safe integer quota

**Change.** `Number.isSafeInteger(quota)` replaces `isInteger(quota)`, keeping the existing sentence
`Storage quota must be a non-negative integer`. The bound is stated in the `@throws` line, the
`@remarks`, and `StorageOptions.quota`. `isInteger` was `src/browser/factories.ts`'s only use of that
import, so the import now names `isError` alone.

This settles the brief's second named unknown: `@orkestrel/contract` 0.0.17 publishes no
safe-integer guard. Its surface carries `isInteger` and `isNonNegativeInteger`, and the latter's
own doc block reads "Representable unsafe integers remain integers; safe-integer policy is a
separate domain" (`node_modules/@orkestrel/contract/dist/src/core/index.d.ts:3099-3115`;
`guides/contract.md:42` in the scaffold checkout lists the same pair). So `Number.isSafeInteger`.

**Control.** `T3-C5`, extending `refuses a quota that is not a non-negative integer` with
`Number.MAX_SAFE_INTEGER + 1` in the refused row and `Number.MAX_SAFE_INTEGER` accepted beside
`quota: 0`.

**Red then green.** With `isInteger` restored: `1 failed | 313 passed`, `AssertionError: expected
undefined to strictly equal Error: Storage quota must be a non-negati…`. Restored: `314 passed`.

### 6 — `readRefusal` with its own `try`/`catch`

**Change.** The call sits in a local `try`; the `catch` returns an `Error`'s message and rethrows
anything else, `undefined` included. `captureError` left the import list, and the doc block says why
the `catch` is local.

**Control.** `T3-C6`, `rethrows undefined from a hostile target rather than reading it as resolved`
— the reproduction's fixture, a `tabIndex` getter throwing `undefined`, with a flag separating a
throw from a returned `undefined` and the reading left at a sentinel this call never produces. The
string-throw case and the three-voice case are unchanged.

**Red then green.** Routed through `captureError` again: `1 failed | 313 passed`, `AssertionError:
expected false to be true`. Restored: `314 passed`.

### 7 — `waitForText`'s refusals have a Contract home and cover the unsatisfiable pair

**Change.** `if (absent !== undefined && text.includes(absent))` throws
`Text departure must not appear in the text expectation` before any reading, beside the empty-value
refusals. Contract rule 14 now carries `waitForText`'s entry and both refusal sentences with the
reason each one names. The Patterns fence keeps its existing comment; the new sentence is stated in
the doc block's `@example` and asserted by the control.

**Control.** `T3-C7`, `refuses a departure the expectation carries, before it reads anything` — the
contained case and the `absent === text` case under `exact`, with a reader tally of `0` proving the
refusal is eager, plus two satisfiable controls (with and without `exact`) that still take their
readings.

**Red then green.** With the guard removed: `npm run test:src:core` reports `1 failed | 119 passed`,
`AssertionError: expected a thrown error to be Error: Text departure must not appear in …`.
Restored: `120 passed`.

### 8 — The guide's statechart fences are the executed table

**Change.** § Patterns → Drive a statechart table now declares `arrangeDisclosure`,
`actOnDisclosure`, and `assertDisclosure` as module functions and all four rows of `SCENARIOS` in
that compact shape, which is the shape `tests/src/browser/factories.test.ts` drives. `MISMATCHED`
carries the same three phases. The harness fence's `total // 4` and `passed // 4` now follow from
the rows the fence declares. The prose still says the values are pinned in the browser suite,
because the fences drive a document and the `guides` project runs with the browser disabled.

**Control.** `T3-C8`, the browser suite's `stops the bare runner at the first failing row and names
that row`, extended to read each phase of the fence's own `MISMATCHED_SCENARIOS[0]` as a function
beside asserting the documented sentence. `tests/guides.test.ts` keeps transcribing the
attribute-and-status fence unchanged.

**Red then green.** With the row's phases elided the way the old fence elided them:
`1 failed | 313 passed`, `AssertionError: expected undefined to be type of 'function'` — the
documented sentence is unreachable from that declaration. Restored: `314 passed`.

### 9 — `README.md` states the post-T1 dependency shape

**Change.** The browser sentence names the imports the way Contract rule 13 names them —
`vitest/browser`, DOM globals, this package's own core, and the `@orkestrel/contract` guards it
narrows with — and "and nothing else" is gone. The pitch paragraph mirrors the guide's dependency
sentence by adding "and for the guards every environment narrows with".

**Control.** `T3-C9`, `names the browser environment imports in the README as the contract names
them`, beside the parity pitch check in `tests/guides.test.ts`. Stated in its own comment as a
presence guard: the dependency reach itself is proved by the browser barrel case and the scoped
typechecks, and this asserts only that the README says it. Whitespace runs collapse first, so where
a sentence wraps is not part of the claim.

**Red then green.** With the pre-T1 sentence restored: `npm run test:guides` reports
`1 failed | 49 passed | 1 skipped`, `AssertionError: … to contain 'imports `vitest/browser`, DOM
globals…'`. Restored: `50 passed | 1 skipped`.

### 10 — Contract rule 14 names `waitForAnimations` as the browser environment's parking member

**Change.** Rule 14 now reads that `waitForAnimations` is the browser environment's parking door on
the same terms as `waitForEvent`: it parks on each animation's own `finished` promise and validates
the interval for consistency with the family without ever using it. The rule's opening claim is
unchanged.

**Control.** None beyond the guide parity run, as the brief states. `npm run test:guides` exits 0.

### 11 — The `playState === 'running'` exclusion has a control

**Change.** None in source; the clause and its three published statements already agreed.

**Controls.** `T3-C11` is two cases. `resolves while a paused animation is still in the list` pauses
a 5,000 ms animation and reads the wait resolving inside a 60 ms budget with that animation still in
`getAnimations({ subtree: true })`. `resolves while a finished animation filling its target is still
in the list` awaits a `fill: 'forwards'` animation's `finished` and reads the same.

**Red then green.** With the `playState` clause dropped: `2 failed | 312 passed`, both cases
reporting `Animation "section" did not settle within 60ms` — the paused one at 63.8 ms and the
filled one at 60 ms. That reading is also the measurement that both animations stay in the list.
Restored: `314 passed`.

### 12 — One spelling of `build refused`

**Change.** `buildRefusal(name: string, cause: unknown): Error` in `src/core/helpers.ts`, on the
`buildRetryExhausted` precedent: it returns the error unthrown with the refusal as its `cause` by
identity. `executeScenarios` raises it and the harness announces its `message` on the row it
refused. It has a Surface row, a `@example`, and a guide fence under Drive a statechart table, and
the guide's two "under the name that runner would have given it" sentences now name the helper.

**Controls.** Core: `buildRefusal` with two cases — the message and the `cause` by identity, and the
bare runner's own refusal compared against the helper's output. Browser: `T3-C12` inside `fails the
row whose builder refused and runs the rows after it`, which reads the per-row announcement inside
the next row's build (the terminal sentence replaces it before `execute` returns) and compares it
with `buildRefusal('the summary leaves it closed', refusal).message`. The guide fence is transcribed
in `tests/guides.test.ts`.

**Red then green.** Respelled in the harness as `build was refused`: `1 failed | 313 passed`,
`AssertionError: expected 'the summary leaves it closed: build w…' to be 'the summary leaves it
closed: build r…'`. Restored: `314 passed`.

### 13 — Host readings become property assertions

**Change.** Both cases rewritten. The `pending`→`idle` case walks the `MutationObserver` records
once and derives four indices — the last record that added an `li`, the `total` write, the `status`
write whose `oldValue` is `pending`, and the record that added the announcer's text — then asserts
`lastRow < total < status < narration` and that every declared row mounted. Nothing pins how the
browser grouped the mounts into `childList` records. The pause case declares `const pause = 40`
once, uses it as the option and in every assertion, and derives the mark count from
`DISCLOSURE_SCENARIOS.length * 2`.

**Red then green.** Two mutations, one per case. Dropping the between-row wait:
`1 failed | 313 passed`, `AssertionError: expected 0.09999999403953552 to be greater than or equal
to 40`. Writing `status` before `total` at construction: `1 failed | 313 passed`, `AssertionError:
expected 6 to be greater than 7`. Restored: `314 passed` each time.

### 14 — `waitForState` augments on the recorded throw, not a message prefix

**Change.** The condition's own `try` records what the reading threw in a
`{ readonly thrown: unknown }` box and rethrows it; the outer `catch` recognizes three values that
are not the exhaustion and leaves each by identity — the recorded throw, the value on
`options.signal.reason`, and a rejection that arrived before any reading was taken (a refused
bound). What remains is the poll's own exhaustion, which is the only value with a last observation
worth appending. See § Departures and precisions for why the reading tally and the signal identity
are there.

**Control.** `T3-C14`, `rethrows an abort reason spelled like its own timeout voice by identity` —
an abort reason whose message is this wait's exact timeout sentence, aborted on a timer after
several readings, and then the same reason on an already-aborted signal. Both by identity, and the
caller's own error is not rewritten. The existing augmentation case and the existing bound-refusal
case are unchanged.

**Red then green.** With the message-prefix comparison restored: `1 failed | 313 passed`,
`AssertionError: expected false to be true`. Restored: `314 passed`.

### 15 — `buildCensus` derives its tokens per call

**Change.** `const suffix = crypto.getRandomValues(new Uint32Array(1)).join('')`, with both tokens
carrying it. `getRandomValues` rather than `randomUUID`, because `randomUUID` answers only in a
secure context and a Vitest browser project served from a remote host is not one; the doc block says
so.

**Control.** `T3-C15`, `derives distinct tokens per call, each undeclared by the cascade` — two
calls yield four distinct tokens, `readCascade` declares none of them, and a census over both
controls reports all four as undeclared.

**Red then green.** With the fixed literals restored: `1 failed | 313 passed`, `AssertionError:
expected 'census-authored-token' not to be 'census-authored-token'`. Recorded twice — once in the
full run against `crypto.randomUUID` and once by `tmp/probe/run3census.sh` after the derivation
moved to `getRandomValues`, with the same reading. Restored: `314 passed`.

### 16 — The `STATECHART_STATUSES` example reaches the terminal pair by name

**Change.** `src/core/constants.ts`'s `@example` now reads
`const terminal = new Set<StatechartStatus>(['passed', 'failed'])` with `terminal.has('running') //
false` beneath it.

**Control.** `T3-C16`, `reaches the terminal pair by name rather than by a tuple index`, in the
`STATECHART_STATUSES` block of `tests/src/core/helpers.test.ts`: the transcribed example plus each
member's presence in the tuple.

**Red then green.** With the transcribed set naming `'stalled'`, a status the union does not carry,
`npm run check` reports `tests/src/core/helpers.test.ts(1334,24): error TS2769: No overload matches
this call.` — the by-name form is refused by the compiler where the by-index form would have shifted
silently. Restored: `check` exits 0.

## Gates

Every command run from `C:/Users/mikes/WebstormProjects/test`, read bare.

| Command | Exit | Reading |
| ------- | ---- | ------- |
| `npm run format:check` | 0 | All matched files use the correct format (60 files) |
| `npm run lint:check` | 0 | no diagnostics |
| `npm run check` | 0 | root project plus the core, browser, and server scoped projects |
| `npm run build` | 0 | `dist/src/browser/index.js` line 2 imports `STATECHART_ATTRIBUTES`, `STATECHART_STATUSES`, `buildRefusal`, `checkBounds`, `executeScenario`, `requireValue`, `waitForAbort`, `waitForCondition`, and `waitForDelay` from `../core/index.js` |
| `npm run test:src:core` | 0 | `120 passed` (baseline 116) |
| `npm run test:src:browser` | 0 | `314 passed` (baseline 304) |
| `npm run test:guides` | 0 | `50 passed | 1 skipped` (baseline 48 passed, 1 skipped) |
| `npm run test:policy` | 0 | `101 passed | 1 skipped` — the `surface` rule accepts `buildRefusal` |

**Observation, not a criterion.** `npm test` exits 0: `test:src` `577 passed | 9 skipped`,
`test:policy` `101 passed | 1 skipped`, `test:config` `173 passed | 1 skipped`, `test:setup`
`24 passed`, `test:guides` `50 passed | 1 skipped`.

`npm run test:distribution` was not run, as the brief directs.

## Departures and precisions

No prescription was departed from. Three precisions are inside the shape each item fixes.

1. **Item 14's guard set is wider than the brief's sentence, because the brief's sentence breaks
   its own control.** "The timeout is the case where the condition never threw" would augment an
   abort reason that is an `Error` — which is exactly the vector `T3-C14` carries, so the literal
   model fails the case it was written for. The fix keeps the prescription's property (key on what
   happened, never on how another module worded it) and adds two more identity readings: the value
   on `options.signal.reason`, and a reading tally that separates a bound refused before any reading
   from an exhaustion. Both mutations confirm the discrimination: the prefix comparison reddens
   `T3-C14`, and the existing bound-refusal case stays green.
2. **Item 2's "non-`Error` phase throw" is unreachable through `executeScenario`, which names every
   phase throw as an `Error` before the harness sees it.** The harness's `if (!isError(cause)) throw
   cause` is therefore answered by a `state` reader that throws a non-`Error`, and that is the case
   written for it. The brief's named control — a phase that throws a string — is written as what it
   actually does: the row fails under `threw a non-error string value` and the table finishes.
3. **Item 4's `Proxy` appears only in the mutation instrument.** The fix bounds the claim, as
   prescribed. A `Proxy` was needed to prove `T3-C4` discriminates, so the mutation pass builds one
   and the pass restores the tree.

Ancillary choices settled and recorded: the helper name `buildRefusal` (checked against the fleet
guides and the installed `@orkestrel/*` declarations for an owner, and against the `surface` policy
rule); the refusal sentence `Text departure must not appear in the text expectation`; the
`{ readonly context: TContext }` box for item 1; `crypto.getRandomValues` for item 15; and the
placement of the `buildRefusal` fence under the existing Drive a statechart table heading rather
than a new one, so no `ROUTED_FENCES` entry moves.

## Claims I flag as least certain

1. **The `narration` index in `T3-C13`'s construction case is still read off `MutationObserver`
   records.** It asserts that the announcer's text write lands after the `status` write, which is a
   document-order property of the harness rather than a batching one, but the instrument is the same
   record queue the old assertion over-read. If a browser ever coalesced an attribute write and a
   later text insertion into one record, the index comparison would have nothing to compare.
2. **`T3-C11` discriminates only while Chromium keeps a paused animation and a `fill: 'forwards'`
   finished animation in `getAnimations({ subtree: true })`.** The two mutation timeouts are the
   measurement that it currently does. An engine that dropped either from the list would leave both
   cases green and silently stop testing the exclusion.
3. **Item 15's collision claim rests on one 32-bit draw per call.** Two calls in one document
   collide with probability about 2.3e-10, which is below every other flake source in this suite but
   is not zero, and `T3-C15` asserts distinctness directly.
4. **Item 8's fence completeness has no mechanical guard.** The `elided` mutation proves the
   documented sentence belongs to the complete declaration, and `tests/guides.test.ts` proves every
   name in the fence resolves — but nothing compares the fence's text against the suite's
   declaration, so a future edit could re-elide the phases without reddening a gate.
5. **`T3-C9` is a presence guard and says so.** It asserts the README's sentence, never the
   dependency reach it describes. The reach is proved elsewhere (the browser barrel case, the scoped
   typechecks), and a reader who takes this case for the behavioural proof would be wrong.
