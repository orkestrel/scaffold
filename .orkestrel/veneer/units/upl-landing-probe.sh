#!/bin/bash
# upl-landing-probe.sh: probe the UTIL-PLACEMENT round-4 patches three-way against the current Veneer tip in a scratch
# worktree, map every conflict, and dry-run the resolution: every conflicted Markdown table three-way with
# table-merge3.py against the unit's base e4e6a40 (the patch applied over the base's file gives theirs), then
# upl-resolve.py for the source-line unions and the append conflicts, land-seams.py, and sort-inventories.py. No
# gate runs here (the TOGGLES chain owns the container); the check and lint follow in upl-landing-probe-gates.sh.
# Log: the probe's stdout, kept as upl-landing-probe.txt.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; U=/home/user/scaffold/.orkestrel/veneer/units
TIP=$(git -C /home/user/veneer rev-parse --short HEAD)
cd /home/user/veneer && git worktree remove --force $S/probe-land-upl > /dev/null 2>&1; rm -rf $S/probe-land-upl
git worktree add -q --detach $S/probe-land-upl $TIP && cd $S/probe-land-upl || exit 1
echo "=== upl apply --3way of upl-shared-4.patch and upl-unlisted-4.patch on $TIP $(date -u +%H:%M:%S)"
git apply --3way $U/upl-shared-4.patch 2>&1 | grep -v "^Applied patch\|^U " | head -8
git apply --3way $U/upl-unlisted-4.patch 2>&1 | grep -v "^Applied patch\|^U " | head -4
git status --porcelain | grep -E '^(UU|AA|DU|UD)'
echo "--- conflict map"; python3 $U/land-conflict-map.py
echo "--- tables: theirs = e4e6a40's file with the patch applied"
rm -rf $S/uplfix && mkdir -p $S/uplfix/theirs $S/uplfix/base $S/uplfix/ours
for f in $(git status --porcelain | grep -E '^UU' | awk '{print $2}'); do
  if grep -qE '^<<<<<<< ours$' "$f" && awk '/^<<<<<<< ours$/{c=1;next} /^=======$/{c=0} c' "$f" | grep -qE '^\| '; then
    mkdir -p $S/uplfix/theirs/$(dirname $f) $S/uplfix/base/$(dirname $f) $S/uplfix/ours/$(dirname $f)
    git show e4e6a40:$f > $S/uplfix/base/$f; git show $TIP:$f > $S/uplfix/ours/$f; cp $S/uplfix/base/$f $S/uplfix/theirs/$f
    (cd $S/uplfix/theirs && git apply --include="$f" $U/upl-shared-4.patch 2>&1 | head -2)
    echo "table conflict in $f; headers of the conflicted blocks:"
    awk '/^<<<<<<< ours$/{c=1;next} /^=======$/{c=0} c && /^\| [A-Za-z]/{print}' "$f" | grep -vE '^\| -' | sort -u | cut -c1-80
  fi
done
echo "--- done $(date -u +%H:%M:%S)"
