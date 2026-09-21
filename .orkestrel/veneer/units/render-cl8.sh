#!/usr/bin/env bash
# Render the CL8 audit evidence: the diff over the CL7 landing a9172df plus no-index renderings of
# untracked files outside tmp/, and the status. Derived from render-cl7.sh with the base, the unit
# name, and the output paths changed. Usage: render-cl8.sh [suffix]
V="C:/Users/mikes/WebstormProjects/veneer"
A="C:/Users/mikes/WebstormProjects/scaffold/tmp/audit"
S="${1:-}"
cd "$V" || exit 9
git diff a9172df -- . ':(exclude)tmp' > "$A/cl8-diff$S.patch"
for f in $(git ls-files --others --exclude-standard | grep -v '^tmp/'); do
  git diff --no-index -- /dev/null "$f" >> "$A/cl8-diff$S.patch"
done
git status --porcelain --untracked-files=all | grep -v '^?? tmp' > "$A/cl8-status$S.txt"
wc -l "$A/cl8-diff$S.patch" "$A/cl8-status$S.txt"
grep -c '^diff --git' "$A/cl8-diff$S.patch"
