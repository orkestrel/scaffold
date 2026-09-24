# TEST-DRIVEHOLD audit — the checker lane's verdict (Sonnet, agent a85c412b5d26e5280, retained 2026-09-24) and the Orchestrator's ruling

## Per-claim ruling (the checker's, verbatim)

| Claim | Verdict | Evidence |
|---|---|---|
| 1. Scope (5 files, `0.0.23` in three fields) | CONFIRMED | `package.json:3` reads `0.0.23`; `package-lock.json:3,9` read `0.0.23` (Grep output). File contents for `helpers.ts`, `helpers.test.ts`, `guides/test.md` show only the described edits. Full tree-wide `git status` cannot be run by this read-only lane (no Bash tool); confirmation is limited to the five owned files' contents, which show no untargeted change. |
| 2. D1 in the source | CONFIRMED | `src/browser/helpers.ts:695-706`: `try { await waitForFrame(); if (!target.matches(':active')) throw new Error(...pressed state...) } catch (error) { try { await releasePointer() } catch (cause) { throw new Error(error instanceof Error ? error.message : String(error), { cause }) } throw error }`. Missed-press message unchanged at line 698. No `as`, `any`, `!`, `@ts-`, `eslint-disable`, nested function declaration, or access modifier present in the block. |
| 3. D1 in the doc block | CONFIRMED | `@throws` at lines 652-655 names frame wait and pressed-state read releasing before refusal, and release rejection as cause. `@remarks` at lines 657-662 reads "the frame wait and the `:active` read-back that both release before refusing," no longer singling out the read-back. Description paragraph at line 647 ("Holds the primary pointer button on the control a resolver returns, through the browser provider.") unchanged and matches guide § Surface row Summary at `guides/test.md:311`. |
| 4. D1 in the guide | CONFIRMED | `guides/test.md:452-455`: "`driveHold` is the one pointer drive every hold verb shares, releasing the pointer before refusing when the frame wait or the pressed-state read fails, as well as when the press misses" — one sentence, release-before-refusal for both failures. Errors-table rows at `guides/test.md:1138-1139` unchanged (`Pointer is already held at <x>x<y>`, `Interactive target "<name>" did not enter the pressed state`), and these are the only two messages `driveHold` throws directly (line 672, 698). No substitution-table term found in the added sentence. |
| 5. D2 the proof | CONFIRMED | `tests/src/browser/helpers.test.ts:1270-1286`: case named as report states; `matches` is a data property defined via `Object.defineProperty` on a real fixture button (line 1274-1278), an inert stub, not a spy/mock of project code; asserts rejection with `read refused` (1279), absence of `POINTER_HOLD` (1280), and a following successful hold-and-release on a fresh button (1281-1285). Report's red reading (1 failed test, `expected true to be false` on the marker check) and green reading (344 passed) are recorded in `drivehold-report.md:42-44`; command is consistent across both readings. |
| 6. The chain | CONFIRMED | `tmp/drivehold/acceptance.log.txt` shows `EXIT:0` for `format:check`, `lint:check`, `check`, `build`, and `npm test`, matching the report's exit lines and sub-suite counts verbatim (lines 8, 12, 24, 87, 132-133, 144-145, 164-165, 176-177, 188-189, 200-201, 205 of the log). |

## Checklist against the brief's acceptance criteria (the checker's, verbatim)

1. `format:check`, `lint:check`, `check` exit 0 — met, log lines 8, 12, 24.
2. `test:src:browser` green, D2 case present, red reading recorded before fix — met, report lines 40-44; test file lines 1270-1286.
3. `build` exit 0, then `npm test` exit 0 with `test:guides` green — met, log lines 87, 205, 200-203.
4. `package.json`/`package-lock.json` read `0.0.23` in the three named fields, nothing else changed in them — met for the version fields (verified directly); "nothing else changed" rests on the report's `git diff --stat` (4 lines changed in `package.json`, 4 in `package-lock.json`), not independently verifiable by this read-only lane.
5. Status lists only the owned files — not independently verifiable; this lane has no `Bash` tool and cannot run `git status`. The report's `git status --short` (lines 69-76) lists exactly the five owned files, but that reading is the writer's own self-report, so per the audit's evidence rule it is UNRESOLVED, not CONFIRMED, until a lane that ran the command supplies it.

## Referrals (the checker's, verbatim)

- Whether the tree-wide `git status`/`git diff --stat` scope claim (criterion 5, part of claim 1) holds beyond the five owned files is UNRESOLVED: this checker lane has no Bash access to run git, and the report's own quoted command output does not evidence itself per the audit's standing rule that a writer's self-report is never confirming evidence. Route to a lane or to the Orchestrator that can run `git status --short` and `git diff --stat` directly against `C:/Users/mikes/WebstormProjects/test`.

VERDICT: FAIL 1,5

## The Orchestrator's ruling (2026-09-24)

The checker's terminal line fails claims 1 and 5 for want of status evidence only, which the dispatch owed the lane and did not supply (a read-only lane cannot inspect the tree by writing to it). The Orchestrator ran the commands against `C:/Users/mikes/WebstormProjects/test` before committing:

```
$ git status --short
 M guides/test.md
 M package-lock.json
 M package.json
 M src/browser/helpers.ts
 M tests/src/browser/helpers.test.ts
$ git diff --stat
 guides/test.md                    |  4 +++-
 package-lock.json                 |  4 ++--
 package.json                      |  2 +-
 src/browser/helpers.ts            | 21 ++++++++++++---------
 tests/src/browser/helpers.test.ts | 18 ++++++++++++++++++
 5 files changed, 36 insertions(+), 13 deletions(-)
```

The status lists the five owned files and nothing else; the manifests change 2 and 4 lines, the version fields. Claims 1 and 5 close on that evidence. Committed as `80c419e` "Release 0.0.23" on `main`, pushed to `origin/main`; the registry serves `0.0.22` until the user runs the publish with a fresh one-time code (`npm publish --otp=<code>` in the checkout; `prepublishOnly` runs the chain and the distribution proof).

RULING: PASS (claims 1 and 5 closed on the Orchestrator's status evidence); dispatch defect recorded: the brief omitted the status output a read-only lane needs.
