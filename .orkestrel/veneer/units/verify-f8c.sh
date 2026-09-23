#!/bin/bash
# F8c landing verification: the refresh loop, then the portfolio regeneration with the plain journey, then the authoritative chain.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/verify-f8c.log.txt; : > $LOG
sed -e 's/refresh-be/refresh-f8c/g' $S/refresh-be.sh > $S/refresh-f8c.sh
sed -e 's/regen-portfolio.log.txt/regen-f8c.log.txt/' $S/regen-portfolio.sh > $S/regen-f8c.sh
sed -e 's/main-be-gates/main-f8c-gates/g' -e 's/B-PASSIVE-E landing/F8 SERVICE landing/' -e 's/test:guides test:distribution; do/test:guides test:distribution test:service; do/' $S/main-be-gates.sh > $S/main-f8c-gates.sh
bash $S/refresh-f8c.sh; grep -E "^===" $S/refresh-f8c.log.txt >> $LOG
if grep -qE "exit=[1-9]" $S/refresh-f8c.log.txt; then echo "=== refresh red; stopping ($(date -u +%H:%M:%S))" >> $LOG; echo "=== verify done" >> $LOG; exit 1; fi
bash $S/regen-f8c.sh; grep -E "^===|^[0-9]+$" $S/regen-f8c.log.txt >> $LOG
bash $S/main-f8c-gates.sh; grep -E "^=== .* exit=|gates done" $S/main-f8c-gates.log.txt >> $LOG
echo "=== verify done ($(date -u +%H:%M:%S))" >> $LOG
