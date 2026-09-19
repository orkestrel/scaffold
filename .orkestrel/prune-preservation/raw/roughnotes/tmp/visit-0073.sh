#!/usr/bin/env bash
# Target visit for roughnotes after the scaffold 0.0.73 release.
#
# This visit stops before repairing. `vite.config.ts` is permanently stale here
# by design — it carries the four-variant journey fan-out and the showcase
# factory the plan knows nothing about — so a repair over the `configs` group
# would delete both. Read the drift first, then repair only the groups that
# actually moved.
set -u
cd "C:/Users/mikes/WebstormProjects/roughnotes" || exit 1
mkdir -p tmp/visit

node tmp/repin-scaffold.mjs

echo "===== install ====="
npm install > tmp/visit/install.log.txt 2>&1
echo "install_EXIT=$?"
tail -3 tmp/visit/install.log.txt

node tmp/refresh-lock-marker.mjs

echo "===== preparation commit ====="
git add package.json package-lock.json
git commit -q -m "chore: re-pin @orkestrel/scaffold to 0.0.73

Taken from what the registry serves. The preparation commit precedes the repair,
which refuses a tree carrying uncommitted changes.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
echo "COMMIT_EXIT=$?"

echo "===== audit, before any repair ====="
npx scaffold audit > tmp/visit/audit-before.log.txt 2>&1
echo "audit_EXIT=$?"
cat tmp/visit/audit-before.log.txt
