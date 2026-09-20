#!/usr/bin/env bash
# U1-del: remove the legacy Veneer tree in one commit that names fc36cec as the reference.
set -e
cd "C:/Users/mikes/WebstormProjects/veneer"
git status --short
git rm -r -q -- src/styles app/browser/helpers.ts app/browser/styles app/browser/index.html app/browser/main.ts app/browser/env.d.ts tests demo ROADMAP.md guides configs/src/vite.styles.config.ts configs/app/vite.browser.config.ts
git commit -q -F "u1-del-message.txt" -- src/styles app/browser/helpers.ts app/browser/styles app/browser/index.html app/browser/main.ts app/browser/env.d.ts tests demo ROADMAP.md guides configs/src/vite.styles.config.ts configs/app/vite.browser.config.ts
git log --oneline -1
git status --short --branch
echo "--- bootstrap imports left under app and src ---"
if grep -rn "from 'bootstrap'\|import 'bootstrap'" app src 2>/dev/null; then echo 'bootstrap import remains' >&2; exit 1; fi
echo none
echo "--- remaining tree ---"
find . -path ./node_modules -prune -o -path ./.git -prune -o -path ./.idea -prune -o -type f -print | sort
