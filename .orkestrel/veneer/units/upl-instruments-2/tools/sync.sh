#!/usr/bin/env bash
# Copies every owned file from the worktree into the copy under tmp/probe/$COPY (default: fresh).
set -euo pipefail
W=/home/user/veneer-upl
F=$W/tmp/probe/${COPY:-fresh}
for path in $(git -C "$W" status --porcelain | awk '{print $2}'); do
	mkdir -p "$F/$(dirname "$path")"
	cp "$W/$path" "$F/$path"
done
echo synced
