#!/bin/bash
# the UTIL-PLACEMENT landing (on the session branch over the TOGGLES landing) verification after the green fast gates (upl-fast-gates.log.txt): the refresh loop, the portfolio regeneration with the plain journey, then the authoritative chain. Log: verify-upl.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/verify-upl.log.txt; : > $LOG
grep -E "^===" $S/upl-fast-gates.log.txt >> $LOG
bash $S/refresh-upl.sh; grep -E "^===" $S/refresh-upl.log.txt >> $LOG
if grep -qE "exit=[1-9]" $S/refresh-upl.log.txt; then echo "=== refresh red; stopping ($(date -u +%H:%M:%S))" >> $LOG; echo "=== verify done" >> $LOG; exit 1; fi
bash $S/regen-upl.sh; grep -E "^===|^[0-9]+$" $S/regen-upl.log.txt >> $LOG
bash $S/main-upl-gates.sh; grep -E "^=== .* exit=|gates done" $S/main-upl-gates.log.txt >> $LOG
echo "=== verify done ($(date -u +%H:%M:%S))" >> $LOG
