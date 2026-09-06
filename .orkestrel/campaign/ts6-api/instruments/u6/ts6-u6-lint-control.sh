#!/usr/bin/env bash
# Negative control for the `typescript` restricted-import row added to every population in
# .oxlintrc.json. Builds a scratch workspace outside the repository, copies the root lint
# configuration into it with the workspace-local JS plugin dropped (the rule under test is a
# core rule), and runs the real oxlint binary over a violating file and a clean control.
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

# The violation: a bare compiler import in a governed population.
printf "import type { Node } from 'typescript'\n\nexport const seen: Node[] = []\n" > "$work/src/core/violation.ts"
# A second spelling the row must also reach: a subpath of the same package.
printf "import ts from 'typescript/lib/typescript.js'\n\nexport const engine = ts\n" > "$work/src/server/subpath.ts"
# The control, drawn from outside the row's membership: a package whose name only starts with
# the same letters, which the row must admit.
printf "import type { Linter } from '@typescript-eslint/utils'\n\nexport const rules: Linter[] = []\n" > "$work/src/core/clean.ts"

binary=$(node -e 'const {createRequire}=require("node:module");const r=createRequire("/home/user/scaffold/package.json");const p=r.resolve("oxlint/package.json");const m=require(p);console.log(require("node:path").resolve(require("node:path").dirname(p), typeof m.bin==="string"?m.bin:m.bin.oxlint))')

echo "== violating population (expect a diagnostic per file) =="
set +e
node "$binary" --config "$work/.oxlintrc.json" --deny-warnings "src/core/violation.ts" "src/server/subpath.ts" 2>&1 | tail -20
echo "violating exit: ${PIPESTATUS[0]}"
echo "== control (expect exit 0) =="
node "$binary" --config "$work/.oxlintrc.json" --deny-warnings "src/core/clean.ts" 2>&1 | tail -10
echo "control exit: ${PIPESTATUS[0]}"
