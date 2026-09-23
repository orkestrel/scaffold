#!/bin/bash
# F8d IMPORTANCE-LONGHANDS landing verification: the refresh loop, then the authoritative chain; no regeneration because F8d registers no frame and the frames from the bfm regeneration stand.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/verify-f8d.log.txt; : > $LOG
sed -e 's/refresh-be/refresh-f8d/g' $S/refresh-be.sh > $S/refresh-f8d.sh
sed -e 's/main-be-gates/main-f8d-gates/g' -e 's/B-PASSIVE-E landing/F8d IMPORTANCE-LONGHANDS landing/' -e 's/test:guides test:distribution; do/test:guides test:distribution test:service; do/' $S/main-be-gates.sh > $S/main-f8d-gates.sh
bash $S/refresh-f8d.sh; grep -E "^===" $S/refresh-f8d.log.txt >> $LOG
if grep -qE "exit=[1-9]" $S/refresh-f8d.log.txt; then echo "=== refresh red; stopping ($(date -u +%H:%M:%S))" >> $LOG; echo "=== verify done" >> $LOG; exit 1; fi
bash $S/main-f8d-gates.sh; grep -E "^=== .* exit=|gates done" $S/main-f8d-gates.log.txt >> $LOG
echo "=== verify done ($(date -u +%H:%M:%S))" >> $LOG
