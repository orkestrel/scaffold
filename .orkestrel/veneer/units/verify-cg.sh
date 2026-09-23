#!/bin/bash
# the B-PASSIVE-CLOSE family close (CLOSE-REGISTRY, CLOSE-MOTION, and CLOSE-GUIDE on the session branch) landing verification: the refresh loop, then the portfolio regeneration with the plain journey, then the authoritative chain. Log: verify-cg.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/verify-cg.log.txt; : > $LOG
bash $S/refresh-cg.sh; grep -E "^===" $S/refresh-cg.log.txt >> $LOG
if grep -qE "exit=[1-9]" $S/refresh-cg.log.txt; then echo "=== refresh red; stopping ($(date -u +%H:%M:%S))" >> $LOG; echo "=== verify done" >> $LOG; exit 1; fi
bash $S/regen-cg.sh; grep -E "^===|^[0-9]+$" $S/regen-cg.log.txt >> $LOG
bash $S/main-cg-gates.sh; grep -E "^=== .* exit=|gates done" $S/main-cg-gates.log.txt >> $LOG
echo "=== verify done ($(date -u +%H:%M:%S))" >> $LOG
