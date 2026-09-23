#!/bin/bash
# t4-publish.sh: upload @orkestrel/test 0.0.21 with the user's one-time code (references/window.md § Authorize the
# upload). Usage: OTP=<code> bash t4-publish.sh. The code rides in the environment, so the `script` header records the
# literal `$OTP` and never the code. Refuses a manifest other than 0.0.21, a dirty tree, and an unauthenticated npm.
# Log: t4-publish.log.txt; the registry read-back follows the upload.
S=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad; U=/home/user/scaffold/.orkestrel/veneer/units
export PATH="$S/npm11/node_modules/.bin:$PATH"
cd /home/user/test || exit 1
[ -n "${OTP:-}" ] || { echo "no code"; exit 2; }
[ "$(node -p "require('./package.json').version")" = "0.0.21" ] || { echo "manifest is not 0.0.21"; exit 3; }
[ -z "$(git status --porcelain)" ] || { echo "tree dirty"; exit 4; }
who=$(npm whoami 2>/dev/null) || { echo "npm is not authenticated"; exit 5; }
echo "whoami ok ($who)"
FIFO=$S/t4-publish.fifo; rm -f $FIFO; mkfifo $FIFO; setsid sleep 300 > $FIFO & HOLD=$!
export OTP
script -qfc 'npm publish --ignore-scripts --browser=false --registry=https://registry.npmjs.org --otp="$OTP"' $U/t4-publish.log.txt < $FIFO > /dev/null 2>&1
code=$?; kill $HOLD 2>/dev/null
echo "publish exit=$code"; tail -4 $U/t4-publish.log.txt
sleep 5; echo "registry: $(npm view @orkestrel/test version)"
