#!/usr/bin/env bash
set -o pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
cd "$FLEET/program"

if git diff -U0 -- src | grep -E '^[-+]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[-+]\s*(\*|//|/\*\*)'; then
	exit 1
fi

if grep -nE '^\| `[A-Z_]+` +\| const +\| `(false|true|'"'"'[^'"'"']*'"'"')` ' guides/program.md; then
	exit 1
fi

if grep -nE '\bOMITTED\b' guides/program.md; then
	exit 1
fi

test "$(grep -c 'synchronous' guides/program.md)" -ge 2
test "$(grep -c 'In a guard table' guides/program.md)" -eq 1

if grep -n 'then authorize' guides/program.md README.md; then
	exit 1
fi

diff <(sed -n '1,3p' /c/Users/mikes/WebstormProjects/abort/tests/guides.test.ts) <(sed -n '1,3p' tests/guides.test.ts)
diff <(sed -n '3,6p' guides/program.md) <(sed -n '3,6p' README.md)

if awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^```/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/program.md | grep .; then
	exit 1
fi

if grep -nE '^\| `[^`]+` +\| (function|const|class) +\| +\| ' guides/program.md; then
	exit 1
fi

if grep -rnE '\{@link ([^}]+#|#)[^}]+\}' src; then
	exit 1
fi

sed -n '/^## Install$/,+2p;/^## Usage$/,+2p' README.md
