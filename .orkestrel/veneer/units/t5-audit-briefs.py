# Writes the round-1 audit lane briefs and the Astra launcher for T5 TEST-FRAME (`t5`) in the Test checkout,
# derived from pb-audit-briefs.py with every Veneer-only field rewritten for /home/user/test-tf over 80c419e.
# Usage: python3 t5-audit-briefs.py t5
import pathlib, sys

U = pathlib.Path('/home/user/scaffold/.orkestrel/veneer/units')
UNITS = {
    't5': dict(
        name='T5 TEST-FRAME', worktree='/home/user/test-tf', base='80c419e',
        law=("`/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,browser,names,typescript,architecture,patterns,documentation,writing,quality}.md`; "
             "the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape)"),
        family='the brief `t5-test-frame-brief.md` and the PAGE-FRAME design verdict `pf-design-verdict.md` (R9, and the bottom-offcanvas evidence at its head)',
        precedent='the base `captureFrame`, `readFrame`, `measureContent`, `stagePane`, and `releasePane` functions in `src/browser/helpers.ts` and the base `guides/test.md` capture paragraphs',
        evidence='`t5.diff`, `t5-status.txt`, and `t5-test-frame-report.md` (its unknowns, proofs, mutations, and gate table)',
        subject='the lift and compositing mechanism in the runner page, the element-frame staging, the sized refusal, the proofs\' shape, and the TSDoc and guide prose',
        analyst='claims 2, 3, 4, 5, 6, and 7 (the loop against the base loop, the lift\'s selector and removal on every path against the installed runner, the hand-back, the header read, and each proof against its mutation)',
        reviewer='claims 3 (whether writing a rule into the runner page is the right mechanism, and its reliance on the runner\'s frame attribute), 4 (the hand-back), 7, and 8 (every changed TSDoc and guide sentence against what ships, and the writing rule)',
        checker='claims 1 and 8'),
}
for key in sys.argv[1:]:
    u = UNITS[key]
    claims = f'{key}-audit-claims.md'
    title = f"Audit round 1 — {u['name']} (`{key}`)"
    (U / f'{key}-audit-analyst-brief.md').write_text(f"""# {title}: objective lane on GPT-6 Astra

`analyst` route on GPT-6 Astra (`gpt-6-astra`), `codex exec --sandbox read-only` rooted at `{u['worktree']}`. You are the engine behind the CLI: perform the audit directly and spawn nothing. You hold the **objective** lane over the numbered claims in `/home/user/scaffold/.orkestrel/veneer/units/{claims}`: correctness, constraints, and what the code, the logs, and the contracts permit. The unit was written by `opus` on Opus 5.5, so you are an auditor engine that did not write it; the subjective lane (`reviewer` on Opus 5.5) and the checker (Sonnet) run blind beside you. Bound: rule within 25 minutes.

Law: {u['law']}. Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `{claims}`; {u['evidence']}; {u['family']}; the worktree `{u['worktree']}` (the owned files over `{u['base']}`; read them, never edit them; `git -C {u['worktree']} show {u['base']}:<path>` reads any base file; `node_modules/@vitest/browser/dist/` and `node_modules/playwright-core/lib/` there are the installed runner and provider the claims name).

Standing conditions: the sandbox runs no Vitest project and no browser, and denies the network, a loopback listener, and a nested install; `git show`, `git diff`, `git apply --check` against a scratch extract under the system temporary directory, `grep`, `sha256sum`, and `node -e` that writes nothing are allowed; rule every proof claim from the code's assertions and the retained logs, naming for each mutation whether the assertions distinguish it from the passing case, and say which log you read. Never edit the worktree. Never read `.env*`, `.npmrc`, `auth.json`, or any credential file.

Focus: {u['analyst']}; rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so.

Output: the `orkestrel-falsify` verdict shape and nothing else — numbered verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) with `file:line` (for a CONFIRMED verdict, the attack that failed; for a claim about a proof, the mutation and whether the assertions distinguish it), findings outside the claims to the `BROKEN` standard, the counts the report states listed under the last claim, and one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
""")
    (U / f'{key}-audit-reviewer-brief.md').write_text(f"""# {title}: subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, {u['subject']}, guide voice, and design fit. The objective lane runs blind beside you on GPT-6 Astra, and the checker on Sonnet.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: {u['law']}. Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `{claims}`; {u['evidence']}; {u['family']}; the worktree `{u['worktree']}` (the owned files over `{u['base']}`; read them, never edit them; `git -C {u['worktree']} show {u['base']}:<path>` reads any base file, including {u['precedent']}; `node_modules/@vitest/browser/dist/` there is the installed runner). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

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

Verdicts on {u.get('checker', 'claims 1, 6, and 8')} of the claims file by reading alone: the status and diff file lists, the report's gate table against its own logs, and every added sentence and comment against the count law, the banned-term rows, the token-noun rule, and the temporal and cross-reference rows. Where a clause needs a command you cannot run (an apply check), rule the sub-clause UNRESOLVED and name the command; the Orchestrator takes that reading. Rule a clause only on the sites you read, and name them; a sample of compliant sites does not confirm a claim about every site.

## Context

Law: {u['law']}. Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `{claims}`; {u['evidence']}; `w2-w3-note-1.md`; the worktree `{u['worktree']}` (the owned files over `{u['base']}`; read them, never edit them). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for {u.get('checker', 'claims 1, 6, and 8')} only — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each named claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
""")
    (U / f'{key}-audit-analyst.sh').write_text(f"""#!/bin/bash
# {title}, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at {u['worktree']}.
# Written by pb-audit-briefs.py. Launched through codex-queue-2.sh after a bounded probe; the cap is 1800 s (comparable objective lanes ran 7 to 12 min over retained logs, plus slack for the loaded container).
# Brief: .orkestrel/veneer/units/{key}-audit-analyst-brief.md  Claims: .orkestrel/veneer/units/{claims}  Journal: tmp/codex/{key}-audit-analyst.jsonl  Last message: tmp/codex/{key}-audit-analyst-last.md
cd /home/user/scaffold || exit 1
timeout 1800 codex exec --json -C {u['worktree']} --sandbox read-only --model gpt-6-astra -c "model_reasoning_effort=\\"high\\"" --output-last-message /home/user/scaffold/tmp/codex/{key}-audit-analyst-last.md "Your working directory is {u['worktree']}. Read and execute the brief at /home/user/scaffold/.orkestrel/veneer/units/{key}-audit-analyst-brief.md exactly. Rule on every numbered claim in /home/user/scaffold/.orkestrel/veneer/units/{claims} holding the objective lane. Make your final message the report the brief's Output section specifies, and nothing else." < /dev/null > /home/user/scaffold/tmp/codex/{key}-audit-analyst.jsonl 2> /home/user/scaffold/tmp/codex/{key}-audit-analyst.err
echo "exit=$?" >> /home/user/scaffold/tmp/codex/{key}-audit-analyst.err
""")
    print(key, 'written')
