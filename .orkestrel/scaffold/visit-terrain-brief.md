# Unit V visit — `terrain` — successor to `visit-brief.md`

Read `C:\Users\mikes\WebstormProjects\scaffold\tmp\units\visit-brief.md` in full first. This
file adds the terrain facts and replaces step 2 and the acceptance criteria as stated here. Where
the two disagree, this file wins.

## Role and engine

`implementer` on Opus 5, native Claude Code subagent. Sole writer in
`C:\Users\mikes\WebstormProjects\terrain`. Perform the visit directly and spawn nothing.

## Standing conditions

- The tree is dirty by the user's hand and stays so: `D  package-lock.json` (staged deletion)
  and `?? package-lock.json` (untracked file). Never touch that state, never `git add` it, never
  restore it. Treat the untracked lockfile as the lockfile `npm install` reads and rewrites.
- `@orkestrel/test` is an unpublished campaign build. Its manifest range is `^0.0.6` today and
  moves to the catalog's `^0.0.11`; after every full `npm install`, re-stage the campaign build
  with `npm install --no-save C:\Users\mikes\WebstormProjects\scaffold\tmp\tarballs\orkestrel-test-0.0.11.tgz`
  so `node_modules/@orkestrel/test` holds the campaign's build while the manifest keeps a
  registry range. Prove it with `npm ls @orkestrel/test`.
- Because the tree is dirty by the user's hand, `npx scaffold overwrite` refuses without
  `--dirty`. Run it with `--dirty` here, and only here, after you have run `npx scaffold audit`
  read-only and recorded every path the plan would delete. Where the audit names a deletion of a
  file that is uncommitted, stop and report before running the overwrite.
- The terrain unit U6 committed its tests before this visit; expect a clean status apart from the
  lockfile pair. Where any other file is dirty at your start, stop and report.

## Ranges to write

Runtime `dependencies`, to the catalog with a caret: contract `^0.0.15`, csv `^0.0.5`, database
`^0.0.12`, emitter `^0.0.8`, indexeddb `^0.0.9`, interpret `^0.0.11`, program `^0.0.11`,
qualifier `^0.0.12`, rater `^0.0.12`, reason `^0.0.8`.

Development `devDependencies`: contract `^0.0.15`, guide `^0.0.15`, html `^0.0.7`, scaffold
`^0.0.59` (step 1, first), test `^0.0.11` (tarball re-staged after install).

Terrain is an unpublished application, so its contract range may lead the fleet; every published
dependent still declares contract `^0.0.13`, so `npm install` places a second copy of contract
under those packages. Record `npm ls @orkestrel/contract` and whether `npm run check` reads the
two copies as distinct types. Where it does, restore the contract ranges to `^0.0.13`, reinstall,
re-run `npm run check`, and record the red-then-green as the finding.

## Order

1. Re-pin `@orkestrel/scaffold` to `^0.0.59`; `npm install`; re-stage the test tarball.
2. `npx scaffold audit` read-only; record its output in full. Then `npx scaffold overwrite --dirty`;
   record its summary and every file it wrote or deleted from `git status --porcelain`. Then
   `npx scaffold audit` again and record its exit and every line.
3. Re-pin every other range as listed; `npm install`; re-stage the test tarball; `npm ls
   @orkestrel/test @orkestrel/contract`.
4. `npm run format` once.
5. The gate chain, each read bare: `npm run format:check`, `npm run lint:check`, `npm run check`,
   `npm run build`, `npm test`.
6. Repair a red that a vendored file's new rule exposes in terrain's own code; stop and report a
   red inside a vendored file (`tests/setupPolicy.ts`, `tests/policy.test.ts`,
   `tests/config.test.ts`, `configs/**`) or a red that would change product behaviour.

## Output

Write `C:\Users\mikes\WebstormProjects\terrain\tmp\units\visit-terrain-report.md` and return it
as your final message: the range table before and after; the read-only audit; the overwrite's
summary, exit, and file list; the closing audit's exit and lines; the `npm ls` readings; each
gate's exit and summary line; each repair with its red-then-green; the claims you could not
close. Commit nothing.

## Acceptance criteria

1. `npx scaffold audit` exits `0` after the overwrite, or every remaining line is recorded with its
   owner.
2. Every `@orkestrel/*` range equals the catalog's version with a caret, and
   `node_modules/@orkestrel/test` is the 0.0.11 campaign build.
3. The gate chain is green, read bare, or every red is reported with its excerpt and its owner.
