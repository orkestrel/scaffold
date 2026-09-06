#!/usr/bin/env bash
# Orchestrator-tracked: regenerate scaffold's lockfile after U6 dropped vite-plugin-dts from the manifest, and record what moved.
set -eu
REC=/home/user/scaffold/.orkestrel/campaign/ts6-api
cd /home/user/scaffold
LOG="$REC/u6-install.log.txt"
{
  echo "# U6 install — $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo "\$ grep -c vite-plugin-dts package.json package-lock.json (before)"; grep -c "vite-plugin-dts" package.json package-lock.json || true
  echo "\$ npm --version"; npm --version
  echo "\$ npm install --no-audit --no-fund"; npm install --no-audit --no-fund 2>&1 | tail -5
  echo "\$ grep -c vite-plugin-dts package.json package-lock.json (after)"; grep -c "vite-plugin-dts" package.json package-lock.json || true
  echo "\$ git diff --stat -- package.json package-lock.json"; git diff --stat -- package.json package-lock.json
  echo "\$ ls node_modules/vite-plugin-dts"; ls node_modules/vite-plugin-dts 2>&1 | head -2
} | tee "$LOG"
