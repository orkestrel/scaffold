# Unit 5b — the sticky masthead covers what a reader scrolls to

## Role and engine

`implementer` — Opus 5, native Claude subagent, this checkout, sole serial writer from the clean
committed baseline the Orchestrator names at launch.

## Objective

Stop the sticky masthead intercepting pointer events at narrow width, and clear two findings the
unit 3 audit carried. This unit blocks units 6, 7, and 8, whose acceptance requires capture frames
they can only produce once the narrow capture run completes.

## Authority — read before acting, in this order

1. `tmp/authority/AGENTS.md` — the coding contract.
2. `tmp/authority/orchestration.md` — agent operation.
3. `tmp/authority/rules/styles.md`, `rules/browser.md`, `rules/names.md`, `rules/tests.md`,
   `rules/typescript.md`, `rules/writing.md`.
4. `tmp/authority/skill/SKILL.md` — the `enterprise-bootstrap` skill, and from
   `tmp/authority/skill/references/`: `responsive-layout.md`, `bootstrap-reference.md`
   (§ Accessibility, § Enterprise patterns), `components.md`, `utilities.md`.
5. `.orkestrel/roughnotes/u3-audit-verdict.md` — findings A2 and the Orchestrator finding below.

Do not read `node_modules/@orkestrel/scaffold/dist/host/`; it is a superseded vendored copy.

## Defect one — the masthead intercepts pointer events at 390

Measured by the Orchestrator on an idle host at commit `190ccf2`:

```
VITE_CAPTURE=true npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project 'journey:light-390'
  Tests  3 failed | 15 passed (18)

  <a href="#/subscribe" class="btn btn-primary">Get started</a>
    from <header class="masthead border-bottom sticky-top">…</header>
    subtree intercepts pointer events
  13 x retrying click action
```

The marketplace journey times out at 29,915 ms. A second failing message names
`<span class="d-block">Rough Notes</span>` from the same subtree.

Geometry, measured in the running application at 390x844:

```
masthead height      132 px
masthead bottom      170 px
utility bar height    38 px
html scroll-padding-top  auto
```

**This is not a test artifact.** A driver scrolls a control into view and then clicks its centre;
the scroll leaves the control beneath 132 px of sticky chrome, so the click lands on the header. A
person scrolling to a control and tapping it meets the same thing. A run that passes is a run whose
scroll happened to stop somewhere else — unit 5 saw it pass once and fail twice.

It also costs the reader 132 px of a 844 px viewport as permanent chrome, which is 16 % of the
screen at the width where screen is scarcest.

Candidate directions, none of them settled. Rule on them yourself with measurements:

- Declare `scroll-padding-top` on the scroll container, sized to the sticky chrome. This is the
  standard remedy and it fixes anchor jumps and `scrollIntoView` for real readers. **Check whether
  it also fixes the driver**: a driver that scrolls through the browser protocol rather than through
  CSS may ignore scroll padding, in which case this is necessary but not sufficient.
- Shrink the narrow masthead so it covers less.
- Stop the masthead being sticky below `lg`. At 390 it is two stacked rows; sticky chrome that deep
  is a cost rather than a convenience, and this removes the interception at narrow outright.

Whatever you choose, the wide sticky masthead is a deliberate part of the design and stays at `lg`
and above unless your measurements say otherwise — and if they do, say so rather than changing it
quietly.

## Defect two — debug instrumentation in three shipped tests

`tests/app/browser/components/SubscribeForm.test.ts:31`, `ContactForm.test.ts:33`, and
`PaymentForm.test.ts:32` each carry an unconditional seven-argument `console.info` inside the
summary-link loop. It prints 18 lines on every `app:browser` run. It is residue from the measurement
that diagnosed the hit-target defect. Remove the calls; keep every assertion beside them intact,
including the centre-hit proof.

## Defect three — an undocumented state on the request contract

`ApplicationController`'s `#validate` sets `issues.value` to `[]` on a successful `check` and to
`undefined` on a successful `submit`. That distinction is real — `undefined` means unchecked or
accepted, an empty collection means a valid checked draft, which is what preserves revalidation when
a later edit turns the draft invalid. `app/browser/types.ts` does not say so: the `issues` TSDoc
describes neither state.

An empty array is truthy, so a future `v-if="issues"` would paint an empty summary. Document both
states on the contract so the next reader cannot make that mistake. Do not change the behaviour.

## Host facts

- Windows. POSIX syntax in the Bash tool; `npm` resolves as `npm.cmd`.
- Each journey variant is its own Vitest project: `npm run test:journey`.
- Capture mode: `VITE_CAPTURE=true npm run test:journey`, or one project with
  `VITE_CAPTURE=true npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project 'journey:light-390'`.
- Bootstrap emits 329 Sass deprecation warnings from its own imports. Standing condition.
- `tmp/` is swept at acceptance and is not committed.

## Scope

**Owned files:**

- `app/browser/styles/_signature.scss`, `_theme.scss`, `_tokens.scss`
- `app/browser/App.vue` — only for the masthead's own classes or structure
- `app/browser/types.ts` — only the `issues` TSDoc
- `tests/app/browser/components/SubscribeForm.test.ts`, `ContactForm.test.ts`, `PaymentForm.test.ts`
- `tests/app/browser/styles/*.test.ts`
- `tests/app/browser/App.test.ts`

**Off-limits — do not edit, for any reason:**

- Every view component and the four primitives. Units 6, 7, and 8 own the views.
- `app/core/`, `app/browser/controllers/`, `helpers.ts`, `constants.ts`, `composables/`
- `app/browser/styles/index.scss` — its `@use ... with (...)` configuration is settled
- `tests/app/browser/integration.test.ts`, `tests/app/browser/setup.ts` — unit 9 owns them
- `tests/setupPolicy.ts`, `tests/policy.test.ts` — restored by `scaffold repair`
- `guides/README.md`, `vite.config.ts`, `package.json`, `.orkestrel/`, `tmp/authority/`

You are the sole writer in this checkout. Run no `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`. Do not commit, push, or install anything.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

Ordered cheap-first.

1. `npx oxfmt --config .oxfmtrc.json --check <your owned files>` reports correct format.
2. `npx oxlint --config .oxlintrc.json --deny-warnings <your owned files>` is clean.
3. `npm run check` passes.
4. No `console.info`, `console.log`, or `console.debug` survives anywhere under `tests/app/`.
5. The `issues` TSDoc states what `undefined` means and what an empty collection means. Behaviour
   is unchanged.
6. A proof pins the masthead's interception fix: at 390 CSS px, a control scrolled into view below
   the fold resolves to itself at its own centre rather than to the masthead. Prove it can fail by
   reverting your fix, recording the red, and restoring — name the command and both counts.
7. `npm run test:app:browser` passes.
8. `npm run test:journey` is green for all four projects.
9. **`VITE_CAPTURE=true npm run test:journey` is green for all four projects and writes every
   declared frame.** Run it at least twice and report both results; this is the criterion the unit
   exists for and a single pass does not settle a defect that already passed once by luck.
10. No accessible name in the integration suite changes.

**Observations, not criteria:** the `npm test` wall-clock duration; the narrow masthead height after
your change.

## Deviation contract

A conflict with the objective stops you: report expected, found, exact evidence, done or not done,
and at most one hypothesis. Do not edit a view or a primitive. Do not change the request contract's
behaviour. Do not weaken or delete an assertion to make a run green.

Where a detail is ancillary — which partial a rule lives in, how a TSDoc sentence reads — decide it,
record it, and carry on.

## Output

Write your report to `tmp/units/u5b-report.md` in this checkout, and make your final message the
same content. Sections:

1. **Done / not done**, one line each, against the acceptance criteria by number.
2. **The masthead fix** — what you changed, why that direction, and which candidates you rejected
   with the measurement that rejected them. Include whether scroll padding alone was sufficient.
3. **The failing proof** — command, red count, green count.
4. **The capture runs** — both results, per project.
5. **Observations.**
6. **What you did not close**, and why.

No process diary.
