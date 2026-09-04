#!/bin/bash
# After an overwrite moved manifest ranges past the lockfile: npm install (lockfile regenerated, toolchain installed),
# format, prepublishOnly, commit "Regenerate the lockfile ...", push. Usage: regate.sh <pkg>; log regate-<pkg>.log.
set -u
export PATH=/opt/npm11/bin:$PATH
P=${1:?package}; W=/home/user/work/wave; LOG=$W/regate-$P.log; : > "$LOG"
say() { echo "$(date -u +%H:%M:%S) $P $*" >> "$LOG"; }
DIR=/home/user/fleet/$P; [ "$P" = scaffold ] && DIR=/home/user/scaffold
cd "$DIR" || exit 2
npm install --no-audit --no-fund > "$W/regate-$P-install.log" 2>&1 || { say "REGATE-$P-RED npm install"; exit 1; }
say "npm install exit=0; lockfile moved: $(git diff --quiet -- package-lock.json && echo no || echo yes)"
npm run format > "$W/regate-$P-format.log" 2>&1; say "format exit=$?"
npm run prepublishOnly > "$W/regate-$P-prepublish.log" 2>&1; rc=$?; say "prepublishOnly exit=$rc"
[ $rc -eq 0 ] || { grep -E '^ FAIL |error TS|Error:|ERR!' "$W/regate-$P-prepublish.log" | head -12 >> "$LOG"; say "REGATE-$P-RED prepublishOnly"; exit 1; }
git add -A . > /dev/null 2>&1
if git diff --cached --quiet; then say "nothing to commit"; else
  printf 'Regenerate the lockfile for the vendored toolchain ranges\n\nThe visit'"'"'s `scaffold overwrite` moved the toolchain ranges to the host'"'"'s floor after the lockfile was regenerated; this install brings the lockfile and the installed toolchain to those ranges, and `prepublishOnly` exits 0 on them.\n\nCo-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01V28La253kW5DDvGA5wGKtB\n' > "$W/regate-$P-commit.txt"
  git -c user.name=Claude -c user.email=noreply@anthropic.com commit -q -F "$W/regate-$P-commit.txt" && git push -q -u origin claude/orkestrel-npm-audit-deps-14ibta && say "committed $(git rev-parse --short HEAD) pushed"
fi
say "REGATE-$P-GREEN"
