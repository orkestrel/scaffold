Stopped under the brief's deviation contract: claim 11's disabled tab, pill, and list specimens lose keyboard reachability when the engine boots. No proof repairs are claimed.

- **Expected:** Focusable disabled triggers on the real engine routes, with keyboard rows proving unchanged state. The page report identifies `navs-tabs-disabled-tab`, `navs-tabs-disabled-pill`, and `list-group-disabled-list` as focusable.
- **Found:** Each trigger has `tabIndex === 0` before `startJourneyVeneer()` and `tabIndex === -1` afterwards, at both 390 px and 1280 px. Each remains natively enabled and carries `aria-disabled="true"`. Boot selects the active sibling; its Tab constructor removes inactive siblings from forward Tab order. Arrow navigation also excludes disabled siblings.
- **Evidence:** `src/browser/plugins.ts:325` boots active tab/pill/list controls; `src/browser/Tab.ts:61` writes inactive children's `tabindex` to `-1`; `src/browser/Tab.ts:203` excludes disabled children from arrow navigation. The Chromium probe asserted `tabIndex === 0` before and after boot: all pre-boot assertions passed; all six post-boot assertions failed. Full output is in `tmp/codex/showcase-refusal.log` and `tmp/codex/showcase-refusal.err`.
- **Done:** Read the brief and governing records, checked the rendered populations, reproduced the blocking prerequisite failure, wrote this report, and removed this run's temporary probes. No tracked file changed.
- **Not done:** Proof implementation, mutation campaign, acceptance gates, captures, or commit. Repairing the shipped specimens or engine requires files outside this unit's ownership. Forcing focus or rewriting the mounted triggers would bypass the required keyboard journey.
- **Hypothesis:** The page unit's focusability assertions measured the specimens before the Tab plugin booted.

The blocking command and its result are:

```text
node node_modules/@orkestrel/scaffold/dist/agents/skills/orkestrel-dispatch/scripts/launch.js --journal tmp/codex/showcase-refusal.log --errors tmp/codex/showcase-refusal.err --cap 120 -- node node_modules/vitest/vitest.mjs run --config tmp/probes/showcase-refusal.config.ts tmp/probes/showcase-refusal.test.ts --reporter=verbose
```

Exit 1; 1 test file failed; 6 tests failed; Vitest duration 5.51 s; launcher duration 6.377 s; not capped. The probe/configuration were deleted after recording their output. This is an unmodified-page prerequisite failure, not a mutation result. No green-after run exists.

The carried items remain open:

| Carried item | Proof, mutation, and red/green status |
| --- | --- |
| Claim 12 | Lifecycle stability and delayed-reaction mutation not implemented or run. |
| Claim 11 | Blocked by the boot-time focus change; prerequisite command failed 6 tests. Restriction mutations and green-after run not performed. |
| Claim 15 | Burst corrections and both-motion table runs not performed. |
| Claims 4 and 5 | Chrome/open-state comparison and generated-pseudo control not implemented or mutated. |
| Claim 2 | Post-dismissal/close census not implemented or mutated. |
| Claim 7 | Frozen-population proof not implemented or mutated. |
| Claim 10 | Post-table ID/reference census not implemented or mutated. |
| Claim 13 | No-op-act and sibling-reader campaign not run. |
| Claim 14 | Shipped cases unchanged; this run's browser probes parked the pointer in `finally`. No mutation proof. |
| Claim 16 | Exploratory computed-overflow readings found visible preceding hints at both widths. Permanent census and mutation not implemented. |
| Claim 17 | Isolated no-capture assertion not implemented or mutated. |
| Claim 20 | Exploratory pointer geometry only; no complete Tab/pointer/refusal proof or mutation. |
| Claim 9 | Departure listener proof not changed or mutated. |
| F5 and F6 | Portfolio boot and settled-scroll proofs not changed or mutated. |

Claim 13 has no measured survival results:

| Population | No-op-act survivors | Sibling-reader survivors |
| --- | --- | --- |
| All 21 tables named by the brief | Unknown; not run | Unknown; not run |

The acceptance gates were not run after implementation because implementation stopped:

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

Commit: none. HEAD remains `7593cfe02fd1bcafe2352fade5546f9812b4b3b2` on `showcase-proofs`; `git status --porcelain` is empty. No subagents, push, publication, or installation occurred. The deviation is the claim 11 prerequisite conflict described here; the brief itself supplies the pointer-cleanup rule, so its absence from scaffold main is not a blocker.
