#!/usr/bin/env bash
set -uo pipefail

cd /c/Users/mikes/WebstormProjects/program || exit 125
node tmp/d7n-program-dependent-fix/mutable-label-counterexample.mjs \
	>tmp/d7n-program-dependent-fix/mutable-label-counterexample.stdout.txt \
	2>tmp/d7n-program-dependent-fix/mutable-label-counterexample.stderr.txt
status=$?
printf '%s\n' "$status" >tmp/d7n-program-dependent-fix/mutable-label-counterexample.exit.txt
cat tmp/d7n-program-dependent-fix/mutable-label-counterexample.stdout.txt
cat tmp/d7n-program-dependent-fix/mutable-label-counterexample.stderr.txt >&2
exit "$status"
