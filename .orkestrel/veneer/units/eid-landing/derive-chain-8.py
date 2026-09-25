# Derives eid-chain-8.sh from eid-land-8.sh: the chain alone, over the session tree as it stands, for the
# LEDGER-ADDITIONS landing whose integration commit follows the landing commit.
S='/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad'
t=open(S+'/eid-land-8.sh').read()
head,rest=t.split('rm -rf node_modules/.vite\n',1)
pre=[l for l in head.split('\n') if l.startswith(('S=','export PATH','TRAILER=','Claude-Session','step()'))]
hdr=('#!/bin/bash\n# Runs the landing chain alone over Veneer\'s session branch for LEDGER-ADDITIONS.\n'
 '# Successor to eid-land-8.sh, stopped at `check` after its guide merge left two overlapping sentences. What changed:\n'
 '# the unit integration is gone, because the landing commit f855924 and its integration commit are on the branch;\n'
 '# the log is $S/eid-chain-8.log.txt and the done line names this script. The chain is unchanged.\n')
body='\n'.join(pre).replace('LOG=$S/eid-land-8.log.txt','')
body=body.replace('S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad','S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad\nLOG=$S/eid-chain-8.log.txt; : > $LOG')
guard='cd /home/user/veneer || exit 1\n[ -z "$(git status --porcelain)" ] || { echo "=== session tree dirty; refusing" >> $LOG; exit 2; }\necho "=== head $(git rev-parse --short HEAD)" >> $LOG\n'
rest=rest.replace('eid-land-8-src-browser','eid-chain-8-src-browser').replace('echo "=== eid land 8 done"','echo "=== eid chain 8 done"')
open(S+'/eid-chain-8.sh','w').write(hdr+body+'\n'+guard+'rm -rf node_modules/.vite\n'+rest)
