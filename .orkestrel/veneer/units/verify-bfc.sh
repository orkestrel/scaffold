#!/bin/bash
# CHECK landing verification: the refresh loop, then the portfolio regeneration with the plain journey, then the authoritative chain.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/verify-bfc.log.txt; : > $LOG
sed -e 's/refresh-be/refresh-bfc/g' $S/refresh-be.sh > $S/refresh-bfc.sh
sed -e 's/regen-portfolio.log.txt/regen-bfc.log.txt/' $S/regen-portfolio.sh > $S/regen-bfc.sh
sed -e 's/main-be-gates/main-bfc-gates/g' -e 's/B-PASSIVE-E landing/B-FORMS-CHECK landing/' $S/main-be-gates.sh > $S/main-bfc-gates.sh
bash $S/refresh-bfc.sh; grep -E "^===" $S/refresh-bfc.log.txt >> $LOG
if grep -qE "exit=[1-9]" $S/refresh-bfc.log.txt; then echo "=== refresh red; stopping ($(date -u +%H:%M:%S))" >> $LOG; echo "=== verify done" >> $LOG; exit 1; fi
bash $S/regen-bfc.sh; grep -E "^===|^[0-9]+$" $S/regen-bfc.log.txt >> $LOG
bash $S/main-bfc-gates.sh; grep -E "^=== .* exit=|gates done" $S/main-bfc-gates.log.txt >> $LOG
echo "=== verify done ($(date -u +%H:%M:%S))" >> $LOG
