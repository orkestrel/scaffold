#!/usr/bin/env bash
set -uo pipefail

SCRATCH="/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/ts6/m2"
PROBE="/home/user/fleet/probe"
MIRROR="$SCRATCH/mirror"
TSC="node $MIRROR/node_modules/typescript/bin/tsc"
TSCONFIG="$MIRROR/tmp-type.tsconfig.json"
INDEX="$MIRROR/src/core/index.ts"
DRAFT="$MIRROR/src/core/zz-draft.ts"
BUILDINFO="$MIRROR/core.tsbuildinfo"

echo "== step 1: build mirror =="
rm -rf "$MIRROR"
mkdir -p "$MIRROR"
cp -r "$PROBE/src" "$MIRROR/src"
cp -r "$PROBE/configs" "$MIRROR/configs"
cp "$PROBE/tsconfig.json" "$MIRROR/tsconfig.json"
cp "$PROBE/package.json" "$MIRROR/package.json"
ln -s "$PROBE/node_modules" "$MIRROR/node_modules"
echo "mirror built at $MIRROR"

echo "== step 2: write tmp-type.tsconfig.json =="
cat > "$TSCONFIG" <<'EOF'
{
  "extends": "./configs/src/tsconfig.core.json",
  "compilerOptions": {
    "noEmit": true,
    "declaration": false,
    "emitDeclarationOnly": false,
    "incremental": true,
    "tsBuildInfoFile": "./core.tsbuildinfo",
    "rootDir": "./src/core"
  },
  "include": ["./src/core/**/*.ts"],
  "files": []
}
EOF
echo "wrote $TSCONFIG"

echo "== --showConfig output =="
(cd "$MIRROR" && $TSC --showConfig -p "$TSCONFIG")
echo "exit=$?"

ORIGINAL_INDEX_CONTENT="$(cat "$INDEX")"

run_step() {
  local name="$1"
  local start end ms exit_code diag_count output
  start=$(date +%s%N)
  output=$(cd "$MIRROR" && $TSC --noEmit --pretty false -p "$TSCONFIG" 2>&1)
  exit_code=$?
  end=$(date +%s%N)
  ms=$(( (end - start) / 1000000 ))
  if [ -z "$output" ]; then
    diag_count=0
  else
    diag_count=$(printf '%s\n' "$output" | grep -c "error TS" || true)
  fi
  echo "step=$name ms=$ms exit=$exit_code diagnostics=$diag_count"
  if [ -n "$output" ]; then
    echo "--- output for $name ---"
    echo "$output"
    echo "--- end output for $name ---"
  fi
}

echo "== step 3: timed runs =="

# cold: remove buildinfo first
rm -f "$BUILDINFO"
run_step "cold"

# buildinfo size after cold
if [ -f "$BUILDINFO" ]; then
  echo "buildinfo-size-after-cold=$(wc -c < "$BUILDINFO")"
else
  echo "buildinfo-size-after-cold=MISSING"
fi

run_step "warm"

find "$MIRROR/src" -type f -exec touch {} +
run_step "touch-all"

printf '%s\nexport const zzDraft = 1\n' "$ORIGINAL_INDEX_CONTENT" > "$INDEX"
run_step "draft-replace"

printf '%s' "$ORIGINAL_INDEX_CONTENT" > "$INDEX"
run_step "draft-restore"

printf "export const n: number = 'x'\n" > "$DRAFT"
run_step "draft-add"

rm -f "$DRAFT"
run_step "draft-remove"

cp -r "$PROBE/src" "$MIRROR/"
cp -r "$PROBE/configs" "$MIRROR/"
cp "$PROBE/tsconfig.json" "$MIRROR/tsconfig.json"
cp "$PROBE/package.json" "$MIRROR/package.json"
run_step "refresh-all"

run_step "warm-after-refresh"

echo "== step 4: final buildinfo size and probe status =="
if [ -f "$BUILDINFO" ]; then
  echo "buildinfo-size-after-last=$(wc -c < "$BUILDINFO")"
else
  echo "buildinfo-size-after-last=MISSING"
fi

echo "-- git -C $PROBE status --short --"
git -C "$PROBE" status --short
echo "exit=$?"
