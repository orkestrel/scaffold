# J-SAMEWAY-ENGINES-A — audit claims (2026-09-25)

**Subject.** Veneer commits on `unit/engines-a` over `8bc940d`:
- `9019d81`, the unit;
- `7511b82`, the Orchestrator's integration of the unit's report-only `types.ts` and guide patches.

A read-only snapshot of `src`, `tests`, and `guides` at `7511b82` sits in `C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/snapshot-engines-a-7511b82/`. Beside it are the diff `j-sameway-engines-a.diff`, its status `j-sameway-engines-a-status.txt`, the writer's report `j-sameway-engines-a-report.md`, and the Orchestrator's logs `j-sameway-engines-a-red-orchestrator.log.txt` and `j-sameway-engines-a-mutations-orchestrator.log.txt`. A shell reads `git -C C:/Users/mikes/WebstormProjects/veneer show 7511b82:<path>`. Never read the worktree.

**What this unit answers.** The brief `units/j-sameway-engines-a-brief.md` (A1 to A4), under `decisions.md` § E13, § E22, and § E24, each with every amendment. It also answers the carried row that names `Collapse`, `Toast`, `Dropdown`, and `Tooltip`; this unit carries `Collapse` and `Toast`, with `Tab` and `Carousel` added.

## Claims

1. **A1: agreement completes.** In `Collapse`, `Toast`, `Tab`, and `Carousel`, suppose a host moves the change's token (`shown`, or the incoming item's or the control's `active`) toward the change's end at any point before the call's token write: inside the pre-change dispatch, or in a reaction to any earlier write. Then the call skips its own token write, completes every other write in its order, dispatches its completed event, and resolves `true`. Before the call finds the token at its end, no door reads that token.
2. **A2: a takeover returns the change's writes.** After the call finds the token at its end, a host that moves the token back takes the change over. The call resolves `false` and dispatches nothing more. Its returning step returns each write the change made, by its own entry, and only those writes. The step reads the call's identity and the engine's lifetime before each write, and no door.
3. **A3: Toast's stuck `showing` is gone.** A Toast hide whose `shown` token a reaction removes at the transition door completes, removes the `transition` token, and dispatches `hidden`. A later `show()` and `hide()` are accepted.
4. **A4: the enumeration is complete.** The report's A4 table names every write each engine's `show`, `hide`, or `slide` makes. Each write has an entry and a return, or a stated rule: E13 acquisition, E22 amendment 3 release, the host's move, or a named reason. A phase read that stops a change, meaning a token other than the change's own, ends the change and returns nothing, as the report's ruling 1 states.
5. **The writer's rulings hold under E24.**
   - Returns are state-based, recorded only when a write changed presence, and `aria-current` returns to its prior value.
   - Toast's identity is compared across its dispatch.
   - `#change` no longer resets to `undefined`, so a nested call that completed inside the dispatch is seen.
   - The Toast and Carousel timers, the Tab blur, and a dispatched `hidden.vn.tab` are not returned.
6. **The proofs bind.**
   - The unit's cases read red on `8bc940d`'s four sources where the report says, each through an assertion (`units/j-sameway-engines-a-red-orchestrator.log.txt`).
   - The A1 doors the report says cannot read red produce the same class value on base and fix.
   - Every killed mutation row is an assertion, `BOOM` and `UNBOUND` are refused, and the control holds (`units/j-sameway-engines-a-mutations-orchestrator.log.txt`).
   - For each proof claim you confirm, name the mutation that makes the proof fail, and say whether its assertions distinguish it from the passing case.
7. **The integrated sentences are true.** The `@returns` sentences and the guide's door paragraphs in `7511b82` hold for the code in `9019d81`.
8. **Greenfield and scope.**
   - `9019d81` changes the eight paths the report names, and `7511b82` changes `types.ts` and the guide alone.
   - `#writeTriggers` and `#select` are gone with no caller left.
   - No field, helper, or compatibility path is left without a use.

Rule each claim CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence at `7511b82`. Then report any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
