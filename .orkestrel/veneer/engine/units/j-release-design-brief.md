# Unit J-RELEASE-DESIGN — the release mechanism every engine's `destroy` drains

## Role and engine

This is a design round with two blind lanes on this one brief:
- the subjective lane is `planner` on Opus 5.5, a native read-only subagent;
- the objective lane is `analyst` on GPT-6 Astra, through `codex exec` in a read-only sandbox.

Neither lane sees the other's answer. The Orchestrator reconciles them and rules.

## Objective

Propose the one mechanism by which every Veneer engine gives back what it took. The mechanism must meet three conditions:
- a `destroy()` called at any point, including inside consumer code that a release runs, finishes every pending release before it returns;
- no release acts on a fresh read where a record exists;
- the repair of every station J-RELEASE-SWEEP found follows from the mechanism, not from a hand fix at each station.

Then propose the units that adopt it.

## Context

**Evidence.** J-RELEASE-SWEEP mapped every release station in the engines against two invariants, on six blind lenses. Its brief is `units/j-release-sweep-brief.md`, and it states the invariants. Its maps are the terrain record. When this brief and a map disagree about the code, the code wins; stop and name the disagreement.
- `units/j-release-sweep-s1-map.md`: `Dropdown` and `Placement`, on Astra.
- `units/j-release-sweep-s2-map.md`: `Tooltip` and `Popover`.
- `units/j-release-sweep-s3-map.md`: `Modal`, `Offcanvas`, `Backdrop`, `Isolation`, and `ScrollLock`.
- `units/j-release-sweep-s4-map.md`: `Collapse`, `Tab`, `Carousel`, and `Swipe`.
- `units/j-release-sweep-s5-map.md`: `Toast`, `Alert`, `ScrollSpy`, `Button`, and `ColorMode`.
- `units/j-release-sweep-s6-map.md`: `HostSnapshot`, `Registry`, `Delegate`, and the record helpers.

Every path under `units/` is in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/`. Each map is a source review, not a run.

**What the maps agree on.** Each lens found this source without seeing the others:
- Every engine's `destroy()` except `Dropdown`'s opens with an `if (aborted) return` latch that covers the whole method. A nested `destroy()` therefore returns while the outer call still has releases pending. `HostSnapshot.restore` completes a nested call (E13), but the latch stops an engine from reaching it.
- Each owner clears its holding field before it calls that holding's release. So a nested `destroy()` inside the release cannot reach the holding.
- Only snapshot records sit in a drainable ledger (`HostSnapshot`'s `#owned`). Every other holding is a field each engine manages by hand. The returning step's `HostWrite` list is a local that `destroy()` cannot reach.
- Each engine picks its own save moment: at construction, at call start for every target it might touch, or at the first changing write.

**The sibling that already drains.** `Dropdown.destroy` at Veneer `3bb9afb` latches only the claim release and the abort. It runs `this.#placement?.destroy()` and `this.#snapshot.restore()` on every call, and its comment states that a nested call completes the restoration. Read it at `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-b/src/browser/Dropdown.ts`, in `destroy`. Its replacement path in `show` breaks the shape: it clears `#placement` before it destroys the replaced placement.

**The questions to rule.**
1. **The mechanism.** There are two candidates, and you may propose a third:
   - A, the pattern: every engine and primitive adopts `Dropdown`'s `destroy` shape. It latches only the one-time steps, always runs the drain steps, and clears each field only after its release returns and only if it still holds the same resource.
   - B, a ledger: one shared per-owner ledger of holdings, each entry paired with its release. `destroy()` drains it, a nested `destroy()` drains the same ledger, and an entry leaves only after its release returns. This generalizes `HostSnapshot`'s `#owned` (S6 § The source).

   Rule on the shape. For B, rule on its home, its type in `src/browser/types.ts`, and whether it is a class or an extension of `HostSnapshot`. Also rule on how a call's `HostWrite` list becomes reachable from `destroy()`. Name the constraint that keeps the mechanism from over-reaching.
2. **The save moment.** Should a lifetime snapshot save a target only at the engine's first write that changes it? S1's D-SAVE and P-SAVE and S5's five rows say yes. E25 rules that a tab joins the record of every initial attribute its list's plan names, whether it writes it or finds it already written. Reconcile the two. Rule which of those rows are defects, and state the rule's exceptions.
3. **The primitives.** Rule how `Placement`, `Isolation`, `ScrollLock`, and `Backdrop` release under the mechanism, including the promotion's ownership:
   - S1's PROMOTION: a static placement closes a promotion it never took;
   - CLOSE-REENTRY: a nested `destroy` during the closing `beforetoggle`;
   - OPEN-ABORT: an abort during the opening `beforetoggle`.
4. **`Delegate`.** Rule on S6's rows 8, 9, and 10: the whole-method latch, the field cleared before release, and a `destroy` during construction.
5. **The fresh reads.** Rule whether each of these is a direct fix or follows from the mechanism:
   - S2's `tip.id` reads, the link record `{ id, added, described }`, and `#occupy`'s stale origin;
   - S4's Tab dropdown set, read again after consumer code runs.
6. **The units.** Propose the units that adopt the mechanism: their order, their owned files, and each unit's red-first witnesses taken from the maps. The standing ownership is:
   - J-SAMEWAY-ENGINES-B, at round 5, owns `Dropdown`, `Tooltip`, `Popover`, and `Placement`, with their tests.
   - J-MOTION-PROOFS-B owns `Toast.ts` and four test files, and is writing.
   - J-ORACLE-FIX-OFFCANVAS is about to own `Offcanvas.ts` for a focus fix.
   - J-OVERLAYS is queued to put Modal and Offcanvas on E24's recorded prior-value return (S3 § The source).

   Say which unit carries each map row. Say whether any row is not a defect, and why.

**One ruling is already taken.** S1's HIDE row is not a defect. After `show` then `hide`, Bootstrap 5.3.8's dropdown writes `aria-expanded="false"`, and Veneer matches it (`guides/veneer.md` § Dropdown). A completed hide follows Bootstrap's state, not a return of the show's writes. The sweep brief's sentence "A completed `hide` returns every write its `show` made" is withdrawn. A stopped call's return (E24) still writes back the prior values it recorded.

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, in particular types first, "Centralize by kind", "No superfluous wrappers", "Minimal public API", and "Greenfield".
- These rules, under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `architecture.md`, `patterns.md`, `names.md`, `typescript.md`, and `quality.md` § Rounds and verdicts.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E13 with every amendment, § E18, § E22, § E24 with every amendment, and § E25.
- Skill: none. Guide: `guides/veneer.md` § Engine, in the Veneer root.

**Installed primitives.** `@orkestrel/test` and `@orkestrel/contract` under `C:/Users/mikes/WebstormProjects/veneer/node_modules/@orkestrel/`. Say if either already exports a ledger, a disposable stack, or a release helper that fits. Name the export you read.

**Host.** Windows 11. Both lanes are read-only. The source is at two roots:
- `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-b`, Veneer `3bb9afb`, for `Dropdown`, `Tooltip`, `Popover`, and `Placement`;
- `C:/Users/mikes/WebstormProjects/veneer`, `main`, for everything else.

The Astra lane may run read-only `git` commands. The Opus lane has Read, Grep, and Glob only.

**Measurements.** None beyond the maps. A witness in a map is a derivation until a repair unit runs it red-first.

**Control identifiers.** The map row labels (REPLACE, D-SAVE, and the others) are control identifiers. They stay in the design records, and no test is named for one.

**Standing conditions.** J-MOTION-PROOFS-B is writing in its own worktree. Nothing in this round writes.

## Unknowns

- Whether a shared mechanism can express the engines' existing takeover rules (E24's door after consumer code, E22's lock that a stopped show keeps) without a special case per engine. Say where it cannot.

## Scope

**Owned.** None. The round is read-only.

**Off-limits.** Every file for writing.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message is your proposal, with these sections:
1. **The ruling asked for on each question, 1 to 6,** with `file:line` evidence.
2. **The mechanism's contract,** as the TypeScript you would put in `src/browser/types.ts`, or the pattern's exact rule if you choose A.
3. **The invariant, the bound, and the consumer's interface,** each in one sentence.
4. **The unit plan:** units, order, owned files, and each unit's witnesses by map row.
5. **What you could not settle,** and the probe that would settle it.

## Deviation contract

Stop and report when a map's citation does not resolve, or when the law contradicts itself on a question. You decide how to group the rows and how many units the plan needs.

## Acceptance criteria

1. Every question has a ruling or a named reason it cannot be ruled.
2. Every map row with a `violates` ruling is assigned to a unit, or ruled not a defect with a reason.
3. Every citation resolves.

## Review evidence

The six maps, the source at the two roots, and the decisions. The Orchestrator reconciles both proposals into a decision entry and the repair briefs.
