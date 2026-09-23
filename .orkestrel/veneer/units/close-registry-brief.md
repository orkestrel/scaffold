# Unit CLOSE-REGISTRY (`cr`) — one driven table in the capture registry

## Role and engine

`opus` on Opus 5.5 (native Claude subagent), sole writer in `/home/user/veneer-cr` (a worktree
detached at `7398772`, the session branch tip after F7b CAPTION-SPECIMEN landed and folded, with
`node_modules` installed and `dist/` built by the Orchestrator). Perform the assignment directly
and spawn nothing. Use absolute paths under `/home/user/veneer-cr` for every command and file, and
run every npm and npx command from `/home/user/veneer-cr`. Run
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
first in every shell. Do not commit, push, install, run `corepack use`, or run `git checkout`,
`git restore`, `git stash`, `git reset`, `git clean`, or `git checkout-index`. Routing note for
the record: this unit runs on the native lane because its proofs drive Chromium, which the Codex
sandbox denies.

## Objective

The capture registry declares one frozen `DRIVEN_KEYS` table holding every driven scenario in
landing order, `CAPTURE_KEYS` is the fixed spread of the showcase, cascade, and driven tables, every
per-family `*_KEYS` list and its consumers are gone, the registry proofs pin the driven population
by its rule, and the gates in § Acceptance criteria are green.

## Context

**Evidence.** The design verdict `/home/user/scaffold/.orkestrel/veneer/b-passive-close-design-verdict.md`
(ruling R2 governs this unit; read it first) and the terrain
`/home/user/scaffold/.orkestrel/veneer/units/b-passive-close-terrain-report.md` § 4 (locate every
site by symbol; lines are approximate). Decision D20 in
`/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md` authorizes the rewrite of the
`CAPTURE_KEYS` spread and its assertion, superseding the family units' append-only rule for this
unit. The sites at `7398772` (`grep -n '_KEYS' tests/setup.ts`):

```text
tests/setup.ts:318   SHOWCASE_KEYS (stays)
tests/setup.ts:338   BUTTON_KEYS (joins DRIVEN_KEYS: primary-focus, primary-hover, primary-active, toggle-pressed)
tests/setup.ts:404   CASCADE_KEYS (stays; its doc block says "a scenario that drives a state sits in that family's own list")
tests/setup.ts:1103  VALIDATION_KEYS … tests/setup.ts:1302 FORM_CONTROL_KEYS (thirteen per-family lists in landing order, each with a doc block; every one joins DRIVEN_KEYS)
tests/setup.ts:1314  CAPTURE_KEYS = the spread of SHOWCASE_KEYS, BUTTON_KEYS, CASCADE_KEYS, then the per-family lists in landing order; CAPTURE_SCENARIOS maps it
tests/setup.test.ts:59   the export-name case listing every *_KEYS name
tests/setup.test.ts:93   the spread case: CAPTURE_KEYS toStrictEqual the same spread
tests/setup.test.ts:135  "drives a state only for a specimen the resting registry already photographs": LIST_GROUP_KEYS subjects in CASCADE_KEYS and each scenario opening with buildStem(subject) + '-'
tests/setup.test.ts:289  the FORM_CHECK_KEYS case: the same two checks plus the explicit scenario list ['form-check-box-focus', 'form-check-box-indeterminate']
tests/app/browser/integration.test.ts:77 and :80   imports of FORM_FLOATING_KEYS and VALIDATION_KEYS
tests/app/browser/integration.test.ts:736 and :753  the validation focus case loops VALIDATION_KEYS and asserts the rings' keys equal its subjects
tests/app/browser/integration.test.ts:1025           the floating case loops FORM_FLOATING_KEYS
tests/app/browser/integration.test.ts:1655 and :1671  FORM_FLOATING_SPECIMENS and VALIDATION_SPECIMENS are already imported there (the family specimen tables in app/browser/constants.ts)
```

The `CaptureKey` type (`tests/setup.ts` around line 286) is `scenario` plus `subject`; `CascadeKey`
adds `selector` and `property`. The placed-equals-registered assertion sits in
`tests/app/browser/integration.test.ts` around line 1641; `FRAMES.place` refuses an unregistered
scenario. The showcase's resting subjects for `Primary`, `Toggle`, and `Check group` have no
`CASCADE_KEYS` row (the button family registers its states as page frames and the check group is a
reading), so a resting-subject rule over the whole driven table needs those exceptions named.

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{tests,typescript,names,architecture,writing}.md`. Skill: none.
Guide: `guides/veneer.md` (report-only; CLOSE-GUIDE owns it).

**Installed primitives.** `@orkestrel/test` (browser entry under
`node_modules/@orkestrel/test/dist/src/browser/`), `@orkestrel/contract`. A helper whose job an
installed export does is a defect.

**Host.** Linux, bash, `/home/user/veneer-cr`. Chromium is installed; `npm run test:setup` runs the
registry proofs; `npm run test:app` runs the app browser proofs; the journey
(`npm run test:journey`) takes minutes per variant and is red at this base on the matrix census
alone (the label classes B-FORMS-LABEL-SHOW mounts have no shipped rule until
B-FORMS-LABEL-CASCADE lands), so do not run it: the Orchestrator's chain covers it.

**Measurements.** Before any edit, record the sorted `CAPTURE_SCENARIOS` through a probe under
`tmp/probe/` run with `npm run test:probe` (keep the probe under `tmp/units/` afterwards), so the
report can show the population unchanged after the consolidation.

**Control identifiers.** R2 and D20 are this brief's labels; name a test for what it proves.

**Standing conditions.** The tree is clean at `7398772`. `tmp/` is gitignored.

## Unknowns

Whether any consumer reads the capture order beyond the placed-equals-registered check (which
sorts) and the declared-subject check (which filters): grep `CAPTURE_KEYS` and `CAPTURE_SCENARIOS`
across `tests/` and `app/` and report each reader with whether it is order-free.

## Scope

**Owned.** `tests/setup.ts`, `tests/setup.test.ts`, `tests/app/browser/integration.test.ts`,
`tmp/units/cr-report.md`, `tmp/units/cr-*.test.ts` (the kept probe).

**Shared (report-only).** `ROADMAP.md`, `guides/veneer.md`, `app/browser/constants.ts`.

**Off-limits.** Every other file: `src/**`, `app/**`, every other `tests/**` file, `tests/setupPolicy.ts`
and `tests/policy.test.ts` (the paths the `scaffold repair` command restores).

**What asserts the state this change ends.** The registry proofs (Owned); the type check (every
stale import of a deleted list).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash under the host limits.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Write `tmp/units/cr-report.md`: `git diff --stat` and `git status --short`, each criterion with
its command and result line, the before-and-after `CAPTURE_SCENARIOS` readings, the consumer grep
with each reader's order dependence, and each mutation's failing case. Return the same content as
your final message.

## Deviation contract

§ Deviation protocol in `/home/user/scaffold/.agents/orchestration.md`. Stop and report on a
quoted site not found, on a consumer that reads the capture order, or on a criterion needing a
file outside Owned. Decide, record, and carry on for the doc blocks' wording, the case titles, and
where inside `tests/setup.ts` the table sits.

## Acceptance criteria

1. `tests/setup.ts` exports `DRIVEN_KEYS: readonly CaptureKey[]`, one `Object.freeze` array of
   frozen rows carrying every row the button and the per-family lists held, in landing order
   (the button rows first, then each family's rows in the order the lists sat), and no
   `BUTTON_KEYS` or per-family `*_KEYS` export remains; `SHOWCASE_KEYS` and `CASCADE_KEYS` stay;
   `CAPTURE_KEYS` is `[...SHOWCASE_KEYS, ...CASCADE_KEYS, ...DRIVEN_KEYS]`; the table's doc block
   states the population by its rule (a scenario whose name is its subject's stem followed by a
   state beyond rest, or a reading such as the checked group) and names no member; the
   `CASCADE_KEYS` doc block's sentence on the family's own list now names `DRIVEN_KEYS`; each
   family's placement reasoning that lived only in a list's doc block moves to the journey case
   that shoots the frame (leave a case that already states it).
2. `tests/setup.test.ts`: the export-name case lists `DRIVEN_KEYS` and no retired name; the spread
   case asserts the fixed three-table spread; one generalized driven-row case replaces the
   list-group and form-check cases, asserting over `DRIVEN_KEYS` that each scenario opens with
   `buildStem(subject) + '-'` and that each subject is one `CASCADE_KEYS` names, with the named
   exceptions (`Primary`, `Toggle`, `Check group`) and their reasons in the case; the check
   scenarios keep an explicit expected list in that case.
3. `tests/app/browser/integration.test.ts`: the validation and floating cases select their rows
   from `DRIVEN_KEYS` by the subject's membership in `VALIDATION_SPECIMENS` and
   `FORM_FLOATING_SPECIMENS` (a filter through a `Set` of the specimen names, not a stored family
   label), asserting the selection is not empty and, for validation, that the rings' keys equal
   the selected subjects; the retired imports are gone.
4. Probes: `grep -n '_KEYS: readonly Capture' tests/setup.ts` returns only `SHOWCASE_KEYS` and
   `DRIVEN_KEYS`; `grep -rn 'BUTTON_KEYS\|VALIDATION_KEYS\|PAGINATION_KEYS\|BUTTON_GROUP_KEYS\|FORM_RANGE_KEYS\|LIST_GROUP_KEYS\|CLOSE_KEYS\|FORM_CHECK_KEYS\|INPUT_GROUP_KEYS\|FORM_FLOATING_KEYS\|FORM_SELECT_KEYS\|FORM_CONTROL_KEYS' tests app` returns nothing; the sorted `CAPTURE_SCENARIOS` reading after the change equals the reading before it.
5. Mutations, each recorded with its command and failing count, then the same command green:
   dropping `...DRIVEN_KEYS` from `CAPTURE_KEYS` reddens the spread case; appending
   `{ scenario: 'page-strip', subject: 'Page strip' }` to `DRIVEN_KEYS` reddens the driven-row case
   (a resting stem); giving a row a scenario whose stem belongs to another subject reddens it;
   adding a `grow-spinner-hover` row for a grow spinner reddens the resting-subject check.
6. `npx oxfmt --check` over the owned files, `npm run format:check`, `npm run lint:check`, and
   `npm run check` exit 0.
7. `npm run test:setup` and `npm run test:app` exit 0.

**Observations, not criteria.** The journey; the Orchestrator takes it in the landing chain.

## Review evidence

The diff against `7398772` and the status, this report, the before-and-after readings, and the
mutation runs.
