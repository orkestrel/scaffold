# Unit U3-policy — successor brief 2: the review findings

## What changed and why

This brief supersedes `u3-policy-brief.md` for the remainder of the unit; every section
of that brief stands except where this one says otherwise. The objective review (`reviewer` on
Opus, `u3-policy-review-report.md`) confirmed the mechanism and the control and found the
items under § Execution, each named with its finding number. The Orchestrator ran `npm run build`
after the first run, which restaged `host.json` (finding 8); that file is now dirty on purpose and
stays off-limits.

## Role and engine

`builder` on native Sonnet. Perform the assignment directly and spawn nothing. You are the sole
writer in the scaffold checkout (`C:/Users/mikes/WebstormProjects/scaffold`); commit nothing.

## Scope

**Owned.** `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `guides/scaffold.md` for the one
sentence § Execution item 4 names. **Off-limits.** Everything else, `host.json` included (already
restaged; do not touch it).

## Execution

1. **Stale sentences (claim 6).** In `tests/policy.test.ts:664-667`, rewrite the comment above the
   renamed case so it names both mechanisms: the catalog table (regenerated from the registry,
   names the fleet) and the guide index (authored here, links what this checkout documents); a
   guide neither accounts for reports. In `tests/setupPolicy.ts:1996-1997` (`readPolicyGuide`
   `@remarks`), replace "split that name by catalog membership" with a sentence saying
   `isPolicyMirror` decides by catalog membership and `isPolicyStray` by catalog membership and
   index links.
2. **Index scan (finding 9).** In `readPolicyIndex`, run the index text through `stripPolicyCode`
   before matching, so a link written inside a fence or a code span accounts for nothing; change
   the capture class of `POLICY_INDEX_LINK` to `[^/)\n]+` so a capture cannot cross a line.
3. **Global regex (finding 10).** Make `POLICY_INDEX_LINK` non-global (`u` flag alone, like its
   siblings at `:340`, `:343`, `:367`) and build the global matcher locally inside
   `readPolicyIndex` with `new RegExp(POLICY_INDEX_LINK.source, 'gu')`. Keep the `.match()`
   assertion in `tests/policy.test.ts` working (a non-global match still returns the capture).
4. **Guide prose (finding 7).** In `guides/scaffold.md:1153-1155`, rewrite the sentence so the
   sweep "reports a top-level guide that is neither this package's own, nor `guides/README.md`,
   nor a guide `guides/README.md` links, nor a catalog row". Change nothing else in that file.
5. **Catalog absent (finding 11).** Pin the decided behaviour with one more `PolicyControl` row
   after the `accepts a top-level guide the index links` row: label
   `sweeps an index-linked guide when no catalog registers it`, membership
   `'index-linked guides in a workspace whose catalog is absent'`, rule `'prose'`, files: the
   manifest, no catalog file, `README.md` with a clean front page (`'# Front page\n\nA reader
   arrives here.\n'`), `guides/README.md` linking `console.md`, and `guides/console.md` with
   `'# Console\n\nA reader should meet this term.\n'`; expected: exactly one `prose` violation at
   `guides/console.md` line 3 with the message
   `'prose carries no banned term: should (must, can, might, or the imperative)'` (read the
   existing term-violation message format in the file and match it exactly). The row records that
   an index link admits a guide to the sweep whether or not a catalog is present; a missing
   catalog is its own finding elsewhere.
6. **Import order (finding 12).** Move `POLICY_INDEX_FILE` and `POLICY_INDEX_LINK` in the
   `tests/policy.test.ts` import list to their alphabetical places beside `POLICY_MIRROR_PATTERN`.
7. Format the owned files by path (`npx oxfmt --config .oxfmtrc.json --write <files>`), then run
   `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:policy`,
   `npm run test:setup`, `npm run test:config`, `npm run test:guides`; record each command's final
   lines. `test:config` reads the restaged `host.json` against the vendored bytes: if it reports
   the inventory stale at a file you edited, report that reading (the Orchestrator rebuilds) and
   do not touch `host.json`.

## Output

Write `u3-policy-report-2.md` and return its content: the diff summary per file; the
new control row's reading; each gate command's exit code and final lines; and every deviation with
expected, found, exact evidence, done or not done, and at most one hypothesis.

## Deviation contract

Stop and report on: a gate red after your own fix inside owned files; a need to edit an off-limits
file. Decide, record, and carry on from: comment and TSDoc wording within the meaning fixed here.

## Acceptance criteria

1. `format:check`, `lint:check`, `check`, `test:policy`, `test:setup`, `test:guides` exit 0;
   `test:config` exits 0 or reports only the inventory-stale reading for an owned file.
2. `git status --porcelain` lists only `host.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`,
   `guides/scaffold.md`.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report.
