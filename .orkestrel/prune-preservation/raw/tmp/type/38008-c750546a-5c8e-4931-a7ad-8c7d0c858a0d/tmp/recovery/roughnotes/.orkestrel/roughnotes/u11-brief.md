# Unit 11 — the journey and transport layer

## Role and engine

`implementer` — Opus 5, native Claude subagent, this checkout, sole serial writer from the clean
committed baseline the Orchestrator names at launch.

## Objective

Close the seven journey-layer findings the production-readiness pass sustained, so the suite proves
what it claims about reachability, refusal, arrival, and storage failure.

## Authority — read before acting, in this order

1. `tmp/authority/AGENTS.md`, then `tmp/authority/rules/tests.md`, `rules/browser.md`,
   `rules/quality.md`, `rules/writing.md`.
2. The skill at `C:\Users\mikes\WebstormProjects\scaffold\.agents\skills\orkestrel-prove-journey\SKILL.md`
   and its `references/layer.md` and `references/captures.md`.
3. `.orkestrel/roughnotes/journey-readiness-verdict.md` — the verdict this unit implements.

Do not read `node_modules/@orkestrel/scaffold/dist/host/`; it is a superseded vendored copy.

## The findings

**R1 — keyboard reachability, blocking.** `traverseAccessible` has four call sites and none proves a
routed surface's own controls. Add one forward-Tab traversal per surface the journeys cover,
targeting a control **that surface owns**, inside the journey already standing on it — the
marketplace query field or its search button, the payment customer field or its submit, the products
listing's first entry link, the article's continuation link, the media rate-card link, the shop
`Live catalog` link, the publications first desk, about's continuation, newsletter's submit, the
product detail's primary action, the shop detail's primary action. The skip link does not count; the
skill excludes it.

**R2 — refusal voice, blocking.** `openSite` and `closeSite` in `setup.ts` pass on
`refusal !== undefined`, which accepts any of the three voices `resolveRendered` throws. At 1280 the
toggler is present and hidden inside a `d-lg-none` wrapper, so the voice those branches receive is
the present-but-unreachable one, while their `@remarks` claims absence. Assert the exact voice each
branch means, and correct the remark. `references/layer.md` § The failure voices fixes the wording;
read it rather than guessing the sentence.

**R3 — arrival, blocking.** The product-detail and shop-detail journeys assert their outcome with
text that is already rendered on the listing they navigated from, so neither proves the detail screen
opened. Assert a string the destination alone renders, and assert the negative beside it: the
listing's own sentence is gone. Check every other journey for the same shape before you finish —
report any you find, fixed or not.

**R7 — storage failure, major.** The transport family proves persistence and restart and never drives
a failure. Add an inert configurable `Storage` implementation whose `setItem` throws, place it in the
browser test setup module under `.claude/rules/tests.md`, and drive the theme control over it in the
transport block. Then **report what the interface actually does**. The Orchestrator expects it does
nothing visible, which the skill calls a surface finding rather than something to work around in the
layer: "Report a step that cannot be performed through the interface as a finding about the
interface." Do not add a failure sentence to the application — you do not own `app/`. Record the
finding.

**R8 — coverage, major.** The shop department filter carries `aria-pressed` and no journey presses
it. Extend the shop journey to press a department and then restore the full listing, and register the
resulting filtered and missed states so they write frames.

**R9 — announced state, major.** Journeys press state-carrying controls and never assert the state
they announce. `readStates` is imported and called once, reading `invalid`. Assert `pressed` on the
magazine filter, the shop filter, and the theme control, beside the drive that sets it — and assert
its absence on a sibling that is not selected.

**R10 — placement, minor.** `place('home')` runs three interactions after the assertion that proves
the home condition, one of which opens and dismisses the offcanvas. Move it to the assertion it
belongs to.

## Host facts

- Windows. POSIX syntax in the Bash tool; `npm` resolves as `npm.cmd`.
- `npm run test:journey` runs the four journey projects; `VITE_CAPTURE=true npm run test:journey`
  writes frames. `npm test` is the gate chain.
- Bootstrap emits 329 Sass deprecation warnings from its own imports. Standing condition.
- The capture registry currently holds 24 states and writes 96 frames.

## Scope

**Owned files:** `tests/app/browser/integration.test.ts`, `tests/app/browser/setup.ts`.

**Off-limits — do not edit, for any reason:** everything under `app/`, every component test,
`guides/README.md`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `vite.config.ts`, `package.json`,
`.orkestrel/`, `tmp/authority/`.

A surface finding is reported, never worked around by reaching past the interface.

You are the sole writer in this checkout. Run no `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`. Do not commit, push, or install anything.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

Ordered cheap-first.

1. `npx oxfmt --config .oxfmtrc.json --check <your owned files>` reports correct format.
2. `npx oxlint --config .oxlintrc.json --deny-warnings <your owned files>` is clean.
3. `npm run check` passes.
4. Every surface the journeys cover carries a forward-Tab traversal of a control that surface owns.
   List them in your report, surface by surface.
5. No assertion in either owned file passes on more than one resolver voice. Name every refusal
   assertion and the exact voice it pins.
6. R3 is closed for both detail journeys, with the negative asserted beside the positive, and you
   have swept every other journey for the same shape.
7. The storage-failure leg exists, drives a real failing store, and its finding about the interface
   is recorded in your report.
8. The shop department filter is pressed by a journey, and its filtered and missed states are
   registered and placed.
9. `pressed` is asserted where a journey sets it, and its absence on an unselected sibling.
10. `npm run test:journey` is green for all four projects.
11. `VITE_CAPTURE=true npm run test:journey` is green for all four projects and writes every
    registered frame. Run it twice and report both.
12. `npm test` exits 0.

**Observations, not criteria:** the wall-clock durations; any surface finding you record.

## Deviation contract

A conflict with the objective stops you: report expected, found, exact evidence, done or not done,
and at most one hypothesis. Do not edit the application to make a proof pass. Do not weaken an
assertion. Do not add a family to the declaration — the statechart family is ruled not owed and the
verdict file says why.

Where a detail is ancillary — which control a surface's traversal targets among equals, how a helper
is named — decide it, record it, and carry on.

## Output

Write your report to `tmp/units/u11-report.md`, and make your final message the same content:

1. **Done / not done** per criterion.
2. **Traversals** — surface by surface, the control each walks to.
3. **Refusal voices** — every assertion and the voice it pins.
4. **R3** — what each detail journey now asserts, and what your sweep of the other journeys found.
5. **The storage failure** — what you built, what you drove, and what the interface did.
6. **Observations.**
7. **What you did not close**, and why.

No process diary.
