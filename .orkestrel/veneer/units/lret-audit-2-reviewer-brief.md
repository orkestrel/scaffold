# LEDGER-RETUNE audit round 2 — subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: whether the resolver's settings, its parent reading, its
undecided rules, and the scans are the right shape and names for the ledger; whether each proof is named for what it
proves; whether the rows that changed member read true to a consumer; and the truth and voice of the guide's ledger
prose. The objective lane runs blind beside you on GPT-6 Astra.

## Objective

Per-claim verdicts on every claim in `/home/user/scaffold/.orkestrel/veneer/units/lret-audit-2-claims.md`, with the
mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/veneer-lret/AGENTS.md`; `/home/user/scaffold/.claude/rules/{architecture,names,typescript,tests,documentation,writing,quality}.md`;
the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill
`/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape); Veneer's
`ROADMAP.md` § Tenets in the worktree; the round-1 verdict `/home/user/scaffold/.orkestrel/veneer/units/lret-audit-verdict.md`,
which names the findings this round answers, and the ruling `ledger-retune-brief-3.md` beside it. Evidence, all
read-only: the claims file and every file it names under `/home/user/scaffold/.orkestrel/veneer/units/`. The worktree
`/home/user/veneer-lret` holds round 2 committed as `23b659b` over round 1's `7952712`: read its files, never edit them.

Weigh claims 1, 4, 5, and 8:
- whether the setting names (`base`, `font`, `block`, `color`, `direction`, `root`, `viewport`), `nested`,
  `inferScopeMode`, and `extractMatchedCompound` meet `.claude/rules/names.md` and read as one vocabulary with the
  ledger's existing names;
- whether the `.col-form-label`, `display`, and `legend` rows reading `retuned` reads true to a consumer who changes
  the root font size or the window, and whether the guide says why in words the consumer can act on;
- whether the legend's `retuned` sentence and the `th` `text-align` row (F2) read as one decision;
- whether the `PROBE_SYNTAXES` removal the report describes, in place of the brief's "an input per syntax that only
  that syntax accepts", is the right shape or leaves the probe-syntax case weaker than the brief required.

Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run
nothing; use absolute paths. Your final message is the Output.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts each with `file:line` evidence and, for a
claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the
BROKEN standard; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
