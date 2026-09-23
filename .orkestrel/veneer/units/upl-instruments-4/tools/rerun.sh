#!/usr/bin/env bash
# Re-runs the infix mutation with a pattern that matches the `BREAKPOINT_INFIXES` declaration alone.
# The first run's pattern also matched the `TABLE_RESPONSIVE_CASES` declaration, which derives its
# rows through the same filter, so it reddened the table case beside the placement case; that log
# stays under logs/mutations/setup-infix-dropped.log.txt as the record of the wider mutation.
set -uo pipefail
M="python3 /home/user/veneer-upl/tmp/units/upl-instruments-4/tools/mutate.py"
SETUP_STYLES="npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts"
N=$'\n'
T=$'\t'
$M setup-infix-narrowed tests/setupStyles.ts "export const BREAKPOINT_INFIXES = Object.freeze(${N}${T}GRID_BREAKPOINT_CASES.filter(({ boundary }) => boundary !== 0)" "export const BREAKPOINT_INFIXES = Object.freeze(${N}${T}GRID_BREAKPOINT_CASES.filter(({ boundary }) => boundary > 576)" -- $SETUP_STYLES
