<!-- Retained verbatim from the checker hand-back of 2026-09-22 (Sonnet, mechanical lane, F5a audit round). Brief: f5a-audit-checker-brief.md. -->

python3 - <<'EOF'
import json,re
p='/root/.claude/projects/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277.jsonl'
best=None
with open(p) as f:
    for n,line in enumerate(f):
        if 'a6af58f826407ef59' not in line or 'Lane held: mechanical' not in line: continue
        o=json.loads(line)
        def walk(x):
            if isinstance(x,dict):
                for v in x.values(): yield from walk(v)
            elif isinstance(x,list):
                for v in x: yield from walk(v)
            elif isinstance(x,str): yield x
        for t in walk(o):
            if 'Lane held: mechanical' in t and 'VERDICT:' in t:
                best=(n,t)
assert best, 'not found'
t=best[1]
m=re.search(r'\[Subagent hand-back\][^\n]*\n(.*?)</agent-message>', t, re.S)
body=m.group(1) if m else t
lines=body.split('\n'); ind=min((len(l)-len(l.lstrip()) for l in lines if l.strip()), default=0)
body='\n'.join(l[ind:] if l.strip() else '' for l in lines).strip('\n')
hdr="<!-- Retained verbatim from the checker hand-back of 2026-09-22 (Sonnet, mechanical lane, F5a audit round). Brief: f5a-audit-checker-brief.md. -->\n\n"
out='/home/user/scaffold/.orkestrel/veneer/units/f5a-audit-checker-report.md'
open(out,'w').write(hdr+body+'\n')
print('retained', len(body), 'chars; terminal:', body.strip().splitlines()[-1][:80])
EOF
cat > /home/user/scaffold/.orkestrel/veneer/units/f5a-claim1-control.log.txt <<'EOF'
=== F5a claim 1 control (Orchestrator, 2026-09-22, Veneer working tree over d93bb85), read-only
Command: export-name sets from `git show d93bb85:tests/setupStyles.ts` and from the three modules
(`tests/setupStyles.ts`, `tests/setupCases.ts`, `tests/setupCalibration.ts`), pattern
`^export (async )?(function|const|class|interface|type) [A-Za-z_]+`, compared with `comm`.
old exports: 111; new exports across the three modules: 103
in old, absent now: SelectorCombinator SelectorCompound extractCompoundTags extractSelectorCompounds extractSelectorIdentifiers findGroupEnd matchesLooseTagPair scanUnreadForm splitTopLevelCompounds
new, absent in old: ELEMENT_TAGS
exported by more than one module: none
Reading: 111 - 9 deleted + 1 added = 103; every surviving export lives in exactly one module.
EOF
echo retained-control
