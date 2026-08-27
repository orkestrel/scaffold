# Unit W5 report — superseded canon copies become foreign findings; the advisory retires

Complete. No deviation. `implementer` on Opus 5 (recorded substitution: the Codex bench is dark).

## Touched files

Seven files, all owned. Nothing else in the tree changed.

| File                                    | Change                                                                                                                                                                |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/server/Materializer.ts`            | `#derive` adds a second snapshot source, `#canon`: each `CANON_PATHS` member the target holds, by file for a directory member and itself for a file member, filtered by the plan's selected groups through `inferGroup`. `audit` and `remove` remarks state the canon population, the path-membership rule, and the untracked leftover |
| `src/bin/CLI.ts`                        | `#canonQuestion` and its `#targetQuestions` call site deleted; three imports that only it used dropped; the `#replace` comment restates the candidate bound            |
| `src/server/helpers.ts`                 | `filesToHost` remark: the canon clause no longer says no target receives a canon path                                                                                  |
| `tests/setupServer.ts`                  | `buildFleetManifest` declares `HOST_PATHS` plus `CATALOG_AGENT_PATH` and no root; `commitFiles` added; `matchesVacantRoot` and `FLEET_WRITE_COUNT` removed; three remarks repinned |
| `tests/src/server/Materializer.test.ts` | the canon population, the group gate, and the canon deletion pinned; the hydration test repinned to the membership that shipped                                        |
| `tests/src/bin/CLI.test.ts`             | the advisory cases reversed into foreign-finding cases; the one-run sweep, the ignored registration, and the untracked leftover pinned; `FILE_GROUPS` replaced by `GROUPS` |
| `tests/src/server/helpers.test.ts`      | three comments that went false with the membership move                                                                                                               |

```text
 src/bin/CLI.ts                        |  47 +-----
 src/server/Materializer.ts            |  57 ++++++-
 src/server/helpers.ts                 |   5 +-
 tests/setupServer.ts                  | 120 +++++++-------
 tests/src/bin/CLI.test.ts             | 295 +++++++++++++++++++++++++++-------
 tests/src/server/Materializer.test.ts | 174 +++++++++++++++++---
 tests/src/server/helpers.test.ts      |  19 +--
 7 files changed, 525 insertions(+), 192 deletions(-)
```

The ruled shape landed as written: no new public method, no new `Drift` member, no new `Finding`
field, no new result field. `remove` is untouched — one candidate list, one transaction, one
`removed` array — because the canon leftovers arrive as ordinary `foreign` findings.

## Failing-first record

### The baseline, before any edit

W4's break-set was a measured red, not only a static reading.

| Command                 | Baseline result                                            |
| ----------------------- | ---------------------------------------------------------- |
| `npm run test:src:server` | exit 1, `Test Files 1 failed | 4 passed (5)`, `Tests 3 failed | 415 passed (418)` |
| `npm run test:src:bin`    | exit 1, `Test Files 1 failed | 2 passed (3)`, `Tests 51 failed | 155 passed (206)` |

Every one of those reds traced to `buildFleetManifest` walking `HOST_PATHS` for a directory member
that no longer exists there, so the fleet host declared no entry for `.claude/agents/orkestrel.md`
and every verb refused at hydration with `The vendored host does not carry
.claude/agents/orkestrel.md`. Fixing the fixture alone took `src:server` to `3 failed → 1 failed`
and `src:bin` to `51 failed → 4 failed`.

### The Materializer rows, red before the source change

Command: `npx vitest run --project=src:server tests/src/server/Materializer.test.ts`.

- Before `#canon`: `Test Files 1 failed (1)`, `Tests 4 failed | 46 passed (50)`.
- After `#canon`: `Test Files 1 passed (1)`, `Tests 50 passed (50)`.

The tests that ran red first, by name, each reporting that no canon path reached the audit:

1. `Materializer audit > reads the host bytes a compiler audit cannot, and leaves a foreign file to the deletion verb` — `expected undefined to be 'foreign'` at `.cursor/rules/foreign.md`.
2. `Materializer audit > reports an unplanned canon path as foreign and pairs a planned one with its artifact` — `expected [] to strictly equal [ '.claude/agents/planner.md', '.claude/rules/names.md', '.mcp.json' ]`.
3. `Materializer audit > reads no canon path outside the groups the plan selects` — the control arm, `expected [] to strictly equal [ '.claude/rules/names.md' ]`.
4. `Materializer remove > takes the tracked canon leftovers through the one transaction and spares the planned file` — `expected [] to strictly equal [ '.claude/agents/planner.md', '.claude/rules/names.md' ]`.

### The CLI rows, red under a mutation probe

The executable's rows were written after the source change, so their failing proof is a mutation
probe rather than an ordering: the one line `for (const path of this.#canon(plan, target))
paths.add(path)` was removed from `#derive`, `npm run test:src:bin` was run, and the line was
restored from a copy.

- With the line removed: `Test Files 1 failed | 2 passed (3)`, `Tests 10 failed | 199 passed (209)`.
- With the line restored: `Test Files 3 passed (3)`, `Tests 209 passed (209)`.

The ten that reddened were the six rows this unit owns plus four the canon source now carries that
were already red at the baseline:

1. `CLI audit > reports each superseded canon copy as a foreign finding in its own group`
2. `CLI audit > reads no canon path outside the groups the run selects`
3. `CLI audit > deletes no superseded canon copy on a repair and reports it afterwards`
4. `CLI overwrite > repairs the pointer and sweeps every tracked canon leftover in one run`
5. `CLI overwrite > leaves a git-ignored registration outside the dirty refusal and outside the deletion`
6. `CLI overwrite > refuses an untracked canon leftover as uncommitted work and leaves it standing under the waiver`
7. `CLI audit > counts a foreign path apart from the planned paths it reports on`
8. `CLI audit > reports a file the plan does not own beneath an owned vendored root, and no file at the target root`
9. `CLI overwrite > overwrites a freshly scaffolded repository without deleting untracked files`
10. `CLI overwrite > reports replacements, creations, and file deletions as distinct outcomes`

## The control table, row by row

| Control | Where it is pinned | State |
| --- | --- | --- |
| Tracked `.claude/rules/names.md` leftover beside the pointer pair | `CLI audit > reports each superseded canon copy as a foreign finding in its own group` (foreign, group `orchestration`, exit 1) and `CLI overwrite > repairs the pointer and sweeps every tracked canon leftover in one run` (listed in `removed`, and a second `audit` command exits 0) | pinned |
| `.claude/agents` holding the catalog file plus a tracked `planner.md` | the same pair, plus `Materializer remove > takes the tracked canon leftovers through the one transaction and spares the planned file` | pinned |
| A drifted `AGENTS.md` pointer | the sweep test: `written` contains it, `removed` does not, and its bytes equal what an earlier repair wrote | pinned |
| An edited catalog file | the sweep test: both consumer paragraphs survive and the table between the markers carries `| \`@orkestrel/guide\`` after the run | pinned |
| A git-ignored `.mcp.json` the target wrote | `CLI overwrite > leaves a git-ignored registration outside the dirty refusal and outside the deletion`, run on a committed tree with no `--dirty` | pinned, with one consequence recorded in Observations |
| An untracked unignored canon leftover | `CLI overwrite > refuses an untracked canon leftover as uncommitted work and leaves it standing under the waiver` | pinned |
| Planted `src/` and `app/` files | the existing `Materializer remove > deletes a tracked foreign file and never a protected or untracked one`, unchanged and green | stands |
| A canon leftover under `--groups tests` | `CLI audit > reads no canon path outside the groups the run selects` and `Materializer audit > reads no canon path outside the groups the plan selects`, each with the wide-selection control beside it | pinned |
| `repair` on a tree with leftovers | `CLI audit > deletes no superseded canon copy on a repair and reports it afterwards` | pinned |

Two instruments deserve naming. The Materializer rows run against a host whose manifest declares no
root at all, so the owned-root arm of `#derive` cannot report and every foreign path in those tests
arrives through the canon — that is the rival reading the fixture excludes. Every scoped-selection
row carries a wide-selection control over the same target, so a silent scoped audit is the
selection rather than a reading that never fires.

## Scoped validation evidence

| Command | Result |
| --- | --- |
| `npm run check` | exit 0 |
| `npm run test:src:server` | exit 0, `Test Files 5 passed (5)`, `Tests 421 passed (421)` |
| `npm run test:src:bin` | exit 0, `Test Files 3 passed (3)`, `Tests 209 passed (209)` |
| `npm run test:src:core` | exit 0, `Test Files 8 passed (8)`, `Tests 373 passed (373)` |
| `npx oxfmt --config .oxfmtrc.json --check <owned files>` | exit 0, `All matched files use the correct format.` |
| `npx oxlint --config .oxlintrc.json --deny-warnings <owned files>` | exit 0, no output |
| `grep -rn "'canon'" src/` | no match: no `canon` question value remains in `src/` |
| `git status --porcelain` | the seven owned files, modified; nothing else |

The formatter and linter runs are read-only and scoped to the owned files by explicit path, outside
the brief's three named commands for the same reason W4 recorded: shipping a formatter-dirty owned
file is a defect this unit can prevent and creates no tree-wide result.

## Shared-file patches

`src/core/types.ts` needs none. Its `foreign` remarks stayed true: `Drift` still describes `foreign`
as the set `overwrite` deletes from narrowed by protection and by what git tracks, and `Finding`
still describes a foreign finding as one with no planned artifact and therefore no ownership. This
unit widened the population that reaches `foreign`, not what `foreign` means.

`src/core/helpers.ts` needs one. The `isCanonPath` remark names a surface this unit deleted, and the
two live consumers of the predicate are `filesToHost` in `src/server/helpers.ts` and the fetch list
in `src/bin/CLI.ts` — no compiler calls it.

```diff
--- a/src/core/helpers.ts
+++ b/src/core/helpers.ts
@@ -199,8 +199,8 @@
  * @remarks
- * The one reading of canon membership, so the compiler, the live overlay, and
- * the executable's advisory never disagree about what a path is. The match runs
- * to a segment boundary, so a sibling whose name opens with a member's name —
- * `.claude/rulesets` beside `.claude/rules` — stays outside.
+ * The one reading of canon membership, so the live overlay and the executable's
+ * fetch list never disagree about what a path is. The match runs to a segment
+ * boundary, so a sibling whose name opens with a member's name —
+ * `.claude/rulesets` beside `.claude/rules` — stays outside.
```

## Observations, not criteria

**The bounds reading.** Measured with a temporary probe in `tests/src/server/Materializer.test.ts`,
run and then removed: a target holding this checkout's full pre-split canon, audited against a plan
for a workspace publishing `core`, `browser`, and `server` and carrying an application, a bin, a
global setup, guides, an integration proof, and a conformance proof, reports
`findings=158 foreign=93 planted=96 hydrated=65`. The 93 is 96 planted canon files minus the three a
plan claims. Against the bounds: `readSnapshot`'s path list is 158 against `MAX_COLLECTION_ITEMS`
1000; `isAudit` sees 158 findings against `MAX_AUDIT_FINDINGS` 2000; the canon's bytes in this
checkout total 592,360 against `MAX_TOTAL_ARTIFACT_BYTES` 104,857,600, and its largest file is
`.agents/orchestration.md` at 63,388 bytes against `MAX_ARTIFACT_BYTES` 5,242,880. The canon would
have to grow roughly six-fold to reach the path bound and twelve-fold to reach the findings bound.
Neither limit is near.

**An ignored `.mcp.json` keeps a target at exit 1, and that needs a carrier in W6's prose.** The
seam works exactly as plan 2 ruling 4 states — the file survives every visit, is never a deletion
candidate, and does not make the tree dirty — but because deletion reads path membership and the
audit reads the same membership, the copy stays a `foreign` finding forever. So a target that
restores the `prove` server locally never earns exit 0 from `audit` or `overwrite` again. I found
this by asserting exit 0 on a sweep run that also held the ignored file, and split the claim rather
than weakening it: the sweep test proves exit 0 on a target whose leftovers were all tracked, and
the ignored-registration test states the surviving finding as its own assertion. The control table
predicted every observable this unit was asked to pin, so this is a consequence to document rather
than a deviation. It belongs beside the guide's Limits entry and `.claude/rules/quality.md`
§ Instruments, which W6 owns.

**The guide prose W6 must carry.** `guides/scaffold.md` still documents the deleted advisory and the
verb split it described: the `canon` field named at line 656, the whole `canon` question section at
lines 689-697, "No host-origin artifact claims a `CANON_PATHS` member" at lines 927-930, "no verb
writes or deletes that copy, so `audit` raises the `canon` question naming it" at line 1209, and
"**No verb removes a superseded instruction copy.**" with its reasoning at lines 1502-1508. Parity
passes because parity proves names, not sentences.

**Cross-cutting proofs, read rather than assumed.** `npx vitest run --project=policy
tests/policy.test.ts` exits 0 (`Tests 111 passed`); `--project=guides` exits 0 (`Tests 17 passed`);
`--project=config` exits 0 (`Tests 46 passed`), so `host.json` still matches a fresh stage.

**A consequence of W4 this unit had to absorb.** After the membership move a compiled plan claims no
vendored directory at all, so `#roots` is empty for every real plan and `#empty` materializes no
directory. Three fixture facts followed: `buildFleetManifest` declares no root, `FLEET_WRITE_COUNT`
became equal to `FLEET_ARTIFACT_COUNT` and was removed with `matchesVacantRoot` (a predicate that
could no longer fire), and the test claiming a compiler audit cannot cover a hydrated plan lost its
subject, because the two populations now coincide. That test was repinned to the claims that
survive: the materializer reads host bytes a compiler audit cannot, and a foreign file is left to
the deletion verb. The empty-directory write is still proven in `src:server` against a manifest that
declares such a root.

**`FILE_GROUPS` became `GROUPS`.** The local list in `tests/src/bin/CLI.test.ts` excluded
`orchestration` and `source` for a reason the membership move made false. I measured both: the
repeated-repair proof passes over every group, so the constant was replaced with the real `GROUPS`
and the proof's population widened rather than being explained by a stale comment.

**`commitFiles` is new test infrastructure.** `trackFiles` deliberately never committed, which makes
every claim about the dirty set a claim about the waiver instead. A row asking whether an ignored
file trips the refusal cannot be answered that way, so the fixture now commits with a per-invocation
`-c` identity that touches no git configuration.

## Deviation state

None. No location contradicted the brief's ruled shape, and no fix needed an off-limits file. Two
judgment calls inside the ruled shape are recorded above rather than absorbed: splitting the ignored
registration out of the sweep test when its exit-0 claim proved false, and replacing `FILE_GROUPS`
with `GROUPS` after measuring that the wider population passes.
