# Derives the T5 round-5 audit lane briefs and the analyst launcher from the round-4 set, rewriting every field that
# names the subject: title, claims path, evidence list, the round's source copies, the prior reconciliation, focus,
# objectives, and the launcher's header, journal, and output paths. Usage: python3 t5-audit-5-briefs.py
import re, sys
U = '/home/user/scaffold/.orkestrel/veneer/units/'
EV4 = ("the logs and instruments under `t5-instruments-4/` (the red, green, repeat, mutation, digest, and gate logs, "
       "`t5-4-run.sh`, `t5-4-gates.sh`, `t5-4-repeat.sh`, the retained mutation files under `t5-4-mutations/`, and the "
       "round-3 source copies), the round-3 reconciliation `t5-audit-3-verdict.md` with its three lane verdicts, and the "
       "round-3 consumer probe `t5-instruments-3/t5-veneer-probe-3.log.txt`")
EV5 = ("the logs and instruments under `t5-instruments-5/` (the unit's red, green, mutation, digest, and gate logs, its "
       "run and gate scripts, the retained mutation files under `t5-5-mutations/`, and the round-4 source copies), the "
       "park ruling `t5-park-ruling-verdict.md` with both lane proposals it names, the Orchestrator's park probe "
       "`t5-instruments-4/t5-park-probe.log.txt`, the round-4 lane verdicts `t5-audit-4-*-verdict.md`, and the "
       "Orchestrator's consumer probe `t5-instruments-5/t5-veneer-probe-5.log.txt` with the journey and guide logs beside it")
def sub(t, a, b, need=True):
    if need and a not in t: sys.exit('missing field: ' + a[:70])
    return t.replace(a, b)
def common(t):
    t = sub(t, EV4, EV5)
    t = sub(t, 't5-audit-4-claims.md', 't5-audit-5-claims.md')
    t = sub(t, '`t5-4.diff`, `t5-4-status.txt`, `t5-test-frame-report-4.md` (its findings, the leaf\'s cases, proofs, mutation table, and gate table)',
            '`t5-5.diff`, `t5-5-status.txt`, `t5-test-frame-report-5.md` (its changes by symbol, new proofs with their red and green runs, mutation table, and gate table)')
    t = sub(t, 'the round-4 owned files over `80c419e`', 'the round-5 owned files over `80c419e`')
    t = sub(t, 'Audit round 4', 'Audit round 5')
    t = sub(t, '`t5-test-frame-brief.md` to `t5-test-frame-brief-4.md`', '`t5-test-frame-brief.md` to `t5-test-frame-brief-5.md`', need=False)
    if re.search(r'round-4 owned|audit-4-claims|t5-4\.diff|instruments-4/`\s\(', t): sys.exit('stale round-4 field left')
    return t
a = common(open(U + 't5-audit-4-analyst-brief.md').read())
a = sub(a, re.search(r'Focus: .*\n', a).group(0),
        'Focus: claims 2, 3, 4, 5, 6, 7, and 8 (the park against the ruling\'s P1, every corner and both-axes proof against a park at (0, 0), the removal by grep over the final source, `computeOffset` against counterexamples over window and box sizes, fractional ones included, each mutation file against the source it edits and the log it produced, and each lifecycle exercise\'s assertion against a pointer parked at the origin); rule every other claim too, and rule the Orchestrator\'s given rulings wrong where the evidence says so.\n')
open(U + 't5-audit-5-analyst-brief.md', 'w').write(a)
r = common(open(U + 't5-audit-4-reviewer-brief.md').read())
r = sub(r, 'shape, naming, the lift and compositing mechanism in the runner page, the element-frame staging, the sized refusal, the proofs\' shape, and the TSDoc and guide prose, guide voice, and design fit.',
        'shape, naming, whether the round removed the park-point avoidance whole and kept exactly what the ruling\'s P4 keeps, whether each proof is named for what it proves, the proofs\' shape, and the TSDoc and guide prose against the ruling\'s P5, and design fit.')
open(U + 't5-audit-5-reviewer-brief.md', 'w').write(r)
c = common(open(U + 't5-audit-4-checker-brief.md').read())
c = sub(c, 'claims 1, 5, 6, and 8', 'claims 1, 4, 8, and 10', need=True)
c = c.replace('claims 1, 5, 6, and 8', 'claims 1, 4, 8, and 10')
open(U + 't5-audit-5-checker-brief.md', 'w').write(c)
l = open(U + 't5-audit-4-analyst.sh').read()
l = sub(l, 'Audit round 4', 'Audit round 5')
l = sub(l, 'Written by pb-audit-briefs.py.', 'Derived from t5-audit-4-analyst.sh by t5-audit-5-briefs.py.')
l = l.replace('t5-audit-4-', 't5-audit-5-')
if 'audit-4' in l: sys.exit('stale launcher field')
open(U + 't5-audit-5-analyst.sh', 'w').write(l)
print('ok')
