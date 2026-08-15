# U7 — the guide catches up with the product

## Role and engine

`implementer`, engine **Opus 5**, native, high effort. Sole serial writer in
`/workspace/supervisor` from clean committed baseline **258d2bf**. Perform directly, spawn
nothing, no commits/pushes/installs.

## Objective

`npm run test:guides` goes from its recorded 8 failures to green — honestly. Never weaken,
suppress, or re-scope a parity test: the drift is in the guide, and the guide moves.

## Authority

`AGENTS.md` (Documentation contract; Writing); `.claude/rules/documentation.md` — read it
completely and follow its parity, method-table, and example laws; `guides/README.md` (the
map); the matching guide `guides/src/supervisor.md`. Sources of truth: each `*/types.ts`,
the barrels, and the rendered surface as committed. The campaign's carrier ledgers name what
each unit added — but the AUTHORITATIVE checklist is the failing parity output itself: run
`npm run test:guides` FIRST, record the exact failing counts and the enumerated missing
names, and work from that list. Record the same command green at the end — that pair is
your failing-first proof.

## The work

1. **Every undocumented export documented** (the ~80-name enumeration in the parity
   output): the History surface set (`ClientHistory`, `ClientHistoryInterface`,
   `HistoryManager`, `HistoryManagerInterface`, `HistoryOptions`, `HistoryState`,
   `HistoryFilter`, `HistoryRefusalHandler`, `isHistoryRun`, `isHistoryPage`,
   `parseHistoryQuery`, `matchesRunName`, `seedHistory`, the `APP_HISTORY_*` constants), the
   roster set, `SUPERVISOR_TABLES`/`SUPERVISOR_INDEXES`, `ApplicationTail`'s current home,
   and everything else the output names. Each lands in the correct table with the file's
   established row voice, and each API-surface function gets its example fence per the
   documentation rules.
2. **Phantom rows corrected**: `ClientInterface`/`Client` method tables gain `history` and
   `roster`; `SupervisorStoreInterface.list` documented; the `destroy`/`roster` phantom rows
   resolved the way the parity test defines them.
3. **The behavioral prose the closures owe**, in the guide's voice:
   - the History destination: five states, the departure-based "History changed" affordance
     (a run leaving the live roster latches it until a successful first-page read), the
     retention sentence, the terminal-run statement;
   - the filter: two fields combined with AND; name is a case-insensitive contiguous
     substring matched on the server over the traversal, one page per press (a page may
     return zero rows with a cursor); id prefix is case-sensitive at the store; the three
     empty sentences' meaning; simple case folding's non-ASCII limit stated plainly;
   - the tail: `ClientInterface.tail` returns `ApplicationTail` (frames plus the persisted
     terminal fact); `OperatorInterface.terminal`'s meaning;
   - `HistoryManager`'s `older()` never re-baselines the changed fact;
   - `seedHistory`/showcase: the seeded names carry mid-id words the prefix cannot reach, so
     the frozen scenario demonstrates the name half.
4. **Existing prose re-read last against what shipped** (the documentation rule): any
   sentence the H5-H7 changes made false is corrected in the same pass — including the
   component inventory (`HistoryView` added, `OpenPanel`'s description current).

## Scope

**Owned:** `guides/**`, `guides/README.md` indexes if the map moves. **Off-limits:**
everything else — `src/**`, `app/**`, `tests/**` (the parity suite is the gate, not a
subject; if a parity test is WRONG rather than the guide, deviation-stop with the evidence).

## Environment facts

Native, listener-capable. `npm run test:guides` is the gate; `npm run format:check` and
`lint:check` cover the markdown where configured. The flagship-fence execution test runs
your examples — they must actually run.

## Acceptance criteria

1. `npm run test:guides` recorded red (the exact 8-failure output) then green (304/304),
   same command.
2. `format:check` and `lint:check` green; no other project's files touched
   (`git status --porcelain` shows only `guides/**`).
3. The four work items each visible in the diff; no parity test edited.

## Output

Touched files + diffstat; the red→green pair verbatim; the per-item closure; `git status
--porcelain`; deviations or none. No diary.
