#!/usr/bin/env bash
# Builds one app-only generated workspace in the operating system's temporary directory, never
# under the subject checkout, then runs its vendored config project over four workspace shapes.
# Each run prints its own pass, skip, and fail counts, and every exit code is echoed rather than
# raised, so a shape that must fail is recorded rather than ending the script.
#
# Argument 1 is the run label, which names the temporary workspace and keeps two runs apart.
#
# The shapes:
#   B  `src` as a regular file, which is an unrelated entry the axis must not read as source
#   D  `src/core` as a directory and no `configs/src/` wrapper, which must fail the case
#   E  `src` denied to this account and holding `core`, which no lstat can inspect
#   E' shape E again with unit D2's shipped predicate planted back, the negative control
#
# The reporter is overridden to `verbose` on the command line, which the workspace's own
# `--reporter=dot` precedes, so a skipped case is printed by name rather than as an unnamed dot.
set -u
export MSYS2_ARG_CONV_EXCL='*'
export MSYS_NO_PATHCONV=1
root="C:/Users/mikes/WebstormProjects/scaffold"
instruments="$root/.orkestrel/scaffold/d2-instruments"
label="$1"
scratch="C:/Users/mikes/AppData/Local/Temp/d3-$label"
account=$(whoami.exe | tr -d '\r\n')
echo "ACCOUNT=$account"

set -e
rm -rf "$scratch"
mkdir -p "$scratch/packed" "$scratch/consumer"
cd "$root"
npm.cmd pack --json --ignore-scripts --pack-destination "$scratch/packed" > /dev/null
archive=$(ls "$scratch"/packed/*.tgz | head -1)
echo "ARCHIVE=$archive"
printf '{"name":"d3-predicate-consumer","private":true,"type":"module"}\n' > "$scratch/consumer/package.json"
cd "$scratch/consumer"
npm.cmd install --ignore-scripts --no-audit --no-fund "$archive" > /dev/null
cp "$instruments/d2-generate.mjs" generate.mjs
node generate.mjs "$scratch/generated"
cd "$scratch/generated"
node "$instruments/d2-repin.mjs" package.json "$archive"
npm.cmd install --ignore-scripts --no-audit --no-fund > /dev/null
echo "WORKSPACE=$scratch/generated"
sha256sum tests/config.test.ts node_modules/@orkestrel/scaffold/dist/host/tests/config.test.ts
cp tests/config.test.ts "$scratch/config.test.ts.corrected"

set +e

echo "===== SHAPE B: an unrelated src entry, a regular file ====="
rm -rf src
printf 'not a source axis\n' > src
npm.cmd run test:config -- --reporter=verbose 2>&1 | grep -E "config.test.ts >.*compiler scope|Test Files|Tests  |FAIL|Error:"
echo "EXIT_B=${PIPESTATUS[0]}"

echo "===== SHAPE D: a src/core directory and no configs/src wrapper ====="
rm -rf src
mkdir -p src/core
npm.cmd run test:config -- --reporter=verbose 2>&1 | grep -E "config.test.ts >.*compiler scope|Test Files|Tests  |declares no face project"
echo "EXIT_D=${PIPESTATUS[0]}"

echo "===== SHAPE E: a denied src directory holding core ====="
rm -rf src
mkdir -p src/core
win=$(cygpath -w "$scratch/generated/src")
icacls.exe "$win" /inheritance:r > /dev/null
icacls.exe "$win" /deny "$account:(F)" > /dev/null
icacls.exe "$win" | head -3
node -e "const{lstatSync}=require('node:fs');try{lstatSync(process.argv[1]);console.log('LSTAT_CORE=no throw')}catch(e){console.log('LSTAT_CORE=THREW '+e.code)}" "$scratch/generated/src/core"
npm.cmd run test:config -- --reporter=verbose 2>&1 | grep -E "config.test.ts >.*compiler scope|Test Files|Tests  |EPERM|Unhandled|Error:"
echo "EXIT_E=${PIPESTATUS[0]}"

echo "===== CONTROL E': shape E with unit D2's shipped predicate planted back ====="
node "$root/tmp/units/d3-plant.mjs" tests/config.test.ts old
npm.cmd run test:config -- --reporter=verbose 2>&1 | grep -E "config.test.ts >.*compiler scope|Test Files|Tests  |EPERM|Unhandled|Error:"
echo "EXIT_CONTROL=${PIPESTATUS[0]}"
cp "$scratch/config.test.ts.corrected" tests/config.test.ts
sha256sum tests/config.test.ts

icacls.exe "$win" /remove:d "$account" > /dev/null
icacls.exe "$win" /grant "$account:(F)" > /dev/null
rm -rf src
echo "===== DONE $label ====="
