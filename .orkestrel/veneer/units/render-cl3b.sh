#!/usr/bin/env bash
# Render the U7f-fix audit evidence: the diff over the CL3 landing 9bb306e plus no-index renderings
# of untracked files outside tmp/, and the status. Usage: render-cl3b.sh [suffix]
V="C:/Users/mikes/WebstormProjects/veneer"
A="C:/Users/mikes/WebstormProjects/scaffold/tmp/audit"
S="${1:-}"
cd "$V" || exit 9
git diff 9bb306e -- . ':(exclude)tmp' > "$A/cl3b-diff$S.patch"
for f in $(git ls-files --others --exclude-standard | grep -v '^tmp/'); do
  git diff --no-index -- /dev/null "$f" >> "$A/cl3b-diff$S.patch"
done
git status --porcelain --untracked-files=all | grep -v '^?? tmp' > "$A/cl3b-status$S.txt"
wc -l "$A/cl3b-diff$S.patch" "$A/cl3b-status$S.txt"
grep -c '^diff --git' "$A/cl3b-diff$S.patch"
