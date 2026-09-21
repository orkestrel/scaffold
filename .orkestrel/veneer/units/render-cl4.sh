#!/usr/bin/env bash
# Render the U7f-fix audit evidence: the diff over the CL3b landing d822d59 plus no-index renderings
# of untracked files outside tmp/, and the status. Usage: render-cl4.sh [suffix]
V="C:/Users/mikes/WebstormProjects/veneer"
A="C:/Users/mikes/WebstormProjects/scaffold/tmp/audit"
S="${1:-}"
cd "$V" || exit 9
git diff d822d59 -- . ':(exclude)tmp' > "$A/cl4-diff$S.patch"
for f in $(git ls-files --others --exclude-standard | grep -v '^tmp/'); do
  git diff --no-index -- /dev/null "$f" >> "$A/cl4-diff$S.patch"
done
git status --porcelain --untracked-files=all | grep -v '^?? tmp' > "$A/cl4-status$S.txt"
wc -l "$A/cl4-diff$S.patch" "$A/cl4-status$S.txt"
grep -c '^diff --git' "$A/cl4-diff$S.patch"
