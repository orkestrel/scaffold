#!/usr/bin/env bash
set -u
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
mkdir -p "$SCR/bootstrap" "$SCAFFOLD/tmp/claude" "$SCAFFOLD/tmp/cursor" "$SCAFFOLD/tmp/units"
exec > >(tee "$SCR/bootstrap/host.log.txt") 2>&1
date -u +%FT%TZ
node --version
npm --version
git --version
python3 --version
nproc
command -v node npm git claude codex timeout
claude --version
claude auth status
codex --version
codex login status
git -C "$SCAFFOLD" status --short --branch
git -C "$SCAFFOLD" log -1 --format='%H%n%B'
printf 'thread=%s\n' "$CODEX_THREAD_ID"
printf 'cursor-entry directories:\n'
ls -d /c/Users/mikes/AppData/Local/cursor-agent/versions/*
