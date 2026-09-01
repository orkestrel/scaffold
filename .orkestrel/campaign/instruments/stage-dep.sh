#!/bin/bash
# Install a packed dependency tarball into a consumer with --no-save (manifest and lockfile untouched),
# and record the swap in the campaign register. Usage: stage-dep.sh <consumer> <tarball>
set -e
C=${1:?consumer}; T=${2:?tarball}
DIR=/home/user/fleet/$C; [ "$C" = scaffold ] && DIR=/home/user/scaffold
cd "$DIR"
PKG=$(tar -xzOf "$T" package/package.json | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const m=JSON.parse(s);console.log(m.name+" "+m.version)})')
NAME=${PKG% *}; VER=${PKG#* }
RANGE=$(node -e "const m=require('./package.json'); console.log((m.dependencies||{})['$NAME']||(m.devDependencies||{})['$NAME']||(m.peerDependencies||{})['$NAME']||'none')")
SHA=$(sha256sum "$T" | cut -c1-16)
npm install --no-save "$T" >/home/user/work/logs/stage-$C-$(basename "$T" .tgz).log 2>&1
git diff --quiet -- package.json package-lock.json || { echo "REFUSE: manifest or lockfile moved during --no-save install" >&2; git diff --stat -- package.json package-lock.json >&2; exit 1; }
REG=/home/user/scaffold/.orkestrel/campaign/fix/tarballs.json
node -e '
const fs=require("fs"); const p=process.argv[1]; const rec=JSON.parse(process.argv[2]);
let a=[]; try{a=JSON.parse(fs.readFileSync(p,"utf8"))}catch{}
a=a.filter(x=>!(x.consumer===rec.consumer&&x.dependency===rec.dependency)); a.push(rec);
fs.writeFileSync(p, JSON.stringify(a,null,1)+"\n")' "$REG" "{\"consumer\":\"$C\",\"dependency\":\"$NAME\",\"declared\":\"$RANGE\",\"tarball\":\"$(basename "$T")\",\"version\":\"$VER\",\"sha256\":\"$SHA\",\"staged\":\"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"}"
echo "$C: $NAME $VER staged from $(basename "$T") (declared $RANGE kept)"
