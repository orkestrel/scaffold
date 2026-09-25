#!/usr/bin/env bash
# J-ORACLE-FIX-OFFCANVAS round 5 helper mutation: rewrites `holdsFocus` to read the document's
# `activeElement` in place of the element's own root, over the fixed helpers.ts from a backup, runs the
# `holdsFocus` suite, and restores the fixed file. The log lands beside this file.
set -u
cd /c/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas || exit 2
OUT=tmp/j-oracle-fix-offcanvas
SOURCE=src/browser/helpers.ts
BACKUP=$OUT/helpers.ts.fixed-7
cp "$SOURCE" "$BACKUP"
sed -i 's/^\treturn root === scope \&\& scope.activeElement === element$/\treturn element.ownerDocument.activeElement === element/' "$SOURCE"
cmp -s "$SOURCE" "$BACKUP" && echo "mutation not written" && exit 1
log=$OUT/mutation-7-helper-document.log.txt
npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/helpers.test.ts -t holdsFocus > "$log" 2>&1
echo "helper-document exit $?"
grep -E "^ +×|Tests +[0-9]|^AssertionError|❯ tests/src/browser/helpers.test.ts:[0-9]+" "$log"
cp "$BACKUP" "$SOURCE"
cmp "$SOURCE" "$BACKUP" && echo "source restored"
