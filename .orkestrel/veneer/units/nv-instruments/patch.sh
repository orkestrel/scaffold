#!/bin/bash
# Writes the nv unit's shared-file patch (stage against 72fdde4) to nv-unit/shared.patch and dry-runs it.
SC=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad
cd $SC/nv-base
out=$SC/nv-unit/shared.patch; : > $out
for f in $(find . -type f | sed 's|^\./||' | sort); do
  diff -u --label "a/$f" --label "b/$f" "$f" "$SC/nv-stage/$f" >> $out
done
rm -rf $SC/nv-unit/dry && cp -r $SC/nv-base $SC/nv-unit/dry && patch -p1 --dry-run -d $SC/nv-unit/dry < $out
rm -rf $SC/nv-unit/dry
grep '^+++ ' $out
