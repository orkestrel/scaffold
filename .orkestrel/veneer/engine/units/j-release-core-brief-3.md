# Unit J-RELEASE-CORE, round 3 — `join` ends its membership through the drain, not through an event

**What changed from `j-release-core-brief-2.md`, and why.** Round 2 (`03526bc`) ruled FAIL 5 (`units/j-release-core-audit-2-verdict.md`). The child-lifetime release runs inside an `abort` event listener, where the DOM reports a thrown error to the global object instead of propagating it. A joined child's release error is lost that way, and the drain promises to rethrow the first error. The same round found that `join` enrolls a child whose lifetime has already ended. This is the join seam's second round, and this round closes it by removing the listener.

## Role and engine

`opus` on Opus 5.5, a native Claude Code subagent writing in its own worktree. It is native because the proofs run in Chromium.

## Objective

`join`'s owner branch ends the owner's holding of a child through the child's own drain, with no event listener. So a joined child's release error propagates, and a child whose lifetime already ended is not enrolled.

## Context

**Evidence.** Every path under `units/` is in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/`.
- The verdict `units/j-release-core-audit-2-verdict.md`, § The seam, which states the prescription.
- The objective lane's verdict `units/j-release-core-audit-2-objective-verdict.md`, with its two inputs under the table.
- The code at `03526bc`, in `src/browser/Lifetime.ts`: `join`'s owner branch adds `lifetime.signal.addEventListener('abort', () => owner.release(resource), { once: true })` when `hold` returns `true`.

**The prescription.**
1. **A private ending.** `Lifetime` gains a private method that ends a holding without running its release, removing the entry by record. It returns nothing and throws nothing. It is private, so `LifetimeInterface` does not change. The static `join` reaches it on a `Lifetime` owner found through the class's signal map.
2. **`join`'s owner branch.** After `owner.hold(resource, (held) => held.destroy())` returns `true`, `join` holds in the class's own lifetime a record whose release calls the owner's private ending for `resource`. Hold it right after the owner's hold, so it is the class lifetime's oldest holding and runs last in that lifetime's drain.
   - When `lifetime.hold` returns `false`, the class lifetime has already ended. Its release has then run at once, and the owner keeps nothing.
   - Remove the `abort` listener.
3. **The foreign branch stays.** A signal no lifetime owns still destroys the class through an `abort` listener. A throw there is the platform's to report, as E35 rules for a foreign signal. State that in `join`'s remarks.

**The proofs.**
- The objective lane's error input: an owner, a joined child `Lifetime` holding a throwing release, and the owner destroyed. It reads red at `03526bc`, because the error is not rethrown, by an assertion, and green after. Add the same case with the child destroyed directly.
- The ended-lifetime input: a child destroyed, then joined, then `owner.release(child)`. It returns `false`, reading red at `03526bc`.
- A nested owner drain inside the child's drain, before the child's last holding: it still reaches the child and returns with every holding given back. Write it as a case.
- Every round-2 case still passes: both orderings, repeated cycles, `Button`'s construction cases, and the error cases.

**Law.**
- `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`.
- These rules, under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/`: `typescript.md`, `architecture.md`, `tests.md`, `documentation.md`, and `writing.md`.
- `decisions.md` § E35 with its amendment.
- Skill: none. Guide: `guides/veneer.md` § Ownership and restoration.

**Installed primitives.** `@orkestrel/test` for every wait and recorder.

**Host.**
- Windows 11 with Git Bash. Chromium 153 is installed for Playwright.
- The worktree is `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-core`, on `unit/release-core` at `03526bc`. The round's instruments are under its `tmp/j-release-core/`: `mutate-2.mjs`, `mutations-2.json`, and `accept-2.sh`.
- A foreground call is capped at 10 minutes.
- Write each program to a file under `tmp/j-release-core/` or `tmp/probe/`, and run the file. Use no heredoc, no `python -c`, and no `node -e`.
- Run one test file at a time: `npx vitest run --config vite.config.ts --no-cache --project src:browser <file>`.

**Measurements.** The two red-first cases' red readings at `03526bc`, before any source edit.

**Control identifiers.** None. Name each test for what it proves.

**Standing conditions.** The styles session's four button-reboot cases read red on Veneer `main` on this host. They are not this unit's.

## Unknowns

None.

## Scope

**Owned.**
- `src/browser/Lifetime.ts`.
- `tests/src/browser/Lifetime.test.ts` and `Button.test.ts`.
- `src/browser/types.ts`: the `LifetimeInterface` remarks, only where this round changes what they state.
- `guides/veneer.md`: the § Ownership and restoration sentences on `join`.
- `tmp/j-release-core/` and `tmp/probe/`.

**Shared (report-only).** None.

**Off-limits.**
- Every other file.
- The vendored files, which the `scaffold repair` command restores: `tests/setupPolicy.ts`, `tests/policy.test.ts`, the root `tsconfig.json`, `vite.config.ts`, and `configs/**`.

**What asserts the state this change ends.** Round 2's `join` cases, which read the order of `destroy` calls. The order changes because no nested `destroy` runs through the listener any more. Update each assertion to the new order, and record each change.

**Tools and limits.**
- Tools: Read, Grep, Glob, Edit, Write, and Bash.
- Commit nothing. Install nothing.
- Never run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.
- Format owned files with `npx oxfmt --config .oxfmtrc.json --write <files>`.

## Execution

Perform the assignment directly and spawn nothing.

## Output

Your final message holds:
- the two measurements' red readings;
- `join` and the private ending, verbatim;
- the files touched;
- each proof: its title, its red reading at `03526bc` naming the assertion where one applies, and its green reading;
- each round-2 assertion whose recorded order changed, before and after;
- a mutation table, each row's red reading naming an assertion:
  - the ending held newest instead of oldest;
  - the ending that runs the release;
  - the ending omitted;
  - an ended class lifetime still enrolled;
- the full `mutate-2.mjs` table re-run, successor rows included;
- the acceptance output, verbatim;
- `git status --short`;
- the deviation state.

## Deviation contract

Follow § Deviation protocol in `C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md`. Stop and report when the prescription cannot meet E35's invariant in an ordering you can reach. You decide the private method's name, the case titles, and the sentences' wording.

## Acceptance criteria

1. `npm run check`, `npm run lint:check`, and `npm run format:check` exit 0.
2. `npm run test:policy`, `npm run test:guides`, and `npm run test:setup:browser` exit 0.
3. `Lifetime.test.ts`, `HostSnapshot.test.ts`, `helpers.test.ts`, `Button.test.ts`, and `index.test.ts` pass in scoped runs.
4. A joined child's release error propagates from the owner's destruction and from the child's own.
5. A child lifetime that already ended leaves its owner nothing.
6. `join` adds no event listener in the owner branch.
7. Every mutation reddens its proof by an assertion.

**Observations, not criteria.** `npm run test:src`.

## Review evidence

The Orchestrator commits your work, replays the proofs and the mutations, and gives the audit lane the diff, the status, the report, and its replay.
