# J-SAMEWAY-ENGINES-B — audit claims (2026-09-25)

**Subject.** Veneer commits on `unit/engines-b` over `8bc940d`:
- `54a6c2f`, the unit's rounds 1 and 2;
- `b8a8805`, the Orchestrator's integration of the unit's report-only `types.ts` and guide patches.

A read-only snapshot of `src`, `tests`, and `guides` at `b8a8805` sits in `C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/snapshot-engines-b-b8a8805/`. Beside it are the diff `j-sameway-engines-b.diff`, its status `j-sameway-engines-b-status.txt`, the writer's reports `j-sameway-engines-b-report.md` and `j-sameway-engines-b-report-2.md`, and the Orchestrator's logs `j-sameway-engines-b-red-orchestrator.log.txt` and `j-sameway-engines-b-mutations-orchestrator.log.txt`. A shell reads `git -C C:/Users/mikes/WebstormProjects/veneer show b8a8805:<path>`. Never read the worktree.

**What this unit answers.** The briefs `units/j-sameway-engines-b-brief.md` (B1 to B4) and `units/j-sameway-engines-b-brief-2.md` (T1), under `decisions.md` § E13, § E17, § E18, § E22, § E24, and § E25, each with every amendment. It also answers the carried rows that name `Dropdown` and `Tooltip` under E24, and the external close of a promoted overlay.

## Claims

1. **B1: agreement completes.** In `Dropdown`, `Tooltip`, and `Popover`, suppose a host moves the menu's or the tip's `shown` token toward the change's end before the call's token write. Then the call skips that write, completes every other write in its order, dispatches its completed event, and resolves `true`. Before the call finds the token at its end, no door reads that token.
2. **B2: a takeover returns the change's writes.** After the call finds the token at its end, a host that moves the token back takes the change over. The call resolves `false` and dispatches nothing more. Its returning step returns each write the change made, by its own entry, and only those writes. The step reads the call's identity and the engine's lifetime before each write.
3. **B3: the platform's close completes the hide.** A consumer's `hide-popover` or `toggle-popover` invoker, or a `hidePopover()` call, closes a menu, tip, or popover the engine promoted with `popover="manual"`. The engine then completes its hide and dispatches its hide events, with `shown` reading `false`. A listener that prevents that hide keeps the overlay once, and the next close of the same placement or tip is forced, so no two listeners can loop.
4. **B4: the enumeration is complete.** The report's B4 tables name every write each engine's `show` and `hide` makes. Each write has an entry and a return, or a stated rule: E13, E18, E22 amendment 3, the host's move, or a named reason. The Tooltip `#rehide` runs only when the token alone moved.
5. **The writer's choices hold under E24 and E18.**
   - Tooltip keeps its E18 identity-before-dispatch, so a nested show inside `show.vn.tooltip` is refused while a nested hide supersedes.
   - The Tooltip returning step holds the change until it ends.
   - A Dropdown hide taken over does not rebuild its placement.
   - Dropdown's stopped show now returns its own placement, and the show-start restore of a leftover placement is deleted.
6. **T1: the tables live in the setup module.** The door and reversal tables are frozen exports of `tests/setupBrowser.ts`, and each is in `tests/setupBrowser.test.ts`'s sorted export list. The three test files hold no table this unit wrote. Absence is `undefined`, never `'none'`.
7. **The proofs bind.**
   - The cases read red on `8bc940d`'s three sources where the report says, each through an assertion.
   - The cases the report names as green on base pin behaviour E17 already had.
   - Every killed mutation row is an assertion, `BOOM` and `UNBOUND` are refused, and the controls hold.
   - For each proof claim you confirm, name the mutation that makes the proof fail, and say whether its assertions distinguish it from the passing case.
8. **The integrated sentences are true.** The `@returns` sentences and the guide's door, agreement, and platform-close paragraphs in `b8a8805` hold for the code in `54a6c2f`.
9. **Greenfield and scope.**
   - `54a6c2f` changes the eight paths round 2's report names.
   - `b8a8805` changes `types.ts` and the guide alone.
   - No field, helper, or compatibility path is left without a use.

Rule each claim CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence at `b8a8805`. Then report any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
