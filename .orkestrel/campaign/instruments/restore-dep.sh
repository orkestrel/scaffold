#!/bin/bash
# Restore the registry copy of every dependency in a consumer from its committed lockfile, and clear its register rows.
set -e
C=${1:?consumer}
DIR=/home/user/fleet/$C; [ "$C" = scaffold ] && DIR=/home/user/scaffold
cd "$DIR"
git diff --quiet -- package.json package-lock.json || { echo "REFUSE: manifest or lockfile dirty" >&2; exit 1; }
npm ci --no-audit --no-fund >/home/user/work/logs/restore-$C.log 2>&1
REG=/home/user/scaffold/.orkestrel/campaign/fix/tarballs.json
node -e '
const fs=require("fs"); const p=process.argv[1]; const c=process.argv[2];
let a=[]; try{a=JSON.parse(fs.readFileSync(p,"utf8"))}catch{}
fs.writeFileSync(p, JSON.stringify(a.filter(x=>x.consumer!==c),null,1)+"\n")' "$REG" "$C"
echo "$C: registry copies restored from the lockfile"
