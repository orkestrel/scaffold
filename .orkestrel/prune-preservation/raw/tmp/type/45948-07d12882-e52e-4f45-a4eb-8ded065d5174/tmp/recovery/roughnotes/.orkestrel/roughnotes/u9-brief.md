# Unit 9 — the proof layer and the guide

## Role and engine

`implementer` — Opus 5, native Claude subagent, this checkout, sole serial writer from the clean
committed baseline the Orchestrator names at launch.

## Objective

Make the assembled-application proof bind the defects it claims to cover, widen the resolved-style
matrix to the roles the redesign settled, register the states the redesign added, and bring
`guides/README.md` back to describing what shipped.

## Authority — read before acting, in this order

1. `tmp/authority/AGENTS.md` — the coding contract.
2. `tmp/authority/orchestration.md` — agent operation.
3. `tmp/authority/rules/documentation.md` — note that its `GuideCommand` parity machinery governs a
   published package and does not apply here; W4 says why. Then `rules/tests.md`, `rules/writing.md`,
   `rules/names.md`, `rules/quality.md`, `rules/architecture.md`.
4. `tmp/authority/skill/SKILL.md` and `tmp/authority/skill/references/inspection.md`.
5. `guides/README.md` — the spec you are repairing.
6. `.orkestrel/roughnotes/u3-audit-verdict.md` § A1 — the finding this unit carries.
7. The unit reports `tmp/units/u5-report.md`, `u5b-report.md`, `u6-report.md`, `u7-report.md`,
   `u8-report.md`, `u8b-report.md` — each names what it left for you.

Do not read `node_modules/@orkestrel/scaffold/dist/host/`; it is a superseded vendored copy.

## W1 — the journey guards let a broken application pass

This is the finding that matters most in this unit, and it was measured rather than argued.

`tests/app/browser/integration.test.ts` guards each second submit click:

```js
if (readRefusal(COPY.subscribe) === undefined) {
	await clickAccessible('button', COPY.subscribe)
}
await waitForText('the accepted status paints', COPY.accepted)
```

`readRefusal` returns the resolver's message when the control is absent. Under the self-submitting
defect unit 3 closed, the form had already committed by the time the reader finished typing, so the
button was gone, the guard skipped the click, and `waitForText` read the acceptance **the defect
painted**. An auditor reintroduced the defect and re-ran the journey: the result was identical to
green. The same guard shape sits at the contact and payment journeys.

The guard predates the defect, so this is not unit 3's doing. It is still the reason the only suite
that drives the assembled application cannot see a whole class of defect: a control that disappears
when it should not.

Walk every conditional guard around an interaction in that file and in `setup.ts`. For each, either
remove it so the interaction is unconditional, or keep it and justify it in your report by naming
the legitimate state in which the control is genuinely absent. A guard you keep must not be able to
absorb a defect.

**Prove the fix the way the auditor did**: reintroduce the self-submitting behaviour in
`ApplicationController` — revalidation calling `submit` instead of `check` — confirm the journey now
goes red, and restore. Name the command and both counts. That is a temporary local mutation you
revert, not a committed change; `app/browser/controllers/ApplicationController.ts` is otherwise
off-limits.

## W2 — register the states the redesign added

Units 7 and 8 built states the capture registry does not carry, so `npm test` writes no frame for
them. Add to `STATES` and place each in its journey:

- `contact-accepted`, `payment-accepted`, `newsletter-accepted` — unit 8's accepted states, which are
  the substance of the defect it closed. The contact and payment journeys already drive their
  acceptance to completion, so only the `place(…)` call is missing.
- Rule on whether `/products`, `/magazine`, `/magazine/:slug`, and `/marketplace` earn registered
  states. Units 7 and 8 each had to shoot throwaway probe frames because the registry does not carry
  them. A design review that cannot see a screen cannot judge it.

## W3 — widen the resolved-style matrix

The matrix currently reads three values for the whole surface: contrast on `Shop catalog`, contrast
and focus ring on `Subscribe free`. That was F10, and it was deferred to this unit deliberately
because the roles it must read did not exist until the views settled.

Widen it to read every surface role the redesign declared, in every declared variant: body text on
each surface, the secondary tier, `Notice` in each of its four categories, `Entry` titles and fact
values, a primary commit, an outline control, a plain link, a filter row's selected and unselected
controls, a form label, an `invalid-feedback` message, the error summary, and the focus ring on each.
Hold the bars the skill fixes: 4.5:1 for information-bearing text including large text, 3:1 for
meaningful textless marks and state and focus chrome.

Four readings the unit reports named as inherited rather than measured, which this unit should now
measure directly:

- the footer group headings and the utility bar contact links on navy, in each theme (unit 5);
- the `confirm` check badges on the navy `invite` and `panel` surfaces (unit 6);
- the `partial` notice's quiet surface in dark (unit 7);
- the `partial` notice beside the office panel on `/contact` in dark (unit 8).

Report every reading. If one fails its bar, that is a finding, not a failure of this unit — record it
and carry it to the Orchestrator rather than repainting a view you do not own.

## W4 — the guide describes what shipped

`guides/README.md` no longer describes the application. It documents none of: the four primitives
and `Brand`, `Entry`'s `rank`, the new types, `MENU_ITEMS`, `UTILITY_GROUPS`, `FOOTER_GROUPS`,
`NOTICE_MARKS`, `COPY.ask`, `readHost`, `shellHref`, `followArticle`, the accepted-state contract,
the partial inquiry, the media list rows and their derived external cue, the publications desk facts,
the masthead being sticky only from `lg`, or the data states each screen paints.

It also still describes things that changed: the shell section calls the masthead sticky without
qualification, home's invite carries a form it no longer has, and the color-mode section describes
islands that moved.

Update the prose and the concept index so both describe what shipped. The concept index runs
spec ↔ source ↔ tests, and every path it names must exist.

**Write no parity test, add no `test:guides` script, declare no `guides` project, and import
`@orkestrel/guide` nowhere.** The Orchestrator briefed that in error and withdrew it. The parity
machinery in `.claude/rules/documentation.md` — `GuideCommand`, `findDrift`, `tagline`, `Summary`
cells against doc blocks — compares a **published package's** guide against its exports. This
workspace is `private: true` with no `exports` and no `main`; it publishes nothing. Its guide has no
`## Surface` table and no `Summary` cells, and its index is headed `## Concept index`, which
`parseManifest` does not key on. Both sides of that comparison are empty here.

What that rule does oblige an app-only workspace is one sentence: it "still owes a full index over
the columns it has." That is the concept index, and it is prose.

A previous attempt at this unit was stopped mid-W4. It left a stub `tests/guides.test.ts` and a
`guides` project in `vite.config.ts`; the Orchestrator removed both. Do not recreate them.

## W5 — the widened matrix found a reading you must resolve

W3's matrix is doing its job: it found a failure the old three-reading matrix could not see.

```
VITE_CAPTURE=true npm run test:journey
  journey:dark-1280 and journey:light-390
  home | outline control reads 1.442 against a 4.5 bar
```

The Orchestrator measured the application directly and could not reproduce it there. Every
`btn-outline-primary` and `btn-outline-secondary` on home reads **15.538:1** in a light root and
**13.303:1** in a dark root, at rest, against the body surface each actually sits on.

Two facts that bound the diagnosis:

- The role the matrix reads as `outline control` on home is the **masthead theme toggle**, resolved
  by the accessible name `Use dark theme` or `Use light theme`.
- `readSurface` measures against a gradient's stops when it finds a gradient, and takes the worst.
  `1.442` is very close to navy `#0a2540` against `--rn-navy-mid` `#123a63` — the hero's middle
  gradient stop. The toggle is in the masthead, not in the hero.

So the likely reading is that the reader resolves the control against a gradient that is not behind
it. Establish which it is before changing anything:

- **If the reader is wrong**, fix the reader so it resolves the surface actually behind the element,
  and keep a negative control proving it still catches a genuine gradient failure.
- **If the application is wrong**, do not repaint a view you do not own — report the reading, the
  element, and the surface, and carry it to the Orchestrator.

Either way, name the element, the foreground, and every stop or surface the reader compared, so the
answer is a measurement rather than a conclusion.

## Host facts

- Windows. POSIX syntax in the Bash tool; `npm` resolves as `npm.cmd`.
- Each journey variant is its own Vitest project: `npm run test:journey`. Capture:
  `VITE_CAPTURE=true npm run test:journey`.
- `tests/config.test.ts` asserts each declared project's include and setup files, reads `exclude` as
  a first-class field, and tolerates extra project labels. A new project must keep it green.
- Bootstrap emits 329 Sass deprecation warnings from its own imports. Standing condition.

## Scope

**Owned files:**

- `tests/app/browser/integration.test.ts`, `tests/app/browser/setup.ts`
- `guides/README.md`
- `app/browser/constants.ts` — only to resolve the two orphaned `COPY` members

**Off-limits — do not edit, for any reason:**

- Every `.vue` file and every component test. The views are settled.
- `app/core/`, `app/browser/types.ts`, `controllers/`, `helpers.ts`, `composables/`, `styles/`
- `tests/setupPolicy.ts`, `tests/policy.test.ts` — restored by `scaffold repair`
- `package.json` and `vite.config.ts` — no new script, no new project
- `tests/guides.test.ts` — do not create it
- `.orkestrel/`, `tmp/authority/`, `node_modules/`, `dist/`

A temporary mutation to prove W1 is not an edit: revert it before you finish and show the tree clean.

You are the sole writer in this checkout. Run no `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`. Do not commit, push, or install anything.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

Ordered cheap-first.

1. `npx oxfmt --config .oxfmtrc.json --check <your owned files>` reports correct format.
2. `npx oxlint --config .oxlintrc.json --deny-warnings <your owned files>` is clean.
3. `npm run check` passes.
4. Every conditional guard around an interaction in the journey suite is either removed or justified
   by name in your report.
5. W1's mutation proof: the journey goes red with the self-submitting behaviour reintroduced, and
   green with it restored. Command and both counts named. The tree is clean afterwards.
6. The three accepted states are registered and placed, and your ruling on the four unregistered
   screens is implemented.
7. The matrix reads every role named in W3 in every declared variant, and every reading is in your
   report. The four inherited readings are measured.
8. `guides/README.md` describes what shipped, and every path its concept index names exists. No
   `tests/guides.test.ts`, no `test:guides` script, no `guides` project, no `@orkestrel/guide` import.
9. W5 is resolved: the 1.442 reading is either a reader defect you fixed with a negative control
   still catching a genuine gradient failure, or an application reading you report with its element,
   foreground, and surfaces.
10. `npm test` is green end to end.
11. `VITE_CAPTURE=true npm run test:journey` is green for all four projects and writes every
    registered frame.

**Observations, not criteria:** the `npm test` wall-clock duration; any contrast reading that fails
its bar.

## Deviation contract

A conflict with the objective stops you: report expected, found, exact evidence, done or not done,
and at most one hypothesis. Do not edit a view to make a reading pass — report the reading. Do not
weaken a journey assertion. Do not delete a declared symbol to satisfy parity; rule on it.

Where a detail is ancillary — which helper a matrix reading lives in, how a guide sentence is
worded — decide it, record it, and carry on.

## Output

Write your report to `tmp/units/u9-report.md` in this checkout, and make your final message the same
content. Sections:

1. **Done / not done**, one line each, against the acceptance criteria by number.
2. **The guards** — every conditional guard, and whether it went or stayed and why.
3. **W1's mutation proof** — command, red count, green count.
4. **The matrix** — every reading, by role and variant. Name any that fails its bar.
5. **The registry** — what you added, and your ruling on the unregistered screens.
6. **The guide** — what it said, and what it says now.
7. **W5** — the element, the foreground, the surfaces compared, and your ruling.
8. **Rulings** — the two orphaned `COPY` members, and anything else you settled.
9. **Observations.**
10. **What you did not close**, and why.

No process diary.
