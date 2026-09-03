#!/usr/bin/env bash
# Add the shell-discipline sentence to every generated implement brief that lacks it, then retain the
# briefs, template, and instruments in the campaign folder.
set -u
U=/home/user/scaffold/tmp/units/conform
C=/home/user/scaffold/.orkestrel/campaign/conform
LINE=' Shell discipline: read files with the Read, Grep, and Glob tools rather than the shell; in Bash run one plain command per call with absolute paths (`npm run <script>` and `git status`, `git diff`, `git add -N` from the checkout), never a `cd … \&\&` chain, never inline `node -e`, and never a pipe into a tool outside cat, head, tail, grep, sed -n, sort, uniq, wc, tr, cut, and awk; a command that prompts for permission blocks the whole round.'
n=0
for f in $U/conform-*-brief.md; do
  case "$f" in *-brief-1.md) continue;; esac
  grep -q "Shell discipline" "$f" && continue
  sed -i "s#a fresh install would revert the staged closure\.#a fresh install would revert the staged closure.${LINE}#" "$f" && n=$((n+1))
done
echo "patched $n briefs"
grep -L "Shell discipline" $U/conform-*-brief.md | grep -v -- '-brief-1.md' || echo "every live brief carries the line"
cp $U/*.md $C/briefs/
cp /home/user/scaffold/tmp/work/*.sh /home/user/scaffold/tmp/work/*.mjs /home/user/scaffold/tmp/work/*.js $C/instruments/ 2>/dev/null
rm -f $C/instruments/setup.sh $C/instruments/validate-settings.mjs
mkdir -p $C/units/guide-regex
cp /home/user/scaffold/tmp/units/guide-regex-brief.md /home/user/scaffold/tmp/units/guide-regex-report.md $C/units/guide-regex/ 2>/dev/null
cd /home/user/scaffold
git status --short .orkestrel | wc -l
