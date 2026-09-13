# Unit report — U-fix-2 (Opus `implementer`, native, returned 2026-09-13)

## Touched files

| File | Change |
| --- | --- |
| `guides/scaffold.md` | Item A: moved the toolchain paragraph out of the artifact list to after it, named the `EBADDEVENGINES` code and the upgrade command, gave every code token a following noun, and recast the possessive at the former line 908. |
| `tests/distribution.test.ts` | Item B: the comment at line 926 names `provisionNpm`; nothing else in that comment changed. |
| `README.md` | Item C: one sentence in § Notes stating the generated workspace's npm floor, the `EBADDEVENGINES` refusal, and the remedy. |
| `ROADMAP.md` | Item D: deleted both counts in the `&&` row and named the case, recast the possessives at the `SetupPanel` and `OllamaProvider.test.ts` rows, cited the retained npm-boundary log with the prune/git-history statement, and added one scaffold successor row after the `supportsMappedLoopback` row. |
| `src/core/constants.ts` | Item E: the `@remarks` block reads "with the `onFail` key set to the `error` value"; the summary line is byte-identical. |

Diffstat (`git diff --stat`, owned files only):

```
 README.md                  |  5 +++++
 ROADMAP.md                 | 47 +++++++++++++++++++++++++++++++++++-----------
 guides/scaffold.md         | 19 +++++++++++--------
 src/core/constants.ts      |  5 +++--
 tests/distribution.test.ts |  2 +-
 5 files changed, 56 insertions(+), 22 deletions(-)
```

Baseline: `9e21cd7`, clean (`git status --porcelain` empty before the first edit). No commit, no `git` command that discards a change, no file outside the owned list written.

## Criteria, cheap-first (every reading taken after the last edit)

| # | Command | Reading |
| --- | --- | --- |
| 1 | `npm run format:check` | exit 0, `All matched files use the correct format.`, 225 files |
| 2 | `npm run lint:check` | exit 0 |
| 3 | `npm run check` | exit 0 (root, `check:src:core`, `check:src:server`, `check:src:bin`) |
| 4 | `npm run test:policy` | exit 0, `Tests 91 passed (91)` |
| 5 | `npm run test:guides` | exit 0, `Tests 23 passed (23)` |
| 6 | `grep -c EBADDEVENGINES guides/scaffold.md README.md` | `guides/scaffold.md:1`, `README.md:1` |
| 7 | `grep -c resolveNpm tests/distribution.test.ts` | `0` |
| 8 | `grep -n "\`'s" ROADMAP.md guides/scaffold.md README.md src/core/constants.ts` | no output, exit 1 |
| 9 | `grep -n 'one failing project\|one red case' ROADMAP.md` | no output, exit 1 |
| 10 | `grep -c npm-boundary-readings.log.txt ROADMAP.md` | `1` |
| 11 | `grep -n -A2 "except the manifest." guides/scaffold.md` | `1401:except the manifest.` / `1402-` (blank) / `1403-- One computed artifact: ...` |
| 12 | `git diff --stat` | the five owned files only |

Not run, per the brief: `test:setup`, `test:config`, `test:distribution`, `test:src:*`.

## Item A, final wording

Guide line 908 area:

```
A library caller creating a fresh workspace itself applies the rule the `new` command follows:
```

The relocated paragraph, now at `guides/scaffold.md:1451-1459`, directly after the artifact list's last bullet and before the declaration-rollup paragraph:

```
Every generated manifest declares the toolchain it is gated on. The `engines.node` field carries the
blueprint's `engines` value, which defaults to the `>=22.18.0` range. The
`devEngines.packageManager` record names npm at the `>=11.6.0` range with its `onFail` key set to
the `error` value, and no blueprint field varies that floor. An npm beneath that floor refuses the
`npm install` command in a generated workspace with the `EBADDEVENGINES` code instead of resolving
the dependency graph, and it refuses each nested `npm run` command under that install on the same
reading. So run a generated workspace on npm `11.6.0` or later. Read the ambient version with the
`npm --version` command, and raise it with the `npm install --global npm@11.6.0` command, or a later
release, before the first install.
```

## Item C, final wording

`README.md:61-64`, the first paragraph of § Notes:

```
A workspace the `scaffold new` command generates declares an npm floor of `11.6.0` in its
`devEngines` record, so an npm beneath that floor refuses the `npm install` command with the
`EBADDEVENGINES` code; raise npm with the `npm install --global npm@11.6.0` command, or a later
release, before the first install.
```

## Item D, the successor row verbatim

`ROADMAP.md:422-441`: the row beginning "the `0.0.65` fix audit ruled these test-side findings out of
that release" — see the file; the diff is the record.

## Deviation state

No stop condition fired: item A placed without touching the list's content, the README pin stays green (`test:guides` exit 0, 23 passed), item E left the summary line byte-identical, and no file outside the owned list needed a change. Recorded decisions inside the wording latitude the brief granted:

1. **The `&&` row names the case differently from the brief.** The brief said "the mapped-loopback case in `tests/src/server/helpers.test.ts`". The retained log names the failure as `FAIL |src:server| tests/src/server/helpers.test.ts > Ollama setup > refuses redirected version readiness without starting a local daemon` at `:223` (`.orkestrel/campaign/evidence/linux-gate/scaffold-gates.log.txt:168-179`), and that case now reads `refuses an unready loopback endpoint rather than starting a host daemon` at `tests/src/server/helpers.test.ts:225`. Mapped loopback names a different case, in `tests/setupServer.test.ts`. I wrote "the unready-loopback case in `tests/src/server/helpers.test.ts`", which is true under the logged title and the present one, rather than writing a false claim into the row item D exists to make true.
2. **Item C omits the "Node 22 or Node 24" clause the brief suggested.** I can check this host's ambient npm `10.9.7` on Node `22.22.2`, and I cannot check what npm a Node 24 release bundles, so the sentence states the floor, the refusal, and the remedy — each of which the reader can check with `npm --version` — instead of a version-bundling claim.
3. **Placement of the moved paragraph:** after the artifact list's last bullet and before the declaration-rollup paragraph, keeping it adjacent to the `package.json` bullet whose manifest it describes.

One host fact worth carrying: `oxfmt` formats Markdown and rejects a code span wrapped across a line break, because it strips the continuation indent that sits inside the span. My first wording of the `&&` row quoted the failing test title as one code span across two lines, and `npm run format:check` exited 1 naming `ROADMAP.md` until the span fit on one line. The diagnosis run was on copies in the session scratchpad, never a tree-wide `format`.
