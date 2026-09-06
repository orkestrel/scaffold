#!/usr/bin/env bash
# Successor to ts6-u6-lint-control.sh: same instrument, run from inside the scratch workspace so
# oxlint's population globs resolve. The first file reported "No files found to lint".
set -euo pipefail
root=/home/user/scaffold
work=$(mktemp -d "${TMPDIR:-/tmp}/u6-lint-control-XXXXXX")
trap 'rm -rf "$work"' EXIT
mkdir -p "$work/src/core" "$work/src/server"
node -e '
const fs = require("node:fs")
const config = JSON.parse(fs.readFileSync(process.argv[1], "utf8"))
delete config.jsPlugins
for (const key of Object.keys(config.rules)) if (key.startsWith("policy/")) delete config.rules[key]
config.overrides = config.overrides.filter((o) => !Object.keys(o.rules).some((k) => k.startsWith("policy/")))
fs.writeFileSync(process.argv[2], JSON.stringify(config, null, "\t"))
' "$root/.oxlintrc.json" "$work/.oxlintrc.json"

printf "import type { Node } from 'typescript'\n\nexport const seen: Node[] = []\n" > "$work/src/core/violation.ts"
printf "import ts from 'typescript/lib/typescript.js'\n\nexport const engine = ts\n" > "$work/src/server/subpath.ts"
printf "import type { Linter } from '@typescript-eslint/utils'\n\nexport const rules: Linter[] = []\n" > "$work/src/core/clean.ts"

binary=$(node -e 'const {createRequire}=require("node:module");const path=require("node:path");const r=createRequire("/home/user/scaffold/package.json");const p=r.resolve("oxlint/package.json");const m=require(p);console.log(path.resolve(path.dirname(p), typeof m.bin==="string"?m.bin:m.bin.oxlint))')

cd "$work"
echo "== violating population (expect a diagnostic per file) =="
set +e
node "$binary" --config .oxlintrc.json --deny-warnings src/core/violation.ts src/server/subpath.ts 2>&1 | tail -24
echo "violating exit: ${PIPESTATUS[0]}"
echo "== control (expect exit 0) =="
node "$binary" --config .oxlintrc.json --deny-warnings src/core/clean.ts 2>&1 | tail -10
echo "control exit: ${PIPESTATUS[0]}"
