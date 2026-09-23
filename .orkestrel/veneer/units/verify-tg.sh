#!/bin/bash
# the TOGGLES landing (on the session branch over the UTIL-DISPLAY landing) verification after the green fast gates (tg-fast-gates.log.txt): the refresh loop, the portfolio regeneration with the plain journey, then the authoritative chain. Log: verify-tg.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/verify-tg.log.txt; : > $LOG
grep -E "^===" $S/tg-fast-gates.log.txt >> $LOG
bash $S/refresh-tg.sh; grep -E "^===" $S/refresh-tg.log.txt >> $LOG
if grep -qE "exit=[1-9]" $S/refresh-tg.log.txt; then echo "=== refresh red; stopping ($(date -u +%H:%M:%S))" >> $LOG; echo "=== verify done" >> $LOG; exit 1; fi
bash $S/regen-tg.sh; grep -E "^===|^[0-9]+$" $S/regen-tg.log.txt >> $LOG
bash $S/main-tg-gates.sh; grep -E "^=== .* exit=|gates done" $S/main-tg-gates.log.txt >> $LOG
echo "=== verify done ($(date -u +%H:%M:%S))" >> $LOG
