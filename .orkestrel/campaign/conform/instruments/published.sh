#!/bin/bash
# Fetch the published tarball of every fleet package and scaffold at its declared version into
# /home/user/work/published/<slug>-<version>/package (the npm pack layout), skipping copies already present.
# Log: /home/user/work/logs/published.log; ends PUBLISHED-DONE.
set -u
LOG=/home/user/work/logs/published.log
: > "$LOG"
mkdir -p /home/user/work/published /home/user/work/published/.tgz
for d in /home/user/fleet/* /home/user/scaffold; do
  name=$(node -p "require('$d/package.json').name"); version=$(node -p "require('$d/package.json').version")
  slug=${name#@}; slug=${slug//\//-}
  dest=/home/user/work/published/$slug-$version
  if [ -d "$dest/package" ]; then echo "$slug-$version present" >> "$LOG"; continue; fi
  if npm pack "$name@$version" --pack-destination /home/user/work/published/.tgz > /dev/null 2>> "$LOG"; then
    mkdir -p "$dest" && tar xzf "/home/user/work/published/.tgz/$slug-$version.tgz" -C "$dest" && echo "$slug-$version fetched" >> "$LOG"
  else
    echo "$slug-$version FAILED" >> "$LOG"
  fi
done
echo "PUBLISHED-DONE $(grep -c fetched "$LOG") fetched, $(grep -c FAILED "$LOG") failed" >> "$LOG"
