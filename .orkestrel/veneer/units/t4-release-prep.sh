#!/bin/bash
# t4-release-prep.sh: the orkestrel-publish visit and layer preparation for @orkestrel/test 0.0.21 in /home/user/test,
# run after T4 TEST-CLIP's audit passes and TEST-MATRICES lands. Every step happens outside the upload window.
# Steps (references/wave.md § Visit a repository, § Rule on the bump, § Prepare a layer):
#   1. read the registry for each @orkestrel range; re-pin every range to the registry caret; npm install; commit the
#      preparation; 2. scaffold overwrite, scaffold audit (exit 0); 3. full install; 4. format; 5. the quality gates;
#   6. fetch the published 0.0.20 tarball and compare the rebuilt dist for material content (the bump ruling);
#   7. bump to 0.0.21 (from what the registry serves), install, prepublishOnly to green; 8. the release commit.
# The push and the upload are the Orchestrator's separate steps. Log: t4-release-prep.log.txt (copied to units).
set -u
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; U=/home/user/scaffold/.orkestrel/veneer/units
LOG=$S/t4-release-prep.log.txt; : > $LOG
export PATH="$S/npm11/node_modules/.bin:$PATH"; export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
cd /home/user/test || exit 1
step() { local name=$1; shift; echo "=== $name ($(date -u +%H:%M:%S))" >> $LOG; "$@" >> $LOG 2>&1; local code=$?; echo "=== $name exit=$code" >> $LOG; [ $code -eq 0 ] || { echo "=== stopped at $name" >> $LOG; exit $code; }; }
[ -z "$(git status --porcelain)" ] || { echo "=== tree dirty; refusing" >> $LOG; exit 2; }
echo "=== HEAD $(git rev-parse --short HEAD); registry: $(for p in contract guide probe scaffold test; do printf '%s@%s ' $p "$(npm view @orkestrel/$p version 2>/dev/null)"; done)" >> $LOG
python3 - <<'PY' >> $LOG 2>&1
import json, subprocess
p = json.load(open('package.json'))
for group in ('dependencies', 'devDependencies', 'peerDependencies'):
    for name in list(p.get(group, {})):
        if name.startswith('@orkestrel/'):
            v = subprocess.run(['npm', 'view', name, 'version'], capture_output=True, text=True).stdout.strip()
            old = p[group][name]; p[group][name] = '^' + v
            print(f'{group} {name}: {old} -> ^{v}')
open('package.json', 'w').write(json.dumps(p, indent='\t') + '\n')
PY
step "install (re-pin)" npm install --ignore-scripts
sha256sum package-lock.json | cut -d' ' -f1 > node_modules/.orkestrel-lock.sha256
if [ -n "$(git status --porcelain package.json package-lock.json)" ]; then
  git add package.json package-lock.json && git commit -q -m "Re-pin the Orkestrel ranges to the registry before the 0.0.21 release" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" -m "Claude-Session: https://claude.ai/code/session_016FizZRKTTm49XXhLB8eGTK" && echo "=== preparation commit $(git rev-parse --short HEAD)" >> $LOG
fi
step "scaffold overwrite" npx scaffold overwrite
step "scaffold audit" npx scaffold audit
step "install (full)" npm install --ignore-scripts
sha256sum package-lock.json | cut -d' ' -f1 > node_modules/.orkestrel-lock.sha256
step "format" npm run format
echo "=== status after the visit: [$(git status --porcelain | tr '\n' ' ')]" >> $LOG
for g in format:check lint:check check build test; do step "$g" npm run $g; done
step "fetch 0.0.20" bash -c "rm -rf $S/t4/published && mkdir -p $S/t4/published && cd $S/t4/published && npm pack @orkestrel/test@0.0.20 --silent && tar -xzf orkestrel-test-0.0.20.tgz"
echo "=== dist compare (material, maps excluded, whitespace ignored)" >> $LOG
diff -rqw -x '*.map' $S/t4/published/package/dist/src dist/src >> $LOG 2>&1; echo "=== dist compare exit=$? (1 = moved)" >> $LOG
echo "=== visit done ($(date -u +%H:%M:%S)); the bump, prepublishOnly, and the release commit follow in t4-release-bump.sh" >> $LOG
