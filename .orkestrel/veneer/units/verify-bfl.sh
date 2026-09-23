#!/bin/bash
# B-FORMS-LABEL-CASCADE (with B-FORMS-LABEL-SHOW and B-PASSIVE-CLOSE-B ahead of it on the session branch) landing verification: the refresh loop, then the portfolio regeneration with the plain journey, then the authoritative chain. Log: verify-bfl.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/verify-bfl.log.txt; : > $LOG
bash $S/refresh-bfl.sh; grep -E "^===" $S/refresh-bfl.log.txt >> $LOG
if grep -qE "exit=[1-9]" $S/refresh-bfl.log.txt; then echo "=== refresh red; stopping ($(date -u +%H:%M:%S))" >> $LOG; echo "=== verify done" >> $LOG; exit 1; fi
bash $S/regen-bfl.sh; grep -E "^===|^[0-9]+$" $S/regen-bfl.log.txt >> $LOG
bash $S/main-bfl-gates.sh; grep -E "^=== .* exit=|gates done" $S/main-bfl-gates.log.txt >> $LOG
echo "=== verify done ($(date -u +%H:%M:%S))" >> $LOG
