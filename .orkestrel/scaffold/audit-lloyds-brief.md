# Audit — lloyds' surface and suite after the skills

## Role and engine

Two lanes on one brief, blind to each other: `reviewer` on Opus 5 (subjective: chrome, copy,
shape, design fit against `enterprise-bootstrap`; the suite's voice against
`orkestrel-prove-journey`) and the objective lane on Cursor Grok through the `grok` bridge,
standing in for Sol (correctness, constraints, what the code and the layer permit). Read-only.
Attempt to refute every claim; `CONFIRMED` needs the attack that failed, `BROKEN` the line and
the smallest fix, `UNRESOLVED` what would settle it.

## Subject and chain

Lloyds' visit (`4748841`), migration (`b124fe1`), chrome (`04eff85`, `3e8d5a3`), and journey
suite (the commit the launch message names). Reports under
`C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\scaffold\`: `visit-lloyds-report.md`,
`lloyds-migration-report.md`, `chrome-lloyds-report.md`, `journey-lloyds-report.md`. The skills:
`.agents/skills/enterprise-bootstrap/**` and `.agents/skills/orkestrel-prove-journey/**` in the
scaffold checkout. Terrain's suite as the reference shape.

## Review evidence

Diffs under `C:/Users/mikes/WebstormProjects/scaffold/tmp/units/diffs/`: `lloyds-chrome.patch`
(`b124fe1..3e8d5a3` over `app` and `guides`), `lloyds-journey.patch` (the journey commit over
`tests`, `vite.config.ts`, `package.json`, `guides`), each with a `.stat`; `lloyds.status`. The
capture frames under `C:/Users/mikes/WebstormProjects/lloyds/tmp/capture/states/` and their
decoded readings in `lloyds-frames.txt` beside the diffs; the per-variant artifacts under
`C:/Users/mikes/WebstormProjects/lloyds/tmp/journeys/`. Reports are writers' self-assessments.

## Numbered falsifiable claims

1. The rail carries no `*-dark` component class and no `btn-outline-*` control; every action
   carrying consequence is a solid tier; the disabled Delete is neutral with its reason on
   `aria-describedby`; the armed Delete is `btn-danger` and opens a confirmation whose safe answer
   takes focus and whose answers are verbs. Attack: a control the tiers table would place
   elsewhere; a confirmation reachable by a path that skips it.
2. `app/**` carries no `style` attribute and no `<style>` block; the two authored width rules and
   the kept form-check rules each cite an instrument reading under `inspection.md` § When an
   authored rule is already earned, and the removed rules had no population. Attack: a rule kept
   without a reading; a utility the cascade ships that the authored rule duplicates.
3. Each row's checkbox name interpolates the row's identity and two rows resolve apart; `Add
   building` and `Close` each resolve exactly one reachable element on the screens the journeys
   enter.
4. `DELETE_TRANSITIONS` in `app/browser/constants.ts` is typed on the entity's unions, carries
   every event each state accepts (five rows through `confirming`), and is the one table the
   harness page and the test setup both import; no second table exists and no
   `data-statechart-*` string is spelled outside the map.
5. The harness page publishes `status`, `passed`, `failed`, `total` on its root, `scenario` and
   `result` per row, `state` on the badge, all from `STATECHART_ATTRIBUTES`; the route deep-links
   one row and the walk; the gate presses play-all through `clickAccessible`, polls the status,
   and asserts a zero failure tally with failing rows named.
6. `FAMILIES` declares journey, refusal, matrix, statechart, transport, and capture; every family
   has a proof and no proof sits outside the declaration; every journey path imports
   `@orkestrel/test/browser` and reaches no selector, instance, or store.
7. Every refusal asserts one exact voice the layer or the surface throws, by equality.
8. The matrix family reads once per declared variant (the variants read from the surface's own
   breakpoint and a phone width), measures the primary command and the armed Delete against the
   4.5 text bar and the ring against 3, with harness-composed under-bar negative controls; the
   census and escape readings carry negative controls appended to the read root; the escape
   reading is taken before any journey drives the surface, with named exemptions only.
9. The transport family proves persistence, restart over the same real driver, and a storage
   failure's visible sentence with its retry, through the application's store contracts and no
   mock.
10. The capture family registers states placed from inside the journeys that reach them, expands
    filenames uniquely across variants, proves placement set equality, and under the flag reads
    every frame back at the variant's width with its floor on the surface's own background.
11. One artifact per variant exists under `tmp/journeys/`, named for the variant, carrying
    `describeTree`, `describeFocus`, the resolved-style rows, the journal, and the capture names.
12. `tests/setup.test.ts` and `tests/setupBrowser.test.ts` prove their modules in a `setup`
    project; the `test:setup` script is declared and in the `test` chain; the audit's
    remaining lines are the TypeScript question and the scaffold-owned `vite.config.ts` row.
13. Every helper leaf the chrome unit added has a describe; every re-pointed call site uses the
    layer; the remaining local `querySelector` sites are counted and sit only on component tests.
14. `guides/README.md` names the harness route, the changed chrome, the suite's families and
    environment names, and every row's proof is a test that exists; every link resolves.
15. Nothing in the chrome or the suite changed a rating result: `app:core` passes at its
    pre-chrome count and every difference in `app:browser`'s count is a named added case.

## Output

The `orkestrel-falsify` verdict shape: per-claim verdict with the attack and the evidence line,
findings outside the claims, exactly one terminal `VERDICT:` line.
