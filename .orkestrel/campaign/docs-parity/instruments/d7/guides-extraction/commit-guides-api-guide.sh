#!/usr/bin/env bash
set -euo pipefail
source /c/Users/mikes/WebstormProjects/scaffold/tmp/pass/pass-env.sh
target="$FLEET/guide"
out="$SCR/d7n-guides-api-guide-commit"
test ! -e "$out"
test "$(git -C "$target" branch --show-current)" = claude/orkestrel-npm-audit-deps-14ibta
rg -q '^VERDICT: PASS' "$SCAFFOLD/.orkestrel/campaign/docs-parity/d7n-guides-api-correction-verdict.md"
git -C "$target" merge-base --is-ancestor origin/main HEAD
mkdir -p "$out"
git -C "$target" diff HEAD -- . > "$out/product-before.diff.txt"
test "$(sha256sum "$out/product-before.diff.txt" | cut -d ' ' -f 1)" = 3d051a7277d6fb4516face9efb08b7a826001c7490af9de3836d8d68995d8af9
git -C "$target" diff --check
sha256sum "$target/package.json" "$target/package-lock.json" > "$out/metadata-before.sha256"
paths=(
  README.md
  configs/src/tsconfig.server.json
  configs/src/vite.server.config.ts
  guides/README.md
  guides/guide.md
  package.json
  src/core/Parity.ts
  src/core/constants.ts
  src/core/factories.ts
  src/core/helpers.ts
  src/core/index.ts
  src/core/shapers.ts
  src/core/types.ts
  src/core/validators.ts
  src/server/GuideCommand.ts
  src/server/constants.ts
  src/server/helpers.ts
  src/server/index.ts
  src/server/parsers.ts
  src/server/types.ts
  tests/guides.test.ts
  tests/setup.ts
  tests/setupServer.ts
  tests/src/core/Parity.test.ts
  tests/src/core/factories.test.ts
  tests/src/core/helpers.test.ts
  tests/src/core/shapers.test.ts
  tests/src/core/validators.test.ts
  tests/src/server/GuideCommand.test.ts
  tests/src/server/helpers.test.ts
  tests/src/server/parsers.test.ts
  tsconfig.json
  vite.config.ts
)
git -C "$target" add -- "${paths[@]}"
git -C "$target" -c user.name=Claude -c user.email=noreply@anthropic.com commit --only -F "$SCR/guides-api-guide-message.txt" -- "${paths[@]}"
git -C "$target" rev-parse HEAD > "$out/head.txt"
git -C "$target" show --format=fuller --stat HEAD > "$out/commit.txt"
sha256sum --check "$out/metadata-before.sha256" > "$out/metadata-preservation.txt"
git -C "$target" status --short > "$out/status.txt"
git -C "$target" diff HEAD -- . > "$out/product-after.diff.txt"
test ! -s "$out/product-after.diff.txt"
git -C "$target" push -u origin claude/orkestrel-npm-audit-deps-14ibta
git -C "$target" rev-parse HEAD
