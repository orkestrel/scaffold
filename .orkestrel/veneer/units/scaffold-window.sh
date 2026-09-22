#!/bin/bash
# The approval window for @orkestrel/scaffold 0.0.77, per window.md. The npm session is authenticated (`npm whoami`
# reports the account), so this window re-reads whoami, then publishes --ignore-scripts with the user's one-time code
# (argument 1, never logged) under script with a fifo stdin so npm never blocks on a terminal. If whoami reports
# ENEEDAUTH, it stops and records that. The code is scrubbed from the publish log afterwards.
cd /home/user/scaffold || exit 1
CODE="$1"
N=/home/user/scaffold/tmp/npm
WLOG=$N/scaffold-window.log.txt
PLOG=$N/scaffold-publish.log.txt
: > "$WLOG"; : > "$PLOG"
echo "=== HEAD $(git rev-parse --short HEAD) version $(node -p "require('./package.json').version") $(date -u +%H:%M:%S)" >> "$WLOG"
npm whoami --registry=https://registry.npmjs.org > $N/scaffold-whoami.txt 2>&1
echo "=== whoami: $(tail -1 $N/scaffold-whoami.txt)" >> "$WLOG"
if grep -q -E 'ENEEDAUTH|E401|not logged' $N/scaffold-whoami.txt; then echo "=== not authenticated; window stopped before publish" >> "$WLOG"; echo "=== window done" >> "$WLOG"; exit 2; fi
PFIFO=$N/scaffold-publish.fifo; rm -f "$PFIFO"; mkfifo "$PFIFO"
( sleep 600 > "$PFIFO" ) & PHOLDER=$!
script -qfc "npm publish --ignore-scripts --browser=false --registry=https://registry.npmjs.org --otp=$CODE" "$PLOG" < "$PFIFO"
echo "=== publish exit=$?" >> "$WLOG"
kill $PHOLDER 2>/dev/null
sed -i -E 's/--otp=[0-9]+/--otp=<code>/g' "$PLOG"
echo "=== registry now serves: $(timeout 60 npm view @orkestrel/scaffold version 2>/dev/null)" >> "$WLOG"
echo "=== window done" >> "$WLOG"
