#!/bin/bash
# C landing verification: the refresh loop, then the portfolio regeneration with the plain journey, then the authoritative chain.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/verify-bc.log.txt; : > $LOG
sed -e 's/refresh-be/refresh-bc/g' $S/refresh-be.sh > $S/refresh-bc.sh
sed -e 's/regen-portfolio.log.txt/regen-bc.log.txt/' $S/regen-portfolio.sh > $S/regen-bc.sh
sed -e 's/main-be-gates/main-bc-gates/g' -e 's/B-PASSIVE-E landing/B-PASSIVE-C landing/' $S/main-be-gates.sh > $S/main-bc-gates.sh
bash $S/refresh-bc.sh; grep -E "^===" $S/refresh-bc.log.txt >> $LOG
if grep -qE "exit=[1-9]" $S/refresh-bc.log.txt; then echo "=== refresh red; stopping ($(date -u +%H:%M:%S))" >> $LOG; echo "=== verify done" >> $LOG; exit 1; fi
bash $S/regen-bc.sh; grep -E "^===|^[0-9]+$" $S/regen-bc.log.txt >> $LOG
bash $S/main-bc-gates.sh; grep -E "^=== .* exit=|gates done" $S/main-bc-gates.log.txt >> $LOG
echo "=== verify done ($(date -u +%H:%M:%S))" >> $LOG
