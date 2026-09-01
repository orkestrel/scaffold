#!/bin/bash
# Stage packed dependency tarballs into a consumer in ONE `npm install --no-save` command (manifest
# and lockfile untouched), and write one register row per tarball.
# Usage: stage-deps.sh <consumer> <tarball>...
set -e
C=${1:?consumer}; shift
[ $# -gt 0 ] || { echo "stage-deps.sh: at least one tarball required" >&2; exit 1; }
DIR=/home/user/fleet/$C; [ "$C" = scaffold ] && DIR=/home/user/scaffold
cd "$DIR"
git diff --quiet -- package.json package-lock.json || { echo "REFUSE: $C manifest or lockfile dirty before staging" >&2; exit 1; }
for T in "$@"; do [ -f "$T" ] || { echo "REFUSE: tarball not found: $T" >&2; exit 1; }; done
mkdir -p /home/user/work/logs
LOG=/home/user/work/logs/stage-$C-$(date -u +%Y%m%dT%H%M%SZ).log
START=$(date +%s)
npm install --no-save --no-audit --no-fund "$@" >"$LOG" 2>&1 || { echo "INSTALL FAILED: see $LOG" >&2; tail -5 "$LOG" >&2; exit 1; }
END=$(date +%s)
git diff --quiet -- package.json package-lock.json || { echo "REFUSE: manifest or lockfile moved during --no-save install" >&2; git diff --stat -- package.json package-lock.json >&2; exit 1; }
REG=/home/user/scaffold/.orkestrel/campaign/fix/tarballs.json
NOW=$(date -u +%Y-%m-%dT%H:%M:%SZ)
for T in "$@"; do
	PKG=$(tar -xzOf "$T" package/package.json | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const m=JSON.parse(s);console.log(m.name+" "+m.version)})')
	NAME=${PKG% *}; VER=${PKG#* }
	RANGE=$(node -e "const m=require('./package.json'); console.log((m.dependencies||{})['$NAME']||(m.devDependencies||{})['$NAME']||(m.peerDependencies||{})['$NAME']||'none')")
	SHA=$(sha256sum "$T" | cut -c1-16)
	BASE=$(basename "$T" .tgz); COMMIT=${BASE##*-}
	node -e '
const fs=require("fs"); const p=process.argv[1]; const rec=JSON.parse(process.argv[2]);
let a=[]; try{a=JSON.parse(fs.readFileSync(p,"utf8"))}catch{}
a=a.filter(x=>!(x.consumer===rec.consumer&&x.dependency===rec.dependency)); a.push(rec);
fs.writeFileSync(p, JSON.stringify(a,null,1)+"\n")' "$REG" "{\"consumer\":\"$C\",\"dependency\":\"$NAME\",\"declared\":\"$RANGE\",\"tarball\":\"$(basename "$T")\",\"version\":\"$VER\",\"sha256\":\"$SHA\",\"commit\":\"$COMMIT\",\"staged\":\"$NOW\"}"
	echo "$C: $NAME $VER staged from $(basename "$T") (declared $RANGE kept)"
done
echo "$C: install took $((END-START))s (log $LOG)"
