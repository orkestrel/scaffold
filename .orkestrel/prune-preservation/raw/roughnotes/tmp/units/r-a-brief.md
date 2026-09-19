# Unit R-A — the roughnotes interface announces its menu state and names its controls distinctly

## Role and engine

`opus` on Opus 5, a native Claude subagent with `Read`, `Grep`, `Glob`, `Edit`, `Write`, and `Bash`,
the sole writer in the `C:/Users/mikes/WebstormProjects/roughnotes` checkout. You open this brief
yourself; every later section is written for you.

## Objective

Make the roughnotes application's interface carry the semantics the journey layer reads: the
compact menu trigger announces its expanded state, and a listing entry, the footer, and a screen's
own action each answer to a name no other reachable control on that screen shares. Repair the
application, not the tests; update only the journey assertions that name a control you renamed.

## Context

**Evidence.** The design verdict of the scaffold campaign
(`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/design-verdict.md`, ruling D26)
assigns these two repairs to the application; scaffold's `ROADMAP.md` rows 34 and 37 record them:

- Row 37: "Author `aria-expanded` on the roughnotes menu trigger. The trigger announces no state, so
  its disclosure cannot be settled through `waitForState` and every journey touching it falls back
  to reading the framework's own classes." The trigger is the offcanvas toggle in
  `app/browser/App.vue` (`data-bs-toggle="offcanvas"` at `:125`). The hand-rolled settle it forces
  is `tests/app/browser/setup.ts:723` (`readMenuSettled`), which resolves `#site-menu` by id and
  reads Bootstrap's `show`, `showing`, and `hiding` classes.
- Row 34: "Give a listing entry and the footer distinct accessible names in the roughnotes
  application, and distinguish a screen's own action from the masthead action that shares its
  name. The journey pass routed around the collision rather than resolving it." The routing is in
  `tests/app/browser/integration.test.ts`, where a journey targets through a region or a role to
  avoid the shared name; find each such site by reading the journeys that name `clickAccessibleWithin`
  or a region before a bare name, and read the retained field-pass record at
  `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/retained/field-pass-journey-skill.md`
  for the collision it recorded.

The installed journey layer is `@orkestrel/test` 0.0.17 (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts`):
`waitForState(name, state, options?)` and `waitForState(role, name, state, options?)` settle on an
announced state (`aria-expanded`, `aria-pressed`, `aria-selected`, `aria-checked`, `aria-current`,
`aria-disabled`, `open`), and `readStates(element)` reads them; `resolveAccessible(name)` refuses a
name that answers for more than one reachable element with the `ambiguous` voice. Read the
declaration before touching markup.

Bootstrap 5.3 (`node_modules/bootstrap/js/dist/offcanvas.js`) toggles `aria-expanded` on a trigger
only where its own code does so; measure it rather than assume it: mount the shell in a browser
test, open the menu through the trigger, and read the trigger's `aria-expanded` before and after.
Where Bootstrap already writes it, the repair is to assert it and delete nothing; where it does not,
author the attribute and keep it true to the offcanvas's shown and hidden events.

**Law.** This checkout's `AGENTS.md` names the sibling scaffold checkout as its authority: read
`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, then
`C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/browser.md`, `application.md`, `tests.md`,
`names.md`, `writing.md`, and `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`
§ Deviation protocol. Skill: `orkestrel-prove-journey` at
`C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-prove-journey/` (read `SKILL.md`
→ Apply the journey laws and `references/layer.md` → The named bans and → The failure voices before
editing a journey line). A fleet target carries no rules or skills of its own.
Guide: `guides/README.md` (the product guide: the route table, the `Frame`, `Entry`, and
`ShellGroup` shapes, and the vocabulary each screen speaks). Take every visible name from that
guide's vocabulary; invent no copy.

**Installed primitives.** `@orkestrel/test` 0.0.17; `@orkestrel/scaffold` 0.0.74 (vendored files
restored by `repair`; never edit one — `scaffold audit` lists them).

**Host.** Windows 11; Bash; a browser test runs through `npm run test:app:browser` (Playwright
Chromium, installed); the journey axis runs through `npm run test:journey`. Edit through your editor
tools so no non-ASCII code point round-trips through cp1252.

**Measurements.** Baseline: the checkpoint the dispatch message names, carrying the scaffold 0.0.74
visit with `npm test` in the state the dispatch message records. Take `npm run test:app:browser`
before any edit and record its reading.

**Control identifiers.** `R-A-C1` through `R-A-C4`. Name a test for what it proves, never for the
control label.

**Standing conditions.** The journey suite reads the hand-rolled settle helper until unit R-B
replaces it; leave `tests/app/browser/setup.ts` alone except where a renamed control's name
constant lives there (`COMMIT_CONTROL`, `CONTENT_CONTROL`, `SELECTED_CONTROL`, `UNSELECTED_CONTROL`,
`SUMMARY_CONTROL`, `MENU_UNREACHABLE`, `CLOSE_UNREACHABLE` and their neighbours at `:255-300`).
`.orkestrel/` in this checkout is a prior campaign's retained folder; leave it alone.

## Unknowns

- Whether Bootstrap writes `aria-expanded` on an offcanvas trigger on this version. Measure it
  first (the browser test named under Context) and report the reading; the repair's shape follows
  from it.
- Which controls collide. Derive the set by running the resolver: a browser test that mounts each
  route the product guide's table names and calls `resolveAccessible` on each name a journey uses,
  reporting every `ambiguous` refusal. That reading is the collision list; report it in full and
  repair every member.

## Scope

**Owned.** `app/browser/**` (components, views, the shell), `app/core/**` only where a name constant
the interface reads lives there, `tests/app/browser/integration.test.ts` (the lines naming a
control you renamed, and the new assertions), `tests/app/browser/setup.ts` (the name constants
alone), `tests/app/browser/App.test.ts` and `components/**` tests where a renamed control is
asserted.

**Shared (report-only).** `guides/README.md` — where a repair changes a name the guide states,
return the exact patch in your report rather than editing the guide.

**Off-limits.** Every vendored file (`scaffold audit` names them; `.claude/rules/**`, `tests/policy.test.ts`,
`tests/setupPolicy.ts`, `tests/config.test.ts`, `configs/policy.ts`, `configs/helpers.ts`, the
skills), `vite.config.ts`, `configs/**`, `package.json`, `tests/setupBrowser.ts`, `.orkestrel/**`.

**What asserts the state this change ends.** `tests/app/browser/integration.test.ts` (the journeys
that drive the menu and the renamed controls), `tests/app/browser/App.test.ts`, the component
tests under `tests/app/browser/components/`.

**Tools and limits.** All of your tools. No commit, push, install, or `git checkout`,
`git restore`, `git stash`, `git reset`, `git clean`. Format only your owned files with
`./node_modules/.bin/oxfmt.cmd --config .oxfmtrc.json --write <files>`; lint them with
`./node_modules/.bin/oxlint.cmd --config .oxlintrc.json --deny-warnings <files>`; never run the
tree-wide `format` or `lint --fix`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `tmp/units/r-a-report.md`: the Bootstrap `aria-expanded` measurement; the collision list the
resolver reported with each member's repair; each control's command with its red and green
readings; the guide patch if any; the gate table (scoped format and lint, `npm run check`,
`npm run test:app:browser`, `npm run test:journey`); the claims you flag as least certain; the diff
stat and `git status --short`. No process diary.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol (the copy vendored in this checkout). You
settle the attribute's wiring (a Vue binding to the offcanvas's shown and hidden events, or a
Bootstrap-written attribute asserted as is), the label mechanism for a renamed control
(`aria-label`, visible text, or a region), and where a new assertion sits. Stop and report if a
repair needs new visible copy the product guide does not supply, if a collision can be resolved
only by a product decision (which screen owns the shared verb), or if a vendored file must change.

## Acceptance criteria

Cheap first.

- **R-A-C1.** `grep -n "aria-expanded" app/browser/App.vue` matches the menu trigger, or the
  measurement shows Bootstrap writes it and a browser test asserts it; either way a browser test
  reads `aria-expanded` `false` before the open and `true` after, through `readStates` or
  `waitForState`, red before the repair and green after.
- **R-A-C2.** The resolver reports no `ambiguous` refusal for any name a journey uses on any route
  the product guide's table names; the collision test is red before the repair (naming each
  collision) and green after.
- **R-A-C3.** `npm run test:app:browser` exits 0 with its totals line, and `npm run test:journey`
  exits 0 under every variant (the hand-rolled settle still drives the menu; only names moved).
- **R-A-C4.** Scoped format and lint over owned files exit 0; `npm run check` exits 0.

**Observations, not criteria.** `npm run test:policy` and `npm run test:config` readings; the whole
`npm test` chain.

## Review evidence

The actual diff and the actual `git status --short` output, in the report.
