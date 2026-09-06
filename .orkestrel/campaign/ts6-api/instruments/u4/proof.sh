#!/usr/bin/env bash
# Runs the generated core-only distribution proof over a staged copy of this workspace, then the
# two planted controls, from the current `dist/`. Re-emits the proof into the stage first, so the
# template as it stands is what runs. Writes under the scratch directory alone.
set -u
ROOT=/home/user/scaffold
U4=/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/u4
STAGE=$U4/stage
LOGS=$U4/logs
mkdir -p "$LOGS" "$STAGE/tests"
rm -rf "$STAGE/dist"; cp -r "$ROOT/dist" "$STAGE/dist"
cp "$ROOT/package.json" "$STAGE/package.json"; cp "$ROOT/README.md" "$STAGE/README.md"
[ -e "$STAGE/node_modules" ] || ln -s "$ROOT/node_modules" "$STAGE/node_modules"
node "$U4/emit.mjs" "$U4/emitted-current"; echo "emit exit=$?"
cp "$U4/emitted-current/core.distribution.test.ts" "$STAGE/tests/distribution.test.ts"
cd "$STAGE" || exit 1
node node_modules/vitest/vitest.mjs run --config vitest.config.ts --no-cache --reporter=dot > "$LOGS/baseline-current.log.txt" 2>&1
echo "baseline exit=$?"; tail -5 "$LOGS/baseline-current.log.txt"
bash "$U4/plant.sh" extra; echo "extra: $(grep -c PLANTED_EXTRA "$LOGS/extra.log.txt") lines name the plant; $(tail -1 "$LOGS/extra.log.txt")"
bash "$U4/plant.sh" undeclared; echo "undeclared: $(grep -c PLANTED_DECLARED "$LOGS/undeclared.log.txt") lines name the plant; $(tail -1 "$LOGS/undeclared.log.txt")"
