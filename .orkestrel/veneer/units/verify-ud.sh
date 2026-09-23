#!/bin/bash
# the UTIL-DISPLAY landing (on the session branch over 7d9d415) verification after the green fast gates (ud-fast-gates.log.txt): the refresh loop, the portfolio regeneration with the plain journey, then the authoritative chain. Log: verify-ud.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/verify-ud.log.txt; : > $LOG
grep -E "^===" $S/ud-fast-gates.log.txt >> $LOG
bash $S/refresh-ud.sh; grep -E "^===" $S/refresh-ud.log.txt >> $LOG
if grep -qE "exit=[1-9]" $S/refresh-ud.log.txt; then echo "=== refresh red; stopping ($(date -u +%H:%M:%S))" >> $LOG; echo "=== verify done" >> $LOG; exit 1; fi
bash $S/regen-ud.sh; grep -E "^===|^[0-9]+$" $S/regen-ud.log.txt >> $LOG
bash $S/main-ud-gates.sh; grep -E "^=== .* exit=|gates done" $S/main-ud-gates.log.txt >> $LOG
echo "=== verify done ($(date -u +%H:%M:%S))" >> $LOG
