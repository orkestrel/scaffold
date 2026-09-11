#!/usr/bin/env bash
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cap=${1:?root must supply a timeout}
target="$FLEET/terminal"
unit=d7n-terminal-upper-fix
out="$SCR/$unit-launch"
journal="$SCAFFOLD/tmp/claude/$unit.jsonl"
brief="$SCAFFOLD/tmp/units/$unit-brief.md"
pointer="$target/tmp/claude/$unit-brief.md"
test ! -e "$out"
test ! -e "$journal"
test -f "$brief"
test "$(git -C "$target" rev-parse HEAD)" = 0b01536068f396c9c5e92f5fca93a107d598f201
test -z "$(git -C "$target" status --porcelain=v1 --untracked-files=all)"
mkdir -p "$target/tmp/claude" "$SCAFFOLD/tmp/claude"
mkdir "$out"
cp "$brief" "$pointer"
cmp "$brief" "$pointer"
git -C "$target" rev-parse HEAD > "$out/head-before.txt"
git -C "$target" status --porcelain=v1 --untracked-files=all > "$out/status-before.txt"
git -C "$target" diff HEAD --binary > "$out/diff-before.txt"
git -C "$target" ls-files --stage > "$out/index-before.txt"
sha256sum "$target/package.json" "$target/package-lock.json" > "$out/manifests-before.sha256"
command -v claude.exe > "$out/claude-path.txt"
status=0
if (cd "$target" && timeout --kill-after=15s "$cap" claude.exe -p 'Read and execute the complete bounded implementation brief at C:/Users/mikes/WebstormProjects/terminal/tmp/claude/d7n-terminal-upper-fix-brief.md. Read the current role instructions at C:/Users/mikes/WebstormProjects/scaffold/.claude/agents/implementer.md. Resolve every authority through canonical sibling Scaffold as Terminal AGENTS.md directs. Work only on the owned Terminal files. Read the live installed Guide capability, use the real native entry, and preserve every package assertion. Do not install, publish, change Git refs or read secrets. Apply edits with the available apply_patch command. Return the report with exact scope and actual exits.' --model opus --effort high --permission-mode acceptEdits --add-dir C:/Users/mikes/WebstormProjects/scaffold --verbose --output-format stream-json) > "$journal" 2> "$SCAFFOLD/tmp/claude/$unit.err"; then
	status=0
else
	status=$?
fi
printf '%s\n' "$status" > "$out/exit.txt"
git -C "$target" rev-parse HEAD > "$out/head-after.txt"
git -C "$target" status --porcelain=v1 --untracked-files=all > "$out/status-after.txt"
git -C "$target" diff HEAD --binary > "$out/diff-after.txt"
git -C "$target" ls-files --stage > "$out/index-after.txt"
sha256sum "$target/package.json" "$target/package-lock.json" > "$out/manifests-after.sha256"
cmp "$out/head-before.txt" "$out/head-after.txt"
cmp "$out/index-before.txt" "$out/index-after.txt"
cmp "$out/manifests-before.sha256" "$out/manifests-after.sha256"
exit "$status"
