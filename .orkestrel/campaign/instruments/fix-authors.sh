#!/bin/bash
# Rebuild each fleet repo's unpushed campaign tip commit with the noreply author.
# Guard: only a tip authored by the campaign email, on the campaign branch, is touched.
BR=claude/orkestrel-npm-audit-deps-14ibta
for d in /home/user/fleet/*/; do
  name=$(basename "$d")
  cur=$(git -C "$d" rev-parse --abbrev-ref HEAD 2>/dev/null)
  [ "$cur" = "$BR" ] || { echo "$name SKIP branch=$cur"; continue; }
  ae=$(git -C "$d" log --format=%ae -1)
  if [ "$ae" != "michaelsgarcia1993@gmail.com" ]; then echo "$name SKIP author=$ae"; continue; fi
  git -C "$d" config user.email noreply@anthropic.com
  git -C "$d" config user.name Claude
  tip=$(git -C "$d" rev-parse HEAD)
  parent=$(git -C "$d" rev-parse HEAD^)
  git -C "$d" log --format=%B -1 > /home/user/work/tmpmsg.txt
  new=$(git -C "$d" commit-tree "$tip^{tree}" -p "$parent" -F /home/user/work/tmpmsg.txt)
  git -C "$d" update-ref refs/heads/$BR "$new" "$tip" || { echo "$name FAIL update-ref"; continue; }
  echo "$name OK $(git -C "$d" log --format='%h %ae' -1)"
done
