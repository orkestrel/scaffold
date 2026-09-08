#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

package=${1:-}
case "$package" in
  agent | ollama | workflow | program)
    brief="$SCAFFOLD/tmp/units/d7n-$package-converge-fix-brief.md"
    supplement="$SCAFFOLD/tmp/units/d7n-resume-writers-windows-brief.md"
    prompt="Read $brief and $supplement. Work only in $FLEET/$package as its sole writer. Read the required instructions. Do not install, delegate, or alter source outside the brief. Return the required report at $SCAFFOLD/tmp/units/d7n-$package-converge-fix-report.md."
    ;;
  terminal | mcp)
    brief="$SCAFFOLD/tmp/units/d7n-$package-converge-fix-windows-brief.md"
    prompt="Read $brief. Work only in $FLEET/$package as its sole writer. Read the required instructions. Do not install, delegate, or alter source outside the brief. Return the required report at $SCAFFOLD/tmp/units/d7n-$package-converge-fix-report.md."
    ;;
  *)
    printf 'unsupported package: %s\n' "$package" >&2
    exit 1
    ;;
esac

target="$FLEET/$package"
report="$SCAFFOLD/tmp/units/d7n-$package-converge-fix-report.md"
journal="$SCAFFOLD/tmp/claude/d7n-$package-converge-fix-windows.jsonl"
stderr="$SCAFFOLD/tmp/claude/d7n-$package-converge-fix-windows.err"

test -f "$brief"
test ! -e "$report"
test ! -e "$journal"
test ! -e "$stderr"
git -C "$target" rev-parse HEAD
git -C "$target" status --short
test -z "$(git -C "$target" status --porcelain --untracked-files=all)"
mkdir -p "$SCAFFOLD/tmp/claude"
export CLAUDE_CODE_GIT_BASH_PATH=C:/Users/mikes/scoop/apps/git/current/bin/bash.exe
cd "$SCAFFOLD"
timeout 5400 claude -p "$prompt" --agent implementer --model opus --effort high --permission-mode acceptEdits --add-dir "$target" --output-format stream-json --verbose > "$journal" 2> "$stderr"
