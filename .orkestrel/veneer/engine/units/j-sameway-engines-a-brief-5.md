# Unit J-SAMEWAY-ENGINES-A, round 5 — name the record `HostWrite`, state its contract, and pin the priority reading's branch

Successor of `j-sameway-engines-a-brief-4.md`. Its sections, and the earlier rounds' that it keeps, stand except where this brief replaces them.
- Round 4 is committed as `bdecfa1`, with the Orchestrator's guide integration `3f62d64`.
- The worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-a` is clean at `3f62d64`.

## Why

Round 4's audit ruled `VERDICT: FAIL 8, 10` (`units/j-sameway-engines-a-audit-4-verdict.md`). The objective lane on Astra passed every behaviour claim. The subjective lane, `reviewer` on Opus 5.5, found three naming and contract defects in the shape rounds 2 to 4 built (`units/j-sameway-engines-a-audit-4-reviewer-verdict.md`). Read both verdicts, and `decisions.md` § E24's wording amendment of 2026-09-25.

## The obligations

- **N1: the field.** `HostChange.prior` becomes `value`, so the record reads `{ target, value, priority }` like `HostSnapshotRecord`.
- **N2: the names.** "Change" names the call alone.
  - The type `HostChange` becomes `HostWrite`.
  - `recordHostChange` becomes `recordHostWrite`, and its first parameter is `writes`.
  - `rewindHostChanges` becomes `rewindHostWrites`, with a `writes` parameter.

  Update every consumer in the same change:
  - the four engines;
  - `HostSnapshot` where it names them;
  - the tests;
  - the barrel export list in `tests/src/browser/index.test.ts`;
  - the § Surface rows.

  Leave no alias.
- **N3: the contract.** `recordHostWrite`'s summary states its condition in one sentence: it appends a target with the value and priority it reads only when the coming write is the call's first to change that target. Its § Surface row carries the same sentence. `writeHostValue`'s `value` parameter says that any string adds a token.
- **N4: the verb.** In the four engines' class remarks and `#rewind` comments, the returning step "writes each target back". "Restore" stays `HostSnapshot`'s term. Return a report-only patch that makes the same change in the guide's return paragraphs in § Collapse, § Tab, § Carousel, and § Toast.
- **N5: the branch.** Add the reviewer's witness to `tests/src/browser/helpers.test.ts`. An element carries inline `width: 10px !important` and a `width` attribute, and `readHostPriority` reads `''` for the attribute target. Add a mutation row that replaces the category branch with `return element.style.getPropertyPriority(name)`, and record its red reading.
- **Proofs.** Every existing case stays green, with the renames applied. Re-run the round-4 instrument with its anchors moved to the renamed code. Every row must still kill or hold as before.

## Scope

- **Owned:** round 4's owned files, which are listed in the next paragraph.
- **Report-only:** the guide's return paragraphs, as N4 names.
- **Off-limits:** as round 4.

Round 4's owned files:
- `src/browser/Collapse.ts`, `Toast.ts`, `Tab.ts`, `Carousel.ts`, `helpers.ts`, and `HostSnapshot.ts`;
- `src/browser/types.ts`, for the record type;
- the matching test files and `tests/src/browser/index.test.ts`;
- `guides/veneer.md` § Surface;
- `tmp/j-engines-a/`.

**What asserts the state this change ends.**
- Every `toEqual` on a record list in `tests/src/browser/helpers.test.ts`.
- The export list in `tests/src/browser/index.test.ts`.
- The § Surface rows, which `tests/guides.test.ts` compares.

Find each by running the owned files and `npm run test:guides` after the rename.

## Output

Your final message holds:
- the files touched;
- the renamed declarations and signatures;
- the N5 case and its red reading;
- the mutation table from the log;
- the report-only patch's path, and its `git apply --check` output;
- the acceptance output verbatim: `npm run check`, `npm run lint:check`, `npm run format:check`, the owned test files in scoped runs, and `npm run test:guides`;
- `git status --short`;
- the deviation state.

Perform the assignment directly and spawn nothing. Commit nothing. Write each program to a file and run it. Use no heredoc, no `python -`, and no `node -e`.
