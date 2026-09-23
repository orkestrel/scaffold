#!/bin/bash
# the disclosure landing (a1b12ab dd, 77bb770 nv, 041925c co on the session branch over e4e6a40) verification after the green fast gates (dx-fast-gates.log.txt): the refresh loop, the portfolio regeneration with the plain journey, then the authoritative chain. Log: verify-dx.log.txt
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; LOG=$S/verify-dx.log.txt; : > $LOG
grep -E "^===" $S/dx-fast-gates.log.txt >> $LOG
bash $S/refresh-dx.sh; grep -E "^===" $S/refresh-dx.log.txt >> $LOG
if grep -qE "exit=[1-9]" $S/refresh-dx.log.txt; then echo "=== refresh red; stopping ($(date -u +%H:%M:%S))" >> $LOG; echo "=== verify done" >> $LOG; exit 1; fi
bash $S/regen-dx.sh; grep -E "^===|^[0-9]+$" $S/regen-dx.log.txt >> $LOG
bash $S/main-dx-gates.sh; grep -E "^=== .* exit=|gates done" $S/main-dx-gates.log.txt >> $LOG
echo "=== verify done ($(date -u +%H:%M:%S))" >> $LOG
