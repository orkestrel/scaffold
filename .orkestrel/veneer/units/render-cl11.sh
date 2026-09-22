#!/usr/bin/env bash
# Render the CL11 audit evidence: the diff over the CL10 landing plus no-index renderings of
# untracked files outside tmp/, and the status. The base commit is an argument because CL10 lands
# between this script being written and CL11 running.
# Usage: render-cl11.sh <base-sha> [suffix]
V="C:/Users/mikes/WebstormProjects/veneer"
A="C:/Users/mikes/WebstormProjects/scaffold/tmp/audit"
B="${1:?base sha required}"
S="${2:-}"
cd "$V" || exit 9
git diff "$B" -- . ':(exclude)tmp' > "$A/cl11-diff$S.patch"
for f in $(git ls-files --others --exclude-standard | grep -v '^tmp/'); do
  git diff --no-index -- /dev/null "$f" >> "$A/cl11-diff$S.patch"
done
git status --porcelain --untracked-files=all | grep -v '^?? tmp' > "$A/cl11-status$S.txt"
wc -l "$A/cl11-diff$S.patch" "$A/cl11-status$S.txt"
grep -c '^diff --git' "$A/cl11-diff$S.patch"
