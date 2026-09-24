# Writes the round-1 audit lane briefs and the Astra launcher for the named B-UTILITIES wave-3 units
# from one table, so no field is carried over from another round's files.
# Usage: python3 w3-audit-briefs.py <unit> [<unit> ...]
import pathlib, sys

U = pathlib.Path('/home/user/scaffold/.orkestrel/veneer/units')
LAW = ("`/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; "
       "the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` "
       "and its references (the verdict shape)")
FAMILY = ('`b-utilities-family.md`, `b-utilities-w3-terrain-report.md`, `b-utilities-terrain-report.md`, `w2-w3-note-1.md`, `w2-w3-note-2.md`, '
          'and the design verdict `/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md`')
PRECEDENT = ('the landed `src/styles/utilities/_display.scss` and `_position.scss`, `app/browser/sections/DisplaySection.ts` and '
             '`PositionSection.ts`, and their proofs, the precedent this unit copies')
UNITS = {
    'uf': dict(
        name='UTIL-FONT', worktree='/home/user/veneer-uf',
        evidence='`uf.diff`, `uf-status.txt`, `uf-shared.patch`, `b-utilities-uf-report.md`, `b-utilities-uf-brief.md`, `uf-instruments/` (the per-file patches, `uf-mutations.sh`, and every mutation, gate, and Tailwind probe log)',
        analyst='claims 2, 3, 4, and 5 (the cascade against the inventory and the release\'s utility map, each proof against its retained mutation log, the size classes on the heading scale, and the shared-name table against the installed compiler)',
        reviewer='claims 4 (whether dropping the fluid formula and cap is right beside the heading classes), 6 (specimen names and markup, the Type region\'s copy), and 7 (every added guide sentence against what ships, the section heading, note 1, and the writing rule)'),
    'up': dict(
        name='UTIL-PAINT', worktree='/home/user/veneer-up',
        evidence='`up.diff`, `up-status.txt`, `up-shared.patch`, `up-unscoped-profiles.patch`, `b-utilities-up-report.md`, `b-utilities-up-brief.md`, `up-instruments/` (the per-file split, the mutation instruments and logs, the negative controls, the cascade count, the Tailwind longhand and profile-layer readings, and every copy gate log)',
        analyst='claims 2, 3, 4, and 5 (the cascade against the inventory and the release\'s utility map, each proof against its retained mutation log, the profiles patch against what each profiles case asserts, and the shared-name table against the installed compiler)',
        reviewer='claims 2 (the rounded entries beside the border entries, and the guarded opacity entries), 4 (whether the profiles patch keeps each case\'s intent), 6 (specimen names, the captioned swatches, the region copy), and 7 (every added guide sentence against what ships, note 1, and the writing rule)'),
    'ue': dict(
        name='UTIL-EFFECT', worktree='/home/user/veneer-ue',
        evidence='`ue.diff`, `ue-status.txt`, `ue-shared.patch`, `b-utilities-ue-report.md`, `b-utilities-ue-brief.md`, `ue-instruments/` (`ue-mutations.sh`, `ue-mutations.log.txt`, `ue-controls.sh`, and every control, gate, cascade-key, Tailwind longhand, and journey log)',
        analyst='claims 2, 3, and 5 (the cascade against the inventory and the helper\'s priority, each proof against its retained mutation log, and the shared-name table against the installed compiler)',
        reviewer='claims 4 (the specimen rename against the region rename, and the role classes in the components layer), 6 (region and specimen names, the section copy, the journey case), and 7 (every added guide sentence against what ships, note 1, and the writing rule)'),
}
for key in sys.argv[1:]:
    u = UNITS[key]
    claims = f'{key}-audit-claims.md'
    title = f"Audit round 1 — {u['name']} (`{key}`)"
    (U / f'{key}-audit-analyst-brief.md').write_text(f"""# {title}: objective lane on GPT-6 Astra

`analyst` route on GPT-6 Astra (`gpt-6-astra`), `codex exec --sandbox read-only` rooted at `{u['worktree']}`. You are the engine behind the CLI: perform the audit directly and spawn nothing. You hold the **objective** lane over the numbered claims in `/home/user/scaffold/.orkestrel/veneer/units/{claims}`: correctness, constraints, and what the code, the logs, and the contracts permit. The unit was written by `opus` on Opus 5.5, so you are an auditor engine that did not write it; the subjective lane (`reviewer` on Opus 5.5) and the checker (Sonnet) run blind beside you. Bound: rule within 25 minutes.

Law: {LAW}. Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `{claims}`; {u['evidence']}; {FAMILY}; the worktree `{u['worktree']}` (the owned files over `2a3f223`; read them, never edit them; `git -C {u['worktree']} show 2a3f223:<path>` reads any base file; the inventory is `tests/fixtures/oracle/inventory.json`; `node_modules/bootstrap/` there is Bootstrap 5.3.8, its source under `scss/`, and `node_modules/tailwindcss/` the installed Tailwind).

Standing conditions: the sandbox runs no Vitest project and no browser, and denies the network, a loopback listener, and a nested install; `git show`, `git diff`, `git apply --check` against a scratch extract under the system temporary directory, `grep`, `sha256sum`, and `node -e` that writes nothing are allowed; rule every proof claim from the code's assertions and the retained logs, naming for each mutation whether the assertions distinguish it from the passing case, and say which log you read. Never edit the worktree. Never read `.env*`, `.npmrc`, `auth.json`, or any credential file.

Focus: {u['analyst']}; rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so.

Output: the `orkestrel-falsify` verdict shape and nothing else — numbered verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) with `file:line` (for a CONFIRMED verdict, the attack that failed; for a claim about a proof, the mutation and whether the assertions distinguish it), findings outside the claims to the `BROKEN` standard, the counts the report states listed under the last claim, and one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
""")
    (U / f'{key}-audit-reviewer-brief.md').write_text(f"""# {title}: subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, specimen and section ergonomics, guide voice, and design fit against the design verdict, the family record, and the landed UTIL-DISPLAY and UTIL-PLACEMENT precedent. The objective lane runs blind beside you on GPT-6 Astra, and the checker on Sonnet.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: {LAW}. Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `{claims}`; {u['evidence']}; {FAMILY}; the worktree `{u['worktree']}` (the owned files over `2a3f223`; read them, never edit them; `git -C {u['worktree']} show 2a3f223:<path>` reads any base file, including {PRECEDENT}; `node_modules/bootstrap/` there is Bootstrap 5.3.8). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under the last claim; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: {u['reviewer']}; rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
""")
    (U / f'{key}-audit-checker-brief.md').write_text(f"""# {title}: checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, beside the objective lane on GPT-6 Astra and the subjective lane on Opus 5.5.

## Objective

Verdicts on claims 1, 6, and 8 of the claims file by reading alone: the status and diff file lists, the patch's file set against the brief's Shared list, the registry and order agreement across files, the table placement, freezing, and derivation, and every added sentence and comment against the count law, the banned-term rows, the token-noun rule, and the temporal and cross-reference rows. Where a clause needs a command you cannot run (an apply check), rule the sub-clause UNRESOLVED and name the command; the Orchestrator takes that reading. Rule a clause only on the sites you read, and name them; a sample of compliant sites does not confirm a claim about every site.

## Context

Law: {LAW}. Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `{claims}`; {u['evidence']}; `w2-w3-note-1.md`; the worktree `{u['worktree']}` (the owned files over `2a3f223`; read them, never edit them). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for claims 1, 6, and 8 only — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each named claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
""")
    (U / f'{key}-audit-analyst.sh').write_text(f"""#!/bin/bash
# {title}, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at {u['worktree']}.
# Written by w3-audit-briefs.py. Launched through codex-queue-2.sh after a bounded probe; the cap is 1800 s (comparable objective lanes ran 7 to 12 min over retained logs, plus slack for the loaded container).
# Brief: .orkestrel/veneer/units/{key}-audit-analyst-brief.md  Claims: .orkestrel/veneer/units/{claims}  Journal: tmp/codex/{key}-audit-analyst.jsonl  Last message: tmp/codex/{key}-audit-analyst-last.md
cd /home/user/scaffold || exit 1
timeout 1800 codex exec --json -C {u['worktree']} --sandbox read-only --model gpt-6-astra -c "model_reasoning_effort=\\"high\\"" --output-last-message /home/user/scaffold/tmp/codex/{key}-audit-analyst-last.md "Your working directory is {u['worktree']}. Read and execute the brief at /home/user/scaffold/.orkestrel/veneer/units/{key}-audit-analyst-brief.md exactly. Rule on every numbered claim in /home/user/scaffold/.orkestrel/veneer/units/{claims} holding the objective lane. Make your final message the report the brief's Output section specifies, and nothing else." < /dev/null > /home/user/scaffold/tmp/codex/{key}-audit-analyst.jsonl 2> /home/user/scaffold/tmp/codex/{key}-audit-analyst.err
echo "exit=$?" >> /home/user/scaffold/tmp/codex/{key}-audit-analyst.err
""")
    print(key, 'written')
