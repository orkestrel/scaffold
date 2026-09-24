# Writes the round-2 objective-lane brief, checker brief, and Astra launcher for the named units from one
# table, derived from the uf-audit-2 set with every subject field rewritten.
# Usage: python3 w23-audit-2-briefs.py <unit> [<unit> ...]
import pathlib, sys
U = pathlib.Path('/home/user/scaffold/.orkestrel/veneer/units')
LAW = ("`/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; "
       "the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` "
       "and its references (the verdict shape)")
UNITS = {
    'up': dict(name='UTIL-PAINT', worktree='/home/user/veneer-up',
        evidence='`up-2.diff`, `up-2-status.txt`, `up-shared-2.patch`, `up-unscoped-profiles-2.patch`, `b-utilities-up-report-2.md`, `b-utilities-up-brief-2.md`, `up-instruments/` (the round-2 mutation, count, contrast, and gate logs and instruments), round 1\'s `up.diff`, `up-shared.patch`, `up-unscoped-profiles.patch`, and `b-utilities-up-report.md`, and the round-1 verdict `up-audit-verdict.md` and its lane verdicts; `b-utilities-family.md`, `b-utilities-w3-terrain-report.md`, `w2-w3-note-1.md` to `w2-w3-note-5.md`, and the design verdict `/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md`; the UTIL-TEXT and UTIL-SPACING shared patches `ut-shared.patch` and `usp-shared.patch` beside them, for the union claim 2 names',
        focus='claims 1, 2, 4, 5, and 6 (the patch delta against round 1, the whole-order profiles assertions and their hold over the wave\'s union of shared names, the swatch helper and its red run, the contrast rule and its runs, and the re-run mutations and the count control)',
        checker='claims 1, 3, and 8'),
    'oc': dict(name='OFFCANVAS', worktree='/home/user/veneer-oc',
        evidence='`oc-2.diff`, `oc-2-status.txt`, `oc-shared-2.patch`, `b-modal-oc-report-2.md`, `b-modal-oc-brief-2.md`, `oc-instruments/` (the round-2 mutation, gate, cascade-probe, and utility-reading logs and instruments, and `oc-2-guide-changes-ignoring-whitespace.txt`), round 1\'s `oc.diff`, `oc-shared.patch`, and `b-modal-oc-report.md`, and the round-1 verdict `oc-audit-verdict.md` and its lane verdicts; `w2-w3-note-1.md`, `w2-w3-note-2.md`, and the design verdict `/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md`',
        focus='claims 1, 3, 4, 5, and 6 (the patch delta against round 1, the failing-first and transition-state runs and the probe control, every clause of the plugin row against the release source, the navbar and stacking sentences against the cascade, and the utility reading and its proof)',
        checker='claims 1, 2, 5, and 8'),
    'usp': dict(name='UTIL-SPACING', worktree='/home/user/veneer-usp',
        evidence='`usp-2.diff`, `usp-2-status.txt`, `usp-shared-2.patch`, `b-utilities-usp-report-2.md`, `b-utilities-usp-brief-2.md`, `usp-instruments/` (the round-2 records: `usp-mutations-2.log.txt`, `usp-mutate-2.sh`, `usp-cascade-2.mjs`, `usp-cascade-controls-2.sh`, `usp-gates-2.sh`, `usp-gates-2.log.txt`, `usp-guides-2.log.txt`, `usp-service-2.sh`, `usp-service-2.log.txt`, `usp-2-owned-interdiff.txt`, and `usp-2-shared-interdiff.txt`), round 1\'s `usp.diff`, `usp-shared.patch`, and `b-utilities-usp-report.md`, and the round-1 verdict `usp-audit-verdict.md` and its lane verdicts; `w2-w3-note-1.md` to `w2-w3-note-5.md` and the design verdict `/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md`',
        focus='claims 1, 2, 3, and 6 (the patch delta against round 1, the derived auto-margin population and each member\'s red run, the census and its negative controls, and the renamed field\'s readers)',
        checker='claims 1, 4, 5, 6, and 7',
        bench='the bench round-tripped at 03:17 (dr-audit returned exit 0 through this queue)'),
    'ut': dict(name='UTIL-TEXT', worktree='/home/user/veneer-ut',
        evidence='`ut-2.diff`, `ut-2-status.txt`, `ut-shared-2.patch`, `b-utilities-ut-report-2.md`, `b-utilities-ut-brief-2.md`, `ut-instruments/` (the round-2 records: `ut-mutations-2.log.txt`, `ut-mutate-3.py`, `ut-mutate-3-run.log.txt`, `ut-mutate-3-run2.log.txt`, `ut-2-copy-gates.sh`, the `ut-2-copy-*.log.txt` logs, `ut-2-cascade-count.log.txt`, `ut-2-service-up2.log.txt`, `ut-2-shared-interdiff.txt`, and the `ut-2-*.py` edit scripts), round 1\'s `ut.diff`, `ut-shared.patch`, and `b-utilities-ut-report.md`, and the round-1 verdict `ut-audit-verdict.md` and its lane verdicts; `w2-w3-note-1.md` to `w2-w3-note-5.md` and the design verdict `/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md`',
        focus='claims 1, 2, 3, 5, and 7 (the patch delta against round 1, the pairs\' partial and its order against the release, the components-layer control, the product sentences against the markup, and the moved cases)',
        checker='claims 1, 4, 6, and 8',
        bench='the bench round-tripped at 03:17 (dr-audit returned exit 0 through this queue)'),
    'cb': dict(name='BARE-BUTTON', worktree='/home/user/veneer-cb', base='a9dff19',
        evidence='`cb-2.diff`, `cb-2-status.txt`, `cb-shared-2.patch`, `b-cross-cb-report-2.md`, `b-cross-cb-brief-2.md`, `cb-instruments/` (the round-2 records: `cb-mutations-2.log.txt`, `cb-mutate-2.sh`, `cb-mutation-2-token-run.log.txt`, `cb-green-2.log.txt`, `cb-interdiff-2.diff`, `cb-shared-interdiff-2.diff`, `cb-guide-2.py`, and the `cb-gate-2-*` and `cb-scratch-2-*` logs), round 1\'s `cb.diff`, `cb-shared.patch`, and `b-cross-cb-report.md`, and the round-1 verdict `cb-audit-verdict.md` and its lane verdicts; the design verdict `/home/user/scaffold/.orkestrel/veneer/b-cross-cb-design-verdict.md`',
        focus='claims 1, 2, 3, and 5 (the delta against round 1, the list-group case and its red runs, the token-metric wrapper and its red run, and the coverage matrix against the retained readings)',
        checker='claims 1, 4, and 6',
        bench='the bench round-tripped at 04:06 (cb-audit returned exit 0 through this queue)'),
    'rd': dict(name='RAMP-DOWN', worktree='/home/user/veneer-rd', base='42fd88e',
        evidence='`rd-2.diff`, `rd-2-status.txt`, `rd-shared.patch` (unchanged from round 1), `b-modal-rd-report-2.md`, `b-modal-rd-brief-2.md`, `rd-instruments/` (the round-2 records: `rd-mutation-2.patch`, `rd-mutation-2.log.txt`, `rd-mutation-zero-2.patch`, `rd-mutation-zero-2.log.txt`, `rd-mixins-green-2.log.txt`, `rd-guides-2.log.txt`, `rd-gates-2.sh`, `rd-gates-2.log.txt`, the `rd-gate-*-2.log.txt` logs, and `rd-base.css`), round 1\'s `rd.diff` and `b-modal-rd-report.md`, and the round-1 verdict `rd-audit-verdict.md` and its lane verdicts',
        focus='claims 1, 2, and 3 (the delta against round 1 and the byte equality, the fixture case against both mutations, and each comment against the compiled stylesheets)',
        checker='claims 1, 4, and 5',
        bench='the bench round-tripped at 04:48 (rd-audit returned exit 0 through this queue)'),
    'cl': dict(name='LEDGER', worktree='/home/user/veneer-cl', base='42fd88e',
        evidence='`cl-2.diff`, `cl-2-status.txt`, `cl-shared-2.patch`, `b-cross-cl-report-2.md`, `b-cross-cl-brief-2.md`, `cl-instruments/` (the round-2 records: `cl-mutations-2.log.txt`, `cl-mutate-3.py`, `cl-red-2.json`, the `cl-mutations-owned-2.json`, `cl-mutations-owned-3.json`, and `cl-mutations-shared-4.json` specs, `cl-setup-green-2.log.txt`, `cl-measure-2.log.txt`, `cl-width-2.log.txt`, `cl-guide-2.py`, `cl-scratch-2.sh`, `cl-gates-2.sh`, and the `cl-gate-round2-*` logs), round 1\'s `cl.diff`, `cl-shared.patch`, and `b-cross-cl-report.md`, and the round-1 verdict `cl-audit-verdict.md` and its lane verdicts; the design verdict `/home/user/scaffold/.orkestrel/veneer/b-cross-design-verdict.md` (X1, X6, and X7)',
        focus='claims 1, 2, and 4 (the delta against round 1, every rewritten sentence against the code, and the refusal against its plants and the measurement)',
        checker='claims 1, 3, and 5',
        bench='the bench round-tripped at 05:19 (cl-audit returned exit 0 through this queue)'),
    'cf': dict(name='FADE', worktree='/home/user/veneer-cf', base='42fd88e',
        evidence='`cf-2.diff`, `cf-2-status.txt`, `cf-shared-2.patch`, `b-cross-cf-report-2.md`, `b-cross-cf-brief-2.md`, `cf-instruments/` (`cf-offlimits.patch`, and the round-2 records: `cf-mutations-2.log.txt`, `cf-2-red.sh`, the `cf-2-nopartial-*` and `cf-2-partial-*` logs, `cf-2-gates.sh` and the `cf-2-gate-*` logs, and `cf-2-guide.py`), round 1\'s `cf.diff`, `cf-shared.patch`, and `b-cross-cf-report.md`, and the round-1 verdict `cf-audit-verdict.md` and its lane verdicts; the design verdict `/home/user/scaffold/.orkestrel/veneer/b-cross-design-verdict.md` (X5)',
        focus='claims 1, 2, 3, and 5 (the delta against round 1, the added rows against the release\'s plugins, the registry remark against the declined states, and the failing-first runs under the shipped titles)',
        checker='claims 1, 4, and 6',
        bench='the bench round-tripped at 05:34 (cl-audit-2 launched through this queue)'),
}
for key in sys.argv[1:]:
    u = UNITS[key]; claims = f'{key}-audit-2-claims.md'; title = f"Audit round 2 — {u['name']} (`{key}`)"
    (U / f'{key}-audit-2-analyst-brief.md').write_text(f"""# {title}: objective lane on GPT-6 Astra

`analyst` route on GPT-6 Astra (`gpt-6-astra`), `codex exec --sandbox read-only` rooted at `{u['worktree']}`. You are the engine behind the CLI: perform the audit directly and spawn nothing. You hold the **objective** lane over the numbered claims in `/home/user/scaffold/.orkestrel/veneer/units/{claims}`: correctness, constraints, and what the code, the logs, and the contracts permit. The unit was written by `opus` on Opus 5.5, so you are an auditor engine that did not write it; the checker (Sonnet) runs blind beside you; the subjective lane is not run this round, as the round-1 verdict records. Bound: rule within 25 minutes.

Law: {LAW}. Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `{claims}`; {u['evidence']}; the worktree `{u['worktree']}` (the owned files over `{u.get('base', '2a3f223')}`; read them, never edit them; `git -C {u['worktree']} show {u.get('base', '2a3f223')}:<path>` reads any base file; the inventory is `tests/fixtures/oracle/inventory.json`; `node_modules/bootstrap/` there is Bootstrap 5.3.8, its source under `scss/` and `js/src/`, and `node_modules/tailwindcss/` the installed Tailwind).

Standing conditions: the sandbox runs no Vitest project and no browser, and denies the network, a loopback listener, and a nested install; `git show`, `git diff`, `git apply --check` against a scratch extract under the system temporary directory, `grep`, `sha256sum`, and `node -e` that writes nothing are allowed; rule every proof claim from the code's assertions and the retained logs, naming for each mutation whether the assertions distinguish it from the passing case, and say which log you read. Never edit the worktree. Never read `.env*`, `.npmrc`, `auth.json`, or any credential file.

Focus: {u['focus']}; rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so.

Output: the `orkestrel-falsify` verdict shape and nothing else — numbered verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) with `file:line` (for a CONFIRMED verdict, the attack that failed; for a claim about a proof, the mutation and whether the assertions distinguish it), findings outside the claims to the `BROKEN` standard, the counts the report states listed under the last claim, and one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
""")
    (U / f'{key}-audit-2-checker-brief.md').write_text(f"""# {title}: checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, beside the objective lane on GPT-6 Astra.

## Objective

Verdicts on {u['checker']} of the claims file by reading alone: the status and diff file lists, the patches' file sets against the brief's Shared list, the registry and order agreement across files, the table placement, freezing, and derivation, and every added sentence and comment against the count law, the banned-term rows, the token-noun rule, and the temporal and cross-reference rows. Where a clause needs a command you cannot run (an apply check), rule the sub-clause UNRESOLVED and name the command; the Orchestrator takes that reading. Rule a clause only on the sites you read, and name them; a sample of compliant sites does not confirm a claim about every site.

## Context

Law: {LAW}. Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `{claims}`; {u['evidence']}; the worktree `{u['worktree']}` (the owned files over `{u.get('base', '2a3f223')}`; read them, never edit them). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for {u['checker']} only — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each named claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
""")
    sh = f"""#!/bin/bash
# {title}, objective lane: `analyst` on GPT-6 Astra, read-only, rooted at {u['worktree']}.
# Written by w23-audit-2-briefs.py. Launched through codex-queue-2.sh; {u.get('bench', 'the bench round-tripped at 02:50 (md-audit-2 and tp-audit-2 returned exit 0)')}; the cap is 1800 s (comparable objective lanes ran 7 to 12 min over retained logs, plus slack for the loaded container).
# Brief: .orkestrel/veneer/units/{key}-audit-2-analyst-brief.md  Claims: .orkestrel/veneer/units/{claims}  Journal: tmp/codex/{key}-audit-2-analyst.jsonl  Last message: tmp/codex/{key}-audit-2-analyst-last.md
cd /home/user/scaffold || exit 1
timeout 1800 codex exec --json -C {u['worktree']} --sandbox read-only --model gpt-6-astra -c "model_reasoning_effort=\\"high\\"" --output-last-message /home/user/scaffold/tmp/codex/{key}-audit-2-analyst-last.md "Your working directory is {u['worktree']}. Read and execute the brief at /home/user/scaffold/.orkestrel/veneer/units/{key}-audit-2-analyst-brief.md exactly. Rule on every numbered claim in /home/user/scaffold/.orkestrel/veneer/units/{claims} holding the objective lane. Make your final message the report the brief's Output section specifies, and nothing else." < /dev/null > /home/user/scaffold/tmp/codex/{key}-audit-2-analyst.jsonl 2> /home/user/scaffold/tmp/codex/{key}-audit-2-analyst.err
echo "exit=$?" >> /home/user/scaffold/tmp/codex/{key}-audit-2-analyst.err
"""
    (U / f'{key}-audit-2-analyst.sh').write_text(sh); (pathlib.Path('/home/user/scaffold/tmp/codex') / f'{key}-audit-2-analyst.sh').write_text(sh)
    print(key, 'written')
