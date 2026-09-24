#!/bin/bash
# contract-publish.sh: upload @orkestrel/contract 0.0.18 from /home/user/contract at 014c2d2 with the user's one-time code
# (references/window.md § Authorize the upload). Derived from t4-publish.sh with the package, version, checkout, head,
# fifo, and log changed. Usage: OTP=<code> bash contract-publish.sh. The code rides in the environment, so the `script`
# header records the literal `$OTP` and never the code. Refuses another manifest version, another head, a dirty tree,
# a missing build, and an unauthenticated npm. Log: release-2-publish.log.txt; the registry read-back follows the upload.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; T=/home/user/scaffold/.orkestrel/contract/units
export PATH="$S/npm11/node_modules/.bin:$PATH"
cd /home/user/contract || exit 1
[ -n "${OTP:-}" ] || { echo "no code"; exit 2; }
[ "$(node -p "require('./package.json').version")" = "0.0.18" ] || { echo "manifest is not 0.0.18"; exit 3; }
[ "$(git rev-parse --short HEAD)" = "014c2d2" ] || { echo "head is not 014c2d2"; exit 3; }
[ -z "$(git status --porcelain)" ] || { echo "tree dirty"; exit 4; }
[ -f dist/src/core/index.js ] || { echo "no build"; exit 4; }
who=$(npm whoami --registry=https://registry.npmjs.org 2>/dev/null) || { echo "npm is not authenticated"; exit 5; }
echo "whoami ok ($who)"
FIFO=$S/contract-publish.fifo; rm -f $FIFO; mkfifo $FIFO; setsid sleep 300 > $FIFO & HOLD=$!
export OTP
script -qfc 'npm publish --ignore-scripts --browser=false --registry=https://registry.npmjs.org --otp="$OTP"' $T/release-2-publish.log.txt < $FIFO > /dev/null 2>&1
code=$?; kill $HOLD 2>/dev/null
echo "publish exit=$code"; tail -4 $T/release-2-publish.log.txt
sleep 5; echo "registry: $(npm view @orkestrel/contract version --registry=https://registry.npmjs.org)"
