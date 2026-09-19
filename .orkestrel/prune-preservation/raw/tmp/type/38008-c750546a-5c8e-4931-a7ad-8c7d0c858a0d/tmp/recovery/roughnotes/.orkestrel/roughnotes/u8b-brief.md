# Unit 8b — the dark repaint leaks into nested light scopes

## Role and engine

`sol` — GPT-6 Astra (`gpt-6-astra`), `codex exec`, sandbox `workspace-write`, this checkout, sole
serial writer from the clean committed baseline the Orchestrator names at launch.

## Objective

Make a nested `data-bs-theme` scope restore what an ancestor-scoped descendant selector overrode, so
a control inside a forced-light island on a dark page paints for the scope it is in.

## Authority — read before acting, in this order

1. `tmp/authority/AGENTS.md` — the coding contract.
2. `tmp/authority/rules/styles.md`, `rules/browser.md`, `rules/tests.md`, `rules/quality.md`,
   `rules/writing.md`.
3. `tmp/authority/skill/SKILL.md`, and from `tmp/authority/skill/references/`: `color-modes.md` —
   which owns mode inheritance, surface ownership, and nested scopes — plus `bootstrap-reference.md`
   and `utilities.md`.
4. `guides/README.md` § Color mode.
5. `.orkestrel/roughnotes/u8-report.md` § 6, which carries the measurement.

Do not read `node_modules/@orkestrel/scaffold/dist/host/`; it is a superseded vendored copy.

## The defect, measured

`app/browser/styles/_theme.scss` writes its dark-mode component overrides as descendant selectors:

```scss
[data-bs-theme='dark'] {
	.btn-primary { --bs-btn-color: var(--rn-navy); --bs-btn-bg: var(--bs-body-color); … }
	.btn-outline-primary { … }
	.btn-outline-secondary { … }
}
```

A descendant selector matches **every** descendant of a dark root, including one inside a nested
`data-bs-theme="light"` scope. The `var(--bs-body-color)` those rules assign then resolves in the
nested light scope, so the control gets the dark rule's intent with the light scope's values.

Unit 8 measured it by putting a `btn-primary` inside the forced-light subscribe form card on the
navy invite band. All four journey projects went red with
`expected 1.1124211287157046 to be greater than or equal to 4.5`. A probe against the shipped
cascade read the control as `color rgb(10, 37, 64)` on `background rgb(15, 27, 45)` — navy on
near-navy — inside a card whose own background is `rgb(255, 255, 255)`.

Gold never surfaced this because `.btn-warning` carries no dark override.

Unit 8 composed around it by moving that form out of the dark scope. The stylesheet is unrepaired,
and the trap is live: `app/browser/components/HomeView.vue` still nests a forced-light `.issue` card
inside the dark hero. Nothing inside it is a `.btn-primary` today, so it is inert — and the next unit
that puts one there meets a 1.11:1 control with no warning.

This is why it is worth fixing rather than documenting: the defect is invisible until someone writes
correct markup, and then it fails as a contrast reading rather than as anything that names its cause.

## Unknowns

- The right mechanism. `color-modes.md` owns nested scopes; read what it prescribes before choosing.
  Candidates, none settled: declare the overrides as variables on the scope root so a nested scope's
  own root re-declares them; bound each selector so it stops at the nearest scope; or restructure the
  overrides to consume tokens that are already scope-local. Rule with a measurement, not a preference.
- Whether the same leak reaches anything besides the three button rules — the focus ring, the
  `--rn-accent` retune, or `.card[data-bs-theme='dark']`. Check rather than assume, and report what
  you checked.

## Scope

**Owned files:**

- `app/browser/styles/_theme.scss`, `_tokens.scss`, `_signature.scss`
- `tests/app/browser/styles/*.test.ts`

**Off-limits — do not edit, for any reason:**

- Every `.vue` file. If a view must change to prove the fix, return an exact patch instead.
- `app/browser/styles/index.scss` — its `@use ... with (...)` configuration is settled
- `app/core/`, `app/browser/types.ts`, `controllers/`, `helpers.ts`, `constants.ts`, `composables/`
- `tests/app/browser/integration.test.ts`, `tests/app/browser/setup.ts` — unit 9 owns them
- `tests/setupPolicy.ts`, `tests/policy.test.ts` — restored by `scaffold repair`
- `guides/README.md`, `vite.config.ts`, `package.json`, `.orkestrel/`, `tmp/authority/`

You are the sole writer in this checkout. Run no `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`. Do not commit, push, or install anything.

## Execution

You are the bench engine reading this brief inside your own CLI session. Perform this assignment
directly. Spawn nothing.

## Acceptance criteria

Ordered cheap-first.

1. `npx oxfmt --config .oxfmtrc.json --check <your owned files>` reports correct format.
2. `npx oxlint --config .oxlintrc.json --deny-warnings <your owned files>` is clean.
3. `npm run check` passes.
4. No `style` attribute, no SFC `<style>` block, no new package. Every authored rule that survives is
   named in your report with the gap it fills.
5. A proof mounts a `btn-primary`, a `btn-outline-primary`, and a `btn-outline-secondary` inside a
   nested `data-bs-theme="light"` scope within a dark root, and reads each one's resolved foreground
   against its resolved background. Each clears 4.5:1. **Record the proof failing against the current
   stylesheet first** — name the command and both counts — then green after the fix.
6. The same three controls still clear 4.5:1 directly inside a dark scope, and inside a light root.
   The fix must not trade one mode for another.
7. Whatever else you found leaking is either fixed or reported with the reading that says it does not
   leak.
8. `npm run test:app:browser` passes.
9. `npm run test:journey` is green for all four projects.
10. `npm run build` succeeds.

**Observations, not criteria:** the `npm test` wall-clock duration; the remaining Sass deprecation
count.

## Deviation contract

A conflict with the objective stops you: report expected, found, exact evidence, done or not done,
and at most one hypothesis. Do not edit a view. Do not widen the identity. Do not weaken a contrast
assertion to make a run green.

Where a detail is ancillary — which partial a rule lives in, how a comment reads — decide it, record
it, and carry on.

## Output

Write your report to `tmp/units/u8b-report.md` in this checkout, and make your final message the same
content. Sections:

1. **Done / not done**, one line each, against the acceptance criteria by number.
2. **The mechanism** — what you changed, why that mechanism, and which candidates you rejected with
   the measurement that rejected them.
3. **The failing proof** — command, red count, green count, and the readings before and after.
4. **What else leaked** — every other rule you checked, and its reading.
5. **Patches for files you do not own**, or none.
6. **Observations.**
7. **What you did not close**, and why.

No process diary.
