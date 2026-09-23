#!/usr/bin/env bash
# Runs every control and mutation of the UTIL-PLACEMENT round-2 record in the fresh copy, one at a
# time, through mutate.py. Pass group names (controls styles sections setup service) to run a subset.
set -uo pipefail
M="python3 /home/user/veneer-upl/tmp/units/upl-instruments-2/tools/mutate.py"
STYLES="npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/sizing.test.ts tests/src/styles/utilities/position.test.ts tests/src/styles/utilities/visually-hidden.test.ts tests/src/styles/utilities/visibility.test.ts tests/src/styles/components/position.test.ts"
SECTIONS="npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/SizingSection.test.ts tests/app/browser/sections/PositionSection.test.ts tests/app/browser/sections/VisibilitySection.test.ts"
SETUP_STYLES="npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts"
SETUP_BROWSER="npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup:browser tests/setupBrowser.test.ts"
SERVICE="npm run test:service"
US=src/styles/utilities
CS=src/styles/components
T=$'\t'
N=$'\n'
groups="${*:-controls styles sections setup service}"

for group in $groups; do case $group in
controls)
	$M control-styles - - - -- $STYLES
	$M control-sections - - - -- $SECTIONS
	$M control-setup-styles - - - -- $SETUP_STYLES
	$M control-setup-browser - - - -- $SETUP_BROWSER
	$M control-service - - - -- $SERVICE
	;;
styles)
	$M step-length $US/_sizing.scss "25: 25%," "25: 25px," --build -- $STYLES
	$M importance-dropped src/styles/_mixins.scss '$value !important;' '$value;' --build -- $STYLES
	$M cap-halved $US/_sizing.scss "\$whole: (${N}${T}${T}100: 100%," "\$whole: (${N}${T}${T}100: 50%," --build -- $STYLES
	$M viewport-width-length $US/_sizing.scss "100: 100vw," "100: 100px," --build -- $STYLES
	$M viewport-height-length $US/_sizing.scss "100: 100vh," "100: 100px," --build -- $STYLES
	$M min-vw-omitted $US/_sizing.scss "${T}${T}@include utility(min-vw, min-width, \$across, \$infix);${N}" "" --build -- $STYLES
	$M min-vh-omitted $US/_sizing.scss "${T}${T}@include utility(min-vh, min-height, \$down, \$infix);${N}" "" --build -- $STYLES
	$M order-swapped $US/_sizing.scss "${T}${T}@include utility(w, width, \$steps, \$infix);${N}${T}${T}@include utility(mw, max-width, \$whole, \$infix);${N}${T}${T}@include utility(vw, width, \$across, \$infix);${N}" "${T}${T}@include utility(mw, max-width, \$whole, \$infix);${N}${T}${T}@include utility(vw, width, \$across, \$infix);${N}${T}${T}@include utility(w, width, \$steps, \$infix);${N}" --build -- $STYLES
	$M unlayered-sizing $US/_sizing.scss "@layer utilities {" "@media all {" --build -- $STYLES
	$M sizing-responsive $US/_sizing.scss "@include utility(w, width, \$steps, \$infix);" "@include utility(w, width, \$steps, \$infix, \$responsive: true);" --build -- $STYLES
	$M sticky-value-omitted $US/_position.scss "static relative absolute fixed sticky" "static relative absolute fixed" --build -- $STYLES
	$M edge-length $US/_position.scss "50: 50%," "50: 50px," --build -- $STYLES
	$M start-logical $US/_position.scss "utility(start, left," "utility(start, inset-inline-start," --build -- $STYLES
	$M translate-x-quarter $US/_position.scss "x: translateX(-50%)," "x: translateX(-25%)," --build -- $STYLES
	$M level-3-zero $US/_position.scss "3: 3," "3: 0," --build -- $STYLES
	$M position-responsive $US/_position.scss "@include utility(top, top, \$edges, \$infix);" "@include utility(top, top, \$edges, \$infix, \$responsive: true);" --build -- $STYLES
	$M unlayered-position $US/_position.scss "@layer utilities {" "@media all {" --build -- $STYLES
	$M fixed-top-edge $CS/_position.scss ".fixed-top {${N}${T}${T}position: fixed;${N}${T}${T}top: 0;" ".fixed-top {${N}${T}${T}position: fixed;${N}${T}${T}top: 10px;" --build -- $STYLES
	$M fixed-literal $CS/_position.scss "z-index: var(--vn-stack-fixed);" "z-index: 1030;" --build -- $STYLES
	$M sticky-literal $CS/_position.scss "z-index: var(--vn-stack-sticky);" "z-index: 1020;" --build -- $STYLES
	$M sticky-absolute $CS/_position.scss "-top {${N}${T}${T}${T}position: sticky;" "-top {${N}${T}${T}${T}position: absolute;" --build -- $STYLES
	$M fixed-important $CS/_position.scss ".fixed-top {${N}${T}${T}position: fixed;" ".fixed-top {${N}${T}${T}position: fixed !important;" --build -- $STYLES
	$M boundary-exclusive src/styles/_mixins.scss "@media (width >= #{\$width}) {" "@media (width > #{\$width}) {" --build -- $STYLES
	$M helper-in-components $US/_visually-hidden.scss "@layer utilities {" "@layer components {" --build -- $STYLES
	$M caption-branch-dropped $US/_visually-hidden.scss "&:not(caption) {" "& {" --build -- $STYLES
	$M child-overflow-dropped $US/_visually-hidden.scss "${T}${T}* {${N}${T}${T}${T}overflow: hidden !important;${N}${T}${T}}${N}" "" --build -- $STYLES
	$M focus-within-dropped $US/_visually-hidden.scss ".visually-hidden-focusable:not(:focus):not(:focus-within) {" ".visually-hidden-focusable:not(:focus) {" --build -- $STYLES
	$M both-focus-dropped $US/_visually-hidden.scss ".visually-hidden-focusable:not(:focus):not(:focus-within) {" ".visually-hidden-focusable {" --build -- $STYLES
	$M focus-dropped $US/_visually-hidden.scss ".visually-hidden-focusable:not(:focus):not(:focus-within) {" ".visually-hidden-focusable:not(:focus-within) {" --build -- $STYLES
	$M helper-width-normal $US/_visually-hidden.scss "width: 1px !important;" "width: 1px;" --build -- $STYLES
	$M helper-static $US/_visually-hidden.scss "position: absolute !important;" "position: static !important;" --build -- $STYLES
	$M visible-hidden $US/_visibility.scss "visible: visible," "visible: inherit," --build -- $STYLES
	$M invisible-display-none $US/_visibility.scss "@layer utilities {" "@layer utilities {${N}${T}.invisible {${N}${T}${T}display: none !important;${N}${T}}${N}" --build -- $STYLES
	$M visibility-order-reversed $US/_visibility.scss "visible: visible,${N}${T}${T}${T}${T}invisible: hidden," "invisible: hidden,${N}${T}${T}${T}${T}visible: visible," --build -- $STYLES
	$M visibility-responsive $US/_visibility.scss "${T}${T}${T}\$infix${N}${T}${T});" "${T}${T}${T}\$infix,${N}${T}${T}${T}\$responsive: true${N}${T}${T});" --build -- $STYLES
	$M unlayered-visibility $US/_visibility.scss "@layer utilities {" "@media all {" --build -- $STYLES
	;;
sections)
	$M frame-contain-dropped app/browser/styles/_shell.scss "${T}${T}contain: layout paint;${N}" "" -- $SECTIONS
	$M frame-overflow-auto app/browser/styles/_shell.scss "overflow: clip;" "overflow: auto;" -- $SECTIONS
	$M frame-height-unbounded app/browser/styles/_shell.scss "${T}${T}height: 24rem;${N}" "" -- $SECTIONS
	$M frame-shadowed app/browser/styles/_shell.scss "${T}${T}height: 24rem;${N}" "${T}${T}height: 24rem;${N}${T}${T}box-shadow: 0 0 0 1px currentcolor;${N}" -- $SECTIONS
	$M scroller-unscrolled app/browser/styles/_shell.scss "${T}${T}height: 100%;${N}${T}${T}overflow: auto;" "${T}${T}height: 100%;${N}${T}${T}overflow: visible;" -- $SECTIONS
	$M maximum-outside-frame app/browser/constants.ts "'<div class=\"viewport\"><p><span class=\"placeholder vw-100 mw-100\" aria-hidden=\"true\"></span></p><div class=\"h-50\">" "'<p><span class=\"placeholder vw-100 mw-100\" aria-hidden=\"true\"></span></p><div class=\"viewport\"><div class=\"h-50\">" -- $SECTIONS
	$M position-values-unframed app/browser/constants.ts "'<div class=\"viewport\"><div class=\"position-relative h-100\"><p class=\"position-static\">" "'<div class=\"frame\"><div class=\"position-relative h-100\"><p class=\"position-static\">" -- $SECTIONS
	$M hidden-sentence-unpositioned app/browser/constants.ts "'<p class=\"position-relative\">Unread messages: 3" "'<p>Unread messages: 3" -- $SECTIONS
	$M region-kept app/browser/sections/SpecimenSection.ts "${T}${T}this.#section.remove()${N}" "" -- $SECTIONS
	$M step-length-sections $US/_sizing.scss "25: 25%," "25: 25px," -- $SECTIONS
	$M both-focus-dropped-sections $US/_visually-hidden.scss ".visually-hidden-focusable:not(:focus):not(:focus-within) {" ".visually-hidden-focusable {" -- $SECTIONS
	;;
setup)
	$M setup-share-wrong tests/setupStyles.ts "Object.freeze({ step: '75', value: '75%', share: 0.75 })," "Object.freeze({ step: '75', value: '75%', share: 0.7 })," -- $SETUP_STYLES
	$M setup-level-wrong tests/setupStyles.ts "Object.freeze({ level: '3', value: '3' })," "Object.freeze({ level: '3', value: '4' })," -- $SETUP_STYLES
	$M setup-infix-dropped tests/setupStyles.ts "GRID_BREAKPOINT_CASES.filter(({ boundary }) => boundary !== 0)" "GRID_BREAKPOINT_CASES.filter(({ boundary }) => boundary > 576)" -- $SETUP_STYLES
	$M setup-clip-wrong tests/setupStyles.ts "'rect(0px, 0px, 0px, 0px)'," "'auto'," -- $SETUP_STYLES
	$M setup-width-wrong tests/setupStyles.ts "export const VIEWPORT_WIDTHS = Object.freeze([390, 1280])" "export const VIEWPORT_WIDTHS = Object.freeze([390, 1024])" -- $SETUP_STYLES
	$M start-unfocused tests/setupBrowser.ts "${T}control.focus()${N}" "" -- $SETUP_BROWSER
	;;
service)
	$M line-gains-w-25 tests/fixtures/tailwind/consumer.css "start-100 table\");" "start-100 table w-25\");" -- $SERVICE
	$M importance-dropped-service src/styles/_mixins.scss '$value !important;' '$value;' --build -- $SERVICE
	$M start-off-line tests/fixtures/tailwind/consumer.css " start-0 start-50 start-100 table\");" " table\");" -- $SERVICE
	;;
esac; done
