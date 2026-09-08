#!/usr/bin/env bash
set -eu
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
if rg -n '^(const entryDirectories|const entryPaths|const entrySurfaces|function surfaceForDirectory|function requireDirectorySurface|\tconst surface = Array.from)' "$FLEET/database/tests/guides.test.ts"; then
  printf 'FAIL: package surface derivation remains outside its case\n'
  exit 1
fi
printf 'PASS: the named package surface derivation is contained in its case\n'
