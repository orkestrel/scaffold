# Writes the audit lane briefs and the Astra launchers for MODAL round 1 (md), TIP round 1 (tp), and
# TOAST round 2 (to-2) from one table, so no field is carried over from another round's files.
import pathlib, sys

U = pathlib.Path('/home/user/scaffold/.orkestrel/veneer/units')
LAW = ("`/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; "
       "the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` "
       "and its references (the verdict shape)")
DESIGN = '`/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md` (M1 to M20, § Family record)'
UNITS = {
    'md': dict(
        title='Audit round 1 — MODAL (`md`)', worktree='/home/user/veneer-md', claims='md-audit-claims.md',
        evidence='`md.diff`, `md-status.txt`, `md-shared.patch`, `b-modal-md-report.md`, `b-modal-md-brief.md`, `md-instruments/` (the failing-first, mutation, and gate logs), `b-modal-w2-terrain-report.md`, `b-modal-terrain-report.md`, and `w2-w3-note-1.md`',
        source='`node_modules/bootstrap/js/src/modal.js` and its `util/` imports',
        precedent='the landed `src/styles/components/_alert.scss`, `_carousel.scss`, and `_accordion.scss`, `app/browser/sections/AlertSection.ts` and `CarouselSection.ts`, and their proofs',
        analyst='claims 2, 3, 4, and 7 (the partial against the inventory, each proof against its retained mutation log, the mixin block and the close move, and the plugin row against the release source)',
        reviewer='claims 2 (whether writing the fullscreen rule set twice is the right shape, or which shape writes it once), 5 (specimen names, the `d-block` stand-in, the section ergonomics against the landed sections), and 7 (every added guide sentence against what ships, note 1, and the writing rule)',
        checker=[1, 6, 8], author='`opus` on Opus 5.5', lanes='analyst reviewer checker'),
    'tp': dict(
        title='Audit round 1 — TIP (`tp`)', worktree='/home/user/veneer-tp', claims='tp-audit-claims.md',
        evidence='`tp.diff`, `tp-status.txt`, `tp-shared.patch`, `b-modal-tp-report.md`, `b-modal-tp-brief.md`, `tp-instruments/` (the failing-first, mutation, and gate logs), `b-modal-w2-terrain-report.md`, `b-modal-terrain-report.md`, and `w2-w3-note-1.md`',
        source='`node_modules/bootstrap/js/src/tooltip.js`, `popover.js`, and their `util/` imports',
        precedent='the landed `src/styles/components/_alert.scss`, `_carousel.scss`, and `_dropdown.scss`, `app/browser/sections/AlertSection.ts` and `CarouselSection.ts`, the existing mixins in `src/styles/_mixins.scss`, and their proofs',
        analyst='claims 2, 3, 4, and 7 (the partials against the inventory and the minifier rewrites, each proof against its retained mutation log and the unexecuted T-box and P-box mutations, the `reset-text` mixin against the release source, and the plugin rows against the release source)',
        reviewer='claims 4 (the `reset-text` name and shape against the existing mixins, and the dropped `left` fallback), 5 (specimen names, the stand-ins, the `h2` headers, the empty-header decline under M2), and 7 (every added guide sentence against what ships, note 1, and the writing rule)',
        checker=[1, 6, 8], author='`opus` on Opus 5.5', lanes='analyst reviewer checker'),
    'to-2': dict(
        title='Audit round 2 — TOAST (`to`)', worktree='/home/user/veneer-to', claims='to-audit-2-claims.md',
        evidence='`to-2.diff`, `to-2-status.txt`, `to-shared-2.patch`, `b-modal-to-report-2.md`, `b-modal-to-brief-2.md`, `to-instruments/` (the round-2 mutation log `to-mutations-2.log.txt`, `to-mutate-2.py`, and the `to-gate-2-*.log.txt` logs), round 1\'s `to.diff`, `to-shared.patch`, and `b-modal-to-report.md`, the round-1 verdict `to-audit-verdict.md` and its lane verdicts, and `w2-w3-note-1.md`',
        source='`node_modules/bootstrap/js/src/toast.js`',
        precedent=None,
        analyst='claims 1, 3, 5, 6, and 7 (the patch delta against round 1, the plugin row against the release source, each derivation and binding against its retained mutation runs, and the round-1 confirmations on round 2\'s files)',
        reviewer=None,
        checker=[1, 2, 4, 8], author='`opus` on Opus 5.5', lanes='analyst checker'),
    'oc': dict(
        title='Audit round 1 — OFFCANVAS (`oc`)', worktree='/home/user/veneer-oc', claims='oc-audit-claims.md',
        evidence='`oc.diff`, `oc-status.txt`, `oc-shared.patch`, `b-modal-oc-report.md`, `b-modal-oc-brief.md`, `oc-instruments/` (the mutation, gate, cascade, Tailwind, first-run, and journey logs and the instrument copies), `b-modal-w2-terrain-report.md`, `b-modal-terrain-report.md`, `w2-w3-note-1.md`, and `w2-w3-note-2.md`',
        source='`node_modules/bootstrap/js/src/offcanvas.js` and its `util/` imports',
        precedent='the landed `src/styles/components/_navbar.scss`, `_alert.scss`, and `_carousel.scss`, `app/browser/sections/NavbarSection.ts` and `AlertSection.ts`, the landed `tests/conformance.test.ts` priority case, and their proofs',
        analyst='claims 2, 4, 5, and 8 (the partial against the inventory, the priority gate refinement against every priority mutation it must still catch, each proof against its retained mutation log, and the plugin row against the release source)',
        reviewer='claims 3 (the two emission sites against MODAL\'s fullscreen shape, and whether a shared mixin should retire both), 4 (whether the gate refinement belongs in this unit), 6 (specimen names, the navbar specimen, the section ergonomics), and 8 (every added guide sentence against what ships, note 1, and the writing rule)',
        checker=[1, 7, 9], author='`opus` on Opus 5.5', lanes='analyst reviewer checker'),
}
for key, u in UNITS.items():
    if sys.argv[1:] and key not in sys.argv[1:]:
        continue
    lanes = u['lanes'].split()
    others = {'analyst': 'the subjective lane (`reviewer` on Opus 5.5) and the checker (Sonnet) run blind beside you' if 'reviewer' in lanes else 'the checker (Sonnet) runs blind beside you; the subjective lane is not run this round, as the round-1 verdict records'}
    (U / f'{key}-audit-analyst-brief.md').write_text(f"""# {u['title']}: objective lane on GPT-6 Astra

`analyst` route on GPT-6 Astra (`gpt-6-astra`), `codex exec --sandbox read-only` rooted at `{u['worktree']}`. You are the engine behind the CLI: perform the audit directly and spawn nothing. You hold the **objective** lane over the numbered claims in `/home/user/scaffold/.orkestrel/veneer/units/{u['claims']}`: correctness, constraints, and what the code, the logs, and the contracts permit. The unit was written by {u['author']}, so you are an auditor engine that did not write it; {others['analyst']}. Bound: rule within 25 minutes.

Law: {LAW}. Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `{u['claims']}`; {u['evidence']}; the design verdict {DESIGN}; the worktree `{u['worktree']}` (the owned files over `2a3f223`; read them, never edit them; `git -C {u['worktree']} show 2a3f223:<path>` reads any base file; the inventory is `tests/fixtures/oracle/inventory.json`; `node_modules/bootstrap/` there is Bootstrap 5.3.8, its source under `scss/` and {u['source']}).

Standing conditions: the sandbox runs no Vitest project and no browser, and denies the network, a loopback listener, and a nested install; `git show`, `git diff`, `git apply --check` against a scratch extract under the system temporary directory, `grep`, `sha256sum`, and `node -e` that writes nothing are allowed; rule every proof claim from the code's assertions and the retained logs, naming for each mutation whether the assertions distinguish it from the passing case, and say which log you read. Never edit the worktree. Never read `.env*`, `.npmrc`, `auth.json`, or any credential file.

Focus: {u['analyst']}; rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so.

Output: the `orkestrel-falsify` verdict shape and nothing else — numbered verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) with `file:line` (for a CONFIRMED verdict, the attack that failed; for a claim about a proof, the mutation and whether the assertions distinguish it), findings outside the claims to the `BROKEN` standard, the counts the report states listed under the last claim, and one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
""")
    if u['reviewer']:
        (U / f'{key}-audit-reviewer-brief.md').write_text(f"""# {u['title']}: subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, specimen and section ergonomics, guide voice, and design fit against the design verdict and the landed B-MODAL wave-1 precedent. The objective lane runs blind beside you on GPT-6 Astra, and the checker on Sonnet.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: {LAW}. Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `{u['claims']}`; {u['evidence']}; the design verdict {DESIGN}; the worktree `{u['worktree']}` (the owned files over `2a3f223`; read them, never edit them; `git -C {u['worktree']} show 2a3f223:<path>` reads any base file, including {u['precedent']}, the precedent this unit copies; `node_modules/bootstrap/` there is Bootstrap 5.3.8). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under the last claim; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: {u['reviewer']}; rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
""")
    nums = u['checker']
    named = ', '.join(str(n) for n in nums[:-1]) + f', and {nums[-1]}'
    (U / f'{key}-audit-checker-brief.md').write_text(f"""# {u['title']}: checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, beside the objective lane on GPT-6 Astra{' and the subjective lane on Opus 5.5' if u['reviewer'] else ''}.

## Objective

Verdicts on claims {named} of the claims file by reading alone: the status and diff file lists, the patch's file set against the brief's Shared list and the Orchestrator's grants, every clause each named claim states that a reading can settle, and every added or changed sentence and comment against the count law, the banned-term rows, the token-noun rule, and the temporal and cross-reference rows. Where a clause needs a command you cannot run (an apply check), rule the sub-clause UNRESOLVED and name the command; the Orchestrator takes that reading. Rule a clause only on the sites you read, and name them; a sample of compliant sites does not confirm a claim about every site.

## Context

Law: {LAW}. Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `{u['claims']}`; {u['evidence']}; the worktree `{u['worktree']}` (the owned files over `2a3f223`; read them, never edit them). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for claims {named} only — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each named claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
""")
    launcher = f"""#!/bin/bash
# {u['title']}, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at {u['worktree']}.
# Written by w2-audit-briefs.py. Launched through codex-queue-2.sh after a bounded probe; the cap is 1800 s (comparable objective lanes ran 7 to 12 min over retained logs, plus slack for the loaded container).
# Brief: .orkestrel/veneer/units/{key}-audit-analyst-brief.md  Claims: .orkestrel/veneer/units/{u['claims']}  Journal: tmp/codex/{key}-audit-analyst.jsonl  Last message: tmp/codex/{key}-audit-analyst-last.md
cd /home/user/scaffold || exit 1
timeout 1800 codex exec --json -C {u['worktree']} --sandbox read-only --model gpt-6-astra -c "model_reasoning_effort=\\"high\\"" --output-last-message /home/user/scaffold/tmp/codex/{key}-audit-analyst-last.md "Your working directory is {u['worktree']}. Read and execute the brief at /home/user/scaffold/.orkestrel/veneer/units/{key}-audit-analyst-brief.md exactly. Rule on every numbered claim in /home/user/scaffold/.orkestrel/veneer/units/{u['claims']} holding the objective lane. Make your final message the report the brief's Output section specifies, and nothing else." < /dev/null > /home/user/scaffold/tmp/codex/{key}-audit-analyst.jsonl 2> /home/user/scaffold/tmp/codex/{key}-audit-analyst.err
echo "exit=$?" >> /home/user/scaffold/tmp/codex/{key}-audit-analyst.err
"""
    (U / f'{key}-audit-analyst.sh').write_text(launcher)
    print(key, 'written')
