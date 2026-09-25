# Unit J-PLACEMENT-141-FIX-DESIGN — how a dropdown menu is rendered before it is placed

## Role and engine

This is a design round with two blind lanes on this one brief:
- the subjective lane is `planner` on Opus 5.5, a native read-only subagent;
- the objective lane is `analyst` on GPT-6 Astra, through `codex exec` in a read-only sandbox.

Neither lane sees the other's answer. The Orchestrator reconciles them and rules.

## Objective

Propose the change that makes a dropdown menu anchor on Chromium 141, when it sits inside a scroller and a trusted pointer press starts its show. The change must keep every Chromium 153 reading and every Bootstrap-parity behaviour. Then propose the unit that makes it.

## Context

**Evidence.** Every path under `units/` is in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/`.
- `units/j-placement-141-diagnosis-verdict.md`, especially § The Chromium 141 reading. On Chromium 141, the failure needs two conditions together: a menu placed while its cascade still hides it (`display: none` until `.show`), and a trusted pointer press before the show. Removing either one anchors the menu. The failure does not depend on the menu's DOM ancestry, the area, the fallback, or a later restyle.
- The probe `units/j-placement-141-probe.test.ts`, its brief `units/j-placement-141-probe-brief.md`, and the styles session's Chromium 141 run: its `units/native141/j-placement-141-probe-141.log.txt`, at scaffold `da4d6fa4`.
- The code on Veneer `main` at `d33b27c`, which holds J-SAMEWAY-ENGINES-B. Read it at `C:/Users/mikes/WebstormProjects/veneer`:
  - `src/browser/Dropdown.ts`: `show`, `#place`, and the order of the `show` token write and the placement;
  - `src/browser/Placement.ts`: its construction, the promotion, and `update`;
  - `tests/src/browser/Dropdown.test.ts` and `Placement.test.ts`.

**The candidates the diagnosis names.** You may propose a third.
- **A:** `Dropdown` writes the menu's `show` token before `Placement` promotes and anchors the menu, so the menu is rendered when it is placed.
- **B:** `Placement` refuses to anchor an element it cannot measure, and anchors it when it renders.

**What the change must keep.**
- Bootstrap 5.3.8's dropdown event order and state. J-ORACLE records it: `units/j-oracle-census-0925.md` § Rulings, the dropdown rows, and the recording through `recordPluginOracle`.
- E24's takeover doors and returns. Every write the change reorders keeps its door and its record.
- E35's rule, which J-RELEASE-POPUPS brings to these files next: a take that can run consumer code is held before it runs. Say how the proposed order sits under that rule.
- E32: `Dropdown` completes synchronously, as Bootstrap's does. Its `shown` event waits for no motion.
- The J-ORACLE-FIX-PLACEMENT finding: the menu's `data-popper-placement` carries the full placement, the side and the alignment, as Bootstrap's does. Say whether the fix and that finding belong in one unit.

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- These rules, under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `architecture.md`, `patterns.md`, `browser.md`, and `quality.md` § Probes before arguments.
- `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md` § E18, § E24 with every amendment, § E32 with its amendments, and § E35 with its amendment.
- Skill: none. Guide: `guides/veneer.md` § Dropdown and § Placement.

**Host.** Windows 11. Both lanes are read-only. The Astra lane may run read-only `git` commands. The Opus lane has Read, Grep, and Glob only.

**Measurements.** The ones cited, and no new ones. The design names the probe the unit must run first.

**Control identifiers.** The probe's variant names (`baseline`, `display`, `noClick`, and the others) are control identifiers.

**Standing conditions.** J-RELEASE-CORE is in audit, and it does not touch these files. J-RELEASE-POPUPS, which follows it, does.

## Unknowns

- Why a trusted press is one of the two conditions. Offer a hypothesis if the evidence supports one, and name the probe that would test it. Do not rest the design on it.

## Scope

**Owned.** None. The round is read-only.

**Off-limits.** Every file for writing.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message is your proposal, with these sections:
1. **The ruling:** A, B, or a third, with `file:line` evidence at `d33b27c`.
2. **The exact order of writes and takes** in `Dropdown.show` after the change, with each door and record named.
3. **What it keeps and what it risks:** Bootstrap parity, E24, E35, and the Chromium 153 readings.
4. **The unit:** its owned files, its red-first proofs (a case in `Dropdown.test.ts` that reads the menu's gap on this host, and the probe's `baseline` variant for the styles session's Chromium 141 run), and whether J-ORACLE-FIX-PLACEMENT joins it.
5. **What you could not settle,** and the probe that would settle it.

## Deviation contract

When this brief or the evidence disagrees with the code, the code wins. Name the disagreement in section 5 and carry on. Stop only when the law contradicts itself so that no ruling is possible.

## Acceptance criteria

1. The ruling names its evidence.
2. The order of writes names every door and record it moves.
3. Every citation resolves.

## Review evidence

The diagnosis verdict, the probe and its Chromium 141 log, and the source at `d33b27c`.
