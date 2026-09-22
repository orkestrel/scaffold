# Audit claims — F6 FOUNDATION in `@orkestrel/veneer` (worktree `/home/user/veneer-f6` over `07fc3c3`, 2026-09-22)

## Subject

The F6 unit, written by `opus` on Opus 5.5 from `/home/user/veneer-f6/tmp/units/f6-brief.md` in its own
worktree from `07fc3c3`: `ColorMode` writes `data-bs-theme` for either mode and restores the captured original on `destroy`; `tests/src/styles/theme.test.ts` gains the role-token matrix over four sites; the right-to-left twin, its plugin, its `?raw` import, and its proofs are gone (D5); the delegate's disabled-host refusal is gone (D4); the guards the terrain § D lists are Contract exports; the guide states the layer-order file, the important-utility contract with its executed escape and the Tailwind rule, the stripe factor, the engine-shape paragraph, and the mirror sentence by path; the shell styles the theme control through a class, `main` carries no global id, the caption opt-out class exists with its proof, and `TEXT_DL_CASES`' `muted` field is named for its property. The unit's report is
`/home/user/scaffold/tmp/audit/f6-report.md`.

## What this round decides

Whether F6 lands as one commit. A BROKEN claim in code sends the unit to a fix round; a BROKEN claim in prose
alone is corrected by the Orchestrator at landing. The worktree integrates into the main checkout
after this round, so a finding about integration order is outside the claims.

## Already established — do not re-run

- The foundation terrain `/home/user/scaffold/tmp/audit/f6-terrain.md` (§ D the guards; the RTL sites; the shell and showcase sites).
- The user's rulings D4, D5, D6 (`ROADMAP.md` § Rulings); the design verdict `/home/user/scaffold/tmp/audit/veneer-audit-verdict.md` claims 5, 8, 10, 11, 21, 24 and the reviewer findings F1 and F2 it carries.

## Review evidence

`/home/user/scaffold/tmp/audit/f6-audit-evidence.md`: the status output `f6-status.txt`, the diff
`/home/user/scaffold/tmp/audit/f6.diff` (against `07fc3c3`), the unit's report, the brief at
`/home/user/veneer-f6/tmp/units/f6-brief.md`, the terrain, and the Orchestrator's gate log
`/home/user/scaffold/tmp/audit/f6-gates.log.txt` when present.

## Numbered falsifiable claims

Before confirming any claim about a proof, name the mutation that would make the proof fail and say
whether its assertions distinguish that mutation from the passing case.

1. **`ColorMode` islands hold and restoration is exact.** `apply` writes `data-bs-theme` with the applied mode for either mode and never removes it to express `light`; construction captures the host's original value or absence and `destroy` restores exactly that; the boolean applied flag is gone; the three proofs in `tests/src/browser/ColorMode.test.ts` (light inside a dark island renders the light body colour; a root carrying `dark` reads `dark` after `apply('light')` and `destroy`; a root carrying nothing reads no attribute after `destroy`) exist, and the report records the red run for the island case with its failing count before the engine change (name the mutation each proof catches).
2. **The role-token matrix drives every role from the registry.** One `tests/src/styles/theme.test.ts` case mounts a light root, a nested dark island, a light island inside it, and a sibling outside, iterates every semantic role from the registry constant rather than a literal, reads `--vn-color-<role>-base` and the body text and surface tokens on each site, and asserts the light sites agree, the dark site differs on every mode-dependent token, and the sibling equals the root (mutation: one role's dark value equal to light must fail).
3. **No right-to-left support remains (D5).** The `veneer-logical-rtl` plugin and its `?raw` import are gone from `configs/src/vite.styles.config.ts`; the two `tests/setupStyles.test.ts` cases and the `tokens.test.ts` partition case are gone; every guide sentence naming a right-to-left cascade, a direction twin, or flipping is gone; the report's `dist/src/styles/` listing after `npm run build:src:styles` has no `index.rtl.css`; `grep -rn 'rtl' configs src tests guides` prints nothing outside a retained ledger row.
4. **The delegate acquires a disabled host (D4).** `src/browser/Delegate.ts` no longer refuses a host that is `disabled`, carries `.disabled`, or carries `aria-disabled="true"`; `tests/src/browser/Delegate.test.ts` proves acquisition and toggling on each of the three hosts in place of the refusal cases; the guide sentences describing the refusal are gone; any off-limits journey step or Button proof that pinned the refusal is reported as a stop with its line, not edited.
5. **The guards are Contract exports where the semantics match.** Each guard the terrain § D lists is replaced by the matching `@orkestrel/contract` export (`literalOf` for `isColorModeState`; `instanceOf` or `isInstance` on `HTMLElement` for `isButtonHost`, keeping the try/catch only where the installed export lacks it); nothing exported merely renames a Contract export; every consumer and the validators proof are updated; each retained guard (`isButtonEvent`, `isAppError` unless a match exists) carries one doc sentence naming why no Contract export serves; `grep -rn 'isColorModeState\|isButtonHost' src app tests` prints nothing unless the report records why a guard stayed.
6. **The guide's contracts are stated and the escape is executed.** § Tests names `src/styles/_tokens.scss` as the file declaring `@layer theme, reset, base, elements, components, utilities`; § Styles states the important-utility contract naming `[hidden]` in the reset layer and the calendar-picker indicator in the elements layer, the consumer escape as a fenced example that a styles proof executes (a scratch sheet through `scene.load` overriding `.row-gap-1` and reading the resolved value), and the rule that Bootstrap's declaration wins a shared Tailwind class name; § Tokens' stripe sentence names `$table-striped-bg-factor` retained for the baseline with the Elements identity phase ruling the value; § Surface carries the paragraph that `emitEvent` cannot express a cancelable event, that `bindEventMap` and `Delegate` are Button-shaped, and that B-COLLAPSE generalizes all three.
7. **The shell, the caption, and the description list changed as ruled.** `app/browser/styles/_shell.scss` styles the theme control through a class the showcase sets, never `header button`; `Showcase` gives `main` no document-global id and `tests/app/browser/Showcase.test.ts` reads the element through the mounted host; `src/styles/components/_table.scss` adds the caption opt-out class beside `.caption-top` with a proof in `tests/src/styles/components/table.test.ts`, a § Helper classes entry, and an Additions row returned as a patch; `TEXT_DL_CASES`' `muted` field is renamed for the property and element it pins in the form its siblings use, and the `dl` proof reads the renamed field.
8. **The mirror sentence states what the policy sweep proves.** The § Tests sentence says one proof at the same relative path under `tests/src/styles/` exists for every partial under `src/styles/`, enforced by `npm run test:policy`; no package instrument was added for it; `tests/setupPolicy.ts` is untouched.
9. **The gate chain is green.** Every `=== <gate> exit=` line in the Orchestrator's gate log reads `exit=0` (UNRESOLVED if the log is absent or lacks `=== gates done` when you read it).
10. **Scope is honest.** `git status --porcelain` lists only the files the brief's Owned list names (`src/browser/ColorMode.ts`, `src/browser/Delegate.ts`, `src/browser/validators.ts`, `src/browser/types.ts` where a guard's type demanded it, the four `tests/src/browser/*.test.ts` proofs, `configs/src/vite.styles.config.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/src/styles/tokens.test.ts`, `tests/src/styles/theme.test.ts`, `tests/src/styles/components/table.test.ts`, `tests/src/styles/elements/dl.test.ts`, `src/styles/components/_table.scss`, `app/browser/styles/_shell.scss`, `app/browser/Showcase.ts`, `app/browser/constants.ts`, `tests/app/browser/Showcase.test.ts`, `guides/veneer.md`); no journey file, `tests/setupPolicy.ts`, fixture, or `ROADMAP.md` changed; no probe remains under `tmp/probe/`.
11. **Prose holds.** No changed prose line contains a banned term in a banned sense (pattern `\b(?:should|simply|eas(?:y|ier|iest)|just|currently|via|utilize|leverage|robust|performant)\b|\b(?:e\.g\.|i\.e\.|etc\.)`, case-insensitive), and no count of a growable set is stated as a number.
12. **The unit is coherent.** `ColorMode` derives its restoration from the captured original with no second flag; the caption class and the shell class names sit in the Bootstrap family's vocabulary; the guide's § Styles reads as one contract (Bootstrap's `!important` as written, one escape, one Tailwind rule); no helper duplicates an installed `@orkestrel/test` or `@orkestrel/contract` export.

## Unknowns

- What the unit reported as a deviation or an unverified claim of its own; the report says, and a
  lane rules on each.

## The threshold

PASS when every claim is CONFIRMED, or every BROKEN claim is in prose and the Orchestrator corrects
it at landing. A BROKEN claim in code (1 to 8) opens a fix round. A lane that returns no verdicts
is a lane that did not run.
