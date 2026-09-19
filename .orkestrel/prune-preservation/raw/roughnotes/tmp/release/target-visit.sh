#!/usr/bin/env bash
# Target visit for roughnotes after the scaffold 0.0.72 and test 0.0.16 releases.
# This checkout is far behind: scaffold ^0.0.63 against 0.0.72, and five further
# ranges stale. It is a private application, so it publishes nothing; the visit
# exists to adopt the vendored floor and prove the gates still green.
set -u
cd "C:/Users/mikes/WebstormProjects/roughnotes" || exit 1
mkdir -p tmp/release

step() {
	local name="$1"; shift
	echo "===== ${name} ====="
	"$@" > "tmp/release/tv-${name}.log.txt" 2>&1
	echo "${name}_EXIT=$?"
	tail -5 "tmp/release/tv-${name}.log.txt"
}

node -e "
const fs=require('node:fs');
const p=JSON.parse(fs.readFileSync('package.json','utf8'));
const want={
 '@orkestrel/router':'^0.0.15',
 '@orkestrel/emitter':'^0.0.10',
 '@orkestrel/contract':'^0.0.17',
 '@orkestrel/guide':'^0.0.20',
 '@orkestrel/html':'^0.0.10',
 '@orkestrel/probe':'^0.0.16',
 '@orkestrel/test':'^0.0.16',
 '@orkestrel/scaffold':'^0.0.72',
};
let moved=0;
for(const f of ['dependencies','devDependencies','peerDependencies']){
  const b=p[f]; if(!b) continue;
  for(const [k,v] of Object.entries(b)){
    if(want[k]===undefined||v===want[k]) continue;
    console.log('repin '+f+' '+k+' '+v+' -> '+want[k]); b[k]=want[k]; moved++;
  }
}
fs.writeFileSync('package.json', JSON.stringify(p,null,'\t')+'\n');
console.log('moved '+moved);
"

step install npm install

node -e "
const fs=require('node:fs'),c=require('node:crypto');
try{fs.writeFileSync('node_modules/.orkestrel-lock.sha256',c.createHash('sha256').update(fs.readFileSync('package-lock.json')).digest('hex'));console.log('lock marker refreshed')}catch(e){console.log('no marker: '+e.message)}
"

echo "===== preparation commit ====="
git add package.json package-lock.json
git commit -q -m "chore: re-pin every @orkestrel range to the registry

router ^0.0.13 to ^0.0.15, guide ^0.0.17 to ^0.0.20, html ^0.0.9 to ^0.0.10,
probe ^0.0.12 to ^0.0.16, test ^0.0.14 to ^0.0.16, and scaffold ^0.0.63 to
^0.0.72, each taken from what the registry serves.

This checkout had fallen nine scaffold releases behind. The preparation commit
precedes the overwrite, which refuses a tree carrying uncommitted changes.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
echo "COMMIT_EXIT=$?"

step overwrite npx scaffold overwrite
step audit npx scaffold audit
step install2 npm install
step format npm run format
step formatcheck npm run format:check
step lintcheck npm run lint:check
step check npm run check
step build npm run build
step test npm test

echo "===== status ====="
git status --short
