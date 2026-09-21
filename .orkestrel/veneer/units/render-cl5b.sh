#!/usr/bin/env bash
# Render the CL5b audit evidence: the diff over the CL5 landing ea82419 plus no-index renderings
# of untracked files outside tmp/, and the status. Derived from render-cl4.sh with the base and
# the names changed. Usage: render-cl5b.sh [suffix]
V="C:/Users/mikes/WebstormProjects/veneer"
A="C:/Users/mikes/WebstormProjects/scaffold/tmp/audit"
S="${1:-}"
cd "$V" || exit 9
git diff ea82419 -- . ':(exclude)tmp' > "$A/cl5b-diff$S.patch"
for f in $(git ls-files --others --exclude-standard | grep -v '^tmp/'); do
  git diff --no-index -- /dev/null "$f" >> "$A/cl5b-diff$S.patch"
done
git status --porcelain --untracked-files=all | grep -v '^?? tmp' > "$A/cl5b-status$S.txt"
wc -l "$A/cl5b-diff$S.patch" "$A/cl5b-status$S.txt"
grep -c '^diff --git' "$A/cl5b-diff$S.patch"
