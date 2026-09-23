#!/bin/bash
# the UTIL-SPACER (746d3e9 on the session branch) landing verification: the fast gates, the refresh loop, the portfolio regeneration with the plain journey, then the authoritative chain. Log: verify-us.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/verify-us.log.txt; : > $LOG
bash $S/us-fast-gates.sh; grep -E "^===" $S/us-fast-gates.log.txt >> $LOG
if grep -qE "exit=[1-9]" $S/us-fast-gates.log.txt; then echo "=== fast gates red; stopping ($(date -u +%H:%M:%S))" >> $LOG; echo "=== verify done" >> $LOG; exit 1; fi
bash $S/refresh-us.sh; grep -E "^===" $S/refresh-us.log.txt >> $LOG
if grep -qE "exit=[1-9]" $S/refresh-us.log.txt; then echo "=== refresh red; stopping ($(date -u +%H:%M:%S))" >> $LOG; echo "=== verify done" >> $LOG; exit 1; fi
bash $S/regen-us.sh; grep -E "^===|^[0-9]+$" $S/regen-us.log.txt >> $LOG
bash $S/main-us-gates.sh; grep -E "^=== .* exit=|gates done" $S/main-us-gates.log.txt >> $LOG
echo "=== verify done ($(date -u +%H:%M:%S))" >> $LOG
