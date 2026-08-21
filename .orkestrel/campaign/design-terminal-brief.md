# Design brief: a terminal contract for @orkestrel/process

## Why

Three consecutive audit rounds fixed teardown defects in `@orkestrel/mcp`'s
`StdioClientTransport`. A three-lane upstream investigation then proved the transport was a
symptom. Read
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/upstream-teardown-finding.md`
IN FULL before ruling — every claim there is a measured reading, not an argument.

The measured core: `destroy()` resolves on the child's NATIVE EXIT while stderr is still
arriving, and it destroys the emitter (the push channel) while `evidence` and `lines` (the
pull channels) stay live and growing. A consumer watching the emitter sees a quiet child
while a consumer reading `evidence` sees a moving target. Every downstream defect traced to
policing two channels that disagree.

Also measured, and it bounds everything: `close` is a sound finality point and `exit` is
not, but `close` has no bounded latency — a descendant holding the inherited pipe defers it
for its whole life (3093ms and 6032ms observed), `taskkill /F /T` cannot reach that holder
once the root has exited, and Node offers no count of remaining pipe writers. **A total
"diagnostics are final" guarantee is impossible. A precise partial one is not.**

## Rule on these

1. **What `destroy()` promises.** Today it resolves on native exit and leaves the pull
   channels live. `ProcessOptions` states "There is no completion deadline", so an unbounded
   barrier was a deliberate refusal. Rule what `destroy()` should now resolve on, whether it
   gains a bound, and — if it does — what that option is called, what its default is, and
   what happens when it elapses. Reversing a stated refusal needs its reason on the record.
2. **The drained-versus-truncated discriminant.** A consumer must be able to tell "these are
   all the diagnostics" from "the wait elapsed and there may be more". Rule where that fact
   lives: a member on `Process`, a field on the terminal result, something else. Name it
   under `.claude/rules/names.md` — entity members are one word.
3. **Freezing the tail.** `evidence` must stop being a live getter that any consumer has to
   snapshot at exactly the right instant. Rule when it freezes, what it answers before and
   after, and whether the frozen value is reachable after `destroy()` in every path.
4. **Ending `lines` at teardown.** The iterator stays open past `destroy()` today. Rule
   whether it ends, throws, or is left alone, and what an in-flight consumer observes.
5. **The terminal and in-flight facts.** `#closed` and `#terminating` already exist as
   private fields at `Process.ts`. Rule whether each becomes a public getter derived from
   the existing field — no second flag, no drift — and name them.
6. **Windows kill ordering.** Measured: killing the tree while the direct child is STILL
   ALIVE reaps even a `detached: true` descendant and collapses close lag from seconds to
   1ms; `stopChild` currently returns early when the root has already exited, so the orphan
   is never reached. Rule whether the ordering changes and what it costs.
7. **Blast radius and compatibility.** Every rule above changes a published contract of a
   package four repos depend on. Rule what breaks, what each consumer must do, and which
   changes are additive. `ProcessManager` awaits each child's non-final `destroy()` and then
   discards the reference — rule whether it needs the same treatment.
8. **Proof.** Name the tests, each with the negative control that makes it evidence. Real
   spawned children only; the descendant-holding-the-pipe case is the central one.

## Constraints

- Types first: contracts land in `*/types.ts` before implementation.
- One concept, one term. Absence is `undefined`; no invented sentinels.
- Derive state: a public getter over an existing private field, never a second flag.
- The package is published at 0.0.5. This is a 0.0.6, and mcp will take it by tarball before
  either publishes, so a breaking shape is affordable IF it is ruled and worth it — say so
  plainly rather than contorting to stay additive.
- Do not design for consumers nobody has: `CLIProvider` holds nothing across calls and
  probe's `LintStage` does not use the package at all.

## Output

A ruled design: one recommendation per question with the losing options named and why, the
file-level change list, the test list with controls, and an explicit statement of what each
downstream consumer must change. No process diary.
