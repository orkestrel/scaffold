#!/usr/bin/env bash
# Run the dependency pass serially over the named packages, committing the staged-closure register after
# each so the scaffold tree stays clean between packages. Usage: deps-layer2.sh <pkg>...
W=/home/user/scaffold/tmp/work
for p in "$@"; do
  $W/deps-pass.sh "$p"
  bash $W/records-commit.sh $W/msgs/records-register.txt >> /home/user/work/logs/deps-pass.log 2>&1
done
echo "DEPS-LAYER DONE $* $(date -u +%FT%TZ)" >> /home/user/work/logs/deps-pass.log
