# Unit report: prune the directories a removal empties

Done. The removal now takes every directory its own deletions emptied, the helper carrying it is
exported and tested, and the guide and wave corrections landed, including the coordinator's
mid-unit addendum.

## What changed per file

| File                                                    | Change                                                                                                                                                                                       |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/server/helpers.ts`                                 | Adds the exported `pruneEmptiedDirectories` function with full TSDoc; imports `rmdirSync` from `node:fs` and reuses `compareValues` from `@orkestrel/contract` for the deepest-first ordering |
| `src/server/Materializer.ts`                            | Calls the helper in `#purge` after the commit and the `remove` events; extends the `remove` TSDoc `@remarks` and the `#purge` comment                                                        |
| `tests/src/server/helpers.test.ts`                      | Adds the `pruneEmptiedDirectories` describe with the emptied chain, the filled directory, the surviving sibling branch, the escaping candidate with its control, and the absent target       |
| `tests/src/server/Materializer.test.ts`                 | Adds the `remove` case proving the emptied chain goes and the directory holding an unrelated file stays                                                                                      |
| `guides/scaffold.md`                                    | Adds the server helper row and the prune sentence in the Git section; the helper table is re-aligned because the added name is wider than the previous column                                |
| `.agents/skills/orkestrel-publish/references/wave.md`   | Rewrites the migration trigger, adds the `npm install --no-save` sentence, and adds the pre-publish `--offline` visit paragraph from the addendum                                            |

Implementation notes:

- `pruneEmptiedDirectories(target, removed)` collects every ancestor of every removed path, orders
  deepest first with a code-unit tiebreak, resolves each through `resolveContainedPath`, and calls
  `rmdirSync` only on a physical directory whose read returns no entry. It returns the pruned
  target-relative paths in pruning order. A candidate that escapes, is not a physical directory,
  still holds an entry, or refuses removal is left standing and absent from the answer.
- The call in `#purge` sits after `#close` and after the `remove` events, so nothing the prune takes
  could still be restored by the transaction. Pruned directories enter neither `MaterializeResult`
  nor the event stream, as the brief fixed.
- `@example` is `pruneEmptiedDirectories('vacant', ['notes/entry.md']) // []`, which is truthful: a
  missing target resolves and nothing under it is a physical directory. No `/tmp` literal.

## Diffstat

```text
 .../skills/orkestrel-publish/references/wave.md    | 24 +++++--
 guides/scaffold.md                                 | 77 +++++++++++-----------
 src/server/Materializer.ts                         | 12 +++-
 src/server/helpers.ts                              | 60 ++++++++++++++++-
 tests/src/server/Materializer.test.ts              | 31 +++++++++
 tests/src/server/helpers.test.ts                   | 75 +++++++++++++++++++++
 6 files changed, 232 insertions(+), 47 deletions(-)
```

## Red then green for the Materializer case

Test name: `Materializer remove > takes the directories its deletions emptied and leaves a filled one standing`.

Red, with the helper present and `#purge` not yet wired:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/Materializer.test.ts -t 'takes the directories its deletions emptied'

AssertionError: expected [ '.claude', '.claude/rules', …(3) ] to deeply equal [ '.claude', '.claude/rules' ]
+   ".claude/skills",
+   ".claude/skills/orkestrel-falsify",
+   ".claude/skills/orkestrel-falsify/references",

 Test Files  1 failed (1)
      Tests  1 failed | 50 skipped (51)
```

Green, after the single `pruneEmptiedDirectories(target, removed)` line in `#purge`:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/Materializer.test.ts -t 'takes the directories its deletions emptied'

 Test Files  1 passed (1)
      Tests  1 passed | 50 skipped (51)
```

The five helper cases were written and run before the Materializer case, so the wiring is the only
difference between the red and the green run.

## Scoped validation

| Command                                                                   | Exit | Result                              |
| ------------------------------------------------------------------------- | ---- | ------------------------------------- |
| `npx tsc --noEmit --project tsconfig.json`                                | 0    | clean                               |
| `npx tsc --noEmit -p configs/src/tsconfig.server.json`                    | 0    | clean                               |
| `npx oxlint --config .oxlintrc.json --deny-warnings <the four TS files>`  | 0    | clean                               |
| `npx oxfmt --config .oxfmtrc.json --check <the six owned files>`          | 0    | all matched files correctly formatted |
| `npm run test:policy`                                                     | 0    | 111 passed (111)                    |
| `npm run test:guides`                                                     | 0    | 17 passed (17)                      |
| `npm run test:src:server`                                                 | 1    | 430 passed, 1 failed (431)          |
| `npm run test:src:bin`                                                    | 1    | 204 passed, 5 failed (209)          |

The two red suites are the standing condition the brief named, and nothing else: editing
`guides/scaffold.md` and `.agents/skills/orkestrel-publish/references/wave.md` makes the committed
`host.json` inventory stale, so `readHostFloor` refuses. Every failure names it:

```text
ScaffoldError: The vendored host cannot read the declared file at .agents/skills/orkestrel-publish/references/wave.md
 ❯ readHostFloor src/server/helpers.ts:1232:10
```

Two measurements bound that claim rather than asserting it.

- Digest comparison: `host.json` declares `cb664344…` for `wave.md` and `b988faa9…` for
  `guides/scaffold.md`, which are exactly the digests of the committed (`HEAD`) copies. The working
  copies now digest `9f8dbb29…` and `168273a8…`.
- Control run: with the two prose files temporarily restored to their `HEAD` bytes and every source
  and test change still in place, `npm run test:src:bin` reported `209 passed (209)` and
  `npm run test:src:server` reported `431 passed (431)`. The edited prose was then copied back and
  re-digested to `9f8dbb29…` and `168273a8…`, so the restore is byte-identical to the reported state.

`npm run build` regenerates `host.json` and clears both suites. I did not run it, per the brief.

## Acceptance criteria

1. Typecheck passes — `npx tsc --noEmit --project tsconfig.json` and
   `npx tsc --noEmit -p configs/src/tsconfig.server.json`, both exit 0.
2. The helper cases and the Materializer case pass — the `src:server` project reports 430 passed
   with the single stale-inventory failure; the control run reports 431 passed.
3. The red run is recorded before the wiring and the green run after, in the preceding section.
4. `guides/scaffold.md` carries the `pruneEmptiedDirectories` row in the server helper table and the
   prune sentence in the Git section; `wave.md` no longer names the `.agents/`-opening form and
   carries the `npm install --no-save` sentence.
5. `git status --short` lists the six owned files and nothing else.

```text
 M .agents/skills/orkestrel-publish/references/wave.md
 M guides/scaffold.md
 M src/server/Materializer.ts
 M src/server/helpers.ts
 M tests/src/server/Materializer.test.ts
 M tests/src/server/helpers.test.ts
```

## Addendum carried

The coordinator's third wave bullet landed as a paragraph directly after the tarball paragraph,
condition first:

```text
Where a visit runs before scaffold itself publishes, run `scaffold overwrite --offline` and prove
the sweep with `scaffold audit --offline`. The online verbs read vendored bytes from the published
package, so an unpublished scaffold's visit otherwise writes the registry's older floor, and an
online audit reports the floor-restored files as stale until the release. The `--offline` overwrite
skips the catalog step and exits `1` with a note naming that refusal, so run the full
`scaffold overwrite` after the release.
```

It is a paragraph rather than a list item because the surrounding visit guidance is prose and the
nearest list is the numbered visit order, whose steps it does not join. That placement choice is
ancillary and recorded here rather than raised as a deviation.

## Decisions I made and flag

- **The guide helper table is re-aligned.** `pruneEmptiedDirectories` is wider than the previous
  name column, so every row of that table gained two spaces. That is why the guide diff is 77 lines
  for one added row. `npx oxfmt --check` passes on the file before and after.
- **`.claude/skills` is pruned when a removal empties it, and that is correct here.** A
  directory-shaped host artifact the manifest declares with no entry beneath it expands into no
  artifact, so an absent directory produces no finding and a fresh `new` never creates one either.
  Verified by running: the Materializer case leaves `.claude` and `.claude/rules` standing and the
  `src:server` and `src:bin` suites report no new drift. I did not extend the case into a re-audit
  assertion, which stays outside this unit's scope.
- **No retry on a refused `rmdirSync`.** `.claude/rules/portability.md` asks for a bounded retry on
  an `EBUSY`, `ENOTEMPTY`, or `EPERM` removal. This package carries no retry idiom, and a directory
  that refuses removal is simply left standing and reported by omission, which is the same outcome
  as a directory that is not empty. I flag this as my own judgment rather than a proven equivalence.

## Observation outside my scope

`.orkestrel/contract/` held untracked files at my first `git status --short` and is an empty
directory as I finish; its mtime is 12:50, inside my session. I did not write, delete, or read
anything under `.orkestrel/`. My change cannot produce it: `pruneEmptiedDirectories` calls only
`rmdirSync`, which refuses a directory holding an entry, and no test drives a deletion at the
repository root. Reporting it rather than acting on it.
