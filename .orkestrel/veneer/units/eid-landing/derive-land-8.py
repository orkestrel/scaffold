# Derives eid-land-8.sh (LEDGER-ADDITIONS) from eid-land-7.sh; every field naming the subject is rewritten.
S='/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad'
t=open(S+'/eid-land-7.sh').read()
reps=[
("# Lands E-ID-MOTION-FADE and STATES on Veneer's session branch.\n# Successor to eid-land-6.sh, which landed ER-MECH. What changed: the unit list (mfade and sts, each cut from\n# 2376710), the scratch directory (land8), and the log names; the chain is unchanged, with test:service and\n# test:distribution by name.",
 "# Lands LEDGER-ADDITIONS on Veneer's session branch.\n# Successor to eid-land-7.sh, which landed E-ID-MOTION-FADE and STATES. What changed: the unit list (lad, cut from\n# 2376710), the scratch directory (land9), the log names, and the done line, which names this script; the chain is\n# unchanged."),
("$S/eid-land-7.log.txt.\n","$S/eid-land-8.log.txt.\n"),
("LOG=$S/eid-land-7.log.txt","LOG=$S/eid-land-8.log.txt"),
('UNITS="mfade:2376710 sts:2376710"','UNITS="lad:2376710"'),
("rm -rf $S/land8; mkdir -p $S/land8","rm -rf $S/land9; mkdir -p $S/land9"),
('echo "=== eid land 6 done"','echo "=== eid land 8 done"'),
]
for a,b in reps:
    assert t.count(a)==1,(a[:50],t.count(a))
    t=t.replace(a,b)
t=t.replace('$S/land8/','$S/land9/').replace('eid-land-7-src-browser','eid-land-8-src-browser')
open(S+'/eid-land-8.sh','w').write(t)
