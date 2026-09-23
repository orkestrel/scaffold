#!/usr/bin/env bash
# Runs one plant: apply, build, read, revert, build, read. Usage: run-plant.sh <name> <what>
set -u
cd /home/user/veneer-bff
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH" PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers
D=/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/bff2
name=$1; what=$2
read_state() {
  npm run build:src > $D/$name-$1-build.log 2>&1; echo "build:src exit $?"
  if [[ $what == *browser* ]]; then
    npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/form-floating.test.ts > $D/$name-$1-ff.log 2>&1
    echo "browser exit $?"; grep -E "^ FAIL|Tests " $D/$name-$1-ff.log | sed 's/|\[object Object\] (chromium)| //'
  fi
  if [[ $what == *conformance* ]]; then
    npm run test:conformance > $D/$name-$1-conf.log 2>&1
    echo "conformance exit $?"; grep -E "^ FAIL|Tests " $D/$name-$1-conf.log
  fi
}
python3 $D/plant.py $name apply || exit 1
echo "== $name planted"; read_state planted
python3 $D/plant.py $name revert || exit 1
echo "== $name reverted"; read_state reverted
git diff --quiet 2c10329 -- src/styles/index.scss; true
