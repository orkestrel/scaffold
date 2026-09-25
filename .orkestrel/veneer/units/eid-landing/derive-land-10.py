# Derives eid-land-10.sh (E-ID-MOTION-REDUCED and E-ID-BUTTON-CLASSES) from eid-land-8.sh; every field naming the
# subject is rewritten.
S='/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad'
t=open(S+'/eid-land-8.sh').read()
reps=[
("# Lands LEDGER-ADDITIONS on Veneer's session branch.\n# Successor to eid-land-7.sh, which landed E-ID-MOTION-FADE and STATES. What changed: the unit list (lad, cut from\n# 2376710), the scratch directory (land9), the log names, and the done line, which names this script; the chain is\n# unchanged.",
 "# Lands E-ID-MOTION-REDUCED and E-ID-BUTTON-CLASSES on Veneer's session branch.\n# Successor to eid-land-8.sh, which landed LEDGER-ADDITIONS. What changed: the unit list (mred cut from 21c821a, ebcl\n# cut from 2376710), the scratch directory (land10), the log names, the done line, and a stop after integration when a\n# Markdown file resolved by line union, so the Orchestrator reads the union before the chain runs; the chain is\n# unchanged."),
("$S/eid-land-8.log.txt.\n","$S/eid-land-10.log.txt.\n"),
("LOG=$S/eid-land-8.log.txt","LOG=$S/eid-land-10.log.txt"),
('UNITS="lad:2376710"','UNITS="mred:21c821a ebcl:2376710"'),
("rm -rf $S/land9; mkdir -p $S/land9","rm -rf $S/land10; mkdir -p $S/land10"),
('echo "=== eid land 8 done"','echo "=== eid land 10 done"'),
('    if [ $c -ne 0 ]; then echo "  $f: $c conflict(s)" >> $LOG; python3 $S/resolve-diff3.py $S/land9/$n.merged "$f" >> $LOG 2>&1',
 '    if [ $c -ne 0 ]; then echo "  $f: $c conflict(s)" >> $LOG; union=1; python3 $S/resolve-diff3.py $S/land9/$n.merged "$f" >> $LOG 2>&1'),
("rm -rf node_modules/.vite\n",
 "if [ -n \"$union\" ]; then echo \"=== stopped after integration: a line union needs reading\" >> $LOG; exit 6; fi\nrm -rf node_modules/.vite\n"),
]
for a,b in reps:
    assert t.count(a)==1,(a[:60],t.count(a))
    t=t.replace(a,b)
t=t.replace('$S/land9/','$S/land10/').replace('eid-land-8-src-browser','eid-land-10-src-browser')
open(S+'/eid-land-10.sh','w').write(t)
