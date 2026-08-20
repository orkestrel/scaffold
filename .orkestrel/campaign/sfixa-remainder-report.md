# SFIX-A remainder — report

Continuation unit. `AGENTS.md` § Writing and `.claude/rules/writing.md`'s numeral row were already
landed and were left untouched, per this unit's instructions.

## Files touched

- `.claude/agents/scout.md` — "You are the last step of the tedious-work ladder — Grok, then Luna
  on Codex, then you" replaced with "You sit at the end of the tedious-work ladder, after Grok and
  Luna on Codex".
- `.claude/agents/researcher.md` — same construction replaced the same way.
- `.claude/agents/checker.md` — same construction replaced the same way.
- `.claude/agents/codex.md` — "it is the second step of the tedious-work ladder" replaced with "it
  sits between Cursor Grok and Sonnet on the tedious-work ladder".
- `.agents/orchestration.md`:
  - "which is a second reason the independent `verifier` runs" → "which is another reason the
    independent `verifier` runs".
  - "An auditor's subject is the second one" → "An auditor's subject is the report" (names the item
    instead of its position among the two preceding clauses).
  - "make the measurement its first step" → "have it take the measurement before doing anything
    else" (names the relation — before every other action — instead of a step ordinal).
  - § Permission floor: cut the git-discard prohibition's trailing rationale clause "and a tree
    carrying an uncommitted unit has no other copy of it", keeping "Each discards a working-tree
    change silently" and the directive "A role that must undo its own edit undoes exactly that
    edit."
  - § Bench laws, sandbox rule (item 4): added the loopback-listener denial this campaign measured
    — `listen EPERM` on `0.0.0.0:24678` and on `127.0.0.1` inside a `workspace-write` bench sandbox,
    with the same suites exiting 0 on the host — stating the trigger (a subject needing a real local
    server is unmeasurable inside a bench) and the required action (name the limit in the brief, the
    unit reports the reading as an observation with the exact command, the Orchestrator takes the
    proof on the host). In the same clause, added the write-path denial this session measured:
    `codex exec --sandbox workspace-write` accepted edits under `.claude/` and rejected
    `.agents/orchestration.md` with "patch rejected: writing outside of the project; rejected by
    user approval settings", so a brief that assigns a bench unit a path outside the obvious source
    tree says so, and a blocked unit stops and reports rather than finding another write mechanism.
    Neither the grandchild-process nor the nested-install denial was restated.
- `.claude/agents/verifier.md`:
  - Rewrote the git-discard prohibition to match the Permission floor standard: "Never run `git
    checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. Each discards a working-tree
    change silently." (dropped "A gate run needs none of them, and a tree carrying an uncommitted
    unit has no other copy of it.", which argued for the rule rather than directing behavior).
  - Cut "It is the unit under verification, not damage to repair or report." after "Read a dirty
    `git status` as the expected state.", per the brief's explicit instruction.
- `.agents/skills/enterprise-bootstrap/references/bootstrap-reference.md`:
  - "Step 2 of 4 — Billing" replaced with a placeholder form, "Billing — step ⟨n⟩ of ⟨total⟩, where
    the wizard fills in its own runtime position and total", so the guidance keeps the pattern
    without a literal ordinal a sweep would flag.
  - "Last step: a review summary…" → "Review step: a review summary…", naming the step by its role
    rather than its position.
- `tests/src/core/templates.test.ts` — four comments restated as the relation the code asserts
  instead of a literal count, all keyed to `MODULE_EMITTERS`, `SELECTIONS`, and `buildSelections`:
  - "emits all 29 paths … 125 of the 126 could emit nothing" → "emits every path `MODULE_EMITTERS`
    names … every blueprint but that one could emit nothing".
  - "each of the 63 non-empty `src` x `app` pairs" → "each non-empty `src` x `app` pair drawn from
    `SELECTIONS`".
  - "2015 of them over 126 blueprints" → "the sum `MODULE_EMITTERS` totals, over every blueprint
    `buildSelections` returns".
  - "the pairs all 126 blueprints emit … a corpus missing 30 blueprints" → "the pairs every
    blueprint `buildSelections` returns emits … a corpus missing every blueprint the filter below
    excludes".

## Positional references left standing, with judgment

- `.agents/skills/enterprise-bootstrap/SKILL.md` lines 108, 109, 111, 178, 179 — the Bootstrap
  styling ladder's `rung 1`–`rung 4`. Left standing: the rung number is the tier's identity, used
  throughout the skill and its references (`components.md` line 426, "a rung-4 decision") as a fixed
  name for one of four ranked escalation tiers, not a reference to that tier's position in a
  document list. Renaming "rung 4" to a descriptive phrase everywhere it appears would need a new
  vocabulary for a concept the skill already names consistently, and the brief's own carve-out for
  "an ordered procedure whose rank is what the reader needs" covers it. `components.md`'s single
  "rung-4" occurrence was left for the same reason and was not separately edited.

`.claude/rules/quality.md`'s round value was not touched, as instructed — it is an explicit budget,
not a count.

## Rationale clauses kept, with the judgment call each changes

- `.agents/orchestration.md` § Permission floor and `.claude/agents/verifier.md`: kept "Each
  discards a working-tree change silently" at both sites. It names an observable property — the
  command warns nobody — that an agent cannot infer from the command's name alone, so removing it
  would let an agent reason its way to treating a discard as safe in some case.
- `.claude/agents/verifier.md`: kept "A role that must undo its own edit undoes exactly that edit"
  in `.agents/orchestration.md`'s sibling clause (not present verbatim in `verifier.md`, so no
  parallel clause existed there to cut or keep).

## Bench-laws text added

Landed in § Bench laws, sandbox rule (item 4), as one subordinate block after the existing
false-green paragraph and before item 5:

> The sandbox also denies a loopback listener: a unit running a browser and a server test project
> inside a `workspace-write` bench sandbox got `listen EPERM: operation not permitted` on
> `0.0.0.0:24678` and on `127.0.0.1`, and neither project could collect at all, while the same
> suites exited 0 on the host. A subject needing a real local server is therefore unmeasurable
> inside a bench: name the limit in the brief before dispatch, have the unit report the reading as
> an observation naming the exact command, and take that proof yourself on the host. A bench sandbox
> also refuses to write some paths a brief legitimately owns — measured here, `codex exec --sandbox
> workspace-write` accepted edits under `.claude/` and rejected `.agents/orchestration.md` with
> "patch rejected: writing outside of the project; rejected by user approval settings" — so a brief
> that assigns a bench unit a path outside the obvious source tree says so, and a unit blocked that
> way stops and reports rather than finding another write mechanism.

## Acceptance criteria

1. `rg -n 'rule 4|the third row|the fifth kind' AGENTS.md` — exit `1` (no hit). Already-landed text
   was verified by reading, not edited.
2. `rg -n -i 'step of the tedious-work ladder|rung [0-9]|rungs [0-9]|Step [0-9] of [0-9]' .claude/ .agents/`
   — exit `0`, with the surviving hits being exactly the `enterprise-bootstrap/SKILL.md` rung sites
   named above, judged and left standing.
3. `.agents/orchestration.md` § Bench laws states the loopback-listener denial — confirmed present
   at the location quoted above.
4. `npm run lint:check` — exit `0`.
5. `npm run check` — exit `0` (root `tsc` plus `check:src:core`, `check:src:server`,
   `check:src:bin`, all clean).
6. `npx vitest run --config vite.config.ts --project src:core tests/src/core/templates.test.ts` —
   exit `0`. 1 test file passed, 15 tests passed.
7. `npx vitest run --config vite.config.ts --project guides` — exit `0`. 1 test file passed, 7 tests
   passed.

## Not closed

Nothing in this unit's scope was left open.
