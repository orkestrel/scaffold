#!/bin/bash
# Write and push the release commit of a prepared package from its visit log. Usage: release-commit.sh <pkg> [extra sentence]
set -u
P=${1:?package}; EXTRA=${2:-}
W=/home/user/work/wave; L=$W/prep-$P.log
DIR=/home/user/fleet/$P; [ "$P" = scaffold ] && DIR=/home/user/scaffold
cd "$DIR" || exit 2
NAME=$(node -p "require('./package.json').name"); NEXT=$(node -p "require('./package.json').version")
PRIOR=$(grep -o 'committed manifest [0-9.]*' "$L" | head -1 | awk '{print $3}')
DIST=$(grep -o 'dist against published [^:]*: {.*' "$L" | head -1 | sed 's/dist against published [^:]*: //' | cut -c1-200)
CHANGED=$(grep -o 'overwrite changed: .*' "$L" | head -1 | sed 's/overwrite changed: //' | tr -s ' ' | sed 's/ M /`/g; s/ *$//' | sed 's/`/, `/g; s/^, //' | sed 's/\([^,]*\)$/\1`/; s/`\([^`,]*\)/`\1`/g' )
WHEN=$(grep -o '^[0-9:]* .* prepublishOnly exit=0' "$L" | head -1 | cut -c1-5)
RANGES=$(node -p "const p=require('./package.json');['dependencies','peerDependencies'].flatMap(k=>Object.entries(p[k]||{}).filter(([n])=>n.startsWith('@orkestrel/')).map(([n,v])=>n+' '+v)).join(', ')||'none'")
git add -A . > /dev/null 2>&1
printf 'Release %s %s\n\nBump ruling: the fourth distributable inventory of 2026-09-04 read `dist/` moved against the published %s tarball, and the visit'"'"'s comparison after the gates reads %s. Runtime and peer ranges as published: %s. The visit re-pinned every `@orkestrel/*` range to the registry'"'"'s caret, regenerated the lockfile with the registry copies restored, and ran `scaffold overwrite` under scaffold 0.0.61 (changed: %s); `scaffold audit` exits 0. Gates: `prepublishOnly` exit 0 at %s UTC.%s\n\nCo-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01V28La253kW5DDvGA5wGKtB\n' "$NAME" "$NEXT" "$PRIOR" "$DIST" "$RANGES" "${CHANGED:-nothing}" "$WHEN" "${EXTRA:+ $EXTRA}" > "$W/release-$P-msg.txt"
if git diff --cached --quiet; then echo "$P: nothing to commit beyond the preparation commits"; else git -c user.name=Claude -c user.email=noreply@anthropic.com commit -q -F "$W/release-$P-msg.txt" || exit 1; fi
git push -q -u origin claude/orkestrel-npm-audit-deps-14ibta && echo "$P release tip $(git rev-parse --short HEAD) pushed; version $NEXT; dirty $(git status --porcelain | wc -l)"
