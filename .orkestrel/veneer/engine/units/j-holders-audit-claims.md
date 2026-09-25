# J-HOLDERS — audit claims (2026-09-25)

**Subject.** Veneer commit `ef320ca` on `unit/holders`, over `4cd56a8`. A read-only snapshot of `src`, `tests`, and `guides` at `ef320ca` sits in `C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/snapshot-holders-ef320ca/`. Beside it are the diff `j-holders.diff`, its status `j-holders-status.txt`, the writer's report `j-holders-report.md`, and the Orchestrator's logs `j-holders-red-orchestrator.log.txt` and `j-holders-mutations-orchestrator.log.txt`. A shell reads `git -C C:/Users/mikes/WebstormProjects/veneer show ef320ca:<path>`. Never read the worktree.

**What this unit answers.** The brief `units/j-holders-brief.md` and its decision `units/j-holders-decision-1.md`, under `decisions.md` § E13, § E22, § E25, and § E30, and three carried rows in `plan.md` § Carried findings: the hand-rolled holder rules, the inline shapes, and the proof gaps.

## Claims

1. **H1: Modal's open token uses the shared record.**
   - Each modal's show saves the body's `open` token through its own snapshot, and its hide or destruction restores that snapshot.
   - The body ends carrying the class value the first show found once the last holding modal hides, in any order of hides.
   - No static holder map, no `#holdOpen`, and no `#releaseOpen` remain, and nothing wraps their removal.
   - The writes differ from `4cd56a8` only where the report says: a show adds the token back to a body that lost it while a modal held it.
2. **H2: Isolation's write-back uses the shared record, and its claim order stays.**
   - Every claim saves the element's `inert` attribute through the isolation's own snapshot.
   - The claims list alone decides the newest claim and each hand-off.
   - The last release writes back the value the first claim found, in any order of destruction.
   - The reordered writes within one destruction (every hand-off, then one restoration) leave every element in the state `4cd56a8` left it in.
3. **H3: ScrollLock's holder group stays, for the stated reason.** Only the first lock's measurement is valid, because a measurement after the overflow write reads the width the hidden scrollbar leaves. Routing each lock through the record would measure and write once per lock.
4. **H4: the record's shapes are declared once.**
   - `HostSnapshotEntry`, `HostSnapshotRecord`, `HostSnapshotHolding`, and `HostSnapshotPresence` are each declared once in `types.ts`.
   - `HostSnapshot` uses them, and no inline copy remains.
   - Each has a § Surface row, so the parity gate holds.
5. **H5: the two missing proofs.**
   - The ScrollLock case fails when a body-less refusal keeps its abort listener.
   - The ColorMode case fails when the catch path restores only an absent reading, and when it rethrows a different error object.
6. **The proofs bind.**
   - The new and retitled cases read red on `4cd56a8`'s sources where the report says they do (`units/j-holders-red-orchestrator.log.txt`).
   - Every killed mutation row fails through an assertion, `BOOM` is refused, and the control holds (`units/j-holders-mutations-orchestrator.log.txt`).
   - For each proof claim you confirm, name the mutation that makes the proof fail, and say whether its assertions distinguish that mutation from the passing case.
7. **Greenfield and scope.** The changed paths are the nine the report names. No field, import, or helper is left without a use. No compatibility path remains.

Rule each claim CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence at `ef320ca`. Then report any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
