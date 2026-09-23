#!/bin/bash
# B-FORMS-CLOSE-FORCED landing verification: the refresh loop, then the portfolio regeneration with the plain journey, then the authoritative chain. Log: verify-bff.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/verify-bff.log.txt; : > $LOG
bash $S/refresh-bff.sh; grep -E "^===" $S/refresh-bff.log.txt >> $LOG
if grep -qE "exit=[1-9]" $S/refresh-bff.log.txt; then echo "=== refresh red; stopping ($(date -u +%H:%M:%S))" >> $LOG; echo "=== verify done" >> $LOG; exit 1; fi
bash $S/regen-bff.sh; grep -E "^===|^[0-9]+$" $S/regen-bff.log.txt >> $LOG
bash $S/main-bff-gates.sh; grep -E "^=== .* exit=|gates done" $S/main-bff-gates.log.txt >> $LOG
echo "=== verify done ($(date -u +%H:%M:%S))" >> $LOG
