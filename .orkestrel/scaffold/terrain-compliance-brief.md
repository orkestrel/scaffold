# Unit T1 — bring terrain's application to what the skills require

## Role and engine

`implementer` on Opus 5, native Claude Code subagent. Sole writer in
`C:\Users\mikes\WebstormProjects\terrain`. Perform the assignment directly and spawn nothing.

## Objective

Make terrain's application and suite follow `enterprise-bootstrap` and `orkestrel-prove-journey`
where the reference suite recorded that only an application change could: the destructive
action's chrome, unambiguous row names, the statechart harness page and its gate, the written
artifact per variant, the setup proofs the audit asks for, and guide parity.

## Context

Skills: `C:\Users\mikes\WebstormProjects\scaffold\.agents\skills\enterprise-bootstrap\SKILL.md`
(the tiers table and the destructive rule; `references/inspection.md`; `references/inputs.md`)
and `C:\Users\mikes\WebstormProjects\scaffold\.agents\skills\orkestrel-prove-journey\SKILL.md`
with `references/statechart.md` (the harness a person watches and its gate) and
`references/decide.md` (the rendered artifact). Read every one in full first. Law: terrain's
`AGENTS.md` and its rules; the `policy/no-nested-functions` lint rule is active over `src/**`
and `app/**`. Prior reports under `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\scaffold\`:
`terrain-reference-report.md`, `terrain-successor-report.md`, `fix-terrain-report.md`,
`fix-terrain-successor-report.md`, `visit-terrain-report.md`.

Standing conditions: `git status --porcelain` shows a staged `package-lock.json` change by the
user; never stage, restore, or rewrite it. `node_modules/@orkestrel/test` is the campaign's
0.0.12 build staged with `npm install --no-save`; do not run `npm install`. Commit nothing.

Variant and flag names: `VITE_VARIANT` (`light-1280`, `dark-1280`, `light-390`, `dark-390`),
`VITE_CAPTURE=true`. Run: `npx vitest run --config vite.config.ts --no-cache --reporter=dot
--project app:browser <file>`.

## Work

1. **The destructive action.** The armed Delete renders `btn-outline-danger` and reads 4.045
   against the dark themes, under the 4.5 text bar. Give it the solid `btn-danger` the skill's
   tiers table fixes for a destructive action, keep the confirmation the surface already has,
   and re-measure it in the matrix family in every variant (it clears 4.5 or the report says
   why). Apply the same rule to any other destructive control the surface renders.
2. **Row names.** `Select building for deletion` is every row's accessible name, so the layer
   refuses it as ambiguous past one row. Give each row's checkbox a name that carries the row's
   own identity (its location and building numbers, or its address once one exists), keep the
   column header's name, and prove in the suite that a two-row schedule resolves each row.
3. **The statechart harness.** Build the harness page `statechart.md` § Build the harness a
   person watches describes, in `app/browser`, mounted on the same `DELETE_TRANSITIONS` and
   `DELETE_SCENARIOS` the suite declares (move the table to a module both can import if the
   test setup is the wrong home for a page; `.claude/rules/tests.md` and `AGENTS.md` decide the
   placement and you record it): a play control per transition, play-all, the state badge, the
   event log, the `role="status"` announcer, `STATECHART_ATTRIBUTES` written from the map on the
   root, the rows, and the state element, the deep link from the route, and the demo step. Gate
   it per § Gate the harness from the browser project.
4. **The rendered artifact.** Write one text file per variant under `tmp/` from the run:
   `describeTree`, `describeFocus`, the matrix family's resolved-style rows, the journal's steps
   and output, and the capture filenames, per `decide.md` § The rendered artifact.
5. **Setup proofs.** `npx scaffold audit` asks for `tests/setup.test.ts` and
   `tests/setupBrowser.test.ts`, each covering the module of the same name; write them for the
   behaviour those modules own.
6. **Guide parity.** Bring `guides/README.md` (and any guide the repository keeps for the app)
   to the changed test surface and the harness route.
7. Run the four variants, the four capture runs, the new harness gate, and the scoped gates
   (`npm run format:check`, `npm run lint:check`, `npm run check`), then `npm run test:app` as an
   observation.

## Scope

**Owned.** `app/**`, `tests/**` except the vendored `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `tests/config.test.ts`, `guides/**`, `vite.config.ts` only if a route or
project needs it and the change is recorded. **Off-limits.** `package.json`, the lockfile,
`configs/**`, `.claude/**`, `AGENTS.md`, `CLAUDE.md`.

## Output

Write `tmp/units/terrain-compliance-report.md` and return it: each item's change with the proof
that pins it (red then green where a behaviour changed), the Delete readings per variant, the
harness route and gate reading, the artifact filenames, the run summaries, `git diff --stat`,
`git status --porcelain`, claims not closed.

## Deviation contract

Stop and report when a change needs a package other than terrain, when the harness cannot mount
on the declared table without a second table, or when a run is red outside the seven items.
Decide and record placement, names, and wording.

## Acceptance criteria

1. The armed Delete is solid and measured in every variant; each row resolves by its own name.
2. The harness mounts on the declared table, publishes every attribute from the map, and its
   gate passes through the interface.
3. One artifact per variant exists after a run; the two setup proofs exist and pass.
4. All runs and scoped gates green; the guide names the changed surface.
