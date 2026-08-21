# Evidence surface — reconciliation, 2026-08-21

Lanes: planner (Opus, subjective) and analyst (Sol, objective, with executed probes), blind
to each other. Orchestrator probe `design-evidence-probe.md` settled the lifetime question
both rested on.

## Convergent, adopted as ruled

- **Shape.** A getter `evidence` on the transport. Both lanes rejected an event (lossy for a
  consumer subscribing after the exit, and it widens a shared event map every non-stdio
  transport implements), a `start()`/`close()` result (changes the shared `Promise<void>`
  contract and misses the child that dies on its own), and attaching the tail to a rejection.
- **Type.** `string | undefined`, a required property whose VALUE may be absent.
- **Placement.** `StdioClientTransportInterface extends MCPClientTransportInterface` in
  `src/server/types.ts`; the class implements it; `createStdioClientTransport` returns it.
  The shared interface stays honest — HTTP, WebSocket, MessagePort, and the server transports
  supervise nothing, and a member they answer `undefined` to forever is a stdio detail rather
  than a contract. A class-only member is unreachable through the factory every guide example
  uses, and conflicts with types-first.
- **No configurable bound.** No named consumer needs one; the creation gate holds.
- **`factories.ts` carries a false claim** — its TSDoc still says the child's `stderr`
  "inherits the parent's for diagnostics", which is what the guide correction already
  reversed. Fix it in this change.
- **Real-child proofs only.** No mock, fake, module replacement, spy, or fake clock.

## Split, ruled

**Absence for a silent child — the subjective lane's table.** `undefined` when no child has
run; `''` when a child ran and wrote nothing; the tail otherwise. The objective lane rejected
`''` as an invented sentinel, but its own table then answers `undefined` for BOTH "no child"
and "silent child" — which is the very collapse it accused `''` of causing, and its stated
reasoning is inverted. The Orchestrator's probe settles it on evidence: `Process.evidence`
natively answers `''` for a child that ran silently, so passing it through is both the
distinction-preserving reading and the least translation.

**Live-while-connected, snapshot-at-end, cleared by `start()` — the subjective lane's
lifetime.** The objective lane's terminal-only reading means that while a replacement child
is running, `evidence` reports the PREVIOUS child's stderr, with nothing marking it stale.
A confidently wrong diagnostic is worse than an absent one — the principle this campaign has
applied to a vacuous assertion and a false guide sentence alike. The subjective design never
shows a stale tail: live tail while a child is held, retained tail after it ends, cleared when
the next `start()` opens a lifetime. A consumer who wants the tail across a restart reads it
in the `close` listener, which fires before any respawn, and the guide says so.

**The bound — both, resolved.** State the property (raw bytes, the END of the stream kept,
so a long child's early output is dropped and its last error survives) AND name the
authoritative constant `PROCESS_EVIDENCE`. A limit is a value a reader needs, so its measured
figure may be cited with the version that carries it rather than copied bare.

## The objective lane's measured finding, adopted

`Process.evidence` can still GROW after `destroy()` resolves when a detached descendant holds
the inherited stderr: it read `"parent-subject\n"` at the barrier and
`"parent-subject\nlate-subject\n"` afterwards. That makes the snapshot mandatory rather than
merely convenient — a post-close read must come from the stored value, never from a retained
supervisor. The Orchestrator's probe independently confirms the tail survives `destroy()` and
the child's own exit, so the capture cannot lose bytes wherever it sits. Both facts stand
together: capture at the barrier, and never re-read the supervisor afterwards.

Its post-close-stability and multibyte byte-bound cases are adopted into the proof list.

## Units

| Unit | Engine | Owns |
| --- | --- | --- |
| E1 contract and implementation | Opus `implementer` | `src/server/types.ts`, `src/server/transports/StdioClientTransport.ts`, `src/server/factories.ts` (return type and the false TSDoc) |
| E2 proofs | Sol `implementer` | `tests/src/server/transports/StdioClientTransport.test.ts`, `tests/guides.test.ts` |
| E3 guide | Opus `implementer` | `guides/mcp.md` |
| E4 audit | cross-engine, per authorship | read-only |
| E5 gates | `verifier` | the full chain |

Serial in the checkout. Exit criterion: `evidence` answers correctly at every moment the
lifetime rule names, the trap case is bound by a test that ran red against the naive lazy
read, the guide's stdio section carries no false sentence about the child's `stderr`, and the
gates are green.
