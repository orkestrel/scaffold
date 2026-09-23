#!/bin/bash
# L2 LEDGER-PRIORITY landing verification: the refresh loop, then the authoritative chain; no regeneration because L2 registers no frame and the frames from the bfm regeneration stand.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/verify-l2.log.txt; : > $LOG
sed -e 's/refresh-be/refresh-l2/g' $S/refresh-be.sh > $S/refresh-l2.sh
sed -e 's/main-be-gates/main-l2-gates/g' -e 's/B-PASSIVE-E landing/L2 LEDGER-PRIORITY landing/' -e 's/test:guides test:distribution; do/test:guides test:distribution test:service; do/' $S/main-be-gates.sh > $S/main-l2-gates.sh
bash $S/refresh-l2.sh; grep -E "^===" $S/refresh-l2.log.txt >> $LOG
if grep -qE "exit=[1-9]" $S/refresh-l2.log.txt; then echo "=== refresh red; stopping ($(date -u +%H:%M:%S))" >> $LOG; echo "=== verify done" >> $LOG; exit 1; fi
bash $S/main-l2-gates.sh; grep -E "^=== .* exit=|gates done" $S/main-l2-gates.log.txt >> $LOG
echo "=== verify done ($(date -u +%H:%M:%S))" >> $LOG
