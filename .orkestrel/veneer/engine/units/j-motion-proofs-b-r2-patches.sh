#!/usr/bin/env bash
# Round 2: writes the report-only patches from the edited copies under r2-patched/, each as a unified
# diff against the worktree's file with repository-relative labels, so `git apply` takes it at the
# worktree root. The worktree's own files are only read.
set -u
worktree="$(cd "$(dirname "$0")/../.." && pwd)"
here="$worktree/tmp/j-motion-proofs-b"
cd "$worktree" || exit 1
diff -u --label a/src/browser/types.ts --label b/src/browser/types.ts \
	src/browser/types.ts "$here/r2-patched/types.ts" > "$here/r2-types.ts.patch"
diff -u --label a/tests/app/browser/sections/EngineSection.test.ts --label b/tests/app/browser/sections/EngineSection.test.ts \
	tests/app/browser/sections/EngineSection.test.ts "$here/r2-patched/EngineSection.test.ts" > "$here/r2-EngineSection.test.ts.patch"
for patch in r2-types.ts.patch r2-EngineSection.test.ts.patch; do
	git apply --check "$here/$patch"
	echo "$patch apply-check exit $?"
done
cat "$here/r2-types.ts.patch" "$here/r2-EngineSection.test.ts.patch"
