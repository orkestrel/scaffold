# Unit F7b CAPTION-SPECIMEN (`f7b`) — the `Caption at bottom` table specimen

## Role and engine

`builder` on Sonnet (native Claude subagent), sole writer in `/home/user/veneer-f7b` (a worktree
detached at `a4654a8`, the session branch tip after B-PASSIVE-CLOSE-B landed and folded, with
`node_modules` installed and `dist/` built by the Orchestrator). Perform the assignment directly
and spawn nothing. Use absolute paths under `/home/user/veneer-f7b` for every command and file, and
run every npm and npx command from `/home/user/veneer-f7b`. Run
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
first in every shell. Do not commit, push, install, run `corepack use`, or run `git checkout`,
`git restore`, `git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

The Table region renders a `Caption at bottom` specimen carrying the `caption-bottom` class
directly after the `Caption at top` specimen, the section proof lists it in the same position, and
the gates in § Acceptance criteria are green.

## Context

**Evidence.** The opt-out class F6 FOUNDATION landed (`src/styles/components/_table.scss` around
line 53):

```scss
	// Veneer's `elements` treatment puts a caption above its table, so this class is the opt-out
	// that returns one caption to the bottom placement Bootstrap's own `caption` rule gives every
	// caption. It sits in the Bootstrap `.caption-top` family and is Veneer's own addition to it.
	.caption-bottom {
		caption-side: bottom;
	}
```

Its style proof already exists (`tests/src/styles/components/table.test.ts` around line 82,
`returns a caption to the bottom placement through the opt-out class`). The showcase lacks the
specimen: `grep -n "caption" app/browser/constants.ts` finds `{ name: 'Caption at top', classes: 'caption-top' }`
in `TABLE_SPECIMENS` (around line 601) and no `caption-bottom` row; the `TABLE_SPECIMENS` markup
template puts `classes` on the `<table class="table …">` element for every class that is neither a
responsive wrapper nor the group divider, so `caption-side` reaches the caption by inheritance the
way `caption-top` does. The section proof `tests/app/browser/sections/TableSection.test.ts` lists
the specimen names (the `toEqual([...])` literal around line 30) and the class names (the
`for (const name of [...])` literal around line 53), each in specimen order. `grep -rn "Caption at top"
guides/veneer.md tests/setup.ts tests/app/browser/integration.test.ts` returns nothing at `a4654a8`,
so no capture row and no guide enumeration names the table specimens. The roadmap row
(`ROADMAP.md` § Carriers, "Caption opt-out") reads "F7b CAPTION-SPECIMEN supplies the specimen
(F6 FOUNDATION landed the opt-out, `04114c5`)".

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{browser,tests,typescript,names,writing}.md`. Skill: none.
Guide: `guides/veneer.md` (report-only).

**Installed primitives.** `@orkestrel/test` (browser entry under
`node_modules/@orkestrel/test/dist/src/browser/`), `@orkestrel/contract`. A helper whose job an
installed export does is a defect.

**Host.** Linux, bash, `/home/user/veneer-f7b`. Chromium is installed; `npm run test:app` runs the
app browser proofs (the section proofs and the Showcase proof) against the built `dist/`.

**Measurements.** Read `TABLE_SPECIMENS` and the section proof's two literals before editing.

**Control identifiers.** F7b and the roadmap row are this brief's labels; name nothing after them.

**Standing conditions.** The tree is clean at `a4654a8`. `npm run test:journey` is red at this base
on the matrix census alone (the label classes B-FORMS-LABEL-SHOW mounts have no shipped rule until
B-FORMS-LABEL-CASCADE lands); do not run it, the Orchestrator's chain covers it.

## Unknowns

none.

## Scope

**Owned.** `app/browser/constants.ts` (one `TABLE_SPECIMENS` row only),
`tests/app/browser/sections/TableSection.test.ts` (the two literals only), `tmp/units/f7b-report.md`.

**Shared (report-only).** `guides/veneer.md`, `tests/setup.ts`, `tests/app/browser/integration.test.ts`,
`ROADMAP.md`: grep each for `Caption at top` and `caption-top` after the edit and return an exact
patch for any enumeration the addition makes false.

**Off-limits.** Every other file, including `src/**`, `tests/src/**`, and the vendored
`tests/setupPolicy.ts` and `tests/policy.test.ts`.

**What asserts the state this change ends.** The section proof (Owned) and the Showcase proof
`tests/app/browser/Showcase.test.ts` (off-limits; it reads the specimen names through the
constants, so it must stay green without an edit; report if it does not).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash under the host limits.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Write `tmp/units/f7b-report.md`: `git diff --stat` and `git status --short`, each criterion with
its command and result line, the shared-file grep results with any patch. Return the same content
as your final message.

## Deviation contract

§ Deviation protocol in `/home/user/scaffold/.agents/orchestration.md`. Stop and report on a quoted
site not found or a criterion needing a file outside Owned.

## Acceptance criteria

1. `TABLE_SPECIMENS` carries `{ name: 'Caption at bottom', classes: 'caption-bottom' }` directly
   after the `Caption at top` row and nothing else changes in `app/browser/constants.ts`.
2. The section proof's name literal carries `'Caption at bottom'` directly after
   `'Caption at top'`, and its class literal carries `'caption-bottom'` directly after
   `'caption-top'`; nothing else changes in the file.
3. `npx oxfmt --check` over the two owned files, `npm run format:check`, `npm run lint:check`, and
   `npm run check` exit 0.
4. `npm run test:app` exits 0.

## Review evidence

The diff against `a4654a8` and the status, and this report.
