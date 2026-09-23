# Unit F8c-A-2 READERS — completing the interrupted round

Successor of `tmp/units/f8c-a-brief.md` (launched; the executor was terminated by the API's session rate
limit before it wrote its report). What changed and why: the worktree `/home/user/veneer-f8b` carries the
edits that round made before the interruption (`git diff --stat` shows `tests/setupServer.ts` alone, carrying `SheetReader`, `SheetLayer`,
`SheetDeclaration`, `collectSharedNames`, `collectImportantNames`, and `collectInlineSources` with no
proof yet; no other owned file changed; no report file exists). This round finishes that brief: every finding it names is verified against the
tree, completed where the tree is short, and reported with the evidence the brief's § Output names.

## Role and engine

`opus` on Opus (native Claude subagent; the CLI serves Opus 5 for the alias), sole writer in
`/home/user/veneer-f8b`. Perform the assignment directly and spawn nothing. Use absolute paths under
`/home/user/veneer-f8b` for every command and file, and run every npm and npx command from
`/home/user/veneer-f8b`; your shell may start elsewhere. Do not commit, push, install, or run
`git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

The brief `tmp/units/f8c-a-brief.md` is complete: every finding closed in the owned files, every proof change
shown red under its named mutation and green after, the frames present for every variant, the gates
run, and the report written.

## Obligations

1. Read `tmp/units/f8c-a-brief.md` whole (its § Context, § Findings, § Scope, § Execution, § Output, and
   § Acceptance criteria bind this round unchanged), then read the worktree's current diff
   (`git diff` and the untracked files) and rule, per finding, whether the tree already closes it,
   closes it in part, or not at all. Record that reading in the report before changing anything.
2. Complete every finding the tree leaves short, inside the brief's § Scope.
3. Re-take every mutation the brief names (apply the transient plant, run the named command, record
   red, revert by the exact reverse edit, record green, record the file's SHA-256 before and after).
   The interrupted run's readings did not reach a report, so they do not exist.
4. Run `npm run test:policy` as soon as the `SheetReader` export is proved, per the brief's
   § Unknowns, and stop on a collision.
5. Run the brief's § Execution validation and write the brief's § Output report to
   `/home/user/veneer-f8b/tmp/units/f8c-a-report.md`, returning the same text.

## Scope, deviation contract, acceptance criteria, review evidence

As `tmp/units/f8c-a-brief.md` states them. Add to the report one section, "State at resumption", carrying
obligation 1's reading.
