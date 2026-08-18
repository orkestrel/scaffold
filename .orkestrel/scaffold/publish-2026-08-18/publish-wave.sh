#!/usr/bin/env bash
# Publish one package. The window is for uploads: every gate, build, install, and commit
# happens outside it, which is what makes --ignore-scripts the right flag here — the
# artifact was already proved, and the flag stops the gate chain running a second time
# inside the five minutes.
#
# npm offers the browser approval only when it sees a TTY, so every command runs under
# `script -qfc`. stdin is held open by a fifo and nothing is ever written to it: EOF or a
# stray newline drops npm to a legacy Username: prompt that exits ZERO without
# authenticating. --browser=false makes npm print the URL and poll instead of blocking on
# "Press ENTER to open in the browser...".
set -u
DIR="$1"
LOG="$2"
FIFO="${LOG}.fifo"

rm -f "$FIFO"
mkfifo "$FIFO"
# Hold the fifo open for the whole run without writing to it.
sleep 86400 > "$FIFO" &
HOLDER=$!

cd "$DIR" || exit 1
script -qfc "npm publish --access public --browser=false --ignore-scripts" "$LOG" < "$FIFO"
status=$?

kill "$HOLDER" 2>/dev/null
rm -f "$FIFO"
echo "PUBLISH_EXIT $status"
