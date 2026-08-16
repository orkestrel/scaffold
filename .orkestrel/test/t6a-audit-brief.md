# Unit T6a-audit — falsification round on the shipped capabilities

One brief, two blind lanes. Your dispatch names your lane. Neither lane sees the other's
answer. Perform the assignment directly and spawn nothing. Read-only.

- **REVIEWER lane** — Opus 5, role `reviewer`. Audits with emphasis on the Sol-written
  implementation diff (design fit, vocabulary, guide voice, Limits honesty). You have no
  Bash: the diff is supplied at `.orkestrel/test/t6a-diff.patch` (in the scaffold
  checkout) and the live files are readable at `/home/user/test`.
- **ANALYST lane** — GPT-5.6 Sol, role `analyst`, journaled CLI, read-only sandbox rooted
  at `/home/user/test`. Audits with emphasis on the Opus-written types and guide prose
  (correctness of every behavioral claim). Your sandbox denies socket binds: derive
  loopback-behavior verdicts from source and the committed suite, and say where a claim
  would need a live probe — the Orchestrator supplies executed evidence: core suite
  38/38 and server suite 83/83 green at `9d25047`, guides 11/11 at `dea8445`, run
  outside the sandbox.

## Authority

`/home/user/test/AGENTS.md`, `.claude/rules/quality.md` Falsification (the method),
`.agents/skills/orkestrel-falsify/SKILL.md` in the scaffold checkout (the value set —
CONFIRMED/BROKEN/UNRESOLVED/NOT-EVIDENCED — and the `VERDICT:` terminal line).

## Subject

The T6a change in `/home/user/test`: commits `0e47c0d` (types), `9d25047`
(implementations + suites), `dea8445` (guide). Full diff at
`.orkestrel/test/t6a-diff.patch` (556 insertions, 7 files).

## Claims — attempt to refute each

1. `createTeardown().destroy()` runs handlers newest-first, sequentially awaited, and
   empties the list before the first handler runs.
2. Every handler runs even when earlier ones throw or reject; exactly one failure is
   rethrown by identity; two or more throw an `AggregateError` whose `errors` are in run
   order.
3. A handler added during a run lands in the fresh list and runs only on the next
   `destroy()`; `count` read inside a running handler counts only late registrations.
4. `destroy()` is idempotent and an empty `destroy()` resolves; concurrent or
   back-to-back calls cannot run a handler twice.
5. `createLoopback` binds the caller's unstarted server via `listen(0, '127.0.0.1')`,
   resolves only after `listening`, rejects when the bind emits `error`, and throws its
   named message when the bound address carries no numeric port.
6. `url` is exactly `http://127.0.0.1:<port>` with no trailing slash and `port` is the
   host-assigned number.
7. `LoopbackInterface.destroy()` drops live connections where the server exposes
   `closeAllConnections`, closes, releases the port for a fresh bind, is idempotent (the
   first call's promise is returned to later calls), and resolves rather than throwing
   when the server is already closed.
8. The types in `src/core/types.ts` and `src/server/types.ts` match the implementations
   exactly, carry no `@orkestrel/*` type in any signature, and every TSDoc sentence
   states behavior the code exhibits.
9. `guides/test.md` is in parity: Surface rows and Methods tables match the exported
   surface and call-signature members exactly; the export count sentence is accurate;
   every fence line's comment states what that line actually returns.
10. The repaired Limits table's rows carry the counts and reasons the round measured, the
    population statement is beside the counts, and no row or paragraph lists which
    packages currently carry a superseded copy.

## Scope

Read-only. Off-limits: `tmp/**`, `node_modules/**`, `.git` internals, credentials, and
`.orkestrel/test/matrix.md`'s Step-6-adjacent working notes are context you may read
EXCEPT neither lane reads the other lane's verdict file if present. No edits anywhere.

## Output

The `orkestrel-falsify` verdict shape: numbered per-claim verdicts
(CONFIRMED/BROKEN/UNRESOLVED/NOT-EVIDENCED) each with file:line evidence, findings
outside the claims if any, and exactly one terminal line:
`VERDICT: PASS — …` or `VERDICT: FAIL <claim numbers> — …`.
