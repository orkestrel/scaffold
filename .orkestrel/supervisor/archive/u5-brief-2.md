# U5 fix round — successor to u5-brief.md, carrying audit round 1's findings

Amends: `u5-brief.md` (the unit landed at 7c0ddd3; this round repairs what the audit broke).
Findings carried, with sources: claim 4 BROKEN (Sol + reviewer, Orchestrator-verified), claim
7/8 StackList regression (Sol + reviewer, Orchestrator-verified at StackList.vue:22), the
fault-surface gap (writer's own report, both lanes confirm real, both assign this round),
reviewer analyst-referral 2 (moment-identity count assert), reviewer analyst-referral 1
(drawer Tab-escape, probe-and-report only). Verdicts on disk: `u5-analyst-verdict.md`,
`u5-checker-report.md`, and the reviewer's report in the campaign record.

## Role and engine

`implementer`, engine **Opus 5** (the fault surface and copy are design-bearing; the rest rides
along). Sole serial writer in `/workspace/supervisor` from clean baseline **7c0ddd3**
(`git status --porcelain` empty — verified). Perform directly, spawn nothing, no
commits/pushes/installs. The closing auditor will be Sol (the other engine).

## Authority

`/home/user/scaffold/.orkestrel/supervisor/REDESIGN.md` rulings; AGENTS.md;
`.claude/rules/{tests,browser,names}.md`; the journey doctrine (trusted input, visible/reachable
targets, perception assertions, convergence waits). Rulings taken this round, binding here:
seeders edit ratified; cascade import stays per-file (J1 carry — do NOT touch
`tests/setupBrowser.ts`); numeral caption below lg accepted; the notice's no-live-region
resolution retained.

## Fix items

1. **Real input for the shell proofs.** In `tests/app/browser/ApplicationView.test.ts`, drive
   every asserted interaction with `userEvent` from `vitest/browser`: the drawer open
   (`control.click()` at 311, 337), drawer close (320), the four Escape dispatches
   (`document.dispatchEvent(new KeyboardEvent(...))` at 340, 362, 380, 394), and the remaining
   bare `.click()` sites (443, 471, 487, 539). Assertions stay as they stand; both viewport
   cases stay. Where a real click cannot land because the control is genuinely hidden at that
   width, drive the human path to reveal it first — that is the honesty the change buys. For
   Escape, establish focus through real interaction before `userEvent.keyboard('{Escape}')` so
   the event originates where a person's would.
2. **The StackList copy.** Apply the U5 writer's own recorded patch verbatim:
   `app/browser/components/StackList.vue:21-23` → "No run is open. Press a run above to follow
   its phases, tasks, and attempts here." and
   `tests/app/browser/components/StackList.test.ts:44` → `toContain('Press a run above')`.
   Four captured frames currently render an instruction pointing at a deleted control; this
   closes it.
3. **The fault surface.** `operator.fault` (already public and reactive; no type change) has no
   authenticated-shell renderer, and `controllers/Operator.ts:359-371` retains it for every
   non-ABSENT restore failure — the reader is told "refused" while the server's own reason sits
   unreadable. Render it in the rail as a stated fact in the established idiom (`small
   text-warning-emphasis`, triangle, NO live region, exactly once), placed coherently with the
   restore notice and RunList's stale-updates line — the reviewer noted the notice sits above
   the rail's first heading while the stale line sits below; settle one visible order for
   stacked stated-fact lines and record it. Copy is yours within the writing rules. Do not
   touch `Operator.ts` — the retention semantics are the contract; this round gives them a
   surface. Mirrored proofs in `ApplicationView.test.ts`: renders once when set, absent when
   clear, no live region, coexists with the notice without duplication, both widths.
4. **Convergence, not moment-identity.** `tests/app/browser/integration/integration.test.ts`
   asserts `expect(await page.locator(STACK).count()).toBe(count)` after a single row
   `waitFor`. Replace with a convergence wait on the count itself (`expect.poll` or the
   harness's established wait idiom) per the recorded convergence law: two observers of one
   stream legitimately differ by a frame.
5. **Probe and report only — no fix.** With the drawer open below lg, walk real Tab from the
   drawer's close control and report where focus goes: does it reach the dimmed banner controls
   behind the backdrop? Report the observed sequence in your output; the Orchestrator rules on
   containment afterward. Do not add `aria-modal`, a focus trap, or any behavior change on this
   item. A throwaway probe run is fine; do not leave a permanent test asserting either outcome.

## Scope

**Owned:** `app/browser/ApplicationView.vue`, `app/browser/components/StackList.vue`,
`tests/app/browser/ApplicationView.test.ts`, `tests/app/browser/components/StackList.test.ts`,
`tests/app/browser/integration/integration.test.ts`.

**Off-limits:** `tests/setupBrowser.ts` (J1 owns the cascade move), `journey.test.ts`,
`integration/setup.ts`, all controllers/stores/services, `app/browser/types.ts`, `RunList.vue`,
`OpenPanel.vue`, `LoginPanel.vue`, `CommandBar.vue`, `app/core/**`, `app/server/**`, `src/**`,
vendored files, `package.json`, `configs/**`, `guides/**`, `seeders.test.ts` (ratified as-is).

Forbidden: the standing list (no `any`/`as`/`!`/suppressions/mocks/timers on asserted
paths/polling/`style` attributes/invented classes/new deps); no aria-live additions beyond what
RunList owns; no waiting indicator.

## Acceptance criteria

1. No `dispatchEvent` and no bare `.click()` remains on any asserted interaction path in
   `ApplicationView.test.ts`; the named proofs pass on `userEvent` with their assertions
   unchanged at both widths.
2. StackList's empty state carries the new sentence; its test asserts it; no rendered surface
   names the deleted Workflow control (grep the app tree for "Workflow above" returns nothing).
3. The fault surface renders `operator.fault` exactly once in the authenticated shell with no
   live region, proved present/absent/coexisting-with-notice at both widths.
4. The integration count assertion converges (no one-shot count against a live stream);
   `npm run test:app:browser:integration` green.
5. Item 5's focus-walk report is in your output with the observed Tab sequence.
6. Scoped converge green: `app:browser` project green; static gates (`format:check`,
   `lint:check`, `check`) green. The Orchestrator runs the full chain (guides parity stays
   U7's).

## Deviation contract

Stop and report if item 3's surface cannot render without touching an off-limits file, or if
item 1 surfaces a real behavioral failure a trusted event exposes (that is a finding, not
something to paper over — report it with the failing output). Ancillary placement/copy/idiom
choices are yours, recorded. Insert the failing proof before each fix where one can run red
(item 1's rewritten proofs count only if they ran against the defect class; record commands and
counts).

## Output

Touched files + diffstat; the full diff; per-criterion proofs with the exact commands and their
tails; the item-5 focus-walk report; recorded calls; `git status --porcelain`; deviations or
none. No diary.
