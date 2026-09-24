# Design round APPEARANCE — the user's P7 and P8 ruling in Veneer

## Role and engine

Two lanes, blind to each other, each a clean context: the subjective lane, `planner` on Opus 5.5 (shape, naming, the
consumer's override contract, how the rulings read in the guide), and the objective lane, `analyst` on GPT-6 Astra
(correctness, what the CSS and the gates permit, the arithmetic, and the proofs). Each lane performs the reading and the
design directly, writes nothing, and spawns nothing.

## Objective

Propose the implementation of the user's appearance ruling as units with owned files, acceptance criteria, and proofs,
and rule on each design question below.

## Context

**The ruling** (Veneer `/home/user/veneer/ROADMAP.md` § Rulings, the APPEARANCE-RULING bullet, commit `712ae72`):

- P7, option C: colored text on the page takes the on-canvas tier in both modes, the role color mixed in oklab at 70
  percent with the text color, so role text clears 4.5 to 1 against the canvas.
- P8, option B: the 14-pixel base and the 600 heading weight stay, and the heading, `fs-*`, and `display-*` sizes scale
  down below 1200 pixels the way Bootstrap 5.3.8's responsive font sizes do.

**Terrain** (read these first; they carry every site with citations):
`/home/user/scaffold/.orkestrel/veneer/units/appearance-instruments/appearance-sites-grok.md` and
`appearance-terrain-grok.md` beside it. The Orchestrator sampled `src/styles/utilities/_color.scss` lines 11 to 12, the
`role-each` mixin's `--vn-color-<role>-emphasis` definition in `src/styles/_mixins.scss`, the `--vn-size-*` tokens in
`src/styles/_tokens.scss`, the `heading-size` function, the `legend` rule in `src/styles/elements/_fieldset.scss`, and
the `a` rule in `src/styles/elements/_a.scss`; each matched the terrain.

**Measurements** (Chromium 141, host; `appearance-instruments/oncanvas-probe-2.log.txt` and `oncanvas-probe-3.log.txt`,
contrast against Veneer's canvas, Veneer's body text as the mix partner):

| Role (mode's own value) | Dark raw | Dark mix 70 | Dark mix 80 | Light raw | Light mix 70 |
| --- | --- | --- | --- | --- | --- |
| primary (dark retunes to `oklch(0.7 0.15 233)`) | 6.83 | 8.64 | 8.01 | 7.11 | 9.81 |
| secondary (dark channels 108, 117, 125) | 3.77 | 5.90 | 5.11 | 7.58 | 10.28 |
| success | 3.58 | 5.67 | 4.89 | 4.95 | 7.68 |
| info | 3.02 | 5.07 | 4.30 | 5.86 | 8.64 |
| warning | 3.52 | 5.65 | 4.88 | 5.03 | 7.66 |
| danger | 2.75 | 4.76 | 3.95 | 6.42 | 9.28 |

Elements' own dark on-canvas tier mixes at 80 percent; at 80 percent info and danger miss 4.5 to 1 in dark. The ruling
fixes 70 percent in both modes, and Veneer's `--vn-color-<role>-emphasis` tokens already hold that 70 percent mix in both
modes.

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,names,architecture,documentation,writing,quality}.md`;
Veneer's `ROADMAP.md` § Tenets and § Rulings (Bootstrap baseline accounting: every emitted declaration maps to a recorded
Bootstrap value, a departure row, or an addition row; tokens: overriding a token group moves a resolved consumer
property). Skill: none. Guide: `/home/user/veneer/guides/veneer.md`.

**Host.** Veneer at `/home/user/veneer` (`712ae72`); Chromium 141. Read and grep; write nothing.

## Unknowns

Whether Chromium 141 resolves CSS typed arithmetic (a length divided by a length inside `calc()`); a lane that needs it
names the probe the Orchestrator runs rather than assuming either answer.

## Scope

Read-only. No file is owned.

## Execution

Rule on each question with a recommendation, its cost, and the evidence:

- **P7-1, the population.** Which selectors paint a role color as text on the page and take the tier: the `.text-<role>`
  utilities, the `.link-<role>` utilities, outline-button resting and disabled text, light-mode `.valid-feedback` and
  `.invalid-feedback` with their checked labels, and any other the terrain names. Rule `.text-light`, `.text-dark`, and
  surfaces that already read the emphasis tier in or out.
- **P7-2, the mechanism.** How `.text-<role>` reads the tier while `.text-opacity-*` keeps working (the terrain shows the
  opacity steps multiply `--bs-<role>-rgb` channels; Veneer's `a` rule already uses relative color syntax over a mix).
- **P7-3, the override contract.** Which token a consumer retunes to move `.text-primary` after the change, and what the
  existing retune proof (`tests/src/styles/utilities/color.test.ts`, the `--vn-color-primary-rgb` case) becomes.
- **P7-4, emphasis identity.** `.text-<role>` and `.text-<role>-emphasis` would resolve to the same mix. Accept it, or
  change one, with the reason.
- **P8-1, the formula.** Bootstrap's responsive rule over Veneer's own sizes: which sizes are fluid (Bootstrap leaves
  sizes at or under 1.25rem fixed), the fluid value below 1200 pixels, and the cap at and above it, stated per selector
  with its numbers at 390 and 1280 pixels.
- **P8-2, token retunability.** Tests retune `--vn-size-8` and the display tokens and expect the sizes to follow. Rule on
  how a fluid size keeps a retuned token moving it, and name the arithmetic the CSS allows.
- **P8-3, the ledger.** How the dropped `@media (min-width: 1200px)` rows and the `calc()` rows change in the guide.
- **Units.** Split the work into units with owned files, name the shared files and their order, the proofs each unit
  adds (an executed contrast assertion of at least 4.5 to 1 per role in both modes; a size reading per selector at 390
  and 1280 pixels), and the mutation that makes each proof fail.

## Output

A proposal: one ruling per question, then the units table (unit, engine, owned files, shared files, acceptance, proofs,
mutations), then risks. Cite `file:line`. No process diary.

## Deviation contract

Stop and report if the ruling as recorded cannot be implemented without a choice the user has not made; name the choice.

## Acceptance criteria

Every question carries a ruling with evidence; every unit names its owned files and its proofs.

## Review evidence

The terrain distillates and the measurement logs named in Context.
