#!/bin/bash
# Close-out chain, second half: the authoritative gate sweep over the packages whose last chain predates the
# W-END re-stage, then the inventory and scaffold audit --offline in every target. The guide-keyword lanes'
# logs are the readings for the other packages (each ran the same chain on its final tip).
set -u
LOG=/home/user/work/logs/closeout2.log
: > "$LOG"
say() { echo "$(date -u +%H:%M:%S) $*" >> "$LOG"; }
I=/home/user/scaffold/.orkestrel/campaign/conform/instruments
say "closeout2 start"
: > /home/user/work/fleet-gates.log
bash "$I/fleet-gates.sh" agent brief guide mcp ollama program server toolbox worker workflow probe scaffold; say "fleet-gates exit=$? $(tail -1 /home/user/work/fleet-gates.log)"
INVENTORY_OUT=/home/user/scaffold/.orkestrel/campaign/conform/inventory-4.md node "$I/inventory2.mjs" > /home/user/work/logs/inventory-4.log 2>&1; say "inventory exit=$?"
ALL="abort agent brief browser budget codec console contract csv database emitter form guide html indexeddb interpret lsp markdown mcp middleware msg ndjson ollama pool probe process program qualifier queue rater reason relation router sea server sqlite sse table template terminal test timeout tool toolbox websocket worker workflow workspace"
: > /home/user/work/audit-all.log
for p in $ALL; do
  (cd /home/user/fleet/$p && npx scaffold audit --offline > /home/user/work/logs/audit-$p.log 2>&1; echo "$p audit exit=$? $(grep -ciE 'finding|drift|advisory' /home/user/work/logs/audit-$p.log) flagged-lines" >> /home/user/work/audit-all.log)
done
(node dist/bin/main.js audit --offline > /home/user/work/logs/audit-scaffold.log 2>&1; echo "scaffold audit(canon, node dist/bin/main.js) exit=$?" >> /home/user/work/audit-all.log)
say "audits done: $(grep -c 'exit=0' /home/user/work/audit-all.log) exit-0 rows of $(wc -l < /home/user/work/audit-all.log)"
say "CLOSEOUT2-DONE"
