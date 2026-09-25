#!/usr/bin/env bash
# Reads the given cases against the b8c6a08 source of the owned engine files and helpers, then puts
# the unit's versions back byte for byte. Usage: baseline-reading.sh <label> <test-file> <pattern>
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/release-record || exit 1
files="src/browser/helpers.ts src/browser/Collapse.ts src/browser/Tab.ts src/browser/Toast.ts src/browser/Carousel.ts src/browser/Dropdown.ts"
mkdir -p tmp/j-release-record/backup
for file in $files; do
	cp "$file" "tmp/j-release-record/backup/$(basename "$file")"
done
sha256sum $files >tmp/j-release-record/backup/sums.txt
for file in $files; do
	git show "b8c6a08:$file" >"$file"
done
bash tmp/j-release-record/run.sh "$1" "$2" "$3"
for file in $files; do
	cp "tmp/j-release-record/backup/$(basename "$file")" "$file"
done
sha256sum --check --quiet tmp/j-release-record/backup/sums.txt && echo "restored"
