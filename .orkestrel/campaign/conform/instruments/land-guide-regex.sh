#!/usr/bin/env bash
# Land unit guide-regex: the deciding gate run, commit, push; retain the evidence under the campaign's units folder.
set -u
export RETAIN_DIR=/home/user/scaffold/.orkestrel/campaign/conform/units/guide-regex
mkdir -p "$RETAIN_DIR"
cd /home/user/scaffold
node tmp/work/land-conform.mjs guide:tmp/work/msgs/guide-regex.txt
cp tmp/units/guide-regex-brief.md tmp/units/guide-regex-report.md "$RETAIN_DIR/" 2>/dev/null
cp /home/user/work/logs/mutate-guide-red.log "$RETAIN_DIR/mutation-probe-red.log" 2>/dev/null
cp /home/user/work/logs/mutate-guide-green.log "$RETAIN_DIR/mutation-probe-green.log" 2>/dev/null
cp tmp/work/mutate-guide.sh "$RETAIN_DIR/mutate-guide.sh"
ls "$RETAIN_DIR"
