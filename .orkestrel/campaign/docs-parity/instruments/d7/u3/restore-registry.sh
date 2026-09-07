#!/usr/bin/env bash
# U3 precondition: restore the registry @orkestrel/scaffold in the guide checkout before the whole-chain gates.
# Log: restore-registry.log.txt beside this file.
set -u
G=/home/user/fleet/guide
cd "$G" || exit 9
echo "== before: installed scaffold"; node -p "require('$G/node_modules/@orkestrel/scaffold/package.json').version"; ls node_modules/@orkestrel/scaffold/dist/host/scripts/docs.ts 2>&1 | tail -1
echo "== git status"; git status --short; echo "(status end)"
echo "== PATH=/opt/npm11/bin:\$PATH npm ci --ignore-scripts --no-audit --no-fund"; PATH=/opt/npm11/bin:$PATH npm ci --ignore-scripts --no-audit --no-fund 2>&1 | tail -4; echo "EXIT ${PIPESTATUS[0]}"
echo "== after: installed scaffold"; node -p "require('$G/node_modules/@orkestrel/scaffold/package.json').version"; ls node_modules/@orkestrel/scaffold/dist/host/scripts/docs.ts 2>&1 | tail -1
echo "== marker"; node -e "process.stdout.write(require('node:crypto').createHash('sha256').update(require('node:fs').readFileSync('package-lock.json')).digest('hex'))" > node_modules/.orkestrel-lock.sha256; cut -c1-16 node_modules/.orkestrel-lock.sha256; echo
echo "== git status after"; git status --short; echo "(status end)"
