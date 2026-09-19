#!/usr/bin/env bash
# Move the planned @orkestrel/test range in the manifest fixtures and the planned-range literal
# from ^0.0.16 to ^0.0.17 — the mechanical consequence of the re-pin, which flows from
# package.json into BASE_DEV_DEPENDENCIES — then re-read the two projects that reddened on it.
set -u
repo="C:/Users/mikes/WebstormProjects/scaffold"
cd "$repo" || exit 1
sed -i 's#"@orkestrel/test": "\^0.0.16"#"@orkestrel/test": "^0.0.17"#g' tests/src/core/fixtures/app-only-toolchain.txt tests/src/core/fixtures/setup-false-manifest.txt tests/src/core/fixtures/source-manifest.txt tests/src/bin/CLI.test.ts
echo "remaining old-pin literals: $(grep -rl '"@orkestrel/test": "\^0.0.16"' tests/ src/ guides/ | wc -l)"
git diff --stat -- tests/src/core/fixtures tests/src/bin/CLI.test.ts
step() {
	local name="$1"; shift
	"$@" > "tmp/verify/s3b-${name}.log.txt" 2>&1
	local code=$?
	echo "${name}_EXIT=${code}"
	sed 's/\x1b\[[0-9;]*m//g' "tmp/verify/s3b-${name}.log.txt" | grep -E "Tests |Test Files|Snapshots" | tail -3
}
step core npm run test:src:core
step bin npm run test:src:bin
