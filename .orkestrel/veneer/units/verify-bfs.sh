#!/bin/bash
# B-FORMS-CLOSE-SPECIMENS landing verification: the refresh loop, then the portfolio regeneration with the plain journey, then the authoritative chain. Log: verify-bfs.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/verify-bfs.log.txt; : > $LOG
bash $S/refresh-bfs.sh; grep -E "^===" $S/refresh-bfs.log.txt >> $LOG
if grep -qE "exit=[1-9]" $S/refresh-bfs.log.txt; then echo "=== refresh red; stopping ($(date -u +%H:%M:%S))" >> $LOG; echo "=== verify done" >> $LOG; exit 1; fi
bash $S/regen-bfs.sh; grep -E "^===|^[0-9]+$" $S/regen-bfs.log.txt >> $LOG
bash $S/main-bfs-gates.sh; grep -E "^=== .* exit=|gates done" $S/main-bfs-gates.log.txt >> $LOG
echo "=== verify done ($(date -u +%H:%M:%S))" >> $LOG
