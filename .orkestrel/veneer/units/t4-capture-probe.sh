#!/bin/bash
# t4-capture-probe.sh VARIANT...: regenerate the named Veneer journey variants with the packed harness fix, in a probe
# worktree that never touches /home/user/veneer. The worktree sits at the Veneer session tip with the frame-band edit
# (upl-landing-frame-band.py) applied; its node_modules is a hard-linked copy of the checkout's with the Vite caches and
# the `@orkestrel/test` directory removed and the packed tarball ($TARBALL, default the round-2 pack) extracted in its
# place, so no hard-linked file is written. The source is built once. Each variant logs to
# t4-capture-probe-<variant>.log.txt; the census's first refusal per variant and a floor table over every frame the
# run wrote print to stdout (kept as t4-capture-probe.txt).
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; U=/home/user/scaffold/.orkestrel/veneer/units; W=$S/probe-capture
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
TARBALL=${TARBALL:-$S/t4/orkestrel-test-0.0.20.tgz}
if [ ! -d $W ]; then
  TIP=$(git -C /home/user/veneer rev-parse --short HEAD)
  git -C /home/user/veneer worktree add -q --detach $W $TIP || exit 1
  python3 $U/upl-landing-frame-band.py $W || exit 2
  cp -al /home/user/veneer/node_modules $W/node_modules && rm -rf $W/node_modules/.vite $W/node_modules/.vitest $W/node_modules/.cache
  rm -rf $W/node_modules/@orkestrel/test && mkdir -p $S/t4/x && rm -rf $S/t4/x/* && tar -xzf $TARBALL -C $S/t4/x && mv $S/t4/x/package $W/node_modules/@orkestrel/test || exit 3
  echo "=== worktree at $TIP with the band; harness $(grep -c 'clipsOverflow' $W/node_modules/@orkestrel/test/dist/src/browser/index.js) clipsOverflow sites from $(basename $TARBALL)"
  (cd $W && npm run build:src > $S/t4-capture-probe-build.log.txt 2>&1; echo "=== build:src exit=$?")
fi
cd $W || exit 1
for v in "$@"; do
  LOG=$U/t4-capture-probe-$v.log.txt
  CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:$v*" > $LOG 2>&1; code=$?
  echo "=== $v exit=$code ($(date -u +%H:%M:%S)) $(grep -E '^ +Tests ' $LOG | sed 's/\x1b\[[0-9;]*m//g' | tr -s ' ' | tail -1)"
  sed 's/\x1b\[[0-9;]*m//g' $LOG | grep -E 'Error: Capture frame|Blank frame region|AssertionError' | sort -u | head -4
done
python3 - "$W" "$@" <<'PY'
import struct, zlib, glob, os, sys
W = sys.argv[1]
def floor(p):
    d = open(p, 'rb').read(); pos = 8; idat = b''
    while pos < len(d):
        ln = struct.unpack('>I', d[pos:pos+4])[0]; t = d[pos+4:pos+8]; b = d[pos+8:pos+8+ln]
        if t == b'IHDR': w, h, bit, ct = struct.unpack('>IIBB', b[:10])
        if t == b'IDAT': idat += b
        pos += 12 + ln
    raw = zlib.decompress(idat); ch = {2: 3, 6: 4}[ct]; st = w * ch; prev = bytearray(st); i = 0
    def pa(a, b, c):
        p, q, r = abs(b - c), abs(a - c), abs(a + b - 2 * c); return a if p <= q and p <= r else (b if q <= r else c)
    for y in range(h):
        f = raw[i]; ln = bytearray(raw[i+1:i+1+st]); i += 1 + st
        for x in range(st):
            a = ln[x-ch] if x >= ch else 0; b = prev[x]; c = prev[x-ch] if x >= ch else 0
            if f == 1: ln[x] = (ln[x] + a) & 255
            elif f == 2: ln[x] = (ln[x] + b) & 255
            elif f == 3: ln[x] = (ln[x] + (a + b) // 2) & 255
            elif f == 4: ln[x] = (ln[x] + pa(a, b, c)) & 255
        prev = ln
    cols = {tuple(prev[x:x+ch]) for x in range(0, st, ch)}
    return w, h, len(cols)
for v in sys.argv[2:]:
    bad = []
    for p in sorted(glob.glob(f'{W}/tmp/capture/states/*--{v}.png')):
        w, h, n = floor(p)
        if n != 1: bad.append(f'{os.path.basename(p)} {w}x{h} floor colours {n}')
    print(f'--- {v}: frames with no uniform floor row: {len(bad)}')
    for b in bad: print('   ', b)
PY
echo "=== probe done ($(date -u +%H:%M:%S))"
