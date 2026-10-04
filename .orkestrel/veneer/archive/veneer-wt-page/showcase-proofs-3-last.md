Stopped under § Your authority: claim 11’s shipped disabled tab, pill, and list triggers cannot distinguish the required restriction-removal mutation through a real pointer click. Bootstrap’s styles prevent the click from reaching them. No proof repairs or acceptance pass are claimed.

Report written to `tmp/codex/showcase-proofs-3-report.md`.

- **Expected:** Each pointer-refusal row fails when its family’s `restricted: true` is removed.
- **Found:** At both 390 px and 1280 px, every trigger resolves `pointer-events: none` and post-boot `tabIndex === -1`. A real click hits the containing tab list. The trigger receives zero clicks and remains unselected, with the restriction intact and removed.
- **Evidence:** `tmp/codex/showcase-pointer-baseline-2.log` and `tmp/codex/showcase-pointer-mutant.log` each record six passing diagnostic cases. The mutation removes only the tab plugin’s restriction through a Vite transform; no engine file changes. A diagnostic `pointer-events: auto` stylesheet makes the same clicks reach each trigger: the intact guard refuses selection, while the mutated guard permits it. That control verifies the instrument and mutation, but measures altered hit testing.
- **Done:** Verified the blocker and control at both widths, checked Bootstrap 5.3.8, parked the pointer in each case’s `finally`, removed the temporary probes, and wrote the report.
- **Not done:** Permanent proof changes, factory assertion correction, table mutation campaign, acceptance gates, captures, or commit. Making the shipped triggers pointer-reachable requires a page change outside ownership, such as adding `pe-auto`.
- **Hypothesis:** The corrected brief accounts for Bootstrap’s roving tabindex but overlooks its disabled-control pointer suppression.

The diagnostic commands were:

```text
node node_modules/@orkestrel/scaffold/dist/agents/skills/orkestrel-dispatch/scripts/launch.js --journal tmp/codex/showcase-pointer-baseline-2.log --errors tmp/codex/showcase-pointer-baseline-2.err --cap 120 -- node node_modules/vitest/vitest.mjs run --config tmp/probes/showcase-pointer.config.ts tmp/probes/showcase-pointer.test.ts --reporter=verbose
```

```powershell
$env:SHOWCASE_TAB_MUTATION='1'
node node_modules/@orkestrel/scaffold/dist/agents/skills/orkestrel-dispatch/scripts/launch.js --journal tmp/codex/showcase-pointer-mutant.log --errors tmp/codex/showcase-pointer-mutant.err --cap 120 -- node node_modules/vitest/vitest.mjs run --config tmp/probes/showcase-pointer.config.ts tmp/probes/showcase-pointer.test.ts --reporter=verbose
```

Their measured results were:

| Diagnostic | Exit | Count | Vitest duration | Launcher duration |
| --- | ---: | --- | ---: | ---: |
| Intact restriction | 0 | 6 passed | 10.76 s | 11.585 s |
| Removed restriction | 0 | 6 passed | 10.87 s | 11.672 s |

Neither run was capped. These are blocker diagnostics, not red-before/green-after repairs. The shipped-surface unchanged-state assertion survives the mutation in every measured case.

The carried items remain unaccepted:

| Carried item | Proof, mutation, and red/green status |
| --- | --- |
| Claim 12 | Lifecycle stability and delayed-reaction mutation not implemented or run. |
| Claim 11 | Restriction-removal diagnostic survives for tab, pill, and list at both widths. No permanent rows or green-after repair. Other families not mutated. |
| Claim 15 | Burst corrections and both-motion table runs not performed. |
| Claims 4 and 5 | Chrome/open-state comparison and generated-pseudo control not implemented or mutated. |
| Claim 2 | Post-dismissal/close census not implemented or mutated. |
| Claim 7 | Frozen-population census and interactions not implemented or mutated. |
| Claim 10 | Post-table ID/reference census not implemented or mutated. |
| Claim 13 | No-op-act and sibling-reader campaign not run. |
| Claim 14 | Diagnostic cases park the pointer; shipped cases unchanged and cleanup mutation not run. |
| Claim 16 | Computed-overflow census not implemented or mutated. |
| Claim 17 | Isolated no-capture proof not implemented or mutated. |
| Claim 20 | Complete reachability/refusal census not implemented or mutated. |
| Claim 9 | Departure listener proof not changed or mutated. |
| F5 and F6 | Portfolio boot and settled-scroll proofs not changed or mutated. |

Claim 13’s survival results are unmeasured:

| Tables | No-op-act survivors | Sibling-reader survivors |
| --- | --- | --- |
| face, theme, pair | Unknown; not run | Unknown; not run |
| button, alert, tooltip, popover, tab, dropdown | Unknown; not run | Unknown; not run |
| collapse, accordion, toast, carousel, offcanvas, modal | Unknown; not run | Unknown; not run |
| scrollspy-390, navbar-390, responsive-offcanvas-390 | Unknown; not run | Unknown; not run |
| scrollspy-1280, navbar-1280, responsive-offcanvas-1280 | Unknown; not run | Unknown; not run |

The acceptance gate status is:

| Gate | Exit | Result |
| --- | --- | --- |
| `npm run format:check` | — | Not run |
| `npm run lint:check` | — | Not run |
| `npm run check` | — | Not run |
| `npm run build` | — | Not run |
| `npm run test:setup:browser` | — | Not run |
| `npm run test:app:browser` | — | Not run as an acceptance gate |
| `npm run test:journey` | — | Not run; duration unmeasured |
| `CAPTURE=1 npm run test:journey` | — | Not run; capture directory untouched |
| `npm run test:guides` | — | Not run |
| `npm run test:policy` | — | Not run |
| `npm run test:src:browser` | — | Not run |
| `git diff --check` | 0 | Clean |

The Bootstrap premises considered under § Your authority are:

| Premise | Adaptation or limit | Bootstrap 5.3.8 reference |
| --- | --- | --- |
| Disabled tab, pill, and list controls remain keyboard-reachable after boot | Accepted the brief’s correction: inactive controls receive `tabindex="-1"`; arrow navigation skips disabled controls. Permanent assertion correction not completed. | `node_modules/bootstrap/js/src/tab.js:206`, `:163` |
| A pointer click reaches the shipped disabled trigger and tests its engine guard | Diagnostic separates CSS refusal from engine refusal. The shipped-surface requirement remains blocked; no altered-surface proof substitutes for it. | `node_modules/bootstrap/scss/_nav.scss:50`, `_list-group.scss:70`; engine refusal at `node_modules/bootstrap/js/src/tab.js:294` |

Commit: none. HEAD remains `7593cfe02fd1bcafe2352fade5546f9812b4b3b2` on `showcase-proofs`. No tracked files changed; `git status --porcelain` is empty. No subagents, push, publication, or installation occurred.