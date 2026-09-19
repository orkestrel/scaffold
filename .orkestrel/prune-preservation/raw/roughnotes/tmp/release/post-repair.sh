#!/usr/bin/env bash
# Roughnotes, after the tests and orchestration groups were repaired and the
# two vendored configs files restored. The repair re-declared toolchain ranges,
# so the lockfile needs regenerating before the gates run.
set -u
cd "C:/Users/mikes/WebstormProjects/roughnotes" || exit 1
mkdir -p tmp/release

step() {
	local name="$1"; shift
	echo "===== ${name} ====="
	"$@" > "tmp/release/pr-${name}.log.txt" 2>&1
	echo "${name}_EXIT=$?"
	tail -6 "tmp/release/pr-${name}.log.txt"
}

step install npm install

node -e "
const fs=require('node:fs'),c=require('node:crypto');
try{fs.writeFileSync('node_modules/.orkestrel-lock.sha256',c.createHash('sha256').update(fs.readFileSync('package-lock.json')).digest('hex'));console.log('lock marker refreshed')}catch(e){console.log('no marker: '+e.message)}
"

step format npm run format
step formatcheck npm run format:check
step lintcheck npm run lint:check
step check npm run check
step build npm run build
step test npm test

echo "===== audit ====="
npx scaffold audit > tmp/release/pr-audit.log.txt 2>&1
echo "audit_EXIT=$?"
grep "planned paths drifted" tmp/release/pr-audit.log.txt
awk -F'│' 'NF>3 && $4 ~ /stale|missing/ {print $3"|"$2"|"$4}' tmp/release/pr-audit.log.txt

echo "===== status ====="
git status --short
