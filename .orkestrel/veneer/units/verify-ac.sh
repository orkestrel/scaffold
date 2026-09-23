#!/bin/bash
# the ACCORDION landing (on the session branch over 55ca0cd) verification after the green fast gates (ac-fast-gates.log.txt): the refresh loop, the portfolio regeneration with the plain journey, then the authoritative chain. Log: verify-ac.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/verify-ac.log.txt; : > $LOG
grep -E "^===" $S/ac-fast-gates.log.txt >> $LOG
bash $S/refresh-ac.sh; grep -E "^===" $S/refresh-ac.log.txt >> $LOG
if grep -qE "exit=[1-9]" $S/refresh-ac.log.txt; then echo "=== refresh red; stopping ($(date -u +%H:%M:%S))" >> $LOG; echo "=== verify done" >> $LOG; exit 1; fi
bash $S/regen-ac.sh; grep -E "^===|^[0-9]+$" $S/regen-ac.log.txt >> $LOG
bash $S/main-ac-gates.sh; grep -E "^=== .* exit=|gates done" $S/main-ac-gates.log.txt >> $LOG
echo "=== verify done ($(date -u +%H:%M:%S))" >> $LOG
