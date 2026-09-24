# Unit UTIL-PAINT (`up`), round 2 — the audit's fixes (successor of `b-utilities-up-brief.md`)

## Role and engine

`opus` on Opus 5.5, reached as the native subagent that wrote round 1, continued in the worktree
`/home/user/veneer-up` (branch `unit/up` from `2a3f223`). The executor that opens this brief is that
subagent.

## Objective

Round 1's owned files, shared patch, and profiles patch carry every fix the round-1 audit ruled, and
nothing else changes: the verdict is `up-audit-verdict.md`; this brief carries each of its findings and
names the one fix for each.

## Context

**Evidence.** The reconciled verdict `/home/user/scaffold/.orkestrel/veneer/units/up-audit-verdict.md`
and the three lane verdicts beside it (`up-audit-objective-verdict.md`, `up-audit-subjective-verdict.md`,
`up-audit-checker-verdict.md`); round 1's retained record under the same folder (`up.diff`,
`up-shared.patch`, `up-unscoped-profiles.patch`, `b-utilities-up-report.md`, `up-instruments/`). Where a
verdict quotes a replacement sentence, that sentence is the fix.

**Law.** As round 1: `AGENTS.md` in the worktree; the scaffold rule files the round-1 brief names, with
`.claude/rules/architecture.md` for the helper's placement; the family record `b-utilities-family.md`
and the design verdict `/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md`; the
mid-campaign notes `w2-w3-note-1.md` to `w2-w3-note-3.md`; the round-1 brief `b-utilities-up-brief.md`,
whose scope, off-limits list, standing conditions, and host facts bind this round unchanged except
where § Scope widens them; skill: none.

**Host.** As round 1: `/home/user/veneer-up`, npm 11 on `PATH`, `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`.
Write every instrument, extract, draft, and log under this worktree's `tmp/units/` or `tmp/probe/` with
the `up` prefix, and nothing into the session scratchpad.

**Measurements.** Round 1's gates and logs; the Orchestrator's apply checks (both round-1 patches
apply, exit 0). `tests/service/tailwind/profiles.test.ts` already compares whole orders at its later
cases (the `new SheetReader(...).order` readings), the form P-a adopts.

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** As round 1: rebuild the validation copy under `tmp/probe/base/` from
`2a3f223`, your owned files, and your revised patches; delete it before the report. UTIL-TEXT and
UTIL-SPACING apply your profiles patch on their own copies; your revised patch is the one that lands.

## Unknowns

None.

## Scope

**Owned.** Round 1's owned files, and two new files: `app/browser/helpers.ts` and
`tests/app/browser/helpers.test.ts`.

**Shared (report-only).** Round 1's shared files, `tests/service/tailwind/profiles.test.ts`, and
`app/browser/index.ts` and `tests/app/browser/index.test.ts` for the helper's barrel export; return one
revised `up-shared-2.patch` against `2a3f223` that supersedes `up-shared.patch` whole, and one revised
`up-unscoped-profiles-2.patch` that applies after it and supersedes `up-unscoped-profiles.patch`.

**Off-limits.** As round 1.

**What asserts the state this change ends.** The profiles cases P-a edits, the sentences P-b replaces,
the specimen lists P-c and P-d edit and the section proofs that read them, the barrel's export
enumeration, and the mutation runs P-e repeats; nothing else.

**Tools and limits.** As round 1.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-up/tmp/units/up-report-2.md`: each fix below by its label with the file,
the before and after text or code, and the reading that proves it; each gate's command, written as it
ran, and its result line on the rebuilt validation copy; the mutation log for every case this round
adds or edits and every run P-e repeats, retained as `tmp/units/up-mutations-2.log.txt` (the mutated
site, the command, the exits, the summary, the failing case names); the revised patches at
`tmp/units/up-shared-2.patch` and `tmp/units/up-unscoped-profiles-2.patch`; `up-2.diff` and
`up-2-status.txt` captured as `git status --porcelain` and `git diff 2a3f223` plus each untracked file
through `git diff --no-index /dev/null`. Delivered as that file plus the same text as the final message.
The report follows the writing rule: no count of a growable set, no list item named by its position, no
cross-reference `above` or `below`, no temporal `now`, no `via`, and every code token followed by a
noun.

## Deviation contract

Stop and report per `.agents/orchestration.md` § Deviation protocol when a fix cannot be made without
changing what ships beyond the case, sentence, specimen, or helper it names. Decide, record, and carry
on for the helper's name (a `{verb}{Noun}` module helper), its signature, the fill or border P-d gives,
and re-flowing a paragraph a fix touches.

## Fixes

- **P-a (claim 4).** In `profiles.test.ts`, for every profile, assert that `new SheetReader(compiled).order`
  equals `['properties', ...ORDER]` and that `new SheetReader(`${cascade}\n${compiled}`).order` equals
  `[...ORDER, 'properties']`, in place of the slice readings; keep the scoped theme-variable reading and
  the generated-properties exception; remove the comment's claim that the order line is declared
  unchanged unless an assertion reads it. Retain a red run with `@layer vendor;` written ahead of the
  order line in the copy's `tests/setup.css`.
- **P-b (claims 7 and 8, F2).** In the guide, describe the boundary compositions and the factor subjects
  the proofs actually read in place of "each class … at every breakpoint boundary" and "each radius
  step … under the radius factor"; write "…and the fill's own rule writes the `1` value into that local"
  and "the `2` factor doubles". In the table comments, write "the `rgba()` function over…" and "a bare
  `var()` function over…". In the `BACKGROUND_SPECIMENS` remark, write "names the classes the swatch
  carries". Sweep every added line for the same forms, not only the cited sites.
- **P-c (F1).** Move the captioned swatch-grid markup the Background and Border specimen lists both
  build into one exported, pure helper in `app/browser/helpers.ts` that takes the swatches' class
  strings and returns the grid markup; build both lists through it; export it through
  `app/browser/index.ts` and its enumeration in `tests/app/browser/index.test.ts`; prove it in
  `tests/app/browser/helpers.test.ts` (the grid, a figure per swatch, the caption equal to the swatch's
  classes, and an empty list), and retain a red run with the caption drawn from a different string.
- **P-d (the white swatches).** Apply the unit's own rule to every swatch that matches the canvas in
  either mode: give the `bg-white` swatch the border the other page-matching swatches carry, and give the
  `border-white` swatch a fill that shows its border on the light canvas; check the `bg-black` and
  `border-black` swatches against the dark canvas the same way. Update the captions, and the section
  proofs if they pin those compositions.
- **P-e (claim 3's provenance, and the count instrument).** Re-run `up-instrument-mutate-styles.py`
  and the tables, sections, and ledger instrument against the shipped round-2 proofs, and retain the
  logs with the case lines they cite; give `up-instrument-count-cascade.mjs` a negative control (a
  selector dropped from, or a rule moved out of, the utilities layer in a copy of the built cascade) and
  retain its red reading.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0 in the worktree.
2. On the rebuilt validation copy: `npm run check` and `npm run build:src` exit 0; the round-1 style and
   section proof commands, `tests/app/browser/helpers.test.ts`, `Showcase.test.ts`, and `index.test.ts`
   in the app project, `tests/setupStyles.test.ts` in the setup project, `npm run test:conformance`,
   `npm run build:src:styles && npm run test:service` with both revised patches, `npm run test:guides`,
   and `npm run test:policy` exit 0.
3. Each fix P-a to P-e is present at its site, and P-a, P-c, and P-e each carry a retained red run.
4. `up-shared-2.patch` passes `git apply --check` on a fresh extract of `2a3f223`, and
   `up-unscoped-profiles-2.patch` over it; together they differ from round 1's patches only at the sites
   P-a to P-e name.

**Observations, not criteria.** `npm run test:setup` whole, the journey, `CAPTURE=1`, and the whole
styles project are the Orchestrator's runs at landing.

## Review evidence

`up-2.diff`, `up-2-status.txt`, `up-shared-2.patch`, `up-unscoped-profiles-2.patch`, `up-report-2.md`,
and `up-mutations-2.log.txt`.
