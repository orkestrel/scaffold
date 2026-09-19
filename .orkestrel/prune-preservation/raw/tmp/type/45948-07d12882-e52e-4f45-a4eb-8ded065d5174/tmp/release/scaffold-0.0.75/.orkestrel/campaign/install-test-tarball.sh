#!/usr/bin/env bash
# Fixing a dependency before it publishes (.agents/orchestration.md § Publishing the fleet):
# build and pack @orkestrel/test from its checkout, install the tarball into scaffold, and record
# the range replaced. The tarball lives under test/tmp/ and is never committed.
set -u
test="C:/Users/mikes/WebstormProjects/test"
scaffold="C:/Users/mikes/WebstormProjects/scaffold"
mkdir -p "$test/tmp/pack"
cd "$test" || exit 1
echo "replaced range in scaffold: $(node -p "require('$scaffold/package.json').devDependencies['@orkestrel/test']")"
npm run build > "$test/tmp/pack/build.log.txt" 2>&1
echo "build_EXIT=$?"
tarball="$(npm pack --pack-destination "$test/tmp/pack" 2> "$test/tmp/pack/pack.err.txt" | tail -1)"
echo "packed: $tarball"
cd "$scaffold" || exit 1
npm install --ignore-scripts "$test/tmp/pack/$tarball" > "$scaffold/tmp/verify/install-test-tarball.log.txt" 2>&1
echo "install_EXIT=$?"
node -p "require('$scaffold/package.json').devDependencies['@orkestrel/test']"
node -p "require('$scaffold/node_modules/@orkestrel/test/package.json').version"
grep -c "JourneyVariant" "$scaffold/node_modules/@orkestrel/test/dist/src/core/index.d.ts"
