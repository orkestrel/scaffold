#!/bin/bash
# B-FORMS-CONTROL landing verification, third run after the round-5 fix landed: the refresh loop, then the portfolio regeneration with the plain journey, then the authoritative chain.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/verify-bfo-3.log.txt; : > $LOG
sed -e 's/refresh-be/refresh-bfo/g' $S/refresh-be.sh > $S/refresh-bfo.sh
sed -e 's/regen-portfolio.log.txt/regen-bfo.log.txt/' $S/regen-portfolio.sh > $S/regen-bfo.sh
sed -e 's/main-be-gates/main-bfo-gates/g' -e 's/B-PASSIVE-E landing/B-FORMS-CONTROL landing/' -e 's/test:guides test:distribution; do/test:guides test:distribution test:service; do/' $S/main-be-gates.sh > $S/main-bfo-gates.sh
bash $S/refresh-bfo.sh; grep -E "^===" $S/refresh-bfo.log.txt >> $LOG
if grep -qE "exit=[1-9]" $S/refresh-bfo.log.txt; then echo "=== refresh red; stopping ($(date -u +%H:%M:%S))" >> $LOG; echo "=== verify done" >> $LOG; exit 1; fi
bash $S/regen-bfo.sh; grep -E "^===|^[0-9]+$" $S/regen-bfo.log.txt >> $LOG
bash $S/main-bfo-gates.sh; grep -E "^=== .* exit=|gates done" $S/main-bfo-gates.log.txt >> $LOG
echo "=== verify done ($(date -u +%H:%M:%S))" >> $LOG
