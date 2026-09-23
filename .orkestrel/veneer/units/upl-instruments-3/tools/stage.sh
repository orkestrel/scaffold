#!/usr/bin/env bash
# Builds a copy of e4e6a40 under tmp/probe/$COPY (default: fresh) as a git repository whose base commit is
# e4e6a40's tree, links node_modules, lays the owned files over it, and applies the round-1 shared
# and consumer patches so round 2 edits the shared files from where round 1 left them.
set -euo pipefail
W=/home/user/veneer-upl
F=$W/tmp/probe/${COPY:-fresh}
rm -rf "$F"; mkdir -p "$F"
git -C "$W" archive e4e6a40 | tar -x -C "$F"
cd "$F"
git init -q
git -c user.name=probe -c user.email=probe@localhost add -A
git -c user.name=probe -c user.email=probe@localhost commit -q -m 'e4e6a40 tree'
cp -al "$W/node_modules" "$F/node_modules"
bash "$W/tmp/units/upl-instruments-3/tools/sync.sh"
if [ "${1:-}" = round1 ]; then
	git apply "$W/tmp/units/upl-shared.patch"
	git apply "$W/tmp/units/upl-consumer.patch"
fi
echo staged "$(git rev-parse HEAD)"
