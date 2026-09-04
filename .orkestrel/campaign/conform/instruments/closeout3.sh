#!/bin/bash
# Close-out chain, relaunched after the 15:40 UTC container restart killed closeout2.sh mid-mcp. Keeps the agent,
# brief, and guide rows closeout2 already read in fleet-gates.log; runs the remaining fleet rows, the inventory, and
# scaffold audit --offline in every fleet target. Scaffold's own gate row and its canon audit reading come from the
# roadmap-fix landing (land-followon.sh), which runs the same chain in the canon checkout.
set -u
cd /home/user/scaffold || exit 2
LOG=/home/user/work/logs/closeout3.log
: > "$LOG"
say() { echo "$(date -u +%H:%M:%S) $*" >> "$LOG"; }
I=/home/user/scaffold/.orkestrel/campaign/conform/instruments
say "closeout3 start; fleet-gates.log keeps: $(tr '\n' ';' < /home/user/work/fleet-gates.log)"
bash "$I/fleet-gates.sh" mcp ollama program server toolbox worker workflow probe; say "fleet-gates exit=$? $(tail -1 /home/user/work/fleet-gates.log)"
INVENTORY_OUT=/home/user/scaffold/.orkestrel/campaign/conform/inventory-4.md node "$I/inventory2.mjs" > /home/user/work/logs/inventory-4.log 2>&1; say "inventory exit=$?"
ALL="abort agent brief browser budget codec console contract csv database emitter form guide html indexeddb interpret lsp markdown mcp middleware msg ndjson ollama pool probe process program qualifier queue rater reason relation router sea server sqlite sse table template terminal test timeout tool toolbox websocket worker workflow workspace"
: > /home/user/work/audit-all.log
for p in $ALL; do
  (cd /home/user/fleet/$p && npx scaffold audit --offline > /home/user/work/logs/audit-$p.log 2>&1; echo "$p audit exit=$? $(grep -ciE 'finding|drift|advisory' /home/user/work/logs/audit-$p.log) flagged-lines" >> /home/user/work/audit-all.log)
done
say "audits done: $(grep -c 'exit=0' /home/user/work/audit-all.log) exit-0 rows of $(wc -l < /home/user/work/audit-all.log)"
say "CLOSEOUT3-DONE"
