# Unit 2 — the variant gate

## Role and engine

`sol` — GPT-6 Astra (`gpt-6-astra`), `codex exec`, sandbox `workspace-write`, this checkout, sole
serial writer from a clean committed baseline at `b20d049`.

## Objective

Make `npm test` run all four declared capture variants, and establish from observable behaviour why
each currently-failing journey fails. Fix the failures whose cause lives in the files this unit
owns. Hand every failure whose cause lives in application code back to the Orchestrator as a named
deviation with evidence — do not fix application code, and do not weaken a proof to make a failure
disappear.

## Authority — read before acting, in this order

1. `tmp/authority/AGENTS.md` — the coding contract.
2. `tmp/authority/orchestration.md` — agent operation.
3. `tmp/authority/rules/tests.md`, `rules/typescript.md`, `rules/names.md`, `rules/quality.md`,
   `rules/workspace.md`, `rules/writing.md`.
4. `guides/README.md` § Proving the surface — the declared families and variants.
5. `.orkestrel/roughnotes/plan.md` — the reconciled plan this unit serves.
6. `.orkestrel/roughnotes/baseline-evidence.md` — the readings this unit must reproduce.

Do not read `node_modules/@orkestrel/scaffold/dist/host/`; it is a superseded vendored copy.

## Context

`C:\Users\mikes\WebstormProjects\roughnotes`, a private Vue 3 + Bootstrap 5.3 application.

The declared capture variants are `light-1280`, `dark-1280`, `light-390`, and `dark-390`
(`tests/app/browser/integration.test.ts`). One run renders one variant, named by `VITE_VARIANT`,
defaulting to `light-1280`. `package.json`'s `test:app` script sets no `VITE_VARIANT`, so
`npm test` only ever runs `light-1280` and the other three variants' failures are invisible to the
gate chain.

Host facts your commands run under:

- Windows, Git Bash. `npm` resolves as `npm.cmd` from this shell.
- Vitest browser mode drives real Chromium through Playwright. A full integration run of one
  variant takes about 14 seconds.
- Run one variant with:
  `VITE_VARIANT=<variant> npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser tests/app/browser/integration.test.ts`
- Add `VITE_CAPTURE=true` to write frames to `tmp/capture/states/`.
- The Sass build emits 313 repetitive deprecation warnings on every run. That is a known standing
  condition owned by a later unit. Ignore it; it is not your failure.
- `tmp/` is swept at acceptance and is not committed.

## The failures you are diagnosing

Measured by the Orchestrator on the tip before this unit, recorded in
`.orkestrel/roughnotes/baseline-evidence.md`:

| Variant      | Result                      |
| ------------ | --------------------------- |
| `light-1280` | 18 passed                   |
| `dark-1280`  | 3 failed, 15 passed         |
| `light-390`  | 4 failed, 13 passed, 1 skip |
| `dark-390`   | 5 failed, 12 passed, 1 skip |

- **V1** `dark-1280`, `dark-390` — `expected 'No interactive element has the access…' to be
  undefined`. The theme control cannot be resolved by its dark-mode accessible name immediately
  after `paintVariant` calls `app.theme(true)`.
- **V2** `light-390`, `dark-390` — `Interactive target "Shop" is not visible and focus-reachable`.
- **V3** `light-390`, `dark-390` — `Interactive target "Skip to content" is not reachable through
  forward Tab traversal`, the traversal walking offcanvas links into footer links.
- **V4** `dark-390` — `expected '' to be 'payment-customer'`. The payment error-summary link leaves
  focus on the body rather than on the field it names.
- **V5** every red variant — the capture family's completeness proof fails because states its failed
  journeys own were never placed.

**One measurement the Orchestrator already took, which bounds your V3 diagnosis.** Driving real Tab
keypresses against the open offcanvas at 390 CSS px in a live browser, Bootstrap's focus trap
**holds**: focus stays inside the panel across repeated Tab presses. So V3 is not a live keyboard
defect. Establish what the traversal helper actually walks before changing anything, and say so.

**One cause the Orchestrator has already traced, which is NOT yours to fix.** V4's mechanism is that
the forms revalidate on blur by calling the *committing* application method
(`app/browser/components/PaymentForm.vue`'s `check` calls `app.pay`), so moving focus to a summary
link blurs a field, re-runs validation, re-renders the form, and the node `focusNode` targets is
replaced under it. Separating parsing from committing belongs to unit 3, which owns
`app/browser/types.ts` and `ApplicationController.ts`. Report V4's cause with your evidence and
leave it red. Unit 3 closes it.

## Unknowns

- Whether V1's cause is a missing render flush in the test before the accessible-name lookup, or an
  application-side reactivity fault. The Orchestrator has not settled it. Establish it from
  observable behaviour and say which. If it is application-side, report and leave it red.
- Whether V2 is a genuine reachability defect or a journey that assumes a wide-viewport navigation
  at a narrow viewport where the destinations correctly live behind the menu. Rule on it with
  evidence.
- Whether running four variants sequentially in one `npm test` exceeds a reasonable gate duration on
  this host. Measure it and report the number.

## Scope

**Owned files — you may edit only these:**

- `package.json`
- `tests/app/browser/integration.test.ts`
- `tests/app/browser/setup.ts`

**Off-limits — do not edit, for any reason:**

- Everything under `app/`. Application behaviour is unit 3's and later units'.
- `tests/setupPolicy.ts` and `tests/policy.test.ts` — restored by `scaffold repair`.
- `guides/README.md` — unit 9 owns it.
- `.orkestrel/`, `tmp/authority/`, `node_modules/`, `dist/`.
- Every other file under `tests/`.

You are the sole writer in this checkout. Run no `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`. Do not commit, push, or install anything. Do not run a tree-wide
`format` or lint `--fix`; validate read-only and scoped to your owned files.

## Execution

You are the bench engine reading this brief inside your own CLI session. Perform this assignment
directly. Spawn nothing.

## Acceptance criteria

Ordered cheap-first.

1. `npx oxfmt --config .oxfmtrc.json --check package.json tests/app/browser/integration.test.ts tests/app/browser/setup.ts` reports correct format.
2. `npx oxlint --config .oxlintrc.json --deny-warnings tests/app/browser/integration.test.ts tests/app/browser/setup.ts` is clean.
3. `npm run check` passes.
4. `npm test` invokes the integration suite once per declared variant — `light-1280`, `dark-1280`,
   `light-390`, `dark-390` — and the variant name each run used is visible in its output. Derive the
   variant list from the declared `VARIANTS` where the script can; do not hand-maintain a second
   list that can drift from it.
5. Each of V1, V2, V3 is either fixed in an owned file, or reported with the evidence that places
   its cause in application code. No assertion is deleted, skipped, loosened, made conditional, or
   given a broader selector to make a failure disappear. No accessible-name assertion changes value.
6. The capture registry names the shop **listing** and the SKU **detail** as separate states, so
   each has its own frame. The listing has no capture today; `shop--<variant>.png` is the detail.
7. V4 remains red with its cause reported, unless your own evidence contradicts the Orchestrator's
   trace — in which case say so and give the evidence.
8. `tests/app/browser/setup.test.ts` still passes.

**Observations, not criteria** — report your reading, do not gate on them:

- The full `npm test` wall-clock duration on this host.
- The per-variant pass and fail counts after your change.
- The 313 Sass deprecation warnings.

## Deviation contract

A conflict with the objective stops you: report expected, found, exact evidence, done or not done,
and at most one hypothesis. Do not investigate application code beyond what diagnosis requires, do
not improvise a fix outside your owned files, and do not alter the plan.

Where a detail is ancillary — which helper a diagnosis lives in, how a script name reads — decide it,
record it, and carry on.

## Output

Write your report to `tmp/units/u2-variant-gate-report.md` in this checkout, and make your final
message the same content. Sections:

1. **Done / not done**, one line each, against the acceptance criteria by number.
2. **Per-failure diagnosis** — V1 through V5, each with: the cause you established, the observable
   evidence that establishes it (command and output), whether you fixed it, and where the fix lives.
3. **The gate** — the exact `npm test` shape you shipped, and the per-variant result after your
   change.
4. **Observations** — the readings named above.
5. **What you did not close**, and why.

No process diary.
