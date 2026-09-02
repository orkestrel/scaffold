#!/bin/bash
# Commit and push the README link fix in every fleet checkout whose only change is README.md.
LOG=/home/user/work/logs/commit-readmes.log
: > "$LOG"
MSG=/home/user/work/msg-readme-links.txt
for d in /home/user/fleet/*/; do
	n=$(basename "$d")
	s=$(git -C "$d" status --short)
	[ -z "$s" ] && continue
	if [ "$s" = " M README.md" ]; then
		git -C "$d" add README.md
		git -C "$d" -c user.name=Claude -c user.email=noreply@anthropic.com commit -q -F "$MSG"
		ok=0; for delay in 0 2 4 8 16; do [ $delay -gt 0 ] && sleep $delay; git -C "$d" push -q -u origin claude/orkestrel-npm-audit-deps-14ibta && { ok=1; break; }; done
		echo "$n committed $(git -C "$d" rev-parse --short HEAD) pushed=$ok" >> "$LOG"
	else
		echo "$n SKIPPED status: $(echo "$s" | tr '\n' ';')" >> "$LOG"
	fi
done
echo COMMIT-READMES-DONE >> "$LOG"
