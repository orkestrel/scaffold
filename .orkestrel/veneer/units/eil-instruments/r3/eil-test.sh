#!/bin/bash
# Builds the styles cascade and runs the named styles test files.
source /tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/eil-env.sh
npm run build:src:styles >/dev/null 2>&1 || { echo BUILD FAILED; npm run build:src:styles 2>&1 | tail -20; exit 1; }
npx vitest run --config configs/src/vite.styles.config.ts --no-cache "$@"
