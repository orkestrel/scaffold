# Unit C-lloyds — bring lloyds' surface to what the skills require

## Role and engine

`implementer` on Opus 5, native Claude Code subagent. Sole writer in
`C:\Users\mikes\WebstormProjects\lloyds`. Perform the assignment directly and spawn nothing.

## Objective

Close the user's enumerated chrome list on lloyds' primary surface per `enterprise-bootstrap`,
give each row an accessible name of its own, declare the Delete transition table as application
data, and build the statechart harness page per `orkestrel-prove-journey`, so the journey unit
that follows resolves stable names and gates a real page.

## Context

Skills, read in full first: `C:\Users\mikes\WebstormProjects\scaffold\.agents\skills\enterprise-bootstrap\SKILL.md`
(the tiers table, the destructive rule and its ladder, the dark-surface rule, the styling
ladder), `references/inspection.md`, `references/inputs.md`;
`C:\Users\mikes\WebstormProjects\scaffold\.agents\skills\orkestrel-prove-journey\SKILL.md`,
`references/statechart.md` (the table lives in the application's constants module once a page
ships; the page and the test setup import it; every attribute from `STATECHART_ATTRIBUTES`).
Evidence: `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\scaffold\absorb-consumers-report.md`
§ lloyds (`navbar-dark` at `Toolbar.vue:58`; `btn-outline-light` for Import, Export, Template,
theme, and idle Delete on the `bg-dark` rail; armed Delete `btn-danger` with no confirmation;
inline `style` widths at `BuildingTable.vue:431,443,457`; per-row ZIP retry
`btn-outline-danger`; `.form-check-input-danger` custom rules in `main.scss`). Terrain's
precedent for the harness and the table module: `terrain-compliance-report.md` under the same
folder (read it for the page's shape, the route, and the placement it recorded). Law: lloyds'
`AGENTS.md` and rules after the visit (the `policy/no-nested-functions` rule is active over
`app/**`).

Standing conditions: the visit is committed; `git status --porcelain` shows the user's
lockfile pair (`D  package-lock.json`, `?? package-lock.json`); never stage, restore, or
rewrite it. `node_modules/@orkestrel/test` is the registry's 0.0.12. Commit nothing; no
`npm install`.

## Work

1. **Dark rail.** Remove `navbar-dark`; scope the rail's theme with `data-bs-theme="dark"` where
   the rail must stay dark, per the skill's rule on `*-dark` component classes.
2. **Actions that carry consequence take a solid fill.** Import, Export, Template, and the theme
   toggle leave the `btn-outline-light` family on the dark rail for the solid tier the tiers table
   fixes; record each control's before and after class.
3. **The destructive action.** Idle Delete: not full danger saturation while disabled, with the
   reason on `aria-describedby`. Armed Delete: solid `btn-danger` plus the confirmation ladder
   from `bootstrap-reference.md` (the surface has none today); prefer undo where the skill says
   so and record the choice. The per-row ZIP retry is not destructive: give it the tier its
   consequence earns and record it.
4. **Style escapes.** Replace the three inline `style` widths with utilities or a token rule that
   cites its instrument reading; keep `.form-check-input-danger` only where
   `inspection.md` § When an authored rule is already earned supports it, else replace it with
   the shipped class.
5. **Row names.** Give each row's checkbox a name carrying that row's identity (its location and
   building numbers, or its address once one exists) so two rows resolve two names; keep the
   column header's name.
6. **The table module and the harness page.** Declare the Delete transition table
   (`StateTransition` rows typed on the entity's state and event unions) in `app/browser`'s
   constants module; build the harness page per `statechart.md` § Build the harness a person
   watches, with the route deep link and the demo step; report the chunk it lands in and the
   build size delta.
7. Run scoped gates over the owned files (`npm run format:check`, `npm run lint:check`,
   `npm run check`) and `npm run build`; `npm test` as an observation.

## Scope

**Owned.** `app/**`, `guides/**` for the harness route and changed chrome, `vite.config.ts` only
where the harness route needs it and the edit is recorded. **Off-limits.** `tests/**` (the
journey unit owns them), `package.json`, `configs/**`, vendored files, the lockfile pair.

## Output

Write `tmp/units/chrome-lloyds-report.md` and return it: each item's change with before and
after; every changed accessible name (the journey unit targets from this list); the harness
route and the attribute it publishes; the bundle delta; the gate readings; `git diff --stat`;
`git status --porcelain`; claims not closed.

## Deviation contract

Stop and report when a change needs a package other than lloyds, when the table cannot be typed
on the entity's unions without an `app/core` change you judge out of scope, or when a gate is red
outside the six items. Decide and record copy, class choices, and placement.

## Acceptance criteria

1. A grep over `app/**` for `navbar-dark`, `dropdown-menu-dark`, `btn-close-white`, and
   `style=` returns only named exemptions.
2. Every destructive control is solid when armed, neutralized when disabled, and laddered.
3. Each row's checkbox name interpolates the row's identity.
4. The harness page mounts on the constants module's table and publishes every attribute from
   the map; scoped gates and the build are green.
