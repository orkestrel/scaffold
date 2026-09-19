#!/usr/bin/env bash
# Builds one app-only generated workspace in the operating system's temporary directory, never
# under the subject checkout, then runs its vendored config project over four workspace shapes.
# Each run prints its own pass and skip counts, and the exit code is echoed rather than raised, so
# a shape that must fail is recorded rather than ending the script.
#
# Argument 1 is the run label, which names the temporary workspace and keeps two runs apart.
#
# The shapes:
#   A  the workspace as generated: app environments alone, no `src` entry at all
#   B  plus `src` as a regular file
#   C  plus `src` as an empty directory
#   D  plus `src/core` as a directory and no `configs/src/` wrapper
set -e
root="C:/Users/mikes/WebstormProjects/scaffold"
label="$1"
scratch="C:/Users/mikes/AppData/Local/Temp/d2-$label"
rm -rf "$scratch"
mkdir -p "$scratch/packed" "$scratch/consumer"
cd "$root"
npm.cmd pack --json --ignore-scripts --pack-destination "$scratch/packed" > /dev/null
archive=$(ls "$scratch"/packed/*.tgz | head -1)
echo "ARCHIVE=$archive"
printf '{"name":"d2-predicate-consumer","private":true,"type":"module"}\n' > "$scratch/consumer/package.json"
cd "$scratch/consumer"
npm.cmd install --ignore-scripts --no-audit --no-fund "$archive" > /dev/null
cp "$root/tmp/units/d2-generate.mjs" generate.mjs
node generate.mjs "$scratch/generated"
cd "$scratch/generated"
node "$root/tmp/units/d2-repin.mjs" package.json "$archive"
npm.cmd install --ignore-scripts --no-audit --no-fund > /dev/null
echo "WORKSPACE=$scratch/generated"
sha256sum node_modules/@orkestrel/scaffold/dist/host/tests/config.test.ts

set +e

echo "===== SHAPE A: app environments alone ====="
npm.cmd run test:config
echo "EXIT_A=$?"

echo "===== SHAPE B: plus a regular file named src ====="
rm -rf src
printf 'not a source axis\n' > src
npm.cmd run test:config
echo "EXIT_B=$?"

echo "===== SHAPE C: plus an empty directory named src ====="
rm -rf src
mkdir -p src
npm.cmd run test:config
echo "EXIT_C=$?"

echo "===== SHAPE D: plus a src/core directory and no configs/src wrapper ====="
rm -rf src
mkdir -p src/core
ls configs
npm.cmd run test:config
echo "EXIT_D=$?"

rm -rf src
echo "===== DONE $label ====="
