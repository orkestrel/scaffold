#!/usr/bin/env bash
# Render the CL4b audit evidence: the diff over the CL4 landing bc580c1 plus no-index renderings
# of untracked files outside tmp/, and the status. Derived from render-cl4.sh with the base and
# the names changed. Usage: render-cl4b.sh [suffix]
V="C:/Users/mikes/WebstormProjects/veneer"
A="C:/Users/mikes/WebstormProjects/scaffold/tmp/audit"
S="${1:-}"
cd "$V" || exit 9
git diff bc580c1 -- . ':(exclude)tmp' > "$A/cl4b-diff$S.patch"
for f in $(git ls-files --others --exclude-standard | grep -v '^tmp/'); do
  git diff --no-index -- /dev/null "$f" >> "$A/cl4b-diff$S.patch"
done
git status --porcelain --untracked-files=all | grep -v '^?? tmp' > "$A/cl4b-status$S.txt"
wc -l "$A/cl4b-diff$S.patch" "$A/cl4b-status$S.txt"
grep -c '^diff --git' "$A/cl4b-diff$S.patch"
