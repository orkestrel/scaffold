#!/bin/bash
# W-END: repack every fleet tip (pack-dep reuses a tarball whose commit already exists), then re-stage
# every consumer's closure serially and verify each. Run only when no writer is live in any checkout.
LOG=/home/user/work/logs/wend-repack-restage.log
: > "$LOG"
ALL="abort agent brief browser budget codec console contract csv database emitter form guide html indexeddb interpret lsp markdown mcp middleware msg ndjson ollama pool probe process program qualifier queue rater reason relation router sea server sqlite sse table template terminal test timeout tool toolbox websocket worker workflow workspace scaffold"
for p in $ALL; do
	dir=/home/user/fleet/$p; [ "$p" = scaffold ] && dir=/home/user/scaffold
	if [ -n "$(git -C "$dir" status --porcelain)" ]; then echo "$p DIRTY - not packed" >> "$LOG"; continue; fi
	tb=$(/home/user/work/pack-dep.sh "$p" 2>>"$LOG") && echo "$p packed $(basename "$tb")" >> "$LOG" || echo "$p PACK FAILED" >> "$LOG"
done
for c in $ALL; do
	[ "$c" = scaffold ] && continue
	if /home/user/work/stage-closure.sh "$c" > /home/user/work/logs/stage-wend-$c.log 2>&1; then
		echo "$c staged OK $(grep -c ' OK ' /home/user/work/logs/stage-wend-$c.log) rows" >> "$LOG"
	else
		echo "$c STAGE FAILED $(tail -1 /home/user/work/logs/stage-wend-$c.log)" >> "$LOG"
	fi
done
echo WEND-REPACK-RESTAGE-DONE >> "$LOG"
