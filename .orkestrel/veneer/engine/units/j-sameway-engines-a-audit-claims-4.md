# J-SAMEWAY-ENGINES-A round 4 — audit claims (2026-09-25)

**Subject.** Veneer `unit/engines-a` at `3f62d64` over `dc2a1a7`:
- `bdecfa1`, round 4;
- `3f62d64`, the Orchestrator's integration of the round's report-only guide patch.

Read the files at `3f62d64` with `git -C C:/Users/mikes/WebstormProjects/veneer show 3f62d64:<path>`. Never read the worktree.

**Evidence** (all under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`):
- `j-sameway-engines-a-4.diff` and `j-sameway-engines-a-4-status.txt`: the round's change over `dc2a1a7`;
- `j-sameway-engines-a-shape-2to4.diff`: the shared leaves, `HostSnapshot`, `types.ts`, and the guide over `2760f7e`, for the whole shape rounds 2 to 4 built;
- the brief `j-sameway-engines-a-brief-4.md`, the report `j-sameway-engines-a-report-4.md`, and the round-3 verdicts `j-sameway-engines-a-audit-3-verdict.md` and `j-sameway-engines-a-audit-3-objective-verdict.md`;
- the Orchestrator's replay: `j-sameway-engines-a-red-4-orchestrator.log.txt` and `j-sameway-engines-a-mutations-4-orchestrator.log.txt`;
- the instrument `j-sameway-engines-a-mutations-4.py`;
- the law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, and `decisions.md` § E24 and § E25, each with every amendment.

## Claims

1. **F1: Collapse records every completion write.** In `src/browser/Collapse.ts`, `recordHostChange` precedes each of these writes, with the value the write gives:
   - show's final size removal;
   - hide's size removal;
   - hide's completing `host` token addition.

   The round-3 verdict's witnesses now return the prior values:
   - a hide of a panel without the `host` token returns `show` alone;
   - a show or a hide whose size writes change nothing returns `0px`.

   No other host write in the change methods of `Collapse`, `Toast`, `Tab`, or `Carousel` lacks both a record call and a reason (the report's P1 table).
2. **F2: a property's prior value includes its priority.**
   - `HostChange.priority` is declared once, with `HostSnapshotRecord.priority`'s meaning.
   - `recordHostChange` records the priority, and records a write that changes only a property's priority.
   - `rewindHostChanges` writes a property back with its recorded priority, and skips a target that already holds the recorded value and priority.
   - Recording stays conditional on a changed value or priority.
3. **One reading and one writer.**
   - `readHostPriority` in `src/browser/helpers.ts` is the only read of an inline priority in `src/browser/`.
   - `HostSnapshot.save` reads through `readHostValue` and `readHostPriority`, and `HostSnapshot`'s write-back writes through `writeHostValue`.
   - `HostSnapshot`'s behaviour is unchanged for every category, including the order of its token, property, and attribute writes and its `class` and `style` attribute clean-up.
   - Every case in `tests/src/browser/HostSnapshot.test.ts` still binds.
4. **Surface parity.**
   - `readHostPriority` is exported through the browser barrel, and `tests/src/browser/index.test.ts` lists it.
   - Each changed or added export has a § Surface row whose summary equals its TSDoc: `HostChange`, `readHostPriority`, `writeHostValue`, `recordHostChange`, and `rewindHostChanges`.
5. **The proofs bind.**
   - The round's Collapse cases read red on `dc2a1a7`'s sources and green at the tip (`j-sameway-engines-a-red-4-orchestrator.log.txt`).
   - Every killed mutation row fails by an assertion, the controls hold, and `BOOM` and `UNBOUND` are refused (`j-sameway-engines-a-mutations-4-orchestrator.log.txt`).
   - For each proof claim you confirm, name the mutation that makes the proof fail, and say whether its assertions tell that mutation apart from the passing case.
6. **The guide is true.** § Collapse's return paragraph, as `3f62d64` integrates it, holds for the code: which targets return, that the inline size returns with its priority, and that the step compares value and priority. The § Tab, § Carousel, and § Toast return sentences still hold.
7. **Greenfield and scope.**
   - The changed paths are the report's eight, plus the guide integration.
   - No compatibility path remains: no second priority read, no callback path left in `HostSnapshot`'s write-back, and no alias.
   - `writeHostValue`'s default `priority` of `''` is CSSOM's own value for an unprioritized declaration, the one `getPropertyPriority` returns. It is not an invented sentinel under `AGENTS.md`'s absence rule.

Rule each claim CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence at `3f62d64`. Then report any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
