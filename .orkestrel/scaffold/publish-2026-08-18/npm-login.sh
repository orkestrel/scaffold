#!/usr/bin/env bash
# Authenticate npm for the publish wave.
#
# --browser=false makes npm print the verification URL and poll, instead of printing
# "Press ENTER to open in the browser..." and blocking. Never answer that prompt with a
# newline: the web flow consumes it on a later read, drops to a legacy `Username:` prompt,
# and exits ZERO without authenticating.
#
# stdin is a fifo held open by a long sleep and nothing is written to it. EOF drops npm to
# the same legacy prompt a stray newline does.
#
# `script -qfc` gives npm the TTY it requires before it will offer the browser approval.
# Without one it fails EOTP with no way to answer.
#
# Confirm the result with `npm whoami`, never with an exit code — the legacy fallthrough
# exits zero.
set -u
LOG=/home/user/scaffold/tmp/npm-login.log
FIFO=/home/user/scaffold/tmp/npm-login.fifo

rm -f "$FIFO" "$LOG"
mkfifo "$FIFO"
sleep 86400 > "$FIFO" &
HOLDER=$!

script -qfc "npm login --auth-type=web --browser=false" "$LOG" < "$FIFO"
status=$?

kill "$HOLDER" 2>/dev/null
rm -f "$FIFO"
echo "LOGIN_EXIT $status"
echo "WHOAMI: $(npm whoami 2>&1 | tail -1)"
