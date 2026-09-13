#!/bin/bash
# range-sweep.sh — wave.md § Visit a repository step 4: force-verify every @orkestrel range a
# target declares against a registry sweep taken now. Prints one row per range; a row whose
# served version falls outside the declared caret is a finding.
set -u
t="$1"
cd "/home/user/$t" || exit 1
node -e '
const p=require("./package.json");
const rows=[];
for (const k of ["dependencies","devDependencies","peerDependencies"]) for (const [n,v] of Object.entries(p[k]||{})) if(n.startsWith("@orkestrel/")) rows.push([k,n,v]);
process.stdout.write(rows.map(r=>r.join("\t")).join("\n")+"\n");
' | while IFS=$'\t' read -r kind name range; do
  served=$(timeout 60 npm view "$name" version 2>/dev/null | tail -1)
  want="^$served"
  if [ "$range" = "$want" ]; then ok=ok; else ok=STALE; fi
  printf '%-16s %-24s declared=%-10s served=%-8s %s\n' "$kind" "$name" "$range" "$served" "$ok"
done
