# Plan — taverna, lloyds, supervisor to the canon and the skills (2026-09-02)

Reconciled from `apps-design-objective-report.md` (Grok, objective) and the planner's subjective
lane (Opus; retained as `apps-design-subjective-report.md`). Sol is dark: every unit the lanes
routed to Sol runs on Opus 5 as a recorded substitution; mechanical units run on `builder`
(Sonnet); read-only checks run on Grok.

## Rulings

- **Order inside a checkout.** prepare → Orchestrator commit → visit (online, after scaffold
  0.0.60 and test 0.0.12 are on the registry; no `--offline`, no `--dirty`) → chrome →
  journeys → conditional repair → verifier. Chrome before journeys, because the chrome unit
  changes the accessible names the journeys resolve.
- **Across checkouts.** Prepares, visits, and chrome units run in parallel; the journey phase
  runs one checkout at a time (timing attribution under load, orchestration rule 10); lloyds
  first, then taverna, then supervisor.
- **Transition table placement.** The table is application data in the app's own constants
  module, typed on the entity's unions; the scenarios stay in the test setup; the harness page
  and the setup both import the table. `statechart.md` § Declare the table takes that line in
  scaffold before the first harness page ships (carrier: scaffold commit in this wave).
- **Supervisor.** Keeps `halfmoon.min.css` and its 1440×900 wide variant; publishes after its
  visit (the runtime-range move is the bump trigger, read from the registry head); its
  Playwright integration file moves under `tests/app/browser/integration/` so the canonical
  path holds the browser-project journey suite. Whether the overwrite keeps its `service:*`
  and Node integration projects is the drift probe's to settle.
- **Bounds.** Chrome and repair close the user's enumerated list plus every bar the matrix
  family measures over the controls the journeys resolve; every other checklist row is
  excluded on evidence and recorded. TypeScript major 7 is not crossed. Terrain's numbers and
  copy strings are never criteria.
- **Capture probe.** Struck: terrain's re-film on the 0.0.12 build read every frame complete
  (`terrain-frames-final.txt`).

## Routing ledger

| Unit                    | Role          | Engine        | Notes                                                     |
| ----------------------- | ------------- | ------------- | --------------------------------------------------------- |
| probe-drift             | `grok`        | Cursor Grok   | read-only audit and host diff per checkout                |
| base-taverna/lloyds/supervisor | `verifier` | Sonnet   | serial; porcelain and default `npm test` colour           |
| prepare-<repo>          | `builder`     | Sonnet        | running (workflow `prepare-three-apps`)                   |
| Orchestrator commit     | —             | Opus          | per checkout, pathspec exclusion for a user's rows        |
| visit-<repo>            | `implementer` | Opus (for Sol)| wave § Visit from step 2; repair `no-nested-functions`     |
| publish-supervisor      | Orchestrator  | user's login  | wave § Prepare a layer; registry head first               |
| chrome-<repo>           | `implementer` | Opus          | user's list, harness page, table module                   |
| journey-<repo>          | `implementer` | Opus (for Sol)| serial across the fleet; families, gate, artifact, proofs |
| repair-<repo>           | `implementer` | Opus          | conditional on the matrix readings                        |
| gates-<repo>            | `verifier`    | Sonnet        | after each phase                                          |
| audits                  | `reviewer` + `grok` + `grok` checker | Opus + Grok | per the campaign's audit shape        |

## Exit criterion (each row ends implemented, repaired, retained, or excluded on evidence)

1. Catalog pins: every `@orkestrel/*` range equals the regenerated catalog with a caret;
   `node_modules/@orkestrel/test` is 0.0.12.
2. Canon structure: `npx scaffold audit` exits 0 per checkout; remaining lines owned.
3. Foreign paths removed; deletion set equals the read-only audit's foreign set.
4. Operator overlays (hooks, permissions, MCP) moved out of vendored files or excluded on
   the record; `.mcp.json` never gitignored.
5. `policy/no-nested-functions` green over app and src code; repairs in owned files.
6. TypeScript major 6 retained.
7. Latest contract and ranges on supervisor's runtime; supervisor bumped from the registry
   head and published; taverna and lloyds versions unmoved.
8. Destructive chrome solid with its ladder; no `*-dark` component class; no outline family
   carrying information on a dark surface; no authored `style=` widths; per-row names unique.
9. Supervisor's skin retained; its authored CSS kept only where an instrument reading earns it
   (focus ring width 0 repaired or excluded with the reading).
10. Journey, refusal, matrix, statechart, transport, capture families declared and proved on
    `@orkestrel/test/browser`; duplicate local verbs on journey paths gone, the rest counted.
11. Harness page on the app table with every attribute from the map; gate green through the
    interface.
12. One artifact per variant under `tmp/`; setup proofs present where the audit asks.
13. Guide parity per checkout.
14. Gate chain green per checkout by an independent verifier.

## Unknowns settled by units

Porcelain and starting colour (base); what each overwrite drops (probe-drift); nested-function
volume (visit); duplicate-contract typecheck in supervisor (visit); supervisor's registry head
(prepare); `settings.local.json` ignored or not (prepare); local verb call-site counts (journey);
harness bundle delta (chrome).

## Round record, 2026-09-03

- The skills campaign's folder was retired at scaffold `5e310d75`; this folder carries the open
  campaign. Terrain, taverna, and supervisor mains pushed at the user's word; lloyds pushed after
  its repair.
- Lloyds: visit `4748841`, migration `b124fe1`, chrome `04eff85` and `3e8d5a3`, journey
  `4812416`, repair (the push's head). The repair closed the document's height (the shell fills
  the viewport once; the desk grows), the focus ring (an earned outline rule, 17.298 in every
  variant against 3:1), and focus after a confirmed removal; every run and gate green. Next: the
  audit round (`audit-lloyds-brief.md`) with the reviewer and the Grok lane blind to each other,
  then the verifier.
- Taverna and supervisor wait on the middleware release the user runs elsewhere; their resume
  briefs and chrome briefs are in place.
- Lloyds closed 2026-09-03: fix round `e508e8c` (17 files) and the pin `09e75ae`; the fix-round
  lane's two broken claims ruled (claim 6 struck as the Orchestrator's over-reach with the reader
  gap carried to `ROADMAP.md`; claim 12 closed by the pin) and its unresolved claim closed on the
  verifier's chain; `audit-lloyds-verdict.md` reads PASS. Lloyds main pushed at `09e75ae`.
