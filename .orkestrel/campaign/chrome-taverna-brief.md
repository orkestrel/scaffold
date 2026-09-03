# Unit C-taverna — bring taverna's surface to what the skills require

## Role and engine

`implementer` on Opus 5, native Claude Code subagent. Sole writer in
`C:\Users\mikes\WebstormProjects\taverna`. Perform the assignment directly and spawn nothing.

## Objective

Close the user's chrome list on taverna's workbench per `enterprise-bootstrap`, give repeating
rows names of their own, declare the parked-confirm transition table as application data, and
build the statechart harness page per `orkestrel-prove-journey`.

## Context

Skills, read in full first: `C:\Users\mikes\WebstormProjects\scaffold\.agents\skills\enterprise-bootstrap\SKILL.md`,
`references/inspection.md`, `references/inputs.md`;
`C:\Users\mikes\WebstormProjects\scaffold\.agents\skills\orkestrel-prove-journey\SKILL.md` and
`references/statechart.md`. Evidence: `.orkestrel/scaffold/absorb-consumers-report.md` § taverna
(no inline `style`, no `<style>`, no colour literal; Delete `btn-sm btn-outline-danger` at
`EntityContent.vue:627`, junction and member removes outline-danger, chat Retry outline-danger,
confirm accept already solid `btn-danger`, theme toggle `btn-outline-secondary`; the parked
confirm in `ConfirmHost.vue` as the statechart candidate; the shell and toolbar at
`AppShell.vue:128–222`). Terrain's precedent: `terrain-compliance-report.md` for the harness
page and the table module. Law: taverna's `AGENTS.md` and rules after the visit
(`policy/no-nested-functions` active over `app/**`).

Standing conditions: the visit is committed; `git status --porcelain` shows the user's
lockfile pair; never stage, restore, or rewrite it. `node_modules/@orkestrel/test` is the
registry's 0.0.12. Commit nothing; no `npm install`.

## Work

1. **Tiers.** Every action carrying consequence takes the solid tier: Delete, the junction and
   member removes, chat Retry, and the theme toggle where the skill's information-bearing rule
   reaches it; record each control's before and after class. Disabled destructive controls:
   neutralized, reason on `aria-describedby`.
2. **Row names.** Where entity or context rows share one accessible name, give each a name
   carrying the row's identity; record every changed name.
3. **The table module and the harness page.** Declare the parked-confirm transition table
   (open, approve, deny, and the events that leave the state unchanged) typed on the entity's
   unions in `app/browser`'s constants module; build the harness page per `statechart.md`
   § Build the harness a person watches with the route deep link and the demo step; report the
   chunk and the build size delta.
4. Run scoped gates over the owned files and `npm run build`; `npm test` as an observation.

## Scope

**Owned.** `app/**`, `guides/**`, `vite.config.ts` only for the harness route, recorded.
**Off-limits.** `tests/**`, `package.json`, `configs/**`, vendored files, the lockfile pair,
`.claude/settings.local.json`.

## Output

Write `tmp/units/chrome-taverna-report.md` and return it: each change with before and after;
every changed accessible name; the harness route and attributes; the bundle delta; gate
readings; `git diff --stat`; `git status --porcelain`; claims not closed.

## Deviation contract

Stop and report when a change needs another package or an `app/core` change you judge out of
scope, or when a gate is red outside the three items. Decide and record copy and placement.

## Acceptance criteria

1. A grep over `app/**` for `*-dark` component classes and `style=` returns only named
   exemptions; every destructive control is solid when armed and neutralized when disabled.
2. Repeating rows carry names of their own.
3. The harness page mounts on the constants module's table and publishes every attribute from
   the map; scoped gates and the build are green.
