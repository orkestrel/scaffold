#!/usr/bin/env bash
# Render the CL3 audit evidence: the diff over the CL2 landing 9f5ffda plus no-index renderings
# of untracked files outside tmp/, and the status. Usage: render-cl3.sh [suffix]
V="C:/Users/mikes/WebstormProjects/veneer"
A="C:/Users/mikes/WebstormProjects/scaffold/tmp/audit"
S="${1:-}"
cd "$V" || exit 9
git diff 9f5ffda -- . ':(exclude)tmp' > "$A/cl3-diff$S.patch"
for f in $(git ls-files --others --exclude-standard | grep -v '^tmp/'); do
  git diff --no-index -- /dev/null "$f" >> "$A/cl3-diff$S.patch"
done
git status --porcelain --untracked-files=all | grep -v '^?? tmp' > "$A/cl3-status$S.txt"
wc -l "$A/cl3-diff$S.patch" "$A/cl3-status$S.txt"
grep -c '^diff --git' "$A/cl3-diff$S.patch"
