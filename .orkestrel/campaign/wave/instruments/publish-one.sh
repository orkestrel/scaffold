#!/bin/bash
# Upload one prepared package under a pty with stdin held open by a fifo (window.md § Arm the terminal).
# Usage: publish-one.sh <pkg> [otp]. With an otp the upload carries --otp=<code> (no browser window); without it npm
# prints an https://www.npmjs.com/auth/cli/<id> URL whose approval opens the five-minute window.
# Log: /home/user/work/wave/publish-<pkg>-<n>.log (n increments per attempt). The verdict is read from the registry.
set -u
export PATH=/opt/npm11/bin:$PATH
P=${1:?package}; OTP=${2:-}
W=/home/user/work/wave
DIR=/home/user/fleet/$P; [ "$P" = scaffold ] && DIR=/home/user/scaffold
cd "$DIR" || exit 2
NAME=$(node -p "require('./package.json').name"); VER=$(node -p "require('./package.json').version")
n=1; while [ -f "$W/publish-$P-$n.log" ]; do n=$((n+1)); done; LOG=$W/publish-$P-$n.log
FIFO=$W/publish-$P.fifo; rm -f "$FIFO"; mkfifo "$FIFO"; ( sleep 1200 > "$FIFO" ) & SP=$!
CMD="npm publish --ignore-scripts --browser=false --registry=https://registry.npmjs.org/"
[ -n "$OTP" ] && CMD="$CMD --otp=$OTP"
script -qfc "$CMD < $FIFO" "$LOG"; rc=$?
kill $SP 2>/dev/null
echo "PUBLISH-EXIT=$rc" >> "$LOG"
sleep 4
echo "$P $VER: registry serves $(npm view "$NAME@$VER" version 2>/dev/null || echo 'nothing yet') (exit=$rc, log $LOG)"
