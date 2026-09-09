#!/usr/bin/env bash
set -euo pipefail

source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh

out="$SCR/d7n-guides-api-scaffold-commit"
verdict="$SCAFFOLD/.orkestrel/campaign/docs-parity/d7n-guides-api-correction-verdict.md"
test ! -e "$out"
test "$(git -C "$SCAFFOLD" branch --show-current)" = claude/orkestrel-npm-audit-deps-14ibta
rg -q '^VERDICT: PASS' "$verdict"
git -C "$SCAFFOLD" fetch origin
git -C "$SCAFFOLD" merge-base --is-ancestor origin/main HEAD
mkdir -p "$out"
git -C "$SCAFFOLD" diff HEAD -- . ':(exclude).orkestrel/campaign/docs-parity' > "$out/product-before.diff.txt"
test "$(sha256sum "$out/product-before.diff.txt" | cut -d ' ' -f 1)" = 6f504df10efea41646b7b2935aae03410fd4b6c5156766f4306475df69e08969
git -C "$SCAFFOLD" diff --check
git -C "$SCAFFOLD" ls-files --stage -- package.json package-lock.json > "$out/metadata-index-before.txt"
sha256sum "$SCAFFOLD/package.json" "$SCAFFOLD/package-lock.json" > "$out/metadata-before.sha256"

paths=(
  .claude/rules/documentation.md
  PROPOSAL.md
  guides/guide.md
  guides/scaffold.md
  host.json
  package-lock.json
  package.json
  scripts/docs.ts
  src/core/compilers.ts
  src/core/constants.ts
  src/server/Materializer.ts
  src/server/types.ts
  tests/distribution.test.ts
  tests/guides.test.ts
  tests/setupServer.test.ts
  tests/setupServer.ts
  tests/src/bin/CLI.test.ts
  tests/src/core/Compiler.test.ts
  tests/src/core/compilers.test.ts
  tests/src/core/fixtures/app-only-toolchain.txt
  tests/src/core/fixtures/setup-false-manifest.txt
  tests/src/core/fixtures/source-manifest.txt
  tests/src/core/helpers.test.ts
  tests/src/core/templates.test.ts
  tests/src/server/Materializer.test.ts
  tests/src/server/helpers.test.ts
)
git -C "$SCAFFOLD" add -- "${paths[@]}"
git -C "$SCAFFOLD" -c user.name=Claude -c user.email=noreply@anthropic.com commit --only -F "$SCR/guides-api-scaffold-message.txt" -- "${paths[@]}"
git -C "$SCAFFOLD" rev-parse HEAD > "$out/head.txt"
git -C "$SCAFFOLD" show --format=fuller --stat HEAD > "$out/commit.txt"
sha256sum --check "$out/metadata-before.sha256" > "$out/metadata-preservation.txt"
git -C "$SCAFFOLD" status --short > "$out/status.txt"
git -C "$SCAFFOLD" diff HEAD -- . ':(exclude).orkestrel/campaign/docs-parity' > "$out/product-after.diff.txt"
test ! -s "$out/product-after.diff.txt"
git -C "$SCAFFOLD" push -u origin claude/orkestrel-npm-audit-deps-14ibta
git -C "$SCAFFOLD" push origin HEAD:main
git -C "$SCAFFOLD" push origin HEAD:claude/docs-parity-windows-01a0810d
git -C "$SCAFFOLD" rev-parse HEAD
