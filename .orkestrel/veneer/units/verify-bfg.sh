#!/bin/bash
# GROUP landing verification: the refresh loop, then the portfolio regeneration with the plain journey, then the authoritative chain.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/verify-bfg.log.txt; : > $LOG
sed -e 's/refresh-be/refresh-bfg/g' $S/refresh-be.sh > $S/refresh-bfg.sh
sed -e 's/regen-portfolio.log.txt/regen-bfg.log.txt/' $S/regen-portfolio.sh > $S/regen-bfg.sh
sed -e 's/main-be-gates/main-bfg-gates/g' -e 's/B-PASSIVE-E landing/B-FORMS-GROUP landing/' $S/main-be-gates.sh > $S/main-bfg-gates.sh
bash $S/refresh-bfg.sh; grep -E "^===" $S/refresh-bfg.log.txt >> $LOG
if grep -qE "exit=[1-9]" $S/refresh-bfg.log.txt; then echo "=== refresh red; stopping ($(date -u +%H:%M:%S))" >> $LOG; echo "=== verify done" >> $LOG; exit 1; fi
bash $S/regen-bfg.sh; grep -E "^===|^[0-9]+$" $S/regen-bfg.log.txt >> $LOG
bash $S/main-bfg-gates.sh; grep -E "^=== .* exit=|gates done" $S/main-bfg-gates.log.txt >> $LOG
echo "=== verify done ($(date -u +%H:%M:%S))" >> $LOG
