# Unit SF4: pin the four-space fence limit (fix-round audit finding F4)

## Role and engine

Role `builder`, engine Sonnet, native subagent, sole writer in
`C:/Users/mikes/WebstormProjects/scaffold`. Fully specified below. You perform the
assignment directly and spawn nothing.

## The finding

`tests/setupPolicy.ts:1178-1180` states in TSDoc that a fence opener indented four or more
spaces is an indented code block the scanner does not interpret, and the fence-recognition
pattern near `:1201-1209` tolerates up to three leading spaces. Nothing pins the limit: a
later widening of `/^ {0,3}/u` to `{0,4}` breaks no control.

## The edits

1. `tests/setupPolicy.ts` and `tests/policy.test.ts` (wherever the existing template-TODO
   controls register, following the CR-only and three-space controls as the exact pattern):
   add one control whose fixture carries a template TODO inside a fence whose opener and
   closer are indented four spaces. The four-space construct is an indented code block, not
   a fence, so the scanner must treat the TODO line as bare and the control must expect the
   violation (it reds if the scanner ever starts honouring four-space fences). Name the
   control's membership for what it proves — the indented-code-block construct outside the
   fence population — per the file's existing membership strings, and name the test for
   what it proves, not for the finding that specified it.

## Scope

- Owned: `tests/setupPolicy.ts`, `tests/policy.test.ts`.
- Standing entries: everything `git status --porcelain` lists at your start (both files
  carry standing wave edits).
- Known standing red, not yours: `test:src:core` reds on the tarball-installed
  `@orkestrel/test` manifest reference; scope your suite criteria to the `policy` project.
- No commits, installs, or `git checkout`/`restore`/`stash`/`reset`/`clean`. Use `npx.cmd`.

## Acceptance criteria, in this order

1. `git status --porcelain` adds nothing beyond the standing entries; report before/after.
2. Scoped `npx.cmd oxfmt --config .oxfmtrc.json --check` and
   `npx.cmd oxlint --config .oxlintrc.json --deny-warnings` on the two files exit 0.
3. `npx.cmd tsc --noEmit --project tsconfig.json` exits 0.
4. Discrimination: show the control reds when the fence pattern is widened to
   `/^ {0,4}/u` (edit, run, revert, run — report all four outputs; the tree ends exactly as
   it started apart from your owned additions).
5. `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project policy`
   exits 0; totals reported.

## Output

The diff; raw output and exit code per criterion including the discrimination quartet; any
deviation. No process diary.

## Deviation contract

Stop on: the control failing to discriminate; a criterion unreachable. Fixture wording and
placement are yours: decide, record, carry on.
