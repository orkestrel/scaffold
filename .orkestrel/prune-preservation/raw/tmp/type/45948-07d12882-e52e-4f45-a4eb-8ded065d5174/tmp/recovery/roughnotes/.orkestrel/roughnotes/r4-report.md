# Unit R4 report — close the remaining banned-term sites

Transcribed by the Orchestrator from the unit's returned message; the unit's own report file was
never retained at the time, which the debrief's objective lane recorded as O1.

Unit: `builder`, Sonnet, native subagent, the roughnotes checkout. Brief: `r4-brief.md`.

## The replacements

All four placed, found by quoted text rather than by line number, one occurrence each.

| Site | Before | After |
| ---- | ------ | ----- |
| The showcase control comment | `so the comparisons above fail against it.` | `so the comparisons earlier fail against it.` |
| The Vue-count control comment | `so the same override yields the Vue plugin twice and the count above fails.` | `so the same override yields the Vue plugin twice and the count earlier fails.` |
| The invocation-refusal control comment | `so the refusal above fails against it.` | `so the refusal earlier fails against it.` |
| The `both` tally | `Both readings must fail against it.` | `The emptied-output reading and the added-dependency reading fail against it.` |

No assertion was touched; only the four comment lines changed.

## The sweeps

- `grep -inE "\babove\b|\bbelow\b" tests/conformance.test.ts` returned one further hit, in the file
  header: `Each proof below carries the untracked behaviour as its control`. It sat outside the four
  sites the brief named, so the unit left it and reported it.
- `grep -in "Both readings" tests/conformance.test.ts` returned nothing.

## Gates

- `npm run test:conformance` — `Tests 12 passed (12)`, unchanged.
- `npm run test:policy` — `Tests 111 passed (111)`.
- `npx oxfmt --config .oxfmtrc.json --check tests/conformance.test.ts` — **reported format issues.**

## The unit's deviation, and the Orchestrator's ruling on it

The unit reported the format failure and attributed it to content earlier units added to the file,
declining to fix anything outside its four scoped sites.

**The attribution was wrong.** Unit R3 had measured `oxfmt --check` green on that same file after its
own edits, so the drift came from R4's own replacements — the fourth is longer than the sentence it
replaced and pushed its comment past the wrap width. The stop was still correct: the unit refused to
edit outside its scope and reported rather than improvising.

The Orchestrator converged the formatter on the file, confirmed the diff was rewrapping alone, and
closed the header site the unit reported plus three further `below` sites the sweep found across
`tests/setup.test.ts` and `vite.config.ts`. Every changed file then swept clean and formatted clean.

## What this unit exposed about the gate

`policy/no-banned-term` reads every comment, and `.claude/rules/writing.md` bans `above` and `below`
in developer prose, but the policy table carries no row for either. All five sites passed every gate
in this session, including two adversarial audit rounds that read the offending comments verbatim
and confirmed them. Carried to the debrief as the objective lane's O4.
