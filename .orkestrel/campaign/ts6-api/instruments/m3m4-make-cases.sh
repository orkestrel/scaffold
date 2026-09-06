#!/bin/bash
set -e
BASE="$(cd "$(dirname "$0")" && pwd)"
CASES="$BASE/cases"
rm -rf "$CASES"
mkdir -p "$CASES"

mktsconfig() {
  local dir="$1"
  shift
  mkdir -p "$dir"
  echo '{"type":"module"}' > "$dir/package.json"
  if [ -n "$1" ]; then
    printf '%s' "$1" > "$dir/tsconfig.json"
  else
    cat > "$dir/tsconfig.json" <<'EOF'
{
  "compilerOptions": {
    "strict": true,
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "target": "esnext",
    "types": [],
    "noEmit": true
  },
  "include": ["src/**/*.ts"]
}
EOF
  fi
}

# plain
mktsconfig "$CASES/plain"
mkdir -p "$CASES/plain/src"
printf "export const n: number = 'x';\n" > "$CASES/plain/src/a.ts"

# elaborated
mktsconfig "$CASES/elaborated"
mkdir -p "$CASES/elaborated/src"
cat > "$CASES/elaborated/src/a.ts" <<'EOF'
interface Shape {
  size: { width: number };
}
export const s: Shape = { size: { width: 'wide' } };
EOF

# related
mktsconfig "$CASES/related"
mkdir -p "$CASES/related/src"
cat > "$CASES/related/src/a.ts" <<'EOF'
interface Shape {
  size: { width: number };
}
function take(shape: Shape): void {
  void shape;
}
take({ size: { width: 'wide' } });
EOF

# nonbmp
mktsconfig "$CASES/nonbmp"
mkdir -p "$CASES/nonbmp/src"
printf "const \xf0\x9f\x98\x80 = 1; export const n: number = 'x';\n" > "$CASES/nonbmp/src/a.ts"

# crlf
mktsconfig "$CASES/crlf"
mkdir -p "$CASES/crlf/src"
printf "const a = 1;\r\nconst b = 2;\r\nexport const n: number = 'x';\r\n" > "$CASES/crlf/src/a.ts"

# twofiles
mktsconfig "$CASES/twofiles"
mkdir -p "$CASES/twofiles/src"
printf "export const n: number = 'x';\n" > "$CASES/twofiles/src/a.ts"
printf "export const m: number = 'y';\n" > "$CASES/twofiles/src/b.ts"

# noinputs
mktsconfig "$CASES/noinputs" '{"compilerOptions":{"strict":true,"module":"nodenext","moduleResolution":"nodenext","target":"esnext","types":[],"noEmit":true},"files":[],"include":[]}'
mkdir -p "$CASES/noinputs/src"

# malformed
mktsconfig "$CASES/malformed" '{ "compilerOptions": {'
mkdir -p "$CASES/malformed/src"
printf "export const n = 1;\n" > "$CASES/malformed/src/a.ts"

# unknownoption
mktsconfig "$CASES/unknownoption" '{"compilerOptions":{"strict":true,"module":"nodenext","moduleResolution":"nodenext","target":"esnext","types":[],"noEmit":true,"bogus":true},"include":["src/**/*.ts"]}'
mkdir -p "$CASES/unknownoption/src"
printf "export const n = 1;\n" > "$CASES/unknownoption/src/a.ts"

# missingextends
mktsconfig "$CASES/missingextends" '{"extends":"./absent.json","compilerOptions":{"noEmit":true},"include":["src/**/*.ts"]}'
mkdir -p "$CASES/missingextends/src"
printf "export const n = 1;\n" > "$CASES/missingextends/src/a.ts"

# missingproject: no directory created (case: absent path)

# mixed: unknownoption's config plus plain's source
mktsconfig "$CASES/mixed" '{"compilerOptions":{"strict":true,"module":"nodenext","moduleResolution":"nodenext","target":"esnext","types":[],"noEmit":true,"bogus":true},"include":["src/**/*.ts"]}'
mkdir -p "$CASES/mixed/src"
printf "export const n: number = 'x';\n" > "$CASES/mixed/src/a.ts"

echo "cases created"
