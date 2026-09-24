# Unit J-TOOLTIP-DOORS — a ruling on the Tooltip's write-sequence door mechanism (design round, two blind lanes)

## Role and engine

Two read-only lanes on this one brief, blind to each other, launched in parallel:

- **Subjective lane:** `planner` on Opus 5.5, a native Claude subagent (Read, Grep, Glob). Argues shape, ergonomics, naming, and the feel the mechanism gives the class and its guide paragraph.
- **Objective lane:** `analyst` on GPT-6 Astra, reached through `codex exec` in a read-only sandbox with `--cd C:/Users/mikes/WebstormProjects`. Argues correctness: what the platform's reaction ordering permits, which intervals each option leaves open, and what a proof can distinguish.

The launch sentence names which lane you hold. Perform the assignment directly and spawn nothing; you are the engine reading this brief, so the work is yours.

## Objective

One ruling that ends the door seam in `Tooltip.ts`: the invariant the code will obey, the constraint bounding it against over-correction, and the interface where a consumer meets the obligation, with the mechanism that makes the invariant hold by construction rather than by enumeration, the doors enumerated under that mechanism, the sentence the guide's door paragraph can then promise truthfully, and the proof shape that distinguishes the mechanism from its omission.

## Context

**The seam.** The Tooltip's `show`, `hide`, `fill`, build, occupancy, release, discard, and promotion sequences interleave platform writes (class tokens, attributes, `insertBefore`, `replaceChildren`, `showPopover`, `hidePopover`, focus) with points where consumer code can run: event listeners on the `show`, `shown`, `hide`, `hidden` events; content functions; custom-element connection and disconnection reactions on content elements moved into and out of the tip; the platform's `beforetoggle` and `toggle` events on the popover; and `HostSnapshot` restoration reactions. Consumer code at any of those points can destroy the tooltip, take the change over by writing the `shown` token, or relocate the tip. Three audit rounds each found a write the sequence performs after such a point with no lifetime, identity, or container read between them, each round through a door the previous fix did not cover. The retained record, in reading order:

- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-tooltip-audit-3-objective-verdict.md` — claim 1 (the two counterexamples: the build's final release running a connection reaction before `#build` returns, and `#discard` removing a tip that a closing `beforetoggle` listener relocated inside `Placement.destroy()`), claim 8's door-trace table (every interval, with the source result), and the referral that names the strategy switch.
- `j-tooltip-audit-3-verdict.md` — the reconciled ruling that refuses a fourth local repair.
- `j-tooltip-audit-2-verdict.md` and `j-tooltip-audit-claims-2.md` — round 2's doors (the build reading no door between a content function and its move, the origin record written after the move, the hide removing a relocated tip).
- `j-tooltip-audit-claims-3.md` claim 1 — what round 3 repaired and how (`#holds(change, undefined)`, `#occupy(tip, selector, value, change)`, `#release(keep)`, the hide's container read).
- `decisions.md` E13 (the nested-snapshot bound: a `HostSnapshot` restoration that re-enters is out of this unit's contract and belongs to J-SNAPSHOT-SHARED) and E17 (the hint tooltip's platform dismissal and the one-re-promotion bound).

**The subject files** (the tooltip worktree, branch `unit/tooltip`, round 3 uncommitted on base `e8251cf`):

- `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip/src/browser/Tooltip.ts` — the class. Locate by symbol: `show`, `hide`, `fill`, `#build`, `#occupy`, `#release`, `#conceal`, `#discard`, `#holds`, `#filled`, `#acquire`, `#link`, `#container`, `#receiver`, `#promoted`.
- `.../tooltip/src/browser/Placement.ts` — shared with `Dropdown`; `update`, `destroy`, the popover promotion.
- `.../tooltip/src/browser/HostSnapshot.ts` — unchanged by the unit; E13 bounds it.
- `.../tooltip/tests/src/browser/Tooltip.test.ts` — the door cases (search the titles "stops a build whose content function destroys the tooltip on its second call", "resolves a hide false and leaves the tip where a reaction moved it during the wait", "returns a custom element content home when its disconnection reaction destroys the tooltip during the move").
- `.../tooltip/guides/veneer.md` — the `#### Tooltip` door paragraph (search "after each" near the section) and the restoration paragraph stating the E13 bound.
- The door style the other engines use, for comparison and for the constraint that one engine family shares one idiom: `C:/Users/mikes/WebstormProjects/veneer/src/browser/Modal.ts` (main, `afae42c`) and `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/offcanvas/src/browser/Offcanvas.ts` (the J-OFFCANVAS round-1 tree; its writer's report `j-offcanvas-report.md` records under "Deviation state" item 4 the reasoning "no door after backdrop writes: the backdrop is a plain div the panel created, so no reaction can run inside them"). Their sequences write a host the consumer owns and read a lifetime-and-token door after each write; they move no content and promote no popover.

**Platform facts the ruling rests on.** Custom-element reactions run before the DOM method that enqueued them returns (the custom-element reactions stack; HTML § Custom element reactions). `hidePopover()` and `showPopover()` dispatch `beforetoggle` synchronously and `toggle` in a task (HTML § The popover attribute). `replaceChildren` and `insertBefore` on a connected parent run disconnection reactions for the removed nodes and connection reactions for the inserted ones inside the call. A listener can relocate an element while an event dispatches; a relocated-but-connected element still accepts attribute and token writes.

**Law.** `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` (§ Design laws: single-word members, no nested functions, derive state, functional core and imperative shell, no superfluous wrappers, minimal public API; § Writing), `.claude/rules/architecture.md`, `.claude/rules/patterns.md`, `.claude/rules/names.md` (fixed lifecycle vocabulary; `read*`/`matches*` prefixes; `is*` is a guard), `.claude/rules/tests.md` (real implementations; an inert stub on a platform object; no mocks of project behaviour), `.claude/rules/quality.md` § Rounds and verdicts (the seam budget, "state the ruling that ends a seam as the invariant the code will obey, the constraint bounding it against over-correction, and the interface where a consumer meets the obligation"; reachability bounds the fix: a defect reachable through shipped code or a documented extension seam is repaired, one reachable only through a hypothetical foreign implementation is documented on the interface and proven). Skill: none.

**Standing decisions that bind the ruling.** E6 greenfield: no alias, shim, or compatibility path. E13 stands: a `HostSnapshot` restoration that re-enters is out of scope and belongs to J-SNAPSHOT-SHARED. E17 stands: the one-re-promotion bound and the forced concealment at the second platform close. Round 3's shape stands: the member names `#acquire`, `#link`, `#container`, `#release`, `#receiver`, `#occupy`, `#holds`, `#promoted`; a ruling may add a member or replace one, and says so. `Placement` is shared with `Dropdown`: a `Placement` change keeps the Dropdown contract and names the Dropdown cases it touches. `Tooltip.ts` is one class plus imports; a reusable leaf is exported from the centralized module (`helpers.ts`) and tested.

**Host.** Windows 11; the paths are as written. This is a source-reading round: run no test, build, or write. `git -C <worktree> diff e8251cf --stat` and `git -C <worktree> status --short` are the permitted read commands.

## Unknowns

- Whether an enumeration of doors over this class can be shown complete, or whether the class has to change so a missing door is impossible by construction. Rule on it.
- Whether the tip's relocation by a listener inside the platform's own `beforetoggle` dispatch is inside the tooltip's contract or belongs on the interface as a documented obligation. Rule on it against the reachability rule.
- Whether the promotion and the teardown can read their container after `showPopover()` and `hidePopover()` return, and what the tooltip does when the read fails: leave the tip where it is and resolve `false`, or restore. Rule on it.

## The question

Rule on each of these options — its cost, what it closes, what it leaves open — then pick one or a named combination, and state the ruling in the three parts the quality rule requires.

- **A. Enumerated doors, completed.** Keep the idiom `Modal` and `Offcanvas` use (a lifetime-and-token read after each write) and add the reads the objective lane's door trace names: after the build's final release and before publication, after `hidePopover()` inside `#discard` and before the removal, after `showPopover()` and before the `shown` token. This is the fourth repair the reconciled verdict refuses unless the lane shows why the enumeration is now provably complete: name the property that makes it complete, or reject the option.
- **B. One guarded step.** Every platform write and every dispatch inside a change runs through one method (a candidate one-word name is the lane's to propose) that reads the door before and after the write — identity of the change, lifetime, the tip's container where a tip exists, and the `shown` token — and reports whether the change still holds, so the sequence cannot omit a door because the door lives in the primitive rather than in the sequence. The sequence becomes a chain of guarded steps. State what the step reads, how the sequence stops (return `undefined`, resolve `false`, release what it moved), and what this does to the class shape, to the line count, and to the guide's paragraph.
- **C. A threat-model bound on the interface.** State which reactions the tooltip defends against and which it declares out of contract, as E13 did for the nested snapshot: for example, the tooltip guarantees that after a destruction or a takeover it dispatches no completed event, publishes no tip (`#tip`, `aria-describedby`), and removes no tip it does not hold, and it declares that a listener relocating the tip inside the platform's own `beforetoggle` dispatch is outside the contract. The obligation goes on the interface (`TooltipInterface`, `TooltipEventMap`) with a proof that the documentation is true. Rule on whether each excluded reaction is reachable through shipped code or a documented seam (then it is repaired, not documented) or only through a hypothetical consumer (then it is documented).
- **D. Reaction-free construction.** Restructure so consumer reactions cannot run inside the write sequence: build and fill the tip while it is detached from any document (no connection reactions), move content in one insertion, run the content functions before the first write, and promote last. State which reactions this cannot exclude (a disconnection reaction fires at the removal from the origin parent; `beforetoggle` fires inside promotion) and what remains for A, B, or C to cover.

## Scope

Read-only. No file is owned or written. The ruling is returned as the lane's final message.

## Execution

Perform the assignment directly and spawn nothing. Read the retained record and the subject files named in Context before ruling; cite each site by symbol and approximate line. A derivation from the source is the only evidence this round can have, so label every claim about behaviour as derived and name the case that would settle it.

## Output

The lane's final message, in this shape and nothing else:

1. **Ruling on each option** — A, B, C, D: cost, closes, leaves open, accepted or rejected, in one short paragraph each.
2. **The ruling** — the invariant the code will obey (one sentence), the constraint bounding it against over-correction (one sentence: what the tooltip will not do to defend the invariant), and the interface where a consumer meets the obligation (the declaration or event and the sentence it will carry).
3. **The mechanism** — the members it adds, renames, or removes (one-word names), and what each reads and does, at most a page.
4. **The door table** — one row per interval in the change sequences: the step, what consumer code can run inside it, what the mechanism reads after it, what the sequence does when the read fails. Cover `show`, `hide`, `fill`, the build, occupancy, release, discard, promotion, and the completed-event dispatch.
5. **The guide sentence** — the exact promise the `#### Tooltip` door paragraph makes, true under the mechanism.
6. **The proof shape** — the cases, each with the mutation that distinguishes it (the line whose removal reddens it) and the assertion that reads the difference; include the three counterexamples from the round-3 objective verdict (the final-release destruction, the teardown relocation, the promotion relocation).
7. **Bounds** — what the ruling does to `Placement` and `Dropdown`, to `HostSnapshot` (E13), and to E17; what it leaves for J-SNAPSHOT-SHARED or J-POPOVER; the size of the unit in files and in the tests it changes.
8. **Deviation state** — anything the lane could not rule on and why.

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself: the candidate names, the order of the door table, and the wording of the guide sentence. Stop and report when a subject file named in Context does not resolve, or when the ruling would require a change to `HostSnapshot` (name it as a dependency on J-SNAPSHOT-SHARED and rule on the rest).

## Acceptance criteria

1. Every option in § The question is ruled on with a cost, what it closes, and what it leaves open.
2. The ruling carries the three parts: invariant, constraint, interface.
3. The door table has a row for every interval the round-3 objective verdict's claim-8 table names, and for the completed-event dispatch.
4. The proof shape names a distinguishing mutation for each of the three round-3 counterexamples.
5. Every site is cited by symbol.

## Review evidence

This is a proposal: the retained record and the subject files are the evidence, and the Orchestrator reconciles the two lanes into the round-4 brief.
