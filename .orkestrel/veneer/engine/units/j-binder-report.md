# J-BINDER report

Executor: `opus` on Opus 5.5 (native Claude subagent, served model `claude-opus-5-5[1m]`), sole writer in
`C:/Users/mikes/WebstormProjects/veneer-binder` (branch `unit/binder`, base `1868007`). Nothing committed,
installed, or discarded.

## Deviation state

**Stopped on acceptance criterion 6 (`npm run test:policy`).** Every other criterion is met.

- **Expected:** `npm run test:policy` exits 0.
- **Found:** exit 1, one failing case, two `surface` violations:
  - `src/browser/Snapshot.ts` line 20: `surface name belongs to one package: Snapshot (scaffold)`
  - `src/browser/validators.ts` line 36: `surface name belongs to one package: isHost (scaffold)`
- **Evidence:** the installed `@orkestrel/scaffold` `0.0.77` guide claims both bare names:
  `node_modules/@orkestrel/scaffold/dist/host/guides/scaffold.md` row 74 `` `Snapshot` | type | Holds exact
  lowercase hexadecimal target bytes keyed by artifact-relative path. `` and row 381 `` `isHost` | const |
  Narrows a value to one `Host`. `` The design verdict names the class `Snapshot` (R4, R13) and the guard
  `isHost` (R13, R15). `.claude/rules/names.md` § Fleet name ownership forbids a bare exported name another
  fleet package's guide claims. The contracts differ, so rule 1 (reuse) does not apply. Rule 2 or 3 renames or
  qualifies Veneer's declarations. Renaming `Snapshot` without renaming `SnapshotInterface`, `SnapshotTarget`,
  and `SnapshotCategory` breaks the `{Entity}Interface` pairing, and those names live in `src/browser/types.ts`,
  which is report-only. The brief's deviation contract names this case: a verdict ruling that contradicts a
  rule file.
- **Done:** everything else. The code ships the verdict's names. Nothing is renamed provisionally.
- **Hypothesis:** qualify both names for the DOM host they serve, for example `HostSnapshot` (with
  `HostSnapshotInterface`, `HostSnapshotTarget`, and `HostSnapshotCategory` in `types.ts`) and `isElementHost`.
  That is a design ruling for the Orchestrator and a `types.ts` change for a successor brief.

**Shared-file finding.** A file outside the brief's grants goes false: `tests/app/browser/sections/ButtonSection.test.ts`
around line 133 asserts the owned-host message `'Button host already has a live owner'`. The generic `Registry`
throws `'Host already has a live owner'` with the unchanged `BUTTON_HOST_OWNED` code and `{ tag }` context. The
exact patch is in § Shared-file patches. `npm run test:app` reads `1 failed | 77 passed (78)` on that one case
until the patch lands.

## Rulings taken

- **E6, the user's ruling of 2026-09-23 (the engine session's decisions, E6):** no aliases, no deprecation
  markers, no wrappers, and nothing superfluous. Where a symbol, proof, or sentence is replaced, it is replaced
  outright and every consumer is updated in the same unit. Applied here:
  - `isButtonHost` is renamed to `isHost` everywhere, with no re-export.
  - `BUTTON_TOGGLE` is replaced by the frozen wire table `BUTTON_EVENTS: EventWire<ButtonEventMap>`
    (R3's `{ENTITY}_EVENTS` form), and every consumer reads `BUTTON_EVENTS.toggle`.
  - The next-click release in `Delegate` is removed. The observer release replaces it, with no fallback.
  - The seed's Button-specific `#buttons` map, its `static #hosts` set, its captured-state fields, and the
    delegate's `BUTTON_HOST_OWNED` catch are deleted. `Registry`, `Snapshot`, and `Button.find` replace them.
  - The § Surface paragraph saying the mechanisms stay Button-shaped is deleted (R18).
  - No `@deprecated` tag exists anywhere in the diff.
- **Unknown 1 (observer delivery timing):** the delivery does not run before the next statement of the proof. It
  needs one awaited microtask turn (`await Promise.resolve()`), and one turn is enough. The measurement: with
  that line replaced by a comment in each release case, the command
  `npm run test:src:browser -- tests/src/browser/Delegate.test.ts` read `3 failed | 13 passed (16)`. The
  failing cases were "restores removed hosts at the observer delivery after their removal and releases their
  ownership", "releases a connected host moved outside the root at the observer delivery after the move", and
  "acquires a released host again with a fresh engine after reinsertion". With the line restored the same
  command read `16 passed (16)`. The proof uses no timer.
- **Unknown 2 (where the option merge lives):** the merge cannot be a `parse*` leaf. It throws
  `{ENTITY}_OPTION_INVALID`, and its defaults and constructor layers are not coercion. Under
  `architecture.md` § Kind purity a `parse*` export returns `T | undefined` and never throws for invalid input.
  The merge is therefore `resolveOptions` in `helpers.ts` (the `resolve*` form: "picks the effective value from
  options and defaults"). It takes each declared key's coercer as a `Parser<T[K]>` from `@orkestrel/contract`
  and reads `data-bs-config` through the contract's `parseJSONAs(text, isRecord)`. No `parse*` function is
  needed, so `src/browser/parsers.ts` and `tests/src/browser/parsers.test.ts` are **not created**; under E6 an
  empty kind file is superfluous. The first engine-specific coercer that no contract reader covers (Collapse's
  `parent`, a selector read into an element) creates `parsers.ts` with its entity. The J-COLLAPSE brief names
  `parseCollapseAttributes` in `parsers.ts`. With this ruling, Collapse declares its keys as a parser table
  passed to `resolveOptions`, and adds a `parsers.ts` leaf only for a coercion no contract reader performs.
- **Button and Delegate do not call `resolveOptions`.** The brief asked to keep the Button and Delegate paths on
  the merge. Button declares no attribute key, as Bootstrap's `Button` declares no `Default`. Delegate's only
  option is a `ParentNode` root, and a `Document` root carries no `data-bs-*` attribute. A call that merges an
  empty table is superfluous under E6. The guide states that Button reads its options from the constructor alone.
- **Bootstrap `normalizeData` versus the contract readers (the Orchestrator's addendum):** Bootstrap maps
  `'true'` and `'false'` to booleans, a string whose `Number(value).toString()` round-trips to a number, `''`
  and `'null'` to `null`, and otherwise tries `JSON.parse(decodeURIComponent(value))` and keeps the string.
  Its `_typeCheckConfig` then throws `TypeError` on a type mismatch. Veneer coerces each declared key through
  the parser the entity declares, and reuses the contract readers directly. The differences:
  - `parseBoolean` also accepts `'1'`, `'0'`, `1`, and `0`, where Bootstrap fails the type check.
  - `parseNumber` accepts a whitespace-padded numeric string, where Bootstrap keeps it as a string.
  - `parseString` coerces a finite number to its decimal string, where Bootstrap fails a `string` check.
  - A JSON-valued attribute reaches the parser as its raw string. An entity that needs a JSON-valued key
    declares that leaf with the entity.
  - A malformed or non-record `data-bs-config` is ignored, as Bootstrap ignores it. A declared key inside it
    that fails coercion throws, as Bootstrap's type check throws.

  The guide's § Engine intro states the boolean leniency. This unit wraps no contract reader.
- **Delegate drives a found engine (R5).** A click drives `Button.find(host)` whoever constructed that engine,
  and acquires only when the host has none. That is R5's "driving one a consumer constructed through `find`",
  and the J-COLLAPSE brief's "acquires or finds the engine". Two cases outside the brief's list therefore
  change:
  - The consumer-owned case is rewritten as "drives the engine a consumer constructed and leaves it to that
    consumer on destruction".
  - The nested-roots case is retitled "toggles a host under nested roots once per click and restores it with
    the delegate that acquired it". Its assertions are unchanged.

  A static `WeakMap<Event, WeakSet<HTMLElement>>` marks each host once per click across delegates, so a
  nested outer delegate does not toggle the host a second time through `find`.
- **`Button.find` added** as R4's static lookup, returning `ButtonInterface | undefined`. `tests/guides.test.ts`
  reports no method drift for the static member.
- **Registry message:** the generic `Registry` throws `'Host already has a live owner'`, because
  `RegistryOptions` carries only a code. Owned proofs assert the code. The off-limits app proof needs the patch
  in § Shared-file patches.
- **Snapshot records at construction.** `Button` saves `active` and `aria-pressed` in its constructor, so
  destruction restores the state found at construction, as the guide and the seed state. `Snapshot` also
  records, on the first token saved per element, whether the element carried a `class` attribute. It removes an
  attribute left empty that it found absent, which keeps every `BUTTON_RESTORATIONS` row green.
- **`generateId`** draws 64 bits from `crypto.getRandomValues`, not `crypto.randomUUID`. `randomUUID` is
  missing outside a secure context. The suffix is two base-36 words padded to seven characters each, so
  concatenation cannot alias. No document re-draw loop exists: a deterministic proof cannot reach a collision
  branch.
- **`readTarget` is `readTargets(trigger)[0]`.** It has one selector implementation and a narrower contract
  (the first HTML element).
- **Brief inconsistency settled under Scope:** § Context calls the `index.test.ts` export list "a report-only
  patch", and § Scope lists `tests/src/browser/index.test.ts` as owned. The list is edited under § Scope, and
  its diff appears in § Touched files.
- **The user's ruling of 2026-09-23 on names (the second addendum):** the engine's TypeScript follows its own
  design rather than Bootstrap's JavaScript. Every class token, `data-bs-*` attribute name, selector, and wire
  event name lives in `src/browser/constants.ts` as a named export. `Button.ts`, `Delegate.ts`, `helpers.ts`,
  and `validators.ts` carry none inline. This unit adds `BUTTON_PRESSED` (`aria-pressed`), `TARGET_ATTRIBUTE`
  (`data-bs-target`), `LINK_ATTRIBUTE` (`href`), `CONFIG_ATTRIBUTE` (`data-bs-config`), and `OPTION_PREFIX`
  (`data-bs-`), beside the existing `BUTTON_ACTIVE`, `BUTTON_SELECTOR`, and `BUTTON_EVENTS`. No override
  option is added. The literals left inline are platform vocabulary, not Bootstrap defaults:
  - the native `click` event name in `Delegate`;
  - the `AbortSignal` `abort` event name and the `running` play state in `settleAnimations`;
  - the selector syntax characters `#`, `.`, and `,` in `readTargets`;
  - the `SnapshotCategory` discriminants;
  - the platform `class` attribute in `Snapshot.ts`, which is not among the addendum's named files.

  A consumer override would replace the following constants, received as follows:

  | Constant | Default | Reader | How the reader receives it |
  | --- | --- | --- | --- |
  | `BUTTON_ACTIVE` | `active` | `Button` constructor, `pressed`, `toggle` | imported constant; `Snapshot` receives it through `SnapshotTarget.name` |
  | `BUTTON_PRESSED` | `aria-pressed` | `Button` constructor, `toggle` | imported constant; `Snapshot` receives it through `SnapshotTarget.name` |
  | `BUTTON_EVENTS` | `{ toggle: 'toggle.vn.button' }` | `Button` | imported constant; `bindEventMap` receives it through its `wire` parameter and `emitEvent` through its `type` parameter |
  | `BUTTON_SELECTOR` | `[data-bs-toggle="button"]` | `Delegate` button route | imported constant; this selector carries the route's `data-bs-toggle` key and its `button` value |
  | `TARGET_ATTRIBUTE` | `data-bs-target` | `readTargets`, and through it `readTarget` | imported constant (no parameter yet) |
  | `LINK_ATTRIBUTE` | `href` | `readTargets`, and through it `readTarget` | imported constant (no parameter yet) |
  | `CONFIG_ATTRIBUTE` | `data-bs-config` | `resolveOptions` | imported constant (no parameter yet) |
  | `OPTION_PREFIX` | `data-bs-` | `resolveOptions` | imported constant, completed by each key of the `parsers` parameter |

  `isButtonEvent` and every other validator read no name.
- **ColorMode prose bounds:** the phrase "returns the mode the root carries" appears in both places. The
  `@remarks` sentence reads "a `toggle` call writes nothing and returns the mode the root carries". Each case
  title ends "and its toggle returns the mode the root carries".

## Touched files

- `src/browser/Registry.ts` (new): `Registry<TEngine>` class. It holds a weak host-to-engine record, and a
  second claim throws `AppError` with the configured code and `{ tag }`.
- `src/browser/Snapshot.ts` (new): `Snapshot` class. It records attributes, class tokens, and inline properties
  with priority, keeps the first recording, restores and forgets, and removes a `class` attribute it found
  absent.
- `src/browser/helpers.ts`: `emitEvent` gains the cancelable flag, returns `!defaultPrevented`, and mirrors
  detail fields. `bindEventMap` is entity-neutral (wire table, guard, hooks). Added `settleAnimations`,
  `reflow`, `readTargets`, `readTarget`, `generateId`, and `resolveOptions`.
- `src/browser/validators.ts`: `isButtonHost` is renamed to `isHost`.
- `src/browser/constants.ts`: `BUTTON_TOGGLE` is replaced by the frozen `BUTTON_EVENTS` wire table. Adds
  `BUTTON_PRESSED`, `TARGET_ATTRIBUTE`, `LINK_ATTRIBUTE`, `CONFIG_ATTRIBUTE`, and `OPTION_PREFIX`.
- `src/browser/Button.ts`: claims through `Registry`, records and restores through `Snapshot`, binds through
  the neutral `bindEventMap`, and dispatches non-cancelable. Reads every name from constants. Adds
  `static find`.
- `src/browser/Delegate.ts`: drives a found engine or acquires one, marks a click once per host across
  delegates, and releases at `MutationObserver` delivery while owning. The next-click release is removed.
- `src/browser/index.ts`: barrels `Registry.js` and `Snapshot.js`.
- `src/browser/ColorMode.ts`: the `@remarks` prose bound only.
- `tests/src/browser/Registry.test.ts` (new): claim, find, refusal, release, and independence proofs.
- `tests/src/browser/Snapshot.test.ts` (new): attribute, token, class attribute, property priority,
  first-recording, and forget proofs.
- `tests/src/browser/helpers.test.ts`: `emitEvent` (non-cancelable, cancelable, mirrored), `bindEventMap` (a
  Collapse-shaped map), `settleAnimations`, `reflow`, `readTarget`, `readTargets`, `generateId`, and
  `resolveOptions`.
- `tests/src/browser/Delegate.test.ts`: the release cases are rewritten to observer delivery, the
  consumer-engine case is rewritten, the nested case is retitled, and the owned-message assertion reads the code.
- `tests/src/browser/Button.test.ts`: `BUTTON_EVENTS` value and freeze, and a `Button.find` case.
- `tests/src/browser/validators.test.ts`: `isHost`.
- `tests/src/browser/index.test.ts`: the export list.
- `tests/src/browser/ColorMode.test.ts`: the two case titles only.
- `guides/veneer.md`: the changes are the following.
  - § Surface rows: `BUTTON_EVENTS`, `BUTTON_PRESSED`, `TARGET_ATTRIBUTE`, `LINK_ATTRIBUTE`,
    `CONFIG_ATTRIBUTE`, `OPTION_PREFIX`, `Registry`, `Snapshot`, `isHost`, `generateId`, `readTarget`,
    `readTargets`, `reflow`, `resolveOptions`, and `settleAnimations` are added. `BUTTON_TOGGLE` and
    `isButtonHost` are removed. The `bindEventMap` and `emitEvent` summaries are updated. The table widths are
    unchanged.
  - § Surface: the delegate paragraph is shortened to point at § Engine, and its disabled-state sentence, which
    § Compatibility cites, is kept. The Button-shaped paragraph is deleted.
  - A `## Engine` section is added between § Examples and § Styles, with its intro (Bootstrap's names as
    constant defaults, construction, member departures, the option merge) and `### Events`,
    `### Delegation`, `### Ownership and restoration`, and `### Motion`.
  - The § Methods tables for `RegistryInterface` and `SnapshotInterface` were already correct and are
    unchanged.

## Red-first records

Every red and green run was on Chromium 153.0.8010.12. The build is
`%LOCALAPPDATA%/ms-playwright/chromium-1243/chrome-win64`, whose manifest reads `153.0.8010.12.manifest`.

**Delegate release and routing:** `npm run test:src:browser -- tests/src/browser/Delegate.test.ts`

- Before, on the seed source with the rewritten proof: `Tests  4 failed | 12 passed (16)`. The failing cases
  and their seed failures:
  - "drives the engine a consumer constructed and leaves it to that consumer on destruction": `expected 1 to
    be 2`. The seed leaves a consumer-owned host alone.
  - "restores removed hosts at the observer delivery after their removal and releases their ownership":
    `expected false to be true`.
  - "releases a connected host moved outside the root at the observer delivery after the move": `expected
    false to be true`.
  - "acquires a released host again with a fresh engine after reinsertion": `expected true to be false`.
- After: `Tests  16 passed (16)`.
- "keeps the engine and the state of a host removed and reinserted in one task" is green on the seed as well,
  because the seed also keeps a contained host. The mutation that reddens it is under § Mutations.

**Whole browser project:** `npm run test:src:browser`

- Before, on the seed source with all rewritten and new proofs: `Test Files  7 failed | 1 passed (8)`,
  `Tests  5 failed | 27 passed (32)`. The per-file failures:
  - Import failures in `Button.test.ts` and `helpers.test.ts`: `does not provide an export named
    'BUTTON_EVENTS'`.
  - `Registry.test.ts`: no `'Registry'` export.
  - `Snapshot.test.ts`: no `'Snapshot'` export.
  - `validators.test.ts`: no `'isHost'` export.
  - The four Delegate cases listed earlier.
  - `index.test.ts` "exports the browser surface without registering document or window listeners":
    `expected [ 'BUTTON_ACTIVE', …(12) ] to strictly equal [ 'BUTTON_ACTIVE', …(20) ]`.
- After: `Test Files  8 passed (8)`, `Tests  101 passed (101)`.

`helpers.test.ts` asserts `emitEvent` with the cancelable flag. On the seed that file failed at import,
before any assertion ran. The cancelable and mirroring assertions bind to their defects through the mutations
that follow.

## Mutations

Each mutation was applied alone to the source, the named proof file was run, and the source was restored byte
for byte. The instrument is `mutate.mjs` with `mutations*.json` in the session scratchpad
`C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/`.
It ran `npm run test:src:browser -- <proof> --testTimeout=3000`. The mutations were measured before the
name-constant change in § Rulings taken. That change moved string literals into constants, changed no
logic, and left `npm run test:src:browser` at `Tests  101 passed (101)`.

| Mutation | Proof reddened (tally) |
| --- | --- |
| Delegate: observer never observes (the "observer removed" mutation) | the removed-hosts, moved-out, and released-reacquired release cases (`3 failed / 16`) |
| Delegate: release every owned engine at delivery, contained or not | removed-hosts; "keeps the engine and the state of a host removed and reinserted in one task" (`2 failed / 16`) |
| Delegate: no per-click mark across delegates | the nested-roots case (`1 failed / 16`) |
| Delegate: never drives a found engine | the consumer-engine case plus every reuse case (`9 failed / 16`) |
| `emitEvent`: no mirrored properties | "mirrors each detail field as an own property a document listener reads" |
| `emitEvent`: always non-cancelable | "dispatches a cancelable event and returns false when a listener prevents it" |
| `bindEventMap`: guard bypassed | "binds the hooks of a non-Button map to their wire names and releases them on abort" |
| `settleAnimations`: resolves at once | "resolves after a running transition finishes"; "re-reads the list …" |
| `settleAnimations`: `Promise.all` instead of `allSettled` | "treats a cancelled transition as settled"; "treats a transition whose element is removed midway as settled" |
| `settleAnimations`: no re-read | "re-reads the list and waits for a transition that starts when the first one finishes" |
| `settleAnimations`: infinite and paused kept | "leaves infinite and paused animations out" |
| `settleAnimations`: abort not raced | "resolves at once when the signal aborts, leaving the transition running" |
| `reflow`: no layout read | "lets a class change on a freshly inserted element start its transition in the same task" plus the settle cases that stage through `reflow` (`6 failed / 21`) |
| `readTargets`: no `CSS.escape` | "resolves the data-bs-target selector, escaping an id that carries a special character"; the href fallback case |
| `readTargets`: full-URL fragment not extracted | "falls back to the href fragment when the target is absent or a bare hash" |
| `readTargets`: non-HTML matches kept | "returns undefined when no selector resolves to an HTML element"; "returns every HTML element a selector list names, in document order" |
| `generateId`: constant suffix | "appends a random suffix to the prefix and returns a different id on each call" |
| `resolveOptions`: config beats attributes | "merges the defaults, the config attribute, the declared attributes, and the constructor object in that order" |
| `resolveOptions`: falsy values dropped (`false`, `0`) | the merge-order case |
| `resolveOptions`: constructor object applied before attributes | the merge-order case |
| `resolveOptions`: undeclared config keys admitted | the merge-order case |
| `resolveOptions`: failed coercion skipped | "throws the entity code for a declared attribute or config key that fails coercion" |
| `Registry`: release ignores the engine | "releases only for the engine that holds the claim, then admits a new claim" |
| `Registry`: second claim replaces | "refuses a second claim with the configured code and keeps the first owner" |
| `Snapshot`: class attribute kept | "removes the class attribute it found absent when restoring leaves the list empty" |
| `Snapshot`: later save overwrites | "keeps the first recording of a target saved twice" |
| `Snapshot`: priority dropped | "restores an inline property with its priority and removes one it found absent" |
| `Snapshot`: records kept after restore | "forgets its records on restore, so a later restore keeps every edit" |
| `Snapshot`: absent attribute left | "writes back a present attribute and removes an absent one" |
| `Button`: `find` ignores the registry | "finds the live engine by its host and forgets it after destruction" |
| `Button`: registry not released | the find case, reconstruction, and listener-destruction cases (`3 failed / 33`) |
| `Button`: snapshot not restored | every restoration case (`26 failed / 33`) |

The first `reflow` proof passed under its own mutation: the control's `getAnimations()` read flushed style for
the element mounted beside it. The element is now mounted after the control's read, and the table row is the
re-run on the corrected proof.

The `settleAnimations` "signal ignored in the loop condition" variant spins a microtask loop, and the browser
connection closed (`Tests  6 passed (21)`, `Browser connection was closed`). That run is not green, but the
"abort not raced" row is the clean reading.

## Acceptance criteria

Command outputs are from the final run, after every edit.

1. `npm run check:src:browser`: exit 0. `npx tsc --noEmit -p tsconfig.json`, which includes the tests, also
   exits 0.
2. `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser`: exit 0.
   `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md`: "All matched
   files use the correct format.", exit 0.
3. `tests/src/browser/index.test.ts` lists the following set, and the proof is green:
   `BUTTON_ACTIVE, BUTTON_EVENTS, BUTTON_PRESSED, BUTTON_SELECTOR, Button, COLOR_MODE_ATTRIBUTE,
   COLOR_MODE_KEY, CONFIG_ATTRIBUTE, ColorMode, Delegate, LINK_ATTRIBUTE, OPTION_PREFIX, Registry, Snapshot,
   TARGET_ATTRIBUTE, bindEventMap, emitEvent, generateId, isButtonEvent, isColorModeState, isHost, readTarget,
   readTargets, reflow, resolveOptions, settleAnimations`. `npm run test:src:browser` reads
   `Test Files  8 passed (8)`, `Tests  101 passed (101)`, exit 0, on Chromium 153.0.8010.12.
4. Proofs and their mutations are in § Mutations. The cases:
   - `Registry` and `Snapshot`.
   - `settleAnimations`: a real transition, a cancelled one, a removed element, zero duration, infinite and
     paused animations, abort, and re-read.
   - `reflow`.
   - `readTarget`: the id `panel.one` escaped through `CSS.escape`.
   - `readTargets`: a comma list and a class list.
   - `generateId`.
   - `emitEvent`: cancelable, non-cancelable, and mirrored own properties read by a `document` listener.
   - `bindEventMap`: a Collapse-shaped map.
   - `resolveOptions`: defaults, JSON, declared keys, the constructor object, `false` and `0` surviving, an
     invalid attribute and an invalid config key each throwing `PROBE_OPTION_INVALID` with the attribute's
     name, and a malformed or non-record config ignored.
5. `Delegate` releases a removed or moved-out host at observer delivery and keeps a same-task reinserted host.
   The observer-removed and contained-or-not mutations are recorded. `tests/src/browser/index.test.ts` "exports
   the browser surface without registering document or window listeners" is green.
6. `npm run test:guides`: `Tests  19 passed (19)`, exit 0. `npm run test:policy`: `Tests  1 failed | 108
   passed | 1 skipped (110)`, exit 1. The only violations are the two `surface` collisions in § Deviation
   state. The prose sweep and the placement rules report nothing.

Rename bound after the change:

- `grep -rnw "isButtonHost\|BUTTON_TOGGLE\|emitEvent\|bindEventMap" src tests guides` hits only
  `guides/veneer.md`, `src/browser/Button.ts`, `src/browser/helpers.ts`, `tests/src/browser/helpers.test.ts`,
  and `tests/src/browser/index.test.ts`. Every hit is on the kept names `emitEvent` and `bindEventMap`.
- `grep -rniE "(isButtonHost|BUTTON_TOGGLE|emitEvent|bindEventMap)(s|ed|ing)\b" src tests guides` returns
  nothing.
- `grep -rn "isButtonHost\|BUTTON_TOGGLE" src tests guides app configs README.md` returns nothing.

## Observations (not criteria)

- `npm run test:app`: `1 failed | 77 passed (78)`. The failure is the `ButtonSection.test.ts` message
  assertion; the patch follows.
- `npm run test:journey`: `Test Files  4 passed (4)`, `Tests  160 passed (160)`.
- `npm run test:setup:browser`: `Tests  65 passed (65)`.
- `npm run test:conformance`: `6 failed | 16 passed (22)`. Every failure is `ENOENT` on
  `dist/src/styles/index.css` or `dist/src/core/index.js`. The worktree has no build, and this unit may not run
  one.
- For J-COLLAPSE's `isCollapseEvent`: a `CustomEvent` dispatched with `detail: undefined` carries
  `detail === null` at runtime (the `CustomEventInit` default). The `CustomEvent<undefined>` map types
  therefore describe a `null` payload.

## `git status --short`

```text
 M guides/veneer.md
 M src/browser/Button.ts
 M src/browser/ColorMode.ts
 M src/browser/Delegate.ts
 M src/browser/constants.ts
 M src/browser/helpers.ts
 M src/browser/index.ts
 M src/browser/validators.ts
 M tests/src/browser/Button.test.ts
 M tests/src/browser/ColorMode.test.ts
 M tests/src/browser/Delegate.test.ts
 M tests/src/browser/helpers.test.ts
 M tests/src/browser/index.test.ts
 M tests/src/browser/validators.test.ts
?? src/browser/Registry.ts
?? src/browser/Snapshot.ts
?? tests/src/browser/Registry.test.ts
?? tests/src/browser/Snapshot.test.ts
```

## `git diff --stat` (tracked files; the four new files are untracked)

```text
 guides/veneer.md                     | 130 ++++++++++--
 src/browser/Button.ts                |  55 ++---
 src/browser/ColorMode.ts             |   2 +-
 src/browser/Delegate.ts              |  70 ++++---
 src/browser/constants.ts             |  23 ++-
 src/browser/helpers.ts               | 241 +++++++++++++++++++--
 src/browser/index.ts                 |   2 +
 src/browser/validators.ts            |   4 +-
 tests/src/browser/Button.test.ts     |  22 +-
 tests/src/browser/ColorMode.test.ts  |   4 +-
 tests/src/browser/Delegate.test.ts   |  54 +++--
 tests/src/browser/helpers.test.ts    | 391 ++++++++++++++++++++++++++++++++---
 tests/src/browser/index.test.ts      |  17 +-
 tests/src/browser/validators.test.ts |  20 +-
 14 files changed, 874 insertions(+), 161 deletions(-)
```

The untracked files are `src/browser/Registry.ts`, `src/browser/Snapshot.ts`,
`tests/src/browser/Registry.test.ts`, and `tests/src/browser/Snapshot.test.ts`.

## Shared-file patches

`tests/app/browser/sections/ButtonSection.test.ts` is off-limits and outside the brief's grants. This change
makes it false:

```diff
--- a/tests/app/browser/sections/ButtonSection.test.ts
+++ b/tests/app/browser/sections/ButtonSection.test.ts
@@ -133 +133 @@
-			expect(raised instanceof Error && raised.message).toBe('Button host already has a live owner')
+			expect(raised instanceof Error && raised.message).toBe('Host already has a live owner')
```

`tests/setupBrowser.ts` needs no patch. The motion proofs mount their transition sheet inline in
`tests/src/browser/helpers.test.ts`. `src/browser/types.ts` needs no patch for this unit's contracts. The
§ Deviation state rename, if the Orchestrator adopts it, is a successor brief's `types.ts` change.
