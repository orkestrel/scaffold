#!/bin/bash
# The approval window for @orkestrel/test 0.0.20 (successor of test-window.sh), per window.md. The npm session from the
# 0.0.19 window is still authenticated (`npm whoami` reports the account), so this window skips the login step: it
# re-reads whoami, then publishes --ignore-scripts with the user's one-time code (argument 1, never logged) under
# script with a fifo stdin so npm never blocks on a terminal. If whoami reports ENEEDAUTH, it stops and records that.
cd /home/user/test || exit 1
CODE="$1"
NPMDIR=/home/user/scaffold/tmp/npm
WLOG=$NPMDIR/test-window-2.log.txt
PLOG=$NPMDIR/test-publish-3.log.txt
: > "$WLOG"; : > "$PLOG"
echo "=== HEAD $(git rev-parse --short HEAD) version $(node -p "require('./package.json').version") $(date -u +%H:%M:%S)" >> "$WLOG"
npm whoami --registry=https://registry.npmjs.org > $NPMDIR/test-whoami-2.txt 2>&1
echo "=== whoami: $(tail -1 $NPMDIR/test-whoami-2.txt)" >> "$WLOG"
if grep -q -E 'ENEEDAUTH|E401|not logged' $NPMDIR/test-whoami-2.txt; then
  echo "=== not authenticated; window stopped before publish" >> "$WLOG"; echo "=== window done" >> "$WLOG"; exit 2
fi
PFIFO=$NPMDIR/test-publish-3.fifo; rm -f "$PFIFO"; mkfifo "$PFIFO"
( sleep 600 > "$PFIFO" ) & PHOLDER=$!
script -qfc "npm publish --ignore-scripts --browser=false --registry=https://registry.npmjs.org --otp=$CODE" "$PLOG" < "$PFIFO"
echo "=== publish exit=$?" >> "$WLOG"
kill $PHOLDER 2>/dev/null
sed -i -E 's/--otp=[0-9]+/--otp=<code>/g' "$PLOG"
echo "=== registry now serves: $(timeout 60 npm view @orkestrel/test version 2>/dev/null)" >> "$WLOG"
echo "=== window done" >> "$WLOG"
