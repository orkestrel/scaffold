#!/usr/bin/env bash
# Regenerates the consumer/ fixture for ts6-m15 from published.json.
# Run from the consumer/ directory: bash make.sh
set -euo pipefail

TYPE_NAME="ArrayShapeOptions"
EXTRA_NAME="EXTRA_NAME"

node <<'NODE'
const fs = require('fs');
const keys = JSON.parse(fs.readFileSync('published.json', 'utf8'));
const TYPE_NAME = 'ArrayShapeOptions';
const EXTRA_NAME = 'EXTRA_NAME';

function entryLines(list) {
  return list.map((k) => `  ${JSON.stringify(k)}: true,`).join('\n');
}

function bothDirections(publishedList) {
  return `import * as entry from '@orkestrel/contract';

const published = {
${entryLines(publishedList)}
} as const;

const declared: Record<keyof typeof entry, true> = published;
const surfaced: Record<keyof typeof published, true> = declared;

void surfaced;
`;
}

// all.ts: every runtime key, both directions, must pass.
fs.writeFileSync('all.ts', bothDirections(keys));

// missing.ts: one runtime key omitted from published; declared (Record<keyof typeof entry,...> = published) fails.
fs.writeFileSync('missing.ts', bothDirections(keys.slice(1)));

// extra.ts: one invented key added to published; surfaced (Record<keyof typeof published,...> = declared) fails.
fs.writeFileSync('extra.ts', bothDirections([...keys, EXTRA_NAME]));

// typeonly.ts: TYPE_NAME (a declared-only, non-runtime name) added to published.
fs.writeFileSync('typeonly.ts', bothDirections([...keys, TYPE_NAME]));

// fresh-extra.ts: declared is a fresh object literal (not assigned from a variable), so the
// excess-property check applies to the extra key directly.
fs.writeFileSync(
  'fresh-extra.ts',
  `import * as entry from '@orkestrel/contract';

const declared: Record<keyof typeof entry, true> = {
${entryLines(keys)}
  ${JSON.stringify(EXTRA_NAME)}: true,
};

void declared;
`,
);

// single.ts: the subjective lane's original one-direction shape. published carries an invented
// extra key; only declared (published -> entry) is checked, not the reverse.
fs.writeFileSync(
  'single.ts',
  `import * as entry from '@orkestrel/contract';

const published = {
${entryLines(keys)}
  ${JSON.stringify(EXTRA_NAME)}: true,
} as const;

const declared: Record<keyof typeof entry, true> = published;

void declared;
`,
);
NODE

for resolution in bundler node16 nodenext; do
  case "$resolution" in
    bundler) moduleValue="esnext" ;;
    node16) moduleValue="node16" ;;
    nodenext) moduleValue="nodenext" ;;
  esac
  for case_name in all missing extra typeonly fresh-extra single; do
    cat > "tsconfig.${resolution}.${case_name}.json" <<EOF
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true,
    "types": [],
    "target": "esnext",
    "module": "${moduleValue}",
    "moduleResolution": "${resolution}",
    "skipLibCheck": false
  },
  "files": ["${case_name}.ts"]
}
EOF
  done
done
