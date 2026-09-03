#!/bin/bash
# After the canon lands: pack every clean fleet tip and scaffold, re-stage every consumer's closure
# from those tips in one install each, verify, then propagate the refined canon into every target with
# `scaffold overwrite --offline` from the staged scaffold and commit the vendored moves per target.
# Run only when no writer is live in any checkout. Log: /home/user/work/logs/repack-2.log
LOG=/home/user/work/logs/repack-2.log
: > "$LOG"
ALL="abort agent brief browser budget codec console contract csv database emitter form guide html indexeddb interpret lsp markdown mcp middleware msg ndjson ollama pool probe process program qualifier queue rater reason relation router sea server sqlite sse table template terminal test timeout tool toolbox websocket worker workflow workspace scaffold"
mkdir -p /home/user/scaffold/.orkestrel/campaign/fix
for p in $ALL; do
	dir=/home/user/fleet/$p; [ "$p" = scaffold ] && dir=/home/user/scaffold
	if [ -n "$(git -C "$dir" status --porcelain)" ]; then echo "$p DIRTY - not packed" >> "$LOG"; continue; fi
	tb=$(/home/user/work/pack-dep.sh "$p" 2>>"$LOG") && echo "$p packed $(basename "$tb")" >> "$LOG" || echo "$p PACK FAILED" >> "$LOG"
done
SCAFFOLD_TGZ=$(ls -t /home/user/scaffold/tmp/tarballs/scaffold-*.tgz | head -1)
echo "scaffold tarball for propagation: $SCAFFOLD_TGZ" >> "$LOG"
for c in $ALL; do
	dir=/home/user/fleet/$c; [ "$c" = scaffold ] && dir=/home/user/scaffold
	# Stage the closure plus scaffold's own tarball so `overwrite --offline` reads the refined canon.
	SET=$(node /home/user/work/stage-set.mjs "$c")
	TARBALLS=""
	for p in $SET; do tb=$(/home/user/work/pack-dep.sh "$p") || { echo "$c PACK FAILED for $p" >> "$LOG"; continue 2; }; TARBALLS="$TARBALLS $tb"; done
	[ "$c" = scaffold ] || TARBALLS="$TARBALLS $SCAFFOLD_TGZ"
	if /home/user/work/stage-deps.sh "$c" $TARBALLS > /home/user/work/logs/stage-2-$c.log 2>&1 && node /home/user/work/verify-stage.mjs "$c" >> /home/user/work/logs/stage-2-$c.log 2>&1; then
		echo "$c staged OK" >> "$LOG"
	else
		echo "$c STAGE FAILED $(tail -1 /home/user/work/logs/stage-2-$c.log)" >> "$LOG"; continue
	fi
	[ "$c" = scaffold ] && continue
	# Propagate: overwrite --offline exits 1 with the catalog refusal; the file moves are the evidence.
	( cd "$dir" && node node_modules/@orkestrel/scaffold/dist/bin/main.js overwrite --offline > /home/user/work/logs/overwrite-2-$c.log 2>&1 ); ow=$?
	moved=$(git -C "$dir" status --porcelain | wc -l)
	echo "$c overwrite exit=$ow moved=$moved" >> "$LOG"
	if git -C "$dir" status --porcelain | grep -qE 'package(-lock)?\.json'; then
		echo "$c MANIFEST MOVED - not committed, left for the Orchestrator" >> "$LOG"; git -C "$dir" status --porcelain >> "$LOG"; continue
	fi
	if [ "$moved" -gt 0 ]; then
		git -C "$dir" status --porcelain >> "$LOG"
		git -C "$dir" add -A && git -C "$dir" -c user.name=Claude -c user.email=noreply@anthropic.com commit -q -F /home/user/work/msg-propagate.txt && git -C "$dir" push -q -u origin claude/orkestrel-npm-audit-deps-14ibta && echo "$c propagated $(git -C "$dir" rev-parse --short HEAD)" >> "$LOG" || echo "$c PROPAGATE COMMIT FAILED" >> "$LOG"
	fi
done
echo REPACK-2-DONE >> "$LOG"
