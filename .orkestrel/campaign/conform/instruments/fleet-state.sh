#!/usr/bin/env bash
# Per checkout: branch, cleanliness, fetch origin/main, ahead/behind, version, @orkestrel ranges.
OUT=/home/user/work/fleet-state.txt; : > $OUT
for d in /home/user/fleet/*/; do
  p=$(basename $d)
  br=$(git -C $d branch --show-current)
  dirty=$(git -C $d status --short | grep -v '^?? tmp/' | wc -l)
  git -C $d fetch -q origin main 2>>/home/user/work/logs/fleet-state.err
  ahead=$(git -C $d rev-list --count origin/main..HEAD 2>/dev/null)
  behind=$(git -C $d rev-list --count HEAD..origin/main 2>/dev/null)
  ver=$(node -e "console.log(require('$d/package.json').version)")
  echo "$p branch=$br dirty=$dirty ahead=$ahead behind=$behind version=$ver" >> $OUT
done
echo "DONE" >> $OUT
