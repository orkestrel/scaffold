#!/bin/bash
# Build a fleet package from source and pack it to tmp/tarballs/<pkg>-<commit>.tgz. Prints the tarball path.
set -e
P=${1:?package}
DIR=/home/user/fleet/$P; [ "$P" = scaffold ] && DIR=/home/user/scaffold
OUT=/home/user/scaffold/tmp/tarballs; mkdir -p "$OUT"
cd "$DIR"
C=$(git rev-parse --short HEAD)
if [ -f "$OUT/$P-$C.tgz" ] && [ "${FORCE:-}" != 1 ]; then echo "$OUT/$P-$C.tgz"; exit 0; fi
[ -z "$(git status --porcelain)" ] || { echo "REFUSE: $P tree is dirty; commit before packing" >&2; exit 1; }
npm run build >"$OUT/$P-$C.build.log" 2>&1 || { echo "BUILD FAILED: see $OUT/$P-$C.build.log" >&2; exit 1; }
T=$(npm pack --pack-destination "$OUT" --silent 2>/dev/null | tail -1)
mv "$OUT/$T" "$OUT/$P-$C.tgz"
echo "$OUT/$P-$C.tgz"
