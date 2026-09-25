#!/bin/bash
# Cuts the wave-1 unit worktrees from the Veneer landing head given as $1: ebcl (E-ID-BUTTON-CLASSES), mfade
# (E-ID-MOTION-FADE), tkp (TOKEN-PROOFS), and lad (LEDGER-ADDITIONS). Each hardlinks Veneer's node_modules, drops the
# hardlinked Vite pre-bundle, and stages its brief with LANDING_HEAD replaced by the head. Derived from enum-worktree.sh.
H=$1
[ -n "$H" ] || { echo "usage: wave1-worktrees.sh <head>"; exit 1; }
R=/home/user/scaffold/.orkestrel/veneer/units
cd /home/user/veneer || exit 1
[ "$(git rev-parse HEAD:package-lock.json)" = "$(git rev-parse $H:package-lock.json)" ] || { echo "lockfile differs"; exit 2; }
for pair in ebcl:e-id-button-classes-brief.md mfade:e-id-motion-fade-brief.md tkp:token-proofs-brief.md lad:ledger-additions-brief.md; do
  u=${pair%%:*}; b=${pair#*:}; W=/home/user/veneer-$u
  git worktree add -q -b unit/$u $W $H && cp -al /home/user/veneer/node_modules $W/node_modules || exit 3
  rm -rf $W/node_modules/.vite
  mkdir -p $W/tmp/units/logs
  sed "s/LANDING_HEAD/$H/g" $R/$b > $W/tmp/units/$u-brief.md
  echo "worktree $u $(git -C $W log --oneline -1) brief=$(grep -c "$H" $W/tmp/units/$u-brief.md) placeholders=$(grep -c LANDING_HEAD $W/tmp/units/$u-brief.md)"
done
