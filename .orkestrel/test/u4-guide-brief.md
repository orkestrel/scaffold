# Unit U4 — guide parity for the two shipped capabilities and the Limits repairs

Role: `implementer`. Engine: Opus 5, native, sole serial writer in `/home/user/test` from
committed baseline `9d25047` (clean tree; types at `0e47c0d`, implementations and suites
at `9d25047` — read them; they are the shipped truth your prose must match). Perform the
assignment directly and spawn nothing. Commit nothing.

## Authority

`/home/user/test/AGENTS.md`, `.claude/rules/documentation.md` (parity: Surface rows,
one Methods table per interface keyed by backticked name, call-signature members exactly;
fences import the published specifier, never `@src/*`), `.claude/rules/tests.md` for what
`tests/guides.test.ts` enforces. Read `guides/test.md` completely before editing.

## Objective

Bring `guides/test.md` to parity with the shipped surface and repair its Limits table
against this campaign's measured counts. `npm run test:guides` green is the acceptance
gate.

## The edits

1. **Opening framing.** Recast the guide's opening so the surface reads as two families:
   what a test records (recorder, capture, collect, round-trip, require, delay) and what
   a test owns and must give back (scratch, teardown, loopback, inventory, root). Keep
   the `## Surface` tables keyed exactly as the parity suite compares them.
2. **Surface rows.** Core gains `TeardownHandler`, `TeardownInterface`, `createTeardown`;
   server gains `LoopbackInterface`, `createLoopback`. Match the existing rows' style.
3. **Methods tables.** One table per new interface: `TeardownInterface` (`add`,
   `destroy`), `LoopbackInterface` (`destroy`). Readonly data properties (`count`,
   `url`, `port`) stay in the Surface row per the documentation rule.
4. **Contract rules.** Append two numbered rules in the `## Contract` section's voice:
   - Teardown: handlers run newest-first, sequentially awaited; every handler runs even
     when an earlier one fails; exactly one failure rethrows by identity and several
     throw an `AggregateError` in run order; a handler added during a run is kept for
     the next one; `destroy` is idempotent; the list never registers a Vitest hook
     itself — the consumer writes `afterEach(() => teardown.destroy())` once, and that
     line is the price of the zero-dependency contract.
   - Loopback: the caller supplies its own unstarted server and keeps every protocol
     handler; the bind is always `127.0.0.1` on an ephemeral port, never `::1`, never a
     fixed port; `destroy` drops live connections before closing so a keep-alive client
     cannot hang it, and is idempotent; the package never reserves-and-releases a port
     number.
5. **Fences.** One executable example per capability, importing `@orkestrel/test` /
   `@orkestrel/test/server` — written so the flagship-fence runner proves them: the
   teardown fence shows ordering and the consumer-owned hook line; the loopback fence
   binds a real `node:http` server, fetches from `url`, and destroys. Every comment
   states what the line actually returns.
6. **Limits repairs**, keeping every row's three-part shape and never listing which
   packages still carry a superseded copy:
   - The ephemeral-port fixture-server row LEAVES the table (it shipped); its
     `isAddressInfo` prescription goes with it.
   - Deferred gate row: count updated to eight declarations; reason: native
     `Promise.withResolvers` supersedes it.
   - NEW row, reserve-then-release port: 2 members, Fails; the alternative is the child
     binding `0` and reporting its port back, and a bind-close-rebind window is a race
     the package will not bless.
   - NEW row, bounded retry (`retryUntil`): 2 members, Fails on count; note it is not
     timer polling, so a third independent member reopens it on the count alone.
   - Condition polling (wall-clock predicate loops): in the table at 3 members, Clears,
     excluded because published polling contradicts the no-polling architecture law.
   - NEW rows, `waitForAbort` and signal instrumentation: 2 members each, Fails.
   - Hostile-input builders: Rule column moves to Clears at 6 members; deciding reason:
     the populations differ per suite, so one export needs a mode argument selecting a
     construction, which the naming rules refuse; each suite curates its own corpus.
   - `invokeRaw`: count 3; reason: native `Reflect.apply` at a deliberately untyped
     boundary plus a domain guard; a generic return would claim without proof.
   - Manual clock row: unchanged (its struck precedent stands).
   - State the measured population beside the counts: 42 of the fleet's ~44 trees read
     this round; the two private repositories unread.

## Scope

Owned: `guides/test.md`. Off-limits: everything else — source, tests, README. No
installs, no commits.

## Deviation contract

A parity failure you cannot close from the guide alone (a suite expectation that names a
row shape the rules contradict) stops the unit with the exact failing output. Section
ordering, row wording, and fence content are yours within the prescriptions.

## Validation

`npm run test:guides` — green, output in your report. If a fence executes the loopback
example, the run binds a loopback port; that is expected to work in this environment.

## Output

The exact diff of `guides/test.md`, the test:guides output, deviations or "none".
