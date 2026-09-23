#!/bin/bash
# nb-landing-probe.sh: probe the NAVBAR round-3 shared and off-limits patches three-way with diff3-style blocks against
# the current Veneer tip in a scratch worktree and map every conflict, printing each guide block whose sides both name
# the dropdown (the collisions with the TOGGLES landing the plan reserves for the Orchestrator's ruling). No resolver
# and no gate runs here. Output kept as nb-landing-probe.txt. The round-4 shared patch supersedes the round-3 one with a
# delta confined to tests/setupStyles.test.ts, so the guide map read here holds for the landing.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; U=/home/user/scaffold/.orkestrel/veneer/units
TIP=$(git -C /home/user/veneer rev-parse --short HEAD); W=$S/probe-land-nb
cd /home/user/veneer && git worktree remove --force $W > /dev/null 2>&1; rm -rf $W
git worktree add -q --detach $W $TIP && cd $W || exit 1
echo "=== nb diff3 apply of nb-shared-3.patch and nb-offlimits-3.patch on $TIP $(date -u +%H:%M:%S)"
git -c merge.conflictStyle=diff3 apply --3way $U/nb-shared-3.patch 2>&1 | grep -v "^Applied patch\|^U " | head -5
git -c merge.conflictStyle=diff3 apply --3way $U/nb-offlimits-3.patch 2>&1 | grep -v "^Applied patch\|^U " | head -5
git status --porcelain | grep -E '^(UU|AA|DU|UD)'
echo "--- conflict map"; python3 $U/land-conflict-map.py
echo "--- guide blocks naming the dropdown on both sides"
python3 - <<'PY'
import re
s=open('guides/veneer.md').read()
for m in re.finditer(r'<<<<<<< ours\n(.*?)\|\|\|\|\|\|\| base\n(.*?)=======\n(.*?)>>>>>>> theirs\n', s, re.S):
    o,b,t=m.group(1),m.group(2),m.group(3)
    if 'dropdown' in o.lower() and 'dropdown' in t.lower() and not o.lstrip().startswith('|'):
        line=s[:m.start()].count('\n')+1
        print(f'--- block at guide line {line}\n[ours]\n{o[:1500]}\n[base]\n{b[:1500]}\n[theirs]\n{t[:1500]}')
PY
echo "--- done $(date -u +%H:%M:%S)"
