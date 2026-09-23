#!/bin/bash
# the ALERT landing (f31f24c on the session branch over a658879) verification after the green fast gates (al-fast-gates.log.txt): the refresh loop, the portfolio regeneration with the plain journey, then the authoritative chain. Log: verify-al.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/verify-al.log.txt; : > $LOG
grep -E "^===" $S/al-fast-gates.log.txt >> $LOG
bash $S/refresh-al.sh; grep -E "^===" $S/refresh-al.log.txt >> $LOG
if grep -qE "exit=[1-9]" $S/refresh-al.log.txt; then echo "=== refresh red; stopping ($(date -u +%H:%M:%S))" >> $LOG; echo "=== verify done" >> $LOG; exit 1; fi
bash $S/regen-al.sh; grep -E "^===|^[0-9]+$" $S/regen-al.log.txt >> $LOG
bash $S/main-al-gates.sh; grep -E "^=== .* exit=|gates done" $S/main-al-gates.log.txt >> $LOG
echo "=== verify done ($(date -u +%H:%M:%S))" >> $LOG
