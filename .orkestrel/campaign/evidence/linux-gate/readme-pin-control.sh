#!/usr/bin/env bash
# readme-pin-control.sh — negative and positive control for the README Node-floor pin
# in tests/guides.test.ts (fix-round audit claim 8). Runs in a system temporary tree
# archived from the fix tip so the checkout is never edited.
set -u
tip="${1:-373d29e}"
root=$(mktemp -d)
git -C /home/user/scaffold archive "$tip" | tar -x -C "$root"
ln -s /home/user/scaffold/node_modules "$root/node_modules"
echo "== tree: $root from $tip"
echo "== negative control: README floor rewritten to 22.12"
sed -i 's/Node 22\.18\.0 or later/Node 22.12 or later/' "$root/README.md"
sed -n '12p' "$root/README.md"
( cd "$root" && npm run test:guides 2>&1 | grep -E 'README|expected|Tests |Test Files|✓|×|FAIL' ; echo "negative exit=${PIPESTATUS[0]}" )
echo "== positive control: README restored to 22.18.0"
sed -i 's/Node 22\.12 or later/Node 22.18.0 or later/' "$root/README.md"
sed -n '12p' "$root/README.md"
( cd "$root" && npm run test:guides 2>&1 | grep -E 'Tests |Test Files|FAIL' ; echo "positive exit=${PIPESTATUS[0]}" )
rm -rf "$root"
