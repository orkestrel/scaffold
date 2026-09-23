#!/usr/bin/env bash
# Prints the Sizing section proof's cap readings at each variant width in the land copy, by adding
# one console line to the copy's section proof, running it, and restoring the proof from the worktree.
set -uo pipefail
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
W=/home/user/veneer-upl
F=$W/tmp/probe/fresh
P=tests/app/browser/sections/SizingSection.test.ts
python3 - "$F/$P" <<'PY'
import sys
p=sys.argv[1]; s=open(p).read()
old="\t\t\t\tconst [across, down] = reading.window\n"
assert old in s
s=s.replace(old, old+"\t\t\t\tconsole.log('CAPS', width, JSON.stringify(reading.caps), JSON.stringify(reading.viewport), reading.page)\n")
open(p,'w').write(s)
PY
cd "$F"
npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser "$P" 2>&1 | sed 's/\x1b\[[0-9;]*m//g' | grep -E 'CAPS|Tests '
cp "$W/$P" "$F/$P"
