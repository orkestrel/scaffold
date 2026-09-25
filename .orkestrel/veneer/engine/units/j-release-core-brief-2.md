# Unit J-RELEASE-CORE, round 2 — `hold` refuses after destruction, `join` leaves with its child, `Button` joins first, and the prose teaches the mechanism

**What changed from `j-release-core-brief.md`, and why.** Round 1 (`d702bb8`) ruled FAIL 1, 3, 4, 8 (`units/j-release-core-audit-verdict.md`), and E35 is amended from that audit. This round carries every finding the verdict gives it. Claim 4's code stays, because its amendment changes the ruling, not the code.

## Role and engine

`opus` on Opus 5.5, a native Claude Code subagent writing in its own worktree. It is native because the proofs run in Chromium.

## Objective

`Lifetime` and `Button` meet E35 with its amendment. Every sentence about the mechanism teaches what an engine author must do and states only what the code does.

## Context

**Evidence.** Every path under `units/` is in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/`.
- The verdict `units/j-release-core-audit-verdict.md` and its two lane verdicts:
  - `units/j-release-core-audit-objective-verdict.md`, claims 1, 3, 4, and 8, and the Button input under the table;
  - `units/j-release-core-audit-reviewer-verdict.md`, § Design-fit defects, items 1 to 5, and § Referrals.
- `decisions.md` § E35 with its amendment "E35 amended at the J-RELEASE-CORE round-1 audit".

**The obligations.**
1. **`hold` after destruction.**
   - Once destruction has begun, `hold` returns `false` for every record.
   - It runs the release at once for a record it did not hold. For a record it already holds, it leaves the holding pending for the drain to give back.
   - Write the red-first case from the objective lane's input: hold a record, then call `hold` for it from the signal's abort listener, and assert `false`.
2. **`join` leaves with its child.**
   - In the owner branch, `join` also ends the owner's holding when the child's own lifetime ends. The subjective lane's shape is an abort listener on the child's lifetime signal that calls `owner.release(resource)`. Another shape is fine if it meets the ruling.
   - Prove two things:
     - a child built with the owner's signal and then destroyed directly is no longer held: `owner.release(child)` returns `false`;
     - repeated build-and-destroy cycles leave no holding behind.
   - Rule the objective lane's two orderings in a case each:
     - the owner draining runs the child's release;
     - a child destroyed inside its own construction.
3. **`Button` joins first.**
   - `Button` joins right after its registry claim, before it reads any option, hook, or getter.
   - Write the red-first case from the objective lane's input: an `on` getter that toggles the button, destroys the owner, and reads `aria-pressed`. It must read the restored value inside the getter.
4. **The prose.** Apply the subjective lane's items. Where an item conflicts with E35's amendment, the amendment wins.
   - **Item 2:** the three sentences that say every class joins now describe the mechanism and name its user.
   - **Item 3:** the author obligations are written with `must`: hold a take before it can run other code, and make a release resumable.
   - **Item 4:** split the four-idea save sentence.
   - **Item 5:** make the test titles name what they prove, and replace `once` meaning "after" with `after`.
   - **`hold`'s remarks and the guide** match obligation 1.
   - **The `write` remarks and the guide's save paragraph** state the amended no-change join: a live holder's record, or one a restoration still has to write back.
   - **`join`'s remarks and example** state obligation 2's behaviour, with an example of what a class passes.
5. **The replay row.** Re-run the mutation `button-snapshot-held`, and report the error class of each of its failures.

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- These rules, under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`, `documentation.md`, and `writing.md`.
- `decisions.md` § E25 and § E35 with its amendment.
- Skill: none. Guide: `guides/veneer.md`.

**Installed primitives.** `@orkestrel/test` for every wait and recorder.

**Host.**
- Windows 11 with Git Bash. Chromium 153 is installed for Playwright.
- The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-core`, on `unit/release-core` at `d702bb8`. Round 1's instruments are under its `tmp/j-release-core/`: `mutate.mjs` and `mutations.json`.
- A foreground call is capped at 10 minutes.
- Write each program to a file under `tmp/j-release-core/` or `tmp/probe/`, and run the file. Use no heredoc, no `python -c`, and no `node -e`.
- Run one test file at a time: `npx vitest run --config vite.config.ts --no-cache --project src:browser <file>`.

**Measurements.** The two red-first cases, from obligations 1 and 3, read red at `d702bb8` by assertions. Record both readings before any source edit.

**Control identifiers.** None. Name each test for what it proves.

**Standing conditions.** `tests/src/styles/elements/button.test.ts` is no longer a standing row on `main` since `0a0a252`, but this worktree's base, `63eabbd`, still reads it red. Neither reading is this unit's.

## Unknowns

- Whether `owner.release(child)` inside the child's own abort dispatch reruns the child's `destroy` harmlessly in both orderings. The cases in obligation 2 answer it. If either ordering breaks E35's invariant, stop and report it with the reading.

## Scope

**Owned.**
- `src/browser/Lifetime.ts`, `src/browser/Button.ts`, and `src/browser/HostSnapshot.ts` (its remarks only).
- `src/browser/types.ts`: the `LifetimeInterface`, `LifetimeHolding`, `HostSnapshotInterface.write`, `ButtonInterface`, and `ButtonOptions` sections.
- `tests/src/browser/Lifetime.test.ts`, `Button.test.ts`, and `HostSnapshot.test.ts`.
- `guides/veneer.md`: the sections round 1 changed.
- `tmp/j-release-core/` and `tmp/probe/`.

**Shared (report-only).** None.

**Off-limits.**
- Every other file, including every other engine.
- The vendored files, which the `scaffold repair` command restores: `tests/setupPolicy.ts`, `tests/policy.test.ts`, the root `tsconfig.json`, `vite.config.ts`, and `configs/**`.

**What asserts the state this change ends.** Round 1's `hold` case for an already-held record, if one exists, and the guide's Surface rows for any summary you change. Run `npm run test:guides` and the owned files after the change.

**Tools and limits.**
- Tools: Read, Grep, Glob, Edit, Write, and Bash.
- Commit nothing. Install nothing.
- Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.
- Format owned files with `npx oxfmt --config .oxfmtrc.json --write <files>`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- the two measurements' red readings, and the answer to the unknown;
- the contract as it stands after the round: `LifetimeInterface` and `join`'s signature and remarks, verbatim;
- the files touched;
- each obligation, 1 to 5, with its proof: each case's title, its red reading at `d702bb8` naming the assertion where one applies, and its green reading;
- each corrected sentence, before and after;
- a mutation table for the new behaviour, each row's red reading naming an assertion:
  - `hold` returning `true` for a held record after destruction began;
  - `join` without the child-lifetime release;
  - `Button` joining after its hooks;
- round 1's mutation rows re-run through `mutate.mjs`, with the error class of each failure;
- the acceptance output, verbatim;
- `git status --short`;
- the deviation state.

## Deviation contract

Follow § Deviation protocol in `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`. Stop and report when an obligation cannot meet E35 as amended, or needs an off-limits file. You decide:
- the shape of the child-lifetime release;
- each sentence's wording within its item;
- the case titles.

## Acceptance criteria

1. `npm run check`, `npm run lint:check`, and `npm run format:check` exit 0.
2. `npm run test:policy`, `npm run test:guides`, and `npm run test:setup:browser` exit 0.
3. `Lifetime.test.ts`, `HostSnapshot.test.ts`, `helpers.test.ts`, `Button.test.ts`, and `index.test.ts` pass in scoped runs.
4. Obligations 1 and 3 each have a case that reads red at `d702bb8` by an assertion and green after.
5. A child destroyed directly leaves its owner's ledger in both orderings, and a repeated cycle leaves no holding.
6. Every mutation in both tables reddens its proof by an assertion.

**Observations, not criteria.** `npm run test:src` and the whole suite, which the Orchestrator runs after you exit.

## Review evidence

The Orchestrator commits your work, replays the proofs and the mutations, and gives the audit lanes both rounds' diffs, the status, both reports, and its replay.
