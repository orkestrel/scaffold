#!/usr/bin/env bash
# Runs the round-3 controls and mutations in the fresh copy through mutate.py: the width-cap
# visibility mutation over the section proofs, and the binding-case edge, viewport-case, and
# scroller-offset controls over the setup styles project.
set -uo pipefail
export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"
M="python3 /home/user/veneer-upl/tmp/units/upl-instruments-4/tools/mutate.py"
SECTIONS="npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/SizingSection.test.ts tests/app/browser/sections/PositionSection.test.ts tests/app/browser/sections/VisibilitySection.test.ts"
SETUP_STYLES="npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts"

$M control-sections-3 - - - -- $SECTIONS
$M max-width-cap-dropped app/browser/constants.ts \
  'vw-100 mw-100" aria-hidden="true"></span></p>' \
  'vw-100" aria-hidden="true"></span></p>' \
  -- $SECTIONS

$M control-setup-styles-3 - - - -- $SETUP_STYLES
$M edges-emptied tests/setupStyles.ts \
  "export const OFFSET_EDGES = Object.freeze(['top', 'bottom', 'start', 'end'])" \
  "export const OFFSET_EDGES = Object.freeze([])" \
  -- $SETUP_STYLES
$M viewport-cases-emptied tests/setupStyles.ts \
  "export const VIEWPORT_SIZE_CASES = Object.freeze([
	Object.freeze({ name: 'vw-100', property: 'width' }),
	Object.freeze({ name: 'min-vw-100', property: 'width' }),
	Object.freeze({ name: 'vh-100', property: 'height' }),
	Object.freeze({ name: 'min-vh-100', property: 'height' }),
])" \
  "export const VIEWPORT_SIZE_CASES = Object.freeze([])" \
  -- $SETUP_STYLES
$M scroller-offset-zero tests/setupStyles.ts \
  '	offset: 200,' \
  '	offset: 0,' \
  -- $SETUP_STYLES
