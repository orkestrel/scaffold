#!/usr/bin/env bash
# Runs a test file against one mutated source file, then puts the unit's version back byte for byte.
# Usage: mutate.sh <label> <source-file> <mutant-file> <test-file> [pattern]
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-record || exit 1
label="$1"
source="$2"
mutant="$3"
mkdir -p tmp/j-release-record/backup
backup="tmp/j-release-record/backup/$(basename "$source").mutation"
cp "$source" "$backup"
sum=$(sha256sum "$source" | cut -d' ' -f1)
cp "$mutant" "$source"
bash tmp/j-release-record/run.sh "$label" "$4" "$5"
cp "$backup" "$source"
[ "$(sha256sum "$source" | cut -d' ' -f1)" = "$sum" ] && echo "restored"
