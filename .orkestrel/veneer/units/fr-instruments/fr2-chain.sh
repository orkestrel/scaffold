#!/usr/bin/env bash
# Runs the round-2 journey mutations in sequence inside the scratch copy, one at a time.
M=/home/user/veneer-fr/tmp/units/fr2-mutate.sh
J="npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=verbose --project journey:light-1280*"
TAB=$'\t'
$M "Validated select, unfiltered journey: the state focus rule writes no ring" src/styles/components/_validation.scss "${TAB}${TAB}${TAB}border-color: var(--bs-form-#{\$state}-border-color);
${TAB}${TAB}${TAB}box-shadow: 0 0 0 var(--vn-focus-width) rgba(var(--bs-#{\$role}-rgb), 0.25);
${TAB}${TAB}}

${TAB}${TAB}// The swatch width" "${TAB}${TAB}${TAB}border-color: var(--bs-form-#{\$state}-border-color);
${TAB}${TAB}}

${TAB}${TAB}// The swatch width" 0 $J
$M "Pressed check, unfiltered journey: the .form-check-input:active rule writes no filter" src/styles/components/_form-check.scss "${TAB}.form-check-input:active {
${TAB}${TAB}filter: brightness(90%);
${TAB}}" "${TAB}.form-check-input:active {
${TAB}}" 0 $J
$M "Plaintext focus: the .form-control-plaintext:focus rule writes no outline reset" src/styles/components/_form-control.scss "${TAB}.form-control-plaintext:focus {
${TAB}${TAB}outline: 0;
${TAB}}" "${TAB}.form-control-plaintext:focus {
${TAB}}" 0 $J -t "plaintext control"
$M "Empty floating plaintext focus: the floated inset leaves out a focused plaintext control" src/styles/components/_form-floating.scss "${TAB}.form-floating > .form-control-plaintext:focus,
" "" 0 $J -t "plaintext control"
$M "Grouped floating lift: the lift rule leaves out the floating wrapper" src/styles/components/_input-group.scss "${TAB}.input-group > .form-select:focus,
${TAB}.input-group > .form-floating:focus-within {" "${TAB}.input-group > .form-select:focus {" 0 $J -t "grouped select and the grouped floating"
$M "Grouped select lift: the lift rule leaves out the select" src/styles/components/_input-group.scss "${TAB}.input-group > .form-control:focus,
${TAB}.input-group > .form-select:focus,
" "${TAB}.input-group > .form-control:focus,
" 0 $J -t "grouped select and the grouped floating"
echo chain-done
