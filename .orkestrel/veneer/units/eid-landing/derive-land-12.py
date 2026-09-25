# Derives eid-land-12.sh (E-ID-MOTION-MODAL and E-ID-MOTION-FACTOR) from eid-land-11.sh; every field naming the subject
# is rewritten, and the script stops after integration so the Orchestrator applies MODAL's § Factors strike to FACTOR's
# paragraph before the chain runs.
S='/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad'
t=open(S+'/eid-land-11.sh').read()
reps=[
("# Lands TOKEN-PROOFS and TAILWIND-RECIPE on Veneer's session branch.\n# Successor to eid-land-10.sh, which landed E-ID-MOTION-REDUCED and E-ID-BUTTON-CLASSES. What changed: the unit list\n# (tkp cut from 2376710, twr cut from 21c821a), the scratch directory (land11), the log names, and the done line; the\n# stop after a line union and the chain are unchanged.",
 "# Lands E-ID-MOTION-MODAL and E-ID-MOTION-FACTOR on Veneer's session branch.\n# Successor to eid-land-11.sh, which landed TOKEN-PROOFS and TAILWIND-RECIPE. What changed: the unit list (mmod cut\n# from 73326c7, mfac cut from b613ae4), the scratch directory (land12), the log names, the done line, and an\n# unconditional stop after integration, so the Orchestrator applies MODAL's § Factors strike to FACTOR's paragraph and\n# reads any union before running eid-chain-12.sh; the chain itself is unchanged."),
("$S/eid-land-11.log.txt.\n","$S/eid-land-12.log.txt.\n"),
("LOG=$S/eid-land-11.log.txt","LOG=$S/eid-land-12.log.txt"),
('UNITS="tkp:2376710 twr:21c821a"','UNITS="mmod:73326c7 mfac:b613ae4"'),
("rm -rf $S/land11; mkdir -p $S/land11","rm -rf $S/land12; mkdir -p $S/land12"),
('echo "=== eid land 11 done"','echo "=== eid land 12 done"'),
('if [ -n "$union" ]; then echo "=== stopped after integration: a line union needs reading" >> $LOG; exit 6; fi',
 'echo "=== stopped after integration: apply the § Factors strike (union=${union:-none}), then run eid-chain-12.sh" >> $LOG; exit 6'),
]
for a,b in reps:
    assert t.count(a)==1,(a[:60],t.count(a))
    t=t.replace(a,b)
t=t.replace('$S/land11/','$S/land12/').replace('eid-land-11-src-browser','eid-land-12-src-browser')
assert 'land11' not in t and 'tkp' not in t and 'twr' not in t, 'stale field'
open(S+'/eid-land-12.sh','w').write(t)
print('derived')
