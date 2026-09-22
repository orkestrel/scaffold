#!/usr/bin/env bash
# Render the CL10 audit evidence: the diff over the CL9 landing plus no-index renderings of
# untracked files outside tmp/, and the status. The base commit is an argument because CL9 lands
# between this script being written and CL10 running.
# Usage: render-cl10.sh <base-sha> [suffix]
V="C:/Users/mikes/WebstormProjects/veneer"
A="C:/Users/mikes/WebstormProjects/scaffold/tmp/audit"
B="${1:?base sha required}"
S="${2:-}"
cd "$V" || exit 9
git diff "$B" -- . ':(exclude)tmp' > "$A/cl10-diff$S.patch"
for f in $(git ls-files --others --exclude-standard | grep -v '^tmp/'); do
  git diff --no-index -- /dev/null "$f" >> "$A/cl10-diff$S.patch"
done
git status --porcelain --untracked-files=all | grep -v '^?? tmp' > "$A/cl10-status$S.txt"
wc -l "$A/cl10-diff$S.patch" "$A/cl10-status$S.txt"
grep -c '^diff --git' "$A/cl10-diff$S.patch"
