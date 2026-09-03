# Unit C-supervisor — bring supervisor's operator surface to what the skills require

## Role and engine

`implementer` on Opus 5, native Claude Code subagent. Sole writer in
`C:\Users\mikes\WebstormProjects\supervisor`. Perform the assignment directly and spawn nothing.

## Objective

Close the user's chrome list on supervisor's operator surface per `enterprise-bootstrap`, rule
on its authored CSS against the instruments, give repeating rows names of their own, declare the
Stop transition table as application data, and build the statechart harness page per
`orkestrel-prove-journey`, keeping the legacy Halfmoon skin.

## Context

Skills, read in full first: `C:\Users\mikes\WebstormProjects\scaffold\.agents\skills\enterprise-bootstrap\SKILL.md`,
`references/inspection.md` (§ When an authored rule is already earned decides every custom
rule), `references/inputs.md`;
`C:\Users\mikes\WebstormProjects\scaffold\.agents\skills\orkestrel-prove-journey\SKILL.md` and
`references/statechart.md`. Evidence: `.orkestrel/scaffold/absorb-consumers-report.md`
§ supervisor (authored `styles/{tokens,focus,pane,status}.css` with `.feed`, `.rail-pane`,
`.status` and its state classes; focus ring width 0 at `tokens.css:25`; Stop arms
`btn-outline-danger` to `btn-danger`; user remove outline-danger at `UsersView.vue:104` and solid
at `UserPanel.vue:361`; Retry outline-danger in `HistoryView`, `RunList`, `SetupPanel`; theme
toggle `btn-sm btn-outline-primary` with no persistence; `halfmoon.min.css` at `main.ts:1–3`).
Terrain's precedent: `terrain-compliance-report.md`. Law: supervisor's `AGENTS.md` and rules
after the visit (`policy/no-nested-functions` active over `src/**` and `app/**`).

Standing conditions: the visit is committed; commit nothing; no `npm install`.
`node_modules/@orkestrel/test` is the registry's 0.0.12. The user's rulings: keep
`halfmoon.min.css` and no `data-bs-core="modern"`; theme persistence is not in scope (record
retain).

## Work

1. **Tiers.** Stop, user remove, and every Retry take the tiers the table fixes (solid when the
   action carries consequence; disabled destructive neutralized with the reason on
   `aria-describedby`); record before and after per control.
2. **Authored CSS.** For each rule in `tokens.css`, `focus.css`, `pane.css`, `status.css`: keep it
   only where an instrument reading earns it under `inspection.md` § When an authored rule is
   already earned, citing the instrument, the bar, and the value; replace the rest with shipped
   classes. Close the focus ring width of 0 with a token rule that cites its reading, or record
   the exclusion with the reading.
3. **Row names.** Where run, history, or user rows share one accessible name, give each a name
   carrying the row's identity; record every changed name.
4. **The table module and the harness page.** Declare the Stop transition table (idle, armed,
   and the events that leave the state unchanged) typed on the entity's unions in
   `app/browser`'s constants module; build the harness page per `statechart.md` with the route
   deep link and the demo step; report the chunk and the build size delta.
5. Run scoped gates over the owned files and `npm run build`; `npm test` as an observation.

## Scope

**Owned.** `app/**`, `guides/**`, `vite.config.ts` only for the harness route, recorded.
**Off-limits.** `src/**`, `tests/**`, `package.json`, `configs/**`, vendored files,
`.claude/settings.local.json`, the Halfmoon import.

## Output

Write `tmp/units/chrome-supervisor-report.md` and return it: each change with before and after;
the authored-CSS ruling per rule with its reading; every changed accessible name; the harness
route and attributes; the bundle delta; gate readings; `git diff --stat`;
`git status --porcelain`; claims not closed.

## Deviation contract

Stop and report when a change needs `src/**` or another package, or when a gate is red outside
the four items. Decide and record copy and placement.

## Acceptance criteria

1. Every destructive control is solid when armed and neutralized when disabled; the tiers are
   recorded per control.
2. Every surviving authored rule cites its instrument reading; the focus ring is closed or
   excluded with a reading.
3. The harness page mounts on the constants module's table and publishes every attribute from
   the map; `main.ts` still imports `halfmoon.min.css`; scoped gates and the build are green.
