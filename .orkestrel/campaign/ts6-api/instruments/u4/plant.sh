#!/usr/bin/env bash
# Plants one export-surface divergence in the staged scratch copy of the workspace,
# runs the generated proof against it, and removes the plant. Nothing under
# /home/user/scaffold is written.
set -u
W=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/u4/stage
LOGS=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/u4/logs
mkdir -p "$LOGS"
case "$1" in
	extra)
		TARGET="$W/dist/src/core/index.js"
		LINE='export const PLANTED_EXTRA = true'
		;;
	undeclared)
		TARGET="$W/dist/src/core/index.d.ts"
		LINE='export declare const PLANTED_DECLARED: true'
		;;
	*)
		echo "unknown plant: $1" >&2
		exit 64
		;;
esac
cp "$TARGET" "$TARGET.baseline"
printf '\n%s\n' "$LINE" >> "$TARGET"
cd "$W" || exit 1
node node_modules/vitest/vitest.mjs run --config vitest.config.ts --no-cache --reporter=verbose \
	> "$LOGS/$1.log.txt" 2>&1
echo "vitest exit=$?" >> "$LOGS/$1.log.txt"
mv "$TARGET.baseline" "$TARGET"
echo "plant $1 removed; $TARGET restored"
