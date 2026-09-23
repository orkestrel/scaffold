#!/usr/bin/env bash
# Writes the shared-file patch: every shared file in the validation copy against its c3ac297 bytes
# (the validation copy's own base commit), then proves it applies to c3ac297: the patch is reversed
# out of the copy, the shared files are confirmed back at c3ac297, `git apply --check` runs, and the
# patch is applied again and the shared files confirmed at their patched digests.
set -u
W=/home/user/veneer-ca
B=$W/tmp/probe/base
OUT=$W/tmp/units/ca-shared-2.patch
L=$W/tmp/units/ca-instruments-2/logs/patch.log.txt
SHARED="src/styles/index.scss app/browser/constants.ts app/browser/Showcase.ts app/browser/index.ts tests/setup.ts tests/setupStyles.ts tests/setupStyles.test.ts tests/app/browser/integration.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts tests/conformance.test.ts tests/setupServer.test.ts guides/veneer.md"
: > $L
git -C $B diff -- $SHARED > $OUT
echo "patch written: $OUT" >> $L
echo "file list:" >> $L
grep '^diff --git' $OUT | sed 's/^diff --git a\/\(.*\) b\/.*/\1/' >> $L
LIST=$(grep '^diff --git' $OUT | sed 's/^diff --git a\/\(.*\) b\/.*/\1/' | sort | tr '\n' ' ')
WANT=$(echo $SHARED | tr ' ' '\n' | sort | tr '\n' ' ')
[ "$LIST" = "$WANT" ] && echo "file list equals the Shared row" >> $L || echo "FILE LIST DIFFERS: $LIST" >> $L
git -C $B apply --stat $OUT >> $L 2>&1
BEFORE=$(cd $B && sha256sum $SHARED | sha256sum)
git -C $B apply -R $OUT; echo "git -C $B apply -R $OUT exit=$?" >> $L
git -C $B diff --quiet -- $SHARED; echo "shared files at c3ac297 (git diff --quiet) exit=$?" >> $L
git -C $B apply --check $OUT; echo "git -C $B apply --check $OUT exit=$?" >> $L
git -C $B apply $OUT; echo "git -C $B apply $OUT exit=$?" >> $L
AFTER=$(cd $B && sha256sum $SHARED | sha256sum)
[ "$BEFORE" = "$AFTER" ] && echo "shared files back at their patched digests" >> $L || echo "DIGEST MISMATCH" >> $L
cat $L
