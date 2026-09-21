#!/usr/bin/env bash
# Render the CL6 audit evidence: the diff over the CL5c landing c1c81a4 plus no-index renderings
# of untracked files outside tmp/, and the status. Derived from render-cl4.sh with the base and
# the names changed. Usage: render-cl6.sh [suffix]
V="C:/Users/mikes/WebstormProjects/veneer"
A="C:/Users/mikes/WebstormProjects/scaffold/tmp/audit"
S="${1:-}"
cd "$V" || exit 9
git diff c1c81a4 -- . ':(exclude)tmp' > "$A/cl6-diff$S.patch"
for f in $(git ls-files --others --exclude-standard | grep -v '^tmp/'); do
  git diff --no-index -- /dev/null "$f" >> "$A/cl6-diff$S.patch"
done
git status --porcelain --untracked-files=all | grep -v '^?? tmp' > "$A/cl6-status$S.txt"
wc -l "$A/cl6-diff$S.patch" "$A/cl6-status$S.txt"
grep -c '^diff --git' "$A/cl6-diff$S.patch"
