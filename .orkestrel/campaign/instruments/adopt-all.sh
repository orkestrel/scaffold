#!/bin/bash
# devadopt: rewrite every checkout's tests/guides.test.ts for the renamed guide helpers, adapt
# brief's declarationBody calls, commit and push each changed checkout, then re-run the dev sweep.
set -u
W=/home/user/work
MSG="Adopt the renamed guide helpers in the parity test

@orkestrel/guide renamed fenceImports, missingSymbols, and symbolKey to
extractFenceImports, findMissingSymbols, and computeSymbolKey in its
breaking unit; the parity test imports and calls the new names.

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Cb3GKyBNeLz88N7b4LPGYW"
for d in /home/user/fleet/*/ /home/user/scaffold/; do
	p=$(basename "$d"); [ "$p" = supervisor ] && continue
	[ -f "$d/package.json" ] || continue
	node $W/adoptguide.mjs "$d"
	if [ "$p" = brief ]; then
		sed -i 's/^\tdeclarationBody,$/\textractDeclaration,/; s/const members = declarationBody(\(.*\))$/const members = extractDeclaration(\1)?.body ?? []/' "$d/tests/guides.test.ts"
		node $W/adoptguide.mjs "$d" >/dev/null
		echo "brief: declarationBody adapted: $(grep -c 'extractDeclaration' "$d/tests/guides.test.ts") lines"
	fi
	if [ -n "$(git -C "$d" status --porcelain -- tests/guides.test.ts)" ]; then
		git -C "$d" add tests/guides.test.ts
		git -C "$d" -c user.name=Claude -c user.email=noreply@anthropic.com commit -q -m "$MSG" && echo "$p: committed $(git -C "$d" rev-parse --short HEAD)"
		git -C "$d" push -q -u origin claude/orkestrel-npm-audit-deps-14ibta >/dev/null 2>&1 && echo "$p: pushed" || echo "$p: PUSH FAILED"
	fi
done
echo "ADOPT-DONE"
bash $W/devsweep.sh
