Stopped under § Your authority: claim 11's shipped disabled tab, pill, and list triggers cannot distinguish the required restriction-removal mutation through a real pointer click. Their Bootstrap styles prevent the click from reaching the trigger. No proof repairs or acceptance pass are claimed.

- **Expected:** Each disabled tab, pill, and list pointer-refusal row fails when its family's `restricted: true` is removed.
- **Found:** At both 390 px and 1280 px, every trigger resolves `pointer-events: none` and post-boot `tabIndex === -1`. A real CDP click at its center hits the containing tab list. The trigger receives zero clicks and remains `aria-selected="false"`, with the restriction intact and with it removed.
- **Evidence:** `tmp/codex/showcase-pointer-baseline-2.log` and `tmp/codex/showcase-pointer-mutant.log` each record six passing diagnostic cases. The mutation removes only `restricted: true` inside `createTabPlugin` through a Vite transform; no engine file is written. A temporary diagnostic stylesheet setting only `pointer-events: auto` makes those same real clicks reach every trigger: the intact guard retains `aria-selected="false"`; the mutated guard produces `aria-selected="true"`. This control confirms that the mutation applies and that the pointer instrument reaches the route when hit testing permits it. It does not certify the shipped page under altered hit testing.
- **Done:** Verified the blocker and its control at both widths, checked Bootstrap 5.3.8's implementation and styles, parked the pointer at `(-1, -1)` in each case's `finally`, removed this run's temporary probe and configuration, and wrote this report.
- **Not done:** Permanent proof changes, the factory assertion move, the table mutation campaign, acceptance gates, captures, or a commit. Preserving the shipped page permits proving CSS refusal, but that weaker property cannot distinguish removal of the engine restriction. A test-only hit-testing override would prove an altered surface. Making the shipped trigger pointer-reachable requires a page change outside ownership, such as a `pe-auto` class.
- **Hypothesis:** The corrected brief accounts for Bootstrap's roving tabindex but overlooks its disabled-control pointer suppression.

The diagnostic runs used these commands:

```text
node node_modules/@orkestrel/scaffold/dist/agents/skills/orkestrel-dispatch/scripts/launch.js --journal tmp/codex/showcase-pointer-baseline-2.log --errors tmp/codex/showcase-pointer-baseline-2.err --cap 120 -- node node_modules/vitest/vitest.mjs run --config tmp/probes/showcase-pointer.config.ts tmp/probes/showcase-pointer.test.ts --reporter=verbose

SHOWCASE_TAB_MUTATION=1 node node_modules/@orkestrel/scaffold/dist/agents/skills/orkestrel-dispatch/scripts/launch.js --journal tmp/codex/showcase-pointer-mutant.log --errors tmp/codex/showcase-pointer-mutant.err --cap 120 -- node node_modules/vitest/vitest.mjs run --config tmp/probes/showcase-pointer.config.ts tmp/probes/showcase-pointer.test.ts --reporter=verbose
```

The second command's environment assignment was supplied through PowerShell's `$env:SHOWCASE_TAB_MUTATION='1'`.

| Diagnostic | Exit | Count | Vitest duration | Launcher duration |
| --- | ---: | --- | ---: | ---: |
| Intact tab restriction | 0 | 6 passed | 10.76 s | 11.585 s |
| Removed tab restriction | 0 | 6 passed | 10.87 s | 11.672 s |

Neither run was capped. These are blocker diagnostics, not red-before/green-after proof repairs. The unchanged-state assertion survives the mutation on the shipped surface in every measured case.

The carried items remain unaccepted:

| Carried item | Proof, mutation, and red-before/green-after status |
| --- | --- |
| Claim 12 | Lifecycle stability window and delayed-reaction mutation not implemented or run. |
| Claim 11 | Restriction-removal diagnostic survives for tab, pill, and list at both widths; see the commands and counts preceding this table. No permanent refusal rows or green-after repair. Other families not mutated. |
| Claim 15 | Burst expectations and both-motion table runs not implemented or run. |
| Claims 4 and 5 | Chrome/open-state face comparison and generated-pseudo control not implemented or mutated. |
| Claim 2 | Post-dismissal/close census not implemented or mutated. |
| Claim 7 | Markup-derived frozen census and interaction checks not implemented or mutated. |
| Claim 10 | Post-table global ID/reference census not implemented or mutated. |
| Claim 13 | No-op-act and sibling-reader campaign not run. |
| Claim 14 | Diagnostic cases park the pointer in `finally`; shipped cases unchanged and no cleanup mutation run. |
| Claim 16 | Computed-overflow scroller census not implemented or mutated. |
| Claim 17 | Isolated no-capture directory proof not implemented or mutated. |
| Claim 20 | Complete Tab/pointer/refusal census not implemented or mutated. |
| Claim 9 | Departure listener proof not changed or mutated. |
| F5 and F6 | Booted portfolio and settled-scroll capture proof not changed or mutated. |

Claim 13's survival results are unmeasured; the claim 11 diagnostic is not that campaign:

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
| Disabled tab, pill, and list controls remain keyboard-reachable after boot | Accepted the brief's correction: inactive controls have roving `tabindex="-1"`, and arrow navigation skips disabled controls. No permanent assertion move completed. | `node_modules/bootstrap/js/src/tab.js:206` and `:163` |
| A real pointer click can activate the shipped disabled tab, pill, and list trigger and test the engine guard | The diagnostic distinguishes CSS refusal from engine refusal. The shipped-surface requirement remains blocked; no altered-surface proof is substituted. | `node_modules/bootstrap/scss/_nav.scss:50`, `_list-group.scss:70`; compiled CSS at `node_modules/bootstrap/dist/css/bootstrap.css:3834` and `:5044`; engine disabled refusal at `node_modules/bootstrap/js/src/tab.js:294` |

Commit: none. HEAD remains `7593cfe02fd1bcafe2352fade5546f9812b4b3b2` on `showcase-proofs`. No tracked files changed; `git status --porcelain` is empty. No subagents, push, publication, or installation occurred. The sole blocking deviation is the shipped pointer route described in this report.
