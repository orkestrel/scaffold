# Unit D3 — close the round-two audit findings

## Role and engine

`opus` — Opus 5, native Claude subagent, the **scaffold** checkout at
`C:\Users\mikes\WebstormProjects\scaffold`, sole serial writer.

**Why native rather than the Sol bench.** Verification runs `npm run test:distribution`, which packs,
installs, and spawns a generated workspace. A bench sandbox denies a nested install and a grandchild
process, and Sol could not run Vitest at all under a read-only sandbox this round. Routing recorded
rather than assumed.

## The state you inherit

The tree carries units D1 and D2 uncommitted on top of `53d4a58e`, plus the Orchestrator's
integration of D2's returned patch into `tests/setupServer.test.ts`. **Do not revert any of it.** Run
no `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.

Two audit lanes rejected. **Neither asked for the mechanism to change**, and both confirmed the
split, the skip, the helper seam, the new contracts, the vendored import closure, and the
measurement. Do not reopen any of those.

Read `.orkestrel/scaffold/d2-audit-verdict.md` before editing. Its "Findings carried to the fix
round" table is your work list.

**A release is being prepared from this tree.** Every defect here ships to every target on the next
`repair`, which is why a one-string correction now is worth more than the same correction after a
bump, a publish, and a re-propagation.

## The findings, and what closes each

### 1. The predicate throws where the mechanism it matches returns false — HIGH, blocking

`tests/config.test.ts:80-83` calls `lstatSync(path, { throwIfNoEntry: false })`. That option
suppresses `ENOENT` alone and **rethrows `EACCES`, `EPERM`, and every other inspection error**.

`isPhysicalDirectory`, the mechanism D2's own comment claims to match, does not:

```ts
export function isPhysicalDirectory(path: string): boolean {
	const status = attempt(() => lstatSync(path))
	return status.success && status.value.isDirectory() && !status.value.isSymbolicLink()
}
```

`src/server/helpers.ts:412-414`. It returns `false` for every thrown error.

The divergence is worse than a mismatch because **the call sits at module scope**, outside any case.
A throw there is a collection error that takes the entire vendored file down in that target, rather
than failing one case. A target whose recognized `src/core` entry cannot be inspected loses its whole
`config` project.

Make the predicate return `false` for an entry it cannot inspect, matching `isPhysicalDirectory` on
every input: an absent path, a symbolic link, a junction, a broken link, and an uninspectable entry.

**The constraint that decides your mechanism.** This file is vendored into every target, and its
import closure is currently node builtins, `vite`, `oxlint/plugins-dev`, `vitest`, the two vendored
`configs/` leaves, and `./setupPolicy.js`. **Do not add an import edge unless you prove every target
carries that package.** `attempt` is not currently reachable from this file. A local `try`/`catch`
inside the anonymous callback is permitted — `AGENTS.md` § Design laws exempts an anonymous callback
passed directly as an argument from the nested-function ban.

State which mechanism you chose and why the alternatives lose.

### 2. The case name's trailing clause contradicts the case's own invariant — HIGH, blocking

`tests/config.test.ts:2178` ends:

```text
[inapplicable where the workspace publishes no source from src, which leaves no face project to read]
```

The second clause tells a reader that a missing face project is what makes the case inapplicable. It
is not. The body throws `The workspace declares no face project`, and `d2-postfix.log.txt:83-84`
proves that throw fires for a workspace holding `src/core` with no `configs/src/` wrapper.

So the vendored surface every target receives would state the opposite of the invariant this whole
campaign exists to protect: a missing face project is a **failure**, never a skip.

End the bracket at the skip's own mechanism and let the throw own the rest. The subjective lane
supplied `[inapplicable where no src environment directory exists]`. Take that or better, and keep
the repository's bracket form.

### 3. Child-process failures lost decisive diagnostics — MEDIUM

`tests/setupServer.ts:703`, `:726`, `:784`, and `:827` throw without the received `status` or the
`spawnSync` error. The assertions they replaced reported the status, including `null`, which is the
value that names a spawn that never ran. A failure can now end with empty stdout and stderr and no
explanation at all.

Carry `status` and the `error` field into each pack, install, generation, and dependency-install
failure message.

### 4. The returned environment collection is mutable — LOW

`tests/setupServer.ts:417` types `environment` as `NodeJS.ProcessEnv`. `AGENTS.md` requires interface
properties and public return collections readonly, and the sibling `manifest` property already is.

### 5. A rewritten sentence is circular and its pronouns collide

`tests/distribution.test.ts:437-439` reads: "The statement the comment sits on is the shortest run of
lines ending at it that closes every bracket it opens." The first `it` points at the thing being
defined, so the definition consumes itself; the second points at the run. The `here` this replaced
was deictic but unambiguous, so the rewrite satisfied one finding and degraded the sentence.

The subjective lane supplied: "The statement the comment sits on is the shortest run of lines ending
at the claim's own line that closes every bracket it opens, so a claim printed across several lines
is driven as the one expression it is."

### 6. A rewritten clause is ungrammatical

`tests/distribution.test.ts:553` reads `moves that set nothing`. Right: `moves nothing in that set.`

## What this unit does NOT do

- Do not rename `manifestPublishes`. The subjective lane raised it and explicitly did not require it;
  the verdict records it as not carried.
- Do not touch `tests/distribution.test.ts:841`, whose `above` predates this change.
- Do not widen the app-only proof to a browser-carrying workspace.
- Do not bump the version, and do not publish.

## Scope

**Owned files:** `tests/config.test.ts`, `tests/distribution.test.ts`, `tests/setupServer.ts`, and the
generated artifacts `npm run build` restages — `dist/`, `host.json`.

**Off-limits:** `src/`, `configs/`, `app/`, `tests/setupServer.test.ts`, `.claude/`, `.agents/`,
`ROADMAP.md`, `package.json`, and `.orkestrel/`. Read the verdict and the two lane reports; write none
of them.

Never silence a rule: no `eslint-disable`, no `oxlint-disable`, no suppression comment, no `any`, no
`as`, no non-null assertion.

Do not commit or push. Install no dependency.

## Host facts

- Windows. POSIX syntax in the Bash tool; `npm` resolves as `npm.cmd`.
- **A bare `.cmd` spawn returns `EINVAL` with a null status on this host.** Pass a shell, as
  `tests/distribution.test.ts` already records.
- Write any multi-step command to a script file and run the file. A heredoc, a `node -e`, or an `&&`
  chain trips the shell's approval classifier.
- **Editing a vendored file invalidates `host.json` until `npm run build` reruns.** Finding 2 edits
  one, so the rebuild precedes every gate that reads a generated artifact.
- `npm run test:distribution` packs, installs, and runs a full chain in a temporary workspace. Budget
  minutes.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

Ordered cheap-first. The rebuild precedes every gate that reads a generated artifact.

1. `npm run format:check` exits 0.
2. `npm run lint:check` exits 0.
3. `npm run check` exits 0.
4. **The predicate returns `false` rather than throwing for an entry that cannot be inspected.**
   Prove it with a recorded run against a real uninspectable entry, or — if this host cannot construct
   one — state that plainly, name the exact command that would settle it, and prove the mechanism
   another way you name. Do not claim a proof you did not take.
5. A workspace with a recognized source environment and no face wrapper still fails the scope case,
   and one with an unrelated `src` entry still skips it. Re-run D2's instrument and report both.
6. `npm run build` exits 0 and `dist/host/tests/config.test.ts` carries the corrected bytes, with the
   digest reported.
7. `npm run test:distribution` exits 0, with counts.
8. `npm test` exits 0, with per-project counts.
9. `git status --short` shows no path outside the owned list.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol. Stop and report where closing a finding
requires an import edge you cannot prove every target carries, or an off-limits file.

Settle these yourself and record each: the predicate's mechanism, the bracket's final wording, and
each rewritten sentence.

## Output

Write your report to `tmp/units/d3-report.md`, and make your final message the same content: done or
not done per finding and per criterion; the recorded runs with their exact commands and counts; the
mechanism you chose for finding 1 and why the alternatives lose; and anything you could not close.

No process diary.
