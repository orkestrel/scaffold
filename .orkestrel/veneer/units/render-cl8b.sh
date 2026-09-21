#!/usr/bin/env bash
# Render the CL8b audit evidence: the diff over the CL8 landing d2c5bb3 plus no-index renderings of
# untracked files outside tmp/, and the status. Derived from render-cl8.sh with the base, the unit
# name, and the output paths changed. Usage: render-cl8b.sh [suffix]
V="C:/Users/mikes/WebstormProjects/veneer"
A="C:/Users/mikes/WebstormProjects/scaffold/tmp/audit"
S="${1:-}"
cd "$V" || exit 9
git diff d2c5bb3 -- . ':(exclude)tmp' > "$A/cl8b-diff$S.patch"
for f in $(git ls-files --others --exclude-standard | grep -v '^tmp/'); do
  git diff --no-index -- /dev/null "$f" >> "$A/cl8b-diff$S.patch"
done
git status --porcelain --untracked-files=all | grep -v '^?? tmp' > "$A/cl8b-status$S.txt"
wc -l "$A/cl8b-diff$S.patch" "$A/cl8b-status$S.txt"
grep -c '^diff --git' "$A/cl8b-diff$S.patch"
