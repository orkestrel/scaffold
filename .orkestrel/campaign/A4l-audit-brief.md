# Audit A4l — the U4e-e fix round (`@orkestrel/mcp` subscription stream)

## Role and lane

One brief, two blind lanes plus the Orchestrator's replay; state which lane you hold in your
first line.

- `reviewer` on Opus 5 (native; Read, Grep, Glob): the SUBJECTIVE lane and the cross-engine
  auditor of a fix a GPT-6 Astra session wrote — shape, naming, placement, voice, and whether
  each A4k finding closed as ruled; read the objective claims too, because the objective engine
  is the writer's engine this round and does not re-argue its own fix.
- `checker` on Sonnet (native; Read, Grep, Glob): the MECHANICAL lane — every carrier closed at
  the `file:line` the report names; the red readings; scope; the searches; the gates.
- The Orchestrator's probe P20 replays the two objective vectors on the host after the unit
  (`P20-a4k-probe.md` holds the red readings at the baseline; `P20-a4l-replay.md` the readings
  after).

Read the evidence under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/` and the
mcp tree at `C:/Users/mikes/WebstormProjects/mcp`. Perform the audit directly and spawn nothing.

## Subject

The `mcp` checkout at commit `7959f08` plus the working tree after U4e … U4e-d and U4e-e. Brief:
`U4e-e-mcp-pump-brief.md`; report: `U4e-e-mcp-pump-report.md`; the findings it carries:
`A4k-audit-analyst.md` (claims 2, 7), `A4k-audit-reviewer.md` (R1–R14, two referrals); the
round record `U4-chain-audit-verdict.md`.

## Review evidence

- `A4l-u4e-e-only.patch` — U4e-e's delta; `A4l-whole.patch` — the whole U4e chain against
  `7959f08`; `A4k-u4e-only.patch` for what U4e itself landed.
- `U4e-e-mcp-gates-orchestrator.log.txt`, `U4e-e-mcp-gates-test-full.log.txt` — the
  Orchestrator's authoritative gates after U4e-e; `collide3-mcp-after-u4e-e.txt`.
- `P20-a4k-probe.md` / `P20-a4l-replay.md` with their logs — the objective vectors red then
  green on the host; the unit's own red/green logs (`U4e-e-core-red.log.txt`,
  `U4e-e-core-green.log.txt`, `U4e-e-destroyed-*.log.txt`, `U4e-e-guard-*.log.txt`,
  `U4e-e-search.log.txt`). The replay also records an observation for this round: releasing a
  subscription rejects the consumer producer's pending writes with an `undefined` reason (the
  server returns the consumer's iterator with no reason). Rule under `outside:` whether a
  release reason is owed, and whether that is this round's or a carry-forward.

## Numbered falsifiable claims

1. **The consumer producer advances only on demand**: the iterator is pulled through the
   stream's `pull`, one item per pull; a parked reader leaves the producer parked after the
   high-water mark; release on abort as before. Pin `advances the consumer producer only on
   demand` red first; P20's backpressure reading now shows fewer than 32 writes resolved.
2. **A producer failure delivers what was queued, then the terminal**: the failure is recorded,
   the stream closes, the outer generator throws after the `for await`, `#contain` builds the
   `-32603` terminal after the queued frames; an abort keeps its path. Pin `delivers queued
   notifications before a producer failure's terminal` red first; P20's ordering reading now
   shows the prompts frame before the terminal.
3. **The registry side coalesces**: at most one unread `list_changed` frame per stream; changes
   while it is unread coalesce; a change after the read produces one more. Pin `coalesces
   registry changes while the last frame is unread` red first; the guide's sentence amended.
4. **A destroyed registry**: `tools.emitter.destroyed` read at the start; nothing registered;
   the acknowledgement delivered; nothing produced; the stream ends on its signal; no throw
   reaches the client. Pin `acknowledges a tools subscription on a destroyed registry and
   produces nothing`.
5. **No nested generator in the pins**: the producers are exported, tested setup helpers; the
   search across `tests/src/core/*.test.ts` finds no `function` or `async function*` expression
   assigned to a property or binding inside a test body.
6. **`MCPConsumerFilter`** is declared (`toolsListChanged` narrowed to `false | undefined`),
   types `MCPSubscriptionOptions.notifications`, is what `isMCPConsumerFilter` narrows `unknown`
   to, is exported through the core barrel, and has its guide Surface row and `PUBLISHED_GUARDS`
   entry; the runtime refusal stays; the guard is pinned.
7. **The refusal's voice and pin** (R10, R11): the message is a sentence about the caller's
   mistake naming why; the pin asserts `isMCPError` beside the code.
8. **Shape** (R8, R9, R12, R13): `#listen` folded; the lifetime rule in the wiring comment; case
   titles unquoted; the relative clause fixed and the paragraph rewrapped.
9. **Prose** (R1, R2, R4, R14, carriers 1–3): each named site reads as the brief's carrier 9
   prescribes; no sentence about the stream's lifetime, demand, failure ordering, or coalescing
   contradicts the code.
10. **Placement and names** (R3, R5, R6): the registry-notifications block sits below the file
    header with its explanatory comment; the `prompts` binding; the refresh proof split with the
    second test driving replacement and removal through the loop.
11. **Nothing else moved**: only the owned files beyond the fourteen U4e … U4e-d files;
    `src/browser/**`, `src/server/**`, the browser and server tests, and `MCPClient.test.ts`
    untouched; the collision probe clean; `git diff --check` clean; every gate step exit 0.
12. **Ship it toward mcp 0.0.31** with U14e and U5c next? Name what must change first if not,
    with the vector.

## Output

The `orkestrel-falsify` verdict shape: one line per claim with the evidence; findings outside the
claims under `outside:` (each tagged required, recommended, or carry-forward; or `outside:
none`); ONE terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. Nothing else.
