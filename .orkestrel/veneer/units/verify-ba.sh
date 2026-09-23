#!/bin/bash
# A landing verification: the refresh loop, then the portfolio regeneration with the plain journey, then the authoritative chain.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/verify-ba.log.txt; : > $LOG
sed -e 's/refresh-be/refresh-ba/g' $S/refresh-be.sh > $S/refresh-ba.sh
sed -e 's/regen-portfolio.log.txt/regen-ba.log.txt/' $S/regen-portfolio.sh > $S/regen-ba.sh
sed -e 's/main-be-gates/main-ba-gates/g' -e 's/B-PASSIVE-E landing/B-PASSIVE-A landing/' $S/main-be-gates.sh > $S/main-ba-gates.sh
bash $S/refresh-ba.sh; grep -E "^===" $S/refresh-ba.log.txt >> $LOG
if grep -qE "exit=[1-9]" $S/refresh-ba.log.txt; then echo "=== refresh red; stopping ($(date -u +%H:%M:%S))" >> $LOG; echo "=== verify done" >> $LOG; exit 1; fi
bash $S/regen-ba.sh; grep -E "^===|^[0-9]+$" $S/regen-ba.log.txt >> $LOG
bash $S/main-ba-gates.sh; grep -E "^=== .* exit=|gates done" $S/main-ba-gates.log.txt >> $LOG
echo "=== verify done ($(date -u +%H:%M:%S))" >> $LOG
