# Derives eid-land-11.sh (TOKEN-PROOFS and TAILWIND-RECIPE) from eid-land-10.sh; every field naming the subject is
# rewritten.
S='/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad'
t=open(S+'/eid-land-10.sh').read()
reps=[
("# Lands E-ID-MOTION-REDUCED and E-ID-BUTTON-CLASSES on Veneer's session branch.\n# Successor to eid-land-8.sh, which landed LEDGER-ADDITIONS. What changed: the unit list (mred cut from 21c821a, ebcl\n# cut from 2376710), the scratch directory (land10), the log names, the done line, and a stop after integration when a\n# Markdown file resolved by line union, so the Orchestrator reads the union before the chain runs; the chain is\n# unchanged.",
 "# Lands TOKEN-PROOFS and TAILWIND-RECIPE on Veneer's session branch.\n# Successor to eid-land-10.sh, which landed E-ID-MOTION-REDUCED and E-ID-BUTTON-CLASSES. What changed: the unit list\n# (tkp cut from 2376710, twr cut from 21c821a), the scratch directory (land11), the log names, and the done line; the\n# stop after a line union and the chain are unchanged."),
("$S/eid-land-10.log.txt.\n","$S/eid-land-11.log.txt.\n"),
("LOG=$S/eid-land-10.log.txt","LOG=$S/eid-land-11.log.txt"),
('UNITS="mred:21c821a ebcl:2376710"','UNITS="tkp:2376710 twr:21c821a"'),
("rm -rf $S/land10; mkdir -p $S/land10","rm -rf $S/land11; mkdir -p $S/land11"),
('echo "=== eid land 10 done"','echo "=== eid land 11 done"'),
]
for a,b in reps:
    assert t.count(a)==1,(a[:60],t.count(a))
    t=t.replace(a,b)
t=t.replace('$S/land10/','$S/land11/').replace('eid-land-10-src-browser','eid-land-11-src-browser')
assert 'land10' not in t and 'eid-land-10' not in t.replace('Successor to eid-land-10.sh','') and 'mred' not in t and 'ebcl' not in t, 'stale field'
open(S+'/eid-land-11.sh','w').write(t)
print('derived')
