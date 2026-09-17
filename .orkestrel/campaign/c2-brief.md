# Unit C2 — fix the charters the campaign's deviations trace to

## Role and engine

`opus` — Opus 5, native Claude subagent, the **scaffold** checkout at
`C:\Users\mikes\WebstormProjects\scaffold`, sole serial writer. Unit C1 has exited; its work is in
the working tree uncommitted and is not yours to revert.

## Objective

Land four charter findings from the instruction-set audit. Each traces to a deviation this campaign
actually produced. Every roster or contract change lands on **both** provider surfaces in the same
round — an unmirrored refinement is drift seeded on purpose.

## The voice law

`AGENTS.md` § Instruction files. Every line is a directive: what to do, what to check, what to
refuse. No clause written to persuade or explain to a person. No count of a growable set.

## Finding O2 + F3 — read-only roles are told to produce files

`.claude/agents/reviewer.md` and `.claude/agents/checker.md` each say "You are read-only: you never
edit." That reads as a statement about the subject tree, not about the lane's own report file. Both
also carry a clause about reconstructing evidence "with a shell", which neither role holds.

This campaign broke it twice in one round. From `.orkestrel/scaffold/s1-audit-verdict.md`:

```text
- **Two briefs named a report path their executor's allowlist cannot write.** The `reviewer` and
  `checker` roles carry no write tool. Both reports were transcribed by the Orchestrator instead.
- **The checker brief assigned a Vitest run to a role with no shell.**
```

**The change.** Replace the read-only sentence in both charters with:

```text
You are read-only. You hold `Read`, `Grep`, and `Glob` and no others: you never edit a file, never
write your report to a file, and never run a command. Your final message IS the verdict. A dispatch
that names a report path for you, or assigns you a command, is a dispatch defect — return the
verdict as your final message and name the defect in it.
```

Delete the "reconstructing it with a shell" clause from both, which describes a tool neither has.
Mirror the same sentence into `.codex/agents/reviewer.toml` and `.codex/agents/checker.toml`.

Then sweep every other read-only charter — `scout`, `researcher`, `orkestrel`, `planner`, and the
new `distiller` — and give each the same return-channel sentence adapted to its own return shape.
`distiller` already carries it; match its wording rather than inventing a second phrasing.

Separately, the Codex bridge drivers `planner.toml` and `reviewer.toml` are told to write briefs and
journals while pinned read-only. Their binding transport contract requires those writes. Resolve it:
a read-only driver returns the brief text, its intended path, the resolved command, and the journal
paths, and the Orchestrator writes and launches. State that in each driver and in
`.agents/transports/claude.md` where it currently requires the driver to write.

## Finding F4 — the lane-swap clause names only bench darkness

`.claude/agents/reviewer.md` and `.claude/agents/planner.md` authorize holding the other lane "when
the Sol bench is dark". Round four of this campaign swapped lanes with the bench **live**, because
Sol wrote the work under audit, and recorded it as an engine substitution. An executor reading the
charter would find its dispatch unauthorized.

**The change.** Replace the swap clause in both with:

```text
You hold the **subjective** lane by default. The dispatch may assign you the **objective** lane
instead — correctness, constraints, and what the code and contracts actually permit — whenever the
round needs an engine that is not the one running that lane, including when the Sol bench is dark
and when Sol wrote the work under audit. Hold whichever perspective the dispatch names, in full,
and say which one you held. Do not drift back to design fit because it is your usual lane.
```

Mirror the inverse into `.codex/agents/analyst.toml`. Add the writer-engine trigger to
`.agents/orchestration.md` § Engine assignment, whose table is headed "Engine unavailable" and names
no other cause.

## Finding F11 — the Codex verifier lacks the dirty-tree clause

`.claude/agents/verifier.md` carries a § Never discard a working-tree change section including "Read
a dirty `git status` as the expected state." `.codex/agents/verifier.toml` carries neither line and
is pinned `workspace-write`.

Every gate run in this campaign ran over an uncommitted tree, and a Sol-side unit reported the
condition as an anomaly it had to rule on.

**The change.** Append to the Codex verifier's instructions:

```text
Follow .agents/orchestration.md § Permission floor for the discarding git commands. Read a dirty
git status as the expected state.
```

## Finding O6 — charters and the contract disagree about when to stop

`.claude/agents/builder.md`, `.codex/agents/application.toml`, and `.codex/agents/sol.toml`
prescribe unconditional stopping on any conflict. `.agents/orchestration.md` § Required sections
authorizes the executor to resolve an ancillary conflict, record it, and carry on. Units in this
campaign followed the contract and contradicted their charters.

**The change.** Fix the canonical wording in `.agents/orchestration.md` § Deviation protocol:

```text
Stop when a conflict prevents the primary objective or requires an unowned change. Resolve an
ancillary choice within the owned scope, record the choice, and continue.
```

Then replace the charter copies and the required-section restatement with a reference:

```text
Follow `.agents/orchestration.md` § Deviation protocol.
```

Sweep every charter on both surfaces for a restated deviation rule and reduce each to the reference.
The root stays the single owner.

## Scope

**Owned files:** `.claude/agents/`, `.codex/agents/`, `.agents/transports/claude.md`, and
`.agents/orchestration.md` § Engine assignment and § Deviation protocol only.

**Off-limits:** `.agents/skills/` — a later unit owns those; `src/`, `configs/`, `guides/`, `dist/`,
`package.json`, `.orkestrel/`; `host.json` by hand; the roughnotes and test checkouts.

Do not bump a version and do not publish. Do not commit or push. Run no `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

1. Every read-only charter on both surfaces states its return channel in the same words, and none
   describes a tool it does not hold.
2. A sweep for `with a shell` across the charter directories returns nothing.
3. The swap clause on both surfaces names the writer-engine trigger, and § Engine assignment names
   it too.
4. The Codex verifier carries the dirty-tree clause.
5. No charter restates the deviation rule; each references it. A sweep for `stop and report` across
   the charter directories returns only references or role-specific stop conditions you name.
6. `npm run format:check` and `npm run lint:check` are clean.
7. `npm run build` succeeds; `host.json` changes, which is expected. Report the delta and confirm
   every entry traces to a file you touched.
8. `npm test` exits 0 and `npm run test:distribution` exits 0. Report both.
9. `git status --short` names your owned files, `host.json`, and the files unit C1 left modified.
   Name which are C1's rather than claiming them.

## Deviation contract

A conflict with the objective stops you: report expected, found, exact evidence, done or not done.
If a charter's stop condition is genuinely role-specific rather than a restatement, keep it and say
why in your report.

## Output

Write your report to `tmp/units/c2-report.md`, and make your final message the same content: done or
not done per criterion; each charter changed with its before and after; the sweeps; the gates; and
what you did not close.

No process diary.
