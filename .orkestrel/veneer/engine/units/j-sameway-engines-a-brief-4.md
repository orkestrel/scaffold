# Unit J-SAMEWAY-ENGINES-A, round 4 — Collapse records every completion write, and a property's return keeps its priority

Successor of `j-sameway-engines-a-brief-3.md`. Its sections, and round 2's and round 1's that it keeps, stand except where this brief replaces them.
- Round 3 is committed as `61640e0` on `unit/engines-a`.
- The Orchestrator integrated it as `5e3ae52` (`HostSnapshot.save` reads through `readHostValue`, and the guide's return sentences) and `dc2a1a7` (the four leaves in the barrel export list `tests/src/browser/index.test.ts` pins).
- The worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-a` is clean at `dc2a1a7`.

## Role and engine

`opus` on Opus 5.5, a native Claude Code subagent writing in that worktree. It is native because the proofs run in Chromium.

## Why

The rounds 2 and 3 audit's objective lane ruled `VERDICT: FAIL 1, 7`. It ran as `analyst` on GPT-6 Astra, and its verdict is `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-sameway-engines-a-audit-3-objective-verdict.md`. Read it whole. Its findings are source deductions, and this round puts each under a test.

- **F1: Collapse leaves three completion writes unrecorded.** At `dc2a1a7`, none of these three writes is preceded by a `recordHostChange` call:
  - show's final `host.style.removeProperty(dimension)`, the last `#apply` before `shown`;
  - hide's `host.style.removeProperty(dimension)`, before its `settleAnimations` wait;
  - hide's completing `host.classList.add(this.#classes.host)`.

  An earlier write that changed nothing recorded nothing, so the target reaches the rewind unrecorded. The verdict gives the witnesses:
  - a hide whose early `collapse` removal changes nothing, where a reaction to the completing `collapse` addition adds `show`, returns `collapse show` where the prior value is `show`;
  - a show or a hide whose size writes all change nothing, and a reaction to the size removal stops the change, returns the size absent where the prior value is `0px`.
- **F2: the return drops an inline property's priority.** `HostChange` records a property's value and not its priority. The rewind writes the value back unprioritized, so a prior `12px !important` returns as `12px`. `HostSnapshot` keeps priority on its own records (`HostSnapshotRecord.priority`), so a snapshot restore keeps it, and the change's return doesn't.

## The obligations

- **P1: record every completion write.** In `Collapse`, record each F1 target before its write. Recording stays conditional on a changed value, so recording a no-op never overwrites a consumer's edit.

  Then walk every host write in the change methods of `Collapse`, `Toast`, `Tab`, and `Carousel`, and tabulate each one with the record call that precedes it. A write that the engine's own contract excludes from the return needs a reason: the shown token under E25's presence rule, a blur, or a dispatched event. A write with no record call and no reason is a defect of this round. Fix it the same way.
- **P2: a property's prior value includes its priority.**
  - `HostChange` gains `readonly priority: string`. Declare it and document it as `HostSnapshotRecord.priority` is: the inline property's priority the record read, and the empty string for an attribute or a class token. One concept takes one term.
  - `recordHostChange` reads the priority for a property target.
  - A write that changes only a property's priority is a changing write. An engine writes no priority, so a prior `0px !important` meeting a `0px` write is recorded.
  - The rewind writes a property back with its recorded priority. A property target already at its recorded value and priority is skipped.
  - You shape the leaf signatures within these limits:
    - one reading of a target, shared with `HostSnapshot`, as round 3 ruled;
    - no wrapper that only renames a leaf;
    - `HostSnapshot`'s behaviour unchanged.

    Where `HostSnapshot`'s restore and the rewind write a property the same way, route both through one writer, and say which you chose.
- **Proofs, each red first on `dc2a1a7`'s source.**
  - `Collapse.test.ts` gains a case for each F1 witness: the hide `host` token, the show size, and the hide size.
  - `Collapse.test.ts` gains a priority case: a stopped show over `height: 12px !important` returns `12px` with priority `important`.
  - `helpers.test.ts` gains priority cases:
    - a property is recorded with its priority, and an attribute and a token with the empty string;
    - a write that changes only the priority is recorded;
    - the rewind writes the priority back.
  - Every P1 fix outside the F1 sites gets a red-first case of its own.
  - Record each case's red reading on `dc2a1a7`'s source. Reuse the round-3 red harness and the base-restoring script in `tmp/j-engines-a/`.
  - Rerun the round-3 mutation instrument, with a row per fix: delete each added record call; drop the priority in the rewind; compare the value alone in the change test. Count a kill only when the failure names an assertion (`AssertionError` or the expect library's message), and read every other failure as refused. Read a passed case as held only when the whole file run reports success, with no failed case and no unhandled error.

## Scope

- **Owned.** Round 3's owned files:
  - `src/browser/Collapse.ts`, `Toast.ts`, `Tab.ts`, `Carousel.ts`, and `helpers.ts`;
  - `tests/src/browser/Collapse.test.ts`, `Toast.test.ts`, `Tab.test.ts`, `Carousel.test.ts`, and `helpers.test.ts`;
  - `src/browser/types.ts`, for `HostChange` alone;
  - `guides/veneer.md` § Surface, for the rows of `HostChange` and each leaf whose TSDoc changes.

  This round adds:
  - `src/browser/HostSnapshot.ts`, only to share the writer or the priority reading. `tests/src/browser/HostSnapshot.test.ts` stays unchanged and green.
  - `tests/src/browser/index.test.ts`, for the barrel export list, if you add or rename an export.
  - `tmp/j-engines-a/`.
- **Report-only.** The guide's return sentences in § Collapse, § Tab, § Carousel, and § Toast. Return an exact patch against your tip for every sentence your change makes false, including any sentence on priority, and check it with `git apply --check`.
- **Off-limits.** Every other file. These are also off-limits: the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, the root `tsconfig.json`, `vite.config.ts`, and `configs/**`, which the `scaffold repair` command restores; `tests/setupBrowser.ts`; and every engine that J-SAMEWAY-ENGINES-B, J-CONCERNS-A, or J-ORACLE-RECORD owns.
- **What asserts the state this change ends.**
  - Every `toEqual` on a `HostChange` list in `tests/src/browser/helpers.test.ts`, where the `{ target, prior }` records gain `priority`.
  - Every `Collapse.test.ts` case that expects the size or the `collapse` token absent after a stopped change.
  - The § Surface summary of each changed TSDoc, which `tests/guides.test.ts` compares.

  Find each by running the owned files and `npm run test:guides` after each change.

## Host

Windows 11 with Git Bash. Chromium 153 is installed for Playwright. A foreground call is capped at 10 minutes. Write each program to a file under `tmp/j-engines-a/` and run the file: no heredoc, no `python -`, no `node -e`. Run one test file at a time with `npx vitest run --config vite.config.ts --no-cache --project src:browser <file>`.

## Execution

Perform the assignment directly and spawn nothing. Commit nothing. Install nothing. Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. Format owned files with `npx oxfmt --config .oxfmtrc.json --write <files>`.

## Output

Your final message holds:
- the files touched;
- the P1 table: each host write per engine, its record call or its reason;
- the leaf signatures after P2, and which writer and reading you shared;
- each added case with its red reading on `dc2a1a7`'s source, verbatim;
- the mutation table from the log;
- the report-only patch's path;
- the acceptance output verbatim;
- `git status --short`;
- the deviation state.

## Deviation contract

Follow § Deviation protocol in `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`. Stop and report when a fix needs an off-limits file. You decide and record:
- the leaf parameter shapes within P2's limits;
- the case titles and where each case sits;
- the order of the record calls.

## Acceptance criteria

1. `npm run check`, `npm run lint:check`, and `npm run format:check` exit 0.
2. Each F1 witness and the F2 priority case read red on `dc2a1a7`'s source and green at your tip.
3. The P1 table lists every host write in the four engines' change methods, each with its record call or its reason.
4. The mutation instrument kills each new row by an assertion, and its control holds.
5. The owned test files, `tests/src/browser/HostSnapshot.test.ts`, `tests/src/browser/index.test.ts`, and `npm run test:guides` pass in scoped runs.

**Observations, not criteria.** The whole suite, which the Orchestrator runs after you exit.

## Review evidence

The Orchestrator commits your work on `unit/engines-a` and replays the red run and the instrument. It then gives both audit lanes the commit's diff, `git status`, your report, and its replay: `analyst` on Astra for the objective lane, and `reviewer` on Opus 5.5 for the subjective lane, because `HostChange` changes shape.
