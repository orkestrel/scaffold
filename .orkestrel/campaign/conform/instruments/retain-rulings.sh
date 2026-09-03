#!/usr/bin/env bash
# Copy the assembled rulings for the named packages into the campaign folder and refresh remaining.json.
# Usage: retain-rulings.sh <pkg>...
set -u
C=/home/user/scaffold/.orkestrel/campaign/conform
for p in "$@"; do cp /home/user/work/reports/conform-$p.json $C/rulings/conform-$p.json && echo "retained conform-$p.json"; done
node /home/user/scaffold/tmp/work/remaining.mjs "$@"
cat $C/ledgers/remaining.json
echo
