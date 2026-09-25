# J-RELEASE-CORE round 2 — audit claims (2026-09-25)

**Subject.** Veneer `03526bc` on `unit/release-core` over `d702bb8`. Read the files at `03526bc` with `git -C C:/Users/mikes/WebstormProjects/veneer show 03526bc:<path>`, or in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-core`, which holds `03526bc` clean.

**Evidence.** Every path here is under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`.
- The brief `j-release-core-brief-2.md` and the report `j-release-core-report-2.md`.
- Round 1's verdict `j-release-core-audit-verdict.md` and its two lane verdicts.
- `../decisions.md` § E35 with its amendment "E35 amended at the J-RELEASE-CORE round-1 audit".
- `j-release-core-2.diff` and `-2-status.txt`.
- The instruments `-2-mutate-2.mjs`, `-2-mutations-2.json`, `-2-accept-2.sh`, and `-2-run-2.sh`.
- The logs `-2-mutations-2.log.txt`, `-2-Lifetime-2.log.txt`, and `-2-Button-2.log.txt`.
- The Orchestrator's replay: `j-release-core-replay-2.log.txt` (the instrument is `../tools/replay-release-core-2.sh`).

**The law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- `.claude/rules/names.md`, `typescript.md`, `tests.md`, `documentation.md`, and `writing.md`.
- `../decisions.md` § E25 and § E35 with its amendment.

## Claims

1. **`hold` after destruction.**
   - Once destruction has begun, `hold` returns `false` for every record.
   - It runs the release at once for a record it does not hold.
   - It leaves a record it already holds pending, and the drain gives that record back with its first release.
   - The case "returns false for a record it holds already after destruction began …" reads red at `d702bb8` by an assertion.
2. **`join` leaves with its child.**
   - In the owner branch, `join` adds a listener on the child's own lifetime signal that calls `owner.release(resource)`, and only when `hold` returned `true`.
   - A child destroyed directly then leaves the owner's ledger: `owner.release(child)` returns `false`, and a later `owner.destroy()` runs nothing for it.
   - Repeated cycles leave no holding.
   - In the owner-drain ordering, the child's holding is given back once, before the owner's older holdings.
   - Rule whether the nested second `destroy` the listener causes is harmless for `Button`. Rule also whether any class that will adopt `join` could loop through it.
3. **`Button` joins first.**
   - `Button` reads `signal` before its claim and joins right after the claim, before it holds its snapshot and before it reads a hook.
   - The case in which an `on` getter toggles the button, destroys the owner, and reads the host restored inside the getter reads red at `d702bb8` by an assertion.
4. **The mutations bind.**
   - Every row of `mutate-2.mjs` fails its named cases by `AssertionError`, and no failure has another class. That covers the three new rows, round 1's sixteen, and the base row.
   - `button-snapshot-held` fails 38 cases, all by assertion.
   - For each proof you confirm, name the mutation that makes it fail, and say whether its assertions tell that mutation apart from the passing case.
5. **The prose is true, and it teaches the mechanism.** These hold for the code, and they state E35's amendment:
   - `LifetimeInterface`'s summary, `signal`, and `hold`;
   - `join`'s TSDoc and example;
   - the `Lifetime` and `HostSnapshot` class remarks and `HostSnapshotInterface.write`'s remarks;
   - the `ButtonOptions.signal` doc;
   - the guide's § Ownership and restoration paragraphs and the `hold` row.

   No sentence says every class joins, and the author's obligations are written with `must`.
6. **Scope and shape.**
   - The changed paths are the report's eight.
   - No compatibility path remains.
   - `Lifetime` keeps one class, with no nested function and no type assertion.
7. **The residue.** The report notes that `join` does not handle a class lifetime that has already ended when `join` is called. Rule whether any shipped path reaches it.

Rule each claim CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence at `03526bc`. Then report any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
