# B-PASSIVE baseline at launch

This record supersedes `b-passive-family.md` and each `b-passive-<unit>-brief.md` wherever they name
an artifact that F5b, F5c, F6, or F7 moved or renamed before the units launched. The launch prompt
names the baseline commit; every fact here is true of that commit, and the tree wins where this
record and the tree disagree.

## The ledger (F5b ACCOUNTING-LEDGER)

- The departure tables live in `guides/veneer.md` under `## Tokens`, `### Departures` (the
  introduction, the legend, and the refresh command), then one `#### \`<key>\`` table per shipped
  component in barrel order, columns
  `Component | Selector | Property | Condition | Bootstrap 5.3.8 | Veneer | Departure`. Where family ruling 5 says
  "under `### Departures` in the guide", read this file.
- The addition table lives in `guides/veneer.md` under `## Tokens` and `### Additions`,
  columns `Component | Name | Condition | Category | Reason`. Family ruling 5's addition row shape
  gains the `Condition` cell (the at-rule condition the site sits under, or `—`).
- `### Outside the ledger` follows those two sections (D14: `guides/` holds guides alone, so no
  `guides/ledger/` directory exists; a worktree cut before L1 LEDGER-HOME landed still carries it,
  and its rows move into the guide at integration).
- The readers are `readDepartures()` and `readAdditions()` in `tests/setupServer.ts`, defaulting to
  the guide; the comparison is `collectLedger` (formerly `collectDepartures`) and
  `collectAdditions`; the addition type is `Addition` (formerly `CascadeAddition`); the drift gates
  read `scanLedgerDrift` and `scanShippedDeferrals`; `describeDeparture` and `describeAddition`
  print the row a gate asks you to add.
- An empty value is a value: the cell reads `(empty)` (`EMPTY_CELL`), `—` means no declaration.
- `attributeSelector` answers by layer, then inventory membership, then class prefix, and stops on
  a membership hit under a withheld key; a selector it cannot attribute is outside the ledger, and a
  unit that needs the ladder to change stops and reports (family ruling 5 unchanged).
- The refresh loop is unchanged: `npm run build:src && npm run test:conformance`.

## The reference map (F5c TOKENS-TRUTH)

- Every § Reference map cell in `guides/veneer.md` states a machine-readable value and
  `tests/src/styles/tokens.test.ts` compares every row in each mode. A unit that adds a canonical
  token adds its row there, or adds the name to `UNMAPPED_TOKENS` in `tests/setupStyles.ts` when the
  § Tokens section states it outside the map; the coverage floor reddens until one of the two holds.
- A `Role` table carries `Role`, `Fill`, `Source`, and `Alias`; the reader refuses a `Dark` column
  and a `Fill` cell stating more than one value per mode.

## The capture registry (F7 CAPTURE)

- `tests/setup.ts` declares the grammar as types: `CaptureTheme`, `CaptureVariantName`,
  `CaptureSubject` (the union of declared subject names), `CaptureState`
  (`'active' | 'focus' | 'hover' | 'pressed' | 'rest'`), `CaptureStem`, `CaptureScenario`, and
  `CaptureFilename`. A unit registering a new specimen adds its subject name to the `CaptureSubject`
  union and, for a driven state the union lacks (`disabled`, `checked`), extends `CaptureState`; a
  scenario is `<stem>` or `<stem>-<state>` and the compiler refuses any other spelling.
- The registries are `BUTTON_KEYS`, `CASCADE_KEYS`, and `CAPTURE_KEYS` (the concatenation), all
  `readonly CaptureKey[]`, and `CAPTURE_SCENARIOS` derives from them; `buildStem` reduces a subject
  name to its stem. Append the unit's keys at the end of `CASCADE_KEYS` in barrel order (family
  ruling 10's "registry's end").
- The journey suite `tests/app/browser/integration.test.ts` places frames through
  `FrameManager.place(scenario, subject, frame = subject)` (an element frame) and
  `FrameManager.page(scenario, subject)` (a page frame); a frame is
  `<scenario>--<theme>-<viewport>.png`; each subject also receives one accessibility artifact
  `<subject>--<theme>-<viewport>-accessibility.txt` written by `describeSubject`. The guard reads
  every frame the variant left on disk inside its declared region.
- A unit's report lists the scenarios it registered and the frames and artifacts its
  `CAPTURE=1 npm run test:journey` run wrote.

## The foundation (F6 FOUNDATION)

- `isColorModeState`, `isButtonHost`, and `isAppError` route through `@orkestrel/contract`, which is
  a runtime dependency; reuse `literalOf` and `isInstance` for a new guard.
- `Delegate` acquires disabled, `.disabled`, and `aria-disabled` hosts; the right-to-left twin and its
  plugin are gone; `.caption-bottom` returns a caption to Bootstrap's placement.
- `SHOWCASE_CONTROL` styles the shell's control; `main` carries no document-global id.

## Tailwind (F8, landing in parallel)

F8a lands `tests/setup.css`, whose `@source not inline("…")` line names every shared class name
whose Veneer declaration is normal. None of the B-PASSIVE keys' class names is a Tailwind 4.3
utility name, so no unit extends that line; a later family that ships one does.
