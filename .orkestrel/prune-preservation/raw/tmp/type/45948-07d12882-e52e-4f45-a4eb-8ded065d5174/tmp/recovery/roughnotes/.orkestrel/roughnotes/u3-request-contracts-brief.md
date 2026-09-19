# Unit 3 — request contracts

## Role and engine

`sol` — GPT-6 Astra (`gpt-6-astra`), `codex exec`, sandbox `workspace-write`, this checkout, sole
serial writer from the clean committed baseline the Orchestrator names at launch.

## Objective

Stop the three forms from committing a request while the reader is still typing, bring the request
members of `ApplicationInterface` under the single-word rule, and give every error-summary entry a
target a pointer can actually hit. These are three separate defects that happen to share three
files.

## Authority — read before acting, in this order

1. `tmp/authority/AGENTS.md` — the coding contract. § Non-negotiable rules, § Design laws, § TTTDD.
2. `tmp/authority/orchestration.md` — agent operation.
3. `tmp/authority/rules/names.md`, `rules/typescript.md`, `rules/architecture.md`,
   `rules/patterns.md`, `rules/browser.md`, `rules/tests.md`, `rules/quality.md`, `rules/writing.md`.
4. `guides/README.md` § Subscription parsing, § Inquiry parsing, § Invoice parsing, § Subscribe,
   § Contact, § Pay a bill.
5. `.orkestrel/roughnotes/plan.md` — the reconciled plan this unit serves.
6. `.orkestrel/roughnotes/finding-validation-commits.md` — the reproduction you must close.

Do not read `node_modules/@orkestrel/scaffold/dist/host/`; it is a superseded vendored copy.

## Context

`C:\Users\mikes\WebstormProjects\roughnotes`, a private Vue 3 + Bootstrap 5.3 application.

**Defect one — validation commits.** Each form revalidates on `blur` and on `input` by calling the
application's committing method. `SubscribeForm.vue`'s `check` calls `app.subscribe(...)`,
`ContactForm.vue`'s calls `app.inquire(...)`, `PaymentForm.vue`'s calls `app.pay(...)`. Each of
those sets the accepted record and emits its event
(`app/browser/controllers/ApplicationController.ts`). `check` runs only once the issues are set, so
the path opens after one refused submit, and from there the keystroke that makes the draft valid
commits it. The Orchestrator reproduced this in a live browser; the reading is in the finding file
named above.

**Defect two — multiword entity members.** `ApplicationInterface` carries `subscription` / `issues`,
`inquiry` / `inquiryIssues`, and `payment` / `paymentIssues` (`app/browser/types.ts`).
`inquiryIssues` and `paymentIssues` are multiword entity members. `AGENTS.md` § Design laws states
the remedy directly: where one word is insufficient, change the shape — group the members into a
sub-entity — rather than lengthen the name. The unqualified `issues` is the same problem read from
the other side: it names the subscription's issues without saying so, and only survives because it
got there first.

**Defect three — the error-summary links have no target at their own centre.** At 390 CSS px two
of the three payment summary entries wrap onto a second line. An inline box that wraps produces one
rectangle per line with a gap between them and a single bounding box spanning both, so the box
centre falls in that gap and the hit target there is the list item, not the link. Measured in the
running application and again inside the harness:

```
link box 143x47 | centre hits SMALL | reaches link false
```

A person tapping the visual middle of a two-line error link gets nothing. A pointer driver aiming at
the box centre misses too, which is the whole reason the `journey:light-390` and `journey:dark-390`
projects are red on `expected '' to be 'payment-customer'` while both 1280 projects pass.

`.orkestrel/roughnotes/finding-wrapped-link-target.md` holds the measurement and strikes two earlier
wrong diagnoses of this same failure — do not revisit either.

Host facts your commands run under:

- Windows, Git Bash. `npm` resolves as `npm.cmd` from this shell.
- Vitest browser mode drives real Chromium through Playwright.
- Each declared journey variant is now its own Vitest project, declared in `vite.config.ts` as
  `journey:<name>`. Run them with `npm run test:journey`, or one with
  `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project 'journey:light-390'`.
  The current name and the declared set reach the suite through Vitest `provide`/`inject`, not
  through `VITE_VARIANT`. Do not reintroduce a `define` channel: these projects share one module
  graph, so a transform-time substitution leaks the last project's value into every project.
- `followField` in the integration suite reports the geometry it clicked. Its reading is your
  evidence for defect three.
- The Sass build emits 313 repetitive deprecation warnings on every run. Known standing condition,
  owned by unit 4. Ignore it.
- `tmp/` is swept at acceptance and is not committed.

## Unknowns

- The exact sub-entity shape that satisfies the single-word rule while keeping the views readable.
  The Orchestrator has **not** settled it and will audit what you propose. State your shape in
  `app/browser/types.ts` first, with its reasoning in TSDoc, before implementing it.
- Whether the emitter's `subscribe`, `inquire`, and `pay` events need renaming to match the new
  shape. Rule on it; a rename is allowed but must carry every consumer.
- Whether closing defect one alone closes defect three. Measure it.

## Scope

**Owned files — you may edit only these:**

- `app/browser/types.ts`
- `app/browser/controllers/ApplicationController.ts`
- `app/browser/components/SubscribeForm.vue`
- `app/browser/components/ContactForm.vue`
- `app/browser/components/PaymentForm.vue`
- `app/browser/index.ts` — only if the barrel must change
- `app/browser/styles/_signature.scss` — ONLY to give the summary entries a contiguous target, and
  only if a shipped Bootstrap utility cannot express it. Reach the utility rung before the authored
  rung, and say in your report which rung you used and why.
- `tests/app/browser/controllers/ApplicationController.test.ts`
- `tests/app/browser/components/SubscribeForm.test.ts`
- `tests/app/browser/components/ContactForm.test.ts`
- `tests/app/browser/components/PaymentForm.test.ts`
- `tests/app/browser/composables/useApplication.test.ts` — only if the contract change reaches it

**Shared, report-only — return an exact patch, do not edit:**

- `tests/app/browser/integration.test.ts` and `tests/app/browser/setup.ts` — unit 2 owns them and
  unit 9 owns them next. If a journey must change to match the corrected behaviour, return the exact
  patch in your report and say why.

**Off-limits — do not edit, for any reason:**

- Everything under `app/core/`. The parsers and their rules are correct and stay.
- Every view component other than the three forms named above.
- `app/browser/styles/`, except the one `_signature.scss` allowance named in the owned list above.
  Unit 4 owns everything else there, including tokens, the theme, and every other signature rule.
- `app/browser/App.vue`, `constants.ts`, `helpers.ts` — unit 5 owns them.
- `guides/README.md` — unit 9 owns it.
- `tests/setupPolicy.ts`, `tests/policy.test.ts` — restored by `scaffold repair`.
- `package.json`, `.orkestrel/`, `tmp/authority/`, `node_modules/`, `dist/`.

You are the sole writer in this checkout. Run no `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`. Do not commit, push, or install anything. Do not run a tree-wide
`format` or lint `--fix`; validate read-only and scoped to your owned files.

## Execution

You are the bench engine reading this brief inside your own CLI session. Perform this assignment
directly. Spawn nothing.

## Acceptance criteria

Ordered cheap-first.

1. `npx oxfmt --config .oxfmtrc.json --check <your owned files>` reports correct format.
2. `npx oxlint --config .oxlintrc.json --deny-warnings <your owned files>` is clean.
3. `npm run check` passes.
4. Every request member reachable on `ApplicationInterface` is a single descriptive word. No member
   named `inquiryIssues`, `paymentIssues`, or any other multiword entity member survives. No `any`,
   no `as`, no `!`, no suppression comment.
5. The contract change lands in `app/browser/types.ts` before its implementation, with readonly
   interface properties and readonly public return collections.
6. A test drives the reproduction in `.orkestrel/roughnotes/finding-validation-commits.md` through
   the shipped form and asserts that after a refused submit, making the draft valid by typing leaves
   the form present, paints no acceptance, and emits no event. **Record this test failing against
   the current behaviour before you change the behaviour, and name the exact command and its failing
   count in your report.** A test that never ran red does not bind to the defect it claims.
7. The same proof exists for all three forms.
8. `npm run test:app:browser` passes.
9. For every error-summary entry on all three forms, at 320 and 390 CSS px,
   `document.elementFromPoint` at the entry's bounding-box centre resolves to that entry's link.
   Prove it in the browser suite, not by reading markup.
10. `npm run test:journey` is green for all four projects — `journey:light-1280`,
    `journey:dark-1280`, `journey:light-390`, `journey:dark-390`. This is the unit at which the
    journey gate goes green; unit 2 deliberately left the application-caused failures red.
11. `npm test` exits 0 end to end.

**Observations, not criteria** — report your reading, do not gate on them:

- The full `npm test` wall-clock duration and its per-variant results.
- Whether any journey assertion in the shared files needs a patch, with that patch.
- The 313 Sass deprecation warnings.

## Deviation contract

A conflict with the objective stops you: report expected, found, exact evidence, done or not done,
and at most one hypothesis. Do not widen the API beyond what the defect requires, do not add a
compatibility shim, and do not alter the plan. Update every consumer of a changed contract in this
same change.

Where a detail is ancillary — which file a helper lives in, how a TSDoc paragraph reads — decide it,
record it, and carry on.

## Output

Write your report to `tmp/units/u3-request-contracts-report.md` in this checkout, and make your
final message the same content. Sections:

1. **Done / not done**, one line each, against the acceptance criteria by number.
2. **The shape** — the contract you declared, and why it satisfies the single-word rule without a
   wrapper that translates nothing.
3. **The failing proof** — the command, its failing count before your change, and the same command
   green after. Per form.
4. **Defect three** — whether closing defect one closed it, with the measurement.
5. **Shared-file patches** — exact patches for files you do not own, or none.
6. **Observations** — the readings named above.
7. **What you did not close**, and why.

No process diary.
