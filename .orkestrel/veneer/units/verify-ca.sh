#!/bin/bash
# the CAROUSEL landing (2071f8f on the session branch over 4977d09) verification after the green fast gates (ca-fast-gates.log.txt): the refresh loop, the portfolio regeneration with the plain journey, then the authoritative chain. Log: verify-ca.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/verify-ca.log.txt; : > $LOG
grep -E "^===" $S/ca-fast-gates.log.txt >> $LOG
bash $S/refresh-ca.sh; grep -E "^===" $S/refresh-ca.log.txt >> $LOG
if grep -qE "exit=[1-9]" $S/refresh-ca.log.txt; then echo "=== refresh red; stopping ($(date -u +%H:%M:%S))" >> $LOG; echo "=== verify done" >> $LOG; exit 1; fi
bash $S/regen-ca.sh; grep -E "^===|^[0-9]+$" $S/regen-ca.log.txt >> $LOG
bash $S/main-ca-gates.sh; grep -E "^=== .* exit=|gates done" $S/main-ca-gates.log.txt >> $LOG
echo "=== verify done ($(date -u +%H:%M:%S))" >> $LOG
