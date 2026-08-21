# Design brief: exposing the supervised child's stderr on the stdio client transport

## The gap

`@orkestrel/mcp`'s `StdioClientTransport` supervises a child through
`@orkestrel/process`'s `Process`. That supervisor retains the child's stderr as a decoded,
byte-bounded tail and publishes it as the public getter `Process.evidence: string`. The
transport holds its supervisor in `#process` and exposes no reader, so a consumer whose
child dies at startup — the commonest MCP stdio failure — receives no diagnostic at all.
`guides/mcp.md` § stdio transport states the limit as of 0.0.21. The user has ruled it must
be closed now rather than deferred.

## The measured trap

Read `src/server/transports/StdioClientTransport.ts` before proposing anything. Both
teardown paths discard the supervisor:

- `close()` sets `this.#process = undefined` before awaiting `child.destroy()`.
- `#onExit(child)` sets `this.#process = undefined` when the child exits on its own.

So `get evidence() { return this.#process?.evidence ?? '' }` answers empty in exactly the
case the capability exists for. Any design must say when the tail is captured and how long
it survives.

## Rule on these

1. **Shape.** A getter on `StdioClientTransport`, an event carrying the tail, a member on a
   returned result, or something else. Name it under `.claude/rules/names.md`: entity
   members are one word, and `Process` already calls this concept `evidence` (one concept,
   one term).
2. **Type and absence.** `string`, or `string | undefined`. `AGENTS.md` says absence is
   `undefined` and forbids invented sentinels. Rule what a caller reads before `start()`,
   after a child that wrote nothing, and after a child that died writing.
3. **Lifetime.** When is the tail captured, and what survives a `close()`, an `#onExit`, and
   a `start()` that spawns a replacement. A consumer who has not read it yet must not lose
   it to a restart without a stated rule.
4. **Interface placement.** `MCPClientTransportInterface` is implemented by transports with
   no child process (HTTP, WebSocket). Rule whether this member belongs on the shared
   interface, on the concrete class alone, or on a narrower interface — and what that does
   to a consumer holding the interface type, and to the guide's `## Methods` / Surface
   tables.
5. **Bound and truth.** `Process` bounds the tail by bytes. Rule whether the transport
   states that bound to its own consumer, and whether anything must be said about a tail
   arriving after `close()` resolves.
6. **Proof.** Name the tests that would bind this, driven with real implementations — a real
   spawned child that writes to stderr and exits non-zero is the central case. No mocks,
   fakes, module replacement, or fake clocks; `.claude/rules/tests.md` governs.

## Constraints

- Types first: the contract lands in the matching `*/types.ts` before implementation.
- Minimal public API: add the capability with its real consumer, and no speculative surface.
- Guide parity gates every public export; `guides/mcp.md` § stdio transport currently states
  the limit and must end up true either way.
- The package is prepared at 0.0.21 and unpublished, so this rides that bump.

## Output

A ruled design: one recommendation per question with the losing options named and why, the
file-level change list, and the test list with each case's negative control. No process
diary.
