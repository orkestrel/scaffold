Stopped under the brief’s deviation contract: claim 11’s disabled tab, pill, and list specimens lose keyboard reachability when the engine boots. No proof repairs are claimed.

- **Expected:** Focusable disabled triggers on the real engine routes, with keyboard rows proving unchanged state.
- **Found:** `navs-tabs-disabled-tab`, `navs-tabs-disabled-pill`, and `list-group-disabled-list` each have `tabIndex === 0` before boot and `tabIndex === -1` afterwards, at both 390 px and 1280 px. Arrow navigation also excludes disabled siblings.
- **Evidence:** [Tab.ts:61](/C:/Users/mikes/WebstormProjects/veneer-wt-page/src/browser/Tab.ts:61) removes inactive siblings from Tab order; [Tab.ts:203](/C:/Users/mikes/WebstormProjects/veneer-wt-page/src/browser/Tab.ts:203) excludes disabled siblings from arrow navigation. Chromium confirmed six failing post-boot checks; all pre-boot checks passed.
- **Done:** Read the governing records, checked rendered populations, reproduced the prerequisite failure, wrote [the report](/C:/Users/mikes/WebstormProjects/veneer-wt-page/tmp/codex/showcase-proofs-report.md), and removed this run’s temporary probes.
- **Not done:** Implementation, mutation campaign, acceptance gates, captures, or commit. Repairing the shipped specimens or engine requires unowned files. Forcing focus or rewriting mounted triggers would bypass the required keyboard journey.
- **Hypothesis:** The page unit’s focusability assertions measured the specimens before the Tab plugin booted.

The blocking command was:

```text
node node_modules/@orkestrel/scaffold/dist/agents/skills/orkestrel-dispatch/scripts/launch.js --journal tmp/codex/showcase-refusal.log --errors tmp/codex/showcase-refusal.err --cap 120 -- node node_modules/vitest/vitest.mjs run --config tmp/probes/showcase-refusal.config.ts tmp/probes/showcase-refusal.test.ts --reporter=verbose
```

Exit **1**; **6 tests failed** in one file; Vitest duration **5.51 s**; launcher duration **6.377 s**; not capped. Output remains in [showcase-refusal.log](/C:/Users/mikes/WebstormProjects/veneer-wt-page/tmp/codex/showcase-refusal.log) and [showcase-refusal.err](/C:/Users/mikes/WebstormProjects/veneer-wt-page/tmp/codex/showcase-refusal.err). The temporary probe and configuration were deleted. This was an unmodified-page prerequisite failure. No green-after run exists.

The carried items remain open:

| Carried item | Proof, mutation, and red/green status |
| --- | --- |
| Claim 12 | Lifecycle stability and delayed-reaction mutation not implemented or run. |
| Claim 11 | Prerequisite failed six checks. Restriction mutations and green-after run not performed. |
| Claim 15 | Burst corrections and both-motion table runs not performed. |
| Claims 4 and 5 | Chrome/open-state comparison and generated-pseudo control not implemented or mutated. |
| Claim 2 | Post-dismissal/close census not implemented or mutated. |
| Claim 7 | Frozen-population proof not implemented or mutated. |
| Claim 10 | Post-table ID/reference census not implemented or mutated. |
| Claim 13 | Mutation campaign not run. |
| Claim 14 | Shipped cases unchanged; this run’s probes parked the pointer in `finally`. |
| Claim 16 | Exploratory computed-overflow readings found visible preceding hints at both widths. Permanent proof and mutation not implemented. |
| Claim 17 | Isolated no-capture assertion not implemented or mutated. |
| Claim 20 | Exploratory pointer geometry only; complete reachability/refusal proof not performed. |
| Claim 9 | Departure listener proof not changed or mutated. |
| F5 and F6 | Portfolio boot and settled-scroll proofs not changed or mutated. |

Claim 13 has no measured survival results:

| Population | No-op-act survivors | Sibling-reader survivors |
| --- | --- | --- |
| All 21 tables | Unknown; not run | Unknown; not run |

Acceptance status:

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

Commit: **none**. HEAD remains `7593cfe02fd1bcafe2352fade5546f9812b4b3b2` on `showcase-proofs`; `git status --porcelain` is empty. No subagents, push, publication, or installation occurred. The deviation is the claim 11 prerequisite conflict; the brief itself supplies the pointer-cleanup rule, so its absence from scaffold main is not a blocker.