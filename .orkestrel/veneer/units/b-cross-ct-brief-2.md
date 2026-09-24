# Unit THEME (`ct`), brief 2 — the `light` and `dark` role tiers (delivered mid-round)

## Role and engine

`opus` on Opus 5.5, the native subagent running THEME in `/home/user/veneer-ct`. This brief adds one row to the
round in flight; `b-cross-ct-brief.md` stands for everything else, and one report covers both.

## What changed and why

The B-MODAL portfolio verdict round (`/home/user/scaffold/.orkestrel/veneer/units/pv-overlays-lenses.json`,
workflow `wf_a70a7ba8-53a`) found the `alert-light` alert unreadable in light mode and the `alert-dark` alert
unreadable in dark mode (`role-alerts--light-1280.png` and `role-alerts--dark-1280.png` under
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/pv/frames/`). The cause is in
`src/styles/_tokens.scss`, which this unit owns: the derived tiers mix each role's base with the body text and
surface, which works for a saturated role and fails for the `light` and `dark` roles, whose base sits next to
the surface or the text. The release special-cases those two roles.

## Objective

- **V13 — the `light` and `dark` role tiers.** In each mode, the `--vn-color-light-*` and
  `--vn-color-dark-*` emphasis, subtle, and border tiers resolve to the values the release gives
  `--bs-light-*` and `--bs-dark-*`, read from `node_modules/bootstrap/dist/css/bootstrap.css`:
  - light mode: `--bs-light-text-emphasis` `#495057`, `--bs-dark-text-emphasis` `#495057`,
    `--bs-light-bg-subtle` `#fcfcfd`, `--bs-dark-bg-subtle` `#ced4da`, `--bs-light-border-subtle` `#e9ecef`,
    `--bs-dark-border-subtle` `#adb5bd`;
  - dark mode (`[data-bs-theme=dark]`): `--bs-light-text-emphasis` `#f8f9fa`, `--bs-dark-text-emphasis`
    `#dee2e6`, `--bs-light-bg-subtle` `#343a40`, `--bs-dark-bg-subtle` `#1a1d20`, `--bs-light-border-subtle`
    `#495057`, `--bs-dark-border-subtle` `#343a40`.
  Write them the way the token registry writes a gray step (the `--vn-gray-*` tokens), not as literals where a
  gray token holds the value; record any tier that has no gray token. Prove each resolved tier in both modes in
  the styles proofs, with a mutation that restores the derived mix for one role and reddens the case, and read
  the `alert-light` and `alert-dark` text-to-fill contrast in both modes against the release's.

## Scope

As round 1: `src/styles/_tokens.scss` and `tests/src/styles/tokens.test.ts` or `theme.test.ts` where the row
makes a case false. A guide sentence it makes false goes into `ct-shared.patch`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Acceptance criteria

The round-1 criteria, plus: the V13 proof exits 0 and reddens on its mutation.
