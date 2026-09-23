# Unit B-FORMS-CLOSE-FORCED (`bff`), round 4 — the guide's forced-colours sentences, the density case's names, and the Node case's home

Successor to `b-forms-close-forced-brief-3.md` (unedited). What changed and why: the rounds 2 and 3
audit (`bff-2-audit-verdict.md`) passed the claims and found three items outside them: the guide's
forms sections say the focused control "draws an outline in the system highlight" while its
reason sentence says forced colours replace every colour a rule writes (HIGHLIGHT-REASON); the
`focus-ring` paragraph says the range's focus rule keeps a shadow ring (RANGE-RING); the density
case names swatches by position and by two names (DENSITY-NAMES); and the single-block Node case
belongs in `tests/conformance.test.ts`, whose subject is the built cascade (referral C). Every item
is exact text or a mechanical move, so this round is fully specified.

## Role and engine

`builder` on Sonnet (native Claude subagent), sole writer in `/home/user/veneer-bff` (the worktree
over `ccb10a7` holding rounds 1 to 3 uncommitted, which this round builds on and never discards;
`dist/` is built). Perform the assignment directly and spawn nothing. Use absolute paths under
`/home/user/veneer-bff`, run every npm and npx command from there, and run
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
first in every shell. Do not commit, push, install, run `corepack use`, or run `git checkout`,
`git restore`, `git stash`, `git reset`, `git clean`, or `git checkout-index`. Never run `corepack use`.

## Objective

The listed sentences and comments carry the exact text below, the density case names each swatch
by its role through its accessible name, the single-block Node case lives in
`tests/conformance.test.ts`, and the gates in § Acceptance criteria are green.

## Context

**Evidence.** Locate each site by its quoted text (lines are approximate):

```text
guides/veneer.md:1072   "Under forced colors the focused box also draws an outline in the system highlight through the `forced-ring` mixin, because forced colors do not paint the shadow ring. § Additions records it."
guides/veneer.md:1144   the same sentence with "the focused select"
guides/veneer.md:1214   the same sentence with "the focused control"
guides/veneer.md:1250   "The outline is read under staged forced colors on the text control and on a validated one, by its style and width, because forced colors replace every color a rule writes."
guides/veneer.md:1293   "Under forced colors the focused control draws an outline in the system highlight on the host through the `forced-ring` mixin, because forced colors do not paint the thumb's shadow ring. § Additions records it."
guides/veneer.md:2071   "The `.form-control:focus`, `.form-select:focus`, `.form-check-input:focus`, and `.form-range:focus` rules include the `forced-ring` mixin beside the shadow ring they keep from the release, because forced colors paint no shadow and those controls would otherwise show no focus indicator there."
tests/src/styles/components/form-check.test.ts:351     "// Forced colors replace every color a rule writes, so the outline is read by its style and ..."
tests/src/styles/components/form-control.test.ts:330   "// Forced colors replace every color a rule writes with a system color, so the outline is read ..."
tests/src/styles/components/form-range.test.ts:116     "... Forced colors replace every color a rule writes, so the outline is ..."
tests/src/styles/components/form-select.test.ts:382    "// Forced colors replace every color a rule writes, so the outline is read by its style and ..."
tests/src/styles/components/validation.test.ts:394     "// Forced colors replace every color a rule writes, so it is read by style and width."
tests/src/styles/components/validation.test.ts:408-431 the density case: `const [first, second, third, fourth] = container.querySelectorAll<HTMLInputElement>('[type="color"]')`, `settled`, `scoped`, and the pairs built from them
tests/setupStyles.test.ts:1873-1904   the case "emits one forced-colors block per selector, so the content a caller passes lands beside the forced outline", and the `normalizeMediaCondition` import it added
tests/conformance.test.ts             the `declaration priority` describe (D39a) over the release's compiled CSS, and the bft planted-literal case over `compileExpandedCascade()`
tests/src/styles/mixins.test.ts:82-84 the reason the tree supports: a color reader resolves each side through a probe whose color forced colors also replace
```

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{tests,typescript,names,writing,documentation}.md`. Skill:
none. Guide: `guides/veneer.md` (owned).

**Installed primitives.** As round 1. **Host.** As round 1. **Measurements.** Read each site
before editing. **Control identifiers.** HIGHLIGHT-REASON, RANGE-RING, DENSITY-NAMES, referral C.
**Standing conditions.** The worktree is dirty with rounds 1 to 3 by design; `tmp/probe/` holds
earlier instruments (leave them).

## Unknowns

none.

## Scope

**Owned.** `guides/veneer.md`, the five forms proofs, `tests/setupStyles.test.ts` (removing the
case and its import only), `tests/conformance.test.ts` (adding the case and its imports only),
`tmp/units/bff-report-4.md`.

**Shared (report-only).** `tests/setupStyles.ts`, `tests/setupServer.ts`, `ROADMAP.md`.

**Off-limits.** As round 1, plus every other line of `tests/setupStyles.test.ts` and
`tests/conformance.test.ts`.

**What asserts the state this change ends.** The quoted sentences and comments (Owned); the
density case (Owned); the Node case's two files (Owned).

**Tools and limits.** As round 1.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Write `tmp/units/bff-report-4.md`: the diff against round 3 (`git diff --stat` and the status), each
criterion with its command and result line. Return the same content as your final message.

## Deviation contract

Stop and report on a quoted site not found or a criterion needing a file outside Owned. Decide,
record, and carry on for rewrapping, for where in `tests/conformance.test.ts` the case sits (a
`describe` of its own or the `declaration priority` one), and for the aria-label query's exact
form.

## Acceptance criteria

1. `guides/veneer.md` carries, rewrapped at 100 columns:
   - check (around line 1072): "Under forced colors the focused box's rule also writes an outline in
     the system highlight color through the `forced-ring` mixin, because forced colors paint no
     shadow ring. § Additions records it."
   - select (around line 1144): the same with "the focused select's rule".
   - control (around line 1214): the same with "the focused control's rule".
   - range (around line 1293): "Under forced colors the focused control's rule writes an outline in
     the system highlight color on the host through the `forced-ring` mixin, because forced colors
     paint no thumb shadow ring. § Additions records it."
   - the reason (around line 1250): "The outline is read under staged forced colors on the text
     control and on a validated one, by its style and width, because a color reading cannot fail
     under forced colors: the installed color reader resolves each side through a probe whose color
     forced colors also replace."
   - the `focus-ring` paragraph (around line 2071): "The `.form-control:focus`, `.form-select:focus`,
     and `.form-check-input:focus` rules include the `forced-ring` mixin beside the shadow ring they
     keep from the release, and the `.form-range:focus` rule includes it on the host, because the
     range's ring sits on its thumb. Forced colors paint no shadow, so those controls would
     otherwise show no focus indicator there."
2. Each of the five proof comments replaces its "Forced colors replace every color a rule writes"
   clause with "A color reading cannot fail under forced colors, because the installed color reader
   resolves each side through a probe whose color forced colors also replace," keeping the rest of
   its sentence (the outline is read by its style and width), rewrapped at 100 columns.
3. The density case queries each swatch by its accessible name and names it by role: a `scope`
   object with `resting` (the disabled swatch, `[aria-label="Scoped resting shade"]`) and `stated`
   (`[aria-label="Scoped stated shade"]`), and the class pair likewise by `[aria-label="Resting shade"]`
   and `[aria-label="Stated shade"]`; no `first`, `second`, `third`, `fourth`, `settled`, or
   `scoped` binding remains; the pairs read `{ form: 'class', ...pair }` and
   `{ form: 'scope', ...scope }`; the readings and their labels are unchanged; the comment's
   "keeps the resting width" refers to the resting swatch.
4. The single-block Node case moves verbatim (its title, comment, and assertions) from
   `tests/setupStyles.test.ts` to `tests/conformance.test.ts`, with the imports it needs
   (`compileExpandedCascade`, `readCascadeBlocks`, `renderRuleKey`, `normalizeMediaCondition`)
   added there from `./setupServer.js` where absent, and the case and its now-unused
   `normalizeMediaCondition` import removed from `tests/setupStyles.test.ts`.
5. `npx oxfmt --check` over the owned files, `npm run format:check`, `npm run lint:check`, and
   `npm run check` exit 0.
6. `npm run test:setup`, `npm run test:conformance`, `npm run test:guides`, and the scoped styles
   run over `validation.test.ts` exit 0.

**Observations, not criteria.** The scoped five-file styles run.

## Review evidence

The diff against `ccb10a7` and the status, this report, and rounds 1 to 3's records.
