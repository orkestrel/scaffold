# Unit J-ORACLE-FIX-OFFCANVAS-DESIGN — when a dismissing backdrop press keeps its default action

## Role and engine

This is a design round with two blind lanes on this one brief:
- the subjective lane is `planner` on Opus 5.5, a native read-only subagent;
- the objective lane is `analyst` on GPT-6 Astra, through `codex exec` in a read-only sandbox.

Neither lane sees the other's answer. The Orchestrator reconciles them and rules.

## Objective

Rule the rule by which `Offcanvas`'s backdrop press decides to cancel its `mousedown` default action. The rule must end with focus where Bootstrap 5.3.8's ends after the same press, in every placement a consumer can reach through the documented surface, and state every limit honestly.

## Context

**The seam's history.** Four rounds. Every path under `units/` is in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/`.
1. **Round 1** (`eaf3908`) compared the document's `activeElement` before and after the synchronous `hide()`. It missed a move inside one shadow root (`units/j-oracle-fix-offcanvas-audit-verdict.md`).
2. **Round 2** (`dcff520`) compared the panel's root's. It missed a move inside a shadow root the panel carries (`units/j-oracle-fix-offcanvas-audit-2-verdict.md`).
3. **Round 3** (`43fa73d`) compared the deepest focused element through open roots. It missed two moves (`units/j-oracle-fix-offcanvas-report-3.md`, `units/j-oracle-fix-offcanvas-round-3-ruling.md`):
   - one inside a closed shadow root the panel carries;
   - one outside a shadow root that holds the panel, reachable because `Isolation` does not make the outside inert (J-ISOLATION-SHADOW).
4. **Round 4** measured a capture `focusin` listener on the document during the hide (`units/j-oracle-fix-offcanvas-report-4.md`, `-4-focusin-probe.log.txt`). It fires for moves that cross a shadow boundary, and not for a move inside one shadow root, open or closed.

**What the rule is for.**
- Bootstrap's backdrop hides the panel on `mousedown`. The press's default action moves focus to the body. Bootstrap's data API then returns focus to the trigger at `hidden.bs.offcanvas`.
- Veneer's hide releases the isolation synchronously, inside the listener. The isolation focuses its trigger at once: the `trigger` passed to `show`, or else the element focused at construction (`src/browser/Isolation.ts`, `destroy`).
- The press's default action, which runs after the listener, would then move focus on to the body.
- The census (`units/j-oracle-census-0925.md`) and round 1's guard rows fix Bootstrap's end state. Focus ends on the trigger after a dismissing press. It ends on the body after these four:
  - a prevented hide;
  - a trigger the platform cannot focus;
  - a press during the slide-out;
  - a static backdrop.

**The candidates.** You may propose another.
- **A, a state read plus an event.** Round 3's deep read of the focused element through open roots, or'd with a document `focusin` during the hide. The closed-root move stays a documented limit, because a closed root hides focus from the page by design.
- **B, the trigger's own focus.** `Offcanvas` keeps the element its isolation returns focus to. It cancels when that element matches `:focus` after the hide and did not before. `:focus` reads the element itself, whatever root holds it, closed roots included. Rule on these:
  - the fallback trigger `Isolation` reads when `show` gets none, which retargets to a shadow host (J-ISOLATION-SHADOW);
  - a hide listener that moves focus somewhere other than the trigger.
- **C, always cancel a dismissing press.** Rule this against the guard rows, which read Bootstrap's focus when the press returns, not only at settle.

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- These rules, under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `browser.md`, `patterns.md`, and `quality.md` § Rounds and verdicts.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E24, § E28, § E30, and § E35.
- Skill: none. Guide: `guides/veneer.md` § Offcanvas.

**Source.** Veneer `unit/oracle-fix-offcanvas` at `43fa73d`, in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas`: `src/browser/Offcanvas.ts` (`show` and `#press`), `src/browser/Isolation.ts`, and `tests/src/browser/Offcanvas.test.ts`, with the round-3 cases and the guard rows.

**Host.** Windows 11. Both lanes are read-only. The Astra lane may run read-only `git` commands.

**Measurements.** The four rounds' readings, cited above. Name the probe the next unit must run first for the candidate you choose.

**Control identifiers.** None.

**Standing conditions.** J-ISOLATION-SHADOW owns `Isolation`'s shadow-boundary walk and its trigger fallback. A rule that needs either changed names that unit as its prerequisite.

## Unknowns

- Whether `:focus` on a trigger inside a closed shadow root reads `true` from outside that root. A probe settles it. Name the probe.

## Scope

**Owned.** None. The round is read-only.

**Off-limits.** Every file for writing.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message is your proposal, with these sections:
1. **The ruling:** the rule, with `file:line` evidence at `43fa73d`.
2. **Its reading in every placement** the four rounds found, and in the four guard rows.
3. **The limits it states,** each with its reachability.
4. **The unit:** its first probe, its owned files, and its proofs, including whether `readFocusedElement` stays.
5. **What you could not settle.**

## Deviation contract

When this brief or a report disagrees with the code, the code wins. Name the disagreement in section 5 and carry on. Stop only when the law contradicts itself so that no ruling is possible.

## Acceptance criteria

1. The ruling names its evidence.
2. Every placement and guard row has a reading.
3. Every citation resolves.

## Review evidence

The four rounds' reports, the ruling, the probes and their logs, and the source at `43fa73d`.
