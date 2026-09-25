# J-SAMEWAY-ENGINES-A rounds 2 and 3 — audit claims (2026-09-25)

**Subject.** Veneer commits on `unit/engines-a` over the merge `2760f7e`, which carries round 1's `9019d81` and integration `7511b82` over Veneer `main` `0865c67`:
- `5805a28`, round 2's prior-value returns;
- `61640e0`, round 3's shared leaves;
- `5e3ae52`, the Orchestrator's integration of round 3's two returned patches: `HostSnapshot.save` reads through `readHostValue`, and the guide's return sentences;
- `dc2a1a7`, the Orchestrator's integration of the four leaves into the barrel export list `tests/src/browser/index.test.ts` pins, which the round-3 brief omitted and the replay found red.

A read-only snapshot of `src`, `tests`, and `guides` at `dc2a1a7` sits in `C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/snapshot-engines-a3-dc2a1a7/`. Inside that directory are:
- `j-sameway-engines-a-3.diff`, the diff from `2760f7e`;
- `j-sameway-engines-a-3-status.txt`;
- `j-sameway-engines-a-report-2.md` and `j-sameway-engines-a-report-3.md`, the writer's reports;
- `j-sameway-engines-a-red-3-orchestrator.log.txt` and `j-sameway-engines-a-mutations-3-orchestrator.log.txt`, the Orchestrator's logs.

A shell reads `git -C C:/Users/mikes/WebstormProjects/veneer show dc2a1a7:<path>`. Never read the worktree.

**What these rounds answer.**
- The round-1 verdict, `units/j-sameway-engines-a-audit-verdict.md`, on claims 2, 4, 5, and 7.
- The briefs `units/j-sameway-engines-a-brief-2.md` (R1) and `units/j-sameway-engines-a-brief-3.md` (L1 to L3).
- E24's amendment of 2026-09-25 in `decisions.md`, the prior-value return.

## Claims

1. **R1: the prior-value return holds in all four engines.** In `Collapse`, `Toast`, `Tab`, and `Carousel`, a taken-over change restores each target it changed to the value that target held before the change's first write to it.
   - A write that changes nothing records nothing.
   - A target is recorded once.
   - A token or attribute the change removed without having added it, including a completion's removal of a pre-existing order or direction token, comes back.
   - The restore runs in reverse order of those first writes, and skips a target already at its recorded value.
   - The engine's own token is never recorded.

   Your round-1 witnesses close: the closed dropdown stays closed, the shared dropdown stays open, and the pre-existing order token comes back.
2. **Each return reads the call.** Each engine's `#rewind` passes its identity and lifetime read to `rewindHostChanges`. That leaf stops at the first `owns()` that returns `false`, and writes nothing after it.
3. **L1: one shared leaf.** `readHostValue`, `writeHostValue`, `recordHostChange`, and `rewindHostChanges` in `src/browser/helpers.ts` are the only implementation of the record, read, and rewind. No engine keeps a private copy, and each engine's `#rewind` adds only the identity boundary. `recordHostChange` never mutates the list it is given.
4. **L2: absence is `undefined`.** `readHostValue` reads a target as `HostSnapshot.save` did: an absent attribute, token, or property reads `undefined`, and a present empty attribute reads `''`. `HostSnapshot.save` now reads through `readHostValue` and still reads the property priority beside it, with its behaviour unchanged. Check that every case in `tests/src/browser/HostSnapshot.test.ts` still binds.
5. **L3: `HostChange` and the § Surface rows.** `HostChange` is declared once in `src/browser/types.ts`. Each new export has a § Surface row whose summary equals its TSDoc.
6. **The proofs bind.**
   - The rounds' engine cases read red on `2760f7e`'s engine sources where the reports say (`j-sameway-engines-a-red-3-orchestrator.log.txt`).
   - Every killed mutation row is an assertion, `BOOM` and `UNBOUND` are refused, and the control holds (`j-sameway-engines-a-mutations-3-orchestrator.log.txt`).
   - For each proof claim you confirm, name the mutation that makes the proof fail, and say whether its assertions distinguish it from the passing case.
7. **The guide sentences are true.** The return sentences in § Collapse, § Tab, § Carousel, and § Toast hold for the code, including that each return reads each target before writing it back.
8. **Greenfield and scope.**
   - The changed paths are round 2's eight, round 3's eight, and the integrations' `HostSnapshot.ts`, guide, and `tests/src/browser/index.test.ts`.
   - `#mark`, `#undo`, the private `#record`, `#read`, and `#write`, and the old per-direction returning steps have no caller left.
   - No compatibility path remains.

Rule each claim CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence at `dc2a1a7`. Then report any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
