# Unit CL3 — fix round (brief 5)

Succeeds `cl3-brief-4.md`, which, with briefs 3 and 2 beneath it, stays in force for
everything this brief does not name and is left unedited. What changed and why: the round-2
audit (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/cl3-audit-verdict.md`, round
2) closed every carried finding and every gate on both browsers, and carries two findings into
this round, one of which forces it.

## Role and engine

`sol` on Astra (GPT-6 Astra through `codex exec`, `workspace-write`), the sole writer in the
Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`), HEAD `9f5ffda` with CL3's files
uncommitted in the working tree (the state round 2 ruled on: seventeen modified and forty-four
untracked paths outside `tmp/`). You are the bench engine reading the brief inside your own CLI:
perform the assignment directly and spawn nothing. Run no `git checkout`, `restore`, `stash`,
`reset`, or `clean`; commit nothing; push nothing.

## Findings

1. **Analyst 7 (forces the round).** `src/styles/elements/_sub.scss:3` and
   `src/styles/elements/_sup.scss:3` repeat `position`, `font-size`, `line-height`, and
   `vertical-align`; `.claude/rules/styles.md` moves a pattern shared by two partials into
   `_mixins.scss`. Add one `@mixin` there beside `code-text` (a `{noun}-{noun}` name; no
   argument unless a member varies a value) emitting the shared block, include it from both
   partials, and keep each partial's own offset declaration. The resolved readings of `sub` and
   `sup` are unchanged: their proofs stay green with no expectation edited (record the readings
   before and after).
2. **Reviewer 7.** `src/styles/elements/_body.scss` declares `text-size-adjust: 100%`, which
   `src/styles/elements/_html.scss:7` already declares on the root and which inherits, so the
   built cascade carries the prefixed expansion twice. Remove the body declaration; the body
   proof stays green with no expectation edited (it reads no such property).

After both, sweep every partial under `src/styles/elements/` once for any other block of two or
more identical declarations shared by two partials, and extract each you find the same way,
recording the sweep's result (the pairs compared and what was found) in the report; a sweep that
finds nothing is recorded as such.

## Scope

Owned: `src/styles/_mixins.scss` (the new mixin and any the sweep adds, nothing else),
`src/styles/elements/_sub.scss`, `_sup.scss`, `_body.scss`, any other partial under
`src/styles/elements/` the sweep changes, `cl3-report-4.md`. Off-limits: everything
else, including every proof, `_tokens.scss`, `src/core/**`, `app/**`, `tests/**`, and the
vendored files. If the sweep finds a block whose extraction would change a resolved reading,
stop and report it rather than editing a proof.

## Execution

1. Finding 1, rebuild (`npm.cmd run build:src:styles`), run
   `npm.cmd run test:src:styles -- tests/src/styles/elements/sub.test.ts tests/src/styles/elements/sup.test.ts`
   green with the readings recorded before and after.
2. Finding 2, rebuild, `npm.cmd run test:src:styles -- tests/src/styles/elements/body.test.ts`
   green; confirm with `grep -c text-size-adjust dist/src/styles/index.css` that the built
   cascade declares it once (record the count before and after).
3. The sweep, then the gates in order: `npm.cmd run format:check`, `npm.cmd run lint:check`,
   `npm.cmd run check`, `npm.cmd run build`, `npm.cmd run test:src:styles`,
   `npm.cmd run test:conformance`, `npm.cmd run test:app:browser`, `npm.cmd run test:guides`,
   `npm.cmd run test:policy`, `npm.cmd run test:setup`, then
   `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles`.

Host: Windows, Git Bash; `npm.cmd run <name>`; managed Chromium by default, Edge through
`PLAYWRIGHT_CHANNEL=msedge` (a `.cmd` launcher under `tmp/`); the `prove` tool is blocked; a
nested `git` or `npm install` is denied.

## Output

Write `cl3-report-4.md` in the Veneer checkout and return it: per finding the change
as landed with its site and the mixin's name and members; the readings before and after; the
sweep's pairs and result; each gate's exit code and final lines on both engines; the actual
`git diff --stat` and `git status --porcelain --untracked-files=all` (CL3's paths plus nothing
outside this brief's owned set).

## Deviation contract

`.agents/orchestration.md` § Deviation protocol. Settle yourself: the mixin's name; how the
sweep is recorded. Stop on: a gate red after your own fix inside owned files; an extraction that
would change a resolved reading; a fix that needs a file outside the owned set.

## Acceptance criteria

1. One mixin in `_mixins.scss` emits the script-text block; `_sub.scss` and `_sup.scss` include
   it and keep only their own offsets; their readings are unchanged.
2. `_body.scss` no longer declares `text-size-adjust`; the built cascade declares it once.
3. The sweep is recorded; no two partials under `src/styles/elements/` share a block of two or
   more identical declarations.
4. Every gate in item 3 exits 0 on managed Chromium and Edge.
5. The status lists CL3's paths and nothing outside this brief's owned set.
