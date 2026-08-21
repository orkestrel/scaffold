# A1 — falsification round over the `@orkestrel/test` 0.0.9 surface

## Subject

The whole chain on branch `claude/test-helpers-consolidation-35cprs` of `/home/user/test`, from the
committed baseline `cfbcec2` (v0.0.8) to the tip `ae1b7aa`:

| Commit | Unit | Claimed to close |
| --- | --- | --- |
| `5bca025` | checkpoint | lockfile normalization only |
| `f2dbbd9` | U1 (Sol) | core adopted surface; retryUntil count-pin repair |
| `d7d9f76` | U2 (Opus) | browser adopted surface; mutation-proven assertions |
| `b142250` | F1 (Orchestrator) | createRecorders proof typing via explicit arguments |
| `c738b04` | U3 (Opus, after bench reroute) | server surface; root-container skip repair |
| `ad8dea0` | F2 (Orchestrator) | core host-independent type derivations |
| `ae1b7aa` | U4 (Opus) | guide parity for the enlarged surface |

## What the round decides

This decides whether `@orkestrel/test` is bumped to 0.0.9, packed, adopted across the Orkestrel
fleet, and published. A finding here is worth more than a clean pass: the alternative is a consumer
meeting it after the version is spent.

## Which halves your engine wrote

The dispatch names your lane. Opus wrote U2, U3, and U4; the Orchestrator (an Opus-family engine)
wrote F1 and F2; Sol wrote U1. Attack the halves your own engine wrote harder — a clean pass on
your own engine's work is the least valuable result you can return.

## Already established — verified by the Orchestrator directly, do not re-run

- All scoped and root gates exit 0 at the tip: core, browser, server, and root tsc projects; lint;
  format; the core (83), browser (192), and server (133 passed, 6 skipped) suites. The guides gate exits 0 with every file passing.
- The two baseline defects were red before their repairs on the recorded commands and green or
  skipped-with-cited-probe after; the uid-0 versus uid-65534 discrimination of the permission-hold
  probe was executed and recorded.
- The mapped-record construction compiles assertion-free (probe with planted control), the F2
  replacement spellings compile under the failing project's exact flags (probe with control failing
  on the old name), and the router URL equivalence refuted the subjective lane's earlier claim.
- U2's and U3's discrimination plants reddened the named tests and the files were restored to
  verified digests; the executed transcripts are in the unit reports under
  `/home/user/scaffold/.orkestrel/campaign/units/`.

## Review evidence

Read the tree at the tip and the actual diff: `git -C /home/user/test diff cfbcec2 -- src tests guides`
and `git -C /home/user/test status --porcelain` (clean). Unit briefs and reports:
`/home/user/scaffold/.orkestrel/campaign/units/`. The reconciled plan:
`/home/user/scaffold/.orkestrel/campaign/plan.md`. The rules live in `/home/user/test/.claude/rules/`.

## Execution limits for your lane

You may read everything. If your lane cannot execute (sandboxed exec, no loopback, no writes), rule
from source plus the supplied executed evidence, and mark any claim that needs a run you cannot
take as UNRESOLVED naming the exact settling command — never guess a runtime answer. If your lane
can execute probes, put runtime probes only under `tmp/probe/` of `/home/user/test`, run them by
explicit path with `npx vitest run --config vite.config.ts --project probe`, and delete them before
returning. Never run tree-wide gates; never edit source; spawn nothing.

## Numbered claims — attempt refutation of each

CONFIRMED requires naming the attack you tried that failed. A claim you cannot decide is
UNRESOLVED, not CONFIRMED — say what would settle it. Do not hedge toward an imagined consensus.

Core (U1, F1, F2):

1. `createRecorders` wires every listed event exactly once per occurrence on the source, and the
   returned map's per-key recorders carry exact per-event tuple types with no assertion, no `any`
   leak, and no unsound key at any call-site shape — including duplicate names, a single event,
   and a source whose map has optional or union-typed tuples.
2. `createSignal.count` cannot desynchronize under any interleaving of add, remove, a fired
   `{ once: true }` listener, removal of the original callback after wrapping, capture-mode
   variants of the same callback, and `abort()` itself.
3. The widened `createHostileValues` set keeps the documented loop contract: every member makes a
   naive reader throw or violates a naive assumption, no member is a duplicate failure class, and
   no existing consumer loop in this repository breaks.
4. `invokeUnchecked` and `readProperty` throw `TypeError` — and no other class — for every
   non-callable and every primitive respectively, including every member of
   `createHostileValues()`; the contained-boundary contract in their TSDoc is true as stated.
5. `flattenHeaders` accepts the record, entries, and `Headers` forms; returns a frozen record; and
   `HeadersSource` resolves identically under the core, server, browser, and root projects.
6. The widened `retryUntil` exhaustion message renders a cyclic value and a value whose conversion
   throws, without itself throwing, and truncates as documented.
7. `waitForAbort` resolves without a timer on an already-aborted signal and leaves no listener
   behind on either path.
8. F1's lesson is true: a source typed as an `EmitterInterface`-shaped generic interface reference
   infers `createRecorders` type arguments cleanly, and a concrete class not generic over its map
   requires explicit arguments — prove or refute by compile behavior, not prose.

Browser (U2):

9. `mount` survives the wrapper test on its stated contract — the connected-layout invariant — or
   it does not; rule, and name what breaks if it is deleted in favor of bare `append`.
10. The `style` trim is either engine-independent normalization worth keeping or an unfalsifiable
    claim on this engine; rule, and check the guide claims nothing about the padded form.
11. `readRules` breadth-first order is documented, pins `findRule` first-match semantics, and a
    stylesheet whose `cssRules` getter throws is skipped without losing later sheets or nested
    grouping rules.
12. `pixels` returning `0` for an unparsable value is either a lawful measured-contribution
    contract as documented or a sentinel the absence law forbids; rule against the law's text.
13. `rgba` always removes its probe element, including on parse failure, and the undeclared
    `var()` limit is documented where a reader meets it.
14. The `render` overloads cannot misresolve: a one-argument call is always the markup form, the
    tag form requires the class argument, and no call site in this repository or its guide breaks.
15. `removeDatabase` rejects on `blocked` with the documented message rather than absorbing it,
    and resolves only on genuine deletion.
16. `typeInput` and `commitInput` dispatch exactly the documented events, in order, bubbling.

Server (U3):

17. `requestUpgrade` settles exactly once under every interleaving of `upgrade`, `response`, and
    `error`, destroys the client socket before every settlement including rejection, and holds no
    pooled connection after resolution.
18. `UpgradeResult.claimed` being derivable from `status` is either a documented deliberate shape
    or a Derive-state violation; rule, and name the correct shape if it violates.
19. Every `supports*` probe performs no import-time IO, leaves the temporary tree empty on every
    path, propagates an allocation failure, and reports an ordinary refusal as `false`.
20. The repaired `destroyScratch` skip is keyed only to the runtime probe's answer, the probe
    discriminates (the recorded uid evidence), and no other test in the suite is keyed to a
    platform or user name.

Guide (U4) and the whole:

21. Every executable fence in `guides/test.md` asserts values the guides project actually returns,
    and no false universal was replaced by an unfalsifiable one.
22. Every new export has its Surface row, every new thrown message its Voices row, the
    `createLoopback` upgraded-socket limit is stated, and the parity gate is green because the
    guide is true, not because the gate is weak — name one drift the gate would miss if you find
    the gate weak.
23. No refusal was widened into a regression across the chain: every behavior change against
    v0.0.8 is one of the documented set — the style trim, the retryUntil message, the
    createHostileValues membership, the readCascade throw-skip — and nothing else moved. Enumerate
    anything else that moved.
24. The writers' own sound-and-unchanged rulings hold. Pick the ones likeliest wrong from the
    Decisions tables in the unit reports and attack them; say which you picked.
25. The package is coherent as a whole at 0.0.9: one vocabulary, no seam between the three entries,
    nothing you would refuse to ship. Rule as if the publish were yours to stop.

## Unknowns

- Whether any consumer of the guide's existing fences relies on the exact pre-trim `style` text —
  the Orchestrator found no such fence; report one if you do.
- Whether `createDragEvent`'s no-`DataTransfer` branch is reachable on any supported host — the
  writer could not reach it in Chromium; treat as UNRESOLVED unless you can settle it.

## Output

The verdict shape of the `orkestrel-falsify` skill, exactly: numbered verdicts in claim order with
evidence, findings outside the claims substantiated to the BROKEN standard, and the single terminal
line.
