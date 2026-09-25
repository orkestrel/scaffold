#!/usr/bin/env bash
# Round 2: runs the owned test files against 622181f (HEAD), the base sources: saves the unit's four source files, writes
# their HEAD bytes in place, runs the three owned test files once, restores the unit's bytes, and
# checks each restored digest against the digest taken before the swap.
set -u
cd "$(dirname "$0")/../.."
out=tmp/j-sameway
mkdir -p "$out/current"
files="src/browser/Modal.ts src/browser/Offcanvas.ts src/browser/Backdrop.ts src/browser/types.ts"
sha256sum $files > "$out/current/digests.txt"
for f in $files; do cp "$f" "$out/current/$(basename "$f")"; done
for f in $files; do git show "HEAD:$f" > "$f"; done
echo "base digests:" > "$out/base-red-3.summary.log.txt"
sha256sum $files >> "$out/base-red-3.summary.log.txt"
npm run test:src:browser -- tests/src/browser/Modal.test.ts tests/src/browser/Offcanvas.test.ts tests/src/browser/Backdrop.test.ts > "$out/base-red-3.log.txt" 2>&1
echo "run exit $?" >> "$out/base-red-3.summary.log.txt"
for f in $files; do cp "$out/current/$(basename "$f")" "$f"; done
if sha256sum -c "$out/current/digests.txt" >> "$out/base-red-3.summary.log.txt" 2>&1; then
	echo "restored byte for byte" >> "$out/base-red-3.summary.log.txt"
else
	echo "RESTORE FAILED" >> "$out/base-red-3.summary.log.txt"
fi
sed -e 's/\x1b\[[0-9;]*m//g' "$out/base-red-3.log.txt" | grep -E '^ FAIL |Tests  |Test Files' >> "$out/base-red-3.summary.log.txt"
