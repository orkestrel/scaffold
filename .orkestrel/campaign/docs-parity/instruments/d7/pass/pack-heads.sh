#!/usr/bin/env bash
# pack-heads.sh: builds and packs the guide head start (0.0.18 from the guide branch tip) and probe's tip (database's second head start)
# into $SCR/packed, and prints the dist hash the campaign identifies the final pack by (2b76b363).
set -u
: "${FLEET:?set FLEET}"; : "${SCR:?set SCR}"
mkdir -p "$SCR/packed"
for p in guide probe; do
  (cd "$FLEET/$p" && npm run build >"$SCR/packed/build-$p.log.txt" 2>&1 && npm pack --pack-destination "$SCR/packed" >>"$SCR/packed/build-$p.log.txt" 2>&1 && echo "== $p packed: $(ls "$SCR/packed" | grep "orkestrel-$p-")") || echo "== $p PACK FAILED, see $SCR/packed/build-$p.log.txt"
done
echo "guide dist hash: $(sha256sum "$FLEET/guide/dist/src/core/index.js" | cut -c1-8) (the final pack reads 2b76b363)"
