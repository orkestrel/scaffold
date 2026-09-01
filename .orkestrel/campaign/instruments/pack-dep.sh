#!/bin/bash
# Build a fleet package from its clean committed tip and pack it to tmp/tarballs/<pkg>-<commit>.tgz.
# Reuses an existing tarball for the same commit (FORCE=1 rebuilds). Serialized per package with a
# lock so concurrent callers never race on one dist/. Prints the tarball path.
set -e
P=${1:?package}
DIR=/home/user/fleet/$P; [ "$P" = scaffold ] && DIR=/home/user/scaffold
OUT=/home/user/scaffold/tmp/tarballs; mkdir -p "$OUT"
cd "$DIR"
exec 9>"$OUT/.$P.lock"
flock 9
C=$(git rev-parse --short HEAD)
if [ -f "$OUT/$P-$C.tgz" ] && [ "${FORCE:-}" != 1 ]; then echo "$OUT/$P-$C.tgz"; exit 0; fi
[ -z "$(git status --porcelain)" ] || { echo "REFUSE: $P tree is dirty; commit before packing" >&2; exit 1; }
npm run build >"$OUT/$P-$C.build.log" 2>&1 || { echo "BUILD FAILED: see $OUT/$P-$C.build.log" >&2; exit 1; }
NAME=$(node -e "const m=require('./package.json');console.log(m.name.replace('@','').replace('/','-')+'-'+m.version+'.tgz')")
rm -f "$OUT/$NAME"
npm pack --ignore-scripts --pack-destination "$OUT" >"$OUT/$P-$C.pack.log" 2>&1 || { echo "PACK FAILED: see $OUT/$P-$C.pack.log" >&2; exit 1; }
[ -f "$OUT/$NAME" ] || { echo "PACK FAILED: $NAME not produced (see $OUT/$P-$C.pack.log)" >&2; exit 1; }
tar -tzf "$OUT/$NAME" | grep -q 'package/dist/.*\.d\.ts$' || { echo "PACK TRIPWIRE: no declaration file inside $NAME" >&2; rm -f "$OUT/$NAME"; exit 1; }
mv -f "$OUT/$NAME" "$OUT/$P-$C.tgz"
echo "$OUT/$P-$C.tgz"
