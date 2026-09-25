#!/usr/bin/env bash
# Builds the styles and runs one style proof file filtered to the motion-factor case.
cd /home/user/veneer-mfac || exit 1
. tmp/units/mfac-env.sh
npm run build:src:styles > /dev/null 2>&1 || exit 2
npx vitest run --config configs/src/vite.styles.config.ts --reporter=verbose "$1" -t 'motion factor'
