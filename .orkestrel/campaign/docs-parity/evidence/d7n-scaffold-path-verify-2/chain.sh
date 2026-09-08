#!/usr/bin/env bash
set -u

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/scaffold-path

RESULTS=tmp/d7n-scaffold-path-verify-2/results.txt
mkdir -p tmp/d7n-scaffold-path-verify-2
: > "$RESULTS"

run_gate() {
	name=$1
	shift
	started=$(date +%s)
	"$@" >"tmp/d7n-scaffold-path-verify-2/${name}.log.txt" 2>&1
	status=$?
	finished=$(date +%s)
	printf '%s exit=%s duration=%ss\n' "$name" "$status" "$((finished - started))" >>"$RESULTS"
	return "$status"
}

guard_dist() {
	checkout=$(pwd -P)
	dist_root=$(cd dist && pwd -P)
	if test -L dist || ! test -d dist || test "$dist_root" != "$checkout/dist"; then
		printf 'dist guard failed: expected ordinary directory inside isolated checkout\n' >tmp/d7n-scaffold-path-verify-2/build-guard.log.txt
		printf 'build-guard exit=1 duration=0s\n' >>"$RESULTS"
		return 1
	fi
	printf 'dist guard passed: %s\n' "$dist_root" >tmp/d7n-scaffold-path-verify-2/build-guard.log.txt
	printf 'build-guard exit=0 duration=0s\n' >>"$RESULTS"
}

run_gate format-check npm run format:check || exit $?
run_gate lint-check npm run lint:check || exit $?
run_gate check npm run check || exit $?
guard_dist || exit $?
run_gate build npm run build || exit $?
run_gate test npm test
