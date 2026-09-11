#!/usr/bin/env bash
set -uo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd "$FLEET/program" || exit 125

npx oxfmt --config .oxfmtrc.json --check guides/program.md \
	>tmp/d7n-program-dependent-fix/review-fix-format.stdout.txt \
	2>tmp/d7n-program-dependent-fix/review-fix-format.stderr.txt
format_status=$?
printf '%s\n' "$format_status" >tmp/d7n-program-dependent-fix/review-fix-format.exit.txt
cat tmp/d7n-program-dependent-fix/review-fix-format.stdout.txt
cat tmp/d7n-program-dependent-fix/review-fix-format.stderr.txt >&2

node --experimental-strip-types tests/guides.test.ts \
	>tmp/d7n-program-dependent-fix/review-fix-native.stdout.txt \
	2>tmp/d7n-program-dependent-fix/review-fix-native.stderr.txt
native_status=$?
printf '%s\n' "$native_status" >tmp/d7n-program-dependent-fix/review-fix-native.exit.txt
cat tmp/d7n-program-dependent-fix/review-fix-native.stdout.txt
cat tmp/d7n-program-dependent-fix/review-fix-native.stderr.txt >&2

if (( format_status != 0 )); then exit "$format_status"; fi
exit "$native_status"
