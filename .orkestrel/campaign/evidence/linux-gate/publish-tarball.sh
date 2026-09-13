#!/bin/bash
# publish-tarball.sh — successor of publish.sh for the scaffold upload: publishes a PRE-PACKED
# tarball so no pack time sits inside the one-time code's life, and caps the run at 150 s so a
# refused code fails fast instead of hanging on npm's interactive OTP prompt behind the fifo.
# Argument 1 is the tarball path. Argument 2 is the one-time code.
set -u
tgz="$1"; code="$2"
cd /home/user/scaffold || exit 1
LOG="/home/user/scaffold/tmp/release/publish-scaffold-2.log.txt"
FIFO="/home/user/scaffold/tmp/release/publish-scaffold-2.fifo"
rm -f "$FIFO"; mkfifo "$FIFO"
sleep 300 > "$FIFO" &
HOLDER=$!
timeout 150 script -qfc "npm publish $tgz --ignore-scripts --browser=false --otp=$code" "$LOG" < "$FIFO"
status=$?
kill "$HOLDER" 2>/dev/null
echo "publish exit=$status"
sed 's/\x1b\[[0-9;]*m//g; s/\r/\n/g' "$LOG" | grep -E "^\+ @orkestrel/|EOTP|E403|E404|E409|being processed|one-time password" | head -5
