#!/bin/bash
# The approval window for @orkestrel/test 0.0.19, per window.md: login under script with a fifo stdin and --browser=false,
# then, the moment the login log reports success, whoami and publish --ignore-scripts with the user's one-time code (argument 1, never logged).
cd /home/user/test || exit 1
CODE="$1"
NPMDIR=/home/user/scaffold/tmp/npm
LOG=$NPMDIR/test-login.log.txt
PLOG=$NPMDIR/test-publish.log.txt
: > "$LOG"; : > "$PLOG"
FIFO=$NPMDIR/test-login.fifo; rm -f "$FIFO"; mkfifo "$FIFO"
( sleep 900 > "$FIFO" ) & HOLDER=$!
script -qfc 'npm login --browser=false --registry=https://registry.npmjs.org' "$LOG" < "$FIFO" &
LOGIN=$!
echo "login pid $LOGIN holder $HOLDER" > $NPMDIR/test-window.pid
for i in $(seq 1 180); do
  if grep -q -E 'Logged in|Username:|E403|ENEEDAUTH' "$LOG" 2>/dev/null; then break; fi
  sleep 1
done
echo "=== login state after wait: $(grep -o -E 'Logged in[^\r]*|Username:|E403|ENEEDAUTH' "$LOG" | head -1)" >> $NPMDIR/test-window.log.txt
npm whoami --registry=https://registry.npmjs.org > $NPMDIR/test-whoami.txt 2>&1
echo "=== whoami: $(cat $NPMDIR/test-whoami.txt | tail -1)" >> $NPMDIR/test-window.log.txt
if grep -q 'Logged in' "$LOG"; then
  PFIFO=$NPMDIR/test-publish.fifo; rm -f "$PFIFO"; mkfifo "$PFIFO"
  ( sleep 600 > "$PFIFO" ) & PHOLDER=$!
  script -qfc "npm publish --ignore-scripts --browser=false --registry=https://registry.npmjs.org --otp=$CODE" "$PLOG" < "$PFIFO"
  echo "=== publish exit=$?" >> $NPMDIR/test-window.log.txt
  kill $PHOLDER 2>/dev/null
fi
kill $HOLDER 2>/dev/null
echo "=== window done" >> $NPMDIR/test-window.log.txt
