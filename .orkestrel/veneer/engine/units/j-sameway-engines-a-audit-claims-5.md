# J-SAMEWAY-ENGINES-A round 5 — audit claims (2026-09-25)

**Subject.** Veneer `unit/engines-a` at `63a153b` over `3f62d64`:
- `fb179a9`, round 5;
- `63a153b`, the Orchestrator's integration of the round's report-only guide patch.

Read the files at `63a153b` with `git -C C:/Users/mikes/WebstormProjects/veneer show 63a153b:<path>`. A lane that cannot run git reads the worktree copies under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-a/`, committed as `63a153b` with a clean status.

**Evidence** (all under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`):
- `j-sameway-engines-a-5.diff` and `j-sameway-engines-a-5-status.txt`;
- the brief `j-sameway-engines-a-brief-5.md` and the report `j-sameway-engines-a-report-5.md`;
- round 4's verdicts: `j-sameway-engines-a-audit-4-verdict.md`, `-audit-4-objective-verdict.md`, and `-audit-4-reviewer-verdict.md`;
- the Orchestrator's replay `j-sameway-engines-a-mutations-5-orchestrator.log.txt`, and the gate log `../tools/w2-gates-scoped-engines-a-5.log`;
- the instrument `j-sameway-engines-a-mutations-5.py`;
- the law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, `.claude/rules/names.md`, and `decisions.md` § E24 with every amendment, including its wording amendment of 2026-09-25.

## Claims

1. **The renames are complete.**
   - `HostWrite { target, value, priority }` is declared once in `src/browser/types.ts`.
   - `recordHostWrite(writes, target, next)` and `rewindHostWrites(writes, owns)` are the only record and rewind leaves.
   - No `HostChange`, `recordHostChange`, `rewindHostChanges`, or record field `prior` remains in `src`, `tests`, or `guides`.
   - No alias remains.
   - In the four engines, `change` names the call alone.
2. **The contract is stated.**
   - `recordHostWrite`'s summary and its § Surface row say that it appends a target only at the change's first write that changes it.
   - `writeHostValue`'s `value` parameter says that any string adds a token.
3. **The verb.** In the four engines' class remarks and in the return paragraphs of § Collapse, § Tab, § Carousel, and § Toast, the returning step "writes … back". "Restore" names `HostSnapshot`'s restoration alone in those texts.
4. **The branch is pinned.** The case `readHostPriority reads the empty string for an attribute and a token named like an inline property that carries a priority` reads red under `N5-read-branch`, which replaces the category branch with the style's priority read, and green at the tip.
5. **No behaviour changed.**
   - The round's diff changes names, documentation, and one test case, and no logic.
   - Every carried mutation row kills as it did in round 4.
   - The controls hold, and `BOOM` and `UNBOUND` are refused (the replay).
6. **Parity.**
   - Each renamed export's § Surface summary equals its TSDoc.
   - The barrel export list in `tests/src/browser/index.test.ts` names the renamed leaves.
   - `npm run test:guides` is green (the gate log).

Rule each claim CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence at `63a153b`. Then report any defect outside the claims. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
