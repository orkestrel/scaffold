#!/bin/bash
# B-FORMS-RENAME landing verification: the refresh loop, then the authoritative chain; no regeneration because the compile is byte-identical and the frames from the CONTROL regeneration stand.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/verify-bfr.log.txt; : > $LOG
sed -e 's/refresh-be/refresh-bfr/g' $S/refresh-be.sh > $S/refresh-bfr.sh
sed -e 's/main-be-gates/main-bfr-gates/g' -e 's/B-PASSIVE-E landing/B-FORMS-RENAME landing/' -e 's/test:guides test:distribution; do/test:guides test:distribution test:service; do/' $S/main-be-gates.sh > $S/main-bfr-gates.sh
bash $S/refresh-bfr.sh; grep -E "^===" $S/refresh-bfr.log.txt >> $LOG
if grep -qE "exit=[1-9]" $S/refresh-bfr.log.txt; then echo "=== refresh red; stopping ($(date -u +%H:%M:%S))" >> $LOG; echo "=== verify done" >> $LOG; exit 1; fi
bash $S/main-bfr-gates.sh; grep -E "^=== .* exit=|gates done" $S/main-bfr-gates.log.txt >> $LOG
echo "=== verify done ($(date -u +%H:%M:%S))" >> $LOG
