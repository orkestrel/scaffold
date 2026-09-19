# Unit 12 — the style instruments, and the refused write

## Role and engine

`implementer` — Opus 5, native Claude subagent, this checkout, sole serial writer from the clean
committed baseline the Orchestrator names at launch.

## Objective

Make three style instruments capable of failing, and close the application defect unit 11's
storage-failure leg exposed.

## Authority — read before acting, in this order

1. `tmp/authority/AGENTS.md`, then `tmp/authority/rules/quality.md` — its Instruments section is the
   law this unit serves — plus `rules/tests.md`, `rules/styles.md`, `rules/browser.md`,
   `rules/writing.md`.
2. The skill's `references/styles.md` at
   `C:\Users\mikes\WebstormProjects\scaffold\.agents\skills\orkestrel-prove-journey\references\`, and
   `references/inspection.md` at
   `C:\Users\mikes\WebstormProjects\scaffold\.claude\skills\enterprise-bootstrap\references\`.
3. `.orkestrel/roughnotes/journey-readiness-verdict.md` — findings R4, R5, R6.
4. `.orkestrel/roughnotes/u11-report.md` section 5 — the refused-write finding, with what closing it
   needs.

Do not read `node_modules/@orkestrel/scaffold/dist/host/`; it is a superseded vendored copy.

## The rule this unit exists for

`.claude/rules/quality.md` states it: an instrument is not evidence until it has failed. Pair every
probe, comparison, or matrix with a negative control that must report failure, run under the same
conditions. And: state an instrument's coverage beside its result, because a conclusion inherits the
instrument's scope rather than the question's, and an unstated coverage claim is read as complete.

Three instruments in this suite report results without ever having failed at the thing they exist to
catch. Each fix has the same shape: feed the branch the instrument exists for, and report the
population walked.

**R4 — the composited-contrast control never fails.** Every harness control the matrix composes reads
through an element painting its own opaque background, so the ancestor walk and the alpha blend the
reader exists for are never exercised. Compose a translucent stack inside the variant loop: an opaque
base, a translucent tint over it, and a foreground chosen so a flat read passes 4.5 while the
composited read is under it. Assert the composited read is under the bar for that fixture, and keep a
second element over the same stack whose composite passes, so the control discriminates rather than
merely failing.

**R5 — the authored-class census never reports its population.** It refuses an empty one and reports
nothing else, and it walks the home screen alone. Push a census row into the matrix rows for each
variant naming the membership rule, the count walked, and any unresolved token. Either repeat the
census on the screens the loop already drives, or state that bound in the same row — an unstated
coverage claim is read as complete.

**R6 — the style-escape control covers only the inline-attribute half.** The `<style>`-element branch
the property exists to catch is never fed, no permitted fixture is present for the reader to leave
alone, and the reading reports no population. Feed both branches, add the permitted fixture, and
report the element count walked.

## The application defect

Unit 11 drove a `Storage` that refuses a write and recorded what the interface does:
`ApplicationController.theme` assigns `dark.value` before it persists. A refused write leaves the
flag flipped, so the masthead control relabels itself and announces `pressed=true` while the document
still paints light; the `QuotaExceededError` escapes as an unhandled error; and the person is told
nothing.

Close it. Three decisions the application owns:

1. Catch the refusal at the boundary that performs the write, so it does not escape unhandled.
2. Leave the flag and the control consistent with what the document actually paints. A control must
   not announce a mode the page is not in.
3. Decide whether the person is told. The skill's transport family wants a failure sentence a person
   reads and a retry control that clears it. Rule on it: a colour-mode preference that could not be
   remembered is a different weight of failure from a lost payment, and an alert for it may be worse
   than silence. If you rule against a sentence, say why, and make sure the control still tells the
   truth about the mode.

Unit 11's transport test asserts the current behaviour — the drift it found. Update it to assert what
you ship, and keep it able to fail: the refusal must still be driven through a real refusing store.

## Host facts

- Windows. POSIX syntax in the Bash tool; `npm` resolves as `npm.cmd`.
- `npm run test:journey`; `VITE_CAPTURE=true npm run test:journey` writes frames. The registry holds
  26 states and writes 104 frames.
- Bootstrap emits 329 Sass deprecation warnings from its own imports. Standing condition.
- `CONTENT_CONTROL`'s comment in `setup.ts` calls `Shop catalog` an in-content link home carries;
  home paints no such link and the name resolves to the footer destination. Correct the comment.

## Scope

**Owned files:**

- `tests/app/browser/integration.test.ts`, `tests/app/browser/setup.ts`
- `app/browser/controllers/ApplicationController.ts`
- `app/browser/helpers.ts` — only if the write boundary belongs there
- `tests/app/browser/controllers/ApplicationController.test.ts`
- `app/browser/types.ts` and `app/browser/constants.ts` — only if your ruling on point 3 needs a
  declared member or a copy line

**Off-limits — do not edit, for any reason:** every view component and its test, `app/core/`,
`app/browser/styles/`, `guides/README.md`, `tests/setupPolicy.ts`, `tests/policy.test.ts`,
`vite.config.ts`, `package.json`, `.orkestrel/`, `tmp/authority/`.

You are the sole writer in this checkout. Run no `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`. Do not commit, push, or install anything.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

Ordered cheap-first.

1. `npx oxfmt --config .oxfmtrc.json --check <your owned files>` reports correct format.
2. `npx oxlint --config .oxlintrc.json --deny-warnings <your owned files>` is clean.
3. `npm run check` passes.
4. Each of the three instruments has a negative control that fails at the branch the instrument
   exists for, run under the same conditions, and you have shown each control failing by temporarily
   disabling the reader and recording the red. Name the command and both counts per instrument.
5. Each of the three reports the population it walked, in the written artifact.
6. A refused write no longer escapes unhandled, and no control announces a mode the document does not
   paint. Proven by a test driving a real refusing store.
7. Your ruling on whether the person is told is implemented and justified in the report.
8. `npm run test:app:browser` passes.
9. `npm run test:journey` is green for all four projects.
10. `VITE_CAPTURE=true npm run test:journey` is green for all four projects and writes every
    registered frame.
11. `npm test` exits 0.

**Observations, not criteria:** wall-clock durations; any reading that changes.

## Deviation contract

A conflict with the objective stops you: report expected, found, exact evidence, done or not done,
and at most one hypothesis. Do not weaken an assertion to make a run green. Do not edit a view. Do
not add the statechart family.

Where a detail is ancillary — which fixture colours a control uses, how a census row is worded —
decide it, record it, and carry on.

## Output

Write your report to `tmp/units/u12-report.md`, and make your final message the same content:

1. **Done / not done** per criterion.
2. **Each instrument** — what it now feeds, its control, and the red you recorded proving the control
   fails.
3. **The populations** — what each instrument reports walking, and its bound.
4. **The refused write** — what you changed, your ruling on telling the person, and why.
5. **Observations.**
6. **What you did not close**, and why.

No process diary.
