# Unit J-RELEASE-DESIGN, round 3 — the release mechanism every engine's `destroy` drains

**What changed from `j-release-design-brief-2.md`, and why.** Brief 2 told a lane to stop whenever the brief and a map disagreed about the code. The objective lane stopped on one such disagreement, correctly under that wording. S3's summary says every primitive in its slice latches on `aborted`, but `ScrollLock.destroy` has no latch, as brief 2 states and the code shows (`units/j-release-design-2-analyst-proposal.md`). A map is a source review, and a summary line can over-generalize. So a disagreement the code settles is now a note in the output, not a stop. The planner lane of round 2 was stopped before it returned, and nothing from round 2 is used. Only the Evidence paragraph's last sentence and § Deviation contract change.

**What changed from `j-release-design-brief.md` to brief 2, and why.** The first brief said that every engine's `destroy()` except `Dropdown`'s latches the whole method on `aborted`. The objective lane stopped on that sentence, correctly: at `3bb9afb`, `Tooltip` and `Placement` also latch only their one-time steps. The planner lane was stopped before it returned, and nothing from either lane of round 1 is used. This brief replaces § "What the maps agree on" and § "The sibling that already drains" with the measured shape of every `destroy()`. It changes nothing else. The objective lane's stop is retained as `units/j-release-design-analyst-proposal.md`.

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

**Evidence.** J-RELEASE-SWEEP mapped every release station in the engines against two invariants, on six blind lenses. Its brief is `units/j-release-sweep-brief.md`, and it states the invariants. Its maps are the terrain record. When this brief or a map disagrees with the code, the code wins. Name each such disagreement in your output's section 5, rule on what the code shows, and carry on.
- `units/j-release-sweep-s1-map.md`: `Dropdown` and `Placement`, on Astra.
- `units/j-release-sweep-s2-map.md`: `Tooltip` and `Popover`.
- `units/j-release-sweep-s3-map.md`: `Modal`, `Offcanvas`, `Backdrop`, `Isolation`, and `ScrollLock`.
- `units/j-release-sweep-s4-map.md`: `Collapse`, `Tab`, `Carousel`, and `Swipe`.
- `units/j-release-sweep-s5-map.md`: `Toast`, `Alert`, `ScrollSpy`, `Button`, and `ColorMode`.
- `units/j-release-sweep-s6-map.md`: `HostSnapshot`, `Registry`, `Delegate`, and the record helpers.

Every path under `units/` is in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/`. Each map is a source review, not a run.

**The shape of every `destroy()`, measured 2026-09-25.** The Orchestrator printed the opening lines of each class's `destroy()` method. The engines-b files were read at `3bb9afb`, and every other file on `main`. The readings fall into four shapes:
- **Only the one-time steps are latched.** The claim release and the abort sit inside `if (!this.#controller.signal.aborted) { … }`, and the drain steps run on every call. This is the shape of `Dropdown`, `Tooltip`, and `Placement` at `3bb9afb`. J-SAMEWAY-ENGINES-B brought it to those files.
- **The whole method is latched.** `destroy()` opens with `if (this.#controller.signal.aborted) return`, so a nested call returns while the outer call still has releases pending. This is the shape of `Modal`, `Offcanvas`, `Backdrop`, `Isolation`, `Collapse`, `Tab`, `Carousel`, `Swipe`, `Toast`, `Alert`, `ScrollSpy`, `Button`, and `Delegate` on `main`.
- **No latch.** `ScrollLock.destroy` aborts on every call, and its holder set decides whether the call releases anything.
- **A record the release clears first.** `ColorMode.destroy` reads `#original`, returns when it is `undefined`, and clears it before it writes the theme back.

**What the maps agree on.** Each lens found this source without seeing the others:
- A nested `destroy()` in an engine whose whole method is latched returns before its releases finish. `HostSnapshot.restore` completes a nested call (E13), but the latch stops the engine from reaching it.
- Owners clear a holding's field before that holding's release runs, in both latch shapes. Examples are `Dropdown`'s replacement path in `show`, and `Tooltip`'s `#discard` and `#rehide`. A nested `destroy()` inside the release then cannot reach the holding.
- Only snapshot records sit in a drainable ledger (`HostSnapshot`'s `#owned`). Every other holding is a field each engine manages by hand. The returning step's `HostWrite` list is a local that `destroy()` cannot reach.
- Each engine picks its own save moment: at construction, at call start for every target it might touch, or at the first changing write.

**The siblings that already drain.** `Dropdown.destroy`, `Tooltip.destroy`, and `Placement.destroy` at `3bb9afb` are the shape candidate A would spread. Read them at `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-b/src/browser/`, each in `destroy`. They still break I2 wherever a field is cleared before its release. The maps S1 and S2 name each such site.

**The questions to rule.**
1. **The mechanism.** There are two candidates, and you may propose a third:
   - A, the pattern: every engine and primitive adopts the `destroy` shape of `Dropdown`, `Tooltip`, and `Placement`. It latches only the one-time steps, always runs the drain steps, and clears each field only after its release returns and only if it still holds the same resource.
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

Stop and report only when the law contradicts itself on a question, so that no ruling is possible. A map citation that does not resolve, or a brief or map statement the code contradicts, is not a stop: name it in section 5 and rule on the code. You decide how to group the rows and how many units the plan needs.

## Acceptance criteria

1. Every question has a ruling or a named reason it cannot be ruled.
2. Every map row with a `violates` ruling is assigned to a unit, or ruled not a defect with a reason.
3. Every citation resolves.

## Review evidence

The six maps, the source at the two roots, and the decisions. The Orchestrator reconciles both proposals into a decision entry and the repair briefs.
