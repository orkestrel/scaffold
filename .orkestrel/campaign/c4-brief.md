# Unit C4 — the skill and rule findings

## Role and engine

`opus` — Opus 5, native Claude subagent, the **scaffold** checkout at
`C:\Users\mikes\WebstormProjects\scaffold`, sole serial writer. Units C1, C2, and C3 have exited;
their work is uncommitted in the tree and is not yours to revert or claim.

## Objective

Land the remaining instruction-set findings. This is the last refinement unit.

## The voice law

`AGENTS.md` § Instruction files. Every line is a directive. No clause written to persuade or explain
to a person. No count of a growable set. Give a rule one home.

## Finding O4 — a prose rule with no instrument, and five violations that proved it

`.claude/rules/writing.md` § Code tokens bans `above` and `below` in developer prose. The policy
table registers neither, so `policy/no-banned-term` cannot see them.

Five violations shipped through this campaign's gates and through two adversarial audit rounds whose
lanes read the offending comments verbatim and confirmed them. They were found by a sweep during the
debrief, not by any instrument.

**The change.** Add the law to `.claude/rules/writing.md`:

```text
- Register each lexical prohibition in the substitution table. Where its application depends on the
  sense rather than the match, register it in the judged set and rule each hit.
```

Then register `above` and `below` themselves. Read how `POLICY_BANNED_TERMS` and
`POLICY_JUDGED_TERMS` are declared in `tests/setupPolicy.ts` and place them in whichever set is
correct — both words carry a permitted spatial sense, which is what the judged set exists for.
`tests/setupPolicy.ts` is this repository's canon copy of a file it vendors, so editing it here is
correct and moves the vendored surface.

Run the policy suite and report what the new registration catches across the repository's own
authored Markdown. If it catches existing prose, fix each hit in the same unit or name it and say
why it stands.

## Finding O5 — skill validation proves a file exists and never proves an API does

The journey skill named `pressKeys` in several references for an unknown period. `@orkestrel/test`
exports no such verb; the skill had copied a docblock sentence and mis-rendered `userEvent.keyboard`
as a helper name. The skill policy checks cover files, frontmatter, references, and bridges, and none
of them reads an instructed API.

**The change.** Add to `.claude/rules/documentation.md` § Workflow skills:

```text
- Verify each API a skill instructs an executor to call against the installed package's public entry
  before landing the instruction, and name the entry you read. A skill that names a symbol its
  package does not export teaches an executor to write a dangling import.
```

## Finding O3 — the falsify skill contradicts itself about execution

`.agents/skills/orkestrel-falsify/references/brief.md` states that an audit lane "writes nothing and
runs nothing". Its parent `SKILL.md` requires auditors to run attacks, and later distinguishes lanes
that cannot execute. A filesystem sandbox and a tool allowlist are different constraints: a
read-only Codex sandbox runs read-only commands, and a Claude lane with no `Bash` runs none.

This campaign hit both sides. A checker brief assigned a Vitest run to a role with no shell. An
objective lane on the bench ran read-only compiler checks successfully, and a different bench run hit
`EPERM … mkdir …\ssr` before collecting tests.

**The change.** Replace the "writes nothing and runs nothing" sentence with:

```text
Derive a lane's executable actions from its tool allowlist and its sandbox. A read-only filesystem
does not forbid a nonmutating command, and a lane with no shell runs none. Where an attack needs a
tool the lane lacks or a write its sandbox refuses, obtain an independently executed record with its
control before ruling on the claim.
```

Read `SKILL.md`'s own execution wording and make the two agree. Where the parent already states the
rule correctly, the reference points at it rather than restating it.

## Finding F9 — one skill in the family has no stated end

Every `orkestrel-` skill closes with an acceptance section except
`.agents/skills/orkestrel-build-application/SKILL.md`, which ends on a list of things not to add. A
sweep of the roughnotes campaign folder finds that skill named nowhere, across a campaign that
redesigned a fifteen-route application.

**The change.** Add a closing section matching the family's form:

```text
## Accept the result

Accept when every selected environment's `types.ts` is implemented and mirrored in tests, the
boundary layers report clean, the real-host proofs ran and are recorded with their counts, guide
parity is green, and the gate chain is green from an independent `verifier`. A remaining
environment, an unproved host, or an open parity row means the run is not finished.
```

Read the skill's own step numbering first and name its boundary layers and host proofs by the terms
that skill already uses, rather than the generic ones here.

Then state the skill's boundary in its frontmatter `description`: wiring an environment, not
redesigning the product inside one. A campaign that redesigns an application should not read this
skill and find no step that fits.

## Finding F10 — a skill records campaign history as a rule

`.agents/skills/orkestrel-debrief/references/instruction-audit.md` § Refinement classes ends its
role bullet with: "Record the lesson of the reversed retirement: a role that was 'mechanically
identical' by frontmatter still carried a distinct context bundle worth keeping."

`AGENTS.md` § Instruction files bars exactly this: state the finding as the rule, never how it was
found or what was tried first. An executor mid-round has no reversed retirement to record, and the
rule it stands for is already in the two sentences preceding it.

**The change.** Cut the final sentence, ending the bullet at "retire only when the job itself is not
distinct." Spell `reference-binding` in lower case in the same bullet; the file's other emphasis caps
mark a word the reader must not skim, and this one marks nothing.

## Finding Field-2 — a field pass showed the acceptance tier resuming a prior verdict

Three models were given one goal-only prompt over an application whose checkout carries a retained
readiness verdict. The frontier tier ruled the verdict stale and re-derived against the tip. The mid
tier wrote, unprompted, that a prior campaign's report is evidence rather than acceptance. The
acceptance tier reproduced the verdict's finding list as its own plan.

The ladder's acceptance tier is the one that must walk the surface unaided, and the surface does not
state how to treat a retained verdict.

**The change.** Add to `.agents/skills/orkestrel-prove-journey/SKILL.md`, in the section that opens
the run:

```text
- Treat a retained readiness verdict as evidence to re-verify against the current tip, never as a
  plan to resume. Re-take every ruling it records that this run's acceptance depends on, and name
  the commit each ruling was taken at.
```

## Scope

**Owned files:**

- `.claude/rules/writing.md`, `.claude/rules/documentation.md`
- `tests/setupPolicy.ts`
- `.agents/skills/orkestrel-falsify/SKILL.md` and `references/brief.md`
- `.agents/skills/orkestrel-build-application/SKILL.md`
- `.agents/skills/orkestrel-debrief/references/instruction-audit.md`
- `.agents/skills/orkestrel-prove-journey/SKILL.md`
- any authored Markdown the new policy registration catches

**Off-limits:** `.agents/orchestration.md`, `AGENTS.md`, `CLAUDE.md`, `.claude/agents/`,
`.codex/agents/`, `.agents/transports/` — earlier units own them; `src/`, `configs/`, `guides/`,
`dist/`, `package.json`, `.orkestrel/`; `host.json` by hand; the roughnotes and test checkouts.

Do not bump a version and do not publish. Do not commit or push. Run no `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

1. The lexical-registration law exists in the writing rule, and `above` and `below` are registered in
   the correct set with the reason stated.
2. `npm run test:policy` passes, and you report what the new registration catches and what you did
   about each hit.
3. The API-verification law exists in the documentation rule.
4. The falsify skill and its brief reference agree about execution, and neither restates the other.
5. `orkestrel-build-application` carries an acceptance section using its own vocabulary, and its
   description states its boundary.
6. The instruction-audit bullet carries no campaign history.
7. The journey skill states how to treat a retained verdict.
8. `npm run format:check` and `npm run lint:check` are clean.
9. `npm run build` succeeds; report the `host.json` delta and trace every entry.
10. `npm test` exits 0 and `npm run test:distribution` exits 0.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol as it now stands — unit C2 rewrote it and
unit C3 amended its neighbours. The ancillary choices you settle yourself: where a new law sits
within its rule file, and which heading a new section takes.

## Output

Write your report to `tmp/units/c4-report.md`, and make your final message the same content: done or
not done per criterion; each change's before and after; what the policy registration caught; the
gates; and what you did not close.

No process diary.
